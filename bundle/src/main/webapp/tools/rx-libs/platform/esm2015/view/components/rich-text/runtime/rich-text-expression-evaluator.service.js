import { Injectable } from '@angular/core';
import { RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import { RX_RICH_TEXT } from '@helix/platform/view/api';
import { isNil } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxRichTextExpressionEvaluatorService {
    constructor(rxDefaultExpressionEvaluatorService) {
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
    }
    evaluate(expression, data) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = expression;
        tempElement.querySelectorAll(`span[${RX_RICH_TEXT.expressionAttributeName}]`).forEach((span) => {
            const evaluatedExpression = this.rxDefaultExpressionEvaluatorService.evaluate(span.getAttribute(RX_RICH_TEXT.expressionAttributeName), data);
            const textNode = document.createTextNode(isNil(evaluatedExpression) ? '' : evaluatedExpression);
            span.parentElement.replaceChild(textNode, span);
        });
        return tempElement.innerHTML;
    }
}
RxRichTextExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRichTextExpressionEvaluatorService, deps: [{ token: i1.RxDefaultExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRichTextExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRichTextExpressionEvaluatorService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRichTextExpressionEvaluatorService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxDefaultExpressionEvaluatorService }]; } });
//# sourceMappingURL=rich-text-expression-evaluator.service.js.map