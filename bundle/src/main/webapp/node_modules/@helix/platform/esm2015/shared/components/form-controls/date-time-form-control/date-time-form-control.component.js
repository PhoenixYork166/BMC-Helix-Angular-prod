import { Component, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import { isNull } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
export class DateTimeFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.datePickerControl = new FormControl('');
        this.pickerMode = RxDatetimePickerMode.DateTime;
    }
    ngOnInit() {
        this.datePickerControl.valueChanges.subscribe((value) => {
            if (value && !isNull(value.hours) && !isNull(value.minutes)) {
                this.value = moment([
                    value.year || 0,
                    value.month || 0,
                    value.date || 0,
                    value.hours,
                    value.minutes,
                    value.seconds || 0
                ]).toISOString();
            }
            else {
                this.value = null;
            }
        });
    }
    writeValue(value) {
        super.writeValue(value);
        const date = moment(this.value);
        if (date.isValid()) {
            this.datePickerControl.setValue({
                year: date.year(),
                month: date.month(),
                date: date.date(),
                hours: date.hour(),
                minutes: date.minutes()
            });
        }
        else {
            this.datePickerControl.setValue(null);
        }
    }
}
DateTimeFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DateTimeFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DateTimeFormControlComponent, selector: "rx-date-time-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DateTimeFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-date-time-form-control',
                    templateUrl: './date-time-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: DateTimeFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=date-time-form-control.component.js.map