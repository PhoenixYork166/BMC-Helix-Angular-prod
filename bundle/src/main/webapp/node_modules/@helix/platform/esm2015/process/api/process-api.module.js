import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxCallActivityRegistryService } from './call-activity-registry.service';
import { ElementVisibilityOptions } from './process-element.types';
import * as i0 from "@angular/core";
import * as i1 from "./call-activity-registry.service";
export class RxProcessApiModule {
    constructor(rxCallActivityRegistryService) {
        this.rxCallActivityRegistryService = rxCallActivityRegistryService;
        this.rxCallActivityRegistryService.register({
            displayName: 'Approval Process',
            processDefinitionName: 'com.bmc.arsys.rx.approval:Approval Process V2',
            callActivityManagerServiceName: 'apApprovalProcessCallActivityManager',
            visibility: ElementVisibilityOptions.Always
        });
    }
}
RxProcessApiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, deps: [{ token: i1.RxCallActivityRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessApiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, imports: [CommonModule] });
RxProcessApiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCallActivityRegistryService }]; } });
//# sourceMappingURL=process-api.module.js.map