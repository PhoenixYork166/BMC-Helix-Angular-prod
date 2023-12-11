import { Component, ElementRef, EventEmitter, Injector, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AdaptButtonComponent } from '@bmc-ux/adapt-angular';
import { ValueAccessor } from '../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-translate/core";
export class RxBooleanComponent extends ValueAccessor {
    constructor(injector) {
        super();
        this.injector = injector;
        this.rxBlur = new EventEmitter();
    }
    ngOnInit() {
        this.control = this.injector.get(NgControl).control;
    }
    getButtonType(value) {
        return value === this.value ? 'primary' : 'secondary';
    }
    onButtonBlur(event) {
        if (!event.relatedTarget || !this.buttons.find((element) => element.nativeElement === event.relatedTarget)) {
            this.onTouched();
            this.rxBlur.emit(event);
        }
    }
    setValue(value) {
        if (this.value === value) {
            this.value = null;
        }
        else {
            this.value = value;
        }
    }
}
RxBooleanComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxBooleanComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBooleanComponent, selector: "rx-boolean", inputs: { shouldDisplayAsCheckbox: "shouldDisplayAsCheckbox", required: "required", isDisabled: "isDisabled", label: "label", tooltip: "tooltip" }, outputs: { rxBlur: "rxBlur" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxBooleanComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "buttons", predicate: AdaptButtonComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"!shouldDisplayAsCheckbox\" [class.has-danger]=\"adaptRxFeedbackRef.hasUIErrorState\">\n  <adapt-rx-control-label [label]=\"label\" [showRequiredLabel]=\"required\"></adapt-rx-control-label>\n\n  <div\n    class=\"btn-group\"\n    [attr.tabindex]=\"isDisabled ? 0 : undefined\"\n    [attr.aria-label]=\"isDisabled ? label + value : label\"\n    [class.focusable]=\"isDisabled\"\n  >\n    <button\n      adapt-button\n      size=\"small\"\n      [disabled]=\"isDisabled\"\n      [btn-type]=\"getButtonType(true)\"\n      (click)=\"setValue(true)\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.true' | translate\"\n      [attr.aria-pressed]=\"value === true\"\n      (blur)=\"onButtonBlur($event)\"\n      rx-id=\"true-button\"\n    >\n      <span class=\"d-icon-check_adapt\"></span>\n    </button>\n\n    <button\n      adapt-button\n      size=\"small\"\n      [disabled]=\"isDisabled\"\n      [btn-type]=\"getButtonType(false)\"\n      (click)=\"setValue(false)\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.false' | translate\"\n      [attr.aria-pressed]=\"value === false\"\n      (blur)=\"onButtonBlur($event)\"\n      rx-id=\"false-button\"\n    >\n      <span class=\"d-icon-circle_slash_o\"></span>\n    </button>\n  </div>\n\n  <adapt-rx-feedback\n    #adaptRxFeedbackRef\n    [errors]=\"control.errors\"\n    [controlTouched]=\"control.touched\"\n  ></adapt-rx-feedback>\n</div>\n\n<adapt-rx-checkbox\n  *ngIf=\"shouldDisplayAsCheckbox\"\n  [required]=\"required\"\n  [readonly]=\"isDisabled\"\n  [label]=\"label\"\n  [(ngModel)]=\"value\"\n  (onBlur)=\"onTouched(); rxBlur.emit($event)\"\n  [tooltip]=\"\n    tooltip\n      ? {\n          iconName: 'question_circle_o',\n          content: tooltip,\n          popoverMode: true\n        }\n      : null\n  \"\n>\n</adapt-rx-checkbox>\n", styles: [".btn-group{display:flex}.btn-group .btn-primary{margin-top:0;margin-bottom:0}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-boolean',
                    templateUrl: './boolean.component.html',
                    styleUrls: ['./boolean.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxBooleanComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { shouldDisplayAsCheckbox: [{
                type: Input
            }], required: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], label: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], rxBlur: [{
                type: Output
            }], buttons: [{
                type: ViewChildren,
                args: [AdaptButtonComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=boolean.component.js.map