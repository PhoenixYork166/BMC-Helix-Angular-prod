import { INameValuePair } from './name-value-pair.interface';
import { TranslateService } from '@ngx-translate/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class RxNameValuePairsEditorComponent implements ControlValueAccessor, Validator {
    private translateService;
    nameValuePairs: INameValuePair[];
    addButtonLabel: string;
    onChangeCallback: any;
    registerOnTouched: (...args: any[]) => void;
    constructor(translateService: TranslateService);
    writeValue(value: any): void;
    registerOnChange(callback: Function): void;
    validate(control: AbstractControl): ValidationErrors | null;
    addNameValuePair(): void;
    deleteNameValuePair(index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNameValuePairsEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxNameValuePairsEditorComponent, "rx-name-value-pairs-editor", never, { "addButtonLabel": "addButtonLabel"; }, {}, never, never>;
}
