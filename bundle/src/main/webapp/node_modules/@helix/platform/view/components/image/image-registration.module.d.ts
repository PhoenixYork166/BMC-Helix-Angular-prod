import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/image.module";
import * as i2 from "./design/image-design.module";
export declare class ImageRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ImageRegistrationModule, never, [typeof i1.ImageModule, typeof i2.ImageDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ImageRegistrationModule>;
}
