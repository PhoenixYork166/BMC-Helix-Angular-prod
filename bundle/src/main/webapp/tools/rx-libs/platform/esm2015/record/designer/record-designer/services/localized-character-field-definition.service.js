import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { CounterFormControlComponent } from '@helix/platform/shared/components';
import { LocalizedCharacterFieldEditorComponent } from '../localized-character-field-editor/localized-character-field-editor.component';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxLocalizedCharacterFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { maxLength: 254 }));
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
            {
                name: 'maxLength',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.length.label'),
                    minValue: 0,
                    maxValue: 254,
                    allowIntegerOnly: true
                }
            },
            {
                name: 'defaultValueByLocale',
                component: LocalizedCharacterFieldEditorComponent,
                options: {
                    isReadOnly: isReadOnly
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
        return validationIssues;
    }
}
RxLocalizedCharacterFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocalizedCharacterFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });
//# sourceMappingURL=localized-character-field-definition.service.js.map