import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewDesignerCanvasService } from './view-designer-canvas.service';
import * as i0 from "@angular/core";
import * as i1 from "./view-designer-canvas.service";
import * as i2 from "./component/canvas-item/canvas-item.component";
import * as i3 from "@angular/common";
export class ViewDesignerCanvasComponent {
    constructor(viewDesignerCanvasService) {
        this.viewDesignerCanvasService = viewDesignerCanvasService;
        this.componentSelect = new EventEmitter();
        this.componentDrop = new EventEmitter();
        this.componentRemove = new EventEmitter();
        this.beforeComponentDropInRoot = new EventEmitter();
    }
    ngOnInit() {
        this.viewDesignerCanvasService.componentSelect$.subscribe((event) => {
            this.componentSelect.emit(event);
        });
        this.viewDesignerCanvasService.componentRemove$.subscribe((event) => {
            this.componentRemove.emit(event);
        });
        this.viewDesignerCanvasService.componentDrop$.subscribe((event) => {
            this.componentDrop.emit(event);
        });
    }
}
ViewDesignerCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasComponent, deps: [{ token: i1.ViewDesignerCanvasService }], target: i0.ɵɵFactoryTarget.Component });
ViewDesignerCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerCanvasComponent, selector: "rx-view-designer-canvas", inputs: { layout: "layout", isReadOnly: "isReadOnly" }, outputs: { componentSelect: "componentSelect", componentDrop: "componentDrop", componentRemove: "componentRemove", beforeComponentDropInRoot: "beforeComponentDropInRoot" }, providers: [ViewDesignerCanvasService], ngImport: i0, template: "<rx-canvas-item class=\"root-item\" *ngIf=\"layout\" [layout]=\"layout\" [isReadOnly]=\"isReadOnly\"></rx-canvas-item>\n", components: [{ type: i2.CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer-canvas',
                    templateUrl: './view-designer-canvas.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ViewDesignerCanvasService]
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerCanvasService }]; }, propDecorators: { layout: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], componentSelect: [{
                type: Output
            }], componentDrop: [{
                type: Output
            }], componentRemove: [{
                type: Output
            }], beforeComponentDropInRoot: [{
                type: Output
            }] } });
//# sourceMappingURL=view-designer-canvas.component.js.map