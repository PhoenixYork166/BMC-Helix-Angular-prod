import { IExpressionEvaluator, RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxRichTextExpressionEvaluatorService implements IExpressionEvaluator {
    private rxDefaultExpressionEvaluatorService;
    constructor(rxDefaultExpressionEvaluatorService: RxDefaultExpressionEvaluatorService);
    evaluate(expression: string, data: object): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRichTextExpressionEvaluatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRichTextExpressionEvaluatorService>;
}
