import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RxRichTextExpressionEvaluatorService } from './runtime/rich-text-expression-evaluator.service';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/rich-text.module";
import * as i2 from "./design/rich-text-design.module";
export declare class RichTextRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    private rxRichTextExpressionEvaluatorService;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver, rxRichTextExpressionEvaluatorService: RxRichTextExpressionEvaluatorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTextRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RichTextRegistrationModule, never, [typeof i1.RichTextModule, typeof i2.RichTextDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RichTextRegistrationModule>;
}
