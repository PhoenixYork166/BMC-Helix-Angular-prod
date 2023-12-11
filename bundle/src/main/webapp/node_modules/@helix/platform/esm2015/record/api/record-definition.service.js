import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RX_BUNDLE, RxCommandFactoryService } from '@helix/platform/shared/api';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { ArchiveType, AssociationSelectionType } from './record-definition.types';
import { cloneDeep, defaults, get, mapValues, reduce, size } from 'lodash';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
export class RxRecordDefinitionService {
    constructor(httpClient, rxCommandFactoryService, rxGuidService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxGuidService = rxGuidService;
        this.renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.record.command.RenameRecordDefinitionCommand');
        this.revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.record.command.RevertRecordDefinitionCommand');
    }
    get(recordDefinitionName, options = {}, skipLocalization = false) {
        return this.httpClient.get(this.getUrl(recordDefinitionName), options).pipe(tap((recordDefinition) => {
            if (!skipLocalization) {
                this.applyLocalization(recordDefinition);
            }
        }));
    }
    getNew() {
        const definition = {
            name: '',
            description: null,
            resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
            fieldDefinitions: cloneDeep(RX_RECORD_DEFINITION.coreFields),
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false,
            allowNonAdminToDeleteRecordInstances: false,
            allowIndexesOverlay: false,
            allowFieldsOverlay: false,
            archiveDescriptor: {
                ageQualifierFieldId: RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                ageQualifierInDays: 365,
                archiveDataCriteria: null,
                archiveRecordDefinitionName: null,
                archiveType: ArchiveType.None,
                description: null,
                includeAttachments: false,
                isEnabled: false
            },
            associationsToFollowForArchive: {
                specificAssociationNames: [],
                selectionType: AssociationSelectionType.AllEnforced
            },
            enableCognitiveSearch: false,
            indexDefinitions: [],
            scope: RX_BUNDLE.definitionScopeTypes.bundle
        };
        definition.fieldDefinitions.filter(this.isSelectionFieldDefinition).forEach((selectionFieldDefinition) => {
            selectionFieldDefinition.optionLabelsById = mapValues(selectionFieldDefinition.optionNamesById, () => this.rxGuidService.generate());
        });
        return of(definition);
    }
    create(recordDefinition) {
        return this.httpClient.post(this.getUrl(), recordDefinition);
    }
    update(recordDefinition, options) {
        return this.httpClient.put(this.getUrl(recordDefinition.name), recordDefinition, options);
    }
    delete(recordDefinitionName) {
        return this.httpClient.delete(this.getUrl(recordDefinitionName));
    }
    rename(oldRecordDefinitionName, newRecordDefinitionName) {
        return this.renameCommand.execute({
            name: oldRecordDefinitionName,
            newName: newRecordDefinitionName
        });
    }
    revertCustomization(recordDefinitionName) {
        return this.revertCustomizationCommand.execute({ recordDefinitionName });
    }
    getUrl(recordDefinitionName) {
        return recordDefinitionName
            ? `/api/rx/application/record/recorddefinition/${encodeURIComponent(recordDefinitionName)}`
            : '/api/rx/application/record/recorddefinition';
    }
    setOptionsByIdProperty(fieldDefinition) {
        fieldDefinition.optionsById = reduce(fieldDefinition.optionNamesById, (optionsById, optionName, optionId) => {
            optionsById[optionId] = {
                id: optionId,
                label: optionName
            };
            return optionsById;
        }, {});
    }
    buildFieldDefinitionsByIdMap(recordDefinition) {
        return reduce(recordDefinition.fieldDefinitions, (fieldDefinitionsById, fieldDefinition) => {
            this.addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, fieldDefinition.id);
            return fieldDefinitionsById;
        }, {});
    }
    addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, field) {
        if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
            this.setOptionsByIdProperty(fieldDefinition);
        }
        fieldDefinitionsById[field] = fieldDefinition;
    }
    setFieldDefinitionsToOptional(recordDefinition) {
        recordDefinition.fieldDefinitions.forEach((fieldDefinition) => {
            if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                fieldDefinition.fieldOption = RX_RECORD_DEFINITION.fieldOptions.optional;
            }
        });
        return recordDefinition;
    }
    isSelectionFieldDefinition(fieldDefinition) {
        return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.resourceType) === RX_RECORD_DEFINITION.resourceTypes.selection;
    }
    applyLocalization(recordDefinition) {
        recordDefinition.fieldDefinitions
            .filter(this.isSelectionFieldDefinition)
            .forEach((fieldDefinition) => {
            const localizableStringsForField = get(recordDefinition.localizableStringsByFieldId, fieldDefinition.id);
            fieldDefinition.optionLabelsById = mapValues(defaults(fieldDefinition.optionLabelsById, fieldDefinition.optionNamesById), (stringGuid, optionId) => get(localizableStringsForField, stringGuid, fieldDefinition.optionNamesById[optionId]));
        });
    }
    isRegularRecord(recordDefinition) {
        return recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType;
    }
    isExternalRecord(recordDefinition) {
        return (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
            !this.isCustomRecord(recordDefinition));
    }
    isJoinRecord(recordDefinition) {
        return recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType;
    }
    isCustomRecord(recordDefinition) {
        return (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
            recordDefinition.type === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom);
    }
    isAutomaticIndex(index) {
        return (index.unique && size(index.indexFieldIds) === 1 && index.indexFieldIds[0] === RX_RECORD_DEFINITION.coreFieldIds.id);
    }
}
RxRecordDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }, { token: i3.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }, { type: i3.RxGuidService }]; } });
//# sourceMappingURL=record-definition.service.js.map