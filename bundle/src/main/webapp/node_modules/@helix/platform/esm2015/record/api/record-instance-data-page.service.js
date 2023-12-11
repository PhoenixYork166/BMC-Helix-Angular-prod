import { DataPage, RxLogService } from '@helix/platform/shared/api';
import { Injectable, Injector } from '@angular/core';
import { RX_RECORD_INSTANCE } from './record-instance.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxRecordInstanceDataPageService extends DataPage {
    constructor(injector, rxLogService) {
        super(injector, RX_RECORD_INSTANCE.dataPageQuery);
        this.injector = injector;
        this.rxLogService = rxLogService;
    }
    get(dataPageRequestConfiguration = {}) {
        this.rxLogService.warning('RxRecordInstanceDataPageService: The get() method is deprecated. Use post() instead.');
        return super.get(dataPageRequestConfiguration);
    }
}
RxRecordInstanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceDataPageService, deps: [{ token: i0.Injector }, { token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxLogService }]; } });
//# sourceMappingURL=record-instance-data-page.service.js.map