import { ExpressionOperator } from '../expression-operator/expression-operator.enum';
export declare enum ExpressionOperatorGroup {
    All = "all",
    AllServer = "allServer",
    AllClient = "allClient",
    Math = "math",
    MathClient = "mathClient"
}
export interface IExpressionOperator {
    displayValue: string;
    value: ExpressionOperator | string;
    tooltip?: {
        title: string;
        content: string;
    };
}
export interface IExpressionOperatorRow extends Array<IExpressionOperator> {
}
export declare const ExpressionOperatorRowsByGroup: Map<ExpressionOperatorGroup, IExpressionOperatorRow[]>;
