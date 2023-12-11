import { Injectable } from '@angular/core';
import { AssociationSelectionType, RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { find, isNumber, omit } from 'lodash';
import { RxDefinitionNameService, RxLocalizationService, RxOverlayService } from '@helix/platform/shared/api';
import { RxDateUtilsService, RxGuidService } from '@helix/platform/utils';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/utils";
export class RxRecordDesignerService {
    constructor(rxDefinitionNameService, rxFieldDefinitionService, rxGuidService, rxOverlayService, rxRecordDefinitionService, rxLocalizationService, rxDateUtilService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxGuidService = rxGuidService;
        this.rxOverlayService = rxOverlayService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxLocalizationService = rxLocalizationService;
        this.rxDateUtilService = rxDateUtilService;
    }
    // Convert "$ID$ = 'ID'" to ${Record1.PRIMARY_RECORD_DEFINITION.ID} = ${Record2.SECONDARY_RECORD_DEFINITION.ID}
    getJoinCriteriaExpression(joinCriteria, primaryRecordDefinitionName, secondaryRecordDefinitionName) {
        const primaryFieldRegExp = new RegExp('\\$(?!NULL)([\\w .]+)\\$', 'g');
        const secondaryFieldRegExp = new RegExp("'([^']+)'", 'g');
        return (joinCriteria || '')
            .replace(primaryFieldRegExp, '${' +
            this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName) +
            '.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.primary +
            '.$1}')
            .replace(secondaryFieldRegExp, '${' +
            this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName) +
            '.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.secondary +
            '.$1}');
    }
    // Convert ${Record1.PRIMARY_RECORD_DEFINITION.ID} = ${Record2.SECONDARY_RECORD_DEFINITION.ID} to "$ID$ = 'ID'"
    getJoinCriteriaArExpression(joinCriteria, primaryRecordDefinitionName, secondaryRecordDefinitionName) {
        const primaryFieldRegExp = new RegExp('\\${' +
            this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName) +
            '\\.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.primary +
            '\\.([^}]+)}', 'g');
        const secondaryFieldRegExp = new RegExp('\\${' +
            this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName) +
            '\\.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.secondary +
            '\\.([^}]+)}', 'g');
        return (joinCriteria || '')
            .replace(primaryFieldRegExp, '#$1#')
            .replace(/#/g, '$')
            .replace(secondaryFieldRegExp, "'$1'");
    }
    getDefinitionFromDefinitionModel(model, bundleId) {
        var _a, _b, _c;
        return {
            allowFieldsOverlay: model.customizationOptions.allowFieldsOverlay,
            allowNonAdminToDeleteRecordInstances: model.allowNonAdminToDeleteRecordInstances,
            allowIndexesOverlay: model.customizationOptions.allowIndexesOverlay,
            allowOtherPropertiesOverlay: model.customizationOptions.allowOtherPropertiesOverlay,
            allowPermissionsOverlay: model.customizationOptions.allowPermissionsOverlay,
            enableCognitiveSearch: model.enableCognitiveSearch,
            description: model.description,
            guid: model.guid,
            indexDefinitions: model.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                ? model.indexDefinitions.map((indexDefinitionModel) => omit(indexDefinitionModel, 'isAutomaticIndex'))
                : undefined,
            inheritanceDescriptor: model.recordInheritanceSelector.inheritanceDescriptor,
            isAbstract: (_a = model.recordInheritanceSelector.inheritanceOptions) === null || _a === void 0 ? void 0 : _a.isAbstract,
            isFinal: (_b = model.recordInheritanceSelector.inheritanceOptions) === null || _b === void 0 ? void 0 : _b.isFinal,
            isSharedInstanceStorage: (_c = model.recordInheritanceSelector.inheritanceOptions) === null || _c === void 0 ? void 0 : _c.isSharedInstanceStorage,
            joinCriteria: model.joinCriteria
                ? this.getJoinCriteriaArExpression(model.joinCriteria, model.primaryRecordDefinitionName, model.secondaryRecordDefinitionName)
                : undefined,
            joinType: model.joinType,
            lastChangedBy: model.lastChangedBy,
            lastUpdateTime: model.lastUpdateTime ? moment(model.lastUpdateTime).format() : null,
            name: `${bundleId}:${model.name}`,
            overlayGroupId: model.overlayGroupId,
            owner: model.owner,
            overlayDescriptor: model.overlayDescriptor,
            permissions: model.permissions,
            primaryRecordDefinitionName: model.primaryRecordDefinitionName,
            resourceType: model.resourceType,
            secondaryRecordDefinitionName: model.secondaryRecordDefinitionName,
            shouldExportData: model.shouldExportData,
            scope: model.customizationOptions.scope,
            tags: model.tags,
            version: model.version,
            weightedRelevancyFields: {
                TITLE: model.weightedRelevancyTitle,
                ENVIRONMENT: model.weightedRelevancyEnvironment,
                KEYWORDS: model.weightedRelevancyKeywords
            },
            displayFieldIdInAssociation: find(model.fields, { id: model.displayFieldIdInAssociation })
                ? model.displayFieldIdInAssociation
                : null,
            archiveDescriptor: {
                ageQualifierFieldId: model.ageQualifierFieldId,
                ageQualifierInDays: model.ageQualifierInDays,
                archiveRecordDefinitionName: model.archiveRecordDefinitionName,
                description: model.archiveDescription,
                archiveType: model.archiveType,
                includeAttachments: model.includeAttachments,
                archiveDataCriteria: model.archiveDataCriteria,
                isEnabled: model.isArchivingEnabled
            },
            associationsToFollowForArchive: model.associationsToFollowForArchive,
            auditDescriptor: {
                isEnabled: model.isAuditingEnabled,
                auditRecordDefinitionName: model.auditRecordDefinitionName,
                auditDataCriteria: model.auditDataCriteria,
                associatedAuditFieldsByAssociationName: model.associatedAuditFieldsByAssociationName
            },
            auditSourceRecordDefinitionName: model.auditSourceRecordDefinitionName,
            fieldDefinitions: model.fields.map((fieldModel) => {
                var _a, _b;
                const field = {
                    resourceType: fieldModel.resourceType,
                    lastUpdateTime: fieldModel.lastUpdateTime,
                    lastChangedBy: fieldModel.lastChangedBy,
                    owner: fieldModel.owner,
                    name: fieldModel.name,
                    tags: fieldModel.tags,
                    description: fieldModel.description,
                    overlayGroupId: fieldModel.overlayGroupId,
                    id: isNumber(fieldModel.id) ? fieldModel.id : '',
                    fieldOption: fieldModel.fieldOption,
                    permissions: fieldModel.permissions,
                    fieldTypeName: fieldModel.fieldTypeName,
                    isInherited: fieldModel.isInherited,
                    explicitPermissions: fieldModel.explicitPermissions,
                    overlayDescriptor: fieldModel.overlayDescriptor,
                    fieldMapping: fieldModel.fieldMapping,
                    allowPermissionsOverlay: fieldModel.allowPermissionsOverlay,
                    allowOtherPropertiesOverlay: fieldModel.allowOtherPropertiesOverlay,
                    auditOption: fieldModel.audit ? 'AUDIT_AND_COPY' : fieldModel.copy ? 'COPY' : null,
                    allowPermissionsEdit: fieldModel.allowPermissionsEdit,
                    maxLength: fieldModel.maxLength,
                    searchDefinition: fieldModel.searchDefinition,
                    namedListDefinition: fieldModel.namedListDefinition,
                    shouldPersistEncrypted: fieldModel.shouldPersistEncrypted,
                    shouldPersistHashed: fieldModel.shouldPersistHashed,
                    pattern: fieldModel.pattern,
                    anyUserAllowedToSubmit: fieldModel.anyUserAllowedToSubmit
                };
                if (fieldModel.resourceType === RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType) {
                    field.defaultValueByLocale = fieldModel.defaultValueByLocale;
                }
                else if (fieldModel.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
                    field.defaultValue = fieldModel.selectionFieldOptionProperties.defaultValue;
                    field.optionNamesById = (_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById;
                    field.optionLabelsById = (_b = fieldModel.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionLabelsById;
                }
                else if (fieldModel.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                    field.defaultValue = fieldModel.defaultValue;
                }
                return field;
            })
            // TODO-VM: update when new custom component in inspector config is implemented
        };
    }
    getDefinitionModelFromDefinition(recordDefinition) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return {
            allowNonAdminToDeleteRecordInstances: recordDefinition.allowNonAdminToDeleteRecordInstances,
            isArchivingEnabled: (_a = recordDefinition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled,
            ageQualifierFieldId: (_b = recordDefinition.archiveDescriptor) === null || _b === void 0 ? void 0 : _b.ageQualifierFieldId,
            ageQualifierInDays: (_c = recordDefinition.archiveDescriptor) === null || _c === void 0 ? void 0 : _c.ageQualifierInDays,
            archiveRecordDefinitionName: (_d = recordDefinition.archiveDescriptor) === null || _d === void 0 ? void 0 : _d.archiveRecordDefinitionName,
            archiveDescription: (_e = recordDefinition.archiveDescriptor) === null || _e === void 0 ? void 0 : _e.description,
            archiveType: (_f = recordDefinition.archiveDescriptor) === null || _f === void 0 ? void 0 : _f.archiveType,
            includeAttachments: (_g = recordDefinition.archiveDescriptor) === null || _g === void 0 ? void 0 : _g.includeAttachments,
            archiveDataCriteria: (_h = recordDefinition.archiveDescriptor) === null || _h === void 0 ? void 0 : _h.archiveDataCriteria,
            associationsToFollowForArchive: {
                specificAssociationNames: ((_j = recordDefinition.associationsToFollowForArchive) === null || _j === void 0 ? void 0 : _j.specificAssociationNames) || [],
                selectionType: ((_k = recordDefinition.associationsToFollowForArchive) === null || _k === void 0 ? void 0 : _k.selectionType) || AssociationSelectionType.FollowParent
            },
            isAuditingEnabled: (_l = recordDefinition.auditDescriptor) === null || _l === void 0 ? void 0 : _l.isEnabled,
            auditRecordDefinitionName: (_m = recordDefinition.auditDescriptor) === null || _m === void 0 ? void 0 : _m.auditRecordDefinitionName,
            auditDataCriteria: (_o = recordDefinition.auditDescriptor) === null || _o === void 0 ? void 0 : _o.auditDataCriteria,
            associatedAuditFieldsByAssociationName: (_p = recordDefinition.auditDescriptor) === null || _p === void 0 ? void 0 : _p.associatedAuditFieldsByAssociationName,
            auditSourceRecordDefinitionName: recordDefinition.auditSourceRecordDefinitionName,
            customizationOptions: {
                allowFieldsOverlay: recordDefinition.allowFieldsOverlay,
                allowIndexesOverlay: recordDefinition.allowIndexesOverlay,
                allowOtherPropertiesOverlay: recordDefinition.allowOtherPropertiesOverlay,
                allowPermissionsOverlay: recordDefinition.allowPermissionsOverlay,
                allowOverlay: false,
                fields: recordDefinition.fieldDefinitions,
                scope: recordDefinition.scope
            },
            description: recordDefinition.description,
            displayFieldIdInAssociation: recordDefinition.displayFieldIdInAssociation,
            enableCognitiveSearch: recordDefinition.enableCognitiveSearch,
            fullPermissions: recordDefinition.fullPermissions,
            guid: recordDefinition.guid || this.rxGuidService.generate(),
            indexDefinitions: (_q = recordDefinition.indexDefinitions) === null || _q === void 0 ? void 0 : _q.map((indexDefinition) => (Object.assign(Object.assign({}, indexDefinition), { isAutomaticIndex: this.rxRecordDefinitionService.isAutomaticIndex(indexDefinition) }))),
            isAuditRecordDefinition: recordDefinition.isAuditRecordDefinition,
            joinCriteria: this.getJoinCriteriaExpression(recordDefinition.joinCriteria, recordDefinition.primaryRecordDefinitionName, recordDefinition.secondaryRecordDefinitionName),
            joinType: recordDefinition.joinType,
            lastUpdateTime: recordDefinition.lastUpdateTime
                ? this.rxDateUtilService.formatDate(recordDefinition.lastUpdateTime, 'medium')
                : recordDefinition.lastUpdateTime,
            lastChangedBy: recordDefinition.lastChangedBy,
            localizableStringsByFieldId: recordDefinition.localizableStringsByFieldId,
            name: this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
            overlayDescriptor: recordDefinition.overlayDescriptor,
            overlayGroupId: recordDefinition.overlayGroupId,
            overlayOperation: this.rxOverlayService.getOverlayOperation(recordDefinition.overlayGroupId, recordDefinition.overlayDescriptor ? recordDefinition.overlayDescriptor.parentOverlayGroupId : null),
            owner: recordDefinition.owner,
            permissions: recordDefinition.permissions,
            primaryRecordDefinitionName: recordDefinition.primaryRecordDefinitionName,
            secondaryRecordDefinitionName: recordDefinition.secondaryRecordDefinitionName,
            recordInheritanceSelector: {
                inheritanceDescriptor: recordDefinition.inheritanceDescriptor,
                inheritanceOptions: {
                    isAbstract: recordDefinition.isAbstract,
                    isSharedInstanceStorage: recordDefinition.isSharedInstanceStorage,
                    isFinal: recordDefinition.isFinal
                },
                isInheritingCoreFields: null,
                inheritedFieldDefinitions: []
            },
            recordSearchFields: recordDefinition.fieldDefinitions.filter((field) => field.searchDefinition),
            recordInstancePrefix: recordDefinition.recordInstancePrefix,
            recordTypeName: recordDefinition.recordTypeName,
            resourceType: recordDefinition.resourceType,
            rowSecurityPropagations: recordDefinition.rowSecurityPropagations,
            securityLabels: recordDefinition.securityLabels,
            shouldExportData: recordDefinition.shouldExportData,
            tags: recordDefinition.tags,
            upgradeVersion: recordDefinition.upgradeVersion,
            version: recordDefinition.version,
            weightedRelevancyTitle: (_r = recordDefinition.weightedRelevancyFields) === null || _r === void 0 ? void 0 : _r.TITLE,
            weightedRelevancyEnvironment: (_s = recordDefinition.weightedRelevancyFields) === null || _s === void 0 ? void 0 : _s.ENVIRONMENT,
            weightedRelevancyKeywords: (_t = recordDefinition.weightedRelevancyFields) === null || _t === void 0 ? void 0 : _t.KEYWORDS,
            fields: recordDefinition.fieldDefinitions.map((fieldDefinition) => ({
                allowOtherPropertiesOverlay: fieldDefinition.allowOtherPropertiesOverlay,
                allowPermissionsEdit: fieldDefinition.allowPermissionsEdit,
                allowPermissionsOverlay: fieldDefinition.allowPermissionsOverlay,
                anyUserAllowedToSubmit: fieldDefinition.anyUserAllowedToSubmit,
                audit: fieldDefinition.auditOption === 'AUDIT_AND_COPY',
                copy: fieldDefinition.auditOption === 'AUDIT_AND_COPY' || fieldDefinition.auditOption === 'COPY',
                defaultValue: fieldDefinition.defaultValue,
                defaultValueByLocale: fieldDefinition.defaultValueByLocale,
                description: fieldDefinition.description,
                explicitPermissions: fieldDefinition.explicitPermissions,
                fieldMapping: fieldDefinition.fieldMapping,
                fieldOption: fieldDefinition.fieldOption,
                fieldTypeName: fieldDefinition.fieldTypeName,
                guid: this.rxGuidService.generate(),
                id: isNumber(fieldDefinition.id) ? fieldDefinition.id : fieldDefinition.customId || '',
                isCoreField: this.rxFieldDefinitionService.isCoreField(fieldDefinition),
                isInherited: fieldDefinition.isInherited,
                isNewField: false,
                lastChangedBy: fieldDefinition.lastChangedBy,
                lastUpdateTime: fieldDefinition.lastUpdateTime,
                maxLength: fieldDefinition.maxLength,
                maxSize: fieldDefinition.maxSize,
                maxValue: fieldDefinition.maxValue,
                minValue: fieldDefinition.minValue,
                name: fieldDefinition.name,
                overlayDescriptor: fieldDefinition.overlayDescriptor,
                overlayGroupId: fieldDefinition.overlayGroupId,
                owner: fieldDefinition.owner,
                permissions: fieldDefinition.permissions,
                precision: fieldDefinition.precision,
                resourceType: fieldDefinition.resourceType,
                searchDefinition: fieldDefinition.searchDefinition,
                selectionFieldOptionProperties: {
                    defaultValue: fieldDefinition.defaultValue,
                    optionNamesById: fieldDefinition.optionNamesById,
                    optionLabelsById: fieldDefinition.optionLabelsById
                },
                shouldPersistEncrypted: fieldDefinition.shouldPersistEncrypted,
                shouldPersistHashed: fieldDefinition.shouldPersistHashed,
                namedListDefinition: fieldDefinition.namedListDefinition,
                pattern: fieldDefinition.pattern,
                tags: fieldDefinition.tags
            }))
        };
    }
}
RxRecordDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerService, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxFieldDefinitionService }, { token: i3.RxGuidService }, { token: i1.RxOverlayService }, { token: i2.RxRecordDefinitionService }, { token: i1.RxLocalizationService }, { token: i3.RxDateUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxFieldDefinitionService }, { type: i3.RxGuidService }, { type: i1.RxOverlayService }, { type: i2.RxRecordDefinitionService }, { type: i1.RxLocalizationService }, { type: i3.RxDateUtilsService }]; } });
//# sourceMappingURL=record-designer.service.js.map