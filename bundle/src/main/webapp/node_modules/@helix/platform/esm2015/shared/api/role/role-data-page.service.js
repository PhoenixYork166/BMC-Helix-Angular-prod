import { Injectable, Injector } from '@angular/core';
import { DataPage } from '../data-page/data-page.class';
import * as i0 from "@angular/core";
const roleDataPageQuery = 'com.bmc.arsys.rx.application.role.datapage.RoleDataPageQuery';
export class RxRoleDataPageService extends DataPage {
    constructor(injector) {
        super(injector, roleDataPageQuery);
        this.injector = injector;
    }
}
RxRoleDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRoleDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRoleDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRoleDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRoleDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=role-data-page.service.js.map