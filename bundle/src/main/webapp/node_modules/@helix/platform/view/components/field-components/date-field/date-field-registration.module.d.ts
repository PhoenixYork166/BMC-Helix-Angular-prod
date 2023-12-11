import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/date-field.module";
import * as i2 from "./design/date-field-design.module";
export declare class DateFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DateFieldRegistrationModule, never, [typeof i1.DateFieldModule, typeof i2.DateFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DateFieldRegistrationModule>;
}
