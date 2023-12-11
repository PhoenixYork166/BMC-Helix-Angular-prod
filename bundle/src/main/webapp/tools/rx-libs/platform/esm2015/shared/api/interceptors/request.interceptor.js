import { Injectable } from '@angular/core';
import { RX_APPLICATION } from '../application';
import { RxBundleCacheService } from '../caching/bundle-cache.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "../caching/bundle-cache.service";
import * as i2 from "../caching/global-cache.service";
export class RxRequestInterceptor {
    constructor(rxBundleCacheService, rxGlobalCacheService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    intercept(request, next) {
        const bundleId = this.rxBundleCacheService.bundleId;
        const applicationId = this.rxGlobalCacheService.applicationId;
        // LMA:: Check if those headers are still necessary. Test with IE11.
        request = request.clone({
            headers: request.headers
                .set('X-Requested-By', 'XMLHttpRequest')
                .set('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT')
                .set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache')
        });
        if (bundleId && !request.headers.has('default-bundle-scope')) {
            request = request.clone({
                headers: request.headers.set('default-bundle-scope', bundleId)
            });
        }
        if (applicationId === RX_APPLICATION.innovationStudioBundleId) {
            request = request.clone({
                headers: request.headers.set('Design-Time', 'true')
            });
        }
        return next.handle(request);
    }
}
RxRequestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRequestInterceptor, deps: [{ token: i1.RxBundleCacheService }, { token: i2.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRequestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRequestInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRequestInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxBundleCacheService }, { type: i2.RxGlobalCacheService }]; } });
//# sourceMappingURL=request.interceptor.js.map