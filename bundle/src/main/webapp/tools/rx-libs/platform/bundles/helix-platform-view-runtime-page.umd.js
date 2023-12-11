(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@helix/platform/view/actions'), require('@helix/platform/view/components'), require('@helix/platform/view/runtime'), require('@ngx-translate/core'), require('@angular/router'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('@helix/platform/shared/api'), require('@helix/platform/ui-kit'), require('@helix/platform/utils'), require('@helix/platform/shared/components'), require('@helix/platform/approval/components'), require('@helix/platform/dataload/components')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/view/runtime-page', ['exports', '@angular/common', '@angular/core', '@helix/platform/view/actions', '@helix/platform/view/components', '@helix/platform/view/runtime', '@ngx-translate/core', '@angular/router', 'rxjs', 'rxjs/operators', 'lodash', '@helix/platform/shared/api', '@helix/platform/ui-kit', '@helix/platform/utils', '@helix/platform/shared/components', '@helix/platform/approval/components', '@helix/platform/dataload/components'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.view = global.helix.platform.view || {}, global.helix.platform.view["runtime-page"] = {}), global.ng.common, global.ng.core, global.helix.platform.view.actions, global.helix.platform.view.components, global.helix.platform.view.runtime, global.ngxTranslateCore, global.ng.router, global.rxjs, global.rxjs.operators, global.lodash, global.helix.platform.shared.api, global.helix.platform["ui-kit"], global.helix.platform.utils, global.helix.platform.shared.components, global.helix.platform.approval.components, global.helix.platform.dataload.components));
})(this, (function (exports, i7, i0, actions, components, i4, core, i1, rxjs, operators, lodash, i2, i3, i5, i6, components$1, components$2) { 'use strict';

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
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);

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

    var ViewRuntimePageComponent = /** @class */ (function () {
        function ViewRuntimePageComponent(route, rxDefinitionNameService, rxPageTitleService, rxPreviousStateService, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxRuntimeViewRegistryService, rxIframeUtilsService, rxGainsightConfiguratorService, rxFeatureService) {
            this.route = route;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxPreviousStateService = rxPreviousStateService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
            this.rxIframeUtilsService = rxIframeUtilsService;
            this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
            this.rxFeatureService = rxFeatureService;
            this.showRuntimeView = true;
            this.currentRoute = {
                bundleId: '',
                viewDefinitionName: '',
                inputParams: null
            };
        }
        ViewRuntimePageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            if (this.rxIframeUtilsService.isRunningInIframe() && this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                this.rxGainsightConfiguratorService.gainsightInitConfiguration$
                    .pipe(operators.take(1))
                    .subscribe();
            }
            this.subscription = rxjs.combineLatest([
                this.route.params.pipe(operators.pluck('bundleId')),
                this.route.params.pipe(operators.pluck('viewDefinitionName')),
                this.route.queryParams
            ])
                .pipe(operators.distinctUntilChanged(lodash.isEqual))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), bundleId = _b[0], viewDefinitionName = _b[1], inputParams = _b[2];
                // LMA:: Handling the case where we are on the same route but the input parameters are not the same.
                // In this case we have to force the view reload.
                // https://stackoverflow.com/questions/38971660/angular-2-reload-route-on-param-change
                if (_this.currentRoute.bundleId === bundleId &&
                    _this.currentRoute.viewDefinitionName === viewDefinitionName &&
                    !lodash.isEqual(_this.currentRoute.inputParams, inputParams)) {
                    _this.showRuntimeView = false;
                    setTimeout(function () { return (_this.showRuntimeView = true); });
                }
                _this.currentRoute.bundleId = bundleId;
                _this.currentRoute.viewDefinitionName = viewDefinitionName;
                _this.currentRoute.inputParams = inputParams;
                _this.updateConfig({ viewDefinitionName: viewDefinitionName, inputParams: inputParams });
                _this.rxPageTitleService.set(_this.rxDefinitionNameService.getDisplayName(viewDefinitionName));
                _this.rxGainsightConfiguratorService.updateGlobalContext(null, viewDefinitionName);
            });
        };
        ViewRuntimePageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        ViewRuntimePageComponent.prototype.canDeactivate = function () {
            return lodash.every(this.rxRuntimeViewRegistryService.getAll(), function (runtimeView) { return runtimeView.canClose(); });
        };
        ViewRuntimePageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        ViewRuntimePageComponent.prototype.onCancelView = function () {
            this.rxComponentCanDeactivateGuard.disable();
            this.onCloseOrCancel({ actionName: i4.RX_RUNTIME_VIEW.actions.cancel });
        };
        ViewRuntimePageComponent.prototype.onCloseView = function (outputParams) {
            this.onCloseOrCancel({ actionName: i4.RX_RUNTIME_VIEW.actions.close, outputParams: outputParams });
        };
        ViewRuntimePageComponent.prototype.onCloseOrCancel = function (payload) {
            if (this.rxIframeUtilsService.isRunningInIframe()) {
                this.rxIframeUtilsService.postMessageToHost(payload);
            }
            else {
                this.rxPreviousStateService.goToPrevState();
            }
        };
        ViewRuntimePageComponent.prototype.onRegisterApi = function (api) {
            this.runtimeViewApi = api;
        };
        ViewRuntimePageComponent.prototype.updateConfig = function (cfg) {
            this.configuration = Object.assign(Object.assign(Object.assign({}, this.configuration), cfg), { onRegisterApi: this.onRegisterApi.bind(this) });
        };
        return ViewRuntimePageComponent;
    }());
    ViewRuntimePageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageComponent, deps: [{ token: i1__namespace.ActivatedRoute }, { token: i2__namespace.RxDefinitionNameService }, { token: i2__namespace.RxPageTitleService }, { token: i2__namespace.RxPreviousStateService }, { token: i2__namespace.RxComponentCanDeactivateGuard }, { token: i3__namespace.RxUtilityModalsService }, { token: i4__namespace.RxRuntimeViewRegistryService }, { token: i5__namespace.RxIframeUtilsService }, { token: i6__namespace.RxGainsightConfiguratorService }, { token: i2__namespace.RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ViewRuntimePageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewRuntimePageComponent, selector: "rx-view-runtime-page", ngImport: i0__namespace, template: "<rx-runtime-view\n  [configuration]=\"configuration\"\n  (cancelView)=\"onCancelView()\"\n  (closeView)=\"onCloseView($event)\"\n  *ngIf=\"showRuntimeView\"\n></rx-runtime-view>\n", components: [{ type: i4__namespace.RuntimeViewComponent, selector: "rx-runtime-view", inputs: ["configuration"], outputs: ["save", "closeView", "cancelView", "beforeLoad", "afterLoad"] }], directives: [{ type: i7__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-view-runtime-page',
                        templateUrl: './view-runtime-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.ActivatedRoute }, { type: i2__namespace.RxDefinitionNameService }, { type: i2__namespace.RxPageTitleService }, { type: i2__namespace.RxPreviousStateService }, { type: i2__namespace.RxComponentCanDeactivateGuard }, { type: i3__namespace.RxUtilityModalsService }, { type: i4__namespace.RxRuntimeViewRegistryService }, { type: i5__namespace.RxIframeUtilsService }, { type: i6__namespace.RxGainsightConfiguratorService }, { type: i2__namespace.RxFeatureService }]; } });

    var routes = [
        {
            path: '',
            component: ViewRuntimePageComponent,
            pathMatch: 'full'
        }
    ];
    var ViewRuntimePageRoutingModule = /** @class */ (function () {
        function ViewRuntimePageRoutingModule() {
        }
        return ViewRuntimePageRoutingModule;
    }());
    ViewRuntimePageRoutingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageRoutingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewRuntimePageRoutingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageRoutingModule, imports: [i1__namespace.RouterModule], exports: [i1.RouterModule] });
    ViewRuntimePageRoutingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageRoutingModule, imports: [[i1.RouterModule.forChild(routes)], i1.RouterModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageRoutingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.RouterModule.forChild(routes)],
                        exports: [i1.RouterModule]
                    }]
            }] });

    var ViewRuntimePageModule = /** @class */ (function () {
        function ViewRuntimePageModule() {
        }
        return ViewRuntimePageModule;
    }());
    ViewRuntimePageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewRuntimePageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageModule, declarations: [ViewRuntimePageComponent], imports: [i7.CommonModule,
            core.TranslateModule,
            ViewRuntimePageRoutingModule,
            i4.RuntimeViewModule,
            components.ViewComponentsModule,
            actions.ViewActionsModule,
            components$1.ApprovalConsoleModule,
            components$2.DataloadModule] });
    ViewRuntimePageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageModule, imports: [[
                i7.CommonModule,
                core.TranslateModule,
                ViewRuntimePageRoutingModule,
                i4.RuntimeViewModule,
                components.ViewComponentsModule,
                actions.ViewActionsModule,
                components$1.ApprovalConsoleModule,
                components$2.DataloadModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewRuntimePageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ViewRuntimePageComponent],
                        imports: [
                            i7.CommonModule,
                            core.TranslateModule,
                            ViewRuntimePageRoutingModule,
                            i4.RuntimeViewModule,
                            components.ViewComponentsModule,
                            actions.ViewActionsModule,
                            components$1.ApprovalConsoleModule,
                            components$2.DataloadModule
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ViewRuntimePageComponent = ViewRuntimePageComponent;
    exports.ViewRuntimePageModule = ViewRuntimePageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-view-runtime-page.umd.js.map
