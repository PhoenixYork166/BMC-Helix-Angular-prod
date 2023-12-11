import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { DateTimeFormControlComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class RxDateTimeFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to date only field to Details section
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            component: DateTimeFormControlComponent,
            isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel),
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
RxDateTimeFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxDateTimeFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=date-time-field-definition.service.js.map