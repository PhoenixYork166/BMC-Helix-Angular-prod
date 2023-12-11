import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxCallActivityRegistryService {
    constructor() {
        this.callActivityDescriptors = new Map();
    }
    getRegisteredCallActivities() {
        return this.callActivityDescriptors.values();
    }
    register(...callActivityDescriptors) {
        callActivityDescriptors.forEach((descriptor) => {
            this.callActivityDescriptors.set(descriptor.processDefinitionName, descriptor);
        });
    }
}
RxCallActivityRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCallActivityRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCallActivityRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCallActivityRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCallActivityRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=call-activity-registry.service.js.map