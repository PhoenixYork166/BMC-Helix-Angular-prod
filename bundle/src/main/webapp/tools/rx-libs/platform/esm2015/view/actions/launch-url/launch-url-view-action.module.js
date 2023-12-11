import { NgModule } from '@angular/core';
import { RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxLaunchUrlViewActionService } from './launch-url-view-action.service';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxLaunchUrlViewActionDesignModel } from './launch-url-view-action-design-model.class';
import { RxLaunchUrlViewActionDefinitionAdapterService } from './launch-url-view-action-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./launch-url-view-action.service";
import * as i3 from "./launch-url-view-action-definition-adapter.service";
export class LaunchUrlViewActionModule {
    constructor(rxViewActionDefinitionAdapterRegistryService, rxViewActionRegistryService, rxLaunchUrlViewActionService, rxLaunchUrlActionDefinitionAdapterService) {
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLaunchUrlViewActionService = rxLaunchUrlViewActionService;
        this.rxLaunchUrlActionDefinitionAdapterService = rxLaunchUrlActionDefinitionAdapterService;
        this.rxViewActionRegistryService.register({
            name: 'rxLaunchUrlAction',
            label: 'Launch URL',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxLaunchUrlViewActionService,
            designModel: RxLaunchUrlViewActionDesignModel,
            parameters: [
                {
                    name: 'url',
                    label: 'URL',
                    enableExpressionEvaluation: true,
                    isRequired: true
                },
                {
                    name: 'launchBehavior',
                    label: 'Launch behavior'
                }
            ]
        });
        rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter('rxLaunchUrlAction', this.rxLaunchUrlActionDefinitionAdapterService);
    }
}
LaunchUrlViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule, deps: [{ token: i1.RxViewActionDefinitionAdapterRegistryService }, { token: i1.RxViewActionRegistryService }, { token: i2.RxLaunchUrlViewActionService }, { token: i3.RxLaunchUrlViewActionDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
LaunchUrlViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule });
LaunchUrlViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionDefinitionAdapterRegistryService }, { type: i1.RxViewActionRegistryService }, { type: i2.RxLaunchUrlViewActionService }, { type: i3.RxLaunchUrlViewActionDefinitionAdapterService }]; } });
//# sourceMappingURL=launch-url-view-action.module.js.map