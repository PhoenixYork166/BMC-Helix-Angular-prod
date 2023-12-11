import { AfterViewInit, Injector } from '@angular/core';
import { IViewComponent } from '@helix/platform/view/runtime';
import { RxBooleanPipe } from '@helix/platform/shared/api';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { BooleanFieldEditingMode, IBooleanFieldConfig } from '../boolean-field.types';
import { NgModel } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class BooleanFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent, AfterViewInit {
    private rxBooleanPipe;
    editingMode: BooleanFieldEditingMode;
    get booleanValue(): boolean | null;
    set booleanValue(value: boolean | null);
    ngModel: NgModel;
    constructor(injector: Injector, rxBooleanPipe: RxBooleanPipe);
    getDisplayValue(): string;
    onConfigInitialized(config: IBooleanFieldConfig): void;
    onConfigUpdated(config: IBooleanFieldConfig): void;
    ngAfterViewInit(): void;
    get shouldDisplayAsCheckbox(): boolean;
    onBlur(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BooleanFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BooleanFieldComponent, "rx-boolean-field", never, {}, {}, never, never>;
}
