import { Component, Inject, Input } from '@angular/core';
import { ViewDesignerCanvasItemApiToken } from '../../tokens/view-designer-canvas-item-api.token';
import { CanvasItemApi } from '../canvas-item/canvas-item-api.service';
import { CanvasOutletHelperService } from '../canvas-outlet/canvas-outlet-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "../canvas-outlet/canvas-outlet-helper.service";
import * as i2 from "../canvas-item-column/canvas-item-column.component";
import * as i3 from "@angular/common";
import * as i4 from "../canvas-item/canvas-item-api.service";
export class CanvasItemContainerComponent {
    constructor(canvasItemApi, canvasOutletHelperService) {
        this.canvasItemApi = canvasItemApi;
        this.canvasOutletHelperService = canvasOutletHelperService;
    }
    trackByColFn(index, item) {
        return item.listId;
    }
    onDropListDropped(event) {
        const viewComponentDropData = Object.assign(Object.assign({}, event.item.data), { initialPropertiesByName: {}, columnIndex: event.container.data.columnIndex });
        this.canvasOutletHelperService.setBeforeViewComponentDropState(viewComponentDropData);
        if (!viewComponentDropData.preventDrop) {
            this.canvasItemApi.core.dropComponent(viewComponentDropData, event.currentIndex, this.outlet.name);
        }
    }
}
CanvasItemContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemContainerComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: i1.CanvasOutletHelperService }], target: i0.ɵɵFactoryTarget.Component });
CanvasItemContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemContainerComponent, selector: "rx-canvas-item-container", inputs: { outlet: "outlet", isReadOnly: "isReadOnly", layout: "layout" }, ngImport: i0, template: "<div class=\"row\">\n  <div\n    *ngFor=\"let column of outlet.columns; let colIndex = index; let isLastCol = last; trackBy: trackByColFn\"\n    class=\"{{ column.span ? 'col-' + column.span : 'col' }}\"\n    [ngClass]=\"{ 'col-border': !isLastCol }\"\n  >\n    <rx-canvas-item-column\n      [ngClass]=\"{ 'mb-3': !isLastCol }\"\n      [isReadOnly]=\"isReadOnly\"\n      [colIndex]=\"colIndex\"\n      [column]=\"column\"\n      [layout]=\"layout\"\n      (dropListDropped)=\"onDropListDropped($event)\"\n    ></rx-canvas-item-column>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.col-border{border-right:1px dashed #d6d7d8}\n"], components: [{ type: i2.CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: ["isReadOnly", "colIndex", "column", "layout"], outputs: ["dropListDropped"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-item-container',
                    templateUrl: './canvas-item-container.component.html',
                    styleUrls: ['./canvas-item-container.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i4.CanvasItemApi, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: i1.CanvasOutletHelperService }]; }, propDecorators: { outlet: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], layout: [{
                type: Input
            }] } });
//# sourceMappingURL=canvas-item-container.component.js.map