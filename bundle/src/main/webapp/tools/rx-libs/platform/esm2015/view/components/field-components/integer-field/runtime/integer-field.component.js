import { DecimalPipe } from '@angular/common';
import { Component, Injector, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import BigNumber from 'bignumber.js';
import { isEqual, isFinite, isNil, isNull } from 'lodash';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class IntegerFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector) {
        super(injector);
        this.hasFocus = false;
        this.decimalPipe = injector.get(DecimalPipe);
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        // A separate formControl is used to handle the scenario when invalid number typed to the counter component.
        this.counterFormControl = new FormControl(this.formControl.value, this.formControl.validator);
        this.counterFormControl.valueChanges
            .pipe(filter((value) => !isEqual(this.formControl.value, value)), takeUntil(this.destroyed$))
            .subscribe((value) => {
            this.setFieldValue(value);
        });
        this.formControl.valueChanges
            .pipe(startWith(this.formControl.value), distinctUntilChanged(isEqual), takeUntil(this.destroyed$))
            .subscribe(() => {
            // To prevent reset the counter invalid value (e.g '-', 'e') during the typing,
            // in this case counterFormControl value is NaN and formControl value is null,
            // counter must be updated only when it doesn't have a focus
            if (!this.hasFocus) {
                this.counterFormControl.setValue(this.formControl.value);
            }
        });
        this.formControl.touched$.pipe(takeUntil(this.destroyed$)).subscribe((touched) => {
            touched ? this.counterFormControl.markAsTouched() : this.counterFormControl.markAsUntouched();
        });
    }
    onBlur() {
        this.hasFocus = false;
        this.formControl.markAsTouched();
    }
    onFocus() {
        this.hasFocus = true;
    }
    getDisplayValue() {
        const fieldValue = this.getFieldValue();
        return isNil(fieldValue) ? fieldValue : this.decimalPipe.transform(String(fieldValue));
    }
    setFieldValue(value) {
        if (!isNull(value) && isFinite(value)) {
            const bigNumberVal = new BigNumber(value);
            if (!bigNumberVal.eq(this.formControl.value)) {
                this.formControl.markAsDirty();
                this.formControl.setValue(bigNumberVal);
            }
        }
        else {
            super.setFieldValue(value);
        }
    }
}
IntegerFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
IntegerFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IntegerFieldComponent, selector: "rx-integer-field", viewQueries: [{ propertyName: "counterComponent", first: true, predicate: ["counterComponent"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-counter\n    #counterComponent\n    class=\"mb-0\"\n    [label]=\"label\"\n    [formControl]=\"counterFormControl\"\n    [readonly]=\"isDisabled\"\n    [disabledStyleForReadonlyState]=\"true\"\n    [required]=\"isRequired\"\n    [min]=\"fieldDefinition.minValue\"\n    [max]=\"fieldDefinition.maxValue\"\n    [adaptMin]=\"fieldDefinition.minValue\"\n    [adaptMax]=\"fieldDefinition.maxValue\"\n    adaptIntegerNumber\n    (onBlur)=\"onBlur()\"\n    (onFocus)=\"onFocus()\"\n  ></adapt-rx-counter>\n</ng-template>\n", components: [{ type: i1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i2.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i2.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-integer-field',
                    templateUrl: './integer-field.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { counterComponent: [{
                type: ViewChild,
                args: ['counterComponent']
            }] } });
//# sourceMappingURL=integer-field.component.js.map