import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/select-group.module";
import * as i2 from "./design/select-group-design.module";
export declare class SelectGroupRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectGroupRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SelectGroupRegistrationModule, never, [typeof i1.SelectGroupModule, typeof i2.SelectGroupDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SelectGroupRegistrationModule>;
}
