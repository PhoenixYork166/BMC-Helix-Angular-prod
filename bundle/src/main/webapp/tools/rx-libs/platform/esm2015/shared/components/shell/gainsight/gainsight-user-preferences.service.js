import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RxFeatureService } from '@helix/platform/shared/api';
import { RX_GAINSIGHT } from './gainsight.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
export class RxGainsightUserPreferencesService {
    constructor(httpClient, rxFeatureService) {
        this.httpClient = httpClient;
        this.rxFeatureService = rxFeatureService;
    }
    getGainsightUserPreferences() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            return this.httpClient.get(RX_GAINSIGHT.gainsightUserPreferencesApi);
        }
        else {
            return of(null);
        }
    }
    saveGainsightUserPreferences(gainsightUserPreferences) {
        return this.httpClient.put(RX_GAINSIGHT.gainsightUserPreferencesApi, gainsightUserPreferences);
    }
}
RxGainsightUserPreferencesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightUserPreferencesService, deps: [{ token: i1.HttpClient }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxGainsightUserPreferencesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightUserPreferencesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightUserPreferencesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxFeatureService }]; } });
//# sourceMappingURL=gainsight-user-preferences.service.js.map