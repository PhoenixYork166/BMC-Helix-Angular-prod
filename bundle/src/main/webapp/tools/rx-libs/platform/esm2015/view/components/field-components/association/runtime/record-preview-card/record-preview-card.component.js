import { Component, Input } from '@angular/core';
import { RecordEditorState } from '../../../../record-editor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@ngx-translate/core";
export class RxRecordPreviewCardComponent {
    ngOnInit() {
        this.maxFieldValueLength = this.config.maxFieldValueLength || 200;
    }
    isEditableState() {
        return this.config.state === RecordEditorState.Edit;
    }
}
RxRecordPreviewCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordPreviewCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxRecordPreviewCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxRecordPreviewCardComponent, selector: "rx-record-preview-card", inputs: { config: "config" }, ngImport: i0, template: "<div class=\"rx-record-preview-card d-flex align-items-start justify-content-between w-100\">\n  <ul class=\"rx-card-fields d-flex flex-column list-unstyled focusable mb-0\" tabindex=\"0\">\n    <li class=\"d-flex rx-card-field\" *ngFor=\"let field of config.fields\">\n      <span class=\"rx-card-field-label\" *ngIf=\"field.label\">{{ field.label }}</span>\n      <span *ngIf=\"field.label\">: </span>\n      <span class=\"rx-card-field-value px-1\" [ngClass]=\"{ 'font-weight-bold': !isEditableState() }\">{{\n        field.value\n      }}</span>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"isEditableState()\"\n    (click)=\"config.onDelete(config.id)\"\n    class=\"btn btn-link d-icon-cross p-0\"\n    adapt-button\n    size=\"small\"\n    btn-type=\"tertiary\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.remove.label' | translate\"\n  ></button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex}.rx-record-preview-card{flex:1}.rx-card-field{flex:1;line-height:20px}.rx-card-field:not(:first-child){color:#959899}.rx-card-fields{flex:1;white-space:nowrap;min-width:0}.rx-card-field-label{flex-shrink:0;max-width:30%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.rx-card-field-value{text-overflow:ellipsis;overflow:hidden}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordPreviewCardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-preview-card',
                    templateUrl: './record-preview-card.component.html',
                    styleUrls: ['./record-preview-card.component.scss']
                }]
        }], propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=record-preview-card.component.js.map