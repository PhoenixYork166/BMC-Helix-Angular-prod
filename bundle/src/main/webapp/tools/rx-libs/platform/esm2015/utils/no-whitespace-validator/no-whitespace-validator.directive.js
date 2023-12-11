import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty, trim } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxNoWhitespaceValidator {
    constructor(translateService) {
        this.translateService = translateService;
    }
    validate(control) {
        let result = null;
        if (this.rxNoWhitespace !== false && control.value && isEmpty(trim(control.value))) {
            result = {
                error: {
                    message: this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message')
                }
            };
        }
        return result;
    }
}
RxNoWhitespaceValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidator, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Directive });
RxNoWhitespaceValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: { rxNoWhitespace: "rxNoWhitespace" }, providers: [{ provide: NG_VALIDATORS, useExisting: RxNoWhitespaceValidator, multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNoWhitespaceValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxNoWhitespace]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: RxNoWhitespaceValidator, multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { rxNoWhitespace: [{
                type: Input
            }] } });
//# sourceMappingURL=no-whitespace-validator.directive.js.map