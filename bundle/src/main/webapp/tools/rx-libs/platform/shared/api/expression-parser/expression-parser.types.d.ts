export declare type IReplaceExpressionValueFunc = (token: ExpressionParserToken, expression: string) => string;
export declare enum ExpressionParserToken {
    SingleQuoteRxExpression = "__SINGLE_QUOTE_RX_EXPRESSION__",
    SingleQuoteTextExpression = "__SINGLE_QUOTE_TEXT_EXPRESSION__",
    ArExpression = "__AR_EXPRESSION__",
    RxExpression = "__RX_EXPRESSION__",
    RxStringExpression = "__RX_STRING_EXPRESSION__",
    RxOperator = "__RX_OP__"
}
