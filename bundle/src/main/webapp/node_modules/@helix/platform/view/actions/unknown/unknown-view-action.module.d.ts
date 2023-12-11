import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxUnknownViewActionService } from './unknown-view-action.service';
import { RxUnknownViewActionDesignManager } from './unknown-view-action-design-manager.service';
import * as i0 from "@angular/core";
export declare class UnknownViewActionModule {
    private rxViewActionRegistryService;
    private rxUnknownViewActionService;
    private rxUnknownViewActionDesignManager;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxUnknownViewActionService: RxUnknownViewActionService, rxUnknownViewActionDesignManager: RxUnknownViewActionDesignManager);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnknownViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UnknownViewActionModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UnknownViewActionModule>;
}
