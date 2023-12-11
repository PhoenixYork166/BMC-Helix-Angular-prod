import { NgModule } from '@angular/core';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxAssociateViewActionService } from './associate-view-action.service';
import { OpenViewActionModule } from '../open-view/open-view-action.module';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxAssociateViewActionDesignModel } from './associate-view-action-design-model.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./associate-view-action.service";
export class AssociateViewActionModule {
    constructor(rxViewActionRegistryService, rxAssociateViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxAssociateViewActionService = rxAssociateViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxAssociateAction',
            label: 'Associate records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxAssociateViewActionService,
            designModel: RxAssociateViewActionDesignModel,
            parameters: [
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition to associate',
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
                    name: 'viewDefinitionName',
                    label: 'View for selecting or creating associated records',
                    isRequired: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'useDefaultRoles'
                },
                {
                    name: 'nodeARole',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'nodeBRole',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
AssociateViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxAssociateViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
AssociateViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, imports: [OpenViewActionModule] });
AssociateViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, imports: [[OpenViewActionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OpenViewActionModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxAssociateViewActionService }]; } });
//# sourceMappingURL=associate-view-action.module.js.map