import { Expression } from 'jsep';
export declare const RX_EXPRESSION_EVALUATOR: {
    operands: {
        null: string;
        undefined: string;
    };
    associatedFieldIdPrefixPattern: string;
};
export interface IExpressionEvaluator {
    evaluate(expression: string, data: object): any;
    parseExpression?(expression: string): Expression;
}
