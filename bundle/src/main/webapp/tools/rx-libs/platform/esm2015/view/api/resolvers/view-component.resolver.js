import { Injectable } from '@angular/core';
import { RxViewComponentRegistryService } from '../registries/view-component-registry.service';
import * as i0 from "@angular/core";
import * as i1 from "../registries/view-component-registry.service";
export class RxViewComponentResolver {
    constructor(rxViewComponentRegistryService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
    }
    resolve() {
        return this.rxViewComponentRegistryService.resolveAsyncDescriptors();
    }
}
RxViewComponentResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentResolver, deps: [{ token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewComponentResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewComponentResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=view-component.resolver.js.map