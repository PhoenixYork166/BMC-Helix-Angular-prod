import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class RxJsonValidator {
    constructor(translateService) {
        this.translateService = translateService;
        this.errorMessage = '';
    }
    ngOnInit() {
        this.errorMessage = get(this.rxJson, 'errorMessage', this.translateService.instant('com.bmc.arsys.rx.client.utils.json-validator.error-message'));
    }
    validate(control) {
        let result = null;
        if (control.value) {
            try {
                JSON.parse(control.value);
            }
            catch (ignored) {
                result = {
                    error: {
                        message: this.errorMessage
                    }
                };
            }
        }
        return result;
    }
}
RxJsonValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonValidator, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Directive });
RxJsonValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxJsonValidator, selector: "[rxJson]", inputs: { rxJson: "rxJson" }, providers: [{ provide: NG_VALIDATORS, useExisting: RxJsonValidator, multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxJson]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: RxJsonValidator, multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { rxJson: [{
                type: Input
            }] } });
//# sourceMappingURL=json-validator.directive.js.map