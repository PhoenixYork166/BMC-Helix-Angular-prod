import { DatePipe } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { AdaptRxDatetimeAdapter, RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import { DateAdapter } from './date-adapter.class';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/forms";
export class DateFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, datePipe) {
        super(injector);
        this.datePipe = datePipe;
    }
    getDisplayValue() {
        const displayValue = super.getDisplayValue();
        if (displayValue) {
            return this.datePipe.transform(displayValue, 'mediumDate');
        }
    }
    getFieldValidators() {
        const validatorFn = (control) => {
            const date = control.value ? moment(control.value) : null;
            return control.value && date && !date.isValid()
                ? { rxDatetimeFormat: { mode: RxDatetimePickerMode.Date } }
                : null;
        };
        return [validatorFn];
    }
}
DateFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldComponent, deps: [{ token: i0.Injector }, { token: i1.DatePipe }], target: i0.ɵɵFactoryTarget.Component });
DateFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DateFieldComponent, selector: "rx-date-field", providers: [{ provide: AdaptRxDatetimeAdapter, useClass: DateAdapter }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-datetime\n    [label]=\"label\"\n    [required]=\"isRequired\"\n    [formControl]=\"formControl\"\n    [readonly]=\"isDisabled\"\n    [disabledStyleForReadonlyState]=\"true\"\n  ></adapt-rx-datetime>\n</ng-template>\n", components: [{ type: i2.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i3.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-date-field',
                    templateUrl: './date-field.component.html',
                    providers: [{ provide: AdaptRxDatetimeAdapter, useClass: DateAdapter }]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.DatePipe }]; } });
//# sourceMappingURL=date-field.component.js.map