import { AbstractControl } from '@angular/forms';
import { AbstractFormControlModel } from './abstract-form-control.model';
import { IFormControlOptions } from './interfaces/form-control-options.interface';
export declare class FormControlModel extends AbstractFormControlModel {
    type: string;
    component: any;
    name: string;
    isDisabled: boolean;
    formControl: AbstractControl;
    options: any;
    constructor(options: IFormControlOptions, formControl: AbstractControl);
}
