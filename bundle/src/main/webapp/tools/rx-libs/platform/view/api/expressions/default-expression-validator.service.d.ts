import { RxDefaultExpressionEvaluatorService } from './default-expression-evaluator.service';
import { RxExpressionHelperService } from './expression-helper.service';
import { IExpressionValidator } from './expression-validator.interface';
import { RxStringService } from '@helix/platform/utils';
import { IExpressionEvaluator } from './expression-evaluator.types';
import * as i0 from "@angular/core";
export declare class RxDefaultExpressionValidatorService implements IExpressionValidator {
    private rxStringService;
    private rxDefaultExpressionEvaluatorService;
    private rxExpressionHelperService;
    constructor(rxStringService: RxStringService, rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService, rxExpressionHelperService: RxExpressionHelperService);
    isValid(expression: string, customEvaluatorService?: IExpressionEvaluator): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefaultExpressionValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDefaultExpressionValidatorService>;
}
