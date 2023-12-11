import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxAvcAssociateActionService } from './avc-associate-action.service';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./avc-associate-action.service";
export class AvcAssociateActionModule {
    constructor(rxViewActionRegistryService, rxAvcAssociateActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxAvcAssociateActionService = rxAvcAssociateActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxAvcAssociate',
            label: 'Avc associate',
            bundleId: RX_APPLICATION.platformBundleId,
            hidden: true,
            service: this.rxAvcAssociateActionService,
            parameters: [
                {
                    name: 'viewDefinitionName'
                },
                {
                    name: 'associationViewComponent',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
AvcAssociateActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxAvcAssociateActionService }], target: i0.ɵɵFactoryTarget.NgModule });
AvcAssociateActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, imports: [CommonModule] });
AvcAssociateActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxAvcAssociateActionService }]; } });
//# sourceMappingURL=avc-associate-action.module.js.map