import { Component, ComponentFactoryResolver, EventEmitter, Inject, Input, Optional, Output, SkipSelf, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { ViewDesignerCanvasItemApiToken } from '../../tokens/view-designer-canvas-item-api.token';
import { CanvasOutletHelperService } from './canvas-outlet-helper.service';
import { CanvasItemContainerComponent } from '../canvas-item-container/canvas-item-container.component';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./canvas-outlet-helper.service";
export class CanvasOutletComponent {
    constructor(canvasItemApi, parentOutletComponent, canvasOutletHelperService, componentFactoryResolver) {
        this.canvasItemApi = canvasItemApi;
        this.parentOutletComponent = parentOutletComponent;
        this.canvasOutletHelperService = canvasOutletHelperService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.containerComponentInstance = null;
        this.destroyed$ = new ReplaySubject(1);
        this.name = RX_VIEW_DEFINITION.defaultOutletName;
        this.skipParentPredicate = false;
        this.dropListOrientation = 'vertical';
        this.beforeViewComponentDrop = new EventEmitter();
        this.dropPredicate = () => true;
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    ngOnInit() {
        this.containerComponentInstance = this.canvasItemApi.core.registerOutlet(this.name, this.container, this.componentFactoryResolver.resolveComponentFactory(this.containerComponent || CanvasItemContainerComponent)).instance;
        this.canvasOutletHelperService.dropListOrientation = this.dropListOrientation;
        this.canvasOutletHelperService.parentOutletComponent = this.parentOutletComponent;
        this.canvasOutletHelperService.dropPredicate = this.dropPredicate;
        this.canvasOutletHelperService.skipParentPredicate = this.skipParentPredicate;
        this.canvasOutletHelperService.containerComponentInstance = this.containerComponentInstance;
        this.canvasOutletHelperService.beforeViewComponentDrop$.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            this.beforeViewComponentDrop.emit(event);
        });
    }
    canBeDropped(data) {
        return this.canvasOutletHelperService.canBeDropped(data);
    }
    componentDropPredicate(data, skipPredicate = false) {
        return this.canvasOutletHelperService.componentDropPredicate(data, skipPredicate);
    }
}
CanvasOutletComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: CanvasOutletComponent, optional: true, skipSelf: true }, { token: i1.CanvasOutletHelperService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
CanvasOutletComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: { name: "name", skipParentPredicate: "skipParentPredicate", containerComponent: "containerComponent", dropListOrientation: "dropListOrientation", dropPredicate: "dropPredicate" }, outputs: { beforeViewComponentDrop: "beforeViewComponentDrop" }, providers: [CanvasOutletHelperService], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<ng-container #container></ng-container>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-outlet',
                    templateUrl: './canvas-outlet.component.html',
                    providers: [CanvasOutletHelperService]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: CanvasOutletComponent, decorators: [{
                    type: SkipSelf
                }, {
                    type: Optional
                }] }, { type: i1.CanvasOutletHelperService }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { name: [{
                type: Input
            }], skipParentPredicate: [{
                type: Input
            }], containerComponent: [{
                type: Input
            }], dropListOrientation: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], beforeViewComponentDrop: [{
                type: Output
            }], dropPredicate: [{
                type: Input
            }] } });
//# sourceMappingURL=canvas-outlet.component.js.map