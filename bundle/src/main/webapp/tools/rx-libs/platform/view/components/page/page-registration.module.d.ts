import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/page.module";
import * as i2 from "./design/page-design.module";
export declare class PageRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<PageRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PageRegistrationModule, never, [typeof i1.PageModule, typeof i2.PageDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PageRegistrationModule>;
}
