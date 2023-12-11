import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injectable, Injector } from '@angular/core';
import { CounterFormControlComponent } from '@helix/platform/shared/components';
import { RX_NUMBER } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxAttachmentFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.attachment.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to attachment field to Details section
        inspectorConfig[1].controls.push({
            name: 'maxSize',
            component: CounterFormControlComponent,
            isDisabled: isReadOnly,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.max-file-size.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        });
        return inspectorConfig;
    }
}
RxAttachmentFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAttachmentFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAttachmentFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAttachmentFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAttachmentFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=attachment-field-definition.service.js.map