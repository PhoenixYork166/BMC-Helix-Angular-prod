import * as i0 from "@angular/core";
export interface IExtractedTokens {
    matches: RegExpMatchArray;
    expression: string;
}
export declare class RxExpressionHelperService {
    prepareHandlers: Array<(expression: string) => string>;
    constructor();
    extractTokens(regex: RegExp, key: string, expression: string): IExtractedTokens;
    insertTokens(matches: RegExpMatchArray | null, key: string, expression: string): string;
    prepare(expression: string): string;
    prepareOperators(expression: string): string;
    private insertLiteralExpressions;
    private insertExpressions;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExpressionHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxExpressionHelperService>;
}
