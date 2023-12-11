import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RX_MODAL } from './modal.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-translate/core";
export class RxModalComponent {
    constructor(context) {
        this.context = context;
        this.answer = '';
        this.config = this.context.getData();
    }
    onConfirm() {
        if (this.config.modalType === RX_MODAL.modalTypes.prompt) {
            this.context.close({ response: true, answer: this.answer });
        }
        else {
            this.context.close(true);
        }
    }
}
RxModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalComponent, deps: [{ token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
RxModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxModalComponent, selector: "rx-modal", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.modalConfig.title }}</h5>\n\n  <button\n    class=\"close\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    type=\"button\"\n    (click)=\"context.close(false)\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <span class=\"message\" *ngIf=\"config.modalType !== 'prompt'\">{{ config.modalConfig.message }}</span>\n\n  <adapt-rx-textfield\n    *ngIf=\"config.modalType === 'prompt'\"\n    [label]=\"config.modalConfig.message\"\n    [autofocus]=\"true\"\n    [(ngModel)]=\"answer\"\n  ></adapt-rx-textfield>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button btn-type=\"primary\" (click)=\"onConfirm()\">\n    {{ config.modalConfig.buttons.confirmButton }}\n  </button>\n\n  <button\n    adapt-button\n    *ngIf=\"config.modalConfig.buttons.dismissButton\"\n    btn-type=\"secondary\"\n    (click)=\"context.close(false)\"\n  >\n    {{ config.modalConfig.buttons.dismissButton }}\n  </button>\n</div>\n\n<div class=\"sr-only\" role=\"alert\">{{ config.modalConfig.title }} {{ config.modalConfig.message }}</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:20px}.modal-body .message{white-space:pre-wrap}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n"], components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-modal',
                    templateUrl: './modal.component.html',
                    styleUrls: ['./modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }]; } });
//# sourceMappingURL=modal.component.js.map