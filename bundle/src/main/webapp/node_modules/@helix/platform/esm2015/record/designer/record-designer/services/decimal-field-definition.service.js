import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { Injectable } from '@angular/core';
import { RxNumericFieldDefinitionService } from './numeric-field-definition.service';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { inRange } from 'lodash';
import { RX_NUMBER } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxDecimalFieldDefinitionService extends RxNumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.decimal.resourceType;
        this.minPrecision = 0;
        this.maxPrecision = 9;
        this.minValue = RX_NUMBER.minDecimal;
        this.maxValue = RX_NUMBER.maxDecimal;
        this.allowOnlyInteger = false;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { precision: 2, minValue: this.minValue, maxValue: this.maxValue }));
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (!inRange(fieldModel.precision, this.minPrecision, this.maxPrecision + 1)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-precision-range.message', {
                    min: this.minPrecision,
                    max: this.maxPrecision
                }),
                data: {
                    propertyName: 'precision',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxDecimalFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDecimalFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxDecimalFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDecimalFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDecimalFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=decimal-field-definition.service.js.map