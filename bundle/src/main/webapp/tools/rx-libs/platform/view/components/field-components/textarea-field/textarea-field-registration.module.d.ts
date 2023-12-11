import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/textarea-field.module";
import * as i2 from "./design/textarea-field-design.module";
export declare class TextareaFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<TextareaFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TextareaFieldRegistrationModule, never, [typeof i1.TextareaFieldModule, typeof i2.TextareaFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TextareaFieldRegistrationModule>;
}
