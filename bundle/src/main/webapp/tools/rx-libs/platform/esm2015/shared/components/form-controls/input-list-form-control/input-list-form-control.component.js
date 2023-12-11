import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValueAccessor } from '../../form-builder';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export class InputListFormControlComponent extends ValueAccessor {
    constructor(formBuilder) {
        super();
        this.formBuilder = formBuilder;
        this.formArray = this.formBuilder.array([]);
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.formArray.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            if (this.formArray.controls.length) {
                this.value = this.formArray.getRawValue();
            }
            else {
                this.value = null;
            }
        });
    }
    addItem() {
        this.formArray.push(new FormControl(''));
    }
    removeItem(index) {
        this.formArray.removeAt(index);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
InputListFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
InputListFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InputListFormControlComponent, selector: "rx-input-list-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputListFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <div class=\"d-flex flex-row justify-content-between align-items-center\">\n    <adapt-rx-control-label [label]=\"options.label\" [showRequiredLabel]=\"options.required\"></adapt-rx-control-label>\n\n    <button adapt-button type=\"button\" btn-type=\"tertiary\" size=\"small\" (click)=\"addItem()\">\n      <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n      Add item\n    </button>\n  </div>\n\n  <div\n    class=\"d-flex flex-row align-items-center w-100 form-group\"\n    *ngFor=\"let control of formArray.controls; let i = index\"\n  >\n    <adapt-rx-textfield class=\"flex-fill\" [formControl]=\"control\"></adapt-rx-textfield>\n    <button\n      (click)=\"removeItem(i)\"\n      class=\"close position-relative ml-2\"\n      type=\"button\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.remove.label' | translate\"\n    ></button>\n  </div>\n</div>\n", components: [{ type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-input-list-form-control',
                    templateUrl: './input-list-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: InputListFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=input-list-form-control.component.js.map