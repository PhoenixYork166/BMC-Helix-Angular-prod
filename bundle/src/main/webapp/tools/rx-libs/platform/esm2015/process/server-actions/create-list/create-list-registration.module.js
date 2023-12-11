import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_DESIGNER, RX_DESIGNER_ELEMENT_SHAPE } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxExpressionInputMapInspectorWidgetModule, RxProcessActionView } from '@helix/platform/process/elements';
import { RxCreateListProcessAction } from './process/create-list-process-action.class';
import { RxCreateListProcessActionService } from './process/create-list-process-action.service';
import * as i0 from "@angular/core";
import * as i1 from "./process/create-list-process-action.service";
import * as i2 from "@helix/platform/process/api";
import * as i3 from "@ngx-translate/core";
export class RxCreateListRegistrationModule {
    constructor(rxCreateListProcessActionService, rxProcessElementRegistryService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.name.label'),
            elementService: rxCreateListProcessActionService,
            group: RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
            paletteItem: {
                border: RX_DESIGNER.paletteItemBorder.solid,
                icon: {
                    path: RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                    position: RX_DESIGNER.paletteIconPosition.top
                },
                label: RX_DESIGNER.paletteItemLabel.inner,
                shape: RX_DESIGNER.paletteItemShape.rectangle
            },
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
            shapeClass: RxCreateListProcessAction,
            shapeType: 'ProcessActions.createList',
            type: 'rx.ProcessActions.createList',
            viewShapeClass: RxProcessActionView,
            viewShapeType: 'ProcessActions.createListView'
        });
    }
}
RxCreateListRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, deps: [{ token: i1.RxCreateListProcessActionService }, { token: i2.RxProcessElementRegistryService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxCreateListRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, imports: [RxExpressionInputMapInspectorWidgetModule] });
RxCreateListRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, imports: [[RxExpressionInputMapInspectorWidgetModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCreateListRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxExpressionInputMapInspectorWidgetModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCreateListProcessActionService }, { type: i2.RxProcessElementRegistryService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=create-list-registration.module.js.map