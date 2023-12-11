import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxShellMenuItemDesignAdapterService } from './shell-menu-item-design-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./shell-menu-item-design.component";
import * as i2 from "@angular/common";
export declare class RxShellMenuItemDesignModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    private rxDefinitionAdapterRegistryService;
    private rxShellMenuItemDesignAdapterService;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxShellMenuItemDesignAdapterService: RxShellMenuItemDesignAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellMenuItemDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxShellMenuItemDesignModule, [typeof i1.RxShellMenuItemDesignComponent], [typeof i2.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxShellMenuItemDesignModule>;
}
