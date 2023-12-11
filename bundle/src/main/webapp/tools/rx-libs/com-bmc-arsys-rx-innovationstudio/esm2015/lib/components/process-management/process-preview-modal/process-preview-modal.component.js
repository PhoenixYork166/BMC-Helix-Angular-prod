import { Component, ViewChild } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { of } from 'rxjs';
import { RxProcessPreviewComponent } from '@helix/platform/process/components';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/process/components";
import * as i3 from "@ngx-translate/core";
export class ProcessPreviewModalComponent {
    constructor(activeModalRef) {
        this.activeModalRef = activeModalRef;
        this.processDefinitionName = this.activeModalRef.getData().processDefinitionName;
        this.isRunButtonDisabled = this.activeModalRef.getData().allowRun;
        this.processPreviewConfiguration$ = of({ processDefinitionName: this.processDefinitionName, zoomToFit: true });
    }
    zoomIn() {
        this.processPreview.zoomIn();
    }
    zoomOut() {
        this.processPreview.zoomOut();
    }
}
/** @nocollapse */ ProcessPreviewModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalComponent, deps: [{ token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessPreviewModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessPreviewModalComponent, selector: "ax-process-preview-modal", viewQueries: [{ propertyName: "processPreview", first: true, predicate: ["processPreview"], descendants: true, static: true }], ngImport: i0, template: "<div>\n  <div class=\"canvas-toolbar\">\n    <button adapt-button type=\"button\" class=\"zoom-in\" (click)=\"zoomIn()\">\n      <span class=\"d-icon-search_plus\"></span>\n    </button>\n\n    <button adapt-button type=\"button\" class=\"zoom-out\" (click)=\"zoomOut()\">\n      <span class=\"d-icon-search_minus\"></span>\n    </button>\n  </div>\n  <rx-process-preview #processPreview [config]=\"processPreviewConfiguration$\"></rx-process-preview>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"ok-button\"\n    (click)=\"activeModalRef.close()\"\n    [disabled]=\"isRunButtonDisabled\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.process-management.run-process.button.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"cancel-button\"\n    (click)=\"activeModalRef.dismiss()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.canvas-toolbar{background:#f0f1f1;border-bottom:1px solid #d6d7d8}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.RxProcessPreviewComponent, selector: "rx-process-preview", inputs: ["config"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-preview-modal',
                    templateUrl: './process-preview-modal.component.html',
                    styleUrls: ['./process-preview-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }]; }, propDecorators: { processPreview: [{
                type: ViewChild,
                args: ['processPreview', { static: true }]
            }] } });
//# sourceMappingURL=process-preview-modal.component.js.map