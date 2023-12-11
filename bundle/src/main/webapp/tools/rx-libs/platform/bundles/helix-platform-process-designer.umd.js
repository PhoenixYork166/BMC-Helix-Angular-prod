(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ngx-translate/core'), require('lodash'), require('@bmc-ux/adapt-angular'), require('@helix/platform/ui-kit'), require('@helix/platform/shared/api'), require('@helix/platform/shared/components'), require('@helix/platform/process/elements'), require('@helix/platform/process/server-actions'), require('rxjs'), require('rxjs/operators'), require('@helix/platform/utils'), require('@helix/platform/process/api'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/process/designer', ['exports', '@angular/core', '@angular/common', '@ngx-translate/core', 'lodash', '@bmc-ux/adapt-angular', '@helix/platform/ui-kit', '@helix/platform/shared/api', '@helix/platform/shared/components', '@helix/platform/process/elements', '@helix/platform/process/server-actions', 'rxjs', 'rxjs/operators', '@helix/platform/utils', '@helix/platform/process/api', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.process = global.helix.platform.process || {}, global.helix.platform.process.designer = {}), global.ng.core, global.ng.common, global.ngxTranslateCore, global.lodash, global.i8, global.helix.platform["ui-kit"], global.helix.platform.shared.api, global.helix.platform.shared.components, global.helix.platform.process.elements, global.helix.platform.process["server-actions"], global.rxjs, global.rxjs.operators, global.helix.platform.utils, global.helix.platform.process.api, global.ng.router));
})(this, (function (exports, i0, i10, i6, lodash, i8, i9, i1, i7, i5, serverActions, rxjs, operators, i2, i3, i1$1) { 'use strict';

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
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
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

    var RxProcessDesignerGraph = /** @class */ (function (_super) {
        __extends(RxProcessDesignerGraph, _super);
        function RxProcessDesignerGraph(config) {
            var _this = _super.call(this, config.options) || this;
            _this.rxEndEventService = config.injector.get(i5.RxEndEventService);
            _this.rxIdService = config.injector.get(i2.RxIdService);
            _this.rxJsonParserService = config.injector.get(i2.RxJsonParserService);
            _this.rxProcessElementRegistryService = config.injector.get(i3.RxProcessElementRegistryService);
            _this.rxProcessElementSearchService = config.injector.get(i3.RxProcessElementSearchService);
            _this.rxProcessService = config.injector.get(i5.RxProcessService);
            _this.rxStartEventService = config.injector.get(i5.RxStartEventService);
            return _this;
        }
        // joint.dia.Graph methods
        RxProcessDesignerGraph.prototype.reset = function () {
            this.off('add');
            this.off('change');
            this.clear();
        };
        // Custom methods
        RxProcessDesignerGraph.prototype.addDefaultElements = function (definitionModel) {
            this.addCell(this.rxProcessService.getShape({
                definitionModel: definitionModel,
                id: this.get('processId')
            }));
            var isGraphEmpty = lodash.chain(this.getCells())
                .reject({ id: this.get('processId') })
                .isEmpty()
                .value();
            if (isGraphEmpty) {
                var elementSize = 30;
                this.addCells([
                    this.rxStartEventService.getShape({
                        position: {
                            x: elementSize,
                            y: (i7.RX_DESIGNER_CANVAS.paperOptions.height - elementSize) / 2
                        }
                    }),
                    this.rxEndEventService.getShape({
                        position: {
                            x: i7.RX_DESIGNER_CANVAS.paperOptions.width - 2 * elementSize,
                            y: (i7.RX_DESIGNER_CANVAS.paperOptions.height - elementSize) / 2
                        }
                    })
                ]);
            }
        };
        // TODO-VS: update when element shapes logic is implemented
        RxProcessDesignerGraph.prototype.getDefinitionFromGraph = function () {
            return Object.assign(Object.assign({}, this.getDefinitionBase(this.getCell(this.get('processId')))), { flowElements: this.getFlowElements(this.getCells()), layout: this.getLayout(this.get('cells').models) });
        };
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.loadGraphFromDefinition = function (definition) {
            return this.fromJSON(this.getJsonObject(definition));
        };
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.getDefinitionBase = function (processCell) {
            return this.rxProcessService.getDefinitionFromModel(processCell.prop('definitionModel'));
        };
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.getFlowElements = function (cells) {
            var _this = this;
            return lodash.chain(cells)
                .reject({ id: this.get('processId') })
                .map(function (cell) {
                var elementModel = cell.prop('elementModel');
                var elementService = _this.rxProcessElementRegistryService.get(elementModel.type).elementService;
                return elementService.getDefinitionFromModel(elementModel);
            })
                .value();
        };
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.getJsonObject = function (definition) {
            var _this = this;
            var jsonObject = this.rxJsonParserService.tryParseJson(definition.layout, { cells: [] });
            jsonObject.cells.forEach(function (cell) {
                var embeddedElementIds = lodash.chain(jsonObject.cells).filter({ parent: cell.id }).map('id').value();
                if (embeddedElementIds.length) {
                    cell.embeds = embeddedElementIds;
                }
                cell.ownerProcessDefinitionName = definition.lastUpdateTime ? definition.name : definition.guid;
                var flowElement = _this.rxProcessElementSearchService.findByGuid(definition, _this.rxIdService.get(cell.id));
                var elementService = _this.rxProcessElementRegistryService.get(cell.type).elementService;
                cell.elementModel = elementService.getModelFromDefinition(flowElement);
            });
            return jsonObject;
        };
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.getLayout = function (models) {
            var _this = this;
            var cells = lodash.chain(models)
                .reject({ id: this.get('processId') })
                .map(function (cell) {
                if (lodash.isFunction(cell.getLayout)) {
                    return _this.adaptCell(cell.getLayout());
                }
            })
                .value();
            return cells.length ? JSON.stringify({ cells: cells }) : null;
        };
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.adaptCell = function (cell) {
            return this.removeRedundantProperties(cell);
        };
        // remove properties from the process and sub-process layouts
        // that are set programmatically and don't have to be persisted
        // TODO-VS: update types
        RxProcessDesignerGraph.prototype.removeRedundantProperties = function (cell) {
            var attrs;
            if (lodash.has(cell, 'attrs[".label"]')) {
                attrs = {
                    '.label': lodash.clone(cell.attrs['.label'])
                };
            }
            // list of properties that must be kept in the layout, all others will be set programmatically
            var adaptedCell = lodash.pick(cell, [
                'collapsedSize',
                'content',
                'expanded',
                'flowType',
                'id',
                'labels',
                'parent',
                'position',
                'size',
                'source',
                'target',
                'type',
                'vertices',
                'z'
            ]);
            if (attrs) {
                adaptedCell.attrs = attrs;
            }
            return adaptedCell;
        };
        return RxProcessDesignerGraph;
    }(joint.dia.Graph));

    var RxProcessDesignerService = /** @class */ (function () {
        function RxProcessDesignerService(rxActionTypeUtilsService, rxBundleCacheService, rxDesignerCacheService, rxGlobalCacheService, rxProcessDefinitionService, rxProcessElementRegistryService) {
            this.rxActionTypeUtilsService = rxActionTypeUtilsService;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxDesignerCacheService = rxDesignerCacheService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxProcessDefinitionService = rxProcessDefinitionService;
            this.rxProcessElementRegistryService = rxProcessElementRegistryService;
        }
        RxProcessDesignerService.prototype.buildPalette = function (actionTypes, bundleDescriptors) {
            var _this = this;
            var registeredElementNodes = lodash.reduce(this.rxProcessElementRegistryService.getAll(), function (nodes, registeredElement) {
                if (registeredElement.displayName) {
                    nodes.push({
                        group: registeredElement.group,
                        label: registeredElement.displayName,
                        paletteItem: registeredElement.paletteItem,
                        value: {
                            actionTypeName: _this.rxProcessDefinitionService.getServerActionTypeName(registeredElement.type),
                            resourceType: registeredElement.resourceType,
                            type: registeredElement.type
                        }
                    });
                }
                return nodes;
            }, []);
            var serverActionNodes = lodash.reduce(actionTypes, function (nodes, actionType) {
                var isActionRegistered = lodash.some(registeredElementNodes, function (registeredElementNode) { return registeredElementNode.value.actionTypeName === actionType.actionTypeName; });
                if (!isActionRegistered) {
                    nodes.push({
                        group: _this.rxActionTypeUtilsService.getActionTypeBundleFriendlyName(bundleDescriptors, actionType) ||
                            i3.RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
                        label: actionType.displayName || _this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName),
                        paletteItem: {
                            border: i1.RX_DESIGNER.paletteItemBorder.solid,
                            icon: {
                                path: actionType.isDeprecated
                                    ? i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.info
                                    : i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                                position: i1.RX_DESIGNER.paletteIconPosition.top
                            },
                            label: i1.RX_DESIGNER.paletteItemLabel.inner,
                            shape: i1.RX_DESIGNER.paletteItemShape.rectangle
                        },
                        value: {
                            actionTypeName: actionType.actionTypeName,
                            resourceType: i3.RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                            type: _this.rxProcessDefinitionService.getServerActionModelType(actionType.actionTypeName)
                        }
                    });
                }
                return nodes;
            }, []);
            return lodash.chain(__spreadArray(__spreadArray([], __read(registeredElementNodes)), __read(serverActionNodes)))
                .sortBy('label')
                .reduce(function (tree, element) {
                var group = lodash.find(tree, { label: element.group });
                if (group) {
                    group.children.push(element);
                }
                else {
                    tree.push({
                        label: element.group,
                        children: [element]
                    });
                }
                return tree;
            }, [])
                .sortBy('label')
                .sortBy(function (node) {
                var _a;
                var group = lodash.find(i3.RX_PROCESS_DEFINITION.processElementGroups, { name: node.label });
                return (_a = group === null || group === void 0 ? void 0 : group.priority) !== null && _a !== void 0 ? _a : i3.RX_PROCESS_DEFINITION.standardProcessElementGroups.default.priority;
            })
                .value();
        };
        return RxProcessDesignerService;
    }());
    RxProcessDesignerService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDesignerService, deps: [{ token: i1__namespace.RxActionTypeUtilsService }, { token: i1__namespace.RxBundleCacheService }, { token: i1__namespace.RxDesignerCacheService }, { token: i1__namespace.RxGlobalCacheService }, { token: i3__namespace.RxProcessDefinitionService }, { token: i3__namespace.RxProcessElementRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessDesignerService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDesignerService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessDesignerService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxActionTypeUtilsService }, { type: i1__namespace.RxBundleCacheService }, { type: i1__namespace.RxDesignerCacheService }, { type: i1__namespace.RxGlobalCacheService }, { type: i3__namespace.RxProcessDefinitionService }, { type: i3__namespace.RxProcessElementRegistryService }]; } });

    var ProcessDesignerComponent = /** @class */ (function () {
        function ProcessDesignerComponent(injector, rxBundleCacheService, rxCommandManagerService, rxDesignerCacheService, rxGlobalCacheService, rxGuidService, rxIdService, rxOverlayService, rxProcessDataDictionaryService, rxProcessDefinitionService, rxProcessDesignerService, rxProcessElementRegistryService, rxProcessElementSearchService, rxProcessService, translateService) {
            var _this = this;
            this.injector = injector;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxCommandManagerService = rxCommandManagerService;
            this.rxDesignerCacheService = rxDesignerCacheService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxGuidService = rxGuidService;
            this.rxIdService = rxIdService;
            this.rxOverlayService = rxOverlayService;
            this.rxProcessDataDictionaryService = rxProcessDataDictionaryService;
            this.rxProcessDefinitionService = rxProcessDefinitionService;
            this.rxProcessDesignerService = rxProcessDesignerService;
            this.rxProcessElementRegistryService = rxProcessElementRegistryService;
            this.rxProcessElementSearchService = rxProcessElementSearchService;
            this.rxProcessService = rxProcessService;
            this.translateService = translateService;
            this.closeDesigner = new i0.EventEmitter();
            this.definitionErrorLoading = new i0.EventEmitter();
            this.definitionSaved = new i0.EventEmitter();
            this.bundleIdSubject = new rxjs.BehaviorSubject(null);
            this.definitionModelChangeSubject = new rxjs.Subject();
            this.selectedElementModelChangeSubject = new rxjs.Subject();
            this.definitionNameSubject = new rxjs.BehaviorSubject(null);
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.focusDefinitionInspectorSubject = new rxjs.BehaviorSubject(null);
            this.focusSelectedElementInspectorSubject = new rxjs.BehaviorSubject(null);
            this.graph = new RxProcessDesignerGraph({
                injector: this.injector,
                options: {
                    processId: this.rxGuidService.generate()
                }
            });
            this.graphChangeSubject = new rxjs.Subject();
            this.graphChange$ = this.graphChangeSubject.pipe(operators.shareReplay(1));
            this.isDesignModeSubject = new rxjs.BehaviorSubject(true);
            this.selectedElementGuidSubject = new rxjs.BehaviorSubject(null);
            this.selectedElementGuid$ = this.selectedElementGuidSubject.pipe(operators.distinctUntilChanged(lodash.isEqual), operators.shareReplay(1));
            this.paletteElementsTree$ = rxjs.forkJoin([
                this.rxBundleCacheService.getActionTypes(),
                this.rxGlobalCacheService.getBundleDescriptors(),
                this.rxGlobalCacheService.getFunctionDescriptors()
            ]).pipe(operators.tap(function (_b) {
                var _c = __read(_b, 3), actionTypes = _c[0], bundleDescriptors = _c[1], functionDescriptors = _c[2];
                _this.rxDesignerCacheService.setActionTypes(actionTypes);
                _this.rxDesignerCacheService.setFunctionDescriptors(functionDescriptors);
            }), operators.map(function (_b) {
                var _c = __read(_b, 2), actionTypes = _c[0], bundleDescriptors = _c[1];
                return _this.rxProcessDesignerService.buildPalette(actionTypes, bundleDescriptors);
            }), operators.shareReplay(1));
            this.definition$ = rxjs.combineLatest([this.definitionNameSubject, this.paletteElementsTree$]).pipe(operators.switchMap(function (_b) {
                var _c = __read(_b, 1), definitionName = _c[0];
                return definitionName ? _this.rxProcessDefinitionService.get(definitionName) : _this.rxProcessDefinitionService.getNew();
            }), operators.shareReplay(1));
            this.isReadOnly$ = rxjs.combineLatest([
                this.definition$,
                this.bundleIdSubject.pipe(operators.switchMap(function (bundleId) { return _this.rxOverlayService.areNewDefinitionsAllowed(bundleId); }))
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), definition = _c[0], areNewDefinitionsAllowed = _c[1];
                return !areNewDefinitionsAllowed || !_this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition);
            }), operators.distinctUntilChanged(), operators.shareReplay(1));
            this.definitionModelFromDefinition$ = this.definition$.pipe(operators.map(function (definition) { return _this.rxProcessService.getModelFromDefinition(definition, _this.configuration.bundleId); }));
            this.graph$ = rxjs.combineLatest([this.definition$, this.definitionModelFromDefinition$, this.isReadOnly$]).pipe(operators.tap(function (_b) {
                var _c = __read(_b, 3), definition = _c[0], definitionModelFromDefinition = _c[1], isReadOnly = _c[2];
                if (!isReadOnly) {
                    _this.graph.on('add', function (element, elements, options) {
                        _this.graphChangeSubject.next(_this.graph);
                    });
                    _this.graph.on('change', function (element, elementModel, changedProperty) {
                        if (!element.changed.position) {
                            _this.graphChangeSubject.next(_this.graph);
                        }
                    });
                }
                _this.graph.loadGraphFromDefinition(definition);
                _this.graph.addDefaultElements(definitionModelFromDefinition);
            }), operators.map(function () { return _this.graph; }), operators.shareReplay(1));
            this.definitionModelFromGraph$ = this.graphChange$.pipe(operators.map(function (graph) { return graph.getCell(graph.get('processId')).prop('definitionModel'); }), operators.distinctUntilChanged(lodash.isEqual));
            this.definitionModel$ = rxjs.merge(this.definitionModelFromDefinition$, this.definitionModelFromGraph$).pipe(operators.shareReplay(1));
            this.definitionInspectorConfig$ = this.definitionModel$.pipe(operators.map(function (definitionModel) { return _this.rxProcessService.getInspectorConfig(definitionModel); }));
            this.selectedElementModelFromDefinition$ = rxjs.combineLatest([this.definition$, this.selectedElementGuid$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), definition = _c[0], selectedElementGuid = _c[1];
                var selectedElementModel = null;
                if (selectedElementGuid) {
                    var flowElement = _this.rxProcessElementSearchService.find(definition, {
                        guid: selectedElementGuid
                    });
                    if (flowElement) {
                        var selectedElement = lodash.find(JSON.parse(definition.layout).cells, {
                            id: _this.rxIdService.getBase(selectedElementGuid)
                        });
                        var elementService = _this.rxProcessElementRegistryService.get(selectedElement.type).elementService;
                        selectedElementModel = elementService.getModelFromDefinition(flowElement);
                    }
                }
                return selectedElementModel;
            }));
            this.selectedElementModelFromGraph$ = rxjs.combineLatest([this.graphChange$, this.selectedElementGuid$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), graph = _c[0], selectedElementGuid = _c[1];
                var selectedElementModel = null;
                if (selectedElementGuid) {
                    var selectedElementCell = graph.getCell(_this.rxIdService.getBase(selectedElementGuid));
                    selectedElementModel = selectedElementCell.prop('elementModel');
                }
                return selectedElementModel;
            }));
            this.selectedElementModel$ = rxjs.merge(this.selectedElementModelFromDefinition$, this.selectedElementModelFromGraph$).pipe(operators.tap(function (selectedElementModel) {
                var _a;
                if ((_a = _this.inspectorSidebar) === null || _a === void 0 ? void 0 : _a.isPanelOpened) {
                    if (lodash.isEmpty(selectedElementModel)) {
                        _this.openInspectorSidebarPanel(0);
                    }
                    else {
                        _this.openInspectorSidebarPanel(1);
                    }
                }
            }), operators.shareReplay(1));
            this.selectedElementInspectorConfig$ = rxjs.combineLatest([this.selectedElementModel$, this.definitionModel$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), selectedElementModel = _c[0], definitionModel = _c[1];
                var selectedElementInspectorConfig = null;
                if (selectedElementModel) {
                    var elementService = _this.rxProcessElementRegistryService.get(selectedElementModel.type).elementService;
                    selectedElementInspectorConfig = elementService.getInspectorConfig(selectedElementModel, {
                        processDefinitionModel: definitionModel
                    });
                }
                return selectedElementInspectorConfig;
            }));
            this.definitionForCodeViewer$ = this.isDesignModeSubject.pipe(operators.switchMap(function (isDesignMode) {
                return isDesignMode
                    ? rxjs.of(null)
                    : _this.graph$.pipe(operators.take(1), operators.map(function (graph) { return graph.getDefinitionFromGraph(); }));
            }));
            this.bundleFriendlyName$ = this.bundleIdSubject.pipe(operators.switchMap(function (bundleId) { return _this.rxGlobalCacheService.getBundleFriendlyName(bundleId); }));
            // TODO-VS: update canvas configuration (interactive property)
            this.canvasConfiguration$ = this.isReadOnly$.pipe(operators.map(function (isReadOnly) {
                return {
                    elementRegistry: _this.rxProcessElementRegistryService,
                    enableMultiSelection: true,
                    interactive: !isReadOnly,
                    isReadOnly: isReadOnly,
                    showToolbar: true
                };
            }));
            this.breadcrumbItems$ = rxjs.combineLatest([this.definitionModel$, this.selectedElementModel$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), definitionModel = _c[0], selectedElementModel = _c[1];
                var breadcrumbItems = [
                    {
                        label: definitionModel.name ||
                            "<" + _this.translateService.instant('com.bmc.arsys.rx.client.process-designer.new-process.label') + ">",
                        data: {}
                    }
                ];
                if (selectedElementModel) {
                    breadcrumbItems.push({
                        label: selectedElementModel.label,
                        data: {}
                    });
                }
                return breadcrumbItems;
            }));
            this.elementValidationIssueSections$ = this.graphChange$.pipe(operators.switchMap(function (graph) {
                var cells = lodash.reject(graph.getCells(), { id: graph.get('processId') });
                return rxjs.forkJoin(cells.map(function (cell) {
                    var elementModel = cell.prop('elementModel');
                    var cellType = cell.prop('type');
                    var elementRegistry = _this.rxProcessElementRegistryService.get(cellType);
                    return elementRegistry.elementService.validate(elementModel, lodash.reject(cells, { id: elementModel.id })).pipe(operators.map(function (elementValidationIssues) { return ({
                        title: cell.prop('elementModel').label || _this.translateService.instant(elementRegistry.displayName),
                        issues: elementValidationIssues
                    }); }));
                }));
            }));
            this.processValidationIssueSection$ = this.graphChange$.pipe(operators.switchMap(function (graph) {
                var processCell = graph.getCell(graph.get('processId'));
                return _this.rxProcessService.validate(processCell.prop('definitionModel'), lodash.reject(graph.getCells(), { id: processCell.id }));
            }), operators.map(function (processValidationIssues) { return ({
                title: _this.translateService.instant('com.bmc.arsys.rx.client.process-definition.label'),
                issues: processValidationIssues
            }); }));
            this.validationIssueSections$ = rxjs.combineLatest([
                this.processValidationIssueSection$,
                this.elementValidationIssueSections$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), processValidationIssueSection = _c[0], elementValidationIssueSections = _c[1];
                var validationIssueSections = [];
                if (!lodash.isEmpty(processValidationIssueSection.issues)) {
                    validationIssueSections.push(processValidationIssueSection);
                }
                elementValidationIssueSections.forEach(function (elementValidationIssueSection) {
                    if (!lodash.isEmpty(elementValidationIssueSection.issues)) {
                        validationIssueSections.push(elementValidationIssueSection);
                    }
                });
                return validationIssueSections;
            }), operators.shareReplay(1));
            this.hasValidationErrors$ = this.validationIssueSections$.pipe(operators.map(function (sections) { return lodash.some(sections, function (section) { return lodash.find(section.issues, { type: i9.ValidationIssueType.Error }); }); }), operators.distinctUntilChanged(), operators.shareReplay(1));
            // TODO-VS: update the logic to rely on command manager
            this.isSaveButtonDisabled$ = rxjs.combineLatest([this.hasValidationErrors$, this.isReadOnly$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), hasValidationErrors = _c[0], isReadOnly = _c[1];
                return hasValidationErrors || isReadOnly;
            }), operators.startWith(true));
            this.selectedElementInspectorDesignerItemModel$ = rxjs.combineLatest([this.selectedElementModel$, this.graph$]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), selectedElementModel = _c[0], graph = _c[1];
                return ({
                    elementModel: selectedElementModel,
                    graph: graph
                });
            }));
            this.focusDefinitionInspector$ = this.focusDefinitionInspectorSubject.asObservable();
            this.focusSelectedElementInspector$ = this.focusSelectedElementInspectorSubject.asObservable();
            this.vm$ = rxjs.combineLatest([
                this.breadcrumbItems$,
                this.bundleFriendlyName$,
                this.canvasConfiguration$,
                this.definitionForCodeViewer$,
                this.definitionInspectorConfig$,
                this.definitionModel$,
                this.graph$,
                this.hasValidationErrors$,
                this.isReadOnly$,
                this.isSaveButtonDisabled$,
                this.paletteElementsTree$,
                this.selectedElementInspectorConfig$,
                this.selectedElementModel$,
                this.validationIssueSections$
            ]).pipe(operators.map(function (_b) {
                var _c = __read(_b, 14), breadcrumbItems = _c[0], bundleFriendlyName = _c[1], canvasConfiguration = _c[2], definitionForCodeViewer = _c[3], definitionInspectorConfig = _c[4], definitionModel = _c[5], graph = _c[6], hasValidationErrors = _c[7], isReadOnly = _c[8], isSaveButtonDisabled = _c[9], paletteElementsTree = _c[10], selectedElementInspectorConfig = _c[11], selectedElementModel = _c[12], validationIssueSections = _c[13];
                return ({
                    breadcrumbItems: breadcrumbItems,
                    bundleFriendlyName: bundleFriendlyName,
                    canvasConfiguration: canvasConfiguration,
                    definitionForCodeViewer: definitionForCodeViewer,
                    definitionInspectorConfig: definitionInspectorConfig,
                    definitionModel: definitionModel,
                    graph: graph,
                    hasValidationErrors: hasValidationErrors,
                    isReadOnly: isReadOnly,
                    isSaveButtonDisabled: isSaveButtonDisabled,
                    paletteElementsTree: paletteElementsTree,
                    selectedElementInspectorConfig: selectedElementInspectorConfig,
                    selectedElementModel: selectedElementModel,
                    validationIssueSections: validationIssueSections
                });
            }));
        }
        ProcessDesignerComponent.prototype.ngOnInit = function () {
            var _this = this;
            // TODO-VS: update logic not to debounce model change here
            this.definitionModelChangeSubject
                .pipe(operators.debounceTime(300), operators.withLatestFrom(this.graph$), operators.takeUntil(this.destroyed$))
                .subscribe(function (_b) {
                var _c = __read(_b, 2), definitionModel = _c[0], graph = _c[1];
                var processCell = graph.getCell(graph.get('processId'));
                var commandManager = _this.rxCommandManagerService.get();
                commandManager.initBatchCommand();
                lodash.forEach(definitionModel, function (propertyValue, propertyName) {
                    processCell.prop("definitionModel/" + propertyName, propertyValue);
                });
                commandManager.storeBatchCommand();
            });
            // TODO-VS: update logic not to debounce model change here
            this.selectedElementModelChangeSubject
                .pipe(operators.debounceTime(300), operators.withLatestFrom(this.graph$), operators.takeUntil(this.destroyed$))
                .subscribe(function (_b) {
                var _c = __read(_b, 2), selectedElementModel = _c[0], graph = _c[1];
                var selectedElementCell = graph.getCell(_this.rxIdService.getBase(selectedElementModel.guid));
                var commandManager = _this.rxCommandManagerService.get();
                commandManager.initBatchCommand();
                lodash.forEach(selectedElementModel, function (propertyValue, propertyName) {
                    selectedElementCell.prop("elementModel/" + propertyName, propertyValue);
                });
                commandManager.storeBatchCommand();
            });
        };
        ProcessDesignerComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue.definitionName) {
                this.graph.reset();
                this.rxProcessDataDictionaryService.clear();
                this.isDesignModeSubject.next(true);
                this.definitionNameSubject.next(changes.configuration.currentValue.definitionName);
            }
            if (changes.configuration.currentValue.bundleId) {
                this.bundleIdSubject.next(changes.configuration.currentValue.bundleId);
            }
        };
        ProcessDesignerComponent.prototype.ngOnDestroy = function () {
            this.rxProcessDataDictionaryService.clear();
            this.bundleIdSubject.complete();
            this.definitionModelChangeSubject.complete();
            this.definitionNameSubject.complete();
            this.focusDefinitionInspectorSubject.complete();
            this.focusSelectedElementInspectorSubject.complete();
            this.graphChangeSubject.complete();
            this.isDesignModeSubject.complete();
            this.selectedElementGuidSubject.complete();
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        ProcessDesignerComponent.prototype.canDeactivate = function () {
            return true;
        };
        ProcessDesignerComponent.prototype.onBreadcrumbSelected = function (guid) {
            if (guid) {
                this.openInspectorSidebarPanel(1);
            }
            else {
                this.openInspectorSidebarPanel(0);
            }
        };
        ProcessDesignerComponent.prototype.onCanvasElementSelected = function (guid) {
            if (!guid) {
                this.openInspectorSidebarPanel(0);
            }
            this.selectedElementGuidSubject.next(guid);
        };
        ProcessDesignerComponent.prototype.onCorrectIssue = function (validationIssue) {
            var _this = this;
            this.openInspectorSidebarPanel(validationIssue.data.inspectorTabIndex);
            if (validationIssue.data.inspectorTabIndex === 0) {
                setTimeout(function () { return _this.focusDefinitionInspectorSubject.next({
                    editorName: validationIssue.data.propertyName,
                    data: validationIssue.data
                }); }, 10);
            }
            else if (validationIssue.data.inspectorTabIndex === 1) {
                this.selectedElementGuidSubject.next(validationIssue.data.guid);
                setTimeout(function () { return _this.focusSelectedElementInspectorSubject.next({
                    editorName: validationIssue.data.propertyName,
                    data: validationIssue.data
                }); }, 10);
            }
        };
        ProcessDesignerComponent.prototype.onDefinitionInspectorInitialized = function () {
            this.focusDefinitionInspectorSubject.next({
                editorName: 'name',
                data: {}
            });
        };
        ProcessDesignerComponent.prototype.onDefinitionModelChange = function (definitionModel) {
            this.definitionModelChangeSubject.next(definitionModel);
        };
        // TODO-VS: update types
        ProcessDesignerComponent.prototype.onPaletteElementDropped = function (dropData) {
            this.droppedElement = dropData;
        };
        ProcessDesignerComponent.prototype.onSelectedElementModelChange = function (selectedElementModel) {
            this.selectedElementModelChangeSubject.next(selectedElementModel);
        };
        ProcessDesignerComponent.prototype.saveDefinition = function () {
            this.graph$
                .pipe(operators.take(1), operators.map(function (graph) { return graph.getDefinitionFromGraph(); }))
                .subscribe();
        };
        ProcessDesignerComponent.prototype.toggleDesignMode = function () {
            this.isDesignModeSubject.next(!this.isDesignModeSubject.value);
        };
        ProcessDesignerComponent.prototype.openInspectorSidebarPanel = function (id) {
            this.inspectorSidebar.openPanel(id);
        };
        return ProcessDesignerComponent;
    }());
    ProcessDesignerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerComponent, deps: [{ token: i0__namespace.Injector }, { token: i1__namespace.RxBundleCacheService }, { token: i1__namespace.RxCommandManagerService }, { token: i1__namespace.RxDesignerCacheService }, { token: i1__namespace.RxGlobalCacheService }, { token: i2__namespace.RxGuidService }, { token: i2__namespace.RxIdService }, { token: i1__namespace.RxOverlayService }, { token: i3__namespace.RxProcessDataDictionaryService }, { token: i3__namespace.RxProcessDefinitionService }, { token: RxProcessDesignerService }, { token: i3__namespace.RxProcessElementRegistryService }, { token: i3__namespace.RxProcessElementSearchService }, { token: i5__namespace.RxProcessService }, { token: i6__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ProcessDesignerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerComponent, selector: "rx-process-designer", inputs: { configuration: "configuration" }, outputs: { closeDesigner: "closeDesigner", definitionErrorLoading: "definitionErrorLoading", definitionSaved: "definitionSaved" }, viewQueries: [{ propertyName: "inspectorSidebar", first: true, predicate: ["inspectorSidebar"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected($event.data.guid)\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    (save)=\"saveDefinition()\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForCodeViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\" #inspectorSidebar>\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.process-properties.title' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.process-properties.title' | translate }}\"\n        iconClass=\"d-icon-pencil\"\n      >\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [model]=\"vm.definitionModel\"\n          [focusEditor$]=\"focusDefinitionInspector$\"\n          (formInitialized)=\"onDefinitionInspectorInitialized()\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          (modelChange)=\"onDefinitionModelChange($event)\"\n        ></rx-form-builder>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.element-properties.title' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.process-designer.inspector.element-properties.title' | translate }}\"\n        iconClass=\"d-icon-gear\"\n      >\n        <rx-form-builder\n          *ngIf=\"vm.selectedElementInspectorConfig; else missingElementAlert\"\n          rxInspector\n          [config]=\"vm.selectedElementInspectorConfig\"\n          [model]=\"vm.selectedElementModel\"\n          [designerItemModel]=\"selectedElementInspectorDesignerItemModel$\"\n          [focusEditor$]=\"focusSelectedElementInspector$\"\n          [isReadOnly]=\"vm.isReadOnly\"\n          (modelChange)=\"onSelectedElementModelChange($event)\"\n        ></rx-form-builder>\n\n        <ng-template #missingElementAlert>\n          <adapt-alert\n            class=\"p-3 definition-valid-message\"\n            [config]=\"{\n              content: 'com.bmc.arsys.rx.client.process-designer.inspector.missing-element.label' | translate,\n              variant: 'info',\n              type: 'inline'\n            }\"\n          ></adapt-alert>\n        </ng-template>\n      </adapt-sidebar-item>\n\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [issueSections]=\"vm.validationIssueSections\"\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.process-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main\">\n        <!-- TODO-VS: remove blade in favour of adapt sidebar -->\n        <rx-blade [title]=\"'Palette'\" rx-id=\"palette\" [isExpanded]=\"true\">\n          <rx-designer-palette\n            [tree]=\"vm.paletteElementsTree\"\n            (elementDropped)=\"onPaletteElementDropped($event)\"\n          ></rx-designer-palette>\n        </rx-blade>\n\n        <rx-designer-canvas\n          [configuration]=\"vm.canvasConfiguration\"\n          [graph]=\"vm.graph\"\n          [droppedElement]=\"droppedElement\"\n          (elementSelected)=\"onCanvasElementSelected($event)\"\n        ></rx-designer-canvas>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForCodeViewer\"\n    class=\"full-size\"\n    theme=\"light\"\n    lang=\"javascript\"\n    [hasToolbar]=\"false\"\n    [code]=\"vm.definitionForCodeViewer | json\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}:host ::ng-deep rx-blade .content{z-index:100}:host ::ng-deep .adapt-sidebar-main{padding:0}:host ::ng-deep .adapt-sidebar-main .main{height:100%}:host ::ng-deep adapt-sidebar .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-accordion-tab>.card:first-child{border:0}:host ::ng-deep .joint-element .body{stroke:#626668}:host ::ng-deep .joint-element polygon{stroke-width:2}:host ::ng-deep .joint-element path{stroke:#626668}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-component rx-designer-canvas{position:absolute;top:0;right:0;bottom:0;left:0}\n"], components: [{ type: i7__namespace.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i8__namespace.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i8__namespace.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i7__namespace.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i8__namespace.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i9__namespace.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i9__namespace.RxBladeComponent, selector: "rx-blade", inputs: ["title", "isExpanded", "dockTo"], outputs: ["toggle"] }, { type: i7__namespace.RxDesignerPaletteComponent, selector: "rx-designer-palette", inputs: ["tree"], outputs: ["elementDropped"] }, { type: i7__namespace.RxDesignerCanvasComponent, selector: "rx-designer-canvas", inputs: ["configuration", "graph", "droppedElement"], outputs: ["elementSelected"] }, { type: i8__namespace.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i10__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7__namespace.InspectorDirective, selector: "[rxInspector]", inputs: ["designerItemModel"] }], pipes: { "async": i10__namespace.AsyncPipe, "translate": i6__namespace.TranslatePipe, "json": i10__namespace.JsonPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-process-designer',
                        templateUrl: './process-designer.component.html',
                        styleUrls: ['./process-designer.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i1__namespace.RxBundleCacheService }, { type: i1__namespace.RxCommandManagerService }, { type: i1__namespace.RxDesignerCacheService }, { type: i1__namespace.RxGlobalCacheService }, { type: i2__namespace.RxGuidService }, { type: i2__namespace.RxIdService }, { type: i1__namespace.RxOverlayService }, { type: i3__namespace.RxProcessDataDictionaryService }, { type: i3__namespace.RxProcessDefinitionService }, { type: RxProcessDesignerService }, { type: i3__namespace.RxProcessElementRegistryService }, { type: i3__namespace.RxProcessElementSearchService }, { type: i5__namespace.RxProcessService }, { type: i6__namespace.TranslateService }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], closeDesigner: [{
                    type: i0.Output
                }], definitionErrorLoading: [{
                    type: i0.Output
                }], definitionSaved: [{
                    type: i0.Output
                }], inspectorSidebar: [{
                    type: i0.ViewChild,
                    args: ['inspectorSidebar', { static: false }]
                }] } });

    joint.shapes.rx = joint.shapes.rx || {};
    var ProcessDesignerModule = /** @class */ (function () {
        function ProcessDesignerModule() {
            lodash.assign(joint.shapes.bpmn.icons, i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons);
        }
        return ProcessDesignerModule;
    }());
    ProcessDesignerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ProcessDesignerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerModule, declarations: [ProcessDesignerComponent], imports: [i8.AdaptAlertModule,
            i8.AdaptCodeViewerModule,
            i8.AdaptSidebarModule,
            i8.AdaptTabsModule,
            i10.CommonModule,
            i9.RxBladeModule,
            i7.RxDesignerCanvasModule,
            i7.RxDesignerHeaderModule,
            i7.RxDesignerPaletteModule,
            i7.RxFormBuilderModule,
            i7.RxInspectorModule,
            i9.RxJsonViewerModule,
            i5.RxProcessElementsModule,
            serverActions.RxServerActionsModule,
            i9.RxValidationIssuesModule,
            i6.TranslateModule], exports: [ProcessDesignerComponent] });
    ProcessDesignerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerModule, imports: [[
                i8.AdaptAlertModule,
                i8.AdaptCodeViewerModule,
                i8.AdaptSidebarModule,
                i8.AdaptTabsModule,
                i10.CommonModule,
                i9.RxBladeModule,
                i7.RxDesignerCanvasModule,
                i7.RxDesignerHeaderModule,
                i7.RxDesignerPaletteModule,
                i7.RxFormBuilderModule,
                i7.RxInspectorModule,
                i9.RxJsonViewerModule,
                i5.RxProcessElementsModule,
                serverActions.RxServerActionsModule,
                i9.RxValidationIssuesModule,
                i6.TranslateModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ProcessDesignerComponent],
                        imports: [
                            i8.AdaptAlertModule,
                            i8.AdaptCodeViewerModule,
                            i8.AdaptSidebarModule,
                            i8.AdaptTabsModule,
                            i10.CommonModule,
                            i9.RxBladeModule,
                            i7.RxDesignerCanvasModule,
                            i7.RxDesignerHeaderModule,
                            i7.RxDesignerPaletteModule,
                            i7.RxFormBuilderModule,
                            i7.RxInspectorModule,
                            i9.RxJsonViewerModule,
                            i5.RxProcessElementsModule,
                            serverActions.RxServerActionsModule,
                            i9.RxValidationIssuesModule,
                            i6.TranslateModule
                        ],
                        exports: [ProcessDesignerComponent]
                    }]
            }], ctorParameters: function () { return []; } });

    var ProcessDesignerPageComponent = /** @class */ (function () {
        function ProcessDesignerPageComponent(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
            this.activatedRoute = activatedRoute;
            this.router = router;
            this.rxBundleCacheService = rxBundleCacheService;
            this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxPageTitleService = rxPageTitleService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.translateService = translateService;
            this.isInitialized = false;
        }
        ProcessDesignerPageComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.rxComponentCanDeactivateGuard.setPageComponent(this);
            this.subscription = this.activatedRoute.params.subscribe(function (_c) {
                var definitionName = _c.definitionName, bundleId = _c.bundleId;
                _this.rxBundleCacheService.bundleId = bundleId || _this.rxDefinitionNameService.getBundleId(definitionName);
                _this.isInitialized = true;
                _this.isNewProcess = !definitionName;
                _this.rxPageTitleService.set([
                    _this.rxDefinitionNameService.getDisplayName(definitionName),
                    _this.translateService.instant('com.bmc.arsys.rx.client.process-designer.title')
                ]);
                _this.configuration = Object.assign(Object.assign({}, _this.configuration), { bundleId: _this.rxBundleCacheService.bundleId, definitionName: definitionName });
            });
        };
        ProcessDesignerPageComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.rxComponentCanDeactivateGuard.setPageComponent(null);
        };
        ProcessDesignerPageComponent.prototype.canDeactivate = function () {
            var _a, _b;
            return (_b = (_a = this.processDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
        };
        ProcessDesignerPageComponent.prototype.confirmDeactivation = function () {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        };
        ProcessDesignerPageComponent.prototype.onCloseDesigner = function () {
            this.router.navigate([
                i1.RX_APPLICATION.innovationStudioBundleId,
                this.rxBundleCacheService.bundleId,
                'process-definitions'
            ]);
        };
        ProcessDesignerPageComponent.prototype.onDefinitionErrorLoading = function () {
            this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
        };
        ProcessDesignerPageComponent.prototype.onDefinitionSaved = function (processDefinitionName) {
            if (this.isNewProcess) {
                this.router.navigate(['edit2', processDefinitionName], { relativeTo: this.activatedRoute.parent });
            }
        };
        return ProcessDesignerPageComponent;
    }());
    ProcessDesignerPageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerPageComponent, deps: [{ token: i1__namespace$1.ActivatedRoute }, { token: i1__namespace$1.Router }, { token: i1__namespace.RxBundleCacheService }, { token: i1__namespace.RxComponentCanDeactivateGuard }, { token: i1__namespace.RxDefinitionNameService }, { token: i1__namespace.RxPageTitleService }, { token: i9__namespace.RxUtilityModalsService }, { token: i6__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ProcessDesignerPageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerPageComponent, selector: "rx-process-designer-page", viewQueries: [{ propertyName: "processDesignerComponent", first: true, predicate: ProcessDesignerComponent, descendants: true }], ngImport: i0__namespace, template: "<rx-process-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (closeDesigner)=\"onCloseDesigner()\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n></rx-process-designer>\n", components: [{ type: ProcessDesignerComponent, selector: "rx-process-designer", inputs: ["configuration"], outputs: ["closeDesigner", "definitionErrorLoading", "definitionSaved"] }], directives: [{ type: i10__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerPageComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-process-designer-page',
                        templateUrl: './process-designer-page.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ActivatedRoute }, { type: i1__namespace$1.Router }, { type: i1__namespace.RxBundleCacheService }, { type: i1__namespace.RxComponentCanDeactivateGuard }, { type: i1__namespace.RxDefinitionNameService }, { type: i1__namespace.RxPageTitleService }, { type: i9__namespace.RxUtilityModalsService }, { type: i6__namespace.TranslateService }]; }, propDecorators: { processDesignerComponent: [{
                    type: i0.ViewChild,
                    args: [ProcessDesignerComponent]
                }] } });

    var ProcessDesignerPageModule = /** @class */ (function () {
        function ProcessDesignerPageModule() {
        }
        return ProcessDesignerPageModule;
    }());
    ProcessDesignerPageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerPageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ProcessDesignerPageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerPageModule, declarations: [ProcessDesignerPageComponent], imports: [i10.CommonModule, ProcessDesignerModule], exports: [ProcessDesignerPageComponent] });
    ProcessDesignerPageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerPageModule, imports: [[i10.CommonModule, ProcessDesignerModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ProcessDesignerPageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ProcessDesignerPageComponent],
                        imports: [i10.CommonModule, ProcessDesignerModule],
                        exports: [ProcessDesignerPageComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ProcessDesignerComponent = ProcessDesignerComponent;
    exports.ProcessDesignerModule = ProcessDesignerModule;
    exports.ProcessDesignerPageComponent = ProcessDesignerPageComponent;
    exports.ProcessDesignerPageModule = ProcessDesignerPageModule;
    exports.RxProcessDesignerService = RxProcessDesignerService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-process-designer.umd.js.map
