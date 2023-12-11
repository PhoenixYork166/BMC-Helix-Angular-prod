import { Component, Input } from '@angular/core';
import { ViewDesignerFacade } from '@helix/platform/view/designer';
import { RxShellDesignModel } from './shell-design.model';
import { RX_SHELL } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
import * as i2 from "@angular/common";
export class RxShellDesignComponent {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
    }
    dropPredicate(data) {
        return data.draggedViewComponentDescriptor.type !== RX_SHELL.navBar.action;
    }
    dropPredicateAction(data) {
        return data.draggedViewComponentDescriptor.type === RX_SHELL.navBar.action;
    }
}
RxShellDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignComponent, deps: [{ token: i1.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Component });
RxShellDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellDesignComponent, selector: "rx-shell-design", inputs: { model: "model" }, ngImport: i0, template: "<div class=\"shell-design d-flex align-items-start pl-2\">\n  <span class=\"a-product\">\n    <span class=\"a-product__logo logo-light logo-helix\"></span>\n    <span class=\"a-product__name\">\n      {{ viewDesignerFacade.bundleFriendlyName$ | async }}\n    </span>\n  </span>\n\n  <span class=\"a-sep\"></span>\n\n  <rx-canvas-outlet\n    class=\"shell-design-outlet d-block flex-grow-1\"\n    [class.allow-app-switch]=\"model.allowAppSwitching$ | async\"\n    [class.global-search]=\"model.globalSearchEnabled$ | async\"\n    dropListOrientation=\"horizontal\"\n    [dropPredicate]=\"dropPredicate\"\n  ></rx-canvas-outlet>\n\n  <rx-canvas-outlet\n    class=\"shell-design-outlet actions d-block flex-grow-1\"\n    [name]=\"'actions'\"\n    [dropPredicate]=\"dropPredicateAction\"\n    dropListOrientation=\"horizontal\"\n  ></rx-canvas-outlet>\n\n  <span *ngIf=\"model.globalSearchEnabled$ | async\" class=\"shell-button d-icon-search ml-auto\"></span>\n  <span *ngIf=\"model.allowAppSwitching$ | async\" class=\"shell-button d-icon-tiles ml-auto\"></span>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.shell-design{background:#313538;color:#fff;min-height:50px;border-bottom:2px solid #f86e00;padding-right:60px}.shell-design-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{display:flex;flex-flow:row wrap;min-height:50px}:host::ng-deep .shell-design-outlet.actions>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{justify-content:flex-end}.shell-design-outlet ::ng-deep .canvas-rx-shell-user-menu{position:absolute;top:0;right:calc(-150px - 44px)}.shell-design-outlet.allow-app-switch ::ng-deep .canvas-rx-shell-user-menu,.shell-design-outlet.global-search ::ng-deep .canvas-rx-shell-user-menu{right:calc(-150px - 86px)}.shell-design-outlet.allow-app-switch.global-search ::ng-deep .canvas-rx-shell-user-menu{right:calc(-150px - 128px)}.shell-design-outlet.actions{max-width:150px;min-width:150px}.shell-button{font-size:20px;margin-top:10px;width:42px;text-align:center}.a-product{margin-top:10px}\n"], components: [{ type: i1.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-design',
                    templateUrl: './shell-design.component.html',
                    styleUrls: ['./shell-design.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }]; }, propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=shell-design.component.js.map