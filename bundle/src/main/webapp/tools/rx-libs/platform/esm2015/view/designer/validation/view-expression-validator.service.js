import { Injectable } from '@angular/core';
import { RxDefaultExpressionEvaluatorService, RxDefaultExpressionValidatorService } from '@helix/platform/view/api';
import { RxStringService } from '@helix/platform/utils';
import { of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { ExpressionParserToken, RxExpressionParserService } from '@helix/platform/shared/api';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../+state/view-designer.facade";
export class RxViewExpressionValidatorService {
    constructor(rxDefaultExpressionValidatorService, rxDefaultExpressionEvaluatorService, rxStringService, rxExpressionParserService, viewDesignerFacade) {
        this.rxDefaultExpressionValidatorService = rxDefaultExpressionValidatorService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxStringService = rxStringService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.viewDesignerFacade = viewDesignerFacade;
    }
    validate(expression, propertyName, propertyLabel = this.rxStringService.prettify(propertyName), expressionEvaluator = this.rxDefaultExpressionEvaluatorService) {
        let issues$ = of([]);
        if (this.rxDefaultExpressionValidatorService.isValid(expression, expressionEvaluator)) {
            if (this.rxStringService.isNonEmptyString(expression)) {
                const referencedComponentGuidsSet = new Set();
                this.rxExpressionParserService.parse(expression, (token, expressionFragment) => {
                    if (token === ExpressionParserToken.RxExpression || token === ExpressionParserToken.SingleQuoteRxExpression) {
                        // Extract <ID> from ${view.components.<ID>.<Path>}
                        const result = /\${view\.components\.([0-9a-z-]+)\..+}/.exec(expressionFragment);
                        if (result && result[1]) {
                            referencedComponentGuidsSet.add(result[1]);
                        }
                    }
                    return expressionFragment;
                });
                if (referencedComponentGuidsSet.size) {
                    const referencedComponentGuids = Array.from(referencedComponentGuidsSet);
                    issues$ = this.viewDesignerFacade.allComponentGuids$.pipe(map((guids) => referencedComponentGuids.filter((guid) => !guids.has(guid))), distinctUntilChanged(isEqual), map((guids) => guids.map(() => ({
                        type: 'error',
                        description: 'Expression references a non-existent view component.',
                        propertyName
                    }))));
                }
            }
        }
        else {
            issues$ = of([
                {
                    type: 'error',
                    description: `${propertyLabel} must be a valid expression.`,
                    propertyName
                }
            ]);
        }
        return issues$;
    }
}
RxViewExpressionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorService, deps: [{ token: i1.RxDefaultExpressionValidatorService }, { token: i1.RxDefaultExpressionEvaluatorService }, { token: i2.RxStringService }, { token: i3.RxExpressionParserService }, { token: i4.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewExpressionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefaultExpressionValidatorService }, { type: i1.RxDefaultExpressionEvaluatorService }, { type: i2.RxStringService }, { type: i3.RxExpressionParserService }, { type: i4.ViewDesignerFacade }]; } });
//# sourceMappingURL=view-expression-validator.service.js.map