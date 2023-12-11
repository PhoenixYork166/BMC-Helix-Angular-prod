(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@helix/platform/shared/api'), require('rxjs'), require('@helix/platform/view/components'), require('@helix/platform/record/api'), require('lodash'), require('rxjs/operators'), require('@helix/platform/ui-kit'), require('@helix/platform/view/api'), require('@bmc-ux/adapt-angular'), require('@ngx-translate/core'), require('@angular/common/http'), require('@helix/platform/shared/components'), require('@angular/forms'), require('@helix/platform/view/runtime'), require('@helix/platform/utils'), require('moment-es6')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/approval/components', ['exports', '@angular/core', '@angular/common', '@helix/platform/shared/api', 'rxjs', '@helix/platform/view/components', '@helix/platform/record/api', 'lodash', 'rxjs/operators', '@helix/platform/ui-kit', '@helix/platform/view/api', '@bmc-ux/adapt-angular', '@ngx-translate/core', '@angular/common/http', '@helix/platform/shared/components', '@angular/forms', '@helix/platform/view/runtime', '@helix/platform/utils', 'moment-es6'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.approval = global.helix.platform.approval || {}, global.helix.platform.approval.components = {}), global.ng.core, global.ng.common, global.helix.platform.shared.api, global.rxjs, global.helix.platform.view.components, global.helix.platform.record.api, global.lodash, global.rxjs.operators, global.helix.platform["ui-kit"], global.helix.platform.view.api, global.adaptAngular, global.ngxTranslateCore, global.ng.common.http, global.helix.platform.shared.components, global.ng.forms, global.helix.platform.view.runtime, global.helix.platform.utils, global.moment));
})(this, (function (exports, i0, i3$1, i3, rxjs, i10, i2, lodash, operators, i6, i1$3, i1$1, i1$2, i1, i5, i6$1, runtime, i1$4, moment) { 'use strict';

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

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace$1 = /*#__PURE__*/_interopNamespace(i3$1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i6__namespace$1 = /*#__PURE__*/_interopNamespace(i6);
    var i1__namespace$4 = /*#__PURE__*/_interopNamespace(i1$3);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6$1);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$4);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

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

    var ApprovalRequestStatus;
    (function (ApprovalRequestStatus) {
        ApprovalRequestStatus["Pending"] = "Pending";
        ApprovalRequestStatus["Hold"] = "On Hold";
        ApprovalRequestStatus["MoreInfo"] = "More Information";
        ApprovalRequestStatus["RequestMoreInfo"] = "Request More Information";
        ApprovalRequestStatus["NeedsAttention"] = "Needs Attention";
        ApprovalRequestStatus["Approved"] = "Approved";
        ApprovalRequestStatus["Rejected"] = "Rejected";
        ApprovalRequestStatus["Cancelled"] = "Cancelled";
        ApprovalRequestStatus["Error"] = "Error";
        ApprovalRequestStatus["Closed"] = "Closed";
    })(ApprovalRequestStatus || (ApprovalRequestStatus = {}));
    var ApprovalGridType;
    (function (ApprovalGridType) {
        ApprovalGridType["ApprovalRequests"] = "approvalRequests";
        ApprovalGridType["NeedAttentionRequests"] = "needAttentionRequests";
    })(ApprovalGridType || (ApprovalGridType = {}));
    var ApprovalCommandType;
    (function (ApprovalCommandType) {
        ApprovalCommandType["Approved"] = "Approved";
        ApprovalCommandType["Rejected"] = "Rejected";
        ApprovalCommandType["OnHold"] = "OnHold";
        ApprovalCommandType["Reassign"] = "Reassign";
    })(ApprovalCommandType || (ApprovalCommandType = {}));

    var RX_APPROVAL_CONSOLE = {
        approvalServerCommand: 'com.bmc.arsys.rx.approval.application.command.ApprovalServerCommand',
        approvalCommandForm: 'AP:Signature',
        approvalUserNameField: 101,
        approvalRequestTypes: {
            pending: {
                status: ApprovalRequestStatus.Pending,
                countType: 'pendingCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'warning',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.pending.label'
            },
            onHold: {
                status: ApprovalRequestStatus.Hold,
                countType: 'holdCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'warning',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.hold.label'
            },
            moreInfo: {
                status: ApprovalRequestStatus.RequestMoreInfo,
                countType: 'moreInformationCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'info',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.more-info.label'
            },
            needAttention: {
                status: ApprovalRequestStatus.NeedsAttention,
                countType: 'needAttentionCount',
                gridType: ApprovalGridType.NeedAttentionRequests,
                badgeType: 'warning',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.needs-attention.label'
            },
            approved: {
                status: ApprovalRequestStatus.Approved,
                countType: 'approvedCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'success',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.approved.label'
            },
            rejected: {
                status: ApprovalRequestStatus.Rejected,
                countType: 'rejectedCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'danger',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.rejected.label'
            },
            cancelled: {
                status: ApprovalRequestStatus.Cancelled,
                countType: 'cancelledCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'secondary',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.canceled.label'
            },
            error: {
                status: ApprovalRequestStatus.Error,
                countType: 'errorCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'danger',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.errored.label'
            },
            closed: {
                status: ApprovalRequestStatus.Closed,
                countType: 'closedCount',
                gridType: ApprovalGridType.ApprovalRequests,
                badgeType: 'secondary',
                labelKey: 'com.bmc.arsys.rx.client.approval.console.request.closed.label'
            }
        },
        approvalRequestsGrid: {
            fields: {
                application: 'application',
                summary: 'summary',
                requester: 'requester',
                status: 'status',
                request: 'request',
                createDateSig: 'createDateSig',
                process: 'process',
                signatureInstanceID: 'signatureInstanceID',
                justificationReasonField: 'justification',
                sigTermStateDate: 'sigTermStateDate',
                signatureID: 'signatureID',
                otherDetail1: 'otherDetail1',
                otherDetail2: 'otherDetail2',
                otherDetail3: 'otherDetail3',
                otherDetail4: 'otherDetail4',
                justificationRequired: 'justificationRequired',
                canReassign: 'canReassign',
                processInstanceId: 'processInstanceId',
                ifMultipleApprovers: 'ifMultipleApprovers',
                actingAs: 'actingAs'
            }
        },
        needAttentionRequestsGrid: {
            definition: 'AP:More Information',
            fields: {
                fromUser: '2',
                toUser: '4',
                description: '14506',
                application: '10050',
                requestID: '10051',
                attachment: '14893',
                question: '13300',
                response: '13301',
                state: '11016'
            }
        },
        requestDetailsGrid: {
            definition: 'AP:QCI-Detail-Join',
            approverDefinition: 'AP:PreviewInfo',
            questionDefinition: 'AP:Question-Comment-Info',
            questionTypeValue: 0,
            commentTypeValue: 1,
            fields: {
                from: 2,
                to: 4,
                application: 11001,
                type: 11002,
                signatureID: 11003,
                request: 11004,
                requestNumber: 13334,
                process: 10000,
                response: 11005,
                question: 11006,
                attachment: 11011,
                approver: 14201
            }
        }
    };

    var RxSignatureDetailDataPageService = /** @class */ (function (_super) {
        __extends(RxSignatureDetailDataPageService, _super);
        function RxSignatureDetailDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.approval.application.datapage.SignatureDetailDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxSignatureDetailDataPageService;
    }(i3.DataPage));
    RxSignatureDetailDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSignatureDetailDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxSignatureDetailDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSignatureDetailDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxSignatureDetailDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxApprovalUsersDataPageService = /** @class */ (function (_super) {
        __extends(RxApprovalUsersDataPageService, _super);
        function RxApprovalUsersDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.approval.application.datapage.ApprovalUsersDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxApprovalUsersDataPageService;
    }(i3.DataPage));
    RxApprovalUsersDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalUsersDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApprovalUsersDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalUsersDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalUsersDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxApprovalConsoleService = /** @class */ (function () {
        function RxApprovalConsoleService(httpClient, rxSignatureDetailDataPageService, rxCurrentUserService, rxRecordInstanceUtilsService, rxApprovalUsersDataPageService) {
            this.httpClient = httpClient;
            this.rxSignatureDetailDataPageService = rxSignatureDetailDataPageService;
            this.rxCurrentUserService = rxCurrentUserService;
            this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
            this.rxApprovalUsersDataPageService = rxApprovalUsersDataPageService;
        }
        RxApprovalConsoleService.prototype.getApprovalRequestCounts = function () {
            return this.httpClient.get("/api/" + i3.RX_APPLICATION.approvalBundleId + "/rx/application/approval/counts?ignoreAlternateUser=false");
        };
        RxApprovalConsoleService.prototype.getRequestLabelDetails = function (registeredDefinitionName, approvalFlowName) {
            return this.httpClient.get("/api/" + i3.RX_APPLICATION.approvalBundleId + "/rx/application/approval/labels/" + encodeURIComponent(registeredDefinitionName) + "/" + encodeURIComponent(approvalFlowName));
        };
        RxApprovalConsoleService.prototype.getCurrentRequestDetails = function (requestId, application) {
            return this.rxSignatureDetailDataPageService
                .get({
                params: {
                    request: requestId,
                    application: application,
                    ignoreAssignedUser: true
                }
            })
                .pipe(operators.map(function (response) { return response.data[0]; }));
        };
        RxApprovalConsoleService.prototype.approveRequest = function (approvalCommands) {
            return this.httpClient.post(i3.RX_RESOURCE_URLS.command, {
                resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
                commands: approvalCommands
            });
        };
        RxApprovalConsoleService.prototype.rejectRequest = function (approvalCommands) {
            return this.httpClient.post(i3.RX_RESOURCE_URLS.command, {
                resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
                commands: approvalCommands
            });
        };
        RxApprovalConsoleService.prototype.holdRequest = function (approvalCommands) {
            return this.httpClient.post(i3.RX_RESOURCE_URLS.command, {
                resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
                commands: approvalCommands
            });
        };
        RxApprovalConsoleService.prototype.reassignRequest = function (approvalCommands) {
            return this.httpClient.post(i3.RX_RESOURCE_URLS.command, {
                resourceType: RX_APPROVAL_CONSOLE.approvalServerCommand,
                commands: approvalCommands
            });
        };
        RxApprovalConsoleService.prototype.getCommandPayload = function (commandType, requestSignatureInstanceId) {
            return {
                formName: RX_APPROVAL_CONSOLE.approvalCommandForm,
                requestID: requestSignatureInstanceId,
                command: commandType
            };
        };
        RxApprovalConsoleService.prototype.saveQuestion = function (formData, type) {
            return this.httpClient.post("/api/" + i3.RX_APPLICATION.approvalBundleId + "/rx/application/approval/moreinformation/" + type, formData);
        };
        RxApprovalConsoleService.prototype.saveAttachment = function (formData, guid) {
            return this.httpClient.post(i2.RX_RECORD_DEFINITION.recordInstanceAttachment + "/" + encodeURIComponent(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition) + "/" + guid, formData);
        };
        RxApprovalConsoleService.prototype.getApprovalUsers = function (startIndex, pageSize, searchQuery) {
            var queryParams = {
                startIndex: startIndex,
                pageSize: pageSize,
                propertySelection: ['loginName', 'fullName']
            };
            queryParams.queryExpression = "'" + RX_APPROVAL_CONSOLE.approvalUserNameField + "'!=\"" + this.rxCurrentUserService.getName() + "\"";
            if (searchQuery) {
                queryParams.queryExpression +=
                    " AND ('" + i2.RX_RECORD_DEFINITION.coreFieldIds.description + "' LIKE \"%" + this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery) + "%\"" +
                        (" OR '" + RX_APPROVAL_CONSOLE.approvalUserNameField + "' LIKE \"%" + this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery) + "%\")");
            }
            return this.rxApprovalUsersDataPageService
                .get({
                params: Object.assign({ startIndex: startIndex, pageSize: pageSize }, queryParams)
            })
                .pipe(operators.map(function (response) { return ({
                totalSize: response.totalSize,
                options: response.data.map(function (_a) {
                    var fullName = _a.fullName, loginName = _a.loginName;
                    return ({
                        displayValue: fullName,
                        value: loginName
                    });
                })
            }); }));
        };
        return RxApprovalConsoleService;
    }());
    RxApprovalConsoleService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalConsoleService, deps: [{ token: i1__namespace.HttpClient }, { token: RxSignatureDetailDataPageService }, { token: i3__namespace.RxCurrentUserService }, { token: i2__namespace.RxRecordInstanceUtilsService }, { token: RxApprovalUsersDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApprovalConsoleService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalConsoleService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalConsoleService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: RxSignatureDetailDataPageService }, { type: i3__namespace.RxCurrentUserService }, { type: i2__namespace.RxRecordInstanceUtilsService }, { type: RxApprovalUsersDataPageService }]; } });

    var ApprovalRequestReassignComponent = /** @class */ (function (_super) {
        __extends(ApprovalRequestReassignComponent, _super);
        function ApprovalRequestReassignComponent(translateService, rxNotificationService, activeModalRef, rxApprovalConsoleService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.translateService = translateService;
            _this.rxNotificationService = rxNotificationService;
            _this.activeModalRef = activeModalRef;
            _this.rxApprovalConsoleService = rxApprovalConsoleService;
            _this.injector = injector;
            _this.selectedUser = [];
            _this.userLoaderFunc = _this.getApprovalUsers.bind(_this);
            return _this;
        }
        ApprovalRequestReassignComponent.prototype.isDirty = function () {
            return !!this.selectedUser.length;
        };
        ApprovalRequestReassignComponent.prototype.reassign = function () {
            var _this = this;
            this.allowDismiss = false;
            var commands = lodash.map(this.activeModalRef.getData().selectedRequestInstanceIds, function (signatureInstance) { return (Object.assign({ assignToApprovers: _this.selectedUser[0].value }, _this.rxApprovalConsoleService.getCommandPayload(ApprovalCommandType.Reassign, signatureInstance))); });
            this.rxApprovalConsoleService
                .reassignRequest(commands)
                .pipe(operators.finalize(function () {
                _this.allowDismiss = true;
            }))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.reassigned.message'));
                _this.activeModalRef.close(true);
            });
        };
        ApprovalRequestReassignComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ApprovalRequestReassignComponent.prototype.getApprovalUsers = function (startIndex, pageSize, searchQuery) {
            return this.rxApprovalConsoleService.getApprovalUsers(startIndex, pageSize, searchQuery);
        };
        ApprovalRequestReassignComponent.prototype.optionFormatter = function (option) {
            return option.value + " " + option.displayValue;
        };
        return ApprovalRequestReassignComponent;
    }(i6.RxModalClass));
    ApprovalRequestReassignComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestReassignComponent, deps: [{ token: i1__namespace$1.TranslateService }, { token: i3__namespace.RxNotificationService }, { token: i1__namespace$2.ActiveModalRef }, { token: RxApprovalConsoleService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestReassignComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestReassignComponent, selector: "rx-approval-request-reassign", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.request.reassign-dialog.title' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-select-with-pagination\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.request.reassign.label' | translate }}\"\n    class=\"form-group d-block\"\n    [(ngModel)]=\"selectedUser\"\n    [optionLoader]=\"userLoaderFunc\"\n    [required]=\"true\"\n    [template]=\"optionTemplate\"\n    [optionFormatter]=\"optionFormatter\"\n  ></rx-select-with-pagination>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"!selectedUser.length || !allowDismiss\"\n    (click)=\"reassign()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", components: [{ type: i5__namespace.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1__namespace$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestReassignComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-reassign',
                        templateUrl: './approval-request-reassign.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.TranslateService }, { type: i3__namespace.RxNotificationService }, { type: i1__namespace$2.ActiveModalRef }, { type: RxApprovalConsoleService }, { type: i0__namespace.Injector }]; } });

    var ApprovalRequestQuestionResponseComponent = /** @class */ (function (_super) {
        __extends(ApprovalRequestQuestionResponseComponent, _super);
        function ApprovalRequestQuestionResponseComponent(activeModalRef, rxRecordInstanceService, rxNotificationService, translateService, rxApprovalConsoleService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.rxRecordInstanceService = rxRecordInstanceService;
            _this.rxNotificationService = rxNotificationService;
            _this.translateService = translateService;
            _this.rxApprovalConsoleService = rxApprovalConsoleService;
            _this.injector = injector;
            _this.request = _this.activeModalRef.getData().selectedRequest;
            _this.attachment = [];
            _this.enableCustomDownload = true;
            _this.existingAttachmentName = _this.request[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment];
            _this.downloadAttachment = function () {
                _this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment), _this.request[i2.RX_RECORD_DEFINITION.coreFieldIds.id], _this.request[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment]);
            };
            return _this;
        }
        ApprovalRequestQuestionResponseComponent.prototype.isDirty = function () {
            return !this.isSaveButtonDisabled();
        };
        ApprovalRequestQuestionResponseComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            if (this.existingAttachmentName) {
                this.attachment = this.getExistingFile();
            }
        };
        ApprovalRequestQuestionResponseComponent.prototype.sendResponse = function () {
            var _this = this;
            this.allowDismiss = false;
            this.rxRecordInstanceService
                .get(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, this.request[i2.RX_RECORD_DEFINITION.coreFieldIds.id])
                .pipe(operators.switchMap(function (recordInstance) {
                recordInstance.setFieldValue(Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.response), _this.response);
                return _this.rxRecordInstanceService.save(recordInstance);
            }), operators.tap(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-added.message'));
            }), operators.switchMap(function () {
                if (_this.shouldSaveAttachment) {
                    var recordInstanceFormData = new FormData();
                    recordInstanceFormData.append(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment, _this.attachment[0].data, _this.attachment[0].data.name);
                    return _this.rxApprovalConsoleService.saveAttachment(recordInstanceFormData, _this.request[i2.RX_RECORD_DEFINITION.coreFieldIds.id]);
                }
                else {
                    return rxjs.of(null);
                }
            }), operators.finalize(function () {
                _this.allowDismiss = true;
            }))
                .subscribe(function () {
                _this.activeModalRef.close(true);
            });
        };
        ApprovalRequestQuestionResponseComponent.prototype.onRemovedFileFromQueue = function () {
            this.enableCustomDownload = false;
        };
        ApprovalRequestQuestionResponseComponent.prototype.onAfterFilesAdded = function () {
            this.shouldSaveAttachment = true;
        };
        ApprovalRequestQuestionResponseComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ApprovalRequestQuestionResponseComponent.prototype.getExistingFile = function () {
            return [
                {
                    data: new File([], this.existingAttachmentName),
                    inUploading: false,
                    inDeleting: false,
                    uploaded: 100,
                    error: false,
                    errorText: '',
                    allowDeletion: true
                }
            ];
        };
        ApprovalRequestQuestionResponseComponent.prototype.isSaveButtonDisabled = function () {
            var _a;
            return !this.allowDismiss || !this.response || (this.existingAttachmentName && !((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data));
        };
        return ApprovalRequestQuestionResponseComponent;
    }(i6.RxModalClass));
    ApprovalRequestQuestionResponseComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestQuestionResponseComponent, deps: [{ token: i1__namespace$2.ActiveModalRef }, { token: i2__namespace.RxRecordInstanceService }, { token: i3__namespace.RxNotificationService }, { token: i1__namespace$1.TranslateService }, { token: RxApprovalConsoleService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestQuestionResponseComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionResponseComponent, selector: "rx-approval-request-question-response", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.title' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-read-only-field\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.to-field.label' | translate }}\"\n    value=\"{{ request['2'] }}\"\n  ></rx-read-only-field>\n\n  <rx-read-only-field\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.question.label' | translate }}\"\n    value=\"{{ request['13300'] }}\"\n  ></rx-read-only-field>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-field.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"response\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"2\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [required]=\"existingAttachmentName\"\n    [showMaxSizeRestriction]=\"false\"\n    (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n    (afterFilesAdded)=\"onAfterFilesAdded()\"\n    [enableCustomDownload]=\"enableCustomDownload\"\n    [customDownload]=\"downloadAttachment\"\n    [reusable]=\"true\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"sendResponse()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:9em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}:host ::ng-deep adapt-rx-uploader .adapt-uploader-file-uploaded{display:none}\n"], components: [{ type: i6__namespace$1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i1__namespace$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$2.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1__namespace$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestQuestionResponseComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-question-response',
                        templateUrl: './approval-request-question-response.component.html',
                        styleUrls: ['./approval-request-question-response.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.ActiveModalRef }, { type: i2__namespace.RxRecordInstanceService }, { type: i3__namespace.RxNotificationService }, { type: i1__namespace$1.TranslateService }, { type: RxApprovalConsoleService }, { type: i0__namespace.Injector }]; } });

    var ApprovalRequestActionReasonInputComponent = /** @class */ (function (_super) {
        __extends(ApprovalRequestActionReasonInputComponent, _super);
        function ApprovalRequestActionReasonInputComponent(activeModalRef, rxNotificationService, translateService, rxApprovalConsoleService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.rxNotificationService = rxNotificationService;
            _this.translateService = translateService;
            _this.rxApprovalConsoleService = rxApprovalConsoleService;
            _this.injector = injector;
            _this.currentRequestIndex = 0;
            _this.requests = [];
            _this.title = _this.activeModalRef.getData().modalTitle;
            _this.commandType = _this.activeModalRef.getData().commandType;
            return _this;
        }
        ApprovalRequestActionReasonInputComponent.prototype.isDirty = function () {
            return lodash.some(this.requests, function (request) { return request.reason; });
        };
        ApprovalRequestActionReasonInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.requests = lodash.map(this.activeModalRef.getData().selectedRequests, function (request) { return ({
                requestId: request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request],
                requestSignatureInstanceId: request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID],
                reason: null,
                isReasonRequired: request.justificationRequired === 'TO_APPROVE_OR_REJECT' ||
                    (_this.commandType === ApprovalCommandType.Approved && request.justificationRequired === 'TO_APPROVE') ||
                    (_this.commandType === ApprovalCommandType.Rejected && request.justificationRequired === 'TO_REJECT')
            }); });
        };
        ApprovalRequestActionReasonInputComponent.prototype.isSaveButtonDisabled = function () {
            var _this = this;
            return (!this.allowDismiss ||
                (lodash.some(this.requests, function (request) { return request.isReasonRequired && _this.isReasonEmpty(request.reason); }) &&
                    !this.shouldApplySameReasonToAll));
        };
        ApprovalRequestActionReasonInputComponent.prototype.goToPreviousRequest = function () {
            this.currentRequestIndex--;
        };
        ApprovalRequestActionReasonInputComponent.prototype.goToNextRequest = function () {
            this.currentRequestIndex++;
        };
        ApprovalRequestActionReasonInputComponent.prototype.saveRequests = function () {
            var _this = this;
            this.allowDismiss = false;
            var commonReason = this.requests[this.currentRequestIndex].reason;
            var commands = __spreadArray([], __read(lodash.map(this.requests, function (request) { return (Object.assign({ justificationOrReason: _this.shouldApplySameReasonToAll ? commonReason : request.reason }, _this.rxApprovalConsoleService.getCommandPayload(_this.commandType, request.requestSignatureInstanceId))); })));
            this.rxApprovalConsoleService
                .rejectRequest(commands)
                .pipe(operators.finalize(function () {
                _this.allowDismiss = true;
            }))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant(_this.commandType === ApprovalCommandType.Rejected
                    ? 'com.bmc.arsys.rx.client.approval.console.request.rejected.message'
                    : 'com.bmc.arsys.rx.client.approval.console.request.approved.message'));
                _this.activeModalRef.close(true);
            });
        };
        ApprovalRequestActionReasonInputComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ApprovalRequestActionReasonInputComponent.prototype.isReasonEmpty = function (reason) {
            return !lodash.trim(reason);
        };
        return ApprovalRequestActionReasonInputComponent;
    }(i6.RxModalClass));
    ApprovalRequestActionReasonInputComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestActionReasonInputComponent, deps: [{ token: i1__namespace$2.ActiveModalRef }, { token: i3__namespace.RxNotificationService }, { token: i1__namespace$1.TranslateService }, { token: RxApprovalConsoleService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestActionReasonInputComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestActionReasonInputComponent, selector: "rx-approval-request-action-reason-input", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ title }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.grid.column.requestId' | translate }}\"\n    [(ngModel)]=\"requests[currentRequestIndex].requestId\"\n    [readonly]=\"true\"\n    rx-id=\"request-id\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.justification-reason.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"requests[currentRequestIndex].reason\"\n    [required]=\"requests[currentRequestIndex].isReasonRequired\"\n    rx-id=\"justification-reason\"\n    rows=\"2\"\n    [autofocus]=\"true\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-switch\n    class=\"d-block mb-2\"\n    [(ngModel)]=\"shouldApplySameReasonToAll\"\n    [disabled]=\"isReasonEmpty(requests[currentRequestIndex].reason)\"\n    rx-id=\"all-request-reason\"\n    label=\"{{ 'com.bmc.arsys.rx.client.approval.console.apply-common-justification-reason.label' | translate }}\"\n  ></adapt-rx-switch>\n\n  <div class=\"text-warning\" *ngIf=\"shouldApplySameReasonToAll\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.overwrite-justification-reason.warning' | translate }}\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"secondary\"\n    rx-id=\"previous-button\"\n    [disabled]=\"currentRequestIndex === 0 || shouldApplySameReasonToAll\"\n    (click)=\"goToPreviousRequest()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n  </button>\n\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-auto\"\n    btn-type=\"secondary\"\n    rx-id=\"next-button\"\n    [disabled]=\"currentRequestIndex === requests.length - 1 || shouldApplySameReasonToAll\"\n    (click)=\"goToNextRequest()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n  </button>\n\n  <button\n    type=\"button\"\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveRequests()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$2.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestActionReasonInputComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-action-reason-input',
                        templateUrl: './approval-request-action-reason-input.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.ActiveModalRef }, { type: i3__namespace.RxNotificationService }, { type: i1__namespace$1.TranslateService }, { type: RxApprovalConsoleService }, { type: i0__namespace.Injector }]; } });

    var RxApprovalConsoleHelperService = /** @class */ (function () {
        function RxApprovalConsoleHelperService(datePipe) {
            this.datePipe = datePipe;
        }
        RxApprovalConsoleHelperService.prototype.formatValue = function (value) {
            var timeFormat = 'h:mm:ss A';
            var dateFormat = 'M/D/YYYY';
            if (!/^\d+$/.test(value) && moment__default["default"](value, [dateFormat + " " + timeFormat, moment__default["default"].ISO_8601], true).isValid()) {
                value = this.datePipe.transform(new Date(value), 'medium');
            }
            else if (moment__default["default"](value, dateFormat, true).isValid()) {
                value = this.datePipe.transform(new Date(value), 'mediumDate');
            }
            else if (moment__default["default"](value, timeFormat, true).isValid()) {
                value = moment__default["default"](value, timeFormat).format('HH:mm A');
            }
            return value;
        };
        return RxApprovalConsoleHelperService;
    }());
    RxApprovalConsoleHelperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalConsoleHelperService, deps: [{ token: i3__namespace$1.DatePipe }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApprovalConsoleHelperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalConsoleHelperService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalConsoleHelperService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i3__namespace$1.DatePipe }]; } });

    var ApprovalRequestGeneralDetailsComponent = /** @class */ (function () {
        function ApprovalRequestGeneralDetailsComponent(rxApprovalConsoleHelperService, rxDefinitionNameService, datePipe, translateService, rxApprovalConsoleService) {
            var _b;
            var _this = this;
            this.rxApprovalConsoleHelperService = rxApprovalConsoleHelperService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.datePipe = datePipe;
            this.translateService = translateService;
            this.rxApprovalConsoleService = rxApprovalConsoleService;
            this.approvalRequest$ = new rxjs.Subject();
            this.allRequestFields$ = this.approvalRequest$.pipe(operators.tap(function () {
                _this.busy = rxjs.NEVER.subscribe();
            }), operators.switchMap(function (currentRequest) { return _this.gridType === ApprovalGridType.NeedAttentionRequests
                ? _this.rxApprovalConsoleService.getCurrentRequestDetails(currentRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], currentRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application])
                : rxjs.of(currentRequest); }), operators.switchMap(function (approvalRequest) { return rxjs.combineLatest([
                rxjs.of(approvalRequest),
                _this.rxApprovalConsoleService.getRequestLabelDetails(approvalRequest.application, approvalRequest.process)
            ]); }), operators.map(function (_b) {
                var _c = __read(_b, 2), approvalRequest = _c[0], requestLabelDetails = _c[1];
                var allFields = [
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-id.label'),
                        value: approvalRequest.resolvedDisplayValues.request || approvalRequest.request
                    },
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.console.requester.label'),
                        value: approvalRequest.resolvedDisplayValues.requester || approvalRequest.requester
                    },
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-date.label'),
                        value: _this.datePipe.transform(approvalRequest.createDateSig, 'medium')
                    },
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                        value: approvalRequest.resolvedDisplayValues.summary || approvalRequest.summary
                    },
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                        value: _this.statuses[approvalRequest.status]
                    },
                    {
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.console.status-date.label'),
                        value: _this.datePipe.transform(approvalRequest.sigTermStateDate, 'medium')
                    }
                ];
                if (approvalRequest.actionDate) {
                    allFields.push({
                        label: '',
                        value: _this.datePipe.transform(approvalRequest.actionDate, 'medium')
                    });
                }
                if (approvalRequest.justification) {
                    allFields.push({
                        label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.justification-reason.label'),
                        value: approvalRequest.justification
                    });
                }
                var labelValues = {
                    14508: approvalRequest.resolvedDisplayValues.otherDetail1,
                    14509: approvalRequest.resolvedDisplayValues.otherDetail2,
                    14510: approvalRequest.resolvedDisplayValues.otherDetail3,
                    14511: approvalRequest.resolvedDisplayValues.otherDetail4
                };
                lodash.forEach(requestLabelDetails, function (label, key) {
                    if (label) {
                        allFields.push({
                            label: requestLabelDetails[key],
                            value: _this.rxApprovalConsoleHelperService.formatValue(labelValues[key])
                        });
                    }
                });
                allFields.push({
                    label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.console.activity-log.label'),
                    value: _this.rxDefinitionNameService.getDisplayName(approvalRequest.application) + " " + (approvalRequest.resolvedDisplayValues.request || approvalRequest.request) + ", " + (approvalRequest.resolvedDisplayValues.requester || approvalRequest.requester)
                });
                return allFields;
            }), operators.tap(function () {
                _this.busy = rxjs.EMPTY.subscribe();
            }));
            this.statuses = (_b = {},
                _b[ApprovalRequestStatus.Pending] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
                _b[ApprovalRequestStatus.RequestMoreInfo] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                _b[ApprovalRequestStatus.Hold] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
                _b[ApprovalRequestStatus.MoreInfo] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                _b[ApprovalRequestStatus.NeedsAttention] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.needAttention.labelKey),
                _b[ApprovalRequestStatus.Approved] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
                _b[ApprovalRequestStatus.Rejected] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
                _b[ApprovalRequestStatus.Cancelled] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
                _b[ApprovalRequestStatus.Error] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
                _b[ApprovalRequestStatus.Closed] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey),
                _b);
        }
        ApprovalRequestGeneralDetailsComponent.prototype.ngOnChanges = function (changes) {
            var _a;
            if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
                this.approvalRequest$.next(changes.approvalRequest.currentValue);
            }
        };
        return ApprovalRequestGeneralDetailsComponent;
    }());
    ApprovalRequestGeneralDetailsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestGeneralDetailsComponent, deps: [{ token: RxApprovalConsoleHelperService }, { token: i3__namespace.RxDefinitionNameService }, { token: i3__namespace$1.DatePipe }, { token: i1__namespace$1.TranslateService }, { token: RxApprovalConsoleService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestGeneralDetailsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestGeneralDetailsComponent, selector: "rx-approval-request-general-details", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, usesOnChanges: true, ngImport: i0__namespace, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<adapt-empty-state\n  type=\"alerts\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<div [hidden]=\"!approvalRequest\" *ngIf=\"allRequestFields$ | async as requestFields\" class=\"pt-2 pl-3\">\n  <rx-read-only-field\n    *ngFor=\"let field of requestFields\"\n    class=\"d-block form-group\"\n    label=\"{{ field.label }}\"\n    value=\"{{ field.value }}\"\n  ></rx-read-only-field>\n</div>\n", styles: [":host{display:block;position:relative;min-height:65%}\n"], components: [{ type: i6__namespace$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1__namespace$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i6__namespace$1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i1__namespace$1.TranslatePipe, "async": i3__namespace$1.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestGeneralDetailsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-general-details',
                        templateUrl: './approval-request-general-details.component.html',
                        styleUrls: ['./approval-request-general-details.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: RxApprovalConsoleHelperService }, { type: i3__namespace.RxDefinitionNameService }, { type: i3__namespace$1.DatePipe }, { type: i1__namespace$1.TranslateService }, { type: RxApprovalConsoleService }]; }, propDecorators: { approvalRequest: [{
                    type: i0.Input
                }], gridType: [{
                    type: i0.Input
                }] } });

    var ApprovalRequestApproversComponent = /** @class */ (function () {
        function ApprovalRequestApproversComponent(translateService, rxApprovalConsoleService, rxRecordInstanceDataPageService) {
            this.translateService = translateService;
            this.rxApprovalConsoleService = rxApprovalConsoleService;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        }
        ApprovalRequestApproversComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                enableRowSelection: null,
                getData: function (queryParams) { return _this.getApproversData(queryParams); },
                columns: this.getColumns(),
                getRecordDefinition: function () { return rxjs.of(_this.getRecordDefinition()); },
                recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.approverDefinition,
                styles: 'flex-fill'
            });
        };
        ApprovalRequestApproversComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
                (_b = this.requestApproversGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
            }
        };
        ApprovalRequestApproversComponent.prototype.getApproversData = function (queryParams) {
            var _this = this;
            return rxjs.iif(function () { return _this.gridType === ApprovalGridType.NeedAttentionRequests; }, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), rxjs.of(this.approvalRequest)).pipe(operators.switchMap(function (currentRequest) {
                var _c;
                return _this.rxRecordInstanceDataPageService.post({
                    params: lodash.omit(Object.assign(Object.assign({}, queryParams), (_c = { shouldIncludeTotalSize: true }, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.requestNumber] = currentRequest[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request], _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.process] = currentRequest[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process], _c)), ['searchText', 'propertySelection'])
                });
            }));
        };
        ApprovalRequestApproversComponent.prototype.getRecordDefinition = function () {
            return {
                fieldDefinitions: [
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.approver,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: i2.RX_RECORD_DEFINITION.coreFieldIds.status,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.selection,
                        optionNamesById: {
                            0: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
                            1: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
                            2: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
                            3: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
                            4: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                            5: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
                            6: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
                            7: this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey)
                        }
                    }
                ]
            };
        };
        ApprovalRequestApproversComponent.prototype.getColumns = function () {
            return [
                {
                    index: 0,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.approver.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.approvers.grid.approver.title'),
                    filterable: false,
                    sortable: false
                },
                {
                    index: 1,
                    fieldId: i2.RX_RECORD_DEFINITION.coreFieldIds.status.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label')
                }
            ];
        };
        return ApprovalRequestApproversComponent;
    }());
    ApprovalRequestApproversComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestApproversComponent, deps: [{ token: i1__namespace$1.TranslateService }, { token: RxApprovalConsoleService }, { token: i2__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestApproversComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestApproversComponent, selector: "rx-approval-request-approvers", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestApproversGrid", first: true, predicate: ["requestApproversGrid"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-empty-state\n  type=\"objects\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestApproversGrid></rx-record-grid>\n", styles: [":host ::ng-deep rx-record-grid .adapt-table-search-toolbar-container{display:none}\n"], components: [{ type: i1__namespace$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i10__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestApproversComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-approvers',
                        templateUrl: './approval-request-approvers.component.html',
                        styleUrls: ['./approval-request-approvers.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.TranslateService }, { type: RxApprovalConsoleService }, { type: i2__namespace.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                    type: i0.Input
                }], gridType: [{
                    type: i0.Input
                }], requestApproversGrid: [{
                    type: i0.ViewChild,
                    args: ['requestApproversGrid']
                }] } });

    var ApprovalRequestQuestionComponent = /** @class */ (function (_super) {
        __extends(ApprovalRequestQuestionComponent, _super);
        function ApprovalRequestQuestionComponent(rxApprovalConsoleService, rxNotificationService, translateService, activeModalRef, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.rxApprovalConsoleService = rxApprovalConsoleService;
            _this.rxNotificationService = rxNotificationService;
            _this.translateService = translateService;
            _this.activeModalRef = activeModalRef;
            _this.injector = injector;
            _this.selectedUser = [];
            _this.userLoaderFunc = _this.getApprovalUsers.bind(_this);
            _this.attachment = [];
            return _this;
        }
        ApprovalRequestQuestionComponent.prototype.isDirty = function () {
            var _a, _b;
            return !!(this.question || ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data) || ((_b = this.selectedUser[0]) === null || _b === void 0 ? void 0 : _b.value));
        };
        ApprovalRequestQuestionComponent.prototype.saveQuestion = function () {
            var _this = this;
            var _a;
            this.allowDismiss = false;
            var formData = new FormData();
            var request = this.activeModalRef.getData().selectedRequest;
            formData.append('to', this.selectedUser[0].value);
            formData.append('question', this.question);
            formData.append('application', request.application);
            formData.append('applicationRequestId', request.resolvedDisplayValues.request);
            formData.append('signatureID', request.signatureID);
            if ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data) {
                formData.append('attachment', this.attachment[0].data, this.attachment[0].data.name);
            }
            this.rxApprovalConsoleService
                .saveQuestion(formData, 'question')
                .pipe(operators.finalize(function () {
                _this.allowDismiss = true;
            }))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.approval.console.questions.question-added.message'));
                _this.activeModalRef.close(true);
            });
        };
        ApprovalRequestQuestionComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ApprovalRequestQuestionComponent.prototype.getApprovalUsers = function (startIndex, pageSize, searchQuery) {
            return this.rxApprovalConsoleService.getApprovalUsers(startIndex, pageSize, searchQuery);
        };
        ApprovalRequestQuestionComponent.prototype.optionFormatter = function (option) {
            return option.value + " " + option.displayValue;
        };
        return ApprovalRequestQuestionComponent;
    }(i6.RxModalClass));
    ApprovalRequestQuestionComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestQuestionComponent, deps: [{ token: RxApprovalConsoleService }, { token: i3__namespace.RxNotificationService }, { token: i1__namespace$1.TranslateService }, { token: i1__namespace$2.ActiveModalRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestQuestionComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionComponent, selector: "rx-approval-request-question", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.questions.new.label' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <rx-select-with-pagination\n    label=\"{{ 'com.bmc.arsys.rx.client.common.send-to.label' | translate }}\"\n    class=\"form-group d-block\"\n    [(ngModel)]=\"selectedUser\"\n    [optionLoader]=\"userLoaderFunc\"\n    [required]=\"true\"\n    [template]=\"optionTemplate\"\n    [optionFormatter]=\"optionFormatter\"\n  ></rx-select-with-pagination>\n\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.common.question.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"question\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"2\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [enableDnD]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"!selectedUser.length || !question || !allowDismiss\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveQuestion()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.displayValue }}</strong>\n\n  <div class=\"text-secondary\">\n    {{ option.value }}\n  </div>\n</ng-template>\n", components: [{ type: i5__namespace.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1__namespace$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$2.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1__namespace$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestQuestionComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-question',
                        templateUrl: './approval-request-question.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: RxApprovalConsoleService }, { type: i3__namespace.RxNotificationService }, { type: i1__namespace$1.TranslateService }, { type: i1__namespace$2.ActiveModalRef }, { type: i0__namespace.Injector }]; } });

    var ApprovalRequestQuestionsComponent = /** @class */ (function () {
        function ApprovalRequestQuestionsComponent(translateService, rxRecordInstanceService, rxModalService, adaptModalService, rxApprovalConsoleService, rxRecordInstanceDataPageService) {
            this.translateService = translateService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxModalService = rxModalService;
            this.adaptModalService = adaptModalService;
            this.rxApprovalConsoleService = rxApprovalConsoleService;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.questionSubmitted = new i0.EventEmitter();
        }
        ApprovalRequestQuestionsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                enableRowSelection: null,
                getData: function (queryParams) { return _this.getQuestionData(queryParams); },
                columns: this.getQuestionColumns(),
                getRecordDefinition: function () { return rxjs.of(_this.getQuestionRecordDefinition()); },
                recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.definition,
                styles: 'flex-fill'
            });
        };
        ApprovalRequestQuestionsComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
                (_b = this.requestQuestionsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
            }
        };
        ApprovalRequestQuestionsComponent.prototype.isNewQuestionButtonDisabled = function () {
            return !lodash.includes([ApprovalRequestStatus.Pending, ApprovalRequestStatus.Hold], this.requestsTabStatus);
        };
        ApprovalRequestQuestionsComponent.prototype.askNewQuestion = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                content: ApprovalRequestQuestionComponent,
                size: 'sm',
                data: {
                    selectedRequest: this.approvalRequest
                }
            })
                .then(function (result) {
                if (result) {
                    _this.questionSubmitted.emit();
                }
            })
                .catch(lodash.noop);
        };
        ApprovalRequestQuestionsComponent.prototype.getQuestionData = function (queryParams) {
            var _this = this;
            return rxjs.iif(function () { return _this.gridType === ApprovalGridType.NeedAttentionRequests; }, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), rxjs.of(this.approvalRequest)).pipe(operators.switchMap(function (currentRequest) {
                var _c;
                return _this.rxRecordInstanceDataPageService.post({
                    params: lodash.omit(Object.assign(Object.assign({}, queryParams), (_c = { shouldIncludeTotalSize: true }, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.application] = currentRequest.application, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.type] = RX_APPROVAL_CONSOLE.requestDetailsGrid.questionTypeValue, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.request] = currentRequest.request, _c)), ['searchText'])
                });
            }));
        };
        ApprovalRequestQuestionsComponent.prototype.getQuestionColumns = function () {
            var _this = this;
            return [
                {
                    index: 0,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.to.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.questions.grid.column.question-to.title')
                },
                {
                    index: 1,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.from.label')
                },
                {
                    index: 2,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.question.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.showQuestionDetails(selectedRow);
                            }
                        }
                    ],
                    filterable: false,
                    sortable: false
                },
                {
                    index: 3,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.questions.grid.column.response.title'),
                    filterable: false,
                    sortable: false
                },
                {
                    index: 4,
                    fieldId: i2.RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                    visible: false,
                    filterable: false
                },
                {
                    index: 5,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.requestDetailsGrid.questionDefinition, Number(RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment), selectedRow[i2.RX_RECORD_DEFINITION.coreFieldIds.id].split('|')[0], selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
                            }
                        }
                    ]
                }
            ];
        };
        ApprovalRequestQuestionsComponent.prototype.getQuestionRecordDefinition = function () {
            return {
                fieldDefinitions: [
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.to,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.question,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.attachment
                    },
                    {
                        id: i2.RX_RECORD_DEFINITION.coreFieldIds.id,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            };
        };
        ApprovalRequestQuestionsComponent.prototype.showQuestionDetails = function (selectedRow) {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.title'),
                content: i6.ReadOnlyFieldsModalComponent,
                size: 'sm',
                data: {
                    fields: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.send-to.label'),
                            value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.to]
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                            value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.question]
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.response-field.label'),
                            value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response] ||
                                this.translateService.instant('com.bmc.arsys.rx.client.approval.console.question-response-dialog.not-responded.message')
                        }
                    ]
                }
            })
                .catch(lodash.noop);
        };
        return ApprovalRequestQuestionsComponent;
    }());
    ApprovalRequestQuestionsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestQuestionsComponent, deps: [{ token: i1__namespace$1.TranslateService }, { token: i2__namespace.RxRecordInstanceService }, { token: i6__namespace$1.RxModalService }, { token: i1__namespace$2.AdaptModalService }, { token: RxApprovalConsoleService }, { token: i2__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestQuestionsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestQuestionsComponent, selector: "rx-approval-request-questions", inputs: { approvalRequest: "approvalRequest", requestsTabStatus: "requestsTabStatus", gridType: "gridType" }, outputs: { questionSubmitted: "questionSubmitted" }, viewQueries: [{ propertyName: "requestQuestionsGrid", first: true, predicate: ["requestQuestionsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-empty-state\n  type=\"rules\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<button\n  type=\"button\"\n  class=\"p-0 mb-2 d-icon-plus_circle align-self-start\"\n  adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"new-question-button\"\n  (click)=\"askNewQuestion()\"\n  *ngIf=\"approvalRequest\"\n  [disabled]=\"isNewQuestionButtonDisabled()\"\n>\n  {{ 'com.bmc.arsys.rx.client.approval.console.questions.new.label' | translate }}\n</button>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestQuestionsGrid></rx-record-grid>\n", components: [{ type: i1__namespace$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i10__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestQuestionsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-questions',
                        templateUrl: './approval-request-questions.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.TranslateService }, { type: i2__namespace.RxRecordInstanceService }, { type: i6__namespace$1.RxModalService }, { type: i1__namespace$2.AdaptModalService }, { type: RxApprovalConsoleService }, { type: i2__namespace.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                    type: i0.Input
                }], requestsTabStatus: [{
                    type: i0.Input
                }], gridType: [{
                    type: i0.Input
                }], questionSubmitted: [{
                    type: i0.Output
                }], requestQuestionsGrid: [{
                    type: i0.ViewChild,
                    args: ['requestQuestionsGrid']
                }] } });

    var ApprovalRequestCommentComponent = /** @class */ (function (_super) {
        __extends(ApprovalRequestCommentComponent, _super);
        function ApprovalRequestCommentComponent(activeModalRef, translateService, rxNotificationService, rxApprovalConsoleService, injector) {
            var _this = _super.call(this, activeModalRef, injector) || this;
            _this.activeModalRef = activeModalRef;
            _this.translateService = translateService;
            _this.rxNotificationService = rxNotificationService;
            _this.rxApprovalConsoleService = rxApprovalConsoleService;
            _this.injector = injector;
            _this.attachment = [];
            return _this;
        }
        ApprovalRequestCommentComponent.prototype.isDirty = function () {
            var _a;
            return !!(this.comment || ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data));
        };
        ApprovalRequestCommentComponent.prototype.saveComment = function () {
            var _this = this;
            var _a;
            this.allowDismiss = false;
            var formData = new FormData();
            var request = this.activeModalRef.getData().selectedRequest;
            formData.append('comments', this.comment);
            formData.append('application', request.application);
            formData.append('applicationRequestId', request.resolvedDisplayValues.request);
            formData.append('signatureID', request.signatureID);
            if ((_a = this.attachment[0]) === null || _a === void 0 ? void 0 : _a.data) {
                formData.append('attachment', this.attachment[0].data, this.attachment[0].data.name);
            }
            this.rxApprovalConsoleService
                .saveQuestion(formData, 'comment')
                .pipe(operators.finalize(function () {
                _this.allowDismiss = true;
            }))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.approval.console.comments.comment-added.message'));
                _this.activeModalRef.close(true);
            });
        };
        ApprovalRequestCommentComponent.prototype.cancel = function () {
            this.activeModalRef.dismiss(i1$1.DismissReasons.CLOSE_BTN);
        };
        ApprovalRequestCommentComponent.prototype.isCommentEmpty = function () {
            return !lodash.trim(this.comment);
        };
        return ApprovalRequestCommentComponent;
    }(i6.RxModalClass));
    ApprovalRequestCommentComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestCommentComponent, deps: [{ token: i1__namespace$2.ActiveModalRef }, { token: i1__namespace$1.TranslateService }, { token: i3__namespace.RxNotificationService }, { token: RxApprovalConsoleService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestCommentComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestCommentComponent, selector: "rx-approval-request-comment", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.approval.console.comments.new.label' | translate }}\n  </h5>\n\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-textarea\n    label=\"{{ 'com.bmc.arsys.rx.client.common.comment.label' | translate }}\"\n    class=\"d-block form-group\"\n    [(ngModel)]=\"comment\"\n    [required]=\"true\"\n    [autofocus]=\"true\"\n    rows=\"3\"\n  ></adapt-rx-textarea>\n\n  <adapt-rx-uploader\n    adaptRequired\n    [(ngModel)]=\"attachment\"\n    [enableDnD]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.attachment.label' | translate }}\"\n  >\n  </adapt-rx-uploader>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    class=\"mr-2\"\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isCommentEmpty() || !allowDismiss\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"saveComment()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1__namespace$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1__namespace$2.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1__namespace$2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestCommentComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-comment',
                        templateUrl: './approval-request-comment.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.ActiveModalRef }, { type: i1__namespace$1.TranslateService }, { type: i3__namespace.RxNotificationService }, { type: RxApprovalConsoleService }, { type: i0__namespace.Injector }]; } });

    var RxApprovalQCIDataPageService = /** @class */ (function (_super) {
        __extends(RxApprovalQCIDataPageService, _super);
        function RxApprovalQCIDataPageService(injector) {
            var _this = _super.call(this, injector, 'com.bmc.arsys.rx.approval.application.datapage.ApprovalQCIDataPageQuery') || this;
            _this.injector = injector;
            return _this;
        }
        return RxApprovalQCIDataPageService;
    }(i3.DataPage));
    RxApprovalQCIDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalQCIDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxApprovalQCIDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalQCIDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxApprovalQCIDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var ApprovalRequestCommentsComponent = /** @class */ (function () {
        function ApprovalRequestCommentsComponent(rxApprovalQCIDataPageService, rxModalService, rxApprovalConsoleService, adaptModalService, rxDataPageService, rxRecordInstanceService, translateService) {
            this.rxApprovalQCIDataPageService = rxApprovalQCIDataPageService;
            this.rxModalService = rxModalService;
            this.rxApprovalConsoleService = rxApprovalConsoleService;
            this.adaptModalService = adaptModalService;
            this.rxDataPageService = rxDataPageService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.translateService = translateService;
        }
        ApprovalRequestCommentsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                enableRowSelection: null,
                getData: function (queryParams) { return _this.getCommentData(queryParams); },
                columns: this.getCommentColumns(),
                getRecordDefinition: function () { return rxjs.of(_this.getCommentRecordDefinition()); },
                recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.definition,
                styles: 'flex-fill'
            });
        };
        ApprovalRequestCommentsComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
                (_b = this.requestCommentsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
            }
        };
        ApprovalRequestCommentsComponent.prototype.addNewComment = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                content: ApprovalRequestCommentComponent,
                size: 'sm',
                data: {
                    selectedRequest: this.selectedRequest
                }
            })
                .then(function (result) {
                if (result) {
                    _this.requestCommentsGrid.api.refresh().subscribe();
                }
            })
                .catch(lodash.noop);
        };
        ApprovalRequestCommentsComponent.prototype.getCommentData = function (queryParams) {
            var _this = this;
            return rxjs.iif(function () { return _this.gridType === ApprovalGridType.NeedAttentionRequests; }, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), rxjs.of(this.approvalRequest)).pipe(operators.tap(function (currentRequest) {
                _this.selectedRequest = currentRequest;
            }), operators.switchMap(function (currentRequest) {
                var _c;
                return _this.rxApprovalQCIDataPageService.get({
                    params: lodash.omit(Object.assign(Object.assign({}, queryParams), (_c = { shouldIncludeTotalSize: true }, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.application] = currentRequest.application, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.signatureID] = currentRequest.signatureID, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.type] = RX_APPROVAL_CONSOLE.requestDetailsGrid.commentTypeValue, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.request] = currentRequest.request, _c)), ['searchText'])
                });
            }));
        };
        ApprovalRequestCommentsComponent.prototype.getCommentColumns = function () {
            var _this = this;
            return [
                {
                    index: 1,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.submitter.label')
                },
                {
                    index: 2,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.comment.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.showCommentDetails(selectedRow);
                            }
                        }
                    ],
                    sortable: false
                },
                {
                    index: 3,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.requestDetailsGrid.questionDefinition, Number(RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment), selectedRow[i2.RX_RECORD_DEFINITION.coreFieldIds.id].split('|')[0], selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
                            }
                        }
                    ]
                },
                {
                    index: 4,
                    fieldId: i2.RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                    visible: false,
                    filterable: false
                }
            ];
        };
        ApprovalRequestCommentsComponent.prototype.getCommentRecordDefinition = function () {
            return {
                fieldDefinitions: [
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.attachment
                    },
                    {
                        id: i2.RX_RECORD_DEFINITION.coreFieldIds.id,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            };
        };
        ApprovalRequestCommentsComponent.prototype.showCommentDetails = function (selectedRow) {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.comment.label'),
                content: i6.ReadOnlyFieldsModalComponent,
                data: {
                    fields: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.submitter.label'),
                            value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from]
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.comment.label'),
                            value: selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.response]
                        }
                    ]
                },
                size: 'sm'
            })
                .catch(lodash.noop);
        };
        return ApprovalRequestCommentsComponent;
    }());
    ApprovalRequestCommentsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestCommentsComponent, deps: [{ token: RxApprovalQCIDataPageService }, { token: i6__namespace$1.RxModalService }, { token: RxApprovalConsoleService }, { token: i1__namespace$2.AdaptModalService }, { token: i3__namespace.RxDataPageFactoryService }, { token: i2__namespace.RxRecordInstanceService }, { token: i1__namespace$1.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestCommentsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestCommentsComponent, selector: "rx-approval-request-comments", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestCommentsGrid", first: true, predicate: ["requestCommentsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-empty-state\n  type=\"events\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<button\n  type=\"button\"\n  class=\"p-0 mb-2 d-icon-plus_circle align-self-start\"\n  adapt-button\n  btn-type=\"tertiary\"\n  rx-id=\"new-comment-button\"\n  *ngIf=\"approvalRequest\"\n  (click)=\"addNewComment()\"\n>\n  {{ 'com.bmc.arsys.rx.client.approval.console.comments.new.label' | translate }}\n</button>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestCommentsGrid></rx-record-grid>\n", components: [{ type: i1__namespace$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i10__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestCommentsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-comments',
                        templateUrl: './approval-request-comments.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: RxApprovalQCIDataPageService }, { type: i6__namespace$1.RxModalService }, { type: RxApprovalConsoleService }, { type: i1__namespace$2.AdaptModalService }, { type: i3__namespace.RxDataPageFactoryService }, { type: i2__namespace.RxRecordInstanceService }, { type: i1__namespace$1.TranslateService }]; }, propDecorators: { approvalRequest: [{
                    type: i0.Input
                }], gridType: [{
                    type: i0.Input
                }], requestCommentsGrid: [{
                    type: i0.ViewChild,
                    args: ['requestCommentsGrid']
                }] } });

    var ApprovalRequestAttachmentsComponent = /** @class */ (function () {
        function ApprovalRequestAttachmentsComponent(rxApprovalConsoleService, translateService, rxRecordInstanceService, rxRecordInstanceDataPageService) {
            this.rxApprovalConsoleService = rxApprovalConsoleService;
            this.translateService = translateService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        }
        ApprovalRequestAttachmentsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                enableRowSelection: null,
                getData: function (queryParams) { return _this.getAttachmentData(queryParams); },
                columns: this.getAttachmentColumns(),
                getRecordDefinition: function () { return rxjs.of(_this.getAttachmentRecordDefinition()); },
                recordDefinitionName: RX_APPROVAL_CONSOLE.requestDetailsGrid.definition,
                styles: 'flex-fill'
            });
        };
        ApprovalRequestAttachmentsComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            if ((_a = changes.approvalRequest) === null || _a === void 0 ? void 0 : _a.currentValue) {
                (_b = this.requestAttachmentsGrid) === null || _b === void 0 ? void 0 : _b.api.refresh().subscribe();
            }
        };
        ApprovalRequestAttachmentsComponent.prototype.getAttachmentData = function (queryParams) {
            var _this = this;
            return rxjs.iif(function () { return _this.gridType === ApprovalGridType.NeedAttentionRequests; }, this.rxApprovalConsoleService.getCurrentRequestDetails(this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID], this.approvalRequest[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application]), rxjs.of(this.approvalRequest)).pipe(operators.switchMap(function (currentRequest) {
                var _c;
                return _this.rxRecordInstanceDataPageService
                    .post({
                    params: lodash.omit(Object.assign(Object.assign({}, queryParams), (_c = { shouldIncludeTotalSize: true }, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.application] = currentRequest.application, _c[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.request] = currentRequest.request, _c)), ['searchText', 'propertySelection'])
                })
                    .pipe(operators.map(function (response) {
                    response.data = lodash.reject(response.data, function (item) { return !item[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]; });
                    return response;
                }));
            }));
        };
        ApprovalRequestAttachmentsComponent.prototype.getAttachmentColumns = function () {
            var _this = this;
            return [
                {
                    index: 0,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.submitter.label')
                },
                {
                    index: 1,
                    fieldId: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.attachments.grid.file-name.title'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.requestDetailsGrid.questionDefinition, Number(RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment), selectedRow[i2.RX_RECORD_DEFINITION.coreFieldIds.id].split('|')[0], selectedRow[RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment]);
                            }
                        }
                    ]
                },
                {
                    index: 2,
                    fieldId: i2.RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                    visible: false,
                    filterable: false
                }
            ];
        };
        ApprovalRequestAttachmentsComponent.prototype.getAttachmentRecordDefinition = function () {
            return {
                fieldDefinitions: [
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.from,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.requestDetailsGrid.fields.attachment,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.attachment
                    },
                    {
                        id: i2.RX_RECORD_DEFINITION.coreFieldIds.id,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            };
        };
        return ApprovalRequestAttachmentsComponent;
    }());
    ApprovalRequestAttachmentsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestAttachmentsComponent, deps: [{ token: RxApprovalConsoleService }, { token: i1__namespace$1.TranslateService }, { token: i2__namespace.RxRecordInstanceService }, { token: i2__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalRequestAttachmentsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalRequestAttachmentsComponent, selector: "rx-approval-request-attachments", inputs: { approvalRequest: "approvalRequest", gridType: "gridType" }, viewQueries: [{ propertyName: "requestAttachmentsGrid", first: true, predicate: ["requestAttachmentsGrid"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<adapt-empty-state\n  type=\"grid\"\n  *ngIf=\"!approvalRequest\"\n  label=\"{{ 'com.bmc.arsys.rx.client.approval.console.no-request-selected.message' | translate }}\"\n></adapt-empty-state>\n\n<rx-record-grid [config]=\"gridConfig$\" *ngIf=\"approvalRequest\" #requestAttachmentsGrid></rx-record-grid>\n", components: [{ type: i1__namespace$2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i10__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1__namespace$1.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalRequestAttachmentsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-request-attachments',
                        templateUrl: './approval-request-attachments.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: RxApprovalConsoleService }, { type: i1__namespace$1.TranslateService }, { type: i2__namespace.RxRecordInstanceService }, { type: i2__namespace.RxRecordInstanceDataPageService }]; }, propDecorators: { approvalRequest: [{
                    type: i0.Input
                }], gridType: [{
                    type: i0.Input
                }], requestAttachmentsGrid: [{
                    type: i0.ViewChild,
                    args: ['requestAttachmentsGrid']
                }] } });

    var ApprovalConsoleComponent = /** @class */ (function (_super) {
        __extends(ApprovalConsoleComponent, _super);
        function ApprovalConsoleComponent(rxStringService, rxApprovalConsoleHelperService, rxCurrentUserService, translateService, rxModalService, rxNotificationService, rxApprovalConsoleService, rxRecordInstanceService, adaptModalService, rxSignatureDetailDataPageService, recordGridFilterService, rxRecordInstanceDataPageService, rxDefinitionNameService) {
            var _c;
            var _this = _super.call(this) || this;
            _this.rxStringService = rxStringService;
            _this.rxApprovalConsoleHelperService = rxApprovalConsoleHelperService;
            _this.rxCurrentUserService = rxCurrentUserService;
            _this.translateService = translateService;
            _this.rxModalService = rxModalService;
            _this.rxNotificationService = rxNotificationService;
            _this.rxApprovalConsoleService = rxApprovalConsoleService;
            _this.rxRecordInstanceService = rxRecordInstanceService;
            _this.adaptModalService = adaptModalService;
            _this.rxSignatureDetailDataPageService = rxSignatureDetailDataPageService;
            _this.recordGridFilterService = recordGridFilterService;
            _this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            _this.rxDefinitionNameService = rxDefinitionNameService;
            _this.selectedApprovalRequestsTab = RX_APPROVAL_CONSOLE.approvalRequestTypes.pending;
            _this.approvalRequestTypes = lodash.map(RX_APPROVAL_CONSOLE.approvalRequestTypes, function (request) { return (Object.assign(Object.assign({}, request), { label: _this.translateService.instant(request.labelKey) })); });
            _this.dataLoaded$ = new rxjs.Subject();
            _this.attentionGridParams = (_c = {
                    recorddefinition: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition
                },
                _c[i2.RX_RECORD_DEFINITION.coreFieldIds.assignee] = _this.rxCurrentUserService.getName(),
                _c[i2.RX_RECORD_DEFINITION.coreFieldIds.status] = '0',
                _c[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.state] = '0',
                _c);
            _this.needAttentionRequestCount$ = _this.rxRecordInstanceDataPageService.post({
                params: _this.attentionGridParams
            });
            _this.availableRequestCount$ = _this.dataLoaded$
                .pipe(operators.switchMap(function () { return rxjs.forkJoin([_this.rxApprovalConsoleService.getApprovalRequestCounts(), _this.needAttentionRequestCount$]); }))
                .pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), requestCounts = _d[0], needAttentionResponse = _d[1];
                return (Object.assign(Object.assign({}, requestCounts), { needAttentionCount: needAttentionResponse.totalSize }));
            }));
            _this.activeTabIndex = 0;
            _this.selectedRecordsInSequence = [];
            return _this;
        }
        ApprovalConsoleComponent.prototype.ngOnInit = function () {
            this.updateGridConfig();
        };
        ApprovalConsoleComponent.prototype.onDataLoaded = function () {
            var _this = this;
            var _a;
            (_a = this.gridSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.gridSubscription = this.approvalRequestsGrid.adaptTable.selectionChange.subscribe(function (selectedRows) {
                var _c;
                var selectedRecord = lodash.isNil(_this.selectedApprovalRequest)
                    ? selectedRows[0]
                    : selectedRows[selectedRows.length - 1];
                _this.isReassignButtonDisabled = lodash.some(selectedRows, function (row) { return row.canReassign === 'No'; });
                _this.selectedRecordsInSequence = _this.approvalRequestsGrid.api.getSelectedRows(true);
                _this.selectedRecordIndex = lodash.findIndex(_this.selectedRecordsInSequence, (_c = {},
                    _c[i1$3.RowDataItemIdFieldName] = selectedRecord === null || selectedRecord === void 0 ? void 0 : selectedRecord[i1$3.RowDataItemIdFieldName],
                    _c));
                _this.selectedApprovalRequest = selectedRecord;
            });
            this.dataLoaded$.next();
        };
        ApprovalConsoleComponent.prototype.approveRequest = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                content: ApprovalRequestActionReasonInputComponent,
                size: 'sm',
                data: {
                    commandType: ApprovalCommandType.Approved,
                    selectedRequests: this.approvalRequestsGrid.api.getSelectedRows(),
                    modalTitle: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.approve-request-dialog.title')
                }
            })
                .then(function (result) {
                if (result) {
                    _this.reloadGridData();
                }
            })
                .catch(lodash.noop);
        };
        ApprovalConsoleComponent.prototype.rejectRequest = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                content: ApprovalRequestActionReasonInputComponent,
                size: 'sm',
                data: {
                    commandType: ApprovalCommandType.Rejected,
                    selectedRequests: this.approvalRequestsGrid.api.getSelectedRows(),
                    modalTitle: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.reject-request-dialog.title')
                }
            })
                .then(function (result) {
                if (result) {
                    _this.reloadGridData();
                }
            })
                .catch(lodash.noop);
        };
        ApprovalConsoleComponent.prototype.holdRequest = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i6.RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.hold-dialog.message')
            })
                .then(function (result) {
                if (result) {
                    var commands = lodash.map(_this.approvalRequestsGrid.api.getSelectedRows(), function (request) { return _this.rxApprovalConsoleService.getCommandPayload(ApprovalCommandType.OnHold, request[RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID]); });
                    _this.rxApprovalConsoleService.holdRequest(commands).subscribe(function () {
                        _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request.hold-success.message'));
                        _this.reloadGridData();
                    });
                }
            });
        };
        ApprovalConsoleComponent.prototype.reassignRequest = function () {
            var _this = this;
            this.rxModalService
                .openModal({
                content: ApprovalRequestReassignComponent,
                size: 'sm',
                data: {
                    selectedRequestInstanceIds: lodash.map(this.approvalRequestsGrid.api.getSelectedRows(), function (request) { return request.signatureInstanceID; })
                }
            })
                .then(function (result) {
                if (result) {
                    _this.reloadGridData();
                }
            })
                .catch(lodash.noop);
        };
        ApprovalConsoleComponent.prototype.isHoldButtonDisabled = function () {
            return this.selectedApprovalRequestsTab.status === ApprovalRequestStatus.Hold;
        };
        Object.defineProperty(ApprovalConsoleComponent.prototype, "currentRequestId", {
            get: function () {
                var _a, _b;
                return (((_a = this.selectedApprovalRequest) === null || _a === void 0 ? void 0 : _a.request) ||
                    ((_b = this.selectedApprovalRequest) === null || _b === void 0 ? void 0 : _b[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID]));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ApprovalConsoleComponent.prototype, "selectedApprovalRequestCount", {
            get: function () {
                var _a, _b;
                return ((_b = (_a = this.approvalRequestsGrid) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.getSelectedRowCount()) || 0;
            },
            enumerable: false,
            configurable: true
        });
        ApprovalConsoleComponent.prototype.fetchApprovalRequests = function (event) {
            this.approvalRequestsGrid.adaptTableConfig.selectedItems = [];
            this.selectedApprovalRequest = null;
            this.selectedApprovalRequestsTab = this.approvalRequestTypes[event.index];
            this.updateGridConfig();
        };
        ApprovalConsoleComponent.prototype.showNextRequestDetails = function () {
            this.selectedApprovalRequest = this.selectedRecordsInSequence[++this.selectedRecordIndex];
        };
        ApprovalConsoleComponent.prototype.showPreviousRequestDetails = function () {
            this.selectedApprovalRequest = this.selectedRecordsInSequence[--this.selectedRecordIndex];
        };
        ApprovalConsoleComponent.prototype.isPreviousButtonDisabled = function () {
            return this.selectedApprovalRequestCount === 0 || this.selectedRecordIndex <= 0;
        };
        ApprovalConsoleComponent.prototype.isNextButtonDisabled = function () {
            return (this.selectedApprovalRequestCount === 0 || this.selectedRecordIndex === this.selectedRecordsInSequence.length - 1);
        };
        ApprovalConsoleComponent.prototype.isApprovalRequestGrid = function () {
            return this.selectedApprovalRequestsTab.gridType === ApprovalGridType.ApprovalRequests;
        };
        ApprovalConsoleComponent.prototype.isNeedAttentionGrid = function () {
            return this.selectedApprovalRequestsTab.gridType === ApprovalGridType.NeedAttentionRequests;
        };
        ApprovalConsoleComponent.prototype.onTabChanged = function (event) {
            if (event.event) {
                this.activeTabIndex = event.index;
            }
        };
        ApprovalConsoleComponent.prototype.needAttentionGridColumns = function () {
            var _this = this;
            return [
                {
                    index: 0,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.fromUser,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.from.label')
                },
                {
                    index: 1,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.toUser,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.send-to.label')
                },
                {
                    index: 2,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.description,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.openQuestionResponseDialog(selectedRow);
                            }
                        }
                    ]
                },
                {
                    index: 3,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.application,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.needs-attention.grid.column.application.title'),
                    cellTemplate: this.definitionNameCellTemplate
                },
                {
                    index: 4,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.requestID,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.needs-attention.grid.column.request.title')
                },
                {
                    index: 5,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.attachment.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.rxRecordInstanceService.downloadAttachment(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, Number(RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment), selectedRow[i2.RX_RECORD_DEFINITION.coreFieldIds.id], selectedRow[RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.attachment]);
                            }
                        }
                    ]
                },
                {
                    index: 6,
                    fieldId: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.fields.question,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.question.label'),
                    visible: false,
                    filterable: false,
                    sortable: false
                },
                {
                    index: 7,
                    fieldId: i2.RX_RECORD_DEFINITION.coreFieldIds.id.toString(),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                    visible: false,
                    filterable: false
                }
            ];
        };
        ApprovalConsoleComponent.prototype.ngOnDestroy = function () {
            this.dataLoaded$.complete();
            this.gridSubscription.unsubscribe();
        };
        ApprovalConsoleComponent.prototype.onQuestionSubmitted = function () {
            this.reloadGridData();
        };
        ApprovalConsoleComponent.prototype.getData = function (queryParams) {
            var _this = this;
            var textSearchQuery = this.recordGridFilterService.generateTextFilterQuery(queryParams.searchText, this.approvalRequestsGrid.adaptTableConfig.columns);
            var clonedSelectedFilters = lodash.cloneDeep(this.approvalRequestsGrid.state.advancedFiltering.selectedFilters);
            var clonedDefinitionNameFilters = lodash.find(clonedSelectedFilters, {
                filterOptionId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application
            });
            if (clonedDefinitionNameFilters) {
                var appliedDefinitionNameFilters = lodash.find(this.approvalRequestsGrid.state.advancedFiltering.selectedFilters, {
                    filterOptionId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application
                });
                appliedDefinitionNameFilters.value.filterValue = lodash.map(appliedDefinitionNameFilters.value.filterValue, function (filterValue) { return _this.rxDefinitionNameService.getDisplayName(filterValue); });
                clonedDefinitionNameFilters.value.filterValue = lodash.map(clonedDefinitionNameFilters.value.filterValue, function (filterValue) { return "%" + filterValue; });
            }
            var resultingQuery = this.recordGridFilterService.addQueries(this.approvalRequestsGrid.buildQueryByAdvancedFilters(clonedSelectedFilters), textSearchQuery);
            if (resultingQuery) {
                queryParams.queryExpression = resultingQuery;
            }
            queryParams.propertySelection.push(RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.ifMultipleApprovers);
            return this.rxSignatureDetailDataPageService
                .get({
                params: lodash.omit(Object.assign(Object.assign({}, queryParams), { status: this.selectedApprovalRequestsTab.status, shouldIncludeTotalSize: true, ignoreAlternateUser: false, propertySelection: queryParams.propertySelection.filter(function (property) { return property !== RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs; }) }), ['searchText', 'recorddefinition'])
            })
                .pipe(operators.tap(function (dataPage) {
                dataPage.data.forEach(function (row) {
                    row.otherDetail1 = _this.rxApprovalConsoleHelperService.formatValue(row.otherDetail1);
                    row.otherDetail2 = _this.rxApprovalConsoleHelperService.formatValue(row.otherDetail2);
                    row.otherDetail3 = _this.rxApprovalConsoleHelperService.formatValue(row.otherDetail3);
                    row.otherDetail4 = _this.rxApprovalConsoleHelperService.formatValue(row.otherDetail4);
                });
            }));
        };
        ApprovalConsoleComponent.prototype.getNeedAttentionData = function (queryParams) {
            var params = lodash.omit(Object.assign(Object.assign({}, this.attentionGridParams), queryParams), ['searchText']);
            return this.rxRecordInstanceDataPageService.post({
                params: params
            });
        };
        ApprovalConsoleComponent.prototype.updateGridConfig = function () {
            var _this = this;
            this.shouldShowGrid = false;
            this.gridConfig$ = this.prepareGridConfiguration();
            setTimeout(function () {
                _this.shouldShowGrid = true;
            });
        };
        ApprovalConsoleComponent.prototype.prepareGridConfiguration = function () {
            var _this = this;
            var defaultConfig = {
                enableFiltering: true,
                enableRowSelection: i10.RowSelectionMode.Multiple
            };
            if (this.isApprovalRequestGrid()) {
                return rxjs.of(Object.assign(Object.assign({}, defaultConfig), { actionButtons: this.getActionButtons(), getData: function (queryParams) { return _this.getData(queryParams); }, columns: this.getColumns(), getRecordDefinition: function () { return rxjs.of(_this.getRecordDefinition()); }, recordIdField: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID, styles: 'flex-fill', guid: "ap-" + this.rxStringService.toRxId(this.selectedApprovalRequestsTab.status) + "-grid" }));
            }
            else if (this.isNeedAttentionGrid()) {
                return rxjs.of(Object.assign(Object.assign({}, defaultConfig), { recordDefinitionName: RX_APPROVAL_CONSOLE.needAttentionRequestsGrid.definition, getData: function (queryParams) { return _this.getNeedAttentionData(queryParams); }, columns: this.needAttentionGridColumns(), styles: 'flex-fill', guid: 'ap-need-attention-grid' }));
            }
        };
        ApprovalConsoleComponent.prototype.getActionButtons = function () {
            var _this = this;
            return lodash.includes([ApprovalRequestStatus.Pending, ApprovalRequestStatus.RequestMoreInfo, ApprovalRequestStatus.Hold], this.selectedApprovalRequestsTab.status)
                ? [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.approve.label'),
                        style: 'success',
                        iconCls: 'check_circle_o',
                        size: 'small',
                        actions: [
                            {
                                name: function () { return _this.approveRequest(); }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.reject.label'),
                        style: 'critical',
                        iconCls: 'cross_circle_o',
                        size: 'small',
                        actions: [
                            {
                                name: function () { return _this.rejectRequest(); }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.hold.label'),
                        style: 'warning',
                        iconCls: 'pause_circle_o',
                        size: 'small',
                        disabled: function () { return _this.isHoldButtonDisabled(); },
                        actions: [
                            {
                                name: function () { return _this.holdRequest(); }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.button.reassign.label'),
                        iconCls: 'user_arrow_o',
                        style: 'secondary',
                        size: 'small',
                        disabled: function () { return _this.isReassignButtonDisabled; },
                        actions: [
                            {
                                name: function () { return _this.reassignRequest(); }
                            }
                        ]
                    }
                ]
                : [];
        };
        ApprovalConsoleComponent.prototype.reloadGridData = function () {
            this.selectedApprovalRequest = null;
            this.approvalRequestsGrid.api.refresh().subscribe();
        };
        ApprovalConsoleComponent.prototype.openQuestionResponseDialog = function (selectedRow) {
            var _this = this;
            this.rxModalService
                .openModal({
                content: ApprovalRequestQuestionResponseComponent,
                size: 'sm',
                data: {
                    selectedRequest: selectedRow
                }
            })
                .then(function (result) {
                if (result) {
                    _this.reloadGridData();
                }
            })
                .catch(lodash.noop);
        };
        ApprovalConsoleComponent.prototype.getColumns = function () {
            return [
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                    cellTemplate: this.definitionNameCellTemplate
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.summary,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                    cellTemplate: this.resolvedFieldCellTemplate,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.requester,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.requester.label'),
                    cellTemplate: this.resolvedFieldCellTemplate,
                    sortable: true
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.status,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-id.label'),
                    cellTemplate: this.resolvedFieldCellTemplate,
                    sortable: true
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.acting-as.title'),
                    filterable: false,
                    searchable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.createDateSig,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.request-date.label'),
                    visible: false,
                    filterable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.process.title'),
                    visible: false,
                    filterable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.signature-instance-id.title'),
                    visible: false,
                    filterable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationReasonField,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.justification.title'),
                    visible: false,
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.sigTermStateDate,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.status-updated-on.title'),
                    visible: false,
                    filterable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureID,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.signature-id.title'),
                    visible: false,
                    filterable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail1,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail1.title'),
                    visible: false,
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail2,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail2.title'),
                    visible: false,
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail3,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail3.title'),
                    visible: false,
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail4,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.other-detail4.title'),
                    visible: false,
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationRequired,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.label'),
                    visible: false,
                    filterable: false
                },
                {
                    fieldId: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.processInstanceId,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.approval.console.grid.column.process-instance-id.title'),
                    visible: false,
                    filterable: false,
                    sortable: false
                }
            ];
        };
        ApprovalConsoleComponent.prototype.getRecordDefinition = function () {
            var _c, _d;
            return {
                fieldDefinitions: [
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.application,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.summary,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.requester,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.status,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.selection,
                        optionNamesById: (_c = {},
                            _c[ApprovalRequestStatus.Pending] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.pending.labelKey),
                            _c[ApprovalRequestStatus.RequestMoreInfo] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.moreInfo.labelKey),
                            _c[ApprovalRequestStatus.Approved] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.approved.labelKey),
                            _c[ApprovalRequestStatus.Rejected] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.rejected.labelKey),
                            _c[ApprovalRequestStatus.Cancelled] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.cancelled.labelKey),
                            _c[ApprovalRequestStatus.Error] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.error.labelKey),
                            _c[ApprovalRequestStatus.Hold] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.onHold.labelKey),
                            _c[ApprovalRequestStatus.Closed] = this.translateService.instant(RX_APPROVAL_CONSOLE.approvalRequestTypes.closed.labelKey),
                            _c)
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.request,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.actingAs,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.createDateSig,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.dateTime
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.process,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureInstanceID,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationReasonField,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.sigTermStateDate,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.dateTime
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.signatureID,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail1,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail2,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail3,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.otherDetail4,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.justificationRequired,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.selection,
                        optionNamesById: (_d = {},
                            _d[i3.JustificationRequirement.RequiredForApproval] = this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.approval.label'),
                            _d[i3.JustificationRequirement.RequiredForRejection] = this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.rejection.label'),
                            _d[i3.JustificationRequirement.RequiredForApprovalOrRejection] = this.translateService.instant('com.bmc.arsys.rx.client.approval.justification.require-on.approval-rejection.label'),
                            _d[i3.JustificationRequirement.NotRequired] = this.translateService.instant('com.bmc.arsys.rx.client.common.not-applicable.label'),
                            _d)
                    },
                    {
                        id: RX_APPROVAL_CONSOLE.approvalRequestsGrid.fields.processInstanceId,
                        resourceType: i2.RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            };
        };
        return ApprovalConsoleComponent;
    }(runtime.BaseViewComponent));
    ApprovalConsoleComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleComponent, deps: [{ token: i1__namespace$3.RxStringService }, { token: RxApprovalConsoleHelperService }, { token: i3__namespace.RxCurrentUserService }, { token: i1__namespace$1.TranslateService }, { token: i6__namespace$1.RxModalService }, { token: i3__namespace.RxNotificationService }, { token: RxApprovalConsoleService }, { token: i2__namespace.RxRecordInstanceService }, { token: i1__namespace$2.AdaptModalService }, { token: RxSignatureDetailDataPageService }, { token: i10__namespace.RxRecordGridFilterService }, { token: i2__namespace.RxRecordInstanceDataPageService }, { token: i3__namespace.RxDefinitionNameService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ApprovalConsoleComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalConsoleComponent, selector: "rx-approval-console", viewQueries: [{ propertyName: "requestDetailsTabs", first: true, predicate: ["requestDetailsTabs"], descendants: true }, { propertyName: "resolvedFieldCellTemplate", first: true, predicate: ["resolvedFieldCellTemplate"], descendants: true, static: true }, { propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }, { propertyName: "approvalRequestsGrid", first: true, predicate: ["approvalRequestsGrid"], descendants: true }], usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"row h-100\">\n  <div class=\"col-12 col-md-7 d-flex flex-column flex-fill h-100\">\n    <h2 class=\"mt-0\">{{ 'com.bmc.arsys.rx.client.approval.console.requests.title' | translate }}</h2>\n\n    <adapt-tabset\n      type=\"pills\"\n      [tab-active]=\"0\"\n      *ngIf=\"availableRequestCount$ | async as requestsTypeCounts\"\n      (tab-active-changed)=\"fetchApprovalRequests($event)\"\n      rx-id=\"approval-requests-tabs\"\n    >\n      <adapt-tab-panel\n        *ngFor=\"let requestType of approvalRequestTypes\"\n        adapt-tab-title=\"{{ requestType.label }}\"\n        [badge]=\"requestsTypeCounts[requestType.countType]\"\n        [badge-type]=\"requestType.badgeType\"\n      >\n      </adapt-tab-panel>\n    </adapt-tabset>\n\n    <rx-record-grid\n      #approvalRequestsGrid\n      [config]=\"gridConfig$\"\n      *ngIf=\"shouldShowGrid\"\n      (dataLoaded)=\"onDataLoaded()\"\n    ></rx-record-grid>\n  </div>\n\n  <div class=\"col-12 col-md-5 mt-4 mt-md-0 d-flex flex-column flex-fill h-100\">\n    <div class=\"mb-1\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        size=\"small\"\n        class=\"d-icon-left-angle_left mr-2\"\n        rx-id=\"prev-button\"\n        [disabled]=\"isPreviousButtonDisabled()\"\n        (click)=\"showPreviousRequestDetails()\"\n      ></button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        size=\"small\"\n        class=\"d-icon-left-angle_right mr-3\"\n        rx-id=\"next-button\"\n        [disabled]=\"isNextButtonDisabled()\"\n        (click)=\"showNextRequestDetails()\"\n      ></button>\n\n      <h2 class=\"d-inline-block my-0 align-middle\">\n        {{ 'com.bmc.arsys.rx.client.approval.console.request-details.title' | translate }}\n        <span *ngIf=\"currentRequestId\">({{ currentRequestId }})</span>\n      </h2>\n    </div>\n\n    <adapt-tabset\n      type=\"pills\"\n      [tab-active]=\"0\"\n      #requestDetailsTabs\n      (tab-active-changed)=\"onTabChanged($event)\"\n      class=\"d-flex flex-column flex-fill h-100\"\n      rx-id=\"request-details-tabs\"\n    >\n      <adapt-tab-panel\n        adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.common.general-items.label' | translate }}\"\n        badge-type=\"primary\"\n      >\n        <rx-approval-request-general-details\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n        ></rx-approval-request-general-details>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.approvers.title' | translate }}\">\n        <rx-approval-request-approvers\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 1\"\n        ></rx-approval-request-approvers>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.questions.label' | translate }}\">\n        <rx-approval-request-questions\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          [requestsTabStatus]=\"selectedApprovalRequestsTab.status\"\n          (questionSubmitted)=\"onQuestionSubmitted()\"\n          *ngIf=\"activeTabIndex === 2\"\n        ></rx-approval-request-questions>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.comments.title' | translate }}\">\n        <rx-approval-request-comments\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 3\"\n        ></rx-approval-request-comments>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.console.attachments.title' | translate }}\">\n        <rx-approval-request-attachments\n          class=\"d-flex flex-column flex-fill h-100\"\n          [approvalRequest]=\"selectedApprovalRequest\"\n          [gridType]=\"selectedApprovalRequestsTab.gridType\"\n          *ngIf=\"activeTabIndex === 4\"\n        ></rx-approval-request-attachments>\n      </adapt-tab-panel>\n    </adapt-tabset>\n  </div>\n</div>\n\n<ng-template #definitionNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #resolvedFieldCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem.resolvedDisplayValues[column.field] }}\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;padding:1rem;height:100%}:host::ng-deep adapt-tabset .tab-content{padding:.5rem 0 0}:host::ng-deep rx-record-grid{height:100%}:host::ng-deep rx-record-grid .rx-action-button_success button{background:#89c341;border-color:#78ac36}:host::ng-deep rx-record-grid .rx-action-button_success button:hover{background-color:#78ac36}:host::ng-deep rx-record-grid .rx-action-button_critical button{background:#f83200;border-color:#d72b00}:host::ng-deep rx-record-grid .rx-action-button_critical button:hover{background-color:#d72b00}:host::ng-deep rx-record-grid .rx-action-button_warning button{color:#313538;background:#f1b521;border-color:#e3a50e}:host::ng-deep rx-record-grid .rx-action-button_warning button:hover{background-color:#e3a50e}:host::ng-deep rx-record-grid .rx-action-button_warning button:disabled{color:#313538;background-color:#f6cf6f}\n"], components: [{ type: i1__namespace$2.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1__namespace$2.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i10__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1__namespace$2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: ApprovalRequestGeneralDetailsComponent, selector: "rx-approval-request-general-details", inputs: ["approvalRequest", "gridType"] }, { type: ApprovalRequestApproversComponent, selector: "rx-approval-request-approvers", inputs: ["approvalRequest", "gridType"] }, { type: ApprovalRequestQuestionsComponent, selector: "rx-approval-request-questions", inputs: ["approvalRequest", "requestsTabStatus", "gridType"], outputs: ["questionSubmitted"] }, { type: ApprovalRequestCommentsComponent, selector: "rx-approval-request-comments", inputs: ["approvalRequest", "gridType"] }, { type: ApprovalRequestAttachmentsComponent, selector: "rx-approval-request-attachments", inputs: ["approvalRequest", "gridType"] }], directives: [{ type: i3__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i1__namespace$1.TranslatePipe, "async": i3__namespace$1.AsyncPipe, "rxDefinitionNamePipe": i3__namespace.RxDefinitionNamePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-approval-console',
                        templateUrl: './approval-console.component.html',
                        styleUrls: ['./approval-console.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$3.RxStringService }, { type: RxApprovalConsoleHelperService }, { type: i3__namespace.RxCurrentUserService }, { type: i1__namespace$1.TranslateService }, { type: i6__namespace$1.RxModalService }, { type: i3__namespace.RxNotificationService }, { type: RxApprovalConsoleService }, { type: i2__namespace.RxRecordInstanceService }, { type: i1__namespace$2.AdaptModalService }, { type: RxSignatureDetailDataPageService }, { type: i10__namespace.RxRecordGridFilterService }, { type: i2__namespace.RxRecordInstanceDataPageService }, { type: i3__namespace.RxDefinitionNameService }]; }, propDecorators: { requestDetailsTabs: [{
                    type: i0.ViewChild,
                    args: ['requestDetailsTabs']
                }], resolvedFieldCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['resolvedFieldCellTemplate', { static: true }]
                }], definitionNameCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['definitionNameCellTemplate', { static: true }]
                }], approvalRequestsGrid: [{
                    type: i0.ViewChild,
                    args: ['approvalRequestsGrid']
                }] } });

    var ApprovalConsoleRegistrationModule = /** @class */ (function () {
        function ApprovalConsoleRegistrationModule(componentFactoryResolver, rxViewComponentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            rxViewComponentRegistryService.register({
                type: 'rx-approval-console',
                componentFactory: this.componentFactoryResolver.resolveComponentFactory(ApprovalConsoleComponent),
                name: 'Approval console',
                isPageComponent: true,
                availableInBundles: [i3.RX_APPLICATION.approvalBundleId]
            });
        }
        return ApprovalConsoleRegistrationModule;
    }());
    ApprovalConsoleRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleRegistrationModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$4.RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ApprovalConsoleRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleRegistrationModule, declarations: [ApprovalConsoleComponent,
            ApprovalRequestGeneralDetailsComponent,
            ApprovalRequestReassignComponent,
            ApprovalRequestApproversComponent,
            ApprovalRequestQuestionsComponent,
            ApprovalRequestCommentsComponent,
            ApprovalRequestAttachmentsComponent,
            ApprovalRequestQuestionResponseComponent,
            ApprovalRequestQuestionComponent,
            ApprovalRequestCommentComponent,
            ApprovalRequestActionReasonInputComponent], imports: [i3$1.CommonModule,
            i10.RecordGridModule,
            i1$1.AdaptButtonModule,
            i1$1.AdaptDropdownModule,
            i6$1.FormsModule,
            i1$2.TranslateModule,
            i1$1.AdaptTabsModule,
            i6.ReadOnlyFieldModule,
            i6.RxBusyIndicatorModule,
            i3.RxDefinitionModule,
            i5.RxSelectWithPaginationModule,
            i1$1.AdaptEmptyStateModule,
            i1$1.AdaptRxTextareaModule,
            i1$1.AdaptRxUploaderModule,
            i1$1.AdaptBusyModule,
            i1$1.AdaptDownloadModule,
            i1$1.AdaptRxLabelModule,
            i1$1.AdaptRxSwitchModule,
            i1$1.AdaptAlertModule,
            i1$1.AdaptRxTextfieldModule] });
    ApprovalConsoleRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleRegistrationModule, providers: [RxApprovalConsoleHelperService], imports: [[
                i3$1.CommonModule,
                i10.RecordGridModule,
                i1$1.AdaptButtonModule,
                i1$1.AdaptDropdownModule,
                i6$1.FormsModule,
                i1$2.TranslateModule,
                i1$1.AdaptTabsModule,
                i6.ReadOnlyFieldModule,
                i6.RxBusyIndicatorModule,
                i3.RxDefinitionModule,
                i5.RxSelectWithPaginationModule,
                i1$1.AdaptEmptyStateModule,
                i1$1.AdaptRxTextareaModule,
                i1$1.AdaptRxUploaderModule,
                i1$1.AdaptBusyModule,
                i1$1.AdaptDownloadModule,
                i1$1.AdaptRxLabelModule,
                i1$1.AdaptRxSwitchModule,
                i1$1.AdaptAlertModule,
                i1$1.AdaptRxTextfieldModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleRegistrationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            ApprovalConsoleComponent,
                            ApprovalRequestGeneralDetailsComponent,
                            ApprovalRequestReassignComponent,
                            ApprovalRequestApproversComponent,
                            ApprovalRequestQuestionsComponent,
                            ApprovalRequestCommentsComponent,
                            ApprovalRequestAttachmentsComponent,
                            ApprovalRequestQuestionResponseComponent,
                            ApprovalRequestQuestionComponent,
                            ApprovalRequestCommentComponent,
                            ApprovalRequestActionReasonInputComponent
                        ],
                        imports: [
                            i3$1.CommonModule,
                            i10.RecordGridModule,
                            i1$1.AdaptButtonModule,
                            i1$1.AdaptDropdownModule,
                            i6$1.FormsModule,
                            i1$2.TranslateModule,
                            i1$1.AdaptTabsModule,
                            i6.ReadOnlyFieldModule,
                            i6.RxBusyIndicatorModule,
                            i3.RxDefinitionModule,
                            i5.RxSelectWithPaginationModule,
                            i1$1.AdaptEmptyStateModule,
                            i1$1.AdaptRxTextareaModule,
                            i1$1.AdaptRxUploaderModule,
                            i1$1.AdaptBusyModule,
                            i1$1.AdaptDownloadModule,
                            i1$1.AdaptRxLabelModule,
                            i1$1.AdaptRxSwitchModule,
                            i1$1.AdaptAlertModule,
                            i1$1.AdaptRxTextfieldModule
                        ],
                        entryComponents: [ApprovalConsoleComponent],
                        providers: [RxApprovalConsoleHelperService]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$4.RxViewComponentRegistryService }]; } });

    var ApprovalConsoleModule = /** @class */ (function () {
        function ApprovalConsoleModule() {
        }
        return ApprovalConsoleModule;
    }());
    ApprovalConsoleModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ApprovalConsoleModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleModule, imports: [ApprovalConsoleRegistrationModule] });
    ApprovalConsoleModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleModule, providers: [], imports: [[ApprovalConsoleRegistrationModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ApprovalConsoleModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [ApprovalConsoleRegistrationModule],
                        providers: [],
                        declarations: []
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ApprovalConsoleComponent = ApprovalConsoleComponent;
    exports.ApprovalConsoleModule = ApprovalConsoleModule;
    exports.ApprovalConsoleRegistrationModule = ApprovalConsoleRegistrationModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-approval-components.umd.js.map
