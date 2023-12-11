import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxRefreshViewActionService } from './refresh-view-action.service';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ExpressionFormControlComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./refresh-view-action.service";
export class RefreshViewActionModule {
    constructor(rxViewActionRegistryService, rxRefreshViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxRefreshViewActionService = rxRefreshViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxRefreshAction',
            label: 'Refresh',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxRefreshViewActionService,
            parameters: [
                {
                    name: 'component',
                    label: 'View/Component',
                    enableExpressionEvaluation: true,
                    isRequired: true,
                    editor: ExpressionFormControlComponent
                }
            ]
        });
    }
}
RefreshViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxRefreshViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
RefreshViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule });
RefreshViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxRefreshViewActionService }]; } });
//# sourceMappingURL=refresh-view-action.module.js.map