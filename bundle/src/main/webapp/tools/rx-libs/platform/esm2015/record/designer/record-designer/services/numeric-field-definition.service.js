import { Injectable, Injector } from '@angular/core';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { CounterFormControlComponent } from '@helix/platform/shared/components';
import { isNil, omitBy } from 'lodash';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxNumericFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (fieldModel.defaultValue && Number(fieldModel.defaultValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.defaultValue && Number(fieldModel.defaultValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            Number(fieldModel.defaultValue) >= this.minValue &&
            Number(fieldModel.defaultValue) < Number(fieldModel.minValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.defaultValue) <= this.maxValue &&
            Number(fieldModel.defaultValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (isNil(fieldModel.minValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (isNil(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.resourceType !== RX_RECORD_DEFINITION.dataTypes.integer.resourceType && isNil(fieldModel.precision)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.precision.label')
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to decimal field to Details section
        inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
            {
                name: 'precision',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: omitBy({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.precision.label'),
                    required: true,
                    allowIntegerOnly: true,
                    minValue: this.minPrecision,
                    maxValue: this.maxPrecision
                }, isNil)
            },
            {
                name: 'minValue',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    required: true,
                    allowIntegerOnly: this.allowOnlyInteger,
                    minValue: this.minValue,
                    maxValue: this.maxValue
                }
            },
            {
                name: 'maxValue',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    required: true,
                    allowIntegerOnly: this.allowOnlyInteger,
                    minValue: this.minValue,
                    maxValue: this.maxValue
                }
            },
            {
                name: 'defaultValue',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    allowIntegerOnly: this.allowOnlyInteger,
                    minValue: this.minValue,
                    maxValue: this.maxValue
                }
            }
        ]);
        return inspectorConfig;
    }
}
RxNumericFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumericFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNumericFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumericFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumericFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });
//# sourceMappingURL=numeric-field-definition.service.js.map