import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { ActionButtonAdapterService } from '../action-button-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./action-button-design.component";
import * as i2 from "@angular/common";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/view/designer";
import * as i5 from "@helix/platform/shared/components";
export declare class ActionButtonDesignModule {
    private rxDefinitionAdapterRegistryService;
    private actionButtonAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, actionButtonAdapterService: ActionButtonAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionButtonDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ActionButtonDesignModule, [typeof i1.ActionButtonDesignComponent], [typeof i2.CommonModule, typeof i3.AdaptButtonModule, typeof i4.ViewDesignerCanvasModule, typeof i4.ActionListWidgetModule, typeof i5.IconPickerFormControlModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ActionButtonDesignModule>;
}
