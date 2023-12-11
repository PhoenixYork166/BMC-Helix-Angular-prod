import { NgModule } from '@angular/core';
import { RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxApplyGridFilterViewActionService } from './apply-grid-filter-view-action.service';
import { RxApplyGridFilterViewActionDesignModelClass } from './apply-grid-filter-view-action-design-model.class';
import { RxApplyGridFilterViewActionDefinitionAdapterService } from './apply-grid-filter-view-action-definition-adapter.service';
import { RxApplyGridFilterActionName } from './apply-grid-filter-view-action.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./apply-grid-filter-view-action.service";
import * as i3 from "./apply-grid-filter-view-action-definition-adapter.service";
export class ApplyGridFilterViewActionModule {
    constructor(rxViewActionRegistryService, rxApplyGridFilterViewActionService, rxApplyGridFilterViewActionDefinitionAdapterService, rxViewActionDefinitionAdapterRegistryService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxApplyGridFilterViewActionService = rxApplyGridFilterViewActionService;
        this.rxApplyGridFilterViewActionDefinitionAdapterService = rxApplyGridFilterViewActionDefinitionAdapterService;
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxViewActionRegistryService.register({
            name: RxApplyGridFilterActionName,
            label: 'Apply grid filter',
            bundleId: RX_APPLICATION.platformBundleId,
            service: rxApplyGridFilterViewActionService,
            designModel: RxApplyGridFilterViewActionDesignModelClass,
            parameters: [
                {
                    name: 'targetApi',
                    label: 'Record grid',
                    isRequired: true,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'mode',
                    label: 'Mode'
                },
                {
                    name: 'filters'
                }
            ]
        });
        rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter(RxApplyGridFilterActionName, this.rxApplyGridFilterViewActionDefinitionAdapterService);
    }
}
ApplyGridFilterViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxApplyGridFilterViewActionService }, { token: i3.RxApplyGridFilterViewActionDefinitionAdapterService }, { token: i1.RxViewActionDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApplyGridFilterViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule });
ApplyGridFilterViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxApplyGridFilterViewActionService }, { type: i3.RxApplyGridFilterViewActionDefinitionAdapterService }, { type: i1.RxViewActionDefinitionAdapterRegistryService }]; } });
//# sourceMappingURL=apply-grid-filter-view-action.module.js.map