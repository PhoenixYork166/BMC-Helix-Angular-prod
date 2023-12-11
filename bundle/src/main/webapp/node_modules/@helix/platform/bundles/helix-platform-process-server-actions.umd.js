(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/shared/api'), require('@helix/platform/process/api'), require('@helix/platform/process/elements'), require('@ngx-translate/core'), require('@helix/platform/ui-kit'), require('@helix/platform/shared/components'), require('lodash'), require('@angular/common'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@helix/platform/utils'), require('@helix/platform/record/api')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/process/server-actions', ['exports', '@angular/core', '@helix/platform/shared/api', '@helix/platform/process/api', '@helix/platform/process/elements', '@ngx-translate/core', '@helix/platform/ui-kit', '@helix/platform/shared/components', 'lodash', '@angular/common', '@angular/forms', 'rxjs', 'rxjs/operators', '@helix/platform/utils', '@helix/platform/record/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.process = global.helix.platform.process || {}, global.helix.platform.process["server-actions"] = {}), global.ng.core, global.helix.platform.shared.api, global.helix.platform.process.api, global.helix.platform.process.elements, global.i3, global.helix.platform["ui-kit"], global.helix.platform.shared.components, global.lodash, global.ng.common, global.ng.forms, global.rxjs, global.rxjs.operators, global.helix.platform.utils, global.helix.platform.record.api));
})(this, (function (exports, i0, i1, i2, elements, i3, uiKit, i1$1, lodash, i4, i5, rxjs, operators, i2$1, i3$1) { 'use strict';

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
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);

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

    var RxCreateListProcessAction = /** @class */ (function (_super) {
        __extends(RxCreateListProcessAction, _super);
        function RxCreateListProcessAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxCreateListProcessAction.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        return RxCreateListProcessAction;
    }(elements.RxProcessAction));

    var RxCreateListProcessActionService = /** @class */ (function (_super) {
        __extends(RxCreateListProcessActionService, _super);
        function RxCreateListProcessActionService(rxProcessDefinitionService, injector) {
            var _this = _super.call(this, injector) || this;
            _this.rxProcessDefinitionService = rxProcessDefinitionService;
            _this.injector = injector;
            return _this;
        }
        RxCreateListProcessActionService.prototype.getInputMapInspectorWidgetConfig = function () {
            return {
                component: elements.RxExpressionInputMapInspectorWidgetComponent,
                options: {
                    expressionConfigurator: this.getExpressionConfigurator(),
                    expressionInputMapInspectorOptions: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.source-list.label'),
                            name: 'Source List'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.item-to-add.label'),
                            name: 'Item To Add'
                        }
                    ]
                }
            };
        };
        RxCreateListProcessActionService.prototype.getElementType = function (actionTypeName) {
            return this.rxProcessDefinitionService.getServerActionModelType(actionTypeName);
        };
        RxCreateListProcessActionService.prototype.getClass = function () {
            return joint.shapes.rx.ProcessActions.createList;
        };
        return RxCreateListProcessActionService;
    }(elements.RxProcessActionService));
    RxCreateListProcessActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListProcessActionService, deps: [{ token: i2__namespace.RxProcessDefinitionService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCreateListProcessActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListProcessActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListProcessActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.RxProcessDefinitionService }, { type: i0__namespace.Injector }]; } });

    var RxCreateListRegistrationModule = /** @class */ (function () {
        function RxCreateListRegistrationModule(rxCreateListProcessActionService, rxProcessElementRegistryService, translateService) {
            rxProcessElementRegistryService.register({
                displayName: translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.create-list.name.label'),
                elementService: rxCreateListProcessActionService,
                group: i2.RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
                paletteItem: {
                    border: i1.RX_DESIGNER.paletteItemBorder.solid,
                    icon: {
                        path: i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                        position: i1.RX_DESIGNER.paletteIconPosition.top
                    },
                    label: i1.RX_DESIGNER.paletteItemLabel.inner,
                    shape: i1.RX_DESIGNER.paletteItemShape.rectangle
                },
                resourceType: i2.RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                shapeClass: RxCreateListProcessAction,
                shapeType: 'ProcessActions.createList',
                type: 'rx.ProcessActions.createList',
                viewShapeClass: elements.RxProcessActionView,
                viewShapeType: 'ProcessActions.createListView'
            });
        }
        return RxCreateListRegistrationModule;
    }());
    RxCreateListRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListRegistrationModule, deps: [{ token: RxCreateListProcessActionService }, { token: i2__namespace.RxProcessElementRegistryService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxCreateListRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListRegistrationModule, imports: [elements.RxExpressionInputMapInspectorWidgetModule] });
    RxCreateListRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListRegistrationModule, imports: [[elements.RxExpressionInputMapInspectorWidgetModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCreateListRegistrationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [elements.RxExpressionInputMapInspectorWidgetModule]
                    }]
            }], ctorParameters: function () { return [{ type: RxCreateListProcessActionService }, { type: i2__namespace.RxProcessElementRegistryService }, { type: i3__namespace.TranslateService }]; } });

    var RX_RECORD_SERVER_ACTION = {
        dynamicRecordDefinitionNameRegex: /\${.*}/
    };

    function RxRecordServerActionMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxRecordServerAction, _super);
            function RxRecordServerAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RxRecordServerAction.prototype.initialize = function (config) {
                // @ts-ignore
                _super.prototype.initialize.call(this, config);
                this.lastRecordDefinitionName = this.getRecordDefinitionName();
                this.lastSampleRecordDefinitionName = this.getSampleRecordDefinitionName();
                if (this.lastRecordDefinitionName) {
                    if (this.lastRecordDefinitionName.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        this.selectExpressionDropdownValue = i1$1.RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.expression;
                    }
                    else {
                        this.selectExpressionDropdownValue = i1$1.RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.select;
                    }
                }
            };
            RxRecordServerAction.prototype.afterRecordDefinitionNameChange = function (recordDefinitionName) {
                this.lastRecordDefinitionName = recordDefinitionName;
                // @ts-ignore
                this.getCommandManager().storeBatchCommand();
            };
            RxRecordServerAction.prototype.afterSampleRecordDefinitionNameChange = function (sampleRecordDefinitionName) {
                this.lastSampleRecordDefinitionName = sampleRecordDefinitionName;
                // @ts-ignore
                this.getCommandManager().storeBatchCommand();
            };
            RxRecordServerAction.prototype.getRecordDefinitionName = function () {
                // @ts-ignore
                var recordDefinitionName = this.getInputMap().recordDefinitionName;
                return recordDefinitionName ? recordDefinitionName.replace(/^"|"$/g, '') : null;
            };
            RxRecordServerAction.prototype.getRecordDefinitionNameChangeConfirmationMessageKey = function () {
                return 'com.bmc.arsys.rx.client.process-designer.inspector.clear-input-output-maps-confirmation.message';
            };
            RxRecordServerAction.prototype.getSampleRecordDefinitionName = function () {
                // @ts-ignore
                var sampleRecordDefinitionName = this.getInputMap().sampleRecordDefinitionName;
                return sampleRecordDefinitionName ? sampleRecordDefinitionName.replace(/^"|"$/g, '') : null;
            };
            RxRecordServerAction.prototype.onInputMapChanged = function (element, inputMap, inputMapPropertyPath, inputMapPropertyValue, isCommandManagerOperation) {
                var _this = this;
                if (inputMapPropertyPath === 'recordDefinitionName') {
                    if (isCommandManagerOperation) {
                        this.lastRecordDefinitionName = inputMapPropertyValue;
                    }
                    else if (inputMapPropertyValue !== this.lastRecordDefinitionName) {
                        // @ts-ignore
                        this.getCommandManager().initBatchCommand();
                        // @ts-ignore
                        if (this.lastRecordDefinitionName) {
                            i1.RxRootInjector.injector
                                .get(uiKit.RxModalService)
                                .confirm({
                                title: i1.RxRootInjector.injector
                                    .get(i3.TranslateService)
                                    .instant('com.bmc.arsys.rx.client.common.warning.label'),
                                modalStyle: uiKit.RX_MODAL.modalStyles.warning,
                                message: i1.RxRootInjector.injector
                                    .get(i3.TranslateService)
                                    .instant(this.getRecordDefinitionNameChangeConfirmationMessageKey())
                            })
                                .then(function (context) {
                                if (context) {
                                    _this.afterRecordDefinitionNameChange(inputMapPropertyValue);
                                }
                                else {
                                    // @ts-ignore
                                    _this.getCommandManager().storeBatchCommand();
                                    // @ts-ignore
                                    _this.getCommandManager().cancel();
                                }
                            })
                                .catch(function () {
                                // @ts-ignore
                                _this.getCommandManager().storeBatchCommand();
                                // @ts-ignore
                                _this.getCommandManager().cancel();
                            });
                        }
                        else {
                            this.afterRecordDefinitionNameChange(inputMapPropertyValue);
                        }
                    }
                    if (inputMapPropertyValue) {
                        if (inputMapPropertyValue.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                            this.selectExpressionDropdownValue = i1$1.RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.expression;
                        }
                        else {
                            this.selectExpressionDropdownValue = i1$1.RX_SELECT_EXPRESSION_DROPDOWN.dropDownOptionsValue.select;
                        }
                    }
                }
                if (inputMapPropertyPath === 'sampleRecordDefinitionName') {
                    if (isCommandManagerOperation) {
                        this.lastSampleRecordDefinitionName = inputMapPropertyValue;
                    }
                    else if (inputMapPropertyValue !== this.lastSampleRecordDefinitionName) {
                        // @ts-ignore
                        this.getCommandManager().initBatchCommand();
                        if (this.lastSampleRecordDefinitionName) {
                            i1.RxRootInjector.injector
                                .get(uiKit.RxModalService)
                                .confirm({
                                title: i1.RxRootInjector.injector
                                    .get(i3.TranslateService)
                                    .instant('com.bmc.arsys.rx.client.common.warning.label'),
                                modalStyle: uiKit.RX_MODAL.modalStyles.warning,
                                message: i1.RxRootInjector.injector
                                    .get(i3.TranslateService)
                                    .instant(this.getRecordDefinitionNameChangeConfirmationMessageKey())
                            })
                                .then(function () {
                                _this.afterSampleRecordDefinitionNameChange(inputMapPropertyValue);
                            })
                                .catch(function () {
                                // @ts-ignore
                                _this.getCommandManager().storeBatchCommand();
                                // @ts-ignore
                                _this.getCommandManager().cancel();
                            });
                        }
                        else {
                            this.afterSampleRecordDefinitionNameChange(inputMapPropertyValue);
                        }
                    }
                }
            };
            return RxRecordServerAction;
        }(Base));
    }

    function RxGetRecordServerActionMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxGetRecordServerAction, _super);
            function RxGetRecordServerAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RxGetRecordServerAction.prototype.initialize = function (config) {
                // @ts-ignore
                _super.prototype.initialize.call(this, config);
            };
            RxGetRecordServerAction.prototype.afterRecordDefinitionNameChange = function (inputMapPropertyValue) {
                // @ts-ignore
                this.lastRecordDefinitionName = inputMapPropertyValue;
                // @ts-ignore
                this.clearOutputMap();
                // @ts-ignore
                this.setInputMap(
                // @ts-ignore
                lodash.assign(this.getInputMap(), {
                    // @ts-ignore
                    recordDefinitionName: this.lastRecordDefinitionName,
                    sampleRecordDefinitionName: null,
                    attachmentFieldID: ''
                }));
                // @ts-ignore
                this.getCommandManager().storeBatchCommand();
            };
            RxGetRecordServerAction.prototype.afterSampleRecordDefinitionNameChange = function (inputMapPropertyValue) {
                // @ts-ignore
                this.lastSampleRecordDefinitionName = inputMapPropertyValue;
                // @ts-ignore
                this.clearOutputMap();
                // @ts-ignore
                this.setInputMap(
                // @ts-ignore
                lodash.assign(this.getInputMap(), {
                    // @ts-ignore
                    recordDefinitionName: this.lastRecordDefinitionName,
                    // @ts-ignore
                    sampleRecordDefinitionName: this.lastSampleRecordDefinitionName
                }));
                // @ts-ignore
                this.getCommandManager().storeBatchCommand();
            };
            RxGetRecordServerAction.prototype.getRecordDefinitionNameChangeConfirmationMessageKey = function () {
                return 'com.bmc.arsys.rx.client.process-designer.inspector.clear-output-map-confirmation.message';
            };
            return RxGetRecordServerAction;
        }(Base));
    }

    var RxGetRecordProcessAction = /** @class */ (function (_super) {
        __extends(RxGetRecordProcessAction, _super);
        function RxGetRecordProcessAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxGetRecordProcessAction.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        return RxGetRecordProcessAction;
    }(RxGetRecordServerActionMixin(RxRecordServerActionMixin(elements.RxProcessAction))));

    var RxGetRecordInputMapInspectorWidgetComponent = /** @class */ (function (_super) {
        __extends(RxGetRecordInputMapInspectorWidgetComponent, _super);
        function RxGetRecordInputMapInspectorWidgetComponent(rxExpressionEditorService, rxIdService, translateService, injector) {
            var _this = _super.call(this, injector) || this;
            _this.rxExpressionEditorService = rxExpressionEditorService;
            _this.rxIdService = rxIdService;
            _this.translateService = translateService;
            _this.injector = injector;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        RxGetRecordInputMapInspectorWidgetComponent.prototype.ngOnInit = function () {
            this.elementModel$ = this.designerItemModel.pipe(operators.pluck('elementModel'), operators.takeUntil(this.destroyed$));
            this.isDynamicRecordDefinitionName$ = this.elementModel$.pipe(operators.map(function (elementModel) { return elementModel === null || elementModel === void 0 ? void 0 : elementModel.inputMap.recordDefinitionName; }), operators.distinctUntilChanged(), operators.map(function (recordDefinitionName) {
                return RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex.test(recordDefinitionName);
            }));
            this.graph$ = this.designerItemModel.pipe(operators.pluck('graph'), operators.takeUntil(this.destroyed$));
            this.patchOptions(this.options);
        };
        RxGetRecordInputMapInspectorWidgetComponent.prototype.ngOnChanges = function (changes) {
            if (!lodash.isEqual(changes.options.currentValue, changes.options.previousValue)) {
                this.patchOptions(changes.options.currentValue);
            }
        };
        RxGetRecordInputMapInspectorWidgetComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxGetRecordInputMapInspectorWidgetComponent.prototype.onRecordDefinitionChange = function (recordDefinitionName, elementModel) {
            var _this = this;
            this.graph$.pipe(operators.take(1)).subscribe(function (graph) {
                var selectedElementCell = graph.getCell(_this.rxIdService.getBase(elementModel.guid));
                selectedElementCell.prop("elementModel/inputMap/recordDefinitionName", recordDefinitionName);
            });
        };
        RxGetRecordInputMapInspectorWidgetComponent.prototype.onSampleRecordDefinitionChange = function (sampleRecordDefinitionName, elementModel) {
            var _this = this;
            this.graph$.pipe(operators.take(1)).subscribe(function (graph) {
                var selectedElementCell = graph.getCell(_this.rxIdService.getBase(elementModel.guid));
                selectedElementCell.prop("elementModel/inputMap/sampleRecordDefinitionName", sampleRecordDefinitionName);
            });
        };
        RxGetRecordInputMapInspectorWidgetComponent.prototype.openExpressionEditor = function (elementModel) {
            var _this = this;
            this.graph$.pipe(operators.take(1)).subscribe(function (graph) {
                _this.rxExpressionEditorService
                    .openEditor({
                    expressionConfigurator: _this.options.expressionConfigurator,
                    isReadOnly: false,
                    legend: [
                        {
                            label: _this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ],
                    property: {
                        path: 'inputMap/recordID',
                        value: elementModel.inputMap.recordID,
                        label: 'Record ID'
                    }
                })
                    .pipe(operators.takeUntil(_this.destroyed$))
                    .subscribe(function (expression) {
                    var selectedElementCell = graph.getCell(_this.rxIdService.getBase(elementModel.guid));
                    selectedElementCell.prop("elementModel/inputMap/recordID", expression.value);
                });
            });
        };
        RxGetRecordInputMapInspectorWidgetComponent.prototype.patchOptions = function (options) {
            this.recordDefinitionPickerOptions = {
                label: 'Record definition name',
                definitionType: i1$1.RxDefinitionPickerType.Record,
                required: true
            };
            this.sampleRecordDefinitionPickerOptions = {
                label: 'Sample record definition name',
                definitionType: i1$1.RxDefinitionPickerType.Record,
                required: true
            };
            this.recordIDExpressionOptions = {
                label: 'Record ID',
                dataDictionary$: options.expressionConfigurator.getDataDictionary('inputMap/recordID'),
                operators: options.expressionConfigurator.getOperators('inputMap/recordID'),
                isRequired: true
            };
        };
        return RxGetRecordInputMapInspectorWidgetComponent;
    }(i1$1.InspectorWidgetBase));
    RxGetRecordInputMapInspectorWidgetComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordInputMapInspectorWidgetComponent, deps: [{ token: i1__namespace.RxExpressionEditorService }, { token: i2__namespace$1.RxIdService }, { token: i3__namespace.TranslateService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxGetRecordInputMapInspectorWidgetComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxGetRecordInputMapInspectorWidgetComponent, selector: "rx-get-record-input-map-inspector-widget", usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<div *ngIf=\"elementModel$ | async as elementModel\">\n  <rx-definition-picker\n    name=\"recordDefinition\"\n    rx-id=\"record-definition\"\n    [options]=\"recordDefinitionPickerOptions\"\n    [ngModel]=\"elementModel.inputMap.recordDefinitionName\"\n    (ngModelChange)=\"onRecordDefinitionChange($event, elementModel)\"\n  >\n  </rx-definition-picker>\n\n  <rx-definition-picker\n    *ngIf=\"isDynamicRecordDefinitionName$ | async\"\n    name=\"sampleRecordDefinition\"\n    rx-id=\"sample-record-definition\"\n    [options]=\"sampleRecordDefinitionPickerOptions\"\n    [ngModel]=\"elementModel.inputMap.sampleRecordDefinitionName\"\n    (ngModelChange)=\"onSampleRecordDefinitionChange($event, elementModel)\"\n  >\n  </rx-definition-picker>\n\n  <rx-expression-form-control\n    rx-id=\"record-id\"\n    [options]=\"recordIDExpressionOptions\"\n    [propertyPath]=\"'inputMap/recordID'\"\n    [ngModel]=\"elementModel.inputMap.recordID\"\n    (events)=\"openExpressionEditor(elementModel)\"\n  >\n  </rx-expression-form-control>\n</div>\n", styles: [":host::ng-deep rx-definition-picker .dropdown{margin-bottom:15px}\n"], components: [{ type: i1__namespace.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1__namespace.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordInputMapInspectorWidgetComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-get-record-input-map-inspector-widget',
                        templateUrl: './get-record-input-map-inspector-widget.component.html',
                        styleUrls: ['./get-record-input-map-inspector-widget.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxExpressionEditorService }, { type: i2__namespace$1.RxIdService }, { type: i3__namespace.TranslateService }, { type: i0__namespace.Injector }]; } });

    var RxGetRecordInputMapInspectorWidgetModule = /** @class */ (function () {
        function RxGetRecordInputMapInspectorWidgetModule() {
        }
        return RxGetRecordInputMapInspectorWidgetModule;
    }());
    RxGetRecordInputMapInspectorWidgetModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordInputMapInspectorWidgetModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxGetRecordInputMapInspectorWidgetModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordInputMapInspectorWidgetModule, declarations: [RxGetRecordInputMapInspectorWidgetComponent], imports: [i4.CommonModule, i1$1.RxDefinitionPickerModule, i5.FormsModule, i1$1.ExpressionFormControlModule], exports: [RxGetRecordInputMapInspectorWidgetComponent] });
    RxGetRecordInputMapInspectorWidgetModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordInputMapInspectorWidgetModule, imports: [[i4.CommonModule, i1$1.RxDefinitionPickerModule, i5.FormsModule, i1$1.ExpressionFormControlModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordInputMapInspectorWidgetModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxGetRecordInputMapInspectorWidgetComponent],
                        imports: [i4.CommonModule, i1$1.RxDefinitionPickerModule, i5.FormsModule, i1$1.ExpressionFormControlModule],
                        exports: [RxGetRecordInputMapInspectorWidgetComponent]
                    }]
            }] });

    function RxRecordServerActionServiceMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxRecordServerActionService, _super);
            function RxRecordServerActionService() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, __spreadArray([], __read(args))) || this;
            }
            RxRecordServerActionService.prototype.getRecordDefinitionInputMapParam = function (inputParamName, inputParamValue) {
                if (inputParamName === 'recordDefinitionName') {
                    if (inputParamValue.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        return {
                            assignTarget: inputParamName,
                            expression: inputParamValue
                        };
                    }
                    else {
                        return {
                            assignTarget: inputParamName,
                            expression: '"' + inputParamValue + '"'
                        };
                    }
                }
                else if (inputParamName === 'sampleRecordDefinitionName') {
                    return {
                        assignTarget: inputParamName,
                        expression: '"' + inputParamValue + '"'
                    };
                }
                else {
                    return _super.prototype.getDefinitionInputMapParam.call(this, inputParamName, inputParamValue);
                }
            };
            RxRecordServerActionService.prototype.getRecordDefinitionNameFromInputMap = function (inputMap) {
                var recordDefinitionNameFromInputMap = null;
                if (inputMap.recordDefinitionName) {
                    if (inputMap.recordDefinitionName.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                        if (inputMap.sampleRecordDefinitionName) {
                            recordDefinitionNameFromInputMap = inputMap.sampleRecordDefinitionName;
                        }
                    }
                    else {
                        recordDefinitionNameFromInputMap = inputMap.recordDefinitionName;
                    }
                }
                return recordDefinitionNameFromInputMap;
            };
            // TODO-VS: update definition type to use "IServiceTaskDefinition | ICustomRuleAction"
            RxRecordServerActionService.prototype.getRecordInputMapModel = function (definition) {
                return lodash.reduce((definition === null || definition === void 0 ? void 0 : definition.inputMap) || [], function (inputMap, inputMapField) {
                    var assignTarget = inputMapField.assignTarget;
                    if (assignTarget === 'recordDefinitionName') {
                        if (inputMapField.expression.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                            inputMap[assignTarget] = inputMapField.expression;
                        }
                        else {
                            inputMap[assignTarget] = inputMapField.expression.replace(/^"|"$/g, '');
                        }
                    }
                    else if (assignTarget === 'sampleRecordDefinitionName') {
                        inputMap[assignTarget] = inputMapField.expression.replace(/^"|"$/g, '');
                    }
                    else {
                        inputMap[assignTarget] = inputMapField.expression;
                    }
                    return inputMap;
                }, {
                    recordDefinitionName: null,
                    sampleRecordDefinitionName: null,
                    recordID: null
                });
            };
            return RxRecordServerActionService;
        }(Base));
    }

    function RxGetRecordServerActionServiceMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxGetRecordServerActionService, _super);
            function RxGetRecordServerActionService() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, __spreadArray([], __read(args))) || this;
            }
            RxGetRecordServerActionService.prototype.getDefinitionInputMapParam = function (inputParamName, inputParamValue) {
                return _super.prototype.getRecordDefinitionInputMapParam.call(this, inputParamName, inputParamValue);
            };
            // TODO-VS: update definition type to use "IServiceTaskDefinition | ICustomRuleAction"
            RxGetRecordServerActionService.prototype.getInputMapFromDefinition = function (definition) {
                return _super.prototype.getRecordInputMapModel.call(this, definition);
            };
            return RxGetRecordServerActionService;
        }(Base));
    }

    function RxRecordServerActionExpressionConfiguratorMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxRecordServerActionExpressionConfigurator, _super);
            function RxRecordServerActionExpressionConfigurator() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, __spreadArray([], __read(args))) || this;
            }
            RxRecordServerActionExpressionConfigurator.prototype.validateInputMapExpression = function (propertyName, expression) {
                var isValid = true;
                if (propertyName === 'recordDefinitionName' &&
                    expression &&
                    !expression.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                    isValid = false;
                }
                return rxjs.of(isValid);
            };
            return RxRecordServerActionExpressionConfigurator;
        }(Base));
    }

    var RxGetRecordProcessActionExpressionConfiguratorClass = /** @class */ (function (_super) {
        __extends(RxGetRecordProcessActionExpressionConfiguratorClass, _super);
        function RxGetRecordProcessActionExpressionConfiguratorClass(injector) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            return _this;
        }
        return RxGetRecordProcessActionExpressionConfiguratorClass;
    }(RxRecordServerActionExpressionConfiguratorMixin(elements.RxProcessActionExpressionConfigurator)));

    var RxGetRecordProcessActionService = /** @class */ (function (_super) {
        __extends(RxGetRecordProcessActionService, _super);
        function RxGetRecordProcessActionService(rxDefinitionNameService, rxProcessDefinitionService, rxRecordDefinitionCacheService, rxTreeService, injector) {
            var _this = _super.call(this, injector) || this;
            _this.rxDefinitionNameService = rxDefinitionNameService;
            _this.rxProcessDefinitionService = rxProcessDefinitionService;
            _this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            _this.rxTreeService = rxTreeService;
            _this.injector = injector;
            return _this;
        }
        RxGetRecordProcessActionService.prototype.buildOutputDataDictionaryBranch = function (model) {
            var _this = this;
            var recordDefinitionName = _super.prototype.getRecordDefinitionNameFromInputMap.call(this, model.inputMap);
            return recordDefinitionName
                ? this.rxRecordDefinitionCacheService.getRecordAssociationTree(recordDefinitionName).pipe(operators.switchMap(function (recordAssociationTrees) {
                    var recordDefinitionNames = lodash.chain(recordAssociationTrees)
                        .map('value')
                        .compact()
                        .map('recordDefinitionName')
                        .push(recordDefinitionName)
                        .value();
                    return _this.rxRecordDefinitionCacheService
                        .getRecordDefinitions(recordDefinitionNames)
                        .pipe(operators.map(function (recordDefinitions) { return _this.getOutputChildrenBranch(recordDefinitionName, recordAssociationTrees, recordDefinitions); }));
                }))
                : rxjs.of(null);
        };
        RxGetRecordProcessActionService.prototype.getClass = function () {
            return joint.shapes.rx.ProcessActions.getRecord;
        };
        RxGetRecordProcessActionService.prototype.getElementType = function (actionTypeName) {
            return this.rxProcessDefinitionService.getServerActionModelType(actionTypeName);
        };
        RxGetRecordProcessActionService.prototype.getExpressionConfiguratorClass = function () {
            return RxGetRecordProcessActionExpressionConfiguratorClass;
        };
        RxGetRecordProcessActionService.prototype.getInputMapInspectorWidgetConfig = function () {
            return {
                component: RxGetRecordInputMapInspectorWidgetComponent,
                options: {
                    expressionConfigurator: this.getExpressionConfigurator()
                }
            };
        };
        RxGetRecordProcessActionService.prototype.getAssociationsBranch = function (recordAssociationTree, recordDefinitions, prefix) {
            var _this = this;
            return lodash.isEmpty(recordAssociationTree)
                ? null
                : {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.associations.label'),
                    children: recordAssociationTree.map(function (association) {
                        var newPrefix = "_associations." + association.value.associationDefintionGuid + "." + association.value.nodeSide + "[0]";
                        var recordDefinitionName = association.value.recordDefinitionName;
                        newPrefix = prefix ? prefix + "." + newPrefix : newPrefix;
                        var associationNodeLabel = association.value.nodeName !== recordDefinitionName
                            ? _this.rxDefinitionNameService.getDisplayName(recordDefinitionName) + " (" + _this.rxDefinitionNameService.getDisplayName(association.value.nodeName) + ")"
                            : _this.rxDefinitionNameService.getDisplayName(recordDefinitionName);
                        return {
                            label: associationNodeLabel,
                            outputPropertyPath: newPrefix,
                            children: _this.getAssociationChildren(recordDefinitionName, association.children, recordDefinitions, newPrefix)
                        };
                    })
                };
        };
        RxGetRecordProcessActionService.prototype.getAssociationChildren = function (recordDefinitionName, recordAssociationTree, recordDefinitions, prefix) {
            var associationsBranch = this.getAssociationsBranch(recordAssociationTree, recordDefinitions, prefix);
            var children = lodash.chain(recordDefinitions)
                .find({ name: recordDefinitionName })
                .get('fieldDefinitions')
                .map(function (fieldDefinition) {
                return {
                    label: fieldDefinition.name,
                    outputPropertyPath: prefix + "." + fieldDefinition.id
                };
            })
                .value();
            if (!lodash.isEmpty(associationsBranch)) {
                children.push(associationsBranch);
            }
            return children;
        };
        RxGetRecordProcessActionService.prototype.getOutputChildrenBranch = function (recordDefinitionName, recordAssociationTree, recordDefinitions) {
            var associationsBranch = this.getAssociationsBranch(recordAssociationTree, recordDefinitions);
            var children = lodash.chain(recordDefinitions)
                .find({ name: recordDefinitionName })
                .get('fieldDefinitions')
                .map(function (fieldDefinition) { return ({
                label: fieldDefinition.name,
                outputPropertyPath: [fieldDefinition.id, fieldDefinition.name]
            }); })
                .value();
            if (!lodash.isEmpty(associationsBranch)) {
                children.push(associationsBranch);
            }
            return children;
        };
        return RxGetRecordProcessActionService;
    }(RxGetRecordServerActionServiceMixin(RxRecordServerActionServiceMixin(elements.RxProcessActionService))));
    RxGetRecordProcessActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordProcessActionService, deps: [{ token: i1__namespace$1.RxDefinitionNameService }, { token: i2__namespace.RxProcessDefinitionService }, { token: i3__namespace$1.RxRecordDefinitionCacheService }, { token: i2__namespace$1.RxTreeService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxGetRecordProcessActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordProcessActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordProcessActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxDefinitionNameService }, { type: i2__namespace.RxProcessDefinitionService }, { type: i3__namespace$1.RxRecordDefinitionCacheService }, { type: i2__namespace$1.RxTreeService }, { type: i0__namespace.Injector }]; } });

    var RxGetRecordServerActionRegistrationModule = /** @class */ (function () {
        function RxGetRecordServerActionRegistrationModule(rxGetRecordProcessActionService, rxProcessElementRegistryService, translateService) {
            rxProcessElementRegistryService.register({
                displayName: translateService.instant('com.bmc.arsys.rx.client.designer.server-actions.get-record.name.label'),
                elementService: rxGetRecordProcessActionService,
                group: i2.RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
                paletteItem: {
                    border: i1.RX_DESIGNER.paletteItemBorder.solid,
                    icon: {
                        path: i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                        position: i1.RX_DESIGNER.paletteIconPosition.top
                    },
                    label: i1.RX_DESIGNER.paletteItemLabel.inner,
                    shape: i1.RX_DESIGNER.paletteItemShape.rectangle
                },
                resourceType: i2.RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                shapeClass: RxGetRecordProcessAction,
                shapeType: 'ProcessActions.getRecord',
                type: 'rx.ProcessActions.getRecord',
                viewShapeClass: elements.RxProcessActionView,
                viewShapeType: 'ProcessActions.getRecordView'
            });
        }
        return RxGetRecordServerActionRegistrationModule;
    }());
    RxGetRecordServerActionRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordServerActionRegistrationModule, deps: [{ token: RxGetRecordProcessActionService }, { token: i2__namespace.RxProcessElementRegistryService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxGetRecordServerActionRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordServerActionRegistrationModule, imports: [RxGetRecordInputMapInspectorWidgetModule] });
    RxGetRecordServerActionRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordServerActionRegistrationModule, imports: [[RxGetRecordInputMapInspectorWidgetModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxGetRecordServerActionRegistrationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [RxGetRecordInputMapInspectorWidgetModule]
                    }]
            }], ctorParameters: function () { return [{ type: RxGetRecordProcessActionService }, { type: i2__namespace.RxProcessElementRegistryService }, { type: i3__namespace.TranslateService }]; } });

    var RxRecordServerActionModule = /** @class */ (function () {
        function RxRecordServerActionModule() {
        }
        return RxRecordServerActionModule;
    }());
    RxRecordServerActionModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordServerActionModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxRecordServerActionModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordServerActionModule, imports: [RxGetRecordServerActionRegistrationModule] });
    RxRecordServerActionModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordServerActionModule, imports: [[RxGetRecordServerActionRegistrationModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordServerActionModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [RxGetRecordServerActionRegistrationModule]
                    }]
            }] });

    var RxServerActionsModule = /** @class */ (function () {
        function RxServerActionsModule() {
        }
        return RxServerActionsModule;
    }());
    RxServerActionsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxServerActionsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionsModule, imports: [RxCreateListRegistrationModule, RxRecordServerActionModule] });
    RxServerActionsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionsModule, imports: [[RxCreateListRegistrationModule, RxRecordServerActionModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxServerActionsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [RxCreateListRegistrationModule, RxRecordServerActionModule]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_RECORD_SERVER_ACTION = RX_RECORD_SERVER_ACTION;
    exports.RxCreateListProcessAction = RxCreateListProcessAction;
    exports.RxCreateListProcessActionService = RxCreateListProcessActionService;
    exports.RxRecordServerActionExpressionConfiguratorMixin = RxRecordServerActionExpressionConfiguratorMixin;
    exports.RxRecordServerActionMixin = RxRecordServerActionMixin;
    exports.RxRecordServerActionModule = RxRecordServerActionModule;
    exports.RxRecordServerActionServiceMixin = RxRecordServerActionServiceMixin;
    exports.RxServerActionsModule = RxServerActionsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-process-server-actions.umd.js.map
