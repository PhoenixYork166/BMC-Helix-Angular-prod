(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@helix/platform/ui-kit'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@ngx-translate/core'), require('@helix/platform/record/api'), require('@helix/platform/view/api'), require('rxjs/operators'), require('@helix/platform/shared/api'), require('lodash'), require('@helix/platform/process/api'), require('@helix/platform/named-list/api'), require('@helix/platform/association/api'), require('rxjs'), require('@helix/platform/utils'), require('@angular/cdk/drag-drop'), require('@angular/platform-browser'), require('@angular/router'), require('@bmc-ux/obsolete'), require('ckeditor4-angular'), require('file-saver'), require('moment-es6'), require('@bmc-ux/dpl-iconfont/config/if_dpl.json'), require('@angular/cdk/keycodes'), require('@bmc-ux/adapt-table'), require('@bmc-ux/adapt-radar'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/shared/components', ['exports', '@angular/core', '@angular/common', '@helix/platform/ui-kit', '@angular/forms', '@bmc-ux/adapt-angular', '@ngx-translate/core', '@helix/platform/record/api', '@helix/platform/view/api', 'rxjs/operators', '@helix/platform/shared/api', 'lodash', '@helix/platform/process/api', '@helix/platform/named-list/api', '@helix/platform/association/api', 'rxjs', '@helix/platform/utils', '@angular/cdk/drag-drop', '@angular/platform-browser', '@angular/router', '@bmc-ux/obsolete', 'ckeditor4-angular', 'file-saver', 'moment-es6', '@bmc-ux/dpl-iconfont/config/if_dpl.json', '@angular/cdk/keycodes', '@bmc-ux/adapt-table', '@bmc-ux/adapt-radar', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.shared = global.helix.platform.shared || {}, global.helix.platform.shared.components = {}), global.ng.core, global.ng.common, global.helix.platform["ui-kit"], global.ng.forms, global.adaptAngular, global.ngxTranslateCore, global.helix.platform.record.api, global.helix.platform.view.api, global.rxjs.operators, global.helix.platform.shared.api, global.lodash, global.helix.platform.process.api, global.helix.platform["named-list"].api, global.helix.platform.association.api, global.rxjs, global.helix.platform.utils, global.ng.cdk.dragDrop, global.ng.platformBrowser, global.ng.router, global.obsolete, global.ckeditor4Angular, global.fileSaver, global.moment, global.iconFontConfig, global.ng.cdk.keycodes, global.adaptTable, global.i3$3, global.ng.common.http));
})(this, (function (exports, i0, i4, i1, i2, i1$1, i4$1, i3, i3$1, operators, i1$2, lodash, i2$1, i4$2, i5, rxjs, i1$3, i4$3, i2$2, i1$4, obsolete, i3$2, fileSaver, moment, iconFontConfig, keycodes, i6, i3$3, i4$4) { 'use strict';

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
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i4__namespace$2 = /*#__PURE__*/_interopNamespace(i4$2);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$3);
    var i4__namespace$3 = /*#__PURE__*/_interopNamespace(i4$3);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$2);
    var i1__namespace$4 = /*#__PURE__*/_interopNamespace(i1$4);
    var i3__namespace$2 = /*#__PURE__*/_interopNamespace(i3$2);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
    var iconFontConfig__default = /*#__PURE__*/_interopDefaultLegacy(iconFontConfig);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i3__namespace$3 = /*#__PURE__*/_interopNamespace(i3$3);
    var i4__namespace$4 = /*#__PURE__*/_interopNamespace(i4$4);

    var AdminSettingsComponent = /** @class */ (function () {
        function AdminSettingsComponent() {
            this.hostClass = 'd-flex flex-column position-relative h-100';
            this.busy = null;
        }
        return AdminSettingsComponent;
    }());
    AdminSettingsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AdminSettingsComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    AdminSettingsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminSettingsComponent, selector: "rx-admin-settings", inputs: { header: "header", busy: "busy" }, host: { properties: { "class": "this.hostClass" } }, ngImport: i0__namespace, template: "<rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section', delay: 500 }\"></rx-busy-indicator>\n\n<div [class.is-hidden]=\"busy && !busy.closed\" class=\"h-100 d-flex flex-column\">\n  <h1 *ngIf=\"header\">{{ header }}</h1>\n\n  <ng-content></ng-content>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.is-hidden{display:none!important}:host{padding:1rem}\n"], components: [{ type: i1__namespace.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AdminSettingsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-admin-settings',
                        templateUrl: './admin-settings.component.html',
                        styleUrls: ['./admin-settings.component.scss']
                    }]
            }], propDecorators: { hostClass: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], header: [{
                    type: i0.Input
                }], busy: [{
                    type: i0.Input
                }] } });

    var AdminSettingsModule = /** @class */ (function () {
        function AdminSettingsModule() {
        }
        return AdminSettingsModule;
    }());
    AdminSettingsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AdminSettingsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AdminSettingsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AdminSettingsModule, declarations: [AdminSettingsComponent], imports: [i4.CommonModule, i1.RxBusyIndicatorModule], exports: [AdminSettingsComponent] });
    AdminSettingsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AdminSettingsModule, providers: [i1.RxModalService], imports: [[i4.CommonModule, i1.RxBusyIndicatorModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AdminSettingsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [AdminSettingsComponent],
                        providers: [i1.RxModalService],
                        imports: [i4.CommonModule, i1.RxBusyIndicatorModule],
                        exports: [AdminSettingsComponent]
                    }]
            }] });

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

    var ValueAccessor = /** @class */ (function () {
        function ValueAccessor() {
        }
        Object.defineProperty(ValueAccessor.prototype, "value", {
            get: function () {
                return this.innerValue;
            },
            set: function (value) {
                if (this.innerValue !== value) {
                    this.innerValue = value;
                    this.onChange(value);
                    this.onSetValue(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        ValueAccessor.prototype.touch = function () { };
        ValueAccessor.prototype.writeValue = function (value) {
            this.innerValue = value;
            this.onWriteValue(value);
        };
        ValueAccessor.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        ValueAccessor.prototype.onWriteValue = function (value) { };
        ValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this.isDisabled = isDisabled;
        };
        // helper that called when control sets value to model
        ValueAccessor.prototype.onSetValue = function (value) { };
        return ValueAccessor;
    }());

    var RxBooleanComponent = /** @class */ (function (_super) {
        __extends(RxBooleanComponent, _super);
        function RxBooleanComponent(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.rxBlur = new i0.EventEmitter();
            return _this;
        }
        RxBooleanComponent.prototype.ngOnInit = function () {
            this.control = this.injector.get(i2.NgControl).control;
        };
        RxBooleanComponent.prototype.getButtonType = function (value) {
            return value === this.value ? 'primary' : 'secondary';
        };
        RxBooleanComponent.prototype.onButtonBlur = function (event) {
            if (!event.relatedTarget || !this.buttons.find(function (element) { return element.nativeElement === event.relatedTarget; })) {
                this.onTouched();
                this.rxBlur.emit(event);
            }
        };
        RxBooleanComponent.prototype.setValue = function (value) {
            if (this.value === value) {
                this.value = null;
            }
            else {
                this.value = value;
            }
        };
        return RxBooleanComponent;
    }(ValueAccessor));
    RxBooleanComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanComponent, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxBooleanComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBooleanComponent, selector: "rx-boolean", inputs: { shouldDisplayAsCheckbox: "shouldDisplayAsCheckbox", required: "required", isDisabled: "isDisabled", label: "label", tooltip: "tooltip" }, outputs: { rxBlur: "rxBlur" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RxBooleanComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "buttons", predicate: i1$1.AdaptButtonComponent, descendants: true, read: i0.ElementRef }], usesInheritance: true, ngImport: i0__namespace, template: "<div *ngIf=\"!shouldDisplayAsCheckbox\" [class.has-danger]=\"adaptRxFeedbackRef.hasUIErrorState\">\n  <adapt-rx-control-label [label]=\"label\" [showRequiredLabel]=\"required\"></adapt-rx-control-label>\n\n  <div\n    class=\"btn-group\"\n    [attr.tabindex]=\"isDisabled ? 0 : undefined\"\n    [attr.aria-label]=\"isDisabled ? label + value : label\"\n    [class.focusable]=\"isDisabled\"\n  >\n    <button\n      adapt-button\n      size=\"small\"\n      [disabled]=\"isDisabled\"\n      [btn-type]=\"getButtonType(true)\"\n      (click)=\"setValue(true)\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.true' | translate\"\n      [attr.aria-pressed]=\"value === true\"\n      (blur)=\"onButtonBlur($event)\"\n      rx-id=\"true-button\"\n    >\n      <span class=\"d-icon-check_adapt\"></span>\n    </button>\n\n    <button\n      adapt-button\n      size=\"small\"\n      [disabled]=\"isDisabled\"\n      [btn-type]=\"getButtonType(false)\"\n      (click)=\"setValue(false)\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.false' | translate\"\n      [attr.aria-pressed]=\"value === false\"\n      (blur)=\"onButtonBlur($event)\"\n      rx-id=\"false-button\"\n    >\n      <span class=\"d-icon-circle_slash_o\"></span>\n    </button>\n  </div>\n\n  <adapt-rx-feedback\n    #adaptRxFeedbackRef\n    [errors]=\"control.errors\"\n    [controlTouched]=\"control.touched\"\n  ></adapt-rx-feedback>\n</div>\n\n<adapt-rx-checkbox\n  *ngIf=\"shouldDisplayAsCheckbox\"\n  [required]=\"required\"\n  [readonly]=\"isDisabled\"\n  [label]=\"label\"\n  [(ngModel)]=\"value\"\n  (onBlur)=\"onTouched(); rxBlur.emit($event)\"\n  [tooltip]=\"\n    tooltip\n      ? {\n          iconName: 'question_circle_o',\n          content: tooltip,\n          popoverMode: true\n        }\n      : null\n  \"\n>\n</adapt-rx-checkbox>\n", styles: [".btn-group{display:flex}.btn-group .btn-primary{margin-top:0;margin-bottom:0}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }, { type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-boolean',
                        templateUrl: './boolean.component.html',
                        styleUrls: ['./boolean.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RxBooleanComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; }, propDecorators: { shouldDisplayAsCheckbox: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }], tooltip: [{
                    type: i0.Input
                }], rxBlur: [{
                    type: i0.Output
                }], buttons: [{
                    type: i0.ViewChildren,
                    args: [i1$1.AdaptButtonComponent, { read: i0.ElementRef }]
                }] } });

    var RxBooleanModule = /** @class */ (function () {
        function RxBooleanModule() {
        }
        return RxBooleanModule;
    }());
    RxBooleanModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxBooleanModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanModule, declarations: [RxBooleanComponent], imports: [i2.FormsModule,
            i4.CommonModule,
            i2.ReactiveFormsModule,
            i1$1.AdaptRxFormControlModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptRxCheckboxModule,
            i4$1.TranslateModule,
            i1$1.AdaptPopoverModule], exports: [RxBooleanComponent] });
    RxBooleanModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanModule, imports: [[
                i2.FormsModule,
                i4.CommonModule,
                i2.ReactiveFormsModule,
                i1$1.AdaptRxFormControlModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptRxCheckboxModule,
                i4$1.TranslateModule,
                i1$1.AdaptPopoverModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.FormsModule,
                            i4.CommonModule,
                            i2.ReactiveFormsModule,
                            i1$1.AdaptRxFormControlModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptRxCheckboxModule,
                            i4$1.TranslateModule,
                            i1$1.AdaptPopoverModule
                        ],
                        declarations: [RxBooleanComponent],
                        exports: [RxBooleanComponent]
                    }]
            }] });

    var RxDefinitionPickerCacheService = /** @class */ (function () {
        function RxDefinitionPickerCacheService(recordDefinitionDataPageService, processDefinitionDataPageService, viewDefinitionDataPageService, namedListDefinitionDataPageService, associationDefinitionDataPageService, rxChatbotDefinitionDataPageService) {
            this.recordDefinitionDataPageService = recordDefinitionDataPageService;
            this.processDefinitionDataPageService = processDefinitionDataPageService;
            this.viewDefinitionDataPageService = viewDefinitionDataPageService;
            this.namedListDefinitionDataPageService = namedListDefinitionDataPageService;
            this.associationDefinitionDataPageService = associationDefinitionDataPageService;
            this.rxChatbotDefinitionDataPageService = rxChatbotDefinitionDataPageService;
            this.registeredConsumerCount = 0;
            this.bundleRecordDefinitionDescriptors = {};
            this.bundleDataRecordDefinitionDescriptors = {};
            this.bundleRegularRecordDefinitionDescriptors = {};
            this.bundleRegularDataRecordDefinitionDescriptors = {};
            this.bundleStandardDataRecordDefinitionDescriptors = {};
            this.bundlePublicRegularDataRecordDefinitionDescriptors = {};
            this.bundleInheritableRecordDefinitionDescriptors = {};
            this.bundleProcessDefinitionDescriptors = {};
            this.bundlePublicProcessDefinitionDescriptors = {};
            this.bundleViewDefinitionDescriptor = {};
            this.bundleNamedListDefinitionDescriptors = {};
            this.bundleAssociationDefinitionDescriptors = {};
            this.bundleChatbotDefinitionDescriptors = {};
        }
        RxDefinitionPickerCacheService.prototype.getBundleRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundleRecordDefinitionDescriptors[bundleId]) {
                this.bundleRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getBundleDataRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundleDataRecordDefinitionDescriptors[bundleId]) {
                this.bundleDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true,
                        excludeAuditRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleDataRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getBundleStandardDataRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundleStandardDataRecordDefinitionDescriptors[bundleId]) {
                this.bundleStandardDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true,
                        excludeAuditRecordDefinitions: true,
                        excludeCustomRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleStandardDataRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllRecordDefinitionDescriptors = function () {
            if (!this.allRecordDefinitionDescriptors) {
                this.allRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getAllDataRecordDefinitionDescriptors = function () {
            if (!this.allDataRecordDefinitionDescriptors) {
                this.allDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        excludeAuditRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getAllStandardDataRecordDefinitionDescriptors = function () {
            if (!this.allStandardDataRecordDefinitionDescriptors) {
                this.allStandardDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        excludeAuditRecordDefinitions: true,
                        excludeCustomRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allStandardDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getRxRecordDefinitionDescriptors = function () {
            if (!this.rxRecordDefinitionDescriptors) {
                this.rxRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        rxDefinitionsOnly: true,
                        propertySelection: ['name', 'scope']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.rxRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getRxDataRecordDefinitionDescriptors = function () {
            if (!this.rxDataRecordDefinitionDescriptors) {
                this.rxDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        rxDefinitionsOnly: true,
                        excludeAuditRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.rxDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getRxStandardDataRecordDefinitionDescriptors = function () {
            if (!this.rxStandardDataRecordDefinitionDescriptors) {
                this.rxStandardDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        rxDefinitionsOnly: true,
                        excludeAuditRecordDefinitions: true,
                        excludeCustomRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.rxStandardDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getAllRegularRecordDefinitionDescriptors = function () {
            if (!this.allRegularRecordDefinitionDescriptors) {
                this.allRegularRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        resourceType: i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allRegularRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getAllRegularDataRecordDefinitionDescriptors = function () {
            if (!this.allRegularDataRecordDefinitionDescriptors) {
                this.allRegularDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        excludeAuditRecordDefinitions: true,
                        resourceType: i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allRegularDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getRxRegularRecordDefinitionDescriptors = function () {
            if (!this.rxRegularRecordDefinitionDescriptors) {
                this.rxRegularRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        rxDefinitionsOnly: true,
                        resourceType: i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.rxRegularRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getRxRegularDataRecordDefinitionDescriptors = function () {
            if (!this.rxRegularDataRecordDefinitionDescriptors) {
                this.rxRegularDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        rxDefinitionsOnly: true,
                        resourceType: i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                        excludeAuditRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.rxRegularDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleRegularRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundleRegularRecordDefinitionDescriptors[bundleId]) {
                this.bundleRegularRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true,
                        resourceType: i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleRegularRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getBundleRegularDataRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundleRegularDataRecordDefinitionDescriptors[bundleId]) {
                this.bundleRegularDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true,
                        resourceType: i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                        excludeAuditRecordDefinitions: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleRegularDataRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllPublicRegularDataRecordDefinitionDescriptors = function () {
            if (!this.allPublicRegularDataRecordDefinitionDescriptors) {
                this.allPublicRegularDataRecordDefinitionDescriptors = this.getAllRegularDataRecordDefinitionDescriptors().pipe(operators.map(function (recordDefinitionDescriptors) { return lodash.filter(recordDefinitionDescriptors, { scope: i1$2.RX_BUNDLE.definitionScopeTypes.public }); }), operators.shareReplay(1));
            }
            return this.allPublicRegularDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getRxPublicRegularDataRecordDefinitionDescriptors = function () {
            if (!this.rxPublicRegularDataRecordDefinitionDescriptors) {
                this.rxPublicRegularDataRecordDefinitionDescriptors = this.getRxRegularDataRecordDefinitionDescriptors().pipe(operators.map(function (recordDefinitionDescriptors) { return lodash.filter(recordDefinitionDescriptors, { scope: i1$2.RX_BUNDLE.definitionScopeTypes.public }); }), operators.shareReplay(1));
            }
            return this.rxPublicRegularDataRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundlePublicRegularDataRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId]) {
                this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId] =
                    this.getBundleRegularDataRecordDefinitionDescriptors(bundleId).pipe(operators.map(function (recordDefinitionDescriptors) { return lodash.filter(recordDefinitionDescriptors, { scope: i1$2.RX_BUNDLE.definitionScopeTypes.public }); }));
            }
            return this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllInheritableRecordDefinitionDescriptors = function () {
            if (!this.allInheritableRecordDefinitionDescriptors) {
                this.allInheritableRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        inheritableDefinitionsOnly: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allInheritableRecordDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleInheritableRecordDefinitionDescriptors = function (bundleId) {
            if (!this.bundleInheritableRecordDefinitionDescriptors[bundleId]) {
                this.bundleInheritableRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true,
                        inheritableDefinitionsOnly: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleInheritableRecordDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllProcessDefinitionDescriptors = function () {
            if (!this.allProcessDefinitionDescriptors) {
                this.allProcessDefinitionDescriptors = this.processDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allProcessDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getAllPublicProcessDefinitionDescriptors = function () {
            if (!this.allPublicProcessDefinitionDescriptors) {
                this.allPublicProcessDefinitionDescriptors = this.getAllProcessDefinitionDescriptors().pipe(operators.map(function (processDefinitionDescriptors) { return lodash.filter(processDefinitionDescriptors, { scope: i1$2.RX_BUNDLE.definitionScopeTypes.public }); }), operators.shareReplay(1));
            }
            return this.allPublicProcessDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleProcessDefinitionDescriptors = function (bundleId) {
            if (!this.bundleProcessDefinitionDescriptors[bundleId]) {
                this.bundleProcessDefinitionDescriptors[bundleId] = this.processDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleProcessDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getBundlePublicProcessDefinitionDescriptors = function (bundleId) {
            if (!this.bundlePublicProcessDefinitionDescriptors[bundleId]) {
                this.bundlePublicProcessDefinitionDescriptors[bundleId] = this.getBundleProcessDefinitionDescriptors(bundleId).pipe(operators.map(function (processDefinitionDescriptors) { return lodash.filter(processDefinitionDescriptors, { scope: i1$2.RX_BUNDLE.definitionScopeTypes.public }); }));
            }
            return this.bundlePublicProcessDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllViewDefinitionDescriptors = function () {
            if (!this.allViewDefinitionDescriptors) {
                this.allViewDefinitionDescriptors = this.viewDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        viewType: i3$1.RX_VIEW_DEFINITION.types.regular
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allViewDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleViewDefinitionDescriptors = function (bundleId) {
            if (!this.bundleViewDefinitionDescriptor[bundleId]) {
                this.bundleViewDefinitionDescriptor[bundleId] = this.viewDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true,
                        viewType: i3$1.RX_VIEW_DEFINITION.types.regular
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleViewDefinitionDescriptor[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllNamedListDefinitionDescriptors = function () {
            if (!this.allNamedListDefinitionDescriptors) {
                this.allNamedListDefinitionDescriptors = this.namedListDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allNamedListDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleNamedListDefinitionDescriptors = function (bundleId) {
            if (!this.bundleNamedListDefinitionDescriptors[bundleId]) {
                this.bundleNamedListDefinitionDescriptors[bundleId] = this.namedListDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleNamedListDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllAssociationDefinitionDescriptors = function () {
            if (!this.allAssociationDefinitionDescriptors) {
                this.allAssociationDefinitionDescriptors = this.associationDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['name', 'scope']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allAssociationDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleAssociationDefinitionDescriptors = function (bundleId) {
            if (!this.bundleAssociationDefinitionDescriptors[bundleId]) {
                this.bundleAssociationDefinitionDescriptors[bundleId] = this.associationDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['name', 'scope'],
                        requireDependent: true
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleAssociationDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.getAllChatbotDefinitionDescriptors = function () {
            if (!this.allChatbotDefinitionDescriptors) {
                this.allChatbotDefinitionDescriptors = this.rxChatbotDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': ''
                    },
                    params: {
                        propertySelection: ['chatbotName']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.allChatbotDefinitionDescriptors;
        };
        RxDefinitionPickerCacheService.prototype.getBundleChatbotDefinitionDescriptors = function (bundleId) {
            if (!this.bundleChatbotDefinitionDescriptors[bundleId]) {
                this.bundleChatbotDefinitionDescriptors[bundleId] = this.rxChatbotDefinitionDataPageService
                    .get({
                    headers: {
                        'default-bundle-scope': bundleId
                    },
                    params: {
                        propertySelection: ['chatbotName']
                    }
                })
                    .pipe(operators.map(function (response) { return response.data; }), operators.shareReplay(1));
            }
            return this.bundleChatbotDefinitionDescriptors[bundleId];
        };
        RxDefinitionPickerCacheService.prototype.registerConsumer = function () {
            this.registeredConsumerCount++;
        };
        RxDefinitionPickerCacheService.prototype.unRegisterConsumer = function () {
            this.registeredConsumerCount--;
            if (this.registeredConsumerCount === 0) {
                this.clear();
            }
        };
        RxDefinitionPickerCacheService.prototype.clear = function () {
            this.bundleRecordDefinitionDescriptors = {};
            this.bundleDataRecordDefinitionDescriptors = {};
            this.bundleRegularRecordDefinitionDescriptors = {};
            this.bundleRegularDataRecordDefinitionDescriptors = {};
            this.bundleStandardDataRecordDefinitionDescriptors = {};
            this.bundleInheritableRecordDefinitionDescriptors = {};
            this.bundleProcessDefinitionDescriptors = {};
            this.bundlePublicProcessDefinitionDescriptors = {};
            this.bundleViewDefinitionDescriptor = {};
            this.bundleNamedListDefinitionDescriptors = {};
            this.bundleAssociationDefinitionDescriptors = {};
            this.bundleChatbotDefinitionDescriptors = {};
            this.bundlePublicRegularDataRecordDefinitionDescriptors = {};
            this.rxRecordDefinitionDescriptors = null;
            this.rxDataRecordDefinitionDescriptors = null;
            this.rxStandardDataRecordDefinitionDescriptors = null;
            this.allRecordDefinitionDescriptors = null;
            this.allDataRecordDefinitionDescriptors = null;
            this.allStandardDataRecordDefinitionDescriptors = null;
            this.allRegularRecordDefinitionDescriptors = null;
            this.allRegularDataRecordDefinitionDescriptors = null;
            this.rxRegularRecordDefinitionDescriptors = null;
            this.rxRegularDataRecordDefinitionDescriptors = null;
            this.allInheritableRecordDefinitionDescriptors = null;
            this.allProcessDefinitionDescriptors = null;
            this.allPublicProcessDefinitionDescriptors = null;
            this.allViewDefinitionDescriptors = null;
            this.allNamedListDefinitionDescriptors = null;
            this.allAssociationDefinitionDescriptors = null;
            this.allChatbotDefinitionDescriptors = null;
            this.allPublicRegularDataRecordDefinitionDescriptors = null;
            this.rxPublicRegularDataRecordDefinitionDescriptors = null;
        };
        return RxDefinitionPickerCacheService;
    }());
    RxDefinitionPickerCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerCacheService, deps: [{ token: i3__namespace.RxRecordDefinitionDataPageService }, { token: i2__namespace$1.RxProcessDefinitionDataPageService }, { token: i3__namespace$1.RxViewDefinitionDataPageService }, { token: i4__namespace$2.RxNamedListDefinitionDataPageService }, { token: i5__namespace.RxAssociationDefinitionDataPageService }, { token: i1__namespace$2.RxChatbotDefinitionDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDefinitionPickerCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.RxRecordDefinitionDataPageService }, { type: i2__namespace$1.RxProcessDefinitionDataPageService }, { type: i3__namespace$1.RxViewDefinitionDataPageService }, { type: i4__namespace$2.RxNamedListDefinitionDataPageService }, { type: i5__namespace.RxAssociationDefinitionDataPageService }, { type: i1__namespace$2.RxChatbotDefinitionDataPageService }]; } });

    var _a;
    exports.RxDefinitionPickerType = void 0;
    (function (RxDefinitionPickerType) {
        RxDefinitionPickerType["View"] = "view";
        RxDefinitionPickerType["Record"] = "record";
        RxDefinitionPickerType["DataRecord"] = "dataRecord";
        RxDefinitionPickerType["StandardDataRecord"] = "standardDataRecord";
        RxDefinitionPickerType["RegularRecord"] = "regularRecord";
        RxDefinitionPickerType["RegularDataRecord"] = "regularDataRecord";
        RxDefinitionPickerType["PublicRegularDataRecord"] = "publicRegularDataRecord";
        RxDefinitionPickerType["InheritableRecord"] = "inheritableRecord";
        RxDefinitionPickerType["NamedList"] = "namedList";
        RxDefinitionPickerType["Association"] = "association";
        RxDefinitionPickerType["Process"] = "process";
        RxDefinitionPickerType["PublicProcess"] = "publicProcess";
        RxDefinitionPickerType["Chatbot"] = "chatbot";
    })(exports.RxDefinitionPickerType || (exports.RxDefinitionPickerType = {}));
    exports.RxDefinitionPickerScope = void 0;
    (function (RxDefinitionPickerScope) {
        RxDefinitionPickerScope["All"] = "all";
        RxDefinitionPickerScope["Bundle"] = "bundle";
        RxDefinitionPickerScope["Rx"] = "rx";
    })(exports.RxDefinitionPickerScope || (exports.RxDefinitionPickerScope = {}));
    var RX_DEFINITION_PICKER = {
        definitionScopes: {
            all: exports.RxDefinitionPickerScope.All,
            bundle: exports.RxDefinitionPickerScope.Bundle,
            rx: exports.RxDefinitionPickerScope.Rx
        },
        definitionTypes: (_a = {},
            _a[exports.RxDefinitionPickerType.View] = {
                type: exports.RxDefinitionPickerType.View,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-views.label',
                dataGetters: {
                    all: 'getAllViewDefinitionDescriptors',
                    bundle: 'getBundleViewDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.Record] = {
                type: exports.RxDefinitionPickerType.Record,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllRecordDefinitionDescriptors',
                    rx: 'getRxRecordDefinitionDescriptors',
                    bundle: 'getBundleRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.DataRecord] = {
                type: exports.RxDefinitionPickerType.DataRecord,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllDataRecordDefinitionDescriptors',
                    rx: 'getRxDataRecordDefinitionDescriptors',
                    bundle: 'getBundleDataRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.StandardDataRecord] = {
                type: exports.RxDefinitionPickerType.StandardDataRecord,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllStandardDataRecordDefinitionDescriptors',
                    rx: 'getRxStandardDataRecordDefinitionDescriptors',
                    bundle: 'getBundleStandardDataRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.RegularRecord] = {
                type: exports.RxDefinitionPickerType.RegularRecord,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllRegularRecordDefinitionDescriptors',
                    rx: 'getRxRegularRecordDefinitionDescriptors',
                    bundle: 'getBundleRegularRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.RegularDataRecord] = {
                type: exports.RxDefinitionPickerType.RegularDataRecord,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllRegularDataRecordDefinitionDescriptors',
                    rx: 'getRxRegularDataRecordDefinitionDescriptors',
                    bundle: 'getBundleRegularDataRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.PublicRegularDataRecord] = {
                type: exports.RxDefinitionPickerType.PublicRegularDataRecord,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllPublicRegularDataRecordDefinitionDescriptors',
                    rx: 'getRxPublicRegularDataRecordDefinitionDescriptors',
                    bundle: 'getBundlePublicRegularDataRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.InheritableRecord] = {
                type: exports.RxDefinitionPickerType.InheritableRecord,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
                dataGetters: {
                    all: 'getAllInheritableRecordDefinitionDescriptors',
                    bundle: 'getBundleInheritableRecordDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.NamedList] = {
                type: exports.RxDefinitionPickerType.NamedList,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-named-lists.label',
                dataGetters: {
                    all: 'getAllNamedListDefinitionDescriptors',
                    bundle: 'getBundleNamedListDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.Association] = {
                type: exports.RxDefinitionPickerType.Association,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-associations.label',
                dataGetters: {
                    all: 'getAllAssociationDefinitionDescriptors',
                    bundle: 'getBundleAssociationDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.Process] = {
                type: exports.RxDefinitionPickerType.Process,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-processes.label',
                dataGetters: {
                    all: 'getAllProcessDefinitionDescriptors',
                    bundle: 'getBundleProcessDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.PublicProcess] = {
                type: exports.RxDefinitionPickerType.Process,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-processes.label',
                dataGetters: {
                    all: 'getAllPublicProcessDefinitionDescriptors',
                    bundle: 'getBundlePublicProcessDefinitionDescriptors'
                }
            },
            _a[exports.RxDefinitionPickerType.Chatbot] = {
                type: exports.RxDefinitionPickerType.Chatbot,
                allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-chatbots.label',
                dataGetters: {
                    all: 'getAllChatbotDefinitionDescriptors',
                    bundle: 'getBundleChatbotDefinitionDescriptors'
                }
            },
            _a)
    };

    var RxDefinitionPickerComponent = /** @class */ (function (_super) {
        __extends(RxDefinitionPickerComponent, _super);
        function RxDefinitionPickerComponent(renderer, rxBundleCacheService, rxDefinitionNameService, rxDefinitionPickerCacheService, rxGlobalCacheService, rxStringService, translateService, changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            _this.rxBundleCacheService = rxBundleCacheService;
            _this.rxDefinitionNameService = rxDefinitionNameService;
            _this.rxDefinitionPickerCacheService = rxDefinitionPickerCacheService;
            _this.rxGlobalCacheService = rxGlobalCacheService;
            _this.rxStringService = rxStringService;
            _this.translateService = translateService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.isDisabled = false;
            _this.searchMode = false;
            _this.searchQuery = '';
            _this.onPickerToggle$ = new rxjs.Subject();
            _this.bundleId = '';
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.globalDefinitionsLabel = _this.translateService.instant('com.bmc.arsys.rx.client.common.global-items.label');
            _this.defaultOptions = {
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [exports.RxDefinitionPickerScope.Bundle, exports.RxDefinitionPickerScope.All],
                    search: exports.RxDefinitionPickerScope.All
                },
                texts: {
                    placeholder: _this.translateService.instant('com.bmc.arsys.rx.client.common.select.label'),
                    noBundleDeployed: _this.translateService.instant('com.bmc.arsys.rx.client.definition-picker.no-bundle-deployed.label'),
                    noDefinitionsFound: _this.translateService.instant('com.bmc.arsys.rx.client.definition-picker.no-definitions-found.label')
                }
            };
            _this.scrollHandlerThrottled = lodash.throttle(_this.scrollHandler.bind(_this), 100);
            return _this;
        }
        RxDefinitionPickerComponent.prototype.onWindowResize = function () {
            if (this.dropdown.isOpen()) {
                this.dropdown.close();
            }
        };
        RxDefinitionPickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.config = Object.assign(Object.assign(Object.assign({}, this.defaultOptions), this.options), { texts: Object.assign(Object.assign({}, this.defaultOptions.texts), this.options.texts) });
            this.rxDefinitionPickerCacheService.registerConsumer();
            this.bundleId = this.config.bundleId || this.rxBundleCacheService.bundleId;
            this.getCurrentBundleFriendlyName();
            this.definitionTypeDescriptor = RX_DEFINITION_PICKER.definitionTypes[this.config.definitionType];
            this.definitionScopes = this.config.availableDefinitionPickerStates.definitionButtonsGroups;
            this.searchScope = this.config.availableDefinitionPickerStates.search;
            this.allDefinitionsLabel = this.translateService.instant(this.definitionTypeDescriptor.allDefinitionsLabelKey);
            this.onPickerToggle$
                .pipe(operators.filter(function (isOpen) { return Boolean(isOpen); }), operators.first(), operators.takeUntil(this.destroyed$))
                .subscribe(function (isOpen) {
                _this.getDefinitions(_this.definitionScopes[0]);
            });
            this.onPickerToggle$
                .pipe(operators.filter(function (isOpen) { return !isOpen; }), operators.takeUntil(this.destroyed$))
                .subscribe(function () { return _this.resetPickerState(); });
            window.addEventListener('scroll', this.scrollHandlerThrottled, true);
        };
        RxDefinitionPickerComponent.prototype.ngOnDestroy = function () {
            this.rxDefinitionPickerCacheService.unRegisterConsumer();
            this.destroyed$.next(true);
            this.destroyed$.complete();
            window.removeEventListener('scroll', this.scrollHandlerThrottled, true);
        };
        RxDefinitionPickerComponent.prototype.scrollHandler = function (event) {
            var _a, _b;
            if (this.dropdown.isOpen() &&
                lodash.get(event.target, 'style.visibility') !== 'hidden' &&
                !(event.target === ((_a = this.definitionTreeElementRef) === null || _a === void 0 ? void 0 : _a.nativeElement) ||
                    event.target === ((_b = this.searchField) === null || _b === void 0 ? void 0 : _b.inputRef.nativeElement))) {
                this.dropdown.close();
            }
        };
        RxDefinitionPickerComponent.prototype.getDefinitionProperties = function (definitionDescriptors) {
            var _this = this;
            return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(operators.map(function (bundleDescriptors) {
                return definitionDescriptors.map(function (definitionDescriptor) {
                    var bundleId = _this.rxDefinitionNameService.getBundleId(definitionDescriptor.name);
                    var bundleDescriptor = lodash.find(bundleDescriptors, { id: bundleId });
                    var bundleName = bundleDescriptor
                        ? bundleDescriptor.friendlyName || bundleDescriptor.id
                        : bundleId || _this.globalDefinitionsLabel;
                    return {
                        bundleName: bundleName,
                        bundleId: bundleId,
                        scope: definitionDescriptor.scope,
                        name: definitionDescriptor.name,
                        displayName: _this.rxDefinitionNameService.getDisplayName(definitionDescriptor.name)
                    };
                });
            }));
        };
        RxDefinitionPickerComponent.prototype.groupDefinitionsByBundle = function (definitionProperties) {
            var _this = this;
            var isBundleScopeSelected = this.activeDefinitionScope === exports.RxDefinitionPickerScope.Bundle;
            var hasExpandedBundle = false;
            var bundleGroups = definitionProperties
                .sort(function (a, b) { return a.displayName.localeCompare(b.displayName); })
                .reduce(function (bundles, currentDefinitionProperties) {
                var bundle = bundles.find(function (bundleItem) { return bundleItem.name === currentDefinitionProperties.bundleName; });
                var isSelectedDefinition = _this.value === currentDefinitionProperties.name;
                if (!bundle) {
                    bundle = {
                        id: currentDefinitionProperties.bundleId,
                        name: currentDefinitionProperties.bundleName,
                        isPublic: currentDefinitionProperties.scope === i1$2.RX_BUNDLE.definitionScopeTypes.public,
                        definitions: [],
                        isExpanded: false
                    };
                    bundles.push(bundle);
                }
                if (isSelectedDefinition) {
                    bundle.isExpanded = true;
                    hasExpandedBundle = true;
                }
                bundle.definitions.push({
                    name: currentDefinitionProperties.name,
                    displayName: currentDefinitionProperties.displayName,
                    isPublic: currentDefinitionProperties.scope === i1$2.RX_BUNDLE.definitionScopeTypes.public
                });
                return bundles;
            }, [])
                .sort(function (firstBundle, secondBundle) {
                if ((_this.activeDefinitionScope === exports.RxDefinitionPickerScope.Bundle && _this.bundleId === firstBundle.id) ||
                    firstBundle.name === _this.globalDefinitionsLabel) {
                    return -1;
                }
                if ((_this.activeDefinitionScope === exports.RxDefinitionPickerScope.Bundle && _this.bundleId === secondBundle.id) ||
                    secondBundle.name === _this.globalDefinitionsLabel) {
                    return 1;
                }
                return firstBundle.name.localeCompare(secondBundle.name);
            });
            if (isBundleScopeSelected && !hasExpandedBundle && bundleGroups[0]) {
                bundleGroups[0].isExpanded = true;
            }
            return bundleGroups;
        };
        RxDefinitionPickerComponent.prototype.getDefinitions = function (definitionScope) {
            var _this = this;
            this.activeDefinitionScope = definitionScope;
            var dataGetter = this.definitionTypeDescriptor.dataGetters[definitionScope];
            var definitions$;
            if (definitionScope === RX_DEFINITION_PICKER.definitionScopes.bundle) {
                definitions$ = this.rxGlobalCacheService.getBundleDescriptor(this.bundleId).pipe(operators.switchMap(function (bundle) {
                    return bundle ? _this.rxDefinitionPickerCacheService[dataGetter](_this.bundleId) : rxjs.of([]);
                }));
            }
            else {
                definitions$ = this.rxDefinitionPickerCacheService[dataGetter]();
            }
            return (this.bundles$ = definitions$.pipe(operators.switchMap(function (descriptors) { return _this.getDefinitionProperties(descriptors); }), operators.map(function (definitionsProperties) { return _this.groupDefinitionsByBundle(definitionsProperties); })));
        };
        RxDefinitionPickerComponent.prototype.selectDefinition = function (definitionName) {
            var _this = this;
            this.dropdown.close();
            this.setValue(definitionName).then(function () {
                // additional reset after value set to update expanded sections
                _this.resetPickerState();
            });
        };
        RxDefinitionPickerComponent.prototype.clearDefinition = function (e) {
            e.stopPropagation();
            this.setValue(null);
        };
        RxDefinitionPickerComponent.prototype.setValue = function (newValue) {
            var _this = this;
            if (this.value !== newValue) {
                if (this.options.beforeValueChange) {
                    return this.options.beforeValueChange(this.value, newValue).then(function (response) {
                        if (response) {
                            _this.value = newValue;
                        }
                        return response;
                    });
                }
                else {
                    this.value = newValue;
                    return Promise.resolve(true);
                }
            }
            else {
                return Promise.resolve(false);
            }
        };
        RxDefinitionPickerComponent.prototype.setDropdownWidth = function () {
            var _this = this;
            setTimeout(function () {
                var dropdownButton = _this.renderer.selectRootElement(_this.dropdownButton.nativeElement, true);
                var dropdownMenuHeader = _this.renderer.selectRootElement(_this.dropdownMenuHeader.nativeElement, true);
                // 14px - combined left and right padding around the buttons in the header
                // 2px - border
                _this.dropdownWidth = Math.max(dropdownButton.clientWidth, dropdownMenuHeader.clientWidth + 14) + 2;
                // This is needed when definition picker is used in a component with OnPush change detection strategy
                // TODO: this needs to be revisited when OnPush strategy is applied to the definition picker itself.
                _this.changeDetectorRef.markForCheck();
            });
        };
        RxDefinitionPickerComponent.prototype.enableSearchMode = function (searchQuery) {
            this.searchMode = true;
            this.previousDefinitionScope = this.activeDefinitionScope;
            if (searchQuery) {
                this.searchQuery = searchQuery;
                this.search(searchQuery);
            }
            else {
                this.getDefinitions(this.searchScope);
            }
        };
        RxDefinitionPickerComponent.prototype.disableSearchMode = function () {
            this.resetPickerState();
        };
        RxDefinitionPickerComponent.prototype.resetPickerState = function () {
            this.getDefinitions(this.searchMode ? this.previousDefinitionScope : this.activeDefinitionScope);
            this.searchMode = false;
            this.searchQuery = '';
        };
        RxDefinitionPickerComponent.prototype.search = function (searchQuery) {
            var _this = this;
            return (this.bundles$ = this.getDefinitions(this.searchScope).pipe(operators.debounceTime(250), operators.map(function (descriptors) { return descriptors
                .filter(function (descriptor) {
                return searchQuery.includes(':')
                    ? _this.rxStringService.caseInsensitiveSearch(descriptor.name, _this.getBundleNameSearchQuery(searchQuery))
                    : true;
            })
                .map(function (descriptor) { return (Object.assign(Object.assign({}, descriptor), { definitions: descriptor.definitions.filter(function (definition) {
                    return _this.rxStringService.caseInsensitiveSearch(definition.displayName, _this.getDefinitionNameSearchQuery(searchQuery));
                }) })); })
                .filter(function (descriptor) { return descriptor.definitions.length > 0; })
                .map(function (descriptor) { return (Object.assign(Object.assign({}, descriptor), { isExpanded: true })); }); })));
        };
        RxDefinitionPickerComponent.prototype.focus = function () {
            this.renderer.selectRootElement(this.dropdownButton.nativeElement, true).click();
        };
        RxDefinitionPickerComponent.prototype.onPaste = function (event) {
            var pastedText = event.clipboardData.getData('text/plain');
            if (this.dropdown.isOpen() && !this.searchMode && pastedText) {
                this.enableSearchMode(pastedText);
            }
        };
        RxDefinitionPickerComponent.prototype.onKeypress = function (event) {
            if (this.dropdown.isOpen() && !this.searchMode && event.key) {
                this.enableSearchMode(event.key);
            }
        };
        RxDefinitionPickerComponent.prototype.trackByBundle = function (index, bundle) {
            return bundle.id;
        };
        RxDefinitionPickerComponent.prototype.trackByDefinition = function (index, bundle) {
            return bundle.name;
        };
        RxDefinitionPickerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options && !changes.options.firstChange) {
                if (changes.options.currentValue.bundleId !== changes.options.previousValue.bundleId) {
                    this.bundleId = this.options.bundleId;
                    this.getCurrentBundleFriendlyName();
                    this.getDefinitions(this.definitionScopes[0]);
                }
                else if (changes.options.currentValue.definitionType !== changes.options.previousValue.definitionType) {
                    this.definitionTypeDescriptor =
                        RX_DEFINITION_PICKER.definitionTypes[changes.options.currentValue.definitionType];
                    this.allDefinitionsLabel = this.translateService.instant(this.definitionTypeDescriptor.allDefinitionsLabelKey);
                    this.getDefinitions(this.definitionScopes[0]);
                    this.value = null;
                }
            }
        };
        RxDefinitionPickerComponent.prototype.getCurrentBundleFriendlyName = function () {
            var _this = this;
            this.currentBundleFriendlyName$ = this.rxGlobalCacheService
                .getBundleDescriptor(this.bundleId)
                .pipe(operators.map(function (descriptor) { return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.friendlyName) || _this.config.texts.noBundleDeployed; }));
        };
        RxDefinitionPickerComponent.prototype.getBundleNameSearchQuery = function (searchQuery) {
            return this.rxDefinitionNameService.getBundleId(searchQuery) || searchQuery;
        };
        RxDefinitionPickerComponent.prototype.getDefinitionNameSearchQuery = function (searchQuery) {
            return this.rxDefinitionNameService.getDisplayName(searchQuery);
        };
        return RxDefinitionPickerComponent;
    }(ValueAccessor));
    RxDefinitionPickerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerComponent, deps: [{ token: i0__namespace.Renderer2 }, { token: i1__namespace$2.RxBundleCacheService }, { token: i1__namespace$2.RxDefinitionNameService }, { token: RxDefinitionPickerCacheService }, { token: i1__namespace$2.RxGlobalCacheService }, { token: i1__namespace$3.RxStringService }, { token: i4__namespace$1.TranslateService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxDefinitionPickerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: { options: "options", isDisabled: "isDisabled" }, host: { listeners: { "window:resize": "onWindowResize()", "window:paste": "onPaste($event)", "window:keypress": "onKeypress($event)" } }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RxDefinitionPickerComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }, { propertyName: "dropdownMenuHeader", first: true, predicate: ["dropdownMenuHeader"], descendants: true }, { propertyName: "dropdown", first: true, predicate: ["definitionPicker"], descendants: true, static: true }, { propertyName: "definitionTreeElementRef", first: true, predicate: ["definitionTree"], descendants: true }, { propertyName: "searchField", first: true, predicate: ["searchField"], descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-rx-control-label\n  [label]=\"options.label\"\n  [tooltip]=\"options.tooltip\"\n  [showRequiredLabel]=\"!!options.required\"\n></adapt-rx-control-label>\n\n<div\n  class=\"dropdown\"\n  adaptDropdown\n  appendToBody=\"true\"\n  [autoClose]=\"'outside'\"\n  (onOpen)=\"onPickerToggle$.next(true);setDropdownWidth()\"\n  (onClose)=\"onPickerToggle$.next(false)\"\n  [autoFocusFirst]=\"false\"\n  #definitionPicker=\"adaptDropdown\"\n>\n  <button\n    rx-id=\"toggle-button\"\n    #dropdownButton\n    class=\"btn btn-secondary\"\n    adaptDropdownToggle\n    type=\"button\"\n    [disabled]=\"isDisabled\"\n  >\n    <span class=\"rx-selected-item\" [title]=\"value || ''\">\n      {{ (value | rxDefinitionNamePipe) || config.texts.placeholder }}\n    </span>\n\n    <span\n      rx-id=\"clear-button\"\n      class=\"d-icon-cross_adapt btn-link\"\n      (click)=\"clearDefinition($event)\"\n      *ngIf=\"value && !isDisabled\"\n    >\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <div class=\"rx-dropdown-panel-header\" [ngClass]=\"searchMode ? 'pl-1' : 'pr-1'\">\n      <div class=\"d-flex\" *ngIf=\"!searchMode; else searchControls\" #dropdownMenuHeader>\n        <div class=\"btn-group bundle-btn-group\">\n          <button\n            type=\"button\"\n            adapt-button\n            *ngFor=\"let definitionScope of definitionScopes\"\n            class=\"rx-header-button\"\n            [btn-type]=\"activeDefinitionScope === definitionScope ? 'primary' : 'secondary'\"\n            size=\"xtra-small\"\n            (click)=\"getDefinitions(definitionScope)\"\n          >\n            <span>{{ definitionScope === 'bundle' ? (currentBundleFriendlyName$ | async) : allDefinitionsLabel }}</span>\n          </button>\n        </div>\n\n        <button\n          type=\"button\"\n          rx-id=\"search-button\"\n          class=\"d-icon-search btn btn-sm btn-link ml-1\"\n          *ngIf=\"!searchMode\"\n          (click)=\"$event.stopPropagation(); enableSearchMode()\"\n        ></button>\n      </div>\n    </div>\n\n    <ul #definitionTree class=\"rx-bundles\" *ngIf=\"dropdownWidth && bundles$ | async as bundles; else busyLoader\">\n      <adapt-empty-state\n        class=\"d-block mt-5\"\n        *ngIf=\"!bundles.length\"\n        type=\"search\"\n        [label]=\"config.texts.noDefinitionsFound\"\n      ></adapt-empty-state>\n\n      <li\n        class=\"rx-bundle\"\n        *ngFor=\"let bundle of bundles; trackBy: trackByBundle\"\n        (click)=\"bundle.isExpanded = !bundle.isExpanded\"\n      >\n        <span\n          rx-id=\"expand-bundle-button\"\n          class=\"expand-arrow d-icon-angle_right\"\n          [class.open]=\"bundle.isExpanded\"\n        ></span>\n\n        <adapt-highlight [result]=\"bundle.name\" [term]=\"searchQuery\"></adapt-highlight>\n\n        <div class=\"rx-definitions\" *ngIf=\"bundle.isExpanded\">\n          <button\n            class=\"dropdown-item\"\n            (click)=\"$event.stopPropagation(); selectDefinition(definition.name)\"\n            *ngFor=\"let definition of bundle.definitions; trackBy: trackByDefinition\"\n            [class.active]=\"value === definition.name\"\n            [title]=\"definition.name\"\n            type=\"button\"\n          >\n            <span *ngIf=\"!definition.isPublic\">* </span>\n\n            <adapt-highlight [result]=\"definition.displayName\" [term]=\"searchQuery\"></adapt-highlight>\n          </button>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<ng-template #busyLoader>\n  <rx-busy-indicator></rx-busy-indicator>\n</ng-template>\n\n<ng-template #searchControls>\n  <button\n    type=\"button\"\n    rx-id=\"back-button\"\n    class=\"d-icon-arrow_left btn btn-sm btn-link mr-1\"\n    (click)=\"$event.stopPropagation(); disableSearchMode()\"\n  ></button>\n\n  <adapt-rx-textfield\n    #searchField\n    (ngModelChange)=\"search($event)\"\n    [autofocus]=\"true\"\n    [(ngModel)]=\"searchQuery\"\n    size=\"sm\"\n  ></adapt-rx-textfield>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-dropdown-panel-header{border-bottom:1px solid #d6d7d8;display:flex;align-items:center;padding:0 10px;width:100%;height:50px;margin-top:-5px}.bundle-btn-group{max-width:calc(100% - 38px)}.rx-header-button{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rx-header-button.btn-primary{display:revert}adapt-rx-textfield{flex-grow:1;align-items:center;margin:0}.expand-arrow{padding:5px;transition:.2s}.expand-arrow.open{transform:rotate(90deg)}.rx-bundle{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 5px;line-height:30px;cursor:pointer}.rx-bundle ::ng-deep mark{padding:0}.rx-bundles{overflow-y:auto;margin:0;list-style:none;padding:5px 0;width:100%;height:275px}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}span[rx-id=search-button]{cursor:pointer;padding-left:10px}span[rx-id=search-button]:not(:hover){color:#313538}span[rx-id=back-button]{cursor:pointer;padding-right:10px}span[rx-id=back-button]:not(:hover){color:#313538}span[rx-id=expand-bundle-button]{display:inline-flex;width:15px}.rx-selected-item{flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-menu{height:330px!important}.dropdown-toggle{width:100%;display:flex;text-align:left}.dropdown-item{white-space:nowrap;overflow:hidden;padding:0 15px 0 30px;text-overflow:ellipsis}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1__namespace$1.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }, { type: i1__namespace.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i1__namespace$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "rxDefinitionNamePipe": i1__namespace$2.RxDefinitionNamePipe, "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-definition-picker',
                        templateUrl: './definition-picker.component.html',
                        styleUrls: ['./definition-picker.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RxDefinitionPickerComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }, { type: i1__namespace$2.RxBundleCacheService }, { type: i1__namespace$2.RxDefinitionNameService }, { type: RxDefinitionPickerCacheService }, { type: i1__namespace$2.RxGlobalCacheService }, { type: i1__namespace$3.RxStringService }, { type: i4__namespace$1.TranslateService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }], dropdownButton: [{
                    type: i0.ViewChild,
                    args: ['dropdownButton', { static: true }]
                }], dropdownMenuHeader: [{
                    type: i0.ViewChild,
                    args: ['dropdownMenuHeader', { static: false }]
                }], dropdown: [{
                    type: i0.ViewChild,
                    args: ['definitionPicker', { static: true }]
                }], definitionTreeElementRef: [{
                    type: i0.ViewChild,
                    args: ['definitionTree', { static: false }]
                }], searchField: [{
                    type: i0.ViewChild,
                    args: ['searchField', { static: false }]
                }], onWindowResize: [{
                    type: i0.HostListener,
                    args: ['window:resize']
                }], onPaste: [{
                    type: i0.HostListener,
                    args: ['window:paste', ['$event']]
                }], onKeypress: [{
                    type: i0.HostListener,
                    args: ['window:keypress', ['$event']]
                }] } });

    var RxDefinitionPickerModule = /** @class */ (function () {
        function RxDefinitionPickerModule() {
        }
        return RxDefinitionPickerModule;
    }());
    RxDefinitionPickerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDefinitionPickerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerModule, declarations: [RxDefinitionPickerComponent], imports: [i1$1.AdaptHighlightModule,
            i4.CommonModule,
            i2.FormsModule,
            i2.ReactiveFormsModule,
            i1.RxBusyIndicatorModule, i1__namespace$1.AdaptDropdownModule, i1$1.AdaptButtonModule,
            i1$2.RxDefinitionModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptRxTextfieldModule,
            i1$1.AdaptEmptyStateModule,
            i4$1.TranslateModule], exports: [RxDefinitionPickerComponent] });
    RxDefinitionPickerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerModule, providers: [RxDefinitionPickerCacheService], imports: [[
                i1$1.AdaptHighlightModule,
                i4.CommonModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i1.RxBusyIndicatorModule,
                i1$1.AdaptDropdownModule.forRoot(),
                i1$1.AdaptButtonModule,
                i1$2.RxDefinitionModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptRxTextfieldModule,
                i1$1.AdaptEmptyStateModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDefinitionPickerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1$1.AdaptHighlightModule,
                            i4.CommonModule,
                            i2.FormsModule,
                            i2.ReactiveFormsModule,
                            i1.RxBusyIndicatorModule,
                            i1$1.AdaptDropdownModule.forRoot(),
                            i1$1.AdaptButtonModule,
                            i1$2.RxDefinitionModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptRxTextfieldModule,
                            i1$1.AdaptEmptyStateModule,
                            i4$1.TranslateModule
                        ],
                        declarations: [RxDefinitionPickerComponent],
                        exports: [RxDefinitionPickerComponent],
                        providers: [RxDefinitionPickerCacheService]
                    }]
            }] });

    var RxSelectExpressionDropdownComponent = /** @class */ (function () {
        function RxSelectExpressionDropdownComponent() {
        }
        return RxSelectExpressionDropdownComponent;
    }());
    RxSelectExpressionDropdownComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectExpressionDropdownComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxSelectExpressionDropdownComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSelectExpressionDropdownComponent, selector: "rx-select-expression-dropdown", ngImport: i0__namespace, template: "", styles: [""] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectExpressionDropdownComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-select-expression-dropdown',
                        templateUrl: './select-expression-dropdown.component.html',
                        styleUrls: ['./select-expression-dropdown.component.scss']
                    }]
            }] });

    var RxSelectExpressionDropdownModule = /** @class */ (function () {
        function RxSelectExpressionDropdownModule() {
        }
        return RxSelectExpressionDropdownModule;
    }());
    RxSelectExpressionDropdownModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectExpressionDropdownModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxSelectExpressionDropdownModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectExpressionDropdownModule, declarations: [RxSelectExpressionDropdownComponent], exports: [RxSelectExpressionDropdownComponent] });
    RxSelectExpressionDropdownModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectExpressionDropdownModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectExpressionDropdownModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxSelectExpressionDropdownComponent],
                        imports: [],
                        exports: [RxSelectExpressionDropdownComponent]
                    }]
            }] });

    var RX_SELECT_EXPRESSION_DROPDOWN = {
        dropDownOptionsValue: {
            select: 'Select',
            expression: 'Expression'
        },
        dropDownDisplayValue: {
            buildExpression: 'Build Expression',
            editExpression: 'Edit Expression'
        }
    };

    var RX_DESIGNER_CANVAS = {
        paperOptions: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHUlEQVQYV2NkYGAwBuKzQIwXMBJSAJMfVUidcAQAnUQBC6jEGBUAAAAASUVORK5CYII=',
            height: 800,
            width: 1000
        }
    };

    var RxDesignerCanvasComponent = /** @class */ (function () {
        function RxDesignerCanvasComponent(elementRef, rxCommandManagerService) {
            this.elementRef = elementRef;
            this.rxCommandManagerService = rxCommandManagerService;
            this.elementSelected = new i0.EventEmitter();
        }
        RxDesignerCanvasComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.commandManager = new joint.dia.CommandManager({
                graph: this.graph,
                cmdBeforeAdd: function (cmdName, cell, graph, options) {
                    return _this.commandManager.enabled && !(options === null || options === void 0 ? void 0 : options.ignoreCommandManager);
                }
            });
            this.rxCommandManagerService.set(this.commandManager);
            this.paper = new joint.dia.Paper({
                defaultLink: new joint.shapes.bpmn.Flow(),
                embeddingMode: true,
                gridSize: 5,
                height: RX_DESIGNER_CANVAS.paperOptions.height,
                interactive: this.configuration.interactive,
                model: this.graph,
                width: RX_DESIGNER_CANVAS.paperOptions.width,
                restrictTranslate: function (elementView) {
                    // TODO-VS: implement restrictTranslate logic
                    return false;
                },
                validateEmbedding: function (childView, parentView) {
                    // TODO-VS: implement validateEmbedding logic
                    return true;
                }
            });
            this.paper.drawBackground({
                color: RX_DESIGNER_CANVAS.paperOptions.backgroundColor,
                image: RX_DESIGNER_CANVAS.paperOptions.backgroundImage,
                repeat: 'repeat',
                position: {
                    x: -1,
                    y: -1
                }
            });
            this.paperScroller = new joint.ui.PaperScroller({
                autoResizePaper: true,
                cursor: 'grab',
                padding: 32,
                paper: this.paper
            });
            this.paper.on('blank:pointerdown', function (evt) {
                _this.paperScroller.startPanning(evt);
                _this.elementSelected.emit(null);
            });
            this.paper.on('cell:pointerup', function (cellView, evt) {
                if (cellView) {
                    _this.elementSelected.emit(cellView.model.prop('elementModel/guid'));
                }
            });
            if (this.configuration.interactive) {
                this.commandManager.enable = function () {
                    _this.commandManager.enabled = true;
                };
                this.commandManager.disable = function () {
                    _this.commandManager.enabled = false;
                };
                this.commandManager.enable();
                this.paper.on('cell:expand:begin cell:collapse:begin', function () {
                    _this.commandManager.disable();
                });
                this.paper.on('cell:expand:done cell:collapse:done', function (cellView) {
                    if (!cellView.model.get('inCallActivity')) {
                        _this.commandManager.enable();
                    }
                });
            }
            this.paperScroller.render();
        };
        RxDesignerCanvasComponent.prototype.ngAfterViewInit = function () {
            this.elementRef.nativeElement.appendChild(this.paperScroller.el);
            this.paperScroller.center();
        };
        RxDesignerCanvasComponent.prototype.ngOnChanges = function (changes) {
            var _a;
            if ((_a = changes.droppedElement) === null || _a === void 0 ? void 0 : _a.currentValue) {
                this.addElementToCanvas(changes.droppedElement.currentValue);
            }
        };
        RxDesignerCanvasComponent.prototype.hasRedo = function () {
            return this.commandManager.hasRedo();
        };
        RxDesignerCanvasComponent.prototype.hasUndo = function () {
            return this.commandManager.hasUndo();
        };
        RxDesignerCanvasComponent.prototype.onClearCanvas = function () {
            // TODO-VS: add clear logic
        };
        RxDesignerCanvasComponent.prototype.onCopy = function () {
            // TODO-VS: add copy logic
        };
        RxDesignerCanvasComponent.prototype.onCut = function () {
            // TODO-VS: add cut logic
        };
        RxDesignerCanvasComponent.prototype.onExportToPng = function () {
            // TODO-VS: add export logic
        };
        RxDesignerCanvasComponent.prototype.onPaste = function () {
            // TODO-VS: add paste logic
        };
        RxDesignerCanvasComponent.prototype.onPrint = function () {
            // TODO-VS: add print logic
        };
        RxDesignerCanvasComponent.prototype.onRedo = function () {
            this.commandManager.redo();
        };
        RxDesignerCanvasComponent.prototype.onUndo = function () {
            this.commandManager.undo();
        };
        RxDesignerCanvasComponent.prototype.onZoomIn = function () {
            // TODO-VS: add zoom in logic
        };
        RxDesignerCanvasComponent.prototype.onZoomOut = function () {
            // TODO-VS: add zoom out logic
        };
        // TODO-VS: update types
        RxDesignerCanvasComponent.prototype.addElementToCanvas = function (dropData) {
            var _this = this;
            var paperDropArea = this.getCanvasDropArea(this.paper.$el);
            var localPoint = this.paper.clientToLocalPoint({ x: dropData.dropPoint.x, y: dropData.dropPoint.y });
            if (this.canDrop(paperDropArea, localPoint)) {
                var elementService = this.configuration.elementRegistry.get(dropData.item.data.value.type).elementService;
                var droppedElementShape_1 = elementService.getShape(Object.assign({ position: localPoint }, dropData.item.data.value));
                this.graph.addCell(droppedElementShape_1);
                setTimeout(function () {
                    _this.elementSelected.emit(droppedElementShape_1.prop('elementModel/guid'));
                });
            }
        };
        // TODO-VS: update types
        RxDesignerCanvasComponent.prototype.canDrop = function (paperDropArea, localPoint) {
            return (localPoint.x > paperDropArea.x.start &&
                localPoint.x < paperDropArea.x.end &&
                localPoint.y > paperDropArea.y.start &&
                localPoint.y < paperDropArea.y.end);
        };
        // TODO-VS: update types
        RxDesignerCanvasComponent.prototype.getCanvasDropArea = function (el) {
            var offset = el.offset();
            var innerWidth = el.innerWidth();
            var innerHeight = el.innerHeight();
            return {
                x: {
                    start: offset.left,
                    end: offset.left + innerWidth
                },
                y: {
                    start: offset.top,
                    end: offset.top + innerHeight
                }
            };
        };
        return RxDesignerCanvasComponent;
    }());
    RxDesignerCanvasComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCanvasComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace$2.RxCommandManagerService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxDesignerCanvasComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerCanvasComponent, selector: "rx-designer-canvas", inputs: { configuration: "configuration", graph: "graph", droppedElement: "droppedElement" }, outputs: { elementSelected: "elementSelected" }, usesOnChanges: true, ngImport: i0__namespace, template: "<div *ngIf=\"configuration.showToolbar\" class=\"rx-designer-toolbar\">\n  <!-- TODO-VS: Add custom actions -->\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-undo\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.undo.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"undo-button\"\n    [disabled]=\"!hasUndo()\"\n    (click)=\"onUndo()\"\n  ></button>\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-redo\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.redo.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"redo-button\"\n    [disabled]=\"!hasRedo()\"\n    (click)=\"onRedo()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-scissors\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.cut.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"cut-button\"\n    (click)=\"onCut()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-files_copy_o\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"copy-button\"\n    (click)=\"onCopy()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-files_text\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.paste.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"paste-button\"\n    (click)=\"onPaste()\"\n  ></button>\n\n  <button\n    class=\"d-icon-search_plus\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.zoom-in.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"zoom-in-button\"\n    (click)=\"onZoomIn()\"\n  ></button>\n\n  <button\n    class=\"d-icon-search_minus\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.zoom-out.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"zoom-out-button\"\n    (click)=\"onZoomOut()\"\n  ></button>\n\n  <button\n    class=\"d-icon-printer\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.print.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"print-button\"\n    (click)=\"onPrint()\"\n  ></button>\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-cross_square\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.clear-canvas.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"clear-canvas-button\"\n    (click)=\"onClearCanvas()\"\n  ></button>\n\n  <button\n    class=\"d-icon-file_arrow_png_o\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.export-to-png.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"export-to-png-button\"\n    (click)=\"onExportToPng()\"\n  ></button>\n\n  <!-- TODO-VS: Add grid size slider, snaplines checkbox and custom actions -->\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host ::ng-deep .joint-paper-scroller{height:calc(100% - 55px);background-color:#f0f1f1}:host ::ng-deep .joint-paper-scroller .joint-paper .connection{stroke:#959899}:host ::ng-deep .joint-paper-scroller .joint-paper .marker-target,:host ::ng-deep .joint-paper-scroller .joint-paper .marker-source{fill:#959899;stroke:#959899}:host ::ng-deep .joint-paper-scroller .joint-paper .joint-element .fobj div{font-size:12px}:host ::ng-deep .joint-paper-scroller .joint-paper g .label{font-size:12px;font-weight:inherit}.rx-designer-toolbar{display:flex;height:55px;border-bottom:1px solid #d6d7d8;padding-left:300px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCanvasComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-designer-canvas',
                        templateUrl: './designer-canvas.component.html',
                        styleUrls: ['./designer-canvas.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i1__namespace$2.RxCommandManagerService }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], graph: [{
                    type: i0.Input
                }], droppedElement: [{
                    type: i0.Input
                }], elementSelected: [{
                    type: i0.Output
                }] } });

    // TODO-VS: mode to shared folder after jointJS is updated
    var RxDesignerCanvasModule = /** @class */ (function () {
        function RxDesignerCanvasModule() {
        }
        return RxDesignerCanvasModule;
    }());
    RxDesignerCanvasModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCanvasModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDesignerCanvasModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCanvasModule, declarations: [RxDesignerCanvasComponent], imports: [i1$1.AdaptButtonModule, i1$1.AdaptTooltipModule, i4.CommonModule, i4$1.TranslateModule], exports: [RxDesignerCanvasComponent] });
    RxDesignerCanvasModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCanvasModule, imports: [[i1$1.AdaptButtonModule, i1$1.AdaptTooltipModule, i4.CommonModule, i4$1.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerCanvasModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxDesignerCanvasComponent],
                        imports: [i1$1.AdaptButtonModule, i1$1.AdaptTooltipModule, i4.CommonModule, i4$1.TranslateModule],
                        exports: [RxDesignerCanvasComponent]
                    }]
            }] });

    var RxDesignerHeaderComponent = /** @class */ (function () {
        function RxDesignerHeaderComponent() {
            this.breadcrumbItems = [];
            this.isDesignMode = true;
            this.isPreviewAvailable = false;
            this.isSaveButtonDisabled = false;
            this.breadcrumbSelected = new i0.EventEmitter();
            this.toggleDesignMode = new i0.EventEmitter();
            this.showPreview = new i0.EventEmitter();
            this.save = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
        }
        return RxDesignerHeaderComponent;
    }());
    RxDesignerHeaderComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerHeaderComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxDesignerHeaderComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: { bundleName: "bundleName", breadcrumbItems: "breadcrumbItems", isDesignMode: "isDesignMode", isPreviewAvailable: "isPreviewAvailable", isSaveButtonDisabled: "isSaveButtonDisabled" }, outputs: { breadcrumbSelected: "breadcrumbSelected", toggleDesignMode: "toggleDesignMode", showPreview: "showPreview", save: "save", closeDesigner: "closeDesigner" }, ngImport: i0__namespace, template: "<div class=\"header-column-left\">\n  <span class=\"bundle-name\">{{ bundleName }}</span>\n</div>\n\n<div class=\"header-column-right\">\n  <div class=\"header-title\">\n    <rx-breadcrumb-bar (selectedItem)=\"breadcrumbSelected.emit($event)\" [items]=\"breadcrumbItems\"></rx-breadcrumb-bar>\n  </div>\n\n  <div class=\"header-buttons\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      size=\"small\"\n      rx-id=\"json-button\"\n      class=\"header-button\"\n      (click)=\"toggleDesignMode.emit()\"\n    >\n      <span [ngClass]=\"{ 'd-icon-brackets_curly': isDesignMode, 'd-icon-app_eye': !isDesignMode }\"></span>\n      {{ isDesignMode ? 'JSON' : 'UI Design' }}\n    </button>\n\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      rx-id=\"preview-button\"\n      size=\"small\"\n      [hidden]=\"!isPreviewAvailable\"\n      (click)=\"showPreview.emit()\"\n      class=\"header-button\"\n    >\n      <span class=\"d-icon-eye\"></span>\n      Preview\n    </button>\n\n    <div class=\"header-button-divider\"></div>\n\n    <button\n      adapt-button\n      type=\"button\"\n      [disabled]=\"isSaveButtonDisabled\"\n      rx-id=\"save-button\"\n      size=\"small\"\n      (click)=\"save.emit()\"\n      btn-type=\"primary\"\n      class=\"header-button\"\n    >\n      Save\n    </button>\n\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"close-button\"\n      size=\"small\"\n      (click)=\"closeDesigner.emit()\"\n      btn-type=\"secondary\"\n      class=\"header-button\"\n    >\n      Close\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex:0 0 50px;font-size:1.3em;background:#f0f1f1;border-bottom:1px solid #d6d7d8}.bundle-name,.header-title{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.bundle-name{padding:0 10px;flex:1}.header-title{flex-grow:1;padding-right:20px}.header-buttons{display:flex;margin-left:auto}.header-button{margin:0 2px}.header-button-divider{margin:auto 5px;display:block;height:20px;width:1px;background-color:#d6d7d8}.header-column-right,.header-column-left{display:flex;align-items:center;height:100%;overflow:hidden}.header-column-right{padding:0 10px;flex-grow:1}.header-column-left{flex:0 0 280px}\n"], components: [{ type: i1__namespace.RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: ["items"], outputs: ["selectedItem"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerHeaderComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-designer-header',
                        templateUrl: './designer-header.component.html',
                        styleUrls: ['./designer-header.component.scss']
                    }]
            }], propDecorators: { bundleName: [{
                    type: i0.Input
                }], breadcrumbItems: [{
                    type: i0.Input
                }], isDesignMode: [{
                    type: i0.Input
                }], isPreviewAvailable: [{
                    type: i0.Input
                }], isSaveButtonDisabled: [{
                    type: i0.Input
                }], breadcrumbSelected: [{
                    type: i0.Output
                }], toggleDesignMode: [{
                    type: i0.Output
                }], showPreview: [{
                    type: i0.Output
                }], save: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }] } });

    var RxDesignerHeaderModule = /** @class */ (function () {
        function RxDesignerHeaderModule() {
        }
        return RxDesignerHeaderModule;
    }());
    RxDesignerHeaderModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerHeaderModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDesignerHeaderModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerHeaderModule, declarations: [RxDesignerHeaderComponent], imports: [i4.CommonModule, i1$1.AdaptButtonModule, i1.RxBreadcrumbBarModule], exports: [RxDesignerHeaderComponent] });
    RxDesignerHeaderModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerHeaderModule, imports: [[i4.CommonModule, i1$1.AdaptButtonModule, i1.RxBreadcrumbBarModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerHeaderModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxDesignerHeaderComponent],
                        exports: [RxDesignerHeaderComponent],
                        imports: [i4.CommonModule, i1$1.AdaptButtonModule, i1.RxBreadcrumbBarModule]
                    }]
            }] });

    var RxDesignerPaletteComponent = /** @class */ (function () {
        function RxDesignerPaletteComponent() {
            // TODO-VS: update types
            this.elementDropped = new i0.EventEmitter();
            this.searchField = new i2.FormControl();
        }
        // TODO-VS: update types
        RxDesignerPaletteComponent.prototype.onDropListDropped = function (dropData) {
            this.elementDropped.emit(dropData);
        };
        RxDesignerPaletteComponent.prototype.trackByLabelFn = function (index, item) {
            return item.label;
        };
        return RxDesignerPaletteComponent;
    }());
    RxDesignerPaletteComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerPaletteComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxDesignerPaletteComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerPaletteComponent, selector: "rx-designer-palette", inputs: { tree: "tree" }, outputs: { elementDropped: "elementDropped" }, ngImport: i0__namespace, template: "<adapt-rx-search placeholder=\"Search\" rx-id=\"palette-search-field\" [formControl]=\"searchField\"></adapt-rx-search>\n\n<adapt-accordion [multiselect]=\"true\">\n  <adapt-accordion-tab *ngFor=\"let node of tree; trackBy: trackByLabelFn\" [title]=\"node.label\" [isOpen]=\"true\">\n    <div class=\"node-container\" cdkDropList cdkDropListSortingDisabled (cdkDropListDropped)=\"onDropListDropped($event)\">\n      <div\n        *ngFor=\"let child of node.children; trackBy: trackByLabelFn\"\n        [attr.rx-id]=\"child.label\"\n        cdkDrag\n        [cdkDragData]=\"child\"\n      >\n        <ng-container [ngSwitch]=\"child.paletteItem.label\">\n          <ng-container *ngSwitchCase=\"'inner'\">\n            <div class=\"{{ child.paletteItem.shape }} border-{{ child.paletteItem.border }}\" [title]=\"child.label\">\n              <img\n                *ngIf=\"child.paletteItem.icon\"\n                class=\"icon-{{ child.paletteItem.icon.position }}\"\n                [src]=\"child.paletteItem.icon.path\"\n                [alt]=\"child.label\"\n              />\n\n              <div class=\"inner-label\">{{ child.label }}</div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"'outer'\">\n            <div class=\"{{ child.paletteItem.shape }}\" [title]=\"child.label\">\n              <div class=\"outer-icon border-{{ child.paletteItem.border }}\">\n                <img *ngIf=\"child.paletteItem.icon\" [src]=\"child.paletteItem.icon.path\" [alt]=\"child.label\" />\n              </div>\n\n              <div class=\"outer-label\">{{ child.label }}</div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <div class=\"{{ child.paletteItem.shape }}\" [title]=\"child.label\"></div>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n", styles: [".node-container{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:5px;grid-row-gap:8px;font-size:12px}.rectangle{display:flex;justify-content:center;align-items:center;position:relative;width:75px;height:65px;padding:0 5px;border-radius:5px;cursor:move}.circle{display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:move}.circle .outer-icon{display:flex;justify-content:center;align-items:center;align-self:center;width:50px;height:50px;border-radius:50%}.circle .outer-icon img{width:80%}.square{display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:10px;cursor:move}.square .outer-icon{display:flex;justify-content:center;align-items:center;width:40px;height:40px;margin-bottom:10px;transform:rotate(45deg)}.square .outer-icon img{width:80%;transform:rotate(-45deg)}.annotation{width:20px;height:55px;border-style:solid;border-width:3px;border-color:#666;border-right-style:none!important;cursor:move}.border-solid{border-style:solid;border-width:2px;border-color:#666}.border-bold{border-style:solid;border-width:4px;border-color:#666}.border-dashed{border-style:dashed;border-width:1px;border-color:#666}.border-double{border-style:double;border-width:5px;border-color:#666}.icon-top{position:absolute;left:1px;top:2px;width:12px}.icon-bottom{position:absolute;bottom:2px;left:50%;width:10px;border-style:solid;border-width:1px;transform:translate(-50%)}.inner-label{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-align:center}.outer-label{padding-top:5px;text-align:center}\n"], components: [{ type: i1__namespace$1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1__namespace$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace$3.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4__namespace$3.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i4__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgSwitchDefault, selector: "[ngSwitchDefault]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerPaletteComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-designer-palette',
                        templateUrl: './designer-palette.component.html',
                        styleUrls: ['./designer-palette.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], propDecorators: { tree: [{
                    type: i0.Input
                }], elementDropped: [{
                    type: i0.Output
                }] } });

    // TODO-VS: mode to shared folder after jointJS is updated
    var RxDesignerPaletteModule = /** @class */ (function () {
        function RxDesignerPaletteModule() {
        }
        return RxDesignerPaletteModule;
    }());
    RxDesignerPaletteModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerPaletteModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDesignerPaletteModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerPaletteModule, declarations: [RxDesignerPaletteComponent], imports: [i1$1.AdaptAccordionModule, i1$1.AdaptRxSearchModule, i4.CommonModule, i4$3.DragDropModule, i2.ReactiveFormsModule], exports: [RxDesignerPaletteComponent] });
    RxDesignerPaletteModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerPaletteModule, imports: [[i1$1.AdaptAccordionModule, i1$1.AdaptRxSearchModule, i4.CommonModule, i4$3.DragDropModule, i2.ReactiveFormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDesignerPaletteModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxDesignerPaletteComponent],
                        imports: [i1$1.AdaptAccordionModule, i1$1.AdaptRxSearchModule, i4.CommonModule, i4$3.DragDropModule, i2.ReactiveFormsModule],
                        exports: [RxDesignerPaletteComponent]
                    }]
            }] });

    var RxDynamicComponentRendererComponent = /** @class */ (function () {
        function RxDynamicComponentRendererComponent() {
        }
        RxDynamicComponentRendererComponent.prototype.ngOnInit = function () {
            var componentRef = this.container.createComponent(this.componentFactory);
            Object.assign(componentRef.instance, {
                context: this.context,
                options: this.options
            });
        };
        return RxDynamicComponentRendererComponent;
    }());
    RxDynamicComponentRendererComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDynamicComponentRendererComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxDynamicComponentRendererComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDynamicComponentRendererComponent, selector: "rx-dynamic-component-renderer", inputs: { componentFactory: "componentFactory", context: "context", options: "options" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], ngImport: i0__namespace, template: '<ng-container #container></ng-container>', isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDynamicComponentRendererComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-dynamic-component-renderer',
                        template: '<ng-container #container></ng-container>'
                    }]
            }], propDecorators: { componentFactory: [{
                    type: i0.Input
                }], context: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { static: true, read: i0.ViewContainerRef }]
                }] } });

    var RxDynamicComponentRendererModule = /** @class */ (function () {
        function RxDynamicComponentRendererModule() {
        }
        return RxDynamicComponentRendererModule;
    }());
    RxDynamicComponentRendererModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDynamicComponentRendererModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxDynamicComponentRendererModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDynamicComponentRendererModule, declarations: [RxDynamicComponentRendererComponent], imports: [i4.CommonModule], exports: [RxDynamicComponentRendererComponent] });
    RxDynamicComponentRendererModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDynamicComponentRendererModule, imports: [[i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDynamicComponentRendererModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule],
                        declarations: [RxDynamicComponentRendererComponent],
                        exports: [RxDynamicComponentRendererComponent],
                        entryComponents: [RxDynamicComponentRendererComponent]
                    }]
            }] });

    var RxErrorPageComponent = /** @class */ (function () {
        function RxErrorPageComponent(document, title, route, rxAuthService, rxGlobalCacheService, rxCurrentUserService, rxAngularApplicationService) {
            var _this = this;
            this.document = document;
            this.title = title;
            this.route = route;
            this.rxAuthService = rxAuthService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxAngularApplicationService = rxAngularApplicationService;
            this.showSignInLink = false;
            this.showApplications = false;
            this.applications$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(operators.switchMap(function (bundleDescriptors) {
                var applicationBundleDescriptors = lodash.filter(bundleDescriptors, { isApplication: true, isLicensed: true });
                lodash.remove(applicationBundleDescriptors, { id: i1$2.RX_APPLICATION.settingsBundleId });
                if (!_this.rxCurrentUserService.isAdministrator()) {
                    lodash.remove(applicationBundleDescriptors, { id: i1$2.RX_APPLICATION.dataloadBundleId });
                }
                if (!_this.rxCurrentUserService.isAdministrator() && !_this.rxCurrentUserService.isBusinessAnalyst()) {
                    lodash.remove(applicationBundleDescriptors, { id: i1$2.RX_APPLICATION.innovationStudioBundleId });
                }
                var applications = lodash.sortBy(applicationBundleDescriptors, function (bundleDescriptor) { return bundleDescriptor.friendlyName; }).map(function (app) { return _this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(operators.map(function (isAngularJsApplication) {
                    var url;
                    if (app.hasCustomEntryPoint && app.id !== i1$2.RX_APPLICATION.innovationStudioBundleId) {
                        url = "/" + app.id + "/index.html";
                    }
                    else if (isAngularJsApplication) {
                        url = "/innovationsuite/index.html#/" + app.id;
                    }
                    else {
                        url = "/helix/index.html#/" + app.id;
                    }
                    return {
                        id: app.id,
                        friendlyName: app.friendlyName,
                        url: url
                    };
                })); });
                return rxjs.forkJoin(applications);
            }), operators.tap(function () { return (_this.rxGlobalCacheService.applicationId = 'unknown-application'); }));
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.document.body.style.overflow = 'hidden';
        }
        RxErrorPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.route.data.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (data) {
                var _a;
                _this.data = Object.assign({}, data);
                _this.title.setTitle(_this.data.errorTitle);
                _this.showSignInLink = _this.data.showSignInLink;
                _this.showApplications = (_a = _this.data.showApplications) !== null && _a !== void 0 ? _a : false;
            });
        };
        RxErrorPageComponent.prototype.logout = function () {
            this.rxAuthService.logout().subscribe();
        };
        RxErrorPageComponent.prototype.ngOnDestroy = function () {
            this.document.body.style.removeProperty('overflow');
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        return RxErrorPageComponent;
    }());
    RxErrorPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorPageComponent, deps: [{ token: i4.DOCUMENT }, { token: i2__namespace$2.Title }, { token: i1__namespace$4.ActivatedRoute }, { token: i1__namespace$2.RxAuthService }, { token: i1__namespace$2.RxGlobalCacheService }, { token: i1__namespace$2.RxCurrentUserService }, { token: i1__namespace$2.RxAngularApplicationService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxErrorPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxErrorPageComponent, selector: "rx-error-page", ngImport: i0__namespace, template: "<div class=\"error-wrapper\">\n  <ng-container *ngIf=\"!showApplications\">\n    <h2>{{ this.data.errorTitle }}</h2>\n    <div [innerHTML]=\"this.data.errorMessage\"></div>\n  </ng-container>\n\n  <div *ngIf=\"showApplications\">\n    <h3>\n      The page you are trying to reach does not exist. Please open one of the applications below and bookmark it for\n      future reference.\n    </h3>\n\n    <ul>\n      <li *ngFor=\"let app of applications$ | async\">\n        <a [href]=\"app.url\">{{ app.friendlyName }}</a>\n      </li>\n    </ul>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.error-wrapper{color:#7c7f81;padding:20px;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;font-size:.8125rem}.error-wrapper h2{font-size:var(--h2-font-size);line-height:1.5rem;margin:20px 0 12px;font-weight:normal}.error-wrapper p{margin-top:0;margin-bottom:.625rem}a{color:#00a79d;text-decoration:none;background-color:transparent}\n"], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-error-page',
                        templateUrl: './error-page.component.html',
                        styleUrls: ['error-page.component.scss']
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i4.DOCUMENT]
                        }] }, { type: i2__namespace$2.Title }, { type: i1__namespace$4.ActivatedRoute }, { type: i1__namespace$2.RxAuthService }, { type: i1__namespace$2.RxGlobalCacheService }, { type: i1__namespace$2.RxCurrentUserService }, { type: i1__namespace$2.RxAngularApplicationService }];
        } });

    var RxErrorPageModule = /** @class */ (function () {
        function RxErrorPageModule() {
        }
        return RxErrorPageModule;
    }());
    RxErrorPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxErrorPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorPageModule, declarations: [RxErrorPageComponent], imports: [i4.CommonModule], exports: [RxErrorPageComponent] });
    RxErrorPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorPageModule, imports: [[i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxErrorPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxErrorPageComponent],
                        imports: [i4.CommonModule],
                        exports: [RxErrorPageComponent]
                    }]
            }] });

    var RX_EXPRESSION_EDITOR = {
        events: {
            openExpressionEditor: 'rx-open-expression-editor'
        }
    };

    var RX_DATA_DICTIONARY_ITEM_PLUGIN = {
        name: 'rx-data-dictionary-item',
        widgetAttributeName: 'rx-expression'
    };

    var narrowOperatorButtons = new Set([
        i1$2.ExpressionOperator.LeftGrouping,
        i1$2.ExpressionOperator.RightGrouping,
        i1$2.ExpressionOperator.DoubleQuote,
        i1$2.ExpressionOperator.Add,
        i1$2.ExpressionOperator.Subtract,
        i1$2.ExpressionOperator.Multiply,
        i1$2.ExpressionOperator.Divide,
        i1$2.ExpressionOperator.Remainder,
        i1$2.ExpressionOperator.GreaterThan,
        i1$2.ExpressionOperator.LessThan,
        i1$2.ExpressionOperator.Equal,
        i1$2.ExpressionOperator.NotEqual,
        i1$2.ExpressionOperator.GreaterThanOrEqual,
        i1$2.ExpressionOperator.LessThanOrEqual
    ]);
    var RichExpressionEditorComponent = /** @class */ (function () {
        function RichExpressionEditorComponent(injector, document, rxTreeService, rxExpressionParserService, rxObjectUtilsService, rxDataDictionaryUtils, rxThemingService) {
            this.injector = injector;
            this.document = document;
            this.rxTreeService = rxTreeService;
            this.rxExpressionParserService = rxExpressionParserService;
            this.rxObjectUtilsService = rxObjectUtilsService;
            this.rxDataDictionaryUtils = rxDataDictionaryUtils;
            this.rxThemingService = rxThemingService;
            this.type = "inline" /* INLINE */;
            this.ckConfig = {
                startupFocus: true,
                allowedContent: true,
                extraPlugins: RX_DATA_DICTIONARY_ITEM_PLUGIN.name,
                toolbar: [],
                skin: 'expression-editor',
                title: false,
                entities: false
            };
            this.operatorRows = [];
            this.class = 'd-flex flex-column h-100 border';
            this.operatorsByGroup = { custom: [], platform: [] };
            this.isCkEditorInstanceReady = false;
            this.menuItems = {};
            // Keep operators in descending order by length to find compound operator for autocomplete launch.
            this.autocompleteTriggers = [
                i1$2.ExpressionOperator.NotEqual,
                i1$2.ExpressionOperator.GreaterThanOrEqual,
                i1$2.ExpressionOperator.LessThanOrEqual,
                i1$2.ExpressionOperator.LessThan,
                i1$2.ExpressionOperator.GreaterThan,
                i1$2.ExpressionOperator.Equal
            ];
        }
        RichExpressionEditorComponent.prototype.ngOnInit = function () {
            this.control = this.injector.get(i2.NgControl).control;
        };
        RichExpressionEditorComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes.dataDictionary) {
                this.dataDictionaryExpressionsMap = lodash.flow(function (dataDictionary) { return _this.rxDataDictionaryUtils.addTooltips(dataDictionary); }, function (dataDictionary) { return _this.rxTreeService.flatten({
                    children: dataDictionary
                }); }, function (dataDictionary) { return lodash.reduce(dataDictionary, function (dictionary, node) {
                    if (lodash.isArray(node.expression)) {
                        node.expression.forEach(function (expressionItem) {
                            dictionary.push(Object.assign(Object.assign({}, node), { expression: expressionItem }));
                        });
                    }
                    else {
                        dictionary.push(node);
                    }
                    return dictionary;
                }, []); }, function (dataDictionary) { return _this.rxObjectUtilsService.mapFromArray(dataDictionary, 'expression'); })(this.dataDictionary);
            }
        };
        RichExpressionEditorComponent.prototype.writeValue = function (value) {
            if (value) {
                // encode all HTML tags to avoid their rendering by CKEDITOR, i.e.
                // html entered by user should be rendered as plain text
                // For example, <b>STRING</b> should be displayed in the editor exactly the same, as <b>STRING</b>
                value = CKEDITOR.tools.htmlEncode(value);
                value = this.normalizeExpression(value);
            }
            else {
                value = null;
            }
            // Ckeditor instance is not ready on first "writeValue" call.
            if (this.isCkEditorInstanceReady) {
                this.ckComponent.instance.setData(value);
            }
            else {
                this.initialValue = value;
            }
        };
        RichExpressionEditorComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        RichExpressionEditorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        RichExpressionEditorComponent.prototype.onCkEditorInstanceReady = function (event) {
            var _this = this;
            this.isCkEditorInstanceReady = true;
            // Even if toolbar doesn't have any items, outer container is displayed and needs to be hidden.
            this.document.getElementById(event.editor.id + "_top").style.display = 'none';
            this.ckComponent.instance.on('change', function () {
                var value = lodash.trim(_this.ckComponent.instance.getData());
                if (_this.control.value !== value && !_this.ckComponent.instance.gettingCursorPosition) {
                    _this.onChange(value);
                    if (value) {
                        var _a = _this.getCursor(), position = _a.position, x = _a.x, y = _a.y;
                        var expressionBeforeCursor_1 = value.substr(0, position);
                        var autocompleteTrigger = _this.autocompleteTriggers.find(function (trigger) { return lodash.endsWith(expressionBeforeCursor_1, trigger); });
                        if (autocompleteTrigger) {
                            // Remove autocomplete trigger from expression, e.g '${foo} >=' -> '${foo} '.
                            var expressionToParse = expressionBeforeCursor_1.slice(0, -autocompleteTrigger.length);
                            var node = _this.dataDictionaryExpressionsMap.get(_this.getLastExpressionFragment(expressionToParse));
                            if (node === null || node === void 0 ? void 0 : node.autocompleteOptions) {
                                _this.launchAutocomplete(node.autocompleteOptions, x, y);
                            }
                        }
                    }
                }
            });
            this.ckComponent.instance.on('getData', function (evt) {
                evt.data.dataValue = evt.data.dataValue.replace(/<p>|<span>|<\/p>|<\/span>|<br \/>/g, '');
                evt.data.dataValue = CKEDITOR.tools.htmlDecode(evt.data.dataValue);
                // convert 160 and 8203 charCode space to 32 which supported by server
                evt.data.dataValue = evt.data.dataValue.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
                evt.data.dataValue = evt.data.dataValue.replace(new RegExp(String.fromCharCode(8203), 'g'), ' ');
            }, null, null, 15);
            this.ckComponent.instance.on('key', function (evt) {
                if (evt.data.keyCode === 13) {
                    // Enter key
                    evt.cancel();
                }
            });
            this.ckComponent.instance.on('paste', function (evt) {
                if (evt.data.method === 'drop') {
                    var value = evt.data.dataTransfer.getData('value');
                    if (value) {
                        evt.data.dataValue = value;
                    }
                }
                if (evt.data.type === 'html') {
                    var container = new CKEDITOR.dom.element('div');
                    container.appendHtml(evt.data.dataValue);
                    // When selected range with widget is copied to clipboard, start node of bookmark remains unremoved there
                    var elementToRemove = container.findOne('[id*="cke_bm_"]');
                    if (elementToRemove) {
                        if (CKEDITOR.env.gecko && container.getChildCount() > 1) {
                            elementToRemove = elementToRemove.getParent();
                        }
                        elementToRemove.remove();
                        evt.data.dataValue = container.getHtml();
                    }
                    container.remove();
                }
            });
            this.ckComponent.instance.on('toHtml', function (evt) {
                // Check if data value has already been converted to html,
                // e.g. while dragging a pill from one position to another withing the expression
                // there is no need to convert it to HTML again
                if (!lodash.includes(evt.data.dataValue, 'rx-id="rx-data-dictionary-item"')) {
                    evt.data.dataValue = _this.rxExpressionParserService.parse(evt.data.dataValue, _this.transformToTag.bind(_this));
                }
                if (lodash.endsWith(evt.data.dataValue, '</span>')) {
                    evt.data.dataValue += '<span>&nbsp;</span>';
                }
            }, null, null, 4);
            // Set initial value when "toHtml" listener is already added.
            this.ckComponent.instance.setData(this.initialValue);
            this.ckComponent.instance.contextMenu.addListener(function () { return _this.menuItems; });
            this.ckComponent.instance.contextMenu.onHide = function () {
                _this.iFrameContentWindow.removeEventListener('keydown', _this.keydownHandler);
                _this.menuItems = {};
            };
            this.control.statusChanges
                .pipe(operators.map(function () { return _this.control.disabled; }), operators.startWith(this.control.disabled), operators.distinctUntilChanged())
                .subscribe(function (disabled) {
                _this.ckComponent.instance.setReadOnly(disabled);
            });
            delete this.ckComponent.instance._.menuItems.paste;
            delete this.ckComponent.instance._.menuItems.cut;
            delete this.ckComponent.instance._.menuItems.copy;
        };
        RichExpressionEditorComponent.prototype.insertHtml = function (html) {
            this.ckComponent.instance.insertHtml(html);
        };
        RichExpressionEditorComponent.prototype.isNarrowOperator = function (operator) {
            return narrowOperatorButtons.has(operator);
        };
        RichExpressionEditorComponent.prototype.addOperator = function (value) {
            if (value !== i1$2.ExpressionOperator.DoubleQuote && !lodash.startsWith(value, '$')) {
                value += '&nbsp;';
            }
            this.insertHtml(value);
        };
        RichExpressionEditorComponent.prototype.launchAutocomplete = function (options, x, y) {
            var _this = this;
            CKEDITOR.skin.loadPart('rx-suggestions', lodash.noop);
            var group = 'suggestions';
            this.ckComponent.instance.addMenuGroup(group);
            options.forEach(function (option, index) {
                var suggestionBoxItem = 'suggestionBox suggestionBoxItem' + index;
                _this.menuItems[suggestionBoxItem] = CKEDITOR.TRISTATE_OFF;
                _this.ckComponent.instance.addMenuItem(suggestionBoxItem, {
                    label: option.label,
                    group: group,
                    onClick: function () {
                        _this.ckComponent.instance.focus();
                        _this.ckComponent.instance.insertHtml(option.expression);
                    }
                });
            });
            this.ckComponent.instance.contextMenu.show(this.ckComponent.instance.document.getBody(), null, x, y);
            var menuPanel = this.ckComponent.instance.contextMenu._.panel;
            menuPanel.element.addClass('rx-suggestions-panel');
            this.iFrameContentWindow = menuPanel._.iframe.$.contentWindow;
            this.iFrameContentWindow.document.documentElement.classList.add('rx-suggestions-panel_container');
            this.rxThemingService.copyCssVariables(i1$2.RX_THEMING.cssVariablesForCkEditor, this.iFrameContentWindow.document);
            this.iFrameContentWindow.addEventListener('keydown', this.keydownHandler);
        };
        RichExpressionEditorComponent.prototype.transformToTag = function (token, expression) {
            var tag = expression;
            if ([
                i1$2.ExpressionParserToken.ArExpression,
                i1$2.ExpressionParserToken.RxExpression,
                i1$2.ExpressionParserToken.SingleQuoteRxExpression,
                i1$2.ExpressionParserToken.SingleQuoteTextExpression
            ].includes(token)) {
                var node = this.dataDictionaryExpressionsMap.get(expression);
                if (node) {
                    tag = [
                        "<span class=\"expression-node\" rx-id=\"rx-data-dictionary-item\" " + RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName + "=\"" + expression + "\" title=\"" + node.tooltip + "\">",
                        "<span class=\"expression-node-icon " + (node.icon || 'd-icon-arrow_right_square_input') + "\">&nbsp;</span>",
                        "<span class=\"expression-node-label\">" + node.label + "</span>",
                        '</span>'
                    ].join('');
                }
            }
            return tag;
        };
        RichExpressionEditorComponent.prototype.normalizeExpression = function (expression) {
            return this.rxExpressionParserService.parse(expression, function (token, expressionFragment) {
                if (token === i1$2.ExpressionParserToken.RxStringExpression) {
                    // since multiple \x20 spaces get collapsed to a single space in HTML. we have to convert them to
                    // non-breaking spaces (&nbsp;) in order to preserve them in expression's literals
                    return expressionFragment.replace(/ /g, '&nbsp;');
                }
                else if (token === i1$2.ExpressionParserToken.ArExpression) {
                    return expressionFragment.replace('\\', '');
                }
                else {
                    return expressionFragment;
                }
            });
        };
        // parse and get last expression, e.g.
        // '${foo} + ${bar}' -> '${bar}'
        // '${foo} + ${bar}  ' -> '${bar}'
        // '${foo} + "bar"' -> undefined
        RichExpressionEditorComponent.prototype.getLastExpressionFragment = function (expression) {
            var expressionMap = new Map();
            var lastExpressionFragment = lodash.last(this.rxExpressionParserService
                .parse(expression, function (token, expressionFragment) {
                if (token !== i1$2.ExpressionParserToken.RxStringExpression) {
                    var node = "$$rx-" + lodash.uniqueId() + "-rx$$";
                    expressionMap.set(node, expressionFragment);
                    expressionFragment = node;
                }
                return expressionFragment;
            })
                .split(/(\$\$rx-[\d]+-rx\$\$)/g)
                .filter(function (element) { return !lodash.isEmpty(element) && !/^((\$\$rx-)|(-rx\$\$)|([\s]+))$/.test(element); }));
            return expressionMap.get(lastExpressionFragment);
        };
        // prevent navigation to the previous page in Edge and Firefox when the user presses the Backspace key
        RichExpressionEditorComponent.prototype.keydownHandler = function (event) {
            if (event.code === 'Backspace') {
                event.preventDefault();
            }
        };
        // Insert a dummy element into current position of caret
        // in order to get coordinates of caret and expression fragment before the caret
        // https://ckeditor.com/old/comment/65868#comment-65868
        RichExpressionEditorComponent.prototype.getCursor = function () {
            this.ckComponent.instance.gettingCursorPosition = true;
            var dummyElement = this.ckComponent.instance.document.createElement('span');
            var range = this.ckComponent.instance.getSelection().getRanges()[0];
            range.trim(false, true);
            var startContainer = range.startContainer;
            var nextNode = startContainer.getChild(range.startOffset);
            if (nextNode) {
                dummyElement.insertBefore(nextNode);
            }
            else {
                startContainer.append(dummyElement);
            }
            var x = 0;
            var y = 0;
            var nodeElement = dummyElement.$;
            while (nodeElement.offsetParent) {
                x += nodeElement.offsetLeft;
                y += nodeElement.offsetTop;
                nodeElement = nodeElement.offsetParent;
            }
            x += nodeElement.offsetLeft;
            y += nodeElement.offsetTop;
            y += 30;
            dummyElement.setText(this.ckComponent.instance.id);
            var position = this.ckComponent.instance.getData().indexOf(this.ckComponent.instance.id);
            dummyElement.remove();
            this.ckComponent.instance.gettingCursorPosition = false;
            return {
                x: x,
                y: y,
                position: position
            };
        };
        return RichExpressionEditorComponent;
    }());
    RichExpressionEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RichExpressionEditorComponent, deps: [{ token: i0__namespace.Injector }, { token: i4.DOCUMENT }, { token: i1__namespace$3.RxTreeService }, { token: i1__namespace$2.RxExpressionParserService }, { token: i1__namespace$3.RxObjectUtilsService }, { token: i1__namespace$2.RxDataDictionaryUtils }, { token: i1__namespace$2.RxThemingService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RichExpressionEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichExpressionEditorComponent, selector: "rx-rich-expression-editor", inputs: { dataDictionary: "dataDictionary", operatorRows: "operatorRows" }, host: { properties: { "class": "this.class" } }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RichExpressionEditorComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "ckComponent", first: true, predicate: i3$2.CKEditorComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ckeditor\n  class=\"flex-grow-1 position-relative form-control border\"\n  [config]=\"ckConfig\"\n  [type]=\"type\"\n  (ready)=\"onCkEditorInstanceReady($event)\"\n  [ngClass]=\"{ 'invalid-expression-border': control.invalid }\"\n></ckeditor>\n\n<adapt-rx-feedback [errors]=\"control.errors\"></adapt-rx-feedback>\n\n<div class=\"border-top bg-gray-200 pt-3 pb-1 px-2\" *ngIf=\"control.enabled\">\n  <div class=\"d-flex flex-wrap justify-content-center\" *ngFor=\"let row of operatorRows\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      class=\"mx-1 mb-2 bg-white\"\n      [ngClass]=\"isNarrowOperator(operator.value) ? 'narrow-operator' : 'wide-operator'\"\n      (click)=\"addOperator(operator.value)\"\n      [adaptPopover]=\"operator.tooltip ? tooltipContent : null\"\n      [popoverTitle]=\"operator.tooltip?.title\"\n      triggers=\"mouseover:mouseout\"\n      placement=\"auto\"\n      *ngFor=\"let operator of row\"\n    >\n      {{ operator.displayValue }}\n\n      <ng-template #tooltipContent>\n        <span [innerHtml]=\"operator?.tooltip?.content\"></span>\n      </ng-template>\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep ckeditor{border-color:transparent!important}:host::ng-deep ckeditor>div{padding:20px;overflow-y:auto;outline:0;position:absolute;top:0;bottom:0;left:0;right:0}:host::ng-deep ckeditor>textarea{display:none}:host::ng-deep .expression-node{margin-bottom:.25rem}.wide-operator{min-width:6.5rem}.narrow-operator{width:3rem}.invalid-expression-border{border-color:#f83200!important}\n"], components: [{ type: i3__namespace$2.CKEditorComponent, selector: "ckeditor", inputs: ["tagName", "type", "editorUrl", "data", "readOnly", "config"], outputs: ["ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }, { type: i1__namespace$1.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RichExpressionEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-rich-expression-editor',
                        templateUrl: 'rich-expression-editor.component.html',
                        styleUrls: ['rich-expression-editor.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RichExpressionEditorComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.Injector }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i4.DOCUMENT]
                        }] }, { type: i1__namespace$3.RxTreeService }, { type: i1__namespace$2.RxExpressionParserService }, { type: i1__namespace$3.RxObjectUtilsService }, { type: i1__namespace$2.RxDataDictionaryUtils }, { type: i1__namespace$2.RxThemingService }];
        }, propDecorators: { dataDictionary: [{
                    type: i0.Input
                }], operatorRows: [{
                    type: i0.Input
                }], ckComponent: [{
                    type: i0.ViewChild,
                    args: [i3$2.CKEditorComponent, { static: true }]
                }], class: [{
                    type: i0.HostBinding,
                    args: ['class']
                }] } });

    var DataDictionaryNodeComponent = /** @class */ (function () {
        function DataDictionaryNodeComponent() {
            this.expressionNodeSelected = new i0.EventEmitter();
        }
        return DataDictionaryNodeComponent;
    }());
    DataDictionaryNodeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataDictionaryNodeComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataDictionaryNodeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataDictionaryNodeComponent, selector: "rx-data-dictionary-node", inputs: { node: "node", filterQuery: "filterQuery" }, outputs: { expressionNodeSelected: "expressionNodeSelected" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"!node.data.expression; else expressionNode\">\n  <adapt-highlight class=\"p-1\" [title]=\"node.label\" [result]=\"node.label\" [term]=\"filterQuery\">></adapt-highlight>\n</ng-container>\n\n<ng-template #expressionNode>\n  <div class=\"d-flex\" rx-id=\"node\">\n    <button\n      type=\"button\"\n      (click)=\"expressionNodeSelected.emit(node)\"\n      class=\"expression-node-button btn btn-link d-icon-plus_circle py-1 px-2\"\n    ></button>\n\n    <span class=\"expression-node\" [draggable]=\"true\" [attr.rx-expression]=\"node.data.expression\">\n      <span [ngClass]=\"node.data.icon || 'd-icon-arrow_right_square_input'\" class=\"expression-node-icon\"></span>\n\n      <adapt-highlight class=\"expression-node-label\" [title]=\"node.label\" [result]=\"node.label\" [term]=\"filterQuery\"\n        >></adapt-highlight\n      >\n    </span>\n\n    <i\n      *ngIf=\"node.data.info?.type === 'function'\"\n      class=\"py-1 px-2 d-icon-question_circle_o\"\n      [adaptPopover]=\"functionInfo\"\n      [popoverTitle]=\"node.data.info.data.signature\"\n      [autoClose]=\"'outside'\"\n      [maxWidth]=\"'350'\"\n    >\n      <ng-template #functionInfo>\n        <p>{{ node.data.info.data.description }}</p>\n\n        <table *ngIf=\"node.data.info.data.parameters?.length\">\n          <tr>\n            <th class=\"pr-4\">Parameter</th>\n            <th>Description</th>\n          </tr>\n\n          <tr class=\"mt-1\" *ngFor=\"let parameter of node.data.info.data.parameters\">\n            <td class=\"align-top\">{{ $any(parameter).name }}</td>\n            <td class=\"align-top\">{{ $any(parameter).description }}</td>\n          </tr>\n        </table>\n      </ng-template>\n    </i>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.expression-node{cursor:move}.expression-node-button{color:#4e5255}\n"], components: [{ type: i1__namespace$1.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataDictionaryNodeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-data-dictionary-node',
                        templateUrl: './data-dictionary-node.component.html',
                        styleUrls: ['./data-dictionary-node.component.scss']
                    }]
            }], propDecorators: { node: [{
                    type: i0.Input
                }], filterQuery: [{
                    type: i0.Input
                }], expressionNodeSelected: [{
                    type: i0.Output
                }] } });

    var DataDictionaryComponent = /** @class */ (function () {
        function DataDictionaryComponent() {
            this.nodeSelected = new i0.EventEmitter();
            this.dragStart = new i0.EventEmitter();
        }
        DataDictionaryComponent.prototype.onDragStart = function (event) {
            var value = event.target.getAttribute('rx-expression');
            if (value) {
                event.dataTransfer.setData('value', value);
            }
            else {
                event.preventDefault();
            }
        };
        DataDictionaryComponent.prototype.ngOnChanges = function (changes) {
            if (changes.dataDictionary) {
                this.tree = this.prepareTreeForAdapt(this.dataDictionary);
            }
        };
        DataDictionaryComponent.prototype.onNodeExpand = function (e) { };
        DataDictionaryComponent.prototype.onNodeSelected = function (node) {
            this.nodeSelected.next(node);
        };
        DataDictionaryComponent.prototype.prepareTreeForAdapt = function (dataDictionary) {
            var _this = this;
            return lodash.flow(function (dictionary) { return lodash.map(dictionary, function (element) {
                var _a;
                return !element.hidden && (element.expression || ((_a = element.children) === null || _a === void 0 ? void 0 : _a.length))
                    ? {
                        label: element.label,
                        children: _this.prepareTreeForAdapt(element.children),
                        expanded: element.expanded,
                        data: {
                            expression: lodash.isArray(element.expression) ? element.expression[0] : element.expression,
                            icon: element.icon,
                            info: element.info
                        },
                        key: lodash.uniqueId(),
                        draggable: Boolean(element.expression)
                    }
                    : null;
            }); }, function (dictionary) { return lodash.compact(dictionary); })(dataDictionary);
        };
        return DataDictionaryComponent;
    }());
    DataDictionaryComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataDictionaryComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataDictionaryComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataDictionaryComponent, selector: "rx-data-dictionary", inputs: { dataDictionary: "dataDictionary" }, outputs: { nodeSelected: "nodeSelected", dragStart: "dragStart" }, host: { listeners: { "dragstart": "onDragStart($event)" } }, usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-tree #treeComponent [value]=\"tree\" filter=\"true\" (onNodeExpand)=\"onNodeExpand($event)\" [draggableNodes]=\"true\">\n  <ng-template let-node adaptTreeNodeTemplate>\n    <rx-data-dictionary-node\n      [filterQuery]=\"treeComponent.filterQuery\"\n      [node]=\"node\"\n      (expressionNodeSelected)=\"onNodeSelected($event)\"\n    ></rx-data-dictionary-node>\n  </ng-template>\n</adapt-tree>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep .a-tree__content{align-items:center;cursor:default}:host::ng-deep .a-tree__label:hover{color:inherit}:host::ng-deep .a-tree__toggle{cursor:pointer}\n"], components: [{ type: i1__namespace$1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: DataDictionaryNodeComponent, selector: "rx-data-dictionary-node", inputs: ["node", "filterQuery"], outputs: ["expressionNodeSelected"] }], directives: [{ type: i1__namespace$1.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataDictionaryComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-data-dictionary',
                        templateUrl: './data-dictionary.component.html',
                        styleUrls: ['./data-dictionary.component.scss']
                    }]
            }], propDecorators: { dataDictionary: [{
                    type: i0.Input
                }], nodeSelected: [{
                    type: i0.Output
                }], dragStart: [{
                    type: i0.Output
                }], onDragStart: [{
                    type: i0.HostListener,
                    args: ['dragstart', ['$event']]
                }] } });

    var ExpressionEditorComponent = /** @class */ (function (_super) {
        __extends(ExpressionEditorComponent, _super);
        function ExpressionEditorComponent(activeModalRef, translateService, rxExpressionParserService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.translateService = translateService;
            _this.rxExpressionParserService = rxExpressionParserService;
            _this.injector = injector;
            _this.isPropertyContextReady = false;
            _this.config = _this.activeModalRef.getData();
            _this.expressionConfigurator = _this.config.expressionConfigurator;
            _this.availableExpressionProperties = [];
            _this.invalidExpressionMessage = _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.invalid-expression.message');
            return _this;
        }
        Object.defineProperty(ExpressionEditorComponent.prototype, "expression", {
            get: function () {
                return this.currentProperty && this.currentProperty.value;
            },
            set: function (value) {
                if (this.currentProperty) {
                    this.currentProperty.value = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExpressionEditorComponent.prototype, "isReadOnly", {
            get: function () {
                return this.config.isReadOnly;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExpressionEditorComponent.prototype, "isNavigationEnabled", {
            get: function () {
                return this.isPropertyContextReady && (this.hasPreviousProperty() || this.hasNextProperty());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExpressionEditorComponent.prototype, "isPreviousButtonDisabled", {
            get: function () {
                return !this.isPropertyContextReady || this.richExpressionEditorControl.invalid || !this.hasPreviousProperty();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExpressionEditorComponent.prototype, "isNextButtonDisabled", {
            get: function () {
                return !this.isPropertyContextReady || this.richExpressionEditorControl.invalid || !this.hasNextProperty();
            },
            enumerable: false,
            configurable: true
        });
        ExpressionEditorComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.initialize(this.config.property).subscribe();
        };
        ExpressionEditorComponent.prototype.onSave = function () {
            var _this = this;
            this.writeValue().subscribe({
                complete: function () {
                    _this.activeModalRef.close();
                }
            });
        };
        ExpressionEditorComponent.prototype.onNodeSelected = function (node) {
            this.richExpressionEditor.insertHtml(node.data.expression);
        };
        ExpressionEditorComponent.prototype.navigateToNextProperty = function () {
            this.navigateToProperty(this.getCurrentPropertyIndex() + 1);
        };
        ExpressionEditorComponent.prototype.navigateToPreviousProperty = function () {
            this.navigateToProperty(this.getCurrentPropertyIndex() - 1);
        };
        ExpressionEditorComponent.prototype.cancelModal = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ExpressionEditorComponent.prototype.isDirty = function () {
            return this.richExpressionEditorControl.dirty;
        };
        ExpressionEditorComponent.prototype.navigateToProperty = function (index) {
            var _this = this;
            this.isPropertyContextReady = false;
            rxjs.concat(this.writeValue(), 
            // getPropertyByIndex must be called when writeValue observable will be
            // completed to make sure availableExpressionProperties are up to date.
            rxjs.of(index).pipe(operators.concatMap(function (i) { return _this.initialize(_this.getPropertyByIndex(i)); })))
                .pipe(operators.finalize(function () {
                _this.isPropertyContextReady = true;
                _this.richExpressionEditorControl.control.markAsPristine();
            }))
                .subscribe();
        };
        ExpressionEditorComponent.prototype.initialize = function (property) {
            var _this = this;
            return rxjs.concat(this.updateAvailableExpressionProperties(), this.expressionConfigurator.getDataDictionary(property.path).pipe(operators.tap(function (dataDictionary) {
                _this.currentProperty = property;
                _this.operatorRows = _this.expressionConfigurator.getOperatorRows(property.path);
                _this.dataDictionary = dataDictionary;
                _this.legend = lodash.sortBy(_this.config.legend, 'label');
                _this.isPropertyContextReady = true;
            }), operators.take(1), operators.switchMapTo(rxjs.EMPTY)));
        };
        ExpressionEditorComponent.prototype.writeValue = function () {
            var _this = this;
            return this.expressionConfigurator.validateProperty(this.currentProperty.path, this.currentProperty.value).pipe(operators.tap(function (isValid) {
                if (isValid) {
                    _this.config.api.writeValue(_this.currentProperty.path, _this.rxExpressionParserService.stripSpaces(_this.currentProperty.value));
                }
                else {
                    _this.richExpressionEditorControl.control.setErrors({
                        invalidExpression: {
                            message: _this.invalidExpressionMessage
                        }
                    });
                }
            }), operators.switchMap(function (isValid) { return (isValid ? rxjs.EMPTY : rxjs.throwError(new i1$3.RxError())); }));
        };
        ExpressionEditorComponent.prototype.updateAvailableExpressionProperties = function () {
            var _this = this;
            return this.config.expressionPropertyNavigator
                ? this.config.expressionPropertyNavigator.getProperties().pipe(operators.take(1), operators.tap(function (properties) {
                    _this.availableExpressionProperties = properties;
                }), operators.switchMapTo(rxjs.EMPTY))
                : rxjs.EMPTY;
        };
        ExpressionEditorComponent.prototype.hasPreviousProperty = function () {
            var currentIndex = this.getCurrentPropertyIndex();
            return currentIndex > 0;
        };
        ExpressionEditorComponent.prototype.hasNextProperty = function () {
            var currentIndex = this.getCurrentPropertyIndex();
            return currentIndex !== this.availableExpressionProperties.length - 1 && currentIndex !== -1;
        };
        ExpressionEditorComponent.prototype.getCurrentPropertyIndex = function () {
            return lodash.findIndex(this.availableExpressionProperties, { path: this.currentProperty.path });
        };
        ExpressionEditorComponent.prototype.getPropertyByIndex = function (propertyIndex) {
            return this.availableExpressionProperties[propertyIndex];
        };
        return ExpressionEditorComponent;
    }(i1.RxModalClass));
    ExpressionEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionEditorComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$2.RxExpressionParserService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ExpressionEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionEditorComponent, selector: "rx-expression-editor", viewQueries: [{ propertyName: "richExpressionEditor", first: true, predicate: RichExpressionEditorComponent, descendants: true, static: true }, { propertyName: "richExpressionEditorControl", first: true, predicate: RichExpressionEditorComponent, descendants: true, read: i2.NgModel, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body row\">\n  <div class=\"d-flex flex-column h-100\" [ngClass]=\"isReadOnly ? 'col' : 'col-6'\">\n    <div class=\"d-flex align-items-center\">\n      <ng-container *ngIf=\"isNavigationEnabled\">\n        <button\n          type=\"button\"\n          class=\"d-icon-angle_left mr-1\"\n          adapt-button\n          btn-type=\"secondary\"\n          size=\"small\"\n          (click)=\"navigateToPreviousProperty()\"\n          [disabled]=\"isPreviousButtonDisabled\"\n          rx-id=\"previous-button\"\n        ></button>\n\n        <button\n          type=\"button\"\n          class=\"d-icon-angle_right mr-2\"\n          adapt-button\n          btn-type=\"secondary\"\n          size=\"small\"\n          (click)=\"navigateToNextProperty()\"\n          [disabled]=\"isNextButtonDisabled\"\n          rx-id=\"next-button\"\n        ></button>\n      </ng-container>\n\n      <h5 class=\"m-0 text-truncate\">\n        {{\n          'com.bmc.arsys.rx.client.expression-editor.expression-for-property.label'\n            | translate: { propertyName: currentProperty?.label || (currentProperty?.path | titlecase) }\n        }}\n      </h5>\n    </div>\n\n    <div class=\"flex flex-grow-1 h-100 mt-2\">\n      <rx-rich-expression-editor\n        class=\"flex-grow-1 h-100\"\n        [dataDictionary]=\"dataDictionary\"\n        [(ngModel)]=\"expression\"\n        [operatorRows]=\"operatorRows\"\n        [disabled]=\"isReadOnly\"\n      ></rx-rich-expression-editor>\n    </div>\n  </div>\n\n  <div class=\"col-6 d-flex flex-column h-100 pr-0\" *ngIf=\"!isReadOnly\">\n    <ng-template #legendContentTemplate>\n      <div class=\"text-left p-2\">\n        <div *ngFor=\"let item of legend; let last = last\" [class.pb-2]=\"!last\">\n          <span class=\"legend-item-icon px-2 py-1\" [ngClass]=\"item.icon\"></span>\n          <span class=\"ml-2\">{{ item.label }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <h5 class=\"mt-0\">\n      {{ 'com.bmc.arsys.rx.client.expression-editor.available-values.label' | translate }}\n      <adapt-icon\n        name=\"info_circle_o_adapt\"\n        [adaptTooltip]=\"legendContentTemplate\"\n        width=\"260\"\n        placement=\"bottom\"\n      ></adapt-icon>\n    </h5>\n\n    <div class=\"data-dictionary-container flex-grow-1\">\n      <rx-data-dictionary\n        [dataDictionary]=\"dataDictionary\"\n        (nodeSelected)=\"onNodeSelected($event)\"\n      ></rx-data-dictionary>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    (click)=\"onSave()\"\n    [disabled]=\"richExpressionEditorControl.invalid || richExpressionEditorControl.pristine\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.ok.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"cancelModal()\" rx-id=\"cancel-button\">\n    {{\n      (isReadOnly ? 'com.bmc.arsys.rx.client.common.close.label' : 'com.bmc.arsys.rx.client.common.cancel.label')\n        | translate\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:706px}.modal-body{min-height:calc(100% - 61px)!important;height:calc(100% - 61px)}.data-dictionary-container{overflow-y:auto;padding-right:15px}:host::ng-deep .expression-node{display:flex;border:0;overflow:hidden;border-radius:.125rem}:host::ng-deep .expression-node-icon{color:#fff;background-color:#3cb6ce;padding:.25rem .5rem}:host::ng-deep .expression-node-label{background-color:#d6d7d8;padding:.25rem .5rem}.legend-item-icon{display:inline-block;background:#00a79d;border-radius:var(--border-radius) 0 0 var(--border-radius);width:1.75rem;text-align:center}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: RichExpressionEditorComponent, selector: "rx-rich-expression-editor", inputs: ["dataDictionary", "operatorRows"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: DataDictionaryComponent, selector: "rx-data-dictionary", inputs: ["dataDictionary"], outputs: ["nodeSelected", "dragStart"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace$1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "titlecase": i4__namespace.TitleCasePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-expression-editor',
                        templateUrl: './expression-editor.component.html',
                        styleUrls: ['./expression-editor.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$2.RxExpressionParserService }, { type: i0__namespace.Injector }]; }, propDecorators: { richExpressionEditor: [{
                    type: i0.ViewChild,
                    args: [RichExpressionEditorComponent, { static: true }]
                }], richExpressionEditorControl: [{
                    type: i0.ViewChild,
                    args: [RichExpressionEditorComponent, { read: i2.NgModel, static: true }]
                }] } });

    var RxDataDictionaryItemPluginService = /** @class */ (function () {
        function RxDataDictionaryItemPluginService() {
            CKEDITOR.plugins.add(RX_DATA_DICTIONARY_ITEM_PLUGIN.name, {
                requires: 'widget',
                init: function (editor) {
                    editor.widgets.add('rx-data-dictionary-item-widget', {
                        inline: true,
                        upcast: function (element) {
                            return lodash.has(element.attributes, RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName);
                        },
                        downcast: function (element) {
                            return new CKEDITOR.htmlParser.cdata(element.attributes[RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName]);
                        },
                        // @ts-ignore
                        // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins_widget_definition.html#method-getClipboardHtml
                        getClipboardHtml: function () {
                            return this.element.getAttributes()[RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName];
                        }
                    });
                }
            });
        }
        return RxDataDictionaryItemPluginService;
    }());
    RxDataDictionaryItemPluginService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataDictionaryItemPluginService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDataDictionaryItemPluginService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataDictionaryItemPluginService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDataDictionaryItemPluginService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var ExpressionEditorModule = /** @class */ (function () {
        function ExpressionEditorModule(rxDataDictionaryItemPluginService) {
        }
        return ExpressionEditorModule;
    }());
    ExpressionEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionEditorModule, deps: [{ token: RxDataDictionaryItemPluginService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ExpressionEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionEditorModule, declarations: [ExpressionEditorComponent,
            RichExpressionEditorComponent,
            DataDictionaryComponent,
            DataDictionaryNodeComponent], imports: [i4.CommonModule,
            i2.ReactiveFormsModule,
            i2.FormsModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptHighlightModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptModalModule,
            obsolete.AdaptSearchModule,
            i3$2.CKEditorModule,
            i1$1.AdaptTooltipModule,
            i1$1.AdaptTreeModule,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptRxFeedbackModule,
            obsolete.AdaptTypeaheadSubModule,
            i4$1.TranslateModule], exports: [ExpressionEditorComponent] });
    ExpressionEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionEditorModule, imports: [[
                i4.CommonModule,
                i2.ReactiveFormsModule,
                i2.FormsModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptHighlightModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptModalModule,
                obsolete.AdaptSearchModule,
                i3$2.CKEditorModule,
                i1$1.AdaptTooltipModule,
                i1$1.AdaptTreeModule,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptRxFeedbackModule,
                obsolete.AdaptTypeaheadSubModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            ExpressionEditorComponent,
                            RichExpressionEditorComponent,
                            DataDictionaryComponent,
                            DataDictionaryNodeComponent
                        ],
                        exports: [ExpressionEditorComponent],
                        entryComponents: [ExpressionEditorComponent],
                        imports: [
                            i4.CommonModule,
                            i2.ReactiveFormsModule,
                            i2.FormsModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptHighlightModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptModalModule,
                            obsolete.AdaptSearchModule,
                            i3$2.CKEditorModule,
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptTreeModule,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptRxFeedbackModule,
                            obsolete.AdaptTypeaheadSubModule,
                            i4$1.TranslateModule
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: RxDataDictionaryItemPluginService }]; } });

    var RxExpressionEditorService = /** @class */ (function () {
        function RxExpressionEditorService(translateService, rxModalService) {
            this.translateService = translateService;
            this.rxModalService = rxModalService;
        }
        RxExpressionEditorService.prototype.openEditor = function (config, onDialogApiReady) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this.rxModalService
                    .openModal({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.edit-expression.title'),
                    data: Object.assign(Object.assign({}, config), { api: {
                            writeValue: function (propertyPath, propertyValue) {
                                observer.next({ path: propertyPath, value: propertyValue });
                            }
                        }, onApiReady: function (dialogApi) {
                            onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(dialogApi);
                        } }),
                    content: ExpressionEditorComponent,
                    size: (config.isReadOnly ? 'sm' : i3$1.OpenViewActionModalSize.Large)
                })
                    .then(function () { return observer.complete(); })
                    .catch(function (e) {
                    onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(null);
                    return lodash.isString(e) ? new i1$3.RxError(e) : e;
                });
            });
        };
        return RxExpressionEditorService;
    }());
    RxExpressionEditorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionEditorService, deps: [{ token: i4__namespace$1.TranslateService }, { token: i1__namespace.RxModalService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxExpressionEditorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionEditorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionEditorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace$1.TranslateService }, { type: i1__namespace.RxModalService }]; } });

    exports.AssignmentExpressionListTargetFieldType = void 0;
    (function (AssignmentExpressionListTargetFieldType) {
        AssignmentExpressionListTargetFieldType["Text"] = "text";
        AssignmentExpressionListTargetFieldType["Select"] = "select";
    })(exports.AssignmentExpressionListTargetFieldType || (exports.AssignmentExpressionListTargetFieldType = {}));

    var TextFormControlComponent = /** @class */ (function (_super) {
        __extends(TextFormControlComponent, _super);
        function TextFormControlComponent(renderer) {
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            return _this;
        }
        TextFormControlComponent.prototype.focus = function () {
            this.renderer.selectRootElement(this.editor.inputRef.nativeElement, true).focus();
        };
        return TextFormControlComponent;
    }(ValueAccessor));
    TextFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextFormControlComponent, deps: [{ token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TextFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextFormControlComponent, selector: "rx-text-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: TextFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-textfield\n  #editor\n  [isPassword]=\"options.isPassword\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  [maxlength]=\"options.maxLength\"\n  [minlength]=\"options.minLength\"\n  [rxNoWhitespace]=\"!!(options.allowWhitespace === false || (options.required && options.allowWhitespace !== true))\"\n>\n</adapt-rx-textfield>\n", components: [{ type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2__namespace.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2__namespace.MinLengthValidator, selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]", inputs: ["minlength"] }, { type: i1__namespace$3.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-text-form-control',
                        templateUrl: './text-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: TextFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], editor: [{
                    type: i0.ViewChild,
                    args: ['editor', { static: true }]
                }] } });

    var SelectFormControlComponent = /** @class */ (function (_super) {
        __extends(SelectFormControlComponent, _super);
        function SelectFormControlComponent(renderer) {
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            _this.appendToBody = false;
            _this.adaptSelectValue = [];
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        SelectFormControlComponent.prototype.writeValue = function (value) {
            _super.prototype.writeValue.call(this, value);
            this.adaptSelectValue = this.getAdaptSelectValue(value);
        };
        SelectFormControlComponent.prototype.focus = function () {
            var el = this.renderer.selectRootElement(this.adaptSelectComponent.selectButtonRef.nativeElement, true);
            el.focus();
            el.click();
        };
        SelectFormControlComponent.prototype.sortAlphabetically = function (items) {
            return items.sort(function (itemA, itemB) { return itemA.name.localeCompare(itemB.name); });
        };
        SelectFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.formControl) {
                var adaptControl_1 = this.adaptSelectComponent.ngControl.control;
                adaptControl_1.statusChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () {
                    if (adaptControl_1.hasError('required') && !_this.formControl.hasError('required')) {
                        Object.assign(adaptControl_1.errors, _this.formControl.errors);
                        _this.formControl.setErrors(adaptControl_1.errors, { emitEvent: false });
                    }
                });
                this.formControl.statusChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () {
                    if (_this.formControl.invalid) {
                        adaptControl_1.setErrors(_this.formControl.errors, { emitEvent: false });
                    }
                });
            }
            this.isSortAlphabetically = lodash.isUndefined(this.options.sortAlphabetically) || this.options.sortAlphabetically;
            this.selectOptions = this.isSortAlphabetically
                ? this.sortAlphabetically(this.options.options)
                : this.options.options;
            this.tooltip = this.options.tooltip
                ? {
                    iconName: this.options.tooltip.iconName,
                    content: this.popoverContent,
                    placement: this.options.tooltip.placement,
                    popoverMode: this.options.tooltip.popoverMode
                }
                : null;
        };
        SelectFormControlComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options) {
                this.selectOptions = this.isSortAlphabetically
                    ? this.sortAlphabetically(changes.options.currentValue.options)
                    : changes.options.currentValue.options;
                // ADAPT select value must be updated if options are changed, this logic can be eliminated if ADAPT #4116 issue will be resolved.
                this.adaptSelectValue = this.getAdaptSelectValue(this.value);
            }
        };
        SelectFormControlComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        SelectFormControlComponent.prototype.onSelectionChange = function (value) {
            var _this = this;
            var selectValue = lodash.map(value, 'id');
            selectValue = this.options.multiple ? selectValue : lodash.head(selectValue);
            if (this.options.beforeValueChange) {
                this.options.beforeValueChange(this.value, selectValue).then(function (allowValueChange) {
                    if (allowValueChange) {
                        _this.value = selectValue;
                        _this.adaptSelectValue = _this.getAdaptSelectValue(selectValue);
                    }
                    else {
                        _this.adaptSelectComponent.writeValue(_this.adaptSelectValue);
                    }
                });
            }
            else {
                this.value = selectValue;
            }
        };
        SelectFormControlComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        // We have to convert value for ADAPT select, e.g:
        // - "foo" -> [{id: "foo", name: "Foo"}] or,
        // - ["foo", "bar"] => [{id: "foo", name: "Foo"}, {id: "bar", name: "Bar"}].
        // This logic can be eliminated if #4116 issue will be resolved.
        SelectFormControlComponent.prototype.getAdaptSelectValue = function (value) {
            var _a;
            return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.options) && !lodash.isNil(value)
                ? lodash.filter(this.options.options, function (option) { return lodash.includes(lodash.castArray(value), option.id); })
                : [];
        };
        return SelectFormControlComponent;
    }(ValueAccessor));
    SelectFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectFormControlComponent, deps: [{ token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SelectFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectFormControlComponent, selector: "rx-select-form-control", inputs: { options: "options", appendToBody: "appendToBody", formControl: "formControl" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: SelectFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "adaptSelectComponent", first: true, predicate: ["adaptSelectComponent"], descendants: true, static: true }, { propertyName: "popoverContent", first: true, predicate: ["popoverContent"], descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-rx-select\n  #adaptSelectComponent\n  [options]=\"selectOptions\"\n  [required]=\"options.required\"\n  [emptyOption]=\"options.emptyOption\"\n  [multiple]=\"options.multiple\"\n  [selectAllButton]=\"options.multiple && !options.hideSelectAllButton\"\n  [deselectAllButton]=\"options.multiple && !options.hideDeselectAllButton\"\n  [enableFilter]=\"options.enableFilter\"\n  [ngModel]=\"adaptSelectValue\"\n  (ngModelChange)=\"onSelectionChange($event)\"\n  [tooltip]=\"tooltip\"\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [optionFormatter]=\"optionFormatter\"\n  [appendToBody]=\"appendToBody\"\n  class=\"d-block m-0\"\n>\n</adapt-rx-select>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", components: [{ type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-select-form-control',
                        templateUrl: './select-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: SelectFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], appendToBody: [{
                    type: i0.Input
                }], formControl: [{
                    type: i0.Input
                }], adaptSelectComponent: [{
                    type: i0.ViewChild,
                    args: ['adaptSelectComponent', { static: true }]
                }], popoverContent: [{
                    type: i0.ViewChild,
                    args: ['popoverContent', { static: true }]
                }] } });

    var ExpressionFormControlComponent = /** @class */ (function (_super) {
        __extends(ExpressionFormControlComponent, _super);
        function ExpressionFormControlComponent(rxExpressionParserService, rxObjectUtilsService, rxDataDictionaryUtils, rxTreeService, changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.rxExpressionParserService = rxExpressionParserService;
            _this.rxObjectUtilsService = rxObjectUtilsService;
            _this.rxDataDictionaryUtils = rxDataDictionaryUtils;
            _this.rxTreeService = rxTreeService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.events = new i0.EventEmitter();
            _this.nodes = [];
            _this.valueSubject = new rxjs.Subject();
            _this.expressionNodeMap = new Map();
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.isTouched = false;
            return _this;
        }
        Object.defineProperty(ExpressionFormControlComponent.prototype, "propertyLabel", {
            get: function () {
                var _a, _b;
                return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.expressionEditorPropertyName) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.label) || null;
            },
            enumerable: false,
            configurable: true
        });
        ExpressionFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataDictionary$ = this.options.dataDictionary$.pipe(operators.takeUntil(this.destroyed$));
            (lodash.isNil(this.value) ? this.valueSubject.asObservable() : rxjs.concat(rxjs.of(this.value), this.valueSubject.asObservable()))
                .pipe(operators.distinctUntilChanged(), operators.switchMap(function (value) {
                // When value is not defined don't subscribe to data dictionary observable.
                return value
                    ? _this.dataDictionary$.pipe(operators.tap(_this.onDataDictionaryChange.bind(_this)), 
                    // Unsubscribe from data dictionary observable when value is removed.
                    operators.takeWhile(function () { return Boolean(_this.value); }))
                    : rxjs.EMPTY.pipe(operators.finalize(function () { return _this.updateNodes(); }));
            }), operators.takeUntil(this.destroyed$))
                .subscribe();
        };
        ExpressionFormControlComponent.prototype.onWriteValue = function (value) {
            this.valueSubject.next(value);
        };
        ExpressionFormControlComponent.prototype.openEditor = function () {
            this.isTouched = true;
            this.events.emit({
                type: RX_EXPRESSION_EDITOR.events.openExpressionEditor,
                payload: {
                    propertyPath: this.propertyPath,
                    propertyLabel: this.propertyLabel,
                    isReadOnly: this.isDisabled
                }
            });
        };
        ExpressionFormControlComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        ExpressionFormControlComponent.prototype.onDataDictionaryChange = function (dataDictionary) {
            var _this = this;
            this.dataDictionaryExpressionMap = lodash.flow(function (dictionary) { return _this.rxDataDictionaryUtils.addTooltips(dictionary); }, function (dictionary) { return _this.rxTreeService.flatten({
                children: dictionary
            }); }, function (dictionary) { return lodash.reduce(dictionary, function (dictionary, node) {
                if (lodash.isArray(node.expression)) {
                    node.expression.forEach(function (expressionItem) {
                        dictionary.push(Object.assign(Object.assign({}, node), { expression: expressionItem }));
                    });
                }
                else {
                    dictionary.push(node);
                }
                return dictionary;
            }, []); }, function (dictionary) { return _this.rxObjectUtilsService.mapFromArray(dictionary, 'expression'); })(dataDictionary);
            this.updateNodes();
        };
        ExpressionFormControlComponent.prototype.getExpressionNode = function (token, expression) {
            var node = {
                id: "$$rx-" + lodash.uniqueId() + "-rx$$",
                expression: expression
            };
            var isArExpression = token === i1$2.ExpressionParserToken.ArExpression;
            if (token === i1$2.ExpressionParserToken.RxExpression ||
                token === i1$2.ExpressionParserToken.SingleQuoteRxExpression ||
                token === i1$2.ExpressionParserToken.SingleQuoteTextExpression ||
                isArExpression) {
                var dataDictionaryItem = this.dataDictionaryExpressionMap.get(expression);
                if (dataDictionaryItem) {
                    node.label = dataDictionaryItem.label;
                    node.tooltip = dataDictionaryItem.tooltip;
                }
                else if (isArExpression || token === i1$2.ExpressionParserToken.SingleQuoteTextExpression) {
                    node.label = expression;
                }
                else {
                    node.isInvalid = true;
                }
            }
            return node;
        };
        ExpressionFormControlComponent.prototype.updateNodes = function () {
            var _this = this;
            if (this.dataDictionaryExpressionMap) {
                this.expressionNodeMap.clear();
                this.nodes = this.value
                    ? lodash.map(this.rxExpressionParserService
                        .parse(this.value, function (token, expression) {
                        if (token !== i1$2.ExpressionParserToken.RxStringExpression) {
                            if (token === i1$2.ExpressionParserToken.ArExpression) {
                                expression = expression.replace('\\', '');
                            }
                            var node = _this.getExpressionNode(token, expression);
                            _this.expressionNodeMap.set(node.id, node);
                            expression = node.id;
                        }
                        return expression;
                    }, this.options.operators)
                        .split(/(\$\$rx-[\d]+-rx\$\$)/g)
                        .filter(function (element) { return !lodash.isEmpty(element) && !/^((\$\$rx-)|(-rx\$\$)|([\s]+))$/.test(element); }), function (nodeId) { return _this.expressionNodeMap.get(nodeId) || {
                        id: nodeId,
                        expression: nodeId
                    }; })
                    : [];
                this.changeDetectorRef.markForCheck();
            }
        };
        return ExpressionFormControlComponent;
    }(ValueAccessor));
    ExpressionFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionFormControlComponent, deps: [{ token: i1__namespace$2.RxExpressionParserService }, { token: i1__namespace$3.RxObjectUtilsService }, { token: i1__namespace$2.RxDataDictionaryUtils }, { token: i1__namespace$3.RxTreeService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ExpressionFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: { options: "options", isDisabled: "isDisabled", propertyPath: "propertyPath" }, outputs: { events: "events" }, host: { properties: { "attr.property-path": "this.propertyPath", "attr.property-label": "this.propertyLabel" } }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: ExpressionFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-control-label\n  *ngIf=\"!options.isLabelHidden\"\n  [label]=\"options.label\"\n  [showRequiredLabel]=\"options.isRequired\"\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: popoverContent,\n          popoverMode: options.tooltip.popoverMode,\n          placement: options.tooltip.placement,\n          iconName: options.tooltip.iconName\n        }\n      : null\n  \"\n></adapt-rx-control-label>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n\n<button\n  type=\"button\"\n  adapt-button\n  [btn-type]=\"'tertiary'\"\n  [ngClass]=\"{ 'bg-hover': nodes.length }\"\n  class=\"position-relative text-left overflow-hidden w-100 rounded p-0\"\n  (click)=\"openEditor()\"\n  [disabled]=\"isDisabled && !nodes.length\"\n>\n  <ng-container *ngIf=\"!nodes.length\">{{\n    options.clickToBuildExpressionLabel ||\n      'com.bmc.arsys.rx.client.expression-form-control.click-to-build-expression.label' | translate\n  }}</ng-container>\n\n  <ng-container *ngFor=\"let node of nodes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        node.isInvalid ? invalidExpression : node.label ? expression : plainText;\n        context: { $implicit: node }\n      \"\n    ></ng-container>\n  </ng-container>\n\n  <span class=\"fade-line position-absolute w-100 text-center\"><span class=\"d-icon-ellipsis_horizontal\"></span></span>\n</button>\n\n<ng-template #plainText let-node>\n  <span class=\"py-1 ml-1 rounded d-inline-block rx-ellipsis\">{{ node.expression }}</span>\n</ng-template>\n\n<ng-template #expression let-node>\n  <span\n    [adaptTooltip]=\"node.tooltip\"\n    placement=\"auto\"\n    class=\"d-inline-block rx-ellipsis p-1 ml-1 rounded bg-gray-300 text-default\"\n    >{{ node.label }}</span\n  >\n</ng-template>\n\n<ng-template #invalidExpression>\n  <span adaptTooltip=\"Error\" placement=\"auto\" class=\"d-inline-block rx-ellipsis p-1 ml-1 rounded bg-danger text-white\">\n    {{ 'com.bmc.arsys.rx.client.common.error.label' | translate }}\n  </span>\n</ng-template>\n\n<div *ngIf=\"options.isRequired && !nodes.length && isTouched\" class=\"text-danger\">\n  {{ 'com.bmc.arsys.rx.client.expression-form-control.validation.required.message' | translate }}\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}button{max-height:7rem;white-space:normal}.fade-line{top:5rem;left:0;height:2rem;z-index:1;background-image:linear-gradient(0deg,white 50%,rgba(255,255,255,0));transition:opacity .25s var(--ease-transition-in-out)}.fade-line:before{position:absolute;transition:opacity .25s var(--ease-transition-in-out);background-image:linear-gradient(0deg,#f0f1f1 50%,rgba(255,255,255,0));z-index:-1;top:0;left:0;right:0;bottom:0;opacity:0;content:\"\"}.d-icon-ellipsis_horizontal:before{position:absolute;bottom:.25rem}.bg-hover:hover{background-color:#f0f1f1!important}.bg-hover:hover .fade-line:before{opacity:1}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1__namespace$1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-expression-form-control',
                        templateUrl: 'expression-form-control.component.html',
                        styleUrls: ['./expression-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: ExpressionFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxExpressionParserService }, { type: i1__namespace$3.RxObjectUtilsService }, { type: i1__namespace$2.RxDataDictionaryUtils }, { type: i1__namespace$3.RxTreeService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }], propertyPath: [{
                    type: i0.HostBinding,
                    args: ['attr.property-path']
                }, {
                    type: i0.Input
                }], propertyLabel: [{
                    type: i0.HostBinding,
                    args: ['attr.property-label']
                }], events: [{
                    type: i0.Output
                }] } });

    var AssignmentExpressionListFormControlComponent = /** @class */ (function (_super) {
        __extends(AssignmentExpressionListFormControlComponent, _super);
        function AssignmentExpressionListFormControlComponent(formBuilder, renderer, rxExpressionEditorService, rxModalService, translateService) {
            var _this = _super.call(this) || this;
            _this.formBuilder = formBuilder;
            _this.renderer = renderer;
            _this.rxExpressionEditorService = rxExpressionEditorService;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            _this.formArray = _this.formBuilder.array([]);
            _this.defaultOptions = {
                addItemText: 'com.bmc.arsys.rx.client.common.add.label',
                confirmationMessage: 'com.bmc.arsys.rx.client.common.delete-item-confirmation.message',
                sourceFieldOptions: {
                    options: {
                        label: 'com.bmc.arsys.rx.client.designer.assignment-expression.source.label',
                        required: true
                    },
                    propertyName: 'expression'
                },
                targetFieldOptions: {
                    options: {
                        label: 'com.bmc.arsys.rx.client.designer.assignment-expression.target.label',
                        required: true
                    },
                    propertyName: 'assignTarget'
                }
            };
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        AssignmentExpressionListFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.formArray.valueChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (value) {
                _this.value = value;
            });
            this.patchOptions(this.options);
        };
        AssignmentExpressionListFormControlComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options.currentValue !== changes.options.previousValue) {
                this.patchOptions(changes.options.currentValue);
            }
        };
        AssignmentExpressionListFormControlComponent.prototype.ngOnDestroy = function () {
            this.formArray.clear();
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        AssignmentExpressionListFormControlComponent.prototype.focus = function (data) {
            var fieldGroup = this.fieldGroups.get(data.index);
            if (data.fieldName === this.currentOptions.targetFieldOptions.propertyName) {
                var targetFieldElement = this.currentOptions.targetFieldOptions.type === exports.AssignmentExpressionListTargetFieldType.Text
                    ? fieldGroup.nativeElement.querySelector('rx-text-form-control input')
                    : fieldGroup.nativeElement.querySelector('rx-select-form-control button');
                targetFieldElement.focus();
            }
            else if (data.fieldName === this.currentOptions.sourceFieldOptions.propertyName) {
                var sourceFieldButton = fieldGroup.nativeElement.querySelector('rx-expression-form-control button');
                sourceFieldButton.focus();
                sourceFieldButton.click();
            }
        };
        AssignmentExpressionListFormControlComponent.prototype.onWriteValue = function (value) {
            var _this = this;
            if (!lodash.isEqual(value, this.formArray.value)) {
                this.formArray.clear();
                value.forEach(function (item) { return _this.addItem(item); });
            }
        };
        AssignmentExpressionListFormControlComponent.prototype.setDisabledState = function (isDisabled) {
            _super.prototype.setDisabledState.call(this, isDisabled);
            if (isDisabled) {
                this.formArray.disable();
            }
            else {
                this.formArray.enable();
            }
        };
        AssignmentExpressionListFormControlComponent.prototype.addItem = function (item) {
            var _a;
            this.formArray.push(this.formBuilder.group(item !== null && item !== void 0 ? item : (_a = {},
                _a[this.currentOptions.targetFieldOptions.propertyName] = null,
                _a[this.currentOptions.sourceFieldOptions.propertyName] = null,
                _a)));
        };
        AssignmentExpressionListFormControlComponent.prototype.openExpressionEditor = function (event, formControl) {
            this.rxExpressionEditorService
                .openEditor({
                expressionConfigurator: this.currentOptions.sourceFieldOptions.expressionConfigurator,
                isReadOnly: this.isDisabled,
                property: {
                    path: event.payload.propertyPath,
                    value: formControl.value,
                    label: event.payload.propertyLabel
                }
            })
                .subscribe(function (expression) {
                formControl.setValue(expression.value);
            });
        };
        AssignmentExpressionListFormControlComponent.prototype.removeItem = function (index) {
            var _this = this;
            if (!this.isDisabled) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: this.currentOptions.confirmationMessage
                })
                    .then(function (confirmed) {
                    if (confirmed) {
                        _this.formArray.removeAt(index);
                    }
                });
            }
        };
        AssignmentExpressionListFormControlComponent.prototype.patchOptions = function (options) {
            this.currentOptions = {
                addItemText: this.translateService.instant(options.addItemText || this.defaultOptions.addItemText),
                confirmationMessage: this.translateService.instant(options.confirmationMessage || this.defaultOptions.confirmationMessage),
                sourceFieldOptions: {
                    expressionConfigurator: options.sourceFieldOptions.expressionConfigurator,
                    options: Object.assign({ label: this.translateService.instant(this.defaultOptions.sourceFieldOptions.options.label), isRequired: this.defaultOptions.sourceFieldOptions.options.required }, options.sourceFieldOptions.options),
                    propertyName: options.sourceFieldOptions.propertyName || this.defaultOptions.sourceFieldOptions.propertyName
                },
                targetFieldOptions: {
                    options: Object.assign({ label: this.translateService.instant(this.defaultOptions.targetFieldOptions.options.label), required: this.defaultOptions.targetFieldOptions.options.required }, options.targetFieldOptions.options),
                    propertyName: options.targetFieldOptions.propertyName || this.defaultOptions.targetFieldOptions.propertyName,
                    type: options.targetFieldOptions.type
                }
            };
        };
        return AssignmentExpressionListFormControlComponent;
    }(ValueAccessor));
    AssignmentExpressionListFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssignmentExpressionListFormControlComponent, deps: [{ token: i2__namespace.FormBuilder }, { token: i0__namespace.Renderer2 }, { token: RxExpressionEditorService }, { token: i1__namespace.RxModalService }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AssignmentExpressionListFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssignmentExpressionListFormControlComponent, selector: "rx-assignment-expression-list-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: AssignmentExpressionListFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "fieldGroups", predicate: ["fieldGroups"], descendants: true, read: i0.ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<button\n  *ngIf=\"!isDisabled\"\n  class=\"btn btn-sm btn-link px-0 py-0\"\n  type=\"button\"\n  aria-label=\"{{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\"\n  rx-id=\"add-item-button\"\n  (click)=\"addItem()\"\n>\n  <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n\n  {{ currentOptions.addItemText }}\n</button>\n\n<div *ngFor=\"let formGroup of formArray.controls; let index = index\" class=\"card mt-2\">\n  <div class=\"card-block p-3\" #fieldGroups>\n    <button\n      *ngIf=\"!isDisabled\"\n      class=\"close position-relative\"\n      type=\"button\"\n      aria-label=\"{{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\"\n      rx-id=\"remove-item-button\"\n      (click)=\"removeItem(index)\"\n    ></button>\n\n    <div class=\"pb-3\">\n      <rx-text-form-control\n        *ngIf=\"currentOptions.targetFieldOptions.type === 'text'\"\n        [formControl]=\"formGroup.get(currentOptions.targetFieldOptions.propertyName)\"\n        [options]=\"currentOptions.targetFieldOptions.options\"\n      ></rx-text-form-control>\n\n      <rx-select-form-control\n        *ngIf=\"currentOptions.targetFieldOptions.type === 'select'\"\n        [formControl]=\"formGroup.get(currentOptions.targetFieldOptions.propertyName)\"\n        [options]=\"currentOptions.targetFieldOptions.options\"\n      ></rx-select-form-control>\n    </div>\n\n    <rx-expression-form-control\n      [formControl]=\"formGroup.get(currentOptions.sourceFieldOptions.propertyName)\"\n      [options]=\"currentOptions.sourceFieldOptions.options\"\n      [isDisabled]=\"isDisabled\"\n      [propertyPath]=\"this.propertyPath + '[' + index + '].' + currentOptions.sourceFieldOptions.propertyName\"\n      (events)=\"openExpressionEditor($event, formGroup.get(currentOptions.sourceFieldOptions.propertyName))\"\n    ></rx-expression-form-control>\n  </div>\n</div>\n", components: [{ type: TextFormControlComponent, selector: "rx-text-form-control", inputs: ["options"] }, { type: SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssignmentExpressionListFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-assignment-expression-list-form-control',
                        templateUrl: './assignment-expression-list-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: AssignmentExpressionListFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.FormBuilder }, { type: i0__namespace.Renderer2 }, { type: RxExpressionEditorService }, { type: i1__namespace.RxModalService }, { type: i4__namespace$1.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], propertyPath: [{
                    type: i0.Input
                }], fieldGroups: [{
                    type: i0.ViewChildren,
                    args: ['fieldGroups', { read: i0.ElementRef }]
                }] } });

    var ExpressionFormControlModule = /** @class */ (function () {
        function ExpressionFormControlModule() {
        }
        return ExpressionFormControlModule;
    }());
    ExpressionFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ExpressionFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionFormControlModule, declarations: [ExpressionFormControlComponent], imports: [i2.FormsModule,
            i4.CommonModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptTooltipModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptRxLabelModule,
            i4$1.TranslateModule], exports: [ExpressionFormControlComponent] });
    ExpressionFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionFormControlModule, imports: [[
                i2.FormsModule,
                i4.CommonModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptTooltipModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptRxLabelModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.FormsModule,
                            i4.CommonModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptRxLabelModule,
                            i4$1.TranslateModule
                        ],
                        exports: [ExpressionFormControlComponent],
                        declarations: [ExpressionFormControlComponent],
                        entryComponents: [ExpressionFormControlComponent]
                    }]
            }] });

    var TextFormControlModule = /** @class */ (function () {
        function TextFormControlModule() {
        }
        return TextFormControlModule;
    }());
    TextFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TextFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextFormControlModule, declarations: [TextFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextfieldModule, i1$3.RxNoWhitespaceValidatorModule], exports: [TextFormControlComponent] });
    TextFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextfieldModule, i1$3.RxNoWhitespaceValidatorModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [TextFormControlComponent],
                        exports: [TextFormControlComponent],
                        entryComponents: [TextFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextfieldModule, i1$3.RxNoWhitespaceValidatorModule]
                    }]
            }] });

    var SelectFormControlModule = /** @class */ (function () {
        function SelectFormControlModule() {
        }
        return SelectFormControlModule;
    }());
    SelectFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SelectFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectFormControlModule, declarations: [SelectFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSelectModule], exports: [SelectFormControlComponent] });
    SelectFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSelectModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [SelectFormControlComponent],
                        exports: [SelectFormControlComponent],
                        entryComponents: [SelectFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSelectModule]
                    }]
            }] });

    var AssignmentExpressionListFormControlModule = /** @class */ (function () {
        function AssignmentExpressionListFormControlModule() {
        }
        return AssignmentExpressionListFormControlModule;
    }());
    AssignmentExpressionListFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssignmentExpressionListFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AssignmentExpressionListFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssignmentExpressionListFormControlModule, declarations: [AssignmentExpressionListFormControlComponent], imports: [i4.CommonModule,
            i4$1.TranslateModule,
            ExpressionFormControlModule,
            i2.ReactiveFormsModule,
            TextFormControlModule,
            SelectFormControlModule], exports: [AssignmentExpressionListFormControlComponent] });
    AssignmentExpressionListFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssignmentExpressionListFormControlModule, imports: [[
                i4.CommonModule,
                i4$1.TranslateModule,
                ExpressionFormControlModule,
                i2.ReactiveFormsModule,
                TextFormControlModule,
                SelectFormControlModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssignmentExpressionListFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [AssignmentExpressionListFormControlComponent],
                        entryComponents: [AssignmentExpressionListFormControlComponent],
                        imports: [
                            i4.CommonModule,
                            i4$1.TranslateModule,
                            ExpressionFormControlModule,
                            i2.ReactiveFormsModule,
                            TextFormControlModule,
                            SelectFormControlModule
                        ],
                        exports: [AssignmentExpressionListFormControlComponent]
                    }]
            }] });

    var AttachmentFormControlComponent = /** @class */ (function (_super) {
        __extends(AttachmentFormControlComponent, _super);
        function AttachmentFormControlComponent(ngZone) {
            var _this = _super.call(this) || this;
            _this.ngZone = ngZone;
            _this.customDownload = _this.downloadFile.bind(_this);
            return _this;
        }
        AttachmentFormControlComponent.prototype.ngOnInit = function () {
            if (!this.options.maxFileSize) {
                this.options.maxFileSize = Number.MAX_SAFE_INTEGER.toString();
            }
            if (!this.options.filesCount) {
                this.options.filesCount = '1';
            }
        };
        AttachmentFormControlComponent.prototype.onModelChange = function (files) {
            this.value = files.length ? files.map(function (file) { return file.data; }) : null;
        };
        AttachmentFormControlComponent.prototype.onWriteValue = function (value) {
            var _this = this;
            this.fileObjects = lodash.map(value, function (fileData) {
                var defaultFileObject = {
                    data: fileData,
                    allowDeletion: true,
                    inUploading: false,
                    inDeleting: false,
                    uploaded: 100,
                    error: false,
                    errorText: ''
                };
                var updatedFileObject = (_this.fileObjects || []).find(function (_a) {
                    var data = _a.data;
                    return data === fileData;
                }) || defaultFileObject;
                updatedFileObject.uploaded = 100;
                return updatedFileObject;
            });
        };
        AttachmentFormControlComponent.prototype.downloadFile = function (fileObj) {
            this.ngZone.runOutsideAngular(function () {
                fileSaver.saveAs(fileObj.data, fileObj.data.name);
            });
        };
        return AttachmentFormControlComponent;
    }(ValueAccessor));
    AttachmentFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFormControlComponent, deps: [{ token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AttachmentFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AttachmentFormControlComponent, selector: "rx-attachment-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: AttachmentFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\">\n  <adapt-rx-uploader\n    [required]=\"options.required\"\n    [disabled]=\"isDisabled\"\n    (ngModelChange)=\"onModelChange($event)\"\n    [(ngModel)]=\"fileObjects\"\n    [label]=\"options.label\"\n    [filesCount]=\"options.filesCount\"\n    [maxFileSize]=\"options.maxFileSize\"\n    [enableCustomDownload]=\"true\"\n    [customDownload]=\"customDownload\"\n    [reusable]=\"true\"\n  ></adapt-rx-uploader>\n</div>\n", styles: [":host adapt-rx-uploader ::ng-deep .adapt-uploader-file-uploaded,:host adapt-rx-uploader ::ng-deep .adapt-rx-uploader__restrict{display:none}\n"], components: [{ type: i1__namespace$1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-attachment-form-control',
                        templateUrl: './attachment-form-control.component.html',
                        styleUrls: ['./attachment-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: AttachmentFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.NgZone }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var AttachmentFormControlModule = /** @class */ (function () {
        function AttachmentFormControlModule() {
        }
        return AttachmentFormControlModule;
    }());
    AttachmentFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AttachmentFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFormControlModule, declarations: [AttachmentFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1__namespace$1.AdaptRxUploaderModule], exports: [AttachmentFormControlComponent] });
    AttachmentFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxUploaderModule.forRoot()]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxUploaderModule.forRoot()],
                        exports: [AttachmentFormControlComponent],
                        declarations: [AttachmentFormControlComponent],
                        entryComponents: [AttachmentFormControlComponent]
                    }]
            }] });

    var BooleanFormControlComponent = /** @class */ (function (_super) {
        __extends(BooleanFormControlComponent, _super);
        function BooleanFormControlComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BooleanFormControlComponent;
    }(ValueAccessor));
    BooleanFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    BooleanFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BooleanFormControlComponent, selector: "rx-checkbox-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: BooleanFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<rx-boolean\n  [label]=\"options.label || options.description\"\n  [required]=\"options.required\"\n  [isDisabled]=\"isDisabled\"\n  [shouldDisplayAsCheckbox]=\"options.shouldDisplayAsCheckbox\"\n  [(ngModel)]=\"value\"\n  [tooltip]=\"options.tooltip\"\n></rx-boolean>\n", components: [{ type: RxBooleanComponent, selector: "rx-boolean", inputs: ["shouldDisplayAsCheckbox", "required", "isDisabled", "label", "tooltip"], outputs: ["rxBlur"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-checkbox-form-control',
                        templateUrl: './boolean-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: BooleanFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var BooleanFormControlModule = /** @class */ (function () {
        function BooleanFormControlModule() {
        }
        return BooleanFormControlModule;
    }());
    BooleanFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BooleanFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFormControlModule, declarations: [BooleanFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxCheckboxModule, i1$1.AdaptRxLabelModule, RxBooleanModule], exports: [BooleanFormControlComponent] });
    BooleanFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxCheckboxModule, i1$1.AdaptRxLabelModule, RxBooleanModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [BooleanFormControlComponent],
                        exports: [BooleanFormControlComponent],
                        entryComponents: [BooleanFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxCheckboxModule, i1$1.AdaptRxLabelModule, RxBooleanModule]
                    }]
            }] });

    var ColorPickerFormControlComponent = /** @class */ (function (_super) {
        __extends(ColorPickerFormControlComponent, _super);
        function ColorPickerFormControlComponent(rxColorUtilsService) {
            var _this = _super.call(this) || this;
            _this.rxColorUtilsService = rxColorUtilsService;
            return _this;
        }
        Object.defineProperty(ColorPickerFormControlComponent.prototype, "color", {
            get: function () {
                return this.colorValue;
            },
            set: function (color) {
                if (!this.rxColorUtilsService.isSameColor(color, this.value)) {
                    this.value = this.rxColorUtilsService.normalize(color);
                    this.colorValue = color;
                }
            },
            enumerable: false,
            configurable: true
        });
        ColorPickerFormControlComponent.prototype.onWriteValue = function (value) {
            if (!this.color || !this.rxColorUtilsService.isSameColor(this.color, value)) {
                this.colorValue = this.rxColorUtilsService.normalize(value);
            }
        };
        ColorPickerFormControlComponent.prototype.setColor = function (color) {
            this.color = (color === null || color === void 0 ? void 0 : color.value) || 'null';
        };
        return ColorPickerFormControlComponent;
    }(ValueAccessor));
    ColorPickerFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorPickerFormControlComponent, deps: [{ token: i1__namespace$3.RxColorUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ColorPickerFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ColorPickerFormControlComponent, selector: "rx-color-picker-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: ColorPickerFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\">\n  <adapt-rx-control-label [showRequiredLabel]=\"options.required\" [label]=\"options.label\"></adapt-rx-control-label>\n\n  <adapt-color-picker\n    [disabled]=\"isDisabled\"\n    [(ngModel)]=\"color\"\n    [showEmptyOption]=\"!options.required\"\n    [showRecentlyUsedColors]=\"false\"\n    (onSelectColor)=\"setColor($event)\"\n  ></adapt-color-picker>\n</div>\n", components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptColorPickerComponent, selector: "adapt-color-picker, adapt-colorpicker", inputs: ["showThemeColors", "showRecentlyUsedColors", "colorType", "label", "mobileView", "placement", "appendToBody", "disabled", "readonly", "showEmptyOption", "disabledStyleForReadonlyState", "recentlyUsedColors"], outputs: ["onChange", "onSelectColor", "open", "close", "focus", "blur", "recentlyUsedColorsChanged"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorPickerFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-color-picker-form-control',
                        templateUrl: './color-picker-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: ColorPickerFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.RxColorUtilsService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var ColorPickerFormControlModule = /** @class */ (function () {
        function ColorPickerFormControlModule() {
        }
        return ColorPickerFormControlModule;
    }());
    ColorPickerFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorPickerFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ColorPickerFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorPickerFormControlModule, declarations: [ColorPickerFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptColorPickerModule, i1$1.AdaptRxLabelModule], exports: [ColorPickerFormControlComponent] });
    ColorPickerFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorPickerFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptColorPickerModule, i1$1.AdaptRxLabelModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorPickerFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptColorPickerModule, i1$1.AdaptRxLabelModule],
                        declarations: [ColorPickerFormControlComponent],
                        exports: [ColorPickerFormControlComponent]
                    }]
            }] });

    var CounterFormControlComponent = /** @class */ (function (_super) {
        __extends(CounterFormControlComponent, _super);
        function CounterFormControlComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CounterFormControlComponent.prototype.ngOnInit = function () {
            if (lodash.isNil(this.options.maxValue)) {
                this.options.maxValue = this.options.allowIntegerOnly ? i1$3.RX_NUMBER.maxInteger : Number.MAX_SAFE_INTEGER;
            }
            if (lodash.isNil(this.options.minValue)) {
                this.options.minValue = this.options.allowIntegerOnly ? i1$3.RX_NUMBER.minInteger : Number.MIN_SAFE_INTEGER;
            }
        };
        CounterFormControlComponent.prototype.focus = function () {
            this.adaptRxCounterComponent.inputEl.nativeElement.focus();
        };
        return CounterFormControlComponent;
    }(ValueAccessor));
    CounterFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CounterFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    CounterFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CounterFormControlComponent, selector: "rx-counter-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: CounterFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "adaptRxCounterComponent", first: true, predicate: i1$1.AdaptRxCounterComponent, descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-counter\n  *ngIf=\"options.allowIntegerOnly\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"value\"\n  [max]=\"options.maxValue\"\n  [min]=\"options.minValue\"\n  [adaptMax]=\"options.maxValue\"\n  [adaptMin]=\"options.minValue\"\n  adaptIntegerNumber\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: tooltipContent,\n          iconName: 'question_circle_o'\n        }\n      : null\n  \"\n>\n</adapt-rx-counter>\n\n<adapt-rx-counter\n  *ngIf=\"!options.allowIntegerOnly\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"value\"\n  [max]=\"options.maxValue\"\n  [min]=\"options.minValue\"\n  [adaptMax]=\"options.maxValue\"\n  [adaptMin]=\"options.minValue\"\n  adaptScientificNumber\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: tooltipContent,\n          iconName: 'question_circle_o'\n        }\n      : null\n  \"\n>\n</adapt-rx-counter>\n\n<ng-template #tooltipContent>\n  <div [innerHTML]=\"options.tooltip\"></div>\n</ng-template>\n", components: [{ type: i1__namespace$1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1__namespace$1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i1__namespace$1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1__namespace$1.AdaptScientificNumberValidatorDirective, selector: "[adaptScientificNumber][ngModel], [adaptScientificNumber][formControl]", inputs: ["adaptScientificNumberMessageFn"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CounterFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-counter-form-control',
                        templateUrl: './counter-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: CounterFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }], adaptRxCounterComponent: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptRxCounterComponent]
                }] } });

    var CounterFormControlModule = /** @class */ (function () {
        function CounterFormControlModule() {
        }
        return CounterFormControlModule;
    }());
    CounterFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CounterFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CounterFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CounterFormControlModule, declarations: [CounterFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxValidatorsModule, i1$1.AdaptRxCounterModule], exports: [CounterFormControlComponent] });
    CounterFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CounterFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxValidatorsModule, i1$1.AdaptRxCounterModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CounterFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxValidatorsModule, i1$1.AdaptRxCounterModule],
                        declarations: [CounterFormControlComponent],
                        exports: [CounterFormControlComponent],
                        entryComponents: [CounterFormControlComponent]
                    }]
            }] });

    var CoarseGrainedCustomizationOptionsEditorComponent = /** @class */ (function (_super) {
        __extends(CoarseGrainedCustomizationOptionsEditorComponent, _super);
        function CoarseGrainedCustomizationOptionsEditorComponent(formBuilder, rxModalService, activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.formBuilder = formBuilder;
            _this.rxModalService = rxModalService;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.data = _this.activeModalRef.getData();
            _this.scopeSelectionOptions = _this.data.scopeSelectionOptions;
            _this.isDisabled = _this.data.overlayOperation !== i1$2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            _this.initForm();
            return _this;
        }
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.isDirty = function () {
            return this.customizationOptionsForm.dirty;
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.isPublic = function () {
            return this.customizationOptionsForm.get('scope').value[0].id === i1$2.RX_BUNDLE.definitionScopeTypes.public;
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.submit = function () {
            var _this = this;
            if (this.isPublic()) {
                this.rxModalService
                    .confirm({
                    title: 'Warning',
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: 'If the definition scope is set to Public, it cannot be changed once the definition gets saved. Do you want to continue?'
                })
                    .then(function (result) {
                    if (result) {
                        _this.closeModal();
                    }
                })
                    .catch(lodash.noop);
            }
            else if (this.data.definitionScopeName === i1$2.RX_BUNDLE.definitionScopeNames.public) {
                this.rxModalService
                    .confirm({
                    title: 'Warning',
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: 'Changing the definition scope from Public to Application or Library can break upgrades. Do you want to continue?'
                })
                    .then(function (result) {
                    if (result) {
                        _this.closeModal();
                    }
                })
                    .catch(lodash.noop);
            }
            else {
                this.closeModal();
            }
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.onScopeChange = function (rxSelectionChangeEvent) {
            if (rxSelectionChangeEvent.options[0].id === i1$2.RX_BUNDLE.definitionScopes.application.type) {
                this.customizationOptionsForm.get('allowOverlay').setValue(false);
            }
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.closeModal = function () {
            var result = this.customizationOptionsForm.getRawValue();
            result.scope = result.scope[0].id;
            this.activeModalRef.close(result);
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.initForm = function () {
            var _this = this;
            var definitionScopeName = lodash.find(this.scopeSelectionOptions, function (scopeType) { return scopeType.name === _this.data.definitionScopeName; });
            this.customizationOptionsForm = this.formBuilder.group({
                scope: new i2.FormControl([definitionScopeName]),
                allowOverlay: { value: this.data.allowOverlay || false, disabled: this.data.isDisabled }
            });
        };
        CoarseGrainedCustomizationOptionsEditorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        return CoarseGrainedCustomizationOptionsEditorComponent;
    }(i1.RxModalClass));
    CoarseGrainedCustomizationOptionsEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CoarseGrainedCustomizationOptionsEditorComponent, deps: [{ token: i2__namespace.FormBuilder }, { token: i1__namespace.RxModalService }, { token: i1__namespace$1.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CoarseGrainedCustomizationOptionsEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CoarseGrainedCustomizationOptionsEditorComponent, selector: "rx-scope-customization-modal", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"customizationOptionsForm\" class=\"row\">\n    <div class=\"col-lg-5\">\n      <adapt-rx-select\n        label=\"Scope\"\n        rx-id=\"scope\"\n        [options]=\"scopeSelectionOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [disabled]=\"isDisabled || data.isDisabled\"\n        [tooltip]=\"{\n          iconName: 'question_circle_o',\n          content:\n            'If Scope is set to Application or Library, the definition will be available only to this application or library. If Scope is set to Public, the definition will be available to use by this and other applications and libraries.',\n          placement: 'bottom',\n          popoverMode: true\n        }\"\n        formControlName=\"scope\"\n        (onSelectionChange)=\"onScopeChange($event)\"\n      >\n      </adapt-rx-select>\n    </div>\n\n    <div class=\"col-lg-12\">\n      <h5>{{'com.bmc.arsys.rx.client.customization-options-editor.customization-options.label' | translate}}</h5>\n      <adapt-rx-checkbox\n        label=\"{{'com.bmc.arsys.rx.client.customization-options-editor.allow-future-customization.label'\n        | translate : { definitionType: data.definitionTypeDisplayName } }}\"\n        formControlName=\"allowOverlay\"\n        [disabled]=\"isDisabled || !isPublic()\"\n      >\n      </adapt-rx-checkbox>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"!customizationOptionsForm.dirty\"\n    rx-id=\"save-button\"\n    (click)=\"submit()\"\n    type=\"button\"\n  >\n    Save\n  </button>\n\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">Cancel</button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CoarseGrainedCustomizationOptionsEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-scope-customization-modal',
                        templateUrl: './coarse-grained-customization-options-editor.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.FormBuilder }, { type: i1__namespace.RxModalService }, { type: i1__namespace$1.ActiveModalRef }, { type: i0__namespace.Injector }]; } });

    var CustomizationOptionsComponent = /** @class */ (function (_super) {
        __extends(CustomizationOptionsComponent, _super);
        function CustomizationOptionsComponent(rxModalService, rxBundleCacheService, rxOverlayService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.rxBundleCacheService = rxBundleCacheService;
            _this.rxOverlayService = rxOverlayService;
            return _this;
        }
        CustomizationOptionsComponent.prototype.ngOnInit = function () {
            if (this.options) {
                this.updateValues();
            }
        };
        CustomizationOptionsComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options) {
                this.updateValues();
            }
        };
        CustomizationOptionsComponent.prototype.getOverlayOperation = function () {
            var _a;
            return this.rxOverlayService.getOverlayOperation(this.options.overlayGroupId, ((_a = this.options.overlayDescriptor) === null || _a === void 0 ? void 0 : _a.parentOverlayGroupId) || null);
        };
        CustomizationOptionsComponent.prototype.updateValues = function () {
            var _this = this;
            this.setAllowOverlayLabel(this.options.allowOverlay);
            this.rxBundleCacheService
                .getDefinitionScopeName(this.options.scope)
                .pipe(operators.take(1))
                .subscribe(function (definitionScopeName) { return (_this.definitionScopeName = definitionScopeName); });
            this.rxBundleCacheService
                .getDefinitionScopeSelectionOptions()
                .pipe(operators.take(1))
                .subscribe(function (scopeSelectionOptions) { return (_this.scopeSelectionOptions = scopeSelectionOptions); });
            if (this.options.overlayGroupId) {
                this.overlayOperation = this.getOverlayOperation();
            }
            else {
                this.overlayOperation = i1$2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            }
        };
        CustomizationOptionsComponent.prototype.openCustomizationOptionsEditor = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                title: 'Scope/Customization options',
                content: CoarseGrainedCustomizationOptionsEditorComponent,
                blockKeyboard: false,
                size: 'sm',
                data: {
                    definitionScopeName: this.definitionScopeName,
                    allowOverlay: this.options.allowOverlay,
                    scopeSelectionOptions: this.scopeSelectionOptions,
                    isDisabled: this.options.isDisabled,
                    overlayOperation: this.overlayOperation,
                    definitionTypeDisplayName: this.options.definitionTypeDisplayName
                }
            })
                .then(function (result) {
                _this.setAllowOverlayLabel(result.allowOverlay);
                _this.definitionScopeName = _this.scopeSelectionOptions.find(function (value) { return value.id === result.scope; }).name;
                _this.value = result;
            })
                .catch(lodash.noop);
        };
        CustomizationOptionsComponent.prototype.setAllowOverlayLabel = function (allowOverlay) {
            this.allowOverlayLabel = allowOverlay
                ? i1$2.RX_OVERLAY.overlayAllowedLabels.allowed
                : i1$2.RX_OVERLAY.overlayAllowedLabels.notAllowed;
        };
        return CustomizationOptionsComponent;
    }(ValueAccessor));
    CustomizationOptionsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CustomizationOptionsComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i1__namespace$2.RxBundleCacheService }, { token: i1__namespace$2.RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CustomizationOptionsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: CustomizationOptionsComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<div class=\"d-flex\">\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-customization-options-editor-link\"\n    (click)=\"openCustomizationOptionsEditor()\"\n    class=\"p-0\"\n  >\n    {{ 'com.bmc.arsys.rx.client.designer.scope-customization-options.title' | translate }}\n  </adapt-button>\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    maxWidth=\"400\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate\"\n  >\n  </adapt-icon>\n</div>\n\n<p rx-id=\"scope-name-label\" class=\"mb-0 pt-2\">\n  {{\n    'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.label'\n      | translate: { definitionScopeName: definitionScopeName }\n  }}\n</p>\n<div rx-id=\"customization-options-label\" class=\"pt-2\">\n  {{\n    'com.bmc.arsys.rx.client.designer.scope-customization-options.customization.label'\n      | translate: { allowOverlayLabel: allowOverlayLabel }\n  }}\n</div>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CustomizationOptionsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-scope-customization-control',
                        templateUrl: './customization-options.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: CustomizationOptionsComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i1__namespace$2.RxBundleCacheService }, { type: i1__namespace$2.RxOverlayService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var CustomizationOptionsModule = /** @class */ (function () {
        function CustomizationOptionsModule() {
        }
        return CustomizationOptionsModule;
    }());
    CustomizationOptionsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CustomizationOptionsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CustomizationOptionsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CustomizationOptionsModule, declarations: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent], imports: [i4.CommonModule,
            i2.FormsModule,
            i1$1.AdaptTooltipModule,
            i1$1.AdaptRxSelectModule,
            i1$1.AdaptButtonModule,
            obsolete.AdaptCheckbox2Module,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptRxCheckboxModule,
            i2.ReactiveFormsModule,
            i4$1.TranslateModule], exports: [CustomizationOptionsComponent] });
    CustomizationOptionsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CustomizationOptionsModule, imports: [[
                i4.CommonModule,
                i2.FormsModule,
                i1$1.AdaptTooltipModule,
                i1$1.AdaptRxSelectModule,
                i1$1.AdaptButtonModule,
                obsolete.AdaptCheckbox2Module,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptRxCheckboxModule,
                i2.ReactiveFormsModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CustomizationOptionsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent],
                        exports: [CustomizationOptionsComponent],
                        entryComponents: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent],
                        imports: [
                            i4.CommonModule,
                            i2.FormsModule,
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptRxSelectModule,
                            i1$1.AdaptButtonModule,
                            obsolete.AdaptCheckbox2Module,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptRxCheckboxModule,
                            i2.ReactiveFormsModule,
                            i4$1.TranslateModule
                        ]
                    }]
            }] });

    var DateFormControlComponent = /** @class */ (function (_super) {
        __extends(DateFormControlComponent, _super);
        function DateFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.datePickerControl = new i2.FormControl('');
            _this.pickerMode = i1$1.RxDatetimePickerMode.Date;
            return _this;
        }
        DateFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.datePickerControl.valueChanges.subscribe(function (value) {
                if (value) {
                    _this.value = moment__default["default"]([value.year, value.month, value.date]).format('YYYY-MM-DD');
                }
                else {
                    _this.value = null;
                }
            });
        };
        DateFormControlComponent.prototype.writeValue = function (value) {
            _super.prototype.writeValue.call(this, value);
            var date = moment__default["default"](this.value);
            if (date.isValid()) {
                this.datePickerControl.setValue({
                    year: date.year(),
                    month: date.month(),
                    date: date.date()
                });
            }
            else {
                this.datePickerControl.setValue(null);
            }
        };
        return DateFormControlComponent;
    }(ValueAccessor));
    DateFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    DateFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DateFormControlComponent, selector: "rx-date-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: DateFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1__namespace$1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-date-form-control',
                        templateUrl: './date-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: DateFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var DateFormControlModule = /** @class */ (function () {
        function DateFormControlModule() {
        }
        return DateFormControlModule;
    }());
    DateFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DateFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateFormControlModule, declarations: [DateFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptRxDatetimeModule], exports: [DateFormControlComponent] });
    DateFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptRxDatetimeModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptRxDatetimeModule],
                        declarations: [DateFormControlComponent],
                        exports: [DateFormControlComponent],
                        entryComponents: [DateFormControlComponent]
                    }]
            }] });

    var FormBuilderService = /** @class */ (function () {
        function FormBuilderService() {
            this.editorEventSubject = new rxjs.Subject();
            this.focusEditorSubject = new rxjs.Subject();
            this.editorEvent$ = this.editorEventSubject.asObservable();
            this.focusEditor$ = this.focusEditorSubject.asObservable();
        }
        FormBuilderService.prototype.setFocusEditor = function (focusEditor) {
            this.focusEditorSubject.next(focusEditor);
        };
        FormBuilderService.prototype.dispatch = function (builderEvent) {
            this.editorEventSubject.next(builderEvent);
        };
        return FormBuilderService;
    }());
    FormBuilderService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    FormBuilderService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderService, decorators: [{
                type: i0.Injectable
            }] });

    var FORM_BUILDER = {
        controlTypes: {
            widget: 'widget',
            formControl: 'formControl',
            section: 'section'
        }
    };

    var AbstractFormControlModel = /** @class */ (function () {
        function AbstractFormControlModel() {
            this.hidden = false;
        }
        AbstractFormControlModel.prototype.hide = function () {
            this.hidden = true;
        };
        AbstractFormControlModel.prototype.show = function () {
            this.hidden = false;
        };
        return AbstractFormControlModel;
    }());

    var FormControlModel = /** @class */ (function (_super) {
        __extends(FormControlModel, _super);
        function FormControlModel(options, formControl) {
            var _this = _super.call(this) || this;
            _this.type = FORM_BUILDER.controlTypes.formControl;
            _this.isDisabled = false;
            _this.formControl = formControl;
            _this.name = options.name;
            _this.component = options.component;
            _this.hidden = options.hidden;
            _this.isDisabled = options.isDisabled;
            _this.options = options.options || {};
            return _this;
        }
        return FormControlModel;
    }(AbstractFormControlModel));

    var FormSectionModel = /** @class */ (function (_super) {
        __extends(FormSectionModel, _super);
        function FormSectionModel(options) {
            var _this = _super.call(this) || this;
            _this.type = FORM_BUILDER.controlTypes.section;
            _this.open = true;
            _this.controls = [];
            _this.controls = options.controls;
            _this.label = options.label;
            _this.open = options.open === undefined ? true : options.open;
            _this.hidden = options.hidden === undefined ? false : options.hidden;
            return _this;
        }
        FormSectionModel.prototype.collapse = function () {
            this.open = false;
        };
        FormSectionModel.prototype.expand = function () {
            this.open = true;
        };
        return FormSectionModel;
    }(AbstractFormControlModel));

    var FormWidgetModel = /** @class */ (function (_super) {
        __extends(FormWidgetModel, _super);
        function FormWidgetModel(options) {
            var _this = _super.call(this) || this;
            _this.type = FORM_BUILDER.controlTypes.widget;
            _this.hidden = false;
            _this.isDisabled = false;
            _this.component = options.component;
            _this.hidden = options.hidden;
            _this.isDisabled = options.isDisabled;
            _this.options = options.options || {};
            _this.widgetName = options.widgetName;
            return _this;
        }
        return FormWidgetModel;
    }(AbstractFormControlModel));

    var FormBuilderFactory = /** @class */ (function () {
        function FormBuilderFactory() {
        }
        FormBuilderFactory.prototype.control = function (options, formControl) {
            return new FormControlModel(options, formControl);
        };
        FormBuilderFactory.prototype.widget = function (options) {
            return new FormWidgetModel(options);
        };
        FormBuilderFactory.prototype.section = function (options) {
            return new FormSectionModel(options);
        };
        return FormBuilderFactory;
    }());
    FormBuilderFactory.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderFactory, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    FormBuilderFactory.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderFactory, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderFactory, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var FormOutletComponent = /** @class */ (function () {
        function FormOutletComponent(cr, formBuilderService, renderer) {
            this.cr = cr;
            this.formBuilderService = formBuilderService;
            this.renderer = renderer;
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        FormOutletComponent.prototype.ngOnInit = function () {
            var _this = this;
            var factory = this.cr.resolveComponentFactory(this.control.component);
            var controlName = this.getControlName(this.control);
            this.componentRef = this.container.createComponent(factory);
            this.renderer.setAttribute(this.componentRef.location.nativeElement, 'rx-id', lodash.kebabCase(controlName));
            this.instance = this.componentRef.instance;
            this.instance.options = this.control.options;
            this.instance.propertyPath = controlName;
            if (this.instance.events) {
                this.instance.events.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (event) {
                    _this.formBuilderService.dispatch(event);
                });
            }
            this.formBuilderService.focusEditor$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (_a) {
                var editorName = _a.editorName, data = _a.data;
                if (controlName === editorName && _this.isFocusable(_this.instance)) {
                    _this.instance.focus(data);
                }
            });
        };
        FormOutletComponent.prototype.getControlName = function (control) {
            if (control instanceof FormWidgetModel) {
                return control.component.name;
            }
            else if (control instanceof FormControlModel) {
                return control.name;
            }
            else {
                return '';
            }
        };
        FormOutletComponent.prototype.ngOnChanges = function (changes) {
            if (changes.control && this.instance) {
                this.instance.options = changes.control.currentValue.options;
                if (this.isSupportChanges(this.instance)) {
                    var onChanges = {};
                    if (!lodash.isEqual(changes.control.previousValue.options, changes.control.currentValue.options)) {
                        onChanges.options = new i0.SimpleChange(changes.control.previousValue.options, changes.control.currentValue.options, false);
                    }
                    if (changes.control.previousValue.isDisabled !== changes.control.currentValue.isDisabled) {
                        onChanges.disabled = new i0.SimpleChange(changes.control.previousValue.isDisabled, changes.control.currentValue.isDisabled, false);
                    }
                    if (Object.keys(onChanges).length) {
                        this.instance.ngOnChanges(onChanges);
                    }
                }
            }
        };
        FormOutletComponent.prototype.ngOnDestroy = function () {
            this.componentRef.destroy();
            this.componentRef = null;
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        // proxy calls from ControlValueAccessor interface to control component
        FormOutletComponent.prototype.writeValue = function (value) {
            this.instance.writeValue(value);
        };
        FormOutletComponent.prototype.registerOnChange = function (fn) {
            this.instance.registerOnChange(fn);
        };
        FormOutletComponent.prototype.registerOnTouched = function (fn) {
            this.instance.registerOnTouched(fn);
        };
        FormOutletComponent.prototype.setDisabledState = function (isDisabled) {
            this.instance.setDisabledState(isDisabled);
        };
        FormOutletComponent.prototype.isFocusable = function (instance) {
            return Boolean(instance.focus);
        };
        FormOutletComponent.prototype.isSupportChanges = function (instance) {
            return Boolean(instance.ngOnChanges);
        };
        return FormOutletComponent;
    }());
    FormOutletComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormOutletComponent, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: FormBuilderService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FormOutletComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormOutletComponent, selector: "rx-form-outlet", inputs: { control: "control" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: FormOutletComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: '<ng-container #container></ng-container>', isInline: true, styles: [":host{display:block;margin-bottom:1rem}:host:last-child{margin-bottom:0}\n"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormOutletComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-form-outlet',
                        template: '<ng-container #container></ng-container>',
                        styleUrls: ['./form-outlet.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: FormOutletComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: FormBuilderService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { control: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef, static: true }]
                }] } });

    var FormWidgetComponent = /** @class */ (function () {
        function FormWidgetComponent(componentFactoryResolver, formBuilderService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.formBuilderService = formBuilderService;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.isHidden = false;
        }
        FormWidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            var factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
            this.componentRef = this.container.createComponent(factory);
            this.formWidgetComponent = this.componentRef.instance;
            this.formWidgetComponent.options = this.widget.options;
            this.formWidgetComponent.isDisabled = this.widget.isDisabled;
            (_a = this.formBuilderService.focusEditor$) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (_b) {
                var editorName = _b.editorName, data = _b.data;
                if (editorName === _this.widget.widgetName && _this.isFocusable(_this.formWidgetComponent)) {
                    _this.formWidgetComponent.focus(data);
                }
            });
        };
        FormWidgetComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            var _a;
            (_a = this.formWidgetComponent.events) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (event) {
                if (event.type === i1$2.FormBuilderEvent.HideWidget) {
                    _this.isHidden = event.payload;
                }
                else {
                    _this.formBuilderService.dispatch(event);
                }
            });
        };
        FormWidgetComponent.prototype.ngOnChanges = function (changes) {
            if (changes.widget && this.formWidgetComponent) {
                if (!lodash.isEqual(changes.widget.currentValue.component, changes.widget.previousValue.component)) {
                    this.componentRef.destroy();
                    var factory = this.componentFactoryResolver.resolveComponentFactory(changes.widget.currentValue.component);
                    this.componentRef = this.container.createComponent(factory);
                    this.formWidgetComponent = this.componentRef.instance;
                }
                this.formWidgetComponent.options = changes.widget.currentValue.options;
                this.formWidgetComponent.isDisabled = changes.widget.currentValue.isDisabled;
                if (this.isSupportChanges(this.formWidgetComponent)) {
                    var onChanges = {};
                    if (!lodash.isEqual(changes.widget.previousValue.options, changes.widget.currentValue.options)) {
                        onChanges.options = new i0.SimpleChange(changes.widget.previousValue.options, changes.widget.currentValue.options, false);
                    }
                    if (changes.widget.previousValue.isDisabled !== changes.widget.currentValue.isDisabled) {
                        onChanges.isDisabled = new i0.SimpleChange(changes.widget.previousValue.isDisabled, changes.widget.currentValue.isDisabled, false);
                    }
                    if (Object.keys(onChanges).length) {
                        this.formWidgetComponent.ngOnChanges(onChanges);
                    }
                }
            }
        };
        FormWidgetComponent.prototype.ngOnDestroy = function () {
            this.componentRef.destroy();
            this.componentRef = null;
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        FormWidgetComponent.prototype.isSupportChanges = function (instance) {
            return Boolean(instance.ngOnChanges);
        };
        FormWidgetComponent.prototype.isFocusable = function (instance) {
            return Boolean(instance.focus);
        };
        return FormWidgetComponent;
    }());
    FormWidgetComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormWidgetComponent, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: FormBuilderService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FormWidgetComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormWidgetComponent, selector: "rx-form-widget", inputs: { widget: "widget" }, host: { properties: { "class.isHidden": "this.isHidden" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: '<ng-container #container></ng-container>', isInline: true, styles: [":host{display:block}:host:not(.isHidden){margin-bottom:1rem}:host:last-child{margin-bottom:0}\n"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormWidgetComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-form-widget',
                        template: '<ng-container #container></ng-container>',
                        styleUrls: ['./form-widget.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: FormBuilderService }]; }, propDecorators: { widget: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef, static: true }]
                }], isHidden: [{
                    type: i0.HostBinding,
                    args: ['class.isHidden']
                }] } });

    var FormSectionComponent = /** @class */ (function () {
        function FormSectionComponent() {
            this.controlTypes = FORM_BUILDER.controlTypes;
            this.trackBySectionControls = this.trackBySectionControls.bind(this);
        }
        FormSectionComponent.prototype.trackBySectionControls = function (index, item) {
            return this.guid + item.name || "" + item.component.name || String(index);
        };
        return FormSectionComponent;
    }());
    FormSectionComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormSectionComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    FormSectionComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormSectionComponent, selector: "rx-form-section", inputs: { guid: "guid", section: "section" }, ngImport: i0__namespace, template: "<adapt-accordion *ngIf=\"section.label\">\n  <adapt-accordion-tab [title]=\"section.label\" [isOpen]=\"true\">\n    <ng-container *ngFor=\"let control of section.controls; trackBy: trackBySectionControls\" [ngSwitch]=\"control.type\">\n      <rx-form-outlet\n        *ngSwitchCase=\"controlTypes.formControl\"\n        [formControl]=\"control.formControl\"\n        [control]=\"control\"\n        [hidden]=\"control.hidden\"\n      ></rx-form-outlet>\n      <rx-form-widget *ngSwitchCase=\"controlTypes.widget\" [widget]=\"control\"></rx-form-widget>\n    </ng-container>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<ng-container *ngIf=\"!section.label\">\n  <ng-container *ngFor=\"let control of section.controls; trackBy: trackBySectionControls\" [ngSwitch]=\"control.type\">\n    <rx-form-outlet\n      *ngSwitchCase=\"controlTypes.formControl\"\n      [formControl]=\"control.formControl\"\n      [control]=\"control\"\n      [hidden]=\"control.hidden\"\n    ></rx-form-outlet>\n    <rx-form-widget *ngSwitchCase=\"controlTypes.widget\" [widget]=\"control\"></rx-form-widget>\n  </ng-container>\n</ng-container>\n", components: [{ type: i1__namespace$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: FormOutletComponent, selector: "rx-form-outlet", inputs: ["control"] }, { type: FormWidgetComponent, selector: "rx-form-widget", inputs: ["widget"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormSectionComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-form-section',
                        templateUrl: './form-section.component.html'
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { guid: [{
                    type: i0.Input
                }], section: [{
                    type: i0.Input
                }] } });

    var FormBuilderComponent = /** @class */ (function () {
        function FormBuilderComponent(formBuilderFactory, formBuilder, rxGuidService, formBuilderService) {
            this.formBuilderFactory = formBuilderFactory;
            this.formBuilder = formBuilder;
            this.rxGuidService = rxGuidService;
            this.formBuilderService = formBuilderService;
            this.guid = this.rxGuidService.generate();
            this.modelChange = new i0.EventEmitter();
            this.editorEvent = new i0.EventEmitter();
            this.formInitialized = new i0.EventEmitter();
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.formGroup = this.formBuilder.group({});
            this.subscribeOnFormDataChange();
        }
        FormBuilderComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.focusEditor$) {
                this.focusEditor$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (focusEditorEvent) {
                    _this.formBuilderService.setFocusEditor(focusEditorEvent);
                });
            }
            this.formBuilderService.editorEvent$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (event) {
                _this.editorEvent.emit(event);
            });
        };
        FormBuilderComponent.prototype.ngOnChanges = function (changes) {
            if (changes.model &&
                changes.model.currentValue &&
                !lodash.isEqual(changes.model.currentValue, changes.model.previousValue)) {
                this.updateFormData(changes.model.currentValue);
            }
            if (changes.config) {
                this.prepareLayout(changes.config.currentValue || []);
            }
            if (changes.isReadOnly && changes.isReadOnly.isFirstChange() && changes.isReadOnly.currentValue) {
                this.formGroup.disable();
            }
        };
        FormBuilderComponent.prototype.ngAfterViewInit = function () {
            this.formInitialized.next();
        };
        FormBuilderComponent.prototype.trackByControl = function (index, item) {
            return "" + this.guid + item.label;
        };
        FormBuilderComponent.prototype.ngOnDestroy = function () {
            this.formSubscription.unsubscribe();
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        FormBuilderComponent.prototype.dispatch = function (event) {
            this.formBuilderService.dispatch(event);
        };
        FormBuilderComponent.prototype.updateFormData = function (model) {
            var _this = this;
            this.formSubscription.unsubscribe();
            Object.keys(model).forEach(function (propertyName) { return _this.getFormControlByName(propertyName).setValue(model[propertyName]); });
            Object.keys(this.formGroup.getRawValue())
                .filter(function (propertyName) { return !lodash.has(model, propertyName); })
                .forEach(function (propertyName) { return _this.formGroup.removeControl(propertyName); });
            this.subscribeOnFormDataChange();
        };
        FormBuilderComponent.prototype.prepareLayout = function (config) {
            var _this = this;
            this.layout = {
                controls: config.map(function (section) { return _this.formBuilderFactory.section(Object.assign(Object.assign({}, section), { controls: section.controls.map(function (propertyControlConfig) {
                        var model;
                        if (_this.isFormControl(propertyControlConfig)) {
                            var control = _this.getFormControlByName(propertyControlConfig.name);
                            _this.isReadOnly || propertyControlConfig.isDisabled
                                ? control.disable({ emitEvent: false })
                                : control.enable({ emitEvent: false });
                            model = _this.formBuilderFactory.control(propertyControlConfig, control);
                        }
                        else {
                            model = _this.formBuilderFactory.widget(Object.assign(Object.assign({}, propertyControlConfig), { isDisabled: propertyControlConfig.isDisabled || _this.isReadOnly }));
                        }
                        return model;
                    }) })); })
            };
        };
        FormBuilderComponent.prototype.getFormControlByName = function (name) {
            var control = this.formGroup.controls[name];
            if (!control) {
                var validators_1;
                lodash.forEach(this.config, function (section) {
                    var formControlConfig = lodash.find(section.controls, { name: name });
                    if (formControlConfig) {
                        validators_1 = formControlConfig.validators;
                    }
                    return !formControlConfig;
                });
                control = this.formBuilder.control(null, validators_1 || []);
                this.formGroup.addControl(name, control);
            }
            return control;
        };
        FormBuilderComponent.prototype.subscribeOnFormDataChange = function () {
            var _this = this;
            this.formSubscription = this.formGroup.valueChanges.subscribe(function () {
                // Get a raw value for all form controls including disabled.
                var rawValue = _this.formGroup.getRawValue();
                // Check if rawValue is not an empty object, in this case we don't
                // want to emit model change when current model value is null.
                var formData = lodash.isEmpty(rawValue) ? null : rawValue;
                if (!lodash.isEqual(formData, _this.model)) {
                    _this.modelChange.emit(formData);
                }
            });
        };
        FormBuilderComponent.prototype.isFormControl = function (config) {
            return !!config.name;
        };
        return FormBuilderComponent;
    }());
    FormBuilderComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderComponent, deps: [{ token: FormBuilderFactory }, { token: i2__namespace.FormBuilder }, { token: i1__namespace$3.RxGuidService }, { token: FormBuilderService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FormBuilderComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormBuilderComponent, selector: "rx-form-builder", inputs: { config: "config", model: "model", guid: "guid", isReadOnly: "isReadOnly", focusEditor$: "focusEditor$" }, outputs: { modelChange: "modelChange", editorEvent: "editorEvent", formInitialized: "formInitialized" }, providers: [FormBuilderService], usesOnChanges: true, ngImport: i0__namespace, template: "<form *ngIf=\"layout\">\n  <rx-form-section\n    *ngFor=\"let control of layout.controls; trackBy: trackByControl\"\n    [section]=\"control\"\n    [guid]=\"guid\"\n  ></rx-form-section>\n</form>\n", components: [{ type: FormSectionComponent, selector: "rx-form-section", inputs: ["guid", "section"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormBuilderComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-form-builder',
                        templateUrl: './form-builder.component.html',
                        providers: [FormBuilderService]
                    }]
            }], ctorParameters: function () { return [{ type: FormBuilderFactory }, { type: i2__namespace.FormBuilder }, { type: i1__namespace$3.RxGuidService }, { type: FormBuilderService }]; }, propDecorators: { config: [{
                    type: i0.Input
                }], model: [{
                    type: i0.Input
                }], guid: [{
                    type: i0.Input
                }], isReadOnly: [{
                    type: i0.Input
                }], focusEditor$: [{
                    type: i0.Input
                }], modelChange: [{
                    type: i0.Output
                }], editorEvent: [{
                    type: i0.Output
                }], formInitialized: [{
                    type: i0.Output
                }] } });

    var RxFormBuilderModule = /** @class */ (function () {
        function RxFormBuilderModule() {
        }
        return RxFormBuilderModule;
    }());
    RxFormBuilderModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFormBuilderModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxFormBuilderModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFormBuilderModule, declarations: [FormWidgetComponent, FormOutletComponent, FormBuilderComponent, FormSectionComponent], imports: [i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptAccordionModule], exports: [FormBuilderComponent] });
    RxFormBuilderModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFormBuilderModule, imports: [[i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptAccordionModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFormBuilderModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptAccordionModule],
                        declarations: [FormWidgetComponent, FormOutletComponent, FormBuilderComponent, FormSectionComponent],
                        exports: [FormBuilderComponent]
                    }]
            }] });

    var DateTimeFormControlComponent = /** @class */ (function (_super) {
        __extends(DateTimeFormControlComponent, _super);
        function DateTimeFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.datePickerControl = new i2.FormControl('');
            _this.pickerMode = i1$1.RxDatetimePickerMode.DateTime;
            return _this;
        }
        DateTimeFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.datePickerControl.valueChanges.subscribe(function (value) {
                if (value && !lodash.isNull(value.hours) && !lodash.isNull(value.minutes)) {
                    _this.value = moment__default["default"]([
                        value.year || 0,
                        value.month || 0,
                        value.date || 0,
                        value.hours,
                        value.minutes,
                        value.seconds || 0
                    ]).toISOString();
                }
                else {
                    _this.value = null;
                }
            });
        };
        DateTimeFormControlComponent.prototype.writeValue = function (value) {
            _super.prototype.writeValue.call(this, value);
            var date = moment__default["default"](this.value);
            if (date.isValid()) {
                this.datePickerControl.setValue({
                    year: date.year(),
                    month: date.month(),
                    date: date.date(),
                    hours: date.hour(),
                    minutes: date.minutes()
                });
            }
            else {
                this.datePickerControl.setValue(null);
            }
        };
        return DateTimeFormControlComponent;
    }(ValueAccessor));
    DateTimeFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateTimeFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    DateTimeFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DateTimeFormControlComponent, selector: "rx-date-time-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: DateTimeFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1__namespace$1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateTimeFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-date-time-form-control',
                        templateUrl: './date-time-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: DateTimeFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var DateTimeFormControlModule = /** @class */ (function () {
        function DateTimeFormControlModule() {
        }
        return DateTimeFormControlModule;
    }());
    DateTimeFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateTimeFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DateTimeFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateTimeFormControlModule, declarations: [DateTimeFormControlComponent], imports: [i4.CommonModule, i1$1.AdaptRxDatetimeModule, i2.FormsModule, i2.ReactiveFormsModule], exports: [DateTimeFormControlComponent] });
    DateTimeFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateTimeFormControlModule, imports: [[i4.CommonModule, i1$1.AdaptRxDatetimeModule, i2.FormsModule, i2.ReactiveFormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateTimeFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [DateTimeFormControlComponent],
                        imports: [i4.CommonModule, i1$1.AdaptRxDatetimeModule, i2.FormsModule, i2.ReactiveFormsModule],
                        exports: [DateTimeFormControlComponent],
                        entryComponents: [DateTimeFormControlComponent]
                    }]
            }] });

    var GroupButtonFormControlComponent = /** @class */ (function (_super) {
        __extends(GroupButtonFormControlComponent, _super);
        function GroupButtonFormControlComponent(changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.changeDetectorRef = changeDetectorRef;
            return _this;
        }
        GroupButtonFormControlComponent.prototype.onGroupButtonChange = function (groupButtonValues) {
            var index = lodash.findIndex(groupButtonValues, function (buttonValue) { return buttonValue; });
            this.setValue(this.options.items[index]);
        };
        GroupButtonFormControlComponent.prototype.onWriteValue = function (value) {
            this.updateModel(value);
        };
        GroupButtonFormControlComponent.prototype.updateModel = function (value) {
            this.model = this.options.items.map(function (item) { return item.value === value; });
        };
        GroupButtonFormControlComponent.prototype.setValue = function (item) {
            var _this = this;
            if (this.options.beforeValueChange) {
                this.options.beforeValueChange(this.value, item.value).then(function (response) {
                    if (response) {
                        _this.value = item.value;
                    }
                    else {
                        _this.updateModel(_this.value);
                        _this.adaptButtonGroupComponent.writeValue(_this.model);
                        _this.changeDetectorRef.detectChanges();
                    }
                });
            }
            else {
                this.value = item.value;
            }
        };
        return GroupButtonFormControlComponent;
    }(ValueAccessor));
    GroupButtonFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GroupButtonFormControlComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    GroupButtonFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GroupButtonFormControlComponent, selector: "rx-group-button-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: GroupButtonFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "adaptButtonGroupComponent", first: true, predicate: i1$1.AdaptButtonGroupComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <adapt-rx-control-label\n    [label]=\"options.label\"\n    [showRequiredLabel]=\"!!options.required\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName\n          }\n        : null\n    \"\n  ></adapt-rx-control-label>\n\n  <div class=\"mt-1\">\n    <adapt-button-group\n      [(ngModel)]=\"model\"\n      (ngModelChange)=\"onGroupButtonChange($event)\"\n      [disabled]=\"isDisabled\"\n      [config]=\"options.items\"\n      [size]=\"options.size || 'small'\"\n    >\n    </adapt-button-group>\n  </div>\n</div>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", styles: ["label{display:block}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GroupButtonFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-group-button-form-control',
                        templateUrl: './group-button-form-control.component.html',
                        styleUrls: ['./group-button-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: GroupButtonFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { adaptButtonGroupComponent: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptButtonGroupComponent, { static: true }]
                }], options: [{
                    type: i0.Input
                }] } });

    var GroupButtonFormControlModule = /** @class */ (function () {
        function GroupButtonFormControlModule() {
        }
        return GroupButtonFormControlModule;
    }());
    GroupButtonFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GroupButtonFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    GroupButtonFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GroupButtonFormControlModule, declarations: [GroupButtonFormControlComponent], imports: [i4.CommonModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptButtonGroupModule,
            i1$1.AdaptTooltipModule,
            i2.FormsModule], exports: [GroupButtonFormControlComponent] });
    GroupButtonFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GroupButtonFormControlModule, imports: [[
                i4.CommonModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptButtonGroupModule,
                i1$1.AdaptTooltipModule,
                i2.FormsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GroupButtonFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [GroupButtonFormControlComponent],
                        exports: [GroupButtonFormControlComponent],
                        entryComponents: [GroupButtonFormControlComponent],
                        imports: [
                            i4.CommonModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptButtonGroupModule,
                            i1$1.AdaptTooltipModule,
                            i2.FormsModule
                        ]
                    }]
            }] });

    var IconBrowserDialogComponent = /** @class */ (function () {
        function IconBrowserDialogComponent(activeModalRef, document) {
            var _this = this;
            this.activeModalRef = activeModalRef;
            this.document = document;
            this.config = this.activeModalRef.getData();
            this.searchFormControl = new i2.FormControl();
            this.selectedIcon$ = new rxjs.BehaviorSubject(this.config.selectedIcon);
            this.filteredIcons$ = this.searchFormControl.valueChanges.pipe(operators.debounceTime(200), operators.startWith(''), operators.distinctUntilChanged(), operators.map(function (query) { return query
                ? _this.config.icons.filter(function (_b) {
                    var name = _b.name;
                    return name.toLowerCase().indexOf(query.toLowerCase()) > -1;
                })
                : _this.config.icons; }));
            this.isSelectButtonDisabled$ = rxjs.combineLatest([this.selectedIcon$, this.filteredIcons$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), selectedIcon = _c[0], filteredIcons = _c[1];
                return !selectedIcon || !filteredIcons.length || selectedIcon === _this.config.selectedIcon;
            }));
            this.selectedIndex$ = rxjs.combineLatest([this.selectedIcon$, this.filteredIcons$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), selectedIcon = _c[0], filteredIcons = _c[1];
                return selectedIcon ? filteredIcons.findIndex(function (icon) { return icon.id === selectedIcon.id; }) : null;
            }), operators.distinctUntilChanged());
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        IconBrowserDialogComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            rxjs.fromEvent(this.iconsList.nativeElement, 'keydown')
                .pipe(operators.filter(function (event) { return [keycodes.UP_ARROW, keycodes.DOWN_ARROW, keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW, keycodes.ENTER].includes(event.keyCode); }), operators.tap(function (event) { return event.preventDefault(); }), operators.withLatestFrom(this.filteredIcons$, this.selectedIndex$), operators.takeUntil(this.destroyed$))
                .subscribe(function (_b) {
                var _c = __read(_b, 3), event = _c[0], icons = _c[1], selectedIndex = _c[2];
                // we have to subtract 1px from the icon button width to compensate -1 margin trick in the CSS
                var cellsPerLine = Math.floor(_this.iconsList.nativeElement.clientWidth / (_this.iconButtons.first.nativeElement.offsetWidth - 1));
                var newIndex;
                if ([keycodes.UP_ARROW, keycodes.DOWN_ARROW, keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW].includes(event.keyCode)) {
                    if (lodash.isNumber(selectedIndex)) {
                        switch (event.keyCode) {
                            case keycodes.LEFT_ARROW: {
                                newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
                                break;
                            }
                            case keycodes.UP_ARROW: {
                                newIndex = selectedIndex - cellsPerLine;
                                if (newIndex < 0) {
                                    newIndex = selectedIndex;
                                }
                                break;
                            }
                            case keycodes.RIGHT_ARROW: {
                                newIndex = selectedIndex < icons.length - 1 ? selectedIndex + 1 : selectedIndex;
                                break;
                            }
                            case keycodes.DOWN_ARROW: {
                                newIndex = selectedIndex + cellsPerLine;
                                if (newIndex >= icons.length) {
                                    newIndex = selectedIndex;
                                }
                                break;
                            }
                        }
                    }
                    else {
                        newIndex = 0;
                    }
                    _this.selectIcon(icons[newIndex]);
                    _this.scrollToSelectedIcon();
                }
                else {
                    event.preventDefault();
                    if (_this.selectedIcon$.value) {
                        _this.onSelect();
                    }
                }
            });
            this.scrollToSelectedIcon();
        };
        IconBrowserDialogComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next();
            this.destroyed$.complete();
            this.selectedIcon$.complete();
        };
        IconBrowserDialogComponent.prototype.selectIcon = function (icon) {
            this.selectedIcon$.next(icon);
        };
        IconBrowserDialogComponent.prototype.onSelect = function () {
            this.activeModalRef.close(this.selectedIcon$.value);
        };
        IconBrowserDialogComponent.prototype.onCancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        IconBrowserDialogComponent.prototype.isIconSelected = function (icon) {
            var _a;
            return ((_a = this.selectedIcon$.value) === null || _a === void 0 ? void 0 : _a.id) === icon.id;
        };
        IconBrowserDialogComponent.prototype.scrollToSelectedIcon = function () {
            var _this = this;
            this.selectedIcon$.pipe(operators.take(1)).subscribe(function (selectedIcon) {
                var _a;
                if (selectedIcon) {
                    (_a = _this.iconsList.nativeElement.querySelector(".d-icon-" + selectedIcon.id)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }
            });
        };
        IconBrowserDialogComponent.prototype.trackByFn = function (index, item) {
            return item.id;
        };
        return IconBrowserDialogComponent;
    }());
    IconBrowserDialogComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconBrowserDialogComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i4.DOCUMENT }], target: i0__namespace.ɵɵFactoryTarget.Component });
    IconBrowserDialogComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IconBrowserDialogComponent, selector: "rx-icon-browser-dialog", viewQueries: [{ propertyName: "iconsList", first: true, predicate: ["iconsList"], descendants: true, read: i0.ElementRef }, { propertyName: "iconButtons", predicate: ["iconButton"], descendants: true, read: i0.ElementRef }], ngImport: i0__namespace, template: "<div class=\"modal-body mh-100\">\n  <div class=\"d-flex w-100 h-100\">\n    <ng-container *ngIf=\"filteredIcons$ | async as filteredIcons\">\n      <div class=\"w-100 h-100\">\n        <adapt-rx-search\n          class=\"icon-search-field\"\n          [formControl]=\"searchFormControl\"\n          [autofocus]=\"true\"\n          (keydown)=\"$event.stopPropagation()\"\n        ></adapt-rx-search>\n\n        <div class=\"icons-browser d-flex\">\n          <ul #iconsList class=\"icons-list h-100\" *ngIf=\"filteredIcons?.length; else noIconsFound\" tabindex=\"0\">\n            <li\n              *ngFor=\"let icon of filteredIcons; trackBy: trackByFn\"\n              class=\"icon-list-item\"\n              [class.icon-list-item-selected]=\"isIconSelected(icon)\"\n            >\n              <button\n                #iconButton\n                class=\"icon-button p-0\"\n                tabindex=\"-1\"\n                [ngClass]=\"'d-icon-' + icon.id\"\n                (click)=\"selectIcon(icon)\"\n              >\n                <span class=\"sr-only\">{{ icon.name }}</span>\n              </button>\n            </li>\n          </ul>\n\n          <ng-template #noIconsFound>\n            <div class=\"icon-empty-state flex-grow-1\">\n              <adapt-empty-state class=\"flex-grow-1\" [type]=\"'search'\" [label]=\"'No icons found'\"></adapt-empty-state>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"filteredIcons?.length\"\n        class=\"icon-preview d-flex flex-column justify-content-center align-items-center\"\n      >\n        <ng-container *ngIf=\"selectedIcon$ | async as selectedIcon; else noIconSelected\">\n          <adapt-icon [name]=\"selectedIcon.id\" [testID]=\"selectedIcon.id\"></adapt-icon>\n\n          <p class=\"icon-title mt-1 mb-0\">{{ selectedIcon.name }}</p>\n        </ng-container>\n\n        <ng-template #noIconSelected>\n          <p class=\"no-icon-selected mb-0\">No icon selected</p>\n        </ng-template>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"select-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"isSelectButtonDisabled$ | async\"\n    (click)=\"onSelect()\"\n  >\n    Select\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancel()\">Cancel</button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:645px;overflow:hidden}.modal-body{min-height:calc(100% - 61px)!important;height:calc(100% - 61px)}.icons-browser{display:flex;height:calc(100% - 38px - 15px)}.icon-search-field{display:block;margin-bottom:15px;max-width:853px}.icons-list{display:flex;flex-wrap:wrap;align-content:flex-start;overflow-y:auto;flex-grow:1;list-style:none;padding:1px 0 0;margin:0}.icons-list:focus{outline:none;box-shadow:inset 0 0 0 .2rem #00a79da6}.icon-empty-state{display:flex;align-items:center}.icon-list-item{margin:-1px -1px 0 0}.icon-list-item-selected .icon-button{background:#d6d7d8}.icon-button{width:72px;height:72px;border:1px solid #d6d7d8;background:transparent;font-size:2rem;color:#313538}.icon-button:hover{background:#f0f1f1}.icon-preview{margin-left:15px;margin-top:53px;flex-shrink:0;text-align:center;width:142px;height:143px;border:1px solid #d6d7d8;padding:10px 0}.icon-preview adapt-icon{font-size:70px;line-height:70px}.icon-preview .icon-title{color:#626668;max-height:40px;overflow:hidden}.no-icon-selected{font-size:.875rem;color:#626668}\n"], components: [{ type: i1__namespace$1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1__namespace$1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i4__namespace.AsyncPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconBrowserDialogComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-icon-browser-dialog',
                        templateUrl: './icon-browser-dialog.component.html',
                        styleUrls: ['./icon-browser-dialog.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace$1.ActiveModalRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i4.DOCUMENT]
                        }] }];
        }, propDecorators: { iconButtons: [{
                    type: i0.ViewChildren,
                    args: ['iconButton', { read: i0.ElementRef }]
                }], iconsList: [{
                    type: i0.ViewChild,
                    args: ['iconsList', { read: i0.ElementRef }]
                }] } });

    var IconPickerFormControlComponent = /** @class */ (function (_super) {
        __extends(IconPickerFormControlComponent, _super);
        function IconPickerFormControlComponent(adaptModalService, renderer) {
            var _this = _super.call(this) || this;
            _this.adaptModalService = adaptModalService;
            _this.renderer = renderer;
            _this.focus$ = new rxjs.Subject();
            _this.iconGlyphs = iconFontConfig__default["default"].glyphs;
            _this.search = function (text$) {
                var userInput$ = text$.pipe(operators.debounceTime(200), operators.distinctUntilChanged());
                var inputFocus$ = _this.focus$.pipe(operators.map(function (event) { return event.target.value; }));
                return rxjs.merge(userInput$, inputFocus$).pipe(operators.map(function (term) { return term
                    ? _this.iconGlyphs.filter(function (_a) {
                        var name = _a.name;
                        return name.toLowerCase().indexOf(term.toLowerCase()) > -1;
                    })
                    : _this.iconGlyphs; }));
            };
            return _this;
        }
        IconPickerFormControlComponent.prototype.ngOnInit = function () {
            this.iconGlyphs = lodash.sortBy(this.iconGlyphs, function (glyph) { return glyph.name.toLowerCase(); });
        };
        IconPickerFormControlComponent.prototype.inputFormatter = function (option) {
            return option.name;
        };
        IconPickerFormControlComponent.prototype.onSelectItem = function (event) {
            this.value = event.item.id;
        };
        IconPickerFormControlComponent.prototype.onWriteValue = function (value) {
            var iconId = lodash.get(i3$1.RX_LEGACY_ICONS, value, value);
            if (!this.selectedIcon || this.selectedIcon.id !== iconId) {
                this.selectedIcon = this.iconGlyphs.find(function (icon) { return icon.id === iconId; });
            }
        };
        IconPickerFormControlComponent.prototype.onFocus = function (event) {
            this.focus$.next(event);
        };
        IconPickerFormControlComponent.prototype.onBlur = function () {
            var _this = this;
            this.selectedIcon = this.iconGlyphs.find(function (icon) { return icon.id === _this.value; });
            var inputValue = this.typeahead.inputRef.nativeElement.value;
            if (!inputValue || !this.selectedIcon) {
                this.value = '';
                this.onWriteValue(this.value);
                this.renderer.setProperty(this.typeahead.inputRef.nativeElement, 'value', '');
            }
        };
        IconPickerFormControlComponent.prototype.openIconBrowserDialog = function () {
            var _this = this;
            this.adaptModalService
                .open({
                title: 'Select icon',
                data: {
                    selectedIcon: this.selectedIcon,
                    icons: this.iconGlyphs
                },
                content: IconBrowserDialogComponent
            })
                .then(function (selectedIcon) {
                _this.value = selectedIcon.id;
                _this.selectedIcon = selectedIcon;
            })
                .catch(lodash.noop);
        };
        return IconPickerFormControlComponent;
    }(ValueAccessor));
    IconPickerFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconPickerFormControlComponent, deps: [{ token: i1__namespace$1.AdaptModalService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    IconPickerFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IconPickerFormControlComponent, selector: "rx-icon-picker-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: IconPickerFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "typeahead", first: true, predicate: i1$1.AdaptRxTypeaheadComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"d-flex justify-content-between align-items-center pb-1\">\n  <label class=\"form-control-label mb-0\">{{ options.label }}</label>\n\n  <button\n    *ngIf=\"!isDisabled\"\n    adapt-button\n    type=\"button\"\n    class=\"p-0 border-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"browse-button\"\n    (click)=\"openIconBrowserDialog()\"\n  >\n    <span class=\"d-icon-folder_open\"></span>\n    Browse\n  </button>\n</div>\n\n<div class=\"control-wrapper d-flex\">\n  <adapt-rx-typeahead\n    class=\"w-100\"\n    [class.has-selected-icon]=\"selectedIcon\"\n    rx-id=\"input-field\"\n    [required]=\"options.required\"\n    [disabled]=\"isDisabled\"\n    [appendToBody]=\"options.appendToBody\"\n    [typeahead]=\"search\"\n    [inputFormatter]=\"inputFormatter\"\n    [resultTemplate]=\"resultTemplate\"\n    [virtualScroll]=\"true\"\n    [(ngModel)]=\"selectedIcon\"\n    (onSelectItem)=\"onSelectItem($event)\"\n    (onFocus)=\"onFocus($event)\"\n    (onBlur)=\"onBlur()\"\n    [title]=\"selectedIcon?.name ?? ''\"\n  ></adapt-rx-typeahead>\n  <adapt-icon\n    *ngIf=\"selectedIcon\"\n    class=\"icon-preview\"\n    [name]=\"selectedIcon.id\"\n    [testID]=\"selectedIcon.id\"\n  ></adapt-icon>\n</div>\n\n<ng-template #resultTemplate let-result=\"result\">\n  <span class=\"icon-item\" [ngClass]=\"'d-icon-left-' + result.id\"></span>\n  {{ result.name }}\n</ng-template>\n", styles: [".icon-item{display:inline-block;width:22px;margin-right:4px;text-align:center}.control-wrapper{position:relative}.icon-preview{position:absolute;top:50%;left:17px;transform:translateY(-50%);pointer-events:none}::ng-deep adapt-rx-typeahead.has-selected-icon .form-control{padding-left:42px;padding-right:32px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptRxTypeaheadComponent, selector: "adapt-rx-typeahead", inputs: ["autocomplete", "placeholder", "editable", "focusFirst", "restoreFocusAfterClose", "inputFormatter", "typeahead", "resultFormatter", "resultTemplate", "showHint", "placement", "appendToBody", "size", "popupMaxHeight", "disabledStyleForReadonlyState", "virtualScroll", "virtualScrollItemSize", "minBufferPx", "maxBufferPx", "virtualScrollDropdownHeight", "popupClass", "popupWidth", "mobileFocusAutoscrollTopOffset", "showEmptyResultMessage", "resultStatusMessage", "showClearButton", "clearButtonText"], outputs: ["onSelectItem"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconPickerFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-icon-picker-form-control',
                        templateUrl: './icon-picker-form-control.component.html',
                        styleUrls: ['./icon-picker-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: IconPickerFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.AdaptModalService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], typeahead: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptRxTypeaheadComponent, { static: true }]
                }] } });

    var IconBrowserDialogModule = /** @class */ (function () {
        function IconBrowserDialogModule() {
        }
        return IconBrowserDialogModule;
    }());
    IconBrowserDialogModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconBrowserDialogModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    IconBrowserDialogModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconBrowserDialogModule, declarations: [IconBrowserDialogComponent], imports: [i4.CommonModule,
            i2.ReactiveFormsModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptRxSearchModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptEmptyStateModule], exports: [IconBrowserDialogComponent] });
    IconBrowserDialogModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconBrowserDialogModule, imports: [[
                i4.CommonModule,
                i2.ReactiveFormsModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptRxSearchModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptEmptyStateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconBrowserDialogModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i2.ReactiveFormsModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptRxSearchModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptEmptyStateModule
                        ],
                        declarations: [IconBrowserDialogComponent],
                        exports: [IconBrowserDialogComponent]
                    }]
            }] });

    var IconPickerFormControlModule = /** @class */ (function () {
        function IconPickerFormControlModule() {
        }
        return IconPickerFormControlModule;
    }());
    IconPickerFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconPickerFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    IconPickerFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconPickerFormControlModule, declarations: [IconPickerFormControlComponent], imports: [i4.CommonModule,
            i2.FormsModule,
            i2.ReactiveFormsModule,
            i1$1.AdaptRxTypeaheadModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptIconModule,
            IconBrowserDialogModule], exports: [IconPickerFormControlComponent] });
    IconPickerFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconPickerFormControlModule, imports: [[
                i4.CommonModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i1$1.AdaptRxTypeaheadModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptIconModule,
                IconBrowserDialogModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IconPickerFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i2.FormsModule,
                            i2.ReactiveFormsModule,
                            i1$1.AdaptRxTypeaheadModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptIconModule,
                            IconBrowserDialogModule
                        ],
                        declarations: [IconPickerFormControlComponent],
                        exports: [IconPickerFormControlComponent]
                    }]
            }] });

    var InputListFormControlComponent = /** @class */ (function (_super) {
        __extends(InputListFormControlComponent, _super);
        function InputListFormControlComponent(formBuilder) {
            var _this = _super.call(this) || this;
            _this.formBuilder = formBuilder;
            _this.formArray = _this.formBuilder.array([]);
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        InputListFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.formArray.valueChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () {
                if (_this.formArray.controls.length) {
                    _this.value = _this.formArray.getRawValue();
                }
                else {
                    _this.value = null;
                }
            });
        };
        InputListFormControlComponent.prototype.addItem = function () {
            this.formArray.push(new i2.FormControl(''));
        };
        InputListFormControlComponent.prototype.removeItem = function (index) {
            this.formArray.removeAt(index);
        };
        InputListFormControlComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        return InputListFormControlComponent;
    }(ValueAccessor));
    InputListFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InputListFormControlComponent, deps: [{ token: i2__namespace.FormBuilder }], target: i0__namespace.ɵɵFactoryTarget.Component });
    InputListFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InputListFormControlComponent, selector: "rx-input-list-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: InputListFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\">\n  <div class=\"d-flex flex-row justify-content-between align-items-center\">\n    <adapt-rx-control-label [label]=\"options.label\" [showRequiredLabel]=\"options.required\"></adapt-rx-control-label>\n\n    <button adapt-button type=\"button\" btn-type=\"tertiary\" size=\"small\" (click)=\"addItem()\">\n      <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n      Add item\n    </button>\n  </div>\n\n  <div\n    class=\"d-flex flex-row align-items-center w-100 form-group\"\n    *ngFor=\"let control of formArray.controls; let i = index\"\n  >\n    <adapt-rx-textfield class=\"flex-fill\" [formControl]=\"control\"></adapt-rx-textfield>\n    <button\n      (click)=\"removeItem(i)\"\n      class=\"close position-relative ml-2\"\n      type=\"button\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.remove.label' | translate\"\n    ></button>\n  </div>\n</div>\n", components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InputListFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-input-list-form-control',
                        templateUrl: './input-list-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: InputListFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.FormBuilder }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var InputListFormControlModule = /** @class */ (function () {
        function InputListFormControlModule() {
        }
        return InputListFormControlModule;
    }());
    InputListFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InputListFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    InputListFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InputListFormControlModule, declarations: [InputListFormControlComponent], imports: [i4.CommonModule,
            i1$1.AdaptRxLabelModule,
            i2.ReactiveFormsModule,
            i1$1.AdaptButtonModule,
            i4$1.TranslateModule,
            i1$1.AdaptRxTextfieldModule], exports: [InputListFormControlComponent] });
    InputListFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InputListFormControlModule, imports: [[
                i4.CommonModule,
                i1$1.AdaptRxLabelModule,
                i2.ReactiveFormsModule,
                i1$1.AdaptButtonModule,
                i4$1.TranslateModule,
                i1$1.AdaptRxTextfieldModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InputListFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [InputListFormControlComponent],
                        exports: [InputListFormControlComponent],
                        imports: [
                            i4.CommonModule,
                            i1$1.AdaptRxLabelModule,
                            i2.ReactiveFormsModule,
                            i1$1.AdaptButtonModule,
                            i4$1.TranslateModule,
                            i1$1.AdaptRxTextfieldModule
                        ]
                    }]
            }] });

    var LabelFormControlComponent = /** @class */ (function (_super) {
        __extends(LabelFormControlComponent, _super);
        function LabelFormControlComponent(translateService) {
            var _this = _super.call(this) || this;
            _this.translateService = translateService;
            return _this;
        }
        LabelFormControlComponent.prototype.ngOnInit = function () {
            this.label = this.options.labelKey ? this.translateService.instant(this.options.labelKey) : this.options.label;
        };
        return LabelFormControlComponent;
    }(ValueAccessor));
    LabelFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LabelFormControlComponent, deps: [{ token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    LabelFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LabelFormControlComponent, selector: "rx-label-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: LabelFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-control-label [label]=\"label\"></adapt-rx-control-label>\n", components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LabelFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-label-form-control',
                        templateUrl: './label-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: LabelFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace$1.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var LabelFormControlModule = /** @class */ (function () {
        function LabelFormControlModule() {
        }
        return LabelFormControlModule;
    }());
    LabelFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LabelFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    LabelFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LabelFormControlModule, declarations: [LabelFormControlComponent], imports: [i1$1.AdaptRxLabelModule, i4$1.TranslateModule], exports: [LabelFormControlComponent] });
    LabelFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LabelFormControlModule, imports: [[i1$1.AdaptRxLabelModule, i4$1.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LabelFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [LabelFormControlComponent],
                        exports: [LabelFormControlComponent],
                        entryComponents: [LabelFormControlComponent],
                        imports: [i1$1.AdaptRxLabelModule, i4$1.TranslateModule]
                    }]
            }] });

    var ListItemComponent = /** @class */ (function () {
        function ListItemComponent() {
            this.events = new i0.EventEmitter();
        }
        ListItemComponent.prototype.ngOnInit = function () {
            this.options = {
                label: this.config.label,
                dataDictionary$: this.config.dataDictionary$,
                operators: this.config.operators
            };
        };
        return ListItemComponent;
    }());
    ListItemComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListItemComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ListItemComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ListItemComponent, selector: "rx-list-item", inputs: { config: "config", propertyPath: "propertyPath", control: "control" }, outputs: { events: "events" }, ngImport: i0__namespace, template: "<adapt-rx-textfield *ngIf=\"!config.dataDictionary$\" [label]=\"config.label\" [formControl]=\"control\">\n</adapt-rx-textfield>\n\n<rx-expression-form-control\n  *ngIf=\"config.dataDictionary$\"\n  [formControl]=\"control\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"options\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", components: [{ type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListItemComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-list-item',
                        templateUrl: './list-item.component.html'
                    }]
            }], propDecorators: { config: [{
                    type: i0.Input
                }], propertyPath: [{
                    type: i0.Input
                }], control: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var ListFormControlComponent = /** @class */ (function (_super) {
        __extends(ListFormControlComponent, _super);
        function ListFormControlComponent(formBuilder, stringService) {
            var _this = _super.call(this) || this;
            _this.formBuilder = formBuilder;
            _this.stringService = stringService;
            _this.events = new i0.EventEmitter();
            _this.itemList = _this.formBuilder.array([]);
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        ListFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.itemList.valueChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (value) {
                _this.value = value;
            });
        };
        ListFormControlComponent.prototype.setDisabledState = function (isDisabled) {
            _super.prototype.setDisabledState.call(this, isDisabled);
            if (isDisabled) {
                this.itemList.disable();
            }
            else {
                this.itemList.enable();
            }
        };
        ListFormControlComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.clearItems();
        };
        ListFormControlComponent.prototype.onWriteValue = function (modelValue) {
            var _this = this;
            if (!lodash.isEqual(modelValue, this.itemList.value)) {
                this.clearItems();
                // initialize values
                lodash.forEach(modelValue, function (item) { return _this.addItem(item); });
            }
        };
        ListFormControlComponent.prototype.clearItems = function () {
            this.itemList.clear();
        };
        ListFormControlComponent.prototype.addItem = function (item) {
            var itemControl = this.createItemFormGroup(item);
            this.itemList.push(itemControl);
        };
        ListFormControlComponent.prototype.createItemFormGroup = function (item) {
            var formGroupData = {};
            this.options.items.forEach(function (i) {
                formGroupData[i.propertyName] = item[i.propertyName] || null;
            });
            return this.formBuilder.group(formGroupData);
        };
        ListFormControlComponent.prototype.onItemRemove = function (index) {
            this.itemList.removeAt(index);
        };
        ListFormControlComponent.prototype.onAddItem = function () {
            this.addItem({});
        };
        return ListFormControlComponent;
    }(ValueAccessor));
    ListFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListFormControlComponent, deps: [{ token: i2__namespace.FormBuilder }, { token: i1__namespace$3.RxStringService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ListFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ListFormControlComponent, selector: "rx-list-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: ListFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div [formGroup]=\"itemList\">\n  <button\n    (click)=\"onAddItem()\"\n    type=\"button\"\n    class=\"btn btn-sm btn-link px-0 py-0\"\n    [attr.rx-id]=\"'add-item-button'\"\n    *ngIf=\"!isDisabled\"\n  >\n    <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n    {{ options.addItemText }}\n  </button>\n\n  <div class=\"card mt-2\" *ngFor=\"let itemFormGroup of itemList.controls; let i = index\">\n    <div class=\"card-block p-3\">\n      <button\n        *ngIf=\"!isDisabled\"\n        (click)=\"onItemRemove(i)\"\n        class=\"close position-relative\"\n        type=\"button\"\n        aria-label=\"Remove\"\n      ></button>\n\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{ 'mb-0': last, 'mb-3': !last }\"\n        *ngFor=\"let item of options.items; let first = first; let last = last\"\n        [attr.rx-id]=\"stringService.toRxId(item.label)\"\n      >\n        <rx-list-item\n          [config]=\"item\"\n          [control]=\"itemFormGroup.get(item.propertyName)\"\n          [propertyPath]=\"this.propertyPath + '[' + i + '].' + item.propertyName\"\n          (events)=\"events.emit($event)\"\n        >\n        </rx-list-item>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"isDisabled && options.emptyListText && itemList.controls.length === 0\">{{ options.emptyListText }}</div>\n</div>\n", styles: [".close{z-index:1}\n"], components: [{ type: ListItemComponent, selector: "rx-list-item", inputs: ["config", "propertyPath", "control"], outputs: ["events"] }], directives: [{ type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-list-form-control',
                        templateUrl: './list-form-control.component.html',
                        styleUrls: ['./list-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: ListFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.FormBuilder }, { type: i1__namespace$3.RxStringService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], propertyPath: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var ListFormControlModule = /** @class */ (function () {
        function ListFormControlModule() {
        }
        return ListFormControlModule;
    }());
    ListFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ListFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListFormControlModule, declarations: [ListFormControlComponent, ListItemComponent], imports: [i4.CommonModule, i2.ReactiveFormsModule, i1$1.AdaptRxTextfieldModule, ExpressionFormControlModule], exports: [ListFormControlComponent] });
    ListFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListFormControlModule, imports: [[i4.CommonModule, i2.ReactiveFormsModule, i1$1.AdaptRxTextfieldModule, ExpressionFormControlModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ListFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ListFormControlComponent, ListItemComponent],
                        exports: [ListFormControlComponent],
                        entryComponents: [ListFormControlComponent],
                        imports: [i4.CommonModule, i2.ReactiveFormsModule, i1$1.AdaptRxTextfieldModule, ExpressionFormControlModule]
                    }]
            }] });

    var OptionalExpressionControlComponent = /** @class */ (function (_super) {
        __extends(OptionalExpressionControlComponent, _super);
        function OptionalExpressionControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.events = new i0.EventEmitter();
            _this.modelValues = {
                disable: '0',
                enable: '1'
            };
            _this.selectValues = {
                all: 'all',
                condition: 'condition'
            };
            _this.selectOptions = [
                {
                    id: _this.selectValues.all,
                    name: 'At all times'
                },
                {
                    id: _this.selectValues.condition,
                    name: 'When condition is true'
                }
            ];
            _this.selectedCondition = [lodash.head(_this.selectOptions)];
            return _this;
        }
        OptionalExpressionControlComponent.prototype.ngOnInit = function () {
            this.expressionFieldOptions = {
                label: 'Condition',
                expressionEditorPropertyName: this.options.expressionEditorPropertyName || lodash.upperFirst(this.propertyPath),
                dataDictionary$: this.options.dataDictionary$,
                operators: this.options.operators
            };
        };
        OptionalExpressionControlComponent.prototype.onWriteValue = function (modelValue) {
            this.conditionValue = '';
            this.selectedCondition = [lodash.head(this.selectOptions)];
            if (modelValue === this.modelValues.enable) {
                this.checkbox = true;
            }
            else if (modelValue === this.modelValues.disable) {
                this.checkbox = false;
            }
            else {
                this.checkbox = true;
                this.selectedCondition = [lodash.last(this.selectOptions)];
                this.conditionValue = modelValue;
            }
        };
        OptionalExpressionControlComponent.prototype.onSwitcherChange = function (modelValue) {
            this.selectedCondition = [lodash.head(this.selectOptions)];
            this.conditionValue = '';
            this.value = modelValue ? this.modelValues.enable : this.modelValues.disable;
        };
        OptionalExpressionControlComponent.prototype.onSelectChange = function (selectedValue) {
            this.selectedCondition = selectedValue;
            this.conditionValue = '';
            this.value = lodash.head(selectedValue).id === this.selectValues.all ? this.modelValues.enable : '';
        };
        OptionalExpressionControlComponent.prototype.onConditionChange = function (expressionValue) {
            this.value = expressionValue;
        };
        OptionalExpressionControlComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        return OptionalExpressionControlComponent;
    }(ValueAccessor));
    OptionalExpressionControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    OptionalExpressionControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalExpressionControlComponent, selector: "rx-optional-expression-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: OptionalExpressionControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-control-label [label]=\"options.label\"></adapt-rx-control-label>\n\n<div class=\"clearfix\">\n  <adapt-rx-switch\n    [(ngModel)]=\"checkbox\"\n    (ngModelChange)=\"onSwitcherChange($event)\"\n    [disabled]=\"isDisabled\"\n  ></adapt-rx-switch>\n\n  <adapt-rx-select\n    *ngIf=\"checkbox\"\n    class=\"condition-select\"\n    [options]=\"selectOptions\"\n    [ngModel]=\"selectedCondition\"\n    (ngModelChange)=\"onSelectChange($event)\"\n    [disabled]=\"isDisabled\"\n    [optionFormatter]=\"optionFormatter\"\n  ></adapt-rx-select>\n</div>\n\n<rx-expression-form-control\n  *ngIf=\"selectedCondition[0].id === selectValues.condition\"\n  [options]=\"expressionFieldOptions\"\n  [propertyPath]=\"this.propertyPath\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"conditionValue\"\n  (ngModelChange)=\"onConditionChange($event)\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", styles: [".condition-select{width:165px;float:right;margin-bottom:0;margin-top:2px}adapt-select ::ng-deep .dropdown_select__menu{left:auto;right:0}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-optional-expression-form-control',
                        templateUrl: './optional-expression-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: OptionalExpressionControlComponent,
                                multi: true
                            }
                        ],
                        styleUrls: ['./optional-expression-control.component.scss']
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], propertyPath: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var OptionalExpressionControlModule = /** @class */ (function () {
        function OptionalExpressionControlModule() {
        }
        return OptionalExpressionControlModule;
    }());
    OptionalExpressionControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OptionalExpressionControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionControlModule, declarations: [OptionalExpressionControlComponent], imports: [i4.CommonModule,
            i2.FormsModule,
            i1$1.AdaptRxSwitchModule,
            obsolete.AdaptTextFieldModule,
            ExpressionFormControlModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptRxSelectModule], exports: [OptionalExpressionControlComponent] });
    OptionalExpressionControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionControlModule, imports: [[
                i4.CommonModule,
                i2.FormsModule,
                i1$1.AdaptRxSwitchModule,
                obsolete.AdaptTextFieldModule,
                ExpressionFormControlModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptRxSelectModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [OptionalExpressionControlComponent],
                        exports: [OptionalExpressionControlComponent],
                        entryComponents: [OptionalExpressionControlComponent],
                        imports: [
                            i4.CommonModule,
                            i2.FormsModule,
                            i1$1.AdaptRxSwitchModule,
                            obsolete.AdaptTextFieldModule,
                            ExpressionFormControlModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptRxSelectModule
                        ]
                    }]
            }] });

    var OptionalSelectFormControlComponent = /** @class */ (function (_super) {
        __extends(OptionalSelectFormControlComponent, _super);
        function OptionalSelectFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.switcherValue = false;
            _this.selectValue = [];
            return _this;
        }
        OptionalSelectFormControlComponent.prototype.onSwitcherChange = function (newValue) {
            this.switcherValue = newValue;
            if (newValue) {
                var option = lodash.head(this.options.options);
                if (option && !this.value) {
                    this.value = option.id;
                }
            }
            else {
                this.value = null;
            }
        };
        OptionalSelectFormControlComponent.prototype.onWriteValue = function (value) {
            this.switcherValue = !lodash.isNull(value);
            this.selectValue = this.value ? [this.options.options.find(function (option) { return option.id === value; })] : [];
        };
        OptionalSelectFormControlComponent.prototype.onSelectionChange = function (value) {
            this.value = lodash.head(value).id;
        };
        OptionalSelectFormControlComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        return OptionalSelectFormControlComponent;
    }(ValueAccessor));
    OptionalSelectFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalSelectFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    OptionalSelectFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalSelectFormControlComponent, selector: "rx-optional-select-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: OptionalSelectFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex\">\n    <div class=\"mr-2\">\n      <adapt-rx-switch\n        [ngModel]=\"switcherValue\"\n        (ngModelChange)=\"onSwitcherChange($event)\"\n        [disabled]=\"isDisabled\"\n      ></adapt-rx-switch>\n    </div>\n\n    <adapt-rx-select\n      class=\"mb-0 w-100\"\n      *ngIf=\"switcherValue\"\n      [disabled]=\"isDisabled\"\n      [options]=\"options.options\"\n      [required]=\"options.required\"\n      [ngModel]=\"selectValue\"\n      (ngModelChange)=\"onSelectionChange($event)\"\n      [optionFormatter]=\"optionFormatter\"\n    >\n    </adapt-rx-select>\n  </div>\n</div>\n", components: [{ type: i1__namespace$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalSelectFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-optional-select-form-control',
                        templateUrl: './optional-select-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: OptionalSelectFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var OptionalSelectFormControlModule = /** @class */ (function () {
        function OptionalSelectFormControlModule() {
        }
        return OptionalSelectFormControlModule;
    }());
    OptionalSelectFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalSelectFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OptionalSelectFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalSelectFormControlModule, declarations: [OptionalSelectFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptRxSwitchModule, i1$1.AdaptRxSelectModule], exports: [OptionalSelectFormControlComponent] });
    OptionalSelectFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalSelectFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptRxSwitchModule, i1$1.AdaptRxSelectModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalSelectFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, i1$1.AdaptRxSwitchModule, i1$1.AdaptRxSelectModule],
                        exports: [OptionalSelectFormControlComponent],
                        declarations: [OptionalSelectFormControlComponent],
                        entryComponents: [OptionalSelectFormControlComponent]
                    }]
            }] });

    var StepperWithUnitsFormControlComponent = /** @class */ (function (_super) {
        __extends(StepperWithUnitsFormControlComponent, _super);
        function StepperWithUnitsFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.stepperOptions = {};
            _this.stepperValue = null;
            _this.unitValue = [];
            _this.stepperValueByUnitsCache = {};
            return _this;
        }
        Object.defineProperty(StepperWithUnitsFormControlComponent.prototype, "unit", {
            get: function () {
                return this.unitValue;
            },
            set: function (value) {
                var unitValueId = lodash.head(value).id;
                this.unitValue = value;
                this.updateStepperConfig(unitValueId);
                this.stepperValue = this.stepperValueByUnitsCache.hasOwnProperty(unitValueId)
                    ? this.stepperValueByUnitsCache[unitValueId]
                    : this.stepperOptions.defaultValue;
                this.value = this.stepperValue ? this.stepperValue + unitValueId : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StepperWithUnitsFormControlComponent.prototype, "stepper", {
            get: function () {
                return this.stepperValue;
            },
            set: function (value) {
                this.stepperValue = value;
                this.stepperValueByUnitsCache[lodash.head(this.unit).id] = value;
                this.value = !lodash.isNil(value) && !lodash.isNaN(value) && this.unitValue.length ? value + lodash.head(this.unitValue).id : null;
            },
            enumerable: false,
            configurable: true
        });
        StepperWithUnitsFormControlComponent.prototype.writeValue = function (value) {
            var _a;
            if (value) {
                var numberValue = value.match(/^[+-]?\d+(\.\d+)?/);
                this.stepperValue = numberValue ? Number(lodash.head(numberValue)) : null;
                if (lodash.size(this.options.units)) {
                    var regExpString = lodash.map(this.options.units, 'id').join('|');
                    var unitId = lodash.head(value.match(new RegExp(regExpString)));
                    if (unitId) {
                        this.unitValue = [lodash.find(this.options.units, { id: unitId })];
                        this.stepperValueByUnitsCache[unitId] = this.stepperValue;
                        this.updateStepperConfig(unitId);
                    }
                }
                else {
                    this.unitValue = [];
                }
            }
            else {
                if (this.unitValue.length) {
                    this.stepperValue = null;
                }
                else {
                    var defaultUnit = (_a = lodash.find(this.options.units, { id: this.options.defaultUnit })) !== null && _a !== void 0 ? _a : lodash.head(this.options.units);
                    this.unitValue = [defaultUnit];
                    this.updateStepperConfig(defaultUnit.id);
                    this.stepperValue = this.stepperOptions.defaultValue;
                }
            }
        };
        StepperWithUnitsFormControlComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        StepperWithUnitsFormControlComponent.prototype.updateStepperConfig = function (unitId) {
            this.stepperOptions = this.options.stepperOptionByUnits ? this.options.stepperOptionByUnits[unitId] : {};
            this.maxValue = lodash.isUndefined(this.stepperOptions.maxValue) ? Number.MAX_SAFE_INTEGER : this.stepperOptions.maxValue;
            this.minValue = lodash.isUndefined(this.stepperOptions.minValue) ? Number.MIN_SAFE_INTEGER : this.stepperOptions.minValue;
        };
        return StepperWithUnitsFormControlComponent;
    }(ValueAccessor));
    StepperWithUnitsFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: StepperWithUnitsFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    StepperWithUnitsFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: StepperWithUnitsFormControlComponent, selector: "rx-stepper-with-units-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: StepperWithUnitsFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex flex-row\">\n    <div class=\"control\">\n      <adapt-rx-counter\n        [min]=\"minValue\"\n        [max]=\"maxValue\"\n        [adaptMin]=\"minValue\"\n        [adaptMax]=\"maxValue\"\n        [required]=\"options.required\"\n        [disabled]=\"isDisabled\"\n        [(ngModel)]=\"stepper\"\n        [step]=\"options.step || 1\"\n        adaptIntegerNumber\n      >\n      </adapt-rx-counter>\n    </div>\n\n    <div class=\"control ml-1\">\n      <adapt-rx-select\n        [options]=\"options.units\"\n        [disabled]=\"isDisabled\"\n        [(ngModel)]=\"unit\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</div>\n", styles: [".control{flex:1}\n"], components: [{ type: i1__namespace$1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i1__namespace$1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1__namespace$1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: StepperWithUnitsFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-stepper-with-units-form-control',
                        templateUrl: './stepper-with-units-form-control.component.html',
                        styleUrls: ['./stepper-with-units-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: StepperWithUnitsFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var StepperWithUnitsFormControlModule = /** @class */ (function () {
        function StepperWithUnitsFormControlModule() {
        }
        return StepperWithUnitsFormControlModule;
    }());
    StepperWithUnitsFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: StepperWithUnitsFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    StepperWithUnitsFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: StepperWithUnitsFormControlModule, declarations: [StepperWithUnitsFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSelectModule, i1$1.AdaptRxCounterModule, i1$1.AdaptRxValidatorsModule], exports: [StepperWithUnitsFormControlComponent] });
    StepperWithUnitsFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: StepperWithUnitsFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSelectModule, i1$1.AdaptRxCounterModule, i1$1.AdaptRxValidatorsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: StepperWithUnitsFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSelectModule, i1$1.AdaptRxCounterModule, i1$1.AdaptRxValidatorsModule],
                        declarations: [StepperWithUnitsFormControlComponent],
                        exports: [StepperWithUnitsFormControlComponent],
                        entryComponents: [StepperWithUnitsFormControlComponent]
                    }]
            }] });

    var SwitchFormControlComponent = /** @class */ (function (_super) {
        __extends(SwitchFormControlComponent, _super);
        function SwitchFormControlComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SwitchFormControlComponent;
    }(ValueAccessor));
    SwitchFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SwitchFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    SwitchFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SwitchFormControlComponent, selector: "rx-switcher-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: SwitchFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\">\n  <adapt-rx-control-label\n    *ngIf=\"options.label\"\n    [label]=\"options.label\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName\n          }\n        : null\n    \"\n  >\n  </adapt-rx-control-label>\n\n  <ng-template #popoverContent>\n    <span [innerHtml]=\"options.tooltip.content\"></span>\n  </ng-template>\n\n  <adapt-rx-switch [(ngModel)]=\"value\" [label]=\"options.description\" [disabled]=\"isDisabled\"></adapt-rx-switch>\n</div>\n", styles: ["label{display:block}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SwitchFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-switcher-form-control',
                        templateUrl: './switch-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: SwitchFormControlComponent,
                                multi: true
                            }
                        ],
                        styleUrls: ['./switch-form-control.component.scss']
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var SwitchFormControlModule = /** @class */ (function () {
        function SwitchFormControlModule() {
        }
        return SwitchFormControlModule;
    }());
    SwitchFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SwitchFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SwitchFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SwitchFormControlModule, declarations: [SwitchFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSwitchModule, i1$1.AdaptRxLabelModule], exports: [SwitchFormControlComponent] });
    SwitchFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SwitchFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSwitchModule, i1$1.AdaptRxLabelModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SwitchFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [SwitchFormControlComponent],
                        exports: [SwitchFormControlComponent],
                        entryComponents: [SwitchFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxSwitchModule, i1$1.AdaptRxLabelModule]
                    }]
            }] });

    var TagsFormControlComponent = /** @class */ (function (_super) {
        __extends(TagsFormControlComponent, _super);
        function TagsFormControlComponent(rxStringService, renderer) {
            var _this = _super.call(this) || this;
            _this.rxStringService = rxStringService;
            _this.renderer = renderer;
            _this.autocompleteSearchBound = _this.autocompleteSearch.bind(_this);
            return _this;
        }
        TagsFormControlComponent.prototype.focus = function () {
            // @ts-ignore
            this.renderer.selectRootElement(this.adaptTagField.adaptRxTypeaheadComponent.inputRef.nativeElement, true).focus();
        };
        TagsFormControlComponent.prototype.onTagsModelChange = function (tags) {
            this.tags = tags;
            this.value = this.getStringFromTags(tags);
        };
        TagsFormControlComponent.prototype.onWriteValue = function (value) {
            this.tags = this.getTagsFromString(value);
        };
        TagsFormControlComponent.prototype.getStringFromTags = function (tags) {
            var _this = this;
            if (lodash.isEmpty(tags)) {
                return null;
            }
            var tagsString = tags.map(function (tag) { return (_this.isAutocompleteTag(tag) ? tag.data.value : tag).trim(); }).join(' ');
            return tagsString.replace(/\s{2,}/g, ' ');
        };
        TagsFormControlComponent.prototype.isAutocompleteTag = function (tag) {
            return lodash.isObject(tag);
        };
        TagsFormControlComponent.prototype.getTagsFromString = function (tagsString) {
            if (tagsString) {
                var tags = tagsString.split(' ');
                var autocompleteValues_1 = this.options.autocompleteValues;
                if (lodash.isEmpty(autocompleteValues_1)) {
                    return tags;
                }
                return tags
                    .map(function (tag) { return autocompleteValues_1.find(function (autocomplete) { return autocomplete.data.value === tag; }) || tag.trim(); })
                    .filter(Boolean);
            }
            return [];
        };
        TagsFormControlComponent.prototype.autocompleteSearch = function (text$) {
            var _this = this;
            return text$.pipe(operators.debounceTime(250), operators.distinctUntilChanged(), operators.map(function (searchTerm) {
                var autocompleteValues = _this.options.autocompleteValues;
                if (lodash.isEmpty(autocompleteValues)) {
                    return [];
                }
                return autocompleteValues.filter(function (autocompleteValue) { return _this.rxStringService.caseInsensitiveSearch(autocompleteValue.text, searchTerm); });
            }));
        };
        TagsFormControlComponent.prototype.onInitTagEditing = function (event) {
            var tag = event.tag;
            if (this.isAutocompleteTag(tag)) {
                event.preventDefault();
            }
        };
        return TagsFormControlComponent;
    }(ValueAccessor));
    TagsFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TagsFormControlComponent, deps: [{ token: i1__namespace$3.RxStringService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TagsFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TagsFormControlComponent, selector: "rx-tags-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: TagsFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "adaptTagField", first: true, predicate: ["adaptTagField"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-tag-field\n  #adaptTagField\n  [label]=\"options.label\"\n  [placeholder]=\"options.placeholder\"\n  [required]=\"options.required\"\n  [ngModel]=\"tags\"\n  [disabled]=\"isDisabled\"\n  [popoverContent]=\"options.tooltip?.content\"\n  [popoverIcon]=\"options.tooltip?.iconName\"\n  (ngModelChange)=\"onTagsModelChange($event)\"\n  [replaceModelOnWrite]=\"true\"\n  [delimiterSymbol]=\"null\"\n  [search]=\"autocompleteSearchBound\"\n  [openDropdownOnFocus]=\"true\"\n  [errorCheck]=\"options.errorCheck\"\n  (initTagEditing)=\"onInitTagEditing($event)\"\n>\n</adapt-tag-field>\n", styles: [":host ::ng-deep .adapt-mt-wrapper{padding-left:5px;padding-right:5px}\n"], components: [{ type: i1__namespace$1.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TagsFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-tags-form-control',
                        templateUrl: './tags-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: TagsFormControlComponent,
                                multi: true
                            }
                        ],
                        styleUrls: ['./tags-form-control.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.RxStringService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], adaptTagField: [{
                    type: i0.ViewChild,
                    args: ['adaptTagField', { static: true }]
                }] } });

    var TagsFormControlModule = /** @class */ (function () {
        function TagsFormControlModule() {
        }
        return TagsFormControlModule;
    }());
    TagsFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TagsFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TagsFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TagsFormControlModule, declarations: [TagsFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptMetatagModule, i1$1.AdaptTagModule, i1$1.AdaptRxLabelModule], exports: [TagsFormControlComponent] });
    TagsFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TagsFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptMetatagModule, i1$1.AdaptTagModule, i1$1.AdaptRxLabelModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TagsFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [TagsFormControlComponent],
                        exports: [TagsFormControlComponent],
                        entryComponents: [TagsFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptMetatagModule, i1$1.AdaptTagModule, i1$1.AdaptRxLabelModule]
                    }]
            }] });

    var TextareaFormControlComponent = /** @class */ (function (_super) {
        __extends(TextareaFormControlComponent, _super);
        function TextareaFormControlComponent(renderer) {
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            return _this;
        }
        TextareaFormControlComponent.prototype.focus = function () {
            this.renderer.selectRootElement(this.editor.textareaRef.nativeElement, true).focus();
        };
        return TextareaFormControlComponent;
    }(ValueAccessor));
    TextareaFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextareaFormControlComponent, deps: [{ token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TextareaFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextareaFormControlComponent, selector: "rx-textarea-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: TextareaFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-textarea\n  #editor\n  label=\"{{ options.label }}\"\n  [required]=\"options.required\"\n  [rows]=\"options.rows\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          iconName: options.tooltip.iconName,\n          content: options.tooltip.content,\n          popoverMode: true\n        }\n      : null\n  \"\n>\n</adapt-rx-textarea>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textarea ::ng-deep textarea{resize:none}\n"], components: [{ type: i1__namespace$1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextareaFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-textarea-form-control',
                        templateUrl: './textarea-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: TextareaFormControlComponent,
                                multi: true
                            }
                        ],
                        styleUrls: ['./textarea-form-control.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], editor: [{
                    type: i0.ViewChild,
                    args: ['editor', { static: true }]
                }] } });

    var TextareaFormControlModule = /** @class */ (function () {
        function TextareaFormControlModule() {
        }
        return TextareaFormControlModule;
    }());
    TextareaFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextareaFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TextareaFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextareaFormControlModule, declarations: [TextareaFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextareaModule], exports: [TextareaFormControlComponent] });
    TextareaFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextareaFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextareaModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TextareaFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [TextareaFormControlComponent],
                        exports: [TextareaFormControlComponent],
                        entryComponents: [TextareaFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextareaModule]
                    }]
            }] });

    var TimeFormControlComponent = /** @class */ (function (_super) {
        __extends(TimeFormControlComponent, _super);
        function TimeFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.datePickerControl = new i2.FormControl('');
            _this.pickerMode = i1$1.RxDatetimePickerMode.Time;
            return _this;
        }
        TimeFormControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.datePickerControl.valueChanges.subscribe(function (value) {
                if (value && !lodash.isNull(value.hours) && !lodash.isNull(value.minutes)) {
                    _this.value = moment__default["default"]({
                        hour: value.hours,
                        minute: value.minutes,
                        seconds: value.seconds || 0
                    }).format('HH:mm:ss');
                }
                else {
                    _this.value = null;
                }
            });
        };
        TimeFormControlComponent.prototype.writeValue = function (value) {
            _super.prototype.writeValue.call(this, value);
            var date = moment__default["default"](this.value, 'LTS');
            if (date.isValid()) {
                this.datePickerControl.setValue({
                    hours: date.hour(),
                    minutes: date.minutes()
                });
            }
            else {
                this.datePickerControl.setValue(null);
            }
        };
        return TimeFormControlComponent;
    }(ValueAccessor));
    TimeFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TimeFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    TimeFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TimeFormControlComponent, selector: "rx-time-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: TimeFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1__namespace$1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TimeFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-time-form-control',
                        templateUrl: './time-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: TimeFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var TimeFormControlModule = /** @class */ (function () {
        function TimeFormControlModule() {
        }
        return TimeFormControlModule;
    }());
    TimeFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TimeFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TimeFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TimeFormControlModule, declarations: [TimeFormControlComponent], imports: [i4.CommonModule, i1$1.AdaptRxDatetimeModule, i2.FormsModule, i2.ReactiveFormsModule], exports: [TimeFormControlComponent] });
    TimeFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TimeFormControlModule, imports: [[i4.CommonModule, i1$1.AdaptRxDatetimeModule, i2.FormsModule, i2.ReactiveFormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: TimeFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [TimeFormControlComponent],
                        imports: [i4.CommonModule, i1$1.AdaptRxDatetimeModule, i2.FormsModule, i2.ReactiveFormsModule],
                        exports: [TimeFormControlComponent],
                        entryComponents: [TimeFormControlComponent]
                    }]
            }] });

    exports.MessageType = void 0;
    (function (MessageType) {
        MessageType["Warning"] = "Warning";
        MessageType["Success"] = "Success";
        MessageType["Info"] = "Info";
        MessageType["Error"] = "Error";
    })(exports.MessageType || (exports.MessageType = {}));

    var RX_VALIDATION_FORM_CONTROL = {
        events: {
            correctValidationIssue: 'CORRECT_VALIDATION_ISSUE'
        }
    };

    var ValidationFormControlComponent = /** @class */ (function (_super) {
        __extends(ValidationFormControlComponent, _super);
        function ValidationFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.events = new i0.EventEmitter();
            _this.messageType = exports.MessageType;
            return _this;
        }
        ValidationFormControlComponent.prototype.correctIssue = function () {
            this.events.emit({
                type: RX_VALIDATION_FORM_CONTROL.events.correctValidationIssue,
                payload: {
                    propertyName: this.options.propertyName,
                    componentGuid: this.options.componentGuid
                }
            });
        };
        return ValidationFormControlComponent;
    }(ValueAccessor));
    ValidationFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ValidationFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    ValidationFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ValidationFormControlComponent, selector: "rx-validation-form-control", inputs: { options: "options" }, outputs: { events: "events" }, usesInheritance: true, ngImport: i0__namespace, template: "<p\n  [ngClass]=\"{\n    'text-danger': options.messageType === messageType.Error,\n    'text-warning': options.messageType === messageType.Warning,\n    'text-info': options.messageType === messageType.Info,\n    'text-success': options.messageType === messageType.Success\n  }\"\n  [ngStyle]=\"options.customStyle\"\n>\n  {{ options.text }}\n</p>\n\n<div *ngIf=\"options.componentGuid && !isDisabled\" class=\"text-right\">\n  <button type=\"button\" adapt-button size=\"small\" btn-type=\"tertiary\" (click)=\"correctIssue()\">Correct issue</button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ValidationFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-validation-form-control',
                        templateUrl: './validation-form-control.component.html'
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var ValidationFormControlModule = /** @class */ (function () {
        function ValidationFormControlModule() {
        }
        return ValidationFormControlModule;
    }());
    ValidationFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ValidationFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ValidationFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ValidationFormControlModule, declarations: [ValidationFormControlComponent], imports: [i4.CommonModule, i1$1.AdaptButtonModule], exports: [ValidationFormControlComponent] });
    ValidationFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ValidationFormControlModule, imports: [[i4.CommonModule, i1$1.AdaptButtonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ValidationFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ValidationFormControlComponent],
                        exports: [ValidationFormControlComponent],
                        entryComponents: [ValidationFormControlComponent],
                        imports: [i4.CommonModule, i1$1.AdaptButtonModule]
                    }]
            }] });

    var FormControlsModule = /** @class */ (function () {
        function FormControlsModule() {
        }
        return FormControlsModule;
    }());
    FormControlsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormControlsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    FormControlsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormControlsModule, imports: [AssignmentExpressionListFormControlModule,
            TagsFormControlModule,
            ListFormControlModule,
            LabelFormControlModule,
            BooleanFormControlModule,
            SwitchFormControlModule,
            TextFormControlModule,
            TextareaFormControlModule,
            GroupButtonFormControlModule,
            SelectFormControlModule,
            ValidationFormControlModule,
            OptionalExpressionControlModule,
            OptionalSelectFormControlModule,
            CustomizationOptionsModule,
            StepperWithUnitsFormControlModule,
            ColorPickerFormControlModule,
            CounterFormControlModule,
            DateFormControlModule,
            DateTimeFormControlModule,
            TimeFormControlModule,
            AttachmentFormControlModule,
            ExpressionFormControlModule,
            InputListFormControlModule,
            IconPickerFormControlModule] });
    FormControlsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormControlsModule, imports: [[
                AssignmentExpressionListFormControlModule,
                TagsFormControlModule,
                ListFormControlModule,
                LabelFormControlModule,
                BooleanFormControlModule,
                SwitchFormControlModule,
                TextFormControlModule,
                TextareaFormControlModule,
                GroupButtonFormControlModule,
                SelectFormControlModule,
                ValidationFormControlModule,
                OptionalExpressionControlModule,
                OptionalSelectFormControlModule,
                CustomizationOptionsModule,
                StepperWithUnitsFormControlModule,
                ColorPickerFormControlModule,
                CounterFormControlModule,
                DateFormControlModule,
                DateTimeFormControlModule,
                TimeFormControlModule,
                AttachmentFormControlModule,
                ExpressionFormControlModule,
                InputListFormControlModule,
                IconPickerFormControlModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FormControlsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            AssignmentExpressionListFormControlModule,
                            TagsFormControlModule,
                            ListFormControlModule,
                            LabelFormControlModule,
                            BooleanFormControlModule,
                            SwitchFormControlModule,
                            TextFormControlModule,
                            TextareaFormControlModule,
                            GroupButtonFormControlModule,
                            SelectFormControlModule,
                            ValidationFormControlModule,
                            OptionalExpressionControlModule,
                            OptionalSelectFormControlModule,
                            CustomizationOptionsModule,
                            StepperWithUnitsFormControlModule,
                            ColorPickerFormControlModule,
                            CounterFormControlModule,
                            DateFormControlModule,
                            DateTimeFormControlModule,
                            TimeFormControlModule,
                            AttachmentFormControlModule,
                            ExpressionFormControlModule,
                            InputListFormControlModule,
                            IconPickerFormControlModule
                        ]
                    }]
            }] });

    var DefinitionPickerOrExpressionComponentMode;
    (function (DefinitionPickerOrExpressionComponentMode) {
        DefinitionPickerOrExpressionComponentMode["Definition"] = "Definition";
        DefinitionPickerOrExpressionComponentMode["Expression"] = "Expression";
    })(DefinitionPickerOrExpressionComponentMode || (DefinitionPickerOrExpressionComponentMode = {}));
    var DefinitionPickerOrExpressionFormControlComponent = /** @class */ (function (_super) {
        __extends(DefinitionPickerOrExpressionFormControlComponent, _super);
        function DefinitionPickerOrExpressionFormControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.events = new i0.EventEmitter();
            _this.componentMode = DefinitionPickerOrExpressionComponentMode;
            _this.activeMode = DefinitionPickerOrExpressionComponentMode.Definition;
            return _this;
        }
        DefinitionPickerOrExpressionFormControlComponent.prototype.ngOnInit = function () {
            this.activeMode = this.isDynamicDefinitionName(this.value)
                ? DefinitionPickerOrExpressionComponentMode.Expression
                : DefinitionPickerOrExpressionComponentMode.Definition;
            this.definitionPickerOptions = {
                definitionType: this.options.definitionType,
                label: this.options.label
            };
            this.expressionFormControlOptions = {
                dataDictionary$: this.options.dataDictionary$,
                operators: this.options.operators,
                label: this.options.label
            };
        };
        DefinitionPickerOrExpressionFormControlComponent.prototype.selectMode = function (mode) {
            if (this.activeMode !== mode) {
                this.activeMode = mode;
                this.value = null;
            }
            else if (this.activeMode === mode && this.value) {
                this.events.emit({
                    type: RX_EXPRESSION_EDITOR.events.openExpressionEditor,
                    payload: {
                        propertyPath: this.propertyPath
                    }
                });
            }
        };
        DefinitionPickerOrExpressionFormControlComponent.prototype.onModelValueChange = function (expressionValue) {
            this.value = expressionValue;
        };
        DefinitionPickerOrExpressionFormControlComponent.prototype.isDynamicDefinitionName = function (definitionName) {
            return Boolean(definitionName === null || definitionName === void 0 ? void 0 : definitionName.match(/\$\{.*\}/));
        };
        return DefinitionPickerOrExpressionFormControlComponent;
    }(ValueAccessor));
    DefinitionPickerOrExpressionFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DefinitionPickerOrExpressionFormControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    DefinitionPickerOrExpressionFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DefinitionPickerOrExpressionFormControlComponent, selector: "rx-definition-picker-or-expression-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: DefinitionPickerOrExpressionFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"d-flex flex-row-reverse row toggle-dropdown\">\n  <div class=\"dropdown\" adaptDropdown>\n    <button rx-id=\"toggle-button\" class=\"btn btn-link pl-0\" adaptDropdownToggle type=\"button\">\n      <span class=\"flex-grow-1 rx-ellipsis rx-selected-item\">\n        {{ 'com.bmc.arsys.rx.client.common.select.label' | translate }}\n      </span>\n    </button>\n\n    <div class=\"dropdown-menu\" adaptDropdownMenu>\n      <button\n        type=\"button\"\n        class=\"dropdown-item\"\n        (click)=\"selectMode(componentMode.Definition)\"\n        [class.active]=\"activeMode === componentMode.Definition\"\n      >\n        Select {{ options.definitionType }}\n      </button>\n\n      <button\n        type=\"button\"\n        class=\"dropdown-item\"\n        (click)=\"selectMode(componentMode.Expression)\"\n        [class.active]=\"activeMode === componentMode.Expression\"\n      >\n        {{ 'com.bmc.arsys.rx.client.expression-editor.edit-expression.title' | translate }}\n      </button>\n    </div>\n  </div>\n</div>\n\n<rx-definition-picker\n  *ngIf=\"activeMode === componentMode.Definition\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onModelValueChange($event)\"\n  [options]=\"definitionPickerOptions\"\n  [isDisabled]=\"isDisabled\"\n>\n</rx-definition-picker>\n\n<rx-expression-form-control\n  *ngIf=\"activeMode === componentMode.Expression\"\n  [options]=\"expressionFormControlOptions\"\n  [propertyPath]=\"propertyPath\"\n  [disabled]=\"isDisabled\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onModelValueChange($event)\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", styles: [".toggle-dropdown{margin-bottom:-29px}[rx-id=toggle-button]{margin-top:-9px;margin-right:5px}\n"], components: [{ type: i1__namespace$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i1__namespace$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1__namespace$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DefinitionPickerOrExpressionFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-definition-picker-or-expression-form-control',
                        templateUrl: 'definition-picker-or-expression-form-control.component.html',
                        styleUrls: ['definition-picker-or-expression-form-control.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: DefinitionPickerOrExpressionFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { options: [{
                    type: i0.Input
                }], propertyPath: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var DefinitionPickerOrExpressionFormControlModule = /** @class */ (function () {
        function DefinitionPickerOrExpressionFormControlModule() {
        }
        return DefinitionPickerOrExpressionFormControlModule;
    }());
    DefinitionPickerOrExpressionFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DefinitionPickerOrExpressionFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DefinitionPickerOrExpressionFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DefinitionPickerOrExpressionFormControlModule, declarations: [DefinitionPickerOrExpressionFormControlComponent], imports: [i2.FormsModule,
            i4.CommonModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptDropdownModule,
            ExpressionFormControlModule,
            RxDefinitionPickerModule,
            i4$1.TranslateModule], exports: [DefinitionPickerOrExpressionFormControlComponent] });
    DefinitionPickerOrExpressionFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DefinitionPickerOrExpressionFormControlModule, imports: [[
                i2.FormsModule,
                i4.CommonModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptDropdownModule,
                ExpressionFormControlModule,
                RxDefinitionPickerModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DefinitionPickerOrExpressionFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.FormsModule,
                            i4.CommonModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptDropdownModule,
                            ExpressionFormControlModule,
                            RxDefinitionPickerModule,
                            i4$1.TranslateModule
                        ],
                        exports: [DefinitionPickerOrExpressionFormControlComponent],
                        declarations: [DefinitionPickerOrExpressionFormControlComponent],
                        entryComponents: [DefinitionPickerOrExpressionFormControlComponent]
                    }]
            }] });

    var RecordInstanceFormControlComponent = /** @class */ (function (_super) {
        __extends(RecordInstanceFormControlComponent, _super);
        function RecordInstanceFormControlComponent(renderer) {
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            _this.model = {
                resourceType: i3.RX_RECORD_DEFINITION.resourceTypes.recordInstanceProcessVariable
            };
            return _this;
        }
        RecordInstanceFormControlComponent.prototype.focus = function () {
            this.renderer.selectRootElement(this.editor.inputRef.nativeElement, true).focus();
        };
        RecordInstanceFormControlComponent.prototype.onModelChange = function () {
            this.value = this.model;
        };
        return RecordInstanceFormControlComponent;
    }(ValueAccessor));
    RecordInstanceFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInstanceFormControlComponent, deps: [{ token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordInstanceFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordInstanceFormControlComponent, selector: "rx-record-instance-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RecordInstanceFormControlComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-control-label class=\"d-block form-group\" [label]=\"options.label\"></adapt-rx-control-label>\n\n<adapt-rx-textfield\n  #editor\n  class=\"d-block form-group\"\n  [label]=\"'com.bmc.arsys.rx.client.record-instance-form-control.id.label' | translate\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"model.id\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  (ngModelChange)=\"onModelChange()\"\n>\n</adapt-rx-textfield>\n\n<adapt-rx-textfield\n  class=\"d-block form-group\"\n  [label]=\"'com.bmc.arsys.rx.client.record-instance-form-control.record-definition-name.label' | translate\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"model.recordDefinitionName\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  (ngModelChange)=\"onModelChange()\"\n>\n</adapt-rx-textfield>\n", components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInstanceFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-instance-form-control',
                        templateUrl: './record-instance-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RecordInstanceFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], editor: [{
                    type: i0.ViewChild,
                    args: ['editor', { static: true }]
                }] } });

    var RecordInstanceFormControlModule = /** @class */ (function () {
        function RecordInstanceFormControlModule() {
        }
        return RecordInstanceFormControlModule;
    }());
    RecordInstanceFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInstanceFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RecordInstanceFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInstanceFormControlModule, declarations: [RecordInstanceFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextfieldModule, i1$1.AdaptRxLabelModule, i4$1.TranslateModule], exports: [RecordInstanceFormControlComponent] });
    RecordInstanceFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInstanceFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextfieldModule, i1$1.AdaptRxLabelModule, i4$1.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInstanceFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RecordInstanceFormControlComponent],
                        exports: [RecordInstanceFormControlComponent],
                        entryComponents: [RecordInstanceFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxTextfieldModule, i1$1.AdaptRxLabelModule, i4$1.TranslateModule]
                    }]
            }] });

    var RadioFormControlComponent = /** @class */ (function (_super) {
        __extends(RadioFormControlComponent, _super);
        function RadioFormControlComponent(translateService) {
            var _this = _super.call(this) || this;
            _this.translateService = translateService;
            return _this;
        }
        return RadioFormControlComponent;
    }(ValueAccessor));
    RadioFormControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RadioFormControlComponent, deps: [{ token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RadioFormControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RadioFormControlComponent, selector: "rx-radio-form-control", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RadioFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"form-group\">\n  <adapt-rx-radiobutton-group\n    [(ngModel)]=\"value\"\n    [label]=\"options.label\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName,\n            maxWidth: options.tooltip.maxWidth\n          }\n        : null\n    \"\n    [disabled]=\"isDisabled\"\n  >\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      *ngFor=\"let item of options.items\"\n      [value]=\"item.value\"\n      [label]=\"item.label\"\n    >\n    </adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n</div>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", styles: [".form-group{width:450px}:host::ng-deep adapt-rx-radiobutton .radio{margin:0}:host::ng-deep adapt-rx-radiobutton.radio-inline{margin-left:0!important;margin-right:20px}\n"], components: [{ type: i1__namespace$1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1__namespace$1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RadioFormControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-radio-form-control',
                        templateUrl: './radio-form-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RadioFormControlComponent,
                                multi: true
                            }
                        ],
                        styleUrls: ['./radio-form-control.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace$1.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RadioFormControlModule = /** @class */ (function () {
        function RadioFormControlModule() {
        }
        return RadioFormControlModule;
    }());
    RadioFormControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RadioFormControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RadioFormControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RadioFormControlModule, declarations: [RadioFormControlComponent], imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxRadiobuttonModule, i1$1.AdaptRxLabelModule], exports: [RadioFormControlComponent] });
    RadioFormControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RadioFormControlModule, imports: [[i4.CommonModule, i2.FormsModule, i1$1.AdaptRxRadiobuttonModule, i1$1.AdaptRxLabelModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RadioFormControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RadioFormControlComponent],
                        exports: [RadioFormControlComponent],
                        entryComponents: [RadioFormControlComponent],
                        imports: [i4.CommonModule, i2.FormsModule, i1$1.AdaptRxRadiobuttonModule, i1$1.AdaptRxLabelModule]
                    }]
            }] });

    var RxIframeComponent = /** @class */ (function () {
        function RxIframeComponent(rxJsonParserService, domSanitizer) {
            var _this = this;
            this.rxJsonParserService = rxJsonParserService;
            this.domSanitizer = domSanitizer;
            this.class = 'd-block';
            this.isAbsolutePositioned = false;
            this.isHidden = false;
            this.rxMessage = new i0.EventEmitter();
            this.api = {
                postMessageToFrame: function (message) {
                    _this.iframe.nativeElement.contentWindow.postMessage(message, '*');
                }
            };
        }
        RxIframeComponent.prototype.onMessage = function (event) {
            if (event.data) {
                var windowMessage = this.rxJsonParserService.tryParseJson(event.data);
                if (windowMessage) {
                    this.rxMessage.emit(windowMessage);
                }
            }
        };
        RxIframeComponent.prototype.ngOnChanges = function (changes) {
            var _a;
            if ((_a = changes.url) === null || _a === void 0 ? void 0 : _a.currentValue) {
                this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(changes.url.currentValue);
            }
        };
        RxIframeComponent.prototype.updateUrl = function (url) {
            this.iframe.nativeElement.contentWindow.location.replace(url);
        };
        return RxIframeComponent;
    }());
    RxIframeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeComponent, deps: [{ token: i1__namespace$3.RxJsonParserService }, { token: i2__namespace$2.DomSanitizer }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxIframeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxIframeComponent, selector: "rx-iframe", inputs: { url: "url" }, outputs: { rxMessage: "rxMessage" }, host: { listeners: { "window:message": "onMessage($event)" }, properties: { "class": "this.class", "class.position-absolute": "this.isAbsolutePositioned", "class.isHidden": "this.isHidden" } }, viewQueries: [{ propertyName: "iframe", first: true, predicate: ["frame"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<iframe #frame class=\"w-100 h-100 d-block\" frameborder=\"0\" [src]=\"src\"></iframe>\n", styles: [":host.position-absolute{top:52px;bottom:0;left:0;right:0;height:calc(100% - 52px)}:host.position-absolute.isHidden{z-index:-1;visibility:hidden}\n"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-iframe',
                        templateUrl: './iframe.component.html',
                        styleUrls: ['./iframe.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.RxJsonParserService }, { type: i2__namespace$2.DomSanitizer }]; }, propDecorators: { url: [{
                    type: i0.Input
                }], class: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], isAbsolutePositioned: [{
                    type: i0.HostBinding,
                    args: ['class.position-absolute']
                }], isHidden: [{
                    type: i0.HostBinding,
                    args: ['class.isHidden']
                }], rxMessage: [{
                    type: i0.Output
                }], iframe: [{
                    type: i0.ViewChild,
                    args: ['frame']
                }], onMessage: [{
                    type: i0.HostListener,
                    args: ['window:message', ['$event']]
                }] } });

    var RxIframeModule = /** @class */ (function () {
        function RxIframeModule() {
        }
        return RxIframeModule;
    }());
    RxIframeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxIframeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeModule, declarations: [RxIframeComponent], imports: [i4.CommonModule], exports: [RxIframeComponent] });
    RxIframeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeModule, imports: [[i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule],
                        declarations: [RxIframeComponent],
                        exports: [RxIframeComponent]
                    }]
            }] });

    var RxIframeService = /** @class */ (function () {
        function RxIframeService(applicationRef, document, componentFactoryResolver, injector) {
            this.applicationRef = applicationRef;
            this.document = document;
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
        }
        RxIframeService.prototype.showIframe = function (url) {
            if (!this.iframeComponentRef) {
                var componentFactory = this.componentFactoryResolver.resolveComponentFactory(RxIframeComponent);
                this.iframeComponentRef = componentFactory.create(this.injector);
                this.iframeComponentRef.instance.isAbsolutePositioned = true;
                this.applicationRef.attachView(this.iframeComponentRef.hostView);
                var rxIframeHtmlElement = this.iframeComponentRef.hostView
                    .rootNodes[0];
                this.document.querySelector('rx-root').appendChild(rxIframeHtmlElement);
                this.setIframeUrl(url);
            }
            else {
                this.iframeComponentRef.instance.isHidden = false;
                this.updateIframeUrl(url);
            }
        };
        RxIframeService.prototype.hideIframe = function () {
            this.iframeComponentRef.instance.isHidden = true;
            this.updateIframeUrl("/" + i1$2.RX_APPLICATION.innovationStudioBundleId + "/index.html#/blank");
        };
        RxIframeService.prototype.getIframeApi = function () {
            return this.iframeComponentRef.instance.api;
        };
        RxIframeService.prototype.setIframeUrl = function (url) {
            this.iframeComponentRef.instance.ngOnChanges({
                url: new i0.SimpleChange(null, url, false)
            });
        };
        RxIframeService.prototype.updateIframeUrl = function (url) {
            this.iframeComponentRef.instance.updateUrl(url);
        };
        return RxIframeService;
    }());
    RxIframeService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeService, deps: [{ token: i0__namespace.ApplicationRef }, { token: i4.DOCUMENT }, { token: i0__namespace.ComponentFactoryResolver }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxIframeService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIframeService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ApplicationRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i4.DOCUMENT]
                        }] }, { type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.Injector }];
        } });

    var InspectorDirective = /** @class */ (function () {
        function InspectorDirective() {
        }
        return InspectorDirective;
    }());
    InspectorDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorDirective, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    InspectorDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: InspectorDirective, selector: "[rxInspector]", inputs: { designerItemModel: "designerItemModel" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[rxInspector]'
                    }]
            }], propDecorators: { designerItemModel: [{
                    type: i0.Input
                }] } });

    var RxInspectorModule = /** @class */ (function () {
        function RxInspectorModule() {
        }
        return RxInspectorModule;
    }());
    RxInspectorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxInspectorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxInspectorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxInspectorModule, declarations: [InspectorDirective], exports: [InspectorDirective] });
    RxInspectorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxInspectorModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxInspectorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        exports: [InspectorDirective],
                        declarations: [InspectorDirective]
                    }]
            }] });

    // tslint:disable-next-line:directive-class-suffix
    var InspectorControlBase = /** @class */ (function (_super) {
        __extends(InspectorControlBase, _super);
        function InspectorControlBase(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.events = new i0.EventEmitter();
            _this.designerItemModel = _this.injector.get(InspectorDirective).designerItemModel;
            return _this;
        }
        return InspectorControlBase;
    }(ValueAccessor));
    InspectorControlBase.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorControlBase, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    InspectorControlBase.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: InspectorControlBase, inputs: { propertyPath: "propertyPath", options: "options" }, outputs: { events: "events" }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorControlBase, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; }, propDecorators: { propertyPath: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var InspectorWidgetBase = /** @class */ (function () {
        function InspectorWidgetBase(injector) {
            this.injector = injector;
            this.events = new i0.EventEmitter();
            this.designerItemModel = this.injector.get(InspectorDirective).designerItemModel;
        }
        return InspectorWidgetBase;
    }());
    InspectorWidgetBase.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorWidgetBase, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    InspectorWidgetBase.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorWidgetBase });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InspectorWidgetBase, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var ExpressionInspectorControlComponent = /** @class */ (function (_super) {
        __extends(ExpressionInspectorControlComponent, _super);
        function ExpressionInspectorControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.formControl = _this.injector.get(i2.NgControl).control;
            return _this;
        }
        ExpressionInspectorControlComponent.prototype.ngOnInit = function () {
            this.patchOptions();
        };
        ExpressionInspectorControlComponent.prototype.ngOnChanges = function (changes) {
            if (changes.optinos) {
                this.patchOptions();
            }
        };
        ExpressionInspectorControlComponent.prototype.patchOptions = function () {
            this.expressionFormControlOptions = Object.assign(Object.assign({}, this.options), { dataDictionary$: this.designerItemModel.expressionConfigurator.getDataDictionary(this.propertyPath), operators: this.designerItemModel.expressionConfigurator.getOperators(this.propertyPath) });
        };
        return ExpressionInspectorControlComponent;
    }(InspectorControlBase));
    ExpressionInspectorControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionInspectorControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    ExpressionInspectorControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionInspectorControlComponent, selector: "rx-expression-inspector-form-control", providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: ExpressionFormControlComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<rx-expression-form-control\n  [formControl]=\"formControl\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"expressionFormControlOptions\"\n  (events)=\"events.emit($event)\"\n></rx-expression-form-control>\n", components: [{ type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionInspectorControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-expression-inspector-form-control',
                        templateUrl: './expression-inspector-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: ExpressionFormControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }] });

    var ExpressionInspectorControlModule = /** @class */ (function () {
        function ExpressionInspectorControlModule() {
        }
        return ExpressionInspectorControlModule;
    }());
    ExpressionInspectorControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionInspectorControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ExpressionInspectorControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionInspectorControlModule, declarations: [ExpressionInspectorControlComponent], imports: [ExpressionFormControlModule, i2.FormsModule, i2.ReactiveFormsModule], exports: [ExpressionInspectorControlComponent] });
    ExpressionInspectorControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionInspectorControlModule, imports: [[ExpressionFormControlModule, i2.FormsModule, i2.ReactiveFormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExpressionInspectorControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ExpressionInspectorControlComponent],
                        imports: [ExpressionFormControlModule, i2.FormsModule, i2.ReactiveFormsModule],
                        exports: [ExpressionInspectorControlComponent]
                    }]
            }] });

    var OptionalExpressionInspectorControlComponent = /** @class */ (function (_super) {
        __extends(OptionalExpressionInspectorControlComponent, _super);
        function OptionalExpressionInspectorControlComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.formControl = _this.injector.get(i2.NgControl).control;
            return _this;
        }
        OptionalExpressionInspectorControlComponent.prototype.ngOnInit = function () {
            this.patchOptions();
        };
        OptionalExpressionInspectorControlComponent.prototype.ngOnChanges = function (changes) {
            if (changes.optinos) {
                this.patchOptions();
            }
        };
        OptionalExpressionInspectorControlComponent.prototype.patchOptions = function () {
            this.optionalExpressionFormControlOptions = Object.assign(Object.assign({}, this.options), { dataDictionary$: this.designerItemModel.expressionConfigurator.getDataDictionary(this.propertyPath), operators: this.designerItemModel.expressionConfigurator.getOperators(this.propertyPath) });
        };
        return OptionalExpressionInspectorControlComponent;
    }(InspectorControlBase));
    OptionalExpressionInspectorControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionInspectorControlComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    OptionalExpressionInspectorControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalExpressionInspectorControlComponent, selector: "rx-optional-expression-inspector-control", providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: OptionalExpressionInspectorControlComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<rx-optional-expression-form-control\n  [formControl]=\"formControl\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"optionalExpressionFormControlOptions\"\n  (events)=\"events.emit($event)\"\n></rx-optional-expression-form-control>\n", components: [{ type: OptionalExpressionControlComponent, selector: "rx-optional-expression-form-control", inputs: ["options", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionInspectorControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-optional-expression-inspector-control',
                        templateUrl: './optional-expression-inspector-control.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: OptionalExpressionInspectorControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }] });

    var OptionalExpressionInspectorControlModule = /** @class */ (function () {
        function OptionalExpressionInspectorControlModule() {
        }
        return OptionalExpressionInspectorControlModule;
    }());
    OptionalExpressionInspectorControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionInspectorControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OptionalExpressionInspectorControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionInspectorControlModule, declarations: [OptionalExpressionInspectorControlComponent], imports: [OptionalExpressionControlModule, i2.ReactiveFormsModule] });
    OptionalExpressionInspectorControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionInspectorControlModule, imports: [[OptionalExpressionControlModule, i2.ReactiveFormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OptionalExpressionInspectorControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [OptionalExpressionControlModule, i2.ReactiveFormsModule],
                        declarations: [OptionalExpressionInspectorControlComponent]
                    }]
            }] });

    var RX_ISSUE_REPORTER = {
        recordDefinitionName: 'Reported Errors',
        recordFields: {
            operationId: {
                id: 70100,
                name: 'operationId'
            },
            applicationName: {
                id: 70101,
                name: 'applicationName'
            },
            messageType: {
                id: 70102,
                name: 'messageType'
            },
            messageNumber: {
                id: 70103,
                name: 'messageNumber'
            },
            messageText: {
                id: 70104,
                name: 'messageText'
            },
            details: {
                id: 70109,
                name: 'details'
            }
        },
        messageTypeOptions: { INFO: 0, WARNING: 1, ERROR: 2 }
    };

    var RxIssueReporterService = /** @class */ (function () {
        function RxIssueReporterService(rxRecordInstanceService, rxGlobalCacheService, rxBundleCacheService) {
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxBundleCacheService = rxBundleCacheService;
        }
        RxIssueReporterService.prototype.reportIssue = function (message, data) {
            var _this = this;
            return this.prepareIssueDetails(message, data).pipe(operators.switchMap(function (issueDetails) {
                return _this.rxRecordInstanceService.getNew(RX_ISSUE_REPORTER.recordDefinitionName).pipe(operators.map(function (recordInstance) {
                    lodash.forEach(RX_ISSUE_REPORTER.recordFields, function (field) {
                        var fieldValue = issueDetails[field.name] || null;
                        if (field.id === RX_ISSUE_REPORTER.recordFields.messageType.id) {
                            fieldValue = RX_ISSUE_REPORTER.messageTypeOptions[fieldValue];
                        }
                        recordInstance.setFieldValue(field.id, fieldValue);
                    });
                    return recordInstance;
                }));
            }), operators.switchMap(function (recordInstance) { return _this.rxRecordInstanceService.create(recordInstance); }));
        };
        RxIssueReporterService.prototype.prepareIssueDetails = function (message, error) {
            if (error === void 0) { error = {}; }
            return this.rxGlobalCacheService.getBundleDescriptor(this.rxBundleCacheService.bundleId).pipe(operators.map(function (bundleDescriptor) { return ({
                details: message,
                applicationName: bundleDescriptor.friendlyName || null,
                messageType: error.messageType || null,
                messageNumber: error.messageNumber || null,
                operationId: error.operationId || null,
                messageText: error.messageText || error.appendedText ? error.messageText + " " + error.appendedText : null
            }); }));
        };
        return RxIssueReporterService;
    }());
    RxIssueReporterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterService, deps: [{ token: i3__namespace.RxRecordInstanceService }, { token: i1__namespace$2.RxGlobalCacheService }, { token: i1__namespace$2.RxBundleCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxIssueReporterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i3__namespace.RxRecordInstanceService }, { type: i1__namespace$2.RxGlobalCacheService }, { type: i1__namespace$2.RxBundleCacheService }]; } });

    var RxIssueReporterComponent = /** @class */ (function (_super) {
        __extends(RxIssueReporterComponent, _super);
        function RxIssueReporterComponent(activeModalRef, formBuilder, rxIssueReporterService, rxNotificationService, translateService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.formBuilder = formBuilder;
            _this.rxIssueReporterService = rxIssueReporterService;
            _this.rxNotificationService = rxNotificationService;
            _this.translateService = translateService;
            _this.injector = injector;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.data = _this.activeModalRef.getData();
            _this.initForm();
            return _this;
        }
        RxIssueReporterComponent.prototype.isDirty = function () {
            return this.reportForm.dirty;
        };
        RxIssueReporterComponent.prototype.reportIssue = function () {
            var _this = this;
            this.rxIssueReporterService
                .reportIssue(this.reportForm.get('text').value, this.data)
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.issue-report-submitted.message'));
                _this.activeModalRef.close();
            });
        };
        RxIssueReporterComponent.prototype.initForm = function () {
            this.reportForm = this.formBuilder.group({
                text: ['', i2.Validators.required]
            });
        };
        RxIssueReporterComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        RxIssueReporterComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        return RxIssueReporterComponent;
    }(i1.RxModalClass));
    RxIssueReporterComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i2__namespace.FormBuilder }, { token: RxIssueReporterService }, { token: i1__namespace$2.RxNotificationService }, { token: i4__namespace$1.TranslateService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxIssueReporterComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxIssueReporterComponent, selector: "rx-issue-reporter", usesInheritance: true, ngImport: i0__namespace, template: "<form [formGroup]=\"reportForm\" autocomplete=\"off\" (ngSubmit)=\"reportIssue()\" class=\"modal-body\">\n  <div class=\"form-group\">\n    <p>\n      {{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.issue-report-prepared.label' | translate }}\n    </p>\n    <p>\n      {{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.describe-issue-details.label' | translate }}\n    </p>\n\n    <adapt-rx-textarea\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.description.placeholder' | translate }}\"\n      rows=\"15\"\n      formControlName=\"text\"\n    >\n    </adapt-rx-textarea>\n  </div>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"cancel()\" class=\"ml-3 float-right\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"primary\" type=\"submit\" [disabled]=\"reportForm.invalid\" class=\"float-right\">\n    {{ 'com.bmc.arsys.rx.client.issue-reporter.submit-report.label' | translate }}\n  </button>\n</form>\n", components: [{ type: i1__namespace$1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-issue-reporter',
                        templateUrl: './issue-reporter.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i2__namespace.FormBuilder }, { type: RxIssueReporterService }, { type: i1__namespace$2.RxNotificationService }, { type: i4__namespace$1.TranslateService }, { type: i0__namespace.Injector }]; } });

    var RxIssueReporterModule = /** @class */ (function () {
        function RxIssueReporterModule(rxNotificationService, rxModalService, translateService) {
            var _this = this;
            this.rxNotificationService = rxNotificationService;
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.rxNotificationService.issuesToReport$.subscribe(function (issue) {
                _this.showModal(issue);
            });
        }
        RxIssueReporterModule.prototype.showModal = function (issue) {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.report-issue.label'),
                data: issue,
                size: 'sm',
                content: RxIssueReporterComponent
            })
                .catch(lodash.noop);
        };
        return RxIssueReporterModule;
    }());
    RxIssueReporterModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterModule, deps: [{ token: i1__namespace$2.RxNotificationService }, { token: i1__namespace.RxModalService }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxIssueReporterModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterModule, declarations: [RxIssueReporterComponent], imports: [i1$1.AdaptButtonModule,
            i1$1.AdaptRxTextareaModule,
            i4.CommonModule,
            i2.FormsModule,
            i2.ReactiveFormsModule,
            i1$2.RxNotificationModule,
            i4$1.TranslateModule] });
    RxIssueReporterModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterModule, providers: [i1$1.AdaptModalService, RxIssueReporterService], imports: [[
                i1$1.AdaptButtonModule,
                i1$1.AdaptRxTextareaModule,
                i4.CommonModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i1$2.RxNotificationModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIssueReporterModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptRxTextareaModule,
                            i4.CommonModule,
                            i2.FormsModule,
                            i2.ReactiveFormsModule,
                            i1$2.RxNotificationModule,
                            i4$1.TranslateModule
                        ],
                        declarations: [RxIssueReporterComponent],
                        entryComponents: [RxIssueReporterComponent],
                        providers: [i1$1.AdaptModalService, RxIssueReporterService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxNotificationService }, { type: i1__namespace.RxModalService }, { type: i4__namespace$1.TranslateService }]; } });

    var RxSelectWithPaginationComponent = /** @class */ (function () {
        function RxSelectWithPaginationComponent(injector) {
            var _this = this;
            this.injector = injector;
            this.loadMoreCallbackFunc = this.onFilterValueChange.bind(this);
            this.selectedValue = [];
            this.isOptionLoadingInProgress = false;
            this.isFirstOptionPageLoaded = false;
            this.showLoadMoreButton = true;
            this.adaptSelectSettings = {
                enableSearch: true,
                showUncheckAll: true,
                modelFormat: i1$1.SelectModelFormat.object,
                placement: 'auto'
            };
            this.onFirstTimeDropdownOpen = lodash.once(this.onFilterValueChange);
            this.startIndex = 0;
            this.adaptSelectOptions = [];
            this.filterValue$ = new rxjs.Subject();
            this.options$ = this.filterValue$.pipe(operators.tap(function () {
                _this.isOptionLoadingInProgress = true;
            }), operators.debounceTime(250), operators.switchMap(function (query) { return _this.loadOptions(query); }), operators.startWith([]));
            this.label = '';
            this.required = false;
            this.isMultiSelectionMode = false;
            this.pageSize = 50;
            this.showDefaultTitle = true;
            this.showUncheckAll = true;
            this.readonly = false;
            this.toggleDropdown = new i0.EventEmitter();
            this.selectionChange = new i0.EventEmitter();
            this.viewToModelValueAdapter = function (viewValue) { return viewValue; };
            this.modelToViewValueAdapter = function (modelValue) { return modelValue; };
            this.optionFormatter = function (option) { return option.displayValue; };
        }
        RxSelectWithPaginationComponent.prototype.ngOnInit = function () {
            // cannot inject NgControl instance directly due to the angular circular dependency error.
            // see: https://github.com/angular/components/pull/13860/commits/f6b179e02b33c058a018ce4ccc51932d1416331f
            this.formControl = this.injector.get(i2.NgControl);
            this.adaptSelectSettings = Object.assign(Object.assign({}, this.adaptSelectSettings), { showUncheckAll: this.showUncheckAll, pageSize: this.pageSize });
            if (this.isMultiSelectionMode) {
                this.adaptSelectSettings.checkedStyle = 'checkbox';
                this.adaptSelectSettings.showTooltip = true;
            }
        };
        RxSelectWithPaginationComponent.prototype.ngOnChanges = function (changes) {
            if (changes.showDefaultTitle && this.adaptSelectComponent.texts) {
                if (changes.showDefaultTitle.isFirstChange()) {
                    this.adaptSelectDefaultTitle = this.adaptSelectComponent.texts.defaultTitle;
                    this.adaptSelectComponent.texts.defaultTitle = null;
                }
                this.adaptSelectComponent.texts = Object.assign(Object.assign({}, this.adaptSelectComponent.texts), { defaultTitle: changes.showDefaultTitle.currentValue ? this.adaptSelectDefaultTitle : null });
            }
        };
        RxSelectWithPaginationComponent.prototype.resetLoadedOptions = function () {
            this.onFirstTimeDropdownOpen = lodash.once(this.onFilterValueChange);
            this.lastFilterValue = null;
            this.isFirstOptionPageLoaded = false;
            this.adaptSelectOptions = [];
        };
        RxSelectWithPaginationComponent.prototype.onFilterValueChange = function (filterValue) {
            if (filterValue === void 0) { filterValue = this.lastFilterValue || ''; }
            this.filterValue$.next(filterValue);
        };
        RxSelectWithPaginationComponent.prototype.loadOptions = function (filterValue) {
            var _this = this;
            if (filterValue === void 0) { filterValue = this.lastFilterValue || ''; }
            if (this.lastFilterValue === filterValue) {
                this.startIndex = this.pageSize > 0 ? this.startIndex + this.pageSize : 0;
            }
            else {
                this.lastFilterValue = filterValue;
                this.startIndex = 0;
            }
            return this.optionLoader(this.startIndex, this.pageSize, this.lastFilterValue).pipe(operators.take(1), operators.tap(function (optionsPage) {
                var options = optionsPage.options;
                if (_this.startIndex === 0) {
                    _this.adaptSelectOptions = options;
                    _this.isFirstOptionPageLoaded = true;
                }
                else {
                    _this.adaptSelectOptions = _this.adaptSelectOptions.concat(options);
                }
                _this.showLoadMoreButton = optionsPage.totalSize > _this.adaptSelectOptions.length;
            }), operators.map(function () { return _this.adaptSelectOptions; }), operators.finalize(function () {
                _this.isOptionLoadingInProgress = false;
            }));
        };
        RxSelectWithPaginationComponent.prototype.writeValue = function (selectedValue) {
            this.selectedValue = this.modelToViewValueAdapter(selectedValue);
        };
        RxSelectWithPaginationComponent.prototype.onSelectedValueChange = function (selectedValue) {
            this.onViewValueChange(this.viewToModelValueAdapter(selectedValue));
        };
        RxSelectWithPaginationComponent.prototype.ngDoCheck = function () {
            if (this.formControl.untouched && this.ngModel.touched) {
                this.ngModel.control.markAsUntouched();
            }
            else if (this.formControl.touched && this.ngModel.untouched) {
                this.ngModel.control.markAsTouched();
            }
            if (this.formControl.pristine && this.ngModel.control.dirty) {
                this.ngModel.control.markAsPristine();
            }
        };
        RxSelectWithPaginationComponent.prototype.registerOnChange = function (fn) {
            this.onViewValueChange = fn;
        };
        RxSelectWithPaginationComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        RxSelectWithPaginationComponent.prototype.onDropdownToggle = function (isOpen) {
            if (isOpen) {
                this.onFirstTimeDropdownOpen();
                this.toggleDropdown.next(true);
            }
            else {
                this.onTouched();
                this.toggleDropdown.next(false);
                if (this.lastFilterValue) {
                    this.onFilterValueChange('');
                }
            }
        };
        RxSelectWithPaginationComponent.prototype.ngOnDestroy = function () {
            this.filterValue$.complete();
        };
        return RxSelectWithPaginationComponent;
    }());
    RxSelectWithPaginationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectWithPaginationComponent, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxSelectWithPaginationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: { label: "label", required: "required", isMultiSelectionMode: "isMultiSelectionMode", optionLoader: "optionLoader", pageSize: "pageSize", showDefaultTitle: "showDefaultTitle", showUncheckAll: "showUncheckAll", readonly: "readonly", template: "template", viewToModelValueAdapter: "viewToModelValueAdapter", modelToViewValueAdapter: "modelToViewValueAdapter", optionFormatter: "optionFormatter" }, outputs: { toggleDropdown: "toggleDropdown", selectionChange: "selectionChange" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RxSelectWithPaginationComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "ngModel", first: true, predicate: i1$1.AdaptRxSelectComponent, descendants: true, read: i2.NgModel, static: true }, { propertyName: "adaptSelectComponent", first: true, predicate: i1$1.AdaptRxSelectComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-rx-select\n  class=\"mb-0\"\n  [popupClass]=\"'rx-truncate-option-content'\"\n  [label]=\"label\"\n  [multiple]=\"isMultiSelectionMode\"\n  [selectAllButton]=\"showUncheckAll\"\n  [deselectAllButton]=\"isMultiSelectionMode\"\n  [options]=\"options$ | async\"\n  [ngModel]=\"selectedValue\"\n  (ngModelChange)=\"onSelectedValueChange($event)\"\n  [disabled]=\"formControl.disabled\"\n  [readonly]=\"readonly\"\n  [required]=\"required\"\n  [loadMoreCallback]=\"loadMoreCallbackFunc\"\n  [loadMoreButton]=\"!(pageSize === -1) && showLoadMoreButton\"\n  [loadingState]=\"isOptionLoadingInProgress && !isFirstOptionPageLoaded\"\n  [loadMoreInProgress]=\"isOptionLoadingInProgress && isFirstOptionPageLoaded\"\n  (onFilterValueChange)=\"onFilterValueChange($event)\"\n  (onPopupOpenChange)=\"onDropdownToggle($event)\"\n  [optionFormatter]=\"optionFormatter\"\n  [enableFilter]=\"true\"\n  [emptyOption]=\"!isMultiSelectionMode\"\n  [optionContentTemplate]=\"template\"\n  (onSelectionChange)=\"selectionChange.emit($event)\"\n></adapt-rx-select>\n", components: [{ type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectWithPaginationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-select-with-pagination',
                        templateUrl: './select-with-pagination.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RxSelectWithPaginationComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; }, propDecorators: { ngModel: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptRxSelectComponent, { static: true, read: i2.NgModel }]
                }], adaptSelectComponent: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptRxSelectComponent, { static: true }]
                }], label: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], isMultiSelectionMode: [{
                    type: i0.Input
                }], optionLoader: [{
                    type: i0.Input
                }], pageSize: [{
                    type: i0.Input
                }], showDefaultTitle: [{
                    type: i0.Input
                }], showUncheckAll: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], template: [{
                    type: i0.Input
                }], toggleDropdown: [{
                    type: i0.Output
                }], selectionChange: [{
                    type: i0.Output
                }], viewToModelValueAdapter: [{
                    type: i0.Input
                }], modelToViewValueAdapter: [{
                    type: i0.Input
                }], optionFormatter: [{
                    type: i0.Input
                }] } });

    var RxSelectWithPaginationModule = /** @class */ (function () {
        function RxSelectWithPaginationModule() {
        }
        return RxSelectWithPaginationModule;
    }());
    RxSelectWithPaginationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectWithPaginationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxSelectWithPaginationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectWithPaginationModule, declarations: [RxSelectWithPaginationComponent], imports: [i1$1.AdaptRxSelectModule, i2.FormsModule, i4$1.TranslateModule, i4.CommonModule], exports: [RxSelectWithPaginationComponent] });
    RxSelectWithPaginationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectWithPaginationModule, imports: [[i1$1.AdaptRxSelectModule, i2.FormsModule, i4$1.TranslateModule, i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectWithPaginationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1$1.AdaptRxSelectModule, i2.FormsModule, i4$1.TranslateModule, i4.CommonModule],
                        exports: [RxSelectWithPaginationComponent],
                        declarations: [RxSelectWithPaginationComponent]
                    }]
            }] });

    var RxPermissionEditorDialogComponent = /** @class */ (function (_super) {
        __extends(RxPermissionEditorDialogComponent, _super);
        function RxPermissionEditorDialogComponent(activeModalRef, rxGroupDataPage, rxRecordInstanceUtilsService, rxRoleDataPage, rxModalService, rxBundleCache, renderer, injector, translateService) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.rxGroupDataPage = rxGroupDataPage;
            _this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
            _this.rxRoleDataPage = rxRoleDataPage;
            _this.rxModalService = rxModalService;
            _this.rxBundleCache = rxBundleCache;
            _this.renderer = renderer;
            _this.injector = injector;
            _this.translateService = translateService;
            _this.permissions = [];
            _this.permissionTypes = i1$2.RX_PERMISSION.permissionType;
            _this.areSecurityLabelsAvailable = false;
            _this.permissionScope = '';
            _this.canSave = false;
            _this.buttonLabels = {
                group: _this.translateService.instant('com.bmc.arsys.rx.client.permission-editor.button.group.label'),
                role: _this.translateService.instant('com.bmc.arsys.rx.client.permission-editor.button.role.label'),
                securityLabel: _this.translateService.instant('com.bmc.arsys.rx.client.permission-editor.button.securityLabel.label')
            };
            return _this;
        }
        RxPermissionEditorDialogComponent.prototype.isDirty = function () {
            return this.canSave;
        };
        RxPermissionEditorDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            var modalData = this.activeModalRef.getData();
            this.metadata = i1$2.RX_PERMISSION.permissionDialogMetadata[modalData.type];
            this.actionsData = this.metadata.actions;
            this.permissionScope = modalData.permissionScope || '';
            this.permissions = lodash.map(modalData.assignedPermissions, function (assignedPermission) {
                var permissionType = _this.getPermissionOwnerType(assignedPermission);
                var permission = {
                    permittedActions: {},
                    type: permissionType,
                    selectedPermissionDescriptor: [
                        {
                            value: assignedPermission.ownerId.value,
                            displayValue: assignedPermission.ownerId.name
                        }
                    ],
                    isWarningShown: false
                };
                _this.setPermissionRestriction(permission, assignedPermission.type);
                if (assignedPermission.ownerId.roleApplicationName) {
                    permission.selectedPermissionDescriptor[0].applicationName = assignedPermission.ownerId.roleApplicationName;
                }
                return permission;
            });
            this.canSave = false;
        };
        RxPermissionEditorDialogComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.renderer.selectRootElement(_this.addNewPermissionButton.nativeElement, true).focus();
            });
        };
        RxPermissionEditorDialogComponent.prototype.dismiss = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        RxPermissionEditorDialogComponent.prototype.roleLoader = function (startIndex, pageSize, searchQuery) {
            var queryParams = {
                propertySelection: ['applicationName', 'roleName', 'roleID'].join(','),
                sortBy: 'roleName'
            };
            var queryExpression = this.formAdditionalQueryCriteria(searchQuery, 'roleName');
            if (queryExpression) {
                queryParams.queryExpression = queryExpression;
            }
            if (this.permissionScope !== i1$2.RX_PERMISSION.permissionScope.all) {
                queryParams.applicationName = this.rxBundleCache.bundleId;
            }
            return this.rxRoleDataPage
                .get({
                params: Object.assign({ startIndex: startIndex, pageSize: pageSize }, queryParams)
            })
                .pipe(operators.map(function (roleDataPage) { return ({
                totalSize: roleDataPage.totalSize,
                options: lodash.map(roleDataPage.data, function (role) { return ({
                    displayValue: role.roleName,
                    value: role.roleID,
                    applicationName: role.applicationName
                }); })
            }); }));
        };
        RxPermissionEditorDialogComponent.prototype.groupLoader = function (startIndex, pageSize, searchQuery) {
            var queryExpression = lodash.compact([
                this.formAdditionalQueryCriteria(searchQuery, 'groupName'),
                "('" + i1$2.RX_PERMISSION.groupCategoryFieldId + "' != " + i1$2.RX_PERMISSION.restrictedGroupCategoryForNonFieldPermissions.dynamic + "\n      AND '" + i1$2.RX_PERMISSION.groupIdFieldId + "' != " + i1$2.RX_PERMISSION.restrictedGroupIdForNonFieldPermissions.subAdministratorGroup + ")"
            ]).join(' AND ');
            var queryParams = {
                queryExpression: queryExpression,
                propertySelection: ['groupName', 'groupId'].join(','),
                sortBy: 'groupName'
            };
            return this.rxGroupDataPage
                .get({
                params: Object.assign({ startIndex: startIndex, pageSize: pageSize }, queryParams)
            })
                .pipe(operators.map(function (groupDataPage) { return ({
                totalSize: groupDataPage.totalSize,
                options: lodash.map(groupDataPage.data, function (group) { return ({
                    displayValue: group.groupName,
                    value: group.groupId
                }); })
            }); }));
        };
        RxPermissionEditorDialogComponent.prototype.addNewPermission = function () {
            var permission = {
                permittedActions: {},
                type: i1$2.RX_PERMISSION.permissionType.role,
                selectedPermissionDescriptor: null,
                isWarningShown: false
            };
            this.setPermissionRestriction(permission);
            this.permissions.push(permission);
        };
        RxPermissionEditorDialogComponent.prototype.setRestrictionForAllPermissions = function (actionValue) {
            var _this = this;
            lodash.forEach(this.permissions, function (permission) {
                _this.setPermissionRestriction(permission, actionValue);
            });
        };
        RxPermissionEditorDialogComponent.prototype.removePermission = function (permission) {
            lodash.pull(this.permissions, permission);
            this.canSave = true;
        };
        RxPermissionEditorDialogComponent.prototype.setPermissionType = function (permission, type) {
            permission.type = type;
            permission.selectedPermissionDescriptor = null;
            this.setPermissionRestriction(permission);
        };
        RxPermissionEditorDialogComponent.prototype.setPermissionRestriction = function (permission, actionValue, isChecked) {
            if (actionValue === void 0) { actionValue = ''; }
            if (isChecked === void 0) { isChecked = true; }
            if (isChecked) {
                lodash.forEach(this.actionsData, function (action) {
                    permission.permittedActions[action.value] = action.value === actionValue;
                });
            }
            this.canSave = true;
        };
        RxPermissionEditorDialogComponent.prototype.save = function () {
            var _this = this;
            var permissionOwners = lodash.uniqBy(this.getPermissionOwners(), 'ownerId.name');
            if (permissionOwners.length !== this.permissions.length) {
                this.rxModalService
                    .confirm({
                    title: 'Warning',
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: 'Duplicate and misconfigured entries will be removed. Do you want to continue?'
                })
                    .then(function (value) {
                    if (value) {
                        _this.activeModalRef.close({
                            permissions: permissionOwners
                        });
                    }
                    else {
                        lodash.forEach(_this.permissions, function (permission) {
                            permission.isWarningShown = !lodash.find(permission.permittedActions, lodash.identity);
                        });
                    }
                });
            }
            else {
                this.activeModalRef.close({
                    permissions: permissionOwners
                });
            }
        };
        RxPermissionEditorDialogComponent.prototype.getPermissionOwners = function () {
            var _this = this;
            lodash.remove(this.permissions, function (permission) { return lodash.isEmpty(permission.selectedPermissionDescriptor); });
            var actualPermissions = lodash.cloneDeep(this.permissions);
            return lodash.flow(function (permissions) { return lodash.map(permissions, function (permission) {
                if (_this.actionsData.length === 0) {
                    return _this.getPermissionOwner(permission, _this.metadata.defaultPermittedAction);
                }
                else {
                    var permissionOwner_1;
                    lodash.forEach(_this.actionsData, function (action) {
                        if (permission.permittedActions[action.value]) {
                            permissionOwner_1 = _this.getPermissionOwner(permission, action.value);
                        }
                    });
                    return permissionOwner_1;
                }
            }); }, lodash.compact)(actualPermissions);
        };
        RxPermissionEditorDialogComponent.prototype.getPermissionOwner = function (permission, type) {
            var permissionOwner = {
                ownerId: {
                    value: permission.selectedPermissionDescriptor[0].value === i3.RX_RECORD_DEFINITION.securityLabelIds.assigneeGroup
                        ? i3.RX_RECORD_DEFINITION.groupIds.assigneeGroup
                        : permission.selectedPermissionDescriptor[0].value,
                    type: (permission.type === i1$2.RX_PERMISSION.permissionType.securityLabel
                        ? i1$2.RX_PERMISSION.permissionType.group
                        : permission.type).toUpperCase(),
                    name: permission.selectedPermissionDescriptor[0].displayValue
                },
                type: type
            };
            if (this.permissionScope === i1$2.RX_PERMISSION.permissionScope.all &&
                permissionOwner.ownerId.type === i1$2.RX_PERMISSION.permissionType.role.toUpperCase()) {
                permissionOwner.ownerId.roleApplicationName = permission.selectedPermissionDescriptor[0].applicationName;
            }
            return permissionOwner;
        };
        RxPermissionEditorDialogComponent.prototype.getPermissionOwnerType = function (permissionOwner) {
            var permissionOwnerId = permissionOwner.ownerId.value;
            if (lodash.isNumber(permissionOwnerId)) {
                return permissionOwnerId < 0 ? i1$2.RX_PERMISSION.permissionType.role : i1$2.RX_PERMISSION.permissionType.group;
            }
            else {
                return permissionOwner.type ? permissionOwner.type.toLowerCase() : i1$2.RX_PERMISSION.permissionType.role;
            }
        };
        RxPermissionEditorDialogComponent.prototype.formAdditionalQueryCriteria = function (searchQuery, fieldName) {
            return searchQuery
                ? "('" + fieldName + "' LIKE \"%" + this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery) + "%\")"
                : null;
        };
        RxPermissionEditorDialogComponent.prototype.keepKeyValueOrder = function () {
            return 0;
        };
        RxPermissionEditorDialogComponent.prototype.onPermissionDescriptorSelected = function () {
            this.canSave = true;
        };
        return RxPermissionEditorDialogComponent;
    }(i1.RxModalClass));
    RxPermissionEditorDialogComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorDialogComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i1__namespace$2.RxGroupDataPageService }, { token: i3__namespace.RxRecordInstanceUtilsService }, { token: i1__namespace$2.RxRoleDataPageService }, { token: i1__namespace.RxModalService }, { token: i1__namespace$2.RxBundleCacheService }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.Injector }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxPermissionEditorDialogComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxPermissionEditorDialogComponent, selector: "rx-permission-editor-dialog", viewQueries: [{ propertyName: "addNewPermissionButton", first: true, predicate: ["addNewPermissionButton"], descendants: true, read: i0.ElementRef }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ 'com.bmc.arsys.rx.client.permission-editor.title' | translate }}</h5>\n  <button class=\"close dp-close\" rx-id=\"x-button\" (click)=\"dismiss()\"></button>\n</div>\n\n<div class=\"modal-body\">\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"p-0\"\n    #addNewPermissionButton\n    rx-id=\"add-new-permission-button\"\n    (click)=\"addNewPermission()\"\n  >\n    <span class=\"d-icon-plus_circle\"></span>\n    {{ 'com.bmc.arsys.rx.client.permission-editor.button.add-permission.label' | translate }}\n  </button>\n\n  <div class=\"border-bottom pb-1 d-flex align-items-center\">\n    <div class=\"permission-type mr-2\">\n      <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.permission-editor.column.type.label' | translate }}\">\n      </adapt-rx-control-label>\n    </div>\n\n    <div class=\"permission-role-selection d-flex align-items-center mr-2\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.permission-editor.permission-type.title' | translate }}\"\n      ></adapt-rx-control-label>\n    </div>\n\n    <div class=\"permission-warning\"></div>\n\n    <div class=\"permission-actions d-flex justify-content-center mr-2\" *ngIf=\"actionsData?.length\">\n      <div class=\"permission-action d-flex flex-column justify-content-center mr-1\" *ngFor=\"let action of actionsData\">\n        <adapt-rx-control-label class=\"text-center\" label=\"{{ action.label | translate }}\"></adapt-rx-control-label>\n        <adapt-button\n          btn-type=\"secondary\"\n          size=\"xtra-small\"\n          (click)=\"setRestrictionForAllPermissions(action.value)\"\n          [disabled]=\"permissions.length === 0\"\n        >\n          {{ 'com.bmc.arsys.rx.client.permission-editor.button.set-all.caption' | translate }}\n        </adapt-button>\n      </div>\n    </div>\n\n    <div class=\"remove-permission\"></div>\n  </div>\n\n  <div class=\"border-bottom py-2 d-flex\" *ngFor=\"let permission of permissions\">\n    <div class=\"permission-type mr-2\">\n      <div class=\"btn-group\">\n        <div *ngFor=\"let permissionType of permissionTypes | keyvalue: keepKeyValueOrder\">\n          <button\n            adapt-button\n            type=\"button\"\n            [btn-type]=\"permission.type === permissionType.value ? 'primary' : 'secondary'\"\n            *ngIf=\"\n              permissionType.value !== permissionTypes.securityLabel ||\n              (permissionType.value === permissionTypes.securityLabel && areSecurityLabelsAvailable)\n            \"\n            (click)=\"setPermissionType(permission, permissionType.value)\"\n          >\n            {{ buttonLabels[permissionType.value] }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"permission-role-selection mr-2\">\n      <rx-select-with-pagination\n        class=\"select-max-width\"\n        *ngIf=\"permission.type === permissionTypes.role\"\n        [(ngModel)]=\"permission.selectedPermissionDescriptor\"\n        (ngModelChange)=\"onPermissionDescriptorSelected()\"\n        [optionLoader]=\"roleLoader.bind(this)\"\n        [showUncheckAll]=\"false\"\n      ></rx-select-with-pagination>\n\n      <rx-select-with-pagination\n        *ngIf=\"permission.type === permissionTypes.group\"\n        class=\"select-max-width\"\n        [(ngModel)]=\"permission.selectedPermissionDescriptor\"\n        (ngModelChange)=\"onPermissionDescriptorSelected()\"\n        [optionLoader]=\"groupLoader.bind(this)\"\n        [showUncheckAll]=\"false\"\n      ></rx-select-with-pagination>\n    </div>\n\n    <div class=\"permission-warning d-flex align-items-center\">\n      <span *ngIf=\"permission.isWarningShown\" class=\"d-icon-exclamation_triangle\"> </span>\n    </div>\n\n    <div class=\"permission-actions d-flex\" *ngIf=\"actionsData?.length\">\n      <div class=\"permission-action d-flex justify-content-center mr-1\" *ngFor=\"let action of actionsData\">\n        <adapt-rx-checkbox\n          class=\"checkbox-inline m-0\"\n          [(ngModel)]=\"permission.permittedActions[action.value]\"\n          (ngModelChange)=\"setPermissionRestriction(permission, action.value, $event)\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n    </div>\n\n    <div class=\"remove-permission d-flex justify-content-end mr-2\">\n      <button class=\"close\" (click)=\"removePermission(permission)\"></button>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" [disabled]=\"!canSave\" rx-id=\"save-button\" (click)=\"save()\">\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"dismiss()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{min-height:600px}.permission-type{flex:2}.permission-role-selection{flex:3;width:5rem}.permission-actions{flex:1}.permission-warning,.remove-permission{margin-top:5px;flex:.3}.permission-action{flex:1}:host ::ng-deep adapt-select{max-width:300px}:host ::ng-deep .dropdown-item{white-space:normal;word-break:break-all}.permission-warning{color:#f83200}.checkbox-inline{height:20px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "keyvalue": i4__namespace.KeyValuePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorDialogComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-permission-editor-dialog',
                        templateUrl: './permission-editor-dialog.component.html',
                        styleUrls: ['./permission-editor-dialog.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i1__namespace$2.RxGroupDataPageService }, { type: i3__namespace.RxRecordInstanceUtilsService }, { type: i1__namespace$2.RxRoleDataPageService }, { type: i1__namespace.RxModalService }, { type: i1__namespace$2.RxBundleCacheService }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.Injector }, { type: i4__namespace$1.TranslateService }]; }, propDecorators: { addNewPermissionButton: [{
                    type: i0.ViewChild,
                    args: ['addNewPermissionButton', { read: i0.ElementRef }]
                }] } });

    var RxPermissionEditorComponent = /** @class */ (function (_super) {
        __extends(RxPermissionEditorComponent, _super);
        function RxPermissionEditorComponent(rxModalService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            return _this;
        }
        RxPermissionEditorComponent.prototype.openEditor = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                content: RxPermissionEditorDialogComponent,
                data: {
                    assignedPermissions: lodash.cloneDeep(this.value),
                    type: this.options.type,
                    permissionScope: this.options.permissionScope,
                    onApiReady: function (dialogApi) {
                        _this.dialogApi = dialogApi;
                    }
                }
            })
                .then(function (data) {
                _this.dialogApi = null;
                _this.value = data.permissions;
            })
                .catch(function () {
                _this.dialogApi = null;
            });
        };
        RxPermissionEditorComponent.prototype.isDirty = function () {
            var _a;
            return Boolean((_a = this.dialogApi) === null || _a === void 0 ? void 0 : _a.isDirty());
        };
        return RxPermissionEditorComponent;
    }(ValueAccessor));
    RxPermissionEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorComponent, deps: [{ token: i1__namespace.RxModalService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxPermissionEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: RxPermissionEditorComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"d-flex justify-content-between align-items-center\">\n  <label class=\"form-control-label mb-0\">{{ options.label }}</label>\n\n  <button\n    adapt-button\n    type=\"button\"\n    class=\"p-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"edit-button\"\n    *ngIf=\"!isDisabled\"\n    (click)=\"openEditor()\"\n  >\n    <span class=\"d-icon-pencil\"></span>\n    Edit\n  </button>\n</div>\n\n<div class=\"permissions\">\n  <div *ngIf=\"value?.length === 0\">\n    <h6 class=\"my-1\">None set (Admins only)</h6>\n  </div>\n\n  <div class=\"d-flex justify-content-between align-items-center pt-2\" *ngFor=\"let permission of value\">\n    <div class=\"permission-name\">\n      {{ permission.ownerId.name }}\n    </div>\n\n    <adapt-tag>{{ permission.type }}</adapt-tag>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.permission-name{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host ::ng-deep .a-tag{font-size:10px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-permission-editor',
                        templateUrl: './permission-editor.component.html',
                        styleUrls: ['./permission-editor.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: RxPermissionEditorComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RxPermissionEditorModule = /** @class */ (function () {
        function RxPermissionEditorModule() {
        }
        return RxPermissionEditorModule;
    }());
    RxPermissionEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxPermissionEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorModule, declarations: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent], imports: [i4.CommonModule,
            RxSelectWithPaginationModule,
            i1.RxModalModule,
            i2.FormsModule,
            obsolete.AdaptSelectModule,
            i1$1.AdaptModalModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptTagModule,
            i4$1.TranslateModule,
            i1$1.AdaptRxCheckboxModule,
            i1$1.AdaptRxLabelModule], exports: [RxPermissionEditorDialogComponent, RxPermissionEditorComponent] });
    RxPermissionEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorModule, imports: [[
                i4.CommonModule,
                RxSelectWithPaginationModule,
                i1.RxModalModule,
                i2.FormsModule,
                obsolete.AdaptSelectModule,
                i1$1.AdaptModalModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptTagModule,
                i4$1.TranslateModule,
                i1$1.AdaptRxCheckboxModule,
                i1$1.AdaptRxLabelModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxPermissionEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            RxSelectWithPaginationModule,
                            i1.RxModalModule,
                            i2.FormsModule,
                            obsolete.AdaptSelectModule,
                            i1$1.AdaptModalModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptTagModule,
                            i4$1.TranslateModule,
                            i1$1.AdaptRxCheckboxModule,
                            i1$1.AdaptRxLabelModule
                        ],
                        declarations: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent],
                        exports: [RxPermissionEditorDialogComponent, RxPermissionEditorComponent],
                        entryComponents: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent]
                    }]
            }] });

    var RenameDefinitionModalComponent = /** @class */ (function (_super) {
        __extends(RenameDefinitionModalComponent, _super);
        function RenameDefinitionModalComponent(injector, activeModalRef, rxDefinitionNameService) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.injector = injector;
            _this.activeModalRef = activeModalRef;
            _this.rxDefinitionNameService = rxDefinitionNameService;
            _this.modalData = _this.activeModalRef.getData();
            return _this;
        }
        RenameDefinitionModalComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.bundleId = this.rxDefinitionNameService.getBundleId(this.modalData.definitionName);
            this.definitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.modalData.definitionName);
            this.oldDefinitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.modalData.definitionName);
            this.definitionNames = this.modalData.definitionNames
                .map(function (definitionName) { return _this.rxDefinitionNameService.getDisplayName(definitionName); })
                .filter(function (definitionName) { return definitionName !== _this.definitionDisplayName; });
        };
        RenameDefinitionModalComponent.prototype.isDirty = function () {
            return this.renameDefinitionModalForm.form.dirty;
        };
        RenameDefinitionModalComponent.prototype.getCorrectDefinitionNameValidator = function () {
            var _this = this;
            return function (control) {
                var result = null;
                if (control.value && !i3.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(control.value)) {
                    result = { invalidDefinitionName: { message: _this.modalData.validationErrorText } };
                }
                return result;
            };
        };
        RenameDefinitionModalComponent.prototype.onCancelClick = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        RenameDefinitionModalComponent.prototype.onSaveClick = function () {
            if (this.bundleId) {
                this.activeModalRef.close(this.rxDefinitionNameService.getDefinitionName(this.bundleId, this.definitionDisplayName));
            }
            else {
                this.activeModalRef.close(this.definitionDisplayName);
            }
        };
        return RenameDefinitionModalComponent;
    }(i1.RxModalClass));
    RenameDefinitionModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RenameDefinitionModalComponent, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$1.ActiveModalRef }, { token: i1__namespace$2.RxDefinitionNameService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RenameDefinitionModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RenameDefinitionModalComponent, selector: "rx-rename-definition-modal", viewQueries: [{ propertyName: "renameDefinitionModalForm", first: true, predicate: ["renameDefinitionModalForm"], descendants: true, read: i2.NgForm, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <adapt-alert\n    *ngIf=\"modalData.infoText\"\n    [config]=\"{ title: modalData.infoText, type: 'inline', variant: 'warning' }\"\n  ></adapt-alert>\n\n  <form #renameDefinitionModalForm=\"ngForm\">\n    <adapt-rx-textfield\n      name=\"definitionDisplayName\"\n      [(ngModel)]=\"definitionDisplayName\"\n      [label]=\"modalData.fieldLabel\"\n      [rxCustomValidators]=\"getCorrectDefinitionNameValidator()\"\n      [maxlength]=\"modalData.maxLength || null\"\n      [rxUnique]=\"{\n        errorMessage:\n          'com.bmc.arsys.rx.client.rename-definition-modal.definition-already-exists.message'\n          | translate: { definitionType: modalData.definitionType },\n        items: definitionNames\n      }\"\n      adaptRequired\n      [autofocus]=\"modalData.autoFocus !== false\"\n    ></adapt-rx-textfield>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"\n      !renameDefinitionModalForm.form.dirty ||\n      !renameDefinitionModalForm.form.valid ||\n      oldDefinitionDisplayName === definitionDisplayName\n    \"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancelClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1__namespace$1.AdaptRequiredValidatorDirective, selector: "[adaptRequired][ngModel],[adaptRequired][formControl]", inputs: ["adaptRequiredMessageFn"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1__namespace.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i2__namespace.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i1__namespace$3.RxUniqueValidator, selector: "[rxUnique]", inputs: ["rxUnique"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RenameDefinitionModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-rename-definition-modal',
                        templateUrl: './rename-definition-modal.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$1.ActiveModalRef }, { type: i1__namespace$2.RxDefinitionNameService }]; }, propDecorators: { renameDefinitionModalForm: [{
                    type: i0.ViewChild,
                    args: ['renameDefinitionModalForm', { static: true, read: i2.NgForm }]
                }] } });

    var RenameDefinitionModalModule = /** @class */ (function () {
        function RenameDefinitionModalModule() {
        }
        return RenameDefinitionModalModule;
    }());
    RenameDefinitionModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RenameDefinitionModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RenameDefinitionModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RenameDefinitionModalModule, declarations: [RenameDefinitionModalComponent], imports: [i1__namespace$1.AdaptAlertModule, i1$1.AdaptButtonModule,
            i1$1.AdaptModalModule,
            i1$1.AdaptRxFormControlModule,
            i1$1.AdaptRxTextfieldModule,
            i4.CommonModule,
            i2.FormsModule,
            i1.RxDirectivesModule,
            i1$3.RxUniqueValidatorModule,
            i4$1.TranslateModule] });
    RenameDefinitionModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RenameDefinitionModalModule, imports: [[
                i1$1.AdaptAlertModule.forRoot(),
                i1$1.AdaptButtonModule,
                i1$1.AdaptModalModule,
                i1$1.AdaptRxFormControlModule,
                i1$1.AdaptRxTextfieldModule,
                i4.CommonModule,
                i2.FormsModule,
                i1.RxDirectivesModule,
                i1$3.RxUniqueValidatorModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RenameDefinitionModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RenameDefinitionModalComponent],
                        imports: [
                            i1$1.AdaptAlertModule.forRoot(),
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptModalModule,
                            i1$1.AdaptRxFormControlModule,
                            i1$1.AdaptRxTextfieldModule,
                            i4.CommonModule,
                            i2.FormsModule,
                            i1.RxDirectivesModule,
                            i1$3.RxUniqueValidatorModule,
                            i4$1.TranslateModule
                        ],
                        entryComponents: [RenameDefinitionModalComponent]
                    }]
            }] });

    var RX_REVERT_CUSTOMIZATION = {
        events: {
            revertCustomization: 'REVERT_CUSTOMIZATION'
        }
    };

    var RxRevertCustomizationComponent = /** @class */ (function () {
        function RxRevertCustomizationComponent(rxModalService, rxOverlayService) {
            this.rxModalService = rxModalService;
            this.rxOverlayService = rxOverlayService;
            this.events = new i0.EventEmitter();
            this.showOverlayOptions = false;
            this.isRevertActionHidden = false;
            this.isOverlayOperationHidden = false;
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        RxRevertCustomizationComponent.prototype.ngOnInit = function () {
            this.updateData();
        };
        RxRevertCustomizationComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b, _c, _d;
            if (changes.options &&
                (changes.options.currentValue.overlayGroupId !== ((_a = changes.options.previousValue) === null || _a === void 0 ? void 0 : _a.overlayGroupId) ||
                    ((_b = changes.options.currentValue.overlayDescriptor) === null || _b === void 0 ? void 0 : _b.parentOverlayGroupId) !==
                        ((_d = (_c = changes.options.previousValue) === null || _c === void 0 ? void 0 : _c.overlayDescriptor) === null || _d === void 0 ? void 0 : _d.parentOverlayGroupId))) {
                this.updateData();
            }
        };
        RxRevertCustomizationComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxRevertCustomizationComponent.prototype.updateData = function () {
            if (this.options.overlayGroupId) {
                this.overlayOperation = this.getOverlayOperation();
                this.isOverlayOperationHidden = i1$2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup === this.overlayOperation;
                this.isRevertActionHidden = this.shouldHideRevertAction();
                this.showOverlayOptions = !this.isOverlayOperationHidden || !this.isRevertActionHidden;
            }
            else {
                this.overlayOperation = i1$2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
                this.isOverlayOperationHidden = true;
                this.isRevertActionHidden = true;
            }
            this.events.emit({ type: i1$2.FormBuilderEvent.HideWidget, payload: !this.showOverlayOptions });
        };
        RxRevertCustomizationComponent.prototype.revertCustomization = function () {
            this.events.emit({ type: RX_REVERT_CUSTOMIZATION.events.revertCustomization });
        };
        RxRevertCustomizationComponent.prototype.getOverlayOperation = function () {
            return this.rxOverlayService.getOverlayOperation(this.options.overlayGroupId, this.options.overlayDescriptor ? this.options.overlayDescriptor.parentOverlayGroupId : null);
        };
        RxRevertCustomizationComponent.prototype.shouldHideRevertAction = function () {
            return this.overlayOperation === i1$2.RX_OVERLAY.operationTypes.customizedInThisOverlayGroup
                ? !this.options.allowOverlay
                : true;
        };
        RxRevertCustomizationComponent.prototype.onRevertCustomization = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: i1.RX_MODAL.modalStyles.warning,
                message: 'Are you sure you want to revert customization?'
            })
                .then(function (revert) {
                if (revert) {
                    _this.revertCustomization();
                }
            });
        };
        return RxRevertCustomizationComponent;
    }());
    RxRevertCustomizationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRevertCustomizationComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i1__namespace$2.RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxRevertCustomizationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: { options: "options", isDisabled: "isDisabled" }, outputs: { events: "events" }, usesOnChanges: true, ngImport: i0__namespace, template: "<div *ngIf=\"showOverlayOptions\" class=\"d-flex justify-content-between align-items-end\">\n  <div *ngIf=\"!isOverlayOperationHidden\" class=\"mb-0\">\n    <adapt-rx-control-label label=\"Customization status\" class=\"d-block pb-1\"></adapt-rx-control-label>\n    {{ overlayOperation }}\n  </div>\n\n  <adapt-button\n    class=\"p-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"revert-customization-button\"\n    *ngIf=\"!isRevertActionHidden\"\n    (click)=\"onRevertCustomization()\"\n  >\n    <span class=\"d-icon-left-undo\"></span>\n    Revert\n  </adapt-button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRevertCustomizationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-revert-customization',
                        templateUrl: './revert-customization.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i1__namespace$2.RxOverlayService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var RxRevertCustomizationModule = /** @class */ (function () {
        function RxRevertCustomizationModule() {
        }
        return RxRevertCustomizationModule;
    }());
    RxRevertCustomizationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRevertCustomizationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxRevertCustomizationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRevertCustomizationModule, declarations: [RxRevertCustomizationComponent], imports: [i4.CommonModule, i1$1.AdaptButtonModule, i1$1.AdaptRxLabelModule], exports: [RxRevertCustomizationComponent] });
    RxRevertCustomizationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRevertCustomizationModule, imports: [[i4.CommonModule, i1$1.AdaptButtonModule, i1$1.AdaptRxLabelModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRevertCustomizationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i1$1.AdaptButtonModule, i1$1.AdaptRxLabelModule],
                        declarations: [RxRevertCustomizationComponent],
                        entryComponents: [RxRevertCustomizationComponent],
                        exports: [RxRevertCustomizationComponent]
                    }]
            }] });

    var RxSearchComponent = /** @class */ (function () {
        function RxSearchComponent(activatedRoute, router, rxDataPageService, rxShellService, rxPageTitleService, translateService, rxBundleCacheService) {
            this.activatedRoute = activatedRoute;
            this.router = router;
            this.rxDataPageService = rxDataPageService;
            this.rxShellService = rxShellService;
            this.rxPageTitleService = rxPageTitleService;
            this.translateService = translateService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.pageSize = 50;
            this.loading = true;
            this.loadingMore = false;
            this.startIndex = 0;
            this.totalSize = 0;
            this.searchString = '';
        }
        RxSearchComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxPageTitleService.set(this.translateService.instant('com.bmc.arsys.rx.client.shell.search.results.label'));
            this.subscription = rxjs.combineLatest([this.activatedRoute.queryParamMap, this.rxShellService.shellConfig$]).subscribe(function (_a) {
                var _b = __read(_a, 2), queryParams = _b[0], shellConfig = _b[1];
                _this.searchString = queryParams.get('q') || '';
                _this.globalSearchRecords = lodash.map(shellConfig.globalSearchRecords, function (item) {
                    item.selected = true;
                    return item;
                });
                _this.recordDefinitionsByName = lodash.keyBy(shellConfig.globalSearchRecords, 'name');
                _this.loading = false;
                _this.getGlobalSearchResults();
            });
            this.columns = [
                {
                    field: 'colId',
                    width: '45px',
                    cellTemplate: this.colIdCellTemplate
                },
                {
                    field: 'recordDefinitionName',
                    cellTemplate: this.cellTemplate
                }
            ];
        };
        RxSearchComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        Object.defineProperty(RxSearchComponent.prototype, "searchValue", {
            get: function () {
                return this.searchString.trim();
            },
            enumerable: false,
            configurable: true
        });
        RxSearchComponent.prototype.getGlobalSearchResults = function (infiniteScroll) {
            var _this = this;
            if (infiniteScroll === void 0) { infiniteScroll = false; }
            this.loading = true;
            this.loadingMore = infiniteScroll;
            if (!infiniteScroll) {
                this.startIndex = 0;
                this.totalSize = 0;
            }
            if (this.searchValue) {
                var queryParams = {
                    mayHaveText: "%" + this.searchValue + "%",
                    pageSize: this.pageSize,
                    searchResultOption: 'WORDS_AROUND_HIT',
                    startIndex: this.startIndex
                };
                if (!lodash.isEmpty(this.globalSearchRecords)) {
                    queryParams.recordDefinitionNames = lodash.map(lodash.filter(this.globalSearchRecords, 'selected'), 'name').join(',');
                }
                if (queryParams.recordDefinitionNames) {
                    this.rxDataPageService
                        .withType('com.bmc.arsys.rx.application.search.datapage.SearchDataPageQuery')
                        .get({ params: queryParams })
                        .pipe(operators.catchError(function (error) {
                        _this.loading = false;
                        _this.loadingMore = false;
                        return rxjs.throwError(error);
                    }))
                        .subscribe(function (results) {
                        _this.loading = false;
                        _this.loadingMore = false;
                        if (_this.totalSize > 0) {
                            _this.totalSize--;
                        }
                        _this.totalSize += _this.pageSize === results.totalSize ? results.totalSize + 1 : results.totalSize;
                        var newData = results.data;
                        _this.startIndex += newData.length;
                        if (infiniteScroll) {
                            _this.searchResults = _this.searchResults.concat(newData);
                        }
                        else {
                            _this.searchResults = newData;
                        }
                        _this.searchResults = lodash.sortBy(_this.searchResults, 'weight');
                    });
                }
                else {
                    this.resetSearchResults();
                }
            }
            else {
                this.resetSearchResults();
            }
        };
        RxSearchComponent.prototype.resetSearchResults = function () {
            this.searchResults = [];
            this.totalSize = 0;
            this.loading = false;
            this.loadingMore = false;
        };
        RxSearchComponent.prototype.search = function () {
            var trimmedSearchValue = this.searchString.trim();
            if (trimmedSearchValue) {
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: { q: trimmedSearchValue },
                    queryParamsHandling: 'merge'
                });
            }
        };
        RxSearchComponent.prototype.onFiltersChanged = function () {
            var _this = this;
            setTimeout(function () { return _this.getGlobalSearchResults(); });
        };
        RxSearchComponent.prototype.onLazyLoad = function (event) {
            this.getGlobalSearchResults(true);
        };
        RxSearchComponent.prototype.selectAllRecords = function () {
            this.globalSearchRecords.forEach(function (record) { return (record.selected = true); });
            this.getGlobalSearchResults();
        };
        RxSearchComponent.prototype.unSelectAllRecords = function () {
            this.globalSearchRecords.forEach(function (record) { return (record.selected = false); });
            this.getGlobalSearchResults();
        };
        return RxSearchComponent;
    }());
    RxSearchComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSearchComponent, deps: [{ token: i1__namespace$4.ActivatedRoute }, { token: i1__namespace$4.Router }, { token: i1__namespace$2.RxDataPageFactoryService }, { token: i3__namespace$1.RxShellService }, { token: i1__namespace$2.RxPageTitleService }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$2.RxBundleCacheService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxSearchComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSearchComponent, selector: "rx-search", viewQueries: [{ propertyName: "colIdCellTemplate", first: true, predicate: ["colIdCellTemplate"], descendants: true, static: true }, { propertyName: "cellTemplate", first: true, predicate: ["cellTemplate"], descendants: true, static: true }], ngImport: i0__namespace, template: "<div class=\"row\">\n  <div class=\"col-12\">\n    <h1 class=\"mb-4 mt-0\">{{ 'com.bmc.arsys.rx.client.common.search.label' | translate }}</h1>\n  </div>\n  <div class=\"col-6 col-md-4\">\n    <form autocomplete=\"off\" (ngSubmit)=\"search()\">\n      <adapt-rx-search\n        name=\"searchString\"\n        [autofocus]=\"true\"\n        [(ngModel)]=\"searchString\"\n        [placeholder]=\"'com.bmc.arsys.rx.client.shell.searchbox.placeholder' | translate\"\n      ></adapt-rx-search>\n    </form>\n  </div>\n  <div class=\"col-1 pl-0\">\n    <div adaptDropdown>\n      <button adaptDropdownToggle class=\"btn btn-link d-icon-left-filter pl-0\">\n        {{ 'com.bmc.arsys.rx.client.common.filter-data.label' | translate }}\n      </button>\n\n      <div adaptDropdownMenu class=\"dropdown-menu p-2\">\n        <div class=\"mb-3\">{{ 'com.bmc.arsys.rx.client.common.record-definition.label' | translate }}</div>\n\n        <div class=\"d-flex justify-content-between\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"select-all-button\"\n            class=\"btn btn-link p-0\"\n            (click)=\"selectAllRecords()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.select-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"select-none-button\"\n            class=\"btn btn-link p-0\"\n            (click)=\"unSelectAllRecords()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.select-none.label' | translate }}\n          </button>\n        </div>\n\n        <ul *ngIf=\"globalSearchRecords\" class=\"list-unstyled mb-0\">\n          <li *ngFor=\"let record of globalSearchRecords\">\n            <adapt-rx-checkbox\n              class=\"mb-0 mt-3\"\n              [label]=\"record.name | rxDefinitionNamePipe\"\n              [(ngModel)]=\"record.selected\"\n              (change)=\"onFiltersChanged()\"\n            ></adapt-rx-checkbox>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"searchValue && (searchResults?.length || loading)\" class=\"row table-wrapper mt-1\">\n  <div class=\"col-12\">\n    <adapt-table\n      scrollHeight=\"flex\"\n      [value]=\"searchResults\"\n      [columns]=\"columns\"\n      [totalRecords]=\"totalSize\"\n      [rows]=\"searchResults?.length\"\n      [first]=\"startIndex\"\n      [paginator]=\"false\"\n      [scrollable]=\"true\"\n      (onLazyLoad)=\"onLazyLoad($event)\"\n      [lazy]=\"true\"\n      [lazyLoadOnInit]=\"false\"\n      [loading]=\"loading\"\n      [loadingMore]=\"loadingMore\"\n      [enableInfiniteScrolling]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<ng-template #colIdCellTemplate let-rowIndex=\"rowIndex\">\n  {{ rowIndex + 1 }}\n</ng-template>\n\n<ng-template #cellTemplate let-searchResult=\"dataItem\">\n  <div>\n    <span\n      >{{ searchResult.recordDefinitionName | rxDefinitionNamePipe }}\n      <a\n        [routerLink]=\"[\n          '/',\n          this.rxBundleCacheService.bundleId,\n          'view',\n          recordDefinitionsByName[searchResult.recordDefinitionName].view\n        ]\"\n        [queryParams]=\"{ $0$: searchResult.recordInstanceId }\"\n        >{{ searchResult.recordInstanceDisplayId }}</a\n      ></span\n    >\n  </div>\n  <div>\n    <span>{{ searchResult.title }}</span>\n  </div>\n\n  <adapt-highlight class=\"search-result\" [result]=\"searchResult.wordsAroundHit\" [term]=\"searchValue\"></adapt-highlight>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;padding:15px;height:100%;overflow:auto}.table-wrapper{flex-grow:1}:host ::ng-deep adapt-table .at-cell mark{padding:0}:host ::ng-deep adapt-table .ui-table-scrollable-wrapper{border-right:none}:host ::ng-deep adapt-table .at-infinite-scrolling-loader{border-bottom:none;border-top:none}:host ::ng-deep adapt-table .at-header-cell,:host ::ng-deep adapt-table .at-cell{border-bottom:none}.search-result{white-space:pre-wrap;word-wrap:break-word}adapt-rx-search[name=searchString]{max-width:400px;min-width:auto}\n"], components: [{ type: i1__namespace$1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1__namespace$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1__namespace$1.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }], directives: [{ type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1__namespace$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1__namespace$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace$4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "rxDefinitionNamePipe": i1__namespace$2.RxDefinitionNamePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSearchComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-search',
                        templateUrl: './search.component.html',
                        styleUrls: ['./search.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$4.ActivatedRoute }, { type: i1__namespace$4.Router }, { type: i1__namespace$2.RxDataPageFactoryService }, { type: i3__namespace$1.RxShellService }, { type: i1__namespace$2.RxPageTitleService }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$2.RxBundleCacheService }]; }, propDecorators: { colIdCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['colIdCellTemplate', { static: true }]
                }], cellTemplate: [{
                    type: i0.ViewChild,
                    args: ['cellTemplate', { static: true }]
                }] } });

    var RxSearchModule = /** @class */ (function () {
        function RxSearchModule() {
        }
        return RxSearchModule;
    }());
    RxSearchModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSearchModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxSearchModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSearchModule, declarations: [RxSearchComponent], imports: [i1$1.AdaptButtonModule,
            i1$1.AdaptDropdownModule,
            i1$1.AdaptHighlightModule,
            i1$1.AdaptRxCheckboxModule,
            i1$1.AdaptRxSearchModule, i6__namespace.AdaptTableModule, i4.CommonModule,
            i2.FormsModule,
            i4$1.TranslateModule,
            i1$4.RouterModule,
            i1$2.RxDefinitionModule] });
    RxSearchModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSearchModule, imports: [[
                i1$1.AdaptButtonModule,
                i1$1.AdaptDropdownModule,
                i1$1.AdaptHighlightModule,
                i1$1.AdaptRxCheckboxModule,
                i1$1.AdaptRxSearchModule,
                i6.AdaptTableModule.forRoot(),
                i4.CommonModule,
                i2.FormsModule,
                i4$1.TranslateModule,
                i1$4.RouterModule,
                i1$2.RxDefinitionModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSearchModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxSearchComponent],
                        imports: [
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptDropdownModule,
                            i1$1.AdaptHighlightModule,
                            i1$1.AdaptRxCheckboxModule,
                            i1$1.AdaptRxSearchModule,
                            i6.AdaptTableModule.forRoot(),
                            i4.CommonModule,
                            i2.FormsModule,
                            i4$1.TranslateModule,
                            i1$4.RouterModule,
                            i1$2.RxDefinitionModule
                        ]
                    }]
            }] });

    var RX_USER_PREFERENCES = {
        supportedLocales: [
            {
                id: 'en',
                name: 'English'
            },
            {
                id: 'fr',
                name: 'français'
            },
            {
                id: 'de',
                name: 'Deutsch'
            },
            {
                id: 'it',
                name: 'italiano'
            },
            {
                id: 'zh-cn',
                name: '中文'
            },
            {
                id: 'ko',
                name: '한국어'
            },
            {
                id: 'pt-br',
                name: 'português'
            },
            {
                id: 'ru',
                name: 'русский'
            },
            {
                id: 'ja',
                name: '日本語'
            },
            {
                id: 'es',
                name: 'Español'
            },
            {
                id: 'nl',
                name: 'Nederlands'
            },
            {
                id: 'sv',
                name: 'svenska'
            },
            {
                id: 'da',
                name: 'dansk'
            },
            {
                id: 'no',
                name: 'norsk'
            }
        ],
        userPreference: {
            recordDefinitionName: 'User Preference',
            fieldIds: {
                loginName: 70061,
                name: 70062,
                value: 70063
            }
        },
        preferenceNames: {
            locale: 'Preferred-User-Locale'
        }
    };

    var RxUserPreferencesComponent = /** @class */ (function () {
        function RxUserPreferencesComponent(activeModalRef, rxCurrentUserService, rxRecordInstanceDataPageService, rxRecordInstanceService, translateService) {
            var _this = this;
            this.activeModalRef = activeModalRef;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.translateService = translateService;
            this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
            this.selectedLocale = [];
            this.supportedLocales = RX_USER_PREFERENCES.supportedLocales;
            this.optionFormatter = function (option) {
                return lodash.get(option, 'name', _this.defaultSelection);
            };
        }
        RxUserPreferencesComponent.prototype.ngOnInit = function () {
            this.init();
        };
        RxUserPreferencesComponent.prototype.init = function () {
            var _this = this;
            this.preferredLocale = this.rxCurrentUserService.getPreferredLocale();
            this.isAbleToChangeLocale = !this.preferredLocale;
            if (this.isAbleToChangeLocale) {
                this.queryInProgress = true;
                this.rxRecordInstanceDataPageService
                    .post({
                    params: {
                        recorddefinition: RX_USER_PREFERENCES.userPreference.recordDefinitionName,
                        queryExpression: "('" +
                            RX_USER_PREFERENCES.userPreference.fieldIds.name +
                            '\' = "' +
                            RX_USER_PREFERENCES.preferenceNames.locale +
                            '" AND \'' +
                            RX_USER_PREFERENCES.userPreference.fieldIds.loginName +
                            '\' = "' +
                            this.rxCurrentUserService.getName() +
                            '")',
                        propertySelection: [i3.RX_RECORD_DEFINITION.coreFieldIds.id]
                    }
                })
                    .pipe(operators.switchMap(function (dataPageResult) {
                    if (dataPageResult.totalSize) {
                        return _this.rxRecordInstanceService.get(RX_USER_PREFERENCES.userPreference.recordDefinitionName, dataPageResult.data[0][i3.RX_RECORD_DEFINITION.coreFieldIds.id]);
                    }
                    else {
                        return _this.rxRecordInstanceService.getNew(RX_USER_PREFERENCES.userPreference.recordDefinitionName);
                    }
                }))
                    .subscribe(function (recordInstance) {
                    _this.recordInstance = recordInstance;
                    var selectedLocaleId = _this.recordInstance.getFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.value);
                    _this.selectedLocale = [_this.supportedLocales.find(function (locale) { return locale.id === selectedLocaleId; })];
                    _this.queryInProgress = false;
                });
            }
            else {
                this.selectedLocale = [this.supportedLocales.find(function (locale) { return locale.id === _this.preferredLocale; })];
            }
        };
        RxUserPreferencesComponent.prototype.applyUserPreferences = function () {
            var _this = this;
            var save$;
            this.queryInProgress = true;
            var selectedLocaleId = lodash.get(this.selectedLocale, '[0].id', '');
            this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.value, selectedLocaleId);
            if (this.recordInstance.id) {
                save$ = this.rxRecordInstanceService.save(this.recordInstance);
            }
            else {
                this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.name, RX_USER_PREFERENCES.preferenceNames.locale);
                this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.loginName, this.rxCurrentUserService.getName());
                save$ = this.rxRecordInstanceService.create(this.recordInstance);
            }
            save$.subscribe(function () {
                _this.queryInProgress = false;
                _this.activeModalRef.close();
            });
        };
        RxUserPreferencesComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss();
        };
        return RxUserPreferencesComponent;
    }());
    RxUserPreferencesComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i1__namespace$2.RxCurrentUserService }, { token: i3__namespace.RxRecordInstanceDataPageService }, { token: i3__namespace.RxRecordInstanceService }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxUserPreferencesComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserPreferencesComponent, selector: "rx-user-preferences", ngImport: i0__namespace, template: "<rx-line-loader\n  *ngIf=\"queryInProgress\"\n  [loaderMessage]=\"'com.bmc.arsys.rx.client.common.loading-data' | translate\"\n></rx-line-loader>\n\n<div [hidden]=\"queryInProgress\" class=\"modal-body\">\n  <form name=\"userPreferencesForm\" novalidate #userPreferencesForm=\"ngForm\">\n    <adapt-rx-select\n      [disabled]=\"!isAbleToChangeLocale || queryInProgress\"\n      [emptyOption]=\"true\"\n      [name]=\"'userPreference'\"\n      [(ngModel)]=\"selectedLocale\"\n      [label]=\"'com.bmc.arsys.rx.client.shell.user-preferences-dialog.language.label' | translate\"\n      [optionFormatter]=\"optionFormatter\"\n      [options]=\"supportedLocales\"\n      rx-id=\"preferred-language\"\n    >\n    </adapt-rx-select>\n    <p class=\"text-danger align-start\" *ngIf=\"!isAbleToChangeLocale\">\n      <span class=\"alert-content\">\n        {{ 'com.bmc.arsys.rx.client.shell.user-preferences-dialog.validation.error.message' | translate }}\n      </span>\n    </p>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"!userPreferencesForm.dirty\"\n    (click)=\"applyUserPreferences()\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-user-preferences',
                        templateUrl: './user-preferences.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i1__namespace$2.RxCurrentUserService }, { type: i3__namespace.RxRecordInstanceDataPageService }, { type: i3__namespace.RxRecordInstanceService }, { type: i4__namespace$1.TranslateService }]; } });

    var RX_GAINSIGHT = {
        deploymentTypes: [
            { id: 0, name: i3$3.AdaptRadarHostingType.SaaS },
            { id: 10, name: i3$3.AdaptRadarHostingType.OnPrem }
        ],
        environmentTypes: ['Production', 'QA', 'Staging', 'Integration'],
        gainsightUrl: 'https://web-sdk.aptrinsic.com/api/aptrinsic.js',
        bmcGainsightUrl: 'https://documents.bmc.com/products/docs/gainsight/main/aptrinsic.js',
        administratorRole: 'Administrator',
        businessAnalystRole: 'Business Analyst',
        regularUserRole: 'Regular User',
        defaultBundle: 'Innovation Suite',
        gainsightConfigurationsApi: '/api/rx/application/telemetry/configuration',
        gainsightUserPreferencesApi: '/api/rx/application/telemetry/user/preferences',
        gainsightSettings: {
            recordInstanceId: 'AGGADG1AAT7X5ARM7T3LRM7T3LA5FG',
            recordDefinitionName: 'com.bmc.arsys.rx.settings:Gainsight Configurations',
            fieldIds: {
                enableGainsight: 58102,
                useAdaptRadar: 58103,
                loadGainsightFromBmcIt: 58104,
                deploymentType: 58105,
                environmentType: 58106,
                id: i3.RX_RECORD_DEFINITION.coreFieldIds.id
            }
        }
    };

    var RxGainsightConfiguratorService = /** @class */ (function () {
        function RxGainsightConfiguratorService(rxGlobalCacheService, rxRecordInstanceService, adaptRadarService, adaptRadarGainsightProvider, rxCurrentUserService, rxFeatureService, rxLogService, httpClient, rxRecordInstanceUpdateService, rxIframeUtilsService) {
            var _this = this;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.adaptRadarService = adaptRadarService;
            this.adaptRadarGainsightProvider = adaptRadarGainsightProvider;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxFeatureService = rxFeatureService;
            this.rxLogService = rxLogService;
            this.httpClient = httpClient;
            this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
            this.rxIframeUtilsService = rxIframeUtilsService;
            this.bundleDescriptor$ = this.rxGlobalCacheService.getApplicationBundleDescriptor().pipe(operators.take(1), operators.shareReplay(1));
            this.gainsightConfiguration$ = this.bundleDescriptor$.pipe(operators.switchMap(function (bundleDescriptor) { return _this.getGainsightConfiguration(bundleDescriptor.id); }), operators.shareReplay(1));
            this.globalContextData$ = rxjs.combineLatest([this.bundleDescriptor$, this.gainsightConfiguration$]).pipe(operators.map(function (_d) {
                var _e = __read(_d, 2), bundleDescriptor = _e[0], gainsightConfiguration = _e[1];
                return bundleDescriptor.id === i1$2.RX_APPLICATION.innovationStudioBundleId
                    ? {
                        productArea: {
                            name: i3$3.AdaptRadarProductAreaName.Platform,
                            version: bundleDescriptor.displayVersion,
                            hosting: gainsightConfiguration.settings.deploymentType
                        }
                    }
                    : null;
            }), operators.shareReplay(1));
            this.gainsightInitConfiguration$ = rxjs.iif(function () { return _this.rxFeatureService.isFeatureEnabled('DRD21-11744'); }, rxjs.combineLatest([this.bundleDescriptor$, this.gainsightConfiguration$]).pipe(operators.tap(function (_d) {
                var _e = __read(_d, 2), bundleDescriptor = _e[0], gainsightConfiguration = _e[1];
                var company = gainsightConfiguration.company;
                var companyId = gainsightConfiguration.companyId;
                var user = _this.rxCurrentUserService.get();
                var hashedUserId = gainsightConfiguration.hashedUserId;
                var isGainsightEnabled = gainsightConfiguration.settings.enableGainsight;
                _this.useAdaptRadar = gainsightConfiguration.settings.useAdaptRadar;
                _this.productTag = gainsightConfiguration.productTag;
                if (isGainsightEnabled && !gainsightConfiguration.productTag) {
                    _this.rxLogService.debug("Gainsight product tag is missing for bundle " + bundleDescriptor.id + ".");
                    isGainsightEnabled = false;
                }
                if (isGainsightEnabled) {
                    if (_this.useAdaptRadar) {
                        _this.adaptRadarService.startDataCollecting({
                            providers: [
                                {
                                    name: i3$3.AdaptRadarSupportedProviders.Gainsight,
                                    id: _this.productTag,
                                    oneTimeActions: [
                                        {
                                            name: i3$3.AdaptRadarGainsightIdentifyActionName.UserIdentify,
                                            data: {
                                                userData: {
                                                    id: hashedUserId,
                                                    role: user.isAdministrator
                                                        ? RX_GAINSIGHT.administratorRole
                                                        : user.isBusinessAnalyst
                                                            ? RX_GAINSIGHT.businessAnalystRole
                                                            : RX_GAINSIGHT.regularUserRole
                                                },
                                                accountData: {
                                                    id: companyId || company,
                                                    name: company
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        });
                    }
                    else {
                        var gainsightUrl = gainsightConfiguration.settings.loadGainsightFromBmcIt
                            ? RX_GAINSIGHT.bmcGainsightUrl
                            : RX_GAINSIGHT.gainsightUrl;
                        _this.loadGainsightScript(user, gainsightUrl, hashedUserId, company, companyId);
                    }
                }
            }), operators.switchMap(function (_d) {
                var _e = __read(_d, 2), bundleDescriptor = _e[0], gainsightConfiguration = _e[1];
                return gainsightConfiguration.settings.enableGainsight && gainsightConfiguration.settings.useAdaptRadar
                    ? _this.adaptRadarGainsightProvider.init$
                    : rxjs.of(false);
            }), operators.tap(function (isInitialized) {
                if (isInitialized) {
                    _this.isGainsightLoaded = true;
                    _this.setGlobalContext(_this.updatedContext);
                }
            }), operators.switchMap(function () { return _this.gainsightConfiguration$; }), operators.shareReplay(1)), rxjs.of(null));
        }
        RxGainsightConfiguratorService.prototype.updateGlobalContext = function (globalContext, viewDefinitionName) {
            var _this = this;
            this.gainsightConfiguration$.pipe(operators.take(1)).subscribe(function (gainsightConfiguration) {
                var _a, _b, _c;
                if (_this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                    if (viewDefinitionName) {
                        // For runtime views clear all the previous global context before update
                        _this.removeGlobalContext(lodash.keys(_this.updatedContext));
                        globalContext =
                            (_b = (_a = lodash.find(gainsightConfiguration.viewMapping, { viewName: viewDefinitionName })) === null || _a === void 0 ? void 0 : _a.globalContext) !== null && _b !== void 0 ? _b : (_c = lodash.find(gainsightConfiguration.viewMapping, { default: true })) === null || _c === void 0 ? void 0 : _c.globalContext;
                        globalContext = globalContext && JSON.parse(globalContext);
                        _this.updatedContext = globalContext;
                    }
                    _this.setGlobalContext(globalContext);
                }
            });
        };
        RxGainsightConfiguratorService.prototype.setGlobalContext = function (globalContext) {
            var _this = this;
            this.globalContextData$.pipe(operators.take(1)).subscribe(function (globalContextData) {
                if (_this.useAdaptRadar && _this.isGainsightLoaded) {
                    _this.adaptRadarGainsightProvider.setGlobalContext(lodash.merge(globalContextData, globalContext));
                }
                else if (!_this.useAdaptRadar && _this.isGainsightLoaded) {
                    aptrinsic('set', 'globalContext', lodash.merge(globalContextData, globalContext));
                }
                else {
                    _this.updatedContext = globalContext;
                }
            });
        };
        RxGainsightConfiguratorService.prototype.removeGlobalContext = function (contextList) {
            var _this = this;
            if (this.isGainsightLoaded) {
                // Clear all global context if list is not specified
                contextList !== null && contextList !== void 0 ? contextList : (contextList = lodash.keys(this.updatedContext));
                this.globalContextData$.pipe(operators.take(1)).subscribe(function (globalContextData) {
                    if (globalContextData) {
                        contextList.forEach(function (context) { return delete globalContextData[context]; });
                    }
                    if (_this.useAdaptRadar) {
                        _this.adaptRadarGainsightProvider.removeGlobalContext(contextList);
                    }
                    else {
                        aptrinsic('remove', 'globalContext', contextList);
                    }
                });
            }
        };
        RxGainsightConfiguratorService.prototype.loadGainsightScript = function (user, gainsightUrl, hashedUserId, company, companyId) {
            return __awaiter(this, void 0, void 0, function () {
                var param, script, node;
                var _this = this;
                return __generator(this, function (_d) {
                    param = this.productTag;
                    script = document.getElementsByTagName('script')[0];
                    node = document.createElement('script');
                    window['aptrinsic'] =
                        window['aptrinsic'] ||
                            function () {
                                (window['aptrinsic'].q = window['aptrinsic'].q || []).push(arguments);
                            };
                    window['aptrinsic'].p = param;
                    // iframeModeEnabled is set to "false" when embedded in an iFrame, as per Gainsight documentation.
                    window['aptrinsic'].c = { iframeModeEnabled: !this.rxIframeUtilsService.isRunningInIframe() };
                    node.async = true;
                    node.src = gainsightUrl + '?a=' + param;
                    node.onload = function () {
                        var functionalRoles = user.functionalRoles.reduce(function (functionalRole, name) {
                            functionalRole[name] = true;
                            return functionalRole;
                        }, {});
                        _this.isGainsightLoaded = true;
                        aptrinsic('identify', {
                            id: hashedUserId,
                            globalId: hashedUserId,
                            role: user.isAdministrator
                                ? RX_GAINSIGHT.administratorRole
                                : user.isBusinessAnalyst
                                    ? RX_GAINSIGHT.businessAnalystRole
                                    : RX_GAINSIGHT.regularUserRole,
                            functionalRoles: functionalRoles
                        }, {
                            id: companyId || company,
                            name: company
                        });
                        _this.setGlobalContext(_this.updatedContext);
                    };
                    node.onerror = function (error) {
                        _this.rxLogService.error(error);
                    };
                    script.parentNode.insertBefore(node, script);
                    return [2 /*return*/];
                });
            });
        };
        RxGainsightConfiguratorService.prototype.getGainsightConfiguration = function (bundleId) {
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                return this.httpClient.get(RX_GAINSIGHT.gainsightConfigurationsApi + '/' + bundleId);
            }
            else {
                return rxjs.of(null);
            }
        };
        RxGainsightConfiguratorService.prototype.saveGainsightConfiguration = function (gainsightSettings) {
            var _this = this;
            return this.rxRecordInstanceService
                .get(RX_GAINSIGHT.gainsightSettings.recordDefinitionName, RX_GAINSIGHT.gainsightSettings.recordInstanceId)
                .pipe(operators.switchMap(function (recordInstance) {
                recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.enableGainsight, gainsightSettings.enableGainsight);
                recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.useAdaptRadar, gainsightSettings.useAdaptRadar);
                recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.loadGainsightFromBmcIt, gainsightSettings.loadGainsightFromBmcIt);
                recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.deploymentType, gainsightSettings.deploymentType);
                recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.environmentType, gainsightSettings.environmentType);
                return _this.rxRecordInstanceUpdateService.execute(recordInstance);
            }));
        };
        return RxGainsightConfiguratorService;
    }());
    RxGainsightConfiguratorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGainsightConfiguratorService, deps: [{ token: i1__namespace$2.RxGlobalCacheService }, { token: i3__namespace.RxRecordInstanceService }, { token: i3__namespace$3.AdaptRadarService }, { token: i3__namespace$3.AdaptRadarGainsightProvider }, { token: i1__namespace$2.RxCurrentUserService }, { token: i1__namespace$2.RxFeatureService }, { token: i1__namespace$2.RxLogService }, { token: i4__namespace$4.HttpClient }, { token: i3__namespace.RxRecordInstanceUpdateService }, { token: i1__namespace$3.RxIframeUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGainsightConfiguratorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGainsightConfiguratorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGainsightConfiguratorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxGlobalCacheService }, { type: i3__namespace.RxRecordInstanceService }, { type: i3__namespace$3.AdaptRadarService }, { type: i3__namespace$3.AdaptRadarGainsightProvider }, { type: i1__namespace$2.RxCurrentUserService }, { type: i1__namespace$2.RxFeatureService }, { type: i1__namespace$2.RxLogService }, { type: i4__namespace$4.HttpClient }, { type: i3__namespace.RxRecordInstanceUpdateService }, { type: i1__namespace$3.RxIframeUtilsService }]; } });

    var RX_USER_MESSAGE = {
        title: 'com.bmc.arsys.rx.client.common.messages.label',
        showAll: 'com.bmc.arsys.rx.client.shell.notification.action.viewAll',
        dismissAll: 'com.bmc.arsys.rx.client.shell.notification.action.clearAll',
        noActiveMessage: 'com.bmc.arsys.rx.client.shell.notification.active.noNotifications.label',
        dismissMessage: 'com.bmc.arsys.rx.client.shell.notification.dismiss',
        loadMore: 'com.bmc.arsys.rx.client.shell.notification.action.loadMore',
        fetchMessageFrequency: 60000,
        messageTypes: {
            active: 'active',
            dismissed: 'dismissed'
        },
        definitions: {
            userMessage: {
                definitionName: 'UserMessage',
                dataPageType: 'com.bmc.arsys.rx.application.usermessage.datapage.UserMessageDataPageQuery',
                updateStateOfAllUserMessagesCommand: 'com.bmc.arsys.rx.application.usermessage.command.UpdateStateOfAllUserMessagesCommand',
                updateStateOfUserMessagesCommand: 'com.bmc.arsys.rx.application.usermessage.command.UpdateStateOfUserMessagesCommand',
                fields: {
                    subject: '20000',
                    body: '20001',
                    recipient: '20002'
                },
                status: {
                    unread: '0',
                    read: '1',
                    dismissed: '2'
                }
            }
        }
    };

    var userMessageDataPageQuery = 'com.bmc.arsys.rx.application.usermessage.datapage.UserMessageDataPageQuery';
    var RxUserMessageDataPageService = /** @class */ (function (_super) {
        __extends(RxUserMessageDataPageService, _super);
        function RxUserMessageDataPageService(injector) {
            var _this = _super.call(this, injector, userMessageDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        return RxUserMessageDataPageService;
    }(i1$2.DataPage));
    RxUserMessageDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUserMessageDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageDataPageService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageDataPageService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxUserMessageService = /** @class */ (function () {
        function RxUserMessageService(rxCommandFactoryService, rxCurrentUserService, rxUserMessageDataPageService, rxViewDefinitionCacheService, rxLogService, rxAngularApplicationService, rxGlobalCacheService, ngZone) {
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxUserMessageDataPageService = rxUserMessageDataPageService;
            this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
            this.rxLogService = rxLogService;
            this.rxAngularApplicationService = rxAngularApplicationService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.ngZone = ngZone;
            this.subscription = new rxjs.Subscription();
            this.cancelMessagePolling$ = new rxjs.Subject();
            this.messageFetchedSubject = new rxjs.Subject();
            this.messageCountSubject = new rxjs.Subject();
            this.messageFetched$ = this.messageFetchedSubject.asObservable();
            this.messageCount$ = this.messageCountSubject.asObservable();
            this.activeMessagesFilterExpression = "'" + i3.RX_RECORD_DEFINITION.coreFieldIds.status + "'!=" + RX_USER_MESSAGE.definitions.userMessage.status.dismissed;
            this.dismissedMessagesFilterExpression = "'" + i3.RX_RECORD_DEFINITION.coreFieldIds.status + "'=" + RX_USER_MESSAGE.definitions.userMessage.status.dismissed;
            this.userMessageModel = {
                userMessageDef: RX_USER_MESSAGE.definitions.userMessage,
                pageSize: 30,
                messages: {
                    active: {
                        type: RX_USER_MESSAGE.messageTypes.active,
                        count: 0,
                        list: [],
                        queryExpr: this.activeMessagesFilterExpression,
                        loadingInProgress: false
                    },
                    dismissed: {
                        type: RX_USER_MESSAGE.messageTypes.dismissed,
                        count: 0,
                        list: [],
                        queryExpr: this.dismissedMessagesFilterExpression,
                        loadingInProgress: false
                    }
                }
            };
            this.bodyFieldId = this.userMessageModel.userMessageDef.fields.body;
        }
        RxUserMessageService.prototype.convertLineBreaks = function (message) {
            var bodyFieldValue = message[this.bodyFieldId];
            message[this.bodyFieldId] = (bodyFieldValue && bodyFieldValue.replace(/\n/g, '<br>')) || '';
        };
        RxUserMessageService.prototype.updateDsmApplicationViewUrls = function (dataPage) {
            var _this = this;
            if (dataPage.data.length) {
                var messages = dataPage.data.map(function (message) {
                    _this.convertLineBreaks(message);
                    var body = message[_this.bodyFieldId];
                    var hasHtmlAnchors = /\<\/a/.test(body);
                    if (hasHtmlAnchors) {
                        var container_1 = document.createElement('div');
                        container_1.innerHTML = body;
                        var link_1 = container_1.querySelector('a');
                        var isViewLink = /\/view\/|\/iview\//.test(link_1.href);
                        if (isViewLink) {
                            var bundleIdMatch = window.location.hash.match(/#\/([a-zA-Z0-9-\.]*)/);
                            var bundleId = bundleIdMatch && bundleIdMatch[1];
                            return _this.rxAngularApplicationService.isAngularJsApplication(bundleId).pipe(operators.switchMap(function (isAngularJsApplication) {
                                if (!isAngularJsApplication) {
                                    var queryParams_1 = [];
                                    var urlWithoutParams_1 = link_1.href.replace(/(?:[?&]param=)([^&]*)/g, function (match, paramValue) {
                                        queryParams_1.push(paramValue);
                                        return '';
                                    });
                                    urlWithoutParams_1 = urlWithoutParams_1.replace('innovationsuite', 'helix');
                                    if (queryParams_1.length) {
                                        var viewDefinitionName = decodeURI(urlWithoutParams_1.split('/').pop());
                                        return _this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(operators.map(function (viewDefinition) {
                                            var newQueryParams = [];
                                            lodash.forEach(viewDefinition.inputParams, function (inputParam, index) {
                                                newQueryParams.push(inputParam.name + "=" + queryParams_1[index]);
                                            });
                                            link_1.href = [urlWithoutParams_1, newQueryParams.join('&')].join('?');
                                            message[_this.bodyFieldId] = container_1.innerHTML;
                                            return message;
                                        }), operators.catchError(function (err) {
                                            _this.rxLogService.error(err);
                                            return rxjs.of(message);
                                        }));
                                    }
                                    else {
                                        link_1.href = urlWithoutParams_1;
                                        message[_this.bodyFieldId] = container_1.innerHTML;
                                        return rxjs.of(message);
                                    }
                                }
                                else {
                                    return rxjs.of(message);
                                }
                            }));
                        }
                    }
                    return rxjs.of(message);
                });
                return rxjs.forkJoin(messages).pipe(operators.map(function (convertedMessages) { return ({
                    messages: convertedMessages,
                    totalSize: dataPage.totalSize
                }); }));
            }
            else {
                return rxjs.of({
                    messages: [],
                    totalSize: dataPage.totalSize
                });
            }
        };
        RxUserMessageService.prototype.cancelMessagePolling = function () {
            this.cancelMessagePolling$.next();
        };
        RxUserMessageService.prototype.launchMessagePolling = function () {
            var _this = this;
            this.cancelMessagePolling();
            this.ngZone.runOutsideAngular(function () {
                _this.subscription.add(rxjs.timer(0, RX_USER_MESSAGE.fetchMessageFrequency)
                    .pipe(operators.takeUntil(_this.cancelMessagePolling$), operators.switchMap(function (_) { return _this.getMessages(RX_USER_MESSAGE.messageTypes.active, false, true); }))
                    .subscribe());
            });
        };
        RxUserMessageService.prototype.getMessages = function (type, getMore, suppressTokenRefresh) {
            var _this = this;
            if (type === void 0) { type = RX_USER_MESSAGE.messageTypes.active; }
            if (getMore === void 0) { getMore = false; }
            if (suppressTokenRefresh === void 0) { suppressTokenRefresh = false; }
            var params = {
                pageSize: this.userMessageModel.pageSize,
                startIndex: 0,
                sortBy: -i3.RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                queryExpression: '',
                propertySelection: [
                    i3.RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                    i3.RX_RECORD_DEFINITION.coreFieldIds.id,
                    this.userMessageModel.userMessageDef.fields.body,
                    this.userMessageModel.userMessageDef.fields.subject
                ].join(',')
            };
            this.userMessageModel.messages[type].loadingInProgress =
                getMore || this.userMessageModel.messages[type].list.length === 0;
            lodash.set(params, this.userMessageModel.userMessageDef.fields.recipient, this.rxCurrentUserService.get().loginName);
            params.queryExpression = this.userMessageModel.messages[type].queryExpr;
            params.startIndex = getMore ? this.userMessageModel.messages[type].list.length : 0;
            var headers = Object.assign({ 'default-bundle-scope': i1$2.RX_APPLICATION.innovationStudioBundleId }, (suppressTokenRefresh ? { 'Suppress-Token-Refresh': 'true' } : {}));
            return this.rxUserMessageDataPageService
                .get({
                params: params,
                headers: headers
            })
                .pipe(operators.switchMap(this.updateDsmApplicationViewUrls.bind(this)), operators.tap(function (rxMessages) {
                _this.ngZone.run(function () {
                    if (rxMessages.messages.length) {
                        if (getMore) {
                            _this.userMessageModel.messages[type].list = _this.userMessageModel.messages[type].list.concat(rxMessages.messages);
                        }
                        else {
                            _this.userMessageModel.messages[type].count = rxMessages.totalSize;
                            _this.userMessageModel.messages[type].list = rxMessages.messages;
                            if (type === RX_USER_MESSAGE.messageTypes.active) {
                                _this.messageCountSubject.next(rxMessages.totalSize);
                            }
                        }
                    }
                    else if (!getMore && type === RX_USER_MESSAGE.messageTypes.active) {
                        _this.messageCountSubject.next(_this.userMessageModel.messages.active.count);
                    }
                    _this.messageFetchedSubject.next();
                });
            }));
        };
        RxUserMessageService.prototype.handleSuccessfulDismiss = function (messageDismissed) {
            var shellNotifications = this.userMessageModel.messages;
            if (messageDismissed) {
                lodash.remove(shellNotifications.active.list, messageDismissed);
                shellNotifications.dismissed.list.push(messageDismissed);
                shellNotifications.active.count--;
                shellNotifications.dismissed.count++;
            }
            else {
                shellNotifications.active.list = [];
                shellNotifications.active.count = 0;
            }
            this.messageCountSubject.next(shellNotifications.active.count);
            if (shellNotifications.active.list.length === 0) {
                // avoid making backend call to get new notification on each dismiss
                this.launchMessagePolling();
            }
        };
        RxUserMessageService.prototype.dismissNotification = function (message) {
            var _this = this;
            if (message) {
                var inputParameter = {};
                inputParameter[message[i3.RX_RECORD_DEFINITION.coreFieldIds.id]] =
                    RX_USER_MESSAGE.definitions.userMessage.status.dismissed;
                this.userMessagesCommand = this.rxCommandFactoryService.forResourceType(RX_USER_MESSAGE.definitions.userMessage.updateStateOfUserMessagesCommand);
                this.subscription.add(this.userMessagesCommand
                    .execute({
                    userMessageStateById: inputParameter
                })
                    .subscribe(function () { return _this.handleSuccessfulDismiss(message); }));
            }
            else {
                this.userMessagesCommand = this.rxCommandFactoryService.forResourceType(RX_USER_MESSAGE.definitions.userMessage.updateStateOfAllUserMessagesCommand);
                this.subscription.add(this.userMessagesCommand.execute().subscribe(function () { return _this.handleSuccessfulDismiss(); }));
            }
        };
        RxUserMessageService.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.cancelMessagePolling();
        };
        return RxUserMessageService;
    }());
    RxUserMessageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageService, deps: [{ token: i1__namespace$2.RxCommandFactoryService }, { token: i1__namespace$2.RxCurrentUserService }, { token: RxUserMessageDataPageService }, { token: i3__namespace$1.RxViewDefinitionCacheService }, { token: i1__namespace$2.RxLogService }, { token: i1__namespace$2.RxAngularApplicationService }, { token: i1__namespace$2.RxGlobalCacheService }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUserMessageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxCommandFactoryService }, { type: i1__namespace$2.RxCurrentUserService }, { type: RxUserMessageDataPageService }, { type: i3__namespace$1.RxViewDefinitionCacheService }, { type: i1__namespace$2.RxLogService }, { type: i1__namespace$2.RxAngularApplicationService }, { type: i1__namespace$2.RxGlobalCacheService }, { type: i0__namespace.NgZone }]; } });

    var ShellBase = /** @class */ (function () {
        function ShellBase(injector) {
            var _this = this;
            this.injector = injector;
            this.isShellInitialized = false;
            this.currentMenuItemId = null;
            this.translateService = this.injector.get(i4$1.TranslateService);
            this.flattenedMenuItems = [];
            this.rxComponentCanDeactivateGuard = this.injector.get(i1$2.RxComponentCanDeactivateGuard);
            this.rxUserMessageService = this.injector.get(RxUserMessageService);
            this.rxAuthService = this.injector.get(i1$2.RxAuthService);
            this.rxCurrentUserService = this.injector.get(i1$2.RxCurrentUserService);
            this.rxRecordInstanceService = this.injector.get(i3.RxRecordInstanceService);
            this.rxGlobalCacheService = this.injector.get(i1$2.RxGlobalCacheService);
            this.rxAngularApplicationService = this.injector.get(i1$2.RxAngularApplicationService);
            this.rxSystemConfigurationService = this.injector.get(i1$2.RxSystemConfigurationService);
            this.rxFeatureService = this.injector.get(i1$2.RxFeatureService);
            this.adaptTranslateService = this.injector.get(i1$1.AdaptTranslateService);
            this.rxGainsightConfiguratorService = this.injector.get(RxGainsightConfiguratorService);
            this.router = this.injector.get(i1$4.Router);
            this.applicationDescriptor$ = this.rxGlobalCacheService.getApplicationBundleDescriptor();
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.navigationEnd$ = this.router.events.pipe(operators.filter(function (event) { return event instanceof i1$4.NavigationEnd; }), operators.filter(function (event) { return event.url !== '/unknown-application'; }));
            this.closeBannerSubject = new rxjs.Subject();
            this.hasBanner$ = rxjs.merge(this.rxGainsightConfiguratorService.gainsightInitConfiguration$.pipe(operators.filter(function (gainsightConfiguration) { return Boolean(gainsightConfiguration); }), operators.map(function (gainsightConfiguration) { return gainsightConfiguration.displayBanner; }), operators.defaultIfEmpty(false)), this.closeBannerSubject.pipe(operators.map(function (value) { return !value; }))).pipe(operators.shareReplay(1));
            this.translations = this.adaptTranslateService.getCurrentLanguage();
            this.alertText = this.translations['adapt.agreement.navigation.alertText'];
            this.alertLinkText = this.translations['adapt.agreement.navigation.alertLinkText'];
            this.shellConfig$ = this.getShellConfig();
            this.applicationSwitcherActionItems$ = rxjs.combineLatest([
                this.applicationDescriptor$,
                this.rxGlobalCacheService.getBundleDescriptors(),
                this.shellConfig$,
                this.rxSystemConfigurationService.queryConfiguration(['Helix-Portal-URL']).pipe(operators.map(function (value) { return lodash.get(value, '[0].value'); }), operators.catchError(function () { return rxjs.of(null); }))
            ]).pipe(operators.take(1), operators.switchMap(function (_b) {
                var _c = __read(_b, 4), currentBundleDescriptor = _c[0], bundleDescriptors = _c[1], shellConfig = _c[2], helixPortalUrl = _c[3];
                if (shellConfig.allowAppSwitching) {
                    var applicationList = lodash.filter(bundleDescriptors, { isApplication: true, isLicensed: true });
                    _this.bundleDescriptors = bundleDescriptors;
                    _this.helixPortalUrl = helixPortalUrl;
                    lodash.remove(applicationList, currentBundleDescriptor);
                    lodash.remove(applicationList, { id: i1$2.RX_APPLICATION.settingsBundleId });
                    if (!_this.rxCurrentUserService.isAdministrator()) {
                        lodash.remove(applicationList, { id: i1$2.RX_APPLICATION.dataloadBundleId });
                    }
                    if (!_this.rxCurrentUserService.isAdministrator() && !_this.rxCurrentUserService.isBusinessAnalyst()) {
                        lodash.remove(applicationList, { id: i1$2.RX_APPLICATION.innovationStudioBundleId });
                    }
                    lodash.remove(applicationList, { showInAppLauncher: false });
                    var optedInApplications = applicationList.map(function (app) { return _this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(operators.map(function (isAngularJsApplication) { return ({
                        id: app.id,
                        friendlyName: app.localizedDisplayName || app.friendlyName,
                        isAngularJsApplication: isAngularJsApplication
                    }); })); });
                    return rxjs.forkJoin(optedInApplications);
                }
                else {
                    return rxjs.of([]);
                }
            }), operators.map(function (applicationList) {
                if (lodash.includes(['Fixed', 'Floating', 'Bundled'], _this.rxCurrentUserService.get().licenseType) &&
                    _this.helixPortalUrl) {
                    applicationList.push({
                        friendlyName: _this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.bmc-helix-dashboard.label'),
                        url: _this.helixPortalUrl + "/dashboards"
                    });
                }
                if (applicationList.length) {
                    return {
                        name: _this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.label'),
                        tooltip: _this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.label'),
                        className: 'd-icon-tiles',
                        switcher: {
                            allItems: {
                                items: lodash.sortBy(applicationList
                                    .filter(function (app) { return app.id !== _this.rxGlobalCacheService.applicationId; })
                                    .map(function (app) {
                                    return {
                                        name: app.friendlyName,
                                        action: _this.launchApplication.bind(_this, app.id, app.isAngularJsApplication, app.url)
                                    };
                                }), function (application) { return lodash.lowerCase(application.name); })
                            },
                            recentItems: {}
                        }
                    };
                }
                else {
                    return {};
                }
            }));
            this.showUserMessagesAction = {
                name: this.translateService.instant(RX_USER_MESSAGE.title),
                tooltip: this.translateService.instant(RX_USER_MESSAGE.title),
                count: 0,
                action: lodash.noop,
                className: 'd-icon-bell_o'
            };
            this.administrationSettingsAction = {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label'),
                tooltip: this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label'),
                route: "/" + this.rxGlobalCacheService.applicationId + "/settings",
                className: 'd-icon-gear'
            };
            this.brandingInfo$ = this.applicationDescriptor$.pipe(operators.map(function (applicationDescriptor) { return ({
                logoClass: 'logo-helix',
                productName: applicationDescriptor.localizedDisplayName || applicationDescriptor.friendlyName,
                hideMobileLogo: false,
                switcher: {
                    filter: {
                        placeholder: _this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
                    }
                }
            }); }));
            this.navigationEnd$.pipe(operators.skip(1), operators.takeUntil(this.destroyed$)).subscribe({
                next: function () {
                    _this.highlightMenuItem(_this.getActiveNavigationMenuItem());
                },
                complete: function () {
                    _this.rxUserMessageService.cancelMessagePolling();
                }
            });
            // ADAPT dropdowns listen to the click events and close themselves when the event is fired.
            // When user clicks inside an iframe though, the event is not propagated to the main window and the
            // dropdowns remain open.
            // Here we simulate the click on the document of the main window to close the dropdowns.
            this.removeWindowBlurListener = injector.get(i0.Renderer2).listen('window', 'blur', function () {
                document.body.click();
            });
        }
        ShellBase.prototype.ngOnInit = function () {
            var _this = this;
            this.showUserMessagesAction.popover = this.userMessagesPopover;
            this.rxUserMessageService.messageCount$.subscribe(function (messageCount) {
                _this.showUserMessagesAction.count = messageCount;
            });
            this.navigationMenuItems$ = this.getNavigationMenuItems().pipe(operators.tap(function () {
                // We perform a setTimeout according to Adapt documentation.
                // Else on smaller screens the menus might be displayed horizontally
                // in the shell rather than vertically for smaller screens.
                // https://github.bmc.com/pages/bmc-ux/adapt-angular/#/components/navigation
                setTimeout(function () {
                    _this.adaptNavigation.checkForHamburger();
                    _this.isShellInitialized = true;
                    var activeNavigationMenuItem = _this.getActiveNavigationMenuItem();
                    _this.highlightMenuItem(activeNavigationMenuItem);
                });
            }));
            this.navigationActionItems$ = rxjs.combineLatest([
                this.shellConfig$,
                this.getNavigationActionItems(),
                this.applicationSwitcherActionItems$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 3), shellConfig = _c[0], navigationActionItems = _c[1], applicationSwitcherActionItems = _c[2];
                return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(navigationActionItems)), [
                    _this.showUserMessagesAction
                ]), __read((shellConfig.administrationSettingsState ? [_this.administrationSettingsAction] : []))), [
                    applicationSwitcherActionItems
                ]);
            }), operators.takeUntil(this.destroyed$));
            var isGainsightFeatureEnabled = this.rxFeatureService.isFeatureEnabled('DRD21-11744');
            this.userProfileMenu$ = rxjs.combineLatest([this.rxGainsightConfiguratorService.gainsightInitConfiguration$, this.getUserMenuItems()]).pipe(operators.tap(function (_b) {
                var _c = __read(_b, 2), gainsightConfig = _c[0], userMenuItems = _c[1];
                var analyticsMenuItem = lodash.find(userMenuItems, { id: 0 });
                if (analyticsMenuItem) {
                    var shouldHideAnalyticsMenuItem = !isGainsightFeatureEnabled ||
                        !gainsightConfig.settings.enableGainsight ||
                        lodash.isEmpty(gainsightConfig.productTag);
                    analyticsMenuItem.hide = shouldHideAnalyticsMenuItem;
                }
            }), operators.map(function (_b) {
                var _c = __read(_b, 2), gainsightConfig = _c[0], userMenuItems = _c[1];
                var currentUser = _this.rxCurrentUserService.get();
                var userAvatarUrl = currentUser.personInstanceId
                    ? _this.rxRecordInstanceService.getAttachmentDownloadUrl(i1$2.RX_USER.userProfileRecordDefinitionName, i1$2.RX_USER.userProfilePictureFieldId, currentUser.personInstanceId)
                    : '';
                return {
                    desc: _this.translateService.instant('com.bmc.arsys.rx.client.shell.user-profile.signedin.label'),
                    userName: currentUser.fullName,
                    image: userAvatarUrl,
                    typeLong: true,
                    inverted: false,
                    signOut: {
                        title: _this.translateService.instant('com.bmc.arsys.rx.client.common.sign-out.label'),
                        action: _this.logout.bind(_this)
                    },
                    menu: userMenuItems
                };
            }));
            this.router.events.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (event) {
                var _a;
                switch (true) {
                    case event instanceof i1$4.NavigationStart: {
                        _this.busySubscription = rxjs.NEVER.subscribe();
                        break;
                    }
                    case event instanceof i1$4.NavigationEnd:
                    case event instanceof i1$4.NavigationCancel:
                    case event instanceof i1$4.NavigationError: {
                        (_a = _this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        };
        ShellBase.prototype.highlightMenuItem = function (menuItem) {
            if (menuItem) {
                this.currentMenuItemId = menuItem.id;
                this.adaptNavigation.selectMenuItem(this.currentMenuItemId);
            }
            else {
                var lastMenuItem = this.adaptNavigation.searchTree(this.adaptNavigation.menuModel, this.currentMenuItemId);
                if (lastMenuItem) {
                    lastMenuItem.active = false;
                    if (lastMenuItem.parent) {
                        lastMenuItem.parent.active = false;
                    }
                }
                this.currentMenuItemId = null;
                this.adaptNavigation.currentActiveId = null;
            }
        };
        ShellBase.prototype.logout = function () {
            var _this = this;
            var canDeactivate = this.rxComponentCanDeactivateGuard.canDeactivate();
            if (lodash.isBoolean(canDeactivate)) {
                canDeactivate = rxjs.of(canDeactivate);
            }
            rxjs.from(canDeactivate)
                .pipe(operators.filter(Boolean), operators.tap(function () {
                _this.rxComponentCanDeactivateGuard.disable();
            }), operators.switchMap(function () { return _this.rxAuthService.logout(); }))
                .subscribe();
        };
        ShellBase.prototype.launchApplication = function (bundleId, isAngularJsApplication, portalUrl) {
            var url;
            if (portalUrl) {
                url = portalUrl;
            }
            else {
                var application = lodash.find(this.bundleDescriptors, { id: bundleId });
                if (application.hasCustomEntryPoint && application.id !== i1$2.RX_APPLICATION.innovationStudioBundleId) {
                    url = "/" + bundleId + "/index.html";
                }
                else if (isAngularJsApplication) {
                    url = "/innovationsuite/index.html#/" + bundleId;
                }
                else {
                    url = "/helix/index.html#/" + bundleId;
                }
            }
            window.open(url);
        };
        ShellBase.prototype.closeBanner = function () {
            this.closeBannerSubject.next(true);
        };
        ShellBase.prototype.ngOnDestroy = function () {
            this.removeWindowBlurListener();
            this.rxUserMessageService.cancelMessagePolling();
            this.closeBannerSubject.complete();
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        return ShellBase;
    }());
    ShellBase.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ShellBase, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ShellBase.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ShellBase });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ShellBase, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RX_USER_AVAILABILITY = {
        ctmPeople: {
            recordDefinitionName: 'CTM:People',
            fieldIds: {
                loginName: 4,
                assignmentAvailability: 1000000346
            }
        }
    };

    var RxUserAvailabilityComponent = /** @class */ (function () {
        function RxUserAvailabilityComponent(rxCurrentUserService, activeModalRef, rxRecordInstanceDataPageService, rxRecordInstanceService, rxRecordInstanceUpdateService, rxNotificationService, translateService) {
            this.rxCurrentUserService = rxCurrentUserService;
            this.activeModalRef = activeModalRef;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
            this.rxNotificationService = rxNotificationService;
            this.translateService = translateService;
            this.isUserAvailableForAssignment = this.rxCurrentUserService.isAvailableForAssignment();
            this.isSaveInProgress = false;
        }
        RxUserAvailabilityComponent.prototype.updateAssignmentAvailability = function () {
            var _this = this;
            this.isSaveInProgress = true;
            this.rxRecordInstanceDataPageService
                .post({
                params: {
                    recorddefinition: RX_USER_AVAILABILITY.ctmPeople.recordDefinitionName,
                    queryExpression: "('" +
                        RX_USER_AVAILABILITY.ctmPeople.fieldIds.loginName +
                        '\' = "' +
                        this.rxCurrentUserService.getName() +
                        '")',
                    propertySelection: [i3.RX_RECORD_DEFINITION.coreFieldIds.id]
                }
            })
                .pipe(operators.switchMap(function (dataPageResult) { return _this.rxRecordInstanceService.get(RX_USER_AVAILABILITY.ctmPeople.recordDefinitionName, dataPageResult.data[0][i3.RX_RECORD_DEFINITION.coreFieldIds.id]); }), operators.tap(function (recordInstance) { return recordInstance.setFieldValue(RX_USER_AVAILABILITY.ctmPeople.fieldIds.assignmentAvailability, _this.isUserAvailableForAssignment ? '0' : '1'); }), operators.switchMap(function (recordInstance) { return _this.rxRecordInstanceUpdateService.execute(recordInstance); }), operators.finalize(function () { return (_this.isSaveInProgress = false); }))
                .subscribe(function () {
                _this.rxCurrentUserService.setAssignmentAvailability(_this.isUserAvailableForAssignment);
                _this.activeModalRef.close();
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability-dialog.available-for-assignment-saved.message'));
            });
        };
        RxUserAvailabilityComponent.prototype.cancel = function () {
            this.activeModalRef.close();
        };
        return RxUserAvailabilityComponent;
    }());
    RxUserAvailabilityComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserAvailabilityComponent, deps: [{ token: i1__namespace$2.RxCurrentUserService }, { token: i1__namespace$1.ActiveModalRef }, { token: i3__namespace.RxRecordInstanceDataPageService }, { token: i3__namespace.RxRecordInstanceService }, { token: i3__namespace.RxRecordInstanceUpdateService }, { token: i1__namespace$2.RxNotificationService }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxUserAvailabilityComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserAvailabilityComponent, selector: "rx-user-availability", ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <form name=\"userAvailabilityForm\" novalidate #userAvailabilityForm=\"ngForm\">\n    <adapt-rx-checkbox\n      class=\"d-block form-group\"\n      rx-id=\"user-availability\"\n      name=\"userAvailability\"\n      [(ngModel)]=\"isUserAvailableForAssignment\"\n      label=\"{{ 'com.bmc.arsys.rx.client.shell.my-availability-dialog.available-for-assignment.label' | translate }}\"\n    ></adapt-rx-checkbox>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"this.isSaveInProgress || !userAvailabilityForm.dirty\"\n    (click)=\"updateAssignmentAvailability()\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserAvailabilityComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-user-availability',
                        templateUrl: './user-availability.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxCurrentUserService }, { type: i1__namespace$1.ActiveModalRef }, { type: i3__namespace.RxRecordInstanceDataPageService }, { type: i3__namespace.RxRecordInstanceService }, { type: i3__namespace.RxRecordInstanceUpdateService }, { type: i1__namespace$2.RxNotificationService }, { type: i4__namespace$1.TranslateService }]; } });

    var RxGainsightUserPreferencesService = /** @class */ (function () {
        function RxGainsightUserPreferencesService(httpClient, rxFeatureService) {
            this.httpClient = httpClient;
            this.rxFeatureService = rxFeatureService;
        }
        RxGainsightUserPreferencesService.prototype.getGainsightUserPreferences = function () {
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                return this.httpClient.get(RX_GAINSIGHT.gainsightUserPreferencesApi);
            }
            else {
                return rxjs.of(null);
            }
        };
        RxGainsightUserPreferencesService.prototype.saveGainsightUserPreferences = function (gainsightUserPreferences) {
            return this.httpClient.put(RX_GAINSIGHT.gainsightUserPreferencesApi, gainsightUserPreferences);
        };
        return RxGainsightUserPreferencesService;
    }());
    RxGainsightUserPreferencesService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGainsightUserPreferencesService, deps: [{ token: i4__namespace$4.HttpClient }, { token: i1__namespace$2.RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGainsightUserPreferencesService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGainsightUserPreferencesService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGainsightUserPreferencesService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace$4.HttpClient }, { type: i1__namespace$2.RxFeatureService }]; } });

    var GainsightOptInComponent = /** @class */ (function () {
        function GainsightOptInComponent(activeModalRef, rxGainsightUserPreferencesService, translateService, rxNotificationService) {
            var _this = this;
            this.activeModalRef = activeModalRef;
            this.rxGainsightUserPreferencesService = rxGainsightUserPreferencesService;
            this.translateService = translateService;
            this.rxNotificationService = rxNotificationService;
            this.isQueryInProgress = true;
            this.isSaveButtonDisabled = true;
            this.isSaveInProgressSubject = new rxjs.BehaviorSubject(false);
            this.gainsightUserPreferences$ = this.rxGainsightUserPreferencesService.getGainsightUserPreferences().pipe(operators.take(1), operators.catchError(function () {
                _this.cancel();
                _this.rxNotificationService.addWarningMessage(_this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-profile-not-created.message'));
                return rxjs.of(null);
            }), operators.shareReplay(1));
            this.state$ = this.gainsightUserPreferences$.pipe(operators.tap(function () {
                _this.isQueryInProgress = false;
            }), operators.filter(function (gainsightUserPreferences) { return Boolean(gainsightUserPreferences); }), operators.map(function (gainsightUserPreferences) { return ({
                accountPerformance: gainsightUserPreferences.trackUsage != false,
                accountMarketing: false
            }); }));
            this.vm$ = rxjs.combineLatest([this.state$, this.isSaveInProgressSubject]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), state = _b[0], isSaveInProgress = _b[1];
                return ({
                    state: state,
                    isSaveInProgress: isSaveInProgress
                });
            }));
        }
        GainsightOptInComponent.prototype.handleStateChange = function (state) {
            this.isSaveButtonDisabled = false;
            this.accountPerformance = state.accountPerformance;
        };
        GainsightOptInComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss();
        };
        GainsightOptInComponent.prototype.save = function () {
            var _this = this;
            this.isSaveInProgressSubject.next(true);
            this.gainsightUserPreferences$
                .pipe(operators.take(1), operators.map(function (gainsightUserPreferences) { return (Object.assign(Object.assign({}, gainsightUserPreferences), { trackUsage: _this.accountPerformance })); }), operators.switchMap(function (gainsightUserPreferences) { return _this.rxGainsightUserPreferencesService.saveGainsightUserPreferences(gainsightUserPreferences); }), operators.catchError(function (error) {
                _this.isSaveInProgressSubject.next(false);
                return rxjs.throwError(error);
            }))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-preferences-saved.success.message'));
                _this.isSaveInProgressSubject.next(false);
                _this.activeModalRef.close();
            }, function () { return _this.rxNotificationService.addErrorMessage(_this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-profile-not-updated.message')); });
        };
        GainsightOptInComponent.prototype.ngOnDestroy = function () {
            this.isSaveInProgressSubject.complete();
        };
        return GainsightOptInComponent;
    }());
    GainsightOptInComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GainsightOptInComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: RxGainsightUserPreferencesService }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$2.RxNotificationService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    GainsightOptInComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GainsightOptInComponent, selector: "rx-gainsight-opt-in", ngImport: i0__namespace, template: "<rx-line-loader\n  *ngIf=\"isQueryInProgress\"\n  [loaderMessage]=\"'com.bmc.arsys.rx.client.common.loading-data' | translate\"\n></rx-line-loader>\n\n<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm\">\n  <div [hidden]=\"isQueryInProgress\" class=\"modal-body\">\n    <adapt-agreement-card\n      (stateChange)=\"handleStateChange($event)\"\n      [showShadow]=\"false\"\n      [showMarketingSection]=\"false\"\n      [state]=\"vm.state\"\n      rx-id=\"gainsight-agreement\"\n    >\n    </adapt-agreement-card>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      type=\"button\"\n      class=\"btn btn-primary\"\n      (click)=\"save()\"\n      rx-id=\"save-button\"\n      [disabled]=\"isSaveButtonDisabled || vm.isSaveInProgress\"\n      [adaptInlineLoader]=\"vm.isSaveInProgress\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", components: [{ type: i1__namespace.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i1__namespace$1.AdaptAgreementCardComponent, selector: "adapt-agreement-card", inputs: ["multiProductUsage", "state", "showOrganizationSettings", "showMarketingSection", "showShadow"], outputs: ["stateChange"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "async": i4__namespace.AsyncPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: GainsightOptInComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-gainsight-opt-in',
                        templateUrl: './gainsight-opt-in.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: RxGainsightUserPreferencesService }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$2.RxNotificationService }]; } });

    var RxUserMessageModalComponent = /** @class */ (function () {
        function RxUserMessageModalComponent(context, rxUserMessageService, translateService, renderer) {
            this.context = context;
            this.rxUserMessageService = rxUserMessageService;
            this.translateService = translateService;
            this.renderer = renderer;
            this.loadingInProgress = false;
            this.RX_USER_MESSAGE = RX_USER_MESSAGE;
            this.messages = {
                active: {
                    type: '',
                    count: 0,
                    list: [],
                    queryExpr: '',
                    loadingInProgress: false
                },
                dismissed: {
                    type: '',
                    count: 0,
                    list: [],
                    queryExpr: '',
                    loadingInProgress: false
                }
            };
        }
        RxUserMessageModalComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxUserMessageService.getMessages(RX_USER_MESSAGE.messageTypes.dismissed).subscribe(function () {
                _this.messages = _this.rxUserMessageService.userMessageModel.messages;
            });
            this.messageSubscription = this.rxUserMessageService.messageFetched$.subscribe(function () {
                var scrollPosition = _this.scrollableNotifications
                    ? _this.renderer.selectRootElement(_this.scrollableNotifications.nativeElement).scrollTop
                    : null;
                if (!scrollPosition || _this.loadingInProgress) {
                    _this.loadingInProgress = false;
                    _this.messages = _this.rxUserMessageService.userMessageModel.messages;
                }
            });
        };
        RxUserMessageModalComponent.prototype.getMoreMessages = function (messageType, event) {
            this.loadingInProgress = true;
            this.rxUserMessageService.getMessages(messageType, true).subscribe();
            event.stopPropagation();
        };
        RxUserMessageModalComponent.prototype.dismissMessage = function (message) {
            this.rxUserMessageService.dismissNotification(message);
        };
        RxUserMessageModalComponent.prototype.getContentTitleText = function (key, count) {
            var contentTitleText;
            switch (key) {
                case RX_USER_MESSAGE.messageTypes.active:
                    contentTitleText = 'com.bmc.arsys.rx.client.shell.notification.active.label';
                    break;
                case RX_USER_MESSAGE.messageTypes.dismissed:
                    contentTitleText = 'com.bmc.arsys.rx.client.shell.notification.dismissed.label';
                    break;
            }
            return this.translateService.instant(contentTitleText, { count: count });
        };
        RxUserMessageModalComponent.prototype.closeModal = function () {
            this.context.close(true);
        };
        RxUserMessageModalComponent.prototype.ngOnDestroy = function () {
            this.messageSubscription.unsubscribe();
        };
        return RxUserMessageModalComponent;
    }());
    RxUserMessageModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: RxUserMessageService }, { token: i4__namespace$1.TranslateService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxUserMessageModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserMessageModalComponent, selector: "rx-user-message-modal", viewQueries: [{ propertyName: "scrollableNotifications", first: true, predicate: ["scrollableNotifications"], descendants: true, static: true }], ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ RX_USER_MESSAGE.title | translate }}</h5>\n  <button class=\"close dp-close\" type=\"button\" (click)=\"context.close(false)\" rx-id=\"x-button\"></button>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"rx-container\">\n    <div class=\"active-messages\" *ngIf=\"messages.active.count || messages.dismissed.count\" #scrollableNotifications>\n      <div *ngFor=\"let messagesType of messages | keyvalue\">\n        <div class=\"content-title\">\n          {{ getContentTitleText(messagesType.key, messagesType.value.count) }}\n        </div>\n\n        <div *ngIf=\"!messagesType.value.count\" class=\"empty-holder\" [ngSwitch]=\"messagesType.key\">\n          <span *ngSwitchCase=\"RX_USER_MESSAGE.messageTypes.active\">{{\n            'com.bmc.arsys.rx.client.shell.notification.active.noNotifications.label' | translate\n          }}</span>\n          <span *ngSwitchCase=\"RX_USER_MESSAGE.messageTypes.dismissed\">{{\n            'com.bmc.arsys.rx.client.shell.notification.dismissed.noNotifications.label' | translate\n          }}</span>\n        </div>\n\n        <div *ngIf=\"messagesType.value.count\">\n          <div\n            class=\"item\"\n            *ngFor=\"let message of messagesType.value.list\"\n            [ngClass]=\"{ 'item-dismiss': message.dismissInProgress }\"\n          >\n            <div class=\"item-content-section\">\n              <div class=\"item-content-inner-section d-flex align-items-center flex-wrap\">\n                <div class=\"item-icon-section d-icon-bell_o\"></div>\n                <div class=\"item-content-subject font-weight-bold\">{{ message['20000'] }}</div>\n                <div class=\"item-dismiss-section ml-auto\" *ngIf=\"messagesType.key === RX_USER_MESSAGE.messageTypes.active\">\n                  <button\n                    *ngIf=\"!message.dismissInProgress\"\n                    [attr.aria-label]=\"RX_USER_MESSAGE.dismissMessage | translate\"\n                    (click)=\"dismissMessage(message)\"\n                    class=\"close\"\n                    rx-id=\"x-button\"\n                    type=\"button\"\n                  ></button>\n\n                  <div class=\"item-dismiss-preloader\">\n                    <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"message.dismissInProgress\"></div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"item-content-text text-break\" [innerHTML]=\"message['20001']\"></div>\n              <div class=\"item-content-date\">\n                {{ message['6'] | date: 'medium' }}\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div\n          class=\"content-load-more\"\n          *ngIf=\"loadingInProgress || messagesType.value.count > messagesType.value.list.length\"\n        >\n          <button\n            type=\"button\"\n            *ngIf=\"!loadingInProgress\"\n            adapt-button\n            btn-type=\"tertiary\"\n            size=\"small\"\n            (click)=\"getMoreMessages(messagesType.key, $event)\"\n            rx-id=\"show-more\"\n          >\n            {{ RX_USER_MESSAGE.loadMore | translate }}\n          </button>\n\n          <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"loadingInProgress\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"empty-holder\" *ngIf=\"messages.active.count === 0 && messages.dismissed.count === 0\">\n    {{ RX_USER_MESSAGE.noActiveMessage | translate }}\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <adapt-button btn-type=\"primary\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </adapt-button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:0}.rx-container{width:100%!important;max-width:100%!important}.content-title{height:48px;line-height:48px;padding:0 18px;font-size:14px;font-weight:var(--font-weight-bold);border-left:none;border-right:none;border-top:1px solid #d6d7d8;border-bottom:1px solid #d6d7d8}.empty-holder{height:100px;line-height:100px;text-align:center}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n", ":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.default-border{border-bottom:1px solid #d6d7d8}::ng-deep .adapt-dd-menu-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container .item-content-section{padding:16px 0}::ng-deep .popover-mobile rx-user-messages .rx-container .title-section{padding:0}::ng-deep .popover-mobile rx-user-messages .rx-container .title{display:none!important}.rx-container{width:480px;max-width:100%}.title-section{height:48px;line-height:48px;padding:0 18px;border-top:none;border-left:none;border-right:none;font-size:15px}.buttons-wrapper{float:right}.empty-holder{height:100px;line-height:100px;text-align:center}.item{display:flex;display:-ms-flexbox;border-top:1px solid #d6d7d8;border-left:none;border-right:none}.item:first-of-type{border-top:none}.item:last-of-type{border-bottom:none}.item-dismiss{opacity:.3}.item-icon-section{padding-right:5px;font-size:25px}.item-content-section{padding:16px 15px;flex:1;overflow:hidden}.item-content-text{font-size:14px;padding-bottom:5px}.item-content-date{font-size:12px;color:#959899}.item-dismiss-section button{margin-top:5px;font-size:small}.item-dismiss-section button:hover,.item-dismiss-section button:focus{background-color:transparent}.item-dismiss-preloader{position:absolute;top:8px;width:35px}.item-dismiss-preloader .d-preloader{line-height:35px}.item-dismiss-preloader .d-preloader:before{font-size:12px}.content-load-more{height:40px;display:flex;align-items:center;justify-content:center}.item-content-subject{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;max-width:calc(100% - 65px)!important}.item-content-inner-section{max-width:calc(100vw - 44px)!important}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "keyvalue": i4__namespace.KeyValuePipe, "date": i4__namespace.DatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessageModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-user-message-modal',
                        templateUrl: './user-message-modal.component.html',
                        styleUrls: ['./user-message-modal.component.scss', './user-messages.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: RxUserMessageService }, { type: i4__namespace$1.TranslateService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { scrollableNotifications: [{
                    type: i0.ViewChild,
                    args: ['scrollableNotifications', { static: true }]
                }] } });

    var RxUserMessagesComponent = /** @class */ (function () {
        function RxUserMessagesComponent(adaptModalService, rxUserMessageService, renderer) {
            this.adaptModalService = adaptModalService;
            this.rxUserMessageService = rxUserMessageService;
            this.renderer = renderer;
            this.subscription = new rxjs.Subscription();
            this.loadingInProgress = false;
            this.activeMessage = {};
            this.RX_USER_MESSAGE = RX_USER_MESSAGE;
            this.activeMessage.count = 0;
            this.activeMessage.list = [];
        }
        RxUserMessagesComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription.add(this.rxUserMessageService.messageFetched$.subscribe(function () {
                var scrollPosition = _this.scrollableNotifications
                    ? _this.renderer.selectRootElement(_this.scrollableNotifications.nativeElement).scrollTop
                    : null;
                if (!scrollPosition || _this.loadingInProgress) {
                    _this.activeMessage = _this.rxUserMessageService.userMessageModel.messages.active;
                    _this.loadingInProgress = false;
                }
            }));
            this.rxUserMessageService.launchMessagePolling();
        };
        RxUserMessagesComponent.prototype.getMoreMessages = function (event) {
            this.loadingInProgress = true;
            this.subscription.add(this.rxUserMessageService.getMessages(RX_USER_MESSAGE.messageTypes.active, true).subscribe());
            event.stopPropagation();
        };
        RxUserMessagesComponent.prototype.dismissMessage = function (message) {
            this.rxUserMessageService.dismissNotification(message);
        };
        RxUserMessagesComponent.prototype.viewAllMessages = function () {
            return this.adaptModalService
                .open({
                content: RxUserMessageModalComponent,
                data: {},
                size: 'lg'
            })
                .catch(lodash.noop);
        };
        RxUserMessagesComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        return RxUserMessagesComponent;
    }());
    RxUserMessagesComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessagesComponent, deps: [{ token: i1__namespace$1.AdaptModalService }, { token: RxUserMessageService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxUserMessagesComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserMessagesComponent, selector: "rx-user-messages", viewQueries: [{ propertyName: "scrollableNotifications", first: true, predicate: ["scrollableNotifications"], descendants: true, static: true }], ngImport: i0__namespace, template: "<div class=\"rx-container\">\n  <div class=\"title-section default-border d-flex\">\n    <div class=\"title d-inline\">{{ RX_USER_MESSAGE.title | translate }}</div>\n    <div class=\"buttons-wrapper ml-auto\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        (click)=\"viewAllMessages()\"\n        rx-id=\"view-all-messages\"\n      >\n        {{ RX_USER_MESSAGE.showAll | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        *ngIf=\"activeMessage.count\"\n        (click)=\"dismissMessage()\"\n        rx-id=\"dismiss-message\"\n      >\n        {{ RX_USER_MESSAGE.dismissAll | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div class=\"empty-holder\" *ngIf=\"activeMessage.count === 0\">\n    {{ RX_USER_MESSAGE.noActiveMessage | translate }}\n  </div>\n\n  <div class=\"active-messages\" *ngIf=\"activeMessage.count\" #scrollableNotifications>\n    <div\n      class=\"item default-border\"\n      *ngFor=\"let message of activeMessage.list\"\n      [ngClass]=\"{ 'item-dismiss': message.dismissInProgress }\"\n    >\n      <div class=\"item-content-section\">\n        <div class=\"item-content-inner-section d-flex align-items-center\">\n          <div class=\"item-icon-section d-icon-bell_o\"></div>\n          <div class=\"item-content-subject font-weight-bold\">{{ message['20000'] }}</div>\n          <div class=\"item-dismiss-section ml-auto\">\n            <button\n              *ngIf=\"!message.dismissInProgress\"\n              [attr.aria-label]=\"RX_USER_MESSAGE.dismissMessage | translate\"\n              (click)=\"dismissMessage(message)\"\n              class=\"close\"\n              rx-id=\"x-button\"\n              type=\"button\"\n            ></button>\n\n            <div class=\"item-dismiss-preloader\">\n              <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"message.dismissInProgress\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"item-content-text text-break\" [innerHTML]=\"message['20001']\"></div>\n        <div class=\"item-content-date\">\n          {{ message['6'] | date: 'medium' }}\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"content-load-more\" *ngIf=\"loadingInProgress || activeMessage.count > activeMessage.list.length\">\n    <button\n      type=\"button\"\n      *ngIf=\"!loadingInProgress\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      (click)=\"getMoreMessages($event)\"\n      rx-id=\"show-more\"\n    >\n      {{ RX_USER_MESSAGE.loadMore | translate }}\n    </button>\n\n    <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"loadingInProgress\"></div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.default-border{border-bottom:1px solid #d6d7d8}::ng-deep .adapt-dd-menu-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container .item-content-section{padding:16px 0}::ng-deep .popover-mobile rx-user-messages .rx-container .title-section{padding:0}::ng-deep .popover-mobile rx-user-messages .rx-container .title{display:none!important}.rx-container{width:480px;max-width:100%}.title-section{height:48px;line-height:48px;padding:0 18px;border-top:none;border-left:none;border-right:none;font-size:15px}.buttons-wrapper{float:right}.empty-holder{height:100px;line-height:100px;text-align:center}.item{display:flex;display:-ms-flexbox;border-top:1px solid #d6d7d8;border-left:none;border-right:none}.item:first-of-type{border-top:none}.item:last-of-type{border-bottom:none}.item-dismiss{opacity:.3}.item-icon-section{padding-right:5px;font-size:25px}.item-content-section{padding:16px 15px;flex:1;overflow:hidden}.item-content-text{font-size:14px;padding-bottom:5px}.item-content-date{font-size:12px;color:#959899}.item-dismiss-section button{margin-top:5px;font-size:small}.item-dismiss-section button:hover,.item-dismiss-section button:focus{background-color:transparent}.item-dismiss-preloader{position:absolute;top:8px;width:35px}.item-dismiss-preloader .d-preloader{line-height:35px}.item-dismiss-preloader .d-preloader:before{font-size:12px}.content-load-more{height:40px;display:flex;align-items:center;justify-content:center}.item-content-subject{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;max-width:calc(100% - 65px)!important}.item-content-inner-section{max-width:calc(100vw - 44px)!important}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "date": i4__namespace.DatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserMessagesComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-user-messages',
                        templateUrl: './user-messages.component.html',
                        styleUrls: ['user-messages.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.AdaptModalService }, { type: RxUserMessageService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { scrollableNotifications: [{
                    type: i0.ViewChild,
                    args: ['scrollableNotifications', { static: true }]
                }] } });

    var RxShellComponent = /** @class */ (function (_super) {
        __extends(RxShellComponent, _super);
        function RxShellComponent(adaptModalService, route, rxModalService, rxNotificationService, rxShellService, rxSmartReportingService, rxUpgradeTrackerService, rxViewActionService, injector, adaptNavigationService) {
            var _this = _super.call(this, injector) || this;
            _this.adaptModalService = adaptModalService;
            _this.route = route;
            _this.rxModalService = rxModalService;
            _this.rxNotificationService = rxNotificationService;
            _this.rxShellService = rxShellService;
            _this.rxSmartReportingService = rxSmartReportingService;
            _this.rxUpgradeTrackerService = rxUpgradeTrackerService;
            _this.rxViewActionService = rxViewActionService;
            _this.injector = injector;
            _this.adaptNavigationService = adaptNavigationService;
            _this.subscriptions = new rxjs.Subscription();
            _this.rxShellService.resetMenuItemCount();
            return _this;
        }
        RxShellComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.subscriptions.add(this.rxShellService.navigateToSmartReporting$
                .pipe(operators.switchMap(function () { return _this.rxSmartReportingService.openSmartReporting(); }))
                .subscribe(function (isSmartReportingConfigured) {
                if (!isSmartReportingConfigured) {
                    _this.rxNotificationService.addErrorMessage(_this.translateService.instant('com.bmc.arsys.rx.client.shell.smart-reporting-not-configured'));
                }
            }));
            this.subscriptions.add(this.rxShellService.navigateToView$.subscribe(function (menuItem) { return _this.openView(menuItem); }));
            this.subscriptions.add(this.rxShellService.openUserPreferences$.subscribe(function () { return _this.openUserPreferences(); }));
            this.subscriptions.add(this.rxShellService.openGainsightPreferences$.subscribe(function () { return _this.openGainsightPreferences(); }));
            this.subscriptions.add(this.rxShellService.openUserAvailability$.subscribe(function () { return _this.openUserAvailability(); }));
        };
        RxShellComponent.prototype.onNavigationCanceled = function () {
            if (this.currentMenuItemId !== null) {
                this.adaptNavigation.selectMenuItem(this.currentMenuItemId);
            }
        };
        RxShellComponent.prototype.openView = function (menuItem) {
            var _this = this;
            this.rxViewActionService
                .execute(i3$1.RX_VIEW_ACTION.viewActionNames.openView, menuItem.openViewParams)
                .pipe(operators.take(1))
                .subscribe({
                error: function () {
                    _this.onNavigationCanceled();
                }
            });
        };
        RxShellComponent.prototype.openUserPreferences = function () {
            var _this = this;
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-preferences.label'),
                content: RxUserPreferencesComponent,
                size: 'sm'
            })
                .then(function () {
                _this.rxModalService
                    .confirm({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: _this.translateService.instant('com.bmc.arsys.rx.client.shell.user-preferences-dialog.signout.confirmation.message')
                })
                    .then(function (isLogoutRequested) {
                    if (isLogoutRequested) {
                        _this.logout();
                    }
                });
            })
                .catch(lodash.noop);
        };
        RxShellComponent.prototype.openGainsightPreferences = function () {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
                content: GainsightOptInComponent,
                size: 'sm'
            })
                .catch(lodash.noop);
        };
        RxShellComponent.prototype.openUserAvailability = function () {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability.label'),
                content: RxUserAvailabilityComponent,
                size: 'sm'
            })
                .catch(lodash.noop);
        };
        RxShellComponent.prototype.getNavigationActionItems = function () {
            var _this = this;
            return this.shellConfig$.pipe(operators.map(function (shellConfig) {
                var actions = [];
                shellConfig.navigationActions.forEach(function (item) {
                    actions.push({
                        action: item.action,
                        className: item.className,
                        name: item.name,
                        tooltip: item.name,
                        hide: item.hide
                    });
                });
                if (!shellConfig.globalSearchDisabled) {
                    actions.push({
                        name: _this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                        tooltip: _this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                        className: 'd-icon-search',
                        route: "/" + _this.rxGlobalCacheService.applicationId + "/search"
                    });
                }
                var showUpgradeTrackerAction = {
                    action: function () {
                        _this.rxUpgradeTrackerService.displayUpgradeNotification(true);
                    },
                    className: 'd-icon-clock_alert',
                    hide: !_this.rxUpgradeTrackerService.isUpgradeInProgress,
                    name: ''
                };
                _this.subscriptions.add(_this.rxUpgradeTrackerService.isUpgradeInProgress$.subscribe(function () {
                    showUpgradeTrackerAction.hide = !_this.rxUpgradeTrackerService.isUpgradeInProgress;
                }));
                actions.push(showUpgradeTrackerAction);
                return actions;
            }));
        };
        RxShellComponent.prototype.getActiveNavigationMenuItem = function () {
            var _this = this;
            return lodash.find(this.flattenedMenuItems, function (menuItem) { return menuItem.hide !== true &&
                menuItem.type === i3$1.RX_SHELL.actions.navigateToView &&
                decodeURIComponent("/" + _this.rxGlobalCacheService.applicationId + "/view/" + menuItem.viewUrl) ===
                    decodeURIComponent(_this.router.url); });
        };
        RxShellComponent.prototype.getNavigationMenuItems = function () {
            return this.shellConfig$.pipe(operators.map(function (shellConfig) { return shellConfig.navigationBarItems; }));
        };
        RxShellComponent.prototype.getUserMenuItems = function () {
            return this.shellConfig$.pipe(operators.map(function (shellConfig) { return shellConfig.userMenu.subMenu; }));
        };
        RxShellComponent.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.subscriptions.unsubscribe();
        };
        RxShellComponent.prototype.getShellConfig = function () {
            var _this = this;
            return this.applicationDescriptor$.pipe(operators.switchMap(function (currentBundleDescriptor) { return _this.rxShellService.getShellConfig(currentBundleDescriptor.id); }), operators.tap(function (shellConfig) {
                _this.flattenedMenuItems = shellConfig.flattenedMenuItems;
            }), operators.shareReplay(1));
        };
        return RxShellComponent;
    }(ShellBase));
    RxShellComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellComponent, deps: [{ token: i1__namespace$1.AdaptModalService }, { token: i1__namespace$4.ActivatedRoute }, { token: i1__namespace.RxModalService }, { token: i1__namespace$2.RxNotificationService }, { token: i3__namespace$1.RxShellService }, { token: i1__namespace$2.RxSmartReportingService }, { token: i1__namespace$2.RxUpgradeTrackerService }, { token: i3__namespace$1.RxViewActionService }, { token: i0__namespace.Injector }, { token: i1__namespace$1.AdaptNavigationService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxShellComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellComponent, selector: "rx-shell", viewQueries: [{ propertyName: "adaptNavigation", first: true, predicate: ["adaptNavigation"], descendants: true, static: true }, { propertyName: "userMessagesPopover", first: true, predicate: ["userMessagesPopover"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<ng-template #userMessagesPopover>\n  <rx-user-messages></rx-user-messages>\n</ng-template>\n\n<adapt-navigation\n  #adaptNavigation\n  [class.invisible]=\"!isShellInitialized\"\n  [metadata]=\"brandingInfo$ | async\"\n  [menu]=\"(navigationMenuItems$ | async) || []\"\n  [actions]=\"navigationActionItems$ | async\"\n  [profile]=\"userProfileMenu$ | async\"\n></adapt-navigation>\n\n<adapt-alert\n  *ngIf=\"hasBanner$ | async\"\n  [config]=\"{\n    title: 'Note:',\n    type: 'page',\n    variant: 'info',\n    content: ''\n  }\"\n  (onClose)=\"closeBanner()\"\n>\n  <span class=\"alert-content\">\n    <span>\n      {{ alertText }}\n    </span>\n\n    <a href=\"#\" class=\"alert-link\" (click)=\"openGainsightPreferences(); $event.preventDefault()\">\n      {{ alertLinkText }}\n    </a>\n  </span>\n</adapt-alert>\n\n<div [class.invisible]=\"!isShellInitialized\" class=\"busy-indicator position-relative\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<div\n  [class.invisible]=\"!isShellInitialized\"\n  class=\"outlet-content\"\n  [ngClass]=\"{\n    'has-banner': hasBanner$ | async\n  }\"\n>\n  <router-outlet></router-outlet>\n</div>\n", styles: [":host{height:100%}.outlet-content{height:calc(100% - 52px)}.has-banner{height:calc(100% - 96px)}.busy-indicator{bottom:2px}.busy-indicator ::ng-deep .ng-busy{z-index:1}\n"], components: [{ type: RxUserMessagesComponent, selector: "rx-user-messages" }, { type: i1__namespace$1.AdaptNavigationComponent, selector: "adapt-navigation", inputs: ["menu", "metadata", "config", "kebabView", "gapWidth", "container", "actions", "profile", "customProfile", "appSwitcherEnabled", "appSwitcherMetaData", "theme", "checkForHamburger", "selectMenuItem", "closeHamburger"], outputs: ["alertClosed"] }, { type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace$4.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-shell',
                        templateUrl: './shell.component.html',
                        styleUrls: ['./shell.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.AdaptModalService }, { type: i1__namespace$4.ActivatedRoute }, { type: i1__namespace.RxModalService }, { type: i1__namespace$2.RxNotificationService }, { type: i3__namespace$1.RxShellService }, { type: i1__namespace$2.RxSmartReportingService }, { type: i1__namespace$2.RxUpgradeTrackerService }, { type: i3__namespace$1.RxViewActionService }, { type: i0__namespace.Injector }, { type: i1__namespace$1.AdaptNavigationService }]; }, propDecorators: { adaptNavigation: [{
                    type: i0.ViewChild,
                    args: ['adaptNavigation', { static: true }]
                }], userMessagesPopover: [{
                    type: i0.ViewChild,
                    args: ['userMessagesPopover', { static: true }]
                }] } });

    var DevelopmentModeSelectorComponent = /** @class */ (function () {
        function DevelopmentModeSelectorComponent(activeModalRef) {
            var _this = this;
            this.activeModalRef = activeModalRef;
            this.developmentModeFormControl = new i2.FormControl(this.activeModalRef.getData().developmentMode);
            this.isSaveButtonDisabled$ = this.developmentModeFormControl.valueChanges.pipe(operators.startWith(this.activeModalRef.getData().developmentMode), operators.map(function (value) { return value === _this.activeModalRef.getData().developmentMode; }));
        }
        DevelopmentModeSelectorComponent.prototype.closeModal = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        DevelopmentModeSelectorComponent.prototype.selectDevelopmentMode = function () {
            this.activeModalRef.close(this.developmentModeFormControl.value);
        };
        return DevelopmentModeSelectorComponent;
    }());
    DevelopmentModeSelectorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DevelopmentModeSelectorComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DevelopmentModeSelectorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DevelopmentModeSelectorComponent, selector: "rx-development-mode-selector", ngImport: i0__namespace, template: "<div class=\"modal-body p-0\">\n  <adapt-alert\n    [config]=\"{\n      content: 'com.bmc.arsys.rx.client.shell.development-mode.close-other-tabs.warning' | translate,\n      dismissible: false,\n      variant: 'warning',\n      type: 'page'\n    }\"\n  ></adapt-alert>\n\n  <div class=\"p-4\">\n    <div class=\"flex\">\n      <adapt-rx-radiobutton-group\n        [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.select.label' | translate\"\n        [autofocus]=\"true\"\n        [formControl]=\"developmentModeFormControl\"\n      >\n        <adapt-rx-radiobutton\n          value=\"1\"\n          [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.best-practice.label' | translate\"\n        ></adapt-rx-radiobutton>\n        <adapt-rx-radiobutton\n          value=\"0\"\n          [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.base.label' | translate\"\n        ></adapt-rx-radiobutton>\n      </adapt-rx-radiobutton-group>\n\n      <adapt-alert\n        *ngIf=\"developmentModeFormControl.value === '0' && developmentModeFormControl.dirty\"\n        [config]=\"{\n          type: 'inline',\n          variant: 'warning',\n          dismissible: false,\n          content: 'com.bmc.arsys.rx.client.shell.development-mode.system-upgrade.warning' | translate\n        }\"\n      ></adapt-alert>\n\n      <a\n        adapt-button\n        class=\"d-icon-pop_up pl-0 pb-0\"\n        btn-type=\"tertiary\"\n        size=\"large\"\n        target=\"_blank\"\n        href=\"https://docs.bmc.com/docs/display/helixplatform/Customization+layer\"\n      >\n        <span> {{ 'com.bmc.arsys.rx.client.common.learn-more.label' | translate }}</span>\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    (click)=\"selectDevelopmentMode()\"\n    [disabled]=\"isSaveButtonDisabled$ | async\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.select.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace$1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1__namespace$1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4__namespace$1.TranslatePipe, "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DevelopmentModeSelectorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-development-mode-selector',
                        templateUrl: './development-mode-selector.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }]; } });

    var FeedbackDialogComponent = /** @class */ (function () {
        function FeedbackDialogComponent(dockedPanelContext, domSanitizer, rxOverlayService) {
            this.dockedPanelContext = dockedPanelContext;
            this.domSanitizer = domSanitizer;
            this.rxOverlayService = rxOverlayService;
        }
        FeedbackDialogComponent.prototype.ngOnInit = function () {
            var data = this.dockedPanelContext.getData();
            var requestParams = new i4$4.HttpParams({
                fromObject: {
                    Q_Language: 'EN',
                    product: 'BMC Helix Platform',
                    productVersion: data.bundleDescriptorVersion,
                    tenant: this.rxOverlayService.getCurrentOverlayContext().tenantName
                }
            });
            this.feedbackUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.feedbackUrl.value + '?' + requestParams.toString());
        };
        FeedbackDialogComponent.prototype.close = function () {
            this.dockedPanelContext.close(i1$1.DismissReasons.CLOSE_BTN);
        };
        return FeedbackDialogComponent;
    }());
    FeedbackDialogComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FeedbackDialogComponent, deps: [{ token: i1__namespace$1.DockedPanelContext }, { token: i2__namespace$2.DomSanitizer }, { token: i1__namespace$2.RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FeedbackDialogComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FeedbackDialogComponent, selector: "rx-feedback-dialog", ngImport: i0__namespace, template: "<div class=\"h-100 p-0\">\n  <iframe frameborder=\"0\" class=\"d-block h-100 w-100\" [src]=\"feedbackUrl\"> </iframe>\n</div>\n" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FeedbackDialogComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-feedback-dialog',
                        templateUrl: './feedback-dialog.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.DockedPanelContext }, { type: i2__namespace$2.DomSanitizer }, { type: i1__namespace$2.RxOverlayService }]; } });

    var RxInnovationStudioShellComponent = /** @class */ (function (_super) {
        __extends(RxInnovationStudioShellComponent, _super);
        function RxInnovationStudioShellComponent(injector, adaptDockedPanelService, adaptModalService, rxSystemConfigurationService, rxOverlayService, rxPreviousStateService, rxModalService) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.adaptDockedPanelService = adaptDockedPanelService;
            _this.adaptModalService = adaptModalService;
            _this.rxSystemConfigurationService = rxSystemConfigurationService;
            _this.rxOverlayService = rxOverlayService;
            _this.rxPreviousStateService = rxPreviousStateService;
            _this.rxModalService = rxModalService;
            _this.flattenedMenuItems = [
                {
                    name: _this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.page.label'),
                    id: 0,
                    action: function () {
                        _this.router.navigate([i1$2.RX_APPLICATION.innovationStudioBundleId, 'workspace']);
                    }
                },
                {
                    name: _this.translateService.instant('com.bmc.arsys.rx.client.common.administration.label'),
                    id: 1,
                    action: function () {
                        _this.router.navigate([i1$2.RX_APPLICATION.innovationStudioBundleId, 'settings']);
                    }
                }
            ];
            _this.npsSurveyBaseUrl = 'NPS-Survey-Base-URL';
            _this.currentOverlayContext = _this.rxOverlayService.getCurrentOverlayContext();
            return _this;
        }
        RxInnovationStudioShellComponent.prototype.getActiveNavigationMenuItem = function () {
            var url = this.router.url;
            if (lodash.includes(url, i1$2.RX_APPLICATION.innovationStudioBundleId + "/workspace")) {
                return this.flattenedMenuItems[0];
            }
            else if (lodash.includes(url, i1$2.RX_APPLICATION.innovationStudioBundleId + "/settings")) {
                return this.flattenedMenuItems[1];
            }
        };
        RxInnovationStudioShellComponent.prototype.getUserMenuItems = function () {
            var _this = this;
            var userMenu = [];
            var currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
            if (this.isEligibleForFeedback()) {
                userMenu.push({
                    name: this.translateService.instant('com.bmc.arsys.rx.client.shell.provide-feedback.label'),
                    className: 'd-icon-heart',
                    id: 1,
                    action: function () {
                        _this.openFeedback();
                    }
                });
            }
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                userMenu.push({
                    name: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
                    id: 0,
                    className: 'd-icon-app_chart_bar',
                    action: function () {
                        _this.openGainsightPreferences();
                    }
                });
            }
            return rxjs.of(userMenu);
        };
        RxInnovationStudioShellComponent.prototype.isEligibleForFeedback = function () {
            return (this.currentOverlayContext.overlayGroupId !== i1$2.RX_OVERLAY.overlayGroupIds.base &&
                !this.currentOverlayContext.isShared);
        };
        RxInnovationStudioShellComponent.prototype.openFeedback = function () {
            var _this = this;
            var bundleDescriptorVersion;
            this.applicationDescriptor$.subscribe(function (applicationDescriptor) {
                bundleDescriptorVersion = applicationDescriptor.version;
            });
            this.rxSystemConfigurationService.getConfiguration(this.npsSurveyBaseUrl).subscribe(function (feedbackUrl) {
                _this.adaptDockedPanelService.open({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.shell.provide-feedback.label'),
                    content: FeedbackDialogComponent,
                    size: 'md',
                    data: { feedbackUrl: feedbackUrl, bundleDescriptorVersion: bundleDescriptorVersion }
                });
            });
        };
        RxInnovationStudioShellComponent.prototype.openGainsightPreferences = function () {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
                content: GainsightOptInComponent,
                size: 'sm'
            })
                .catch(rxjs.noop);
        };
        RxInnovationStudioShellComponent.prototype.getNavigationMenuItems = function () {
            return rxjs.of(this.flattenedMenuItems);
        };
        RxInnovationStudioShellComponent.prototype.getNavigationActionItems = function () {
            var _this = this;
            var currentDevelopmentMode = this.rxOverlayService.getDevelopmentMode();
            return rxjs.of([
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.shell.development-mode.title'),
                    className: 'd-icon-field_custom',
                    tooltip: this.translateService.instant(currentDevelopmentMode === i1$2.DevelopmentMode.Base
                        ? 'com.bmc.arsys.rx.client.shell.development-mode.base.tooltip'
                        : 'com.bmc.arsys.rx.client.shell.development-mode.best-practice.tooltip'),
                    action: function () {
                        _this.adaptModalService
                            .open({
                            title: _this.translateService.instant('com.bmc.arsys.rx.client.shell.development-mode.title'),
                            content: DevelopmentModeSelectorComponent,
                            size: 'sm',
                            data: { developmentMode: currentDevelopmentMode }
                        })
                            .then(function (developmentMode) {
                            _this.rxOverlayService.setDevelopmentMode(developmentMode);
                            _this.router.navigate([i1$2.RX_APPLICATION.innovationStudioBundleId, 'workspace']).then(function () {
                                window.location.reload();
                            });
                        }, function () { });
                    }
                }
            ]);
        };
        RxInnovationStudioShellComponent.prototype.getShellConfig = function () {
            return rxjs.of({ allowAppSwitching: true });
        };
        return RxInnovationStudioShellComponent;
    }(ShellBase));
    RxInnovationStudioShellComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxInnovationStudioShellComponent, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$1.AdaptDockedPanelService }, { token: i1__namespace$1.AdaptModalService }, { token: i1__namespace$2.RxSystemConfigurationService }, { token: i1__namespace$2.RxOverlayService }, { token: i1__namespace$2.RxPreviousStateService }, { token: i1__namespace.RxModalService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxInnovationStudioShellComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxInnovationStudioShellComponent, selector: "rx-innovation-studio-shell", viewQueries: [{ propertyName: "adaptNavigation", first: true, predicate: ["adaptNavigation"], descendants: true, static: true }, { propertyName: "userMessagesPopover", first: true, predicate: ["userMessagesPopover"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<ng-template #userMessagesPopover>\n  <rx-user-messages></rx-user-messages>\n</ng-template>\n\n<adapt-navigation\n  #adaptNavigation\n  [class.invisible]=\"!isShellInitialized\"\n  [metadata]=\"brandingInfo$ | async\"\n  [menu]=\"(navigationMenuItems$ | async) || []\"\n  [actions]=\"navigationActionItems$ | async\"\n  [profile]=\"userProfileMenu$ | async\"\n></adapt-navigation>\n\n<adapt-alert\n  *ngIf=\"hasBanner$ | async\"\n  [config]=\"{\n    title: 'Note:',\n    type: 'page',\n    variant: 'info',\n    content: ''\n  }\"\n  (onClose)=\"closeBanner()\"\n>\n  <span class=\"alert-content\">\n    <span>\n      {{ alertText }}\n    </span>\n\n    <a href=\"#\" class=\"alert-link\" (click)=\"openGainsightPreferences(); $event.preventDefault()\">\n      {{ alertLinkText }}\n    </a>\n  </span>\n</adapt-alert>\n\n<div [class.invisible]=\"!isShellInitialized\" class=\"busy-indicator position-relative\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<div\n  [class.invisible]=\"!isShellInitialized\"\n  class=\"outlet-content\"\n  [ngClass]=\"{\n    'has-banner': hasBanner$ | async\n  }\"\n>\n  <router-outlet></router-outlet>\n</div>\n", styles: [":host{height:100%}.outlet-content{height:calc(100% - 52px)}.has-banner{height:calc(100% - 96px)}.busy-indicator{bottom:2px}.busy-indicator ::ng-deep .ng-busy{z-index:1}\n"], components: [{ type: RxUserMessagesComponent, selector: "rx-user-messages" }, { type: i1__namespace$1.AdaptNavigationComponent, selector: "adapt-navigation", inputs: ["menu", "metadata", "config", "kebabView", "gapWidth", "container", "actions", "profile", "customProfile", "appSwitcherEnabled", "appSwitcherMetaData", "theme", "checkForHamburger", "selectMenuItem", "closeHamburger"], outputs: ["alertClosed"] }, { type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace$4.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxInnovationStudioShellComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-innovation-studio-shell',
                        templateUrl: './shell.component.html',
                        styleUrls: ['./shell.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$1.AdaptDockedPanelService }, { type: i1__namespace$1.AdaptModalService }, { type: i1__namespace$2.RxSystemConfigurationService }, { type: i1__namespace$2.RxOverlayService }, { type: i1__namespace$2.RxPreviousStateService }, { type: i1__namespace.RxModalService }]; }, propDecorators: { adaptNavigation: [{
                    type: i0.ViewChild,
                    args: ['adaptNavigation', { static: true }]
                }], userMessagesPopover: [{
                    type: i0.ViewChild,
                    args: ['userMessagesPopover', { static: true }]
                }] } });

    var RxShellModule = /** @class */ (function () {
        function RxShellModule() {
        }
        return RxShellModule;
    }());
    RxShellModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxShellModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModule, declarations: [RxShellComponent,
            RxInnovationStudioShellComponent,
            RxUserMessagesComponent,
            RxUserMessageModalComponent,
            DevelopmentModeSelectorComponent,
            FeedbackDialogComponent,
            GainsightOptInComponent], imports: [i2$2.BrowserModule,
            i4.CommonModule,
            i2.FormsModule,
            i2.ReactiveFormsModule,
            i1$4.RouterModule,
            i1$1.AdaptModalModule,
            i1$1.AdaptDockedPanelModule, i1__namespace$1.AdaptNavigationModule, i1$1.AdaptTooltipModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptCloseModule,
            i1$1.AdaptRxSearchModule, i1__namespace$1.AdaptAlertModule, i1$1.AdaptRxRadiobuttonModule,
            i4$1.TranslateModule,
            i1.RxBusyIndicatorModule,
            i3$3.AdaptRadarModule,
            i1$1.AdaptAgreementModule,
            i1.RxLineLoaderModule,
            i1$1.AdaptBusyModule], exports: [RxShellComponent, RxInnovationStudioShellComponent] });
    RxShellModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModule, providers: [RxUserMessageDataPageService, RxUserMessageService], imports: [[
                i2$2.BrowserModule,
                i4.CommonModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i1$4.RouterModule,
                i1$1.AdaptModalModule,
                i1$1.AdaptDockedPanelModule,
                i1$1.AdaptNavigationModule.forRoot(),
                i1$1.AdaptTooltipModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptCloseModule,
                i1$1.AdaptRxSearchModule,
                i1$1.AdaptAlertModule.forRoot(),
                i1$1.AdaptRxRadiobuttonModule,
                i4$1.TranslateModule,
                i1.RxBusyIndicatorModule,
                i3$3.AdaptRadarModule,
                i1$1.AdaptAgreementModule,
                i1.RxLineLoaderModule,
                i1$1.AdaptBusyModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxShellModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2$2.BrowserModule,
                            i4.CommonModule,
                            i2.FormsModule,
                            i2.ReactiveFormsModule,
                            i1$4.RouterModule,
                            i1$1.AdaptModalModule,
                            i1$1.AdaptDockedPanelModule,
                            i1$1.AdaptNavigationModule.forRoot(),
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptCloseModule,
                            i1$1.AdaptRxSearchModule,
                            i1$1.AdaptAlertModule.forRoot(),
                            i1$1.AdaptRxRadiobuttonModule,
                            i4$1.TranslateModule,
                            i1.RxBusyIndicatorModule,
                            i3$3.AdaptRadarModule,
                            i1$1.AdaptAgreementModule,
                            i1.RxLineLoaderModule,
                            i1$1.AdaptBusyModule
                        ],
                        entryComponents: [RxUserMessageModalComponent],
                        declarations: [
                            RxShellComponent,
                            RxInnovationStudioShellComponent,
                            RxUserMessagesComponent,
                            RxUserMessageModalComponent,
                            DevelopmentModeSelectorComponent,
                            FeedbackDialogComponent,
                            GainsightOptInComponent
                        ],
                        exports: [RxShellComponent, RxInnovationStudioShellComponent],
                        providers: [RxUserMessageDataPageService, RxUserMessageService]
                    }]
            }] });

    exports.RxApplicationContext = void 0;
    (function (RxApplicationContext) {
        RxApplicationContext["Runtime"] = "runtime";
        RxApplicationContext["Designtime"] = "designtime";
    })(exports.RxApplicationContext || (exports.RxApplicationContext = {}));

    var RxUserAvailabilityModule = /** @class */ (function () {
        function RxUserAvailabilityModule() {
        }
        return RxUserAvailabilityModule;
    }());
    RxUserAvailabilityModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserAvailabilityModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxUserAvailabilityModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserAvailabilityModule, declarations: [RxUserAvailabilityComponent], imports: [i4.CommonModule, i4$1.TranslateModule, i2.FormsModule, i1$1.AdaptRxCheckboxModule] });
    RxUserAvailabilityModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserAvailabilityModule, imports: [[i4.CommonModule, i4$1.TranslateModule, i2.FormsModule, i1$1.AdaptRxCheckboxModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserAvailabilityModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxUserAvailabilityComponent],
                        imports: [i4.CommonModule, i4$1.TranslateModule, i2.FormsModule, i1$1.AdaptRxCheckboxModule],
                        entryComponents: [RxUserAvailabilityComponent]
                    }]
            }] });

    var RxUserPreferencesModule = /** @class */ (function () {
        function RxUserPreferencesModule() {
        }
        return RxUserPreferencesModule;
    }());
    RxUserPreferencesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxUserPreferencesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesModule, declarations: [RxUserPreferencesComponent], imports: [i4.CommonModule, i2.FormsModule, i4$1.TranslateModule, i1.RxLineLoaderModule, i1$1.AdaptRxSelectModule] });
    RxUserPreferencesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesModule, imports: [[i4.CommonModule, i2.FormsModule, i4$1.TranslateModule, i1.RxLineLoaderModule, i1$1.AdaptRxSelectModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUserPreferencesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i2.FormsModule, i4$1.TranslateModule, i1.RxLineLoaderModule, i1$1.AdaptRxSelectModule],
                        declarations: [RxUserPreferencesComponent],
                        entryComponents: [RxUserPreferencesComponent]
                    }]
            }] });

    var RxWizardModalComponent = /** @class */ (function (_super) {
        __extends(RxWizardModalComponent, _super);
        function RxWizardModalComponent(activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.activeTabIndex = 0;
            _this.config = _this.activeModalRef.getData();
            _this.isWizardCompleted = false;
            _this.nextSubject = new rxjs.Subject();
            _this.next$ = _this.nextSubject.asObservable();
            _this.api = {
                isCurrentStepActive: function (stepId) {
                    return lodash.findIndex(_this.config.options.steps, { id: stepId }) === _this.activeTabIndex;
                },
                addStep: function (step, index) {
                    if (lodash.isNumber(index)) {
                        _this.config.options.steps.splice(index, 0, step);
                        if (index <= _this.activeTabIndex) {
                            setTimeout(function () { return _this.next(); });
                        }
                    }
                    else {
                        _this.config.options.steps.push(step);
                    }
                },
                complete: function () {
                    _this.isWizardDirty = false;
                    _this.isWizardCompleted = true;
                },
                disableNextButton: function () {
                    _this.config.options.isNextButtonDisabled = true;
                },
                enableNextButton: function () {
                    _this.config.options.isNextButtonDisabled = false;
                },
                disablePreviousButton: function () {
                    _this.config.options.isPreviousButtonDisabled = true;
                },
                enablePreviousButton: function () {
                    _this.config.options.isPreviousButtonDisabled = false;
                },
                disableFinishButton: function () {
                    _this.config.options.isFinishButtonDisabled = true;
                },
                enableFinishButton: function () {
                    _this.config.options.isFinishButtonDisabled = false;
                },
                getSteps: function () {
                    return lodash.cloneDeep(this.config.options.steps);
                },
                markPristine: function () {
                    _this.isWizardDirty = false;
                },
                markDirty: function () {
                    _this.isWizardDirty = true;
                },
                removeNextSteps: function (startIndex) {
                    _this.config.options.steps.splice(startIndex);
                },
                removeStep: function (index) {
                    _this.config.options.steps.splice(index, 1);
                },
                renew: function () {
                    _this.isWizardCompleted = false;
                },
                setFinishButtonLabel: function (label) {
                    _this.config.options.finishButtonLabel = label;
                },
                updateContext: function (context, markDirty) {
                    if (markDirty === void 0) { markDirty = true; }
                    Object.assign(_this.config.context, context);
                    _this.contextSubject$.next(_this.config.context);
                    if (markDirty) {
                        _this.api.markDirty();
                    }
                }
            };
            _this.contextSubject$ = new rxjs.BehaviorSubject(_this.config.context);
            _this.stepsSubject$ = new rxjs.BehaviorSubject(_this.config.options.steps);
            _this.tabIndexSubject$ = new rxjs.BehaviorSubject(_this.activeTabIndex);
            _this.isWizardDirty = false;
            _this.context$ = _this.contextSubject$.asObservable();
            _this.steps$ = _this.stepsSubject$.asObservable();
            _this.tabIndex$ = _this.tabIndexSubject$.asObservable();
            return _this;
        }
        RxWizardModalComponent.prototype.isDirty = function () {
            return this.isWizardDirty;
        };
        RxWizardModalComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.config.options.isPreviousButtonDisabled = true;
            this.config.options.isNextButtonDisabled = false;
            this.config.options.isFinishButtonDisabled = false;
            this.config.options.steps[this.activeTabIndex].isActivated = true;
        };
        RxWizardModalComponent.prototype.tabChanged = function (_a) {
            var index = _a.index;
            this.activeTabIndex = index;
            this.config.options.steps[this.activeTabIndex].isActivated = true;
            this.config.options.isPreviousButtonDisabled = index === 0;
            this.config.options.isNextButtonDisabled = index === this.config.options.steps.length - 1;
            this.tabIndexSubject$.next(this.activeTabIndex);
            this.stepsSubject$.next(this.config.options.steps);
        };
        RxWizardModalComponent.prototype.back = function () {
            this.adaptTabset.setActiveTab(this.activeTabIndex - 1, true, null);
        };
        RxWizardModalComponent.prototype.next = function (force) {
            if (force === void 0) { force = false; }
            if (!force) {
                this.nextSubject.next(this.config.options.steps[this.activeTabIndex].id);
            }
            if (force || this.config.options.steps[this.activeTabIndex].handlesNext !== true) {
                this.adaptTabset.setActiveTab(this.activeTabIndex + 1, true, null);
            }
        };
        RxWizardModalComponent.prototype.finish = function () {
            this.activeModalRef.close(this.config.context);
        };
        RxWizardModalComponent.prototype.close = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        RxWizardModalComponent.prototype.ngOnDestroy = function () {
            this.nextSubject.complete();
            this.contextSubject$.complete();
            this.stepsSubject$.complete();
            this.tabIndexSubject$.complete();
        };
        return RxWizardModalComponent;
    }(i1.RxModalClass));
    RxWizardModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxWizardModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWizardModalComponent, selector: "rx-wizard-modal", viewQueries: [{ propertyName: "adaptTabset", first: true, predicate: ["adaptTabset"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.options.title }}</h5>\n\n  <button\n    class=\"close dp-close\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    type=\"button\"\n    (click)=\"close()\"\n  ></button>\n</div>\n\n<div class=\"alert alert-info mb-0\" role=\"alert\" *ngIf=\"config.options.notificationMessage\">\n  <div class=\"alert-content\">\n    {{ config.options.notificationMessage }}\n  </div>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-tabset\n    #adaptTabset\n    [type]=\"'stacked'\"\n    [tab-active]=\"activeTabIndex\"\n    (tab-active-changed)=\"tabChanged($event)\"\n    class=\"h-100\"\n    customClassTabList=\"stacked-tab-list\"\n  >\n    <adapt-tab-panel *ngFor=\"let step of config.options.steps\" [adapt-tab-title]=\"step.name\" [disabled]=\"true\">\n      <rx-dynamic-component-renderer\n        *ngIf=\"step.isActivated\"\n        [componentFactory]=\"step.componentFactory\"\n        [context]=\"config.context\"\n        [options]=\"step.options\"\n      ></rx-dynamic-component-renderer>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    *ngIf=\"!isWizardCompleted\"\n    (click)=\"close()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    class=\"mr-2 d-icon-left-angle_left\"\n    [disabled]=\"config.options.isPreviousButtonDisabled\"\n    (click)=\"back()\"\n    rx-id=\"previous-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    class=\"mr-2 d-icon-right-angle_right\"\n    *ngIf=\"activeTabIndex < config.options.steps.length - 1\"\n    [disabled]=\"config.options.isNextButtonDisabled\"\n    (click)=\"next()\"\n    rx-id=\"next-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    *ngIf=\"(config.options.allowFinish && activeTabIndex === config.options.steps.length - 1) || isWizardCompleted\"\n    [disabled]=\"config.options.isFinishButtonDisabled\"\n    (click)=\"finish()\"\n    rx-id=\"finish-button\"\n  >\n    {{ config.options.finishButtonLabel }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}:host .modal-body{height:645px;overflow-y:auto}:host adapt-tabset::ng-deep .stacked{flex:0 0 100%}:host adapt-tabset::ng-deep .stacked .tab-toolbar{flex-shrink:0}:host adapt-tabset::ng-deep .stacked .stacked-tab-list .nav-link-title{max-width:160px;text-align:left;white-space:normal}\n"], components: [{ type: i1__namespace$1.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1__namespace$1.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: RxDynamicComponentRendererComponent, selector: "rx-dynamic-component-renderer", inputs: ["componentFactory", "context", "options"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-wizard-modal',
                        templateUrl: './wizard-modal.component.html',
                        styleUrls: ['./wizard-modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i0__namespace.Injector }]; }, propDecorators: { adaptTabset: [{
                    type: i0.ViewChild,
                    args: ['adaptTabset', { static: true }]
                }] } });

    var RxWizardService = /** @class */ (function () {
        function RxWizardService(rxModalService) {
            this.rxModalService = rxModalService;
        }
        RxWizardService.prototype.open = function (config) {
            return this.rxModalService
                .openModal({
                content: RxWizardModalComponent,
                data: Object.assign({}, config)
            })
                .catch(lodash.noop);
        };
        return RxWizardService;
    }());
    RxWizardService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardService, deps: [{ token: i1__namespace.RxModalService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxWizardService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }]; } });

    var RxWizardModule = /** @class */ (function () {
        function RxWizardModule() {
        }
        return RxWizardModule;
    }());
    RxWizardModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxWizardModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardModule, declarations: [RxWizardModalComponent], imports: [i4.CommonModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptModalModule,
            i1$1.AdaptAlertModule,
            i1$1.AdaptTabsModule,
            i4$1.TranslateModule,
            RxDynamicComponentRendererModule], exports: [RxWizardModalComponent] });
    RxWizardModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardModule, providers: [RxWizardService], imports: [[
                i4.CommonModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptModalModule,
                i1$1.AdaptAlertModule,
                i1$1.AdaptTabsModule,
                i4$1.TranslateModule,
                RxDynamicComponentRendererModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxWizardModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptModalModule,
                            i1$1.AdaptAlertModule,
                            i1$1.AdaptTabsModule,
                            i4$1.TranslateModule,
                            RxDynamicComponentRendererModule
                        ],
                        declarations: [RxWizardModalComponent],
                        entryComponents: [RxWizardModalComponent],
                        exports: [RxWizardModalComponent],
                        providers: [RxWizardService]
                    }]
            }] });

    var SelectionFieldOptionsEditorComponent = /** @class */ (function (_super) {
        __extends(SelectionFieldOptionsEditorComponent, _super);
        function SelectionFieldOptionsEditorComponent(activeModalRef, injector, rxGuidService, translateService) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.rxGuidService = rxGuidService;
            _this.translateService = translateService;
            _this.isReadOnly = _this.activeModalRef.getData().isReadOnly;
            _this.selectionOptions = lodash.map(_this.activeModalRef.getData().existingOptions, function (option) { return ({
                name: option.name,
                id: option.id,
                stringKey: option.stringKey,
                isOpen: false
            }); });
            _this.duplicateOptionNameMsg = _this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.duplicate-option-name.error');
            _this.duplicateOptionIdMsg = _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
            return _this;
        }
        SelectionFieldOptionsEditorComponent.prototype.isDirty = function () {
            var _a;
            return (_a = this.optionSelectionForm) === null || _a === void 0 ? void 0 : _a.dirty;
        };
        SelectionFieldOptionsEditorComponent.prototype.saveOptions = function () {
            var optionNamesById = {};
            var optionKeysById = {};
            lodash.forEach(this.selectionOptions, function (option) {
                optionNamesById[option.id] = option.name;
            });
            lodash.forEach(this.selectionOptions, function (option) {
                optionKeysById[option.id] = option.stringKey;
            });
            this.activeModalRef.close({
                optionNamesById: optionNamesById,
                optionLabelsById: optionKeysById
            });
        };
        SelectionFieldOptionsEditorComponent.prototype.addOption = function () {
            var name;
            var counter = 0;
            var existingOption;
            var newOptionLabel = this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.new-option.label');
            do {
                name = counter === 0 ? newOptionLabel : newOptionLabel + " " + counter;
                counter++;
                existingOption = lodash.find(this.selectionOptions, { name: name });
            } while (existingOption);
            this.selectionOptions.push({
                name: name,
                id: this.selectionOptions.length
                    ? lodash.max(this.selectionOptions.map(function (option) { return option.id; })) + 10
                    : 0,
                stringKey: this.rxGuidService.generate(),
                isOpen: true
            });
            this.optionSelectionForm.form.markAsDirty();
        };
        SelectionFieldOptionsEditorComponent.prototype.removeOption = function (index) {
            this.selectionOptions.splice(index, 1);
            this.optionSelectionForm.form.markAsDirty();
            this.validateIdAndNames('name');
            this.validateIdAndNames('id');
        };
        SelectionFieldOptionsEditorComponent.prototype.expandAll = function () {
            this.selectionOptions.forEach(function (option) { return (option.isOpen = true); });
        };
        SelectionFieldOptionsEditorComponent.prototype.collapseAll = function () {
            this.selectionOptions.forEach(function (option) { return (option.isOpen = false); });
        };
        SelectionFieldOptionsEditorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        SelectionFieldOptionsEditorComponent.prototype.getDuplicateOptions = function (type) {
            var _this = this;
            return lodash.filter(this.selectionOptions, function (option) { return lodash.filter(_this.selectionOptions, function (item) { return type === 'name' ? lodash.lowerCase(item.name) === lodash.trim(lodash.lowerCase(option.name)) : item.id === option.id; }).length > 1; });
        };
        SelectionFieldOptionsEditorComponent.prototype.validateIdAndNames = function (type) {
            var _this = this;
            if (this.optionSelectionForm.invalid) {
                return;
            }
            if (type === 'name') {
                lodash.forEach(this.selectionOptions, function (option) {
                    option.invalidNameError = null;
                });
                this.getDuplicateOptions(type).forEach(function (option) {
                    option.invalidNameError = _this.duplicateOptionNameMsg;
                });
            }
            if (type === 'id') {
                lodash.forEach(this.selectionOptions, function (option) {
                    option.invalidIdError = null;
                });
                this.getDuplicateOptions(type).forEach(function (option) {
                    option.invalidIdError = _this.duplicateOptionIdMsg;
                });
            }
        };
        SelectionFieldOptionsEditorComponent.prototype.isSaveButtonDisabled = function () {
            var _a, _b;
            return (!((_a = this.optionSelectionForm) === null || _a === void 0 ? void 0 : _a.dirty) ||
                ((_b = this.optionSelectionForm) === null || _b === void 0 ? void 0 : _b.invalid) ||
                lodash.some(this.selectionOptions, function (option) { return option.invalidNameError || option.invalidIdError; }));
        };
        SelectionFieldOptionsEditorComponent.prototype.trackByIndex = function (index) {
            return index;
        };
        return SelectionFieldOptionsEditorComponent;
    }(i1.RxModalClass));
    SelectionFieldOptionsEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldOptionsEditorComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i0__namespace.Injector }, { token: i1__namespace$3.RxGuidService }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SelectionFieldOptionsEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldOptionsEditorComponent, selector: "rx-selection-field-options-editor", viewQueries: [{ propertyName: "optionSelectionForm", first: true, predicate: ["optionSelectionForm"], descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n  <div class=\"text-right btn-group\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"add-option-button\"\n      class=\"d-icon-left-plus_circle float-left px-0\"\n      (click)=\"addOption()\"\n      *ngIf=\"!isReadOnly\"\n    >\n      {{ 'com.bmc.arsys.rx.client.selection-field-options-editor.add-option.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"tertiary\" rx-id=\"expand-button\" (click)=\"expandAll()\" class=\"ml-auto\">\n      {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"tertiary\" rx-id=\"collapse-button\" class=\"pr-0\" (click)=\"collapseAll()\">\n      {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n    </button>\n  </div>\n\n  <div class=\"designer-modal-accordion-wrapper\">\n    <form #optionSelectionForm=\"ngForm\">\n      <adapt-accordion [multiselect]=\"true\" class=\"d-block\">\n        <div\n          *ngFor=\"let option of selectionOptions; let $index = index; trackBy: trackByIndex\"\n          class=\"designer-modal-accordion-content\"\n        >\n          <adapt-accordion-tab\n            class=\"d-block\"\n            [isOpen]=\"option.isOpen\"\n            (open)=\"option.isOpen = true\"\n            (close)=\"option.isOpen = false\"\n          >\n            <div class=\"card-title-text w-100\">\n              <div class=\"designer-modal-card-title-content\">\n                <div class=\"left-header-block pl-0\">\n                  <div class=\"rx-ellipsis\" [title]=\"option.name\" rx-id=\"card-title\">\n                    {{ option.name }}\n                  </div>\n                </div>\n\n                <div class=\"right-header-block\">\n                  <button\n                    class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n                    adapt-button\n                    size=\"small\"\n                    type=\"button\"\n                    (click)=\"$event.stopPropagation(); removeOption($index)\"\n                    *ngIf=\"!isReadOnly\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"d-flex\">\n              <div class=\"w-50 pr-2\">\n                <adapt-rx-textfield\n                  maxlength=\"254\"\n                  rx-id=\"option-name\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"option.name\"\n                  [autofocus]=\"true\"\n                  name=\"{{ 'name' + $index }}\"\n                  (ngModelChange)=\"validateIdAndNames('name')\"\n                  [disabled]=\"isReadOnly\"\n                >\n                </adapt-rx-textfield>\n\n                <adapt-alert\n                  *ngIf=\"option.invalidNameError\"\n                  [config]=\"{\n                    variant: 'danger',\n                    dismissible: false,\n                    type: 'inline',\n                    content: option.invalidNameError\n                  }\"\n                ></adapt-alert>\n              </div>\n\n              <div class=\"w-50 pl-2\">\n                <adapt-rx-counter\n                  rx-id=\"option-name\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.selection-field-options-editor.integer-value.label' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"option.id\"\n                  name=\"{{ 'integerValue' + $index }}\"\n                  (ngModelChange)=\"validateIdAndNames('id')\"\n                  [min]=\"0\"\n                  [max]=\"2147483647\"\n                  [adaptMax]=\"2147483647\"\n                  [adaptMin]=\"0\"\n                  [step]=\"1\"\n                  adaptIntegerNumber\n                  [disabled]=\"isReadOnly\"\n                >\n                </adapt-rx-counter>\n\n                <adapt-alert\n                  *ngIf=\"option.invalidIdError\"\n                  [config]=\"{\n                    variant: 'danger',\n                    dismissible: false,\n                    type: 'inline',\n                    content: option.invalidIdError\n                  }\"\n                ></adapt-alert>\n              </div>\n            </div>\n          </adapt-accordion-tab>\n        </div>\n      </adapt-accordion>\n    </form>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <div *ngIf=\"!isReadOnly\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      rx-id=\"save-button\"\n      (click)=\"saveOptions()\"\n      [disabled]=\"isSaveButtonDisabled()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n\n  <div *ngIf=\"isReadOnly\">\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace$1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1__namespace$1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i1__namespace$1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i1__namespace$1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldOptionsEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-selection-field-options-editor',
                        templateUrl: './selection-field-options-editor.component.html',
                        styleUrls: ['./selection-field-options-editor.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i0__namespace.Injector }, { type: i1__namespace$3.RxGuidService }, { type: i4__namespace$1.TranslateService }]; }, propDecorators: { optionSelectionForm: [{
                    type: i0.ViewChild,
                    args: ['optionSelectionForm']
                }] } });

    var SelectionFieldOptionsComponent = /** @class */ (function (_super) {
        __extends(SelectionFieldOptionsComponent, _super);
        function SelectionFieldOptionsComponent(rxModalService, translateService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            _this.currentOptions = [];
            _this.defaultOption = [];
            return _this;
        }
        SelectionFieldOptionsComponent.prototype.onWriteValue = function (currentOptionProperties) {
            var currentOptionsById = (currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.optionNamesById) || this.options.optionNamesById;
            var currentLabelsById = (currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.optionLabelsById) || this.options.optionLabelsById;
            this.currentOptions = lodash.map(currentOptionsById, function (name, id) { return ({
                name: name,
                id: Number(id),
                stringKey: currentLabelsById[id]
            }); });
            this.defaultOption = !lodash.isNil(currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.defaultValue)
                ? [lodash.find(this.currentOptions, { id: Number(currentOptionProperties.defaultValue) })]
                : [];
        };
        SelectionFieldOptionsComponent.prototype.openOptionsEditor = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.title'),
                content: SelectionFieldOptionsEditorComponent,
                data: {
                    existingOptions: this.currentOptions,
                    isReadOnly: this.options.isReadOnly
                }
            })
                .then(function (response) {
                var _a;
                _this.value = {
                    defaultValue: (_a = _this.value) === null || _a === void 0 ? void 0 : _a.defaultValue,
                    optionNamesById: response.optionNamesById,
                    optionLabelsById: response.optionLabelsById
                };
                setTimeout(function () {
                    _this.validateDefaultValue();
                });
            })
                .catch(lodash.noop);
        };
        SelectionFieldOptionsComponent.prototype.fetchValue = function (options) {
            var _a;
            var optionNamesById = {};
            var optionKeysById = {};
            lodash.forEach(options, function (option) {
                optionNamesById[option.id] = option.name;
            });
            lodash.forEach(options, function (option) {
                optionKeysById[option.id] = option.stringKey;
            });
            return { defaultValue: (_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue, optionNamesById: optionNamesById, optionLabelsById: optionKeysById };
        };
        SelectionFieldOptionsComponent.prototype.validateDefaultValue = function () {
            var _a;
            if (!lodash.isNil((_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue) && !lodash.find(this.currentOptions, { id: this.value.defaultValue })) {
                this.defaultOption = [];
                this.value = Object.assign(Object.assign({}, this.value), { defaultValue: null });
            }
        };
        SelectionFieldOptionsComponent.prototype.onSelectionChange = function (event) {
            var _a, _b;
            this.value = Object.assign(Object.assign({}, this.value), { defaultValue: (_b = (_a = event.options[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null });
        };
        SelectionFieldOptionsComponent.prototype.focus = function () {
            this.adaptButtonComponent.elem.nativeElement.focus();
            this.openOptionsEditor();
        };
        SelectionFieldOptionsComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        SelectionFieldOptionsComponent.prototype.removeOption = function (option) {
            lodash.pullAllBy(this.currentOptions, [option], 'id');
            this.validateDefaultValue();
            this.value = this.fetchValue(this.currentOptions);
        };
        return SelectionFieldOptionsComponent;
    }(ValueAccessor));
    SelectionFieldOptionsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldOptionsComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SelectionFieldOptionsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldOptionsComponent, selector: "rx-selection-field-options", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: SelectionFieldOptionsComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "adaptButtonComponent", first: true, predicate: i1$1.AdaptButtonComponent, descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"d-flex\">\n  <adapt-rx-control-label\n    label=\"{{ 'com.bmc.arsys.rx.client.common.options.label' | translate }}\"\n    [showRequiredLabel]=\"true\"\n  >\n  </adapt-rx-control-label>\n\n  <adapt-button btn-type=\"tertiary\" class=\"d-icon-left-pencil p-0 ml-auto\" (click)=\"openOptionsEditor()\"\n    >{{ 'com.bmc.arsys.rx.client.common.edit.label' | translate }}\n  </adapt-button>\n</div>\n\n<div class=\"form-group tags-wrapper\">\n  <adapt-tag\n    [removable]=\"true\"\n    (remove)=\"removeOption(option)\"\n    *ngFor=\"let option of currentOptions\"\n    [type]=\"'active'\"\n    [disabled]=\"options.isReadOnly\"\n  >\n    {{ option.name }}</adapt-tag\n  >\n\n  <div class=\"fade-line position-absolute w-100 text-center\">\n    <span class=\"d-icon-ellipsis_horizontal\"></span>\n  </div>\n</div>\n\n<adapt-rx-select\n  label=\"{{ 'com.bmc.arsys.rx.client.common.default-value.label' | translate }}\"\n  [options]=\"currentOptions\"\n  (onSelectionChange)=\"onSelectionChange($event)\"\n  [(ngModel)]=\"defaultOption\"\n  [optionFormatter]=\"optionFormatter\"\n  [emptyOption]=\"true\"\n  *ngIf=\"!options.hideDefaultValue\"\n  [disabled]=\"options.isReadOnly\"\n>\n</adapt-rx-select>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.tags-wrapper{max-height:140px;position:relative;overflow:hidden}.tags-wrapper .fade-line{top:115px;left:0;height:2rem;z-index:1;background-image:linear-gradient(0deg,white 50%,rgba(255,255,255,0));transition:opacity .25s var(--ease-transition-in-out)}.tags-wrapper .fade-line .d-icon-ellipsis_horizontal:before{position:absolute;bottom:1px}\n"], components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldOptionsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-selection-field-options',
                        templateUrl: './selection-field-options.component.html',
                        styleUrls: ['./selection-field-options.component.scss'],
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: SelectionFieldOptionsComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i4__namespace$1.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], adaptButtonComponent: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptButtonComponent]
                }] } });

    var RxSelectionFieldOptionsModule = /** @class */ (function () {
        function RxSelectionFieldOptionsModule() {
        }
        return RxSelectionFieldOptionsModule;
    }());
    RxSelectionFieldOptionsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldOptionsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxSelectionFieldOptionsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldOptionsModule, declarations: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent], imports: [i1$1.AdaptAccordionModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptRxCounterModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptRxSelectModule,
            i1$1.AdaptRxTextfieldModule,
            i1$1.AdaptTagModule,
            i4.CommonModule,
            i2.FormsModule,
            i4$1.TranslateModule,
            i1$1.AdaptAlertModule,
            i1$1.AdaptRxValidatorsModule], exports: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent] });
    RxSelectionFieldOptionsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldOptionsModule, imports: [[
                i1$1.AdaptAccordionModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptRxCounterModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptRxSelectModule,
                i1$1.AdaptRxTextfieldModule,
                i1$1.AdaptTagModule,
                i4.CommonModule,
                i2.FormsModule,
                i4$1.TranslateModule,
                i1$1.AdaptAlertModule,
                i1$1.AdaptRxValidatorsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldOptionsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1$1.AdaptAccordionModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptRxCounterModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptRxSelectModule,
                            i1$1.AdaptRxTextfieldModule,
                            i1$1.AdaptTagModule,
                            i4.CommonModule,
                            i2.FormsModule,
                            i4$1.TranslateModule,
                            i1$1.AdaptAlertModule,
                            i1$1.AdaptRxValidatorsModule
                        ],
                        declarations: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent],
                        exports: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent],
                        entryComponents: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent]
                    }]
            }] });

    var RxUnknownApplicationComponent = /** @class */ (function () {
        function RxUnknownApplicationComponent(rxGlobalCacheService, rxCurrentUserService, rxAngularApplicationService, title) {
            var _this = this;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxAngularApplicationService = rxAngularApplicationService;
            this.title = title;
            this.applications$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(operators.switchMap(function (bundleDescriptors) {
                var applicationBundleDescriptors = lodash.filter(bundleDescriptors, { isApplication: true, isLicensed: true });
                lodash.remove(applicationBundleDescriptors, { id: i1$2.RX_APPLICATION.settingsBundleId });
                if (!_this.rxCurrentUserService.isAdministrator()) {
                    lodash.remove(applicationBundleDescriptors, { id: i1$2.RX_APPLICATION.dataloadBundleId });
                }
                if (!_this.rxCurrentUserService.isAdministrator() && !_this.rxCurrentUserService.isBusinessAnalyst()) {
                    lodash.remove(applicationBundleDescriptors, { id: i1$2.RX_APPLICATION.innovationStudioBundleId });
                }
                var applications = lodash.sortBy(applicationBundleDescriptors, function (bundleDescriptor) { return bundleDescriptor.friendlyName; }).map(function (app) { return _this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(operators.map(function (isAngularJsApplication) {
                    var url;
                    if (app.hasCustomEntryPoint && app.id !== i1$2.RX_APPLICATION.innovationStudioBundleId) {
                        url = "/" + app.id + "/index.html";
                    }
                    else if (isAngularJsApplication) {
                        url = "/innovationsuite/index.html#/" + app.id;
                    }
                    else {
                        url = "/helix/index.html#/" + app.id;
                    }
                    return {
                        id: app.id,
                        friendlyName: app.friendlyName,
                        url: url
                    };
                })); });
                return rxjs.forkJoin(applications);
            }), operators.tap(function () {
                _this.title.setTitle('Helix');
                _this.rxGlobalCacheService.applicationId = 'unknown-application';
            }));
        }
        return RxUnknownApplicationComponent;
    }());
    RxUnknownApplicationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownApplicationComponent, deps: [{ token: i1__namespace$2.RxGlobalCacheService }, { token: i1__namespace$2.RxCurrentUserService }, { token: i1__namespace$2.RxAngularApplicationService }, { token: i2__namespace$2.Title }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxUnknownApplicationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUnknownApplicationComponent, selector: "rx-unknown-application", ngImport: i0__namespace, template: "<h3>\n  The page you are trying to reach does not exist. Please open one of the applications below and bookmark it for future\n  reference.\n</h3>\n<ul>\n  <li *ngFor=\"let app of applications$ | async\">\n    <a [href]=\"app.url\">{{ app.friendlyName }}</a>\n  </li>\n</ul>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{color:#7c7f81;padding:20px}:host h3{padding-left:20px}\n"], directives: [{ type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownApplicationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-unknown-application',
                        templateUrl: './unknown-application.component.html',
                        styleUrls: ['./unknown-application.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxGlobalCacheService }, { type: i1__namespace$2.RxCurrentUserService }, { type: i1__namespace$2.RxAngularApplicationService }, { type: i2__namespace$2.Title }]; } });

    var RxUnknownApplicationModule = /** @class */ (function () {
        function RxUnknownApplicationModule() {
        }
        return RxUnknownApplicationModule;
    }());
    RxUnknownApplicationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownApplicationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxUnknownApplicationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownApplicationModule, declarations: [RxUnknownApplicationComponent], imports: [i4.CommonModule], exports: [RxUnknownApplicationComponent] });
    RxUnknownApplicationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownApplicationModule, imports: [[i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownApplicationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxUnknownApplicationComponent],
                        imports: [i4.CommonModule],
                        exports: [RxUnknownApplicationComponent]
                    }]
            }] });

    var LocalizedCharacterFieldValueModalComponent = /** @class */ (function (_super) {
        __extends(LocalizedCharacterFieldValueModalComponent, _super);
        function LocalizedCharacterFieldValueModalComponent(activeModalRef, rxLocaleService, rxLocalizationService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.rxLocaleService = rxLocaleService;
            _this.rxLocalizationService = rxLocalizationService;
            _this.injector = injector;
            _this.isCurrentLocaleSupported = true;
            _this.data = _this.activeModalRef.getData();
            _this.isReadOnly = _this.data.isReadOnly;
            return _this;
        }
        LocalizedCharacterFieldValueModalComponent.prototype.isDirty = function () {
            return this.localeForm.dirty;
        };
        LocalizedCharacterFieldValueModalComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.init();
        };
        LocalizedCharacterFieldValueModalComponent.prototype.init = function () {
            var _this = this;
            this.currentLocaleCode = this.rxLocalizationService.currentLocale;
            this.valueByLocale = this.data.valueByLocale || {};
            this.fieldDefinition = this.data.fieldDefinition || {};
            this.maxLength = this.fieldDefinition.maxLength || null;
            this.getLocalesSubscription = this.rxLocaleService.getLocales().subscribe(function (_a) {
                var data = _a.data;
                var browserLocale = {
                    name: 'Browser - Locale',
                    code: _this.currentLocaleCode,
                    value: _this.valueByLocale[_this.currentLocaleCode]
                };
                _this.locales = data.map(function (locale) {
                    var localeCode = locale[i3.RX_RECORD_DEFINITION.supportedSystemLocales.codeFieldId];
                    return {
                        name: locale[i3.RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId],
                        code: localeCode,
                        value: _this.valueByLocale[localeCode] || null
                    };
                });
                _this.defaultLocale = {
                    name: 'English - United States',
                    code: 'en-US',
                    value: _this.valueByLocale['en-US']
                };
                _this.currentLocale = _this.locales.find(function (locale) {
                    return locale.code.toLowerCase() === _this.currentLocaleCode.toLowerCase();
                });
                if (!_this.currentLocale || _this.currentLocale.code === _this.defaultLocale.code) {
                    _this.currentLocale = browserLocale;
                    _this.isCurrentLocaleSupported = false;
                }
                _this.gridLocales = lodash.flow(function (locales) { return lodash.reject(locales, { code: _this.defaultLocale.code }); }, function (locales) { return lodash.reject(locales, function (locale) {
                    return !_this.data.hideCurrentLocale && locale.code === _this.currentLocale.code;
                }); })(_this.locales);
            });
        };
        LocalizedCharacterFieldValueModalComponent.prototype.ok = function () {
            if (this.isCurrentLocaleSupported) {
                this.valueByLocale[this.currentLocale.code] = this.currentLocale.value;
            }
            this.activeModalRef.close({
                currentLocaleValue: (this.currentLocale.code === this.defaultLocale.code && this.valueByLocale[this.defaultLocale.code]) ||
                    this.valueByLocale[this.currentLocale.code] ||
                    this.valueByLocale[this.currentLocale.code.split('-')[0]] ||
                    this.valueByLocale[this.defaultLocale.code],
                valueByLocale: lodash.mapValues(this.valueByLocale, function (value) { return value || null; })
            });
        };
        LocalizedCharacterFieldValueModalComponent.prototype.close = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        return LocalizedCharacterFieldValueModalComponent;
    }(i1.RxModalClass));
    LocalizedCharacterFieldValueModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LocalizedCharacterFieldValueModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i3__namespace.RxLocaleService }, { token: i1__namespace$2.RxLocalizationService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    LocalizedCharacterFieldValueModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldValueModalComponent, selector: "rx-localized-character-field-value-modal", viewQueries: [{ propertyName: "localeForm", first: true, predicate: ["localeForm"], descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <form name=\"localeForm\" novalidate #localeForm=\"ngForm\">\n    <rx-busy-indicator [options]=\"{ busy: getLocalesSubscription }\"></rx-busy-indicator>\n\n    <div class=\"flex-container row\" *ngIf=\"!data.hideCurrentLocale && currentLocale\">\n      <div class=\"col-4\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.current-locale.label' | translate\n          }}\"\n        >\n        </adapt-rx-control-label>\n        <div class=\"rx-locale-name\" rx-id=\"current-locale-name\">{{ currentLocale?.name }}</div>\n      </div>\n\n      <div class=\"col-2\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate\n          }}\"\n        >\n        </adapt-rx-control-label>\n        <div class=\"rx-locale-name\" rx-id=\"current-locale-code\">{{ currentLocale?.code }}</div>\n      </div>\n\n      <div class=\"col-6\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value.label' | translate\n          }}\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content:\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-current-locale.tooltip'\n              | translate,\n            placement: 'auto',\n            popoverMode: true\n          }\"\n        >\n        </adapt-rx-control-label>\n\n        <adapt-rx-textfield\n          name=\"current-locale\"\n          rx-id=\"current-locale-value\"\n          [disabled]=\"!isCurrentLocaleSupported || isReadOnly\"\n          [maxlength]=\"maxLength\"\n          [(ngModel)]=\"currentLocale.value\"\n          [ariaLabel]=\"\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-current-locale.label'\n              | translate\n          \"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.default-locale.label'\n                | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n          <div class=\"rx-locale-name\" rx-id=\"default-locale-name\">{{ defaultLocale?.name }}</div>\n        </div>\n\n        <div class=\"col-2\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n\n          <div class=\"rx-locale-name\" rx-id=\"default-locale-code\">{{ defaultLocale?.code }}</div>\n        </div>\n\n        <div class=\"col-6\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value.label' | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n\n          <adapt-rx-textfield\n            name=\"default-locale\"\n            rx-id=\"default-locale-value\"\n            [maxlength]=\"maxLength\"\n            [(ngModel)]=\"valueByLocale[defaultLocale?.code]\"\n            [disabled]=\"isReadOnly\"\n            [ariaLabel]=\"\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-default-locale.label'\n                | translate\n            \"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"rx-locale-table container\" *ngIf=\"gridLocales?.length > 0\">\n      <div class=\"rx-locale-table-row row\">\n        <div class=\"rx-locale-table-cell pl-0 col-4\">\n          <h6>\n            {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.locale.label' | translate }}*\n          </h6>\n        </div>\n\n        <div class=\"rx-locale-table-cell pl-2 col-2\">\n          <h6>\n            {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate }}\n          </h6>\n        </div>\n\n        <div class=\"rx-locale-table-cell col-6\">\n          <h6>\n            {{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.localized-value.label'\n                | translate\n            }}\n          </h6>\n        </div>\n      </div>\n\n      <div class=\"rx-locale-table-row row\" *ngFor=\"let locale of gridLocales\">\n        <div class=\"rx-locale-table-cell pl-0 col-4\">{{ locale.name }}</div>\n        <div class=\"rx-locale-table-cell pl-2 col-2\">{{ locale.code }}</div>\n        <div class=\"rx-locale-table-cell pr-0 col-6\">\n          <adapt-rx-textfield\n            name=\"localized-value {{ locale.code }}\"\n            [maxlength]=\"maxLength\"\n            [(ngModel)]=\"valueByLocale[locale.code]\"\n            [disabled]=\"isReadOnly\"\n            [ariaLabel]=\"\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.localized-value-for.label'\n                | translate: { locale: locale.name }\n            \"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"localeForm.pristine || localeForm.invalid\"\n    (click)=\"ok()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"close()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.flex-container{margin-bottom:15px}.flex-container .rx-locale-name{line-height:3}.flex-container .d-textfield__item{color:#959899;display:block;padding-bottom:10px;font-size:14px;line-height:1}.rx-locale-table{border:1px solid #d6d7d8;border-bottom:0;width:100%}.rx-locale-table .rx-locale-table-row{border-bottom:1px solid #d6d7d8;padding:5px;min-height:35px}.rx-locale-table .rx-locale-table-row .rx-locale-table-cell{line-height:3}.rx-locale-table .rx-locale-table-row .rx-locale-table-cell h6{margin:0;line-height:2rem;color:#959899}:host::ng-deep .form-group{margin-bottom:0}\n"], components: [{ type: i1__namespace.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LocalizedCharacterFieldValueModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-localized-character-field-value-modal',
                        templateUrl: './localized-character-field-value-modal.component.html',
                        styleUrls: ['./localized-character-field-value-modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i3__namespace.RxLocaleService }, { type: i1__namespace$2.RxLocalizationService }, { type: i0__namespace.Injector }]; }, propDecorators: { localeForm: [{
                    type: i0.ViewChild,
                    args: ['localeForm']
                }] } });

    var RxLocalizedCharacterFieldValueModalModule = /** @class */ (function () {
        function RxLocalizedCharacterFieldValueModalModule() {
        }
        return RxLocalizedCharacterFieldValueModalModule;
    }());
    RxLocalizedCharacterFieldValueModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldValueModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxLocalizedCharacterFieldValueModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldValueModalModule, declarations: [LocalizedCharacterFieldValueModalComponent], imports: [i2.FormsModule,
            i4.CommonModule,
            i2.ReactiveFormsModule,
            i1$1.AdaptRxFormControlModule,
            i1$1.AdaptRxTextfieldModule,
            i1$1.AdaptButtonModule,
            i1.RxBusyIndicatorModule,
            i4$1.TranslateModule], exports: [LocalizedCharacterFieldValueModalComponent] });
    RxLocalizedCharacterFieldValueModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldValueModalModule, imports: [[
                i2.FormsModule,
                i4.CommonModule,
                i2.ReactiveFormsModule,
                i1$1.AdaptRxFormControlModule,
                i1$1.AdaptRxTextfieldModule,
                i1$1.AdaptButtonModule,
                i1.RxBusyIndicatorModule,
                i4$1.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldValueModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.FormsModule,
                            i4.CommonModule,
                            i2.ReactiveFormsModule,
                            i1$1.AdaptRxFormControlModule,
                            i1$1.AdaptRxTextfieldModule,
                            i1$1.AdaptButtonModule,
                            i1.RxBusyIndicatorModule,
                            i4$1.TranslateModule
                        ],
                        declarations: [LocalizedCharacterFieldValueModalComponent],
                        exports: [LocalizedCharacterFieldValueModalComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AdminSettingsComponent = AdminSettingsComponent;
    exports.AdminSettingsModule = AdminSettingsModule;
    exports.AssignmentExpressionListFormControlComponent = AssignmentExpressionListFormControlComponent;
    exports.AssignmentExpressionListFormControlModule = AssignmentExpressionListFormControlModule;
    exports.AttachmentFormControlComponent = AttachmentFormControlComponent;
    exports.AttachmentFormControlModule = AttachmentFormControlModule;
    exports.BooleanFormControlComponent = BooleanFormControlComponent;
    exports.BooleanFormControlModule = BooleanFormControlModule;
    exports.ColorPickerFormControlComponent = ColorPickerFormControlComponent;
    exports.ColorPickerFormControlModule = ColorPickerFormControlModule;
    exports.CounterFormControlComponent = CounterFormControlComponent;
    exports.CounterFormControlModule = CounterFormControlModule;
    exports.CustomizationOptionsComponent = CustomizationOptionsComponent;
    exports.CustomizationOptionsModule = CustomizationOptionsModule;
    exports.DateFormControlComponent = DateFormControlComponent;
    exports.DateFormControlModule = DateFormControlModule;
    exports.DateTimeFormControlComponent = DateTimeFormControlComponent;
    exports.DateTimeFormControlModule = DateTimeFormControlModule;
    exports.DefinitionPickerOrExpressionFormControlComponent = DefinitionPickerOrExpressionFormControlComponent;
    exports.DefinitionPickerOrExpressionFormControlModule = DefinitionPickerOrExpressionFormControlModule;
    exports.ExpressionEditorComponent = ExpressionEditorComponent;
    exports.ExpressionEditorModule = ExpressionEditorModule;
    exports.ExpressionFormControlComponent = ExpressionFormControlComponent;
    exports.ExpressionFormControlModule = ExpressionFormControlModule;
    exports.ExpressionInspectorControlComponent = ExpressionInspectorControlComponent;
    exports.ExpressionInspectorControlModule = ExpressionInspectorControlModule;
    exports.FormBuilderComponent = FormBuilderComponent;
    exports.FormControlsModule = FormControlsModule;
    exports.GroupButtonFormControlComponent = GroupButtonFormControlComponent;
    exports.GroupButtonFormControlModule = GroupButtonFormControlModule;
    exports.IconBrowserDialogComponent = IconBrowserDialogComponent;
    exports.IconBrowserDialogModule = IconBrowserDialogModule;
    exports.IconPickerFormControlComponent = IconPickerFormControlComponent;
    exports.IconPickerFormControlModule = IconPickerFormControlModule;
    exports.InputListFormControlComponent = InputListFormControlComponent;
    exports.InputListFormControlModule = InputListFormControlModule;
    exports.InspectorControlBase = InspectorControlBase;
    exports.InspectorDirective = InspectorDirective;
    exports.InspectorWidgetBase = InspectorWidgetBase;
    exports.LabelFormControlComponent = LabelFormControlComponent;
    exports.LabelFormControlModule = LabelFormControlModule;
    exports.ListFormControlComponent = ListFormControlComponent;
    exports.ListFormControlModule = ListFormControlModule;
    exports.LocalizedCharacterFieldValueModalComponent = LocalizedCharacterFieldValueModalComponent;
    exports.OptionalExpressionControlComponent = OptionalExpressionControlComponent;
    exports.OptionalExpressionControlModule = OptionalExpressionControlModule;
    exports.OptionalExpressionInspectorControlComponent = OptionalExpressionInspectorControlComponent;
    exports.OptionalExpressionInspectorControlModule = OptionalExpressionInspectorControlModule;
    exports.OptionalSelectFormControlComponent = OptionalSelectFormControlComponent;
    exports.OptionalSelectFormControlModule = OptionalSelectFormControlModule;
    exports.RX_DEFINITION_PICKER = RX_DEFINITION_PICKER;
    exports.RX_DESIGNER_CANVAS = RX_DESIGNER_CANVAS;
    exports.RX_EXPRESSION_EDITOR = RX_EXPRESSION_EDITOR;
    exports.RX_GAINSIGHT = RX_GAINSIGHT;
    exports.RX_REVERT_CUSTOMIZATION = RX_REVERT_CUSTOMIZATION;
    exports.RX_SELECT_EXPRESSION_DROPDOWN = RX_SELECT_EXPRESSION_DROPDOWN;
    exports.RX_VALIDATION_FORM_CONTROL = RX_VALIDATION_FORM_CONTROL;
    exports.RadioFormControlComponent = RadioFormControlComponent;
    exports.RadioFormControlModule = RadioFormControlModule;
    exports.RecordInstanceFormControlComponent = RecordInstanceFormControlComponent;
    exports.RecordInstanceFormControlModule = RecordInstanceFormControlModule;
    exports.RenameDefinitionModalComponent = RenameDefinitionModalComponent;
    exports.RenameDefinitionModalModule = RenameDefinitionModalModule;
    exports.RxBooleanComponent = RxBooleanComponent;
    exports.RxBooleanModule = RxBooleanModule;
    exports.RxDefinitionPickerCacheService = RxDefinitionPickerCacheService;
    exports.RxDefinitionPickerComponent = RxDefinitionPickerComponent;
    exports.RxDefinitionPickerModule = RxDefinitionPickerModule;
    exports.RxDesignerCanvasComponent = RxDesignerCanvasComponent;
    exports.RxDesignerCanvasModule = RxDesignerCanvasModule;
    exports.RxDesignerHeaderComponent = RxDesignerHeaderComponent;
    exports.RxDesignerHeaderModule = RxDesignerHeaderModule;
    exports.RxDesignerPaletteComponent = RxDesignerPaletteComponent;
    exports.RxDesignerPaletteModule = RxDesignerPaletteModule;
    exports.RxDynamicComponentRendererComponent = RxDynamicComponentRendererComponent;
    exports.RxDynamicComponentRendererModule = RxDynamicComponentRendererModule;
    exports.RxErrorPageComponent = RxErrorPageComponent;
    exports.RxErrorPageModule = RxErrorPageModule;
    exports.RxExpressionEditorService = RxExpressionEditorService;
    exports.RxFormBuilderModule = RxFormBuilderModule;
    exports.RxGainsightConfiguratorService = RxGainsightConfiguratorService;
    exports.RxGainsightUserPreferencesService = RxGainsightUserPreferencesService;
    exports.RxIframeComponent = RxIframeComponent;
    exports.RxIframeModule = RxIframeModule;
    exports.RxIframeService = RxIframeService;
    exports.RxInnovationStudioShellComponent = RxInnovationStudioShellComponent;
    exports.RxInspectorModule = RxInspectorModule;
    exports.RxIssueReporterModule = RxIssueReporterModule;
    exports.RxIssueReporterService = RxIssueReporterService;
    exports.RxLocalizedCharacterFieldValueModalModule = RxLocalizedCharacterFieldValueModalModule;
    exports.RxPermissionEditorComponent = RxPermissionEditorComponent;
    exports.RxPermissionEditorDialogComponent = RxPermissionEditorDialogComponent;
    exports.RxPermissionEditorModule = RxPermissionEditorModule;
    exports.RxRevertCustomizationComponent = RxRevertCustomizationComponent;
    exports.RxRevertCustomizationModule = RxRevertCustomizationModule;
    exports.RxSearchComponent = RxSearchComponent;
    exports.RxSearchModule = RxSearchModule;
    exports.RxSelectExpressionDropdownComponent = RxSelectExpressionDropdownComponent;
    exports.RxSelectExpressionDropdownModule = RxSelectExpressionDropdownModule;
    exports.RxSelectWithPaginationComponent = RxSelectWithPaginationComponent;
    exports.RxSelectWithPaginationModule = RxSelectWithPaginationModule;
    exports.RxSelectionFieldOptionsModule = RxSelectionFieldOptionsModule;
    exports.RxShellComponent = RxShellComponent;
    exports.RxShellModule = RxShellModule;
    exports.RxUnknownApplicationComponent = RxUnknownApplicationComponent;
    exports.RxUnknownApplicationModule = RxUnknownApplicationModule;
    exports.RxUserAvailabilityModule = RxUserAvailabilityModule;
    exports.RxUserPreferencesModule = RxUserPreferencesModule;
    exports.RxWizardModalComponent = RxWizardModalComponent;
    exports.RxWizardModule = RxWizardModule;
    exports.RxWizardService = RxWizardService;
    exports.SelectFormControlComponent = SelectFormControlComponent;
    exports.SelectFormControlModule = SelectFormControlModule;
    exports.SelectionFieldOptionsComponent = SelectionFieldOptionsComponent;
    exports.SelectionFieldOptionsEditorComponent = SelectionFieldOptionsEditorComponent;
    exports.ShellBase = ShellBase;
    exports.StepperWithUnitsFormControlComponent = StepperWithUnitsFormControlComponent;
    exports.StepperWithUnitsFormControlModule = StepperWithUnitsFormControlModule;
    exports.SwitchFormControlComponent = SwitchFormControlComponent;
    exports.SwitchFormControlModule = SwitchFormControlModule;
    exports.TagsFormControlComponent = TagsFormControlComponent;
    exports.TextFormControlComponent = TextFormControlComponent;
    exports.TextFormControlModule = TextFormControlModule;
    exports.TextareaFormControlComponent = TextareaFormControlComponent;
    exports.TextareaFormControlModule = TextareaFormControlModule;
    exports.TimeFormControlComponent = TimeFormControlComponent;
    exports.TimeFormControlModule = TimeFormControlModule;
    exports.ValidationFormControlComponent = ValidationFormControlComponent;
    exports.ValidationFormControlModule = ValidationFormControlModule;
    exports.ValueAccessor = ValueAccessor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-shared-components.umd.js.map
