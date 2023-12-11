import { Injectable, Injector } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { CounterFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RX_NUMBER, RxNumberUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class CharacterFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.dataType = RX_RECORD_DEFINITION.dataTypes.character.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to character field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        }, {
            name: 'defaultValue',
            component: TextFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel) {
        const validationIssues = super.validate(fieldModel);
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) && Number(fieldModel.minValue) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) && Number(fieldModel.maxValue) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) > RX_NUMBER.maxInteger) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    maxValue: RX_NUMBER.maxInteger
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) > RX_NUMBER.maxInteger) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                    maxValue: RX_NUMBER.maxInteger
                }),
                data: {
                    propertyName: 'maxValue',
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
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
CharacterFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CharacterFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
CharacterFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CharacterFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CharacterFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });
//# sourceMappingURL=character-field-definition.service.js.map