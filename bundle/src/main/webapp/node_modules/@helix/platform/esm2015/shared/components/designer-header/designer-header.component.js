import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxDesignerHeaderComponent {
    constructor() {
        this.breadcrumbItems = [];
        this.isDesignMode = true;
        this.isPreviewAvailable = false;
        this.isSaveButtonDisabled = false;
        this.breadcrumbSelected = new EventEmitter();
        this.toggleDesignMode = new EventEmitter();
        this.showPreview = new EventEmitter();
        this.save = new EventEmitter();
        this.closeDesigner = new EventEmitter();
    }
}
RxDesignerHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDesignerHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: { bundleName: "bundleName", breadcrumbItems: "breadcrumbItems", isDesignMode: "isDesignMode", isPreviewAvailable: "isPreviewAvailable", isSaveButtonDisabled: "isSaveButtonDisabled" }, outputs: { breadcrumbSelected: "breadcrumbSelected", toggleDesignMode: "toggleDesignMode", showPreview: "showPreview", save: "save", closeDesigner: "closeDesigner" }, ngImport: i0, template: "<div class=\"header-column-left\">\n  <span class=\"bundle-name\">{{ bundleName }}</span>\n</div>\n\n<div class=\"header-column-right\">\n  <div class=\"header-title\">\n    <rx-breadcrumb-bar (selectedItem)=\"breadcrumbSelected.emit($event)\" [items]=\"breadcrumbItems\"></rx-breadcrumb-bar>\n  </div>\n\n  <div class=\"header-buttons\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      size=\"small\"\n      rx-id=\"json-button\"\n      class=\"header-button\"\n      (click)=\"toggleDesignMode.emit()\"\n    >\n      <span [ngClass]=\"{ 'd-icon-brackets_curly': isDesignMode, 'd-icon-app_eye': !isDesignMode }\"></span>\n      {{ isDesignMode ? 'JSON' : 'UI Design' }}\n    </button>\n\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      rx-id=\"preview-button\"\n      size=\"small\"\n      [hidden]=\"!isPreviewAvailable\"\n      (click)=\"showPreview.emit()\"\n      class=\"header-button\"\n    >\n      <span class=\"d-icon-eye\"></span>\n      Preview\n    </button>\n\n    <div class=\"header-button-divider\"></div>\n\n    <button\n      adapt-button\n      type=\"button\"\n      [disabled]=\"isSaveButtonDisabled\"\n      rx-id=\"save-button\"\n      size=\"small\"\n      (click)=\"save.emit()\"\n      btn-type=\"primary\"\n      class=\"header-button\"\n    >\n      Save\n    </button>\n\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"close-button\"\n      size=\"small\"\n      (click)=\"closeDesigner.emit()\"\n      btn-type=\"secondary\"\n      class=\"header-button\"\n    >\n      Close\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex:0 0 50px;font-size:1.3em;background:#f0f1f1;border-bottom:1px solid #d6d7d8}.bundle-name,.header-title{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.bundle-name{padding:0 10px;flex:1}.header-title{flex-grow:1;padding-right:20px}.header-buttons{display:flex;margin-left:auto}.header-button{margin:0 2px}.header-button-divider{margin:auto 5px;display:block;height:20px;width:1px;background-color:#d6d7d8}.header-column-right,.header-column-left{display:flex;align-items:center;height:100%;overflow:hidden}.header-column-right{padding:0 10px;flex-grow:1}.header-column-left{flex:0 0 280px}\n"], components: [{ type: i1.RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: ["items"], outputs: ["selectedItem"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer-header',
                    templateUrl: './designer-header.component.html',
                    styleUrls: ['./designer-header.component.scss']
                }]
        }], propDecorators: { bundleName: [{
                type: Input
            }], breadcrumbItems: [{
                type: Input
            }], isDesignMode: [{
                type: Input
            }], isPreviewAvailable: [{
                type: Input
            }], isSaveButtonDisabled: [{
                type: Input
            }], breadcrumbSelected: [{
                type: Output
            }], toggleDesignMode: [{
                type: Output
            }], showPreview: [{
                type: Output
            }], save: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });
//# sourceMappingURL=designer-header.component.js.map