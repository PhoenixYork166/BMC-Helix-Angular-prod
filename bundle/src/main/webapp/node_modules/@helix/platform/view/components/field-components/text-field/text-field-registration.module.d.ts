import { ComponentFactoryResolver } from '@angular/core';
import { RxRecordQueryExpressionEvaluatorService, RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/text-field.module";
import * as i2 from "./design/text-field-design.module";
export declare class TextFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    private rxRecordQueryExpressionEvaluatorService;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver, rxRecordQueryExpressionEvaluatorService: RxRecordQueryExpressionEvaluatorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<TextFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TextFieldRegistrationModule, never, [typeof i1.TextFieldModule, typeof i2.TextFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TextFieldRegistrationModule>;
}
