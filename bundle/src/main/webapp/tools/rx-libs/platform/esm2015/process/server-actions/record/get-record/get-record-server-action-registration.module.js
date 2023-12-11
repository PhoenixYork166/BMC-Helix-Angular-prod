import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_DESIGNER, RX_DESIGNER_ELEMENT_SHAPE } from '@helix/platform/shared/api';
import { RX_PROCESS_DEFINITION, RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxProcessActionView } from '@helix/platform/process/elements';
import { RxGetRecordProcessActionService } from './process/get-record-process-action.service';
import { RxGetRecordProcessAction } from './process/get-record-process-action.class';
import { RxGetRecordInputMapInspectorWidgetModule } from './components/get-record-input-map-inspector-widget/get-record-input-map-inspector-widget.module';
import * as i0 from "@angular/core";
import * as i1 from "./process/get-record-process-action.service";
import * as i2 from "@helix/platform/process/api";
import * as i3 from "@ngx-translate/core";
export class RxGetRecordServerActionRegistrationModule {
    constructor(rxGetRecordProcessActionService, rxProcessElementRegistryService, translateService) {
        rxProcessElementRegistryService.register({
            displayName: translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.get-record.name.label'),
            elementService: rxGetRecordProcessActionService,
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
            shapeClass: RxGetRecordProcessAction,
            shapeType: 'ProcessActions.getRecord',
            type: 'rx.ProcessActions.getRecord',
            viewShapeClass: RxProcessActionView,
            viewShapeType: 'ProcessActions.getRecordView'
        });
    }
}
RxGetRecordServerActionRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, deps: [{ token: i1.RxGetRecordProcessActionService }, { token: i2.RxProcessElementRegistryService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxGetRecordServerActionRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, imports: [RxGetRecordInputMapInspectorWidgetModule] });
RxGetRecordServerActionRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, imports: [[RxGetRecordInputMapInspectorWidgetModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordServerActionRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxGetRecordInputMapInspectorWidgetModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGetRecordProcessActionService }, { type: i2.RxProcessElementRegistryService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=get-record-server-action-registration.module.js.map