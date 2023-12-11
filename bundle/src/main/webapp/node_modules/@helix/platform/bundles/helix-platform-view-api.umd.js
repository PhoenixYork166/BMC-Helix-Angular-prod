(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngx-translate/core'), require('@helix/platform/shared/api'), require('@helix/platform/utils'), require('lodash'), require('bignumber.js'), require('jsep'), require('@helix/platform/record/api'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/router'), require('@bmc-ux/adapt-angular')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/view/api', ['exports', '@angular/core', '@ngx-translate/core', '@helix/platform/shared/api', '@helix/platform/utils', 'lodash', 'bignumber.js', 'jsep', '@helix/platform/record/api', 'rxjs', 'rxjs/operators', '@angular/common/http', '@angular/router', '@bmc-ux/adapt-angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.view = global.helix.platform.view || {}, global.helix.platform.view.api = {}), global.ng.core, global.ngxTranslateCore, global.helix.platform.shared.api, global.helix.platform.utils, global.lodash, global.bigNumber, global.jsep, global.helix.platform.record.api, global.rxjs, global.rxjs.operators, global.ng.common.http, global.ng.router, global.i1$3));
})(this, (function (exports, i0, i1, i1$1, i4, lodash, BigNumber, jsep, i4$1, rxjs, operators, i1$2, i2, i1$3) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
    var jsep__namespace = /*#__PURE__*/_interopNamespace(jsep);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$3);

    exports.RecordGridFilterDataLogic = void 0;
    (function (RecordGridFilterDataLogic) {
        RecordGridFilterDataLogic["And"] = "and";
        RecordGridFilterDataLogic["Or"] = "or";
    })(exports.RecordGridFilterDataLogic || (exports.RecordGridFilterDataLogic = {}));
    exports.RecordGridFilterOperator = void 0;
    (function (RecordGridFilterOperator) {
        RecordGridFilterOperator["Eq"] = "eq";
        RecordGridFilterOperator["Gte"] = "gte";
        RecordGridFilterOperator["Lte"] = "lte";
        RecordGridFilterOperator["Like"] = "like";
        RecordGridFilterOperator["Ne"] = "ne";
        RecordGridFilterOperator["Lt"] = "lt";
        RecordGridFilterOperator["Gt"] = "gt";
        RecordGridFilterOperator["In"] = "in";
    })(exports.RecordGridFilterOperator || (exports.RecordGridFilterOperator = {}));
    var RecordGridNamedFilterOptionKey = 'namedFilterOption';

    var RowDataItemIdFieldName = '$ID$';
    exports.ApplyGridFilterMode = void 0;
    (function (ApplyGridFilterMode) {
        ApplyGridFilterMode["Append"] = "Append";
        ApplyGridFilterMode["Remove"] = "Remove";
        ApplyGridFilterMode["Overwrite"] = "Overwrite";
        ApplyGridFilterMode["Merge"] = "Merge";
        ApplyGridFilterMode["Clear"] = "Clear";
        ApplyGridFilterMode["Begin"] = "Begin";
        ApplyGridFilterMode["End"] = "End";
    })(exports.ApplyGridFilterMode || (exports.ApplyGridFilterMode = {}));

    var expressionAttributeName = 'rx-expression';
    var RX_RICH_TEXT = {
        expressionAttributeName: expressionAttributeName
    };

    var RX_RICH_TEXT_STYLES = 'skins/rich-text/';
    var RxCkEditorConfiguratorService = /** @class */ (function () {
        function RxCkEditorConfiguratorService(translateService, rxLocalizationService, rxUrlUtilsService) {
            this.translateService = translateService;
            this.rxLocalizationService = rxLocalizationService;
            this.rxUrlUtilsService = rxUrlUtilsService;
        }
        RxCkEditorConfiguratorService.prototype.getCKEditorConfig = function () {
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
        };
        RxCkEditorConfiguratorService.prototype.getContentRules = function () {
            var _this = this;
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
                    match: function (element) { return _this.rxUrlUtilsService.isUrlSafe(element.attributes.href); },
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
        };
        return RxCkEditorConfiguratorService;
    }());
    RxCkEditorConfiguratorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCkEditorConfiguratorService, deps: [{ token: i1__namespace.TranslateService }, { token: i1__namespace$1.RxLocalizationService }, { token: i4__namespace.RxUrlUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCkEditorConfiguratorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCkEditorConfiguratorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCkEditorConfiguratorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.TranslateService }, { type: i1__namespace$1.RxLocalizationService }, { type: i4__namespace.RxUrlUtilsService }]; } });

    exports.ViewComponentPropertyType = void 0;
    (function (ViewComponentPropertyType) {
        ViewComponentPropertyType["Boolean"] = "boolean";
        ViewComponentPropertyType["String"] = "string";
        ViewComponentPropertyType["Number"] = "number";
        ViewComponentPropertyType["Array"] = "array";
        ViewComponentPropertyType["Object"] = "object";
    })(exports.ViewComponentPropertyType || (exports.ViewComponentPropertyType = {}));

    exports.RxDevice = void 0;
    (function (RxDevice) {
        RxDevice["Desktop"] = "desktop";
        RxDevice["Tablet"] = "tablet";
        RxDevice["Mobile"] = "mobile";
    })(exports.RxDevice || (exports.RxDevice = {}));

    var _a$3;
    var RX_AVAILABLE_ON_DEVICES_ALL_VALUE = Object.values(exports.RxDevice);
    var RX_AVAILABLE_ON_DEVICES_PROP_NAME = 'availableOnDevices';
    var RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE = (_a$3 = {},
        _a$3[RX_AVAILABLE_ON_DEVICES_PROP_NAME] = RX_AVAILABLE_ON_DEVICES_ALL_VALUE,
        _a$3);
    var RX_AVAILABLE_ON_DEVICES_PROP_DESC = {
        name: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
        type: exports.ViewComponentPropertyType.Array,
        designType: exports.ViewComponentPropertyType.Array
    };

    var _a$2;
    var RX_DISABLED_PROP_NAME = 'disabled';
    var RX_DISABLED_PROP_DEFAULT_VALUE = (_a$2 = {},
        _a$2[RX_DISABLED_PROP_NAME] = '0',
        _a$2);
    var RX_DISABLED_PROP_DESC = {
        name: RX_DISABLED_PROP_NAME,
        enableExpressionEvaluation: true
    };

    var _a$1;
    var RX_HIDDEN_PROP_NAME = 'hidden';
    var RX_HIDDEN_PROP_DEFAULT_VALUE = (_a$1 = {},
        _a$1[RX_HIDDEN_PROP_NAME] = '0',
        _a$1);
    var RX_HIDDEN_PROP_DESC = {
        name: RX_HIDDEN_PROP_NAME,
        enableExpressionEvaluation: true
    };

    var _a;
    var RX_STYLES_PROP_NAME = 'styles';
    var RX_STYLES_PROP_DEFAULT_VALUE = (_a = {},
        _a[RX_STYLES_PROP_NAME] = null,
        _a);
    var RX_STYLES_PROP_DESC = {
        name: RX_STYLES_PROP_NAME
    };

    var RX_STANDARD_PROPS_DESC = [RX_HIDDEN_PROP_DESC, RX_STYLES_PROP_DESC, RX_AVAILABLE_ON_DEVICES_PROP_DESC];
    var RX_STANDARD_PROPS_DEFAULT_VALUES = Object.assign(Object.assign(Object.assign({}, RX_HIDDEN_PROP_DEFAULT_VALUE), RX_STYLES_PROP_DEFAULT_VALUE), RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var expressionFunctions = [
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
    var RX_EXPRESSION_FUNCTIONS = expressionFunctions.map(function (descriptor) {
        var params = lodash.map(descriptor.parameters, 'name').join(', ');
        return Object.assign(Object.assign({}, descriptor), { signature: descriptor.name + "(" + params + ")" });
    });
    var RX_SUPPORTED_FUNCTION = {
        SAME: function (collection) { return lodash.every(collection, function (value) { return value === collection[0]; }); },
        INCLUDES: function (collection, value) { return lodash.includes(collection, value); },
        SIZE: function (collection) { return lodash.size(collection); }
    };

    var RxExpressionHelperService = /** @class */ (function () {
        function RxExpressionHelperService() {
            this.prepareHandlers = [];
            function _convertNull(expression) {
                return expression.replace(/null/gi, null);
            }
            function _convertNot(expression) {
                return expression.replace(/not/gi, '!');
            }
            function _convertOr(expression) {
                return expression.replace(/or/gi, i1$1.ExpressionOperator.Or);
            }
            function _convertAnd(expression) {
                return expression.replace(/and/gi, i1$1.ExpressionOperator.And);
            }
            function _convertLike(expression) {
                return expression.replace(/like/gi, i1$1.ExpressionOperator.Like);
            }
            function _convertContains(expression) {
                return expression.replace(/contains/gi, i1$1.ExpressionOperator.Contains);
            }
            this.prepareHandlers.push(_convertNull, _convertNot, _convertAnd, _convertOr, _convertLike, _convertContains);
        }
        RxExpressionHelperService.prototype.extractTokens = function (regex, key, expression) {
            var matches = expression.match(regex);
            return {
                matches: matches,
                expression: expression.replace(regex, key)
            };
        };
        RxExpressionHelperService.prototype.insertTokens = function (matches, key, expression) {
            if (matches !== null) {
                matches.forEach(function (value) {
                    expression = expression.replace(key, value);
                });
            }
            return expression;
        };
        RxExpressionHelperService.prototype.prepare = function (expression) {
            // replace all spaces with charCode 160 to 32 charCode which supported by jsep
            var convertedExpression = expression.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
            var stringExpressionsData = this.extractTokens(/'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/g, 'RX_STRING_EXPRESSION', convertedExpression);
            stringExpressionsData.matches = lodash.map(stringExpressionsData.matches, this.insertLiteralExpressions);
            var expressionsData = this.extractTokens(/\${[^}]+}/g, 'RX_EXPRESSION', stringExpressionsData.expression);
            var preparedExpression = this.prepareOperators(expressionsData.expression);
            preparedExpression = this.insertExpressions(expressionsData.matches, 'RX_EXPRESSION', preparedExpression);
            return this.insertTokens(stringExpressionsData.matches, 'RX_STRING_EXPRESSION', preparedExpression);
        };
        RxExpressionHelperService.prototype.prepareOperators = function (expression) {
            return lodash.reduce(this.prepareHandlers, function (result, handler) { return handler(result); }, expression);
        };
        RxExpressionHelperService.prototype.insertLiteralExpressions = function (expression) {
            var literalExpressions = lodash.uniq(expression.match(/\${[^}$]+}/g));
            literalExpressions.forEach(function (literalExpression) {
                var regexp = new RegExp(lodash.escapeRegExp(literalExpression), 'g');
                expression = expression.replace(regexp, "rx-" + literalExpression);
            });
            return expression;
        };
        RxExpressionHelperService.prototype.insertExpressions = function (matches, key, expression) {
            if (matches !== null) {
                matches.forEach(function (value) {
                    expression = expression.replace(key, "\"rx-" + value + "\"");
                });
            }
            return expression;
        };
        return RxExpressionHelperService;
    }());
    RxExpressionHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionHelperService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxExpressionHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionHelperService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionHelperService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var RxExpressionSyntaxTreeBuilderService = /** @class */ (function () {
        function RxExpressionSyntaxTreeBuilderService() {
            this.jsep = jsep__namespace;
            this.jsep.addBinaryOp(i1$1.ExpressionOperator.Contains, 7);
            this.jsep.addBinaryOp(i1$1.ExpressionOperator.Like, 7);
            this.jsep.addBinaryOp(i1$1.ExpressionOperator.And, 2);
            this.jsep.addBinaryOp(i1$1.ExpressionOperator.Or, 1);
            this.jsep.addBinaryOp(i1$1.ExpressionOperator.Equal, 6);
            this.jsep.addBinaryOp(i1$1.ExpressionOperator.In, 8);
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
        RxExpressionSyntaxTreeBuilderService.prototype.buildTree = function (expression) {
            return this.jsep(expression);
        };
        return RxExpressionSyntaxTreeBuilderService;
    }());
    RxExpressionSyntaxTreeBuilderService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionSyntaxTreeBuilderService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxExpressionSyntaxTreeBuilderService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionSyntaxTreeBuilderService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionSyntaxTreeBuilderService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var RxDefaultExpressionEvaluatorService = /** @class */ (function () {
        function RxDefaultExpressionEvaluatorService(rxExpressionHelperService, rxStringService, rxExpressionSyntaxTreeBuilderService) {
            var _a;
            this.rxExpressionHelperService = rxExpressionHelperService;
            this.rxStringService = rxStringService;
            this.rxExpressionSyntaxTreeBuilderService = rxExpressionSyntaxTreeBuilderService;
            this.parsedExpressionCache = {};
            this.operators = (_a = {},
                _a[i1$1.ExpressionOperator.Equal] = function (a, b) {
                    if (BigNumber__default["default"].isBigNumber(a)) {
                        return a.isEqualTo(b);
                    }
                    else if (BigNumber__default["default"].isBigNumber(b)) {
                        return b.isEqualTo(a);
                    }
                    else {
                        // tslint:disable-next-line:triple-equals
                        return a == b;
                    }
                },
                _a[i1$1.ExpressionOperator.Add] = function (a, b) {
                    if ((lodash.isNil(a) || lodash.isNaN(a)) && (lodash.isNil(b) || lodash.isNaN(b))) {
                        return null;
                    }
                    else if ((lodash.isNil(a) || lodash.isNaN(a)) && !(lodash.isNil(b) || lodash.isNaN(b))) {
                        return BigNumber__default["default"].isBigNumber(b) ? Number(b) : b;
                    }
                    else if ((lodash.isNil(b) || lodash.isNaN(b)) && !(lodash.isNil(a) || lodash.isNaN(a))) {
                        return BigNumber__default["default"].isBigNumber(a) ? Number(a) : a;
                    }
                    // Have to convert BigNumber values to Number in order to use mathimatical addition as opposed to
                    // string concatenation, which will otherwise happen due to BigNumber.valueOf() returning a string.
                    a = BigNumber__default["default"].isBigNumber(a) ? Number(a) : a;
                    b = BigNumber__default["default"].isBigNumber(b) ? Number(b) : b;
                    return a + b;
                },
                _a[i1$1.ExpressionOperator.Subtract] = function (a, b) {
                    if (lodash.isUndefined(a) || lodash.isNaN(a)) {
                        a = 0;
                    }
                    if (lodash.isUndefined(b) || lodash.isNaN(b)) {
                        b = 0;
                    }
                    return a - b;
                },
                _a[i1$1.ExpressionOperator.Multiply] = function (a, b) {
                    if (lodash.isUndefined(a) || lodash.isNaN(a)) {
                        a = 0;
                    }
                    if (lodash.isUndefined(b) || lodash.isNaN(b)) {
                        b = 0;
                    }
                    return a * b;
                },
                _a[i1$1.ExpressionOperator.Divide] = function (a, b) {
                    if (lodash.isUndefined(a) || lodash.isUndefined(b) || lodash.isNaN(a) || lodash.isNaN(b)) {
                        return 0;
                    }
                    return a / b;
                },
                _a[i1$1.ExpressionOperator.LessThan] = function (a, b) {
                    if (BigNumber__default["default"].isBigNumber(a)) {
                        return a.lt(b);
                    }
                    else if (BigNumber__default["default"].isBigNumber(b)) {
                        return b.gt(a);
                    }
                    else {
                        return a < b;
                    }
                },
                _a[i1$1.ExpressionOperator.GreaterThan] = function (a, b) {
                    if (BigNumber__default["default"].isBigNumber(a)) {
                        return a.gt(b);
                    }
                    else if (BigNumber__default["default"].isBigNumber(b)) {
                        return b.lt(a);
                    }
                    else {
                        return a > b;
                    }
                },
                _a[i1$1.ExpressionOperator.GreaterThanOrEqual] = function (a, b) {
                    if (BigNumber__default["default"].isBigNumber(a)) {
                        return a.gte(b);
                    }
                    else if (BigNumber__default["default"].isBigNumber(b)) {
                        return b.lte(a);
                    }
                    else {
                        return a >= b;
                    }
                },
                _a[i1$1.ExpressionOperator.LessThanOrEqual] = function (a, b) {
                    if (BigNumber__default["default"].isBigNumber(a)) {
                        return a.lte(b);
                    }
                    else if (BigNumber__default["default"].isBigNumber(b)) {
                        return b.gte(a);
                    }
                    else {
                        return a <= b;
                    }
                },
                _a[i1$1.ExpressionOperator.NotEqual] = function (a, b) {
                    if (BigNumber__default["default"].isBigNumber(a)) {
                        return !a.isEqualTo(b);
                    }
                    else if (BigNumber__default["default"].isBigNumber(b)) {
                        return !b.isEqualTo(a);
                    }
                    else {
                        // tslint:disable-next-line:triple-equals
                        return a != b;
                    }
                },
                _a[i1$1.ExpressionOperator.Remainder] = function (a, b) {
                    if (lodash.isUndefined(a) || lodash.isUndefined(b) || lodash.isNaN(a) || lodash.isNaN(b)) {
                        return 0;
                    }
                    return a % b;
                },
                _a[i1$1.ExpressionOperator.And] = this.andHandler,
                _a[i1$1.ExpressionOperator.And.toLowerCase()] = this.andHandler,
                _a[i1$1.ExpressionOperator.Or] = this.orHandler,
                _a[i1$1.ExpressionOperator.Or.toLowerCase()] = this.orHandler,
                _a[i1$1.ExpressionOperator.Like] = this.likeHandler,
                _a[i1$1.ExpressionOperator.Like.toLowerCase()] = this.likeHandler,
                _a[i1$1.ExpressionOperator.Contains] = this.likeHandler,
                _a[i1$1.ExpressionOperator.Contains.toLowerCase()] = this.likeHandler,
                _a);
            this.unaryOperators = {
                '-': function (value) {
                    if (lodash.isUndefined(value) || lodash.isNaN(value)) {
                        return 0;
                    }
                    else {
                        return -Number(value);
                    }
                },
                '!': function (value) { return !Boolean(value); }
            };
        }
        RxDefaultExpressionEvaluatorService.prototype.parseExpression = function (expression) {
            if (!this.parsedExpressionCache[expression]) {
                var parsedExpression = this.rxExpressionSyntaxTreeBuilderService.buildTree(expression);
                if (this.validateChildNodeTypes(parsedExpression)) {
                    this.parsedExpressionCache[expression] = parsedExpression;
                }
                else {
                    throw new Error('Invalid syntax');
                }
            }
            return this.parsedExpressionCache[expression];
        };
        RxDefaultExpressionEvaluatorService.prototype.evaluate = function (expression, data) {
            var evaluatedExpression = expression;
            expression = lodash.trim(expression);
            if (this.rxStringService.isNonEmptyString(expression)) {
                var preparedExpression = this.rxExpressionHelperService.prepare(expression);
                var parsedExpression = void 0;
                try {
                    parsedExpression = this.parseExpression(preparedExpression);
                }
                catch (e) {
                    throw new Error("Cannot parse expression \"" + expression + "\": " + e.message + ".");
                }
                try {
                    evaluatedExpression = this.evaluateNode(parsedExpression, data || {});
                }
                catch (e) {
                    throw new Error("Cannot evaluate expression \"" + expression + "\": " + e.message + ".");
                }
            }
            else {
                evaluatedExpression = null;
            }
            return evaluatedExpression;
        };
        RxDefaultExpressionEvaluatorService.prototype.andHandler = function (a, b) {
            return Boolean(a) && Boolean(b);
        };
        RxDefaultExpressionEvaluatorService.prototype.orHandler = function (a, b) {
            return Boolean(a) || Boolean(b);
        };
        RxDefaultExpressionEvaluatorService.prototype.likeHandler = function (a, b) {
            return lodash.includes(a, b);
        };
        RxDefaultExpressionEvaluatorService.prototype.validateChildNodeTypes = function (node) {
            var _this = this;
            var isValid = false;
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
                    var functionNode = node;
                    var functionDescriptor = lodash.find(RX_EXPRESSION_FUNCTIONS, { name: functionNode.callee['name'] });
                    if (functionDescriptor && functionNode.arguments.length === functionDescriptor.parameters.length) {
                        isValid = lodash.every(functionNode.arguments, function (argument) { return _this.validateChildNodeTypes(argument); });
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
        };
        RxDefaultExpressionEvaluatorService.prototype.evaluateNode = function (node, data) {
            var _this = this;
            switch (node.type) {
                case 'BinaryExpression':
                    var left = this.evaluateNode(node.left, data);
                    var right = this.evaluateNode(node.right, data);
                    if (this.operators[node.operator]) {
                        var binaryResult = this.operators[node.operator](left, right);
                        if (lodash.isNaN(binaryResult)) {
                            throw new Error("Operator: " + node.operator + " has invalid arguments: " + left + ", " + right);
                        }
                        else {
                            return binaryResult;
                        }
                    }
                    else {
                        throw new Error("Unknown binary operator: " + node.operator);
                    }
                case 'CallExpression':
                    var evaluatedArguments = [];
                    var functionName = node.callee['name'];
                    evaluatedArguments = node.arguments.map(function (argument) { return _this.evaluateNode(argument, data); });
                    if (RX_SUPPORTED_FUNCTION[functionName]) {
                        return RX_SUPPORTED_FUNCTION[functionName].apply(RX_SUPPORTED_FUNCTION, __spreadArray([], __read(evaluatedArguments)));
                    }
                    else {
                        throw new Error("Unknown function: " + functionName);
                    }
                case 'Literal':
                    var nodeValue_1 = node.value;
                    if (lodash.isString(nodeValue_1)) {
                        if (/^rx-\${[^{}$]+}$/.test(nodeValue_1)) {
                            nodeValue_1 = lodash.result(data, nodeValue_1.slice(5, -1));
                        }
                        else {
                            var expressions = nodeValue_1.match(/(rx-\${[^{}$]+})/g);
                            lodash.forEach(expressions, function (expression) {
                                var value = lodash.result(data, expression.slice(5, -1));
                                nodeValue_1 = nodeValue_1.replace(expression, lodash.isNil(value) ? '' : value);
                            });
                        }
                    }
                    return nodeValue_1;
                case 'UnaryExpression':
                    if (this.unaryOperators[node.operator]) {
                        var evaluatedResult = this.evaluateNode(node.argument, data);
                        var unaryResult = this.unaryOperators[node.operator](evaluatedResult);
                        if (lodash.isNaN(unaryResult)) {
                            throw new Error("Operator: " + node.operator + " has invalid argument: " + evaluatedResult);
                        }
                        else {
                            return unaryResult;
                        }
                    }
                    else {
                        throw new Error("Unknown unary operator: " + node.operator);
                    }
                default:
                    throw new Error('Invalid syntax');
            }
        };
        return RxDefaultExpressionEvaluatorService;
    }());
    RxDefaultExpressionEvaluatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefaultExpressionEvaluatorService, deps: [{ token: RxExpressionHelperService }, { token: i4__namespace.RxStringService }, { token: RxExpressionSyntaxTreeBuilderService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefaultExpressionEvaluatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefaultExpressionEvaluatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefaultExpressionEvaluatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxExpressionHelperService }, { type: i4__namespace.RxStringService }, { type: RxExpressionSyntaxTreeBuilderService }]; } });

    var RxDefaultExpressionValidatorService = /** @class */ (function () {
        function RxDefaultExpressionValidatorService(rxStringService, rxDefaultExpressionEvaluatorService, rxExpressionHelperService) {
            this.rxStringService = rxStringService;
            this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
            this.rxExpressionHelperService = rxExpressionHelperService;
        }
        RxDefaultExpressionValidatorService.prototype.isValid = function (expression, customEvaluatorService) {
            var evaluator = customEvaluatorService || this.rxDefaultExpressionEvaluatorService;
            var valid = true;
            if (this.rxStringService.isNonEmptyString(expression) && lodash.isFunction(evaluator.parseExpression)) {
                var preparedExpression = this.rxExpressionHelperService.prepare(expression);
                try {
                    evaluator.parseExpression(preparedExpression);
                }
                catch (e) {
                    valid = false;
                }
            }
            return valid;
        };
        return RxDefaultExpressionValidatorService;
    }());
    RxDefaultExpressionValidatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefaultExpressionValidatorService, deps: [{ token: i4__namespace.RxStringService }, { token: RxDefaultExpressionEvaluatorService }, { token: RxExpressionHelperService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefaultExpressionValidatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefaultExpressionValidatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefaultExpressionValidatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace.RxStringService }, { type: RxDefaultExpressionEvaluatorService }, { type: RxExpressionHelperService }]; } });

    var RxExpressionEvaluatorService = /** @class */ (function () {
        function RxExpressionEvaluatorService(injector, rxLogService, rxDefaultExpressionEvaluatorService, rxDefaultExpressionValidatorService, rxNotificationService) {
            this.injector = injector;
            this.rxLogService = rxLogService;
            this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
            this.rxDefaultExpressionValidatorService = rxDefaultExpressionValidatorService;
            this.rxNotificationService = rxNotificationService;
        }
        RxExpressionEvaluatorService.prototype.evaluate = function (expression, data, customEvaluatorService) {
            var evaluator = customEvaluatorService || this.rxDefaultExpressionEvaluatorService;
            var evaluatedExpression = evaluator.evaluate(expression, data);
            this.rxLogService.debug("EVALUATED EXPRESSION " + expression + ": " + evaluatedExpression);
            return evaluatedExpression;
        };
        RxExpressionEvaluatorService.prototype.tryEvaluate = function (expression, data, customEvaluatorService, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            var result = defaultValue;
            try {
                result = this.evaluate(expression, data, customEvaluatorService);
            }
            catch (error) {
                this.rxNotificationService.addErrorMessage(error.message);
            }
            return result;
        };
        RxExpressionEvaluatorService.prototype.isValid = function (expression, customEvaluatorService) {
            return this.rxDefaultExpressionValidatorService.isValid(expression, customEvaluatorService);
        };
        return RxExpressionEvaluatorService;
    }());
    RxExpressionEvaluatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionEvaluatorService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$1.RxLogService }, { token: RxDefaultExpressionEvaluatorService }, { token: RxDefaultExpressionValidatorService }, { token: i1__namespace$1.RxNotificationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxExpressionEvaluatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionEvaluatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionEvaluatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$1.RxLogService }, { type: RxDefaultExpressionEvaluatorService }, { type: RxDefaultExpressionValidatorService }, { type: i1__namespace$1.RxNotificationService }]; } });

    var RX_EXPRESSION_EVALUATOR = {
        operands: {
            null: '$NULL$',
            undefined: '$UNDEFINED$'
        },
        associatedFieldIdPrefixPattern: 'recordContext\\._associations\\.([^\\.]+)\\.(\\w+)\\[0]\\.'
    };

    var RxRecordQueryExpressionEvaluatorService = /** @class */ (function () {
        function RxRecordQueryExpressionEvaluatorService(rxDefaultExpressionEvaluatorService, rxExpressionHelper, rxStringService, rxRecordInstanceUtilsService) {
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
        RxRecordQueryExpressionEvaluatorService.prototype.evaluate = function (expression, data) {
            var _this = this;
            this.rxOperatorCounter = 0;
            this.rxViewExpressionCounter = 0;
            this.rxStringExpressionCounter = 0;
            this.rxAssociationFilterExpressionCounter = 0;
            var evaluatedExpression = null;
            if (!this.rxStringService.isEmptySafe(expression)) {
                // Replace strings in double quotes with RX_STRING_EXPRESSION token, e.g.
                // "text ${view.foo}" = ${view.bar}"text ""text in quotes"" text" ->
                // RX_EXPRESSION_STRING = ${view.bar}RX_EXPRESSION_STRING
                this.rxStringsExpressionData = this.rxExpressionHelper.extractTokens(this.stringMatchingRegExp, i1$1.ExpressionParserToken.RxStringExpression, expression);
                // Replace RX association filter expressions with RX_ASSOCIATION_FILTER_EXPRESSION token, e.g.
                // '7' = '${recordContext._associations...}' -> '7' = RX_ASSOCIATION_FILTER_EXPRESSION
                this.arRecordAssociationFilterExpressionData = this.rxExpressionHelper.extractTokens(this.associationExpressionRegExp, 'RX_ASSOCIATION_FILTER_EXPRESSION', this.rxStringsExpressionData.expression);
                // Replace RX view expressions with RX_VIEW_EXPRESSION token, e.g
                // ${view.foo} = ${view.bar} -> RX_VIEW_EXPRESSION = RX_VIEW_EXPRESSION
                this.rxExpressionsData = this.rxExpressionHelper.extractTokens(this.viewRegExp, 'RX_VIEW_EXPRESSION', this.arRecordAssociationFilterExpressionData.expression);
                // Prepare operators, e.g
                // RX_VIEW_EXPRESSION = NOTRX_VIEW_EXPRESSION -> RX_VIEW_EXPRESSION = !RX_VIEW_EXPRESSION
                this.rxExpressionHelper.prepareOperators(this.rxExpressionsData.expression);
                var rxOperatorsData_1 = this.rxExpressionHelper.extractTokens(/(\s+(AND|OR)\s+)|(\s*(\(|\))\s*)/g, i1$1.ExpressionParserToken.RxOperator, this.rxExpressionsData.expression);
                evaluatedExpression = lodash.map(rxOperatorsData_1.expression.split(i1$1.ExpressionParserToken.RxOperator), function (operand) {
                    var likeExpressionMatch = /(.*)\s+LIKE\s+(.*)/g.exec(operand);
                    // does operand use the LIKE operator?
                    if (likeExpressionMatch) {
                        var leftOperandValue = _this.evaluateOperand(likeExpressionMatch[1], data), rightOperandValue = "\"" + _this.evaluateOperand(likeExpressionMatch[2], data, true) + "\"";
                        return leftOperandValue + " LIKE " + rightOperandValue;
                    }
                    else {
                        return _this.evaluateOperand(operand, data);
                    }
                })
                    .join(i1$1.ExpressionParserToken.RxOperator)
                    .replace(new RegExp("" + i1$1.ExpressionParserToken.RxOperator, 'g'), function () { return rxOperatorsData_1.matches[_this.rxOperatorCounter++]; });
            }
            return evaluatedExpression;
        };
        // Evaluate operand by replacing expression tokens with evaluated values.
        // e.g
        // RX_EXPRESSION = RX_EXPRESSION_STRING ->
        // "${view.foo}" = "text ${view.bar}" ->
        // "Foo" LIKE "text Bar"
        // or
        // RX_ASSOCIATION_FILTER_EXPRESSION LIKE %RX_STRING_EXPRESSION% ->
        // '${recordContext.associations...}' LIKE %"some ${view.textFieldValue}"% ->
        // ${recordContext.associations...} LIKE "%some text "" with \% escaped \_ wildcards%"
        RxRecordQueryExpressionEvaluatorService.prototype.evaluateOperand = function (operand, data, isLikeOperand) {
            if (isLikeOperand === void 0) { isLikeOperand = false; }
            return lodash.reduce([
                this.evaluateRxViewExpressions.bind(this),
                this.evaluateRxStringExpressions.bind(this),
                this.prepareRxAssociationFilterExpressions.bind(this)
            ], function (expression, evaluator) { return evaluator(expression, data, isLikeOperand); }, operand);
        };
        RxRecordQueryExpressionEvaluatorService.prototype.evaluateRxViewExpressions = function (operand, data, isLikeOperand) {
            var _this = this;
            if (isLikeOperand === void 0) { isLikeOperand = false; }
            return operand.replace(/RX_VIEW_EXPRESSION/g, function () {
                return _this.rxExpressionsData.matches[_this.rxViewExpressionCounter++].replace(_this.viewRegExp, function (match, submatch) {
                    var value = lodash.result(data, submatch);
                    if (lodash.isUndefined(value)) {
                        return RX_EXPRESSION_EVALUATOR.operands.undefined;
                    }
                    else if (lodash.isNull(value) || value === '') {
                        return isLikeOperand ? '' : RX_EXPRESSION_EVALUATOR.operands.null;
                    }
                    else if (lodash.isString(value)) {
                        value = isLikeOperand
                            ? _this.rxRecordInstanceUtilsService.escapeTextWildcards(value)
                            : value.replace(/"/g, '""');
                    }
                    return isLikeOperand ? value : "\"" + value + "\"";
                });
            });
        };
        RxRecordQueryExpressionEvaluatorService.prototype.evaluateRxStringExpressions = function (operand, data, isLikeOperand) {
            var _this = this;
            if (isLikeOperand === void 0) { isLikeOperand = false; }
            return operand.replace(new RegExp("" + i1$1.ExpressionParserToken.RxStringExpression, 'g'), function () {
                var stringExpression = _this.rxStringsExpressionData.matches[_this.rxStringExpressionCounter++];
                if (isLikeOperand) {
                    stringExpression = stringExpression.replace(_this.stringMatchingRegExp, '$1');
                }
                stringExpression = stringExpression.replace(_this.viewRegExp, function (match, submatch) {
                    var value = lodash.result(data, submatch);
                    if (lodash.isNil(value)) {
                        return '';
                    }
                    else if (isLikeOperand && lodash.isString(value)) {
                        return _this.rxRecordInstanceUtilsService.escapeTextWildcards(value);
                    }
                    return value;
                });
                if (lodash.isEmpty(stringExpression) && !isLikeOperand) {
                    stringExpression = RX_EXPRESSION_EVALUATOR.operands.null;
                }
                return stringExpression;
            });
        };
        RxRecordQueryExpressionEvaluatorService.prototype.prepareRxAssociationFilterExpressions = function (operand) {
            var _this = this;
            return operand.replace(/RX_ASSOCIATION_FILTER_EXPRESSION/g, function () { return _this.arRecordAssociationFilterExpressionData.matches[_this.rxAssociationFilterExpressionCounter++].replace(_this.associationExpressionRegExp, function (match, firstQuote, associationExpression, lastQuote) { return associationExpression; }); });
        };
        return RxRecordQueryExpressionEvaluatorService;
    }());
    RxRecordQueryExpressionEvaluatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordQueryExpressionEvaluatorService, deps: [{ token: RxDefaultExpressionEvaluatorService }, { token: RxExpressionHelperService }, { token: i4__namespace.RxStringService }, { token: i4__namespace$1.RxRecordInstanceUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordQueryExpressionEvaluatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordQueryExpressionEvaluatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordQueryExpressionEvaluatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxDefaultExpressionEvaluatorService }, { type: RxExpressionHelperService }, { type: i4__namespace.RxStringService }, { type: i4__namespace$1.RxRecordInstanceUtilsService }]; } });

    var RX_LEGACY_ICONS = {
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

    var RxViewComponentRegistryService = /** @class */ (function () {
        function RxViewComponentRegistryService(componentFactoryResolver, rxGlobalCacheService, rxBundleCacheService, rxStringService, rxLogService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxStringService = rxStringService;
            this.rxLogService = rxLogService;
            // contains all registered component descriptors
            this.componentDescriptors = new Map();
            this.asyncComponentDescriptors = [];
            this.ownerBundleIds$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.reduce(function (ownerBundleIds, bundleDescriptor) {
                var _a;
                (_a = bundleDescriptor.uiOptions.viewComponents) === null || _a === void 0 ? void 0 : _a.forEach(function (viewComponentName) {
                    ownerBundleIds[viewComponentName] = bundleDescriptor.id;
                });
                return ownerBundleIds;
            }, {}); }), operators.shareReplay(1));
        }
        RxViewComponentRegistryService.prototype.resolveAsyncDescriptors = function () {
            var _this = this;
            if (this.asyncComponentDescriptors.length) {
                this.rxLogService.debug("Resolving " + this.asyncComponentDescriptors.length + " view component descriptor(s)...");
                return rxjs.defer(function () { return rxjs.from(Promise.all(_this.asyncComponentDescriptors).then(function (descriptors) {
                    descriptors.forEach(function (descriptor) {
                        _this.registerSync(descriptor);
                    });
                    _this.rxLogService.debug("Resolved " + descriptors.length + " view component descriptors: " + descriptors
                        .map(function (desc) { return desc.type; })
                        .join(', ') + ".");
                    return _this.componentDescriptors;
                })); });
            }
            else {
                return rxjs.of(this.componentDescriptors);
            }
        };
        RxViewComponentRegistryService.prototype.getRegisteredComponents = function () {
            return this.componentDescriptors;
        };
        RxViewComponentRegistryService.prototype.get = function (type) {
            return this.componentDescriptors.get(type);
        };
        RxViewComponentRegistryService.prototype.register = function () {
            var _this = this;
            var componentDescriptors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                componentDescriptors[_i] = arguments[_i];
            }
            componentDescriptors.forEach(function (descriptor) {
                _this.asyncComponentDescriptors.push(Promise.resolve(descriptor));
            });
        };
        RxViewComponentRegistryService.prototype.registerSync = function (descriptor) {
            var _this = this;
            var _a, _b;
            if ((_a = descriptor.aliases) === null || _a === void 0 ? void 0 : _a.includes(descriptor.type)) {
                this.rxLogService.warning("Component " + descriptor.type + " should not have its type listed in descriptor's aliases property.");
                descriptor.aliases = descriptor.aliases.filter(function (type) { return type !== descriptor.type; });
            }
            this.componentDescriptors.set(descriptor.type, descriptor);
            (_b = descriptor.aliases) === null || _b === void 0 ? void 0 : _b.forEach(function (type) {
                _this.componentDescriptors.set(type, descriptor);
            });
        };
        RxViewComponentRegistryService.prototype.isDataComponentDescriptor = function (componentDescriptor) {
            return Boolean(componentDescriptor.isDataComponent);
        };
        RxViewComponentRegistryService.prototype.getBundlePageComponents = function (bundleId, includeAliases) {
            var _this = this;
            if (includeAliases === void 0) { includeAliases = false; }
            return this.getDescriptors(includeAliases).filter(function (componentDescriptor) { return componentDescriptor.isPageComponent && lodash.isEmpty(componentDescriptor.availableInBundles)
                ? componentDescriptor.bundleId === bundleId
                : _this.rxStringService.isIncluded(bundleId, componentDescriptor.availableInBundles); });
        };
        RxViewComponentRegistryService.prototype.getLicensedComponents = function (includeAliases) {
            var _this = this;
            if (includeAliases === void 0) { includeAliases = false; }
            return this.rxGlobalCacheService
                .getLicensedBundleDescriptors()
                .pipe(operators.map(function (bundleDescriptors) { return _this.getDescriptors(includeAliases).filter(function (componentDescriptor) { return _this.isBundleLicensed(componentDescriptor.bundleId, bundleDescriptors) &&
                _this.isComponentAvailableInCurrentBundle(componentDescriptor); }); }));
        };
        RxViewComponentRegistryService.prototype.getComponentOwnerBundleId = function (viewComponentType) {
            return this.ownerBundleIds$.pipe(operators.map(function (ownerBundleIds) { return ownerBundleIds[viewComponentType]; }));
        };
        RxViewComponentRegistryService.prototype.isBundleLicensed = function (bundleId, bundleDescriptors) {
            return bundleId === i1$1.RX_APPLICATION.platformBundleId || lodash.some(bundleDescriptors, { id: bundleId });
        };
        RxViewComponentRegistryService.prototype.isComponentAvailableInCurrentBundle = function (componentDescriptor) {
            return (lodash.isEmpty(componentDescriptor.availableInBundles) ||
                this.rxStringService.isIncluded(this.rxBundleCacheService.bundleId, componentDescriptor.availableInBundles));
        };
        RxViewComponentRegistryService.prototype.getDescriptors = function (includeAliases) {
            if (includeAliases === void 0) { includeAliases = false; }
            return __spreadArray([], __read(this.componentDescriptors.entries())).reduce(function (result, _c) {
                var _d = __read(_c, 2), type = _d[0], descriptor = _d[1];
                var _a;
                if (includeAliases || !((_a = descriptor.aliases) === null || _a === void 0 ? void 0 : _a.includes(type))) {
                    result.push(descriptor);
                }
                return result;
            }, []);
        };
        return RxViewComponentRegistryService;
    }());
    RxViewComponentRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewComponentRegistryService, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$1.RxGlobalCacheService }, { token: i1__namespace$1.RxBundleCacheService }, { token: i4__namespace.RxStringService }, { token: i1__namespace$1.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewComponentRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewComponentRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewComponentRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$1.RxGlobalCacheService }, { type: i1__namespace$1.RxBundleCacheService }, { type: i4__namespace.RxStringService }, { type: i1__namespace$1.RxLogService }]; } });

    exports.ViewDefinitionType = void 0;
    (function (ViewDefinitionType) {
        ViewDefinitionType["Regular"] = "REGULAR";
        ViewDefinitionType["Shell"] = "SHELL";
    })(exports.ViewDefinitionType || (exports.ViewDefinitionType = {}));

    var RX_VIEW_DEFINITION = {
        types: {
            regular: exports.ViewDefinitionType.Regular,
            shell: exports.ViewDefinitionType.Shell
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

    exports.RxViewComponentType = void 0;
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
    })(exports.RxViewComponentType || (exports.RxViewComponentType = {}));
    exports.BwfViewComponentType = void 0;
    (function (BwfViewComponentType) {
        BwfViewComponentType["DynamicNamedList"] = "ux-dynamic-named-list";
    })(exports.BwfViewComponentType || (exports.BwfViewComponentType = {}));
    var RxViewComponent = i0["ɵmakeDecorator"]('RxViewComponent');

    exports.ViewLayoutRole = void 0;
    (function (ViewLayoutRole) {
        ViewLayoutRole["Header"] = "header";
        ViewLayoutRole["Content"] = "content";
        ViewLayoutRole["Footer"] = "footer";
    })(exports.ViewLayoutRole || (exports.ViewLayoutRole = {}));
    exports.LayoutTypes = void 0;
    (function (LayoutTypes) {
        LayoutTypes["Flexible"] = "Flexible";
        LayoutTypes["Fixed"] = "Fixed";
    })(exports.LayoutTypes || (exports.LayoutTypes = {}));
    var defaultHeaderOutlet = {
        name: exports.ViewLayoutRole.Header,
        height: 60,
        columns: [getEmptyColumn()]
    };
    var defaultFooterOutlet = {
        name: exports.ViewLayoutRole.Footer,
        height: 60,
        columns: [getEmptyColumn()]
    };
    var RX_VIEW_LAYOUTS = [
        {
            id: 1,
            label: 'Header and 1 Column',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet()]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 2,
            label: 'Header and 2 Columns (50/50)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(6, 6)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 3,
            label: 'Header and 2 Columns (60/40)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(7, 5)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 4,
            label: 'Header and 2 Columns (40/60)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(5, 7)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 16,
            label: 'Header and 2 Columns (70/30)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(8, 4)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 5,
            label: 'Container',
            layout: {
                outlets: [getContentOutlet()]
            },
            layoutType: exports.LayoutTypes.Flexible
        },
        {
            id: 6,
            label: '2 Columns (50/50)',
            layout: {
                outlets: [getContentOutlet(6, 6)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 7,
            label: '2 Columns (60/40)',
            layout: {
                outlets: [getContentOutlet(7, 5)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 8,
            label: '2 Columns (40/60)',
            layout: {
                outlets: [getContentOutlet(5, 7)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 14,
            label: '2 Columns (70/30)',
            layout: {
                outlets: [getContentOutlet(8, 4)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 9,
            label: '3 Equal Columns',
            layout: {
                outlets: [getContentOutlet(4, 4, 4)]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 10,
            label: 'Header, Footer and 1 Column',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(), defaultFooterOutlet]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 11,
            label: 'Header, Footer and 2 Columns (50/50)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(6, 6), defaultFooterOutlet]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 12,
            label: 'Header, Footer and 2 Columns (60/40)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(7, 5), defaultFooterOutlet]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 13,
            label: 'Header, Footer and 2 Columns (40/60)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(5, 7), defaultFooterOutlet]
            },
            layoutType: exports.LayoutTypes.Fixed
        },
        {
            id: 15,
            label: 'Header, Footer and 2 Columns (70/30)',
            layout: {
                outlets: [defaultHeaderOutlet, getContentOutlet(8, 4), defaultFooterOutlet]
            },
            layoutType: exports.LayoutTypes.Fixed
        }
    ].map(function (layout) {
        layout.checksum = getLayoutChecksum(layout.layout);
        return layout;
    });
    function getLayoutChecksum(layout) {
        var contentOutlet = layout.outlets.find(function (outlet) { return outlet.name === RX_VIEW_DEFINITION.defaultOutletName; });
        var checksum = layout.outlets.find(function (outlet) { return outlet.name === exports.ViewLayoutRole.Header; }) ? 'h' : '';
        checksum += layout.outlets.find(function (outlet) { return outlet.name === exports.ViewLayoutRole.Footer; }) ? 'f' : '';
        contentOutlet.columns.forEach(function (column) { return (checksum += "c" + (column.span || 12)); });
        return checksum;
    }
    function getContentOutlet() {
        var columnSpan = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columnSpan[_i] = arguments[_i];
        }
        return {
            name: RX_VIEW_DEFINITION.defaultOutletName,
            columns: columnSpan.length ? columnSpan.map(function (span) { return getEmptyColumn({ span: span }); }) : [getEmptyColumn()]
        };
    }
    function getEmptyColumn(props) {
        return Object.assign({ children: [] }, props);
    }

    // @dynamic
    var RxViewLayout = /** @class */ (function () {
        function RxViewLayout() {
        }
        RxViewLayout.getViewLayoutForDefaultOutlet = function (children) {
            return {
                outlets: [this.getOutlet(RX_VIEW_DEFINITION.defaultOutletName, children)]
            };
        };
        RxViewLayout.getEmptyViewLayoutForOutletNames = function (list) {
            var _this = this;
            return {
                outlets: list.map(function (_a) {
                    var name = _a.name;
                    return _this.getOutlet(name);
                })
            };
        };
        RxViewLayout.getEmptyViewLayoutForOutlets = function (outlets) {
            return {
                outlets: outlets.map(function (outlet) {
                    return Object.assign(Object.assign({}, outlet), { columns: outlet.columns.map(function (column) { return (Object.assign(Object.assign({}, column), { children: [] })); }) });
                })
            };
        };
        RxViewLayout.getOutlet = function (name, children) {
            if (name === void 0) { name = RX_VIEW_DEFINITION.defaultOutletName; }
            if (children === void 0) { children = []; }
            return {
                name: name,
                columns: [
                    {
                        children: children
                    }
                ]
            };
        };
        RxViewLayout.getViewLayoutChildGuids = function (layout, outletName) {
            return lodash.reduce(layout.outlets, function (guids, outlet) {
                if (!outletName || outletName === outlet.name) {
                    outlet.columns.forEach(function (column) {
                        guids.push.apply(guids, __spreadArray([], __read(column.children)));
                    });
                }
                return guids;
            }, []);
        };
        RxViewLayout.hasChild = function (layout, guid) {
            var _this = this;
            return Boolean(layout.outlets.find(function (outlet) { return _this.outletHasChild(outlet, guid); }));
        };
        RxViewLayout.outletHasChild = function (outlet, guid) {
            return Boolean(outlet.columns.find(function (column) { return column.children.includes(guid); }));
        };
        RxViewLayout.getViewLayoutTemplate = function (layoutTemplate) {
            var layoutItem = RX_VIEW_LAYOUTS.find(function (item) { return item.id === layoutTemplate; }) ||
                RX_VIEW_LAYOUTS.find(function (item) { return item.id === RX_VIEW_DEFINITION.defaultLayoutTemplateId; });
            return layoutItem.layout;
        };
        RxViewLayout.getLayoutName = function (layout) {
            var checksum = getLayoutChecksum(layout);
            var layoutTemplate = RX_VIEW_LAYOUTS.find(function (item) { return item.checksum === checksum; });
            return layoutTemplate ? layoutTemplate.label : '';
        };
        RxViewLayout.removeChildFromLayout = function (layout, guidToRemove) {
            return {
                outlets: layout.outlets.map(function (outlet) { return (Object.assign(Object.assign({}, outlet), { columns: outlet.columns.map(function (column) { return (Object.assign(Object.assign({}, column), { children: column.children.filter(function (childGuid) { return childGuid !== guidToRemove; }) })); }) })); })
            };
        };
        return RxViewLayout;
    }());

    var RxViewDefinitionParserService = /** @class */ (function () {
        function RxViewDefinitionParserService(rxTreeService) {
            this.rxTreeService = rxTreeService;
        }
        RxViewDefinitionParserService.prototype.getComponents = function (definition, skipInitial) {
            if (skipInitial === void 0) { skipInitial = false; }
            var components = [];
            if (!skipInitial) {
                components.push({
                    componentDefinition: definition,
                    parentComponentDefinition: null
                });
            }
            this.processComponents(definition.componentDefinitions, components, definition);
            return components;
        };
        RxViewDefinitionParserService.prototype.processComponents = function (componentDefinitions, components, parentComponentDefinition) {
            var _this = this;
            componentDefinitions.forEach(function (componentDefinition) {
                components.push({ componentDefinition: componentDefinition, parentComponentDefinition: parentComponentDefinition });
                if (_this.isContainerViewComponentDefinition(componentDefinition)) {
                    _this.processComponents(componentDefinition.componentDefinitions, components, componentDefinition);
                }
            });
        };
        RxViewDefinitionParserService.prototype.isContainerViewComponentDefinition = function (componentDefinition) {
            return componentDefinition.componentDefinitions !== undefined;
        };
        RxViewDefinitionParserService.prototype.findParentComponentDefinition = function (viewDefinition, childComponentDefinition, predicate) {
            var componentDefinitionsWithParent = this.getComponents(viewDefinition);
            var parentComponentDefinition;
            var childComponentDefinitionWithParent = componentDefinitionsWithParent.find(function (pair) { return pair.componentDefinition.guid === childComponentDefinition.guid; });
            while (childComponentDefinitionWithParent && !parentComponentDefinition) {
                if (predicate(childComponentDefinitionWithParent.componentDefinition)) {
                    parentComponentDefinition = childComponentDefinitionWithParent.componentDefinition;
                }
                else {
                    childComponentDefinitionWithParent = componentDefinitionsWithParent.find(function (pair) { return pair.componentDefinition.guid === childComponentDefinitionWithParent.parentComponentDefinition.guid; });
                }
            }
            return parentComponentDefinition;
        };
        RxViewDefinitionParserService.prototype.findViewComponent = function (viewComponentContainer, predicate) {
            return lodash.find(this.rxTreeService.flattenTree(viewComponentContainer, 'componentDefinitions'), predicate);
        };
        return RxViewDefinitionParserService;
    }());
    RxViewDefinitionParserService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionParserService, deps: [{ token: i4__namespace.RxTreeService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionParserService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionParserService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionParserService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace.RxTreeService }]; } });

    var RxViewActionRegistryService = /** @class */ (function () {
        function RxViewActionRegistryService(rxGlobalCacheService, rxStringService, rxBundleCacheService) {
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxStringService = rxStringService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.viewActionDescriptors = new Map();
            this.designManagers = new Map();
            this.ownerBundleIds$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.reduce(function (ownerBundleIds, bundleDescriptor) {
                var _a;
                (_a = bundleDescriptor.uiOptions.viewActions) === null || _a === void 0 ? void 0 : _a.forEach(function (viewActionName) {
                    ownerBundleIds[viewActionName] = bundleDescriptor.id;
                });
                return ownerBundleIds;
            }, {}); }), operators.shareReplay(1));
        }
        RxViewActionRegistryService.prototype.register = function (viewActionDescriptor) {
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
                designType: exports.ViewComponentPropertyType.Number
            });
            this.viewActionDescriptors.set(viewActionDescriptor.name, viewActionDescriptor);
        };
        RxViewActionRegistryService.prototype.get = function (actionName) {
            return this.viewActionDescriptors.get(actionName);
        };
        RxViewActionRegistryService.prototype.getRegisteredActions = function () {
            return this.viewActionDescriptors;
        };
        RxViewActionRegistryService.prototype.getLicensedActions = function () {
            var _this = this;
            return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(operators.map(function (bundleDescriptors) {
                return Array.from(_this.viewActionDescriptors.values()).filter(function (actionDescriptor) {
                    return (_this.isBundleLicensed(actionDescriptor.bundleId, bundleDescriptors) &&
                        _this.isActionAvailableInCurrentBundle(actionDescriptor));
                });
            }));
        };
        RxViewActionRegistryService.prototype.getActionOwnerBundleId = function (viewActionName) {
            return this.ownerBundleIds$.pipe(operators.map(function (ownerBundleIds) { return ownerBundleIds[viewActionName]; }));
        };
        RxViewActionRegistryService.prototype.isBundleLicensed = function (bundleId, bundleDescriptors) {
            return bundleId === i1$1.RX_APPLICATION.platformBundleId || lodash.some(bundleDescriptors, { id: bundleId });
        };
        RxViewActionRegistryService.prototype.isActionAvailableInCurrentBundle = function (actionDescriptor) {
            return (lodash.isEmpty(actionDescriptor.availableInBundles) ||
                this.rxStringService.isIncluded(this.rxBundleCacheService.bundleId, actionDescriptor.availableInBundles));
        };
        RxViewActionRegistryService.prototype.registerUnknownAction = function (unknownActionName) {
            var unknownActionDescriptor = this.get(unknownActionName);
            if (!unknownActionDescriptor) {
                unknownActionDescriptor = Object.assign(Object.assign({}, this.get('rxUnknownViewAction')), { name: unknownActionName });
                this.register(unknownActionDescriptor);
            }
            return unknownActionDescriptor;
        };
        RxViewActionRegistryService.prototype.registerDesignManager = function (actionName, designManagerService) {
            this.designManagers.set(actionName, designManagerService);
        };
        RxViewActionRegistryService.prototype.getDesignManager = function (actionName) {
            var _a, _b;
            return (_a = this.designManagers.get(actionName)) !== null && _a !== void 0 ? _a : (_b = this.viewActionDescriptors.get(actionName)) === null || _b === void 0 ? void 0 : _b.designManager;
        };
        return RxViewActionRegistryService;
    }());
    RxViewActionRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionRegistryService, deps: [{ token: i1__namespace$1.RxGlobalCacheService }, { token: i4__namespace.RxStringService }, { token: i1__namespace$1.RxBundleCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewActionRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxGlobalCacheService }, { type: i4__namespace.RxStringService }, { type: i1__namespace$1.RxBundleCacheService }]; } });

    var RxViewDefinitionLocalizationService = /** @class */ (function () {
        function RxViewDefinitionLocalizationService(rxViewDefinitionParserService, rxViewComponentRegistryService, rxViewActionRegistryService, rxGuidService, rxTreeService) {
            this.rxViewDefinitionParserService = rxViewDefinitionParserService;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxGuidService = rxGuidService;
            this.rxTreeService = rxTreeService;
        }
        RxViewDefinitionLocalizationService.prototype.applyLocalization = function (viewDefinition) {
            var _this = this;
            var componentDefinitions = this.rxTreeService.flatten(viewDefinition, 'componentDefinitions');
            var localizableStringGuidsByComponentGuid = {};
            // converting Select Group localization for AngularJS views
            // todo can be removed after dropping support of AngularJS version
            this.convertOldSelectGroupLocalization(viewDefinition, componentDefinitions);
            componentDefinitions.forEach(function (componentDefinition) {
                var localizableStrings = viewDefinition.localizableStringsByComponentId[componentDefinition.guid];
                var propertyNameToStringGuidMap = _this.applyComponentDefinitionLocalization(componentDefinition, localizableStrings);
                if (!lodash.isEmpty(propertyNameToStringGuidMap)) {
                    localizableStringGuidsByComponentGuid[componentDefinition.guid] = propertyNameToStringGuidMap;
                }
            });
            viewDefinition.localizablePropertyToStringGuidMap = localizableStringGuidsByComponentGuid;
            return viewDefinition;
        };
        RxViewDefinitionLocalizationService.prototype.extractLocalizableStrings = function (viewDefinition) {
            var _this = this;
            var localizableStrings = {};
            var localizablePropertyToStringGuidMap = viewDefinition.localizablePropertyToStringGuidMap || {};
            this.rxViewDefinitionParserService
                .getComponents(viewDefinition, true)
                .map(function (item) { return item.componentDefinition; })
                .filter(function (component) { return component.type && component.type !== exports.RxViewComponentType.Page; })
                .forEach(function (component) {
                var componentDescriptor = _this.rxViewComponentRegistryService.get(component.type);
                var propertyNameToStringGuidMap = localizablePropertyToStringGuidMap[component.guid] || {};
                var componentStrings = {};
                var localizablePropertyNames;
                if (componentDescriptor.type === exports.RxViewComponentType.Action) {
                    var actionDescriptor = _this.rxViewActionRegistryService.get(component.propertiesByName.name);
                    localizablePropertyNames = _this.getLocalizableActionParameterNames(actionDescriptor);
                }
                else {
                    localizablePropertyNames = _this.getLocalizableComponentPropertyNames(componentDescriptor);
                }
                localizablePropertyNames.forEach(function (localizablePropertyName) {
                    if (component.propertiesByName[localizablePropertyName]) {
                        var stringGuid = propertyNameToStringGuidMap[localizablePropertyName] || _this.rxGuidService.generate();
                        componentStrings[stringGuid] = component.propertiesByName[localizablePropertyName];
                        component.propertiesByName[localizablePropertyName] = stringGuid;
                    }
                });
                if (!lodash.isEmpty(componentStrings)) {
                    localizableStrings[component.guid] = componentStrings;
                }
            });
            return localizableStrings;
        };
        RxViewDefinitionLocalizationService.prototype.applyComponentDefinitionLocalization = function (componentDefinition, localizableStrings) {
            if (localizableStrings === void 0) { localizableStrings = {}; }
            return lodash.transform(componentDefinition.propertiesByName, function (result, propertyValue, propertyName) {
                if (localizableStrings[propertyValue]) {
                    componentDefinition.propertiesByName[propertyName] = localizableStrings[propertyValue];
                    result[propertyName] = propertyValue;
                }
            }, {});
        };
        RxViewDefinitionLocalizationService.prototype.getLocalizableActionParameterNames = function (actionDescriptor) {
            return (actionDescriptor.parameters || []).reduce(function (parameterNames, parameter) {
                if (parameter.localizable) {
                    parameterNames.push(parameter.name);
                }
                else if (parameter.attributes) {
                    lodash.forEach(parameter.attributes, function (attribute) {
                        if (attribute.localizable) {
                            parameterNames.push(parameter.name + "." + attribute.name);
                        }
                    });
                }
                return parameterNames;
            }, []);
        };
        RxViewDefinitionLocalizationService.prototype.getLocalizableComponentPropertyNames = function (componentDescriptor) {
            return (componentDescriptor.properties || []).filter(function (prop) { return prop.localizable; }).map(function (prop) { return prop.name; });
        };
        // this method used to move SelectGroupField localization from SelectGroup localization object
        // to own one in same way as this done for any other component.
        // Method should handle only AngularJS views that has legacy labelId property in SelectGroupField
        RxViewDefinitionLocalizationService.prototype.convertOldSelectGroupLocalization = function (viewDefinition, componentDefinitions) {
            var _this = this;
            componentDefinitions
                .filter(function (component) { return component.type === exports.RxViewComponentType.SelectGroup; })
                .forEach(function (selectGroup) {
                selectGroup.componentDefinitions.forEach(function (selectGroupField) {
                    if (selectGroupField.propertiesByName.labelId) {
                        var oldStringGuid = selectGroupField.propertiesByName.labelId;
                        var newStringGuid = _this.rxGuidService.generate();
                        var localizedLabel = viewDefinition.localizableStringsByComponentId[selectGroup.guid][oldStringGuid];
                        // setting localized string guid same way as for other components
                        selectGroupField.propertiesByName.label = newStringGuid;
                        // moving localization from SelectGroup to SelectGroupField object with new guid
                        // to avoid unexpected server behaviour
                        lodash.set(viewDefinition.localizableStringsByComponentId, [selectGroupField.guid, newStringGuid], localizedLabel);
                        // removing legacy labelId
                        delete selectGroupField.propertiesByName.labelId;
                        // removing string from select group localization object
                        delete viewDefinition.localizableStringsByComponentId[selectGroup.guid][oldStringGuid];
                    }
                });
                // removing select group localization object if empty
                if (lodash.isEmpty(viewDefinition.localizableStringsByComponentId[selectGroup.guid])) {
                    delete viewDefinition.localizableStringsByComponentId[selectGroup.guid];
                }
            });
        };
        return RxViewDefinitionLocalizationService;
    }());
    RxViewDefinitionLocalizationService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionLocalizationService, deps: [{ token: RxViewDefinitionParserService }, { token: RxViewComponentRegistryService }, { token: RxViewActionRegistryService }, { token: i4__namespace.RxGuidService }, { token: i4__namespace.RxTreeService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionLocalizationService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionLocalizationService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionLocalizationService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxViewDefinitionParserService }, { type: RxViewComponentRegistryService }, { type: RxViewActionRegistryService }, { type: i4__namespace.RxGuidService }, { type: i4__namespace.RxTreeService }]; } });

    var renameViewDefinitionCommand = 'com.bmc.arsys.rx.application.view.command.RenameViewDefinitionCommand';
    var revertCustomizationResourceType = 'com.bmc.arsys.rx.application.view.command.RevertViewDefinitionCommand';
    var RxViewDefinitionService = /** @class */ (function () {
        function RxViewDefinitionService(httpClient, rxGuidService, rxCommandFactoryService, rxViewDefinitionLocalizationService, rxLocalizationService) {
            this.httpClient = httpClient;
            this.rxGuidService = rxGuidService;
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
            this.rxLocalizationService = rxLocalizationService;
            this.renameCommand = rxCommandFactoryService.forResourceType(renameViewDefinitionCommand);
            this.revertCustomizationCommand = rxCommandFactoryService.forResourceType(revertCustomizationResourceType);
        }
        RxViewDefinitionService.prototype.get = function (viewDefinitionName, options) {
            var _this = this;
            var defaultOptions = { params: { locale: this.rxLocalizationService.currentLocale } };
            return this.httpClient
                .get(this.getUrl(viewDefinitionName), Object.assign(Object.assign({}, defaultOptions), options))
                .pipe(operators.map(function (viewDefinition) { return _this.rxViewDefinitionLocalizationService.applyLocalization(viewDefinition); }));
        };
        RxViewDefinitionService.prototype.getNew = function (layoutTemplate) {
            return rxjs.of(this.getNewViewDefinition.call(this, layoutTemplate));
        };
        RxViewDefinitionService.prototype.create = function (viewDefinition) {
            return this.httpClient.post(this.getUrl(), viewDefinition, { responseType: 'text', observe: 'response' });
        };
        RxViewDefinitionService.prototype.update = function (viewDefinitionName, viewDefinition, options) {
            return this.httpClient.put(this.getUrl(viewDefinitionName), viewDefinition, options);
        };
        RxViewDefinitionService.prototype.delete = function (viewDefinitionName) {
            return this.httpClient.delete(this.getUrl(viewDefinitionName));
        };
        RxViewDefinitionService.prototype.rename = function (oldViewDefinitionName, newViewDefinitionName) {
            return this.renameCommand.execute({
                name: oldViewDefinitionName,
                newName: newViewDefinitionName
            });
        };
        RxViewDefinitionService.prototype.isPageView = function (viewDefinition) {
            return (viewDefinition.componentDefinitions.length === 1 &&
                viewDefinition.componentDefinitions[0].type === exports.RxViewComponentType.Page);
        };
        RxViewDefinitionService.prototype.revertCustomization = function (viewDefinitionName) {
            return this.revertCustomizationCommand.execute({ viewDefinitionName: viewDefinitionName });
        };
        RxViewDefinitionService.prototype.getUrl = function (viewDefinitionName) {
            return viewDefinitionName
                ? "/api/rx/application/view/viewdefinition/" + encodeURIComponent(viewDefinitionName)
                : '/api/rx/application/view/viewdefinition';
        };
        RxViewDefinitionService.prototype.getNewViewDefinition = function (layoutTemplate) {
            if (layoutTemplate === void 0) { layoutTemplate = RX_VIEW_DEFINITION.defaultLayoutTemplateId; }
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
                scope: i1$1.RX_BUNDLE.definitionScopeTypes.bundle,
                targetViewDefinitionName: null,
                targetExtensionContainerGuid: null,
                styles: null
            };
        };
        return RxViewDefinitionService;
    }());
    RxViewDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionService, deps: [{ token: i1__namespace$2.HttpClient }, { token: i4__namespace.RxGuidService }, { token: i1__namespace$1.RxCommandFactoryService }, { token: RxViewDefinitionLocalizationService }, { token: i1__namespace$1.RxLocalizationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.HttpClient }, { type: i4__namespace.RxGuidService }, { type: i1__namespace$1.RxCommandFactoryService }, { type: RxViewDefinitionLocalizationService }, { type: i1__namespace$1.RxLocalizationService }]; } });

    var viewDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.view.datapage.ViewDefinitionDataPageQuery';
    var RxViewDefinitionDataPageService = /** @class */ (function (_super) {
        __extends(RxViewDefinitionDataPageService, _super);
        function RxViewDefinitionDataPageService(injector) {
            var _this = _super.call(this, injector, viewDefinitionDataPageQuery, {
                params: {
                    excludeExtensionViews: true
                }
            }) || this;
            _this.injector = injector;
            return _this;
        }
        return RxViewDefinitionDataPageService;
    }(i1$1.DataPage));
    RxViewDefinitionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxViewDefinitionCacheService = /** @class */ (function () {
        function RxViewDefinitionCacheService(rxViewDefinitionService, viewDefinitionDataPageService) {
            this.rxViewDefinitionService = rxViewDefinitionService;
            this.viewDefinitionDataPageService = viewDefinitionDataPageService;
            this.viewDefinitionCache = new Map();
            this.viewDefinitionNamesCache = new Map();
            this.consumers = new Set();
        }
        RxViewDefinitionCacheService.prototype.getViewDefinitionNames = function (bundleId) {
            if (!this.viewDefinitionNamesCache.has(bundleId)) {
                var viewDefinitionNames$ = this.viewDefinitionDataPageService
                    .get({
                    headers: { 'default-bundle-scope': bundleId },
                    params: { propertySelection: ['name'], viewType: 'REGULAR' }
                })
                    .pipe(operators.pluck('data'), operators.map(function (viewDefinitionsNames) { return viewDefinitionsNames.map(function (viewDefinition) { return viewDefinition.name; }); }), operators.shareReplay(1));
                this.viewDefinitionNamesCache.set(bundleId, viewDefinitionNames$);
            }
            return this.viewDefinitionNamesCache.get(bundleId);
        };
        RxViewDefinitionCacheService.prototype.getViewDefinition = function (viewDefinitionName, options) {
            if (!this.viewDefinitionCache.has(viewDefinitionName)) {
                var viewDefinition$ = this.rxViewDefinitionService.get(viewDefinitionName, options).pipe(operators.shareReplay(1));
                this.viewDefinitionCache.set(viewDefinitionName, viewDefinition$);
            }
            return this.viewDefinitionCache.get(viewDefinitionName);
        };
        RxViewDefinitionCacheService.prototype.registerConsumer = function (consumerDestroy$) {
            var _this = this;
            this.consumers.add(consumerDestroy$);
            consumerDestroy$.subscribe(function () {
                _this.consumers.delete(consumerDestroy$);
                if (lodash.isEmpty(_this.consumers)) {
                    _this.clearCache();
                }
            });
        };
        RxViewDefinitionCacheService.prototype.clearCache = function () {
            this.viewDefinitionCache.clear();
            this.viewDefinitionNamesCache.clear();
        };
        return RxViewDefinitionCacheService;
    }());
    RxViewDefinitionCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionCacheService, deps: [{ token: RxViewDefinitionService }, { token: RxViewDefinitionDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxViewDefinitionService }, { type: RxViewDefinitionDataPageService }]; } });

    var ViewModule = /** @class */ (function () {
        function ViewModule() {
        }
        ViewModule.registerComponents = function (components) {
            return {
                ngModule: ViewModule,
                providers: [
                    {
                        provide: 'components',
                        useValue: __spreadArray([], __read(components))
                    }
                ]
            };
        };
        return ViewModule;
    }());
    ViewModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewModule });
    ViewModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewModule, decorators: [{
                type: i0.NgModule
            }] });

    var RxViewActionService = /** @class */ (function () {
        function RxViewActionService(rxViewActionRegistryService, rxLogService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxLogService = rxLogService;
        }
        RxViewActionService.prototype.execute = function (actionName, parameters) {
            var viewActionDescriptor = this.rxViewActionRegistryService.get(actionName);
            if (viewActionDescriptor) {
                if (parameters.$condition$ !== false) {
                    return viewActionDescriptor.service.execute(parameters);
                }
                else {
                    this.rxLogService.debug("View Action " + actionName + " skipped.");
                    return rxjs.EMPTY;
                }
            }
            else {
                return rxjs.throwError("View Action " + actionName + " not found.");
            }
        };
        return RxViewActionService;
    }());
    RxViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionService, deps: [{ token: RxViewActionRegistryService }, { token: i1__namespace$1.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxViewActionRegistryService }, { type: i1__namespace$1.RxLogService }]; } });

    var RX_VIEW_ACTION = {
        viewActionNames: {
            openView: 'rxOpenViewAction',
            launchUrl: 'rxLaunchUrlAction'
        }
    };
    exports.OpenViewActionLaunchBehavior = void 0;
    (function (OpenViewActionLaunchBehavior) {
        OpenViewActionLaunchBehavior["SameWindow"] = "sameWindow";
        OpenViewActionLaunchBehavior["NewWindow"] = "newWindow";
    })(exports.OpenViewActionLaunchBehavior || (exports.OpenViewActionLaunchBehavior = {}));
    exports.OpenViewActionModalSize = void 0;
    (function (OpenViewActionModalSize) {
        OpenViewActionModalSize["Xsmall"] = "rx-xs";
        OpenViewActionModalSize["Small"] = "rx-sm";
        OpenViewActionModalSize["Medium"] = "rx-md";
        OpenViewActionModalSize["Large"] = "rx-lg";
        OpenViewActionModalSize["Xlarge"] = "rx-xl";
        OpenViewActionModalSize["Xxlarge"] = "rx-xxl";
        OpenViewActionModalSize["FullSize"] = "rx-full-size";
    })(exports.OpenViewActionModalSize || (exports.OpenViewActionModalSize = {}));
    exports.OpenViewActionType = void 0;
    (function (OpenViewActionType) {
        OpenViewActionType["FullWidth"] = "fullWidth";
        OpenViewActionType["CenteredModal"] = "centeredModal";
        OpenViewActionType["DockedLeftModal"] = "dockedLeftModal";
        OpenViewActionType["DockedRightModal"] = "dockedRightModal";
    })(exports.OpenViewActionType || (exports.OpenViewActionType = {}));
    var RxViewAction = i0["ɵmakeDecorator"]('RxViewAction');

    var RX_LAUNCH_BEHAVIOR = {
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

    var RxViewActionDesignAdapterService = /** @class */ (function () {
        function RxViewActionDesignAdapterService() {
        }
        RxViewActionDesignAdapterService.prototype.adaptDefinition = function (componentDefinition) {
            var _a;
            componentDefinition.propertiesByName.$condition$ = (_a = componentDefinition.propertiesByName.$condition$) !== null && _a !== void 0 ? _a : null;
        };
        return RxViewActionDesignAdapterService;
    }());
    RxViewActionDesignAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionDesignAdapterService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewActionDesignAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionDesignAdapterService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionDesignAdapterService, decorators: [{
                type: i0.Injectable
            }] });

    var ViewActionDesignModule = /** @class */ (function () {
        function ViewActionDesignModule(rxViewComponentRegistryService, rxDefinitionAdapterRegistryService, rxViewActionDesignAdapterService) {
            rxDefinitionAdapterRegistryService.registerDesignAdapter(exports.RxViewComponentType.Action, rxViewActionDesignAdapterService);
            rxViewComponentRegistryService.register({
                type: exports.RxViewComponentType.Action,
                isDataComponent: true,
                isContainerComponent: true
            });
        }
        return ViewActionDesignModule;
    }());
    ViewActionDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionDesignModule, deps: [{ token: RxViewComponentRegistryService }, { token: i1__namespace$1.RxDefinitionAdapterRegistryService }, { token: RxViewActionDesignAdapterService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewActionDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionDesignModule });
    ViewActionDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionDesignModule, providers: [RxViewActionDesignAdapterService] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        providers: [RxViewActionDesignAdapterService]
                    }]
            }], ctorParameters: function () { return [{ type: RxViewComponentRegistryService }, { type: i1__namespace$1.RxDefinitionAdapterRegistryService }, { type: RxViewActionDesignAdapterService }]; } });

    var RxViewActionDefinitionAdapterRegistryService = /** @class */ (function () {
        function RxViewActionDefinitionAdapterRegistryService() {
            this.runtimeAdapters = new Map();
            this.designAdapters = new Map();
        }
        RxViewActionDefinitionAdapterRegistryService.prototype.registerRuntimeAdapter = function (actionName, adapter) {
            this.runtimeAdapters.set(actionName, adapter);
        };
        RxViewActionDefinitionAdapterRegistryService.prototype.registerDesignAdapter = function (actionName, adapter) {
            this.designAdapters.set(actionName, adapter);
        };
        RxViewActionDefinitionAdapterRegistryService.prototype.getRuntimeAdapter = function (actionName) {
            return this.runtimeAdapters.get(actionName);
        };
        RxViewActionDefinitionAdapterRegistryService.prototype.getDesignAdapter = function (actionName) {
            return this.designAdapters.get(actionName);
        };
        return RxViewActionDefinitionAdapterRegistryService;
    }());
    RxViewActionDefinitionAdapterRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionDefinitionAdapterRegistryService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewActionDefinitionAdapterRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionDefinitionAdapterRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionDefinitionAdapterRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    exports.ViewDisplayType = void 0;
    (function (ViewDisplayType) {
        ViewDisplayType["Preview"] = "preview";
        ViewDisplayType["Regular"] = "view";
        ViewDisplayType["NoShell"] = "iview";
    })(exports.ViewDisplayType || (exports.ViewDisplayType = {}));

    var RxViewActionUtilsService = /** @class */ (function () {
        function RxViewActionUtilsService(rxBundleCacheService, router, rxStringService, rxUrlUtilsService) {
            this.rxBundleCacheService = rxBundleCacheService;
            this.router = router;
            this.rxStringService = rxStringService;
            this.rxUrlUtilsService = rxUrlUtilsService;
        }
        RxViewActionUtilsService.prototype.generateViewUrl = function (viewDefinitionName, inputParams) {
            if (inputParams === void 0) { inputParams = {}; }
            var currentUrl = this.router.routerState.snapshot.url;
            var displayType = exports.ViewDisplayType.Regular;
            if (currentUrl.includes("/" + exports.ViewDisplayType.Preview + "/")) {
                displayType = exports.ViewDisplayType.Preview;
            }
            else if (currentUrl.includes("/" + exports.ViewDisplayType.NoShell + "/")) {
                displayType = exports.ViewDisplayType.NoShell;
            }
            return this.rxUrlUtilsService.buildUrl("/" + this.rxBundleCacheService.bundleId + "/" + displayType + "/" + viewDefinitionName, inputParams);
        };
        RxViewActionUtilsService.prototype.extractRecordIds = function (source) {
            var ids = [];
            if (lodash.isFunction(source.getSelectedRows)) {
                ids = this.getIdsFromGridRows(source.getSelectedRows());
            }
            else if (lodash.isObject(source) && this.rxStringService.isNonEmptyString(source[RowDataItemIdFieldName])) {
                ids.push(source[RowDataItemIdFieldName]);
            }
            else if (Array.isArray(source) && lodash.some(source, lodash.isObject)) {
                ids = this.getIdsFromGridRows(source);
            }
            else if (this.rxStringService.isNonEmptyString(source)) {
                ids.push(source);
            }
            else if (Array.isArray(source) && lodash.some(source, this.rxStringService.isNonEmptyString)) {
                ids = lodash.clone(source);
            }
            return ids;
        };
        RxViewActionUtilsService.prototype.getIdsFromGridRows = function (rows) {
            return lodash.flow(function (rowsArray) { return lodash.map(rowsArray, RowDataItemIdFieldName); }, lodash.compact, lodash.uniq)(rows);
        };
        return RxViewActionUtilsService;
    }());
    RxViewActionUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionUtilsService, deps: [{ token: i1__namespace$1.RxBundleCacheService }, { token: i2__namespace.Router }, { token: i4__namespace.RxStringService }, { token: i4__namespace.RxUrlUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewActionUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxBundleCacheService }, { type: i2__namespace.Router }, { type: i4__namespace.RxStringService }, { type: i4__namespace.RxUrlUtilsService }]; } });

    var RxOldViewLayoutAdapterService = /** @class */ (function () {
        function RxOldViewLayoutAdapterService(rxJsonParserService) {
            this.rxJsonParserService = rxJsonParserService;
        }
        RxOldViewLayoutAdapterService.prototype.convertLayout = function (componentDefinitionItem) {
            if (this.isViewDefinitionItem(componentDefinitionItem)) {
                this.convertViewLayout(componentDefinitionItem.componentDefinition);
            }
            else if (this.isContainerComponentDefinition(componentDefinitionItem.componentDefinition)) {
                this.convertComponentLayout(componentDefinitionItem.componentDefinition);
            }
        };
        RxOldViewLayoutAdapterService.prototype.isViewDefinitionItem = function (componentDefinition) {
            return !componentDefinition.parentComponentDefinition;
        };
        RxOldViewLayoutAdapterService.prototype.convertViewLayout = function (viewDefinition) {
            var _this = this;
            var layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
            if (lodash.isNil(layout.layoutTemplate) || lodash.get(layout, 'columns[0].role')) {
                // for views from new designer, or for views with 1 or more columns
                this.convertComponentLayout(viewDefinition);
            }
            else {
                // for views with header and/or footer
                var childrenWithRoles = lodash.get(layout, 'columns[0].children', []);
                var outlets = childrenWithRoles.map(function (child, i) {
                    var outletItem;
                    if (child.role) {
                        outletItem = {
                            name: child.role === exports.ViewLayoutRole.Content ? RX_VIEW_DEFINITION.defaultOutletName : child.role,
                            static: child.static || null,
                            height: child.height || null,
                            role: child.role || null,
                            columns: (child.columns || []).map(_this.convertColumns.bind(_this))
                        };
                    }
                    else {
                        // creating outlets for case when components are sibling to header/footer
                        outletItem = {
                            name: "outlet-" + i,
                            columns: [{ children: [child.componentDefinitionId] }]
                        };
                    }
                    return outletItem;
                });
                var newLayout = { outlets: outlets };
                viewDefinition.layout = JSON.stringify(newLayout);
            }
        };
        RxOldViewLayoutAdapterService.prototype.convertComponentLayout = function (componentDefinition) {
            if (componentDefinition.layout) {
                var layout = this.rxJsonParserService.tryParseJson(componentDefinition.layout);
                // add columns to views created in new designer
                // todo remove after new designer will save layouts with columns
                var children = lodash.get(layout, 'outlets[0].children');
                if (children) {
                    componentDefinition.layout = JSON.stringify(this.convertNewDesignerLayout(layout));
                }
                if (layout && layout.componentDefinitionId) {
                    var newLayout = {
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
        };
        RxOldViewLayoutAdapterService.prototype.convertNewDesignerLayout = function (layout) {
            var children = lodash.get(layout, 'outlets[0].children');
            if (children) {
                layout.outlets[0].columns = [
                    {
                        children: children
                    }
                ];
                delete layout.outlets[0].children;
            }
            return layout;
        };
        RxOldViewLayoutAdapterService.prototype.convertColumns = function (column) {
            // rx-tab-container was placed 1 lever deeper in the layout of rx-tab-panel in views
            // created in AngularJS view designer. 'columns[0].children[0]' should extract it.
            return {
                span: column.span || null,
                cssClass: "col-sm-" + (column.span || 12),
                children: column.children.map(function (child) { return lodash.get(child, 'columns[0].children[0].componentDefinitionId') || child.componentDefinitionId; })
            };
        };
        RxOldViewLayoutAdapterService.prototype.isContainerComponentDefinition = function (componentDefinition) {
            return componentDefinition.componentDefinitions !== undefined;
        };
        return RxOldViewLayoutAdapterService;
    }());
    RxOldViewLayoutAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOldViewLayoutAdapterService, deps: [{ token: i4__namespace.RxJsonParserService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxOldViewLayoutAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOldViewLayoutAdapterService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOldViewLayoutAdapterService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace.RxJsonParserService }]; } });

    var RX_SHELL = {
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

    var RxShellService = /** @class */ (function () {
        function RxShellService(translateService, rxCurrentUserService, rxExpressionEvaluatorService, rxJsonParserService, rxNotificationService, rxObjectUtilsService, rxUrlUtilsService, rxViewDefinitionCacheService, rxViewDefinitionParserService, rxOldViewLayoutAdapterService, rxFeatureService) {
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
            this.navigateToSmartReportingSubject = new rxjs.Subject();
            this.navigateToViewSubject = new rxjs.Subject();
            this.openUserPreferencesSubject = new rxjs.Subject();
            this.openUserAvailabilitySubject = new rxjs.Subject();
            this.shellConfigSubject = new rxjs.ReplaySubject(1);
            this.openGainsightPreferencesSubject = new rxjs.Subject();
            this.navigateToSmartReporting$ = this.navigateToSmartReportingSubject.asObservable();
            this.navigateToView$ = this.navigateToViewSubject.asObservable();
            this.openUserPreferences$ = this.openUserPreferencesSubject.asObservable();
            this.openUserAvailability$ = this.openUserAvailabilitySubject.asObservable();
            this.shellConfig$ = this.shellConfigSubject.asObservable();
            this.openGainsightPreferences$ = this.openGainsightPreferencesSubject.asObservable();
        }
        RxShellService.prototype.resetMenuItemCount = function () {
            this.menuItemId = 0;
        };
        RxShellService.prototype.updateMenuItemCount = function () {
            return this.menuItemId++;
        };
        RxShellService.prototype.getChildGuids = function (layout, outletName) {
            if (outletName === void 0) { outletName = RX_VIEW_DEFINITION.defaultOutletName; }
            return RxViewLayout.getViewLayoutChildGuids(layout, outletName);
        };
        RxShellService.prototype.getIconClass = function (icon, left) {
            if (left === void 0) { left = true; }
            var iconId = lodash.get(RX_LEGACY_ICONS, icon, icon);
            return iconId ? "d-icon-" + (left ? 'left-' : '') + iconId : '';
        };
        RxShellService.prototype.getShellConfig = function (bundleId) {
            var _this = this;
            var navigationBarItems = [];
            var flattenedMenuItems = [];
            var navigationActions = [];
            var preferenceMenuItem = {
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-preferences.label'),
                action: this.openUserPreferences.bind(this),
                className: 'd-icon-wrench_o',
                hide: false,
                subMenu: []
            };
            var gainsightPreferenceMenuItem = {
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
                action: this.openGainsightPreferences.bind(this),
                className: 'd-icon-app_chart_bar',
                hide: false,
                id: 0,
                subMenu: []
            };
            var myAvailabilityMenuItem = {
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability.label'),
                action: this.openUserAvailability.bind(this),
                hide: false,
                className: 'd-icon-user_clock_o',
                subMenu: []
            };
            var navBarProperties;
            var userMenu = null;
            this.currentUser = this.rxCurrentUserService.get();
            return this.rxViewDefinitionCacheService
                .getViewDefinition(bundleId + ":" + i1$1.RX_APPLICATION.shellDefinitionName)
                .pipe(operators.switchMap(function (shellDefinition) {
                _this.rxViewDefinitionParserService
                    .getComponents(shellDefinition)
                    .forEach(function (definition) { return _this.rxOldViewLayoutAdapterService.convertLayout(definition); });
                if (shellDefinition && shellDefinition.componentDefinitions[0]) {
                    var navBar_1 = shellDefinition.componentDefinitions[0];
                    var layout = _this.rxJsonParserService.tryParseJson(navBar_1.layout);
                    navBarProperties = navBar_1.propertiesByName || {
                        allowAppSwitching: null,
                        globalSearchUseDefault: null,
                        globalSearchDisabled: null,
                        globalSearchRecords: null,
                        globalSearchCustomSearchState: null
                    };
                    lodash.forEach(_this.getChildGuids(layout), function (guid) {
                        var menuItemDefinition = lodash.find(navBar_1.componentDefinitions, {
                            guid: guid
                        });
                        if (menuItemDefinition) {
                            var menuItem = void 0;
                            switch (menuItemDefinition.type) {
                                case RX_SHELL.navBar.menuGroup:
                                case RX_SHELL.navBar.userMenu:
                                    var subMenu_1 = [];
                                    var childLayout = _this.rxJsonParserService.tryParseJson(menuItemDefinition.layout) ||
                                        RxViewLayout.getViewLayoutForDefaultOutlet(menuItemDefinition.componentDefinitions.map(function (item) { return item.guid; }));
                                    lodash.forEach(_this.getChildGuids(childLayout), function (childGuid) {
                                        var subItemDefinition = lodash.find(menuItemDefinition.componentDefinitions, {
                                            guid: childGuid
                                        });
                                        if (subItemDefinition) {
                                            var subItem = _this.getMenuProperties(subItemDefinition);
                                            if (!lodash.isEmpty(subItem)) {
                                                // concatenating className with listClassName, as listClassName not available for subMenu
                                                if (menuItemDefinition.type === RX_SHELL.navBar.userMenu) {
                                                    subItem.className += ' ' + subItem.listClassName;
                                                }
                                                else {
                                                    flattenedMenuItems.push(subItem);
                                                }
                                                subMenu_1.push(subItem);
                                            }
                                        }
                                    });
                                    if (subMenu_1.length > 0) {
                                        // LMA:: TODO:: Even if we set the className in a first level menu the icon is not displayed
                                        menuItem = {
                                            hide: lodash.has(menuItemDefinition.propertiesByName, 'hidden')
                                                ? _this.rxJsonParserService.tryParseJson(menuItemDefinition.propertiesByName.hidden)
                                                : false,
                                            listClassName: lodash.get(menuItemDefinition.propertiesByName, 'styles'),
                                            className: _this.getIconClass(lodash.get(menuItemDefinition.propertiesByName, 'menuItemIcon')),
                                            name: menuItemDefinition.propertiesByName.menuGroupName,
                                            subMenu: subMenu_1,
                                            id: _this.updateMenuItemCount()
                                        };
                                    }
                                    break;
                                case RX_SHELL.navBar.menuItem:
                                    menuItem = _this.getMenuProperties(menuItemDefinition);
                                    break;
                            }
                            if (!lodash.isEmpty(menuItem)) {
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
                    lodash.forEach(_this.getChildGuids(layout, RX_SHELL.outlets.actions), function (guid) {
                        var menuItemDefinition = navBar_1.componentDefinitions.find(function (definition) { return definition.guid === guid; });
                        if (menuItemDefinition) {
                            navigationActions.push(_this.getMenuProperties(menuItemDefinition));
                        }
                    });
                }
                if (_this.rxCurrentUserService.isSupportStaff()) {
                    myAvailabilityMenuItem.id = _this.updateMenuItemCount();
                    if (!userMenu) {
                        userMenu = {
                            subMenu: []
                        };
                    }
                    userMenu.subMenu.push(myAvailabilityMenuItem);
                }
                if (_this.currentUser.fullName) {
                    preferenceMenuItem.id = _this.updateMenuItemCount();
                    if (!userMenu) {
                        userMenu = {
                            subMenu: []
                        };
                    }
                    userMenu.subMenu.push(preferenceMenuItem);
                }
                if (_this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                    userMenu.subMenu.push(gainsightPreferenceMenuItem);
                }
                var rxData = {
                    flattenedMenuItems: flattenedMenuItems,
                    navigationBarItems: navigationBarItems,
                    navigationActions: navigationActions,
                    userMenu: userMenu || [],
                    allowAppSwitching: lodash.has(navBarProperties, 'allowAppSwitching')
                        ? _this.rxJsonParserService.tryParseJson(navBarProperties.allowAppSwitching)
                        : false,
                    globalSearchUseDefault: lodash.has(navBarProperties, 'globalSearchUseDefault')
                        ? _this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchUseDefault)
                        : true,
                    globalSearchCustomSearchState: navBarProperties.globalSearchCustomSearchState || '',
                    globalSearchDisabled: lodash.has(navBarProperties, 'globalSearchDisabled')
                        ? _this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchDisabled)
                        : true,
                    globalSearchRecords: lodash.has(navBarProperties, 'globalSearchRecords')
                        ? _this.rxJsonParserService.tryParseJson(navBarProperties.globalSearchRecords)
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
                _this.shellConfigSubject.next(rxData);
                return rxjs.of(rxData);
            }));
        };
        RxShellService.prototype.openUserPreferences = function () {
            this.openUserPreferencesSubject.next();
        };
        RxShellService.prototype.openGainsightPreferences = function () {
            this.openGainsightPreferencesSubject.next();
        };
        RxShellService.prototype.openUserAvailability = function () {
            this.openUserAvailabilitySubject.next();
        };
        RxShellService.prototype.navigateToView = function (viewParams) {
            this.navigateToViewSubject.next(viewParams);
        };
        RxShellService.prototype.navigateToState = function () {
            this.rxNotificationService.addWarningMessage('This feature is not supported.');
        };
        RxShellService.prototype.navigateToSmartReporting = function () {
            this.navigateToSmartReportingSubject.next();
        };
        RxShellService.prototype.getMenuProperties = function (itemDefinition) {
            var _this = this;
            var menuItem = {};
            var properties = this.rxObjectUtilsService.expandProperties(itemDefinition.propertiesByName);
            menuItem.type = properties.actionName;
            menuItem.id = this.updateMenuItemCount();
            menuItem.closeOnClick = true;
            switch (properties.actionName) {
                case RX_SHELL.actions.launchURL:
                    menuItem.name = properties.menuItemName;
                    menuItem.target =
                        RX_LAUNCH_BEHAVIOR[properties.launchBehavior || exports.OpenViewActionLaunchBehavior.NewWindow].target;
                    if (itemDefinition.type === RX_SHELL.navBar.action) {
                        menuItem.action = function () {
                            window.open(properties.url, menuItem.target);
                        };
                    }
                    else {
                        menuItem.link = properties.url;
                    }
                    break;
                case RX_SHELL.actions.navigateToView:
                    var viewParams_1 = properties.viewParams;
                    lodash.forEach(viewParams_1, function (expression, parameterName) {
                        var paramValue = _this.rxExpressionEvaluatorService.tryEvaluate(expression, {
                            keywords: {
                                userId: _this.currentUser.userId,
                                personId: _this.currentUser.personInstanceId
                            }
                        });
                        viewParams_1[parameterName] = paramValue;
                        return paramValue;
                    });
                    var url = this.rxUrlUtilsService.buildUrl("" + properties.viewDefinitionName, viewParams_1);
                    menuItem.name = properties.menuItemName;
                    menuItem.viewUrl = url;
                    menuItem.action = this.navigateToView.bind(this, menuItem);
                    menuItem.openViewParams = {
                        viewDefinitionName: properties.viewDefinitionName,
                        presentation: Object.assign({ type: exports.OpenViewActionType.FullWidth, launchBehavior: exports.OpenViewActionLaunchBehavior.SameWindow }, lodash.get(properties, 'presentation', {})),
                        viewParams: viewParams_1
                    };
                    break;
                case RX_SHELL.actions.navigateToState:
                    // LMA:: TODO:: Implement it later
                    // if (!isRuntime || rxAuthorization.isStateAuthorized(properties.state)) {
                    menuItem.name = properties.menuItemName;
                    var stateParameters = {
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
            menuItem.hide = lodash.has(properties, 'hidden') ? this.rxJsonParserService.tryParseJson(properties.hidden) : false;
            menuItem.listClassName = properties.styles;
            menuItem.className = this.getIconClass(properties.menuItemIcon, itemDefinition.type !== RX_SHELL.navBar.action);
            return menuItem;
        };
        return RxShellService;
    }());
    RxShellService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellService, deps: [{ token: i1__namespace.TranslateService }, { token: i1__namespace$1.RxCurrentUserService }, { token: RxExpressionEvaluatorService }, { token: i4__namespace.RxJsonParserService }, { token: i1__namespace$1.RxNotificationService }, { token: i4__namespace.RxObjectUtilsService }, { token: i4__namespace.RxUrlUtilsService }, { token: RxViewDefinitionCacheService }, { token: RxViewDefinitionParserService }, { token: RxOldViewLayoutAdapterService }, { token: i1__namespace$1.RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxShellService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.TranslateService }, { type: i1__namespace$1.RxCurrentUserService }, { type: RxExpressionEvaluatorService }, { type: i4__namespace.RxJsonParserService }, { type: i1__namespace$1.RxNotificationService }, { type: i4__namespace.RxObjectUtilsService }, { type: i4__namespace.RxUrlUtilsService }, { type: RxViewDefinitionCacheService }, { type: RxViewDefinitionParserService }, { type: RxOldViewLayoutAdapterService }, { type: i1__namespace$1.RxFeatureService }]; } });

    var RxHomepageResolver = /** @class */ (function () {
        function RxHomepageResolver(rxGlobalCacheService, rxShellService, rxTreeService, router, rxSessionService, rxComponentCanDeactivateGuard, rxLocalizationService) {
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxShellService = rxShellService;
            this.rxTreeService = rxTreeService;
            this.router = router;
            this.rxSessionService = rxSessionService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxLocalizationService = rxLocalizationService;
            this.unknownApplicationRoute = '/unknown-application';
        }
        RxHomepageResolver.prototype.canActivate = function (route, state) {
            var _this = this;
            var bundleId = route.paramMap.get('bundleId');
            var applicationId = lodash.head(route.url).path;
            var useDefaultLang = applicationId === i1$1.RX_APPLICATION.innovationStudioBundleId;
            var initTranslations$ = this.rxLocalizationService.initTranslations(useDefaultLang);
            // waiting for translations to resolve to make getShellConfig call with correct lang
            return rxjs.combineLatest([this.rxSessionService.sessionActive$, initTranslations$]).pipe(operators.switchMap(function () {
                return _this.rxGlobalCacheService
                    .getBundleDescriptors()
                    .pipe(operators.concatMap(function (bundleDescriptors) { return _this.getBundleUrl(bundleDescriptors, bundleId); }));
            }), operators.tap(function () { return _this.rxComponentCanDeactivateGuard.disable(); }));
        };
        RxHomepageResolver.prototype.getBundleUrl = function (bundleDescriptors, bundleId) {
            var _this = this;
            if (lodash.findIndex(bundleDescriptors, { id: bundleId }) !== -1) {
                return this.rxShellService.getShellConfig(bundleId).pipe(operators.map(function (shellConfiguration) {
                    var menuItems = lodash.get(_this.rxTreeService.flattenTree(shellConfiguration, 'navigationBarItems'), '[0].flattenedMenuItems');
                    var defaultView = lodash.find(menuItems, {
                        type: RX_SHELL.actions.navigateToView
                    });
                    return _this.generateUrl(defaultView, bundleId);
                }));
            }
            else {
                return rxjs.of(this.router.parseUrl(this.unknownApplicationRoute));
            }
        };
        RxHomepageResolver.prototype.generateUrl = function (defaultView, bundleId) {
            return this.router.parseUrl(defaultView
                ? "/" + bundleId + "/view/" + defaultView.viewUrl
                : "/" + bundleId + "/view/" + i1$1.RX_APPLICATION.settingsBundleId + ":Unknown Default View Error)}");
        };
        return RxHomepageResolver;
    }());
    RxHomepageResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHomepageResolver, deps: [{ token: i1__namespace$1.RxGlobalCacheService }, { token: RxShellService }, { token: i4__namespace.RxTreeService }, { token: i2__namespace.Router }, { token: i1__namespace$1.RxSessionService }, { token: i1__namespace$1.RxComponentCanDeactivateGuard }, { token: i1__namespace$1.RxLocalizationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxHomepageResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHomepageResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHomepageResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxGlobalCacheService }, { type: RxShellService }, { type: i4__namespace.RxTreeService }, { type: i2__namespace.Router }, { type: i1__namespace$1.RxSessionService }, { type: i1__namespace$1.RxComponentCanDeactivateGuard }, { type: i1__namespace$1.RxLocalizationService }]; } });

    var RxViewComponentResolver = /** @class */ (function () {
        function RxViewComponentResolver(rxViewComponentRegistryService) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        }
        RxViewComponentResolver.prototype.resolve = function () {
            return this.rxViewComponentRegistryService.resolveAsyncDescriptors();
        };
        return RxViewComponentResolver;
    }());
    RxViewComponentResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewComponentResolver, deps: [{ token: RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewComponentResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewComponentResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewComponentResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxViewComponentRegistryService }]; } });

    var RxDeviceDetectionService = /** @class */ (function () {
        function RxDeviceDetectionService(adaptDeviceDetectionService) {
            var _a;
            this.adaptDeviceDetectionService = adaptDeviceDetectionService;
            this.devices = [
                {
                    type: exports.RxDevice.Desktop,
                    isDetected: this.adaptDeviceDetectionService.deviceDesktop()
                },
                {
                    type: exports.RxDevice.Tablet,
                    isDetected: this.adaptDeviceDetectionService.deviceTablet()
                },
                {
                    type: exports.RxDevice.Mobile,
                    isDetected: this.adaptDeviceDetectionService.deviceMobile()
                }
            ];
            this.currentDevice = (_a = this.devices.find(function (item) { return item.isDetected; })) === null || _a === void 0 ? void 0 : _a.type;
        }
        return RxDeviceDetectionService;
    }());
    RxDeviceDetectionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDeviceDetectionService, deps: [{ token: i1__namespace$3.AdaptDeviceDetectionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDeviceDetectionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDeviceDetectionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDeviceDetectionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.AdaptDeviceDetectionService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_AVAILABLE_ON_DEVICES_ALL_VALUE = RX_AVAILABLE_ON_DEVICES_ALL_VALUE;
    exports.RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE = RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE;
    exports.RX_AVAILABLE_ON_DEVICES_PROP_DESC = RX_AVAILABLE_ON_DEVICES_PROP_DESC;
    exports.RX_AVAILABLE_ON_DEVICES_PROP_NAME = RX_AVAILABLE_ON_DEVICES_PROP_NAME;
    exports.RX_DISABLED_PROP_DEFAULT_VALUE = RX_DISABLED_PROP_DEFAULT_VALUE;
    exports.RX_DISABLED_PROP_DESC = RX_DISABLED_PROP_DESC;
    exports.RX_DISABLED_PROP_NAME = RX_DISABLED_PROP_NAME;
    exports.RX_EXPRESSION_EVALUATOR = RX_EXPRESSION_EVALUATOR;
    exports.RX_EXPRESSION_FUNCTIONS = RX_EXPRESSION_FUNCTIONS;
    exports.RX_HIDDEN_PROP_DEFAULT_VALUE = RX_HIDDEN_PROP_DEFAULT_VALUE;
    exports.RX_HIDDEN_PROP_DESC = RX_HIDDEN_PROP_DESC;
    exports.RX_HIDDEN_PROP_NAME = RX_HIDDEN_PROP_NAME;
    exports.RX_LAUNCH_BEHAVIOR = RX_LAUNCH_BEHAVIOR;
    exports.RX_LEGACY_ICONS = RX_LEGACY_ICONS;
    exports.RX_RICH_TEXT = RX_RICH_TEXT;
    exports.RX_SHELL = RX_SHELL;
    exports.RX_STANDARD_PROPS_DEFAULT_VALUES = RX_STANDARD_PROPS_DEFAULT_VALUES;
    exports.RX_STANDARD_PROPS_DESC = RX_STANDARD_PROPS_DESC;
    exports.RX_STYLES_PROP_DEFAULT_VALUE = RX_STYLES_PROP_DEFAULT_VALUE;
    exports.RX_STYLES_PROP_DESC = RX_STYLES_PROP_DESC;
    exports.RX_STYLES_PROP_NAME = RX_STYLES_PROP_NAME;
    exports.RX_SUPPORTED_FUNCTION = RX_SUPPORTED_FUNCTION;
    exports.RX_VIEW_ACTION = RX_VIEW_ACTION;
    exports.RX_VIEW_DEFINITION = RX_VIEW_DEFINITION;
    exports.RX_VIEW_LAYOUTS = RX_VIEW_LAYOUTS;
    exports.RecordGridNamedFilterOptionKey = RecordGridNamedFilterOptionKey;
    exports.RowDataItemIdFieldName = RowDataItemIdFieldName;
    exports.RxCkEditorConfiguratorService = RxCkEditorConfiguratorService;
    exports.RxDefaultExpressionEvaluatorService = RxDefaultExpressionEvaluatorService;
    exports.RxDefaultExpressionValidatorService = RxDefaultExpressionValidatorService;
    exports.RxDeviceDetectionService = RxDeviceDetectionService;
    exports.RxExpressionEvaluatorService = RxExpressionEvaluatorService;
    exports.RxExpressionHelperService = RxExpressionHelperService;
    exports.RxExpressionSyntaxTreeBuilderService = RxExpressionSyntaxTreeBuilderService;
    exports.RxHomepageResolver = RxHomepageResolver;
    exports.RxOldViewLayoutAdapterService = RxOldViewLayoutAdapterService;
    exports.RxRecordQueryExpressionEvaluatorService = RxRecordQueryExpressionEvaluatorService;
    exports.RxShellService = RxShellService;
    exports.RxViewAction = RxViewAction;
    exports.RxViewActionDefinitionAdapterRegistryService = RxViewActionDefinitionAdapterRegistryService;
    exports.RxViewActionRegistryService = RxViewActionRegistryService;
    exports.RxViewActionService = RxViewActionService;
    exports.RxViewActionUtilsService = RxViewActionUtilsService;
    exports.RxViewComponent = RxViewComponent;
    exports.RxViewComponentRegistryService = RxViewComponentRegistryService;
    exports.RxViewComponentResolver = RxViewComponentResolver;
    exports.RxViewDefinitionCacheService = RxViewDefinitionCacheService;
    exports.RxViewDefinitionDataPageService = RxViewDefinitionDataPageService;
    exports.RxViewDefinitionLocalizationService = RxViewDefinitionLocalizationService;
    exports.RxViewDefinitionParserService = RxViewDefinitionParserService;
    exports.RxViewDefinitionService = RxViewDefinitionService;
    exports.RxViewLayout = RxViewLayout;
    exports.ViewActionDesignModule = ViewActionDesignModule;
    exports.ViewModule = ViewModule;
    exports.getLayoutChecksum = getLayoutChecksum;
    exports.renameViewDefinitionCommand = renameViewDefinitionCommand;
    exports.revertCustomizationResourceType = revertCustomizationResourceType;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-view-api.umd.js.map
