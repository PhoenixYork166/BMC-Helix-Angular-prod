import { Component, Inject, Injector, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { get, isEqual } from 'lodash';
import { ViewDesignerCanvasItemApiToken } from '../../tokens/view-designer-canvas-item-api.token';
import { CanvasItemApi } from './canvas-item-api.service';
import { ViewDesignerCanvasService } from '../../view-designer-canvas.service';
import * as i0 from "@angular/core";
import * as i1 from "../../view-designer-canvas.service";
import * as i2 from "@angular/common";
export class CanvasItemComponent {
    constructor(injector, renderer, canvasItemApi, viewDesignerCanvasService) {
        this.injector = injector;
        this.renderer = renderer;
        this.canvasItemApi = canvasItemApi;
        this.viewDesignerCanvasService = viewDesignerCanvasService;
        this.interactive = true;
        this.childContainers = new Map();
    }
    ngOnInit() {
        this.initializeItemApi();
    }
    ngOnChanges(changes) {
        const layoutChange = changes.layout;
        if (layoutChange) {
            const prevGuid = get(layoutChange, 'previousValue.guid');
            const currGuid = get(layoutChange, 'currentValue.guid');
            const prevOutlets = get(layoutChange, 'previousValue.outlets');
            const currOutlets = get(layoutChange, 'currentValue.outlets');
            if (prevGuid !== currGuid) {
                if (this.componentReference) {
                    this.cleanUp();
                }
                this.renderViewComponent();
            }
            else if (!isEqual(prevOutlets, currOutlets)) {
                currOutlets.forEach((outlet) => {
                    const ref = this.childContainers.get(outlet.name);
                    if (ref) {
                        ref.instance.outlet = outlet;
                        ref.instance.layout = this.layout;
                    }
                });
            }
        }
    }
    ngOnDestroy() {
        this.cleanUp();
    }
    cleanUp() {
        this.componentReference.destroy();
        this.childContainers.clear();
    }
    registerOutlet(outletName, outletViewContainerRef, containerFactory) {
        const currentOutlet = this.layout.outlets.find((outlet) => outlet.name === outletName);
        const componentRef = this.renderContainerComponent(outletViewContainerRef, currentOutlet, containerFactory);
        this.childContainers.set(outletName, componentRef);
        return componentRef;
    }
    onSelectComponent(event) {
        if (this.interactive) {
            event.stopPropagation();
            this.viewDesignerCanvasService.selectComponent(this.layout.guid);
        }
    }
    dropComponent(transferData, insertIndex, outletName = RX_VIEW_DEFINITION.defaultOutletName) {
        this.viewDesignerCanvasService.dropComponent(transferData, this.layout.guid, outletName, insertIndex);
    }
    initializeItemApi() {
        this.canvasItemApi.registerCoreApi({
            dropComponent: this.dropComponent.bind(this),
            registerOutlet: this.registerOutlet.bind(this)
        });
    }
    renderViewComponent() {
        this.componentReference = this.container.createComponent(this.layout.factory, null, this.injector);
        const instance = this.componentReference.instance;
        const nativeElement = this.componentReference.location.nativeElement;
        instance.guid = this.layout.guid;
        instance.model = this.layout.model;
        instance.isReadOnly = this.isReadOnly;
        this.renderer.setAttribute(nativeElement, 'rx-view-component-id', this.layout.guid);
    }
    renderContainerComponent(outletViewContainerRef, outlet, containerFactory) {
        const containerRef = outletViewContainerRef.createComponent(containerFactory);
        containerRef.instance.outlet = outlet;
        containerRef.instance.layout = this.layout;
        containerRef.instance.isReadOnly = this.isReadOnly;
        return containerRef;
    }
}
CanvasItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemComponent, deps: [{ token: i0.Injector }, { token: i0.Renderer2 }, { token: ViewDesignerCanvasItemApiToken }, { token: i1.ViewDesignerCanvasService }], target: i0.ɵɵFactoryTarget.Component });
CanvasItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemComponent, selector: "rx-canvas-item", inputs: { layout: "layout", interactive: "interactive", isReadOnly: "isReadOnly" }, providers: [
        {
            provide: ViewDesignerCanvasItemApiToken,
            useClass: CanvasItemApi
        }
    ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [hidden]=\"layout?.model?.hiddenOnCanvas$ | async\" (click)=\"onSelectComponent($event)\">\n  <ng-container #container></ng-container>\n</div>\n", pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-item',
                    templateUrl: './canvas-item.component.html',
                    providers: [
                        {
                            provide: ViewDesignerCanvasItemApiToken,
                            useClass: CanvasItemApi
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: i1.ViewDesignerCanvasService }]; }, propDecorators: { layout: [{
                type: Input
            }], interactive: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=canvas-item.component.js.map