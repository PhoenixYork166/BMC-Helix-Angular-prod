import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { RxGlobalCacheService, RxLogService, RxSessionService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@angular/router";
export class AxValidBundleGuard {
    constructor(rxGlobalCacheService, router, rxSessionService, rxLogService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
        this.rxSessionService = rxSessionService;
        this.rxLogService = rxLogService;
        this.defaultUrlTree = this.router.parseUrl('/innovationstudio');
    }
    canActivate(route, state) {
        return this.rxSessionService.sessionActive$.pipe(switchMap(() => this.checkBundleState(route)));
    }
    checkBundleState(route) {
        const bundleId = route.paramMap.get('bundleId');
        return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => {
            if (!bundleDescriptor) {
                this.rxLogService.warning(`Invalid bundle ID: ${bundleId}. Redirecting to home page.`);
                return this.defaultUrlTree;
            }
            return true;
        }));
    }
}
/** @nocollapse */ AxValidBundleGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxValidBundleGuard, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.Router }, { token: i1.RxSessionService }, { token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxValidBundleGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxValidBundleGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxValidBundleGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.Router }, { type: i1.RxSessionService }, { type: i1.RxLogService }]; } });
//# sourceMappingURL=valid-bundle.guard.js.map