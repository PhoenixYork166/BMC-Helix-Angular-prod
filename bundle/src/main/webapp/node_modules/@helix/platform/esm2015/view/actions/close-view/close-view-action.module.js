import { NgModule } from '@angular/core';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxCloseViewActionService } from './close-view-action.service';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { SwitchFormControlComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./close-view-action.service";
export class CloseViewActionModule {
    constructor(rxViewActionRegistryService, rxCloseViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxCloseViewActionService = rxCloseViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxCloseViewAction',
            label: 'Close view',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxCloseViewActionService,
            parameters: [
                {
                    name: 'viewApi',
                    enableExpressionEvaluation: true,
                    defaultValue: '${view.api}'
                },
                {
                    name: 'actAsCancel',
                    label: 'Act as cancel',
                    editor: SwitchFormControlComponent,
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                }
            ]
        });
    }
}
CloseViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxCloseViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
CloseViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule });
CloseViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxCloseViewActionService }]; } });
//# sourceMappingURL=close-view-action.module.js.map