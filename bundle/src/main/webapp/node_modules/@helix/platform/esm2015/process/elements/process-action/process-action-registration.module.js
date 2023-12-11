import { NgModule } from '@angular/core';
import { RX_DESIGNER, RX_DESIGNER_ELEMENT_SHAPE } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxProcessActionService } from './process-action.service';
import { RxProcessAction } from './process-action.class';
import { RxProcessActionView } from './process-action-view.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/api";
import * as i2 from "./process-action.service";
export class RxProcessActionRegistrationModule {
    constructor(rxProcessElementRegistryService, rxProcessActionService) {
        rxProcessElementRegistryService.register({
            elementService: rxProcessActionService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.bold,
                icon: {
                    path: RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                    position: RX_DESIGNER.paletteIconPosition.top
                },
                label: RX_DESIGNER.paletteItemLabel.outer,
                shape: RX_DESIGNER.paletteItemShape.rectangle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
            shapeClass: RxProcessAction,
            shapeType: 'ProcessAction',
            type: RX_PROCESS_DEFINITION.processElementTypes.processAction,
            viewShapeClass: RxProcessActionView,
            viewShapeType: 'ProcessActionView'
        });
    }
}
RxProcessActionRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule, deps: [{ token: i1.RxProcessElementRegistryService }, { token: i2.RxProcessActionService }], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessActionRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule });
RxProcessActionRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessActionRegistrationModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxProcessElementRegistryService }, { type: i2.RxProcessActionService }]; } });
//# sourceMappingURL=process-action-registration.module.js.map