import { Component, HostBinding, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { RuntimeLayoutItem } from '../../../../layout/runtime-layout-item.class';
import { RuntimeViewCanvasItemService } from './runtime-view-canvas-item.service';
import * as i0 from "@angular/core";
import * as i1 from "./runtime-view-canvas-item.service";
export class RuntimeViewCanvasItemComponent {
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
RuntimeViewCanvasItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemComponent, deps: [{ token: i1.RuntimeViewCanvasItemService }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: { layout: "layout" }, host: { properties: { "class.rx-runtime-view-canvas-item-margin": "this.hasMargin", "class.rx-runtime-view-canvas-item-auto-fill": "this.hasAutoFill", "class.rx-runtime-view-canvas-item-auto-scroll": "this.hasAutoScroll" } }, providers: [RuntimeViewCanvasItemService], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container #container></ng-container>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas-item',
                    templateUrl: './runtime-view-canvas-item.component.html',
                    providers: [RuntimeViewCanvasItemService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RuntimeViewCanvasItemService }]; }, propDecorators: { layout: [{
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
//# sourceMappingURL=runtime-view-canvas-item.component.js.map