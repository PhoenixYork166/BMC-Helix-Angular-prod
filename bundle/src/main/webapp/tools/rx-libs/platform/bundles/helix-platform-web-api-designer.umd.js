(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('@ngx-translate/core'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('@helix/platform/shared/api'), require('@helix/platform/web-api/api'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/web-api/designer', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@bmc-ux/adapt-angular', '@helix/platform/shared/components', '@helix/platform/ui-kit', '@ngx-translate/core', 'rxjs', 'rxjs/operators', 'lodash', '@helix/platform/shared/api', '@helix/platform/web-api/api', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform["web-api"] = global.helix.platform["web-api"] || {}, global.helix.platform["web-api"].designer = {}), global.ng.common, global.ng.core, global.ng.forms, global.i5, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.ngxTranslateCore, global.rxjs, global.rxjs.operators, global.lodash, global.helix.platform.shared.api, global.helix.platform["web-api"].api, global.ng.router));
})(this, (function (exports, i7, i0, forms, i5, i4, i1, i3, rxjs, operators, lodash, i1$1, i2, i4$1) { 'use strict';

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

    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);

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

    var RxWebApiDesignerComponent = /** @class */ (function () {
        function RxWebApiDesignerComponent(rxGlobalCacheService, rxBundleCacheService, rxWebApiDefinitionService, rxDefinitionNameService, translateService, rxOverlayService) {
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxWebApiDefinitionService = rxWebApiDefinitionService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.translateService = translateService;
            this.rxOverlayService = rxOverlayService;
            this.webApiDefinitionSaved = new i0.EventEmitter();
            this.webApiDefinitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.isDesignMode = true;
            this.isExistingWebApi = false;
            this.isCustomizationEnabled = true;
            this.bundleFriendlyName$ = this.rxGlobalCacheService.getBundleFriendlyName(this.rxBundleCacheService.bundleId);
            this.validationIssues$ = new rxjs.BehaviorSubject([]);
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (validationIssues) { return Boolean(lodash.filter(validationIssues, {
                issues: [{ type: i1.ValidationIssueType.Error }]
            }).length); }), operators.distinctUntilChanged());
            this.webApiDefinition$ = new rxjs.BehaviorSubject(null);
            this.isSavingInProgress$ = new rxjs.BehaviorSubject(false);
            this.bundleId = this.rxBundleCacheService.bundleId;
            this.isBundleEditable = this.rxOverlayService.isBundleEditable(this.bundleId);
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        RxWebApiDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.webApiDefinitionName) {
            }
            else {
            }
            this.breadcrumbItems$ = this.webApiDefinition$.pipe(operators.map(function (webApiDefinition) {
                var definitionName = _this.rxDefinitionNameService.getDisplayName(webApiDefinition === null || webApiDefinition === void 0 ? void 0 : webApiDefinition.name);
                return [
                    {
                        label: definitionName || "<" + _this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label') + ">",
                        data: {}
                    }
                ];
            }));
            this.isSaveButtonDisabled$ = rxjs.combineLatest([
                this.validationIssues$,
                this.isSavingInProgress$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), _c = __read(_b[0], 1), validationIssueSection = _c[0], isSavingInProgress = _b[1];
                return Boolean(validationIssueSection === null || validationIssueSection === void 0 ? void 0 : validationIssueSection.issues) || !_this.isBundleEditable || isSavingInProgress;
            }));
        };
        RxWebApiDesignerComponent.prototype.canDeactivate = function () {
            return true;
        };
        RxWebApiDesignerComponent.prototype.toggleDesignMode = function () {
            this.isDesignMode = !this.isDesignMode;
        };
        RxWebApiDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
        };
        RxWebApiDesignerComponent.prototype.validate = function (value) {
            var validationIssues = [];
            return validationIssues.length ? [{
                    title: this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label'),
                    issues: validationIssues
                }] : [];
        };
        RxWebApiDesignerComponent.prototype.onRevertCustomization = function (event) {
        };
        RxWebApiDesignerComponent.prototype.saveDefinition = function () {
        };
        return RxWebApiDesignerComponent;
    }());
    RxWebApiDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerComponent, deps: [{ token: i1__namespace.RxGlobalCacheService }, { token: i1__namespace.RxBundleCacheService }, { token: i2__namespace.RxWebApiDefinitionService }, { token: i1__namespace.RxDefinitionNameService }, { token: i3__namespace.TranslateService }, { token: i1__namespace.RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxWebApiDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWebApiDesignerComponent, selector: "rx-web-api-designer", inputs: { webApiDefinitionName: "webApiDefinitionName" }, outputs: { webApiDefinitionSaved: "webApiDefinitionSaved", webApiDefinitionErrorLoading: "webApiDefinitionErrorLoading", closeDesigner: "closeDesigner" }, ngImport: i0__namespace, template: "<rx-designer-header\n  [bundleName]=\"bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (save)=\"saveDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n></rx-designer-header>\n\n<div class=\"rx-component-designer\" [hidden]=\"!isDesignMode\">\n  <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n    <adapt-sidebar-item\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      [iconClass]=\"\n        (hasValidationErrors$ | async) ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\n      \"\n    >\n      <rx-validation-issues\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.web-api-definition.label' | translate\"\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"validationIssues$ | async\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n  </adapt-sidebar>\n\n  <div class=\"main rx-designer-container h-100\">\n    <h3 class=\"mt-0\">\n      {{\n        isExistingWebApi\n          ? ('com.bmc.arsys.rx.client.web-api-designer.edit-web-api.title' | translate)\n          : ('com.bmc.arsys.rx.client.web-api-designer.new-web-api.label' | translate)\n      }}\n    </h3>\n\n    <h4 class=\"mt-0\">{{ 'com.bmc.arsys.rx.client.web-api-designer.collection-details.title' | translate }}</h4>\n  </div>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"webApiDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n></adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i4__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i5__namespace.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i5__namespace.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i1__namespace$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i5__namespace.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i7__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i7__namespace.AsyncPipe, "translate": i3__namespace.TranslatePipe, "json": i7__namespace.JsonPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-web-api-designer',
                        templateUrl: './web-api-designer.component.html',
                        styleUrls: ['./web-api-designer.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxGlobalCacheService }, { type: i1__namespace.RxBundleCacheService }, { type: i2__namespace.RxWebApiDefinitionService }, { type: i1__namespace.RxDefinitionNameService }, { type: i3__namespace.TranslateService }, { type: i1__namespace.RxOverlayService }]; }, propDecorators: { webApiDefinitionName: [{
                    type: i0.Input
                }], webApiDefinitionSaved: [{
                    type: i0.Output
                }], webApiDefinitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }] } });

    var RxWebApiDesignerModule = /** @class */ (function () {
        function RxWebApiDesignerModule() {
        }
        return RxWebApiDesignerModule;
    }());
    RxWebApiDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxWebApiDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerModule, declarations: [RxWebApiDesignerComponent], imports: [i5.AdaptCodeViewerModule,
            i5.AdaptRxFormsModule,
            i5.AdaptSidebarModule,
            i5.AdaptTabsModule,
            i7.CommonModule,
            i4.CustomizationOptionsModule,
            forms.FormsModule,
            forms.ReactiveFormsModule,
            i4.RxDefinitionPickerModule,
            i4.RxDesignerHeaderModule,
            i4.RxRevertCustomizationModule,
            i1.RxValidationIssuesModule,
            i3.TranslateModule], exports: [RxWebApiDesignerComponent] });
    RxWebApiDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerModule, imports: [[
                i5.AdaptCodeViewerModule,
                i5.AdaptRxFormsModule,
                i5.AdaptSidebarModule,
                i5.AdaptTabsModule,
                i7.CommonModule,
                i4.CustomizationOptionsModule,
                forms.FormsModule,
                forms.ReactiveFormsModule,
                i4.RxDefinitionPickerModule,
                i4.RxDesignerHeaderModule,
                i4.RxRevertCustomizationModule,
                i1.RxValidationIssuesModule,
                i3.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxWebApiDesignerComponent],
                        imports: [
                            i5.AdaptCodeViewerModule,
                            i5.AdaptRxFormsModule,
                            i5.AdaptSidebarModule,
                            i5.AdaptTabsModule,
                            i7.CommonModule,
                            i4.CustomizationOptionsModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            i4.RxDefinitionPickerModule,
                            i4.RxDesignerHeaderModule,
                            i4.RxRevertCustomizationModule,
                            i1.RxValidationIssuesModule,
                            i3.TranslateModule
                        ],
                        exports: [RxWebApiDesignerComponent]
                    }]
            }] });

    var RxWebApiDesignerPageComponent = /** @class */ (function () {
        function RxWebApiDesignerPageComponent(rxUtilityModalService, rxBundleCacheService, rxDefinitionNameService, rxPageTitleService, rxComponentCanDeactivateGuard, translateService, activatedRoute, router) {
            this.rxUtilityModalService = rxUtilityModalService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.translateService = translateService;
            this.activatedRoute = activatedRoute;
            this.router = router;
            this.isInitialized = false;
        }
        RxWebApiDesignerPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            this.subscription = this.activatedRoute.params.subscribe(function (_c) {
                var definitionName = _c.definitionName, bundleId = _c.bundleId;
                _this.rxBundleCacheService.bundleId = bundleId || _this.rxDefinitionNameService.getBundleId(definitionName);
                _this.isInitialized = true;
                _this.isNewWepApi = !definitionName;
                _this.webApiDefinitionName = definitionName;
                _this.rxPageTitleService.set([
                    _this.rxDefinitionNameService.getDisplayName(definitionName),
                    _this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.title')
                ]);
            });
        };
        RxWebApiDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        RxWebApiDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i1$1.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                'web-api-definitions'
            ]);
        };
        RxWebApiDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalService.confirmUnsavedChanges();
        };
        RxWebApiDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.webApiDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        RxWebApiDesignerPageComponent.prototype.onWebApiDefinitionSaved = function (webApiDefinitionName) {
            if (this.isNewWepApi) {
                this.router.navigate(['edit2', webApiDefinitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        RxWebApiDesignerPageComponent.prototype.onWebApiDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        return RxWebApiDesignerPageComponent;
    }());
    RxWebApiDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerPageComponent, deps: [{ token: i1__namespace$1.RxUtilityModalsService }, { token: i1__namespace.RxBundleCacheService }, { token: i1__namespace.RxDefinitionNameService }, { token: i1__namespace.RxPageTitleService }, { token: i1__namespace.RxComponentCanDeactivateGuard }, { token: i3__namespace.TranslateService }, { token: i4__namespace$1.ActivatedRoute }, { token: i4__namespace$1.Router }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxWebApiDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWebApiDesignerPageComponent, selector: "rx-web-api-designer-page", viewQueries: [{ propertyName: "webApiDesignerComponent", first: true, predicate: RxWebApiDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-web-api-designer\n  *ngIf=\"isInitialized\"\n  [webApiDefinitionName]=\"webApiDefinitionName\"\n  (webApiDefinitionSaved)=\"onWebApiDefinitionSaved($event)\"\n  (webApiDefinitionErrorLoading)=\"onWebApiDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-web-api-designer>\n", components: [{ type: RxWebApiDesignerComponent, selector: "rx-web-api-designer", inputs: ["webApiDefinitionName"], outputs: ["webApiDefinitionSaved", "webApiDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i7__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-web-api-designer-page',
                        templateUrl: './web-api-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxUtilityModalsService }, { type: i1__namespace.RxBundleCacheService }, { type: i1__namespace.RxDefinitionNameService }, { type: i1__namespace.RxPageTitleService }, { type: i1__namespace.RxComponentCanDeactivateGuard }, { type: i3__namespace.TranslateService }, { type: i4__namespace$1.ActivatedRoute }, { type: i4__namespace$1.Router }]; }, propDecorators: { webApiDesignerComponent: [{
                    type: i0.ViewChild,
                    args: [RxWebApiDesignerComponent]
                }] } });

    var RxWebApiDesignerPageModule = /** @class */ (function () {
        function RxWebApiDesignerPageModule() {
        }
        return RxWebApiDesignerPageModule;
    }());
    RxWebApiDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxWebApiDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerPageModule, declarations: [RxWebApiDesignerPageComponent], imports: [i7.CommonModule, RxWebApiDesignerModule], exports: [RxWebApiDesignerPageComponent] });
    RxWebApiDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerPageModule, imports: [[i7.CommonModule, RxWebApiDesignerModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWebApiDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxWebApiDesignerPageComponent],
                        imports: [i7.CommonModule, RxWebApiDesignerModule],
                        exports: [RxWebApiDesignerPageComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxWebApiDesignerComponent = RxWebApiDesignerComponent;
    exports.RxWebApiDesignerModule = RxWebApiDesignerModule;
    exports.RxWebApiDesignerPageComponent = RxWebApiDesignerPageComponent;
    exports.RxWebApiDesignerPageModule = RxWebApiDesignerPageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-web-api-designer.umd.js.map