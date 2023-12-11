import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxAssociateViewActionService } from './associate-view-action.service';
import * as i0 from "@angular/core";
import * as i1 from "../open-view/open-view-action.module";
export declare class AssociateViewActionModule {
    private rxViewActionRegistryService;
    private rxAssociateViewActionService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxAssociateViewActionService: RxAssociateViewActionService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociateViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AssociateViewActionModule, never, [typeof i1.OpenViewActionModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AssociateViewActionModule>;
}
