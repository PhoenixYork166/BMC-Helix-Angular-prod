(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/shared/api'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@helix/platform/record/api'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@ngrx/store'), require('@helix/platform/utils'), require('@ngx-translate/core'), require('@angular/common'), require('@angular/router'), require('@ngrx/effects'), require('@helix/platform/document/api')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/document/designer', ['exports', '@angular/core', '@helix/platform/shared/api', '@angular/forms', '@bmc-ux/adapt-angular', '@helix/platform/record/api', '@helix/platform/shared/components', '@helix/platform/ui-kit', 'lodash', 'rxjs', 'rxjs/operators', '@ngrx/store', '@helix/platform/utils', '@ngx-translate/core', '@angular/common', '@angular/router', '@ngrx/effects', '@helix/platform/document/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.document = global.helix.platform.document || {}, global.helix.platform.document.designer = {}), global.ng.core, global.helix.platform.shared.api, global.ng.forms, global.adaptAngular, global.helix.platform.record.api, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.lodash, global.rxjs, global.rxjs.operators, global.i1, global.helix.platform.utils, global.ngxTranslateCore, global.ng.common, global.ng.router, global.i2$1, global.helix.platform.document.api));
})(this, (function (exports, i0, i2, i10, i7, api, i6, i3, lodash, rxjs, operators, i1, i3$1, i4, i9, i1$1, i2$1, i6$1) { 'use strict';

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
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i6__namespace$1 = /*#__PURE__*/_interopNamespace(i6$1);

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

    var init = i1.createAction('[Document Designer] Init', i1.props());
    var loadDefinition = i1.createAction('[Document Designer] Load Definition');
    var loadDefinitionSuccess = i1.createAction('[Document Designer] Load Definition Success', i1.props());
    var initDefinitionData = i1.createAction('[Document Designer] Init Definition Model', i1.props());
    var markDesignerPristine = i1.createAction('[Document Designer] Mark Designer Pristine');
    var markDesignerDirty = i1.createAction('[Document Designer] Mark Designer Dirty');
    var updateDefinitionModelFromDesigner = i1.createAction('[Document Designer] Update Definition Model From Designer', i1.props());
    var toggleDesignMode = i1.createAction('[Document Designer] Toggle Design Mode');
    var revertCustomization = i1.createAction('[Document Designer] Revert Customization');
    var saveDefinition = i1.createAction('[Document Designer] Save Definition');
    var saveDefinitionSuccess = i1.createAction('[Document Designer] Save Definition Success', i1.props());
    var saveDefinitionError = i1.createAction('[Document Designer] Save Definition Error');
    var destroy = i1.createAction('[Document Designer] Destroy');

    var RX_DOCUMENT_DESIGNER = {
        featureSelector: 'documentDesigner'
    };

    var documentDesignerStateSelector = i1.createFeatureSelector(RX_DOCUMENT_DESIGNER.featureSelector);
    var documentDesignerModelSelector = i1.createSelector(documentDesignerStateSelector, function (documentDesignerState) { return documentDesignerState.model; });
    var bundleIdSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.bundleId; });
    var definitionNameSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.definitionName; });
    var isDesignModeSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.isDesignMode; });
    var definitionModelFromDefinitionSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.definitionModelFromDefinition; });
    var definitionModelSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.definitionModel; });
    var isDirtySelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.isDirty; });
    var savedDefinitionNameSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.savedDefinitionName; });
    var originalDefinitionSelector = i1.createSelector(documentDesignerModelSelector, function (documentDesignerModel) { return documentDesignerModel.originalDefinition; });

    var DocumentDesignerService = /** @class */ (function () {
        function DocumentDesignerService() {
        }
        DocumentDesignerService.prototype.getDefinitionFromDefinitionModel = function (model, bundleId) {
            return {
                lastUpdateTime: model.lastUpdateTime,
                lastChangedBy: model.lastChangedBy,
                owner: model.owner,
                name: bundleId + ":" + model.name,
                description: model.description,
                overlayGroupId: model.overlayGroupId,
                scope: model.customizationOptions.scope,
                guid: model.guid,
                allowOverlay: model.customizationOptions.allowOverlay,
                overlayDescriptor: model.overlayDescriptor,
                documentSchema: model.documentSchema
            };
        };
        return DocumentDesignerService;
    }());
    DocumentDesignerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DocumentDesignerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var DocumentDesignerComponent = /** @class */ (function () {
        function DocumentDesignerComponent(store$, renderer, rxGlobalCacheService, rxJsonParserService, rxNotificationService, rxOverlayService, translateService, documentDesignerService) {
            var _this = this;
            this.store$ = store$;
            this.renderer = renderer;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxNotificationService = rxNotificationService;
            this.rxOverlayService = rxOverlayService;
            this.translateService = translateService;
            this.documentDesignerService = documentDesignerService;
            this.definitionSaved = new i0.EventEmitter();
            this.definitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.schemaFormControl = new i10.FormControl('', { updateOn: 'blur' });
            this.isDirty$ = this.store$.select(isDirtySelector);
            this.definitionModel$ = this.store$.select(definitionModelSelector);
            this.isDesignMode$ = this.store$.select(isDesignModeSelector);
            this.bundleId$ = this.store$.select(bundleIdSelector);
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
            this.inspectorFocusEditorSubject = new rxjs.Subject();
            this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
            this.bundleFriendlyName$ = this.bundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleFriendlyName(bundleId); }));
            this.validationIssues$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.validate(definitionModel); }), operators.shareReplay(1));
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (issueSections) { return lodash.some(issueSections, {
                issues: [{ type: i3.ValidationIssueType.Error }]
            }); }));
            this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(operators.withLatestFrom(this.bundleId$), operators.map(function (_a) {
                var _b = __read(_a, 2), definitionModel = _b[0], bundleId = _b[1];
                return _this.documentDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId);
            }));
            this.areNewDefinitionsAllowed$ = this.store$
                .select(bundleIdSelector)
                .pipe(operators.switchMap(function (bundleId) { return _this.rxOverlayService.areNewDefinitionsAllowed(bundleId); }));
            this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(operators.filter(function (definition) { return !!definition.lastUpdateTime; }), operators.withLatestFrom(this.areNewDefinitionsAllowed$), operators.map(function (_a) {
                var _b = __read(_a, 2), definition = _b[0], areNewDefinitionsAllowed = _b[1];
                return !areNewDefinitionsAllowed || !_this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition);
            }), operators.tap(function (isReadOnly) {
                if (isReadOnly) {
                    _this.rxNotificationService.addWarningMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
                }
            }), operators.startWith(false), operators.shareReplay(1));
            this.isSaveButtonDisabled$ = rxjs.combineLatest([
                this.hasValidationErrors$,
                this.isDirty$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 3), hasValidationErrors = _b[0], isDirty = _b[1], isReadOnly = _b[2];
                return hasValidationErrors || !isDirty || isReadOnly;
            }), operators.startWith(true));
            this.definitionForJsonViewer$ = this.isDesignMode$.pipe(operators.switchMap(function (isDesignMode) { return isDesignMode
                ? rxjs.of(null)
                : rxjs.combineLatest([_this.definitionFromDefinitionModel$, _this.originalDefinition$]).pipe(operators.map(function (_a) {
                    var _b = __read(_a, 2), definitionFromDefinitionModel = _b[0], originalDefinition = _b[1];
                    return (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel));
                })); }));
            this.breadcrumbItems$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return [
                {
                    label: definitionModel.name ||
                        "<" + _this.translateService.instant('com.bmc.arsys.rx.client.document-designer.new-document.label') + ">",
                    data: {}
                }
            ]; }));
            this.definitionInspectorConfig$ = this.definitionModel$.pipe(operators.map(function (definitionModel) {
                var isCustomizationAllowed = Boolean(definitionModel.lastUpdateTime)
                    ? _this.rxOverlayService.isCustomizationEnabled('allowOverlay', definitionModel)
                    : true;
                return _this.getFormBuilderConfig(definitionModel, isCustomizationAllowed);
            }));
            this.vm$ = rxjs.combineLatest([
                this.breadcrumbItems$,
                this.bundleFriendlyName$,
                this.definitionModel$,
                this.hasValidationErrors$,
                this.isReadOnly$,
                this.definitionForJsonViewer$,
                this.isSaveButtonDisabled$,
                this.definitionInspectorConfig$,
                this.validationIssues$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 9), breadcrumbItems = _b[0], bundleFriendlyName = _b[1], definitionModel = _b[2], hasValidationErrors = _b[3], isReadOnly = _b[4], definitionForJsonViewer = _b[5], isSaveButtonDisabled = _b[6], definitionInspectorConfig = _b[7], validationIssues = _b[8];
                return ({
                    breadcrumbItems: breadcrumbItems,
                    bundleFriendlyName: bundleFriendlyName,
                    definitionModel: definitionModel,
                    hasValidationErrors: hasValidationErrors,
                    isReadOnly: isReadOnly,
                    definitionForJsonViewer: definitionForJsonViewer,
                    isSaveButtonDisabled: isSaveButtonDisabled,
                    definitionInspectorConfig: definitionInspectorConfig,
                    validationIssues: validationIssues
                });
            }));
        }
        DocumentDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.schemaFormControl.valueChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (documentSchema) {
                _this.store$.dispatch(updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: { documentSchema: documentSchema }
                }));
            });
            this.store$
                .select(definitionModelFromDefinitionSelector)
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (definitionModel) {
                _this.schemaFormControl.patchValue(definitionModel.documentSchema, { emitEvent: false });
            });
            this.store$
                .select(savedDefinitionNameSelector)
                .pipe(operators.skip(1), operators.takeUntil(this.destroyed$), operators.filter(Boolean))
                .subscribe(function (savedDefinitionName) {
                _this.definitionSaved.emit(savedDefinitionName);
            });
        };
        DocumentDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue) {
                this.store$.dispatch(init({ payload: this.configuration }));
            }
        };
        DocumentDesignerComponent.prototype.onEditorEvent = function (event) {
            if (event.type === i6.RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
                this.store$.dispatch(revertCustomization());
            }
        };
        DocumentDesignerComponent.prototype.canDeactivate = function () {
            var canDeactivate = true;
            this.isDirty$.pipe(operators.take(1)).subscribe(function (isDirty) {
                canDeactivate = !isDirty;
            });
            return canDeactivate;
        };
        DocumentDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            var _this = this;
            if (validationIssue.data.propertyName === 'documentSchema') {
                this.renderer.selectRootElement('#document-schema').focus();
            }
            else {
                this.inspectorSidebar.openPanel(0);
                // need to wait until inspector will be visible
                // there are no way to focus to invisible elements
                setTimeout(function () { return _this.inspectorFocusEditorSubject.next({
                    editorName: validationIssue.data.propertyName,
                    data: validationIssue.data.data
                }); }, 10);
            }
        };
        DocumentDesignerComponent.prototype.onSave = function () {
            this.store$.dispatch(saveDefinition());
        };
        DocumentDesignerComponent.prototype.onToggleDesignMode = function () {
            this.store$.dispatch(toggleDesignMode());
        };
        DocumentDesignerComponent.prototype.onDefinitionModelChange = function (definitionModel) {
            this.store$.dispatch(updateDefinitionModelFromDesigner({ definitionModelFromDesigner: definitionModel }));
        };
        DocumentDesignerComponent.prototype.onDefinitionInspectorInitialized = function () {
            var _this = this;
            setTimeout(function () { return _this.inspectorFocusEditorSubject.next({
                editorName: 'name',
                data: {}
            }); }, 10);
        };
        DocumentDesignerComponent.prototype.getFormBuilderConfig = function (definitionModel, isCustomizationAllowed) {
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: i6.TextFormControlComponent,
                            isDisabled: Boolean(definitionModel.lastUpdateTime),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: i6.TextareaFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            component: i6.RxRevertCustomizationComponent,
                            options: {
                                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                                scope: definitionModel.customizationOptions.scope,
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: i6.CustomizationOptionsComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.document-definition.label')
                                    .toLowerCase(),
                                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                                scope: definitionModel.customizationOptions.scope,
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        }
                    ]
                }
            ];
        };
        DocumentDesignerComponent.prototype.validate = function (definitionModel) {
            var validationIssues = [];
            if (lodash.isEmpty(lodash.trim(definitionModel.name))) {
                validationIssues.push({
                    type: i3.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.document-name.label')
                    }),
                    data: {
                        propertyName: 'name'
                    }
                });
            }
            if (definitionModel.name && !api.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
                validationIssues.push({
                    type: i3.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.document-name.label')
                    }),
                    data: {
                        propertyName: 'name'
                    }
                });
            }
            if (lodash.isEmpty(lodash.trim(definitionModel.documentSchema))) {
                validationIssues.push({
                    type: i3.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.document-schema.label')
                    }),
                    data: {
                        propertyName: 'documentSchema'
                    }
                });
            }
            else if (lodash.isUndefined(this.rxJsonParserService.tryParseJson(definitionModel.documentSchema))) {
                validationIssues.push({
                    type: i3.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.validation.json-is-not-valid.message'),
                    data: {
                        propertyName: 'documentSchema'
                    }
                });
            }
            return validationIssues.length
                ? [
                    {
                        title: this.translateService.instant('com.bmc.arsys.rx.client.document-designer.title'),
                        issues: validationIssues
                    }
                ]
                : [];
        };
        DocumentDesignerComponent.prototype.ngOnDestroy = function () {
            this.inspectorFocusEditorSubject.complete();
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.store$.dispatch(destroy());
        };
        return DocumentDesignerComponent;
    }());
    DocumentDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerComponent, deps: [{ token: i1__namespace.Store }, { token: i0__namespace.Renderer2 }, { token: i2__namespace.RxGlobalCacheService }, { token: i3__namespace.RxJsonParserService }, { token: i2__namespace.RxNotificationService }, { token: i2__namespace.RxOverlayService }, { token: i4__namespace.TranslateService }, { token: DocumentDesignerService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DocumentDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDesignerComponent, selector: "rx-document-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "inspectorSidebar", first: true, predicate: i7.AdaptSidebarComponent, descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (toggleDesignMode)=\"onToggleDesignMode()\"\n    (save)=\"onSave()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"!!vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.common.properties.label' | translate }}\"\n        iconClass=\"d-icon-pencil\"\n      >\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          (editorEvent)=\"onEditorEvent($event)\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          [model]=\"vm.definitionModel\"\n          (formInitialized)=\"onDefinitionInspectorInitialized()\"\n          (modelChange)=\"onDefinitionModelChange($event)\"\n        ></rx-form-builder>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.document-definition.label' | translate\"\n          [issueSections]=\"vm.validationIssues\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <adapt-rx-control-label\n          [label]=\"'com.bmc.arsys.rx.client.document-designer.document-schema.label' | translate\"\n          [showRequiredLabel]=\"true\"\n        >\n        </adapt-rx-control-label>\n\n        <textarea\n          [formControl]=\"schemaFormControl\"\n          [readonly]=\"vm.isReadOnly\"\n          class=\"form-control h-100\"\n          name=\"documentSchema\"\n          required\n          id=\"document-schema\"\n          rx-id=\"document-schema\"\n        ></textarea>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  >\n  </adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}textarea{resize:none}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i6__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7__namespace.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7__namespace.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6__namespace.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i3__namespace$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7__namespace.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7__namespace.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i10__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i9__namespace.AsyncPipe, "translate": i4__namespace.TranslatePipe, "json": i9__namespace.JsonPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-document-designer',
                        templateUrl: './document-designer.component.html',
                        styleUrls: ['./document-designer.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.Store }, { type: i0__namespace.Renderer2 }, { type: i2__namespace.RxGlobalCacheService }, { type: i3__namespace.RxJsonParserService }, { type: i2__namespace.RxNotificationService }, { type: i2__namespace.RxOverlayService }, { type: i4__namespace.TranslateService }, { type: DocumentDesignerService }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], definitionSaved: [{
                    type: i0.Output
                }], definitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }], inspectorSidebar: [{
                    type: i0.ViewChild,
                    args: [i7.AdaptSidebarComponent, { static: false }]
                }] } });

    var DocumentDesignerPageComponent = /** @class */ (function () {
        function DocumentDesignerPageComponent(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
            this.activatedRoute = activatedRoute;
            this.router = router;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.translateService = translateService;
            this.isInitialized = false;
            this.definitionsRoute = 'document-definitions';
            this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.document-designer.title');
        }
        DocumentDesignerPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            this.subscription = this.activatedRoute.params.subscribe(function (_c) {
                var definitionName = _c.definitionName, bundleId = _c.bundleId;
                _this.rxBundleCacheService.bundleId = bundleId || _this.rxDefinitionNameService.getBundleId(definitionName);
                _this.isInitialized = true;
                _this.isNewDefinition = !definitionName;
                _this.configuration = Object.assign(Object.assign({}, _this.configuration), { bundleId: _this.rxBundleCacheService.bundleId, definitionName: definitionName });
                _this.rxPageTitleService.set([_this.rxDefinitionNameService.getDisplayName(definitionName), _this.pageTitle]);
            });
        };
        DocumentDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        DocumentDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        DocumentDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        DocumentDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i2.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                this.definitionsRoute
            ]);
        };
        DocumentDesignerPageComponent.prototype.onDefinitionSaved = function (definitionName) {
            if (this.isNewDefinition) {
                this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        DocumentDesignerPageComponent.prototype.onDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        return DocumentDesignerPageComponent;
    }());
    DocumentDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerPageComponent, deps: [{ token: i1__namespace$1.ActivatedRoute }, { token: i1__namespace$1.Router }, { token: i2__namespace.RxBundleCacheService }, { token: i2__namespace.RxComponentCanDeactivateGuard }, { token: i2__namespace.RxDefinitionNameService }, { token: i2__namespace.RxPageTitleService }, { token: i3__namespace$1.RxUtilityModalsService }, { token: i4__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DocumentDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDesignerPageComponent, selector: "rx-document-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: DocumentDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-document-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-document-designer>\n", components: [{ type: DocumentDesignerComponent, selector: "rx-document-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i9__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-document-designer-page',
                        templateUrl: './document-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActivatedRoute }, { type: i1__namespace$1.Router }, { type: i2__namespace.RxBundleCacheService }, { type: i2__namespace.RxComponentCanDeactivateGuard }, { type: i2__namespace.RxDefinitionNameService }, { type: i2__namespace.RxPageTitleService }, { type: i3__namespace$1.RxUtilityModalsService }, { type: i4__namespace.TranslateService }]; }, propDecorators: { designerComponent: [{
                    type: i0.ViewChild,
                    args: [DocumentDesignerComponent]
                }] } });

    var initialModel = {
        name: null,
        documentSchema: null,
        customizationOptions: { allowOverlay: null, scope: null }
    };
    var initialState = {
        bundleId: null,
        definitionName: null,
        isDesignMode: true,
        definitionModel: initialModel,
        definitionModelFromDefinition: initialModel,
        isDirty: false,
        savedDefinitionName: null,
        originalDefinition: null
    };
    var reducer = i1.createReducer(initialState, i1.on(init, function (state, _a) {
        var payload = _a.payload;
        return (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }));
    }), i1.on(initDefinitionData, function (state, _a) {
        var definition = _a.definition, definitionModel = _a.definitionModel;
        return (Object.assign(Object.assign({}, state), { definitionModel: definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }));
    }), i1.on(markDesignerPristine, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: false })); }), i1.on(markDesignerDirty, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); }), i1.on(toggleDesignMode, function (state) { return (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode })); }), i1.on(updateDefinitionModelFromDesigner, function (state, _a) {
        var definitionModelFromDesigner = _a.definitionModelFromDesigner;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }));
    }), i1.on(saveDefinitionSuccess, function (state, _a) {
        var savedDefinitionName = _a.savedDefinitionName;
        return (Object.assign(Object.assign({}, state), { savedDefinitionName: savedDefinitionName }));
    }), i1.on(destroy, function (state) { return (Object.assign({}, initialState)); }));
    function documentDesignerModelReducer(state, action) {
        return reducer(state, action);
    }

    var DocumentDesignerEffects = /** @class */ (function () {
        function DocumentDesignerEffects(store$, actions$, errorHandler, rxDefinitionUpdateService, documentDesignerService, rxNotificationService, translateService, rxDocumentDefinitionService, rxDefinitionNameService) {
            var _this = this;
            this.store$ = store$;
            this.actions$ = actions$;
            this.errorHandler = errorHandler;
            this.rxDefinitionUpdateService = rxDefinitionUpdateService;
            this.documentDesignerService = documentDesignerService;
            this.rxNotificationService = rxNotificationService;
            this.translateService = translateService;
            this.rxDocumentDefinitionService = rxDocumentDefinitionService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.initDocumentDesigner$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(init), operators.map(function (action) { return loadDefinition(); })); });
            this.loadDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinition), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionName = _b[1];
                return definitionName
                    ? _this.rxDocumentDefinitionService.get(definitionName)
                    : _this.rxDocumentDefinitionService.getNew();
            }), operators.map(function (definition) { return loadDefinitionSuccess({
                definition: definition
            }); })); });
            this.loadDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinitionSuccess), operators.map(function (action) {
                var definitionModelFromDefinition = {
                    customizationOptions: {
                        scope: action.definition.scope,
                        allowOverlay: action.definition.allowOverlay
                    },
                    description: action.definition.description,
                    documentSchema: action.definition.documentSchema,
                    guid: action.definition.guid,
                    lastChangedBy: action.definition.lastChangedBy,
                    lastUpdateTime: action.definition.lastUpdateTime,
                    name: _this.rxDefinitionNameService.getDisplayName(action.definition.name),
                    overlayDescriptor: action.definition.overlayDescriptor,
                    overlayGroupId: action.definition.overlayGroupId,
                    owner: action.definition.owner
                };
                return initDefinitionData({
                    definition: action.definition,
                    definitionModel: definitionModelFromDefinition
                });
            })); });
            this.revertCustomization$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(revertCustomization), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(bundleIdSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 3), _ = _b[0], definitionModel = _b[1], bundleId = _b[2];
                return _this.rxDocumentDefinitionService.revertCustomization(bundleId + ":" + definitionModel.name);
            }), operators.map(function () { return loadDefinition(); })); });
            this.markPristine$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(initDefinitionData, saveDefinition), operators.map(function () { return markDesignerPristine(); })); });
            this.markDirty$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(updateDefinitionModelFromDesigner, saveDefinitionError), operators.map(function () { return markDesignerDirty(); })); });
            this.saveDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinition), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(originalDefinitionSelector), _this.store$.select(bundleIdSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 4), _ = _b[0], definitionModel = _b[1], originalDefinition = _b[2], bundleId = _b[3];
                var definition = _this.documentDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId);
                return (definition.lastUpdateTime
                    ? _this.rxDefinitionUpdateService.execute(_this.rxDocumentDefinitionService.update.bind(_this.rxDocumentDefinitionService, Object.assign(Object.assign({}, originalDefinition), definition)))
                    : _this.rxDocumentDefinitionService.create(definition)).pipe(operators.map(function (response) {
                    var definitionName = decodeURIComponent(lodash.last(response === null || response === void 0 ? void 0 : response.headers.get('location').split('/')) || '') ||
                        _this.rxDefinitionNameService.getDefinitionName(bundleId, definitionModel.name);
                    return saveDefinitionSuccess({
                        savedDefinitionName: definitionName
                    });
                }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(saveDefinitionError());
                }));
            })); });
            this.saveDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinitionSuccess), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.tap(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                    definitionTypeDisplayName: _this.translateService.instant('com.bmc.arsys.rx.client.document-definition.label')
                }));
            }), operators.filter(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionName = _b[1];
                return !!definitionName;
            }), operators.map(function () { return loadDefinition(); })); });
        }
        return DocumentDesignerEffects;
    }());
    DocumentDesignerEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerEffects, deps: [{ token: i1__namespace.Store }, { token: i2__namespace$1.Actions }, { token: i0__namespace.ErrorHandler }, { token: i2__namespace.RxDefinitionUpdateService }, { token: DocumentDesignerService }, { token: i2__namespace.RxNotificationService }, { token: i4__namespace.TranslateService }, { token: i6__namespace$1.RxDocumentDefinitionService }, { token: i2__namespace.RxDefinitionNameService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DocumentDesignerEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerEffects });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Store }, { type: i2__namespace$1.Actions }, { type: i0__namespace.ErrorHandler }, { type: i2__namespace.RxDefinitionUpdateService }, { type: DocumentDesignerService }, { type: i2__namespace.RxNotificationService }, { type: i4__namespace.TranslateService }, { type: i6__namespace$1.RxDocumentDefinitionService }, { type: i2__namespace.RxDefinitionNameService }]; } });

    var DocumentDesignerModule = /** @class */ (function () {
        function DocumentDesignerModule() {
        }
        return DocumentDesignerModule;
    }());
    DocumentDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DocumentDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerModule, declarations: [DocumentDesignerComponent], imports: [i7.AdaptCodeViewerModule,
            i7.AdaptRxLabelModule,
            i7.AdaptSidebarModule,
            i7.AdaptTabsModule,
            i9.CommonModule,
            i10.FormsModule,
            i4.TranslateModule,
            i6.RxDesignerHeaderModule,
            i6.RxFormBuilderModule,
            i3.RxJsonViewerModule,
            i3.RxValidationIssuesModule,
            i10.ReactiveFormsModule, i1__namespace.StoreFeatureModule, i2__namespace$1.EffectsFeatureModule], exports: [DocumentDesignerComponent] });
    DocumentDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerModule, imports: [[
                i7.AdaptCodeViewerModule,
                i7.AdaptRxLabelModule,
                i7.AdaptSidebarModule,
                i7.AdaptTabsModule,
                i9.CommonModule,
                i10.FormsModule,
                i4.TranslateModule,
                i6.RxDesignerHeaderModule,
                i6.RxFormBuilderModule,
                i3.RxJsonViewerModule,
                i3.RxValidationIssuesModule,
                i10.ReactiveFormsModule,
                i1.StoreModule.forFeature(RX_DOCUMENT_DESIGNER.featureSelector, {
                    model: documentDesignerModelReducer
                }),
                i2$1.EffectsModule.forFeature([DocumentDesignerEffects])
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [DocumentDesignerComponent],
                        exports: [DocumentDesignerComponent],
                        imports: [
                            i7.AdaptCodeViewerModule,
                            i7.AdaptRxLabelModule,
                            i7.AdaptSidebarModule,
                            i7.AdaptTabsModule,
                            i9.CommonModule,
                            i10.FormsModule,
                            i4.TranslateModule,
                            i6.RxDesignerHeaderModule,
                            i6.RxFormBuilderModule,
                            i3.RxJsonViewerModule,
                            i3.RxValidationIssuesModule,
                            i10.ReactiveFormsModule,
                            i1.StoreModule.forFeature(RX_DOCUMENT_DESIGNER.featureSelector, {
                                model: documentDesignerModelReducer
                            }),
                            i2$1.EffectsModule.forFeature([DocumentDesignerEffects])
                        ]
                    }]
            }] });

    var DocumentDesignerPageModule = /** @class */ (function () {
        function DocumentDesignerPageModule() {
        }
        return DocumentDesignerPageModule;
    }());
    DocumentDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DocumentDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerPageModule, declarations: [DocumentDesignerPageComponent], imports: [i9.CommonModule, DocumentDesignerModule, i4.TranslateModule], exports: [DocumentDesignerPageComponent] });
    DocumentDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerPageModule, imports: [[i9.CommonModule, DocumentDesignerModule, i4.TranslateModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DocumentDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [DocumentDesignerPageComponent],
                        exports: [DocumentDesignerPageComponent],
                        imports: [i9.CommonModule, DocumentDesignerModule, i4.TranslateModule]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DocumentDesignerPageComponent = DocumentDesignerPageComponent;
    exports.DocumentDesignerPageModule = DocumentDesignerPageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-document-designer.umd.js.map
