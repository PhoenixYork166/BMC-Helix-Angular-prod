import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/container.module";
import * as i2 from "./design/container-design.module";
export declare class ContainerRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<ContainerRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ContainerRegistrationModule, never, [typeof i1.ContainerModule, typeof i2.ContainerDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ContainerRegistrationModule>;
}
