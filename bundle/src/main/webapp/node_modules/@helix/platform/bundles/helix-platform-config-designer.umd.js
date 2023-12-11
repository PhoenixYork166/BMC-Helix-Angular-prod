(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@helix/platform/config/api'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@bmc-ux/adapt-table'), require('@helix/platform/record/api'), require('@helix/platform/shared/api'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('@helix/platform/view/components'), require('@ngx-translate/core'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@ngrx/store'), require('@helix/platform/utils'), require('@ngrx/effects'), require('@ngrx/component-store'), require('@helix/platform/view/api'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/config/designer', ['exports', '@helix/platform/config/api', '@angular/common', '@angular/core', '@angular/forms', '@bmc-ux/adapt-angular', '@bmc-ux/adapt-table', '@helix/platform/record/api', '@helix/platform/shared/api', '@helix/platform/shared/components', '@helix/platform/ui-kit', '@helix/platform/view/components', '@ngx-translate/core', 'lodash', 'rxjs', 'rxjs/operators', '@ngrx/store', '@helix/platform/utils', '@ngrx/effects', '@ngrx/component-store', '@helix/platform/view/api', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.config = global.helix.platform.config || {}, global.helix.platform.config.designer = {}), global.helix.platform.config.api, global.ng.common, global.ng.core, global.ng.forms, global.i7, global.i9$1, global.helix.platform.record.api, global.helix.platform.shared.api, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.helix.platform.view.components, global.ngxTranslateCore, global.lodash, global.rxjs, global.rxjs.operators, global.i1, global.helix.platform.utils, global.i2$1, global.componentStore, global.helix.platform.view.api, global.ng.router));
})(this, (function (exports, i9, i10, i0, i6$1, i7, i9$1, api, i2, i6, i4$1, components, i4, lodash, rxjs, operators, i1, i1$1, i2$1, componentStore, api$1, i1$2) { 'use strict';

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

    var i9__namespace$1 = /*#__PURE__*/_interopNamespace(i9);
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i6__namespace$1 = /*#__PURE__*/_interopNamespace(i6$1);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);

    var RX_CONFIG_DESIGNER = {
        featureSelector: 'configDesigner',
        settingAccessOptions: {
            application: {
                label: 'Application',
                value: i9.ShowInLocationOptions.Application
            },
            innovationStudio: {
                label: 'Innovation Studio',
                value: i9.ShowInLocationOptions.InnovationStudio
            },
            both: {
                value: i9.ShowInLocationOptions.Both
            },
            none: {
                value: i9.ShowInLocationOptions.None
            }
        },
        dataTypes: {
            attachment: {
                labelKey: 'com.bmc.arsys.rx.client.common.data-types.attachment.label',
                resourceType: 'com.bmc.arsys.rx.admin-settings.AttachmentFieldDefinition'
            },
            color: {
                labelKey: 'com.bmc.arsys.rx.client.common.data-types.color.label',
                resourceType: 'com.bmc.arsys.rx.admin-settings.ColorChooserFieldDefinition'
            },
            secure: {
                labelKey: 'com.bmc.arsys.rx.client.common.data-types.secure.label',
                resourceType: 'com.bmc.arsys.rx.admin-settings.SecureDataFieldDefinition'
            }
        }
    };

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

    var init = i1.createAction('[Config Designer] Init', i1.props());
    var loadParentComponents = i1.createAction('[Config Designer] Load Parent Components');
    var loadParentComponentsSuccess = i1.createAction('[Config Designer] Load Parent Components Success', i1.props());
    var loadDefinition = i1.createAction('[Config Designer] Load Definition');
    var loadDefinitionSuccess = i1.createAction('[Config Designer] Load Definition Success', i1.props());
    var initDefinitionModel = i1.createAction('[Config Designer] Init Definition Model', i1.props());
    var markDesignerPristine = i1.createAction('[Config Designer] Mark Designer Pristine');
    var markDesignerDirty = i1.createAction('[Config Designer] Mark Designer Dirty');
    var updateDefinitionModelFromDesigner = i1.createAction('[Config Designer] Update Definition Model From Designer', i1.props());
    var updateSelectedFieldModel = i1.createAction('[Config Designer] Update Selected Field Model', i1.props());
    var createNewFieldModel = i1.createAction('[Config Designer] Create New Field Model', i1.props());
    var addFieldModel = i1.createAction('[Config Designer] Add Field Model', i1.props());
    var clearSelectedFieldGuid = i1.createAction('[Config Designer] Clear Selected Field GUID');
    var setSelectedFieldGuid = i1.createAction('[Config Designer] Set Selected Field GUID', i1.props());
    var deleteSelectedField = i1.createAction('[Config Designer] Delete Selected Field');
    var deleteSelectedFieldSuccess = i1.createAction('[Config Designer] Delete Selected Field Success');
    var toggleDesignMode = i1.createAction('[Config Designer] Toggle Design Mode');
    var editFieldGroups = i1.createAction('[Config Designer] Edit Field Groups');
    var setInspectorTabIndex = i1.createAction('[Config Designer] Set Inspector Tab Index', i1.props());
    var saveDefinition = i1.createAction('[Config Designer] Save Definition');
    var updateDefinition = i1.createAction('[Config Designer] Update Definition', i1.props());
    var saveDefinitionSuccess = i1.createAction('[Config Designer] Save Definition Success', i1.props());
    var saveDefinitionError = i1.createAction('[Config Designer] Save Definition Error');
    var destroy = i1.createAction('[Config Designer] Destroy');

    var configDesignerStateSelector = i1.createFeatureSelector(RX_CONFIG_DESIGNER.featureSelector);
    var configDesignerModelSelector = i1.createSelector(configDesignerStateSelector, function (configDesignerState) { return configDesignerState.model; });
    var bundleIdSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.bundleId; });
    var definitionNameSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.definitionName; });
    var isDesignModeSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.isDesignMode; });
    var inspectorTabIndexSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.inspectorTabIndex; });
    var parentComponentsSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.parentComponents; });
    var selectedFieldGuidSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.selectedFieldGuid; });
    var definitionModelFromDefinitionSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.definitionModelFromDefinition; });
    var definitionModelSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.definitionModel; });
    var isDirtySelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.isDirty; });
    var savedDefinitionNameSelector = i1.createSelector(configDesignerModelSelector, function (configDesignerModel) { return configDesignerModel.savedDefinitionName; });

    var ConfigDesignerService = /** @class */ (function () {
        function ConfigDesignerService() {
        }
        ConfigDesignerService.prototype.getDefinitionFromDefinitionModel = function (model) {
            return {
                componentName: model.componentName,
                showInLocation: model.isSettingAccessibleInApplication && model.isSettingAccessibleInInnovationStudio
                    ? RX_CONFIG_DESIGNER.settingAccessOptions.both.value
                    : model.isSettingAccessibleInApplication
                        ? RX_CONFIG_DESIGNER.settingAccessOptions.application.value
                        : model.isSettingAccessibleInInnovationStudio
                            ? RX_CONFIG_DESIGNER.settingAccessOptions.innovationStudio.value
                            : RX_CONFIG_DESIGNER.settingAccessOptions.none.value,
                supportsMultiple: model.supportsMultiple,
                parentComponentName: model.parentComponentName,
                impactRowVisibility: lodash.isNil(model.parentComponentName) && model.supportsMultiple
                    ? model.impactRowVisibility
                    : i9.ImpactRowVisibility.None,
                permissions: model.permissions,
                registeredModuleName: model.registeredModuleName,
                viewComponent: model.viewComponent,
                externalLink: model.externalLink,
                viewToOpen: model.viewToOpen,
                localeList: [
                    {
                        componentLabel: model.componentLabel,
                        firstMenu: lodash.isNil(model.parentComponentName) &&
                            (model.isSettingAccessibleInApplication || model.isSettingAccessibleInInnovationStudio)
                            ? model.firstMenu
                            : null,
                        secondMenu: lodash.isNil(model.parentComponentName) &&
                            (model.isSettingAccessibleInApplication || model.isSettingAccessibleInInnovationStudio)
                            ? model.secondMenu
                            : null,
                        locale: 'en-US'
                    }
                ],
                settingMetaData: model.fields.map(function (field) {
                    var _a, _b;
                    return ({
                        dataType: field.dataType,
                        defaultValue: field.dataType === api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                            ? field.selectionFieldOptionProperties.defaultValue
                            : field.defaultValue,
                        minValue: field.minValue,
                        maxValue: field.maxValue,
                        fieldOrder: field.fieldOrder,
                        id: field.id,
                        keySetting: field.keySetting,
                        required: field.required,
                        optionNamesById: (_a = field.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById,
                        optionLabelsById: (_b = field.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionLabelsById,
                        localeList: [
                            Object.assign(Object.assign({}, field.localeList[0]), { settingLabel: field.settingLabel })
                        ]
                    });
                })
            };
        };
        return ConfigDesignerService;
    }());
    ConfigDesignerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ConfigDesignerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var BaseFieldDefinitionService = /** @class */ (function () {
        function BaseFieldDefinitionService(injector) {
            this.injector = injector;
            this.translateService = this.injector.get(i4.TranslateService);
            this.defaultFieldGroupName = this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label');
        }
        BaseFieldDefinitionService.prototype.getNewFieldDefinitionModel = function (fieldProperties) {
            return Object.assign({ dataType: this.dataType, required: false, defaultValue: null, localeList: [
                    {
                        locale: 'en',
                        fieldGrouping: this.defaultFieldGroupName,
                        settingLabel: fieldProperties.id
                    }
                ] }, fieldProperties);
        };
        BaseFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'id',
                            component: i6.TextFormControlComponent,
                            isDisabled: !options.isNew,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'settingLabel',
                            component: i6.TextFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.field-label.label'),
                                required: true
                            }
                        },
                        {
                            name: 'dataType',
                            component: i6.SelectFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                                options: [
                                    {
                                        id: RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType,
                                        name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.attachment.labelKey)
                                    },
                                    {
                                        id: api.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType,
                                        name: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.boolean.labelKey)
                                    },
                                    {
                                        id: api.RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                        name: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.character.labelKey)
                                    },
                                    {
                                        id: RX_CONFIG_DESIGNER.dataTypes.color.resourceType,
                                        name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.color.labelKey)
                                    },
                                    {
                                        id: api.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
                                        name: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey)
                                    },
                                    {
                                        id: api.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                                        name: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.decimal.labelKey)
                                    },
                                    {
                                        id: api.RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                                        name: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.integer.labelKey)
                                    },
                                    {
                                        id: RX_CONFIG_DESIGNER.dataTypes.secure.resourceType,
                                        name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.secure.labelKey)
                                    },
                                    {
                                        id: api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType,
                                        name: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.selection.labelKey)
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
                            name: 'required',
                            component: i6.SwitchFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.required-field.label')
                            }
                        },
                        {
                            name: 'keySetting',
                            component: i6.SwitchFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.key-field.label')
                            }
                        }
                    ]
                }
            ];
        };
        BaseFieldDefinitionService.prototype.validate = function (fieldModel) {
            var validationIssues = [];
            if (!lodash.trim(fieldModel.id)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                    }),
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    }
                });
            }
            if (!lodash.trim(fieldModel.settingLabel)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.field-label.label')
                    }),
                    data: {
                        propertyName: 'settingLabel',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return BaseFieldDefinitionService;
    }());

    var AttachmentFieldDefinitionService = /** @class */ (function (_super) {
        __extends(AttachmentFieldDefinitionService, _super);
        function AttachmentFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.dataType = RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType;
            return _this;
        }
        AttachmentFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Removed 'Key field for repeated setting' control from Details section
            inspectorConfig[1].controls.pop();
            // Adding controls specific to attachment field to Details section
            inspectorConfig[1].controls.push({
                name: 'maxValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.max-file-size.label'),
                    allowIntegerOnly: true,
                    minValue: 0,
                    maxValue: i1$1.RX_NUMBER.maxInteger
                }
            });
            return inspectorConfig;
        };
        return AttachmentFieldDefinitionService;
    }(BaseFieldDefinitionService));
    AttachmentFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AttachmentFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AttachmentFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var BooleanFieldDefinitionService = /** @class */ (function (_super) {
        __extends(BooleanFieldDefinitionService, _super);
        function BooleanFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.dataType = api.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType;
            return _this;
        }
        BooleanFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Adding controls specific to boolean field to Details section
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'defaultValue',
                component: i6.SelectFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    emptyOption: true,
                    options: [
                        {
                            id: 'true',
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.true')
                        },
                        {
                            id: 'false',
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.false')
                        }
                    ]
                }
            });
            return inspectorConfig;
        };
        return BooleanFieldDefinitionService;
    }(BaseFieldDefinitionService));
    BooleanFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    BooleanFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BooleanFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var CharacterFieldDefinitionService = /** @class */ (function (_super) {
        __extends(CharacterFieldDefinitionService, _super);
        function CharacterFieldDefinitionService(injector, rxNumberUtilsService) {
            var _this = _super.call(this, injector) || this;
            _this.rxNumberUtilsService = rxNumberUtilsService;
            _this.dataType = api.RX_RECORD_DEFINITION.dataTypes.character.resourceType;
            return _this;
        }
        CharacterFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Adding controls specific to character field to Details section
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'minValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    allowIntegerOnly: true,
                    minValue: 0,
                    maxValue: i1$1.RX_NUMBER.maxInteger
                }
            }, {
                name: 'maxValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                    allowIntegerOnly: true,
                    minValue: 0,
                    maxValue: i1$1.RX_NUMBER.maxInteger
                }
            }, {
                name: 'defaultValue',
                component: i6.TextFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        CharacterFieldDefinitionService.prototype.validate = function (fieldModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel);
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) && Number(fieldModel.minValue) < 0) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) && Number(fieldModel.maxValue) < 0) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.minValue && Number(fieldModel.minValue) > i1$1.RX_NUMBER.maxInteger) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                        maxValue: i1$1.RX_NUMBER.maxInteger
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.maxValue && Number(fieldModel.maxValue) > i1$1.RX_NUMBER.maxInteger) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                        maxValue: i1$1.RX_NUMBER.maxInteger
                    }),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
                this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
                Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                        maxValue: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label')
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return CharacterFieldDefinitionService;
    }(BaseFieldDefinitionService));
    CharacterFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CharacterFieldDefinitionService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace.RxNumberUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    CharacterFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CharacterFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CharacterFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace.RxNumberUtilsService }]; } });

    var ColorFieldDefinitionService = /** @class */ (function (_super) {
        __extends(ColorFieldDefinitionService, _super);
        function ColorFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.dataType = RX_CONFIG_DESIGNER.dataTypes.color.resourceType;
            return _this;
        }
        ColorFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Adding controls specific to color field to Details section
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'defaultValue',
                component: i6.ColorPickerFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        return ColorFieldDefinitionService;
    }(BaseFieldDefinitionService));
    ColorFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ColorFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ColorFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var DateOnlyFieldDefinitionService = /** @class */ (function (_super) {
        __extends(DateOnlyFieldDefinitionService, _super);
        function DateOnlyFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.dataType = api.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType;
            return _this;
        }
        DateOnlyFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Adding controls specific to date only field to Details section
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'defaultValue',
                component: i6.DateFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        return DateOnlyFieldDefinitionService;
    }(BaseFieldDefinitionService));
    DateOnlyFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateOnlyFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DateOnlyFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateOnlyFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DateOnlyFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var NumericFieldDefinitionService = /** @class */ (function (_super) {
        __extends(NumericFieldDefinitionService, _super);
        function NumericFieldDefinitionService(injector, rxNumberUtilsService) {
            var _this = _super.call(this, injector) || this;
            _this.rxNumberUtilsService = rxNumberUtilsService;
            return _this;
        }
        NumericFieldDefinitionService.prototype.validate = function (fieldModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel);
            if (fieldModel.minValue && Number(fieldModel.minValue) < this.minValue) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
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
                    type: i4$1.ValidationIssueType.Error,
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
                    type: i4$1.ValidationIssueType.Error,
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
                    type: i4$1.ValidationIssueType.Error,
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
            if (fieldModel.defaultValue && Number(fieldModel.defaultValue) < this.minValue) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
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
                    type: i4$1.ValidationIssueType.Error,
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
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
                this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
                Number(fieldModel.defaultValue) >= this.minValue &&
                Number(fieldModel.defaultValue) < Number(fieldModel.minValue)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
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
                    type: i4$1.ValidationIssueType.Error,
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
                    type: i4$1.ValidationIssueType.Error,
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
            return validationIssues;
        };
        return NumericFieldDefinitionService;
    }(BaseFieldDefinitionService));
    NumericFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NumericFieldDefinitionService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace.RxNumberUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NumericFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NumericFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NumericFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace.RxNumberUtilsService }]; } });

    var DecimalFieldDefinitionService = /** @class */ (function (_super) {
        __extends(DecimalFieldDefinitionService, _super);
        function DecimalFieldDefinitionService() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.dataType = api.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType;
            _this.minValue = i1$1.RX_NUMBER.minDecimal;
            _this.maxValue = i1$1.RX_NUMBER.maxDecimal;
            return _this;
        }
        DecimalFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Adding controls specific to decimal field to Details section
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'minValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    minValue: i1$1.RX_NUMBER.minDecimal,
                    maxValue: i1$1.RX_NUMBER.maxDecimal
                }
            }, {
                name: 'maxValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    minValue: i1$1.RX_NUMBER.minDecimal,
                    maxValue: i1$1.RX_NUMBER.maxDecimal
                }
            }, {
                name: 'defaultValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: i1$1.RX_NUMBER.minDecimal,
                    maxValue: i1$1.RX_NUMBER.maxDecimal
                }
            });
            return inspectorConfig;
        };
        return DecimalFieldDefinitionService;
    }(NumericFieldDefinitionService));
    DecimalFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DecimalFieldDefinitionService, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DecimalFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DecimalFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DecimalFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var IntegerFieldDefinitionService = /** @class */ (function (_super) {
        __extends(IntegerFieldDefinitionService, _super);
        function IntegerFieldDefinitionService() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.dataType = api.RX_RECORD_DEFINITION.dataTypes.integer.resourceType;
            _this.minValue = i1$1.RX_NUMBER.minInteger;
            _this.maxValue = i1$1.RX_NUMBER.maxInteger;
            return _this;
        }
        IntegerFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Adding controls specific to integer field to Details section
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'minValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    minValue: i1$1.RX_NUMBER.minInteger,
                    maxValue: i1$1.RX_NUMBER.maxInteger,
                    allowIntegerOnly: true
                }
            }, {
                name: 'maxValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    minValue: i1$1.RX_NUMBER.minInteger,
                    maxValue: i1$1.RX_NUMBER.maxInteger,
                    allowIntegerOnly: true
                }
            }, {
                name: 'defaultValue',
                component: i6.CounterFormControlComponent,
                options: {
                    allowIntegerOnly: true,
                    minValue: i1$1.RX_NUMBER.minInteger,
                    maxValue: i1$1.RX_NUMBER.maxInteger,
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
                }
            });
            return inspectorConfig;
        };
        return IntegerFieldDefinitionService;
    }(NumericFieldDefinitionService));
    IntegerFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IntegerFieldDefinitionService, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    IntegerFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IntegerFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: IntegerFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var SecureFieldDefinitionService = /** @class */ (function (_super) {
        __extends(SecureFieldDefinitionService, _super);
        function SecureFieldDefinitionService(injector, rxNumberUtilsService) {
            var _this = _super.call(this, injector) || this;
            _this.rxNumberUtilsService = rxNumberUtilsService;
            _this.dataType = RX_CONFIG_DESIGNER.dataTypes.secure.resourceType;
            return _this;
        }
        SecureFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            // Removed 'Key field for repeated setting' control from Details section
            inspectorConfig[1].controls.pop();
            // Adding controls specific to secure field to Details section
            inspectorConfig[1].controls.splice(inspectorConfig[1].controls.length, 0, {
                name: 'minValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    allowIntegerOnly: true,
                    minValue: 0,
                    maxValue: i1$1.RX_NUMBER.maxInteger
                }
            }, {
                name: 'maxValue',
                component: i6.CounterFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                    allowIntegerOnly: true,
                    minValue: 0,
                    maxValue: i1$1.RX_NUMBER.maxInteger
                }
            });
            return inspectorConfig;
        };
        SecureFieldDefinitionService.prototype.validate = function (fieldModel) {
            var validationIssues = _super.prototype.validate.call(this, fieldModel);
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) && Number(fieldModel.minValue) < 0) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) && Number(fieldModel.maxValue) < 0) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-max-length-error.message'),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.minValue && Number(fieldModel.minValue) > i1$1.RX_NUMBER.maxInteger) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                        maxValue: i1$1.RX_NUMBER.maxInteger
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.maxValue && Number(fieldModel.maxValue) > i1$1.RX_NUMBER.maxInteger) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                        maxValue: i1$1.RX_NUMBER.maxInteger
                    }),
                    data: {
                        propertyName: 'maxValue',
                        guid: fieldModel.guid
                    }
                });
            }
            if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
                this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
                Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                        maxValue: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label')
                    }),
                    data: {
                        propertyName: 'minValue',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return SecureFieldDefinitionService;
    }(BaseFieldDefinitionService));
    SecureFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SecureFieldDefinitionService, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace.RxNumberUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    SecureFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SecureFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SecureFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace.RxNumberUtilsService }]; } });

    var SelectionFieldDefinitionService = /** @class */ (function (_super) {
        __extends(SelectionFieldDefinitionService, _super);
        function SelectionFieldDefinitionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.dataType = api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType;
            return _this;
        }
        SelectionFieldDefinitionService.prototype.getFieldInspectorConfig = function (options) {
            var _a, _b, _c;
            var inspectorConfig = _super.prototype.getFieldInspectorConfig.call(this, options);
            inspectorConfig[1].controls.splice(1, 0, {
                name: 'selectionFieldOptionProperties',
                component: i6.SelectionFieldOptionsComponent,
                options: {
                    defaultValue: (_a = options.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.defaultValue,
                    optionNamesById: (_b = options.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionNamesById,
                    optionLabelsById: (_c = options.selectionFieldOptionProperties) === null || _c === void 0 ? void 0 : _c.optionLabelsById
                }
            });
            return inspectorConfig;
        };
        SelectionFieldDefinitionService.prototype.validate = function (fieldModel) {
            var _a;
            var validationIssues = _super.prototype.validate.call(this, fieldModel);
            if (lodash.isEmpty((_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.options.label') }),
                    data: {
                        propertyName: 'selectionFieldOptionProperties',
                        guid: fieldModel.guid
                    }
                });
            }
            return validationIssues;
        };
        return SelectionFieldDefinitionService;
    }(BaseFieldDefinitionService));
    SelectionFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldDefinitionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    SelectionFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SelectionFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var FieldDefinitionManagerService = /** @class */ (function () {
        function FieldDefinitionManagerService(attachmentFieldDefinitionService, booleanFieldDefinitionService, characterFieldDefinitionService, colorFieldDefinitionService, dateOnlyFieldDefinitionService, decimalFieldDefinitionService, integerFieldDefinitionService, secureFieldDefinitionService, selectionFieldDefinitionService) {
            this.fieldServices = new Map();
            this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType, attachmentFieldDefinitionService);
            this.fieldServices.set(api.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, booleanFieldDefinitionService);
            this.fieldServices.set(api.RX_RECORD_DEFINITION.dataTypes.character.resourceType, characterFieldDefinitionService);
            this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.color.resourceType, colorFieldDefinitionService);
            this.fieldServices.set(api.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType, dateOnlyFieldDefinitionService);
            this.fieldServices.set(api.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType, decimalFieldDefinitionService);
            this.fieldServices.set(api.RX_RECORD_DEFINITION.dataTypes.integer.resourceType, integerFieldDefinitionService);
            this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.secure.resourceType, secureFieldDefinitionService);
            this.fieldServices.set(api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType, selectionFieldDefinitionService);
        }
        FieldDefinitionManagerService.prototype.getNewFieldDefinitionModel = function (resourceType, fieldProperties) {
            return this.fieldServices.get(resourceType).getNewFieldDefinitionModel(fieldProperties);
        };
        FieldDefinitionManagerService.prototype.getFieldInspectorConfig = function (resourceType, options) {
            return this.fieldServices.get(resourceType).getFieldInspectorConfig(options);
        };
        FieldDefinitionManagerService.prototype.validate = function (fieldModel) {
            return this.fieldServices.get(fieldModel.dataType).validate(fieldModel);
        };
        return FieldDefinitionManagerService;
    }());
    FieldDefinitionManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldDefinitionManagerService, deps: [{ token: AttachmentFieldDefinitionService }, { token: BooleanFieldDefinitionService }, { token: CharacterFieldDefinitionService }, { token: ColorFieldDefinitionService }, { token: DateOnlyFieldDefinitionService }, { token: DecimalFieldDefinitionService }, { token: IntegerFieldDefinitionService }, { token: SecureFieldDefinitionService }, { token: SelectionFieldDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    FieldDefinitionManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldDefinitionManagerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldDefinitionManagerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: AttachmentFieldDefinitionService }, { type: BooleanFieldDefinitionService }, { type: CharacterFieldDefinitionService }, { type: ColorFieldDefinitionService }, { type: DateOnlyFieldDefinitionService }, { type: DecimalFieldDefinitionService }, { type: IntegerFieldDefinitionService }, { type: SecureFieldDefinitionService }, { type: SelectionFieldDefinitionService }]; } });

    var ConfigDesignerComponent = /** @class */ (function () {
        function ConfigDesignerComponent(store$, configDesignerService, rxGlobalCacheService, translateService, rxDefinitionNameService, fieldDefinitionManagerService) {
            var _this = this;
            this.store$ = store$;
            this.configDesignerService = configDesignerService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.translateService = translateService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.fieldDefinitionManagerService = fieldDefinitionManagerService;
            this.definitionSaved = new i0.EventEmitter();
            this.definitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.newTitle = "<" + this.translateService.instant('com.bmc.arsys.rx.client.config-designer.new-configuration.title') + ">";
            this.dataTypes = [
                {
                    displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.attachment.labelKey),
                    dataType: RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType
                },
                {
                    displayName: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.boolean.labelKey),
                    dataType: api.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType
                },
                {
                    displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.color.labelKey),
                    dataType: RX_CONFIG_DESIGNER.dataTypes.color.resourceType
                },
                {
                    displayName: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.character.labelKey),
                    dataType: api.RX_RECORD_DEFINITION.dataTypes.character.resourceType
                },
                {
                    displayName: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey),
                    dataType: api.RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType
                },
                {
                    displayName: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.integer.labelKey),
                    dataType: api.RX_RECORD_DEFINITION.dataTypes.integer.resourceType
                },
                {
                    displayName: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.selection.labelKey),
                    dataType: api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                },
                {
                    displayName: this.translateService.instant(api.RX_RECORD_DEFINITION.dataTypes.decimal.labelKey),
                    dataType: api.RX_RECORD_DEFINITION.dataTypes.decimal.resourceType
                },
                {
                    displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.secure.labelKey),
                    dataType: RX_CONFIG_DESIGNER.dataTypes.secure.resourceType
                }
            ].sort(function (a, b) { return a.displayName.localeCompare(b.displayName); });
            this.trueLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.true');
            this.falseLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.false');
            this.yesLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label');
            this.noLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.no.label');
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.isApplication$ = this.store$.select(bundleIdSelector).pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleDescriptor(bundleId); }), operators.map(function (bundleDescriptor) { return bundleDescriptor.isApplication; }));
            this.inspectorTabIndexSubject = new rxjs.Subject();
            this.inspectorTabIndex$ = this.store$.select(inspectorTabIndexSelector);
            this.selectedFieldGuid$ = this.store$.select(selectedFieldGuidSelector);
            this.parentComponents$ = this.store$.select(parentComponentsSelector);
            this.isDirty$ = this.store$.select(isDirtySelector);
            this.bundleFriendlyName$ = this.store$
                .select(bundleIdSelector)
                .pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleFriendlyName(bundleId); }));
            this.definitionModel$ = this.store$.select(definitionModelSelector);
            this.definitionDisplayName$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return definitionModel.componentName; }), operators.startWith(null));
            this.validationIssues$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.validate(definitionModel); }), operators.shareReplay(1));
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (issueSections) { return lodash.some(issueSections, {
                issues: [{ type: i4$1.ValidationIssueType.Error }]
            }); }));
            this.isSaveButtonDisabled$ = rxjs.combineLatest([this.hasValidationErrors$, this.isDirty$]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), hasValidationErrors = _d[0], isDirty = _d[1];
                return hasValidationErrors || !isDirty;
            }), operators.startWith(true));
            this.definitionInspectorConfig$ = rxjs.combineLatest([
                this.parentComponents$,
                this.bundleFriendlyName$,
                this.isApplication$,
                this.definitionModel$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 4), parentComponents = _d[0], bundleFriendlyName = _d[1], isApplication = _d[2], definitionModel = _d[3];
                return _this.getDefinitionInspectorConfig(parentComponents, bundleFriendlyName, isApplication, definitionModel);
            }));
            this.inspectorFocusEditorSubject = new rxjs.Subject();
            this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
            this.fieldGridRows$ = this.definitionModel$.pipe(operators.map(function (model) { return model.fields.map(function (field) {
                var _a, _b;
                return ({
                    id: field.id,
                    guid: field.guid,
                    required: field.required ? _this.yesLabel : _this.noLabel,
                    defaultValue: field.dataType === api.RX_RECORD_DEFINITION.dataTypes.boolean.resourceType
                        ? _this.getBooleanDisplayValue(field.defaultValue)
                        : field.dataType === RX_CONFIG_DESIGNER.dataTypes.color.resourceType
                            ? lodash.toUpper(field.defaultValue)
                            : field.dataType === api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                                ? (_a = field.selectionFieldOptionProperties.optionNamesById) === null || _a === void 0 ? void 0 : _a[field.selectionFieldOptionProperties.defaultValue]
                                : field.defaultValue,
                    keySetting: field.keySetting ? _this.yesLabel : _this.noLabel,
                    dataType: _this.getDataTypeName(field.dataType),
                    fieldGrouping: (_b = field.localeList[0]) === null || _b === void 0 ? void 0 : _b.fieldGrouping
                });
            }); }));
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
            this.selectedFieldInspectorConfig$ = this.selectedFieldModel$.pipe(operators.map(function (fieldModel) { return fieldModel
                ? _this.fieldDefinitionManagerService.getFieldInspectorConfig(fieldModel.dataType, {
                    isNew: fieldModel.isNew,
                    selectionFieldOptionProperties: fieldModel.selectionFieldOptionProperties
                })
                : null; }));
            this.breadcrumbItems$ = rxjs.combineLatest([
                this.definitionDisplayName$,
                this.selectedFieldModel$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), definitionDisplayName = _d[0], selectedFieldModel = _d[1];
                return [
                    {
                        data: null,
                        label: _this.rxDefinitionNameService.getDisplayName(_this.configuration.definitionName) ||
                            definitionDisplayName ||
                            _this.newTitle
                    },
                    { data: null, label: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.id }
                ].filter(function (item) { return item.label; });
            }));
            this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.configDesignerService.getDefinitionFromDefinitionModel(definitionModel); }));
            this.isDesignMode$ = this.store$.select(isDesignModeSelector);
            this.definitionForJsonViewer$ = this.isDesignMode$.pipe(operators.switchMap(function (isDesignMode) { return (isDesignMode ? rxjs.of(null) : _this.definitionFromDefinitionModel$); }));
            this.vm$ = rxjs.combineLatest([
                this.breadcrumbItems$,
                this.bundleFriendlyName$,
                this.definitionDisplayName$,
                this.definitionForJsonViewer$,
                this.definitionInspectorConfig$,
                this.definitionModel$,
                this.fieldGridRows$,
                this.hasValidationErrors$,
                this.isSaveButtonDisabled$,
                this.selectedFieldGridRows$,
                this.selectedFieldGuid$,
                this.selectedFieldInspectorConfig$,
                this.selectedFieldModel$,
                this.validationIssues$
            ]).pipe(operators.map(function (_c) {
                var _d = __read(_c, 14), breadcrumbItems = _d[0], bundleFriendlyName = _d[1], definitionDisplayName = _d[2], definitionForJsonViewer = _d[3], definitionInspectorConfig = _d[4], definitionModel = _d[5], fieldGridRows = _d[6], hasValidationErrors = _d[7], isSaveButtonDisabled = _d[8], selectedFieldGridRows = _d[9], selectedFieldGuid = _d[10], selectedFieldInspectorConfig = _d[11], selectedFieldModel = _d[12], validationIssues = _d[13];
                return ({
                    breadcrumbItems: breadcrumbItems,
                    bundleFriendlyName: bundleFriendlyName,
                    definitionDisplayName: definitionDisplayName,
                    definitionForJsonViewer: definitionForJsonViewer,
                    definitionInspectorConfig: definitionInspectorConfig,
                    definitionModel: definitionModel,
                    fieldGridRows: fieldGridRows,
                    hasValidationErrors: hasValidationErrors,
                    isSaveButtonDisabled: isSaveButtonDisabled,
                    selectedFieldGridRows: selectedFieldGridRows,
                    selectedFieldGuid: selectedFieldGuid,
                    selectedFieldInspectorConfig: selectedFieldInspectorConfig,
                    selectedFieldModel: selectedFieldModel,
                    validationIssues: validationIssues
                });
            }));
            this.columns = [
                {
                    field: 'id',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label'),
                    filterable: false
                },
                {
                    field: 'dataType',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                    filterable: false
                },
                {
                    field: 'required',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.required-field.title'),
                    filterable: false
                },
                {
                    field: 'defaultValue',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    filterable: false
                },
                {
                    field: 'fieldGrouping',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.field-group.title'),
                    filterable: false
                },
                {
                    field: 'keySetting',
                    header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.key-field.title'),
                    filterable: false
                }
            ];
        }
        ConfigDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue) {
                this.store$.dispatch(init({ payload: this.configuration }));
            }
        };
        ConfigDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.inspectorTabIndexSubject.pipe(operators.skip(1), operators.takeUntil(this.destroyed$)).subscribe(function (inspectorTabIndex) {
                _this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex: inspectorTabIndex }));
            });
            this.inspectorTabIndex$.pipe(operators.skip(1), operators.takeUntil(this.destroyed$)).subscribe(function (inspectorTabIndex) {
                if (!lodash.isNull(inspectorTabIndex)) {
                    _this.adaptSidebarComponent.openPanel(inspectorTabIndex);
                }
            });
            this.store$
                .select(savedDefinitionNameSelector)
                .pipe(operators.skip(1), operators.takeUntil(this.destroyed$))
                .subscribe(function (savedDefinitionName) {
                _this.definitionSaved.emit(savedDefinitionName);
            });
        };
        ConfigDesignerComponent.prototype.onSelectionChange = function (selectedFieldModel) {
            this.store$.dispatch(setSelectedFieldGuid({ guid: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.guid }));
        };
        ConfigDesignerComponent.prototype.canDeactivate = function () {
            var canDeactivate = true;
            this.isDirty$.pipe(operators.take(1)).subscribe(function (isDirty) {
                canDeactivate = !isDirty;
            });
            return canDeactivate;
        };
        ConfigDesignerComponent.prototype.saveDefinition = function () {
            this.store$.dispatch(saveDefinition());
        };
        ConfigDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            var _this = this;
            if (validationIssue.data.noFieldAdded) {
                this.createNewFieldDropdown.open();
            }
            if (validationIssue.data.guid) {
                this.store$.dispatch(setSelectedFieldGuid({ guid: validationIssue.data.guid }));
            }
            else {
                this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex: 0 }));
            }
            if (validationIssue.data.editFieldGroups) {
                this.store$.dispatch(editFieldGroups());
            }
            setTimeout(function () { return _this.inspectorFocusEditorSubject.next({
                editorName: validationIssue.data.propertyName,
                data: validationIssue.data.data
            }); }, 10);
        };
        ConfigDesignerComponent.prototype.onDefinitionModelChange = function (newDefinitionModel) {
            this.store$.dispatch(updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: newDefinitionModel
            }));
        };
        ConfigDesignerComponent.prototype.onSelectedFieldModelChange = function (newSelectedFieldModel) {
            this.store$.dispatch(updateSelectedFieldModel({ selectedFieldModel: newSelectedFieldModel }));
        };
        ConfigDesignerComponent.prototype.validate = function (definitionModel) {
            var _this = this;
            var duplicateFieldErrorMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label') });
            var definitionValidationIssues = [];
            var fieldValidationIssueSections = [];
            lodash.chain(definitionModel.fields)
                .clone()
                .reverse()
                .forEach(function (fieldModel, index, fieldModels) {
                var issues = [];
                if (lodash.find(fieldModels, function (model) { return fieldModel.id === model.id; }, index + 1)) {
                    issues.push({
                        type: i4$1.ValidationIssueType.Error,
                        description: duplicateFieldErrorMsg,
                        data: {
                            propertyName: 'id',
                            guid: fieldModel.guid
                        }
                    });
                }
                if (!fieldModel.localeList[0].fieldGrouping) {
                    issues.push({
                        type: i4$1.ValidationIssueType.Error,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.config-designer.field-has-no-group.message'),
                        data: {
                            editFieldGroups: true,
                            guid: fieldModel.guid
                        }
                    });
                }
                issues = issues.concat(_this.fieldDefinitionManagerService.validate(fieldModel));
                if (issues.length) {
                    fieldValidationIssueSections.push({
                        title: fieldModel.id,
                        issues: issues
                    });
                }
            })
                .value();
            if (lodash.isEmpty(lodash.trim(definitionModel.componentName))) {
                definitionValidationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-name.label')
                    }),
                    data: {
                        propertyName: 'componentName'
                    }
                });
            }
            if (lodash.isEmpty(lodash.trim(definitionModel.componentLabel))) {
                definitionValidationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-label.label')
                    }),
                    data: {
                        propertyName: 'componentLabel'
                    }
                });
            }
            if (lodash.isNil(definitionModel.parentComponentName) &&
                (definitionModel.isSettingAccessibleInInnovationStudio || definitionModel.isSettingAccessibleInApplication) &&
                !definitionModel.firstMenu) {
                definitionValidationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.first-menu.label')
                    }),
                    data: {
                        propertyName: 'firstMenu'
                    }
                });
            }
            if (!definitionModel.fields.length) {
                definitionValidationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.setting-has-no-fields-error.message'),
                    data: { noFieldAdded: true }
                });
            }
            if (definitionModel.impactRowVisibility === i9.ImpactRowVisibility.User) {
                var keySettingsCount = lodash.filter(definitionModel.fields, { keySetting: true }).length;
                if (keySettingsCount > 1) {
                    definitionValidationIssues.push({
                        type: i4$1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.multiple-key-fields-not-allowed-error.message'),
                        data: {
                            propertyName: 'keySetting'
                        }
                    });
                }
            }
            if (!lodash.isNil(definitionModel.parentComponentName)) {
                var uniqFieldGroups = lodash.uniqBy(definitionModel.fields, 'localeList[0].fieldGrouping');
                if (uniqFieldGroups.length > 1) {
                    definitionValidationIssues.push({
                        type: i4$1.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.multiple-field-groups-not-allowed-error.message'),
                        data: {
                            propertyName: 'parentComponentName'
                        }
                    });
                }
            }
            var issues = [];
            if (definitionValidationIssues.length) {
                issues.push({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.title'),
                    issues: definitionValidationIssues
                });
            }
            issues = issues.concat(lodash.reverse(fieldValidationIssueSections));
            return issues;
        };
        ConfigDesignerComponent.prototype.addNewField = function (resourceType, isLoginNameField) {
            if (isLoginNameField === void 0) { isLoginNameField = false; }
            this.store$.dispatch(createNewFieldModel({ resourceType: resourceType, isLoginNameField: isLoginNameField }));
        };
        ConfigDesignerComponent.prototype.editFieldGroups = function () {
            this.store$.dispatch(editFieldGroups());
        };
        ConfigDesignerComponent.prototype.getDataTypeName = function (dataType) {
            return lodash.find(this.dataTypes, { dataType: dataType }).displayName;
        };
        ConfigDesignerComponent.prototype.onBreadcrumbSelected = function () {
            this.store$.dispatch(clearSelectedFieldGuid());
        };
        ConfigDesignerComponent.prototype.toggleDesignMode = function () {
            this.store$.dispatch(toggleDesignMode());
        };
        ConfigDesignerComponent.prototype.onSidebarToggle = function (event) {
            this.inspectorTabIndexSubject.next(event.id);
        };
        ConfigDesignerComponent.prototype.getDefinitionInspectorConfig = function (parentComponents, bundleFriendlyName, isApplication, definitionModel) {
            var _this = this;
            var configs = [];
            var generalControls = [];
            generalControls.push({
                name: 'componentName',
                component: i6.TextFormControlComponent,
                isDisabled: Boolean(this.configuration.definitionName),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-name.label'),
                    required: true
                }
            });
            if (lodash.isNil(definitionModel.parentComponentName)) {
                generalControls.push({
                    name: '',
                    component: i6.LabelFormControlComponent,
                    options: {
                        labelKey: 'com.bmc.arsys.rx.client.config-designer.config-properties.enable-access-from.label'
                    }
                });
                generalControls.push({
                    name: 'isSettingAccessibleInInnovationStudio',
                    component: i6.BooleanFormControlComponent,
                    options: {
                        label: 'Innovation Studio',
                        shouldDisplayAsCheckbox: true
                    }
                });
                if (isApplication) {
                    generalControls.push({
                        name: 'isSettingAccessibleInApplication',
                        component: i6.BooleanFormControlComponent,
                        options: {
                            label: bundleFriendlyName,
                            shouldDisplayAsCheckbox: true
                        }
                    });
                }
            }
            generalControls.push({
                name: 'componentLabel',
                component: i6.TextFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-label.label'),
                    required: true
                }
            });
            generalControls.push({
                name: 'supportsMultiple',
                component: i6.SwitchFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.repeat-setting.label')
                }
            });
            generalControls.push({
                name: 'parentComponentName',
                component: i6.SelectFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.parent-setting.label'),
                    options: parentComponents
                        .filter(function (componentName) { return componentName !== definitionModel.componentName; })
                        .map(function (item) { return ({ id: item, name: item }); }),
                    emptyOption: true
                }
            });
            if (lodash.isNil(definitionModel.parentComponentName) && definitionModel.supportsMultiple) {
                generalControls.push({
                    name: 'impactRowVisibility',
                    component: i6.SelectFormControlComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.visibility.label'),
                        options: [
                            {
                                id: i9.ImpactRowVisibility.None,
                                name: this.translateService.instant('com.bmc.arsys.rx.client.common.none.label')
                            },
                            {
                                id: i9.ImpactRowVisibility.User,
                                name: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.visibility.options.user.label')
                            }
                        ],
                        beforeValueChange: function (oldValue, newValue) {
                            if (newValue === i9.ImpactRowVisibility.User) {
                                var isLoginNameFieldExists = lodash.find(definitionModel.fields, {
                                    id: 'LoginName',
                                    dataType: api.RX_RECORD_DEFINITION.dataTypes.character.resourceType
                                });
                                if (!isLoginNameFieldExists) {
                                    setTimeout(function () {
                                        _this.addNewField(api.RX_RECORD_DEFINITION.dataTypes.character.resourceType, true);
                                    });
                                }
                            }
                            return Promise.resolve(true);
                        }
                    }
                });
            }
            if (definitionModel.impactRowVisibility !== i9.ImpactRowVisibility.User) {
                generalControls.push({
                    name: 'permissions',
                    component: i6.RxPermissionEditorComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.permissions.label'),
                        type: 'config',
                        permissionScope: i2.RX_PERMISSION.permissionScope.all
                    }
                });
            }
            configs.push({
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: generalControls
            });
            if (lodash.isNil(definitionModel.parentComponentName) &&
                (definitionModel.isSettingAccessibleInApplication || definitionModel.isSettingAccessibleInInnovationStudio)) {
                configs.push({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.navigation-section.label'),
                    controls: [
                        {
                            name: 'firstMenu',
                            component: i6.TextFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.first-menu.label'),
                                required: true
                            }
                        },
                        {
                            name: 'secondMenu',
                            component: i6.TextFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.second-menu.label')
                            }
                        }
                    ]
                });
            }
            return configs;
        };
        ConfigDesignerComponent.prototype.getBooleanDisplayValue = function (defaultValue) {
            if (defaultValue === 'true') {
                return this.trueLabel;
            }
            else if (defaultValue === 'false') {
                return this.falseLabel;
            }
            else {
                return null;
            }
        };
        ConfigDesignerComponent.prototype.deleteSelectedField = function () {
            this.store$.dispatch(deleteSelectedField());
        };
        ConfigDesignerComponent.prototype.onFormInitialized = function () {
            this.inspectorFocusEditorSubject.next({
                editorName: 'componentName',
                data: {}
            });
        };
        ConfigDesignerComponent.prototype.destroyConfigDesigner = function () {
            this.store$.dispatch(destroy());
        };
        ConfigDesignerComponent.prototype.ngOnDestroy = function () {
            this.inspectorTabIndexSubject.complete();
            this.inspectorFocusEditorSubject.complete();
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.destroyConfigDesigner();
        };
        return ConfigDesignerComponent;
    }());
    ConfigDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerComponent, deps: [{ token: i1__namespace$1.Store }, { token: ConfigDesignerService }, { token: i2__namespace.RxGlobalCacheService }, { token: i4__namespace.TranslateService }, { token: i2__namespace.RxDefinitionNameService }, { token: FieldDefinitionManagerService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ConfigDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigDesignerComponent, selector: "rx-config-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "adaptSidebarComponent", first: true, predicate: i7.AdaptSidebarComponent, descendants: true }, { propertyName: "createNewFieldDropdown", first: true, predicate: ["createNewFieldDropdown"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected()\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n  ></rx-designer-header>\n\n  <adapt-sidebar\n    [openedId]=\"0\"\n    [adjustMainContainerWidth]=\"true\"\n    position=\"right\"\n    class=\"h-100\"\n    [hidden]=\"vm.definitionForJsonViewer\"\n    (isPanelOpenedCurrently)=\"onSidebarToggle($event)\"\n  >\n    <adapt-sidebar-item\n      iconClass=\"d-icon-pencil\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.config-designer.config-properties.title.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.config-designer.config-properties.title.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.definitionInspectorConfig\"\n        [model]=\"vm.definitionModel\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n        (modelChange)=\"onDefinitionModelChange($event)\"\n        (formInitialized)=\"onFormInitialized()\"\n      ></rx-form-builder>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      iconClass=\"d-icon-gear\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.selectedFieldInspectorConfig\"\n        [model]=\"vm.selectedFieldModel\"\n        (modelChange)=\"onSelectedFieldModelChange($event)\"\n        [guid]=\"vm.selectedFieldGuid\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n      ></rx-form-builder>\n\n      <adapt-alert\n        [hidden]=\"vm.selectedFieldModel\"\n        class=\"p-3\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.designer.validation.no-field-selected.message' | translate,\n          variant: 'info',\n          type: 'inline'\n        }\"\n      ></adapt-alert>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n    >\n      <rx-validation-issues\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"vm.validationIssues\"\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.config-definition.label' | translate\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main h-100 d-flex flex-column\">\n      <h1 class=\"mt-0\">\n        {{ (configuration.definitionName | rxDefinitionNamePipe) || vm.definitionDisplayName || newTitle }}\n      </h1>\n\n      <section class=\"h-100 d-flex flex-column\">\n        <div class=\"d-flex border border-bottom-0\">\n          <div class=\"dropdown\" adaptDropdown #createNewFieldDropdown>\n            <button\n              adapt-button\n              adaptDropdownToggle\n              type=\"button\"\n              btn-type=\"tertiary\"\n              class=\"d-icon-plus_circle\"\n              rx-id=\"new-field-button\"\n            >\n              {{ 'com.bmc.arsys.rx.client.designer.new-field.button.label' | translate }}\n            </button>\n\n            <div class=\"dropdown-menu\" adaptDropdownMenu>\n              <button *ngFor=\"let dataType of dataTypes\" class=\"dropdown-item\" (click)=\"addNewField(dataType.dataType)\">\n                {{ dataType.displayName }}\n              </button>\n            </div>\n          </div>\n\n          <button\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            class=\"d-icon-list_ordered\"\n            (click)=\"editFieldGroups()\"\n            rx-id=\"edit-field-groups-button\"\n            [disabled]=\"!vm.fieldGridRows.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.config-designer.edit-field-groups.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            class=\"d-icon-trash\"\n            (click)=\"deleteSelectedField()\"\n            rx-id=\"delete-field-button\"\n            [disabled]=\"!vm.selectedFieldGridRows.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n          </button>\n        </div>\n\n        <adapt-table\n          [value]=\"vm.fieldGridRows\"\n          [selection]=\"vm.selectedFieldGridRows\"\n          [columns]=\"columns\"\n          [scrollable]=\"true\"\n          scrollHeight=\"flex\"\n          [sortable]=\"true\"\n          [resizableColumns]=\"false\"\n          [bordered]=\"true\"\n          [dataKey]=\"'guid'\"\n          [selectionMode]=\"'single'\"\n          (selectionChange)=\"onSelectionChange($event)\"\n        >\n        </adapt-table>\n      </section>\n    </div>\n  </adapt-sidebar>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper{border-top:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .card{border-left:0;border-right:0}\n"], components: [{ type: i6__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7__namespace.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7__namespace.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6__namespace.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i7__namespace.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i4__namespace$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7__namespace.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i7__namespace.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i10__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7__namespace.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7__namespace.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i10__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i10__namespace.AsyncPipe, "translate": i4__namespace.TranslatePipe, "rxDefinitionNamePipe": i2__namespace.RxDefinitionNamePipe, "json": i10__namespace.JsonPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-config-designer',
                        templateUrl: './config-designer.component.html',
                        styleUrls: ['./config-designer.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.Store }, { type: ConfigDesignerService }, { type: i2__namespace.RxGlobalCacheService }, { type: i4__namespace.TranslateService }, { type: i2__namespace.RxDefinitionNameService }, { type: FieldDefinitionManagerService }]; }, propDecorators: { adaptSidebarComponent: [{
                    type: i0.ViewChild,
                    args: [i7.AdaptSidebarComponent, { static: false }]
                }], createNewFieldDropdown: [{
                    type: i0.ViewChild,
                    args: ['createNewFieldDropdown', { static: false }]
                }], configuration: [{
                    type: i0.Input
                }], definitionSaved: [{
                    type: i0.Output
                }], definitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }] } });

    var initialModel = {
        componentLabel: null,
        componentName: null,
        externalLink: null,
        firstMenu: null,
        impactRowVisibility: i9.ImpactRowVisibility.None,
        isSettingAccessibleInApplication: false,
        isSettingAccessibleInInnovationStudio: false,
        parentComponentName: null,
        permissions: [],
        registeredModuleName: null,
        secondMenu: null,
        supportsMultiple: false,
        viewComponent: false,
        viewToOpen: null,
        fields: []
    };
    var initialState = {
        bundleId: null,
        definitionName: null,
        isDesignMode: true,
        inspectorTabIndex: 0,
        selectedFieldGuid: null,
        definitionModel: initialModel,
        definitionModelFromDefinition: initialModel,
        parentComponents: [],
        isDirty: false,
        savedDefinitionName: null
    };
    var reducer = i1.createReducer(initialState, i1.on(init, function (state, _a) {
        var payload = _a.payload;
        return (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }));
    }), i1.on(initDefinitionModel, function (state, _a) {
        var definitionModelFromDefinition = _a.definitionModelFromDefinition;
        return (Object.assign(Object.assign({}, state), { definitionModelFromDefinition: definitionModelFromDefinition, definitionModel: definitionModelFromDefinition }));
    }), i1.on(markDesignerPristine, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: false })); }), i1.on(markDesignerDirty, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); }), i1.on(loadParentComponentsSuccess, function (state, _a) {
        var parentComponents = _a.parentComponents;
        return (Object.assign(Object.assign({}, state), { parentComponents: parentComponents }));
    }), i1.on(setInspectorTabIndex, function (state, _a) {
        var inspectorTabIndex = _a.inspectorTabIndex;
        return (Object.assign(Object.assign({}, state), { inspectorTabIndex: inspectorTabIndex }));
    }), i1.on(setSelectedFieldGuid, function (state, _a) {
        var guid = _a.guid;
        return (Object.assign(Object.assign({}, state), { selectedFieldGuid: guid, inspectorTabIndex: guid && !lodash.isNull(state.inspectorTabIndex) ? 1 : state.inspectorTabIndex }));
    }), i1.on(clearSelectedFieldGuid, function (state) { return (Object.assign(Object.assign({}, state), { selectedFieldGuid: null, inspectorTabIndex: !lodash.isNull(state.inspectorTabIndex) ? 0 : state.inspectorTabIndex })); }), i1.on(toggleDesignMode, function (state) { return (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode })); }), i1.on(updateDefinitionModelFromDesigner, function (state, _a) {
        var definitionModelFromDesigner = _a.definitionModelFromDesigner;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }));
    }), i1.on(updateSelectedFieldModel, function (state, _a) {
        var selectedFieldModel = _a.selectedFieldModel;
        var definitionModel = lodash.cloneDeep(state.definitionModel);
        var fieldIndex = lodash.findIndex(definitionModel.fields, { guid: state.selectedFieldGuid });
        definitionModel.fields[fieldIndex] = selectedFieldModel;
        return Object.assign(Object.assign({}, state), { definitionModel: definitionModel });
    }), i1.on(addFieldModel, function (state, _a) {
        var newFieldModel = _a.newFieldModel;
        var definitionModel = lodash.cloneDeep(state.definitionModel);
        definitionModel.fields.push(newFieldModel);
        return Object.assign(Object.assign({}, state), { definitionModel: definitionModel });
    }), i1.on(deleteSelectedFieldSuccess, function (state) {
        var definitionModel = lodash.cloneDeep(state.definitionModel);
        lodash.remove(definitionModel.fields, { guid: state.selectedFieldGuid });
        return Object.assign(Object.assign({}, state), { definitionModel: definitionModel });
    }), i1.on(saveDefinitionSuccess, function (state, _a) {
        var savedDefinitionName = _a.savedDefinitionName;
        return (Object.assign(Object.assign({}, state), { savedDefinitionName: savedDefinitionName }));
    }), i1.on(destroy, function (state) { return (Object.assign({}, initialState)); }));
    function configDesignerModelReducer(state, action) {
        return reducer(state, action);
    }

    var FieldGroupsEditorStore = /** @class */ (function (_super) {
        __extends(FieldGroupsEditorStore, _super);
        function FieldGroupsEditorStore() {
            var _this = _super.call(this, { fields: [], isDirty: false, groups: [], selectedGroupName: null }) || this;
            _this.fields$ = _this.select(function (state) { return state.fields; });
            _this.groups$ = _this.select(function (state) { return state.groups; });
            _this.selectedGroupName$ = _this.select(function (state) { return state.selectedGroupName; });
            _this.availableFields$ = _this.select(_this.fields$, _this.selectedGroupName$, function (fields, selectedGroupName) { return fields
                .filter(function (field) { return field.groupName !== selectedGroupName; })
                .map(function (field, index) { return ({
                name: field.name,
                id: index,
                guid: field.guid,
                checked: field.checked
            }); }); });
            _this.checkedAvailableFields$ = _this.select(_this.availableFields$, function (fields) { return fields.filter(function (field) { return field.checked; }); });
            _this.selectedFields$ = _this.select(_this.fields$, _this.selectedGroupName$, function (fields, selectedGroupName) { return lodash.chain(fields)
                .filter(function (field) { return field.groupName === selectedGroupName; })
                .sortBy('fieldOrder')
                .map(function (field, index) { return ({
                name: field.name,
                id: index,
                guid: field.guid,
                selected: field.checked
            }); })
                .value(); });
            _this.checkedSelectedFields$ = _this.select(_this.selectedFields$, function (fields) { return fields.filter(function (field) { return field.selected; }); });
            _this.isDirty$ = _this.select(function (state) { return state.isDirty; });
            _this.vm$ = _this.select(_this.groups$, _this.fields$, _this.availableFields$, _this.checkedAvailableFields$, _this.selectedFields$, _this.checkedSelectedFields$, _this.isDirty$, function (groups, fields, availableFields, checkedAvailableFields, selectedFields, checkedSelectedFields, isDirty) { return ({
                groups: groups,
                fields: fields,
                availableFields: availableFields,
                checkedAvailableFields: checkedAvailableFields,
                selectedFields: selectedFields,
                checkedSelectedFields: checkedSelectedFields,
                isDirty: isDirty
            }); });
            _this.selectGroup = _this.updater(function (state, groupName) {
                var groups = state.groups.map(function (group) { return (Object.assign(Object.assign({}, group), { selected: group.name === groupName })); });
                return Object.assign(Object.assign({}, state), { groups: groups, selectedGroupName: groupName });
            });
            _this.markDirty = _this.updater(function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); });
            _this.checkField = _this.updater(function (state, guid) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return (field.guid === guid ? Object.assign(Object.assign({}, field), { checked: true }) : field); }) })); });
            _this.uncheckField = _this.updater(function (state, guid) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return (field.guid === guid ? Object.assign(Object.assign({}, field), { checked: false }) : field); }) })); });
            _this.sortSelectedFields = _this.updater(function (state, guids) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) {
                    var index = guids.indexOf(field.guid);
                    return index > -1 ? Object.assign(Object.assign({}, field), { fieldOrder: index }) : field;
                }) })); });
            _this.assignCheckedFields = _this.updater(function (state) {
                var selectedFields = state.fields.filter(function (field) { return field.groupName === state.selectedGroupName; });
                var fieldOrder = selectedFields.length;
                return Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return field.checked
                        ? Object.assign(Object.assign({}, field), { checked: false, groupName: state.selectedGroupName, fieldOrder: fieldOrder++ }) : field; }), isDirty: true });
            });
            _this.unassignCheckedFields = _this.updater(function (state) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return field.checked ? Object.assign(Object.assign({}, field), { checked: false, fieldOrder: null, groupName: null }) : field; }), isDirty: true })); });
            _this.removeField = _this.updater(function (state, guid) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return field.guid === guid ? Object.assign(Object.assign({}, field), { groupName: null, fieldOrder: null }) : field; }), isDirty: true })); });
            _this.removeGroup = _this.updater(function (state, groupName) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return field.groupName === groupName ? Object.assign(Object.assign({}, field), { groupName: null, fieldOrder: null }) : field; }), groups: lodash.reject(state.groups, { name: groupName }), isDirty: true })); });
            _this.renameGroup = _this.updater(function (state, group) { return (Object.assign(Object.assign({}, state), { fields: state.fields.map(function (field) { return field.groupName === group.oldName ? Object.assign(Object.assign({}, field), { groupName: group.newName }) : field; }), isDirty: true })); });
            return _this;
        }
        return FieldGroupsEditorStore;
    }(componentStore.ComponentStore));
    FieldGroupsEditorStore.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldGroupsEditorStore, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    FieldGroupsEditorStore.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldGroupsEditorStore });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldGroupsEditorStore, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var FieldGroupsEditorComponent = /** @class */ (function (_super) {
        __extends(FieldGroupsEditorComponent, _super);
        function FieldGroupsEditorComponent(fieldGroupsEditorStore, translateService, rxNotificationService, activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.fieldGroupsEditorStore = fieldGroupsEditorStore;
            _this.translateService = translateService;
            _this.rxNotificationService = rxNotificationService;
            _this.activeModalRef = activeModalRef;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.listBuilderTexts = {
                searchPlaceholder: _this.translateService.instant('com.bmc.arsys.rx.client.config-designer.field-groups-list.placeholder')
            };
            _this.duplicateGroupMsg = _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
            _this.itemValidation = function (itemName, items, isEdit) { return lodash.some(items, function (item) { return lodash.trim(item.name) === lodash.trim(itemName); }) ? _this.duplicateGroupMsg : null; };
            _this.vm$ = _this.fieldGroupsEditorStore.vm$;
            return _this;
        }
        FieldGroupsEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.fieldGroupsEditorStore.isDirty$.pipe(operators.filter(Boolean), operators.take(1)).subscribe(function () {
                _this.markAsDirty();
            });
            var fields = this.activeModalRef.getData().fields.map(function (field) { return ({
                guid: field.guid,
                name: field.id,
                groupName: field.localeList[0].fieldGrouping,
                fieldOrder: field.fieldOrder,
                checked: false
            }); });
            var groups = lodash.chain(fields)
                .map(function (field, index) { return ({ name: field.groupName, id: index, guid: field.guid }); })
                .filter(function (group) { return !!group.name; })
                .uniqBy('name')
                .sort(function (a, b) { return a.name.localeCompare(b.name); })
                .value();
            this.fieldGroupsEditorStore.patchState({ fields: fields, groups: groups });
        };
        FieldGroupsEditorComponent.prototype.onGroupChange = function (groups) {
            var _a;
            this.fieldGroupsEditorStore.selectGroup((_a = groups.find(function (field) { return field.selected; })) === null || _a === void 0 ? void 0 : _a.name);
        };
        FieldGroupsEditorComponent.prototype.onGroupAdd = function (addedGroup, groups) {
            groups.forEach(function (group) {
                group.selected = group === addedGroup;
            });
        };
        FieldGroupsEditorComponent.prototype.onGroupRemove = function (removedGroup) {
            this.fieldGroupsEditorStore.removeGroup(removedGroup.name);
        };
        FieldGroupsEditorComponent.prototype.onGroupRename = function (_b) {
            var _c = __read(_b, 2), oldGroup = _c[0], newGroup = _c[1];
            this.fieldGroupsEditorStore.renameGroup({ oldName: oldGroup.name, newName: newGroup.name });
        };
        FieldGroupsEditorComponent.prototype.onAvailableFieldsChange = function (checkedFields, availableFields) {
            var _this = this;
            availableFields.forEach(function (field) {
                if (lodash.some(checkedFields, { guid: field.guid })) {
                    _this.fieldGroupsEditorStore.checkField(field.guid);
                }
                else {
                    _this.fieldGroupsEditorStore.uncheckField(field.guid);
                }
            });
        };
        FieldGroupsEditorComponent.prototype.onSelectedFieldsChange = function (fields) {
            var _this = this;
            fields.forEach(function (field) {
                if (field.selected) {
                    _this.fieldGroupsEditorStore.checkField(field.guid);
                }
                else {
                    _this.fieldGroupsEditorStore.uncheckField(field.guid);
                }
            });
            this.fieldGroupsEditorStore.sortSelectedFields(fields.map(function (field) { return field.guid; }));
        };
        FieldGroupsEditorComponent.prototype.onDragEnd = function () {
            this.fieldGroupsEditorStore.markDirty();
        };
        FieldGroupsEditorComponent.prototype.moveToSelected = function () {
            this.fieldGroupsEditorStore.assignCheckedFields();
        };
        FieldGroupsEditorComponent.prototype.moveToAvailable = function () {
            this.fieldGroupsEditorStore.unassignCheckedFields();
        };
        FieldGroupsEditorComponent.prototype.onFieldRemove = function (removedField) {
            this.fieldGroupsEditorStore.removeField(removedField.guid);
        };
        FieldGroupsEditorComponent.prototype.alphabeticSort = function (a, b) {
            return a.name.localeCompare(b.name);
        };
        FieldGroupsEditorComponent.prototype.optionFormatter = function (field) {
            return field.name;
        };
        FieldGroupsEditorComponent.prototype.saveFieldGroups = function () {
            var _this = this;
            this.fieldGroupsEditorStore.fields$.pipe(operators.take(1)).subscribe(function (fields) {
                _this.activeModalRef.close({ fields: fields });
            });
        };
        FieldGroupsEditorComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i7.DismissReasons.CLOSE_BTN);
        };
        FieldGroupsEditorComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        return FieldGroupsEditorComponent;
    }(i4$1.RxModalClass));
    FieldGroupsEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldGroupsEditorComponent, deps: [{ token: FieldGroupsEditorStore }, { token: i4__namespace.TranslateService }, { token: i2__namespace.RxNotificationService }, { token: i7__namespace.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FieldGroupsEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldGroupsEditorComponent, selector: "rx-field-groups-editor", providers: [FieldGroupsEditorStore], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n    <div class=\"d-flex h-100 flex-fill\">\n      <adapt-rx-list-builder\n        class=\"flex-grow-1 mr-3\"\n        [ngModel]=\"vm.groups\"\n        selectionMode=\"single\"\n        (listItemAdd)=\"onGroupAdd($event, vm.groups)\"\n        (listItemRemove)=\"onGroupRemove($event)\"\n        (listItemUpdate)=\"onGroupRename($event)\"\n        (ngModelChange)=\"onGroupChange($event)\"\n        [customSort]=\"alphabeticSort\"\n        [hideListAreaLabel]=\"true\"\n        [texts]=\"listBuilderTexts\"\n        [itemValidation]=\"itemValidation\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.field-groups.label' | translate }}\"\n        rx-id=\"field-groups-list\"\n      ></adapt-rx-list-builder>\n\n      <adapt-rx-select\n        class=\"flex-grow-1 h-100 d-flex flex-column\"\n        popupMaxHeight=\"100%\"\n        [options]=\"vm.availableFields\"\n        [ngModel]=\"vm.checkedAvailableFields\"\n        [deselectAllButton]=\"true\"\n        [selectAllButton]=\"true\"\n        [enableFilter]=\"true\"\n        [inline]=\"true\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.available-fields.label' | translate }}\"\n        [multiple]=\"true\"\n        [singleSelectStyle]=\"'marker'\"\n        [optionFormatter]=\"optionFormatter\"\n        (ngModelChange)=\"onAvailableFieldsChange($event, vm.availableFields)\"\n        rx-id=\"available-fields-list\"\n      ></adapt-rx-select>\n\n      <div class=\"mx-2 d-flex flex-column\">\n        <button\n          type=\"button\"\n          adapt-button\n          class=\"d-icon-right-angle_right mt-auto mb-2\"\n          btn-type=\"secondary\"\n          (click)=\"moveToSelected()\"\n          [disabled]=\"!vm.checkedAvailableFields.length\"\n          rx-id=\"move-to-selected-button\"\n        ></button>\n\n        <button\n          type=\"button\"\n          adapt-button\n          class=\"d-icon-right-angle_left mb-auto\"\n          btn-type=\"secondary\"\n          (click)=\"moveToAvailable()\"\n          [disabled]=\"!vm.checkedSelectedFields.length\"\n          rx-id=\"move-to-available-button\"\n        ></button>\n      </div>\n\n      <adapt-rx-list-builder\n        class=\"flex-grow-1\"\n        [ngModel]=\"vm.selectedFields\"\n        selectionMode=\"multiple\"\n        (listItemRemove)=\"onFieldRemove($event)\"\n        [hideSearchField]=\"true\"\n        [hideListAreaLabel]=\"true\"\n        [hideEdit]=\"true\"\n        (ngModelChange)=\"onSelectedFieldsChange($event)\"\n        (dragend)=\"onDragEnd()\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.selected-fields.label' | translate }}\"\n        rx-id=\"selected-fields-list\"\n      ></adapt-rx-list-builder>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      rx-id=\"save-field-groups-button\"\n      (click)=\"saveFieldGroups()\"\n      [disabled]=\"!vm.isDirty\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host ::ng-deep adapt-rx-select{width:30%;overflow:auto}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto}:host ::ng-deep adapt-rx-list-builder{overflow:auto;width:30%}:host ::ng-deep adapt-rx-list-builder .adapt-list-builder{height:100%}:host ::ng-deep adapt-rx-list-builder .adapt-list-container{flex-grow:1}:host ::ng-deep adapt-rx-list-builder .adapt-list-builder,:host ::ng-deep adapt-rx-list-builder .adapt-list-builder__wrp{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i7__namespace.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }, { type: i7__namespace.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i10__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i10__namespace.AsyncPipe, "translate": i4__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: FieldGroupsEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-field-groups-editor',
                        templateUrl: './field-groups-editor.component.html',
                        styleUrls: ['./field-groups-editor.component.scss'],
                        providers: [FieldGroupsEditorStore]
                    }]
            }], ctorParameters: function () { return [{ type: FieldGroupsEditorStore }, { type: i4__namespace.TranslateService }, { type: i2__namespace.RxNotificationService }, { type: i7__namespace.ActiveModalRef }, { type: i0__namespace.Injector }]; } });

    var ConfigDesignerEffects = /** @class */ (function () {
        function ConfigDesignerEffects(store$, actions$, errorHandler, configDesignerService, rxModalService, rxNotificationService, translateService, fieldDefinitionManagerService, rxGuidService, rxConfigDefinitionService, rxGlobalCacheService, rxDefinitionNameService) {
            var _this = this;
            this.store$ = store$;
            this.actions$ = actions$;
            this.errorHandler = errorHandler;
            this.configDesignerService = configDesignerService;
            this.rxModalService = rxModalService;
            this.rxNotificationService = rxNotificationService;
            this.translateService = translateService;
            this.fieldDefinitionManagerService = fieldDefinitionManagerService;
            this.rxGuidService = rxGuidService;
            this.rxConfigDefinitionService = rxConfigDefinitionService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.initConfigDesigner$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(init), operators.map(function (action) { return loadParentComponents(); })); });
            this.loadParentComponents$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadParentComponents), operators.switchMap(function () { return _this.rxConfigDefinitionService.getComponents(); }), operators.map(function (parentComponents) { return loadParentComponentsSuccess({ parentComponents: parentComponents }); })); });
            this.setParentComponents$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadParentComponentsSuccess), operators.map(function () { return loadDefinition(); })); });
            this.loadDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinition), operators.withLatestFrom(_this.store$.select(bundleIdSelector)), operators.switchMap(function (_d) {
                var _e = __read(_d, 2), _ = _e[0], bundleId = _e[1];
                return _this.rxGlobalCacheService.getBundleDescriptor(bundleId);
            }), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.switchMap(function (_d) {
                var _e = __read(_d, 2), bundleDescriptor = _e[0], definitionName = _e[1];
                return definitionName
                    ? _this.rxConfigDefinitionService.get(_this.rxDefinitionNameService.getDisplayName(definitionName))
                    : _this.rxConfigDefinitionService.getNew(bundleDescriptor.isApplication);
            }), operators.map(function (definition) { return loadDefinitionSuccess({
                definition: definition
            }); })); });
            this.loadDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinitionSuccess), operators.map(function (action) {
                var definitionModelFromDefinition = {
                    externalLink: action.definition.externalLink,
                    impactRowVisibility: action.definition.impactRowVisibility,
                    parentComponentName: action.definition.parentComponentName,
                    registeredModuleName: action.definition.registeredModuleName,
                    supportsMultiple: action.definition.supportsMultiple,
                    viewComponent: action.definition.viewComponent,
                    viewToOpen: action.definition.viewToOpen,
                    componentName: action.definition.componentName,
                    permissions: action.definition.permissions,
                    componentLabel: action.definition.localeList[0].componentLabel,
                    firstMenu: action.definition.localeList[0].firstMenu,
                    secondMenu: action.definition.localeList[0].secondMenu,
                    isSettingAccessibleInInnovationStudio: action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.innovationStudio.value ||
                        action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.both.value,
                    isSettingAccessibleInApplication: action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.application.value ||
                        action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.both.value,
                    fields: action.definition.settingMetaData.map(function (field) {
                        var _a, _b, _c;
                        return ({
                            dataType: field.dataType,
                            defaultValue: (_a = field.defaultValue) !== null && _a !== void 0 ? _a : null,
                            fieldOrder: field.fieldOrder,
                            id: field.id,
                            keySetting: field.keySetting,
                            localeList: field.localeList,
                            guid: _this.rxGuidService.generate(),
                            maxValue: (_b = field.maxValue) !== null && _b !== void 0 ? _b : null,
                            minValue: (_c = field.minValue) !== null && _c !== void 0 ? _c : null,
                            selectionFieldOptionProperties: {
                                defaultValue: field.defaultValue,
                                optionNamesById: field.optionNamesById,
                                optionLabelsById: field.optionLabelsById
                            },
                            required: field.required,
                            settingLabel: field.localeList[0].settingLabel,
                            isNew: false
                        });
                    })
                };
                return initDefinitionModel({
                    definitionModelFromDefinition: definitionModelFromDefinition
                });
            })); });
            this.markPristine$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(initDefinitionModel, saveDefinition, saveDefinitionSuccess), operators.map(function () { return markDesignerPristine(); })); });
            this.clearSelectedField$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(initDefinitionModel, deleteSelectedFieldSuccess), operators.map(function () { return clearSelectedFieldGuid(); })); });
            this.markDirty$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(updateDefinitionModelFromDesigner, updateSelectedFieldModel, addFieldModel, deleteSelectedFieldSuccess, saveDefinitionError), operators.map(function () { return markDesignerDirty(); })); });
            this.createNewFieldModel$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(createNewFieldModel), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.map(function (_d) {
                var _e = __read(_d, 2), action = _e[0], definitionModel = _e[1];
                var newFieldName;
                var fieldNameSuffix = 0;
                var defaultFieldName = _this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label');
                do {
                    newFieldName = defaultFieldName + " " + ++fieldNameSuffix;
                } while (lodash.some(definitionModel.fields, { id: newFieldName }));
                var guid = _this.rxGuidService.generate();
                var newFieldModel = _this.fieldDefinitionManagerService.getNewFieldDefinitionModel(action.resourceType, {
                    id: action.isLoginNameField ? 'LoginName' : newFieldName,
                    isNew: true,
                    guid: guid,
                    keySetting: action.isLoginNameField,
                    settingLabel: action.isLoginNameField
                        ? _this.translateService.instant('com.bmc.arsys.rx.client.config-designer.login-name-field.label')
                        : newFieldName,
                    minValue: null,
                    maxValue: null,
                    selectionFieldOptionProperties: action.resourceType === api.RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? { defaultValue: null, optionNamesById: null, optionLabelsById: null }
                        : null
                });
                return addFieldModel({ newFieldModel: newFieldModel });
            })); });
            this.addNewFieldModel$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(addFieldModel), operators.map(function (action) { return setSelectedFieldGuid({ guid: action.newFieldModel.guid }); })); });
            this.editFieldGroups$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(editFieldGroups), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.switchMap(function (_d) {
                var _e = __read(_d, 2), _ = _e[0], definitionModel = _e[1];
                return rxjs.from(_this.rxModalService
                    .openModal({
                    title: _this.translateService.instant('com.bmc.arsys.rx.client.config-designer.edit-field-groups.label'),
                    content: FieldGroupsEditorComponent,
                    data: { fields: definitionModel.fields },
                    size: api$1.OpenViewActionModalSize.Large
                })
                    .catch(lodash.noop));
            }), operators.filter(Boolean), operators.withLatestFrom(_this.store$.select(definitionModelSelector)), operators.map(function (_d) {
                var _e = __read(_d, 2), response = _e[0], definitionModel = _e[1];
                var fields = definitionModel.fields.map(function (field) {
                    var updatedField = response.fields.find(function (item) { return item.guid === field.guid; });
                    return Object.assign(Object.assign({}, field), { fieldOrder: updatedField.fieldOrder, localeList: [
                            Object.assign(Object.assign({}, field.localeList[0]), { fieldGrouping: updatedField.groupName })
                        ] });
                });
                return updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { fields: fields })
                });
            })); });
            this.deleteSelectedField$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(deleteSelectedField), operators.switchMap(function () { return rxjs.from(_this.rxModalService.confirm({
                title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i4$1.RX_MODAL.modalStyles.warning,
                message: _this.translateService.instant('com.bmc.arsys.rx.client.designer.delete-fields-warning.message')
            })); }), operators.filter(Boolean), operators.map(function () { return deleteSelectedFieldSuccess(); })); });
            this.saveDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinition), operators.withLatestFrom(_this.store$.select(definitionModelFromDefinitionSelector), _this.store$.select(definitionModelSelector), _this.store$.select(definitionNameSelector), _this.store$.select(bundleIdSelector)), operators.switchMap(function (_d) {
                var _e = __read(_d, 5), action = _e[0], definitionModelFromDefinition = _e[1], definitionModel = _e[2], definitionName = _e[3], bundleId = _e[4];
                var definition = _this.configDesignerService.getDefinitionFromDefinitionModel(definitionModel);
                if (!definitionName) {
                    return _this.rxConfigDefinitionService.create(definition).pipe(operators.map(function (response) { return saveDefinitionSuccess({
                        savedDefinitionName: bundleId + ":" + definitionModel.componentName
                    }); }), operators.catchError(function (error) {
                        _this.errorHandler.handleError(error);
                        return rxjs.of(saveDefinitionError());
                    }));
                }
                else if (definitionModelFromDefinition.impactRowVisibility !== definitionModel.impactRowVisibility ||
                    definitionModelFromDefinition.parentComponentName !== definitionModel.parentComponentName ||
                    definitionModelFromDefinition.supportsMultiple !== definitionModel.supportsMultiple) {
                    return rxjs.from(_this.rxModalService.confirm({
                        title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                        modalStyle: i4$1.RX_MODAL.modalStyles.warning,
                        message: _this.translateService.instant('com.bmc.arsys.rx.client.config-designer.setting-data-will-be-deleted-warning.message')
                    })).pipe(operators.filter(Boolean), operators.map(function () { return updateDefinition({ definition: definition }); }));
                }
                else {
                    return [updateDefinition({ definition: definition })];
                }
            })); });
            this.updateDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(updateDefinition), operators.switchMap(function (action) { return _this.rxConfigDefinitionService.update(action.definition.componentName, action.definition).pipe(operators.map(function (response) { return saveDefinitionSuccess({
                savedDefinitionName: "" + action.definition.componentName
            }); }), operators.catchError(function (error) {
                _this.errorHandler.handleError(error);
                return rxjs.of(saveDefinitionError());
            })); })); });
            this.saveDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinitionSuccess), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.tap(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                    definitionTypeDisplayName: _this.translateService.instant('com.bmc.arsys.rx.client.config-definition.label')
                }));
            }), operators.filter(function (_d) {
                var _e = __read(_d, 2), _ = _e[0], definitionName = _e[1];
                return !!definitionName;
            }), operators.map(function () { return loadDefinition(); })); });
        }
        return ConfigDesignerEffects;
    }());
    ConfigDesignerEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerEffects, deps: [{ token: i1__namespace$1.Store }, { token: i2__namespace$1.Actions }, { token: i0__namespace.ErrorHandler }, { token: ConfigDesignerService }, { token: i4__namespace$1.RxModalService }, { token: i2__namespace.RxNotificationService }, { token: i4__namespace.TranslateService }, { token: FieldDefinitionManagerService }, { token: i1__namespace.RxGuidService }, { token: i9__namespace$1.RxConfigDefinitionService }, { token: i2__namespace.RxGlobalCacheService }, { token: i2__namespace.RxDefinitionNameService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ConfigDesignerEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerEffects });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$1.Store }, { type: i2__namespace$1.Actions }, { type: i0__namespace.ErrorHandler }, { type: ConfigDesignerService }, { type: i4__namespace$1.RxModalService }, { type: i2__namespace.RxNotificationService }, { type: i4__namespace.TranslateService }, { type: FieldDefinitionManagerService }, { type: i1__namespace.RxGuidService }, { type: i9__namespace$1.RxConfigDefinitionService }, { type: i2__namespace.RxGlobalCacheService }, { type: i2__namespace.RxDefinitionNameService }]; } });

    var ConfigDesignerModule = /** @class */ (function () {
        function ConfigDesignerModule() {
        }
        return ConfigDesignerModule;
    }());
    ConfigDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ConfigDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerModule, declarations: [ConfigDesignerComponent, FieldGroupsEditorComponent], imports: [i7.AdaptAccordionModule,
            i7.AdaptButtonModule,
            i7.AdaptDropdownModule,
            i7.AdaptRxTextfieldModule,
            components.RecordGridModule,
            i10.CommonModule,
            i6$1.FormsModule,
            i6.FormControlsModule,
            i6.RxDesignerHeaderModule,
            i4$1.RxBladeModule,
            i4$1.RxValidationIssuesModule,
            i4$1.RxJsonViewerModule,
            i6.RxFormBuilderModule,
            i7.AdaptRxCheckboxModule,
            i7.AdaptRxLabelModule,
            i4.TranslateModule,
            components.RecordGridModule,
            api.RxRecordDefinitionResourceTypePipeModule,
            i7.AdaptAlertModule,
            i4$1.RxLineLoaderModule,
            i9$1.AdaptTableModule,
            i6$1.ReactiveFormsModule,
            i6.RxDefinitionPickerModule,
            i7.AdaptRxRadiobuttonModule,
            i7.AdaptRxSelectModule,
            i6.ExpressionFormControlModule,
            i7.AdaptBusyModule,
            i7.AdaptRxCounterModule,
            i7.AdaptCodeViewerModule,
            i7.AdaptSidebarModule,
            i2.RxDefinitionModule,
            i7.AdaptRxListBuilderModule, i1__namespace$1.StoreFeatureModule, i2__namespace$1.EffectsFeatureModule], exports: [ConfigDesignerComponent] });
    ConfigDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerModule, imports: [[
                i7.AdaptAccordionModule,
                i7.AdaptButtonModule,
                i7.AdaptDropdownModule,
                i7.AdaptRxTextfieldModule,
                components.RecordGridModule,
                i10.CommonModule,
                i6$1.FormsModule,
                i6.FormControlsModule,
                i6.RxDesignerHeaderModule,
                i4$1.RxBladeModule,
                i4$1.RxValidationIssuesModule,
                i4$1.RxJsonViewerModule,
                i6.RxFormBuilderModule,
                i7.AdaptRxCheckboxModule,
                i7.AdaptRxLabelModule,
                i4.TranslateModule,
                components.RecordGridModule,
                api.RxRecordDefinitionResourceTypePipeModule,
                i7.AdaptAlertModule,
                i4$1.RxLineLoaderModule,
                i9$1.AdaptTableModule,
                i6$1.ReactiveFormsModule,
                i6.RxDefinitionPickerModule,
                i7.AdaptRxRadiobuttonModule,
                i7.AdaptRxSelectModule,
                i6.ExpressionFormControlModule,
                i7.AdaptBusyModule,
                i7.AdaptRxCounterModule,
                i7.AdaptCodeViewerModule,
                i7.AdaptSidebarModule,
                i2.RxDefinitionModule,
                i7.AdaptRxListBuilderModule,
                i1.StoreModule.forFeature(RX_CONFIG_DESIGNER.featureSelector, {
                    model: configDesignerModelReducer
                }),
                i2$1.EffectsModule.forFeature([ConfigDesignerEffects])
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ConfigDesignerComponent, FieldGroupsEditorComponent],
                        exports: [ConfigDesignerComponent],
                        imports: [
                            i7.AdaptAccordionModule,
                            i7.AdaptButtonModule,
                            i7.AdaptDropdownModule,
                            i7.AdaptRxTextfieldModule,
                            components.RecordGridModule,
                            i10.CommonModule,
                            i6$1.FormsModule,
                            i6.FormControlsModule,
                            i6.RxDesignerHeaderModule,
                            i4$1.RxBladeModule,
                            i4$1.RxValidationIssuesModule,
                            i4$1.RxJsonViewerModule,
                            i6.RxFormBuilderModule,
                            i7.AdaptRxCheckboxModule,
                            i7.AdaptRxLabelModule,
                            i4.TranslateModule,
                            components.RecordGridModule,
                            api.RxRecordDefinitionResourceTypePipeModule,
                            i7.AdaptAlertModule,
                            i4$1.RxLineLoaderModule,
                            i9$1.AdaptTableModule,
                            i6$1.ReactiveFormsModule,
                            i6.RxDefinitionPickerModule,
                            i7.AdaptRxRadiobuttonModule,
                            i7.AdaptRxSelectModule,
                            i6.ExpressionFormControlModule,
                            i7.AdaptBusyModule,
                            i7.AdaptRxCounterModule,
                            i7.AdaptCodeViewerModule,
                            i7.AdaptSidebarModule,
                            i2.RxDefinitionModule,
                            i7.AdaptRxListBuilderModule,
                            i1.StoreModule.forFeature(RX_CONFIG_DESIGNER.featureSelector, {
                                model: configDesignerModelReducer
                            }),
                            i2$1.EffectsModule.forFeature([ConfigDesignerEffects])
                        ]
                    }]
            }] });

    var ConfigDesignerPageComponent = /** @class */ (function () {
        function ConfigDesignerPageComponent(activatedRoute, rxBundleCacheService, rxDefinitionNameService, rxUtilityModalsService, rxPageTitleService, router, translateService, rxComponentCanDeactivateGuard) {
            this.activatedRoute = activatedRoute;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxPageTitleService = rxPageTitleService;
            this.router = router;
            this.translateService = translateService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.isInitialized = false;
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        ConfigDesignerPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            this.activatedRoute.params.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (_c) {
                var definitionName = _c.definitionName, bundleId = _c.bundleId;
                _this.rxBundleCacheService.bundleId = bundleId || _this.rxDefinitionNameService.getBundleId(definitionName);
                _this.isInitialized = true;
                _this.isNewConfig = !definitionName;
                _this.configuration = Object.assign(Object.assign({}, _this.configuration), { definitionName: definitionName, bundleId: _this.rxBundleCacheService.bundleId });
                _this.rxPageTitleService.set([
                    _this.rxDefinitionNameService.getDisplayName(definitionName),
                    _this.translateService.instant('com.bmc.arsys.rx.client.config-designer.title')
                ]);
            });
        };
        ConfigDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        ConfigDesignerPageComponent.prototype.onDefinitionSaved = function (definitionName) {
            if (this.isNewConfig) {
                this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        ConfigDesignerPageComponent.prototype.onDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        ConfigDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i2.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                'config-definitions'
            ]);
        };
        ConfigDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.configDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        ConfigDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        return ConfigDesignerPageComponent;
    }());
    ConfigDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerPageComponent, deps: [{ token: i1__namespace$2.ActivatedRoute }, { token: i2__namespace.RxBundleCacheService }, { token: i2__namespace.RxDefinitionNameService }, { token: i4__namespace$1.RxUtilityModalsService }, { token: i2__namespace.RxPageTitleService }, { token: i1__namespace$2.Router }, { token: i4__namespace.TranslateService }, { token: i2__namespace.RxComponentCanDeactivateGuard }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ConfigDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigDesignerPageComponent, selector: "rx-config-designer-page", viewQueries: [{ propertyName: "configDesignerComponent", first: true, predicate: ConfigDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-config-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-config-designer>\n", components: [{ type: ConfigDesignerComponent, selector: "rx-config-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i10__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-config-designer-page',
                        templateUrl: './config-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.ActivatedRoute }, { type: i2__namespace.RxBundleCacheService }, { type: i2__namespace.RxDefinitionNameService }, { type: i4__namespace$1.RxUtilityModalsService }, { type: i2__namespace.RxPageTitleService }, { type: i1__namespace$2.Router }, { type: i4__namespace.TranslateService }, { type: i2__namespace.RxComponentCanDeactivateGuard }]; }, propDecorators: { configDesignerComponent: [{
                    type: i0.ViewChild,
                    args: [ConfigDesignerComponent]
                }] } });

    var ConfigDesignerPageModule = /** @class */ (function () {
        function ConfigDesignerPageModule() {
        }
        return ConfigDesignerPageModule;
    }());
    ConfigDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ConfigDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerPageModule, declarations: [ConfigDesignerPageComponent], imports: [i10.CommonModule, ConfigDesignerModule], exports: [ConfigDesignerPageComponent] });
    ConfigDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerPageModule, imports: [[i10.CommonModule, ConfigDesignerModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ConfigDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ConfigDesignerPageComponent],
                        exports: [ConfigDesignerPageComponent],
                        imports: [i10.CommonModule, ConfigDesignerModule]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConfigDesignerComponent = ConfigDesignerComponent;
    exports.ConfigDesignerModule = ConfigDesignerModule;
    exports.ConfigDesignerPageComponent = ConfigDesignerPageComponent;
    exports.ConfigDesignerPageModule = ConfigDesignerPageModule;
    exports.RX_CONFIG_DESIGNER = RX_CONFIG_DESIGNER;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-config-designer.umd.js.map
