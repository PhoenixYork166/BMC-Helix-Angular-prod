(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@bmc-ux/adapt-table'), require('@helix/platform/record/api'), require('@helix/platform/shared/api'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('@helix/platform/view/components'), require('@ngx-translate/core'), require('@bmc-ux/obsolete'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@helix/platform/utils'), require('@ngrx/component-store'), require('@ngrx/store'), require('@helix/platform/association/api'), require('@helix/platform/view/api'), require('moment-es6'), require('@ngrx/effects'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/record/designer', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@bmc-ux/adapt-angular', '@bmc-ux/adapt-table', '@helix/platform/record/api', '@helix/platform/shared/api', '@helix/platform/shared/components', '@helix/platform/ui-kit', '@helix/platform/view/components', '@ngx-translate/core', '@bmc-ux/obsolete', 'lodash', 'rxjs', 'rxjs/operators', '@helix/platform/utils', '@ngrx/component-store', '@ngrx/store', '@helix/platform/association/api', '@helix/platform/view/api', 'moment-es6', '@ngrx/effects', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.record = global.helix.platform.record || {}, global.helix.platform.record.designer = {}), global.ng.common, global.ng.core, global.ng.forms, global.i1$1, global.i4, global.helix.platform.record.api, global.helix.platform.shared.api, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.helix.platform.view.components, global.ngxTranslateCore, global.obsolete, global.lodash, global.rxjs, global.rxjs.operators, global.helix.platform.utils, global.componentStore, global.i1$3, global.helix.platform.association.api, global.helix.platform.view.api, global.moment, global.i2$2, global.ng.router));
})(this, (function (exports, i5, i0, i6, i1$1, i4, i3, i2, i11, i1, components, i2$1, obsolete, lodash, rxjs, operators, i1$2, componentStore, i1$3, api, api$1, moment, i2$2, i1$4) { 'use strict';

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

    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2);
    var i11__namespace = /*#__PURE__*/_interopNamespace(i11);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$3);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$2);
    var i1__namespace$4 = /*#__PURE__*/_interopNamespace(i1$4);

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

    var RecordCustomizationOptionsEditorComponent = /** @class */ (function (_super) {
        __extends(RecordCustomizationOptionsEditorComponent, _super);
        function RecordCustomizationOptionsEditorComponent(rxModalService, activeModalRef, injector, translateService) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.rxModalService = rxModalService;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.translateService = translateService;
            _this.data = _this.activeModalRef.getData();
            _this.scopeSelectionOptions = _this.data.scopeSelectionOptions;
            _this.recordDefinition = _this.data.recordDefinition;
            _this.customizationControlProperties = [
                'allowPermissionsOverlay',
                'allowOtherPropertiesOverlay',
                'allowIndexesOverlay',
                'allowFieldsOverlay'
            ];
            _this.initialCustomizationOptions = _this.recordDefinition.customizationOptions;
            _this.allowOverlay = lodash.includes(Object.values(_this.initialCustomizationOptions), true);
            _this.fields = lodash.cloneDeep(_this.recordDefinition.fields);
            _this.customizationOptions = {
                allowOtherPropertiesOverlay: _this.initialCustomizationOptions.allowOtherPropertiesOverlay || false,
                allowPermissionsOverlay: _this.initialCustomizationOptions.allowPermissionsOverlay || false,
                allowIndexesOverlay: _this.initialCustomizationOptions.allowIndexesOverlay || false,
                allowFieldsOverlay: _this.initialCustomizationOptions.allowFieldsOverlay || false
            };
            _this.isFieldsOverlayAllowedSubject = new rxjs.BehaviorSubject(_this.initialCustomizationOptions.allowFieldsOverlay);
            _this.isDisabled = _this.data.overlayOperation !== i2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            _this.definitionScopeName = lodash.find(_this.scopeSelectionOptions, { name: _this.data.definitionScopeName });
            _this.scope = [_this.definitionScopeName];
            _this.isPublicSubject = new rxjs.BehaviorSubject(_this.scope[0].id === i2.RX_BUNDLE.definitionScopes.public.type);
            _this.areCustomizationOptionsDisabled$ = _this.isPublicSubject.pipe(operators.map(function (isPublic) { return !isPublic || _this.isDisabled; }));
            _this.isFieldsOverlayDisabled$ = rxjs.combineLatest([
                _this.areCustomizationOptionsDisabled$,
                _this.isFieldsOverlayAllowedSubject
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), areCustomizationOptionsDisabled = _b[0], isFieldsOverlayAllowed = _b[1];
                return areCustomizationOptionsDisabled || !isFieldsOverlayAllowed;
            }));
            _this.vm$ = _this.areCustomizationOptionsDisabled$.pipe(operators.map(function (areCustomizationOptionsDisabled) { return ({ areCustomizationOptionsDisabled: areCustomizationOptionsDisabled }); }));
            return _this;
        }
        RecordCustomizationOptionsEditorComponent.prototype.onFieldsPropertyChange = function () {
            this.recordCustomizationOptionsEditorForm.control.markAsDirty();
        };
        RecordCustomizationOptionsEditorComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.columns = [
                {
                    field: 'name',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                },
                {
                    field: 'allowOtherPropertiesOverlay',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-properties-customization.label'),
                    cellTemplate: this.recordFieldsColumnTemplate,
                    headerClass: 'pl-6'
                },
                {
                    field: 'allowPermissionsOverlay',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-permissions-customization.label'),
                    cellTemplate: this.recordFieldsColumnTemplate,
                    headerClass: 'pl-6'
                }
            ];
        };
        RecordCustomizationOptionsEditorComponent.prototype.optionFormatter = function (option) {
            return option.name;
        };
        RecordCustomizationOptionsEditorComponent.prototype.save = function () {
            var _this = this;
            if (this.scope[0].id === i2.RX_BUNDLE.definitionScopeTypes.public) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.definition-scope-to-public.warning')
                })
                    .then(function (result) {
                    if (result) {
                        _this.closeModal();
                    }
                })
                    .catch(lodash.noop);
            }
            else if (this.data.definitionScopeName === i2.RX_BUNDLE.definitionScopeNames.public) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.change-scope-from-public-warning.message')
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
        RecordCustomizationOptionsEditorComponent.prototype.onScopeChange = function (rxSelectionChangeEvent) {
            this.isPublicSubject.next(rxSelectionChangeEvent[0].id === i2.RX_BUNDLE.definitionScopes.public.type);
        };
        RecordCustomizationOptionsEditorComponent.prototype.closeModal = function () {
            var result = Object.assign(Object.assign({}, this.recordCustomizationOptionsEditorForm.form.value), { fields: this.fields });
            result.scope = result.scope[0].id;
            this.activeModalRef.close(result);
        };
        RecordCustomizationOptionsEditorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        RecordCustomizationOptionsEditorComponent.prototype.handleAllowOverlayChange = function () {
            var _this = this;
            Object.keys(this.customizationOptions).forEach(function (option) { return (_this.customizationOptions[option] = _this.allowOverlay); });
            this.isFieldsOverlayAllowedSubject.next(this.allowOverlay);
        };
        RecordCustomizationOptionsEditorComponent.prototype.onRecordCustomizationOptionChange = function () {
            this.allowOverlay =
                this.customizationOptions.allowFieldsOverlay ||
                    this.customizationOptions.allowIndexesOverlay ||
                    this.customizationOptions.allowOtherPropertiesOverlay ||
                    this.customizationOptions.allowPermissionsOverlay;
            this.isFieldsOverlayAllowedSubject.next(this.customizationOptions.allowFieldsOverlay);
        };
        RecordCustomizationOptionsEditorComponent.prototype.isDirty = function () {
            return this.recordCustomizationOptionsEditorForm.dirty;
        };
        RecordCustomizationOptionsEditorComponent.prototype.ngOnDestroy = function () {
            this.isFieldsOverlayAllowedSubject.complete();
            this.isPublicSubject.complete();
        };
        return RecordCustomizationOptionsEditorComponent;
    }(i1.RxModalClass));
    RecordCustomizationOptionsEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsEditorComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i1__namespace$1.ActiveModalRef }, { token: i0__namespace.Injector }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordCustomizationOptionsEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordCustomizationOptionsEditorComponent, selector: "rx-record-customization-options-editor", viewQueries: [{ propertyName: "recordCustomizationOptionsEditorForm", first: true, predicate: ["recordCustomizationOptionsEditorForm"], descendants: true }, { propertyName: "recordFieldsColumnTemplate", first: true, predicate: ["recordFieldsColumnTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body\">\n    <form #recordCustomizationOptionsEditorForm=\"ngForm\">\n      <div class=\"w-25\">\n        <adapt-rx-select\n          label=\"{{\n            'com.bmc.arsys.rx.client.record-designer.scope-customization-options-editor.scope.label' | translate\n          }}\"\n          rx-id=\"scope-selection\"\n          [options]=\"scopeSelectionOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content: 'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate,\n            placement: 'bottom',\n            popoverMode: true\n          }\"\n          name=\"scope\"\n          [(ngModel)]=\"scope\"\n          (ngModelChange)=\"onScopeChange($event)\"\n          [disabled]=\"isDisabled\"\n        >\n        </adapt-rx-select>\n      </div>\n\n      <div class=\"w-100\">\n        <h5>{{ 'com.bmc.arsys.rx.client.customization-options-editor.customization-options.label' | translate }}</h5>\n        <adapt-rx-checkbox\n          label=\"{{\n            'com.bmc.arsys.rx.client.customization-options-editor.allow-future-customization.label'\n              | translate: { definitionType: data.definitionTypeDisplayName }\n          }}\"\n          rx-id=\"allow-customization-checkbox\"\n          name=\"allowOverlay\"\n          [(ngModel)]=\"allowOverlay\"\n          (ngModelChange)=\"handleAllowOverlayChange()\"\n          [disabled]=\"vm.areCustomizationOptionsDisabled\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n\n      <div class=\"w-100\">\n        <h6>\n          {{\n            'com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-future-customizations-to.label'\n              | translate\n          }}\n        </h6>\n\n        <div class=\"w-100 d-flex\">\n          <div class=\"w-50\">\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.properties.label' | translate\n                }}\"\n                name=\"allowOtherPropertiesOverlay\"\n                [(ngModel)]=\"customizationOptions.allowOtherPropertiesOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"properties-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.permissions.label' | translate\n                }}\"\n                name=\"allowPermissionsOverlay\"\n                [(ngModel)]=\"customizationOptions.allowPermissionsOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"permissions-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n          </div>\n\n          <div class=\"w-50\">\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.search-indexes.label' | translate\n                }}\"\n                name=\"allowIndexesOverlay\"\n                [(ngModel)]=\"customizationOptions.allowIndexesOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"search-indexes-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.fields.label' | translate\n                }}\"\n                name=\"allowFieldsOverlay\"\n                [(ngModel)]=\"customizationOptions.allowFieldsOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"fields-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <adapt-table\n        [value]=\"fields\"\n        [columns]=\"columns\"\n        [scrollable]=\"true\"\n        scrollHeight=\"340px\"\n        [sortable]=\"false\"\n        [resizableColumns]=\"false\"\n        [bordered]=\"false\"\n        [filterable]=\"false\"\n        [dataKey]=\"'name'\"\n      >\n      </adapt-table>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      class=\"btn btn-primary\"\n      rx-id=\"save-button\"\n      (click)=\"save()\"\n      type=\"button\"\n      [disabled]=\"!recordCustomizationOptionsEditorForm.dirty\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n\n<ng-template #recordFieldsColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"checkbox m-0 pl-4\">\n    <div class=\"checkbox__label pl-6 ml-6\">\n      <label>\n        <input\n          type=\"checkbox\"\n          role=\"checkbox\"\n          class=\"checkbox__input\"\n          [(ngModel)]=\"dataItem[column.field]\"\n          [disabled]=\"isFieldsOverlayDisabled$ | async\"\n          (change)=\"onFieldsPropertyChange()\"\n        />\n\n        <div class=\"checkbox__item\"></div>\n      </label>\n    </div>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i4__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-customization-options-editor',
                        templateUrl: './record-customization-options-editor.component.html',
                        styleUrls: ['./record-customization-options-editor.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i1__namespace$1.ActiveModalRef }, { type: i0__namespace.Injector }, { type: i2__namespace.TranslateService }]; }, propDecorators: { recordCustomizationOptionsEditorForm: [{
                    type: i0.ViewChild,
                    args: ['recordCustomizationOptionsEditorForm']
                }], recordFieldsColumnTemplate: [{
                    type: i0.ViewChild,
                    args: ['recordFieldsColumnTemplate', { static: true }]
                }] } });

    var RecordCustomizationOptionsComponent = /** @class */ (function (_super) {
        __extends(RecordCustomizationOptionsComponent, _super);
        function RecordCustomizationOptionsComponent(rxModalService, rxBundleCacheService, rxOverlayService, translateService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.rxBundleCacheService = rxBundleCacheService;
            _this.rxOverlayService = rxOverlayService;
            _this.translateService = translateService;
            _this.scopeNameSubject = new rxjs.BehaviorSubject('');
            _this.scopeSelectionOptions$ = _this.rxBundleCacheService.getDefinitionScopeSelectionOptions().pipe(operators.map(function (scopeSelectionOptions) { return scopeSelectionOptions; }), operators.tap(function (scopeSelectionOptions) { return (_this.scopeSelectionOptions = scopeSelectionOptions); }));
            _this.definitionScopeName$ = _this.scopeNameSubject.pipe(operators.mergeMap(function (scopeName) { return _this.rxBundleCacheService.getDefinitionScopeName(scopeName).pipe(operators.map(function (definitionScopeName) { return definitionScopeName; }), operators.tap(function (definitionScopeName) { return (_this.definitionScopeName = definitionScopeName); })); }));
            _this.vm$ = rxjs.combineLatest([_this.definitionScopeName$, _this.scopeSelectionOptions$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), definitionScopeName = _c[0], scopeSelectionOptions = _c[1];
                return ({
                    definitionScopeName: definitionScopeName,
                    scopeSelectionOptions: scopeSelectionOptions
                });
            }));
            return _this;
        }
        RecordCustomizationOptionsComponent.prototype.ngOnInit = function () {
            if (this.options) {
                this.updateValues();
            }
        };
        RecordCustomizationOptionsComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options) {
                this.updateValues();
            }
        };
        RecordCustomizationOptionsComponent.prototype.getOverlayOperation = function () {
            var _a;
            return this.rxOverlayService.getOverlayOperation(this.options.recordDefinition.overlayGroupId, ((_a = this.options.recordDefinition.overlayDescriptor) === null || _a === void 0 ? void 0 : _a.parentOverlayGroupId) || null);
        };
        RecordCustomizationOptionsComponent.prototype.updateValues = function () {
            this.setAllowOverlayLabel(this.options.recordDefinition.customizationOptions.allowOtherPropertiesOverlay);
            this.scopeNameSubject.next(this.options.recordDefinition.customizationOptions.scope);
            if (this.options.recordDefinition.overlayGroupId) {
                this.overlayOperation = this.getOverlayOperation();
            }
            else {
                this.overlayOperation = i2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            }
        };
        RecordCustomizationOptionsComponent.prototype.openCustomizationOptionsEditor = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.designer.scope-customization-options.title'),
                content: RecordCustomizationOptionsEditorComponent,
                blockKeyboard: false,
                data: {
                    definitionScopeName: this.definitionScopeName,
                    allowOverlay: this.options.recordDefinition.customizationOptions.allowOtherPropertiesOverlay,
                    scopeSelectionOptions: this.scopeSelectionOptions,
                    isDisabled: this.options.isDisabled,
                    overlayOperation: this.overlayOperation,
                    definitionTypeDisplayName: this.options.definitionTypeDisplayName,
                    recordDefinition: this.options.recordDefinition
                }
            })
                .then(function (result) {
                _this.setAllowOverlayLabel(result.allowOverlay);
                _this.definitionScopeName = _this.scopeSelectionOptions.find(function (value) { return value.id === result.scope; }).name;
                _this.value = result;
            })
                .catch(lodash.noop);
        };
        RecordCustomizationOptionsComponent.prototype.setAllowOverlayLabel = function (allowOverlay) {
            this.allowOverlayLabel = allowOverlay
                ? i2.RX_OVERLAY.overlayAllowedLabels.allowed
                : i2.RX_OVERLAY.overlayAllowedLabels.notAllowed;
        };
        RecordCustomizationOptionsComponent.prototype.ngOnDestroy = function () {
            this.scopeNameSubject.complete();
        };
        return RecordCustomizationOptionsComponent;
    }(i11.ValueAccessor));
    RecordCustomizationOptionsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i2__namespace$1.RxBundleCacheService }, { token: i2__namespace$1.RxOverlayService }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordCustomizationOptionsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordCustomizationOptionsComponent, selector: "rx-scope-record-customization-control", inputs: { options: "options" }, providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: RecordCustomizationOptionsComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-customization-options-editor-link\"\n    (click)=\"openCustomizationOptionsEditor()\"\n    class=\"p-0\"\n  >\n    {{ 'com.bmc.arsys.rx.client.designer.scope-customization-options.title' | translate }}\n  </adapt-button>\n\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate\"\n  >\n  </adapt-icon>\n\n  <p rx-id=\"scope\" class=\"mb-0 pt-2\">\n    {{\n      'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.label'\n        | translate: { definitionScopeName: vm.definitionScopeName }\n    }}\n  </p>\n\n  <div rx-id=\"customization\" class=\"pt-2\">\n    {{\n      'com.bmc.arsys.rx.client.designer.scope-customization-options.customization.label'\n        | translate: { allowOverlayLabel: allowOverlayLabel }\n    }}\n  </div>\n</ng-container>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-scope-record-customization-control',
                        templateUrl: './record-customization-options.component.html',
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: RecordCustomizationOptionsComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i2__namespace$1.RxBundleCacheService }, { type: i2__namespace$1.RxOverlayService }, { type: i2__namespace.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RecordCustomizationOptionsModule = /** @class */ (function () {
        function RecordCustomizationOptionsModule() {
        }
        return RecordCustomizationOptionsModule;
    }());
    RecordCustomizationOptionsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RecordCustomizationOptionsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsModule, declarations: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent], imports: [i5.CommonModule,
            i6.FormsModule,
            i1$1.AdaptTooltipModule,
            i1$1.AdaptRxSelectModule,
            i1$1.AdaptButtonModule,
            obsolete.AdaptCheckbox2Module,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptRxCheckboxModule,
            i6.ReactiveFormsModule,
            i2$1.TranslateModule,
            i4.AdaptTableModule], exports: [RecordCustomizationOptionsComponent] });
    RecordCustomizationOptionsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsModule, imports: [[
                i5.CommonModule,
                i6.FormsModule,
                i1$1.AdaptTooltipModule,
                i1$1.AdaptRxSelectModule,
                i1$1.AdaptButtonModule,
                obsolete.AdaptCheckbox2Module,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptRxCheckboxModule,
                i6.ReactiveFormsModule,
                i2$1.TranslateModule,
                i4.AdaptTableModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordCustomizationOptionsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent],
                        exports: [RecordCustomizationOptionsComponent],
                        entryComponents: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent],
                        imports: [
                            i5.CommonModule,
                            i6.FormsModule,
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptRxSelectModule,
                            i1$1.AdaptButtonModule,
                            obsolete.AdaptCheckbox2Module,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptRxCheckboxModule,
                            i6.ReactiveFormsModule,
                            i2$1.TranslateModule,
                            i4.AdaptTableModule
                        ]
                    }]
            }] });

    var RxFieldDefinitionInspectorHelperService = /** @class */ (function () {
        function RxFieldDefinitionInspectorHelperService(rxFieldDefinitionService, rxRecordDefinitionService) {
            this.rxFieldDefinitionService = rxFieldDefinitionService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
        }
        RxFieldDefinitionInspectorHelperService.prototype.isFieldEditable = function (fieldDefinition) {
            return (!this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
                !this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
        };
        RxFieldDefinitionInspectorHelperService.prototype.isNameEditable = function (fieldDefinition) {
            return (!this.rxFieldDefinitionService.isInheritedField(fieldDefinition) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
                !(fieldDefinition.lastUpdateTime && this.rxFieldDefinitionService.isOverlayMode(fieldDefinition)));
        };
        RxFieldDefinitionInspectorHelperService.prototype.isDescriptionEditable = function (fieldDefinition, definitionModel) {
            if (this.rxRecordDefinitionService.isJoinRecord(definitionModel)) {
                return (lodash.includes(i3.RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, fieldDefinition.id) &&
                    this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
            }
            else {
                return (!this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
                    this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
            }
        };
        RxFieldDefinitionInspectorHelperService.prototype.isRequiredEditable = function (fieldDefinition) {
            var isAlwaysRequiredNonSystemField = !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition) &&
                lodash.includes(i3.RX_RECORD_DEFINITION.alwaysRequiredNonSystemFieldIds, fieldDefinition.id);
            return this.isFieldEditable(fieldDefinition) && !isAlwaysRequiredNonSystemField;
        };
        RxFieldDefinitionInspectorHelperService.prototype.isSubmitEditable = function (fieldDefinition, definitionModel) {
            return this.isFieldEditable(fieldDefinition) && !definitionModel.isAuditRecordDefinition;
        };
        RxFieldDefinitionInspectorHelperService.prototype.arePermissionsEditable = function (fieldDefinition, definitionModel) {
            return ((fieldDefinition.id !== i3.RX_RECORD_DEFINITION.coreFieldIds.id &&
                this.rxFieldDefinitionService.isPermissionsCustomizationEnabled(fieldDefinition) &&
                !(this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                    fieldDefinition.id !== i3.RX_RECORD_DEFINITION.coreFieldIds.displayId) &&
                !definitionModel.isAuditRecordDefinition &&
                !lodash.includes(i3.RX_RECORD_DEFINITION.AR_AUDIT_FIELD_IDS, fieldDefinition.id)) ||
                fieldDefinition.allowPermissionsEdit);
        };
        RxFieldDefinitionInspectorHelperService.prototype.isAuditingEditable = function (fieldDefinition, definitionModel) {
            return (!this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                !this.rxFieldDefinitionService.isInheritedField(fieldDefinition) &&
                !definitionModel.isAuditRecordDefinition);
        };
        RxFieldDefinitionInspectorHelperService.prototype.isFieldIdDisabled = function (fieldDefinition, skipValidate) {
            if (skipValidate === void 0) { skipValidate = false; }
            return (Boolean(fieldDefinition.lastUpdateTime) ||
                (!this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                    (this.rxFieldDefinitionService.isReservedField(fieldDefinition, skipValidate) ||
                        this.rxFieldDefinitionService.isInheritedField(fieldDefinition))));
        };
        RxFieldDefinitionInspectorHelperService.prototype.isDefaultValueEditable = function (fieldDefinition, definitionModel) {
            return (!(this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
                fieldDefinition.id !== i3.RX_RECORD_DEFINITION.coreFieldIds.displayId) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
                !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                !definitionModel.isAuditRecordDefinition);
        };
        RxFieldDefinitionInspectorHelperService.prototype.isLengthEditable = function (fieldDefinition, definitionModel) {
            var isEditable = false;
            if (!this.rxRecordDefinitionService.isJoinRecord(definitionModel)) {
                var isReadonlyField = false;
                // As an exception, the Length of the Display ID field should be editable for Regular records (if customization is enabled)
                if (fieldDefinition.id !== i3.RX_RECORD_DEFINITION.coreFieldIds.displayId) {
                    isReadonlyField =
                        this.rxFieldDefinitionService.isReadOnly(fieldDefinition) ||
                            lodash.includes(i3.RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldDefinition.id);
                }
                isEditable =
                    !isReadonlyField &&
                        this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
                        !definitionModel.isAuditRecordDefinition;
            }
            return isEditable;
        };
        RxFieldDefinitionInspectorHelperService.prototype.isStoreEncryptedVisible = function (fieldDefinition, definitionModel) {
            return (!this.rxRecordDefinitionService.isCustomRecord(definitionModel) &&
                !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition));
        };
        RxFieldDefinitionInspectorHelperService.prototype.isStoreEncryptedEditable = function (fieldDefinition) {
            return this.isFieldEditable(fieldDefinition) && !lodash.includes(i3.RX_RECORD_DEFINITION.keyFieldIds, fieldDefinition.id);
        };
        RxFieldDefinitionInspectorHelperService.prototype.isStoreHashedVisible = function (fieldDefinition, definitionModel) {
            return (!this.rxRecordDefinitionService.isCustomRecord(definitionModel) &&
                !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition));
        };
        RxFieldDefinitionInspectorHelperService.prototype.isStoreHashedEditable = function (fieldDefinition, definitionModel) {
            return (this.isFieldEditable(fieldDefinition) &&
                !lodash.includes(i3.RX_RECORD_DEFINITION.coreFieldIds, fieldDefinition.id) &&
                !definitionModel.isAuditRecordDefinition);
        };
        RxFieldDefinitionInspectorHelperService.prototype.isNamedListEditable = function (fieldDefinition, definitionModel) {
            return (this.isFieldEditable(fieldDefinition) &&
                !lodash.includes(i3.RX_RECORD_DEFINITION.keyFieldIds, fieldDefinition.id) &&
                !definitionModel.isAuditRecordDefinition);
        };
        RxFieldDefinitionInspectorHelperService.prototype.isFieldMappingEditable = function (fieldDefinition) {
            return this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition);
        };
        return RxFieldDefinitionInspectorHelperService;
    }());
    RxFieldDefinitionInspectorHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionInspectorHelperService, deps: [{ token: i3__namespace.RxFieldDefinitionService }, { token: i3__namespace.RxRecordDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFieldDefinitionInspectorHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionInspectorHelperService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionInspectorHelperService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.RxFieldDefinitionService }, { type: i3__namespace.RxRecordDefinitionService }]; } });

    var FieldOptionEditorComponent = /** @class */ (function (_super) {
        __extends(FieldOptionEditorComponent, _super);
        function FieldOptionEditorComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FieldOptionEditorComponent.prototype.ngOnInit = function () {
            this.isRequired = this.value === i3.RecordFieldOption.Required || this.value === i3.RecordFieldOption.System;
        };
        FieldOptionEditorComponent.prototype.onSelectionChange = function () {
            this.value = this.isRequired ? i3.RecordFieldOption.Required : i3.RecordFieldOption.Optional;
        };
        return FieldOptionEditorComponent;
    }(i11.ValueAccessor));
    FieldOptionEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldOptionEditorComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    FieldOptionEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldOptionEditorComponent, selector: "rx-field-option-editor", providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: FieldOptionEditorComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-control-label\n  label=\"{{ 'com.bmc.arsys.rx.client.record-designer.field-properties.required-field.label' | translate }}\"\n>\n</adapt-rx-control-label>\n\n<adapt-rx-switch\n  [(ngModel)]=\"isRequired\"\n  [disabled]=\"isDisabled\"\n  (ngModelChange)=\"onSelectionChange()\"\n></adapt-rx-switch>\n", components: [{ type: i1__namespace$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i2__namespace.TranslatePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldOptionEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-field-option-editor',
                        templateUrl: './field-option-editor.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: FieldOptionEditorComponent,
                                multi: true
                            }
                        ]
                    }]
            }] });

    var RxBaseFieldDefinitionService = /** @class */ (function () {
        function RxBaseFieldDefinitionService(injector) {
            this.injector = injector;
            this.translateService = this.injector.get(i2$1.TranslateService);
            this.rxIdService = this.injector.get(i1$2.RxIdService);
            this.rxFieldDefinitionService = this.injector.get(i3.RxFieldDefinitionService);
            this.rxFieldDefinitionInspectorHelperService = this.injector.get(RxFieldDefinitionInspectorHelperService);
            this.rxRecordDefinitionService = this.injector.get(i3.RxRecordDefinitionService);
        }
        RxBaseFieldDefinitionService.prototype.getNewFieldDefinitionModel = function (fieldProperties) {
            return Object.assign({ id: this.rxIdService.generate(), name: this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label'), description: null, fieldOption: i3.RX_RECORD_DEFINITION.fieldOptions.optional, defaultValue: null, allowPermissionsOverlay: true, allowOtherPropertiesOverlay: true, resourceType: this.resourceType }, fieldProperties);
        };
        RxBaseFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var isJoinedField = this.rxFieldDefinitionService.isJoinedField(fieldModel);
            var isExternalRecordField = this.rxFieldDefinitionService.isExternalRecordField(fieldModel);
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: i11.TextFormControlComponent,
                            isDisabled: !this.rxFieldDefinitionInspectorHelperService.isNameEditable(fieldModel),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: i11.TextareaFormControlComponent,
                            isDisabled: isReadOnly ||
                                !this.rxFieldDefinitionInspectorHelperService.isDescriptionEditable(fieldModel, definitionModel),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                            }
                        },
                        {
                            name: 'resourceType',
                            component: i11.SelectFormControlComponent,
                            isDisabled: true,
                            options: {
                                required: true,
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                                options: [
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.attachment.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.boolean.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.dateTime.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.decimal.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.real.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.real.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.integer.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.localizedCharacter.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.selection.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.character.labelKey)
                                    },
                                    {
                                        id: i3.RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType,
                                        name: this.translateService.instant(i3.RX_RECORD_DEFINITION.dataTypes.timeOnly.labelKey)
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.details.label'),
                    controls: [
                        {
                            name: 'fieldOption',
                            component: FieldOptionEditorComponent,
                            isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isRequiredEditable(fieldModel)
                        },
                        {
                            name: 'anyUserAllowedToSubmit',
                            component: i11.SwitchFormControlComponent,
                            isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isSubmitEditable(fieldModel, definitionModel),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.allow-anyone-to-submit.label')
                            }
                        },
                        {
                            name: 'permissions',
                            component: i11.RxPermissionEditorComponent,
                            isDisabled: isReadOnly ||
                                !this.rxFieldDefinitionInspectorHelperService.arePermissionsEditable(fieldModel, definitionModel),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                type: 'config',
                                permissionScope: i2.RX_PERMISSION.permissionScope.all
                            }
                        },
                        {
                            name: '',
                            component: i11.LabelFormControlComponent,
                            options: {
                                labelKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'
                            }
                        },
                        {
                            name: 'audit',
                            component: i11.BooleanFormControlComponent,
                            isDisabled: isReadOnly ||
                                !this.rxFieldDefinitionInspectorHelperService.isAuditingEditable(fieldModel, definitionModel),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.audit.label'),
                                tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.audit.tooltip'),
                                shouldDisplayAsCheckbox: true
                            }
                        },
                        {
                            name: 'copy',
                            component: i11.BooleanFormControlComponent,
                            isDisabled: fieldModel.audit ||
                                isReadOnly ||
                                !this.rxFieldDefinitionInspectorHelperService.isAuditingEditable(fieldModel, definitionModel),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.copy.label'),
                                tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.copy.tooltip'),
                                shouldDisplayAsCheckbox: true
                            }
                        },
                        {
                            name: 'id',
                            component: i11.CounterFormControlComponent,
                            isDisabled: this.rxFieldDefinitionInspectorHelperService.isFieldIdDisabled(fieldModel, fieldModel.isNewField),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.field-id.label'),
                                allowIntegerOnly: true
                            }
                        }
                    ]
                }
            ];
        };
        RxBaseFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var issues = [];
            if (lodash.isEmpty(lodash.trim(fieldModel.name))) {
                issues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                    }),
                    data: {
                        propertyName: 'name',
                        guid: fieldModel.guid
                    }
                });
            }
            if (!i3.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(fieldModel.name)) {
                issues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                    }),
                    data: {
                        propertyName: 'name',
                        guid: fieldModel.guid
                    }
                });
            }
            if (!fieldModel.lastUpdateTime &&
                lodash.isNumber(fieldModel.id) &&
                !this.rxFieldDefinitionService.isExternalRecordField(fieldModel) &&
                lodash.inRange(fieldModel.id, 1, i3.RX_RECORD_DEFINITION.AR_MAX_RESERVED_FIELD_ID + 1) &&
                !lodash.includes(i3.RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldModel.id)) {
                issues.push({
                    type: i1.ValidationIssueType.Warning,
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    },
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.field-id-in-bmc-reserved-range-warning.message')
                });
            }
            if (fieldModel.id && !lodash.inRange(fieldModel.id, 1, i1$2.RX_NUMBER.maxInteger + 1)) {
                issues.push({
                    type: i1.ValidationIssueType.Error,
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    },
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-field-id-range.message', { max: i1$2.RX_NUMBER.maxInteger })
                });
            }
            return issues;
        };
        return RxBaseFieldDefinitionService;
    }());

    var RxAttachmentFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxAttachmentFieldDefinitionService, _super);
        function RxAttachmentFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType;
            return _this;
        }
        RxAttachmentFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            // Adding controls specific to attachment field to Details section
            inspectorConfig[1].controls.push({
                name: 'maxSize',
                component: i11.CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.max-file-size.label'),
                    allowIntegerOnly: true,
                    minValue: 0,
                    maxValue: i1$2.RX_NUMBER.maxInteger
                }
            });
            return inspectorConfig;
        };
        return RxAttachmentFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxAttachmentFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAttachmentFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAttachmentFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAttachmentFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAttachmentFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxBooleanFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxBooleanFieldDefinitionService, _super);
        function RxBooleanFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType;
            return _this;
        }
        RxBooleanFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            // Adding controls specific to boolean field to Details section
            inspectorConfig[1].controls.push({
                name: 'defaultValue',
                component: i11.SelectFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    emptyOption: true,
                    options: [
                        {
                            id: '0',
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.true')
                        },
                        {
                            id: '1',
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.false')
                        }
                    ]
                }
            });
            return inspectorConfig;
        };
        return RxBooleanFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxBooleanFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxBooleanFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxBooleanFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxCharacterFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxCharacterFieldDefinitionService, _super);
        function RxCharacterFieldDefinitionService(injector, rxNumberUtilsService) {
            var _this = _super.call(this, injector) || this;
            _this.rxNumberUtilsService = rxNumberUtilsService;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.character.resourceType;
            return _this;
        }
        RxCharacterFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            if (this.rxFieldDefinitionInspectorHelperService.isStoreEncryptedVisible(fieldModel, definitionModel)) {
                inspectorConfig[1].controls.push({
                    name: 'shouldPersistEncrypted',
                    component: i11.SwitchFormControlComponent,
                    isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isStoreEncryptedEditable(fieldModel),
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.store-encrypted.label')
                    }
                });
            }
            if (this.rxFieldDefinitionInspectorHelperService.isStoreHashedVisible(fieldModel, definitionModel)) {
                inspectorConfig[1].controls.push({
                    name: 'shouldPersistHashed',
                    component: i11.SwitchFormControlComponent,
                    isDisabled: isReadOnly ||
                        !this.rxFieldDefinitionInspectorHelperService.isStoreHashedEditable(fieldModel, definitionModel),
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.store-hashed.label')
                    }
                });
            }
            inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
                {
                    name: 'namedListDefinition',
                    component: i11.RxDefinitionPickerComponent,
                    isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isNamedListEditable(fieldModel, definitionModel),
                    options: {
                        definitionType: i11.RxDefinitionPickerType.NamedList,
                        label: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.named-list.label')
                    }
                },
                {
                    name: 'maxLength',
                    component: i11.CounterFormControlComponent,
                    isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isLengthEditable(fieldModel, definitionModel),
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.length.label'),
                        tooltip: fieldModel.id === i3.RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                            !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                            !fieldModel.isNewField
                            ? this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.display-id.length.tooltip')
                            : undefined,
                        allowIntegerOnly: true,
                        minValue: 0
                    }
                },
                {
                    name: 'defaultValue',
                    component: i11.TextFormControlComponent,
                    isDisabled: isReadOnly ||
                        !this.rxFieldDefinitionInspectorHelperService.isDefaultValueEditable(fieldModel, definitionModel),
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                        tooltip: fieldModel.id === i3.RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                            !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                            !fieldModel.isNewField
                            ? new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.display-id.default-value.tooltip'))
                            : undefined,
                        allowIntegerOnly: true
                    }
                },
                {
                    name: 'pattern',
                    component: i11.SelectFormControlComponent,
                    isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel),
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.label'),
                        emptyOption: true,
                        options: [
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.alphabetical.label'),
                                id: '$ALPHA$'
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.alphanumeric.label'),
                                id: '$ALNUM$'
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.lowercase.label'),
                                id: '$LOWER$'
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.named-list.label'),
                                id: '$NAMEDLIST$'
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.numeric.label'),
                                id: '$DIGIT$'
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.uppercase.label'),
                                id: '$UPPER$'
                            }
                        ]
                    }
                }
            ]);
            return inspectorConfig;
        };
        RxCharacterFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel, definitionModel);
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxLength) && Number(fieldModel.maxLength) < 0) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                    data: {
                        propertyName: 'maxLength',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.id === i3.RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                (this.rxRecordDefinitionService.isRegularRecord(definitionModel) ||
                    this.rxRecordDefinitionService.isExternalRecord(definitionModel))) {
                if (!(fieldModel.maxLength === 1 || lodash.inRange(fieldModel.maxLength, 5, 16))) {
                    validationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-max-length.message'),
                        data: {
                            propertyName: 'maxLength',
                            guid: fieldModel.guid
                        }
                    });
                }
                if ((fieldModel.maxLength !== 1 && fieldModel.maxLength <= lodash.size(fieldModel.defaultValue)) ||
                    (fieldModel.maxLength === 1 && lodash.size(fieldModel.defaultValue) >= 15)) {
                    validationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-display-id-range.message'),
                        data: {
                            propertyName: 'maxLength',
                            guid: fieldModel.guid
                        }
                    });
                }
            }
            return validationIssues;
        };
        return RxCharacterFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxCharacterFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCharacterFieldDefinitionService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$2.RxNumberUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCharacterFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCharacterFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCharacterFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$2.RxNumberUtilsService }]; } });

    var LocalizedCharacterFieldEditorComponent = /** @class */ (function (_super) {
        __extends(LocalizedCharacterFieldEditorComponent, _super);
        function LocalizedCharacterFieldEditorComponent(rxModalService, translateService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            return _this;
        }
        LocalizedCharacterFieldEditorComponent.prototype.localize = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.title'),
                data: {
                    valueByLocale: Object.assign({}, this.value),
                    hideCurrentLocale: true,
                    isReadOnly: this.options.isReadOnly
                },
                size: 'sm',
                content: i11.LocalizedCharacterFieldValueModalComponent
            })
                .then(function (data) {
                if (data) {
                    _this.value = data.valueByLocale;
                }
            })
                .catch(lodash.noop);
        };
        return LocalizedCharacterFieldEditorComponent;
    }(i11.ValueAccessor));
    LocalizedCharacterFieldEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LocalizedCharacterFieldEditorComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    LocalizedCharacterFieldEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldEditorComponent, selector: "rx-localized-character-field-editor", inputs: { options: "options" }, providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: LocalizedCharacterFieldEditorComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<div>\n  <button\n    type=\"button\"\n    class=\"localize-button btn btn-link focusable d-icon-left-pencil p-0 float-end\"\n    (click)=\"localize()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.button.localize.label' | translate }}\n  </button>\n\n  <div class=\"pl-1\">{{ value['en-US'] }}</div>\n</div>\n", pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LocalizedCharacterFieldEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-localized-character-field-editor',
                        templateUrl: './localized-character-field-editor.component.html',
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: LocalizedCharacterFieldEditorComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i2__namespace.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RxLocalizedCharacterFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxLocalizedCharacterFieldDefinitionService, _super);
        function RxLocalizedCharacterFieldDefinitionService(injector, rxNumberUtilsService) {
            var _this = _super.call(this, injector) || this;
            _this.rxNumberUtilsService = rxNumberUtilsService;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType;
            return _this;
        }
        RxLocalizedCharacterFieldDefinitionService.prototype.getNewFieldDefinitionModel = function (fieldProperties) {
            return _super.prototype.getNewFieldDefinitionModel.call(this, Object.assign(Object.assign({}, fieldProperties), { maxLength: 254 }));
        };
        RxLocalizedCharacterFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
                {
                    name: 'maxLength',
                    component: i11.CounterFormControlComponent,
                    isDisabled: isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.length.label'),
                        minValue: 0,
                        maxValue: 254,
                        allowIntegerOnly: true
                    }
                },
                {
                    name: 'defaultValueByLocale',
                    component: LocalizedCharacterFieldEditorComponent,
                    options: {
                        isReadOnly: isReadOnly
                    }
                }
            ]);
            return inspectorConfig;
        };
        RxLocalizedCharacterFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel, definitionModel);
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxLength) && Number(fieldModel.maxLength) < 0) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                    data: {
                        propertyName: 'maxLength',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return RxLocalizedCharacterFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxLocalizedCharacterFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldDefinitionService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$2.RxNumberUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLocalizedCharacterFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocalizedCharacterFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$2.RxNumberUtilsService }]; } });

    var RxDateTimeFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxDateTimeFieldDefinitionService, _super);
        function RxDateTimeFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType;
            return _this;
        }
        RxDateTimeFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            // Adding controls specific to date only field to Details section
            inspectorConfig[1].controls.push({
                name: 'defaultValue',
                component: i11.DateTimeFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        return RxDateTimeFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxDateTimeFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateTimeFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDateTimeFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateTimeFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateTimeFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxDateOnlyFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxDateOnlyFieldDefinitionService, _super);
        function RxDateOnlyFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType;
            return _this;
        }
        RxDateOnlyFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            // Adding controls specific to date only field to Details section
            inspectorConfig[1].controls.push({
                name: 'defaultValue',
                isDisabled: isReadOnly,
                component: i11.DateFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        return RxDateOnlyFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxDateOnlyFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateOnlyFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDateOnlyFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateOnlyFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDateOnlyFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxTimeOnlyFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxTimeOnlyFieldDefinitionService, _super);
        function RxTimeOnlyFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType;
            return _this;
        }
        RxTimeOnlyFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            inspectorConfig[1].controls.push({
                name: 'defaultValue',
                isDisabled: isReadOnly,
                component: i11.TimeFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        return RxTimeOnlyFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxTimeOnlyFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxTimeOnlyFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxTimeOnlyFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxTimeOnlyFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxTimeOnlyFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxNumericFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxNumericFieldDefinitionService, _super);
        function RxNumericFieldDefinitionService(injector, rxNumberUtilsService) {
            var _this = _super.call(this, injector) || this;
            _this.rxNumberUtilsService = rxNumberUtilsService;
            return _this;
        }
        RxNumericFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel, definitionModel);
            if (fieldModel.defaultValue && Number(fieldModel.defaultValue) < this.minValue) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                        minValue: this.minValue
                    }),
                    data: {
                        propertyName: 'defaultValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.defaultValue && Number(fieldModel.defaultValue) > this.maxValue) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                        maxValue: this.maxValue
                    }),
                    data: {
                        propertyName: 'defaultValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.minValue && Number(fieldModel.minValue) < this.minValue) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                        minValue: this.minValue
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.minValue && Number(fieldModel.minValue) > this.maxValue) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                        maxValue: this.maxValue
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.maxValue && Number(fieldModel.maxValue) < this.minValue) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                        minValue: this.minValue
                    }),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.maxValue && Number(fieldModel.maxValue) > this.maxValue) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                        maxValue: this.maxValue
                    }),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
                this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
                Number(fieldModel.defaultValue) >= this.minValue &&
                Number(fieldModel.defaultValue) < Number(fieldModel.minValue)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                        minValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                    }),
                    data: {
                        propertyName: 'defaultValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
                this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
                Number(fieldModel.defaultValue) <= this.maxValue &&
                Number(fieldModel.defaultValue) > Number(fieldModel.maxValue)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                        maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                    }),
                    data: {
                        propertyName: 'defaultValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
                this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
                Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                        maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (lodash.isNil(fieldModel.minValue)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (lodash.isNil(fieldModel.maxValue)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                    }),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.resourceType !== i3.RX_RECORD_DEFINITION.dataTypes.integer.resourceType && lodash.isNil(fieldModel.precision)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.precision.label')
                    }),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        RxNumericFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            // Adding controls specific to decimal field to Details section
            inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
                {
                    name: 'precision',
                    component: i11.CounterFormControlComponent,
                    isDisabled: isReadOnly,
                    options: lodash.omitBy({
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.precision.label'),
                        required: true,
                        allowIntegerOnly: true,
                        minValue: this.minPrecision,
                        maxValue: this.maxPrecision
                    }, lodash.isNil)
                },
                {
                    name: 'minValue',
                    component: i11.CounterFormControlComponent,
                    isDisabled: isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                        required: true,
                        allowIntegerOnly: this.allowOnlyInteger,
                        minValue: this.minValue,
                        maxValue: this.maxValue
                    }
                },
                {
                    name: 'maxValue',
                    component: i11.CounterFormControlComponent,
                    isDisabled: isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                        required: true,
                        allowIntegerOnly: this.allowOnlyInteger,
                        minValue: this.minValue,
                        maxValue: this.maxValue
                    }
                },
                {
                    name: 'defaultValue',
                    component: i11.CounterFormControlComponent,
                    isDisabled: isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                        allowIntegerOnly: this.allowOnlyInteger,
                        minValue: this.minValue,
                        maxValue: this.maxValue
                    }
                }
            ]);
            return inspectorConfig;
        };
        return RxNumericFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxNumericFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNumericFieldDefinitionService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$2.RxNumberUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxNumericFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNumericFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNumericFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$2.RxNumberUtilsService }]; } });

    var RxIntegerFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxIntegerFieldDefinitionService, _super);
        function RxIntegerFieldDefinitionService() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.integer.resourceType;
            _this.minPrecision = null;
            _this.maxPrecision = null;
            _this.minValue = i1$2.RX_NUMBER.minInteger;
            _this.maxValue = i1$2.RX_NUMBER.maxInteger;
            _this.allowOnlyInteger = true;
            return _this;
        }
        RxIntegerFieldDefinitionService.prototype.getNewFieldDefinitionModel = function (fieldProperties) {
            return _super.prototype.getNewFieldDefinitionModel.call(this, Object.assign(Object.assign({}, fieldProperties), { minValue: this.minValue, maxValue: this.maxValue }));
        };
        RxIntegerFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            // Removing Precision control not required for integer field
            inspectorConfig[1].controls.splice(7, 1);
            return inspectorConfig;
        };
        return RxIntegerFieldDefinitionService;
    }(RxNumericFieldDefinitionService));
    RxIntegerFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIntegerFieldDefinitionService, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxIntegerFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIntegerFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxIntegerFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxDecimalFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxDecimalFieldDefinitionService, _super);
        function RxDecimalFieldDefinitionService() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType;
            _this.minPrecision = 0;
            _this.maxPrecision = 9;
            _this.minValue = i1$2.RX_NUMBER.minDecimal;
            _this.maxValue = i1$2.RX_NUMBER.maxDecimal;
            _this.allowOnlyInteger = false;
            return _this;
        }
        RxDecimalFieldDefinitionService.prototype.getNewFieldDefinitionModel = function (fieldProperties) {
            return _super.prototype.getNewFieldDefinitionModel.call(this, Object.assign(Object.assign({}, fieldProperties), { precision: 2, minValue: this.minValue, maxValue: this.maxValue }));
        };
        RxDecimalFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel, definitionModel);
            if (!lodash.inRange(fieldModel.precision, this.minPrecision, this.maxPrecision + 1)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-precision-range.message', {
                        min: this.minPrecision,
                        max: this.maxPrecision
                    }),
                    data: {
                        propertyName: 'precision',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return RxDecimalFieldDefinitionService;
    }(RxNumericFieldDefinitionService));
    RxDecimalFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDecimalFieldDefinitionService, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDecimalFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDecimalFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDecimalFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxRealFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxRealFieldDefinitionService, _super);
        function RxRealFieldDefinitionService() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.real.resourceType;
            _this.maxPrecision = null;
            _this.minValue = -1.845e19;
            _this.maxValue = 1.845e19;
            _this.allowOnlyInteger = false;
            _this.AR_PRECISION_NONE = -1;
            return _this;
        }
        RxRealFieldDefinitionService.prototype.getNewFieldDefinitionModel = function (fieldProperties) {
            return _super.prototype.getNewFieldDefinitionModel.call(this, Object.assign(Object.assign({}, fieldProperties), { precision: 6, minValue: this.minValue, maxValue: this.maxValue }));
        };
        RxRealFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel, definitionModel);
            if (!isFinite(fieldModel.precision) ||
                (fieldModel.precision < 1 && fieldModel.precision != this.AR_PRECISION_NONE)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-real-field-precision-range.message'),
                    data: {
                        propertyName: 'precision',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return RxRealFieldDefinitionService;
    }(RxNumericFieldDefinitionService));
    RxRealFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRealFieldDefinitionService, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRealFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRealFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRealFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxSelectionFieldDefinitionService = /** @class */ (function (_super) {
        __extends(RxSelectionFieldDefinitionService, _super);
        function RxSelectionFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.resourceType = i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType;
            return _this;
        }
        RxSelectionFieldDefinitionService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, fieldModel, definitionModel, isReadOnly);
            inspectorConfig[1].controls.push({
                name: 'selectionFieldOptionProperties',
                component: i11.SelectionFieldOptionsComponent,
                options: {
                    isReadOnly: !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel)
                }
            });
            return inspectorConfig;
        };
        RxSelectionFieldDefinitionService.prototype.validate = function (fieldModel, definitionModel) {
            var _a;
            var validationIssues = _super.prototype.validate.call(this, fieldModel, definitionModel);
            if (lodash.isEmpty((_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById)) {
                validationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.options.label') }),
                    data: {
                        propertyName: 'selectionFieldOptionProperties',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return RxSelectionFieldDefinitionService;
    }(RxBaseFieldDefinitionService));
    RxSelectionFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSelectionFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSelectionFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxFieldDefinitionManagerService = /** @class */ (function () {
        function RxFieldDefinitionManagerService(rxAttachmentFieldDefinitionService, rxBooleanFieldDefinitionService, rxCharacterFieldDefinitionService, rxLocalizedCharacterFieldDefinitionService, rxDateTimeFieldDefinitionService, rxDateOnlyFieldDefinitionService, rxTimeOnlyFieldDefinitionService, rxIntegerFieldDefinitionService, rxDecimalFieldDefinitionService, rxRealFieldDefinitionService, rxSelectionFieldDefinitionService) {
            this.fieldServices = new Map();
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType, rxAttachmentFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, rxBooleanFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.character.resourceType, rxCharacterFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType, rxLocalizedCharacterFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType, rxDateTimeFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType, rxDateOnlyFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType, rxTimeOnlyFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.integer.resourceType, rxIntegerFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType, rxDecimalFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.real.resourceType, rxRealFieldDefinitionService);
            this.fieldServices.set(i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType, rxSelectionFieldDefinitionService);
        }
        RxFieldDefinitionManagerService.prototype.getNewFieldDefinitionModel = function (resourceType, fieldProperties) {
            return this.fieldServices.get(resourceType).getNewFieldDefinitionModel(fieldProperties);
        };
        RxFieldDefinitionManagerService.prototype.getFieldInspectorConfig = function (fieldModel, definitionModel, isReadOnly) {
            return this.fieldServices
                .get(fieldModel.resourceType)
                .getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        };
        RxFieldDefinitionManagerService.prototype.validate = function (fieldModel, definitionModel) {
            return this.fieldServices.get(fieldModel.resourceType).validate(fieldModel, definitionModel);
        };
        return RxFieldDefinitionManagerService;
    }());
    RxFieldDefinitionManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionManagerService, deps: [{ token: RxAttachmentFieldDefinitionService }, { token: RxBooleanFieldDefinitionService }, { token: RxCharacterFieldDefinitionService }, { token: RxLocalizedCharacterFieldDefinitionService }, { token: RxDateTimeFieldDefinitionService }, { token: RxDateOnlyFieldDefinitionService }, { token: RxTimeOnlyFieldDefinitionService }, { token: RxIntegerFieldDefinitionService }, { token: RxDecimalFieldDefinitionService }, { token: RxRealFieldDefinitionService }, { token: RxSelectionFieldDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFieldDefinitionManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionManagerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionManagerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxAttachmentFieldDefinitionService }, { type: RxBooleanFieldDefinitionService }, { type: RxCharacterFieldDefinitionService }, { type: RxLocalizedCharacterFieldDefinitionService }, { type: RxDateTimeFieldDefinitionService }, { type: RxDateOnlyFieldDefinitionService }, { type: RxTimeOnlyFieldDefinitionService }, { type: RxIntegerFieldDefinitionService }, { type: RxDecimalFieldDefinitionService }, { type: RxRealFieldDefinitionService }, { type: RxSelectionFieldDefinitionService }]; } });

    var RecordInheritanceEditorComponent = /** @class */ (function (_super) {
        __extends(RecordInheritanceEditorComponent, _super);
        function RecordInheritanceEditorComponent(translateService, rxFieldDefinitionManagerService, rxRecordDefinitionCacheService, rxNotificationService, rxGuidService, rxFieldDefinitionService) {
            var _this = _super.call(this) || this;
            _this.translateService = translateService;
            _this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
            _this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            _this.rxNotificationService = rxNotificationService;
            _this.rxGuidService = rxGuidService;
            _this.rxFieldDefinitionService = rxFieldDefinitionService;
            _this.inheritanceDescriptor = {
                inheritingFrom: '',
                isInheritingRules: true,
                isInheritingFieldPermissions: true,
                isInheritingAssociations: true,
                isInheritingFieldAuditOptions: true
            };
            _this.recordDefinitionPickerOptions = {
                label: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.record-to-inherit.label'),
                definitionType: i11.RxDefinitionPickerType.InheritableRecord,
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i11.RxDefinitionPickerScope.Bundle, i11.RxDefinitionPickerScope.All],
                    search: i11.RxDefinitionPickerScope.All
                }
            };
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.isReadOnlySubject = new rxjs.BehaviorSubject(false);
            _this.isSharedInstanceStorageLockedSubject = new rxjs.BehaviorSubject(true);
            _this.inheritingFromSubject = new rxjs.BehaviorSubject('');
            _this.isMakeFinalDisabledSubject = new rxjs.BehaviorSubject(false);
            _this.isSharedInstanceStorageDisabled$ = rxjs.combineLatest([
                _this.isReadOnlySubject,
                _this.isSharedInstanceStorageLockedSubject
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), isReadOnly = _c[0], isSharedInstanceStorage = _c[1];
                return isReadOnly || isSharedInstanceStorage;
            }));
            _this.inheritFromRecordDefinition$ = _this.inheritingFromSubject.pipe(operators.switchMap(function (recordDefinitionName) { return rxjs.iif(function () { return Boolean(recordDefinitionName); }, _this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName), rxjs.of(null)); }), operators.tap(function (recordDefinition) {
                if (recordDefinition) {
                    _this.inheritFromRecordDefinition = recordDefinition;
                    _this.isInheritingCoreFields = false;
                    if (recordDefinition.isSharedInstanceStorage) {
                        _this.inheritanceOptions.isSharedInstanceStorage = true;
                        _this.updateInheritanceOptions();
                        _this.state.inheritCoreFieldsAutomatically = true;
                        _this.isInheritingCoreFields = true;
                    }
                    else {
                        if (_this.isNew) {
                            _this.inheritanceOptions.isSharedInstanceStorage = false;
                        }
                        _this.state.inheritCoreFieldsAutomatically = false;
                    }
                    _this.inheritanceDescriptor.isInheritingRules = true;
                    _this.inheritedFieldDefinitions = _this.getInheritedFieldDefinitions(recordDefinition);
                    lodash.forEach(recordDefinition.securityLabels, function (securityLabel) {
                        securityLabel.inherited = true;
                    });
                    _this.setValue();
                }
            }));
            _this.isCoreFieldsOptionDisabled$ = rxjs.combineLatest([_this.isReadOnlySubject, _this.inheritFromRecordDefinition$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), isReadOnly = _c[0], inheritingFromRecordDefinition = _c[1];
                return !_this.inheritFrom ||
                    isReadOnly ||
                    _this.state.inheritCoreFieldsAutomatically ||
                    _this.state.lockCoreFieldInheritanceOption;
            }));
            _this.vm$ = rxjs.combineLatest([
                _this.isReadOnlySubject,
                _this.isSharedInstanceStorageDisabled$,
                _this.isMakeFinalDisabledSubject,
                _this.isCoreFieldsOptionDisabled$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 4), isReadOnly = _c[0], isSharedInstanceStorageDisabled = _c[1], isMakeFinalDisabled = _c[2], isCoreFieldsOptionDisabled = _c[3];
                return ({
                    isReadOnly: isReadOnly,
                    isSharedInstanceStorageDisabled: isSharedInstanceStorageDisabled,
                    isMakeFinalDisabled: isMakeFinalDisabled,
                    isCoreFieldsOptionDisabled: isCoreFieldsOptionDisabled
                });
            }));
            return _this;
        }
        RecordInheritanceEditorComponent.prototype.ngOnInit = function () {
            if (this.options) {
                this.updateValues();
            }
        };
        RecordInheritanceEditorComponent.prototype.updateInheritanceOptions = function () {
            this.isMakeFinalDisabledSubject.next(this.isReadOnlySubject.value ||
                (this.inheritanceOptions.isSharedInstanceStorage && !this.inheritingFromSubject.value));
            if (this.inheritanceOptions.isSharedInstanceStorage &&
                this.inheritanceOptions.isFinal &&
                !this.inheritFromRecordDefinition) {
                this.inheritanceOptions.isFinal = false;
            }
        };
        RecordInheritanceEditorComponent.prototype.onInheritanceOptionsChange = function () {
            this.updateInheritanceOptions();
            this.setValue();
        };
        RecordInheritanceEditorComponent.prototype.onInheritanceDescriptorChange = function () {
            if (this.inheritanceDescriptor.isInheritingFieldPermissions) {
                this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(this.inheritFromRecordDefinition);
            }
            this.setValue();
        };
        RecordInheritanceEditorComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options) {
                this.updateValues();
            }
        };
        RecordInheritanceEditorComponent.prototype.onRecordDefinitionNameChange = function (recordDefinitionName) {
            this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inherited-fields-remaining-info.message'));
            if (recordDefinitionName) {
                this.inheritingFromSubject.next(recordDefinitionName);
            }
            else {
                this.inheritedFieldDefinitions = [];
                this.setValue();
            }
        };
        RecordInheritanceEditorComponent.prototype.onInheritCoreFieldsChange = function () {
            this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(this.inheritFromRecordDefinition);
            this.setValue();
        };
        RecordInheritanceEditorComponent.prototype.getInheritedFieldDefinitions = function (recordDefinition) {
            var _this = this;
            var _a;
            var newFieldProperties = lodash.union(lodash.keys(this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(i3.RX_RECORD_DEFINITION.resourceTypes.character, null)), [
                'isInherited',
                'anyUserAllowedToSubmit',
                'displayType',
                'explicitPermissions',
                'fieldMapping',
                'fieldTypeName',
                'maxLength',
                'maxSize',
                'maxValue',
                'minValue',
                'namedListDefinition',
                'optionNamesById',
                'optionLabelsById',
                'precision',
                'resourceType',
                'searchable',
                'shouldPersistEncrypted',
                'shouldPersistHashed',
                'tags',
                'version'
            ]);
            if ((_a = this.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.isInheritingFieldPermissions) {
                newFieldProperties.push('permissions');
            }
            var inheritedFieldDefinitions = lodash.map(recordDefinition.fieldDefinitions, function (fieldDefinition) {
                fieldDefinition.isInherited = true;
                return Object.assign(Object.assign({}, lodash.pick(fieldDefinition, newFieldProperties)), { guid: _this.rxGuidService.generate(), isCoreField: _this.rxFieldDefinitionService.isCoreField(fieldDefinition), selectionFieldOptionProperties: fieldDefinition.resourceType === i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? {
                            defaultValue: null,
                            optionNamesById: fieldDefinition.optionNamesById,
                            optionLabelsById: fieldDefinition.optionLabelsById
                        }
                        : null });
            });
            if (!this.isInheritingCoreFields) {
                lodash.remove(inheritedFieldDefinitions, function (fieldDefinition) {
                    return lodash.includes(i3.RX_RECORD_DEFINITION.arCoreFieldIds, fieldDefinition.id);
                });
            }
            return inheritedFieldDefinitions;
        };
        RecordInheritanceEditorComponent.prototype.updateValues = function () {
            var _this = this;
            var _a;
            if (this.options) {
                var recordDefinition_1 = this.options.recordDefinition;
                this.inheritanceOptions = Object.assign({}, recordDefinition_1.recordInheritanceSelector.inheritanceOptions);
                if (recordDefinition_1.recordInheritanceSelector.inheritanceDescriptor) {
                    this.inheritanceDescriptor = Object.assign({}, recordDefinition_1.recordInheritanceSelector.inheritanceDescriptor);
                    this.inheritFrom = this.inheritanceDescriptor.inheritingFrom;
                }
                this.isNew = !recordDefinition_1.lastUpdateTime;
                this.isReadOnlySubject.next(this.options.isReadOnly);
                this.isSharedInstanceStorageLockedSubject.next(!this.isNew || !lodash.isEmpty(this.inheritFrom));
                if ((_a = recordDefinition_1.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom) {
                    this.isSharedInstanceStorageLockedSubject.next(true);
                    this.rxRecordDefinitionCacheService
                        .getRecordDefinition(recordDefinition_1.inheritanceDescriptor.inheritingFrom)
                        .pipe(operators.take(1))
                        .subscribe(function (inheritFromRecordDefinition) {
                        if (inheritFromRecordDefinition.isSharedInstanceStorage) {
                            _this.state.inheritCoreFieldsAutomatically = true;
                            _this.isInheritingCoreFields = true;
                        }
                        else {
                            var fieldDefinitions = recordDefinition_1.fields;
                            _this.isInheritingCoreFields = lodash.some(fieldDefinitions, function (fieldDefinition) {
                                return fieldDefinition.isInherited && lodash.includes(i3.RX_RECORD_DEFINITION.arCoreFieldIds, fieldDefinition.id);
                            });
                        }
                    });
                }
                this.state = {
                    editMode: !this.isNew,
                    inheritCoreFieldsAutomatically: false,
                    lockCoreFieldInheritanceOption: !this.isNew
                };
            }
        };
        RecordInheritanceEditorComponent.prototype.setValue = function () {
            this.value = {
                inheritanceOptions: this.inheritanceOptions,
                inheritanceDescriptor: this.inheritFrom
                    ? Object.assign(Object.assign({}, this.inheritanceDescriptor), { inheritingFrom: this.inheritFrom }) : null,
                isInheritingCoreFields: this.inheritFrom ? this.isInheritingCoreFields : null,
                inheritedFieldDefinitions: this.inheritedFieldDefinitions
            };
        };
        RecordInheritanceEditorComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.isReadOnlySubject.complete();
            this.isSharedInstanceStorageLockedSubject.complete();
            this.inheritingFromSubject.complete();
            this.isMakeFinalDisabledSubject.complete();
        };
        return RecordInheritanceEditorComponent;
    }(i11.ValueAccessor));
    RecordInheritanceEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInheritanceEditorComponent, deps: [{ token: i2__namespace.TranslateService }, { token: RxFieldDefinitionManagerService }, { token: i3__namespace.RxRecordDefinitionCacheService }, { token: i2__namespace$1.RxNotificationService }, { token: i1__namespace$2.RxGuidService }, { token: i3__namespace.RxFieldDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordInheritanceEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordInheritanceEditorComponent, selector: "rx-record-inheritance-selector", inputs: { options: "options" }, providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: RecordInheritanceEditorComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <adapt-rx-checkbox\n    label=\"{{\n      'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.share-data-with-inheritors.label' | translate\n    }}\"\n    [(ngModel)]=\"inheritanceOptions.isSharedInstanceStorage\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isSharedInstanceStorageDisabled\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content:\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.share-data-with-inheritors.tooltip'\n        | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <adapt-rx-checkbox\n    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-abstract.label' | translate }}\"\n    [(ngModel)]=\"inheritanceOptions.isAbstract\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isReadOnly\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-abstract.tooltip' | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <adapt-rx-checkbox\n    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-final.label' | translate }}\"\n    [(ngModel)]=\"inheritanceOptions.isFinal\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isMakeFinalDisabled || vm.isReadOnly\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-final.tooltip' | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <rx-definition-picker\n    class=\"form-group d-block\"\n    name=\"inherit-from\"\n    rx-id=\"record-definition-name-field\"\n    [options]=\"recordDefinitionPickerOptions\"\n    [(ngModel)]=\"inheritFrom\"\n    (ngModelChange)=\"onRecordDefinitionNameChange($event)\"\n    [disabled]=\"vm.isReadOnly\"\n  >\n  </rx-definition-picker>\n\n  <div *ngIf=\"inheritFrom\">\n    <label>\n      <span>{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inherit.label' | translate }}</span>\n    </label>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.core-fields.label' | translate }}\"\n      [(ngModel)]=\"isInheritingCoreFields\"\n      (ngModelChange)=\"onInheritCoreFieldsChange()\"\n      [disabled]=\"vm.isCoreFieldsOptionDisabled\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.rules.label' | translate }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingRules\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.field-permissions.label' | translate\n      }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingFieldPermissions\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.associations.label' | translate }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingAssociations\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.audit-field-properties.label' | translate\n      }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingFieldAuditOptions\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n  </div>\n</ng-container>\n", components: [{ type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i11__namespace.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInheritanceEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-inheritance-selector',
                        templateUrl: './record-inheritance-editor.component.html',
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: RecordInheritanceEditorComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.TranslateService }, { type: RxFieldDefinitionManagerService }, { type: i3__namespace.RxRecordDefinitionCacheService }, { type: i2__namespace$1.RxNotificationService }, { type: i1__namespace$2.RxGuidService }, { type: i3__namespace.RxFieldDefinitionService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RecordInheritanceEditorModule = /** @class */ (function () {
        function RecordInheritanceEditorModule() {
        }
        return RecordInheritanceEditorModule;
    }());
    RecordInheritanceEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInheritanceEditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RecordInheritanceEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInheritanceEditorModule, declarations: [RecordInheritanceEditorComponent], imports: [i5.CommonModule,
            i6.FormsModule,
            i1$1.AdaptTooltipModule,
            i1$1.AdaptRxSelectModule,
            i1$1.AdaptButtonModule,
            obsolete.AdaptCheckbox2Module,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptRxCheckboxModule,
            i6.ReactiveFormsModule,
            i2$1.TranslateModule,
            i4.AdaptTableModule,
            i11.RxDefinitionPickerModule], exports: [RecordInheritanceEditorComponent] });
    RecordInheritanceEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInheritanceEditorModule, imports: [[
                i5.CommonModule,
                i6.FormsModule,
                i1$1.AdaptTooltipModule,
                i1$1.AdaptRxSelectModule,
                i1$1.AdaptButtonModule,
                obsolete.AdaptCheckbox2Module,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptRxCheckboxModule,
                i6.ReactiveFormsModule,
                i2$1.TranslateModule,
                i4.AdaptTableModule,
                i11.RxDefinitionPickerModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordInheritanceEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RecordInheritanceEditorComponent],
                        exports: [RecordInheritanceEditorComponent],
                        entryComponents: [RecordInheritanceEditorComponent],
                        imports: [
                            i5.CommonModule,
                            i6.FormsModule,
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptRxSelectModule,
                            i1$1.AdaptButtonModule,
                            obsolete.AdaptCheckbox2Module,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptRxCheckboxModule,
                            i6.ReactiveFormsModule,
                            i2$1.TranslateModule,
                            i4.AdaptTableModule,
                            i11.RxDefinitionPickerModule
                        ]
                    }]
            }] });

    var SearchFieldEditorModalStore = /** @class */ (function (_super) {
        __extends(SearchFieldEditorModalStore, _super);
        function SearchFieldEditorModalStore() {
            var _this = _super.call(this, {
                searchFields: [],
                isDirty: false,
                isCategoryVisible: true,
                isValid: true,
                availableFields: [],
                searchDefinition: {}
            }) || this;
            _this.searchFields$ = _this.select(function (state) { return state.searchFields; });
            _this.availableFields$ = _this.select(function (state) { return state.availableFields; });
            _this.isDirty$ = _this.select(function (state) { return state.isDirty; });
            _this.isValid$ = _this.select(function (state) { return state.isValid; });
            _this.vm$ = _this.select(_this.availableFields$, _this.searchFields$, _this.isDirty$, _this.isValid$, function (availableFields, searchFields, isDirty, isValid) { return ({
                availableFields: availableFields,
                searchFields: searchFields,
                isDirty: isDirty,
                isValid: isValid
            }); });
            _this.toggleOpen = _this.updater(function (state, toggleValue) {
                var searchFieldItems = __spreadArray([], __read(state.searchFields));
                searchFieldItems.forEach(function (control) {
                    control.get('isOpen').setValue(toggleValue);
                });
                return Object.assign(Object.assign({}, state), { searchFields: searchFieldItems });
            });
            _this.updateFields = _this.updater(function (state, field) { return (Object.assign(Object.assign({}, state), { searchFields: __spreadArray(__spreadArray([], __read(state.searchFields)), [field]), isValid: false })); });
            _this.updateAvailableFields = _this.updater(function (state, field) {
                var updatedSearchFields = __spreadArray([], __read(state.searchFields));
                updatedSearchFields.forEach(function (control) {
                    control
                        .get('isCategoryVisible')
                        .setValue(lodash.find(state.availableFields, { id: field.id }).resourceType !== i3.RX_RECORD_DEFINITION.resourceTypes.attachment);
                });
                return Object.assign(Object.assign({}, state), { availableFields: state.availableFields.filter(function (availableField) { return availableField.id !== field.id; }), isDirty: true, searchFields: updatedSearchFields, isValid: !state.searchFields.some(function (form) { return form.invalid; }) });
            });
            _this.removeSearchField = _this.updater(function (state, fieldIndex) { return (Object.assign(Object.assign({}, state), { isDirty: true, searchFields: state.searchFields.filter(function (field, index) { return fieldIndex !== index; }), isValid: !state.searchFields.some(function (form) { return form.invalid; }) })); });
            _this.markDirty = _this.updater(function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true, isValid: !state.searchFields.some(function (form) { return form.invalid; }) })); });
            return _this;
        }
        return SearchFieldEditorModalStore;
    }(componentStore.ComponentStore));
    SearchFieldEditorModalStore.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModalStore, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    SearchFieldEditorModalStore.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModalStore });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModalStore, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var SearchFieldEditorModalComponent = /** @class */ (function (_super) {
        __extends(SearchFieldEditorModalComponent, _super);
        function SearchFieldEditorModalComponent(searchFieldsEditorModalStore, activeModalRef, formBuilder, injector, rxFieldDefinitionService) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.searchFieldsEditorModalStore = searchFieldsEditorModalStore;
            _this.activeModalRef = activeModalRef;
            _this.formBuilder = formBuilder;
            _this.injector = injector;
            _this.rxFieldDefinitionService = rxFieldDefinitionService;
            _this.vm$ = _this.searchFieldsEditorModalStore.vm$;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.recordDefinition = _this.activeModalRef.getData().recordDefinition;
            _this.isReadOnly = _this.activeModalRef.getData().isReadOnly;
            return _this;
        }
        SearchFieldEditorModalComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        SearchFieldEditorModalComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.searchFieldsEditorModalStore.isDirty$.pipe(operators.filter(Boolean), operators.take(1)).subscribe(function () {
                _this.markAsDirty();
            });
            var searchFields = this.activeModalRef.getData().searchFields.map(function (searchField, index) { return _this.formBuilder.group({
                id: searchField.id,
                searchFieldName: [[searchField], i6.Validators.required],
                category: searchField.searchDefinition.searchCategoryName,
                isOpen: searchField.id === _this.activeModalRef.getData().searchFieldIndex,
                isCategoryVisible: searchField.resourceType !== i3.RX_RECORD_DEFINITION.resourceTypes.attachment,
                searchDefinition: searchField.searchDefinition
            }); });
            var availableFields = this.recordDefinition.fields
                .filter(function (fieldDefinition) { return _this.rxFieldDefinitionService.isSearchable(fieldDefinition, _this.recordDefinition); })
                .filter(function (fieldDefinition) { return searchFields.every(function (searchField) { return searchField.get('id').value !== fieldDefinition.id; }); });
            this.searchFieldsEditorModalStore.patchState({ searchFields: searchFields, availableFields: availableFields });
        };
        SearchFieldEditorModalComponent.prototype.optionFormatter = function (selectOption) {
            return selectOption.name;
        };
        SearchFieldEditorModalComponent.prototype.toggleOpen = function (toggleValue) {
            this.searchFieldsEditorModalStore.toggleOpen(toggleValue);
        };
        SearchFieldEditorModalComponent.prototype.addNewSearchField = function () {
            this.searchFieldsEditorModalStore.updateFields(this.formBuilder.group({
                id: '',
                searchFieldName: [[], i6.Validators.required],
                category: '',
                isOpen: true,
                isCategoryVisible: true,
                searchDefinition: {
                    enableFTSSearch: false,
                    enableCognitiveSearch: false
                }
            }));
        };
        SearchFieldEditorModalComponent.prototype.onSelectedFieldChange = function (field) {
            this.searchFieldsEditorModalStore.updateAvailableFields(field[0]);
        };
        SearchFieldEditorModalComponent.prototype.onSearchCategoryChange = function () {
            this.searchFieldsEditorModalStore.markDirty();
        };
        SearchFieldEditorModalComponent.prototype.onRemoveSearchField = function (fieldIndex) {
            this.searchFieldsEditorModalStore.removeSearchField(fieldIndex);
        };
        SearchFieldEditorModalComponent.prototype.saveSearchFields = function () {
            var _this = this;
            this.searchFieldsEditorModalStore.searchFields$.pipe(operators.take(1)).subscribe(function (searchFields) {
                _this.activeModalRef.close(searchFields);
            });
        };
        SearchFieldEditorModalComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        return SearchFieldEditorModalComponent;
    }(i1.RxModalClass));
    SearchFieldEditorModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModalComponent, deps: [{ token: SearchFieldEditorModalStore }, { token: i1__namespace$1.ActiveModalRef }, { token: i6__namespace.FormBuilder }, { token: i0__namespace.Injector }, { token: i3__namespace.RxFieldDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SearchFieldEditorModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFieldEditorModalComponent, selector: "rx-search-field-editor-modal", providers: [SearchFieldEditorModalStore], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100\">\n    <div class=\"row flex-grow-1 w-100\">\n      <div class=\"d-flex flex-column mh-100 col\">\n        <div class=\"d-flex align-items-start justify-content-between\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            class=\"mt-2 p-0\"\n            rx-id=\"add-new-search-field-button\"\n            *ngIf=\"!isReadOnly\"\n            (click)=\"addNewSearchField()\"\n          >\n            <span class=\"d-icon-plus_circle\"></span>\n            {{ 'com.bmc.arsys.rx.client.record-designer.search-fields.add-search-field.button.label' | translate }}\n          </button>\n\n          <div *ngIf=\"vm.searchFields.length\" class=\"btn-group ml-auto\">\n            <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n              {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n            </button>\n\n            <button\n              adapt-button\n              btn-type=\"tertiary\"\n              type=\"button\"\n              rx-id=\"collapse-all-button\"\n              (click)=\"toggleOpen(false)\"\n            >\n              {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n            </button>\n          </div>\n        </div>\n\n        <div\n          class=\"border-bottom pb-1 d-flex align-items-center\"\n          *ngIf=\"vm.searchFields.length\"\n          id=\"selected-search-field\"\n          class=\"designer-modal-accordion-wrapper\"\n        >\n          <adapt-accordion [multiselect]=\"true\">\n            <div\n              *ngFor=\"let searchField of vm.searchFields; let index = index; let first = first; let last = last\"\n              class=\"designer-modal-accordion-content\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [formGroup]=\"searchField\"\n                [isOpen]=\"searchField.get('isOpen').value\"\n                (open)=\"searchField.get('isOpen').setValue(true)\"\n                (close)=\"searchField.get('isOpen').setValue(false)\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div rx-id=\"card-title\">\n                        {{ searchField.get('searchFieldName').value[0]?.name }}\n                      </div>\n                    </div>\n\n                    <div class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        rx-id=\"remove-button\"\n                        *ngIf=\"!isReadOnly\"\n                        (click)=\"onRemoveSearchField(index)\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row form-group\">\n                  <adapt-rx-select\n                    [ngClass]=\"recordDefinition.enableCognitiveSearch ? 'd-block col-12' : 'd-block col-6'\"\n                    rx-id=\"available-fields\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.search-fields.field.label' | translate }}\"\n                    formControlName=\"searchFieldName\"\n                    [options]=\"vm.availableFields\"\n                    [optionFormatter]=\"optionFormatter\"\n                    [optionContentTemplate]=\"optionTemplate\"\n                    (ngModelChange)=\"onSelectedFieldChange($event)\"\n                    [disabled]=\"isReadOnly\"\n                  ></adapt-rx-select>\n\n                  <adapt-rx-textfield\n                    *ngIf=\"!recordDefinition.enableCognitiveSearch && searchField.get('isCategoryVisible').value\"\n                    class=\"d-block col-6\"\n                    rx-id=\"search-field-category\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.record-designer.search-fields.search-category-name.label' | translate\n                    }}\"\n                    formControlName=\"category\"\n                    (ngModelChange)=\"onSearchCategoryChange()\"\n                    [disabled]=\"isReadOnly\"\n                  ></adapt-rx-textfield>\n                </div>\n              </adapt-accordion-tab>\n            </div>\n          </adapt-accordion>\n        </div>\n\n        <div *ngIf=\"!vm.searchFields.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n          <adapt-empty-state\n            class=\"w-100\"\n            label=\"{{ 'com.bmc.arsys.rx.client.record-designer.search-fields.empty-state.message' | translate }}\"\n            type=\"config\"\n          ></adapt-empty-state>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div *ngIf=\"!isReadOnly\">\n      <button\n        adapt-button\n        type=\"button\"\n        btn-type=\"primary\"\n        rx-id=\"save-button\"\n        (click)=\"saveSearchFields()\"\n        [disabled]=\"!vm.isValid || !vm.isDirty\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n      <button adapt-button type=\"button\" btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\" *ngIf=\"isReadOnly\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1__namespace$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-search-field-editor-modal',
                        templateUrl: './search-field-editor-modal.component.html',
                        styleUrls: ['./search-field-editor-modal.component.scss'],
                        providers: [SearchFieldEditorModalStore]
                    }]
            }], ctorParameters: function () { return [{ type: SearchFieldEditorModalStore }, { type: i1__namespace$1.ActiveModalRef }, { type: i6__namespace.FormBuilder }, { type: i0__namespace.Injector }, { type: i3__namespace.RxFieldDefinitionService }]; } });

    var SearchFieldEditorControlComponent = /** @class */ (function (_super) {
        __extends(SearchFieldEditorControlComponent, _super);
        function SearchFieldEditorControlComponent(rxModalService, translateService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            _this.searchFieldsSubject = new rxjs.BehaviorSubject([]);
            _this.searchFields$ = _this.searchFieldsSubject.asObservable().pipe(operators.shareReplay(1));
            return _this;
        }
        SearchFieldEditorControlComponent.prototype.ngOnInit = function () {
            if (this.options) {
                this.updateValues();
            }
        };
        SearchFieldEditorControlComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options) {
                this.updateValues();
            }
        };
        SearchFieldEditorControlComponent.prototype.ngOnDestroy = function () {
            this.searchFieldsSubject.complete();
        };
        SearchFieldEditorControlComponent.prototype.updateValues = function () {
            var searchFields = this.options.recordDefinitionModel.fields.filter(function (fieldDefinition) {
                var _a, _b;
                return (fieldDefinition.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.character ||
                    fieldDefinition.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.attachment) &&
                    Boolean(fieldDefinition.searchDefinition) &&
                    (((_a = fieldDefinition.searchDefinition) === null || _a === void 0 ? void 0 : _a.enableFTSSearch) || ((_b = fieldDefinition.searchDefinition) === null || _b === void 0 ? void 0 : _b.enableCognitiveSearch));
            });
            this.searchFieldsSubject.next(searchFields);
        };
        SearchFieldEditorControlComponent.prototype.openEditor = function (searchFieldIndex) {
            var _this = this;
            this.searchFields$.pipe(operators.take(1)).subscribe(function (searchFields) {
                _this.rxModalService
                    .openModal({
                    content: SearchFieldEditorModalComponent,
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.search-field-editor.title'),
                    data: {
                        searchFields: searchFields,
                        fieldDefinitions: _this.options.recordDefinitionModel.fields,
                        recordDefinition: _this.options.recordDefinitionModel,
                        searchFieldIndex: searchFieldIndex,
                        isReadOnly: _this.options.isReadOnly
                    }
                })
                    .then(function (updatedSearchFields) {
                    var searchFieldDefinitions = updatedSearchFields.map(function (searchField) {
                        var _a;
                        var field = _this.options.recordDefinitionModel.fields.find(function (fieldDefinition) { var _a; return ((_a = searchField.get('searchFieldName')) === null || _a === void 0 ? void 0 : _a.value[0].id) === fieldDefinition.id; });
                        if (field) {
                            return Object.assign(Object.assign({}, field), { searchDefinition: Object.assign(Object.assign({}, field.searchDefinition), { enableCognitiveSearch: Boolean(_this.options.recordDefinitionModel.enableCognitiveSearch), enableFTSSearch: ((_a = field.searchDefinition) === null || _a === void 0 ? void 0 : _a.enableFTSSearch) ||
                                        !Boolean(_this.options.recordDefinitionModel.enableCognitiveSearch), stripTagsForSearch: false, enableLiteralSearch: false, searchCategoryName: searchField.get('category').value }), overlayDescriptor: Object.assign(Object.assign({}, field.overlayDescriptor), { otherPropertiesOverlayType: i2.RX_OVERLAY.overlayTypes.overwrite }) });
                        }
                    });
                    _this.value = searchFieldDefinitions;
                    _this.searchFieldsSubject.next(searchFieldDefinitions);
                })
                    .catch(lodash.noop);
            });
        };
        SearchFieldEditorControlComponent.prototype.removeSearchField = function (searchField) {
            var _this = this;
            this.searchFields$.pipe(operators.take(1)).subscribe(function (searchFields) {
                _this.rxModalService
                    .confirm({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i1.RX_MODAL.modalStyles.warning,
                    message: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.delete-confirmation.message', { name: searchField.name })
                })
                    .then(function (isDeleteConfirmed) {
                    if (isDeleteConfirmed) {
                        var searchFieldsList = searchFields.filter(function (fieldDefinition) { return fieldDefinition.name !== searchField.name; });
                        _this.value = searchFieldsList;
                        _this.searchFieldsSubject.next(searchFieldsList);
                    }
                });
            });
        };
        return SearchFieldEditorControlComponent;
    }(i11.ValueAccessor));
    SearchFieldEditorControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorControlComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SearchFieldEditorControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFieldEditorControlComponent, selector: "rx-search-field-editor-control-control", inputs: { options: "options" }, providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: SearchFieldEditorControlComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-button\n  type=\"button\"\n  class=\"p-0 pb-1\"\n  btn-type=\"tertiary\"\n  rx-id=\"add-search-field-button\"\n  *ngIf=\"!isDisabled\"\n  (click)=\"openEditor()\"\n>\n  <span class=\"d-icon-left-plus_circle\"> </span>\n  {{ 'com.bmc.arsys.rx.client.record-designer.search-fields.search-field-editor.title' | translate }}\n</adapt-button>\n\n<div *ngIf=\"searchFields$ | async as searchFields\">\n  <div class=\"rx-search-field\" *ngFor=\"let searchField of searchFields\">\n    <div class=\"rx-selected-column__header-container\">\n      <span rx-id=\"card-title\" class=\"rx-search-field__header-title\">{{ searchField.name }}</span>\n\n      <button\n        type=\"button\"\n        (click)=\"removeSearchField(searchField)\"\n        class=\"rx-button-unstyled d-icon-cross btn-link float-right\"\n        *ngIf=\"!options.isReadOnly\"\n        rx-id=\"remove-search-field\"\n      ></button>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-left-pencil btn-link float-right\"\n        rx-id=\"edit-button\"\n        (click)=\"openEditor(searchField.id)\"\n      ></button>\n    </div>\n\n    <div class=\"rx-search-field-type\" rx-id=\"search-field-type\">\n      <span>\n        {{\n          (searchField.searchDefinition.enableFTSSearch\n            ? 'com.bmc.arsys.rx.client.record-designer.search-fields.full-text-search.label'\n            : 'com.bmc.arsys.rx.client.record-designer.search-fields.cognitive-search.label'\n          ) | translate\n        }}\n      </span>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-search-field{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.rx-search-field__header-container{display:flex}.rx-search-field__header-title{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;font-size:14px}.rx-search-field-type{color:#959899;font-size:10px;overflow:hidden;text-overflow:ellipsis}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i2__namespace.TranslatePipe, "async": i5__namespace.AsyncPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-search-field-editor-control-control',
                        templateUrl: './search-field-editor-control.component.html',
                        styleUrls: ['./search-field-editor-control.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: SearchFieldEditorControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i2__namespace.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var SearchFieldEditorModule = /** @class */ (function () {
        function SearchFieldEditorModule() {
        }
        return SearchFieldEditorModule;
    }());
    SearchFieldEditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SearchFieldEditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModule, declarations: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent], imports: [i5.CommonModule,
            i1$1.AdaptTooltipModule,
            i1$1.AdaptRxSelectModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptRxFormControlModule,
            i1$1.AdaptRxTextfieldModule,
            i1$1.AdaptAccordionModule,
            i1.RxModalModule,
            i6.ReactiveFormsModule,
            i2$1.TranslateModule,
            i1$1.AdaptEmptyStateModule], exports: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent] });
    SearchFieldEditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModule, imports: [[
                i5.CommonModule,
                i1$1.AdaptTooltipModule,
                i1$1.AdaptRxSelectModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptRxFormControlModule,
                i1$1.AdaptRxTextfieldModule,
                i1$1.AdaptAccordionModule,
                i1.RxModalModule,
                i6.ReactiveFormsModule,
                i2$1.TranslateModule,
                i1$1.AdaptEmptyStateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SearchFieldEditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                        exports: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                        entryComponents: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                        imports: [
                            i5.CommonModule,
                            i1$1.AdaptTooltipModule,
                            i1$1.AdaptRxSelectModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptRxFormControlModule,
                            i1$1.AdaptRxTextfieldModule,
                            i1$1.AdaptAccordionModule,
                            i1.RxModalModule,
                            i6.ReactiveFormsModule,
                            i2$1.TranslateModule,
                            i1$1.AdaptEmptyStateModule
                        ]
                    }]
            }] });

    var init = i1$3.createAction('[Record Designer] Init', i1$3.props());
    var loadDefinition = i1$3.createAction('[Record Designer] Load Definition');
    var clearSearchFields = i1$3.createAction('[Record Designer] Clear Search Fields');
    var loadDefinitionSuccess = i1$3.createAction('[Record Designer] Load Definition Success', i1$3.props());
    var initDefinitionModel = i1$3.createAction('[Record Designer] Init Definition Model', i1$3.props());
    var markDesignerPristine = i1$3.createAction('[Record Designer] Mark Designer Pristine');
    var markDesignerDirty = i1$3.createAction('[Record Designer] Mark Designer Dirty');
    var toggleDesignMode = i1$3.createAction('[Record Designer] Toggle Design Mode');
    var updateDefinitionModelFromDesigner = i1$3.createAction('[Record Designer] Update Definition Model From Designer', i1$3.props());
    var updateSelectedFieldModel = i1$3.createAction('[Record Designer] Update Selected Field Model', i1$3.props());
    var setInspectorTabIndex = i1$3.createAction('[Record Designer] Set Inspector Tab Index', i1$3.props());
    var createNewFieldModel = i1$3.createAction('[Record Designer] Create New Field Model', i1$3.props());
    var addFieldModel = i1$3.createAction('[Record Designer] Add Field Model', i1$3.props());
    var addNewFieldModels = i1$3.createAction('[Record Designer] Add New Field Models', i1$3.props());
    var setSelectedFieldGuid = i1$3.createAction('[Record Designer] Set Selected Field GUID', i1$3.props());
    var clearSelectedFieldGuid = i1$3.createAction('[Record Designer] Clear Selected Field GUID');
    var deleteSelectedField = i1$3.createAction('[Record Designer] Delete Selected Field');
    var copySelectedField = i1$3.createAction('[Record Designer] Copy Selected Field');
    var checkIfFieldUsedByIndexes = i1$3.createAction('[Record Designer] Check If Field Used By Indexes');
    var deleteSelectedFieldSuccess = i1$3.createAction('[Record Designer] Delete Selected Field Success');
    var deleteSelectedFieldError = i1$3.createAction('[Record Designer] Delete Selected Field Error');
    var saveDefinition = i1$3.createAction('[Record Designer] Save Definition');
    var saveDefinitionSuccess = i1$3.createAction('[Record Designer] Save Definition Success', i1$3.props());
    var destroy = i1$3.createAction('[Record Designer] Destroy');

    var RX_RECORD_DESIGNER = {
        featureSelector: 'recordDesigner',
        joinCriteriaPath: 'joinCriteria',
        archiveDataCriteriaPath: 'archiveDataCriteria',
        archiving: {
            types: {
                doNotArchive: {
                    nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.do-not-archive.label',
                    id: i3.ArchiveType.None
                },
                archiveAndDeleteSourceRecord: {
                    nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.archive-and-delete-source-record.label',
                    id: i3.ArchiveType.CopyToArchiveAndDeleteFromSource
                },
                deleteSourceRecord: {
                    nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.delete-source-record.label',
                    id: i3.ArchiveType.DeleteFromSource
                }
            }
        }
    };

    var recordDesignerStateSelector = i1$3.createFeatureSelector(RX_RECORD_DESIGNER.featureSelector);
    var recordDesignerModelSelector = i1$3.createSelector(recordDesignerStateSelector, function (recordDesignerState) { return recordDesignerState.model; });
    var definitionNameSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.definitionName; });
    var bundleIdSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.bundleId; });
    var isDesignModeSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.isDesignMode; });
    var isDirtySelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.isDirty; });
    var inspectorTabIndexSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.inspectorTabIndex; });
    var definitionModelSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.definitionModel; });
    var definitionModelFromDefinitionSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.definitionModelFromDefinition; });
    var selectedFieldGuidSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.selectedFieldGuid; });
    var savedDefinitionNameSelector = i1$3.createSelector(recordDesignerModelSelector, function (recordDesignerModel) { return recordDesignerModel.savedDefinitionName; });

    var InheritanceIssueInfoComponent = /** @class */ (function (_super) {
        __extends(InheritanceIssueInfoComponent, _super);
        function InheritanceIssueInfoComponent(injector, activeModalRef) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.injector = injector;
            _this.activeModalRef = activeModalRef;
            _this.overriddenRecordProperties = _this.activeModalRef.getData().overriddenRecordProperties;
            return _this;
        }
        InheritanceIssueInfoComponent.prototype.close = function (value) {
            this.activeModalRef.close(value);
        };
        return InheritanceIssueInfoComponent;
    }(i1.RxModalClass));
    InheritanceIssueInfoComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InheritanceIssueInfoComponent, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$1.ActiveModalRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    InheritanceIssueInfoComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InheritanceIssueInfoComponent, selector: "rx-localized-character-default-value-selector", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <ng-container *ngIf=\"overriddenRecordProperties\">\n    <div *ngIf=\"overriddenRecordProperties.fields.length > 0\">\n      <p>\n        {{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-info.message' | translate }}\n      </p>\n\n      <ul>\n        <li>\n          <span>{{\n            'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-overridden-properties-info.message'\n              | translate: { overriddenFields: overriddenRecordProperties.fields }\n          }}</span>\n        </li>\n      </ul>\n    </div>\n\n    <div *ngIf=\"overriddenRecordProperties.securityLabels?.length > 0\">\n      <p>\n        {{\n          'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-overridden-security-labels-info.message'\n            | translate\n        }}\n      </p>\n\n      <ul>\n        <li>\n          <span>{{\n            'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-security-labels-info.message'\n              | translate: { overriddenSecurityLabels: overriddenRecordProperties.securityLabels }\n          }}</span>\n        </li>\n      </ul>\n    </div>\n  </ng-container>\n  <p>\n    {{ 'com.bmc.arsys.rx.client.common.continue-confirmation.message' | translate }}\n  </p>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" rx-id=\"yes-button\" (click)=\"close('continue')\">\n    {{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"no-button\" (click)=\"close('cancel')\">\n    {{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: InheritanceIssueInfoComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-localized-character-default-value-selector',
                        templateUrl: './inheritance-issue-info.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$1.ActiveModalRef }]; } });

    var RecordDesignerExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RecordDesignerExpressionConfigurator, _super);
        function RecordDesignerExpressionConfigurator(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.rxRecordDefinitionCacheService = _this.injector.get(i3.RxRecordDefinitionCacheService);
            _this.translateService = _this.injector.get(i2$1.TranslateService);
            _this.commonDataDictionary$ = rxjs.of([]);
            _this.generalGroup = {
                label: _this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                hidden: true,
                children: [
                    {
                        label: 'NULL',
                        icon: 'd-icon-dollar',
                        expression: '$NULL$'
                    }
                ]
            };
            return _this;
        }
        RecordDesignerExpressionConfigurator.prototype.getDefaultConfig = function () {
            return Object.assign(Object.assign({}, _super.prototype.getDefaultConfig.call(this)), { operators: i2.ExpressionOperatorRowsByGroup.get(i2.ExpressionOperatorGroup.AllClient) });
        };
        RecordDesignerExpressionConfigurator.prototype.recordExpressionDataDictionary = function (definitionModel, bundleId) {
            var _this = this;
            var data = {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                expanded: true
            };
            return rxjs.iif(function () { return !!definitionModel.lastUpdateTime; }, this.rxRecordDefinitionCacheService.getRecordDefinition(bundleId + ":" + definitionModel.name).pipe(operators.map(function (definition) { return ({
                fields: definition.fieldDefinitions
            }); })), rxjs.of(definitionModel)).pipe(operators.map(function (model) {
                data.children = model.fields
                    .filter(function (field) { return field.resourceType !== i3.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType; })
                    .map(function (field) { return ({
                    label: field.name,
                    icon: 'd-icon-arrow_right_square_input',
                    expression: "'" + field.name + "'"
                }); });
                return [data, _this.generalGroup];
            }));
        };
        return RecordDesignerExpressionConfigurator;
    }(i2.RxExpressionConfigurator));

    var AddJoinFieldsEditorComponent = /** @class */ (function (_super) {
        __extends(AddJoinFieldsEditorComponent, _super);
        function AddJoinFieldsEditorComponent(translateService, rxGuidService, rxRecordDefinitionService, activeModalRef, rxDefinitionNameService, rxFieldDefinitionService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.translateService = translateService;
            _this.rxGuidService = rxGuidService;
            _this.rxRecordDefinitionService = rxRecordDefinitionService;
            _this.activeModalRef = activeModalRef;
            _this.rxDefinitionNameService = rxDefinitionNameService;
            _this.rxFieldDefinitionService = rxFieldDefinitionService;
            _this.injector = injector;
            _this.notificationMessage = _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.notification.message');
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.primaryRecordDefinitionName = _this.activeModalRef.getData().primaryRecordDefinitionName;
            _this.secondaryRecordDefinitionName = _this.activeModalRef.getData().secondaryRecordDefinitionName;
            _this.selectLabel = _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.label', {
                primaryRecordDefinitionName: _this.rxDefinitionNameService.getDisplayName(_this.primaryRecordDefinitionName),
                secondaryRecordDefinitionName: _this.rxDefinitionNameService.getDisplayName(_this.secondaryRecordDefinitionName)
            });
            _this.addedPrimaryFields = _this.activeModalRef
                .getData()
                .addedFields.filter(function (field) { return !lodash.includes(i3.RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id) &&
                lodash.get(field, 'fieldMapping.source') === i3.RX_RECORD_DEFINITION.sourceRecordTypes.primary; });
            _this.addedSecondaryFields = _this.activeModalRef
                .getData()
                .addedFields.filter(function (field) { return !lodash.includes(i3.RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id) &&
                lodash.get(field, 'fieldMapping.source') === i3.RX_RECORD_DEFINITION.sourceRecordTypes.secondary; });
            _this.primarySelectedFieldsFormControl = new i6.FormControl([]);
            _this.secondarySelectedFieldsFormControl = new i6.FormControl([]);
            _this.primarySelectedFields$ = _this.primarySelectedFieldsFormControl.valueChanges.pipe(operators.startWith([]), operators.shareReplay(1));
            _this.secondarySelectedFields$ = _this.secondarySelectedFieldsFormControl.valueChanges.pipe(operators.startWith([]));
            _this.primaryAvailableFields$ = _this.rxRecordDefinitionService
                .get(_this.primaryRecordDefinitionName, {}, true)
                .pipe(operators.map(function (recordDefinition) { return lodash.orderBy(_this.getJoinFieldDefinitions(recordDefinition, i3.RX_RECORD_DEFINITION.sourceRecordTypes.primary).filter(function (field) { return !lodash.includes(lodash.map(_this.addedPrimaryFields, _this.getSourceFieldId), _this.getSourceFieldId(field)); }), ['name'], ['asc']); }));
            _this.secondaryAvailableFields$ = _this.rxRecordDefinitionService
                .get(_this.secondaryRecordDefinitionName, {}, true)
                .pipe(operators.map(function (recordDefinition) { return lodash.orderBy(_this.getJoinFieldDefinitions(recordDefinition, i3.RX_RECORD_DEFINITION.sourceRecordTypes.secondary).filter(function (field) { return !lodash.includes(lodash.map(_this.addedSecondaryFields, _this.getSourceFieldId), _this.getSourceFieldId(field)); }), ['name'], ['asc']); }));
            _this.duplicateNames$ = rxjs.combineLatest([_this.primarySelectedFields$, _this.secondarySelectedFields$]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), primarySelectedFields = _b[0], secondarySelectedFields = _b[1];
                var selectedPrimaryFieldNames = __spreadArray(__spreadArray([], __read(lodash.map(primarySelectedFields, 'name'))), __read(lodash.map(_this.addedPrimaryFields, 'name')));
                var selectedSecondaryFieldNames = __spreadArray(__spreadArray([], __read(lodash.map(secondarySelectedFields, 'name'))), __read(lodash.map(_this.addedSecondaryFields, 'name')));
                return lodash.intersection(selectedPrimaryFieldNames, selectedSecondaryFieldNames).concat(lodash.intersection(lodash.map(i3.RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields, 'name'), selectedPrimaryFieldNames.concat(selectedSecondaryFieldNames)));
            }), operators.shareReplay(1));
            _this.hasDuplicates$ = _this.duplicateNames$.pipe(operators.map(function (duplicateNames) { return !!duplicateNames.length; }));
            _this.selectedFields$ = rxjs.combineLatest([
                _this.primarySelectedFields$,
                _this.secondarySelectedFields$,
                _this.duplicateNames$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 3), primarySelectedFields = _b[0], secondarySelectedFields = _b[1], duplicateNames = _b[2];
                var nonRetainableFieldIds = lodash.chain(primarySelectedFields)
                    .concat(secondarySelectedFields)
                    .map('fieldMapping.sourceFieldId')
                    .filter(function (fieldId, index, selectedFieldIds) { return lodash.includes(selectedFieldIds, fieldId, index + 1); })
                    .value();
                return lodash.concat(primarySelectedFields, secondarySelectedFields)
                    .filter(function (fieldDefinition) { return _this.rxFieldDefinitionService.isJoinedField(fieldDefinition); })
                    .map(function (fieldDefinition) {
                    var field = lodash.cloneDeep(fieldDefinition);
                    if (lodash.includes(duplicateNames, field.name)) {
                        if (field.fieldMapping.source === i3.RX_RECORD_DEFINITION.sourceRecordTypes.primary) {
                            field.name = field.name + " - " + _this.rxDefinitionNameService.getDisplayName(_this.primaryRecordDefinitionName);
                        }
                        else {
                            field.name = field.name + " - " + _this.rxDefinitionNameService.getDisplayName(_this.secondaryRecordDefinitionName);
                        }
                    }
                    if (!lodash.includes(nonRetainableFieldIds, field.fieldMapping.sourceFieldId)) {
                        field.customId = field.fieldMapping.sourceFieldId;
                    }
                    return field;
                });
            }), operators.shareReplay(1));
            _this.vm$ = rxjs.combineLatest([
                _this.primaryAvailableFields$,
                _this.secondaryAvailableFields$,
                _this.hasDuplicates$,
                _this.selectedFields$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 4), primaryAvailableFields = _b[0], secondaryAvailableFields = _b[1], hasDuplicates = _b[2], selectedFields = _b[3];
                return ({
                    primaryAvailableFields: primaryAvailableFields,
                    secondaryAvailableFields: secondaryAvailableFields,
                    hasDuplicates: hasDuplicates,
                    selectedFields: selectedFields
                });
            }));
            _this.alertConfig = {
                content: _this.notificationMessage,
                variant: 'info',
                type: 'inline',
                dismissible: false
            };
            _this.selectTexts = {
                headerText: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.header.label'),
                numberOptionsText: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.fields.label'),
                checked: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.selected.label'),
                searchPlaceholder: _this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
            };
            return _this;
        }
        AddJoinFieldsEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.selectedFields$
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (selectedFields) { return (_this.selectedFields = selectedFields); });
        };
        AddJoinFieldsEditorComponent.prototype.save = function () {
            this.activeModalRef.close(this.selectedFields);
        };
        AddJoinFieldsEditorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        AddJoinFieldsEditorComponent.prototype.optionFormatter = function (field) {
            return field.name;
        };
        AddJoinFieldsEditorComponent.prototype.getSourceFieldId = function (field) {
            return field.fieldMapping.sourceFieldId;
        };
        AddJoinFieldsEditorComponent.prototype.getJoinFieldDefinitions = function (record, sourceType) {
            var _this = this;
            return lodash.map(record === null || record === void 0 ? void 0 : record.fieldDefinitions, function (fieldDefinition) {
                var joinFieldDefinition = lodash.cloneDeep(fieldDefinition);
                joinFieldDefinition.fieldMapping = {
                    resourceType: i3.RX_RECORD_DEFINITION.joinFieldMapping,
                    sourceFieldId: fieldDefinition.id,
                    source: sourceType
                };
                joinFieldDefinition.id = _this.rxGuidService.generate('rx-');
                // Join record should not carry forward FTS properties from primary and secondary record.
                if (joinFieldDefinition.searchDefinition) {
                    joinFieldDefinition.searchDefinition = null;
                }
                delete joinFieldDefinition.lastUpdateTime;
                return joinFieldDefinition;
            });
        };
        AddJoinFieldsEditorComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        return AddJoinFieldsEditorComponent;
    }(i1.RxModalClass));
    AddJoinFieldsEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AddJoinFieldsEditorComponent, deps: [{ token: i2__namespace.TranslateService }, { token: i1__namespace$2.RxGuidService }, { token: i3__namespace.RxRecordDefinitionService }, { token: i1__namespace$1.ActiveModalRef }, { token: i2__namespace$1.RxDefinitionNameService }, { token: i3__namespace.RxFieldDefinitionService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AddJoinFieldsEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddJoinFieldsEditorComponent, selector: "rx-add-join-fields-editor", usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"modal-body d-flex flex-column mh-100\">\n    <div>\n      <adapt-alert *ngIf=\"vm.hasDuplicates\" class=\"mb-3\" [config]=\"alertConfig\"></adapt-alert>\n    </div>\n\n    <label>{{ selectLabel }}</label>\n\n    <div class=\"d-flex flex-row select-container\">\n      <adapt-rx-select\n        rx-id=\"primary-fields\"\n        class=\"d-flex flex-column h-100\"\n        *ngIf=\"vm.primaryAvailableFields\"\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"vm.primaryAvailableFields\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [texts]=\"selectTexts\"\n        [popupMaxHeight]=\"'100%'\"\n        [formControl]=\"primarySelectedFieldsFormControl\"\n        enableFilter=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.record-designer.definition-properties.primary.label' | translate\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        rx-id=\"secondary-fields\"\n        class=\"ml-3 d-flex flex-column h-100\"\n        *ngIf=\"vm.secondaryAvailableFields\"\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"vm.secondaryAvailableFields\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [texts]=\"selectTexts\"\n        [popupMaxHeight]=\"'100%'\"\n        [formControl]=\"secondarySelectedFieldsFormControl\"\n        enableFilter=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.record-designer.definition-properties.secondary.label' | translate\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"primary\"\n      rx-id=\"save-button\"\n      [disabled]=\"vm.selectedFields.length === 0\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button adapt-button type=\"button\" btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;position:relative;height:100%}:host .modal-body{height:645px!important}:host ::ng-deep adapt-rx-select{width:100%;max-width:400px}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;height:625px}.select-container{overflow:auto}\n"], components: [{ type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AddJoinFieldsEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-add-join-fields-editor',
                        templateUrl: './add-join-fields-editor.component.html',
                        styleUrls: ['./add-join-fields-editor.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.TranslateService }, { type: i1__namespace$2.RxGuidService }, { type: i3__namespace.RxRecordDefinitionService }, { type: i1__namespace$1.ActiveModalRef }, { type: i2__namespace$1.RxDefinitionNameService }, { type: i3__namespace.RxFieldDefinitionService }, { type: i0__namespace.Injector }]; } });

    var RxRecordDefinitionValidatorService = /** @class */ (function () {
        function RxRecordDefinitionValidatorService(rxFieldDefinitionService, translateService, rxDefinitionNameService, rxFieldDefinitionManagerService) {
            this.rxFieldDefinitionService = rxFieldDefinitionService;
            this.translateService = translateService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        }
        RxRecordDefinitionValidatorService.prototype.validate = function (definitionModel) {
            var _this = this;
            var _a;
            var duplicateFieldErrorMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label') });
            var definitionValidationIssues = [];
            var fieldValidationIssueSections = [];
            lodash.chain(definitionModel.fields)
                .clone()
                .reverse()
                .forEach(function (fieldModel, index, fieldModels) {
                var issues = [];
                if (lodash.find(fieldModels, function (model) { return fieldModel.name === model.name; }, index + 1)) {
                    issues.push({
                        type: i1.ValidationIssueType.Error,
                        description: duplicateFieldErrorMsg,
                        data: {
                            propertyName: 'name',
                            guid: fieldModel.guid
                        }
                    });
                }
                if (fieldModel.id && lodash.find(fieldModels, function (model) { return fieldModel.id === model.id; }, index + 1)) {
                    issues.push({
                        type: i1.ValidationIssueType.Error,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.duplicate-field-id-error.message'),
                        data: {
                            propertyName: 'id',
                            guid: fieldModel.guid
                        }
                    });
                }
                if (definitionModel.resourceType === i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType &&
                    !fieldModel.lastUpdateTime &&
                    !lodash.includes(i3.RX_RECORD_DEFINITION.coreFieldIds, fieldModel.id) &&
                    lodash.includes(i3.RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldModel.id)) {
                    issues.push({
                        type: i1.ValidationIssueType.Error,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-field-id.message', { fieldId: fieldModel.id }),
                        data: {
                            editFieldGroups: true,
                            guid: fieldModel.guid
                        }
                    });
                }
                issues = issues.concat(_this.rxFieldDefinitionManagerService.validate(fieldModel, definitionModel));
                if (issues.length) {
                    fieldValidationIssueSections.push({
                        title: fieldModel.name,
                        issues: issues
                    });
                }
            })
                .value();
            if (lodash.isEmpty(lodash.trim(definitionModel.name))) {
                definitionValidationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-name.label')
                    }),
                    data: {
                        propertyName: 'name'
                    }
                });
            }
            if (!i3.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
                definitionValidationIssues.push({
                    type: i1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label') }),
                    data: {
                        propertyName: 'name'
                    }
                });
            }
            if (definitionModel === null || definitionModel === void 0 ? void 0 : definitionModel.isAuditingEnabled) {
                var auditRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.auditRecordDefinitionName);
                if (lodash.isEmpty(lodash.trim(auditRecordDefinitionName))) {
                    definitionValidationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-audit-definition-name.message'),
                        data: {
                            propertyName: 'auditRecordDefinitionName'
                        }
                    });
                }
                if (!i3.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(auditRecordDefinitionName)) {
                    definitionValidationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                        }),
                        data: {
                            propertyName: 'auditRecordDefinitionName'
                        }
                    });
                }
            }
            if (definitionModel.isArchivingEnabled &&
                definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.archiveAndDeleteSourceRecord.id) {
                var archiveRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.archiveRecordDefinitionName);
                if (lodash.isEmpty(lodash.trim(archiveRecordDefinitionName))) {
                    definitionValidationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-archive-definition-name.message'),
                        data: {
                            propertyName: 'archiveRecordDefinitionName'
                        }
                    });
                }
                if (!i3.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(archiveRecordDefinitionName)) {
                    definitionValidationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archive-record-definition-name.label')
                        }),
                        data: {
                            propertyName: 'archiveRecordDefinitionName'
                        }
                    });
                }
            }
            if (definitionModel.weightedRelevancyFields) {
                var searchTitleField = lodash.find(definitionModel.fields, { id: (_a = definitionModel.weightedRelevancyFields) === null || _a === void 0 ? void 0 : _a.TITLE });
                if (searchTitleField && !searchTitleField.searchDefinition) {
                    definitionValidationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-text-search-enabled-field.message'),
                        data: {
                            propertyName: 'searchTitleField'
                        }
                    });
                }
            }
            lodash.forEach(definitionModel.indexDefinitions, function (indexDefinitionModel, index) {
                if (!indexDefinitionModel.indexFieldIds.length) {
                    definitionValidationIssues.push({
                        type: i1.ValidationIssueType.Error,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.no-field-selected.message', {
                            indexName: indexDefinitionModel.indexName ||
                                _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.new-index.label')
                        }),
                        data: {
                            indexToEditIndex: index,
                            propertyName: 'indexDefinitions'
                        }
                    });
                }
            });
            var issues = [];
            if (definitionValidationIssues.length) {
                issues.push({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                    issues: definitionValidationIssues
                });
            }
            issues = issues.concat(lodash.reverse(fieldValidationIssueSections));
            return issues;
        };
        return RxRecordDefinitionValidatorService;
    }());
    RxRecordDefinitionValidatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionValidatorService, deps: [{ token: i3__namespace.RxFieldDefinitionService }, { token: i2__namespace.TranslateService }, { token: i2__namespace$1.RxDefinitionNameService }, { token: RxFieldDefinitionManagerService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDefinitionValidatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionValidatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionValidatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.RxFieldDefinitionService }, { type: i2__namespace.TranslateService }, { type: i2__namespace$1.RxDefinitionNameService }, { type: RxFieldDefinitionManagerService }]; } });

    var ArchiveAssociationSelectorComponent = /** @class */ (function (_super) {
        __extends(ArchiveAssociationSelectorComponent, _super);
        function ArchiveAssociationSelectorComponent(activeModalRef, translateService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.translateService = translateService;
            _this.injector = injector;
            _this.isOverlayMode = _this.activeModalRef.getData().isOverlayMode;
            _this.isReadOnly = _this.activeModalRef.getData().isReadOnly;
            _this.actualAssociationsToFollow = _this.activeModalRef.getData().actualAssociationsToFollow;
            _this.selectedAssociationsToFollow = _this.activeModalRef.getData().selectedAssociationsToFollow;
            _this.associationType = _this.selectedAssociationsToFollow.selectionType;
            _this.associationTypes = {
                followParent: i3.AssociationSelectionType.FollowParent,
                selected: i3.AssociationSelectionType.Selected,
                allEnforced: i3.AssociationSelectionType.AllEnforced,
                all: i3.AssociationSelectionType.All
            };
            _this.columns = [];
            _this.associationGridRows = _this.activeModalRef.getData().associationDefinitions.map(function (association) { return ({
                name: association.name,
                firstRecord: association.nodeAId,
                secondRecord: association.nodeBId,
                enforced: association.nodeAModality === api.RX_ASSOCIATION_DEFINITION.modality.required,
                isSelectionDisabled: _this.isReadOnly,
                isAssociationSelectedInBase: _this.isOverlayMode && _this.actualAssociationsToFollow.specificAssociationNames.includes(association.name)
            }); });
            _this.selectedAssociationGridRows = [];
            return _this;
        }
        ArchiveAssociationSelectorComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.columns = [
                {
                    field: 'name',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                    cellTemplate: this.nameCellTemplate
                },
                {
                    field: 'firstRecord',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-first-record.label'),
                    cellTemplate: this.nameCellTemplate
                },
                {
                    field: 'secondRecord',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-second-record.label'),
                    cellTemplate: this.nameCellTemplate
                },
                {
                    field: 'enforced',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.enforced-association.label'),
                    cellTemplate: this.enforceCellTemplate
                }
            ];
            this.selectAssociations();
            this.selectedAssociationGridRows = this.selectedAssociationGridRows.concat(this.associationGridRows.filter(function (associationGridRow) { return lodash.includes(_this.selectedAssociationsToFollow.specificAssociationNames, associationGridRow.name); }));
        };
        ArchiveAssociationSelectorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ArchiveAssociationSelectorComponent.prototype.onSelectionChange = function (selectedRows) {
            this.markAsDirty();
            this.selectedAssociationGridRows = selectedRows;
        };
        ArchiveAssociationSelectorComponent.prototype.disabledRowSelectionResolver = function (rowData) {
            return rowData.isSelectionDisabled || rowData.isAssociationSelectedInBase;
        };
        ArchiveAssociationSelectorComponent.prototype.selectAssociations = function () {
            this.selectedAssociationGridRows = [];
            if (this.associationType === i3.AssociationSelectionType.Selected) {
                this.enableRowSelection();
            }
            else if (this.associationType === i3.AssociationSelectionType.All) {
                this.selectedAssociationGridRows = __spreadArray([], __read(this.associationGridRows));
                this.disableRowSelection();
            }
            else if (this.associationType === i3.AssociationSelectionType.AllEnforced) {
                this.selectedAssociationGridRows = this.associationGridRows.filter(function (row) { return row.enforced; });
                this.disableRowSelectionForEnforcedAssociations();
            }
            else if (this.associationType === i3.AssociationSelectionType.FollowParent) {
                this.disableRowSelection();
            }
            if (this.isOverlayMode &&
                (this.actualAssociationsToFollow.selectionType === i3.AssociationSelectionType.AllEnforced ||
                    this.actualAssociationsToFollow.selectionType === i3.AssociationSelectionType.Selected)) {
                this.selectAssociationsFromBase();
            }
        };
        ArchiveAssociationSelectorComponent.prototype.selectAssociationsFromBase = function () {
            var _this = this;
            this.selectedAssociationGridRows = this.selectedAssociationGridRows.concat(this.associationGridRows.filter(function (associationGridRow) { return lodash.includes(_this.actualAssociationsToFollow.specificAssociationNames, associationGridRow.name); }));
        };
        ArchiveAssociationSelectorComponent.prototype.disableRowSelectionForEnforcedAssociations = function () {
            var _this = this;
            this.associationGridRows.forEach(function (row) {
                row.isSelectionDisabled = _this.isReadOnly || row.enforced;
            });
        };
        ArchiveAssociationSelectorComponent.prototype.disableRowSelection = function () {
            this.associationGridRows.forEach(function (row) {
                row.isSelectionDisabled = true;
            });
        };
        ArchiveAssociationSelectorComponent.prototype.enableRowSelection = function () {
            var _this = this;
            this.associationGridRows.forEach(function (row) {
                row.isSelectionDisabled = _this.isReadOnly;
            });
        };
        ArchiveAssociationSelectorComponent.prototype.save = function () {
            var selectedAssociationNames = [];
            if (this.associationType === i3.AssociationSelectionType.Selected) {
                selectedAssociationNames = lodash.map(this.selectedAssociationGridRows, 'name');
            }
            else if (this.associationType === i3.AssociationSelectionType.AllEnforced) {
                selectedAssociationNames = this.selectedAssociationGridRows
                    .filter(function (associationGridRow) { return !associationGridRow.enforced; })
                    .map(function (associationGridRow) { return associationGridRow.name; });
            }
            this.activeModalRef.close({
                specificAssociationNames: selectedAssociationNames,
                selectionType: this.associationType
            });
        };
        return ArchiveAssociationSelectorComponent;
    }(i1.RxModalClass));
    ArchiveAssociationSelectorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ArchiveAssociationSelectorComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i2__namespace.TranslateService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ArchiveAssociationSelectorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ArchiveAssociationSelectorComponent, selector: "rx-archive-associations-editor", viewQueries: [{ propertyName: "nameCellTemplate", first: true, predicate: ["nameCellTemplate"], descendants: true, static: true }, { propertyName: "enforceCellTemplate", first: true, predicate: ["enforceCellTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body designer-modal-body d-flex mh-100 flex-column\">\n  <span>\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.select-associations-to-follow.message'\n        | translate\n    }}\n  </span>\n\n  <adapt-rx-radiobutton-group [(ngModel)]=\"associationType\" (ngModelChange)=\"markAsDirty(); selectAssociations()\">\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.selected-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.selected\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.allEnforced ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"selected-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.all.label' | translate }}\"\n      [value]=\"associationTypes.all\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"all-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.all-enforced-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.allEnforced\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"all-enforced-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.follow-parent-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.followParent\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.selected ||\n            actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.allEnforced ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"follow-parent-association\"\n    ></adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n\n  <adapt-table\n    [value]=\"associationGridRows\"\n    [selection]=\"selectedAssociationGridRows\"\n    [columns]=\"columns\"\n    [scrollable]=\"true\"\n    scrollHeight=\"flex\"\n    [sortable]=\"true\"\n    [resizableColumns]=\"false\"\n    [bordered]=\"true\"\n    [filterable]=\"false\"\n    [dataKey]=\"'name'\"\n    [disableRowSelection]=\"false\"\n    [selectionMode]=\"'multiple'\"\n    (selectionChange)=\"onSelectionChange($event)\"\n    [disabledRowSelectionResolver]=\"disabledRowSelectionResolver\"\n  >\n  </adapt-table>\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" adapt-button btn-type=\"primary\" (click)=\"save()\" rx-id=\"save-button\" [disabled]=\"!isDirty()\">\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #nameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #enforceCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <span *ngIf=\"dataItem[column.field]\">{{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}</span>\n  <span *ngIf=\"!dataItem[column.field]\">{{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}</span>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1__namespace$1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1__namespace$1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2__namespace.TranslatePipe, "rxDefinitionNamePipe": i2__namespace$1.RxDefinitionNamePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ArchiveAssociationSelectorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-archive-associations-editor',
                        templateUrl: './archive-association-selector.component.html',
                        styleUrls: ['./archive-association-selector.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i2__namespace.TranslateService }, { type: i0__namespace.Injector }]; }, propDecorators: { nameCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['nameCellTemplate', { static: true }]
                }], enforceCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['enforceCellTemplate', { static: true }]
                }] } });

    var MissingArchiveDefinitionsModalComponent = /** @class */ (function (_super) {
        __extends(MissingArchiveDefinitionsModalComponent, _super);
        function MissingArchiveDefinitionsModalComponent(activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.missingAssociations = _this.activeModalRef.getData().missingAssociations;
            return _this;
        }
        MissingArchiveDefinitionsModalComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
        };
        MissingArchiveDefinitionsModalComponent.prototype.close = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        return MissingArchiveDefinitionsModalComponent;
    }(i1.RxModalClass));
    MissingArchiveDefinitionsModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: MissingArchiveDefinitionsModalComponent, deps: [{ token: i1__namespace$1.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    MissingArchiveDefinitionsModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: MissingArchiveDefinitionsModalComponent, selector: "rx-missing-archive-definitions-modal-selector", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body pt-0\">\n  <div class=\"row\">\n    <div class=\"col-sm\">\n      <h6 class=\"font-weight-bold\">\n        {{\n          'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-name.label' | translate\n        }}\n      </h6>\n    </div>\n    <div class=\"col-sm\">\n      <h6 class=\"font-weight-bold\">\n        {{ 'com.bmc.arsys.rx.client.common.record-definition-name.label' | translate }}\n      </h6>\n    </div>\n  </div>\n\n  <div class=\"row mb-2\" *ngFor=\"let association of missingAssociations\">\n    <div class=\"col-sm\">{{ association.name | rxDefinitionNamePipe }}</div>\n    <div class=\"col-sm\">\n      <a target=\"_blank\" class=\"d-icon-left-pop_up\" [href]=\"association.url\">\n        {{ association.secondRecord | rxDefinitionNamePipe }}\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"close()\" rx-id=\"close-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i2__namespace.TranslatePipe, "rxDefinitionNamePipe": i2__namespace$1.RxDefinitionNamePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: MissingArchiveDefinitionsModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-missing-archive-definitions-modal-selector',
                        templateUrl: './missing-archive-definitions-modal.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActiveModalRef }, { type: i0__namespace.Injector }]; } });

    var ArchiveAssociationsControlComponent = /** @class */ (function (_super) {
        __extends(ArchiveAssociationsControlComponent, _super);
        function ArchiveAssociationsControlComponent(rxModalService, translateService, rxRecordDefinitionCacheService, rxNotificationService) {
            var _c;
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            _this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            _this.rxNotificationService = rxNotificationService;
            _this.associationLabels = (_c = {},
                _c[i3.AssociationSelectionType.Selected] = _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.selected-associations.label'),
                _c[i3.AssociationSelectionType.All] = _this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
                _c[i3.AssociationSelectionType.AllEnforced] = _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.all-enforced-associations.label'),
                _c[i3.AssociationSelectionType.FollowParent] = _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.follow-parent-associations.label'),
                _c);
            _this.recordDefinitionNameSubject = new rxjs.BehaviorSubject(null);
            _this.associationToFollowSubject = new rxjs.BehaviorSubject({
                specificAssociationNames: [],
                selectionType: i3.AssociationSelectionType.FollowParent
            });
            _this.associationDefinitions$ = _this.recordDefinitionNameSubject.pipe(operators.switchMap(function (recordDefinitionName) { return recordDefinitionName
                ? _this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(operators.map(function (recordAssociationDefinitions) { return lodash.reject(recordAssociationDefinitions[recordDefinitionName], {
                    cardinality: api.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany
                }).filter(function (association) { return association.nodeAId === recordDefinitionName; }); }))
                : rxjs.of([]); }), operators.shareReplay(1));
            _this.validAssociations$ = _this.associationDefinitions$.pipe(operators.map(function (associationDefinitions) {
                var selectedAssociationType = _this.value.selectionType;
                var selectedAssociations = associationDefinitions.filter(function (association) { return lodash.includes(_this.value.specificAssociationNames, association.name); });
                var validAssociations = [];
                if (selectedAssociationType === i3.AssociationSelectionType.Selected) {
                    validAssociations = selectedAssociations;
                }
                else if (selectedAssociationType === i3.AssociationSelectionType.All) {
                    validAssociations = associationDefinitions;
                }
                else if (selectedAssociationType === i3.AssociationSelectionType.AllEnforced) {
                    validAssociations = associationDefinitions
                        .filter(function (association) { return association.nodeAModality === api.RX_ASSOCIATION_DEFINITION.modality.required; })
                        .concat(selectedAssociations);
                }
                return validAssociations;
            }));
            _this.missingAssociations$ = _this.validAssociations$.pipe(operators.switchMap(function (associations) { return rxjs.forkJoin(associations.map(function (association) { return _this.rxRecordDefinitionCacheService.getRecordDefinition(association.nodeBId).pipe(operators.filter(function (definition) { var _a; return !((_a = definition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled); }), operators.map(function () { return ({
                name: association.name,
                secondRecord: association.nodeBId,
                url: window.location.origin + "/helix/index.html#/" + i2.RX_APPLICATION.innovationStudioBundleId + "/record/edit2/" + association.nodeBId
            }); })); })).pipe(operators.defaultIfEmpty([])); }));
            _this.associationLabel$ = rxjs.combineLatest([
                _this.associationToFollowSubject,
                _this.associationDefinitions$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), associationToFollow = _d[0], associationDefinitions = _d[1];
                var selectedAssociationLabel;
                if (associationToFollow.selectionType === i3.AssociationSelectionType.AllEnforced) {
                    var selectedAssociations = lodash.filter(associationDefinitions, function (association) { return lodash.includes(associationToFollow.specificAssociationNames, association.name); });
                    if (lodash.some(selectedAssociations, function (association) { return association.nodeAModality !== api.RX_ASSOCIATION_DEFINITION.modality.required; })) {
                        selectedAssociationLabel = _this.associationLabels[i3.AssociationSelectionType.AllEnforced] + " + " + _this.associationLabels[i3.AssociationSelectionType.Selected];
                    }
                    else {
                        selectedAssociationLabel = _this.associationLabels[i3.AssociationSelectionType.AllEnforced];
                    }
                }
                else {
                    selectedAssociationLabel = _this.associationLabels[associationToFollow.selectionType];
                }
                return selectedAssociationLabel;
            }));
            return _this;
        }
        ArchiveAssociationsControlComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            var prevDefinitionName = changes.options.previousValue.definitionModel.lastUpdateTime
                ? changes.options.previousValue.bundleId + ":" + changes.options.previousValue.definitionModel.name
                : (_a = changes.options.previousValue.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom;
            var currentDefinitionName = changes.options.currentValue.definitionModel.lastUpdateTime
                ? changes.options.currentValue.bundleId + ":" + changes.options.currentValue.definitionModel.name
                : (_b = changes.options.currentValue.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _b === void 0 ? void 0 : _b.inheritingFrom;
            if (currentDefinitionName !== prevDefinitionName) {
                this.recordDefinitionNameSubject.next(currentDefinitionName);
            }
            if (!currentDefinitionName) {
                this.value = {
                    specificAssociationNames: [],
                    selectionType: i3.AssociationSelectionType.FollowParent
                };
                this.associationToFollowSubject.next(this.value);
            }
        };
        ArchiveAssociationsControlComponent.prototype.ngOnInit = function () {
            var _a;
            var definitionName = this.options.definitionModel.lastUpdateTime
                ? this.options.bundleId + ":" + this.options.definitionModel.name
                : (_a = this.options.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom;
            this.recordDefinitionNameSubject.next(definitionName);
            this.associationToFollowSubject.next(this.value);
        };
        ArchiveAssociationsControlComponent.prototype.openAssociationSelector = function () {
            var _this = this;
            this.associationDefinitions$.pipe(operators.take(1)).subscribe(function (associationDefinitions) {
                _this.rxModalService
                    .openModal({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.label'),
                    data: {
                        associationDefinitions: associationDefinitions,
                        selectedAssociationsToFollow: _this.value,
                        actualAssociationsToFollow: _this.options.definitionModelFromDefinition.associationsToFollowForArchive,
                        isOverlayMode: _this.options.isOverlayMode,
                        isReadOnly: _this.options.isReadOnly
                    },
                    content: ArchiveAssociationSelectorComponent
                })
                    .then(function (result) {
                    _this.value = result;
                    _this.associationToFollowSubject.next(_this.value);
                })
                    .catch(lodash.noop);
            });
        };
        ArchiveAssociationsControlComponent.prototype.openMissingDefinitionsModal = function () {
            var _this = this;
            this.missingAssociations$.pipe(operators.take(1)).subscribe(function (missingAssociations) {
                if (missingAssociations.length) {
                    _this.rxModalService
                        .openModal({
                        title: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.missing-archive-definitions.label'),
                        data: {
                            missingAssociations: missingAssociations
                        },
                        size: 'sm',
                        content: MissingArchiveDefinitionsModalComponent
                    })
                        .catch(lodash.noop);
                }
                else {
                    _this.rxNotificationService.addInfoMessage(_this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.no-missing-archive-definitions.message'));
                }
            });
        };
        return ArchiveAssociationsControlComponent;
    }(i11.ValueAccessor));
    ArchiveAssociationsControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ArchiveAssociationsControlComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i2__namespace.TranslateService }, { token: i3__namespace.RxRecordDefinitionCacheService }, { token: i2__namespace$1.RxNotificationService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ArchiveAssociationsControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ArchiveAssociationsControlComponent, selector: "rx-archive-associations", inputs: { options: "options" }, providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: ArchiveAssociationsControlComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<div class=\"d-inline-flex align-items-center mb-1\">\n  <button\n    class=\"d-icon-plus_circle p-0\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    rx-id=\"associations-to-follow-button\"\n    (click)=\"openAssociationSelector()\"\n  >\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.label' | translate\n    }}\n  </button>\n\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    [adaptPopover]=\"\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.tooltip'\n        | translate\n    \"\n  >\n  </adapt-icon>\n</div>\n\n<div class=\"border pl-2 p-1 form-group\">\n  <span class=\"d-icon-left-arrow_schema font-weight-bold\">\n    {{ associationLabel$ | async }}\n  </span>\n</div>\n\n<div class=\"d-inline-flex align-items-center\">\n  <adapt-icon name=\"exclamation_triangle\" class=\"text-warning-icon\"> </adapt-icon>\n\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-missing-definitions-button\"\n    (click)=\"openMissingDefinitionsModal()\"\n    class=\"p-0 pl-1\"\n  >\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.missing-archive-definitions.label'\n        | translate\n    }}\n  </adapt-button>\n</div>\n", components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2__namespace.TranslatePipe, "async": i5__namespace.AsyncPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ArchiveAssociationsControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-archive-associations',
                        templateUrl: './archive-associations-control.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: ArchiveAssociationsControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i2__namespace.TranslateService }, { type: i3__namespace.RxRecordDefinitionCacheService }, { type: i2__namespace$1.RxNotificationService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RecordIndexesEditorStore = /** @class */ (function (_super) {
        __extends(RecordIndexesEditorStore, _super);
        function RecordIndexesEditorStore(rxGuidService) {
            var _this = _super.call(this, { indexes: [], isDirty: false }) || this;
            _this.rxGuidService = rxGuidService;
            _this.isDirty$ = _this.select(function (state) { return state.isDirty; });
            _this.indexes$ = _this.select(function (state) { return state.indexes; });
            _this.addIndex = _this.updater(function (state, index) { return (Object.assign(Object.assign({}, state), { indexes: __spreadArray(__spreadArray([], __read(state.indexes)), [index]), isDirty: true })); });
            _this.updateIndex = _this.updater(function (state, indexToUpdate) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) { return (index.guid === indexToUpdate.guid ? Object.assign({}, indexToUpdate) : index); }), isDirty: true })); });
            _this.removeIndex = _this.updater(function (state, guid) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.filter(function (field) { return field.guid !== guid; }), isDirty: true })); });
            _this.checkAvailableFields = _this.updater(function (state, payload) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) { return index.guid === payload.indexGuid
                    ? Object.assign(Object.assign({}, index), { checkedAvailableFields: __spreadArray([], __read(payload.checkedFields)) }) : index; }) })); });
            _this.toggleSelectedFieldChecked = _this.updater(function (state, payload) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) {
                    if (index.guid === payload.indexGuid) {
                        var selectedFields = index.selectedFields.map(function (field) { return field.id === payload.indexField.id ? Object.assign({}, field) : field; });
                        return Object.assign(Object.assign({}, index), { selectedFields: selectedFields, isMoveToAvailableButtonEnabled: lodash.some(selectedFields, 'selected') });
                    }
                    else {
                        return index;
                    }
                }) })); });
            _this.assignCheckedFields = _this.updater(function (state, indexToAssign) {
                return Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) { return index.guid === indexToAssign.guid
                        ? Object.assign(Object.assign({}, index), { selectedFields: __spreadArray(__spreadArray([], __read(index.selectedFields)), __read(index.checkedAvailableFields)).map(function (field, itemIndex) { return (Object.assign(Object.assign({}, field), { selected: false, fieldOrder: itemIndex++ })); }), availableFields: __spreadArray([], __read(index.availableFields.filter(function (field) { return !lodash.some(index.checkedAvailableFields, { id: field.id }); }))), checkedAvailableFields: [] }) : index; }), isDirty: true });
            });
            _this.unassignCheckedFields = _this.updater(function (state, indexToAssign) {
                return Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) { return index.guid === indexToAssign.guid
                        ? Object.assign(Object.assign({}, index), { selectedFields: index.selectedFields.filter(function (field) { return !field.selected; }), availableFields: __spreadArray(__spreadArray([], __read(index.availableFields)), __read(index.selectedFields.filter(function (field) { return field.selected; }))).map(function (field) { return (Object.assign(Object.assign({}, field), { fieldOrder: null })); })
                                .sort(function (a, b) { return a.name.localeCompare(b.name); }), isMoveToAvailableButtonEnabled: false }) : index; }), isDirty: true });
            });
            _this.sortSelectedFields = _this.updater(function (state, payload) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) { return index.guid === payload.indexGuid
                    ? Object.assign(Object.assign({}, index), { selectedFields: __spreadArray([], __read(payload.fields.map(function (field, itemIndex) { return (Object.assign(Object.assign({}, field), { fieldOrder: itemIndex })); }))) }) : index; }) })); });
            _this.removeField = _this.updater(function (state, payload) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (index) { return index.guid === payload.indexGuid
                    ? Object.assign(Object.assign({}, index), { selectedFields: index.selectedFields.filter(function (field) { return field.id !== payload.field.id; }), availableFields: __spreadArray(__spreadArray([], __read(index.availableFields)), [payload.field]).sort(function (a, b) { return a.name.localeCompare(b.name); }) }) : index; }), isDirty: true })); });
            _this.expandAll = _this.updater(function (state) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (field) { return (Object.assign(Object.assign({}, field), { isOpen: true })); }) })); });
            _this.collapseAll = _this.updater(function (state) { return (Object.assign(Object.assign({}, state), { indexes: state.indexes.map(function (field) { return (Object.assign(Object.assign({}, field), { isOpen: false })); }) })); });
            _this.markDirty = _this.updater(function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); });
            _this.vm$ = _this.select(_this.indexes$, _this.isDirty$, function (indexes, isDirty) { return ({
                indexes: indexes,
                isDirty: isDirty
            }); });
            return _this;
        }
        RecordIndexesEditorStore.prototype.initialize = function (indexesEditorOptions) {
            var _this = this;
            this.patchState({
                isDirty: false,
                indexes: indexesEditorOptions.indexes.map(function (index, itemIndex) { return (Object.assign(Object.assign({}, index), { availableFields: lodash.reject(indexesEditorOptions.fields, function (field) { return field.isNewField || index.indexFieldIds.includes(field.id); })
                        .map(function (field) { return ({ id: field.id, name: field.name, fieldOrder: null }); })
                        .sort(function (a, b) { return a.name.localeCompare(b.name); }), checkedAvailableFields: [], selectedFields: indexesEditorOptions.fields
                        .filter(function (field) { return !field.isNewField && index.indexFieldIds.includes(field.id); })
                        .sort(function (a, b) { return index.indexFieldIds.indexOf(a.id) - index.indexFieldIds.indexOf(b.id); })
                        .map(function (field, index) { return ({ id: field.id, name: field.name, fieldOrder: index }); }), guid: _this.rxGuidService.generate(), isOpen: (indexesEditorOptions === null || indexesEditorOptions === void 0 ? void 0 : indexesEditorOptions.indexToEditIndex) === itemIndex, isMoveToAvailableButtonEnabled: false })); })
            });
        };
        return RecordIndexesEditorStore;
    }(componentStore.ComponentStore));
    RecordIndexesEditorStore.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesEditorStore, deps: [{ token: i1__namespace$2.RxGuidService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RecordIndexesEditorStore.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesEditorStore });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesEditorStore, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxGuidService }]; } });

    var RecordIndexesEditorComponent = /** @class */ (function (_super) {
        __extends(RecordIndexesEditorComponent, _super);
        function RecordIndexesEditorComponent(recordIndexesEditorStore, rxGuidService, activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.recordIndexesEditorStore = recordIndexesEditorStore;
            _this.rxGuidService = rxGuidService;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.isReadOnly = _this.activeModalRef.getData().isReadOnly;
            _this.indexesEditorOptions = _this.activeModalRef.getData();
            _this.vm$ = _this.recordIndexesEditorStore.vm$;
            return _this;
        }
        RecordIndexesEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.recordIndexesEditorStore.isDirty$.pipe(operators.filter(Boolean), operators.take(1)).subscribe(function () {
                _this.markAsDirty();
            });
            this.recordIndexesEditorStore.initialize(this.indexesEditorOptions);
        };
        RecordIndexesEditorComponent.prototype.ngAfterViewInit = function () {
            var _a;
            (_a = this.accordionTabEls.get(this.indexesEditorOptions.indexToEditIndex)) === null || _a === void 0 ? void 0 : _a.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        };
        RecordIndexesEditorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        RecordIndexesEditorComponent.prototype.addIndex = function () {
            this.recordIndexesEditorStore.addIndex({
                guid: this.rxGuidService.generate(),
                indexName: null,
                unique: false,
                ignoreBlankValues: false,
                indexFieldIds: [],
                availableFields: this.indexesEditorOptions.fields
                    .filter(function (field) { return !field.isNewField; })
                    .map(function (field) { return (Object.assign(Object.assign({}, field), { fieldOrder: null })); })
                    .sort(function (a, b) { return a.name.localeCompare(b.name); }),
                checkedAvailableFields: [],
                selectedFields: [],
                isOpen: true,
                isAutomaticIndex: false,
                isMoveToAvailableButtonEnabled: false
            });
        };
        RecordIndexesEditorComponent.prototype.updateIndexUniqueValue = function (index, unique) {
            this.recordIndexesEditorStore.updateIndex(Object.assign(Object.assign({}, index), { unique: unique }));
        };
        RecordIndexesEditorComponent.prototype.updateIndexIgnoreBlankValue = function (index, ignoreBlankValues) {
            this.recordIndexesEditorStore.updateIndex(Object.assign(Object.assign({}, index), { ignoreBlankValues: ignoreBlankValues }));
        };
        RecordIndexesEditorComponent.prototype.removeIndex = function (guid) {
            this.recordIndexesEditorStore.removeIndex(guid);
        };
        RecordIndexesEditorComponent.prototype.moveToSelected = function (index) {
            this.recordIndexesEditorStore.assignCheckedFields(index);
        };
        RecordIndexesEditorComponent.prototype.moveToAvailable = function (index) {
            this.recordIndexesEditorStore.unassignCheckedFields(index);
        };
        RecordIndexesEditorComponent.prototype.onAvailableFieldsChange = function (checkedFields, index) {
            this.recordIndexesEditorStore.checkAvailableFields({ indexGuid: index.guid, checkedFields: checkedFields });
        };
        RecordIndexesEditorComponent.prototype.onSelectedFieldsChange = function (fields, index) {
            var _this = this;
            fields.forEach(function (field) {
                _this.recordIndexesEditorStore.toggleSelectedFieldChecked({ indexGuid: index.guid, indexField: field });
            });
            this.recordIndexesEditorStore.sortSelectedFields({ indexGuid: index.guid, fields: fields });
        };
        RecordIndexesEditorComponent.prototype.onDragEnd = function () {
            this.recordIndexesEditorStore.markDirty();
        };
        RecordIndexesEditorComponent.prototype.onFieldRemove = function (removedField, index) {
            this.recordIndexesEditorStore.removeField({ indexGuid: index.guid, field: removedField });
        };
        RecordIndexesEditorComponent.prototype.save = function () {
            var _this = this;
            this.recordIndexesEditorStore.indexes$.pipe(operators.take(1)).subscribe(function (indexes) {
                _this.activeModalRef.close(indexes.map(function (index) { return ({
                    isAutomaticIndex: index.isAutomaticIndex,
                    indexName: index.indexName,
                    unique: index.unique,
                    ignoreBlankValues: index.ignoreBlankValues,
                    indexFieldIds: lodash.map(index.selectedFields, 'id')
                }); }));
            });
        };
        RecordIndexesEditorComponent.prototype.expandAll = function () {
            this.recordIndexesEditorStore.expandAll();
        };
        RecordIndexesEditorComponent.prototype.collapseAll = function () {
            this.recordIndexesEditorStore.collapseAll();
        };
        RecordIndexesEditorComponent.prototype.trackByIndex = function ($index) {
            return $index;
        };
        RecordIndexesEditorComponent.prototype.optionFormatter = function (field) {
            return field.name;
        };
        return RecordIndexesEditorComponent;
    }(i1.RxModalClass));
    RecordIndexesEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesEditorComponent, deps: [{ token: RecordIndexesEditorStore }, { token: i1__namespace$2.RxGuidService }, { token: i1__namespace$1.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordIndexesEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIndexesEditorComponent, selector: "rx-record-indexes-editor", providers: [RecordIndexesEditorStore], viewQueries: [{ propertyName: "accordionTabEls", predicate: i1$1.AdaptAccordionTabComponent, descendants: true, read: i0.ElementRef }], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n    <adapt-alert\n      class=\"flex-shrink-0\"\n      [config]=\"{\n        content: 'com.bmc.arsys.rx.client.record-designer.indexes.information' | translate,\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n\n    <div class=\"text-right btn-group\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"add-index-button\"\n        class=\"d-icon-left-plus_circle float-left px-0\"\n        (click)=\"addIndex()\"\n        *ngIf=\"!isReadOnly\"\n      >\n        {{ 'com.bmc.arsys.rx.client.record-designer.indexes.add-index.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"expand-button\"\n        (click)=\"expandAll()\"\n        class=\"ml-auto\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"collapse-button\"\n        class=\"pr-0\"\n        (click)=\"collapseAll()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n      </button>\n    </div>\n\n    <div class=\"designer-modal-accordion-wrapper\">\n      <adapt-accordion\n        [multiselect]=\"true\"\n        class=\"d-block\"\n        *ngFor=\"let index of vm.indexes; let $index = index; trackBy: trackByIndex\"\n      >\n        <div class=\"designer-modal-accordion-content\">\n          <adapt-accordion-tab\n            class=\"d-block\"\n            [isOpen]=\"index.isOpen\"\n            (open)=\"index.isOpen = true\"\n            (close)=\"index.isOpen = false\"\n          >\n            <div class=\"card-title-text w-100\">\n              <div class=\"designer-modal-card-title-content\">\n                <div class=\"left-header-block pl-0\">\n                  <div class=\"rx-ellipsis\" [title]=\"index.indexName\" rx-id=\"card-title\">\n                    <span *ngIf=\"!index.isAutomaticIndex\">\n                      {{\n                        index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n                      }}\n                    </span>\n                    <span *ngIf=\"index.isAutomaticIndex\">{{\n                      'com.bmc.arsys.rx.client.record-designer.indexes.automatic-index.label'\n                        | translate: { indexName: index.indexName }\n                    }}</span>\n                  </div>\n                </div>\n\n                <div class=\"right-header-block\">\n                  <button\n                    class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n                    adapt-button\n                    size=\"small\"\n                    type=\"button\"\n                    (click)=\"$event.stopPropagation(); removeIndex(index.guid)\"\n                    *ngIf=\"!isReadOnly && !index.isAutomaticIndex\"\n                    rx-id=\"remove-index-button\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <adapt-rx-checkbox\n              [ngModel]=\"index.unique\"\n              (ngModelChange)=\"updateIndexUniqueValue(index, $event)\"\n              [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n              label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.unique-index-checkbox.label' | translate }}\"\n            >\n            </adapt-rx-checkbox>\n\n            <adapt-rx-checkbox\n              [(ngModel)]=\"index.ignoreBlankValues\"\n              (ngModelChange)=\"updateIndexIgnoreBlankValue(index, $event)\"\n              [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n              label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.ignore-blank-values.label' | translate }}\"\n              [tooltip]=\"{\n                iconName: 'question_circle_o',\n                content: 'com.bmc.arsys.rx.client.record-designer.indexes.ignore-blank-values.tooltip' | translate,\n                placement: 'top',\n                popoverMode: true\n              }\"\n            >\n            </adapt-rx-checkbox>\n\n            <div class=\"d-flex flex-fill\">\n              <adapt-rx-select\n                class=\"flex-grow-1 d-flex flex-column\"\n                popupMaxHeight=\"100%\"\n                [options]=\"index.availableFields\"\n                [ngModel]=\"index.checkedAvailableFields\"\n                [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n                [deselectAllButton]=\"true\"\n                [selectAllButton]=\"true\"\n                [enableFilter]=\"true\"\n                [inline]=\"true\"\n                label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.available-fields.label' | translate }}\"\n                [multiple]=\"true\"\n                [singleSelectStyle]=\"'marker'\"\n                [optionFormatter]=\"optionFormatter\"\n                (ngModelChange)=\"onAvailableFieldsChange($event, index)\"\n                rx-id=\"available-field-list\"\n              ></adapt-rx-select>\n\n              <div class=\"mx-2 d-flex flex-column\">\n                <button\n                  type=\"button\"\n                  adapt-button\n                  class=\"d-icon-right-angle_right mt-auto mb-2\"\n                  btn-type=\"secondary\"\n                  (click)=\"moveToSelected(index)\"\n                  [disabled]=\"!index.checkedAvailableFields.length || index.isAutomaticIndex\"\n                  rx-id=\"move-to-selected-button\"\n                ></button>\n\n                <button\n                  type=\"button\"\n                  adapt-button\n                  class=\"d-icon-right-angle_left mb-auto\"\n                  btn-type=\"secondary\"\n                  (click)=\"moveToAvailable(index)\"\n                  [disabled]=\"!index.isMoveToAvailableButtonEnabled || index.isAutomaticIndex\"\n                  rx-id=\"move-to-available-button\"\n                ></button>\n              </div>\n\n              <adapt-rx-list-builder\n                class=\"flex-grow-1\"\n                [ngModel]=\"index.selectedFields\"\n                selectionMode=\"multiple\"\n                (ngModelChange)=\"onSelectedFieldsChange($event, index)\"\n                (listItemRemove)=\"onFieldRemove($event, index)\"\n                [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n                [hideSearchField]=\"true\"\n                [hideEdit]=\"true\"\n                (dragend)=\"onDragEnd()\"\n                [tooltip]=\"{\n                  iconName: 'question_circle_o',\n                  content: 'com.bmc.arsys.rx.client.record-designer.indexes.selected-fields.tooltip' | translate,\n                  placement: 'top',\n                  popoverMode: true\n                }\"\n                label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.selected-fields.label' | translate }}\"\n                rx-id=\"selected-field-list\"\n              ></adapt-rx-list-builder>\n            </div>\n          </adapt-accordion-tab>\n        </div>\n      </adapt-accordion>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div *ngIf=\"!isReadOnly\">\n      <button\n        class=\"mr-2\"\n        type=\"button\"\n        adapt-button\n        btn-type=\"primary\"\n        rx-id=\"save-button\"\n        (click)=\"save()\"\n        [disabled]=\"!vm.isDirty\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n\n      <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n\n    <div *ngIf=\"isReadOnly\">\n      <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\">\n        {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep adapt-rx-select{width:30%}:host::ng-deep adapt-rx-select .rx-select__options-wrapper{height:350px;flex:1 1 auto;overflow-y:auto;overflow-x:hidden}:host::ng-deep adapt-rx-list-builder{width:30%}:host::ng-deep adapt-rx-list-builder .adapt-list-builder{height:100%}:host::ng-deep adapt-rx-list-builder .adapt-list-container{height:350px;flex-grow:1;overflow:auto}:host::ng-deep adapt-rx-list-builder .adapt-list-builder,:host::ng-deep adapt-rx-list-builder .adapt-list-builder__wrp{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1__namespace$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1__namespace$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1__namespace$1.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-indexes-editor',
                        templateUrl: './record-indexes-editor.component.html',
                        styleUrls: ['./record-indexes-editor.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [RecordIndexesEditorStore]
                    }]
            }], ctorParameters: function () { return [{ type: RecordIndexesEditorStore }, { type: i1__namespace$2.RxGuidService }, { type: i1__namespace$1.ActiveModalRef }, { type: i0__namespace.Injector }]; }, propDecorators: { accordionTabEls: [{
                    type: i0.ViewChildren,
                    args: [i1$1.AdaptAccordionTabComponent, { read: i0.ElementRef }]
                }] } });

    var RecordIndexesControlComponent = /** @class */ (function (_super) {
        __extends(RecordIndexesControlComponent, _super);
        function RecordIndexesControlComponent(rxModalService, translateService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            return _this;
        }
        RecordIndexesControlComponent.prototype.openIndexesEditor = function (indexToEditIndex) {
            var _this = this;
            if (indexToEditIndex === void 0) { indexToEditIndex = null; }
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.edit-indexes.label'),
                data: {
                    indexes: this.value,
                    indexToEditIndex: indexToEditIndex,
                    isReadOnly: this.options.isReadOnly,
                    fields: this.options.definitionModel.fields
                },
                content: RecordIndexesEditorComponent,
                size: api$1.OpenViewActionModalSize.Large
            })
                .then(function (indexes) {
                _this.value = indexes;
            })
                .catch(lodash.noop);
        };
        RecordIndexesControlComponent.prototype.removeIndex = function ($index) {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i1.RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.delete-index-confirmation.message')
            })
                .then(function (result) {
                if (result) {
                    _this.value = _this.value.filter(function (index, itemIndex) { return itemIndex !== $index; });
                }
            });
        };
        RecordIndexesControlComponent.prototype.focus = function (data) {
            if (data === null || data === void 0 ? void 0 : data.indexToEditIndex) {
                this.openIndexesEditor(data.indexToEditIndex);
            }
            else {
                this.openIndexesEditor();
            }
        };
        return RecordIndexesControlComponent;
    }(i11.ValueAccessor));
    RecordIndexesControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesControlComponent, deps: [{ token: i1__namespace.RxModalService }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordIndexesControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIndexesControlComponent, selector: "rx-record-indexes", inputs: { options: "options" }, providers: [
            {
                provide: i6.NG_VALUE_ACCESSOR,
                useExisting: RecordIndexesControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-indexes-editor\" class=\"p-0 pb-1\" (click)=\"openIndexesEditor()\">\n  <span class=\"d-icon-plus_circle\"></span>\n  {{ 'com.bmc.arsys.rx.client.record-designer.indexes.edit-indexes.label' | translate }}\n</adapt-button>\n\n<div class=\"record-index rounded mb-1 border font-weight-bold\" *ngFor=\"let index of value; let $index = index\">\n  <div class=\"d-flex mb-1\">\n    <span rx-id=\"record-index-name\" [title]=\"index.indexName\">\n      <span *ngIf=\"!index.isAutomaticIndex\">{{\n        index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n      }}</span>\n      <span *ngIf=\"index.isAutomaticIndex\"\n        >{{\n          'com.bmc.arsys.rx.client.record-designer.indexes.automatic-index.label'\n            | translate\n              : {\n                  indexName:\n                    index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n                }\n        }}\n        <adapt-icon\n          name=\"question_circle_o\"\n          class=\"ml-2\"\n          [adaptPopover]=\"'com.bmc.arsys.rx.client.record-designer.indexes.system-index.tooltip' | translate\"\n        >\n        </adapt-icon>\n      </span>\n    </span>\n\n    <button\n      class=\"ml-auto rx-button-unstyled d-icon-left-pencil btn-link\"\n      type=\"button\"\n      rx-id=\"open-index-editor\"\n      (click)=\"openIndexesEditor($index)\"\n      *ngIf=\"!index.isAutomaticIndex\"\n    ></button>\n\n    <button\n      type=\"button\"\n      class=\"rx-button-unstyled d-icon-cross btn-link\"\n      rx-id=\"remove-index\"\n      (click)=\"removeIndex($index)\"\n      *ngIf=\"!options.isReadOnly && !index.isAutomaticIndex\"\n    ></button>\n  </div>\n\n  <div class=\"caption ellipsis\">\n    {{\n      (index.unique\n        ? 'com.bmc.arsys.rx.client.record-designer.indexes.unique-index.label'\n        : 'com.bmc.arsys.rx.client.record-designer.indexes.non-unique-index.label.value'\n      ) | translate\n    }},\n    {{\n      index.indexFieldIds.length === 1\n        ? ('com.bmc.arsys.rx.client.record-designer.indexes.one-field-index.label' | translate)\n        : ('com.bmc.arsys.rx.client.record-designer.indexes.many-fields-index.label'\n          | translate: { fieldCount: index.indexFieldIds.length })\n    }}\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.record-index{padding:5px 10px;word-break:break-all}.record-index .caption{color:#959899;font-size:10px}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordIndexesControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-indexes',
                        templateUrl: './record-indexes-control.component.html',
                        styleUrls: ['./record-indexes-control.component.scss'],
                        providers: [
                            {
                                provide: i6.NG_VALUE_ACCESSOR,
                                useExisting: RecordIndexesControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxModalService }, { type: i2__namespace.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RxRecordDesignerInspectorService = /** @class */ (function () {
        function RxRecordDesignerInspectorService(rxFieldDefinitionService, rxOverlayService, translateService) {
            this.rxFieldDefinitionService = rxFieldDefinitionService;
            this.rxOverlayService = rxOverlayService;
            this.translateService = translateService;
        }
        RxRecordDesignerInspectorService.prototype.getDefinitionInspectorConfig = function (isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly, expressionConfigurator) {
            var _this = this;
            var _a, _b;
            var configs = [];
            var isOverlayMode = !isNewDefinition && definitionModel.overlayOperation !== i2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            var isAuditRecordDefinition = Boolean(definitionModel.isAuditRecordDefinition);
            var isDeleteSourceRecordOperation = definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.deleteSourceRecord.id;
            var doNotArchive = definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.doNotArchive.id;
            var archivingOptions = Object.values(RX_RECORD_DESIGNER.archiving.types).map(function (value) { return (Object.assign(Object.assign({}, value), { name: _this.translateService.instant(value.nameKey) })); });
            var joinTypeOptions = Object.values(i3.RX_RECORD_DEFINITION.joinTypes).map(function (joinType) { return (Object.assign(Object.assign({}, joinType), { name: _this.translateService.instant(joinType.displayName), id: joinType.value })); });
            var weightedRelevancyFields = [
                {
                    name: 'weightedRelevancyTitle',
                    component: i11.SelectFormControlComponent,
                    isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.title-field.label'),
                        options: definitionModel.fields
                            .filter(function (fieldDefinition) { return lodash.isNumber(fieldDefinition.id) &&
                            (lodash.get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                                lodash.get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                            !lodash.includes([definitionModel.weightedRelevancyEnvironment, definitionModel.weightedRelevancyKeywords], fieldDefinition.id); })
                            .map(function (fieldDefinition) { return ({
                            name: fieldDefinition.name,
                            id: fieldDefinition.id
                        }); }),
                        tooltip: new i2.Tooltip(this.translateService.instant(definitionModel.enableCognitiveSearch
                            ? 'com.bmc.arsys.rx.client.record-designer.definition-properties.title-field-cognitive-search.tooltip'
                            : 'com.bmc.arsys.rx.client.record-designer.definition-properties.title-field-fts.tooltip'))
                    }
                },
                {
                    name: 'weightedRelevancyEnvironment',
                    component: i11.SelectFormControlComponent,
                    isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.environment-field.label'),
                        options: definitionModel.fields
                            .filter(function (fieldDefinition) { return lodash.isNumber(fieldDefinition.id) &&
                            (lodash.get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                                lodash.get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                            !lodash.includes([definitionModel.weightedRelevancyTitle, definitionModel.weightedRelevancyKeywords], fieldDefinition.id); })
                            .map(function (fieldDefinition) { return ({
                            name: fieldDefinition.name,
                            id: fieldDefinition.id
                        }); }),
                        tooltip: new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.environment-field.tooltip'))
                    }
                },
                {
                    name: 'weightedRelevancyKeywords',
                    component: i11.SelectFormControlComponent,
                    isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.keywords-field.label'),
                        options: definitionModel.fields
                            .filter(function (fieldDefinition) { return lodash.isNumber(fieldDefinition.id) &&
                            (lodash.get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                                lodash.get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                            !lodash.includes([definitionModel.weightedRelevancyTitle, definitionModel.weightedRelevancyEnvironment], fieldDefinition.id); })
                            .map(function (fieldDefinition) { return ({
                            name: fieldDefinition.name,
                            id: fieldDefinition.id
                        }); }),
                        tooltip: new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.keywords-field.tooltip'))
                    }
                }
            ];
            if (definitionModel.resourceType === i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType) {
                configs = [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                        controls: [
                            {
                                name: 'name',
                                component: i11.TextFormControlComponent,
                                isDisabled: !isNewDefinition,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                    required: true
                                }
                            },
                            {
                                name: 'description',
                                component: i11.TextareaFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                    rows: 3
                                }
                            },
                            {
                                component: i11.RxRevertCustomizationComponent,
                                options: {
                                    overlayGroupId: definitionModel.overlayGroupId,
                                    overlayDescriptor: definitionModel.overlayDescriptor
                                }
                            },
                            {
                                name: 'customizationOptions',
                                component: RecordCustomizationOptionsComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    definitionTypeDisplayName: this.translateService
                                        .instant('com.bmc.arsys.rx.client.record-definition.label')
                                        .toLowerCase(),
                                    recordDefinition: definitionModel
                                }
                            },
                            {
                                name: 'allowNonAdminToDeleteRecordInstances',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: isAuditRecordDefinition || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.allow-non-admin-users-to-delete-records.label')
                                }
                            },
                            {
                                name: 'owner',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                                }
                            },
                            {
                                name: 'lastUpdateTime',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                                }
                            },
                            {
                                name: 'lastChangedBy',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                                }
                            },
                            {
                                name: 'permissions',
                                component: i11.RxPermissionEditorComponent,
                                isDisabled: !isPermissionsCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                    type: i2.RX_PERMISSION.editorContexts.record
                                }
                            },
                            {
                                name: 'shouldExportData',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.label'),
                                    tooltip: new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.tooltip'))
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.title'),
                        controls: [
                            {
                                name: 'recordInheritanceSelector',
                                component: RecordInheritanceEditorComponent,
                                options: {
                                    recordDefinition: definitionModel,
                                    isReadOnly: isOverlayMode || !isPropertiesCustomizationAllowed || isAuditRecordDefinition
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                        controls: __spreadArray([
                            {
                                name: 'enableCognitiveSearch',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enable-cognitive-search.label')
                                }
                            },
                            {
                                name: 'recordSearchFields',
                                component: SearchFieldEditorControlComponent,
                                options: {
                                    recordDefinitionModel: definitionModel,
                                    isReadOnly: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly
                                }
                            }
                        ], __read(weightedRelevancyFields))
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.indexes.title'),
                        controls: [
                            {
                                name: 'indexDefinitions',
                                component: RecordIndexesControlComponent,
                                options: {
                                    isReadOnly: !isIndexCustomizationAllowed || isReadOnly,
                                    definitionModel: definitionModel
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.display-value.title'),
                        controls: [
                            {
                                name: 'displayFieldIdInAssociation',
                                component: i11.SelectFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.associated-display-field.title'),
                                    options: definitionModel.fields
                                        .filter(function (field) { return _this.rxFieldDefinitionService.canBeAssociatedDisplayField(field); })
                                        .map(function (field) { return ({ id: field.id, name: field.name }); })
                                        .sort(function (a, b) { return a.name.localeCompare(b.name); }),
                                    tooltip: new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.associated-display-field.tooltip'))
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'),
                        controls: [
                            {
                                name: 'isAuditingEnabled',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                                }
                            },
                            {
                                name: 'auditRecordDefinitionName',
                                component: i11.TextFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                                }
                            },
                            {
                                name: 'auditSourceRecordDefinitionName',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audited-from.label')
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.title'),
                        controls: [
                            {
                                name: 'isArchivingEnabled',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isOverlayMode || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                                }
                            },
                            {
                                name: 'archiveType',
                                component: i11.SelectFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isOverlayMode || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-operation.label'),
                                    options: archivingOptions
                                }
                            },
                            {
                                name: 'includeAttachments',
                                component: i11.BooleanFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed ||
                                    doNotArchive ||
                                    isOverlayMode ||
                                    isDeleteSourceRecordOperation ||
                                    isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.include-attachments.label'),
                                    shouldDisplayAsCheckbox: true
                                }
                            },
                            {
                                name: 'archiveRecordDefinitionName',
                                component: i11.TextFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed ||
                                    doNotArchive ||
                                    isOverlayMode ||
                                    isDeleteSourceRecordOperation ||
                                    isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archive-record-definition-name.label')
                                }
                            },
                            {
                                name: 'ageQualifierInDays',
                                component: i11.CounterFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-age.label'),
                                    tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-age.tooltip'),
                                    allowIntegerOnly: true
                                }
                            },
                            {
                                name: 'ageQualifierFieldId',
                                component: i11.SelectFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-age-field.label'),
                                    options: definitionModel.fields
                                        .filter(function (field) { return field.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.dateTime; })
                                        .map(function (fieldDefinition) { return ({
                                        name: fieldDefinition.name,
                                        id: fieldDefinition.id
                                    }); })
                                        .sort(function (a, b) { return a.name.localeCompare(b.name); })
                                }
                            },
                            {
                                name: 'archiveDescription',
                                component: i11.TextFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                                }
                            },
                            {
                                name: 'archiveDataCriteria',
                                component: i11.ExpressionFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.label'),
                                    dataDictionary$: expressionConfigurator.getDataDictionary(RX_RECORD_DESIGNER.archiveDataCriteriaPath),
                                    operators: expressionConfigurator.getOperators(RX_RECORD_DESIGNER.archiveDataCriteriaPath),
                                    tooltip: new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.tooltip'))
                                }
                            },
                            {
                                name: 'associationsToFollowForArchive',
                                component: ArchiveAssociationsControlComponent,
                                options: {
                                    definitionModel: definitionModel,
                                    definitionModelFromDefinition: definitionModelFromDefinition,
                                    bundleId: bundleId,
                                    isOverlayMode: isOverlayMode,
                                    isReadOnly: !isPropertiesCustomizationAllowed || doNotArchive
                                }
                            }
                        ]
                    }
                ];
            }
            if (definitionModel.resourceType === i3.RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) {
                configs = [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                        controls: [
                            {
                                name: 'name',
                                component: i11.TextFormControlComponent,
                                isDisabled: !isNewDefinition,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                    required: true
                                }
                            },
                            {
                                name: 'description',
                                component: i11.TextareaFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                    rows: 3
                                }
                            },
                            {
                                name: 'primaryRecordDefinitionName',
                                component: i11.RxDefinitionPickerComponent,
                                isDisabled: true,
                                options: {
                                    definitionType: i11.RxDefinitionPickerType.Record,
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.primary-record.label')
                                }
                            },
                            {
                                name: 'secondaryRecordDefinitionName',
                                component: i11.RxDefinitionPickerComponent,
                                isDisabled: true,
                                options: {
                                    definitionType: i11.RxDefinitionPickerType.Record,
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.secondary-record.label')
                                }
                            },
                            {
                                name: 'joinType',
                                component: i11.SelectFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.join-type.label'),
                                    options: joinTypeOptions
                                }
                            },
                            {
                                name: 'joinCriteria',
                                component: i11.ExpressionFormControlComponent,
                                isDisabled: isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.join-criteria.label'),
                                    dataDictionary$: expressionConfigurator.getDataDictionary(RX_RECORD_DESIGNER.joinCriteriaPath),
                                    operators: expressionConfigurator.getOperators(RX_RECORD_DESIGNER.joinCriteriaPath)
                                }
                            },
                            {
                                component: i11.RxRevertCustomizationComponent,
                                options: {
                                    overlayGroupId: definitionModel.overlayGroupId,
                                    overlayDescriptor: definitionModel.overlayDescriptor
                                }
                            },
                            {
                                name: 'customizationOptions',
                                component: RecordCustomizationOptionsComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    definitionTypeDisplayName: this.translateService
                                        .instant('com.bmc.arsys.rx.client.record-definition.label')
                                        .toLowerCase(),
                                    recordDefinition: definitionModel
                                }
                            },
                            {
                                name: 'owner',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                                }
                            },
                            {
                                name: 'lastUpdateTime',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                                }
                            },
                            {
                                name: 'lastChangedBy',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                                }
                            },
                            {
                                name: 'permissions',
                                component: i11.RxPermissionEditorComponent,
                                isDisabled: !isPermissionsCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                    type: i2.RX_PERMISSION.editorContexts.record
                                }
                            },
                            {
                                name: 'shouldExportData',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.label'),
                                    tooltip: new i2.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.tooltip'))
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                        controls: __spreadArray([
                            {
                                name: 'enableCognitiveSearch',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enable-cognitive-search.label')
                                }
                            },
                            {
                                name: 'recordSearchFields',
                                component: SearchFieldEditorControlComponent,
                                options: {
                                    recordDefinitionModel: definitionModel,
                                    isReadOnly: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly
                                }
                            }
                        ], __read(weightedRelevancyFields))
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'),
                        controls: [
                            {
                                name: 'isAuditingEnabled',
                                component: i11.SwitchFormControlComponent,
                                isDisabled: isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                                }
                            },
                            {
                                name: 'auditRecordDefinitionName',
                                component: i11.TextFormControlComponent,
                                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                                }
                            },
                            {
                                name: 'auditSourceRecordDefinitionName',
                                component: i11.TextFormControlComponent,
                                isDisabled: true,
                                options: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audited-from.label')
                                }
                            }
                        ]
                    }
                ];
            }
            if (isOverlayMode) {
                (_a = configs[0]) === null || _a === void 0 ? void 0 : _a.controls.splice(lodash.findIndex(configs[0].controls, { name: 'shouldExportData' }), 1);
            }
            if (isNewDefinition) {
                (_b = configs[0]) === null || _b === void 0 ? void 0 : _b.controls.splice(lodash.findIndex(configs[0].controls, { name: 'owner' }), 3);
            }
            return configs;
        };
        return RxRecordDesignerInspectorService;
    }());
    RxRecordDesignerInspectorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDesignerInspectorService, deps: [{ token: i3__namespace.RxFieldDefinitionService }, { token: i2__namespace$1.RxOverlayService }, { token: i2__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDesignerInspectorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDesignerInspectorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDesignerInspectorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.RxFieldDefinitionService }, { type: i2__namespace$1.RxOverlayService }, { type: i2__namespace.TranslateService }]; } });

    var RxRecordDesignerService = /** @class */ (function () {
        function RxRecordDesignerService(rxDefinitionNameService, rxFieldDefinitionService, rxGuidService, rxOverlayService, rxRecordDefinitionService, rxLocalizationService, rxDateUtilService) {
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxFieldDefinitionService = rxFieldDefinitionService;
            this.rxGuidService = rxGuidService;
            this.rxOverlayService = rxOverlayService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
            this.rxLocalizationService = rxLocalizationService;
            this.rxDateUtilService = rxDateUtilService;
        }
        // Convert "$ID$ = 'ID'" to ${Record1.PRIMARY_RECORD_DEFINITION.ID} = ${Record2.SECONDARY_RECORD_DEFINITION.ID}
        RxRecordDesignerService.prototype.getJoinCriteriaExpression = function (joinCriteria, primaryRecordDefinitionName, secondaryRecordDefinitionName) {
            var primaryFieldRegExp = new RegExp('\\$(?!NULL)([\\w .]+)\\$', 'g');
            var secondaryFieldRegExp = new RegExp("'([^']+)'", 'g');
            return (joinCriteria || '')
                .replace(primaryFieldRegExp, '${' +
                this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName) +
                '.' +
                i3.RX_RECORD_DEFINITION.sourceRecordTypes.primary +
                '.$1}')
                .replace(secondaryFieldRegExp, '${' +
                this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName) +
                '.' +
                i3.RX_RECORD_DEFINITION.sourceRecordTypes.secondary +
                '.$1}');
        };
        // Convert ${Record1.PRIMARY_RECORD_DEFINITION.ID} = ${Record2.SECONDARY_RECORD_DEFINITION.ID} to "$ID$ = 'ID'"
        RxRecordDesignerService.prototype.getJoinCriteriaArExpression = function (joinCriteria, primaryRecordDefinitionName, secondaryRecordDefinitionName) {
            var primaryFieldRegExp = new RegExp('\\${' +
                this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName) +
                '\\.' +
                i3.RX_RECORD_DEFINITION.sourceRecordTypes.primary +
                '\\.([^}]+)}', 'g');
            var secondaryFieldRegExp = new RegExp('\\${' +
                this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName) +
                '\\.' +
                i3.RX_RECORD_DEFINITION.sourceRecordTypes.secondary +
                '\\.([^}]+)}', 'g');
            return (joinCriteria || '')
                .replace(primaryFieldRegExp, '#$1#')
                .replace(/#/g, '$')
                .replace(secondaryFieldRegExp, "'$1'");
        };
        RxRecordDesignerService.prototype.getDefinitionFromDefinitionModel = function (model, bundleId) {
            var _a, _b, _c;
            return {
                allowFieldsOverlay: model.customizationOptions.allowFieldsOverlay,
                allowNonAdminToDeleteRecordInstances: model.allowNonAdminToDeleteRecordInstances,
                allowIndexesOverlay: model.customizationOptions.allowIndexesOverlay,
                allowOtherPropertiesOverlay: model.customizationOptions.allowOtherPropertiesOverlay,
                allowPermissionsOverlay: model.customizationOptions.allowPermissionsOverlay,
                enableCognitiveSearch: model.enableCognitiveSearch,
                description: model.description,
                guid: model.guid,
                indexDefinitions: model.resourceType === i3.RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                    ? model.indexDefinitions.map(function (indexDefinitionModel) { return lodash.omit(indexDefinitionModel, 'isAutomaticIndex'); })
                    : undefined,
                inheritanceDescriptor: model.recordInheritanceSelector.inheritanceDescriptor,
                isAbstract: (_a = model.recordInheritanceSelector.inheritanceOptions) === null || _a === void 0 ? void 0 : _a.isAbstract,
                isFinal: (_b = model.recordInheritanceSelector.inheritanceOptions) === null || _b === void 0 ? void 0 : _b.isFinal,
                isSharedInstanceStorage: (_c = model.recordInheritanceSelector.inheritanceOptions) === null || _c === void 0 ? void 0 : _c.isSharedInstanceStorage,
                joinCriteria: model.joinCriteria
                    ? this.getJoinCriteriaArExpression(model.joinCriteria, model.primaryRecordDefinitionName, model.secondaryRecordDefinitionName)
                    : undefined,
                joinType: model.joinType,
                lastChangedBy: model.lastChangedBy,
                lastUpdateTime: model.lastUpdateTime ? moment__default["default"](model.lastUpdateTime).format() : null,
                name: bundleId + ":" + model.name,
                overlayGroupId: model.overlayGroupId,
                owner: model.owner,
                overlayDescriptor: model.overlayDescriptor,
                permissions: model.permissions,
                primaryRecordDefinitionName: model.primaryRecordDefinitionName,
                resourceType: model.resourceType,
                secondaryRecordDefinitionName: model.secondaryRecordDefinitionName,
                shouldExportData: model.shouldExportData,
                scope: model.customizationOptions.scope,
                tags: model.tags,
                version: model.version,
                weightedRelevancyFields: {
                    TITLE: model.weightedRelevancyTitle,
                    ENVIRONMENT: model.weightedRelevancyEnvironment,
                    KEYWORDS: model.weightedRelevancyKeywords
                },
                displayFieldIdInAssociation: lodash.find(model.fields, { id: model.displayFieldIdInAssociation })
                    ? model.displayFieldIdInAssociation
                    : null,
                archiveDescriptor: {
                    ageQualifierFieldId: model.ageQualifierFieldId,
                    ageQualifierInDays: model.ageQualifierInDays,
                    archiveRecordDefinitionName: model.archiveRecordDefinitionName,
                    description: model.archiveDescription,
                    archiveType: model.archiveType,
                    includeAttachments: model.includeAttachments,
                    archiveDataCriteria: model.archiveDataCriteria,
                    isEnabled: model.isArchivingEnabled
                },
                associationsToFollowForArchive: model.associationsToFollowForArchive,
                auditDescriptor: {
                    isEnabled: model.isAuditingEnabled,
                    auditRecordDefinitionName: model.auditRecordDefinitionName,
                    auditDataCriteria: model.auditDataCriteria,
                    associatedAuditFieldsByAssociationName: model.associatedAuditFieldsByAssociationName
                },
                auditSourceRecordDefinitionName: model.auditSourceRecordDefinitionName,
                fieldDefinitions: model.fields.map(function (fieldModel) {
                    var _a, _b;
                    var field = {
                        resourceType: fieldModel.resourceType,
                        lastUpdateTime: fieldModel.lastUpdateTime,
                        lastChangedBy: fieldModel.lastChangedBy,
                        owner: fieldModel.owner,
                        name: fieldModel.name,
                        tags: fieldModel.tags,
                        description: fieldModel.description,
                        overlayGroupId: fieldModel.overlayGroupId,
                        id: lodash.isNumber(fieldModel.id) ? fieldModel.id : '',
                        fieldOption: fieldModel.fieldOption,
                        permissions: fieldModel.permissions,
                        fieldTypeName: fieldModel.fieldTypeName,
                        isInherited: fieldModel.isInherited,
                        explicitPermissions: fieldModel.explicitPermissions,
                        overlayDescriptor: fieldModel.overlayDescriptor,
                        fieldMapping: fieldModel.fieldMapping,
                        allowPermissionsOverlay: fieldModel.allowPermissionsOverlay,
                        allowOtherPropertiesOverlay: fieldModel.allowOtherPropertiesOverlay,
                        auditOption: fieldModel.audit ? 'AUDIT_AND_COPY' : fieldModel.copy ? 'COPY' : null,
                        allowPermissionsEdit: fieldModel.allowPermissionsEdit,
                        maxLength: fieldModel.maxLength,
                        searchDefinition: fieldModel.searchDefinition,
                        namedListDefinition: fieldModel.namedListDefinition,
                        shouldPersistEncrypted: fieldModel.shouldPersistEncrypted,
                        shouldPersistHashed: fieldModel.shouldPersistHashed,
                        pattern: fieldModel.pattern,
                        anyUserAllowedToSubmit: fieldModel.anyUserAllowedToSubmit
                    };
                    if (fieldModel.resourceType === i3.RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType) {
                        field.defaultValueByLocale = fieldModel.defaultValueByLocale;
                    }
                    else if (fieldModel.resourceType === i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
                        field.defaultValue = fieldModel.selectionFieldOptionProperties.defaultValue;
                        field.optionNamesById = (_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById;
                        field.optionLabelsById = (_b = fieldModel.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionLabelsById;
                    }
                    else if (fieldModel.resourceType !== i3.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                        field.defaultValue = fieldModel.defaultValue;
                    }
                    return field;
                })
                // TODO-VM: update when new custom component in inspector config is implemented
            };
        };
        RxRecordDesignerService.prototype.getDefinitionModelFromDefinition = function (recordDefinition) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return {
                allowNonAdminToDeleteRecordInstances: recordDefinition.allowNonAdminToDeleteRecordInstances,
                isArchivingEnabled: (_a = recordDefinition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled,
                ageQualifierFieldId: (_b = recordDefinition.archiveDescriptor) === null || _b === void 0 ? void 0 : _b.ageQualifierFieldId,
                ageQualifierInDays: (_c = recordDefinition.archiveDescriptor) === null || _c === void 0 ? void 0 : _c.ageQualifierInDays,
                archiveRecordDefinitionName: (_d = recordDefinition.archiveDescriptor) === null || _d === void 0 ? void 0 : _d.archiveRecordDefinitionName,
                archiveDescription: (_e = recordDefinition.archiveDescriptor) === null || _e === void 0 ? void 0 : _e.description,
                archiveType: (_f = recordDefinition.archiveDescriptor) === null || _f === void 0 ? void 0 : _f.archiveType,
                includeAttachments: (_g = recordDefinition.archiveDescriptor) === null || _g === void 0 ? void 0 : _g.includeAttachments,
                archiveDataCriteria: (_h = recordDefinition.archiveDescriptor) === null || _h === void 0 ? void 0 : _h.archiveDataCriteria,
                associationsToFollowForArchive: {
                    specificAssociationNames: ((_j = recordDefinition.associationsToFollowForArchive) === null || _j === void 0 ? void 0 : _j.specificAssociationNames) || [],
                    selectionType: ((_k = recordDefinition.associationsToFollowForArchive) === null || _k === void 0 ? void 0 : _k.selectionType) || i3.AssociationSelectionType.FollowParent
                },
                isAuditingEnabled: (_l = recordDefinition.auditDescriptor) === null || _l === void 0 ? void 0 : _l.isEnabled,
                auditRecordDefinitionName: (_m = recordDefinition.auditDescriptor) === null || _m === void 0 ? void 0 : _m.auditRecordDefinitionName,
                auditDataCriteria: (_o = recordDefinition.auditDescriptor) === null || _o === void 0 ? void 0 : _o.auditDataCriteria,
                associatedAuditFieldsByAssociationName: (_p = recordDefinition.auditDescriptor) === null || _p === void 0 ? void 0 : _p.associatedAuditFieldsByAssociationName,
                auditSourceRecordDefinitionName: recordDefinition.auditSourceRecordDefinitionName,
                customizationOptions: {
                    allowFieldsOverlay: recordDefinition.allowFieldsOverlay,
                    allowIndexesOverlay: recordDefinition.allowIndexesOverlay,
                    allowOtherPropertiesOverlay: recordDefinition.allowOtherPropertiesOverlay,
                    allowPermissionsOverlay: recordDefinition.allowPermissionsOverlay,
                    allowOverlay: false,
                    fields: recordDefinition.fieldDefinitions,
                    scope: recordDefinition.scope
                },
                description: recordDefinition.description,
                displayFieldIdInAssociation: recordDefinition.displayFieldIdInAssociation,
                enableCognitiveSearch: recordDefinition.enableCognitiveSearch,
                fullPermissions: recordDefinition.fullPermissions,
                guid: recordDefinition.guid || this.rxGuidService.generate(),
                indexDefinitions: (_q = recordDefinition.indexDefinitions) === null || _q === void 0 ? void 0 : _q.map(function (indexDefinition) { return (Object.assign(Object.assign({}, indexDefinition), { isAutomaticIndex: _this.rxRecordDefinitionService.isAutomaticIndex(indexDefinition) })); }),
                isAuditRecordDefinition: recordDefinition.isAuditRecordDefinition,
                joinCriteria: this.getJoinCriteriaExpression(recordDefinition.joinCriteria, recordDefinition.primaryRecordDefinitionName, recordDefinition.secondaryRecordDefinitionName),
                joinType: recordDefinition.joinType,
                lastUpdateTime: recordDefinition.lastUpdateTime
                    ? this.rxDateUtilService.formatDate(recordDefinition.lastUpdateTime, 'medium')
                    : recordDefinition.lastUpdateTime,
                lastChangedBy: recordDefinition.lastChangedBy,
                localizableStringsByFieldId: recordDefinition.localizableStringsByFieldId,
                name: this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                overlayDescriptor: recordDefinition.overlayDescriptor,
                overlayGroupId: recordDefinition.overlayGroupId,
                overlayOperation: this.rxOverlayService.getOverlayOperation(recordDefinition.overlayGroupId, recordDefinition.overlayDescriptor ? recordDefinition.overlayDescriptor.parentOverlayGroupId : null),
                owner: recordDefinition.owner,
                permissions: recordDefinition.permissions,
                primaryRecordDefinitionName: recordDefinition.primaryRecordDefinitionName,
                secondaryRecordDefinitionName: recordDefinition.secondaryRecordDefinitionName,
                recordInheritanceSelector: {
                    inheritanceDescriptor: recordDefinition.inheritanceDescriptor,
                    inheritanceOptions: {
                        isAbstract: recordDefinition.isAbstract,
                        isSharedInstanceStorage: recordDefinition.isSharedInstanceStorage,
                        isFinal: recordDefinition.isFinal
                    },
                    isInheritingCoreFields: null,
                    inheritedFieldDefinitions: []
                },
                recordSearchFields: recordDefinition.fieldDefinitions.filter(function (field) { return field.searchDefinition; }),
                recordInstancePrefix: recordDefinition.recordInstancePrefix,
                recordTypeName: recordDefinition.recordTypeName,
                resourceType: recordDefinition.resourceType,
                rowSecurityPropagations: recordDefinition.rowSecurityPropagations,
                securityLabels: recordDefinition.securityLabels,
                shouldExportData: recordDefinition.shouldExportData,
                tags: recordDefinition.tags,
                upgradeVersion: recordDefinition.upgradeVersion,
                version: recordDefinition.version,
                weightedRelevancyTitle: (_r = recordDefinition.weightedRelevancyFields) === null || _r === void 0 ? void 0 : _r.TITLE,
                weightedRelevancyEnvironment: (_s = recordDefinition.weightedRelevancyFields) === null || _s === void 0 ? void 0 : _s.ENVIRONMENT,
                weightedRelevancyKeywords: (_t = recordDefinition.weightedRelevancyFields) === null || _t === void 0 ? void 0 : _t.KEYWORDS,
                fields: recordDefinition.fieldDefinitions.map(function (fieldDefinition) { return ({
                    allowOtherPropertiesOverlay: fieldDefinition.allowOtherPropertiesOverlay,
                    allowPermissionsEdit: fieldDefinition.allowPermissionsEdit,
                    allowPermissionsOverlay: fieldDefinition.allowPermissionsOverlay,
                    anyUserAllowedToSubmit: fieldDefinition.anyUserAllowedToSubmit,
                    audit: fieldDefinition.auditOption === 'AUDIT_AND_COPY',
                    copy: fieldDefinition.auditOption === 'AUDIT_AND_COPY' || fieldDefinition.auditOption === 'COPY',
                    defaultValue: fieldDefinition.defaultValue,
                    defaultValueByLocale: fieldDefinition.defaultValueByLocale,
                    description: fieldDefinition.description,
                    explicitPermissions: fieldDefinition.explicitPermissions,
                    fieldMapping: fieldDefinition.fieldMapping,
                    fieldOption: fieldDefinition.fieldOption,
                    fieldTypeName: fieldDefinition.fieldTypeName,
                    guid: _this.rxGuidService.generate(),
                    id: lodash.isNumber(fieldDefinition.id) ? fieldDefinition.id : fieldDefinition.customId || '',
                    isCoreField: _this.rxFieldDefinitionService.isCoreField(fieldDefinition),
                    isInherited: fieldDefinition.isInherited,
                    isNewField: false,
                    lastChangedBy: fieldDefinition.lastChangedBy,
                    lastUpdateTime: fieldDefinition.lastUpdateTime,
                    maxLength: fieldDefinition.maxLength,
                    maxSize: fieldDefinition.maxSize,
                    maxValue: fieldDefinition.maxValue,
                    minValue: fieldDefinition.minValue,
                    name: fieldDefinition.name,
                    overlayDescriptor: fieldDefinition.overlayDescriptor,
                    overlayGroupId: fieldDefinition.overlayGroupId,
                    owner: fieldDefinition.owner,
                    permissions: fieldDefinition.permissions,
                    precision: fieldDefinition.precision,
                    resourceType: fieldDefinition.resourceType,
                    searchDefinition: fieldDefinition.searchDefinition,
                    selectionFieldOptionProperties: {
                        defaultValue: fieldDefinition.defaultValue,
                        optionNamesById: fieldDefinition.optionNamesById,
                        optionLabelsById: fieldDefinition.optionLabelsById
                    },
                    shouldPersistEncrypted: fieldDefinition.shouldPersistEncrypted,
                    shouldPersistHashed: fieldDefinition.shouldPersistHashed,
                    namedListDefinition: fieldDefinition.namedListDefinition,
                    pattern: fieldDefinition.pattern,
                    tags: fieldDefinition.tags
                }); })
            };
        };
        return RxRecordDesignerService;
    }());
    RxRecordDesignerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDesignerService, deps: [{ token: i2__namespace$1.RxDefinitionNameService }, { token: i3__namespace.RxFieldDefinitionService }, { token: i1__namespace$2.RxGuidService }, { token: i2__namespace$1.RxOverlayService }, { token: i3__namespace.RxRecordDefinitionService }, { token: i2__namespace$1.RxLocalizationService }, { token: i1__namespace$2.RxDateUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDesignerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDesignerService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDesignerService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i2__namespace$1.RxDefinitionNameService }, { type: i3__namespace.RxFieldDefinitionService }, { type: i1__namespace$2.RxGuidService }, { type: i2__namespace$1.RxOverlayService }, { type: i3__namespace.RxRecordDefinitionService }, { type: i2__namespace$1.RxLocalizationService }, { type: i1__namespace$2.RxDateUtilsService }]; } });

    var RecordDesignerComponent = /** @class */ (function () {
        function RecordDesignerComponent(store$, rxNotificationService, rxOverlayService, rxRecordDefinitionValidatorService, rxRecordDesignerInspectorService, rxDefinitionNameService, rxFieldDefinitionManagerService, rxRecordDefinitionService, rxGlobalCacheService, translateService, datePipe, rxModalService, rxFieldDefinitionService, rxRecordDesignerService, rxExpressionEditorService, rxRecordDefinitionCacheService, rxGuidService, injector) {
            var _this = this;
            this.store$ = store$;
            this.rxNotificationService = rxNotificationService;
            this.rxOverlayService = rxOverlayService;
            this.rxRecordDefinitionValidatorService = rxRecordDefinitionValidatorService;
            this.rxRecordDesignerInspectorService = rxRecordDesignerInspectorService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.translateService = translateService;
            this.datePipe = datePipe;
            this.rxModalService = rxModalService;
            this.rxFieldDefinitionService = rxFieldDefinitionService;
            this.rxRecordDesignerService = rxRecordDesignerService;
            this.rxExpressionEditorService = rxExpressionEditorService;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.rxGuidService = rxGuidService;
            this.injector = injector;
            this.definitionSaved = new i0.EventEmitter();
            this.definitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.newTitle = "<" + this.translateService.instant('com.bmc.arsys.rx.client.record-designer.new-record.title') + ">";
            this.definition = null;
            this.isInheritColumnHidden = true;
            this.isJoinRecordDefinition = false;
            this.dataTypes = [
                i3.RX_RECORD_DEFINITION.dataTypes.attachment,
                i3.RX_RECORD_DEFINITION.dataTypes.boolean,
                i3.RX_RECORD_DEFINITION.dataTypes.character,
                i3.RX_RECORD_DEFINITION.dataTypes.dateOnly,
                i3.RX_RECORD_DEFINITION.dataTypes.dateTime,
                i3.RX_RECORD_DEFINITION.dataTypes.localizedCharacter,
                i3.RX_RECORD_DEFINITION.dataTypes.timeOnly,
                i3.RX_RECORD_DEFINITION.dataTypes.integer,
                i3.RX_RECORD_DEFINITION.dataTypes.selection,
                i3.RX_RECORD_DEFINITION.dataTypes.decimal,
                i3.RX_RECORD_DEFINITION.dataTypes.real
            ].sort(function (a, b) { return a.displayName.localeCompare(b.displayName); });
            this.inspectorTabIndexSubject = new rxjs.Subject();
            this.inspectorTabIndex$ = this.store$.select(inspectorTabIndexSelector);
            this.selectedFieldGuid$ = this.store$.select(selectedFieldGuidSelector);
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.inspectorFocusEditorSubject = new rxjs.Subject();
            this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
            this.bundleId$ = this.store$.select(bundleIdSelector);
            this.isDesignMode$ = this.store$.select(isDesignModeSelector);
            this.definitionModel$ = this.store$.select(definitionModelSelector);
            this.isDirty$ = this.store$.select(isDirtySelector);
            this.bundleFriendlyName$ = this.bundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleFriendlyName(bundleId); }));
            this.definitionDisplayName$ = this.definitionModel$.pipe(operators.map(function (updatedModel) { return _this.rxDefinitionNameService.getDisplayName(updatedModel.name); }), operators.startWith(null));
            this.definitionModelFromDefinition$ = this.store$
                .select(definitionModelFromDefinitionSelector)
                .pipe(operators.shareReplay(1));
            this.primaryRecordDefinition$ = this.definitionModelFromDefinition$.pipe(operators.pluck('primaryRecordDefinitionName'), operators.distinctUntilChanged(), operators.filter(Boolean), operators.switchMap(function (primaryRecordDefinitionName) { return _this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName); }));
            this.secondaryRecordDefinition$ = this.definitionModelFromDefinition$.pipe(operators.pluck('secondaryRecordDefinitionName'), operators.distinctUntilChanged(), operators.filter(Boolean), operators.switchMap(function (secondaryRecordDefinitionName) { return _this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName); }));
            this.joinRecordDataDictionary$ = rxjs.combineLatest([
                this.primaryRecordDefinition$,
                this.secondaryRecordDefinition$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), primaryRecordDefinition = _d[0], secondaryRecordDefinition = _d[1];
                return [
                    {
                        recordDefinitionName: _this.rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                        label: "(" + _this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label') + ")",
                        type: i3.RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                        fieldDefinitions: primaryRecordDefinition.fieldDefinitions
                    },
                    {
                        recordDefinitionName: _this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                        label: "(" + _this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label') + ")",
                        type: i3.RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                        fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
                    }
                ];
            }), operators.map(function (records) {
                return records.map(function (record) { return ({
                    label: record.recordDefinitionName + " " + record.label,
                    expanded: true,
                    children: lodash.chain(record.fieldDefinitions)
                        .map(function (fieldDefinition) {
                        if (fieldDefinition.resourceType !== i3.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                            return {
                                label: record.recordDefinitionName + "." + fieldDefinition.name,
                                icon: 'd-icon-field_text',
                                expression: "${" + record.recordDefinitionName + "." + record.type + "." + fieldDefinition.name + "}"
                            };
                        }
                    })
                        .compact()
                        .sortBy(function (item) { return item.label.toLocaleLowerCase(); })
                        .value()
                }); });
            }));
            this.isNewDefinition$ = this.definitionModelFromDefinition$.pipe(operators.map(function (definitionModel) { return !Boolean(definitionModel.lastUpdateTime); }));
            this.isJoinRecordDefinition$ = this.definitionModelFromDefinition$.pipe(operators.map(function (definitionModel) { return _this.rxRecordDefinitionService.isJoinRecord(definitionModel); }), operators.shareReplay(1));
            this.definitionFromDefinitionModel$ = rxjs.combineLatest([
                this.definitionModel$,
                this.bundleId$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), definitionModel = _d[0], bundleId = _d[1];
                return _this.rxRecordDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId);
            }));
            this.isFieldsCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(operators.map(function (recordDefinition) { return _this.rxOverlayService.isCustomizationEnabled('allowFieldsOverlay', recordDefinition); }), operators.distinctUntilChanged(), operators.shareReplay(1));
            this.isPropertiesCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(operators.map(function (recordDefinition) { return _this.rxOverlayService.isCustomizationEnabled('allowOtherPropertiesOverlay', recordDefinition); }), operators.distinctUntilChanged(), operators.shareReplay(1));
            this.isPermissionsCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(operators.map(function (recordDefinition) { return _this.rxOverlayService.isCustomizationEnabled('allowPermissionsOverlay', recordDefinition); }), operators.distinctUntilChanged(), operators.shareReplay(1));
            this.isIndexCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(operators.map(function (recordDefinition) { return _this.rxOverlayService.isCustomizationEnabled('allowIndexesOverlay', recordDefinition); }), operators.distinctUntilChanged(), operators.shareReplay(1));
            this.areNewDefinitionsAllowed$ = this.bundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxOverlayService.areNewDefinitionsAllowed(bundleId); }));
            this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(operators.filter(function (definition) { return !!definition.lastUpdateTime; }), operators.withLatestFrom(this.areNewDefinitionsAllowed$, this.isFieldsCustomizationAllowed$, this.isPropertiesCustomizationAllowed$, this.isPermissionsCustomizationAllowed$, this.isIndexCustomizationAllowed$), operators.map(function (_c) {
                var _d = __read(_c, 6), definition = _d[0], areNewDefinitionsAllowed = _d[1], isFieldsCustomizationAllowed = _d[2], isPropertiesCustomizationAllowed = _d[3], isPermissionsCustomizationAllowed = _d[4], isIndexCustomizationAllowed = _d[5];
                return !areNewDefinitionsAllowed ||
                    (!isFieldsCustomizationAllowed &&
                        !isPropertiesCustomizationAllowed &&
                        !isPermissionsCustomizationAllowed &&
                        !isIndexCustomizationAllowed);
            }), operators.tap(function (isReadOnly) {
                if (isReadOnly) {
                    _this.rxNotificationService.addWarningMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
                }
            }), operators.startWith(false), operators.shareReplay(1));
            this.definitionInspectorConfig$ = rxjs.combineLatest([
                this.isNewDefinition$,
                this.definitionModel$,
                this.definitionModelFromDefinition$,
                this.bundleId$,
                this.isPropertiesCustomizationAllowed$,
                this.isIndexCustomizationAllowed$,
                this.isPermissionsCustomizationAllowed$,
                this.isFieldsCustomizationAllowed$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 9), isNewDefinition = _d[0], definitionModel = _d[1], definitionModelFromDefinition = _d[2], bundleId = _d[3], isPropertiesCustomizationAllowed = _d[4], isIndexCustomizationAllowed = _d[5], isPermissionsCustomizationAllowed = _d[6], isFieldsCustomizationAllowed = _d[7], isReadOnly = _d[8];
                return _this.rxRecordDesignerInspectorService.getDefinitionInspectorConfig(isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly, _this.expressionConfigurator);
            }));
            this.fieldGridRows$ = this.definitionModel$.pipe(operators.map(function (model) { return model.fields.map(function (field) {
                var _a, _b;
                var invertedSourceRecordTypes = lodash.invert(i3.RX_RECORD_DEFINITION.sourceRecordTypes);
                var type = invertedSourceRecordTypes[(_a = field.fieldMapping) === null || _a === void 0 ? void 0 : _a.source];
                return {
                    guid: field.guid,
                    name: field.name,
                    id: lodash.isNumber(field.id) ? field.id : '',
                    isInherited: field.isInherited,
                    fieldOption: field.fieldOption,
                    defaultValue: field.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.selection
                        ? (_b = field.selectionFieldOptionProperties.optionNamesById) === null || _b === void 0 ? void 0 : _b[field.selectionFieldOptionProperties.defaultValue]
                        : field.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.dateOnly
                            ? _this.datePipe.transform(field.defaultValue)
                            : field.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.dateTime
                                ? _this.datePipe.transform(field.defaultValue, 'medium')
                                : field.defaultValue,
                    resourceType: _this.translateService.instant(lodash.find(i3.RX_RECORD_DEFINITION.dataTypes, { resourceType: field.resourceType }).labelKey),
                    isCoreField: _this.rxFieldDefinitionService.isCoreField(field),
                    sourceRecord: lodash.includes(i3.RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id)
                        ? ''
                        : _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.source-record.label', {
                            recordName: _this.rxDefinitionNameService.getDisplayName(model[type + 'RecordDefinitionName']),
                            recordType: lodash.capitalize(type)
                        })
                };
            }); }));
            this.isExternalRecordDefinition$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.rxRecordDefinitionService.isExternalRecord(definitionModel); }));
            this.selectedFieldGridRows$ = this.selectedFieldGuid$.pipe(operators.withLatestFrom(this.fieldGridRows$), operators.map(function (_c) {
                var _d = __read(_c, 2), guid = _d[0], fieldGridRows = _d[1];
                return (guid ? [lodash.find(fieldGridRows, { guid: guid })] : []);
            }), operators.startWith([]));
            this.selectedFieldModel$ = rxjs.combineLatest([
                this.selectedFieldGuid$,
                this.definitionModel$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), guid = _d[0], definitionModel = _d[1];
                return lodash.find(definitionModel.fields, { guid: guid });
            }), operators.startWith(null), operators.shareReplay(1));
            this.selectedFieldInspectorConfig$ = this.selectedFieldModel$.pipe(operators.withLatestFrom(this.definitionModel$, this.isReadOnly$), operators.map(function (_c) {
                var _d = __read(_c, 3), fieldModel = _d[0], definitionModel = _d[1], isReadOnly = _d[2];
                return fieldModel
                    ? _this.rxFieldDefinitionManagerService.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly)
                    : null;
            }));
            this.isJoinOrExternalRecord$ = rxjs.combineLatest([
                this.isJoinRecordDefinition$,
                this.isExternalRecordDefinition$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), isJoinRecordDefinition = _d[0], isExternalRecordDefinition = _d[1];
                return isJoinRecordDefinition || isExternalRecordDefinition;
            }));
            this.validationIssues$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.rxRecordDefinitionValidatorService.validate(definitionModel); }));
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (issueSections) { return lodash.some(issueSections, {
                issues: [{ type: i1.ValidationIssueType.Error }]
            }); }), operators.distinctUntilChanged());
            this.hasValidationWarnings$ = this.validationIssues$.pipe(operators.map(function (issueSections) { return lodash.some(issueSections, {
                issues: [{ type: i1.ValidationIssueType.Warning }]
            }); }), operators.distinctUntilChanged());
            this.isSaveButtonDisabled$ = rxjs.combineLatest([
                this.hasValidationErrors$,
                this.isDirty$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 3), hasValidationErrors = _d[0], isDirty = _d[1], isReadOnly = _d[2];
                return hasValidationErrors || !isDirty || isReadOnly;
            }), operators.startWith(true));
            this.breadcrumbItems$ = rxjs.combineLatest([
                this.definitionDisplayName$,
                this.selectedFieldModel$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), definitionDisplayName = _d[0], selectedFieldModel = _d[1];
                var _a;
                return [
                    {
                        data: null,
                        label: _this.rxDefinitionNameService.getDisplayName((_a = _this.definition) === null || _a === void 0 ? void 0 : _a.name) || definitionDisplayName || _this.newTitle
                    },
                    { data: null, label: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.name }
                ].filter(function (item) { return item.label; });
            }));
            this.definitionForJsonViewer$ = this.isDesignMode$.pipe(operators.switchMap(function (isDesignMode) { return (isDesignMode ? rxjs.of(null) : _this.definitionFromDefinitionModel$); }));
            this.overriddenRecordProperties$ = rxjs.combineLatest([
                this.definitionModelFromDefinition$,
                this.definitionModel$
            ]).pipe(operators.scan(function (acc, _c) {
                var _d = __read(_c, 2), definitionModelFromDefinition = _d[0], definitionModel = _d[1];
                var overriddenRecordFields = lodash.intersectionBy(definitionModelFromDefinition.fields, definitionModel.recordInheritanceSelector.inheritedFieldDefinitions, 'id');
                acc = Object.assign(Object.assign({}, acc), { fields: lodash.map(overriddenRecordFields, 'name').join(', ') });
                return acc;
            }, {}));
            this.isDeleteFieldButtonDisabled$ = this.selectedFieldModel$.pipe(operators.withLatestFrom(this.definitionModel$), operators.map(function (_c) {
                var _d = __read(_c, 2), selectedFieldModel = _d[0], definitionModel = _d[1];
                return !selectedFieldModel ||
                    definitionModel.isAuditRecordDefinition ||
                    _this.rxFieldDefinitionService.isCoreField(selectedFieldModel) ||
                    selectedFieldModel.isInherited ||
                    !_this.rxFieldDefinitionService.isFieldInUserOverlay(selectedFieldModel);
            }));
            this.isCopyFieldButtonDisabled$ = this.selectedFieldModel$.pipe(operators.withLatestFrom(this.isFieldsCustomizationAllowed$, this.bundleId$), operators.map(function (_c) {
                var _d = __read(_c, 3), selectedFieldModel = _d[0], isFieldsCustomizationAllowed = _d[1], bundleId = _d[2];
                return !selectedFieldModel ||
                    _this.rxFieldDefinitionService.isCoreField(selectedFieldModel) ||
                    selectedFieldModel.isInherited ||
                    !isFieldsCustomizationAllowed ||
                    !_this.rxOverlayService.isBundleEditable(bundleId);
            }));
            this.expressionConfigurator = new RecordDesignerExpressionConfigurator(this.injector);
            this.dataDictionary$ = this.definitionModelFromDefinition$.pipe(operators.withLatestFrom(this.store$.select(bundleIdSelector)), operators.takeUntil(this.destroyed$), operators.switchMap(function (_c) {
                var _d = __read(_c, 2), definitionModel = _d[0], bundleId = _d[1];
                return _this.expressionConfigurator.recordExpressionDataDictionary(definitionModel, bundleId);
            }));
            this.isInheritColumnHidden$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { var _a; return lodash.isEmpty((_a = definitionModel.recordInheritanceSelector) === null || _a === void 0 ? void 0 : _a.inheritedFieldDefinitions); }), operators.distinctUntilChanged(), operators.startWith(true));
            this.vm$ = rxjs.combineLatest([
                this.breadcrumbItems$,
                this.bundleFriendlyName$,
                this.definitionDisplayName$,
                this.definitionInspectorConfig$,
                this.definitionModel$,
                this.hasValidationErrors$,
                this.hasValidationWarnings$,
                this.validationIssues$,
                this.isSaveButtonDisabled$,
                this.fieldGridRows$,
                this.selectedFieldGridRows$,
                this.definitionForJsonViewer$,
                this.isDesignMode$,
                this.selectedFieldModel$,
                this.selectedFieldInspectorConfig$,
                this.selectedFieldGuid$,
                this.isFieldsCustomizationAllowed$,
                this.isDeleteFieldButtonDisabled$,
                this.isCopyFieldButtonDisabled$,
                this.isJoinOrExternalRecord$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 21), breadcrumbItems = _d[0], bundleFriendlyName = _d[1], definitionDisplayName = _d[2], definitionInspectorConfig = _d[3], definitionModel = _d[4], hasValidationErrors = _d[5], hasValidationWarnings = _d[6], validationIssues = _d[7], isSaveButtonDisabled = _d[8], fieldGridRows = _d[9], selectedFieldGridRows = _d[10], definitionForJsonViewer = _d[11], isDesignMode = _d[12], selectedFieldModel = _d[13], selectedFieldInspectorConfig = _d[14], selectedFieldGuid = _d[15], isFieldsCustomizationAllowed = _d[16], isDeleteFieldButtonDisabled = _d[17], isCopyFieldButtonDisabled = _d[18], isJoinOrExternalRecord = _d[19], isReadOnly = _d[20];
                return ({
                    breadcrumbItems: breadcrumbItems,
                    bundleFriendlyName: bundleFriendlyName,
                    definitionDisplayName: definitionDisplayName,
                    definitionInspectorConfig: definitionInspectorConfig,
                    definitionModel: definitionModel,
                    hasValidationErrors: hasValidationErrors,
                    hasValidationWarnings: hasValidationWarnings,
                    validationIssues: validationIssues,
                    isSaveButtonDisabled: isSaveButtonDisabled,
                    fieldGridRows: fieldGridRows,
                    selectedFieldGridRows: selectedFieldGridRows,
                    definitionForJsonViewer: definitionForJsonViewer,
                    isDesignMode: isDesignMode,
                    selectedFieldModel: selectedFieldModel,
                    selectedFieldInspectorConfig: selectedFieldInspectorConfig,
                    selectedFieldGuid: selectedFieldGuid,
                    isFieldsCustomizationAllowed: isFieldsCustomizationAllowed,
                    isDeleteFieldButtonDisabled: isDeleteFieldButtonDisabled,
                    isCopyFieldButtonDisabled: isCopyFieldButtonDisabled,
                    isJoinOrExternalRecord: isJoinOrExternalRecord,
                    isReadOnly: isReadOnly
                });
            }));
            this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
        }
        RecordDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.inspectorTabIndex$.pipe(operators.skip(1), operators.takeUntil(this.destroyed$)).subscribe(function (inspectorTabIndex) {
                if (!lodash.isNull(inspectorTabIndex)) {
                    _this.adaptSidebarComponent.openPanel(inspectorTabIndex);
                }
            });
            this.inspectorTabIndexSubject.pipe(operators.skip(1), operators.takeUntil(this.destroyed$)).subscribe(function (inspectorTabIndex) {
                _this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex: inspectorTabIndex }));
            });
            this.store$
                .select(savedDefinitionNameSelector)
                .pipe(operators.skip(1), operators.takeUntil(this.destroyed$))
                .subscribe(function (savedDefinitionName) {
                _this.definitionSaved.emit(savedDefinitionName);
            });
            this.expressionConfigurator.configureForProperty({
                propertyPath: RX_RECORD_DESIGNER.archiveDataCriteriaPath,
                dataDictionary$: this.dataDictionary$,
                operators: i2.ExpressionOperatorRowsByGroup.get(i2.ExpressionOperatorGroup.All)
            });
            this.expressionConfigurator.configureForProperty({
                propertyPath: RX_RECORD_DESIGNER.joinCriteriaPath,
                dataDictionary$: this.joinRecordDataDictionary$,
                operators: i2.ExpressionOperatorRowsByGroup.get(i2.ExpressionOperatorGroup.All)
            });
            rxjs.combineLatest([this.isInheritColumnHidden$, this.isJoinRecordDefinition$])
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (_c) {
                var _d = __read(_c, 2), isInheritColumnHidden = _d[0], isJoinRecordDefinition = _d[1];
                _this.isInheritColumnHidden = isInheritColumnHidden;
                _this.isJoinRecordDefinition = isJoinRecordDefinition;
            });
            this.columns = [
                {
                    field: 'name',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                },
                {
                    field: 'sourceRecord',
                    header: this.translateService.instant('Source Record'),
                    hidden: function () { return !_this.isJoinRecordDefinition; }
                },
                {
                    field: 'id',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-id.label')
                },
                {
                    field: 'isInherited',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.inherited.title'),
                    hidden: function () { return _this.isInheritColumnHidden; },
                    cellTemplate: this.inheritedCellTemplate
                },
                {
                    field: 'resourceType',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.data-type.title'),
                    cellTemplate: this.dataTypeCellTemplate
                },
                {
                    field: 'fieldOption',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.is-required-field.title'),
                    cellTemplate: this.requiredCellTemplate
                },
                {
                    field: 'defaultValue',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.default-value.title')
                }
            ];
        };
        RecordDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue) {
                this.store$.dispatch(init({ payload: this.configuration }));
            }
        };
        RecordDesignerComponent.prototype.onEditorEvent = function (event) {
            var _this = this;
            if (event.type === i11.RX_EXPRESSION_EDITOR.events.openExpressionEditor &&
                event.payload.propertyPath === RX_RECORD_DESIGNER.archiveDataCriteriaPath) {
                this.definitionModel$.pipe(operators.take(1)).subscribe(function (definitionModel) {
                    _this.rxExpressionEditorService
                        .openEditor({
                        property: {
                            path: RX_RECORD_DESIGNER.archiveDataCriteriaPath,
                            value: definitionModel.archiveDataCriteria,
                            label: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.label')
                        },
                        isReadOnly: event.payload.isReadOnly,
                        expressionConfigurator: _this.expressionConfigurator,
                        legend: [
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                                icon: 'd-icon-arrow_right_square_input'
                            }
                        ]
                    })
                        .subscribe(function (expression) {
                        _this.store$.dispatch(updateDefinitionModelFromDesigner({
                            definitionModelFromDesigner: { archiveDataCriteria: expression.value }
                        }));
                    });
                });
            }
            if (event.type === i11.RX_EXPRESSION_EDITOR.events.openExpressionEditor &&
                event.payload.propertyPath === RX_RECORD_DESIGNER.joinCriteriaPath) {
                this.definitionModel$.pipe(operators.take(1)).subscribe(function (definitionModel) {
                    _this.rxExpressionEditorService
                        .openEditor({
                        property: {
                            path: RX_RECORD_DESIGNER.joinCriteriaPath,
                            value: definitionModel.joinCriteria,
                            label: _this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label')
                        },
                        isReadOnly: event.payload.isReadOnly,
                        expressionConfigurator: _this.expressionConfigurator,
                        legend: [
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                                icon: 'd-icon-arrow_right_square_input'
                            }
                        ]
                    })
                        .subscribe(function (expression) {
                        _this.store$.dispatch(updateDefinitionModelFromDesigner({
                            definitionModelFromDesigner: { joinCriteria: expression.value }
                        }));
                    });
                });
            }
        };
        RecordDesignerComponent.prototype.onSelectionChange = function (selectedFieldModel) {
            this.store$.dispatch(setSelectedFieldGuid({ guid: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.guid }));
        };
        RecordDesignerComponent.prototype.onDefinitionModelChange = function (newDefinitionModel) {
            this.store$.dispatch(updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: newDefinitionModel
            }));
        };
        RecordDesignerComponent.prototype.onSelectedFieldModelChange = function (newSelectedFieldModel) {
            this.store$.dispatch(updateSelectedFieldModel({ selectedFieldModel: newSelectedFieldModel }));
        };
        RecordDesignerComponent.prototype.toggleDesignMode = function () {
            this.store$.dispatch(toggleDesignMode());
        };
        RecordDesignerComponent.prototype.onSidebarToggle = function (event) {
            this.inspectorTabIndexSubject.next(event.id);
        };
        RecordDesignerComponent.prototype.addNewField = function (resourceType) {
            this.store$.dispatch(createNewFieldModel({ resourceType: resourceType }));
        };
        RecordDesignerComponent.prototype.openAddNewField = function () {
            var _this = this;
            this.definitionModel$.pipe(operators.take(1)).subscribe(function (definitionModel) {
                _this.rxModalService
                    .openModal({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.add-fields.title'),
                    content: AddJoinFieldsEditorComponent,
                    size: 'rx-md',
                    blockKeyboard: false,
                    data: {
                        primaryRecordDefinitionName: definitionModel.primaryRecordDefinitionName,
                        secondaryRecordDefinitionName: definitionModel.secondaryRecordDefinitionName,
                        addedFields: definitionModel.fields
                    }
                })
                    .then(function (fieldModels) {
                    var newFieldModels = fieldModels.map(function (newField) { return (Object.assign(Object.assign({}, newField), { guid: _this.rxGuidService.generate(), id: null, defaultValueByLocale: {}, selectionFieldOptionProperties: newField.resourceType === i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                            ? {
                                defaultValue: newField.defaultValue,
                                optionNamesById: newField.optionNamesById,
                                optionLabelsById: newField.optionLabelsById
                            }
                            : null })); });
                    _this.store$.dispatch(addNewFieldModels({ newFieldModels: newFieldModels }));
                })
                    .catch(lodash.noop);
            });
        };
        RecordDesignerComponent.prototype.copySelectedField = function () {
            this.store$.dispatch(copySelectedField());
        };
        RecordDesignerComponent.prototype.deleteSelectedField = function () {
            this.store$.dispatch(deleteSelectedField());
        };
        RecordDesignerComponent.prototype.onBreadcrumbSelected = function () {
            this.store$.dispatch(clearSelectedFieldGuid());
        };
        RecordDesignerComponent.prototype.canDeactivate = function () {
            var canDeactivate = true;
            this.isDirty$.pipe(operators.take(1)).subscribe(function (isDirty) {
                canDeactivate = !isDirty;
            });
            return canDeactivate;
        };
        RecordDesignerComponent.prototype.saveDefinition = function () {
            var _this = this;
            rxjs.combineLatest([this.definitionFromDefinitionModel$, this.isNewDefinition$, this.overriddenRecordProperties$])
                .pipe(operators.take(1), operators.switchMap(function (_c) {
                var _d = __read(_c, 3), definition = _d[0], isNewDefinition = _d[1], overriddenRecordProperties = _d[2];
                if (isNewDefinition) {
                    return _this.rxRecordDefinitionService.create(definition);
                }
                else if (!isNewDefinition && !lodash.isEmpty(overriddenRecordProperties.fields)) {
                    return rxjs.from(_this.rxModalService.openModal({
                        title: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inheritance-issue-modal.title'),
                        content: InheritanceIssueInfoComponent,
                        data: { overriddenRecordProperties: overriddenRecordProperties },
                        size: 'sm'
                    })).pipe(operators.filter(function (result) { return result === 'continue'; }), operators.switchMap(function () { return _this.rxRecordDefinitionService.update(definition); }));
                }
                else {
                    return _this.rxRecordDefinitionService.update(definition);
                }
            }), operators.withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)))
                .subscribe(function (_c) {
                var _d = __read(_c, 3), response = _d[0], definitionModel = _d[1], bundleId = _d[2];
                _this.store$.dispatch(saveDefinitionSuccess({
                    savedDefinitionName: bundleId + ":" + definitionModel.name
                }));
            });
        };
        RecordDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            var _this = this;
            if (validationIssue.data.guid) {
                this.store$.dispatch(setSelectedFieldGuid({ guid: validationIssue.data.guid }));
            }
            else {
                this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex: 0 }));
            }
            setTimeout(function () { return _this.inspectorFocusEditorSubject.next({
                editorName: validationIssue.data.propertyName,
                data: validationIssue.data
            }); }, 10);
        };
        RecordDesignerComponent.prototype.onFormInitialized = function () {
            this.inspectorFocusEditorSubject.next({
                editorName: 'name',
                data: {}
            });
        };
        RecordDesignerComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.inspectorTabIndexSubject.complete();
            this.inspectorFocusEditorSubject.complete();
            this.store$.dispatch(destroy());
        };
        return RecordDesignerComponent;
    }());
    RecordDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerComponent, deps: [{ token: i1__namespace$3.Store }, { token: i2__namespace$1.RxNotificationService }, { token: i2__namespace$1.RxOverlayService }, { token: RxRecordDefinitionValidatorService }, { token: RxRecordDesignerInspectorService }, { token: i2__namespace$1.RxDefinitionNameService }, { token: RxFieldDefinitionManagerService }, { token: i3__namespace.RxRecordDefinitionService }, { token: i2__namespace$1.RxGlobalCacheService }, { token: i2__namespace.TranslateService }, { token: i5__namespace.DatePipe }, { token: i1__namespace.RxModalService }, { token: i3__namespace.RxFieldDefinitionService }, { token: RxRecordDesignerService }, { token: i11__namespace.RxExpressionEditorService }, { token: i3__namespace.RxRecordDefinitionCacheService }, { token: i1__namespace$2.RxGuidService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDesignerComponent, selector: "rx-record-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "adaptSidebarComponent", first: true, predicate: i1$1.AdaptSidebarComponent, descendants: true }, { propertyName: "requiredCellTemplate", first: true, predicate: ["requiredCellTemplate"], descendants: true, static: true }, { propertyName: "dataTypeCellTemplate", first: true, predicate: ["dataTypeCellTemplate"], descendants: true, static: true }, { propertyName: "inheritedCellTemplate", first: true, predicate: ["inheritedCellTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected()\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    [isDesignMode]=\"vm.isDesignMode\"\n  ></rx-designer-header>\n\n  <adapt-sidebar\n    [openedId]=\"0\"\n    [adjustMainContainerWidth]=\"true\"\n    position=\"right\"\n    class=\"h-100\"\n    [hidden]=\"vm.definitionForJsonViewer\"\n    (isPanelOpenedCurrently)=\"onSidebarToggle($event)\"\n  >\n    <adapt-sidebar-item\n      iconClass=\"d-icon-pencil\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.properties.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.properties.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.definitionInspectorConfig\"\n        [model]=\"vm.definitionModel\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n        (modelChange)=\"onDefinitionModelChange($event)\"\n        (formInitialized)=\"onFormInitialized()\"\n        (editorEvent)=\"onEditorEvent($event)\"\n      ></rx-form-builder>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      iconClass=\"d-icon-gear\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.selectedFieldInspectorConfig\"\n        [model]=\"vm.selectedFieldModel\"\n        (modelChange)=\"onSelectedFieldModelChange($event)\"\n        [guid]=\"vm.selectedFieldGuid\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n      ></rx-form-builder>\n\n      <adapt-alert\n        [hidden]=\"vm.selectedFieldModel\"\n        class=\"p-3\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.designer.validation.no-field-selected.message' | translate,\n          variant: 'info',\n          type: 'inline'\n        }\"\n      ></adapt-alert>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      [iconClass]=\"\n        vm.hasValidationErrors\n          ? 'd-icon-exclamation_triangle text-danger'\n          : vm.hasValidationWarnings\n          ? 'd-icon-exclamation_triangle text-warning-icon'\n          : 'd-icon-exclamation_triangle'\n      \"\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n    >\n      <rx-validation-issues\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"vm.validationIssues\"\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.record-definition.label' | translate\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main h-100 d-flex flex-column\">\n      <h1 class=\"mt-0 mb-2\">\n        {{ (configuration.definitionName | rxDefinitionNamePipe) || vm.definitionDisplayName || newTitle }}\n      </h1>\n\n      <div *ngIf=\"vm.isJoinOrExternalRecord\" class=\"d-flex border border-bottom-0\">\n        <button\n          adapt-button\n          type=\"button\"\n          btn-type=\"tertiary\"\n          class=\"d-icon-plus_circle align-self-start\"\n          rx-id=\"new-field-button\"\n          (click)=\"openAddNewField()\"\n          [disabled]=\"vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n        </button>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-trash\"\n          rx-id=\"delete-field-button\"\n          (click)=\"deleteSelectedField()\"\n          [disabled]=\"vm.isDeleteFieldButtonDisabled\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n        </button>\n      </div>\n\n      <div *ngIf=\"!vm.isJoinOrExternalRecord\" class=\"d-flex border border-bottom-0\">\n        <div class=\"dropdown\" adaptDropdown>\n          <button\n            adapt-button\n            type=\"button\"\n            adaptDropdownToggle\n            btn-type=\"tertiary\"\n            class=\"d-icon-plus_circle\"\n            rx-id=\"new-field-button\"\n          >\n            {{ 'com.bmc.arsys.rx.client.designer.new-field.button.label' | translate }}\n          </button>\n\n          <div class=\"dropdown-menu\" adaptDropdownMenu>\n            <button\n              *ngFor=\"let dataType of dataTypes\"\n              class=\"dropdown-item\"\n              (click)=\"addNewField(dataType.resourceType)\"\n              [attr.rx-id]=\"'field-data-type-' + dataType.shortName\"\n              [disabled]=\"!vm.isFieldsCustomizationAllowed || vm.isReadOnly\"\n            >\n              {{ dataType.displayName }}\n            </button>\n          </div>\n        </div>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-trash\"\n          rx-id=\"delete-field-button\"\n          (click)=\"deleteSelectedField()\"\n          [disabled]=\"vm.isDeleteFieldButtonDisabled || vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n        </button>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-list_ordered\"\n          (click)=\"copySelectedField()\"\n          rx-id=\"copy-field-button\"\n          [disabled]=\"vm.isCopyFieldButtonDisabled || vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n        </button>\n      </div>\n\n      <adapt-table\n        [value]=\"vm.fieldGridRows\"\n        [selection]=\"vm.selectedFieldGridRows\"\n        [columns]=\"columns\"\n        [scrollable]=\"true\"\n        scrollHeight=\"flex\"\n        [sortable]=\"true\"\n        [resizableColumns]=\"true\"\n        [bordered]=\"true\"\n        [filterable]=\"false\"\n        [dataKey]=\"'guid'\"\n        [disableRowSelection]=\"false\"\n        [selectionMode]=\"'single'\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n      </adapt-table>\n    </div>\n  </adapt-sidebar>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n\n<ng-template #dataTypeCellTemplate let-dataItem=\"dataItem\">\n  <span\n    class=\"icon d-icon-lock pr-2\"\n    *ngIf=\"dataItem.isCoreField\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.record-designer.core-field.tooltip' | translate\"\n  ></span>\n  {{ dataItem.resourceType }}\n</ng-template>\n\n<ng-template #requiredCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.fieldOption | rxRecordDefinitionFieldOption }}\n</ng-template>\n\n<ng-template #inheritedCellTemplate let-dataItem=\"dataItem\">\n  <span *ngIf=\"dataItem.isInherited\" class=\"icon d-icon-check pr-2\"></span>\n</ng-template>\n\n<ng-template #sourceFieldCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.sourceRecord }}\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper{border-top:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .card{border-left:0;border-right:0}\n"], components: [{ type: i11__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i1__namespace$1.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i1__namespace$1.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i11__namespace.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i1__namespace$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1__namespace.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i1__namespace$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i4__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1__namespace$1.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1__namespace$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "async": i5__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe, "rxDefinitionNamePipe": i2__namespace$1.RxDefinitionNamePipe, "json": i5__namespace.JsonPipe, "rxRecordDefinitionFieldOption": i3__namespace.RxRecordDefinitionFieldOptionPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-designer',
                        templateUrl: './record-designer.component.html',
                        styleUrls: ['./record-designer.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.Store }, { type: i2__namespace$1.RxNotificationService }, { type: i2__namespace$1.RxOverlayService }, { type: RxRecordDefinitionValidatorService }, { type: RxRecordDesignerInspectorService }, { type: i2__namespace$1.RxDefinitionNameService }, { type: RxFieldDefinitionManagerService }, { type: i3__namespace.RxRecordDefinitionService }, { type: i2__namespace$1.RxGlobalCacheService }, { type: i2__namespace.TranslateService }, { type: i5__namespace.DatePipe }, { type: i1__namespace.RxModalService }, { type: i3__namespace.RxFieldDefinitionService }, { type: RxRecordDesignerService }, { type: i11__namespace.RxExpressionEditorService }, { type: i3__namespace.RxRecordDefinitionCacheService }, { type: i1__namespace$2.RxGuidService }, { type: i0__namespace.Injector }]; }, propDecorators: { adaptSidebarComponent: [{
                    type: i0.ViewChild,
                    args: [i1$1.AdaptSidebarComponent, { static: false }]
                }], requiredCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['requiredCellTemplate', { static: true }]
                }], dataTypeCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['dataTypeCellTemplate', { static: true }]
                }], inheritedCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['inheritedCellTemplate', { static: true }]
                }], configuration: [{
                    type: i0.Input
                }], definitionSaved: [{
                    type: i0.Output
                }], definitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }] } });

    var initialDefinitionModel = {
        isArchivingEnabled: false,
        archiveDescription: null,
        ageQualifierFieldId: null,
        ageQualifierInDays: null,
        archiveRecordDefinitionName: null,
        archiveType: i3.ArchiveType.None,
        includeAttachments: null,
        archiveDataCriteria: null,
        associationsToFollowForArchive: {
            selectionType: i3.AssociationSelectionType.FollowParent,
            specificAssociationNames: []
        },
        isAuditingEnabled: false,
        auditRecordDefinitionName: null,
        auditDataCriteria: null,
        associatedAuditFieldsByAssociationName: {},
        customizationOptions: {
            allowOverlay: false,
            allowFieldsOverlay: false,
            allowIndexesOverlay: false,
            allowOtherPropertiesOverlay: false,
            allowPermissionsOverlay: false,
            fields: [],
            scope: null
        },
        recordInheritanceSelector: {
            inheritanceOptions: {
                isSharedInstanceStorage: false,
                isAbstract: false,
                isFinal: false
            },
            inheritanceDescriptor: {
                inheritingFrom: null,
                isInheritingRules: false,
                isInheritingFieldPermissions: false,
                isInheritingAssociations: false,
                isInheritingFieldAuditOptions: false
            },
            isInheritingCoreFields: false,
            inheritedFieldDefinitions: []
        },
        recordSearchFields: [],
        overlayOperation: null,
        weightedRelevancyTitle: undefined,
        weightedRelevancyKeywords: undefined,
        weightedRelevancyEnvironment: undefined,
        fields: [],
        indexDefinitions: []
    };
    var initialState = {
        bundleId: null,
        definitionName: null,
        selectedFieldGuid: null,
        inspectorTabIndex: 0,
        isDesignMode: true,
        definitionModel: initialDefinitionModel,
        definitionModelFromDefinition: initialDefinitionModel,
        isDirty: false,
        savedDefinitionName: null
    };
    var reducer = i1$3.createReducer(initialState, i1$3.on(init, function (state, _a) {
        var payload = _a.payload;
        return (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }));
    }), i1$3.on(initDefinitionModel, function (state, _a) {
        var definitionModelFromDefinition = _a.definitionModelFromDefinition;
        return (Object.assign(Object.assign({}, state), { definitionModelFromDefinition: definitionModelFromDefinition, definitionModel: definitionModelFromDefinition }));
    }), i1$3.on(updateDefinitionModelFromDesigner, function (state, _a) {
        var definitionModelFromDesigner = _a.definitionModelFromDesigner;
        var updatedDefinitionModel = Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner);
        var inheritedFieldDefinitions = updatedDefinitionModel.recordInheritanceSelector.inheritanceDescriptor
            ? updatedDefinitionModel.recordInheritanceSelector.inheritedFieldDefinitions
            : [];
        return Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, updatedDefinitionModel), { includeAttachments: updatedDefinitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.deleteSourceRecord.id, fields: lodash.chain(updatedDefinitionModel.fields)
                    .differenceBy(inheritedFieldDefinitions, 'id')
                    .concat(inheritedFieldDefinitions)
                    .map(function (field) {
                    var searchField = updatedDefinitionModel.recordSearchFields.find(function (searchField) { return searchField.id === field.id; });
                    var searchDefinition = searchField
                        ? searchField.searchDefinition
                        : lodash.isUndefined(field.searchDefinition)
                            ? undefined
                            : null;
                    var customizationOptionField = updatedDefinitionModel.customizationOptions.allowFieldsOverlay &&
                        updatedDefinitionModel.customizationOptions.fields.find(function (customizationOptionsField) { return customizationOptionsField.id === field.id; });
                    return Object.assign(Object.assign({}, field), { searchDefinition: searchDefinition, allowOtherPropertiesOverlay: customizationOptionField
                            ? customizationOptionField.allowOtherPropertiesOverlay
                            : field.allowOtherPropertiesOverlay, allowPermissionsOverlay: customizationOptionField
                            ? customizationOptionField.allowPermissionsOverlay
                            : field.allowPermissionsOverlay, isInherited: field.isCoreField
                            ? Boolean(updatedDefinitionModel.recordInheritanceSelector.isInheritingCoreFields)
                            : field.isInherited });
                })
                    .orderBy('id')
                    .value() }) });
    }), i1$3.on(updateSelectedFieldModel, function (state, _a) {
        var selectedFieldModel = _a.selectedFieldModel;
        return Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: state.definitionModel.fields.map(function (field) {
                    return field.guid === selectedFieldModel.guid
                        ? Object.assign(Object.assign({}, selectedFieldModel), { copy: selectedFieldModel.audit ? true : selectedFieldModel.copy }) : field;
                }) }) });
    }), i1$3.on(clearSearchFields, function (state) { return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { recordSearchFields: [], fields: state.definitionModel.fields.map(function (field) {
                return Object.assign(Object.assign({}, field), { searchDefinition: lodash.isUndefined(field.searchDefinition) ? undefined : null });
            }) }) })); }), i1$3.on(toggleDesignMode, function (state) { return (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode })); }), i1$3.on(markDesignerPristine, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: false })); }), i1$3.on(markDesignerDirty, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); }), i1$3.on(setInspectorTabIndex, function (state, _a) {
        var inspectorTabIndex = _a.inspectorTabIndex;
        return (Object.assign(Object.assign({}, state), { inspectorTabIndex: inspectorTabIndex }));
    }), i1$3.on(setSelectedFieldGuid, function (state, _a) {
        var guid = _a.guid;
        return (Object.assign(Object.assign({}, state), { selectedFieldGuid: guid, inspectorTabIndex: guid && !lodash.isNull(state.inspectorTabIndex) ? 1 : state.inspectorTabIndex }));
    }), i1$3.on(clearSelectedFieldGuid, function (state) { return (Object.assign(Object.assign({}, state), { selectedFieldGuid: null, inspectorTabIndex: !lodash.isNull(state.inspectorTabIndex) ? 0 : state.inspectorTabIndex })); }), i1$3.on(addFieldModel, function (state, _a) {
        var newFieldModel = _a.newFieldModel;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: __spreadArray(__spreadArray([], __read(state.definitionModel.fields)), [Object.assign({}, newFieldModel)]) }) }));
    }), i1$3.on(addNewFieldModels, function (state, _a) {
        var newFieldModels = _a.newFieldModels;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: __spreadArray(__spreadArray([], __read(state.definitionModel.fields)), __read(newFieldModels)) }), isDirty: true }));
    }), i1$3.on(deleteSelectedFieldSuccess, function (state) { return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: state.definitionModel.fields.filter(function (field) { return field.guid !== state.selectedFieldGuid; }) }) })); }), i1$3.on(saveDefinitionSuccess, function (state, _a) {
        var savedDefinitionName = _a.savedDefinitionName;
        return (Object.assign(Object.assign({}, state), { savedDefinitionName: savedDefinitionName }));
    }), i1$3.on(destroy, function (state) { return (Object.assign({}, initialState)); }));
    function recordDesignerModelReducer(state, action) {
        return reducer(state, action);
    }

    var RecordDesignerEffects = /** @class */ (function () {
        function RecordDesignerEffects(store$, actions$, rxFieldDefinitionManagerService, rxRecordDefinitionService, rxModalService, rxNotificationService, translateService, rxGuidService, rxRecordDesignerService) {
            var _this = this;
            this.store$ = store$;
            this.actions$ = actions$;
            this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
            this.rxModalService = rxModalService;
            this.rxNotificationService = rxNotificationService;
            this.translateService = translateService;
            this.rxGuidService = rxGuidService;
            this.rxRecordDesignerService = rxRecordDesignerService;
            this.initRecordDesigner$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(init), operators.map(function () { return loadDefinition(); })); });
            this.loadDefinition$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(loadDefinition), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionName = _b[1];
                return definitionName
                    ? _this.rxRecordDefinitionService.get(definitionName, {}, true)
                    : _this.rxRecordDefinitionService.getNew();
            }), operators.map(function (definition) { return loadDefinitionSuccess({
                definition: definition
            }); })); });
            this.loadDefinitionSuccess$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(loadDefinitionSuccess), operators.map(function (action) { return initDefinitionModel({
                definitionModelFromDefinition: _this.rxRecordDesignerService.getDefinitionModelFromDefinition(action.definition)
            }); })); });
            this.createNewFieldModel$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(createNewFieldModel), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.map(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionModel = _b[1];
                var newFieldName;
                var fieldNameSuffix = 0;
                var defaultFieldName = _this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label');
                do {
                    newFieldName = defaultFieldName + " " + ++fieldNameSuffix;
                } while (lodash.some(definitionModel.fields, { name: newFieldName }));
                var guid = _this.rxGuidService.generate();
                var newFieldModel = _this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(action.resourceType, {
                    id: null,
                    isNewField: true,
                    name: newFieldName,
                    guid: guid,
                    minValue: null,
                    maxValue: null,
                    defaultValueByLocale: {},
                    selectionFieldOptionProperties: action.resourceType === i3.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? { defaultValue: null, optionNamesById: null, optionLabelsById: null }
                        : null
                });
                return addFieldModel({ newFieldModel: newFieldModel });
            })); });
            this.clearSearchFields$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(updateDefinitionModelFromDesigner), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.map(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionModel = _b[1];
                return definitionModel;
            }), operators.distinctUntilChanged(function (a, b) { return lodash.isEqual(a.enableCognitiveSearch, b.enableCognitiveSearch); }), operators.filter(function (definitionModel) { return definitionModel.enableCognitiveSearch && !lodash.isEmpty(definitionModel.recordSearchFields); }), operators.switchMap(function () { return rxjs.from(_this.rxModalService.confirm({
                title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i1.RX_MODAL.modalStyles.warning,
                message: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.clear-search-fields-confirmation.message')
            })); }), operators.filter(Boolean), operators.map(function () { return clearSearchFields(); })); });
            this.addNewFieldModel$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(addFieldModel), operators.map(function (action) { return setSelectedFieldGuid({ guid: action.newFieldModel.guid }); })); });
            this.copySelectedField$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(copySelectedField), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(selectedFieldGuidSelector)), operators.map(function (_a) {
                var _b = __read(_a, 3), action = _b[0], definitionModel = _b[1], selectedFieldGuid = _b[2];
                var selectedField = definitionModel.fields.find(function (field) { return field.guid === selectedFieldGuid; });
                var selectedFieldCopy = Object.assign(Object.assign({}, selectedField), { id: null, guid: _this.rxGuidService.generate(), name: _this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-copy-name.label', {
                        fieldName: selectedField.name
                    }), selectionFieldOptionProperties: Object.assign(Object.assign({}, selectedField.selectionFieldOptionProperties), { optionLabelsById: selectedField.resourceType === i3.RX_RECORD_DEFINITION.resourceTypes.selection
                            ? lodash.mapValues(selectedField.selectionFieldOptionProperties.optionNamesById, function () { return _this.rxGuidService.generate(); })
                            : null }) });
                return addFieldModel({ newFieldModel: selectedFieldCopy });
            })); });
            this.deleteSelectedField$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(deleteSelectedField), operators.switchMap(function () { return rxjs.from(_this.rxModalService.confirm({
                title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i1.RX_MODAL.modalStyles.warning,
                message: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.delete-field-warning.message')
            })); }), operators.filter(Boolean), operators.map(function () { return checkIfFieldUsedByIndexes(); })); });
            this.checkIfFieldUsedByIndexes$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(checkIfFieldUsedByIndexes), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(selectedFieldGuidSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 3), result = _b[0], definitionModel = _b[1], guid = _b[2];
                var field = lodash.find(definitionModel.fields, { guid: guid });
                var isUsedByIndexes = lodash.some(definitionModel.indexDefinitions, function (indexDefinition) { return lodash.includes(indexDefinition.indexFieldIds, field.id); });
                return isUsedByIndexes
                    ? rxjs.from(_this.rxModalService.alert({
                        title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                        modalStyle: i1.RX_MODAL.modalStyles.warning,
                        message: _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.field-used-by-indexes.message', { fieldName: field.name })
                    })).pipe(operators.map(function () { return deleteSelectedFieldError(); }))
                    : [deleteSelectedFieldSuccess()];
            })); });
            this.saveDefinitionSuccess$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(saveDefinitionSuccess), operators.withLatestFrom(_this.store$.select(definitionNameSelector), _this.store$.select(bundleIdSelector)), operators.tap(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                    definitionTypeDisplayName: _this.translateService.instant('com.bmc.arsys.rx.client.record-definition.label')
                }));
            }), operators.filter(function (_a) {
                var _b = __read(_a, 3), action = _b[0], definitionName = _b[1], bundleId = _b[2];
                return !!definitionName;
            }), operators.map(function (_a) {
                var _b = __read(_a, 3), action = _b[0], definitionName = _b[1], bundleId = _b[2];
                return init({
                    payload: { definitionName: definitionName, bundleId: bundleId }
                });
            })); });
            this.clearSelectedField$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(initDefinitionModel, deleteSelectedFieldSuccess), operators.map(function () { return clearSelectedFieldGuid(); })); });
            this.markPristine$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(initDefinitionModel, saveDefinitionSuccess), operators.map(function () { return markDesignerPristine(); })); });
            this.markDirty$ = i2$2.createEffect(function () { return _this.actions$.pipe(i2$2.ofType(addFieldModel, updateDefinitionModelFromDesigner, updateSelectedFieldModel, deleteSelectedFieldSuccess), operators.map(function () { return markDesignerDirty(); })); });
        }
        return RecordDesignerEffects;
    }());
    RecordDesignerEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerEffects, deps: [{ token: i1__namespace$3.Store }, { token: i2__namespace$2.Actions }, { token: RxFieldDefinitionManagerService }, { token: i3__namespace.RxRecordDefinitionService }, { token: i1__namespace.RxModalService }, { token: i2__namespace$1.RxNotificationService }, { token: i2__namespace.TranslateService }, { token: i1__namespace$2.RxGuidService }, { token: RxRecordDesignerService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RecordDesignerEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerEffects });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$3.Store }, { type: i2__namespace$2.Actions }, { type: RxFieldDefinitionManagerService }, { type: i3__namespace.RxRecordDefinitionService }, { type: i1__namespace.RxModalService }, { type: i2__namespace$1.RxNotificationService }, { type: i2__namespace.TranslateService }, { type: i1__namespace$2.RxGuidService }, { type: RxRecordDesignerService }]; } });

    var RecordDesignerModule = /** @class */ (function () {
        function RecordDesignerModule() {
        }
        return RecordDesignerModule;
    }());
    RecordDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RecordDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerModule, declarations: [RecordDesignerComponent,
            LocalizedCharacterFieldEditorComponent,
            InheritanceIssueInfoComponent,
            ArchiveAssociationsControlComponent,
            ArchiveAssociationSelectorComponent,
            MissingArchiveDefinitionsModalComponent,
            FieldOptionEditorComponent,
            AddJoinFieldsEditorComponent,
            RecordIndexesControlComponent,
            RecordIndexesEditorComponent], imports: [i1$1.AdaptCodeViewerModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptTabsModule,
            i1$1.AdaptBusyModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptDropdownModule,
            i1$1.AdaptRxCheckboxModule,
            i1$1.AdaptRxSelectModule,
            i1$1.AdaptRxTextfieldModule,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptIconModule,
            i5.CommonModule,
            i6.FormsModule,
            i11.RxDesignerHeaderModule,
            i1.RxModalModule,
            i1.RxValidationIssuesModule,
            i2$1.TranslateModule,
            i6.ReactiveFormsModule,
            components.RecordGridModule,
            i11.RxFormBuilderModule,
            i2.RxDefinitionModule,
            i3.RxRecordDefinitionFieldOptionPipeModule,
            RecordCustomizationOptionsModule,
            RecordInheritanceEditorModule,
            SearchFieldEditorModule,
            i4.AdaptTableModule,
            i1$1.AdaptSidebarModule, i1__namespace$3.StoreFeatureModule, i2__namespace$2.EffectsFeatureModule, i1$1.AdaptAlertModule,
            i1$1.AdaptRxRadiobuttonModule,
            i1$1.AdaptRxSwitchModule,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptAccordionModule,
            i1$1.AdaptRxListBuilderModule], exports: [RecordDesignerComponent] });
    RecordDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerModule, providers: [i5.DatePipe, RxRecordDesignerService], imports: [[
                i1$1.AdaptCodeViewerModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptTabsModule,
                i1$1.AdaptBusyModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptDropdownModule,
                i1$1.AdaptRxCheckboxModule,
                i1$1.AdaptRxSelectModule,
                i1$1.AdaptRxTextfieldModule,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptIconModule,
                i5.CommonModule,
                i6.FormsModule,
                i11.RxDesignerHeaderModule,
                i1.RxModalModule,
                i1.RxValidationIssuesModule,
                i2$1.TranslateModule,
                i6.ReactiveFormsModule,
                components.RecordGridModule,
                i11.RxFormBuilderModule,
                i2.RxDefinitionModule,
                i3.RxRecordDefinitionFieldOptionPipeModule,
                RecordCustomizationOptionsModule,
                RecordInheritanceEditorModule,
                SearchFieldEditorModule,
                i4.AdaptTableModule,
                i1$1.AdaptSidebarModule,
                i1$3.StoreModule.forFeature(RX_RECORD_DESIGNER.featureSelector, {
                    model: recordDesignerModelReducer
                }),
                i2$2.EffectsModule.forFeature([RecordDesignerEffects]),
                i1$1.AdaptAlertModule,
                i1$1.AdaptRxRadiobuttonModule,
                i1$1.AdaptRxSwitchModule,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptAccordionModule,
                i1$1.AdaptRxListBuilderModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            RecordDesignerComponent,
                            LocalizedCharacterFieldEditorComponent,
                            InheritanceIssueInfoComponent,
                            ArchiveAssociationsControlComponent,
                            ArchiveAssociationSelectorComponent,
                            MissingArchiveDefinitionsModalComponent,
                            FieldOptionEditorComponent,
                            AddJoinFieldsEditorComponent,
                            RecordIndexesControlComponent,
                            RecordIndexesEditorComponent
                        ],
                        exports: [RecordDesignerComponent],
                        imports: [
                            i1$1.AdaptCodeViewerModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptTabsModule,
                            i1$1.AdaptBusyModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptDropdownModule,
                            i1$1.AdaptRxCheckboxModule,
                            i1$1.AdaptRxSelectModule,
                            i1$1.AdaptRxTextfieldModule,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptIconModule,
                            i5.CommonModule,
                            i6.FormsModule,
                            i11.RxDesignerHeaderModule,
                            i1.RxModalModule,
                            i1.RxValidationIssuesModule,
                            i2$1.TranslateModule,
                            i6.ReactiveFormsModule,
                            components.RecordGridModule,
                            i11.RxFormBuilderModule,
                            i2.RxDefinitionModule,
                            i3.RxRecordDefinitionFieldOptionPipeModule,
                            RecordCustomizationOptionsModule,
                            RecordInheritanceEditorModule,
                            SearchFieldEditorModule,
                            i4.AdaptTableModule,
                            i1$1.AdaptSidebarModule,
                            i1$3.StoreModule.forFeature(RX_RECORD_DESIGNER.featureSelector, {
                                model: recordDesignerModelReducer
                            }),
                            i2$2.EffectsModule.forFeature([RecordDesignerEffects]),
                            i1$1.AdaptAlertModule,
                            i1$1.AdaptRxRadiobuttonModule,
                            i1$1.AdaptRxSwitchModule,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptAccordionModule,
                            i1$1.AdaptRxListBuilderModule
                        ],
                        providers: [i5.DatePipe, RxRecordDesignerService]
                    }]
            }] });

    var RecordDesignerPageComponent = /** @class */ (function () {
        function RecordDesignerPageComponent(activatedRoute, rxBundleCacheService, rxDefinitionNameService, rxUtilityModalsService, rxPageTitleService, router, translateService, rxComponentCanDeactivateGuard) {
            this.activatedRoute = activatedRoute;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxPageTitleService = rxPageTitleService;
            this.router = router;
            this.translateService = translateService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.isInitialized = false;
        }
        RecordDesignerPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            this.subscription = this.activatedRoute.params.subscribe(function (_c) {
                var definitionName = _c.definitionName, bundleId = _c.bundleId;
                _this.rxBundleCacheService.bundleId = bundleId || _this.rxDefinitionNameService.getBundleId(definitionName);
                _this.isInitialized = true;
                _this.isNewRecord = !definitionName;
                _this.configuration = {
                    definitionName: definitionName,
                    bundleId: _this.rxBundleCacheService.bundleId
                };
                _this.rxPageTitleService.set([
                    _this.rxDefinitionNameService.getDisplayName(definitionName),
                    _this.translateService.instant('com.bmc.arsys.rx.client.record-designer.title')
                ]);
            });
        };
        RecordDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        RecordDesignerPageComponent.prototype.onDefinitionSaved = function (recordDefinitionName) {
            if (this.isNewRecord) {
                this.router.navigate(['edit2', recordDefinitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        RecordDesignerPageComponent.prototype.onDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        RecordDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i2.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                'record-definitions'
            ]);
        };
        RecordDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.recordDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        RecordDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        return RecordDesignerPageComponent;
    }());
    RecordDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerPageComponent, deps: [{ token: i1__namespace$4.ActivatedRoute }, { token: i2__namespace$1.RxBundleCacheService }, { token: i2__namespace$1.RxDefinitionNameService }, { token: i1__namespace.RxUtilityModalsService }, { token: i2__namespace$1.RxPageTitleService }, { token: i1__namespace$4.Router }, { token: i2__namespace.TranslateService }, { token: i2__namespace$1.RxComponentCanDeactivateGuard }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RecordDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDesignerPageComponent, selector: "rx-record-designer-page", viewQueries: [{ propertyName: "recordDesignerComponent", first: true, predicate: RecordDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-record-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-record-designer>\n", components: [{ type: RecordDesignerComponent, selector: "rx-record-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-record-designer-page',
                        templateUrl: './record-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$4.ActivatedRoute }, { type: i2__namespace$1.RxBundleCacheService }, { type: i2__namespace$1.RxDefinitionNameService }, { type: i1__namespace.RxUtilityModalsService }, { type: i2__namespace$1.RxPageTitleService }, { type: i1__namespace$4.Router }, { type: i2__namespace.TranslateService }, { type: i2__namespace$1.RxComponentCanDeactivateGuard }]; }, propDecorators: { recordDesignerComponent: [{
                    type: i0.ViewChild,
                    args: [RecordDesignerComponent]
                }] } });

    var RecordDesignerPageModule = /** @class */ (function () {
        function RecordDesignerPageModule() {
        }
        return RecordDesignerPageModule;
    }());
    RecordDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RecordDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerPageModule, declarations: [RecordDesignerPageComponent], imports: [i5.CommonModule, RecordDesignerModule], exports: [RecordDesignerPageComponent] });
    RecordDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerPageModule, imports: [[i5.CommonModule, RecordDesignerModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RecordDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RecordDesignerPageComponent],
                        exports: [RecordDesignerPageComponent],
                        imports: [i5.CommonModule, RecordDesignerModule]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RecordDesignerComponent = RecordDesignerComponent;
    exports.RecordDesignerModule = RecordDesignerModule;
    exports.RecordDesignerPageComponent = RecordDesignerPageComponent;
    exports.RecordDesignerPageModule = RecordDesignerPageModule;
    exports.RxFieldDefinitionManagerService = RxFieldDefinitionManagerService;
    exports.RxRecordDesignerService = RxRecordDesignerService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-record-designer.umd.js.map
