import { Injectable } from '@angular/core';
import { pull } from 'lodash';
import * as i0 from "@angular/core";
export class RxRuntimeViewRegistryService {
    constructor() {
        this.activeRuntimeViews = [];
    }
    register(runtimeViewModel) {
        if (!this.activeRuntimeViews.includes(runtimeViewModel)) {
            this.activeRuntimeViews.push(runtimeViewModel);
        }
    }
    getAll() {
        return this.activeRuntimeViews;
    }
    unregister(runtimeViewModel) {
        pull(this.activeRuntimeViews, runtimeViewModel);
    }
}
RxRuntimeViewRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxRuntimeViewRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=runtime-view-registry.service.js.map