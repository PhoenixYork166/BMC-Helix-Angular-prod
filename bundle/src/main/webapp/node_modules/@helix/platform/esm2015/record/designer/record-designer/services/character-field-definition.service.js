import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { CounterFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { inRange, size } from 'lodash';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { Tooltip } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxCharacterFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.character.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        if (this.rxFieldDefinitionInspectorHelperService.isStoreEncryptedVisible(fieldModel, definitionModel)) {
            inspectorConfig[1].controls.push({
                name: 'shouldPersistEncrypted',
                component: SwitchFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isStoreEncryptedEditable(fieldModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.store-encrypted.label')
                }
            });
        }
        if (this.rxFieldDefinitionInspectorHelperService.isStoreHashedVisible(fieldModel, definitionModel)) {
            inspectorConfig[1].controls.push({
                name: 'shouldPersistHashed',
                component: SwitchFormControlComponent,
                isDisabled: isReadOnly ||
                    !this.rxFieldDefinitionInspectorHelperService.isStoreHashedEditable(fieldModel, definitionModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.store-hashed.label')
                }
            });
        }
        inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
            {
                name: 'namedListDefinition',
                component: RxDefinitionPickerComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isNamedListEditable(fieldModel, definitionModel),
                options: {
                    definitionType: RxDefinitionPickerType.NamedList,
                    label: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.named-list.label')
                }
            },
            {
                name: 'maxLength',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isLengthEditable(fieldModel, definitionModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.length.label'),
                    tooltip: fieldModel.id === RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                        !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                        !fieldModel.isNewField
                        ? this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.display-id.length.tooltip')
                        : undefined,
                    allowIntegerOnly: true,
                    minValue: 0
                }
            },
            {
                name: 'defaultValue',
                component: TextFormControlComponent,
                isDisabled: isReadOnly ||
                    !this.rxFieldDefinitionInspectorHelperService.isDefaultValueEditable(fieldModel, definitionModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    tooltip: fieldModel.id === RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                        !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                        !fieldModel.isNewField
                        ? new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.display-id.default-value.tooltip'))
                        : undefined,
                    allowIntegerOnly: true
                }
            },
            {
                name: 'pattern',
                component: SelectFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.label'),
                    emptyOption: true,
                    options: [
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.alphabetical.label'),
                            id: '$ALPHA$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.alphanumeric.label'),
                            id: '$ALNUM$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.lowercase.label'),
                            id: '$LOWER$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.named-list.label'),
                            id: '$NAMEDLIST$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.numeric.label'),
                            id: '$DIGIT$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.uppercase.label'),
                            id: '$UPPER$'
                        }
                    ]
                }
            }
        ]);
        return inspectorConfig;
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxLength) && Number(fieldModel.maxLength) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'maxLength',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.id === RX_RECORD_DEFINITION.coreFieldIds.displayId &&
            (this.rxRecordDefinitionService.isRegularRecord(definitionModel) ||
                this.rxRecordDefinitionService.isExternalRecord(definitionModel))) {
            if (!(fieldModel.maxLength === 1 || inRange(fieldModel.maxLength, 5, 16))) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-max-length.message'),
                    data: {
                        propertyName: 'maxLength',
                        guid: fieldModel.guid
                    }
                });
            }
            if ((fieldModel.maxLength !== 1 && fieldModel.maxLength <= size(fieldModel.defaultValue)) ||
                (fieldModel.maxLength === 1 && size(fieldModel.defaultValue) >= 15)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-display-id-range.message'),
                    data: {
                        propertyName: 'maxLength',
                        guid: fieldModel.guid
                    }
                });
            }
        }
        return validationIssues;
    }
}
RxCharacterFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCharacterFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxCharacterFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCharacterFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCharacterFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });
//# sourceMappingURL=character-field-definition.service.js.map