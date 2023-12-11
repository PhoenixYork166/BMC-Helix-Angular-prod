import { RX_NUMBER, RxIdService } from '@helix/platform/utils';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { RX_PERMISSION } from '@helix/platform/shared/api';
import { BooleanFormControlComponent, CounterFormControlComponent, LabelFormControlComponent, RxPermissionEditorComponent, SelectFormControlComponent, SwitchFormControlComponent, TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxFieldDefinitionInspectorHelperService } from './field-definition-inspector-helper.service';
import { includes, inRange, isEmpty, isNumber, trim } from 'lodash';
import { FieldOptionEditorComponent } from '../field-option-editor/field-option-editor.component';
export class RxBaseFieldDefinitionService {
    constructor(injector) {
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxIdService = this.injector.get(RxIdService);
        this.rxFieldDefinitionService = this.injector.get(RxFieldDefinitionService);
        this.rxFieldDefinitionInspectorHelperService = this.injector.get(RxFieldDefinitionInspectorHelperService);
        this.rxRecordDefinitionService = this.injector.get(RxRecordDefinitionService);
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return Object.assign({ id: this.rxIdService.generate(), name: this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label'), description: null, fieldOption: RX_RECORD_DEFINITION.fieldOptions.optional, defaultValue: null, allowPermissionsOverlay: true, allowOtherPropertiesOverlay: true, resourceType: this.resourceType }, fieldProperties);
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const isJoinedField = this.rxFieldDefinitionService.isJoinedField(fieldModel);
        const isExternalRecordField = this.rxFieldDefinitionService.isExternalRecordField(fieldModel);
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'name',
                        component: TextFormControlComponent,
                        isDisabled: !this.rxFieldDefinitionInspectorHelperService.isNameEditable(fieldModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'description',
                        component: TextareaFormControlComponent,
                        isDisabled: isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.isDescriptionEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                        }
                    },
                    {
                        name: 'resourceType',
                        component: SelectFormControlComponent,
                        isDisabled: true,
                        options: {
                            required: true,
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                            options: [
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.attachment.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.attachment.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.boolean.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.boolean.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateTime.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.decimal.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.real.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.real.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.integer.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.localizedCharacter.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.selection.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.selection.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.character.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.timeOnly.labelKey)
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.details.label'),
                controls: [
                    {
                        name: 'fieldOption',
                        component: FieldOptionEditorComponent,
                        isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isRequiredEditable(fieldModel)
                    },
                    {
                        name: 'anyUserAllowedToSubmit',
                        component: SwitchFormControlComponent,
                        isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isSubmitEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.allow-anyone-to-submit.label')
                        }
                    },
                    {
                        name: 'permissions',
                        component: RxPermissionEditorComponent,
                        isDisabled: isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.arePermissionsEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                            type: 'config',
                            permissionScope: RX_PERMISSION.permissionScope.all
                        }
                    },
                    {
                        name: '',
                        component: LabelFormControlComponent,
                        options: {
                            labelKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'
                        }
                    },
                    {
                        name: 'audit',
                        component: BooleanFormControlComponent,
                        isDisabled: isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.isAuditingEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.audit.label'),
                            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.audit.tooltip'),
                            shouldDisplayAsCheckbox: true
                        }
                    },
                    {
                        name: 'copy',
                        component: BooleanFormControlComponent,
                        isDisabled: fieldModel.audit ||
                            isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.isAuditingEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.copy.label'),
                            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.copy.tooltip'),
                            shouldDisplayAsCheckbox: true
                        }
                    },
                    {
                        name: 'id',
                        component: CounterFormControlComponent,
                        isDisabled: this.rxFieldDefinitionInspectorHelperService.isFieldIdDisabled(fieldModel, fieldModel.isNewField),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.field-id.label'),
                            allowIntegerOnly: true
                        }
                    }
                ]
            }
        ];
    }
    validate(fieldModel, definitionModel) {
        const issues = [];
        if (isEmpty(trim(fieldModel.name))) {
            issues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                }),
                data: {
                    propertyName: 'name',
                    guid: fieldModel.guid
                }
            });
        }
        if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(fieldModel.name)) {
            issues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                }),
                data: {
                    propertyName: 'name',
                    guid: fieldModel.guid
                }
            });
        }
        if (!fieldModel.lastUpdateTime &&
            isNumber(fieldModel.id) &&
            !this.rxFieldDefinitionService.isExternalRecordField(fieldModel) &&
            inRange(fieldModel.id, 1, RX_RECORD_DEFINITION.AR_MAX_RESERVED_FIELD_ID + 1) &&
            !includes(RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldModel.id)) {
            issues.push({
                type: ValidationIssueType.Warning,
                data: {
                    propertyName: 'id',
                    guid: fieldModel.guid
                },
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.field-id-in-bmc-reserved-range-warning.message')
            });
        }
        if (fieldModel.id && !inRange(fieldModel.id, 1, RX_NUMBER.maxInteger + 1)) {
            issues.push({
                type: ValidationIssueType.Error,
                data: {
                    propertyName: 'id',
                    guid: fieldModel.guid
                },
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-field-id-range.message', { max: RX_NUMBER.maxInteger })
            });
        }
        return issues;
    }
}
//# sourceMappingURL=base-field-definition.service.js.map