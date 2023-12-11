import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocalizedStrings } from './localization.types';
import * as i0 from "@angular/core";
export declare class RxLocalizedStringsLoaderService {
    private httpClient;
    baseUrl: string;
    constructor(httpClient: HttpClient);
    getTranslation(locale: string): Observable<ILocalizedStrings>;
    uploadTranslation(bundleId: string, locale: string, translations: Object): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLocalizedStringsLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLocalizedStringsLoaderService>;
}
