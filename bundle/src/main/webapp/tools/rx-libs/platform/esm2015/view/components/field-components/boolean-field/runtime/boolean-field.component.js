import { Component, Injector, ViewChild } from '@angular/core';
import { isNil, isNull } from 'lodash';
import { RxBooleanPipe } from '@helix/platform/shared/api';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { BooleanFieldEditingMode, BooleanFieldModelValue } from '../boolean-field.types';
import { NgModel } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class BooleanFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, rxBooleanPipe) {
        super(injector);
        this.rxBooleanPipe = rxBooleanPipe;
    }
    get booleanValue() {
        const value = this.getFieldValue();
        return isNull(value) ? null : Boolean(value);
    }
    set booleanValue(value) {
        if (isNull(value)) {
            this.setFieldValue(null);
        }
        else {
            this.setFieldValue(Number(value));
        }
    }
    getDisplayValue() {
        const displayValue = super.getDisplayValue();
        if (!isNil(displayValue)) {
            return this.rxBooleanPipe.transform(displayValue);
        }
        else {
            return '-';
        }
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        this.editingMode = config.editingMode;
    }
    onConfigUpdated(config) {
        super.onConfigUpdated(config);
        // Set 0 as a default value for checkbox, e.g. scenario in the create record editor mode
        if (this.shouldDisplayAsCheckbox && this.getFieldValue() === null) {
            this.setFieldValue(BooleanFieldModelValue.False, { markAsDirty: false, markAsTouched: false });
        }
    }
    ngAfterViewInit() {
        this.formControl.touched$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((touched) => { var _a, _b; return touched ? (_a = this.ngModel) === null || _a === void 0 ? void 0 : _a.control.markAsTouched() : (_b = this.ngModel) === null || _b === void 0 ? void 0 : _b.control.markAsUntouched(); });
    }
    get shouldDisplayAsCheckbox() {
        return this.editingMode === BooleanFieldEditingMode.Checkbox && this.isRequired;
    }
    onBlur() {
        this.formControl.markAsTouched();
    }
}
BooleanFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldComponent, deps: [{ token: i0.Injector }, { token: i1.RxBooleanPipe }], target: i0.ɵɵFactoryTarget.Component });
BooleanFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BooleanFieldComponent, selector: "rx-boolean-field", viewQueries: [{ propertyName: "ngModel", first: true, predicate: ["booleanComponent"], descendants: true, read: NgModel }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <rx-boolean\n    #booleanComponent\n    [hidden]=\"isHidden\"\n    [label]=\"label\"\n    [isDisabled]=\"isDisabled\"\n    [required]=\"isRequired\"\n    [shouldDisplayAsCheckbox]=\"shouldDisplayAsCheckbox\"\n    [(ngModel)]=\"booleanValue\"\n    (rxBlur)=\"onBlur()\"\n  >\n  </rx-boolean>\n</ng-template>\n", components: [{ type: i2.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i3.RxBooleanComponent, selector: "rx-boolean", inputs: ["shouldDisplayAsCheckbox", "required", "isDisabled", "label", "tooltip"], outputs: ["rxBlur"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-boolean-field',
                    templateUrl: './boolean-field.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxBooleanPipe }]; }, propDecorators: { ngModel: [{
                type: ViewChild,
                args: ['booleanComponent', { read: NgModel }]
            }] } });
//# sourceMappingURL=boolean-field.component.js.map