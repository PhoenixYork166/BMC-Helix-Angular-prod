import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/time-field.module";
import * as i2 from "./design/time-field-design.module";
export declare class TimeFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TimeFieldRegistrationModule, never, [typeof i1.TimeFieldModule, typeof i2.TimeFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TimeFieldRegistrationModule>;
}