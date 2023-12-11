import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IDateFormControlOptions } from './date-form-control-options.interface';
import * as i0 from "@angular/core";
export declare class DateFormControlComponent extends ValueAccessor<string> implements IFormControlComponent, OnInit {
    options: IDateFormControlOptions;
    isDisabled: boolean;
    datePickerControl: FormControl;
    pickerMode: RxDatetimePickerMode;
    ngOnInit(): void;
    writeValue(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateFormControlComponent, "rx-date-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
