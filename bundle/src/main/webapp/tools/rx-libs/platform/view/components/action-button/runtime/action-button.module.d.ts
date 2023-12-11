import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { ActionButtonAdapterService } from '../action-button-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./action-button.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export declare class ActionButtonModule {
    private rxDefinitionAdapterRegistryService;
    private actionButtonAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, actionButtonAdapterService: ActionButtonAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ActionButtonModule, [typeof i1.ActionButtonComponent], [typeof i2.AdaptButtonModule, typeof i3.CommonModule, typeof i4.TranslateModule, typeof i2.AdaptIconModule], [typeof i1.ActionButtonComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ActionButtonModule>;
}
