import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxDefinitionAdapterRegistryService {
    constructor() {
        this.runtimeAdapters = new Map();
        this.designAdapters = new Map();
    }
    registerRuntimeAdapter(type, adapter) {
        this.runtimeAdapters.set(type, adapter);
    }
    registerDesignAdapter(type, adapter) {
        this.designAdapters.set(type, adapter);
    }
    getRuntimeAdapter(type) {
        return this.runtimeAdapters.get(type);
    }
    getDesignAdapter(type) {
        return this.designAdapters.get(type);
    }
}
RxDefinitionAdapterRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionAdapterRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionAdapterRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionAdapterRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionAdapterRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=definition-adapter-registry.service.js.map