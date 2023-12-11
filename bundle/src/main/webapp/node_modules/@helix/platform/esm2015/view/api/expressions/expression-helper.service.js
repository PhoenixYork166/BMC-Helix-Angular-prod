import { Injectable } from '@angular/core';
import { escapeRegExp, map, reduce, uniq } from 'lodash';
import { ExpressionOperator } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class RxExpressionHelperService {
    constructor() {
        this.prepareHandlers = [];
        function _convertNull(expression) {
            return expression.replace(/null/gi, null);
        }
        function _convertNot(expression) {
            return expression.replace(/not/gi, '!');
        }
        function _convertOr(expression) {
            return expression.replace(/or/gi, ExpressionOperator.Or);
        }
        function _convertAnd(expression) {
            return expression.replace(/and/gi, ExpressionOperator.And);
        }
        function _convertLike(expression) {
            return expression.replace(/like/gi, ExpressionOperator.Like);
        }
        function _convertContains(expression) {
            return expression.replace(/contains/gi, ExpressionOperator.Contains);
        }
        this.prepareHandlers.push(_convertNull, _convertNot, _convertAnd, _convertOr, _convertLike, _convertContains);
    }
    extractTokens(regex, key, expression) {
        const matches = expression.match(regex);
        return {
            matches,
            expression: expression.replace(regex, key)
        };
    }
    insertTokens(matches, key, expression) {
        if (matches !== null) {
            matches.forEach((value) => {
                expression = expression.replace(key, value);
            });
        }
        return expression;
    }
    prepare(expression) {
        // replace all spaces with charCode 160 to 32 charCode which supported by jsep
        const convertedExpression = expression.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
        const stringExpressionsData = this.extractTokens(/'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/g, 'RX_STRING_EXPRESSION', convertedExpression);
        stringExpressionsData.matches = map(stringExpressionsData.matches, this.insertLiteralExpressions);
        const expressionsData = this.extractTokens(/\${[^}]+}/g, 'RX_EXPRESSION', stringExpressionsData.expression);
        let preparedExpression = this.prepareOperators(expressionsData.expression);
        preparedExpression = this.insertExpressions(expressionsData.matches, 'RX_EXPRESSION', preparedExpression);
        return this.insertTokens(stringExpressionsData.matches, 'RX_STRING_EXPRESSION', preparedExpression);
    }
    prepareOperators(expression) {
        return reduce(this.prepareHandlers, (result, handler) => handler(result), expression);
    }
    insertLiteralExpressions(expression) {
        const literalExpressions = uniq(expression.match(/\${[^}$]+}/g));
        literalExpressions.forEach((literalExpression) => {
            const regexp = new RegExp(escapeRegExp(literalExpression), 'g');
            expression = expression.replace(regexp, `rx-${literalExpression}`);
        });
        return expression;
    }
    insertExpressions(matches, key, expression) {
        if (matches !== null) {
            matches.forEach((value) => {
                expression = expression.replace(key, `"rx-${value}"`);
            });
        }
        return expression;
    }
}
RxExpressionHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=expression-helper.service.js.map