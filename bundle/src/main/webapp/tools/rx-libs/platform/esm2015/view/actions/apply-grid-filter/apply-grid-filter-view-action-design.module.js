import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxApplyGridFilterViewActionDesignManagerService } from './apply-grid-filter-view-action-design-manager.service';
import { RxApplyGridFilterActionName } from './apply-grid-filter-view-action.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./apply-grid-filter-view-action-design-manager.service";
export class ApplyGridFilterViewActionDesignModule {
    constructor(rxViewActionRegistryService, rxApplyGridFilterViewActionDesignManagerService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxApplyGridFilterViewActionDesignManagerService = rxApplyGridFilterViewActionDesignManagerService;
        this.rxViewActionRegistryService.registerDesignManager(RxApplyGridFilterActionName, rxApplyGridFilterViewActionDesignManagerService);
    }
}
ApplyGridFilterViewActionDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxApplyGridFilterViewActionDesignManagerService }], target: i0.ɵɵFactoryTarget.NgModule });
ApplyGridFilterViewActionDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule });
ApplyGridFilterViewActionDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule, providers: [RxApplyGridFilterViewActionDesignManagerService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxApplyGridFilterViewActionDesignManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxApplyGridFilterViewActionDesignManagerService }]; } });
//# sourceMappingURL=apply-grid-filter-view-action-design.module.js.map