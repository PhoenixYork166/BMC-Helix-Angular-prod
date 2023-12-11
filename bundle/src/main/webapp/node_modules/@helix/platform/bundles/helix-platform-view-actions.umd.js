(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/shared/api'), require('@helix/platform/view/designer'), require('@helix/platform/view/api'), require('@helix/platform/shared/components'), require('rxjs/operators'), require('rxjs'), require('@helix/platform/view/components'), require('@helix/platform/record/api'), require('lodash'), require('@helix/platform/utils'), require('@angular/common'), require('@bmc-ux/adapt-angular'), require('@helix/platform/view/runtime'), require('@angular/router'), require('@helix/platform/association/api'), require('@helix/platform/ui-kit'), require('@ngx-translate/core'), require('@angular/forms'), require('@helix/platform/process/api'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/view/actions', ['exports', '@angular/core', '@helix/platform/shared/api', '@helix/platform/view/designer', '@helix/platform/view/api', '@helix/platform/shared/components', 'rxjs/operators', 'rxjs', '@helix/platform/view/components', '@helix/platform/record/api', 'lodash', '@helix/platform/utils', '@angular/common', '@bmc-ux/adapt-angular', '@helix/platform/view/runtime', '@angular/router', '@helix/platform/association/api', '@helix/platform/ui-kit', '@ngx-translate/core', '@angular/forms', '@helix/platform/process/api', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.view = global.helix.platform.view || {}, global.helix.platform.view.actions = {}), global.ng.core, global.helix.platform.shared.api, global.helix.platform.view.designer, global.helix.platform.view.api, global.helix.platform.shared.components, global.rxjs.operators, global.rxjs, global.helix.platform.view.components, global.helix.platform.record.api, global.lodash, global.helix.platform.utils, global.ng.common, global.adaptAngular, global.helix.platform.view.runtime, global.ng.router, global.helix.platform.association.api, global.helix.platform["ui-kit"], global.ngxTranslateCore, global.ng.forms, global.helix.platform.process.api, global.ng.platformBrowser));
})(this, (function (exports, i0, i1$1, i3, i1, components, operators, rxjs, i2, i4, lodash, i1$2, i2$2, i1$3, i3$1, i2$1, i1$4, i2$3, i4$1, i3$2, i3$3, i4$2) { 'use strict';

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
    var i1__namespace$4 = /*#__PURE__*/_interopNamespace(i1$1);
    var i3__namespace$3 = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$2);
    var i2__namespace$3 = /*#__PURE__*/_interopNamespace(i2$2);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$3);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3$1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$4);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$3);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$2);
    var i3__namespace$2 = /*#__PURE__*/_interopNamespace(i3$3);
    var i4__namespace$2 = /*#__PURE__*/_interopNamespace(i4$2);

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

    var RxApplyGridFilterViewActionDesignModelClass = /** @class */ (function (_super) {
        __extends(RxApplyGridFilterViewActionDesignModelClass, _super);
        function RxApplyGridFilterViewActionDesignModelClass(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.viewDesignerFacade = _this.injector.get(i3.ViewDesignerFacade);
            _this.rxRecordDefinitionCacheService = _this.injector.get(i4.RxRecordDefinitionCacheService);
            _this.rxRecordGridDesignUtilsService = _this.injector.get(i2.RxRecordGridDesignUtilsService);
            _this.rxRecordGridFilterSelectHelperService = _this.injector.get(i2.RxRecordGridFilterSelectHelperService);
            // set initial filters select value from child filter components
            _this.sandbox.children$
                .pipe(operators.first(), operators.withLatestFrom(_this.sandbox.actionProperties$.pipe(operators.pluck('filters'))), operators.takeUntil(_this.sandbox.destroyed$))
                .subscribe(function (_b) {
                var _c = __read(_b, 2), filterComponents = _c[0], filtersJson = _c[1];
                var basicFilters = _this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(filterComponents);
                _this.sandbox.updateActionProperties({
                    filterValue: {
                        basicFilters: basicFilters,
                        filtersJson: filtersJson
                    }
                });
            });
            var filterValue$ = _this.sandbox.actionProperties$.pipe(operators.pluck('filterValue'), operators.distinctUntilChanged());
            // set filters data on filter select change
            filterValue$.pipe(operators.skip(1), operators.takeUntil(_this.sandbox.destroyed$)).subscribe(function (_b) {
                var filtersJson = _b.filtersJson, basicFilters = _b.basicFilters;
                var filterPayloads = _this.rxRecordGridDesignUtilsService.getGridFilterComponentPayloads(basicFilters);
                _this.sandbox.setChildren(filterPayloads);
                _this.sandbox.updateActionProperties({
                    filters: filtersJson
                });
            });
            var mode$ = _this.sandbox.actionProperties$.pipe(operators.pluck('mode'), operators.distinctUntilChanged());
            var targetApi$ = _this.sandbox.actionProperties$.pipe(operators.pluck('targetApi'), operators.distinctUntilChanged());
            var gridGuid$ = targetApi$.pipe(operators.map(RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression));
            // reset filters after grid change or when clear mode is selected
            rxjs.merge(gridGuid$.pipe(operators.skip(1)), mode$.pipe(operators.filter(function (mode) { return mode === i1.ApplyGridFilterMode.Clear; })))
                .pipe(operators.takeUntil(_this.sandbox.destroyed$))
                .subscribe(function () {
                _this.sandbox.updateActionProperties({
                    filterValue: {
                        basicFilters: null,
                        filtersJson: null
                    }
                });
            });
            var gridProperties$ = gridGuid$.pipe(operators.switchMap(function (guid) { return (guid ? _this.viewDesignerFacade.getComponent(guid) : rxjs.of(null)); }), operators.map(function (item) { return ((item === null || item === void 0 ? void 0 : item.type) === i2.RX_RECORD_GRID.type ? item.data : null); }));
            var recordDefinition$ = gridProperties$.pipe(operators.map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.recordDefinitionName) !== null && _a !== void 0 ? _a : null; }), operators.switchMap(function (recordDefinitionName) { return recordDefinitionName ? _this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName) : rxjs.of(null); }));
            var gridColumns$ = gridProperties$.pipe(operators.map(function (gridData) { var _a; return (_a = gridData === null || gridData === void 0 ? void 0 : gridData.columns) !== null && _a !== void 0 ? _a : []; }));
            var recordDefinitionFiltered$ = recordDefinition$.pipe(operators.withLatestFrom(gridColumns$), operators.map(function (_b) {
                var _c = __read(_b, 2), recordDefinition = _c[0], columns = _c[1];
                var fieldIds = columns.filter(function (col) { return col.filterable; }).map(function (col) { return col.fieldId; });
                return recordDefinition
                    ? Object.assign(Object.assign({}, recordDefinition), { fieldDefinitions: recordDefinition.fieldDefinitions.filter(function (definition) { return fieldIds.includes(String(definition.id)); }) }) : null;
            }));
            var namedFilterOptionsMap$ = gridColumns$.pipe(operators.map(function (columns) { return _this.rxRecordGridFilterSelectHelperService.getNamedFilterOptionsFromColumns(columns); }));
            rxjs.combineLatest([recordDefinitionFiltered$, mode$])
                .pipe(operators.withLatestFrom(namedFilterOptionsMap$, gridColumns$), operators.takeUntil(_this.sandbox.destroyed$))
                .subscribe(function (_b) {
                var _c = __read(_b, 3), _d = __read(_c[0], 2), recordDefinition = _d[0], mode = _d[1], namedFilterOptions = _c[1], columns = _c[2];
                _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig(recordDefinition, namedFilterOptions, mode, columns));
            });
            return _this;
        }
        RxApplyGridFilterViewActionDesignModelClass.getInitialProperties = function (initialProperties) {
            return Object.assign({ targetApi: null, mode: i1.ApplyGridFilterMode.Append, filterValue: {
                    filtersJson: null,
                    basicFilters: null
                } }, initialProperties);
        };
        RxApplyGridFilterViewActionDesignModelClass.prototype.getPropertiesByName = function () {
            return lodash.omit(_super.prototype.getPropertiesByName.call(this), 'filterValue');
        };
        RxApplyGridFilterViewActionDesignModelClass.prototype.getActionEditorConfig = function (recordDefinition, namedFilterOptions, mode, columns) {
            var tooltip = new i1$1.Tooltip('<b>Begin</b><p>Begin a batch of filter updates.</p><br><b>Append</b><p>Applied filters are added with the AND operator; existing filters for the specified fields are removed.</p><br><b>Remove</b><p>Existing filters are removed if they match the applied filters.</p><br><b>Overwrite</b><p>All existing filters are replaced with the applied filters.</p><br><b>Merge</b><p>Existing filters with a range of values are replaced with the matching applied filters; existing filters for the other fields are combined with the matching applied filters using the OR operator; applied filters for new fields are added with the AND operator.</p><br><b>Clear</b><p>All existing filters are removed.</p><br><b>End</b><p>Apply all pending filter updates executed in a batch.</p>');
            tooltip.maxWidth = 310;
            var controls = [
                {
                    name: 'targetApi',
                    component: components.ExpressionFormControlComponent,
                    options: {
                        label: 'Record grid',
                        dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                        operators: this.expressionConfigurator.getOperators(),
                        isRequired: true
                    }
                },
                {
                    name: 'mode',
                    component: components.RadioFormControlComponent,
                    options: {
                        label: 'Mode',
                        tooltip: tooltip,
                        items: [
                            { label: 'Begin', value: i1.ApplyGridFilterMode.Begin },
                            { label: 'Append', value: i1.ApplyGridFilterMode.Append },
                            { label: 'Remove', value: i1.ApplyGridFilterMode.Remove },
                            { label: 'Overwrite', value: i1.ApplyGridFilterMode.Overwrite },
                            { label: 'Merge', value: i1.ApplyGridFilterMode.Merge },
                            { label: 'Clear', value: i1.ApplyGridFilterMode.Clear },
                            { label: 'End', value: i1.ApplyGridFilterMode.End }
                        ]
                    }
                }
            ];
            var filterSelectControl = {
                name: 'filterValue',
                component: i2.RecordGridFilterSelectControlComponent,
                options: {
                    primaryRecordDefinition: recordDefinition,
                    selectedFieldIds: columns.map(function (column) { return column.fieldId; }),
                    namedFilterOptions: namedFilterOptions,
                    anchorDisabled: !recordDefinition
                }
            };
            var emptyFilterMessageControl = {
                name: 'emptyFilterMessage',
                component: components.ValidationFormControlComponent,
                options: {
                    text: 'Record grid expression required to define a filter.',
                    messageType: components.MessageType.Error,
                    customStyle: { 'margin-top': '-1rem' }
                }
            };
            if (!lodash.includes([i1.ApplyGridFilterMode.Begin, i1.ApplyGridFilterMode.End, i1.ApplyGridFilterMode.Clear], mode)) {
                controls.push(filterSelectControl);
                if (!recordDefinition) {
                    controls.push(emptyFilterMessageControl);
                }
            }
            return controls;
        };
        RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression = function (val) {
            var _a;
            var matches = val === null || val === void 0 ? void 0 : val.match(/^\${view\.components\.([0-9a-z-]+)\.api}$/);
            return (_a = (matches && matches[1])) !== null && _a !== void 0 ? _a : null;
        };
        return RxApplyGridFilterViewActionDesignModelClass;
    }(i3.RxViewDesignerActionModel));

    var RxApplyGridFilterActionName = 'rxApplyGridFilterAction';

    var RxApplyGridFilterViewActionService = /** @class */ (function () {
        function RxApplyGridFilterViewActionService() {
        }
        RxApplyGridFilterViewActionService.prototype.execute = function (params) {
            if (params.targetApi) {
                if (params.targetApi.applyFilters) {
                    params.targetApi.applyFilters(params.filters, params.mode);
                    return rxjs.EMPTY;
                }
                else {
                    rxjs.throwError(new i1$2.RxError(RxApplyGridFilterActionName + ": target component does not support applyFilters API."));
                }
                return rxjs.EMPTY;
            }
            else {
                return rxjs.throwError(new i1$2.RxError('rxApplyGridFilterAction: component is not specified.'));
            }
        };
        return RxApplyGridFilterViewActionService;
    }());
    RxApplyGridFilterViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplyGridFilterViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxApplyGridFilterViewActionDefinitionAdapterService = /** @class */ (function () {
        function RxApplyGridFilterViewActionDefinitionAdapterService(rxJsonParserService, rxRecordGridFilterHelperService) {
            this.rxJsonParserService = rxJsonParserService;
            this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        }
        RxApplyGridFilterViewActionDefinitionAdapterService.prototype.adaptDefinition = function (_a) {
            var _this = this;
            var componentDefinitions = _a.componentDefinitions, propertiesByName = _a.propertiesByName;
            var recordGridFilters = componentDefinitions.map(function (definition) {
                var value = definition.propertiesByName.value;
                var parsedValue = _this.rxJsonParserService.tryParseJson(value);
                if (parsedValue && parsedValue[i1.RecordGridNamedFilterOptionKey]) {
                    value = parsedValue;
                }
                return {
                    guid: definition.guid,
                    fieldId: definition.propertiesByName.fieldId,
                    value: value
                };
            });
            // @ts-ignore - converting type
            propertiesByName.filters = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(propertiesByName.filters, recordGridFilters);
        };
        return RxApplyGridFilterViewActionDefinitionAdapterService;
    }());
    RxApplyGridFilterViewActionDefinitionAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionDefinitionAdapterService, deps: [{ token: i1__namespace.RxJsonParserService }, { token: i2__namespace.RxRecordGridFilterHelperService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplyGridFilterViewActionDefinitionAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionDefinitionAdapterService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionDefinitionAdapterService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxJsonParserService }, { type: i2__namespace.RxRecordGridFilterHelperService }]; } });

    var ApplyGridFilterViewActionModule = /** @class */ (function () {
        function ApplyGridFilterViewActionModule(rxViewActionRegistryService, rxApplyGridFilterViewActionService, rxApplyGridFilterViewActionDefinitionAdapterService, rxViewActionDefinitionAdapterRegistryService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxApplyGridFilterViewActionService = rxApplyGridFilterViewActionService;
            this.rxApplyGridFilterViewActionDefinitionAdapterService = rxApplyGridFilterViewActionDefinitionAdapterService;
            this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
            this.rxViewActionRegistryService.register({
                name: RxApplyGridFilterActionName,
                label: 'Apply grid filter',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: rxApplyGridFilterViewActionService,
                designModel: RxApplyGridFilterViewActionDesignModelClass,
                parameters: [
                    {
                        name: 'targetApi',
                        label: 'Record grid',
                        isRequired: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'mode',
                        label: 'Mode'
                    },
                    {
                        name: 'filters'
                    }
                ]
            });
            rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter(RxApplyGridFilterActionName, this.rxApplyGridFilterViewActionDefinitionAdapterService);
        }
        return ApplyGridFilterViewActionModule;
    }());
    ApplyGridFilterViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxApplyGridFilterViewActionService }, { token: RxApplyGridFilterViewActionDefinitionAdapterService }, { token: i1__namespace$1.RxViewActionDefinitionAdapterRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ApplyGridFilterViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionModule });
    ApplyGridFilterViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxApplyGridFilterViewActionService }, { type: RxApplyGridFilterViewActionDefinitionAdapterService }, { type: i1__namespace$1.RxViewActionDefinitionAdapterRegistryService }]; } });

    var RX_OPEN_VIEW = {
        actionName: 'rxOpenViewAction',
        modalSize: i1.OpenViewActionModalSize,
        type: i1.OpenViewActionType,
        launchBehavior: i1.OpenViewActionLaunchBehavior
    };

    var RX_OPEN_VIEW_MODAL_SIZE_OPTIONS = [
        {
            id: i1.OpenViewActionModalSize.Xsmall,
            name: 'Extra Small (450 px)'
        },
        {
            id: i1.OpenViewActionModalSize.Small,
            name: 'Small (650 px)'
        },
        {
            id: i1.OpenViewActionModalSize.Medium,
            name: 'Medium (800 px)'
        },
        {
            id: i1.OpenViewActionModalSize.Large,
            name: 'Large (1024 px)'
        },
        {
            id: i1.OpenViewActionModalSize.Xlarge,
            name: 'Extra Large (1200 px)'
        },
        {
            id: i1.OpenViewActionModalSize.Xxlarge,
            name: 'Extra Extra Large (1600 px)'
        },
        {
            id: i1.OpenViewActionModalSize.FullSize,
            name: 'Full Size'
        }
    ];
    var RX_OPEN_VIEW_TYPE_OPTIONS = [
        {
            id: i1.OpenViewActionType.FullWidth,
            name: 'Full width'
        },
        {
            id: i1.OpenViewActionType.CenteredModal,
            name: 'Centered modal'
        },
        {
            id: i1.OpenViewActionType.DockedLeftModal,
            name: 'Docked left modal'
        },
        {
            id: i1.OpenViewActionType.DockedRightModal,
            name: 'Docked right modal'
        }
    ];
    var RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS = [
        {
            id: i1.OpenViewActionLaunchBehavior.NewWindow,
            name: 'Open in a new tab'
        },
        {
            id: i1.OpenViewActionLaunchBehavior.SameWindow,
            name: 'Open in the same tab'
        }
    ];

    var RxOpenViewModelHelperService = /** @class */ (function () {
        function RxOpenViewModelHelperService() {
        }
        RxOpenViewModelHelperService.prototype.getOpenViewInspector = function (inputParams, presentationType, presentationModalSize, expressionConfigurator) {
            var viewInputControls = inputParams.map(function (param) { return ({
                name: "viewParams." + param.name,
                component: components.ExpressionFormControlComponent,
                options: {
                    label: param.name,
                    dataDictionary$: expressionConfigurator.getDataDictionary(param.name),
                    operators: expressionConfigurator.getOperators(param.name)
                }
            }); });
            var isFullWidthType = presentationType === i1.OpenViewActionType.FullWidth;
            var isCenteredModalWithFullSize = presentationType === i1.OpenViewActionType.CenteredModal &&
                presentationModalSize === i1.OpenViewActionModalSize.FullSize;
            return __spreadArray(__spreadArray(__spreadArray([
                {
                    name: 'viewDefinitionName',
                    component: components.RxDefinitionPickerComponent,
                    options: {
                        label: 'View',
                        required: true,
                        definitionType: components.RxDefinitionPickerType.View
                    }
                }
            ], __read(viewInputControls)), [
                {
                    name: 'presentation.type',
                    component: components.SelectFormControlComponent,
                    options: {
                        label: 'Presentation',
                        tooltip: new i1$1.Tooltip('Select how to display the view in the application.'),
                        options: RX_OPEN_VIEW_TYPE_OPTIONS,
                        sortAlphabetically: false
                    }
                }
            ]), __read((isFullWidthType
                ? [
                    {
                        name: 'presentation.launchBehavior',
                        component: components.SelectFormControlComponent,
                        options: {
                            label: 'Launch behavior',
                            options: RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS,
                            sortAlphabetically: true
                        }
                    }
                ]
                : __spreadArray([
                    {
                        name: 'presentation.modalSize',
                        component: components.SelectFormControlComponent,
                        options: {
                            label: 'Size',
                            options: presentationType === i1.OpenViewActionType.CenteredModal
                                ? RX_OPEN_VIEW_MODAL_SIZE_OPTIONS
                                : RX_OPEN_VIEW_MODAL_SIZE_OPTIONS.filter(function (option) { return option.id !== i1.OpenViewActionModalSize.FullSize; }),
                            sortAlphabetically: false
                        }
                    }
                ], __read((isCenteredModalWithFullSize
                    ? []
                    : [
                        {
                            name: 'presentation.title',
                            component: components.TextFormControlComponent,
                            options: {
                                label: 'Title'
                            }
                        }
                    ]))))));
        };
        return RxOpenViewModelHelperService;
    }());
    RxOpenViewModelHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewModelHelperService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxOpenViewModelHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewModelHelperService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewModelHelperService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxOpenViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxOpenViewActionDesignModel, _super);
        function RxOpenViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.sandbox = sandbox;
            _this.rxViewDefinitionCacheService = _this.injector.get(i1.RxViewDefinitionCacheService);
            _this.rxOpenViewModelHelperService = _this.injector.get(RxOpenViewModelHelperService);
            var viewDefinitionName$ = _this.sandbox.actionProperties$.pipe(operators.pluck('viewDefinitionName'), operators.distinctUntilChanged());
            var presentationType$ = _this.sandbox.actionProperties$.pipe(operators.pluck('presentation.type'), operators.distinctUntilChanged());
            var presentationModalSize$ = _this.sandbox.actionProperties$.pipe(operators.pluck('presentation.modalSize'), operators.distinctUntilChanged());
            rxjs.combineLatest([viewDefinitionName$, presentationType$, presentationModalSize$])
                .pipe(operators.switchMap(function (_a) {
                var _b = __read(_a, 3), viewDefinitionName = _b[0], presentationType = _b[1], presentationModalSize = _b[2];
                return _this.getActionEditorConfig(viewDefinitionName, presentationType, presentationModalSize);
            }))
                .subscribe(function (config) { return _this.sandbox.setActionPropertyEditorConfig(config); });
            viewDefinitionName$
                .pipe(operators.switchMap(function (viewDefinitionName) { return _this.getViewOutputParams(viewDefinitionName); }))
                .subscribe(function (outputParams) {
                _this.sandbox.setActionOutputDataDictionary(outputParams.map(function (_a) {
                    var name = _a.name;
                    return ({
                        label: name,
                        expression: _this.getOutputExpressionForPropertyPath(name)
                    });
                }));
            });
            presentationType$.pipe(operators.skip(1)).subscribe(function (presentationType) {
                var props = _this.sandbox.getActionProperties();
                if (presentationType === i1.OpenViewActionType.FullWidth) {
                    props['presentation.launchBehavior'] = i1.OpenViewActionLaunchBehavior.SameWindow;
                    props = lodash.omit(props, ['presentation.modalSize', 'presentation.title']);
                }
                else {
                    props = lodash.omit(props, ['presentation.launchBehavior']);
                    if (!props['presentation.modalSize'] ||
                        _this.sandbox.getActionPropertyValue('presentation.modalSize') === i1.OpenViewActionModalSize.FullSize) {
                        props['presentation.modalSize'] = i1.OpenViewActionModalSize.Medium;
                    }
                }
                _this.sandbox.setActionProperties(props);
            });
            presentationModalSize$.pipe(operators.skip(1)).subscribe(function (presentationModalSize) {
                if (presentationModalSize === i1.OpenViewActionModalSize.FullSize) {
                    _this.sandbox.setActionProperties(lodash.omit(_this.sandbox.getActionProperties(), ['presentation.title']));
                }
            });
            return _this;
        }
        RxOpenViewActionDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ viewDefinitionName: null, 'presentation.type': i1.OpenViewActionType.FullWidth, 'presentation.launchBehavior': i1.OpenViewActionLaunchBehavior.SameWindow }, initialProperties);
        };
        RxOpenViewActionDesignModel.prototype.getActionEditorConfig = function (viewDefinitionName, presentationType, presentationModalSize) {
            var _this = this;
            return this.getViewInputParams(viewDefinitionName).pipe(operators.map(function (inputParams) { return _this.rxOpenViewModelHelperService.getOpenViewInspector(inputParams, presentationType, presentationModalSize, _this.expressionConfigurator); }));
        };
        RxOpenViewActionDesignModel.prototype.getViewInputParams = function (viewDefinitionName) {
            return viewDefinitionName
                ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(operators.pluck('inputParams'))
                : rxjs.of([]);
        };
        RxOpenViewActionDesignModel.prototype.getViewOutputParams = function (viewDefinitionName) {
            return viewDefinitionName
                ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(operators.pluck('outputParams'))
                : rxjs.of([]);
        };
        return RxOpenViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var RxOpenViewDefinitionAdapterService = /** @class */ (function () {
        function RxOpenViewDefinitionAdapterService() {
            this.modalSizeMap = {
                small: RX_OPEN_VIEW.modalSize.Small,
                medium: RX_OPEN_VIEW.modalSize.Medium,
                large: RX_OPEN_VIEW.modalSize.Large
            };
        }
        RxOpenViewDefinitionAdapterService.prototype.adaptDefinition = function (viewComponentDefinition) {
            var propertiesByName = lodash.get(viewComponentDefinition, 'propertiesByName', {});
            if (propertiesByName.name === RX_OPEN_VIEW.actionName) {
                var modalSize = propertiesByName.presentation.modalSize;
                if (this.modalSizeMap[modalSize]) {
                    propertiesByName.presentation.modalSize = this.modalSizeMap[modalSize];
                }
            }
        };
        return RxOpenViewDefinitionAdapterService;
    }());
    RxOpenViewDefinitionAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewDefinitionAdapterService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxOpenViewDefinitionAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewDefinitionAdapterService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewDefinitionAdapterService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxOpenViewActionService = /** @class */ (function () {
        function RxOpenViewActionService(adaptDockedPanelService, adaptModalService, router, rxRuntimeViewUtilsService, rxViewActionUtilsService) {
            this.adaptDockedPanelService = adaptDockedPanelService;
            this.adaptModalService = adaptModalService;
            this.router = router;
            this.rxRuntimeViewUtilsService = rxRuntimeViewUtilsService;
            this.rxViewActionUtilsService = rxViewActionUtilsService;
        }
        RxOpenViewActionService.prototype.execute = function (params) {
            var _this = this;
            var inputParams = lodash.transform(params.viewParams, function (result, value, key) {
                result[key] = lodash.isObject(value) ? JSON.stringify(value) : String(value !== null && value !== void 0 ? value : '');
            }, {});
            return this.rxRuntimeViewUtilsService.isViewCancellable(params.viewDefinitionName).pipe(operators.switchMap(function (isViewCancellable) {
                var runtimeViewApi;
                var modalData = {
                    configuration: {
                        viewDefinitionName: params.viewDefinitionName,
                        inputParams: inputParams,
                        onRegisterApi: function (api) {
                            runtimeViewApi = api;
                        }
                    },
                    title: params.presentation.title,
                    notification: params.presentation.notification,
                    isCancellable: isViewCancellable
                };
                var modalConfig = {
                    beforeDismiss: function (reason) {
                        // determine if the view is being closed programmatically,
                        // i.e. via executing the Close View action.
                        var isCloseViewAction = !Object.values(i1$3.DismissReasons).includes(reason);
                        // do not close modal/blade when user clicked on backdrop except when view is cancellable
                        if (!isCloseViewAction && (reason !== i1$3.DismissReasons.BACKDROP_CLICK || isViewCancellable)) {
                            runtimeViewApi
                                .cancel()
                                .pipe(operators.take(1), operators.catchError(function (error) { return (error ? rxjs.throwError(error) : rxjs.EMPTY); }))
                                .subscribe();
                        }
                        // only allow to close view if dismiss is triggered by close view action with act as cancel
                        return isCloseViewAction;
                    },
                    blockKeyboard: !isViewCancellable,
                    content: i3$1.RuntimeViewModalComponent,
                    size: params.presentation.modalSize,
                    data: modalData
                };
                switch (params.presentation.type) {
                    case RX_OPEN_VIEW.type.FullWidth: {
                        return _this.openFullWidth(params.presentation.launchBehavior, params.viewDefinitionName, inputParams);
                    }
                    case RX_OPEN_VIEW.type.CenteredModal: {
                        return _this.adaptModalService.open(modalConfig);
                    }
                    case RX_OPEN_VIEW.type.DockedLeftModal: {
                        return _this.adaptDockedPanelService.open(lodash.defaults({ direction: i1$3.DockedPanelDirection.LEFT }, modalConfig));
                    }
                    case RX_OPEN_VIEW.type.DockedRightModal: {
                        return _this.adaptDockedPanelService.open(lodash.defaults({ direction: i1$3.DockedPanelDirection.RIGHT }, modalConfig));
                    }
                    default: {
                        return _this.openFullWidth(params.presentation.launchBehavior, params.viewDefinitionName, inputParams);
                    }
                }
            }));
        };
        RxOpenViewActionService.prototype.openFullWidth = function (launchBehavior, viewDefinitionName, inputParams) {
            var url = this.rxViewActionUtilsService.generateViewUrl(viewDefinitionName, inputParams);
            if (launchBehavior === RX_OPEN_VIEW.launchBehavior.NewWindow) {
                window.open(window.location.pathname + "#" + url);
                return rxjs.throwError(null);
            }
            else {
                return rxjs.from(this.router.navigateByUrl(url)).pipe(operators.switchMapTo(rxjs.throwError(null)));
            }
        };
        return RxOpenViewActionService;
    }());
    RxOpenViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewActionService, deps: [{ token: i1__namespace$2.AdaptDockedPanelService }, { token: i1__namespace$2.AdaptModalService }, { token: i2__namespace$1.Router }, { token: i3__namespace.RxRuntimeViewUtilsService }, { token: i1__namespace$1.RxViewActionUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxOpenViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxOpenViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.AdaptDockedPanelService }, { type: i1__namespace$2.AdaptModalService }, { type: i2__namespace$1.Router }, { type: i3__namespace.RxRuntimeViewUtilsService }, { type: i1__namespace$1.RxViewActionUtilsService }]; } });

    var OpenViewActionModule = /** @class */ (function () {
        function OpenViewActionModule(rxViewActionDefinitionAdapterRegistryService, openViewDefinitionAdapterService, rxViewActionRegistryService, rxOpenViewActionService) {
            this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
            this.openViewDefinitionAdapterService = openViewDefinitionAdapterService;
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxOpenViewActionService = rxOpenViewActionService;
            this.rxViewActionRegistryService.register({
                name: RX_OPEN_VIEW.actionName,
                label: 'Open view',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxOpenViewActionService,
                designModel: RxOpenViewActionDesignModel,
                parameters: [
                    {
                        name: 'viewDefinitionName',
                        label: 'View',
                        isRequired: true
                    },
                    {
                        name: 'viewParams',
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'presentation',
                        attributes: [
                            {
                                name: 'title',
                                localizable: true
                            }
                        ]
                    }
                ]
            });
            rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter(RX_OPEN_VIEW.actionName, this.openViewDefinitionAdapterService);
        }
        return OpenViewActionModule;
    }());
    OpenViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OpenViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionDefinitionAdapterRegistryService }, { token: RxOpenViewDefinitionAdapterService }, { token: i1__namespace$1.RxViewActionRegistryService }, { token: RxOpenViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OpenViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OpenViewActionModule, imports: [i2$2.CommonModule, i3$1.RuntimeViewModule, i1$3.AdaptDockedPanelModule] });
    OpenViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OpenViewActionModule, imports: [[i2$2.CommonModule, i3$1.RuntimeViewModule, i1$3.AdaptDockedPanelModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: OpenViewActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2$2.CommonModule, i3$1.RuntimeViewModule, i1$3.AdaptDockedPanelModule]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionDefinitionAdapterRegistryService }, { type: RxOpenViewDefinitionAdapterService }, { type: i1__namespace$1.RxViewActionRegistryService }, { type: RxOpenViewActionService }]; } });

    var RxAssociateViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxAssociateViewActionDesignModel, _super);
        function RxAssociateViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.rxRecordDefinitionCacheService = _this.injector.get(i4.RxRecordDefinitionCacheService);
            _this.rxDefinitionNameService = _this.injector.get(i1$1.RxDefinitionNameService);
            _this.rxAssociationDefinitionService = _this.injector.get(i1$4.RxAssociationDefinitionService);
            var recordDefinitionName$ = _this.sandbox.actionProperties$.pipe(operators.pluck('recordDefinitionName'), operators.distinctUntilChanged());
            var associationDefinitionName$ = _this.sandbox.actionProperties$.pipe(operators.pluck('associationDefinitionName'), operators.distinctUntilChanged());
            var associationNameOptions$ = recordDefinitionName$.pipe(operators.switchMap(function (recordDefinitionName) { return recordDefinitionName
                ? _this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(operators.map(function (associationDefinitions) { return associationDefinitions[recordDefinitionName].map(function (recordDefinition) { return ({
                    id: recordDefinition.name,
                    name: _this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
                }); }); }))
                : rxjs.of([]); }));
            var associationDefinition$ = associationDefinitionName$.pipe(operators.switchMap(function (associationDefinitionName) { return associationDefinitionName ? _this.rxAssociationDefinitionService.get(associationDefinitionName) : rxjs.of(null); }), operators.shareReplay(1));
            var isSymmetricalAssociation$ = associationDefinition$.pipe(operators.map(function (association) { return (association ? association.nodeAId === association.nodeBId : false); }));
            var isManyToManyAssociation$ = associationDefinition$.pipe(operators.map(function (association) { return association ? association.cardinality === i1$4.RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value : false; }));
            var useDefaultRoles$ = _this.sandbox.actionProperties$.pipe(operators.pluck('useDefaultRoles'), operators.map(Boolean), operators.distinctUntilChanged());
            useDefaultRoles$.pipe(operators.distinctUntilChanged(), operators.skip(1)).subscribe(function (useDefaultRoles) {
                if (useDefaultRoles) {
                    _this.sandbox.setActionProperties(lodash.omit(_this.sandbox.getActionProperties(), ['nodeARole', 'nodeBRole']));
                }
            });
            var associationRoleOptions$ = associationDefinition$.pipe(operators.map(function (association) { return association
                ? [
                    {
                        id: i1$4.RxAssociatedRecordNodeSide.NodeA,
                        name: association.nodeAName || i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                    },
                    {
                        id: i1$4.RxAssociatedRecordNodeSide.NodeB,
                        name: association.nodeBName || i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                    }
                ]
                : []; }));
            // skip initial props set
            recordDefinitionName$.pipe(operators.skip(1)).subscribe(function () {
                _this.sandbox.updateActionProperties({
                    associationDefinitionName: null,
                    associationDefinitionRole: null
                });
            });
            associationDefinition$
                .pipe(
            // skip initial props set
            operators.skip(1), operators.withLatestFrom(isSymmetricalAssociation$, recordDefinitionName$))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), associationDefinition = _b[0], isSymmetricalAssociation = _b[1], recordDefinitionName = _b[2];
                if (associationDefinition && !isSymmetricalAssociation) {
                    var associationDefinitionRole = recordDefinitionName === associationDefinition.nodeAId
                        ? i1$4.RxAssociatedRecordNodeSide.NodeA
                        : i1$4.RxAssociatedRecordNodeSide.NodeB;
                    _this.sandbox.updateActionProperties({
                        associationDefinitionRole: associationDefinitionRole
                    });
                }
                else {
                    _this.sandbox.updateActionProperties({
                        associationDefinitionRole: null
                    });
                }
            });
            rxjs.combineLatest([recordDefinitionName$, associationNameOptions$, associationRoleOptions$, useDefaultRoles$])
                .pipe(operators.withLatestFrom(isSymmetricalAssociation$, isManyToManyAssociation$))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), _c = __read(_b[0], 4), recordDefinitionName = _c[0], associationNameOptions = _c[1], associationRoleOptions = _c[2], useDefaultRoles = _c[3], isSymmetricalAssociation = _b[1], isManyToManyAssociation = _b[2];
                _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation, isManyToManyAssociation, useDefaultRoles));
            });
            return _this;
        }
        RxAssociateViewActionDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ recordDefinitionName: null, associationDefinitionName: null, associationDefinitionRole: null, associatedRecordId: null, viewDefinitionName: null }, initialProperties);
        };
        RxAssociateViewActionDesignModel.prototype.getActionEditorConfig = function (recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation, isManyToManyAssociation, useDefaultRoles) {
            return __spreadArray([
                {
                    name: 'recordDefinitionName',
                    component: components.RxDefinitionPickerComponent,
                    options: {
                        label: 'Record definition to associate',
                        definitionType: components.RxDefinitionPickerType.StandardDataRecord,
                        required: true
                    }
                }
            ], __read((recordDefinitionName
                ? __spreadArray([
                    {
                        name: 'associationDefinitionName',
                        component: components.SelectFormControlComponent,
                        options: {
                            label: 'Association to use',
                            options: associationNameOptions,
                            required: true
                        }
                    },
                    {
                        name: 'associationDefinitionRole',
                        component: components.SelectFormControlComponent,
                        isDisabled: !isSymmetricalAssociation,
                        options: {
                            label: 'Associated record node side',
                            required: true,
                            options: associationRoleOptions
                        }
                    },
                    {
                        name: 'associatedRecordId',
                        component: components.ExpressionFormControlComponent,
                        options: {
                            label: 'Associated record ID',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    },
                    {
                        name: 'viewDefinitionName',
                        component: components.RxDefinitionPickerComponent,
                        options: {
                            label: 'View for selecting or creating associated records',
                            required: true,
                            definitionType: components.RxDefinitionPickerType.View
                        }
                    }
                ], __read((isManyToManyAssociation
                    ? __spreadArray([
                        {
                            name: 'useDefaultRoles',
                            component: components.SwitchFormControlComponent,
                            options: {
                                label: 'Use default roles'
                            }
                        }
                    ], __read((isManyToManyAssociation && useDefaultRoles
                        ? []
                        : [
                            {
                                name: 'nodeARole',
                                component: components.ExpressionFormControlComponent,
                                options: {
                                    label: 'First record role',
                                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                    operators: this.expressionConfigurator.getOperators()
                                }
                            },
                            {
                                name: 'nodeBRole',
                                component: components.ExpressionFormControlComponent,
                                options: {
                                    label: 'Second record role',
                                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                    operators: this.expressionConfigurator.getOperators()
                                }
                            }
                        ]))) : []))) : [])));
        };
        return RxAssociateViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var RxAssociateViewActionService = /** @class */ (function () {
        function RxAssociateViewActionService(rxAssociationInstanceService, rxOpenViewActionService, rxAssociationDefinitionService, rxLogService, rxViewActionUtilsService) {
            this.rxAssociationInstanceService = rxAssociationInstanceService;
            this.rxOpenViewActionService = rxOpenViewActionService;
            this.rxAssociationDefinitionService = rxAssociationDefinitionService;
            this.rxLogService = rxLogService;
            this.rxViewActionUtilsService = rxViewActionUtilsService;
        }
        RxAssociateViewActionService.prototype.execute = function (params) {
            var _this = this;
            if (!params.associatedRecordId) {
                return rxjs.throwError(new i1$2.RxError('rxAssociateAction: Associated Record ID is not defined.'));
            }
            return rxjs.forkJoin([
                this.getInstanceIds(params),
                this.rxAssociationDefinitionService.get(params.associationDefinitionName)
            ]).pipe(operators.switchMap(function (_a) {
                var _b = __read(_a, 2), instanceIds = _b[0], associationDefinition = _b[1];
                var nodeAIds = [];
                var nodeBIds = [];
                if (instanceIds.length) {
                    if (params.associationDefinitionRole === i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value) {
                        nodeAIds = instanceIds;
                        nodeBIds = [params.associatedRecordId];
                    }
                    else if (params.associationDefinitionRole === i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                        nodeAIds = [params.associatedRecordId];
                        nodeBIds = instanceIds;
                    }
                    if (associationDefinition.cardinality === i1$4.RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value) {
                        nodeAIds = nodeAIds[0];
                        nodeBIds = nodeBIds[0];
                    }
                    else if (associationDefinition.cardinality === i1$4.RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value) {
                        nodeAIds = nodeAIds[0];
                    }
                    return _this.rxAssociationInstanceService
                        .associateRecords(params.associationDefinitionName, nodeAIds, nodeBIds, params.useDefaultRoles, params.nodeARole, params.nodeBRole)
                        .pipe(operators.mapTo(instanceIds));
                }
                return rxjs.of(instanceIds);
            }));
        };
        RxAssociateViewActionService.prototype.getInstanceIds = function (params) {
            var _this = this;
            return this.rxOpenViewActionService
                .execute({
                presentation: {
                    modalSize: RX_OPEN_VIEW.modalSize.Large,
                    type: RX_OPEN_VIEW.type.DockedRightModal
                },
                viewDefinitionName: params.viewDefinitionName,
                viewParams: null
            })
                .pipe(operators.map(function (output) {
                var instanceIds = lodash.flow(function (outs) { return lodash.map(outs, function (out) { return _this.rxViewActionUtilsService.extractRecordIds(out); }); }, lodash.flatten, lodash.compact, lodash.uniq)(output);
                _this.rxLogService.debug("RxAssociateAction: associating " + instanceIds.length + " record(s)");
                return instanceIds;
            }));
        };
        return RxAssociateViewActionService;
    }());
    RxAssociateViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociateViewActionService, deps: [{ token: i1__namespace$3.RxAssociationInstanceService }, { token: RxOpenViewActionService }, { token: i1__namespace$3.RxAssociationDefinitionService }, { token: i1__namespace$4.RxLogService }, { token: i1__namespace$1.RxViewActionUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAssociateViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociateViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAssociateViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.RxAssociationInstanceService }, { type: RxOpenViewActionService }, { type: i1__namespace$3.RxAssociationDefinitionService }, { type: i1__namespace$4.RxLogService }, { type: i1__namespace$1.RxViewActionUtilsService }]; } });

    var AssociateViewActionModule = /** @class */ (function () {
        function AssociateViewActionModule(rxViewActionRegistryService, rxAssociateViewActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxAssociateViewActionService = rxAssociateViewActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxAssociateAction',
                label: 'Associate records',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxAssociateViewActionService,
                designModel: RxAssociateViewActionDesignModel,
                parameters: [
                    {
                        name: 'recordDefinitionName',
                        label: 'Record definition to associate',
                        isRequired: true,
                        type: i1.ViewComponentPropertyType.String
                    },
                    {
                        name: 'associationDefinitionName',
                        label: 'Association to use',
                        isRequired: true
                    },
                    {
                        name: 'associationDefinitionRole',
                        label: 'Associated record node side',
                        isRequired: true
                    },
                    {
                        name: 'associatedRecordId',
                        label: 'Associated record ID',
                        enableExpressionEvaluation: true,
                        isRequired: true
                    },
                    {
                        name: 'viewDefinitionName',
                        label: 'View for selecting or creating associated records',
                        isRequired: true,
                        type: i1.ViewComponentPropertyType.String
                    },
                    {
                        name: 'useDefaultRoles'
                    },
                    {
                        name: 'nodeARole',
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'nodeBRole',
                        enableExpressionEvaluation: true
                    }
                ]
            });
        }
        return AssociateViewActionModule;
    }());
    AssociateViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociateViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxAssociateViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AssociateViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociateViewActionModule, imports: [OpenViewActionModule] });
    AssociateViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociateViewActionModule, imports: [[OpenViewActionModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AssociateViewActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [OpenViewActionModule]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxAssociateViewActionService }]; } });

    var RxAvcAssociateActionService = /** @class */ (function () {
        function RxAvcAssociateActionService(rxGuidService, rxOpenViewActionService, rxStringService, rxRecordInstanceUtilsService) {
            this.rxGuidService = rxGuidService;
            this.rxOpenViewActionService = rxOpenViewActionService;
            this.rxStringService = rxStringService;
            this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        }
        RxAvcAssociateActionService.prototype.execute = function (params) {
            var _this = this;
            return this.rxOpenViewActionService
                .execute({
                viewDefinitionName: params.viewDefinitionName,
                viewParams: null,
                presentation: {
                    modalSize: i1.OpenViewActionModalSize.Large,
                    type: i1.OpenViewActionType.DockedRightModal
                }
            })
                .pipe(operators.tap(function (output) {
                var recordInstances = lodash.flow(function (outputs) { return lodash.map(outputs, function (outputsItem) { return _this.extractRecordInstance(outputsItem); }); }, lodash.flatten, lodash.compact, lodash.uniq)(output);
                params.associationViewComponent.associate(recordInstances);
            }), operators.switchMapTo(rxjs.EMPTY));
        };
        RxAvcAssociateActionService.prototype.extractRecordInstance = function (source) {
            var recordInstanceFields = [];
            // for record grid
            if (lodash.isFunction(source.getSelectedRows)) {
                recordInstanceFields = lodash.map(source.getSelectedRows(), this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance);
                // for record grid row
            }
            else if (lodash.isObject(source) && this.rxStringService.isNonEmptyString(source[i1.RowDataItemIdFieldName])) {
                recordInstanceFields.push(this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(source));
                // for selected rows
            }
            else if (lodash.isArray(source) && lodash.some(source, lodash.isObject)) {
                recordInstanceFields = lodash.map(source, this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance);
                // for existing record instance
            }
            else if (lodash.isObject(source) && lodash.isObject(source.fieldInstances) && source.id) {
                recordInstanceFields.push(source);
                // for new record instance
            }
            else if (lodash.isObject(source) && lodash.isObject(source.fieldInstances) && !source.id) {
                var dummyId = this.rxGuidService.generate();
                source.id = dummyId;
                source.fieldInstances[i4.RX_RECORD_DEFINITION.coreFieldIds.id].value = dummyId;
                source.isNewInstance = true;
                recordInstanceFields.push(source);
            }
            return recordInstanceFields;
        };
        return RxAvcAssociateActionService;
    }());
    RxAvcAssociateActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAvcAssociateActionService, deps: [{ token: i1__namespace.RxGuidService }, { token: RxOpenViewActionService }, { token: i1__namespace.RxStringService }, { token: i4__namespace.RxRecordInstanceUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxAvcAssociateActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAvcAssociateActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxAvcAssociateActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxGuidService }, { type: RxOpenViewActionService }, { type: i1__namespace.RxStringService }, { type: i4__namespace.RxRecordInstanceUtilsService }]; } });

    var AvcAssociateActionModule = /** @class */ (function () {
        function AvcAssociateActionModule(rxViewActionRegistryService, rxAvcAssociateActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxAvcAssociateActionService = rxAvcAssociateActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxAvcAssociate',
                label: 'Avc associate',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                hidden: true,
                service: this.rxAvcAssociateActionService,
                parameters: [
                    {
                        name: 'viewDefinitionName'
                    },
                    {
                        name: 'associationViewComponent',
                        enableExpressionEvaluation: true
                    }
                ]
            });
        }
        return AvcAssociateActionModule;
    }());
    AvcAssociateActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AvcAssociateActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxAvcAssociateActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AvcAssociateActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AvcAssociateActionModule, imports: [i2$2.CommonModule] });
    AvcAssociateActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AvcAssociateActionModule, imports: [[i2$2.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: AvcAssociateActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2$2.CommonModule]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxAvcAssociateActionService }]; } });

    var RxCloseViewActionService = /** @class */ (function () {
        function RxCloseViewActionService() {
        }
        RxCloseViewActionService.prototype.execute = function (params) {
            return params.actAsCancel
                ? params.viewApi.cancel()
                : rxjs.EMPTY.pipe(operators.tap({
                    complete: function () {
                        params.viewApi.close();
                    }
                }));
        };
        return RxCloseViewActionService;
    }());
    RxCloseViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCloseViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCloseViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCloseViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCloseViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var CloseViewActionModule = /** @class */ (function () {
        function CloseViewActionModule(rxViewActionRegistryService, rxCloseViewActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxCloseViewActionService = rxCloseViewActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxCloseViewAction',
                label: 'Close view',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxCloseViewActionService,
                parameters: [
                    {
                        name: 'viewApi',
                        enableExpressionEvaluation: true,
                        defaultValue: '${view.api}'
                    },
                    {
                        name: 'actAsCancel',
                        label: 'Act as cancel',
                        editor: components.SwitchFormControlComponent,
                        type: i1.ViewComponentPropertyType.Boolean,
                        designType: i1.ViewComponentPropertyType.Boolean
                    }
                ]
            });
        }
        return CloseViewActionModule;
    }());
    CloseViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CloseViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxCloseViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CloseViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CloseViewActionModule });
    CloseViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CloseViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: CloseViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxCloseViewActionService }]; } });

    var RxDeleteRecordsViewActionService = /** @class */ (function () {
        function RxDeleteRecordsViewActionService(rxLogService, rxModalService, translateService, rxNotificationService, rxRecordInstanceService, rxViewActionUtilsService, rxStringService) {
            this.rxLogService = rxLogService;
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.rxNotificationService = rxNotificationService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxViewActionUtilsService = rxViewActionUtilsService;
            this.rxStringService = rxStringService;
        }
        RxDeleteRecordsViewActionService.prototype.execute = function (params) {
            var _this = this;
            if (lodash.isEmpty(params.recordDefinitionName) &&
                params.records &&
                lodash.isFunction(params.records.getRecordDefinitionName)) {
                params.recordDefinitionName = params.records.getRecordDefinitionName();
            }
            if (this.rxStringService.isNonEmptyString(params.recordDefinitionName)) {
                var records = [];
                if (params.records) {
                    if (lodash.isFunction(params.records.getSelectedRows)) {
                        records = lodash.castArray(params.records.getSelectedRows());
                    }
                    else {
                        records = lodash.castArray(params.records);
                    }
                }
                var recordIds_1 = this.rxViewActionUtilsService.extractRecordIds(records);
                if (recordIds_1.length) {
                    var message = recordIds_1.length === 1
                        ? 'com.bmc.arsys.rx.client.view-actions.delete-record.confirmation-dialog.message'
                        : 'com.bmc.arsys.rx.client.view-actions.delete-records.confirmation-dialog.message';
                    return rxjs.from(this.rxModalService.confirm({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                        modalStyle: i2$3.RX_MODAL.modalStyles.warning,
                        message: this.translateService.instant(message, { count: recordIds_1.length })
                    })).pipe(operators.switchMap(function (res) {
                        if (res) {
                            var deleteObservables = recordIds_1.map(function (recordId) { return _this.rxRecordInstanceService.delete(params.recordDefinitionName, recordId); });
                            return rxjs.forkJoin(deleteObservables).pipe(operators.tap(function () {
                                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.view-actions.delete-records.records-deleted.message'));
                            }), operators.switchMapTo(lodash.isFunction(params.records.refresh)
                                ? params.records.refresh()
                                : rxjs.EMPTY));
                        }
                        else {
                            return rxjs.throwError(null);
                        }
                    }));
                }
                else {
                    this.rxLogService.debug('rxDeleteRecordsAction: no records to delete.');
                    return rxjs.EMPTY;
                }
            }
            else {
                return rxjs.throwError(new i1$2.RxError('rxDeleteRecordsAction: Record Definition Name is not defined.'));
            }
        };
        return RxDeleteRecordsViewActionService;
    }());
    RxDeleteRecordsViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDeleteRecordsViewActionService, deps: [{ token: i1__namespace$4.RxLogService }, { token: i2__namespace$2.RxModalService }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$4.RxNotificationService }, { token: i4__namespace.RxRecordInstanceService }, { token: i1__namespace$1.RxViewActionUtilsService }, { token: i1__namespace.RxStringService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDeleteRecordsViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDeleteRecordsViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDeleteRecordsViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$4.RxLogService }, { type: i2__namespace$2.RxModalService }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$4.RxNotificationService }, { type: i4__namespace.RxRecordInstanceService }, { type: i1__namespace$1.RxViewActionUtilsService }, { type: i1__namespace.RxStringService }]; } });

    var DeleteRecordsViewActionModule = /** @class */ (function () {
        function DeleteRecordsViewActionModule(rxViewActionRegistryService, rxDeleteRecordsViewActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxDeleteRecordsViewActionService = rxDeleteRecordsViewActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxDeleteRecordsAction',
                label: 'Delete records',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxDeleteRecordsViewActionService,
                parameters: [
                    {
                        name: 'records',
                        label: 'Records',
                        enableExpressionEvaluation: true,
                        isRequired: true,
                        editor: components.ExpressionFormControlComponent,
                        tooltip: new i1$1.Tooltip("Build an expression that evaluates to one of the following:<br>\n            1) Record grid<br>\n            2) A collection of record instances or<br>\n            3) A collection of record instance IDs. <br>For options 2 and 3, select a record definition in the field below.")
                    },
                    {
                        name: 'recordDefinitionName',
                        label: 'Record definition',
                        type: i1.ViewComponentPropertyType.String,
                        editor: components.RxDefinitionPickerComponent,
                        editorOptions: {
                            definitionType: components.RxDefinitionPickerType.StandardDataRecord
                        },
                        defaultValue: null
                    }
                ]
            });
        }
        return DeleteRecordsViewActionModule;
    }());
    DeleteRecordsViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DeleteRecordsViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxDeleteRecordsViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DeleteRecordsViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DeleteRecordsViewActionModule });
    DeleteRecordsViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DeleteRecordsViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DeleteRecordsViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxDeleteRecordsViewActionService }]; } });

    var RxDisassociateViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxDisassociateViewActionDesignModel, _super);
        function RxDisassociateViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.rxRecordDefinitionCacheService = _this.injector.get(i4.RxRecordDefinitionCacheService);
            _this.rxDefinitionNameService = _this.injector.get(i1$1.RxDefinitionNameService);
            _this.rxAssociationDefinitionService = _this.injector.get(i1$4.RxAssociationDefinitionService);
            var recordDefinitionName$ = _this.sandbox.actionProperties$.pipe(operators.pluck('recordDefinitionName'), operators.distinctUntilChanged());
            var associationDefinitionName$ = _this.sandbox.actionProperties$.pipe(operators.pluck('associationDefinitionName'), operators.distinctUntilChanged());
            var associationNameOptions$ = recordDefinitionName$.pipe(operators.switchMap(function (recordDefinitionName) { return recordDefinitionName
                ? _this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(operators.map(function (associationDefinitions) { return associationDefinitions[recordDefinitionName].map(function (recordDefinition) { return ({
                    id: recordDefinition.name,
                    name: _this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
                }); }); }))
                : rxjs.of([]); }));
            var associationDefinition$ = associationDefinitionName$.pipe(operators.switchMap(function (associationDefinitionName) { return associationDefinitionName ? _this.rxAssociationDefinitionService.get(associationDefinitionName) : rxjs.of(null); }), operators.shareReplay(1));
            var isSymmetricalAssociation$ = associationDefinition$.pipe(operators.map(function (association) { return (association ? association.nodeAId === association.nodeBId : false); }));
            var associationRoleOptions$ = associationDefinition$.pipe(operators.map(function (association) { return association
                ? [
                    {
                        id: i1$4.RxAssociatedRecordNodeSide.NodeA,
                        name: association.nodeAName || i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                    },
                    {
                        id: i1$4.RxAssociatedRecordNodeSide.NodeB,
                        name: association.nodeBName || i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                    }
                ]
                : []; }));
            // skip initial props set
            recordDefinitionName$.pipe(operators.skip(1)).subscribe(function () {
                _this.sandbox.updateActionProperties({
                    associationDefinitionName: null,
                    associationDefinitionRole: null
                });
            });
            associationDefinition$
                .pipe(
            // skip initial props set
            operators.skip(1), operators.withLatestFrom(isSymmetricalAssociation$, recordDefinitionName$))
                .subscribe(function (_a) {
                var _b = __read(_a, 3), associationDefinition = _b[0], isSymmetricalAssociation = _b[1], recordDefinitionName = _b[2];
                if (associationDefinition && !isSymmetricalAssociation) {
                    var associationDefinitionRole = recordDefinitionName === associationDefinition.nodeAId
                        ? i1$4.RxAssociatedRecordNodeSide.NodeA
                        : i1$4.RxAssociatedRecordNodeSide.NodeB;
                    _this.sandbox.updateActionProperties({
                        associationDefinitionRole: associationDefinitionRole
                    });
                }
                else {
                    _this.sandbox.updateActionProperties({
                        associationDefinitionRole: null
                    });
                }
            });
            rxjs.combineLatest([recordDefinitionName$, associationNameOptions$, associationRoleOptions$])
                .pipe(operators.withLatestFrom(isSymmetricalAssociation$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _c = __read(_b[0], 3), recordDefinitionName = _c[0], associationNameOptions = _c[1], associationRoleOptions = _c[2], isSymmetricalAssociation = _b[1];
                _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation));
            });
            return _this;
        }
        RxDisassociateViewActionDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ recordDefinitionName: null, associationDefinitionName: null, associationDefinitionRole: null, associatedRecordId: null, disassociatedRecordIds: null }, initialProperties);
        };
        RxDisassociateViewActionDesignModel.prototype.getActionEditorConfig = function (recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation) {
            return __spreadArray([
                {
                    name: 'recordDefinitionName',
                    component: components.RxDefinitionPickerComponent,
                    options: {
                        label: 'Record definition to disassociate',
                        definitionType: components.RxDefinitionPickerType.StandardDataRecord,
                        required: true
                    }
                }
            ], __read((recordDefinitionName
                ? [
                    {
                        name: 'associationDefinitionName',
                        component: components.SelectFormControlComponent,
                        options: {
                            label: 'Association to use',
                            options: associationNameOptions,
                            required: true
                        }
                    },
                    {
                        name: 'associationDefinitionRole',
                        component: components.SelectFormControlComponent,
                        isDisabled: !isSymmetricalAssociation,
                        options: {
                            label: 'Associated record node side',
                            required: true,
                            options: associationRoleOptions
                        }
                    },
                    {
                        name: 'associatedRecordId',
                        component: components.ExpressionFormControlComponent,
                        options: {
                            label: 'Associated record ID',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    },
                    {
                        name: 'disassociatedRecordIds',
                        component: components.ExpressionFormControlComponent,
                        options: {
                            label: 'Records to disassociate',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    }
                ]
                : [])));
        };
        return RxDisassociateViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var RxDisassociateViewActionService = /** @class */ (function () {
        function RxDisassociateViewActionService(rxLogService, rxViewActionUtilsService, rxAssociationDefinitionService, rxAssociationInstanceService) {
            this.rxLogService = rxLogService;
            this.rxViewActionUtilsService = rxViewActionUtilsService;
            this.rxAssociationDefinitionService = rxAssociationDefinitionService;
            this.rxAssociationInstanceService = rxAssociationInstanceService;
        }
        RxDisassociateViewActionService.prototype.execute = function (params) {
            var _this = this;
            if (!params.associatedRecordId) {
                return rxjs.throwError(new i1$2.RxError('rxDisassociateAction: Associated Record ID is not defined.'));
            }
            var instanceIds = this.rxViewActionUtilsService.extractRecordIds(params.disassociatedRecordIds);
            this.rxLogService.debug("RxDisassociateAction: disassociating " + instanceIds.length + " record(s)");
            if (instanceIds.length) {
                return this.rxAssociationDefinitionService.get(params.associationDefinitionName).pipe(operators.switchMap(function () {
                    var nodeAIds, nodeBIds = [];
                    if (params.associationDefinitionRole === i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value) {
                        nodeAIds = instanceIds;
                        nodeBIds = [params.associatedRecordId];
                    }
                    else if (params.associationDefinitionRole === i1$4.RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                        nodeAIds = [params.associatedRecordId];
                        nodeBIds = instanceIds;
                    }
                    return _this.rxAssociationInstanceService
                        .disassociateRecords(params.associationDefinitionName, nodeAIds, nodeBIds)
                        .pipe(operators.mapTo(instanceIds));
                }));
            }
            else {
                return rxjs.of([]);
            }
        };
        return RxDisassociateViewActionService;
    }());
    RxDisassociateViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDisassociateViewActionService, deps: [{ token: i1__namespace$4.RxLogService }, { token: i1__namespace$1.RxViewActionUtilsService }, { token: i1__namespace$3.RxAssociationDefinitionService }, { token: i1__namespace$3.RxAssociationInstanceService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxDisassociateViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDisassociateViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxDisassociateViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$4.RxLogService }, { type: i1__namespace$1.RxViewActionUtilsService }, { type: i1__namespace$3.RxAssociationDefinitionService }, { type: i1__namespace$3.RxAssociationInstanceService }]; } });

    var DisassociateViewActionModule = /** @class */ (function () {
        function DisassociateViewActionModule(rxViewActionRegistryService, rxDisassociateViewActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxDisassociateViewActionService = rxDisassociateViewActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxDisassociateAction',
                label: 'Disassociate records',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxDisassociateViewActionService,
                designModel: RxDisassociateViewActionDesignModel,
                parameters: [
                    {
                        name: 'recordDefinitionName',
                        label: 'Record definition to disassociate',
                        isRequired: true,
                        type: i1.ViewComponentPropertyType.String
                    },
                    {
                        name: 'associationDefinitionName',
                        label: 'Association to use',
                        isRequired: true
                    },
                    {
                        name: 'associationDefinitionRole',
                        label: 'Associated record node side',
                        isRequired: true
                    },
                    {
                        name: 'associatedRecordId',
                        label: 'Associated record ID',
                        enableExpressionEvaluation: true,
                        isRequired: true
                    },
                    {
                        name: 'disassociatedRecordIds',
                        label: 'Records to disassociate',
                        enableExpressionEvaluation: true,
                        isRequired: true
                    }
                ]
            });
        }
        return DisassociateViewActionModule;
    }());
    DisassociateViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DisassociateViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxDisassociateViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DisassociateViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DisassociateViewActionModule });
    DisassociateViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DisassociateViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DisassociateViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxDisassociateViewActionService }]; } });

    var ResultModalComponent = /** @class */ (function () {
        function ResultModalComponent(activeModelRef) {
            this.activeModelRef = activeModelRef;
            this.data = this.activeModelRef.getData();
        }
        ResultModalComponent.prototype.close = function () {
            this.activeModelRef.close();
        };
        ResultModalComponent.prototype.hasActionResultDetails = function (data) {
            return ['warningCount', 'errorCount', 'infoCount', 'successCount'].some(function (prop) { return data.summary[prop]; });
        };
        return ResultModalComponent;
    }());
    ResultModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ResultModalComponent, deps: [{ token: i1__namespace$2.ActiveModalRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ResultModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ResultModalComponent, selector: "rx-edit-records-result-modal", ngImport: i0__namespace, template: "<div class=\"modal-body\">\n  <div class=\"mb-2\">\n    <adapt-icon [name]=\"'check_circle'\" class=\"mr-1 text-success-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.updated-successfully.label' |\n    translate}}: {{data.summary.successCount}}\n  </div>\n\n  <div class=\"mb-2\">\n    <adapt-icon [name]=\"'exclamation_circle'\" class=\"mr-1 text-warning-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.updated-with-warnings.label' | translate\n    }}: {{data.summary.warningCount}}\n  </div>\n\n  <div>\n    <adapt-icon [name]=\"'exclamation_triangle'\" class=\"mr-1 text-danger-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.update-failures.label' | translate }}:\n    {{data.summary.errorCount}}\n  </div>\n\n  <div class=\"mt-2\" *ngIf=\"hasActionResultDetails(data) && data.details\">\n    <adapt-rx-textarea\n      class=\"resize-none\"\n      label=\"{{'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      readonly\n      rows=\"15\"\n      [ngModel]=\"data.details\"\n    >\n    </adapt-rx-textarea>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-secondary btn-sm\" (click)=\"close()\" type=\"button\">\n    {{'com.bmc.arsys.rx.client.common.close.label' | translate}}\n  </button>\n</div>\n", styles: [":host ::ng-deep .resize-none{resize:none}\n"], components: [{ type: i1__namespace$2.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1__namespace$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2__namespace$3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3__namespace$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ResultModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-edit-records-result-modal',
                        styleUrls: ['./result-modal.scss'],
                        templateUrl: './result-modal.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.ActiveModalRef }]; } });

    var RxEditRecordsViewBuilder = /** @class */ (function () {
        function RxEditRecordsViewBuilder(rxGuidService, rxDefaultRecordEditorInputType, rxFieldDefinitionService, translateService, rxSystemConfigurationService) {
            this.rxGuidService = rxGuidService;
            this.rxDefaultRecordEditorInputType = rxDefaultRecordEditorInputType;
            this.rxFieldDefinitionService = rxFieldDefinitionService;
            this.translateService = translateService;
            this.rxSystemConfigurationService = rxSystemConfigurationService;
        }
        RxEditRecordsViewBuilder.prototype.getViewDefinition = function (recordDefinitionName, columnDescriptors) {
            var closeButtonId = this.rxGuidService.generate(), containerId = this.rxGuidService.generate(), recordEditorId = this.rxGuidService.generate(), recordInstanceId = null, saveButtonId = this.rxGuidService.generate(), viewDefinitionId = this.rxGuidService.generate(), recordEditorComponentDefinitions = this.getComponentDefinitions(columnDescriptors, recordEditorId);
            return {
                guid: viewDefinitionId,
                layout: JSON.stringify({
                    outlets: [
                        {
                            name: i1.RX_VIEW_DEFINITION.defaultOutletName,
                            columns: [
                                {
                                    children: [recordEditorId]
                                }
                            ]
                        },
                        {
                            name: 'footer',
                            height: 60,
                            columns: [
                                {
                                    children: [containerId]
                                }
                            ]
                        }
                    ]
                }),
                outputParams: [
                    {
                        name: 'recordInstance',
                        source: '${view.components.' + recordEditorId + '.recordInstance}'
                    }
                ],
                inputParams: [],
                componentDefinitions: [
                    {
                        resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                        guid: recordEditorId,
                        type: i1.RxViewComponentType.RecordEditor,
                        propertiesByName: {
                            recordInstanceId: "" + recordInstanceId,
                            mode: i2.RecordEditorMode.BulkEdit,
                            recordDefinitionName: recordDefinitionName,
                            styles: 'p-0 border-0'
                        },
                        componentDefinitions: recordEditorComponentDefinitions,
                        layout: JSON.stringify({
                            outlets: [
                                {
                                    name: i1.RX_VIEW_DEFINITION.defaultOutletName,
                                    columns: [
                                        {
                                            children: recordEditorComponentDefinitions.map(function (componentDefinition) { return componentDefinition.guid; })
                                        }
                                    ]
                                }
                            ]
                        })
                    },
                    {
                        resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                        guid: containerId,
                        type: i1.RxViewComponentType.ButtonBar,
                        propertiesByName: {
                            alignment: 'right',
                            hidden: '0'
                        },
                        layout: JSON.stringify({
                            outlets: [
                                {
                                    name: i1.RX_VIEW_DEFINITION.defaultOutletName,
                                    columns: [
                                        {
                                            children: [saveButtonId, closeButtonId]
                                        }
                                    ]
                                }
                            ]
                        }),
                        componentDefinitions: [
                            {
                                resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                                guid: closeButtonId,
                                type: i1.RxViewComponentType.ActionButton,
                                propertiesByName: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                                    style: 'secondary',
                                    size: 'default'
                                },
                                componentDefinitions: [
                                    {
                                        resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                        guid: this.rxGuidService.generate(),
                                        type: i1.RxViewComponentType.Action,
                                        propertiesByName: {
                                            viewApi: '${view.api}',
                                            name: 'rxCloseViewAction',
                                            actAsCancel: 'true'
                                        }
                                    }
                                ]
                            },
                            {
                                resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                                guid: saveButtonId,
                                type: i1.RxViewComponentType.ActionButton,
                                propertiesByName: {
                                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
                                    style: 'primary',
                                    disabled: 'NOT${view.components.' + recordEditorId + '.canSave}',
                                    size: 'default'
                                },
                                componentDefinitions: [
                                    {
                                        resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                        guid: this.rxGuidService.generate(),
                                        type: i1.RxViewComponentType.Action,
                                        propertiesByName: {
                                            viewApi: '${view.api}',
                                            name: 'rxCloseViewAction',
                                            actAsCancel: 'false'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        };
        RxEditRecordsViewBuilder.prototype.getComponentDefinitions = function (columnDescriptors, recordEditorId) {
            var submitterMode = this.rxSystemConfigurationService.getConfigurationSync('Submitter-Mode');
            if (submitterMode === i1$1.RX_ADMINISTRATION.submitterModes.locked) {
                columnDescriptors = columnDescriptors.filter(function (columnDescriptor) { return Number(columnDescriptor.fieldId) !== i4.RX_RECORD_DEFINITION.coreFieldIds.createdBy; });
            }
            var fieldContainerComponentDefinitions = this.getFieldContainerComponentDefinitions(columnDescriptors, recordEditorId);
            return [
                {
                    resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: this.rxGuidService.generate(),
                    type: i1.RxViewComponentType.Container,
                    propertiesByName: {
                        rowWrap: i2.ContainerRowWrap.Sm,
                        columnCount: '1'
                    },
                    componentDefinitions: fieldContainerComponentDefinitions,
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: i1.RX_VIEW_DEFINITION.defaultOutletName,
                                columns: [
                                    {
                                        children: fieldContainerComponentDefinitions.map(function (componentDefinition) { return componentDefinition.guid; })
                                    }
                                ]
                            }
                        ]
                    })
                }
            ];
        };
        RxEditRecordsViewBuilder.prototype.getFieldContainerComponentDefinitions = function (columnDescriptors, recordEditorId) {
            var _this = this;
            return columnDescriptors
                .filter(function (columnDescriptor) { return !_this.rxFieldDefinitionService.isSystemField(columnDescriptor.fieldDefinition); })
                .map(function (columnDescriptor) {
                var resourceType, componentType;
                var isAssociated = Boolean(columnDescriptor.associationDescriptor);
                if (isAssociated) {
                    resourceType = i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent;
                    componentType = i1.RxViewComponentType.Association;
                }
                else {
                    resourceType = i1.RX_VIEW_DEFINITION.resourceTypes.viewComponent;
                    componentType = _this.rxDefaultRecordEditorInputType.getFieldTypeByFieldDefinition(columnDescriptor.fieldDefinition);
                }
                var componentDefinition = {
                    resourceType: resourceType,
                    guid: _this.rxGuidService.generate(),
                    type: componentType,
                    propertiesByName: {
                        fieldId: columnDescriptor.fieldDefinition.id,
                        recordDefinition: '${view.components.' + recordEditorId + '.recordDefinition}',
                        recordInstance: '${view.components.' + recordEditorId + '.recordInstance}',
                        label: columnDescriptor.title,
                        fieldOption: i4.RX_RECORD_DEFINITION.fieldOptions.optional
                    }
                };
                if (isAssociated) {
                    componentDefinition.componentDefinitions = [];
                    lodash.assign(componentDefinition.propertiesByName, {
                        associatedRecordNodeSide: columnDescriptor.associationDescriptor.nodeSide,
                        editingMode: i2.RxAssociationEditingMode.Dropdown,
                        associationDefinitionName: columnDescriptor.associationDescriptor.associationDefinition.name,
                        recordDefinitionName: columnDescriptor.associationDescriptor.recordDefinitionName
                    });
                }
                return componentDefinition;
            })
                .reduce(function (fieldContainerComponentDefinitions, fieldComponentDefinition, index, fieldComponentDefinitions) {
                if (index % 2 === 0) {
                    fieldContainerComponentDefinitions.push({
                        resourceType: i1.RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                        guid: _this.rxGuidService.generate(),
                        type: i1.RxViewComponentType.Container,
                        propertiesByName: {
                            rowWrap: i2.ContainerRowWrap.Sm,
                            columnCount: '2'
                        },
                        componentDefinitions: fieldComponentDefinitions.slice(index, index + 2),
                        layout: JSON.stringify({
                            outlets: [
                                {
                                    name: i1.RX_VIEW_DEFINITION.defaultOutletName,
                                    columns: [
                                        {
                                            children: [fieldComponentDefinition.guid],
                                            span: '6'
                                        },
                                        {
                                            children: fieldComponentDefinitions.length > index + 1
                                                ? [fieldComponentDefinitions[index + 1].guid]
                                                : [],
                                            span: '6'
                                        }
                                    ]
                                }
                            ]
                        })
                    });
                }
                return fieldContainerComponentDefinitions;
            }, []);
        };
        return RxEditRecordsViewBuilder;
    }());
    RxEditRecordsViewBuilder.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsViewBuilder, deps: [{ token: i1__namespace.RxGuidService }, { token: i2__namespace.RxDefaultRecordEditorInputType }, { token: i4__namespace.RxFieldDefinitionService }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$4.RxSystemConfigurationService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxEditRecordsViewBuilder.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsViewBuilder, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsViewBuilder, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxGuidService }, { type: i2__namespace.RxDefaultRecordEditorInputType }, { type: i4__namespace.RxFieldDefinitionService }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$4.RxSystemConfigurationService }]; } });

    var RxEditRecordsDataService = /** @class */ (function () {
        function RxEditRecordsDataService(adaptModalService, translateService, rxCommandFactoryService) {
            this.adaptModalService = adaptModalService;
            this.translateService = translateService;
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.resourceType = 'com.bmc.arsys.rx.application.record.command.UpdateRecordInstancesCommand';
            this.editRecordsCommand = this.rxCommandFactoryService.forResourceType(this.resourceType);
        }
        RxEditRecordsDataService.prototype.editRecords = function (preparedRecordData) {
            return this.editRecordsCommand.execute(preparedRecordData);
        };
        RxEditRecordsDataService.prototype.showActionResults = function (actionResults) {
            return this.adaptModalService
                .open({
                size: 'sm',
                title: this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.title'),
                data: actionResults,
                content: ResultModalComponent
            })
                .catch(lodash.noop);
        };
        RxEditRecordsDataService.prototype.runAction = function (recordInstanceIds, recordInstance) {
            var _this = this;
            var preparedRecordData = this.prepareRecordData(recordInstanceIds, recordInstance);
            var formData = new FormData();
            formData.append('commandInstance', JSON.stringify(preparedRecordData.commandInstance));
            lodash.forEach(preparedRecordData.attachments, function (attachment) {
                formData.append(attachment.key, attachment.file);
            });
            Object.keys(preparedRecordData || {}).map(function (item) {
                if (item !== 'commandInstance' && item !== 'attachments') {
                    formData.append(item, JSON.stringify(preparedRecordData[item]));
                }
            });
            return this.editRecords(formData).pipe(operators.map(function (response) { return _this.prepareActionResults(response, preparedRecordData); }), operators.switchMap(function (actionResults) {
                return rxjs.from(Promise.resolve(_this.showActionResults(actionResults)));
            }));
        };
        RxEditRecordsDataService.prototype.cleanUnchangedFields = function (recordInstance) {
            return lodash.forIn(recordInstance.fieldInstances, function (field, key) {
                if (lodash.isNull(field.value)) {
                    delete recordInstance.fieldInstances[key];
                }
            });
        };
        RxEditRecordsDataService.prototype.prepareFiles = function (fields, keyPrefix) {
            return lodash.values(fields)
                .filter(function (field) { return lodash.has(field, 'file'); })
                .map(function (attachment) { return ({
                key: keyPrefix ? keyPrefix + '/' + attachment.id : attachment.id,
                file: attachment.file
            }); });
        };
        RxEditRecordsDataService.prototype.cleanFiles = function (fields) {
            Object.keys(fields).map(function (key, index) {
                fields[key].hasOwnProperty('file') ? delete fields[key] : delete fields[key].file;
            });
            return fields;
        };
        RxEditRecordsDataService.prototype.prepareAssociationInstancesForSaving = function (associationInstances) {
            return lodash.transform(associationInstances, function (result, associationInstance, associationDefinitionName) {
                lodash.forEach(associationInstance, function (associationGroups, role) {
                    if (!lodash.isEmpty(associationGroups.pending)) {
                        result.push({
                            associationDefinitionName: associationDefinitionName,
                            recordInstanceIds: lodash.map(associationGroups.pending, 'id'),
                            nodeSide: role,
                            resourceType: i4.RX_RECORD_INSTANCE.association.operationResourceTypes.associate
                        });
                    }
                });
            }, []);
        };
        RxEditRecordsDataService.prototype.prepareRecordData = function (recordInstanceIds, recordInstance) {
            var record = lodash.pick(recordInstance, ['resourceType', 'recordDefinitionName', 'fieldInstances']);
            var resourceType = 'com.bmc.arsys.rx.application.record.command.UpdateRecordInstancesCommand';
            record.fieldInstances = this.cleanUnchangedFields(record);
            var attachments = this.prepareFiles(record.fieldInstances);
            record.fieldInstances = this.cleanFiles(record.fieldInstances);
            var associationInstances = this.prepareAssociationInstancesForSaving(recordInstance.associationInstances);
            var data = {
                shouldOverrideOptimisticLock: false,
                commandInstance: { resourceType: resourceType },
                recordInstanceIds: recordInstanceIds,
                recordInstance: record,
                attachments: attachments
            };
            if (!lodash.isEmpty(associationInstances)) {
                data.associationOperations = associationInstances.map(function (associationInstance) { return (Object.assign(Object.assign({}, associationInstance), { nodeSide: associationInstance.nodeSide.split(':')[0] })); });
            }
            return data;
        };
        RxEditRecordsDataService.prototype.prepareActionResults = function (response, requestData) {
            var _this = this;
            var newLine = '\n';
            var updatedInstanceIdsCount = requestData.recordInstanceIds.length;
            var detailsMessageLabel = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.details.record-instance-id.label');
            var summary = {
                successCount: 0,
                errorCount: 0,
                warningCount: 0,
                infoCount: 0
            };
            var details;
            if (!lodash.isEmpty(response)) {
                summary.errorCount = lodash.filter(response, function (messages) { return lodash.some(messages, ['messageType', i1$1.RX_ERROR_HANDLING.messageTypes.error]); }).length;
                summary.warningCount = lodash.filter(response, function (messages) { return lodash.some(messages, ['messageType', i1$1.RX_ERROR_HANDLING.messageTypes.warning]); }).length;
                summary.infoCount = lodash.filter(response, function (messages) { return lodash.some(messages, ['messageType', i1$1.RX_ERROR_HANDLING.messageTypes.info]); }).length;
                summary.successCount = lodash.filter(response, function (messages) { return lodash.some(messages, ['messageType', i1$1.RX_ERROR_HANDLING.messageTypes.success]); }).length;
                details = lodash.map(response, function (messages, recordInstanceId) {
                    var recordInstanceIdMessageHeader = detailsMessageLabel + ': ' + recordInstanceId;
                    var messageText = lodash.values(messages).map(_this.convertMessageToString).join(', ');
                    return recordInstanceIdMessageHeader + newLine + messageText;
                }).join(newLine + newLine);
            }
            else {
                details = '';
            }
            summary.successCount = updatedInstanceIdsCount - summary.errorCount - summary.warningCount;
            return { summary: summary, details: details };
        };
        RxEditRecordsDataService.prototype.convertMessageToString = function (message) {
            return message.messageType + ": " + lodash.values([message.messageText, message.appendedText]).join(' ');
        };
        return RxEditRecordsDataService;
    }());
    RxEditRecordsDataService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsDataService, deps: [{ token: i1__namespace$2.AdaptModalService }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$4.RxCommandFactoryService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxEditRecordsDataService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsDataService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsDataService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.AdaptModalService }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$4.RxCommandFactoryService }]; } });

    var RxEditRecordsViewActionService = /** @class */ (function () {
        function RxEditRecordsViewActionService(rxEditRecordsViewBuilder, rxEditRecordsDataService, rxLogService, rxRecordGridUtilsService, translateService, rxDefinitionNameService, openViewAction, rxViewActionUtilsService) {
            this.rxEditRecordsViewBuilder = rxEditRecordsViewBuilder;
            this.rxEditRecordsDataService = rxEditRecordsDataService;
            this.rxLogService = rxLogService;
            this.rxRecordGridUtilsService = rxRecordGridUtilsService;
            this.translateService = translateService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.openViewAction = openViewAction;
            this.rxViewActionUtilsService = rxViewActionUtilsService;
        }
        RxEditRecordsViewActionService.prototype.execute = function (params) {
            var _this = this;
            var recordDefinitionName = params.recordDefinitionName;
            if (lodash.isNil(params.records)) {
                return rxjs.throwError(new i1$2.RxError('rxEditRecordsAction: no records to edit.'));
            }
            if (lodash.isEmpty(recordDefinitionName) && lodash.isFunction(params.records.getRecordDefinitionName)) {
                recordDefinitionName = params.records.getRecordDefinitionName();
            }
            if (recordDefinitionName) {
                var recordIds_1 = this.rxViewActionUtilsService.extractRecordIds(params.records);
                if (recordIds_1.length) {
                    return rxjs.from(this.rxRecordGridUtilsService.getColumnDescriptors(recordDefinitionName, params.records)).pipe(operators.switchMap(function (columnDescriptors) {
                        var localizedViewTitle = _this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.view.title', { recordDefinitionName: _this.rxDefinitionNameService.getDisplayName(recordDefinitionName) });
                        var localizedViewNotification = _this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.view.notification');
                        return _this.openViewAction
                            .execute({
                            presentation: {
                                modalSize: RX_OPEN_VIEW.modalSize.Large,
                                title: localizedViewTitle,
                                notification: localizedViewNotification,
                                type: RX_OPEN_VIEW.type.DockedRightModal
                            },
                            viewDefinitionName: _this.rxEditRecordsViewBuilder.getViewDefinition(recordDefinitionName, columnDescriptors),
                            viewParams: null
                        })
                            .pipe(operators.switchMap(function (viewOutput) { return viewOutput && viewOutput.recordInstance
                            ? _this.rxEditRecordsDataService
                                .runAction(recordIds_1, viewOutput.recordInstance)
                                .pipe(operators.switchMap(function () { return lodash.isFunction(params.records.refresh)
                                ? params.records.refresh()
                                : rxjs.EMPTY; }))
                            : rxjs.EMPTY; }));
                    }));
                }
                else {
                    this.rxLogService.debug('rxEditRecordsAction: no records to edit.');
                }
            }
            else {
                this.rxLogService.error('rxEditRecordsAction: Record Definition Name is not defined.');
            }
            return rxjs.EMPTY;
        };
        return RxEditRecordsViewActionService;
    }());
    RxEditRecordsViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsViewActionService, deps: [{ token: RxEditRecordsViewBuilder }, { token: RxEditRecordsDataService }, { token: i1__namespace$4.RxLogService }, { token: i2__namespace.RxRecordGridUtilsService }, { token: i4__namespace$1.TranslateService }, { token: i1__namespace$4.RxDefinitionNameService }, { token: RxOpenViewActionService }, { token: i1__namespace$1.RxViewActionUtilsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxEditRecordsViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEditRecordsViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxEditRecordsViewBuilder }, { type: RxEditRecordsDataService }, { type: i1__namespace$4.RxLogService }, { type: i2__namespace.RxRecordGridUtilsService }, { type: i4__namespace$1.TranslateService }, { type: i1__namespace$4.RxDefinitionNameService }, { type: RxOpenViewActionService }, { type: i1__namespace$1.RxViewActionUtilsService }]; } });

    var EditRecordsViewActionModule = /** @class */ (function () {
        function EditRecordsViewActionModule(rxViewActionRegistryService, rxEditRecordsActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxEditRecordsActionService = rxEditRecordsActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxEditRecordsAction',
                label: 'Edit records',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxEditRecordsActionService,
                parameters: [
                    {
                        name: 'records',
                        label: 'Records',
                        isRequired: true,
                        tooltip: new i1$1.Tooltip("Build an expression that evaluates to one of the following:<br>\n            1) Record Grid;<br>\n            2) A collection of Record Instances, or<br>\n            3) A collection of Record Instance IDs. <br>For options 2 and 3, select a Record Definition in the field below."),
                        enableExpressionEvaluation: true,
                        editor: components.ExpressionFormControlComponent
                    },
                    {
                        name: 'recordDefinitionName',
                        label: 'Record definition',
                        type: i1.ViewComponentPropertyType.String,
                        editor: components.RxDefinitionPickerComponent,
                        editorOptions: {
                            definitionType: components.RxDefinitionPickerType.StandardDataRecord
                        },
                        defaultValue: null
                    }
                ]
            });
        }
        return EditRecordsViewActionModule;
    }());
    EditRecordsViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: EditRecordsViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxEditRecordsViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    EditRecordsViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: EditRecordsViewActionModule, declarations: [ResultModalComponent], imports: [i2$2.CommonModule, i1$3.AdaptIconModule, i4$1.TranslateModule, i3$2.FormsModule, i1$3.AdaptRxTextareaModule] });
    EditRecordsViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: EditRecordsViewActionModule, imports: [[i2$2.CommonModule, i1$3.AdaptIconModule, i4$1.TranslateModule, i3$2.FormsModule, i1$3.AdaptRxTextareaModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: EditRecordsViewActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2$2.CommonModule, i1$3.AdaptIconModule, i4$1.TranslateModule, i3$2.FormsModule, i1$3.AdaptRxTextareaModule],
                        declarations: [ResultModalComponent],
                        entryComponents: [ResultModalComponent]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxEditRecordsViewActionService }]; } });

    var RxLaunchProcessViewActionDesignManagerService = /** @class */ (function () {
        function RxLaunchProcessViewActionDesignManagerService(rxProcessDefinitionService, rxViewActionRegistryService, rxViewExpressionValidatorService) {
            this.rxProcessDefinitionService = rxProcessDefinitionService;
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
        }
        RxLaunchProcessViewActionDesignManagerService.prototype.validate = function (properties, propertyName) {
            var _this = this;
            if (properties.processDefinitionName) {
                return this.rxProcessDefinitionService.get(properties.processDefinitionName).pipe(operators.switchMap(function (processDefinition) { return rxjs.combineLatest([
                    _this.validateInputParams(properties, propertyName, processDefinition.inputParams),
                    _this.validateInputParamExpressions(properties, propertyName, processDefinition.inputParams)
                ]); }), operators.map(lodash.flatten));
            }
            else {
                return rxjs.of([]);
            }
        };
        RxLaunchProcessViewActionDesignManagerService.prototype.validateInputParamExpressions = function (actionParams, issuePropertyName, processInputParams) {
            var _this = this;
            var actionDescriptor = this.rxViewActionRegistryService.get(actionParams.name);
            var issues = processInputParams
                .filter(function (processInputParam) { return actionParams["actionProcessInputParams." + processInputParam.name]; })
                .map(function (processInputParam) { return _this.rxViewExpressionValidatorService
                .validate(actionParams["actionProcessInputParams." + processInputParam.name], issuePropertyName, actionDescriptor.label)
                .pipe(operators.map(function (issues) { return issues.map(function (issue) { return (Object.assign(Object.assign({}, issue), { description: actionDescriptor.label + " action: " + issue.description })); }); })); });
            return rxjs.combineLatest(issues).pipe(operators.defaultIfEmpty([]), operators.map(lodash.flatten));
        };
        RxLaunchProcessViewActionDesignManagerService.prototype.validateInputParams = function (actionParams, issuePropertyName, processInputParams) {
            var actionDescriptor = this.rxViewActionRegistryService.get(actionParams.name);
            var validationIssues = [];
            lodash.forEach(processInputParams, function (processInputParam) {
                var actionParamName = "actionProcessInputParams." + processInputParam.name;
                if (processInputParam.fieldOption === 'REQUIRED' && lodash.isEmpty(actionParams[actionParamName])) {
                    validationIssues.push({
                        type: 'error',
                        description: actionDescriptor.label + ": " + processInputParam.name + " cannot be blank.",
                        propertyName: issuePropertyName
                    });
                }
            });
            return rxjs.of(validationIssues);
        };
        return RxLaunchProcessViewActionDesignManagerService;
    }());
    RxLaunchProcessViewActionDesignManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessViewActionDesignManagerService, deps: [{ token: i3__namespace$2.RxProcessDefinitionService }, { token: i1__namespace$1.RxViewActionRegistryService }, { token: i3__namespace$3.RxViewExpressionValidatorService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLaunchProcessViewActionDesignManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessViewActionDesignManagerService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessViewActionDesignManagerService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i3__namespace$2.RxProcessDefinitionService }, { type: i1__namespace$1.RxViewActionRegistryService }, { type: i3__namespace$3.RxViewExpressionValidatorService }]; } });

    var RxLaunchProcessViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxLaunchProcessViewActionDesignModel, _super);
        function RxLaunchProcessViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.rxProcessDefinitionCacheService = _this.injector.get(i3$3.RxProcessDefinitionCacheService);
            _this.rxRecordDefinitionCacheService = _this.injector.get(i4.RxRecordDefinitionCacheService);
            _this.defaultProps = {
                processDefinitionName: null,
                waitForProcessCompletion: false
            };
            var processDefinitionName$ = _this.sandbox.actionProperties$.pipe(operators.pluck('processDefinitionName'), operators.distinctUntilChanged());
            processDefinitionName$.pipe(operators.skip(1)).subscribe(function (processDefinitionName) {
                _this.sandbox.setActionProperties({
                    processDefinitionName: processDefinitionName,
                    waitForProcessCompletion: false
                });
            });
            processDefinitionName$
                .pipe(operators.switchMap(function (processDefinitionName) { return processDefinitionName
                ? _this.rxProcessDefinitionCacheService.getProcessDefinition(processDefinitionName)
                : rxjs.of(null); }))
                .subscribe(function (processDefinition) { return _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig(processDefinition)); });
            _this.sandbox.actionProperties$
                .pipe(operators.map(function (props) { return [props.processDefinitionName, props.waitForProcessCompletion]; }), operators.distinctUntilChanged(lodash.isEqual), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), processDefinitionName = _b[0], waitForProcessCompletion = _b[1];
                return _this.getActionOutputDataDictionary(processDefinitionName, waitForProcessCompletion);
            }))
                .subscribe(function (dataDictionary) { return _this.sandbox.setActionOutputDataDictionary(dataDictionary); });
            return _this;
        }
        RxLaunchProcessViewActionDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ processDefinitionName: null, waitForProcessCompletion: false }, initialProperties);
        };
        RxLaunchProcessViewActionDesignModel.prototype.getActionEditorConfig = function (processDefinition) {
            var _this = this;
            return __spreadArray([
                {
                    name: 'processDefinitionName',
                    component: components.RxDefinitionPickerComponent,
                    options: {
                        label: 'Process to start',
                        definitionType: components.RxDefinitionPickerType.Process,
                        required: true
                    }
                },
                {
                    name: 'waitForProcessCompletion',
                    component: components.SwitchFormControlComponent,
                    isDisabled: processDefinition ? !processDefinition.synchronous : true,
                    options: {
                        label: 'Wait for process completion',
                        tooltip: new i1$1.Tooltip('If a process runs synchronously, it is possible to get output data from the process once the process completes. Enable Wait for completion in order to define an output map for the selected process.')
                    }
                }
            ], __read((processDefinition
                ? lodash.map(processDefinition.inputParams, function (param) { return ({
                    name: "actionProcessInputParams." + param.name,
                    component: components.ExpressionFormControlComponent,
                    options: {
                        label: param.name,
                        dataDictionary$: _this.expressionConfigurator.getDataDictionary(),
                        operators: _this.expressionConfigurator.getOperators(),
                        isRequired: param.fieldOption === 'REQUIRED'
                    }
                }); })
                : [])));
        };
        RxLaunchProcessViewActionDesignModel.prototype.getActionOutputDataDictionary = function (processDefinitionName, waitForProcessCompletion) {
            var _this = this;
            return waitForProcessCompletion
                ? this.rxProcessDefinitionCacheService.getOutputParams(processDefinitionName).pipe(operators.switchMap(function (outputParams) { return rxjs.forkJoin(outputParams.map(function (param) {
                    var dataDictionary;
                    if (param.fieldTypeName === i3$3.RX_PROCESS_DEFINITION.processVariableTypes.record) {
                        var recordInstanceParam_1 = param;
                        dataDictionary = _this.rxRecordDefinitionCacheService
                            .getRecordDefinition(recordInstanceParam_1.recordDefinitionName)
                            .pipe(operators.map(function (recordDefinition) { return ({
                            label: recordInstanceParam_1.name,
                            expression: _this.getOutputExpressionForPropertyPath(recordInstanceParam_1.name),
                            children: lodash.map(recordDefinition.fieldDefinitions, function (fieldDefinition) { return ({
                                label: fieldDefinition.name,
                                expression: _this.getOutputExpressionForPropertyPath(recordInstanceParam_1.name + "." + fieldDefinition.id)
                            }); })
                        }); }));
                    }
                    else {
                        dataDictionary = rxjs.of({
                            label: param.name,
                            expression: _this.getOutputExpressionForPropertyPath(param.name)
                        });
                    }
                    return dataDictionary;
                })); }))
                : rxjs.of([]);
        };
        return RxLaunchProcessViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var RxLaunchProcessViewActionService = /** @class */ (function () {
        function RxLaunchProcessViewActionService(rxJsonParserService, rxLogService, rxProcessDefinitionCacheService, rxRecordDefinitionCacheService, rxProcessInstanceCommandsService, rxProcessInstanceService, rxRecordInstanceService) {
            this.rxJsonParserService = rxJsonParserService;
            this.rxLogService = rxLogService;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.rxProcessInstanceCommandsService = rxProcessInstanceCommandsService;
            this.rxProcessInstanceService = rxProcessInstanceService;
            this.rxRecordInstanceService = rxRecordInstanceService;
        }
        RxLaunchProcessViewActionService.prototype.execute = function (params) {
            var _this = this;
            var processId;
            var processDefinitionOutputParams;
            return this.rxProcessInstanceCommandsService
                .start(params.processDefinitionName, params.actionProcessInputParams)
                .pipe(operators.switchMap(function (res) {
                if (params.waitForProcessCompletion) {
                    var location = res.headers.get('location');
                    processId = location ? lodash.last(location.split('/')) : null;
                    return _this.rxProcessDefinitionCacheService.getOutputParams(params.processDefinitionName);
                }
                else {
                    return rxjs.of(null);
                }
            }), operators.switchMap(function (plainOutputParams) {
                if (!lodash.isEmpty(plainOutputParams)) {
                    processDefinitionOutputParams = plainOutputParams.reduce(function (outputParams, value) {
                        outputParams[value.name] = value;
                        return outputParams;
                    }, {});
                    return _this.rxProcessInstanceService.get(params.processDefinitionName, processId + "/processOutputVariables");
                }
                else {
                    return rxjs.of(null);
                }
            }), operators.switchMap(function (processOutputVariables) {
                var outputResult = {};
                lodash.forEach(processOutputVariables, function (variableValue, variableName) {
                    if (processDefinitionOutputParams[variableName].fieldTypeName ===
                        i3$3.RX_PROCESS_DEFINITION.processVariableTypes.record) {
                        var recordInstanceOutputData = _this.rxJsonParserService.tryParseJson(variableValue);
                        if (recordInstanceOutputData &&
                            recordInstanceOutputData.recordDefinitionName &&
                            recordInstanceOutputData.id) {
                            outputResult[variableName] = _this.rxRecordInstanceService
                                .get(recordInstanceOutputData.recordDefinitionName, recordInstanceOutputData.id)
                                .pipe(operators.map(function (recordInstance) { return lodash.reduce(recordInstance.fieldInstances, function (result, fieldInstance) {
                                result[fieldInstance.id] = fieldInstance.value;
                                return result;
                            }, {}); }));
                        }
                        else {
                            _this.rxLogService.warning('rxLaunchProcessAction: unknown format for record instance as output data for process');
                        }
                    }
                    else {
                        outputResult[variableName] = rxjs.of(variableValue);
                    }
                });
                return rxjs.forkJoin(outputResult);
            }));
        };
        return RxLaunchProcessViewActionService;
    }());
    RxLaunchProcessViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessViewActionService, deps: [{ token: i1__namespace.RxJsonParserService }, { token: i1__namespace$4.RxLogService }, { token: i3__namespace$2.RxProcessDefinitionCacheService }, { token: i4__namespace.RxRecordDefinitionCacheService }, { token: i3__namespace$2.RxProcessInstanceCommandsService }, { token: i3__namespace$2.RxProcessInstanceService }, { token: i4__namespace.RxRecordInstanceService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLaunchProcessViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxJsonParserService }, { type: i1__namespace$4.RxLogService }, { type: i3__namespace$2.RxProcessDefinitionCacheService }, { type: i4__namespace.RxRecordDefinitionCacheService }, { type: i3__namespace$2.RxProcessInstanceCommandsService }, { type: i3__namespace$2.RxProcessInstanceService }, { type: i4__namespace.RxRecordInstanceService }]; } });

    var LaunchProcessViewActionModule = /** @class */ (function () {
        function LaunchProcessViewActionModule(rxViewActionRegistryService, rxLaunchProcessViewActionService, rxLaunchProcessViewActionDesignManagerService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxLaunchProcessViewActionService = rxLaunchProcessViewActionService;
            this.rxLaunchProcessViewActionDesignManagerService = rxLaunchProcessViewActionDesignManagerService;
            this.rxViewActionRegistryService.register({
                name: 'rxLaunchProcessAction',
                label: 'Launch process',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxLaunchProcessViewActionService,
                designManager: this.rxLaunchProcessViewActionDesignManagerService,
                designModel: RxLaunchProcessViewActionDesignModel,
                parameters: [
                    {
                        name: 'processDefinitionName',
                        label: 'Process to start',
                        type: i1.ViewComponentPropertyType.String,
                        isRequired: true
                    },
                    {
                        name: 'waitForProcessCompletion',
                        type: i1.ViewComponentPropertyType.Boolean,
                        designType: i1.ViewComponentPropertyType.Boolean
                    },
                    {
                        name: 'actionProcessInputParams',
                        label: 'Input map',
                        enableExpressionEvaluation: true
                    }
                ]
            });
        }
        return LaunchProcessViewActionModule;
    }());
    LaunchProcessViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxLaunchProcessViewActionService }, { token: RxLaunchProcessViewActionDesignManagerService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    LaunchProcessViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessViewActionModule });
    LaunchProcessViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessViewActionModule, providers: [RxLaunchProcessViewActionDesignManagerService] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessViewActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        providers: [RxLaunchProcessViewActionDesignManagerService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxLaunchProcessViewActionService }, { type: RxLaunchProcessViewActionDesignManagerService }]; } });

    var RxLaunchUrlViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxLaunchUrlViewActionDesignModel, _super);
        function RxLaunchUrlViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig());
            return _this;
        }
        RxLaunchUrlViewActionDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ url: null, launchBehavior: i1.RX_LAUNCH_BEHAVIOR.newWindow.value }, initialProperties);
        };
        RxLaunchUrlViewActionDesignModel.prototype.getActionEditorConfig = function () {
            return [
                {
                    name: 'url',
                    component: components.ExpressionFormControlComponent,
                    options: {
                        label: 'URL',
                        isRequired: true,
                        dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                        operators: this.expressionConfigurator.getOperators()
                    }
                },
                {
                    name: 'launchBehavior',
                    component: components.SelectFormControlComponent,
                    options: {
                        label: 'Launch behavior',
                        options: lodash.map(i1.RX_LAUNCH_BEHAVIOR, function (value) { return ({
                            name: value.content,
                            id: value.value
                        }); }),
                        sortAlphabetically: false
                    }
                }
            ];
        };
        return RxLaunchUrlViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var RxLaunchUrlViewActionService = /** @class */ (function () {
        function RxLaunchUrlViewActionService() {
        }
        RxLaunchUrlViewActionService.prototype.execute = function (params) {
            if (params.url) {
                window.open(params.url, i1.RX_LAUNCH_BEHAVIOR[params.launchBehavior].target);
                return rxjs.EMPTY;
            }
            else {
                return rxjs.throwError(new i1$2.RxError('rxLaunchUrlAction: URL is not specified.'));
            }
        };
        return RxLaunchUrlViewActionService;
    }());
    RxLaunchUrlViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchUrlViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLaunchUrlViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchUrlViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchUrlViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxLaunchUrlViewActionDefinitionAdapterService = /** @class */ (function () {
        function RxLaunchUrlViewActionDefinitionAdapterService() {
        }
        RxLaunchUrlViewActionDefinitionAdapterService.prototype.adaptDefinition = function (viewComponentDefinition) {
            var _a;
            var propertiesByName = lodash.get(viewComponentDefinition, 'propertiesByName', {});
            propertiesByName.launchBehavior = (_a = propertiesByName.launchBehavior) !== null && _a !== void 0 ? _a : i1.RX_LAUNCH_BEHAVIOR.newWindow.value;
        };
        return RxLaunchUrlViewActionDefinitionAdapterService;
    }());
    RxLaunchUrlViewActionDefinitionAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchUrlViewActionDefinitionAdapterService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLaunchUrlViewActionDefinitionAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchUrlViewActionDefinitionAdapterService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchUrlViewActionDefinitionAdapterService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var LaunchUrlViewActionModule = /** @class */ (function () {
        function LaunchUrlViewActionModule(rxViewActionDefinitionAdapterRegistryService, rxViewActionRegistryService, rxLaunchUrlViewActionService, rxLaunchUrlActionDefinitionAdapterService) {
            this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxLaunchUrlViewActionService = rxLaunchUrlViewActionService;
            this.rxLaunchUrlActionDefinitionAdapterService = rxLaunchUrlActionDefinitionAdapterService;
            this.rxViewActionRegistryService.register({
                name: 'rxLaunchUrlAction',
                label: 'Launch URL',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxLaunchUrlViewActionService,
                designModel: RxLaunchUrlViewActionDesignModel,
                parameters: [
                    {
                        name: 'url',
                        label: 'URL',
                        enableExpressionEvaluation: true,
                        isRequired: true
                    },
                    {
                        name: 'launchBehavior',
                        label: 'Launch behavior'
                    }
                ]
            });
            rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter('rxLaunchUrlAction', this.rxLaunchUrlActionDefinitionAdapterService);
        }
        return LaunchUrlViewActionModule;
    }());
    LaunchUrlViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchUrlViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionDefinitionAdapterRegistryService }, { token: i1__namespace$1.RxViewActionRegistryService }, { token: RxLaunchUrlViewActionService }, { token: RxLaunchUrlViewActionDefinitionAdapterService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    LaunchUrlViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchUrlViewActionModule });
    LaunchUrlViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchUrlViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchUrlViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionDefinitionAdapterRegistryService }, { type: i1__namespace$1.RxViewActionRegistryService }, { type: RxLaunchUrlViewActionService }, { type: RxLaunchUrlViewActionDefinitionAdapterService }]; } });

    var RxRefreshViewActionService = /** @class */ (function () {
        function RxRefreshViewActionService() {
        }
        RxRefreshViewActionService.prototype.execute = function (params) {
            if (params.component) {
                return lodash.isFunction(params.component.refresh)
                    ? params.component.refresh()
                    : rxjs.throwError(new i1$2.RxError('rxRefreshAction: target component does not support refresh API.'));
            }
            else {
                return rxjs.throwError(new i1$2.RxError('rxRefreshAction: component is not specified.'));
            }
        };
        return RxRefreshViewActionService;
    }());
    RxRefreshViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRefreshViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRefreshViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRefreshViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRefreshViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RefreshViewActionModule = /** @class */ (function () {
        function RefreshViewActionModule(rxViewActionRegistryService, rxRefreshViewActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxRefreshViewActionService = rxRefreshViewActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxRefreshAction',
                label: 'Refresh',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxRefreshViewActionService,
                parameters: [
                    {
                        name: 'component',
                        label: 'View/Component',
                        enableExpressionEvaluation: true,
                        isRequired: true,
                        editor: components.ExpressionFormControlComponent
                    }
                ]
            });
        }
        return RefreshViewActionModule;
    }());
    RefreshViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RefreshViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxRefreshViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RefreshViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RefreshViewActionModule });
    RefreshViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RefreshViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RefreshViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxRefreshViewActionService }]; } });

    var RxSaveViewActionService = /** @class */ (function () {
        function RxSaveViewActionService() {
        }
        RxSaveViewActionService.prototype.execute = function (params) {
            if (lodash.isFunction(params.targetApi.save)) {
                var closeAfterSave$ = lodash.isFunction(params.viewApi.close)
                    ? rxjs.EMPTY.pipe(operators.tap({
                        complete: function () {
                            params.viewApi.close();
                        }
                    }))
                    : rxjs.throwError(new i1$2.RxError('rxSaveAction: target view does not support close API.'));
                return rxjs.concat(params.targetApi.save(params.closeAfterSave), params.closeAfterSave ? closeAfterSave$ : rxjs.EMPTY);
            }
            else {
                return rxjs.throwError(new i1$2.RxError('rxSaveAction: target view/component does not support save API.'));
            }
        };
        return RxSaveViewActionService;
    }());
    RxSaveViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSaveViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSaveViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSaveViewActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSaveViewActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var SaveViewActionModule = /** @class */ (function () {
        function SaveViewActionModule(rxViewActionRegistryService, rxSaveViewActionService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxSaveViewActionService = rxSaveViewActionService;
            this.rxViewActionRegistryService.register({
                name: 'rxSaveAction',
                label: 'Save',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxSaveViewActionService,
                parameters: [
                    {
                        name: 'targetApi',
                        label: 'View/Component',
                        editor: components.ExpressionFormControlComponent,
                        isRequired: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'closeAfterSave',
                        label: 'Close after save',
                        editor: components.SwitchFormControlComponent,
                        type: i1.ViewComponentPropertyType.Boolean,
                        designType: i1.ViewComponentPropertyType.Boolean
                    },
                    {
                        name: 'viewApi',
                        enableExpressionEvaluation: true,
                        defaultValue: '${view.api}'
                    }
                ]
            });
        }
        return SaveViewActionModule;
    }());
    SaveViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SaveViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxSaveViewActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SaveViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SaveViewActionModule });
    SaveViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SaveViewActionModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SaveViewActionModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxSaveViewActionService }]; } });

    var RxSetPropertyViewActionService = /** @class */ (function () {
        function RxSetPropertyViewActionService() {
        }
        RxSetPropertyViewActionService.prototype.execute = function (params) {
            var executionResult = rxjs.throwError(new i1$2.RxError('rxSetPropertyAction: component is not specified.'));
            if (params.componentApi && lodash.isFunction(params.componentApi.setProperty) && params.propertyPath) {
                // Extract <Path> from  ${view.components.<ID>.<Path>}
                var matches = params.propertyPath.match(/^\$\{view\.components\.[0-9a-z-]+\.(.+)}$/);
                if (matches && matches[1]) {
                    executionResult = params.componentApi.setProperty(matches[1], params.propertyValue);
                }
            }
            return rxjs.isObservable(executionResult) ? executionResult : rxjs.EMPTY;
        };
        return RxSetPropertyViewActionService;
    }());
    RxSetPropertyViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSetPropertyViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSetPropertyViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSetPropertyViewActionService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSetPropertyViewActionService, decorators: [{
                type: i0.Injectable
            }] });

    var RxSetPropertyViewActionExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxSetPropertyViewActionExpressionConfigurator, _super);
        function RxSetPropertyViewActionExpressionConfigurator(injector, actionType, actionGuid) {
            var _this = _super.call(this, injector, actionType, actionGuid) || this;
            _this.configureForProperty({
                propertyPath: 'propertyPath',
                dataDictionary$: injector.get(i3.RxViewDataDictionaryService).settablePropertiesDataDictionary$,
                operators: _this.getOperatorRowsByGroup(i1$1.ExpressionOperatorGroup.MathClient)
            });
            return _this;
        }
        return RxSetPropertyViewActionExpressionConfigurator;
    }(i3.RxViewActionExpressionConfigurator));

    var RxSetPropertyViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxSetPropertyViewActionDesignModel, _super);
        function RxSetPropertyViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.expressionConfigurator = new RxSetPropertyViewActionExpressionConfigurator(_this.injector, _this.sandbox.descriptor.name, _this.guid);
            _this.sandbox.actionProperties$
                .pipe(operators.take(1))
                .subscribe(function () { return _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig()); });
            _this.sandbox.actionProperties$.pipe(operators.pluck('propertyPath'), operators.distinctUntilChanged()).subscribe(function (propertyPath) {
                var componentApi = null;
                if (propertyPath && propertyPath.length) {
                    // Extract <ID> from ${view.components.<ID>.<Path>}
                    var matches = propertyPath.match(/\${view\.components\.([0-9a-z-]+)\..+}/);
                    if (matches && matches[1]) {
                        componentApi = "${view.components." + matches[1] + ".api}";
                    }
                }
                _this.sandbox.updateActionProperties({
                    componentApi: componentApi
                });
            });
            return _this;
        }
        RxSetPropertyViewActionDesignModel.getInitialProperties = function (initialProperties) {
            return Object.assign({ componentApi: null, propertyPath: null, propertyValue: null }, initialProperties);
        };
        RxSetPropertyViewActionDesignModel.prototype.getActionEditorConfig = function () {
            return [
                {
                    name: 'propertyPath',
                    component: components.ExpressionFormControlComponent,
                    options: {
                        label: 'Property path',
                        dataDictionary$: this.expressionConfigurator.getDataDictionary('propertyPath'),
                        operators: this.expressionConfigurator.getOperators('propertyPath'),
                        isRequired: true
                    }
                },
                {
                    name: 'propertyValue',
                    component: components.ExpressionFormControlComponent,
                    options: {
                        label: 'Property value',
                        dataDictionary$: this.expressionConfigurator.getDataDictionary('propertyValue'),
                        operators: this.expressionConfigurator.getOperators('propertyValue')
                    }
                }
            ];
        };
        return RxSetPropertyViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var RxSetPropertyViewActionDesignManagerService = /** @class */ (function () {
        function RxSetPropertyViewActionDesignManagerService() {
        }
        RxSetPropertyViewActionDesignManagerService.prototype.validate = function (actionProperties, propertyName) {
            return rxjs.of(actionProperties.propertyPath && !/\${view\.components\.([0-9a-z-]+)\..+}/.test(actionProperties.propertyPath)
                ? [
                    {
                        type: 'error',
                        description: 'Set property action: Property path is invalid.',
                        propertyName: propertyName
                    }
                ]
                : []);
        };
        return RxSetPropertyViewActionDesignManagerService;
    }());
    RxSetPropertyViewActionDesignManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSetPropertyViewActionDesignManagerService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSetPropertyViewActionDesignManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSetPropertyViewActionDesignManagerService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSetPropertyViewActionDesignManagerService, decorators: [{
                type: i0.Injectable
            }] });

    var SetPropertyViewActionModule = /** @class */ (function () {
        function SetPropertyViewActionModule(rxViewActionRegistryService, rxSetPropertyViewActionService, rxSetPropertyViewActionDesignManagerService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxSetPropertyViewActionService = rxSetPropertyViewActionService;
            this.rxSetPropertyViewActionDesignManagerService = rxSetPropertyViewActionDesignManagerService;
            this.rxViewActionRegistryService.register({
                name: 'rxSetPropertyAction',
                label: 'Set property',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxSetPropertyViewActionService,
                designModel: RxSetPropertyViewActionDesignModel,
                designManager: rxSetPropertyViewActionDesignManagerService,
                parameters: [
                    {
                        name: 'componentApi',
                        label: 'Component API',
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'propertyPath',
                        label: 'Property path',
                        isRequired: true
                    },
                    {
                        name: 'propertyValue',
                        enableExpressionEvaluation: true
                    }
                ]
            });
        }
        return SetPropertyViewActionModule;
    }());
    SetPropertyViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SetPropertyViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxSetPropertyViewActionService }, { token: RxSetPropertyViewActionDesignManagerService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SetPropertyViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SetPropertyViewActionModule });
    SetPropertyViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SetPropertyViewActionModule, providers: [RxSetPropertyViewActionService, RxSetPropertyViewActionDesignManagerService] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: SetPropertyViewActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        providers: [RxSetPropertyViewActionService, RxSetPropertyViewActionDesignManagerService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxSetPropertyViewActionService }, { type: RxSetPropertyViewActionDesignManagerService }]; } });

    var RxProcessDesignerElementPickerComponent = /** @class */ (function (_super) {
        __extends(RxProcessDesignerElementPickerComponent, _super);
        function RxProcessDesignerElementPickerComponent(rxDesignerStencilBuilder, rxJsonParserService, rxProcessElementsService, renderer, translateService) {
            var _this = _super.call(this) || this;
            _this.rxDesignerStencilBuilder = rxDesignerStencilBuilder;
            _this.rxJsonParserService = rxJsonParserService;
            _this.rxProcessElementsService = rxProcessElementsService;
            _this.renderer = renderer;
            _this.translateService = translateService;
            _this.selection = [];
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        RxProcessDesignerElementPickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            var paletteElementsControl = this.innerValue;
            this.selectedPaletteElements =
                paletteElementsControl === '*' ? '*' : this.rxJsonParserService.tryParseJson(paletteElementsControl, null);
            this.rxDesignerStencilBuilder
                .buildElementsTree(this.rxProcessElementsService.getProcessElements(), i3$3.RX_PROCESS_DEFINITION.standardProcessElementGroups)
                .pipe(operators.take(1))
                .subscribe(function (processElementsTree) {
                var _b;
                lodash.forEach(processElementsTree, function (group) {
                    var _a;
                    group.expanded = true;
                    group.allChildElementsSelected = true;
                    if ((_a = _this.selectedPaletteElements) === null || _a === void 0 ? void 0 : _a.length) {
                        lodash.forEach(group.children, function (element) {
                            if (_this.selectedPaletteElements === '*' ||
                                lodash.some(_this.selectedPaletteElements, function (selectedPaletteElement) { return lodash.isEqual(selectedPaletteElement, element.value); })) {
                                _this.selection.push(element);
                            }
                            else {
                                group.allChildElementsSelected = false;
                            }
                        });
                        if (group.allChildElementsSelected) {
                            _this.selection.push(group);
                        }
                    }
                });
                _this.processElementsTree = [
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.process-designer.all-elements.label'),
                        expanded: true,
                        children: processElementsTree
                    }
                ];
                _this.stencilElements = lodash.flatten(lodash.map(processElementsTree, 'children'));
                if (_this.selectedPaletteElements === '*') {
                    (_b = _this.selection).push.apply(_b, __spreadArray([], __read(_this.processElementsTree)));
                    _this.selectedPaletteElements = lodash.map(_this.stencilElements, 'value');
                }
                _this.updatePickerFakeInputValue();
            });
        };
        RxProcessDesignerElementPickerComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxProcessDesignerElementPickerComponent.prototype.onSelectionChange = function () {
            this.selectedPaletteElements = this.selection.filter(function (node) { return !node.children; }).map(function (node) { return node.value; });
            if (this.selectedPaletteElements.length === 0) {
                this.selectedPaletteElements = null;
                this.value = null;
            }
            else if (this.stencilElements.length === this.selectedPaletteElements.length) {
                this.value = '*';
            }
            else {
                this.value = JSON.stringify(this.selectedPaletteElements);
            }
            this.updatePickerFakeInputValue();
        };
        RxProcessDesignerElementPickerComponent.prototype.updatePickerFakeInputValue = function () {
            if (lodash.isEmpty(this.selectedPaletteElements)) {
                this.selectedPaletteElementsByLabel = '';
            }
            else if (this.stencilElements.length === this.selectedPaletteElements.length) {
                this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.all.label');
            }
            else if (this.selectedPaletteElements.length === 1) {
                this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.process-designer.one-element-selected.label');
            }
            else {
                this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.process-designer.many-elements-selected.label', {
                    count: this.selectedPaletteElements.length
                });
            }
        };
        RxProcessDesignerElementPickerComponent.prototype.clearDefinition = function (e) {
            e.stopPropagation();
            this.selection = [];
            this.selectedPaletteElements = null;
            this.selectedPaletteElementsByLabel = '';
            this.value = null;
        };
        RxProcessDesignerElementPickerComponent.prototype.setDropdownWidth = function () {
            var _this = this;
            setTimeout(function () {
                var dropdownButton = _this.renderer.selectRootElement(_this.dropdownButton.nativeElement, true);
                // 2px - border
                _this.dropdownWidth = Math.max(dropdownButton.clientWidth) + 2;
            });
        };
        return RxProcessDesignerElementPickerComponent;
    }(components.ValueAccessor));
    RxProcessDesignerElementPickerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDesignerElementPickerComponent, deps: [{ token: i1__namespace$4.RxDesignerStencilBuilder }, { token: i1__namespace.RxJsonParserService }, { token: i3__namespace$2.RxProcessElementsService }, { token: i0__namespace.Renderer2 }, { token: i4__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxProcessDesignerElementPickerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessDesignerElementPickerComponent, selector: "rx-process-designer-element-picker", inputs: { options: "options" }, providers: [
            {
                provide: i3$2.NG_VALUE_ACCESSOR,
                useExisting: RxProcessDesignerElementPickerComponent,
                multi: true
            }
        ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<adapt-rx-control-label [label]=\"options.label\"></adapt-rx-control-label>\n\n<div\n  adaptDropdown\n  appendToBody=\"true\"\n  autoClose=\"outside\"\n  class=\"dropdown\"\n  placement=\"bottom-left\"\n  (onOpen)=\"setDropdownWidth()\"\n>\n  <button\n    adaptDropdownToggle\n    class=\"btn btn-secondary d-flex text-center w-100\"\n    rx-id=\"toggle-button\"\n    type=\"button\"\n    #dropdownButton\n  >\n    <span class=\"rx-selected-item text-left flex-grow-1\">{{ selectedPaletteElementsByLabel }}</span>\n\n    <span rx-id=\"clear-button\" class=\"d-icon-cross_adapt btn-link\" (click)=\"clearDefinition($event)\" *ngIf=\"value\">\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu px-3\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <adapt-tree\n      [value]=\"processElementsTree\"\n      [selectionMode]=\"'checkbox'\"\n      [(selection)]=\"selection\"\n      (selectionChange)=\"onSelectionChange()\"\n    ></adapt-tree>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-selected-item{min-height:20px}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}.dropdown-menu{height:400px}\n"], components: [{ type: i1__namespace$2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1__namespace$2.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1__namespace$2.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }], directives: [{ type: i1__namespace$2.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i2__namespace$3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$2.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDesignerElementPickerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-process-designer-element-picker',
                        templateUrl: './process-designer-element-picker.component.html',
                        styleUrls: ['./process-designer-element-picker.component.scss'],
                        providers: [
                            {
                                provide: i3$2.NG_VALUE_ACCESSOR,
                                useExisting: RxProcessDesignerElementPickerComponent,
                                multi: true
                            }
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$4.RxDesignerStencilBuilder }, { type: i1__namespace.RxJsonParserService }, { type: i3__namespace$2.RxProcessElementsService }, { type: i0__namespace.Renderer2 }, { type: i4__namespace$1.TranslateService }]; }, propDecorators: { options: [{
                    type: i0.Input
                }], dropdownButton: [{
                    type: i0.ViewChild,
                    args: ['dropdownButton', { static: true }]
                }] } });

    var ProcessDesignerElementPickerModule = /** @class */ (function () {
        function ProcessDesignerElementPickerModule() {
        }
        return ProcessDesignerElementPickerModule;
    }());
    ProcessDesignerElementPickerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerElementPickerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ProcessDesignerElementPickerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerElementPickerModule, declarations: [RxProcessDesignerElementPickerComponent], imports: [i2$2.CommonModule,
            i3$2.FormsModule,
            i1$3.AdaptRxCheckboxModule, i1__namespace$2.AdaptDropdownModule, i1$3.AdaptRxLabelModule,
            i1$3.AdaptTreeModule], exports: [RxProcessDesignerElementPickerComponent] });
    ProcessDesignerElementPickerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerElementPickerModule, imports: [[
                i2$2.CommonModule,
                i3$2.FormsModule,
                i1$3.AdaptRxCheckboxModule,
                i1$3.AdaptDropdownModule.forRoot(),
                i1$3.AdaptRxLabelModule,
                i1$3.AdaptTreeModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerElementPickerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxProcessDesignerElementPickerComponent],
                        exports: [RxProcessDesignerElementPickerComponent],
                        entryComponents: [RxProcessDesignerElementPickerComponent],
                        imports: [
                            i2$2.CommonModule,
                            i3$2.FormsModule,
                            i1$3.AdaptRxCheckboxModule,
                            i1$3.AdaptDropdownModule.forRoot(),
                            i1$3.AdaptRxLabelModule,
                            i1$3.AdaptTreeModule
                        ]
                    }]
            }] });

    var LaunchProcessDesignerActionDesignModelClass = /** @class */ (function (_super) {
        __extends(LaunchProcessDesignerActionDesignModelClass, _super);
        function LaunchProcessDesignerActionDesignModelClass(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.sandbox = sandbox;
            _this.translateService = _this.injector.get(i4$1.TranslateService);
            _this.sandbox.actionProperties$.pipe(operators.take(1)).subscribe(function () {
                _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig());
                _this.sandbox.setActionOutputDataDictionary([
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.common.process-definition-name.label'),
                        expression: _this.getOutputExpressionForPropertyPath('processDefinitionName')
                    }
                ]);
            });
            return _this;
        }
        LaunchProcessDesignerActionDesignModelClass.getInitialProperties = function (initialProperties) {
            return Object.assign({ processDefinitionName: null, paletteElements: null }, initialProperties);
        };
        LaunchProcessDesignerActionDesignModelClass.prototype.getActionEditorConfig = function () {
            return [
                {
                    name: 'processDefinitionName',
                    component: components.DefinitionPickerOrExpressionFormControlComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.process-definition-name.label'),
                        definitionType: components.RxDefinitionPickerType.Process,
                        dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                        operators: this.expressionConfigurator.getOperators()
                    }
                },
                {
                    name: 'paletteElements',
                    component: RxProcessDesignerElementPickerComponent,
                    options: {
                        label: 'Available palette elements'
                    }
                }
            ];
        };
        return LaunchProcessDesignerActionDesignModelClass;
    }(i3.RxViewDesignerActionModel));

    var RxLaunchProcessDesignerExpressionEvaluatorService = /** @class */ (function () {
        function RxLaunchProcessDesignerExpressionEvaluatorService(rxDefaultExpressionEvaluatorService) {
            this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        }
        RxLaunchProcessDesignerExpressionEvaluatorService.prototype.evaluate = function (expression, data) {
            var evaluatedExpression = expression;
            if (!i4.RX_RECORD_DEFINITION.validFullDefinitionName.test(expression)) {
                evaluatedExpression = this.rxDefaultExpressionEvaluatorService.evaluate(expression, data);
            }
            return evaluatedExpression;
        };
        RxLaunchProcessDesignerExpressionEvaluatorService.prototype.parseExpression = function (expression) {
            var parsedExpression;
            if (!i4.RX_RECORD_DEFINITION.validFullDefinitionName.test(expression)) {
                parsedExpression = this.rxDefaultExpressionEvaluatorService.parseExpression(expression);
            }
            return parsedExpression;
        };
        return RxLaunchProcessDesignerExpressionEvaluatorService;
    }());
    RxLaunchProcessDesignerExpressionEvaluatorService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessDesignerExpressionEvaluatorService, deps: [{ token: i1__namespace$1.RxDefaultExpressionEvaluatorService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLaunchProcessDesignerExpressionEvaluatorService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessDesignerExpressionEvaluatorService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessDesignerExpressionEvaluatorService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxDefaultExpressionEvaluatorService }]; } });

    var ProcessDesignerFrameComponent = /** @class */ (function () {
        function ProcessDesignerFrameComponent(rxApplicationLoaderService, rxBundleCacheService, rxJsonParserService, rxProcessDefinitionCacheService, domSanitizer, activeModalRef, rxUtilityModalsService) {
            this.rxApplicationLoaderService = rxApplicationLoaderService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
            this.domSanitizer = domSanitizer;
            this.activeModalRef = activeModalRef;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.isProcessDesignerLoadingInProgress = true;
            this.isDefinitionDirty = false;
            this.context = activeModalRef;
            var data = this.context.getData();
            localStorage.setItem('ProcessDesignerPaletteElements', data.paletteElements);
            this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl("/com.bmc.arsys.rx.innovationstudio/index.html#/app/bundle/" + this.rxBundleCacheService.bundleId + "/iprocess/" + (data.processDefinitionName ? data.processDefinitionName : ''));
        }
        ProcessDesignerFrameComponent.prototype.onMessage = function (event) {
            var _this = this;
            if (event.data) {
                var message_1 = this.rxJsonParserService.tryParseJson(event.data);
                if (message_1) {
                    switch (message_1.messageType) {
                        case i1$1.RX_DESIGNER.messageTypes.designerLoaded: {
                            this.isProcessDesignerLoadingInProgress = false;
                            break;
                        }
                        case i1$1.RX_DESIGNER.messageTypes.afterSave: {
                            this.isDefinitionDirty = false;
                            break;
                        }
                        case i1$1.RX_DESIGNER.messageTypes.definitionStatusChanged: {
                            this.isDefinitionDirty = message_1.payload.isDirty;
                            break;
                        }
                        case i1$1.RX_DESIGNER.messageTypes.closeDesigner: {
                            if (message_1.payload.processDefinitionName) {
                                if (this.isDefinitionDirty) {
                                    this.rxUtilityModalsService.confirmUnsavedChanges().then(function (isConfirmed) {
                                        if (isConfirmed) {
                                            _this.closeProcessDesigner(message_1.payload.processDefinitionName);
                                        }
                                    });
                                }
                                else {
                                    this.closeProcessDesigner(message_1.payload.processDefinitionName);
                                }
                            }
                            else {
                                if (this.isDefinitionDirty) {
                                    this.rxUtilityModalsService.confirmUnsavedChanges().then(function (isConfirmed) {
                                        if (isConfirmed) {
                                            _this.context.dismiss(i1$3.DismissReasons.CLOSE_BTN);
                                        }
                                    });
                                }
                                else {
                                    this.context.dismiss(i1$3.DismissReasons.CLOSE_BTN);
                                }
                            }
                            break;
                        }
                    }
                }
            }
        };
        ProcessDesignerFrameComponent.prototype.closeProcessDesigner = function (processDefinitionName) {
            this.rxProcessDefinitionCacheService.clearCache([processDefinitionName]);
            this.context.close({ processDefinitionName: processDefinitionName });
        };
        return ProcessDesignerFrameComponent;
    }());
    ProcessDesignerFrameComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerFrameComponent, deps: [{ token: i1__namespace$4.RxApplicationLoaderService }, { token: i1__namespace$4.RxBundleCacheService }, { token: i1__namespace.RxJsonParserService }, { token: i3__namespace$2.RxProcessDefinitionCacheService }, { token: i4__namespace$2.DomSanitizer }, { token: i1__namespace$2.ActiveModalRef }, { token: i2__namespace$2.RxUtilityModalsService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ProcessDesignerFrameComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerFrameComponent, selector: "rx-process-designer-frame", host: { listeners: { "window:message": "onMessage($event)" } }, ngImport: i0__namespace, template: "<div id=\"rx-application-loader-container\" class=\"position-absolute w-100\" *ngIf=\"isProcessDesignerLoadingInProgress\">\n  <div class=\"rx-application-loader\"></div>\n</div>\n\n<iframe [src]=\"iframeSrc\" class=\"h-100\"></iframe>\n", styles: [":host{height:100vh}\n"], directives: [{ type: i2__namespace$3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerFrameComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-process-designer-frame',
                        templateUrl: './process-designer-frame.component.html',
                        styleUrls: ['./process-designer-frame.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$4.RxApplicationLoaderService }, { type: i1__namespace$4.RxBundleCacheService }, { type: i1__namespace.RxJsonParserService }, { type: i3__namespace$2.RxProcessDefinitionCacheService }, { type: i4__namespace$2.DomSanitizer }, { type: i1__namespace$2.ActiveModalRef }, { type: i2__namespace$2.RxUtilityModalsService }]; }, propDecorators: { onMessage: [{
                    type: i0.HostListener,
                    args: ['window:message', ['$event']]
                }] } });

    var RxLaunchProcessDesignerActionService = /** @class */ (function () {
        function RxLaunchProcessDesignerActionService(adaptModalService, rxProcessDefinitionCacheService) {
            this.adaptModalService = adaptModalService;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        }
        RxLaunchProcessDesignerActionService.prototype.execute = function (parameters) {
            var _this = this;
            return parameters.processDefinitionName
                ? this.rxProcessDefinitionCacheService
                    .getProcessDefinition(parameters.processDefinitionName)
                    .pipe(operators.switchMap(function () { return _this.openModal(parameters); }))
                : rxjs.defer(function () { return rxjs.from(_this.openModal(parameters)); });
        };
        RxLaunchProcessDesignerActionService.prototype.openModal = function (parameters) {
            return this.adaptModalService.open({
                content: ProcessDesignerFrameComponent,
                size: i1.OpenViewActionModalSize.FullSize,
                data: parameters
            });
        };
        return RxLaunchProcessDesignerActionService;
    }());
    RxLaunchProcessDesignerActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessDesignerActionService, deps: [{ token: i1__namespace$2.AdaptModalService }, { token: i3__namespace$2.RxProcessDefinitionCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLaunchProcessDesignerActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessDesignerActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLaunchProcessDesignerActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.AdaptModalService }, { type: i3__namespace$2.RxProcessDefinitionCacheService }]; } });

    var LaunchProcessDesignerActionModule = /** @class */ (function () {
        function LaunchProcessDesignerActionModule(rxViewActionRegistryService, rxLaunchProcessDesignerActionService, rxLaunchProcessDesignerExpressionActionEvaluatorService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxLaunchProcessDesignerActionService = rxLaunchProcessDesignerActionService;
            this.rxLaunchProcessDesignerExpressionActionEvaluatorService = rxLaunchProcessDesignerExpressionActionEvaluatorService;
            this.rxViewActionRegistryService.register({
                name: 'rxLaunchProcessDesignerAction',
                label: 'Launch process designer',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                service: this.rxLaunchProcessDesignerActionService,
                designModel: LaunchProcessDesignerActionDesignModelClass,
                parameters: [
                    {
                        name: 'processDefinitionName',
                        label: 'Process definition name',
                        type: i1.ViewComponentPropertyType.String,
                        enableExpressionEvaluation: true,
                        evaluatorService: this.rxLaunchProcessDesignerExpressionActionEvaluatorService
                    },
                    {
                        name: 'paletteElements',
                        label: 'Available palette elements',
                        type: i1.ViewComponentPropertyType.String
                    }
                ]
            });
        }
        return LaunchProcessDesignerActionModule;
    }());
    LaunchProcessDesignerActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessDesignerActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxLaunchProcessDesignerActionService }, { token: RxLaunchProcessDesignerExpressionEvaluatorService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    LaunchProcessDesignerActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessDesignerActionModule, declarations: [ProcessDesignerFrameComponent], imports: [i2$2.CommonModule, i3$3.RxProcessApiModule, components.RxIframeModule] });
    LaunchProcessDesignerActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessDesignerActionModule, providers: [RxLaunchProcessDesignerExpressionEvaluatorService], imports: [[i2$2.CommonModule, i3$3.RxProcessApiModule, components.RxIframeModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: LaunchProcessDesignerActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2$2.CommonModule, i3$3.RxProcessApiModule, components.RxIframeModule],
                        declarations: [ProcessDesignerFrameComponent],
                        entryComponents: [ProcessDesignerFrameComponent],
                        providers: [RxLaunchProcessDesignerExpressionEvaluatorService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxLaunchProcessDesignerActionService }, { type: RxLaunchProcessDesignerExpressionEvaluatorService }]; } });

    var RxUnknownViewActionService = /** @class */ (function () {
        function RxUnknownViewActionService() {
        }
        RxUnknownViewActionService.prototype.execute = function () {
            return rxjs.EMPTY;
        };
        return RxUnknownViewActionService;
    }());
    RxUnknownViewActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownViewActionService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUnknownViewActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownViewActionService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownViewActionService, decorators: [{
                type: i0.Injectable
            }] });

    var RxUnknownViewActionDesignManager = /** @class */ (function () {
        function RxUnknownViewActionDesignManager() {
        }
        RxUnknownViewActionDesignManager.prototype.validate = function (actionProperties, propertyName) {
            return rxjs.of([
                {
                    type: 'error',
                    description: "Unknown action: " + actionProperties.name,
                    propertyName: propertyName
                }
            ]);
        };
        return RxUnknownViewActionDesignManager;
    }());
    RxUnknownViewActionDesignManager.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownViewActionDesignManager, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxUnknownViewActionDesignManager.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownViewActionDesignManager });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxUnknownViewActionDesignManager, decorators: [{
                type: i0.Injectable
            }] });

    var RxUnknownViewActionDesignModel = /** @class */ (function (_super) {
        __extends(RxUnknownViewActionDesignModel, _super);
        function RxUnknownViewActionDesignModel(injector, sandbox) {
            var _this = _super.call(this, injector, sandbox) || this;
            _this.injector = injector;
            _this.sandbox = sandbox;
            _this.sandbox.actionProperties$.pipe(operators.take(1)).subscribe(function (actionProperties) {
                _this.sandbox.setActionPropertyEditorConfig(_this.getActionEditorConfig(actionProperties));
            });
            return _this;
        }
        RxUnknownViewActionDesignModel.prototype.getActionEditorConfig = function (actionProperties) {
            return lodash.keys(actionProperties).map(function (propertyName) { return ({
                name: propertyName,
                component: components.TextFormControlComponent,
                isDisabled: true,
                options: {
                    label: propertyName
                }
            }); });
        };
        return RxUnknownViewActionDesignModel;
    }(i3.RxViewDesignerActionModel));

    var UnknownViewActionModule = /** @class */ (function () {
        function UnknownViewActionModule(rxViewActionRegistryService, rxUnknownViewActionService, rxUnknownViewActionDesignManager) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxUnknownViewActionService = rxUnknownViewActionService;
            this.rxUnknownViewActionDesignManager = rxUnknownViewActionDesignManager;
            this.rxViewActionRegistryService.register({
                name: 'rxUnknownViewAction',
                label: 'Unknown',
                bundleId: i1$1.RX_APPLICATION.platformBundleId,
                designModel: RxUnknownViewActionDesignModel,
                designManager: this.rxUnknownViewActionDesignManager,
                service: this.rxUnknownViewActionService,
                parameters: [],
                hidden: true
            });
        }
        return UnknownViewActionModule;
    }());
    UnknownViewActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UnknownViewActionModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxUnknownViewActionService }, { token: RxUnknownViewActionDesignManager }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    UnknownViewActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UnknownViewActionModule });
    UnknownViewActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UnknownViewActionModule, providers: [RxUnknownViewActionService, RxUnknownViewActionDesignManager] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UnknownViewActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        providers: [RxUnknownViewActionService, RxUnknownViewActionDesignManager]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxUnknownViewActionService }, { type: RxUnknownViewActionDesignManager }]; } });

    var ViewActionsModule = /** @class */ (function () {
        function ViewActionsModule() {
        }
        return ViewActionsModule;
    }());
    ViewActionsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewActionsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsModule, imports: [ApplyGridFilterViewActionModule,
            AssociateViewActionModule,
            AvcAssociateActionModule,
            CloseViewActionModule,
            DeleteRecordsViewActionModule,
            DisassociateViewActionModule,
            EditRecordsViewActionModule,
            LaunchProcessViewActionModule,
            LaunchProcessDesignerActionModule,
            LaunchUrlViewActionModule,
            OpenViewActionModule,
            RefreshViewActionModule,
            SaveViewActionModule,
            SetPropertyViewActionModule,
            UnknownViewActionModule] });
    ViewActionsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsModule, imports: [[
                ApplyGridFilterViewActionModule,
                AssociateViewActionModule,
                AvcAssociateActionModule,
                CloseViewActionModule,
                DeleteRecordsViewActionModule,
                DisassociateViewActionModule,
                EditRecordsViewActionModule,
                LaunchProcessViewActionModule,
                LaunchProcessDesignerActionModule,
                LaunchUrlViewActionModule,
                OpenViewActionModule,
                RefreshViewActionModule,
                SaveViewActionModule,
                SetPropertyViewActionModule,
                UnknownViewActionModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            ApplyGridFilterViewActionModule,
                            AssociateViewActionModule,
                            AvcAssociateActionModule,
                            CloseViewActionModule,
                            DeleteRecordsViewActionModule,
                            DisassociateViewActionModule,
                            EditRecordsViewActionModule,
                            LaunchProcessViewActionModule,
                            LaunchProcessDesignerActionModule,
                            LaunchUrlViewActionModule,
                            OpenViewActionModule,
                            RefreshViewActionModule,
                            SaveViewActionModule,
                            SetPropertyViewActionModule,
                            UnknownViewActionModule
                        ]
                    }]
            }] });

    var RxApplyGridFilterViewActionDesignManagerService = /** @class */ (function () {
        function RxApplyGridFilterViewActionDesignManagerService(viewDesignerFacade, rxRecordGridDesignUtilsService, rxRecordGridFilterHelperService) {
            var _this = this;
            this.viewDesignerFacade = viewDesignerFacade;
            this.rxRecordGridDesignUtilsService = rxRecordGridDesignUtilsService;
            this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
            var applyGridFilterActions$ = this.viewDesignerFacade
                .getComponentsByType(i1.RxViewComponentType.Action)
                .pipe(operators.map(function (components) { return components.filter(function (comp) { return comp.data.name === RxApplyGridFilterActionName; }); }), operators.shareReplay({ refCount: true, bufferSize: 1 }));
            var gridGuids$ = applyGridFilterActions$.pipe(operators.map(function (actions) { return actions.map(function (action) { return RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression(action.data.targetApi); }); }), operators.map(function (guids) { return lodash.sortBy(lodash.uniq(lodash.compact(guids))); }), operators.filter(function (guids) { return Boolean(guids.length); }), operators.distinctUntilChanged(function (a, b) { return lodash.isEqual(a, b); }), operators.shareReplay({ refCount: true, bufferSize: 1 }));
            var updateActionFiltersOnGridColumnsChange$ = gridGuids$.pipe(operators.switchMap(function (gridGuids) {
                var actionsToUpdate$ = gridGuids.map(function (gridGuid) { return _this.getActionsToUpdate(gridGuid, applyGridFilterActions$); });
                return rxjs.merge.apply(void 0, __spreadArray([], __read(actionsToUpdate$)));
            }));
            var clearFiltersOnGridDefinitionChange$ = gridGuids$.pipe(operators.switchMap(function (gridGuids) {
                var actionsToUpdate$ = gridGuids.map(function (gridGuid) { return _this.getGridDefinitionChanges(gridGuid).pipe(operators.skip(1), operators.map(function () { return gridGuid; }), operators.withLatestFrom(applyGridFilterActions$), operators.map(function (_a) {
                    var _b = __read(_a, 2), guid = _b[0], actions = _b[1];
                    var affectedActions = actions.filter(function (action) { return action.data.targetApi.includes(guid); });
                    return affectedActions.map(function (actionComponent) {
                        var updatedActionComponent = lodash.cloneDeep(actionComponent);
                        updatedActionComponent.data.filters = null;
                        return {
                            component: updatedActionComponent,
                            children: []
                        };
                    });
                })); });
                return rxjs.merge.apply(void 0, __spreadArray([], __read(actionsToUpdate$)));
            }));
            rxjs.merge(clearFiltersOnGridDefinitionChange$, updateActionFiltersOnGridColumnsChange$).subscribe(function (components) {
                components.forEach(function (item) {
                    _this.viewDesignerFacade.updateComponentProperties(item.component.guid, item.component.data);
                    _this.viewDesignerFacade.setChildren(item.component.guid, item.children);
                });
            });
        }
        RxApplyGridFilterViewActionDesignManagerService.prototype.getActionsToUpdate = function (gridGuid, applyGridFilterActions$) {
            var _this = this;
            return this.getGridColumnChanges(gridGuid).pipe(operators.skip(1), operators.withLatestFrom(applyGridFilterActions$), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), gridData = _b[0], actions = _b[1];
                // getting actions bound to changed grid
                var affectedActions = actions.filter(function (action) { return action.data.targetApi.includes(gridData.guid); });
                var actionsWithFilters$ = affectedActions.map(function (action) { return _this.viewDesignerFacade.getChildComponents(action.guid).pipe(operators.map(function (filterComponents) { return (Object.assign(Object.assign({}, lodash.cloneDeep(action)), { children: filterComponents })); }), operators.take(1)); });
                return rxjs.forkJoin(actionsWithFilters$).pipe(operators.map(function (actionComponents) {
                    var gridColumnIds = gridData.columns.map(function (col) { return col.fieldId; });
                    return actionComponents.reduce(function (result, actionComponent) {
                        var componentsToUpdate = _this.getUpdatedFilterComponents(lodash.omit(actionComponent, 'children'), actionComponent.children, gridColumnIds);
                        return componentsToUpdate ? result.concat(componentsToUpdate) : result;
                    }, []);
                }));
            }));
        };
        RxApplyGridFilterViewActionDesignManagerService.prototype.getGridColumnChanges = function (guid) {
            return this.viewDesignerFacade
                .getComponentPropertyValue(guid, 'columns')
                .pipe(operators.filter(function (columns) { return Array.isArray(columns); }), operators.map(function (columns) { return ({
                guid: guid,
                columns: columns.map(function (col) { return ({
                    fieldId: col.fieldId,
                    namedFilterOptions: col.namedFilterOptions
                }); })
            }); }), operators.distinctUntilChanged(lodash.isEqual));
        };
        RxApplyGridFilterViewActionDesignManagerService.prototype.getGridDefinitionChanges = function (guid) {
            return this.viewDesignerFacade.getComponentPropertyValue(guid, 'recordDefinitionName').pipe(operators.distinctUntilChanged());
        };
        RxApplyGridFilterViewActionDesignManagerService.prototype.getUpdatedFilterComponents = function (component, filterComponents, gridColumnIds) {
            var filterComponentsForColumns = filterComponents.filter(function (item) { return gridColumnIds.includes(item.data.fieldId); });
            if (filterComponentsForColumns.length !== filterComponents.length) {
                var updatedFilterComponents = this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(filterComponentsForColumns);
                var newFilterData = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(component.data.filters, updatedFilterComponents);
                // updating filters JSON after column remove
                component.data.filters = newFilterData
                    ? this.rxRecordGridFilterHelperService.denormalizeFilterString(JSON.stringify(newFilterData), updatedFilterComponents)
                    : null;
                return {
                    component: component,
                    children: filterComponentsForColumns
                };
            }
            return null;
        };
        RxApplyGridFilterViewActionDesignManagerService.prototype.validate = function (actionProperties, propertyName) {
            var _this = this;
            var filterValidation = !actionProperties.filters &&
                !lodash.includes([i1.ApplyGridFilterMode.Begin, i1.ApplyGridFilterMode.End, i1.ApplyGridFilterMode.Clear], actionProperties.mode)
                ? {
                    type: 'error',
                    description: 'Apply grid filter action: Filter is required',
                    propertyName: propertyName
                }
                : null;
            return rxjs.of(actionProperties.targetApi).pipe(operators.map(function (targetApi) { return RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression(targetApi); }), operators.switchMap(function (guid) { return (guid ? _this.viewDesignerFacade.getComponent(guid) : rxjs.of(null)); }), operators.take(1), operators.map(function (item) {
                var issues = [];
                if (actionProperties.targetApi && (item === null || item === void 0 ? void 0 : item.type) !== i2.RX_RECORD_GRID.type) {
                    issues.push({
                        type: 'error',
                        description: 'Apply grid filter action: Record grid expression must point to a record grid.',
                        propertyName: propertyName
                    });
                }
                if (actionProperties.targetApi && !issues.length && filterValidation) {
                    issues.push(filterValidation);
                }
                return issues;
            }));
        };
        return RxApplyGridFilterViewActionDesignManagerService;
    }());
    RxApplyGridFilterViewActionDesignManagerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionDesignManagerService, deps: [{ token: i3__namespace$3.ViewDesignerFacade }, { token: i2__namespace.RxRecordGridDesignUtilsService }, { token: i2__namespace.RxRecordGridFilterHelperService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApplyGridFilterViewActionDesignManagerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionDesignManagerService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApplyGridFilterViewActionDesignManagerService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i3__namespace$3.ViewDesignerFacade }, { type: i2__namespace.RxRecordGridDesignUtilsService }, { type: i2__namespace.RxRecordGridFilterHelperService }]; } });

    var ApplyGridFilterViewActionDesignModule = /** @class */ (function () {
        function ApplyGridFilterViewActionDesignModule(rxViewActionRegistryService, rxApplyGridFilterViewActionDesignManagerService) {
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxApplyGridFilterViewActionDesignManagerService = rxApplyGridFilterViewActionDesignManagerService;
            this.rxViewActionRegistryService.registerDesignManager(RxApplyGridFilterActionName, rxApplyGridFilterViewActionDesignManagerService);
        }
        return ApplyGridFilterViewActionDesignModule;
    }());
    ApplyGridFilterViewActionDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionDesignModule, deps: [{ token: i1__namespace$1.RxViewActionRegistryService }, { token: RxApplyGridFilterViewActionDesignManagerService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ApplyGridFilterViewActionDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionDesignModule });
    ApplyGridFilterViewActionDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionDesignModule, providers: [RxApplyGridFilterViewActionDesignManagerService] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApplyGridFilterViewActionDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        providers: [RxApplyGridFilterViewActionDesignManagerService]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxViewActionRegistryService }, { type: RxApplyGridFilterViewActionDesignManagerService }]; } });

    var ViewActionsDesignModule = /** @class */ (function () {
        function ViewActionsDesignModule() {
        }
        return ViewActionsDesignModule;
    }());
    ViewActionsDesignModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsDesignModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ViewActionsDesignModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsDesignModule, imports: [ViewActionsModule, ApplyGridFilterViewActionDesignModule] });
    ViewActionsDesignModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsDesignModule, imports: [[ViewActionsModule, ApplyGridFilterViewActionDesignModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewActionsDesignModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [ViewActionsModule, ApplyGridFilterViewActionDesignModule]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ApplyGridFilterViewActionModule = ApplyGridFilterViewActionModule;
    exports.AssociateViewActionModule = AssociateViewActionModule;
    exports.AvcAssociateActionModule = AvcAssociateActionModule;
    exports.CloseViewActionModule = CloseViewActionModule;
    exports.DeleteRecordsViewActionModule = DeleteRecordsViewActionModule;
    exports.DisassociateViewActionModule = DisassociateViewActionModule;
    exports.EditRecordsViewActionModule = EditRecordsViewActionModule;
    exports.LaunchProcessDesignerActionModule = LaunchProcessDesignerActionModule;
    exports.LaunchProcessViewActionModule = LaunchProcessViewActionModule;
    exports.LaunchUrlViewActionModule = LaunchUrlViewActionModule;
    exports.OpenViewActionModule = OpenViewActionModule;
    exports.ProcessDesignerElementPickerModule = ProcessDesignerElementPickerModule;
    exports.RX_OPEN_VIEW = RX_OPEN_VIEW;
    exports.RefreshViewActionModule = RefreshViewActionModule;
    exports.RxApplyGridFilterActionName = RxApplyGridFilterActionName;
    exports.RxApplyGridFilterViewActionService = RxApplyGridFilterViewActionService;
    exports.RxAssociateViewActionService = RxAssociateViewActionService;
    exports.RxAvcAssociateActionService = RxAvcAssociateActionService;
    exports.RxCloseViewActionService = RxCloseViewActionService;
    exports.RxDeleteRecordsViewActionService = RxDeleteRecordsViewActionService;
    exports.RxDisassociateViewActionService = RxDisassociateViewActionService;
    exports.RxEditRecordsViewActionService = RxEditRecordsViewActionService;
    exports.RxLaunchProcessDesignerActionService = RxLaunchProcessDesignerActionService;
    exports.RxLaunchProcessViewActionService = RxLaunchProcessViewActionService;
    exports.RxLaunchUrlViewActionService = RxLaunchUrlViewActionService;
    exports.RxOpenViewActionService = RxOpenViewActionService;
    exports.RxOpenViewModelHelperService = RxOpenViewModelHelperService;
    exports.RxProcessDesignerElementPickerComponent = RxProcessDesignerElementPickerComponent;
    exports.RxRefreshViewActionService = RxRefreshViewActionService;
    exports.RxSaveViewActionService = RxSaveViewActionService;
    exports.RxSetPropertyViewActionService = RxSetPropertyViewActionService;
    exports.RxUnknownViewActionDesignManager = RxUnknownViewActionDesignManager;
    exports.RxUnknownViewActionService = RxUnknownViewActionService;
    exports.SaveViewActionModule = SaveViewActionModule;
    exports.SetPropertyViewActionModule = SetPropertyViewActionModule;
    exports.UnknownViewActionModule = UnknownViewActionModule;
    exports.ViewActionsDesignModule = ViewActionsDesignModule;
    exports.ViewActionsModule = ViewActionsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-view-actions.umd.js.map
