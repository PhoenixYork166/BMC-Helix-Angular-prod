import { DataPage } from '@helix/platform/shared/api';
import { Injectable, Injector } from '@angular/core';
import * as i0 from "@angular/core";
export class RxCustomDataSourceProviderDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.query.CustomDataSourceProviderDataPageQuery');
        this.injector = injector;
    }
}
RxCustomDataSourceProviderDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomDataSourceProviderDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxCustomDataSourceProviderDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomDataSourceProviderDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomDataSourceProviderDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=custom-data-source-provider-data-page.service.js.map