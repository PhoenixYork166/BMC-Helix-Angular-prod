import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { head } from 'lodash';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RX_APPLICATION } from '../application/application.constant';
import { RxCurrentUserService } from '../user/current-user.service';
import { RxAuthService } from './auth.service';
import { RX_SESSION } from './session.constant';
import { RxSessionService } from './session.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./auth.service";
import * as i3 from "./session.service";
import * as i4 from "../user/current-user.service";
import * as i5 from "../caching/global-cache.service";
export class RxAuthGuard {
    constructor(router, rxAuthService, rxSessionService, rxCurrentUserService, rxGlobalCacheService) {
        this.router = router;
        this.rxAuthService = rxAuthService;
        this.rxSessionService = rxSessionService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    canActivate(next, state) {
        return this.rxSessionService.initSession().pipe(map(() => {
            const applicationId = head(next.url).path;
            if (applicationId === RX_APPLICATION.innovationStudioBundleId &&
                !(this.rxCurrentUserService.isAdministrator() || this.rxCurrentUserService.isBusinessAnalyst())) {
                this.rxGlobalCacheService.applicationId = RX_APPLICATION.innovationStudioBundleId;
                return this.router.parseUrl('access-denied');
            }
            return true;
        }), catchError((error) => {
            if (error.headers.get('sso-provider-type') === RX_SESSION.ssoProviderTypes.rsso) {
                this.router.navigate(['unsupported-environment']);
                return EMPTY;
            }
            this.rxAuthService.redirectToLoginPage();
            return EMPTY;
        }));
    }
}
RxAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthGuard, deps: [{ token: i1.Router }, { token: i2.RxAuthService }, { token: i3.RxSessionService }, { token: i4.RxCurrentUserService }, { token: i5.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxAuthService }, { type: i3.RxSessionService }, { type: i4.RxCurrentUserService }, { type: i5.RxGlobalCacheService }]; } });
//# sourceMappingURL=auth.guard.js.map