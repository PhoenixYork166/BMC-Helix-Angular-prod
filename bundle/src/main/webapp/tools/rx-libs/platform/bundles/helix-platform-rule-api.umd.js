(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@helix/platform/shared/api'), require('@angular/core'), require('@angular/common'), require('moment-es6'), require('lodash'), require('@angular/common/http'), require('@helix/platform/utils')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/rule/api', ['exports', '@helix/platform/shared/api', '@angular/core', '@angular/common', 'moment-es6', 'lodash', '@angular/common/http', '@helix/platform/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.rule = global.helix.platform.rule || {}, global.helix.platform.rule.api = {}), global.helix.platform.shared.api, global.ng.core, global.ng.common, global.moment, global.lodash, global.ng.common.http, global.helix.platform.utils));
})(this, (function (exports, i3, i0, common, moment, lodash, i1, i2) { 'use strict';

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

    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

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

    var RxRuleDefinitionDataPageService = /** @class */ (function (_super) {
        __extends(RxRuleDefinitionDataPageService, _super);
        function RxRuleDefinitionDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.application.rule.datapage.RuleDefinitionDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxRuleDefinitionDataPageService;
    }(i3.DataPage));
    RxRuleDefinitionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleDefinitionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRuleDefinitionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleDefinitionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleDefinitionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RX_RULE_DEFINITION = {
        ruleElementResourceTypes: {
            scheduleTime: 'com.bmc.arsys.rx.services.rule.domain.ScheduleTime',
            intervalTime: 'com.bmc.arsys.rx.services.rule.domain.IntervalTime'
        },
        actionTypeNames: {
            connector: 'connector'
        },
        timerTypes: {
            interval: 'Interval',
            schedule: 'Schedule'
        }
    };

    var RxRuleTriggerEventPipe = /** @class */ (function () {
        function RxRuleTriggerEventPipe() {
        }
        RxRuleTriggerEventPipe.prototype.transform = function (triggerEvent) {
            var result = '';
            if (triggerEvent && triggerEvent.timeCriteria) {
                if (triggerEvent.timeCriteria.resourceType === RX_RULE_DEFINITION.ruleElementResourceTypes.scheduleTime) {
                    result = RX_RULE_DEFINITION.timerTypes.schedule;
                }
                else if (triggerEvent.timeCriteria.resourceType === RX_RULE_DEFINITION.ruleElementResourceTypes.intervalTime) {
                    result = RX_RULE_DEFINITION.timerTypes.interval;
                }
            }
            else if (triggerEvent && triggerEvent.eventTypes) {
                result = triggerEvent.eventTypes.join(', ');
            }
            else if (triggerEvent && triggerEvent.eventTypeDisplayName) {
                result = triggerEvent.eventTypeDisplayName;
            }
            return result;
        };
        return RxRuleTriggerEventPipe;
    }());
    RxRuleTriggerEventPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleTriggerEventPipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxRuleTriggerEventPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleTriggerEventPipe, name: "rxRuleTriggerEventPipe" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleTriggerEventPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxRuleTriggerEventPipe'
                    }]
            }] });

    var RxRuleTriggerTimeCriteriaDisplayValuePipe = /** @class */ (function () {
        function RxRuleTriggerTimeCriteriaDisplayValuePipe() {
        }
        RxRuleTriggerTimeCriteriaDisplayValuePipe.prototype.transform = function (ruleTriggerTimeCriteria) {
            var displayValue;
            switch (ruleTriggerTimeCriteria.resourceType) {
                case RX_RULE_DEFINITION.ruleElementResourceTypes.intervalTime:
                    displayValue = this.buildIntervalTimeDisplayValue(ruleTriggerTimeCriteria);
                    break;
                case RX_RULE_DEFINITION.ruleElementResourceTypes.scheduleTime:
                    displayValue = this.buildScheduleTimeDisplayValue(ruleTriggerTimeCriteria);
                    break;
                default:
                    displayValue = '';
            }
            return displayValue;
        };
        RxRuleTriggerTimeCriteriaDisplayValuePipe.prototype.buildIntervalTimeDisplayValue = function (intervalTimeCriteria) {
            var displayValueParts = [];
            function buildDisplayValuePart(value, singularUnit, pluralUnit) {
                return value ? value + " " + (value > 1 ? pluralUnit : singularUnit) : '';
            }
            displayValueParts.push(buildDisplayValuePart(intervalTimeCriteria.days, 'day', 'days'));
            displayValueParts.push(buildDisplayValuePart(intervalTimeCriteria.hours, 'hour', 'hours'));
            displayValueParts.push(buildDisplayValuePart(intervalTimeCriteria.minutes, 'minute', 'minutes'));
            return "Every " + lodash.compact(displayValueParts).join(', ');
        };
        RxRuleTriggerTimeCriteriaDisplayValuePipe.prototype.buildScheduleTimeDisplayValue = function (scheduleTimeCriteria) {
            var _a, _b;
            var weekDayOrderIds = {
                Monday: 1,
                Tuesday: 2,
                Wednesday: 3,
                Thursday: 4,
                Friday: 5,
                Saturday: 6,
                Sunday: 7
            };
            function enumerateValues(values) {
                var trailingValue = values.length > 1 ? " and " + values.pop() : '';
                return "" + values.join(', ') + trailingValue;
            }
            var formattedWeekDays = lodash.chain(scheduleTimeCriteria.weekDays)
                .map(lodash.toLower)
                .map(lodash.startCase)
                .sortBy(function (weekDay) { return weekDayOrderIds[weekDay]; })
                .value();
            var formattedTime = lodash.sortBy(scheduleTimeCriteria.hours).map(function (hour) { return moment__default["default"](hour + ":" + scheduleTimeCriteria.minute, ['H:mm'], 'en').format('h:mmA'); });
            var monthDaysPart = ((_a = scheduleTimeCriteria.monthDays) === null || _a === void 0 ? void 0 : _a.length)
                ? "On dates " + enumerateValues(lodash.sortBy(scheduleTimeCriteria.monthDays)) + " of every month"
                : '';
            var weekDaysPart = ((_b = scheduleTimeCriteria.weekDays) === null || _b === void 0 ? void 0 : _b.length)
                ? "" + (monthDaysPart ? ', and every ' : 'Every ') + enumerateValues(formattedWeekDays)
                : '';
            var timePart = " at " + enumerateValues(formattedTime);
            return "" + monthDaysPart + weekDaysPart + timePart;
        };
        return RxRuleTriggerTimeCriteriaDisplayValuePipe;
    }());
    RxRuleTriggerTimeCriteriaDisplayValuePipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleTriggerTimeCriteriaDisplayValuePipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxRuleTriggerTimeCriteriaDisplayValuePipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleTriggerTimeCriteriaDisplayValuePipe, name: "rxRuleTriggerTimeCriteriaDisplayValue" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleTriggerTimeCriteriaDisplayValuePipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxRuleTriggerTimeCriteriaDisplayValue'
                    }]
            }] });

    var RxRulePipesModule = /** @class */ (function () {
        function RxRulePipesModule() {
        }
        return RxRulePipesModule;
    }());
    RxRulePipesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRulePipesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxRulePipesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRulePipesModule, declarations: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe], imports: [common.CommonModule], exports: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe] });
    RxRulePipesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRulePipesModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRulePipesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        declarations: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe],
                        exports: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe]
                    }]
            }] });

    var renameRuleDefinitionCommand = 'com.bmc.arsys.rx.application.rule.command.RenameRuleDefinitionCommand';
    var revertRuleCustomizationResourceType = 'com.bmc.arsys.rx.application.rule.command.RevertRuleDefinitionCommand';
    var RxRuleDefinitionService = /** @class */ (function () {
        function RxRuleDefinitionService(httpClient, rxGuidService, rxCommandFactoryService) {
            this.httpClient = httpClient;
            this.rxGuidService = rxGuidService;
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.renameCommand = rxCommandFactoryService.forResourceType(renameRuleDefinitionCommand);
            this.revertCustomizationCommand = rxCommandFactoryService.forResourceType(revertRuleCustomizationResourceType);
        }
        RxRuleDefinitionService.prototype.get = function (ruleDefinitionName) {
            return this.httpClient.get(this.getUrl(ruleDefinitionName));
        };
        RxRuleDefinitionService.prototype.rename = function (oldRuleDefinitionName, newRuleDefinitionName) {
            return this.renameCommand.execute({
                name: oldRuleDefinitionName,
                newName: newRuleDefinitionName
            });
        };
        RxRuleDefinitionService.prototype.revertCustomization = function (ruleDefinitionName) {
            return this.revertCustomizationCommand.execute({ ruleDefinitionName: ruleDefinitionName });
        };
        RxRuleDefinitionService.prototype.update = function (ruleDefinition) {
            return this.httpClient.put(this.getUrl(ruleDefinition.name), ruleDefinition);
        };
        RxRuleDefinitionService.prototype.getUrl = function (ruleDefinitionName) {
            return "/api/rx/application/rule/ruledefinition/" + encodeURIComponent(ruleDefinitionName);
        };
        return RxRuleDefinitionService;
    }());
    RxRuleDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleDefinitionService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace.RxGuidService }, { token: i3__namespace.RxCommandFactoryService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRuleDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuleDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i2__namespace.RxGuidService }, { type: i3__namespace.RxCommandFactoryService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_RULE_DEFINITION = RX_RULE_DEFINITION;
    exports.RxRuleDefinitionDataPageService = RxRuleDefinitionDataPageService;
    exports.RxRuleDefinitionService = RxRuleDefinitionService;
    exports.RxRulePipesModule = RxRulePipesModule;
    exports.RxRuleTriggerEventPipe = RxRuleTriggerEventPipe;
    exports.RxRuleTriggerTimeCriteriaDisplayValuePipe = RxRuleTriggerTimeCriteriaDisplayValuePipe;
    exports.renameRuleDefinitionCommand = renameRuleDefinitionCommand;
    exports.revertRuleCustomizationResourceType = revertRuleCustomizationResourceType;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-rule-api.umd.js.map