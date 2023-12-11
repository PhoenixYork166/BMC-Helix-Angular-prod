import { Injectable } from '@angular/core';
import { RxCurrentUserService } from '../../user/current-user.service';
import { RxMetadataService } from '../metadata.service';
import { RxBundleCacheService } from '../bundle-cache.service';
import { RxLocalizationService } from '../../localization/localization.service';
import * as i0 from "@angular/core";
import * as i1 from "../bundle-cache.service";
import * as i2 from "../metadata.service";
import * as i3 from "../../user/current-user.service";
import * as i4 from "../../localization/localization.service";
export class RxMetadataRequestInterceptor {
    constructor(bundleCacheService, rxMetadataService, rxCurrentUserService, rxLocalizationService) {
        this.bundleCacheService = bundleCacheService;
        this.rxMetadataService = rxMetadataService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxLocalizationService = rxLocalizationService;
    }
    intercept(request, next) {
        const isLocalizedStringsRequest = this.rxMetadataService.isLocalizedStringsRequest(request);
        const isMetadataDataPageQueryRequest = this.rxMetadataService.isMetadataDataPageQueryRequest(request);
        const isMetadataRequest = this.rxMetadataService.isMetadataRequest(request);
        if (isMetadataRequest || isLocalizedStringsRequest) {
            const user = this.rxCurrentUserService.get();
            const metaDataLastUpdateTime = this.rxMetadataService.getMetadataLastUpdateTime();
            let params;
            // duplicate the 'default-bundle-scope' request header as a request parameter
            // in order to have a separate cache for requests with different bundle scope
            const bundleId = isMetadataDataPageQueryRequest
                ? request.headers.get('default-bundle-scope')
                : this.bundleCacheService.bundleId;
            if (isMetadataDataPageQueryRequest && bundleId) {
                request = request.clone({
                    params: request.params.set('bundleId', bundleId)
                });
            }
            if (metaDataLastUpdateTime) {
                const cacheKey = [
                    user.userId,
                    user.modifiedDate.getTime(),
                    metaDataLastUpdateTime.getTime(),
                    this.rxLocalizationService.currentLocale
                ].join('');
                params = request.params.append('_v', cacheKey);
                request = request.clone({
                    headers: request.headers.delete('Cache-Control').delete('Pragma').delete('If-Modified-Since'),
                    params: params
                });
            }
        }
        return next.handle(request);
    }
}
RxMetadataRequestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataRequestInterceptor, deps: [{ token: i1.RxBundleCacheService }, { token: i2.RxMetadataService }, { token: i3.RxCurrentUserService }, { token: i4.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxMetadataRequestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataRequestInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataRequestInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxBundleCacheService }, { type: i2.RxMetadataService }, { type: i3.RxCurrentUserService }, { type: i4.RxLocalizationService }]; } });
//# sourceMappingURL=metadata-request.interceptor.js.map