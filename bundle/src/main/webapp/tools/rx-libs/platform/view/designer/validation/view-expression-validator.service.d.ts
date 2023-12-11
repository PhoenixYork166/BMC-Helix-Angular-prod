import { IExpressionEvaluator, RxDefaultExpressionEvaluatorService, RxDefaultExpressionValidatorService } from '@helix/platform/view/api';
import { RxStringService } from '@helix/platform/utils';
import { Observable } from 'rxjs';
import { RxExpressionParserService } from '@helix/platform/shared/api';
import { IViewComponentDesignValidationIssue } from '../public-interfaces/view-component-design-validation-issue.interface';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import * as i0 from "@angular/core";
export declare class RxViewExpressionValidatorService {
    private rxDefaultExpressionValidatorService;
    private rxDefaultExpressionEvaluatorService;
    private rxStringService;
    private rxExpressionParserService;
    private viewDesignerFacade;
    constructor(rxDefaultExpressionValidatorService: RxDefaultExpressionValidatorService, rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService, rxStringService: RxStringService, rxExpressionParserService: RxExpressionParserService, viewDesignerFacade: ViewDesignerFacade);
    validate(expression: string, propertyName: string, propertyLabel?: string, expressionEvaluator?: IExpressionEvaluator): Observable<IViewComponentDesignValidationIssue[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewExpressionValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewExpressionValidatorService>;
}
