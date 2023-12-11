import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { RxLocalizationService } from '../localization';
import { RX_SESSION } from '../security/session.constant';
import * as i0 from "@angular/core";
import * as i1 from "../localization";
import * as i2 from "@angular/router";
export class RxLoginPageGuard {
    constructor(rxLocalizationService, router) {
        this.rxLocalizationService = rxLocalizationService;
        this.router = router;
    }
    canActivate(next, state) {
        return this.rxLocalizationService.loginLocalizedStrings$.pipe(map((response) => {
            const ssoProviderType = response.headers.get('sso-provider-type');
            if (ssoProviderType === RX_SESSION.ssoProviderTypes.rsso) {
                const bundleId = next.paramMap.get('bundleId');
                return this.router.parseUrl(bundleId);
            }
            else {
                return true;
            }
        }));
    }
}
RxLoginPageGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginPageGuard, deps: [{ token: i1.RxLocalizationService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
RxLoginPageGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginPageGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoginPageGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLocalizationService }, { type: i2.Router }]; } });
//# sourceMappingURL=login-page.guard.js.map