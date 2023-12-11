import { Component, HostBinding, Input } from '@angular/core';
import { RuntimeLayoutOutlet } from '../../../../layout';
import * as i0 from "@angular/core";
import * as i1 from "../canvas-item/runtime-view-canvas-item.component";
import * as i2 from "@angular/common";
export class RuntimeViewCanvasItemContainerComponent {
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
RuntimeViewCanvasItemContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasItemContainerComponent, selector: "rx-runtime-view-canvas-item-container", inputs: { columns: "columns", outlet: "outlet" }, host: { properties: { "style.min-height": "this.hostClass" } }, ngImport: i0, template: "<ng-container *ngIf=\"columns.length > 1\">\n  <div class=\"row rx-runtime-view-canvas-item-container-row\">\n    <div\n      class=\"rx-runtime-view-canvas-item-container-column\"\n      [ngClass]=\"column.cssClass ? column.cssClass : column.span ? 'col-' + column.span : 'col'\"\n      *ngFor=\"let column of columns\"\n    >\n      <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: column.children }\"></ng-container>\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"columns.length === 1\">\n  <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: columns[0].children }\"></ng-container>\n</ng-container>\n\n<ng-template #itemTpl let-layoutItems>\n  <rx-runtime-view-canvas-item\n    #item\n    *ngFor=\"let layoutItem of layoutItems; trackBy: trackByFn\"\n    [layout]=\"layoutItem\"\n  ></rx-runtime-view-canvas-item>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-runtime-view-canvas-item{display:block}::ng-deep .rx-runtime-view-canvas-item-margin:not(:last-child){margin-bottom:1rem}.rx-runtime-view-canvas-item-auto-fill,.rx-runtime-view-canvas-item-container-row,.rx-runtime-view-canvas-item-container-column{height:100%}.rx-runtime-view-canvas-item-container-column{display:flex;flex-direction:column}.rx-runtime-view-canvas-item-auto-scroll{overflow-y:auto}.rx-mb-sm{margin-bottom:1rem}@media (min-width: 576px){.rx-mb-sm{margin-bottom:0}}.rx-mb-sm:nth-last-child(1){margin-bottom:0}.rx-mb-md{margin-bottom:1rem}@media (min-width: 768px){.rx-mb-md{margin-bottom:0}}.rx-mb-md:nth-last-child(1){margin-bottom:0}.rx-mb-lg{margin-bottom:1rem}@media (min-width: 992px){.rx-mb-lg{margin-bottom:0}}.rx-mb-lg:nth-last-child(1){margin-bottom:0}.rx-mb-xl{margin-bottom:1rem}@media (min-width: 1200px){.rx-mb-xl{margin-bottom:0}}.rx-mb-xl:nth-last-child(1){margin-bottom:0}.rx-mb-xxl{margin-bottom:1rem}@media (min-width: 1600px){.rx-mb-xxl{margin-bottom:0}}.rx-mb-xxl:nth-last-child(1){margin-bottom:0}\n"], components: [{ type: i1.RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
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
//# sourceMappingURL=runtime-view-canvas-item-container.component.js.map