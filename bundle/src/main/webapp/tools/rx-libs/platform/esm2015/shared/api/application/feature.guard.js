import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RxFeatureService } from '../services/feature/feature.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/feature/feature.service";
export class RxFeatureGuard {
    constructor(rxFeatureService) {
        this.rxFeatureService = rxFeatureService;
    }
    canActivate(route, state) {
        return of(this.rxFeatureService.isFeatureEnabled(route.data['featureId']));
    }
}
RxFeatureGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureGuard, deps: [{ token: i1.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFeatureGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxFeatureService }]; } });
//# sourceMappingURL=feature.guard.js.map