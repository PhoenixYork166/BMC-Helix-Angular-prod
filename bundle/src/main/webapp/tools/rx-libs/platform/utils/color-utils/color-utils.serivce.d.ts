import * as i0 from "@angular/core";
export declare class RxColorUtilsService {
    private rgbColorRegex;
    normalize(color: string): string | null;
    isSameColor(color1: string, color2: string): boolean;
    private rgbToHex;
    private isValidColor;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxColorUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxColorUtilsService>;
}
