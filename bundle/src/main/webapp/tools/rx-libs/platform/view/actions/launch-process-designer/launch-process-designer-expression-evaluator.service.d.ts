import { IExpressionEvaluator, RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import { Expression } from 'jsep';
import * as i0 from "@angular/core";
export declare class RxLaunchProcessDesignerExpressionEvaluatorService implements IExpressionEvaluator {
    private rxDefaultExpressionEvaluatorService;
    constructor(rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService);
    evaluate(expression: string, data: object): string;
    parseExpression(expression: any): Expression;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLaunchProcessDesignerExpressionEvaluatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLaunchProcessDesignerExpressionEvaluatorService>;
}
