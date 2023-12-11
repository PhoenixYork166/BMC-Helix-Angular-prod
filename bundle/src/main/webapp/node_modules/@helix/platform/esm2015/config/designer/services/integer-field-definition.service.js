import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { CounterFormControlComponent } from '@helix/platform/shared/components';
import { RX_NUMBER } from '@helix/platform/utils';
import { NumericFieldDefinitionService } from './numeric-field-definition.service';
import * as i0 from "@angular/core";
export class IntegerFieldDefinitionService extends NumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.integer.resourceType;
        this.minValue = RX_NUMBER.minInteger;
        this.maxValue = RX_NUMBER.maxInteger;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to integer field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                minValue: RX_NUMBER.minInteger,
                maxValue: RX_NUMBER.maxInteger,
                allowIntegerOnly: true
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                minValue: RX_NUMBER.minInteger,
                maxValue: RX_NUMBER.maxInteger,
                allowIntegerOnly: true
            }
        }, {
            name: 'defaultValue',
            component: CounterFormControlComponent,
            options: {
                allowIntegerOnly: true,
                minValue: RX_NUMBER.minInteger,
                maxValue: RX_NUMBER.maxInteger,
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
IntegerFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
IntegerFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=integer-field-definition.service.js.map