import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { CounterFormControlComponent } from '@helix/platform/shared/components';
import { RX_NUMBER } from '@helix/platform/utils';
import { NumericFieldDefinitionService } from './numeric-field-definition.service';
import * as i0 from "@angular/core";
export class DecimalFieldDefinitionService extends NumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.decimal.resourceType;
        this.minValue = RX_NUMBER.minDecimal;
        this.maxValue = RX_NUMBER.maxDecimal;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to decimal field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                minValue: RX_NUMBER.minDecimal,
                maxValue: RX_NUMBER.maxDecimal
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                minValue: RX_NUMBER.minDecimal,
                maxValue: RX_NUMBER.maxDecimal
            }
        }, {
            name: 'defaultValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                minValue: RX_NUMBER.minDecimal,
                maxValue: RX_NUMBER.maxDecimal
            }
        });
        return inspectorConfig;
    }
}
DecimalFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
DecimalFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=decimal-field-definition.service.js.map