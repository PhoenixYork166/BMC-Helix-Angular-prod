import { RxDefaultExpressionEvaluatorService } from './default-expression-evaluator.service';
import { Injector } from '@angular/core';
import { RxDefaultExpressionValidatorService } from './default-expression-validator.service';
import { IExpressionEvaluator } from './expression-evaluator.types';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxExpressionEvaluatorService {
    private injector;
    private rxLogService;
    private rxDefaultExpressionEvaluatorService;
    private rxDefaultExpressionValidatorService;
    private rxNotificationService;
    constructor(injector: Injector, rxLogService: RxLogService, rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService, rxDefaultExpressionValidatorService: RxDefaultExpressionValidatorService, rxNotificationService: RxNotificationService);
    evaluate(expression: string, data?: object, customEvaluatorService?: IExpressionEvaluator): any;
    tryEvaluate(expression: string, data?: object, customEvaluatorService?: IExpressionEvaluator, defaultValue?: any): any;
    isValid(expression: any, customEvaluatorService?: IExpressionEvaluator): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExpressionEvaluatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxExpressionEvaluatorService>;
}
