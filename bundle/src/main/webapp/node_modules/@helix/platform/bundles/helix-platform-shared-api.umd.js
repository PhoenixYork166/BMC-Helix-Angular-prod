(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('lodash'), require('rxjs/operators'), require('@angular/common'), require('moment-es6'), require('@angular/router'), require('@helix/platform/ui-kit'), require('@ngx-translate/core'), require('@bmc-ux/adapt-angular'), require('@angular/common/locales/da'), require('@angular/common/locales/de'), require('@angular/common/locales/es'), require('@angular/common/locales/fr'), require('@angular/common/locales/it'), require('@angular/common/locales/ja'), require('@angular/common/locales/ko'), require('@angular/common/locales/nb'), require('@angular/common/locales/nl'), require('@angular/common/locales/pt'), require('@angular/common/locales/ru'), require('@angular/common/locales/sv'), require('@angular/common/locales/zh-Hans'), require('@helix/platform/utils'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/shared/api', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'lodash', 'rxjs/operators', '@angular/common', 'moment-es6', '@angular/router', '@helix/platform/ui-kit', '@ngx-translate/core', '@bmc-ux/adapt-angular', '@angular/common/locales/da', '@angular/common/locales/de', '@angular/common/locales/es', '@angular/common/locales/fr', '@angular/common/locales/it', '@angular/common/locales/ja', '@angular/common/locales/ko', '@angular/common/locales/nb', '@angular/common/locales/nl', '@angular/common/locales/pt', '@angular/common/locales/ru', '@angular/common/locales/sv', '@angular/common/locales/zh-Hans', '@helix/platform/utils', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.shared = global.helix.platform.shared || {}, global.helix.platform.shared.api = {}), global.ng.core, global.ng.common.http, global.rxjs, global.lodash, global.rxjs.operators, global.ng.common, global.moment, global.ng.router, global.helix.platform["ui-kit"], global.ngxTranslateCore, global.adaptAngular, global.ng.common.locales.da, global.ng.common.locales.de, global.ng.common.locales.es, global.ng.common.locales.fr, global.ng.common.locales.it, global.ng.common.locales.ja, global.ng.common.locales.ko, global.ng.common.locales.nb, global.ng.common.locales.nl, global.ng.common.locales.pt, global.ng.common.locales.ru, global.ng.common.locales.sv, global.ng.common.locales.zhHans, global.helix.platform.utils, global.ng.platformBrowser));
})(this, (function (exports, i0, i1, rxjs, lodash, operators, i3, moment, i3$1, i2, i2$1, i4, localeDa, localeDe, localeEs, localeFr, localeIt, localeJa, localeKo, localeNb, localeNl, localePt, localeRu, localeSv, localeZhHans, i2$2, i1$1) { 'use strict';

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
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var localeDa__default = /*#__PURE__*/_interopDefaultLegacy(localeDa);
    var localeDe__default = /*#__PURE__*/_interopDefaultLegacy(localeDe);
    var localeEs__default = /*#__PURE__*/_interopDefaultLegacy(localeEs);
    var localeFr__default = /*#__PURE__*/_interopDefaultLegacy(localeFr);
    var localeIt__default = /*#__PURE__*/_interopDefaultLegacy(localeIt);
    var localeJa__default = /*#__PURE__*/_interopDefaultLegacy(localeJa);
    var localeKo__default = /*#__PURE__*/_interopDefaultLegacy(localeKo);
    var localeNb__default = /*#__PURE__*/_interopDefaultLegacy(localeNb);
    var localeNl__default = /*#__PURE__*/_interopDefaultLegacy(localeNl);
    var localePt__default = /*#__PURE__*/_interopDefaultLegacy(localePt);
    var localeRu__default = /*#__PURE__*/_interopDefaultLegacy(localeRu);
    var localeSv__default = /*#__PURE__*/_interopDefaultLegacy(localeSv);
    var localeZhHans__default = /*#__PURE__*/_interopDefaultLegacy(localeZhHans);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$2);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

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

    var RX_DATA_PAGE = {
        defaultPageSize: 50,
        emptyDataPage: {
            data: [],
            totalSize: 0
        }
    };

    var DATA_PAGE_API_URL = '/api/rx/application/datapage';
    var DataPage = /** @class */ (function () {
        function DataPage(injector, dataPageType, defaultDataPageRequestConfiguration) {
            if (defaultDataPageRequestConfiguration === void 0) { defaultDataPageRequestConfiguration = {}; }
            this.requiredRequestParams = {
                pageSize: -1,
                startIndex: 0
            };
            this.http = injector.get(i1.HttpClient);
            this.dataPageType = dataPageType;
            this.configuration = defaultDataPageRequestConfiguration;
        }
        DataPage.prototype.get = function (dataPageRequestConfiguration) {
            if (dataPageRequestConfiguration === void 0) { dataPageRequestConfiguration = {}; }
            var requestParams = Object.assign(Object.assign(Object.assign({}, this.requiredRequestParams), this.configuration.params), dataPageRequestConfiguration.params);
            var requestHeaders = Object.assign(Object.assign({}, this.configuration.headers), dataPageRequestConfiguration.headers);
            var params = new i1.HttpParams().set('dataPageType', this.dataPageType);
            Object.keys(requestParams).forEach(function (name) {
                params = params.set(name, String(requestParams[name]));
            });
            return this.http.get(DATA_PAGE_API_URL, {
                headers: new i1.HttpHeaders(requestHeaders),
                params: params
            });
        };
        DataPage.prototype.getEmptyDataPage = function () {
            return rxjs.of(RX_DATA_PAGE.emptyDataPage);
        };
        DataPage.prototype.post = function (dataPageRequestConfiguration) {
            if (dataPageRequestConfiguration === void 0) { dataPageRequestConfiguration = {}; }
            var requestParams = Object.assign(Object.assign(Object.assign({}, this.requiredRequestParams), this.configuration.params), dataPageRequestConfiguration.params);
            var requestHeaders = Object.assign(Object.assign({}, this.configuration.headers), dataPageRequestConfiguration.headers);
            var requestBody = { values: { dataPageType: this.dataPageType } };
            Object.keys(requestParams).forEach(function (name) {
                requestBody.values[name] = String(requestParams[name]);
            });
            return this.http.post(DATA_PAGE_API_URL, requestBody, {
                headers: new i1.HttpHeaders(requestHeaders)
            });
        };
        return DataPage;
    }());

    var RxActionTypeDataPageService = /** @class */ (function (_super) {
        __extends(RxActionTypeDataPageService, _super);
        function RxActionTypeDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.action.datapage.ActionTypeDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxActionTypeDataPageService;
    }(DataPage));
    RxActionTypeDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionTypeDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxActionTypeDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionTypeDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionTypeDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxDefinitionNameService = /** @class */ (function () {
        function RxDefinitionNameService() {
        }
        RxDefinitionNameService.prototype.getDisplayName = function (definitionName) {
            var name = definitionName || '';
            return name.substring(name.lastIndexOf(':') + 1);
        };
        RxDefinitionNameService.prototype.getDisplayNameForValidation = function (definitionName) {
            var name = definitionName || '';
            return name.substring(name.indexOf(':') + 1);
        };
        RxDefinitionNameService.prototype.getDefinitionName = function (bundleId, displayName) {
            return bundleId + ":" + displayName;
        };
        RxDefinitionNameService.prototype.getBundleId = function (definitionName) {
            var name = definitionName || '';
            var matches = name.match(/(.+):/);
            return (matches && matches.pop()) || '';
        };
        return RxDefinitionNameService;
    }());
    RxDefinitionNameService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionNameService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefinitionNameService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionNameService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionNameService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxActionTypeUtilsService = /** @class */ (function () {
        function RxActionTypeUtilsService(rxDefinitionNameService) {
            this.rxDefinitionNameService = rxDefinitionNameService;
        }
        RxActionTypeUtilsService.prototype.getActionTypeBundleFriendlyName = function (bundleDescriptors, actionType) {
            var _a;
            var bundleId = this.rxDefinitionNameService.getBundleId(actionType.actionTypeName);
            return (bundleId && ((_a = lodash.find(bundleDescriptors, { id: bundleId })) === null || _a === void 0 ? void 0 : _a.friendlyName)) || '';
        };
        RxActionTypeUtilsService.prototype.isActionParameterArrayOrList = function (actionParameter) {
            return lodash.isString(actionParameter.dataType) && /^java\.util\.List.*|.*\[.*].*/.test(actionParameter.dataType);
        };
        RxActionTypeUtilsService.prototype.prettifyActionTypeName = function (actionTypeName) {
            var result = this.rxDefinitionNameService.getDisplayName(actionTypeName);
            if (!lodash.includes(actionTypeName, ' ')) {
                result = lodash.words(result, /[a-z|A-Z|0-9]+?([A-Z|0-9]*)+?([-_a-z|0-9]*)+/g)
                    .map(function (value, index) { return (index === 0 ? lodash.upperFirst(value) : value); })
                    .join(' ');
            }
            return result;
        };
        return RxActionTypeUtilsService;
    }());
    RxActionTypeUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionTypeUtilsService, deps: [{ token: RxDefinitionNameService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxActionTypeUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionTypeUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionTypeUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxDefinitionNameService }]; } });

    var Command = /** @class */ (function () {
        function Command(resourceType, httpClient) {
            this.resourceType = resourceType;
            this.httpClient = httpClient;
        }
        Command.prototype.execute = function (data, options) {
            var payload = data instanceof FormData
                ? data
                : Object.assign(Object.assign({}, data), { resourceType: this.resourceType });
            return this.httpClient.post('/api/rx/application/command', payload, options);
        };
        return Command;
    }());

    var RxCommandFactoryService = /** @class */ (function () {
        function RxCommandFactoryService(httpClient) {
            this.httpClient = httpClient;
        }
        RxCommandFactoryService.prototype.forResourceType = function (resourceType) {
            return new Command(resourceType, this.httpClient);
        };
        return RxCommandFactoryService;
    }());
    RxCommandFactoryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCommandFactoryService, deps: [{ token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCommandFactoryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCommandFactoryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCommandFactoryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }]; } });

    var API_URL = '/api/rx/application/admin-settings/local';
    var SETTINGS_API_URL = '/api/rx/application/admin-settings/component';
    var RxAdminSettingsService = /** @class */ (function () {
        function RxAdminSettingsService(httpClient, rxCommandFactoryService) {
            this.httpClient = httpClient;
            this.rxCommandFactoryService = rxCommandFactoryService;
        }
        RxAdminSettingsService.prototype.getComponentGridData = function (componentName, customHeaders) {
            return this.httpClient.get(API_URL + "/component-griddata/" + componentName, {
                headers: new i1.HttpHeaders(customHeaders || {})
            });
        };
        RxAdminSettingsService.prototype.getComponentDefinition = function (componentName, customHeaders) {
            return this.httpClient.get(API_URL + "/component-definition/" + componentName, {
                headers: new i1.HttpHeaders(customHeaders || {})
            });
        };
        RxAdminSettingsService.prototype.getAdminNavigationMenuItems = function () {
            return this.httpClient
                .get(API_URL + "/navigation-menu")
                .pipe(operators.map(function (navigationMenu) { return navigationMenu.AdminNavigationMenu.items; }));
        };
        RxAdminSettingsService.prototype.getComponentSettings = function (componentName, customHeaders) {
            return this.httpClient.get(API_URL + "/component-settings/" + componentName, {
                headers: new i1.HttpHeaders(customHeaders || {})
            });
        };
        RxAdminSettingsService.prototype.deleteComponentSettings = function (componentName, customHeaders) {
            return this.httpClient.delete(API_URL + "/component-settings/" + componentName, {
                headers: new i1.HttpHeaders(customHeaders || {})
            });
        };
        RxAdminSettingsService.prototype.createComponentSettings = function (componentName, data, customHeaders) {
            return this.httpClient
                .post(API_URL + "/component-settings/" + componentName, data, {
                headers: new i1.HttpHeaders(customHeaders || {}),
                observe: 'response'
            })
                .pipe(operators.map(function (response) { var _a; return lodash.last((_a = response.headers.get('location')) === null || _a === void 0 ? void 0 : _a.split('/')) || ''; }));
        };
        RxAdminSettingsService.prototype.updateComponentSettings = function (componentName, data, customHeaders) {
            return this.httpClient.put(API_URL + "/component-settings/" + componentName, data, {
                headers: new i1.HttpHeaders(customHeaders || {})
            });
        };
        RxAdminSettingsService.prototype.getAdminSetting = function (componentName, customHeaders) {
            return this.httpClient.get(SETTINGS_API_URL + "/" + componentName, {
                headers: new i1.HttpHeaders(customHeaders || {})
            });
        };
        RxAdminSettingsService.prototype.createAdminSetting = function (data) {
            return this.httpClient.post(SETTINGS_API_URL, data);
        };
        RxAdminSettingsService.prototype.updateAdminSetting = function (data) {
            return this.httpClient.put(SETTINGS_API_URL + "/" + data.componentName, data);
        };
        RxAdminSettingsService.prototype.deleteAdminSetting = function (definitionNames) {
            return this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.admin.command.DeleteAdminSettingsComponentDefinitionsCommand')
                .execute({ definitionNames: definitionNames });
        };
        return RxAdminSettingsService;
    }());
    RxAdminSettingsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminSettingsService, deps: [{ token: i1__namespace.HttpClient }, { token: RxCommandFactoryService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAdminSettingsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminSettingsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminSettingsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: RxCommandFactoryService }]; } });

    var RX_ADMINISTRATION = {
        settingNames: {
            newApplicationUiOptOut: 'New application UI opt out',
            newViewDesignerOptOut: 'New view designer opt out'
        },
        systemConfigurationUrl: '/api/rx/application/systemconfiguration',
        submitterModes: {
            locked: 1
        },
        configurationSettingTypes: {
            shared: {
                configurationType: 'shared-settings',
                value: 'shared'
            },
            inbundle: {
                configurationType: 'in-bundle-settings',
                value: 'inBundle'
            },
            external: {
                configurationType: 'external-settings',
                value: 'external'
            }
        },
        settingAccessOptions: {
            application: {
                value: 'Application'
            },
            innovationStudio: {
                value: 'InnovationStudio'
            },
            both: {
                value: 'Both'
            },
            none: {
                value: 'None'
            }
        }
    };

    var RxSystemConfigurationService = /** @class */ (function () {
        function RxSystemConfigurationService(httpClient) {
            this.httpClient = httpClient;
            this.systemConfigurations = {};
        }
        RxSystemConfigurationService.prototype.initialize = function () {
            var _this = this;
            return this.queryConfiguration(['Submitter-Mode']).pipe(operators.tap(function (systemConfigurations) {
                _this.systemConfigurations = systemConfigurations.reduce(function (configs, systemConfiguration) {
                    configs[systemConfiguration.id] = systemConfiguration.value;
                    return configs;
                }, {});
            }));
        };
        RxSystemConfigurationService.prototype.getConfigurationSync = function (identifier) {
            if (this.systemConfigurations) {
                var configValue = this.systemConfigurations[identifier];
                if (lodash.isUndefined(configValue)) {
                    throw new Error("System configuration " + identifier + " is not available.");
                }
                return configValue;
            }
            else {
                throw new Error('System configuration service is not initialized.');
            }
        };
        RxSystemConfigurationService.prototype.getConfiguration = function (configurationName) {
            return this.httpClient.get(RX_ADMINISTRATION.systemConfigurationUrl + "/" + configurationName);
        };
        RxSystemConfigurationService.prototype.setConfiguration = function (configurationName, configurationValue) {
            return this.httpClient.put(RX_ADMINISTRATION.systemConfigurationUrl + "/" + configurationName, {
                name: configurationName,
                value: lodash.isString(configurationValue) ? configurationValue : JSON.stringify(configurationValue)
            });
        };
        RxSystemConfigurationService.prototype.queryConfiguration = function (identifiers) {
            var queryString = identifiers.map(function (identifier) { return "identifier=" + encodeURIComponent(identifier); }).join('&');
            return this.httpClient.get(RX_ADMINISTRATION.systemConfigurationUrl + "/query?" + queryString);
        };
        return RxSystemConfigurationService;
    }());
    RxSystemConfigurationService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSystemConfigurationService, deps: [{ token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSystemConfigurationService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSystemConfigurationService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSystemConfigurationService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }]; } });

    var RxDataPageFactoryService = /** @class */ (function () {
        function RxDataPageFactoryService(injector) {
            this.injector = injector;
        }
        RxDataPageFactoryService.prototype.withType = function (dataPageType, defaultDataPageRequestConfiguration) {
            return new DataPage(this.injector, dataPageType, defaultDataPageRequestConfiguration);
        };
        return RxDataPageFactoryService;
    }());
    RxDataPageFactoryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataPageFactoryService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDataPageFactoryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataPageFactoryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataPageFactoryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxAdminComponentDataPageService = /** @class */ (function (_super) {
        __extends(RxAdminComponentDataPageService, _super);
        function RxAdminComponentDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.admin.datapage.AdminComponentDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxAdminComponentDataPageService;
    }(DataPage));
    RxAdminComponentDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminComponentDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAdminComponentDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminComponentDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminComponentDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RX_APPLICATION = {
        platformBundleId: 'com.bmc.arsys.rx.client',
        platformBundleIdPrefix: 'com.bmc.arsys.',
        platformBundleIds: {
            approvalCoreService: 'com.bmc.dsom.approval-core-service',
            foundation: 'com.bmc.arsys.rx.foundation'
        },
        chatbotBundleId: 'com.bmc.dsm.chatbot',
        settingsBundleId: 'com.bmc.arsys.rx.settings',
        shellDefinitionName: 'BMC Modern Shell',
        environmentConfigurationBundleId: 'com.bmc.arsys.rx.environment-configuration',
        innovationStudioBundleId: 'com.bmc.arsys.rx.innovationstudio',
        standardlib: 'standardlib',
        approvalBundleId: 'com.bmc.arsys.rx.approval',
        dataloadBundleId: 'com.bmc.arsys.rx.dataload',
        angularJsApplicationBundleIds: [
            'com.bmc.arsys.rx.settings',
            'com.bmc.bsm.chatops',
            'com.bmc.dsm.chatbot',
            'com.bmc.dsm.comaroundMigration',
            'com.example.taskmanager',
            'com.example.taskmanager-lib'
        ],
        angularJsViewDesignerBundleIds: ['com.example.taskmanager', 'com.example.taskmanager-lib'],
        ipaasJitterbitBundleId: 'com.bmc.dsm.ipaas-jitterbit',
        ipaasMulesoftBundleId: 'com.bmc.dsm.ipaas-mulesoft',
        routeReuseStrategies: {
            checkParentParams: 'checkParentParams'
        }
    };

    var RX_BUILD_ENVIRONMENT = new i0.InjectionToken('buildEnvironment');

    var RxBundleLoadType;
    (function (RxBundleLoadType) {
        RxBundleLoadType["always"] = "always";
        RxBundleLoadType["lazy"] = "lazy";
        RxBundleLoadType["never"] = "never";
    })(RxBundleLoadType || (RxBundleLoadType = {}));

    var RxBundleDataPageService = /** @class */ (function (_super) {
        __extends(RxBundleDataPageService, _super);
        function RxBundleDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.bundle.datapage.BundleDescriptorDataPageQuery', {
                params: {
                    includeNonLicensedBundles: true
                }
            }) || this;
            _this.injector = injector;
            return _this;
        }
        return RxBundleDataPageService;
    }(DataPage));
    RxBundleDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxBundleDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxFunctionDataPageService = /** @class */ (function (_super) {
        __extends(RxFunctionDataPageService, _super);
        function RxFunctionDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.workflow.datapage.FunctionDescriptorDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxFunctionDataPageService;
    }(DataPage));
    RxFunctionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFunctionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFunctionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFunctionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFunctionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    exports.LogCategory = void 0;
    (function (LogCategory) {
        LogCategory["Sql"] = "sql";
        LogCategory["Api"] = "api";
        LogCategory["Rule"] = "rule";
        LogCategory["Process"] = "process";
        LogCategory["Bundle"] = "bundle";
        LogCategory["Cli"] = "cli";
        LogCategory["All"] = "all";
    })(exports.LogCategory || (exports.LogCategory = {}));
    var RX_LOG = {
        serverLogCategories: [exports.LogCategory.Sql, exports.LogCategory.Api, exports.LogCategory.Rule, exports.LogCategory.Process, exports.LogCategory.Bundle],
        clientLogCategories: [exports.LogCategory.Cli]
    };

    var RxCurrentUserService = /** @class */ (function () {
        function RxCurrentUserService() {
            this.userSubject$ = new rxjs.BehaviorSubject(null);
            this.user$ = this.userSubject$.asObservable().pipe(operators.shareReplay(1));
        }
        RxCurrentUserService.prototype.getPreferredLocale = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.preferredLocale) !== null && _b !== void 0 ? _b : '';
        };
        RxCurrentUserService.prototype.getPreferredUserLocale = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.preferredUserLocale) !== null && _b !== void 0 ? _b : '';
        };
        RxCurrentUserService.prototype.getName = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.loginName) !== null && _b !== void 0 ? _b : '';
        };
        RxCurrentUserService.prototype.set = function (user) {
            this.userSubject$.next(user);
        };
        RxCurrentUserService.prototype.get = function () {
            return this.userSubject$.getValue();
        };
        RxCurrentUserService.prototype.isBusinessAnalyst = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.isBusinessAnalyst) !== null && _b !== void 0 ? _b : false;
        };
        RxCurrentUserService.prototype.isAdministrator = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.isAdministrator) !== null && _b !== void 0 ? _b : false;
        };
        RxCurrentUserService.prototype.getEditableBundles = function () {
            var _a;
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.editableBundles) || [];
        };
        RxCurrentUserService.prototype.isSupportStaff = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.supportStaff) !== null && _b !== void 0 ? _b : false;
        };
        RxCurrentUserService.prototype.isAvailableForAssignment = function () {
            var _a, _b;
            return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.assignmentAvailable) !== null && _b !== void 0 ? _b : false;
        };
        RxCurrentUserService.prototype.setAssignmentAvailability = function (assignmentAvailable) {
            var user = this.get();
            if (user) {
                user.assignmentAvailable = assignmentAvailable;
            }
        };
        return RxCurrentUserService;
    }());
    RxCurrentUserService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCurrentUserService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCurrentUserService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCurrentUserService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCurrentUserService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var sessionLogCategoriesKey = 'RX_LOG_CATEGORIES';
    // tslint:disable:no-console
    var RxLogService = /** @class */ (function () {
        function RxLogService(rxCurrentUserService) {
            this.rxCurrentUserService = rxCurrentUserService;
            this.serverCategories = '';
            this.shouldLogEverything = false;
            try {
                var storedCategories = sessionStorage.getItem(sessionLogCategoriesKey);
                this.categories = storedCategories ? JSON.parse(storedCategories) : [];
            }
            catch (e) {
                this.categories = [];
            }
            this.configure(this.categories);
        }
        Object.defineProperty(RxLogService.prototype, "logCategories", {
            get: function () {
                return this.categories || [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RxLogService.prototype, "serverLogCategories", {
            get: function () {
                return this.serverCategories;
            },
            enumerable: false,
            configurable: true
        });
        RxLogService.prototype.configure = function (categories) {
            this.shouldLogEverything = lodash.includes(categories, exports.LogCategory.All);
            this.serverCategories = this.shouldLogEverything
                ? RX_LOG.serverLogCategories.join(',')
                : lodash.intersection(categories, RX_LOG.serverLogCategories).join(',');
            this.categories = this.shouldLogEverything ? [exports.LogCategory.All] : categories;
            this.categories.length
                ? sessionStorage.setItem(sessionLogCategoriesKey, JSON.stringify(this.categories))
                : sessionStorage.removeItem(sessionLogCategoriesKey);
        };
        RxLogService.prototype.error = function (message) {
            console.error(this.prepareLogMessage(message, 'E'));
        };
        RxLogService.prototype.warning = function (message) {
            console.warn(this.prepareLogMessage(message, 'W'));
        };
        RxLogService.prototype.info = function (message) {
            if (this.shouldLogEverything || lodash.includes(this.logCategories, exports.LogCategory.Cli)) {
                console.info(this.prepareLogMessage(message, 'I'));
            }
        };
        RxLogService.prototype.debug = function (message) {
            if (this.shouldLogEverything || lodash.includes(this.logCategories, exports.LogCategory.Cli)) {
                console.debug(this.prepareLogMessage(message, 'D'));
            }
        };
        RxLogService.prototype.log = function (message) {
            if (this.logCategories.length) {
                console.log(message);
            }
        };
        // tslint:disable:no-trailing-whitespace
        RxLogService.prototype.prepareLogMessage = function (text, type) {
            var currentUser = this.rxCurrentUserService.get();
            return ("<CLI" + type + "> " +
                '<TID: 0000000000> ' +
                '<RPC ID: 0000000000> ' +
                '<Queue:           > ' +
                ("<USER: " + (currentUser ? currentUser.loginName : '') + "                                        > ") +
                '<Tenant-ID:                                             > ' +
                ("<Overlay-Group: " + (currentUser ? currentUser.defaultOverlayGroupId : '') + "         > ") +
                ("/* " + moment__default["default"]().format('ddd MMM DD YYYY HH:mm:ss.SSSS') + " */ " + text));
        };
        return RxLogService;
    }());
    RxLogService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLogService, deps: [{ token: RxCurrentUserService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLogService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLogService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLogService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxCurrentUserService }]; } });

    var RxGlobalCacheService = /** @class */ (function () {
        function RxGlobalCacheService(rxBundleDataPageService, rxFunctionDataPageService, rxLogService) {
            this.rxBundleDataPageService = rxBundleDataPageService;
            this.rxFunctionDataPageService = rxFunctionDataPageService;
            this.rxLogService = rxLogService;
            this.bundleDescriptorsById = {};
            this.bundleDescriptors = null;
            this.functionDescriptors = null;
            this.applicationIdValue = '';
            this.applicationIdSubject = new rxjs.ReplaySubject(1);
            this.applicationId$ = this.applicationIdSubject.asObservable();
        }
        Object.defineProperty(RxGlobalCacheService.prototype, "applicationId", {
            get: function () {
                return this.applicationIdValue;
            },
            set: function (value) {
                if (this.applicationIdValue !== value) {
                    this.applicationIdValue = value;
                    this.applicationIdSubject.next(value);
                    this.rxLogService.debug("RxGlobalCacheService: application ID set to " + value);
                }
            },
            enumerable: false,
            configurable: true
        });
        RxGlobalCacheService.prototype.getBundleDescriptors = function () {
            var _this = this;
            if (!this.bundleDescriptors) {
                this.bundleDescriptors = this.rxBundleDataPageService.get().pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.data.map(function (dataPageData) {
                    var _a;
                    var defaultUiOptions = {
                        options: {
                            loadJs: RxBundleLoadType.always,
                            loadCss: RxBundleLoadType.always
                        }
                    };
                    var uiOptions;
                    try {
                        uiOptions = (_a = JSON.parse(dataPageData.uiOptions)) !== null && _a !== void 0 ? _a : defaultUiOptions;
                        if (Boolean(uiOptions.options) && typeof uiOptions.options === 'object') {
                            lodash.defaults(uiOptions.options, defaultUiOptions.options);
                        }
                        else {
                            _this.rxLogService.warning("Invalid structure of uiOptions in bundle " + dataPageData.name + ".");
                            uiOptions = defaultUiOptions;
                        }
                    }
                    catch (e) {
                        _this.rxLogService.warning("Cannot parse uiOptions in bundle " + dataPageData.name + ".");
                        uiOptions = defaultUiOptions;
                    }
                    return Object.assign(Object.assign({}, dataPageData), { uiOptions: uiOptions });
                }); }), operators.shareReplay(1));
            }
            return this.bundleDescriptors;
        };
        RxGlobalCacheService.prototype.getFunctionDescriptors = function () {
            if (!this.functionDescriptors) {
                this.functionDescriptors = this.rxFunctionDataPageService.get().pipe(operators.map(function (dataPage) { return dataPage.data; }), operators.shareReplay(1));
            }
            return this.functionDescriptors;
        };
        RxGlobalCacheService.prototype.getLicensedBundleDescriptors = function () {
            return this.getBundleDescriptors().pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.filter(function (bundleDescriptor) { return bundleDescriptor.isLicensed; }); }));
        };
        RxGlobalCacheService.prototype.getBundleDescriptor = function (bundleId) {
            if (!this.bundleDescriptorsById[bundleId]) {
                this.bundleDescriptorsById[bundleId] = this.getBundleDescriptors().pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.find(function (bundleDescriptor) { return bundleDescriptor.id === bundleId; }); }), operators.shareReplay(1));
            }
            return this.bundleDescriptorsById[bundleId];
        };
        RxGlobalCacheService.prototype.getApplicationBundleDescriptor = function () {
            var _this = this;
            return this.applicationIdSubject.pipe(operators.switchMap(function (applicationId) { return _this.getBundleDescriptor(applicationId); }));
        };
        RxGlobalCacheService.prototype._getBundleFriendlyName = function (descriptor, defaultValue) {
            return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.friendlyName) || (descriptor === null || descriptor === void 0 ? void 0 : descriptor.id) || defaultValue || '';
        };
        RxGlobalCacheService.prototype.getBundleFriendlyName = function (bundleId, defaultValue) {
            var _this = this;
            return this.getBundleDescriptor(bundleId).pipe(operators.map(function (bundleDescriptor) { return _this._getBundleFriendlyName(bundleDescriptor, defaultValue); }));
        };
        RxGlobalCacheService.prototype.getBundleDisplayName = function (bundleId) {
            var _this = this;
            return this.getBundleDescriptor(bundleId).pipe(operators.map(function (bundleDescriptor) { return (_this.applicationId !== RX_APPLICATION.innovationStudioBundleId && (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.localizedDisplayName)) ||
                _this._getBundleFriendlyName(bundleDescriptor); }));
        };
        RxGlobalCacheService.prototype.clear = function () {
            this.bundleDescriptorsById = {};
            this.bundleDescriptors = null;
            this.functionDescriptors = null;
            this.rxLogService.debug('RxGlobalCacheService: cleared.');
        };
        return RxGlobalCacheService;
    }());
    RxGlobalCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGlobalCacheService, deps: [{ token: RxBundleDataPageService }, { token: RxFunctionDataPageService }, { token: RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGlobalCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGlobalCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGlobalCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxBundleDataPageService }, { type: RxFunctionDataPageService }, { type: RxLogService }]; } });

    var RxBundleService = /** @class */ (function () {
        function RxBundleService(document, compiler, httpClient, injector, rxGlobalCacheService, rxLogService) {
            this.document = document;
            this.compiler = compiler;
            this.httpClient = httpClient;
            this.injector = injector;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxLogService = rxLogService;
            this.baseUrl = '/api/rx/application/bundle/bundledescriptor/';
            this.bundleJs = {};
            this.bundleCss = {};
        }
        RxBundleService.prototype.get = function (bundleId, options) {
            var url = this.baseUrl + bundleId;
            return this.httpClient.get(url, options);
        };
        // During login we issue a call to bundle descriptor rest api to get the current bundle
        // information. If the user is not logged in yet we have to call the jsonp
        // version that does not return an object but a method passing the object:
        // rxLoadBundles({...}).
        // Since we do not have this method in Angular (not in bootstrap.js), the workaround is to
        // read the jsonp answer as text, extract the content withing the method call using regexp
        // and then parse the bundle descriptor object.
        RxBundleService.prototype.getFromJsonp = function (bundleId) {
            return this.httpClient.get(this.baseUrl + bundleId + '/jsonp', { responseType: 'text' }).pipe(operators.map(function (jsonpResult) {
                return JSON.parse(/\(([^)]+)\)/.exec(jsonpResult)[1]);
            }));
        };
        RxBundleService.prototype.loadBundles = function (bundleIds, force) {
            var _this = this;
            var loaders$ = bundleIds.map(function (bundleId) { return _this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(operators.tap(function (bundleDescriptor) {
                if (force ||
                    bundleDescriptor.uiOptions.options.loadCss === RxBundleLoadType.always ||
                    lodash.includes(bundleDescriptor.uiOptions.applicationInitializers, _this.rxGlobalCacheService.applicationId)) {
                    _this.loadBundleCss(bundleDescriptor);
                }
            }), operators.switchMap(function (bundleDescriptor) { return force ||
                bundleDescriptor.uiOptions.options.loadJs === RxBundleLoadType.always ||
                lodash.includes(bundleDescriptor.uiOptions.applicationInitializers, _this.rxGlobalCacheService.applicationId)
                ? _this.loadBundle(bundleDescriptor)
                : rxjs.of({ bundleId: bundleDescriptor.id, isBundleCompiled: false, isFileLoaded: false }); })); });
            return rxjs.forkJoin(loaders$);
        };
        RxBundleService.prototype.loadBundle = function (bundleDescriptor) {
            var _this = this;
            if (!this.bundleJs[bundleDescriptor.id]) {
                this.bundleJs[bundleDescriptor.id] = this.loadBundleJs(bundleDescriptor).pipe(operators.switchMap(function (bundleContext) { return _this.compileBundle(bundleContext); }), operators.shareReplay(1));
            }
            return this.bundleJs[bundleDescriptor.id];
        };
        RxBundleService.prototype.compileBundle = function (bundleContext) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                var _a, _b;
                if (bundleContext.isFileLoaded) {
                    bundleContext.module.then(function (module) {
                        var moduleName = lodash.upperFirst(lodash.camelCase(bundleContext.bundleId)) + "Module";
                        try {
                            var factory = _this.compiler.compileModuleSync(module[moduleName]);
                            if (factory) {
                                factory.create(_this.injector);
                                bundleContext.isBundleCompiled = true;
                                _this.rxLogService.debug(bundleContext.bundleId + ": loaded successfully.");
                            }
                            else {
                                _this.rxLogService.error("ERROR! " + bundleContext.bundleId + ": cannot find module factory for " + moduleName + ".");
                            }
                        }
                        catch (error) {
                            _this.rxLogService.error("ERROR! " + bundleContext.bundleId + ":\n" + error);
                        }
                        observer.next(bundleContext);
                        observer.complete();
                    });
                }
                else {
                    _this.rxLogService.error("ERROR! " + bundleContext.bundleId + ":\n" + ((_b = (_a = bundleContext.message) === null || _a === void 0 ? void 0 : _a.stack) !== null && _b !== void 0 ? _b : bundleContext.message));
                    observer.next(bundleContext);
                    observer.complete();
                }
            });
        };
        RxBundleService.prototype.loadBundleJs = function (bundleDescriptor) {
            var dasherizedBundleId = bundleDescriptor.id.replace(/\./g, '-');
            var cacheBuster = new Date(bundleDescriptor.lastDeployedTime).getTime();
            var fileName = "../" + bundleDescriptor.id + "/scripts/libs_" + dasherizedBundleId + "_src_index_ts.js?_v=" + cacheBuster;
            var modulePathMapping = "./libs/" + dasherizedBundleId + "/src/index.ts";
            this.rxLogService.debug(bundleDescriptor.id + ": loading from " + fileName + ".");
            // WARNING! webpackIgnore comment below is critical for dynamic imports to work, DO NOT REMOVE!
            var module = import(/* webpackIgnore: true */ "" + fileName).then(
            // WARNING! comment below is critical for dynamic imports to work, DO NOT REMOVE!
            // @ts-ignore
            __webpack_require__.bind(null, "" + modulePathMapping));
            return new rxjs.Observable(function (observer) {
                module.then(function () {
                    observer.next({
                        bundleId: bundleDescriptor.id,
                        isBundleCompiled: false,
                        isFileLoaded: true,
                        module: module
                    });
                    observer.complete();
                }, function (error) {
                    observer.next({
                        bundleId: bundleDescriptor.id,
                        isBundleCompiled: false,
                        isFileLoaded: false,
                        message: error
                    });
                    observer.complete();
                });
            });
        };
        RxBundleService.prototype.loadBundleCss = function (bundleDescriptor) {
            if (!this.bundleCss[bundleDescriptor.id]) {
                var cacheBuster = new Date(bundleDescriptor.lastDeployedTime).getTime();
                var link = document.createElement('link');
                link.id = bundleDescriptor.id;
                link.href = "/" + bundleDescriptor.id + "/scripts/" + bundleDescriptor.id.replace(/\./g, '-') + ".css?_v=" + cacheBuster;
                link.type = 'text/css';
                link.rel = 'stylesheet';
                this.document.head.appendChild(link);
                this.bundleCss[bundleDescriptor.id] = true;
            }
        };
        return RxBundleService;
    }());
    RxBundleService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleService, deps: [{ token: i3.DOCUMENT }, { token: i0__namespace.Compiler }, { token: i1__namespace.HttpClient }, { token: i0__namespace.Injector }, { token: RxGlobalCacheService }, { token: RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxBundleService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: i0__namespace.Compiler }, { type: i1__namespace.HttpClient }, { type: i0__namespace.Injector }, { type: RxGlobalCacheService }, { type: RxLogService }];
        } });

    var bundleTypes = {
        application: 'Application',
        library: 'Library'
    };
    var definitionScopeNames = {
        application: bundleTypes.application,
        library: bundleTypes.library,
        public: 'Public'
    };
    var definitionScopeTypes = {
        bundle: 'BUNDLE',
        public: 'PUBLIC'
    };
    var RX_BUNDLE = {
        bundleTypes: bundleTypes,
        definitionScopeNames: definitionScopeNames,
        definitionScopeTypes: definitionScopeTypes,
        definitionScopes: {
            application: {
                displayName: definitionScopeNames.application,
                type: definitionScopeTypes.bundle
            },
            library: {
                displayName: definitionScopeNames.library,
                type: definitionScopeTypes.bundle
            },
            public: {
                displayName: definitionScopeNames.public,
                type: definitionScopeTypes.public
            }
        },
        applicationDefinitionScopeSelectionOptions: [
            {
                id: definitionScopeTypes.bundle,
                name: definitionScopeNames.application
            },
            {
                id: definitionScopeTypes.public,
                name: definitionScopeNames.public
            }
        ],
        libraryDefinitionScopeSelectionOptions: [
            {
                id: definitionScopeTypes.bundle,
                name: definitionScopeNames.library
            },
            {
                id: definitionScopeTypes.public,
                name: definitionScopeNames.public
            }
        ]
    };

    var RxDefinitionService = /** @class */ (function () {
        function RxDefinitionService() {
        }
        RxDefinitionService.prototype.getScopeName = function (definitionScopeType, bundleDescriptor) {
            return definitionScopeType === RX_BUNDLE.definitionScopeTypes.bundle
                ? bundleDescriptor.isApplication
                    ? RX_BUNDLE.definitionScopeNames.application
                    : RX_BUNDLE.definitionScopeNames.library
                : RX_BUNDLE.definitionScopeNames.public;
        };
        return RxDefinitionService;
    }());
    RxDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxBundleCacheService = /** @class */ (function () {
        function RxBundleCacheService(rxActionTypeDataPageService, rxLogService, rxGlobalCacheService, rxDefinitionService) {
            this.rxActionTypeDataPageService = rxActionTypeDataPageService;
            this.rxLogService = rxLogService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxDefinitionService = rxDefinitionService;
            this.actionTypes$ = this.rxActionTypeDataPageService
                .get({ params: { requireDependent: true } })
                .pipe(operators.map(function (actionTypes) { return actionTypes.data; }), operators.shareReplay(1));
            this.bundleIdSubject$ = new rxjs.ReplaySubject(1);
            this.bundleId$ = this.bundleIdSubject$.asObservable();
        }
        Object.defineProperty(RxBundleCacheService.prototype, "bundleId", {
            get: function () {
                return this.bundleIdValue;
            },
            set: function (value) {
                this.bundleIdValue = value;
                this.bundleIdSubject$.next(value);
                this.rxLogService.debug("RxBundleCacheService: bundle ID set to " + value);
            },
            enumerable: false,
            configurable: true
        });
        RxBundleCacheService.prototype.getActionTypes = function () {
            return this.actionTypes$;
        };
        RxBundleCacheService.prototype.getCurrentBundleDescriptor = function () {
            var _this = this;
            return this.bundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleDescriptor(bundleId); }));
        };
        RxBundleCacheService.prototype.getDefinitionScopeName = function (definitionScopeType) {
            var _this = this;
            return this.getCurrentBundleDescriptor().pipe(operators.map(function (bundleDescriptor) { return _this.rxDefinitionService.getScopeName(definitionScopeType, bundleDescriptor); }));
        };
        RxBundleCacheService.prototype.getDefinitionScopeSelectionOptions = function () {
            return this.getCurrentBundleDescriptor().pipe(operators.map(function (bundleDescriptor) { return bundleDescriptor.isApplication
                ? RX_BUNDLE.applicationDefinitionScopeSelectionOptions
                : RX_BUNDLE.libraryDefinitionScopeSelectionOptions; }));
        };
        return RxBundleCacheService;
    }());
    RxBundleCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleCacheService, deps: [{ token: RxActionTypeDataPageService }, { token: RxLogService }, { token: RxGlobalCacheService }, { token: RxDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxBundleCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBundleCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxActionTypeDataPageService }, { type: RxLogService }, { type: RxGlobalCacheService }, { type: RxDefinitionService }]; } });

    var RxComponentCanDeactivateGuard = /** @class */ (function () {
        function RxComponentCanDeactivateGuard(router, rxModalService, rxUtilityModalsService) {
            var _this = this;
            this.router = router;
            this.rxModalService = rxModalService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.isEnabled = true;
            window.addEventListener('beforeunload', function (event) {
                var _a;
                if (_this.isEnabled &&
                    (((_a = _this.pageComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) === false ||
                        _this.rxModalService.isAnyDockedPanelDirty() ||
                        _this.rxModalService.isAnyModalDirty())) {
                    event.returnValue = true;
                }
            });
            this.router.events.pipe(operators.filter(function (event) { return event instanceof i3$1.NavigationEnd; })).subscribe(function () { return _this.enable(); });
        }
        RxComponentCanDeactivateGuard.prototype.canDeactivate = function (component) {
            var _a;
            if (this.isEnabled && (this.rxModalService.isAnyDockedPanelDirty() || this.rxModalService.isAnyModalDirty())) {
                return this.rxUtilityModalsService.confirmUnsavedChanges();
            }
            else if (this.isEnabled && ((_a = this.pageComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) === false) {
                return this.pageComponent.confirmDeactivation();
            }
            else {
                return true;
            }
        };
        RxComponentCanDeactivateGuard.prototype.setPageComponent = function (component) {
            this.pageComponent = component;
        };
        RxComponentCanDeactivateGuard.prototype.enable = function () {
            this.isEnabled = true;
        };
        RxComponentCanDeactivateGuard.prototype.disable = function () {
            this.isEnabled = false;
        };
        return RxComponentCanDeactivateGuard;
    }());
    RxComponentCanDeactivateGuard.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentCanDeactivateGuard, deps: [{ token: i3__namespace.Router }, { token: i2__namespace.RxModalService }, { token: i2__namespace.RxUtilityModalsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxComponentCanDeactivateGuard.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentCanDeactivateGuard, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentCanDeactivateGuard, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.Router }, { type: i2__namespace.RxModalService }, { type: i2__namespace.RxUtilityModalsService }]; } });

    var RxApplicationLoaderService = /** @class */ (function () {
        function RxApplicationLoaderService(document) {
            this.document = document;
        }
        RxApplicationLoaderService.prototype.removeApplicationLoader = function () {
            var applicationLoaderId = 'rx-application-loader-container';
            var applicationLoaderElement = this.document.getElementById(applicationLoaderId);
            if (applicationLoaderElement) {
                applicationLoaderElement.remove();
            }
        };
        return RxApplicationLoaderService;
    }());
    RxApplicationLoaderService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationLoaderService, deps: [{ token: i3.DOCUMENT }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplicationLoaderService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationLoaderService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationLoaderService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }];
        } });

    var RX_DEFAULT_STRINGS = new i0.InjectionToken('RX_DEFAULT_STRINGS');

    var RxRssoDebugService = /** @class */ (function () {
        function RxRssoDebugService(rxBuildEnvironment) {
            this.rxBuildEnvironment = rxBuildEnvironment;
        }
        RxRssoDebugService.prototype.isRssoDebugEnabled = function () {
            return i0.isDevMode() && Boolean(this.rxBuildEnvironment.isRssoDebugEnabled);
        };
        return RxRssoDebugService;
    }());
    RxRssoDebugService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRssoDebugService, deps: [{ token: RX_BUILD_ENVIRONMENT }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRssoDebugService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRssoDebugService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRssoDebugService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [RX_BUILD_ENVIRONMENT]
                        }] }];
        } });

    var SUPPORTED_LOCALES = {
        de: { adapt: 'de-de' },
        en: { adapt: 'en-us' },
        es: { adapt: 'es-es' },
        fr: { adapt: 'fr-fr' },
        it: { adapt: 'it-it' },
        ja: { adapt: 'ja-jp' },
        ko: { adapt: 'ko-kr' },
        nl: { adapt: 'nl-nl' },
        pt: { adapt: 'pt-br' },
        ru: { adapt: 'ru-ru' },
        sv: { adapt: 'sv-se' },
        da: { adapt: 'da-dk' },
        no: { moment: 'nb', angular: 'nb', adapt: 'no-no', similar: ['nb', 'nn'] },
        'zh-Hans': { moment: 'zh-CN', adapt: 'zh-cn', similar: ['zh-CN'] }
    };
    var LOGIN_LOCALE = 'login';
    var DEFAULT_LOCALE = 'en';
    var RxLocalizationService = /** @class */ (function () {
        function RxLocalizationService(httpClient, translateService, rxCurrentUserService, adaptTranslateService, rxRssoDebugService, document, defaultStrings) {
            var _this = this;
            this.httpClient = httpClient;
            this.translateService = translateService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.adaptTranslateService = adaptTranslateService;
            this.rxRssoDebugService = rxRssoDebugService;
            this.document = document;
            this.defaultStrings = defaultStrings;
            this.currentLocale = DEFAULT_LOCALE;
            this.angularLocale = DEFAULT_LOCALE;
            this.onTranslationsLoaded$ = this.translateService.onLangChange.pipe(operators.shareReplay(1));
            this.loginLocalizedStrings$ = this.getLocalizedStringsForLoginPage().pipe(operators.shareReplay(1));
            this.preferredLocale$ = this.rxCurrentUserService.user$.pipe(operators.filter(Boolean), operators.take(1), operators.map(function () { return _this.rxCurrentUserService.getPreferredLocale() || _this.rxCurrentUserService.getPreferredUserLocale(); }), operators.switchMap(function (preferredLocale) { return preferredLocale
                ? rxjs.of(preferredLocale)
                : _this.loginLocalizedStrings$.pipe(operators.map(function (response) { return Object.keys(response.body)[0]; })); }), operators.map(function (locale) { return _this.normalizeLocale(locale); }), operators.shareReplay(1));
        }
        RxLocalizationService.prototype.getDefaultApplicationStrings = function () {
            return this.defaultStrings;
        };
        RxLocalizationService.prototype.setDefaultApplicationStrings = function (defaultApplicationStrings) {
            this.defaultStrings = Object.assign(Object.assign({}, this.defaultStrings), defaultApplicationStrings);
        };
        RxLocalizationService.prototype.initLoginTranslations = function () {
            var _this = this;
            return this.loginLocalizedStrings$.pipe(operators.map(function (response) { return response.body; }), operators.tap(function (payload) {
                var localeKey = Object.keys(payload)[0];
                _this.setLocale(_this.normalizeLocale(localeKey));
                _this.translateService.setTranslation(LOGIN_LOCALE, payload[localeKey], true);
            }), operators.switchMap(function () { return _this.translateService.use(LOGIN_LOCALE); }));
        };
        RxLocalizationService.prototype.initTranslations = function (useDefault) {
            var _this = this;
            if (useDefault === void 0) { useDefault = false; }
            return (useDefault ? rxjs.of(DEFAULT_LOCALE) : this.preferredLocale$).pipe(operators.switchMap(function (locale) { return _this.translateService.use(locale).pipe(operators.mapTo(locale)); }), operators.tap(function (locale) {
                _this.setLocale(locale);
                var adaptLocale = _this.getCurrentLocaleDescriptor().adapt;
                Object.assign(_this.adaptTranslateService.languages[adaptLocale], {
                    'adapt.rx.error.min': _this.translateService.instant('com.bmc.arsys.rx.client.error.min'),
                    'adapt.rx.error.max': _this.translateService.instant('com.bmc.arsys.rx.client.error.max'),
                    'adapt.rx.error.required': _this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message'),
                    'adapt.select.emptyStateDescription': ''
                });
            }));
        };
        RxLocalizationService.prototype.setLocale = function (locale) {
            this.currentLocale = locale;
            this.setDocumentLang(this.currentLocale);
            var descriptor = this.getCurrentLocaleDescriptor();
            this.adaptTranslateService.useLanguage(descriptor.adapt);
            moment__default["default"].locale(descriptor.moment);
            this.angularLocale = descriptor.angular;
        };
        RxLocalizationService.prototype.getCurrentLocaleDescriptor = function () {
            var _this = this;
            var locale = lodash.findKey(SUPPORTED_LOCALES, function (localeInfo, key) {
                var language = _this.currentLocale.split('-')[0];
                return (key === _this.currentLocale ||
                    key === language ||
                    lodash.some(localeInfo.similar, function (item) { return item === _this.currentLocale || item === language; }));
            });
            return {
                angular: locale ? SUPPORTED_LOCALES[locale].angular || locale : DEFAULT_LOCALE,
                moment: (SUPPORTED_LOCALES[locale] && SUPPORTED_LOCALES[locale].moment) || this.currentLocale,
                adapt: (SUPPORTED_LOCALES[locale] && SUPPORTED_LOCALES[locale].adapt) || SUPPORTED_LOCALES[DEFAULT_LOCALE].adapt
            };
        };
        RxLocalizationService.prototype.getLocalizedStringsForLoginPage = function () {
            // When debugging on an RSSO environment, this (/api/rx/application/logincontent/login.json) call fails
            // repeatedly with a http 401 error,so we have bypassed it. This call is only useful for the Innovation
            // Studio login page which is not accessed in RSSO environment.
            return this.rxRssoDebugService.isRssoDebugEnabled()
                ? rxjs.of()
                : this.httpClient.get('/api/rx/application/logincontent/login.json', {
                    observe: 'response'
                });
        };
        RxLocalizationService.prototype.setDocumentLang = function (lang) {
            this.document.documentElement.setAttribute('lang', lang);
        };
        // Safari returns the web browser locale information Region in lowercase
        // en-us instead of en-US which causes issues with localized field.
        RxLocalizationService.prototype.normalizeLocale = function (locale) {
            var localeInformation = locale.split('-');
            if (localeInformation.length > 1) {
                localeInformation[1] = localeInformation[1].toUpperCase();
            }
            return localeInformation.join('-');
        };
        return RxLocalizationService;
    }());
    RxLocalizationService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace$1.TranslateService }, { token: RxCurrentUserService }, { token: i4__namespace.AdaptTranslateService }, { token: RxRssoDebugService }, { token: i3.DOCUMENT }, { token: RX_DEFAULT_STRINGS }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLocalizationService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace.HttpClient }, { type: i2__namespace$1.TranslateService }, { type: RxCurrentUserService }, { type: i4__namespace.AdaptTranslateService }, { type: RxRssoDebugService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [RX_DEFAULT_STRINGS]
                        }] }];
        } });

    var RxLoginLocalizationResolver = /** @class */ (function () {
        function RxLoginLocalizationResolver(rxLocalizationService) {
            this.rxLocalizationService = rxLocalizationService;
        }
        RxLoginLocalizationResolver.prototype.resolve = function (route, state) {
            return this.rxLocalizationService.initLoginTranslations();
        };
        return RxLoginLocalizationResolver;
    }());
    RxLoginLocalizationResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoginLocalizationResolver, deps: [{ token: RxLocalizationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLoginLocalizationResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoginLocalizationResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoginLocalizationResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxLocalizationService }]; } });

    var RxLocalizedStringsLoaderService = /** @class */ (function () {
        function RxLocalizedStringsLoaderService(httpClient) {
            this.httpClient = httpClient;
            this.baseUrl = '/api/rx/application/localizedstrings';
        }
        RxLocalizedStringsLoaderService.prototype.getTranslation = function (locale) {
            return locale === 'login' ? rxjs.of({}) : this.httpClient.get(this.baseUrl + "?locale=" + locale);
        };
        RxLocalizedStringsLoaderService.prototype.uploadTranslation = function (bundleId, locale, translations) {
            return this.httpClient.post(this.baseUrl + "/" + bundleId + "?locale=" + locale, translations);
        };
        return RxLocalizedStringsLoaderService;
    }());
    RxLocalizedStringsLoaderService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedStringsLoaderService, deps: [{ token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLocalizedStringsLoaderService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedStringsLoaderService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedStringsLoaderService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }]; } });

    var RxMissingTranslationHandler = /** @class */ (function () {
        function RxMissingTranslationHandler(injector) {
            this.injector = injector;
        }
        RxMissingTranslationHandler.prototype.handle = function (params) {
            this.rxLocalizationService = this.rxLocalizationService || this.injector.get(RxLocalizationService);
            var defaultApplicationStrings = this.rxLocalizationService.getDefaultApplicationStrings();
            return defaultApplicationStrings.hasOwnProperty(params.key)
                ? params.translateService.parser.interpolate(defaultApplicationStrings[params.key], params.interpolateParams)
                : params.key;
        };
        return RxMissingTranslationHandler;
    }());
    RxMissingTranslationHandler.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMissingTranslationHandler, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxMissingTranslationHandler.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMissingTranslationHandler, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMissingTranslationHandler, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    // AoT requires an exported function for factories
    function LocalizedStringsLoaderFactory(http) {
        return new RxLocalizedStringsLoaderService(http);
    }
    // https://stackoverflow.com/questions/44287827/dynamically-change-locale-for-datepipe-in-angular-2/49675774#49675774
    // https://github.com/angular/angular/issues/15039
    var DynamicLocaleId = /** @class */ (function (_super) {
        __extends(DynamicLocaleId, _super);
        function DynamicLocaleId(rxLocalizationService) {
            var _this = _super.call(this) || this;
            _this.rxLocalizationService = rxLocalizationService;
            return _this;
        }
        DynamicLocaleId.prototype.toString = function () {
            return this.rxLocalizationService.angularLocale;
        };
        return DynamicLocaleId;
    }(String));
    var RxLocalizationModule = /** @class */ (function () {
        function RxLocalizationModule() {
            [
                localeDe__default["default"],
                localeEs__default["default"],
                localeFr__default["default"],
                localeIt__default["default"],
                localeJa__default["default"],
                localeKo__default["default"],
                localeNb__default["default"],
                localeNl__default["default"],
                localeRu__default["default"],
                localeSv__default["default"],
                localePt__default["default"],
                localeDa__default["default"],
                localeZhHans__default["default"]
            ].forEach(function (locale) { return i3.registerLocaleData(locale); });
        }
        return RxLocalizationModule;
    }());
    RxLocalizationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxLocalizationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationModule, imports: [i3.CommonModule, i2__namespace$1.TranslateModule] });
    RxLocalizationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationModule, providers: [
            {
                provide: i0.LOCALE_ID,
                deps: [RxLocalizationService],
                useClass: DynamicLocaleId
            }
        ], imports: [[
                i3.CommonModule,
                i2$1.TranslateModule.forRoot({
                    loader: {
                        provide: i2$1.TranslateLoader,
                        useFactory: LocalizedStringsLoaderFactory,
                        deps: [i1.HttpClient, i0.Injector]
                    },
                    missingTranslationHandler: {
                        provide: i2$1.MissingTranslationHandler,
                        useClass: RxMissingTranslationHandler,
                        deps: [i0.Injector]
                    }
                })
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3.CommonModule,
                            i2$1.TranslateModule.forRoot({
                                loader: {
                                    provide: i2$1.TranslateLoader,
                                    useFactory: LocalizedStringsLoaderFactory,
                                    deps: [i1.HttpClient, i0.Injector]
                                },
                                missingTranslationHandler: {
                                    provide: i2$1.MissingTranslationHandler,
                                    useClass: RxMissingTranslationHandler,
                                    deps: [i0.Injector]
                                }
                            })
                        ],
                        providers: [
                            {
                                provide: i0.LOCALE_ID,
                                deps: [RxLocalizationService],
                                useClass: DynamicLocaleId
                            }
                        ]
                    }]
            }], ctorParameters: function () { return []; } });

    var RxApplicationResolver = /** @class */ (function () {
        function RxApplicationResolver(document, rxBuildEnvironment, injector, compiler, rxBundleService, rxLogService, rxBundleCacheService, rxComponentCanDeactivateGuard, rxGlobalCacheService, rxApplicationLoaderService, rxLocalizationService) {
            var _this = this;
            this.document = document;
            this.rxBuildEnvironment = rxBuildEnvironment;
            this.injector = injector;
            this.compiler = compiler;
            this.rxBundleService = rxBundleService;
            this.rxLogService = rxLogService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxApplicationLoaderService = rxApplicationLoaderService;
            this.rxLocalizationService = rxLocalizationService;
            var prodBundleDescriptors$ = this.rxGlobalCacheService
                .getBundleDescriptors()
                .pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.filter(function (bundleDescriptor) { return bundleDescriptor.containsAngular; }); }));
            var devBundleDescriptors$ = prodBundleDescriptors$.pipe(operators.map(function (bundleDescriptors) { return bundleDescriptors.filter(function (bundleDescriptor) { return bundleDescriptor.id !== _this.rxBuildEnvironment.bundleId; }); }));
            this.devResolver$ = rxjs.iif(function () { return lodash.isUndefined(_this.rxBuildEnvironment.bundleId); }, rxjs.of([]), devBundleDescriptors$);
            this.prodResolver$ = prodBundleDescriptors$;
        }
        RxApplicationResolver.prototype.resolve = function (route) {
            var applicationId = lodash.head(route.url).path;
            if (this.rxGlobalCacheService.applicationId && applicationId !== this.rxGlobalCacheService.applicationId) {
                this.rxComponentCanDeactivateGuard.disable();
                window.location.reload();
            }
            this.rxGlobalCacheService.applicationId = applicationId;
            var bundleId = route.params['bundleId'];
            if (bundleId !== RX_APPLICATION.innovationStudioBundleId) {
                this.rxBundleCacheService.bundleId = bundleId;
            }
            var useDefaultLang = this.rxGlobalCacheService.applicationId === RX_APPLICATION.innovationStudioBundleId;
            var initTranslations$ = this.rxLocalizationService.initTranslations(useDefaultLang);
            return rxjs.combineLatest([initTranslations$, this.getResolver()]);
        };
        RxApplicationResolver.prototype.getResolver = function () {
            var _this = this;
            return rxjs.iif(function () { return i0.isDevMode(); }, this.devResolver$, this.prodResolver$).pipe(operators.switchMap(function (bundles) {
                if (lodash.isEmpty(bundles)) {
                    return rxjs.of(bundles);
                }
                var bundleIds = bundles.map(function (bundleDescriptor) { return bundleDescriptor.id; });
                return _this.rxBundleService.loadBundles(bundleIds, false);
            }), operators.tap(function () { return _this.rxApplicationLoaderService.removeApplicationLoader(); }), operators.shareReplay(1));
        };
        return RxApplicationResolver;
    }());
    RxApplicationResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationResolver, deps: [{ token: i3.DOCUMENT }, { token: RX_BUILD_ENVIRONMENT }, { token: i0__namespace.Injector }, { token: i0__namespace.Compiler }, { token: RxBundleService }, { token: RxLogService }, { token: RxBundleCacheService }, { token: RxComponentCanDeactivateGuard }, { token: RxGlobalCacheService }, { token: RxApplicationLoaderService }, { token: RxLocalizationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplicationResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [RX_BUILD_ENVIRONMENT]
                        }] }, { type: i0__namespace.Injector }, { type: i0__namespace.Compiler }, { type: RxBundleService }, { type: RxLogService }, { type: RxBundleCacheService }, { type: RxComponentCanDeactivateGuard }, { type: RxGlobalCacheService }, { type: RxApplicationLoaderService }, { type: RxLocalizationService }];
        } });

    // @dynamic
    var RxRootInjector = /** @class */ (function () {
        function RxRootInjector() {
        }
        return RxRootInjector;
    }());

    var _a$1;
    exports.NotificationType = void 0;
    (function (NotificationType) {
        NotificationType["Success"] = "rx-messageduration-success";
        NotificationType["Info"] = "rx-messageduration-info";
        NotificationType["Warning"] = "rx-messageduration-warn";
        NotificationType["Error"] = "rx-messageduration-error";
    })(exports.NotificationType || (exports.NotificationType = {}));
    var RX_DEFAULT_NOTIFICATION_SETTINGS = (_a$1 = {},
        _a$1[exports.NotificationType.Success] = { ttl: 3000 },
        _a$1[exports.NotificationType.Info] = { ttl: 3000 },
        _a$1[exports.NotificationType.Warning] = { ttl: 6000 },
        _a$1[exports.NotificationType.Error] = { ttl: 6000 },
        _a$1);

    var RxNotificationService = /** @class */ (function () {
        function RxNotificationService(rxLogService, translateService, rxAdminSettingsService, rxCurrentUserService) {
            this.rxLogService = rxLogService;
            this.translateService = translateService;
            this.rxAdminSettingsService = rxAdminSettingsService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.issuesToReportSubject$ = new rxjs.Subject();
            this.notificationSettings = RX_DEFAULT_NOTIFICATION_SETTINGS;
            this.componentName = 'InnovationSuiteServerSetting';
            this.messagesSubject = new rxjs.Subject();
            this.messages$ = this.messagesSubject.asObservable();
            this.issuesToReport$ = this.issuesToReportSubject$.asObservable();
        }
        RxNotificationService.prototype.addErrorMessage = function (message, title, config) {
            if (config === void 0) { config = {}; }
            if (lodash.isNil(title)) {
                title = this.translateService.instant('com.bmc.arsys.rx.client.common.error.label');
            }
            this.messagesSubject.next({
                severity: 'error',
                summary: title,
                detail: message,
                life: config.ttl || this.notificationSettings[exports.NotificationType.Error].ttl,
                sticky: this.isSticky(config.ttl, exports.NotificationType.Error),
                data: config.issue
            });
            if (!config.suppressLog) {
                this.rxLogService.error(title + ": " + message);
            }
        };
        RxNotificationService.prototype.addWarningMessage = function (message, title, config) {
            if (config === void 0) { config = {}; }
            if (lodash.isNil(title)) {
                title = this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label');
            }
            this.messagesSubject.next({
                severity: 'warn',
                summary: title,
                detail: message,
                life: config.ttl || this.notificationSettings[exports.NotificationType.Warning].ttl,
                sticky: this.isSticky(config.ttl, exports.NotificationType.Warning),
                data: config.issue
            });
            this.rxLogService.warning(title + ": " + message);
        };
        RxNotificationService.prototype.addInfoMessage = function (message, title, config) {
            if (config === void 0) { config = {}; }
            if (lodash.isNil(title)) {
                title = this.translateService.instant('com.bmc.arsys.rx.client.common.info.label');
            }
            this.messagesSubject.next({
                severity: 'info',
                summary: title,
                detail: message,
                life: config.ttl || this.notificationSettings[exports.NotificationType.Info].ttl,
                sticky: this.isSticky(config.ttl, exports.NotificationType.Info)
            });
            this.rxLogService.info(title + ": " + message);
        };
        RxNotificationService.prototype.addSuccessMessage = function (message, title, config) {
            if (config === void 0) { config = {}; }
            if (lodash.isNil(title)) {
                title = this.translateService.instant('com.bmc.arsys.rx.client.common.success.label');
            }
            this.messagesSubject.next({
                severity: 'success',
                summary: title,
                detail: message,
                life: config.ttl || this.notificationSettings[exports.NotificationType.Success].ttl,
                sticky: this.isSticky(config.ttl, exports.NotificationType.Success)
            });
            this.rxLogService.debug(title + ": " + message);
        };
        RxNotificationService.prototype.reportIssue = function (issue) {
            this.issuesToReportSubject$.next(issue);
        };
        RxNotificationService.prototype.initialize = function () {
            var _this = this;
            this.rxCurrentUserService.user$
                .pipe(operators.filter(function (user) { return Boolean(user); }), operators.switchMap(function () {
                if (_this.rxCurrentUserService.isAdministrator()) {
                    return _this.rxAdminSettingsService.getComponentSettings(_this.componentName).pipe(operators.tap(function (settings) {
                        lodash.values(exports.NotificationType).forEach(function (notificationType) {
                            var notificationSettings = lodash.find(settings.values, ['settingName', notificationType]);
                            if (notificationSettings && notificationSettings.settingValue) {
                                _this.notificationSettings[notificationType].ttl =
                                    lodash.toNumber(notificationSettings.settingValue) * 1000;
                            }
                        });
                    }), operators.catchError(function (err) {
                        _this.rxLogService.warning('Notification Message Preferences cannot be applied. Default values will be used.');
                        return rxjs.throwError(err);
                    }));
                }
                else {
                    _this.rxLogService.debug('Notification Message Preferences cannot be applied since the current user is not a administrator.');
                    return rxjs.EMPTY;
                }
            }))
                .subscribe();
        };
        RxNotificationService.prototype.isSticky = function (ttl, messageType) {
            return lodash.isUndefined(ttl) ? this.notificationSettings[messageType].ttl === 0 : ttl === 0;
        };
        return RxNotificationService;
    }());
    RxNotificationService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationService, deps: [{ token: RxLogService }, { token: i2__namespace$1.TranslateService }, { token: RxAdminSettingsService }, { token: RxCurrentUserService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNotificationService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxLogService }, { type: i2__namespace$1.TranslateService }, { type: RxAdminSettingsService }, { type: RxCurrentUserService }]; } });

    var RxUpgradeTrackerService = /** @class */ (function () {
        function RxUpgradeTrackerService(rxLocalizationService, rxNotificationService, rxSystemConfigurationService) {
            this.rxLocalizationService = rxLocalizationService;
            this.rxNotificationService = rxNotificationService;
            this.rxSystemConfigurationService = rxSystemConfigurationService;
            this._isUpgradeInProgress = false;
            this._upgradeMessage = '';
            this.isUpgradeInProgressSubject = new rxjs.Subject();
            this.isUpgradeInProgress$ = this.isUpgradeInProgressSubject.asObservable();
        }
        Object.defineProperty(RxUpgradeTrackerService.prototype, "upgradeMessage", {
            get: function () {
                return this._upgradeMessage;
            },
            set: function (message) {
                this._upgradeMessage = message;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RxUpgradeTrackerService.prototype, "isUpgradeInProgress", {
            get: function () {
                return this._isUpgradeInProgress;
            },
            set: function (isUpgradeInProgress) {
                var hasStatusChanged = this._isUpgradeInProgress !== isUpgradeInProgress;
                this._isUpgradeInProgress = isUpgradeInProgress;
                if (!this._isUpgradeInProgress) {
                    this._upgradeMessage = '';
                }
                if (hasStatusChanged) {
                    this.isUpgradeInProgressSubject.next(isUpgradeInProgress);
                }
            },
            enumerable: false,
            configurable: true
        });
        RxUpgradeTrackerService.prototype.getUpgradeNotification = function () {
            var upgradeNotification;
            if (!this._upgradeMessage) {
                upgradeNotification = this.rxSystemConfigurationService.getConfiguration('Upgrade-Notification-Text');
            }
            else {
                upgradeNotification = rxjs.of({
                    id: '',
                    name: '',
                    value: this._upgradeMessage
                });
            }
            return upgradeNotification;
        };
        RxUpgradeTrackerService.prototype.displayUpgradeNotification = function (forceNotification) {
            var _this = this;
            if (this.isUpgradeInProgress && (!this.upgradeMessage || forceNotification)) {
                rxjs.combineLatest([this.getUpgradeNotification(), this.rxLocalizationService.onTranslationsLoaded$])
                    .pipe(operators.first())
                    .subscribe(function (_a) {
                    var _b = __read(_a, 1), upgradeMessage = _b[0];
                    _this.upgradeMessage = upgradeMessage.value;
                    _this.rxNotificationService.addWarningMessage(_this.upgradeMessage);
                });
            }
        };
        return RxUpgradeTrackerService;
    }());
    RxUpgradeTrackerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUpgradeTrackerService, deps: [{ token: RxLocalizationService }, { token: RxNotificationService }, { token: RxSystemConfigurationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUpgradeTrackerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUpgradeTrackerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUpgradeTrackerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxLocalizationService }, { type: RxNotificationService }, { type: RxSystemConfigurationService }]; } });

    var RxApplicationConfiguratorService = /** @class */ (function () {
        function RxApplicationConfiguratorService(injector, rxUpgradeTrackerService, rxGlobalCacheService, document, router, adaptModalService, adaptDockedPanelService) {
            this.rxUpgradeTrackerService = rxUpgradeTrackerService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.document = document;
            this.router = router;
            this.adaptModalService = adaptModalService;
            this.adaptDockedPanelService = adaptDockedPanelService;
            RxRootInjector.injector = injector;
        }
        RxApplicationConfiguratorService.prototype.configure = function () {
            var _this = this;
            this.patchCkEditor();
            this.rxGlobalCacheService.applicationId$
                .pipe(operators.filter(Boolean), operators.take(1))
                .subscribe(function (applicationId) { return _this.document.body.parentNode.setAttribute('rx-app', applicationId); });
            this.rxUpgradeTrackerService.isUpgradeInProgress$.subscribe(function () {
                _this.rxUpgradeTrackerService.displayUpgradeNotification(false);
            });
            this.router.events.pipe(operators.filter(function (event) { return event instanceof i3$1.NavigationEnd; })).subscribe(function () {
                _this.adaptModalService.closeAllModals();
                for (var i = _this.adaptDockedPanelService.openedPanels.length - 1; i >= 0; i--) {
                    _this.adaptDockedPanelService.close(_this.adaptDockedPanelService.openedPanels[i].id);
                }
            });
        };
        // monkey patch CKEDITOR.dialog.add method to remove 'popup' option from Link -> Target dropdown
        RxApplicationConfiguratorService.prototype.patchCkEditor = function () {
            var ckEditorDialogAdd = CKEDITOR.dialog.add.bind(CKEDITOR.dialog);
            CKEDITOR.dialog.add = function (name, dialogDefinition) {
                if (typeof dialogDefinition === 'string') {
                    ckEditorDialogAdd(name, dialogDefinition);
                }
                else {
                    var patchedDialogDefinitionFunc = function (editor) {
                        var dialogDefinitionObj = dialogDefinition(editor);
                        if (name === 'link') {
                            var linkTargetConfig = dialogDefinitionObj.contents.find(function (item) { return item.id === 'target'; });
                            lodash.get(linkTargetConfig, 'elements[0].children[0].items').splice(2, 1);
                        }
                        return dialogDefinitionObj;
                    };
                    ckEditorDialogAdd(name, patchedDialogDefinitionFunc);
                }
            };
        };
        return RxApplicationConfiguratorService;
    }());
    RxApplicationConfiguratorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationConfiguratorService, deps: [{ token: i0__namespace.Injector }, { token: RxUpgradeTrackerService }, { token: RxGlobalCacheService }, { token: i3.DOCUMENT }, { token: i3__namespace.Router }, { token: i4__namespace.AdaptModalService }, { token: i4__namespace.AdaptDockedPanelService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplicationConfiguratorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationConfiguratorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationConfiguratorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.Injector }, { type: RxUpgradeTrackerService }, { type: RxGlobalCacheService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: i3__namespace.Router }, { type: i4__namespace.AdaptModalService }, { type: i4__namespace.AdaptDockedPanelService }];
        } });

    var RxApplicationInitializer = i0["ɵmakeDecorator"]('RxApplicationInitializer');

    var RxApplicationRegistryService = /** @class */ (function () {
        function RxApplicationRegistryService(rxGlobalCacheService) {
            this.rxGlobalCacheService = rxGlobalCacheService;
        }
        RxApplicationRegistryService.prototype.register = function (applicationId, initializer) {
            this.rxGlobalCacheService
                .getApplicationBundleDescriptor()
                .pipe(operators.take(1))
                .subscribe(function (bundleDescriptor) {
                if ((bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.id) === applicationId) {
                    initializer.initialize();
                }
            });
        };
        return RxApplicationRegistryService;
    }());
    RxApplicationRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationRegistryService, deps: [{ token: RxGlobalCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplicationRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxGlobalCacheService }]; } });

    var RxFeatureService = /** @class */ (function () {
        function RxFeatureService() {
        }
        RxFeatureService.prototype.enableFeatures = function (featureIds) {
            this.enabledFeatures = featureIds;
        };
        RxFeatureService.prototype.isFeatureEnabled = function (featureId) {
            if (this.enabledFeatures) {
                return this.enabledFeatures.includes(featureId);
            }
        };
        return RxFeatureService;
    }());
    RxFeatureService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFeatureService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFeatureService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFeatureService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFeatureService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxUserService = /** @class */ (function () {
        function RxUserService(httpClient, rxFeatureService, router, rxUrlUtilsService) {
            this.httpClient = httpClient;
            this.rxFeatureService = rxFeatureService;
            this.router = router;
            this.rxUrlUtilsService = rxUrlUtilsService;
        }
        RxUserService.prototype.getUser = function (id, bundleId) {
            var _this = this;
            return this.httpClient
                .get("/api/rx/application/user/" + id, {
                headers: new i1.HttpHeaders({
                    'default-bundle-scope': bundleId !== null && bundleId !== void 0 ? bundleId : ''
                }),
                observe: 'response'
            })
                .pipe(operators.map(function (response) {
                _this.rxFeatureService.enableFeatures((response.headers.get('Enabled-Features') || '').split(','));
                return Object.assign(Object.assign({}, response.body), { modifiedDate: new Date(response.body.modifiedDate), ssoProviderType: response.headers.get('sso-provider-type') });
            }));
        };
        RxUserService.prototype.getCurrentUser = function () {
            return this.getUser('$USER$', this.rxUrlUtilsService.getBundleIdFromUrl());
        };
        return RxUserService;
    }());
    RxUserService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserService, deps: [{ token: i1__namespace.HttpClient }, { token: RxFeatureService }, { token: i3__namespace.Router }, { token: i2__namespace$2.RxUrlUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUserService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: RxFeatureService }, { type: i3__namespace.Router }, { type: i2__namespace$2.RxUrlUtilsService }]; } });

    var RX_USER = {
        userProfileRecordDefinitionName: 'CTM:People',
        userProfilePictureFieldId: 1000003962
    };

    var RX_OVERLAY = {
        bundleCustomizationOperationTypes: {
            createdInThisOverlayGroup: 'CREATED_IN_THIS_OVERLAY_GROUP'
        },
        operationTypes: {
            createdInThisOverlayGroup: 'N/A',
            notCustomizedInThisOverlayGroup: 'Not Customized',
            customizedInThisOverlayGroup: 'Customized'
        },
        customizationPerspective: {
            createdInThisOverlayGroup: 'CREATED_IN_THIS_OVERLAY_GROUP',
            notCustomizedInThisOverlayGroup: 'NOT_CUSTOMIZED_IN_THIS_OVERLAY_GROUP',
            customizedInThisOverlayGroup: 'CUSTOMIZED_IN_THIS_OVERLAY_GROUP'
        },
        overlayTypes: {
            overwrite: 'OVERWRITE',
            additive: 'ADDITIVE',
            unmodified: 'UNMODIFIED'
        },
        overlayAllowedLabels: {
            allowed: 'Allowed',
            notAllowed: 'Not allowed'
        },
        overlayGroupIds: {
            base: '0',
            overlay: '1'
        }
    };

    exports.DevelopmentMode = void 0;
    (function (DevelopmentMode) {
        DevelopmentMode["Base"] = "0";
        DevelopmentMode["BestPractice"] = "1";
    })(exports.DevelopmentMode || (exports.DevelopmentMode = {}));
    exports.OverlayType = void 0;
    (function (OverlayType) {
        OverlayType["Additive"] = "ADDITIVE";
        OverlayType["Overwrite"] = "OVERWRITE";
        OverlayType["Unmodified"] = "UNMODIFIED";
    })(exports.OverlayType || (exports.OverlayType = {}));

    var RxOverlayService = /** @class */ (function () {
        function RxOverlayService(rxTreeService, rxLogService, rxBundleService, rxCurrentUserService, rxGlobalCacheService) {
            this.rxTreeService = rxTreeService;
            this.rxLogService = rxLogService;
            this.rxBundleService = rxBundleService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxGlobalCacheService = rxGlobalCacheService;
        }
        RxOverlayService.prototype.areNewDefinitionsAllowed = function (bundleId) {
            var _this = this;
            return this.rxGlobalCacheService
                .getBundleDescriptor(bundleId)
                .pipe(operators.map(function (bundleDescriptor) { return _this.areNewDefinitionsAllowedSync(bundleDescriptor); }));
        };
        RxOverlayService.prototype.areNewDefinitionsAllowedSync = function (bundleDescriptor) {
            return (this.isBundleEditable(bundleDescriptor.id) &&
                !(bundleDescriptor.platformBundle && this.getCurrentOverlayGroupId() === RX_OVERLAY.overlayGroupIds.overlay));
        };
        RxOverlayService.prototype.setCurrentOverlayContextOnSessionInit = function (user) {
            var userOverlayGroupDescriptors = user.userOverlayGroupDescriptors;
            var defaultOverlayGroupId = user.defaultOverlayGroupId;
            if (!this.userHasAccessToMultipleOverlays(userOverlayGroupDescriptors)) {
                return;
            }
            var savedOverlayGroupId = localStorage.getItem('rx-overlay-group-id');
            var contextDescriptors = this.rxTreeService.flattenTree(userOverlayGroupDescriptors[0], 'userOverlayGroupDescriptorChildren');
            if (savedOverlayGroupId) {
                this.overlay = lodash.find(contextDescriptors, { overlayGroupId: savedOverlayGroupId });
                // use default defaultOverlayGroupId if the saved overlay context is missing in contextDescriptors
                if (!this.overlay) {
                    this.overlay = lodash.find(contextDescriptors, { overlayGroupId: defaultOverlayGroupId });
                    this.rxLogService.debug("Invalid Overlay Group ID: " + savedOverlayGroupId + ". The Overlay Group ID has been set to the default value: " + defaultOverlayGroupId);
                }
            }
            else {
                this.overlay = lodash.find(contextDescriptors, { overlayGroupId: defaultOverlayGroupId });
            }
        };
        RxOverlayService.prototype.getOverlayOperation = function (overlayGroupId, parentOverlayGroupId) {
            var currentOverlayGroupId = this.getCurrentOverlayGroupId();
            var operationType = RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup;
            if (currentOverlayGroupId === overlayGroupId) {
                operationType = parentOverlayGroupId
                    ? RX_OVERLAY.operationTypes.customizedInThisOverlayGroup
                    : RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            }
            return operationType;
        };
        RxOverlayService.prototype.isCustomizationEnabled = function (type, definition) {
            if (definition.lastUpdateTime) {
                var overlayDescriptor = definition.overlayDescriptor || { parentOverlayGroupId: null };
                var overlayOperation = this.getOverlayOperation(definition.overlayGroupId, overlayDescriptor.parentOverlayGroupId);
                if (overlayOperation === RX_OVERLAY.operationTypes.createdInThisOverlayGroup) {
                    return true;
                }
                return lodash.isNull(type) ? false : definition[type];
            }
            else {
                return true;
            }
        };
        RxOverlayService.prototype.isBundleEditable = function (bundleId) {
            return (this.isCurrentOverlayGroupWritable() &&
                (!this.rxCurrentUserService.isBusinessAnalyst() ||
                    lodash.includes(this.rxCurrentUserService.getEditableBundles(), bundleId)));
        };
        RxOverlayService.prototype.isCurrentOverlayGroupWritable = function () {
            var user = this.rxCurrentUserService.get();
            var contextDescriptors = __spreadArray(__spreadArray([], __read(user.userOverlayGroupDescriptors)), __read(user.userOverlayGroupDescriptors[0].userOverlayGroupDescriptorChildren));
            var currentOverlayGroupId = this.getCurrentOverlayGroupId();
            return lodash.find(contextDescriptors, { overlayGroupId: currentOverlayGroupId }).isWritable;
        };
        RxOverlayService.prototype.getCurrentOverlayContext = function () {
            return this.overlay;
        };
        RxOverlayService.prototype.setDevelopmentMode = function (developmentMode) {
            var overlayGroupId = developmentMode === exports.DevelopmentMode.Base ? RX_OVERLAY.overlayGroupIds.base : RX_OVERLAY.overlayGroupIds.overlay;
            localStorage.setItem('rx-overlay-group-id', overlayGroupId);
        };
        RxOverlayService.prototype.getDevelopmentMode = function () {
            var overlayGroupId = this.getCurrentOverlayContext().overlayGroupId;
            return overlayGroupId === RX_OVERLAY.overlayGroupIds.base ? exports.DevelopmentMode.Base : exports.DevelopmentMode.BestPractice;
        };
        RxOverlayService.prototype.userHasAccessToMultipleOverlays = function (overlayGroup) {
            return lodash.get(overlayGroup, '[0].userOverlayGroupDescriptorChildren.length') >= 1;
        };
        RxOverlayService.prototype.getCurrentOverlayGroupId = function () {
            return this.overlay.overlayGroupId || this.rxCurrentUserService.get().defaultOverlayGroupId;
        };
        RxOverlayService.prototype.getUserDefaultOverlayGroupId = function () {
            var _a, _b;
            return (_b = (_a = this.getCurrentOverlayContext()) === null || _a === void 0 ? void 0 : _a.overlayGroupId) !== null && _b !== void 0 ? _b : this.rxCurrentUserService.get().defaultOverlayGroupId;
        };
        return RxOverlayService;
    }());
    RxOverlayService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayService, deps: [{ token: i2__namespace$2.RxTreeService }, { token: RxLogService }, { token: RxBundleService }, { token: RxCurrentUserService }, { token: RxGlobalCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxOverlayService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$2.RxTreeService }, { type: RxLogService }, { type: RxBundleService }, { type: RxCurrentUserService }, { type: RxGlobalCacheService }]; } });

    var RxSessionService = /** @class */ (function () {
        function RxSessionService(rxCurrentUserService, rxUserService, rxOverlayService, rxSystemConfigurationService) {
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxUserService = rxUserService;
            this.rxOverlayService = rxOverlayService;
            this.rxSystemConfigurationService = rxSystemConfigurationService;
            this.ssoProviderType = null;
            this.sessionActive$ = rxjs.concat(this.initCurrentUser(), this.rxSystemConfigurationService.initialize()).pipe(operators.mapTo(true), operators.shareReplay(1));
        }
        RxSessionService.prototype.initSession = function () {
            return this.isAlive() ? rxjs.of(true) : this.sessionActive$;
        };
        RxSessionService.prototype.isAlive = function () {
            return Boolean(this.rxCurrentUserService.get());
        };
        RxSessionService.prototype.getSsoProviderType = function () {
            return this.ssoProviderType;
        };
        RxSessionService.prototype.initCurrentUser = function () {
            var _this = this;
            return this.rxUserService.getCurrentUser().pipe(operators.tap(function (user) {
                _this.rxCurrentUserService.set(user);
                _this.rxOverlayService.setCurrentOverlayContextOnSessionInit(user);
                _this.ssoProviderType = user.ssoProviderType;
            }));
        };
        return RxSessionService;
    }());
    RxSessionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionService, deps: [{ token: RxCurrentUserService }, { token: RxUserService }, { token: RxOverlayService }, { token: RxSystemConfigurationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSessionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxCurrentUserService }, { type: RxUserService }, { type: RxOverlayService }, { type: RxSystemConfigurationService }]; } });

    var activeColor = '--active-color';
    var dropdownBorder = '--dropdown-border';
    var dropdownBorderRadius = '--dropdown-border-radius';
    var dropdownBoxShadow = '--dropdown-box-shadow';
    var dropdownFontSize = '--dropdown-font-size';
    var dropdownItemActiveBgColor = '--dropdown-item-active-bg-color';
    var dropdownMenuColor = '--dropdown-menu-color';
    var dropdownPadding = '--dropdown-padding';
    var fontFamilyBase = '--font-family-base';
    var lineHeightBase = '--line-height-base';
    var selectOptionPadding = '--select-option-padding';
    var cssVariables = [
        activeColor,
        dropdownBorder,
        dropdownBorderRadius,
        dropdownBoxShadow,
        dropdownFontSize,
        dropdownItemActiveBgColor,
        dropdownMenuColor,
        dropdownPadding,
        fontFamilyBase,
        lineHeightBase,
        selectOptionPadding
    ];
    var RX_THEMING = {
        cssVariablesForCkEditor: cssVariables,
        cssVariableLocator: {
            body: {
                'line-height': lineHeightBase
            },
            '.text-active': {
                color: activeColor
            },
            '.dropdown-menu': {
                border: dropdownBorder,
                'border-radius': dropdownBorderRadius,
                'box-shadow': dropdownBoxShadow,
                color: dropdownMenuColor,
                'font-size': dropdownFontSize,
                padding: dropdownPadding
            },
            '.rx-select__option': {
                padding: selectOptionPadding
            },
            '.dropdown_select__menu .dropdown-item.active': {
                'background-color': dropdownItemActiveBgColor
            },
            '.font-sans': {
                'font-family': fontFamilyBase
            }
        }
    };

    var RxThemingService = /** @class */ (function () {
        function RxThemingService() {
        }
        RxThemingService.prototype.setCssVariables = function () {
            Array.from(document.querySelector('link[href*="application/theme"]').sheet.cssRules).forEach(function (cssStyleRule) {
                lodash.forOwn(RX_THEMING.cssVariableLocator[cssStyleRule.selectorText] || {}, function (cssVariableName, cssProperty) {
                    var cssValue = cssStyleRule.style.getPropertyValue(cssProperty);
                    if (cssValue) {
                        document.documentElement.style.setProperty(cssVariableName, cssValue);
                    }
                });
            });
        };
        RxThemingService.prototype.copyCssVariables = function (variables, targetDocument) {
            var sourceStyle = document.documentElement.style;
            var targetStyle = targetDocument.documentElement.style;
            variables.forEach(function (variableName) {
                targetStyle.setProperty(variableName, sourceStyle.getPropertyValue(variableName));
            });
        };
        return RxThemingService;
    }());
    RxThemingService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxThemingService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxThemingService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxThemingService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxThemingService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxThemeResolver = /** @class */ (function () {
        function RxThemeResolver(document, rxSessionService, rxThemingService) {
            var _this = this;
            this.document = document;
            this.rxSessionService = rxSessionService;
            this.rxThemingService = rxThemingService;
            this.themeLoaded$ = new rxjs.Observable(function (observer) {
                var link = _this.document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/api/rx/application/theme/adapt-css-bs4.css';
                link.onload = function () {
                    _this.rxThemingService.setCssVariables();
                    observer.next();
                    observer.complete();
                };
                link.onerror = function () {
                    observer.next();
                    observer.complete();
                };
                _this.document.head.appendChild(link);
            }).pipe(operators.shareReplay(1));
        }
        RxThemeResolver.prototype.canActivate = function () {
            return this.rxSessionService.sessionActive$.pipe(operators.switchMapTo(this.themeLoaded$), operators.mapTo(true));
        };
        return RxThemeResolver;
    }());
    RxThemeResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxThemeResolver, deps: [{ token: i3.DOCUMENT }, { token: RxSessionService }, { token: RxThemingService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxThemeResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxThemeResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxThemeResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: RxSessionService }, { type: RxThemingService }];
        } });

    var RxValidApplicationGuard = /** @class */ (function () {
        function RxValidApplicationGuard(rxGlobalCacheService, router, rxSessionService) {
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.router = router;
            this.rxSessionService = rxSessionService;
            this.unknownApplicationUrlTree = this.router.parseUrl('/unknown-application');
        }
        RxValidApplicationGuard.prototype.canActivate = function (route, state) {
            var _this = this;
            return this.rxSessionService.sessionActive$.pipe(operators.switchMap(function () { return _this.checkBundleState(route); }));
        };
        RxValidApplicationGuard.prototype.checkBundleState = function (route) {
            var _this = this;
            var bundleId = route.paramMap.get('bundleId');
            if (bundleId) {
                return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(operators.map(function (bundleDescriptor) { return bundleDescriptor.isApplication || _this.unknownApplicationUrlTree; }), operators.catchError(function () { return rxjs.of(_this.unknownApplicationUrlTree); }));
            }
            else {
                return rxjs.of(this.unknownApplicationUrlTree);
            }
        };
        return RxValidApplicationGuard;
    }());
    RxValidApplicationGuard.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidApplicationGuard, deps: [{ token: RxGlobalCacheService }, { token: i3__namespace.Router }, { token: RxSessionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxValidApplicationGuard.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidApplicationGuard, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxValidApplicationGuard, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxGlobalCacheService }, { type: i3__namespace.Router }, { type: RxSessionService }]; } });

    var RxAngularApplicationService = /** @class */ (function () {
        function RxAngularApplicationService(rxAdminSettingsService, rxStringService) {
            this.rxAdminSettingsService = rxAdminSettingsService;
            this.rxStringService = rxStringService;
            this.angularJsApplicationBundleIds$ = this.rxAdminSettingsService
                .getComponentGridData(RX_ADMINISTRATION.settingNames.newApplicationUiOptOut, {
                'default-bundle-scope': RX_APPLICATION.environmentConfigurationBundleId
            })
                .pipe(operators.map(function (gridComponentSettings) { return gridComponentSettings.rows
                .filter(function (newApplicationUiOptOutSetting) { return newApplicationUiOptOutSetting['Use old application UI'] === 'true'; })
                .map(function (newApplicationUiOptOutSetting) { return newApplicationUiOptOutSetting['Application ID']; })
                .concat(RX_APPLICATION.angularJsApplicationBundleIds); }), operators.shareReplay(1));
            this.angularJsViewDesignerBundleIds$ = this.rxAdminSettingsService
                .getComponentGridData(RX_ADMINISTRATION.settingNames.newViewDesignerOptOut, {
                'default-bundle-scope': RX_APPLICATION.environmentConfigurationBundleId
            })
                .pipe(operators.map(function (gridComponentSettings) { return gridComponentSettings.rows
                .filter(function (newViewDesignerOptOutSetting) { return newViewDesignerOptOutSetting['Use old view designer'] === 'true'; })
                .map(function (newViewDesignerOptOutSetting) { return newViewDesignerOptOutSetting['Application ID']; })
                .concat(RX_APPLICATION.angularJsViewDesignerBundleIds); }), operators.shareReplay(1));
        }
        RxAngularApplicationService.prototype.isAngularJsApplication = function (bundleId) {
            return this.angularJsApplicationBundleIds$.pipe(operators.map(function (angularJsApplicationBundleIds) { return lodash.includes(angularJsApplicationBundleIds, bundleId); }));
        };
        RxAngularApplicationService.prototype.isAngularJsViewDesignerBundle = function (bundleId) {
            var _this = this;
            return this.angularJsViewDesignerBundleIds$.pipe(operators.map(function (angularJsViewDesignerBundleIds) { return _this.rxStringService.isIncluded(bundleId, angularJsViewDesignerBundleIds); }));
        };
        return RxAngularApplicationService;
    }());
    RxAngularApplicationService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAngularApplicationService, deps: [{ token: RxAdminSettingsService }, { token: i2__namespace$2.RxStringService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAngularApplicationService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAngularApplicationService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAngularApplicationService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxAdminSettingsService }, { type: i2__namespace$2.RxStringService }]; } });

    var RxApplicationLoaderResolver = /** @class */ (function () {
        function RxApplicationLoaderResolver(rxApplicationLoaderService) {
            this.rxApplicationLoaderService = rxApplicationLoaderService;
        }
        RxApplicationLoaderResolver.prototype.resolve = function (route, state) {
            this.rxApplicationLoaderService.removeApplicationLoader();
        };
        return RxApplicationLoaderResolver;
    }());
    RxApplicationLoaderResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationLoaderResolver, deps: [{ token: RxApplicationLoaderService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplicationLoaderResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationLoaderResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplicationLoaderResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxApplicationLoaderService }]; } });

    var RX_SESSION = {
        minutesBeforeLogout: 2,
        keepAliveCommand: 'com.bmc.arsys.rx.application.user.command.KeepAliveCommand',
        userInteractionThrottleTimeMs: 1000,
        userInteractionEvents: ['click', 'keypress'],
        expirationModes: {
            idle: 'idleSessionExpirationMode',
            absolute: 'absoluteSessionExpirationMode'
        },
        expirationHeaders: {
            idle: 'Session-Expiration',
            absolute: 'Absolute-Session-Expiration'
        },
        ssoProviderTypes: {
            rsso: 'RSSO'
        }
    };

    var RxLoginPageGuard = /** @class */ (function () {
        function RxLoginPageGuard(rxLocalizationService, router) {
            this.rxLocalizationService = rxLocalizationService;
            this.router = router;
        }
        RxLoginPageGuard.prototype.canActivate = function (next, state) {
            var _this = this;
            return this.rxLocalizationService.loginLocalizedStrings$.pipe(operators.map(function (response) {
                var ssoProviderType = response.headers.get('sso-provider-type');
                if (ssoProviderType === RX_SESSION.ssoProviderTypes.rsso) {
                    var bundleId = next.paramMap.get('bundleId');
                    return _this.router.parseUrl(bundleId);
                }
                else {
                    return true;
                }
            }));
        };
        return RxLoginPageGuard;
    }());
    RxLoginPageGuard.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoginPageGuard, deps: [{ token: RxLocalizationService }, { token: i3__namespace.Router }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLoginPageGuard.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoginPageGuard, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoginPageGuard, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxLocalizationService }, { type: i3__namespace.Router }]; } });

    // Customize shouldReuseRoute, use default implementation for other methods.
    var ShellRouteReuseStrategy = /** @class */ (function () {
        function ShellRouteReuseStrategy() {
        }
        ShellRouteReuseStrategy.prototype.shouldReuseRoute = function (current, next) {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = next.data) === null || _a === void 0 ? void 0 : _a.routeReuseStrategy) === RX_APPLICATION.routeReuseStrategies.checkParentParams &&
                current.parent &&
                current.parent.routeConfig === ((_b = next.parent) === null || _b === void 0 ? void 0 : _b.routeConfig)) {
                return lodash.isEqual(next.parent.params, current.parent.params);
            }
            else {
                return (current.routeConfig === next.routeConfig ||
                    (((_d = (_c = current.routeConfig) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.routerGroup) &&
                        current.routeConfig.data.routerGroup === ((_f = (_e = next.routeConfig) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.routerGroup)));
            }
        };
        ShellRouteReuseStrategy.prototype.shouldAttach = function (route) {
            return false;
        };
        ShellRouteReuseStrategy.prototype.shouldDetach = function (route) {
            return false;
        };
        ShellRouteReuseStrategy.prototype.retrieve = function (route) {
            return null;
        };
        ShellRouteReuseStrategy.prototype.store = function (route, handle) { };
        return ShellRouteReuseStrategy;
    }());

    var RX_RESOURCE_URLS = {
        command: '/api/rx/application/command'
    };

    var SessionExpirationType;
    (function (SessionExpirationType) {
        SessionExpirationType["Absolute"] = "Absolute";
        SessionExpirationType["Idle"] = "Idle";
    })(SessionExpirationType || (SessionExpirationType = {}));

    var RxSessionExpirationComponent = /** @class */ (function () {
        function RxSessionExpirationComponent(context, translateService, ngZone) {
            this.context = context;
            this.translateService = translateService;
            this.ngZone = ngZone;
            this.isLoading = false;
            this.SessionExpirationType = SessionExpirationType;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            var data = context.getData();
            this.mode = data.mode;
            this.expirationDate = data.expirationDate;
            this.keepSessionAlive = data.keepSessionAlive;
            this.logout = data.logout;
        }
        RxSessionExpirationComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.mode === SessionExpirationType.Idle) {
                this.ngZone.runOutsideAngular(function () {
                    rxjs.timer(0, 1000)
                        .pipe(operators.takeUntil(_this.destroyed$))
                        .subscribe(function () {
                        _this.ngZone.run(_this.checkTime.bind(_this));
                    });
                });
            }
        };
        RxSessionExpirationComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxSessionExpirationComponent.prototype.keepAlive = function () {
            var _this = this;
            this.isLoading = true;
            this.keepSessionAlive().subscribe(function () {
                _this.isLoading = false;
                _this.close();
            }, function () {
                _this.isLoading = false;
            });
        };
        RxSessionExpirationComponent.prototype.close = function () {
            this.context.close();
        };
        RxSessionExpirationComponent.prototype.checkTime = function () {
            if (moment__default["default"]().isBefore(this.expirationDate)) {
                var counter = moment__default["default"].utc(this.expirationDate.getTime() - Date.now()).format('m:ss');
                this.remainingTime = this.translateService.instant('com.bmc.arsys.rx.client.session-expiration-dialog.timer', {
                    time: counter
                });
            }
            else {
                this.remainingTime = '0:00';
                this.logout();
            }
        };
        return RxSessionExpirationComponent;
    }());
    RxSessionExpirationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationComponent, deps: [{ token: i4__namespace.ActiveModalRef }, { token: i2__namespace$1.TranslateService }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxSessionExpirationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSessionExpirationComponent, selector: "rx-session-expiration", ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ 'com.bmc.arsys.rx.client.common.alert.label' | translate }}</h5>\n\n  <button\n    *ngIf=\"mode === SessionExpirationType.Absolute\"\n    class=\"close dp-close\"\n    aria-label=\"Close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    (click)=\"close()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\" [ngSwitch]=\"mode\">\n  <div *ngSwitchCase=\"SessionExpirationType.Idle\">\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.idle-session-message1' | translate }}</p>\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.idle-session-message2' | translate }}</p>\n  </div>\n\n  <div *ngSwitchCase=\"SessionExpirationType.Absolute\">\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.expiring-session-message1' | translate }}</p>\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.expiring-session-message2' | translate }}</p>\n  </div>\n</div>\n\n<div class=\"modal-footer\" [ngSwitch]=\"mode\">\n  <div\n    class=\"rx-session-expiration-countdown text-primary d-icon-left-clock_o\"\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    rx-id=\"timer\"\n  >\n    {{ remainingTime }}\n  </div>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"continue-button\"\n    [disabled]=\"isLoading\"\n    (click)=\"keepAlive()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.continue.label' | translate }}\n  </button>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    adapt-button\n    btn-type=\"secondary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"logout-button\"\n    [disabled]=\"isLoading\"\n    (click)=\"logout()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.sign-out.label' | translate }}\n  </button>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Absolute\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"ok-button\"\n    (click)=\"close()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.ok.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-session-expiration-countdown{font-weight:var(--font-weight-bold);margin-right:auto}\n"], components: [{ type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3__namespace$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "translate": i2__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-session-expiration',
                        templateUrl: './session-expiration.component.html',
                        styleUrls: ['./session-expiration.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace.ActiveModalRef }, { type: i2__namespace$1.TranslateService }, { type: i0__namespace.NgZone }]; } });

    var RxAuthService = /** @class */ (function () {
        function RxAuthService(location, httpClient, router, rxGlobalCacheService, rxLocalizationService, rxSessionService, rxLogService, rxUrlUtilsService, rxRssoDebugService) {
            var _this = this;
            this.location = location;
            this.httpClient = httpClient;
            this.router = router;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxLocalizationService = rxLocalizationService;
            this.rxSessionService = rxSessionService;
            this.rxLogService = rxLogService;
            this.rxUrlUtilsService = rxUrlUtilsService;
            this.rxRssoDebugService = rxRssoDebugService;
            // URL to redirect after login
            this.targetUrl = '';
            this.defaultUrlSerializer = new i3$1.DefaultUrlSerializer();
            this.router.events.subscribe(function (event) {
                if (event instanceof i3$1.NavigationCancel || event instanceof i3$1.NavigationEnd) {
                    var bundleId = _this.rxUrlUtilsService.getBundleIdFromUrl(event.url);
                    var bundleLoginRoute = "/" + bundleId + "/login";
                    if (event.url !== bundleLoginRoute) {
                        _this.targetUrl = event.url;
                    }
                    else if (event.url === bundleLoginRoute && !_this.targetUrl) {
                        _this.targetUrl = "/" + bundleId;
                    }
                }
            });
        }
        RxAuthService.prototype.login = function (userName, password) {
            var _this = this;
            return this.httpClient
                .post('/api/rx/authentication/loginrequest', {
                userName: userName,
                password: password,
                locale: this.rxLocalizationService.currentLocale
            }, { responseType: 'text' })
                .pipe(operators.tap(function (res) {
                // This is to avoid having additional url encoding when using router.navigate:
                // for example a space %20 would be encoded to %2520
                // https://stackoverflow.com/questions/46440887/url-encoding-breaking-angular-2-navigation
                _this.router.navigateByUrl(_this.targetUrl);
            }));
        };
        RxAuthService.prototype.redirectToLoginPage = function () {
            this.rxLogService.debug('Redirecting to login page.');
            if (this.rxSessionService.getSsoProviderType() === RX_SESSION.ssoProviderTypes.rsso) {
                this.redirectToRssoLogoutPage();
            }
            else {
                if (this.rxRssoDebugService.isRssoDebugEnabled()) {
                    this.redirectToRssoDebugLoginPage();
                }
                else {
                    this.redirectToApplicationLoginPage();
                }
            }
        };
        RxAuthService.prototype.logout = function () {
            var _this = this;
            var onRequestEnd = function () {
                _this.rxLogService.debug('Destroying session after logout.');
                localStorage.removeItem('lastUserInteraction');
                localStorage.removeItem('idleTimeout');
                localStorage.removeItem('rx-overlay-group-id');
                _this.redirectToLoginPage();
            };
            this.rxLogService.debug('Before logout.');
            return this.httpClient
                .post('/api/rx/authentication/logoutrequest', {}, {
                headers: new i1.HttpHeaders({
                    'default-bundle-scope': this.rxGlobalCacheService.applicationId
                })
            })
                .pipe(operators.tap(function () {
                _this.rxLogService.debug('Logout succeeded.');
                onRequestEnd();
            }), operators.catchError(function (err) {
                _this.rxLogService.debug('Logout failed.');
                onRequestEnd();
                return rxjs.throwError(err);
            }));
        };
        RxAuthService.prototype.redirectToRssoLogoutPage = function () {
            window.location.href = '/api/rsso-logout';
        };
        RxAuthService.prototype.redirectToRssoDebugLoginPage = function () {
            this.router.navigate(['rsso-debug/login'], {
                state: {
                    shouldReloadPage: this.rxSessionService.isAlive()
                }
            });
        };
        RxAuthService.prototype.redirectToApplicationLoginPage = function () {
            var url = this.location.path();
            // Trying to deduce the bundleId from the url. This can happen if the user tried to directly access a view
            // while not logged in. In this case the application resolver does not kick in and does not set
            // the application ID rxGlobalCacheService.
            var bundleId = this.rxGlobalCacheService.applicationId || this.rxUrlUtilsService.getBundleIdFromUrl(url);
            // The login page should be reloaded in case of session timeout but
            // not if the user connects the first time.
            // auth.interceptor.ts detects if a a rest calls returns http 401 and
            // calls the login page redirection.
            // In the case of a session timeout the session object is still 'alive'.
            if (bundleId) {
                // Post PR #776 the event NavigationCancel / NavigationEnd is not triggered anymore.
                // This was used when the user was directly accessing a url (DRIST-21802).
                // The logic has been added here.
                var bundleLoginRoute = bundleId + "/login";
                var isLoginRoute = url === "/" + bundleLoginRoute;
                if (!isLoginRoute) {
                    this.targetUrl = url;
                }
                else if (isLoginRoute && !this.targetUrl) {
                    this.targetUrl = "/" + bundleId;
                }
                // The login page should be reloaded in case of session timeout but
                // not if the user connects the first time.
                // auth.interceptor.ts detects if a a rest calls returns http 401 and
                // calls the login page redirection.
                // In the case of a session timeout the session object is still 'alive'.
                this.router.navigate([bundleLoginRoute], {
                    state: {
                        shouldReloadPage: this.rxSessionService.isAlive()
                    }
                });
            }
            else {
                this.router.navigate(['unknown-application']);
            }
        };
        return RxAuthService;
    }());
    RxAuthService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthService, deps: [{ token: i3__namespace$1.Location }, { token: i1__namespace.HttpClient }, { token: i3__namespace.Router }, { token: RxGlobalCacheService }, { token: RxLocalizationService }, { token: RxSessionService }, { token: RxLogService }, { token: i2__namespace$2.RxUrlUtilsService }, { token: RxRssoDebugService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAuthService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace$1.Location }, { type: i1__namespace.HttpClient }, { type: i3__namespace.Router }, { type: RxGlobalCacheService }, { type: RxLocalizationService }, { type: RxSessionService }, { type: RxLogService }, { type: i2__namespace$2.RxUrlUtilsService }, { type: RxRssoDebugService }]; } });

    var RxSessionExpirationService = /** @class */ (function () {
        function RxSessionExpirationService(httpClient, adaptModalService, rxAuthService, ngZone, rxSessionService, rxComponentCanDeactivateGuard) {
            var _a;
            var _this = this;
            this.httpClient = httpClient;
            this.adaptModalService = adaptModalService;
            this.rxAuthService = rxAuthService;
            this.ngZone = ngZone;
            this.rxSessionService = rxSessionService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.trackUserInteractionDebounced = lodash.debounce(this.trackUserInteraction, RX_SESSION.userInteractionThrottleTimeMs, { leading: true, trailing: false });
            this.sessionExpirationInfos = (_a = {},
                _a[SessionExpirationType.Absolute] = {},
                _a[SessionExpirationType.Idle] = {},
                _a);
            RX_SESSION.userInteractionEvents.forEach(function (e) { return window.addEventListener(e, _this.trackUserInteractionDebounced.bind(_this)); });
        }
        RxSessionExpirationService.prototype.setTimeout = function (type, time) {
            var mDate = moment__default["default"](time);
            var isValid = this.isValidTimeout(mDate);
            if (isValid && mDate.isAfter(this.sessionExpirationInfos[type].timeout)) {
                this.sessionExpirationInfos[type].timeout = mDate.toDate();
                if (this.isIdleTimeout(type)) {
                    localStorage.setItem('idleTimeout', this.sessionExpirationInfos[type].timeout.toString());
                    localStorage.removeItem('lastUserInteraction');
                }
                this.updateTimeoutHandler(type, this.sessionExpirationInfos[type].timeout);
            }
        };
        RxSessionExpirationService.prototype.keepSessionAlive = function () {
            var lastUserInteraction = this.getLastUserInteraction();
            return this.httpClient.post(RX_RESOURCE_URLS.command, {
                resourceType: RX_SESSION.keepAliveCommand
            }, {
                headers: {
                    'AR-JWT-Refresh-From': lastUserInteraction
                        ? new Date(lastUserInteraction).toUTCString()
                        : new Date().toUTCString()
                }
            });
        };
        RxSessionExpirationService.prototype.logout = function () {
            this.rxComponentCanDeactivateGuard.disable();
            this.sessionExpirationModal.reject();
            this.rxAuthService.logout().subscribe();
        };
        RxSessionExpirationService.prototype.trackUserInteraction = function () {
            if (this.rxSessionService.isAlive()) {
                localStorage.setItem('lastUserInteraction', Date.now().toString());
            }
        };
        RxSessionExpirationService.prototype.getLastUserInteraction = function () {
            var lastUserInteraction = Number(localStorage.getItem('lastUserInteraction'));
            return !lodash.isNaN(lastUserInteraction) ? lastUserInteraction : null;
        };
        RxSessionExpirationService.prototype.getIdleSessionTimeout = function () {
            var idleTimeout = new Date(localStorage.getItem('idleTimeout'));
            return moment__default["default"](idleTimeout).isValid() ? idleTimeout : null;
        };
        RxSessionExpirationService.prototype.updateTimeoutHandler = function (type, expirationDate) {
            var _this = this;
            var showWarnInMs = this.getTimeToSessionExpirationWarning(expirationDate);
            this.clearTimer(type);
            this.sessionExpirationInfos[type].timeout = expirationDate;
            if (showWarnInMs > 0) {
                // run outside angular to keep app 'stable' as required by QA automation
                this.ngZone.runOutsideAngular(function () {
                    _this.sessionExpirationInfos[type].timer = setTimeout(function () {
                        _this.ngZone.run(function () {
                            if (_this.isIdleTimeout(type)) {
                                _this.showIdleTimeoutWarning(expirationDate);
                            }
                            else if (type === SessionExpirationType.Absolute) {
                                _this.showAbsoluteTimeoutWarning();
                            }
                        });
                    }, showWarnInMs);
                });
            }
        };
        RxSessionExpirationService.prototype.isIdleTimeout = function (type) {
            return (type === SessionExpirationType.Idle &&
                !moment__default["default"](this.sessionExpirationInfos[SessionExpirationType.Idle].timeout).isSame(moment__default["default"](this.sessionExpirationInfos[SessionExpirationType.Absolute].timeout)));
        };
        RxSessionExpirationService.prototype.getTimeToSessionExpirationWarning = function (timeout) {
            return moment__default["default"](timeout).subtract(RX_SESSION.minutesBeforeLogout, 'minutes').diff(moment__default["default"]());
        };
        RxSessionExpirationService.prototype.showIdleTimeoutWarning = function (expirationDate) {
            if (this.rxSessionService.isAlive() && !this.getLastUserInteraction()) {
                var idleSessionTimeout = new Date(this.getIdleSessionTimeout());
                if (idleSessionTimeout &&
                    moment__default["default"](idleSessionTimeout).isAfter(this.sessionExpirationInfos[SessionExpirationType.Idle].timeout)) {
                    this.updateTimeoutHandler(SessionExpirationType.Idle, idleSessionTimeout);
                }
                else {
                    this.openModal(SessionExpirationType.Idle, {
                        expirationDate: expirationDate,
                        keepSessionAlive: this.keepSessionAlive.bind(this),
                        logout: this.logout.bind(this)
                    });
                }
            }
            else {
                this.keepSessionAlive().subscribe();
            }
        };
        RxSessionExpirationService.prototype.showAbsoluteTimeoutWarning = function () {
            var _this = this;
            this.openModal(SessionExpirationType.Absolute);
            // run outside angular to keep app 'stable' as required by QA automation
            this.ngZone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.ngZone.run(function () {
                        _this.logout();
                    });
                }, RX_SESSION.minutesBeforeLogout * 60 * 1000);
            });
        };
        RxSessionExpirationService.prototype.openModal = function (mode, data) {
            this.sessionExpirationModal = this.adaptModalService.open({
                content: RxSessionExpirationComponent,
                beforeDismiss: function () { return false; },
                size: 'sm',
                data: Object.assign({ mode: mode }, data)
            });
            // should be removed after ADAPT issue is resolved:
            // https://github.bmc.com/bmc-ux/adapt-angular/issues/2746
            this.sessionExpirationModal.then(lodash.noop, lodash.noop);
        };
        RxSessionExpirationService.prototype.isValidTimeout = function (date) {
            return this.rxSessionService.isAlive() && date.isValid() && date.isAfter(moment__default["default"]());
        };
        RxSessionExpirationService.prototype.clearTimer = function (type) {
            if (this.sessionExpirationInfos[type].timer) {
                clearTimeout(this.sessionExpirationInfos[type].timer);
                this.sessionExpirationInfos[type].timer = null;
            }
        };
        return RxSessionExpirationService;
    }());
    RxSessionExpirationService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationService, deps: [{ token: i1__namespace.HttpClient }, { token: i4__namespace.AdaptModalService }, { token: RxAuthService }, { token: i0__namespace.NgZone }, { token: RxSessionService }, { token: RxComponentCanDeactivateGuard }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSessionExpirationService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i4__namespace.AdaptModalService }, { type: RxAuthService }, { type: i0__namespace.NgZone }, { type: RxSessionService }, { type: RxComponentCanDeactivateGuard }]; } });

    var RxKeepSessionAliveResolver = /** @class */ (function () {
        function RxKeepSessionAliveResolver(rxSessionExpirationService) {
            this.rxSessionExpirationService = rxSessionExpirationService;
        }
        RxKeepSessionAliveResolver.prototype.resolve = function () {
            return this.rxSessionExpirationService.keepSessionAlive();
        };
        return RxKeepSessionAliveResolver;
    }());
    RxKeepSessionAliveResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxKeepSessionAliveResolver, deps: [{ token: RxSessionExpirationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxKeepSessionAliveResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxKeepSessionAliveResolver, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxKeepSessionAliveResolver, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxSessionExpirationService }]; } });

    var RxFeatureGuard = /** @class */ (function () {
        function RxFeatureGuard(rxFeatureService) {
            this.rxFeatureService = rxFeatureService;
        }
        RxFeatureGuard.prototype.canActivate = function (route, state) {
            return rxjs.of(this.rxFeatureService.isFeatureEnabled(route.data['featureId']));
        };
        return RxFeatureGuard;
    }());
    RxFeatureGuard.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFeatureGuard, deps: [{ token: RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFeatureGuard.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFeatureGuard, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFeatureGuard, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxFeatureService }]; } });

    exports.JustificationRequirement = void 0;
    (function (JustificationRequirement) {
        JustificationRequirement["RequiredForApproval"] = "TO_APPROVE";
        JustificationRequirement["RequiredForRejection"] = "TO_REJECT";
        JustificationRequirement["RequiredForApprovalOrRejection"] = "TO_APPROVE_OR_REJECT";
        JustificationRequirement["NotRequired"] = "NO";
    })(exports.JustificationRequirement || (exports.JustificationRequirement = {}));

    var RxMetadataService = /** @class */ (function () {
        function RxMetadataService() {
        }
        RxMetadataService.prototype.setMetadataLastUpdateTime = function (metadataLastUpdateTime) {
            this.metadataLastUpdateTime = new Date(metadataLastUpdateTime);
        };
        RxMetadataService.prototype.getMetadataLastUpdateTime = function () {
            return this.metadataLastUpdateTime;
        };
        RxMetadataService.prototype.isLocalizedStringsRequest = function (request) {
            return request.method === 'GET' && /\/api\/rx\/application\/localizedstrings/.test(request.url);
        };
        RxMetadataService.prototype.isMetadataDataPageQueryRequest = function (request) {
            return request.method === 'GET' &&
                /\/api\/rx\/application\/datapage/.test(request.url) &&
                (lodash.endsWith(request.params.get('dataPageType'), 'DefinitionDataPageQuery') ||
                    lodash.endsWith(request.params.get('dataPageType'), 'LocalizedStringsDataPageQuery'));
        };
        RxMetadataService.prototype.isMetadataRequest = function (request) {
            return request.method === 'GET' &&
                (this.isMetadataDataPageQueryRequest(request) || /\/api\/rx\/application\/[a-zA-Z]+\/[a-zA-Z]+definition/.test(request.url));
        };
        return RxMetadataService;
    }());
    RxMetadataService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxMetadataService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxDesignerCacheService = /** @class */ (function () {
        function RxDesignerCacheService() {
        }
        RxDesignerCacheService.prototype.getActionTypeByNameSync = function (actionTypeName) {
            return lodash.find(this.actionTypes, { actionTypeName: actionTypeName });
        };
        RxDesignerCacheService.prototype.getFunctionDescriptorsSync = function () {
            return this.functionDescriptors;
        };
        RxDesignerCacheService.prototype.setActionTypes = function (actionTypes) {
            this.actionTypes = actionTypes;
        };
        RxDesignerCacheService.prototype.setFunctionDescriptors = function (functionDescriptors) {
            this.functionDescriptors = functionDescriptors;
        };
        return RxDesignerCacheService;
    }());
    RxDesignerCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCacheService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDesignerCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxMetadataLastUpdateTimeInterceptor = /** @class */ (function () {
        function RxMetadataLastUpdateTimeInterceptor(rxMetadataService) {
            this.rxMetadataService = rxMetadataService;
        }
        RxMetadataLastUpdateTimeInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            return next.handle(request).pipe(operators.tap(function (event) {
                if (event instanceof i1.HttpResponse) {
                    var metadataLastUpdateTime = event.headers.get('metadata-last-update-time');
                    if (metadataLastUpdateTime) {
                        _this.rxMetadataService.setMetadataLastUpdateTime(metadataLastUpdateTime);
                    }
                }
            }));
        };
        return RxMetadataLastUpdateTimeInterceptor;
    }());
    RxMetadataLastUpdateTimeInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataLastUpdateTimeInterceptor, deps: [{ token: RxMetadataService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxMetadataLastUpdateTimeInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataLastUpdateTimeInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataLastUpdateTimeInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxMetadataService }]; } });

    var RxMetadataRequestInterceptor = /** @class */ (function () {
        function RxMetadataRequestInterceptor(bundleCacheService, rxMetadataService, rxCurrentUserService, rxLocalizationService) {
            this.bundleCacheService = bundleCacheService;
            this.rxMetadataService = rxMetadataService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxLocalizationService = rxLocalizationService;
        }
        RxMetadataRequestInterceptor.prototype.intercept = function (request, next) {
            var isLocalizedStringsRequest = this.rxMetadataService.isLocalizedStringsRequest(request);
            var isMetadataDataPageQueryRequest = this.rxMetadataService.isMetadataDataPageQueryRequest(request);
            var isMetadataRequest = this.rxMetadataService.isMetadataRequest(request);
            if (isMetadataRequest || isLocalizedStringsRequest) {
                var user = this.rxCurrentUserService.get();
                var metaDataLastUpdateTime = this.rxMetadataService.getMetadataLastUpdateTime();
                var params = void 0;
                // duplicate the 'default-bundle-scope' request header as a request parameter
                // in order to have a separate cache for requests with different bundle scope
                var bundleId = isMetadataDataPageQueryRequest
                    ? request.headers.get('default-bundle-scope')
                    : this.bundleCacheService.bundleId;
                if (isMetadataDataPageQueryRequest && bundleId) {
                    request = request.clone({
                        params: request.params.set('bundleId', bundleId)
                    });
                }
                if (metaDataLastUpdateTime) {
                    var cacheKey = [
                        user.userId,
                        user.modifiedDate.getTime(),
                        metaDataLastUpdateTime.getTime(),
                        this.rxLocalizationService.currentLocale
                    ].join('');
                    params = request.params.append('_v', cacheKey);
                    request = request.clone({
                        headers: request.headers.delete('Cache-Control').delete('Pragma').delete('If-Modified-Since'),
                        params: params
                    });
                }
            }
            return next.handle(request);
        };
        return RxMetadataRequestInterceptor;
    }());
    RxMetadataRequestInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataRequestInterceptor, deps: [{ token: RxBundleCacheService }, { token: RxMetadataService }, { token: RxCurrentUserService }, { token: RxLocalizationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxMetadataRequestInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataRequestInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxMetadataRequestInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxBundleCacheService }, { type: RxMetadataService }, { type: RxCurrentUserService }, { type: RxLocalizationService }]; } });

    var RxRequestInterceptor = /** @class */ (function () {
        function RxRequestInterceptor(rxBundleCacheService, rxGlobalCacheService) {
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxGlobalCacheService = rxGlobalCacheService;
        }
        RxRequestInterceptor.prototype.intercept = function (request, next) {
            var bundleId = this.rxBundleCacheService.bundleId;
            var applicationId = this.rxGlobalCacheService.applicationId;
            // LMA:: Check if those headers are still necessary. Test with IE11.
            request = request.clone({
                headers: request.headers
                    .set('X-Requested-By', 'XMLHttpRequest')
                    .set('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT')
                    .set('Cache-Control', 'no-cache')
                    .set('Pragma', 'no-cache')
            });
            if (bundleId && !request.headers.has('default-bundle-scope')) {
                request = request.clone({
                    headers: request.headers.set('default-bundle-scope', bundleId)
                });
            }
            if (applicationId === RX_APPLICATION.innovationStudioBundleId) {
                request = request.clone({
                    headers: request.headers.set('Design-Time', 'true')
                });
            }
            return next.handle(request);
        };
        return RxRequestInterceptor;
    }());
    RxRequestInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRequestInterceptor, deps: [{ token: RxBundleCacheService }, { token: RxGlobalCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRequestInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRequestInterceptor, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRequestInterceptor, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxBundleCacheService }, { type: RxGlobalCacheService }]; } });

    var RxUpgradeTrackerInterceptor = /** @class */ (function () {
        function RxUpgradeTrackerInterceptor(rxMetadataService, rxUpgradeTrackerService) {
            this.rxMetadataService = rxMetadataService;
            this.rxUpgradeTrackerService = rxUpgradeTrackerService;
        }
        RxUpgradeTrackerInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            return next.handle(request).pipe(operators.tap(function (httpEvent) {
                var isCachedRequest = _this.rxMetadataService.isMetadataRequest(request) || _this.rxMetadataService.isLocalizedStringsRequest(request);
                // Exclude resource calls since they never have the upgrade-mode header in the response.
                // Exclude API calls that may be cached by browser with an outdated value of the header.
                if (!isCachedRequest && httpEvent instanceof i1.HttpResponse && /\/api\/rx/.test(request.url)) {
                    _this.rxUpgradeTrackerService.isUpgradeInProgress = httpEvent.headers.has('upgrade-mode');
                }
            }));
        };
        return RxUpgradeTrackerInterceptor;
    }());
    RxUpgradeTrackerInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUpgradeTrackerInterceptor, deps: [{ token: RxMetadataService }, { token: RxUpgradeTrackerService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUpgradeTrackerInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUpgradeTrackerInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUpgradeTrackerInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxMetadataService }, { type: RxUpgradeTrackerService }]; } });

    var RxCachingModule = /** @class */ (function () {
        function RxCachingModule() {
        }
        RxCachingModule.forRoot = function () {
            return {
                ngModule: RxCachingModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxRequestInterceptor,
                        multi: true
                    },
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxMetadataRequestInterceptor,
                        multi: true
                    },
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxMetadataLastUpdateTimeInterceptor,
                        multi: true
                    },
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxUpgradeTrackerInterceptor,
                        multi: true
                    }
                ]
            };
        };
        return RxCachingModule;
    }());
    RxCachingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCachingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxCachingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCachingModule, imports: [i3.CommonModule] });
    RxCachingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCachingModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCachingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule]
                    }]
            }] });

    var RX_CHATBOT = {
        defaultChatbotId: 'AGGADGG8ECDC0AP0PA6EPJSIGS75QX',
        chatbotLocales: {
            recordDefinitionName: 'Chatbot Locale',
            fieldIds: {
                providerPassword: 123,
                chatbotName: 1772,
                locale: 1775,
                botConfigurationId: 536870913
            }
        }
    };

    var botDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.chat.datapage.ChatbotConfigurationDataPageQuery';
    var RxChatbotDefinitionDataPageService = /** @class */ (function (_super) {
        __extends(RxChatbotDefinitionDataPageService, _super);
        function RxChatbotDefinitionDataPageService(injector) {
            var _this = _super.call(this, injector, botDefinitionDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        RxChatbotDefinitionDataPageService.prototype.get = function (dataPageRequestConfiguration) {
            if (dataPageRequestConfiguration === void 0) { dataPageRequestConfiguration = {}; }
            return _super.prototype.get.call(this, dataPageRequestConfiguration).pipe(operators.tap(function (result) {
                lodash.forEach(result.data, function (entity) {
                    entity.name = entity.chatbotName;
                    entity.lastUpdateTime = entity.modifiedDate;
                    entity.lastChangedBy = entity.modifiedBy;
                });
            }));
        };
        return RxChatbotDefinitionDataPageService;
    }(DataPage));
    RxChatbotDefinitionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxChatbotDefinitionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxChatbotDefinitionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxChatbotDefinitionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxChatbotDefinitionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxLiveAgentSettingsService = /** @class */ (function () {
        function RxLiveAgentSettingsService(httpClient) {
            this.httpClient = httpClient;
            this.chatbotConfigurationUrl = '/api/rx/application/chat/chatbotconfiguration';
        }
        RxLiveAgentSettingsService.prototype.getAvailableTopics = function () {
            return this.httpClient.get(this.chatbotConfigurationUrl + "/virtualchattopics");
        };
        return RxLiveAgentSettingsService;
    }());
    RxLiveAgentSettingsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLiveAgentSettingsService, deps: [{ token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLiveAgentSettingsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLiveAgentSettingsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLiveAgentSettingsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }]; } });

    exports.MachineLearningProviderNames = void 0;
    (function (MachineLearningProviderNames) {
        MachineLearningProviderNames["Helix"] = "HELIX";
        MachineLearningProviderNames["Native"] = "NATIVE";
        MachineLearningProviderNames["Watson"] = "WATSON";
    })(exports.MachineLearningProviderNames || (exports.MachineLearningProviderNames = {}));

    var RX_DESIGNER = {
        messageTypes: {
            closeDesigner: 'closeDesigner',
            afterSave: 'afterSave',
            designerLoaded: 'designerLoaded',
            designerLoadFailed: 'designerLoadFailed',
            waitingForDesignerOptions: 'waitingForDesignerOptions',
            definitionStatusChanged: 'definitionStatusChanged'
        },
        paletteIconPosition: {
            top: 'top',
            bottom: 'bottom'
        },
        paletteItemBorder: {
            solid: 'solid',
            bold: 'bold',
            dashed: 'dashed',
            double: 'double'
        },
        paletteItemLabel: {
            inner: 'inner',
            outer: 'outer',
            none: 'none'
        },
        paletteItemShape: {
            rectangle: 'rectangle',
            circle: 'circle',
            square: 'square',
            annotation: 'annotation'
        }
    };

    var RX_DEFINITION = {
        scopes: {
            bundle: 'BUNDLE',
            public: 'PUBLIC'
        }
    };

    var RxDefinitionAdapterRegistryService = /** @class */ (function () {
        function RxDefinitionAdapterRegistryService() {
            this.runtimeAdapters = new Map();
            this.designAdapters = new Map();
        }
        RxDefinitionAdapterRegistryService.prototype.registerRuntimeAdapter = function (type, adapter) {
            this.runtimeAdapters.set(type, adapter);
        };
        RxDefinitionAdapterRegistryService.prototype.registerDesignAdapter = function (type, adapter) {
            this.designAdapters.set(type, adapter);
        };
        RxDefinitionAdapterRegistryService.prototype.getRuntimeAdapter = function (type) {
            return this.runtimeAdapters.get(type);
        };
        RxDefinitionAdapterRegistryService.prototype.getDesignAdapter = function (type) {
            return this.designAdapters.get(type);
        };
        return RxDefinitionAdapterRegistryService;
    }());
    RxDefinitionAdapterRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionAdapterRegistryService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefinitionAdapterRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionAdapterRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionAdapterRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxDefinitionScopePipe = /** @class */ (function () {
        function RxDefinitionScopePipe(rxDefinitionService) {
            this.rxDefinitionService = rxDefinitionService;
        }
        RxDefinitionScopePipe.prototype.transform = function (value, bundleDescriptor) {
            return this.rxDefinitionService.getScopeName(value, bundleDescriptor);
        };
        return RxDefinitionScopePipe;
    }());
    RxDefinitionScopePipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionScopePipe, deps: [{ token: RxDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxDefinitionScopePipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionScopePipe, name: "rxDefinitionScopePipe" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionScopePipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxDefinitionScopePipe'
                    }]
            }], ctorParameters: function () { return [{ type: RxDefinitionService }]; } });

    var RxDefinitionNamePipe = /** @class */ (function () {
        function RxDefinitionNamePipe(rxDefinitionNameService) {
            this.rxDefinitionNameService = rxDefinitionNameService;
        }
        RxDefinitionNamePipe.prototype.transform = function (value) {
            return this.rxDefinitionNameService.getDisplayName(value);
        };
        return RxDefinitionNamePipe;
    }());
    RxDefinitionNamePipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionNamePipe, deps: [{ token: RxDefinitionNameService }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxDefinitionNamePipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionNamePipe, name: "rxDefinitionNamePipe" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionNamePipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxDefinitionNamePipe'
                    }]
            }], ctorParameters: function () { return [{ type: RxDefinitionNameService }]; } });

    var RxDefinitionModule = /** @class */ (function () {
        function RxDefinitionModule() {
        }
        return RxDefinitionModule;
    }());
    RxDefinitionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDefinitionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionModule, declarations: [RxDefinitionNamePipe, RxDefinitionScopePipe], imports: [i3.CommonModule], exports: [RxDefinitionNamePipe, RxDefinitionScopePipe] });
    RxDefinitionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxDefinitionNamePipe, RxDefinitionScopePipe],
                        exports: [RxDefinitionNamePipe, RxDefinitionScopePipe],
                        imports: [i3.CommonModule]
                    }]
            }] });

    var RX_ERROR_HANDLING = {
        optimisticLockErrorHttpStatus: 412,
        ignoredErrors: [
            { status: 404, contains: '/resources/i18n/locale' },
            { status: 404, contains: RX_APPLICATION.shellDefinitionName },
            { status: 412, contains: '"messageNumber":309' },
            { status: 412, contains: '"messageNumber":9965' }
        ],
        maxErrorMessageLength: 500,
        maxArMessageLength: 500,
        arMessagesHeader: 'x-ar-messages',
        arNoteLogInfo: 8914,
        arGuestUserMessageNo: 59,
        messageTypes: {
            warning: 'WARNING',
            success: 'SUCCESS',
            info: 'INFO',
            error: 'ERROR'
        }
    };

    var RxDefinitionUpdateService = /** @class */ (function () {
        function RxDefinitionUpdateService(rxUtilityModalsService) {
            this.rxUtilityModalsService = rxUtilityModalsService;
        }
        RxDefinitionUpdateService.prototype.execute = function (updateFn) {
            var _this = this;
            return updateFn().pipe(operators.catchError(function (error) {
                if (error.status === RX_ERROR_HANDLING.optimisticLockErrorHttpStatus) {
                    return rxjs.from(_this.rxUtilityModalsService.confirmExternalChange(error.error[0].messageText)).pipe(operators.switchMap(function (isConfirmed) {
                        if (isConfirmed) {
                            return updateFn({
                                headers: {
                                    'Override-Optimistic-Lock': 'true'
                                }
                            });
                        }
                        else {
                            return rxjs.throwError(error);
                        }
                    }));
                }
                else {
                    return rxjs.throwError(error);
                }
            }));
        };
        return RxDefinitionUpdateService;
    }());
    RxDefinitionUpdateService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionUpdateService, deps: [{ token: i2__namespace.RxUtilityModalsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefinitionUpdateService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionUpdateService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionUpdateService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.RxUtilityModalsService }]; } });

    // TODO-VS: do not provide in root
    var RxCommandManagerService = /** @class */ (function () {
        function RxCommandManagerService() {
        }
        // TODO-VS: update types
        RxCommandManagerService.prototype.get = function () {
            return this.commandManager;
        };
        // TODO-VS: update types
        RxCommandManagerService.prototype.set = function (commandManager) {
            this.commandManager = commandManager;
        };
        return RxCommandManagerService;
    }());
    RxCommandManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCommandManagerService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCommandManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCommandManagerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCommandManagerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RX_DESIGNER_ELEMENT_SHAPE = {
        bpmnIcons: {
            gear: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAAAw0lEQVQoz22SwRGCQAxF3zIUQAnSAXSAHUgHcslZK3CswPu/YAeUQAlQgp3oJThhNTM7s8lPfv783UQWZtYAC4CklOMpNE3AAHTAzfErsAIj0EtaSwcm4ADMGeEj3CegLjwZssaXnxgDwDbQREBSLanOiBqAZGbvUFwltZkJSyQssrUrv7GTVrh1V89P7li0uNsck5TKjLkCZjN7en722rdnGxjD1gq4/JE2Rlt719oGeQB34OhY/33pP99jc66VtDPiA3vHNpWAb5BUAAAAAElFTkSuQmCC',
            user: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAAAgUlEQVQoz5WQwRFAMBBFn4wClKAEOlCCDtz2qhbXvdCBlKAEHVCKS8ywMsi7bfa/7CYZBhFpgT6Ug6r6az8z4RLYzB21qq5n4Uyz5cntzAoFH1hhTxV8JDO9CVVkSnn7JREpwsP6IMRYgQHwOTADzcfqFTACnfsRvtI4EsmBJUU4ANvZFcko+HmJAAAAAElFTkSuQmCC',
            message: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAACXBIWXMAAAsSAAALEgHS3X78AAAAnUlEQVQY042RwQ3CMBAEh8gF0Al0QEpIOuA+90XpADrgfZ+kA9xBWgidUAKfDTKCSL6XfZrdldc7d38Ae+rmlYBOlww8N8DDyiUtFqAFbhGxlKS7H4ELMAHnRntTwuzubQF3wAzkiLBPglzN3ZHIpBmBe0QMq0lTxsvFBI6AlfCPQKIJ6IFe569J/yqJiLzVa9LjrpX/QFI7p0o+vwFVmjBfid8AeAAAAABJRU5ErkJggg==',
            plus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAD1BMVEUAAABmZmZmZmZmZmb////rTs6DAAAAA3RSTlMAgMBakZ4lAAAAAWJLR0QEj2jZUQAAACZJREFUGNNjYMAAwob05TAKAoGyEYgUYGA2hgMDVA6KsgFxKDIAALWJCwe6ztRNAAAAAElFTkSuQmCC',
            cross: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAVFBMVEUAAABmZmZVVVVgYGBxcXFnZ2dlZWVnZ2dlZWVlZWVnZ2dmZmZmZmZlZWVmZmZnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZlZWVmZmZmZmZmZmb///8fAoMMAAAAGnRSTlMABQYICUVHSElRUqOoq62ur7O0tre4ubr3+qfgKgYAAAABYktHRBsCYNSkAAAAnklEQVQoz51SyxKDIAwkgvahFkrVav7/QxuCg0nxJAdIdsmwu4MxV9a9B9lCf8vFc8OPPXA74fbgyiPiq8wAt0c57TN2psaDuDQz4xaBExOoXVyFF8Z96QhKIklBfEfapMAyU91PqwnnuIExEWNF8CNnTyQrMaoMhF+VgfIrMvjLoWTAuPQrGa/EsLwce7sqXzSztrnsBiWxGbpLP+QHwMkPHpwyEy0AAAAASUVORK5CYII=',
            multiInstanceParallel: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACxJREFUeNpilJOT+c+AAIwPHz5mkJeXBbGJEmdioBCMGjBqwKgBg8UAgAADADERCXj6SL6VAAAAAElFTkSuQmCC',
            multiInstanceSequential: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACtJREFUeNpilJOTYaAEsADxf0oMYGKgEFBsAMgLjEPfC6OxMBoLFBsAEGAAje8DgZ8/t18AAAAASUVORK5CYII=',
            action: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAAnUlEQVQokY2OsQ3CQBAE596P6IKABsiIoQ1kRHZN0Ik/QbgRyAkJKQQhmSUysl7y25vtavb2zN2vwAGoKKszszYCNWATMEAl6RRmwr0sZMFH0q3UyAvPlNJe0g54TBbMTAAppXvTNFtJNfAuLfzl7hFYAt9hHodGUnD3haQjcDazdX4oZn4DvMxsNbacvxSAUbgHVAIyKQCX2bTU/gAVMS805tVavgAAAABJRU5ErkJggg==',
            clock: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA/1BMVEUAAAAAAABgYGBxcXFdXV1qampiYmJpaWlra2tmZmZoaGhqampmZmZkZGRqampoaGhpaWlmZmZjY2NnZ2dlZWVpaWlmZmZkZGRnZ2dnZ2dmZmZnZ2dlZWVnZ2dmZmZnZ2dmZmZmZmZmZmZlZWVmZmZlZWVmZmZnZ2dmZmZnZ2dlZWVmZmZnZ2dlZWVlZWVlZWVmZmZnZ2dmZmZnZ2dmZmZmZmZmZmZlZWVmZmZmZmZnZ2dmZmZlZWVnZ2dmZmZnZ2dmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb///8tfJx5AAAAU3RSTlMAAQgJCwwNERMUFhgZHB0gIiMkJSYnKCkqTVBSU1daXl9kaWpsb3Bydnd5e3x+iI2bn6Okp6iqq6ytrq+ws7a4udbX2Nrb3evx8vP09/j5+vz9/rXGk28AAAABYktHRFTkA4ilAAABCElEQVQoz2WS11rCQBCFBxugKDE2ROxixBIbxi7EAlKC2Zz3fxe3JNkNOTeTzD/7ze6ZIVKqHHf9ft/vHC2RKdtjiMU8W+cbIwR3O1axaDXuJxjWk7wT4bGa/FjPYKfqs87CpoiHrZKqC9m2iMsDODLhY0tVnuG3wsMtXikLCu+4IaqyyeoUoLW/cIWaaNM0IA8n1MFuHuzhg35g58EGvmiI+TxYwIBGmEvBdYurFINvrKdAShzbxKfR3HGlFuPm+rqGxHX1A7XkA7klb4VsXlkiTLzIgitlIrc9OjfrLyNluxzUkx7USzooNdr2fm1mtnbwYI6WqOyOk2UYu+VMQ74+vSDo6fX5B1EWNtYbmlVlAAAAAElFTkSuQmCC',
            qualification: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOtSURBVFiFtZddaBxVGIafb2a6STfRKo1QxYhGqQWtRWxjjCD+YFHaKxHpTSSQ7MSdgHS9qlBipFjJVQohG+cwpMFIBaN31YuIRaoXLfFCgxcWsfYn8Zc0pSa7ITtnjhfNwsY07uy0eWHh/HznfV6WnbPfCDHV0dHRkE6n90dR9LSItAF3A1sBB7gKXBCR76MoOqW1/nx0dPSfOL5SrSCbzbZEUXTIGHMAuC1m3oIx5mPLsgZ83/85UYDOzs76VCr1DpAD6mKC/6sScGx5eblvbGxsKXYAz/OaS6XSpyLSmhC8GiJyxhjzilLq96oBMpnMIyLyNdB0K+AVmomiaF8QBNPrBujq6nrItu3TXP+BbYRmHMfZk8/n/ygvWOWB67qbbNs+sYFwgHu11idzudzmNQGMMUeAPRsIL3OeKBQKh1YFcF33PhE5GNPjb+CwZVk7gQallNi2/aCIvAlcjhniLc/ztsH1SwRjzNsiEudRuwI8o5T6qXJxZGTkPDDked7xMAw/A/ZW8WkMw7AP8CSXy21eXFz8C2iMEeANpZQP4LpukzHmNRHRwLhSqgDQ29u7tVQqnQdur+K16DjONmthYeGlmPBisVj8CKC/v98BvhGRYeAD4GS5aHh4eA44FcOvQWu9z6L611XWpfHx8UWA2dnZVmBHxd5zrutuqZgvxDE0xjzviMijMQM87LquWWfv4vz8fCX0sZieuyxge8zi9XQliqIDExMTGsB13SdrCPCAA6RvAv5LFEUvBkHw6wp8BzBRw/ktFrApIXwJ2F+Gd3d3twGngeYaPLQFzCUMcK58H2Qyme2WZX0J3FWjx5wFXEgY4GJ5ICKvEu9RXiURmXWMMdMi0p4gwE7XdT9ZGT+e4DzAWQuYTHjYEpEWEWkBGhJ6fGvV19d/RcyLo1IictT3/d2+7+8GVAL4VWPMF9bQ0NA1YCyBwU1JRE4opQrOyvwYkKGG5tMY05TNZlsAtNZ31sgvGmMGoKIl6+npedcY01ejUVK9p5Q6DBUdUSqVOgpMr3vk1mmqrq7uSHmyqin1PK85DMMzwD0bBP8TaFVKXSovWJW7+Xz+chRFLwO/bQB8Fni2Er4mAEAQBNOO47QBP9xC+He2ba9p5QDsG1VPTU1da29vP6611sBTrPSOCbQEDACv+75/w/+cWC+nYRgeFJFO4r+cLojIh1rr94MgmPm/wqoByvI8r1Fr/QKwN4qiXSJyP3AHsLzyOSciPwKT6XR6cnBwsBjH919eHFLEJsIcUwAAAABJRU5ErkJggg==',
            connector: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtklEQVQokYWRUQ2DQBBEHw0GsEAlYIFKoBJuJGChFgYJxQIWsICEVkL7AZce7ZFecj+bN5OZ3SKE8ACe/H81sJTA0/Y5R0jqNzB+yiM7SXegS0YD0J4O4AZov8YVQFZgewaufLqNwPQjkNRI6iW1tqdNNNq+RqZM4PsWYwRmScH2EJ13Akm3pGAH1LYvubgxUvVVrsqwO0G6kRHIugMUIYQX6zYG1uNMB2wNdCWwJNkBmiN3YHkDS8QzErkLgz8AAAAASUVORK5CYII=',
            errorEnd: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAABzUlEQVRYhe2WzXHCMBCFv2RSgEsgHYQOSAXBFQCXPeMKUgKc9xJSAaQC6AA6wCW4hBwszyiyZEkZxsOBd/LPev3NeyvZ8NCd6mnsF4pIAVyBAnhV1RrgeWwQYG8g6g5idBAR2QAzc3qw740GIiJzYG1d+rbvJ8+IyXYJXFT1lAnxBhxpI8H0mNo1OY4sgQ1wNI1TIQrgy4IAx41ckIV1nAOzAdzag1uUBCIiE6dZkQIjImtaJ22d7NWSBeJpFoURkRmtG656seSALALXvTBmLvaBZ3qxJIGYl0wGSnww9gr5A6Gqja/JSwyEsBsuzF5EpsAn/eHs9BNqkAKyTKiB1rUzYfcaVd2FHh6MxuyGPouHYELyzkYSCPCRARFTMJYUkPnAvToDolHV/zkiIkvCsWyBaQbMLlYw5EgolouqVmYZloB3OTrybmJRELMh+WJpgPfuRFUv5nwIpjZ1+SABCIDS3ZASYKJuDIH4NrEq9B8SgdmlgPR+jMyX9uo2U9VVrFnKD1BIPkfcWC5AldLMcqZTUiwhEDuWBliFPlQRmIrEWMCJxlh7ti6VsY3oVnIdsd3YjgXhA+nm46SqSXNxcxCzWia0c1GOCfHQXesXYhiZ69pK0h4AAAAASUVORK5CYII=',
            errorBoundary: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAACR0lEQVRYhe2Wz3XiQAyHv90KTAcuATpIKlioYMlF14VKIFddMBXAVhA6gA7iDkIJexhNUAaP/+Tt88shusDYsvz5p5E08G1f1H6M/UIRKYBXoAAmqnoF+Dk2CHAwiDpCjA4iIhvgwZZHf280EBGZAyt3ae/v994jltslcFHV00CIKfBCSAkWY+Z9hiiyBDbAiwXuC1EAO4Oo7fI+9RsC8tv9HwKzAaaEPRE35zF16gUiIqUFuwBPhK/rhBGRFZZO4NlinFS1/hSIBQPYq2rVB0ZEHghqXM3/V4zR5N8XJKalAjCYdQ7G9sXBlmtVvQBzW9+lpReIvaQEjr4BqerWwJpgYoVsVbXKxRgEwk2Nv+kNVX1yMAcRKaxpTQklujbXP7kYQ0CW9tsoqYMpgTOhaV2BR+c2B66W0uEg1g0LoPKSikjpU5HAXIFF9HcxGj+kFwi3nf4uqVXDGTiLyC6BmQGzpPPexWiy1hYvIm/2komt/QivCQpUBtH0fAG8EdIyaXtXVhERWXIv6Xs1EL6+BpZemcRiyVZtEK0g3CR9NrAP1WB7YEHYEzmY1ibWCWKSzgmHl4upc1cN1qgeHcwqF+NTILguaNWxsfUibUgJzMagwY2FLog2EN/E4ghf584hCczOYD6MhS67qxqbtK+EiVkT1MlWRvJs5wEoZ02KxLTEHF8IA67TnDLReqUlBxIlLbERnhtUHTBreqYFktSYtGd3aaGqra35f1mqiD8ObseCaAKJ++PkRvi4INaASmx6jgnxbV/a/gFaCwT89kIjVgAAAABJRU5ErkJggg==',
            webRequest: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtklEQVQokYWRUQ2DQBBEHw0GsEAlYIFKoBJuJGChFgYJxQIWsICEVkL7AZce7ZFecj+bN5OZ3SKE8ACe/H81sJTA0/Y5R0jqNzB+yiM7SXegS0YD0J4O4AZov8YVQFZgewaufLqNwPQjkNRI6iW1tqdNNNq+RqZM4PsWYwRmScH2EJ13Akm3pGAH1LYvubgxUvVVrsqwO0G6kRHIugMUIYQX6zYG1uNMB2wNdCWwJNkBmiN3YHkDS8QzErkLgz8AAAAASUVORK5CYII=',
            transparent: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=',
            info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAz0lEQVQokX2SsQ3CMBBFXzJBRsgIkWsX1G6ACYANwgTABBEbMAI0aQmS6wAbMAIjoB/ZUogMv7Clu/vf/+6cEWDbvgBqYA5UwBvogKN3pot1A8G2vQquQEEaJ+/MRpnctn2ZKD4E9Yi1bftmIABNQlnFr0mslhMRFpPECZgBZcLcKk8En96ZPXBL5KoUofnR+IAU4RFu9aDRfuVEGE9D2OrwzqiXSI64ZGEH9382As7emWXunZGKljJ9fgy5GBY3/hoa4y6MOe5FYvoasgfAB64INJdEFsdVAAAAAElFTkSuQmCC',
            jitterbit: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEwUlEQVR4nO3aeahVVRTH8U83LW00s0GigkpRK8yKCqKiwiyQaKASI5WMoKCBoLKkOQgaiKRSooiIShqsiMoKksrmlGYaoKKSZ5PaYKg59Mc6t3fve/fdd8/Z1/v643xh8/Sx92+tvc8+a629z6OkpKSkpKSkpKSkpIMciAswdKAdGSjOxyb8hH0G0pHKANk9Kvv5Cb4ZIB9aZofNoPcn/sEBbdZuO+PxPca1UfNqsf0faqPmZuNSbMQSDG6D3mj8LRbgyDbodYSZ2IB50mLGCHwlJr88UavjXC8cf1ixnTAaX2QamzA/0Z/hieNzU8Ei4fynOKHFcYNxkQh6m2ralYn+LMPdiRq5OVjEg+ok3hET2R+DavoNwgRcg2/VT7zapib68obYlR3nKY0ntA4r0IX1ffSpbZMT/XhBmxZgUP9d6ngQpzX4/WDsJCb/qtgdP2b/3xWH4PisD+kl8LYYlqhR2PAavZ/oWtyG3ZqMHYJzxcLMSPRjGRYmahTmXfWTX4ZDc4zfHmMT7I/L7P6JrRN0CvOi7sl/jT06bP/eGvtTOmwbPJEZXyMyQyc5QpwhqgvwsfZUqLl4PTN+c6LO+Jz9x4rXrWf8uSHRj9z8Ip5CytbfGavxgO7M0Iwz8ZvGKXUjpiX4kou9MqOLEnWO0V0k/YTZmXYt2+AUvJb1+0GcIK8T1eUtIhOsF2eV2dgi0a9+uSRzZm6b9A4Tk1qX6X6PD/C57nS7Gudhyz40RoozyiYs1lpcOk6Bcryi+0BzRd7B/bCXeB02qN/eP4tFaoWZukv113AZjsYocQc5GTeJW6iFuDCvk9NrHJuVd3A/VI/Gh+P9Gjt5S+YrNI4T1Vhxn4Kxaw/xNKpi9xQRacI8HJT9uyIuTe8soFMRB6Wek1+FE4s6twPe6yG4pKhYAwaJxf1dBL1UJqn39S+xswoxUu/St9pSytlazlC/TedixwS9ClbWaE4vKjJVHG/7eqeeTHCyynbiWryndhcuVvzUWI0ji/MOrOAkLG3gVKM2s6CDsBWe60d/Fe4XdUOeO8Sq//2+UtXC4WJRmk7KjL4hcvFKkaN3x96ZIwfXjFsvPnHdn8M54tV6BMfmGLNc1AhL8SZe7qNfNaYMFhXnulbEX8IckTP7Y3fcKIJW9Uk9jTEtjN1KLNiv2biPcCvOEgu7Z6a/j7g2Pwd3Zf1qd8YdTWxMzPq81YI//1GkhByOx2uc2igKkFni9meUmMwYkc/vFE9xrQh0eb8K7SfK3y7Nc/lj2hejWuIy9Zelzdrz0j+GNrvGq02BjybaycVVmk98jThHbM7DygT1WeuVzWirIQ/pe/ITC2ruIjJNs4Wr4Gz80cNuV0GbhRmm94XFeo1vkVtlp0znbZyq/iZ4b3HJ2jNA1rajdJjLezgwJ1FvqN4LukKk6tWi4FkggvFCfNej/9OJ9nMzQveRtktaSQv76v1UF+Nkcc3eiJHiVPidhFI4hc8yw7PboDVD98S/FOm1VYbidhEbOvoqPCMc3q8NWoszrWcV303TxCKkfo5rmfn4sA06p4vJz5OePqeIT/QdYZH0P3+piO+LC/R9F/i/ZTmuHWgnWqXdf6YyRHw4ebvNuiUlJSUlJSUlJSUl7eVfZ4yXeU+b+PAAAAAASUVORK5CYII=',
            mulesoft: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAHt0lEQVR4nO2bWWxVVRSGv9JiMbRlLmCUqG2t0ahMFiQKDz4YBRkejCIEKiBBqBAeTFCCCfigMRgRxYgPJkwSjXHGIZoYEASlZSgxoVih4MAgbYGWVtrS68PqsbeHtfY599zbGxL9k520+6691tr77LOmvQ/8x5GRBhn9gPHAHcCtQDEwAOgL9O6guQjUA7XAEeAwUAnsAM6lQceUowhYBZQDbUAsYmsD9gIrgcK0ziACsoCZwA9En3BQ2wXMADLTNKdQyALmA7/SfRP3t2pgHlfBQowCfiJ9E/e3A8C4ZCYQ1Qj2AlYDC0PyaEUWqhIxcNVAE9DQ8XsuYhALEUN5J1CC7K4gtAPrgGeAS6FnkASKgH0EP50GYAPwEJATQU4OMBHYCDSGkFdBGgzlBMQtuRSpQXZGb51FJOQAZcDxANn1iMvtFkwDmh3Ca4EFQM/uUgC4BlgE1Dn0aAamplrwNNz+fDMwKNVCHcgH3nXo00YKF2EC9pNvBpakSlAEzMK2D82k4HUown7nTwEjkxWQAowGTmPbhIKojHsB+w3Gx3Bb3B5RhUZEEWJ8NV3LgewoTN8wGJ7CPflZiL/PiyLUQCbwFfCEg6YIeye8lqjAcUiA4Wd0ERhhjMkFPoqjfTNRoQ4sjeP7KfbijkYCLL/el4ExYYVlYm/9UmPMUCQQiadtB+4PK9SBm7jS0B0CbjDonzR0ryBk7jDfYLDZoB+CnQhVIbYkKjKA7wzeR5GF17DVGDMnSGAm8IsysBbdz+dy5ZP3txeDhDqwMIB3JdBHGZePHixVE5BfzDQELTDorZWOb63YdsOFYcCFEPzfM8aXGfSPu4RqxYwTSAjqx7QQynntAImHyF8mwP8xZXxPdNf4vSWwCN3yL1Roc4EzCSgYA5aFmragNEHef6F7hqcV2naM4GiVQtyAntUtT1DBGBKa3hJi8kNxJztWW6HwykUPlZ/XBJcrhBsUupyICsaA7QRHifGxRCKtrmPCfmxWaPf4ifqhZ3sPKgxnRFTQa085Jv9okrxnKTwfVuha8XmPyQpRC3ol53OHAhXAKwFKnkcPYgZih7JeWwb86fj9C4VvXseE/bST4olWKAS7FGbZSN3NUmACEvj8HDCRzxTervw+BnyLBEbzHDQt6IHXboV2eTyB9p6sUxiNcQivjKMb0aGMa0LT4+gnBdCeR+ICgGtx26Cxit5vKXQboNMgada5SukbpfR52BL3937gJQctSIY2EDkiWx9AuxSJR0C8yYcOWk3Hw0pfMXQuQL5CcEzpu94h2B9gvIAshIVBwBrEZlznoNsGvOPr2+Gg13Q8qvTlQ2dcrBm7C0pfX4fgQ77/W4HZyNmeVZDwPIqFOiS786NS6fPQX+nT5pILnTtA858NSp+Vh7cY9IeQg00XXAcrZcBJpf+sY4ymY+AChIU2SZCnbeFllMAjBD5Aki0NrhMgS0cV3gJog7RdUWvw6Y2eMIFUY0oR4xUWp9FzEA/aNveg6ajtigZwL4A26IxDsKtOWAU85/jdjwVIgmPBlVOcUvq0mkGXBdCE3az0VTgEa/43HmuRXCAIm4CPA2hc9T1NR20uXR6mFghpRc1s4G+FNoaEyEG4EXeR4w8kLwmCFWm2IIGSH+sV2i6BkBb0DFf6LgE/Gko9QGe0ZqEGOcbWEENqdvUBPO4DbjN+241ua+5S+o5AZxxwUCEYjcQHjb7+jehHTlmIy3PV7gHe7lDSH7OfBb4OGAtut7pJ6euDHh12mXNf9HR4ojLQKjLEEIufilK4hbmG3BhyHqAZuykKbSuKkd+rEG40FHnVochJpJafapQgBzOW3NXGOC3L3K0RrlQIG9HD5P64M7KjJHEoqWAM4qkseeeQu4d+5KIvmlY+oxC9KFpmKLXYoVAMMWaPJDJLBRlIQOR68jHsI3pNx3Z0twhIEcQ/4Dh6lNcDqcC4FIsh5e2ouD0E/23o+UQ28JtCb5bFwa73LTLoBxB8b+ebEBO1kIFEdhbvGuybKUuMMdoZwr/IRPyj9o5Z53DFSABjKflswCSDYJXKTiNX6jQMRl5B/5hqQhyQWjU3KzMD9yKEPpY2MEfh+Tvyelh439ClNIzATOx7gHMd4wYj292/c5K9zjrMx3Mn9m4ESaQ03csT0WUsEtT4mTQhEaKFLOSEyascfxJWYACOINHjKtxnjCXoF7ouA3cnKvR1hZH37hUFjC1ATm0XJyrUwGyCb4EWY8cKa6IIzcY++68heBEgfZelirG9kasmGYhCdGvq7QTX65AulGA/+TocQU9Y3IMdiV0NFyUt3ZqQ1DklmIr7quxWxAukC0OwXV0MyfampFroVNyXpeuRvMEqjqYC2ciOc91Yb6IbJu9hPLZN8NoJ5GaGVlWOilzEo2ixvf+dvzeFclUUoF+m8LeLSK1xMtEWIw95klsIzgY9a5+wwYv6yUw2cuBRRjhX14Ys2kGk/liN1Bq8E5s8pO5QhJS8hyNlrLCfzKxF7g6k5ZOZeIxEiqRBT6e72j6Cy/HdjkwkYdEuWHZXq0ISm3TfSnciE7mEuBO9spRsa0eKGdO5Cr4XDEIBchVtD8l9OtuKFDBX0D2F1rR8PN2HKz+e9m6GeAXXRsS3n0Vuc1QhR+vb0Y+2/0eq8A+7eiRd8wqrwQAAAABJRU5ErkJggg=='
        }
    };

    var RxDesignerStencilBuilder = /** @class */ (function () {
        function RxDesignerStencilBuilder() {
        }
        RxDesignerStencilBuilder.prototype.buildElementsTree = function (elementsSources, elementGroups) {
            return rxjs.forkJoin(elementsSources).pipe(operators.map(function (elements) {
                return lodash.flow(lodash.flatten, function (chainElements) { return lodash.map(chainElements, 'group'); }, lodash.uniq, lodash.compact, function (groupNames) { return lodash.sortBy(groupNames, function (groupName) { return groupName.toLowerCase(); }); }, function (groupNames) { return lodash.sortBy(groupNames, function (groupName) { return (lodash.find(elementGroups, { name: groupName }) || elementGroups.default).priority; }); }, function (groupNames) { return lodash.map(groupNames, function (groupName) {
                    return {
                        label: groupName,
                        children: lodash.flow(lodash.flatten, function (chainElements) { return lodash.filter(chainElements, { group: groupName }); }, function (chainElements) { return lodash.sortBy(chainElements, function (element) { return element.label.toLowerCase(); }); })(elements)
                    };
                }); })(elements);
            }));
        };
        return RxDesignerStencilBuilder;
    }());
    RxDesignerStencilBuilder.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerStencilBuilder, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDesignerStencilBuilder.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerStencilBuilder, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerStencilBuilder, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var _a;
    var tenancyModes = {
        shared: 0,
        dedicated: 1,
        unified: 2
    };
    var RX_ENVIRONMENT = {
        tenancyModes: tenancyModes,
        tenancyModeNames: (_a = {},
            _a[tenancyModes.shared] = 'Shared',
            _a[tenancyModes.dedicated] = 'Dedicated',
            _a[tenancyModes.unified] = 'Unified',
            _a)
    };

    var RxServerErrorHandlerService = /** @class */ (function () {
        function RxServerErrorHandlerService(translateService, rxNotificationService) {
            this.translateService = translateService;
            this.rxNotificationService = rxNotificationService;
        }
        RxServerErrorHandlerService.prototype.getServerResponseErrorDetails = function (responseData) {
            var messages;
            try {
                messages = JSON.parse(responseData);
            }
            catch (ignored) {
                messages = __spreadArray([], __read(responseData));
            }
            if (Array.isArray(messages)) {
                return messages.filter(function (message) { return message.messageType !== RX_ERROR_HANDLING.messageTypes.success &&
                    (message.messageText || message.appendedText); });
            }
            else {
                return null;
            }
        };
        RxServerErrorHandlerService.prototype.buildMessageFromRawResponse = function (response) {
            var errorMessage = {
                title: '',
                message: ''
            };
            if (response.status === 0) {
                errorMessage.title = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.network-error.title');
                errorMessage.message = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.network-error.message');
            }
            else {
                errorMessage.title = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.server-communication-error.title');
                errorMessage.message = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.server-communication-error.message', {
                    status: lodash.compact([response.status, response.statusText]).join(' ')
                });
            }
            return errorMessage;
        };
        RxServerErrorHandlerService.prototype.buildMessageFromErrorDetails = function (error) {
            return {
                title: error.messageType + " (" + error.messageNumber + ")",
                message: lodash.truncate([error.messageText, error.appendedText].filter(Boolean).join(' '), {
                    length: RX_ERROR_HANDLING.maxErrorMessageLength
                })
            };
        };
        RxServerErrorHandlerService.prototype.handle = function (error) {
            var _this = this;
            if (!this.canIgnore(error)) {
                var operationId_1 = error.headers.get('operation-id');
                if (Array.isArray(error.error) || lodash.isString(error.error)) {
                    var messages = this.getServerResponseErrorDetails(error.error);
                    messages.forEach(function (message) {
                        var messageDetails = _this.buildMessageFromErrorDetails(message);
                        switch (message.messageType) {
                            case RX_ERROR_HANDLING.messageTypes.error:
                                _this.rxNotificationService.addErrorMessage(messageDetails.message, messageDetails.title, {
                                    issue: Object.assign(Object.assign({}, message), { operationId: operationId_1, enableIssueReporting: true })
                                });
                                break;
                            case RX_ERROR_HANDLING.messageTypes.warning:
                                _this.rxNotificationService.addWarningMessage(messageDetails.message, messageDetails.title, {
                                    issue: Object.assign(Object.assign({}, message), { operationId: operationId_1, enableIssueReporting: true })
                                });
                                break;
                            case RX_ERROR_HANDLING.messageTypes.info:
                                _this.rxNotificationService.addInfoMessage(messageDetails.message, messageDetails.title);
                                break;
                        }
                    });
                }
                else {
                    var errorMessage = this.buildMessageFromRawResponse(error);
                    this.rxNotificationService.addErrorMessage(errorMessage.message, errorMessage.title);
                }
            }
        };
        RxServerErrorHandlerService.prototype.canIgnore = function (err) {
            return lodash.some(RX_ERROR_HANDLING.ignoredErrors, function (ignoredError) { return ignoredError.status === err.status && lodash.includes(JSON.stringify(err.error), ignoredError.contains); });
        };
        return RxServerErrorHandlerService;
    }());
    RxServerErrorHandlerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerErrorHandlerService, deps: [{ token: i2__namespace$1.TranslateService }, { token: RxNotificationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxServerErrorHandlerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerErrorHandlerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerErrorHandlerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$1.TranslateService }, { type: RxNotificationService }]; } });

    var RxScriptErrorHandler = /** @class */ (function () {
        function RxScriptErrorHandler(rxNotificationService, rxLogService, translateService) {
            this.rxNotificationService = rxNotificationService;
            this.rxLogService = rxLogService;
            this.translateService = translateService;
        }
        RxScriptErrorHandler.prototype.handle = function (error) {
            var rxErrorMessage = lodash.truncate(this.translateService.instant('com.bmc.arsys.rx.client.error-handling.script-error.message') + " " + error.message, {
                length: RX_ERROR_HANDLING.maxErrorMessageLength
            });
            this.rxNotificationService.addErrorMessage(rxErrorMessage, this.translateService.instant('com.bmc.arsys.rx.client.error-handling.script-error.title'), {
                suppressLog: true
            });
            this.rxLogService.error(error.stack);
        };
        return RxScriptErrorHandler;
    }());
    RxScriptErrorHandler.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxScriptErrorHandler, deps: [{ token: RxNotificationService }, { token: RxLogService }, { token: i2__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxScriptErrorHandler.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxScriptErrorHandler, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxScriptErrorHandler, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxNotificationService }, { type: RxLogService }, { type: i2__namespace$1.TranslateService }]; } });

    var RxErrorHandlerService = /** @class */ (function (_super) {
        __extends(RxErrorHandlerService, _super);
        function RxErrorHandlerService(rxServerErrorHandler, rxScriptErrorHandler, rxLogService) {
            var _this = _super.call(this) || this;
            _this.rxServerErrorHandler = rxServerErrorHandler;
            _this.rxScriptErrorHandler = rxScriptErrorHandler;
            _this.rxLogService = rxLogService;
            return _this;
        }
        RxErrorHandlerService.prototype.handleError = function (error) {
            if (error instanceof i1.HttpErrorResponse) {
                this.rxServerErrorHandler.handle(error);
                _super.prototype.handleError.call(this, error);
            }
            else if (error instanceof Error && !(error instanceof i2$2.RxError)) {
                // Script error is considered when "error" is
                // an instance of Error but not an instance of RxError
                // (RxError's must only be logged in the debug mode).
                this.rxScriptErrorHandler.handle(error);
                _super.prototype.handleError.call(this, error);
            }
            else {
                this.rxLogService.debug(error.message);
            }
        };
        return RxErrorHandlerService;
    }(i0.ErrorHandler));
    RxErrorHandlerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlerService, deps: [{ token: RxServerErrorHandlerService }, { token: RxScriptErrorHandler }, { token: RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxErrorHandlerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlerService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlerService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxServerErrorHandlerService }, { type: RxScriptErrorHandler }, { type: RxLogService }]; } });

    var RxServerMessageHandlerService = /** @class */ (function () {
        function RxServerMessageHandlerService(rxNotificationService, rxJsonParserService, rxStringService) {
            this.rxNotificationService = rxNotificationService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxStringService = rxStringService;
        }
        RxServerMessageHandlerService.prototype.handleServerResponseMessage = function (serverMessage) {
            var decodedMessage = this.rxStringService.decodeQ(serverMessage);
            var messages = lodash.reject(this.rxJsonParserService.tryParseJson(decodedMessage, []), function (message) { return message.messageNumber === RX_ERROR_HANDLING.arNoteLogInfo; });
            messages.forEach(this.addMessage.bind(this));
        };
        RxServerMessageHandlerService.prototype.addMessage = function (message) {
            var messageTitle = "" + message.messageType;
            if (message.messageType !== RX_ERROR_HANDLING.messageTypes.success) {
                messageTitle += " (" + message.messageNumber + ")";
            }
            var messageString = lodash.truncate("" + [message.appendedText, message.messageText].filter(Boolean).join(' '), {
                length: RX_ERROR_HANDLING.maxArMessageLength
            });
            switch (message.messageType) {
                case RX_ERROR_HANDLING.messageTypes.warning: {
                    this.rxNotificationService.addWarningMessage(messageString, messageTitle);
                    break;
                }
                case RX_ERROR_HANDLING.messageTypes.success: {
                    this.rxNotificationService.addSuccessMessage(messageString, messageTitle);
                    break;
                }
                default: {
                    this.rxNotificationService.addInfoMessage(messageString, messageTitle);
                    break;
                }
            }
        };
        return RxServerMessageHandlerService;
    }());
    RxServerMessageHandlerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerMessageHandlerService, deps: [{ token: RxNotificationService }, { token: i2__namespace$2.RxJsonParserService }, { token: i2__namespace$2.RxStringService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxServerMessageHandlerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerMessageHandlerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerMessageHandlerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxNotificationService }, { type: i2__namespace$2.RxJsonParserService }, { type: i2__namespace$2.RxStringService }]; } });

    var RxHttpResponseMessageInterceptor = /** @class */ (function () {
        function RxHttpResponseMessageInterceptor(rxServerMessageHandler) {
            this.rxServerMessageHandler = rxServerMessageHandler;
        }
        RxHttpResponseMessageInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            return next.handle(request).pipe(operators.tap(function (httpEvent) {
                if (httpEvent instanceof i1.HttpResponse) {
                    var message = httpEvent.headers.get(RX_ERROR_HANDLING.arMessagesHeader);
                    if (message) {
                        _this.rxServerMessageHandler.handleServerResponseMessage(message);
                    }
                }
            }));
        };
        return RxHttpResponseMessageInterceptor;
    }());
    RxHttpResponseMessageInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpResponseMessageInterceptor, deps: [{ token: RxServerMessageHandlerService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxHttpResponseMessageInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpResponseMessageInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpResponseMessageInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxServerMessageHandlerService }]; } });

    var RxErrorHandlingModule = /** @class */ (function () {
        function RxErrorHandlingModule() {
        }
        RxErrorHandlingModule.forRoot = function () {
            return {
                ngModule: RxErrorHandlingModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxHttpResponseMessageInterceptor,
                        multi: true
                    },
                    {
                        provide: i0.ErrorHandler,
                        useClass: RxErrorHandlerService
                    }
                ]
            };
        };
        return RxErrorHandlingModule;
    }());
    RxErrorHandlingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxErrorHandlingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlingModule, imports: [i3.CommonModule] });
    RxErrorHandlingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlingModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorHandlingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule]
                    }]
            }] });

    exports.ExpressionOperator = void 0;
    (function (ExpressionOperator) {
        ExpressionOperator["LeftGrouping"] = "(";
        ExpressionOperator["RightGrouping"] = ")";
        ExpressionOperator["DoubleQuote"] = "\"";
        ExpressionOperator["Add"] = "+";
        ExpressionOperator["Subtract"] = "-";
        ExpressionOperator["Multiply"] = "*";
        ExpressionOperator["Divide"] = "/";
        ExpressionOperator["Remainder"] = "%";
        ExpressionOperator["GreaterThan"] = ">";
        ExpressionOperator["LessThan"] = "<";
        ExpressionOperator["Equal"] = "=";
        ExpressionOperator["NotEqual"] = "!=";
        ExpressionOperator["GreaterThanOrEqual"] = ">=";
        ExpressionOperator["LessThanOrEqual"] = "<=";
        ExpressionOperator["In"] = "IN";
        ExpressionOperator["Like"] = "LIKE";
        ExpressionOperator["Contains"] = "CONTAINS";
        ExpressionOperator["And"] = "AND";
        ExpressionOperator["Or"] = "OR";
        ExpressionOperator["Not"] = "NOT";
        ExpressionOperator["Null"] = "NULL";
        ExpressionOperator["NullExpression"] = "$NULL$";
    })(exports.ExpressionOperator || (exports.ExpressionOperator = {}));

    exports.ExpressionOperatorGroup = void 0;
    (function (ExpressionOperatorGroup) {
        ExpressionOperatorGroup["All"] = "all";
        ExpressionOperatorGroup["AllServer"] = "allServer";
        ExpressionOperatorGroup["AllClient"] = "allClient";
        ExpressionOperatorGroup["Math"] = "math";
        ExpressionOperatorGroup["MathClient"] = "mathClient";
    })(exports.ExpressionOperatorGroup || (exports.ExpressionOperatorGroup = {}));
    var allOperatorsMap = new Map(Object.values(exports.ExpressionOperator).map(function (value) { return [
        value,
        {
            displayValue: value === exports.ExpressionOperator.NullExpression ? 'NULL' : value,
            value: value
        }
    ]; }));
    var allOperatorRows = [
        [
            allOperatorsMap.get(exports.ExpressionOperator.LeftGrouping),
            allOperatorsMap.get(exports.ExpressionOperator.RightGrouping),
            allOperatorsMap.get(exports.ExpressionOperator.DoubleQuote),
            allOperatorsMap.get(exports.ExpressionOperator.Add),
            allOperatorsMap.get(exports.ExpressionOperator.Subtract),
            allOperatorsMap.get(exports.ExpressionOperator.Multiply),
            allOperatorsMap.get(exports.ExpressionOperator.Divide),
            allOperatorsMap.get(exports.ExpressionOperator.Remainder)
        ],
        [
            allOperatorsMap.get(exports.ExpressionOperator.GreaterThan),
            allOperatorsMap.get(exports.ExpressionOperator.LessThan),
            allOperatorsMap.get(exports.ExpressionOperator.Equal),
            allOperatorsMap.get(exports.ExpressionOperator.NotEqual),
            allOperatorsMap.get(exports.ExpressionOperator.GreaterThanOrEqual),
            allOperatorsMap.get(exports.ExpressionOperator.LessThanOrEqual),
            allOperatorsMap.get(exports.ExpressionOperator.Like)
        ],
        [
            allOperatorsMap.get(exports.ExpressionOperator.And),
            allOperatorsMap.get(exports.ExpressionOperator.Or),
            allOperatorsMap.get(exports.ExpressionOperator.Not),
            allOperatorsMap.get(exports.ExpressionOperator.NullExpression)
        ]
    ];
    var allClientOperatorRows = [
        __spreadArray([], __read(allOperatorRows[0])),
        [
            allOperatorsMap.get(exports.ExpressionOperator.GreaterThan),
            allOperatorsMap.get(exports.ExpressionOperator.LessThan),
            allOperatorsMap.get(exports.ExpressionOperator.Equal),
            allOperatorsMap.get(exports.ExpressionOperator.NotEqual),
            allOperatorsMap.get(exports.ExpressionOperator.GreaterThanOrEqual),
            allOperatorsMap.get(exports.ExpressionOperator.LessThanOrEqual),
            allOperatorsMap.get(exports.ExpressionOperator.Contains)
        ],
        [
            allOperatorsMap.get(exports.ExpressionOperator.And),
            allOperatorsMap.get(exports.ExpressionOperator.Or),
            allOperatorsMap.get(exports.ExpressionOperator.Not),
            allOperatorsMap.get(exports.ExpressionOperator.Null)
        ]
    ];
    var mathOperatorRow = [
        allOperatorsMap.get(exports.ExpressionOperator.LeftGrouping),
        allOperatorsMap.get(exports.ExpressionOperator.RightGrouping),
        allOperatorsMap.get(exports.ExpressionOperator.DoubleQuote),
        allOperatorsMap.get(exports.ExpressionOperator.Add),
        allOperatorsMap.get(exports.ExpressionOperator.Subtract),
        allOperatorsMap.get(exports.ExpressionOperator.Multiply),
        allOperatorsMap.get(exports.ExpressionOperator.Divide),
        allOperatorsMap.get(exports.ExpressionOperator.Remainder)
    ];
    var ExpressionOperatorRowsByGroup = new Map([
        [exports.ExpressionOperatorGroup.All, allOperatorRows],
        [exports.ExpressionOperatorGroup.AllServer, allOperatorRows],
        [exports.ExpressionOperatorGroup.AllClient, allClientOperatorRows],
        [exports.ExpressionOperatorGroup.Math, [__spreadArray(__spreadArray([], __read(mathOperatorRow)), [allOperatorsMap.get(exports.ExpressionOperator.NullExpression)])]],
        [exports.ExpressionOperatorGroup.MathClient, [__spreadArray(__spreadArray([], __read(mathOperatorRow)), [allOperatorsMap.get(exports.ExpressionOperator.Null)])]]
    ]);

    var RxExpressionConfigurator = /** @class */ (function () {
        function RxExpressionConfigurator() {
            this.expressionConfigs = [];
        }
        RxExpressionConfigurator.prototype.getDefaultConfig = function () {
            return {
                dataDictionary$: this.commonDataDictionary$,
                operators: ExpressionOperatorRowsByGroup.get(exports.ExpressionOperatorGroup.Math),
                validateExpression: function (propertyPath, expression) { return rxjs.of(true); }
            };
        };
        RxExpressionConfigurator.prototype.configureForProperty = function (config) {
            this.expressionConfigs.push(Object.assign(Object.assign({}, this.getDefaultConfig()), config));
        };
        RxExpressionConfigurator.prototype.getDataDictionary = function (propertyPath) {
            var _this = this;
            return this.getExpressionConfig(propertyPath).dataDictionary$.pipe(operators.map(function (dataDictionary) { return _this.sortDataDictionary(dataDictionary); }));
        };
        RxExpressionConfigurator.prototype.getOperators = function (propertyPath) {
            return lodash.flatten(this.getOperatorRows(propertyPath));
        };
        RxExpressionConfigurator.prototype.getOperatorRows = function (propertyPath) {
            return this.getExpressionConfig(propertyPath).operators;
        };
        RxExpressionConfigurator.prototype.getOperatorRowsByGroup = function (group) {
            return lodash.cloneDeep(ExpressionOperatorRowsByGroup.get(group));
        };
        RxExpressionConfigurator.prototype.getExpressionConfig = function (propertyPath) {
            return (this.expressionConfigs.find(function (config) { return lodash.isRegExp(config.propertyPath) ? config.propertyPath.test(propertyPath) : config.propertyPath === propertyPath; }) || Object.assign({ propertyPath: propertyPath }, this.getDefaultConfig()));
        };
        RxExpressionConfigurator.prototype.validateProperty = function (propertyPath, propertyValue) {
            return propertyValue
                ? this.getExpressionConfig(propertyPath).validateExpression(propertyPath, propertyValue)
                : rxjs.of(true);
        };
        RxExpressionConfigurator.prototype.sortDataDictionary = function (dataDictionary) {
            var _this = this;
            lodash.forEach(dataDictionary, function (node) {
                if (node.children) {
                    node.children = _this.sortDataDictionary(lodash.sortBy(node.children, [function (child) { return !lodash.isUndefined(child.expression); }, 'label']));
                }
            });
            return dataDictionary;
        };
        return RxExpressionConfigurator;
    }());

    exports.ExpressionParserToken = void 0;
    (function (ExpressionParserToken) {
        ExpressionParserToken["SingleQuoteRxExpression"] = "__SINGLE_QUOTE_RX_EXPRESSION__";
        ExpressionParserToken["SingleQuoteTextExpression"] = "__SINGLE_QUOTE_TEXT_EXPRESSION__";
        ExpressionParserToken["ArExpression"] = "__AR_EXPRESSION__";
        ExpressionParserToken["RxExpression"] = "__RX_EXPRESSION__";
        ExpressionParserToken["RxStringExpression"] = "__RX_STRING_EXPRESSION__";
        ExpressionParserToken["RxOperator"] = "__RX_OP__";
    })(exports.ExpressionParserToken || (exports.ExpressionParserToken = {}));

    var RxExpressionParserService = /** @class */ (function () {
        function RxExpressionParserService() {
            this.tokenRegExpMap = new Map([
                [exports.ExpressionParserToken.SingleQuoteRxExpression, /('\${[^{}$]+}')/g],
                [exports.ExpressionParserToken.SingleQuoteTextExpression, /('[^$']+')/g],
                [exports.ExpressionParserToken.ArExpression, /(\$[A-Z]+\$)|(\$\\[A-Z]+\$)/g],
                [exports.ExpressionParserToken.RxExpression, /(\${[^{}$]+})/g],
                [exports.ExpressionParserToken.RxStringExpression, /("[^"]+")|('[^']+')/g]
            ]);
        }
        RxExpressionParserService.prototype.parse = function (expression, replaceFunc, operators) {
            var e_1, _a, _b;
            if (operators === void 0) { operators = []; }
            if (operators.length) {
                var pattern = operators
                    // Sort operators in descending order by length to find a compound operator in an expression.
                    // e.g. "${foo} >= ${bar}" has ">=" operator instead of ">" and "=" separately.
                    .sort(function (prevOperator, operator) { return operator.value.length - prevOperator.value.length; })
                    .map(function (operator) { return "\\" + operator.value.split('').join('\\'); })
                    .join('|');
                this.tokenRegExpMap.set(exports.ExpressionParserToken.RxOperator, new RegExp(pattern, 'g'));
            }
            var expressionValuesMap = new Map();
            try {
                for (var _c = __values(this.tokenRegExpMap), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 1), token = _e[0];
                    var expressionValues = void 0;
                    (_b = this.extractExpressionValues(expression, token, this.tokenRegExpMap.get(token)), expression = _b.expression, expressionValues = _b.expressionValues);
                    if (expressionValues) {
                        expressionValuesMap.set(token, expressionValues);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return Array.from(expressionValuesMap.keys())
                .reverse()
                .reduce(function (result, token) { return result.replace(new RegExp(token, 'g'), function () { return replaceFunc(token, expressionValuesMap.get(token).next().value); }); }, expression);
        };
        // Replaces all spaces with a single space except user inputs
        // ${view.foo} =   "bar" -> ${view.foo} = "bar"
        // ${view.foo} =   "    bar" -> ${view.foo} = "    bar"
        RxExpressionParserService.prototype.stripSpaces = function (expression) {
            var result = expression;
            if (!lodash.isNil(expression)) {
                var token = exports.ExpressionParserToken.RxStringExpression;
                var extractExpressionsResult_1 = this.extractExpressionValues(expression, token, this.tokenRegExpMap.get(token));
                result = extractExpressionsResult_1.expression
                    .replace(/\s+/g, ' ')
                    .replace(new RegExp(exports.ExpressionParserToken.RxStringExpression, 'g'), function () { return extractExpressionsResult_1.expressionValues.next().value; });
            }
            return result;
        };
        RxExpressionParserService.prototype.extractExpressionValues = function (expression, token, regExp) {
            var expressionValues = expression.match(regExp);
            lodash.forEach(expressionValues, function (value) { return (expression = expression.replace(value, token)); });
            return {
                expression: expression,
                expressionValues: expressionValues && expressionValues.values()
            };
        };
        return RxExpressionParserService;
    }());
    RxExpressionParserService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionParserService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxExpressionParserService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionParserService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionParserService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    exports.FormBuilderEvent = void 0;
    (function (FormBuilderEvent) {
        FormBuilderEvent[FormBuilderEvent["HideWidget"] = 0] = "HideWidget";
    })(exports.FormBuilderEvent || (exports.FormBuilderEvent = {}));

    var RxFunctionalRoleDataPageService = /** @class */ (function (_super) {
        __extends(RxFunctionalRoleDataPageService, _super);
        function RxFunctionalRoleDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.functionalrole.datapage.FunctionalRoleDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxFunctionalRoleDataPageService;
    }(DataPage));
    RxFunctionalRoleDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFunctionalRoleDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFunctionalRoleDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFunctionalRoleDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFunctionalRoleDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    exports.NodeInfoType = void 0;
    (function (NodeInfoType) {
        NodeInfoType["function"] = "function";
    })(exports.NodeInfoType || (exports.NodeInfoType = {}));

    var RxDataDictionaryUtils = /** @class */ (function () {
        function RxDataDictionaryUtils() {
        }
        RxDataDictionaryUtils.prototype.addTooltips = function (dataDictionary, parentNodeLabel) {
            var _this = this;
            return lodash.map(dataDictionary, function (node) {
                var tooltip = parentNodeLabel ? parentNodeLabel + " > " + node.label : node.label;
                return Object.assign(Object.assign({}, node), { tooltip: tooltip, children: node.children ? _this.addTooltips(node.children, tooltip) : null });
            });
        };
        // TODO-VS: refactor to use below method
        RxDataDictionaryUtils.prototype.getFunctionsDataDictionaryBranch = function (functionDescriptors) {
            return lodash.chain(functionDescriptors)
                .groupBy('category')
                .map(function (functionDescriptors, category) { return ({
                label: category,
                children: lodash.map(functionDescriptors, function (functionDescriptor) { return ({
                    label: functionDescriptor.name + '()',
                    icon: 'd-icon-mathematical_function',
                    expression: functionDescriptor.name + '()',
                    info: {
                        type: exports.NodeInfoType.function,
                        data: functionDescriptor
                    }
                }); })
            }); })
                .value();
        };
        RxDataDictionaryUtils.prototype.getFunctionDataDictionaryBranch = function (functionDescriptors) {
            return lodash.chain(functionDescriptors)
                .groupBy('type')
                .map(function (functionDescriptors, functionType) { return ({
                label: functionType,
                children: lodash.map(functionDescriptors, function (functionDescriptor) { return ({
                    label: functionDescriptor.name + '()',
                    icon: 'd-icon-mathematical_function',
                    expression: functionDescriptor.name + '()',
                    info: {
                        type: exports.NodeInfoType.function,
                        data: functionDescriptor
                    }
                }); })
            }); })
                .value();
        };
        return RxDataDictionaryUtils;
    }());
    RxDataDictionaryUtils.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataDictionaryUtils, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDataDictionaryUtils.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataDictionaryUtils, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataDictionaryUtils, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxGlobalEventsService = /** @class */ (function () {
        function RxGlobalEventsService() {
            this.viewActionsCompleted$ = new rxjs.Subject();
        }
        return RxGlobalEventsService;
    }());
    RxGlobalEventsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGlobalEventsService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGlobalEventsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGlobalEventsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGlobalEventsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var groupDataPageQuery = 'com.bmc.arsys.rx.application.group.datapage.GroupDataPageQuery';
    var RxGroupDataPageService = /** @class */ (function (_super) {
        __extends(RxGroupDataPageService, _super);
        function RxGroupDataPageService(injector) {
            var _this = _super.call(this, injector, groupDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        return RxGroupDataPageService;
    }(DataPage));
    RxGroupDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGroupDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGroupDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGroupDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGroupDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxHttpParameterCodec = /** @class */ (function () {
        function RxHttpParameterCodec() {
        }
        RxHttpParameterCodec.prototype.encodeKey = function (key) {
            return encodeURIComponent(key);
        };
        RxHttpParameterCodec.prototype.encodeValue = function (value) {
            return encodeURIComponent(value);
        };
        RxHttpParameterCodec.prototype.decodeKey = function (key) {
            return decodeURIComponent(key);
        };
        RxHttpParameterCodec.prototype.decodeValue = function (value) {
            return decodeURIComponent(value);
        };
        return RxHttpParameterCodec;
    }());

    var RxHttpParamsInterceptor = /** @class */ (function () {
        function RxHttpParamsInterceptor() {
        }
        RxHttpParamsInterceptor.prototype.intercept = function (request, next) {
            var params = new i1.HttpParams({
                encoder: new RxHttpParameterCodec(),
                fromString: request.params.toString()
            });
            return next.handle(request.clone({ params: params }));
        };
        return RxHttpParamsInterceptor;
    }());
    RxHttpParamsInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpParamsInterceptor, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxHttpParamsInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpParamsInterceptor, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpParamsInterceptor, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxHttpModule = /** @class */ (function () {
        function RxHttpModule() {
        }
        RxHttpModule.forRoot = function () {
            return {
                ngModule: RxHttpModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxHttpParamsInterceptor,
                        multi: true
                    }
                ]
            };
        };
        return RxHttpModule;
    }());
    RxHttpModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxHttpModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpModule });
    RxHttpModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpModule, decorators: [{
                type: i0.NgModule
            }] });

    var RxLicenseDataPageService = /** @class */ (function (_super) {
        __extends(RxLicenseDataPageService, _super);
        function RxLicenseDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.license.datapage.LicenseDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxLicenseDataPageService;
    }(DataPage));
    RxLicenseDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLicenseDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLicenseDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLicenseDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLicenseDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxHttpLogInterceptor = /** @class */ (function () {
        function RxHttpLogInterceptor(rxLogService, rxJsonParserService) {
            this.rxLogService = rxLogService;
            this.rxJsonParserService = rxJsonParserService;
        }
        RxHttpLogInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            if (this.rxLogService.logCategories.length) {
                var headers = request.headers.set('log-retrieval', this.rxLogService.serverLogCategories);
                this.rxLogService.debug(request.method + " " + this.getAbsoluteRequestUrl(request.urlWithParams));
                return next.handle(request.clone({ headers: headers })).pipe(operators.tap(function (httpEvent) {
                    if (httpEvent instanceof i1.HttpResponse) {
                        var serverLog = httpEvent.headers.get(RX_ERROR_HANDLING.arMessagesHeader);
                        if (serverLog) {
                            var serverLogMessages = _this.rxJsonParserService.tryParseJson(serverLog, []);
                            serverLogMessages = lodash.filter(serverLogMessages, 'messageText');
                            lodash.forEach(serverLogMessages, function (logData) { return _this.rxLogService.log(logData.messageText); });
                        }
                    }
                }), operators.catchError(function (err) {
                    _this.rxLogService.warning(request.method + " " + _this.getAbsoluteRequestUrl(request.urlWithParams) + " " + err.status + " (" + err.statusText + ")");
                    return rxjs.throwError(err);
                }));
            }
            else {
                return next.handle(request);
            }
        };
        RxHttpLogInterceptor.prototype.getAbsoluteRequestUrl = function (url) {
            if (lodash.startsWith(url, '/')) {
                return "" + location.origin + url;
            }
            else {
                return url;
            }
        };
        return RxHttpLogInterceptor;
    }());
    RxHttpLogInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpLogInterceptor, deps: [{ token: RxLogService }, { token: i2__namespace$2.RxJsonParserService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxHttpLogInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpLogInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxHttpLogInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxLogService }, { type: i2__namespace$2.RxJsonParserService }]; } });

    var allowedCategories = Object.values(exports.LogCategory);
    var RxConsoleLogger = /** @class */ (function () {
        function RxConsoleLogger(rxLogService) {
            this.rxLogService = rxLogService;
        }
        RxConsoleLogger.prototype.setCategories = function (categories) {
            if (!lodash.isArray(categories) || !lodash.every(categories, function (category) { return allowedCategories.includes(category); })) {
                var validCategories = allowedCategories.map(function (category) { return "'" + category + "'"; }).join(', ');
                throw new Error("Invalid category specified. Valid categories: [" + validCategories + "].");
            }
            else {
                this.rxLogService.configure(categories);
            }
        };
        RxConsoleLogger.prototype.getCategories = function () {
            return this.rxLogService.logCategories;
        };
        RxConsoleLogger.prototype.disable = function () {
            this.rxLogService.configure([]);
        };
        return RxConsoleLogger;
    }());

    var RxLoggingModule = /** @class */ (function () {
        function RxLoggingModule(rxLogService) {
            lodash.defaults(window, { rx: {} });
            window['rx'].logger = new RxConsoleLogger(rxLogService);
        }
        RxLoggingModule.forRoot = function () {
            return {
                ngModule: RxLoggingModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxHttpLogInterceptor,
                        multi: true
                    }
                ]
            };
        };
        return RxLoggingModule;
    }());
    RxLoggingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoggingModule, deps: [{ token: RxLogService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxLoggingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoggingModule, imports: [i3.CommonModule] });
    RxLoggingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoggingModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLoggingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule]
                    }]
            }], ctorParameters: function () { return [{ type: RxLogService }]; } });

    var RxNotificationComponent = /** @class */ (function () {
        function RxNotificationComponent(rxNotificationService, rxSessionService, translateService, changeDetector, adaptMessageService) {
            this.rxNotificationService = rxNotificationService;
            this.rxSessionService = rxSessionService;
            this.translateService = translateService;
            this.changeDetector = changeDetector;
            this.adaptMessageService = adaptMessageService;
        }
        RxNotificationComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxNotificationService.messages$.subscribe(function (notificationMessage) {
                var issueData = Object.assign(Object.assign({}, notificationMessage.data), { severity: notificationMessage.severity });
                var link = issueData.enableIssueReporting && _this.rxSessionService.isAlive()
                    ? _this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.report-issue.label')
                    : null;
                _this.adaptMessageService.add(Object.assign(Object.assign({}, notificationMessage), { link: link, linkHandler: function () {
                        _this.rxNotificationService.reportIssue(issueData);
                    } }));
                _this.changeDetector.detectChanges();
            });
        };
        return RxNotificationComponent;
    }());
    RxNotificationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationComponent, deps: [{ token: RxNotificationService }, { token: RxSessionService }, { token: i2__namespace$1.TranslateService }, { token: i0__namespace.ChangeDetectorRef }, { token: i4__namespace.AdaptMessageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxNotificationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNotificationComponent, selector: "rx-notification", ngImport: i0__namespace, template: "<adapt-toast placement=\"top-right\"></adapt-toast>\n", styles: ["adapt-toast{word-break:break-word}:host::ng-deep .a-toast__detail{white-space:pre-wrap}\n"], components: [{ type: i4__namespace.AdaptToastComponent, selector: "adapt-toast", inputs: ["link", "appendToBody", "aria-label", "aria-labelledby", "tabindex", "testID", "id", "placement", "adaptRadarDisableEventSending"], outputs: ["linkClick", "onAnimationEnd"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-notification',
                        templateUrl: './notification.component.html',
                        styleUrls: ['./notification.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: RxNotificationService }, { type: RxSessionService }, { type: i2__namespace$1.TranslateService }, { type: i0__namespace.ChangeDetectorRef }, { type: i4__namespace.AdaptMessageService }]; } });

    var RxNotificationModule = /** @class */ (function () {
        function RxNotificationModule(rxNotificationService) {
            this.rxNotificationService = rxNotificationService;
            this.rxNotificationService.initialize();
        }
        return RxNotificationModule;
    }());
    RxNotificationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationModule, deps: [{ token: RxNotificationService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxNotificationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationModule, declarations: [RxNotificationComponent], imports: [i4.AdaptToastModule, i3.CommonModule, i2$1.TranslateModule], exports: [RxNotificationComponent] });
    RxNotificationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationModule, imports: [[i4.AdaptToastModule, i3.CommonModule, i2$1.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNotificationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.AdaptToastModule, i3.CommonModule, i2$1.TranslateModule],
                        declarations: [RxNotificationComponent],
                        exports: [RxNotificationComponent]
                    }]
            }], ctorParameters: function () { return [{ type: RxNotificationService }]; } });

    var RxCustomizationStatusPipe = /** @class */ (function () {
        function RxCustomizationStatusPipe(translateService) {
            this.translateService = translateService;
        }
        RxCustomizationStatusPipe.prototype.transform = function (value) {
            switch (value) {
                case RX_OVERLAY.customizationPerspective.createdInThisOverlayGroup:
                    return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.created-in-this-overlay-group.label');
                case RX_OVERLAY.customizationPerspective.customizedInThisOverlayGroup:
                    return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.customized-in-this-overlay-group.label');
                case RX_OVERLAY.customizationPerspective.notCustomizedInThisOverlayGroup:
                    return this.translateService.instant('com.bmc.arsys.rx.innovation-studio.customization-status.not-customized-in-this-overlay-group.label');
                default:
                    return '';
            }
        };
        return RxCustomizationStatusPipe;
    }());
    RxCustomizationStatusPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCustomizationStatusPipe, deps: [{ token: i2__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxCustomizationStatusPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCustomizationStatusPipe, name: "rxCustomizationStatus" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCustomizationStatusPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxCustomizationStatus'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$1.TranslateService }]; } });

    var RxOverlayRequestsInterceptor = /** @class */ (function () {
        function RxOverlayRequestsInterceptor(rxOverlayService) {
            this.rxOverlayService = rxOverlayService;
        }
        RxOverlayRequestsInterceptor.prototype.intercept = function (request, next) {
            var currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
            if ((currentOverlayContext === null || currentOverlayContext === void 0 ? void 0 : currentOverlayContext.overlayGroupId) && !request.headers.get('request-overlay-group')) {
                request = request.clone({
                    headers: request.headers.set('request-overlay-group', currentOverlayContext.overlayGroupId)
                });
            }
            return next.handle(request);
        };
        return RxOverlayRequestsInterceptor;
    }());
    RxOverlayRequestsInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayRequestsInterceptor, deps: [{ token: RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxOverlayRequestsInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayRequestsInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayRequestsInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxOverlayService }]; } });

    var RxOverlayModule = /** @class */ (function () {
        function RxOverlayModule() {
        }
        RxOverlayModule.forRoot = function () {
            return {
                ngModule: RxOverlayModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxOverlayRequestsInterceptor,
                        multi: true
                    }
                ]
            };
        };
        return RxOverlayModule;
    }());
    RxOverlayModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxOverlayModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayModule, declarations: [RxCustomizationStatusPipe], imports: [i3.CommonModule], exports: [RxCustomizationStatusPipe] });
    RxOverlayModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOverlayModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule],
                        declarations: [RxCustomizationStatusPipe],
                        exports: [RxCustomizationStatusPipe]
                    }]
            }] });

    var publicPermissionType = 'Public';
    var viewComponents = {
        menuItem: 'rx-shell-menu-item',
        menuGroup: 'rx-shell-menu-group'
    };
    var RX_PERMISSION = {
        instancesWithPermissions: [
            'record',
            'field',
            'process',
            'config',
            'runtimeconfig',
            'view',
            'externalconfig',
            viewComponents.menuItem,
            viewComponents.menuGroup
        ],
        editorContexts: {
            view: 'view',
            field: 'field',
            record: 'record',
            process: 'process'
        },
        haveOverlayLogic: ['record', 'field'],
        permissionType: {
            role: 'role',
            group: 'group',
            securityLabel: 'securityLabel'
        },
        administratorGroup: 'Administrator',
        fieldPermissions: {
            view: 'VIEW',
            change: 'CHANGE'
        },
        permissionDialogMetadata: {
            field: {
                headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.field',
                actions: [
                    {
                        value: 'VIEW',
                        label: 'com.bmc.arsys.rx.client.permission-editor.column.view.label'
                    },
                    {
                        value: 'CHANGE',
                        label: 'com.bmc.arsys.rx.client.permission-editor.column.change.label'
                    }
                ],
                uniqueAction: true,
                filterPermissionGroupIDs: [1, 2, 5, 7, 8, 9] // these are admin group ids, that cannot be restricted in access. Therefore should be filtered
            },
            record: {
                headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.record',
                actions: [],
                defaultPermittedAction: 'VISIBLE',
                uniqueAction: true,
                filterPermissionGroupIDs: [1, 2, 5, 7, 8, 9] // these are admin group ids, that cannot be restricted in access. Therefore should be filtered
            },
            config: {
                headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
                actions: [
                    {
                        value: 'VIEW',
                        label: 'com.bmc.arsys.rx.client.permission-editor.column.view.label'
                    },
                    {
                        value: 'CHANGE',
                        label: 'com.bmc.arsys.rx.client.permission-editor.column.change.label'
                    }
                ],
                uniqueAction: true
            },
            externalconfig: {
                headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
                actions: [],
                defaultPermittedAction: 'VIEW',
                uniqueAction: true
            },
            runtimeconfig: {
                headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.config',
                actions: [],
                defaultPermittedAction: 'VISIBLE',
                uniqueAction: true
            },
            process: {
                headerText: 'com.bmc.arsys.rx.client.permission-editor.header.caption.process',
                actions: [
                    {
                        value: 'EXECUTE',
                        label: 'com.bmc.arsys.rx.client.permission-editor.column.execute.label'
                    },
                    {
                        value: 'READ',
                        label: 'com.bmc.arsys.rx.client.permission-editor.column.read.label'
                    }
                ],
                uniqueAction: true
            },
            view: {
                actions: [],
                defaultPermittedAction: 'VISIBLE',
                uniqueAction: true
            },
            viewComponent: {
                actions: [],
                defaultPermission: {
                    value: 0,
                    name: publicPermissionType,
                    type: 'GROUP'
                },
                defaultPermittedAction: 'VISIBLE',
                uniqueAction: true
            }
        },
        publicPermissionType: publicPermissionType,
        viewComponents: viewComponents,
        viewComponentsContext: 'viewComponent',
        permissionScope: {
            all: 'all'
        },
        groupCategoryFieldId: 120,
        groupIdFieldId: 106,
        restrictedGroupCategoryForNonFieldPermissions: {
            dynamic: 1
        },
        restrictedGroupIdForNonFieldPermissions: {
            subAdministratorGroup: 5
        }
    };

    var RxBooleanPipe = /** @class */ (function () {
        function RxBooleanPipe(translateService) {
            this.translateService = translateService;
        }
        RxBooleanPipe.prototype.transform = function (value, trueValueParam, falseValueParam) {
            var trueValueTranslation = this.translateService.instant('com.bmc.arsys.rx.client.common.true');
            var falseValueTranslation = this.translateService.instant('com.bmc.arsys.rx.client.common.false');
            var outputValue = value;
            switch (value) {
                case '1':
                case true:
                case 1: {
                    outputValue = trueValueParam || trueValueTranslation;
                    break;
                }
                case '0':
                case false:
                case 0: {
                    outputValue = falseValueParam || falseValueTranslation;
                    break;
                }
            }
            return outputValue;
        };
        return RxBooleanPipe;
    }());
    RxBooleanPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanPipe, deps: [{ token: i2__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxBooleanPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanPipe, name: "rxBoolean" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxBoolean'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$1.TranslateService }]; } });

    var RxPipesModule = /** @class */ (function () {
        function RxPipesModule() {
        }
        return RxPipesModule;
    }());
    RxPipesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPipesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxPipesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPipesModule, declarations: [RxBooleanPipe], exports: [RxBooleanPipe] });
    RxPipesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPipesModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPipesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxBooleanPipe],
                        exports: [RxBooleanPipe]
                    }]
            }] });

    var RxPreviousStateService = /** @class */ (function () {
        function RxPreviousStateService(router, rxGlobalCacheService) {
            var _this = this;
            this.router = router;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.currentUrl = this.router.url;
            router.events.subscribe(function (event) {
                if (event instanceof i3$1.NavigationEnd) {
                    _this.previousUrl = _this.currentUrl;
                    _this.currentUrl = event.url;
                }
            });
        }
        RxPreviousStateService.prototype.goToPrevState = function () {
            if (this.previousUrl &&
                this.previousUrl !== this.currentUrl &&
                this.previousUrl !== this.rxGlobalCacheService.applicationId + "/login") {
                this.router.navigateByUrl(this.previousUrl);
            }
            else {
                this.router.navigate([this.rxGlobalCacheService.applicationId]);
            }
        };
        return RxPreviousStateService;
    }());
    RxPreviousStateService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPreviousStateService, deps: [{ token: i3__namespace.Router }, { token: RxGlobalCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxPreviousStateService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPreviousStateService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPreviousStateService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.Router }, { type: RxGlobalCacheService }]; } });

    var roleDataPageQuery = 'com.bmc.arsys.rx.application.role.datapage.RoleDataPageQuery';
    var RxRoleDataPageService = /** @class */ (function (_super) {
        __extends(RxRoleDataPageService, _super);
        function RxRoleDataPageService(injector) {
            var _this = _super.call(this, injector, roleDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        return RxRoleDataPageService;
    }(DataPage));
    RxRoleDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRoleDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRoleDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRoleDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRoleDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxAuthInterceptor = /** @class */ (function () {
        function RxAuthInterceptor(rxAuthService) {
            this.rxAuthService = rxAuthService;
        }
        RxAuthInterceptor.prototype.intercept = function (req, next) {
            var _this = this;
            return next.handle(req).pipe(operators.catchError(function (err) {
                if (err.status === 401) {
                    _this.rxAuthService.redirectToLoginPage();
                }
                return rxjs.throwError(err);
            }));
        };
        return RxAuthInterceptor;
    }());
    RxAuthInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthInterceptor, deps: [{ token: RxAuthService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAuthInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxAuthService }]; } });

    var RxAuthGuard = /** @class */ (function () {
        function RxAuthGuard(router, rxAuthService, rxSessionService, rxCurrentUserService, rxGlobalCacheService) {
            this.router = router;
            this.rxAuthService = rxAuthService;
            this.rxSessionService = rxSessionService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxGlobalCacheService = rxGlobalCacheService;
        }
        RxAuthGuard.prototype.canActivate = function (next, state) {
            var _this = this;
            return this.rxSessionService.initSession().pipe(operators.map(function () {
                var applicationId = lodash.head(next.url).path;
                if (applicationId === RX_APPLICATION.innovationStudioBundleId &&
                    !(_this.rxCurrentUserService.isAdministrator() || _this.rxCurrentUserService.isBusinessAnalyst())) {
                    _this.rxGlobalCacheService.applicationId = RX_APPLICATION.innovationStudioBundleId;
                    return _this.router.parseUrl('access-denied');
                }
                return true;
            }), operators.catchError(function (error) {
                if (error.headers.get('sso-provider-type') === RX_SESSION.ssoProviderTypes.rsso) {
                    _this.router.navigate(['unsupported-environment']);
                    return rxjs.EMPTY;
                }
                _this.rxAuthService.redirectToLoginPage();
                return rxjs.EMPTY;
            }));
        };
        return RxAuthGuard;
    }());
    RxAuthGuard.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthGuard, deps: [{ token: i3__namespace.Router }, { token: RxAuthService }, { token: RxSessionService }, { token: RxCurrentUserService }, { token: RxGlobalCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAuthGuard.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthGuard, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthGuard, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.Router }, { type: RxAuthService }, { type: RxSessionService }, { type: RxCurrentUserService }, { type: RxGlobalCacheService }]; } });

    var RxAuthModule = /** @class */ (function () {
        function RxAuthModule() {
        }
        RxAuthModule.forRoot = function () {
            return {
                ngModule: RxAuthModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxAuthInterceptor,
                        multi: true
                    }
                ]
            };
        };
        return RxAuthModule;
    }());
    RxAuthModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxAuthModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthModule, imports: [i3.CommonModule] });
    RxAuthModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAuthModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule]
                    }]
            }] });

    var RxSessionExpirationInterceptor = /** @class */ (function () {
        function RxSessionExpirationInterceptor(rxSessionExpirationService) {
            this.rxSessionExpirationService = rxSessionExpirationService;
        }
        RxSessionExpirationInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            return next.handle(request).pipe(operators.tap(function (event) {
                if (event instanceof i1.HttpResponse) {
                    var responseDate = new Date(event.headers.get('date'));
                    if (!_this.lastResponseDate || responseDate >= _this.lastResponseDate) {
                        _this.lastResponseDate = responseDate;
                        var idleTimeout = event.headers.get(RX_SESSION.expirationHeaders.idle);
                        var absoluteTimeout = event.headers.get(RX_SESSION.expirationHeaders.absolute);
                        _this.rxSessionExpirationService.setTimeout(SessionExpirationType.Idle, idleTimeout);
                        _this.rxSessionExpirationService.setTimeout(SessionExpirationType.Absolute, absoluteTimeout);
                    }
                }
            }));
        };
        return RxSessionExpirationInterceptor;
    }());
    RxSessionExpirationInterceptor.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationInterceptor, deps: [{ token: RxSessionExpirationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSessionExpirationInterceptor.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationInterceptor });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationInterceptor, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: RxSessionExpirationService }]; } });

    var RxSessionExpirationModule = /** @class */ (function () {
        function RxSessionExpirationModule() {
        }
        RxSessionExpirationModule.forRoot = function () {
            return {
                ngModule: RxSessionExpirationModule,
                providers: [
                    {
                        provide: i1.HTTP_INTERCEPTORS,
                        useClass: RxSessionExpirationInterceptor,
                        multi: true
                    }
                ]
            };
        };
        return RxSessionExpirationModule;
    }());
    RxSessionExpirationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxSessionExpirationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationModule, declarations: [RxSessionExpirationComponent], imports: [i3.CommonModule, i2$1.TranslateModule, i4.AdaptButtonModule], exports: [RxSessionExpirationComponent] });
    RxSessionExpirationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationModule, imports: [[i3.CommonModule, i2$1.TranslateModule, i4.AdaptButtonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSessionExpirationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxSessionExpirationComponent],
                        entryComponents: [RxSessionExpirationComponent],
                        exports: [RxSessionExpirationComponent],
                        imports: [i3.CommonModule, i2$1.TranslateModule, i4.AdaptButtonModule]
                    }]
            }] });

    var RxServerActionService = /** @class */ (function () {
        function RxServerActionService(injector) {
            this.injector = injector;
            this.rxDesignerCacheService = this.injector.get(RxDesignerCacheService);
            this.rxStringService = this.injector.get(i2$2.RxStringService);
            this.translateService = this.injector.get(i2$1.TranslateService);
        }
        RxServerActionService.prototype.getActionTypeByName = function (actionTypeName) {
            return this.rxDesignerCacheService.getActionTypeByNameSync(actionTypeName);
        };
        // TODO-VS: update types
        RxServerActionService.prototype.getClassConfig = function (options) {
            var model = this.getModelFromDefinition({
                actionTypeName: options.actionTypeName
            });
            return {
                content: model.name,
                elementModel: model,
                icon: model.isDeprecated ? 'info' : null,
                position: options.position,
                type: model.type
            };
        };
        // TODO-VS: update availableCells type
        RxServerActionService.prototype.validateInputMap = function (model, availableCells) {
            return rxjs.of([]);
        };
        // TODO-VS: update availableCells type
        RxServerActionService.prototype.validateServerAction = function (model, availableCells) {
            var _this = this;
            return this.validateInputMap(model, availableCells).pipe(operators.map(function (inputMapValidationIssues) {
                var validationIssues = __spreadArray([], __read(inputMapValidationIssues));
                if (_this.rxStringService.isEmptySafe(model.name)) {
                    validationIssues.push({
                        type: i2.ValidationIssueType.Error,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                            propertyName: _this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                        }),
                        data: {
                            guid: model.guid,
                            inspectorTabIndex: 1
                        }
                    });
                }
                model.outputMap.forEach(function (output, index) {
                    if (_this.rxStringService.isEmptySafe(output.assignTarget)) {
                        validationIssues.push({
                            type: i2.ValidationIssueType.Error,
                            description: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.output-map.message', {
                                errorMessage: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                                    propertyName: _this.translateService.instant('com.bmc.arsys.rx.client.designer.assignment-expression.target.label')
                                })
                            }),
                            data: {
                                fieldName: 'assignTarget',
                                guid: model.guid,
                                index: index,
                                inspectorTabIndex: 1,
                                propertyName: 'outputMap'
                            }
                        });
                    }
                    if (_this.rxStringService.isEmptySafe(output.expression)) {
                        validationIssues.push({
                            type: i2.ValidationIssueType.Error,
                            description: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.output-map.message', {
                                errorMessage: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                                    propertyName: _this.translateService.instant('com.bmc.arsys.rx.client.designer.assignment-expression.source.label')
                                })
                            }),
                            data: {
                                fieldName: 'expression',
                                guid: model.guid,
                                index: index,
                                inspectorTabIndex: 1,
                                propertyName: 'outputMap'
                            }
                        });
                    }
                });
                return validationIssues;
            }));
        };
        return RxServerActionService;
    }());
    RxServerActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxServerActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    function RxServerActionMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxServerAction, _super);
            function RxServerAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // TODO-VS: add types after rappid update
            RxServerAction.prototype.initialize = function (config) {
                var _this = this;
                // @ts-ignore
                _super.prototype.initialize.call(this, config);
                this.setDataDictionaryBranch();
                // TODO-VS: add types after rappid update
                // @ts-ignore
                this.on('change:elementModel', function (element, elementModel, changedProperty) {
                    if (operators.startWith(changedProperty.propertyPath, 'elementModel/inputMap')) {
                        var inputMapPropertyPath = lodash.last(changedProperty.propertyPath.split('/'));
                        var inputMapPropertyValue = changedProperty.propertyValue;
                        var isCommandManagerOperation = lodash.has(changedProperty, 'commandManager');
                        if (isCommandManagerOperation) {
                            inputMapPropertyValue = elementModel.inputMap[inputMapPropertyPath];
                        }
                        _this.setDataDictionaryBranch();
                        _this.onInputMapChanged(element, elementModel.inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation);
                    }
                });
            };
            RxServerAction.prototype.clearOutputMap = function () {
                // @ts-ignore
                this.prop('elementModel/outputMap', [], {
                    rxSilent: true,
                    rewrite: true
                });
            };
            RxServerAction.prototype.getElementService = function (type) {
                return null;
            };
            RxServerAction.prototype.getInputMap = function () {
                // @ts-ignore
                return lodash.clone(this.prop('elementModel/inputMap')) || {};
            };
            // TODO-VS: add types after rappid update
            RxServerAction.prototype.onInputMapChanged = function (element, inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation) { };
            RxServerAction.prototype.setDataDictionaryBranch = function () {
                // @ts-ignore
                var elementService = this.getElementService(this.prop('type'));
                elementService.setCommonDataDictionaryBranch(
                // @ts-ignore
                this.prop('elementModel/guid'), 
                // @ts-ignore
                elementService.buildDataDictionaryBranch(this.prop('elementModel')));
            };
            RxServerAction.prototype.setInputMap = function (inputMap, options) {
                // use 'rewrite' option to prevent the default 'merge' behavior
                // @ts-ignore
                this.prop('elementModel/inputMap', inputMap, {
                    rxSilent: true,
                    rewrite: true,
                    silent: lodash.get(options, 'isSilent', false)
                });
            };
            return RxServerAction;
        }(Base));
    }

    function RxServerActionViewMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxServerActionView, _super);
            function RxServerActionView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RxServerActionView.prototype.className = function () {
                var originalClassName = joint.shapes.bpmn.ActivityView.prototype.className.apply(this, arguments);
                // append actionTypeName to element's class to help QA find elements in the DOM
                // @ts-ignore
                return originalClassName + " " + this.model.get('elementModel').actionTypeName;
            };
            return RxServerActionView;
        }(Base));
    }

    var RxServerActionExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxServerActionExpressionConfigurator, _super);
        function RxServerActionExpressionConfigurator(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.dataDictionaryService = _this.getDataDictionaryService();
            _this.commonDataDictionary$ = _this.dataDictionaryService.commonDataDictionary$;
            _this.configureForProperty({
                propertyPath: /inputMap\/.*/,
                dataDictionary$: _this.getInputMapDataDictionary(),
                validateExpression: function (propertyPath, expression) { return _this.validateInputMapExpression(propertyPath, expression); },
                operators: _this.getOperatorRowsByGroup(exports.ExpressionOperatorGroup.Math)
            });
            return _this;
        }
        RxServerActionExpressionConfigurator.prototype.getDefaultConfig = function () {
            return Object.assign(Object.assign({}, _super.prototype.getDefaultConfig.call(this)), { dataDictionary$: this.commonDataDictionary$, operators: ExpressionOperatorRowsByGroup.get(exports.ExpressionOperatorGroup.AllClient) });
        };
        RxServerActionExpressionConfigurator.prototype.getInputMapDataDictionary = function () {
            return this.commonDataDictionary$;
        };
        RxServerActionExpressionConfigurator.prototype.validateInputMapExpression = function (propertyPath, expression) {
            return rxjs.of(true);
        };
        return RxServerActionExpressionConfigurator;
    }(RxExpressionConfigurator));

    var RxSmartReportingService = /** @class */ (function () {
        function RxSmartReportingService(httpClient, rxJsonParserService, rxServerErrorHandlerService) {
            var _this = this;
            this.httpClient = httpClient;
            this.rxJsonParserService = rxJsonParserService;
            this.rxServerErrorHandlerService = rxServerErrorHandlerService;
            this.smartReportingUrl$ = this._getSmartReportingUrl().pipe(operators.catchError(function (error) {
                _this.rxServerErrorHandlerService.handle(error);
                return rxjs.of('');
            }), operators.shareReplay(1));
        }
        // We have to open a blank tab and then or change its url or close it.
        // Sadly there is no other way around it (even forcing a click on a button for example).
        // https://tech.europace.de/how-to-open-async-calls-in-a-new-tab-instead-of-new-window-within-an-angularjs-app/
        RxSmartReportingService.prototype.openSmartReporting = function (target, queryParams) {
            if (target === void 0) { target = '_blank'; }
            if (queryParams === void 0) { queryParams = {}; }
            var smartReportingPopup = window.open('', target);
            return this._getSmartReportingUrl(queryParams).pipe(operators.map(function (smartReportingUrl) {
                smartReportingPopup.location.href = smartReportingUrl;
                return true;
            }), operators.catchError(function (errorResponse) {
                smartReportingPopup.close();
                if (errorResponse.error === '[]') {
                    return rxjs.of(false);
                }
                throw errorResponse;
            }));
        };
        RxSmartReportingService.prototype.getSmartReportingUrl = function () {
            return this.smartReportingUrl$;
        };
        RxSmartReportingService.prototype._getSmartReportingUrl = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.httpClient
                .get('/api/rx/application/smartreporting/url', {
                responseType: 'text',
                params: queryParams
            })
                .pipe(operators.map(function (url) { return decodeURIComponent(url); }));
        };
        return RxSmartReportingService;
    }());
    RxSmartReportingService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSmartReportingService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace$2.RxJsonParserService }, { token: RxServerErrorHandlerService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSmartReportingService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSmartReportingService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSmartReportingService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i2__namespace$2.RxJsonParserService }, { type: RxServerErrorHandlerService }]; } });

    var TITLE_SEPARATOR = ' - ';
    var RxPageTitleService = /** @class */ (function () {
        function RxPageTitleService(title, rxBundleCacheService, rxGlobalCacheService, rxLogService) {
            this.title = title;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxLogService = rxLogService;
        }
        RxPageTitleService.prototype.set = function (title, bundleId) {
            var _this = this;
            var currentPageTitle = '';
            if (Array.isArray(title)) {
                currentPageTitle = title
                    .reduce(function (result, part) {
                    if (lodash.isString(part) && (part = part.trim())) {
                        result.push(part);
                    }
                    return result;
                }, [])
                    .join(TITLE_SEPARATOR);
            }
            else if (lodash.isString(title)) {
                currentPageTitle = title.trim();
            }
            else if (!lodash.isUndefined(title)) {
                this.rxLogService.warning('Invalid page title: ' + title);
            }
            var currentBundleId = bundleId || this.rxBundleCacheService.bundleId;
            if (bundleId !== '' && currentBundleId) {
                this.rxGlobalCacheService
                    .getBundleDisplayName(currentBundleId)
                    .pipe(operators.take(1))
                    .subscribe(function (bundleDisplayName) {
                    _this.title.setTitle([currentPageTitle, bundleDisplayName].filter(Boolean).join(TITLE_SEPARATOR));
                });
            }
            else {
                this.title.setTitle(currentPageTitle);
            }
        };
        return RxPageTitleService;
    }());
    RxPageTitleService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPageTitleService, deps: [{ token: i1__namespace$1.Title }, { token: RxBundleCacheService }, { token: RxGlobalCacheService }, { token: RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxPageTitleService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPageTitleService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPageTitleService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.Title }, { type: RxBundleCacheService }, { type: RxGlobalCacheService }, { type: RxLogService }]; } });

    var Tooltip = /** @class */ (function () {
        function Tooltip(tooltipText) {
            this.iconName = 'question_circle_o';
            this.placement = 'auto';
            this.popoverMode = true;
            // default taken from AdaptRxLabelTooltipComponent
            this.maxWidth = 250;
            this.content = tooltipText;
        }
        return Tooltip;
    }());

    var RX_USER_PREFERENCES = {
        componentName: 'UI Preferences',
        fieldPreferences: 'preferences'
    };

    var RxUserPreferencesService = /** @class */ (function () {
        function RxUserPreferencesService(httpClient, rxJsonParserService) {
            this.httpClient = httpClient;
            this.rxJsonParserService = rxJsonParserService;
            this.settingsByComponentId = new Map();
            this.apiUrl = '/api/rx/application/admin-settings/user-preference/UI Preferences';
        }
        RxUserPreferencesService.prototype.getUiComponentPreferences = function (guid) {
            var _this = this;
            return this.httpClient
                .get(this.apiUrl, {
                headers: new i1.HttpHeaders({
                    'default-bundle-scope': ''
                }),
                params: {
                    componentId: guid
                }
            })
                .pipe(operators.map(function (_a) {
                var values = _a.values;
                _this.settingsByComponentId.set(guid, values);
                var preferenceSetting = values.find(function (value) { return value.settingName === RX_USER_PREFERENCES.fieldPreferences; });
                var settingValue = preferenceSetting ? preferenceSetting.settingValue : null;
                return _this.rxJsonParserService.tryParseJson(settingValue);
            }));
        };
        RxUserPreferencesService.prototype.prepareUiPreferences = function (data, guid) {
            if (!lodash.isEmpty(this.settingsByComponentId.get(guid))) {
                return this.createUpdatedSettings(data, guid);
            }
            var newSettings = lodash.map(data, function (value, name) { return ({
                componentName: RX_USER_PREFERENCES.componentName,
                settingName: name,
                settingValue: value,
                assigneeGroupPermission: ''
            }); });
            return newSettings;
        };
        RxUserPreferencesService.prototype.setUiComponentPreferences = function (data, guid) {
            var _this = this;
            var settings = this.prepareUiPreferences(data, guid);
            var currentSettings = this.settingsByComponentId.get(guid);
            var id = lodash.get(currentSettings, '[0].ownerKeyValue1');
            var httpOptions = {
                headers: new i1.HttpHeaders({
                    'default-bundle-scope': ''
                })
            };
            return id
                ? this.httpClient.put(this.apiUrl + "/" + id, settings, httpOptions)
                : this.httpClient
                    .post(this.apiUrl, settings, httpOptions)
                    .pipe(operators.tap(function () { return _this.getUiComponentPreferences(data.componentId).subscribe(); }));
        };
        RxUserPreferencesService.prototype.createUpdatedSettings = function (data, guid) {
            var newSettings = this.settingsByComponentId.get(guid);
            var preferenceSetting = newSettings.find(function (element) { return element.settingName === RX_USER_PREFERENCES.fieldPreferences; });
            var index = newSettings.indexOf(preferenceSetting);
            preferenceSetting.settingValue = data.preferences;
            newSettings[index] = preferenceSetting;
            return newSettings;
        };
        return RxUserPreferencesService;
    }());
    RxUserPreferencesService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace$2.RxJsonParserService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUserPreferencesService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i2__namespace$2.RxJsonParserService }]; } });

    var RxWhatfixConfiguratorService = /** @class */ (function () {
        function RxWhatfixConfiguratorService(document, rendererFactory, httpClient, rxCurrentUserService, rxLogService, rxGlobalCacheService) {
            var _this = this;
            this.document = document;
            this.rendererFactory = rendererFactory;
            this.httpClient = httpClient;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxLogService = rxLogService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.isConfigured = false;
            this.renderer = this.rendererFactory.createRenderer(null, null);
            this.defaultConfig$ = rxjs.combineLatest([
                this.rxGlobalCacheService.getApplicationBundleDescriptor(),
                this.rxCurrentUserService.user$
            ]).pipe(operators.take(1), operators.map(function (_a) {
                var _b = __read(_a, 2), bundleDescriptor = _b[0], user = _b[1];
                var logCategories = _this.rxLogService.logCategories;
                return {
                    application: {
                        id: _this.rxGlobalCacheService.applicationId,
                        version: bundleDescriptor.version
                    },
                    environment: {
                        isDebug: lodash.includes(logCategories, exports.LogCategory.All) || lodash.includes(logCategories, exports.LogCategory.Cli)
                    },
                    user: {
                        id: user.userId,
                        isBusinessAnalyst: _this.rxCurrentUserService.isBusinessAnalyst(),
                        isAdministrator: _this.rxCurrentUserService.isAdministrator()
                    }
                };
            }), operators.shareReplay(1));
            this.isEnabled$ = this.httpClient.get(RX_ADMINISTRATION.systemConfigurationUrl + "/Whatfix-Disabled").pipe(operators.map(function (result) { return result.value === 0; }), operators.shareReplay(1));
        }
        RxWhatfixConfiguratorService.prototype.setConfig = function (accountId, config) {
            var _this = this;
            if (lodash.isEmpty(accountId)) {
                throw new Error('Invalid Whatfix account ID.');
            }
            this.isEnabled$
                .pipe(operators.filter(function (isEnabled) { return Boolean(isEnabled) && !_this.isConfigured; }), operators.tap(function (isEnabled) {
                _this.rxLogService.debug(isEnabled ? "Whatfix is enabled. Account ID: " + accountId + "." : 'Whatfix is disabled.');
            }), operators.switchMapTo(config ? rxjs.of(config) : this.defaultConfig$))
                .subscribe(function (whatfixConfig) {
                _this.isConfigured = true;
                lodash.defaults(window, { rx: {} });
                // this global variable will be used by whatfix integration script loaded below
                window['rx'].whatfixConfig = whatfixConfig;
                var url = "//cdn.whatfix.com/prod/" + accountId + "/embed/embed.nocache.js";
                _this.rxLogService.debug("Loading whatfix integration script from " + url + ".");
                _this.loadScript(url);
            });
        };
        RxWhatfixConfiguratorService.prototype.getDefaultConfig = function () {
            return this.isEnabled$.pipe(operators.filter(Boolean), operators.switchMapTo(this.defaultConfig$));
        };
        RxWhatfixConfiguratorService.prototype.loadScript = function (url) {
            var scriptElement = lodash.assign(this.renderer.createElement('script'), {
                type: 'text/javascript',
                async: true,
                src: url
            });
            this.renderer.appendChild(this.document.head, scriptElement);
        };
        return RxWhatfixConfiguratorService;
    }());
    RxWhatfixConfiguratorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWhatfixConfiguratorService, deps: [{ token: i3.DOCUMENT }, { token: i0__namespace.RendererFactory2 }, { token: i1__namespace.HttpClient }, { token: RxCurrentUserService }, { token: RxLogService }, { token: RxGlobalCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxWhatfixConfiguratorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWhatfixConfiguratorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWhatfixConfiguratorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: i0__namespace.RendererFactory2 }, { type: i1__namespace.HttpClient }, { type: RxCurrentUserService }, { type: RxLogService }, { type: RxGlobalCacheService }];
        } });

    var RxAdminComponentDataPageQuery = /** @class */ (function (_super) {
        __extends(RxAdminComponentDataPageQuery, _super);
        function RxAdminComponentDataPageQuery(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.admin.datapage.AdminComponentDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxAdminComponentDataPageQuery;
    }(DataPage));
    RxAdminComponentDataPageQuery.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminComponentDataPageQuery, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAdminComponentDataPageQuery.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminComponentDataPageQuery, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAdminComponentDataPageQuery, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DataPage = DataPage;
    exports.DynamicLocaleId = DynamicLocaleId;
    exports.ExpressionOperatorRowsByGroup = ExpressionOperatorRowsByGroup;
    exports.LocalizedStringsLoaderFactory = LocalizedStringsLoaderFactory;
    exports.RX_ADMINISTRATION = RX_ADMINISTRATION;
    exports.RX_APPLICATION = RX_APPLICATION;
    exports.RX_BUILD_ENVIRONMENT = RX_BUILD_ENVIRONMENT;
    exports.RX_BUNDLE = RX_BUNDLE;
    exports.RX_CHATBOT = RX_CHATBOT;
    exports.RX_DATA_PAGE = RX_DATA_PAGE;
    exports.RX_DEFAULT_NOTIFICATION_SETTINGS = RX_DEFAULT_NOTIFICATION_SETTINGS;
    exports.RX_DEFAULT_STRINGS = RX_DEFAULT_STRINGS;
    exports.RX_DEFINITION = RX_DEFINITION;
    exports.RX_DESIGNER = RX_DESIGNER;
    exports.RX_DESIGNER_ELEMENT_SHAPE = RX_DESIGNER_ELEMENT_SHAPE;
    exports.RX_ENVIRONMENT = RX_ENVIRONMENT;
    exports.RX_ERROR_HANDLING = RX_ERROR_HANDLING;
    exports.RX_LOG = RX_LOG;
    exports.RX_OVERLAY = RX_OVERLAY;
    exports.RX_PERMISSION = RX_PERMISSION;
    exports.RX_RESOURCE_URLS = RX_RESOURCE_URLS;
    exports.RX_THEMING = RX_THEMING;
    exports.RX_USER = RX_USER;
    exports.RX_USER_PREFERENCES = RX_USER_PREFERENCES;
    exports.RxActionTypeDataPageService = RxActionTypeDataPageService;
    exports.RxActionTypeUtilsService = RxActionTypeUtilsService;
    exports.RxAdminComponentDataPageQuery = RxAdminComponentDataPageQuery;
    exports.RxAdminComponentDataPageService = RxAdminComponentDataPageService;
    exports.RxAdminSettingsService = RxAdminSettingsService;
    exports.RxAngularApplicationService = RxAngularApplicationService;
    exports.RxApplicationConfiguratorService = RxApplicationConfiguratorService;
    exports.RxApplicationInitializer = RxApplicationInitializer;
    exports.RxApplicationLoaderResolver = RxApplicationLoaderResolver;
    exports.RxApplicationLoaderService = RxApplicationLoaderService;
    exports.RxApplicationRegistryService = RxApplicationRegistryService;
    exports.RxApplicationResolver = RxApplicationResolver;
    exports.RxAuthGuard = RxAuthGuard;
    exports.RxAuthInterceptor = RxAuthInterceptor;
    exports.RxAuthModule = RxAuthModule;
    exports.RxAuthService = RxAuthService;
    exports.RxBooleanPipe = RxBooleanPipe;
    exports.RxBundleCacheService = RxBundleCacheService;
    exports.RxBundleDataPageService = RxBundleDataPageService;
    exports.RxBundleService = RxBundleService;
    exports.RxCachingModule = RxCachingModule;
    exports.RxChatbotDefinitionDataPageService = RxChatbotDefinitionDataPageService;
    exports.RxCommandFactoryService = RxCommandFactoryService;
    exports.RxCommandManagerService = RxCommandManagerService;
    exports.RxComponentCanDeactivateGuard = RxComponentCanDeactivateGuard;
    exports.RxCurrentUserService = RxCurrentUserService;
    exports.RxCustomizationStatusPipe = RxCustomizationStatusPipe;
    exports.RxDataDictionaryUtils = RxDataDictionaryUtils;
    exports.RxDataPageFactoryService = RxDataPageFactoryService;
    exports.RxDefinitionAdapterRegistryService = RxDefinitionAdapterRegistryService;
    exports.RxDefinitionModule = RxDefinitionModule;
    exports.RxDefinitionNamePipe = RxDefinitionNamePipe;
    exports.RxDefinitionNameService = RxDefinitionNameService;
    exports.RxDefinitionScopePipe = RxDefinitionScopePipe;
    exports.RxDefinitionService = RxDefinitionService;
    exports.RxDefinitionUpdateService = RxDefinitionUpdateService;
    exports.RxDesignerCacheService = RxDesignerCacheService;
    exports.RxDesignerStencilBuilder = RxDesignerStencilBuilder;
    exports.RxErrorHandlerService = RxErrorHandlerService;
    exports.RxErrorHandlingModule = RxErrorHandlingModule;
    exports.RxExpressionConfigurator = RxExpressionConfigurator;
    exports.RxExpressionParserService = RxExpressionParserService;
    exports.RxFeatureGuard = RxFeatureGuard;
    exports.RxFeatureService = RxFeatureService;
    exports.RxFunctionDataPageService = RxFunctionDataPageService;
    exports.RxFunctionalRoleDataPageService = RxFunctionalRoleDataPageService;
    exports.RxGlobalCacheService = RxGlobalCacheService;
    exports.RxGlobalEventsService = RxGlobalEventsService;
    exports.RxGroupDataPageService = RxGroupDataPageService;
    exports.RxHttpLogInterceptor = RxHttpLogInterceptor;
    exports.RxHttpModule = RxHttpModule;
    exports.RxHttpResponseMessageInterceptor = RxHttpResponseMessageInterceptor;
    exports.RxKeepSessionAliveResolver = RxKeepSessionAliveResolver;
    exports.RxLicenseDataPageService = RxLicenseDataPageService;
    exports.RxLiveAgentSettingsService = RxLiveAgentSettingsService;
    exports.RxLocalizationModule = RxLocalizationModule;
    exports.RxLocalizationService = RxLocalizationService;
    exports.RxLocalizedStringsLoaderService = RxLocalizedStringsLoaderService;
    exports.RxLogService = RxLogService;
    exports.RxLoggingModule = RxLoggingModule;
    exports.RxLoginLocalizationResolver = RxLoginLocalizationResolver;
    exports.RxLoginPageGuard = RxLoginPageGuard;
    exports.RxMetadataService = RxMetadataService;
    exports.RxNotificationComponent = RxNotificationComponent;
    exports.RxNotificationModule = RxNotificationModule;
    exports.RxNotificationService = RxNotificationService;
    exports.RxOverlayModule = RxOverlayModule;
    exports.RxOverlayService = RxOverlayService;
    exports.RxPageTitleService = RxPageTitleService;
    exports.RxPipesModule = RxPipesModule;
    exports.RxPreviousStateService = RxPreviousStateService;
    exports.RxRequestInterceptor = RxRequestInterceptor;
    exports.RxRoleDataPageService = RxRoleDataPageService;
    exports.RxRootInjector = RxRootInjector;
    exports.RxRssoDebugService = RxRssoDebugService;
    exports.RxServerActionExpressionConfigurator = RxServerActionExpressionConfigurator;
    exports.RxServerActionMixin = RxServerActionMixin;
    exports.RxServerActionService = RxServerActionService;
    exports.RxServerActionViewMixin = RxServerActionViewMixin;
    exports.RxServerErrorHandlerService = RxServerErrorHandlerService;
    exports.RxSessionExpirationComponent = RxSessionExpirationComponent;
    exports.RxSessionExpirationInterceptor = RxSessionExpirationInterceptor;
    exports.RxSessionExpirationModule = RxSessionExpirationModule;
    exports.RxSessionExpirationService = RxSessionExpirationService;
    exports.RxSessionService = RxSessionService;
    exports.RxSmartReportingService = RxSmartReportingService;
    exports.RxSystemConfigurationService = RxSystemConfigurationService;
    exports.RxThemeResolver = RxThemeResolver;
    exports.RxThemingService = RxThemingService;
    exports.RxUpgradeTrackerService = RxUpgradeTrackerService;
    exports.RxUserPreferencesService = RxUserPreferencesService;
    exports.RxUserService = RxUserService;
    exports.RxValidApplicationGuard = RxValidApplicationGuard;
    exports.RxWhatfixConfiguratorService = RxWhatfixConfiguratorService;
    exports.ShellRouteReuseStrategy = ShellRouteReuseStrategy;
    exports.Tooltip = Tooltip;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-shared-api.umd.js.map
