import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { RX_CONFIG_DESIGNER } from '../config-designer.constant';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { trim } from 'lodash';
export class BaseFieldDefinitionService {
    constructor(injector) {
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.defaultFieldGroupName = this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label');
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return Object.assign({ dataType: this.dataType, required: false, defaultValue: null, localeList: [
                {
                    locale: 'en',
                    fieldGrouping: this.defaultFieldGroupName,
                    settingLabel: fieldProperties.id
                }
            ] }, fieldProperties);
    }
    getFieldInspectorConfig(options) {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'id',
                        component: TextFormControlComponent,
                        isDisabled: !options.isNew,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'settingLabel',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.field-label.label'),
                            required: true
                        }
                    },
                    {
                        name: 'dataType',
                        component: SelectFormControlComponent,
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                            options: [
                                {
                                    id: RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType,
                                    name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.attachment.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.boolean.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.boolean.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.character.labelKey)
                                },
                                {
                                    id: RX_CONFIG_DESIGNER.dataTypes.color.resourceType,
                                    name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.color.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.decimal.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.integer.labelKey)
                                },
                                {
                                    id: RX_CONFIG_DESIGNER.dataTypes.secure.resourceType,
                                    name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.secure.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.selection.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.selection.labelKey)
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
                        name: 'required',
                        component: SwitchFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.required-field.label')
                        }
                    },
                    {
                        name: 'keySetting',
                        component: SwitchFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.key-field.label')
                        }
                    }
                ]
            }
        ];
    }
    validate(fieldModel) {
        const validationIssues = [];
        if (!trim(fieldModel.id)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                }),
                data: {
                    propertyName: 'id',
                    guid: fieldModel.guid
                }
            });
        }
        if (!trim(fieldModel.settingLabel)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.field-label.label')
                }),
                data: {
                    propertyName: 'settingLabel',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
//# sourceMappingURL=base-field-definition.service.js.map