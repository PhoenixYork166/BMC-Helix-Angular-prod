import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { pick } from 'lodash';
import { delay, distinctUntilChanged, skipWhile, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { RuntimeViewCanvasService } from '../../component/runtime-view-canvas.service';
import * as i0 from "@angular/core";
import * as i1 from "../../component/runtime-view-canvas.service";
export class RuntimeViewCanvasItemService {
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
RuntimeViewCanvasItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemService, deps: [{ token: i0.Injector }, { token: i0.ComponentFactoryResolver }, { token: i1.RuntimeViewCanvasService }], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewCanvasItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ComponentFactoryResolver }, { type: i1.RuntimeViewCanvasService }]; } });
//# sourceMappingURL=runtime-view-canvas-item.service.js.map