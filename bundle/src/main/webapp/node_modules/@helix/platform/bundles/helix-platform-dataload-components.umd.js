(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@helix/platform/shared/api'), require('@angular/forms'), require('@ngx-translate/core'), require('rxjs'), require('@helix/platform/view/components'), require('@helix/platform/record/api'), require('lodash'), require('@helix/platform/ui-kit'), require('rxjs/operators'), require('@helix/platform/utils'), require('@bmc-ux/adapt-angular'), require('@bmc-ux/adapt-table'), require('@helix/platform/shared/components'), require('@angular/common/http'), require('@helix/platform/association/api'), require('@helix/platform/view/api')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/dataload/components', ['exports', '@angular/core', '@angular/common', '@helix/platform/shared/api', '@angular/forms', '@ngx-translate/core', 'rxjs', '@helix/platform/view/components', '@helix/platform/record/api', 'lodash', '@helix/platform/ui-kit', 'rxjs/operators', '@helix/platform/utils', '@bmc-ux/adapt-angular', '@bmc-ux/adapt-table', '@helix/platform/shared/components', '@angular/common/http', '@helix/platform/association/api', '@helix/platform/view/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.dataload = global.helix.platform.dataload || {}, global.helix.platform.dataload.components = {}), global.ng.core, global.ng.common, global.helix.platform.shared.api, global.ng.forms, global.ngxTranslateCore, global.rxjs, global.helix.platform.view.components, global.helix.platform.record.api, global.lodash, global.helix.platform["ui-kit"], global.rxjs.operators, global.helix.platform.utils, global.adaptAngular, global.adaptTable, global.helix.platform.shared.components, global.ng.common.http, global.helix.platform.association.api, global.helix.platform.view.api));
})(this, (function (exports, i0, i1, i2$1, i6, i2, rxjs, i9, i5, lodash, i4$1, operators, i3, i4, i7, i7$1, i1$1, i8, i1$2) { 'use strict';

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
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i7__namespace$1 = /*#__PURE__*/_interopNamespace(i7$1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);

    var DL_DATA_IMPORT = {
        recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Load Files',
        archiveTrueValue: 1,
        uploadFileStepId: 'uploadDataFile',
        temporaryStepConfig: {
            id: 'temporaryStep',
            name: '',
            componentFactory: null
        },
        attachmentTypes: {
            xlsx: {
                value: 1,
                extension: 'xlsx'
            },
            zip: {
                value: 2,
                extension: 'zip'
            }
        },
        fields: {
            importJobName: 536870913,
            uploadedOn: 536870914,
            importJobDescription: 536870915,
            dataFile: 536870916,
            attachmentOut: 536870917,
            message: 536870918,
            attachmentType: 536870919,
            archivedWorksheetFileName: 536870920,
            isArchived: 536870921,
            mappingConfig: 536870923
        },
        dataStatuses: {
            all: -1,
            queued: 6,
            new: 0,
            processing: 1,
            processed: 2,
            stopping: 7,
            stopped: 8,
            errored: 3
        },
        mergeOptions: {
            generateNewIds: 1,
            rejectDuplicates: 2,
            generateNewIdsForDuplicates: 3,
            updateRecords: 4,
            replaceRecords: 5
        }
    };

    var ImportRecordStatusInfoComponent = /** @class */ (function () {
        function ImportRecordStatusInfoComponent(datePipe, rxTranslateService, rxJsonParserService, activeModalRef, rxRecordInstanceDataPageService) {
            var _a;
            var _this = this;
            this.datePipe = datePipe;
            this.rxTranslateService = rxTranslateService;
            this.rxJsonParserService = rxJsonParserService;
            this.activeModalRef = activeModalRef;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.statusData$ = this.rxRecordInstanceDataPageService
                .post({
                params: (_a = {},
                    _a[i5.RX_RECORD_DEFINITION.coreFieldIds.id] = this.activeModalRef.getData().dataRecordId,
                    _a.recorddefinition = DL_DATA_IMPORT.recordDefinitionName,
                    _a)
            })
                .pipe(operators.map(function (dataPage) {
                if (dataPage.data[0][i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.processing) {
                    _this.processStartInfo = _this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.process-started.message') + " " + _this.datePipe.transform(dataPage.data[0][i5.RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium');
                }
                var dataLoadProgressStatus = lodash.get(_this.rxJsonParserService.tryParseJson(dataPage.data[0][DL_DATA_IMPORT.fields.message], []), 'dataLoadProgressStatus');
                if (dataLoadProgressStatus) {
                    return lodash.map(dataLoadProgressStatus, function (statusInfo) { return (Object.assign(Object.assign({}, statusInfo), { updateTime: _this.datePipe.transform(statusInfo.updateTime, 'medium') })); });
                }
                else {
                    _this.fileUploadedNotProcessedMsg = dataPage.data[0][DL_DATA_IMPORT.fields.message];
                    return [];
                }
            }));
            this.columns = [
                {
                    field: 'updateTime',
                    header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.status-info-grid.column.updated-date.title'),
                    sortable: false,
                    width: '20%'
                },
                {
                    field: 'status',
                    header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                    width: '20%'
                },
                {
                    field: 'message',
                    header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.message.label'),
                    width: '80%'
                }
            ];
        }
        ImportRecordStatusInfoComponent.prototype.close = function () {
            this.activeModalRef.close();
        };
        return ImportRecordStatusInfoComponent;
    }());
    ImportRecordStatusInfoComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ImportRecordStatusInfoComponent, deps: [{ token: i1__namespace.DatePipe }, { token: i2__namespace.TranslateService }, { token: i3__namespace.RxJsonParserService }, { token: i4__namespace.ActiveModalRef }, { token: i5__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ImportRecordStatusInfoComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ImportRecordStatusInfoComponent, selector: "dl-import-record-status-info", ngImport: i0__namespace, template: "<ng-template #loaderTemplate>\n  <rx-line-loader></rx-line-loader>\n</ng-template>\n\n<div *ngIf=\"statusData$ | async as statusData; else loaderTemplate\">\n  <div class=\"data-status-info\">\n    <div *ngIf=\"fileUploadedNotProcessedMsg\">\n      {{ fileUploadedNotProcessedMsg }}\n    </div>\n\n    <adapt-alert\n      *ngIf=\"processStartInfo\"\n      [config]=\"{\n        content: processStartInfo,\n        type: 'inline',\n        variant: 'warning'\n      }\"\n    ></adapt-alert>\n\n    <adapt-table\n      [hidden]=\"fileUploadedNotProcessedMsg\"\n      rx-id=\"imported-status-info-grid\"\n      [columns]=\"columns\"\n      [bordered]=\"true\"\n      [value]=\"statusData\"\n      [wrapCellText]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button (click)=\"close()\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" type=\"button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [".data-status-info{padding:15px}\n"], components: [{ type: i4__namespace$1.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i4__namespace.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i1__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ImportRecordStatusInfoComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-import-record-status-info',
                        templateUrl: './import-record-status-info.component.html',
                        styleUrls: ['./import-data-status-info.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.DatePipe }, { type: i2__namespace.TranslateService }, { type: i3__namespace.RxJsonParserService }, { type: i4__namespace.ActiveModalRef }, { type: i5__namespace.RxRecordInstanceDataPageService }]; } });

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

    var DataImportService = /** @class */ (function () {
        function DataImportService(httpClient) {
            this.httpClient = httpClient;
            this.url = "/api/" + i2$1.RX_APPLICATION.dataloadBundleId + "/rx/application/dataload/";
        }
        DataImportService.prototype.runLoadProcess = function (id) {
            return this.httpClient.post("" + this.url + id, {});
        };
        DataImportService.prototype.stopDataProcessing = function (id) {
            return this.httpClient.post(this.url + "stop/" + id, {});
        };
        DataImportService.prototype.getDataRecordWorksheet = function (recordId) {
            return this.httpClient.get("" + this.url + recordId + "/input_file_conf");
        };
        DataImportService.prototype.getEmptyCurrentSheetDataMapConfig = function (sheetName) {
            return {
                name: sheetName,
                configurations: {
                    definitionMappings: {
                        targetDefinition: {
                            type: null,
                            name: null
                        },
                        fieldMappings: []
                    },
                    dataHandlingOptions: [],
                    timeFormatOptions: null,
                    duplicateHandlingOptions: {
                        matchDuplicateBy: [],
                        handleDuplicateBy: null
                    }
                }
            };
        };
        return DataImportService;
    }());
    DataImportService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportService, deps: [{ token: i1__namespace$1.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DataImportService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.HttpClient }]; } });

    var DataExportService = /** @class */ (function () {
        function DataExportService(httpClient) {
            this.httpClient = httpClient;
            this.url = "/api/" + i2$1.RX_APPLICATION.dataloadBundleId + "/rx/application/dataexport/";
        }
        DataExportService.prototype.isRecordDefinitionResponse = function (definitionResponse) {
            return !lodash.isUndefined(definitionResponse.fieldDefinitions);
        };
        DataExportService.prototype.startDataExport = function (instanceId) {
            return this.httpClient.post("" + this.url + instanceId, {});
        };
        return DataExportService;
    }());
    DataExportService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportService, deps: [{ token: i1__namespace$1.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DataExportService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.HttpClient }]; } });

    var DataImportMappingStepComponent = /** @class */ (function () {
        function DataImportMappingStepComponent(dataImportService, dataExportService, rxRecordDefinitionCacheService, changeDetectorRef, rxModalService, rxWizardModalComponent, definitionNameService, translateService, rxAssociationDefinitionService, rxNotificationService) {
            this.dataImportService = dataImportService;
            this.dataExportService = dataExportService;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.changeDetectorRef = changeDetectorRef;
            this.rxModalService = rxModalService;
            this.rxWizardModalComponent = rxWizardModalComponent;
            this.definitionNameService = definitionNameService;
            this.translateService = translateService;
            this.rxAssociationDefinitionService = rxAssociationDefinitionService;
            this.rxNotificationService = rxNotificationService;
            this.sourceFieldNameList = [];
            this.targetFieldList = [];
            this.definitionTypes = {
                record: 'record',
                association: 'association'
            };
            this.definitionTypeOptions = [
                {
                    value: this.definitionTypes.record,
                    displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label')
                },
                {
                    value: this.definitionTypes.association,
                    displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label')
                }
            ];
            this.recordPickerOptions = {
                label: '',
                definitionType: i7$1.RxDefinitionPickerType.Record,
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i7$1.RX_DEFINITION_PICKER.definitionScopes.all],
                    search: i7$1.RX_DEFINITION_PICKER.definitionScopes.all
                }
            };
            this.associationPickerOptions = {
                label: '',
                definitionType: i7$1.RxDefinitionPickerType.Association,
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i7$1.RX_DEFINITION_PICKER.definitionScopes.all],
                    search: i7$1.RX_DEFINITION_PICKER.definitionScopes.all
                }
            };
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.duplicateHandlingOptions = [
                {
                    id: DL_DATA_IMPORT.mergeOptions.generateNewIds,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.generating-new-id-for-all')
                },
                {
                    id: DL_DATA_IMPORT.mergeOptions.generateNewIdsForDuplicates,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.generating-new-id-for-duplicates')
                },
                {
                    id: DL_DATA_IMPORT.mergeOptions.rejectDuplicates,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.rejecting-duplicate')
                },
                {
                    id: DL_DATA_IMPORT.mergeOptions.replaceRecords,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.replacing-existing-records')
                },
                {
                    id: DL_DATA_IMPORT.mergeOptions.updateRecords,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.updating-old-with-new')
                }
            ];
            this.dataOptions = [
                {
                    id: 1,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.remove-leading-spaces-and-tabs'),
                    isSelected: false
                },
                {
                    id: 2,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.remove-trailing-spaces-and-tabs'),
                    isSelected: false
                },
                {
                    id: 3,
                    name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.truncate-long-strings'),
                    isSelected: false
                }
            ];
            this.matchDuplicateByFields = [];
            this.selectedMatchDuplicateByFields = [];
            this.dateTimeFormatOptions = [
                {
                    id: 1,
                    name: 'dd/MM/yy',
                    example: '25/11/21'
                },
                {
                    id: 2,
                    name: 'dd/MM/yyyy',
                    example: '25/11/2021'
                },
                {
                    id: 3,
                    name: 'MM/dd/yyyy',
                    example: '11/25/2021'
                },
                {
                    id: 4,
                    name: 'yyyy/MM/dd',
                    example: '2021/11/25'
                },
                {
                    id: 5,
                    name: "yyyy-MM-dd'T'HH:mm:ss:SSSZ",
                    example: '2021-11-25T11:12:13:000+0530'
                }
            ];
        }
        DataImportMappingStepComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.excelSheetName = this.options.sheetName;
            this.currentSheetDataImportMapping = this.dataImportService.getEmptyCurrentSheetDataMapConfig(this.excelSheetName);
            this.currentExcelSheetConfiguration = this.context.excelSheetsConfiguration[this.excelSheetName];
            this.sourceFieldNameList = lodash.map(this.currentExcelSheetConfiguration.fields, 'name');
            this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy = [
                lodash.find(this.duplicateHandlingOptions, { id: DL_DATA_IMPORT.mergeOptions.generateNewIds })
            ];
            var isCloningConfig = Boolean(this.context.clonedConfigurationInstanceId);
            if (isCloningConfig && this.context.isClonedConfigMatched) {
                this.currentSheetDataImportMapping = lodash.cloneDeep(this.getRefactoredClonedConfiguration(lodash.find(this.context.dataImportContext.dataImportConfigurations.sheets, {
                    name: this.excelSheetName
                })));
                setTimeout(function () { return _this.updateDataChangesToSheetMapContext(); });
                if (this.getRecordDefinitionName()) {
                    this.loadTargetAndOtherFields(false, false);
                }
                else {
                    this.setTypeFromExcelSheet();
                }
            }
            else {
                this.setTypeFromExcelSheet();
            }
        };
        DataImportMappingStepComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.dataImportConfigurationForm.control.valueChanges
                .pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroyed$))
                .subscribe(function (values) { return setTimeout(function () { return _this.updateDataChangesToSheetMapContext(); }); });
        };
        DataImportMappingStepComponent.prototype.removeMapping = function (index) {
            this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.splice(index, 1);
        };
        DataImportMappingStepComponent.prototype.addFieldMapping = function (sourceFieldName, targetField) {
            if (sourceFieldName === void 0) { sourceFieldName = null; }
            if (targetField === void 0) { targetField = null; }
            this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.push({
                sourceField: { fieldName: sourceFieldName ? [sourceFieldName] : null },
                targetField: targetField ? [targetField] : null
            });
            this.updateWizardButtons();
        };
        DataImportMappingStepComponent.prototype.setDefinitionTypeNameFromExcelSheet = function () {
            this.setTypeFromExcelSheet();
            this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name =
                this.currentExcelSheetConfiguration.definition.value;
        };
        DataImportMappingStepComponent.prototype.setTypeFromExcelSheet = function () {
            this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type =
                this.getTypeFromExcelSheet();
        };
        DataImportMappingStepComponent.prototype.autoMapping = function () {
            this.clearMappingFields();
            this.setDefinitionTypeNameFromExcelSheet();
            this.loadTargetAndOtherFields(true);
        };
        DataImportMappingStepComponent.prototype.loadTargetAndOtherFields = function (isAutoMapping, autoPopulateRequiredFields) {
            var _this = this;
            if (isAutoMapping === void 0) { isAutoMapping = false; }
            if (autoPopulateRequiredFields === void 0) { autoPopulateRequiredFields = false; }
            this.areFieldsLoading = true;
            this.requiredFieldNames = [];
            rxjs.iif(function () { return _this.isDefinitionTypeRecord(); }, this.rxRecordDefinitionCacheService.getRecordDefinition(this.getRecordDefinitionName()), this.rxAssociationDefinitionService.get(this.getRecordDefinitionName()))
                .pipe(operators.map(function (definitionResponse) {
                if (_this.dataExportService.isRecordDefinitionResponse(definitionResponse)) {
                    _this.targetFieldList = definitionResponse.fieldDefinitions
                        .sort(function (a, b) {
                        if (a.fieldOption === i5.RecordFieldOption.Required && !a.defaultValue) {
                            return -1;
                        }
                        else {
                            b.name.localeCompare(a.name);
                        }
                    })
                        .map(function (fieldDefinition) {
                        if (_this.isMappingFieldDefinitionRequired(fieldDefinition)) {
                            _this.requiredFieldNames.push(fieldDefinition.name);
                            if (autoPopulateRequiredFields) {
                                _this.addFieldMapping(null, {
                                    name: fieldDefinition.name,
                                    _fieldId: fieldDefinition.id
                                });
                            }
                        }
                        return {
                            name: fieldDefinition.name,
                            _fieldId: fieldDefinition.id
                        };
                    });
                }
                else {
                    _this.targetFieldList = [
                        {
                            name: definitionResponse.nodeAName || '',
                            _fieldId: definitionResponse.nodeAKeys[0] || ''
                        },
                        {
                            name: definitionResponse.nodeBName || '',
                            _fieldId: definitionResponse.nodeBKeys[0]
                        }
                    ].filter(function (field) { return field.name; });
                }
            }), operators.tap(function () {
                if (isAutoMapping) {
                    _this.generateAutoMappingFields();
                }
            }), operators.finalize(function () {
                _this.areFieldsLoading = false;
            }))
                .subscribe(function () {
                _this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings = lodash.sortBy(_this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, function (fieldMap) { return lodash.get(fieldMap, 'targetField[0].name'); });
            });
        };
        DataImportMappingStepComponent.prototype.isMappingFieldDefinitionRequired = function (fieldDefinition) {
            return fieldDefinition.fieldOption === i5.RecordFieldOption.Required && !fieldDefinition.defaultValue;
        };
        DataImportMappingStepComponent.prototype.generateAutoMappingFields = function () {
            var _this = this;
            lodash.forEach(this.sourceFieldNameList, function (sourceFieldName) {
                var matchedTargetField = _this.targetFieldList.find(function (targetField) { return sourceFieldName === targetField.name || sourceFieldName === String(targetField._fieldId); });
                if (matchedTargetField) {
                    _this.addFieldMapping(sourceFieldName, matchedTargetField);
                }
                else {
                    _this.addFieldMapping(sourceFieldName, null);
                }
            });
            var targetFieldMappings = lodash.flatten(lodash.map(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, 'targetField'));
            lodash.forEach(this.targetFieldList, function (targetField) {
                if (!lodash.find(targetFieldMappings, { name: targetField.name }) && _this.isRequiredTargetField(targetField)) {
                    _this.addFieldMapping(null, targetField);
                }
            });
        };
        DataImportMappingStepComponent.prototype.onDefinitionChange = function (definitionName) {
            this.clearMappingFields();
            if (definitionName) {
                if (!this.definitionNameService.getBundleId(definitionName)) {
                    this.showInvalidDefinitionSelectedMsg();
                }
                else {
                    this.loadTargetAndOtherFields(false, true);
                }
            }
        };
        DataImportMappingStepComponent.prototype.clearMappingFields = function () {
            this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings = [];
        };
        DataImportMappingStepComponent.prototype.getRecordDefinitionName = function (isAutoMapping) {
            return isAutoMapping
                ? this.currentExcelSheetConfiguration.definition.value
                : this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name;
        };
        DataImportMappingStepComponent.prototype.clearDefinitionSelection = function () {
            this.changeDetectorRef.detectChanges();
            this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name = null;
        };
        DataImportMappingStepComponent.prototype.onDefinitionTypeChange = function () {
            this.clearMappingFields();
            this.clearDefinitionSelection();
        };
        DataImportMappingStepComponent.prototype.showInvalidDefinitionSelectedMsg = function () {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.global-record-not-allowed.message'));
            this.clearDefinitionSelection();
        };
        DataImportMappingStepComponent.prototype.isDefinitionTypeRecord = function () {
            return (this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===
                this.definitionTypes.record);
        };
        DataImportMappingStepComponent.prototype.optionFormatter = function (field) {
            return field.name;
        };
        DataImportMappingStepComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        DataImportMappingStepComponent.prototype.isStepActive = function () {
            var _a;
            return this.rxWizardModalComponent.api.isCurrentStepActive((_a = this.currentExcelSheetConfiguration) === null || _a === void 0 ? void 0 : _a.stepId);
        };
        DataImportMappingStepComponent.prototype.onTargetFieldSelection = function ($event, index) {
            var _this = this;
            var isFieldAlreadySelected = lodash.flow(function (fields) { return lodash.filter(fields, function (value, key) { return key !== index; }); }, function (alreadySelectedFields) { return lodash.find(alreadySelectedFields, function (fieldMap) { var _a, _b; return fieldMap.targetField && ((_a = fieldMap === null || fieldMap === void 0 ? void 0 : fieldMap.targetField[0]) === null || _a === void 0 ? void 0 : _a.name) === ((_b = $event.options[0]) === null || _b === void 0 ? void 0 : _b.name); }); }, function (fieldMap) { return fieldMap; })(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings);
            if (isFieldAlreadySelected) {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.target-field-already-selected.message.title'));
                $event.preventDefault();
            }
            else {
                setTimeout(function () { return _this.updateDataChangesToSheetMapContext(); });
            }
        };
        DataImportMappingStepComponent.prototype.isRequiredTargetField = function (targetField) {
            return lodash.includes(this.requiredFieldNames, (targetField === null || targetField === void 0 ? void 0 : targetField.name) || lodash.get(targetField, '[0].name'));
        };
        DataImportMappingStepComponent.prototype.shouldGenerateNewIdForDuplicateRecords = function () {
            var _a;
            return (this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy &&
                ((_a = this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy[0]) === null || _a === void 0 ? void 0 : _a.id) === 1);
        };
        DataImportMappingStepComponent.prototype.onTabActivated = function (event) {
            if (event.index === 1) {
                this.matchDuplicateByFields = lodash.flow(function (fields) { return lodash.map(fields, 'targetField'); }, lodash.compact, lodash.flatten)(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings);
                var defaultMatchByField = lodash.find(this.matchDuplicateByFields, { _fieldId: i5.RX_RECORD_DEFINITION.coreFieldIds.id });
                if (defaultMatchByField && !this.selectedMatchDuplicateByFields.length) {
                    this.selectedMatchDuplicateByFields = [defaultMatchByField];
                }
                this.selectedMatchDuplicateByFields = lodash.intersectionBy(this.matchDuplicateByFields, this.selectedMatchDuplicateByFields, 'name');
            }
        };
        DataImportMappingStepComponent.prototype.getTypeFromExcelSheet = function () {
            return lodash.lowerCase(this.currentExcelSheetConfiguration.definition.name);
        };
        Object.defineProperty(DataImportMappingStepComponent.prototype, "timeFormatExample", {
            get: function () {
                var _a;
                return (this.currentSheetDataImportMapping.configurations.timeFormatOptions &&
                    ((_a = this.currentSheetDataImportMapping.configurations.timeFormatOptions[0]) === null || _a === void 0 ? void 0 : _a.example));
            },
            enumerable: false,
            configurable: true
        });
        DataImportMappingStepComponent.prototype.areFieldMappingsInvalid = function () {
            return lodash.some(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, function (fieldMap) { return !fieldMap.sourceField.fieldName || !fieldMap.targetField; });
        };
        DataImportMappingStepComponent.prototype.updateWizardButtons = function () {
            this.rxWizardModalComponent.config.options.allowFinish =
                this.rxWizardModalComponent.activeTabIndex === this.rxWizardModalComponent.config.options.steps.length - 1;
            if (this.dataImportConfigurationForm.invalid || this.areFieldMappingsInvalid()) {
                this.rxWizardModalComponent.api.disableNextButton();
                this.rxWizardModalComponent.api.disableFinishButton();
            }
            else {
                this.rxWizardModalComponent.api.enableNextButton();
                this.rxWizardModalComponent.api.enableFinishButton();
            }
        };
        DataImportMappingStepComponent.prototype.updateDataChangesToSheetMapContext = function () {
            this.updateWizardButtons();
            this.rxWizardModalComponent.api.markDirty();
            var currentConfigurations = lodash.cloneDeep(this.currentSheetDataImportMapping.configurations);
            lodash.filter(currentConfigurations.definitionMappings.fieldMappings, function (field) { return field.targetField; }).forEach(function (field) {
                field.sourceField = { fieldName: lodash.get(field.sourceField, 'fieldName[0]') };
                field.targetField = field.targetField[0];
            });
            currentConfigurations.duplicateHandlingOptions.handleDuplicateBy = lodash.get(currentConfigurations.duplicateHandlingOptions.handleDuplicateBy, '[0].id');
            if (this.shouldGenerateNewIdForDuplicateRecords()) {
                currentConfigurations.duplicateHandlingOptions.matchDuplicateBy = [];
            }
            else {
                currentConfigurations.duplicateHandlingOptions.matchDuplicateBy = lodash.map(this.selectedMatchDuplicateByFields, function (field) { return ({
                    _fieldId: field._fieldId,
                    name: field.name
                }); });
            }
            currentConfigurations.dataHandlingOptions = this.dataOptions
                .filter(function (option) { return option.isSelected; })
                .map(function (option) { return option.id; });
            currentConfigurations.timeFormatOptions = lodash.get(currentConfigurations.timeFormatOptions, '[0].name');
            var sheetImportConfig = lodash.find(this.context.dataImportContext.dataImportConfigurations.sheets, {
                name: this.excelSheetName
            });
            sheetImportConfig.configurations = currentConfigurations;
        };
        DataImportMappingStepComponent.prototype.getRefactoredClonedConfiguration = function (configuration) {
            lodash.forEach(configuration.configurations.definitionMappings.fieldMappings, function (fieldMap) {
                fieldMap.targetField = [fieldMap.targetField];
                fieldMap.sourceField.fieldName = [fieldMap.sourceField.fieldName];
            });
            this.dataOptions.forEach(function (option) {
                option.isSelected = lodash.includes(configuration.configurations.dataHandlingOptions, option.id);
            });
            configuration.configurations.timeFormatOptions = configuration.configurations.timeFormatOptions
                ? [
                    lodash.find(this.dateTimeFormatOptions, {
                        name: configuration.configurations.timeFormatOptions
                    })
                ]
                : [];
            configuration.configurations.duplicateHandlingOptions.handleDuplicateBy = configuration.configurations
                .duplicateHandlingOptions.handleDuplicateBy
                ? [
                    lodash.find(this.duplicateHandlingOptions, {
                        id: configuration.configurations.duplicateHandlingOptions.handleDuplicateBy
                    })
                ]
                : [lodash.find(this.duplicateHandlingOptions, { id: DL_DATA_IMPORT.mergeOptions.generateNewIds })];
            if (configuration.configurations.duplicateHandlingOptions.matchDuplicateBy.length) {
                this.selectedMatchDuplicateByFields = configuration.configurations.duplicateHandlingOptions.matchDuplicateBy;
            }
            return configuration;
        };
        return DataImportMappingStepComponent;
    }());
    DataImportMappingStepComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportMappingStepComponent, deps: [{ token: DataImportService }, { token: DataExportService }, { token: i5__namespace.RxRecordDefinitionCacheService }, { token: i0__namespace.ChangeDetectorRef }, { token: i4__namespace$1.RxModalService }, { token: i7__namespace$1.RxWizardModalComponent }, { token: i2__namespace$1.RxDefinitionNameService }, { token: i2__namespace.TranslateService }, { token: i8__namespace.RxAssociationDefinitionService }, { token: i2__namespace$1.RxNotificationService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataImportMappingStepComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataImportMappingStepComponent, selector: "dl-data-import-mapping-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "dataImportConfigurationForm", first: true, predicate: ["dataImportConfigurationForm"], descendants: true }], ngImport: i0__namespace, template: "<form #dataImportConfigurationForm=\"ngForm\">\n  <adapt-tabset type=\"pills\" [tab-active]=\"0\" (tab-active-changed)=\"onTabActivated($event)\">\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.title' | translate }}\"\n    >\n      <div *ngIf=\"isStepActive()\" class=\"mt-2\">\n        <button\n          adapt-button\n          btn-type=\"primary\"\n          type=\"button\"\n          rx-id=\"auto-mapping\"\n          (click)=\"autoMapping()\"\n          size=\"small\"\n          class=\"d-icon-left-arrow_schema form-group\"\n          [disabled]=\"areFieldsLoading\"\n        >\n          {{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.types.auto-mapping.label' | translate }}\n        </button>\n\n        <adapt-rx-radiobutton-group\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type\"\n          (ngModelChange)=\"onDefinitionTypeChange()\"\n          name=\"definitionType\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.definition.label' | translate }}\"\n          rx-id=\"definition-type\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let definitionType of definitionTypeOptions; let index = index\"\n            class=\"radio-inline m-0\"\n            [value]=\"definitionType.value\"\n            [label]=\"definitionType.displayValue\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <rx-definition-picker\n          *ngIf=\"\n            currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===\n            definitionTypes.record\n          \"\n          class=\"d-block form-group\"\n          [options]=\"recordPickerOptions\"\n          rx-id=\"record-definition-picker\"\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\"\n          (ngModelChange)=\"onDefinitionChange($event)\"\n          name=\"recordDefinitionName\"\n        >\n        </rx-definition-picker>\n\n        <rx-definition-picker\n          *ngIf=\"\n            currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===\n            definitionTypes.association\n          \"\n          class=\"d-block form-group\"\n          [options]=\"associationPickerOptions\"\n          rx-id=\"association-definition-picker\"\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\"\n          (ngModelChange)=\"onDefinitionChange($event)\"\n          name=\"associationDefinitionName\"\n        >\n        </rx-definition-picker>\n\n        <div *ngIf=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\">\n          <div class=\"row border-bottom form-group\">\n            <div class=\"col-6\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.mapping-title.title' | translate\n                }}\"\n              >\n              </adapt-rx-control-label>\n            </div>\n\n            <div class=\"col-6\">\n              <button\n                class=\"d-icon-left-plus_circle float-right py-0 px-2\"\n                adapt-button\n                btn-type=\"tertiary\"\n                type=\"button\"\n                rx-id=\"add-mapping\"\n                (click)=\"addFieldMapping()\"\n              >\n                {{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.types.manual-mapping.label'\n                    | translate\n                }}\n              </button>\n            </div>\n          </div>\n\n          <div class=\"row\" *ngIf=\"currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.length\">\n            <div class=\"col-6\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.source-fields.label' | translate\n                }}\"\n              ></adapt-rx-control-label>\n            </div>\n\n            <div class=\"col-6 pl-0\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.target-fields.label' | translate\n                }}\"\n              ></adapt-rx-control-label>\n            </div>\n          </div>\n\n          <div class=\"loader-container\" *ngIf=\"areFieldsLoading\">\n            <div class=\"loader-section\"></div>\n          </div>\n\n          <div\n            class=\"row no-gutters\"\n            *ngFor=\"\n              let fieldMapping of currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings;\n              let $index = index\n            \"\n          >\n            <div class=\"col-5\">\n              <adapt-rx-select\n                class=\"d-block form-group\"\n                [(ngModel)]=\"fieldMapping.sourceField.fieldName\"\n                [options]=\"sourceFieldNameList\"\n                [required]=\"true\"\n                [enableFilter]=\"true\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                (ngModelChange)=\"updateDataChangesToSheetMapContext()\"\n                rx-id=\"source-field-names\"\n              >\n              </adapt-rx-select>\n            </div>\n\n            <div class=\"col-1 d-icon-arrow_right text-tertiary mt-2 text-center\"></div>\n\n            <div class=\"col-5\">\n              <adapt-rx-select\n                class=\"d-block form-group\"\n                [(ngModel)]=\"fieldMapping.targetField\"\n                [options]=\"targetFieldList\"\n                [optionFormatter]=\"optionFormatter\"\n                [required]=\"true\"\n                (onSelectionChange)=\"onTargetFieldSelection($event, $index)\"\n                [enableFilter]=\"true\"\n                [disabled]=\"isRequiredTargetField(fieldMapping.targetField)\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                rx-id=\"target-fields\"\n              >\n              </adapt-rx-select>\n            </div>\n\n            <div class=\"col-1 pl-3\">\n              <button\n                [disabled]=\"isRequiredTargetField(fieldMapping.targetField)\"\n                [ngClass]=\"{ 'text-tertiary': isRequiredTargetField(fieldMapping.targetField) }\"\n                class=\"d-icon-minus_circle text-danger form-group px-0\"\n                adapt-button\n                btn-type=\"tertiary\"\n                type=\"button\"\n                rx-id=\"remove-mapping-button\"\n                (click)=\"removeMapping($index)\"\n              ></button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.title' | translate }}\"\n    >\n      <adapt-rx-select\n        label=\"{{\n          'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.label' | translate\n        }}\"\n        class=\"d-block form-group mt-2\"\n        [(ngModel)]=\"currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy\"\n        [options]=\"duplicateHandlingOptions\"\n        name=\"handleDuplicatesBy\"\n        rx-id=\"handle-duplicates-by\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        label=\"{{\n          'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.match-by.label' | translate\n        }}\"\n        *ngIf=\"!shouldGenerateNewIdForDuplicateRecords()\"\n        class=\"d-block form-group\"\n        [(ngModel)]=\"selectedMatchDuplicateByFields\"\n        [options]=\"matchDuplicateByFields\"\n        [multiple]=\"true\"\n        [enableFilter]=\"true\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [optionFormatter]=\"optionFormatter\"\n        [required]=\"!shouldGenerateNewIdForDuplicateRecords()\"\n        name=\"matchDuplicatesBy\"\n        rx-id=\"match-duplicates-by\"\n      >\n      </adapt-rx-select>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.common.options.label' | translate }}\">\n      <adapt-rx-checkbox\n        *ngFor=\"let dataOption of dataOptions; let index = index\"\n        [(ngModel)]=\"dataOption.isSelected\"\n        label=\"{{ dataOption.name }}\"\n        [ngClass]=\"{ 'd-block form-group': index === 2 }\"\n        name=\"{{ 'data-option' + dataOption.id }}\"\n        [attr.rx-id]=\"'data-option' + dataOption.id\"\n      ></adapt-rx-checkbox>\n\n      <adapt-rx-select\n        label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.date-format.label' | translate }}\"\n        class=\"d-block mb-1\"\n        [(ngModel)]=\"currentSheetDataImportMapping.configurations.timeFormatOptions\"\n        [options]=\"dateTimeFormatOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [optionContentTemplate]=\"optionTemplate\"\n        name=\"dateFormat\"\n        rx-id=\"date-format\"\n      >\n      </adapt-rx-select>\n\n      <div class=\"text-tertiary\" *ngIf=\"timeFormatExample\">\n        {{ 'com.bmc.arsys.rx.client.common.example.label' | translate }}:\n        {{ timeFormatExample }}\n      </div>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</form>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.name }}</strong>\n\n  <div class=\"text-tertiary\">e.g. {{ option.example }}</div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep adapt-rx-radiobutton .radio{margin:8px 0}:host::ng-deep .dropdown-item{white-space:normal;word-break:break-all}adapt-rx-select,rx-definition-picker{max-width:400px}\n"], components: [{ type: i4__namespace.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i4__namespace.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4__namespace.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4__namespace.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i7__namespace$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i4__namespace.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i4__namespace.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4__namespace.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i6__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6__namespace.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportMappingStepComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-data-import-mapping-step',
                        templateUrl: './data-import-mapping-step.component.html',
                        styleUrls: ['./data-import-mapping-step.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: DataImportService }, { type: DataExportService }, { type: i5__namespace.RxRecordDefinitionCacheService }, { type: i0__namespace.ChangeDetectorRef }, { type: i4__namespace$1.RxModalService }, { type: i7__namespace$1.RxWizardModalComponent }, { type: i2__namespace$1.RxDefinitionNameService }, { type: i2__namespace.TranslateService }, { type: i8__namespace.RxAssociationDefinitionService }, { type: i2__namespace$1.RxNotificationService }]; }, propDecorators: { context: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }], dataImportConfigurationForm: [{
                    type: i0.ViewChild,
                    args: ['dataImportConfigurationForm']
                }] } });

    var UploadDataFileStepComponent = /** @class */ (function () {
        function UploadDataFileStepComponent(rxRecordInstanceService, rxNotificationService, dataImportService, rxModalService, translateService, formBuilder, rxWizardModalComponent, rxWizardService, componentFactoryResolver) {
            var _this = this;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxNotificationService = rxNotificationService;
            this.dataImportService = dataImportService;
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.formBuilder = formBuilder;
            this.rxWizardModalComponent = rxWizardModalComponent;
            this.rxWizardService = rxWizardService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.isWorksheetProcessed = false;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.processCustomizedImport$ = new rxjs.Subject();
            this.saveDataFileConfiguration = this.processCustomizedImport$
                .pipe(operators.takeUntil(this.destroyed$), operators.tap(function () {
                _this.busy = rxjs.NEVER.subscribe();
            }), operators.switchMap(function () {
                if (_this.isWorksheetProcessed) {
                    return rxjs.of(null);
                }
                else {
                    return rxjs.iif(function () { return !!_this.context.createdRecordInstanceId; }, _this.rxRecordInstanceService.get(DL_DATA_IMPORT.recordDefinitionName, _this.context.createdRecordInstanceId), _this.rxRecordInstanceService.getNew(DL_DATA_IMPORT.recordDefinitionName)).pipe(operators.switchMap(function (recordInstance) {
                        _this.updateRecordInstanceFields(recordInstance);
                        return _this.context.createdRecordInstanceId
                            ? _this.rxRecordInstanceService.save(recordInstance)
                            : _this.rxRecordInstanceService.create(recordInstance);
                    }), operators.tap(function (recordInstanceResponse) {
                        if (!_this.context.createdRecordInstanceId) {
                            _this.context.createdRecordInstanceId = recordInstanceResponse === null || recordInstanceResponse === void 0 ? void 0 : recordInstanceResponse.id;
                        }
                    }));
                }
            }), operators.switchMap(function () { return _this.isWorksheetProcessed
                ? rxjs.of(null)
                : _this.dataImportService.getDataRecordWorksheet(_this.context.createdRecordInstanceId); }), operators.withLatestFrom(rxjs.timer(0).pipe(operators.switchMap(function () {
                var _a;
                return ((_a = _this.context) === null || _a === void 0 ? void 0 : _a.clonedConfigurationInstanceId)
                    ? _this.rxRecordInstanceService.get(DL_DATA_IMPORT.recordDefinitionName, _this.context.clonedConfigurationInstanceId)
                    : rxjs.of(null);
            }))), operators.tap(function () {
                _this.busy.unsubscribe();
            }), operators.switchMap(function (_b) {
                var _c = __read(_b, 2), uploadedExcelFile = _c[0], clonedRecordInstance = _c[1];
                if (_this.isWorksheetProcessed) {
                    return rxjs.of({ gotoNextStep: true });
                }
                else if (uploadedExcelFile === null || uploadedExcelFile === void 0 ? void 0 : uploadedExcelFile.sheets) {
                    _this.isWorksheetProcessed = true;
                    _this.uploadedExcelSheets = uploadedExcelFile.sheets;
                    _this.rxWizardModalComponent.api.removeStep(1);
                    lodash.forEach(_this.uploadedExcelSheets, function (sheet) {
                        var stepId = lodash.camelCase(sheet.sheetName);
                        sheet.configurations.stepId = stepId;
                        _this.context.excelSheetsConfiguration[sheet.sheetName] = sheet.configurations;
                        _this.rxWizardModalComponent.api.addStep({
                            id: stepId,
                            name: sheet.sheetName,
                            options: {
                                sheetName: sheet.sheetName
                            },
                            componentFactory: _this.componentFactoryResolver.resolveComponentFactory(DataImportMappingStepComponent)
                        });
                        _this.context.dataImportContext.dataImportConfigurations.sheets.push(_this.dataImportService.getEmptyCurrentSheetDataMapConfig(sheet.sheetName));
                    });
                    if (_this.context.clonedConfigurationInstanceId) {
                        var clonedConfig = JSON.parse(clonedRecordInstance.fieldInstances[DL_DATA_IMPORT.fields.mappingConfig].value) || { dataImportConfigurations: { sheets: [] } };
                        var nonMatchedSheetNames = clonedConfig.dataImportConfigurations.sheets.filter(function (clonedSheet) { return !uploadedExcelFile.sheets.some(function (excelSheet) { return excelSheet.sheetName === clonedSheet.name; }); });
                        if (clonedConfig.dataImportConfigurations.sheets.length !== uploadedExcelFile.sheets.length ||
                            nonMatchedSheetNames.length) {
                            return rxjs.from(_this.rxModalService.confirm({
                                title: _this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                modalStyle: i4$1.RX_MODAL.modalStyles.warning,
                                message: _this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.configuration-mismatch.message'),
                                buttons: {
                                    confirmButton: _this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                                    dismissButton: _this.translateService.instant('com.bmc.arsys.rx.client.common.continue.label')
                                }
                            })).pipe(operators.switchMap(function (result) { return rxjs.iif(function () { return result; }, _this.deleteCreatedDataImportInstance(), rxjs.of({ recordDeleted: false })); }), operators.tap(function (response) {
                                if (response.recordDeleted) {
                                    _this.rxWizardModalComponent.api.markPristine();
                                    _this.rxWizardModalComponent.close();
                                }
                                else {
                                    _this.goToDataConfigurationStep();
                                }
                            }));
                        }
                        else {
                            _this.context.dataImportContext.dataImportConfigurations.sheets =
                                clonedConfig.dataImportConfigurations.sheets;
                            _this.context.isClonedConfigMatched = true;
                            return rxjs.of({ gotoNextStep: true });
                        }
                    }
                    else {
                        return rxjs.of({ gotoNextStep: true });
                    }
                }
                else {
                    _this.isWorksheetProcessed = false;
                    _this.uploadDataFileForm.markAsDirty();
                    _this.rxNotificationService.addErrorMessage(_this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.invalid-attachment-uploaded-error.message'));
                    return _this.deleteCreatedDataImportInstance();
                }
            }))
                .subscribe(function (response) {
                if (response.gotoNextStep) {
                    setTimeout(function () { return _this.goToDataConfigurationStep(); });
                }
            });
        }
        UploadDataFileStepComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxWizardModalComponent.next$
                .pipe(operators.filter(function (stepId) { return stepId === DL_DATA_IMPORT.uploadFileStepId; }), operators.takeUntil(this.destroyed$))
                .subscribe(function () {
                _this.saveDataloadFileAndProceedToConfigurations();
            });
            this.rxWizardModalComponent.api.disableNextButton();
            this.uploadDataFileForm = this.formBuilder.group({
                importJobName: [null, [i6.Validators.required, i6.Validators.maxLength(254)]],
                importJobDescription: [null, i6.Validators.maxLength(254)],
                dataFile: null,
                archivedWorksheetFileName: [null, [i6.Validators.required, i6.Validators.maxLength(254)]]
            });
            this.uploadDataFileForm.valueChanges.pipe(operators.distinctUntilChanged(), operators.takeUntil(this.destroyed$)).subscribe(function () {
                _this.updateWizardButtons();
                var context = {
                    importJobName: _this.uploadDataFileForm.get('importJobName').value,
                    importJobDescription: _this.uploadDataFileForm.get('importJobDescription').value,
                    attachmentType: _this.isZipAttachmentUploaded
                        ? DL_DATA_IMPORT.attachmentTypes.zip.value
                        : DL_DATA_IMPORT.attachmentTypes.xlsx.value,
                    archivedWorksheetFileName: _this.uploadDataFileForm.get('archivedWorksheetFileName').value
                };
                _this.rxWizardModalComponent.api.updateContext({
                    importJobInfo: context
                });
            });
        };
        UploadDataFileStepComponent.prototype.updateWizardButtons = function () {
            if (this.uploadDataFileForm.pristine || this.uploadDataFileForm.invalid) {
                this.rxWizardModalComponent.api.disableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.enableNextButton();
            }
        };
        UploadDataFileStepComponent.prototype.saveDataloadFile = function () {
            var _this = this;
            this.rxWizardModalComponent.api.disableNextButton();
            this.uploadDataFileForm.markAsPristine();
            this.rxWizardModalComponent.api.markPristine();
            this.rxRecordInstanceService
                .getNew(DL_DATA_IMPORT.recordDefinitionName)
                .pipe(operators.switchMap(function (recordInstance) {
                _this.updateRecordInstanceFields(recordInstance);
                return _this.rxRecordInstanceService.create(recordInstance);
            }))
                .subscribe(function () {
                _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.data-record-saved.message'));
                _this.rxWizardModalComponent.close();
            });
        };
        UploadDataFileStepComponent.prototype.saveDataloadFileAndProceedToConfigurations = function () {
            this.isCustomizedImportStarted = true;
            this.rxWizardModalComponent.api.disableNextButton();
            this.uploadDataFileForm.markAsPristine();
            this.processCustomizedImport$.next();
        };
        UploadDataFileStepComponent.prototype.handleWorksheetNameInput = function () {
            if (this.isZipAttachmentUploaded) {
                this.uploadDataFileForm.get('archivedWorksheetFileName').enable();
            }
            else {
                this.uploadDataFileForm.get('archivedWorksheetFileName').disable();
            }
        };
        UploadDataFileStepComponent.prototype.onAfterFilesAdded = function (event) {
            if (event.length) {
                this.isWorksheetProcessed = false;
                this.isZipAttachmentUploaded = this.isZipExtension(event[0].data.name);
                this.handleWorksheetNameInput();
            }
        };
        UploadDataFileStepComponent.prototype.onRemovedFileFromQueue = function () {
            this.isZipAttachmentUploaded = false;
            this.handleWorksheetNameInput();
            this.uploadDataFileForm.controls.archivedWorksheetFileName.setValue('');
        };
        UploadDataFileStepComponent.prototype.getAllowedTypes = function () {
            return [DL_DATA_IMPORT.attachmentTypes.zip.extension, DL_DATA_IMPORT.attachmentTypes.xlsx.extension];
        };
        UploadDataFileStepComponent.prototype.isZipExtension = function (fileName) {
            return fileName.split('.').pop().toLowerCase() === DL_DATA_IMPORT.attachmentTypes.zip.extension;
        };
        UploadDataFileStepComponent.prototype.deleteCreatedDataImportInstance = function () {
            var _this = this;
            return this.rxRecordInstanceService
                .delete(DL_DATA_IMPORT.recordDefinitionName, this.context.createdRecordInstanceId)
                .pipe(operators.tap(function () {
                _this.context.createdRecordInstanceId = null;
            }), operators.map(function () { return ({
                recordDeleted: true
            }); }));
        };
        UploadDataFileStepComponent.prototype.goToDataConfigurationStep = function () {
            this.rxWizardModalComponent.next(true);
        };
        UploadDataFileStepComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        UploadDataFileStepComponent.prototype.updateRecordInstanceFields = function (recordInstance) {
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobName, this.uploadDataFileForm.get('importJobName').value);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobDescription, this.uploadDataFileForm.get('importJobDescription').value);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.attachmentType, this.isZipAttachmentUploaded
                ? DL_DATA_IMPORT.attachmentTypes.zip.value
                : DL_DATA_IMPORT.attachmentTypes.xlsx.value);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.dataFile, this.uploadDataFileForm.get('dataFile').value[0].data);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.archivedWorksheetFileName, this.uploadDataFileForm.get('archivedWorksheetFileName').value);
        };
        return UploadDataFileStepComponent;
    }());
    UploadDataFileStepComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UploadDataFileStepComponent, deps: [{ token: i5__namespace.RxRecordInstanceService }, { token: i2__namespace$1.RxNotificationService }, { token: DataImportService }, { token: i4__namespace$1.RxModalService }, { token: i2__namespace.TranslateService }, { token: i6__namespace.FormBuilder }, { token: i7__namespace$1.RxWizardModalComponent }, { token: i7__namespace$1.RxWizardService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.Component });
    UploadDataFileStepComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: UploadDataFileStepComponent, selector: "dl-upload-data-file-step", inputs: { context: "context" }, ngImport: i0__namespace, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<form [formGroup]=\"uploadDataFileForm\" class=\"d-flex flex-column flex-fill h-100\">\n  <adapt-rx-textfield\n    class=\"d-block form-group\"\n    formControlName=\"importJobName\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.import-job-name.label' | translate }}\"\n    rx-id=\"import-job-name\"\n    [autofocus]=\"true\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textfield\n    class=\"d-block form-group\"\n    formControlName=\"importJobDescription\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.import-job-description.label' | translate }}\"\n    rx-id=\"import-job-description\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-uploader\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.data-file.label' | translate }}\"\n    formControlName=\"dataFile\"\n    [required]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    [allowedTypes]=\"getAllowedTypes()\"\n    (afterFilesAdded)=\"onAfterFilesAdded($event)\"\n    (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n    rx-id=\"data-file\"\n  >\n  </adapt-rx-uploader>\n\n  <adapt-rx-textfield\n    *ngIf=\"isZipAttachmentUploaded\"\n    class=\"d-block mb-1\"\n    formControlName=\"archivedWorksheetFileName\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.attachment-type.zip.content-file.label' | translate }}\"\n    rx-id=\"archived-worksheet-file-name\"\n    [autofocus]=\"true\"\n    (onFocus)=\"updateWizardButtons()\"\n  >\n  </adapt-rx-textfield>\n\n  <div class=\"text-tertiary form-group\" *ngIf=\"isZipAttachmentUploaded\">\n    {{ 'com.bmc.arsys.rx.client.common.example.label' | translate }} Worksheet.xlsx\n  </div>\n\n  <button\n    adapt-button\n    class=\"mt-auto align-self-end\"\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"quick-import-button\"\n    (click)=\"saveDataloadFile()\"\n    [disabled]=\"uploadDataFileForm.pristine || uploadDataFileForm.invalid || isCustomizedImportStarted\"\n  >\n    {{ 'com.bmc.arsys.rx.client.dataload.import.wizard.quick-data-import.label' | translate }}\n  </button>\n</form>\n", styles: [":host{position:relative;display:block;height:100%}\n"], components: [{ type: i4__namespace$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i4__namespace.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4__namespace.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UploadDataFileStepComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-upload-data-file-step',
                        templateUrl: './upload-data-file-step.component.html',
                        styleUrls: ['./upload-data-file-step.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace.RxRecordInstanceService }, { type: i2__namespace$1.RxNotificationService }, { type: DataImportService }, { type: i4__namespace$1.RxModalService }, { type: i2__namespace.TranslateService }, { type: i6__namespace.FormBuilder }, { type: i7__namespace$1.RxWizardModalComponent }, { type: i7__namespace$1.RxWizardService }, { type: i0__namespace.ComponentFactoryResolver }]; }, propDecorators: { context: [{
                    type: i0.Input
                }] } });

    var DataImportComponent = /** @class */ (function () {
        function DataImportComponent(componentFactoryResolver, rxModalService, rxDefinitionNameService, rxNotificationService, rxWizardService, translateService, rxRecordInstanceService, adaptModalService, rxJsonParserService, dataImportService, rxRecordInstanceDataPageService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxModalService = rxModalService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxNotificationService = rxNotificationService;
            this.rxWizardService = rxWizardService;
            this.translateService = translateService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.adaptModalService = adaptModalService;
            this.rxJsonParserService = rxJsonParserService;
            this.dataImportService = dataImportService;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.hostClass = 'd-flex mh-100 flex-column';
        }
        DataImportComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                guid: 'dl-import-grid',
                actionButtons: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.grid.load-data.label'),
                        style: 'tertiary',
                        iconCls: 'arrow_right_square_input',
                        actions: [
                            {
                                name: function () {
                                    _this.loadDataFromSelectedRecords();
                                }
                            }
                        ],
                        disabled: function () { return !lodash.some(_this.grid.api.getSelectedRows(), _this.isNewOrStoppedRecord); }
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.clone-configuration.label'),
                        style: 'tertiary',
                        icon: 'files_copy_o',
                        actions: [
                            {
                                name: function () {
                                    _this.cloneDataImportConfiguration();
                                }
                            }
                        ],
                        disabled: function () { return _this.grid.api.getSelectedRows().length !== 1; }
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        style: 'tertiary',
                        icon: 'trash',
                        actions: [
                            {
                                name: function () {
                                    _this.deleteSelectedDataRecords();
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.archive.label'),
                        style: 'tertiary',
                        iconCls: 'file_o_archive',
                        actions: [
                            {
                                name: function () {
                                    _this.archiveSelectedDataRecords();
                                }
                            }
                        ],
                        disabled: function () { return _this.areAllSelectedArchived(); }
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.stop.label'),
                        style: 'tertiary',
                        iconCls: 'pause',
                        actions: [
                            {
                                name: function () { return _this.stopSelectedRecordProcessing(); }
                            }
                        ],
                        disabled: function () { return !lodash.some(_this.grid.api.getSelectedRows(), _this.isProcessingOrQueuedRecord); }
                    }
                ],
                recordDefinitionName: DL_DATA_IMPORT.recordDefinitionName,
                enableRowSelection: i9.RowSelectionMode.Multiple,
                columns: this.getColumns(),
                getData: function (queryParams) { return _this.getData(queryParams); },
                styles: 'flex-fill'
            });
        };
        DataImportComponent.prototype.getData = function (queryParams) {
            return this.rxRecordInstanceDataPageService.post({
                params: Object.assign({}, lodash.omit(Object.assign(Object.assign({}, queryParams), { propertySelection: [
                        String(DL_DATA_IMPORT.fields.importJobName),
                        String(DL_DATA_IMPORT.fields.uploadedOn),
                        String(DL_DATA_IMPORT.fields.importJobDescription),
                        String(DL_DATA_IMPORT.fields.dataFile),
                        String(DL_DATA_IMPORT.fields.attachmentOut),
                        String(i5.RX_RECORD_DEFINITION.coreFieldIds.status),
                        String(DL_DATA_IMPORT.fields.isArchived),
                        String(DL_DATA_IMPORT.fields.mappingConfig),
                        String(i5.RX_RECORD_DEFINITION.coreFieldIds.id)
                    ] }), ['searchText']))
            });
        };
        DataImportComponent.prototype.isNewOrStoppedRecord = function (row) {
            return (row[i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.new ||
                row[i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.stopped);
        };
        DataImportComponent.prototype.areAllSelectedArchived = function () {
            return lodash.every(this.grid.api.getSelectedRows(), function (row) { return row[DL_DATA_IMPORT.fields.isArchived] === 1; });
        };
        DataImportComponent.prototype.newDataImport = function (selectedRecordInstanceId) {
            var _this = this;
            if (selectedRecordInstanceId === void 0) { selectedRecordInstanceId = null; }
            this.dataloadWizardContext = {
                clonedConfigurationInstanceId: selectedRecordInstanceId,
                createdRecordInstanceId: null,
                isClonedConfigMatched: false,
                dataImportContext: {
                    dataImportConfigurations: {
                        sheets: []
                    }
                },
                excelSheetsConfiguration: {}
            };
            this.rxWizardService
                .open({
                context: this.dataloadWizardContext,
                options: {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.title'),
                    finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
                    steps: [
                        {
                            id: DL_DATA_IMPORT.uploadFileStepId,
                            name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.steps.upload-data-file.label'),
                            componentFactory: this.componentFactoryResolver.resolveComponentFactory(UploadDataFileStepComponent),
                            handlesNext: true
                        },
                        // This temporary step is needed to display wizard Next button
                        DL_DATA_IMPORT.temporaryStepConfig
                    ]
                }
            })
                .then(function (result) {
                if (result) {
                    _this.savePrepareDataImportConfiguration();
                }
                else {
                    _this.grid.api.refresh().subscribe();
                }
            });
        };
        DataImportComponent.prototype.loadDataFromSelectedRecords = function () {
            var _this = this;
            var newOrStoppedRecords = lodash.filter(this.grid.api.getSelectedRows(), this.isNewOrStoppedRecord);
            if (newOrStoppedRecords.length < this.grid.api.getSelectedRows().length) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i4$1.RX_MODAL.modalStyles.default,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.already-loaded-data-warning.message')
                })
                    .then(function (result) {
                    if (result) {
                        _this.loadDataFromFile();
                    }
                });
            }
            else {
                this.loadDataFromFile();
            }
        };
        DataImportComponent.prototype.isProcessingOrQueuedRecord = function (row) {
            return (row[i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.processing ||
                row[i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.queued);
        };
        DataImportComponent.prototype.stopSelectedRecordProcessing = function () {
            var _this = this;
            var alreadyProcessedRecords = lodash.filter(this.grid.api.getSelectedRows(), this.isProcessingOrQueuedRecord);
            if (alreadyProcessedRecords.length !== this.grid.api.getSelectedRows().length) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i4$1.RX_MODAL.modalStyles.default,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.stop-data-processing-warning.message')
                })
                    .then(function (result) {
                    if (result) {
                        _this.stopRecordProcessing();
                    }
                });
            }
            else {
                this.stopRecordProcessing();
            }
        };
        DataImportComponent.prototype.stopRecordProcessing = function () {
            var _this = this;
            var stopProcessingRequests$ = lodash.filter(this.grid.api.getSelectedRows(), this.isProcessingOrQueuedRecord).map(function (row) { return _this.dataImportService.stopDataProcessing(row[i5.RX_RECORD_DEFINITION.coreFieldIds.id]); });
            rxjs.forkJoin(stopProcessingRequests$).subscribe(function () {
                _this.grid.api.refresh().subscribe();
            });
        };
        DataImportComponent.prototype.deleteSelectedDataRecords = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i4$1.RX_MODAL.modalStyles.default,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.delete-import-record-confirmation.message')
            })
                .then(function (result) {
                if (result) {
                    var deleteDataRequests$ = lodash.map(_this.grid.api.getSelectedRows(), function (row) { return _this.rxRecordInstanceService.delete(DL_DATA_IMPORT.recordDefinitionName, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id]); });
                    rxjs.forkJoin(deleteDataRequests$).subscribe(function () {
                        _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.delete-import-record-success.message'));
                        _this.grid.api.refresh().subscribe();
                    });
                }
            });
        };
        DataImportComponent.prototype.archiveSelectedDataRecords = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i4$1.RX_MODAL.modalStyles.default,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.archive-records-warning.message')
            })
                .then(function (result) {
                var _a;
                if (result) {
                    var archiveDataRequests$ = lodash.filter(_this.grid.api.getSelectedRows(), (_a = {},
                        _a[DL_DATA_IMPORT.fields.isArchived] = 0,
                        _a)).map(function (row) { return _this.rxRecordInstanceService
                        .get(DL_DATA_IMPORT.recordDefinitionName, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id])
                        .pipe(operators.switchMap(function (recordInstance) {
                        recordInstance.id = row[i5.RX_RECORD_DEFINITION.coreFieldIds.id];
                        recordInstance.displayId = row[i5.RX_RECORD_DEFINITION.coreFieldIds.displayId];
                        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.isArchived, DL_DATA_IMPORT.archiveTrueValue);
                        return _this.rxRecordInstanceService.save(recordInstance);
                    })); });
                    rxjs.forkJoin(archiveDataRequests$).subscribe(function () {
                        _this.grid.api.refresh().subscribe();
                    });
                }
            });
        };
        DataImportComponent.prototype.cloneDataImportConfiguration = function () {
            this.newDataImport(this.grid.api.getFirstSelectedRow()[i5.RX_RECORD_DEFINITION.coreFieldIds.id]);
        };
        DataImportComponent.prototype.loadDataFromFile = function () {
            var _this = this;
            var loadDataRequests$ = lodash.filter(this.grid.api.getSelectedRows(), this.isNewOrStoppedRecord).map(function (row) { return _this.dataImportService.runLoadProcess(row[i5.RX_RECORD_DEFINITION.coreFieldIds.id]); });
            rxjs.forkJoin(loadDataRequests$).subscribe(function () {
                _this.grid.api.refresh().subscribe();
            });
        };
        DataImportComponent.prototype.getRecordNames = function (selectedRow) {
            var _this = this;
            return lodash.map(lodash.get(this.rxJsonParserService.tryParseJson(selectedRow[DL_DATA_IMPORT.fields.mappingConfig]), 'dataImportConfigurations.sheets'), 'configurations.definitionMappings.targetDefinition.name')
                .filter(Boolean)
                .map(function (definitionQualifiedName) { return _this.rxDefinitionNameService.getDisplayName(definitionQualifiedName); })
                .join(', ');
        };
        DataImportComponent.prototype.showStatusInfo = function (selectedRow) {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                content: ImportRecordStatusInfoComponent,
                data: {
                    dataRecordId: selectedRow[i5.RX_RECORD_DEFINITION.coreFieldIds.id]
                },
                size: 'lg'
            })
                .catch(lodash.noop);
        };
        DataImportComponent.prototype.getColumns = function () {
            var _this = this;
            return [
                {
                    fieldId: String(DL_DATA_IMPORT.fields.importJobName),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.uploadedOn),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.steps.uploaded-on.label')
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.importJobDescription),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.mappingConfig),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label'),
                    cellTemplate: this.recordNamesCellTemplate,
                    sortable: false
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.dataFile),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.grid.data-load-input.title'),
                    sortable: false,
                    filterable: false,
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, row) {
                                _this.rxRecordInstanceService.downloadAttachment(DL_DATA_IMPORT.recordDefinitionName, DL_DATA_IMPORT.fields.dataFile, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_IMPORT.fields.dataFile]);
                            }
                        }
                    ]
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.attachmentOut),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.grid.data-load-result.title'),
                    sortable: false,
                    filterable: false,
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, row) {
                                _this.rxRecordInstanceService.downloadAttachment(DL_DATA_IMPORT.recordDefinitionName, DL_DATA_IMPORT.fields.attachmentOut, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_IMPORT.fields.attachmentOut]);
                            }
                        }
                    ]
                },
                {
                    fieldId: String(i5.RX_RECORD_DEFINITION.coreFieldIds.status),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label')
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.isArchived),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.archived-record.title')
                },
                {
                    fieldId: String(DL_DATA_IMPORT.fields.message),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.status-message.title'),
                    cellTemplate: this.statusInfoCellTemplate,
                    alignment: i9.RecordGridColumnAlignment.Center,
                    filterable: false,
                    sortable: false
                },
                {
                    fieldId: String(i5.RX_RECORD_DEFINITION.coreFieldIds.id),
                    visible: false,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                }
            ];
        };
        DataImportComponent.prototype.savePrepareDataImportConfiguration = function () {
            var _this = this;
            this.rxRecordInstanceService
                .get(DL_DATA_IMPORT.recordDefinitionName, this.dataloadWizardContext.createdRecordInstanceId)
                .pipe(operators.switchMap(function (recordInstance) {
                recordInstance.setFieldValue(DL_DATA_IMPORT.fields.mappingConfig, JSON.stringify(_this.dataloadWizardContext.dataImportContext));
                recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobName, _this.dataloadWizardContext.importJobInfo.importJobName);
                recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobDescription, _this.dataloadWizardContext.importJobInfo.importJobDescription);
                recordInstance.setFieldValue(DL_DATA_IMPORT.fields.attachmentType, _this.dataloadWizardContext.importJobInfo.attachmentType);
                recordInstance.setFieldValue(DL_DATA_IMPORT.fields.archivedWorksheetFileName, _this.dataloadWizardContext.importJobInfo.archivedWorksheetFileName);
                return _this.rxRecordInstanceService.save(recordInstance);
            }), operators.switchMap(function () { return _this.grid.api.refresh(); }))
                .subscribe();
        };
        return DataImportComponent;
    }());
    DataImportComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportComponent, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i4__namespace$1.RxModalService }, { token: i2__namespace$1.RxDefinitionNameService }, { token: i2__namespace$1.RxNotificationService }, { token: i7__namespace$1.RxWizardService }, { token: i2__namespace.TranslateService }, { token: i5__namespace.RxRecordInstanceService }, { token: i4__namespace.AdaptModalService }, { token: i3__namespace.RxJsonParserService }, { token: DataImportService }, { token: i5__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataImportComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataImportComponent, selector: "dl-data-import", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "recordNamesCellTemplate", first: true, predicate: ["recordNamesCellTemplate"], descendants: true, static: true }, { propertyName: "statusInfoCellTemplate", first: true, predicate: ["statusInfoCellTemplate"], descendants: true, static: true }], ngImport: i0__namespace, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-import-button\"\n  (click)=\"newDataImport()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.import.new-import.title' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n\n<ng-template #recordNamesCellTemplate let-dataItem=\"dataItem\">\n  {{ getRecordNames(dataItem) }}\n</ng-template>\n\n<ng-template #statusInfoCellTemplate let-dataItem=\"dataItem\">\n  <a href=\"javascript:void(0)\" (click)=\"showStatusInfo(dataItem)\">{{\n    'com.bmc.arsys.rx.client.common.action-view.label' | translate\n  }}</a>\n</ng-template>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-data-import',
                        templateUrl: './data-import.component.html',
                        styleUrls: ['./data-import.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i4__namespace$1.RxModalService }, { type: i2__namespace$1.RxDefinitionNameService }, { type: i2__namespace$1.RxNotificationService }, { type: i7__namespace$1.RxWizardService }, { type: i2__namespace.TranslateService }, { type: i5__namespace.RxRecordInstanceService }, { type: i4__namespace.AdaptModalService }, { type: i3__namespace.RxJsonParserService }, { type: DataImportService }, { type: i5__namespace.RxRecordInstanceDataPageService }]; }, propDecorators: { hostClass: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], grid: [{
                    type: i0.ViewChild,
                    args: ['grid']
                }], recordNamesCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['recordNamesCellTemplate', { static: true }]
                }], statusInfoCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['statusInfoCellTemplate', { static: true }]
                }] } });

    var DataImportRegistrationModule = /** @class */ (function () {
        function DataImportRegistrationModule(componentFactoryResolver, rxViewComponentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            rxViewComponentRegistryService.register({
                type: 'dl-dataload-data-import',
                componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataImportComponent),
                name: 'Data import',
                isPageComponent: true,
                availableInBundles: [i2$1.RX_APPLICATION.dataloadBundleId]
            });
        }
        return DataImportRegistrationModule;
    }());
    DataImportRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportRegistrationModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$2.RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DataImportRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportRegistrationModule, declarations: [DataImportComponent,
            ImportRecordStatusInfoComponent,
            UploadDataFileStepComponent,
            DataImportMappingStepComponent], imports: [i4.AdaptButtonModule,
            i1.CommonModule,
            i6.FormsModule,
            i2.TranslateModule,
            i9.RecordGridModule,
            i4.AdaptPopoverModule,
            i7.AdaptTableModule,
            i4$1.RxLineLoaderModule,
            i4.AdaptRxTextfieldModule,
            i4.AdaptRxUploaderModule,
            i4.AdaptRxSelectModule,
            i6.ReactiveFormsModule,
            i4.AdaptTabsModule,
            i4.AdaptRxRadiobuttonModule,
            i7$1.RxDefinitionPickerModule,
            i4.AdaptRxLabelModule,
            i4.AdaptAlertModule,
            i4.AdaptRxCheckboxModule,
            i4$1.RxBusyIndicatorModule] });
    DataImportRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportRegistrationModule, imports: [[
                i4.AdaptButtonModule,
                i1.CommonModule,
                i6.FormsModule,
                i2.TranslateModule,
                i9.RecordGridModule,
                i4.AdaptPopoverModule,
                i7.AdaptTableModule,
                i4$1.RxLineLoaderModule,
                i4.AdaptRxTextfieldModule,
                i4.AdaptRxUploaderModule,
                i4.AdaptRxSelectModule,
                i6.ReactiveFormsModule,
                i4.AdaptTabsModule,
                i4.AdaptRxRadiobuttonModule,
                i7$1.RxDefinitionPickerModule,
                i4.AdaptRxLabelModule,
                i4.AdaptAlertModule,
                i4.AdaptRxCheckboxModule,
                i4$1.RxBusyIndicatorModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataImportRegistrationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            DataImportComponent,
                            ImportRecordStatusInfoComponent,
                            UploadDataFileStepComponent,
                            DataImportMappingStepComponent
                        ],
                        imports: [
                            i4.AdaptButtonModule,
                            i1.CommonModule,
                            i6.FormsModule,
                            i2.TranslateModule,
                            i9.RecordGridModule,
                            i4.AdaptPopoverModule,
                            i7.AdaptTableModule,
                            i4$1.RxLineLoaderModule,
                            i4.AdaptRxTextfieldModule,
                            i4.AdaptRxUploaderModule,
                            i4.AdaptRxSelectModule,
                            i6.ReactiveFormsModule,
                            i4.AdaptTabsModule,
                            i4.AdaptRxRadiobuttonModule,
                            i7$1.RxDefinitionPickerModule,
                            i4.AdaptRxLabelModule,
                            i4.AdaptAlertModule,
                            i4.AdaptRxCheckboxModule,
                            i4$1.RxBusyIndicatorModule
                        ],
                        entryComponents: [DataImportComponent]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$2.RxViewComponentRegistryService }]; } });

    var DL_DATA_EXPORT = {
        recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Export Form',
        archiveTrueValue: 1,
        associationDefinitionDataFilterProperty: 'associationDefinitionDataFilter',
        fields: {
            name: 536870913,
            generatedFile: 536870914,
            startTime: 536870915,
            endTime: 536870916,
            progressDetail: 536870917,
            message: 536870918,
            configurations: 536870919,
            isArchive: 536870920,
            fileName: 536870921,
            configDescription: 536870922
        },
        dataStatuses: {
            new: 0,
            processing: 1,
            processed: 2,
            failed: 3
        }
    };

    var ExportRecordStatusInfoComponent = /** @class */ (function () {
        function ExportRecordStatusInfoComponent(datePipe, rxTranslateService, rxJsonParserService, activeModalRef, rxRecordInstanceDataPageService) {
            var _a;
            var _this = this;
            this.datePipe = datePipe;
            this.rxTranslateService = rxTranslateService;
            this.rxJsonParserService = rxJsonParserService;
            this.activeModalRef = activeModalRef;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.statusData$ = this.rxRecordInstanceDataPageService
                .post({
                params: (_a = {},
                    _a[i5.RX_RECORD_DEFINITION.coreFieldIds.id] = this.activeModalRef.getData().dataRecordId,
                    _a.recorddefinition = DL_DATA_EXPORT.recordDefinitionName,
                    _a)
            })
                .pipe(operators.map(function (dataPage) {
                if (dataPage.data[0][i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_EXPORT.dataStatuses.processing) {
                    _this.processStartInfo = _this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.process-started.message') + " " + _this.datePipe.transform(dataPage.data[0][i5.RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium');
                }
                var dataExportProgressStatus = lodash.get(_this.rxJsonParserService.tryParseJson(dataPage.data[0][DL_DATA_EXPORT.fields.message], []), 'dataExportProgressStatus');
                if (dataExportProgressStatus) {
                    return lodash.map(dataExportProgressStatus, function (statusInfo) { return (Object.assign(Object.assign({}, statusInfo), { updateTime: _this.datePipe.transform(statusInfo.updateTime, 'medium') })); });
                }
                else {
                    _this.exportConfiguredNotProcessedMsg = dataPage.data[0][DL_DATA_EXPORT.fields.message];
                    return [];
                }
            }));
            this.columns = [
                {
                    field: 'updateTime',
                    header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.status-info-grid.column.updated-date.title'),
                    sortable: false,
                    width: '20%'
                },
                {
                    field: 'status',
                    header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                    width: '20%'
                },
                {
                    field: 'message',
                    header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.message.label'),
                    width: '80%'
                }
            ];
        }
        ExportRecordStatusInfoComponent.prototype.close = function () {
            this.activeModalRef.close();
        };
        return ExportRecordStatusInfoComponent;
    }());
    ExportRecordStatusInfoComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExportRecordStatusInfoComponent, deps: [{ token: i1__namespace.DatePipe }, { token: i2__namespace.TranslateService }, { token: i3__namespace.RxJsonParserService }, { token: i4__namespace.ActiveModalRef }, { token: i5__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ExportRecordStatusInfoComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExportRecordStatusInfoComponent, selector: "dl-export-record-status-info", ngImport: i0__namespace, template: "<ng-template #loaderTemplate>\n  <rx-line-loader></rx-line-loader>\n</ng-template>\n\n<div *ngIf=\"statusData$ | async as statusData; else loaderTemplate\">\n  <div class=\"data-status-info\">\n    <div *ngIf=\"exportConfiguredNotProcessedMsg\">\n      {{ exportConfiguredNotProcessedMsg }}\n    </div>\n\n    <adapt-alert\n      *ngIf=\"processStartInfo\"\n      [config]=\"{\n        content: processStartInfo,\n        type: 'inline',\n        variant: 'warning'\n      }\"\n    ></adapt-alert>\n\n    <adapt-table\n      [hidden]=\"exportConfiguredNotProcessedMsg\"\n      rx-id=\"exported-status-info-grid\"\n      [columns]=\"columns\"\n      [bordered]=\"true\"\n      [value]=\"statusData\"\n      [wrapCellText]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button (click)=\"close()\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" type=\"button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [".data-status-info{padding:15px}\n"], components: [{ type: i4__namespace$1.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i4__namespace.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7__namespace.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i1__namespace.AsyncPipe, "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExportRecordStatusInfoComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-export-record-status-info',
                        templateUrl: './export-record-status-info.component.html',
                        styleUrls: ['./export-record-status-info.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.DatePipe }, { type: i2__namespace.TranslateService }, { type: i3__namespace.RxJsonParserService }, { type: i4__namespace.ActiveModalRef }, { type: i5__namespace.RxRecordInstanceDataPageService }]; } });

    var DataExportFiltersExpressionConfigurator = /** @class */ (function (_super) {
        __extends(DataExportFiltersExpressionConfigurator, _super);
        function DataExportFiltersExpressionConfigurator(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            _this.translateService = _this.injector.get(i2.TranslateService);
            _this.rxDefinitionNameService = _this.injector.get(i2$1.RxDefinitionNameService);
            _this.rxRecordDefinitionCacheService = _this.injector.get(i5.RxRecordDefinitionCacheService);
            _this.rxAssociationDefinitionCacheService = _this.injector.get(i8.RxAssociationDefinitionCacheService);
            _this.commonDataDictionary$ = rxjs.of([
                {
                    label: _this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    children: [
                        {
                            label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                            icon: 'd-icon-dollar',
                            expression: '$USER$'
                        },
                        {
                            label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                            icon: 'd-icon-dollar',
                            expression: '$DATE$'
                        },
                        {
                            label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                            icon: 'd-icon-dollar',
                            expression: '$TIME$'
                        },
                        {
                            label: _this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                            icon: 'd-icon-dollar',
                            expression: '$TIMESTAMP$'
                        }
                    ]
                }
            ]);
            return _this;
        }
        DataExportFiltersExpressionConfigurator.prototype.geDataDefinitionField = function (definitionType, recordOrAssociationDefinitionName) {
            var _this = this;
            if (recordOrAssociationDefinitionName) {
                return rxjs.iif(function () { return definitionType === 'record'; }, this.rxRecordDefinitionCacheService.getRecordDefinition(recordOrAssociationDefinitionName), this.rxAssociationDefinitionCacheService.getAssociationDefinition(recordOrAssociationDefinitionName).pipe(operators.map(function (associationDefinitionResponse) { return associationDefinitionResponse.nodeAId; }), operators.switchMap(function (fetchedRecordDefinitionName) { return _this.rxRecordDefinitionCacheService.getRecordDefinition(fetchedRecordDefinitionName); }))).pipe(operators.withLatestFrom(this.commonDataDictionary$), operators.map(function (_a) {
                    var _b = __read(_a, 2), definitionResponse = _b[0], commonDataDictionary = _b[1];
                    return __spreadArray(__spreadArray([], __read(commonDataDictionary)), [
                        {
                            label: _this.rxDefinitionNameService.getDisplayName(definitionResponse.name),
                            children: definitionResponse.fieldDefinitions.map(function (fieldDefinition) { return ({
                                label: fieldDefinition.name,
                                icon: 'd-icon-field_text',
                                expression: "'" + fieldDefinition.id + "'"
                            }); })
                        }
                    ]);
                }));
            }
            else {
                return rxjs.of([]);
            }
        };
        return DataExportFiltersExpressionConfigurator;
    }(i2$1.RxExpressionConfigurator));

    var ExportDataPreviewComponent = /** @class */ (function () {
        function ExportDataPreviewComponent(activeModalRef, rxRecordInstanceDataPageService) {
            this.activeModalRef = activeModalRef;
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.gridContext = this.activeModalRef.getData();
        }
        ExportDataPreviewComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig = rxjs.of({
                recordDefinitionName: this.gridContext.definitionName,
                enableRowSelection: i9.RowSelectionMode.Multiple,
                columns: lodash.sortBy(this.gridContext.selectedFields, 'visibleOnPreviewPriority').map(function (field, index) { return ({
                    title: field.name,
                    fieldId: field.id.toString(),
                    visible: index < 9
                }); }),
                styles: 'flex-fill h-100',
                getData: function (queryParams) { return _this.getData(queryParams); }
            });
        };
        ExportDataPreviewComponent.prototype.getData = function (queryParams) {
            queryParams.queryExpression = [queryParams.queryExpression, this.gridContext.queryFilter]
                .filter(Boolean)
                .join('AND');
            return this.rxRecordInstanceDataPageService.post({
                params: lodash.omit(Object.assign({}, queryParams), ['searchText'])
            });
        };
        ExportDataPreviewComponent.prototype.close = function () {
            this.activeModalRef.dismiss(i4.DismissReasons.CLOSE_BTN);
        };
        return ExportDataPreviewComponent;
    }());
    ExportDataPreviewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExportDataPreviewComponent, deps: [{ token: i4__namespace.ActiveModalRef }, { token: i5__namespace.RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ExportDataPreviewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExportDataPreviewComponent, selector: "dl-export-data-preview", ngImport: i0__namespace, template: "<div class=\"p-4 data-preview-modal-body\">\n  <rx-record-grid [config]=\"gridConfig\"></rx-record-grid>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.data-preview-modal-body{overflow:auto;flex-grow:1;height:645px}\n"], components: [{ type: i9__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ExportDataPreviewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-export-data-preview',
                        templateUrl: './export-data-preview.component.html',
                        styleUrls: ['./export-data-preview.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i4__namespace.ActiveModalRef }, { type: i5__namespace.RxRecordInstanceDataPageService }]; } });

    var DataExportConfigurationComponent = /** @class */ (function (_super) {
        __extends(DataExportConfigurationComponent, _super);
        function DataExportConfigurationComponent(rxFieldDefinitionService, rxRecordInstanceService, rxRecordDefinitionService, adaptModalService, rxNotificationService, rxExpressionEditorService, translateService, changeDetectorRef, definitionNameService, dockedPanelContext, injector) {
            var _this = _super.call(this, dockedPanelContext, injector) || this;
            _this.rxFieldDefinitionService = rxFieldDefinitionService;
            _this.rxRecordInstanceService = rxRecordInstanceService;
            _this.rxRecordDefinitionService = rxRecordDefinitionService;
            _this.adaptModalService = adaptModalService;
            _this.rxNotificationService = rxNotificationService;
            _this.rxExpressionEditorService = rxExpressionEditorService;
            _this.translateService = translateService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.definitionNameService = definitionNameService;
            _this.dockedPanelContext = dockedPanelContext;
            _this.injector = injector;
            _this.index$ = new rxjs.BehaviorSubject(null);
            _this.recordDefinitionNames$ = [];
            _this.definitionFields$ = [];
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.exportConfiguration = {
                exportConfigName: null,
                exportConfigDescription: null,
                definitions: []
            };
            _this.recordPickerOptions = {
                label: '',
                definitionType: i7$1.RxDefinitionPickerType.Record,
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i7$1.RX_DEFINITION_PICKER.definitionScopes.all],
                    search: i7$1.RX_DEFINITION_PICKER.definitionScopes.all
                },
                required: true
            };
            _this.associationPickerOptions = {
                label: '',
                definitionType: i7$1.RxDefinitionPickerType.Association,
                availableDefinitionPickerStates: {
                    definitionButtonsGroups: [i7$1.RX_DEFINITION_PICKER.definitionScopes.all],
                    search: i7$1.RX_DEFINITION_PICKER.definitionScopes.all
                },
                required: true
            };
            _this.definitionTypes = {
                record: 'record',
                association: 'association'
            };
            _this.definitionTypeOptions = [
                {
                    value: _this.definitionTypes.record,
                    displayValue: _this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label')
                },
                {
                    value: _this.definitionTypes.association,
                    displayValue: _this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label')
                }
            ];
            return _this;
        }
        DataExportConfigurationComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.expressionConfigurator = new DataExportFiltersExpressionConfigurator(this.injector);
            this.expressionConfigurator.configureForProperty({
                propertyPath: DL_DATA_EXPORT.associationDefinitionDataFilterProperty,
                dataDictionary$: this.index$.pipe(operators.switchMap(function (index) { return _this.recordDefinitionNames$[index].pipe(operators.switchMap(function (recordDefinitionName) { return _this.expressionConfigurator.geDataDefinitionField(_this.exportConfiguration.definitions[index].type, recordDefinitionName); })); })),
                operators: this.expressionConfigurator.getOperatorRowsByGroup(i2$1.ExpressionOperatorGroup.All)
            });
            this.dataFilterExpressionOptions = {
                label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.data-filters.label'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(DL_DATA_EXPORT.associationDefinitionDataFilterProperty),
                operators: this.expressionConfigurator.getOperators(DL_DATA_EXPORT.associationDefinitionDataFilterProperty)
            };
        };
        DataExportConfigurationComponent.prototype.addDefinition = function () {
            var _this = this;
            this.markAsDirty();
            var nextRowIndex = this.exportConfiguration.definitions.length;
            this.recordDefinitionNames$[nextRowIndex] = new rxjs.BehaviorSubject(null);
            this.definitionFields$[nextRowIndex] = this.recordDefinitionNames$[nextRowIndex].pipe(operators.takeUntil(this.destroyed$), operators.switchMap(function (definitionName) {
                return rxjs.iif(function () { return definitionName && _this.exportConfiguration.definitions[nextRowIndex].type === _this.definitionTypes.record; }, _this.rxRecordDefinitionService.get(definitionName), rxjs.of({ fieldDefinitions: [] }));
            }), operators.map(function (response) {
                return response.fieldDefinitions
                    .sort(function (a, b) {
                    if (_this.rxFieldDefinitionService.isCoreField(a)) {
                        return -1;
                    }
                    if (_this.rxFieldDefinitionService.isCoreField(b)) {
                        return 1;
                    }
                    if (a.fieldOption === i5.RX_RECORD_DEFINITION.fieldOptions.required) {
                        return -1;
                    }
                    if (b.fieldOption === i5.RX_RECORD_DEFINITION.fieldOptions.required) {
                        return 1;
                    }
                    return Number(a.id) - Number(b.id);
                })
                    .map(function (fieldDefinition, index) { return ({
                    name: fieldDefinition.name,
                    id: fieldDefinition.id,
                    disabled: fieldDefinition.fieldOption === i5.RX_RECORD_DEFINITION.fieldOptions.required &&
                        fieldDefinition.defaultValue === null,
                    visibleOnPreviewPriority: index
                }); });
            }), operators.tap(function (criteriaFields) {
                _this.exportConfiguration.definitions[nextRowIndex].criteria.fields = criteriaFields
                    .filter(function (criteriaField) { return criteriaField.disabled; })
                    .map(function (criteriaField) { return (Object.assign({}, criteriaField)); });
            }));
            this.exportConfiguration.definitions.push({
                type: 'record',
                name: null,
                criteria: {
                    filter: null,
                    fields: []
                }
            });
        };
        DataExportConfigurationComponent.prototype.remove = function (index) {
            this.exportConfiguration.definitions.splice(index, 1);
        };
        DataExportConfigurationComponent.prototype.cancel = function () {
            this.dockedPanelContext.dismiss(i4.DismissReasons.CLOSE_BTN);
        };
        DataExportConfigurationComponent.prototype.onDefinitionChange = function (definitionName, rowIndex) {
            if (definitionName && !this.definitionNameService.getBundleId(definitionName)) {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.global-record-not-allowed.message'));
                this.changeDetectorRef.detectChanges();
                this.exportConfiguration.definitions[rowIndex].name = null;
            }
            else {
                this.exportConfiguration.definitions[rowIndex].criteria.filter = null;
                this.index$.next(rowIndex);
                this.recordDefinitionNames$[rowIndex].next(definitionName);
            }
        };
        DataExportConfigurationComponent.prototype.onExpressionEvent = function (rowIndex) {
            var _this = this;
            this.index$.next(rowIndex);
            this.rxExpressionEditorService
                .openEditor({
                property: {
                    path: DL_DATA_EXPORT.associationDefinitionDataFilterProperty,
                    value: this.exportConfiguration.definitions[rowIndex].criteria.filter,
                    label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.data-filters.label')
                },
                expressionConfigurator: this.expressionConfigurator,
                legend: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                        icon: 'd-icon-dollar'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.legend.activity-result.label'),
                        icon: 'd-icon-field_text'
                    }
                ]
            })
                .subscribe(function (expression) {
                _this.exportConfiguration.definitions[rowIndex].criteria.filter = expression.value || null;
            });
        };
        DataExportConfigurationComponent.prototype.isSaveButtonDisabled = function () {
            var _this = this;
            return (this.isSaveInProgress ||
                !this.exportConfiguration.definitions.length ||
                lodash.some(this.exportConfiguration.definitions, function (definition) {
                    return ((definition.type === _this.definitionTypes.record &&
                        (!definition.name || !definition.criteria.fields.length)) ||
                        (definition.type === _this.definitionTypes.association && !definition.name));
                }));
        };
        DataExportConfigurationComponent.prototype.saveExportConfiguration = function () {
            var _this = this;
            this.isSaveInProgress = true;
            this.rxRecordInstanceService
                .getNew(DL_DATA_EXPORT.recordDefinitionName)
                .pipe(operators.switchMap(function (recordInstance) {
                recordInstance.setFieldValue(DL_DATA_EXPORT.fields.name, _this.exportConfiguration.exportConfigName);
                recordInstance.setFieldValue(DL_DATA_EXPORT.fields.configDescription, _this.exportConfiguration.exportConfigDescription);
                recordInstance.setFieldValue(DL_DATA_EXPORT.fields.configurations, JSON.stringify({
                    definitions: lodash.map(lodash.cloneDeep(_this.exportConfiguration.definitions), function (definition) {
                        definition.criteria.fields = lodash.map(definition.criteria.fields, function (field) { return ({
                            id: field.id,
                            name: field.name
                        }); });
                        return definition;
                    })
                }));
                return _this.rxRecordInstanceService.create(recordInstance);
            }), operators.finalize(function () {
                _this.isSaveInProgress = false;
            }))
                .subscribe(function () {
                _this.dockedPanelContext.close(null);
            });
        };
        DataExportConfigurationComponent.prototype.clearFieldsSelection = function (index) {
            this.exportConfiguration.definitions[index].name = null;
            this.exportConfiguration.definitions[index].criteria.filter = null;
            this.exportConfiguration.definitions[index].criteria.fields = [];
        };
        DataExportConfigurationComponent.prototype.openExportingDataPreview = function (definition) {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.preview-data.label'),
                content: ExportDataPreviewComponent,
                size: 'lg',
                data: {
                    definitionName: definition.name,
                    selectedFields: definition.criteria.fields,
                    queryFilter: definition.criteria.filter
                }
            })
                .catch(lodash.noop);
        };
        DataExportConfigurationComponent.prototype.isPreviewDisabled = function (definition) {
            return !definition.name || !definition.criteria.fields.length;
        };
        DataExportConfigurationComponent.prototype.ngOnDestroy = function () {
            lodash.forEach(this.recordDefinitionNames$, function (name$) { return name$.complete(); });
            this.index$.complete();
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        DataExportConfigurationComponent.prototype.optionFormatter = function (field) {
            return field.name;
        };
        return DataExportConfigurationComponent;
    }(i4$1.RxModalClass));
    DataExportConfigurationComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportConfigurationComponent, deps: [{ token: i5__namespace.RxFieldDefinitionService }, { token: i5__namespace.RxRecordInstanceService }, { token: i5__namespace.RxRecordDefinitionService }, { token: i4__namespace.AdaptModalService }, { token: i2__namespace$1.RxNotificationService }, { token: i7__namespace$1.RxExpressionEditorService }, { token: i2__namespace.TranslateService }, { token: i0__namespace.ChangeDetectorRef }, { token: i2__namespace$1.RxDefinitionNameService }, { token: i4__namespace.DockedPanelContext }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataExportConfigurationComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataExportConfigurationComponent, selector: "dl-data-export-configuration", usesInheritance: true, ngImport: i0__namespace, template: "<div class=\"dp-body\">\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    rx-id=\"export-config-name\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n    name=\"exportConfigName\"\n    [(ngModel)]=\"exportConfiguration.exportConfigName\"\n    [required]=\"true\"\n    maxlength=\"254\"\n    [autofocus]=\"true\"\n    (ngModelChange)=\"markAsDirty()\"\n    #exportConfigName=\"ngModel\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    rx-id=\"export-config-description\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n    name=\"exportConfigDescription\"\n    [(ngModel)]=\"exportConfiguration.exportConfigDescription\"\n    maxlength=\"254\"\n    (ngModelChange)=\"markAsDirty()\"\n    #exportConfigDescription=\"ngModel\"\n  >\n  </adapt-rx-textfield>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle px-0\"\n    rx-id=\"add-definition-button\"\n    (click)=\"addDefinition()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.add-definition-button.label' | translate }}\n  </button>\n\n  <adapt-accordion [multiselect]=\"true\">\n    <div\n      *ngFor=\"let definition of exportConfiguration.definitions; let $index = index\"\n      class=\"position-relative form-group\"\n    >\n      <span class=\"actions\">\n        <button\n          class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n          adapt-button\n          size=\"small\"\n          type=\"button\"\n          (click)=\"remove($index)\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n        </button>\n      </span>\n\n      <adapt-accordion-tab class=\"w-100 d-block\" isOpen=\"true\">\n        <adapt-rx-radiobutton-group\n          [(ngModel)]=\"definition.type\"\n          label=\"{{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.definition.label' | translate }}\"\n          [required]=\"true\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let definitionType of definitionTypeOptions; let index = index\"\n            class=\"radio-inline m-0\"\n            [value]=\"definitionType.value\"\n            [label]=\"definitionType.displayValue\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n            (checkedChange)=\"clearFieldsSelection($index)\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"definition.type === definitionTypes.record\"\n          [options]=\"recordPickerOptions\"\n          rx-id=\"record-definition-picker\"\n          [(ngModel)]=\"definition.name\"\n          (ngModelChange)=\"onDefinitionChange($event, $index)\"\n        >\n        </rx-definition-picker>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"definition.type === definitionTypes.association\"\n          [options]=\"associationPickerOptions\"\n          rx-id=\"association-definition-picker\"\n          [(ngModel)]=\"definition.name\"\n          (ngModelChange)=\"onDefinitionChange($event, $index)\"\n        >\n        </rx-definition-picker>\n\n        <div [hidden]=\"!definition.name\">\n          <div *ngIf=\"definitionFields$[$index] | async as options\">\n            <adapt-rx-select\n              class=\"d-block form-group\"\n              [(ngModel)]=\"definition.criteria.fields\"\n              *ngIf=\"definition.type === definitionTypes.record\"\n              label=\"{{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.fields.label' | translate }}\"\n              [options]=\"options\"\n              [required]=\"true\"\n              [multiple]=\"true\"\n              [enableFilter]=\"true\"\n              [selectAllButton]=\"true\"\n              [deselectAllButton]=\"true\"\n              [optionFormatter]=\"optionFormatter\"\n              [attr.rx-id]=\"'definition-' + $index + '_fields'\"\n            >\n            </adapt-rx-select>\n          </div>\n\n          <rx-expression-form-control\n            class=\"d-block form-group\"\n            rx-id=\"data-filter\"\n            [options]=\"dataFilterExpressionOptions\"\n            [(ngModel)]=\"definition.criteria.filter\"\n            (events)=\"onExpressionEvent($index)\"\n          ></rx-expression-form-control>\n\n          <button\n            type=\"button\"\n            adapt-button\n            btn-type=\"secondary\"\n            rx-id=\"preview-button\"\n            (click)=\"openExportingDataPreview(definition)\"\n            *ngIf=\"definition.type === definitionTypes.record\"\n            [disabled]=\"isPreviewDisabled(definition)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.preview-data.label' | translate }}\n          </button>\n        </div>\n      </adapt-accordion-tab>\n    </div>\n  </adapt-accordion>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [adaptInlineLoader]=\"isSaveInProgress\"\n    [disabled]=\"exportConfigName.invalid || exportConfigDescription.invalid || isSaveButtonDisabled()\"\n    (click)=\"saveExportConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [".actions{position:absolute;top:4px;right:35px;z-index:1}\n"], components: [{ type: i4__namespace.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4__namespace.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i4__namespace.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i4__namespace.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4__namespace.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i7__namespace$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i4__namespace.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7__namespace$1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i6__namespace.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i2__namespace.TranslatePipe, "async": i1__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportConfigurationComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-data-export-configuration',
                        templateUrl: './data-export-configuration.component.html',
                        styleUrls: ['./data-export-configuration.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i5__namespace.RxFieldDefinitionService }, { type: i5__namespace.RxRecordInstanceService }, { type: i5__namespace.RxRecordDefinitionService }, { type: i4__namespace.AdaptModalService }, { type: i2__namespace$1.RxNotificationService }, { type: i7__namespace$1.RxExpressionEditorService }, { type: i2__namespace.TranslateService }, { type: i0__namespace.ChangeDetectorRef }, { type: i2__namespace$1.RxDefinitionNameService }, { type: i4__namespace.DockedPanelContext }, { type: i0__namespace.Injector }]; } });

    var DataExportComponent = /** @class */ (function () {
        function DataExportComponent(dataExportService, rxModalService, translateService, rxDefinitionNameService, adaptModalService, rxJsonParserService, rxNotificationService, rxRecordInstanceService) {
            this.dataExportService = dataExportService;
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.adaptModalService = adaptModalService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxNotificationService = rxNotificationService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.hostClass = 'd-flex mh-100 flex-column';
        }
        DataExportComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                guid: 'dl-export-grid',
                actionButtons: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.export-data.label'),
                        style: 'tertiary',
                        iconCls: 'arrow_right_square_input',
                        actions: [
                            {
                                name: function () { return _this.startDataExportProcess(); }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.archive.label'),
                        style: 'tertiary',
                        iconCls: 'file_o_archive',
                        actions: [
                            {
                                name: function () {
                                    _this.archiveExportRecords();
                                }
                            }
                        ],
                        disabled: function () { return lodash.every(_this.grid.api.getSelectedRows(), function (row) { return row[DL_DATA_EXPORT.fields.isArchive] === DL_DATA_EXPORT.archiveTrueValue; }); }
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        style: 'tertiary',
                        icon: 'trash',
                        actions: [
                            {
                                name: function () {
                                    _this.deleteExportRecords();
                                }
                            }
                        ]
                    }
                ],
                recordDefinitionName: DL_DATA_EXPORT.recordDefinitionName,
                enableRowSelection: i9.RowSelectionMode.Multiple,
                columns: this.getColumns(),
                styles: 'flex-fill'
            });
        };
        DataExportComponent.prototype.startDataExportProcess = function () {
            var _this = this;
            var allUploadedRecordsFromSelectedRecords = this.grid.api.getSelectedRows().filter(function (row) {
                return row[i5.RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_EXPORT.dataStatuses.new;
            });
            if (allUploadedRecordsFromSelectedRecords.length !== this.grid.api.getSelectedRows().length) {
                this.rxModalService
                    .confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: i4$1.RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.data-already-exported-warning.message')
                })
                    .then(function (result) {
                    if (result) {
                        _this.startDataExport();
                    }
                });
            }
            else {
                this.startDataExport();
            }
        };
        DataExportComponent.prototype.startDataExport = function () {
            var _this = this;
            var exportRequests = lodash.map(this.grid.api.getSelectedRows(), function (row) { return _this.dataExportService.startDataExport(row[i5.RX_RECORD_DEFINITION.coreFieldIds.id]); });
            rxjs.forkJoin(exportRequests).subscribe(function () {
                _this.grid.api.refresh().subscribe();
            });
        };
        DataExportComponent.prototype.getRecordNames = function (selectedRow) {
            var _this = this;
            return lodash.map(lodash.get(this.rxJsonParserService.tryParseJson(selectedRow[DL_DATA_EXPORT.fields.configurations], []), 'definitions'), 'name')
                .filter(Boolean)
                .map(function (definitionQualifiedName) { return _this.rxDefinitionNameService.getDisplayName(definitionQualifiedName); })
                .join(', ');
        };
        DataExportComponent.prototype.deleteExportRecords = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i4$1.RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.delete-data-warning.message')
            })
                .then(function (result) {
                if (result) {
                    var deleteDataRequests$ = lodash.map(_this.grid.api.getSelectedRows(), function (row) { return _this.rxRecordInstanceService.delete(DL_DATA_EXPORT.recordDefinitionName, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id]); });
                    rxjs.forkJoin(deleteDataRequests$).subscribe(function () {
                        _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.delete-export-record-success.message'));
                        _this.grid.api.refresh().subscribe();
                    });
                }
            });
        };
        DataExportComponent.prototype.archiveExportRecords = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i4$1.RX_MODAL.modalStyles.default,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.archive-records-warning.message')
            })
                .then(function (result) {
                var _a;
                if (result) {
                    var archiveDataRequests$ = lodash.filter(_this.grid.api.getSelectedRows(), (_a = {},
                        _a[DL_DATA_EXPORT.fields.isArchive] = 0,
                        _a)).map(function (row) { return _this.rxRecordInstanceService
                        .get(DL_DATA_EXPORT.recordDefinitionName, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id])
                        .pipe(operators.switchMap(function (recordInstance) {
                        recordInstance.id = row[i5.RX_RECORD_DEFINITION.coreFieldIds.id];
                        recordInstance.displayId = row[i5.RX_RECORD_DEFINITION.coreFieldIds.displayId];
                        recordInstance.setFieldValue(DL_DATA_EXPORT.fields.isArchive, DL_DATA_EXPORT.archiveTrueValue);
                        return _this.rxRecordInstanceService.save(recordInstance);
                    })); });
                    rxjs.forkJoin(archiveDataRequests$).subscribe(function () {
                        _this.grid.api.refresh().subscribe();
                    });
                }
            });
        };
        DataExportComponent.prototype.newExport = function () {
            var _this = this;
            this.rxModalService
                .openDockedPanel({
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.label'),
                content: DataExportConfigurationComponent,
                data: {}
            })
                .then(function () {
                _this.grid.api.refresh().subscribe();
            })
                .catch(lodash.noop);
        };
        DataExportComponent.prototype.showStatusInfo = function (selectedRow) {
            this.adaptModalService
                .open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                content: ExportRecordStatusInfoComponent,
                data: {
                    dataRecordId: selectedRow[i5.RX_RECORD_DEFINITION.coreFieldIds.id]
                },
                size: 'lg'
            })
                .catch(lodash.noop);
        };
        DataExportComponent.prototype.getColumns = function () {
            var _this = this;
            return [
                {
                    fieldId: String(DL_DATA_EXPORT.fields.name),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                },
                {
                    fieldId: String(DL_DATA_EXPORT.fields.endTime),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.grid.column.exported-on.title')
                },
                {
                    fieldId: String(DL_DATA_EXPORT.fields.configDescription),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                },
                {
                    fieldId: String(DL_DATA_EXPORT.fields.configurations),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label'),
                    sortable: false,
                    cellTemplate: this.recordNamesCellTemplate
                },
                {
                    fieldId: String(DL_DATA_EXPORT.fields.generatedFile),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.grid.column.export-output-file.title'),
                    sortable: false,
                    filterable: false,
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, row) {
                                _this.rxRecordInstanceService.downloadAttachment(DL_DATA_EXPORT.recordDefinitionName, DL_DATA_EXPORT.fields.generatedFile, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_EXPORT.fields.generatedFile]);
                            }
                        }
                    ]
                },
                {
                    fieldId: String(i5.RX_RECORD_DEFINITION.coreFieldIds.status),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label')
                },
                {
                    fieldId: String(DL_DATA_EXPORT.fields.isArchive),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.archived-record.title')
                },
                {
                    fieldId: String(DL_DATA_EXPORT.fields.message),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.status-message.title'),
                    sortable: false,
                    filterable: false,
                    cellTemplate: this.statusInfoCellTemplate
                },
                {
                    fieldId: String(i5.RX_RECORD_DEFINITION.coreFieldIds.id),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                    visible: false
                }
            ];
        };
        return DataExportComponent;
    }());
    DataExportComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportComponent, deps: [{ token: DataExportService }, { token: i4__namespace$1.RxModalService }, { token: i2__namespace.TranslateService }, { token: i2__namespace$1.RxDefinitionNameService }, { token: i4__namespace.AdaptModalService }, { token: i3__namespace.RxJsonParserService }, { token: i2__namespace$1.RxNotificationService }, { token: i5__namespace.RxRecordInstanceService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataExportComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataExportComponent, selector: "dl-data-export", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "recordNamesCellTemplate", first: true, predicate: ["recordNamesCellTemplate"], descendants: true, static: true }, { propertyName: "statusInfoCellTemplate", first: true, predicate: ["statusInfoCellTemplate"], descendants: true, static: true }], ngImport: i0__namespace, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-export-button\"\n  (click)=\"newExport()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.export.new.label' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n\n<ng-template #recordNamesCellTemplate let-dataItem=\"dataItem\">\n  {{ getRecordNames(dataItem) }}\n</ng-template>\n\n<ng-template #statusInfoCellTemplate let-dataItem=\"dataItem\">\n  <a href=\"javascript:void(0)\" (click)=\"showStatusInfo(dataItem)\">{{\n    'com.bmc.arsys.rx.client.common.action-view.label' | translate\n  }}</a>\n</ng-template>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-data-export',
                        templateUrl: './data-export.component.html',
                        styleUrls: ['./data-export.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: DataExportService }, { type: i4__namespace$1.RxModalService }, { type: i2__namespace.TranslateService }, { type: i2__namespace$1.RxDefinitionNameService }, { type: i4__namespace.AdaptModalService }, { type: i3__namespace.RxJsonParserService }, { type: i2__namespace$1.RxNotificationService }, { type: i5__namespace.RxRecordInstanceService }]; }, propDecorators: { hostClass: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], grid: [{
                    type: i0.ViewChild,
                    args: ['grid']
                }], recordNamesCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['recordNamesCellTemplate', { static: true }]
                }], statusInfoCellTemplate: [{
                    type: i0.ViewChild,
                    args: ['statusInfoCellTemplate', { static: true }]
                }] } });

    var DataExportRegistrationModule = /** @class */ (function () {
        function DataExportRegistrationModule(componentFactoryResolver, rxViewComponentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            rxViewComponentRegistryService.register({
                type: 'dl-dataload-data-export',
                componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataExportComponent),
                name: 'Data export',
                isPageComponent: true,
                availableInBundles: [i2$1.RX_APPLICATION.dataloadBundleId]
            });
        }
        return DataExportRegistrationModule;
    }());
    DataExportRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportRegistrationModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$2.RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DataExportRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportRegistrationModule, declarations: [DataExportComponent,
            ExportRecordStatusInfoComponent,
            DataExportConfigurationComponent,
            ExportDataPreviewComponent], imports: [i4.AdaptButtonModule,
            i1.CommonModule,
            i6.FormsModule,
            i2.TranslateModule,
            i9.RecordGridModule,
            i4$1.RxLineLoaderModule,
            i4.AdaptAlertModule,
            i7.AdaptTableModule,
            i6.ReactiveFormsModule,
            i4.AdaptRxTextfieldModule,
            i4.AdaptAccordionModule,
            i7$1.RxDefinitionPickerModule,
            i4.AdaptRxRadiobuttonModule,
            i4.AdaptRxSelectModule,
            i7$1.ExpressionFormControlModule,
            i4.AdaptBusyModule] });
    DataExportRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportRegistrationModule, imports: [[
                i4.AdaptButtonModule,
                i1.CommonModule,
                i6.FormsModule,
                i2.TranslateModule,
                i9.RecordGridModule,
                i4$1.RxLineLoaderModule,
                i4.AdaptAlertModule,
                i7.AdaptTableModule,
                i6.ReactiveFormsModule,
                i4.AdaptRxTextfieldModule,
                i4.AdaptAccordionModule,
                i7$1.RxDefinitionPickerModule,
                i4.AdaptRxRadiobuttonModule,
                i4.AdaptRxSelectModule,
                i7$1.ExpressionFormControlModule,
                i4.AdaptBusyModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataExportRegistrationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            DataExportComponent,
                            ExportRecordStatusInfoComponent,
                            DataExportConfigurationComponent,
                            ExportDataPreviewComponent
                        ],
                        imports: [
                            i4.AdaptButtonModule,
                            i1.CommonModule,
                            i6.FormsModule,
                            i2.TranslateModule,
                            i9.RecordGridModule,
                            i4$1.RxLineLoaderModule,
                            i4.AdaptAlertModule,
                            i7.AdaptTableModule,
                            i6.ReactiveFormsModule,
                            i4.AdaptRxTextfieldModule,
                            i4.AdaptAccordionModule,
                            i7$1.RxDefinitionPickerModule,
                            i4.AdaptRxRadiobuttonModule,
                            i4.AdaptRxSelectModule,
                            i7$1.ExpressionFormControlModule,
                            i4.AdaptBusyModule
                        ],
                        entryComponents: [DataExportComponent]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$2.RxViewComponentRegistryService }]; } });

    var DL_DATA_TEMPLATES = {
        recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Load Template',
        fields: {
            templateName: 8,
            dataLoadTemplateVersion: 304412331,
            dataloadTemplateDescription: 304412341,
            template: 304412351,
            isActive: 304412361,
            bundleFriendlyName: 304412371,
            bundleId: 61001
        },
        allowedFileTypes: {
            xlsx: 'xlsx',
            zip: 'zip'
        }
    };

    var DataTemplateEditorComponent = /** @class */ (function (_super) {
        __extends(DataTemplateEditorComponent, _super);
        function DataTemplateEditorComponent(translateService, rxNotificationService, rxGlobalCacheService, rxRecordInstanceService, injector, dockedPanelContext, formBuilder) {
            var _this = _super.call(this, dockedPanelContext, injector) || this;
            _this.translateService = translateService;
            _this.rxNotificationService = rxNotificationService;
            _this.rxGlobalCacheService = rxGlobalCacheService;
            _this.rxRecordInstanceService = rxRecordInstanceService;
            _this.injector = injector;
            _this.dockedPanelContext = dockedPanelContext;
            _this.formBuilder = formBuilder;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            _this.isEditMode = _this.dockedPanelContext.getData().isEditMode;
            _this.enableCustomDownload = true;
            _this.applicationOptions$ = _this.rxGlobalCacheService.getBundleDescriptors().pipe(operators.takeUntil(_this.destroyed$), operators.map(function (bundleDescriptors) {
                return bundleDescriptors
                    .filter(function (bundleDescriptor) { return ![i2$1.RX_APPLICATION.innovationStudioBundleId, i2$1.RX_APPLICATION.standardlib].includes(bundleDescriptor.id); })
                    .sort(function (a, b) { return a.friendlyName.localeCompare(b.friendlyName); })
                    .map(function (bundleDescriptor) { return ({
                    displayValue: bundleDescriptor.friendlyName,
                    value: bundleDescriptor.id
                }); });
            }));
            _this.downloadAttachment = function () {
                _this.rxRecordInstanceService.downloadAttachment(DL_DATA_TEMPLATES.recordDefinitionName, DL_DATA_TEMPLATES.fields.template, _this.dockedPanelContext.getData().templateRecordInstanceId, _this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.template].value);
            };
            return _this;
        }
        DataTemplateEditorComponent.prototype.isDirty = function () {
            return this.dataTemplateForm.dirty;
        };
        DataTemplateEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.dataTemplateForm = this.formBuilder.group({
                application: [[], i6.Validators.required],
                templateName: [null, [i6.Validators.required, i6.Validators.maxLength(254)]],
                version: [null, [i6.Validators.required, i6.Validators.maxLength(254)]],
                isActive: null,
                description: [null, i6.Validators.maxLength(500)],
                template: [null, i6.Validators.required]
            });
            this.dataTemplateForm.get('isActive').setValue(0);
            this.busy = rxjs.iif(function () { return _this.isEditMode; }, this.rxRecordInstanceService.get(DL_DATA_TEMPLATES.recordDefinitionName, this.dockedPanelContext.getData().templateRecordInstanceId), this.rxRecordInstanceService.getNew(DL_DATA_TEMPLATES.recordDefinitionName))
                .pipe(operators.tap(function (recordInstance) {
                _this.recordInstance = recordInstance;
                if (_this.isEditMode) {
                    _this.setTemplateFormValues();
                }
            }), operators.switchMap(function () { return rxjs.iif(function () { return _this.isEditMode; }, _this.applicationOptions$.pipe(operators.take(1)), rxjs.of([])); }), operators.map(function (options) { return lodash.find(options, {
                displayValue: _this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.bundleFriendlyName].value
            }); }), operators.tap(function (option) {
                if (_this.isEditMode) {
                    _this.dataTemplateForm.get('application').setValue([option]);
                }
            }))
                .subscribe();
        };
        DataTemplateEditorComponent.prototype.setTemplateFormValues = function () {
            this.dataTemplateForm
                .get('templateName')
                .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.templateName].value);
            this.dataTemplateForm
                .get('version')
                .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion].value);
            this.dataTemplateForm
                .get('isActive')
                .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.isActive].value);
            this.dataTemplateForm
                .get('description')
                .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.dataloadTemplateDescription].value);
            this.dataTemplateForm.get('template').setValue([
                {
                    data: new File([], this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.template].value),
                    inUploading: false,
                    inDeleting: false,
                    uploaded: 100,
                    error: false,
                    errorText: '',
                    allowDeletion: true
                }
            ]);
        };
        DataTemplateEditorComponent.prototype.optionFormatter = function (option) {
            return option.displayValue;
        };
        DataTemplateEditorComponent.prototype.saveTemplate = function () {
            var _this = this;
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.bundleFriendlyName, this.dataTemplateForm.get('application').value[0].displayValue);
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.bundleId, this.dataTemplateForm.get('application').value[0].value);
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.templateName, this.dataTemplateForm.get('templateName').value);
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion, this.dataTemplateForm.get('version').value);
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.isActive, this.dataTemplateForm.get('isActive').value);
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.dataloadTemplateDescription, this.dataTemplateForm.get('description').value);
            this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.template, this.dataTemplateForm.get('template').value[0].data);
            if (this.isEditMode) {
                this.rxRecordInstanceService.save(this.recordInstance).subscribe(function () { return _this.successCallback(); });
            }
            else {
                this.rxRecordInstanceService.create(this.recordInstance).subscribe(function () { return _this.successCallback(); });
            }
        };
        DataTemplateEditorComponent.prototype.onRemovedFileFromQueue = function () {
            this.enableCustomDownload = false;
        };
        DataTemplateEditorComponent.prototype.cancel = function () {
            this.dockedPanelContext.dismiss(i4.DismissReasons.CLOSE_BTN);
        };
        DataTemplateEditorComponent.prototype.successCallback = function () {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-saved.message'));
            this.dockedPanelContext.close(null);
        };
        DataTemplateEditorComponent.prototype.getAllowedTypes = function () {
            return [DL_DATA_TEMPLATES.allowedFileTypes.xlsx, DL_DATA_TEMPLATES.allowedFileTypes.zip];
        };
        DataTemplateEditorComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next();
            this.destroyed$.complete();
        };
        return DataTemplateEditorComponent;
    }(i4$1.RxModalClass));
    DataTemplateEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplateEditorComponent, deps: [{ token: i2__namespace.TranslateService }, { token: i2__namespace$1.RxNotificationService }, { token: i2__namespace$1.RxGlobalCacheService }, { token: i5__namespace.RxRecordInstanceService }, { token: i0__namespace.Injector }, { token: i4__namespace.DockedPanelContext }, { token: i6__namespace.FormBuilder }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataTemplateEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataTemplateEditorComponent, selector: "dl-data-template-editor", usesInheritance: true, ngImport: i0__namespace, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<div class=\"dp-body\">\n  <form [formGroup]=\"dataTemplateForm\">\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\"\n      rx-id=\"application\"\n      formControlName=\"application\"\n      [options]=\"applicationOptions$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      [autofocus]=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"template-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.dataload.templates.template-name.label' | translate }}\"\n      formControlName=\"templateName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"version\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.version.label' | translate }}\"\n      formControlName=\"version\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-radiobutton-group\n      formControlName=\"isActive\"\n      label=\"{{ 'com.bmc.arsys.rx.client.dataload.templates.is-active-template.label' | translate }}\"\n    >\n      <adapt-rx-radiobutton\n        [value]=\"1\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}\"\n      ></adapt-rx-radiobutton>\n\n      <adapt-rx-radiobutton\n        [value]=\"0\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}\"\n      ></adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-textarea\n      class=\"form-group d-block\"\n      rx-id=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n      formControlName=\"description\"\n      rows=\"4\"\n    >\n    </adapt-rx-textarea>\n\n    <adapt-rx-uploader\n      label=\"{{ 'com.bmc.arsys.rx.client.common.template.label' | translate }}\"\n      formControlName=\"template\"\n      [showMaxSizeRestriction]=\"false\"\n      [enableCustomDownload]=\"enableCustomDownload\"\n      [customDownload]=\"downloadAttachment\"\n      (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n      [reusable]=\"true\"\n      [allowedTypes]=\"getAllowedTypes()\"\n    >\n    </adapt-rx-uploader>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [disabled]=\"dataTemplateForm.pristine || dataTemplateForm.invalid\"\n    (click)=\"saveTemplate()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep adapt-rx-uploader .adapt-uploader-file-uploaded{display:none}\n"], components: [{ type: i4__namespace$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i4__namespace.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4__namespace.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4__namespace.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4__namespace.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4__namespace.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4__namespace.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i2__namespace.TranslatePipe, "async": i1__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplateEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-data-template-editor',
                        templateUrl: './data-template-editor.component.html',
                        styleUrls: ['./data-template-editor.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.TranslateService }, { type: i2__namespace$1.RxNotificationService }, { type: i2__namespace$1.RxGlobalCacheService }, { type: i5__namespace.RxRecordInstanceService }, { type: i0__namespace.Injector }, { type: i4__namespace.DockedPanelContext }, { type: i6__namespace.FormBuilder }]; } });

    var DataTemplatesComponent = /** @class */ (function () {
        function DataTemplatesComponent(rxNotificationService, rxModalService, translateService, rxRecordInstanceService) {
            this.rxNotificationService = rxNotificationService;
            this.rxModalService = rxModalService;
            this.translateService = translateService;
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.hostClass = 'd-flex mh-100 flex-column';
            this.showDeprecated = false;
        }
        DataTemplatesComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.gridConfig$ = rxjs.of({
                guid: 'dl-templates-grid',
                actionButtons: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        style: 'tertiary',
                        icon: 'trash',
                        actions: [
                            {
                                name: function () {
                                    _this.deleteSelectedDataTemplate();
                                }
                            }
                        ]
                    }
                ],
                recordDefinitionName: DL_DATA_TEMPLATES.recordDefinitionName,
                enableRowSelection: i9.RowSelectionMode.Multiple,
                columns: this.getColumns(),
                getRecordDefinition: function () { return rxjs.of(_this.getRecordDefinition()); },
                styles: 'flex-fill'
            });
        };
        DataTemplatesComponent.prototype.deleteSelectedDataTemplate = function () {
            var _this = this;
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: i4$1.RX_MODAL.modalStyles.default,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-delete-warning.message')
            })
                .then(function (result) {
                if (result) {
                    var deleteDataRequests$ = lodash.map(_this.grid.api.getSelectedRows(), function (row) { return _this.rxRecordInstanceService.delete(DL_DATA_TEMPLATES.recordDefinitionName, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id]); });
                    rxjs.forkJoin(deleteDataRequests$).subscribe(function () {
                        _this.rxNotificationService.addSuccessMessage(_this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-delete-success.message'));
                        _this.grid.api.refresh().subscribe();
                    });
                }
            });
        };
        DataTemplatesComponent.prototype.getColumns = function () {
            var _this = this;
            return [
                {
                    fieldId: String(DL_DATA_TEMPLATES.fields.templateName),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, selectedRow) {
                                _this.editDataTemplate(selectedRow);
                            }
                        }
                    ]
                },
                {
                    fieldId: String(DL_DATA_TEMPLATES.fields.bundleFriendlyName),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.application.label')
                },
                {
                    fieldId: String(DL_DATA_TEMPLATES.fields.dataloadTemplateDescription),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                },
                {
                    fieldId: String(DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.version.label')
                },
                {
                    fieldId: String(DL_DATA_TEMPLATES.fields.template),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.download.label'),
                    sortable: false,
                    filterable: false,
                    clickable: true,
                    actions: [
                        {
                            name: function (previousAction, row) {
                                _this.rxRecordInstanceService.downloadAttachment(DL_DATA_TEMPLATES.recordDefinitionName, DL_DATA_TEMPLATES.fields.template, row[i5.RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_TEMPLATES.fields.template]);
                            }
                        }
                    ]
                },
                {
                    fieldId: String(DL_DATA_TEMPLATES.fields.isActive),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.is-active-template.label'),
                    visible: false
                },
                {
                    fieldId: String(i5.RX_RECORD_DEFINITION.coreFieldIds.id),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                    visible: false
                }
            ];
        };
        DataTemplatesComponent.prototype.editDataTemplate = function (selectedRow) {
            this.openDockedPanel(true, selectedRow[i5.RX_RECORD_DEFINITION.coreFieldIds.id]);
        };
        DataTemplatesComponent.prototype.createDataTemplate = function () {
            this.openDockedPanel(false);
        };
        DataTemplatesComponent.prototype.openDockedPanel = function (isEditMode, templateRecordInstanceId) {
            var _this = this;
            return this.rxModalService
                .openDockedPanel({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.template.label'),
                content: DataTemplateEditorComponent,
                data: {
                    isEditMode: isEditMode,
                    templateRecordInstanceId: templateRecordInstanceId
                }
            })
                .then(function () {
                _this.grid.api.refresh().subscribe();
            })
                .catch(lodash.noop);
        };
        DataTemplatesComponent.prototype.getRecordDefinition = function () {
            return {
                fieldDefinitions: [
                    {
                        id: DL_DATA_TEMPLATES.fields.templateName,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: DL_DATA_TEMPLATES.fields.bundleFriendlyName,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: DL_DATA_TEMPLATES.fields.isActive,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.selection,
                        optionNamesById: {
                            1: this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label'),
                            0: this.translateService.instant('com.bmc.arsys.rx.client.common.no.label')
                        }
                    },
                    {
                        id: DL_DATA_TEMPLATES.fields.dataloadTemplateDescription,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: DL_DATA_TEMPLATES.fields.template,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: i5.RX_RECORD_DEFINITION.coreFieldIds.id,
                        resourceType: i5.RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            };
        };
        return DataTemplatesComponent;
    }());
    DataTemplatesComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplatesComponent, deps: [{ token: i2__namespace$1.RxNotificationService }, { token: i4__namespace$1.RxModalService }, { token: i2__namespace.TranslateService }, { token: i5__namespace.RxRecordInstanceService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DataTemplatesComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataTemplatesComponent, selector: "dl-data-templates", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }], ngImport: i0__namespace, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-template-button\"\n  (click)=\"createDataTemplate()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.templates.new-template.label' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i4__namespace.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9__namespace.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2__namespace.TranslatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplatesComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'dl-data-templates',
                        templateUrl: './data-templates.component.html',
                        styleUrls: ['./data-templates.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$1.RxNotificationService }, { type: i4__namespace$1.RxModalService }, { type: i2__namespace.TranslateService }, { type: i5__namespace.RxRecordInstanceService }]; }, propDecorators: { hostClass: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], grid: [{
                    type: i0.ViewChild,
                    args: ['grid']
                }] } });

    var DataTemplatesRegistrationModule = /** @class */ (function () {
        function DataTemplatesRegistrationModule(componentFactoryResolver, rxViewComponentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            rxViewComponentRegistryService.register({
                type: 'dl-dataload-data-templates',
                componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataTemplatesComponent),
                name: 'Data templates',
                isPageComponent: true,
                availableInBundles: [i2$1.RX_APPLICATION.dataloadBundleId]
            });
        }
        return DataTemplatesRegistrationModule;
    }());
    DataTemplatesRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplatesRegistrationModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i1__namespace$2.RxViewComponentRegistryService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DataTemplatesRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplatesRegistrationModule, declarations: [DataTemplatesComponent, DataTemplateEditorComponent], imports: [i4.AdaptButtonModule,
            i1.CommonModule,
            i6.FormsModule,
            i2.TranslateModule,
            i9.RecordGridModule,
            i4.AdaptRxSelectModule,
            i6.ReactiveFormsModule,
            i4.AdaptRxTextfieldModule,
            i4.AdaptRxRadiobuttonModule,
            i4.AdaptRxUploaderModule,
            i4.AdaptRxTextareaModule,
            i4$1.RxBusyIndicatorModule] });
    DataTemplatesRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplatesRegistrationModule, imports: [[
                i4.AdaptButtonModule,
                i1.CommonModule,
                i6.FormsModule,
                i2.TranslateModule,
                i9.RecordGridModule,
                i4.AdaptRxSelectModule,
                i6.ReactiveFormsModule,
                i4.AdaptRxTextfieldModule,
                i4.AdaptRxRadiobuttonModule,
                i4.AdaptRxUploaderModule,
                i4.AdaptRxTextareaModule,
                i4$1.RxBusyIndicatorModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataTemplatesRegistrationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [DataTemplatesComponent, DataTemplateEditorComponent],
                        imports: [
                            i4.AdaptButtonModule,
                            i1.CommonModule,
                            i6.FormsModule,
                            i2.TranslateModule,
                            i9.RecordGridModule,
                            i4.AdaptRxSelectModule,
                            i6.ReactiveFormsModule,
                            i4.AdaptRxTextfieldModule,
                            i4.AdaptRxRadiobuttonModule,
                            i4.AdaptRxUploaderModule,
                            i4.AdaptRxTextareaModule,
                            i4$1.RxBusyIndicatorModule
                        ],
                        entryComponents: [DataTemplatesComponent]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i1__namespace$2.RxViewComponentRegistryService }]; } });

    var DataloadModule = /** @class */ (function () {
        function DataloadModule() {
        }
        return DataloadModule;
    }());
    DataloadModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataloadModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DataloadModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataloadModule, imports: [DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule] });
    DataloadModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataloadModule, providers: [], imports: [[DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: DataloadModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule],
                        providers: [],
                        declarations: []
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DataImportComponent = DataImportComponent;
    exports.DataImportRegistrationModule = DataImportRegistrationModule;
    exports.DataloadModule = DataloadModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-dataload-components.umd.js.map
