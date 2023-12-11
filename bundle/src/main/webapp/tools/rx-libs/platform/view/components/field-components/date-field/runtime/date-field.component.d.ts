import { DatePipe } from '@angular/common';
import { Injector } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import * as i0 from "@angular/core";
export declare class DateFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent {
    private datePipe;
    constructor(injector: Injector, datePipe: DatePipe);
    getDisplayValue(): string;
    getFieldValidators(): ValidatorFn[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateFieldComponent, "rx-date-field", never, {}, {}, never, never>;
}
