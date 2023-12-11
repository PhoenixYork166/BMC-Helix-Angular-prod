import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService, RxRecordQueryExpressionEvaluatorService } from '@helix/platform/view/api';
import { RxRecordGridQueryExpressionEvaluatorService } from './runtime/services/record-grid-query-expression-evaluator.service';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/record-grid.module";
import * as i2 from "./design/record-grid-design.module";
export declare class RecordGridRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    private rxRecordGridQueryExpressionEvaluatorService;
    private rxRecordQueryExpressionEvaluatorService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService, rxRecordGridQueryExpressionEvaluatorService: RxRecordGridQueryExpressionEvaluatorService, rxRecordQueryExpressionEvaluatorService: RxRecordQueryExpressionEvaluatorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RecordGridRegistrationModule, never, [typeof i1.RecordGridModule, typeof i2.RecordGridDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RecordGridRegistrationModule>;
}
