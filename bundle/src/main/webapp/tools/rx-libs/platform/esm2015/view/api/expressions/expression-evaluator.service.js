import { RxDefaultExpressionEvaluatorService } from './default-expression-evaluator.service';
import { Injectable, Injector } from '@angular/core';
import { RxDefaultExpressionValidatorService } from './default-expression-validator.service';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./default-expression-evaluator.service";
import * as i3 from "./default-expression-validator.service";
export class RxExpressionEvaluatorService {
    constructor(injector, rxLogService, rxDefaultExpressionEvaluatorService, rxDefaultExpressionValidatorService, rxNotificationService) {
        this.injector = injector;
        this.rxLogService = rxLogService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxDefaultExpressionValidatorService = rxDefaultExpressionValidatorService;
        this.rxNotificationService = rxNotificationService;
    }
    evaluate(expression, data, customEvaluatorService) {
        const evaluator = customEvaluatorService || this.rxDefaultExpressionEvaluatorService;
        const evaluatedExpression = evaluator.evaluate(expression, data);
        this.rxLogService.debug(`EVALUATED EXPRESSION ${expression}: ${evaluatedExpression}`);
        return evaluatedExpression;
    }
    tryEvaluate(expression, data, customEvaluatorService, defaultValue = null) {
        let result = defaultValue;
        try {
            result = this.evaluate(expression, data, customEvaluatorService);
        }
        catch (error) {
            this.rxNotificationService.addErrorMessage(error.message);
        }
        return result;
    }
    isValid(expression, customEvaluatorService) {
        return this.rxDefaultExpressionValidatorService.isValid(expression, customEvaluatorService);
    }
}
RxExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEvaluatorService, deps: [{ token: i0.Injector }, { token: i1.RxLogService }, { token: i2.RxDefaultExpressionEvaluatorService }, { token: i3.RxDefaultExpressionValidatorService }, { token: i1.RxNotificationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEvaluatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxLogService }, { type: i2.RxDefaultExpressionEvaluatorService }, { type: i3.RxDefaultExpressionValidatorService }, { type: i1.RxNotificationService }]; } });
//# sourceMappingURL=expression-evaluator.service.js.map