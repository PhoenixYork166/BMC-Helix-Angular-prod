import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./shell-user-menu-design.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/view/designer";
import * as i4 from "@bmc-ux/adapt-angular";
export declare class RxShellUserMenuDesignModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellUserMenuDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxShellUserMenuDesignModule, [typeof i1.RxShellUserMenuDesignComponent], [typeof i2.CommonModule, typeof i3.ViewDesignerCanvasModule, typeof i4.AdaptDropdownModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxShellUserMenuDesignModule>;
}
