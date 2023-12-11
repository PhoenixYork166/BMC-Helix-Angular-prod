import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { map } from 'rxjs/operators';
import { RxFeatureService } from '../services/feature/feature.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../services/feature/feature.service";
import * as i3 from "@angular/router";
import * as i4 from "@helix/platform/utils";
export class RxUserService {
    constructor(httpClient, rxFeatureService, router, rxUrlUtilsService) {
        this.httpClient = httpClient;
        this.rxFeatureService = rxFeatureService;
        this.router = router;
        this.rxUrlUtilsService = rxUrlUtilsService;
    }
    getUser(id, bundleId) {
        return this.httpClient
            .get(`/api/rx/application/user/${id}`, {
            headers: new HttpHeaders({
                'default-bundle-scope': bundleId !== null && bundleId !== void 0 ? bundleId : ''
            }),
            observe: 'response'
        })
            .pipe(map((response) => {
            this.rxFeatureService.enableFeatures((response.headers.get('Enabled-Features') || '').split(','));
            return Object.assign(Object.assign({}, response.body), { modifiedDate: new Date(response.body.modifiedDate), ssoProviderType: response.headers.get('sso-provider-type') });
        }));
    }
    getCurrentUser() {
        return this.getUser('$USER$', this.rxUrlUtilsService.getBundleIdFromUrl());
    }
}
RxUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserService, deps: [{ token: i1.HttpClient }, { token: i2.RxFeatureService }, { token: i3.Router }, { token: i4.RxUrlUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxFeatureService }, { type: i3.Router }, { type: i4.RxUrlUtilsService }]; } });
//# sourceMappingURL=user.service.js.map