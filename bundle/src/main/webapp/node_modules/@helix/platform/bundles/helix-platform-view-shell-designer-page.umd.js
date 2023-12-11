(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@helix/platform/view/designer'), require('rxjs/operators'), require('@helix/platform/shared/api'), require('@helix/platform/view/api'), require('lodash'), require('@angular/router'), require('@helix/platform/ui-kit'), require('rxjs'), require('@helix/platform/shared/components'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@helix/platform/record/api'), require('@angular/cdk/drag-drop'), require('@ngx-translate/core'), require('@helix/platform/utils'), require('@helix/platform/view/actions')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/view/shell-designer-page', ['exports', '@angular/core', '@angular/common', '@helix/platform/view/designer', 'rxjs/operators', '@helix/platform/shared/api', '@helix/platform/view/api', 'lodash', '@angular/router', '@helix/platform/ui-kit', 'rxjs', '@helix/platform/shared/components', '@angular/forms', '@bmc-ux/adapt-angular', '@helix/platform/record/api', '@angular/cdk/drag-drop', '@ngx-translate/core', '@helix/platform/utils', '@helix/platform/view/actions'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.view = global.helix.platform.view || {}, global.helix.platform.view["shell-designer-page"] = {}), global.ng.core, global.ng.common, global.helix.platform.view.designer, global.rxjs.operators, global.helix.platform.shared.api, global.helix.platform.view.api, global.lodash, global.ng.router, global.helix.platform["ui-kit"], global.rxjs, global.helix.platform.shared.components, global.ng.forms, global.adaptAngular, global.helix.platform.record.api, global.ng.cdk.dragDrop, global.ngxTranslateCore, global.helix.platform.utils, global.helix.platform.view.actions));
})(this, (function (exports, i0, i3, i1, operators, i2, i1$1, lodash, i1$2, i1$3, rxjs, i4, i7, i1$4, i2$1, i6, i8, i1$5, actions) { 'use strict';

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
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace$5 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$2);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$4);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i1__namespace$4 = /*#__PURE__*/_interopNamespace(i1$5);

    var RxShellModel = /** @class */ (function () {
        function RxShellModel(viewDesignerFacade) {
            this.viewDesignerFacade = viewDesignerFacade;
            this.viewDesignerFacade.setViewInspectorConfig(this.getInspector());
        }
        RxShellModel.prototype.getInspector = function () {
            var layout = [
                {
                    label: 'General',
                    controls: [
                        {
                            component: i1.RxViewRevertCustomizationComponent
                        },
                        {
                            component: i1.RxViewCustomizationOptionsComponent
                        }
                    ]
                }
            ];
            return {
                inspectorSectionConfigs: layout
            };
        };
        return RxShellModel;
    }());
    RxShellModel.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModel, deps: [{ token: i1__namespace.ViewDesignerFacade }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxShellModel.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModel });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModel, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.ViewDesignerFacade }]; } });

    var RxShellDesignerPageComponent = /** @class */ (function () {
        function RxShellDesignerPageComponent(activatedRoute, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxDefinitionNameService, rxPageTitleService, rxBundleCacheService, rxGlobalCacheService, rxPreviousStateService) {
            var _this = this;
            this.activatedRoute = activatedRoute;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxPreviousStateService = rxPreviousStateService;
            this.configuration$ = this.activatedRoute.params.pipe(operators.pluck('bundleId'), operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleDescriptor(bundleId); }), operators.tap(function (bundleDescriptor) {
                _this.rxBundleCacheService.bundleId = bundleDescriptor.id;
                _this.rxPageTitleService.set(['Application shell', bundleDescriptor.friendlyName], i2.RX_APPLICATION.innovationStudioBundleId);
            }), operators.map(function (bundleDescriptor) { return ({
                bundleId: bundleDescriptor.id,
                viewDefinitionName: _this.rxDefinitionNameService.getDefinitionName(bundleDescriptor.id, i2.RX_APPLICATION.shellDefinitionName),
                disablePreview: true,
                paletteComponentsPredicate: function (descriptor) { return lodash.values(i1$1.RX_SHELL.navBar).includes(descriptor.type); }
            }); }));
        }
        RxShellDesignerPageComponent.prototype.ngOnInit = function () {
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
        };
        RxShellDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        RxShellDesignerPageComponent.prototype.canDeactivate = function () {
            if (this.viewDesignerComponent) {
                return this.viewDesignerComponent.canDeactivate();
            }
            return true;
        };
        RxShellDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.rxPreviousStateService.goToPrevState();
        };
        RxShellDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        return RxShellDesignerPageComponent;
    }());
    RxShellDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignerPageComponent, deps: [{ token: i1__namespace$1.ActivatedRoute }, { token: i2__namespace.RxComponentCanDeactivateGuard }, { token: i1__namespace$2.RxUtilityModalsService }, { token: i2__namespace.RxDefinitionNameService }, { token: i2__namespace.RxPageTitleService }, { token: i2__namespace.RxBundleCacheService }, { token: i2__namespace.RxGlobalCacheService }, { token: i2__namespace.RxPreviousStateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellDesignerPageComponent, selector: "rx-shell-designer-page", providers: [
            RxShellModel,
            {
                provide: i1.RX_VIEW_MODEL,
                useExisting: RxShellModel
            }
        ], viewQueries: [{ propertyName: "viewDesignerComponent", first: true, predicate: i1.RxViewDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-view-designer\n  *ngIf=\"configuration$ | async as config\"\n  [configuration]=\"config\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-view-designer>\n", styles: [""], components: [{ type: i1__namespace.RxViewDesignerComponent, selector: "rx-view-designer", inputs: ["configuration"], outputs: ["viewDefinitionSaved", "viewDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-designer-page',
                        templateUrl: './shell-designer-page.component.html',
                        styleUrls: ['./shell-designer-page.component.scss'],
                        providers: [
                            RxShellModel,
                            {
                                provide: i1.RX_VIEW_MODEL,
                                useExisting: RxShellModel
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActivatedRoute }, { type: i2__namespace.RxComponentCanDeactivateGuard }, { type: i1__namespace$2.RxUtilityModalsService }, { type: i2__namespace.RxDefinitionNameService }, { type: i2__namespace.RxPageTitleService }, { type: i2__namespace.RxBundleCacheService }, { type: i2__namespace.RxGlobalCacheService }, { type: i2__namespace.RxPreviousStateService }]; }, propDecorators: { viewDesignerComponent: [{
                    type: i0.ViewChild,
                    args: [i1.RxViewDesignerComponent, { static: false }]
                }] } });

    var RxShellDesignComponent = /** @class */ (function () {
        function RxShellDesignComponent(viewDesignerFacade) {
            this.viewDesignerFacade = viewDesignerFacade;
        }
        RxShellDesignComponent.prototype.dropPredicate = function (data) {
            return data.draggedViewComponentDescriptor.type !== i1$1.RX_SHELL.navBar.action;
        };
        RxShellDesignComponent.prototype.dropPredicateAction = function (data) {
            return data.draggedViewComponentDescriptor.type === i1$1.RX_SHELL.navBar.action;
        };
        return RxShellDesignComponent;
    }());
    RxShellDesignComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignComponent, deps: [{ token: i1__namespace.ViewDesignerFacade }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellDesignComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellDesignComponent, selector: "rx-shell-design", inputs: { model: "model" }, ngImport: i0__namespace, template: "<div class=\"shell-design d-flex align-items-start pl-2\">\n  <span class=\"a-product\">\n    <span class=\"a-product__logo logo-light logo-helix\"></span>\n    <span class=\"a-product__name\">\n      {{ viewDesignerFacade.bundleFriendlyName$ | async }}\n    </span>\n  </span>\n\n  <span class=\"a-sep\"></span>\n\n  <rx-canvas-outlet\n    class=\"shell-design-outlet d-block flex-grow-1\"\n    [class.allow-app-switch]=\"model.allowAppSwitching$ | async\"\n    [class.global-search]=\"model.globalSearchEnabled$ | async\"\n    dropListOrientation=\"horizontal\"\n    [dropPredicate]=\"dropPredicate\"\n  ></rx-canvas-outlet>\n\n  <rx-canvas-outlet\n    class=\"shell-design-outlet actions d-block flex-grow-1\"\n    [name]=\"'actions'\"\n    [dropPredicate]=\"dropPredicateAction\"\n    dropListOrientation=\"horizontal\"\n  ></rx-canvas-outlet>\n\n  <span *ngIf=\"model.globalSearchEnabled$ | async\" class=\"shell-button d-icon-search ml-auto\"></span>\n  <span *ngIf=\"model.allowAppSwitching$ | async\" class=\"shell-button d-icon-tiles ml-auto\"></span>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.shell-design{background:#313538;color:#fff;min-height:50px;border-bottom:2px solid #f86e00;padding-right:60px}.shell-design-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{display:flex;flex-flow:row wrap;min-height:50px}:host::ng-deep .shell-design-outlet.actions>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{justify-content:flex-end}.shell-design-outlet ::ng-deep .canvas-rx-shell-user-menu{position:absolute;top:0;right:calc(-150px - 44px)}.shell-design-outlet.allow-app-switch ::ng-deep .canvas-rx-shell-user-menu,.shell-design-outlet.global-search ::ng-deep .canvas-rx-shell-user-menu{right:calc(-150px - 86px)}.shell-design-outlet.allow-app-switch.global-search ::ng-deep .canvas-rx-shell-user-menu{right:calc(-150px - 128px)}.shell-design-outlet.actions{max-width:150px;min-width:150px}.shell-button{font-size:20px;margin-top:10px;width:42px;text-align:center}.a-product{margin-top:10px}\n"], components: [{ type: i1__namespace.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-design',
                        templateUrl: './shell-design.component.html',
                        styleUrls: ['./shell-design.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.ViewDesignerFacade }]; }, propDecorators: { model: [{
                    type: i0.Input
                }] } });

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

    var RxShellGlobalSearchRecordsModalComponent = /** @class */ (function (_super) {
        __extends(RxShellGlobalSearchRecordsModalComponent, _super);
        function RxShellGlobalSearchRecordsModalComponent(activeModalRef, recordDefinitionDataPageService, definitionNameService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.recordDefinitionDataPageService = recordDefinitionDataPageService;
            _this.definitionNameService = definitionNameService;
            _this.injector = injector;
            _this.config = _this.activeModalRef.getData();
            _this.filteredRecordDefinitionItems = [];
            _this.treeWrap = i1$4.TreeWrap.WrapAll;
            _this.DismissReasons = i1$4.DismissReasons;
            _this.definitionPickerOptions = {
                label: 'Display view when clicked',
                definitionType: i4.RxDefinitionPickerType.View,
                required: true
            };
            return _this;
        }
        RxShellGlobalSearchRecordsModalComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.selectedRecords = this.config.selectedRecords.map(function (record) {
                var _a;
                return (Object.assign(Object.assign({}, record), { isOpen: record.name === ((_a = _this.config.recordToEdit) === null || _a === void 0 ? void 0 : _a.name) }));
            });
            this.getRecordDefinitions().subscribe(function (records) {
                _this.availableRecordDefinitionItems = records;
                _this.updateFilteredItems();
            });
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.updateFilteredItems = function () {
            var _this = this;
            this.filteredRecordDefinitionItems = this.availableRecordDefinitionItems
                .filter(function (item) { return !_this.selectedRecords.find(function (record) { return record.name === item.name; }); })
                .map(function (item) { return ({
                data: item,
                label: item.definitionName
            }); });
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.addRecord = function (recordItem) {
            var _this = this;
            this.markAsDirty();
            this.selectedRecords.push(Object.assign(Object.assign({}, recordItem), { isOpen: true, view: null }));
            this.updateFilteredItems();
            setTimeout(function () {
                _this.accordionTabEls.last.nativeElement.scrollIntoView({
                    block: 'nearest'
                });
            });
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.toggleOpen = function (expandAll) {
            this.selectedRecords.forEach(function (record) { return (record.isOpen = expandAll); });
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.onSelectedRecordsListDrop = function (event) {
            this.addRecord(event.item.data);
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.removeRecord = function (record) {
            this.markAsDirty();
            this.selectedRecords = this.selectedRecords.filter(function (item) { return item.name !== record.name; });
            this.updateFilteredItems();
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.onSave = function () {
            var result = this.selectedRecords.map(function (record) { return ({
                name: record.name,
                view: record.view,
                definitionName: record.definitionName
            }); });
            this.activeModalRef.close(result);
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.getRecordDefinitions = function () {
            var _this = this;
            return this.recordDefinitionDataPageService
                .get({
                params: {
                    propertySelection: 'name',
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(operators.map(function (result) { return result.data.map(function (record) { return ({
                name: record.name,
                definitionName: _this.definitionNameService.getDisplayName(record.name)
            }); }); }));
        };
        RxShellGlobalSearchRecordsModalComponent.prototype.ngAfterViewInit = function () {
            var selectedRecordIndex = lodash.findIndex(this.selectedRecords, 'isOpen');
            if (selectedRecordIndex !== -1) {
                this.accordionTabEls.toArray()[selectedRecordIndex].nativeElement.scrollIntoView({
                    block: 'nearest'
                });
            }
        };
        return RxShellGlobalSearchRecordsModalComponent;
    }(i1$3.RxModalClass));
    RxShellGlobalSearchRecordsModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsModalComponent, deps: [{ token: i1__namespace$3.ActiveModalRef }, { token: i2__namespace$1.RxRecordDefinitionDataPageService }, { token: i2__namespace.RxDefinitionNameService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellGlobalSearchRecordsModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellGlobalSearchRecordsModalComponent, selector: "rx-shell-global-search-records-modal", viewQueries: [{ propertyName: "selectedRecordsForm", first: true, predicate: ["selectedRecordsForm"], descendants: true, read: i7.NgForm, static: true }, { propertyName: "accordionTabEls", predicate: i1$4.AdaptAccordionTabComponent, descendants: true, read: i0.ElementRef }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.available-records.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\">\n          <div\n            *ngIf=\"filteredRecordDefinitionItems.length\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"['selected-record-items']\"\n          >\n            <adapt-tree\n              [value]=\"filteredRecordDefinitionItems\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-record adaptTreeNodeTemplate>\n                <div\n                  *ngIf=\"record.data\"\n                  class=\"rx-tree-draggable-node\"\n                  cdkDrag\n                  [cdkDragData]=\"record.data\"\n                >\n                  <div (dblclick)=\"addRecord(record.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addRecord(record.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ record.data.definitionName }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <div *ngIf=\"!filteredRecordDefinitionItems.length\"\n               class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n            <adapt-empty-state\n              class=\"w-100\"\n              label=\"{{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.available-records.empty-state.message' | translate }}\"\n              type=\"search\"\n            ></adapt-empty-state>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.record-included-in-search-results.title' | translate }}\n        </h4>\n\n        <div *ngIf=\"selectedRecords.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-record-items\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedRecordsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <form #selectedRecordsForm=\"ngForm\">\n            <div\n              *ngFor=\"\n              let record of selectedRecords;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n              class=\"designer-modal-accordion-content\"\n              cdkDrag\n              cdkDragLockAxis=\"y\"\n              [cdkDragDisabled]=\"true\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [isOpen]=\"record.isOpen\"\n                (open)=\"record.isOpen = true\"\n                (close)=\"record.isOpen = false\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div class=\"rx-ellipsis\" [title]=\"record.definitionName\" rx-id=\"card-title\">\n                        {{ record.definitionName }}\n                      </div>\n                    </div>\n\n                    <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        (click)=\"$event.stopPropagation(); removeRecord(record)\"\n                        rx-id=\"remove-button\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <rx-definition-picker\n                  class=\"d-block w-50\"\n                  [name]=\"'selectedRecordName-' + index\"\n                  required=\"true\"\n                  [isDisabled]=\"config.isReadOnly\"\n                  [options]=\"definitionPickerOptions\"\n                  [(ngModel)]=\"record.view\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></rx-definition-picker>\n              </adapt-accordion-tab>\n            </div>\n          </form>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedRecords.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.record-included-in-search-results.empty-state.message' | translate }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"selectedRecordsForm.form.invalid || !isDirty()\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    btn-type=\"secondary\"\n    type=\"button\"\n    rx-id=\"cancel-button\"\n    (click)=\"activeModalRef.dismiss(DismissReasons.CLOSE_BTN)\"\n  >\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) : ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep .a-tree__node_leaf .a-tree__toggle{display:none}\n"], components: [{ type: i1__namespace$3.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i1__namespace$3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1__namespace$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i4__namespace.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i1__namespace$3.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i6__namespace.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i7__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i8__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-global-search-records-modal',
                        templateUrl: './shell-global-search-records-modal.component.html',
                        styleUrls: ['./shell-global-search-records-modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.ActiveModalRef }, { type: i2__namespace$1.RxRecordDefinitionDataPageService }, { type: i2__namespace.RxDefinitionNameService }, { type: i0__namespace.Injector }]; }, propDecorators: { accordionTabEls: [{
                    type: i0.ViewChildren,
                    args: [i1$4.AdaptAccordionTabComponent, { read: i0.ElementRef }]
                }], selectedRecordsForm: [{
                    type: i0.ViewChild,
                    args: ['selectedRecordsForm', { read: i7.NgForm, static: true }]
                }] } });

    var RxShellGlobalSearchRecordsControlComponent = /** @class */ (function (_super) {
        __extends(RxShellGlobalSearchRecordsControlComponent, _super);
        function RxShellGlobalSearchRecordsControlComponent(rxModalService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            return _this;
        }
        RxShellGlobalSearchRecordsControlComponent.prototype.openModal = function (recordToEdit) {
            var _this = this;
            this.rxModalService
                .openModal({
                title: 'Configure results view',
                data: {
                    selectedRecords: this.value,
                    recordToEdit: recordToEdit,
                    isReadOnly: this.isDisabled
                },
                content: RxShellGlobalSearchRecordsModalComponent,
                size: i1$1.OpenViewActionModalSize.Large,
                testID: 'configure-results-view'
            })
                .then(function (records) {
                _this.value = records;
            })
                .catch(lodash.noop);
        };
        RxShellGlobalSearchRecordsControlComponent.prototype.focus = function () {
            this.openModal();
        };
        RxShellGlobalSearchRecordsControlComponent.prototype.edit = function (record) {
            this.openModal(record);
        };
        RxShellGlobalSearchRecordsControlComponent.prototype.remove = function (record) {
            this.value = this.value.filter(function (item) { return item !== record; });
        };
        return RxShellGlobalSearchRecordsControlComponent;
    }(i4.ValueAccessor));
    RxShellGlobalSearchRecordsControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsControlComponent, deps: [{ token: i1__namespace$2.RxModalService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellGlobalSearchRecordsControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellGlobalSearchRecordsControlComponent, selector: "rx-shell-global-search-records-control", inputs: { options: "options" }, providers: [
            {
                provide: i7.NG_VALUE_ACCESSOR,
                useExisting: RxShellGlobalSearchRecordsControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-modal-button\" class=\"p-0 pb-1\" (click)=\"openModal()\" [hidden]=\"isDisabled\">\n  <span class=\"d-icon-plus_circle\"></span>\n  Configure results view\n</adapt-button>\n\n<ng-container *ngIf=\"value.length\">\n  <div class=\"my-1\">Records included in search results</div>\n\n  <div class=\"border px-2 py-1 mb-1 global-records-list\" *ngFor=\"let item of value\">\n    <div class=\"d-flex\">\n      <strong class=\"mr-auto mt-1 d-flex global-record-title flex-fill text-truncate\">{{ item.definitionName }}</strong>\n\n      <button\n        class=\"d-icon-left-pencil p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        rx-id=\"edit-button\"\n        (click)=\"edit(item)\"\n      ></button>\n\n      <button\n        class=\"d-icon-left-cross_adapt p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        rx-id=\"remove-button\"\n        *ngIf=\"!isDisabled\"\n        (click)=\"remove(item)\"\n      ></button>\n    </div>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.global-records-list{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.global-record-title{font-size:14px}\n"], components: [{ type: i1__namespace$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-global-search-records-control',
                        templateUrl: './shell-global-search-records-control.component.html',
                        styleUrls: ['./shell-global-search-records-control.component.scss'],
                        providers: [
                            {
                                provide: i7.NG_VALUE_ACCESSOR,
                                useExisting: RxShellGlobalSearchRecordsControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxModalService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RxShellMenuItemsControlComponent = /** @class */ (function (_super) {
        __extends(RxShellMenuItemsControlComponent, _super);
        function RxShellMenuItemsControlComponent(injector, rxUtilityModalsService) {
            var _a, _b;
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.rxUtilityModalsService = rxUtilityModalsService;
            _this.menuGroupLabel = 'Menu group';
            _this.menuItemTypeToLabelMap = (_a = {},
                _a[i1$1.RX_SHELL.navBar.menuItem] = 'Menu item',
                _a[i1$1.RX_SHELL.navBar.menuGroup] = _this.menuGroupLabel,
                _a[i1$1.RX_SHELL.navBar.userMenu] = _this.menuGroupLabel,
                _a);
            _this.actionNameToLabelMap = (_b = {},
                _b[i1$1.RX_SHELL.actions.launchURL] = 'Launch URL',
                _b[i1$1.RX_SHELL.actions.navigateToView] = 'Navigate to view',
                _b[i1$1.RX_SHELL.actions.navigateToSmartReporting] = 'Navigate to Smart Reporting',
                _b);
            return _this;
        }
        RxShellMenuItemsControlComponent.prototype.edit = function (menuItem) {
            this.designerItemModel.selectMenuItem(menuItem.guid);
        };
        RxShellMenuItemsControlComponent.prototype.remove = function (menuItem) {
            var _this = this;
            this.rxUtilityModalsService
                .confirm('Are you sure you want to delete this menu item?')
                .then(function (isConfirmed) {
                if (isConfirmed) {
                    _this.designerItemModel.removeMenuItem(menuItem.guid);
                }
            });
        };
        RxShellMenuItemsControlComponent.prototype.canBeRemoved = function (menuItem) {
            return menuItem.type !== i1$1.RX_SHELL.navBar.userMenu && !this.isDisabled;
        };
        RxShellMenuItemsControlComponent.prototype.trackByGuid = function (index, menuItem) {
            return menuItem.guid;
        };
        return RxShellMenuItemsControlComponent;
    }(i4.InspectorWidgetBase));
    RxShellMenuItemsControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemsControlComponent, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$2.RxUtilityModalsService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellMenuItemsControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuItemsControlComponent, selector: "rx-shell-menu-items-control", inputs: { options: "options", isDisabled: "isDisabled" }, usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"this.designerItemModel.menuItems$ | async as menuItems\">\n  <p *ngIf=\"menuItems.length === 0\">\n    No menu items have been defined. Drag and drop menu groups or menu items onto the canvas to define the menu.\n  </p>\n\n  <div *ngFor=\"let item of menuItems; trackBy: trackByGuid\">\n    <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: item }\"></ng-container>\n\n    <div class=\"ml-2\" *ngFor=\"let child of item.children; trackBy: trackByGuid\">\n      <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: child }\"></ng-container>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #itemTpl let-item>\n  <div class=\"border px-2 py-1 mb-2 d-flex align-items-start\">\n    <div class=\"mr-auto\">\n      <div class=\"font-weight-bold\">{{ item.data.menuItemName || item.data.menuGroupName }}</div>\n      <span class=\"text-secondary\">{{ menuItemTypeToLabelMap[item.type] }}</span>\n      <span class=\"text-secondary\" *ngIf=\"item.data.actionName\">\n        ({{ actionNameToLabelMap[item.data.actionName] }})</span\n      >\n    </div>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      rx-id=\"edit-button\"\n      (click)=\"edit(item)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      rx-id=\"remove-button\"\n      *ngIf=\"canBeRemoved(item)\"\n      (click)=\"remove(item)\"\n    ></button>\n  </div>\n</ng-template>\n", components: [{ type: i1__namespace$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "async": i3__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemsControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-menu-items-control',
                        templateUrl: './shell-menu-items-control.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$2.RxUtilityModalsService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var RxShellDesignModel = /** @class */ (function (_super) {
        __extends(RxShellDesignModel, _super);
        function RxShellDesignModel() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.allowAppSwitching$ = _this.sandbox.getComponentPropertyValue('allowAppSwitching');
            _this.globalSearchEnabled$ = _this.sandbox.getComponentPropertyValue('globalSearchEnabled');
            _this.menuItems$ = _this.sandbox.getChildComponentsTree();
            _this.childMenuItemsCount$ = _this.sandbox
                .getChildComponentGuids(function (component) { return component.type === i1$1.RX_SHELL.navBar.menuItem; }, true)
                .pipe(operators.map(function (items) { return items.length; }), operators.distinctUntilChanged());
            return _this;
        }
        RxShellDesignModel.getInitialProperties = function (initialProperties) {
            var result = Object.assign(Object.assign({ allowAppSwitching: true, globalSearchDisabled: true, globalSearchRecords: [] }, initialProperties), {
                // removing custom search state if definition saved in old designer
                // as custom state not supported anymore
                globalSearchUseDefault: true, globalSearchCustomSearchState: null
            });
            // additional inverted design field
            result.globalSearchEnabled = !result.globalSearchDisabled;
            return result;
        };
        RxShellDesignModel.prototype.rxInit = function () {
            var _this = this;
            this.sandbox.getComponentPropertyValue('globalSearchDisabled').subscribe(function (globalSearchDisabled) {
                _this.sandbox.updateInspectorConfig(_this.getInspector(globalSearchDisabled));
            });
            this.globalSearchEnabled$.subscribe(function (globalSearchEnabled) {
                _this.sandbox.updateComponentProperties({ globalSearchDisabled: !globalSearchEnabled });
            });
            rxjs.combineLatest([
                this.sandbox.getComponentPropertyValue('globalSearchRecords'),
                this.sandbox.getComponentPropertyValue('globalSearchDisabled'),
                this.childMenuItemsCount$
            ]).subscribe(function (_a) {
                var _b = __read(_a, 3), globalSearchRecords = _b[0], globalSearchDisabled = _b[1], childMenuItemsCount = _b[2];
                _this.sandbox.setValidationIssues(_this.validate(globalSearchRecords, globalSearchDisabled, childMenuItemsCount));
            });
        };
        RxShellDesignModel.prototype.getPropertiesByName = function (props) {
            return lodash.omit(props, 'globalSearchEnabled');
        };
        RxShellDesignModel.prototype.removeMenuItem = function (guid) {
            this.sandbox.removeComponents([guid]);
        };
        RxShellDesignModel.prototype.selectMenuItem = function (guid) {
            this.sandbox.selectComponent(guid);
        };
        RxShellDesignModel.prototype.validate = function (globalSearchRecords, globalSearchDisabled, childMenuItemsCount) {
            var validationIssues = [];
            if (childMenuItemsCount === 0) {
                validationIssues.push(this.sandbox.createError('Please add at least one menu item.'));
            }
            if (!globalSearchDisabled && globalSearchRecords.length === 0) {
                validationIssues.push(this.sandbox.createError('Please include at least one record in the global search results view.', 'globalSearchRecords'));
            }
            return validationIssues;
        };
        RxShellDesignModel.prototype.getInspector = function (globalSearchDisabled) {
            var globalSearchSectionItems = [
                {
                    name: 'globalSearchEnabled',
                    component: i4.SwitchFormControlComponent,
                    options: {
                        label: 'Enable global search'
                    }
                }
            ];
            if (!globalSearchDisabled) {
                globalSearchSectionItems.push({
                    name: 'globalSearchRecords',
                    component: RxShellGlobalSearchRecordsControlComponent
                });
            }
            return {
                inspectorSectionConfigs: [
                    {
                        label: 'General',
                        controls: [
                            {
                                name: 'allowAppSwitching',
                                component: i4.SwitchFormControlComponent,
                                options: {
                                    label: 'Enable application launcher'
                                }
                            }
                        ]
                    },
                    {
                        label: 'Global search',
                        controls: globalSearchSectionItems
                    },
                    {
                        label: 'Menu items',
                        controls: [
                            {
                                component: RxShellMenuItemsControlComponent,
                                options: {
                                    model: this
                                }
                            }
                        ]
                    }
                ]
            };
        };
        return RxShellDesignModel;
    }(i1.ViewDesignerComponentModel));

    var RxShellGlobalSearchRecordsModalModule = /** @class */ (function () {
        function RxShellGlobalSearchRecordsModalModule() {
        }
        return RxShellGlobalSearchRecordsModalModule;
    }());
    RxShellGlobalSearchRecordsModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellGlobalSearchRecordsModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsModalModule, declarations: [RxShellGlobalSearchRecordsModalComponent], imports: [i3.CommonModule,
            i7.FormsModule,
            i6.DragDropModule,
            i1$4.AdaptEmptyStateModule,
            i1$4.AdaptButtonModule,
            i1$4.AdaptAccordionModule,
            i4.RxDefinitionPickerModule,
            i1$4.AdaptTreeModule,
            i8.TranslateModule], exports: [RxShellGlobalSearchRecordsModalComponent] });
    RxShellGlobalSearchRecordsModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsModalModule, imports: [[
                i3.CommonModule,
                i7.FormsModule,
                i6.DragDropModule,
                i1$4.AdaptEmptyStateModule,
                i1$4.AdaptButtonModule,
                i1$4.AdaptAccordionModule,
                i4.RxDefinitionPickerModule,
                i1$4.AdaptTreeModule,
                i8.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellGlobalSearchRecordsModalComponent],
                        exports: [RxShellGlobalSearchRecordsModalComponent],
                        entryComponents: [RxShellGlobalSearchRecordsModalComponent],
                        imports: [
                            i3.CommonModule,
                            i7.FormsModule,
                            i6.DragDropModule,
                            i1$4.AdaptEmptyStateModule,
                            i1$4.AdaptButtonModule,
                            i1$4.AdaptAccordionModule,
                            i4.RxDefinitionPickerModule,
                            i1$4.AdaptTreeModule,
                            i8.TranslateModule
                        ]
                    }]
            }] });

    var RxShellGlobalSearchRecordsControlModule = /** @class */ (function () {
        function RxShellGlobalSearchRecordsControlModule() {
        }
        return RxShellGlobalSearchRecordsControlModule;
    }());
    RxShellGlobalSearchRecordsControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellGlobalSearchRecordsControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsControlModule, declarations: [RxShellGlobalSearchRecordsControlComponent], imports: [i3.CommonModule, i1$4.AdaptButtonModule, RxShellGlobalSearchRecordsModalModule], exports: [RxShellGlobalSearchRecordsControlComponent] });
    RxShellGlobalSearchRecordsControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsControlModule, imports: [[i3.CommonModule, i1$4.AdaptButtonModule, RxShellGlobalSearchRecordsModalModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellGlobalSearchRecordsControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellGlobalSearchRecordsControlComponent],
                        exports: [RxShellGlobalSearchRecordsControlComponent],
                        entryComponents: [RxShellGlobalSearchRecordsControlComponent],
                        imports: [i3.CommonModule, i1$4.AdaptButtonModule, RxShellGlobalSearchRecordsModalModule]
                    }]
            }] });

    var RxShellMenuItemsControlModule = /** @class */ (function () {
        function RxShellMenuItemsControlModule() {
        }
        return RxShellMenuItemsControlModule;
    }());
    RxShellMenuItemsControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemsControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellMenuItemsControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemsControlModule, declarations: [RxShellMenuItemsControlComponent], imports: [i3.CommonModule, i1$4.AdaptButtonModule] });
    RxShellMenuItemsControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemsControlModule, imports: [[i3.CommonModule, i1$4.AdaptButtonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemsControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellMenuItemsControlComponent],
                        imports: [i3.CommonModule, i1$4.AdaptButtonModule]
                    }]
            }] });

    var RxShellDesignAdapterService = /** @class */ (function () {
        function RxShellDesignAdapterService(rxGuidService) {
            this.rxGuidService = rxGuidService;
        }
        RxShellDesignAdapterService.prototype.adaptDefinition = function (componentDefinition) {
            this.addAddUserMenu(componentDefinition);
            this.addActionsOutlet(componentDefinition);
        };
        RxShellDesignAdapterService.prototype.addAddUserMenu = function (componentDefinition) {
            var userMenuGuid = this.rxGuidService.generate();
            var userMenuDefinition = {
                resourceType: i1$1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                guid: userMenuGuid,
                type: i1$1.RX_SHELL.navBar.userMenu,
                layout: JSON.stringify(i1$1.RxViewLayout.getViewLayoutForDefaultOutlet()),
                componentDefinitions: [],
                propertiesByName: {
                    menuGroupName: 'User menu'
                }
            };
            var userMenu = componentDefinition.componentDefinitions.find(function (component) { return component.type === i1$1.RX_SHELL.navBar.userMenu; });
            if (!userMenu) {
                var layout = JSON.parse(componentDefinition.layout);
                layout.outlets[0].columns[0].children.push(userMenuGuid);
                componentDefinition.layout = JSON.stringify(layout);
                componentDefinition.componentDefinitions.push(userMenuDefinition);
            }
        };
        RxShellDesignAdapterService.prototype.addActionsOutlet = function (componentDefinition) {
            var layout = JSON.parse(componentDefinition.layout);
            if (!layout.outlets.find(function (outlet) { return outlet.name === i1$1.RX_SHELL.outlets.actions; })) {
                layout.outlets.push(i1$1.RxViewLayout.getOutlet(i1$1.RX_SHELL.outlets.actions));
                componentDefinition.layout = JSON.stringify(layout);
            }
        };
        return RxShellDesignAdapterService;
    }());
    RxShellDesignAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignAdapterService, deps: [{ token: i1__namespace$4.RxGuidService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxShellDesignAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignAdapterService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignAdapterService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$4.RxGuidService }]; } });

    var RxShellDesignModule = /** @class */ (function () {
        function RxShellDesignModule(rxViewComponentRegistryService, componentFactoryResolver, rxDefinitionAdapterRegistryService, rxShellDesignAdapterService) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
            this.rxShellDesignAdapterService = rxShellDesignAdapterService;
            rxViewComponentRegistryService.register({
                type: i1$1.RX_SHELL.componentName,
                outlets: [
                    {
                        name: i1$1.RX_VIEW_DEFINITION.defaultOutletName
                    },
                    {
                        name: i1$1.RX_SHELL.outlets.actions
                    }
                ],
                properties: [
                    {
                        name: 'allowAppSwitching',
                        designType: i1$1.ViewComponentPropertyType.Boolean
                    },
                    {
                        name: 'globalSearchDisabled',
                        designType: i1$1.ViewComponentPropertyType.Boolean
                    },
                    {
                        name: 'globalSearchUseDefault',
                        designType: i1$1.ViewComponentPropertyType.Boolean
                    },
                    {
                        name: 'globalSearchRecords',
                        designType: i1$1.ViewComponentPropertyType.Array
                    }
                ],
                name: 'Navigation bar',
                hidden: true,
                group: 'Shell navigation',
                icon: 'layout',
                designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellDesignComponent),
                designComponentModel: RxShellDesignModel,
                bundleId: i2.RX_APPLICATION.platformBundleId,
                options: {
                    static: true
                }
            });
            this.rxDefinitionAdapterRegistryService.registerDesignAdapter(i1$1.RX_SHELL.componentName, this.rxShellDesignAdapterService);
        }
        return RxShellDesignModule;
    }());
    RxShellDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignModule, deps: [{ token: i1__namespace$5.RxViewComponentRegistryService }, { token: i0__namespace.ComponentFactoryResolver }, { token: i2__namespace.RxDefinitionAdapterRegistryService }, { token: RxShellDesignAdapterService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignModule, declarations: [RxShellDesignComponent], imports: [i3.CommonModule,
            i1.ViewDesignerCanvasModule,
            RxShellGlobalSearchRecordsControlModule,
            RxShellMenuItemsControlModule] });
    RxShellDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignModule, providers: [RxShellDesignAdapterService], imports: [[
                i3.CommonModule,
                i1.ViewDesignerCanvasModule,
                RxShellGlobalSearchRecordsControlModule,
                RxShellMenuItemsControlModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellDesignComponent],
                        imports: [
                            i3.CommonModule,
                            i1.ViewDesignerCanvasModule,
                            RxShellGlobalSearchRecordsControlModule,
                            RxShellMenuItemsControlModule
                        ],
                        providers: [RxShellDesignAdapterService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$5.RxViewComponentRegistryService }, { type: i0__namespace.ComponentFactoryResolver }, { type: i2__namespace.RxDefinitionAdapterRegistryService }, { type: RxShellDesignAdapterService }]; } });

    var RxShellMenuItemDesignComponent = /** @class */ (function () {
        function RxShellMenuItemDesignComponent() {
        }
        return RxShellMenuItemDesignComponent;
    }());
    RxShellMenuItemDesignComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellMenuItemDesignComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuItemDesignComponent, selector: "rx-shell-menu-item-design", inputs: { model: "model" }, ngImport: i0__namespace, template: "<span class=\"label\" [ngClass]=\"model.iconClass$ | async\">{{ model.label$ | async }}</span>\n", styles: [":host{min-height:42px;display:flex;align-items:center}.label{padding:0 10px;font-size:14px;cursor:pointer}\n"], directives: [{ type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-menu-item-design',
                        templateUrl: './shell-menu-item-design.component.html',
                        styleUrls: ['./shell-menu-item-design.component.scss']
                    }]
            }], propDecorators: { model: [{
                    type: i0.Input
                }] } });

    var RxShellMenuItemDesignModel = /** @class */ (function (_super) {
        __extends(RxShellMenuItemDesignModel, _super);
        function RxShellMenuItemDesignModel() {
            var _b;
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.componentProperties$ = _this.sandbox.componentProperties$;
            _this.label$ = _this.componentProperties$.pipe(operators.pluck('menuItemName'));
            _this.isActionItem$ = _this.sandbox.getParentComponentGuid().pipe(operators.switchMap(function (guid) { return _this.sandbox.getLayout(guid); }), operators.map(function (layout) { return _this.isActionItem(layout); }));
            _this.menuItemIcon$ = _this.sandbox.getComponentPropertyValue('menuItemIcon');
            _this.iconClass$ = _this.menuItemIcon$.pipe(operators.map(function (className) { return (className ? "d-icon-left-" + className : ''); }));
            _this.menuItemNameLabel = 'Label';
            _this.rxViewDefinitionCacheService = _this.injector.get(i1$1.RxViewDefinitionCacheService);
            _this.viewDesignerFacade = _this.injector.get(i1.ViewDesignerFacade);
            _this.rxOpenViewModelHelperService = _this.injector.get(actions.RxOpenViewModelHelperService);
            _this.shellActions = (_b = {},
                _b[i1$1.RX_SHELL.actions.launchURL] = {
                    name: i1$1.RX_SHELL.actions.launchURL,
                    label: 'Launch URL',
                    parameters: [
                        {
                            name: 'url',
                            component: i4.TextFormControlComponent,
                            options: {
                                label: 'URL',
                                required: true
                            }
                        },
                        {
                            name: 'launchBehavior',
                            component: i4.SelectFormControlComponent,
                            options: {
                                label: 'Launch behavior',
                                options: lodash.map(i1$1.RX_LAUNCH_BEHAVIOR, function (value) { return ({
                                    name: value.content,
                                    id: value.value
                                }); }),
                                required: true,
                                sortAlphabetically: false
                            }
                        }
                    ],
                    requiredParams: {
                        url: 'URL',
                        launchBehavior: 'Launch behavior'
                    },
                    defaultParams: {
                        url: null,
                        launchBehavior: i1$1.RX_LAUNCH_BEHAVIOR.newWindow.value
                    }
                },
                _b[i1$1.RX_SHELL.actions.navigateToView] = {
                    name: i1$1.RX_SHELL.actions.navigateToView,
                    label: 'Open view',
                    requiredParams: {
                        viewDefinitionName: 'View'
                    },
                    defaultParams: {
                        viewDefinitionName: null,
                        'viewParams.*': null,
                        'presentation.type': i1$1.OpenViewActionType.FullWidth,
                        'presentation.launchBehavior': i1$1.OpenViewActionLaunchBehavior.SameWindow,
                        'presentation.modalSize': null,
                        'presentation.title': null
                    }
                },
                _b[i1$1.RX_SHELL.actions.navigateToSmartReporting] = {
                    name: i1$1.RX_SHELL.actions.navigateToSmartReporting,
                    label: 'Navigate to Smart Reporting'
                },
                _b);
            _this.viewDefinitionName$ = _this.sandbox.getComponentPropertyValue('viewDefinitionName');
            _this.inputParams$ = _this.viewDefinitionName$.pipe(operators.switchMap(function (viewDefinitionName) { return _this.getViewInputParams(viewDefinitionName); }), operators.map(function (params) { return lodash.map(params, 'name'); }), operators.tap(function (currentViewInputNames) {
                _this.currentViewInputNames = currentViewInputNames;
            }));
            _this.currentViewInputNames = [];
            _this.isInShellRoot$ = _this.sandbox.getParentComponentGuid().pipe(operators.switchMap(function (guid) { return _this.viewDesignerFacade.getComponentType(guid); }), operators.map(function (type) { return type === i1$1.RX_SHELL.componentName; }), operators.tap(function (isInShellRoot) { return (_this.isInShellRoot = isInShellRoot); }));
            return _this;
        }
        RxShellMenuItemDesignModel.getInitialProperties = function (initialProperties) {
            var result = Object.assign({ menuItemName: 'New menu item', menuItemIcon: null, hidden: false, styles: null, actionName: i1$1.RX_SHELL.actions.navigateToView, 'presentation.type': i1$1.OpenViewActionType.FullWidth, 'presentation.launchBehavior': i1$1.OpenViewActionLaunchBehavior.SameWindow }, initialProperties);
            // navigateToState not supported anymore, so converting to navigateToView
            if (result.actionName === i1$1.RX_SHELL.actions.navigateToState) {
                result.actionName = i1$1.RX_SHELL.actions.navigateToView;
                delete result.state;
            }
            if (result.actionName === i1$1.RX_SHELL.actions.navigateToView) {
                result['presentation.modalSize'] = i1$1.OpenViewActionModalSize.Medium;
            }
            return result;
        };
        RxShellMenuItemDesignModel.getDefaultPermissions = function () {
            return [
                {
                    ownerId: i2.RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermission,
                    type: i2.RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermittedAction
                }
            ];
        };
        RxShellMenuItemDesignModel.prototype.rxInit = function () {
            var _this = this;
            rxjs.combineLatest([this.componentProperties$, this.inputParams$, this.isInShellRoot$, this.isActionItem$]).subscribe(function (_b) {
                var _c = __read(_b, 4), props = _c[0], inputParams = _c[1], isInShellRoot = _c[2], isActionItem = _c[3];
                _this.sandbox.updateInspectorConfig(_this.getInspector(props, inputParams, isInShellRoot, isActionItem));
                _this.sandbox.setValidationIssues(_this.validate(props));
            });
            // clear view input params after viewDefinitionName is changed
            this.viewDefinitionName$
                .pipe(operators.skip(1), operators.withLatestFrom(this.componentProperties$))
                .subscribe(function (_b) {
                var _c = __read(_b, 2), viewDefinitionName = _c[0], props = _c[1];
                var viewParams = _this.getEmptyViewParams(props);
                if (!lodash.isEmpty(viewParams)) {
                    _this.sandbox.updateComponentProperties(viewParams);
                }
            });
            this.sandbox.getComponentPropertyValue('menuItemName').subscribe(function (menuGroupName) {
                _this.sandbox.setBreadcrumbs(menuGroupName);
            });
            // clear previous action properties after actionName is changed
            this.sandbox
                .getComponentPropertyValue('actionName')
                .pipe(operators.pairwise(), operators.withLatestFrom(this.componentProperties$))
                .subscribe(function (_b) {
                var _c = __read(_b, 2), _d = __read(_c[0], 2), prevActionName = _d[0], actionName = _d[1], props = _c[1];
                var prevProps = _this.getActionDefaultProps(prevActionName, props);
                var nextProps = _this.getActionDefaultProps(actionName, props);
                var result = Object.assign(Object.assign({}, prevProps), nextProps);
                if (!lodash.isEmpty(result)) {
                    _this.sandbox.updateComponentProperties(result);
                }
            });
        };
        RxShellMenuItemDesignModel.prototype.getPropertiesByName = function (props) {
            var componentProps = ['menuItemName', 'menuItemIcon', 'hidden', 'styles', 'actionName'];
            var viewParams = props.actionName === i1$1.RX_SHELL.actions.navigateToView
                ? this.currentViewInputNames.map(function (name) { return "viewParams." + name; })
                : [];
            var actionProps = lodash.reject(this.getActionProps(props.actionName, props), function (prop) {
                return props['presentation.type'] === i1$1.OpenViewActionType.FullWidth
                    ? prop === 'presentation.modalSize' || prop === 'presentation.title'
                    : prop === 'presentation.launchBehavior';
            });
            return lodash.pick.apply(void 0, __spreadArray(__spreadArray(__spreadArray([props], __read(componentProps)), __read(actionProps)), __read(viewParams)));
        };
        RxShellMenuItemDesignModel.prototype.getEmptyViewParams = function (props) {
            return lodash.transform(props, function (result, value, key) {
                if (key.startsWith('viewParams')) {
                    result[key] = null;
                }
            }, {});
        };
        RxShellMenuItemDesignModel.prototype.getActionDefaultProps = function (actionName, props) {
            var currentAction = this.shellActions[actionName];
            return lodash.transform(currentAction.defaultParams, function (res, value, name) {
                if (name.endsWith('.*')) {
                    var key_1 = name.replace('*', '');
                    lodash.forEach(props, function (propValue, propName) {
                        if (propName.startsWith(key_1)) {
                            res[propName] = value;
                        }
                    });
                }
                else {
                    res[name] = value;
                }
            }, {});
        };
        RxShellMenuItemDesignModel.prototype.getActionProps = function (actionName, props) {
            var currentAction = this.shellActions[actionName];
            return lodash.transform(currentAction.defaultParams, function (res, value, name) {
                if (!name.endsWith('.*')) {
                    res.push(name);
                }
            }, []);
        };
        RxShellMenuItemDesignModel.prototype.getInspector = function (props, viewInputParamNames, isInShellRoot, isActionItem) {
            var _b, _c;
            if (isActionItem === void 0) { isActionItem = false; }
            var _a;
            var inspector = {
                inspectorSectionConfigs: [
                    {
                        label: 'General',
                        controls: [
                            {
                                name: 'menuItemName',
                                component: i4.TextFormControlComponent,
                                options: {
                                    label: this.menuItemNameLabel,
                                    required: true
                                }
                            },
                            {
                                name: 'hidden',
                                component: i4.SwitchFormControlComponent,
                                options: {
                                    label: 'Hidden'
                                }
                            },
                            {
                                name: 'styles',
                                component: i4.TagsFormControlComponent,
                                options: {
                                    label: 'CSS classes',
                                    placeholder: 'Add CSS classes',
                                    tooltip: new i2.Tooltip('Enter CSS class names to apply to this view component.'),
                                    errorCheck: i1.validateCssClassName
                                }
                            },
                            {
                                component: i1.RxComponentPermissionEditorWidgetComponent,
                                options: {
                                    label: 'Permissions',
                                    type: 'view',
                                    componentGuid: this.sandbox.guid
                                }
                            }
                        ]
                    }
                ]
            };
            var menuItemIconControl = {
                name: 'menuItemIcon',
                component: i4.IconPickerFormControlComponent,
                options: {
                    label: 'Icon'
                }
            };
            if (!isInShellRoot || isActionItem) {
                inspector.inspectorSectionConfigs[0].controls.splice(1, 0, menuItemIconControl);
            }
            var actionSection = {
                label: 'Action',
                controls: [
                    {
                        name: 'actionName',
                        component: i4.SelectFormControlComponent,
                        options: {
                            label: 'Action name',
                            options: lodash.map(this.shellActions, function (actionDescriptor) { return ({
                                name: actionDescriptor.label,
                                id: actionDescriptor.name
                            }); })
                        }
                    }
                ]
            };
            inspector.inspectorSectionConfigs.push(actionSection);
            if (props.actionName) {
                var actionDescriptor = this.shellActions[props.actionName];
                if ((_a = actionDescriptor === null || actionDescriptor === void 0 ? void 0 : actionDescriptor.parameters) === null || _a === void 0 ? void 0 : _a.length) {
                    (_b = actionSection.controls).push.apply(_b, __spreadArray([], __read(actionDescriptor.parameters)));
                }
                if (props.actionName === i1$1.RX_SHELL.actions.navigateToView) {
                    (_c = actionSection.controls).push.apply(_c, __spreadArray([], __read(this.rxOpenViewModelHelperService.getOpenViewInspector(viewInputParamNames.map(function (name) { return ({ name: name }); }), props['presentation.type'], props['presentation.modalSize'], this.expressionConfigurator))));
                }
            }
            return inspector;
        };
        RxShellMenuItemDesignModel.prototype.validate = function (props) {
            var validationIssues = [];
            if (!lodash.trim(props.menuItemName)) {
                validationIssues.push(this.sandbox.createError('Label cannot be blank.', 'menuItemName'));
            }
            validationIssues.push.apply(validationIssues, __spreadArray(__spreadArray([], __read(this.validateActionParams(props))), __read(i1.validateCssClassNames(props.styles))));
            return validationIssues;
        };
        RxShellMenuItemDesignModel.prototype.validateActionParams = function (props) {
            var _this = this;
            var validationIssues = [];
            var currentAction = this.shellActions[props.actionName];
            (lodash.keys(currentAction.requiredParams) || [])
                .filter(function (param) { return !props[param]; })
                .forEach(function (param) {
                validationIssues.push(_this.sandbox.createError((currentAction.requiredParams[param] || param) + " cannot be blank.", param));
            });
            return validationIssues;
        };
        RxShellMenuItemDesignModel.prototype.getViewInputParams = function (viewDefinitionName) {
            return viewDefinitionName
                ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(operators.pluck('inputParams'))
                : rxjs.of([]);
        };
        RxShellMenuItemDesignModel.prototype.isActionItem = function (layout) {
            var actionOutlet = layout === null || layout === void 0 ? void 0 : layout.outlets.find(function (outlet) { return outlet.name === i1$1.RX_SHELL.outlets.actions; });
            return (actionOutlet && i1$1.RxViewLayout.outletHasChild(actionOutlet, this.sandbox.guid)) || false;
        };
        return RxShellMenuItemDesignModel;
    }(i1.ViewDesignerComponentModel));

    var RxShellMenuItemExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxShellMenuItemExpressionConfigurator, _super);
        function RxShellMenuItemExpressionConfigurator() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.commonDataDictionary$ = rxjs.of([
                {
                    label: 'General',
                    expanded: true,
                    children: [
                        {
                            label: 'Current person ID',
                            expression: '${keywords.personId}'
                        },
                        {
                            label: 'Current user ID',
                            expression: '${keywords.userId}'
                        }
                    ]
                }
            ]);
            return _this;
        }
        RxShellMenuItemExpressionConfigurator.prototype.getDefaultConfig = function () {
            return Object.assign(Object.assign({}, _super.prototype.getDefaultConfig.call(this)), { operators: i2.ExpressionOperatorRowsByGroup.get(i2.ExpressionOperatorGroup.AllClient) });
        };
        return RxShellMenuItemExpressionConfigurator;
    }(i2.RxExpressionConfigurator));

    var RxShellMenuItemDesignAdapterService = /** @class */ (function () {
        function RxShellMenuItemDesignAdapterService() {
        }
        RxShellMenuItemDesignAdapterService.prototype.adaptDefinition = function (componentDefinition) {
            if (componentDefinition.propertiesByName.menuItemIcon) {
                componentDefinition.propertiesByName.menuItemIcon = lodash.get(i1$1.RX_LEGACY_ICONS, componentDefinition.propertiesByName.menuItemIcon, componentDefinition.propertiesByName.menuItemIcon);
            }
        };
        return RxShellMenuItemDesignAdapterService;
    }());
    RxShellMenuItemDesignAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignAdapterService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxShellMenuItemDesignAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignAdapterService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignAdapterService, decorators: [{
                type: i0.Injectable
            }] });

    var RxShellMenuItemDesignModule = /** @class */ (function () {
        function RxShellMenuItemDesignModule(rxViewComponentRegistryService, componentFactoryResolver, rxDefinitionAdapterRegistryService, rxShellMenuItemDesignAdapterService) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
            this.rxShellMenuItemDesignAdapterService = rxShellMenuItemDesignAdapterService;
            rxViewComponentRegistryService.register({
                type: i1$1.RX_SHELL.navBar.menuItem,
                properties: [
                    {
                        name: 'menuItemName',
                        localizable: true
                    },
                    {
                        name: 'hidden',
                        designType: i1$1.ViewComponentPropertyType.Boolean
                    }
                ],
                name: 'Menu item',
                group: 'Shell navigation',
                icon: 'list',
                index: 2,
                designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellMenuItemDesignComponent),
                designComponentModel: RxShellMenuItemDesignModel,
                bundleId: i2.RX_APPLICATION.platformBundleId,
                expressionConfigurator: RxShellMenuItemExpressionConfigurator
            });
            this.rxDefinitionAdapterRegistryService.registerDesignAdapter(i1$1.RX_SHELL.navBar.menuItem, this.rxShellMenuItemDesignAdapterService);
        }
        return RxShellMenuItemDesignModule;
    }());
    RxShellMenuItemDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignModule, deps: [{ token: i1__namespace$5.RxViewComponentRegistryService }, { token: i0__namespace.ComponentFactoryResolver }, { token: i2__namespace.RxDefinitionAdapterRegistryService }, { token: RxShellMenuItemDesignAdapterService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellMenuItemDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignModule, declarations: [RxShellMenuItemDesignComponent], imports: [i3.CommonModule] });
    RxShellMenuItemDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignModule, providers: [RxShellMenuItemDesignAdapterService], imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuItemDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellMenuItemDesignComponent],
                        imports: [i3.CommonModule],
                        providers: [RxShellMenuItemDesignAdapterService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$5.RxViewComponentRegistryService }, { type: i0__namespace.ComponentFactoryResolver }, { type: i2__namespace.RxDefinitionAdapterRegistryService }, { type: RxShellMenuItemDesignAdapterService }]; } });

    var RxShellMenuGroupDesignComponent = /** @class */ (function () {
        function RxShellMenuGroupDesignComponent() {
        }
        RxShellMenuGroupDesignComponent.prototype.dropPredicate = function (data) {
            return data.draggedViewComponentDescriptor.type === i1$1.RX_SHELL.navBar.menuItem;
        };
        return RxShellMenuGroupDesignComponent;
    }());
    RxShellMenuGroupDesignComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuGroupDesignComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellMenuGroupDesignComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuGroupDesignComponent, selector: "rx-shell-menu-group-design", inputs: { model: "model" }, ngImport: i0__namespace, template: "<div adaptDropdown [autoClose]=\"false\" [placement]=\"['bottom-left']\">\n  <div class=\"label-wrapper pr-0\" adaptDropdownToggle>\n    <span class=\"label d-icon-right-angle_down\">{{ model.label$ | async }}</span>\n  </div>\n\n  <rx-canvas-outlet adaptDropdownMenu [dropPredicate]=\"dropPredicate\"></rx-canvas-outlet>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.label-wrapper{min-height:42px;display:flex;align-items:center;cursor:pointer}.label{padding:0 10px;font-size:14px}rx-canvas-outlet{background:#313538;color:#fff;width:250px;overflow-x:hidden}rx-canvas-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{min-height:200px}\n"], components: [{ type: i1__namespace$3.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1__namespace.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i1__namespace$3.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1__namespace$3.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }], pipes: { "async": i3__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuGroupDesignComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-menu-group-design',
                        templateUrl: './shell-menu-group-design.component.html',
                        styleUrls: ['./shell-menu-group-design.component.scss']
                    }]
            }], propDecorators: { model: [{
                    type: i0.Input
                }] } });

    var RxShellMenuGroupDesignModel = /** @class */ (function (_super) {
        __extends(RxShellMenuGroupDesignModel, _super);
        function RxShellMenuGroupDesignModel() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.componentProperties$ = _this.sandbox.componentProperties$;
            _this.label$ = _this.componentProperties$.pipe(operators.pluck('menuGroupName'));
            return _this;
        }
        RxShellMenuGroupDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ menuGroupName: 'Menu group', hidden: false, styles: null }, initialProperties);
        };
        RxShellMenuGroupDesignModel.getDefaultPermissions = function () {
            var defaultPermissions = [
                {
                    ownerId: i2.RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermission,
                    type: i2.RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermittedAction
                }
            ];
            return defaultPermissions;
        };
        RxShellMenuGroupDesignModel.prototype.rxInit = function () {
            var _this = this;
            this.sandbox.updateInspectorConfig(this.getInspector());
            this.componentProperties$.subscribe(function (props) {
                _this.sandbox.setValidationIssues(_this.validate(props));
            });
            this.sandbox.getComponentPropertyValue('menuGroupName').subscribe(function (menuGroupName) {
                _this.sandbox.setBreadcrumbs(menuGroupName);
            });
        };
        RxShellMenuGroupDesignModel.prototype.validate = function (props) {
            var validationIssues = [];
            if (!lodash.trim(props.menuGroupName)) {
                validationIssues.push(this.sandbox.createError('Label cannot be blank.', 'menuGroupName'));
            }
            validationIssues.push.apply(validationIssues, __spreadArray([], __read(i1.validateCssClassNames(props.styles))));
            return validationIssues;
        };
        RxShellMenuGroupDesignModel.prototype.getInspector = function () {
            return {
                inspectorSectionConfigs: [
                    {
                        label: 'Properties',
                        controls: [
                            {
                                name: 'menuGroupName',
                                component: i4.TextFormControlComponent,
                                options: {
                                    label: 'Label',
                                    required: true
                                }
                            },
                            {
                                name: 'hidden',
                                component: i4.SwitchFormControlComponent,
                                options: {
                                    label: 'Hidden'
                                }
                            },
                            {
                                name: 'styles',
                                component: i4.TagsFormControlComponent,
                                options: {
                                    label: 'CSS classes',
                                    placeholder: 'Add CSS classes',
                                    tooltip: new i2.Tooltip('Enter CSS class names to apply to this view component.'),
                                    errorCheck: i1.validateCssClassName
                                }
                            },
                            {
                                component: i1.RxComponentPermissionEditorWidgetComponent,
                                options: {
                                    label: 'Permissions',
                                    type: 'view',
                                    componentGuid: this.sandbox.guid
                                }
                            }
                        ]
                    }
                ]
            };
        };
        return RxShellMenuGroupDesignModel;
    }(i1.ViewDesignerComponentModel));

    var RxShellMenuGroupDesignModule = /** @class */ (function () {
        function RxShellMenuGroupDesignModule(rxViewComponentRegistryService, componentFactoryResolver) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            rxViewComponentRegistryService.register({
                type: i1$1.RX_SHELL.navBar.menuGroup,
                properties: [
                    {
                        name: 'menuGroupName',
                        localizable: true
                    },
                    {
                        name: 'hidden',
                        designType: i1$1.ViewComponentPropertyType.Boolean
                    }
                ],
                name: 'Menu',
                group: 'Shell navigation',
                icon: 'app_list',
                index: 1,
                designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellMenuGroupDesignComponent),
                designComponentModel: RxShellMenuGroupDesignModel,
                bundleId: i2.RX_APPLICATION.platformBundleId,
                outlets: [
                    {
                        name: i1$1.RX_VIEW_DEFINITION.defaultOutletName
                    }
                ]
            });
        }
        return RxShellMenuGroupDesignModule;
    }());
    RxShellMenuGroupDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuGroupDesignModule, deps: [{ token: i1__namespace$5.RxViewComponentRegistryService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellMenuGroupDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuGroupDesignModule, declarations: [RxShellMenuGroupDesignComponent], imports: [i3.CommonModule, i1.ViewDesignerCanvasModule, i1.RxComponentPermissionEditorWidgetModule, i1$4.AdaptDropdownModule] });
    RxShellMenuGroupDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuGroupDesignModule, imports: [[i3.CommonModule, i1.ViewDesignerCanvasModule, i1.RxComponentPermissionEditorWidgetModule, i1$4.AdaptDropdownModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellMenuGroupDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellMenuGroupDesignComponent],
                        imports: [i3.CommonModule, i1.ViewDesignerCanvasModule, i1.RxComponentPermissionEditorWidgetModule, i1$4.AdaptDropdownModule]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$5.RxViewComponentRegistryService }, { type: i0__namespace.ComponentFactoryResolver }]; } });

    var RxShellUserMenuDesignComponent = /** @class */ (function () {
        function RxShellUserMenuDesignComponent() {
        }
        RxShellUserMenuDesignComponent.prototype.dropPredicate = function (data) {
            return data.draggedViewComponentDescriptor.type === i1$1.RX_SHELL.navBar.menuItem;
        };
        return RxShellUserMenuDesignComponent;
    }());
    RxShellUserMenuDesignComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellUserMenuDesignComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellUserMenuDesignComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellUserMenuDesignComponent, selector: "rx-shell-user-menu-design", ngImport: i0__namespace, template: "<div adaptDropdown [autoClose]=\"false\" [placement]=\"['bottom-right']\">\n  <div class=\"label-wrapper pr-0\" adaptDropdownToggle>\n    <span class=\"label d-icon-user_circle d-icon-right-angle_down\"></span>\n  </div>\n\n  <div adaptDropdownMenu class=\"drop\">\n    <rx-canvas-outlet [dropPredicate]=\"dropPredicate\"></rx-canvas-outlet>\n    <div class=\"d-icon-left-wrench_o px-3 pt-2\">My Preferences</div>\n    <div class=\"d-icon-left-exit px-3 py-2\">Sign Out</div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.label-wrapper{min-height:42px;display:flex;align-items:center;cursor:pointer}.label{padding:0 5px;font-size:20px}.drop{background:#313538;color:#fff;width:250px}rx-canvas-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{min-height:200px}\n"], components: [{ type: i1__namespace$3.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1__namespace.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i1__namespace$3.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1__namespace$3.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellUserMenuDesignComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-user-menu-design',
                        templateUrl: './shell-user-menu-design.component.html',
                        styleUrls: ['./shell-user-menu-design.component.scss']
                    }]
            }] });

    var RxShellUserMenuDesignModel = /** @class */ (function (_super) {
        __extends(RxShellUserMenuDesignModel, _super);
        function RxShellUserMenuDesignModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RxShellUserMenuDesignModel;
    }(i1.ViewDesignerComponentModel));

    var RxShellUserMenuDesignModule = /** @class */ (function () {
        function RxShellUserMenuDesignModule(rxViewComponentRegistryService, componentFactoryResolver) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            rxViewComponentRegistryService.register({
                type: i1$1.RX_SHELL.navBar.userMenu,
                properties: [],
                name: 'User menu',
                hidden: true,
                group: 'Shell navigation',
                icon: 'cube_square',
                designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellUserMenuDesignComponent),
                designComponentModel: RxShellUserMenuDesignModel,
                bundleId: i2.RX_APPLICATION.platformBundleId,
                outlets: [
                    {
                        name: i1$1.RX_VIEW_DEFINITION.defaultOutletName
                    }
                ],
                options: {
                    static: true
                }
            });
        }
        return RxShellUserMenuDesignModule;
    }());
    RxShellUserMenuDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellUserMenuDesignModule, deps: [{ token: i1__namespace$5.RxViewComponentRegistryService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellUserMenuDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellUserMenuDesignModule, declarations: [RxShellUserMenuDesignComponent], imports: [i3.CommonModule, i1.ViewDesignerCanvasModule, i1$4.AdaptDropdownModule] });
    RxShellUserMenuDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellUserMenuDesignModule, imports: [[i3.CommonModule, i1.ViewDesignerCanvasModule, i1$4.AdaptDropdownModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellUserMenuDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellUserMenuDesignComponent],
                        imports: [i3.CommonModule, i1.ViewDesignerCanvasModule, i1$4.AdaptDropdownModule]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$5.RxViewComponentRegistryService }, { type: i0__namespace.ComponentFactoryResolver }]; } });

    var RxShellActionDesignComponent = /** @class */ (function () {
        function RxShellActionDesignComponent() {
        }
        return RxShellActionDesignComponent;
    }());
    RxShellActionDesignComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellActionDesignComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellActionDesignComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellActionDesignComponent, selector: "rx-shell-action-design", inputs: { model: "model" }, ngImport: i0__namespace, template: "<span class=\"label\" [ngClass]=\"model.iconClass$ | async\" [title]=\"model.label$ | async\"></span>\n", styles: [":host{min-height:42px;display:flex;align-items:center;justify-content:center;min-width:42px}.label{font-size:20px;cursor:pointer}\n"], directives: [{ type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellActionDesignComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell-action-design',
                        templateUrl: './shell-action-design.component.html',
                        styleUrls: ['./shell-action-design.component.scss']
                    }]
            }], propDecorators: { model: [{
                    type: i0.Input
                }] } });

    var RxShellActionDesignModel = /** @class */ (function (_super) {
        __extends(RxShellActionDesignModel, _super);
        function RxShellActionDesignModel() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.iconClass$ = _this.menuItemIcon$.pipe(operators.map(function (className) { return (className ? "d-icon-" + className : ''); }));
            _this.menuItemNameLabel = 'Tooltip';
            return _this;
        }
        RxShellActionDesignModel.getInitialProperties = function (initialProperties) {
            var _a;
            var result = _super.getInitialProperties.call(this, Object.assign(Object.assign({}, initialProperties), { menuItemName: (_a = initialProperties === null || initialProperties === void 0 ? void 0 : initialProperties.menuItemName) !== null && _a !== void 0 ? _a : 'New action' }));
            result.menuItemIcon = result.menuItemIcon || 'triangle_right_circle_o';
            return result;
        };
        RxShellActionDesignModel.prototype.validate = function (props) {
            var validationIssues = _super.prototype.validate.call(this, props);
            if (!props.menuItemIcon) {
                validationIssues.push(this.sandbox.createError("Icon cannot be blank.", 'menuItemIcon'));
            }
            return validationIssues;
        };
        return RxShellActionDesignModel;
    }(RxShellMenuItemDesignModel));

    var RxShellActionDesignModule = /** @class */ (function () {
        function RxShellActionDesignModule(rxViewComponentRegistryService, componentFactoryResolver) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            rxViewComponentRegistryService.register({
                type: i1$1.RX_SHELL.navBar.action,
                properties: [
                    {
                        name: 'menuItemName',
                        localizable: true
                    },
                    {
                        name: 'hidden',
                        designType: i1$1.ViewComponentPropertyType.Boolean
                    }
                ],
                name: 'Action',
                group: 'Shell navigation',
                icon: 'triangle_right_circle_o',
                index: 3,
                designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellActionDesignComponent),
                designComponentModel: RxShellActionDesignModel,
                bundleId: i2.RX_APPLICATION.platformBundleId,
                expressionConfigurator: RxShellMenuItemExpressionConfigurator
            });
        }
        return RxShellActionDesignModule;
    }());
    RxShellActionDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellActionDesignModule, deps: [{ token: i1__namespace$5.RxViewComponentRegistryService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellActionDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellActionDesignModule, declarations: [RxShellActionDesignComponent], imports: [i3.CommonModule] });
    RxShellActionDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellActionDesignModule, imports: [[i3.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellActionDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellActionDesignComponent],
                        imports: [i3.CommonModule]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$5.RxViewComponentRegistryService }, { type: i0__namespace.ComponentFactoryResolver }]; } });

    var RxShellComponentsModule = /** @class */ (function () {
        function RxShellComponentsModule() {
        }
        return RxShellComponentsModule;
    }());
    RxShellComponentsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellComponentsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellComponentsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellComponentsModule, imports: [RxShellDesignModule,
            RxShellMenuItemDesignModule,
            RxShellMenuGroupDesignModule,
            RxShellUserMenuDesignModule,
            RxShellActionDesignModule] });
    RxShellComponentsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellComponentsModule, imports: [[
                RxShellDesignModule,
                RxShellMenuItemDesignModule,
                RxShellMenuGroupDesignModule,
                RxShellUserMenuDesignModule,
                RxShellActionDesignModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellComponentsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [],
                        imports: [
                            RxShellDesignModule,
                            RxShellMenuItemDesignModule,
                            RxShellMenuGroupDesignModule,
                            RxShellUserMenuDesignModule,
                            RxShellActionDesignModule
                        ]
                    }]
            }] });

    var RxShellDesignerPageModule = /** @class */ (function () {
        function RxShellDesignerPageModule() {
        }
        return RxShellDesignerPageModule;
    }());
    RxShellDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignerPageModule, declarations: [RxShellDesignerPageComponent], imports: [i3.CommonModule, i1.ViewDesignerModule, RxShellComponentsModule], exports: [RxShellDesignerPageComponent] });
    RxShellDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignerPageModule, imports: [[i3.CommonModule, i1.ViewDesignerModule, RxShellComponentsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxShellDesignerPageComponent],
                        exports: [RxShellDesignerPageComponent],
                        imports: [i3.CommonModule, i1.ViewDesignerModule, RxShellComponentsModule]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxShellDesignerPageComponent = RxShellDesignerPageComponent;
    exports.RxShellDesignerPageModule = RxShellDesignerPageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-view-shell-designer-page.umd.js.map
