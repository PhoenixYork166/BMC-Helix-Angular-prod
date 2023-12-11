import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { includes } from 'lodash';
import * as i0 from "@angular/core";
export class RxUniqueValidator {
    validate(control) {
        let result = null;
        if (control.dirty && control.value && includes(this.rxUnique.items, control.value)) {
            result = {
                error: {
                    message: this.rxUnique.errorMessage
                }
            };
        }
        return result;
    }
}
RxUniqueValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RxUniqueValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxUniqueValidator, selector: "[rxUnique]", inputs: { rxUnique: "rxUnique" }, providers: [{ provide: NG_VALIDATORS, useExisting: RxUniqueValidator, multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUniqueValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxUnique]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: RxUniqueValidator, multi: true }]
                }]
        }], propDecorators: { rxUnique: [{
                type: Input
            }] } });
//# sourceMappingURL=unique-validator.directive.js.map