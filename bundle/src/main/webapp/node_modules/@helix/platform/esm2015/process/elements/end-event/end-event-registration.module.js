import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_DESIGNER } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxEndEventService } from './end-event.service';
import { RxEndEvent } from './end-event.class';
import { RxEndEventView } from './end-event-view.class';
import * as i0 from "@angular/core";
import * as i1 from "./end-event.service";
import * as i2 from "@helix/platform/process/api";
import * as i3 from "@ngx-translate/core";
export class RxEndEventRegistrationModule {
    constructor(rxEndEventService, rxProcessElementRegistryService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.end-event.display-name.label'),
            elementService: rxEndEventService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.events.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.bold,
                label: RX_DESIGNER.paletteItemLabel.outer,
                shape: RX_DESIGNER.paletteItemShape.circle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent,
            shapeClass: RxEndEvent,
            shapeType: 'EndEvent',
            type: RX_PROCESS_DEFINITION.processElementTypes.endEvent,
            viewShapeClass: RxEndEventView,
            viewShapeType: 'EndEventView'
        });
    }
}
RxEndEventRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule, deps: [{ token: i1.RxEndEventService }, { token: i2.RxProcessElementRegistryService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxEndEventRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule });
RxEndEventRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventRegistrationModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxEndEventService }, { type: i2.RxProcessElementRegistryService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=end-event-registration.module.js.map