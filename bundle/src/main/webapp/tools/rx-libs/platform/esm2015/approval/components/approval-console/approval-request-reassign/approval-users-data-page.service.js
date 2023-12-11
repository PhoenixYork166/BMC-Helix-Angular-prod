import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class RxApprovalUsersDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.approval.application.datapage.ApprovalUsersDataPageQuery');
        this.injector = injector;
    }
}
RxApprovalUsersDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalUsersDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalUsersDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalUsersDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalUsersDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=approval-users-data-page.service.js.map