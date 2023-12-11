(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@helix/platform/view/api'), require('lodash'), require('@angular/common'), require('@helix/platform/utils'), require('@helix/platform/shared/api'), require('@helix/platform/ui-kit'), require('@helix/platform/record/api'), require('@helix/platform/process/api'), require('@helix/platform/association/api'), require('@angular/forms'), require('@bmc-ux/adapt-angular'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/view/runtime', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@helix/platform/view/api', 'lodash', '@angular/common', '@helix/platform/utils', '@helix/platform/shared/api', '@helix/platform/ui-kit', '@helix/platform/record/api', '@helix/platform/process/api', '@helix/platform/association/api', '@angular/forms', '@bmc-ux/adapt-angular', '@ngx-translate/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.view = global.helix.platform.view || {}, global.helix.platform.view.runtime = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.helix.platform.view.api, global.lodash, global.ng.common, global.helix.platform.utils, global.helix.platform.shared.api, global.helix.platform["ui-kit"], global.helix.platform.record.api, global.helix.platform.process.api, global.helix.platform.association.api, global.ng.forms, global.adaptAngular, global.ngxTranslateCore));
})(this, (function (exports, i0, rxjs, operators, i2$1, lodash, i2, i2$2, i1, i2$3, i2$4, i5, i8, forms, i4, i3) { 'use strict';

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
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace$3 = /*#__PURE__*/_interopNamespace(i2$3);
    var i2__namespace$4 = /*#__PURE__*/_interopNamespace(i2$4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var RuntimeViewCanvasService = /** @class */ (function () {
        function RuntimeViewCanvasService() {
            this.componentPropertyChangedSubject = new rxjs.Subject();
            this.componentPropertyChanged$ = this.componentPropertyChangedSubject.asObservable();
        }
        RuntimeViewCanvasService.prototype.onViewComponentPropertyChanged = function (componentPropertyChange) {
            this.componentPropertyChangedSubject.next(componentPropertyChange);
        };
        return RuntimeViewCanvasService;
    }());
    RuntimeViewCanvasService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RuntimeViewCanvasService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasService, decorators: [{
                type: i0.Injectable
            }] });

    var RuntimeViewCanvasItemService = /** @class */ (function () {
        function RuntimeViewCanvasItemService(injector, componentFactoryResolver, runtimeViewCanvasService) {
            this.injector = injector;
            this.componentFactoryResolver = componentFactoryResolver;
            this.runtimeViewCanvasService = runtimeViewCanvasService;
            this.hasMargin = true;
            this.hasAutoFill = false;
            this.hasAutoScroll = false;
            this.isHidden = false;
            this.destroyed$ = new rxjs.ReplaySubject(1);
        }
        RuntimeViewCanvasItemService.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        RuntimeViewCanvasItemService.prototype.registerOutlet = function (outletName, outletViewContainerRef, containerComponent) {
            var currentOutlet = this.layout.outlets.find(function (outlet) { return outlet.name === outletName; });
            if (currentOutlet) {
                this.renderContainerComponent(outletViewContainerRef, currentOutlet, containerComponent);
            }
        };
        RuntimeViewCanvasItemService.prototype.getChildren = function (outletName) {
            var currentOutlet = this.layout.outlets.find(function (outlet) { return outlet.name === outletName; });
            return currentOutlet.columns.map(function (column) { return (Object.assign(Object.assign({}, column), { children: column.children
                    .filter(Boolean)
                    .map(function (child) { return lodash.pick(child, 'config', 'guid', 'runtimeViewModelApi', 'factory', 'outlets'); }) })); });
        };
        RuntimeViewCanvasItemService.prototype.renderViewComponent = function () {
            var _this = this;
            var _a, _b, _c, _d;
            this.componentRef = this.container.createComponent(this.layout.factory, null, this.injector);
            this.componentInstance = this.componentRef.instance;
            this.componentInstance.guid = this.layout.guid;
            this.componentInstance.config = this.layout.config;
            this.componentInstance.runtimeViewModelApi = this.layout.runtimeViewModelApi;
            (_a = this.componentInstance.propertyChanged) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroyed$)).subscribe(function (propertyChange) {
                _this.runtimeViewCanvasService.onViewComponentPropertyChanged(propertyChange);
            });
            // Update hasMargin, hasAutoScroll, and hasAutoFill property bindings asynchronously using timeout
            // to trigger change detection. Otherwise "ExpressionChangedAfterItHasBeenCheckedError" will occur.
            (_b = this.componentInstance.hidden) === null || _b === void 0 ? void 0 : _b.pipe(operators.skipWhile(function (value) { return !value; }), operators.distinctUntilChanged(), operators.delay(0), operators.takeUntil(this.destroyed$)).subscribe(function (hidden) {
                _this.hasMargin = !hidden;
                _this.isHidden = hidden;
            });
            (_c = this.componentInstance.autoScroll) === null || _c === void 0 ? void 0 : _c.pipe(operators.skipWhile(function (value) { return !value; }), operators.distinctUntilChanged(), operators.delay(0), operators.takeUntil(this.destroyed$)).subscribe(function (autoScroll) {
                _this.hasAutoScroll = autoScroll;
            });
            (_d = this.componentInstance.autoFill) === null || _d === void 0 ? void 0 : _d.pipe(operators.skipWhile(function (value) { return !value; }), operators.distinctUntilChanged(), operators.delay(0), operators.takeUntil(this.destroyed$)).subscribe(function (autoFill) {
                _this.hasAutoFill = autoFill;
            });
        };
        RuntimeViewCanvasItemService.prototype.renderContainerComponent = function (outletViewContainerRef, currentOutlet, containerComponent) {
            var containerComponentFactory = containerComponent;
            var containerRef = outletViewContainerRef.createComponent(containerComponentFactory);
            containerRef.instance.columns = currentOutlet.columns;
            containerRef.instance.outlet = currentOutlet;
        };
        return RuntimeViewCanvasItemService;
    }());
    RuntimeViewCanvasItemService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemService, deps: [{ token: i0__namespace.Injector }, { token: i0__namespace.ComponentFactoryResolver }, { token: RuntimeViewCanvasService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RuntimeViewCanvasItemService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i0__namespace.ComponentFactoryResolver }, { type: RuntimeViewCanvasService }]; } });

    var RuntimeViewCanvasItemComponent = /** @class */ (function () {
        function RuntimeViewCanvasItemComponent(runtimeViewCanvasItemService) {
            this.runtimeViewCanvasItemService = runtimeViewCanvasItemService;
        }
        Object.defineProperty(RuntimeViewCanvasItemComponent.prototype, "hasMargin", {
            get: function () {
                return this.runtimeViewCanvasItemService.hasMargin;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RuntimeViewCanvasItemComponent.prototype, "hasAutoFill", {
            get: function () {
                return this.runtimeViewCanvasItemService.hasAutoFill && !this.runtimeViewCanvasItemService.isHidden;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RuntimeViewCanvasItemComponent.prototype, "hasAutoScroll", {
            get: function () {
                return this.runtimeViewCanvasItemService.hasAutoScroll;
            },
            enumerable: false,
            configurable: true
        });
        RuntimeViewCanvasItemComponent.prototype.ngOnChanges = function (changes) {
            if (!this.runtimeViewCanvasItemService.container) {
                this.runtimeViewCanvasItemService.container = this.container;
            }
            if (changes.layout.currentValue) {
                this.runtimeViewCanvasItemService.layout = changes.layout.currentValue;
                if (changes.layout.previousValue) {
                    this.container.clear();
                }
                this.runtimeViewCanvasItemService.renderViewComponent();
            }
        };
        RuntimeViewCanvasItemComponent.prototype.registerOutlet = function (outletName, outletViewContainerRef) {
            this.runtimeViewCanvasItemService.registerOutlet(outletName, outletViewContainerRef);
        };
        RuntimeViewCanvasItemComponent.prototype.getChildren = function (outletName) {
            return this.runtimeViewCanvasItemService.getChildren(outletName);
        };
        return RuntimeViewCanvasItemComponent;
    }());
    RuntimeViewCanvasItemComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemComponent, deps: [{ token: RuntimeViewCanvasItemService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewCanvasItemComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: { layout: "layout" }, host: { properties: { "class.rx-runtime-view-canvas-item-margin": "this.hasMargin", "class.rx-runtime-view-canvas-item-auto-fill": "this.hasAutoFill", "class.rx-runtime-view-canvas-item-auto-scroll": "this.hasAutoScroll" } }, providers: [RuntimeViewCanvasItemService], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-container #container></ng-container>\n" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-canvas-item',
                        templateUrl: './runtime-view-canvas-item.component.html',
                        providers: [RuntimeViewCanvasItemService]
                    }]
            }], ctorParameters: function () { return [{ type: RuntimeViewCanvasItemService }]; }, propDecorators: { layout: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef, static: true }]
                }], hasMargin: [{
                    type: i0.HostBinding,
                    args: ['class.rx-runtime-view-canvas-item-margin']
                }], hasAutoFill: [{
                    type: i0.HostBinding,
                    args: ['class.rx-runtime-view-canvas-item-auto-fill']
                }], hasAutoScroll: [{
                    type: i0.HostBinding,
                    args: ['class.rx-runtime-view-canvas-item-auto-scroll']
                }] } });

    var RuntimeViewCanvasItemContainerComponent = /** @class */ (function () {
        function RuntimeViewCanvasItemContainerComponent() {
            this.columns = [];
        }
        Object.defineProperty(RuntimeViewCanvasItemContainerComponent.prototype, "hostClass", {
            get: function () {
                if (this.outlet.height) {
                    return this.outlet.height + "px";
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        RuntimeViewCanvasItemContainerComponent.prototype.trackByFn = function (index, item) {
            return (item === null || item === void 0 ? void 0 : item.guid) || index;
        };
        return RuntimeViewCanvasItemContainerComponent;
    }());
    RuntimeViewCanvasItemContainerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemContainerComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewCanvasItemContainerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasItemContainerComponent, selector: "rx-runtime-view-canvas-item-container", inputs: { columns: "columns", outlet: "outlet" }, host: { properties: { "style.min-height": "this.hostClass" } }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"columns.length > 1\">\n  <div class=\"row rx-runtime-view-canvas-item-container-row\">\n    <div\n      class=\"rx-runtime-view-canvas-item-container-column\"\n      [ngClass]=\"column.cssClass ? column.cssClass : column.span ? 'col-' + column.span : 'col'\"\n      *ngFor=\"let column of columns\"\n    >\n      <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: column.children }\"></ng-container>\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"columns.length === 1\">\n  <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: columns[0].children }\"></ng-container>\n</ng-container>\n\n<ng-template #itemTpl let-layoutItems>\n  <rx-runtime-view-canvas-item\n    #item\n    *ngFor=\"let layoutItem of layoutItems; trackBy: trackByFn\"\n    [layout]=\"layoutItem\"\n  ></rx-runtime-view-canvas-item>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-runtime-view-canvas-item{display:block}::ng-deep .rx-runtime-view-canvas-item-margin:not(:last-child){margin-bottom:1rem}.rx-runtime-view-canvas-item-auto-fill,.rx-runtime-view-canvas-item-container-row,.rx-runtime-view-canvas-item-container-column{height:100%}.rx-runtime-view-canvas-item-container-column{display:flex;flex-direction:column}.rx-runtime-view-canvas-item-auto-scroll{overflow-y:auto}.rx-mb-sm{margin-bottom:1rem}@media (min-width: 576px){.rx-mb-sm{margin-bottom:0}}.rx-mb-sm:nth-last-child(1){margin-bottom:0}.rx-mb-md{margin-bottom:1rem}@media (min-width: 768px){.rx-mb-md{margin-bottom:0}}.rx-mb-md:nth-last-child(1){margin-bottom:0}.rx-mb-lg{margin-bottom:1rem}@media (min-width: 992px){.rx-mb-lg{margin-bottom:0}}.rx-mb-lg:nth-last-child(1){margin-bottom:0}.rx-mb-xl{margin-bottom:1rem}@media (min-width: 1200px){.rx-mb-xl{margin-bottom:0}}.rx-mb-xl:nth-last-child(1){margin-bottom:0}.rx-mb-xxl{margin-bottom:1rem}@media (min-width: 1600px){.rx-mb-xxl{margin-bottom:0}}.rx-mb-xxl:nth-last-child(1){margin-bottom:0}\n"], components: [{ type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasItemContainerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-canvas-item-container',
                        templateUrl: './runtime-view-canvas-item-container.component.html',
                        styleUrls: ['./runtime-view-canvas-item-container.component.scss']
                    }]
            }], propDecorators: { columns: [{
                    type: i0.Input
                }], outlet: [{
                    type: i0.Input
                }], hostClass: [{
                    type: i0.HostBinding,
                    args: ['style.min-height']
                }] } });

    var RuntimeViewRootComponent = /** @class */ (function () {
        function RuntimeViewRootComponent(runtimeCanvasItemComponent) {
            this.runtimeCanvasItemComponent = runtimeCanvasItemComponent;
            this.defaultOutletName = i2$1.RX_VIEW_DEFINITION.defaultOutletName;
            this.layoutRole = i2$1.ViewLayoutRole;
        }
        RuntimeViewRootComponent.prototype.isHidden = function (outlet) {
            return outlet.name === i2$1.ViewLayoutRole.Header && outlet.columns[0].children.length === 0;
        };
        return RuntimeViewRootComponent;
    }());
    RuntimeViewRootComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewRootComponent, deps: [{ token: RuntimeViewCanvasItemComponent }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewRootComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewRootComponent, selector: "rx-runtime-view-root", ngImport: i0__namespace, template: "<rx-runtime-view-canvas-item-container\n  *ngFor=\"let outlet of runtimeCanvasItemComponent.layout.outlets\"\n  [hidden]=\"isHidden(outlet)\"\n  [columns]=\"outlet.columns\"\n  [outlet]=\"outlet\"\n  [ngClass]=\"{\n    'content-outlet': outlet.name === defaultOutletName,\n    'outlet-padding': [layoutRole.Header, layoutRole.Footer, defaultOutletName].includes(outlet.name)\n  }\"\n></rx-runtime-view-canvas-item-container>\n", styles: [":host{display:flex;flex-direction:column;height:100%;overflow:hidden}rx-runtime-view-canvas-item-container{padding:0 1rem}.outlet-padding{padding:1rem}.content-outlet{flex:1;overflow-y:auto;overflow-x:hidden}\n"], components: [{ type: RuntimeViewCanvasItemContainerComponent, selector: "rx-runtime-view-canvas-item-container", inputs: ["columns", "outlet"] }], directives: [{ type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewRootComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-root',
                        templateUrl: './runtime-component.html',
                        styleUrls: ['./runtime-component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: RuntimeViewCanvasItemComponent }]; } });

    var RuntimeLayoutOutletColumn = /** @class */ (function () {
        function RuntimeLayoutOutletColumn() {
            this.children = [];
        }
        return RuntimeLayoutOutletColumn;
    }());
    var RuntimeLayoutOutlet = /** @class */ (function () {
        function RuntimeLayoutOutlet() {
            this.children = [];
            this.columns = [new RuntimeLayoutOutletColumn()];
            this.height = null;
        }
        return RuntimeLayoutOutlet;
    }());

    var RuntimeLayoutItem = /** @class */ (function () {
        function RuntimeLayoutItem(options) {
            this.outlets = [];
            this.parent = null;
            this.runtimeViewModelApi = null;
            Object.assign(this, {
                guid: options.guid,
                config: options.config,
                parent: options.parent,
                runtimeViewModelApi: options.runtimeViewModelApi,
                factory: options.factory
            });
            if (options.outlets) {
                this.initializeOutlets(options.outlets);
            }
        }
        RuntimeLayoutItem.prototype.initializeOutlets = function (outlets) {
            var _this = this;
            outlets.forEach(function (outlet) {
                var layoutOutletItem = new RuntimeLayoutOutlet();
                layoutOutletItem.name = outlet.name;
                layoutOutletItem.height = outlet.hasOwnProperty('height') ? outlet.height : null;
                _this.outlets.push(layoutOutletItem);
            });
        };
        RuntimeLayoutItem.prototype.addLayoutItem = function (layoutTreeItem, columnConfig) {
            var outlet = this.outlets.find(function (outletItem) { return outletItem.name === columnConfig.parentOutlet.name; });
            var insertIndex = columnConfig.parentOutlet.columns[columnConfig.columnIndex].children.indexOf(layoutTreeItem.guid);
            columnConfig.parentOutlet.columns.forEach(function (column, columnIndex) {
                if (!outlet.columns[columnIndex]) {
                    outlet.columns[columnIndex] = new RuntimeLayoutOutletColumn();
                }
                if (column.cssClass) {
                    outlet.columns[columnIndex].cssClass = column.cssClass;
                }
                if (column.span) {
                    outlet.columns[columnIndex].span = column.span;
                }
            });
            if (layoutTreeItem) {
                outlet.columns[columnConfig.columnIndex].children[insertIndex] = layoutTreeItem;
            }
        };
        return RuntimeLayoutItem;
    }());

    /**
     * @desc Represents runtime component tree
     */
    var RuntimeViewLayoutService = /** @class */ (function () {
        function RuntimeViewLayoutService(rxViewComponentRegistryService, viewDefinitionParserService, factoryResolver, tree, rxJsonParserService, rxLogService, rxOldViewLayoutAdapterService) {
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.viewDefinitionParserService = viewDefinitionParserService;
            this.factoryResolver = factoryResolver;
            this.tree = tree;
            this.rxJsonParserService = rxJsonParserService;
            this.rxLogService = rxLogService;
            this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
        }
        RuntimeViewLayoutService.prototype.clear = function () {
            this.layout = null;
        };
        RuntimeViewLayoutService.prototype.init = function (runtimeViewModel, runtimeViewModelApi) {
            this.runtimeViewModel = runtimeViewModel;
            this.runtimeViewModelApi = runtimeViewModelApi;
            this.viewDefinitionParserService
                .getComponents(runtimeViewModel.viewDefinition)
                .forEach(this.processDefinition.bind(this));
        };
        RuntimeViewLayoutService.prototype.processDefinition = function (componentDefinitionItem) {
            this.rxOldViewLayoutAdapterService.convertLayout(componentDefinitionItem);
            if (!componentDefinitionItem.parentComponentDefinition) {
                this.initializeView(componentDefinitionItem.componentDefinition);
            }
            else {
                var componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinitionItem.componentDefinition.type);
                if (componentDefinitionItem.componentDefinition.type !== i2$1.RxViewComponentType.Action &&
                    componentDescriptor &&
                    !this.runtimeViewModel.isDataViewComponentDefinition(componentDescriptor)) {
                    // todo move this logic to separate method
                    var parentComponentDefinitionLayout = JSON.parse(componentDefinitionItem.parentComponentDefinition.layout);
                    var columnIndex_1 = 0;
                    var parentOutlet = parentComponentDefinitionLayout.outlets.find(function (outlet) {
                        return outlet.columns.find(function (col, colIndex) {
                            var includes = col.children.includes(componentDefinitionItem.componentDefinition.guid);
                            if (includes) {
                                columnIndex_1 = colIndex;
                            }
                            return includes;
                        });
                    });
                    if (parentOutlet) {
                        var viewComponentConfig = this.runtimeViewModel.viewComponentStates
                            .get(componentDefinitionItem.componentDefinition.guid)
                            .config$.asObservable();
                        var parentLayoutItem = this.getLayoutItem(componentDefinitionItem.parentComponentDefinition.guid);
                        parentLayoutItem.addLayoutItem(new RuntimeLayoutItem({
                            guid: componentDefinitionItem.componentDefinition.guid,
                            config: viewComponentConfig,
                            parent: parentLayoutItem,
                            runtimeViewModelApi: this.runtimeViewModelApi,
                            outlets: componentDescriptor.outlets,
                            factory: componentDescriptor.componentFactory
                        }), {
                            parentOutlet: parentOutlet,
                            columnIndex: columnIndex_1
                        });
                    }
                    else {
                        var component = componentDefinitionItem.componentDefinition;
                        this.rxLogService.warning("Cannot render view component. " + component.type + " (" + component.guid + ") is not used in layout.");
                    }
                }
            }
        };
        RuntimeViewLayoutService.prototype.initializeView = function (viewDefinition) {
            var layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
            this.layout = new RuntimeLayoutItem({
                guid: viewDefinition.guid,
                parent: null,
                runtimeViewModelApi: this.runtimeViewModelApi,
                outlets: layout.outlets,
                factory: this.factoryResolver.resolveComponentFactory(RuntimeViewRootComponent)
            });
        };
        RuntimeViewLayoutService.prototype.getLayoutItem = function (guid) {
            var flattenedLayoutItems = this.tree.flattenBy(this.layout, function (currentLayout) {
                return currentLayout.outlets.reduce(function (result, outlet) {
                    outlet.columns.forEach(function (column) {
                        column.children.forEach(function (canvasLayout) {
                            result.push(canvasLayout);
                        });
                    });
                    return result;
                }, []);
            });
            return flattenedLayoutItems.find(function (flattenedLayoutItem) { return flattenedLayoutItem.guid === guid; });
        };
        return RuntimeViewLayoutService;
    }());
    RuntimeViewLayoutService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewLayoutService, deps: [{ token: i2__namespace$1.RxViewComponentRegistryService }, { token: i2__namespace$1.RxViewDefinitionParserService }, { token: i0__namespace.ComponentFactoryResolver }, { token: i2__namespace$2.RxTreeService }, { token: i2__namespace$2.RxJsonParserService }, { token: i1__namespace.RxLogService }, { token: i2__namespace$1.RxOldViewLayoutAdapterService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RuntimeViewLayoutService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewLayoutService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewLayoutService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i2__namespace$1.RxViewComponentRegistryService }, { type: i2__namespace$1.RxViewDefinitionParserService }, { type: i0__namespace.ComponentFactoryResolver }, { type: i2__namespace$2.RxTreeService }, { type: i2__namespace$2.RxJsonParserService }, { type: i1__namespace.RxLogService }, { type: i2__namespace$1.RxOldViewLayoutAdapterService }]; } });

    var RuntimeViewModelApi = /** @class */ (function () {
        function RuntimeViewModelApi() {
        }
        RuntimeViewModelApi.prototype.clear = function () {
            this.runtimeViewModel = null;
        };
        RuntimeViewModelApi.prototype.init = function (model) {
            if (!this.runtimeViewModel) {
                this.runtimeViewModel = model;
            }
        };
        RuntimeViewModelApi.prototype.triggerViewActions = function (guid, eventName) {
            return this.runtimeViewModel.triggerViewActions(guid, eventName);
        };
        RuntimeViewModelApi.prototype.cancel = function (skipDirtyCheck) {
            return this.runtimeViewModel.cancel(skipDirtyCheck);
        };
        RuntimeViewModelApi.prototype.close = function () {
            return this.runtimeViewModel.close();
        };
        RuntimeViewModelApi.prototype.getViewInputParameters = function () {
            return this.runtimeViewModel.getViewInputParameters();
        };
        RuntimeViewModelApi.prototype.applyViewPreset = function (viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
            return this.runtimeViewModel.applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets);
        };
        RuntimeViewModelApi.prototype.deleteViewPreset = function (viewPresetGuid) {
            return this.runtimeViewModel.deleteViewPreset(viewPresetGuid);
        };
        RuntimeViewModelApi.prototype.discardViewPresetChanges = function (viewPresetGuid, sharedViewPresets) {
            return this.runtimeViewModel.discardViewPresetChanges(viewPresetGuid, sharedViewPresets);
        };
        RuntimeViewModelApi.prototype.saveViewPreset = function (viewPresetGuid) {
            return this.runtimeViewModel.saveViewPreset(viewPresetGuid);
        };
        RuntimeViewModelApi.prototype.shareViewPreset = function (viewPresetSelectorGuid) {
            return this.runtimeViewModel.shareViewPreset(viewPresetSelectorGuid);
        };
        return RuntimeViewModelApi;
    }());
    RuntimeViewModelApi.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModelApi, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RuntimeViewModelApi.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModelApi });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModelApi, decorators: [{
                type: i0.Injectable
            }] });

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

    var ComponentExpression = /** @class */ (function () {
        function ComponentExpression(propertyName, expression, rxExpressionEvaluatorService, customEvaluatorService) {
            this.propertyName = propertyName;
            this.expression = expression;
            this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
            this.customEvaluatorService = customEvaluatorService;
        }
        ComponentExpression.prototype.evaluate = function (expressionContext) {
            return this.rxExpressionEvaluatorService.tryEvaluate(this.expression, expressionContext, this.customEvaluatorService);
        };
        ComponentExpression.prototype.hasDependency = function (guid, propertyName) {
            return lodash.includes(this.expression, guid + "." + propertyName);
        };
        ComponentExpression.prototype.hasTokens = function () {
            return lodash.includes(this.expression, '${view.') || this.hasKeywordTokens();
        };
        ComponentExpression.prototype.hasKeywordTokens = function () {
            return lodash.includes(this.expression, '${keywords.');
        };
        ComponentExpression.prototype.hasViewTokens = function () {
            return (lodash.includes(this.expression, '${view.inputParams') ||
                lodash.includes(this.expression, '${view.api') ||
                this.hasViewIsValidToken());
        };
        ComponentExpression.prototype.hasViewIsValidToken = function () {
            return lodash.includes(this.expression, '${view.isValid}');
        };
        ComponentExpression.prototype.hasComponentTokens = function () {
            return lodash.includes(this.expression, '${view.components');
        };
        return ComponentExpression;
    }());

    var VIEW_COMPONENT_DEFAULT_EVENT_NAME = 'default';

    var RxViewDefinitionAdapterService = /** @class */ (function () {
        function RxViewDefinitionAdapterService(rxObjectUtilsService, rxJsonParserService, rxDeviceDetectionService) {
            this.rxObjectUtilsService = rxObjectUtilsService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxDeviceDetectionService = rxDeviceDetectionService;
        }
        // called to make view modifications before the view component adapters are executed
        RxViewDefinitionAdapterService.prototype.preProcessViewDefinition = function (viewDefinition) {
            var _this = this;
            var _a;
            (_a = viewDefinition.componentDefinitions) === null || _a === void 0 ? void 0 : _a.forEach(function (childComponentDefinition) {
                _this.expandProperties(childComponentDefinition);
            });
        };
        // called to make view modifications after the view component adapters have been executed
        RxViewDefinitionAdapterService.prototype.postProcessViewDefinition = function (viewDefinition) {
            var _this = this;
            var _a;
            (_a = viewDefinition.componentDefinitions) === null || _a === void 0 ? void 0 : _a.forEach(function (childComponentDefinition) {
                _this.filterComponentsForDevice(childComponentDefinition, viewDefinition);
            });
        };
        RxViewDefinitionAdapterService.prototype.expandProperties = function (componentDefinition) {
            var _this = this;
            componentDefinition.propertiesByName = this.rxObjectUtilsService.expandProperties(componentDefinition.propertiesByName);
            if (componentDefinition.componentDefinitions) {
                componentDefinition.componentDefinitions.forEach(function (childComponentDefinition) {
                    _this.expandProperties(childComponentDefinition);
                });
            }
        };
        RxViewDefinitionAdapterService.prototype.filterComponentsForDevice = function (componentDefinition, parent) {
            var _this = this;
            var _a;
            var availableOnDevicesProp = this.rxJsonParserService.tryParseJson((_a = componentDefinition.propertiesByName) === null || _a === void 0 ? void 0 : _a[i2$1.RX_AVAILABLE_ON_DEVICES_PROP_NAME], i2$1.RX_AVAILABLE_ON_DEVICES_ALL_VALUE) || i2$1.RX_AVAILABLE_ON_DEVICES_ALL_VALUE;
            if (availableOnDevicesProp.includes(this.rxDeviceDetectionService.currentDevice)) {
                if ('componentDefinitions' in componentDefinition) {
                    componentDefinition.componentDefinitions.forEach(function (childComponentDefinition) {
                        _this.filterComponentsForDevice(childComponentDefinition, componentDefinition);
                    });
                }
            }
            else {
                parent.componentDefinitions = parent.componentDefinitions.filter(function (definition) { return definition !== componentDefinition; });
                if (parent.layout) {
                    var updatedLayout = i2$1.RxViewLayout.removeChildFromLayout(this.rxJsonParserService.tryParseJson(parent.layout), componentDefinition.guid);
                    parent.layout = JSON.stringify(updatedLayout);
                }
            }
        };
        return RxViewDefinitionAdapterService;
    }());
    RxViewDefinitionAdapterService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionAdapterService, deps: [{ token: i2__namespace$2.RxObjectUtilsService }, { token: i2__namespace$2.RxJsonParserService }, { token: i2__namespace$1.RxDeviceDetectionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxViewDefinitionAdapterService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionAdapterService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxViewDefinitionAdapterService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$2.RxObjectUtilsService }, { type: i2__namespace$2.RxJsonParserService }, { type: i2__namespace$1.RxDeviceDetectionService }]; } });

    var RxRuntimeViewUtilsService = /** @class */ (function () {
        function RxRuntimeViewUtilsService(rxViewDefinitionService, rxViewDefinitionParserService, rxDefinitionAdapterRegistryService, rxViewActionDefinitionAdapterRegistryService, rxViewDefinitionCacheService) {
            this.rxViewDefinitionService = rxViewDefinitionService;
            this.rxViewDefinitionParserService = rxViewDefinitionParserService;
            this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
            this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
            this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        }
        RxRuntimeViewUtilsService.prototype.isViewCancellable = function (viewDefinitionName) {
            var _this = this;
            if (lodash.isString(viewDefinitionName)) {
                return this.rxViewDefinitionCacheService
                    .getViewDefinition(viewDefinitionName)
                    .pipe(operators.map(function (viewDefinition) { return _this.hasPageComponent(viewDefinition) || _this.hasViewCancellingAction(viewDefinition); }));
            }
            else {
                return rxjs.of(this.hasPageComponent(viewDefinitionName) || this.hasViewCancellingAction(viewDefinitionName));
            }
        };
        RxRuntimeViewUtilsService.prototype.runAdaptersForComponents = function (viewDefinition, containerViewComponentDefinition) {
            var _this = this;
            var componentPairs = this.rxViewDefinitionParserService.getComponents(containerViewComponentDefinition || viewDefinition);
            var regex = new RegExp("\\${view.components." + i2$2.RX_GUID.baseGuidPattern + ".");
            viewDefinition.viewComponentExpressions = lodash.chain(componentPairs)
                .map(function (component) { return lodash.values(component.componentDefinition.propertiesByName); })
                .flatten()
                .map(function (propertyValue) { return (lodash.isObject(propertyValue) ? lodash.values(propertyValue) : propertyValue); })
                .flatten()
                .filter(lodash.isString)
                .filter(function (propertyValue) { return regex.test(propertyValue); })
                .value();
            var result = componentPairs.reduce(function (adapterObservables$, _b) {
                var componentDefinition = _b.componentDefinition;
                var adapter = componentDefinition.type === i2$1.RxViewComponentType.Action
                    ? _this.rxViewActionDefinitionAdapterRegistryService.getRuntimeAdapter(componentDefinition.propertiesByName.name)
                    : _this.rxDefinitionAdapterRegistryService.getRuntimeAdapter(componentDefinition.type);
                if (adapter) {
                    var result$ = adapter.adaptDefinition(componentDefinition, viewDefinition);
                    adapterObservables$.push(result$ ? result$.pipe(operators.take(1)) : rxjs.EMPTY);
                }
                return adapterObservables$;
            }, []);
            return lodash.isEmpty(result) ? [rxjs.EMPTY] : result;
        };
        RxRuntimeViewUtilsService.prototype.hasViewCancellingAction = function (viewDefinition) {
            return Boolean(this.rxViewDefinitionParserService.findViewComponent(viewDefinition, function (viewComponentDefinition) { return viewComponentDefinition.type === i2$1.RxViewComponentType.Action &&
                viewComponentDefinition.propertiesByName.name === 'rxCloseViewAction' &&
                viewComponentDefinition.propertiesByName.actAsCancel === 'true'; }));
        };
        RxRuntimeViewUtilsService.prototype.hasPageComponent = function (viewDefinition) {
            var _a;
            return ((_a = lodash.head(viewDefinition.componentDefinitions)) === null || _a === void 0 ? void 0 : _a.type) === i2$1.RxViewComponentType.Page;
        };
        return RxRuntimeViewUtilsService;
    }());
    RxRuntimeViewUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuntimeViewUtilsService, deps: [{ token: i2__namespace$1.RxViewDefinitionService }, { token: i2__namespace$1.RxViewDefinitionParserService }, { token: i1__namespace.RxDefinitionAdapterRegistryService }, { token: i2__namespace$1.RxViewActionDefinitionAdapterRegistryService }, { token: i2__namespace$1.RxViewDefinitionCacheService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRuntimeViewUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuntimeViewUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuntimeViewUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace$1.RxViewDefinitionService }, { type: i2__namespace$1.RxViewDefinitionParserService }, { type: i1__namespace.RxDefinitionAdapterRegistryService }, { type: i2__namespace$1.RxViewActionDefinitionAdapterRegistryService }, { type: i2__namespace$1.RxViewDefinitionCacheService }]; } });

    var ViewComponentEventManager = /** @class */ (function () {
        function ViewComponentEventManager(rxGlobalEventsService, rxLogService, rxViewActionService, errorHandler) {
            this.rxGlobalEventsService = rxGlobalEventsService;
            this.rxLogService = rxLogService;
            this.rxViewActionService = rxViewActionService;
            this.errorHandler = errorHandler;
        }
        ViewComponentEventManager.prototype.executeActions = function (actions, actionCallback) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var resultValue;
                rxjs.from(actions)
                    .pipe(operators.mergeScan(function (acc, currentAction) {
                    _this.rxLogService.debug('ACTION STARTED: ' + currentAction.name);
                    return _this.rxViewActionService.execute(currentAction.name, currentAction.parameters).pipe(operators.map(function (result) { return actionCallback(currentAction, result); }), operators.take(1));
                }, null, 1))
                    .subscribe({
                    next: function (result) { return (resultValue = result); },
                    error: function (error) {
                        reject(error);
                        _this.rxGlobalEventsService.viewActionsCompleted$.next();
                        lodash.castArray(error).forEach(function (e) {
                            if (lodash.isString(e)) {
                                _this.rxLogService.warning(e);
                            }
                            else if (e) {
                                _this.errorHandler.handleError(e);
                            }
                        });
                    },
                    complete: function () {
                        _this.rxGlobalEventsService.viewActionsCompleted$.next();
                        resolve(resultValue);
                    }
                });
            });
        };
        return ViewComponentEventManager;
    }());
    ViewComponentEventManager.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewComponentEventManager, deps: [{ token: i1__namespace.RxGlobalEventsService }, { token: i1__namespace.RxLogService }, { token: i2__namespace$1.RxViewActionService }, { token: i0__namespace.ErrorHandler }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ViewComponentEventManager.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewComponentEventManager, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: ViewComponentEventManager, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.RxGlobalEventsService }, { type: i1__namespace.RxLogService }, { type: i2__namespace$1.RxViewActionService }, { type: i0__namespace.ErrorHandler }]; } });

    var RuntimeViewModel = /** @class */ (function () {
        function RuntimeViewModel(rxBundleService, rxGlobalCacheService, rxViewComponentRegistryService, rxViewDefinitionAdapterService, rxViewDefinitionParserService, rxViewDefinitionService, rxRuntimeViewUtilsService, rxExpressionEvaluatorService, rxNotificationService, rxViewActionRegistryService, rxLogService, viewComponentEventManager, rxUtilityModalsService, rxViewDefinitionCacheService, rxObjectUtilsService, rxJsonParserService, rxCurrentUserService) {
            this.rxBundleService = rxBundleService;
            this.rxGlobalCacheService = rxGlobalCacheService;
            this.rxViewComponentRegistryService = rxViewComponentRegistryService;
            this.rxViewDefinitionAdapterService = rxViewDefinitionAdapterService;
            this.rxViewDefinitionParserService = rxViewDefinitionParserService;
            this.rxViewDefinitionService = rxViewDefinitionService;
            this.rxRuntimeViewUtilsService = rxRuntimeViewUtilsService;
            this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
            this.rxNotificationService = rxNotificationService;
            this.rxViewActionRegistryService = rxViewActionRegistryService;
            this.rxLogService = rxLogService;
            this.viewComponentEventManager = viewComponentEventManager;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
            this.rxObjectUtilsService = rxObjectUtilsService;
            this.rxJsonParserService = rxJsonParserService;
            this.rxCurrentUserService = rxCurrentUserService;
            // public api which available for runtime view client
            this.api = {
                save: this.save.bind(this),
                close: this.close.bind(this),
                cancel: this.cancel.bind(this),
                refresh: this.refresh.bind(this),
                canClose: this.canClose.bind(this),
                applyViewPreset: this.applyViewPreset.bind(this),
                deleteViewPreset: this.deleteViewPreset.bind(this),
                discardViewPresetChanges: this.discardViewPresetChanges.bind(this),
                saveViewPreset: this.saveViewPreset.bind(this)
            };
            this.saveSubject = new rxjs.Subject();
            this.closeSubject = new rxjs.Subject();
            this.cancelSubject = new rxjs.Subject();
            this.save$ = this.saveSubject.asObservable();
            this.close$ = this.closeSubject.asObservable();
            this.cancel$ = this.cancelSubject.asObservable();
            this.viewComponentStates = new Map();
            // store all components state, needed for component expression re-evaluation
            this.evaluationData = {
                view: {
                    api: this.api,
                    components: {},
                    inputParams: {},
                    isValid: false
                },
                keywords: {
                    user: this.rxCurrentUserService.getName(),
                    newLine: '\n'
                }
            };
        }
        RuntimeViewModel.prototype.init = function (configuration) {
            var _this = this;
            this.configuration = configuration;
            this.clear();
            var viewDefinition$ = lodash.isString(configuration.viewDefinitionName)
                ? this.rxViewDefinitionCacheService.getViewDefinition(configuration.viewDefinitionName)
                : rxjs.of(configuration.viewDefinitionName);
            return viewDefinition$.pipe(operators.switchMap(function (viewDefinition) {
                var viewComponents = _this.rxViewDefinitionParserService.getComponents(viewDefinition, true);
                var ownerBundleIds = viewComponents.map(function (viewComponent) { return viewComponent.componentDefinition.type === i2$1.RxViewComponentType.Action
                    ? _this.rxViewActionRegistryService.getActionOwnerBundleId(viewComponent.componentDefinition.propertiesByName.name)
                    : _this.rxViewComponentRegistryService.getComponentOwnerBundleId(viewComponent.componentDefinition.type); });
                return rxjs.merge.apply(void 0, __spreadArray([], __read(ownerBundleIds))).pipe(operators.filter(Boolean), operators.distinct(), operators.reduce(function (acc, bundleId) {
                    acc.push(bundleId);
                    return acc;
                }, []), operators.switchMap(function (bundleIds) { return bundleIds.length
                    ? _this.rxBundleService.loadBundles(bundleIds, true).pipe(operators.map(function () { return viewDefinition; }))
                    : rxjs.of(viewDefinition); }), operators.switchMap(function (viewDefinition) { return _this.rxViewComponentRegistryService.resolveAsyncDescriptors().pipe(operators.map(function () { return viewDefinition; })); }));
            }), operators.switchMap(function (viewDefinition) { return _this.processViewDefinition(viewDefinition); }));
        };
        RuntimeViewModel.prototype.clear = function () {
            this.viewComponentStates.clear();
            this.evaluationData.view.components = {};
            this.evaluationData.view.inputParams = {};
        };
        RuntimeViewModel.prototype.save = function (closeViewAfterSave) {
            var _this = this;
            if (closeViewAfterSave === void 0) { closeViewAfterSave = false; }
            return this.callRuntimeComponentsApi('save', closeViewAfterSave).pipe(operators.tap({
                complete: function () { return _this.saveSubject.next(); }
            }));
        };
        RuntimeViewModel.prototype.close = function () {
            var viewOutputParams = this.evaluateViewOutputParams();
            this.closeSubject.next(viewOutputParams);
            return rxjs.of(viewOutputParams);
        };
        RuntimeViewModel.prototype.cancel = function (skipDirtyCheck) {
            var _this = this;
            if (skipDirtyCheck) {
                this.cancelSubject.next();
                return rxjs.EMPTY;
            }
            else {
                return this.isDirtyView().pipe(operators.switchMap(function (isDirty) { return (isDirty ? _this.rxUtilityModalsService.confirmUnsavedChanges() : rxjs.of(true)); }), operators.tap(function (canClose) {
                    if (canClose) {
                        _this.cancelSubject.next();
                    }
                }), operators.switchMap(function (canClose) {
                    return canClose ? rxjs.EMPTY : rxjs.throwError(null);
                }));
            }
        };
        RuntimeViewModel.prototype.refresh = function () {
            return this.callRuntimeComponentsApi('refresh');
        };
        RuntimeViewModel.prototype.canClose = function () {
            var canClose = true;
            this.isDirtyView().subscribe(function (isDirty) { return (canClose = !isDirty); });
            return canClose;
        };
        RuntimeViewModel.prototype.applyViewPreset = function (viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
            return this.callRuntimeComponentsApi('applyViewPreset', viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets).pipe(operators.switchMap(function () { return rxjs.EMPTY; }));
        };
        RuntimeViewModel.prototype.deleteViewPreset = function (viewPresetGuid) {
            return this.callRuntimeComponentsApi('deleteViewPreset', viewPresetGuid).pipe(operators.switchMap(function () { return rxjs.EMPTY; }));
        };
        RuntimeViewModel.prototype.discardViewPresetChanges = function (viewPresetGuid, sharedViewPresets) {
            return this.callRuntimeComponentsApi('discardViewPresetChanges', viewPresetGuid, sharedViewPresets).pipe(operators.switchMap(function () { return rxjs.EMPTY; }));
        };
        RuntimeViewModel.prototype.saveViewPreset = function (viewPresetGuid) {
            return this.callRuntimeComponentsApi('saveViewPreset', viewPresetGuid).pipe(operators.switchMap(function () { return rxjs.EMPTY; }));
        };
        RuntimeViewModel.prototype.shareViewPreset = function (viewPresetSelectorGuid) {
            return this.callRuntimeComponentsApi('shareViewPreset', viewPresetSelectorGuid).pipe(operators.defaultIfEmpty([]), operators.map(function (data) { return data
                .filter(function (item) { return Boolean(item === null || item === void 0 ? void 0 : item.data); })
                .reduce(function (result, item) {
                result[item.guid] = item.data;
                return result;
            }, {}); }));
        };
        // launch view component actions for particular event
        RuntimeViewModel.prototype.triggerViewActions = function (componentGuid, viewActionTriggerEventName) {
            var _this = this;
            var actionsResult = Promise.resolve();
            var viewComponentState = this.viewComponentStates.get(componentGuid);
            if (viewComponentState) {
                var eventState = viewComponentState.eventStates[viewActionTriggerEventName];
                if (eventState) {
                    var actionStates = eventState.map(function (actionState) { return ({
                        guid: actionState.guid,
                        name: actionState.name,
                        parameters: actionState.config
                    }); });
                    // execute view component actions for particular event
                    actionsResult = this.viewComponentEventManager.executeActions(actionStates, function (actionState, result) {
                        // hook which is called after each action execution
                        // update action shared state and re-evaluate dependent action view component
                        _this.onViewComponentActionOutputChanged(componentGuid, actionState.guid, result);
                    });
                }
                else {
                    this.rxLogService.warning("Cannot trigger view actions. View Action Trigger Event " + viewActionTriggerEventName + " not found.");
                }
            }
            else {
                this.rxLogService.warning("Cannot trigger view actions. View Component " + componentGuid + " not found.");
            }
            return actionsResult;
        };
        // hook which is called when view component triggers "property changed" event
        RuntimeViewModel.prototype.onViewComponentPropertyChanged = function (_a) {
            var _this = this;
            var guid = _a.guid, propertyName = _a.propertyName, newValue = _a.newValue;
            var viewComponentState = this.viewComponentStates.get(guid);
            viewComponentState.publicState[propertyName] = newValue;
            this.updateEvaluationData(viewComponentState);
            // update config if changed property exist in component properties descriptor
            if (propertyName !== 'api' && lodash.some(viewComponentState.componentDescriptor.properties, { name: propertyName })) {
                this.updateComponentConfigProperty(propertyName, newValue, viewComponentState);
                this.updateViewComponentConfig(viewComponentState);
            }
            var dependentViewComponentGuids = viewComponentState.dependentViewComponentsMap.get(propertyName);
            var dependentViewComponentStates;
            // find all view components which depend on changed view component based on expressions
            if (dependentViewComponentGuids) {
                // restore dependent components from the cache
                dependentViewComponentStates = dependentViewComponentGuids.map(function (viewComponentGuid) { return _this.viewComponentStates.get(viewComponentGuid); });
            }
            else {
                dependentViewComponentStates = this.getDependentViewComponentStates(function (expression) { return expression.hasDependency(guid, propertyName); });
                // cache dependent view component guids
                viewComponentState.dependentViewComponentsMap.set(propertyName, dependentViewComponentStates.map(function (state) { return state.guid; }));
            }
            // evaluate expressions for all dependent view components
            dependentViewComponentStates.forEach(function (dependentViewComponentState) {
                _this.evaluateDependentProperties(dependentViewComponentState, guid, propertyName);
            });
            // update config$ for all dependent view components
            dependentViewComponentStates
                .map(function (dependentViewComponentState) {
                // if dependentViewComponentState is data view component
                // config$ should be updated for nearest parent view component with UI representation
                // i.e. if rx-record-grid-column is dependent component then rx-record-grid config$ should be update
                if (dependentViewComponentState.isDataViewComponent) {
                    return _this.getParentViewComponent(dependentViewComponentState);
                }
                else {
                    return dependentViewComponentState;
                }
            })
                .forEach(function (dependentViewComponentState) {
                _this.updateViewComponentConfig(dependentViewComponentState);
            });
            if (propertyName === 'isValid') {
                this.triggerViewValidation(newValue);
            }
        };
        // ts guard - defines whether componentDescriptor is data view component
        RuntimeViewModel.prototype.isDataViewComponentDefinition = function (componentDescriptor) {
            return componentDescriptor.configPropertyName !== undefined;
        };
        RuntimeViewModel.prototype.getViewInputParameters = function () {
            return this.configuration.inputParams;
        };
        RuntimeViewModel.prototype.isDirtyView = function () {
            // Used a separate observable to handle scenario when callRuntimeComponentsApi observable
            // will be immediately completed. It can happen when no view components will have 'isDirty' API.
            var isDirtySubject = new rxjs.ReplaySubject(1);
            var isDirtyView = false;
            if (this.isUserInteractionDetected) {
                this.callRuntimeComponentsApi('isDirty')
                    .pipe(operators.tap(function (result) { return (isDirtyView = result.some(function (_a) {
                    var data = _a.data;
                    return data;
                })); }))
                    .subscribe({
                    complete: function () { return isDirtySubject.next(isDirtyView); }
                });
            }
            else {
                isDirtySubject.next(isDirtyView);
            }
            return isDirtySubject.asObservable().pipe(operators.take(1));
        };
        RuntimeViewModel.prototype.triggerViewValidation = function (isValid) {
            var _this = this;
            if (isValid) {
                isValid = Array.from(this.viewComponentStates.values())
                    .filter(function (viewComponent) { return lodash.has(viewComponent.publicState, 'isValid'); })
                    .every(function (viewComponent) { return viewComponent.publicState.isValid; });
            }
            if (this.evaluationData.view.isValid !== isValid) {
                this.evaluationData.view.isValid = isValid;
                var dependentViewComponentStates_1;
                if (this.dependentOnViewIsValidPropViewComponentGuids) {
                    dependentViewComponentStates_1 = this.dependentOnViewIsValidPropViewComponentGuids.map(function (guid) { return _this.viewComponentStates.get(guid); });
                }
                else {
                    dependentViewComponentStates_1 = this.getDependentViewComponentStates(function (expression) { return expression.hasViewIsValidToken(); });
                    this.dependentOnViewIsValidPropViewComponentGuids = dependentViewComponentStates_1.map(function (state) { return state.guid; });
                }
                dependentViewComponentStates_1.forEach(function (viewComponentState) {
                    _this.evaluateComponentExpressions(viewComponentState, function (expression) { return expression.hasViewIsValidToken(); });
                });
                // update view component configs in next javascript event loop, to avoid
                // 'ExpressionChangedAfterItHasBeenCheckedError' error in components,
                // dependent on the view isValid property e.g Action button disabled property
                rxjs.asyncScheduler.schedule(function () {
                    dependentViewComponentStates_1.forEach(_this.updateViewComponentConfig.bind(_this));
                });
            }
        };
        // return nearest parent view component with UI representation
        RuntimeViewModel.prototype.getParentViewComponent = function (viewComponentState) {
            var currentViewComponentState = viewComponentState;
            while (currentViewComponentState.isDataViewComponent) {
                currentViewComponentState = this.viewComponentStates.get(currentViewComponentState.parentViewComponentGuid);
            }
            return currentViewComponentState;
        };
        // return all view components which depend on particular expression
        RuntimeViewModel.prototype.getDependentViewComponentStates = function (expressionFilterFn) {
            return Array.from(this.viewComponentStates.values()).filter(function (viewComponentState) {
                var isDependentComponentState = lodash.some(viewComponentState.expressions, expressionFilterFn);
                var isDependentEventState = lodash.some(viewComponentState.eventStates, function (eventState) { return lodash.some(eventState, function (event) { return lodash.some(event.expressions, expressionFilterFn); }); });
                return isDependentComponentState || isDependentEventState;
            });
        };
        // pass new view component config to the @Component
        RuntimeViewModel.prototype.updateViewComponentConfig = function (viewComponentState) {
            // finally update config
            viewComponentState.config$.next(this.buildComponentConfig(viewComponentState));
        };
        // build view component config based on configState and child data view component
        RuntimeViewModel.prototype.buildComponentConfig = function (viewComponentState) {
            var viewComponentConfigState = Object.assign({}, viewComponentState.configState);
            // build child data component states
            this.buildComponentChildDataConfig(viewComponentState, viewComponentConfigState);
            return viewComponentConfigState;
        };
        // recursively build view component config based on data view components
        RuntimeViewModel.prototype.buildComponentChildDataConfig = function (viewComponentState, viewComponentChildConfig) {
            var _this = this;
            if (viewComponentChildConfig === void 0) { viewComponentChildConfig = {}; }
            // find all child data view components
            var dataViewComponentChildStates = viewComponentState.childViewComponentGuids
                .map(function (viewComponentGuid) { return _this.viewComponentStates.get(viewComponentGuid); })
                .filter(function (currentViewComponentState) { return Boolean(currentViewComponentState); })
                .filter(function (currentViewComponentState) { return currentViewComponentState.isDataViewComponent; });
            // group data view components on config property name
            var dataViewComponentChildStateGroups = lodash.groupBy(dataViewComponentChildStates, function (dataViewComponentState) { return dataViewComponentState.configPropertyName; });
            // store each data view component config under corresponding config property name
            Object.keys(dataViewComponentChildStateGroups).forEach(function (configPropertyName) {
                viewComponentChildConfig[configPropertyName] = dataViewComponentChildStateGroups[configPropertyName].map(function (dataViewComponentStateChild) {
                    var dataViewComponentChildState = Object.assign({}, dataViewComponentStateChild.configState);
                    // recursively build data view component config
                    _this.buildComponentChildDataConfig(dataViewComponentStateChild, dataViewComponentChildState);
                    return dataViewComponentChildState;
                });
            });
        };
        // update action view component shared state
        // re-evaluate all dependent action view components
        RuntimeViewModel.prototype.onViewComponentActionOutputChanged = function (componentGuid, actionGuid, viewActionOutput) {
            var viewComponentState = this.viewComponentStates.get(componentGuid);
            if (viewComponentState) {
                var actionState = viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME].find(function (currentAction) {
                    return currentAction.guid === actionGuid;
                });
                actionState.publicState.output = viewActionOutput;
                this.updateEvaluationData(viewComponentState);
                this.evaluateDependentProperties(viewComponentState, actionGuid, 'output');
            }
        };
        RuntimeViewModel.prototype.evaluateViewOutputParams = function () {
            var _this = this;
            return this.viewDefinition.outputParams.reduce(function (result, outputParam) {
                result[outputParam.name] = _this.rxExpressionEvaluatorService.tryEvaluate(outputParam.source, _this.evaluationData);
                return result;
            }, {});
        };
        RuntimeViewModel.prototype.processViewDefinition = function (viewDefinition) {
            var _this = this;
            this.viewDefinition = this.rxObjectUtilsService.cloneDeep(viewDefinition);
            this.rxViewDefinitionAdapterService.preProcessViewDefinition(this.viewDefinition);
            var adapters$ = this.rxRuntimeViewUtilsService.runAdaptersForComponents(this.viewDefinition);
            return rxjs.combineLatest(adapters$).pipe(operators.switchMapTo(rxjs.EMPTY), operators.tap({
                complete: function () {
                    _this.rxViewDefinitionAdapterService.postProcessViewDefinition(_this.viewDefinition);
                    _this.rxViewDefinitionParserService
                        .getComponents(_this.viewDefinition)
                        .forEach(_this.processComponentDefinition.bind(_this));
                    // evaluate expressions with keyword tokens
                    _this.viewComponentStates.forEach(function (viewComponent) {
                        _this.evaluateComponentExpressions(viewComponent, function (componentExpression) { return componentExpression.hasKeywordTokens(); });
                    });
                    // evaluate expressions without tokens
                    _this.viewComponentStates.forEach(function (viewComponent) {
                        _this.evaluateComponentExpressions(viewComponent, function (componentExpression) { return !componentExpression.hasTokens(); });
                    });
                    // evaluate expressions with view tokens
                    _this.viewComponentStates.forEach(function (viewComponent) {
                        _this.evaluateComponentExpressions(viewComponent, function (componentExpression) { return componentExpression.hasViewTokens(); });
                    });
                    // evaluate expressions with component tokens
                    _this.viewComponentStates.forEach(function (viewComponent) {
                        _this.evaluateComponentExpressions(viewComponent, function (componentExpression) { return componentExpression.hasComponentTokens(); });
                    });
                    // update all component configs
                    _this.viewComponentStates.forEach(function (viewComponentState) {
                        _this.updateViewComponentConfig(viewComponentState);
                    });
                }
            }));
        };
        RuntimeViewModel.prototype.processComponentDefinition = function (componentDefinitionItem) {
            var _this = this;
            if (!componentDefinitionItem.parentComponentDefinition) {
                // process root component definition
                var configuredParamNames = lodash.map(componentDefinitionItem.componentDefinition.inputParams, 'name');
                var passedParamNames = lodash.keys(this.configuration.inputParams);
                var onlyPositionalParams = passedParamNames.length > 0 && lodash.every(passedParamNames, function (inputParamName) { return /^\$[0-9]+\$$/.test(inputParamName); });
                if (onlyPositionalParams && lodash.intersection(configuredParamNames, passedParamNames).length === 0) {
                    lodash.forEach(passedParamNames, function (inputParamName) {
                        var paramIndex = Number(inputParamName.match(/^\$([0-9]+)\$$/)[1]);
                        var definitionParamName = lodash.get(componentDefinitionItem.componentDefinition, "inputParams[" + paramIndex + "].name");
                        _this.evaluationData.view.inputParams[definitionParamName] = _this.configuration.inputParams[inputParamName];
                    });
                }
                else {
                    lodash.forEach(configuredParamNames, function (inputParamName) {
                        _this.evaluationData.view.inputParams[inputParamName] = _this.configuration.inputParams[inputParamName];
                    });
                }
            }
            else {
                var componentDefinition = componentDefinitionItem.componentDefinition;
                var viewComponentState = this.buildViewComponentState(componentDefinitionItem);
                if (viewComponentState) {
                    this.viewComponentStates.set(componentDefinition.guid, viewComponentState);
                }
            }
        };
        // generate view component state based on component definition
        RuntimeViewModel.prototype.buildViewComponentState = function (componentDefinitionItem) {
            var _a;
            var _this = this;
            var componentDefinition = componentDefinitionItem.componentDefinition;
            var componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinition.type);
            if (componentDescriptor) {
                var viewComponentState_1 = {
                    guid: componentDefinition.guid,
                    type: componentDefinition.type,
                    config$: new rxjs.BehaviorSubject({}),
                    expressions: [],
                    eventStates: (_a = {},
                        _a[VIEW_COMPONENT_DEFAULT_EVENT_NAME] = [],
                        _a),
                    configState: {},
                    publicState: {},
                    isDataViewComponent: false,
                    configPropertyName: null,
                    parentViewComponentGuid: componentDefinitionItem.parentComponentDefinition.guid,
                    childViewComponentGuids: [],
                    dependentViewComponentsMap: new Map(),
                    componentDescriptor: componentDescriptor
                };
                if (this.isDataViewComponentDefinition(componentDescriptor)) {
                    viewComponentState_1.isDataViewComponent = true;
                    viewComponentState_1.configPropertyName = componentDescriptor.configPropertyName;
                }
                lodash.forOwn(componentDefinition.propertiesByName, function (propertyValue, propertyName) {
                    var viewComponentPropertyDescriptor = lodash.find(componentDescriptor.properties, function (descriptor) { return propertyName === descriptor.name; });
                    var isExpressionEvaluationEnabled = viewComponentPropertyDescriptor && viewComponentPropertyDescriptor.enableExpressionEvaluation;
                    // initialize view component expressions
                    if (isExpressionEvaluationEnabled) {
                        // create expression for property
                        viewComponentState_1.expressions.push(new ComponentExpression(propertyName, propertyValue, _this.rxExpressionEvaluatorService, viewComponentPropertyDescriptor.evaluatorService));
                    }
                    // update view component config state object
                    _this.updateComponentConfigProperty(propertyName, isExpressionEvaluationEnabled ? null : propertyValue, viewComponentState_1);
                });
                // add initial view component state to evaluationData
                this.updateEvaluationData(viewComponentState_1);
                if (this.isContainerComponentDefinition(componentDefinition)) {
                    // set up view component events
                    componentDefinition.componentDefinitions
                        .filter(function (currentComponentDefinition) { return currentComponentDefinition.type === i2$1.RxViewComponentType.Action; })
                        .forEach(function (actionComponentDefinition) {
                        var actionState = _this.buildViewComponentActionState(actionComponentDefinition);
                        if (actionState) {
                            viewComponentState_1.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME].push(actionState);
                        }
                    });
                    // sort actions in correct order
                    viewComponentState_1.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME] = lodash.sortBy(viewComponentState_1.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME], 'index');
                    // set up child view component guids
                    viewComponentState_1.childViewComponentGuids = componentDefinition.componentDefinitions
                        .filter(function (currentComponentDefinition) { return currentComponentDefinition.type !== i2$1.RxViewComponentType.Action; })
                        .map(function (currentComponentDefinition) { return currentComponentDefinition.guid; });
                }
                return viewComponentState_1;
            }
            else if (componentDefinition.type !== i2$1.RxViewComponentType.Action) {
                this.rxLogService.warning("Cannot initialize view component. View Component Descriptor for " + componentDefinition.type + " not found.");
            }
        };
        // generate action view component state
        RuntimeViewModel.prototype.buildViewComponentActionState = function (actionComponentDefinition) {
            var _this = this;
            var actionDescriptor = this.rxViewActionRegistryService.get(actionComponentDefinition.propertiesByName.name);
            if (actionDescriptor) {
                var actionState_1 = {
                    guid: actionComponentDefinition.guid,
                    name: actionComponentDefinition.propertiesByName.name,
                    index: lodash.toNumber(actionComponentDefinition.propertiesByName.index) || 0,
                    config: {},
                    publicState: {},
                    expressions: []
                };
                Object.keys(actionComponentDefinition.propertiesByName || {})
                    .filter(function (parameterName) { return parameterName !== 'name'; })
                    .map(function (parameterName) {
                    var actionPropertyDescriptor = (actionDescriptor.parameters || []).find(function (descriptor) { return parameterName === descriptor.name; });
                    var isExpressionEvaluationEnabled = actionPropertyDescriptor && actionPropertyDescriptor.enableExpressionEvaluation;
                    // initialize action view component expressions
                    if (isExpressionEvaluationEnabled) {
                        // create expression for property
                        _this.initializeActionExpressionForProperty(actionState_1, actionPropertyDescriptor.evaluatorService, parameterName, actionComponentDefinition.propertiesByName[parameterName]);
                    }
                    // add initial action view component state to evaluationData
                    _this.updateActionConfigProperty(parameterName, isExpressionEvaluationEnabled ? null : actionComponentDefinition.propertiesByName[parameterName], actionState_1);
                });
                return actionState_1;
            }
        };
        RuntimeViewModel.prototype.initializeActionExpressionForProperty = function (actionState, evaluatorService, propertyName, propertyValue) {
            var _this = this;
            if (lodash.isObject(propertyValue)) {
                lodash.forIn(propertyValue, function (value, name) {
                    _this.initializeActionExpressionForProperty(actionState, evaluatorService, propertyName + "." + name, value);
                });
            }
            else {
                actionState.expressions.push(new ComponentExpression(propertyName, propertyValue, this.rxExpressionEvaluatorService, evaluatorService));
            }
        };
        RuntimeViewModel.prototype.callRuntimeComponentsApi = function (methodName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var resultSubject = new rxjs.ReplaySubject(1);
            var errors = [];
            var apiCallResults = Array.from(this.viewComponentStates.values())
                .filter(function (viewComponent) { return Boolean(viewComponent.publicState.api && lodash.isFunction(viewComponent.publicState.api[methodName])); })
                .map(function (viewComponent) {
                var result = viewComponent.publicState.api[methodName].apply(null, args);
                if (result && result.then) {
                    result = rxjs.from(result);
                }
                else if (!(result instanceof rxjs.Observable)) {
                    result = rxjs.of(result);
                }
                return result.pipe(operators.take(1), operators.map(function (res) { return ({
                    guid: viewComponent.guid,
                    data: res
                }); }), operators.tap({
                    error: function (error) { return errors.push(error); }
                }), 
                // catch errors from each view component api call to allow to successfully finish other api calls.
                operators.catchError(function () { return rxjs.EMPTY; }));
            });
            rxjs.combineLatest(apiCallResults).subscribe({
                next: function (results) { return resultSubject.next(results); },
                complete: function () { return (lodash.isEmpty(errors) ? resultSubject.complete() : resultSubject.error(errors)); }
            });
            return resultSubject.asObservable();
        };
        RuntimeViewModel.prototype.evaluateComponentExpressions = function (viewComponent, expressionFilterFunc) {
            var _this = this;
            // update component expressions
            viewComponent.expressions.filter(expressionFilterFunc).forEach(function (componentExpression) {
                _this.updateComponentConfigProperty(componentExpression.propertyName, _this.evaluateExpression(componentExpression), viewComponent);
            });
            this.updateEvaluationData(viewComponent);
            // update event expressions
            Object.keys(viewComponent.eventStates).forEach(function (eventName) {
                viewComponent.eventStates[eventName].forEach(function (actionState) {
                    actionState.expressions.filter(expressionFilterFunc).forEach(function (componentExpression) {
                        _this.updateActionConfigProperty(componentExpression.propertyName, _this.evaluateExpression(componentExpression), actionState);
                        _this.updateEvaluationData(viewComponent);
                    });
                });
            });
        };
        RuntimeViewModel.prototype.evaluateDependentProperties = function (viewComponent, guid, propertyName) {
            this.evaluateComponentExpressions(viewComponent, function (componentExpression) { return componentExpression.hasDependency(guid, propertyName); });
        };
        RuntimeViewModel.prototype.evaluateExpression = function (componentExpression) {
            var evaluatedValue;
            try {
                evaluatedValue = componentExpression.evaluate(this.evaluationData);
            }
            catch (e) {
                evaluatedValue = null;
                this.rxNotificationService.addErrorMessage(e.message, '');
            }
            return evaluatedValue;
        };
        // update view component config property based on property descriptor
        RuntimeViewModel.prototype.updateComponentConfigProperty = function (propertyName, propertyValue, viewComponent) {
            var viewComponentDescriptor = this.rxViewComponentRegistryService.get(viewComponent.type);
            var viewComponentPropertyDescriptor = lodash.find(viewComponentDescriptor.properties, {
                name: propertyName
            });
            viewComponent.configState[propertyName] = this.processPropertyValue(propertyValue, viewComponentPropertyDescriptor);
        };
        // update action view component config property based on property descriptor
        RuntimeViewModel.prototype.updateActionConfigProperty = function (propertyName, propertyValue, actionComponent) {
            var viewActionDescriptor = this.rxViewActionRegistryService.get(actionComponent.name);
            var viewActionParameterDescriptor = lodash.find(viewActionDescriptor.parameters, {
                name: propertyName
            });
            if (!viewActionParameterDescriptor && lodash.includes(propertyName, '.')) {
                var primaryPropertyName = propertyName.split('.')[0];
                viewActionParameterDescriptor = lodash.find(viewActionDescriptor.parameters, { name: primaryPropertyName });
            }
            lodash.set(actionComponent.config, propertyName, this.processPropertyValue(propertyValue, viewActionParameterDescriptor));
        };
        // sync component data with expression data
        RuntimeViewModel.prototype.updateEvaluationData = function (viewComponent) {
            var _this = this;
            // update component data
            this.evaluationData.view.components[viewComponent.guid] = Object.assign(Object.assign({}, viewComponent.configState), viewComponent.publicState);
            // update component actions data
            Object.keys(viewComponent.eventStates).forEach(function (eventName) {
                viewComponent.eventStates[eventName].forEach(function (actionState) {
                    _this.evaluationData.view.components[actionState.guid] = actionState.publicState;
                });
            });
        };
        // cast property value to the type defined in the descriptor
        RuntimeViewModel.prototype.processPropertyValue = function (propertyValue, propertyDescriptor) {
            if (propertyDescriptor && propertyDescriptor.type && !lodash.isNil(propertyValue)) {
                // try to cast property value to type defined in component descriptor
                if (propertyDescriptor.type === i2$1.ViewComponentPropertyType.Boolean) {
                    if (lodash.includes(['0', 'false'], propertyValue)) {
                        propertyValue = false;
                    }
                    else {
                        propertyValue = Boolean(propertyValue);
                    }
                }
                else if (propertyDescriptor.type === i2$1.ViewComponentPropertyType.Number) {
                    propertyValue = Number(propertyValue);
                    if (Number.isNaN(propertyValue)) {
                        propertyValue = null;
                    }
                }
                else if (propertyDescriptor.type === i2$1.ViewComponentPropertyType.String) {
                    propertyValue = String(propertyValue);
                }
                else if ([i2$1.ViewComponentPropertyType.Array, i2$1.ViewComponentPropertyType.Object].includes(propertyDescriptor.type)) {
                    propertyValue = this.rxJsonParserService.tryParseJson(propertyValue);
                }
            }
            return propertyValue;
        };
        RuntimeViewModel.prototype.isContainerComponentDefinition = function (componentDefinition) {
            return componentDefinition.componentDefinitions !== undefined;
        };
        return RuntimeViewModel;
    }());
    RuntimeViewModel.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModel, deps: [{ token: i1__namespace.RxBundleService }, { token: i1__namespace.RxGlobalCacheService }, { token: i2__namespace$1.RxViewComponentRegistryService }, { token: RxViewDefinitionAdapterService }, { token: i2__namespace$1.RxViewDefinitionParserService }, { token: i2__namespace$1.RxViewDefinitionService }, { token: RxRuntimeViewUtilsService }, { token: i2__namespace$1.RxExpressionEvaluatorService }, { token: i1__namespace.RxNotificationService }, { token: i2__namespace$1.RxViewActionRegistryService }, { token: i1__namespace.RxLogService }, { token: ViewComponentEventManager }, { token: i2__namespace$3.RxUtilityModalsService }, { token: i2__namespace$1.RxViewDefinitionCacheService }, { token: i2__namespace$2.RxObjectUtilsService }, { token: i2__namespace$2.RxJsonParserService }, { token: i1__namespace.RxCurrentUserService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RuntimeViewModel.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModel });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModel, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.RxBundleService }, { type: i1__namespace.RxGlobalCacheService }, { type: i2__namespace$1.RxViewComponentRegistryService }, { type: RxViewDefinitionAdapterService }, { type: i2__namespace$1.RxViewDefinitionParserService }, { type: i2__namespace$1.RxViewDefinitionService }, { type: RxRuntimeViewUtilsService }, { type: i2__namespace$1.RxExpressionEvaluatorService }, { type: i1__namespace.RxNotificationService }, { type: i2__namespace$1.RxViewActionRegistryService }, { type: i1__namespace.RxLogService }, { type: ViewComponentEventManager }, { type: i2__namespace$3.RxUtilityModalsService }, { type: i2__namespace$1.RxViewDefinitionCacheService }, { type: i2__namespace$2.RxObjectUtilsService }, { type: i2__namespace$2.RxJsonParserService }, { type: i1__namespace.RxCurrentUserService }]; } });

    var RxRuntimeViewRegistryService = /** @class */ (function () {
        function RxRuntimeViewRegistryService() {
            this.activeRuntimeViews = [];
        }
        RxRuntimeViewRegistryService.prototype.register = function (runtimeViewModel) {
            if (!this.activeRuntimeViews.includes(runtimeViewModel)) {
                this.activeRuntimeViews.push(runtimeViewModel);
            }
        };
        RxRuntimeViewRegistryService.prototype.getAll = function () {
            return this.activeRuntimeViews;
        };
        RxRuntimeViewRegistryService.prototype.unregister = function (runtimeViewModel) {
            lodash.pull(this.activeRuntimeViews, runtimeViewModel);
        };
        return RxRuntimeViewRegistryService;
    }());
    RxRuntimeViewRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuntimeViewRegistryService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRuntimeViewRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuntimeViewRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRuntimeViewRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var RuntimeViewCanvasComponent = /** @class */ (function () {
        function RuntimeViewCanvasComponent(runtimeViewCanvasService) {
            this.runtimeViewCanvasService = runtimeViewCanvasService;
            this.componentPropertyChanged = new i0.EventEmitter();
            this.destroy$ = new rxjs.Subject();
        }
        RuntimeViewCanvasComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.runtimeViewCanvasService.componentPropertyChanged$
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (event) {
                _this.componentPropertyChanged.emit(event);
            });
        };
        RuntimeViewCanvasComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next(true);
            this.destroy$.unsubscribe();
        };
        return RuntimeViewCanvasComponent;
    }());
    RuntimeViewCanvasComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasComponent, deps: [{ token: RuntimeViewCanvasService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewCanvasComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasComponent, selector: "rx-runtime-view-canvas", inputs: { layout: "layout" }, outputs: { componentPropertyChanged: "componentPropertyChanged" }, providers: [RuntimeViewCanvasService], ngImport: i0__namespace, template: "<rx-runtime-view-canvas-item class=\"root-item\" *ngIf=\"layout\" [layout]=\"layout\"></rx-runtime-view-canvas-item>\n", components: [{ type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-canvas',
                        templateUrl: './runtime-view-canvas.component.html',
                        providers: [RuntimeViewCanvasService]
                    }]
            }], ctorParameters: function () { return [{ type: RuntimeViewCanvasService }]; }, propDecorators: { layout: [{
                    type: i0.Input
                }], componentPropertyChanged: [{
                    type: i0.Output
                }] } });

    var RuntimeViewComponent = /** @class */ (function () {
        function RuntimeViewComponent(runtimeViewModelApi, rxRecordDefinitionCacheService, runtimeViewLayoutService, runtimeViewModel, rxProcessDefinitionCacheService, rxRuntimeViewRegistryService, rxViewDefinitionCacheService, rxAssociationDefinitionCacheService, rxViewDefinitionService) {
            this.runtimeViewModelApi = runtimeViewModelApi;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.runtimeViewLayoutService = runtimeViewLayoutService;
            this.runtimeViewModel = runtimeViewModel;
            this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
            this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
            this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
            this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
            this.rxViewDefinitionService = rxViewDefinitionService;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.save = new i0.EventEmitter();
            this.closeView = new i0.EventEmitter();
            this.cancelView = new i0.EventEmitter();
            this.beforeLoad = new i0.EventEmitter();
            this.afterLoad = new i0.EventEmitter();
            this.rxAssociationDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
            this.rxViewDefinitionCacheService.registerConsumer(this.destroyed$);
        }
        RuntimeViewComponent.prototype.onTrigger = function () {
            this.runtimeViewModel.isUserInteractionDetected = true;
        };
        RuntimeViewComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.runtimeViewModel.cancel$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () { return _this.cancelView.emit(); });
            this.runtimeViewModel.save$.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () { return _this.save.emit(); });
            this.runtimeViewModel.close$
                .pipe(operators.takeUntil(this.destroyed$))
                .subscribe(function (viewOutputParams) { return _this.closeView.emit(viewOutputParams); });
        };
        RuntimeViewComponent.prototype.ngOnChanges = function (changes) {
            if (changes.configuration.currentValue &&
                changes.configuration.previousValue &&
                changes.configuration.currentValue.viewDefinitionName !== changes.configuration.previousValue.viewDefinitionName) {
                this.runtimeViewModelApi.clear();
                this.runtimeViewLayoutService.clear();
                this.configuration = changes.configuration.currentValue;
                this.init();
            }
        };
        RuntimeViewComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
            this.rxRuntimeViewRegistryService.unregister(this.runtimeViewModel);
        };
        RuntimeViewComponent.prototype.init = function () {
            var _this = this;
            this.beforeLoad.emit();
            this.runtimeViewModel.init(this.configuration).subscribe({
                complete: function () {
                    _this.runtimeViewModelApi.init(_this.runtimeViewModel);
                    _this.runtimeViewLayoutService.init(_this.runtimeViewModel, _this.runtimeViewModelApi);
                    _this.hostClass = _this.runtimeViewModel.viewDefinition.styles || '';
                    if (_this.rxViewDefinitionService.isPageView(_this.runtimeViewModel.viewDefinition)) {
                        _this.hostClass = _this.hostClass + ' rx-page-view';
                    }
                    _this.viewDefinitionGuid = _this.runtimeViewModel.viewDefinition.guid;
                    _this.runtimeViewModel.isUserInteractionDetected = false;
                    _this.afterLoad.emit();
                }
            });
            if (this.configuration.onRegisterApi) {
                this.configuration.onRegisterApi(this.runtimeViewModel.api);
            }
            this.rxRuntimeViewRegistryService.register(this.runtimeViewModel);
        };
        return RuntimeViewComponent;
    }());
    RuntimeViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewComponent, deps: [{ token: RuntimeViewModelApi }, { token: i2__namespace$4.RxRecordDefinitionCacheService }, { token: RuntimeViewLayoutService }, { token: RuntimeViewModel }, { token: i5__namespace.RxProcessDefinitionCacheService }, { token: RxRuntimeViewRegistryService }, { token: i2__namespace$1.RxViewDefinitionCacheService }, { token: i8__namespace.RxAssociationDefinitionCacheService }, { token: i2__namespace$1.RxViewDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewComponent, selector: "rx-runtime-view", inputs: { configuration: "configuration" }, outputs: { save: "save", closeView: "closeView", cancelView: "cancelView", beforeLoad: "beforeLoad", afterLoad: "afterLoad" }, host: { listeners: { "focusin": "onTrigger()" }, properties: { "class": "this.hostClass", "attr.rx-view-definition-guid": "this.viewDefinitionGuid" } }, providers: [RuntimeViewModel, RuntimeViewModelApi, RuntimeViewLayoutService], usesOnChanges: true, ngImport: i0__namespace, template: "<rx-runtime-view-canvas\n  (componentPropertyChanged)=\"runtimeViewModel.onViewComponentPropertyChanged($event)\"\n  *ngIf=\"runtimeViewLayoutService.layout\"\n  [layout]=\"runtimeViewLayoutService.layout\"\n></rx-runtime-view-canvas>\n", styles: [":host.rx-page-view ::ng-deep .outlet-padding{padding:0}:host.rx-page-view ::ng-deep rx-runtime-view-canvas-item{height:100%}\n"], components: [{ type: RuntimeViewCanvasComponent, selector: "rx-runtime-view-canvas", inputs: ["layout"], outputs: ["componentPropertyChanged"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view',
                        templateUrl: './runtime-view.component.html',
                        styleUrls: ['./runtime-view.component.scss'],
                        providers: [RuntimeViewModel, RuntimeViewModelApi, RuntimeViewLayoutService]
                    }]
            }], ctorParameters: function () { return [{ type: RuntimeViewModelApi }, { type: i2__namespace$4.RxRecordDefinitionCacheService }, { type: RuntimeViewLayoutService }, { type: RuntimeViewModel }, { type: i5__namespace.RxProcessDefinitionCacheService }, { type: RxRuntimeViewRegistryService }, { type: i2__namespace$1.RxViewDefinitionCacheService }, { type: i8__namespace.RxAssociationDefinitionCacheService }, { type: i2__namespace$1.RxViewDefinitionService }]; }, propDecorators: { configuration: [{
                    type: i0.Input
                }], save: [{
                    type: i0.Output
                }], closeView: [{
                    type: i0.Output
                }], cancelView: [{
                    type: i0.Output
                }], beforeLoad: [{
                    type: i0.Output
                }], afterLoad: [{
                    type: i0.Output
                }], hostClass: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], viewDefinitionGuid: [{
                    type: i0.HostBinding,
                    args: ['attr.rx-view-definition-guid']
                }], onTrigger: [{
                    type: i0.HostListener,
                    args: ['focusin']
                }] } });

    // tslint:disable-next-line:directive-class-suffix
    var BaseViewComponent = /** @class */ (function () {
        function BaseViewComponent() {
            this.customCssClasses = '';
            this.autoFill = new i0.EventEmitter();
            this.autoScroll = new i0.EventEmitter();
            this.hidden = new i0.EventEmitter();
            this.isComponentHidden = false;
            this.destroyed$ = new rxjs.ReplaySubject(1);
            this.propertyChanged = new i0.EventEmitter();
        }
        Object.defineProperty(BaseViewComponent.prototype, "isHidden", {
            get: function () {
                return this.isComponentHidden;
            },
            set: function (value) {
                this.hidden.emit(value);
                this.isComponentHidden = Boolean(value);
            },
            enumerable: false,
            configurable: true
        });
        BaseViewComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.config.pipe(operators.pluck('styles'), operators.takeUntil(this.destroyed$)).subscribe(function (styles) {
                _this.customCssClasses = styles || '';
                _this.autoFill.emit(_this.customCssClasses.includes('rx-auto-fill'));
                _this.autoScroll.emit(_this.customCssClasses.includes('rx-auto-scroll'));
            });
        };
        BaseViewComponent.prototype.notifyPropertyChanged = function (propertyName, newValue, oldValue) {
            this.propertyChanged.next({
                guid: this.guid,
                propertyName: propertyName,
                newValue: newValue,
                oldValue: oldValue
            });
        };
        BaseViewComponent.prototype.triggerViewActions = function (guid, viewActionTriggerEventName) {
            if (guid === void 0) { guid = this.guid; }
            if (viewActionTriggerEventName === void 0) { viewActionTriggerEventName = VIEW_COMPONENT_DEFAULT_EVENT_NAME; }
            return this.runtimeViewModelApi.triggerViewActions(guid, viewActionTriggerEventName);
        };
        BaseViewComponent.prototype.ngOnDestroy = function () {
            this.destroyed$.next(true);
            this.destroyed$.complete();
        };
        return BaseViewComponent;
    }());
    BaseViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BaseViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    BaseViewComponent.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: BaseViewComponent, outputs: { autoFill: "autoFill", autoScroll: "autoScroll", hidden: "hidden" }, host: { properties: { "attr.rx-view-component-id": "this.guid", "class": "this.customCssClasses", "hidden": "this.isHidden" } }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: BaseViewComponent, decorators: [{
                type: i0.Directive
            }], propDecorators: { guid: [{
                    type: i0.HostBinding,
                    args: ['attr.rx-view-component-id']
                }], customCssClasses: [{
                    type: i0.HostBinding,
                    args: ['class']
                }], autoFill: [{
                    type: i0.Output
                }], autoScroll: [{
                    type: i0.Output
                }], hidden: [{
                    type: i0.Output
                }], isHidden: [{
                    type: i0.HostBinding,
                    args: ['hidden']
                }] } });

    var RuntimeViewCanvasOutletComponent = /** @class */ (function () {
        function RuntimeViewCanvasOutletComponent(runtimeViewCanvasItemService, componentFactoryResolver) {
            this.runtimeViewCanvasItemService = runtimeViewCanvasItemService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.name = i2$1.RX_VIEW_DEFINITION.defaultOutletName;
        }
        RuntimeViewCanvasOutletComponent.prototype.ngOnInit = function () {
            this.runtimeViewCanvasItemService.registerOutlet(this.name, this.container, this.componentFactoryResolver.resolveComponentFactory(RuntimeViewCanvasItemContainerComponent));
        };
        return RuntimeViewCanvasOutletComponent;
    }());
    RuntimeViewCanvasOutletComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasOutletComponent, deps: [{ token: RuntimeViewCanvasItemService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewCanvasOutletComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: { name: "name" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: i0.ViewContainerRef, static: true }], ngImport: i0__namespace, template: "<ng-container #container></ng-container>\n" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasOutletComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-canvas-outlet',
                        templateUrl: './runtime-view-canvas-outlet.component.html'
                    }]
            }], ctorParameters: function () { return [{ type: RuntimeViewCanvasItemService }, { type: i0__namespace.ComponentFactoryResolver }]; }, propDecorators: { name: [{
                    type: i0.Input
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef, static: true }]
                }] } });

    var RuntimeViewCanvasModule = /** @class */ (function () {
        function RuntimeViewCanvasModule() {
        }
        return RuntimeViewCanvasModule;
    }());
    RuntimeViewCanvasModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RuntimeViewCanvasModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasModule, declarations: [RuntimeViewCanvasComponent,
            RuntimeViewCanvasItemComponent,
            RuntimeViewCanvasItemContainerComponent,
            RuntimeViewCanvasOutletComponent], imports: [i2.CommonModule, forms.FormsModule], exports: [RuntimeViewCanvasOutletComponent,
            RuntimeViewCanvasComponent,
            RuntimeViewCanvasItemComponent,
            RuntimeViewCanvasItemContainerComponent] });
    RuntimeViewCanvasModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasModule, imports: [[i2.CommonModule, forms.FormsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewCanvasModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, forms.FormsModule],
                        declarations: [
                            RuntimeViewCanvasComponent,
                            RuntimeViewCanvasItemComponent,
                            RuntimeViewCanvasItemContainerComponent,
                            RuntimeViewCanvasOutletComponent
                        ],
                        exports: [
                            RuntimeViewCanvasOutletComponent,
                            RuntimeViewCanvasComponent,
                            RuntimeViewCanvasItemComponent,
                            RuntimeViewCanvasItemContainerComponent
                        ],
                        entryComponents: [RuntimeViewCanvasItemContainerComponent]
                    }]
            }] });

    var RuntimeViewModalComponent = /** @class */ (function () {
        function RuntimeViewModalComponent(rxRuntimeViewRegistryService, rxUtilityModalsService, translateService, changeDetector, activeModalRef, dockedPanelContext) {
            this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
            this.rxUtilityModalsService = rxUtilityModalsService;
            this.translateService = translateService;
            this.changeDetector = changeDetector;
            this.activeModalRef = activeModalRef;
            this.dockedPanelContext = dockedPanelContext;
            this.isBlade = false;
            this.context = dockedPanelContext || activeModalRef;
            this.isBlade = Boolean(dockedPanelContext);
            var data = this.context.getData();
            this.configuration = data.configuration;
            this.title = data.title;
            this.notification = data.notification;
            this.isCancellable = data.isCancellable;
            this.closeLabel = translateService.instant('com.bmc.arsys.rx.client.common.close.label');
        }
        RuntimeViewModalComponent.prototype.onCancelView = function () {
            this.context.dismiss(null);
        };
        RuntimeViewModalComponent.prototype.closeModal = function () {
            this.context.dismiss(i4.DismissReasons.CLOSE_BTN);
        };
        RuntimeViewModalComponent.prototype.onClose = function (viewOutputParams) {
            this.context.close(viewOutputParams);
        };
        RuntimeViewModalComponent.prototype.onBeforeLoad = function () {
            this.busySubscription = rxjs.NEVER.subscribe();
            // workaround: run changeDetector to avoid the ExpressionChangedAfterItHasBeenCheckedError
            this.changeDetector.detectChanges();
        };
        RuntimeViewModalComponent.prototype.onAfterLoad = function () {
            var _a;
            (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        return RuntimeViewModalComponent;
    }());
    RuntimeViewModalComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModalComponent, deps: [{ token: RxRuntimeViewRegistryService }, { token: i2__namespace$3.RxUtilityModalsService }, { token: i3__namespace.TranslateService }, { token: i0__namespace.ChangeDetectorRef }, { token: i4__namespace.ActiveModalRef, optional: true }, { token: i4__namespace.DockedPanelContext, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    RuntimeViewModalComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewModalComponent, selector: "rx-runtime-view-modal", ngImport: i0__namespace, template: "<ng-container *ngIf=\"title || isCancellable\">\n  <div class=\"dp-header\" *ngIf=\"isBlade; else modalHeader\">\n    <span class=\"dp-title\">{{ title }}</span>\n    <button\n      class=\"close dp-close\"\n      rx-id=\"x-button\"\n      [attr.aria-label]=\"closeLabel\"\n      *ngIf=\"isCancellable\"\n      (click)=\"closeModal()\"\n    ></button>\n  </div>\n</ng-container>\n\n<ng-template #modalHeader>\n  <div class=\"modal-header\">\n    <h5 class=\"modal-title\">{{ title }}</h5>\n    <button\n      class=\"close dp-close\"\n      rx-id=\"x-button\"\n      [attr.aria-label]=\"closeLabel\"\n      *ngIf=\"isCancellable\"\n      (click)=\"closeModal()\"\n    ></button>\n  </div>\n</ng-template>\n\n<adapt-alert\n  *ngIf=\"notification\"\n  class=\"pl-4 pt-4\"\n  [config]=\"{\n    content: notification,\n    type: 'inline',\n    variant: 'info'\n  }\"\n></adapt-alert>\n\n<div\n  [ngClass]=\"{\n    'modal-body p-0': !isBlade,\n    'dp-content': isBlade\n  }\"\n>\n  <div class=\"position-relative\">\n    <rx-busy-indicator\n      [options]=\"{\n        busy: busySubscription,\n        loaderType: 'lineLoader',\n        delay: 250,\n        backdrop: false,\n        message: null\n      }\"\n    >\n    </rx-busy-indicator>\n  </div>\n\n  <rx-runtime-view\n    [configuration]=\"configuration\"\n    (cancelView)=\"onCancelView()\"\n    (closeView)=\"onClose($event)\"\n    (beforeLoad)=\"onBeforeLoad()\"\n    (afterLoad)=\"onAfterLoad()\"\n  ></rx-runtime-view>\n</div>\n", styles: [":host{height:100%;display:flex;flex-direction:column}.modal-header{min-height:34px}.dp-header{flex-direction:row!important}.dp-content>rx-runtime-view{height:100%}\n"], components: [{ type: i4__namespace.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i2__namespace$3.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: RuntimeViewComponent, selector: "rx-runtime-view", inputs: ["configuration"], outputs: ["save", "closeView", "cancelView", "beforeLoad", "afterLoad"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModalComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'rx-runtime-view-modal',
                        templateUrl: './runtime-view-modal.component.html',
                        styleUrls: ['./runtime-view-modal.component.scss']
                    }]
            }], ctorParameters: function () {
            return [{ type: RxRuntimeViewRegistryService }, { type: i2__namespace$3.RxUtilityModalsService }, { type: i3__namespace.TranslateService }, { type: i0__namespace.ChangeDetectorRef }, { type: i4__namespace.ActiveModalRef, decorators: [{
                            type: i0.Optional
                        }] }, { type: i4__namespace.DockedPanelContext, decorators: [{
                            type: i0.Optional
                        }] }];
        } });

    var RX_RUNTIME_VIEW = {
        actions: {
            save: 'rx-runtime-view-save',
            close: 'rx-runtime-view-close',
            cancel: 'rx-runtime-view-cancel'
        }
    };

    var RuntimeViewModule = /** @class */ (function () {
        function RuntimeViewModule() {
        }
        return RuntimeViewModule;
    }());
    RuntimeViewModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RuntimeViewModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModule, declarations: [RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent], imports: [i2.CommonModule, RuntimeViewCanvasModule, i3.TranslateModule, i4.AdaptAlertModule, i2$3.RxBusyIndicatorModule], exports: [RuntimeViewCanvasModule, RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent] });
    RuntimeViewModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModule, imports: [[i2.CommonModule, RuntimeViewCanvasModule, i3.TranslateModule, i4.AdaptAlertModule, i2$3.RxBusyIndicatorModule], RuntimeViewCanvasModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RuntimeViewModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, RuntimeViewCanvasModule, i3.TranslateModule, i4.AdaptAlertModule, i2$3.RxBusyIndicatorModule],
                        exports: [RuntimeViewCanvasModule, RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent],
                        declarations: [RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent],
                        entryComponents: [RuntimeViewRootComponent, RuntimeViewModalComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BaseViewComponent = BaseViewComponent;
    exports.RX_RUNTIME_VIEW = RX_RUNTIME_VIEW;
    exports.RuntimeLayoutItem = RuntimeLayoutItem;
    exports.RuntimeLayoutOutlet = RuntimeLayoutOutlet;
    exports.RuntimeLayoutOutletColumn = RuntimeLayoutOutletColumn;
    exports.RuntimeViewCanvasComponent = RuntimeViewCanvasComponent;
    exports.RuntimeViewCanvasItemComponent = RuntimeViewCanvasItemComponent;
    exports.RuntimeViewCanvasItemContainerComponent = RuntimeViewCanvasItemContainerComponent;
    exports.RuntimeViewCanvasItemService = RuntimeViewCanvasItemService;
    exports.RuntimeViewCanvasModule = RuntimeViewCanvasModule;
    exports.RuntimeViewCanvasOutletComponent = RuntimeViewCanvasOutletComponent;
    exports.RuntimeViewComponent = RuntimeViewComponent;
    exports.RuntimeViewModalComponent = RuntimeViewModalComponent;
    exports.RuntimeViewModel = RuntimeViewModel;
    exports.RuntimeViewModelApi = RuntimeViewModelApi;
    exports.RuntimeViewModule = RuntimeViewModule;
    exports.RuntimeViewRootComponent = RuntimeViewRootComponent;
    exports.RxRuntimeViewRegistryService = RxRuntimeViewRegistryService;
    exports.RxRuntimeViewUtilsService = RxRuntimeViewUtilsService;
    exports.VIEW_COMPONENT_DEFAULT_EVENT_NAME = VIEW_COMPONENT_DEFAULT_EVENT_NAME;
    exports.ViewComponentEventManager = ViewComponentEventManager;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-view-runtime.umd.js.map
