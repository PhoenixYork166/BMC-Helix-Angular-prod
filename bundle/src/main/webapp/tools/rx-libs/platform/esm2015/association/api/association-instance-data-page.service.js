import { Injectable, Injector } from '@angular/core';
import { DataPage, RxLogService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
const associationInstanceDataPageQuery = 'com.bmc.arsys.rx.application.association.datapage.AssociationInstanceDataPageQuery';
export class RxAssociationInstanceDataPageService extends DataPage {
    constructor(injector, rxLogService) {
        super(injector, associationInstanceDataPageQuery);
        this.injector = injector;
        this.rxLogService = rxLogService;
    }
    get(dataPageRequestConfiguration = {}) {
        this.rxLogService.warning('RxAssociationInstanceDataPageService: The get() method is deprecated. Use post() instead.');
        return super.get(dataPageRequestConfiguration);
    }
}
RxAssociationInstanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceDataPageService, deps: [{ token: i0.Injector }, { token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationInstanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxLogService }]; } });
//# sourceMappingURL=association-instance-data-page.service.js.map