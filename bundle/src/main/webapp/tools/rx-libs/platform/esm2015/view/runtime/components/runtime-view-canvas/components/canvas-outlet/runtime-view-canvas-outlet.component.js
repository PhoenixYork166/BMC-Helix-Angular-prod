import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { RuntimeViewCanvasItemService } from '../canvas-item/runtime-view-canvas-item.service';
import { RuntimeViewCanvasItemContainerComponent } from '../canvas-item-container/runtime-view-canvas-item-container.component';
import * as i0 from "@angular/core";
import * as i1 from "../canvas-item/runtime-view-canvas-item.service";
export class RuntimeViewCanvasOutletComponent {
    constructor(runtimeViewCanvasItemService, componentFactoryResolver) {
        this.runtimeViewCanvasItemService = runtimeViewCanvasItemService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.name = RX_VIEW_DEFINITION.defaultOutletName;
    }
    ngOnInit() {
        this.runtimeViewCanvasItemService.registerOutlet(this.name, this.container, this.componentFactoryResolver.resolveComponentFactory(RuntimeViewCanvasItemContainerComponent));
    }
}
RuntimeViewCanvasOutletComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasOutletComponent, deps: [{ token: i1.RuntimeViewCanvasItemService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasOutletComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: { name: "name" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<ng-container #container></ng-container>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas-outlet',
                    templateUrl: './runtime-view-canvas-outlet.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RuntimeViewCanvasItemService }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { name: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=runtime-view-canvas-outlet.component.js.map