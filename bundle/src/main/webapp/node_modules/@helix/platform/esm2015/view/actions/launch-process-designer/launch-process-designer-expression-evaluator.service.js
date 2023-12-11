import { Injectable } from '@angular/core';
import { RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxLaunchProcessDesignerExpressionEvaluatorService {
    constructor(rxDefaultExpressionEvaluatorService) {
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
    }
    evaluate(expression, data) {
        let evaluatedExpression = expression;
        if (!RX_RECORD_DEFINITION.validFullDefinitionName.test(expression)) {
            evaluatedExpression = this.rxDefaultExpressionEvaluatorService.evaluate(expression, data);
        }
        return evaluatedExpression;
    }
    parseExpression(expression) {
        let parsedExpression;
        if (!RX_RECORD_DEFINITION.validFullDefinitionName.test(expression)) {
            parsedExpression = this.rxDefaultExpressionEvaluatorService.parseExpression(expression);
        }
        return parsedExpression;
    }
}
RxLaunchProcessDesignerExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerExpressionEvaluatorService, deps: [{ token: i1.RxDefaultExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessDesignerExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerExpressionEvaluatorService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerExpressionEvaluatorService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxDefaultExpressionEvaluatorService }]; } });
//# sourceMappingURL=launch-process-designer-expression-evaluator.service.js.map