import { IReplaceExpressionValueFunc } from './expression-parser.types';
import { IExpressionOperator } from '../expression-configurator';
import * as i0 from "@angular/core";
export declare class RxExpressionParserService {
    private readonly tokenRegExpMap;
    parse(expression: string, replaceFunc: IReplaceExpressionValueFunc, operators?: IExpressionOperator[]): string;
    stripSpaces(expression: string): string;
    private extractExpressionValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExpressionParserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxExpressionParserService>;
}
