import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { chain, find, forEach, includes, isEmpty, reverse, trim } from 'lodash';
import { RX_RECORD_DESIGNER } from '../record-designer/record-designer.constant';
import { TranslateService } from '@ngx-translate/core';
import { RxFieldDefinitionManagerService } from './services/field-definition-manager.service';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "./services/field-definition-manager.service";
export class RxRecordDefinitionValidatorService {
    constructor(rxFieldDefinitionService, translateService, rxDefinitionNameService, rxFieldDefinitionManagerService) {
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
    }
    validate(definitionModel) {
        var _a;
        const duplicateFieldErrorMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label') });
        const definitionValidationIssues = [];
        const fieldValidationIssueSections = [];
        chain(definitionModel.fields)
            .clone()
            .reverse()
            .forEach((fieldModel, index, fieldModels) => {
            let issues = [];
            if (find(fieldModels, (model) => fieldModel.name === model.name, index + 1)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: duplicateFieldErrorMsg,
                    data: {
                        propertyName: 'name',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.id && find(fieldModels, (model) => fieldModel.id === model.id, index + 1)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.duplicate-field-id-error.message'),
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    }
                });
            }
            if (definitionModel.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType &&
                !fieldModel.lastUpdateTime &&
                !includes(RX_RECORD_DEFINITION.coreFieldIds, fieldModel.id) &&
                includes(RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldModel.id)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-field-id.message', { fieldId: fieldModel.id }),
                    data: {
                        editFieldGroups: true,
                        guid: fieldModel.guid
                    }
                });
            }
            issues = issues.concat(this.rxFieldDefinitionManagerService.validate(fieldModel, definitionModel));
            if (issues.length) {
                fieldValidationIssueSections.push({
                    title: fieldModel.name,
                    issues: issues
                });
            }
        })
            .value();
        if (isEmpty(trim(definitionModel.name))) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-name.label')
                }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label') }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (definitionModel === null || definitionModel === void 0 ? void 0 : definitionModel.isAuditingEnabled) {
            const auditRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.auditRecordDefinitionName);
            if (isEmpty(trim(auditRecordDefinitionName))) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-audit-definition-name.message'),
                    data: {
                        propertyName: 'auditRecordDefinitionName'
                    }
                });
            }
            if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(auditRecordDefinitionName)) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                    }),
                    data: {
                        propertyName: 'auditRecordDefinitionName'
                    }
                });
            }
        }
        if (definitionModel.isArchivingEnabled &&
            definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.archiveAndDeleteSourceRecord.id) {
            const archiveRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.archiveRecordDefinitionName);
            if (isEmpty(trim(archiveRecordDefinitionName))) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-archive-definition-name.message'),
                    data: {
                        propertyName: 'archiveRecordDefinitionName'
                    }
                });
            }
            if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(archiveRecordDefinitionName)) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archive-record-definition-name.label')
                    }),
                    data: {
                        propertyName: 'archiveRecordDefinitionName'
                    }
                });
            }
        }
        if (definitionModel.weightedRelevancyFields) {
            const searchTitleField = find(definitionModel.fields, { id: (_a = definitionModel.weightedRelevancyFields) === null || _a === void 0 ? void 0 : _a.TITLE });
            if (searchTitleField && !searchTitleField.searchDefinition) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-text-search-enabled-field.message'),
                    data: {
                        propertyName: 'searchTitleField'
                    }
                });
            }
        }
        forEach(definitionModel.indexDefinitions, (indexDefinitionModel, index) => {
            if (!indexDefinitionModel.indexFieldIds.length) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.no-field-selected.message', {
                        indexName: indexDefinitionModel.indexName ||
                            this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.new-index.label')
                    }),
                    data: {
                        indexToEditIndex: index,
                        propertyName: 'indexDefinitions'
                    }
                });
            }
        });
        let issues = [];
        if (definitionValidationIssues.length) {
            issues.push({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                issues: definitionValidationIssues
            });
        }
        issues = issues.concat(reverse(fieldValidationIssueSections));
        return issues;
    }
}
RxRecordDefinitionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionValidatorService, deps: [{ token: i1.RxFieldDefinitionService }, { token: i2.TranslateService }, { token: i3.RxDefinitionNameService }, { token: i4.RxFieldDefinitionManagerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxFieldDefinitionService }, { type: i2.TranslateService }, { type: i3.RxDefinitionNameService }, { type: i4.RxFieldDefinitionManagerService }]; } });
//# sourceMappingURL=record-definition-validator.service.js.map