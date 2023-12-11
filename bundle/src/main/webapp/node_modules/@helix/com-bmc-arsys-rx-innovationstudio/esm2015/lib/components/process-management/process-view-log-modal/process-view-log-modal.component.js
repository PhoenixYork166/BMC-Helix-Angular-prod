import { Component, NgZone } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxProcessInstanceService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/process/api";
import * as i5 from "@angular/common";
export class ProcessViewLogModalComponent {
    constructor(activeModalRef, translateService, ngZone, rxNotificationService, rxProcessInstanceService) {
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.rxNotificationService = rxNotificationService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.emptyStateLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.no-log.label');
        this.logs = this.activeModalRef.getData().logContent;
    }
    downloadLog() {
        this.rxProcessInstanceService
            .downloadLog(this.activeModalRef.getData().processDefinitionName, this.activeModalRef.getData().instanceId)
            .subscribe((fileStream) => {
            if ((fileStream === null || fileStream === void 0 ? void 0 : fileStream.size) > 0) {
                const file = new Blob([fileStream], {
                    type: fileStream.type
                });
                this.ngZone.runOutsideAngular(() => {
                    saveAs(file, 'process.log');
                });
            }
            else {
                this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.view-log.modal.no-log.label'), '');
            }
        });
    }
}
/** @nocollapse */ ProcessViewLogModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }, { token: i0.NgZone }, { token: i3.RxNotificationService }, { token: i4.RxProcessInstanceService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessViewLogModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessViewLogModalComponent, selector: "ax-process-view-log-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <textarea class=\"form-control\" readonly *ngIf=\"this.logs\">{{ logs }}</textarea>\n  <adapt-empty-state [type]=\"'config'\" [label]=\"emptyStateLabel\" *ngIf=\"!this.logs\"> </adapt-empty-state>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"download-log-button\"\n    *ngIf=\"this.logs\"\n    (click)=\"downloadLog()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.download.label' | translate }}\n  </button>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    rx-id=\"close-button\"\n    (click)=\"activeModalRef.dismiss()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}textarea{color:#000;resize:none}.modal-body{justify-content:center;display:flex}adapt-empty-state{align-self:center}\n"], components: [{ type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-view-log-modal',
                    templateUrl: './process-view-log-modal.component.html',
                    styleUrls: ['./process-view-log-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }, { type: i0.NgZone }, { type: i3.RxNotificationService }, { type: i4.RxProcessInstanceService }]; } });
//# sourceMappingURL=process-view-log-modal.component.js.map