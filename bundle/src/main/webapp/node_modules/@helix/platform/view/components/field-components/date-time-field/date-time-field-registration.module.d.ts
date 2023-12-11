import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/date-time-field.module";
import * as i2 from "./design/date-time-field-design.module";
export declare class DateTimeFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DateTimeFieldRegistrationModule, never, [typeof i1.DateTimeFieldModule, typeof i2.DateTimeFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DateTimeFieldRegistrationModule>;
}
