import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { TimeFormControlComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class RxTimeOnlyFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            isDisabled: isReadOnly,
            component: TimeFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
RxTimeOnlyFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTimeOnlyFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxTimeOnlyFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTimeOnlyFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTimeOnlyFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=time-only-field-definition.service.js.map