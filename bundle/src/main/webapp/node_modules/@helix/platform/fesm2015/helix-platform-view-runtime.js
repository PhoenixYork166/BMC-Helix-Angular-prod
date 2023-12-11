import * as i0 from '@angular/core';
import { Injectable, ViewContainerRef, Component, Input, ViewChild, HostBinding, EventEmitter, Output, HostListener, Directive, NgModule, Optional } from '@angular/core';
import { Subject, ReplaySubject, from, of, EMPTY, merge, throwError, asyncScheduler, combineLatest, BehaviorSubject, Observable, NEVER } from 'rxjs';
import { takeUntil, skipWhile, distinctUntilChanged, delay, mergeScan, map, take, switchMap, filter, distinct, reduce, tap, defaultIfEmpty, switchMapTo, catchError, pluck } from 'rxjs/operators';
import * as i2$4 from '@helix/platform/record/api';
import * as i2$1 from '@helix/platform/view/api';
import { RX_VIEW_DEFINITION, ViewLayoutRole, RxViewComponentType, RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_AVAILABLE_ON_DEVICES_ALL_VALUE, RxViewLayout, ViewComponentPropertyType } from '@helix/platform/view/api';
import * as i2$2 from '@helix/platform/utils';
import { RX_GUID } from '@helix/platform/utils';
import { pick, includes, castArray, isString, chain, values, isObject, isEmpty, head, some, has, groupBy, map as map$1, keys, every, intersection, forEach, get, forOwn, find, sortBy, toNumber, forIn, isFunction, set, isNil, pull } from 'lodash';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@helix/platform/shared/api';
import * as i2$3 from '@helix/platform/ui-kit';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import * as i8 from '@helix/platform/association/api';
import * as i5 from '@helix/platform/process/api';
import { FormsModule } from '@angular/forms';
import * as i3 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i4 from '@bmc-ux/adapt-angular';
import { DismissReasons, AdaptAlertModule } from '@bmc-ux/adapt-angular';

class RuntimeLayoutOutletColumn {
    constructor() {
        this.children = [];
    }
}
class RuntimeLayoutOutlet {
    constructor() {
        this.children = [];
        this.columns = [new RuntimeLayoutOutletColumn()];
        this.height = null;
    }
}

class RuntimeLayoutItem {
    constructor(options) {
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
    initializeOutlets(outlets) {
        outlets.forEach((outlet) => {
            const layoutOutletItem = new RuntimeLayoutOutlet();
            layoutOutletItem.name = outlet.name;
            layoutOutletItem.height = outlet.hasOwnProperty('height') ? outlet.height : null;
            this.outlets.push(layoutOutletItem);
        });
    }
    addLayoutItem(layoutTreeItem, columnConfig) {
        const outlet = this.outlets.find((outletItem) => outletItem.name === columnConfig.parentOutlet.name);
        const insertIndex = columnConfig.parentOutlet.columns[columnConfig.columnIndex].children.indexOf(layoutTreeItem.guid);
        columnConfig.parentOutlet.columns.forEach((column, columnIndex) => {
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
    }
}

class RuntimeViewCanvasService {
    constructor() {
        this.componentPropertyChangedSubject = new Subject();
        this.componentPropertyChanged$ = this.componentPropertyChangedSubject.asObservable();
    }
    onViewComponentPropertyChanged(componentPropertyChange) {
        this.componentPropertyChangedSubject.next(componentPropertyChange);
    }
}
RuntimeViewCanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewCanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasService, decorators: [{
            type: Injectable
        }] });

class RuntimeViewCanvasItemService {
    constructor(injector, componentFactoryResolver, runtimeViewCanvasService) {
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
        this.runtimeViewCanvasService = runtimeViewCanvasService;
        this.hasMargin = true;
        this.hasAutoFill = false;
        this.hasAutoScroll = false;
        this.isHidden = false;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    registerOutlet(outletName, outletViewContainerRef, containerComponent) {
        const currentOutlet = this.layout.outlets.find((outlet) => outlet.name === outletName);
        if (currentOutlet) {
            this.renderContainerComponent(outletViewContainerRef, currentOutlet, containerComponent);
        }
    }
    getChildren(outletName) {
        const currentOutlet = this.layout.outlets.find((outlet) => outlet.name === outletName);
        return currentOutlet.columns.map((column) => (Object.assign(Object.assign({}, column), { children: column.children
                .filter(Boolean)
                .map((child) => pick(child, 'config', 'guid', 'runtimeViewModelApi', 'factory', 'outlets')) })));
    }
    renderViewComponent() {
        var _a, _b, _c, _d;
        this.componentRef = this.container.createComponent(this.layout.factory, null, this.injector);
        this.componentInstance = this.componentRef.instance;
        this.componentInstance.guid = this.layout.guid;
        this.componentInstance.config = this.layout.config;
        this.componentInstance.runtimeViewModelApi = this.layout.runtimeViewModelApi;
        (_a = this.componentInstance.propertyChanged) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroyed$)).subscribe((propertyChange) => {
            this.runtimeViewCanvasService.onViewComponentPropertyChanged(propertyChange);
        });
        // Update hasMargin, hasAutoScroll, and hasAutoFill property bindings asynchronously using timeout
        // to trigger change detection. Otherwise "ExpressionChangedAfterItHasBeenCheckedError" will occur.
        (_b = this.componentInstance.hidden) === null || _b === void 0 ? void 0 : _b.pipe(skipWhile((value) => !value), distinctUntilChanged(), delay(0), takeUntil(this.destroyed$)).subscribe((hidden) => {
            this.hasMargin = !hidden;
            this.isHidden = hidden;
        });
        (_c = this.componentInstance.autoScroll) === null || _c === void 0 ? void 0 : _c.pipe(skipWhile((value) => !value), distinctUntilChanged(), delay(0), takeUntil(this.destroyed$)).subscribe((autoScroll) => {
            this.hasAutoScroll = autoScroll;
        });
        (_d = this.componentInstance.autoFill) === null || _d === void 0 ? void 0 : _d.pipe(skipWhile((value) => !value), distinctUntilChanged(), delay(0), takeUntil(this.destroyed$)).subscribe((autoFill) => {
            this.hasAutoFill = autoFill;
        });
    }
    renderContainerComponent(outletViewContainerRef, currentOutlet, containerComponent) {
        const containerComponentFactory = containerComponent;
        const containerRef = outletViewContainerRef.createComponent(containerComponentFactory);
        containerRef.instance.columns = currentOutlet.columns;
        containerRef.instance.outlet = currentOutlet;
    }
}
RuntimeViewCanvasItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemService, deps: [{ token: i0.Injector }, { token: i0.ComponentFactoryResolver }, { token: RuntimeViewCanvasService }], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewCanvasItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ComponentFactoryResolver }, { type: RuntimeViewCanvasService }]; } });

class RuntimeViewCanvasItemComponent {
    constructor(runtimeViewCanvasItemService) {
        this.runtimeViewCanvasItemService = runtimeViewCanvasItemService;
    }
    get hasMargin() {
        return this.runtimeViewCanvasItemService.hasMargin;
    }
    get hasAutoFill() {
        return this.runtimeViewCanvasItemService.hasAutoFill && !this.runtimeViewCanvasItemService.isHidden;
    }
    get hasAutoScroll() {
        return this.runtimeViewCanvasItemService.hasAutoScroll;
    }
    ngOnChanges(changes) {
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
    }
    registerOutlet(outletName, outletViewContainerRef) {
        this.runtimeViewCanvasItemService.registerOutlet(outletName, outletViewContainerRef);
    }
    getChildren(outletName) {
        return this.runtimeViewCanvasItemService.getChildren(outletName);
    }
}
RuntimeViewCanvasItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemComponent, deps: [{ token: RuntimeViewCanvasItemService }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: { layout: "layout" }, host: { properties: { "class.rx-runtime-view-canvas-item-margin": "this.hasMargin", "class.rx-runtime-view-canvas-item-auto-fill": "this.hasAutoFill", "class.rx-runtime-view-canvas-item-auto-scroll": "this.hasAutoScroll" } }, providers: [RuntimeViewCanvasItemService], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container #container></ng-container>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas-item',
                    templateUrl: './runtime-view-canvas-item.component.html',
                    providers: [RuntimeViewCanvasItemService]
                }]
        }], ctorParameters: function () { return [{ type: RuntimeViewCanvasItemService }]; }, propDecorators: { layout: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], hasMargin: [{
                type: HostBinding,
                args: ['class.rx-runtime-view-canvas-item-margin']
            }], hasAutoFill: [{
                type: HostBinding,
                args: ['class.rx-runtime-view-canvas-item-auto-fill']
            }], hasAutoScroll: [{
                type: HostBinding,
                args: ['class.rx-runtime-view-canvas-item-auto-scroll']
            }] } });

class RuntimeViewCanvasItemContainerComponent {
    constructor() {
        this.columns = [];
    }
    get hostClass() {
        if (this.outlet.height) {
            return `${this.outlet.height}px`;
        }
        return null;
    }
    trackByFn(index, item) {
        return (item === null || item === void 0 ? void 0 : item.guid) || index;
    }
}
RuntimeViewCanvasItemContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasItemContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasItemContainerComponent, selector: "rx-runtime-view-canvas-item-container", inputs: { columns: "columns", outlet: "outlet" }, host: { properties: { "style.min-height": "this.hostClass" } }, ngImport: i0, template: "<ng-container *ngIf=\"columns.length > 1\">\n  <div class=\"row rx-runtime-view-canvas-item-container-row\">\n    <div\n      class=\"rx-runtime-view-canvas-item-container-column\"\n      [ngClass]=\"column.cssClass ? column.cssClass : column.span ? 'col-' + column.span : 'col'\"\n      *ngFor=\"let column of columns\"\n    >\n      <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: column.children }\"></ng-container>\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"columns.length === 1\">\n  <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: columns[0].children }\"></ng-container>\n</ng-container>\n\n<ng-template #itemTpl let-layoutItems>\n  <rx-runtime-view-canvas-item\n    #item\n    *ngFor=\"let layoutItem of layoutItems; trackBy: trackByFn\"\n    [layout]=\"layoutItem\"\n  ></rx-runtime-view-canvas-item>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-runtime-view-canvas-item{display:block}::ng-deep .rx-runtime-view-canvas-item-margin:not(:last-child){margin-bottom:1rem}.rx-runtime-view-canvas-item-auto-fill,.rx-runtime-view-canvas-item-container-row,.rx-runtime-view-canvas-item-container-column{height:100%}.rx-runtime-view-canvas-item-container-column{display:flex;flex-direction:column}.rx-runtime-view-canvas-item-auto-scroll{overflow-y:auto}.rx-mb-sm{margin-bottom:1rem}@media (min-width: 576px){.rx-mb-sm{margin-bottom:0}}.rx-mb-sm:nth-last-child(1){margin-bottom:0}.rx-mb-md{margin-bottom:1rem}@media (min-width: 768px){.rx-mb-md{margin-bottom:0}}.rx-mb-md:nth-last-child(1){margin-bottom:0}.rx-mb-lg{margin-bottom:1rem}@media (min-width: 992px){.rx-mb-lg{margin-bottom:0}}.rx-mb-lg:nth-last-child(1){margin-bottom:0}.rx-mb-xl{margin-bottom:1rem}@media (min-width: 1200px){.rx-mb-xl{margin-bottom:0}}.rx-mb-xl:nth-last-child(1){margin-bottom:0}.rx-mb-xxl{margin-bottom:1rem}@media (min-width: 1600px){.rx-mb-xxl{margin-bottom:0}}.rx-mb-xxl:nth-last-child(1){margin-bottom:0}\n"], components: [{ type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas-item-container',
                    templateUrl: './runtime-view-canvas-item-container.component.html',
                    styleUrls: ['./runtime-view-canvas-item-container.component.scss']
                }]
        }], propDecorators: { columns: [{
                type: Input
            }], outlet: [{
                type: Input
            }], hostClass: [{
                type: HostBinding,
                args: ['style.min-height']
            }] } });

class RuntimeViewRootComponent {
    constructor(runtimeCanvasItemComponent) {
        this.runtimeCanvasItemComponent = runtimeCanvasItemComponent;
        this.defaultOutletName = RX_VIEW_DEFINITION.defaultOutletName;
        this.layoutRole = ViewLayoutRole;
    }
    isHidden(outlet) {
        return outlet.name === ViewLayoutRole.Header && outlet.columns[0].children.length === 0;
    }
}
RuntimeViewRootComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewRootComponent, deps: [{ token: RuntimeViewCanvasItemComponent }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewRootComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewRootComponent, selector: "rx-runtime-view-root", ngImport: i0, template: "<rx-runtime-view-canvas-item-container\n  *ngFor=\"let outlet of runtimeCanvasItemComponent.layout.outlets\"\n  [hidden]=\"isHidden(outlet)\"\n  [columns]=\"outlet.columns\"\n  [outlet]=\"outlet\"\n  [ngClass]=\"{\n    'content-outlet': outlet.name === defaultOutletName,\n    'outlet-padding': [layoutRole.Header, layoutRole.Footer, defaultOutletName].includes(outlet.name)\n  }\"\n></rx-runtime-view-canvas-item-container>\n", styles: [":host{display:flex;flex-direction:column;height:100%;overflow:hidden}rx-runtime-view-canvas-item-container{padding:0 1rem}.outlet-padding{padding:1rem}.content-outlet{flex:1;overflow-y:auto;overflow-x:hidden}\n"], components: [{ type: RuntimeViewCanvasItemContainerComponent, selector: "rx-runtime-view-canvas-item-container", inputs: ["columns", "outlet"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewRootComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-root',
                    templateUrl: './runtime-component.html',
                    styleUrls: ['./runtime-component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RuntimeViewCanvasItemComponent }]; } });

/**
 * @desc Represents runtime component tree
 */
class RuntimeViewLayoutService {
    constructor(rxViewComponentRegistryService, viewDefinitionParserService, factoryResolver, tree, rxJsonParserService, rxLogService, rxOldViewLayoutAdapterService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.viewDefinitionParserService = viewDefinitionParserService;
        this.factoryResolver = factoryResolver;
        this.tree = tree;
        this.rxJsonParserService = rxJsonParserService;
        this.rxLogService = rxLogService;
        this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
    }
    clear() {
        this.layout = null;
    }
    init(runtimeViewModel, runtimeViewModelApi) {
        this.runtimeViewModel = runtimeViewModel;
        this.runtimeViewModelApi = runtimeViewModelApi;
        this.viewDefinitionParserService
            .getComponents(runtimeViewModel.viewDefinition)
            .forEach(this.processDefinition.bind(this));
    }
    processDefinition(componentDefinitionItem) {
        this.rxOldViewLayoutAdapterService.convertLayout(componentDefinitionItem);
        if (!componentDefinitionItem.parentComponentDefinition) {
            this.initializeView(componentDefinitionItem.componentDefinition);
        }
        else {
            const componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinitionItem.componentDefinition.type);
            if (componentDefinitionItem.componentDefinition.type !== RxViewComponentType.Action &&
                componentDescriptor &&
                !this.runtimeViewModel.isDataViewComponentDefinition(componentDescriptor)) {
                // todo move this logic to separate method
                const parentComponentDefinitionLayout = JSON.parse(componentDefinitionItem.parentComponentDefinition.layout);
                let columnIndex = 0;
                const parentOutlet = parentComponentDefinitionLayout.outlets.find((outlet) => {
                    return outlet.columns.find((col, colIndex) => {
                        const includes = col.children.includes(componentDefinitionItem.componentDefinition.guid);
                        if (includes) {
                            columnIndex = colIndex;
                        }
                        return includes;
                    });
                });
                if (parentOutlet) {
                    const viewComponentConfig = this.runtimeViewModel.viewComponentStates
                        .get(componentDefinitionItem.componentDefinition.guid)
                        .config$.asObservable();
                    const parentLayoutItem = this.getLayoutItem(componentDefinitionItem.parentComponentDefinition.guid);
                    parentLayoutItem.addLayoutItem(new RuntimeLayoutItem({
                        guid: componentDefinitionItem.componentDefinition.guid,
                        config: viewComponentConfig,
                        parent: parentLayoutItem,
                        runtimeViewModelApi: this.runtimeViewModelApi,
                        outlets: componentDescriptor.outlets,
                        factory: componentDescriptor.componentFactory
                    }), {
                        parentOutlet,
                        columnIndex
                    });
                }
                else {
                    const component = componentDefinitionItem.componentDefinition;
                    this.rxLogService.warning(`Cannot render view component. ${component.type} (${component.guid}) is not used in layout.`);
                }
            }
        }
    }
    initializeView(viewDefinition) {
        const layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
        this.layout = new RuntimeLayoutItem({
            guid: viewDefinition.guid,
            parent: null,
            runtimeViewModelApi: this.runtimeViewModelApi,
            outlets: layout.outlets,
            factory: this.factoryResolver.resolveComponentFactory(RuntimeViewRootComponent)
        });
    }
    getLayoutItem(guid) {
        const flattenedLayoutItems = this.tree.flattenBy(this.layout, (currentLayout) => {
            return currentLayout.outlets.reduce((result, outlet) => {
                outlet.columns.forEach((column) => {
                    column.children.forEach((canvasLayout) => {
                        result.push(canvasLayout);
                    });
                });
                return result;
            }, []);
        });
        return flattenedLayoutItems.find((flattenedLayoutItem) => flattenedLayoutItem.guid === guid);
    }
}
RuntimeViewLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewLayoutService, deps: [{ token: i2$1.RxViewComponentRegistryService }, { token: i2$1.RxViewDefinitionParserService }, { token: i0.ComponentFactoryResolver }, { token: i2$2.RxTreeService }, { token: i2$2.RxJsonParserService }, { token: i1.RxLogService }, { token: i2$1.RxOldViewLayoutAdapterService }], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewLayoutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewLayoutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2$1.RxViewComponentRegistryService }, { type: i2$1.RxViewDefinitionParserService }, { type: i0.ComponentFactoryResolver }, { type: i2$2.RxTreeService }, { type: i2$2.RxJsonParserService }, { type: i1.RxLogService }, { type: i2$1.RxOldViewLayoutAdapterService }]; } });

class RuntimeViewModelApi {
    clear() {
        this.runtimeViewModel = null;
    }
    init(model) {
        if (!this.runtimeViewModel) {
            this.runtimeViewModel = model;
        }
    }
    triggerViewActions(guid, eventName) {
        return this.runtimeViewModel.triggerViewActions(guid, eventName);
    }
    cancel(skipDirtyCheck) {
        return this.runtimeViewModel.cancel(skipDirtyCheck);
    }
    close() {
        return this.runtimeViewModel.close();
    }
    getViewInputParameters() {
        return this.runtimeViewModel.getViewInputParameters();
    }
    applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
        return this.runtimeViewModel.applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets);
    }
    deleteViewPreset(viewPresetGuid) {
        return this.runtimeViewModel.deleteViewPreset(viewPresetGuid);
    }
    discardViewPresetChanges(viewPresetGuid, sharedViewPresets) {
        return this.runtimeViewModel.discardViewPresetChanges(viewPresetGuid, sharedViewPresets);
    }
    saveViewPreset(viewPresetGuid) {
        return this.runtimeViewModel.saveViewPreset(viewPresetGuid);
    }
    shareViewPreset(viewPresetSelectorGuid) {
        return this.runtimeViewModel.shareViewPreset(viewPresetSelectorGuid);
    }
}
RuntimeViewModelApi.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModelApi, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewModelApi.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModelApi });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModelApi, decorators: [{
            type: Injectable
        }] });

class ComponentExpression {
    constructor(propertyName, expression, rxExpressionEvaluatorService, customEvaluatorService) {
        this.propertyName = propertyName;
        this.expression = expression;
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.customEvaluatorService = customEvaluatorService;
    }
    evaluate(expressionContext) {
        return this.rxExpressionEvaluatorService.tryEvaluate(this.expression, expressionContext, this.customEvaluatorService);
    }
    hasDependency(guid, propertyName) {
        return includes(this.expression, `${guid}.${propertyName}`);
    }
    hasTokens() {
        return includes(this.expression, '${view.') || this.hasKeywordTokens();
    }
    hasKeywordTokens() {
        return includes(this.expression, '${keywords.');
    }
    hasViewTokens() {
        return (includes(this.expression, '${view.inputParams') ||
            includes(this.expression, '${view.api') ||
            this.hasViewIsValidToken());
    }
    hasViewIsValidToken() {
        return includes(this.expression, '${view.isValid}');
    }
    hasComponentTokens() {
        return includes(this.expression, '${view.components');
    }
}

class ViewComponentEventManager {
    constructor(rxGlobalEventsService, rxLogService, rxViewActionService, errorHandler) {
        this.rxGlobalEventsService = rxGlobalEventsService;
        this.rxLogService = rxLogService;
        this.rxViewActionService = rxViewActionService;
        this.errorHandler = errorHandler;
    }
    executeActions(actions, actionCallback) {
        return new Promise((resolve, reject) => {
            let resultValue;
            from(actions)
                .pipe(mergeScan((acc, currentAction) => {
                this.rxLogService.debug('ACTION STARTED: ' + currentAction.name);
                return this.rxViewActionService.execute(currentAction.name, currentAction.parameters).pipe(map((result) => actionCallback(currentAction, result)), take(1));
            }, null, 1))
                .subscribe({
                next: (result) => (resultValue = result),
                error: (error) => {
                    reject(error);
                    this.rxGlobalEventsService.viewActionsCompleted$.next();
                    castArray(error).forEach((e) => {
                        if (isString(e)) {
                            this.rxLogService.warning(e);
                        }
                        else if (e) {
                            this.errorHandler.handleError(e);
                        }
                    });
                },
                complete: () => {
                    this.rxGlobalEventsService.viewActionsCompleted$.next();
                    resolve(resultValue);
                }
            });
        });
    }
}
ViewComponentEventManager.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewComponentEventManager, deps: [{ token: i1.RxGlobalEventsService }, { token: i1.RxLogService }, { token: i2$1.RxViewActionService }, { token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Injectable });
ViewComponentEventManager.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewComponentEventManager, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewComponentEventManager, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalEventsService }, { type: i1.RxLogService }, { type: i2$1.RxViewActionService }, { type: i0.ErrorHandler }]; } });

const VIEW_COMPONENT_DEFAULT_EVENT_NAME = 'default';

class RxRuntimeViewUtilsService {
    constructor(rxViewDefinitionService, rxViewDefinitionParserService, rxDefinitionAdapterRegistryService, rxViewActionDefinitionAdapterRegistryService, rxViewDefinitionCacheService) {
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
    }
    isViewCancellable(viewDefinitionName) {
        if (isString(viewDefinitionName)) {
            return this.rxViewDefinitionCacheService
                .getViewDefinition(viewDefinitionName)
                .pipe(map((viewDefinition) => this.hasPageComponent(viewDefinition) || this.hasViewCancellingAction(viewDefinition)));
        }
        else {
            return of(this.hasPageComponent(viewDefinitionName) || this.hasViewCancellingAction(viewDefinitionName));
        }
    }
    runAdaptersForComponents(viewDefinition, containerViewComponentDefinition) {
        const componentPairs = this.rxViewDefinitionParserService.getComponents(containerViewComponentDefinition || viewDefinition);
        const regex = new RegExp(`\\$\{view.components.${RX_GUID.baseGuidPattern}.`);
        viewDefinition.viewComponentExpressions = chain(componentPairs)
            .map((component) => values(component.componentDefinition.propertiesByName))
            .flatten()
            .map((propertyValue) => (isObject(propertyValue) ? values(propertyValue) : propertyValue))
            .flatten()
            .filter(isString)
            .filter((propertyValue) => regex.test(propertyValue))
            .value();
        const result = componentPairs.reduce((adapterObservables$, { componentDefinition }) => {
            const adapter = componentDefinition.type === RxViewComponentType.Action
                ? this.rxViewActionDefinitionAdapterRegistryService.getRuntimeAdapter(componentDefinition.propertiesByName.name)
                : this.rxDefinitionAdapterRegistryService.getRuntimeAdapter(componentDefinition.type);
            if (adapter) {
                const result$ = adapter.adaptDefinition(componentDefinition, viewDefinition);
                adapterObservables$.push(result$ ? result$.pipe(take(1)) : EMPTY);
            }
            return adapterObservables$;
        }, []);
        return isEmpty(result) ? [EMPTY] : result;
    }
    hasViewCancellingAction(viewDefinition) {
        return Boolean(this.rxViewDefinitionParserService.findViewComponent(viewDefinition, (viewComponentDefinition) => viewComponentDefinition.type === RxViewComponentType.Action &&
            viewComponentDefinition.propertiesByName.name === 'rxCloseViewAction' &&
            viewComponentDefinition.propertiesByName.actAsCancel === 'true'));
    }
    hasPageComponent(viewDefinition) {
        var _a;
        return ((_a = head(viewDefinition.componentDefinitions)) === null || _a === void 0 ? void 0 : _a.type) === RxViewComponentType.Page;
    }
}
RxRuntimeViewUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewUtilsService, deps: [{ token: i2$1.RxViewDefinitionService }, { token: i2$1.RxViewDefinitionParserService }, { token: i1.RxDefinitionAdapterRegistryService }, { token: i2$1.RxViewActionDefinitionAdapterRegistryService }, { token: i2$1.RxViewDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRuntimeViewUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxViewDefinitionService }, { type: i2$1.RxViewDefinitionParserService }, { type: i1.RxDefinitionAdapterRegistryService }, { type: i2$1.RxViewActionDefinitionAdapterRegistryService }, { type: i2$1.RxViewDefinitionCacheService }]; } });

class RxViewDefinitionAdapterService {
    constructor(rxObjectUtilsService, rxJsonParserService, rxDeviceDetectionService) {
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxDeviceDetectionService = rxDeviceDetectionService;
    }
    // called to make view modifications before the view component adapters are executed
    preProcessViewDefinition(viewDefinition) {
        var _a;
        (_a = viewDefinition.componentDefinitions) === null || _a === void 0 ? void 0 : _a.forEach((childComponentDefinition) => {
            this.expandProperties(childComponentDefinition);
        });
    }
    // called to make view modifications after the view component adapters have been executed
    postProcessViewDefinition(viewDefinition) {
        var _a;
        (_a = viewDefinition.componentDefinitions) === null || _a === void 0 ? void 0 : _a.forEach((childComponentDefinition) => {
            this.filterComponentsForDevice(childComponentDefinition, viewDefinition);
        });
    }
    expandProperties(componentDefinition) {
        componentDefinition.propertiesByName = this.rxObjectUtilsService.expandProperties(componentDefinition.propertiesByName);
        if (componentDefinition.componentDefinitions) {
            componentDefinition.componentDefinitions.forEach((childComponentDefinition) => {
                this.expandProperties(childComponentDefinition);
            });
        }
    }
    filterComponentsForDevice(componentDefinition, parent) {
        var _a;
        const availableOnDevicesProp = this.rxJsonParserService.tryParseJson((_a = componentDefinition.propertiesByName) === null || _a === void 0 ? void 0 : _a[RX_AVAILABLE_ON_DEVICES_PROP_NAME], RX_AVAILABLE_ON_DEVICES_ALL_VALUE) || RX_AVAILABLE_ON_DEVICES_ALL_VALUE;
        if (availableOnDevicesProp.includes(this.rxDeviceDetectionService.currentDevice)) {
            if ('componentDefinitions' in componentDefinition) {
                componentDefinition.componentDefinitions.forEach((childComponentDefinition) => {
                    this.filterComponentsForDevice(childComponentDefinition, componentDefinition);
                });
            }
        }
        else {
            parent.componentDefinitions = parent.componentDefinitions.filter((definition) => definition !== componentDefinition);
            if (parent.layout) {
                const updatedLayout = RxViewLayout.removeChildFromLayout(this.rxJsonParserService.tryParseJson(parent.layout), componentDefinition.guid);
                parent.layout = JSON.stringify(updatedLayout);
            }
        }
    }
}
RxViewDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionAdapterService, deps: [{ token: i2$2.RxObjectUtilsService }, { token: i2$2.RxJsonParserService }, { token: i2$1.RxDeviceDetectionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2$2.RxObjectUtilsService }, { type: i2$2.RxJsonParserService }, { type: i2$1.RxDeviceDetectionService }]; } });

class RuntimeViewModel {
    constructor(rxBundleService, rxGlobalCacheService, rxViewComponentRegistryService, rxViewDefinitionAdapterService, rxViewDefinitionParserService, rxViewDefinitionService, rxRuntimeViewUtilsService, rxExpressionEvaluatorService, rxNotificationService, rxViewActionRegistryService, rxLogService, viewComponentEventManager, rxUtilityModalsService, rxViewDefinitionCacheService, rxObjectUtilsService, rxJsonParserService, rxCurrentUserService) {
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
        this.saveSubject = new Subject();
        this.closeSubject = new Subject();
        this.cancelSubject = new Subject();
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
    init(configuration) {
        this.configuration = configuration;
        this.clear();
        const viewDefinition$ = isString(configuration.viewDefinitionName)
            ? this.rxViewDefinitionCacheService.getViewDefinition(configuration.viewDefinitionName)
            : of(configuration.viewDefinitionName);
        return viewDefinition$.pipe(switchMap((viewDefinition) => {
            const viewComponents = this.rxViewDefinitionParserService.getComponents(viewDefinition, true);
            const ownerBundleIds = viewComponents.map((viewComponent) => viewComponent.componentDefinition.type === RxViewComponentType.Action
                ? this.rxViewActionRegistryService.getActionOwnerBundleId(viewComponent.componentDefinition.propertiesByName.name)
                : this.rxViewComponentRegistryService.getComponentOwnerBundleId(viewComponent.componentDefinition.type));
            return merge(...ownerBundleIds).pipe(filter(Boolean), distinct(), reduce((acc, bundleId) => {
                acc.push(bundleId);
                return acc;
            }, []), switchMap((bundleIds) => bundleIds.length
                ? this.rxBundleService.loadBundles(bundleIds, true).pipe(map(() => viewDefinition))
                : of(viewDefinition)), switchMap((viewDefinition) => this.rxViewComponentRegistryService.resolveAsyncDescriptors().pipe(map(() => viewDefinition))));
        }), switchMap((viewDefinition) => this.processViewDefinition(viewDefinition)));
    }
    clear() {
        this.viewComponentStates.clear();
        this.evaluationData.view.components = {};
        this.evaluationData.view.inputParams = {};
    }
    save(closeViewAfterSave = false) {
        return this.callRuntimeComponentsApi('save', closeViewAfterSave).pipe(tap({
            complete: () => this.saveSubject.next()
        }));
    }
    close() {
        const viewOutputParams = this.evaluateViewOutputParams();
        this.closeSubject.next(viewOutputParams);
        return of(viewOutputParams);
    }
    cancel(skipDirtyCheck) {
        if (skipDirtyCheck) {
            this.cancelSubject.next();
            return EMPTY;
        }
        else {
            return this.isDirtyView().pipe(switchMap((isDirty) => (isDirty ? this.rxUtilityModalsService.confirmUnsavedChanges() : of(true))), tap((canClose) => {
                if (canClose) {
                    this.cancelSubject.next();
                }
            }), switchMap((canClose) => {
                return canClose ? EMPTY : throwError(null);
            }));
        }
    }
    refresh() {
        return this.callRuntimeComponentsApi('refresh');
    }
    canClose() {
        let canClose = true;
        this.isDirtyView().subscribe((isDirty) => (canClose = !isDirty));
        return canClose;
    }
    applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
        return this.callRuntimeComponentsApi('applyViewPreset', viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets).pipe(switchMap(() => EMPTY));
    }
    deleteViewPreset(viewPresetGuid) {
        return this.callRuntimeComponentsApi('deleteViewPreset', viewPresetGuid).pipe(switchMap(() => EMPTY));
    }
    discardViewPresetChanges(viewPresetGuid, sharedViewPresets) {
        return this.callRuntimeComponentsApi('discardViewPresetChanges', viewPresetGuid, sharedViewPresets).pipe(switchMap(() => EMPTY));
    }
    saveViewPreset(viewPresetGuid) {
        return this.callRuntimeComponentsApi('saveViewPreset', viewPresetGuid).pipe(switchMap(() => EMPTY));
    }
    shareViewPreset(viewPresetSelectorGuid) {
        return this.callRuntimeComponentsApi('shareViewPreset', viewPresetSelectorGuid).pipe(defaultIfEmpty([]), map((data) => data
            .filter((item) => Boolean(item === null || item === void 0 ? void 0 : item.data))
            .reduce((result, item) => {
            result[item.guid] = item.data;
            return result;
        }, {})));
    }
    // launch view component actions for particular event
    triggerViewActions(componentGuid, viewActionTriggerEventName) {
        let actionsResult = Promise.resolve();
        const viewComponentState = this.viewComponentStates.get(componentGuid);
        if (viewComponentState) {
            const eventState = viewComponentState.eventStates[viewActionTriggerEventName];
            if (eventState) {
                const actionStates = eventState.map((actionState) => ({
                    guid: actionState.guid,
                    name: actionState.name,
                    parameters: actionState.config
                }));
                // execute view component actions for particular event
                actionsResult = this.viewComponentEventManager.executeActions(actionStates, (actionState, result) => {
                    // hook which is called after each action execution
                    // update action shared state and re-evaluate dependent action view component
                    this.onViewComponentActionOutputChanged(componentGuid, actionState.guid, result);
                });
            }
            else {
                this.rxLogService.warning(`Cannot trigger view actions. View Action Trigger Event ${viewActionTriggerEventName} not found.`);
            }
        }
        else {
            this.rxLogService.warning(`Cannot trigger view actions. View Component ${componentGuid} not found.`);
        }
        return actionsResult;
    }
    // hook which is called when view component triggers "property changed" event
    onViewComponentPropertyChanged({ guid, propertyName, newValue }) {
        const viewComponentState = this.viewComponentStates.get(guid);
        viewComponentState.publicState[propertyName] = newValue;
        this.updateEvaluationData(viewComponentState);
        // update config if changed property exist in component properties descriptor
        if (propertyName !== 'api' && some(viewComponentState.componentDescriptor.properties, { name: propertyName })) {
            this.updateComponentConfigProperty(propertyName, newValue, viewComponentState);
            this.updateViewComponentConfig(viewComponentState);
        }
        const dependentViewComponentGuids = viewComponentState.dependentViewComponentsMap.get(propertyName);
        let dependentViewComponentStates;
        // find all view components which depend on changed view component based on expressions
        if (dependentViewComponentGuids) {
            // restore dependent components from the cache
            dependentViewComponentStates = dependentViewComponentGuids.map((viewComponentGuid) => this.viewComponentStates.get(viewComponentGuid));
        }
        else {
            dependentViewComponentStates = this.getDependentViewComponentStates((expression) => expression.hasDependency(guid, propertyName));
            // cache dependent view component guids
            viewComponentState.dependentViewComponentsMap.set(propertyName, dependentViewComponentStates.map((state) => state.guid));
        }
        // evaluate expressions for all dependent view components
        dependentViewComponentStates.forEach((dependentViewComponentState) => {
            this.evaluateDependentProperties(dependentViewComponentState, guid, propertyName);
        });
        // update config$ for all dependent view components
        dependentViewComponentStates
            .map((dependentViewComponentState) => {
            // if dependentViewComponentState is data view component
            // config$ should be updated for nearest parent view component with UI representation
            // i.e. if rx-record-grid-column is dependent component then rx-record-grid config$ should be update
            if (dependentViewComponentState.isDataViewComponent) {
                return this.getParentViewComponent(dependentViewComponentState);
            }
            else {
                return dependentViewComponentState;
            }
        })
            .forEach((dependentViewComponentState) => {
            this.updateViewComponentConfig(dependentViewComponentState);
        });
        if (propertyName === 'isValid') {
            this.triggerViewValidation(newValue);
        }
    }
    // ts guard - defines whether componentDescriptor is data view component
    isDataViewComponentDefinition(componentDescriptor) {
        return componentDescriptor.configPropertyName !== undefined;
    }
    getViewInputParameters() {
        return this.configuration.inputParams;
    }
    isDirtyView() {
        // Used a separate observable to handle scenario when callRuntimeComponentsApi observable
        // will be immediately completed. It can happen when no view components will have 'isDirty' API.
        const isDirtySubject = new ReplaySubject(1);
        let isDirtyView = false;
        if (this.isUserInteractionDetected) {
            this.callRuntimeComponentsApi('isDirty')
                .pipe(tap((result) => (isDirtyView = result.some(({ data }) => data))))
                .subscribe({
                complete: () => isDirtySubject.next(isDirtyView)
            });
        }
        else {
            isDirtySubject.next(isDirtyView);
        }
        return isDirtySubject.asObservable().pipe(take(1));
    }
    triggerViewValidation(isValid) {
        if (isValid) {
            isValid = Array.from(this.viewComponentStates.values())
                .filter((viewComponent) => has(viewComponent.publicState, 'isValid'))
                .every((viewComponent) => viewComponent.publicState.isValid);
        }
        if (this.evaluationData.view.isValid !== isValid) {
            this.evaluationData.view.isValid = isValid;
            let dependentViewComponentStates;
            if (this.dependentOnViewIsValidPropViewComponentGuids) {
                dependentViewComponentStates = this.dependentOnViewIsValidPropViewComponentGuids.map((guid) => this.viewComponentStates.get(guid));
            }
            else {
                dependentViewComponentStates = this.getDependentViewComponentStates((expression) => expression.hasViewIsValidToken());
                this.dependentOnViewIsValidPropViewComponentGuids = dependentViewComponentStates.map((state) => state.guid);
            }
            dependentViewComponentStates.forEach((viewComponentState) => {
                this.evaluateComponentExpressions(viewComponentState, (expression) => expression.hasViewIsValidToken());
            });
            // update view component configs in next javascript event loop, to avoid
            // 'ExpressionChangedAfterItHasBeenCheckedError' error in components,
            // dependent on the view isValid property e.g Action button disabled property
            asyncScheduler.schedule(() => {
                dependentViewComponentStates.forEach(this.updateViewComponentConfig.bind(this));
            });
        }
    }
    // return nearest parent view component with UI representation
    getParentViewComponent(viewComponentState) {
        let currentViewComponentState = viewComponentState;
        while (currentViewComponentState.isDataViewComponent) {
            currentViewComponentState = this.viewComponentStates.get(currentViewComponentState.parentViewComponentGuid);
        }
        return currentViewComponentState;
    }
    // return all view components which depend on particular expression
    getDependentViewComponentStates(expressionFilterFn) {
        return Array.from(this.viewComponentStates.values()).filter((viewComponentState) => {
            const isDependentComponentState = some(viewComponentState.expressions, expressionFilterFn);
            const isDependentEventState = some(viewComponentState.eventStates, (eventState) => some(eventState, (event) => some(event.expressions, expressionFilterFn)));
            return isDependentComponentState || isDependentEventState;
        });
    }
    // pass new view component config to the @Component
    updateViewComponentConfig(viewComponentState) {
        // finally update config
        viewComponentState.config$.next(this.buildComponentConfig(viewComponentState));
    }
    // build view component config based on configState and child data view component
    buildComponentConfig(viewComponentState) {
        const viewComponentConfigState = Object.assign({}, viewComponentState.configState);
        // build child data component states
        this.buildComponentChildDataConfig(viewComponentState, viewComponentConfigState);
        return viewComponentConfigState;
    }
    // recursively build view component config based on data view components
    buildComponentChildDataConfig(viewComponentState, viewComponentChildConfig = {}) {
        // find all child data view components
        const dataViewComponentChildStates = viewComponentState.childViewComponentGuids
            .map((viewComponentGuid) => this.viewComponentStates.get(viewComponentGuid))
            .filter((currentViewComponentState) => Boolean(currentViewComponentState))
            .filter((currentViewComponentState) => currentViewComponentState.isDataViewComponent);
        // group data view components on config property name
        const dataViewComponentChildStateGroups = groupBy(dataViewComponentChildStates, (dataViewComponentState) => dataViewComponentState.configPropertyName);
        // store each data view component config under corresponding config property name
        Object.keys(dataViewComponentChildStateGroups).forEach((configPropertyName) => {
            viewComponentChildConfig[configPropertyName] = dataViewComponentChildStateGroups[configPropertyName].map((dataViewComponentStateChild) => {
                const dataViewComponentChildState = Object.assign({}, dataViewComponentStateChild.configState);
                // recursively build data view component config
                this.buildComponentChildDataConfig(dataViewComponentStateChild, dataViewComponentChildState);
                return dataViewComponentChildState;
            });
        });
    }
    // update action view component shared state
    // re-evaluate all dependent action view components
    onViewComponentActionOutputChanged(componentGuid, actionGuid, viewActionOutput) {
        const viewComponentState = this.viewComponentStates.get(componentGuid);
        if (viewComponentState) {
            const actionState = viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME].find((currentAction) => {
                return currentAction.guid === actionGuid;
            });
            actionState.publicState.output = viewActionOutput;
            this.updateEvaluationData(viewComponentState);
            this.evaluateDependentProperties(viewComponentState, actionGuid, 'output');
        }
    }
    evaluateViewOutputParams() {
        return this.viewDefinition.outputParams.reduce((result, outputParam) => {
            result[outputParam.name] = this.rxExpressionEvaluatorService.tryEvaluate(outputParam.source, this.evaluationData);
            return result;
        }, {});
    }
    processViewDefinition(viewDefinition) {
        this.viewDefinition = this.rxObjectUtilsService.cloneDeep(viewDefinition);
        this.rxViewDefinitionAdapterService.preProcessViewDefinition(this.viewDefinition);
        const adapters$ = this.rxRuntimeViewUtilsService.runAdaptersForComponents(this.viewDefinition);
        return combineLatest(adapters$).pipe(switchMapTo(EMPTY), tap({
            complete: () => {
                this.rxViewDefinitionAdapterService.postProcessViewDefinition(this.viewDefinition);
                this.rxViewDefinitionParserService
                    .getComponents(this.viewDefinition)
                    .forEach(this.processComponentDefinition.bind(this));
                // evaluate expressions with keyword tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasKeywordTokens());
                });
                // evaluate expressions without tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => !componentExpression.hasTokens());
                });
                // evaluate expressions with view tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasViewTokens());
                });
                // evaluate expressions with component tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasComponentTokens());
                });
                // update all component configs
                this.viewComponentStates.forEach((viewComponentState) => {
                    this.updateViewComponentConfig(viewComponentState);
                });
            }
        }));
    }
    processComponentDefinition(componentDefinitionItem) {
        if (!componentDefinitionItem.parentComponentDefinition) {
            // process root component definition
            const configuredParamNames = map$1(componentDefinitionItem.componentDefinition.inputParams, 'name');
            const passedParamNames = keys(this.configuration.inputParams);
            const onlyPositionalParams = passedParamNames.length > 0 && every(passedParamNames, (inputParamName) => /^\$[0-9]+\$$/.test(inputParamName));
            if (onlyPositionalParams && intersection(configuredParamNames, passedParamNames).length === 0) {
                forEach(passedParamNames, (inputParamName) => {
                    const paramIndex = Number(inputParamName.match(/^\$([0-9]+)\$$/)[1]);
                    const definitionParamName = get(componentDefinitionItem.componentDefinition, `inputParams[${paramIndex}].name`);
                    this.evaluationData.view.inputParams[definitionParamName] = this.configuration.inputParams[inputParamName];
                });
            }
            else {
                forEach(configuredParamNames, (inputParamName) => {
                    this.evaluationData.view.inputParams[inputParamName] = this.configuration.inputParams[inputParamName];
                });
            }
        }
        else {
            const componentDefinition = componentDefinitionItem.componentDefinition;
            const viewComponentState = this.buildViewComponentState(componentDefinitionItem);
            if (viewComponentState) {
                this.viewComponentStates.set(componentDefinition.guid, viewComponentState);
            }
        }
    }
    // generate view component state based on component definition
    buildViewComponentState(componentDefinitionItem) {
        const componentDefinition = componentDefinitionItem.componentDefinition;
        const componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinition.type);
        if (componentDescriptor) {
            const viewComponentState = {
                guid: componentDefinition.guid,
                type: componentDefinition.type,
                config$: new BehaviorSubject({}),
                expressions: [],
                eventStates: {
                    [VIEW_COMPONENT_DEFAULT_EVENT_NAME]: []
                },
                configState: {},
                publicState: {},
                isDataViewComponent: false,
                configPropertyName: null,
                parentViewComponentGuid: componentDefinitionItem.parentComponentDefinition.guid,
                childViewComponentGuids: [],
                dependentViewComponentsMap: new Map(),
                componentDescriptor
            };
            if (this.isDataViewComponentDefinition(componentDescriptor)) {
                viewComponentState.isDataViewComponent = true;
                viewComponentState.configPropertyName = componentDescriptor.configPropertyName;
            }
            forOwn(componentDefinition.propertiesByName, (propertyValue, propertyName) => {
                const viewComponentPropertyDescriptor = find(componentDescriptor.properties, (descriptor) => propertyName === descriptor.name);
                const isExpressionEvaluationEnabled = viewComponentPropertyDescriptor && viewComponentPropertyDescriptor.enableExpressionEvaluation;
                // initialize view component expressions
                if (isExpressionEvaluationEnabled) {
                    // create expression for property
                    viewComponentState.expressions.push(new ComponentExpression(propertyName, propertyValue, this.rxExpressionEvaluatorService, viewComponentPropertyDescriptor.evaluatorService));
                }
                // update view component config state object
                this.updateComponentConfigProperty(propertyName, isExpressionEvaluationEnabled ? null : propertyValue, viewComponentState);
            });
            // add initial view component state to evaluationData
            this.updateEvaluationData(viewComponentState);
            if (this.isContainerComponentDefinition(componentDefinition)) {
                // set up view component events
                componentDefinition.componentDefinitions
                    .filter((currentComponentDefinition) => currentComponentDefinition.type === RxViewComponentType.Action)
                    .forEach((actionComponentDefinition) => {
                    const actionState = this.buildViewComponentActionState(actionComponentDefinition);
                    if (actionState) {
                        viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME].push(actionState);
                    }
                });
                // sort actions in correct order
                viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME] = sortBy(viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME], 'index');
                // set up child view component guids
                viewComponentState.childViewComponentGuids = componentDefinition.componentDefinitions
                    .filter((currentComponentDefinition) => currentComponentDefinition.type !== RxViewComponentType.Action)
                    .map((currentComponentDefinition) => currentComponentDefinition.guid);
            }
            return viewComponentState;
        }
        else if (componentDefinition.type !== RxViewComponentType.Action) {
            this.rxLogService.warning(`Cannot initialize view component. View Component Descriptor for ${componentDefinition.type} not found.`);
        }
    }
    // generate action view component state
    buildViewComponentActionState(actionComponentDefinition) {
        const actionDescriptor = this.rxViewActionRegistryService.get(actionComponentDefinition.propertiesByName.name);
        if (actionDescriptor) {
            const actionState = {
                guid: actionComponentDefinition.guid,
                name: actionComponentDefinition.propertiesByName.name,
                index: toNumber(actionComponentDefinition.propertiesByName.index) || 0,
                config: {},
                publicState: {},
                expressions: []
            };
            Object.keys(actionComponentDefinition.propertiesByName || {})
                .filter((parameterName) => parameterName !== 'name')
                .map((parameterName) => {
                const actionPropertyDescriptor = (actionDescriptor.parameters || []).find((descriptor) => parameterName === descriptor.name);
                const isExpressionEvaluationEnabled = actionPropertyDescriptor && actionPropertyDescriptor.enableExpressionEvaluation;
                // initialize action view component expressions
                if (isExpressionEvaluationEnabled) {
                    // create expression for property
                    this.initializeActionExpressionForProperty(actionState, actionPropertyDescriptor.evaluatorService, parameterName, actionComponentDefinition.propertiesByName[parameterName]);
                }
                // add initial action view component state to evaluationData
                this.updateActionConfigProperty(parameterName, isExpressionEvaluationEnabled ? null : actionComponentDefinition.propertiesByName[parameterName], actionState);
            });
            return actionState;
        }
    }
    initializeActionExpressionForProperty(actionState, evaluatorService, propertyName, propertyValue) {
        if (isObject(propertyValue)) {
            forIn(propertyValue, (value, name) => {
                this.initializeActionExpressionForProperty(actionState, evaluatorService, `${propertyName}.${name}`, value);
            });
        }
        else {
            actionState.expressions.push(new ComponentExpression(propertyName, propertyValue, this.rxExpressionEvaluatorService, evaluatorService));
        }
    }
    callRuntimeComponentsApi(methodName, ...args) {
        const resultSubject = new ReplaySubject(1);
        const errors = [];
        const apiCallResults = Array.from(this.viewComponentStates.values())
            .filter((viewComponent) => Boolean(viewComponent.publicState.api && isFunction(viewComponent.publicState.api[methodName])))
            .map((viewComponent) => {
            let result = viewComponent.publicState.api[methodName].apply(null, args);
            if (result && result.then) {
                result = from(result);
            }
            else if (!(result instanceof Observable)) {
                result = of(result);
            }
            return result.pipe(take(1), map((res) => ({
                guid: viewComponent.guid,
                data: res
            })), tap({
                error: (error) => errors.push(error)
            }), 
            // catch errors from each view component api call to allow to successfully finish other api calls.
            catchError(() => EMPTY));
        });
        combineLatest(apiCallResults).subscribe({
            next: (results) => resultSubject.next(results),
            complete: () => (isEmpty(errors) ? resultSubject.complete() : resultSubject.error(errors))
        });
        return resultSubject.asObservable();
    }
    evaluateComponentExpressions(viewComponent, expressionFilterFunc) {
        // update component expressions
        viewComponent.expressions.filter(expressionFilterFunc).forEach((componentExpression) => {
            this.updateComponentConfigProperty(componentExpression.propertyName, this.evaluateExpression(componentExpression), viewComponent);
        });
        this.updateEvaluationData(viewComponent);
        // update event expressions
        Object.keys(viewComponent.eventStates).forEach((eventName) => {
            viewComponent.eventStates[eventName].forEach((actionState) => {
                actionState.expressions.filter(expressionFilterFunc).forEach((componentExpression) => {
                    this.updateActionConfigProperty(componentExpression.propertyName, this.evaluateExpression(componentExpression), actionState);
                    this.updateEvaluationData(viewComponent);
                });
            });
        });
    }
    evaluateDependentProperties(viewComponent, guid, propertyName) {
        this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasDependency(guid, propertyName));
    }
    evaluateExpression(componentExpression) {
        let evaluatedValue;
        try {
            evaluatedValue = componentExpression.evaluate(this.evaluationData);
        }
        catch (e) {
            evaluatedValue = null;
            this.rxNotificationService.addErrorMessage(e.message, '');
        }
        return evaluatedValue;
    }
    // update view component config property based on property descriptor
    updateComponentConfigProperty(propertyName, propertyValue, viewComponent) {
        const viewComponentDescriptor = this.rxViewComponentRegistryService.get(viewComponent.type);
        const viewComponentPropertyDescriptor = find(viewComponentDescriptor.properties, {
            name: propertyName
        });
        viewComponent.configState[propertyName] = this.processPropertyValue(propertyValue, viewComponentPropertyDescriptor);
    }
    // update action view component config property based on property descriptor
    updateActionConfigProperty(propertyName, propertyValue, actionComponent) {
        const viewActionDescriptor = this.rxViewActionRegistryService.get(actionComponent.name);
        let viewActionParameterDescriptor = find(viewActionDescriptor.parameters, {
            name: propertyName
        });
        if (!viewActionParameterDescriptor && includes(propertyName, '.')) {
            const primaryPropertyName = propertyName.split('.')[0];
            viewActionParameterDescriptor = find(viewActionDescriptor.parameters, { name: primaryPropertyName });
        }
        set(actionComponent.config, propertyName, this.processPropertyValue(propertyValue, viewActionParameterDescriptor));
    }
    // sync component data with expression data
    updateEvaluationData(viewComponent) {
        // update component data
        this.evaluationData.view.components[viewComponent.guid] = Object.assign(Object.assign({}, viewComponent.configState), viewComponent.publicState);
        // update component actions data
        Object.keys(viewComponent.eventStates).forEach((eventName) => {
            viewComponent.eventStates[eventName].forEach((actionState) => {
                this.evaluationData.view.components[actionState.guid] = actionState.publicState;
            });
        });
    }
    // cast property value to the type defined in the descriptor
    processPropertyValue(propertyValue, propertyDescriptor) {
        if (propertyDescriptor && propertyDescriptor.type && !isNil(propertyValue)) {
            // try to cast property value to type defined in component descriptor
            if (propertyDescriptor.type === ViewComponentPropertyType.Boolean) {
                if (includes(['0', 'false'], propertyValue)) {
                    propertyValue = false;
                }
                else {
                    propertyValue = Boolean(propertyValue);
                }
            }
            else if (propertyDescriptor.type === ViewComponentPropertyType.Number) {
                propertyValue = Number(propertyValue);
                if (Number.isNaN(propertyValue)) {
                    propertyValue = null;
                }
            }
            else if (propertyDescriptor.type === ViewComponentPropertyType.String) {
                propertyValue = String(propertyValue);
            }
            else if ([ViewComponentPropertyType.Array, ViewComponentPropertyType.Object].includes(propertyDescriptor.type)) {
                propertyValue = this.rxJsonParserService.tryParseJson(propertyValue);
            }
        }
        return propertyValue;
    }
    isContainerComponentDefinition(componentDefinition) {
        return componentDefinition.componentDefinitions !== undefined;
    }
}
RuntimeViewModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModel, deps: [{ token: i1.RxBundleService }, { token: i1.RxGlobalCacheService }, { token: i2$1.RxViewComponentRegistryService }, { token: RxViewDefinitionAdapterService }, { token: i2$1.RxViewDefinitionParserService }, { token: i2$1.RxViewDefinitionService }, { token: RxRuntimeViewUtilsService }, { token: i2$1.RxExpressionEvaluatorService }, { token: i1.RxNotificationService }, { token: i2$1.RxViewActionRegistryService }, { token: i1.RxLogService }, { token: ViewComponentEventManager }, { token: i2$3.RxUtilityModalsService }, { token: i2$1.RxViewDefinitionCacheService }, { token: i2$2.RxObjectUtilsService }, { token: i2$2.RxJsonParserService }, { token: i1.RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxBundleService }, { type: i1.RxGlobalCacheService }, { type: i2$1.RxViewComponentRegistryService }, { type: RxViewDefinitionAdapterService }, { type: i2$1.RxViewDefinitionParserService }, { type: i2$1.RxViewDefinitionService }, { type: RxRuntimeViewUtilsService }, { type: i2$1.RxExpressionEvaluatorService }, { type: i1.RxNotificationService }, { type: i2$1.RxViewActionRegistryService }, { type: i1.RxLogService }, { type: ViewComponentEventManager }, { type: i2$3.RxUtilityModalsService }, { type: i2$1.RxViewDefinitionCacheService }, { type: i2$2.RxObjectUtilsService }, { type: i2$2.RxJsonParserService }, { type: i1.RxCurrentUserService }]; } });

class RxRuntimeViewRegistryService {
    constructor() {
        this.activeRuntimeViews = [];
    }
    register(runtimeViewModel) {
        if (!this.activeRuntimeViews.includes(runtimeViewModel)) {
            this.activeRuntimeViews.push(runtimeViewModel);
        }
    }
    getAll() {
        return this.activeRuntimeViews;
    }
    unregister(runtimeViewModel) {
        pull(this.activeRuntimeViews, runtimeViewModel);
    }
}
RxRuntimeViewRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxRuntimeViewRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RuntimeViewCanvasComponent {
    constructor(runtimeViewCanvasService) {
        this.runtimeViewCanvasService = runtimeViewCanvasService;
        this.componentPropertyChanged = new EventEmitter();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.runtimeViewCanvasService.componentPropertyChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            this.componentPropertyChanged.emit(event);
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
RuntimeViewCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasComponent, deps: [{ token: RuntimeViewCanvasService }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasComponent, selector: "rx-runtime-view-canvas", inputs: { layout: "layout" }, outputs: { componentPropertyChanged: "componentPropertyChanged" }, providers: [RuntimeViewCanvasService], ngImport: i0, template: "<rx-runtime-view-canvas-item class=\"root-item\" *ngIf=\"layout\" [layout]=\"layout\"></rx-runtime-view-canvas-item>\n", components: [{ type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas',
                    templateUrl: './runtime-view-canvas.component.html',
                    providers: [RuntimeViewCanvasService]
                }]
        }], ctorParameters: function () { return [{ type: RuntimeViewCanvasService }]; }, propDecorators: { layout: [{
                type: Input
            }], componentPropertyChanged: [{
                type: Output
            }] } });

class RuntimeViewComponent {
    constructor(runtimeViewModelApi, rxRecordDefinitionCacheService, runtimeViewLayoutService, runtimeViewModel, rxProcessDefinitionCacheService, rxRuntimeViewRegistryService, rxViewDefinitionCacheService, rxAssociationDefinitionCacheService, rxViewDefinitionService) {
        this.runtimeViewModelApi = runtimeViewModelApi;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.runtimeViewLayoutService = runtimeViewLayoutService;
        this.runtimeViewModel = runtimeViewModel;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.destroyed$ = new ReplaySubject(1);
        this.save = new EventEmitter();
        this.closeView = new EventEmitter();
        this.cancelView = new EventEmitter();
        this.beforeLoad = new EventEmitter();
        this.afterLoad = new EventEmitter();
        this.rxAssociationDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxViewDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    onTrigger() {
        this.runtimeViewModel.isUserInteractionDetected = true;
    }
    ngOnInit() {
        this.init();
        this.runtimeViewModel.cancel$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.cancelView.emit());
        this.runtimeViewModel.save$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.save.emit());
        this.runtimeViewModel.close$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((viewOutputParams) => this.closeView.emit(viewOutputParams));
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue &&
            changes.configuration.previousValue &&
            changes.configuration.currentValue.viewDefinitionName !== changes.configuration.previousValue.viewDefinitionName) {
            this.runtimeViewModelApi.clear();
            this.runtimeViewLayoutService.clear();
            this.configuration = changes.configuration.currentValue;
            this.init();
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxRuntimeViewRegistryService.unregister(this.runtimeViewModel);
    }
    init() {
        this.beforeLoad.emit();
        this.runtimeViewModel.init(this.configuration).subscribe({
            complete: () => {
                this.runtimeViewModelApi.init(this.runtimeViewModel);
                this.runtimeViewLayoutService.init(this.runtimeViewModel, this.runtimeViewModelApi);
                this.hostClass = this.runtimeViewModel.viewDefinition.styles || '';
                if (this.rxViewDefinitionService.isPageView(this.runtimeViewModel.viewDefinition)) {
                    this.hostClass = this.hostClass + ' rx-page-view';
                }
                this.viewDefinitionGuid = this.runtimeViewModel.viewDefinition.guid;
                this.runtimeViewModel.isUserInteractionDetected = false;
                this.afterLoad.emit();
            }
        });
        if (this.configuration.onRegisterApi) {
            this.configuration.onRegisterApi(this.runtimeViewModel.api);
        }
        this.rxRuntimeViewRegistryService.register(this.runtimeViewModel);
    }
}
RuntimeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewComponent, deps: [{ token: RuntimeViewModelApi }, { token: i2$4.RxRecordDefinitionCacheService }, { token: RuntimeViewLayoutService }, { token: RuntimeViewModel }, { token: i5.RxProcessDefinitionCacheService }, { token: RxRuntimeViewRegistryService }, { token: i2$1.RxViewDefinitionCacheService }, { token: i8.RxAssociationDefinitionCacheService }, { token: i2$1.RxViewDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewComponent, selector: "rx-runtime-view", inputs: { configuration: "configuration" }, outputs: { save: "save", closeView: "closeView", cancelView: "cancelView", beforeLoad: "beforeLoad", afterLoad: "afterLoad" }, host: { listeners: { "focusin": "onTrigger()" }, properties: { "class": "this.hostClass", "attr.rx-view-definition-guid": "this.viewDefinitionGuid" } }, providers: [RuntimeViewModel, RuntimeViewModelApi, RuntimeViewLayoutService], usesOnChanges: true, ngImport: i0, template: "<rx-runtime-view-canvas\n  (componentPropertyChanged)=\"runtimeViewModel.onViewComponentPropertyChanged($event)\"\n  *ngIf=\"runtimeViewLayoutService.layout\"\n  [layout]=\"runtimeViewLayoutService.layout\"\n></rx-runtime-view-canvas>\n", styles: [":host.rx-page-view ::ng-deep .outlet-padding{padding:0}:host.rx-page-view ::ng-deep rx-runtime-view-canvas-item{height:100%}\n"], components: [{ type: RuntimeViewCanvasComponent, selector: "rx-runtime-view-canvas", inputs: ["layout"], outputs: ["componentPropertyChanged"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view',
                    templateUrl: './runtime-view.component.html',
                    styleUrls: ['./runtime-view.component.scss'],
                    providers: [RuntimeViewModel, RuntimeViewModelApi, RuntimeViewLayoutService]
                }]
        }], ctorParameters: function () { return [{ type: RuntimeViewModelApi }, { type: i2$4.RxRecordDefinitionCacheService }, { type: RuntimeViewLayoutService }, { type: RuntimeViewModel }, { type: i5.RxProcessDefinitionCacheService }, { type: RxRuntimeViewRegistryService }, { type: i2$1.RxViewDefinitionCacheService }, { type: i8.RxAssociationDefinitionCacheService }, { type: i2$1.RxViewDefinitionService }]; }, propDecorators: { configuration: [{
                type: Input
            }], save: [{
                type: Output
            }], closeView: [{
                type: Output
            }], cancelView: [{
                type: Output
            }], beforeLoad: [{
                type: Output
            }], afterLoad: [{
                type: Output
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], viewDefinitionGuid: [{
                type: HostBinding,
                args: ['attr.rx-view-definition-guid']
            }], onTrigger: [{
                type: HostListener,
                args: ['focusin']
            }] } });

// tslint:disable-next-line:directive-class-suffix
class BaseViewComponent {
    constructor() {
        this.customCssClasses = '';
        this.autoFill = new EventEmitter();
        this.autoScroll = new EventEmitter();
        this.hidden = new EventEmitter();
        this.isComponentHidden = false;
        this.destroyed$ = new ReplaySubject(1);
        this.propertyChanged = new EventEmitter();
    }
    get isHidden() {
        return this.isComponentHidden;
    }
    set isHidden(value) {
        this.hidden.emit(value);
        this.isComponentHidden = Boolean(value);
    }
    ngOnInit() {
        this.config.pipe(pluck('styles'), takeUntil(this.destroyed$)).subscribe((styles) => {
            this.customCssClasses = styles || '';
            this.autoFill.emit(this.customCssClasses.includes('rx-auto-fill'));
            this.autoScroll.emit(this.customCssClasses.includes('rx-auto-scroll'));
        });
    }
    notifyPropertyChanged(propertyName, newValue, oldValue) {
        this.propertyChanged.next({
            guid: this.guid,
            propertyName,
            newValue,
            oldValue
        });
    }
    triggerViewActions(guid = this.guid, viewActionTriggerEventName = VIEW_COMPONENT_DEFAULT_EVENT_NAME) {
        return this.runtimeViewModelApi.triggerViewActions(guid, viewActionTriggerEventName);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
BaseViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BaseViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BaseViewComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: BaseViewComponent, outputs: { autoFill: "autoFill", autoScroll: "autoScroll", hidden: "hidden" }, host: { properties: { "attr.rx-view-component-id": "this.guid", "class": "this.customCssClasses", "hidden": "this.isHidden" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BaseViewComponent, decorators: [{
            type: Directive
        }], propDecorators: { guid: [{
                type: HostBinding,
                args: ['attr.rx-view-component-id']
            }], customCssClasses: [{
                type: HostBinding,
                args: ['class']
            }], autoFill: [{
                type: Output
            }], autoScroll: [{
                type: Output
            }], hidden: [{
                type: Output
            }], isHidden: [{
                type: HostBinding,
                args: ['hidden']
            }] } });

class RuntimeViewCanvasOutletComponent {
    constructor(runtimeViewCanvasItemService, componentFactoryResolver) {
        this.runtimeViewCanvasItemService = runtimeViewCanvasItemService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.name = RX_VIEW_DEFINITION.defaultOutletName;
    }
    ngOnInit() {
        this.runtimeViewCanvasItemService.registerOutlet(this.name, this.container, this.componentFactoryResolver.resolveComponentFactory(RuntimeViewCanvasItemContainerComponent));
    }
}
RuntimeViewCanvasOutletComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasOutletComponent, deps: [{ token: RuntimeViewCanvasItemService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasOutletComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: { name: "name" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<ng-container #container></ng-container>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas-outlet',
                    templateUrl: './runtime-view-canvas-outlet.component.html'
                }]
        }], ctorParameters: function () { return [{ type: RuntimeViewCanvasItemService }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { name: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });

class RuntimeViewCanvasModule {
}
RuntimeViewCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RuntimeViewCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, declarations: [RuntimeViewCanvasComponent,
        RuntimeViewCanvasItemComponent,
        RuntimeViewCanvasItemContainerComponent,
        RuntimeViewCanvasOutletComponent], imports: [CommonModule, FormsModule], exports: [RuntimeViewCanvasOutletComponent,
        RuntimeViewCanvasComponent,
        RuntimeViewCanvasItemComponent,
        RuntimeViewCanvasItemContainerComponent] });
RuntimeViewCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, imports: [[CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
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

class RuntimeViewModalComponent {
    constructor(rxRuntimeViewRegistryService, rxUtilityModalsService, translateService, changeDetector, activeModalRef, dockedPanelContext) {
        this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.translateService = translateService;
        this.changeDetector = changeDetector;
        this.activeModalRef = activeModalRef;
        this.dockedPanelContext = dockedPanelContext;
        this.isBlade = false;
        this.context = dockedPanelContext || activeModalRef;
        this.isBlade = Boolean(dockedPanelContext);
        const data = this.context.getData();
        this.configuration = data.configuration;
        this.title = data.title;
        this.notification = data.notification;
        this.isCancellable = data.isCancellable;
        this.closeLabel = translateService.instant('com.bmc.arsys.rx.client.common.close.label');
    }
    onCancelView() {
        this.context.dismiss(null);
    }
    closeModal() {
        this.context.dismiss(DismissReasons.CLOSE_BTN);
    }
    onClose(viewOutputParams) {
        this.context.close(viewOutputParams);
    }
    onBeforeLoad() {
        this.busySubscription = NEVER.subscribe();
        // workaround: run changeDetector to avoid the ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detectChanges();
    }
    onAfterLoad() {
        var _a;
        (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
RuntimeViewModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModalComponent, deps: [{ token: RxRuntimeViewRegistryService }, { token: i2$3.RxUtilityModalsService }, { token: i3.TranslateService }, { token: i0.ChangeDetectorRef }, { token: i4.ActiveModalRef, optional: true }, { token: i4.DockedPanelContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewModalComponent, selector: "rx-runtime-view-modal", ngImport: i0, template: "<ng-container *ngIf=\"title || isCancellable\">\n  <div class=\"dp-header\" *ngIf=\"isBlade; else modalHeader\">\n    <span class=\"dp-title\">{{ title }}</span>\n    <button\n      class=\"close dp-close\"\n      rx-id=\"x-button\"\n      [attr.aria-label]=\"closeLabel\"\n      *ngIf=\"isCancellable\"\n      (click)=\"closeModal()\"\n    ></button>\n  </div>\n</ng-container>\n\n<ng-template #modalHeader>\n  <div class=\"modal-header\">\n    <h5 class=\"modal-title\">{{ title }}</h5>\n    <button\n      class=\"close dp-close\"\n      rx-id=\"x-button\"\n      [attr.aria-label]=\"closeLabel\"\n      *ngIf=\"isCancellable\"\n      (click)=\"closeModal()\"\n    ></button>\n  </div>\n</ng-template>\n\n<adapt-alert\n  *ngIf=\"notification\"\n  class=\"pl-4 pt-4\"\n  [config]=\"{\n    content: notification,\n    type: 'inline',\n    variant: 'info'\n  }\"\n></adapt-alert>\n\n<div\n  [ngClass]=\"{\n    'modal-body p-0': !isBlade,\n    'dp-content': isBlade\n  }\"\n>\n  <div class=\"position-relative\">\n    <rx-busy-indicator\n      [options]=\"{\n        busy: busySubscription,\n        loaderType: 'lineLoader',\n        delay: 250,\n        backdrop: false,\n        message: null\n      }\"\n    >\n    </rx-busy-indicator>\n  </div>\n\n  <rx-runtime-view\n    [configuration]=\"configuration\"\n    (cancelView)=\"onCancelView()\"\n    (closeView)=\"onClose($event)\"\n    (beforeLoad)=\"onBeforeLoad()\"\n    (afterLoad)=\"onAfterLoad()\"\n  ></rx-runtime-view>\n</div>\n", styles: [":host{height:100%;display:flex;flex-direction:column}.modal-header{min-height:34px}.dp-header{flex-direction:row!important}.dp-content>rx-runtime-view{height:100%}\n"], components: [{ type: i4.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i2$3.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: RuntimeViewComponent, selector: "rx-runtime-view", inputs: ["configuration"], outputs: ["save", "closeView", "cancelView", "beforeLoad", "afterLoad"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-modal',
                    templateUrl: './runtime-view-modal.component.html',
                    styleUrls: ['./runtime-view-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: RxRuntimeViewRegistryService }, { type: i2$3.RxUtilityModalsService }, { type: i3.TranslateService }, { type: i0.ChangeDetectorRef }, { type: i4.ActiveModalRef, decorators: [{
                    type: Optional
                }] }, { type: i4.DockedPanelContext, decorators: [{
                    type: Optional
                }] }]; } });

const RX_RUNTIME_VIEW = {
    actions: {
        save: 'rx-runtime-view-save',
        close: 'rx-runtime-view-close',
        cancel: 'rx-runtime-view-cancel'
    }
};

class RuntimeViewModule {
}
RuntimeViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RuntimeViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, declarations: [RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent], imports: [CommonModule, RuntimeViewCanvasModule, TranslateModule, AdaptAlertModule, RxBusyIndicatorModule], exports: [RuntimeViewCanvasModule, RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent] });
RuntimeViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, imports: [[CommonModule, RuntimeViewCanvasModule, TranslateModule, AdaptAlertModule, RxBusyIndicatorModule], RuntimeViewCanvasModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewCanvasModule, TranslateModule, AdaptAlertModule, RxBusyIndicatorModule],
                    exports: [RuntimeViewCanvasModule, RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent],
                    declarations: [RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent],
                    entryComponents: [RuntimeViewRootComponent, RuntimeViewModalComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BaseViewComponent, RX_RUNTIME_VIEW, RuntimeLayoutItem, RuntimeLayoutOutlet, RuntimeLayoutOutletColumn, RuntimeViewCanvasComponent, RuntimeViewCanvasItemComponent, RuntimeViewCanvasItemContainerComponent, RuntimeViewCanvasItemService, RuntimeViewCanvasModule, RuntimeViewCanvasOutletComponent, RuntimeViewComponent, RuntimeViewModalComponent, RuntimeViewModel, RuntimeViewModelApi, RuntimeViewModule, RuntimeViewRootComponent, RxRuntimeViewRegistryService, RxRuntimeViewUtilsService, VIEW_COMPONENT_DEFAULT_EVENT_NAME, ViewComponentEventManager };
//# sourceMappingURL=helix-platform-view-runtime.js.map
