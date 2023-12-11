import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptDockedPanelModule } from '@bmc-ux/adapt-angular';
import { RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RuntimeViewModule } from '@helix/platform/view/runtime';
import { RxOpenViewActionService } from './open-view-action.service';
import { RxOpenViewDefinitionAdapterService } from './open-view-action-definition-adapter.service';
import { RX_OPEN_VIEW } from './open-view-action.constant';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxOpenViewActionDesignModel } from './open-view-action-design-model.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./open-view-action-definition-adapter.service";
import * as i3 from "./open-view-action.service";
export class OpenViewActionModule {
    constructor(rxViewActionDefinitionAdapterRegistryService, openViewDefinitionAdapterService, rxViewActionRegistryService, rxOpenViewActionService) {
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.openViewDefinitionAdapterService = openViewDefinitionAdapterService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxViewActionRegistryService.register({
            name: RX_OPEN_VIEW.actionName,
            label: 'Open view',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxOpenViewActionService,
            designModel: RxOpenViewActionDesignModel,
            parameters: [
                {
                    name: 'viewDefinitionName',
                    label: 'View',
                    isRequired: true
                },
                {
                    name: 'viewParams',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'presentation',
                    attributes: [
                        {
                            name: 'title',
                            localizable: true
                        }
                    ]
                }
            ]
        });
        rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter(RX_OPEN_VIEW.actionName, this.openViewDefinitionAdapterService);
    }
}
OpenViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, deps: [{ token: i1.RxViewActionDefinitionAdapterRegistryService }, { token: i2.RxOpenViewDefinitionAdapterService }, { token: i1.RxViewActionRegistryService }, { token: i3.RxOpenViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
OpenViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, imports: [CommonModule, RuntimeViewModule, AdaptDockedPanelModule] });
OpenViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, imports: [[CommonModule, RuntimeViewModule, AdaptDockedPanelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewModule, AdaptDockedPanelModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionDefinitionAdapterRegistryService }, { type: i2.RxOpenViewDefinitionAdapterService }, { type: i1.RxViewActionRegistryService }, { type: i3.RxOpenViewActionService }]; } });
//# sourceMappingURL=open-view-action.module.js.map