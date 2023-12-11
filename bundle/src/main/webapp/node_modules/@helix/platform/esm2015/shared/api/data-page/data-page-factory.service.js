import { DataPage } from './data-page.class';
import { Injectable, Injector } from '@angular/core';
import * as i0 from "@angular/core";
export class RxDataPageFactoryService {
    constructor(injector) {
        this.injector = injector;
    }
    withType(dataPageType, defaultDataPageRequestConfiguration) {
        return new DataPage(this.injector, dataPageType, defaultDataPageRequestConfiguration);
    }
}
RxDataPageFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataPageFactoryService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxDataPageFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataPageFactoryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataPageFactoryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=data-page-factory.service.js.map