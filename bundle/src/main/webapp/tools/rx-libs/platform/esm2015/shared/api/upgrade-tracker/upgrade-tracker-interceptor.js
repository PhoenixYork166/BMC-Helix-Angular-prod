import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RxMetadataService } from '../caching/metadata.service';
import { RxUpgradeTrackerService } from './upgrade-tracker.service';
import * as i0 from "@angular/core";
import * as i1 from "../caching/metadata.service";
import * as i2 from "./upgrade-tracker.service";
export class RxUpgradeTrackerInterceptor {
    constructor(rxMetadataService, rxUpgradeTrackerService) {
        this.rxMetadataService = rxMetadataService;
        this.rxUpgradeTrackerService = rxUpgradeTrackerService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((httpEvent) => {
            const isCachedRequest = this.rxMetadataService.isMetadataRequest(request) || this.rxMetadataService.isLocalizedStringsRequest(request);
            // Exclude resource calls since they never have the upgrade-mode header in the response.
            // Exclude API calls that may be cached by browser with an outdated value of the header.
            if (!isCachedRequest && httpEvent instanceof HttpResponse && /\/api\/rx/.test(request.url)) {
                this.rxUpgradeTrackerService.isUpgradeInProgress = httpEvent.headers.has('upgrade-mode');
            }
        }));
    }
}
RxUpgradeTrackerInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerInterceptor, deps: [{ token: i1.RxMetadataService }, { token: i2.RxUpgradeTrackerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUpgradeTrackerInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxMetadataService }, { type: i2.RxUpgradeTrackerService }]; } });
//# sourceMappingURL=upgrade-tracker-interceptor.js.map