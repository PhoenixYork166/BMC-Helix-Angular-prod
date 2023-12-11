import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../caching/global-cache.service";
export class RxPreviousStateService {
    constructor(router, rxGlobalCacheService) {
        this.router = router;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.currentUrl = this.router.url;
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }
    goToPrevState() {
        if (this.previousUrl &&
            this.previousUrl !== this.currentUrl &&
            this.previousUrl !== `${this.rxGlobalCacheService.applicationId}/login`) {
            this.router.navigateByUrl(this.previousUrl);
        }
        else {
            this.router.navigate([this.rxGlobalCacheService.applicationId]);
        }
    }
}
RxPreviousStateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPreviousStateService, deps: [{ token: i1.Router }, { token: i2.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxPreviousStateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPreviousStateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPreviousStateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxGlobalCacheService }]; } });
//# sourceMappingURL=previous-state.service.js.map