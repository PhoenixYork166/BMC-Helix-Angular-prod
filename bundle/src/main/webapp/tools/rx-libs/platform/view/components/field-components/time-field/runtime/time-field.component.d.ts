import { DatePipe } from '@angular/common';
import { Injector } from '@angular/core';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TimeFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent {
    private datePipe;
    pickerMode: RxDatetimePickerMode;
    constructor(injector: Injector, datePipe: DatePipe);
    getDisplayValue(): string;
    getFieldValidators(): ValidatorFn[];
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeFieldComponent, "rx-time-field", never, {}, {}, never, never>;
}
