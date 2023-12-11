import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxViewActionDefinitionAdapterRegistryService {
    constructor() {
        this.runtimeAdapters = new Map();
        this.designAdapters = new Map();
    }
    registerRuntimeAdapter(actionName, adapter) {
        this.runtimeAdapters.set(actionName, adapter);
    }
    registerDesignAdapter(actionName, adapter) {
        this.designAdapters.set(actionName, adapter);
    }
    getRuntimeAdapter(actionName) {
        return this.runtimeAdapters.get(actionName);
    }
    getDesignAdapter(actionName) {
        return this.designAdapters.get(actionName);
    }
}
RxViewActionDefinitionAdapterRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDefinitionAdapterRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionDefinitionAdapterRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDefinitionAdapterRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionDefinitionAdapterRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=view-action-definition-adapter-registry.service.js.map