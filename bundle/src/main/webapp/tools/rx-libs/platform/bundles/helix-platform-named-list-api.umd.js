(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/shared/api'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http'), require('lodash'), require('@helix/platform/view/api'), require('@helix/platform/record/api')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/named-list/api', ['exports', '@angular/core', '@helix/platform/shared/api', 'rxjs', 'rxjs/operators', '@angular/common/http', 'lodash', '@helix/platform/view/api', '@helix/platform/record/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform["named-list"] = global.helix.platform["named-list"] || {}, global.helix.platform["named-list"].api = {}), global.ng.core, global.helix.platform.shared.api, global.rxjs, global.rxjs.operators, global.ng.common.http, global.lodash, global.helix.platform.view.api, global.helix.platform.record.api));
})(this, (function (exports, i0, i2, rxjs, operators, i1, lodash, api, i2$1) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);

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

    var namedListDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDefinitionDataPageQuery';
    var RxNamedListDefinitionDataPageService = /** @class */ (function (_super) {
        __extends(RxNamedListDefinitionDataPageService, _super);
        function RxNamedListDefinitionDataPageService(injector) {
            var _this = _super.call(this, injector, namedListDefinitionDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        return RxNamedListDefinitionDataPageService;
    }(i2.DataPage));
    RxNamedListDefinitionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNamedListDefinitionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RX_NAMED_LIST_DEFINITION = {
        searchBehaviorTypes: {
            contains: 'CONTAINS',
            exactMatch: 'EXACT_MATCH',
            startsWith: 'STARTS_WITH'
        },
        maxNumberOfContextualLabelFields: 4
    };

    var RxNamedListDefinitionService = /** @class */ (function () {
        function RxNamedListDefinitionService(httpClient, rxCommandFactoryService, rxFeatureService) {
            this.httpClient = httpClient;
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.rxFeatureService = rxFeatureService;
        }
        RxNamedListDefinitionService.prototype.get = function (namedListDefinitionName, options) {
            var _this = this;
            return this.httpClient.get(this.getUrl(namedListDefinitionName), options).pipe(operators.tap(function (definition) {
                var _a;
                if (_this.rxFeatureService.isFeatureEnabled('DRD21-43015')) {
                    (_a = definition.searchBehavior) !== null && _a !== void 0 ? _a : (definition.searchBehavior = RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains);
                }
            }));
        };
        RxNamedListDefinitionService.prototype.getNew = function () {
            var definition = {
                name: '',
                allowOverlay: false,
                scope: i2.RX_BUNDLE.definitionScopeTypes.bundle,
                recordDefinitionName: null,
                labelFieldId: null,
                valueFieldId: null
            };
            if (this.rxFeatureService.isFeatureEnabled('DRD21-43015')) {
                definition.searchBehavior = RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains;
            }
            return rxjs.of(definition);
        };
        RxNamedListDefinitionService.prototype.create = function (namedListDefinition) {
            return this.httpClient.post(this.getUrl(), namedListDefinition, { observe: 'response' });
        };
        RxNamedListDefinitionService.prototype.update = function (namedListDefinition, options) {
            return this.httpClient.put(this.getUrl(namedListDefinition.name), namedListDefinition, options);
        };
        RxNamedListDefinitionService.prototype.getUrl = function (namedListDefinitionName) {
            return namedListDefinitionName
                ? "/api/rx/application/namedlist/namedlistdefinition/" + encodeURIComponent(namedListDefinitionName)
                : '/api/rx/application/namedlist/namedlistdefinition';
        };
        RxNamedListDefinitionService.prototype.rename = function (oldNamedListDefinitionName, newNamedListDefinitionName) {
            return this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.namedlist.command.RenameNamedListDefinitionCommand')
                .execute({
                name: oldNamedListDefinitionName,
                newName: newNamedListDefinitionName
            });
        };
        RxNamedListDefinitionService.prototype.revertCustomization = function (namedListDefinitionName) {
            return this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.namedlist.command.RevertNamedListDefinitionCommand')
                .execute({ namedListDefinitionName: namedListDefinitionName });
        };
        RxNamedListDefinitionService.prototype.delete = function (definitionNames) {
            return this.rxCommandFactoryService
                .forResourceType('com.bmc.arsys.rx.application.namedlist.command.DeleteNamedListDefinitionsCommand')
                .execute({ definitionNames: definitionNames });
        };
        return RxNamedListDefinitionService;
    }());
    RxNamedListDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace.RxCommandFactoryService }, { token: i2__namespace.RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNamedListDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i2__namespace.RxCommandFactoryService }, { type: i2__namespace.RxFeatureService }]; } });

    var RxNamedListDataPageService = /** @class */ (function (_super) {
        __extends(RxNamedListDataPageService, _super);
        function RxNamedListDataPageService(injector, rxLogService) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDataPageQuery') || this;
            _this.rxLogService = rxLogService;
            return _this;
        }
        RxNamedListDataPageService.prototype.get = function (dataPageRequestConfiguration) {
            if (dataPageRequestConfiguration === void 0) { dataPageRequestConfiguration = {}; }
            this.rxLogService.warning('RxNamedListDataPageService: The get() method is deprecated. Use post() instead.');
            return _super.prototype.get.call(this, dataPageRequestConfiguration);
        };
        return RxNamedListDataPageService;
    }(i2.DataPage));
    RxNamedListDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDataPageService, deps: [{ token: i0__namespace.Injector }, { token: i2__namespace.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNamedListDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i2__namespace.RxLogService }]; } });

    var RxNamedListDefinitionCacheService = /** @class */ (function () {
        function RxNamedListDefinitionCacheService(rxNamedListDefinitionService) {
            this.rxNamedListDefinitionService = rxNamedListDefinitionService;
            this.consumers = new Set();
            this.namedListDefinitions = new Map();
        }
        RxNamedListDefinitionCacheService.prototype.getNamedListDefinition = function (namedListDefinitionName) {
            if (!this.namedListDefinitions.has(namedListDefinitionName)) {
                var namedListDefinition = this.rxNamedListDefinitionService.get(namedListDefinitionName).pipe(operators.shareReplay(1));
                this.namedListDefinitions.set(namedListDefinitionName, namedListDefinition);
            }
            return this.namedListDefinitions.get(namedListDefinitionName);
        };
        RxNamedListDefinitionCacheService.prototype.registerConsumer = function (consumerDestroy$) {
            var _this = this;
            this.consumers.add(consumerDestroy$);
            consumerDestroy$.subscribe(function () {
                _this.consumers.delete(consumerDestroy$);
                if (lodash.isEmpty(_this.consumers)) {
                    _this.clearCache();
                }
            });
        };
        RxNamedListDefinitionCacheService.prototype.clearCache = function () {
            this.namedListDefinitions.clear();
        };
        return RxNamedListDefinitionCacheService;
    }());
    RxNamedListDefinitionCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionCacheService, deps: [{ token: RxNamedListDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNamedListDefinitionCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDefinitionCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxNamedListDefinitionService }]; } });

    var RxNamedListService = /** @class */ (function () {
        function RxNamedListService(rxNamedListDataPageService, rxRecordInstanceUtilsService, rxLogService) {
            this.rxNamedListDataPageService = rxNamedListDataPageService;
            this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
            this.rxLogService = rxLogService;
        }
        RxNamedListService.prototype.getOptionPage = function (namedListDefinition, searchQuery, queryCriteria, startIndex, pageSize) {
            if (queryCriteria === void 0) { queryCriteria = null; }
            if (startIndex === void 0) { startIndex = 0; }
            if (pageSize === void 0) { pageSize = i2.RX_DATA_PAGE.defaultPageSize; }
            return this.getOptionPageByFieldIds(namedListDefinition, searchQuery, [namedListDefinition.labelFieldId], queryCriteria, startIndex, pageSize);
        };
        RxNamedListService.prototype.getOptionPageByLabelOrValue = function (namedListDefinition, searchQuery, queryCriteria, startIndex, pageSize) {
            if (queryCriteria === void 0) { queryCriteria = null; }
            if (startIndex === void 0) { startIndex = 0; }
            if (pageSize === void 0) { pageSize = i2.RX_DATA_PAGE.defaultPageSize; }
            return this.getOptionPageByFieldIds(namedListDefinition, searchQuery, [namedListDefinition.labelFieldId, namedListDefinition.valueFieldId], queryCriteria, startIndex, pageSize);
        };
        RxNamedListService.prototype.getOptionPageByFieldIds = function (namedListDefinition, searchQuery, fieldIds, queryCriteria, startIndex, pageSize) {
            var _this = this;
            if (queryCriteria === null || queryCriteria === void 0 ? void 0 : queryCriteria.includes(api.RX_EXPRESSION_EVALUATOR.operands.undefined)) {
                this.rxLogService.debug("Query criteria expression contains undefined operands: " + queryCriteria);
                return rxjs.of({ options: [], totalSize: 0 });
            }
            var params = {
                namedlistdefinition: namedListDefinition.name,
                pageSize: pageSize,
                startIndex: startIndex
            };
            var startingWildcard = [
                RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.startsWith,
                RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch
            ].includes(namedListDefinition.searchBehavior)
                ? ''
                : '%';
            var endingWildcard = namedListDefinition.searchBehavior === RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch ? '' : '%';
            var matchingOperator = namedListDefinition.searchBehavior === RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch ? '=' : 'LIKE';
            var searchableFieldIds = lodash.chain(namedListDefinition.fields)
                .filter(function (field) { return field.searchable; })
                .map(function (field) { return Number(field.id); })
                .concat(fieldIds)
                .uniq()
                .value();
            var searchQueryCriteria = searchQuery
                ? searchableFieldIds
                    .map(function (fieldId) {
                    var escapedSearchQuery = _this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery);
                    return "('" + fieldId + "' " + matchingOperator + " \"" + startingWildcard + escapedSearchQuery + endingWildcard + "\")";
                })
                    .join(' OR ')
                : null;
            var additionalQueryCriteria = searchQueryCriteria && queryCriteria
                ? "(" + searchQueryCriteria + ") AND (" + queryCriteria + ")"
                : searchQueryCriteria || queryCriteria;
            if (additionalQueryCriteria) {
                params.additionalQueryCriteria = "(" + additionalQueryCriteria + ")";
            }
            return this.rxNamedListDataPageService
                .post({
                params: params
            })
                .pipe(operators.map(function (result) { return ({
                options: result.data.map(function (item) {
                    // We are still getting all the keys in the response despite disabling the feature flag 'DRD21-43103'.
                    if (Object.keys(item).length === 1) {
                        var displayValue = Object.keys(item)[0];
                        return {
                            displayValue: displayValue,
                            value: item[displayValue],
                            title: '',
                            contextualFields: []
                        };
                    }
                    else {
                        var contextualFields = namedListDefinition.fields
                            .filter(function (field) { return field.visible; })
                            .map(function (field) { return item[field.id]; });
                        return {
                            displayValue: item[namedListDefinition.labelFieldId],
                            value: item[namedListDefinition.valueFieldId],
                            title: contextualFields.join(' / '),
                            contextualFields: contextualFields
                        };
                    }
                }),
                totalSize: result.totalSize
            }); }));
        };
        RxNamedListService.prototype.getOptionsForValues = function (namedListDefinition, optionValues) {
            if (optionValues.length) {
                var params = {
                    namedlistdefinition: namedListDefinition.name,
                    pageSize: -1,
                    startIndex: 0
                };
                params.additionalQueryCriteria = optionValues
                    .map(function (value) { return "'" + namedListDefinition.valueFieldId + "'=\"" + value.replace(/"/g, '""') + "\""; })
                    .join(' OR ');
                return this.rxNamedListDataPageService
                    .post({
                    params: params
                })
                    .pipe(operators.map(function (result) { return result.data.map(function (item) {
                    var displayValue = Object.keys(item)[0];
                    return {
                        displayValue: displayValue,
                        value: item[displayValue],
                        title: '',
                        contextualFields: []
                    };
                }); }));
            }
            else {
                return rxjs.of([]);
            }
        };
        RxNamedListService.prototype.isNamedListOption = function (namedListTypeAheadOption) {
            return lodash.has(namedListTypeAheadOption, 'value');
        };
        RxNamedListService.prototype.getNamesFromTypeAheadOptions = function (namedListTypeAheadOptions) {
            if (!lodash.isEmpty(namedListTypeAheadOptions)) {
                return lodash.isString(namedListTypeAheadOptions[0])
                    ? namedListTypeAheadOptions
                    : namedListTypeAheadOptions.map(function (filterValue) { return filterValue.value; });
            }
            return [];
        };
        return RxNamedListService;
    }());
    RxNamedListService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListService, deps: [{ token: RxNamedListDataPageService }, { token: i2__namespace$1.RxRecordInstanceUtilsService }, { token: i2__namespace.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNamedListService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxNamedListDataPageService }, { type: i2__namespace$1.RxRecordInstanceUtilsService }, { type: i2__namespace.RxLogService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_NAMED_LIST_DEFINITION = RX_NAMED_LIST_DEFINITION;
    exports.RxNamedListDataPageService = RxNamedListDataPageService;
    exports.RxNamedListDefinitionCacheService = RxNamedListDefinitionCacheService;
    exports.RxNamedListDefinitionDataPageService = RxNamedListDefinitionDataPageService;
    exports.RxNamedListDefinitionService = RxNamedListDefinitionService;
    exports.RxNamedListService = RxNamedListService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-named-list-api.umd.js.map
