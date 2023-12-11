import { RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxOpenViewActionService } from './open-view-action.service';
import { RxOpenViewDefinitionAdapterService } from './open-view-action-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@helix/platform/view/runtime";
import * as i3 from "@bmc-ux/adapt-angular";
export declare class OpenViewActionModule {
    private rxViewActionDefinitionAdapterRegistryService;
    private openViewDefinitionAdapterService;
    private rxViewActionRegistryService;
    private rxOpenViewActionService;
    constructor(rxViewActionDefinitionAdapterRegistryService: RxViewActionDefinitionAdapterRegistryService, openViewDefinitionAdapterService: RxOpenViewDefinitionAdapterService, rxViewActionRegistryService: RxViewActionRegistryService, rxOpenViewActionService: RxOpenViewActionService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OpenViewActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OpenViewActionModule, never, [typeof i1.CommonModule, typeof i2.RuntimeViewModule, typeof i3.AdaptDockedPanelModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OpenViewActionModule>;
}
