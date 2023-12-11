import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxLocalizedStringsLoaderService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = '/api/rx/application/localizedstrings';
    }
    getTranslation(locale) {
        return locale === 'login' ? of({}) : this.httpClient.get(`${this.baseUrl}?locale=${locale}`);
    }
    uploadTranslation(bundleId, locale, translations) {
        return this.httpClient.post(`${this.baseUrl}/${bundleId}?locale=${locale}`, translations);
    }
}
RxLocalizedStringsLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedStringsLoaderService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocalizedStringsLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedStringsLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedStringsLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=localized-strings-loader.service.js.map