import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxFeatureService {
    enableFeatures(featureIds) {
        this.enabledFeatures = featureIds;
    }
    isFeatureEnabled(featureId) {
        if (this.enabledFeatures) {
            return this.enabledFeatures.includes(featureId);
        }
    }
}
RxFeatureService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxFeatureService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFeatureService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=feature.service.js.map