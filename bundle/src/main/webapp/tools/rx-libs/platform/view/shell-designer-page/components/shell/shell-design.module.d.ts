import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxShellDesignAdapterService } from './shell-design-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./shell-design.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/view/designer";
import * as i4 from "./controls/shell-global-search-records-control/shell-global-search-records-control.module";
import * as i5 from "./controls/shell-menu-items-control/shell-menu-items-control.module";
export declare class RxShellDesignModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    private rxDefinitionAdapterRegistryService;
    private rxShellDesignAdapterService;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxShellDesignAdapterService: RxShellDesignAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxShellDesignModule, [typeof i1.RxShellDesignComponent], [typeof i2.CommonModule, typeof i3.ViewDesignerCanvasModule, typeof i4.RxShellGlobalSearchRecordsControlModule, typeof i5.RxShellMenuItemsControlModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxShellDesignModule>;
}
