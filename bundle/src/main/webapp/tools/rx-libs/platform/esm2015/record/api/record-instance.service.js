import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { assign, filter, find, forEach, groupBy, has, includes, isEmpty, isEqual, isNull, isNumber, isString, isUndefined, map as _map, pick, remove, sortBy, transform, trim, values } from 'lodash';
import { saveAs } from 'file-saver';
import { RecordInstance } from './record-instance.class';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { RX_RECORD_INSTANCE } from './record-instance.constant';
import { RxRecordDefinitionCacheService } from './record-definition-cache.service';
import { RxRecordInstanceUtilsService } from './record-instance-utils.service';
import BigNumber from 'bignumber.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./record-definition-cache.service";
import * as i3 from "./record-instance-utils.service";
export class RxRecordInstanceService {
    constructor(httpClient, rxRecordDefinitionCacheService, rxRecordInstanceUtilsService, injector, ngZone) {
        this.httpClient = httpClient;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.injector = injector;
        this.ngZone = ngZone;
        this.path = '/api/rx/application/record/recordinstance';
    }
    get(recordDefinitionName, recordInstanceId) {
        return this.getRecordInstance(recordDefinitionName, recordInstanceId);
    }
    getNew(recordDefinitionName) {
        return this.getRecordInstance(recordDefinitionName, '0');
    }
    getEmpty(recordDefinitionName) {
        return this.getNew(recordDefinitionName).pipe(tap((recordInstance) => recordInstance.prepareForBulkEdit()));
    }
    save(recordInstance, options) {
        return this.httpClient.put(`${this.path}/${encodeURIComponent(recordInstance.recordDefinitionName)}/${encodeURIComponent(recordInstance.id)}`, this.prepareRecordInstance(recordInstance), options);
    }
    delete(recordDefinitionName, recordInstanceId) {
        return this.httpClient.delete(`${this.path}/${encodeURIComponent(recordDefinitionName)}/${encodeURIComponent(recordInstanceId)}`);
    }
    prepareAttachments(fieldInstances, isAssociation = false) {
        const attachedFiles = filter(fieldInstances, (fieldInstance) => Boolean(fieldInstance.file)).map((attachment) => {
            const keyPrefix = isAssociation ? `${fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id].value}/` : '';
            return {
                key: `${keyPrefix}${attachment.id}`,
                file: attachment.file
            };
        });
        this.cleanAttachmentFiles(fieldInstances);
        return attachedFiles;
    }
    // There should not be any files in record instance JSON so we are cleaning it
    cleanAttachmentFiles(fieldInstances) {
        filter(fieldInstances, (fieldInstance) => has(fieldInstance, 'file')).forEach((fieldInstanceWithFile) => {
            if (fieldInstanceWithFile.file) {
                delete fieldInstances[fieldInstanceWithFile.id];
            }
            else {
                delete fieldInstances[fieldInstanceWithFile.id].file;
            }
        });
    }
    create(recordInstance) {
        return this.httpClient
            .post(this.path, this.prepareRecordInstance(recordInstance), {
            observe: 'response',
            responseType: 'text'
        })
            .pipe(map((res) => {
            let result = {};
            const locationHeader = res.headers.get('location');
            if (locationHeader) {
                result = {
                    id: locationHeader.substr(locationHeader.lastIndexOf('/') + 1),
                    url: locationHeader
                };
            }
            return result;
        }));
    }
    getRecordInstance(recordDefinitionName, recordInstanceId) {
        return forkJoin([
            this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName),
            this.getRecordInstanceData(recordDefinitionName, recordInstanceId)
        ]).pipe(map(([recordDefinition, recordInstanceData]) => new RecordInstance(recordDefinition, recordInstanceData, this.injector)));
    }
    getRecordInstanceData(recordDefinitionName, recordInstanceId) {
        return this.httpClient.get(`${this.path}/${encodeURIComponent(recordDefinitionName)}/${encodeURIComponent(recordInstanceId)}`);
    }
    prepareRecordInstance(recordInstance) {
        const modifiedFieldInstances = {};
        const recordInstanceFormData = new FormData();
        Object.keys(recordInstance.originalData.fieldInstances).forEach((fieldIdKey) => {
            const fieldId = Number(fieldIdKey);
            const fieldInstance = recordInstance.fieldInstances[fieldId];
            const originalFieldInstance = recordInstance.originalData.fieldInstances[fieldId];
            if (isString(fieldInstance.value)) {
                fieldInstance.value = trim(fieldInstance.value);
            }
            if (isUndefined(originalFieldInstance) ||
                (fieldInstance.value === null && originalFieldInstance.value !== null) ||
                (fieldInstance.value !== null && originalFieldInstance.value === null) ||
                (fieldInstance.value !== null &&
                    originalFieldInstance.value !== null &&
                    !(isNumber(fieldInstance.value) || BigNumber.isBigNumber(fieldInstance.value)) &&
                    String(fieldInstance.value) !== originalFieldInstance.value) ||
                ((isNumber(fieldInstance.value) || BigNumber.isBigNumber(fieldInstance.value)) &&
                    !new BigNumber(fieldInstance.value).isEqualTo(originalFieldInstance.value)) ||
                (fieldId === RX_RECORD_DEFINITION.coreFieldIds.modifiedDate && fieldInstance.value !== null) ||
                (fieldInstance.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance &&
                    !isEqual(originalFieldInstance.valueByLocale, fieldInstance.valueByLocale))) {
                modifiedFieldInstances[fieldId] = fieldInstance;
            }
        });
        const preparedRecordInstance = {
            id: recordInstance.id,
            resourceType: recordInstance.resourceType,
            displayId: recordInstance.displayId,
            recordDefinitionName: recordInstance.recordDefinitionName,
            permittedGroupsBySecurityLabels: recordInstance.permittedGroupsBySecurityLabels,
            permittedUsersBySecurityLabels: recordInstance.permittedUsersBySecurityLabels,
            permittedRolesBySecurityLabels: recordInstance.permittedRolesBySecurityLabels,
            fieldInstances: modifiedFieldInstances
        };
        let attachedFiles = this.prepareAttachments(preparedRecordInstance.fieldInstances);
        const associationInstances = this.prepareAssociationInstancesForSaving(recordInstance.associationInstances);
        // We have to use FormData if we have attachments or associated data
        if (!isEmpty(attachedFiles) || !isEmpty(associationInstances)) {
            recordInstanceFormData.append('recordInstance', JSON.stringify(preparedRecordInstance));
            if (!isEmpty(associationInstances)) {
                filter(associationInstances, 'recordInstances').forEach((associationConfig) => {
                    forEach(associationConfig.recordInstances, (instance) => {
                        attachedFiles = attachedFiles.concat(this.prepareAttachments(instance.fieldInstances, true));
                    });
                });
                recordInstanceFormData.append('associationOperations', JSON.stringify(associationInstances));
            }
            attachedFiles.forEach((attachment) => {
                recordInstanceFormData.append(attachment.key, attachment.file, attachment.file.name);
            });
            return recordInstanceFormData;
        }
        else {
            return preparedRecordInstance;
        }
    }
    getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId) {
        return `${RX_RECORD_DEFINITION.recordInstanceAttachment}/${encodeURIComponent(recordDefinitionName)}/${encodeURIComponent(recordInstanceId)}/${fieldId}`;
    }
    downloadAttachment(recordDefinitionName, fieldId, recordInstanceId, fileName) {
        this.httpClient
            .get(this.getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId), { responseType: 'blob' })
            .subscribe((fileStream) => {
            if (fileStream) {
                const file = new Blob([fileStream], {
                    type: fileStream.type
                });
                this.ngZone.runOutsideAngular(() => {
                    saveAs(file, fileName);
                });
            }
        });
    }
    getAttachment(recordDefinitionName, fieldId, recordInstanceId) {
        return this.httpClient
            .get(this.getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId), { responseType: 'blob' })
            .pipe(map((fileStream) => {
            return new Blob([fileStream], {
                type: fileStream.type
            });
        }));
    }
    prepareAssociationInstancesForSaving(associationInstances) {
        const associationPayload = transform(associationInstances, (result, associationInstance, associationDefinitionName) => {
            forEach(associationInstance, (associationGroups, key) => {
                const nodeSide = key.split(':')[0];
                const newAssociations = remove(associationGroups.pending, 'isNewInstance');
                if (!isEmpty(associationGroups.pending)) {
                    values(groupBy(associationGroups.pending, (instance) => JSON.stringify(instance.rolesConfig))).forEach((instancesGroup) => {
                        result.push(assign({
                            associationDefinitionName: associationDefinitionName,
                            recordInstanceIds: _map(instancesGroup, 'id'),
                            nodeSide,
                            resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.associate
                        }, instancesGroup[0].rolesConfig));
                    });
                }
                if (!isEmpty(newAssociations)) {
                    values(groupBy(newAssociations, (instance) => JSON.stringify(instance.rolesConfig))).forEach((instancesGroup) => {
                        result.push(assign({
                            associationDefinitionName: associationDefinitionName,
                            recordInstances: _map(newAssociations, (newAssociation) => pick(newAssociation, ['fieldInstances', 'recordDefinitionName'])),
                            nodeSide,
                            resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.createAndAssociate
                        }, instancesGroup[0].rolesConfig));
                    });
                }
                if (!isEmpty(associationGroups.deleted)) {
                    result.push({
                        associationDefinitionName: associationDefinitionName,
                        recordInstanceIds: _map(associationGroups.deleted, 'id'),
                        nodeSide,
                        resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.disassociate
                    });
                }
                if (!isEmpty(associationGroups.extensions)) {
                    const extensionRecordInstance = associationGroups.extensions[0];
                    result.push({
                        associationDefinitionName: associationDefinitionName,
                        recordInstances: [this.prepareAssociatedRecordInstanceForSaving(extensionRecordInstance)],
                        nodeSide,
                        resourceType: extensionRecordInstance.isNewInstance
                            ? RX_RECORD_INSTANCE.association.operationResourceTypes.createAndAssociate
                            : RX_RECORD_INSTANCE.association.operationResourceTypes.update
                    });
                }
            });
        }, []);
        return sortBy(associationPayload, (associationData) => {
            // DISASSOCIATE operations must be at the beginning
            return associationData.operation === 'ASSOCIATE';
        });
    }
    prepareAssociatedRecordInstanceForSaving(recordInstance) {
        const recordInstanceClone = this.prepareRecordInstance(recordInstance);
        recordInstanceClone.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id] =
            recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id];
        // todo ychubar fix typings
        delete recordInstanceClone.isNewInstance;
        return recordInstanceClone;
    }
    createInstanceFromDataPageRow(dataPageRow, recordDefinition) {
        const plainRecordInstance = this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(dataPageRow);
        plainRecordInstance.recordDefinitionName = recordDefinition.name;
        forEach(plainRecordInstance.fieldInstances, (fieldInstance, fieldId) => {
            const fieldDefinition = find(recordDefinition.fieldDefinitions, { id: Number(fieldId) }) || {};
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter) {
                fieldInstance.resourceType = RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance;
            }
            // normalize record instance fields
            if (!isNull(fieldInstance.value)) {
                if (isNumber(fieldInstance.value) &&
                    includes([RX_RECORD_DEFINITION.resourceTypes.boolean, RX_RECORD_DEFINITION.resourceTypes.selection], fieldDefinition.resourceType)) {
                    fieldInstance.value = String(fieldInstance.value);
                }
            }
        });
        return new RecordInstance(recordDefinition, plainRecordInstance, this.injector);
    }
}
RxRecordInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceService, deps: [{ token: i1.HttpClient }, { token: i2.RxRecordDefinitionCacheService }, { token: i3.RxRecordInstanceUtilsService }, { token: i0.Injector }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxRecordDefinitionCacheService }, { type: i3.RxRecordInstanceUtilsService }, { type: i0.Injector }, { type: i0.NgZone }]; } });
//# sourceMappingURL=record-instance.service.js.map