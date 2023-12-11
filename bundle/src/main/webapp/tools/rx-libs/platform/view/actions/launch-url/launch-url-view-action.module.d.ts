import { RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxLaunchUrlViewActionService } from './launch-url-view-action.service';
import { RxLaunchUrlViewActionDefinitionAdapterService } from './launch-url-view-action-definition-adapter.service';
import * as i0 from "@angular/core";
export declare class LaunchUrlViewActionModule {
    private rxViewActionDefinitionAdapterRegistryService;
    private rxViewActionRegistryService;
    private rxLaunchUrlViewActionService;
    private rxLaunchUrlActionDefinitionAdapterService;
    constructor(rxViewActionDefinitionAdapterRegistryService: RxViewActionDefinitionAdapterRegistryService, rxViewActionRegistryService: RxViewActionRegistryService, rxLaunchUrlViewActionService: RxLaunchUrlViewActionService, rxLaunchUrlActionDefinitionAdapterService: RxLaunchUrlViewActionDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchUrlViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LaunchUrlViewActionModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LaunchUrlViewActionModule>;
}
