import { NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxLaunchProcessViewActionDesignManagerService } from './launch-process-view-action-design-manager.service';
import { RxLaunchProcessViewActionDesignModel } from './launch-process-view-action-design-model.class';
import { RxLaunchProcessViewActionService } from './launch-process-view-action.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./launch-process-view-action.service";
import * as i3 from "./launch-process-view-action-design-manager.service";
export class LaunchProcessViewActionModule {
    constructor(rxViewActionRegistryService, rxLaunchProcessViewActionService, rxLaunchProcessViewActionDesignManagerService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLaunchProcessViewActionService = rxLaunchProcessViewActionService;
        this.rxLaunchProcessViewActionDesignManagerService = rxLaunchProcessViewActionDesignManagerService;
        this.rxViewActionRegistryService.register({
            name: 'rxLaunchProcessAction',
            label: 'Launch process',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxLaunchProcessViewActionService,
            designManager: this.rxLaunchProcessViewActionDesignManagerService,
            designModel: RxLaunchProcessViewActionDesignModel,
            parameters: [
                {
                    name: 'processDefinitionName',
                    label: 'Process to start',
                    type: ViewComponentPropertyType.String,
                    isRequired: true
                },
                {
                    name: 'waitForProcessCompletion',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'actionProcessInputParams',
                    label: 'Input map',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
LaunchProcessViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxLaunchProcessViewActionService }, { token: i3.RxLaunchProcessViewActionDesignManagerService }], target: i0.ɵɵFactoryTarget.NgModule });
LaunchProcessViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule });
LaunchProcessViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule, providers: [RxLaunchProcessViewActionDesignManagerService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxLaunchProcessViewActionDesignManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxLaunchProcessViewActionService }, { type: i3.RxLaunchProcessViewActionDesignManagerService }]; } });
//# sourceMappingURL=launch-process-view-action.module.js.map