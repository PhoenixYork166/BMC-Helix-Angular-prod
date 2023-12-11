import { RxDefaultExpressionEvaluatorService } from './default-expression-evaluator.service';
import { RxExpressionHelperService } from './expression-helper.service';
import { Injectable } from '@angular/core';
import { RxStringService } from '@helix/platform/utils';
import { isFunction } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "./default-expression-evaluator.service";
import * as i3 from "./expression-helper.service";
export class RxDefaultExpressionValidatorService {
    constructor(rxStringService, rxDefaultExpressionEvaluatorService, rxExpressionHelperService) {
        this.rxStringService = rxStringService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxExpressionHelperService = rxExpressionHelperService;
    }
    isValid(expression, customEvaluatorService) {
        const evaluator = customEvaluatorService || this.rxDefaultExpressionEvaluatorService;
        let valid = true;
        if (this.rxStringService.isNonEmptyString(expression) && isFunction(evaluator.parseExpression)) {
            const preparedExpression = this.rxExpressionHelperService.prepare(expression);
            try {
                evaluator.parseExpression(preparedExpression);
            }
            catch (e) {
                valid = false;
            }
        }
        return valid;
    }
}
RxDefaultExpressionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionValidatorService, deps: [{ token: i1.RxStringService }, { token: i2.RxDefaultExpressionEvaluatorService }, { token: i3.RxExpressionHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefaultExpressionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultExpressionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i2.RxDefaultExpressionEvaluatorService }, { type: i3.RxExpressionHelperService }]; } });
//# sourceMappingURL=default-expression-validator.service.js.map