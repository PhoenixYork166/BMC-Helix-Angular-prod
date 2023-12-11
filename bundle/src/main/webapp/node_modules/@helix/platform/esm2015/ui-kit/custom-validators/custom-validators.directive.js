import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxCustomValidatorsDirective {
    validate(control) {
        return this.rxCustomValidators(control);
    }
}
RxCustomValidatorsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomValidatorsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RxCustomValidatorsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: { rxCustomValidators: "rxCustomValidators" }, providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => RxCustomValidatorsDirective), multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomValidatorsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxCustomValidators][ngModel],[rxCustomValidators][formControl]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => RxCustomValidatorsDirective), multi: true }]
                }]
        }], propDecorators: { rxCustomValidators: [{
                type: Input
            }] } });
//# sourceMappingURL=custom-validators.directive.js.map