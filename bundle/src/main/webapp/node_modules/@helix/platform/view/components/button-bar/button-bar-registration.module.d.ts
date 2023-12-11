import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/button-bar.module";
import * as i2 from "./design/button-bar-design.module";
export declare class ButtonBarRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonBarRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ButtonBarRegistrationModule, never, [typeof i1.ButtonBarModule, typeof i2.ButtonBarDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ButtonBarRegistrationModule>;
}
