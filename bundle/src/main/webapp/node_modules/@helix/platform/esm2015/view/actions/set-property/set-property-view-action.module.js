import { NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxSetPropertyViewActionService } from './set-property-view-action.service';
import { RxSetPropertyViewActionDesignModel } from './set-property-view-action-design-model.class';
import { RxSetPropertyViewActionDesignManagerService } from './set-property-view-action-design-manager.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./set-property-view-action.service";
import * as i3 from "./set-property-view-action-design-manager.service";
export class SetPropertyViewActionModule {
    constructor(rxViewActionRegistryService, rxSetPropertyViewActionService, rxSetPropertyViewActionDesignManagerService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxSetPropertyViewActionService = rxSetPropertyViewActionService;
        this.rxSetPropertyViewActionDesignManagerService = rxSetPropertyViewActionDesignManagerService;
        this.rxViewActionRegistryService.register({
            name: 'rxSetPropertyAction',
            label: 'Set property',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxSetPropertyViewActionService,
            designModel: RxSetPropertyViewActionDesignModel,
            designManager: rxSetPropertyViewActionDesignManagerService,
            parameters: [
                {
                    name: 'componentApi',
                    label: 'Component API',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'propertyPath',
                    label: 'Property path',
                    isRequired: true
                },
                {
                    name: 'propertyValue',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
SetPropertyViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxSetPropertyViewActionService }, { token: i3.RxSetPropertyViewActionDesignManagerService }], target: i0.ɵɵFactoryTarget.NgModule });
SetPropertyViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule });
SetPropertyViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule, providers: [RxSetPropertyViewActionService, RxSetPropertyViewActionDesignManagerService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxSetPropertyViewActionService, RxSetPropertyViewActionDesignManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxSetPropertyViewActionService }, { type: i3.RxSetPropertyViewActionDesignManagerService }]; } });
//# sourceMappingURL=set-property-view-action.module.js.map