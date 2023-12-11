(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('@helix/platform/process/api'), require('@helix/platform/process/elements'), require('@angular/common'), require('@ngx-translate/core'), require('@helix/platform/view/runtime'), require('@helix/platform/view/api')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/process/components', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'lodash', '@helix/platform/process/api', '@helix/platform/process/elements', '@angular/common', '@ngx-translate/core', '@helix/platform/view/runtime', '@helix/platform/view/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.process = global.helix.platform.process || {}, global.helix.platform.process.components = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.lodash, global.helix.platform.process.api, global.helix.platform.process.elements, global.ng.common, global.ngxTranslateCore, global.helix.platform.view.runtime, global.helix.platform.view.api));
})(this, (function (exports, i0, rxjs, operators, lodash, i1, i2, common, core, runtime, i1$1) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
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

    var RxProcessInstancePreviewComponent = /** @class */ (function () {
        function RxProcessInstancePreviewComponent(element, rxProcessDefinitionCacheService, rxProcessInstanceService, rxRappidPaperService) {
            this.element = element;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
            this.rxProcessInstanceService = rxProcessInstanceService;
            this.rxRappidPaperService = rxRappidPaperService;
            this.zoomToFit = false;
            this.processInstance = {};
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
        }
        RxProcessInstancePreviewComponent.prototype.ngOnInit = function () {
            var _this = this;
            var config$ = this.config.pipe(operators.distinctUntilChanged(lodash.isEqual), operators.filter(function (config) { return config.processDefinitionName && config.processInstanceId; }), operators.tap(function (config) {
                _this.onClick = config.onClick;
                _this.processDefinitionName = config.processDefinitionName;
                _this.processInstanceId = config.processInstanceId;
                _this.zoomToFit = config.zoomToFit;
            }), operators.switchMap(function (config) {
                return rxjs.forkJoin([
                    _this.rxProcessDefinitionCacheService.getProcessDefinition(config.processDefinitionName),
                    _this.rxProcessInstanceService.get(config.processDefinitionName, config.processInstanceId)
                ]).pipe(operators.map(function (_a) {
                    var _b = __read(_a, 2), processDefinition = _b[0], processInstance = _b[1];
                    _this.processDefinition = processDefinition;
                    _this.processInstance = processInstance;
                }));
            }), operators.shareReplay(1));
            config$
                .pipe(operators.tap(function () { return _this.initialize(); }), operators.takeUntil(this.destroyed$))
                .subscribe();
        };
        RxProcessInstancePreviewComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxProcessInstancePreviewComponent.prototype.initialize = function () {
            var _this = this;
            this.paperScroller = this.rxRappidPaperService.init(this.element.nativeElement);
            this.rxRappidPaperService.setGraph(this.paperScroller, this.processDefinition, this.processInstance, this.zoomToFit);
            if (this.onClick) {
                this.paperScroller.options.paper.on('blank:pointerdown', function () {
                    _this.onClick({
                        processDefinition: _this.processDefinition,
                        processInstance: _this.processInstance,
                        cellView: null
                    });
                });
                this.paperScroller.options.paper.on('cell:pointerup', function (cellView) {
                    _this.onClick({
                        processDefinition: _this.processDefinition,
                        processInstance: _this.processInstance,
                        cellView: cellView
                    });
                });
            }
        };
        RxProcessInstancePreviewComponent.prototype.zoomIn = function () {
            this.paperScroller.zoom(0.2, { max: 4 });
        };
        RxProcessInstancePreviewComponent.prototype.zoomOut = function () {
            this.paperScroller.zoom(-0.2, { min: 0.2 });
        };
        return RxProcessInstancePreviewComponent;
    }());
    RxProcessInstancePreviewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstancePreviewComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace.RxProcessDefinitionCacheService }, { token: i1__namespace.RxProcessInstanceService }, { token: i2__namespace.RxRappidPaperService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxProcessInstancePreviewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessInstancePreviewComponent, selector: "rx-process-instance-preview", inputs: { config: "config" }, ngImport: i0__namespace, template: '', isInline: true, styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:600px;width:100%}:host::ng-deep .joint-element{cursor:default}:host::ng-deep .joint-link{color:#f9f9fa}:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .tool-remove,:host::ng-deep .joint-link:hover .marker-vertices,:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .link-tools{opacity:0;cursor:default}:host::ng-deep .joint-link .connection-wrap:hover{opacity:0}:host::ng-deep .joint-link .connection-wrap{cursor:default}\n"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstancePreviewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-process-instance-preview',
                        template: '',
                        styleUrls: ['./process-instance-preview.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i1__namespace.RxProcessDefinitionCacheService }, { type: i1__namespace.RxProcessInstanceService }, { type: i2__namespace.RxRappidPaperService }]; }, propDecorators: { config: [{
                    type: i0.Input
                }] } });

    var RxProcessInstancePreviewModule = /** @class */ (function () {
        function RxProcessInstancePreviewModule(componentFactoryResolver, rxViewComponentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            rxViewComponentRegistryService.register({
                type: 'rx-process-instance-preview',
                componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxProcessInstancePreviewComponent)
            });
        }
        return RxProcessInstancePreviewModule;
    }());
    RxProcessInstancePreviewModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstancePreviewModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$1.RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxProcessInstancePreviewModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstancePreviewModule, declarations: [RxProcessInstancePreviewComponent], imports: [common.CommonModule, runtime.RuntimeViewModule, core.TranslateModule], exports: [RxProcessInstancePreviewComponent] });
    RxProcessInstancePreviewModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstancePreviewModule, imports: [[common.CommonModule, runtime.RuntimeViewModule, core.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstancePreviewModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, runtime.RuntimeViewModule, core.TranslateModule],
                        declarations: [RxProcessInstancePreviewComponent],
                        entryComponents: [RxProcessInstancePreviewComponent],
                        exports: [RxProcessInstancePreviewComponent]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$1.RxViewComponentRegistryService }]; } });

    var RxProcessPreviewComponent = /** @class */ (function () {
        function RxProcessPreviewComponent(element, rxProcessDefinitionCacheService, rxProcessElementService, rxProcessElementSearchService, rxRappidPaperService) {
            this.element = element;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
            this.rxProcessElementService = rxProcessElementService;
            this.rxProcessElementSearchService = rxProcessElementSearchService;
            this.rxRappidPaperService = rxRappidPaperService;
            this.zoomToFit = false;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
        }
        RxProcessPreviewComponent.prototype.ngOnInit = function () {
            var _this = this;
            var config$ = this.config.pipe(operators.distinctUntilChanged(lodash.isEqual), operators.filter(function (config) { return config.processDefinitionName; }), operators.tap(function (config) {
                _this.onClick = config.onClick;
                _this.processDefinitionName = config.processDefinitionName;
                _this.zoomToFit = config.zoomToFit;
            }), operators.switchMap(function (config) {
                return _this.rxProcessDefinitionCacheService.getProcessDefinition(config.processDefinitionName).pipe(operators.tap(function (processDefinition) {
                    _this.processDefinition = processDefinition;
                }));
            }), operators.shareReplay(1));
            config$
                .pipe(operators.tap(function () { return _this.initialize(); }), operators.takeUntil(this.destroyed$))
                .subscribe();
        };
        RxProcessPreviewComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxProcessPreviewComponent.prototype.initialize = function () {
            var _this = this;
            var graph;
            if (this.processDefinition.layout) {
                graph = this.rxProcessElementService.getGraph(this.processDefinition);
            }
            else {
                graph = this.getGraph(this.processDefinition);
            }
            this.paperScroller = this.rxRappidPaperService.init(this.element.nativeElement, graph, this.zoomToFit);
            if (this.onClick) {
                this.paperScroller.options.paper.on('blank:pointerdown', function () {
                    _this.onClick({
                        processDefinition: _this.processDefinition,
                        cellView: null
                    });
                });
                this.paperScroller.options.paper.on('cell:pointerup', function (cellView) {
                    _this.onClick({
                        processDefinition: _this.processDefinition,
                        cellView: cellView
                    });
                });
            }
        };
        RxProcessPreviewComponent.prototype.zoomIn = function () {
            this.paperScroller.zoom(0.2, { max: 4 });
        };
        RxProcessPreviewComponent.prototype.zoomOut = function () {
            this.paperScroller.zoom(-0.2, { min: 0.2 });
        };
        RxProcessPreviewComponent.prototype.getGraph = function (processDefinition) {
            var actionsLength = this.rxProcessElementSearchService.filter(processDefinition, function (element) {
                return (element.resourceType === i1.RX_PROCESS_DEFINITION.processElementResourceTypes.processAction ||
                    element.resourceType === i1.RX_PROCESS_DEFINITION.processElementResourceTypes.userTask ||
                    element.resourceType === i1.RX_PROCESS_DEFINITION.processElementResourceTypes.receiveTask ||
                    element.resourceType === i1.RX_PROCESS_DEFINITION.processElementResourceTypes.callActivity);
            }).length;
            var start = new joint.shapes.bpmn.Event({
                size: {
                    width: 50,
                    height: 50
                },
                attrs: {
                    '.label': {
                        fill: 'gray',
                        text: 'Start'
                    }
                },
                eventType: 'start',
                position: {
                    x: 50,
                    y: 50
                }
            });
            var startCount = new joint.shapes.basic.Rect({
                size: {
                    width: 30,
                    height: 30
                },
                attrs: {
                    text: {
                        text: processDefinition.inputParams.length || 0
                    },
                    g: {
                        'stroke-opacity': 0
                    }
                },
                position: {
                    x: 60,
                    y: 60
                }
            });
            var actionLabel = new joint.shapes.basic.Rect({
                size: {
                    width: 30,
                    height: 30
                },
                attrs: {
                    text: {
                        text: 'Actions',
                        fill: 'gray'
                    },
                    g: {
                        'stroke-opacity': 0
                    }
                },
                position: {
                    x: 235,
                    y: 110
                }
            });
            var endCount = new joint.shapes.basic.Rect({
                size: {
                    width: 30,
                    height: 30
                },
                attrs: {
                    text: {
                        text: '1'
                    },
                    g: {
                        'stroke-opacity': 0
                    }
                },
                position: {
                    x: 410,
                    y: 60
                }
            });
            var end = new joint.shapes.bpmn.Event({
                size: {
                    width: 50,
                    height: 50
                },
                attrs: {
                    '.label': {
                        fill: 'gray',
                        text: i1.RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent
                    }
                },
                eventType: 'end',
                position: {
                    x: 400,
                    y: 50
                }
            });
            var action = new joint.shapes.basic.Rect({
                size: {
                    width: 200,
                    height: 50
                },
                attrs: {
                    text: {
                        text: String(actionsLength)
                    }
                },
                position: {
                    x: 150,
                    y: 50
                },
                eventType: 'start'
            });
            var startActionLink = new joint.shapes.bpmn.Flow({
                source: {
                    x: 100,
                    y: 75
                },
                target: {
                    id: action.id
                }
            });
            var actionEndLink = new joint.shapes.bpmn.Flow({
                source: {
                    id: action.id
                },
                target: {
                    x: 400,
                    y: 75
                }
            });
            var graph = new joint.dia.Graph();
            graph.addCells([start, end, action, startActionLink, actionEndLink, startCount, endCount, actionLabel]);
            return graph.toJSON();
        };
        return RxProcessPreviewComponent;
    }());
    RxProcessPreviewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessPreviewComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace.RxProcessDefinitionCacheService }, { token: i2__namespace.RxProcessElementService }, { token: i1__namespace.RxProcessElementSearchService }, { token: i2__namespace.RxRappidPaperService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxProcessPreviewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessPreviewComponent, selector: "rx-process-preview", inputs: { config: "config" }, ngImport: i0__namespace, template: '', isInline: true, styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:600px;width:100%}:host::ng-deep .joint-element{cursor:default}:host::ng-deep .joint-link{color:#f9f9fa}:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .tool-remove,:host::ng-deep .joint-link:hover .marker-vertices,:host::ng-deep .joint-link:hover .marker-arrowheads,:host::ng-deep .joint-link:hover .link-tools{opacity:0;cursor:default}:host::ng-deep .joint-link .connection-wrap:hover{opacity:0}:host::ng-deep .joint-link .connection-wrap{cursor:default}\n"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessPreviewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-process-preview',
                        template: '',
                        styleUrls: ['./process-preview.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i1__namespace.RxProcessDefinitionCacheService }, { type: i2__namespace.RxProcessElementService }, { type: i1__namespace.RxProcessElementSearchService }, { type: i2__namespace.RxRappidPaperService }]; }, propDecorators: { config: [{
                    type: i0.Input
                }] } });

    var RxProcessPreviewModule = /** @class */ (function () {
        function RxProcessPreviewModule(componentFactoryResolver, rxViewComponentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            rxViewComponentRegistryService.register({
                type: 'rx-process-preview',
                componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxProcessPreviewComponent)
            });
        }
        return RxProcessPreviewModule;
    }());
    RxProcessPreviewModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessPreviewModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$1.RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxProcessPreviewModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessPreviewModule, declarations: [RxProcessPreviewComponent], imports: [common.CommonModule, runtime.RuntimeViewModule, core.TranslateModule], exports: [RxProcessPreviewComponent] });
    RxProcessPreviewModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessPreviewModule, imports: [[common.CommonModule, runtime.RuntimeViewModule, core.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessPreviewModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, runtime.RuntimeViewModule, core.TranslateModule],
                        declarations: [RxProcessPreviewComponent],
                        entryComponents: [RxProcessPreviewComponent],
                        exports: [RxProcessPreviewComponent]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$1.RxViewComponentRegistryService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxProcessInstancePreviewComponent = RxProcessInstancePreviewComponent;
    exports.RxProcessInstancePreviewModule = RxProcessInstancePreviewModule;
    exports.RxProcessPreviewComponent = RxProcessPreviewComponent;
    exports.RxProcessPreviewModule = RxProcessPreviewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-process-components.umd.js.map
