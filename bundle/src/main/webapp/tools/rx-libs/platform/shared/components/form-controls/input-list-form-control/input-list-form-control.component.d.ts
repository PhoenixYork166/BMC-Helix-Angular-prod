import { OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ValueAccessor } from '../../form-builder';
import { IInputListFormControlOptions } from './input-list-form-control-options.interface';
import * as i0 from "@angular/core";
export declare class InputListFormControlComponent extends ValueAccessor<string[]> implements OnInit, OnDestroy {
    private formBuilder;
    options: IInputListFormControlOptions;
    formArray: FormArray;
    private destroyed$;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    addItem(): void;
    removeItem(index: number): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputListFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputListFormControlComponent, "rx-input-list-form-control", never, { "options": "options"; }, {}, never, never>;
}
