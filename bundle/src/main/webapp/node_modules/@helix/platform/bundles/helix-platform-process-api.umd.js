(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('@helix/platform/shared/api'), require('@helix/platform/utils'), require('@ngx-translate/core'), require('@angular/common'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/process/api', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'lodash', '@helix/platform/shared/api', '@helix/platform/utils', '@ngx-translate/core', '@angular/common', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.process = global.helix.platform.process || {}, global.helix.platform.process.api = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.lodash, global.helix.platform.shared.api, global.helix.platform.utils, global.i3, global.ng.common, global.ng.common.http));
})(this, (function (exports, i0, rxjs, operators, lodash, i1, i2, i3, common, i1$1) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

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

    var RxProcessDataDictionaryService = /** @class */ (function () {
        function RxProcessDataDictionaryService(rxDataDictionaryUtils, rxDesignerCacheService, rxGlobalCacheService, rxIdService, rxObjectUtilsService, translateService) {
            var _this = this;
            this.rxDataDictionaryUtils = rxDataDictionaryUtils;
            this.rxDesignerCacheService = rxDesignerCacheService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxIdService = rxIdService;
            this.rxObjectUtilsService = rxObjectUtilsService;
            this.translateService = translateService;
            this.commonActivities = null;
            this.commonActivitiesSubject = new rxjs.ReplaySubject(1);
            this.commonActivities$ = this.commonActivitiesSubject.asObservable();
            this.commonActivitiesDataDictionaryStateClone$ = this.commonActivities$.pipe(operators.map(function (activitiesDataDictionaryState) { return activitiesDataDictionaryState ? _this.rxObjectUtilsService.cloneDeep(activitiesDataDictionaryState) : {}; }), operators.shareReplay(1));
            this.commonDataDictionary$ = this.getCommonDataDictionary();
        }
        RxProcessDataDictionaryService.prototype.clear = function () {
            this.setCommonActivities(null);
        };
        RxProcessDataDictionaryService.prototype.getCommonDataDictionary = function () {
            var _this = this;
            return rxjs.combineLatest([
                this.commonActivitiesDataDictionaryStateClone$.pipe(operators.map(function (componentsDataDictionaryState) { return Object.values(componentsDataDictionaryState); }))
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 1), activitiesDataDictionaryBranches = _b[0];
                return [
                    {
                        label: 'General',
                        children: [
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-date.label'),
                                icon: 'd-icon-dollar',
                                expression: '$DATE$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-date-time.label'),
                                icon: 'd-icon-dollar',
                                expression: '$TIMESTAMP$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-group-ids.label'),
                                icon: 'd-icon-dollar',
                                expression: '$GROUPIDS$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-groups.label'),
                                icon: 'd-icon-dollar',
                                expression: '$GROUPS$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-roles.label'),
                                icon: 'd-icon-dollar',
                                expression: '$ROLES$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-server-urls.label'),
                                icon: 'd-icon-dollar',
                                expression: '$SERVERURL$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-time.label'),
                                icon: 'd-icon-dollar',
                                expression: '$TIME$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-user.label'),
                                icon: 'd-icon-dollar',
                                expression: '$USER$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-user-locale.label'),
                                icon: 'd-icon-dollar',
                                expression: '$LOCALE$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-week-day.label'),
                                icon: 'd-icon-dollar',
                                expression: '$WEEKDAY$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.new-line.label'),
                                icon: 'd-icon-dollar',
                                expression: '$NEWLINE$'
                            },
                            {
                                label: _this.translateService.instant('com.bmc.arsys.rx.client.process-designer.keywords.process-correlation-id.label'),
                                icon: 'd-icon-dollar',
                                expression: '$PROCESSCORRELATIONID$'
                            },
                            {
                                label: 'NULL',
                                icon: 'd-icon-dollar',
                                expression: '$NULL$',
                                hidden: true
                            }
                        ]
                    },
                    {
                        label: 'Functions',
                        expanded: true,
                        children: lodash.reject(_this.rxDataDictionaryUtils.getFunctionDataDictionaryBranch(_this.rxDesignerCacheService.getFunctionDescriptorsSync()), { label: 'Rule Qualification' })
                    },
                    {
                        label: 'Activities',
                        expanded: true,
                        children: activitiesDataDictionaryBranches
                    }
                ];
            }));
        };
        RxProcessDataDictionaryService.prototype.setCommonActivitiesDataDictionaryBranch = function (guid, activityDataDictionaryBranch) {
            var _this = this;
            activityDataDictionaryBranch.pipe(operators.take(1)).subscribe(function (dataDictionaryBranch) {
                var _a;
                _this.setCommonActivities(lodash.isEmpty(dataDictionaryBranch)
                    ? lodash.omit(_this.commonActivities, [guid])
                    : Object.assign(Object.assign({}, _this.commonActivities), (_a = {}, _a[guid] = dataDictionaryBranch, _a)));
            });
        };
        RxProcessDataDictionaryService.prototype.setCommonActivities = function (state) {
            this.commonActivities = state;
            this.commonActivitiesSubject.next(this.commonActivities);
        };
        return RxProcessDataDictionaryService;
    }());
    RxProcessDataDictionaryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDataDictionaryService, deps: [{ token: i1__namespace.RxDataDictionaryUtils }, { token: i1__namespace.RxDesignerCacheService }, { token: i1__namespace.RxGlobalCacheService }, { token: i2__namespace.RxIdService }, { token: i2__namespace.RxObjectUtilsService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessDataDictionaryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDataDictionaryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDataDictionaryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxDataDictionaryUtils }, { type: i1__namespace.RxDesignerCacheService }, { type: i1__namespace.RxGlobalCacheService }, { type: i2__namespace.RxIdService }, { type: i2__namespace.RxObjectUtilsService }, { type: i3__namespace.TranslateService }]; } });

    var _a;
    var specialActionTypeNames = {
        connector: 'connector',
        webRequest: 'WebRequest',
        jitterbit: 'iPaaS Jitterbit',
        mulesoft: 'iPaaS MuleSoft'
    };
    var processElementResourceTypes = {
        boundaryEvent: 'com.bmc.arsys.rx.services.process.domain.BoundaryEventDefinition',
        callActivity: 'com.bmc.arsys.rx.services.process.domain.CallActivityDefinition',
        endEvent: 'com.bmc.arsys.rx.services.process.domain.EndEventDefinition',
        errorEvent: 'com.bmc.arsys.rx.services.process.domain.ErrorEventDefinition',
        exclusiveGateway: 'com.bmc.arsys.rx.services.process.domain.ExclusiveGatewayDefinition',
        parallelGateway: 'com.bmc.arsys.rx.services.process.domain.ParallelGatewayDefinition',
        processAction: 'com.bmc.arsys.rx.services.process.domain.ServiceTaskDefinition',
        receiveTask: 'com.bmc.arsys.rx.services.process.domain.ReceiveTaskDefinition',
        sequenceFlow: 'com.bmc.arsys.rx.services.process.domain.SequenceFlowDefinition',
        startEvent: 'com.bmc.arsys.rx.services.process.domain.StartEventDefinition',
        subProcess: 'com.bmc.arsys.rx.services.process.domain.SubProcessDefinition',
        textAnnotation: 'com.bmc.arsys.rx.services.process.domain.TextAnnotation',
        textAnnotationAssociation: 'com.bmc.arsys.rx.services.process.domain.TextAnnotationAssociation',
        timerEvent: 'com.bmc.arsys.rx.services.process.domain.TimerEventDefinition',
        userTask: 'com.bmc.arsys.rx.services.process.domain.UserTaskDefinition'
    };
    var processElementNamesByResourceType = (_a = {},
        // process event resource types
        _a[processElementResourceTypes.boundaryEvent] = 'Boundary',
        _a[processElementResourceTypes.endEvent] = 'End',
        _a[processElementResourceTypes.errorEvent] = 'Error',
        _a[processElementResourceTypes.startEvent] = 'Start',
        _a[processElementResourceTypes.timerEvent] = 'Timer',
        // process element resource types
        _a[processElementResourceTypes.callActivity] = 'Call Activity',
        _a[processElementResourceTypes.exclusiveGateway] = 'Exclusive',
        _a[processElementResourceTypes.parallelGateway] = 'Parallel',
        _a[processElementResourceTypes.receiveTask] = 'Receive Task',
        _a[processElementResourceTypes.subProcess] = 'Sub-Process',
        _a[processElementResourceTypes.textAnnotation] = 'Annotation',
        _a[processElementResourceTypes.userTask] = 'User Task',
        // rule element resource types
        _a['com.bmc.arsys.rx.services.rule.domain.CancelProcessInstanceAction'] = 'Cancel Process',
        _a['com.bmc.arsys.rx.services.rule.domain.SignalProcessInstanceAction'] = 'Signal Process',
        _a['com.bmc.arsys.rx.services.rule.domain.StartProcessInstanceAction'] = 'Start Process',
        _a.ruleQualificationResourceType = 'Qualification',
        _a);
    var standardProcessElementGroups = {
        activities: {
            name: 'Activities',
            priority: 1
        },
        annotations: {
            name: 'Annotations',
            priority: 2
        },
        events: {
            name: 'Events',
            priority: 3
        },
        gateways: {
            name: 'Gateways',
            priority: 4
        },
        platformActions: {
            name: 'Platform actions',
            priority: 5
        },
        default: {
            priority: 6
        }
    };
    var standardProcessElements = [
        {
            group: standardProcessElementGroups.annotations.name,
            resourceType: processElementResourceTypes.textAnnotation
        },
        {
            group: standardProcessElementGroups.events.name,
            resourceType: processElementResourceTypes.startEvent
        },
        {
            group: standardProcessElementGroups.events.name,
            resourceType: processElementResourceTypes.endEvent
        },
        {
            group: standardProcessElementGroups.events.name,
            resourceType: processElementResourceTypes.boundaryEvent,
            eventResourceType: processElementResourceTypes.timerEvent
        },
        {
            group: standardProcessElementGroups.events.name,
            resourceType: processElementResourceTypes.boundaryEvent,
            eventResourceType: processElementResourceTypes.errorEvent
        },
        {
            group: standardProcessElementGroups.events.name,
            resourceType: processElementResourceTypes.endEvent,
            eventResourceType: processElementResourceTypes.errorEvent
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.callActivity
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.processAction,
            actionTypeName: specialActionTypeNames.connector
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.receiveTask
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.subProcess
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.userTask
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.processAction,
            actionTypeName: specialActionTypeNames.webRequest
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.processAction,
            actionTypeName: specialActionTypeNames.jitterbit
        },
        {
            group: standardProcessElementGroups.activities.name,
            resourceType: processElementResourceTypes.processAction,
            actionTypeName: specialActionTypeNames.mulesoft
        },
        {
            group: standardProcessElementGroups.gateways.name,
            resourceType: processElementResourceTypes.parallelGateway
        },
        {
            group: standardProcessElementGroups.gateways.name,
            resourceType: processElementResourceTypes.exclusiveGateway
        }
    ];
    var RX_PROCESS_DEFINITION = {
        processElementDisplayNames: {
            endEvent: 'End',
            startEvent: 'Start'
        },
        processElementNamesByResourceType: processElementNamesByResourceType,
        processElementResourceTypes: processElementResourceTypes,
        processElementTypes: {
            endEvent: 'rx.EndEvent',
            processAction: 'rx.ProcessAction',
            startEvent: 'rx.StartEvent'
        },
        processElementGroups: [
            standardProcessElementGroups.activities,
            standardProcessElementGroups.annotations,
            standardProcessElementGroups.events,
            standardProcessElementGroups.gateways,
            standardProcessElementGroups.platformActions
        ],
        standardProcessElements: standardProcessElements,
        standardProcessElementGroups: standardProcessElementGroups,
        processElementConfigurationProperties: [
            'actionTypeName',
            'calledProcessDefinitionName',
            'eventResourceType',
            'resourceType'
        ],
        processVariableSubTypes: {
            attachment: 11,
            character: 4
        },
        processVariableTypes: {
            record: 'com.bmc.arsys.rx.services.process.domain.record.RecordInstanceFieldType',
            default: 'com.bmc.arsys.rx.services.record.domain.DefaultFieldType'
        },
        runAsUser: {
            administrator: {
                definitionValue: false,
                modelValue: 'administrator'
            },
            currentUser: {
                definitionValue: true,
                modelValue: 'currentUser'
            },
            inheritFromProcess: {
                definitionValue: null,
                modelValue: 'inheritFromProcess'
            }
        }
    };

    var RxProcessElementRegistryService = /** @class */ (function () {
        function RxProcessElementRegistryService(rxLogService) {
            this.rxLogService = rxLogService;
            this.elementDescriptors = new Map();
        }
        RxProcessElementRegistryService.prototype.get = function (type) {
            var _a;
            return ((_a = this.elementDescriptors.get(type)) !== null && _a !== void 0 ? _a : this.elementDescriptors.get(RX_PROCESS_DEFINITION.processElementTypes.processAction));
        };
        RxProcessElementRegistryService.prototype.getAll = function () {
            return Array.from(this.elementDescriptors.values());
        };
        RxProcessElementRegistryService.prototype.register = function (descriptor) {
            if (this.elementDescriptors.has(descriptor.type)) {
                this.rxLogService.warning("Process element " + descriptor.type + " is already registered.");
            }
            else {
                joint.util.setByPath(joint.shapes.rx, descriptor.shapeType, descriptor.shapeClass, '.');
                joint.util.setByPath(joint.shapes.rx, descriptor.viewShapeType, descriptor.viewShapeClass, '.');
                this.elementDescriptors.set(descriptor.type, descriptor);
            }
        };
        return RxProcessElementRegistryService;
    }());
    RxProcessElementRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementRegistryService, deps: [{ token: i1__namespace.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessElementRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxLogService }]; } });

    var RxCallActivityRegistryService = /** @class */ (function () {
        function RxCallActivityRegistryService() {
            this.callActivityDescriptors = new Map();
        }
        RxCallActivityRegistryService.prototype.getRegisteredCallActivities = function () {
            return this.callActivityDescriptors.values();
        };
        RxCallActivityRegistryService.prototype.register = function () {
            var _this = this;
            var callActivityDescriptors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                callActivityDescriptors[_i] = arguments[_i];
            }
            callActivityDescriptors.forEach(function (descriptor) {
                _this.callActivityDescriptors.set(descriptor.processDefinitionName, descriptor);
            });
        };
        return RxCallActivityRegistryService;
    }());
    RxCallActivityRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCallActivityRegistryService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxCallActivityRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCallActivityRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxCallActivityRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    exports.ElementVisibilityOptions = void 0;
    (function (ElementVisibilityOptions) {
        ElementVisibilityOptions["Always"] = "Always";
        ElementVisibilityOptions["Never"] = "Never";
    })(exports.ElementVisibilityOptions || (exports.ElementVisibilityOptions = {}));

    var RxProcessApiModule = /** @class */ (function () {
        function RxProcessApiModule(rxCallActivityRegistryService) {
            this.rxCallActivityRegistryService = rxCallActivityRegistryService;
            this.rxCallActivityRegistryService.register({
                displayName: 'Approval Process',
                processDefinitionName: 'com.bmc.arsys.rx.approval:Approval Process V2',
                callActivityManagerServiceName: 'apApprovalProcessCallActivityManager',
                visibility: exports.ElementVisibilityOptions.Always
            });
        }
        return RxProcessApiModule;
    }());
    RxProcessApiModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessApiModule, deps: [{ token: RxCallActivityRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxProcessApiModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessApiModule, imports: [common.CommonModule] });
    RxProcessApiModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessApiModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessApiModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule]
                    }]
            }], ctorParameters: function () { return [{ type: RxCallActivityRegistryService }]; } });

    var processDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.process.datapage.ProcessDefinitionDataPageQuery';
    var RxProcessDefinitionDataPageService = /** @class */ (function (_super) {
        __extends(RxProcessDefinitionDataPageService, _super);
        function RxProcessDefinitionDataPageService(injector) {
            var _this = _super.call(this, injector, processDefinitionDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        return RxProcessDefinitionDataPageService;
    }(i1.DataPage));
    RxProcessDefinitionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessDefinitionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxProcessDefinitionService = /** @class */ (function () {
        function RxProcessDefinitionService(httpClient, rxGuidService) {
            this.httpClient = httpClient;
            this.rxGuidService = rxGuidService;
        }
        RxProcessDefinitionService.prototype.get = function (processDefinitionName, options) {
            return this.httpClient.get(this.getUrl(processDefinitionName), options);
        };
        RxProcessDefinitionService.prototype.getNew = function () {
            return rxjs.of({
                allowOverlay: false,
                artifacts: [],
                contextKeyParam: null,
                description: '',
                flowElements: [],
                guid: this.rxGuidService.generate('rx-'),
                inputParams: [],
                isEnabled: true,
                lastChangedBy: null,
                lastUpdateTime: null,
                layout: JSON.stringify({ cells: [] }),
                localVariables: [],
                localizableStrings: {},
                name: '',
                outputParams: [],
                overlayDescriptor: null,
                overlayGroupId: null,
                owner: null,
                permissions: [],
                runAsUser: false,
                scope: i1.RX_BUNDLE.definitionScopeTypes.bundle,
                synchronous: null
            });
        };
        RxProcessDefinitionService.prototype.getServerActionModelType = function (actionTypeName) {
            return "rx.ProcessActions." + actionTypeName.replace(':', '.');
        };
        RxProcessDefinitionService.prototype.getServerActionTypeName = function (modelType) {
            return lodash.last(modelType.split('.'));
        };
        RxProcessDefinitionService.prototype.update = function (processDefinition, options) {
            return this.httpClient.put(this.getUrl(processDefinition.name), processDefinition, options);
        };
        RxProcessDefinitionService.prototype.getOutputParams = function (processDefinitionName, options) {
            return this.httpClient.get("/api/rx/application/process/processdefinition/" + encodeURIComponent(processDefinitionName) + "/outputParams", options);
        };
        RxProcessDefinitionService.prototype.getInputParams = function (processDefinitionName, options) {
            return this.httpClient.get("/api/rx/application/process/processdefinition/" + encodeURIComponent(processDefinitionName) + "/inputParams", options);
        };
        RxProcessDefinitionService.prototype.getUrl = function (processDefinitionName) {
            return processDefinitionName
                ? "/api/rx/application/process/processdefinition/" + encodeURIComponent(processDefinitionName)
                : '/api/rx/application/process/processdefinition';
        };
        return RxProcessDefinitionService;
    }());
    RxProcessDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionService, deps: [{ token: i1__namespace$1.HttpClient }, { token: i2__namespace.RxGuidService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.HttpClient }, { type: i2__namespace.RxGuidService }]; } });

    exports.ListFieldDefinitionSubType = void 0;
    (function (ListFieldDefinitionSubType) {
        ListFieldDefinitionSubType[ListFieldDefinitionSubType["Attachment"] = 11] = "Attachment";
        ListFieldDefinitionSubType[ListFieldDefinitionSubType["Character"] = 4] = "Character";
    })(exports.ListFieldDefinitionSubType || (exports.ListFieldDefinitionSubType = {}));

    var RxProcessDefinitionCacheService = /** @class */ (function () {
        function RxProcessDefinitionCacheService(rxProcessDefinitionService) {
            this.rxProcessDefinitionService = rxProcessDefinitionService;
            this.consumers = new Set();
            this.processDefinitionCache = new Map();
            this.processDefinitionOutputParamCache = new Map();
        }
        RxProcessDefinitionCacheService.prototype.getProcessDefinition = function (processDefinitionName) {
            if (!this.processDefinitionCache.has(processDefinitionName)) {
                var processDefinition$ = this.rxProcessDefinitionService
                    .get(processDefinitionName, {
                    headers: new i1$1.HttpHeaders({ 'Design-Time': 'true' })
                })
                    .pipe(operators.shareReplay(1));
                this.processDefinitionCache.set(processDefinitionName, processDefinition$);
            }
            return this.processDefinitionCache.get(processDefinitionName);
        };
        RxProcessDefinitionCacheService.prototype.getOutputParams = function (processDefinitionName) {
            if (!this.processDefinitionOutputParamCache.has(processDefinitionName)) {
                var processDefinitionOutputParams$ = this.rxProcessDefinitionService
                    .getOutputParams(processDefinitionName, {
                    headers: new i1$1.HttpHeaders({ 'Design-Time': 'true' })
                })
                    .pipe(operators.shareReplay(1));
                this.processDefinitionOutputParamCache.set(processDefinitionName, processDefinitionOutputParams$);
            }
            return this.processDefinitionOutputParamCache.get(processDefinitionName);
        };
        RxProcessDefinitionCacheService.prototype.registerConsumer = function (consumerDestroy$) {
            var _this = this;
            this.consumers.add(consumerDestroy$);
            consumerDestroy$.subscribe(function () {
                _this.consumers.delete(consumerDestroy$);
                if (lodash.isEmpty(_this.consumers)) {
                    _this.clearCache();
                }
            });
        };
        RxProcessDefinitionCacheService.prototype.clearCache = function (processDefinitionNames) {
            var _this = this;
            if (processDefinitionNames) {
                lodash.forEach(processDefinitionNames, function (processDefinitionName) {
                    _this.processDefinitionCache.delete(processDefinitionName);
                    _this.processDefinitionOutputParamCache.delete(processDefinitionName);
                });
            }
            else {
                this.processDefinitionCache.clear();
                this.processDefinitionOutputParamCache.clear();
            }
        };
        return RxProcessDefinitionCacheService;
    }());
    RxProcessDefinitionCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionCacheService, deps: [{ token: RxProcessDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessDefinitionCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDefinitionCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxProcessDefinitionService }]; } });

    var RxProcessElementSearchService = /** @class */ (function () {
        function RxProcessElementSearchService() {
        }
        RxProcessElementSearchService.prototype.find = function (definition, predicate) {
            var processElement = this.findElementInDefinition(definition, predicate);
            if (!processElement) {
                processElement = lodash.find(this.flattenElements(definition), predicate);
            }
            return processElement;
        };
        RxProcessElementSearchService.prototype.findElementInDefinition = function (definition, predicate) {
            return lodash.find(definition.flowElements, predicate) || lodash.find(definition.artifacts, predicate);
        };
        RxProcessElementSearchService.prototype.findOwner = function (definition, guid) {
            var _this = this;
            var processElement = this.findElementInDefinition(definition, { guid: guid });
            var result;
            if (processElement) {
                result = definition;
            }
            else {
                result = lodash.find(this.flattenElements(definition), function (element) {
                    return _this.findElementInDefinition(element, { guid: guid });
                });
            }
            return result;
        };
        RxProcessElementSearchService.prototype.findByGuid = function (definition, guid) {
            return this.find(definition, { guid: guid });
        };
        RxProcessElementSearchService.prototype.filter = function (definition, predicate) {
            return lodash.filter(this.flattenElements(definition), predicate);
        };
        RxProcessElementSearchService.prototype.forEach = function (definition, iteratee) {
            return lodash.forEach(this.flattenElements(definition), iteratee);
        };
        RxProcessElementSearchService.prototype.flattenElements = function (definition) {
            var _this = this;
            return lodash.flatten(lodash.transform([].concat(definition.flowElements || [], definition.artifacts || []), function (result, element) {
                result.push(element);
                if (element.flowElements) {
                    result.push(_this.flattenElements(element));
                }
            }, []));
        };
        return RxProcessElementSearchService;
    }());
    RxProcessElementSearchService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementSearchService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessElementSearchService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementSearchService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementSearchService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RxProcessElementsService = /** @class */ (function () {
        function RxProcessElementsService(rxActionTypeUtilsService, rxBundleCacheService, rxCallActivityRegistryService, rxDefinitionNameService, rxGlobalCacheService, rxStringService) {
            this.rxActionTypeUtilsService = rxActionTypeUtilsService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxCallActivityRegistryService = rxCallActivityRegistryService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxStringService = rxStringService;
        }
        RxProcessElementsService.prototype.getActionElements = function (actionResourceType) {
            var _this = this;
            return rxjs.forkJoin([
                this.rxBundleCacheService.getActionTypes(),
                this.rxGlobalCacheService.getBundleDescriptors()
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), actionTypes = _b[0], bundleDescriptors = _b[1];
                return lodash.map(actionTypes, function (actionType) {
                    return {
                        group: _this.rxActionTypeUtilsService.getActionTypeBundleFriendlyName(bundleDescriptors, actionType) ||
                            'Platform actions',
                        label: actionType.displayName || _this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName),
                        value: {
                            actionTypeName: actionType.actionTypeName,
                            resourceType: actionResourceType
                        }
                    };
                });
            }));
        };
        RxProcessElementsService.prototype.getCallActivityElements = function () {
            var _this = this;
            return rxjs.forkJoin([this.rxGlobalCacheService.getBundleDescriptors(), this.getVisibleCallActivities()]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), bundleDescriptors = _b[0], visibleCallActivities = _b[1];
                var callActivityElements = [];
                lodash.forEach(visibleCallActivities, function (visibleCallActivity) {
                    var bundle = lodash.find(bundleDescriptors, {
                        id: _this.rxDefinitionNameService.getBundleId(visibleCallActivity.processDefinitionName)
                    });
                    if (bundle) {
                        callActivityElements.push({
                            group: bundle.friendlyName,
                            label: visibleCallActivity.displayName ||
                                _this.rxStringService.prettify(_this.rxDefinitionNameService.getDisplayName(visibleCallActivity.processDefinitionName)),
                            value: {
                                resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.callActivity,
                                calledProcessDefinitionName: visibleCallActivity.processDefinitionName
                            }
                        });
                    }
                });
                return callActivityElements;
            }));
        };
        RxProcessElementsService.prototype.getProcessElements = function () {
            return [
                this.getActionElements(RX_PROCESS_DEFINITION.processElementResourceTypes.processAction),
                this.getCallActivityElements(),
                this.getStandardProcessElements()
            ];
        };
        RxProcessElementsService.prototype.getStandardProcessElements = function () {
            var _this = this;
            return rxjs.of(lodash.map(RX_PROCESS_DEFINITION.standardProcessElements, function (element) {
                var label;
                if (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.processAction) {
                    label = _this.rxActionTypeUtilsService.prettifyActionTypeName(element.actionTypeName);
                }
                else if (element.eventResourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.errorEvent) {
                    var errorEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.errorEvent];
                    var boundaryEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent];
                    var endEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent];
                    label =
                        element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent
                            ? errorEventLabel + " " + boundaryEventLabel
                            : errorEventLabel + " " + endEventLabel;
                }
                else if (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent) {
                    label = RX_PROCESS_DEFINITION.processElementNamesByResourceType[element.eventResourceType];
                }
                else {
                    label = RX_PROCESS_DEFINITION.processElementNamesByResourceType[element.resourceType];
                }
                return {
                    group: element.group,
                    label: label,
                    value: lodash.pick(element, RX_PROCESS_DEFINITION.processElementConfigurationProperties)
                };
            }));
        };
        RxProcessElementsService.prototype.getVisibleCallActivities = function () {
            return rxjs.of(lodash.filter(Array.from(this.rxCallActivityRegistryService.getRegisteredCallActivities()), {
                visibility: exports.ElementVisibilityOptions.Always
            }));
        };
        return RxProcessElementsService;
    }());
    RxProcessElementsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsService, deps: [{ token: i1__namespace.RxActionTypeUtilsService }, { token: i1__namespace.RxBundleCacheService }, { token: RxCallActivityRegistryService }, { token: i1__namespace.RxDefinitionNameService }, { token: i1__namespace.RxGlobalCacheService }, { token: i2__namespace.RxStringService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessElementsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxActionTypeUtilsService }, { type: i1__namespace.RxBundleCacheService }, { type: RxCallActivityRegistryService }, { type: i1__namespace.RxDefinitionNameService }, { type: i1__namespace.RxGlobalCacheService }, { type: i2__namespace.RxStringService }]; } });

    var RxProcessInstanceService = /** @class */ (function () {
        function RxProcessInstanceService(httpClient) {
            this.httpClient = httpClient;
        }
        RxProcessInstanceService.prototype.get = function (processDefinitionName, processInstanceId) {
            return this.httpClient.get("/api/rx/application/process/processinstance/" + encodeURIComponent(processDefinitionName) + "/" + processInstanceId);
        };
        RxProcessInstanceService.prototype.getLog = function (processDefinitionName, processInstanceId) {
            return this.httpClient.get("/api/rx/application/process/processinstance/log/" + encodeURIComponent(processDefinitionName) + "/" + processInstanceId + "/view");
        };
        RxProcessInstanceService.prototype.downloadLog = function (processDefinitionName, processInstanceId) {
            return this.httpClient.get("/api/rx/application/process/processinstance/log/" + encodeURIComponent(processDefinitionName) + "/" + processInstanceId + "/download", {
                responseType: 'blob'
            });
        };
        return RxProcessInstanceService;
    }());
    RxProcessInstanceService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceService, deps: [{ token: i1__namespace$1.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessInstanceService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.HttpClient }]; } });

    var RxProcessInstanceCommandsService = /** @class */ (function () {
        function RxProcessInstanceCommandsService(rxCommandFactoryService) {
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.startProcessCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand');
        }
        RxProcessInstanceCommandsService.prototype.start = function (processDefinitionName, processInputValues) {
            return this.startProcessCommand.execute({
                processDefinitionName: processDefinitionName,
                processInputValues: processInputValues
            }, {
                observe: 'response',
                responseType: 'text'
            });
        };
        return RxProcessInstanceCommandsService;
    }());
    RxProcessInstanceCommandsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceCommandsService, deps: [{ token: i1__namespace.RxCommandFactoryService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessInstanceCommandsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceCommandsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceCommandsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxCommandFactoryService }]; } });

    var RxProcessInstanceDataPageService = /** @class */ (function (_super) {
        __extends(RxProcessInstanceDataPageService, _super);
        function RxProcessInstanceDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.process.datapage.ProcessInstanceDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxProcessInstanceDataPageService;
    }(i1.DataPage));
    RxProcessInstanceDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessInstanceDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxProcessInstanceCountsByStatusDataPageService = /** @class */ (function (_super) {
        __extends(RxProcessInstanceCountsByStatusDataPageService, _super);
        function RxProcessInstanceCountsByStatusDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.process.datapage.ProcessInstanceCountsByStatusDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxProcessInstanceCountsByStatusDataPageService;
    }(i1.DataPage));
    RxProcessInstanceCountsByStatusDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceCountsByStatusDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessInstanceCountsByStatusDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceCountsByStatusDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessInstanceCountsByStatusDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_PROCESS_DEFINITION = RX_PROCESS_DEFINITION;
    exports.RxCallActivityRegistryService = RxCallActivityRegistryService;
    exports.RxProcessApiModule = RxProcessApiModule;
    exports.RxProcessDataDictionaryService = RxProcessDataDictionaryService;
    exports.RxProcessDefinitionCacheService = RxProcessDefinitionCacheService;
    exports.RxProcessDefinitionDataPageService = RxProcessDefinitionDataPageService;
    exports.RxProcessDefinitionService = RxProcessDefinitionService;
    exports.RxProcessElementRegistryService = RxProcessElementRegistryService;
    exports.RxProcessElementSearchService = RxProcessElementSearchService;
    exports.RxProcessElementsService = RxProcessElementsService;
    exports.RxProcessInstanceCommandsService = RxProcessInstanceCommandsService;
    exports.RxProcessInstanceCountsByStatusDataPageService = RxProcessInstanceCountsByStatusDataPageService;
    exports.RxProcessInstanceDataPageService = RxProcessInstanceDataPageService;
    exports.RxProcessInstanceService = RxProcessInstanceService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-process-api.umd.js.map
