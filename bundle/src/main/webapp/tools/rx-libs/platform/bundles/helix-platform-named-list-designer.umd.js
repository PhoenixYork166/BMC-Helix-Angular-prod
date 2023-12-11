(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/cdk/drag-drop'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@helix/platform/shared/components'), require('@helix/platform/ui-kit'), require('@ngx-translate/core'), require('@helix/platform/named-list/api'), require('@helix/platform/record/api'), require('@helix/platform/shared/api'), require('lodash'), require('rxjs'), require('rxjs/operators'), require('@ngrx/store'), require('@helix/platform/utils'), require('@ngrx/effects'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/named-list/designer', ['exports', '@angular/common', '@angular/core', '@angular/cdk/drag-drop', '@angular/forms', '@bmc-ux/adapt-angular', '@helix/platform/shared/components', '@helix/platform/ui-kit', '@ngx-translate/core', '@helix/platform/named-list/api', '@helix/platform/record/api', '@helix/platform/shared/api', 'lodash', 'rxjs', 'rxjs/operators', '@ngrx/store', '@helix/platform/utils', '@ngrx/effects', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform["named-list"] = global.helix.platform["named-list"] || {}, global.helix.platform["named-list"].designer = {}), global.ng.common, global.ng.core, global.ng.cdk.dragDrop, global.ng.forms, global.i1$1, global.helix.platform.shared.components, global.helix.platform["ui-kit"], global.ngxTranslateCore, global.helix.platform["named-list"].api, global.helix.platform.record.api, global.helix.platform.shared.api, global.lodash, global.rxjs, global.rxjs.operators, global.i1, global.helix.platform.utils, global.i2$1, global.ng.router));
})(this, (function (exports, i6$1, i0, i7, i2, i1$1, i7$1, i4$1, i4, i6, i5, i3, lodash, rxjs, operators, i1, i3$1, i2$1, i1$2) { 'use strict';

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

    var i6__namespace = /*#__PURE__*/_interopNamespace(i6$1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i7__namespace$1 = /*#__PURE__*/_interopNamespace(i7);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7$1);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i6__namespace$1 = /*#__PURE__*/_interopNamespace(i6);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3$1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);

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

    var RxNamedListExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxNamedListExpressionConfigurator, _super);
        function RxNamedListExpressionConfigurator(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.rxRecordDefinitionCacheService = _this.injector.get(i5.RxRecordDefinitionCacheService);
            _this.translateService = _this.injector.get(i4.TranslateService);
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
        RxNamedListExpressionConfigurator.prototype.getDefaultConfig = function () {
            return Object.assign(Object.assign({}, _super.prototype.getDefaultConfig.call(this)), { operators: i3.ExpressionOperatorRowsByGroup.get(i3.ExpressionOperatorGroup.AllClient) });
        };
        RxNamedListExpressionConfigurator.prototype.namedListExpressionDataDictionary = function (namedListDefinition) {
            var _this = this;
            var data = {
                label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.expression-configurator.record-instance.label'),
                expanded: true
            };
            if (namedListDefinition.recordDefinitionName) {
                return this.rxRecordDefinitionCacheService.getRecordDefinition(namedListDefinition.recordDefinitionName).pipe(operators.map(function (recordDefinition) {
                    data.children = recordDefinition
                        ? lodash.flow(function (fieldDefinitions) { return lodash.map(fieldDefinitions, function (fieldDefinition) {
                            if (fieldDefinition.resourceType !== i5.RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                                return {
                                    label: fieldDefinition.name,
                                    icon: 'd-icon-arrow_right_square_input',
                                    expression: "'" + fieldDefinition.name + "'"
                                };
                            }
                        }); }, lodash.compact)(recordDefinition.fieldDefinitions)
                        : [];
                    return [data, _this.generalGroup];
                }));
            }
            else {
                return rxjs.of([this.generalGroup]);
            }
        };
        return RxNamedListExpressionConfigurator;
    }(i3.RxExpressionConfigurator));

    var RX_NAMED_LIST_DESIGNER = {
        featureSelector: 'namedListDesigner'
    };

    var namedListDesignerStateSelector = i1.createFeatureSelector(RX_NAMED_LIST_DESIGNER.featureSelector);
    var namedListDesignerModelSelector = i1.createSelector(namedListDesignerStateSelector, function (namedListDesignerState) { return namedListDesignerState.model; });
    var bundleIdSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.bundleId; });
    var definitionNameSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.definitionName; });
    var isDesignModeSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.isDesignMode; });
    var definitionModelFromDefinitionSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.definitionModelFromDefinition; });
    var definitionModelSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.definitionModel; });
    var isDirtySelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.isDirty; });
    var savedDefinitionNameSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.savedDefinitionName; });
    var originalDefinitionSelector = i1.createSelector(namedListDesignerModelSelector, function (namedListDesignerModel) { return namedListDesignerModel.originalDefinition; });

    var init = i1.createAction('[Named List Designer] Init', i1.props());
    var loadDefinition = i1.createAction('[Named List Designer] Load Definition');
    var loadDefinitionSuccess = i1.createAction('[Named List Designer] Load Definition Success', i1.props());
    var initDefinitionData = i1.createAction('[Named List Designer] Init Definition Data', i1.props());
    var clearFields = i1.createAction('[Named List Designer] Clear Fields');
    var markDesignerPristine = i1.createAction('[Named List Designer] Mark Designer Pristine');
    var markDesignerDirty = i1.createAction('[Named List Designer] Mark Designer Dirty');
    var updateDefinitionModelFromDesigner = i1.createAction('[Named List Designer] Update Definition Model From Designer', i1.props());
    var revertCustomization = i1.createAction('[Named List Designer] Revert Customization');
    var toggleDesignMode = i1.createAction('[Named List Designer] Toggle Design Mode');
    var saveDefinition = i1.createAction('[Named List Designer] Save Definition');
    var saveDefinitionSuccess = i1.createAction('[Named List Designer] Save Definition Success', i1.props());
    var saveDefinitionError = i1.createAction('[Named List Designer] Save Definition Error');
    var destroy = i1.createAction('[Named List Designer] Destroy');

    var ContextualLabelFieldsEditorModalComponent = /** @class */ (function (_super) {
        __extends(ContextualLabelFieldsEditorModalComponent, _super);
        function ContextualLabelFieldsEditorModalComponent(activeModalRef, formBuilder, rxGuidService, translateService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.formBuilder = formBuilder;
            _this.rxGuidService = rxGuidService;
            _this.translateService = translateService;
            _this.config = _this.activeModalRef.getData();
            _this.fieldsFormArray = _this.formBuilder.array([]);
            _this.accordionExpansionState = {};
            _this.fieldSelectionConfig = {
                label: _this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.field.label'),
                required: true,
                options: _this.config.options
            };
            _this.fieldNameById = _this.config.options.reduce(function (result, _b) {
                var id = _b.id, name = _b.name;
                result[id] = name;
                return result;
            }, {});
            _this.isAddButtonDisabled$ = _this.fieldsFormArray.valueChanges.pipe(operators.startWith([]), operators.map(function () { return _this.fieldsFormArray.length >= i6.RX_NAMED_LIST_DEFINITION.maxNumberOfContextualLabelFields; }));
            return _this;
        }
        ContextualLabelFieldsEditorModalComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            lodash.forEach(this.config.contextualLabelFields, function (field, index) {
                var _a;
                var guid = _this.rxGuidService.generate();
                _this.accordionExpansionState[guid] = _this.config.activeFieldIndex === index;
                _this.fieldsFormArray.push(_this.getFormGroup(Object.assign(Object.assign({ guid: guid }, field), { fieldName: (_a = _this.fieldNameById[field.id]) !== null && _a !== void 0 ? _a : '' })));
            });
            if (this.config.isReadOnly) {
                this.fieldsFormArray.disable();
            }
        };
        ContextualLabelFieldsEditorModalComponent.prototype.isDirty = function () {
            return this.fieldsFormArray.dirty;
        };
        ContextualLabelFieldsEditorModalComponent.prototype.ngAfterViewInit = function () {
            if (this.config.activeFieldIndex) {
                this.accordionTabEls.toArray()[this.config.activeFieldIndex].nativeElement.scrollIntoView({
                    block: 'nearest'
                });
            }
        };
        ContextualLabelFieldsEditorModalComponent.prototype.save = function () {
            var formValues = this.fieldsFormArray.getRawValue();
            var fields = formValues.map(function (_b) {
                var id = _b.id, searchable = _b.searchable, visible = _b.visible;
                return ({ id: id, searchable: searchable, visible: visible });
            });
            this.activeModalRef.close(fields);
        };
        ContextualLabelFieldsEditorModalComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ContextualLabelFieldsEditorModalComponent.prototype.addField = function () {
            var _this = this;
            var guid = this.rxGuidService.generate();
            this.fieldsFormArray.push(this.getFormGroup({
                guid: guid,
                fieldName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.new-field.title'),
                id: null,
                searchable: false,
                visible: true
            }));
            this.accordionExpansionState[guid] = true;
            setTimeout(function () {
                _this.accordionTabEls.last.nativeElement.scrollIntoView({
                    block: 'nearest'
                });
            });
        };
        ContextualLabelFieldsEditorModalComponent.prototype.moveField = function (fromIndex, toIndex) {
            i7.moveItemInArray(this.fieldsFormArray.controls, fromIndex, toIndex);
            this.fieldsFormArray.markAsDirty();
        };
        ContextualLabelFieldsEditorModalComponent.prototype.onFieldDrop = function (event) {
            i7.moveItemInArray(this.fieldsFormArray.controls, event.previousIndex, event.currentIndex);
            this.fieldsFormArray.markAsDirty();
        };
        ContextualLabelFieldsEditorModalComponent.prototype.removeField = function (index) {
            this.fieldsFormArray.removeAt(index);
            this.fieldsFormArray.markAsDirty();
        };
        ContextualLabelFieldsEditorModalComponent.prototype.collapseAll = function () {
            var _this = this;
            lodash.forEach(this.accordionExpansionState, function (value, key) {
                _this.accordionExpansionState[key] = false;
            });
        };
        ContextualLabelFieldsEditorModalComponent.prototype.expandAll = function () {
            var _this = this;
            lodash.forEach(this.accordionExpansionState, function (value, key) { return (_this.accordionExpansionState[key] = true); });
        };
        ContextualLabelFieldsEditorModalComponent.prototype.onFieldSelect = function (formGroup, value) {
            formGroup.get('fieldName').setValue(this.fieldNameById[value]);
        };
        ContextualLabelFieldsEditorModalComponent.prototype.getFormGroup = function (fieldData) {
            return this.formBuilder.group(Object.assign(Object.assign({}, fieldData), { id: [fieldData.id, [this.isFieldIdUnknown(), this.isDoubleUsedField.bind(this)]] }));
        };
        ContextualLabelFieldsEditorModalComponent.prototype.isFieldIdUnknown = function () {
            var _this = this;
            var fieldIds = this.config.options.map(function (_b) {
                var id = _b.id;
                return id;
            });
            return function (control) { return control.parent && !lodash.isNull(control.value) && !fieldIds.includes(control.value)
                ? {
                    unknownField: {
                        message: _this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.unknown-field.message')
                    }
                }
                : null; };
        };
        ContextualLabelFieldsEditorModalComponent.prototype.isDoubleUsedField = function (control) {
            return control.dirty &&
                control.value &&
                control.root.value.length > 1 &&
                control.root.value.some(function (field) { return field.id === control.value; })
                ? {
                    duplicated: {
                        message: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.duplicated-field.message')
                    }
                }
                : null;
        };
        return ContextualLabelFieldsEditorModalComponent;
    }(i4$1.RxModalClass));
    ContextualLabelFieldsEditorModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ContextualLabelFieldsEditorModalComponent, deps: [{ token: i1__namespace.ActiveModalRef }, { token: i2__namespace.FormBuilder }, { token: i3__namespace.RxGuidService }, { token: i4__namespace.TranslateService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ContextualLabelFieldsEditorModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContextualLabelFieldsEditorModalComponent, selector: "rx-contextual-label-fields-editor-modal", viewQueries: [{ propertyName: "accordionTabEls", predicate: i1$1.AdaptAccordionTabComponent, descendants: true, read: i0.ElementRef }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div>\n          <button\n            *ngIf=\"!config.isReadOnly\"\n            class=\"pl-0 pr-0\"\n            rx-id=\"add-contextual-label-field-button\"\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            [disabled]=\"isAddButtonDisabled$ | async\"\n            (click)=\"addField()\"\n          >\n            <span class=\"d-icon-left-plus_circle\"></span>\n            {{ 'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.add-field.label' | translate }}\n          </button>\n        </div>\n\n        <div *ngIf=\"fieldsFormArray.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"expandAll()\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"collapse-all-button\" (click)=\"collapseAll()\">\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"fieldsFormArray.length\"\n        id=\"selected-field\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onFieldDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let fieldFormGroup of fieldsFormArray.controls;\n              let index = index;\n              let first = first;\n              let last = last\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"fieldFormGroup\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [formGroup]=\"fieldFormGroup\"\n              [isOpen]=\"fieldFormGroup.invalid || accordionExpansionState[fieldFormGroup.value.guid]\"\n              (open)=\"accordionExpansionState[fieldFormGroup.value.guid] = true\"\n              (close)=\"accordionExpansionState[fieldFormGroup.value.guid] = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div class=\"rx-ellipsis\" [title]=\"fieldFormGroup.value.fieldName\" rx-id=\"card-title\">\n                      {{ fieldFormGroup.value.fieldName }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        rx-id=\"move-down-button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveField(index, index + 1)\"\n                      ></button>\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        rx-id=\"move-up-button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveField(index, index - 1)\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      rx-id=\"remove-button\"\n                      (click)=\"$event.stopPropagation(); removeField(index)\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row align-items-start px-3\">\n                <rx-select-form-control\n                  [formControl]=\"fieldFormGroup.controls.id\"\n                  rx-id=\"contextual-label-field-id\"\n                  [options]=\"fieldSelectionConfig\"\n                  (ngModelChange)=\"onFieldSelect(fieldFormGroup, $event)\"\n                ></rx-select-form-control>\n                <adapt-rx-checkbox\n                  class=\"ml-5\"\n                  rx-id=\"contextual-label-field-visible\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.visible-field.label'\n                      | translate\n                  }}\"\n                  formControlName=\"visible\"\n                ></adapt-rx-checkbox>\n                <adapt-rx-checkbox\n                  class=\"ml-5\"\n                  rx-id=\"contextual-label-field-searchable\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.searchable-field.label'\n                      | translate\n                  }}\"\n                  formControlName=\"searchable\"\n                ></adapt-rx-checkbox>\n              </div>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!fieldsFormArray.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.empty-state.message' | translate\n          }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"fieldsFormArray.invalid || fieldsFormArray.pristine\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      config.isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [".designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-accordion-tab adapt-rx-checkbox{height:38px;margin-top:1.5rem}rx-select-form-control{width:400px}\n"], components: [{ type: i1__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1__namespace.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i7__namespace.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i1__namespace.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1__namespace.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i6__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7__namespace$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i6__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7__namespace$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i7__namespace$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "async": i6__namespace.AsyncPipe, "translate": i4__namespace.TranslatePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ContextualLabelFieldsEditorModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-contextual-label-fields-editor-modal',
                        templateUrl: './contextual-label-fields-editor-modal.component.html',
                        styleUrls: ['./contextual-label-fields-editor-modal.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.ActiveModalRef }, { type: i2__namespace.FormBuilder }, { type: i3__namespace.RxGuidService }, { type: i4__namespace.TranslateService }, { type: i0__namespace.Injector }]; }, propDecorators: { accordionTabEls: [{
                    type: i0.ViewChildren,
                    args: [i1$1.AdaptAccordionTabComponent, { read: i0.ElementRef }]
                }] } });

    var ContextualLabelFieldsComponent = /** @class */ (function (_super) {
        __extends(ContextualLabelFieldsComponent, _super);
        function ContextualLabelFieldsComponent(rxModalService, translateService) {
            var _this = _super.call(this) || this;
            _this.rxModalService = rxModalService;
            _this.translateService = translateService;
            _this.vmSubject = new rxjs.BehaviorSubject({
                fieldNames: [],
                isEditorDisabled: true,
                isFieldRemovable: false
            });
            _this.vm$ = _this.vmSubject.asObservable();
            return _this;
        }
        ContextualLabelFieldsComponent.prototype.ngOnInit = function () {
            var _a;
            (_a = this.value) !== null && _a !== void 0 ? _a : (this.value = []);
            this.updateViewValues();
        };
        ContextualLabelFieldsComponent.prototype.focus = function (data) {
            this.openContextualLabelFieldsEditor(data.fieldIndex);
        };
        ContextualLabelFieldsComponent.prototype.onWriteValue = function (value) {
            if (!lodash.isNil(value)) {
                this.updateViewValues();
            }
        };
        ContextualLabelFieldsComponent.prototype.ngOnChanges = function (changes) {
            this.updateViewValues();
        };
        ContextualLabelFieldsComponent.prototype.updateViewValues = function () {
            var _this = this;
            var fieldNames = this.value.map(function (field) { var _a, _b; return (_b = (_a = _this.options.options.find(function (_c) {
                var id = _c.id;
                return id === field.id;
            })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ''; });
            this.vmSubject.next({
                fieldNames: fieldNames,
                isEditorDisabled: this.isDisabled && !fieldNames.length,
                isFieldRemovable: !this.isDisabled
            });
        };
        ContextualLabelFieldsComponent.prototype.openContextualLabelFieldsEditor = function (activeFieldIndex) {
            var _this = this;
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.label'),
                data: {
                    contextualLabelFields: this.value ? lodash.cloneDeep(this.value) : [],
                    options: this.options.options,
                    isReadOnly: this.isDisabled,
                    activeFieldIndex: activeFieldIndex
                },
                content: ContextualLabelFieldsEditorModalComponent,
                testID: 'edit-contextual-label-fields'
            })
                .then(function (contextualLabelFields) {
                _this.value = contextualLabelFields;
            })
                .catch(lodash.noop);
        };
        ContextualLabelFieldsComponent.prototype.editContextualLabelField = function (activeFieldIndex) {
            this.openContextualLabelFieldsEditor(activeFieldIndex);
        };
        ContextualLabelFieldsComponent.prototype.removeContextualLabelField = function (activeFieldIndex) {
            this.value = lodash.without(this.value, this.value[activeFieldIndex]);
        };
        return ContextualLabelFieldsComponent;
    }(i7$1.ValueAccessor));
    ContextualLabelFieldsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ContextualLabelFieldsComponent, deps: [{ token: i4__namespace$1.RxModalService }, { token: i4__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ContextualLabelFieldsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContextualLabelFieldsComponent, selector: "rx-contextual-label-fields", inputs: { options: "options" }, providers: [
            {
                provide: i2.NG_VALUE_ACCESSOR,
                useExisting: ContextualLabelFieldsComponent,
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"pb-1\">\n    <adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"open-contextual-label-fields-editor-link\"\n      class=\"d-icon-plus_circle p-0\"\n      (click)=\"openContextualLabelFieldsEditor()\"\n      [disabled]=\"vm.isEditorDisabled\"\n    >\n      {{ 'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.label' | translate }}\n    </adapt-button>\n    <adapt-icon\n      name=\"question_circle_o\"\n      class=\"ml-2\"\n      placement=\"right\"\n      maxWidth=\"400\"\n      [adaptPopover]=\"\n        'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.tooltip' | translate\n      \"\n    ></adapt-icon>\n  </div>\n\n  <span *ngIf=\"!vm.fieldNames.length\" class=\"text-tertiary\" rx-id=\"contextual-label-empty-state\">{{\n    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.empty-state.message' | translate\n  }}</span>\n\n  <div *ngIf=\"vm.fieldNames.length\" rx-id=\"contextual-label-fields\">\n    <div\n      *ngFor=\"let fieldName of vm.fieldNames; let index = index\"\n      class=\"d-flex border rounded px-2 mb-1 align-items-center\"\n    >\n      <strong class=\"flex-grow-1\">{{ fieldName }}</strong>\n      <adapt-button\n        btn-type=\"tertiary\"\n        class=\"d-icon-right-pencil p-1\"\n        rx-id=\"edit-button\"\n        (click)=\"editContextualLabelField(index)\"\n      ></adapt-button>\n      <adapt-button\n        btn-type=\"tertiary\"\n        class=\"d-icon-right-cross_adapt p-1\"\n        rx-id=\"remove-button\"\n        *ngIf=\"vm.isFieldRemovable\"\n        (click)=\"removeContextualLabelField(index)\"\n      ></adapt-button>\n    </div>\n  </div>\n</ng-container>\n", components: [{ type: i1__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1__namespace.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i6__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i6__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i6__namespace.AsyncPipe, "translate": i4__namespace.TranslatePipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ContextualLabelFieldsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-contextual-label-fields',
                        templateUrl: './contextual-label-fields.component.html',
                        providers: [
                            {
                                provide: i2.NG_VALUE_ACCESSOR,
                                useExisting: ContextualLabelFieldsComponent,
                                multi: true
                            }
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace$1.RxModalService }, { type: i4__namespace.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }] } });

    var NamedListDesignerService = /** @class */ (function () {
        function NamedListDesignerService() {
        }
        NamedListDesignerService.prototype.getDefinitionFromDefinitionModel = function (model, bundleId) {
            return {
                allowOverlay: model.customizationOptions.allowOverlay,
                description: model.description,
                fields: model.fields,
                guid: model.guid,
                labelFieldId: model.labelFieldId,
                lastChangedBy: model.lastChangedBy,
                lastUpdateTime: model.lastUpdateTime,
                name: model.name ? bundleId + ":" + model.name : null,
                overlayDescriptor: model.customizationOptions.overlayDescriptor,
                overlayGroupId: model.customizationOptions.overlayGroupId,
                owner: model.owner,
                queryCriteria: model.queryCriteria,
                recordDefinitionName: model.recordDefinitionName,
                scope: model.customizationOptions.scope,
                searchBehavior: model.searchBehavior,
                tags: model.tags,
                valueFieldId: model.valueFieldId,
                version: model.version
            };
        };
        return NamedListDesignerService;
    }());
    NamedListDesignerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NamedListDesignerService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NamedListDesignerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NamedListDesignerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NamedListDesignerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxNamedListDesignerComponent = /** @class */ (function () {
        function RxNamedListDesignerComponent(injector, store$, namedListDesignerService, rxGlobalCacheService, rxModalService, rxRecordDefinitionCacheService, translateService, rxOverlayService, rxNotificationService, rxExpressionEditorService, rxFeatureService) {
            var _this = this;
            this.injector = injector;
            this.store$ = store$;
            this.namedListDesignerService = namedListDesignerService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxModalService = rxModalService;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.translateService = translateService;
            this.rxOverlayService = rxOverlayService;
            this.rxNotificationService = rxNotificationService;
            this.rxExpressionEditorService = rxExpressionEditorService;
            this.rxFeatureService = rxFeatureService;
            this.definitionSaved = new i0.EventEmitter();
            this.definitionErrorLoading = new i0.EventEmitter();
            this.closeDesigner = new i0.EventEmitter();
            this.bundleId$ = this.store$.select(bundleIdSelector);
            this.bundleFriendlyName$ = this.bundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleFriendlyName(bundleId); }));
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.expressionConfigurator = new RxNamedListExpressionConfigurator(this.injector);
            this.isFormInitialized = false;
            this.definitionModel$ = this.store$.select(definitionModelSelector);
            this.isDirty$ = this.store$.select(isDirtySelector);
            this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
            this.definitionModelFromDefinition$ = this.store$.select(definitionModelFromDefinitionSelector);
            this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(operators.withLatestFrom(this.bundleId$), operators.map(function (_b) {
                var _c = __read(_b, 2), definitionModel = _c[0], bundleId = _c[1];
                return _this.namedListDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId);
            }));
            this.recordDefinition$ = this.definitionModel$.pipe(operators.switchMap(function (definitionModel) { return definitionModel.recordDefinitionName
                ? _this.rxRecordDefinitionCacheService.getRecordDefinition(definitionModel.recordDefinitionName)
                : rxjs.of(null); }), operators.shareReplay(1));
            this.textFieldNameOptions$ = this.recordDefinition$.pipe(operators.map(function (recordDefinition) { return recordDefinition
                ? recordDefinition.fieldDefinitions
                    .filter(function (_b) {
                    var resourceType = _b.resourceType;
                    return [
                        i5.RX_RECORD_DEFINITION.resourceTypes.character,
                        i5.RX_RECORD_DEFINITION.resourceTypes.localizedCharacter
                    ].includes(resourceType);
                })
                    .map(function (_b) {
                    var id = _b.id, name = _b.name;
                    return ({ id: id, name: name });
                })
                : []; }));
            this.validationIssues$ = rxjs.combineLatest([
                this.definitionModel$,
                this.textFieldNameOptions$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), definitionModel = _c[0], textFieldNameOptions = _c[1];
                return _this.validate(definitionModel, textFieldNameOptions);
            }), operators.shareReplay(1));
            this.hasValidationErrors$ = this.validationIssues$.pipe(operators.map(function (issueSections) { return lodash.some(issueSections, {
                issues: [{ type: i4$1.ValidationIssueType.Error }]
            }); }));
            this.areNewDefinitionsAllowed$ = this.bundleId$.pipe(operators.switchMap(function (bundleId) { return _this.rxOverlayService.areNewDefinitionsAllowed(bundleId); }));
            this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(operators.filter(function (definition) { return !!definition.lastUpdateTime; }), operators.withLatestFrom(this.areNewDefinitionsAllowed$), operators.map(function (_b) {
                var _c = __read(_b, 2), definition = _c[0], areNewDefinitionsAllowed = _c[1];
                return !areNewDefinitionsAllowed || !_this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition);
            }), operators.tap(function (isReadOnly) {
                if (isReadOnly) {
                    _this.rxNotificationService.addWarningMessage(_this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
                }
            }), operators.startWith(false), operators.shareReplay(1));
            this.isSaveButtonDisabled$ = rxjs.combineLatest([
                this.hasValidationErrors$,
                this.isReadOnly$,
                this.isDirty$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 3), hasValidationErrors = _c[0], isReadOnly = _c[1], isDirty = _c[2];
                return hasValidationErrors || isReadOnly || !isDirty;
            }));
            this.inspectorFocusEditorSubject = new rxjs.Subject();
            this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
            this.isExistingDefinition$ = this.definitionModelFromDefinition$.pipe(operators.map(function (model) { return Boolean(model.lastUpdateTime); }));
            this.breadcrumbItems$ = this.definitionModel$.pipe(operators.map(function (model) { return [
                {
                    label: model.name ||
                        "<" + _this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.new-named-list.label') + ">",
                    data: {}
                }
            ]; }));
            this.definitionInspectorConfig$ = rxjs.combineLatest([
                this.definitionModel$,
                this.recordDefinition$,
                this.textFieldNameOptions$,
                this.isReadOnly$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 4), definitionModel = _c[0], recordDefinition = _c[1], textFieldNameOptions = _c[2], isReadOnly = _c[3];
                return _this.getFormBuilderConfig(definitionModel, recordDefinition, textFieldNameOptions, isReadOnly);
            }));
            this.isDesignMode$ = this.store$.select(isDesignModeSelector);
            this.definitionForJsonViewer$ = this.isDesignMode$.pipe(operators.switchMap(function (isDesignMode) { return isDesignMode
                ? rxjs.of(null)
                : rxjs.combineLatest([_this.definitionFromDefinitionModel$, _this.originalDefinition$]).pipe(operators.map(function (_b) {
                    var _c = __read(_b, 2), definitionFromDefinitionModel = _c[0], originalDefinition = _c[1];
                    return (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel));
                })); }));
            this.vm$ = rxjs.combineLatest([
                this.breadcrumbItems$,
                this.bundleFriendlyName$,
                this.hasValidationErrors$,
                this.isExistingDefinition$,
                this.isSaveButtonDisabled$,
                this.definitionForJsonViewer$,
                this.definitionModel$,
                this.definitionInspectorConfig$,
                this.validationIssues$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 9), breadcrumbItems = _c[0], bundleFriendlyName = _c[1], hasValidationErrors = _c[2], isExistingDefinition = _c[3], isSaveButtonDisabled = _c[4], definitionForJsonViewer = _c[5], definitionModel = _c[6], definitionInspectorConfig = _c[7], validationIssues = _c[8];
                return ({
                    breadcrumbItems: breadcrumbItems,
                    bundleFriendlyName: bundleFriendlyName,
                    hasValidationErrors: hasValidationErrors,
                    isExistingDefinition: isExistingDefinition,
                    isSaveButtonDisabled: isSaveButtonDisabled,
                    definitionForJsonViewer: definitionForJsonViewer,
                    definitionModel: definitionModel,
                    definitionInspectorConfig: definitionInspectorConfig,
                    validationIssues: validationIssues
                });
            }));
        }
        RxNamedListDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue) {
                this.store$.dispatch(init({ payload: this.configuration }));
            }
        };
        RxNamedListDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.store$
                .select(savedDefinitionNameSelector)
                .pipe(operators.skip(1), operators.filter(Boolean), operators.takeUntil(this.destroyed$))
                .subscribe(function (savedDefinitionName) {
                _this.definitionSaved.emit(savedDefinitionName);
            });
            this.expressionConfigurator.configureForProperty({
                propertyPath: 'queryCriteria',
                dataDictionary$: this.definitionModel$.pipe(operators.switchMap(function (definitionModel) { return _this.expressionConfigurator.namedListExpressionDataDictionary(definitionModel); })),
                operators: i3.ExpressionOperatorRowsByGroup.get(i3.ExpressionOperatorGroup.All)
            });
        };
        RxNamedListDesignerComponent.prototype.canDeactivate = function () {
            var canDeactivate = true;
            this.isDirty$.pipe(operators.take(1)).subscribe(function (isDirty) {
                canDeactivate = !isDirty;
            });
            return canDeactivate;
        };
        RxNamedListDesignerComponent.prototype.onToggleDesignMode = function () {
            this.store$.dispatch(toggleDesignMode());
        };
        RxNamedListDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            this.inspectorFocusEditorSubject.next({
                editorName: validationIssue.data.propertyName,
                data: validationIssue.data.data
            });
        };
        RxNamedListDesignerComponent.prototype.onModelChange = function (newDefinitionModel) {
            if (this.isFormInitialized) {
                this.store$.dispatch(updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: newDefinitionModel
                }));
            }
        };
        RxNamedListDesignerComponent.prototype.onFormInitialized = function () {
            this.isFormInitialized = true;
        };
        RxNamedListDesignerComponent.prototype.onEditorEvent = function (event) {
            if (event.type === i7$1.RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
                this.revertCustomization();
            }
            if (event.type === i7$1.RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
                this.openExpressionEditor(event);
            }
        };
        RxNamedListDesignerComponent.prototype.openExpressionEditor = function (event) {
            var _this = this;
            this.definitionModel$.pipe(operators.take(1)).subscribe(function (definitionModel) {
                _this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: event.payload.propertyPath,
                        value: definitionModel.queryCriteria,
                        label: event.payload.propertyLabel
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
                        definitionModelFromDesigner: { queryCriteria: expression.value }
                    }));
                });
            });
        };
        RxNamedListDesignerComponent.prototype.revertCustomization = function () {
            this.store$.dispatch(revertCustomization());
        };
        RxNamedListDesignerComponent.prototype.onSave = function () {
            this.store$.dispatch(saveDefinition());
        };
        RxNamedListDesignerComponent.prototype.validate = function (definitionModel, textFieldNameOptions) {
            var _this = this;
            var _a;
            var validationIssues = [];
            if (lodash.isEmpty(lodash.trim(definitionModel.name))) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                    }),
                    data: {
                        propertyName: 'name'
                    }
                });
            }
            else if (!i5.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.name-validation.message'),
                    data: {
                        propertyName: 'name'
                    }
                });
            }
            if (lodash.isEmpty(lodash.trim(definitionModel.recordDefinitionName))) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.record-definition-field.label')
                    }),
                    data: {
                        propertyName: 'recordDefinitionName'
                    }
                });
            }
            if (lodash.isNil(definitionModel.labelFieldId)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.label')
                    }),
                    data: {
                        propertyName: 'labelFieldId'
                    }
                });
            }
            if (lodash.isNil(definitionModel.valueFieldId)) {
                validationIssues.push({
                    type: i4$1.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.label')
                    }),
                    data: {
                        propertyName: 'valueFieldId'
                    }
                });
            }
            if (definitionModel.recordDefinitionName) {
                (_a = definitionModel.fields) === null || _a === void 0 ? void 0 : _a.forEach(function (field, index) {
                    if (!textFieldNameOptions.some(function (_b) {
                        var id = _b.id;
                        return id === field.id;
                    })) {
                        validationIssues.push({
                            type: i4$1.ValidationIssueType.Error,
                            description: _this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.unknown-field.message'),
                            data: {
                                propertyName: 'fields',
                                data: {
                                    fieldIndex: index
                                }
                            }
                        });
                    }
                });
            }
            return validationIssues.length
                ? [
                    {
                        title: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.new-named-list.label'),
                        issues: validationIssues
                    }
                ]
                : [];
        };
        RxNamedListDesignerComponent.prototype.getFieldNameOptions = function (recordDefinition) {
            return recordDefinition.fieldDefinitions.map(function (_b) {
                var id = _b.id, name = _b.name;
                return ({ id: id, name: name });
            });
        };
        RxNamedListDesignerComponent.prototype.getFormBuilderConfig = function (definitionModel, recordDefinition, textFieldNameOptions, isReadOnly) {
            var _this = this;
            return [
                {
                    controls: [
                        {
                            name: 'name',
                            component: i7$1.TextFormControlComponent,
                            isDisabled: Boolean(definitionModel.lastUpdateTime),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'recordDefinitionName',
                            component: i7$1.RxDefinitionPickerComponent,
                            isDisabled: isReadOnly,
                            options: {
                                definitionType: i7$1.RxDefinitionPickerType.Record,
                                label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.record-definition-field.label'),
                                required: true,
                                beforeValueChange: function (oldValue) {
                                    var _a;
                                    if (Boolean(oldValue) &&
                                        (definitionModel.labelFieldId ||
                                            definitionModel.valueFieldId ||
                                            ((_a = definitionModel.fields) === null || _a === void 0 ? void 0 : _a.length) ||
                                            definitionModel.queryCriteria)) {
                                        var message = _this.rxFeatureService.isFeatureEnabled('DRD21-43103')
                                            ? _this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.clear-values-confirmation.message')
                                            : 'Display name field, Value field, and Filter expression will be cleared. Do you want to continue?';
                                        return _this.rxModalService
                                            .confirm({
                                            title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                            modalStyle: i4$1.RX_MODAL.modalStyles.warning,
                                            message: message
                                        })
                                            .then(function (isConfirmed) {
                                            if (isConfirmed) {
                                                setTimeout(function () {
                                                    _this.store$.dispatch(clearFields());
                                                });
                                            }
                                            return isConfirmed;
                                        });
                                    }
                                    return Promise.resolve(true);
                                }
                            }
                        },
                        {
                            name: 'queryCriteria',
                            component: i7$1.ExpressionFormControlComponent,
                            isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.filter-expression-field.label'),
                                tooltip: new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.filter-expression-field.tooltip')),
                                dataDictionary$: this.expressionConfigurator.getDataDictionary('queryCriteria'),
                                operators: this.expressionConfigurator.getOperators()
                            }
                        },
                        {
                            name: 'searchBehavior',
                            component: i7$1.SelectFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior-field.label'),
                                tooltip: new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior-field.tooltip')),
                                required: true,
                                options: [
                                    {
                                        id: i6.RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains,
                                        name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.contains.label')
                                    },
                                    {
                                        id: i6.RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.startsWith,
                                        name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.starts-with.label')
                                    },
                                    {
                                        id: i6.RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch,
                                        name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.exact-match.label')
                                    }
                                ],
                                emptyOption: false,
                                sortAlphabetically: false
                            },
                            hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-43015')
                        },
                        {
                            name: 'labelFieldId',
                            component: i7$1.SelectFormControlComponent,
                            isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.label'),
                                required: true,
                                tooltip: new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.tooltip')),
                                emptyOption: true,
                                options: recordDefinition ? this.getFieldNameOptions(recordDefinition) : []
                            }
                        },
                        {
                            name: 'valueFieldId',
                            component: i7$1.SelectFormControlComponent,
                            isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.label'),
                                required: true,
                                tooltip: new i3.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.tooltip')),
                                emptyOption: true,
                                options: recordDefinition ? this.getFieldNameOptions(recordDefinition) : []
                            }
                        },
                        {
                            name: 'fields',
                            component: ContextualLabelFieldsComponent,
                            isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                            options: {
                                options: textFieldNameOptions
                            },
                            hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-43103')
                        },
                        {
                            component: i7$1.RxRevertCustomizationComponent,
                            options: {
                                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                                scope: definitionModel.customizationOptions.scope,
                                overlayGroupId: definitionModel.customizationOptions.overlayGroupId,
                                overlayDescriptor: definitionModel.customizationOptions.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: i7$1.CustomizationOptionsComponent,
                            isDisabled: isReadOnly,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.named-list-definition.label')
                                    .toLowerCase(),
                                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                                scope: definitionModel.customizationOptions.scope,
                                overlayGroupId: definitionModel.customizationOptions.overlayGroupId,
                                overlayDescriptor: definitionModel.customizationOptions.overlayDescriptor
                            }
                        }
                    ]
                }
            ];
        };
        RxNamedListDesignerComponent.prototype.ngOnDestroy = function () {
            this.inspectorFocusEditorSubject.complete();
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.store$.dispatch(destroy());
        };
        return RxNamedListDesignerComponent;
    }());
    RxNamedListDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerComponent, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace$1.Store }, { token: NamedListDesignerService }, { token: i3__namespace$1.RxGlobalCacheService }, { token: i4__namespace$1.RxModalService }, { token: i5__namespace.RxRecordDefinitionCacheService }, { token: i4__namespace.TranslateService }, { token: i3__namespace$1.RxOverlayService }, { token: i3__namespace$1.RxNotificationService }, { token: i7__namespace.RxExpressionEditorService }, { token: i3__namespace$1.RxFeatureService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxNamedListDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedListDesignerComponent, selector: "rx-named-list-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    (save)=\"onSave()\"\n    (toggleDesignMode)=\"onToggleDesignMode()\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        rx-id=\"validation-issues\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.named-list-definition.label' | translate\"\n          [issueSections]=\"vm.validationIssues\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <h1 class=\"mt-0\">\n          {{\n            vm.isExistingDefinition\n              ? ('com.bmc.arsys.rx.client.named-list-designer.edit-named-list.title' | translate)\n              : ('com.bmc.arsys.rx.client.named-list-designer.create-named-list.title' | translate)\n          }}\n        </h1>\n\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [model]=\"vm.definitionModel\"\n          (editorEvent)=\"onEditorEvent($event)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          (formInitialized)=\"onFormInitialized()\"\n          (modelChange)=\"onModelChange($event)\"\n        ></rx-form-builder>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}rx-form-builder{max-width:400px}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i7__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i1__namespace.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i1__namespace.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i4__namespace$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7__namespace.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i1__namespace.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i6__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i6__namespace.AsyncPipe, "translate": i4__namespace.TranslatePipe, "json": i6__namespace.JsonPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-named-list-designer',
                        templateUrl: './named-list-designer.component.html',
                        styleUrls: ['./named-list-designer.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace$1.Store }, { type: NamedListDesignerService }, { type: i3__namespace$1.RxGlobalCacheService }, { type: i4__namespace$1.RxModalService }, { type: i5__namespace.RxRecordDefinitionCacheService }, { type: i4__namespace.TranslateService }, { type: i3__namespace$1.RxOverlayService }, { type: i3__namespace$1.RxNotificationService }, { type: i7__namespace.RxExpressionEditorService }, { type: i3__namespace$1.RxFeatureService }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], definitionSaved: [{
                    type: i0.Output
                }], definitionErrorLoading: [{
                    type: i0.Output
                }], closeDesigner: [{
                    type: i0.Output
                }] } });

    var NamedListDesignerEffects = /** @class */ (function () {
        function NamedListDesignerEffects(store$, actions$, errorHandler, rxDefinitionUpdateService, namedListDesignerService, rxNotificationService, translateService, rxNamedListDefinitionService, rxDefinitionNameService, rxComponentCanDeactivateGuard) {
            var _this = this;
            this.store$ = store$;
            this.actions$ = actions$;
            this.errorHandler = errorHandler;
            this.rxDefinitionUpdateService = rxDefinitionUpdateService;
            this.namedListDesignerService = namedListDesignerService;
            this.rxNotificationService = rxNotificationService;
            this.translateService = translateService;
            this.rxNamedListDefinitionService = rxNamedListDefinitionService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.initNamedListDesigner$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(init), operators.map(function (action) { return loadDefinition(); })); });
            this.loadDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinition), operators.withLatestFrom(_this.store$.select(definitionNameSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionName = _b[1];
                return definitionName
                    ? _this.rxNamedListDefinitionService.get(definitionName)
                    : _this.rxNamedListDefinitionService.getNew();
            }), operators.map(function (definition) { return loadDefinitionSuccess({
                definition: definition
            }); })); });
            this.loadDefinitionSuccess$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(loadDefinitionSuccess), operators.map(function (action) {
                var definitionModelFromDefinition = {
                    version: action.definition.version,
                    lastUpdateTime: action.definition.lastUpdateTime,
                    lastChangedBy: action.definition.lastChangedBy,
                    owner: action.definition.owner,
                    name: _this.rxDefinitionNameService.getDisplayName(action.definition.name),
                    tags: action.definition.tags,
                    description: action.definition.description,
                    guid: action.definition.guid,
                    recordDefinitionName: action.definition.recordDefinitionName,
                    queryCriteria: action.definition.queryCriteria,
                    searchBehavior: action.definition.searchBehavior,
                    labelFieldId: action.definition.labelFieldId,
                    valueFieldId: action.definition.valueFieldId,
                    fields: action.definition.fields,
                    customizationOptions: {
                        isDisabled: false,
                        definitionTypeDisplayName: null,
                        allowOverlay: action.definition.allowOverlay,
                        scope: action.definition.scope,
                        overlayGroupId: action.definition.overlayGroupId,
                        overlayDescriptor: action.definition.overlayDescriptor
                    }
                };
                return initDefinitionData({
                    definition: action.definition,
                    definitionModel: definitionModelFromDefinition
                });
            })); });
            this.revertCustomization$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(revertCustomization), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(bundleIdSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 3), _ = _b[0], definitionModel = _b[1], bundleId = _b[2];
                return _this.rxNamedListDefinitionService.revertCustomization(bundleId + ":" + definitionModel.name);
            }), operators.tap(function () {
                _this.rxComponentCanDeactivateGuard.disable();
                window.location.reload();
            })); }, { dispatch: false });
            this.markPristine$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(initDefinitionData, saveDefinition), operators.map(function () { return markDesignerPristine(); })); });
            this.markDirty$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(updateDefinitionModelFromDesigner, saveDefinitionError), operators.map(function () { return markDesignerDirty(); })); });
            this.saveDefinition$ = i2$1.createEffect(function () { return _this.actions$.pipe(i2$1.ofType(saveDefinition), operators.withLatestFrom(_this.store$.select(definitionModelSelector), _this.store$.select(originalDefinitionSelector), _this.store$.select(bundleIdSelector)), operators.switchMap(function (_a) {
                var _b = __read(_a, 4), _ = _b[0], definitionModel = _b[1], originalDefinition = _b[2], bundleId = _b[3];
                var definition = Object.assign(Object.assign({}, originalDefinition), _this.namedListDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId));
                return (definition.lastUpdateTime
                    ? _this.rxDefinitionUpdateService.execute(_this.rxNamedListDefinitionService.update.bind(_this.rxNamedListDefinitionService, definition))
                    : _this.rxNamedListDefinitionService.create(definition)).pipe(operators.map(function (response) {
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
                    definitionTypeDisplayName: _this.translateService.instant('com.bmc.arsys.rx.client.common.named-list-definition.label')
                }));
            }), operators.filter(function (_a) {
                var _b = __read(_a, 2), action = _b[0], definitionName = _b[1];
                return !!definitionName;
            }), operators.map(function () { return loadDefinition(); })); });
        }
        return NamedListDesignerEffects;
    }());
    NamedListDesignerEffects.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NamedListDesignerEffects, deps: [{ token: i1__namespace$1.Store }, { token: i2__namespace$1.Actions }, { token: i0__namespace.ErrorHandler }, { token: i3__namespace$1.RxDefinitionUpdateService }, { token: NamedListDesignerService }, { token: i3__namespace$1.RxNotificationService }, { token: i4__namespace.TranslateService }, { token: i6__namespace$1.RxNamedListDefinitionService }, { token: i3__namespace$1.RxDefinitionNameService }, { token: i3__namespace$1.RxComponentCanDeactivateGuard }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NamedListDesignerEffects.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NamedListDesignerEffects });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: NamedListDesignerEffects, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$1.Store }, { type: i2__namespace$1.Actions }, { type: i0__namespace.ErrorHandler }, { type: i3__namespace$1.RxDefinitionUpdateService }, { type: NamedListDesignerService }, { type: i3__namespace$1.RxNotificationService }, { type: i4__namespace.TranslateService }, { type: i6__namespace$1.RxNamedListDefinitionService }, { type: i3__namespace$1.RxDefinitionNameService }, { type: i3__namespace$1.RxComponentCanDeactivateGuard }]; } });

    var initialModel = {
        name: null,
        customizationOptions: {
            allowOverlay: false,
            overlayGroupId: null,
            overlayDescriptor: null,
            scope: 'BUNDLE',
            isDisabled: false,
            definitionTypeDisplayName: null
        }
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
    }), i1.on(clearFields, function (state) { return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [], queryCriteria: null, labelFieldId: null, valueFieldId: null }) })); }), i1.on(markDesignerPristine, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: false })); }), i1.on(markDesignerDirty, function (state) { return (Object.assign(Object.assign({}, state), { isDirty: true })); }), i1.on(toggleDesignMode, function (state) { return (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode })); }), i1.on(updateDefinitionModelFromDesigner, function (state, _a) {
        var definitionModelFromDesigner = _a.definitionModelFromDesigner;
        return (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }));
    }), i1.on(saveDefinitionSuccess, function (state, _a) {
        var savedDefinitionName = _a.savedDefinitionName;
        return (Object.assign(Object.assign({}, state), { savedDefinitionName: savedDefinitionName }));
    }), i1.on(destroy, function (state) { return (Object.assign({}, initialState)); }));
    function namedListDesignerModelReducer(state, action) {
        return reducer(state, action);
    }

    var RxNamedListDesignerModule = /** @class */ (function () {
        function RxNamedListDesignerModule() {
        }
        return RxNamedListDesignerModule;
    }());
    RxNamedListDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxNamedListDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerModule, declarations: [ContextualLabelFieldsComponent,
            ContextualLabelFieldsEditorModalComponent,
            RxNamedListDesignerComponent], imports: [i1$1.AdaptAccordionModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptCodeViewerModule,
            i1$1.AdaptEmptyStateModule,
            i1$1.AdaptIconModule,
            i1$1.AdaptPopoverModule,
            i1$1.AdaptSidebarModule,
            i1$1.AdaptTabsModule,
            i1$1.AdaptRxFormsModule,
            i6$1.CommonModule,
            i7.DragDropModule,
            i2.FormsModule,
            i2.ReactiveFormsModule,
            i7$1.RxDesignerHeaderModule,
            i7$1.RxFormBuilderModule,
            i4$1.RxValidationIssuesModule,
            i7$1.RxDefinitionPickerModule,
            i7$1.ExpressionFormControlModule,
            i7$1.SelectFormControlModule,
            i7$1.CustomizationOptionsModule,
            i7$1.RxRevertCustomizationModule,
            i4.TranslateModule, i1__namespace$1.StoreFeatureModule, i2__namespace$1.EffectsFeatureModule], exports: [RxNamedListDesignerComponent] });
    RxNamedListDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerModule, imports: [[
                i1$1.AdaptAccordionModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptCodeViewerModule,
                i1$1.AdaptEmptyStateModule,
                i1$1.AdaptIconModule,
                i1$1.AdaptPopoverModule,
                i1$1.AdaptSidebarModule,
                i1$1.AdaptTabsModule,
                i1$1.AdaptRxFormsModule,
                i6$1.CommonModule,
                i7.DragDropModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i7$1.RxDesignerHeaderModule,
                i7$1.RxFormBuilderModule,
                i4$1.RxValidationIssuesModule,
                i7$1.RxDefinitionPickerModule,
                i7$1.ExpressionFormControlModule,
                i7$1.SelectFormControlModule,
                i7$1.CustomizationOptionsModule,
                i7$1.RxRevertCustomizationModule,
                i4.TranslateModule,
                i1.StoreModule.forFeature(RX_NAMED_LIST_DESIGNER.featureSelector, {
                    model: namedListDesignerModelReducer
                }),
                i2$1.EffectsModule.forFeature([NamedListDesignerEffects])
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            ContextualLabelFieldsComponent,
                            ContextualLabelFieldsEditorModalComponent,
                            RxNamedListDesignerComponent
                        ],
                        imports: [
                            i1$1.AdaptAccordionModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptCodeViewerModule,
                            i1$1.AdaptEmptyStateModule,
                            i1$1.AdaptIconModule,
                            i1$1.AdaptPopoverModule,
                            i1$1.AdaptSidebarModule,
                            i1$1.AdaptTabsModule,
                            i1$1.AdaptRxFormsModule,
                            i6$1.CommonModule,
                            i7.DragDropModule,
                            i2.FormsModule,
                            i2.ReactiveFormsModule,
                            i7$1.RxDesignerHeaderModule,
                            i7$1.RxFormBuilderModule,
                            i4$1.RxValidationIssuesModule,
                            i7$1.RxDefinitionPickerModule,
                            i7$1.ExpressionFormControlModule,
                            i7$1.SelectFormControlModule,
                            i7$1.CustomizationOptionsModule,
                            i7$1.RxRevertCustomizationModule,
                            i4.TranslateModule,
                            i1.StoreModule.forFeature(RX_NAMED_LIST_DESIGNER.featureSelector, {
                                model: namedListDesignerModelReducer
                            }),
                            i2$1.EffectsModule.forFeature([NamedListDesignerEffects])
                        ],
                        exports: [RxNamedListDesignerComponent]
                    }]
            }] });

    var RxNamedListDesignerPageComponent = /** @class */ (function () {
        function RxNamedListDesignerPageComponent(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
            this.activatedRoute = activatedRoute;
            this.router = router;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.translateService = translateService;
            this.isInitialized = false;
            this.definitionsRoute = 'named-list-definitions';
            this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.title');
        }
        RxNamedListDesignerPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            this.subscription = this.activatedRoute.params.subscribe(function (_c) {
                var definitionName = _c.definitionName, bundleId = _c.bundleId;
                _this.rxBundleCacheService.bundleId = bundleId || _this.rxDefinitionNameService.getBundleId(definitionName);
                _this.isInitialized = true;
                _this.isNewDefinition = !definitionName;
                _this.configuration = {
                    bundleId: _this.rxBundleCacheService.bundleId,
                    definitionName: definitionName
                };
                _this.rxPageTitleService.set([_this.rxDefinitionNameService.getDisplayName(definitionName), _this.pageTitle]);
            });
        };
        RxNamedListDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        RxNamedListDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        RxNamedListDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        RxNamedListDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i3.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                this.definitionsRoute
            ]);
        };
        RxNamedListDesignerPageComponent.prototype.onDefinitionSaved = function (definitionName) {
            if (this.isNewDefinition) {
                this.router.navigate(['edit', definitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        RxNamedListDesignerPageComponent.prototype.onDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        return RxNamedListDesignerPageComponent;
    }());
    RxNamedListDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerPageComponent, deps: [{ token: i1__namespace$2.ActivatedRoute }, { token: i1__namespace$2.Router }, { token: i3__namespace$1.RxBundleCacheService }, { token: i3__namespace$1.RxComponentCanDeactivateGuard }, { token: i3__namespace$1.RxDefinitionNameService }, { token: i3__namespace$1.RxPageTitleService }, { token: i4__namespace$1.RxUtilityModalsService }, { token: i4__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxNamedListDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedListDesignerPageComponent, selector: "rx-named-list-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: RxNamedListDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-named-list-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-named-list-designer>\n", components: [{ type: RxNamedListDesignerComponent, selector: "rx-named-list-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-named-list-designer-page',
                        templateUrl: './named-list-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.ActivatedRoute }, { type: i1__namespace$2.Router }, { type: i3__namespace$1.RxBundleCacheService }, { type: i3__namespace$1.RxComponentCanDeactivateGuard }, { type: i3__namespace$1.RxDefinitionNameService }, { type: i3__namespace$1.RxPageTitleService }, { type: i4__namespace$1.RxUtilityModalsService }, { type: i4__namespace.TranslateService }]; }, propDecorators: { designerComponent: [{
                    type: i0.ViewChild,
                    args: [RxNamedListDesignerComponent]
                }] } });

    var RxNamedListDesignerPageModule = /** @class */ (function () {
        function RxNamedListDesignerPageModule() {
        }
        return RxNamedListDesignerPageModule;
    }());
    RxNamedListDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxNamedListDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerPageModule, declarations: [RxNamedListDesignerPageComponent], imports: [i6$1.CommonModule, RxNamedListDesignerModule], exports: [RxNamedListDesignerPageComponent] });
    RxNamedListDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerPageModule, imports: [[i6$1.CommonModule, RxNamedListDesignerModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxNamedListDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxNamedListDesignerPageComponent],
                        imports: [i6$1.CommonModule, RxNamedListDesignerModule],
                        exports: [RxNamedListDesignerPageComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxNamedListDesignerComponent = RxNamedListDesignerComponent;
    exports.RxNamedListDesignerModule = RxNamedListDesignerModule;
    exports.RxNamedListDesignerPageComponent = RxNamedListDesignerPageComponent;
    exports.RxNamedListDesignerPageModule = RxNamedListDesignerPageModule;
    exports.RxNamedListExpressionConfigurator = RxNamedListExpressionConfigurator;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-named-list-designer.umd.js.map
