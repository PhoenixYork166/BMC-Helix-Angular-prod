import * as i0 from "@angular/core";
export declare class RxStringService {
    prettify(value: string): string;
    isNonEmptyString(str: any): boolean;
    isEmptySafe(string: string): boolean;
    toRxId(str: string): string;
    escapeRegExp(text: string): string;
    caseInsensitiveSearch(searchIn: string, searchFor: string): boolean;
    caseInsensitiveIsEqual(stringInitial: string, stringToCompare: string): boolean;
    decodeQ(qEncodedString: string): string;
    isIncluded(str: string, array: Array<string | RegExp>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxStringService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxStringService>;
}
