import * as i0 from "@angular/core";
export declare class RxDateUtilsService {
    private locale;
    constructor(locale: string);
    formatDate(date: string | number | Date, format: string, locale?: string): string;
    isTwelveHourClock(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDateUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDateUtilsService>;
}
