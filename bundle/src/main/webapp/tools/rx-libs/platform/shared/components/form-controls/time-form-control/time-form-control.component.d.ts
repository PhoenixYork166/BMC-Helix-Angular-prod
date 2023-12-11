import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValueAccessor } from '../../form-builder';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { IDateFormControlOptions } from '../date-form-control';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class TimeFormControlComponent extends ValueAccessor<string> implements IFormControlComponent, OnInit {
    options: IDateFormControlOptions;
    isDisabled: boolean;
    datePickerControl: FormControl;
    pickerMode: RxDatetimePickerMode;
    ngOnInit(): void;
    writeValue(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeFormControlComponent, "rx-time-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
