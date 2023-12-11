import { Component, Input } from '@angular/core';
import { RecordEditorDesignModel } from './record-editor-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/view/designer";
import * as i3 from "@angular/common";
export class RecordEditorDesignComponent {
    ngOnInit() {
        this.dropPredicateFn = this.model._dropPredicate.bind(this.model);
    }
}
RecordEditorDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RecordEditorDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordEditorDesignComponent, selector: "rx-record-editor-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-empty-state\n  *ngIf=\"(model.hasChildren$ | async) === false\"\n  type=\"objects\"\n  label=\"Drop fields from the Palette here or select a Record definition and add fields in the Properties panel.\"\n></adapt-empty-state>\n\n<rx-canvas-outlet [dropPredicate]=\"dropPredicateFn\"></rx-canvas-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{border:1px solid #d6d7d8;display:block;position:relative;padding:1rem;min-height:200px}adapt-empty-state{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden}rx-canvas-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{min-height:calc(200px - 1rem * 2)}\n"], components: [{ type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i2.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-editor-design',
                    templateUrl: './record-editor-design.component.html',
                    styleUrls: ['./record-editor-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=record-editor-design.component.js.map