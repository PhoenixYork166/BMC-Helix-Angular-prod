import { Expression } from 'jsep';
import { RxExpressionHelperService } from './expression-helper.service';
import { RxExpressionSyntaxTreeBuilderService } from './expression-syntax-tree-builder.service';
import { IExpressionEvaluator } from './expression-evaluator.types';
import { RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxDefaultExpressionEvaluatorService implements IExpressionEvaluator {
    private rxExpressionHelperService;
    private rxStringService;
    private rxExpressionSyntaxTreeBuilderService;
    private parsedExpressionCache;
    private operators;
    private unaryOperators;
    constructor(rxExpressionHelperService: RxExpressionHelperService, rxStringService: RxStringService, rxExpressionSyntaxTreeBuilderService: RxExpressionSyntaxTreeBuilderService);
    parseExpression(expression: string): Expression;
    evaluate(expression: string, data: object): string;
    private andHandler;
    private orHandler;
    private likeHandler;
    private validateChildNodeTypes;
    private evaluateNode;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefaultExpressionEvaluatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDefaultExpressionEvaluatorService>;
}
