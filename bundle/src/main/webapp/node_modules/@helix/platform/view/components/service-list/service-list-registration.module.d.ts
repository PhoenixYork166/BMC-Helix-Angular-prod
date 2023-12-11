import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ComponentFactoryResolver } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/service-list.module";
import * as i2 from "./design/service-list-design.module";
export declare class ServiceListRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<ServiceListRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServiceListRegistrationModule, never, [typeof i1.ServiceListModule, typeof i2.ServiceListDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServiceListRegistrationModule>;
}
