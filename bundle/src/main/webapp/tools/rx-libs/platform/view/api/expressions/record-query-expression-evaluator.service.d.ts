import { RxStringService } from '@helix/platform/utils';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { IExpressionEvaluator } from './expression-evaluator.types';
import { RxDefaultExpressionEvaluatorService } from './default-expression-evaluator.service';
import { RxExpressionHelperService } from './expression-helper.service';
import * as i0 from "@angular/core";
export declare class RxRecordQueryExpressionEvaluatorService implements IExpressionEvaluator {
    private rxDefaultExpressionEvaluatorService;
    private rxExpressionHelper;
    private rxStringService;
    private rxRecordInstanceUtilsService;
    private viewRegExp;
    private stringMatchingRegExp;
    private rxStringsExpressionData;
    private rxExpressionsData;
    private arRecordAssociationFilterExpressionData;
    private associationExpressionRegExp;
    private rxOperatorCounter;
    private rxViewExpressionCounter;
    private rxStringExpressionCounter;
    private rxAssociationFilterExpressionCounter;
    constructor(rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService, rxExpressionHelper: RxExpressionHelperService, rxStringService: RxStringService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService);
    evaluate(expression: string, data: object): string;
    private evaluateOperand;
    private evaluateRxViewExpressions;
    private evaluateRxStringExpressions;
    private prepareRxAssociationFilterExpressions;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordQueryExpressionEvaluatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordQueryExpressionEvaluatorService>;
}
