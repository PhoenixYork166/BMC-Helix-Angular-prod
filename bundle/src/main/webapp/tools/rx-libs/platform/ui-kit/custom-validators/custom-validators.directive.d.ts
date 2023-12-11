import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class RxCustomValidatorsDirective implements Validator {
    rxCustomValidators: ValidatorFn;
    validate(control: AbstractControl): ValidationErrors | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCustomValidatorsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RxCustomValidatorsDirective, "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", never, { "rxCustomValidators": "rxCustomValidators"; }, {}, never>;
}
