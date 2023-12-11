import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/decimal-field.module";
import * as i2 from "./design/decimal-field-design.module";
export declare class DecimalFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<DecimalFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DecimalFieldRegistrationModule, never, [typeof i1.DecimalFieldModule, typeof i2.DecimalFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DecimalFieldRegistrationModule>;
}
