(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/shared/api'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('@helix/platform/view/api'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@ngrx/store'), require('@ngrx/effects'), require('@helix/platform/utils'), require('@helix/platform/record/api'), require('@ngx-translate/core'), require('@angular/forms'), require('@angular/common'), require('@helix/platform/named-list/api'), require('@angular/cdk/drag-drop'), require('@helix/platform/association/api'), require('@helix/platform/process/api'), require('@bmc-ux/adapt-angular'), require('@bmc-ux/obsolete')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/view/designer', ['exports', '@angular/core', '@helix/platform/shared/api', '@helix/platform/shared/components', '@helix/platform/ui-kit', '@helix/platform/view/api', 'lodash', 'rxjs', 'rxjs/operators', '@ngrx/store', '@ngrx/effects', '@helix/platform/utils', '@helix/platform/record/api', '@ngx-translate/core', '@angular/forms', '@angular/common', '@helix/platform/named-list/api', '@angular/cdk/drag-drop', '@helix/platform/association/api', '@helix/platform/process/api', '@bmc-ux/adapt-angular', '@bmc-ux/obsolete'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.view = global.helix.platform.view || {}, global.helix.platform.view.designer = {}), global.ng.core, global.helix.platform.shared.api, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.helix.platform.view.api, global.lodash, global.rxjs, global.rxjs.operators, global.ngrxStore, global.ngrxEffects, global.helix.platform.utils, global.helix.platform.record.api, global.ngxTranslateCore, global.ng.forms, global.ng.common, global.helix.platform["named-list"].api, global.ng.cdk.dragDrop, global.helix.platform.association.api, global.helix.platform.process.api, global.adaptAngular, global.obsolete));
})(this, (function (exports, i0, i3, i3$1, i5$1, i5, lodash, rxjs, operators, i2, i1, i2$1, i11, i6, i3$2, i4, i4$2, i4$1, i12, i13, i3$3, obsolete) { 'use strict';

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
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);
    var i5__namespace$1 = /*#__PURE__*/_interopNamespace(i5$1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i11__namespace = /*#__PURE__*/_interopNamespace(i11);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i3__namespace$2 = /*#__PURE__*/_interopNamespace(i3$2);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i4__namespace$2 = /*#__PURE__*/_interopNamespace(i4$2);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i12__namespace = /*#__PURE__*/_interopNamespace(i12);
    var i13__namespace = /*#__PURE__*/_interopNamespace(i13);
    var i3__namespace$3 = /*#__PURE__*/_interopNamespace(i3$3);

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

    function validateCssClassName(tag) {
        return !/^[a-z][-\w]+$/gi.test(lodash.isObject(tag) ? tag.data.value : tag);
    }
    function validateCssClassNames(styles) {
        var validationIssues = [];
        if (styles) {
            var tags = styles.split(' ');
            if (tags.some(validateCssClassName)) {
                validationIssues.push({
                    type: 'error',
                    propertyName: 'styles',
                    description: 'CSS class name is invalid.'
                });
            }
        }
        return validationIssues;
    }
    function validateAvailableOnDevicesProp(value) {
        var validationIssues = [];
        if (!(value === null || value === void 0 ? void 0 : value.length)) {
            validationIssues.push({
                type: 'error',
                propertyName: i5.RX_AVAILABLE_ON_DEVICES_PROP_NAME,
                description: 'At least one device must be selected.'
            });
        }
        return validationIssues;
    }
    function validateStandardProps(model) {
        return __spreadArray(__spreadArray([], __read(validateCssClassNames(model[i5.RX_STYLES_PROP_NAME]))), __read(validateAvailableOnDevicesProp(model[i5.RX_AVAILABLE_ON_DEVICES_PROP_NAME])));
    }

    function findParentComponentModel(guid, components) {
        var currentComponent = components[guid];
        return components[currentComponent === null || currentComponent === void 0 ? void 0 : currentComponent.parentGuid];
    }
    function findAllParentComponentGuids(guid, components) {
        var result = [guid];
        var parentModel = findParentComponentModel(guid, components);
        var nextGuid = parentModel ? parentModel.guid : null;
        while (nextGuid) {
            result.unshift(nextGuid);
            parentModel = findParentComponentModel(nextGuid, components);
            nextGuid = parentModel ? parentModel.guid : null;
        }
        return result;
    }
    function findParentComponentByType(guid, componentType, components) {
        var result;
        var parentModel = findParentComponentModel(guid, components);
        var nextGuid = parentModel ? parentModel.guid : null;
        while (nextGuid) {
            if (parentModel.type === componentType) {
                result = parentModel;
                nextGuid = null;
            }
            else {
                parentModel = findParentComponentModel(nextGuid, components);
                nextGuid = parentModel ? parentModel.guid : null;
            }
        }
        return result;
    }
    function isComponentContainsChild(guid, componentModel) {
        if (componentModel.layout) {
            var hasChild = i5.RxViewLayout.hasChild(componentModel.layout, guid);
            if (hasChild) {
                return true;
            }
        }
        if (componentModel.childDataComponentGuids) {
            return lodash.includes(componentModel.childDataComponentGuids, guid);
        }
        else {
            return false;
        }
    }
    function addChildComponent(componentModel, guid, outletName, insertIndex, columnIndex, columnSpan) {
        if (columnIndex === void 0) { columnIndex = 0; }
        if (columnSpan === void 0) { columnSpan = 0; }
        var newComponentModel = Object.assign({}, componentModel);
        newComponentModel.layout = {
            outlets: componentModel.layout.outlets.map(function (outlet) {
                if (outlet.name === outletName) {
                    var columns = __spreadArray([], __read(outlet.columns));
                    insertIndex = isFinite(insertIndex) ? insertIndex : columns[columnIndex].children.length;
                    if (!columns[columnIndex]) {
                        columns[columnIndex] = {
                            children: []
                        };
                        if (columnSpan) {
                            columns[columnIndex].span = columnSpan;
                        }
                    }
                    // todo handle drop in non-first column
                    columns[columnIndex] = {
                        children: __spreadArray(__spreadArray(__spreadArray([], __read(columns[columnIndex].children.slice(0, insertIndex))), [
                            guid
                        ]), __read(columns[columnIndex].children.slice(insertIndex))),
                        span: columns[columnIndex].span
                    };
                    return Object.assign(Object.assign({}, outlet), { columns: columns });
                }
                else {
                    return outlet;
                }
            })
        };
        return newComponentModel;
    }
    function removeChildComponent(componentGuidToRemove, parentComponentModel) {
        var newParentComponentModel = Object.assign({}, parentComponentModel);
        if (lodash.some(newParentComponentModel.childDataComponentGuids, function (guid) { return componentGuidToRemove === guid; })) {
            newParentComponentModel.childDataComponentGuids = newParentComponentModel.childDataComponentGuids.filter(function (guid) { return guid !== componentGuidToRemove; });
        }
        if (parentComponentModel.layout && i5.RxViewLayout.hasChild(parentComponentModel.layout, componentGuidToRemove)) {
            newParentComponentModel.layout = i5.RxViewLayout.removeChildFromLayout(parentComponentModel.layout, componentGuidToRemove);
        }
        return newParentComponentModel;
    }
    function getChildGuidsFromModel(model) {
        var guids = [];
        if (model.childDataComponentGuids) {
            guids.push.apply(guids, __spreadArray([], __read(model.childDataComponentGuids)));
        }
        if (model.layout) {
            guids.push.apply(guids, __spreadArray([], __read(i5.RxViewLayout.getViewLayoutChildGuids(model.layout))));
        }
        return lodash.uniq(guids);
    }
    function getAllChildGuids(parentComponent, componentModelsState) {
        var guids = getChildGuidsFromModel(parentComponent);
        return guids.reduce(function (result, guid) {
            result.push.apply(result, __spreadArray([], __read(getAllChildGuids(componentModelsState[guid], componentModelsState))));
            return result;
        }, guids);
    }

    var componentsRemoved = i2.createAction('[View Component] Components Removed', i2.props());
    var initializeComponentModels = i2.createAction('[View Component] Initialize Component Models', i2.props());
    var initializeDataComponentModels = i2.createAction('[View Component] Initialize Data Component Models', i2.props());
    var setValidationIssues = i2.createAction('[View Component] Set Validation Issues', i2.props());
    var setExpressionValidationIssues = i2.createAction('[View Component] Set Expression Validation Issues', i2.props());
    var setComponentData = i2.createAction('[View Component] Set Component Properties', i2.props());
    var setChildComponents = i2.createAction('[View Component] Set Child Components', i2.props());
    var setBreadcrumbs = i2.createAction('[View Component] Set Breadcrumbs', i2.props());
    var selectComponent = i2.createAction('[View Component] Select Component', i2.props());
    var setComponentLayout = i2.createAction('[View Component] Set Component Layout', i2.props());
    var moveComponent = i2.createAction('[View Component] Move Component', i2.props());
    var insertComponent = i2.createAction('[View Component] Insert Component', i2.props());
    var addNewComponents = i2.createAction('[View Component] Add New Components', i2.props());
    var updateComponentModel = i2.createAction('[View Component] Update Component Model', i2.props());
    var removeComponents = i2.createAction('[View Component] Remove Components', i2.props());

    var viewDefinitionSaveSuccess = i2.createAction('[View Designer] View Definition Save Success', i2.props());
    var viewDefinitionSaveError = i2.createAction('[View Designer] View Definition Save Error');
    var viewDefinitionLoadSuccess = i2.createAction('[View Designer] View Definition Load Success', i2.props());
    var viewDefinitionLoadError = i2.createAction('[View Designer] View Definition Load Error');
    var setGeneratedViewDefinition = i2.createAction('[View Designer] Set Generated View Definition', i2.props());
    var loadViewDefinition = i2.createAction('[View Designer] Load View Definition', i2.props());
    var friendlyBundleNameLoadSuccess = i2.createAction('[View Designer] Bundle Friendly Name Load Success', i2.props());
    var friendlyBundleNameLoadError = i2.createAction('[View Designer] Bundle Friendly Name Load Error', i2.props());
    var viewModelsInitialized = i2.createAction('[View Designer] View Models Initialized');
    var viewModelsUpdatedAfterSave = i2.createAction('[View Designer] View Models Updated After Save');
    var updateViewModel = i2.createAction('[View Designer] Update View Model', i2.props());
    var setViewModel = i2.createAction('[View Designer] Set View Model', i2.props());
    var selectInspectorTab = i2.createAction('[View Designer] Select Inspector Tab', i2.props());
    var saveViewDefinition = i2.createAction('[View Designer] Save View Definition', i2.props());
    var runPreview = i2.createAction('[View Designer] Run Preview');
    var loadFriendlyBundleName = i2.createAction('[View Designer] Load Bundle Friendly Name');
    var generateViewDefinition = i2.createAction('[View Designer] Generate View Definition', i2.props());
    var clearCanvas = i2.createAction('[View Designer] Clear Canvas');
    var initViewDesigner = i2.createAction('[View Designer] Init', i2.props());
    var destroyViewDesigner = i2.createAction('[View Designer] Destroy');

    var viewDesignerState = i2.createFeatureSelector('viewDesigner');
    var viewDesignerModelsSelector = i2.createSelector(viewDesignerState, function (viewDesigner) { return viewDesigner.model; });
    var viewModelSelector = i2.createSelector(viewDesignerModelsSelector, function (models) { return models.viewDesignModel; });
    var viewModelPropertyValueSelector = i2.createSelector(viewModelSelector, function (viewModel, _b) {
        var propertyName = _b.propertyName;
        return lodash.get(viewModel, propertyName);
    });
    var viewComponentModelsSelector = i2.createSelector(viewDesignerModelsSelector, function (models) { return models.viewComponentDesignModels; });
    var firstViewComponentModelTypeSelector = i2.createSelector(viewDesignerModelsSelector, function (models) { var _a; return (_a = Object.values(models.viewComponentDesignModels)[0]) === null || _a === void 0 ? void 0 : _a.type; });
    var viewComponentModelSelector = i2.createSelector(viewComponentModelsSelector, function (componentModels, _b) {
        var guid = _b.guid;
        return componentModels[guid];
    });
    var parentComponentModelGuidSelector = i2.createSelector(viewComponentModelSelector, function (componentModel) { return componentModel === null || componentModel === void 0 ? void 0 : componentModel.parentGuid; });
    var componentPropertiesByNameSelector = i2.createSelector(viewComponentModelsSelector, function (componentModels, _b) {
        var guid = _b.guid, propertyName = _b.propertyName;
        return componentModels[guid]
            ? propertyName
                ? lodash.get(componentModels[guid].propertiesByName, propertyName)
                : componentModels[guid].propertiesByName
            : null;
    });
    var componentTypeSelector = i2.createSelector(viewComponentModelsSelector, function (componentModels, _b) {
        var guid = _b.guid;
        return componentModels[guid] ? componentModels[guid].type : null;
    });
    var componentLayoutSelector = i2.createSelector(viewComponentModelSelector, function (componentModel) { return componentModel === null || componentModel === void 0 ? void 0 : componentModel.layout; });
    var componentPermissionsSelector = i2.createSelector(viewComponentModelSelector, function (componentModel) { return componentModel === null || componentModel === void 0 ? void 0 : componentModel.permissions; });
    var childDataComponentGuidsSelector = i2.createSelector(viewComponentModelSelector, function (componentModel) { return componentModel === null || componentModel === void 0 ? void 0 : componentModel.childDataComponentGuids; });
    var viewDesignerUISelector = i2.createSelector(viewDesignerState, function (viewDesigner) { return viewDesigner.ui; });
    var isViewDefinitionLoadingSelector = i2.createSelector(viewDesignerUISelector, function (ui) { return ui.isViewDefinitionLoading; });
    var bundleFriendlyNameSelector = i2.createSelector(viewDesignerUISelector, function (ui) { return ui.friendlyBundleName; });
    var currentBundleIdSelector = i2.createSelector(viewDesignerUISelector, function (ui) { return ui.currentBundleId; });
    var viewDefinitionSelector = i2.createSelector(viewDesignerState, function (viewDesigner) { return viewDesigner.viewDefinition; });
    var validationIssuesSelector = i2.createSelector(viewDesignerState, function (viewDesigner) { return viewDesigner.validation; });
    var breadcrumbsSelector = i2.createSelector(viewDesignerState, function (viewDesigner) { return viewDesigner.breadcrumbs; });
    var selectedInspectorTabIdSelector = i2.createSelector(viewDesignerUISelector, function (ui) { return ui.selectedInspectorTabId; });
    var selectedComponentGuidSelector = i2.createSelector(viewDesignerUISelector, function (ui) { return ui.selectedComponentGuid; });
    var areViewModelsReadySelector = i2.createSelector(viewDesignerUISelector, function (ui) { return ui.areViewModelsReady; });
    var selectedComponentPropsSelector = i2.createSelector(selectedComponentGuidSelector, viewComponentModelsSelector, function (selectedComponentGuid, componentModels) {
        if (componentModels && selectedComponentGuid) {
            var componentDesignModel = componentModels[selectedComponentGuid];
            return componentDesignModel ? componentDesignModel.propertiesByName : null;
        }
        else {
            return null;
        }
    });

    /**
     * Public class for dispatching actions
     * Protects ngrx store$ service from selecting data from the store
     */
    var ViewDesignerDispatcher = /** @class */ (function () {
        function ViewDesignerDispatcher(store$) {
            this.store$ = store$;
        }
        ViewDesignerDispatcher.prototype.dispatch = function (action) {
            this.store$.dispatch(action);
        };
        return ViewDesignerDispatcher;
    }());
    ViewDesignerDispatcher.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerDispatcher, deps: [{ token: i2__namespace.Store }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ViewDesignerDispatcher.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerDispatcher, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerDispatcher, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.Store }]; } });

    var RxViewDesignerInspectorService = /** @class */ (function () {
        function RxViewDesignerInspectorService() {
            this.onChangeSubject = new rxjs.Subject();
            this.configs = new Map();
            this.onChange$ = this.onChangeSubject.asObservable();
        }
        RxViewDesignerInspectorService.prototype.clear = function () {
            this.configs.clear();
        };
        RxViewDesignerInspectorService.prototype.set = function (guid, config) {
            this.configs.set(guid, config);
            this.onChangeSubject.next({ guid: guid, config: config });
        };
        RxViewDesignerInspectorService.prototype.get = function (guid) {
            return this.configs.get(guid);
        };
        RxViewDesignerInspectorService.prototype.delete = function (guid) {
            this.onChangeSubject.next({ guid: guid, config: null });
            this.configs.delete(guid);
        };
        return RxViewDesignerInspectorService;
    }());
    RxViewDesignerInspectorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerInspectorService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDesignerInspectorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerInspectorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerInspectorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxViewDataDictionaryBuilderService = /** @class */ (function () {
        function RxViewDataDictionaryBuilderService() {
            this.componentIcon = 'd-icon-file_o';
            this.componentPropertyIcon = 'd-icon-file_o_gear';
            this.settablePropertiesIcon = 'd-icon-arrow_right_square_input';
            this.actionOutputIcon = 'd-icon-arrow_chart';
        }
        RxViewDataDictionaryBuilderService.prototype.getActionOutputDataDictionaryBranch = function (actionName, dataDictionary) {
            var _this = this;
            return {
                label: actionName,
                icon: 'd-icon-arrow_chart',
                children: lodash.map(dataDictionary, function (dataDictionaryBranch) { return _this.buildDataDictionaryBranch(dataDictionaryBranch, _this.actionOutputIcon); })
            };
        };
        RxViewDataDictionaryBuilderService.prototype.getComponentCommonDataDictionaryBranch = function (branch) {
            var _this = this;
            return Object.assign(Object.assign({}, branch), { icon: this.componentIcon, children: lodash.flow(function (children) { return lodash.map(children, function (child) { return _this.buildDataDictionaryBranch(child, _this.componentPropertyIcon); }); }, lodash.compact)(branch.children) });
        };
        RxViewDataDictionaryBuilderService.prototype.getSettablePropertiesDataDictionary = function (branches) {
            var _this = this;
            return lodash.map(branches, function (branch) { return _this.buildDataDictionaryBranch(branch, _this.settablePropertiesIcon); });
        };
        RxViewDataDictionaryBuilderService.prototype.buildDataDictionaryBranch = function (branch, icon) {
            var _this = this;
            var node = Object.assign({}, branch);
            if (branch.expression) {
                node.icon = icon;
            }
            if (branch.children) {
                node.children = lodash.flow(function (children) { return lodash.map(children, function (child) { return _this.buildDataDictionaryBranch(child, icon); }); }, lodash.compact)(branch.children);
            }
            return node;
        };
        return RxViewDataDictionaryBuilderService;
    }());
    RxViewDataDictionaryBuilderService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryBuilderService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDataDictionaryBuilderService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryBuilderService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryBuilderService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxViewDataDictionaryStoreService = /** @class */ (function () {
        function RxViewDataDictionaryStoreService() {
            this.componentsCommon = null;
            this.componentsCommonSubject = new rxjs.ReplaySubject(1);
            this.componentsCommon$ = this.componentsCommonSubject.asObservable();
            this.viewCommon = null;
            this.viewCommonSubject = new rxjs.ReplaySubject(1);
            this.viewCommon$ = this.viewCommonSubject.asObservable();
            this.actionsOutput = [];
            this.actionsOutputSubject = new rxjs.ReplaySubject(1);
            this.actionsOutput$ = this.actionsOutputSubject.asObservable();
            this.settableProperties = null;
            this.settablePropertiesSubject = new rxjs.ReplaySubject(1);
            this.settableProperties$ = this.settablePropertiesSubject.asObservable();
        }
        RxViewDataDictionaryStoreService.prototype.setCommonDataDictionaryBranch = function (guid, dataDictionaryBranch) {
            var _a;
            this.setComponentCommon(lodash.isEmpty(dataDictionaryBranch)
                ? lodash.omit(this.componentsCommon, [guid])
                : Object.assign(Object.assign({}, this.componentsCommon), (_a = {}, _a[guid] = dataDictionaryBranch, _a)));
        };
        RxViewDataDictionaryStoreService.prototype.setViewCommonDataDictionaryBranch = function (dataDictionaryBranch) {
            this.setViewCommon(dataDictionaryBranch);
        };
        RxViewDataDictionaryStoreService.prototype.setSettablePropertiesDataDictionary = function (items) {
            this.setSettableProperties(Object.assign(Object.assign({}, this.settableProperties), items.reduce(function (result, _a) {
                var guid = _a.guid, componentName = _a.componentName, dataDictionary = _a.dataDictionary;
                result[guid] = { componentName: componentName, dataDictionary: dataDictionary };
                return result;
            }, {})));
        };
        RxViewDataDictionaryStoreService.prototype.removeDataDictionaryForComponents = function (guids) {
            var _this = this;
            if (guids.some(function (guid) { return lodash.has(_this.componentsCommon, guid); })) {
                this.setComponentCommon(lodash.omit(this.componentsCommon, guids));
            }
            if (guids.some(function (guid) { return lodash.has(_this.settableProperties, guid); })) {
                this.setSettableProperties(lodash.omit(this.settableProperties, guids));
            }
        };
        RxViewDataDictionaryStoreService.prototype.setActionOutputDataDictionaryBranch = function (guid, index, dataDictionaryBranch) {
            this.setActionsOutput(lodash.flow(function (actions) { return __spreadArray(__spreadArray([], __read(lodash.reject(actions, { guid: guid }))), [
                { guid: guid, index: index, dataDictionaryBranch: dataDictionaryBranch }
            ]); }, function (actions) { return lodash.sortBy(actions, 'index'); })(this.actionsOutput));
        };
        RxViewDataDictionaryStoreService.prototype.updateActionOutputDataDictionaryBranchOrder = function (actions) {
            this.setActionsOutput(lodash.flow(function (actionsOutput) { return lodash.map(actionsOutput, function (actionOutput) { return (Object.assign(Object.assign({}, actionOutput), { index: actions[actionOutput.guid] })); }); }, function (actionsOutput) { return lodash.sortBy(actionsOutput, 'index'); })(this.actionsOutput));
        };
        RxViewDataDictionaryStoreService.prototype.removeActionOutputDataDictionaryBranch = function (guid) {
            this.setActionsOutput(lodash.reject(this.actionsOutput, { guid: guid }));
        };
        RxViewDataDictionaryStoreService.prototype.removeAllActionOutputDataDictionaryBranches = function () {
            this.setActionsOutput(null);
        };
        RxViewDataDictionaryStoreService.prototype.clear = function () {
            this.setComponentCommon(null);
            this.setViewCommon(null);
            this.setSettableProperties(null);
            this.setActionsOutput([]);
        };
        RxViewDataDictionaryStoreService.prototype.setComponentCommon = function (state) {
            this.componentsCommon = state;
            this.componentsCommonSubject.next(this.componentsCommon);
        };
        RxViewDataDictionaryStoreService.prototype.setViewCommon = function (state) {
            this.viewCommon = state;
            this.viewCommonSubject.next(this.viewCommon);
        };
        RxViewDataDictionaryStoreService.prototype.setActionsOutput = function (state) {
            this.actionsOutput = state;
            this.actionsOutputSubject.next(this.actionsOutput);
        };
        RxViewDataDictionaryStoreService.prototype.setSettableProperties = function (state) {
            this.settableProperties = state;
            this.settablePropertiesSubject.next(this.settableProperties);
        };
        return RxViewDataDictionaryStoreService;
    }());
    RxViewDataDictionaryStoreService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryStoreService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDataDictionaryStoreService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryStoreService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryStoreService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var ViewDesignerFacade = /** @class */ (function () {
        function ViewDesignerFacade(dispatcher, store$, actions$, rxViewDesignerInspectorService, rxGuidService, rxViewDataDictionaryBuilderService, rxViewDataDictionaryService, rxOverlayService) {
            var _this = this;
            this.dispatcher = dispatcher;
            this.store$ = store$;
            this.actions$ = actions$;
            this.rxViewDesignerInspectorService = rxViewDesignerInspectorService;
            this.rxGuidService = rxGuidService;
            this.rxViewDataDictionaryBuilderService = rxViewDataDictionaryBuilderService;
            this.rxViewDataDictionaryService = rxViewDataDictionaryService;
            this.rxOverlayService = rxOverlayService;
            this.viewDefinition$ = this.store$.select(viewDefinitionSelector);
            this.validationIssues$ = this.store$.select(validationIssuesSelector);
            this.breadcrumbs$ = this.store$.select(breadcrumbsSelector);
            this.viewDesignerModelState$ = this.store$.select(viewDesignerModelsSelector);
            // filter operator is used to ignore the empty model when:
            // - the view definition has not been loaded for the first time, or
            // - the view definition is being saved.
            this.viewModel$ = this.store$.select(viewModelSelector).pipe(operators.filter(Boolean));
            this.viewModelGuid$ = this.getViewPropertyValue('guid');
            this.viewComponentModels$ = this.store$.select(viewComponentModelsSelector);
            this.firstViewComponentModelType$ = this.store$.select(firstViewComponentModelTypeSelector);
            this.isExtensionView$ = this.getViewPropertyValue('targetViewDefinitionName').pipe(operators.map(Boolean), operators.shareReplay(1));
            this.isExtensionContainerSet$ = this.getViewPropertyValue('targetExtensionContainerGuid').pipe(operators.map(Boolean), operators.shareReplay(1));
            this.allComponentGuids$ = this.viewComponentModels$.pipe(operators.map(function (models) { return new Set(Object.keys(models)); }), operators.shareReplay({
                refCount: true,
                bufferSize: 1
            }));
            this.selectedComponentGuid$ = this.store$.select(selectedComponentGuidSelector).pipe(operators.switchMap(function (componentGuid) { return _this.viewModelGuid$.pipe(operators.map(function (viewGuid) { return (componentGuid === viewGuid ? null : componentGuid); }), operators.take(1)); }));
            this.selectedComponentProperties$ = this.selectedComponentGuid$.pipe(operators.switchMap(function (guid) { return (guid ? _this.getComponentProperties(guid) : rxjs.of(null)); }));
            this.isViewDefinitionLoading$ = this.store$.select(isViewDefinitionLoadingSelector);
            this.selectedInspectorTabId$ = this.store$.select(selectedInspectorTabIdSelector);
            this.bundleFriendlyName$ = this.store$.select(bundleFriendlyNameSelector);
            this.currentBundleId$ = this.store$.select(currentBundleIdSelector);
            this.viewInspectorLayout$ = rxjs.merge(this.viewModelGuid$, this.rxViewDesignerInspectorService.onChange$.pipe(operators.withLatestFrom(this.viewModelGuid$), operators.filter(function (_a) {
                var _b = __read(_a, 2), config = _b[0], guid = _b[1];
                return config.guid === guid;
            }), operators.map(function (_a) {
                var _b = __read(_a, 2), config = _b[0], guid = _b[1];
                return guid;
            }))).pipe(operators.map(function (guid) {
                var inspectorConfig = _this.rxViewDesignerInspectorService.get(guid);
                return inspectorConfig ? inspectorConfig.inspectorSectionConfigs : null;
            }));
            this.selectedComponentInspectorLayout$ = rxjs.merge(this.selectedComponentGuid$.pipe(operators.distinctUntilChanged()), this.rxViewDesignerInspectorService.onChange$.pipe(operators.withLatestFrom(this.selectedComponentGuid$), operators.filter(function (_a) {
                var _b = __read(_a, 2), config = _b[0], guid = _b[1];
                return config.guid === guid;
            }), operators.map(function (_a) {
                var _b = __read(_a, 2), config = _b[0], guid = _b[1];
                return guid;
            }))).pipe(operators.map(function (guid) {
                var inspectorConfig = _this.rxViewDesignerInspectorService.get(guid);
                return inspectorConfig ? inspectorConfig.inspectorSectionConfigs : null;
            }));
            this.isViewReadOnly$ = rxjs.combineLatest([
                this.viewModel$,
                this.currentBundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxOverlayService.areNewDefinitionsAllowed(bundleId); }))
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), viewModel = _b[0], areNewDefinitionsAllowed = _b[1];
                return !areNewDefinitionsAllowed || !_this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewModel);
            }), operators.distinctUntilChanged(), operators.shareReplay(1));
            // Actions Stream
            this.viewDefinitionLoadError$ = this.actions$.pipe(i1.ofType(viewDefinitionLoadError));
            this.viewDefinitionSaveSuccess$ = this.actions$.pipe(i1.ofType(viewDefinitionSaveSuccess));
            this.initViewDesigner$ = this.actions$.pipe(i1.ofType(initViewDesigner));
            this.destroyViewDesignerSubject = new rxjs.Subject();
            this.destroyViewDesigner$ = this.destroyViewDesignerSubject.asObservable();
            this.viewModelsInitialized$ = this.actions$.pipe(i1.ofType(viewModelsInitialized));
            this.areViewModelsReady$ = this.store$.select(areViewModelsReadySelector);
            this.viewCommonDataDictionaryState$ = this.rxViewDataDictionaryService.viewCommon$;
            this.componentsCommonDataDictionaryState$ = this.rxViewDataDictionaryService.componentsCommon$;
            this.actionsDataDictionaryState$ = this.rxViewDataDictionaryService.actionsOutput$;
            this.settablePropertiesDataDictionaryState$ = this.rxViewDataDictionaryService.settableProperties$;
            this.settablePropertiesDataDictionarySubject = new rxjs.Subject();
            // for performance reasons grouping actions before sending them to store
            rxjs.merge(this.settablePropertiesDataDictionarySubject.pipe(operators.bufferToggle(this.initViewDesigner$, function (v) { return _this.viewModelsInitialized$; })), this.viewModelsInitialized$.pipe(operators.switchMap(function () { return _this.settablePropertiesDataDictionarySubject.pipe(operators.map(function (data) { return [data]; }), operators.takeUntil(_this.initViewDesigner$)); }))).subscribe(function (items) {
                _this.rxViewDataDictionaryService.setSettablePropertiesDataDictionary(items);
            });
        }
        ViewDesignerFacade.prototype.getComponentModel = function (guid) {
            return this.store$.select(viewComponentModelSelector, { guid: guid });
        };
        ViewDesignerFacade.prototype.initViewDesigner = function (payload) {
            this.dispatcher.dispatch(initViewDesigner({
                payload: payload
            }));
        };
        ViewDesignerFacade.prototype.destroyViewDesigner = function () {
            this.destroyViewDesignerSubject.next();
            // trigger action after subject to allow store to be cleared after every component is destroyed
            // and its streams are completed
            this.dispatcher.dispatch(destroyViewDesigner());
        };
        ViewDesignerFacade.prototype.selectComponent = function (guid) {
            this.dispatcher.dispatch(selectComponent({ guid: guid }));
        };
        ViewDesignerFacade.prototype.insertComponent = function (payload) {
            this.dispatcher.dispatch(insertComponent(Object.assign(Object.assign({ columnIndex: lodash.isFinite(payload.data && payload.data.columnIndex) ? payload.data.columnIndex : 0 }, payload), { data: {
                    guid: payload.data.draggedViewComponentGuid,
                    type: payload.data.draggedViewComponentDescriptor.type,
                    initialPropertiesByName: payload.data.initialPropertiesByName
                } })));
        };
        ViewDesignerFacade.prototype.selectInspectorTab = function (payload) {
            this.dispatcher.dispatch(selectInspectorTab(payload));
        };
        ViewDesignerFacade.prototype.generateViewDefinition = function (payload) {
            this.dispatcher.dispatch(generateViewDefinition({ payload: payload }));
        };
        ViewDesignerFacade.prototype.updateComponentProperties = function (guid, componentProperties) {
            this.dispatcher.dispatch(updateComponentModel({
                payload: [
                    {
                        guid: guid,
                        partialModel: {
                            propertiesByName: componentProperties
                        }
                    }
                ]
            }));
        };
        ViewDesignerFacade.prototype.updateComponentModel = function (guid, payload) {
            this.dispatcher.dispatch(updateComponentModel({
                payload: [
                    {
                        guid: guid,
                        partialModel: payload
                    }
                ]
            }));
        };
        ViewDesignerFacade.prototype.getComponentProperties = function (guid) {
            return this.store$.select(componentPropertiesByNameSelector, { guid: guid });
        };
        ViewDesignerFacade.prototype.getComponentPropertyValue = function (guid, propertyName) {
            return this.store$.select(componentPropertiesByNameSelector, { guid: guid, propertyName: propertyName }).pipe(operators.withLatestFrom(this.getComponentModel(guid)), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), value = _b[0], model = _b[1];
                return (model ? rxjs.of(value) : rxjs.EMPTY);
            }));
        };
        ViewDesignerFacade.prototype.getComponentType = function (guid) {
            return this.store$.select(componentTypeSelector, { guid: guid });
        };
        ViewDesignerFacade.prototype.getComponentPermissions = function (guid) {
            return this.store$.select(componentPermissionsSelector, { guid: guid });
        };
        ViewDesignerFacade.prototype.getComponentLayout = function (guid) {
            return this.store$.select(componentLayoutSelector, { guid: guid });
        };
        ViewDesignerFacade.prototype.updateSelectedComponentProperties = function (properties) {
            var _this = this;
            this.selectedComponentGuid$.pipe(operators.take(1)).subscribe(function (guid) {
                _this.updateComponentProperties(guid, properties);
            });
        };
        ViewDesignerFacade.prototype.saveViewDefinition = function (payload) {
            this.dispatcher.dispatch(saveViewDefinition({ payload: payload }));
        };
        ViewDesignerFacade.prototype.updateViewProperties = function (properties) {
            this.dispatcher.dispatch(updateViewModel({ payload: properties }));
        };
        ViewDesignerFacade.prototype.setViewProperties = function (properties) {
            this.dispatcher.dispatch(setViewModel({ payload: properties }));
        };
        ViewDesignerFacade.prototype.getViewPropertyValue = function (propertyName) {
            return this.store$.select(viewModelPropertyValueSelector, { propertyName: propertyName }).pipe(operators.switchMapTo(this.viewModel$.pipe(operators.map(function (model) { return model[propertyName]; }), operators.take(1))), operators.distinctUntilChanged());
        };
        ViewDesignerFacade.prototype.runPreview = function () {
            this.dispatcher.dispatch(runPreview());
        };
        ViewDesignerFacade.prototype.clearCanvas = function () {
            this.dispatcher.dispatch(clearCanvas());
        };
        ViewDesignerFacade.prototype.setComponentInspector = function (guid, inspectorConfig) {
            this.rxViewDesignerInspectorService.set(guid, inspectorConfig);
        };
        ViewDesignerFacade.prototype.setValidationIssues = function (guid, issues) {
            this.dispatcher.dispatch(setValidationIssues({ guid: guid, issues: issues }));
        };
        ViewDesignerFacade.prototype.setExpressionValidationIssues = function (issues) {
            this.dispatcher.dispatch(setExpressionValidationIssues({ issues: issues }));
        };
        ViewDesignerFacade.prototype.setViewInspectorConfig = function (inspectorConfig) {
            var _this = this;
            this.viewModelGuid$.pipe(operators.take(1)).subscribe(function (guid) {
                _this.setComponentInspector(guid, inspectorConfig);
            });
        };
        ViewDesignerFacade.prototype.removeViewComponents = function (guids, selectParent) {
            if (guids.length) {
                this.dispatcher.dispatch(removeComponents({ guids: guids, selectParent: selectParent }));
            }
        };
        ViewDesignerFacade.prototype.setComponentSettablePropertiesDataDictionary = function (guid, componentName, properties) {
            this.settablePropertiesDataDictionarySubject.next({
                guid: guid,
                componentName: componentName,
                dataDictionary: this.rxViewDataDictionaryBuilderService.getSettablePropertiesDataDictionary(properties)
            });
        };
        ViewDesignerFacade.prototype.setComponentCommonDataDictionaryBranch = function (guid, dataDictionaryBranch) {
            this.rxViewDataDictionaryService.setCommonDataDictionaryBranch(guid, dataDictionaryBranch
                ? this.rxViewDataDictionaryBuilderService.getComponentCommonDataDictionaryBranch(dataDictionaryBranch)
                : null);
        };
        ViewDesignerFacade.prototype.setViewCommonDataDictionaryBranch = function (dataDictionaryBranch) {
            this.rxViewDataDictionaryService.setViewCommonDataDictionaryBranch(dataDictionaryBranch);
        };
        ViewDesignerFacade.prototype.removeAllActionDataDictionaryBranches = function () {
            this.rxViewDataDictionaryService.removeAllActionOutputDataDictionaryBranches();
        };
        ViewDesignerFacade.prototype.removeActionDataDictionaryBranch = function (actionGuid) {
            this.rxViewDataDictionaryService.removeActionOutputDataDictionaryBranch(actionGuid);
        };
        ViewDesignerFacade.prototype.setActionDataDictionaryBranch = function (actionGuid, index, actionName, dataDictionary) {
            if (dataDictionary === void 0) { dataDictionary = null; }
            this.rxViewDataDictionaryService.setActionOutputDataDictionaryBranch(actionGuid, index, this.rxViewDataDictionaryBuilderService.getActionOutputDataDictionaryBranch(actionName, dataDictionary));
        };
        ViewDesignerFacade.prototype.updateActionDataDictionaryBranchOrder = function (actions) {
            this.rxViewDataDictionaryService.updateActionOutputDataDictionaryBranchOrder(actions);
        };
        ViewDesignerFacade.prototype.getChildComponentGuids = function (parentComponentGuid, recursive, filterPredicate) {
            var _this = this;
            if (recursive === void 0) { recursive = false; }
            // watch for layout and childDataComponentGuids properties change
            // TODO: store child component guids separately as a final result from layout and childDataComponentGuids
            return rxjs.combineLatest([
                this.store$.select(componentLayoutSelector, { guid: parentComponentGuid }),
                this.store$.select(childDataComponentGuidsSelector, { guid: parentComponentGuid })
            ]).pipe(
            // get component model with actual data where layout and childDataComponentGuids are already updated
            operators.switchMap(function () { return _this.getComponentModel(parentComponentGuid).pipe(operators.take(1)); }), operators.switchMap(function (model) { return model
                ? rxjs.of(lodash.compact(__spreadArray(__spreadArray([], __read((model.layout ? i5.RxViewLayout.getViewLayoutChildGuids(model.layout) : []))), __read((model.childDataComponentGuids || [])))))
                : rxjs.EMPTY; }), operators.switchMap(function (guids) { return guids.length && recursive
                ? rxjs.combineLatest(guids.map(function (guid) { return _this.getChildComponentGuids(guid, true); })).pipe(operators.map(lodash.flatten), operators.map(function (nestedGuids) { return __spreadArray(__spreadArray([], __read(nestedGuids)), __read(guids)); }))
                : rxjs.of(guids); }), operators.switchMap(function (guids) { return guids.length
                ? _this.viewComponentModels$.pipe(operators.map(function (models) {
                    // The model of a removed component may be already unavailable, but the GUID may still be there.
                    // This can happen when multiple nested components are removed from different
                    // parent containers e.g. using record editor field selector dialog component.
                    // In this case, we will get two observable emits for each removed component.
                    // TODO: enhance getFlattenChildComponentGuids logic to reach a single observable emit.
                    var availableComponentGuids = guids.filter(function (guid) { return models[guid]; });
                    if (filterPredicate) {
                        availableComponentGuids = availableComponentGuids.filter(function (guid) { return filterPredicate({
                            type: models[guid].type,
                            guid: models[guid].guid,
                            data: models[guid].propertiesByName
                        }); });
                    }
                    return availableComponentGuids;
                }), operators.take(1))
                : rxjs.of(guids); }));
        };
        ViewDesignerFacade.prototype.getChildComponents = function (parentComponentGuid, filterPredicate) {
            var _this = this;
            return this.getChildComponentGuids(parentComponentGuid, false, filterPredicate).pipe(operators.switchMap(function (guids) { return guids.length
                ? rxjs.combineLatest(guids.map(function (guid) { return _this.getComponentProperties(guid).pipe(operators.withLatestFrom(_this.getComponentModel(guid)), operators.switchMap(function (_a) {
                    var _b = __read(_a, 2), props = _b[0], model = _b[1];
                    return model
                        ? rxjs.of({
                            type: model.type,
                            data: props,
                            guid: guid
                        })
                        : rxjs.EMPTY;
                })); }))
                : rxjs.of([]); }));
        };
        ViewDesignerFacade.prototype.getComponent = function (guid) {
            return this.getComponentModel(guid).pipe(operators.map(function (model) { return model
                ? {
                    data: model.propertiesByName,
                    guid: model.guid,
                    type: model.type
                }
                : null; }));
        };
        ViewDesignerFacade.prototype.getComponentsByType = function (type) {
            return this.viewComponentModels$.pipe(operators.map(function (models) { return lodash.filter(models, { type: type }).map(function (model) { return ({
                guid: model.guid,
                data: model.propertiesByName,
                type: model.type
            }); }); }));
        };
        ViewDesignerFacade.prototype.getChildComponentTree = function (parentComponentGuid) {
            return this.viewComponentModels$.pipe(operators.map(function (viewComponentModels) {
                var getChildrenData = function (model) { return getChildGuidsFromModel(model).reduce(function (res, childGuid) {
                    if (viewComponentModels[childGuid]) {
                        res.push({
                            guid: childGuid,
                            data: viewComponentModels[childGuid].propertiesByName,
                            type: viewComponentModels[childGuid].type,
                            children: getChildrenData(viewComponentModels[childGuid])
                        });
                    }
                    return res;
                }, []); };
                return viewComponentModels[parentComponentGuid]
                    ? getChildrenData(viewComponentModels[parentComponentGuid])
                    : [];
            }));
        };
        ViewDesignerFacade.prototype.getParentComponentGuid = function (guid, componentType) {
            var _this = this;
            return this.store$
                .select(parentComponentModelGuidSelector, { guid: guid })
                .pipe(operators.switchMap(function (parentGuid) { return parentGuid && componentType
                ? _this.store$
                    .select(componentTypeSelector, { guid: parentGuid })
                    .pipe(operators.switchMap(function (parentComponentType) { return parentComponentType === componentType
                    ? rxjs.of(parentGuid)
                    : _this.getParentComponentGuid(parentGuid, componentType); }))
                : rxjs.of(parentGuid || null); }));
        };
        ViewDesignerFacade.prototype.setChildren = function (guid, data) {
            this.dispatcher.dispatch(setChildComponents({
                payload: {
                    guid: guid,
                    data: data
                }
            }));
        };
        return ViewDesignerFacade;
    }());
    ViewDesignerFacade.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerFacade, deps: [{ token: ViewDesignerDispatcher }, { token: i2__namespace.Store }, { token: i1__namespace.Actions }, { token: RxViewDesignerInspectorService }, { token: i2__namespace$1.RxGuidService }, { token: RxViewDataDictionaryBuilderService }, { token: RxViewDataDictionaryStoreService }, { token: i3__namespace.RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ViewDesignerFacade.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerFacade, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerFacade, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerDispatcher }, { type: i2__namespace.Store }, { type: i1__namespace.Actions }, { type: RxViewDesignerInspectorService }, { type: i2__namespace$1.RxGuidService }, { type: RxViewDataDictionaryBuilderService }, { type: RxViewDataDictionaryStoreService }, { type: i3__namespace.RxOverlayService }]; } });

    var RxViewDataDictionaryService = /** @class */ (function () {
        function RxViewDataDictionaryService(viewDesignerFacade, rxViewDataDictionaryBuilderService, rxViewComponentRegistryService, rxObjectUtilsService, rxDataDictionaryUtils) {
            var _this = this;
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxViewDataDictionaryBuilderService = rxViewDataDictionaryBuilderService;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.rxObjectUtilsService = rxObjectUtilsService;
            this.rxDataDictionaryUtils = rxDataDictionaryUtils;
            this.componentsCommonDataDictionaryStateClone$ = this.viewDesignerFacade.componentsCommonDataDictionaryState$.pipe(operators.map(function (componentsDataDictionaryState) { return componentsDataDictionaryState ? _this.rxObjectUtilsService.cloneDeep(componentsDataDictionaryState) : {}; }), operators.shareReplay(1));
            this.viewCommonDataDictionaryStateClone$ = this.viewDesignerFacade.viewCommonDataDictionaryState$.pipe(operators.filter(Boolean), operators.map(function (viewDataDictionary) { return _this.rxObjectUtilsService.cloneDeep(viewDataDictionary); }), operators.shareReplay(1));
            this.commonDataDictionary$ = this.getCommonDataDictionary();
            this.settablePropertiesDataDictionary$ = this.viewDesignerFacade.settablePropertiesDataDictionaryState$.pipe(operators.withLatestFrom(this.viewDesignerFacade.viewDesignerModelState$), operators.map(function (_b) {
                var _c = __read(_b, 2), settablePropsDataDictionaryState = _c[0], viewDesignerModelState = _c[1];
                return _this.rxObjectUtilsService.cloneDeep(_this.getSettablePropsDataDictionary(settablePropsDataDictionaryState, viewDesignerModelState));
            }));
        }
        RxViewDataDictionaryService.prototype.getActionDataDictionary = function (guid) {
            var _this = this;
            return rxjs.combineLatest([this.viewDesignerFacade.actionsDataDictionaryState$, this.getCommonDataDictionary()]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), actionsDataDictionaryState = _c[0], commonDataDictionary = _c[1];
                var currentActionData = lodash.find(actionsDataDictionaryState, { guid: guid });
                return __spreadArray([
                    {
                        label: 'Actions',
                        children: currentActionData
                            ? lodash.flow(function (branches) { return lodash.take(branches, currentActionData.index); }, function (branches) { return lodash.map(branches, 'dataDictionaryBranch'); }, lodash.compact, function (branches) { return lodash.filter(branches, function (branch) { var _a; return (_a = branch.children) === null || _a === void 0 ? void 0 : _a.length; }); }, function (branches) { return _this.rxObjectUtilsService.cloneDeep(branches); })(actionsDataDictionaryState)
                            : []
                    }
                ], __read(commonDataDictionary));
            }), 
            // TODO: performance
            operators.distinctUntilChanged(lodash.isEqual));
        };
        RxViewDataDictionaryService.prototype.getComponentCommonDataDictionary = function (guid) {
            return this.componentsCommonDataDictionaryStateClone$.pipe(operators.map(function (state) { return state[guid]; }));
        };
        RxViewDataDictionaryService.prototype.getCommonDataDictionary = function (componentBranchToReplace) {
            var _this = this;
            return rxjs.combineLatest([
                this.viewCommonDataDictionaryStateClone$,
                this.componentsCommonDataDictionaryStateClone$.pipe(operators.map(function (componentsDataDictionaryState) { return Object.values(componentBranchToReplace
                    ? Object.assign(Object.assign({}, componentsDataDictionaryState), componentBranchToReplace) : componentsDataDictionaryState); }))
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), viewDataDictionaryBranch = _c[0], componentDataDictionaryBranches = _c[1];
                return [
                    {
                        label: 'General',
                        children: [
                            {
                                label: 'Current user',
                                icon: 'd-icon-dollar',
                                expression: '${keywords.user}'
                            },
                            {
                                label: 'New line',
                                icon: 'd-icon-dollar',
                                expression: '${keywords.newLine}'
                            }
                        ]
                    },
                    {
                        label: 'Functions',
                        children: _this.rxDataDictionaryUtils.getFunctionsDataDictionaryBranch(i5.RX_EXPRESSION_FUNCTIONS)
                    },
                    Object.assign(Object.assign({}, viewDataDictionaryBranch), { children: __spreadArray([
                            { label: 'Components', children: lodash.compact(componentDataDictionaryBranches), expanded: true }
                        ], __read(viewDataDictionaryBranch.children)) })
                ];
            }));
        };
        RxViewDataDictionaryService.prototype.getSettablePropsDataDictionary = function (settablePropsDataDictionaryState, viewDesignerModelState) {
            var _this = this;
            return getChildGuidsFromModel(viewDesignerModelState.viewDesignModel)
                .map(function (guid) { return _this.getSettablePropsDataDictionaryBranch(guid, viewDesignerModelState, settablePropsDataDictionaryState, true); })
                .filter(Boolean);
        };
        RxViewDataDictionaryService.prototype.getSettablePropsDataDictionaryBranch = function (guid, modelState, settablePropsState, expanded) {
            var _this = this;
            if (expanded === void 0) { expanded = false; }
            var componentPropsState = settablePropsState[guid];
            var model = modelState.viewComponentDesignModels[guid];
            var descriptor = this.rxViewComponentRegistryService.get(model.type);
            var childGuids = descriptor.outlets && model.layout ? i5.RxViewLayout.getViewLayoutChildGuids(model.layout) : null;
            var componentsDataDictionary = lodash.map(childGuids, function (componentGuid) { return _this.getSettablePropsDataDictionaryBranch(componentGuid, modelState, settablePropsState); }).filter(Boolean);
            var propsDataDictionary = lodash.get(componentPropsState, 'dataDictionary', []);
            if (componentsDataDictionary.length || propsDataDictionary.length) {
                return {
                    label: (componentPropsState === null || componentPropsState === void 0 ? void 0 : componentPropsState.componentName) || descriptor.name,
                    expanded: expanded,
                    children: componentsDataDictionary.length && propsDataDictionary.length
                        ? [
                            {
                                label: 'Components',
                                children: componentsDataDictionary
                            },
                            {
                                label: 'Properties',
                                children: propsDataDictionary
                            }
                        ]
                        : componentsDataDictionary.length
                            ? componentsDataDictionary
                            : propsDataDictionary
                };
            }
        };
        return RxViewDataDictionaryService;
    }());
    RxViewDataDictionaryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryService, deps: [{ token: ViewDesignerFacade }, { token: RxViewDataDictionaryBuilderService }, { token: i5__namespace.RxViewComponentRegistryService }, { token: i2__namespace$1.RxObjectUtilsService }, { token: i3__namespace.RxDataDictionaryUtils }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDataDictionaryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDataDictionaryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: RxViewDataDictionaryBuilderService }, { type: i5__namespace.RxViewComponentRegistryService }, { type: i2__namespace$1.RxObjectUtilsService }, { type: i3__namespace.RxDataDictionaryUtils }]; } });

    var RxViewExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxViewExpressionConfigurator, _super);
        function RxViewExpressionConfigurator(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.rxExpressionHelperService = _this.injector.get(i5.RxExpressionHelperService);
            return _this;
        }
        RxViewExpressionConfigurator.prototype.getDefaultConfig = function () {
            var _this = this;
            return Object.assign(Object.assign({}, _super.prototype.getDefaultConfig.call(this)), { dataDictionary$: this.commonDataDictionary$, operators: i3.ExpressionOperatorRowsByGroup.get(i3.ExpressionOperatorGroup.AllClient), validateExpression: function (propertyName, expression) {
                    var isValid = true;
                    var expressionEvaluator = _this.getExpressionEvaluator(propertyName);
                    try {
                        expressionEvaluator.parseExpression(_this.rxExpressionHelperService.prepare(expression));
                    }
                    catch (e) {
                        isValid = false;
                    }
                    return rxjs.of(isValid);
                } });
        };
        return RxViewExpressionConfigurator;
    }(i3.RxExpressionConfigurator));

    var RxViewComponentExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxViewComponentExpressionConfigurator, _super);
        function RxViewComponentExpressionConfigurator(injector, componentGuid, componentModel, componentType) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.componentGuid = componentGuid;
            _this.componentModel = componentModel;
            _this.componentType = componentType;
            _this.rxDefaultExpressionEvaluatorService = _this.injector.get(i5.RxDefaultExpressionEvaluatorService);
            _this.rxViewDataDictionaryService = _this.injector.get(RxViewDataDictionaryService);
            _this.rxViewComponentRegistryService = _this.injector.get(i5.RxViewComponentRegistryService);
            _this.commonDataDictionary$ = _this.rxViewDataDictionaryService.commonDataDictionary$;
            return _this;
        }
        RxViewComponentExpressionConfigurator.prototype.getExpressionEvaluator = function (propertyName) {
            var _a;
            var propertyDescriptor = this.componentType &&
                this.rxViewComponentRegistryService
                    .get(this.componentType)
                    .properties.find(function (property) { return property.name === propertyName; });
            return lodash.isFunction((_a = propertyDescriptor === null || propertyDescriptor === void 0 ? void 0 : propertyDescriptor.evaluatorService) === null || _a === void 0 ? void 0 : _a.parseExpression)
                ? propertyDescriptor.evaluatorService
                : this.rxDefaultExpressionEvaluatorService;
        };
        RxViewComponentExpressionConfigurator.prototype.getCommonDataDictionary = function (componentBranchToReplace$, componentGuid) {
            var _this = this;
            if (componentGuid === void 0) { componentGuid = this.componentGuid; }
            return componentBranchToReplace$
                ? componentBranchToReplace$.pipe(operators.switchMap(function (dataDictionary) {
                    var _b;
                    return _this.rxViewDataDictionaryService.getCommonDataDictionary((_b = {},
                        _b[componentGuid] = dataDictionary,
                        _b));
                }))
                : this.commonDataDictionary$;
        };
        RxViewComponentExpressionConfigurator.prototype.getComponentCommonDataDictionary = function (guid) {
            return this.rxViewDataDictionaryService.getComponentCommonDataDictionary(guid || this.componentGuid);
        };
        return RxViewComponentExpressionConfigurator;
    }(RxViewExpressionConfigurator));

    var RxViewCustomizationOptionsComponent = /** @class */ (function () {
        function RxViewCustomizationOptionsComponent(viewDesignerFacade, rxOverlayService, translateService) {
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxOverlayService = rxOverlayService;
            this.translateService = translateService;
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        RxViewCustomizationOptionsComponent.prototype.ngOnInit = function () {
            var _this = this;
            rxjs.combineLatest([
                this.viewDesignerFacade.getViewPropertyValue('allowOverlay'),
                this.viewDesignerFacade.getViewPropertyValue('scope'),
                this.viewDesignerFacade.getViewPropertyValue('overlayGroupId'),
                this.viewDesignerFacade.getViewPropertyValue('overlayDescriptor'),
                this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime')
            ])
                .pipe(operators.withLatestFrom(this.viewDesignerFacade.viewModel$), operators.takeUntil(this.destroyed$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _c = __read(_b[0], 5), allowOverlay = _c[0], scope = _c[1], overlayGroupId = _c[2], overlayDescriptor = _c[3], lastUpdateTime = _c[4], viewModel = _b[1];
                _this.controlOptions = {
                    allowOverlay: allowOverlay,
                    scope: scope,
                    overlayGroupId: overlayGroupId,
                    overlayDescriptor: overlayDescriptor,
                    isDisabled: !_this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewModel),
                    definitionTypeDisplayName: _this.translateService.instant('com.bmc.arsys.rx.client.view-definition.label').toLowerCase()
                };
            });
        };
        RxViewCustomizationOptionsComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxViewCustomizationOptionsComponent.prototype.setCustomization = function (customizationOptions) {
            this.viewDesignerFacade.updateViewProperties(customizationOptions);
        };
        return RxViewCustomizationOptionsComponent;
    }());
    RxViewCustomizationOptionsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewCustomizationOptionsComponent, deps: [{ token: ViewDesignerFacade }, { token: i3__namespace.RxOverlayService }, { token: i6__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxViewCustomizationOptionsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewCustomizationOptionsComponent, selector: "rx-view-customization-options", inputs: { options: "options" }, ngImport: i0__namespace, template: "<rx-scope-customization-control\n  [options]=\"controlOptions\"\n  [(ngModel)]=\"value\"\n  (ngModelChange)=\"setCustomization($event)\"\n></rx-scope-customization-control>\n", components: [{ type: i3__namespace$1.CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: ["options"] }], directives: [{ type: i3__namespace$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewCustomizationOptionsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-view-customization-options',
                        templateUrl: './view-customization-options.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: i3__namespace.RxOverlayService }, { type: i6__namespace.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var RxViewRevertCustomizationComponent = /** @class */ (function () {
        function RxViewRevertCustomizationComponent(viewDesignerFacade) {
            this.viewDesignerFacade = viewDesignerFacade;
            this.events = new i0.EventEmitter();
            this.controlOptions$ = rxjs.combineLatest([
                this.viewDesignerFacade.getViewPropertyValue('allowOverlay'),
                this.viewDesignerFacade.getViewPropertyValue('scope'),
                this.viewDesignerFacade.getViewPropertyValue('overlayGroupId'),
                this.viewDesignerFacade.getViewPropertyValue('overlayDescriptor')
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 4), allowOverlay = _b[0], scope = _b[1], overlayGroupId = _b[2], overlayDescriptor = _b[3];
                return ({
                    allowOverlay: allowOverlay,
                    scope: scope,
                    overlayGroupId: overlayGroupId,
                    overlayDescriptor: overlayDescriptor
                });
            }));
        }
        return RxViewRevertCustomizationComponent;
    }());
    RxViewRevertCustomizationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewRevertCustomizationComponent, deps: [{ token: ViewDesignerFacade }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxViewRevertCustomizationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewRevertCustomizationComponent, selector: "rx-view-revert-customization", inputs: { options: "options", isDisabled: "isDisabled" }, outputs: { events: "events" }, ngImport: i0__namespace, template: "<rx-revert-customization\n  [options]=\"controlOptions$ | async\"\n  [isDisabled]=\"isDisabled\"\n  (events)=\"events.emit($event)\"\n></rx-revert-customization>\n", components: [{ type: i3__namespace$1.RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: ["options", "isDisabled"], outputs: ["events"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewRevertCustomizationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-view-revert-customization',
                        templateUrl: './view-revert-customization.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerFacade }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] } });

    var RxViewRevertCustomizationModule = /** @class */ (function () {
        function RxViewRevertCustomizationModule() {
        }
        return RxViewRevertCustomizationModule;
    }());
    RxViewRevertCustomizationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewRevertCustomizationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxViewRevertCustomizationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewRevertCustomizationModule, declarations: [RxViewRevertCustomizationComponent], imports: [i4.CommonModule, i3$1.RxRevertCustomizationModule] });
    RxViewRevertCustomizationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewRevertCustomizationModule, imports: [[i4.CommonModule, i3$1.RxRevertCustomizationModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewRevertCustomizationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxViewRevertCustomizationComponent],
                        imports: [i4.CommonModule, i3$1.RxRevertCustomizationModule]
                    }]
            }] });

    var RxViewExpressionValidatorService = /** @class */ (function () {
        function RxViewExpressionValidatorService(rxDefaultExpressionValidatorService, rxDefaultExpressionEvaluatorService, rxStringService, rxExpressionParserService, viewDesignerFacade) {
            this.rxDefaultExpressionValidatorService = rxDefaultExpressionValidatorService;
            this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
            this.rxStringService = rxStringService;
            this.rxExpressionParserService = rxExpressionParserService;
            this.viewDesignerFacade = viewDesignerFacade;
        }
        RxViewExpressionValidatorService.prototype.validate = function (expression, propertyName, propertyLabel, expressionEvaluator) {
            if (propertyLabel === void 0) { propertyLabel = this.rxStringService.prettify(propertyName); }
            if (expressionEvaluator === void 0) { expressionEvaluator = this.rxDefaultExpressionEvaluatorService; }
            var issues$ = rxjs.of([]);
            if (this.rxDefaultExpressionValidatorService.isValid(expression, expressionEvaluator)) {
                if (this.rxStringService.isNonEmptyString(expression)) {
                    var referencedComponentGuidsSet_1 = new Set();
                    this.rxExpressionParserService.parse(expression, function (token, expressionFragment) {
                        if (token === i3.ExpressionParserToken.RxExpression || token === i3.ExpressionParserToken.SingleQuoteRxExpression) {
                            // Extract <ID> from ${view.components.<ID>.<Path>}
                            var result = /\${view\.components\.([0-9a-z-]+)\..+}/.exec(expressionFragment);
                            if (result && result[1]) {
                                referencedComponentGuidsSet_1.add(result[1]);
                            }
                        }
                        return expressionFragment;
                    });
                    if (referencedComponentGuidsSet_1.size) {
                        var referencedComponentGuids_1 = Array.from(referencedComponentGuidsSet_1);
                        issues$ = this.viewDesignerFacade.allComponentGuids$.pipe(operators.map(function (guids) { return referencedComponentGuids_1.filter(function (guid) { return !guids.has(guid); }); }), operators.distinctUntilChanged(lodash.isEqual), operators.map(function (guids) { return guids.map(function () { return ({
                            type: 'error',
                            description: 'Expression references a non-existent view component.',
                            propertyName: propertyName
                        }); }); }));
                    }
                }
            }
            else {
                issues$ = rxjs.of([
                    {
                        type: 'error',
                        description: propertyLabel + " must be a valid expression.",
                        propertyName: propertyName
                    }
                ]);
            }
            return issues$;
        };
        return RxViewExpressionValidatorService;
    }());
    RxViewExpressionValidatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewExpressionValidatorService, deps: [{ token: i5__namespace.RxDefaultExpressionValidatorService }, { token: i5__namespace.RxDefaultExpressionEvaluatorService }, { token: i2__namespace$1.RxStringService }, { token: i3__namespace.RxExpressionParserService }, { token: ViewDesignerFacade }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewExpressionValidatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewExpressionValidatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewExpressionValidatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace.RxDefaultExpressionValidatorService }, { type: i5__namespace.RxDefaultExpressionEvaluatorService }, { type: i2__namespace$1.RxStringService }, { type: i3__namespace.RxExpressionParserService }, { type: ViewDesignerFacade }]; } });

    var RxViewModel = /** @class */ (function () {
        function RxViewModel(injector, viewDesignerFacade, rxStringService, rxOverlayService, rxViewComponentRegistryService, rxBundleCacheService, rxModalService, rxViewDefinitionCacheService, rxViewDefinitionParserService, rxGuidService, viewDesignerDispatcher, rxDefinitionNameService, rxViewExpressionValidatorService) {
            var _this = this;
            this.injector = injector;
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxStringService = rxStringService;
            this.rxOverlayService = rxOverlayService;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxModalService = rxModalService;
            this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
            this.rxViewDefinitionParserService = rxViewDefinitionParserService;
            this.rxGuidService = rxGuidService;
            this.viewDesignerDispatcher = viewDesignerDispatcher;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
            this.expressionConfigurator = new RxViewComponentExpressionConfigurator(this.injector, null, this);
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.allViewDefinitionNamesByBundleId$ = this.viewDesignerFacade.currentBundleId$.pipe(operators.filter(Boolean), operators.switchMap(function (bundleId) { return _this.rxViewDefinitionCacheService
                .getViewDefinitionNames(bundleId)
                .pipe(operators.map(function (names) { return names.map(function (name) { return _this.rxDefinitionNameService.getDisplayNameForValidation(name); }); })); }));
            this.targetExtensionContainerOptions$ = this.viewDesignerFacade
                .getViewPropertyValue('targetViewDefinitionName')
                .pipe(operators.switchMap(function (targetViewDefinitionName) { return targetViewDefinitionName
                ? _this.getTargetExtensionContainerOptions(targetViewDefinitionName).pipe(operators.take(1))
                : rxjs.of(null); }), operators.shareReplay(1));
            this.targetViewDefinition$ = this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName').pipe(operators.filter(Boolean), operators.switchMap(function (targetViewDefinitionName) { return _this.rxViewDefinitionCacheService.getViewDefinition(targetViewDefinitionName); }));
            this.init();
        }
        RxViewModel.prototype.init = function () {
            var _this = this;
            // Initial model and inspector configuration.
            this.viewDesignerFacade.initViewDesigner$
                .pipe(operators.concatMapTo(this.viewDesignerFacade.viewModelsInitialized$.pipe(operators.switchMapTo(rxjs.combineLatest([
                this.viewDesignerFacade.viewComponentModels$.pipe(operators.map(function (viewComponentModels) {
                    var pageComponentModel = Object.values(viewComponentModels).find(function (model) { return model.type === i5.RxViewComponentType.Page; });
                    return pageComponentModel
                        ? viewComponentModels[pageComponentModel.childDataComponentGuids[0]].type
                        : null;
                })),
                this.viewDesignerFacade.viewModel$,
                this.targetExtensionContainerOptions$
            ]).pipe(operators.take(1))))), operators.takeUntil(this.destroyed$))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), componentType = _b[0], viewModel = _b[1], targetExtensionContainerOptions = _b[2];
                _this.viewDesignerFacade.updateViewProperties({
                    pageComponent: componentType
                });
                _this.viewDesignerFacade.setViewInspectorConfig(_this.getInspector(Object.assign(Object.assign({}, viewModel), { pageComponent: componentType }), targetExtensionContainerOptions));
            });
            this.viewDesignerFacade.initViewDesigner$
                .pipe(operators.switchMapTo(this.targetExtensionContainerOptions$.pipe(
            // Ignore initial property change.
            operators.skip(1), operators.withLatestFrom(this.viewDesignerFacade.viewModel$))), operators.takeUntil(this.destroyed$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), options = _b[0], viewModel = _b[1];
                return _this.onTargetExtensionContainerOptionsChange(options, viewModel);
            });
            this.viewDesignerFacade.initViewDesigner$
                .pipe(operators.switchMapTo(this.viewDesignerFacade.getViewPropertyValue('pageComponent').pipe(
            // Ignore initial property change.
            operators.skip(1), operators.switchMapTo(rxjs.combineLatest([
                this.viewDesignerFacade.viewModel$,
                this.viewDesignerFacade.viewComponentModels$,
                this.targetExtensionContainerOptions$
            ]).pipe(operators.take(1))))), operators.takeUntil(this.destroyed$))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), viewModel = _b[0], viewComponentModels = _b[1], targetExtensionContainerOptions = _b[2];
                return _this.onPageComponentChange(viewModel, viewComponentModels, targetExtensionContainerOptions);
            });
            this.viewDesignerFacade.initViewDesigner$
                .pipe(operators.switchMapTo(this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName').pipe(operators.skip(1))), operators.switchMap(function () { return _this.viewDesignerFacade.viewComponentModels$.pipe(operators.first()); }), operators.takeUntil(this.destroyed$))
                .subscribe(function (viewComponentModels) {
                if (!lodash.isEmpty(viewComponentModels)) {
                    _this.viewDesignerFacade.clearCanvas();
                }
            });
            this.viewDesignerFacade.initViewDesigner$
                .pipe(operators.switchMapTo(rxjs.combineLatest([
                this.viewDesignerFacade.getViewPropertyValue('styles').pipe(operators.map(validateCssClassNames)),
                this.validateDisplayName(),
                this.validateInputParams(),
                this.validateOutputParamExpressions(),
                this.validateExtensionContainer()
            ]).pipe(operators.map(lodash.flatten), operators.map(lodash.compact), operators.withLatestFrom(this.viewDesignerFacade.viewModelGuid$))), operators.takeUntil(this.destroyed$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), issues = _b[0], guid = _b[1];
                _this.viewDesignerFacade.setValidationIssues(guid, issues);
            });
            this.viewDesignerFacade.initViewDesigner$
                .pipe(operators.switchMapTo(this.viewDesignerFacade.getViewPropertyValue('inputParams')), operators.takeUntil(this.destroyed$))
                .subscribe(function (inputParams) { return _this.viewDesignerFacade.setViewCommonDataDictionaryBranch(_this.getViewCommonDataDictionary(inputParams)); });
            this.viewDesignerFacade
                .getViewPropertyValue('targetExtensionContainerGuid')
                .pipe(operators.withLatestFrom(this.targetViewDefinition$), operators.map(function (_a) {
                var _b = __read(_a, 2), targetExtensionContainerGuid = _b[0], targetViewDefinition = _b[1];
                return _this.getTargetRecordDefinitionName(targetViewDefinition, targetExtensionContainerGuid);
            }), operators.distinctUntilChanged(), operators.switchMapTo(this.viewDesignerFacade.viewComponentModels$.pipe(operators.take(1))), operators.filter(function (viewComponentModels) { return !lodash.isEmpty(viewComponentModels); }), operators.takeUntil(this.destroyed$))
                .subscribe(function () { return _this.viewDesignerFacade.clearCanvas(); });
        };
        RxViewModel.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxViewModel.prototype.getTargetExtensionContainerOptions = function (targetViewDefinitionName) {
            var _this = this;
            return this.rxViewDefinitionCacheService.getViewDefinition(targetViewDefinitionName).pipe(operators.map(function (viewDefinition) { return _this.rxViewDefinitionParserService
                .getComponents(viewDefinition)
                .filter(function (_a) {
                var componentDefinition = _a.componentDefinition;
                return componentDefinition.type === i5.RxViewComponentType.ExtensionContainer;
            })
                .map(function (_a) {
                var componentDefinition = _a.componentDefinition;
                return ({
                    id: componentDefinition.guid,
                    name: componentDefinition.propertiesByName.name || componentDefinition.name
                });
            }); }));
        };
        RxViewModel.prototype.onTargetExtensionContainerOptionsChange = function (options, viewModel) {
            this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(viewModel, options));
            // targetViewDefinitionName is not selected when options are not defined.
            if (!options) {
                this.viewDesignerFacade.updateViewProperties({
                    targetExtensionContainerGuid: null
                });
            }
            else if (options.length === 1) {
                this.viewDesignerFacade.updateViewProperties({
                    targetExtensionContainerGuid: options[0].id
                });
            }
        };
        RxViewModel.prototype.onPageComponentChange = function (viewModel, componentModels, options) {
            var _this = this;
            var pageComponentModel = lodash.find(componentModels, { type: i5.RxViewComponentType.Page });
            this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(viewModel, options));
            var actions = [];
            if (viewModel.pageComponent) {
                if (pageComponentModel) {
                    this.viewDesignerFacade.updateComponentModel(pageComponentModel.childDataComponentGuids[0], {
                        type: viewModel.pageComponent
                    });
                }
                else {
                    var pageComponentGuid = this.rxGuidService.generate();
                    if (!lodash.isEmpty(componentModels)) {
                        this.viewDesignerFacade.removeViewComponents(getChildGuidsFromModel(viewModel));
                    }
                    actions.push(initializeComponentModels({
                        payload: [
                            {
                                componentModel: {
                                    guid: pageComponentGuid,
                                    resourceType: i5.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                                    type: i5.RxViewComponentType.Page,
                                    propertiesByName: {},
                                    parentGuid: viewModel.guid
                                },
                                insertIndex: 0,
                                columnIndex: 0,
                                outletName: i5.RX_VIEW_DEFINITION.defaultOutletName
                            }
                        ]
                    }), initializeDataComponentModels({
                        payload: [
                            {
                                componentModel: {
                                    guid: this.rxGuidService.generate(),
                                    type: viewModel.pageComponent,
                                    resourceType: i5.RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    propertiesByName: {},
                                    parentGuid: pageComponentGuid
                                }
                            }
                        ]
                    }));
                }
                this.viewDesignerFacade.updateViewProperties({
                    inputParams: [],
                    outputParams: []
                });
            }
            else if (pageComponentModel) {
                this.viewDesignerFacade.removeViewComponents([pageComponentModel.guid]);
            }
            actions.forEach(function (action) { return _this.viewDesignerDispatcher.dispatch(action); });
        };
        RxViewModel.prototype.getInspector = function (viewDesignModel, targetExtensionContainerOptions) {
            var _this = this;
            if (targetExtensionContainerOptions === void 0) { targetExtensionContainerOptions = []; }
            var isExistingView = Boolean(viewDesignModel.lastUpdateTime);
            var isCustomizationAllowed = isExistingView
                ? this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewDesignModel)
                : true;
            var availablePageComponents = this.rxViewComponentRegistryService
                .getBundlePageComponents(this.rxBundleCacheService.bundleId)
                .map(function (pageComponent) { return ({
                id: pageComponent.type,
                name: pageComponent.name
            }); });
            if (viewDesignModel.pageComponent && !this.rxViewComponentRegistryService.get(viewDesignModel.pageComponent)) {
                availablePageComponents.unshift({
                    name: i5.RX_VIEW_DEFINITION.unknownPageComponent.name,
                    id: viewDesignModel.pageComponent
                });
            }
            var pageComponentControl = {
                name: 'pageComponent',
                component: i3$1.SelectFormControlComponent,
                options: {
                    label: 'Page component',
                    options: availablePageComponents,
                    beforeValueChange: function (oldValue, newValue) { return _this.viewDesignerFacade.viewModel$
                        .pipe(operators.take(1), operators.withLatestFrom(_this.viewDesignerFacade.viewComponentModels$), operators.map(function (_a) {
                        var _b = __read(_a, 2), viewModel = _b[0], viewComponentModels = _b[1];
                        return !(oldValue === null || oldValue === void 0 ? void 0 : oldValue.length) &&
                            newValue.length &&
                            (viewModel.inputParams.length || viewModel.outputParams.length || !lodash.isEmpty(viewComponentModels));
                    }))
                        .toPromise()
                        .then(function (isConfirmationRequired) { return isConfirmationRequired
                        ? _this.rxModalService.confirm({
                            title: 'Warning',
                            modalStyle: i5$1.RX_MODAL.modalStyles.warning,
                            message: 'The view canvas, input and output parameters will be cleared. Do you want to continue?'
                        })
                        : true; }); },
                    emptyOption: true
                }
            };
            var extensionContainerControl = {
                name: 'targetExtensionContainerGuid',
                component: i3$1.SelectFormControlComponent,
                options: {
                    label: 'Extension container',
                    tooltip: new i3.Tooltip("Select an extension container in the view to extend where record editor fields from this view will be injected.\n            The records defined for the view to extend and for this view must be associated one-to-one."),
                    options: targetExtensionContainerOptions || [],
                    required: true,
                    beforeValueChange: function (oldValue, newValue) {
                        return _this.isTargetRecordDefinitionChanged(oldValue, newValue)
                            .pipe(operators.withLatestFrom(_this.viewDesignerFacade.viewComponentModels$), operators.map(function (_a) {
                            var _b = __read(_a, 2), isRecordDefinitionChanged = _b[0], viewComponentModels = _b[1];
                            return !lodash.isEmpty(viewComponentModels) && isRecordDefinitionChanged;
                        }), operators.take(1))
                            .toPromise()
                            .then(function (isConfirmationRequired) { return isConfirmationRequired
                            ? _this.rxModalService.confirm({
                                title: 'Warning',
                                modalStyle: i5$1.RX_MODAL.modalStyles.warning,
                                message: 'The view canvas will be cleared. Do you want to continue?'
                            })
                            : true; });
                    }
                }
            };
            var layout = [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'displayName',
                            component: i3$1.TextFormControlComponent,
                            isDisabled: Boolean(viewDesignModel.lastUpdateTime),
                            options: {
                                required: true,
                                label: 'Name'
                            }
                        },
                        {
                            name: 'description',
                            component: i3$1.TextareaFormControlComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                label: 'Description',
                                rows: 3
                            }
                        },
                        {
                            name: 'layoutName',
                            component: i3$1.TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: 'Layout template'
                            }
                        },
                        {
                            name: 'targetViewDefinitionName',
                            component: i3$1.RxDefinitionPickerComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                label: 'View to extend',
                                tooltip: new i3.Tooltip("Select a view to extend in order to inject this view into it.\n                The view to extend may be read-only, but must contain at least one Record editor with an Extension container."),
                                definitionType: i3$1.RxDefinitionPickerType.View,
                                beforeValueChange: function (oldValue, newValue) { return _this.viewDesignerFacade.viewComponentModels$
                                    .pipe(operators.first(), operators.withLatestFrom(_this.viewDesignerFacade.viewModel$))
                                    .toPromise()
                                    .then(function (_a) {
                                    var _b = __read(_a, 2), components = _b[0], viewModel = _b[1];
                                    var isViewParametersPresent = Boolean(!(oldValue === null || oldValue === void 0 ? void 0 : oldValue.length) &&
                                        newValue.length &&
                                        (viewModel.inputParams.length || viewModel.outputParams.length));
                                    var message;
                                    if (!lodash.isEmpty(components) && isViewParametersPresent) {
                                        message =
                                            'The view canvas, input and output parameters will be cleared. Do you want to continue?';
                                    }
                                    else if (!lodash.isEmpty(components)) {
                                        message = 'The view canvas will be cleared. Do you want to continue?';
                                    }
                                    else if (isViewParametersPresent) {
                                        message = 'The input and output parameters will be cleared. Do you want to continue?';
                                    }
                                    return message
                                        ? _this.rxModalService.confirm({
                                            title: 'Warning',
                                            modalStyle: i5$1.RX_MODAL.modalStyles.warning,
                                            message: message
                                        })
                                        : true;
                                }); }
                            }
                        },
                        {
                            name: 'styles',
                            component: i3$1.TagsFormControlComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                label: 'CSS classes',
                                placeholder: 'Add CSS classes',
                                tooltip: new i3.Tooltip('Enter CSS class names to apply to this view.'),
                                errorCheck: validateCssClassName
                            }
                        },
                        {
                            name: 'permissions',
                            component: i3$1.RxPermissionEditorComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                label: 'Permissions',
                                type: 'view'
                            }
                        },
                        {
                            component: RxViewRevertCustomizationComponent
                        },
                        {
                            component: RxViewCustomizationOptionsComponent
                        }
                    ]
                },
                {
                    label: 'Input parameters',
                    controls: [
                        {
                            name: 'inputParams',
                            component: i3$1.ListFormControlComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                addItemText: 'Add',
                                emptyListText: 'No input parameters added.',
                                items: [
                                    {
                                        label: 'Name',
                                        propertyName: 'name'
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    label: 'Output parameters',
                    controls: [
                        {
                            name: 'outputParams',
                            component: i3$1.ListFormControlComponent,
                            isDisabled: !isCustomizationAllowed,
                            options: {
                                addItemText: 'Add',
                                emptyListText: 'No output parameters added.',
                                items: [
                                    {
                                        label: 'Name',
                                        propertyName: 'name'
                                    },
                                    {
                                        label: 'Source',
                                        propertyName: 'source',
                                        dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                        operators: this.expressionConfigurator.getOperators()
                                    }
                                ]
                            }
                        }
                    ]
                }
            ];
            if (availablePageComponents.length) {
                layout[0].controls.splice(2, 0, pageComponentControl);
            }
            // hide 'View to extend' and 'Extention container' controls if a page component is selected
            if (viewDesignModel.pageComponent) {
                layout.splice(1, 2);
                layout[0].controls.splice(lodash.findIndex(layout[0].controls, { name: 'targetViewDefinitionName' }), 1);
            }
            if (viewDesignModel.targetViewDefinitionName) {
                var targetViewDefinitionNameControlIndex = lodash.findIndex(layout[0].controls, { name: 'targetViewDefinitionName' });
                layout[0].controls.splice(targetViewDefinitionNameControlIndex + 1, 0, extensionContainerControl);
                // hide 'Page component' control if 'View to extend' is selected
                layout[0].controls.splice(lodash.findIndex(layout[0].controls, { name: 'pageComponent' }), 1);
                // hide 'Input parameters' and 'Output parameters' control if 'View to extend' is selected
                layout.splice(1, 2);
                this.viewDesignerFacade.updateViewProperties({
                    inputParams: [],
                    outputParams: []
                });
            }
            return {
                inspectorSectionConfigs: layout
            };
        };
        RxViewModel.prototype.validateDisplayName = function () {
            var _this = this;
            // View definition names for validation will be loaded only in case if user changes view name.
            return this.viewDesignerFacade
                .getViewPropertyValue('displayName')
                .pipe(operators.switchMap(function (displayName) { return rxjs.combineLatest([
                rxjs.of(displayName
                    ? i11.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(displayName)
                        ? null
                        : {
                            type: 'error',
                            propertyName: 'displayName',
                            description: 'View name can only contain letters, numbers, spaces, dashes, and underscores.'
                        }
                    : {
                        type: 'error',
                        propertyName: 'displayName',
                        description: 'View name cannot be blank.'
                    }),
                _this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime').pipe(operators.switchMap(function (lastUpdateTime) { return displayName && !lastUpdateTime
                    ? _this.allViewDefinitionNamesByBundleId$.pipe(operators.map(function (viewDefinitionNames) {
                        var isNameAlreadyExists = !lastUpdateTime &&
                            (viewDefinitionNames === null || viewDefinitionNames === void 0 ? void 0 : viewDefinitionNames.some(function (name) { return _this.rxStringService.caseInsensitiveIsEqual(displayName, name); }));
                        return isNameAlreadyExists
                            ? {
                                type: 'error',
                                propertyName: 'displayName',
                                description: 'View definition with this name already exists.'
                            }
                            : null;
                    }), operators.take(1))
                    : rxjs.of(null); }), operators.take(1))
            ]); }))
                .pipe(operators.map(lodash.compact));
        };
        RxViewModel.prototype.validateInputParams = function () {
            return this.viewDesignerFacade.getViewPropertyValue('inputParams').pipe(operators.map(function (inputParams) {
                var notBlankInputParams = lodash.flow(function (params) { return lodash.map(params, function (param) { return param.name; }); }, lodash.compact)(inputParams);
                var uniqueInputParams = lodash.uniq(notBlankInputParams);
                var validationIssues = [];
                if (inputParams.length && notBlankInputParams.length !== inputParams.length) {
                    validationIssues.push({
                        type: 'error',
                        propertyName: 'inputParams',
                        description: 'Input parameter name cannot be blank.'
                    });
                }
                if (notBlankInputParams.length !== uniqueInputParams.length) {
                    validationIssues.push({
                        type: 'error',
                        propertyName: 'inputParams',
                        description: 'Input parameter names must be unique.'
                    });
                }
                return validationIssues;
            }));
        };
        RxViewModel.prototype.validateOutputParamExpressions = function () {
            var _this = this;
            return this.viewDesignerFacade.getViewPropertyValue('outputParams').pipe(operators.map(function (outputParams) { return lodash.map(outputParams, function (param) { return param.source; }).filter(Boolean); }), operators.distinctUntilChanged(lodash.isEqual), operators.switchMap(function (sourceValues) { return sourceValues.length
                ? rxjs.combineLatest(sourceValues.map(function (value) { return _this.rxViewExpressionValidatorService.validate(value, 'source', 'Output parameter source'); })).pipe(operators.map(lodash.flatten))
                : rxjs.of([]); }));
        };
        RxViewModel.prototype.validateExtensionContainer = function () {
            return rxjs.combineLatest([
                this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName'),
                this.viewDesignerFacade.getViewPropertyValue('targetExtensionContainerGuid')
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), targetViewDefinitionName = _b[0], targetExtensionContainerGuid = _b[1];
                return targetViewDefinitionName && !targetExtensionContainerGuid
                    ? {
                        type: 'error',
                        propertyName: 'targetExtensionContainerGuid',
                        description: 'Extension container cannot be blank.'
                    }
                    : null;
            }));
        };
        RxViewModel.prototype.getViewCommonDataDictionary = function (inputParams) {
            return {
                label: 'View',
                expression: '${view.api}',
                icon: 'd-icon-file_o',
                expanded: true,
                children: __spreadArray(__spreadArray([], __read((lodash.isEmpty(inputParams)
                    ? []
                    : [
                        {
                            label: 'Input parameters',
                            expanded: true,
                            children: inputParams
                                .filter(function (param) { return param.name; })
                                .map(function (param) { return ({
                                label: param.name,
                                expression: "${view.inputParams." + param.name + "}",
                                icon: 'd-icon-arrow_right_square_input'
                            }); })
                        }
                    ]))), [
                    {
                        label: 'Properties',
                        expanded: true,
                        children: [
                            {
                                label: 'Is valid',
                                expression: '${view.isValid}',
                                icon: 'd-icon-arrow_right_square_input'
                            }
                        ]
                    }
                ])
            };
        };
        RxViewModel.prototype.isTargetRecordDefinitionChanged = function (previousTargetExtensionContainerGuid, currentTargetExtensionContainerGuid) {
            var _this = this;
            return this.targetViewDefinition$.pipe(operators.map(function (viewDefinition) {
                var previousTargetRecordDefinitionName = _this.getTargetRecordDefinitionName(viewDefinition, previousTargetExtensionContainerGuid);
                var currentTargetRecordDefinitionName = _this.getTargetRecordDefinitionName(viewDefinition, currentTargetExtensionContainerGuid);
                return previousTargetRecordDefinitionName !== currentTargetRecordDefinitionName;
            }));
        };
        RxViewModel.prototype.getTargetRecordDefinitionName = function (viewDefinition, targetExtensionContainerGuid) {
            var targetRecordEditor = this.rxViewDefinitionParserService.findParentComponentDefinition(viewDefinition, { guid: targetExtensionContainerGuid }, function (definition) { return definition.type === i5.RxViewComponentType.RecordEditor; });
            return targetRecordEditor === null || targetRecordEditor === void 0 ? void 0 : targetRecordEditor.propertiesByName.recordDefinitionName;
        };
        return RxViewModel;
    }());
    RxViewModel.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewModel, deps: [{ token: i0__namespace.Injector }, { token: ViewDesignerFacade }, { token: i2__namespace$1.RxStringService }, { token: i3__namespace.RxOverlayService }, { token: i5__namespace.RxViewComponentRegistryService }, { token: i3__namespace.RxBundleCacheService }, { token: i5__namespace$1.RxModalService }, { token: i5__namespace.RxViewDefinitionCacheService }, { token: i5__namespace.RxViewDefinitionParserService }, { token: i2__namespace$1.RxGuidService }, { token: ViewDesignerDispatcher }, { token: i3__namespace.RxDefinitionNameService }, { token: RxViewExpressionValidatorService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewModel.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewModel });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewModel, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: ViewDesignerFacade }, { type: i2__namespace$1.RxStringService }, { type: i3__namespace.RxOverlayService }, { type: i5__namespace.RxViewComponentRegistryService }, { type: i3__namespace.RxBundleCacheService }, { type: i5__namespace$1.RxModalService }, { type: i5__namespace.RxViewDefinitionCacheService }, { type: i5__namespace.RxViewDefinitionParserService }, { type: i2__namespace$1.RxGuidService }, { type: ViewDesignerDispatcher }, { type: i3__namespace.RxDefinitionNameService }, { type: RxViewExpressionValidatorService }]; } });

    /* tslint:disable:variable-name */
    var ViewDesignerCanvasItemApiToken = new i0.InjectionToken('CanvasItemApi');

    var CanvasItemApi = /** @class */ (function () {
        function CanvasItemApi() {
            this.core = null;
        }
        CanvasItemApi.prototype.registerCoreApi = function (apiObject) {
            this.core = apiObject;
        };
        return CanvasItemApi;
    }());
    CanvasItemApi.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemApi, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    CanvasItemApi.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemApi });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemApi, decorators: [{
                type: i0.Injectable
            }] });

    var DropComponentData = /** @class */ (function () {
        function DropComponentData(data, targetGuid, outletName, insertIndex) {
            this.data = data;
            this.targetGuid = targetGuid;
            this.outletName = outletName;
            this.insertIndex = insertIndex;
        }
        return DropComponentData;
    }());

    var ViewDesignerCanvasService = /** @class */ (function () {
        function ViewDesignerCanvasService() {
            this.componentSelectSubject = new rxjs.ReplaySubject();
            this.componentRemoveSubject = new rxjs.ReplaySubject();
            this.componentDropSubject = new rxjs.ReplaySubject();
            this.componentDrop$ = this.componentDropSubject.asObservable();
            this.componentSelect$ = this.componentSelectSubject.asObservable();
            this.componentRemove$ = this.componentRemoveSubject.asObservable();
        }
        ViewDesignerCanvasService.prototype.selectComponent = function (guid) {
            this.componentSelectSubject.next(guid);
        };
        ViewDesignerCanvasService.prototype.removeComponent = function (guid) {
            this.componentRemoveSubject.next(guid);
        };
        ViewDesignerCanvasService.prototype.dropComponent = function (data, targetGuid, outletName, insertIndex) {
            this.componentDropSubject.next(new DropComponentData(data, targetGuid, outletName, insertIndex));
        };
        return ViewDesignerCanvasService;
    }());
    ViewDesignerCanvasService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ViewDesignerCanvasService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasService, decorators: [{
                type: i0.Injectable
            }] });

    var CanvasItemComponent = /** @class */ (function () {
        function CanvasItemComponent(injector, renderer, canvasItemApi, viewDesignerCanvasService) {
            this.injector = injector;
            this.renderer = renderer;
            this.canvasItemApi = canvasItemApi;
            this.viewDesignerCanvasService = viewDesignerCanvasService;
            this.interactive = true;
            this.childContainers = new Map();
        }
        CanvasItemComponent.prototype.ngOnInit = function () {
            this.initializeItemApi();
        };
        CanvasItemComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var layoutChange = changes.layout;
            if (layoutChange) {
                var prevGuid = lodash.get(layoutChange, 'previousValue.guid');
                var currGuid = lodash.get(layoutChange, 'currentValue.guid');
                var prevOutlets = lodash.get(layoutChange, 'previousValue.outlets');
                var currOutlets = lodash.get(layoutChange, 'currentValue.outlets');
                if (prevGuid !== currGuid) {
                    if (this.componentReference) {
                        this.cleanUp();
                    }
                    this.renderViewComponent();
                }
                else if (!lodash.isEqual(prevOutlets, currOutlets)) {
                    currOutlets.forEach(function (outlet) {
                        var ref = _this.childContainers.get(outlet.name);
                        if (ref) {
                            ref.instance.outlet = outlet;
                            ref.instance.layout = _this.layout;
                        }
                    });
                }
            }
        };
        CanvasItemComponent.prototype.ngOnDestroy = function () {
            this.cleanUp();
        };
        CanvasItemComponent.prototype.cleanUp = function () {
            this.componentReference.destroy();
            this.childContainers.clear();
        };
        CanvasItemComponent.prototype.registerOutlet = function (outletName, outletViewContainerRef, containerFactory) {
            var currentOutlet = this.layout.outlets.find(function (outlet) { return outlet.name === outletName; });
            var componentRef = this.renderContainerComponent(outletViewContainerRef, currentOutlet, containerFactory);
            this.childContainers.set(outletName, componentRef);
            return componentRef;
        };
        CanvasItemComponent.prototype.onSelectComponent = function (event) {
            if (this.interactive) {
                event.stopPropagation();
                this.viewDesignerCanvasService.selectComponent(this.layout.guid);
            }
        };
        CanvasItemComponent.prototype.dropComponent = function (transferData, insertIndex, outletName) {
            if (outletName === void 0) { outletName = i5.RX_VIEW_DEFINITION.defaultOutletName; }
            this.viewDesignerCanvasService.dropComponent(transferData, this.layout.guid, outletName, insertIndex);
        };
        CanvasItemComponent.prototype.initializeItemApi = function () {
            this.canvasItemApi.registerCoreApi({
                dropComponent: this.dropComponent.bind(this),
                registerOutlet: this.registerOutlet.bind(this)
            });
        };
        CanvasItemComponent.prototype.renderViewComponent = function () {
            this.componentReference = this.container.createComponent(this.layout.factory, null, this.injector);
            var instance = this.componentReference.instance;
            var nativeElement = this.componentReference.location.nativeElement;
            instance.guid = this.layout.guid;
            instance.model = this.layout.model;
            instance.isReadOnly = this.isReadOnly;
            this.renderer.setAttribute(nativeElement, 'rx-view-component-id', this.layout.guid);
        };
        CanvasItemComponent.prototype.renderContainerComponent = function (outletViewContainerRef, outlet, containerFactory) {
            var containerRef = outletViewContainerRef.createComponent(containerFactory);
            containerRef.instance.outlet = outlet;
            containerRef.instance.layout = this.layout;
            containerRef.instance.isReadOnly = this.isReadOnly;
            return containerRef;
        };
        return CanvasItemComponent;
    }());
    CanvasItemComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemComponent, deps: [{ token: i0__namespace.Injector }, { token: i0__namespace.Renderer2 }, { token: ViewDesignerCanvasItemApiToken }, { token: ViewDesignerCanvasService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CanvasItemComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemComponent, selector: "rx-canvas-item", inputs: { layout: "layout", interactive: "interactive", isReadOnly: "isReadOnly" }, providers: [
            {
                provide: ViewDesignerCanvasItemApiToken,
                useClass: CanvasItemApi
            }
        ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<div [hidden]=\"layout?.model?.hiddenOnCanvas$ | async\" (click)=\"onSelectComponent($event)\">\n  <ng-container #container></ng-container>\n</div>\n", pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-canvas-item',
                        templateUrl: './canvas-item.component.html',
                        providers: [
                            {
                                provide: ViewDesignerCanvasItemApiToken,
                                useClass: CanvasItemApi
                            }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.Injector }, { type: i0__namespace.Renderer2 }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [ViewDesignerCanvasItemApiToken]
                        }] }, { type: ViewDesignerCanvasService }];
        }, propDecorators: { layout: [{
                    type: i0.Input
                }], interactive: [{
                    type: i0.Input
                }], isReadOnly: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef, static: true }]
                }] } });

    var ViewDesignerCanvasComponent = /** @class */ (function () {
        function ViewDesignerCanvasComponent(viewDesignerCanvasService) {
            this.viewDesignerCanvasService = viewDesignerCanvasService;
            this.componentSelect = new i0.EventEmitter();
            this.componentDrop = new i0.EventEmitter();
            this.componentRemove = new i0.EventEmitter();
            this.beforeComponentDropInRoot = new i0.EventEmitter();
        }
        ViewDesignerCanvasComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.viewDesignerCanvasService.componentSelect$.subscribe(function (event) {
                _this.componentSelect.emit(event);
            });
            this.viewDesignerCanvasService.componentRemove$.subscribe(function (event) {
                _this.componentRemove.emit(event);
            });
            this.viewDesignerCanvasService.componentDrop$.subscribe(function (event) {
                _this.componentDrop.emit(event);
            });
        };
        return ViewDesignerCanvasComponent;
    }());
    ViewDesignerCanvasComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasComponent, deps: [{ token: ViewDesignerCanvasService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ViewDesignerCanvasComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerCanvasComponent, selector: "rx-view-designer-canvas", inputs: { layout: "layout", isReadOnly: "isReadOnly" }, outputs: { componentSelect: "componentSelect", componentDrop: "componentDrop", componentRemove: "componentRemove", beforeComponentDropInRoot: "beforeComponentDropInRoot" }, providers: [ViewDesignerCanvasService], ngImport: i0__namespace, template: "<rx-canvas-item class=\"root-item\" *ngIf=\"layout\" [layout]=\"layout\" [isReadOnly]=\"isReadOnly\"></rx-canvas-item>\n", components: [{ type: CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-view-designer-canvas',
                        templateUrl: './view-designer-canvas.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [ViewDesignerCanvasService]
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerCanvasService }]; }, propDecorators: { layout: [{
                    type: i0.Input
                }], isReadOnly: [{
                    type: i0.Input
                }], componentSelect: [{
                    type: i0.Output
                }], componentDrop: [{
                    type: i0.Output
                }], componentRemove: [{
                    type: i0.Output
                }], beforeComponentDropInRoot: [{
                    type: i0.Output
                }] } });

    var CanvasOutletHelperService = /** @class */ (function () {
        function CanvasOutletHelperService() {
            this.beforeViewComponentDropSubject = new rxjs.ReplaySubject();
            this.beforeViewComponentDrop$ = this.beforeViewComponentDropSubject.asObservable();
        }
        CanvasOutletHelperService.prototype.setBeforeViewComponentDropState = function (viewComponentDropData) {
            this.beforeViewComponentDropSubject.next(viewComponentDropData);
        };
        CanvasOutletHelperService.prototype.canBeDropped = function (data) {
            var canBeInsertedInto = true;
            if (lodash.isFunction(data.draggedViewComponentDescriptor.canBeInsertedInto)) {
                canBeInsertedInto = data.draggedViewComponentDescriptor.canBeInsertedInto(data.dropTargetViewComponentWithParents.map(function (component) { return component.type; }));
            }
            if (canBeInsertedInto) {
                canBeInsertedInto =
                    (!data.draggedViewComponentGuid ||
                        !this._isParentRecordEditorChanging(this.containerComponentInstance['layout'].viewComponentWithParents, data.draggedViewComponentParents)) &&
                        this.componentDropPredicate(data);
            }
            return canBeInsertedInto;
        };
        CanvasOutletHelperService.prototype.componentDropPredicate = function (data, skipPredicate) {
            if (skipPredicate === void 0) { skipPredicate = false; }
            return ((skipPredicate || this.dropPredicate(data)) &&
                (!this.parentOutletComponent || this.parentOutletComponent.componentDropPredicate(data, this.skipParentPredicate)));
        };
        CanvasOutletHelperService.prototype._isParentRecordEditorChanging = function (targetContainerParentComponents, sourceComponentParentComponents) {
            var targetRecordEditor = lodash.find(targetContainerParentComponents, {
                type: i5.RxViewComponentType.RecordEditor
            });
            var sourceRecordEditor = lodash.find(sourceComponentParentComponents, {
                type: i5.RxViewComponentType.RecordEditor
            });
            var isMovingBetweenRecordEditors = Boolean(targetRecordEditor) && Boolean(sourceRecordEditor) && targetRecordEditor.guid !== sourceRecordEditor.guid;
            var isDroppingOutsideRecordEditor = !targetRecordEditor && Boolean(sourceRecordEditor);
            var isDroppingInsideRecordEditor = !sourceRecordEditor && Boolean(targetRecordEditor);
            return isMovingBetweenRecordEditors || isDroppingOutsideRecordEditor || isDroppingInsideRecordEditor;
        };
        return CanvasOutletHelperService;
    }());
    CanvasOutletHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasOutletHelperService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    CanvasOutletHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasOutletHelperService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasOutletHelperService, decorators: [{
                type: i0.Injectable
            }] });

    var CanvasItemColumnComponent = /** @class */ (function () {
        function CanvasItemColumnComponent(viewDesignerCanvasService, canvasOutletHelperService) {
            this.viewDesignerCanvasService = viewDesignerCanvasService;
            this.canvasOutletHelperService = canvasOutletHelperService;
            this.dropListDropped = new i0.EventEmitter();
            this.dropListEnterPredicateBind = lodash.throttle(this.dropListEnterPredicate.bind(this), 200);
        }
        CanvasItemColumnComponent.prototype.ngOnInit = function () {
            this.dropListOrientation = this.canvasOutletHelperService.dropListOrientation;
        };
        CanvasItemColumnComponent.prototype.getViewComponentDragData = function (layout) {
            return {
                draggedViewComponentGuid: layout.guid,
                draggedViewComponentDescriptor: layout.descriptor,
                draggedViewComponentParents: this.layout.viewComponentWithParents
            };
        };
        CanvasItemColumnComponent.prototype.onDragEntered = function (event) {
            this.enforceDragToSelf(event.container);
        };
        CanvasItemColumnComponent.prototype.onDragStarted = function (event) {
            this.enforceDragToSelf(event.source.dropContainer);
        };
        CanvasItemColumnComponent.prototype.remove = function (event, layout) {
            event.stopPropagation();
            this.viewDesignerCanvasService.removeComponent(layout.guid);
        };
        CanvasItemColumnComponent.prototype.onSelectComponent = function (event, layout) {
            event.stopPropagation();
            this.viewDesignerCanvasService.selectComponent(layout.guid);
        };
        CanvasItemColumnComponent.prototype.trackByFn = function (index, item) {
            return item.guid;
        };
        CanvasItemColumnComponent.prototype.dropListEnterPredicate = function (event) {
            return this.canvasOutletHelperService.canBeDropped(Object.assign(Object.assign({}, event.data), { dropTargetViewComponentWithParents: this.layout.viewComponentWithParents || [] }));
        };
        // todo remove after
        // https://github.com/angular/components/issues/16671
        // will be fixed
        CanvasItemColumnComponent.prototype.enforceDragToSelf = function (dropList) {
            var siblings = dropList.connectedTo;
            siblings = siblings.reduce(function (result, item) {
                if (lodash.isString(item)) {
                    var listInstance = i4$1.CdkDropList['_dropLists'].find(function (list) { return list.id === item; });
                    if (listInstance) {
                        result.push(listInstance);
                    }
                }
                return result;
            }, []);
            var dropListRef = dropList._dropListRef;
            rxjs.asapScheduler.schedule(function () {
                dropListRef.connectedTo(siblings.map(function (list) { return list._dropListRef; }));
            });
        };
        return CanvasItemColumnComponent;
    }());
    CanvasItemColumnComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemColumnComponent, deps: [{ token: ViewDesignerCanvasService }, { token: CanvasOutletHelperService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CanvasItemColumnComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: { isReadOnly: "isReadOnly", colIndex: "colIndex", column: "column", layout: "layout" }, outputs: { dropListDropped: "dropListDropped" }, ngImport: i0__namespace, template: "<div\n  cdkDropList\n  [cdkDropListOrientation]=\"dropListOrientation\"\n  [cdkDropListConnectedTo]=\"column.dndListIds\"\n  (cdkDropListDropped)=\"dropListDropped.next($event)\"\n  [cdkDropListEnterPredicate]=\"dropListEnterPredicateBind\"\n  [cdkDropListData]=\"{ columnIndex: colIndex }\"\n  [id]=\"column.listId\"\n>\n  <!-- mw-100 class is used for DnD to restrict component width, see DRD21-5845 for more details -->\n  <div\n    class=\"canvas-item-wrapper mw-100 canvas-{{ layout.descriptor.type }}\"\n    cdkDrag\n    [cdkDragData]=\"getViewComponentDragData(layout)\"\n    [cdkDragDisabled]=\"isReadOnly || layout.descriptor.options?.static\"\n    (cdkDragEntered)=\"onDragEntered($event)\"\n    (cdkDragStarted)=\"onDragStarted($event)\"\n    *ngFor=\"let layout of column.children; let last = last; trackBy: trackByFn\"\n  >\n    <div class=\"canvas-item\" [class.active]=\"layout.isSelected$ | async\" (click)=\"onSelectComponent($event, layout)\">\n      <div class=\"canvas-item-header\" [hidden]=\"!(layout.isSelected$ | async)\" cdkDragHandle>\n        <span class=\"icon d-icon-dots mr-1\"></span>\n        <span class=\"label\">{{ layout.label }}</span>\n\n        <button\n          (click)=\"remove($event, layout)\"\n          *ngIf=\"!isReadOnly && !layout.descriptor.options?.static\"\n          class=\"remove-button btn btn-sm btn-link d-icon-cross_adapt p-0 px-1\"\n          type=\"button\"\n          aria-label=\"Close\"\n        ></button>\n      </div>\n\n      <rx-canvas-item [layout]=\"layout\" [isReadOnly]=\"isReadOnly\"></rx-canvas-item>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}.cdk-drop-list{min-height:100px}.cdk-drop-list>.cdk-drag-placeholder{opacity:.5}.card-header{cursor:move}.canvas-item-wrapper.cdk-drag-preview{background:white;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.canvas-item{border:1px solid transparent;position:relative;padding:3px}.canvas-item.active{border-color:#20c997}.canvas-item-header{color:#fff;position:absolute;top:0;right:0;padding:1px 0 1px 5px;background:#20c997;cursor:move;z-index:1;display:flex}.canvas-item-header .label{white-space:nowrap}.remove-button{color:#fff}\n"], components: [{ type: CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i4__namespace$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i4__namespace$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemColumnComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-canvas-item-column',
                        templateUrl: './canvas-item-column.component.html',
                        styleUrls: ['./canvas-item-column.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerCanvasService }, { type: CanvasOutletHelperService }]; }, propDecorators: { isReadOnly: [{
                    type: i0.Input
                }], colIndex: [{
                    type: i0.Input
                }], column: [{
                    type: i0.Input
                }], layout: [{
                    type: i0.Input
                }], dropListDropped: [{
                    type: i0.Output
                }] } });

    var CanvasItemContainerComponent = /** @class */ (function () {
        function CanvasItemContainerComponent(canvasItemApi, canvasOutletHelperService) {
            this.canvasItemApi = canvasItemApi;
            this.canvasOutletHelperService = canvasOutletHelperService;
        }
        CanvasItemContainerComponent.prototype.trackByColFn = function (index, item) {
            return item.listId;
        };
        CanvasItemContainerComponent.prototype.onDropListDropped = function (event) {
            var viewComponentDropData = Object.assign(Object.assign({}, event.item.data), { initialPropertiesByName: {}, columnIndex: event.container.data.columnIndex });
            this.canvasOutletHelperService.setBeforeViewComponentDropState(viewComponentDropData);
            if (!viewComponentDropData.preventDrop) {
                this.canvasItemApi.core.dropComponent(viewComponentDropData, event.currentIndex, this.outlet.name);
            }
        };
        return CanvasItemContainerComponent;
    }());
    CanvasItemContainerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemContainerComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: CanvasOutletHelperService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CanvasItemContainerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemContainerComponent, selector: "rx-canvas-item-container", inputs: { outlet: "outlet", isReadOnly: "isReadOnly", layout: "layout" }, ngImport: i0__namespace, template: "<div class=\"row\">\n  <div\n    *ngFor=\"let column of outlet.columns; let colIndex = index; let isLastCol = last; trackBy: trackByColFn\"\n    class=\"{{ column.span ? 'col-' + column.span : 'col' }}\"\n    [ngClass]=\"{ 'col-border': !isLastCol }\"\n  >\n    <rx-canvas-item-column\n      [ngClass]=\"{ 'mb-3': !isLastCol }\"\n      [isReadOnly]=\"isReadOnly\"\n      [colIndex]=\"colIndex\"\n      [column]=\"column\"\n      [layout]=\"layout\"\n      (dropListDropped)=\"onDropListDropped($event)\"\n    ></rx-canvas-item-column>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.col-border{border-right:1px dashed #d6d7d8}\n"], components: [{ type: CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: ["isReadOnly", "colIndex", "column", "layout"], outputs: ["dropListDropped"] }], directives: [{ type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasItemContainerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-canvas-item-container',
                        templateUrl: './canvas-item-container.component.html',
                        styleUrls: ['./canvas-item-container.component.scss']
                    }]
            }], ctorParameters: function () {
            return [{ type: CanvasItemApi, decorators: [{
                            type: i0.Inject,
                            args: [ViewDesignerCanvasItemApiToken]
                        }] }, { type: CanvasOutletHelperService }];
        }, propDecorators: { outlet: [{
                    type: i0.Input
                }], isReadOnly: [{
                    type: i0.Input
                }], layout: [{
                    type: i0.Input
                }] } });

    var CanvasOutletComponent = /** @class */ (function () {
        function CanvasOutletComponent(canvasItemApi, parentOutletComponent, canvasOutletHelperService, componentFactoryResolver) {
            this.canvasItemApi = canvasItemApi;
            this.parentOutletComponent = parentOutletComponent;
            this.canvasOutletHelperService = canvasOutletHelperService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.containerComponentInstance = null;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.name = i5.RX_VIEW_DEFINITION.defaultOutletName;
            this.skipParentPredicate = false;
            this.dropListOrientation = 'vertical';
            this.beforeViewComponentDrop = new i0.EventEmitter();
            this.dropPredicate = function () { return true; };
        }
        CanvasOutletComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        CanvasOutletComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.containerComponentInstance = this.canvasItemApi.core.registerOutlet(this.name, this.container, this.componentFactoryResolver.resolveComponentFactory(this.containerComponent || CanvasItemContainerComponent)).instance;
            this.canvasOutletHelperService.dropListOrientation = this.dropListOrientation;
            this.canvasOutletHelperService.parentOutletComponent = this.parentOutletComponent;
            this.canvasOutletHelperService.dropPredicate = this.dropPredicate;
            this.canvasOutletHelperService.skipParentPredicate = this.skipParentPredicate;
            this.canvasOutletHelperService.containerComponentInstance = this.containerComponentInstance;
            this.canvasOutletHelperService.beforeViewComponentDrop$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (event) {
                _this.beforeViewComponentDrop.emit(event);
            });
        };
        CanvasOutletComponent.prototype.canBeDropped = function (data) {
            return this.canvasOutletHelperService.canBeDropped(data);
        };
        CanvasOutletComponent.prototype.componentDropPredicate = function (data, skipPredicate) {
            if (skipPredicate === void 0) { skipPredicate = false; }
            return this.canvasOutletHelperService.componentDropPredicate(data, skipPredicate);
        };
        return CanvasOutletComponent;
    }());
    CanvasOutletComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasOutletComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: CanvasOutletComponent, optional: true, skipSelf: true }, { token: CanvasOutletHelperService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CanvasOutletComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: { name: "name", skipParentPredicate: "skipParentPredicate", containerComponent: "containerComponent", dropListOrientation: "dropListOrientation", dropPredicate: "dropPredicate" }, outputs: { beforeViewComponentDrop: "beforeViewComponentDrop" }, providers: [CanvasOutletHelperService], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], ngImport: i0__namespace, template: "<ng-container #container></ng-container>\n" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CanvasOutletComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-canvas-outlet',
                        templateUrl: './canvas-outlet.component.html',
                        providers: [CanvasOutletHelperService]
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [ViewDesignerCanvasItemApiToken]
                        }] }, { type: CanvasOutletComponent, decorators: [{
                            type: i0.SkipSelf
                        }, {
                            type: i0.Optional
                        }] }, { type: CanvasOutletHelperService }, { type: i0__namespace.ComponentFactoryResolver }];
        }, propDecorators: { name: [{
                    type: i0.Input
                }], skipParentPredicate: [{
                    type: i0.Input
                }], containerComponent: [{
                    type: i0.Input
                }], dropListOrientation: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef, static: true }]
                }], beforeViewComponentDrop: [{
                    type: i0.Output
                }], dropPredicate: [{
                    type: i0.Input
                }] } });

    var DesignerComponent = /** @class */ (function () {
        function DesignerComponent(canvasItemComponent, viewDesignerCanvasComponent) {
            this.canvasItemComponent = canvasItemComponent;
            this.viewDesignerCanvasComponent = viewDesignerCanvasComponent;
            this.defaultOutletName = i5.RX_VIEW_DEFINITION.defaultOutletName;
        }
        DesignerComponent.prototype.trackByFn = function (index, item) {
            return item.name;
        };
        return DesignerComponent;
    }());
    DesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DesignerComponent, deps: [{ token: CanvasItemComponent }, { token: ViewDesignerCanvasComponent }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DesignerComponent, selector: "rx-designer", ngImport: i0__namespace, template: "<rx-canvas-outlet\n  [class.border]=\"canvasItemComponent.layout.outlets.length > 1\"\n  [class.default-outlet]=\"outlet.name === defaultOutletName\"\n  *ngFor=\"let outlet of canvasItemComponent.layout.outlets; trackBy: trackByFn\"\n  [name]=\"outlet.name\"\n  (beforeViewComponentDrop)=\"viewDesignerCanvasComponent.beforeComponentDropInRoot.emit($event)\"\n></rx-canvas-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-canvas-outlet{display:block}rx-canvas-outlet.default-outlet:not(:only-child) ::ng-deep>rx-canvas-item-container>.row>*>rx-canvas-item-column>.cdk-drop-list{min-height:300px}rx-canvas-outlet.default-outlet:only-child ::ng-deep>rx-canvas-item-container>.row>*>rx-canvas-item-column>.cdk-drop-list{min-height:calc(100vh - 155px)}rx-canvas-outlet.border{border:1px solid #d6d7d8}rx-canvas-outlet+rx-canvas-outlet{margin-top:10px}\n"], components: [{ type: CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-designer',
                        templateUrl: './designer.component.html',
                        styleUrls: ['./designer.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: CanvasItemComponent }, { type: ViewDesignerCanvasComponent }]; } });

    var RxViewDesignerModels = /** @class */ (function () {
        function RxViewDesignerModels() {
            this.models = new Map();
        }
        RxViewDesignerModels.prototype.clear = function () {
            this.models.clear();
        };
        RxViewDesignerModels.prototype.set = function (guid, model) {
            this.models.set(guid, model);
        };
        RxViewDesignerModels.prototype.get = function (guid) {
            return this.models.get(guid);
        };
        RxViewDesignerModels.prototype.delete = function (guid) {
            this.models.delete(guid);
        };
        return RxViewDesignerModels;
    }());
    RxViewDesignerModels.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerModels, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDesignerModels.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerModels, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerModels, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxViewDesignerHelperService = /** @class */ (function () {
        function RxViewDesignerHelperService(viewDesignerFacade, rxViewComponentRegistryService, componentFactoryResolver, viewDesignerModels) {
            var _this = this;
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.viewDesignerModels = viewDesignerModels;
            this.designerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DesignerComponent);
            this.canvasDndListIds = [];
            this.extensionViewAllowedComponentTypes = new Set([
                i5.RxViewComponentType.Container,
                i5.RxViewComponentType.RichText,
                i5.RxViewComponentType.RecordEditor,
                i5.RxViewComponentType.Character,
                i5.RxViewComponentType.Textarea,
                i5.RxViewComponentType.Boolean,
                i5.RxViewComponentType.Date,
                i5.RxViewComponentType.DateTime,
                i5.RxViewComponentType.Time,
                i5.RxViewComponentType.Decimal,
                i5.RxViewComponentType.Floating,
                i5.RxViewComponentType.Integer,
                i5.RxViewComponentType.LocalizedCharacter,
                i5.RxViewComponentType.Selection,
                i5.RxViewComponentType.SelectGroup,
                i5.RxViewComponentType.RichTextarea,
                i5.BwfViewComponentType.DynamicNamedList
            ]);
            this.canvasLayout$ = this.getRecursiveViewLayoutGuids().pipe(operators.switchMap(function (guids) { return guids.length
                ? _this.viewDesignerFacade.areViewModelsReady$.pipe(
                // Wait until component models will be instantiated after save view definition.
                operators.filter(Boolean), operators.switchMapTo(_this.viewDesignerFacade.viewDesignerModelState$.pipe(operators.take(1))))
                : _this.viewDesignerFacade.viewDesignerModelState$.pipe(operators.take(1)); }), operators.map(function (designModelState) {
                var viewModel = designModelState.viewDesignModel;
                var componentModels = designModelState.viewComponentDesignModels;
                _this.canvasDndListIds.length = 0;
                return {
                    guid: viewModel.guid,
                    factory: _this.designerComponentFactory,
                    outlets: viewModel.layout.outlets.map(function (outlet) { return ({
                        name: outlet.name,
                        columns: outlet.columns.map(function (column, i) {
                            var listId = String(viewModel.guid + "-" + outlet.name + "-" + i);
                            // do not allow components to be dropped in the root of a SHELL view
                            if (viewModel.type !== i5.ViewDefinitionType.Shell) {
                                _this.canvasDndListIds.push(listId);
                            }
                            return Object.assign(Object.assign({}, column), { children: column.children.map(function (childGuid) { return _this.initializeCanvasItem(childGuid, componentModels, _this.canvasDndListIds); }), listId: listId, dndListIds: _this.canvasDndListIds });
                        })
                    }); }),
                    model: null,
                    descriptor: null,
                    isSelected$: rxjs.of(false)
                };
            }), operators.tap(function () {
                // required for DND
                // https://github.com/angular/components/issues/16671
                _this.canvasDndListIds.reverse();
            }));
            this.viewBreadcrumbItem$ = this.viewDesignerFacade.getViewPropertyValue('displayName').pipe(operators.concatMap(function (displayName) { return rxjs.of(displayName
                ? displayName === i3.RX_APPLICATION.shellDefinitionName
                    ? 'Application shell'
                    : displayName
                : '<New view>'); }), operators.withLatestFrom(this.viewDesignerFacade.viewModelGuid$), operators.map(function (_b) {
                var _c = __read(_b, 2), viewBreadcrumbLabel = _c[0], guid = _c[1];
                return ({
                    label: viewBreadcrumbLabel,
                    data: { guid: guid }
                });
            }));
            this.selectedComponentBreadcrumbItems$ = this.viewDesignerFacade.selectedComponentGuid$.pipe(operators.switchMap(function (componentGuid) { return componentGuid
                ? rxjs.combineLatest([
                    _this.viewDesignerFacade.breadcrumbs$,
                    _this.viewDesignerFacade.getParentComponentGuid(componentGuid)
                ]).pipe(operators.withLatestFrom(_this.viewDesignerFacade.viewComponentModels$), operators.map(function (_b) {
                    var _c = __read(_b, 2), _d = __read(_c[0], 1), breadcrumbs = _d[0], viewComponentModels = _c[1];
                    // Handle empty viewComponentModels state during view definition save.
                    return lodash.isEmpty(viewComponentModels)
                        ? []
                        : findAllParentComponentGuids(componentGuid, viewComponentModels).map(function (parentGuid) {
                            var label = breadcrumbs[parentGuid];
                            if (!label) {
                                var component = viewComponentModels[parentGuid];
                                var descriptor = _this.rxViewComponentRegistryService.get(component.type);
                                label = descriptor.name;
                            }
                            return { label: label, data: { guid: parentGuid } };
                        });
                }))
                : rxjs.of([]); }));
            this.breadcrumbItems$ = rxjs.combineLatest([this.viewBreadcrumbItem$, this.selectedComponentBreadcrumbItems$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), viewItem = _c[0], componentItems = _c[1];
                return __spreadArray([viewItem], __read(componentItems));
            }));
            this.validationIssues$ = this.viewDesignerFacade.validationIssues$.pipe(operators.withLatestFrom(this.viewDesignerFacade.viewDesignerModelState$), operators.map(function (_b) {
                var _c = __read(_b, 2), validationIssuesState = _c[0], modelState = _c[1];
                return lodash.flow(function (state) { return lodash.mergeWith(Object.assign({}, state.issues), state.expressionIssues, function (issues, expressionIssues) {
                    if (issues === void 0) { issues = []; }
                    if (expressionIssues === void 0) { expressionIssues = []; }
                    return issues.concat(expressionIssues);
                }); }, function (issuesByComponentGuid) { return lodash.reduce(issuesByComponentGuid, function (result, issues, guid) {
                    var _a;
                    var name;
                    if (((_a = modelState.viewDesignModel) === null || _a === void 0 ? void 0 : _a.guid) === guid) {
                        name = modelState.viewDesignModel.displayName || 'View designer';
                    }
                    else if (modelState.viewComponentDesignModels[guid]) {
                        var type = modelState.viewComponentDesignModels[guid].type;
                        var descriptor = _this.rxViewComponentRegistryService.get(type);
                        name = descriptor && descriptor.name;
                    }
                    if (name) {
                        result.push({
                            title: name,
                            issues: issues.map(function (issue) { return ({
                                type: issue.type,
                                description: issue.description,
                                disableCorrection: issue.disableCorrection,
                                data: {
                                    guid: guid,
                                    propertyName: issue.propertyName,
                                    data: issue.data
                                }
                            }); })
                        });
                    }
                    return result;
                }, []); })(validationIssuesState);
            }));
        }
        RxViewDesignerHelperService.prototype.getLicensedComponents = function () {
            var _this = this;
            return this.rxViewComponentRegistryService.getLicensedComponents().pipe(operators.first(), operators.map(function (components) { return components.filter(function (component) { return !_this.rxViewComponentRegistryService.isDataComponentDescriptor(component) &&
                !component.hidden &&
                !component.isPageComponent; }); }));
        };
        RxViewDesignerHelperService.prototype.getRecursiveViewLayoutGuids = function () {
            var _this = this;
            return this.viewDesignerFacade
                .getViewPropertyValue('layout')
                .pipe(operators.switchMap(function (layout) { return _this.getRecursiveComponentLayoutGuids(layout); }));
        };
        RxViewDesignerHelperService.prototype.getRecursiveComponentLayoutGuids = function (layout) {
            var _this = this;
            var guids = i5.RxViewLayout.getViewLayoutChildGuids(layout);
            return guids.length
                ? rxjs.combineLatest(guids.map(function (guid) { return _this.viewDesignerFacade
                    .getComponentLayout(guid)
                    .pipe(operators.switchMap(function (childLayout) { return childLayout
                    ? _this.getRecursiveComponentLayoutGuids(childLayout).pipe(operators.map(function (childGuids) { return __spreadArray(__spreadArray([], __read(childGuids)), __read(guids)); }))
                    : rxjs.of(guids); })); }))
                : rxjs.of([]);
        };
        RxViewDesignerHelperService.prototype.initializeCanvasItem = function (componentGuid, componentModels, dndListIds) {
            var _this = this;
            var componentModel = componentModels[componentGuid];
            var descriptor = this.rxViewComponentRegistryService.get(componentModel.type);
            var canvasLayout = {
                guid: componentModel.guid,
                descriptor: descriptor,
                factory: descriptor.designComponentFactory,
                model: this.viewDesignerModels.get(componentModel.guid),
                outlets: [],
                isSelected$: this.viewDesignerFacade.selectedComponentGuid$.pipe(operators.map(function (guid) { return guid === componentModel.guid; })),
                label: descriptor.name
            };
            if (componentModel.layout) {
                canvasLayout.viewComponentWithParents = findAllParentComponentGuids(componentModel.guid, componentModels).map(function (guid) { return ({ guid: guid, type: componentModels[guid].type }); });
                componentModel.layout.outlets.forEach(function (outlet) {
                    var canvasOutlet = {
                        name: outlet.name,
                        columns: outlet.columns.map(function (column, i) {
                            var listId = componentModel.guid + "-" + outlet.name + "-" + i;
                            dndListIds.push(listId);
                            return {
                                children: column.children.map(function (childGuid) { return _this.initializeCanvasItem(childGuid, componentModels, dndListIds); }),
                                span: column.span,
                                listId: listId,
                                dndListIds: dndListIds
                            };
                        })
                    };
                    canvasLayout.outlets.push(canvasOutlet);
                });
            }
            return canvasLayout;
        };
        return RxViewDesignerHelperService;
    }());
    RxViewDesignerHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerHelperService, deps: [{ token: ViewDesignerFacade }, { token: i5__namespace.RxViewComponentRegistryService }, { token: i0__namespace.ComponentFactoryResolver }, { token: RxViewDesignerModels }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDesignerHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerHelperService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerHelperService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: i5__namespace.RxViewComponentRegistryService }, { type: i0__namespace.ComponentFactoryResolver }, { type: RxViewDesignerModels }]; } });

    var RxViewDefinitionGeneratorService = /** @class */ (function () {
        function RxViewDefinitionGeneratorService(rxDefinitionNameService, rxBundleCacheService, viewDesignerModels, rxViewDefinitionLocalizationService) {
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.viewDesignerModels = viewDesignerModels;
            this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
        }
        RxViewDefinitionGeneratorService.prototype.generate = function (viewModel, componentModels, forSave) {
            if (forSave === void 0) { forSave = false; }
            var clonedViewModel = viewModel;
            var viewDefinition = lodash.omit(clonedViewModel, 'displayName', 'layout', 'layoutName', 'pageComponent', 'isAngularJsView');
            viewDefinition.name =
                viewDefinition.name ||
                    this.rxDefinitionNameService.getDefinitionName(this.rxBundleCacheService.bundleId, clonedViewModel.displayName);
            viewDefinition.componentDefinitions = this.generateComponentDefinitions(clonedViewModel, componentModels);
            if (forSave) {
                viewDefinition.localizableStringsByComponentId =
                    this.rxViewDefinitionLocalizationService.extractLocalizableStrings(viewDefinition);
            }
            delete viewDefinition.localizablePropertyToStringGuidMap;
            viewDefinition.layout = JSON.stringify(clonedViewModel.layout);
            return viewDefinition;
        };
        RxViewDefinitionGeneratorService.prototype.generateComponentDefinitions = function (model, componentModelItems) {
            var _this = this;
            return getChildGuidsFromModel(model).map(function (guid) {
                var componentDefinition = Object.assign({}, componentModelItems[guid]);
                var componentModel = _this.viewDesignerModels.get(guid);
                var propertiesByName = lodash.isFunction(componentModel === null || componentModel === void 0 ? void 0 : componentModel.getPropertiesByName)
                    ? componentModel.getPropertiesByName(componentDefinition.propertiesByName)
                    : componentDefinition.propertiesByName;
                componentDefinition.propertiesByName = _this.serializeComponentDefinitionProperties(propertiesByName);
                delete componentDefinition.parentGuid;
                // Move name out of propertiesByName for all components except actions.
                if (componentDefinition.type !== i5.RxViewComponentType.Action &&
                    lodash.has(componentDefinition.propertiesByName, 'name')) {
                    if (componentDefinition.propertiesByName.name) {
                        componentDefinition.name = componentDefinition.propertiesByName.name;
                    }
                    delete componentDefinition.propertiesByName.name;
                }
                if (componentDefinition.layout || componentDefinition.childDataComponentGuids) {
                    componentDefinition.componentDefinitions = _this.generateComponentDefinitions(componentDefinition, componentModelItems);
                    delete componentDefinition.childDataComponentGuids;
                }
                if (componentDefinition.layout) {
                    componentDefinition.layout = JSON.stringify(componentDefinition.layout);
                }
                return componentDefinition;
            });
        };
        RxViewDefinitionGeneratorService.prototype.serializeComponentDefinitionProperties = function (componentProperties) {
            return lodash.transform(componentProperties, function (result, value, key) {
                switch (true) {
                    case lodash.isArray(value):
                    case lodash.isNumber(value):
                    case lodash.isBoolean(value):
                    case lodash.isPlainObject(value):
                        result[key] = JSON.stringify(value);
                        break;
                    case lodash.isObject(value):
                        // support Set, Map
                        var obj_1 = Object.create(null);
                        value.forEach(function (v, k) { return (obj_1[k] = v); });
                        result[key] = JSON.stringify(obj_1);
                        break;
                    case lodash.isFunction(value):
                    case lodash.isUndefined(value):
                        result[key] = null;
                        break;
                    default:
                        result[key] = value;
                        break;
                }
            }, {});
        };
        return RxViewDefinitionGeneratorService;
    }());
    RxViewDefinitionGeneratorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionGeneratorService, deps: [{ token: i3__namespace.RxDefinitionNameService }, { token: i3__namespace.RxBundleCacheService }, { token: RxViewDesignerModels }, { token: i5__namespace.RxViewDefinitionLocalizationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionGeneratorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionGeneratorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionGeneratorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.RxDefinitionNameService }, { type: i3__namespace.RxBundleCacheService }, { type: RxViewDesignerModels }, { type: i5__namespace.RxViewDefinitionLocalizationService }]; } });

    var RX_VIEW_DESIGNER = {
        stencilGroups: {
            basicComponents: {
                label: 'Basic components'
            },
            chatbotComponents: {
                label: 'Chatbot components'
            },
            recordEditorInputs: {
                label: 'Record editor inputs'
            }
        },
        inspectorTabs: {
            viewProperties: {
                tabId: 0
            },
            componentProperties: {
                tabId: 1
            },
            validationIssues: {
                tabId: 2
            }
        }
    };

    var ViewDesignerPaletteComponent = /** @class */ (function () {
        function ViewDesignerPaletteComponent(stringService) {
            this.stringService = stringService;
            this.allowedDropListIds = [];
            this.filterFormControl = new i3$2.FormControl();
            this.componentsSubject$ = new rxjs.ReplaySubject(1);
        }
        Object.defineProperty(ViewDesignerPaletteComponent.prototype, "components", {
            set: function (value) {
                this.componentsSubject$.next(value);
            },
            enumerable: false,
            configurable: true
        });
        ViewDesignerPaletteComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.viewComponentGroups$ = rxjs.combineLatest([
                this.filterFormControl.valueChanges.pipe(operators.debounceTime(200), operators.startWith(null)),
                this.componentsSubject$
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), componentNameFilterText = _b[0], viewComponentDescriptors = _b[1];
                return lodash.flow(function (descriptors) { return lodash.groupBy(descriptors, function (component) { return component.group; }); }, function (groupsByName) { return lodash.map(groupsByName, function (components, groupName) { return ({
                    name: groupName,
                    components: lodash.sortBy(components, function (component) { return isFinite(component.index) ? component.index : component.name; })
                }); }); }, function (groups) { return lodash.sortBy(groups, function (group) {
                    if (group.name === RX_VIEW_DESIGNER.stencilGroups.basicComponents.label) {
                        return '1';
                    }
                    else if (group.name === RX_VIEW_DESIGNER.stencilGroups.recordEditorInputs.label) {
                        return '2';
                    }
                    else {
                        return '3' + lodash.lowerCase(group.name);
                    }
                }); }, function (groups) { return componentNameFilterText
                    ? groups
                        .map(function (group) { return (Object.assign(Object.assign({}, group), { components: group.components.filter(function (component) { return _this.stringService.caseInsensitiveSearch(component.name, componentNameFilterText); }) })); })
                        .filter(function (group) { return group.components.length; })
                    : groups; })(viewComponentDescriptors);
            }));
        };
        ViewDesignerPaletteComponent.prototype.getViewComponentDragData = function (descriptor) {
            return {
                draggedViewComponentDescriptor: descriptor
            };
        };
        ViewDesignerPaletteComponent.prototype.trackByNameFn = function (index, item) {
            return item.name;
        };
        ViewDesignerPaletteComponent.prototype.ngOnDestroy = function () {
            this.componentsSubject$.complete();
        };
        return ViewDesignerPaletteComponent;
    }());
    ViewDesignerPaletteComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerPaletteComponent, deps: [{ token: i2__namespace$1.RxStringService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ViewDesignerPaletteComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerPaletteComponent, selector: "rx-view-designer-palette", inputs: { components: "components", allowedDropListIds: "allowedDropListIds" }, ngImport: i0__namespace, template: "<div class=\"search-field-container\">\n  <adapt-rx-search\n    [formControl]=\"filterFormControl\"\n    rx-id=\"stencil-search-field\"\n    placeholder=\"Search\"\n  ></adapt-rx-search>\n</div>\n\n<adapt-accordion [config]=\"{ multiselect: true, tabs: [] }\">\n  <adapt-accordion-tab\n    *ngFor=\"let viewComponentsGroup of viewComponentGroups$ | async; trackBy: trackByNameFn\"\n    [title]=\"viewComponentsGroup.name\"\n    [attr.rx-id]=\"stringService.toRxId(viewComponentsGroup.name)\"\n    [isOpen]=\"true\"\n  >\n    <div\n      class=\"group-items-container\"\n      cdkDropList\n      cdkDropListSortingDisabled\n      [cdkDropListConnectedTo]=\"allowedDropListIds\"\n    >\n      <div\n        *ngFor=\"let viewComponent of viewComponentsGroup.components; trackBy: trackByNameFn\"\n        [attr.rx-id]=\"viewComponent.type\"\n        class=\"group-item\"\n        cdkDrag\n        [cdkDragData]=\"getViewComponentDragData(viewComponent)\"\n      >\n        <div class=\"group-item-inner\">\n          <span class=\"item-image d-icon-{{ viewComponent.icon || 'wall' }}\"></span>\n\n          <span class=\"item-name\" title=\"{{ viewComponent.name }}\">\n            {{ viewComponent.name }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}.group-items-container{display:flex;flex-wrap:wrap}.group-items-container .group-item.cdk-drag-placeholder{width:33.3%}.group-item{border-right:1px solid #d6d7d8;border-bottom:1px solid #d6d7d8;text-align:center;width:33.3%;cursor:move;height:90px;padding:3px 0}.group-item.cdk-drag-preview{background:white;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.group-item.cdk-drag-placeholder{border:0;width:100px;height:40px;padding:0;position:relative;z-index:3}.group-item.cdk-drag-placeholder .group-item-inner{border:1px solid #d6d7d8;background:#fff}.group-item:nth-child(3n){border-right:none}.group-item-inner{position:relative;display:flex;flex-direction:column}.item-image{color:#626668;font-size:40px;height:54px;flex-grow:1}.item-name{font-size:10px;overflow:hidden;height:34px}.cdk-drag-placeholder{opacity:1!important}adapt-accordion-tab ::ng-deep .card-block{padding:0}.form-group{margin:10px 20px}.search-field-container{padding:.9375rem}\n"], components: [{ type: i3__namespace$3.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i3__namespace$3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3__namespace$3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }], directives: [{ type: i3__namespace$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace$2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4__namespace$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], pipes: { "async": i4__namespace.AsyncPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerPaletteComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-view-designer-palette',
                        templateUrl: './view-designer-palette.component.html',
                        styleUrls: ['./view-designer-palette.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$1.RxStringService }]; }, propDecorators: { components: [{
                    type: i0.Input
                }], allowedDropListIds: [{
                    type: i0.Input
                }] } });

    var RX_VIEW_MODEL = new i0.InjectionToken('RX_VIEW_MODEL');
    var RxViewDesignerComponent = /** @class */ (function () {
        function RxViewDesignerComponent(viewDesignerFacade, rxNotificationService, rxDefinitionPickerCacheService, rxNamedListDefinitionCacheService, rxModalService, translateService, rxUtilityModalsService, rxViewDesignerHelperService, rxExpressionEditorService, rxViewDefinitionService, rxComponentCanDeactivateGuard, rxViewDefinitionGeneratorService, rxViewDesignerModels, rxLogService, injector, renderer, rxRecordDefinitionCacheService, rxAssociationDefinitionCacheService, rxProcessDefinitionCacheService, rxViewDefinitionCacheService, rxGainsightConfiguratorService, rxDefinitionNameService, rxFeatureService) {
            var _this = this;
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxNotificationService = rxNotificationService;
            this.rxDefinitionPickerCacheService = rxDefinitionPickerCacheService;
            this.rxNamedListDefinitionCacheService = rxNamedListDefinitionCacheService;
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxViewDesignerHelperService = rxViewDesignerHelperService;
            this.rxExpressionEditorService = rxExpressionEditorService;
            this.rxViewDefinitionService = rxViewDefinitionService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxViewDefinitionGeneratorService = rxViewDefinitionGeneratorService;
            this.rxViewDesignerModels = rxViewDesignerModels;
            this.rxLogService = rxLogService;
            this.injector = injector;
            this.renderer = renderer;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
            this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
            this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxFeatureService = rxFeatureService;
            this.viewDefinitionSaved = new i0.EventEmitter();
            this.viewDefinitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.inspectorFocusEditorSubject = new rxjs.Subject();
            this.isViewDefinitionChanged$ = new rxjs.BehaviorSubject(false);
            this.validationIssues$ = this.rxViewDesignerHelperService.validationIssues$.pipe(operators.shareReplay(1), operators.takeUntil(this.destroyed$));
            this.breadcrumbItems$ = this.rxViewDesignerHelperService.breadcrumbItems$;
            this.canvasLayout$ = this.rxViewDesignerHelperService.canvasLayout$;
            this.canvasDndListIds = this.rxViewDesignerHelperService.canvasDndListIds;
            this.extensionViewRootComponentType = i5.RxViewComponentType.RecordEditor;
            // Component UI State
            this.isDesignMode = true;
            this.isStencilExpanded = true;
            this.isInspectorExpanded = true;
            this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
            this.viewComponentInspectorEmptyText$ = this.viewDesignerFacade.selectedComponentInspectorLayout$.pipe(operators.switchMap(function (selectedComponentLayout) { return selectedComponentLayout
                ? rxjs.of(null)
                : _this.viewDesignerFacade.selectedComponentGuid$.pipe(operators.withLatestFrom(_this.viewDesignerFacade.viewModel$), operators.map(function (_b) {
                    var _c = __read(_b, 2), selectedComponentGuid = _c[0], viewModel = _c[1];
                    return selectedComponentGuid && selectedComponentGuid !== viewModel.guid
                        ? 'Selected component has no properties.'
                        : 'Select a component to view its properties here.';
                })); }), operators.shareReplay({
                refCount: true,
                bufferSize: 1
            }));
            this.selectedComponentModel$ = this.viewDesignerFacade.selectedComponentGuid$.pipe(operators.map(function (guid) { return _this.rxViewDesignerModels.get(guid); }));
            this.isReadOnly$ = this.viewDesignerFacade.isViewReadOnly$;
            this.paletteComponents$ = rxjs.combineLatest([
                this.viewDesignerFacade.isExtensionView$.pipe(operators.tap(function (isExtensionView) { return (_this.isExtensionView = isExtensionView); })),
                this.viewDesignerFacade.isExtensionContainerSet$.pipe(operators.tap(function (isExtensionContainerSet) { return (_this.isExtensionContainerSet = isExtensionContainerSet); })),
                this.rxViewDesignerHelperService
                    .getLicensedComponents()
                    .pipe(operators.map(function (descriptors) { return _this.configuration.paletteComponentsPredicate
                    ? descriptors.filter(function (descriptor) { return _this.configuration.paletteComponentsPredicate(descriptor); })
                    : descriptors; }))
            ]).pipe(operators.switchMap(function (_b) {
                var _c = __read(_b, 3), isExtensionView = _c[0], isExtensionContainerSet = _c[1], componentDescriptors = _c[2];
                return isExtensionView
                    ? _this.viewDesignerFacade.firstViewComponentModelType$.pipe(operators.map(function (firstViewComponentType) { return firstViewComponentType === _this.extensionViewRootComponentType
                        ? componentDescriptors.filter(function (_b) {
                            var type = _b.type;
                            return type !== _this.extensionViewRootComponentType &&
                                _this.rxViewDesignerHelperService.extensionViewAllowedComponentTypes.has(type);
                        })
                        : componentDescriptors.filter(function (_b) {
                            var type = _b.type;
                            return type === _this.extensionViewRootComponentType;
                        }); }))
                    : rxjs.of(componentDescriptors);
            }));
            var customViewModel = this.injector.get(RX_VIEW_MODEL, null, i0.InjectFlags.Optional);
            this.rxViewModel = customViewModel || this.injector.get(RxViewModel);
            this.rxDefinitionPickerCacheService.registerConsumer();
            this.rxNamedListDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxAssociationDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxViewDefinitionCacheService.registerConsumer(this.destroyed$);
        }
        RxViewDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.isPreviewAvailable$ = this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime').pipe(operators.map(function (lastUpdateTime) { return !_this.configuration.disablePreview &&
                (Boolean(lastUpdateTime) || !lodash.isUndefined(_this.configuration.viewDefinitionName)); }), operators.takeUntil(this.destroyed$));
            this.viewDefinitionName$ = this.viewDesignerFacade.getViewPropertyValue('name');
            this.viewDesignerFacade
                .getViewPropertyValue('pageComponent')
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (pageComponent) {
                _this.isPageView = Boolean(pageComponent);
            });
            this.viewDesignerFacade.viewDefinitionSaveSuccess$
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (_b) {
                var viewDefinitionName = _b.viewDefinitionName;
                _this.rxNotificationService.addSuccessMessage('View definition saved successfully.');
                _this.viewDefinitionSaved.emit(viewDefinitionName);
                _this.initViewDesigner();
            });
            this.viewDesignerFacade.viewDefinitionLoadError$
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function () { return _this.viewDefinitionErrorLoading.emit(); });
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (validationIssues) { return Boolean(lodash.filter(validationIssues, {
                issues: [{ type: i5$1.ValidationIssueType.Error }]
            }).length); }), operators.distinctUntilChanged());
            this.hasValidationWarning$ = this.validationIssues$.pipe(operators.map(function (validationIssues) { return Boolean(lodash.filter(validationIssues, {
                issues: [{ type: i5$1.ValidationIssueType.Warning }]
            }).length); }), operators.distinctUntilChanged());
            this.isSaveButtonDisabled$ = rxjs.combineLatest([
                this.hasValidationErrors$,
                this.viewDesignerFacade.areViewModelsReady$,
                this.isViewDefinitionChanged$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 4), hasValidationErrors = _c[0], areViewModelsReady = _c[1], isChanged = _c[2], isReadOnly = _c[3];
                return hasValidationErrors || !areViewModelsReady || !isChanged || isReadOnly;
            }), operators.startWith(true));
            this.isReadOnly$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (isReadOnly) {
                if (isReadOnly) {
                    _this.rxNotificationService.addWarningMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
                }
            });
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                this.viewDefinitionName$.pipe(operators.take(1)).subscribe(function (viewDefinitionName) {
                    _this.rxGainsightConfiguratorService.updateGlobalContext({
                        subProductLevel1: {
                            name: 'Design'
                        },
                        subProductLevel2: {
                            name: _this.rxDefinitionNameService.getDisplayName(viewDefinitionName) == i3.RX_APPLICATION.shellDefinitionName
                                ? 'Shell designer'
                                : 'View designer'
                        }
                    });
                });
            }
        };
        RxViewDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue) {
                this.initViewDesigner(true);
            }
        };
        RxViewDesignerComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.inspectorFocusEditorSubject.complete();
            this.isViewDefinitionChanged$.complete();
            this.rxDefinitionPickerCacheService.unRegisterConsumer();
            this.viewDesignerFacade.destroyViewDesigner();
            this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2', 'subProductLevel3']);
        };
        RxViewDesignerComponent.prototype.initViewDesigner = function (dispatchInitViewDesignerAction) {
            if (dispatchInitViewDesignerAction === void 0) { dispatchInitViewDesignerAction = false; }
            var _a;
            // Mark view definition as not changed if it's not. This needs for scenario when view designer
            // will be reinitialized with another view definition name and current view is dirty.
            if (this.isViewDefinitionChanged$.getValue()) {
                this.isViewDefinitionChanged$.next(false);
            }
            (_a = this.viewDefinitionChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            if (dispatchInitViewDesignerAction) {
                this.viewDesignerFacade.initViewDesigner(lodash.pick(this.configuration, ['bundleId', 'viewDefinitionName', 'layoutTemplate']));
            }
            this.initViewDefinitionChangeSubscription();
        };
        RxViewDesignerComponent.prototype.initViewDefinitionChangeSubscription = function () {
            var _this = this;
            this.viewDefinitionChangeSubscription = this.viewDesignerFacade.areViewModelsReady$
                .pipe(
            // Wait until models state will be updated with view and view components data.
            operators.filter(Boolean), operators.take(1), operators.switchMap(function () { return rxjs.combineLatest([_this.viewDesignerFacade.viewModel$, _this.viewDesignerFacade.viewComponentModels$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), viewModel = _c[0], viewComponentModels = _c[1];
                return _this.rxViewDefinitionGeneratorService.generate(viewModel, viewComponentModels);
            }), operators.distinctUntilChanged(lodash.isEqual), 
            // Skip first emit from distinctUntilChanged.
            operators.skip(1), 
            // Complete after first emit, it's considered that view definition gets changed so no needs for further emits.
            operators.take(1), operators.takeUntil(_this.destroyed$)); }), operators.takeUntil(this.destroyed$))
                .subscribe(function () {
                _this.isViewDefinitionChanged$.next(true);
            });
        };
        RxViewDesignerComponent.prototype.onSelectComponent = function (guid) {
            this.viewDesignerFacade.selectComponent(guid);
        };
        RxViewDesignerComponent.prototype.onDropComponent = function (data) {
            this.viewDesignerFacade.insertComponent(data);
        };
        RxViewDesignerComponent.prototype.onRemoveComponent = function (guid) {
            var _this = this;
            this.rxUtilityModalsService
                .confirm('Are you sure you want to delete this view component?')
                .then(function (isConfirmed) {
                if (isConfirmed) {
                    _this.viewDesignerFacade.removeViewComponents([guid], true);
                    if (_this.isPageView) {
                        _this.viewDesignerFacade.updateViewProperties({ pageComponent: null });
                    }
                }
            });
        };
        RxViewDesignerComponent.prototype.onInspectorTabChange = function (event) {
            this.viewDesignerFacade.selectInspectorTab({ tabId: event.index });
        };
        RxViewDesignerComponent.prototype.toggleDesignMode = function () {
            if (this.isDesignMode) {
                this.viewDesignerFacade.generateViewDefinition();
            }
            this.isDesignMode = !this.isDesignMode;
        };
        RxViewDesignerComponent.prototype.onComponentPropertiesChange = function (properties) {
            this.viewDesignerFacade.updateSelectedComponentProperties(properties);
        };
        RxViewDesignerComponent.prototype.onEditorEvent = function (event, inspectorElementRef) {
            if (event.type === i3$1.RX_VALIDATION_FORM_CONTROL.events.correctValidationIssue) {
                this.correctValidationIssue(event.payload.componentGuid, event.payload.propertyName);
            }
            if (event.type === i3$1.RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
                this.revertCustomization();
            }
            if (event.type === i3$1.RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
                this.openExpressionEditor(event.payload, inspectorElementRef);
            }
        };
        RxViewDesignerComponent.prototype.getExpressionProperties = function (inspectorElementRef) {
            var _this = this;
            return (this.viewComponentPropertyInspectorElementRef === inspectorElementRef
                ? this.viewDesignerFacade.selectedComponentProperties$
                : this.viewDesignerFacade.viewModel$).pipe(operators.map(function (properties) { return Array.from(_this.renderer
                .selectRootElement(inspectorElementRef.nativeElement, true)
                .querySelectorAll('rx-expression-form-control')).map(function (element) {
                var propertyPath = element.getAttribute('property-path');
                return {
                    path: propertyPath,
                    value: lodash.get(properties, propertyPath),
                    label: element.getAttribute('property-label')
                };
            }); }));
        };
        RxViewDesignerComponent.prototype.openExpressionEditor = function (payload, inspectorElementRef) {
            var _this = this;
            var isComponentInspectorChange = this.viewComponentPropertyInspectorElementRef === inspectorElementRef;
            var props$ = isComponentInspectorChange
                ? this.viewDesignerFacade.selectedComponentProperties$
                : this.viewDesignerFacade.viewModel$;
            rxjs.combineLatest([this.viewDesignerFacade.selectedComponentGuid$, props$])
                .pipe(operators.take(1), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), componentGuid = _c[0], properties = _c[1];
                var model = isComponentInspectorChange ? _this.rxViewDesignerModels.get(componentGuid) : _this.rxViewModel;
                var expressionConfigurator = model === null || model === void 0 ? void 0 : model.expressionConfigurator;
                if (expressionConfigurator) {
                    return _this.rxExpressionEditorService
                        .openEditor({
                        property: {
                            path: payload.propertyPath,
                            value: lodash.get(properties, payload.propertyPath),
                            label: payload.propertyLabel
                        },
                        isReadOnly: payload.isReadOnly,
                        expressionConfigurator: expressionConfigurator,
                        legend: [
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                                icon: 'd-icon-mathematical_function'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                                icon: 'd-icon-dollar'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                                icon: 'd-icon-file_o'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                                icon: 'd-icon-file_o_gear'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                                icon: 'd-icon-arrow_right_square_input'
                            }
                        ],
                        expressionPropertyNavigator: {
                            getProperties: _this.getExpressionProperties.bind(_this, inspectorElementRef)
                        }
                    })
                        .pipe(operators.withLatestFrom(props$), operators.map(function (_b) {
                        var _c, _d;
                        var _e = __read(_b, 2), _f = _e[0], path = _f.path, value = _f.value, props = _e[1];
                        if (props.hasOwnProperty(path)) {
                            return _c = {}, _c[path] = value, _c;
                        }
                        else {
                            // Don't override nested model properties e.g,
                            // when 'path' = "outputParams[1].source" and 'value' = "${bar}", model will be updated from:
                            // {..., outputParams: [{name: 'foo', source: ${foo}}, {name: 'bar', source: null}] } to:
                            // {..., outputParams: [{name: 'foo', source: ${foo}}, {name: 'bar', source: ${bar}}] }
                            var headPropertyName = lodash.toPath(path)[0];
                            // clone value because "set" mutates object, otherwise expression
                            // form control component will not be updated with new value.
                            return lodash.set((_d = {}, _d[headPropertyName] = lodash.cloneDeep(props[headPropertyName]), _d), path, value);
                        }
                    }));
                }
                else {
                    _this.rxLogService.debug('View designer: Expression editor cannot be opened without expression configurator.');
                    return rxjs.EMPTY;
                }
            }), operators.takeUntil(this.destroyed$))
                .subscribe(function (value) { return isComponentInspectorChange
                ? _this.viewDesignerFacade.updateSelectedComponentProperties(value)
                : _this.viewDesignerFacade.updateViewProperties(value); });
        };
        RxViewDesignerComponent.prototype.saveViewDefinition = function () {
            var _this = this;
            this.viewDesignerFacade.viewModel$
                .pipe(operators.take(1), operators.switchMap(function (viewModel) {
                var message = viewModel.type === i5.ViewDefinitionType.Shell
                    ? 'If you save your changes now, you will not be able to run this application using the old UI. Do you want to continue?'
                    : 'If you save this view definition, you will not be able to open it in the old view designer. Do you want to continue?';
                if (viewModel.isAngularJsView) {
                    return _this.rxModalService.confirm({
                        title: 'Warning',
                        modalStyle: i5$1.RX_MODAL.modalStyles.warning,
                        message: message
                    });
                }
                else {
                    return rxjs.of(true);
                }
            }), operators.filter(Boolean), operators.takeUntil(this.destroyed$))
                .subscribe(function () {
                _this.viewDesignerFacade.saveViewDefinition();
            });
        };
        RxViewDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            this.correctValidationIssue(validationIssue.data.guid, validationIssue.data.propertyName, validationIssue.data.data);
        };
        RxViewDesignerComponent.prototype.correctValidationIssue = function (guid, propertyName, data) {
            var _this = this;
            this.viewDesignerFacade.selectComponent(guid);
            // need to wait until inspector will be visible
            // there are no way to focus to invisible elements
            setTimeout(function () { return _this.inspectorFocusEditorSubject.next({ editorName: propertyName, data: data }); }, 10);
        };
        RxViewDesignerComponent.prototype.revertCustomization = function () {
            var _this = this;
            this.viewDefinitionName$
                .pipe(operators.switchMap(function (viewDefinitionName) { return _this.rxViewDefinitionService.revertCustomization(viewDefinitionName); }), operators.takeUntil(this.destroyed$))
                .subscribe(function () {
                _this.rxComponentCanDeactivateGuard.disable();
                window.location.reload();
            });
        };
        RxViewDesignerComponent.prototype.onViewPropertiesChange = function (properties) {
            this.viewDesignerFacade.updateViewProperties(properties);
        };
        RxViewDesignerComponent.prototype.showPreview = function () {
            this.viewDesignerFacade.runPreview();
        };
        RxViewDesignerComponent.prototype.canDeactivate = function () {
            var canDeactivate = true;
            rxjs.combineLatest([this.isViewDefinitionChanged$, this.isReadOnly$])
                .pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), isChanged = _c[0], isReadOnly = _c[1];
                return !isChanged || isReadOnly;
            }), operators.take(1))
                .subscribe(function (isPristineOrReadOnly) {
                canDeactivate = isPristineOrReadOnly;
            });
            return canDeactivate;
        };
        RxViewDesignerComponent.prototype.onBeforeComponentDropInRoot = function (event) {
            if (this.isExtensionView) {
                if (!this.isExtensionContainerSet) {
                    this.rxNotificationService.addWarningMessage('Select Extension container before adding view components.');
                    event.preventDrop = true;
                }
                else if (event.draggedViewComponentDescriptor.type !== i5.RxViewComponentType.RecordEditor) {
                    this.rxNotificationService.addWarningMessage('This view component can only be added inside a Record editor.');
                    event.preventDrop = true;
                }
            }
        };
        return RxViewDesignerComponent;
    }());
    RxViewDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerComponent, deps: [{ token: ViewDesignerFacade }, { token: i3__namespace.RxNotificationService }, { token: i3__namespace$1.RxDefinitionPickerCacheService }, { token: i4__namespace$2.RxNamedListDefinitionCacheService }, { token: i5__namespace$1.RxModalService }, { token: i6__namespace.TranslateService }, { token: i5__namespace$1.RxUtilityModalsService }, { token: RxViewDesignerHelperService }, { token: i3__namespace$1.RxExpressionEditorService }, { token: i5__namespace.RxViewDefinitionService }, { token: i3__namespace.RxComponentCanDeactivateGuard }, { token: RxViewDefinitionGeneratorService }, { token: RxViewDesignerModels }, { token: i3__namespace.RxLogService }, { token: i0__namespace.Injector }, { token: i0__namespace.Renderer2 }, { token: i11__namespace.RxRecordDefinitionCacheService }, { token: i12__namespace.RxAssociationDefinitionCacheService }, { token: i13__namespace.RxProcessDefinitionCacheService }, { token: i5__namespace.RxViewDefinitionCacheService }, { token: i3__namespace$1.RxGainsightConfiguratorService }, { token: i3__namespace.RxDefinitionNameService }, { token: i3__namespace.RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxViewDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewDesignerComponent, selector: "rx-view-designer", inputs: { configuration: "configuration" }, outputs: { viewDefinitionSaved: "viewDefinitionSaved", viewDefinitionErrorLoading: "viewDefinitionErrorLoading", closeDesigner: "closeDesigner" }, providers: [RxViewModel], viewQueries: [{ propertyName: "viewPropertyInspectorElementRef", first: true, predicate: ["viewPropertyInspector"], descendants: true, read: i0.ElementRef }, { propertyName: "viewComponentPropertyInspectorElementRef", first: true, predicate: ["viewComponentPropertyInspector"], descendants: true, read: i0.ElementRef }], usesOnChanges: true, ngImport: i0__namespace, template: "<rx-designer-header\n  [bundleName]=\"viewDesignerFacade.bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isPreviewAvailable]=\"isPreviewAvailable$ | async\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (breadcrumbSelected)=\"onSelectComponent($event.data.guid)\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (showPreview)=\"showPreview()\"\n  (save)=\"saveViewDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n></rx-designer-header>\n\n<div class=\"rx-component-view-designer\" [hidden]=\"!isDesignMode\">\n  <rx-blade\n    [title]=\"'Palette'\"\n    rx-id=\"palette\"\n    (toggle)=\"isStencilExpanded = !isStencilExpanded\"\n    [isExpanded]=\"isStencilExpanded\"\n  >\n    <rx-view-designer-palette\n      *ngIf=\"!isPageView && !(isReadOnly$ | async)\"\n      [components]=\"paletteComponents$ | async\"\n      [allowedDropListIds]=\"canvasDndListIds\"\n    ></rx-view-designer-palette>\n\n    <adapt-alert\n      *ngIf=\"isPageView && !(isReadOnly$ | async)\"\n      class=\"p-3\"\n      [config]=\"{\n        content:\n          'There are no view components to display. View with a Page view component cannot contain any other view components.',\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n\n    <adapt-alert\n      *ngIf=\"!(viewDesignerFacade.isViewDefinitionLoading$ | async) && isReadOnly$ | async\"\n      class=\"p-3\"\n      [config]=\"{\n        content: 'This view is not editable. There are no view components to display.',\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n  </rx-blade>\n\n  <section class=\"rx-view-designer-container\">\n    <rx-view-designer-canvas\n      class=\"flex-grow-1\"\n      [layout]=\"canvasLayout$ | async\"\n      [isReadOnly]=\"isReadOnly$ | async\"\n      (componentSelect)=\"onSelectComponent($event)\"\n      (componentRemove)=\"onRemoveComponent($event)\"\n      (componentDrop)=\"onDropComponent($event)\"\n      (beforeComponentDropInRoot)=\"onBeforeComponentDropInRoot($event)\"\n    ></rx-view-designer-canvas>\n  </section>\n\n  <rx-blade\n    [title]=\"'Properties'\"\n    dockTo=\"right\"\n    rx-id=\"properties\"\n    (toggle)=\"isInspectorExpanded = !isInspectorExpanded\"\n    [isExpanded]=\"isInspectorExpanded\"\n  >\n    <adapt-tabset\n      [tab-active]=\"viewDesignerFacade.selectedInspectorTabId$ | async\"\n      (tab-active-changed)=\"onInspectorTabChange($event)\"\n      [class.has-validation-warning]=\"hasValidationWarning$ | async\"\n      [class.has-validation-errors]=\"hasValidationErrors$ | async\"\n      customCssTabContent=\"p-0\"\n      justify=\"justified\"\n    >\n      <adapt-tab-panel icon=\"d-icon-pencil\">\n        <rx-form-builder\n          #viewPropertyInspector\n          (modelChange)=\"onViewPropertiesChange($event)\"\n          (editorEvent)=\"onEditorEvent($event, viewPropertyInspectorElementRef)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          [config]=\"viewDesignerFacade.viewInspectorLayout$ | async\"\n          [model]=\"viewDesignerFacade.viewModel$ | async\"\n          [isReadOnly]=\"isReadOnly$ | async\"\n        ></rx-form-builder>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel icon=\"d-icon-gear\">\n        <rx-form-builder\n          rxInspector\n          [designerItemModel]=\"selectedComponentModel$ | async\"\n          #viewComponentPropertyInspector\n          (modelChange)=\"onComponentPropertiesChange($event)\"\n          (editorEvent)=\"onEditorEvent($event, viewComponentPropertyInspectorElementRef)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          [config]=\"viewDesignerFacade.selectedComponentInspectorLayout$ | async\"\n          [model]=\"viewDesignerFacade.selectedComponentProperties$ | async\"\n          [guid]=\"viewDesignerFacade.selectedComponentGuid$ | async\"\n          [isReadOnly]=\"isReadOnly$ | async\"\n        ></rx-form-builder>\n\n        <adapt-alert\n          [hidden]=\"!(viewComponentInspectorEmptyText$ | async)\"\n          class=\"p-3\"\n          [config]=\"{\n            content: viewComponentInspectorEmptyText$ | async,\n            variant: 'info',\n            type: 'inline'\n          }\"\n        ></adapt-alert>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel icon=\"d-icon-exclamation_triangle\">\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.view-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n          [issueSections]=\"validationIssues$ | async\"\n        ></rx-validation-issues>\n      </adapt-tab-panel>\n    </adapt-tabset>\n  </rx-blade>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"viewDesignerFacade.viewDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n>\n</adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-view-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-view-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:2.2rem 1rem 1rem}:host ::ng-deep .has-validation-warning:not(.has-validation-errors) .nav-link .d-icon-exclamation_triangle{color:#f1b521}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i3__namespace$1.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i5__namespace$1.RxBladeComponent, selector: "rx-blade", inputs: ["title", "isExpanded", "dockTo"], outputs: ["toggle"] }, { type: ViewDesignerPaletteComponent, selector: "rx-view-designer-palette", inputs: ["components", "allowedDropListIds"] }, { type: i3__namespace$3.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: ViewDesignerCanvasComponent, selector: "rx-view-designer-canvas", inputs: ["layout", "isReadOnly"], outputs: ["componentSelect", "componentDrop", "componentRemove", "beforeComponentDropInRoot"] }, { type: i3__namespace$3.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i3__namespace$3.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i3__namespace$1.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i5__namespace$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i3__namespace$3.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace$1.InspectorDirective, selector: "[rxInspector]", inputs: ["designerItemModel"] }], pipes: { "async": i4__namespace.AsyncPipe, "translate": i6__namespace.TranslatePipe, "json": i4__namespace.JsonPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-view-designer',
                        templateUrl: './view-designer.component.html',
                        styleUrls: ['./view-designer.component.scss'],
                        providers: [RxViewModel]
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: i3__namespace.RxNotificationService }, { type: i3__namespace$1.RxDefinitionPickerCacheService }, { type: i4__namespace$2.RxNamedListDefinitionCacheService }, { type: i5__namespace$1.RxModalService }, { type: i6__namespace.TranslateService }, { type: i5__namespace$1.RxUtilityModalsService }, { type: RxViewDesignerHelperService }, { type: i3__namespace$1.RxExpressionEditorService }, { type: i5__namespace.RxViewDefinitionService }, { type: i3__namespace.RxComponentCanDeactivateGuard }, { type: RxViewDefinitionGeneratorService }, { type: RxViewDesignerModels }, { type: i3__namespace.RxLogService }, { type: i0__namespace.Injector }, { type: i0__namespace.Renderer2 }, { type: i11__namespace.RxRecordDefinitionCacheService }, { type: i12__namespace.RxAssociationDefinitionCacheService }, { type: i13__namespace.RxProcessDefinitionCacheService }, { type: i5__namespace.RxViewDefinitionCacheService }, { type: i3__namespace$1.RxGainsightConfiguratorService }, { type: i3__namespace.RxDefinitionNameService }, { type: i3__namespace.RxFeatureService }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], viewDefinitionSaved: [{
                    type: i0.Output
                }], viewDefinitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }], viewPropertyInspectorElementRef: [{
                    type: i0.ViewChild,
                    args: ['viewPropertyInspector', { read: i0.ElementRef }]
                }], viewComponentPropertyInspectorElementRef: [{
                    type: i0.ViewChild,
                    args: ['viewComponentPropertyInspector', { read: i0.ElementRef }]
                }] } });

    var ViewDesignerCanvasModule = /** @class */ (function () {
        function ViewDesignerCanvasModule() {
        }
        return ViewDesignerCanvasModule;
    }());
    ViewDesignerCanvasModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewDesignerCanvasModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasModule, declarations: [ViewDesignerCanvasComponent,
            CanvasItemComponent,
            CanvasItemContainerComponent,
            CanvasOutletComponent,
            CanvasItemColumnComponent], imports: [i4.CommonModule, i4$1.DragDropModule], exports: [ViewDesignerCanvasComponent, CanvasOutletComponent, CanvasItemComponent, CanvasItemColumnComponent] });
    ViewDesignerCanvasModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasModule, imports: [[i4.CommonModule, i4$1.DragDropModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerCanvasModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i4$1.DragDropModule],
                        exports: [ViewDesignerCanvasComponent, CanvasOutletComponent, CanvasItemComponent, CanvasItemColumnComponent],
                        declarations: [
                            ViewDesignerCanvasComponent,
                            CanvasItemComponent,
                            CanvasItemContainerComponent,
                            CanvasOutletComponent,
                            CanvasItemColumnComponent
                        ],
                        entryComponents: [CanvasItemComponent, CanvasItemContainerComponent, CanvasOutletComponent, CanvasItemColumnComponent]
                    }]
            }] });

    var DesignerModule = /** @class */ (function () {
        function DesignerModule() {
        }
        return DesignerModule;
    }());
    DesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DesignerModule, declarations: [DesignerComponent], imports: [ViewDesignerCanvasModule, i4.CommonModule] });
    DesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DesignerModule, imports: [[ViewDesignerCanvasModule, i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [ViewDesignerCanvasModule, i4.CommonModule],
                        declarations: [DesignerComponent],
                        entryComponents: [DesignerComponent]
                    }]
            }] });

    var RxViewDesignerPaletteModule = /** @class */ (function () {
        function RxViewDesignerPaletteModule() {
        }
        return RxViewDesignerPaletteModule;
    }());
    RxViewDesignerPaletteModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerPaletteModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxViewDesignerPaletteModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerPaletteModule, declarations: [ViewDesignerPaletteComponent], imports: [i4.CommonModule,
            i4$1.DragDropModule,
            i3$2.ReactiveFormsModule,
            i3$3.AdaptAccordionModule,
            obsolete.AdaptTextFieldModule,
            i3$3.AdaptRxSearchModule], exports: [ViewDesignerPaletteComponent] });
    RxViewDesignerPaletteModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerPaletteModule, imports: [[
                i4.CommonModule,
                i4$1.DragDropModule,
                i3$2.ReactiveFormsModule,
                i3$3.AdaptAccordionModule,
                obsolete.AdaptTextFieldModule,
                i3$3.AdaptRxSearchModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerPaletteModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i4$1.DragDropModule,
                            i3$2.ReactiveFormsModule,
                            i3$3.AdaptAccordionModule,
                            obsolete.AdaptTextFieldModule,
                            i3$3.AdaptRxSearchModule
                        ],
                        exports: [ViewDesignerPaletteComponent],
                        declarations: [ViewDesignerPaletteComponent]
                    }]
            }] });

    var RuntimeViewParamsModalComponent = /** @class */ (function (_super) {
        __extends(RuntimeViewParamsModalComponent, _super);
        function RuntimeViewParamsModalComponent(activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.inputParams = {};
            _this.inputParamNames = _this.activeModalRef.getData().inputParams;
            return _this;
        }
        RuntimeViewParamsModalComponent.prototype.isDirty = function () {
            return lodash.values(this.inputParams).some(function (paramValue) { return paramValue; });
        };
        RuntimeViewParamsModalComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i3$3.DismissReasons.CLOSE_BTN);
        };
        return RuntimeViewParamsModalComponent;
    }(i5$1.RxModalClass));
    RuntimeViewParamsModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewParamsModalComponent, deps: [{ token: i3__namespace$3.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewParamsModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewParamsModalComponent, selector: "rx-runtime-view-params-modal", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <div *ngFor=\"let inputParam of inputParamNames; first as isFirst; index as i\">\n    <adapt-rx-textfield\n      [attr.rx-id]=\"'input-param-' + (i + 1)\"\n      [label]=\"inputParam\"\n      [autofocus]=\"isFirst\"\n      [(ngModel)]=\"inputParams[inputParam]\"\n    >\n    </adapt-rx-textfield>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <adapt-button btn-type=\"primary\" (click)=\"activeModalRef.close(inputParams)\" rx-id=\"ok-button\">\n    OK\n  </adapt-button>\n\n  <adapt-button btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\"> Cancel </adapt-button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:20px}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n"], components: [{ type: i3__namespace$3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3__namespace$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewParamsModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-params-modal',
                        templateUrl: './runtime-view-params-modal.component.html',
                        styleUrls: ['./runtime-view-params-modal.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace$3.ActiveModalRef }, { type: i0__namespace.Injector }]; } });

    var RuntimeViewParamsModalModule = /** @class */ (function () {
        function RuntimeViewParamsModalModule() {
        }
        return RuntimeViewParamsModalModule;
    }());
    RuntimeViewParamsModalModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewParamsModalModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RuntimeViewParamsModalModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewParamsModalModule, declarations: [RuntimeViewParamsModalComponent], imports: [i4.CommonModule, i3$2.FormsModule, i3$3.AdaptButtonModule, i3$3.AdaptModalModule, i3$3.AdaptRxTextfieldModule], exports: [RuntimeViewParamsModalComponent] });
    RuntimeViewParamsModalModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewParamsModalModule, imports: [[i4.CommonModule, i3$2.FormsModule, i3$3.AdaptButtonModule, i3$3.AdaptModalModule, i3$3.AdaptRxTextfieldModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewParamsModalModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i3$2.FormsModule, i3$3.AdaptButtonModule, i3$3.AdaptModalModule, i3$3.AdaptRxTextfieldModule],
                        exports: [RuntimeViewParamsModalComponent],
                        declarations: [RuntimeViewParamsModalComponent],
                        entryComponents: [RuntimeViewParamsModalComponent]
                    }]
            }] });

    var RxViewActionExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxViewActionExpressionConfigurator, _super);
        function RxViewActionExpressionConfigurator(injector, actionType, actionGuid) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.actionType = actionType;
            _this.actionGuid = actionGuid;
            _this.rxViewDataDictionaryService = _this.injector.get(RxViewDataDictionaryService);
            _this.rxDefaultExpressionEvaluatorService = _this.injector.get(i5.RxDefaultExpressionEvaluatorService);
            _this.rxViewActionRegistryService = _this.injector.get(i5.RxViewActionRegistryService);
            _this.commonDataDictionary$ = _this.rxViewDataDictionaryService.getActionDataDictionary(_this.actionGuid);
            return _this;
        }
        RxViewActionExpressionConfigurator.prototype.getExpressionEvaluator = function (propertyName) {
            var propertyDescriptor = this.rxViewActionRegistryService
                .get(this.actionType)
                .parameters.find(function (param) { return param.name === propertyName; });
            return lodash.get(propertyDescriptor, 'evaluatorService', this.rxDefaultExpressionEvaluatorService);
        };
        return RxViewActionExpressionConfigurator;
    }(RxViewExpressionConfigurator));

    var NamedListFilterExpressionConfigurator = /** @class */ (function (_super) {
        __extends(NamedListFilterExpressionConfigurator, _super);
        function NamedListFilterExpressionConfigurator(fieldDefinition, injector) {
            var _this = _super.call(this, injector) || this;
            _this.fieldDefinition = fieldDefinition;
            _this.injector = injector;
            _this.rxNamedListDefinitionCacheService = _this.injector.get(i4$2.RxNamedListDefinitionCacheService);
            _this.rxRecordDefinitionCacheService = _this.injector.get(i11.RxRecordDefinitionCacheService);
            _this.rxViewDataDictionaryService = _this.injector.get(RxViewDataDictionaryService);
            _this.rxDefaultExpressionEvaluatorService = _this.injector.get(i5.RxDefaultExpressionEvaluatorService);
            _this.commonDataDictionary$ = _this.rxNamedListDefinitionCacheService
                .getNamedListDefinition(_this.fieldDefinition.namedListDefinition)
                .pipe(operators.switchMap(function (namedListDefinition) { return _this.rxRecordDefinitionCacheService.getRecordDefinition(namedListDefinition.recordDefinitionName); }), operators.switchMap(function (recordDefinition) { return _this.getNamedListBranch(recordDefinition); }), operators.withLatestFrom(_this.rxViewDataDictionaryService.getCommonDataDictionary()), operators.map(function (_a) {
                var _b = __read(_a, 2), namedListBranch = _b[0], dataDictionary = _b[1];
                return __spreadArray([namedListBranch], __read(dataDictionary));
            }));
            return _this;
        }
        NamedListFilterExpressionConfigurator.prototype.getExpressionEvaluator = function () {
            return this.rxDefaultExpressionEvaluatorService;
        };
        NamedListFilterExpressionConfigurator.prototype.getDefaultConfig = function () {
            return Object.assign(Object.assign({}, _super.prototype.getDefaultConfig.call(this)), { operators: i3.ExpressionOperatorRowsByGroup.get(i3.ExpressionOperatorGroup.AllServer) });
        };
        NamedListFilterExpressionConfigurator.prototype.getNamedListBranch = function (recordDefinition) {
            var namedListDictionaryNodes = lodash.chain(recordDefinition.fieldDefinitions)
                .reject({ resourceType: i11.RX_RECORD_DEFINITION.resourceTypes.attachment })
                .map(function (fieldDefinition) { return ({
                label: fieldDefinition.name,
                expression: "'" + fieldDefinition.id + "'",
                icon: 'd-icon-file_o_gear',
                children: fieldDefinition.resourceType === i11.RX_RECORD_DEFINITION.resourceTypes.selection
                    ? [
                        {
                            label: 'Options',
                            children: lodash.map(fieldDefinition.optionNamesById, function (optionName, optionValue) { return ({
                                label: optionName,
                                expression: optionValue,
                                icon: 'd-icon-file_o_gear'
                            }); })
                        }
                    ]
                    : []
            }); })
                .sortBy('label')
                .value();
            return rxjs.of({
                label: 'Filter by',
                expanded: true,
                children: namedListDictionaryNodes
            });
        };
        return NamedListFilterExpressionConfigurator;
    }(RxViewExpressionConfigurator));

    var ActionSandbox = /** @class */ (function () {
        function ActionSandbox(injector, descriptor, guid, initialProps) {
            var _this = this;
            this.injector = injector;
            this.descriptor = descriptor;
            this.guid = guid;
            this.initialProps = initialProps;
            this.destroyedSubject = new rxjs.Subject();
            this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
            this.actionPropertyEditorConfigSubject = new rxjs.BehaviorSubject([]);
            this.actionPropertiesSubject = new rxjs.BehaviorSubject(this.initialProps);
            this.children = [];
            this.children$ = this.viewDesignerFacade.getChildComponents(this.guid);
            this.destroyed$ = this.destroyedSubject.asObservable();
            this.actionPropertyEditorConfig$ = this.actionPropertyEditorConfigSubject.pipe(operators.takeUntil(this.destroyed$));
            this.actionProperties$ = this.actionPropertiesSubject.pipe(operators.map(function () { return lodash.omit(_this.getActionProperties(), ['name']); }), operators.distinctUntilChanged(lodash.isEqual), operators.takeUntil(this.destroyed$));
            this.children$.pipe(operators.first(), operators.takeUntil(this.destroyed$)).subscribe(function (children) {
                _this.setChildren(children);
            });
        }
        ActionSandbox.prototype.updateActionProperties = function (props) {
            this.actionPropertiesSubject.next(Object.assign(Object.assign({}, this.actionPropertiesSubject.getValue()), props));
        };
        ActionSandbox.prototype.setActionProperties = function (props) {
            var _a = this.actionPropertiesSubject.getValue(), name = _a.name, index = _a.index;
            this.actionPropertiesSubject.next(Object.assign(Object.assign({ $condition$: null }, props), { name: name,
                index: index }));
        };
        ActionSandbox.prototype.getActionProperties = function () {
            return this.actionPropertiesSubject.getValue();
        };
        ActionSandbox.prototype.getActionPropertyValue = function (propertyName) {
            return this.actionPropertiesSubject.getValue()[propertyName];
        };
        ActionSandbox.prototype.setActionPropertyEditorConfig = function (actionEditorConfig) {
            var expressionConfigurator = new RxViewActionExpressionConfigurator(this.injector, this.descriptor.name, this.guid);
            actionEditorConfig = __spreadArray([
                {
                    name: '$condition$',
                    component: i3$1.ExpressionFormControlComponent,
                    options: {
                        label: 'Condition',
                        tooltip: new i3.Tooltip('The action will execute if the condition is true, or if no condition is defined.'),
                        dataDictionary$: expressionConfigurator.getDataDictionary(),
                        operators: expressionConfigurator.getOperators()
                    }
                }
            ], __read(actionEditorConfig));
            this.actionPropertyEditorConfigSubject.next(actionEditorConfig);
        };
        ActionSandbox.prototype.getActionPropertyEditorConfig = function () {
            return this.actionPropertyEditorConfigSubject.getValue();
        };
        ActionSandbox.prototype.setActionOutputDataDictionary = function (dataDictionary) {
            // check why index is coming as a string for existing actions
            this.viewDesignerFacade.setActionDataDictionaryBranch(this.guid, this.getActionPropertyValue('index'), this.descriptor.label, dataDictionary);
        };
        ActionSandbox.prototype.setChildren = function (data) {
            this.children = data;
        };
        ActionSandbox.prototype.getChildren = function () {
            return this.children;
        };
        ActionSandbox.prototype.onDestroy = function () {
            this.destroyedSubject.next();
            this.destroyedSubject.complete();
        };
        return ActionSandbox;
    }());

    var RxViewDesignerActionModel = /** @class */ (function () {
        function RxViewDesignerActionModel(injector, sandbox) {
            this.injector = injector;
            this.sandbox = sandbox;
            this.guid = this.sandbox.guid;
            this.expressionConfigurator = new RxViewActionExpressionConfigurator(this.injector, this.sandbox.descriptor.name, this.sandbox.guid);
        }
        RxViewDesignerActionModel.prototype.getExpressionConfigurator = function () {
            return this.expressionConfigurator;
        };
        RxViewDesignerActionModel.prototype.getPropertiesByName = function () {
            return this.sandbox.getActionProperties();
        };
        RxViewDesignerActionModel.prototype.getChildren = function () {
            return this.sandbox.getChildren();
        };
        RxViewDesignerActionModel.prototype.getOutputExpressionForPropertyPath = function (propertyPath) {
            return "${view.components." + this.guid + ".output." + propertyPath + "}";
        };
        return RxViewDesignerActionModel;
    }());

    var RxViewDesignerDefaultActionModel = /** @class */ (function (_super) {
        __extends(RxViewDesignerDefaultActionModel, _super);
        function RxViewDesignerDefaultActionModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.defaultProps = _this.sandbox.descriptor.parameters.reduce(function (initialProps, param) {
                initialProps[param.name] = param.defaultValue;
                return initialProps;
            }, {});
            _this.sandbox.actionProperties$.pipe(operators.take(1)).subscribe(function (props) {
                _this.sandbox.updateActionProperties(Object.assign(Object.assign({}, _this.defaultProps), props));
                _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig());
            });
            return _this;
        }
        RxViewDesignerDefaultActionModel.prototype.getActionEditorConfig = function () {
            var _this = this;
            return this.sandbox.descriptor.parameters
                .filter(function (param) { return param.editor; })
                .map(function (param) { return ({
                name: param.name,
                component: param.editor,
                options: Object.assign({ label: param.label, isRequired: param.isRequired, tooltip: param.tooltip }, (param.editor === i3$1.ExpressionFormControlComponent
                    ? {
                        dataDictionary$: _this.expressionConfigurator.getDataDictionary(param.name),
                        operators: _this.expressionConfigurator.getOperators(param.name)
                    }
                    : param.editorOptions || {}))
            }); });
        };
        return RxViewDesignerDefaultActionModel;
    }(RxViewDesignerActionModel));

    var RxActionListModelManagerService = /** @class */ (function () {
        function RxActionListModelManagerService(injector) {
            this.injector = injector;
            this.models = new Map();
        }
        RxActionListModelManagerService.prototype.create = function (descriptor, guid, initialProps) {
            var _a;
            var sandbox = new ActionSandbox(this.injector, descriptor, guid, lodash.isFunction((_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.designModel) === null || _a === void 0 ? void 0 : _a.getInitialProperties)
                ? Object.assign(Object.assign({}, descriptor.designModel.getInitialProperties(lodash.omit(initialProps, ['index', 'name']))), { name: initialProps.name, index: initialProps.index }) : initialProps);
            var Model = descriptor.designModel || RxViewDesignerDefaultActionModel;
            var actionModel = new Model(this.injector, sandbox);
            this.models.set(guid, actionModel);
            return actionModel;
        };
        RxActionListModelManagerService.prototype.remove = function (guid) {
            this.models.delete(guid);
        };
        RxActionListModelManagerService.prototype.get = function (guid) {
            return this.models.get(guid);
        };
        RxActionListModelManagerService.prototype.ngOnDestroy = function () {
            this.models.forEach(function (model) { return model.sandbox.onDestroy(); });
            this.models.clear();
        };
        return RxActionListModelManagerService;
    }());
    RxActionListModelManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionListModelManagerService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxActionListModelManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionListModelManagerService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxActionListModelManagerService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var ActionListEditorDialogComponent = /** @class */ (function (_super) {
        __extends(ActionListEditorDialogComponent, _super);
        function ActionListEditorDialogComponent(rxViewActionRegistryService, rxStringService, activeModalRef, viewDesignerFacade, rxActionListModelManagerService, rxExpressionEditorService, rxGuidService, translateService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.rxViewActionRegistryService = rxViewActionRegistryService;
            _this.rxStringService = rxStringService;
            _this.activeModalRef = activeModalRef;
            _this.viewDesignerFacade = viewDesignerFacade;
            _this.rxActionListModelManagerService = rxActionListModelManagerService;
            _this.rxExpressionEditorService = rxExpressionEditorService;
            _this.rxGuidService = rxGuidService;
            _this.translateService = translateService;
            _this.injector = injector;
            _this.availableActionDescriptors$ = _this.rxViewActionRegistryService.getLicensedActions();
            _this.selectedActions = [];
            _this.config = _this.activeModalRef.getData();
            _this.treeWrap = i3$3.TreeWrap.WrapAll;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.isEditorDirtySubject = new rxjs.BehaviorSubject(false);
            _this.isSaveButtonDisabled$ = _this.isEditorDirtySubject.asObservable().pipe(operators.map(function (isDirty) { return !isDirty; }));
            _this.availableActionTreeNodes$ = _this.availableActionDescriptors$.pipe(operators.map(function (actions) { return actions
                .filter(function (action) { return !action.hidden; })
                .sort(function (a, b) { return a.label.localeCompare(b.label); })
                .map(function (action) { return ({
                data: action,
                label: action.label
            }); }); }));
            _this.actionLabelsMap$ = _this.availableActionDescriptors$.pipe(operators.map(function (actions) { return lodash.transform(actions, function (result, action) {
                result[action.name] = action.label;
            }, {}); }));
            _this.config.selectedActions = lodash.map(_this.config.selectedActions, function (action) { return (Object.assign(Object.assign({}, action), { data: Object.assign(Object.assign({}, action.data), { index: i3$3.toNumber(action.data.index) }) })); });
            _this.selectedActions = lodash.flow(function (actions) { return lodash.sortBy(actions, function (action) { return action.data.index; }); }, function (actions) { return lodash.map(actions, function (action) {
                var descriptor = _this.rxViewActionRegistryService.get(action.data.name);
                _this.viewDesignerFacade.setActionDataDictionaryBranch(action.guid, action.data.index, action.data.name);
                var model = _this.rxActionListModelManagerService.create(descriptor, action.guid, action.data);
                return {
                    isOpen: Boolean(_this.config.actionToEdit) && action.guid === _this.config.actionToEdit.guid,
                    model: model,
                    config$: model.sandbox.actionPropertyEditorConfig$.pipe(operators.map(function (config) { return [{ controls: config }]; })),
                    name: descriptor.name
                };
            }); })(_this.config.selectedActions);
            return _this;
        }
        ActionListEditorDialogComponent.prototype.isDirty = function () {
            return this.isEditorDirtySubject.getValue();
        };
        ActionListEditorDialogComponent.prototype.addAction = function (actionDescriptor, index) {
            var _this = this;
            if (index === void 0) { index = this.selectedActions.length; }
            var guid = this.rxGuidService.generate();
            this.viewDesignerFacade.setActionDataDictionaryBranch(guid, index, actionDescriptor.name);
            var model = this.rxActionListModelManagerService.create(actionDescriptor, guid, {
                name: actionDescriptor.name,
                index: index
            });
            this.selectedActions.splice(index, 0, {
                isOpen: true,
                model: model,
                config$: model.sandbox.actionPropertyEditorConfig$.pipe(operators.map(function (config) { return [{ controls: config }]; })),
                name: actionDescriptor.name
            });
            this.updateIndexProp();
            this.markEditorAsDirty();
            setTimeout(function () {
                _this.accordionTabEls.toArray()[index].nativeElement.scrollIntoView({
                    block: 'nearest'
                });
            });
        };
        ActionListEditorDialogComponent.prototype.onSave = function () {
            var result = this.selectedActions.map(function (action) {
                var _a, _b, _c;
                return ({
                    guid: action.model.guid,
                    data: action.model.getPropertiesByName(),
                    children: (_c = (_b = (_a = action.model).getChildren) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : null
                });
            });
            this.activeModalRef.close(result);
        };
        ActionListEditorDialogComponent.prototype.removeAction = function (action) {
            lodash.pull(this.selectedActions, action);
            this.rxActionListModelManagerService.remove(action.model.guid);
            this.viewDesignerFacade.removeActionDataDictionaryBranch(action.model.guid);
            this.markEditorAsDirty();
        };
        ActionListEditorDialogComponent.prototype.moveAction = function (fromIndex, toIndex) {
            i4$1.moveItemInArray(this.selectedActions, fromIndex, toIndex);
            this.updateIndexProp();
            this.markEditorAsDirty();
        };
        ActionListEditorDialogComponent.prototype.toggleOpen = function (expandAll) {
            this.selectedActions.forEach(function (action) { return (action.isOpen = expandAll); });
        };
        ActionListEditorDialogComponent.prototype.onSelectedActionsListDrop = function (event) {
            var _a;
            var data = event.item.data;
            if ((_a = data.model) === null || _a === void 0 ? void 0 : _a.guid) {
                this.moveAction(event.previousIndex, event.currentIndex);
            }
            else {
                this.addAction(data, event.currentIndex);
            }
        };
        ActionListEditorDialogComponent.prototype.openExpressionEditor = function (model, propertyPath, propertyLabel, isReadOnly, element) {
            var _this = this;
            if (isReadOnly === void 0) { isReadOnly = false; }
            this.rxExpressionEditorService
                .openEditor({
                property: {
                    path: propertyPath,
                    value: lodash.get(model.sandbox.getActionProperties(), propertyPath),
                    label: propertyLabel
                },
                isReadOnly: isReadOnly,
                expressionConfigurator: model.getExpressionConfigurator(),
                legend: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                        icon: 'd-icon-mathematical_function'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                        icon: 'd-icon-dollar'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                        icon: 'd-icon-file_o'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                        icon: 'd-icon-file_o_gear'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                        icon: 'd-icon-arrow_right_square_input'
                    }
                ],
                expressionPropertyNavigator: {
                    getProperties: function () {
                        var properties = Array.from(element.querySelectorAll('rx-expression-form-control')).map(function (controlElement) {
                            var path = controlElement.getAttribute('property-path');
                            return {
                                path: path,
                                value: lodash.get(model.sandbox.getActionProperties(), path),
                                label: controlElement.getAttribute('property-label')
                            };
                        });
                        return rxjs.of(properties);
                    }
                }
            })
                .pipe(operators.map(function (_d) {
                var _e;
                var path = _d.path, value = _d.value;
                var props = model.sandbox.getActionProperties();
                var headPropertyName = path in props ? path : lodash.toPath(path)[0];
                return lodash.set((_e = {}, _e[headPropertyName] = lodash.cloneDeep(props[headPropertyName]), _e), path, value);
            }))
                .subscribe(function (props) {
                model.sandbox.updateActionProperties(props);
                _this.markEditorAsDirty();
            });
        };
        ActionListEditorDialogComponent.prototype.onEvent = function (event, model, element) {
            if (event.type === i3$1.RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
                this.openExpressionEditor(model, event.payload.propertyPath, event.payload.propertyLabel, event.payload.isReadOnly, element);
            }
        };
        ActionListEditorDialogComponent.prototype.updateIndexProp = function () {
            this.selectedActions.forEach(function (action, index) {
                action.model.sandbox.updateActionProperties({
                    index: index
                });
            });
            this.viewDesignerFacade.updateActionDataDictionaryBranchOrder(this.selectedActions.reduce(function (result, action, index) {
                result[action.model.guid] = index;
                return result;
            }, {}));
        };
        ActionListEditorDialogComponent.prototype.markEditorAsDirty = function () {
            this.isEditorDirtySubject.next(true);
        };
        ActionListEditorDialogComponent.prototype.ngAfterViewInit = function () {
            var openActionIndex = lodash.findIndex(this.selectedActions, 'isOpen');
            if (openActionIndex !== -1) {
                this.accordionTabEls.toArray()[openActionIndex].nativeElement.scrollIntoView({
                    block: 'nearest'
                });
            }
        };
        ActionListEditorDialogComponent.prototype.ngOnDestroy = function () {
            this.isEditorDirtySubject.complete();
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.viewDesignerFacade.removeAllActionDataDictionaryBranches();
        };
        ActionListEditorDialogComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i3$3.DismissReasons.CLOSE_BTN);
        };
        return ActionListEditorDialogComponent;
    }(i5$1.RxModalClass));
    ActionListEditorDialogComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListEditorDialogComponent, deps: [{ token: i5__namespace.RxViewActionRegistryService }, { token: i2__namespace$1.RxStringService }, { token: i3__namespace$3.ActiveModalRef }, { token: ViewDesignerFacade }, { token: RxActionListModelManagerService }, { token: i3__namespace$1.RxExpressionEditorService }, { token: i2__namespace$1.RxGuidService }, { token: i6__namespace.TranslateService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ActionListEditorDialogComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListEditorDialogComponent, selector: "rx-action-list-editor-dialog", providers: [RxActionListModelManagerService], viewQueries: [{ propertyName: "accordionTabEls", predicate: i3$3.AdaptAccordionTabComponent, descendants: true, read: i0.ElementRef }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.view-components.action-list.available-actions.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\" *ngIf=\"availableActionTreeNodes$ | async as availableActionTreeNodes\">\n          <div\n            *ngIf=\"availableActionTreeNodes.length; else adaptTreeEmptyStateTemplate\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"'selected-action-list'\"\n          >\n            <adapt-tree\n              [value]=\"availableActionTreeNodes\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-action adaptTreeNodeTemplate>\n                <div\n                  *ngIf=\"action.data\"\n                  class=\"rx-tree-draggable-node\"\n                  cdkDrag\n                  [cdkDragData]=\"action.data\"\n                >\n                  <div (dblclick)=\"addAction(action.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addAction(action.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ action.data.label }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <ng-template #adaptTreeEmptyStateTemplate>\n            <div class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n              <adapt-empty-state\n                class=\"w-100\"\n                label=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.available-actions.empty-state.message' | translate }}\"\n                type=\"search\"\n              ></adapt-empty-state>\n            </div>\n          </ng-template>         \n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div class=\"d-flex align-items-center\">\n          <h4 class=\"mt-2\">\n            {{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.title' | translate }}\n          </h4>\n\n          <adapt-icon\n            class=\"ml-2\"\n            name=\"question_circle_o\"\n            adaptPopover=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.tooltip' | translate }}\"\n            appendToBody=\"true\"\n          >\n          </adapt-icon>\n        </div>\n\n        <div *ngIf=\"selectedActions.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-action-list\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedActionsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let action of selectedActions;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"action\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n            #container\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [isOpen]=\"action.isOpen\"\n              (open)=\"action.isOpen = true\"\n              (close)=\"action.isOpen = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div *ngIf=\"actionLabelsMap$ | async as actionLabelsMap\" class=\"rx-ellipsis\" [title]=\"actionLabelsMap[action.name]\"\n                      rx-id=\"card-title\">\n                      {{ actionLabelsMap[action.name] }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveAction(index, index + 1)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveAction(index, index - 1)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"$event.stopPropagation(); removeAction(action)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <rx-form-builder\n                class=\"d-block\"\n                [config]=\"action.config$ | async\"\n                [model]=\"action.model.sandbox.actionProperties$ | async\"\n                (modelChange)=\"action.model.sandbox.updateActionProperties($event); markEditorAsDirty()\"\n                (editorEvent)=\"onEvent($event, action.model, container)\"\n                [isReadOnly]=\"config.isReadOnly\"\n              ></rx-form-builder>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedActions.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.empty-state.message' | translate }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled$ | async\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) :\n    ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep .a-tree__node_leaf .a-tree__toggle{display:none}\n"], components: [{ type: i3__namespace$3.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i3__namespace$3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i3__namespace$3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i3__namespace$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3__namespace$3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3__namespace$3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i3__namespace$1.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i3__namespace$3.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i4__namespace$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i3__namespace$3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }], pipes: { "translate": i6__namespace.TranslatePipe, "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListEditorDialogComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-action-list-editor-dialog',
                        templateUrl: './action-list-editor-dialog.component.html',
                        styleUrls: ['./action-list-editor-dialog.component.scss'],
                        providers: [RxActionListModelManagerService]
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace.RxViewActionRegistryService }, { type: i2__namespace$1.RxStringService }, { type: i3__namespace$3.ActiveModalRef }, { type: ViewDesignerFacade }, { type: RxActionListModelManagerService }, { type: i3__namespace$1.RxExpressionEditorService }, { type: i2__namespace$1.RxGuidService }, { type: i6__namespace.TranslateService }, { type: i0__namespace.Injector }]; }, propDecorators: { accordionTabEls: [{
                    type: i0.ViewChildren,
                    args: [i3$3.AdaptAccordionTabComponent, { read: i0.ElementRef }]
                }] } });

    var ActionListEditorDialogModule = /** @class */ (function () {
        function ActionListEditorDialogModule() {
        }
        return ActionListEditorDialogModule;
    }());
    ActionListEditorDialogModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListEditorDialogModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ActionListEditorDialogModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListEditorDialogModule, declarations: [ActionListEditorDialogComponent], imports: [i4.CommonModule,
            i3$3.AdaptRxSearchModule,
            i3$3.AdaptButtonModule,
            i3$3.AdaptAccordionModule,
            i4$1.DragDropModule,
            i3$3.AdaptEmptyStateModule,
            i3$1.ExpressionEditorModule,
            i3$2.FormsModule,
            i3$1.RxFormBuilderModule,
            i3$3.AdaptIconModule,
            i3$3.AdaptPopoverModule,
            i6.TranslateModule,
            i3$3.AdaptTreeModule], exports: [ActionListEditorDialogComponent] });
    ActionListEditorDialogModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListEditorDialogModule, imports: [[
                i4.CommonModule,
                i3$3.AdaptRxSearchModule,
                i3$3.AdaptButtonModule,
                i3$3.AdaptAccordionModule,
                i4$1.DragDropModule,
                i3$3.AdaptEmptyStateModule,
                i3$1.ExpressionEditorModule,
                i3$2.FormsModule,
                i3$1.RxFormBuilderModule,
                i3$3.AdaptIconModule,
                i3$3.AdaptPopoverModule,
                i6.TranslateModule,
                i3$3.AdaptTreeModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListEditorDialogModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ActionListEditorDialogComponent],
                        exports: [ActionListEditorDialogComponent],
                        entryComponents: [ActionListEditorDialogComponent],
                        imports: [
                            i4.CommonModule,
                            i3$3.AdaptRxSearchModule,
                            i3$3.AdaptButtonModule,
                            i3$3.AdaptAccordionModule,
                            i4$1.DragDropModule,
                            i3$3.AdaptEmptyStateModule,
                            i3$1.ExpressionEditorModule,
                            i3$2.FormsModule,
                            i3$1.RxFormBuilderModule,
                            i3$3.AdaptIconModule,
                            i3$3.AdaptPopoverModule,
                            i6.TranslateModule,
                            i3$3.AdaptTreeModule
                        ]
                    }]
            }] });

    var ActionListControlComponent = /** @class */ (function (_super) {
        __extends(ActionListControlComponent, _super);
        function ActionListControlComponent(rxModalService, rxViewActionRegistryService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.rxViewActionRegistryService = rxViewActionRegistryService;
            _this.availableActions$ = _this.rxViewActionRegistryService.getLicensedActions();
            _this.selectedActions = [];
            _this.availableActions$.subscribe(function (actions) {
                _this.actionLabelsMap = lodash.transform(actions, function (result, action) {
                    result[action.name] = action.label;
                }, {});
            });
            return _this;
        }
        ActionListControlComponent.prototype.focus = function (data) {
            if ((data === null || data === void 0 ? void 0 : data.actionIndex) >= 0) {
                this.openActionSelector(this.selectedActions.find(function (item) { return item.data.index === data.actionIndex; }));
            }
            else {
                this.openActionSelector();
            }
        };
        ActionListControlComponent.prototype.openActionSelector = function (actionToEdit) {
            var _this = this;
            this.rxModalService
                .openModal({
                title: 'Edit actions',
                data: {
                    selectedActions: this.value,
                    actionToEdit: actionToEdit,
                    isReadOnly: this.isDisabled
                },
                content: ActionListEditorDialogComponent,
                size: i5.OpenViewActionModalSize.Large,
                testID: 'edit-actions'
            })
                .then(function (actions) {
                _this.value = actions;
            })
                .catch(lodash.noop);
        };
        ActionListControlComponent.prototype.onSetValue = function () {
            this.updateSortedActionsList();
        };
        ActionListControlComponent.prototype.onWriteValue = function (value) {
            this.updateSortedActionsList();
        };
        ActionListControlComponent.prototype.removeAction = function (action) {
            this.value = lodash.without(this.value, action);
        };
        ActionListControlComponent.prototype.editAction = function (action) {
            this.openActionSelector(action);
        };
        ActionListControlComponent.prototype.updateSortedActionsList = function () {
            this.selectedActions = lodash.sortBy(this.value, function (action) { return action.data.index; });
        };
        return ActionListControlComponent;
    }(i3$1.ValueAccessor));
    ActionListControlComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListControlComponent, deps: [{ token: i5__namespace$1.RxModalService }, { token: i5__namespace.RxViewActionRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ActionListControlComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListControlComponent, selector: "rx-action-list-control", inputs: { options: "options", tooltip: "tooltip" }, providers: [
            {
                provide: i3$2.NG_VALUE_ACCESSOR,
                useExisting: ActionListControlComponent,
                multi: true
            }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-button rx-id=\"open-modal-button\" btn-type=\"tertiary\" class=\"px-0 py-0 pb-1\" (click)=\"openActionSelector()\">\n  <adapt-icon name=\"plus_circle\" class=\"mr-1\"></adapt-icon>\n  Edit actions\n</adapt-button>\n\n<span *ngIf=\"tooltip\" class=\"align-middle\">\n  <span class=\"letter-space\"></span>\n  <adapt-icon [name]=\"'question_circle_o'\" [adaptPopover]=\"tooltip\" appendToBody=\"true\"></adapt-icon>\n</span>\n\n<div rx-id=\"columns\">\n  <span *ngIf=\"selectedActions.length === 0\" class=\"text-tertiary\">No actions added.</span>\n</div>\n\n<ul class=\"list-unstyled mb-0\" *ngIf=\"selectedActions.length > 0\">\n  <li class=\"border px-2 py-1 mb-1 d-flex align-items-center\" *ngFor=\"let action of selectedActions\">\n    <strong class=\"mr-auto\">{{ actionLabelsMap[action.data.name] }}</strong>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      (click)=\"editAction(action)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      *ngIf=\"!isDisabled\"\n      (click)=\"removeAction(action)\"\n    ></button>\n  </li>\n</ul>\n", components: [{ type: i3__namespace$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3__namespace$3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace$3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListControlComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-action-list-control',
                        templateUrl: './action-list-control.component.html',
                        providers: [
                            {
                                provide: i3$2.NG_VALUE_ACCESSOR,
                                useExisting: ActionListControlComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace$1.RxModalService }, { type: i5__namespace.RxViewActionRegistryService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], tooltip: [{
                    type: i0.Input
                }] } });

    var ActionListControlModule = /** @class */ (function () {
        function ActionListControlModule() {
        }
        return ActionListControlModule;
    }());
    ActionListControlModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListControlModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ActionListControlModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListControlModule, declarations: [ActionListControlComponent], imports: [i4.CommonModule, i3$3.AdaptIconModule, i3$3.AdaptButtonModule, ActionListEditorDialogModule, i3$3.AdaptPopoverModule], exports: [ActionListControlComponent] });
    ActionListControlModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListControlModule, imports: [[i4.CommonModule, i3$3.AdaptIconModule, i3$3.AdaptButtonModule, ActionListEditorDialogModule, i3$3.AdaptPopoverModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListControlModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ActionListControlComponent],
                        exports: [ActionListControlComponent],
                        entryComponents: [ActionListControlComponent],
                        imports: [i4.CommonModule, i3$3.AdaptIconModule, i3$3.AdaptButtonModule, ActionListEditorDialogModule, i3$3.AdaptPopoverModule]
                    }]
            }] });

    var RxComponentPermissionEditorWidgetComponent = /** @class */ (function () {
        function RxComponentPermissionEditorWidgetComponent(viewDesignerFacade) {
            this.viewDesignerFacade = viewDesignerFacade;
            this.permissions = [];
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        RxComponentPermissionEditorWidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.viewDesignerFacade
                .getComponentPermissions(this.options.componentGuid)
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (permissions) {
                _this.permissions = permissions;
            });
        };
        RxComponentPermissionEditorWidgetComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxComponentPermissionEditorWidgetComponent.prototype.onPermissionsChange = function (permissions) {
            this.viewDesignerFacade.updateComponentModel(this.options.componentGuid, {
                permissions: permissions
            });
        };
        return RxComponentPermissionEditorWidgetComponent;
    }());
    RxComponentPermissionEditorWidgetComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentPermissionEditorWidgetComponent, deps: [{ token: ViewDesignerFacade }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxComponentPermissionEditorWidgetComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxComponentPermissionEditorWidgetComponent, selector: "rx-component-permission-editor-widget", inputs: { options: "options", isDisabled: "isDisabled" }, ngImport: i0__namespace, template: "<rx-permission-editor\n  [options]=\"options\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"permissions\"\n  (ngModelChange)=\"onPermissionsChange($event)\"\n></rx-permission-editor>\n", components: [{ type: i3__namespace$1.RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: ["options"] }], directives: [{ type: i3__namespace$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentPermissionEditorWidgetComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-component-permission-editor-widget',
                        templateUrl: './component-permission-editor-widget.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: ViewDesignerFacade }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], isDisabled: [{
                    type: i0.Input
                }] } });

    var RxComponentPermissionEditorWidgetModule = /** @class */ (function () {
        function RxComponentPermissionEditorWidgetModule() {
        }
        return RxComponentPermissionEditorWidgetModule;
    }());
    RxComponentPermissionEditorWidgetModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentPermissionEditorWidgetModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxComponentPermissionEditorWidgetModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentPermissionEditorWidgetModule, declarations: [RxComponentPermissionEditorWidgetComponent], imports: [i4.CommonModule, i3$2.FormsModule, i3$1.RxPermissionEditorModule] });
    RxComponentPermissionEditorWidgetModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentPermissionEditorWidgetModule, imports: [[i4.CommonModule, i3$2.FormsModule, i3$1.RxPermissionEditorModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxComponentPermissionEditorWidgetModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxComponentPermissionEditorWidgetComponent],
                        imports: [i4.CommonModule, i3$2.FormsModule, i3$1.RxPermissionEditorModule]
                    }]
            }] });

    var RxViewCustomizationOptionsModule = /** @class */ (function () {
        function RxViewCustomizationOptionsModule() {
        }
        return RxViewCustomizationOptionsModule;
    }());
    RxViewCustomizationOptionsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewCustomizationOptionsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxViewCustomizationOptionsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewCustomizationOptionsModule, declarations: [RxViewCustomizationOptionsComponent], imports: [i4.CommonModule, i3$2.FormsModule, i3$1.CustomizationOptionsModule] });
    RxViewCustomizationOptionsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewCustomizationOptionsModule, imports: [[i4.CommonModule, i3$2.FormsModule, i3$1.CustomizationOptionsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewCustomizationOptionsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule, i3$2.FormsModule, i3$1.CustomizationOptionsModule],
                        declarations: [RxViewCustomizationOptionsComponent]
                    }]
            }] });

    var ActionListWidgetComponent = /** @class */ (function (_super) {
        __extends(ActionListWidgetComponent, _super);
        function ActionListWidgetComponent(injector) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.actions = [];
            // @ts-ignore
            _this.modelSandbox = _this.designerItemModel.sandbox;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        ActionListWidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            var actions$ = this.modelSandbox.getChildComponents();
            actions$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (actions) {
                _this.actions = actions;
            });
        };
        ActionListWidgetComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        ActionListWidgetComponent.prototype.onActionsChange = function (actions) {
            this.modelSandbox.setChildren(this.getActionComponentPayloads(actions));
        };
        ActionListWidgetComponent.prototype.focus = function (data) {
            this.actionListControlComponent.focus(data);
        };
        ActionListWidgetComponent.prototype.getActionComponentPayloads = function (actionInspectorModels) {
            return actionInspectorModels.map(function (model) { return (Object.assign({ type: i5.RxViewComponentType.Action }, model)); });
        };
        return ActionListWidgetComponent;
    }(i3$1.InspectorWidgetBase));
    ActionListWidgetComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListWidgetComponent, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ActionListWidgetComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListWidgetComponent, selector: "rx-action-list-widget", viewQueries: [{ propertyName: "actionListControlComponent", first: true, predicate: ActionListControlComponent, descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<rx-action-list-control\n  [disabled]=\"modelSandbox.isViewReadOnly$ | async\"\n  [(ngModel)]=\"actions\"\n  (ngModelChange)=\"onActionsChange($event)\"\n  [tooltip]=\"options?.tooltip\"\n></rx-action-list-control>\n", components: [{ type: ActionListControlComponent, selector: "rx-action-list-control", inputs: ["options", "tooltip"] }], directives: [{ type: i3__namespace$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListWidgetComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-action-list-widget',
                        templateUrl: './action-list-widget.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; }, propDecorators: { actionListControlComponent: [{
                    type: i0.ViewChild,
                    args: [ActionListControlComponent]
                }] } });

    var ActionListWidgetModule = /** @class */ (function () {
        function ActionListWidgetModule() {
        }
        return ActionListWidgetModule;
    }());
    ActionListWidgetModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListWidgetModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ActionListWidgetModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListWidgetModule, declarations: [ActionListWidgetComponent], imports: [i4.CommonModule, ActionListControlModule, i3$2.FormsModule] });
    ActionListWidgetModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListWidgetModule, imports: [[i4.CommonModule, ActionListControlModule, i3$2.FormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ActionListWidgetModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ActionListWidgetComponent],
                        imports: [i4.CommonModule, ActionListControlModule, i3$2.FormsModule]
                    }]
            }] });

    var ViewDesignerComponentModel = /** @class */ (function () {
        function ViewDesignerComponentModel(injector, sandbox) {
            this.injector = injector;
            this.sandbox = sandbox;
        }
        Object.defineProperty(ViewDesignerComponentModel.prototype, "expressionConfigurator", {
            get: function () {
                if (!this._expressionConfigurator) {
                    this._expressionConfigurator = new (this.sandbox.descriptor.expressionConfigurator ||
                        RxViewComponentExpressionConfigurator)(this.injector, this.sandbox.guid, this, this.sandbox.descriptor.type);
                }
                return this._expressionConfigurator;
            },
            enumerable: false,
            configurable: true
        });
        ViewDesignerComponentModel.prototype.getExpressionForProperty = function (propertyPath) {
            return "${view.components." + this.sandbox.guid + "." + propertyPath + "}";
        };
        return ViewDesignerComponentModel;
    }());

    var RX_AVAILABLE_ON_DEVICES_OPTIONS = [
        {
            id: i5.RxDevice.Desktop,
            name: 'Desktop'
        },
        {
            id: i5.RxDevice.Tablet,
            name: 'Tablet'
        },
        {
            id: i5.RxDevice.Mobile,
            name: 'Mobile'
        }
    ];
    function getAvailableOnDevicesInspectorConfig() {
        return {
            name: i5.RX_AVAILABLE_ON_DEVICES_PROP_NAME,
            component: i3$1.SelectFormControlComponent,
            options: {
                label: 'Available on devices',
                options: RX_AVAILABLE_ON_DEVICES_OPTIONS,
                multiple: true,
                required: true,
                hideSelectAllButton: true,
                hideDeselectAllButton: true
            }
        };
    }
    function getHiddenFieldInspectorConfig() {
        return {
            name: i5.RX_HIDDEN_PROP_NAME,
            component: i3$1.OptionalExpressionInspectorControlComponent,
            options: {
                label: 'Hidden'
            }
        };
    }
    function getDisabledFieldInspectorConfig() {
        return {
            name: i5.RX_DISABLED_PROP_NAME,
            component: i3$1.OptionalExpressionInspectorControlComponent,
            options: {
                label: 'Disabled'
            }
        };
    }
    function getStylesFieldInspectorConfig(autocompleteValues) {
        if (autocompleteValues === void 0) { autocompleteValues = []; }
        return {
            name: i5.RX_STYLES_PROP_NAME,
            component: i3$1.TagsFormControlComponent,
            options: {
                label: 'CSS classes',
                placeholder: 'Add CSS classes',
                tooltip: new i3.Tooltip('Enter CSS class names to apply to this view component.'),
                errorCheck: validateCssClassName,
                autocompleteValues: autocompleteValues
            }
        };
    }
    function getStandardPropsInspectorConfigs() {
        return [getHiddenFieldInspectorConfig(), getAvailableOnDevicesInspectorConfig(), getStylesFieldInspectorConfig()];
    }

    var RxViewActionValidatorService = /** @class */ (function () {
        function RxViewActionValidatorService(rxViewActionRegistryService, rxStringService, rxLogService, rxViewExpressionValidatorService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxStringService = rxStringService;
            this.rxLogService = rxLogService;
            this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
        }
        RxViewActionValidatorService.prototype.validate = function (actionsDesignData, propertyName) {
            var _this = this;
            var issues = lodash.flow(function (actions) { return actions.map(function (_b) {
                var data = _b.data;
                var descriptor = _this.rxViewActionRegistryService.get(data.name);
                return [
                    rxjs.of(_this.validateRequiredProps(data, descriptor, propertyName)),
                    _this.performCustomValidation(data, descriptor, propertyName),
                    _this.validateExpressions(data, descriptor, propertyName)
                ];
            }); }, lodash.flatten)(actionsDesignData);
            return rxjs.combineLatest(__spreadArray([rxjs.of(this.validateActionSequence(actionsDesignData, propertyName))], __read(issues))).pipe(operators.map(lodash.flatten));
        };
        RxViewActionValidatorService.prototype.performCustomValidation = function (actionProps, descriptor, issuePropertyName) {
            var designManager = this.rxViewActionRegistryService.getDesignManager(descriptor.name);
            return designManager
                ? designManager.validate(actionProps, issuePropertyName).pipe(operators.map(function (issues) { return issues.map(function (issue) { return (Object.assign(Object.assign({}, issue), { data: {
                        actionIndex: actionProps.index
                    } })); }); }))
                : rxjs.of([]);
        };
        RxViewActionValidatorService.prototype.validateRequiredProps = function (actionProps, descriptor, issuePropertyName) {
            var _this = this;
            return lodash.flow(function (descriptorParams) { return descriptorParams.filter(function (param) { return param.isRequired === true && _this.rxStringService.isEmptySafe(actionProps[param.name]); }); }, function (descriptorParams) { return descriptorParams.map(function (param) { return ({
                type: 'error',
                description: descriptor.label + " action: " + (param.label || param.name) + " cannot be blank.",
                propertyName: issuePropertyName,
                data: {
                    actionIndex: actionProps.index
                }
            }); }); })(descriptor.parameters);
        };
        RxViewActionValidatorService.prototype.validateExpressions = function (actionProps, descriptor, issuePropertyName) {
            var _this = this;
            var actionIssues = descriptor.parameters
                .filter(function (paramDescriptor) { return paramDescriptor.enableExpressionEvaluation === true && actionProps[paramDescriptor.name]; })
                .map(function (paramDescriptor) { return _this.rxViewExpressionValidatorService
                .validate(actionProps[paramDescriptor.name], issuePropertyName, paramDescriptor.label || paramDescriptor.name, paramDescriptor.evaluatorService)
                .pipe(operators.map(function (issues) { return issues.map(function (issue) { return (Object.assign(Object.assign({}, issue), { description: descriptor.label + " action: " + issue.description, data: {
                    actionIndex: actionProps.index
                } })); }); })); });
            return actionIssues.length ? rxjs.combineLatest(actionIssues).pipe(operators.map(lodash.flatten)) : rxjs.of([]);
        };
        RxViewActionValidatorService.prototype.validateActionSequence = function (actions, issuePropertyName) {
            var _this = this;
            return lodash.flow(function (actionsDesignData) { return lodash.map(actionsDesignData, function (_b) {
                var data = _b.data;
                var descriptor = _this.rxViewActionRegistryService.get(data.name);
                return descriptor
                    ? lodash.map(data, function (propertyValue, propertyName) {
                        var _a;
                        if (((_a = descriptor.parameters.find(function (param) { return param.name === propertyName; })) === null || _a === void 0 ? void 0 : _a.enableExpressionEvaluation) &&
                            _this.rxStringService.isNonEmptyString(propertyValue)) {
                            // Extract <ID> from ${view.components.<ID>.<Path>}
                            var matches = propertyValue.match(/\${view\.components\.([0-9a-z-]+)\..+}/);
                            if (matches && matches[1]) {
                                var referencedAction = lodash.find(actionsDesignData, { guid: matches[1] });
                                if (Number(referencedAction === null || referencedAction === void 0 ? void 0 : referencedAction.data.index) > Number(data.index)) {
                                    return {
                                        type: 'error',
                                        description: descriptor.label + " action: invalid expression for " + propertyName + ".",
                                        propertyName: issuePropertyName
                                    };
                                }
                            }
                        }
                    })
                    : [];
            }); }, lodash.flatten, lodash.compact)(actions);
        };
        return RxViewActionValidatorService;
    }());
    RxViewActionValidatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionValidatorService, deps: [{ token: i5__namespace.RxViewActionRegistryService }, { token: i2__namespace$1.RxStringService }, { token: i3__namespace.RxLogService }, { token: RxViewExpressionValidatorService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewActionValidatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionValidatorService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewActionValidatorService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace.RxViewActionRegistryService }, { type: i2__namespace$1.RxStringService }, { type: i3__namespace.RxLogService }, { type: RxViewExpressionValidatorService }]; } });

    var ComponentSandbox = /** @class */ (function () {
        function ComponentSandbox(injector, guid, descriptor) {
            var _this = this;
            this.injector = injector;
            this.guid = guid;
            this.descriptor = descriptor;
            this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
            this.systemActions$ = this.injector.get(i1.Actions);
            this.viewDesignerDispatcher = this.injector.get(ViewDesignerDispatcher);
            this.rxViewDesignerModels = this.injector.get(RxViewDesignerModels);
            this.childModelsInitialized$ = new rxjs.BehaviorSubject(false);
            this.dispatcher$ = new rxjs.Subject();
            this.breadcrumbs$ = new rxjs.ReplaySubject(1);
            this.setUpPublicStreams();
            this.viewDesignerFacade
                .getComponentType(guid)
                .pipe(operators.take(1))
                .subscribe(function (componentType) { return (_this.componentType = componentType); });
            this.viewDesignerFacade
                .getComponentModel(this.guid)
                .pipe(operators.map(function (model) { return Boolean(model.lastUpdateTime || model.name); }), operators.switchMap(function (isExistingViewComponent) {
                if (isExistingViewComponent) {
                    return _this.viewDesignerFacade.viewModelsInitialized$;
                }
                else {
                    return rxjs.of(null);
                }
            }), operators.take(1), operators.takeUntil(this.destroyed$))
                .subscribe(function () {
                _this.childModelsInitialized$.next(true);
            });
            this.viewModelsInitialized$ = this.viewDesignerFacade.viewModelsInitialized$.pipe(operators.takeUntil(this.destroyed$));
            // for optimization reasons postpone emit of breadcrumbs till component gets selected
            this.isComponentSelected$
                .pipe(operators.filter(function (isSelected) { return isSelected; }), operators.first(), operators.switchMap(function () { return _this.breadcrumbs$; }), operators.distinctUntilChanged(), operators.takeUntil(this.destroyed$))
                .subscribe(function (label) {
                _this.dispatcher$.next(setBreadcrumbs({
                    guid: _this.guid,
                    label: label
                }));
            });
            rxjs.merge(
            // skip initial batch of setValidationIssues actions that are emitted during view designer initialization with empty payload
            this.dispatcher$.pipe(i1.ofType(setValidationIssues), operators.skipWhile(function (action) { return action.issues.length === 0; })), this.dispatcher$.pipe(operators.filter(function (action) { return action.type !== setValidationIssues.type; })))
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (action) { return _this.viewDesignerDispatcher.dispatch(action); });
            // complete created subjects
            this.destroyed$.subscribe(function () {
                _this.childModelsInitialized$.complete();
                _this.dispatcher$.complete();
                _this.breadcrumbs$.complete();
            });
        }
        ComponentSandbox.prototype.createError = function (description, propertyName, disableCorrection) {
            return { type: 'error', description: description, propertyName: propertyName, disableCorrection: disableCorrection };
        };
        ComponentSandbox.prototype.createWarning = function (description, propertyName, disableCorrection) {
            return { type: 'warning', description: description, propertyName: propertyName, disableCorrection: disableCorrection };
        };
        ComponentSandbox.prototype.getComponent = function (guid) {
            return this.viewDesignerFacade.getComponent(guid);
        };
        ComponentSandbox.prototype.getChildComponents = function (filterPredicate) {
            return this.childModelsInitialized$
                .asObservable()
                .pipe(operators.filter(Boolean), operators.switchMapTo(this.viewDesignerFacade.getChildComponents(this.guid, filterPredicate)), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.getChildComponentsTree = function () {
            return this.childModelsInitialized$.asObservable().pipe(operators.filter(function (isInitialized) { return isInitialized; }), operators.switchMapTo(this.viewDesignerFacade.getChildComponentTree(this.guid)), operators.shareReplay(1), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.getChildComponentGuids = function (filterPredicate, recursive) {
            if (recursive === void 0) { recursive = false; }
            return this.childModelsInitialized$
                .asObservable()
                .pipe(operators.filter(Boolean), operators.switchMapTo(this.viewDesignerFacade.getChildComponentGuids(this.guid, recursive, filterPredicate)), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.setChildren = function (data, parentGuid) {
            this.dispatcher$.next(setChildComponents({
                payload: {
                    guid: parentGuid || this.guid,
                    data: data
                }
            }));
        };
        ComponentSandbox.prototype.setChildrenByType = function (data, types) {
            this.dispatcher$.next(setChildComponents({
                payload: {
                    guid: this.guid,
                    data: data,
                    types: types
                }
            }));
        };
        ComponentSandbox.prototype.getParentComponentGuid = function (componentType) {
            return this.viewDesignerFacade
                .getParentComponentGuid(this.guid, componentType)
                .pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.setValidationIssues = function (issues) {
            this.dispatcher$.next(setValidationIssues({ issues: issues, guid: this.guid }));
        };
        ComponentSandbox.prototype.updateComponentProperties = function (properties) {
            this.viewDesignerFacade.updateComponentProperties(this.guid, properties);
        };
        ComponentSandbox.prototype.getComponentPropertyValue = function (propertyName, componentGuid) {
            if (componentGuid === void 0) { componentGuid = this.guid; }
            return this.viewDesignerFacade
                .getComponentPropertyValue(componentGuid, propertyName)
                .pipe(operators.shareReplay(1), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.getViewPropertyValue = function (propertyName) {
            return this.viewDesignerFacade.getViewPropertyValue(propertyName).pipe(operators.shareReplay(1), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.updateInspectorConfig = function (inspectorConfig) {
            this.viewDesignerFacade.setComponentInspector(this.guid, inspectorConfig);
        };
        ComponentSandbox.prototype.setBreadcrumbs = function (label) {
            this.breadcrumbs$.next(label);
        };
        ComponentSandbox.prototype.addComponent = function (data) {
            var _this = this;
            var dataArray = lodash.castArray(data);
            var actionPayload = dataArray.map(function (component) { return (Object.assign(Object.assign({}, component), { parentGuid: _this.guid })); });
            this.dispatcher$.next(addNewComponents({ payload: actionPayload }));
        };
        ComponentSandbox.prototype.selectComponent = function (guid) {
            this.dispatcher$.next(selectComponent({ guid: guid }));
        };
        ComponentSandbox.prototype.removeComponents = function (guids, selectParent) {
            this.viewDesignerFacade.removeViewComponents(guids, selectParent);
        };
        ComponentSandbox.prototype.moveComponent = function (guid, insertIndex, targetGuid) {
            var data = { guid: guid };
            var columnIndex = 0;
            var outletName = i5.RX_VIEW_DEFINITION.defaultOutletName;
            this.dispatcher$.next(insertComponent({
                data: data,
                insertIndex: insertIndex,
                columnIndex: columnIndex,
                outletName: outletName,
                targetGuid: targetGuid
            }));
        };
        ComponentSandbox.prototype.setLayout = function (cols) {
            this.dispatcher$.next(setComponentLayout({
                guid: this.guid,
                cols: cols
            }));
        };
        ComponentSandbox.prototype.getLayout = function (guid) {
            return this.viewDesignerFacade.getComponentLayout(guid).pipe(operators.shareReplay(1), operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.setCommonDataDictionary = function (dataDictionaryBranch) {
            this.viewDesignerFacade.setComponentCommonDataDictionaryBranch(this.guid, dataDictionaryBranch);
        };
        ComponentSandbox.prototype.setSettablePropertiesDataDictionary = function (componentName, dataDictionary) {
            this.viewDesignerFacade.setComponentSettablePropertiesDataDictionary(this.guid, componentName, dataDictionary);
        };
        ComponentSandbox.prototype.getComponentModel = function (guid) {
            return this.rxViewDesignerModels.get(guid);
        };
        ComponentSandbox.prototype.getComponentsByType = function (type) {
            return this.viewDesignerFacade
                .getComponentsByType(type)
                .pipe(operators.takeUntil(this.destroyed$));
        };
        ComponentSandbox.prototype.setUpPublicStreams = function () {
            var _this = this;
            var viewComponentsRemovedAction$ = this.systemActions$.pipe(i1.ofType(componentsRemoved), operators.filter(function (action) { return action.guids.includes(_this.guid); }));
            this.destroyed$ = rxjs.merge(viewComponentsRemovedAction$, this.viewDesignerFacade.initViewDesigner$, this.viewDesignerFacade.destroyViewDesigner$).pipe(operators.mapTo(true), operators.first());
            this.componentProperties$ = this.viewDesignerFacade
                .getComponentProperties(this.guid)
                .pipe(operators.filter(Boolean), operators.takeUntil(this.destroyed$), operators.shareReplay(1));
            this.isComponentSelected$ = this.systemActions$.pipe(i1.ofType(selectComponent), operators.map(function (_a) {
                var guid = _a.guid;
                return guid === _this.guid;
            }), operators.distinctUntilChanged(), operators.startWith(false), operators.takeUntil(this.destroyed$), operators.shareReplay(1));
            this.isViewReadOnly$ = this.viewDesignerFacade.isViewReadOnly$;
        };
        return ComponentSandbox;
    }());

    var RxViewExpressionValidatorRegistryService = /** @class */ (function () {
        function RxViewExpressionValidatorRegistryService(rxViewComponentRegistryService, viewDesignerFacade, rxViewExpressionValidatorService) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
            this.issuesObservableMap = new Map();
        }
        RxViewExpressionValidatorRegistryService.prototype.registerComponents = function (guids) {
            var _this = this;
            guids.forEach(function (guid) { return _this.issuesObservableMap.set(guid, _this.getComponentValidationIssues(guid)); });
            this.initValidation();
        };
        RxViewExpressionValidatorRegistryService.prototype.unregisterComponents = function (guids) {
            var _this = this;
            guids.forEach(function (guid) { return _this.issuesObservableMap.delete(guid); });
            this.initValidation();
        };
        RxViewExpressionValidatorRegistryService.prototype.unregisterAllComponents = function () {
            var _a;
            this.issuesObservableMap.clear();
            (_a = this.validateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        RxViewExpressionValidatorRegistryService.prototype.initValidation = function () {
            var _this = this;
            var _a;
            (_a = this.validateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.validateSubscription = rxjs.combineLatest(Array.from(this.issuesObservableMap.entries()).map(function (_b) {
                var _c = __read(_b, 2), guid = _c[0], issues$ = _c[1];
                return issues$.pipe(operators.map(function (issues) {
                    var _b;
                    return (_b = {},
                        _b[guid] = issues,
                        _b);
                }));
            }))
                .pipe(operators.map(function (issuesByComponentGuid) { return lodash.merge.apply(void 0, __spreadArray([{}], __read(issuesByComponentGuid))); }), operators.skipWhile(function (issuesByComponentGuid) { return lodash.every(Object.values(issuesByComponentGuid), lodash.isEmpty); }), 
            // debounceTime will allow Set expression validation issues action to be executed once for improved performance.
            operators.debounceTime(0))
                .subscribe(function (issues) {
                _this.viewDesignerFacade.setExpressionValidationIssues(issues);
            });
        };
        RxViewExpressionValidatorRegistryService.prototype.getComponentValidationIssues = function (guid) {
            var _this = this;
            return this.viewDesignerFacade.getComponentType(guid).pipe(operators.take(1), operators.switchMap(function (componentType) {
                var descriptor = _this.rxViewComponentRegistryService.get(componentType);
                var expressionProps = lodash.filter(descriptor === null || descriptor === void 0 ? void 0 : descriptor.properties, {
                    enableExpressionEvaluation: true
                });
                var expressionPropertyNames = lodash.map(expressionProps, 'name');
                var descriptorPropMap = new Map(expressionProps.map(function (prop) { return [prop.name, prop]; }));
                return expressionPropertyNames.length
                    ? rxjs.combineLatest(expressionPropertyNames.map(function (propertyName) { return _this.viewDesignerFacade
                        .getComponentPropertyValue(guid, propertyName)
                        .pipe(operators.switchMap(function (propertyValue) { return _this.rxViewExpressionValidatorService
                        .validate(propertyValue, propertyName, descriptorPropMap.get(propertyName).label, descriptorPropMap.get(propertyName).evaluatorService)
                        .pipe(operators.takeUntil(_this.viewDesignerFacade.allComponentGuids$.pipe(operators.filter(function (guids) { return !guids.has(guid); })))); })); })).pipe(operators.map(lodash.flatten))
                    : rxjs.of([]);
            }), operators.publishReplay(1), operators.refCount());
        };
        return RxViewExpressionValidatorRegistryService;
    }());
    RxViewExpressionValidatorRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewExpressionValidatorRegistryService, deps: [{ token: i5__namespace.RxViewComponentRegistryService }, { token: ViewDesignerFacade }, { token: RxViewExpressionValidatorService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewExpressionValidatorRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewExpressionValidatorRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewExpressionValidatorRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace.RxViewComponentRegistryService }, { type: ViewDesignerFacade }, { type: RxViewExpressionValidatorService }]; } });

    var RxViewDesignerStateHelperService = /** @class */ (function () {
        function RxViewDesignerStateHelperService() {
        }
        RxViewDesignerStateHelperService.prototype.getInitialComponentProperties = function (initialProperties, componentDescriptor) {
            var _a;
            var result = initialProperties;
            if (lodash.isFunction((_a = componentDescriptor.designComponentModel) === null || _a === void 0 ? void 0 : _a.getInitialProperties)) {
                result = componentDescriptor.designComponentModel.getInitialProperties(initialProperties);
            }
            return result;
        };
        RxViewDesignerStateHelperService.prototype.getDefaultComponentPermissions = function (componentDescriptor) {
            var _a;
            var permissions = null;
            if (lodash.isFunction((_a = componentDescriptor.designComponentModel) === null || _a === void 0 ? void 0 : _a.getDefaultPermissions)) {
                permissions = componentDescriptor.designComponentModel.getDefaultPermissions();
            }
            return permissions;
        };
        return RxViewDesignerStateHelperService;
    }());
    RxViewDesignerStateHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerStateHelperService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDesignerStateHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerStateHelperService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDesignerStateHelperService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var ViewDesignerComponentEffects = /** @class */ (function () {
        function ViewDesignerComponentEffects(actions$, injector, viewDesignerModels, rxGuidService, store$, rxViewComponentRegistryService, rxViewDesignerInspectorService, rxViewExpressionValidatorRegistryService, rxViewDesignerStateHelperService, rxViewDataDictionaryStoreService) {
            var _this = this;
            this.actions$ = actions$;
            this.injector = injector;
            this.viewDesignerModels = viewDesignerModels;
            this.rxGuidService = rxGuidService;
            this.store$ = store$;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.rxViewDesignerInspectorService = rxViewDesignerInspectorService;
            this.rxViewExpressionValidatorRegistryService = rxViewExpressionValidatorRegistryService;
            this.rxViewDesignerStateHelperService = rxViewDesignerStateHelperService;
            this.rxViewDataDictionaryStoreService = rxViewDataDictionaryStoreService;
            this.initializeComponentModel$ = this.actions$.pipe(i1.ofType(initializeComponentModels), operators.tap(function (action) {
                action.payload.forEach(function (_a) {
                    var componentModel = _a.componentModel;
                    var componentDescriptor = _this.rxViewComponentRegistryService.get(componentModel.type);
                    var sandbox = new ComponentSandbox(_this.injector, componentModel.guid, componentDescriptor);
                    var model = new componentDescriptor.designComponentModel(_this.injector, sandbox);
                    if (lodash.isFunction(model.rxInit)) {
                        model.rxInit();
                    }
                    _this.viewDesignerModels.set(componentModel.guid, model);
                });
            }), operators.map(function () { return viewModelsInitialized(); }));
            this.registerComponentsValidation$ = this.actions$.pipe(i1.ofType(initializeDataComponentModels, initializeComponentModels), operators.tap(function (action) { return _this.rxViewExpressionValidatorRegistryService.registerComponents(lodash.map(action.payload, function (payload) { return payload.componentModel.guid; })); }));
            this.onComponentsRemoved$ = this.actions$.pipe(i1.ofType(componentsRemoved), operators.tap(function (_a) {
                var guids = _a.guids;
                _this.rxViewExpressionValidatorRegistryService.unregisterComponents(guids);
                _this.rxViewDataDictionaryStoreService.removeDataDictionaryForComponents(guids);
            }));
            this.unregisterAllComponentsValidation$ = this.actions$.pipe(i1.ofType(initViewDesigner, destroyViewDesigner), operators.tap(function () { return _this.rxViewExpressionValidatorRegistryService.unregisterAllComponents(); }));
            this.insertComponent$ = this.actions$.pipe(i1.ofType(insertComponent), operators.map(function (payload) {
                var newPayload = {
                    insertIndex: payload.insertIndex,
                    columnIndex: payload.columnIndex,
                    outletName: payload.outletName,
                    parentGuid: payload.targetGuid
                };
                return payload.data.guid
                    ? moveComponent(Object.assign(Object.assign({}, newPayload), { guid: payload.data.guid }))
                    : addNewComponents({
                        payload: [
                            Object.assign(Object.assign({}, newPayload), { type: payload.data.type, selectComponent: true, propertiesByName: payload.data.initialPropertiesByName })
                        ]
                    });
            }));
            this.addNewComponent$ = this.actions$.pipe(i1.ofType(addNewComponents), operators.withLatestFrom(this.store$.select(viewComponentModelsSelector)), operators.mergeMap(function (_a) {
                var _b = __read(_a, 2), action = _b[0], viewComponentsState = _b[1];
                var initializeComponentModelPayloads = [];
                var initializeDataComponentModelPayloads = [];
                var componentGuidsToSelect = [];
                action.payload.forEach(function (component) {
                    _this.processAddComponentPayload(component, initializeComponentModelPayloads, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState);
                });
                return [
                    initializeComponentModelPayloads.length
                        ? initializeComponentModels({ payload: initializeComponentModelPayloads })
                        : null,
                    initializeDataComponentModelPayloads.length
                        ? initializeDataComponentModels({ payload: initializeDataComponentModelPayloads })
                        : null,
                    componentGuidsToSelect.length
                        ? selectComponent({
                            guid: lodash.last(componentGuidsToSelect)
                        })
                        : null
                ].filter(Boolean);
            }));
            this.removeComponent$ = this.actions$.pipe(i1.ofType(removeComponents), operators.filter(function (_a) {
                var guids = _a.guids;
                return !lodash.isEmpty(guids);
            }), operators.withLatestFrom(this.store$.select(viewComponentModelsSelector)), operators.mergeMap(function (_a) {
                var _b = __read(_a, 2), payload = _b[0], viewComponentsState = _b[1];
                var guidsToRemove = payload.guids.reduce(function (result, guid) {
                    var removedComponentModel = viewComponentsState[guid];
                    if (removedComponentModel) {
                        result.push.apply(result, __spreadArray([guid], __read(getAllChildGuids(removedComponentModel, viewComponentsState))));
                    }
                    return result;
                }, []);
                var removeGuidsSet = new Set(guidsToRemove);
                removeGuidsSet.forEach(function (guid) {
                    _this.viewDesignerModels.delete(guid);
                    _this.rxViewDesignerInspectorService.delete(guid);
                });
                var actions = [componentsRemoved({ guids: __spreadArray([], __read(removeGuidsSet)) })];
                if (payload.selectParent) {
                    var lastRemovedModel = viewComponentsState[lodash.last(payload.guids)];
                    if (lastRemovedModel === null || lastRemovedModel === void 0 ? void 0 : lastRemovedModel.parentGuid) {
                        actions.push(selectComponent({
                            guid: lastRemovedModel.parentGuid
                        }));
                    }
                }
                return actions;
            }));
            this.setChildren$ = this.actions$.pipe(i1.ofType(setChildComponents), operators.map(function (action) { return action.payload; }), operators.withLatestFrom(this.store$.select(viewComponentModelsSelector)), operators.mergeMap(function (_a) {
                var _b = __read(_a, 2), actionPayload = _b[0], viewComponentsState = _b[1];
                var actions = [];
                var componentGuidsToRemove = [];
                var addComponentsPayloadAll = [];
                var editComponentPayloadAll = [];
                processChildComponents(actionPayload);
                function processChildComponents(payload) {
                    var componentsToSet = payload.data;
                    var componentsGuidsToSet = componentsToSet.map(function (component) { return component.guid; });
                    var hostComponent = viewComponentsState[payload.guid];
                    var existingChildGuids = getChildGuidsFromModel(hostComponent);
                    if (payload.types) {
                        existingChildGuids = existingChildGuids.filter(function (guid) { return payload.types.includes(viewComponentsState[guid].type); });
                    }
                    var componentGuidsToRemoveLocal = lodash.difference(existingChildGuids, componentsGuidsToSet);
                    var componentGuidsToAdd = lodash.difference(componentsGuidsToSet, existingChildGuids);
                    var componentsGuidsToUpdate = lodash.difference(existingChildGuids, componentGuidsToAdd, componentGuidsToRemoveLocal);
                    componentGuidsToRemove.push.apply(componentGuidsToRemove, __spreadArray([], __read(componentGuidsToRemoveLocal)));
                    var addComponentsPayload = componentsToSet.reduce(function (result, action) {
                        if (lodash.includes(componentGuidsToAdd, action.guid)) {
                            result.push(getAddComponentPayload(action, payload.guid));
                        }
                        return result;
                    }, []);
                    addComponentsPayloadAll.push.apply(addComponentsPayloadAll, __spreadArray([], __read(addComponentsPayload)));
                    var editComponentPayload = componentsToSet.reduce(function (result, action) {
                        if (lodash.includes(componentsGuidsToUpdate, action.guid)) {
                            var existingModel = viewComponentsState[action.guid];
                            if (!lodash.isEqual(existingModel.propertiesByName, action.data || {})) {
                                result.push({ guid: action.guid, data: action.data });
                            }
                            if (action.children) {
                                processChildComponents({
                                    guid: action.guid,
                                    data: action.children
                                });
                            }
                        }
                        return result;
                    }, []);
                    editComponentPayloadAll.push.apply(editComponentPayloadAll, __spreadArray([], __read(editComponentPayload)));
                }
                function getAddComponentPayload(action, parentGuid) {
                    var result = {
                        propertiesByName: action.data,
                        guid: action.guid,
                        parentGuid: parentGuid,
                        type: action.type,
                        columnIndex: action.columnIndex || 0,
                        insertIndex: action.insertIndex,
                        outletName: action.outletName || i5.RX_VIEW_DEFINITION.defaultOutletName
                    };
                    if (action.children) {
                        result.children = lodash.map(action.children, function (child) { return getAddComponentPayload(child, action.guid); });
                    }
                    return result;
                }
                if (componentGuidsToRemove.length) {
                    actions.push(removeComponents({ guids: componentGuidsToRemove }));
                }
                if (addComponentsPayloadAll.length) {
                    actions.push(addNewComponents({ payload: addComponentsPayloadAll }));
                }
                if (editComponentPayloadAll.length) {
                    actions.push(setComponentData({ payload: editComponentPayloadAll }));
                }
                return actions;
            }));
        }
        ViewDesignerComponentEffects.prototype.processAddComponentPayload = function (component, initializeComponentModelPayload, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState) {
            var _this = this;
            var componentDescriptor = this.rxViewComponentRegistryService.get(component.type);
            var payloadParent = initializeComponentModelPayload.find(function (payload) { return payload.componentModel.guid === component.parentGuid; });
            var modelParent = viewComponentsState[component.parentGuid];
            var parentWithoutLayout = (payloadParent && !payloadParent.componentModel.layout) || (modelParent && !modelParent.layout);
            var componentModel = {
                guid: component.guid || this.rxGuidService.generate(),
                type: component.type,
                parentGuid: component.parentGuid,
                propertiesByName: this.rxViewDesignerStateHelperService.getInitialComponentProperties(component.propertiesByName, componentDescriptor),
                permissions: this.rxViewDesignerStateHelperService.getDefaultComponentPermissions(componentDescriptor)
            };
            if (this.rxViewComponentRegistryService.isDataComponentDescriptor(componentDescriptor) || parentWithoutLayout) {
                componentModel.resourceType = componentDescriptor.isContainerComponent
                    ? i5.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent
                    : i5.RX_VIEW_DEFINITION.resourceTypes.viewComponent;
                initializeDataComponentModelPayloads.push({
                    componentModel: componentModel
                });
            }
            else {
                componentModel.resourceType =
                    componentDescriptor.outlets || componentDescriptor.isContainerComponent
                        ? i5.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent
                        : i5.RX_VIEW_DEFINITION.resourceTypes.viewComponent;
                if (componentDescriptor.outlets) {
                    componentModel.layout = i5.RxViewLayout.getEmptyViewLayoutForOutletNames(componentDescriptor.outlets);
                }
                initializeComponentModelPayload.push({
                    componentModel: componentModel,
                    insertIndex: component.insertIndex,
                    columnIndex: component.columnIndex || 0,
                    outletName: component.outletName || i5.RX_VIEW_DEFINITION.defaultOutletName
                });
                if (component.selectComponent) {
                    componentGuidsToSelect.push(componentModel.guid);
                }
            }
            lodash.forEach(component.children, function (child) {
                _this.processAddComponentPayload(Object.assign(Object.assign({}, child), { parentGuid: componentModel.guid }), initializeComponentModelPayload, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState);
            });
        };
        return ViewDesignerComponentEffects;
    }());
    ViewDesignerComponentEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerComponentEffects, deps: [{ token: i1__namespace.Actions }, { token: i0__namespace.Injector }, { token: RxViewDesignerModels }, { token: i2__namespace$1.RxGuidService }, { token: i2__namespace.Store }, { token: i5__namespace.RxViewComponentRegistryService }, { token: RxViewDesignerInspectorService }, { token: RxViewExpressionValidatorRegistryService }, { token: RxViewDesignerStateHelperService }, { token: RxViewDataDictionaryStoreService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ViewDesignerComponentEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerComponentEffects });
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "initializeComponentModel$", void 0);
    __decorate([
        i1.Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "registerComponentsValidation$", void 0);
    __decorate([
        i1.Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "onComponentsRemoved$", void 0);
    __decorate([
        i1.Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "unregisterAllComponentsValidation$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "insertComponent$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "addNewComponent$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "removeComponent$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerComponentEffects.prototype, "setChildren$", void 0);
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerComponentEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Actions }, { type: i0__namespace.Injector }, { type: RxViewDesignerModels }, { type: i2__namespace$1.RxGuidService }, { type: i2__namespace.Store }, { type: i5__namespace.RxViewComponentRegistryService }, { type: RxViewDesignerInspectorService }, { type: RxViewExpressionValidatorRegistryService }, { type: RxViewDesignerStateHelperService }, { type: RxViewDataDictionaryStoreService }]; }, propDecorators: { initializeComponentModel$: [], registerComponentsValidation$: [], onComponentsRemoved$: [], unregisterAllComponentsValidation$: [], insertComponent$: [], addNewComponent$: [], removeComponent$: [], setChildren$: [] } });

    var ViewDesignerEffects = /** @class */ (function () {
        function ViewDesignerEffects(actions$, store$, rxBundleCacheService, rxDefinitionNameService, rxDefinitionUpdateService, rxGlobalCacheService, rxJsonParserService, rxViewComponentRegistryService, rxViewActionRegistryService, rxViewDefinitionService, viewDesignerModels, rxOldViewLayoutAdapterService, rxViewDefinitionParserService, rxLogService, rxModalService, errorHandler, rxUtilityModalsService, rxDefinitionAdapterRegistryService, rxViewDesignerInspectorService, rxViewDefinitionGeneratorService, rxViewDesignerStateHelperService, rxViewActionDefinitionAdapterRegistryService, rxGuidService, rxViewDataDictionaryStoreService) {
            var _this = this;
            this.actions$ = actions$;
            this.store$ = store$;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxDefinitionUpdateService = rxDefinitionUpdateService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxViewDefinitionService = rxViewDefinitionService;
            this.viewDesignerModels = viewDesignerModels;
            this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
            this.rxViewDefinitionParserService = rxViewDefinitionParserService;
            this.rxLogService = rxLogService;
            this.rxModalService = rxModalService;
            this.errorHandler = errorHandler;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
            this.rxViewDesignerInspectorService = rxViewDesignerInspectorService;
            this.rxViewDefinitionGeneratorService = rxViewDefinitionGeneratorService;
            this.rxViewDesignerStateHelperService = rxViewDesignerStateHelperService;
            this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
            this.rxGuidService = rxGuidService;
            this.rxViewDataDictionaryStoreService = rxViewDataDictionaryStoreService;
            this.initViewDesigner$ = this.actions$.pipe(i1.ofType(initViewDesigner), operators.switchMap(function (_a) {
                var payload = _a.payload;
                var viewDefinitionName = payload.viewDefinitionName, layoutTemplate = payload.layoutTemplate;
                _this.clearStorages();
                return [
                    loadFriendlyBundleName(),
                    loadViewDefinition({
                        viewDefinitionName: viewDefinitionName,
                        layoutTemplate: layoutTemplate
                    })
                ];
            }));
            this.destroyViewDesigner$ = this.actions$.pipe(i1.ofType(destroyViewDesigner), operators.tap(function () { return _this.clearStorages(); }));
            this.loadFriendlyBundleName$ = this.actions$.pipe(i1.ofType(loadFriendlyBundleName), operators.switchMap(function () { return _this.rxGlobalCacheService.getBundleDescriptor(_this.rxBundleCacheService.bundleId); }), operators.switchMap(function (descriptor) {
                var result$;
                if (descriptor) {
                    result$ = rxjs.of(friendlyBundleNameLoadSuccess({
                        friendlyBundleName: descriptor.friendlyName
                    }));
                }
                else {
                    result$ = rxjs.throwError("Bundle \"" + _this.rxBundleCacheService.bundleId + "\" not found");
                }
                return result$.pipe(operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(friendlyBundleNameLoadError({ payload: error }));
                }));
            }));
            this.loadViewDefinition$ = this.actions$.pipe(i1.ofType(loadViewDefinition), operators.switchMap(function (_a) {
                var viewDefinitionName = _a.viewDefinitionName, layoutTemplate = _a.layoutTemplate;
                var viewDefinition$ = viewDefinitionName
                    ? _this.rxViewDefinitionService.get(viewDefinitionName)
                    : _this.rxViewDefinitionService.getNew(layoutTemplate);
                return viewDefinition$.pipe(operators.map(function (viewDefinition) { return viewDefinitionLoadSuccess({
                    viewDefinition: viewDefinition
                }); }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(viewDefinitionLoadError());
                }));
            }));
            this.viewDefinitionLoadSuccess$ = this.actions$.pipe(i1.ofType(viewDefinitionLoadSuccess), operators.withLatestFrom(this.store$.select(viewModelSelector)), operators.mergeMap(function (_a) {
                var _b = __read(_a, 2), payload = _b[0], viewModel = _b[1];
                // If viewModel isn't empty it's considered that view definition is loaded after save to update
                // existing view models with properties added by server e.g 'lastChangedBy', 'lastUpdateTime' and etc.
                return viewModel
                    ? _this.getActionsToUpdateExistingViewModels(payload.viewDefinition)
                    : _this.getActionsToInitializeViewModels(payload.viewDefinition);
            }));
            this.selectViewComponent$ = this.actions$.pipe(i1.ofType(selectComponent), operators.withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(selectedInspectorTabIdSelector)), operators.mergeMap(function (_a) {
                var _b = __read(_a, 3), action = _b[0], viewModel = _b[1], currentInspectorTabId = _b[2];
                var selectedInspectorTab = viewModel.guid === action.guid ? 0 : 1;
                if (selectedInspectorTab !== currentInspectorTabId) {
                    return [
                        selectInspectorTab({
                            tabId: selectedInspectorTab
                        })
                    ];
                }
                else {
                    return [];
                }
            }));
            this.generateViewDefinition$ = this.actions$.pipe(i1.ofType(generateViewDefinition), operators.withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(viewComponentModelsSelector), function (action, viewModel, componentModels) { return ({ viewModel: viewModel, componentModels: componentModels }); }), operators.map(function (_a) {
                var viewModel = _a.viewModel, componentModels = _a.componentModels;
                return _this.rxViewDefinitionGeneratorService.generate(viewModel, componentModels);
            }), operators.map(function (viewDefinition) { return setGeneratedViewDefinition({ payload: viewDefinition }); }));
            this.saveViewDefinition$ = this.actions$.pipe(i1.ofType(saveViewDefinition), operators.withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(viewComponentModelsSelector), function (action, viewModel, components) { return ({ viewModel: viewModel, components: components }); }), operators.switchMap(function (_a) {
                var viewModel = _a.viewModel, components = _a.components;
                var viewDefinition = _this.rxViewDefinitionGeneratorService.generate(viewModel, components, true);
                return (viewDefinition.lastUpdateTime
                    ? _this.rxDefinitionUpdateService.execute(_this.rxViewDefinitionService.update.bind(_this.rxViewDefinitionService, viewDefinition.name, viewDefinition))
                    : _this.rxViewDefinitionService.create(viewDefinition)).pipe(operators.switchMap(function (response) {
                    var definitionName = decodeURIComponent(lodash.last(response === null || response === void 0 ? void 0 : response.headers.get('Location').split('/')) || '') || viewDefinition.name;
                    return [
                        viewDefinitionSaveSuccess({ viewDefinitionName: definitionName }),
                        viewDefinition.lastUpdateTime
                            ? loadViewDefinition({
                                viewDefinitionName: viewDefinition.name
                            })
                            : null
                    ].filter(Boolean);
                }), operators.catchError(function (error) {
                    _this.errorHandler.handleError(error);
                    return rxjs.of(viewDefinitionSaveError());
                }));
            }));
            this.clearCanvas$ = this.actions$.pipe(i1.ofType(clearCanvas), operators.withLatestFrom(this.store$.select(viewModelSelector)), operators.map(function (_a) {
                var _b = __read(_a, 2), action = _b[0], viewModel = _b[1];
                return removeComponents({ guids: getChildGuidsFromModel(viewModel) });
            }));
            this.runPreview$ = this.actions$.pipe(i1.ofType(runPreview), operators.withLatestFrom(this.store$.select(viewModelSelector), function (action, viewModel) { return viewModel; }), operators.switchMap(function (viewModel) { return viewModel.targetViewDefinitionName
                ? _this.rxViewDefinitionService.get(viewModel.targetViewDefinitionName)
                : rxjs.of(viewModel); }), operators.tap(function (viewModel) {
                var encodedViewDefinitionName = encodeURIComponent(viewModel.name);
                var url = "/helix/index.html#/" + _this.rxBundleCacheService.bundleId + "/preview/" + encodedViewDefinitionName;
                if (viewModel.inputParams.length) {
                    _this.rxModalService
                        .openModal({
                        title: 'Enter view parameter values',
                        content: RuntimeViewParamsModalComponent,
                        data: { inputParams: lodash.map(viewModel.inputParams, 'name') },
                        size: 'sm'
                    })
                        .catch(rxjs.noop)
                        .then(function (params) {
                        var inputConfig = lodash.map(params, function (value, name) {
                            return encodeURIComponent(name) + "=" + encodeURIComponent(value);
                        });
                        url += "?" + inputConfig.join('&');
                        if (params) {
                            window.open(url);
                        }
                    });
                }
                else {
                    window.open(url);
                }
            }));
        }
        ViewDesignerEffects.prototype.clearStorages = function () {
            this.viewDesignerModels.clear();
            this.rxViewDesignerInspectorService.clear();
            this.rxViewDataDictionaryStoreService.clear();
        };
        ViewDesignerEffects.prototype.convertViewDefinitionToModel = function (viewDefinition) {
            var _this = this;
            var isAngularJsView = Boolean(viewDefinition.lastUpdateTime) && !lodash.includes(viewDefinition.layout, '"outlets"');
            this.rxViewDefinitionParserService
                .getComponents(viewDefinition)
                .forEach(function (definition) { return _this.rxOldViewLayoutAdapterService.convertLayout(definition); });
            var viewModel = lodash.omit(viewDefinition, ['componentDefinitions', 'layout']);
            var layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
            viewModel.layout = i5.RxViewLayout.getEmptyViewLayoutForOutlets(layout.outlets);
            viewModel.displayName = decodeURIComponent(this.rxDefinitionNameService.getDisplayName(viewModel.name));
            viewModel.layoutName = i5.RxViewLayout.getLayoutName(viewModel.layout);
            viewModel.isAngularJsView = isAngularJsView;
            return viewModel;
        };
        ViewDesignerEffects.prototype.convertComponentDefinitionToModel = function (definition, parentGuid, descriptor) {
            var componentModel = lodash.omit(definition, ['componentDefinitions', 'layout']);
            componentModel.parentGuid = parentGuid;
            this.processComponentDefinitionProperties(componentModel, descriptor);
            if (this.isComponentHasLayout(definition)) {
                var layout = this.rxJsonParserService.tryParseJson(definition.layout);
                componentModel.layout = i5.RxViewLayout.getEmptyViewLayoutForOutlets(layout.outlets);
            }
            return componentModel;
        };
        ViewDesignerEffects.prototype.processComponentDefinitionProperties = function (componentModel, descriptor) {
            var _this = this;
            componentModel.propertiesByName = lodash.transform(componentModel.propertiesByName, function (result, propertyValue, propertyKey) {
                var propertyDescriptor = lodash.find(descriptor.properties || descriptor.parameters, {
                    name: propertyKey
                });
                if (propertyDescriptor && propertyDescriptor.designType) {
                    switch (true) {
                        case propertyDescriptor.designType === i5.ViewComponentPropertyType.String:
                            result[propertyKey] = propertyValue;
                            break;
                        default:
                            result[propertyKey] = _this.rxJsonParserService.tryParseJson(propertyValue, propertyValue);
                            break;
                    }
                }
                else {
                    result[propertyKey] = propertyValue;
                }
                return result;
            }, {});
            if (!this.rxGuidService.isGuid(componentModel.name)) {
                componentModel.propertiesByName.name = componentModel.name;
            }
            if ('type' in descriptor) {
                componentModel.propertiesByName = this.rxViewDesignerStateHelperService.getInitialComponentProperties(componentModel.propertiesByName, descriptor);
            }
        };
        ViewDesignerEffects.prototype.traverseByComponents = function (component, predicate) {
            var _this = this;
            var componentLayout = this.rxJsonParserService.tryParseJson(component.layout);
            var childComponentDefinitions = component.componentDefinitions;
            if (componentLayout) {
                componentLayout.outlets.forEach(function (outlet) {
                    outlet.columns.forEach(function (column, colIndex) {
                        column.children.forEach(function (childComponentGuid, index) {
                            var childComponentDefinition = childComponentDefinitions.find(function (definition) { return definition.guid === childComponentGuid; });
                            if (childComponentDefinition) {
                                predicate(childComponentDefinition, component.guid, outlet.name, index, colIndex, column.span);
                                if (childComponentDefinition.componentDefinitions) {
                                    _this.traverseByComponents(childComponentDefinition, predicate);
                                }
                            }
                        });
                    });
                });
            }
            childComponentDefinitions
                .filter(function (definition) {
                var descriptor = _this.rxViewComponentRegistryService.get(definition.type);
                return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.isDataComponent) || (descriptor === null || descriptor === void 0 ? void 0 : descriptor.isPageComponent);
            })
                .forEach(function (childComponentDefinition, index) {
                predicate(childComponentDefinition, component.guid, null, index, 0, 0);
                if (childComponentDefinition.componentDefinitions) {
                    _this.traverseByComponents(childComponentDefinition, predicate);
                }
            });
        };
        ViewDesignerEffects.prototype.isComponentHasLayout = function (definition) {
            return Boolean(definition.layout);
        };
        ViewDesignerEffects.prototype.getActionsToInitializeViewModels = function (viewDefinition) {
            var _this = this;
            var viewDefinitionClone = lodash.cloneDeep(viewDefinition);
            var viewModel = this.convertViewDefinitionToModel(viewDefinitionClone);
            var initComponentModelsPayload = [];
            var initDataComponentModelsPayload = [];
            this.traverseByComponents(viewDefinitionClone, function (componentDefinition, parentGuid, outletName, insertIndex, columnIndex, columnSpan) {
                var componentDescriptor = _this.rxViewComponentRegistryService.get(componentDefinition.type);
                if (componentDescriptor && !componentDescriptor.isPageComponent) {
                    var adapter = componentDefinition.type === i5.RxViewComponentType.Action
                        ? _this.rxViewActionDefinitionAdapterRegistryService.getDesignAdapter(componentDefinition.propertiesByName.name)
                        : _this.rxDefinitionAdapterRegistryService.getDesignAdapter(componentDefinition.type);
                    adapter === null || adapter === void 0 ? void 0 : adapter.adaptDefinition(componentDefinition, viewDefinitionClone);
                    var actionDescriptor = void 0;
                    if (componentDefinition.type === i5.RxViewComponentType.Action) {
                        actionDescriptor = _this.rxViewActionRegistryService.get(componentDefinition.propertiesByName.name);
                        if (!actionDescriptor) {
                            actionDescriptor = _this.rxViewActionRegistryService.registerUnknownAction(componentDefinition.propertiesByName.name);
                        }
                    }
                    var componentModel = _this.convertComponentDefinitionToModel(componentDefinition, parentGuid, actionDescriptor || componentDescriptor);
                    if (_this.rxViewComponentRegistryService.isDataComponentDescriptor(componentDescriptor) ||
                        outletName === null) {
                        initDataComponentModelsPayload.push({
                            componentModel: componentModel
                        });
                    }
                    else {
                        initComponentModelsPayload.push({
                            insertIndex: insertIndex,
                            columnIndex: columnIndex,
                            componentModel: componentModel,
                            outletName: outletName,
                            columnSpan: columnSpan
                        });
                    }
                }
                else if (_this.rxViewDefinitionService.isPageView(viewDefinitionClone)) {
                    var pageComponentChildDescriptor = _this.rxViewComponentRegistryService.get(componentDefinition.type);
                    if (!pageComponentChildDescriptor) {
                        pageComponentChildDescriptor = {
                            type: componentDefinition.type,
                            name: i5.RX_VIEW_DEFINITION.unknownPageComponent.name
                        };
                    }
                    var componentModel = _this.convertComponentDefinitionToModel(componentDefinition, parentGuid, pageComponentChildDescriptor);
                    initDataComponentModelsPayload.push({
                        componentModel: componentModel
                    });
                }
                else {
                    var unknownComponentDescriptor = Object.assign(Object.assign({}, _this.rxViewComponentRegistryService.get(i5.RxViewComponentType.Unknown)), { type: componentDefinition.type });
                    _this.rxViewComponentRegistryService.registerSync(unknownComponentDescriptor);
                    var componentModel = _this.convertComponentDefinitionToModel(componentDefinition, parentGuid, unknownComponentDescriptor);
                    initComponentModelsPayload.push({
                        insertIndex: insertIndex,
                        columnIndex: columnIndex,
                        componentModel: componentModel,
                        outletName: outletName,
                        columnSpan: columnSpan
                    });
                    _this.rxLogService.warning("Cannot initialize view component. View Component Descriptor for " + componentDefinition.type + " not found.");
                }
            });
            return [
                setViewModel({ payload: viewModel }),
                initComponentModelsPayload.length
                    ? initializeComponentModels({ payload: initComponentModelsPayload })
                    : null,
                initDataComponentModelsPayload.length
                    ? initializeDataComponentModels({ payload: initDataComponentModelsPayload })
                    : null,
                initComponentModelsPayload.length ? null : viewModelsInitialized()
            ].filter(Boolean);
        };
        ViewDesignerEffects.prototype.getActionsToUpdateExistingViewModels = function (viewDefinition) {
            var viewDefinitionClone = lodash.cloneDeep(viewDefinition);
            var updateComponentModelPayloads = this.rxViewDefinitionParserService
                .getComponents(viewDefinitionClone, true)
                .map(function (_a) {
                var componentDefinition = _a.componentDefinition;
                return ({
                    guid: componentDefinition.guid,
                    partialModel: lodash.omit(componentDefinition, [
                        'layout',
                        'propertiesByName',
                        'componentDefinitions'
                    ])
                });
            });
            return [
                updateViewModel({
                    payload: lodash.omit(viewDefinitionClone, ['layout', 'componentDefinitions'])
                }),
                updateComponentModelPayloads.length
                    ? updateComponentModel({ payload: updateComponentModelPayloads })
                    : null,
                viewModelsUpdatedAfterSave()
            ].filter(Boolean);
        };
        return ViewDesignerEffects;
    }());
    ViewDesignerEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerEffects, deps: [{ token: i1__namespace.Actions }, { token: i2__namespace.Store }, { token: i3__namespace.RxBundleCacheService }, { token: i3__namespace.RxDefinitionNameService }, { token: i3__namespace.RxDefinitionUpdateService }, { token: i3__namespace.RxGlobalCacheService }, { token: i2__namespace$1.RxJsonParserService }, { token: i5__namespace.RxViewComponentRegistryService }, { token: i5__namespace.RxViewActionRegistryService }, { token: i5__namespace.RxViewDefinitionService }, { token: RxViewDesignerModels }, { token: i5__namespace.RxOldViewLayoutAdapterService }, { token: i5__namespace.RxViewDefinitionParserService }, { token: i3__namespace.RxLogService }, { token: i5__namespace$1.RxModalService }, { token: i0__namespace.ErrorHandler }, { token: i5__namespace$1.RxUtilityModalsService }, { token: i3__namespace.RxDefinitionAdapterRegistryService }, { token: RxViewDesignerInspectorService }, { token: RxViewDefinitionGeneratorService }, { token: RxViewDesignerStateHelperService }, { token: i5__namespace.RxViewActionDefinitionAdapterRegistryService }, { token: i2__namespace$1.RxGuidService }, { token: RxViewDataDictionaryStoreService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ViewDesignerEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerEffects });
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "initViewDesigner$", void 0);
    __decorate([
        i1.Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "destroyViewDesigner$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "loadFriendlyBundleName$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "loadViewDefinition$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "viewDefinitionLoadSuccess$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "selectViewComponent$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "generateViewDefinition$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "saveViewDefinition$", void 0);
    __decorate([
        i1.Effect(),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "clearCanvas$", void 0);
    __decorate([
        i1.Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], ViewDesignerEffects.prototype, "runPreview$", void 0);
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Actions }, { type: i2__namespace.Store }, { type: i3__namespace.RxBundleCacheService }, { type: i3__namespace.RxDefinitionNameService }, { type: i3__namespace.RxDefinitionUpdateService }, { type: i3__namespace.RxGlobalCacheService }, { type: i2__namespace$1.RxJsonParserService }, { type: i5__namespace.RxViewComponentRegistryService }, { type: i5__namespace.RxViewActionRegistryService }, { type: i5__namespace.RxViewDefinitionService }, { type: RxViewDesignerModels }, { type: i5__namespace.RxOldViewLayoutAdapterService }, { type: i5__namespace.RxViewDefinitionParserService }, { type: i3__namespace.RxLogService }, { type: i5__namespace$1.RxModalService }, { type: i0__namespace.ErrorHandler }, { type: i5__namespace$1.RxUtilityModalsService }, { type: i3__namespace.RxDefinitionAdapterRegistryService }, { type: RxViewDesignerInspectorService }, { type: RxViewDefinitionGeneratorService }, { type: RxViewDesignerStateHelperService }, { type: i5__namespace.RxViewActionDefinitionAdapterRegistryService }, { type: i2__namespace$1.RxGuidService }, { type: RxViewDataDictionaryStoreService }]; }, propDecorators: { initViewDesigner$: [], destroyViewDesigner$: [], loadFriendlyBundleName$: [], loadViewDefinition$: [], viewDefinitionLoadSuccess$: [], selectViewComponent$: [], generateViewDefinition$: [], saveViewDefinition$: [], clearCanvas$: [], runPreview$: [] } });

    function getInitialState$4() {
        return null;
    }
    var reducer$4 = i2.createReducer(getInitialState$4(), i2.on(initViewDesigner, getInitialState$4), i2.on(destroyViewDesigner, getInitialState$4), i2.on(setGeneratedViewDefinition, function (state, _a) {
        var payload = _a.payload;
        return payload;
    }));
    function viewDefinitionReducer(state, action) {
        return reducer$4(state, action);
    }

    function getInitialState$3() {
        return {};
    }
    var reducer$3 = i2.createReducer(getInitialState$3(), i2.on(initViewDesigner, getInitialState$3), i2.on(destroyViewDesigner, getInitialState$3), i2.on(setBreadcrumbs, function (state, _a) {
        var _b;
        var guid = _a.guid, label = _a.label;
        return Object.assign(Object.assign({}, state), (_b = {}, _b[guid] = label, _b));
    }), i2.on(componentsRemoved, function (state, _a) {
        var guids = _a.guids;
        var newState = state;
        if (guids.some(function (guid) { return lodash.has(state, guid); })) {
            newState = lodash.omit(state, guids);
        }
        return newState;
    }));
    function viewDesignerBreadcrumbsReducer(state, action) {
        return reducer$3(state, action);
    }

    function getInitialState$2() {
        return {
            viewDesignModel: null,
            viewComponentDesignModels: {}
        };
    }
    function initializeComponentModel(newState, payload) {
        var _a;
        newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), (_a = {}, _a[payload.componentModel.guid] = payload.componentModel, _a));
        // update parent layout
        if (payload.componentModel.parentGuid === newState.viewDesignModel.guid) {
            newState.viewDesignModel = addChildComponent(newState.viewDesignModel, payload.componentModel.guid, payload.outletName, payload.insertIndex, payload.columnIndex, payload.columnSpan);
        }
        else {
            var parentComponentModel = newState.viewComponentDesignModels[payload.componentModel.parentGuid];
            if (parentComponentModel) {
                var newParentComponentModel = addChildComponent(parentComponentModel, payload.componentModel.guid, payload.outletName, payload.insertIndex, payload.columnIndex, payload.columnSpan);
                newState.viewComponentDesignModels[newParentComponentModel.guid] =
                    newParentComponentModel;
            }
        }
    }
    var reducer$2 = i2.createReducer(getInitialState$2(), i2.on(initViewDesigner, getInitialState$2), i2.on(destroyViewDesigner, getInitialState$2), i2.on(initializeComponentModels, function (state, _a) {
        var payload = _a.payload;
        var newState = Object.assign({}, state);
        payload.forEach(function (data) { return initializeComponentModel(newState, data); });
        return newState;
    }), i2.on(initializeDataComponentModels, function (state, _a) {
        var payload = _a.payload;
        var newState = Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign({}, state.viewComponentDesignModels) });
        payload.forEach(function (item) {
            var parentComponentModel = newState.viewComponentDesignModels[item.componentModel.parentGuid];
            if (parentComponentModel) {
                // add new component model
                newState.viewComponentDesignModels[item.componentModel.guid] = item.componentModel;
                // update parent to contain child reference
                var newParentComponentModel = Object.assign(Object.assign({}, parentComponentModel), { childDataComponentGuids: __spreadArray(__spreadArray([], __read((parentComponentModel.childDataComponentGuids || []))), [item.componentModel.guid]) });
                newState.viewComponentDesignModels[newParentComponentModel.guid] =
                    newParentComponentModel;
            }
        });
        return newState;
    }), i2.on(moveComponent, function (state, payload) {
        var _a, _b, _c;
        var newState = Object.assign({}, state);
        // remove component from old parent layout
        if (isComponentContainsChild(payload.guid, state.viewDesignModel)) {
            newState.viewDesignModel = removeChildComponent(payload.guid, newState.viewDesignModel);
        }
        else {
            var oldParentComponentModel = findParentComponentModel(payload.guid, newState.viewComponentDesignModels);
            oldParentComponentModel = removeChildComponent(payload.guid, oldParentComponentModel);
            newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), (_a = {}, _a[oldParentComponentModel.guid] = oldParentComponentModel, _a));
        }
        // add component to new parent layout
        if (payload.parentGuid === newState.viewDesignModel.guid) {
            newState.viewDesignModel = addChildComponent(newState.viewDesignModel, payload.guid, payload.outletName, payload.insertIndex, payload.columnIndex);
        }
        else {
            var newParentComponentModel = newState.viewComponentDesignModels[payload.parentGuid];
            newParentComponentModel = addChildComponent(newParentComponentModel, payload.guid, payload.outletName, payload.insertIndex, payload.columnIndex);
            newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), (_b = {}, _b[newParentComponentModel.guid] = newParentComponentModel, _b));
        }
        // updating parentGuid for moved component
        newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), (_c = {}, _c[payload.guid] = Object.assign(Object.assign({}, newState.viewComponentDesignModels[payload.guid]), { parentGuid: payload.parentGuid }), _c));
        return newState;
    }), i2.on(componentsRemoved, function (state, _a) {
        var guids = _a.guids;
        var newState = Object.assign(Object.assign({}, state), { viewComponentDesignModels: lodash.omit(state.viewComponentDesignModels, guids) });
        guids.forEach(function (guid) {
            var _a;
            if (isComponentContainsChild(guid, state.viewDesignModel)) {
                newState.viewDesignModel = removeChildComponent(guid, newState.viewDesignModel);
            }
            else {
                var oldParentComponentModel = findParentComponentModel(guid, state.viewComponentDesignModels);
                if (oldParentComponentModel && newState.viewComponentDesignModels[oldParentComponentModel.guid]) {
                    oldParentComponentModel = removeChildComponent(guid, newState.viewComponentDesignModels[oldParentComponentModel.guid]);
                    newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), (_a = {}, _a[oldParentComponentModel.guid] = oldParentComponentModel, _a));
                }
            }
        });
        return newState;
    }), i2.on(setComponentLayout, function (state, _a) {
        var _b;
        var guid = _a.guid, cols = _a.cols;
        var componentModel = state.viewComponentDesignModels[guid];
        var defaultOutlet = componentModel.layout.outlets.find(function (item) { return item.name === i5.RX_VIEW_DEFINITION.defaultOutletName; });
        var existingColumns = lodash.cloneDeep(defaultOutlet.columns);
        var removedColumns = existingColumns.splice(cols.length);
        cols.forEach(function (colSpan, i) {
            if (existingColumns[i]) {
                existingColumns[i].span = colSpan;
            }
            else {
                existingColumns[i] = {
                    span: colSpan,
                    children: []
                };
            }
        });
        var removedColumnChildComponents = removedColumns.reduce(function (guids, col) {
            guids.push.apply(guids, __spreadArray([], __read(col.children)));
            return guids;
        }, []);
        if (removedColumnChildComponents.length) {
            var lastExistingCol = lodash.last(existingColumns);
            lastExistingCol.children = lastExistingCol.children.concat(removedColumnChildComponents);
        }
        return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), (_b = {}, _b[guid] = Object.assign(Object.assign({}, componentModel), { layout: Object.assign(Object.assign({}, componentModel.layout), { outlets: componentModel.layout.outlets.map(function (outlet) { return (Object.assign(Object.assign({}, outlet), { columns: existingColumns })); }) }) }), _b)) });
    }), i2.on(setViewModel, function (state, _a) {
        var payload = _a.payload;
        return Object.assign(Object.assign({}, state), { viewDesignModel: payload });
    }), i2.on(updateViewModel, function (state, _a) {
        var payload = _a.payload;
        return Object.assign(Object.assign({}, state), { viewDesignModel: Object.assign(Object.assign({}, state.viewDesignModel), payload) });
    }), i2.on(viewDefinitionSaveSuccess, function (state) {
        if (state.viewDesignModel.isAngularJsView) {
            return Object.assign(Object.assign({}, state), { viewDesignModel: Object.assign(Object.assign({}, state.viewDesignModel), { isAngularJsView: false }) });
        }
        else {
            return state;
        }
    }), i2.on(setComponentData, function (state, _a) {
        var payload = _a.payload;
        return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), payload.reduce(function (res, _a) {
                var guid = _a.guid, data = _a.data;
                res[guid] = Object.assign(Object.assign({}, state.viewComponentDesignModels[guid]), { propertiesByName: data });
                return res;
            }, {})) });
    }), i2.on(updateComponentModel, function (state, _a) {
        var payload = _a.payload;
        return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), payload
                .filter(function (payload) { return state.viewComponentDesignModels[payload.guid]; })
                .reduce(function (res, _a) {
                var guid = _a.guid, partialModel = _a.partialModel;
                res[guid] = Object.assign(Object.assign(Object.assign({}, state.viewComponentDesignModels[guid]), partialModel), { propertiesByName: Object.assign(Object.assign({}, state.viewComponentDesignModels[guid].propertiesByName), partialModel.propertiesByName) });
                return res;
            }, {})) });
    }));
    function viewDesignerModelReducer(state, action) {
        return reducer$2(state, action);
    }

    function getInitialState$1() {
        return {
            selectedComponentGuid: null,
            selectedInspectorTabId: 0,
            currentBundleId: null,
            isViewDefinitionLoading: false,
            areViewModelsReady: false,
            friendlyBundleName: null
        };
    }
    var reducer$1 = i2.createReducer(getInitialState$1(), i2.on(initViewDesigner, function (_, _a) {
        var payload = _a.payload;
        return Object.assign(Object.assign({}, getInitialState$1()), { currentBundleId: payload.bundleId });
    }), i2.on(destroyViewDesigner, getInitialState$1), i2.on(selectComponent, function (state, _a) {
        var guid = _a.guid;
        return Object.assign(Object.assign({}, state), { selectedComponentGuid: guid });
    }), i2.on(selectInspectorTab, function (state, _a) {
        var tabId = _a.tabId;
        return Object.assign(Object.assign({}, state), { selectedInspectorTabId: tabId });
    }), i2.on(componentsRemoved, function (state, _a) {
        var guids = _a.guids;
        if (guids.includes(state.selectedComponentGuid)) {
            return Object.assign(Object.assign({}, state), { selectedComponentGuid: null });
        }
        else {
            return Object.assign({}, state);
        }
    }), i2.on(friendlyBundleNameLoadSuccess, function (state, _a) {
        var friendlyBundleName = _a.friendlyBundleName;
        return Object.assign(Object.assign({}, state), { friendlyBundleName: friendlyBundleName });
    }), i2.on(friendlyBundleNameLoadError, function (state) {
        return Object.assign(Object.assign({}, state), { friendlyBundleName: null });
    }), i2.on(saveViewDefinition, loadViewDefinition, function (state) {
        return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: true, areViewModelsReady: false });
    }), i2.on(viewDefinitionSaveSuccess, viewDefinitionLoadSuccess, viewDefinitionLoadError, function (state) {
        return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: false });
    }), i2.on(viewDefinitionSaveError, function (state) {
        return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: false, areViewModelsReady: true });
    }), i2.on(viewModelsUpdatedAfterSave, viewModelsInitialized, function (state) {
        return Object.assign(Object.assign({}, state), { areViewModelsReady: true });
    }), i2.on(initializeComponentModels, function (state) {
        return Object.assign(Object.assign({}, state), { areViewModelsReady: false });
    }));
    function viewDesignerUiReducer(state, action) {
        return reducer$1(state, action);
    }

    function getInitialState() {
        return {
            issues: {},
            expressionIssues: {}
        };
    }
    var reducer = i2.createReducer(getInitialState(), i2.on(initViewDesigner, destroyViewDesigner, getInitialState), i2.on(setValidationIssues, function (state, _a) {
        var _b;
        var guid = _a.guid, issues = _a.issues;
        if (issues.length) {
            return Object.assign(Object.assign({}, state), { issues: Object.assign(Object.assign({}, state.issues), (_b = {}, _b[guid] = issues, _b)) });
        }
        else {
            var newState = state;
            if (lodash.has(newState.issues, guid)) {
                newState = Object.assign(Object.assign({}, state), { issues: lodash.omit(state.issues, [guid]) });
            }
            return newState;
        }
    }), i2.on(setExpressionValidationIssues, function (state, _a) {
        var issues = _a.issues;
        return lodash.isEmpty(issues)
            ? state
            : Object.assign(Object.assign({}, state), { expressionIssues: Object.assign(Object.assign({}, lodash.omit(state.expressionIssues, Object.keys(issues))), lodash.omitBy(issues, lodash.isEmpty)) });
    }), i2.on(componentsRemoved, function (state, _a) {
        var guids = _a.guids;
        var newState = state;
        if (guids.some(function (guid) { return lodash.has(state.issues, guid); })) {
            newState = Object.assign(Object.assign({}, state), { issues: lodash.omit(state.issues, guids) });
        }
        if (guids.some(function (guid) { return lodash.has(state.expressionIssues, guid); })) {
            newState = Object.assign(Object.assign({}, state), { expressionIssues: lodash.omit(state.expressionIssues, guids) });
        }
        return newState;
    }));
    function viewDesignerValidationReducer(state, action) {
        return reducer(state, action);
    }

    var ViewDesignerModule = /** @class */ (function () {
        function ViewDesignerModule() {
        }
        return ViewDesignerModule;
    }());
    ViewDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerModule, declarations: [RxViewDesignerComponent], imports: [i4.CommonModule,
            i3$3.AdaptCodeViewerModule, i3__namespace$3.AdaptTabsModule, i5$1.RxBladeModule,
            i3$1.RxFormBuilderModule,
            i5$1.RxValidationIssuesModule,
            i5$1.RxJsonViewerModule,
            RxViewDesignerPaletteModule,
            ViewDesignerCanvasModule,
            DesignerModule,
            i3$1.FormControlsModule,
            i3$1.RxPermissionEditorModule,
            i3$1.RxRevertCustomizationModule,
            i5.ViewActionDesignModule,
            RuntimeViewParamsModalModule,
            i3$1.RxDesignerHeaderModule,
            i3$3.AdaptAlertModule,
            i3$1.RxInspectorModule,
            RxViewCustomizationOptionsModule,
            RxViewRevertCustomizationModule,
            i6.TranslateModule, i2__namespace.StoreFeatureModule, i1__namespace.EffectsFeatureModule], exports: [RxViewDesignerComponent] });
    ViewDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerModule, imports: [[
                i4.CommonModule,
                i3$3.AdaptCodeViewerModule,
                i3$3.AdaptTabsModule.forRoot(),
                i5$1.RxBladeModule,
                i3$1.RxFormBuilderModule,
                i5$1.RxValidationIssuesModule,
                i5$1.RxJsonViewerModule,
                RxViewDesignerPaletteModule,
                ViewDesignerCanvasModule,
                DesignerModule,
                i3$1.FormControlsModule,
                i3$1.RxPermissionEditorModule,
                i3$1.RxRevertCustomizationModule,
                i5.ViewActionDesignModule,
                RuntimeViewParamsModalModule,
                i3$1.RxDesignerHeaderModule,
                i3$3.AdaptAlertModule,
                i3$1.RxInspectorModule,
                RxViewCustomizationOptionsModule,
                RxViewRevertCustomizationModule,
                i6.TranslateModule,
                i2.StoreModule.forFeature('viewDesigner', {
                    model: viewDesignerModelReducer,
                    viewDefinition: viewDefinitionReducer,
                    validation: viewDesignerValidationReducer,
                    ui: viewDesignerUiReducer,
                    breadcrumbs: viewDesignerBreadcrumbsReducer
                }),
                i1.EffectsModule.forFeature([ViewDesignerEffects, ViewDesignerComponentEffects])
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i3$3.AdaptCodeViewerModule,
                            i3$3.AdaptTabsModule.forRoot(),
                            i5$1.RxBladeModule,
                            i3$1.RxFormBuilderModule,
                            i5$1.RxValidationIssuesModule,
                            i5$1.RxJsonViewerModule,
                            RxViewDesignerPaletteModule,
                            ViewDesignerCanvasModule,
                            DesignerModule,
                            i3$1.FormControlsModule,
                            i3$1.RxPermissionEditorModule,
                            i3$1.RxRevertCustomizationModule,
                            i5.ViewActionDesignModule,
                            RuntimeViewParamsModalModule,
                            i3$1.RxDesignerHeaderModule,
                            i3$3.AdaptAlertModule,
                            i3$1.RxInspectorModule,
                            RxViewCustomizationOptionsModule,
                            RxViewRevertCustomizationModule,
                            i6.TranslateModule,
                            i2.StoreModule.forFeature('viewDesigner', {
                                model: viewDesignerModelReducer,
                                viewDefinition: viewDefinitionReducer,
                                validation: viewDesignerValidationReducer,
                                ui: viewDesignerUiReducer,
                                breadcrumbs: viewDesignerBreadcrumbsReducer
                            }),
                            i1.EffectsModule.forFeature([ViewDesignerEffects, ViewDesignerComponentEffects])
                        ],
                        declarations: [RxViewDesignerComponent],
                        exports: [RxViewDesignerComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ActionListControlComponent = ActionListControlComponent;
    exports.ActionListControlModule = ActionListControlModule;
    exports.ActionListEditorDialogComponent = ActionListEditorDialogComponent;
    exports.ActionListEditorDialogModule = ActionListEditorDialogModule;
    exports.ActionListWidgetComponent = ActionListWidgetComponent;
    exports.ActionListWidgetModule = ActionListWidgetModule;
    exports.CanvasItemApi = CanvasItemApi;
    exports.CanvasItemColumnComponent = CanvasItemColumnComponent;
    exports.CanvasItemComponent = CanvasItemComponent;
    exports.CanvasItemContainerComponent = CanvasItemContainerComponent;
    exports.CanvasOutletComponent = CanvasOutletComponent;
    exports.CanvasOutletHelperService = CanvasOutletHelperService;
    exports.DesignerComponent = DesignerComponent;
    exports.DesignerModule = DesignerModule;
    exports.DropComponentData = DropComponentData;
    exports.NamedListFilterExpressionConfigurator = NamedListFilterExpressionConfigurator;
    exports.RX_AVAILABLE_ON_DEVICES_OPTIONS = RX_AVAILABLE_ON_DEVICES_OPTIONS;
    exports.RX_VIEW_DESIGNER = RX_VIEW_DESIGNER;
    exports.RX_VIEW_MODEL = RX_VIEW_MODEL;
    exports.RuntimeViewParamsModalComponent = RuntimeViewParamsModalComponent;
    exports.RuntimeViewParamsModalModule = RuntimeViewParamsModalModule;
    exports.RxComponentPermissionEditorWidgetComponent = RxComponentPermissionEditorWidgetComponent;
    exports.RxComponentPermissionEditorWidgetModule = RxComponentPermissionEditorWidgetModule;
    exports.RxViewActionExpressionConfigurator = RxViewActionExpressionConfigurator;
    exports.RxViewActionValidatorService = RxViewActionValidatorService;
    exports.RxViewComponentExpressionConfigurator = RxViewComponentExpressionConfigurator;
    exports.RxViewCustomizationOptionsComponent = RxViewCustomizationOptionsComponent;
    exports.RxViewCustomizationOptionsModule = RxViewCustomizationOptionsModule;
    exports.RxViewDataDictionaryService = RxViewDataDictionaryService;
    exports.RxViewDesignerActionModel = RxViewDesignerActionModel;
    exports.RxViewDesignerComponent = RxViewDesignerComponent;
    exports.RxViewDesignerDefaultActionModel = RxViewDesignerDefaultActionModel;
    exports.RxViewDesignerHelperService = RxViewDesignerHelperService;
    exports.RxViewDesignerPaletteModule = RxViewDesignerPaletteModule;
    exports.RxViewExpressionConfigurator = RxViewExpressionConfigurator;
    exports.RxViewExpressionValidatorService = RxViewExpressionValidatorService;
    exports.RxViewModel = RxViewModel;
    exports.RxViewRevertCustomizationComponent = RxViewRevertCustomizationComponent;
    exports.RxViewRevertCustomizationModule = RxViewRevertCustomizationModule;
    exports.ViewDesignerCanvasComponent = ViewDesignerCanvasComponent;
    exports.ViewDesignerCanvasItemApiToken = ViewDesignerCanvasItemApiToken;
    exports.ViewDesignerCanvasModule = ViewDesignerCanvasModule;
    exports.ViewDesignerComponentModel = ViewDesignerComponentModel;
    exports.ViewDesignerFacade = ViewDesignerFacade;
    exports.ViewDesignerModule = ViewDesignerModule;
    exports.ViewDesignerPaletteComponent = ViewDesignerPaletteComponent;
    exports.getAvailableOnDevicesInspectorConfig = getAvailableOnDevicesInspectorConfig;
    exports.getDisabledFieldInspectorConfig = getDisabledFieldInspectorConfig;
    exports.getHiddenFieldInspectorConfig = getHiddenFieldInspectorConfig;
    exports.getStandardPropsInspectorConfigs = getStandardPropsInspectorConfigs;
    exports.getStylesFieldInspectorConfig = getStylesFieldInspectorConfig;
    exports.validateAvailableOnDevicesProp = validateAvailableOnDevicesProp;
    exports.validateCssClassName = validateCssClassName;
    exports.validateCssClassNames = validateCssClassNames;
    exports.validateStandardProps = validateStandardProps;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-view-designer.umd.js.map
