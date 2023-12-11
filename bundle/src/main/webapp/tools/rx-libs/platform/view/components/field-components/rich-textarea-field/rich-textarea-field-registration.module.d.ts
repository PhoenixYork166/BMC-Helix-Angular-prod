import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./design/rich-textarea-field-design.module";
import * as i2 from "./runtime/rich-textarea-field.module";
export declare class RichTextareaFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextareaFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RichTextareaFieldRegistrationModule, never, [typeof i1.RichTextareaFieldDesignModule, typeof i2.RichTextareaFieldModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RichTextareaFieldRegistrationModule>;
}
