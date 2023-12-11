import { Injectable } from '@angular/core';
import { RxApplicationLoaderService } from './application-loader.service';
import * as i0 from "@angular/core";
import * as i1 from "./application-loader.service";
export class RxApplicationLoaderResolver {
    constructor(rxApplicationLoaderService) {
        this.rxApplicationLoaderService = rxApplicationLoaderService;
    }
    resolve(route, state) {
        this.rxApplicationLoaderService.removeApplicationLoader();
    }
}
RxApplicationLoaderResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderResolver, deps: [{ token: i1.RxApplicationLoaderService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationLoaderResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxApplicationLoaderService }]; } });
//# sourceMappingURL=application-loader.resolver.js.map