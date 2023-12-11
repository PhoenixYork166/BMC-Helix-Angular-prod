import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/tab-panel.module";
import * as i2 from "./design/tab-panel-design.module";
export declare class TabPanelRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<TabPanelRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TabPanelRegistrationModule, never, [typeof i1.RxTabPanelModule, typeof i2.TabPanelDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TabPanelRegistrationModule>;
}
