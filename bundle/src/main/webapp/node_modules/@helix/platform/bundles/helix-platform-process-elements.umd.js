(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helix/platform/shared/api'), require('@helix/platform/process/api'), require('lodash'), require('@helix/platform/utils'), require('rxjs'), require('@helix/platform/ui-kit'), require('@helix/platform/shared/components'), require('@ngx-translate/core'), require('@helix/platform/record/api'), require('rxjs/operators'), require('@angular/common'), require('@angular/forms'), require('backbone')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/process/elements', ['exports', '@angular/core', '@helix/platform/shared/api', '@helix/platform/process/api', 'lodash', '@helix/platform/utils', 'rxjs', '@helix/platform/ui-kit', '@helix/platform/shared/components', '@ngx-translate/core', '@helix/platform/record/api', 'rxjs/operators', '@angular/common', '@angular/forms', 'backbone'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.process = global.helix.platform.process || {}, global.helix.platform.process.elements = {}), global.ng.core, global.helix.platform.shared.api, global.helix.platform.process.api, global.lodash, global.helix.platform.utils, global.rxjs, global.helix.platform["ui-kit"], global.helix.platform.shared.components, global.i3, global.helix.platform.record.api, global.rxjs.operators, global.ng.common, global.ng.forms, global.backbone));
})(this, (function (exports, i0, i1, i1$2, lodash, i1$1, rxjs, uiKit, i2, i3, api, operators, i4, i5, Backbone) { 'use strict';

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
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var Backbone__namespace = /*#__PURE__*/_interopNamespace(Backbone);

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

    function RxProcessShapeMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxProcessShape, _super);
            function RxProcessShape() {
                var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
                _this.labelPath = 'content';
                return _this;
            }
            RxProcessShape.prototype.initialize = function (config) {
                // @ts-ignore
                _super.prototype.initialize.call(this, config);
                // @ts-ignore
                this.on('change:size', this.onSizeChange);
                // @ts-ignore
                this.on('change:position', this.onPositionChange);
                // @ts-ignore
                this.on('change:id', this.onIdChange);
                // @ts-ignore
                this.on('change:elementModel', this.onElementModelChange);
                // @ts-ignore
                this.prop('elementModel/guid', i1.RxRootInjector.injector.get(i1$1.RxIdService).get(this.get('id')));
                // @ts-ignore
                var labelPath = this.get('labelPath') || 'content';
                // @ts-ignore
                this.prop('elementModel/label', this.prop(labelPath));
            };
            RxProcessShape.prototype.getCommandManager = function () {
                return i1.RxRootInjector.injector.get(i1.RxCommandManagerService).get();
            };
            RxProcessShape.prototype.canBeEmbedded = function (parentView, paper) {
                var hasNeighbors = !lodash.isEmpty(paper.model.getNeighbors(this));
                // @ts-ignore
                var hasBoundaryElementsWithNeighbors = lodash.chain(this.getEmbeddedCells())
                    .filter({ isBoundaryEvent: true })
                    .some(function (embeddedCell) { return !lodash.isEmpty(paper.model.getNeighbors(embeddedCell)); });
                return !hasNeighbors && !hasBoundaryElementsWithNeighbors;
            };
            RxProcessShape.prototype.canEmbedElement = function (childView, paper) {
                return false;
            };
            RxProcessShape.prototype.getLabel = function () {
                // @ts-ignore
                return this.prop('elementModel/label');
            };
            RxProcessShape.prototype.getLayout = function () {
                // @ts-ignore
                return lodash.omit(this.toJSON(), [
                    'elementModel',
                    'embeds',
                    'layout',
                    'parentProcessDefinition',
                    'ownerProcessDefinitionName',
                    'localizableProperties',
                    'inputMapFields'
                ]);
            };
            RxProcessShape.prototype.getParentId = function () {
                // @ts-ignore
                return this.get('parent');
            };
            RxProcessShape.prototype.onActivityTypeChange = function (element, type) {
                switch (type) {
                    case 'task':
                        element.attr({
                            '.inner': {
                                visibility: 'hidden'
                            },
                            '.outer': {
                                'stroke-width': 2,
                                'stroke-dasharray': 'none'
                            },
                            path: {
                                ref: '.outer'
                            },
                            image: {
                                ref: '.outer'
                            },
                            rect: {
                                rx: 4,
                                ry: 4
                            }
                        });
                        break;
                    case 'event-sub-process':
                        element.attr({
                            '.inner': {
                                visibility: 'hidden'
                            },
                            '.outer': {
                                'stroke-width': 2,
                                'stroke-dasharray': '1,2'
                            },
                            path: {
                                ref: '.outer'
                            },
                            image: {
                                ref: '.outer'
                            },
                            rect: {
                                rx: 4,
                                ry: 4
                            }
                        });
                        break;
                    case 'call-activity':
                        element.attr({
                            '.inner': {
                                visibility: 'hidden'
                            },
                            '.outer': {
                                'stroke-width': 4,
                                'stroke-dasharray': 'none'
                            },
                            path: {
                                ref: '.outer'
                            },
                            image: {
                                ref: '.outer'
                            },
                            rect: {
                                rx: 4,
                                ry: 4
                            }
                        });
                        break;
                }
            };
            RxProcessShape.prototype.updateContent = function () {
                // @ts-ignore
                var content = this.get('content');
                // @ts-ignore
                var label = this.id ? content : lodash.truncate(content, { length: 20 });
                var tooltip = label === content ? '' : content;
                if (joint.env.test('svgforeignobject')) {
                    // Content element is a <div> element.
                    // @ts-ignore
                    this.attr({
                        '.content': {
                            // escape the label to patch XSS vulnerability (http://clientio.freshdesk.com/helpdesk/tickets/522)
                            html: lodash.escape(label),
                            title: tooltip
                        }
                    });
                }
                else {
                    // Content element is a <text> element.
                    // SVG elements don't have innerHTML attribute.
                    // @ts-ignore
                    this.attr({
                        '.content': {
                            text: label,
                            title: tooltip
                        }
                    });
                }
            };
            RxProcessShape.prototype.updateName = function () {
                // @ts-ignore
                this.prop('elementModel/name', this.getLabel() || this.get('defaultName'));
            };
            RxProcessShape.prototype.onIdChange = function (element, id) {
                var guid = element.prop('elementModel/guid');
                if (guid) {
                    element.prop('lastId', i1.RxRootInjector.injector.get(i1$1.RxIdService).getBase(guid), { silent: true });
                }
                element.prop('elementModel/guid', i1.RxRootInjector.injector.get(i1$1.RxIdService).get(id), { silent: true });
            };
            RxProcessShape.prototype.onElementModelChange = function (element, elementModel, options) {
                if (options.propertyPath === 'elementModel/label') {
                    // @ts-ignore
                    var labelPath = this.get('labelPath') || 'content';
                    if (labelPath) {
                        element.prop(labelPath, this.getLabel());
                    }
                }
                this.updateName();
            };
            RxProcessShape.prototype.onPositionChange = function (element, position, options) {
                var _this = this;
                if (!options.translateBy && options.propertyValue) {
                    // @ts-ignore
                    var previousPosition = this.previous('position');
                    var parentMovedBy_1 = {
                        cx: previousPosition.x - position.x,
                        cy: previousPosition.y - position.y
                    };
                    // @ts-ignore
                    this.getEmbeddedCells().forEach(function (embeddedCell) {
                        if (embeddedCell._snapToParentBorder) {
                            embeddedCell._snapToParentBorder(_this, parentMovedBy_1);
                        }
                    });
                }
            };
            RxProcessShape.prototype.onSizeChange = function (element) {
                element.getEmbeddedCells().forEach(function (embeddedCell) {
                    if (embeddedCell.isBoundaryEvent && embeddedCell._snapToParentBorder) {
                        embeddedCell._snapToParentBorder(embeddedCell);
                    }
                });
            };
            return RxProcessShape;
        }(Base));
    }

    var RxEndEvent = /** @class */ (function (_super) {
        __extends(RxEndEvent, _super);
        function RxEndEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxEndEvent.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        RxEndEvent.prototype.defaults = function () {
            return joint.util.deepSupplement({
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                },
                defaultName: i1$2.RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent,
                eventType: 'end',
                icon: 'transparent',
                labelPath: 'attrs/.label/text',
                size: {
                    width: 30,
                    height: 30
                },
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.endEvent
            }, joint.shapes.bpmn.Event.prototype.defaults);
        };
        return RxEndEvent;
    }(RxProcessShapeMixin(joint.shapes.bpmn.Event)));

    function RxProcessShapeViewMixin(Base) {
        return /** @class */ (function (_super) {
            __extends(RxProcessShapeView, _super);
            function RxProcessShapeView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RxProcessShapeView.prototype.initialize = function (config) {
                // @ts-ignore
                _super.prototype.initialize.call(this, config);
            };
            RxProcessShapeView.prototype.canInteract = function () {
                // @ts-ignore
                return lodash.isFunction(this.paper.options.interactive)
                    ? // @ts-ignore
                        this.paper.options.interactive(this)
                    : // @ts-ignore
                        this.paper.options.interactive;
            };
            RxProcessShapeView.prototype.prepareEmbedding = function () {
                // @ts-ignore
                var hasNeighbors = !lodash.isEmpty(this.paper.model.getNeighbors(this.model));
                // @ts-ignore
                var hasBoundaryElementsWithNeighbors = lodash.chain(this.model.getEmbeddedCells())
                    .filter({ isBoundaryEvent: true })
                    .some(function (embeddedCell) {
                    return !lodash.isEmpty(this.paper.model.getNeighbors(embeddedCell));
                });
                // @ts-ignore
                if (this.model.get('parent') && !hasNeighbors && !hasBoundaryElementsWithNeighbors) {
                    joint.dia.ElementView.prototype.prepareEmbedding.apply(this, arguments);
                }
            };
            RxProcessShapeView.prototype.getEmbeddedBBox = function () {
                var _this = this;
                var result;
                // @ts-ignore
                var embeddedCellModels = lodash.filter(this.model.getEmbeddedCells(), function (cellModel) {
                    return cellModel && cellModel.get('type') !== 'rx.SequenceFlow' && !cellModel.isBoundaryEvent;
                });
                if (embeddedCellModels.length) {
                    var bboxes = lodash.chain(embeddedCellModels)
                        .map(function (cellModel) {
                        // @ts-ignore
                        var view = _this.paper.findViewByModel(cellModel);
                        // @ts-ignore
                        return new joint.V(view.el).bbox(false, _this.paper.viewport);
                    })
                        .value();
                    var minX = lodash.min(lodash.map(bboxes, function (bbox) { return bbox.x; }));
                    var minY = lodash.min(lodash.map(bboxes, function (bbox) { return bbox.y; }));
                    var maxX = lodash.max(lodash.map(bboxes, function (bbox) { return bbox.x + bbox.width; }));
                    var maxY = lodash.max(lodash.map(bboxes, function (bbox) { return bbox.y + bbox.height; }));
                    result = joint.g.rect(minX, minY, maxX - minX, maxY - minY);
                }
                else {
                    result = joint.g.rect(0, 0, 0, 0);
                }
                return result;
            };
            return RxProcessShapeView;
        }(Base));
    }

    var RxEndEventView = /** @class */ (function (_super) {
        __extends(RxEndEventView, _super);
        function RxEndEventView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxEndEventView.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        // TODO-VS: remove
        RxEndEventView.prototype.sgResize = function (opt) {
            // @ts-ignore
            var scalable = this.scalableNode;
            scalable.attr('transform', "scale(" + 0.5 + "," + 0.5 + ")");
            // @ts-ignore
            _super.prototype.update.call(this);
            // // @ts-ignore
            // var model = this.model;
            // var angle = model.angle();
            // var size = model.size();
            // // @ts-ignore
            // var scalable = this.scalableNode;
            //
            // var recursive = false;
            // if (scalable.node.getElementsByTagName('path').length > 0) {
            //   // If scalable has at least one descendant that is a path, we need to switch to recursive bbox calculation.
            //   // If there are no path descendants, group bbox calculation works and so we can use the (faster) native function directly.
            //   recursive = true;
            // }
            //
            // var scalableBBox = scalable.getBBox({ recursive: recursive });
            //
            // var sx = size.width / (60 || 1);
            // var sy = size.height / (60 || 1);
            //
            // scalable.attr('transform', 'scale(' + sx + ',' + sy + ')');
            //
            // // @ts-ignore
            // super.update();
        };
        return RxEndEventView;
    }(RxProcessShapeViewMixin(joint.dia.ElementView)));

    var RxEndEventService = /** @class */ (function () {
        function RxEndEventService(rxStringService, translateService) {
            this.rxStringService = rxStringService;
            this.translateService = translateService;
        }
        RxEndEventService.prototype.getDefinitionFromModel = function (model) {
            return {
                description: model.description,
                guid: model.guid,
                name: model.name,
                resourceType: model.resourceType
            };
        };
        // TODO-VS: add position and size inspector groups
        RxEndEventService.prototype.getInspectorConfig = function () {
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'label',
                            component: i2.TextFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                            }
                        },
                        {
                            name: 'description',
                            component: i2.TextareaFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            name: 'guid',
                            component: i2.TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                            }
                        }
                    ]
                }
            ];
        };
        // TODO-VS: update logic and types
        RxEndEventService.prototype.getModelFromDefinition = function (definition) {
            var elementModel = {
                description: '',
                guid: null,
                label: '',
                name: i1$2.RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent,
                resourceType: i1$2.RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent,
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.endEvent
            };
            if (definition) {
                elementModel = Object.assign(Object.assign({}, elementModel), { description: definition.description, guid: definition.guid, label: definition.name, name: definition.name, resourceType: definition.resourceType });
            }
            return elementModel;
        };
        RxEndEventService.prototype.getShape = function (options) {
            return new joint.shapes.rx.EndEvent({
                elementModel: this.getModelFromDefinition(),
                position: options.position
            });
        };
        RxEndEventService.prototype.setCommonDataDictionaryBranch = function (guid, dataDictionaryBranch) { };
        RxEndEventService.prototype.validate = function (model, availableCells) {
            var validationIssues = [];
            var inboundLinks = availableCells.filter(function (cell) { return cell.prop('targetNode') === model.guid; });
            if (inboundLinks.length < 1) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Warning,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.is-required.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.inbound-sequence-flow.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            var outboundLinks = availableCells.filter(function (cell) { return cell.prop('sourceNode') === model.guid; });
            if (!lodash.isEmpty(outboundLinks)) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Warning,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.end-event.validation.outbound-sequence-flow.message'),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            if (this.rxStringService.isEmptySafe(model.label)) {
                if (lodash.some(availableCells, function (cell) { return cell.prop('label') === model.label; })) {
                    validationIssues.push({
                        type: uiKit.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                        }),
                        data: {
                            guid: model.guid,
                            inspectorTabIndex: 1,
                            propertyName: 'label'
                        }
                    });
                }
            }
            return rxjs.of(validationIssues);
        };
        return RxEndEventService;
    }());
    RxEndEventService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventService, deps: [{ token: i1__namespace.RxStringService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxEndEventService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxStringService }, { type: i3__namespace.TranslateService }]; } });

    var RxEndEventRegistrationModule = /** @class */ (function () {
        function RxEndEventRegistrationModule(rxEndEventService, rxProcessElementRegistryService, translateService) {
            rxProcessElementRegistryService.register({
                displayName: translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.end-event.display-name.label'),
                elementService: rxEndEventService,
                group: i1$2.RX_PROCESS_DEFINITION.standardProcessElementGroups.events.name,
                paletteItem: {
                    border: i1.RX_DESIGNER.paletteItemBorder.bold,
                    label: i1.RX_DESIGNER.paletteItemLabel.outer,
                    shape: i1.RX_DESIGNER.paletteItemShape.circle
                },
                resourceType: i1$2.RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent,
                shapeClass: RxEndEvent,
                shapeType: 'EndEvent',
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.endEvent,
                viewShapeClass: RxEndEventView,
                viewShapeType: 'EndEventView'
            });
        }
        return RxEndEventRegistrationModule;
    }());
    RxEndEventRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventRegistrationModule, deps: [{ token: RxEndEventService }, { token: i1__namespace$1.RxProcessElementRegistryService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxEndEventRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventRegistrationModule });
    RxEndEventRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventRegistrationModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxEndEventRegistrationModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: RxEndEventService }, { type: i1__namespace$1.RxProcessElementRegistryService }, { type: i3__namespace.TranslateService }]; } });

    var RxProcess = /** @class */ (function (_super) {
        __extends(RxProcess, _super);
        function RxProcess(options) {
            var _this = _super.call(this, options) || this;
            _this.markup = '<g></g>';
            return _this;
        }
        RxProcess.prototype.defaults = function () {
            return joint.util.defaultsDeep({
                position: { x: 0, y: 0 },
                size: { width: 1, height: 1 },
                type: 'rx.Process'
            }, _super.prototype.defaults);
        };
        return RxProcess;
    }(joint.dia.Element));

    var RxProcessService = /** @class */ (function () {
        function RxProcessService(rxDefinitionNameService, rxStringService, translateService) {
            this.rxDefinitionNameService = rxDefinitionNameService;
            this.rxStringService = rxStringService;
            this.translateService = translateService;
        }
        // TODO-VS: update when variable editor is implemented
        RxProcessService.prototype.getDefinitionFromModel = function (definitionModel) {
            return {
                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                contextKeyParam: definitionModel.contextKeyParam,
                description: definitionModel.description,
                guid: definitionModel.guid,
                inputParams: definitionModel.inputParams,
                isEnabled: definitionModel.isEnabled,
                localVariables: definitionModel.localVariables,
                name: this.rxDefinitionNameService.getDefinitionName(definitionModel.bundleId, definitionModel.name),
                outputParams: definitionModel.outputParams,
                overlayDescriptor: definitionModel.overlayDescriptor,
                overlayGroupId: definitionModel.overlayGroupId,
                permissions: definitionModel.permissions,
                runAsUser: i1$2.RX_PROCESS_DEFINITION.runAsUser[definitionModel.runAsUser].definitionValue,
                scope: definitionModel.customizationOptions.scope
            };
        };
        RxProcessService.prototype.getInspectorConfig = function (definitionModel) {
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: i2.TextFormControlComponent,
                            isDisabled: Boolean(definitionModel.lastUpdateTime),
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: i2.TextareaFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            name: 'guid',
                            component: i2.TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                            }
                        },
                        {
                            name: 'owner',
                            component: i2.TextFormControlComponent,
                            hidden: !Boolean(definitionModel.owner),
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                            }
                        },
                        {
                            name: 'lastUpdateTime',
                            component: i2.TextFormControlComponent,
                            hidden: !Boolean(definitionModel.lastUpdateTime),
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                            }
                        },
                        {
                            name: 'lastChangedBy',
                            component: i2.TextFormControlComponent,
                            hidden: !Boolean(definitionModel.lastChangedBy),
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                            }
                        },
                        {
                            component: i2.RxRevertCustomizationComponent,
                            options: {
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: i2.CustomizationOptionsComponent,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.process-definition.label')
                                    .toLowerCase(),
                                allowOverlay: definitionModel.customizationOptions.allowOverlay,
                                scope: definitionModel.customizationOptions.scope,
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'isEnabled',
                            component: i2.SwitchFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.process-enabled.label')
                            }
                        },
                        {
                            name: 'runAsUser',
                            component: i2.SelectFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.label'),
                                tooltip: new i1.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.tooltip')),
                                options: [
                                    {
                                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.administrator.label'),
                                        id: i1$2.RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
                                    },
                                    {
                                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.current-user.label'),
                                        id: i1$2.RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.variables.label'),
                    controls: [
                    // TODO-VS: add variables editor
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                    controls: [
                        {
                            name: 'permissions',
                            component: i2.RxPermissionEditorComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                type: 'process'
                            }
                        }
                    ]
                }
            ];
        };
        // TODO-VS: update when variable editor is implemented
        RxProcessService.prototype.getModelFromDefinition = function (definition, bundleId) {
            return {
                bundleId: bundleId,
                contextKeyParam: definition.contextKeyParam,
                customizationOptions: {
                    allowOverlay: definition.allowOverlay,
                    scope: definition.scope
                },
                description: definition.description,
                guid: definition.guid,
                inputParams: definition.inputParams,
                isEnabled: definition.isEnabled,
                lastChangedBy: definition.lastChangedBy,
                lastUpdateTime: definition.lastUpdateTime,
                localVariables: definition.localVariables,
                name: Boolean(definition.lastUpdateTime)
                    ? this.rxDefinitionNameService.getDisplayName(definition.name)
                    : definition.name,
                outputParams: definition.outputParams,
                overlayDescriptor: null,
                overlayGroupId: definition.overlayGroupId,
                owner: definition.owner,
                permissions: definition.permissions,
                runAsUser: definition.runAsUser
                    ? i1$2.RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                    : i1$2.RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
            };
        };
        RxProcessService.prototype.getShape = function (options) {
            return new RxProcess(options);
        };
        RxProcessService.prototype.validate = function (definitionModel, availableCells) {
            var validationIssues = [];
            if (this.rxStringService.isEmptySafe(definitionModel.name)) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                    }),
                    data: {
                        propertyName: 'name',
                        inspectorTabIndex: 0
                    }
                });
            }
            if (definitionModel.name && !api.RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                    }),
                    data: {
                        propertyName: 'name',
                        inspectorTabIndex: 0
                    }
                });
            }
            var startEvents = availableCells.filter(function (cell) { return cell.prop('type') === i1$2.RX_PROCESS_DEFINITION.processElementTypes.startEvent; });
            if (startEvents.length != 1) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.validation.single-start-event.message'),
                    data: {
                        inspectorTabIndex: 0
                    }
                });
            }
            var endEvents = availableCells.filter(function (cell) { return cell.prop('type') === i1$2.RX_PROCESS_DEFINITION.processElementTypes.endEvent; });
            if (lodash.isEmpty(endEvents)) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.validation.no-end-event.label'),
                    data: {
                        inspectorTabIndex: 0
                    }
                });
            }
            return rxjs.of(validationIssues);
        };
        return RxProcessService;
    }());
    RxProcessService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessService, deps: [{ token: i1__namespace$2.RxDefinitionNameService }, { token: i1__namespace.RxStringService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.RxDefinitionNameService }, { type: i1__namespace.RxStringService }, { type: i3__namespace.TranslateService }]; } });

    var RxProcessAction = /** @class */ (function (_super) {
        __extends(RxProcessAction, _super);
        function RxProcessAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxProcessAction.prototype.defaults = function () {
            return joint.util.deepSupplement({
                attrs: {
                    '.icon': {
                        width: 12,
                        height: 12,
                        'ref-x': 3,
                        'ref-y': 3
                    },
                    rect: {
                        rx: 4,
                        ry: 4
                    }
                },
                icon: 'gear',
                size: {
                    width: 90,
                    height: 60
                },
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.processAction
            }, 
            // @ts-ignore
            _super.prototype.defaults);
        };
        RxProcessAction.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        RxProcessAction.prototype.getElementService = function (type) {
            return i1.RxRootInjector.injector.get(i1$2.RxProcessElementRegistryService).get(type).elementService;
        };
        return RxProcessAction;
    }(i1.RxServerActionMixin(RxProcessShapeMixin(joint.shapes.bpmn.Activity))));

    var RxProcessActionView = /** @class */ (function (_super) {
        __extends(RxProcessActionView, _super);
        function RxProcessActionView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxProcessActionView.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        return RxProcessActionView;
    }(i1.RxServerActionViewMixin(RxProcessShapeViewMixin(joint.shapes.bpmn.ActivityView))));

    var RxExpressionInputMapInspectorWidgetComponent = /** @class */ (function (_super) {
        __extends(RxExpressionInputMapInspectorWidgetComponent, _super);
        function RxExpressionInputMapInspectorWidgetComponent(renderer, rxDesignerCacheService, rxExpressionEditorService, rxIdService, injector) {
            var _this = _super.call(this, injector) || this;
            _this.renderer = renderer;
            _this.rxDesignerCacheService = rxDesignerCacheService;
            _this.rxExpressionEditorService = rxExpressionEditorService;
            _this.rxIdService = rxIdService;
            _this.injector = injector;
            _this.destroyed$ = new rxjs.ReplaySubject(1);
            return _this;
        }
        RxExpressionInputMapInspectorWidgetComponent.prototype.ngOnInit = function () {
            this.elementModel$ = this.designerItemModel.pipe(operators.pluck('elementModel'), operators.takeUntil(this.destroyed$));
            this.graph$ = this.designerItemModel.pipe(operators.pluck('graph'), operators.takeUntil(this.destroyed$));
            this.patchConfig(this.options);
        };
        RxExpressionInputMapInspectorWidgetComponent.prototype.ngOnChanges = function (changes) {
            if (!lodash.isEqual(changes.options.currentValue, changes.options.previousValue)) {
                this.patchConfig(changes.options.currentValue);
            }
        };
        RxExpressionInputMapInspectorWidgetComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RxExpressionInputMapInspectorWidgetComponent.prototype.openExpressionEditor = function (section, elementModel, inspectorElementRef) {
            var _this = this;
            this.graph$.pipe(operators.take(1)).subscribe(function (graph) {
                _this.rxExpressionEditorService
                    .openEditor({
                    expressionConfigurator: _this.options.expressionConfigurator,
                    expressionPropertyNavigator: {
                        getProperties: _this.getExpressionProperties.bind(_this, elementModel, inspectorElementRef)
                    },
                    isReadOnly: false,
                    property: {
                        path: "inputMap/" + section.name,
                        value: elementModel.inputMap[section.name],
                        label: section.options.label
                    }
                })
                    .pipe(operators.takeUntil(_this.destroyed$))
                    .subscribe(function (expression) {
                    var selectedElementCell = graph.getCell(_this.rxIdService.getBase(elementModel.guid));
                    selectedElementCell.prop("elementModel/" + expression.path, expression.value);
                });
            });
        };
        RxExpressionInputMapInspectorWidgetComponent.prototype.getExpressionProperties = function (elementModel, inspectorElementRef) {
            var _this = this;
            return rxjs.of(elementModel.inputMap).pipe(operators.map(function (modelProperties) { return Array.from(_this.renderer
                .selectRootElement(inspectorElementRef.nativeElement, true)
                .querySelectorAll('rx-expression-form-control')).map(function (element) {
                var propertyPath = element.getAttribute('property-path');
                return {
                    path: "inputMap/" + propertyPath,
                    value: modelProperties[propertyPath],
                    label: element.getAttribute('property-label')
                };
            }); }));
        };
        RxExpressionInputMapInspectorWidgetComponent.prototype.patchConfig = function (options) {
            this.config = options.expressionInputMapInspectorOptions.map(function (expressionInputMapInspectorOption) { return ({
                name: expressionInputMapInspectorOption.name,
                options: {
                    label: expressionInputMapInspectorOption.label,
                    dataDictionary$: options.expressionConfigurator.getDataDictionary("inputMap/" + expressionInputMapInspectorOption.name),
                    operators: options.expressionConfigurator.getOperators("inputMap/" + expressionInputMapInspectorOption.name)
                }
            }); });
        };
        return RxExpressionInputMapInspectorWidgetComponent;
    }(i2.InspectorWidgetBase));
    RxExpressionInputMapInspectorWidgetComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionInputMapInspectorWidgetComponent, deps: [{ token: i0__namespace.Renderer2 }, { token: i1__namespace$2.RxDesignerCacheService }, { token: i2__namespace.RxExpressionEditorService }, { token: i1__namespace.RxIdService }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RxExpressionInputMapInspectorWidgetComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxExpressionInputMapInspectorWidgetComponent, selector: "rx-expression-input-map-inspector-widget", viewQueries: [{ propertyName: "expressionInputMapInspectorElementRef", first: true, predicate: ["expressionInputMapInspector"], descendants: true, read: i0.ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace, template: "<div *ngIf=\"elementModel$ | async as elementModel\" #expressionInputMapInspector>\n  <rx-expression-form-control\n    *ngFor=\"let section of config\"\n    [options]=\"section.options\"\n    [propertyPath]=\"section.name\"\n    [ngModel]=\"elementModel.inputMap[section.name]\"\n    (events)=\"openExpressionEditor(section, elementModel, expressionInputMapInspectorElementRef)\"\n  >\n  </rx-expression-form-control>\n</div>\n", styles: [":host ::ng-deep rx-expression-form-control:not(:last-child) button{margin-bottom:5px}\n"], components: [{ type: i2__namespace.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionInputMapInspectorWidgetComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-expression-input-map-inspector-widget',
                        templateUrl: './expression-input-map-inspector-widget.component.html',
                        styleUrls: ['./expression-input-map-inspector-widget.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }, { type: i1__namespace$2.RxDesignerCacheService }, { type: i2__namespace.RxExpressionEditorService }, { type: i1__namespace.RxIdService }, { type: i0__namespace.Injector }]; }, propDecorators: { expressionInputMapInspectorElementRef: [{
                    type: i0.ViewChild,
                    args: ['expressionInputMapInspector', { read: i0.ElementRef }]
                }] } });

    var RxProcessActionExpressionConfigurator = /** @class */ (function (_super) {
        __extends(RxProcessActionExpressionConfigurator, _super);
        function RxProcessActionExpressionConfigurator(injector) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.configureForProperty({
                propertyPath: /outputMap\/.*/,
                dataDictionary$: _this.getOutputMapDataDictionary()
            });
            return _this;
        }
        RxProcessActionExpressionConfigurator.prototype.getDataDictionaryService = function () {
            return this.injector.get(i1$2.RxProcessDataDictionaryService);
        };
        RxProcessActionExpressionConfigurator.prototype.getOutputMapDataDictionary = function () {
            return this.commonDataDictionary$;
        };
        return RxProcessActionExpressionConfigurator;
    }(i1.RxServerActionExpressionConfigurator));

    var RxProcessActionService = /** @class */ (function (_super) {
        __extends(RxProcessActionService, _super);
        function RxProcessActionService(injector) {
            var _this = _super.call(this, injector) || this;
            _this.injector = injector;
            _this.rxActionTypeUtilsService = injector.get(i1.RxActionTypeUtilsService);
            _this.rxProcessDataDictionaryService = injector.get(i1$2.RxProcessDataDictionaryService);
            return _this;
        }
        // PUBLIC
        // TODO-VS: eliminate Partial (new IProcessDefinitionLight to eliminate overlayDescriptor form IDefinitionLight?)
        RxProcessActionService.prototype.getDefinitionFromModel = function (model) {
            return {
                actionTypeName: model.actionTypeName,
                description: model.description,
                guid: model.guid,
                inputMap: this.getInputMapFromModel(model),
                multiInstanceLoopDefinition: model.multiInstanceLoopDefinition,
                name: model.name,
                outputMap: model.outputMap,
                resourceType: model.resourceType,
                runAsUser: i1$2.RX_PROCESS_DEFINITION.runAsUser[model.runAsUser].definitionValue
            };
        };
        RxProcessActionService.prototype.getExpressionConfigurator = function () {
            var _a;
            return ((_a = this.expressionConfigurator) !== null && _a !== void 0 ? _a : (this.expressionConfigurator = new (this.getExpressionConfiguratorClass())(this.injector)));
        };
        RxProcessActionService.prototype.getInspectorConfig = function (model, options) {
            var generalConfigControls = [
                {
                    name: 'actionTypeName',
                    component: i2.TextFormControlComponent,
                    isDisabled: true,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-action-properties.action-type-name.label')
                    }
                },
                {
                    name: 'label',
                    component: i2.TextFormControlComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label'),
                        required: true
                    }
                },
                {
                    name: 'description',
                    component: i2.TextareaFormControlComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                        rows: 3
                    }
                },
                {
                    name: 'guid',
                    component: i2.TextFormControlComponent,
                    isDisabled: true,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                    }
                },
                {
                    name: 'runAsUser',
                    component: i2.SelectFormControlComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.label'),
                        tooltip: new i1.Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.inspector.run-as.tooltip')),
                        options: [
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.common.administrator.label'),
                                id: i1$2.RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.common.current-user.label'),
                                id: i1$2.RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.process-action.inherit-from-process.label'),
                                id: i1$2.RX_PROCESS_DEFINITION.runAsUser.inheritFromProcess.modelValue
                            }
                        ]
                    }
                }
            ];
            if (model.isDeprecated) {
                generalConfigControls.unshift({
                    name: 'isDeprecated',
                    component: i2.LabelFormControlComponent,
                    options: {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.designer.server-action-properties.deprecated.label', {
                            definitionType: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.process.label')
                        })
                    }
                });
            }
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: generalConfigControls
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.element-properties.input-map.label'),
                    controls: [this.getInputMapInspectorWidgetConfig(model)]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.element-properties.output-map.label'),
                    controls: [
                        {
                            name: 'outputMap',
                            component: i2.AssignmentExpressionListFormControlComponent,
                            options: {
                                confirmationMessage: 'com.bmc.arsys.rx.client.designer.inspector.delete-output-map-item-confirmation.message',
                                sourceFieldOptions: {
                                    expressionConfigurator: this.getExpressionConfigurator(),
                                    options: {
                                        dataDictionary$: this.getExpressionConfigurator().getDataDictionary('outputMap'),
                                        operators: this.getExpressionConfigurator().getOperators('outputMap')
                                    }
                                },
                                targetFieldOptions: {
                                    type: i2.AssignmentExpressionListTargetFieldType.Select,
                                    options: {
                                        options: lodash.chain(__spreadArray(__spreadArray(__spreadArray([], __read(options.processDefinitionModel.inputParams)), __read(options.processDefinitionModel.outputParams)), __read(options.processDefinitionModel.localVariables)))
                                            .map('name')
                                            .uniq()
                                            .map(function (name) { return ({
                                            name: name,
                                            id: name
                                        }); })
                                            .value()
                                    }
                                }
                            }
                        }
                    ]
                }
            ];
        };
        RxProcessActionService.prototype.getModelFromDefinition = function (definition) {
            var actionType = _super.prototype.getActionTypeByName.call(this, definition.actionTypeName);
            var name = actionType.displayName || this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName);
            return definition.guid
                ? {
                    actionTypeName: definition.actionTypeName,
                    deprecatedText: actionType.deprecatedText,
                    description: definition.description,
                    guid: definition.guid,
                    inputMap: this.getInputMapFromDefinition(definition),
                    isDeprecated: actionType.isDeprecated,
                    label: definition.name,
                    multiInstanceLoopDefinition: definition.multiInstanceLoopDefinition,
                    name: definition.name,
                    outputMap: definition.outputMap,
                    resourceType: definition.resourceType,
                    runAsUser: this.getRunAsUserFromDefinition(definition),
                    type: this.getElementType(actionType.actionTypeName)
                }
                : {
                    actionTypeName: actionType.actionTypeName,
                    deprecatedText: actionType.deprecatedText,
                    description: '',
                    guid: '',
                    inputMap: {},
                    isDeprecated: actionType.isDeprecated,
                    label: name,
                    multiInstanceLoopDefinition: null,
                    name: name,
                    outputMap: [],
                    resourceType: i1$2.RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                    runAsUser: i1$2.RX_PROCESS_DEFINITION.runAsUser.inheritFromProcess.modelValue,
                    type: this.getElementType(actionType.actionTypeName)
                };
        };
        // TODO-VS: update types
        RxProcessActionService.prototype.getShape = function (options) {
            var ProcessActionClass = this.getClass();
            var classConfig = _super.prototype.getClassConfig.call(this, options);
            return new ProcessActionClass(classConfig);
        };
        RxProcessActionService.prototype.setCommonDataDictionaryBranch = function (guid, dataDictionaryBranch) {
            this.rxProcessDataDictionaryService.setCommonActivitiesDataDictionaryBranch(guid, dataDictionaryBranch);
        };
        // TODO-VS: update types
        RxProcessActionService.prototype.validate = function (model, availableCells) {
            var _this = this;
            return _super.prototype.validateServerAction.call(this, model, availableCells).pipe(operators.map(function (serverActionValidationIssues) {
                var validationIssues = __spreadArray([], __read(serverActionValidationIssues));
                var inboundLinks = availableCells.filter(function (cell) { return cell.prop('targetNode') === model.guid; });
                var outboundLinks = availableCells.filter(function (cell) { return cell.prop('sourceNode') === model.guid; });
                if (lodash.isEmpty(inboundLinks)) {
                    validationIssues.push({
                        type: uiKit.ValidationIssueType.Warning,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.is-required.message', {
                            propertyName: _this.translateService.instant('com.bmc.arsys.rx.client.process-designer.inbound-sequence-flow.label')
                        }),
                        data: {
                            guid: model.guid,
                            inspectorTabIndex: 1
                        }
                    });
                }
                if (outboundLinks.length !== 1) {
                    validationIssues.push({
                        type: uiKit.ValidationIssueType.Warning,
                        description: _this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.is-required.message', {
                            propertyName: _this.translateService.instant('com.bmc.arsys.rx.client.process-designer.outbound-sequence-flow.label')
                        }),
                        data: {
                            guid: model.guid,
                            inspectorTabIndex: 1
                        }
                    });
                }
                return validationIssues;
            }));
        };
        // OVERRIDES
        RxProcessActionService.prototype.buildDataDictionaryBranch = function (model) {
            var _this = this;
            var outputParams = _super.prototype.getActionTypeByName.call(this, model.actionTypeName).outputParams;
            return lodash.isEmpty(outputParams)
                ? rxjs.of(null)
                : this.buildOutputDataDictionaryBranch(model, outputParams).pipe(operators.map(function (outputDataDictionaryBranch) {
                    var isArrayOrListDataType = _this.rxActionTypeUtilsService.isActionParameterArrayOrList(outputParams[0]);
                    if (lodash.isArray(outputDataDictionaryBranch)) {
                        var children = outputDataDictionaryBranch;
                        if (lodash.isEmpty(outputDataDictionaryBranch)) {
                            children = _this.buildDefaultOutputDataDictionaryBranch(outputParams[0].dataTypeDetail);
                        }
                        return {
                            label: model.label,
                            icon: 'd-icon-arrow_chart',
                            children: [
                                {
                                    label: _this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.output.label'),
                                    icon: 'd-icon-arrow_chart',
                                    expression: '${activityResults.' + model.guid + '.output' + (isArrayOrListDataType ? '[0]}' : '}'),
                                    children: _this.updateOutputDataDictionaryBranch(children, model.guid, isArrayOrListDataType)
                                }
                            ]
                        };
                    }
                    else {
                        return null;
                    }
                }));
        };
        RxProcessActionService.prototype.buildOutputDataDictionaryBranch = function (model, outputParams) {
            return rxjs.of([]);
        };
        RxProcessActionService.prototype.getClass = function () {
            return joint.shapes.rx.ProcessAction;
        };
        RxProcessActionService.prototype.getDefinitionInputMapParam = function (inputParamName, inputParamValue) {
            return {
                assignTarget: inputParamName,
                expression: inputParamValue
            };
        };
        RxProcessActionService.prototype.getElementType = function (actionTypeName) {
            return i1$2.RX_PROCESS_DEFINITION.processElementTypes.processAction;
        };
        RxProcessActionService.prototype.getExpressionConfiguratorClass = function () {
            return RxProcessActionExpressionConfigurator;
        };
        RxProcessActionService.prototype.getInputMapInspectorWidgetConfig = function (model) {
            var _this = this;
            var actionType = this.getActionTypeByName(model.actionTypeName);
            return {
                component: RxExpressionInputMapInspectorWidgetComponent,
                options: {
                    expressionConfigurator: this.getExpressionConfigurator(),
                    expressionInputMapInspectorOptions: actionType.inputParams.map(function (inputParam) { return ({
                        name: inputParam.name,
                        label: inputParam.displayName || _this.rxStringService.prettify(inputParam.name)
                    }); })
                }
            };
        };
        RxProcessActionService.prototype.getInputMapFromDefinition = function (definition) {
            var actionType = _super.prototype.getActionTypeByName.call(this, definition.actionTypeName);
            var initialInputMap = actionType
                ? lodash.transform(actionType.inputParams, function (inputMap, inputParam) { return (inputMap[inputParam.name] = ''); }, {})
                : {};
            return lodash.transform((definition === null || definition === void 0 ? void 0 : definition.inputMap) || [], function (inputMap, inputMapField) { return (inputMap[inputMapField.assignTarget] = inputMapField.expression); }, initialInputMap);
        };
        // HELPERS
        RxProcessActionService.prototype.buildDefaultOutputDataDictionaryBranch = function (outputParams, outputPropertyPathOpener) {
            var _this = this;
            return lodash.isEmpty(outputParams)
                ? null
                : outputParams.map(function (outputParam) {
                    var isArrayOrListDataType = _this.rxActionTypeUtilsService.isActionParameterArrayOrList(outputParam);
                    var outputPropertyPath = (outputPropertyPathOpener ? outputPropertyPathOpener + '.' + outputParam.name : outputParam.name) +
                        (isArrayOrListDataType ? '[0]' : '');
                    return {
                        label: _this.rxStringService.prettify(outputParam.name),
                        outputPropertyPath: outputPropertyPath,
                        children: _this.buildDefaultOutputDataDictionaryBranch(outputParam.dataTypeDetail, outputPropertyPath)
                    };
                });
        };
        RxProcessActionService.prototype.getInputMapFromModel = function (model) {
            var _this = this;
            return lodash.reduce(model.inputMap, function (inputMap, propertyValue, propertyName) {
                var inputMapParam;
                if (!lodash.isEmpty(propertyValue)) {
                    inputMapParam = _this.getDefinitionInputMapParam(propertyName, propertyValue);
                    if (inputMapParam) {
                        inputMap.push(inputMapParam);
                    }
                }
                return inputMap;
            }, []);
        };
        RxProcessActionService.prototype.getOutputDataDictionaryExpression = function (flowElementGuid, isArrayOrListDataType, outputPropertyPath) {
            return ('${activityResults.' +
                flowElementGuid +
                '.output' +
                (isArrayOrListDataType ? '[0].' : '.') +
                outputPropertyPath +
                '}');
        };
        RxProcessActionService.prototype.getRunAsUserFromDefinition = function (definition) {
            var runAsUser;
            switch (definition.runAsUser) {
                case true: {
                    runAsUser = i1$2.RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue;
                    break;
                }
                case false: {
                    runAsUser = i1$2.RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue;
                    break;
                }
                default: {
                    runAsUser = i1$2.RX_PROCESS_DEFINITION.runAsUser.inheritFromProcess.modelValue;
                    break;
                }
            }
            return runAsUser;
        };
        RxProcessActionService.prototype.updateOutputDataDictionaryBranch = function (children, flowElementGuid, isArrayOrListDataType) {
            var _this = this;
            return lodash.isEmpty(children)
                ? null
                : children.map(function (child) {
                    var expression = child.expression;
                    if (child.outputPropertyPath) {
                        if (lodash.isArray(child.outputPropertyPath)) {
                            expression = child.outputPropertyPath.map(function (outputPropertyPath) { return _this.getOutputDataDictionaryExpression(flowElementGuid, isArrayOrListDataType, outputPropertyPath); });
                        }
                        else {
                            expression = _this.getOutputDataDictionaryExpression(flowElementGuid, isArrayOrListDataType, child.outputPropertyPath);
                        }
                    }
                    return {
                        label: child.label,
                        icon: expression ? 'd-icon-arrow_chart' : null,
                        expression: expression,
                        children: _this.updateOutputDataDictionaryBranch(child.children, flowElementGuid, isArrayOrListDataType)
                    };
                });
        };
        return RxProcessActionService;
    }(i1.RxServerActionService));
    RxProcessActionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessActionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxProcessActionRegistrationModule = /** @class */ (function () {
        function RxProcessActionRegistrationModule(rxProcessElementRegistryService, rxProcessActionService) {
            rxProcessElementRegistryService.register({
                elementService: rxProcessActionService,
                group: i1$2.RX_PROCESS_DEFINITION.standardProcessElementGroups.platformActions.name,
                paletteItem: {
                    border: i1.RX_DESIGNER.paletteItemBorder.bold,
                    icon: {
                        path: i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.gear,
                        position: i1.RX_DESIGNER.paletteIconPosition.top
                    },
                    label: i1.RX_DESIGNER.paletteItemLabel.outer,
                    shape: i1.RX_DESIGNER.paletteItemShape.rectangle
                },
                resourceType: i1$2.RX_PROCESS_DEFINITION.processElementResourceTypes.processAction,
                shapeClass: RxProcessAction,
                shapeType: 'ProcessAction',
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.processAction,
                viewShapeClass: RxProcessActionView,
                viewShapeType: 'ProcessActionView'
            });
        }
        return RxProcessActionRegistrationModule;
    }());
    RxProcessActionRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionRegistrationModule, deps: [{ token: i1__namespace$1.RxProcessElementRegistryService }, { token: RxProcessActionService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxProcessActionRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionRegistrationModule });
    RxProcessActionRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionRegistrationModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessActionRegistrationModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxProcessElementRegistryService }, { type: RxProcessActionService }]; } });

    // TODO-VS: move to "@helix/platform/process/components"
    var RxExpressionInputMapInspectorWidgetModule = /** @class */ (function () {
        function RxExpressionInputMapInspectorWidgetModule() {
        }
        return RxExpressionInputMapInspectorWidgetModule;
    }());
    RxExpressionInputMapInspectorWidgetModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionInputMapInspectorWidgetModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxExpressionInputMapInspectorWidgetModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionInputMapInspectorWidgetModule, declarations: [RxExpressionInputMapInspectorWidgetComponent], imports: [i4.CommonModule, i2.ExpressionFormControlModule, i5.FormsModule, i2.RxFormBuilderModule, i2.RxInspectorModule], exports: [RxExpressionInputMapInspectorWidgetComponent] });
    RxExpressionInputMapInspectorWidgetModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionInputMapInspectorWidgetModule, imports: [[i4.CommonModule, i2.ExpressionFormControlModule, i5.FormsModule, i2.RxFormBuilderModule, i2.RxInspectorModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxExpressionInputMapInspectorWidgetModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxExpressionInputMapInspectorWidgetComponent],
                        imports: [i4.CommonModule, i2.ExpressionFormControlModule, i5.FormsModule, i2.RxFormBuilderModule, i2.RxInspectorModule],
                        exports: [RxExpressionInputMapInspectorWidgetComponent]
                    }]
            }] });

    var RxStartEvent = /** @class */ (function (_super) {
        __extends(RxStartEvent, _super);
        function RxStartEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxStartEvent.prototype.defaults = function () {
            return joint.util.deepSupplement({
                attrs: {
                    '.label': {
                        fill: 'gray'
                    }
                },
                defaultName: i1$2.RX_PROCESS_DEFINITION.processElementDisplayNames.startEvent,
                eventType: 'start',
                icon: 'transparent',
                labelPath: 'attrs/.label/text',
                size: {
                    width: 30,
                    height: 30
                },
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.startEvent
            }, 
            // @ts-ignore
            _super.prototype.defaults);
        };
        RxStartEvent.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        return RxStartEvent;
    }(RxProcessShapeMixin(joint.shapes.bpmn.Event)));

    var RxStartEventView = /** @class */ (function (_super) {
        __extends(RxStartEventView, _super);
        function RxStartEventView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RxStartEventView.prototype.initialize = function (config) {
            // @ts-ignore
            _super.prototype.initialize.call(this, config);
        };
        // TODO-VS: remove
        RxStartEventView.prototype.sgResize = function (opt) {
            // @ts-ignore
            var scalable = this.scalableNode;
            scalable.attr('transform', "scale(" + 0.5 + "," + 0.5 + ")");
            // @ts-ignore
            _super.prototype.update.call(this);
        };
        return RxStartEventView;
    }(RxProcessShapeViewMixin(joint.dia.ElementView)));

    var RxStartEventService = /** @class */ (function () {
        function RxStartEventService(rxStringService, translateService) {
            this.rxStringService = rxStringService;
            this.translateService = translateService;
        }
        RxStartEventService.prototype.getDefinitionFromModel = function (model) {
            return {
                description: model.description,
                guid: model.guid,
                name: model.name,
                resourceType: model.resourceType
            };
        };
        // TODO-VS: add position and size inspector groups
        RxStartEventService.prototype.getInspectorConfig = function () {
            return [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'label',
                            component: i2.TextFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                            }
                        },
                        {
                            name: 'description',
                            component: i2.TextareaFormControlComponent,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            name: 'guid',
                            component: i2.TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                            }
                        }
                    ]
                }
            ];
        };
        RxStartEventService.prototype.getModelFromDefinition = function (definition) {
            var elementModel = {
                description: '',
                guid: null,
                label: '',
                name: i1$2.RX_PROCESS_DEFINITION.processElementDisplayNames.startEvent,
                resourceType: i1$2.RX_PROCESS_DEFINITION.processElementResourceTypes.startEvent,
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.startEvent
            };
            if (definition) {
                elementModel = Object.assign(Object.assign({}, elementModel), { description: definition.description, guid: definition.guid, label: definition.name, name: definition.name, resourceType: definition.resourceType });
            }
            return elementModel;
        };
        RxStartEventService.prototype.getShape = function (options) {
            return new joint.shapes.rx.StartEvent({
                elementModel: this.getModelFromDefinition(),
                position: options.position
            });
        };
        RxStartEventService.prototype.setCommonDataDictionaryBranch = function (guid, dataDictionaryBranch) { };
        RxStartEventService.prototype.validate = function (model, availableCells) {
            var validationIssues = [];
            var inboundLinks = availableCells.filter(function (cell) { return cell.prop('targetNode') === model.guid; });
            if (!lodash.isEmpty(inboundLinks)) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.validation.inbound-sequence-flow.message'),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            var outboundLinks = availableCells.filter(function (cell) { return cell.prop('sourceNode') === model.guid; });
            if (outboundLinks.length != 1) {
                validationIssues.push({
                    type: uiKit.ValidationIssueType.Warning,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.validation.single-outbound-sequence-flow.message'),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            if (this.rxStringService.isEmptySafe(model.label)) {
                if (lodash.some(availableCells, function (cell) { return cell.prop('label') === model.label; })) {
                    validationIssues.push({
                        type: uiKit.ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', {
                            propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                        }),
                        data: {
                            guid: model.guid,
                            inspectorTabIndex: 1,
                            propertyName: 'label'
                        }
                    });
                }
            }
            return rxjs.of(validationIssues);
        };
        return RxStartEventService;
    }());
    RxStartEventService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventService, deps: [{ token: i1__namespace.RxStringService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxStartEventService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxStringService }, { type: i3__namespace.TranslateService }]; } });

    var RxStartEventRegistrationModule = /** @class */ (function () {
        function RxStartEventRegistrationModule(rxProcessElementRegistryService, rxStartEventService, translateService) {
            rxProcessElementRegistryService.register({
                displayName: translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.start-event.display-name.label'),
                elementService: rxStartEventService,
                group: i1$2.RX_PROCESS_DEFINITION.standardProcessElementGroups.events.name,
                paletteItem: {
                    border: i1.RX_DESIGNER.paletteItemBorder.solid,
                    label: i1.RX_DESIGNER.paletteItemLabel.outer,
                    shape: i1.RX_DESIGNER.paletteItemShape.circle
                },
                resourceType: i1$2.RX_PROCESS_DEFINITION.processElementResourceTypes.startEvent,
                shapeClass: RxStartEvent,
                shapeType: 'StartEvent',
                type: i1$2.RX_PROCESS_DEFINITION.processElementTypes.startEvent,
                viewShapeClass: RxStartEventView,
                viewShapeType: 'StartEventView'
            });
        }
        return RxStartEventRegistrationModule;
    }());
    RxStartEventRegistrationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventRegistrationModule, deps: [{ token: i1__namespace$1.RxProcessElementRegistryService }, { token: RxStartEventService }, { token: i3__namespace.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxStartEventRegistrationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventRegistrationModule });
    RxStartEventRegistrationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventRegistrationModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxStartEventRegistrationModule, decorators: [{
                type: i0.NgModule
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxProcessElementRegistryService }, { type: RxStartEventService }, { type: i3__namespace.TranslateService }]; } });

    var RxProcessElementService = /** @class */ (function () {
        function RxProcessElementService(rxIdService, rxJsonParserService, rxProcessElementSearchService) {
            this.rxIdService = rxIdService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxProcessElementSearchService = rxProcessElementSearchService;
        }
        // TODO-VS: remove in favour of getJsonObject
        RxProcessElementService.prototype.getGraph = function (definition) {
            var _this = this;
            var graph = this.rxJsonParserService.tryParseJson(definition.layout, { cells: [] });
            graph.cells.forEach(function (cell) {
                var embeddedElementIds = lodash.map(lodash.filter(graph.cells, { parent: cell.id }), 'id');
                if (lodash.startsWith(cell.type, 'rx.CallActivity')) {
                    cell.type = 'rx.CallActivity';
                }
                if (lodash.startsWith(cell.type, 'rx.ProcessActions')) {
                    cell.type = 'rx.ProcessAction';
                }
                if (embeddedElementIds.length) {
                    cell.embeds = embeddedElementIds;
                }
                cell.processDefinitionName = definition.name;
                var flowElement = _this.rxProcessElementSearchService.find(definition, {
                    guid: _this.rxIdService.get(cell.id)
                });
                if (flowElement === null || flowElement === void 0 ? void 0 : flowElement.multiInstanceLoopDefinition) {
                    cell.multiInstanceLoopDefinition = flowElement.multiInstanceLoopDefinition;
                }
            });
            return graph;
        };
        return RxProcessElementService;
    }());
    RxProcessElementService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementService, deps: [{ token: i1__namespace.RxIdService }, { token: i1__namespace.RxJsonParserService }, { token: i1__namespace$1.RxProcessElementSearchService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxProcessElementService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxIdService }, { type: i1__namespace.RxJsonParserService }, { type: i1__namespace$1.RxProcessElementSearchService }]; } });

    var RxProcessElementsModule = /** @class */ (function () {
        function RxProcessElementsModule() {
        }
        return RxProcessElementsModule;
    }());
    RxProcessElementsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxProcessElementsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsModule, imports: [i4.CommonModule,
            RxEndEventRegistrationModule,
            RxExpressionInputMapInspectorWidgetModule,
            i1.RxOverlayModule,
            RxProcessActionRegistrationModule,
            RxStartEventRegistrationModule] });
    RxProcessElementsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsModule, imports: [[
                i4.CommonModule,
                RxEndEventRegistrationModule,
                RxExpressionInputMapInspectorWidgetModule,
                i1.RxOverlayModule,
                RxProcessActionRegistrationModule,
                RxStartEventRegistrationModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxProcessElementsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            RxEndEventRegistrationModule,
                            RxExpressionInputMapInspectorWidgetModule,
                            i1.RxOverlayModule,
                            RxProcessActionRegistrationModule,
                            RxStartEventRegistrationModule
                        ]
                    }]
            }] });

    // https://github.com/clientIO/joint/issues/817
    // When the size of shape is changed, JointJS resizes shape`s body via scaling.
    // IE11 & MS-Edge do not support `vector-effect`, which results in changing stroke-width.
    // `refHeight` & `refWidth` attributes allow resizing rectangular sub-elements relative to the referenced element without scaling.
    joint.util.deepSupplement(joint.shapes.bpmn.Activity.prototype.defaults, {
        attrs: {
            '.body': {
                refWidth: 1,
                refHeight: 1
            }
        },
        // 1. Removed scalable group (<g class="scalable">) from the original template of Activity element
        // to resolve the issue of restoring the element size after undo/redo operations.
        // http://clientio.freshdesk.com/support/tickets/560
        // https://jira.bmc.com/browse/DRIST-8990
        // 2. Added multi instance icons
        markup: [
            '<g class="rotatable">',
            '<rect class="body outer"/>',
            '<rect class="body inner"/>',
            joint.env.test('svgforeignobject')
                ? '<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>'
                : '<text class="content"/>',
            '<g class="rx-icon-container">',
            '<image class="icon-multi-instance-sequential"/>',
            '<image class="icon-multi-instance-parallel"/>',
            '<path class="sub-process"/>',
            '</g>',
            '<image class="icon"/>',
            '</g>'
        ].join('')
    });
    exports.rx = void 0;
    (function (rx) {
        var BaseExpandableProcessShape = /** @class */ (function (_super) {
            __extends(BaseExpandableProcessShape, _super);
            function BaseExpandableProcessShape() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseExpandableProcessShape.prototype.initialize = function (options) {
                var _this = this;
                _super.prototype.initialize.call(this, options);
                var embeddedCells = this.getEmbeddedCells();
                var embedsWithoutBoundaryEventLength = lodash.size(lodash.reject(embeddedCells, 'isBoundaryEvent'));
                var modelEmbeds;
                if (embedsWithoutBoundaryEventLength === embeddedCells.length) {
                    modelEmbeds = this.get('embeds');
                }
                if (this.collection && this.get('expanded') && !embedsWithoutBoundaryEventLength && lodash.isUndefined(modelEmbeds)) {
                    i1.RxRootInjector.injector
                        .get(i1$2.RxProcessDefinitionCacheService)
                        .getProcessDefinition(this.get('processDefinitionName'))
                        .subscribe(function (processDefinition) {
                        var flowElement = i1.RxRootInjector.injector
                            .get(i1$2.RxProcessElementSearchService)
                            .findByGuid(processDefinition, "rx-" + _this.get('id')) || {};
                        _this.expand(processDefinition, i1.RxRootInjector.injector.get(RxProcessElementService).getGraph(flowElement));
                    });
                }
            };
            BaseExpandableProcessShape.prototype.expand = function (definition, graph) {
                var _this = this;
                graph.cells = lodash.sortBy(graph.cells, function (cell) { return cell.type === 'rx.SequenceFlow' || cell.type === 'rx.TextAnnotationAssociation'; });
                var cellModels = [];
                lodash.forEach(graph.cells, function (cell) {
                    var CellModel = joint.util.getByPath(_this.collection.cellNamespace, cell.type, '.');
                    var cellModel = new CellModel(cell);
                    if (cellModel.get('expanded')) {
                        var flowElement = i1.RxRootInjector.injector
                            .get(i1$2.RxProcessElementSearchService)
                            .findByGuid(definition, "rx-" + cellModel.get('id')) || {};
                        cellModel.expand.call(_this, definition, i1.RxRootInjector.injector.get(RxProcessElementService).getGraph(flowElement));
                    }
                    cellModels.push(cellModel);
                });
                this.collection.add(cellModels);
                this.attr({
                    '.sub-process': {
                        display: 'none',
                        visibility: 'hidden'
                    }
                });
            };
            return BaseExpandableProcessShape;
        }(joint.shapes.bpmn.Activity));
        rx.BaseExpandableProcessShape = BaseExpandableProcessShape;
        var BaseCallActivity = /** @class */ (function (_super) {
            __extends(BaseCallActivity, _super);
            function BaseCallActivity() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseCallActivity.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    activityType: 'call-activity',
                    expanded: false,
                    subProcess: true,
                    attrs: {
                        path: {
                            transform: 'scale(0.3, 0.3)',
                            'ref-dy': -15
                        },
                        rect: {
                            rx: 2,
                            ry: 2
                        }
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return BaseCallActivity;
        }(BaseExpandableProcessShape));
        rx.BaseCallActivity = BaseCallActivity;
        var BaseStaticMultiInstance = /** @class */ (function (_super) {
            __extends(BaseStaticMultiInstance, _super);
            function BaseStaticMultiInstance() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseStaticMultiInstance.initMultiInstanceIcons = function (model) {
                var attrs = lodash.cloneDeep(model.get('attrs'));
                var iconAttr = {
                    width: 10,
                    height: 10,
                    y: 1
                };
                attrs['.sub-process'] = {
                    d: 'M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15',
                    stroke: '#000000',
                    fill: 'transparent',
                    transform: 'scale(0.3, 0.3) translate(0, 6)'
                };
                attrs['.sub-process'].display = model.prop('subProcess') ? '' : 'none';
                attrs['.icon-multi-instance-sequential'] = lodash.cloneDeep(iconAttr);
                attrs['.icon-multi-instance-parallel'] = lodash.cloneDeep(iconAttr);
                attrs['.icon-multi-instance-sequential']['xlink:href'] =
                    i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.multiInstanceSequential;
                attrs['.icon-multi-instance-parallel']['xlink:href'] = i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons.multiInstanceParallel;
                attrs['.rx-icon-container'] = {
                    ref: '.body',
                    'x-alignment': 'middle',
                    'ref-x': 0.5,
                    'ref-dy': -15
                };
                lodash.defaults(attrs['.icon'], attrs.image);
                delete attrs.image;
                delete attrs.path;
                model.unset('attrs', { silent: true });
                model.set('attrs', attrs);
            };
            BaseStaticMultiInstance.updateMultiInstanceIcons = function (model) {
                var loopType = model.prop('loopType');
                var attrs = lodash.cloneDeep(model.get('attrs'));
                attrs['.icon-multi-instance-sequential'].display = loopType === 'true' ? '' : 'none';
                attrs['.icon-multi-instance-parallel'].display = loopType === 'false' ? '' : 'none';
                if (model.prop('subProcess')) {
                    attrs['.sub-process'].transform = loopType
                        ? 'scale(0.3, 0.3) translate(50, 6)'
                        : 'scale(0.3, 0.3) translate(0, 6)';
                }
                model.unset('attrs', { silent: true });
                model.set('attrs', attrs, { rxSilent: true });
            };
            return BaseStaticMultiInstance;
        }(joint.shapes.bpmn.Activity));
        rx.BaseStaticMultiInstance = BaseStaticMultiInstance;
        var BaseMultiInstance = /** @class */ (function (_super) {
            __extends(BaseMultiInstance, _super);
            function BaseMultiInstance() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseMultiInstance.prototype.initialize = function (options) {
                _super.prototype.initialize.call(this, options);
                if (options.multiInstanceLoopDefinition) {
                    this.prop('loopType', String(options.multiInstanceLoopDefinition.isSequential), { silent: true });
                }
                BaseStaticMultiInstance.initMultiInstanceIcons(this);
                BaseStaticMultiInstance.updateMultiInstanceIcons(this);
            };
            return BaseMultiInstance;
        }(joint.shapes.bpmn.Activity));
        rx.BaseMultiInstance = BaseMultiInstance;
        var CallActivity = /** @class */ (function (_super) {
            __extends(CallActivity, _super);
            function CallActivity() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CallActivity.prototype.initialize = function (options) {
                _super.prototype.initialize.call(this, options);
                if (options.multiInstanceLoopDefinition) {
                    this.prop('loopType', String(options.multiInstanceLoopDefinition.isSequential), { silent: true });
                }
                BaseStaticMultiInstance.initMultiInstanceIcons(this);
                BaseStaticMultiInstance.updateMultiInstanceIcons(this);
            };
            CallActivity.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.CallActivity'
                }, BaseCallActivity.prototype.defaults());
            };
            return CallActivity;
        }(BaseCallActivity));
        rx.CallActivity = CallActivity;
        var Connector = /** @class */ (function (_super) {
            __extends(Connector, _super);
            function Connector() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Connector.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.Connector',
                    icon: 'connector',
                    attrs: {
                        '.icon': {
                            width: 12,
                            height: 12,
                            'ref-x': 3,
                            'ref-y': 3
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return Connector;
        }(BaseMultiInstance));
        rx.Connector = Connector;
        var EndEvent = /** @class */ (function (_super) {
            __extends(EndEvent, _super);
            function EndEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EndEvent.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.EndEvent',
                    eventType: 'end',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Event.prototype.defaults);
            };
            return EndEvent;
        }(joint.shapes.bpmn.Event));
        rx.EndEvent = EndEvent;
        var ErrorBoundaryEvent = /** @class */ (function (_super) {
            __extends(ErrorBoundaryEvent, _super);
            function ErrorBoundaryEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ErrorBoundaryEvent.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.ErrorBoundaryEvent',
                    eventType: 'intermediate',
                    icon: 'errorBoundary',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Event.prototype.defaults);
            };
            return ErrorBoundaryEvent;
        }(joint.shapes.bpmn.Event));
        rx.ErrorBoundaryEvent = ErrorBoundaryEvent;
        var ErrorEndEvent = /** @class */ (function (_super) {
            __extends(ErrorEndEvent, _super);
            function ErrorEndEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ErrorEndEvent.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.ErrorEndEvent',
                    eventType: 'end',
                    icon: 'errorEnd',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Event.prototype.defaults);
            };
            return ErrorEndEvent;
        }(joint.shapes.bpmn.Event));
        rx.ErrorEndEvent = ErrorEndEvent;
        var ExclusiveGateway = /** @class */ (function (_super) {
            __extends(ExclusiveGateway, _super);
            function ExclusiveGateway() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ExclusiveGateway.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.ExclusiveGateway',
                    icon: 'cross',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Gateway.prototype.defaults);
            };
            return ExclusiveGateway;
        }(joint.shapes.bpmn.Gateway));
        rx.ExclusiveGateway = ExclusiveGateway;
        var ParallelGateway = /** @class */ (function (_super) {
            __extends(ParallelGateway, _super);
            function ParallelGateway() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ParallelGateway.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.ParallelGateway',
                    icon: 'plus',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Gateway.prototype.defaults);
            };
            return ParallelGateway;
        }(joint.shapes.bpmn.Gateway));
        rx.ParallelGateway = ParallelGateway;
        var ProcessAction = /** @class */ (function (_super) {
            __extends(ProcessAction, _super);
            function ProcessAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ProcessAction.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.ProcessAction',
                    icon: 'gear',
                    attrs: {
                        '.icon': {
                            width: 12,
                            height: 12,
                            'ref-x': 3,
                            'ref-y': 3
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    },
                    size: {
                        width: 70,
                        height: 60
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return ProcessAction;
        }(joint.shapes.bpmn.Activity));
        rx.ProcessAction = ProcessAction;
        var ReceiveTask = /** @class */ (function (_super) {
            __extends(ReceiveTask, _super);
            function ReceiveTask() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ReceiveTask.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.ReceiveTask',
                    icon: 'message',
                    attrs: {
                        '.icon': {
                            width: 12,
                            height: 12,
                            'ref-x': 3,
                            'ref-y': 3
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return ReceiveTask;
        }(BaseMultiInstance));
        rx.ReceiveTask = ReceiveTask;
        var SequenceFlow = /** @class */ (function (_super) {
            __extends(SequenceFlow, _super);
            function SequenceFlow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SequenceFlow.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.SequenceFlow',
                    router: {
                        name: 'manhattan',
                        args: {
                            step: 5
                        }
                    }
                }, joint.shapes.bpmn.Flow.prototype.defaults);
            };
            return SequenceFlow;
        }(joint.shapes.bpmn.Flow));
        rx.SequenceFlow = SequenceFlow;
        var StartEvent = /** @class */ (function (_super) {
            __extends(StartEvent, _super);
            function StartEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StartEvent.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.StartEvent',
                    eventType: 'start',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Event.prototype.defaults);
            };
            return StartEvent;
        }(joint.shapes.bpmn.Event));
        rx.StartEvent = StartEvent;
        var SubProcess = /** @class */ (function (_super) {
            __extends(SubProcess, _super);
            function SubProcess() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SubProcess.prototype.initialize = function (options) {
                _super.prototype.initialize.call(this, options);
                if (options.multiInstanceLoopDefinition) {
                    this.prop('loopType', String(options.multiInstanceLoopDefinition.isSequential), { silent: true });
                }
                BaseStaticMultiInstance.initMultiInstanceIcons(this);
                BaseStaticMultiInstance.updateMultiInstanceIcons(this);
            };
            SubProcess.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.SubProcess',
                    activityType: 'event-sub-process',
                    expanded: false,
                    subProcess: true,
                    attrs: {
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return SubProcess;
        }(BaseExpandableProcessShape));
        rx.SubProcess = SubProcess;
        var TextAnnotation = /** @class */ (function (_super) {
            __extends(TextAnnotation, _super);
            function TextAnnotation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextAnnotation.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.TextAnnotation',
                    attrs: {
                        rect: {
                            rx: 2,
                            ry: 2
                        }
                    }
                }, joint.shapes.bpmn.Annotation.prototype.defaults);
            };
            return TextAnnotation;
        }(joint.shapes.bpmn.Annotation));
        rx.TextAnnotation = TextAnnotation;
        var TextAnnotationAssociation = /** @class */ (function (_super) {
            __extends(TextAnnotationAssociation, _super);
            function TextAnnotationAssociation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextAnnotationAssociation.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.TextAnnotationAssociation',
                    flowType: 'association'
                }, joint.shapes.bpmn.Flow.prototype.defaults);
            };
            return TextAnnotationAssociation;
        }(joint.shapes.bpmn.Flow));
        rx.TextAnnotationAssociation = TextAnnotationAssociation;
        var TimerEvent = /** @class */ (function (_super) {
            __extends(TimerEvent, _super);
            function TimerEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TimerEvent.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.TimerEvent',
                    eventType: 'intermediate',
                    icon: 'clock',
                    attrs: {
                        '.label': {
                            fill: 'gray'
                        }
                    }
                }, joint.shapes.bpmn.Event.prototype.defaults);
            };
            return TimerEvent;
        }(joint.shapes.bpmn.Event));
        rx.TimerEvent = TimerEvent;
        var UserTask = /** @class */ (function (_super) {
            __extends(UserTask, _super);
            function UserTask() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UserTask.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.UserTask',
                    icon: 'user',
                    attrs: {
                        '.icon': {
                            width: 12,
                            height: 12,
                            'ref-x': 3,
                            'ref-y': 3
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return UserTask;
        }(BaseMultiInstance));
        rx.UserTask = UserTask;
        var WebRequest = /** @class */ (function (_super) {
            __extends(WebRequest, _super);
            function WebRequest() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WebRequest.prototype.defaults = function () {
                return joint.util.deepSupplement({
                    type: 'rx.WebRequest',
                    icon: 'webRequest',
                    attrs: {
                        '.icon': {
                            width: 12,
                            height: 12,
                            'ref-x': 3,
                            'ref-y': 3
                        },
                        rect: {
                            rx: 4,
                            ry: 4
                        }
                    }
                }, joint.shapes.bpmn.Activity.prototype.defaults);
            };
            return WebRequest;
        }(joint.shapes.bpmn.Activity));
        rx.WebRequest = WebRequest;
    })(exports.rx || (exports.rx = {}));

    var processShapes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get rx () { return exports.rx; }
    });

    var RxDesignerCellHighlighter = /** @class */ (function (_super) {
        __extends(RxDesignerCellHighlighter, _super);
        function RxDesignerCellHighlighter(cellView) {
            var _this = _super.call(this) || this;
            _this.selectors = {
                bpmn: {
                    'bpmn.Event': '.scalable circle.outer',
                    'bpmn.Annotation': '.rotatable path.stroke',
                    link: 'path.connection',
                    'bpmn.Flow': 'path.connection',
                    'bpmn.Gateway': '.scalable polygon.body',
                    'bpmn.Activity': '.scalable rect.outer',
                    'basic.Rect': '.scalable rect'
                },
                rx: {
                    'rx.TextAnnotation': '.rotatable path.stroke',
                    'rx.TextAnnotationAssociation': 'path.connection',
                    'rx.SequenceFlow': 'path.connection',
                    'rx.ParallelGateway': '.scalable polygon.body',
                    'rx.ExclusiveGateway': '.scalable polygon.body',
                    'rx.StartEvent': '.scalable circle.outer',
                    'rx.EndEvent': '.scalable circle.outer',
                    'rx.SubProcess': '.rotatable rect.outer',
                    'rx.ReceiveTask': '.rotatable rect.outer',
                    'rx.UserTask': '.rotatable rect.outer',
                    'rx.Connector': '.rotatable rect.outer',
                    'rx.TimerEvent': '.scalable circle.outer',
                    'rx.WebRequest': '.rotatable rect.outer'
                }
            };
            _this.cellView = cellView;
            _this.listenTo(_this.cellView.paper, 'scale translate', _this.update);
            _this.$el = _this.cellView.$el;
            return _this;
        }
        RxDesignerCellHighlighter.prototype.init = function (options) {
            this.options = lodash.extend({}, lodash.result(this, 'options'), options || {});
            this.cellView.model.on('remove', this.eraseHighlightAndRemove);
            this.update();
        };
        RxDesignerCellHighlighter.prototype.update = function () {
            this.eraseHighlight();
            this.drawHighlight();
        };
        RxDesignerCellHighlighter.prototype.eraseHighlightAndRemove = function (evt) {
            this.eraseHighlight();
            Backbone__namespace.View.prototype.remove.apply(this, arguments);
        };
        RxDesignerCellHighlighter.prototype.eraseHighlight = function () {
            if (this.cellViewHighlighter) {
                this.cellViewHighlighter.remove();
            }
        };
        RxDesignerCellHighlighter.prototype.drawHighlight = function () {
            var selector;
            switch (true) {
                case this.cellView.model instanceof exports.rx.ProcessAction:
                case this.cellView.model instanceof exports.rx.BaseCallActivity:
                    selector = '.rotatable rect.outer';
                    break;
                default:
                    selector =
                        this.selectors.rx[this.cellView.model.prop('type')] || this.selectors.bpmn[this.cellView.model.prop('type')];
            }
            var shape = this.cellView.$el.find(selector).first();
            var highlight = shape[0] ? V(shape[0]).clone() : undefined;
            if (highlight) {
                highlight.attr({
                    stroke: this.options.color,
                    'stroke-width': this.options.strokeWidth
                });
                if (highlight.node.tagName === 'circle') {
                    highlight.attr({
                        r: this.options.circleRadius
                    });
                }
                this.cellViewHighlighter = highlight;
                shape.closest('g').prepend(highlight.node);
            }
        };
        return RxDesignerCellHighlighter;
    }(Backbone__namespace.View));

    var RxRappidPaperService = /** @class */ (function () {
        function RxRappidPaperService(rxIdService, rxProcessElementService, rxProcessElementSearchService, rxTreeService) {
            this.rxIdService = rxIdService;
            this.rxProcessElementService = rxProcessElementService;
            this.rxProcessElementSearchService = rxProcessElementSearchService;
            this.rxTreeService = rxTreeService;
            this.green = '#89c341';
            this.gray = '#999999';
            this.red = '#f83200';
            lodash.assign(joint.shapes.bpmn.icons, i1.RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons);
        }
        RxRappidPaperService.prototype.init = function (element, graph, shouldZoomToFit) {
            if (shouldZoomToFit === void 0) { shouldZoomToFit = false; }
            // : PaperScroller
            // Do not instantiate paper with width or height parameters equal to 0, (e.g element is hidden in the DOM),
            // otherwise it will cause RappidJS issue in the Firefox Browser. See DRIST-18107 for more details.
            var paper = new joint.dia.Paper({
                width: element.width || 1,
                height: element.height || 1,
                model: new joint.dia.Graph({}, {
                    cellNamespace: processShapes
                }),
                cellViewNamespace: processShapes,
                interactive: false,
                // specifying a non-existent theme to prevent rappid from overriding our styles
                // due to 'default' theme being applied
                theme: 'rx'
            });
            var paperScroller = new joint.ui.PaperScroller({
                autoResizePaper: true,
                paper: paper,
                padding: {
                    padding: 10
                }
            });
            element.appendChild(paperScroller.render().el);
            paperScroller.options.paper.on('blank:pointerdown', paperScroller.startPanning);
            this.resetScroll(paperScroller);
            if (graph) {
                paperScroller.options.paper.model.fromJSON(graph);
                if (shouldZoomToFit) {
                    this.zoomToFit(paperScroller);
                }
            }
            return paperScroller;
        };
        RxRappidPaperService.prototype.setGraph = function (paperScroller, processDefinition, processInstance, shouldZoomToFit) {
            var _this = this;
            if (shouldZoomToFit === void 0) { shouldZoomToFit = false; }
            var graph = this.rxProcessElementService.getGraph(processDefinition);
            var paper = paperScroller.options.paper;
            paper.model.fromJSON(graph);
            if (shouldZoomToFit) {
                this.zoomToFit(paperScroller);
            }
            lodash.forEach(processInstance.activities, function (activity) {
                var activityId = _this.rxIdService.getBase(activity.activityId);
                var cell = paper.findViewByModel(activityId);
                if (cell) {
                    if (activity.activities.length && cell.model.get('expanded')) {
                        var subProcessActivities = _this.rxTreeService.flattenTree(activity, 'activities');
                        var elements = paper.model.getElements();
                        var graphIds_1 = lodash.map(elements, 'id');
                        var originalGraphIds_1 = lodash.compact(lodash.map(elements, function (element) { return element.get('originalGuid'); }));
                        lodash.forEach(subProcessActivities, function (subProcessActivity) {
                            // we need to do this check in order to filter inner elements that are in process
                            // instance json but are not present in graph as their parent is not expanded
                            if (lodash.includes(graphIds_1, _this.rxIdService.getBase(subProcessActivity.activityId))) {
                                _this.highlightActivity(subProcessActivity, paper, processDefinition);
                            }
                            else if (originalGraphIds_1 && lodash.includes(originalGraphIds_1, subProcessActivity.activityId)) {
                                _this.highlightActivity(subProcessActivity, paper, processDefinition);
                            }
                        });
                        _this.highlightActivity(activity, paper, processDefinition);
                    }
                    else {
                        _this.highlightActivity(activity, paper, processDefinition);
                    }
                }
            });
            if (processInstance.exceptionMessage) {
                // exceptionMessage will be like <activityName>(<acitivityGuid>) - [<errorMessage>]
                // RegExp - find guid from exceptionMessage
                var guidPattern = new RegExp('\\((' + i1$1.RX_GUID.baseIdPattern + ')\\)', 'i');
                var activityId = guidPattern.exec(processInstance.exceptionMessage);
                if (activityId[0]) {
                    var activityBaseId = this.rxIdService.getBase(activityId[1]);
                    this.highlightCell(activityBaseId, paper, this.red, processDefinition);
                }
            }
            this.resetScroll(paperScroller);
        };
        RxRappidPaperService.prototype.highlight = function (cellView, color) {
            if (cellView instanceof joint.dia.CellView) {
                var cellHighlighter = new RxDesignerCellHighlighter(cellView);
                cellHighlighter.init({
                    strokeWidth: 10,
                    color: color
                });
            }
        };
        RxRappidPaperService.prototype.highlightActivity = function (activity, paper, plainProcessDefinition) {
            var activityId = this.rxIdService.getBase(activity.activityId);
            var color = activity.endTime ? this.gray : this.green;
            this.highlightCell(activityId, paper, color, plainProcessDefinition);
        };
        RxRappidPaperService.prototype.highlightCell = function (cellId, paper, color, plainProcessDefinition) {
            var _this = this;
            var elements = paper.model.getElements();
            var cell;
            var cellView;
            if (!lodash.includes(lodash.map(elements, 'id'), cellId)) {
                cell = lodash.find(elements, function (element) { return element.get('originalGuid') === _this.rxIdService.get(cellId); });
                cellId = cell ? cell.id : cellId;
            }
            cellView = paper.findViewByModel(cellId);
            if (cellView) {
                this.highlight(cellView, color);
            }
            else {
                this.highlightVisibleErroredCell(cellId, false, paper, plainProcessDefinition);
                // Used to highlight errored cell inside expanded sub-processes
                paper.model.on('change', lodash.debounce(function () {
                    _this.highlightVisibleErroredCell(cellId, true, paper, plainProcessDefinition);
                }, 100));
            }
        };
        RxRappidPaperService.prototype.highlightVisibleErroredCell = function (cellId, isFirstEntry, paper, plainProcessDefinition) {
            var owner = this.rxProcessElementSearchService.findOwner(plainProcessDefinition, this.rxIdService.get(cellId));
            var cellView;
            var erroredElement;
            if (isFirstEntry) {
                erroredElement = lodash.find(owner.flowElements, { guid: this.rxIdService.get(cellId) });
                cellView = paper.findViewByModel(this.rxIdService.getBase(erroredElement.guid));
            }
            if (!cellView) {
                cellView = paper.findViewByModel(this.rxIdService.getBase(owner.guid));
            }
            if (cellView) {
                this.highlight(cellView, this.red);
            }
            else {
                this.highlightVisibleErroredCell(owner.guid, false, paper, plainProcessDefinition);
            }
        };
        RxRappidPaperService.prototype.resetScroll = function (paperScroller) {
            paperScroller.el.scrollTop = 0;
            paperScroller.el.scrollLeft = 0;
        };
        RxRappidPaperService.prototype.zoomToFit = function (paperScroller) {
            setTimeout(function () {
                paperScroller.zoomToFit({
                    padding: 10
                });
            });
        };
        return RxRappidPaperService;
    }());
    RxRappidPaperService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRappidPaperService, deps: [{ token: i1__namespace.RxIdService }, { token: RxProcessElementService }, { token: i1__namespace$1.RxProcessElementSearchService }, { token: i1__namespace.RxTreeService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRappidPaperService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRappidPaperService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRappidPaperService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxIdService }, { type: RxProcessElementService }, { type: i1__namespace$1.RxProcessElementSearchService }, { type: i1__namespace.RxTreeService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RxEndEventRegistrationModule = RxEndEventRegistrationModule;
    exports.RxEndEventService = RxEndEventService;
    exports.RxExpressionInputMapInspectorWidgetComponent = RxExpressionInputMapInspectorWidgetComponent;
    exports.RxExpressionInputMapInspectorWidgetModule = RxExpressionInputMapInspectorWidgetModule;
    exports.RxProcessAction = RxProcessAction;
    exports.RxProcessActionExpressionConfigurator = RxProcessActionExpressionConfigurator;
    exports.RxProcessActionRegistrationModule = RxProcessActionRegistrationModule;
    exports.RxProcessActionService = RxProcessActionService;
    exports.RxProcessActionView = RxProcessActionView;
    exports.RxProcessElementService = RxProcessElementService;
    exports.RxProcessElementsModule = RxProcessElementsModule;
    exports.RxProcessService = RxProcessService;
    exports.RxProcessShapeMixin = RxProcessShapeMixin;
    exports.RxProcessShapeViewMixin = RxProcessShapeViewMixin;
    exports.RxRappidPaperService = RxRappidPaperService;
    exports.RxStartEventRegistrationModule = RxStartEventRegistrationModule;
    exports.RxStartEventService = RxStartEventService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-process-elements.umd.js.map
