import { Injectable } from '@angular/core';
import { ExpressionParserToken } from './expression-parser.types';
import { forEach, isNil } from 'lodash';
import * as i0 from "@angular/core";
export class RxExpressionParserService {
    constructor() {
        this.tokenRegExpMap = new Map([
            [ExpressionParserToken.SingleQuoteRxExpression, /('\${[^{}$]+}')/g],
            [ExpressionParserToken.SingleQuoteTextExpression, /('[^$']+')/g],
            [ExpressionParserToken.ArExpression, /(\$[A-Z]+\$)|(\$\\[A-Z]+\$)/g],
            [ExpressionParserToken.RxExpression, /(\${[^{}$]+})/g],
            [ExpressionParserToken.RxStringExpression, /("[^"]+")|('[^']+')/g]
        ]);
    }
    parse(expression, replaceFunc, operators = []) {
        if (operators.length) {
            const pattern = operators
                // Sort operators in descending order by length to find a compound operator in an expression.
                // e.g. "${foo} >= ${bar}" has ">=" operator instead of ">" and "=" separately.
                .sort((prevOperator, operator) => operator.value.length - prevOperator.value.length)
                .map((operator) => `\\${operator.value.split('').join('\\')}`)
                .join('|');
            this.tokenRegExpMap.set(ExpressionParserToken.RxOperator, new RegExp(pattern, 'g'));
        }
        const expressionValuesMap = new Map();
        for (const [token] of this.tokenRegExpMap) {
            let expressionValues;
            ({ expression, expressionValues } = this.extractExpressionValues(expression, token, this.tokenRegExpMap.get(token)));
            if (expressionValues) {
                expressionValuesMap.set(token, expressionValues);
            }
        }
        return Array.from(expressionValuesMap.keys())
            .reverse()
            .reduce((result, token) => result.replace(new RegExp(token, 'g'), () => replaceFunc(token, expressionValuesMap.get(token).next().value)), expression);
    }
    // Replaces all spaces with a single space except user inputs
    // ${view.foo} =   "bar" -> ${view.foo} = "bar"
    // ${view.foo} =   "    bar" -> ${view.foo} = "    bar"
    stripSpaces(expression) {
        let result = expression;
        if (!isNil(expression)) {
            const token = ExpressionParserToken.RxStringExpression;
            const extractExpressionsResult = this.extractExpressionValues(expression, token, this.tokenRegExpMap.get(token));
            result = extractExpressionsResult.expression
                .replace(/\s+/g, ' ')
                .replace(new RegExp(ExpressionParserToken.RxStringExpression, 'g'), () => extractExpressionsResult.expressionValues.next().value);
        }
        return result;
    }
    extractExpressionValues(expression, token, regExp) {
        const expressionValues = expression.match(regExp);
        forEach(expressionValues, (value) => (expression = expression.replace(value, token)));
        return {
            expression,
            expressionValues: expressionValues && expressionValues.values()
        };
    }
}
RxExpressionParserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionParserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionParserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionParserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=expression-parser.service.js.map