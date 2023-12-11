import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./design/view-preset-selector-design.module";
import * as i2 from "./runtime/view-preset-selector.module";
export declare class ViewPresetSelectorRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewPresetSelectorRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ViewPresetSelectorRegistrationModule, never, [typeof i1.ViewPresetSelectorDesignModule, typeof i2.ViewPresetSelectorModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ViewPresetSelectorRegistrationModule>;
}
