import { every, find, forEach, includes, isNaN, isNil, isString, isUndefined, result, trim } from 'lodash';
import { RxExpressionHelperService } from './expression-helper.service';
import { RxExpressionSyntaxTreeBuilderService } from './expression-syntax-tree-builder.service';
import { Injectable } from '@angular/core';
import { RxStringService } from '@helix/platform/utils';
import BigNumber from 'bignumber.js';
import { ExpressionOperator } from '@helix/platform/shared/api';
import { RX_EXPRESSION_FUNCTIONS, RX_SUPPORTED_FUNCTION } from './expression-functions.constant';
import * as i0 from "@angular/core";
import * as i1 from "./expression-helper.service";
import * as i2 from "@helix/platform/utils";
import * as i3 from "./expression-syntax-tree-builder.service";
export class RxDefaultExpressionEvaluatorService {
    constructor(rxExpressionHelperService, rxStringService, rxExpressionSyntaxTreeBuilderService) {
        this.rxExpressionHelperService = rxExpressionHelperService;
        this.rxStringService = rxStringService;
        this.rxExpressionSyntaxTreeBuilderService = rxExpressionSyntaxTreeBuilderService;
        this.parsedExpressionCache = {};
        this.operators = {
            [ExpressionOperator.Equal]: (a, b) => {
                if (BigNumber.isBigNumber(a)) {
                    return a.isEqualTo(b);
                }
                else if (BigNumber.isBigNumber(b)) {
                    return b.isEqualTo(a);
                }
                else {
                    // tslint:disable-next-line:triple-equals
                    return a == b;
                }
            },
            [ExpressionOperator.Add]: (a, b) => {
                if ((isNil(a) || isNaN(a)) && (isNil(b) || isNaN(b))) {
                    return null;
                }
                else if ((isNil(a) || isNaN(a)) && !(isNil(b) || isNaN(b))) {
                    return BigNumber.isBigNumber(b) ? Number(b) : b;
                }
                else if ((isNil(b) || isNaN(b)) && !(isNil(a) || isNaN(a))) {
                    return BigNumber.isBigNumber(a) ? Number(a) : a;
                }
                // Have to convert BigNumber values to Number in order to use mathimatical addition as opposed to
                // string concatenation, which will otherwise happen due to BigNumber.valueOf() returning a string.
                a = BigNumber.isBigNumber(a) ? Number(a) : a;
                b = BigNumber.isBigNumber(b) ? Number(b) : b;
                return a + b;
            },
            [ExpressionOperator.Subtract]: (a, b) => {
                if (isUndefined(a) || isNaN(a)) {
                    a = 0;
                }
                if (isUndefined(b) || isNaN(b)) {
                    b = 0;
                }
                return a - b;
            },
            [ExpressionOperator.Multiply]: (a, b) => {
                if (isUndefined(a) || isNaN(a)) {
                    a = 0;
                }
                if (isUndefined(b) || isNaN(b)) {
                    b = 0;
                }
                return a * b;
            },
            [ExpressionOperator.Divide]: (a, b) => {
                if (isUndefined(a) || isUndefined(b) || isNaN(a) || isNaN(b)) {
                    return 0;
                }
                return a / b;
            },
            [ExpressionOperator.LessThan]: (a, b) => {
                if (BigNumber.isBigNumber(a)) {
                    return a.lt(b);
                }
                else if (BigNumber.isBigNumber(b)) {
                    return b.gt(a);
                }
                else {
                    return a < b;
                }
            },
            [ExpressionOperator.GreaterThan]: (a, b) => {
                if (BigNumber.isBigNumber(a)) {
                    return a.gt(b);
                }
                else if (BigNumber.isBigNumber(b)) {
                    return b.lt(a);
                }
                else {
                    return a > b;
                }
            },
            [ExpressionOperator.GreaterThanOrEqual]: (a, b) => {
                if (BigNumber.isBigNumber(a)) {
                    return a.gte(b);
                }
                else if (BigNumber.isBigNumber(b)) {
                    return b.lte(a);
                }
                else {
                    return a >= b;
                }
            },
            [ExpressionOperator.LessThanOrEqual]: (a, b) => {
                if (BigNumber.isBigNumber(a)) {
                    return a.lte(b);
                }
                else if (BigNumber.isBigNumber(b)) {
                    return b.gte(a);
                }
                else {
                    return a <= b;
                }
            },
            [ExpressionOperator.NotEqual]: (a, b) => {
                if (BigNumber.isBigNumber(a)) {
                    return !a.isEqualTo(b);
                }
                else if (BigNumber.isBigNumber(b)) {
                    return !b.isEqualTo(a);
                }
                else {
                    // tslint:disable-next-line:triple-equals
                    return a != b;
                }
            },
            [ExpressionOperator.Remainder]: (a, b) => {
                if (isUndefined(a) || isUndefined(b) || isNaN(a) || isNaN(b)) {
                    return 0;
                }
                return a % b;
            },
            [ExpressionOperator.And]: this.andHandler,
            [ExpressionOperator.And.toLowerCase()]: this.andHandler,
            [ExpressionOperator.Or]: this.orHandler,
            [ExpressionOperator.Or.toLowerCase()]: this.orHandler,
            [ExpressionOperator.Like]: this.likeHandler,
            [ExpressionOperator.Like.toLowerCase()]: this.likeHandler,
            [ExpressionOperator.Contains]: this.likeHandler,
            [ExpressionOperator.Contains.toLowerCase()]: this.likeHandler
        };
        this.unaryOperators = {
            '-': (value) => {
                if (isUndefined(value) || isNaN(value)) {
                    return 0;
                }
                else {
                    return -Number(value);
                }
            },
            '!': (value) => !Boolean(value)
        };
    }
    parseExpression(expression) {
        if (!this.parsedExpressionCache[expression]) {
            const parsedExpression = this.rxExpressionSyntaxTreeBuilderService.buildTree(expression);
            if (this.validateChildNodeTypes(parsedExpression)) {
                this.parsedExpressionCache[expression] = parsedExpression;
            }
            else {
                throw new Error('Invalid syntax');
            }
        }
        return this.parsedExpressionCache[expression];
    }
    evaluate(expression, data) {
        let evaluatedExpression = expression;
        expression = trim(expression);
        if (this.rxStringService.isNonEmptyString(expression)) {
            const preparedExpression = this.rxExpressionHelperService.prepare(expression);
            let parsedExpression;
            try {
                parsedExpression = this.parseExpression(preparedExpression);
            }
            catch (e) {
                throw new Error(`Cannot parse expression "${expression}": ${e.message}.`);
            }
            try {
                evaluatedExpression = this.evaluateNode(parsedExpression, data || {});
            }
            catch (e) {
                throw new Error(`Cannot evaluate expression "${expression}": ${e.message}.`);
            }
        }
        else {
            evaluatedExpression = null;
        }
        return evaluatedExpression;
    }
    andHandler(a, b) {
        return Boolean(a) && Boolean(b);
    }
    orHandler(a, b) {
        return Boolean(a) || Boolean(b);
    }
    likeHandler(a, b) {
        return includes(a, b);
    }
    validateChildNodeTypes(node) {
        let isValid = false;
        switch (node.type) {
            case 'BinaryExpression':
                isValid =
                    this.validateChildNodeTypes(node.left) &&
                        this.validateChildNodeTypes(node.right);
                break;
            case 'UnaryExpression':
                isValid = this.validateChildNodeTypes(node.argument);
                break;
            case 'CallExpression':
                isValid = false;
                const functionNode = node;
                const functionDescriptor = find(RX_EXPRESSION_FUNCTIONS, { name: functionNode.callee['name'] });
                if (functionDescriptor && functionNode.arguments.length === functionDescriptor.parameters.length) {
                    isValid = every(functionNode.arguments, (argument) => this.validateChildNodeTypes(argument));
                }
                break;
            case 'Literal':
                isValid = true;
                break;
            case 'Identifier':
                isValid = /^\$[A-Za-z]+\$$/.test(node.name);
                break;
        }
        return isValid;
    }
    evaluateNode(node, data) {
        switch (node.type) {
            case 'BinaryExpression':
                const left = this.evaluateNode(node.left, data);
                const right = this.evaluateNode(node.right, data);
                if (this.operators[node.operator]) {
                    const binaryResult = this.operators[node.operator](left, right);
                    if (isNaN(binaryResult)) {
                        throw new Error(`Operator: ${node.operator} has invalid arguments: ${left}, ${right}`);
                    }
                    else {
                        return binaryResult;
                    }
                }
                else {
                    throw new Error(`Unknown binary operator: ${node.operator}`);
                }
            case 'CallExpression':
                let evaluatedArguments = [];
                const functionName = node.callee['name'];
                evaluatedArguments = node.arguments.map((argument) => this.evaluateNode(argument, data));
                if (RX_SUPPORTED_FUNCTION[functionName]) {
                    return RX_SUPPORTED_FUNCTION[functionName](...evaluatedArguments);
                }
                else {
                    throw new Error(`Unknown function: ${functionName}`);
                }
            case 'Literal':
                let nodeValue = node.value;
                if (isString(nodeValue)) {
                    if (/^rx-\${[^{}$]+}$/.test(nodeValue)) {
                        nodeValue = result(data, nodeValue.slice(5, -1));
                    }
                    else {
                        const expressions = nodeValue.match(/(rx-\${[^{}$]+})/g);
                        forEach(expressions, (expression) => {
                            const value = result(data, expression.slice(5, -1));
                            nodeValue = nodeValue.replace(expression, isNil(value) ? '' : value);
                        });
                    }
                }
                return nodeValue;
            case 'UnaryExpression':
                if (this.unaryOperators[node.operator]) {
                    const evaluatedResult = this.evaluateNode(node.argument, data);
                    const unaryResult = this.unaryOperators[node.operator](evaluatedResult);
                    if (isNaN(unaryResult)) {
                        throw new Error(`Operator: ${node.operator} has invalid argument: ${evaluatedResult}`);
                    }
                    else {
                        return unaryResult;
                    }
                }
                else {
                    throw new Error(`Unknown unary operator: ${node.operator}`);
                }
            default:
                throw new Error('Invalid syntax');
        }
    }
}
RxDefaultExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionEvaluatorService, deps: [{ token: i1.RxExpressionHelperService }, { token: i2.RxStringService }, { token: i3.RxExpressionSyntaxTreeBuilderService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefaultExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionEvaluatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionHelperService }, { type: i2.RxStringService }, { type: i3.RxExpressionSyntaxTreeBuilderService }]; } });
//# sourceMappingURL=default-expression-evaluator.service.js.map