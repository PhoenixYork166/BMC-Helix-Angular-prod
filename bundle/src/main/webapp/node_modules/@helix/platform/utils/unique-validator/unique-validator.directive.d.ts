import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { IUniqueValidatorConfig } from './unique-validator.types';
import * as i0 from "@angular/core";
export declare class RxUniqueValidator implements Validator {
    rxUnique: IUniqueValidatorConfig;
    validate(control: AbstractControl): ValidationErrors | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUniqueValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RxUniqueValidator, "[rxUnique]", never, { "rxUnique": "rxUnique"; }, {}, never>;
}
