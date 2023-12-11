import { IExpressionEvaluator, RxExpressionEvaluatorService } from '@helix/platform/view/api';
import { IExpressionContext } from '../interfaces/expression-context.interface';
export declare class ComponentExpression {
    propertyName: string;
    private expression;
    private rxExpressionEvaluatorService;
    private customEvaluatorService;
    constructor(propertyName: string, expression: string, rxExpressionEvaluatorService: RxExpressionEvaluatorService, customEvaluatorService: IExpressionEvaluator);
    evaluate(expressionContext: IExpressionContext): any;
    hasDependency(guid: string, propertyName: string): boolean;
    hasTokens(): boolean;
    hasKeywordTokens(): boolean;
    hasViewTokens(): boolean;
    hasViewIsValidToken(): boolean;
    hasComponentTokens(): boolean;
}
