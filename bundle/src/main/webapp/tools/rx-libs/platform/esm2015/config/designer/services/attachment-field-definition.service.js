import { Injectable, Injector } from '@angular/core';
import { CounterFormControlComponent } from '@helix/platform/shared/components';
import { RX_CONFIG_DESIGNER } from '../config-designer.constant';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import { RX_NUMBER } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class AttachmentFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Removed 'Key field for repeated setting' control from Details section
        inspectorConfig[1].controls.pop();
        // Adding controls specific to attachment field to Details section
        inspectorConfig[1].controls.push({
            name: 'maxValue',
            component: CounterFormControlComponent,
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
AttachmentFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
AttachmentFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=attachment-field-definition.service.js.map