import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { Injectable } from '@angular/core';
import { RxNumericFieldDefinitionService } from './numeric-field-definition.service';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export class RxRealFieldDefinitionService extends RxNumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.real.resourceType;
        this.maxPrecision = null;
        this.minValue = -1.845e19;
        this.maxValue = 1.845e19;
        this.allowOnlyInteger = false;
        this.AR_PRECISION_NONE = -1;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { precision: 6, minValue: this.minValue, maxValue: this.maxValue }));
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (!isFinite(fieldModel.precision) ||
            (fieldModel.precision < 1 && fieldModel.precision != this.AR_PRECISION_NONE)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-real-field-precision-range.message'),
                data: {
                    propertyName: 'precision',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxRealFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRealFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxRealFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRealFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRealFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=real-field-definition.service.js.map