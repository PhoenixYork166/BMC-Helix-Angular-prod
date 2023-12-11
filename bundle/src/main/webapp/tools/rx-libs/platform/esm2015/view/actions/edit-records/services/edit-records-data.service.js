import { Injectable } from '@angular/core';
import { filter, forEach, forIn, has, isEmpty, isNull, map as _map, noop, pick, some, transform, values } from 'lodash';
import { RX_RECORD_INSTANCE } from '@helix/platform/record/api';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { RX_ERROR_HANDLING, RxCommandFactoryService } from '@helix/platform/shared/api';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
export class RxEditRecordsDataService {
    constructor(adaptModalService, translateService, rxCommandFactoryService) {
        this.adaptModalService = adaptModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.resourceType = 'com.bmc.arsys.rx.application.record.command.UpdateRecordInstancesCommand';
        this.editRecordsCommand = this.rxCommandFactoryService.forResourceType(this.resourceType);
    }
    editRecords(preparedRecordData) {
        return this.editRecordsCommand.execute(preparedRecordData);
    }
    showActionResults(actionResults) {
        return this.adaptModalService
            .open({
            size: 'sm',
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.title'),
            data: actionResults,
            content: ResultModalComponent
        })
            .catch(noop);
    }
    runAction(recordInstanceIds, recordInstance) {
        const preparedRecordData = this.prepareRecordData(recordInstanceIds, recordInstance);
        const formData = new FormData();
        formData.append('commandInstance', JSON.stringify(preparedRecordData.commandInstance));
        forEach(preparedRecordData.attachments, (attachment) => {
            formData.append(attachment.key, attachment.file);
        });
        Object.keys(preparedRecordData || {}).map((item) => {
            if (item !== 'commandInstance' && item !== 'attachments') {
                formData.append(item, JSON.stringify(preparedRecordData[item]));
            }
        });
        return this.editRecords(formData).pipe(map((response) => this.prepareActionResults(response, preparedRecordData)), switchMap((actionResults) => {
            return from(Promise.resolve(this.showActionResults(actionResults)));
        }));
    }
    cleanUnchangedFields(recordInstance) {
        return forIn(recordInstance.fieldInstances, (field, key) => {
            if (isNull(field.value)) {
                delete recordInstance.fieldInstances[key];
            }
        });
    }
    prepareFiles(fields, keyPrefix) {
        return values(fields)
            .filter((field) => has(field, 'file'))
            .map((attachment) => ({
            key: keyPrefix ? keyPrefix + '/' + attachment.id : attachment.id,
            file: attachment.file
        }));
    }
    cleanFiles(fields) {
        Object.keys(fields).map((key, index) => {
            fields[key].hasOwnProperty('file') ? delete fields[key] : delete fields[key].file;
        });
        return fields;
    }
    prepareAssociationInstancesForSaving(associationInstances) {
        return transform(associationInstances, (result, associationInstance, associationDefinitionName) => {
            forEach(associationInstance, (associationGroups, role) => {
                if (!isEmpty(associationGroups.pending)) {
                    result.push({
                        associationDefinitionName: associationDefinitionName,
                        recordInstanceIds: _map(associationGroups.pending, 'id'),
                        nodeSide: role,
                        resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.associate
                    });
                }
            });
        }, []);
    }
    prepareRecordData(recordInstanceIds, recordInstance) {
        const record = pick(recordInstance, ['resourceType', 'recordDefinitionName', 'fieldInstances']);
        const resourceType = 'com.bmc.arsys.rx.application.record.command.UpdateRecordInstancesCommand';
        record.fieldInstances = this.cleanUnchangedFields(record);
        const attachments = this.prepareFiles(record.fieldInstances);
        record.fieldInstances = this.cleanFiles(record.fieldInstances);
        const associationInstances = this.prepareAssociationInstancesForSaving(recordInstance.associationInstances);
        const data = {
            shouldOverrideOptimisticLock: false,
            commandInstance: { resourceType },
            recordInstanceIds: recordInstanceIds,
            recordInstance: record,
            attachments: attachments
        };
        if (!isEmpty(associationInstances)) {
            data.associationOperations = associationInstances.map((associationInstance) => (Object.assign(Object.assign({}, associationInstance), { nodeSide: associationInstance.nodeSide.split(':')[0] })));
        }
        return data;
    }
    prepareActionResults(response, requestData) {
        const newLine = '\n';
        const updatedInstanceIdsCount = requestData.recordInstanceIds.length;
        const detailsMessageLabel = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.details.record-instance-id.label');
        const summary = {
            successCount: 0,
            errorCount: 0,
            warningCount: 0,
            infoCount: 0
        };
        let details;
        if (!isEmpty(response)) {
            summary.errorCount = filter(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.error])).length;
            summary.warningCount = filter(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.warning])).length;
            summary.infoCount = filter(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.info])).length;
            summary.successCount = filter(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.success])).length;
            details = _map(response, (messages, recordInstanceId) => {
                const recordInstanceIdMessageHeader = detailsMessageLabel + ': ' + recordInstanceId;
                const messageText = values(messages).map(this.convertMessageToString).join(', ');
                return recordInstanceIdMessageHeader + newLine + messageText;
            }).join(newLine + newLine);
        }
        else {
            details = '';
        }
        summary.successCount = updatedInstanceIdsCount - summary.errorCount - summary.warningCount;
        return { summary, details };
    }
    convertMessageToString(message) {
        return `${message.messageType}: ${values([message.messageText, message.appendedText]).join(' ')}`;
    }
}
RxEditRecordsDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsDataService, deps: [{ token: i1.AdaptModalService }, { token: i2.TranslateService }, { token: i3.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEditRecordsDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.TranslateService }, { type: i3.RxCommandFactoryService }]; } });
//# sourceMappingURL=edit-records-data.service.js.map