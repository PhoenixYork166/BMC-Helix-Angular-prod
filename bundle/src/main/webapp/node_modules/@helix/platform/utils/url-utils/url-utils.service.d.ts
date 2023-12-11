import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class RxUrlUtilsService {
    private router;
    private domSanitizer;
    constructor(router: Router, domSanitizer: DomSanitizer);
    buildUrl(baseUrl: string, ...queryParams: Object[]): string;
    isValidUrl(url: string, isProtocolRequired?: boolean): boolean;
    toQueryString(...queryParams: Object[]): string;
    getBundleIdFromUrl(url?: string): string;
    isUrlSafe(url: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUrlUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUrlUtilsService>;
}
