import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { RxSessionService } from '../security/session.service';
import * as i0 from "@angular/core";
import * as i1 from "../caching/global-cache.service";
import * as i2 from "@angular/router";
import * as i3 from "../security/session.service";
export class RxValidApplicationGuard {
    constructor(rxGlobalCacheService, router, rxSessionService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
        this.rxSessionService = rxSessionService;
        this.unknownApplicationUrlTree = this.router.parseUrl('/unknown-application');
    }
    canActivate(route, state) {
        return this.rxSessionService.sessionActive$.pipe(switchMap(() => this.checkBundleState(route)));
    }
    checkBundleState(route) {
        const bundleId = route.paramMap.get('bundleId');
        if (bundleId) {
            return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => bundleDescriptor.isApplication || this.unknownApplicationUrlTree), catchError(() => of(this.unknownApplicationUrlTree)));
        }
        else {
            return of(this.unknownApplicationUrlTree);
        }
    }
}
RxValidApplicationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidApplicationGuard, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.Router }, { token: i3.RxSessionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxValidApplicationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidApplicationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidApplicationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.Router }, { type: i3.RxSessionService }]; } });
//# sourceMappingURL=valid-application.guard.js.map