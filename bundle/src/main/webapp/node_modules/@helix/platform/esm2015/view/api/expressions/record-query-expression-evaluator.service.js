import { Injectable } from '@angular/core';
import { isEmpty, isNil, isNull, isString, isUndefined, map, reduce, result } from 'lodash';
import { RxStringService } from '@helix/platform/utils';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { ExpressionParserToken } from '@helix/platform/shared/api';
import { RX_EXPRESSION_EVALUATOR } from './expression-evaluator.types';
import { RxDefaultExpressionEvaluatorService } from './default-expression-evaluator.service';
import { RxExpressionHelperService } from './expression-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "./default-expression-evaluator.service";
import * as i2 from "./expression-helper.service";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@helix/platform/record/api";
export class RxRecordQueryExpressionEvaluatorService {
    constructor(rxDefaultExpressionEvaluatorService, rxExpressionHelper, rxStringService, rxRecordInstanceUtilsService) {
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxExpressionHelper = rxExpressionHelper;
        this.rxStringService = rxStringService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.viewRegExp = /\${(view.+?)}/g;
        // extract strings surrounded by double quotes,
        // extracted strings will include escaped double quotes characters ("")
        this.stringMatchingRegExp = /"((?:(?:"")*|(?:[^"])*)*)"/g;
        // extract strings with associated field id surrounded by quotes
        this.associationExpressionRegExp = new RegExp("(')(\\$\\{" + RX_EXPRESSION_EVALUATOR.associatedFieldIdPrefixPattern + "\\d+\\})(')", 'g');
    }
    evaluate(expression, data) {
        this.rxOperatorCounter = 0;
        this.rxViewExpressionCounter = 0;
        this.rxStringExpressionCounter = 0;
        this.rxAssociationFilterExpressionCounter = 0;
        let evaluatedExpression = null;
        if (!this.rxStringService.isEmptySafe(expression)) {
            // Replace strings in double quotes with RX_STRING_EXPRESSION token, e.g.
            // "text ${view.foo}" = ${view.bar}"text ""text in quotes"" text" ->
            // RX_EXPRESSION_STRING = ${view.bar}RX_EXPRESSION_STRING
            this.rxStringsExpressionData = this.rxExpressionHelper.extractTokens(this.stringMatchingRegExp, ExpressionParserToken.RxStringExpression, expression);
            // Replace RX association filter expressions with RX_ASSOCIATION_FILTER_EXPRESSION token, e.g.
            // '7' = '${recordContext._associations...}' -> '7' = RX_ASSOCIATION_FILTER_EXPRESSION
            this.arRecordAssociationFilterExpressionData = this.rxExpressionHelper.extractTokens(this.associationExpressionRegExp, 'RX_ASSOCIATION_FILTER_EXPRESSION', this.rxStringsExpressionData.expression);
            // Replace RX view expressions with RX_VIEW_EXPRESSION token, e.g
            // ${view.foo} = ${view.bar} -> RX_VIEW_EXPRESSION = RX_VIEW_EXPRESSION
            this.rxExpressionsData = this.rxExpressionHelper.extractTokens(this.viewRegExp, 'RX_VIEW_EXPRESSION', this.arRecordAssociationFilterExpressionData.expression);
            // Prepare operators, e.g
            // RX_VIEW_EXPRESSION = NOTRX_VIEW_EXPRESSION -> RX_VIEW_EXPRESSION = !RX_VIEW_EXPRESSION
            this.rxExpressionHelper.prepareOperators(this.rxExpressionsData.expression);
            const rxOperatorsData = this.rxExpressionHelper.extractTokens(/(\s+(AND|OR)\s+)|(\s*(\(|\))\s*)/g, ExpressionParserToken.RxOperator, this.rxExpressionsData.expression);
            evaluatedExpression = map(rxOperatorsData.expression.split(ExpressionParserToken.RxOperator), (operand) => {
                const likeExpressionMatch = /(.*)\s+LIKE\s+(.*)/g.exec(operand);
                // does operand use the LIKE operator?
                if (likeExpressionMatch) {
                    const leftOperandValue = this.evaluateOperand(likeExpressionMatch[1], data), rightOperandValue = `"${this.evaluateOperand(likeExpressionMatch[2], data, true)}"`;
                    return `${leftOperandValue} LIKE ${rightOperandValue}`;
                }
                else {
                    return this.evaluateOperand(operand, data);
                }
            })
                .join(ExpressionParserToken.RxOperator)
                .replace(new RegExp(`${ExpressionParserToken.RxOperator}`, 'g'), () => rxOperatorsData.matches[this.rxOperatorCounter++]);
        }
        return evaluatedExpression;
    }
    // Evaluate operand by replacing expression tokens with evaluated values.
    // e.g
    // RX_EXPRESSION = RX_EXPRESSION_STRING ->
    // "${view.foo}" = "text ${view.bar}" ->
    // "Foo" LIKE "text Bar"
    // or
    // RX_ASSOCIATION_FILTER_EXPRESSION LIKE %RX_STRING_EXPRESSION% ->
    // '${recordContext.associations...}' LIKE %"some ${view.textFieldValue}"% ->
    // ${recordContext.associations...} LIKE "%some text "" with \% escaped \_ wildcards%"
    evaluateOperand(operand, data, isLikeOperand = false) {
        return reduce([
            this.evaluateRxViewExpressions.bind(this),
            this.evaluateRxStringExpressions.bind(this),
            this.prepareRxAssociationFilterExpressions.bind(this)
        ], (expression, evaluator) => evaluator(expression, data, isLikeOperand), operand);
    }
    evaluateRxViewExpressions(operand, data, isLikeOperand = false) {
        return operand.replace(/RX_VIEW_EXPRESSION/g, () => {
            return this.rxExpressionsData.matches[this.rxViewExpressionCounter++].replace(this.viewRegExp, (match, submatch) => {
                let value = result(data, submatch);
                if (isUndefined(value)) {
                    return RX_EXPRESSION_EVALUATOR.operands.undefined;
                }
                else if (isNull(value) || value === '') {
                    return isLikeOperand ? '' : RX_EXPRESSION_EVALUATOR.operands.null;
                }
                else if (isString(value)) {
                    value = isLikeOperand
                        ? this.rxRecordInstanceUtilsService.escapeTextWildcards(value)
                        : value.replace(/"/g, '""');
                }
                return isLikeOperand ? value : `"${value}"`;
            });
        });
    }
    evaluateRxStringExpressions(operand, data, isLikeOperand = false) {
        return operand.replace(new RegExp(`${ExpressionParserToken.RxStringExpression}`, 'g'), () => {
            let stringExpression = this.rxStringsExpressionData.matches[this.rxStringExpressionCounter++];
            if (isLikeOperand) {
                stringExpression = stringExpression.replace(this.stringMatchingRegExp, '$1');
            }
            stringExpression = stringExpression.replace(this.viewRegExp, (match, submatch) => {
                const value = result(data, submatch);
                if (isNil(value)) {
                    return '';
                }
                else if (isLikeOperand && isString(value)) {
                    return this.rxRecordInstanceUtilsService.escapeTextWildcards(value);
                }
                return value;
            });
            if (isEmpty(stringExpression) && !isLikeOperand) {
                stringExpression = RX_EXPRESSION_EVALUATOR.operands.null;
            }
            return stringExpression;
        });
    }
    prepareRxAssociationFilterExpressions(operand) {
        return operand.replace(/RX_ASSOCIATION_FILTER_EXPRESSION/g, () => this.arRecordAssociationFilterExpressionData.matches[this.rxAssociationFilterExpressionCounter++].replace(this.associationExpressionRegExp, (match, firstQuote, associationExpression, lastQuote) => associationExpression));
    }
}
RxRecordQueryExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordQueryExpressionEvaluatorService, deps: [{ token: i1.RxDefaultExpressionEvaluatorService }, { token: i2.RxExpressionHelperService }, { token: i3.RxStringService }, { token: i4.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordQueryExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordQueryExpressionEvaluatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordQueryExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefaultExpressionEvaluatorService }, { type: i2.RxExpressionHelperService }, { type: i3.RxStringService }, { type: i4.RxRecordInstanceUtilsService }]; } });
//# sourceMappingURL=record-query-expression-evaluator.service.js.map