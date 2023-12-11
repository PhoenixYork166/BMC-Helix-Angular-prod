import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxLaunchProcessViewActionDesignManagerService } from './launch-process-view-action-design-manager.service';
import { RxLaunchProcessViewActionService } from './launch-process-view-action.service';
import * as i0 from "@angular/core";
export declare class LaunchProcessViewActionModule {
    private rxViewActionRegistryService;
    private rxLaunchProcessViewActionService;
    private rxLaunchProcessViewActionDesignManagerService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxLaunchProcessViewActionService: RxLaunchProcessViewActionService, rxLaunchProcessViewActionDesignManagerService: RxLaunchProcessViewActionDesignManagerService);
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchProcessViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LaunchProcessViewActionModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LaunchProcessViewActionModule>;
}
