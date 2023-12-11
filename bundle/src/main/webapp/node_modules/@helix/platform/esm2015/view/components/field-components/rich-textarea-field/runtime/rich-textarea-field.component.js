import { Component, Injector } from '@angular/core';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "ckeditor4-angular";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class RichTextareaFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, rxCkEditorConfiguratorService) {
        super(injector);
        this.rxCkEditorConfiguratorService = rxCkEditorConfiguratorService;
        this.ckEditorType = "divarea" /* DIVAREA */;
        this.ckEditorConfig = this.rxCkEditorConfiguratorService.getCKEditorConfig();
    }
    setFieldValue(value, options = {}) {
        // When pressing a toolbar button, e.g. Bold, while the field is blank, ckeditor triggers
        // a `dataChange` event with an empty string as data. If we allow this value to be set,
        // it will be converted back to null and result in all toolbar buttons being reset,
        // e.g. the Bold button will be unpressed.
        // As a workaround, we do not accept empty string if the current field value is null.
        if (!(this.formControl.value === null && value === '')) {
            super.setFieldValue(value);
        }
    }
    onBlur() {
        this.formControl.markAsTouched();
    }
}
RichTextareaFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldComponent, deps: [{ token: i0.Injector }, { token: i1.RxCkEditorConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
RichTextareaFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichTextareaFieldComponent, selector: "rx-rich-textarea-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <div class=\"read-only-content-wrapper focusable\" *ngIf=\"inReadState; else editStateElementRef\" tabindex=\"0\">\n    <label>{{ label }}</label>\n\n    <ckeditor\n      [config]=\"ckEditorConfig\"\n      [type]=\"ckEditorType\"\n      [readOnly]=\"true\"\n      [ngModel]=\"getDisplayValue()\"\n    ></ckeditor>\n  </div>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <div [class.has-danger]=\"adaptRxFeedbackRef.hasUIErrorState\">\n    <adapt-rx-control-label [label]=\"label\" [showRequiredLabel]=\"isRequired\"></adapt-rx-control-label>\n\n    <ckeditor\n      (dataChange)=\"setFieldValue($event)\"\n      [data]=\"formControl.value\"\n      [config]=\"ckEditorConfig\"\n      [type]=\"ckEditorType\"\n      [readOnly]=\"isDisabled\"\n      (blur)=\"onBlur()\"\n    ></ckeditor>\n\n    <adapt-rx-feedback\n      #adaptRxFeedbackRef\n      [errors]=\"formControl.errors\"\n      [controlTouched]=\"formControl.touched\"\n    ></adapt-rx-feedback>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}ckeditor ::ng-deep .cke_inner{box-shadow:none}.read-only-content-wrapper ckeditor ::ng-deep .cke{border:none}.read-only-content-wrapper ckeditor ::ng-deep .cke_top{display:none}.read-only-content-wrapper ckeditor ::ng-deep .cke_editable{padding:0}.has-danger ::ng-deep .cke{border-color:#f83200}\n"], components: [{ type: i2.CKEditorComponent, selector: "ckeditor", inputs: ["tagName", "type", "editorUrl", "data", "readOnly", "config"], outputs: ["ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }, { type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rich-textarea-field',
                    templateUrl: './rich-textarea-field.component.html',
                    styleUrls: ['./rich-textarea-field.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxCkEditorConfiguratorService }]; } });
//# sourceMappingURL=rich-textarea-field.component.js.map