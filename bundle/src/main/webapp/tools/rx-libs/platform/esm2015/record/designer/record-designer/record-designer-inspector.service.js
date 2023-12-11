import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { RX_OVERLAY, RX_PERMISSION, RxOverlayService, Tooltip } from '@helix/platform/shared/api';
import { BooleanFormControlComponent, CounterFormControlComponent, ExpressionFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, RxPermissionEditorComponent, RxRevertCustomizationComponent, SelectFormControlComponent, SwitchFormControlComponent, TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RecordCustomizationOptionsComponent } from './record-customization-options/record-customization-options.component';
import { RX_RECORD_DESIGNER } from './record-designer.constant';
import { RecordInheritanceEditorComponent } from './record-inheritance-editor/record-inheritance-editor.component';
import { SearchFieldEditorControlComponent } from './search-field-editor/search-field-editor-control.component';
import { findIndex, get, includes, isNumber } from 'lodash';
import { ArchiveAssociationsControlComponent } from './archive-associations-control/archive-associations-control.component';
import { RecordIndexesControlComponent } from './record-indexes-control/record-indexes-control.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
export class RxRecordDesignerInspectorService {
    constructor(rxFieldDefinitionService, rxOverlayService, translateService) {
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
    }
    getDefinitionInspectorConfig(isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly, expressionConfigurator) {
        var _a, _b;
        let configs = [];
        const isOverlayMode = !isNewDefinition && definitionModel.overlayOperation !== RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        const isAuditRecordDefinition = Boolean(definitionModel.isAuditRecordDefinition);
        const isDeleteSourceRecordOperation = definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.deleteSourceRecord.id;
        const doNotArchive = definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.doNotArchive.id;
        const archivingOptions = Object.values(RX_RECORD_DESIGNER.archiving.types).map((value) => (Object.assign(Object.assign({}, value), { name: this.translateService.instant(value.nameKey) })));
        const joinTypeOptions = Object.values(RX_RECORD_DEFINITION.joinTypes).map((joinType) => (Object.assign(Object.assign({}, joinType), { name: this.translateService.instant(joinType.displayName), id: joinType.value })));
        const weightedRelevancyFields = [
            {
                name: 'weightedRelevancyTitle',
                component: SelectFormControlComponent,
                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.title-field.label'),
                    options: definitionModel.fields
                        .filter((fieldDefinition) => isNumber(fieldDefinition.id) &&
                        (get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                            get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                        !includes([definitionModel.weightedRelevancyEnvironment, definitionModel.weightedRelevancyKeywords], fieldDefinition.id))
                        .map((fieldDefinition) => ({
                        name: fieldDefinition.name,
                        id: fieldDefinition.id
                    })),
                    tooltip: new Tooltip(this.translateService.instant(definitionModel.enableCognitiveSearch
                        ? 'com.bmc.arsys.rx.client.record-designer.definition-properties.title-field-cognitive-search.tooltip'
                        : 'com.bmc.arsys.rx.client.record-designer.definition-properties.title-field-fts.tooltip'))
                }
            },
            {
                name: 'weightedRelevancyEnvironment',
                component: SelectFormControlComponent,
                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.environment-field.label'),
                    options: definitionModel.fields
                        .filter((fieldDefinition) => isNumber(fieldDefinition.id) &&
                        (get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                            get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                        !includes([definitionModel.weightedRelevancyTitle, definitionModel.weightedRelevancyKeywords], fieldDefinition.id))
                        .map((fieldDefinition) => ({
                        name: fieldDefinition.name,
                        id: fieldDefinition.id
                    })),
                    tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.environment-field.tooltip'))
                }
            },
            {
                name: 'weightedRelevancyKeywords',
                component: SelectFormControlComponent,
                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.keywords-field.label'),
                    options: definitionModel.fields
                        .filter((fieldDefinition) => isNumber(fieldDefinition.id) &&
                        (get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                            get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                        !includes([definitionModel.weightedRelevancyTitle, definitionModel.weightedRelevancyEnvironment], fieldDefinition.id))
                        .map((fieldDefinition) => ({
                        name: fieldDefinition.name,
                        id: fieldDefinition.id
                    })),
                    tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.keywords-field.tooltip'))
                }
            }
        ];
        if (definitionModel.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType) {
            configs = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            isDisabled: !isNewDefinition,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: TextareaFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            component: RxRevertCustomizationComponent,
                            options: {
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: RecordCustomizationOptionsComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.record-definition.label')
                                    .toLowerCase(),
                                recordDefinition: definitionModel
                            }
                        },
                        {
                            name: 'allowNonAdminToDeleteRecordInstances',
                            component: SwitchFormControlComponent,
                            isDisabled: isAuditRecordDefinition || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.allow-non-admin-users-to-delete-records.label')
                            }
                        },
                        {
                            name: 'owner',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                            }
                        },
                        {
                            name: 'lastUpdateTime',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                            }
                        },
                        {
                            name: 'lastChangedBy',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                            }
                        },
                        {
                            name: 'permissions',
                            component: RxPermissionEditorComponent,
                            isDisabled: !isPermissionsCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                type: RX_PERMISSION.editorContexts.record
                            }
                        },
                        {
                            name: 'shouldExportData',
                            component: SwitchFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.label'),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.tooltip'))
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.title'),
                    controls: [
                        {
                            name: 'recordInheritanceSelector',
                            component: RecordInheritanceEditorComponent,
                            options: {
                                recordDefinition: definitionModel,
                                isReadOnly: isOverlayMode || !isPropertiesCustomizationAllowed || isAuditRecordDefinition
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    controls: [
                        {
                            name: 'enableCognitiveSearch',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enable-cognitive-search.label')
                            }
                        },
                        {
                            name: 'recordSearchFields',
                            component: SearchFieldEditorControlComponent,
                            options: {
                                recordDefinitionModel: definitionModel,
                                isReadOnly: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly
                            }
                        },
                        ...weightedRelevancyFields
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.indexes.title'),
                    controls: [
                        {
                            name: 'indexDefinitions',
                            component: RecordIndexesControlComponent,
                            options: {
                                isReadOnly: !isIndexCustomizationAllowed || isReadOnly,
                                definitionModel
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.display-value.title'),
                    controls: [
                        {
                            name: 'displayFieldIdInAssociation',
                            component: SelectFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.associated-display-field.title'),
                                options: definitionModel.fields
                                    .filter((field) => this.rxFieldDefinitionService.canBeAssociatedDisplayField(field))
                                    .map((field) => ({ id: field.id, name: field.name }))
                                    .sort((a, b) => a.name.localeCompare(b.name)),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.associated-display-field.tooltip'))
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'),
                    controls: [
                        {
                            name: 'isAuditingEnabled',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                            }
                        },
                        {
                            name: 'auditRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                            }
                        },
                        {
                            name: 'auditSourceRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audited-from.label')
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.title'),
                    controls: [
                        {
                            name: 'isArchivingEnabled',
                            component: SwitchFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isOverlayMode || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                            }
                        },
                        {
                            name: 'archiveType',
                            component: SelectFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isOverlayMode || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-operation.label'),
                                options: archivingOptions
                            }
                        },
                        {
                            name: 'includeAttachments',
                            component: BooleanFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed ||
                                doNotArchive ||
                                isOverlayMode ||
                                isDeleteSourceRecordOperation ||
                                isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.include-attachments.label'),
                                shouldDisplayAsCheckbox: true
                            }
                        },
                        {
                            name: 'archiveRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed ||
                                doNotArchive ||
                                isOverlayMode ||
                                isDeleteSourceRecordOperation ||
                                isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archive-record-definition-name.label')
                            }
                        },
                        {
                            name: 'ageQualifierInDays',
                            component: CounterFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-age.label'),
                                tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-age.tooltip'),
                                allowIntegerOnly: true
                            }
                        },
                        {
                            name: 'ageQualifierFieldId',
                            component: SelectFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-age-field.label'),
                                options: definitionModel.fields
                                    .filter((field) => field.resourceType === RX_RECORD_DEFINITION.resourceTypes.dateTime)
                                    .map((fieldDefinition) => ({
                                    name: fieldDefinition.name,
                                    id: fieldDefinition.id
                                }))
                                    .sort((a, b) => a.name.localeCompare(b.name))
                            }
                        },
                        {
                            name: 'archiveDescription',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                            }
                        },
                        {
                            name: 'archiveDataCriteria',
                            component: ExpressionFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.label'),
                                dataDictionary$: expressionConfigurator.getDataDictionary(RX_RECORD_DESIGNER.archiveDataCriteriaPath),
                                operators: expressionConfigurator.getOperators(RX_RECORD_DESIGNER.archiveDataCriteriaPath),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.tooltip'))
                            }
                        },
                        {
                            name: 'associationsToFollowForArchive',
                            component: ArchiveAssociationsControlComponent,
                            options: {
                                definitionModel,
                                definitionModelFromDefinition,
                                bundleId,
                                isOverlayMode,
                                isReadOnly: !isPropertiesCustomizationAllowed || doNotArchive
                            }
                        }
                    ]
                }
            ];
        }
        if (definitionModel.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) {
            configs = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            isDisabled: !isNewDefinition,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: TextareaFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            name: 'primaryRecordDefinitionName',
                            component: RxDefinitionPickerComponent,
                            isDisabled: true,
                            options: {
                                definitionType: RxDefinitionPickerType.Record,
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.primary-record.label')
                            }
                        },
                        {
                            name: 'secondaryRecordDefinitionName',
                            component: RxDefinitionPickerComponent,
                            isDisabled: true,
                            options: {
                                definitionType: RxDefinitionPickerType.Record,
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.secondary-record.label')
                            }
                        },
                        {
                            name: 'joinType',
                            component: SelectFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.join-type.label'),
                                options: joinTypeOptions
                            }
                        },
                        {
                            name: 'joinCriteria',
                            component: ExpressionFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.join-criteria.label'),
                                dataDictionary$: expressionConfigurator.getDataDictionary(RX_RECORD_DESIGNER.joinCriteriaPath),
                                operators: expressionConfigurator.getOperators(RX_RECORD_DESIGNER.joinCriteriaPath)
                            }
                        },
                        {
                            component: RxRevertCustomizationComponent,
                            options: {
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: RecordCustomizationOptionsComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.record-definition.label')
                                    .toLowerCase(),
                                recordDefinition: definitionModel
                            }
                        },
                        {
                            name: 'owner',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                            }
                        },
                        {
                            name: 'lastUpdateTime',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                            }
                        },
                        {
                            name: 'lastChangedBy',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                            }
                        },
                        {
                            name: 'permissions',
                            component: RxPermissionEditorComponent,
                            isDisabled: !isPermissionsCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                type: RX_PERMISSION.editorContexts.record
                            }
                        },
                        {
                            name: 'shouldExportData',
                            component: SwitchFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.label'),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.tooltip'))
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    controls: [
                        {
                            name: 'enableCognitiveSearch',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enable-cognitive-search.label')
                            }
                        },
                        {
                            name: 'recordSearchFields',
                            component: SearchFieldEditorControlComponent,
                            options: {
                                recordDefinitionModel: definitionModel,
                                isReadOnly: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly
                            }
                        },
                        ...weightedRelevancyFields
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'),
                    controls: [
                        {
                            name: 'isAuditingEnabled',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                            }
                        },
                        {
                            name: 'auditRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                            }
                        },
                        {
                            name: 'auditSourceRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audited-from.label')
                            }
                        }
                    ]
                }
            ];
        }
        if (isOverlayMode) {
            (_a = configs[0]) === null || _a === void 0 ? void 0 : _a.controls.splice(findIndex(configs[0].controls, { name: 'shouldExportData' }), 1);
        }
        if (isNewDefinition) {
            (_b = configs[0]) === null || _b === void 0 ? void 0 : _b.controls.splice(findIndex(configs[0].controls, { name: 'owner' }), 3);
        }
        return configs;
    }
}
RxRecordDesignerInspectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerInspectorService, deps: [{ token: i1.RxFieldDefinitionService }, { token: i2.RxOverlayService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDesignerInspectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerInspectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerInspectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxFieldDefinitionService }, { type: i2.RxOverlayService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=record-designer-inspector.service.js.map