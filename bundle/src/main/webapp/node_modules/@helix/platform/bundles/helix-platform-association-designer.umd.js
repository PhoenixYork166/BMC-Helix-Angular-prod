(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@helix/platform/shared/api'), require('@angular/forms'), require('@helix/platform/association/api'), require('@helix/platform/record/api'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@ngrx/store'), require('@ngx-translate/core'), require('@bmc-ux/adapt-angular'), require('@angular/router'), require('@ngrx/effects')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/association/designer', ['exports', '@angular/core', '@angular/common', '@helix/platform/shared/api', '@angular/forms', '@helix/platform/association/api', '@helix/platform/record/api', '@helix/platform/shared/components', '@helix/platform/ui-kit', 'lodash', 'rxjs', 'rxjs/operators', '@ngrx/store', '@ngx-translate/core', '@bmc-ux/adapt-angular', '@angular/router', '@ngrx/effects'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.association = global.helix.platform.association || {}, global.helix.platform.association.designer = {}), global.ng.core, global.ng.common, global.helix.platform.shared.api, global.ng.forms, global.helix.platform.association.api, global.helix.platform.record.api, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.lodash, global.rxjs, global.rxjs.operators, global.i1, global.ngxTranslateCore, global.i7, global.ng.router, global.i2$1));
})(this, (function (exports, i0, i9, i3, i10, i4, i2, i6, i3$1, lodash, rxjs, operators, i1, i5, i7, i1$1, i2$1) { 'use strict';

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
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
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

    var init = i1.createAction('[Association Designer] Init', i1.props());
    var loadDefinition = i1.createAction('[Association Designer] Load Definition');
    var loadDefinitionSuccess = i1.createAction('[Association Designer] Load Definition Success', i1.props());
    var initDefinitionData = i1.createAction('[Association Designer] Init Definition Model', i1.props());
    var updateDefinitionModelFromDesigner = i1.createAction('[Association Designer] Update Definition Model From Designer', i1.props());
    var markDesignerPristine = i1.createAction('[Association Designer] Mark Designer Pristine');
    var markDesignerDirty = i1.createAction('[Association Designer] Mark Designer Dirty');
    var toggleDesignMode = i1.createAction('[Association Designer] Toggle Design Mode');
    var revertCustomization = i1.createAction('[Association Designer] Revert Customization');
    var saveDefinition = i1.createAction('[Association Designer] Save Definition');
    var getRecordDefinition = i1.createAction('[Association Designer] Get Record Definition', i1.props());
    var getRecordDefinitionError = i1.createAction('[Association Designer] Get Record Definition Error');
    var getForeignKeyFieldIdError = i1.createAction('[Association Designer] Get Foreign Key Field ID Error');
    var checkForMissingForeignKeyField = i1.createAction('[Association Designer] Check For Missing Foreign Key Field', i1.props());
    var foreignKeyFieldMissingCheckSuccess = i1.createAction('[Association Designer] Foreign Key Field Missing Check Success', i1.props());
    var createForeignKeyField = i1.createAction('[Association Designer] Create Foreign Key Field', i1.props());
    var createForeignKeyFieldSuccess = i1.createAction('[Association Designer] Create Foreign Key Field Success');
    var createForeignKeyFieldError = i1.createAction('[Association Designer] Create Foreign Key Field Error');
    var getCreatedForeignKeyFieldId = i1.createAction('[Association Designer] Get Created Foreign Key Field ID');
    var getCreatedForeignKeyFieldIdSuccess = i1.createAction('[Association Designer] Get Created Foreign Key Field ID Success', i1.props());
    var getCreatedForeignKeyFieldIdError = i1.createAction('[Association Designer] Get Created Foreign Key Field ID Error');
    var createOrUpdateDefinition = i1.createAction('[Association Designer] Create Or Update Definition');
    var getCreatedForeignKeyField = i1.createAction('[Association Designer] Get Created Foreign Key Field');
    var getCreatedForeignKeyFieldError = i1.createAction('[Association Designer] Get Created Foreign Key Field Error');
    var removeCreatedForeignKeyField = i1.createAction('[Association Designer] Remove Created Foreign Key Field', i1.props());
    var removeCreatedForeignKeyFieldSuccess = i1.createAction('[Association Designer] Remove Created Foreign Key Field Success');
    var removeCreatedForeignKeyFieldError = i1.createAction('[Association Designer] Remove Created Foreign Key Field Error');
    var saveDefinitionSuccess = i1.createAction('[Association Designer] Save Definition Success', i1.props());
    var createDefinitionError = i1.createAction('[Association Designer] Create Definition Error');
    var updateDefinitionError = i1.createAction('[Association Designer] Update Definition Error');
    var destroy = i1.createAction('[Association Designer] Destroy');

    var RX_ASSOCIATION_DESIGNER = {
        featureSelector: 'associationDesigner'
    };

    var associationDesignerStateSelector = i1.createFeatureSelector(RX_ASSOCIATION_DESIGNER.featureSelector);
    var associationDesignerModelSelector = i1.createSelector(associationDesignerStateSelector, function (associationDesignerState) { return associationDesignerState.model; });
    var isDesignModeSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.isDesignMode; });
    var bundleIdSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.bundleId; });
    var definitionNameSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.definitionName; });
    var definitionModelSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.definitionModel; });
    var definitionModelFromDefinitionSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.definitionModelFromDefinition; });
    var isDirtySelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.isDirty; });
    var isForeignKeyCreatedSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.isForeignKeyCreated; });
    var isForeignKeyMissingSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.isForeignKeyMissing; });
    var savedDefinitionNameSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.savedDefinitionName; });
    var originalDefinitionSelector = i1.createSelector(associationDesignerModelSelector, function (associationDesignerModel) { return associationDesignerModel.originalDefinition; });

    var AssociationDesignerService = /** @class */ (function () {
        function AssociationDesignerService(rxDefinitionNameService, rxRecordDefinitionService, rxRecordDefinitionCacheService) {
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        }
        AssociationDesignerService.prototype.getDefinitionModelFromDefinition = function (definition) {
            return {
                cardinality: [lodash.find(Object.values(i4.RX_ASSOCIATION_DEFINITION.cardinality), { value: definition.cardinality })],
                customizationOptions: {
                    scope: definition.scope,
                    allowOverlay: definition.allowOverlay
                },
                description: definition.description,
                guid: definition.guid,
                isEnabled: definition.isEnabled,
                lastChangedBy: definition.lastChangedBy,
                lastUpdateTime: definition.lastUpdateTime,
                name: definition.name,
                nodeAId: definition.nodeAId,
                nodeAKeys: definition.nodeAKeys,
                nodeAModality: definition.nodeAModality,
                nodeAName: definition.nodeAName,
                nodeBId: definition.nodeBId,
                nodeBKeys: definition.nodeBKeys,
                nodeBName: definition.nodeBName,
                overlayDescriptor: definition.overlayDescriptor,
                overlayGroupId: definition.overlayGroupId,
                shouldCascadeDelete: definition.shouldCascadeDelete,
                tags: definition.tags
            };
        };
        AssociationDesignerService.prototype.getDefinitionFromDefinitionModel = function (model) {
            return {
                allowOverlay: model.customizationOptions.allowOverlay,
                cardinality: model.cardinality[0].value,
                description: model.description,
                guid: model.guid,
                isEnabled: model.isEnabled,
                name: model.name,
                lastUpdateTime: model.lastUpdateTime,
                nodeAId: model.nodeAId,
                nodeAKeys: model.nodeAKeys,
                nodeAModality: model.cardinality[0].value === i4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                    ? i4.RxModalityType.Optional
                    : model.nodeAModality,
                nodeAName: model.nodeAName,
                nodeBId: model.nodeBId,
                nodeBKeys: model.cardinality[0].value === i4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                    ? [i2.RX_RECORD_DEFINITION.coreFieldIds.id]
                    : model.nodeBKeys,
                nodeBName: model.nodeBName,
                scope: model.customizationOptions.scope,
                shouldCascadeDelete: model.cardinality[0].value === i4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                    ? false
                    : model.shouldCascadeDelete,
                overlayDescriptor: model.overlayDescriptor,
                overlayGroupId: model.overlayGroupId,
                tags: model.tags
            };
        };
        AssociationDesignerService.prototype.getRecordDefinition = function (name, forceReload) {
            if (forceReload === void 0) { forceReload = false; }
            return forceReload
                ? this.rxRecordDefinitionService.get(name, {}, true)
                : this.rxRecordDefinitionCacheService.getRecordDefinition(name);
        };
        AssociationDesignerService.prototype.getForeignKeyFieldName = function (definitionModel) {
            var fieldNameBase = definitionModel.nodeAName || this.rxDefinitionNameService.getDisplayName(definitionModel.nodeAId);
            return fieldNameBase.toUpperCase() + '_ID';
        };
        AssociationDesignerService.prototype.getForeignKeyFieldId = function (definitionModel, forceReload) {
            var _this = this;
            if (forceReload === void 0) { forceReload = false; }
            return this.getRecordDefinition(definitionModel.nodeBId, forceReload).pipe(operators.map(function (recordDefinition) {
                var _a;
                var foreignKeyFieldName = _this.getForeignKeyFieldName(definitionModel);
                return (_a = recordDefinition.fieldDefinitions.find(function (field) { return field.name === foreignKeyFieldName; })) === null || _a === void 0 ? void 0 : _a.id;
            }));
        };
        return AssociationDesignerService;
    }());
    AssociationDesignerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociationDesignerService, deps: [{ token: i3__namespace.RxDefinitionNameService }, { token: i2__namespace.RxRecordDefinitionService }, { token: i2__namespace.RxRecordDefinitionCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AssociationDesignerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociationDesignerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociationDesignerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.RxDefinitionNameService }, { type: i2__namespace.RxRecordDefinitionService }, { type: i2__namespace.RxRecordDefinitionCacheService }]; } });

    var RxAssociationDesignerComponent = /** @class */ (function () {
        function RxAssociationDesignerComponent(store$, associationDesignerService, rxGlobalCacheService, rxAssociationCardinalityPipe, rxDefinitionNameService, translateService, rxOverlayService, rxNotificationService, renderer) {
            var _this = this;
            this.store$ = store$;
            this.associationDesignerService = associationDesignerService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxAssociationCardinalityPipe = rxAssociationCardinalityPipe;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.translateService = translateService;
            this.rxOverlayService = rxOverlayService;
            this.rxNotificationService = rxNotificationService;
            this.renderer = renderer;
            this.definitionSaved = new i0.EventEmitter();
            this.definitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.firstRecordDefinitionPickerOptions = {
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i6.RxDefinitionPickerScope.Bundle, i6.RxDefinitionPickerScope.All],
                    search: i6.RxDefinitionPickerScope.All
                },
                definitionType: i6.RxDefinitionPickerType.RegularDataRecord,
                label: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-field.label'),
                required: true,
                tooltip: new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-field.tooltip'))
            };
            this.secondRecordDefinitionPickerOptions = {
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i6.RxDefinitionPickerScope.Bundle, i6.RxDefinitionPickerScope.Rx],
                    search: i6.RxDefinitionPickerScope.Rx
                },
                definitionType: i6.RxDefinitionPickerType.RegularDataRecord,
                label: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-field.label'),
                required: true,
                tooltip: new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-field.tooltip'))
            };
            this.firstRecordDefinitionRoleTooltip = new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-role-field.tooltip'));
            this.secondRecordDefinitionRoleTooltip = new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-role-field.tooltip'));
            this.cascadeDeleteTooltip = new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.association-designer.should-cascade-delete.tooltip'));
            this.cardinalities = Object.values(i4.RX_ASSOCIATION_DEFINITION.cardinality);
            this.validDefinitionNameRegex = i2.RX_RECORD_DEFINITION.validDefinitionNameRegex;
            this.associationForm = new i10.FormGroup({
                name: new i10.FormControl(''),
                description: new i10.FormControl(),
                nodeAId: new i10.FormControl(),
                nodeBId: new i10.FormControl(),
                nodeAName: new i10.FormControl(),
                nodeBName: new i10.FormControl(),
                nodeAModality: new i10.FormControl(),
                cardinality: new i10.FormControl([i4.RX_ASSOCIATION_DEFINITION.cardinality.oneToOne]),
                shouldCascadeDelete: new i10.FormControl(),
                isEnabled: new i10.FormControl(true),
                customizationOptions: new i10.FormControl()
            });
            this.isSavingInProgressSubject = new rxjs.BehaviorSubject(false);
            this.isDesignMode$ = this.store$.select(isDesignModeSelector);
            this.isDirty$ = this.store$.select(isDirtySelector);
            this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
            this.bundleFriendlyName$ = this.store$
                .select(bundleIdSelector)
                .pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleFriendlyName(bundleId); }));
            this.definitionModelFromDefinition$ = this.store$.select(definitionModelFromDefinitionSelector);
            this.definitionModel$ = this.store$.select(definitionModelSelector).pipe(operators.tap(function (definitionModel) {
                _this.associationForm.patchValue({
                    name: _this.rxDefinitionNameService.getDisplayName(definitionModel.name),
                    description: definitionModel.description,
                    nodeAId: definitionModel.nodeAId,
                    nodeBId: definitionModel.nodeBId,
                    nodeAName: definitionModel.nodeAName,
                    nodeBName: definitionModel.nodeBName,
                    nodeAModality: definitionModel.nodeAModality === i4.RX_ASSOCIATION_DEFINITION.modality.required,
                    cardinality: [_this.getCardinalityByValue(definitionModel.cardinality[0].value)],
                    shouldCascadeDelete: definitionModel.shouldCascadeDelete,
                    isEnabled: definitionModel.isEnabled,
                    customizationOptions: {
                        allowOverlay: definitionModel.customizationOptions.allowOverlay,
                        scope: definitionModel.customizationOptions.scope
                    }
                }, { emitEvent: false });
            }), operators.shareReplay(1));
            this.isExistingDefinition$ = this.definitionModelFromDefinition$.pipe(operators.map(function (definitionModel) { return Boolean(definitionModel.lastUpdateTime); }), operators.shareReplay(1));
            this.isCustomizationEnabled$ = this.definitionModelFromDefinition$.pipe(operators.map(function (definitionModel) { return _this.rxOverlayService.isCustomizationEnabled(null, definitionModel); }));
            this.scopeCustomizationControlOptions$ = this.definitionModelFromDefinition$.pipe(operators.map(function (definitionModel) { return ({
                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                scope: definitionModel.customizationOptions.scope,
                overlayGroupId: definitionModel.overlayGroupId,
                overlayDescriptor: definitionModel.overlayDescriptor,
                isDisabled: !_this.rxOverlayService.isCustomizationEnabled('allowOverlay', definitionModel),
                definitionTypeDisplayName: _this.translateService
                    .instant('com.bmc.arsys.rx.client.common.association-definition.label')
                    .toLowerCase()
            }); }));
            this.revertCustomizationControlOptions$ = this.definitionModelFromDefinition$.pipe(operators.map(function (definitionModel) { return ({
                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                scope: definitionModel.customizationOptions.scope,
                overlayGroupId: definitionModel.overlayGroupId,
                overlayDescriptor: definitionModel.overlayDescriptor
            }); }));
            this.validationIssues$ = rxjs.combineLatest([
                this.definitionModel$,
                this.isExistingDefinition$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), definitionModel = _b[0], isExistingDefinition = _b[1];
                return _this.validate(definitionModel, isExistingDefinition);
            }), operators.shareReplay(1));
            this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.associationDesignerService.getDefinitionFromDefinitionModel(definitionModel); }));
            this.definitionForJsonViewer$ = this.isDesignMode$.pipe(operators.switchMap(function (isDesignMode) { return isDesignMode
                ? rxjs.of(null)
                : rxjs.combineLatest([_this.definitionFromDefinitionModel$, _this.originalDefinition$]).pipe(operators.map(function (_a) {
                    var _b = __read(_a, 2), definitionFromDefinitionModel = _b[0], originalDefinition = _b[1];
                    return (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel));
                })); }));
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
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (issueSections) { return lodash.some(issueSections, {
                issues: [{ type: i3$1.ValidationIssueType.Error }]
            }); }));
            this.cascadeDeleteLabel$ = this.definitionModel$.pipe(operators.map(function (model) { return _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.should-cascade-delete.label', {
                firstRecordDefinitionName: _this.rxDefinitionNameService.getDisplayName(model.nodeAId),
                firstRecordDefinitionRole: model.nodeAName
                    ? _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                        nodeName: model.nodeAName
                    })
                    : '',
                secondRecordDefinitionName: _this.rxDefinitionNameService.getDisplayName(model.nodeBId),
                secondRecordDefinitionRole: model.nodeBName
                    ? _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                        nodeName: model.nodeBName
                    })
                    : ''
            }); }));
            this.recordAssociationLabel$ = this.definitionModel$.pipe(operators.map(function (model) { return _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.require-record-association.label', {
                firstRecordDefinitionName: _this.rxDefinitionNameService.getDisplayName(model.nodeAId),
                firstRecordDefinitionRole: model.nodeAName
                    ? _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                        nodeName: model.nodeAName
                    })
                    : '',
                secondRecordDefinitionName: _this.rxDefinitionNameService.getDisplayName(model.nodeBId),
                secondRecordDefinitionRole: model.nodeBName
                    ? _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.node-name.label', {
                        nodeName: model.nodeBName
                    })
                    : ''
            }); }));
            this.isModalityDisabled$ = this.definitionModel$.pipe(operators.withLatestFrom(this.isCustomizationEnabled$), operators.map(function (_a) {
                var _b = __read(_a, 2), _c = _b[0], shouldCascadeDelete = _c.shouldCascadeDelete, nodeAId = _c.nodeAId, nodeBId = _c.nodeBId, isCustomizationEnabled = _b[1];
                return !isCustomizationEnabled || !(shouldCascadeDelete && nodeAId && nodeBId);
            }));
            this.isSaveButtonDisabled$ = rxjs.combineLatest([
                this.isDirty$,
                this.hasValidationErrors$,
                this.isReadOnly$,
                this.isSavingInProgressSubject
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 4), isDirty = _b[0], hasValidationErrors = _b[1], isReadOnly = _b[2], isSavingInProgress = _b[3];
                return !isDirty || hasValidationErrors || isReadOnly || isSavingInProgress;
            }));
            this.breadcrumbItems$ = this.definitionModel$.pipe(operators.filter(Boolean), operators.map(function (definitionModel) {
                var definitionName = _this.rxDefinitionNameService.getDisplayName(definitionModel.name);
                return [
                    {
                        label: definitionName ||
                            "<" + _this.translateService.instant('com.bmc.arsys.rx.client.association-designer.new-association.label') + ">",
                        data: {}
                    }
                ];
            }));
            this.canCascadeDelete$ = this.definitionModel$.pipe(operators.takeUntil(this.destroyed$), operators.map(function (definitionModel) {
                // If association type is many to many shouldCascadeDelete should be set to false
                return definitionModel.cardinality[0].value !== i4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value;
            }));
            this.vm$ = rxjs.combineLatest([
                this.breadcrumbItems$,
                this.bundleFriendlyName$,
                this.canCascadeDelete$,
                this.cascadeDeleteLabel$,
                this.hasValidationErrors$,
                this.isExistingDefinition$,
                this.isModalityDisabled$,
                this.isSaveButtonDisabled$,
                this.recordAssociationLabel$,
                this.revertCustomizationControlOptions$,
                this.scopeCustomizationControlOptions$,
                this.validationIssues$,
                this.definitionForJsonViewer$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 14), breadcrumbItems = _b[0], bundleFriendlyName = _b[1], canCascadeDelete = _b[2], cascadeDeleteLabel = _b[3], hasValidationErrors = _b[4], isExistingDefinition = _b[5], isModalityDisabled = _b[6], isSaveButtonDisabled = _b[7], recordAssociationLabel = _b[8], revertCustomizationControlOptions = _b[9], scopeCustomizationControlOptions = _b[10], validationIssues = _b[11], definitionForJsonViewer = _b[12], isReadOnly = _b[13];
                return ({
                    breadcrumbItems: breadcrumbItems,
                    bundleFriendlyName: bundleFriendlyName,
                    canCascadeDelete: canCascadeDelete,
                    cascadeDeleteLabel: cascadeDeleteLabel,
                    hasValidationErrors: hasValidationErrors,
                    isExistingDefinition: isExistingDefinition,
                    isModalityDisabled: isModalityDisabled,
                    isSaveButtonDisabled: isSaveButtonDisabled,
                    recordAssociationLabel: recordAssociationLabel,
                    revertCustomizationControlOptions: revertCustomizationControlOptions,
                    scopeCustomizationControlOptions: scopeCustomizationControlOptions,
                    validationIssues: validationIssues,
                    definitionForJsonViewer: definitionForJsonViewer,
                    isReadOnly: isReadOnly
                });
            }));
            this.cardinalityOptionsFormatter = function (option) {
                return _this.rxAssociationCardinalityPipe.transform(option.value);
            };
        }
        RxAssociationDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.associationForm.valueChanges
                .pipe(operators.distinctUntilChanged(lodash.isEqual), operators.withLatestFrom(this.store$.select(bundleIdSelector)), operators.tap(function (_a) {
                var _b = __read(_a, 2), formValue = _b[0], bundleId = _b[1];
                _this.store$.dispatch(updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: {
                        customizationOptions: formValue.customizationOptions,
                        description: formValue.description,
                        isEnabled: formValue.isEnabled,
                        nodeAId: formValue.nodeAId,
                        nodeAName: formValue.nodeAName,
                        nodeBId: formValue.nodeBId,
                        nodeBName: formValue.nodeBName,
                        shouldCascadeDelete: formValue.shouldCascadeDelete,
                        name: _this.rxDefinitionNameService.getDefinitionName(bundleId, formValue.name),
                        cardinality: formValue.cardinality,
                        nodeAModality: formValue.nodeAModality
                            ? i4.RX_ASSOCIATION_DEFINITION.modality.required
                            : i4.RX_ASSOCIATION_DEFINITION.modality.optional
                    }
                }));
            }))
                .subscribe();
            this.definitionModel$
                .pipe(operators.distinctUntilChanged(function (prev, cur) { return prev.nodeBId === cur.nodeBId &&
                prev.nodeAName === cur.nodeAName &&
                prev.shouldCascadeDelete === cur.shouldCascadeDelete &&
                prev.nodeAModality === cur.nodeAModality; }), operators.filter(function (definitionModel) { return !definitionModel.lastUpdateTime &&
                !!definitionModel.nodeBId &&
                definitionModel.cardinality[0].value !== i4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value; }), operators.switchMap(function (definitionModel) { return _this.associationDesignerService.getForeignKeyFieldId(definitionModel); }), operators.withLatestFrom(this.definitionModel$), operators.tap(function (_a) {
                var _b = __read(_a, 2), fieldId = _b[0], definitionModel = _b[1];
                if (fieldId) {
                    _this.store$.dispatch(updateDefinitionModelFromDesigner({
                        definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { nodeBKeys: [fieldId] })
                    }));
                }
                else {
                    _this.store$.dispatch(updateDefinitionModelFromDesigner({
                        definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { nodeBKeys: [i2.RX_RECORD_DEFINITION.coreFieldIds.id] })
                    }));
                }
            }), operators.takeUntil(this.destroyed$))
                .subscribe();
            this.associationForm
                .get('shouldCascadeDelete')
                .valueChanges.pipe(operators.takeUntil(this.destroyed$), operators.tap(function (shouldCascadeDelete) {
                if (!shouldCascadeDelete) {
                    _this.associationForm.patchValue({
                        nodeAModality: false
                    });
                }
            }))
                .subscribe();
            this.store$
                .select(savedDefinitionNameSelector)
                .pipe(operators.skip(1), operators.takeUntil(this.destroyed$))
                .subscribe(function (savedDefinitionName) {
                _this.definitionSaved.emit(savedDefinitionName);
            });
        };
        RxAssociationDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue) {
                this.store$.dispatch(init({ payload: this.configuration }));
            }
        };
        RxAssociationDesignerComponent.prototype.canDeactivate = function () {
            var canDeactivate = true;
            this.isDirty$.pipe(operators.take(1)).subscribe(function (isDirty) {
                canDeactivate = !isDirty;
            });
            return canDeactivate;
        };
        RxAssociationDesignerComponent.prototype.toggleDesignMode = function () {
            this.store$.dispatch(toggleDesignMode());
        };
        RxAssociationDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            if (validationIssue.data.type === 'input') {
                this.renderer.selectRootElement("[rx-id=\"" + validationIssue.data.id + "\"] input", true).focus();
            }
            else {
                this.renderer.selectRootElement("[rx-id=\"" + validationIssue.data.id + "\"] [rx-id=\"toggle-button\"]", true).click();
            }
        };
        RxAssociationDesignerComponent.prototype.validate = function (definitionModel, isExistingDefinition) {
            var validationIssues = [];
            if (!isExistingDefinition) {
                if (lodash.isEmpty(lodash.trim(this.rxDefinitionNameService.getDisplayName(definitionModel.name)))) {
                    validationIssues.push({
                        type: i3$1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.name-field.label')
                        }),
                        data: {
                            id: 'name',
                            type: 'input'
                        }
                    });
                }
                if (definitionModel.name && !i2.RX_RECORD_DEFINITION.validFullDefinitionName.test(definitionModel.name)) {
                    validationIssues.push({
                        type: i3$1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.name-field.label')
                        }),
                        data: {
                            id: 'name',
                            type: 'input'
                        }
                    });
                }
                if (lodash.isEmpty(definitionModel.nodeAId)) {
                    validationIssues.push({
                        type: i3$1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.first-record-field.label')
                        }),
                        data: {
                            id: 'first-record',
                            type: 'definition-picker'
                        }
                    });
                }
                if (lodash.isEmpty(definitionModel.nodeBId)) {
                    validationIssues.push({
                        type: i3$1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.second-record-field.label')
                        }),
                        data: {
                            id: 'second-record',
                            type: 'definition-picker'
                        }
                    });
                }
            }
            return validationIssues.length
                ? [
                    {
                        title: this.translateService.instant('com.bmc.arsys.rx.client.association-designer.new-association.label'),
                        issues: validationIssues
                    }
                ]
                : [];
        };
        RxAssociationDesignerComponent.prototype.onRevertCustomization = function (event) {
            if (event.type === i6.RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
                this.store$.dispatch(revertCustomization());
            }
        };
        RxAssociationDesignerComponent.prototype.getCardinalityByValue = function (value) {
            return lodash.find(this.cardinalities, { value: value });
        };
        RxAssociationDesignerComponent.prototype.saveDefinition = function () {
            this.store$.dispatch(saveDefinition());
        };
        RxAssociationDesignerComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.isSavingInProgressSubject.complete();
            this.store$.dispatch(destroy());
        };
        return RxAssociationDesignerComponent;
    }());
    RxAssociationDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerComponent, deps: [{ token: i1__namespace.Store }, { token: AssociationDesignerService }, { token: i3__namespace.RxGlobalCacheService }, { token: i4__namespace.RxAssociationCardinalityPipe }, { token: i3__namespace.RxDefinitionNameService }, { token: i5__namespace.TranslateService }, { token: i3__namespace.RxOverlayService }, { token: i3__namespace.RxNotificationService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxAssociationDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignerComponent, selector: "rx-association-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        rx-id=\"validation-issues\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.association-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n          [issueSections]=\"vm.validationIssues\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <h1 class=\"mt-0\">\n          {{\n            vm.isExistingDefinition\n              ? ('com.bmc.arsys.rx.client.association-designer.edit-association.title' | translate)\n              : ('com.bmc.arsys.rx.client.association-designer.create-association.title' | translate)\n          }}\n        </h1>\n\n        <form class=\"rx-association-designer-form d-block\" [formGroup]=\"associationForm\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            formControlName=\"name\"\n            label=\"{{ 'com.bmc.arsys.rx.client.association-designer.name-field.label' | translate }}\"\n            id=\"association-name\"\n            rx-id=\"name\"\n            [disabledStyleForReadonlyState]=\"true\"\n            [readonly]=\"vm.isExistingDefinition\"\n            [required]=\"true\"\n          ></adapt-rx-textfield>\n\n          <adapt-rx-textarea\n            rx-id=\"description\"\n            class=\"d-block form-group\"\n            [label]=\"'com.bmc.arsys.rx.client.common.description.label' | translate\"\n            formControlName=\"description\"\n            [disabled]=\"vm.isReadOnly\"\n          ></adapt-rx-textarea>\n\n          <div class=\"d-flex justify-center align-items-center w-100\">\n            <rx-definition-picker\n              rx-id=\"first-record\"\n              [options]=\"firstRecordDefinitionPickerOptions\"\n              [formControl]=\"associationForm.get('nodeAId')\"\n              [isDisabled]=\"vm.isExistingDefinition\"\n              required=\"true\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></rx-definition-picker>\n\n            <div class=\"rx-association-designer-arrow-1\"></div>\n\n            <adapt-rx-select\n              rx-id=\"cardinality\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.cardinality-field.label' | translate\"\n              [options]=\"cardinalities\"\n              [formControl]=\"associationForm.get('cardinality')\"\n              [optionFormatter]=\"cardinalityOptionsFormatter\"\n              [disabled]=\"vm.isExistingDefinition\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></adapt-rx-select>\n\n            <div class=\"rx-association-designer-arrow-2\"></div>\n\n            <rx-definition-picker\n              rx-id=\"second-record\"\n              [options]=\"secondRecordDefinitionPickerOptions\"\n              [formControl]=\"associationForm.get('nodeBId')\"\n              [isDisabled]=\"vm.isExistingDefinition\"\n              required=\"true\"\n              class=\"form-group d-block flex-grow-1 rx-association-input\"\n            ></rx-definition-picker>\n          </div>\n\n          <div class=\"d-flex justify-center align-items-center w-100\">\n            <adapt-rx-textfield\n              rx-id=\"first-record-role\"\n              class=\"d-block form-group w-100\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.first-record-role-field.label' | translate\"\n              formControlName=\"nodeAName\"\n              [disabled]=\"vm.isReadOnly\"\n              [tooltip]=\"firstRecordDefinitionRoleTooltip\"\n            ></adapt-rx-textfield>\n\n            <div class=\"rx-association-designer-arrow-placeholder\"></div>\n\n            <div class=\"flex-grow-1 w-100\"></div>\n\n            <div class=\"rx-association-designer-arrow-placeholder\"></div>\n\n            <adapt-rx-textfield\n              rx-id=\"second-record-role\"\n              class=\"d-block form-group w-100\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.second-record-role-field.label' | translate\"\n              formControlName=\"nodeBName\"\n              [disabled]=\"vm.isReadOnly\"\n              [tooltip]=\"secondRecordDefinitionRoleTooltip\"\n            ></adapt-rx-textfield>\n          </div>\n\n          <div *ngIf=\"vm.canCascadeDelete\">\n            <adapt-rx-control-label\n              rx-id=\"add-constraints\"\n              [label]=\"'com.bmc.arsys.rx.client.association-designer.add-constraints-field.label' | translate\"\n              [tooltip]=\"cascadeDeleteTooltip\"\n            ></adapt-rx-control-label>\n\n            <adapt-rx-checkbox\n              rx-id=\"cascade-delete\"\n              formControlName=\"shouldCascadeDelete\"\n              [label]=\"vm.cascadeDeleteLabel\"\n              [readonly]=\"vm.isExistingDefinition\"\n            ></adapt-rx-checkbox>\n\n            <adapt-rx-checkbox\n              rx-id=\"required-association\"\n              formControlName=\"nodeAModality\"\n              [label]=\"vm.recordAssociationLabel\"\n              [readonly]=\"vm.isModalityDisabled || vm.isReadOnly\"\n            ></adapt-rx-checkbox>\n          </div>\n\n          <hr />\n\n          <rx-revert-customization\n            *ngIf=\"vm.revertCustomizationControlOptions\"\n            [options]=\"vm.revertCustomizationControlOptions\"\n            (events)=\"onRevertCustomization($event)\"\n          ></rx-revert-customization>\n\n          <rx-scope-customization-control\n            class=\"d-block mb-5\"\n            *ngIf=\"vm.scopeCustomizationControlOptions\"\n            [options]=\"vm.scopeCustomizationControlOptions\"\n            formControlName=\"customizationOptions\"\n          ></rx-scope-customization-control>\n\n          <adapt-rx-checkbox\n            rx-id=\"is-enabled\"\n            formControlName=\"isEnabled\"\n            [disabled]=\"vm.isReadOnly\"\n            [label]=\"'com.bmc.arsys.rx.client.association-designer.enable-association.label' | translate\"\n          ></adapt-rx-checkbox>\n        </form>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}.rx-association-designer-form{max-width:700px}.rx-association-designer-arrow-1,.rx-association-designer-arrow-2,.rx-association-designer-arrow-placeholder{margin-top:8px;width:30px;height:2px;position:relative;flex-shrink:0}.rx-association-designer-arrow-1:before,.rx-association-designer-arrow-2:before{content:\"\";display:block;position:absolute;background-color:#959899;top:0;left:0;width:100%;height:100%}.rx-association-designer-arrow-2:after{content:\"\";display:block;position:absolute;right:0;top:-3px;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:10px solid #959899}.rx-association-input{width:213px}adapt-rx-textarea ::ng-deep textarea{resize:none}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i6__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7__namespace.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7__namespace.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i3__namespace$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7__namespace.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i7__namespace.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i6__namespace.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i7__namespace.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7__namespace.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7__namespace.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6__namespace.RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: ["options", "isDisabled"], outputs: ["events"] }, { type: i6__namespace.CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: ["options"] }, { type: i7__namespace.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i9__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i10__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i10__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i10__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i10__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i10__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i9__namespace.AsyncPipe, "translate": i5__namespace.TranslatePipe, "json": i9__namespace.JsonPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-association-designer',
                        templateUrl: './association-designer.component.html',
                        styleUrls: ['./association-designer.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.Store }, { type: AssociationDesignerService }, { type: i3__namespace.RxGlobalCacheService }, { type: i4__namespace.RxAssociationCardinalityPipe }, { type: i3__namespace.RxDefinitionNameService }, { type: i5__namespace.TranslateService }, { type: i3__namespace.RxOverlayService }, { type: i3__namespace.RxNotificationService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], definitionSaved: [{
                    type: i0.Output
                }], definitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }] } });

    var RxAssociationDesignerPageComponent = /** @class */ (function () {
        function RxAssociationDesignerPageComponent(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
            this.activatedRoute = activatedRoute;
            this.router = router;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.translateService = translateService;
            this.isInitialized = false;
            this.definitionsRoute = 'association-definitions';
            this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.association-designer.title');
        }
        RxAssociationDesignerPageComponent.prototype.ngOnInit = function () {
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
        RxAssociationDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        RxAssociationDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        RxAssociationDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        RxAssociationDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i3.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                this.definitionsRoute
            ]);
        };
        RxAssociationDesignerPageComponent.prototype.onDefinitionSaved = function (definitionName) {
            if (this.isNewDefinition) {
                this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        RxAssociationDesignerPageComponent.prototype.onDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        return RxAssociationDesignerPageComponent;
    }());
    RxAssociationDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerPageComponent, deps: [{ token: i1__namespace$1.ActivatedRoute }, { token: i1__namespace$1.Router }, { token: i3__namespace.RxBundleCacheService }, { token: i3__namespace.RxComponentCanDeactivateGuard }, { token: i3__namespace.RxDefinitionNameService }, { token: i3__namespace.RxPageTitleService }, { token: i3__namespace$1.RxUtilityModalsService }, { token: i5__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxAssociationDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignerPageComponent, selector: "rx-association-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: RxAssociationDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-association-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-association-designer>\n", components: [{ type: RxAssociationDesignerComponent, selector: "rx-association-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i9__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-association-designer-page',
                        templateUrl: './association-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActivatedRoute }, { type: i1__namespace$1.Router }, { type: i3__namespace.RxBundleCacheService }, { type: i3__namespace.RxComponentCanDeactivateGuard }, { type: i3__namespace.RxDefinitionNameService }, { type: i3__namespace.RxPageTitleService }, { type: i3__namespace$1.RxUtilityModalsService }, { type: i5__namespace.TranslateService }]; }, propDecorators: { designerComponent: [{
                    type: i0.ViewChild,
                    args: [RxAssociationDesignerComponent]
                }] } });

    var AssociationDesignerEffects = /** @class */ (function () {
        function AssociationDesignerEffects(store$, actions$, errorHandler, rxDefinitionUpdateService, associationDesignerService, rxRecordDefinitionService, rxComponentCanDeactivateGuard, rxAssociationDefinitionService, rxModalService, rxNotificationService, translateService) {
            var _this = this;
            this.store$ = store$;
            this.actions$ = actions$;
            this.errorHandler = errorHandler;
            this.rxDefinitionUpdateService = rxDefinitionUpdateService;
            this.associationDesignerService = associationDesignerService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxAssociationDefinitionService = rxAssociationDefinitionService;
            this.rxModalService = rxModalService;
            this.rxNotificationService = rxNotificationService;
            this.translateService = translateService;
            this.initAssociationDesigner$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(init), operators.map(function () { return loadDefinition(); })); });
            this.loadDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinition), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), _ = _c[0], definitionName = _c[1];
                return definitionName
                    ? _this.rxAssociationDefinitionService.get(definitionName)
                    : _this.rxAssociationDefinitionService.getNew();
            }), operators.map(function (definition) { return loadDefinitionSuccess({ definition: definition }); })); });
            this.loadDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinitionSuccess), operators.map(function (action) { return initDefinitionData({
                definition: action.definition,
                definitionModel: _this.associationDesignerService.getDefinitionModelFromDefinition(action.definition)
            }); })); });
            this.saveDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinition), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.map(function (_b) {
                var _c = __read(_b, 2), action = _c[0], definitionModel = _c[1];
                return definitionModel.cardinality[0].value === i4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
                    ? createOrUpdateDefinition()
                    : getRecordDefinition({ checkForMissingFieldAction: true });
            })); });
            this.getRecordDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(getRecordDefinition), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), action = _c[0], definitionModel = _c[1];
                return _this.associationDesignerService.getRecordDefinition(definitionModel.nodeBId, true).pipe(operators.map(function (definition) {
                    if (action.checkForMissingFieldAction) {
                        return checkForMissingForeignKeyField({ definition: definition });
                    }
                    else if (action.createForeignKeyFieldAction) {
                        return createForeignKeyField({ definition: definition });
                    }
                }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(getRecordDefinitionError());
                }));
            })); });
            this.checkForMissingForeignKeyField$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(checkForMissingForeignKeyField), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), action = _c[0], definitionModel = _c[1];
                if (!definitionModel.lastUpdateTime) {
                    return _this.associationDesignerService.getForeignKeyFieldId(definitionModel, true).pipe(operators.map(function (foreignKeyFieldId) {
                        // Update nodeBKeys again in case we get new foreign key field ID in force reload definition
                        return foreignKeyFieldMissingCheckSuccess({
                            payload: {
                                updatedForeignKeyFieldId: foreignKeyFieldId,
                                isForeignKeyFieldMissing: !foreignKeyFieldId
                            }
                        });
                    }), operators.catchError(function (error) {
                        _this.errorHandler.handleError(error);
                        return rxjs.of(getForeignKeyFieldIdError());
                    }));
                }
                else if (definitionModel.lastUpdateTime) {
                    var missingForeignKeyFields = lodash.reject(definitionModel.nodeBKeys, function (fieldId) { return lodash.some(action.definition.fieldDefinitions, { id: fieldId }); });
                    return [
                        foreignKeyFieldMissingCheckSuccess({
                            payload: {
                                updatedForeignKeyFieldId: null,
                                isForeignKeyFieldMissing: missingForeignKeyFields.length > 0
                            }
                        })
                    ];
                }
                else {
                    return [
                        foreignKeyFieldMissingCheckSuccess({
                            payload: {
                                updatedForeignKeyFieldId: null,
                                isForeignKeyFieldMissing: false
                            }
                        })
                    ];
                }
            })); });
            this.foreignKeyFieldMissingCheckSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(foreignKeyFieldMissingCheckSuccess), operators.withLatestFrom(_this.store$.select(isForeignKeyMissingSelector)), operators.map(function (_b) {
                var _c = __read(_b, 2), action = _c[0], isForeignKeyMissing = _c[1];
                return isForeignKeyMissing
                    ? getRecordDefinition({ createForeignKeyFieldAction: true })
                    : createOrUpdateDefinition();
            })); });
            this.createForeignKeyField$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(createForeignKeyField), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), action = _c[0], definitionModel = _c[1];
                var definition = lodash.cloneDeep(action.definition);
                definition.fieldDefinitions.push({
                    resourceType: i2.RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                    name: _this.associationDesignerService.getForeignKeyFieldName(definitionModel),
                    description: null,
                    fieldOption: i2.RecordFieldOption.Optional,
                    maxLength: 254,
                    defaultValue: null
                });
                return _this.rxRecordDefinitionService.update(definition).pipe(operators.map(function () { return createForeignKeyFieldSuccess(); }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(createForeignKeyFieldError());
                }));
            })); });
            this.createForeignKeyFieldSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(createForeignKeyFieldSuccess), operators.map(function () { return getCreatedForeignKeyFieldId(); })); });
            this.getCreatedForeignKeyFieldId$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(getCreatedForeignKeyFieldId), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), action = _c[0], definitionModel = _c[1];
                return _this.associationDesignerService.getForeignKeyFieldId(definitionModel, true).pipe(operators.map(function (fieldId) { return getCreatedForeignKeyFieldIdSuccess({ fieldId: fieldId }); }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(getCreatedForeignKeyFieldIdError());
                }));
            })); });
            this.getCreatedForeignKeyFieldIdSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(getCreatedForeignKeyFieldIdSuccess), operators.map(function () { return createOrUpdateDefinition(); })); });
            this.createOrUpdateDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(createOrUpdateDefinition), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(originalDefinitionSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 3), action = _c[0], definitionModel = _c[1], originalDefinition = _c[2];
                var definition = _this.associationDesignerService.getDefinitionFromDefinitionModel(definitionModel);
                return definitionModel.lastUpdateTime
                    ? _this.rxDefinitionUpdateService
                        .execute(_this.rxAssociationDefinitionService.update.bind(_this.rxAssociationDefinitionService, Object.assign(Object.assign({}, originalDefinition), definition)))
                        .pipe(operators.map(function () { return saveDefinitionSuccess({
                        savedDefinitionName: definitionModel.name
                    }); }), operators.catchError(function (error) {
                        _this.errorHandler.handleError(error);
                        return rxjs.of(updateDefinitionError());
                    }))
                    : _this.rxAssociationDefinitionService.create(definition).pipe(operators.map(function (response) {
                        var _a;
                        var savedDefinitionName = decodeURIComponent(lodash.last((_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a.get('location').split('/')) || '') || definitionModel.name;
                        return saveDefinitionSuccess({
                            savedDefinitionName: savedDefinitionName
                        });
                    }), operators.catchError(function (error) {
                        _this.errorHandler.handleError(error);
                        // If POST of AssociationDefinition fails and the foreign key field has been added,
                        // that field will be removed via createDefinitionError action.
                        return rxjs.of(createDefinitionError());
                    }));
            })); });
            this.createDefinitionError$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(createDefinitionError), operators.map(function () { return getCreatedForeignKeyField(); })); });
            this.getCreatedForeignKeyField$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(getCreatedForeignKeyField), operators.withLatestFrom(_this.store$.select(isForeignKeyCreatedSelector)), operators.filter(function (_b) {
                var _c = __read(_b, 2), action = _c[0], isForeignKeyCreated = _c[1];
                return isForeignKeyCreated;
            }), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), action = _c[0], definitionModel = _c[1];
                return rxjs.forkJoin([
                    _this.associationDesignerService.getForeignKeyFieldId(definitionModel, true),
                    _this.associationDesignerService.getRecordDefinition(definitionModel.nodeBId, true)
                ]).pipe(operators.map(function (_b) {
                    var _c = __read(_b, 2), foreignKeyFieldId = _c[0], definition = _c[1];
                    definition.fieldDefinitions = lodash.reject(definition.fieldDefinitions, {
                        id: foreignKeyFieldId
                    });
                    return removeCreatedForeignKeyField({ foreignKeyFieldId: foreignKeyFieldId, definition: definition });
                }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(getCreatedForeignKeyFieldError());
                }));
            })); });
            this.removeCreatedForeignKeyField$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(removeCreatedForeignKeyField), operators.withLatestFrom(_this.store$.select(isForeignKeyCreatedSelector)), operators.filter(function (_b) {
                var _c = __read(_b, 2), action = _c[0], isForeignKeyCreated = _c[1];
                return isForeignKeyCreated;
            }), operators.switchMap(function (_b) {
                var _c = __read(_b, 1), action = _c[0];
                var definition = Object.assign(Object.assign({}, action.definition), { fieldDefinitions: lodash.reject(action.definition.fieldDefinitions, {
                        id: action.foreignKeyFieldId
                    }) });
                return _this.rxRecordDefinitionService.update(definition).pipe(operators.map(function () { return removeCreatedForeignKeyFieldSuccess(); }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(removeCreatedForeignKeyFieldError());
                }));
            })); });
            this.saveDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinitionSuccess), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.tap(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                    definitionTypeDisplayName: _this.translateService.instant('com.bmc.arsys.rx.client.common.association-definition.label')
                }));
            }), operators.filter(function (_b) {
                var _c = __read(_b, 2), _ = _c[0], definitionName = _c[1];
                return !!definitionName;
            }), operators.map(function () { return loadDefinition(); })); });
            this.revertCustomization$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(revertCustomization), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), _ = _c[0], definitionModel = _c[1];
                return _this.rxAssociationDefinitionService.revertCustomization(definitionModel.name);
            }), operators.tap(function () {
                _this.rxComponentCanDeactivateGuard.disable();
                window.location.reload();
            })); }, { dispatch: false });
            this.markPristine$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(initDefinitionData, saveDefinition, saveDefinitionSuccess), operators.map(function () { return markDesignerPristine(); })); });
            this.markDirty$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(updateDefinitionModelFromDesigner, getRecordDefinitionError, getForeignKeyFieldIdError, createForeignKeyFieldError, getCreatedForeignKeyFieldError, createDefinitionError, updateDefinitionError, removeCreatedForeignKeyFieldError), operators.map(function () { return markDesignerDirty(); })); });
        }
        return AssociationDesignerEffects;
    }());
    AssociationDesignerEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociationDesignerEffects, deps: [{ token: i1__namespace.Store }, { token: i2__namespace$1.Actions }, { token: i0__namespace.ErrorHandler }, { token: i3__namespace.RxDefinitionUpdateService }, { token: AssociationDesignerService }, { token: i2__namespace.RxRecordDefinitionService }, { token: i3__namespace.RxComponentCanDeactivateGuard }, { token: i4__namespace.RxAssociationDefinitionService }, { token: i3__namespace$1.RxModalService }, { token: i3__namespace.RxNotificationService }, { token: i5__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AssociationDesignerEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociationDesignerEffects });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociationDesignerEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Store }, { type: i2__namespace$1.Actions }, { type: i0__namespace.ErrorHandler }, { type: i3__namespace.RxDefinitionUpdateService }, { type: AssociationDesignerService }, { type: i2__namespace.RxRecordDefinitionService }, { type: i3__namespace.RxComponentCanDeactivateGuard }, { type: i4__namespace.RxAssociationDefinitionService }, { type: i3__namespace$1.RxModalService }, { type: i3__namespace.RxNotificationService }, { type: i5__namespace.TranslateService }]; } });

    var initialDefinitionModel = {
        cardinality: [
            {
                value: i4.RxCardinalityType.OneToOne,
                labelKey: 'com.bmc.arsys.rx.client.association.cardinality.one-to-one.label'
            }
        ],
        description: null,
        guid: null,
        isEnabled: true,
        name: null,
        nodeAId: null,
        nodeAKeys: [i2.RX_RECORD_DEFINITION.coreFieldIds.id],
        nodeBKeys: [i2.RX_RECORD_DEFINITION.coreFieldIds.id],
        nodeAModality: i4.RxModalityType.Optional,
        nodeAName: null,
        nodeBId: null,
        nodeBName: null,
        shouldCascadeDelete: false,
        customizationOptions: { allowOverlay: true, scope: 'PUBLIC' }
    };
    var initialState = {
        bundleId: null,
        definitionName: null,
        isDesignMode: true,
        definitionModel: initialDefinitionModel,
        definitionModelFromDefinition: initialDefinitionModel,
        isDirty: false,
        isForeignKeyMissing: false,
        isForeignKeyCreated: false,
        savedDefinitionName: null,
        originalDefinition: null
    };
    var reducer = i1.createReducer(initialState, i1.on(init, function (state, _a) {
        var payload = _a.payload;
        return (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName, isForeignKeyCreated: false }));
    }), i1.on(initDefinitionData, function (state, _a) {
        var definition = _a.definition, definitionModel = _a.definitionModel;
        return (Object.assign(Object.assign({}, state), { definitionModel: definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }));
    }), i1.on(updateDefinitionModelFromDesigner, function (state, _a) {
        var definitionModelFromDesigner = _a.definitionModelFromDesigner;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }));
    }), i1.on(toggleDesignMode, function (state) { return (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode })); }), i1.on(foreignKeyFieldMissingCheckSuccess, function (state, _a) {
        var payload = _a.payload;
        return (Object.assign(Object.assign({}, state), { isForeignKeyMissing: payload.isForeignKeyFieldMissing, definitionModel: Object.assign(Object.assign({}, state.definitionModel), { nodeBKeys: payload.updatedForeignKeyFieldId
                    ? [payload.updatedForeignKeyFieldId]
                    : state.definitionModel.nodeBKeys }) }));
    }), i1.on(createForeignKeyFieldError, function (state) { return (Object.assign(Object.assign({}, state), { isForeignKeyCreated: false })); }), i1.on(createForeignKeyFieldSuccess, function (state) { return (Object.assign(Object.assign({}, state), { isForeignKeyCreated: true })); }), i1.on(getCreatedForeignKeyFieldIdSuccess, function (state, _a) {
        var fieldId = _a.fieldId;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { nodeBKeys: [fieldId] }) }));
    }), i1.on(saveDefinitionSuccess, function (state, _a) {
        var savedDefinitionName = _a.savedDefinitionName;
        return (Object.assign(Object.assign({}, state), { savedDefinitionName: savedDefinitionName }));
    }), i1.on(markDesignerPristine, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: false })); }), i1.on(markDesignerDirty, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); }), i1.on(destroy, function (state) { return (Object.assign({}, initialState)); }));
    function associationDesignerModelReducer(state, action) {
        return reducer(state, action);
    }

    var RxAssociationDesignerModule = /** @class */ (function () {
        function RxAssociationDesignerModule() {
        }
        return RxAssociationDesignerModule;
    }());
    RxAssociationDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxAssociationDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerModule, declarations: [RxAssociationDesignerComponent], imports: [i7.AdaptSidebarModule,
            i9.CommonModule,
            i10.FormsModule,
            i10.ReactiveFormsModule,
            i6.RxDesignerHeaderModule,
            i3$1.RxValidationIssuesModule,
            i6.RxDefinitionPickerModule,
            i4.RxAssociationPipesModule,
            i6.CustomizationOptionsModule,
            i6.RxRevertCustomizationModule,
            i7.AdaptTabsModule,
            i7.AdaptRxFormsModule,
            i7.AdaptCodeViewerModule,
            i5.TranslateModule, i1__namespace.StoreFeatureModule, i2__namespace$1.EffectsFeatureModule], exports: [RxAssociationDesignerComponent] });
    RxAssociationDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerModule, providers: [i4.RxAssociationCardinalityPipe, i3.RxDefinitionNamePipe], imports: [[
                i7.AdaptSidebarModule,
                i9.CommonModule,
                i10.FormsModule,
                i10.ReactiveFormsModule,
                i6.RxDesignerHeaderModule,
                i3$1.RxValidationIssuesModule,
                i6.RxDefinitionPickerModule,
                i4.RxAssociationPipesModule,
                i6.CustomizationOptionsModule,
                i6.RxRevertCustomizationModule,
                i7.AdaptTabsModule,
                i7.AdaptRxFormsModule,
                i7.AdaptCodeViewerModule,
                i5.TranslateModule,
                i1.StoreModule.forFeature(RX_ASSOCIATION_DESIGNER.featureSelector, {
                    model: associationDesignerModelReducer
                }),
                i2$1.EffectsModule.forFeature([AssociationDesignerEffects])
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxAssociationDesignerComponent],
                        imports: [
                            i7.AdaptSidebarModule,
                            i9.CommonModule,
                            i10.FormsModule,
                            i10.ReactiveFormsModule,
                            i6.RxDesignerHeaderModule,
                            i3$1.RxValidationIssuesModule,
                            i6.RxDefinitionPickerModule,
                            i4.RxAssociationPipesModule,
                            i6.CustomizationOptionsModule,
                            i6.RxRevertCustomizationModule,
                            i7.AdaptTabsModule,
                            i7.AdaptRxFormsModule,
                            i7.AdaptCodeViewerModule,
                            i5.TranslateModule,
                            i1.StoreModule.forFeature(RX_ASSOCIATION_DESIGNER.featureSelector, {
                                model: associationDesignerModelReducer
                            }),
                            i2$1.EffectsModule.forFeature([AssociationDesignerEffects])
                        ],
                        exports: [RxAssociationDesignerComponent],
                        providers: [i4.RxAssociationCardinalityPipe, i3.RxDefinitionNamePipe]
                    }]
            }] });

    var RxAssociationDesignerPageModule = /** @class */ (function () {
        function RxAssociationDesignerPageModule() {
        }
        return RxAssociationDesignerPageModule;
    }());
    RxAssociationDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxAssociationDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerPageModule, declarations: [RxAssociationDesignerPageComponent], imports: [i9.CommonModule, RxAssociationDesignerModule], exports: [RxAssociationDesignerPageComponent] });
    RxAssociationDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerPageModule, imports: [[i9.CommonModule, RxAssociationDesignerModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociationDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxAssociationDesignerPageComponent],
                        imports: [i9.CommonModule, RxAssociationDesignerModule],
                        exports: [RxAssociationDesignerPageComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxAssociationDesignerComponent = RxAssociationDesignerComponent;
    exports.RxAssociationDesignerModule = RxAssociationDesignerModule;
    exports.RxAssociationDesignerPageComponent = RxAssociationDesignerPageComponent;
    exports.RxAssociationDesignerPageModule = RxAssociationDesignerPageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-association-designer.umd.js.map
