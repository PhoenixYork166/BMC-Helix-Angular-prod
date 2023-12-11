import { NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxUnknownViewActionService } from './unknown-view-action.service';
import { RxUnknownViewActionDesignManager } from './unknown-view-action-design-manager.service';
import { RxUnknownViewActionDesignModel } from './unknown-view-action-design-model.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./unknown-view-action.service";
import * as i3 from "./unknown-view-action-design-manager.service";
export class UnknownViewActionModule {
    constructor(rxViewActionRegistryService, rxUnknownViewActionService, rxUnknownViewActionDesignManager) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxUnknownViewActionService = rxUnknownViewActionService;
        this.rxUnknownViewActionDesignManager = rxUnknownViewActionDesignManager;
        this.rxViewActionRegistryService.register({
            name: 'rxUnknownViewAction',
            label: 'Unknown',
            bundleId: RX_APPLICATION.platformBundleId,
            designModel: RxUnknownViewActionDesignModel,
            designManager: this.rxUnknownViewActionDesignManager,
            service: this.rxUnknownViewActionService,
            parameters: [],
            hidden: true
        });
    }
}
UnknownViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxUnknownViewActionService }, { token: i3.RxUnknownViewActionDesignManager }], target: i0.ɵɵFactoryTarget.NgModule });
UnknownViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule });
UnknownViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule, providers: [RxUnknownViewActionService, RxUnknownViewActionDesignManager] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxUnknownViewActionService, RxUnknownViewActionDesignManager]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxUnknownViewActionService }, { type: i3.RxUnknownViewActionDesignManager }]; } });
//# sourceMappingURL=unknown-view-action.module.js.map