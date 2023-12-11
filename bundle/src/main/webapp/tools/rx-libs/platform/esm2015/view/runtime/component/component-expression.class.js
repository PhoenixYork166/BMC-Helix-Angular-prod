import { includes } from 'lodash';
export class ComponentExpression {
    constructor(propertyName, expression, rxExpressionEvaluatorService, customEvaluatorService) {
        this.propertyName = propertyName;
        this.expression = expression;
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.customEvaluatorService = customEvaluatorService;
    }
    evaluate(expressionContext) {
        return this.rxExpressionEvaluatorService.tryEvaluate(this.expression, expressionContext, this.customEvaluatorService);
    }
    hasDependency(guid, propertyName) {
        return includes(this.expression, `${guid}.${propertyName}`);
    }
    hasTokens() {
        return includes(this.expression, '${view.') || this.hasKeywordTokens();
    }
    hasKeywordTokens() {
        return includes(this.expression, '${keywords.');
    }
    hasViewTokens() {
        return (includes(this.expression, '${view.inputParams') ||
            includes(this.expression, '${view.api') ||
            this.hasViewIsValidToken());
    }
    hasViewIsValidToken() {
        return includes(this.expression, '${view.isValid}');
    }
    hasComponentTokens() {
        return includes(this.expression, '${view.components');
    }
}
//# sourceMappingURL=component-expression.class.js.map