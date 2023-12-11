import { RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxApplyGridFilterViewActionService } from './apply-grid-filter-view-action.service';
import { RxApplyGridFilterViewActionDefinitionAdapterService } from './apply-grid-filter-view-action-definition-adapter.service';
import * as i0 from "@angular/core";
export declare class ApplyGridFilterViewActionModule {
    private rxViewActionRegistryService;
    private rxApplyGridFilterViewActionService;
    private rxApplyGridFilterViewActionDefinitionAdapterService;
    private rxViewActionDefinitionAdapterRegistryService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxApplyGridFilterViewActionService: RxApplyGridFilterViewActionService, rxApplyGridFilterViewActionDefinitionAdapterService: RxApplyGridFilterViewActionDefinitionAdapterService, rxViewActionDefinitionAdapterRegistryService: RxViewActionDefinitionAdapterRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplyGridFilterViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ApplyGridFilterViewActionModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ApplyGridFilterViewActionModule>;
}
