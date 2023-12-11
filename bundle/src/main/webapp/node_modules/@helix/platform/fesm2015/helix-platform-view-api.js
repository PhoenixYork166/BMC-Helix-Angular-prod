import * as i0 from '@angular/core';
import { Injectable, ɵmakeDecorator, NgModule } from '@angular/core';
import * as i1$1 from '@helix/platform/shared/api';
import { ExpressionOperator, ExpressionParserToken, RX_APPLICATION, RX_BUNDLE, DataPage } from '@helix/platform/shared/api';
import * as i4 from '@helix/platform/utils';
import * as i1 from '@ngx-translate/core';
import { map, reduce, uniq, escapeRegExp, every, includes, size, isNil, isNaN, isUndefined, trim, find, isString, result, forEach, isFunction, isNull, isEmpty, some, transform, set, isObject, clone, flow, compact, get, has, head, findIndex } from 'lodash';
import * as jsep from 'jsep';
import BigNumber from 'bignumber.js';
import * as i4$1 from '@helix/platform/record/api';
import { defer, from, of, EMPTY, throwError, Subject, ReplaySubject, combineLatest } from 'rxjs';
import { map as map$1, shareReplay, pluck, switchMap, concatMap, tap } from 'rxjs/operators';
import * as i1$2 from '@angular/common/http';
import * as i2 from '@angular/router';
import * as i1$3 from '@bmc-ux/adapt-angular';

var RecordGridFilterDataLogic;
(function (RecordGridFilterDataLogic) {
    RecordGridFilterDataLogic["And"] = "and";
    RecordGridFilterDataLogic["Or"] = "or";
})(RecordGridFilterDataLogic || (RecordGridFilterDataLogic = {}));
var RecordGridFilterOperator;
(function (RecordGridFilterOperator) {
    RecordGridFilterOperator["Eq"] = "eq";
    RecordGridFilterOperator["Gte"] = "gte";
    RecordGridFilterOperator["Lte"] = "lte";
    RecordGridFilterOperator["Like"] = "like";
    RecordGridFilterOperator["Ne"] = "ne";
    RecordGridFilterOperator["Lt"] = "lt";
    RecordGridFilterOperator["Gt"] = "gt";
    RecordGridFilterOperator["In"] = "in";
})(RecordGridFilterOperator || (RecordGridFilterOperator = {}));
const RecordGridNamedFilterOptionKey = 'namedFilterOption';

const RowDataItemIdFieldName = '$ID$';
var ApplyGridFilterMode;
(function (ApplyGridFilterMode) {
    ApplyGridFilterMode["Append"] = "Append";
    ApplyGridFilterMode["Remove"] = "Remove";
    ApplyGridFilterMode["Overwrite"] = "Overwrite";
    ApplyGridFilterMode["Merge"] = "Merge";
    ApplyGridFilterMode["Clear"] = "Clear";
    ApplyGridFilterMode["Begin"] = "Begin";
    ApplyGridFilterMode["End"] = "End";
})(ApplyGridFilterMode || (ApplyGridFilterMode = {}));

const expressionAttributeName = 'rx-expression';
const RX_RICH_TEXT = {
    expressionAttributeName
};

const RX_RICH_TEXT_STYLES = 'skins/rich-text/';
class RxCkEditorConfiguratorService {
    constructor(translateService, rxLocalizationService, rxUrlUtilsService) {
        this.translateService = translateService;
        this.rxLocalizationService = rxLocalizationService;
        this.rxUrlUtilsService = rxUrlUtilsService;
    }
    getCKEditorConfig() {
        return {
            resize_enabled: false,
            title: false,
            skin: 'rich-text,' + RX_RICH_TEXT_STYLES,
            toolbar: [
                [
                    'Bold',
                    'Italic',
                    'Strike',
                    'Underline',
                    '-',
                    'NumberedList',
                    'BulletedList',
                    'Outdent',
                    'Indent',
                    '-',
                    'JustifyLeft',
                    'JustifyCenter',
                    'JustifyRight',
                    '-',
                    'Format',
                    'Styles',
                    'Font',
                    'FontSize',
                    'TextColor'
                ]
            ],
            stylesSet: [
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.italic-title'),
                    element: 'h2',
                    attributes: {
                        class: 'italic-title'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.subtitle'),
                    element: 'h3',
                    attributes: {
                        class: 'subtitle'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.special-container'),
                    element: 'div',
                    attributes: {
                        class: 'special-containers'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.marker'),
                    element: 'span',
                    attributes: {
                        class: 'marker'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.small'),
                    element: 'small'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.computer-code'),
                    element: 'code'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.keyboard-phrase'),
                    element: 'kbd'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.sample-text'),
                    element: 'samp'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.variable'),
                    element: 'var'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.deleted-text'),
                    element: 'del'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.inserted-text'),
                    element: 'ins'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.cited-work'),
                    element: 'cite'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.inline-quotation'),
                    element: 'q'
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.compact-table'),
                    element: 'table',
                    attributes: {
                        cellpadding: '5',
                        cellspacing: '0',
                        class: 'compact-table'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.borderless-table'),
                    element: 'table',
                    attributes: {
                        class: 'borderless-table'
                    }
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.ckeditor.styles-set.square-bulleted-list'),
                    element: 'ul',
                    attributes: {
                        class: 'square-bulleted-list'
                    }
                }
            ],
            language: this.rxLocalizationService.currentLocale,
            format_tags: 'p;h1;h2;h3;pre',
            height: '78px'
        };
    }
    getContentRules() {
        return {
            p: true,
            strong: true,
            em: true,
            s: true,
            u: true,
            ol: true,
            ul: true,
            li: true,
            small: true,
            code: true,
            kbd: true,
            samp: true,
            var: true,
            del: true,
            ins: true,
            cite: true,
            q: true,
            pre: true,
            br: true,
            span: {
                classes: 'marker',
                attributes: [RX_RICH_TEXT.expressionAttributeName, 'contenteditable', 'title'],
                styles: 'color'
            },
            h1: true,
            h2: {
                classes: 'italic-title'
            },
            h3: {
                classes: 'subtitle'
            },
            div: {
                classes: 'special-containers'
            },
            a: {
                match: (element) => this.rxUrlUtilsService.isUrlSafe(element.attributes.href),
                attributes: [
                    'target',
                    'id',
                    'dir',
                    'accesskey',
                    'lang',
                    'tabindex',
                    'title',
                    'type',
                    'charset',
                    'rel',
                    'href',
                    'name',
                    'style',
                    'class',
                    'download'
                ]
            },
            'div h1 h2 h3 p span pre li': {
                styles: 'font-size, text-align, font-family'
            }
        };
    }
}
RxCkEditorConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCkEditorConfiguratorService, deps: [{ token: i1.TranslateService }, { token: i1$1.RxLocalizationService }, { token: i4.RxUrlUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxCkEditorConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCkEditorConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCkEditorConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i1$1.RxLocalizationService }, { type: i4.RxUrlUtilsService }]; } });

var ViewComponentPropertyType;
(function (ViewComponentPropertyType) {
    ViewComponentPropertyType["Boolean"] = "boolean";
    ViewComponentPropertyType["String"] = "string";
    ViewComponentPropertyType["Number"] = "number";
    ViewComponentPropertyType["Array"] = "array";
    ViewComponentPropertyType["Object"] = "object";
})(ViewComponentPropertyType || (ViewComponentPropertyType = {}));

var RxDevice;
(function (RxDevice) {
    RxDevice["Desktop"] = "desktop";
    RxDevice["Tablet"] = "tablet";
    RxDevice["Mobile"] = "mobile";
})(RxDevice || (RxDevice = {}));

const RX_AVAILABLE_ON_DEVICES_ALL_VALUE = Object.values(RxDevice);
const RX_AVAILABLE_ON_DEVICES_PROP_NAME = 'availableOnDevices';
const RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE = {
    [RX_AVAILABLE_ON_DEVICES_PROP_NAME]: RX_AVAILABLE_ON_DEVICES_ALL_VALUE
};
const RX_AVAILABLE_ON_DEVICES_PROP_DESC = {
    name: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
    type: ViewComponentPropertyType.Array,
    designType: ViewComponentPropertyType.Array
};

const RX_DISABLED_PROP_NAME = 'disabled';
const RX_DISABLED_PROP_DEFAULT_VALUE = {
    [RX_DISABLED_PROP_NAME]: '0'
};
const RX_DISABLED_PROP_DESC = {
    name: RX_DISABLED_PROP_NAME,
    enableExpressionEvaluation: true
};

const RX_HIDDEN_PROP_NAME = 'hidden';
const RX_HIDDEN_PROP_DEFAULT_VALUE = {
    [RX_HIDDEN_PROP_NAME]: '0'
};
const RX_HIDDEN_PROP_DESC = {
    name: RX_HIDDEN_PROP_NAME,
    enableExpressionEvaluation: true
};

const RX_STYLES_PROP_NAME = 'styles';
const RX_STYLES_PROP_DEFAULT_VALUE = {
    [RX_STYLES_PROP_NAME]: null
};
const RX_STYLES_PROP_DESC = {
    name: RX_STYLES_PROP_NAME
};

const RX_STANDARD_PROPS_DESC = [RX_HIDDEN_PROP_DESC, RX_STYLES_PROP_DESC, RX_AVAILABLE_ON_DEVICES_PROP_DESC];
const RX_STANDARD_PROPS_DEFAULT_VALUES = Object.assign(Object.assign(Object.assign({}, RX_HIDDEN_PROP_DEFAULT_VALUE), RX_STYLES_PROP_DEFAULT_VALUE), RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE);

class RxExpressionHelperService {
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

class RxExpressionSyntaxTreeBuilderService {
    constructor() {
        this.jsep = jsep;
        this.jsep.addBinaryOp(ExpressionOperator.Contains, 7);
        this.jsep.addBinaryOp(ExpressionOperator.Like, 7);
        this.jsep.addBinaryOp(ExpressionOperator.And, 2);
        this.jsep.addBinaryOp(ExpressionOperator.Or, 1);
        this.jsep.addBinaryOp(ExpressionOperator.Equal, 6);
        this.jsep.addBinaryOp(ExpressionOperator.In, 8);
        // Remove default unused binary operators.
        this.jsep.removeBinaryOp('||');
        this.jsep.removeBinaryOp('&&');
        this.jsep.removeBinaryOp('|');
        this.jsep.removeBinaryOp('^');
        this.jsep.removeBinaryOp('&');
        this.jsep.removeBinaryOp('==');
        this.jsep.removeBinaryOp('===');
        this.jsep.removeBinaryOp('!==');
        this.jsep.removeBinaryOp('<<');
        this.jsep.removeBinaryOp('>>');
        this.jsep.removeBinaryOp('>>>');
        // Remove default unused unary operators.
        this.jsep.removeUnaryOp('~');
        // Remove _, but keep $ to match AR expressions, e.g. $USER$.
        this.jsep.removeIdentifierChar('_');
    }
    buildTree(expression) {
        return this.jsep(expression);
    }
}
RxExpressionSyntaxTreeBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionSyntaxTreeBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionSyntaxTreeBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionSyntaxTreeBuilderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionSyntaxTreeBuilderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const expressionFunctions = [
    {
        name: 'SAME',
        category: 'Array',
        description: 'Returns true if all values in array are the same, else false.',
        parameters: [
            {
                name: 'array',
                description: 'The array to inspect.'
            }
        ]
    },
    {
        name: 'INCLUDES',
        category: 'Array',
        description: 'Returns true if value is found in array, else false.',
        parameters: [
            {
                name: 'array',
                description: 'The array to inspect.'
            },
            {
                name: 'value',
                description: 'The value to search for.'
            }
        ]
    },
    {
        name: 'SIZE',
        category: 'Array',
        description: 'Gets the size of array.',
        parameters: [
            {
                name: 'array',
                description: 'The array to inspect.'
            }
        ]
    }
];
const RX_EXPRESSION_FUNCTIONS = expressionFunctions.map((descriptor) => {
    const params = map(descriptor.parameters, 'name').join(', ');
    return Object.assign(Object.assign({}, descriptor), { signature: `${descriptor.name}(${params})` });
});
const RX_SUPPORTED_FUNCTION = {
    SAME: (collection) => every(collection, (value) => value === collection[0]),
    INCLUDES: (collection, value) => includes(collection, value),
    SIZE: (collection) => size(collection)
};

class RxDefaultExpressionEvaluatorService {
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
RxDefaultExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionEvaluatorService, deps: [{ token: RxExpressionHelperService }, { token: i4.RxStringService }, { token: RxExpressionSyntaxTreeBuilderService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefaultExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionEvaluatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxExpressionHelperService }, { type: i4.RxStringService }, { type: RxExpressionSyntaxTreeBuilderService }]; } });

class RxDefaultExpressionValidatorService {
    constructor(rxStringService, rxDefaultExpressionEvaluatorService, rxExpressionHelperService) {
        this.rxStringService = rxStringService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxExpressionHelperService = rxExpressionHelperService;
    }
    isValid(expression, customEvaluatorService) {
        const evaluator = customEvaluatorService || this.rxDefaultExpressionEvaluatorService;
        let valid = true;
        if (this.rxStringService.isNonEmptyString(expression) && isFunction(evaluator.parseExpression)) {
            const preparedExpression = this.rxExpressionHelperService.prepare(expression);
            try {
                evaluator.parseExpression(preparedExpression);
            }
            catch (e) {
                valid = false;
            }
        }
        return valid;
    }
}
RxDefaultExpressionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionValidatorService, deps: [{ token: i4.RxStringService }, { token: RxDefaultExpressionEvaluatorService }, { token: RxExpressionHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefaultExpressionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i4.RxStringService }, { type: RxDefaultExpressionEvaluatorService }, { type: RxExpressionHelperService }]; } });

class RxExpressionEvaluatorService {
    constructor(injector, rxLogService, rxDefaultExpressionEvaluatorService, rxDefaultExpressionValidatorService, rxNotificationService) {
        this.injector = injector;
        this.rxLogService = rxLogService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxDefaultExpressionValidatorService = rxDefaultExpressionValidatorService;
        this.rxNotificationService = rxNotificationService;
    }
    evaluate(expression, data, customEvaluatorService) {
        const evaluator = customEvaluatorService || this.rxDefaultExpressionEvaluatorService;
        const evaluatedExpression = evaluator.evaluate(expression, data);
        this.rxLogService.debug(`EVALUATED EXPRESSION ${expression}: ${evaluatedExpression}`);
        return evaluatedExpression;
    }
    tryEvaluate(expression, data, customEvaluatorService, defaultValue = null) {
        let result = defaultValue;
        try {
            result = this.evaluate(expression, data, customEvaluatorService);
        }
        catch (error) {
            this.rxNotificationService.addErrorMessage(error.message);
        }
        return result;
    }
    isValid(expression, customEvaluatorService) {
        return this.rxDefaultExpressionValidatorService.isValid(expression, customEvaluatorService);
    }
}
RxExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEvaluatorService, deps: [{ token: i0.Injector }, { token: i1$1.RxLogService }, { token: RxDefaultExpressionEvaluatorService }, { token: RxDefaultExpressionValidatorService }, { token: i1$1.RxNotificationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEvaluatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.RxLogService }, { type: RxDefaultExpressionEvaluatorService }, { type: RxDefaultExpressionValidatorService }, { type: i1$1.RxNotificationService }]; } });

const RX_EXPRESSION_EVALUATOR = {
    operands: {
        null: '$NULL$',
        undefined: '$UNDEFINED$'
    },
    associatedFieldIdPrefixPattern: 'recordContext\\._associations\\.([^\\.]+)\\.(\\w+)\\[0]\\.'
};

class RxRecordQueryExpressionEvaluatorService {
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
RxRecordQueryExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordQueryExpressionEvaluatorService, deps: [{ token: RxDefaultExpressionEvaluatorService }, { token: RxExpressionHelperService }, { token: i4.RxStringService }, { token: i4$1.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordQueryExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordQueryExpressionEvaluatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordQueryExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxDefaultExpressionEvaluatorService }, { type: RxExpressionHelperService }, { type: i4.RxStringService }, { type: i4$1.RxRecordInstanceUtilsService }]; } });

const RX_LEGACY_ICONS = {
    add: 'plus',
    addCircle: 'plus_circle',
    back: 'undo',
    copy: 'files_copy_o',
    delete: 'cross',
    deleteCircle: 'cross_circle',
    edit: 'pencil',
    exclamationCircle: 'exclamation_circle',
    exclamationTriangle: 'exclamation_triangle',
    help: 'question_circle',
    preview: 'layout_preview',
    mail: 'envelope',
    print: 'printer',
    thumbsDown: 'thumbs_down',
    thumbsUp: 'thumbs_up'
};

class RxViewComponentRegistryService {
    constructor(componentFactoryResolver, rxGlobalCacheService, rxBundleCacheService, rxStringService, rxLogService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxStringService = rxStringService;
        this.rxLogService = rxLogService;
        // contains all registered component descriptors
        this.componentDescriptors = new Map();
        this.asyncComponentDescriptors = [];
        this.ownerBundleIds$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(map$1((bundleDescriptors) => bundleDescriptors.reduce((ownerBundleIds, bundleDescriptor) => {
            var _a;
            (_a = bundleDescriptor.uiOptions.viewComponents) === null || _a === void 0 ? void 0 : _a.forEach((viewComponentName) => {
                ownerBundleIds[viewComponentName] = bundleDescriptor.id;
            });
            return ownerBundleIds;
        }, {})), shareReplay(1));
    }
    resolveAsyncDescriptors() {
        if (this.asyncComponentDescriptors.length) {
            this.rxLogService.debug(`Resolving ${this.asyncComponentDescriptors.length} view component descriptor(s)...`);
            return defer(() => from(Promise.all(this.asyncComponentDescriptors).then((descriptors) => {
                descriptors.forEach((descriptor) => {
                    this.registerSync(descriptor);
                });
                this.rxLogService.debug(`Resolved ${descriptors.length} view component descriptors: ${descriptors
                    .map((desc) => desc.type)
                    .join(', ')}.`);
                return this.componentDescriptors;
            })));
        }
        else {
            return of(this.componentDescriptors);
        }
    }
    getRegisteredComponents() {
        return this.componentDescriptors;
    }
    get(type) {
        return this.componentDescriptors.get(type);
    }
    register(...componentDescriptors) {
        componentDescriptors.forEach((descriptor) => {
            this.asyncComponentDescriptors.push(Promise.resolve(descriptor));
        });
    }
    registerSync(descriptor) {
        var _a, _b;
        if ((_a = descriptor.aliases) === null || _a === void 0 ? void 0 : _a.includes(descriptor.type)) {
            this.rxLogService.warning(`Component ${descriptor.type} should not have its type listed in descriptor's aliases property.`);
            descriptor.aliases = descriptor.aliases.filter((type) => type !== descriptor.type);
        }
        this.componentDescriptors.set(descriptor.type, descriptor);
        (_b = descriptor.aliases) === null || _b === void 0 ? void 0 : _b.forEach((type) => {
            this.componentDescriptors.set(type, descriptor);
        });
    }
    isDataComponentDescriptor(componentDescriptor) {
        return Boolean(componentDescriptor.isDataComponent);
    }
    getBundlePageComponents(bundleId, includeAliases = false) {
        return this.getDescriptors(includeAliases).filter((componentDescriptor) => componentDescriptor.isPageComponent && isEmpty(componentDescriptor.availableInBundles)
            ? componentDescriptor.bundleId === bundleId
            : this.rxStringService.isIncluded(bundleId, componentDescriptor.availableInBundles));
    }
    getLicensedComponents(includeAliases = false) {
        return this.rxGlobalCacheService
            .getLicensedBundleDescriptors()
            .pipe(map$1((bundleDescriptors) => this.getDescriptors(includeAliases).filter((componentDescriptor) => this.isBundleLicensed(componentDescriptor.bundleId, bundleDescriptors) &&
            this.isComponentAvailableInCurrentBundle(componentDescriptor))));
    }
    getComponentOwnerBundleId(viewComponentType) {
        return this.ownerBundleIds$.pipe(map$1((ownerBundleIds) => ownerBundleIds[viewComponentType]));
    }
    isBundleLicensed(bundleId, bundleDescriptors) {
        return bundleId === RX_APPLICATION.platformBundleId || some(bundleDescriptors, { id: bundleId });
    }
    isComponentAvailableInCurrentBundle(componentDescriptor) {
        return (isEmpty(componentDescriptor.availableInBundles) ||
            this.rxStringService.isIncluded(this.rxBundleCacheService.bundleId, componentDescriptor.availableInBundles));
    }
    getDescriptors(includeAliases = false) {
        return [...this.componentDescriptors.entries()].reduce((result, [type, descriptor]) => {
            var _a;
            if (includeAliases || !((_a = descriptor.aliases) === null || _a === void 0 ? void 0 : _a.includes(type))) {
                result.push(descriptor);
            }
            return result;
        }, []);
    }
}
RxViewComponentRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentRegistryService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1$1.RxGlobalCacheService }, { token: i1$1.RxBundleCacheService }, { token: i4.RxStringService }, { token: i1$1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewComponentRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1$1.RxGlobalCacheService }, { type: i1$1.RxBundleCacheService }, { type: i4.RxStringService }, { type: i1$1.RxLogService }]; } });

var ViewDefinitionType;
(function (ViewDefinitionType) {
    ViewDefinitionType["Regular"] = "REGULAR";
    ViewDefinitionType["Shell"] = "SHELL";
})(ViewDefinitionType || (ViewDefinitionType = {}));

const RX_VIEW_DEFINITION = {
    types: {
        regular: ViewDefinitionType.Regular,
        shell: ViewDefinitionType.Shell
    },
    resourceTypes: {
        viewComponent: 'com.bmc.arsys.rx.services.view.domain.ViewComponentDefinition',
        containerViewComponent: 'com.bmc.arsys.rx.services.view.domain.ContainerViewComponentDefinition'
    },
    defaultOutletName: 'DEFAULT',
    unknownPageComponent: {
        name: 'Unknown Component'
    },
    defaultLayoutTemplateId: 5,
    styles: [
        { id: 'rx-no-margin', name: 'No Margin' },
        { id: 'rx-default-border', name: '1px Border' },
        { id: 'rx-white-background', name: 'White Background' }
    ]
};

class RxViewDefinitionParserService {
    constructor(rxTreeService) {
        this.rxTreeService = rxTreeService;
    }
    getComponents(definition, skipInitial = false) {
        const components = [];
        if (!skipInitial) {
            components.push({
                componentDefinition: definition,
                parentComponentDefinition: null
            });
        }
        this.processComponents(definition.componentDefinitions, components, definition);
        return components;
    }
    processComponents(componentDefinitions, components, parentComponentDefinition) {
        componentDefinitions.forEach((componentDefinition) => {
            components.push({ componentDefinition, parentComponentDefinition });
            if (this.isContainerViewComponentDefinition(componentDefinition)) {
                this.processComponents(componentDefinition.componentDefinitions, components, componentDefinition);
            }
        });
    }
    isContainerViewComponentDefinition(componentDefinition) {
        return componentDefinition.componentDefinitions !== undefined;
    }
    findParentComponentDefinition(viewDefinition, childComponentDefinition, predicate) {
        const componentDefinitionsWithParent = this.getComponents(viewDefinition);
        let parentComponentDefinition;
        let childComponentDefinitionWithParent = componentDefinitionsWithParent.find((pair) => pair.componentDefinition.guid === childComponentDefinition.guid);
        while (childComponentDefinitionWithParent && !parentComponentDefinition) {
            if (predicate(childComponentDefinitionWithParent.componentDefinition)) {
                parentComponentDefinition = childComponentDefinitionWithParent.componentDefinition;
            }
            else {
                childComponentDefinitionWithParent = componentDefinitionsWithParent.find((pair) => pair.componentDefinition.guid === childComponentDefinitionWithParent.parentComponentDefinition.guid);
            }
        }
        return parentComponentDefinition;
    }
    findViewComponent(viewComponentContainer, predicate) {
        return find(this.rxTreeService.flattenTree(viewComponentContainer, 'componentDefinitions'), predicate);
    }
}
RxViewDefinitionParserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionParserService, deps: [{ token: i4.RxTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionParserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionParserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i4.RxTreeService }]; } });

class RxViewActionRegistryService {
    constructor(rxGlobalCacheService, rxStringService, rxBundleCacheService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxStringService = rxStringService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.viewActionDescriptors = new Map();
        this.designManagers = new Map();
        this.ownerBundleIds$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(map$1((bundleDescriptors) => bundleDescriptors.reduce((ownerBundleIds, bundleDescriptor) => {
            var _a;
            (_a = bundleDescriptor.uiOptions.viewActions) === null || _a === void 0 ? void 0 : _a.forEach((viewActionName) => {
                ownerBundleIds[viewActionName] = bundleDescriptor.id;
            });
            return ownerBundleIds;
        }, {})), shareReplay(1));
    }
    register(viewActionDescriptor) {
        if (!viewActionDescriptor.label) {
            viewActionDescriptor.label = viewActionDescriptor.name;
        }
        viewActionDescriptor.parameters = viewActionDescriptor.parameters || [];
        viewActionDescriptor.parameters.push({
            name: '$condition$',
            enableExpressionEvaluation: true
        });
        viewActionDescriptor.parameters.push({
            name: 'index',
            designType: ViewComponentPropertyType.Number
        });
        this.viewActionDescriptors.set(viewActionDescriptor.name, viewActionDescriptor);
    }
    get(actionName) {
        return this.viewActionDescriptors.get(actionName);
    }
    getRegisteredActions() {
        return this.viewActionDescriptors;
    }
    getLicensedActions() {
        return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(map$1((bundleDescriptors) => {
            return Array.from(this.viewActionDescriptors.values()).filter((actionDescriptor) => {
                return (this.isBundleLicensed(actionDescriptor.bundleId, bundleDescriptors) &&
                    this.isActionAvailableInCurrentBundle(actionDescriptor));
            });
        }));
    }
    getActionOwnerBundleId(viewActionName) {
        return this.ownerBundleIds$.pipe(map$1((ownerBundleIds) => ownerBundleIds[viewActionName]));
    }
    isBundleLicensed(bundleId, bundleDescriptors) {
        return bundleId === RX_APPLICATION.platformBundleId || some(bundleDescriptors, { id: bundleId });
    }
    isActionAvailableInCurrentBundle(actionDescriptor) {
        return (isEmpty(actionDescriptor.availableInBundles) ||
            this.rxStringService.isIncluded(this.rxBundleCacheService.bundleId, actionDescriptor.availableInBundles));
    }
    registerUnknownAction(unknownActionName) {
        let unknownActionDescriptor = this.get(unknownActionName);
        if (!unknownActionDescriptor) {
            unknownActionDescriptor = Object.assign(Object.assign({}, this.get('rxUnknownViewAction')), { name: unknownActionName });
            this.register(unknownActionDescriptor);
        }
        return unknownActionDescriptor;
    }
    registerDesignManager(actionName, designManagerService) {
        this.designManagers.set(actionName, designManagerService);
    }
    getDesignManager(actionName) {
        var _a, _b;
        return (_a = this.designManagers.get(actionName)) !== null && _a !== void 0 ? _a : (_b = this.viewActionDescriptors.get(actionName)) === null || _b === void 0 ? void 0 : _b.designManager;
    }
}
RxViewActionRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionRegistryService, deps: [{ token: i1$1.RxGlobalCacheService }, { token: i4.RxStringService }, { token: i1$1.RxBundleCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxGlobalCacheService }, { type: i4.RxStringService }, { type: i1$1.RxBundleCacheService }]; } });

var RxViewComponentType;
(function (RxViewComponentType) {
    RxViewComponentType["ButtonBar"] = "rx-button-bar";
    RxViewComponentType["RecordEditor"] = "rx-record-editor";
    RxViewComponentType["ActionButton"] = "rx-action-button";
    RxViewComponentType["Action"] = "rx-action";
    RxViewComponentType["Page"] = "rx-page";
    RxViewComponentType["ExtensionContainer"] = "rx-extension-container";
    RxViewComponentType["Container"] = "rx-container";
    RxViewComponentType["RichText"] = "rx-rich-text";
    RxViewComponentType["TabPanel"] = "rx-tab-panel";
    RxViewComponentType["TabContainer"] = "rx-tab-container";
    RxViewComponentType["Image"] = "rx-image";
    RxViewComponentType["ServiceList"] = "rx-service-list";
    RxViewComponentType["Unknown"] = "rx-unknown";
    RxViewComponentType["Association"] = "rx-association";
    RxViewComponentType["AssociatedRecordField"] = "rx-associated-record-field";
    RxViewComponentType["DateTime"] = "rx-date-time-field";
    RxViewComponentType["Selection"] = "rx-selection-field";
    RxViewComponentType["Date"] = "rx-date-field";
    RxViewComponentType["Time"] = "rx-time-field";
    RxViewComponentType["Integer"] = "rx-integer-field";
    RxViewComponentType["Floating"] = "rx-floating-field";
    RxViewComponentType["Decimal"] = "rx-decimal-field";
    RxViewComponentType["Boolean"] = "rx-boolean-field";
    RxViewComponentType["Attachment"] = "rx-attachment-field";
    RxViewComponentType["Character"] = "rx-character-field";
    RxViewComponentType["LocalizedCharacter"] = "rx-localized-character-field";
    RxViewComponentType["Textarea"] = "rx-textarea-field";
    RxViewComponentType["SelectGroup"] = "rx-select-group";
    RxViewComponentType["SelectGroupField"] = "rx-select-group-field";
    RxViewComponentType["RichTextarea"] = "rx-rich-textarea-field";
    RxViewComponentType["ViewPresetSelector"] = "rx-view-preset-selector";
    RxViewComponentType["ViewPreset"] = "rx-view-preset";
})(RxViewComponentType || (RxViewComponentType = {}));
var BwfViewComponentType;
(function (BwfViewComponentType) {
    BwfViewComponentType["DynamicNamedList"] = "ux-dynamic-named-list";
})(BwfViewComponentType || (BwfViewComponentType = {}));
const RxViewComponent = ɵmakeDecorator('RxViewComponent');

class RxViewDefinitionLocalizationService {
    constructor(rxViewDefinitionParserService, rxViewComponentRegistryService, rxViewActionRegistryService, rxGuidService, rxTreeService) {
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxGuidService = rxGuidService;
        this.rxTreeService = rxTreeService;
    }
    applyLocalization(viewDefinition) {
        const componentDefinitions = this.rxTreeService.flatten(viewDefinition, 'componentDefinitions');
        const localizableStringGuidsByComponentGuid = {};
        // converting Select Group localization for AngularJS views
        // todo can be removed after dropping support of AngularJS version
        this.convertOldSelectGroupLocalization(viewDefinition, componentDefinitions);
        componentDefinitions.forEach((componentDefinition) => {
            const localizableStrings = viewDefinition.localizableStringsByComponentId[componentDefinition.guid];
            const propertyNameToStringGuidMap = this.applyComponentDefinitionLocalization(componentDefinition, localizableStrings);
            if (!isEmpty(propertyNameToStringGuidMap)) {
                localizableStringGuidsByComponentGuid[componentDefinition.guid] = propertyNameToStringGuidMap;
            }
        });
        viewDefinition.localizablePropertyToStringGuidMap = localizableStringGuidsByComponentGuid;
        return viewDefinition;
    }
    extractLocalizableStrings(viewDefinition) {
        const localizableStrings = {};
        const localizablePropertyToStringGuidMap = viewDefinition.localizablePropertyToStringGuidMap || {};
        this.rxViewDefinitionParserService
            .getComponents(viewDefinition, true)
            .map((item) => item.componentDefinition)
            .filter((component) => component.type && component.type !== RxViewComponentType.Page)
            .forEach((component) => {
            const componentDescriptor = this.rxViewComponentRegistryService.get(component.type);
            const propertyNameToStringGuidMap = localizablePropertyToStringGuidMap[component.guid] || {};
            const componentStrings = {};
            let localizablePropertyNames;
            if (componentDescriptor.type === RxViewComponentType.Action) {
                const actionDescriptor = this.rxViewActionRegistryService.get(component.propertiesByName.name);
                localizablePropertyNames = this.getLocalizableActionParameterNames(actionDescriptor);
            }
            else {
                localizablePropertyNames = this.getLocalizableComponentPropertyNames(componentDescriptor);
            }
            localizablePropertyNames.forEach((localizablePropertyName) => {
                if (component.propertiesByName[localizablePropertyName]) {
                    const stringGuid = propertyNameToStringGuidMap[localizablePropertyName] || this.rxGuidService.generate();
                    componentStrings[stringGuid] = component.propertiesByName[localizablePropertyName];
                    component.propertiesByName[localizablePropertyName] = stringGuid;
                }
            });
            if (!isEmpty(componentStrings)) {
                localizableStrings[component.guid] = componentStrings;
            }
        });
        return localizableStrings;
    }
    applyComponentDefinitionLocalization(componentDefinition, localizableStrings = {}) {
        return transform(componentDefinition.propertiesByName, (result, propertyValue, propertyName) => {
            if (localizableStrings[propertyValue]) {
                componentDefinition.propertiesByName[propertyName] = localizableStrings[propertyValue];
                result[propertyName] = propertyValue;
            }
        }, {});
    }
    getLocalizableActionParameterNames(actionDescriptor) {
        return (actionDescriptor.parameters || []).reduce((parameterNames, parameter) => {
            if (parameter.localizable) {
                parameterNames.push(parameter.name);
            }
            else if (parameter.attributes) {
                forEach(parameter.attributes, (attribute) => {
                    if (attribute.localizable) {
                        parameterNames.push(`${parameter.name}.${attribute.name}`);
                    }
                });
            }
            return parameterNames;
        }, []);
    }
    getLocalizableComponentPropertyNames(componentDescriptor) {
        return (componentDescriptor.properties || []).filter((prop) => prop.localizable).map((prop) => prop.name);
    }
    // this method used to move SelectGroupField localization from SelectGroup localization object
    // to own one in same way as this done for any other component.
    // Method should handle only AngularJS views that has legacy labelId property in SelectGroupField
    convertOldSelectGroupLocalization(viewDefinition, componentDefinitions) {
        componentDefinitions
            .filter((component) => component.type === RxViewComponentType.SelectGroup)
            .forEach((selectGroup) => {
            selectGroup.componentDefinitions.forEach((selectGroupField) => {
                if (selectGroupField.propertiesByName.labelId) {
                    const oldStringGuid = selectGroupField.propertiesByName.labelId;
                    const newStringGuid = this.rxGuidService.generate();
                    const localizedLabel = viewDefinition.localizableStringsByComponentId[selectGroup.guid][oldStringGuid];
                    // setting localized string guid same way as for other components
                    selectGroupField.propertiesByName.label = newStringGuid;
                    // moving localization from SelectGroup to SelectGroupField object with new guid
                    // to avoid unexpected server behaviour
                    set(viewDefinition.localizableStringsByComponentId, [selectGroupField.guid, newStringGuid], localizedLabel);
                    // removing legacy labelId
                    delete selectGroupField.propertiesByName.labelId;
                    // removing string from select group localization object
                    delete viewDefinition.localizableStringsByComponentId[selectGroup.guid][oldStringGuid];
                }
            });
            // removing select group localization object if empty
            if (isEmpty(viewDefinition.localizableStringsByComponentId[selectGroup.guid])) {
                delete viewDefinition.localizableStringsByComponentId[selectGroup.guid];
            }
        });
    }
}
RxViewDefinitionLocalizationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionLocalizationService, deps: [{ token: RxViewDefinitionParserService }, { token: RxViewComponentRegistryService }, { token: RxViewActionRegistryService }, { token: i4.RxGuidService }, { token: i4.RxTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionLocalizationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionLocalizationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionLocalizationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxViewDefinitionParserService }, { type: RxViewComponentRegistryService }, { type: RxViewActionRegistryService }, { type: i4.RxGuidService }, { type: i4.RxTreeService }]; } });

var ViewLayoutRole;
(function (ViewLayoutRole) {
    ViewLayoutRole["Header"] = "header";
    ViewLayoutRole["Content"] = "content";
    ViewLayoutRole["Footer"] = "footer";
})(ViewLayoutRole || (ViewLayoutRole = {}));
var LayoutTypes;
(function (LayoutTypes) {
    LayoutTypes["Flexible"] = "Flexible";
    LayoutTypes["Fixed"] = "Fixed";
})(LayoutTypes || (LayoutTypes = {}));
const defaultHeaderOutlet = {
    name: ViewLayoutRole.Header,
    height: 60,
    columns: [getEmptyColumn()]
};
const defaultFooterOutlet = {
    name: ViewLayoutRole.Footer,
    height: 60,
    columns: [getEmptyColumn()]
};
const RX_VIEW_LAYOUTS = [
    {
        id: 1,
        label: 'Header and 1 Column',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet()]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 2,
        label: 'Header and 2 Columns (50/50)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(6, 6)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 3,
        label: 'Header and 2 Columns (60/40)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(7, 5)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 4,
        label: 'Header and 2 Columns (40/60)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(5, 7)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 16,
        label: 'Header and 2 Columns (70/30)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(8, 4)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 5,
        label: 'Container',
        layout: {
            outlets: [getContentOutlet()]
        },
        layoutType: LayoutTypes.Flexible
    },
    {
        id: 6,
        label: '2 Columns (50/50)',
        layout: {
            outlets: [getContentOutlet(6, 6)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 7,
        label: '2 Columns (60/40)',
        layout: {
            outlets: [getContentOutlet(7, 5)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 8,
        label: '2 Columns (40/60)',
        layout: {
            outlets: [getContentOutlet(5, 7)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 14,
        label: '2 Columns (70/30)',
        layout: {
            outlets: [getContentOutlet(8, 4)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 9,
        label: '3 Equal Columns',
        layout: {
            outlets: [getContentOutlet(4, 4, 4)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 10,
        label: 'Header, Footer and 1 Column',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 11,
        label: 'Header, Footer and 2 Columns (50/50)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(6, 6), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 12,
        label: 'Header, Footer and 2 Columns (60/40)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(7, 5), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 13,
        label: 'Header, Footer and 2 Columns (40/60)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(5, 7), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 15,
        label: 'Header, Footer and 2 Columns (70/30)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(8, 4), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    }
].map((layout) => {
    layout.checksum = getLayoutChecksum(layout.layout);
    return layout;
});
function getLayoutChecksum(layout) {
    const contentOutlet = layout.outlets.find((outlet) => outlet.name === RX_VIEW_DEFINITION.defaultOutletName);
    let checksum = layout.outlets.find((outlet) => outlet.name === ViewLayoutRole.Header) ? 'h' : '';
    checksum += layout.outlets.find((outlet) => outlet.name === ViewLayoutRole.Footer) ? 'f' : '';
    contentOutlet.columns.forEach((column) => (checksum += `c${column.span || 12}`));
    return checksum;
}
function getContentOutlet(...columnSpan) {
    return {
        name: RX_VIEW_DEFINITION.defaultOutletName,
        columns: columnSpan.length ? columnSpan.map((span) => getEmptyColumn({ span })) : [getEmptyColumn()]
    };
}
function getEmptyColumn(props) {
    return Object.assign({ children: [] }, props);
}

// @dynamic
class RxViewLayout {
    static getViewLayoutForDefaultOutlet(children) {
        return {
            outlets: [this.getOutlet(RX_VIEW_DEFINITION.defaultOutletName, children)]
        };
    }
    static getEmptyViewLayoutForOutletNames(list) {
        return {
            outlets: list.map(({ name }) => this.getOutlet(name))
        };
    }
    static getEmptyViewLayoutForOutlets(outlets) {
        return {
            outlets: outlets.map((outlet) => {
                return Object.assign(Object.assign({}, outlet), { columns: outlet.columns.map((column) => (Object.assign(Object.assign({}, column), { children: [] }))) });
            })
        };
    }
    static getOutlet(name = RX_VIEW_DEFINITION.defaultOutletName, children = []) {
        return {
            name,
            columns: [
                {
                    children
                }
            ]
        };
    }
    static getViewLayoutChildGuids(layout, outletName) {
        return reduce(layout.outlets, (guids, outlet) => {
            if (!outletName || outletName === outlet.name) {
                outlet.columns.forEach((column) => {
                    guids.push(...column.children);
                });
            }
            return guids;
        }, []);
    }
    static hasChild(layout, guid) {
        return Boolean(layout.outlets.find((outlet) => this.outletHasChild(outlet, guid)));
    }
    static outletHasChild(outlet, guid) {
        return Boolean(outlet.columns.find((column) => column.children.includes(guid)));
    }
    static getViewLayoutTemplate(layoutTemplate) {
        const layoutItem = RX_VIEW_LAYOUTS.find((item) => item.id === layoutTemplate) ||
            RX_VIEW_LAYOUTS.find((item) => item.id === RX_VIEW_DEFINITION.defaultLayoutTemplateId);
        return layoutItem.layout;
    }
    static getLayoutName(layout) {
        const checksum = getLayoutChecksum(layout);
        const layoutTemplate = RX_VIEW_LAYOUTS.find((item) => item.checksum === checksum);
        return layoutTemplate ? layoutTemplate.label : '';
    }
    static removeChildFromLayout(layout, guidToRemove) {
        return {
            outlets: layout.outlets.map((outlet) => (Object.assign(Object.assign({}, outlet), { columns: outlet.columns.map((column) => (Object.assign(Object.assign({}, column), { children: column.children.filter((childGuid) => childGuid !== guidToRemove) }))) })))
        };
    }
}

const renameViewDefinitionCommand = 'com.bmc.arsys.rx.application.view.command.RenameViewDefinitionCommand';
const revertCustomizationResourceType = 'com.bmc.arsys.rx.application.view.command.RevertViewDefinitionCommand';
class RxViewDefinitionService {
    constructor(httpClient, rxGuidService, rxCommandFactoryService, rxViewDefinitionLocalizationService, rxLocalizationService) {
        this.httpClient = httpClient;
        this.rxGuidService = rxGuidService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
        this.rxLocalizationService = rxLocalizationService;
        this.renameCommand = rxCommandFactoryService.forResourceType(renameViewDefinitionCommand);
        this.revertCustomizationCommand = rxCommandFactoryService.forResourceType(revertCustomizationResourceType);
    }
    get(viewDefinitionName, options) {
        const defaultOptions = { params: { locale: this.rxLocalizationService.currentLocale } };
        return this.httpClient
            .get(this.getUrl(viewDefinitionName), Object.assign(Object.assign({}, defaultOptions), options))
            .pipe(map$1((viewDefinition) => this.rxViewDefinitionLocalizationService.applyLocalization(viewDefinition)));
    }
    getNew(layoutTemplate) {
        return of(this.getNewViewDefinition.call(this, layoutTemplate));
    }
    create(viewDefinition) {
        return this.httpClient.post(this.getUrl(), viewDefinition, { responseType: 'text', observe: 'response' });
    }
    update(viewDefinitionName, viewDefinition, options) {
        return this.httpClient.put(this.getUrl(viewDefinitionName), viewDefinition, options);
    }
    delete(viewDefinitionName) {
        return this.httpClient.delete(this.getUrl(viewDefinitionName));
    }
    rename(oldViewDefinitionName, newViewDefinitionName) {
        return this.renameCommand.execute({
            name: oldViewDefinitionName,
            newName: newViewDefinitionName
        });
    }
    isPageView(viewDefinition) {
        return (viewDefinition.componentDefinitions.length === 1 &&
            viewDefinition.componentDefinitions[0].type === RxViewComponentType.Page);
    }
    revertCustomization(viewDefinitionName) {
        return this.revertCustomizationCommand.execute({ viewDefinitionName });
    }
    getUrl(viewDefinitionName) {
        return viewDefinitionName
            ? `/api/rx/application/view/viewdefinition/${encodeURIComponent(viewDefinitionName)}`
            : '/api/rx/application/view/viewdefinition';
    }
    getNewViewDefinition(layoutTemplate = RX_VIEW_DEFINITION.defaultLayoutTemplateId) {
        return {
            guid: this.rxGuidService.generate(),
            name: null,
            description: null,
            componentDefinitions: [],
            inputParams: [],
            outputParams: [],
            allowOverlay: false,
            layout: JSON.stringify(RxViewLayout.getViewLayoutTemplate(layoutTemplate)),
            permissions: [
                {
                    ownerId: {
                        value: 0,
                        name: 'Public',
                        type: 'GROUP'
                    },
                    type: 'VISIBLE'
                }
            ],
            type: RX_VIEW_DEFINITION.types.regular,
            scope: RX_BUNDLE.definitionScopeTypes.bundle,
            targetViewDefinitionName: null,
            targetExtensionContainerGuid: null,
            styles: null
        };
    }
}
RxViewDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionService, deps: [{ token: i1$2.HttpClient }, { token: i4.RxGuidService }, { token: i1$1.RxCommandFactoryService }, { token: RxViewDefinitionLocalizationService }, { token: i1$1.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.HttpClient }, { type: i4.RxGuidService }, { type: i1$1.RxCommandFactoryService }, { type: RxViewDefinitionLocalizationService }, { type: i1$1.RxLocalizationService }]; } });

const viewDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.view.datapage.ViewDefinitionDataPageQuery';
class RxViewDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, viewDefinitionDataPageQuery, {
            params: {
                excludeExtensionViews: true
            }
        });
        this.injector = injector;
    }
}
RxViewDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxViewDefinitionCacheService {
    constructor(rxViewDefinitionService, viewDefinitionDataPageService) {
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.viewDefinitionDataPageService = viewDefinitionDataPageService;
        this.viewDefinitionCache = new Map();
        this.viewDefinitionNamesCache = new Map();
        this.consumers = new Set();
    }
    getViewDefinitionNames(bundleId) {
        if (!this.viewDefinitionNamesCache.has(bundleId)) {
            const viewDefinitionNames$ = this.viewDefinitionDataPageService
                .get({
                headers: { 'default-bundle-scope': bundleId },
                params: { propertySelection: ['name'], viewType: 'REGULAR' }
            })
                .pipe(pluck('data'), map$1((viewDefinitionsNames) => viewDefinitionsNames.map((viewDefinition) => viewDefinition.name)), shareReplay(1));
            this.viewDefinitionNamesCache.set(bundleId, viewDefinitionNames$);
        }
        return this.viewDefinitionNamesCache.get(bundleId);
    }
    getViewDefinition(viewDefinitionName, options) {
        if (!this.viewDefinitionCache.has(viewDefinitionName)) {
            const viewDefinition$ = this.rxViewDefinitionService.get(viewDefinitionName, options).pipe(shareReplay(1));
            this.viewDefinitionCache.set(viewDefinitionName, viewDefinition$);
        }
        return this.viewDefinitionCache.get(viewDefinitionName);
    }
    registerConsumer(consumerDestroy$) {
        this.consumers.add(consumerDestroy$);
        consumerDestroy$.subscribe(() => {
            this.consumers.delete(consumerDestroy$);
            if (isEmpty(this.consumers)) {
                this.clearCache();
            }
        });
    }
    clearCache() {
        this.viewDefinitionCache.clear();
        this.viewDefinitionNamesCache.clear();
    }
}
RxViewDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionCacheService, deps: [{ token: RxViewDefinitionService }, { token: RxViewDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxViewDefinitionService }, { type: RxViewDefinitionDataPageService }]; } });

class ViewModule {
    static registerComponents(components) {
        return {
            ngModule: ViewModule,
            providers: [
                {
                    provide: 'components',
                    useValue: [...components]
                }
            ]
        };
    }
}
ViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule });
ViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewModule, decorators: [{
            type: NgModule
        }] });

class RxViewActionService {
    constructor(rxViewActionRegistryService, rxLogService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLogService = rxLogService;
    }
    execute(actionName, parameters) {
        const viewActionDescriptor = this.rxViewActionRegistryService.get(actionName);
        if (viewActionDescriptor) {
            if (parameters.$condition$ !== false) {
                return viewActionDescriptor.service.execute(parameters);
            }
            else {
                this.rxLogService.debug(`View Action ${actionName} skipped.`);
                return EMPTY;
            }
        }
        else {
            return throwError(`View Action ${actionName} not found.`);
        }
    }
}
RxViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionService, deps: [{ token: RxViewActionRegistryService }, { token: i1$1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxViewActionRegistryService }, { type: i1$1.RxLogService }]; } });

const RX_VIEW_ACTION = {
    viewActionNames: {
        openView: 'rxOpenViewAction',
        launchUrl: 'rxLaunchUrlAction'
    }
};
var OpenViewActionLaunchBehavior;
(function (OpenViewActionLaunchBehavior) {
    OpenViewActionLaunchBehavior["SameWindow"] = "sameWindow";
    OpenViewActionLaunchBehavior["NewWindow"] = "newWindow";
})(OpenViewActionLaunchBehavior || (OpenViewActionLaunchBehavior = {}));
var OpenViewActionModalSize;
(function (OpenViewActionModalSize) {
    OpenViewActionModalSize["Xsmall"] = "rx-xs";
    OpenViewActionModalSize["Small"] = "rx-sm";
    OpenViewActionModalSize["Medium"] = "rx-md";
    OpenViewActionModalSize["Large"] = "rx-lg";
    OpenViewActionModalSize["Xlarge"] = "rx-xl";
    OpenViewActionModalSize["Xxlarge"] = "rx-xxl";
    OpenViewActionModalSize["FullSize"] = "rx-full-size";
})(OpenViewActionModalSize || (OpenViewActionModalSize = {}));
var OpenViewActionType;
(function (OpenViewActionType) {
    OpenViewActionType["FullWidth"] = "fullWidth";
    OpenViewActionType["CenteredModal"] = "centeredModal";
    OpenViewActionType["DockedLeftModal"] = "dockedLeftModal";
    OpenViewActionType["DockedRightModal"] = "dockedRightModal";
})(OpenViewActionType || (OpenViewActionType = {}));
const RxViewAction = ɵmakeDecorator('RxViewAction');

const RX_LAUNCH_BEHAVIOR = {
    newWindow: {
        content: 'Open in a new tab',
        value: 'newWindow',
        target: '_blank'
    },
    sameWindow: {
        content: 'Open in the same tab',
        value: 'sameWindow',
        target: '_self'
    },
    parentFrame: {
        content: 'Open in the parent frame',
        value: 'parentFrame',
        target: '_parent'
    },
    windowFullBody: {
        content: 'Open in the full body of the window',
        value: 'windowFullBody',
        target: '_top'
    }
};

class RxViewActionDesignAdapterService {
    adaptDefinition(componentDefinition) {
        var _a;
        componentDefinition.propertiesByName.$condition$ = (_a = componentDefinition.propertiesByName.$condition$) !== null && _a !== void 0 ? _a : null;
    }
}
RxViewActionDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDesignAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDesignAdapterService, decorators: [{
            type: Injectable
        }] });

class ViewActionDesignModule {
    constructor(rxViewComponentRegistryService, rxDefinitionAdapterRegistryService, rxViewActionDesignAdapterService) {
        rxDefinitionAdapterRegistryService.registerDesignAdapter(RxViewComponentType.Action, rxViewActionDesignAdapterService);
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Action,
            isDataComponent: true,
            isContainerComponent: true
        });
    }
}
ViewActionDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule, deps: [{ token: RxViewComponentRegistryService }, { token: i1$1.RxDefinitionAdapterRegistryService }, { token: RxViewActionDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
ViewActionDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule });
ViewActionDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule, providers: [RxViewActionDesignAdapterService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxViewActionDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: RxViewComponentRegistryService }, { type: i1$1.RxDefinitionAdapterRegistryService }, { type: RxViewActionDesignAdapterService }]; } });

class RxViewActionDefinitionAdapterRegistryService {
    constructor() {
        this.runtimeAdapters = new Map();
        this.designAdapters = new Map();
    }
    registerRuntimeAdapter(actionName, adapter) {
        this.runtimeAdapters.set(actionName, adapter);
    }
    registerDesignAdapter(actionName, adapter) {
        this.designAdapters.set(actionName, adapter);
    }
    getRuntimeAdapter(actionName) {
        return this.runtimeAdapters.get(actionName);
    }
    getDesignAdapter(actionName) {
        return this.designAdapters.get(actionName);
    }
}
RxViewActionDefinitionAdapterRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDefinitionAdapterRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionDefinitionAdapterRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDefinitionAdapterRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDefinitionAdapterRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var ViewDisplayType;
(function (ViewDisplayType) {
    ViewDisplayType["Preview"] = "preview";
    ViewDisplayType["Regular"] = "view";
    ViewDisplayType["NoShell"] = "iview";
})(ViewDisplayType || (ViewDisplayType = {}));

class RxViewActionUtilsService {
    constructor(rxBundleCacheService, router, rxStringService, rxUrlUtilsService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.router = router;
        this.rxStringService = rxStringService;
        this.rxUrlUtilsService = rxUrlUtilsService;
    }
    generateViewUrl(viewDefinitionName, inputParams = {}) {
        const currentUrl = this.router.routerState.snapshot.url;
        let displayType = ViewDisplayType.Regular;
        if (currentUrl.includes(`/${ViewDisplayType.Preview}/`)) {
            displayType = ViewDisplayType.Preview;
        }
        else if (currentUrl.includes(`/${ViewDisplayType.NoShell}/`)) {
            displayType = ViewDisplayType.NoShell;
        }
        return this.rxUrlUtilsService.buildUrl(`/${this.rxBundleCacheService.bundleId}/${displayType}/${viewDefinitionName}`, inputParams);
    }
    extractRecordIds(source) {
        let ids = [];
        if (isFunction(source.getSelectedRows)) {
            ids = this.getIdsFromGridRows(source.getSelectedRows());
        }
        else if (isObject(source) && this.rxStringService.isNonEmptyString(source[RowDataItemIdFieldName])) {
            ids.push(source[RowDataItemIdFieldName]);
        }
        else if (Array.isArray(source) && some(source, isObject)) {
            ids = this.getIdsFromGridRows(source);
        }
        else if (this.rxStringService.isNonEmptyString(source)) {
            ids.push(source);
        }
        else if (Array.isArray(source) && some(source, this.rxStringService.isNonEmptyString)) {
            ids = clone(source);
        }
        return ids;
    }
    getIdsFromGridRows(rows) {
        return flow((rowsArray) => map(rowsArray, RowDataItemIdFieldName), compact, uniq)(rows);
    }
}
RxViewActionUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionUtilsService, deps: [{ token: i1$1.RxBundleCacheService }, { token: i2.Router }, { token: i4.RxStringService }, { token: i4.RxUrlUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxBundleCacheService }, { type: i2.Router }, { type: i4.RxStringService }, { type: i4.RxUrlUtilsService }]; } });

class RxOldViewLayoutAdapterService {
    constructor(rxJsonParserService) {
        this.rxJsonParserService = rxJsonParserService;
    }
    convertLayout(componentDefinitionItem) {
        if (this.isViewDefinitionItem(componentDefinitionItem)) {
            this.convertViewLayout(componentDefinitionItem.componentDefinition);
        }
        else if (this.isContainerComponentDefinition(componentDefinitionItem.componentDefinition)) {
            this.convertComponentLayout(componentDefinitionItem.componentDefinition);
        }
    }
    isViewDefinitionItem(componentDefinition) {
        return !componentDefinition.parentComponentDefinition;
    }
    convertViewLayout(viewDefinition) {
        const layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
        if (isNil(layout.layoutTemplate) || get(layout, 'columns[0].role')) {
            // for views from new designer, or for views with 1 or more columns
            this.convertComponentLayout(viewDefinition);
        }
        else {
            // for views with header and/or footer
            const childrenWithRoles = get(layout, 'columns[0].children', []);
            const outlets = childrenWithRoles.map((child, i) => {
                let outletItem;
                if (child.role) {
                    outletItem = {
                        name: child.role === ViewLayoutRole.Content ? RX_VIEW_DEFINITION.defaultOutletName : child.role,
                        static: child.static || null,
                        height: child.height || null,
                        role: child.role || null,
                        columns: (child.columns || []).map(this.convertColumns.bind(this))
                    };
                }
                else {
                    // creating outlets for case when components are sibling to header/footer
                    outletItem = {
                        name: `outlet-${i}`,
                        columns: [{ children: [child.componentDefinitionId] }]
                    };
                }
                return outletItem;
            });
            const newLayout = { outlets };
            viewDefinition.layout = JSON.stringify(newLayout);
        }
    }
    convertComponentLayout(componentDefinition) {
        if (componentDefinition.layout) {
            const layout = this.rxJsonParserService.tryParseJson(componentDefinition.layout);
            // add columns to views created in new designer
            // todo remove after new designer will save layouts with columns
            const children = get(layout, 'outlets[0].children');
            if (children) {
                componentDefinition.layout = JSON.stringify(this.convertNewDesignerLayout(layout));
            }
            if (layout && layout.componentDefinitionId) {
                const newLayout = {
                    outlets: [
                        {
                            name: RX_VIEW_DEFINITION.defaultOutletName,
                            columns: layout.columns.map(this.convertColumns.bind(this))
                        }
                    ]
                };
                componentDefinition.layout = JSON.stringify(newLayout);
            }
        }
    }
    convertNewDesignerLayout(layout) {
        const children = get(layout, 'outlets[0].children');
        if (children) {
            layout.outlets[0].columns = [
                {
                    children
                }
            ];
            delete layout.outlets[0].children;
        }
        return layout;
    }
    convertColumns(column) {
        // rx-tab-container was placed 1 lever deeper in the layout of rx-tab-panel in views
        // created in AngularJS view designer. 'columns[0].children[0]' should extract it.
        return {
            span: column.span || null,
            cssClass: `col-sm-${column.span || 12}`,
            children: column.children.map((child) => get(child, 'columns[0].children[0].componentDefinitionId') || child.componentDefinitionId)
        };
    }
    isContainerComponentDefinition(componentDefinition) {
        return componentDefinition.componentDefinitions !== undefined;
    }
}
RxOldViewLayoutAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOldViewLayoutAdapterService, deps: [{ token: i4.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOldViewLayoutAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOldViewLayoutAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOldViewLayoutAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i4.RxJsonParserService }]; } });

const RX_SHELL = {
    componentName: 'rx-shell',
    navBar: {
        menuItem: 'rx-shell-menu-item',
        action: 'rx-shell-action',
        menuGroup: 'rx-shell-menu-group',
        userMenu: 'rx-shell-user-menu'
    },
    actions: {
        launchURL: 'rxShellLaunchUrlAction',
        navigateToView: 'rxShellNavigateToViewAction',
        navigateToState: 'rxShellNavigateToStateAction',
        navigateToSmartReporting: 'rxShellNavigateToSmartReportingAction'
    },
    outlets: {
        actions: 'actions'
    }
};

class RxShellService {
    constructor(translateService, rxCurrentUserService, rxExpressionEvaluatorService, rxJsonParserService, rxNotificationService, rxObjectUtilsService, rxUrlUtilsService, rxViewDefinitionCacheService, rxViewDefinitionParserService, rxOldViewLayoutAdapterService, rxFeatureService) {
        this.translateService = translateService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxNotificationService = rxNotificationService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
        this.rxFeatureService = rxFeatureService;
        this.menuItemId = 0;
        this.navigateToSmartReportingSubject = new Subject();
        this.navigateToViewSubject = new Subject();
        this.openUserPreferencesSubject = new Subject();
        this.openUserAvailabilitySubject = new Subject();
        this.shellConfigSubject = new ReplaySubject(1);
        this.openGainsightPreferencesSubject = new Subject();
        this.navigateToSmartReporting$ = this.navigateToSmartReportingSubject.asObservable();
        this.navigateToView$ = this.navigateToViewSubject.asObservable();
        this.openUserPreferences$ = this.openUserPreferencesSubject.asObservable();
        this.openUserAvailability$ = this.openUserAvailabilitySubject.asObservable();
        this.shellConfig$ = this.shellConfigSubject.asObservable();
        this.openGainsightPreferences$ = this.openGainsightPreferencesSubject.asObservable();
    }
    resetMenuItemCount() {
        this.menuItemId = 0;
    }
    updateMenuItemCount() {
        return this.menuItemId++;
    }
    getChildGuids(layout, outletName = RX_VIEW_DEFINITION.defaultOutletName) {
        return RxViewLayout.getViewLayoutChildGuids(layout, outletName);
    }
    getIconClass(icon, left = true) {
        const iconId = get(RX_LEGACY_ICONS, icon, icon);
        return iconId ? `d-icon-${left ? 'left-' : ''}` + iconId : '';
    }
    getShellConfig(bundleId) {
        const navigationBarItems = [];
        const flattenedMenuItems = [];
        const navigationActions = [];
        const preferenceMenuItem = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-preferences.label'),
            action: this.openUserPreferences.bind(this),
            className: 'd-icon-wrench_o',
            hide: false,
            subMenu: []
        };
        const gainsightPreferenceMenuItem = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
            action: this.openGainsightPreferences.bind(this),
            className: 'd-icon-app_chart_bar',
            hide: false,
            id: 0,
            subMenu: []
        };
        const myAvailabilityMenuItem = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability.label'),
            action: this.openUserAvailability.bind(this),
            hide: false,
            className: 'd-icon-user_clock_o',
            subMenu: []
        };
        let navBarProperties;
        let userMenu = null;
        this.currentUser = this.rxCurrentUserService.get();
        return this.rxViewDefinitionCacheService
            .getViewDefinition(`${bundleId}:${RX_APPLICATION.shellDefinitionName}`)
            .pipe(switchMap((shellDefinition) => {
            this.rxViewDefinitionParserService
                .getComponents(shellDefinition)
                .forEach((definition) => this.rxOldViewLayoutAdapterService.convertLayout(definition));
            if (shellDefinition && shellDefinition.componentDefinitions[0]) {
                const navBar = shellDefinition.componentDefinitions[0];
                const layout = this.rxJsonParserService.tryParseJson(navBar.layout);
                navBarProperties = navBar.propertiesByName || {
                    allowAppSwitching: null,
                    globalSearchUseDefault: null,
                    globalSearchDisabled: null,
                    globalSearchRecords: null,
                    globalSearchCustomSearchState: null
                };
                forEach(this.getChildGuids(layout), (guid) => {
                    const menuItemDefinition = find(navBar.componentDefinitions, {
                        guid
                    });
                    if (menuItemDefinition) {
                        let menuItem;
                        switch (menuItemDefinition.type) {
                            case RX_SHELL.navBar.menuGroup:
                            case RX_SHELL.navBar.userMenu:
                                const subMenu = [];
                                const childLayout = this.rxJsonParserService.tryParseJson(menuItemDefinition.layout) ||
                                    RxViewLayout.getViewLayoutForDefaultOutlet(menuItemDefinition.componentDefinitions.map((item) => item.guid));
                                forEach(this.getChildGuids(childLayout), (childGuid) => {
                                    const subItemDefinition = find(menuItemDefinition.componentDefinitions, {
                                        guid: childGuid
                                    });
                                    if (subItemDefinition) {
                                        const subItem = this.getMenuProperties(subItemDefinition);
                                        if (!isEmpty(subItem)) {
                                            // concatenating className with listClassName, as listClassName not available for subMenu
                                            if (menuItemDefinition.type === RX_SHELL.navBar.userMenu) {
                                                subItem.className += ' ' + subItem.listClassName;
                                            }
                                            else {
                                                flattenedMenuItems.push(subItem);
                                            }
                                            subMenu.push(subItem);
                                        }
                                    }
                                });
                                if (subMenu.length > 0) {
                                    // LMA:: TODO:: Even if we set the className in a first level menu the icon is not displayed
                                    menuItem = {
                                        hide: has(menuItemDefinition.propertiesByName, 'hidden')
                                            ? this.rxJsonParserService.tryParseJson(menuItemDefinition.propertiesByName.hidden)
                                            : false,
                                        listClassName: get(menuItemDefinition.propertiesByName, 'styles'),
                                        className: this.getIconClass(get(menuItemDefinition.propertiesByName, 'menuItemIcon')),
                                        name: menuItemDefinition.propertiesByName.menuGroupName,
                                        subMenu: subMenu,
                                        id: this.updateMenuItemCount()
                                    };
                                }
                                break;
                            case RX_SHELL.navBar.menuItem:
                                menuItem = this.getMenuProperties(menuItemDefinition);
                                break;
                        }
                        if (!isEmpty(menuItem)) {
                            if (menuItemDefinition.type === RX_SHELL.navBar.userMenu) {
                                userMenu = menuItem;
                            }
                            else {
                                flattenedMenuItems.push(menuItem);
                                navigationBarItems.push(menuItem);
                            }
                        }
                    }
                });
                forEach(this.getChildGuids(layout, RX_SHELL.outlets.actions), (guid) => {
                    const menuItemDefinition = navBar.componentDefinitions.find((definition) => definition.guid === guid);
                    if (menuItemDefinition) {
                        navigationActions.push(this.getMenuProperties(menuItemDefinition));
                    }
                });
            }
            if (this.rxCurrentUserService.isSupportStaff()) {
                myAvailabilityMenuItem.id = this.updateMenuItemCount();
                if (!userMenu) {
                    userMenu = {
                        subMenu: []
                    };
                }
                userMenu.subMenu.push(myAvailabilityMenuItem);
            }
            if (this.currentUser.fullName) {
                preferenceMenuItem.id = this.updateMenuItemCount();
                if (!userMenu) {
                    userMenu = {
                        subMenu: []
                    };
                }
                userMenu.subMenu.push(preferenceMenuItem);
            }
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                userMenu.subMenu.push(gainsightPreferenceMenuItem);
            }
            const rxData = {
                flattenedMenuItems,
                navigationBarItems,
                navigationActions,
                userMenu: userMenu || [],
                allowAppSwitching: has(navBarProperties, 'allowAppSwitching')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.allowAppSwitching)
                    : false,
                globalSearchUseDefault: has(navBarProperties, 'globalSearchUseDefault')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchUseDefault)
                    : true,
                globalSearchCustomSearchState: navBarProperties.globalSearchCustomSearchState || '',
                globalSearchDisabled: has(navBarProperties, 'globalSearchDisabled')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchDisabled)
                    : true,
                globalSearchRecords: has(navBarProperties, 'globalSearchRecords')
                    ? this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchRecords)
                    : [],
                // LMA:: TODO:: Later... See:
                // standardlib/src/main/webapp/scripts/view-components/shell/shell-config.resource.js
                // ,
                // globalSearchState: rxSearchResultsState.get(),
                // administrationSettingsState: rxAdministrationSettingsState.get()
                globalSearchState: 'globalSearchState',
                administrationSettingsState: 'adminSettingsState'
            };
            // In case server already had previously saved shell config with global search not configured,
            // we want to disable global search by default
            if (!rxData.globalSearchDisabled &&
                ((rxData.globalSearchUseDefault && rxData.globalSearchRecords.length === 0) ||
                    (!rxData.globalSearchUseDefault && rxData.globalSearchCustomSearchState.length === 0))) {
                rxData.globalSearchDisabled = true;
            }
            this.shellConfigSubject.next(rxData);
            return of(rxData);
        }));
    }
    openUserPreferences() {
        this.openUserPreferencesSubject.next();
    }
    openGainsightPreferences() {
        this.openGainsightPreferencesSubject.next();
    }
    openUserAvailability() {
        this.openUserAvailabilitySubject.next();
    }
    navigateToView(viewParams) {
        this.navigateToViewSubject.next(viewParams);
    }
    navigateToState() {
        this.rxNotificationService.addWarningMessage('This feature is not supported.');
    }
    navigateToSmartReporting() {
        this.navigateToSmartReportingSubject.next();
    }
    getMenuProperties(itemDefinition) {
        const menuItem = {};
        const properties = this.rxObjectUtilsService.expandProperties(itemDefinition.propertiesByName);
        menuItem.type = properties.actionName;
        menuItem.id = this.updateMenuItemCount();
        menuItem.closeOnClick = true;
        switch (properties.actionName) {
            case RX_SHELL.actions.launchURL:
                menuItem.name = properties.menuItemName;
                menuItem.target =
                    RX_LAUNCH_BEHAVIOR[properties.launchBehavior || OpenViewActionLaunchBehavior.NewWindow].target;
                if (itemDefinition.type === RX_SHELL.navBar.action) {
                    menuItem.action = () => {
                        window.open(properties.url, menuItem.target);
                    };
                }
                else {
                    menuItem.link = properties.url;
                }
                break;
            case RX_SHELL.actions.navigateToView:
                const viewParams = properties.viewParams;
                forEach(viewParams, (expression, parameterName) => {
                    const paramValue = this.rxExpressionEvaluatorService.tryEvaluate(expression, {
                        keywords: {
                            userId: this.currentUser.userId,
                            personId: this.currentUser.personInstanceId
                        }
                    });
                    viewParams[parameterName] = paramValue;
                    return paramValue;
                });
                const url = this.rxUrlUtilsService.buildUrl(`${properties.viewDefinitionName}`, viewParams);
                menuItem.name = properties.menuItemName;
                menuItem.viewUrl = url;
                menuItem.action = this.navigateToView.bind(this, menuItem);
                menuItem.openViewParams = {
                    viewDefinitionName: properties.viewDefinitionName,
                    presentation: Object.assign({ type: OpenViewActionType.FullWidth, launchBehavior: OpenViewActionLaunchBehavior.SameWindow }, get(properties, 'presentation', {})),
                    viewParams
                };
                break;
            case RX_SHELL.actions.navigateToState:
                // LMA:: TODO:: Implement it later
                // if (!isRuntime || rxAuthorization.isStateAuthorized(properties.state)) {
                menuItem.name = properties.menuItemName;
                const stateParameters = {
                    state: properties.state,
                    menuItemId: menuItem.id
                };
                menuItem.stateParameters = stateParameters;
                menuItem.action = this.navigateToState.bind(this, stateParameters);
                break;
            case RX_SHELL.actions.navigateToSmartReporting:
                menuItem.name = properties.menuItemName;
                menuItem.action = this.navigateToSmartReporting.bind(this);
                break;
        }
        menuItem.hide = has(properties, 'hidden') ? this.rxJsonParserService.tryParseJson(properties.hidden) : false;
        menuItem.listClassName = properties.styles;
        menuItem.className = this.getIconClass(properties.menuItemIcon, itemDefinition.type !== RX_SHELL.navBar.action);
        return menuItem;
    }
}
RxShellService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellService, deps: [{ token: i1.TranslateService }, { token: i1$1.RxCurrentUserService }, { token: RxExpressionEvaluatorService }, { token: i4.RxJsonParserService }, { token: i1$1.RxNotificationService }, { token: i4.RxObjectUtilsService }, { token: i4.RxUrlUtilsService }, { token: RxViewDefinitionCacheService }, { token: RxViewDefinitionParserService }, { token: RxOldViewLayoutAdapterService }, { token: i1$1.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxShellService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i1$1.RxCurrentUserService }, { type: RxExpressionEvaluatorService }, { type: i4.RxJsonParserService }, { type: i1$1.RxNotificationService }, { type: i4.RxObjectUtilsService }, { type: i4.RxUrlUtilsService }, { type: RxViewDefinitionCacheService }, { type: RxViewDefinitionParserService }, { type: RxOldViewLayoutAdapterService }, { type: i1$1.RxFeatureService }]; } });

class RxHomepageResolver {
    constructor(rxGlobalCacheService, rxShellService, rxTreeService, router, rxSessionService, rxComponentCanDeactivateGuard, rxLocalizationService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxShellService = rxShellService;
        this.rxTreeService = rxTreeService;
        this.router = router;
        this.rxSessionService = rxSessionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxLocalizationService = rxLocalizationService;
        this.unknownApplicationRoute = '/unknown-application';
    }
    canActivate(route, state) {
        const bundleId = route.paramMap.get('bundleId');
        const applicationId = head(route.url).path;
        const useDefaultLang = applicationId === RX_APPLICATION.innovationStudioBundleId;
        const initTranslations$ = this.rxLocalizationService.initTranslations(useDefaultLang);
        // waiting for translations to resolve to make getShellConfig call with correct lang
        return combineLatest([this.rxSessionService.sessionActive$, initTranslations$]).pipe(switchMap(() => {
            return this.rxGlobalCacheService
                .getBundleDescriptors()
                .pipe(concatMap((bundleDescriptors) => this.getBundleUrl(bundleDescriptors, bundleId)));
        }), tap(() => this.rxComponentCanDeactivateGuard.disable()));
    }
    getBundleUrl(bundleDescriptors, bundleId) {
        if (findIndex(bundleDescriptors, { id: bundleId }) !== -1) {
            return this.rxShellService.getShellConfig(bundleId).pipe(map$1((shellConfiguration) => {
                const menuItems = get(this.rxTreeService.flattenTree(shellConfiguration, 'navigationBarItems'), '[0].flattenedMenuItems');
                const defaultView = find(menuItems, {
                    type: RX_SHELL.actions.navigateToView
                });
                return this.generateUrl(defaultView, bundleId);
            }));
        }
        else {
            return of(this.router.parseUrl(this.unknownApplicationRoute));
        }
    }
    generateUrl(defaultView, bundleId) {
        return this.router.parseUrl(defaultView
            ? `/${bundleId}/view/${defaultView.viewUrl}`
            : `/${bundleId}/view/${RX_APPLICATION.settingsBundleId}:Unknown Default View Error)}`);
    }
}
RxHomepageResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHomepageResolver, deps: [{ token: i1$1.RxGlobalCacheService }, { token: RxShellService }, { token: i4.RxTreeService }, { token: i2.Router }, { token: i1$1.RxSessionService }, { token: i1$1.RxComponentCanDeactivateGuard }, { token: i1$1.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxHomepageResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHomepageResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHomepageResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxGlobalCacheService }, { type: RxShellService }, { type: i4.RxTreeService }, { type: i2.Router }, { type: i1$1.RxSessionService }, { type: i1$1.RxComponentCanDeactivateGuard }, { type: i1$1.RxLocalizationService }]; } });

class RxViewComponentResolver {
    constructor(rxViewComponentRegistryService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
    }
    resolve() {
        return this.rxViewComponentRegistryService.resolveAsyncDescriptors();
    }
}
RxViewComponentResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentResolver, deps: [{ token: RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewComponentResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxViewComponentRegistryService }]; } });

class RxDeviceDetectionService {
    constructor(adaptDeviceDetectionService) {
        var _a;
        this.adaptDeviceDetectionService = adaptDeviceDetectionService;
        this.devices = [
            {
                type: RxDevice.Desktop,
                isDetected: this.adaptDeviceDetectionService.deviceDesktop()
            },
            {
                type: RxDevice.Tablet,
                isDetected: this.adaptDeviceDetectionService.deviceTablet()
            },
            {
                type: RxDevice.Mobile,
                isDetected: this.adaptDeviceDetectionService.deviceMobile()
            }
        ];
        this.currentDevice = (_a = this.devices.find((item) => item.isDetected)) === null || _a === void 0 ? void 0 : _a.type;
    }
}
RxDeviceDetectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeviceDetectionService, deps: [{ token: i1$3.AdaptDeviceDetectionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDeviceDetectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeviceDetectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeviceDetectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$3.AdaptDeviceDetectionService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { ApplyGridFilterMode, BwfViewComponentType, LayoutTypes, OpenViewActionLaunchBehavior, OpenViewActionModalSize, OpenViewActionType, RX_AVAILABLE_ON_DEVICES_ALL_VALUE, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE, RX_AVAILABLE_ON_DEVICES_PROP_DESC, RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_DISABLED_PROP_DEFAULT_VALUE, RX_DISABLED_PROP_DESC, RX_DISABLED_PROP_NAME, RX_EXPRESSION_EVALUATOR, RX_EXPRESSION_FUNCTIONS, RX_HIDDEN_PROP_DEFAULT_VALUE, RX_HIDDEN_PROP_DESC, RX_HIDDEN_PROP_NAME, RX_LAUNCH_BEHAVIOR, RX_LEGACY_ICONS, RX_RICH_TEXT, RX_SHELL, RX_STANDARD_PROPS_DEFAULT_VALUES, RX_STANDARD_PROPS_DESC, RX_STYLES_PROP_DEFAULT_VALUE, RX_STYLES_PROP_DESC, RX_STYLES_PROP_NAME, RX_SUPPORTED_FUNCTION, RX_VIEW_ACTION, RX_VIEW_DEFINITION, RX_VIEW_LAYOUTS, RecordGridFilterDataLogic, RecordGridFilterOperator, RecordGridNamedFilterOptionKey, RowDataItemIdFieldName, RxCkEditorConfiguratorService, RxDefaultExpressionEvaluatorService, RxDefaultExpressionValidatorService, RxDevice, RxDeviceDetectionService, RxExpressionEvaluatorService, RxExpressionHelperService, RxExpressionSyntaxTreeBuilderService, RxHomepageResolver, RxOldViewLayoutAdapterService, RxRecordQueryExpressionEvaluatorService, RxShellService, RxViewAction, RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService, RxViewActionService, RxViewActionUtilsService, RxViewComponent, RxViewComponentRegistryService, RxViewComponentResolver, RxViewComponentType, RxViewDefinitionCacheService, RxViewDefinitionDataPageService, RxViewDefinitionLocalizationService, RxViewDefinitionParserService, RxViewDefinitionService, RxViewLayout, ViewActionDesignModule, ViewComponentPropertyType, ViewDefinitionType, ViewDisplayType, ViewLayoutRole, ViewModule, getLayoutChecksum, renameViewDefinitionCommand, revertCustomizationResourceType };
//# sourceMappingURL=helix-platform-view-api.js.map
