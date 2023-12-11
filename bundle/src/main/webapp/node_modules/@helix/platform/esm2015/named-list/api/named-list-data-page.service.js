import { Injectable, Injector } from '@angular/core';
import { DataPage, RxLogService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxNamedListDataPageService extends DataPage {
    constructor(injector, rxLogService) {
        super(injector, 'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDataPageQuery');
        this.rxLogService = rxLogService;
    }
    get(dataPageRequestConfiguration = {}) {
        this.rxLogService.warning('RxNamedListDataPageService: The get() method is deprecated. Use post() instead.');
        return super.get(dataPageRequestConfiguration);
    }
}
RxNamedListDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDataPageService, deps: [{ token: i0.Injector }, { token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxLogService }]; } });
//# sourceMappingURL=named-list-data-page.service.js.map