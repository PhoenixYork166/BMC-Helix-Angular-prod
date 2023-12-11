import { Component, ElementRef, EventEmitter, HostListener, Inject, Output, Renderer2, ViewChild } from '@angular/core';
import { CanvasItemApi, CanvasItemContainerComponent, CanvasOutletHelperService, ViewDesignerCanvasItemApiToken } from '@helix/platform/view/designer';
import { SplitComponent } from 'angular-split';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
import * as i2 from "angular-split";
import * as i3 from "@angular/common";
export class ContainerCanvasItemComponent extends CanvasItemContainerComponent {
    constructor(canvasItemApi, canvasOutletHelperService, elementRef, renderer) {
        super(canvasItemApi, canvasOutletHelperService);
        this.canvasItemApi = canvasItemApi;
        this.canvasOutletHelperService = canvasOutletHelperService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.maxNumberOfColumns = 12;
        this.defaultGutterStep = 50;
        this.percentSpanSize = 100 / this.maxNumberOfColumns;
        this.gutterStep = this.defaultGutterStep;
        this.columnResize = new EventEmitter();
    }
    onWindowResize() {
        this.setGutterStep();
    }
    ngAfterViewInit() {
        const spans = this.outlet.columns.map((column) => column.span);
        this.setSpanSizes(spans);
        this.setGutterStep();
    }
    onDragEnd(event) {
        const spans = this.getPercentToSpanSizes(event.sizes);
        this.columnResize.emit(spans);
        this.setSpanSizes(spans);
    }
    getPercentToSpanSizes(percentSizes) {
        return percentSizes.map((size) => Math.round((size * this.maxNumberOfColumns) / 100));
    }
    setSpanSizes(spans) {
        this.splitComponent.setVisibleAreaSizes(this.getSpanToPercentSizes(spans));
    }
    getSpanToPercentSizes(spans) {
        return spans.map((span) => span * this.percentSpanSize);
    }
    setGutterStep() {
        const element = this.renderer.selectRootElement(this.elementRef.nativeElement, true);
        this.gutterStep = Math.round(element.clientWidth / this.maxNumberOfColumns) || this.defaultGutterStep;
    }
}
ContainerCanvasItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerCanvasItemComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: i1.CanvasOutletHelperService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ContainerCanvasItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContainerCanvasItemComponent, selector: "rx-container-canvas-item", outputs: { columnResize: "columnResize" }, host: { listeners: { "window:resize": "onWindowResize()" } }, viewQueries: [{ propertyName: "splitComponent", first: true, predicate: SplitComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<as-split\n  unit=\"percent\"\n  [class.selected]=\"layout.isSelected$ | async\"\n  [class.readonly]=\"isReadOnly\"\n  [gutterStep]=\"gutterStep\"\n  gutterSize=\"1\"\n  (dragEnd)=\"onDragEnd($event)\"\n>\n  <as-split-area\n    *ngFor=\"\n      let column of outlet.columns;\n      trackBy: trackByColFn;\n      let colIndex = index;\n      let first = first;\n      let last = last\n    \"\n    minSize=\"8\"\n  >\n    <rx-canvas-item-column\n      [isReadOnly]=\"isReadOnly\"\n      [colIndex]=\"colIndex\"\n      [column]=\"column\"\n      [layout]=\"layout\"\n      (dropListDropped)=\"onDropListDropped($event)\"\n    ></rx-canvas-item-column>\n  </as-split-area>\n</as-split>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}as-split:not(.readonly).selected ::ng-deep>.as-split-gutter{visibility:visible}as-split ::ng-deep as-split-area{height:revert!important;min-height:200px}as-split ::ng-deep as-split-area>rx-canvas-item-column{height:100%}as-split ::ng-deep as-split-area>rx-canvas-item-column>.cdk-drop-list{height:100%;min-height:auto}as-split ::ng-deep .as-split-gutter{visibility:hidden;height:revert!important;position:relative;background-color:#d6d7d8!important}as-split ::ng-deep .as-split-gutter .as-split-gutter-icon{border:1px solid #d6d7d8;height:72px!important;width:11px!important;background:white!important;border-radius:2px;position:absolute}as-split ::ng-deep .as-split-gutter .as-split-gutter-icon:hover:before,as-split ::ng-deep .as-split-gutter .as-split-gutter-icon:hover:after{background-color:#d6d7d8}as-split ::ng-deep .as-split-gutter .as-split-gutter-icon:before,as-split ::ng-deep .as-split-gutter .as-split-gutter-icon:after{display:inline-block;content:\"\";position:absolute;top:50%;width:2px;height:64px;background-color:#f0f1f1;border-radius:2px;transform:translateY(-50%);transition:background-color .25s ease}as-split ::ng-deep .as-split-gutter .as-split-gutter-icon:before{left:2px}as-split ::ng-deep .as-split-gutter .as-split-gutter-icon:after{left:5px}\n"], components: [{ type: i2.SplitComponent, selector: "as-split", inputs: ["direction", "unit", "gutterSize", "gutterStep", "restrictMove", "useTransition", "disabled", "dir", "gutterDblClickDuration"], outputs: ["dragStart", "dragEnd", "gutterClick", "gutterDblClick", "transitionEnd"], exportAs: ["asSplit"] }, { type: i1.CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: ["isReadOnly", "colIndex", "column", "layout"], outputs: ["dropListDropped"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.SplitAreaDirective, selector: "as-split-area, [as-split-area]", inputs: ["order", "size", "minSize", "maxSize", "lockSize", "visible"], exportAs: ["asSplitArea"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerCanvasItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-container-canvas-item',
                    templateUrl: './container-canvas-item.component.html',
                    styleUrls: ['./container-canvas-item.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.CanvasItemApi, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: i1.CanvasOutletHelperService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { splitComponent: [{
                type: ViewChild,
                args: [SplitComponent, { static: true }]
            }], columnResize: [{
                type: Output
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=container-canvas-item.component.js.map