import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/selection-field.module";
import * as i2 from "./design/selection-field-design.module";
export declare class SelectionFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SelectionFieldRegistrationModule, never, [typeof i1.SelectionFieldModule, typeof i2.SelectionFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SelectionFieldRegistrationModule>;
}
