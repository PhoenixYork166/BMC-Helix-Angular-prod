import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_DESIGNER } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxStartEventService } from './start-event.service';
import { RxStartEvent } from './start-event.class';
import { RxStartEventView } from './start-event-view.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/api";
import * as i2 from "./start-event.service";
import * as i3 from "@ngx-translate/core";
export class RxStartEventRegistrationModule {
    constructor(rxProcessElementRegistryService, rxStartEventService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.display-name.label'),
            elementService: rxStartEventService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.events.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.solid,
                label: RX_DESIGNER.paletteItemLabel.outer,
                shape: RX_DESIGNER.paletteItemShape.circle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.startEvent,
            shapeClass: RxStartEvent,
            shapeType: 'StartEvent',
            type: RX_PROCESS_DEFINITION.processElementTypes.startEvent,
            viewShapeClass: RxStartEventView,
            viewShapeType: 'StartEventView'
        });
    }
}
RxStartEventRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule, deps: [{ token: i1.RxProcessElementRegistryService }, { token: i2.RxStartEventService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxStartEventRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule });
RxStartEventRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStartEventRegistrationModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxProcessElementRegistryService }, { type: i2.RxStartEventService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=start-event-registration.module.js.map