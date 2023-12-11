import { DatePipe } from '@angular/common';
import { Injector } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { IViewComponent } from '@helix/platform/view/runtime';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import * as i0 from "@angular/core";
export declare class DateTimeFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent {
    private datePipe;
    pickerMode: RxDatetimePickerMode;
    constructor(injector: Injector, datePipe: DatePipe);
    getDisplayValue(): string;
    getFieldValidators(): ValidatorFn[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimeFieldComponent, "rx-date-time-field", never, {}, {}, never, never>;
}
