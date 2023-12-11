import { OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { IJsonValidatorConfig } from './json.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxJsonValidator implements OnInit, Validator {
    private translateService;
    rxJson: IJsonValidatorConfig;
    private errorMessage;
    constructor(translateService: TranslateService);
    ngOnInit(): void;
    validate(control: AbstractControl): ValidationErrors | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxJsonValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RxJsonValidator, "[rxJson]", never, { "rxJson": "rxJson"; }, {}, never>;
}
