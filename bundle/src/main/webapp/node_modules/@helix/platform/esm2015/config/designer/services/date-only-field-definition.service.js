import { Injectable, Injector } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { DateFormControlComponent } from '@helix/platform/shared/components';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import * as i0 from "@angular/core";
export class DateOnlyFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to date only field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'defaultValue',
            component: DateFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
DateOnlyFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateOnlyFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
DateOnlyFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateOnlyFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateOnlyFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=date-only-field-definition.service.js.map