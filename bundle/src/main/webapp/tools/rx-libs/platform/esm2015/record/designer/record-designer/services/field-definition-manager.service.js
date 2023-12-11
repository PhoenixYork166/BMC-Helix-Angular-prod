import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxAttachmentFieldDefinitionService } from './attachment-field-definition.service';
import { RxBooleanFieldDefinitionService } from './boolean-field-definition.service';
import { RxCharacterFieldDefinitionService } from './character-field-definition.service';
import { RxDateOnlyFieldDefinitionService } from './date-only-field-definition.service';
import { RxDateTimeFieldDefinitionService } from './date-time-field-definition.service';
import { RxDecimalFieldDefinitionService } from './decimal-field-definition.service';
import { RxIntegerFieldDefinitionService } from './integer-field-definition.service';
import { RxLocalizedCharacterFieldDefinitionService } from './localized-character-field-definition.service';
import { RxRealFieldDefinitionService } from './real-field-definition.service';
import { RxSelectionFieldDefinitionService } from './selection-field-definition.service';
import { RxTimeOnlyFieldDefinitionService } from './time-only-field-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "./attachment-field-definition.service";
import * as i2 from "./boolean-field-definition.service";
import * as i3 from "./character-field-definition.service";
import * as i4 from "./localized-character-field-definition.service";
import * as i5 from "./date-time-field-definition.service";
import * as i6 from "./date-only-field-definition.service";
import * as i7 from "./time-only-field-definition.service";
import * as i8 from "./integer-field-definition.service";
import * as i9 from "./decimal-field-definition.service";
import * as i10 from "./real-field-definition.service";
import * as i11 from "./selection-field-definition.service";
export class RxFieldDefinitionManagerService {
    constructor(rxAttachmentFieldDefinitionService, rxBooleanFieldDefinitionService, rxCharacterFieldDefinitionService, rxLocalizedCharacterFieldDefinitionService, rxDateTimeFieldDefinitionService, rxDateOnlyFieldDefinitionService, rxTimeOnlyFieldDefinitionService, rxIntegerFieldDefinitionService, rxDecimalFieldDefinitionService, rxRealFieldDefinitionService, rxSelectionFieldDefinitionService) {
        this.fieldServices = new Map();
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.attachment.resourceType, rxAttachmentFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, rxBooleanFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.character.resourceType, rxCharacterFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType, rxLocalizedCharacterFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType, rxDateTimeFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType, rxDateOnlyFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType, rxTimeOnlyFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.integer.resourceType, rxIntegerFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.decimal.resourceType, rxDecimalFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.real.resourceType, rxRealFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.selection.resourceType, rxSelectionFieldDefinitionService);
    }
    getNewFieldDefinitionModel(resourceType, fieldProperties) {
        return this.fieldServices.get(resourceType).getNewFieldDefinitionModel(fieldProperties);
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        return this.fieldServices
            .get(fieldModel.resourceType)
            .getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
    }
    validate(fieldModel, definitionModel) {
        return this.fieldServices.get(fieldModel.resourceType).validate(fieldModel, definitionModel);
    }
}
RxFieldDefinitionManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionManagerService, deps: [{ token: i1.RxAttachmentFieldDefinitionService }, { token: i2.RxBooleanFieldDefinitionService }, { token: i3.RxCharacterFieldDefinitionService }, { token: i4.RxLocalizedCharacterFieldDefinitionService }, { token: i5.RxDateTimeFieldDefinitionService }, { token: i6.RxDateOnlyFieldDefinitionService }, { token: i7.RxTimeOnlyFieldDefinitionService }, { token: i8.RxIntegerFieldDefinitionService }, { token: i9.RxDecimalFieldDefinitionService }, { token: i10.RxRealFieldDefinitionService }, { token: i11.RxSelectionFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAttachmentFieldDefinitionService }, { type: i2.RxBooleanFieldDefinitionService }, { type: i3.RxCharacterFieldDefinitionService }, { type: i4.RxLocalizedCharacterFieldDefinitionService }, { type: i5.RxDateTimeFieldDefinitionService }, { type: i6.RxDateOnlyFieldDefinitionService }, { type: i7.RxTimeOnlyFieldDefinitionService }, { type: i8.RxIntegerFieldDefinitionService }, { type: i9.RxDecimalFieldDefinitionService }, { type: i10.RxRealFieldDefinitionService }, { type: i11.RxSelectionFieldDefinitionService }]; } });
//# sourceMappingURL=field-definition-manager.service.js.map