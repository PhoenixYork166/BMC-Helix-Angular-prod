import { Component } from '@angular/core';
import { CanvasItemComponent } from '../view-designer-canvas/component/canvas-item/canvas-item.component';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { ViewDesignerCanvasComponent } from '../view-designer-canvas/view-designer-canvas.component';
import * as i0 from "@angular/core";
import * as i1 from "../view-designer-canvas/component/canvas-item/canvas-item.component";
import * as i2 from "../view-designer-canvas/view-designer-canvas.component";
import * as i3 from "../view-designer-canvas/component/canvas-outlet/canvas-outlet.component";
import * as i4 from "@angular/common";
export class DesignerComponent {
    constructor(canvasItemComponent, viewDesignerCanvasComponent) {
        this.canvasItemComponent = canvasItemComponent;
        this.viewDesignerCanvasComponent = viewDesignerCanvasComponent;
        this.defaultOutletName = RX_VIEW_DEFINITION.defaultOutletName;
    }
    trackByFn(index, item) {
        return item.name;
    }
}
DesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerComponent, deps: [{ token: i1.CanvasItemComponent }, { token: i2.ViewDesignerCanvasComponent }], target: i0.ɵɵFactoryTarget.Component });
DesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DesignerComponent, selector: "rx-designer", ngImport: i0, template: "<rx-canvas-outlet\n  [class.border]=\"canvasItemComponent.layout.outlets.length > 1\"\n  [class.default-outlet]=\"outlet.name === defaultOutletName\"\n  *ngFor=\"let outlet of canvasItemComponent.layout.outlets; trackBy: trackByFn\"\n  [name]=\"outlet.name\"\n  (beforeViewComponentDrop)=\"viewDesignerCanvasComponent.beforeComponentDropInRoot.emit($event)\"\n></rx-canvas-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-canvas-outlet{display:block}rx-canvas-outlet.default-outlet:not(:only-child) ::ng-deep>rx-canvas-item-container>.row>*>rx-canvas-item-column>.cdk-drop-list{min-height:300px}rx-canvas-outlet.default-outlet:only-child ::ng-deep>rx-canvas-item-container>.row>*>rx-canvas-item-column>.cdk-drop-list{min-height:calc(100vh - 155px)}rx-canvas-outlet.border{border:1px solid #d6d7d8}rx-canvas-outlet+rx-canvas-outlet{margin-top:10px}\n"], components: [{ type: i3.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer',
                    templateUrl: './designer.component.html',
                    styleUrls: ['./designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.CanvasItemComponent }, { type: i2.ViewDesignerCanvasComponent }]; } });
//# sourceMappingURL=designer.component.js.map