import { Injectable, Injector } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { SelectFormControlComponent } from '@helix/platform/shared/components';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import * as i0 from "@angular/core";
export class BooleanFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.boolean.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to boolean field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'defaultValue',
            component: SelectFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                emptyOption: true,
                options: [
                    {
                        id: 'true',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.true')
                    },
                    {
                        id: 'false',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.false')
                    }
                ]
            }
        });
        return inspectorConfig;
    }
}
BooleanFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
BooleanFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=boolean-field-definition.service.js.map