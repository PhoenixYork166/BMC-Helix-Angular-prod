import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxSetPropertyViewActionService } from './set-property-view-action.service';
import { RxSetPropertyViewActionDesignManagerService } from './set-property-view-action-design-manager.service';
import * as i0 from "@angular/core";
export declare class SetPropertyViewActionModule {
    private rxViewActionRegistryService;
    private rxSetPropertyViewActionService;
    private rxSetPropertyViewActionDesignManagerService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxSetPropertyViewActionService: RxSetPropertyViewActionService, rxSetPropertyViewActionDesignManagerService: RxSetPropertyViewActionDesignManagerService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SetPropertyViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SetPropertyViewActionModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SetPropertyViewActionModule>;
}
