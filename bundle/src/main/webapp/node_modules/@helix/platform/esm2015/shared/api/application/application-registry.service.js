import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "../caching/global-cache.service";
export class RxApplicationRegistryService {
    constructor(rxGlobalCacheService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    register(applicationId, initializer) {
        this.rxGlobalCacheService
            .getApplicationBundleDescriptor()
            .pipe(take(1))
            .subscribe((bundleDescriptor) => {
            if ((bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.id) === applicationId) {
                initializer.initialize();
            }
        });
    }
}
RxApplicationRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationRegistryService, deps: [{ token: i1.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }]; } });
//# sourceMappingURL=application-registry.service.js.map