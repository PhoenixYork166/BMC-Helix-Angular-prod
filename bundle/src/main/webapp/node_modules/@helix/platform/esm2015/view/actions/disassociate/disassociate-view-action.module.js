import { NgModule } from '@angular/core';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxDisassociateViewActionService } from './disassociate-view-action.service';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxDisassociateViewActionDesignModel } from './disassociate-view-action-design-model.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./disassociate-view-action.service";
export class DisassociateViewActionModule {
    constructor(rxViewActionRegistryService, rxDisassociateViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxDisassociateViewActionService = rxDisassociateViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxDisassociateAction',
            label: 'Disassociate records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxDisassociateViewActionService,
            designModel: RxDisassociateViewActionDesignModel,
            parameters: [
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition to disassociate',
                    isRequired: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'associationDefinitionName',
                    label: 'Association to use',
                    isRequired: true
                },
                {
                    name: 'associationDefinitionRole',
                    label: 'Associated record node side',
                    isRequired: true
                },
                {
                    name: 'associatedRecordId',
                    label: 'Associated record ID',
                    enableExpressionEvaluation: true,
                    isRequired: true
                },
                {
                    name: 'disassociatedRecordIds',
                    label: 'Records to disassociate',
                    enableExpressionEvaluation: true,
                    isRequired: true
                }
            ]
        });
    }
}
DisassociateViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxDisassociateViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
DisassociateViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule });
DisassociateViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxDisassociateViewActionService }]; } });
//# sourceMappingURL=disassociate-view-action.module.js.map