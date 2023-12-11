import { DecimalPipe } from '@angular/common';
import { Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFieldDefinition } from '@helix/platform/record/api';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { IBaseRecordEditorFieldComponentConfig } from '../../base-record-editor-field/runtime/base-record-editor-field-component.types';
import * as i0 from "@angular/core";
export declare class IntegerFieldComponent extends BaseRecordEditorFieldComponent implements OnInit, IViewComponent {
    fieldDefinition: IFieldDefinition;
    decimalPipe: DecimalPipe;
    counterFormControl: FormControl;
    private hasFocus;
    counterComponent: any;
    constructor(injector: Injector);
    onConfigInitialized(config: IBaseRecordEditorFieldComponentConfig): void;
    onBlur(): void;
    onFocus(): void;
    getDisplayValue(): string;
    setFieldValue(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntegerFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IntegerFieldComponent, "rx-integer-field", never, {}, {}, never, never>;
}
