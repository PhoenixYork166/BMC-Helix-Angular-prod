import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxNoWhitespaceValidator implements Validator {
    private translateService;
    rxNoWhitespace: boolean;
    constructor(translateService: TranslateService);
    validate(control: AbstractControl): ValidationErrors | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNoWhitespaceValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RxNoWhitespaceValidator, "[rxNoWhitespace]", never, { "rxNoWhitespace": "rxNoWhitespace"; }, {}, never>;
}
