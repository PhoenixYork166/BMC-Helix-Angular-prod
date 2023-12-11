import { Injectable, Injector } from '@angular/core';
import { DataPage } from '../data-page';
import * as i0 from "@angular/core";
export class RxAdminComponentDataPageQuery extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.admin.datapage.AdminComponentDataPageQuery');
        this.injector = injector;
    }
}
RxAdminComponentDataPageQuery.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageQuery, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminComponentDataPageQuery.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageQuery, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminComponentDataPageQuery, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=config-definition-data-page.service.js.map