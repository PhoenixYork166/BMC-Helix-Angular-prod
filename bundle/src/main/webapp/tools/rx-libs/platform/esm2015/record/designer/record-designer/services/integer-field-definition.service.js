import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { Injectable } from '@angular/core';
import { RxNumericFieldDefinitionService } from './numeric-field-definition.service';
import { RX_NUMBER } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxIntegerFieldDefinitionService extends RxNumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.integer.resourceType;
        this.minPrecision = null;
        this.maxPrecision = null;
        this.minValue = RX_NUMBER.minInteger;
        this.maxValue = RX_NUMBER.maxInteger;
        this.allowOnlyInteger = true;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { minValue: this.minValue, maxValue: this.maxValue }));
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Removing Precision control not required for integer field
        inspectorConfig[1].controls.splice(7, 1);
        return inspectorConfig;
    }
}
RxIntegerFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIntegerFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxIntegerFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIntegerFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIntegerFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=integer-field-definition.service.js.map