import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { SelectFormControlComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class RxBooleanFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.boolean.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to boolean field to Details section
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            component: SelectFormControlComponent,
            isDisabled: isReadOnly,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                emptyOption: true,
                options: [
                    {
                        id: '0',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.true')
                    },
                    {
                        id: '1',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.false')
                    }
                ]
            }
        });
        return inspectorConfig;
    }
}
RxBooleanFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxBooleanFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=boolean-field-definition.service.js.map