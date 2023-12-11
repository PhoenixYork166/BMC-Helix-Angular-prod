import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_CONFIG_DESIGNER } from '../config-designer.constant';
import { AttachmentFieldDefinitionService } from './attachment-field-definition.service';
import { BooleanFieldDefinitionService } from './boolean-field-definition.service';
import { CharacterFieldDefinitionService } from './character-field-definition.service';
import { ColorFieldDefinitionService } from './color-field-definition.service';
import { DateOnlyFieldDefinitionService } from './date-only-field-definition.service';
import { DecimalFieldDefinitionService } from './decimal-field-definition.service';
import { IntegerFieldDefinitionService } from './integer-field-definition.service';
import { SecureFieldDefinitionService } from './secure-field-definition.service';
import { SelectionFieldDefinitionService } from './selection-field-definition.service';
import * as i0 from "@angular/core";
import * as i1 from "./attachment-field-definition.service";
import * as i2 from "./boolean-field-definition.service";
import * as i3 from "./character-field-definition.service";
import * as i4 from "./color-field-definition.service";
import * as i5 from "./date-only-field-definition.service";
import * as i6 from "./decimal-field-definition.service";
import * as i7 from "./integer-field-definition.service";
import * as i8 from "./secure-field-definition.service";
import * as i9 from "./selection-field-definition.service";
export class FieldDefinitionManagerService {
    constructor(attachmentFieldDefinitionService, booleanFieldDefinitionService, characterFieldDefinitionService, colorFieldDefinitionService, dateOnlyFieldDefinitionService, decimalFieldDefinitionService, integerFieldDefinitionService, secureFieldDefinitionService, selectionFieldDefinitionService) {
        this.fieldServices = new Map();
        this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType, attachmentFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, booleanFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.character.resourceType, characterFieldDefinitionService);
        this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.color.resourceType, colorFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType, dateOnlyFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.decimal.resourceType, decimalFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.integer.resourceType, integerFieldDefinitionService);
        this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.secure.resourceType, secureFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.selection.resourceType, selectionFieldDefinitionService);
    }
    getNewFieldDefinitionModel(resourceType, fieldProperties) {
        return this.fieldServices.get(resourceType).getNewFieldDefinitionModel(fieldProperties);
    }
    getFieldInspectorConfig(resourceType, options) {
        return this.fieldServices.get(resourceType).getFieldInspectorConfig(options);
    }
    validate(fieldModel) {
        return this.fieldServices.get(fieldModel.dataType).validate(fieldModel);
    }
}
FieldDefinitionManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldDefinitionManagerService, deps: [{ token: i1.AttachmentFieldDefinitionService }, { token: i2.BooleanFieldDefinitionService }, { token: i3.CharacterFieldDefinitionService }, { token: i4.ColorFieldDefinitionService }, { token: i5.DateOnlyFieldDefinitionService }, { token: i6.DecimalFieldDefinitionService }, { token: i7.IntegerFieldDefinitionService }, { token: i8.SecureFieldDefinitionService }, { token: i9.SelectionFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
FieldDefinitionManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldDefinitionManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldDefinitionManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AttachmentFieldDefinitionService }, { type: i2.BooleanFieldDefinitionService }, { type: i3.CharacterFieldDefinitionService }, { type: i4.ColorFieldDefinitionService }, { type: i5.DateOnlyFieldDefinitionService }, { type: i6.DecimalFieldDefinitionService }, { type: i7.IntegerFieldDefinitionService }, { type: i8.SecureFieldDefinitionService }, { type: i9.SelectionFieldDefinitionService }]; } });
//# sourceMappingURL=field-definition-manager.service.js.map