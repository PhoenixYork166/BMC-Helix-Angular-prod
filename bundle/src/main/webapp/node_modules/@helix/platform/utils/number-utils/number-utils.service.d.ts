import BigNumber from 'bignumber.js';
import * as i0 from "@angular/core";
export declare class RxNumberUtilsService {
    isFinite(value: any): value is number | BigNumber;
    isFiniteOrNumberString(value: any): value is string | number | BigNumber;
    isFiniteNumberString(value: any): value is string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNumberUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxNumberUtilsService>;
}
