import { Injectable, Injector } from '@angular/core';
import { DataPage } from '../data-page/data-page.class';
import * as i0 from "@angular/core";
const groupDataPageQuery = 'com.bmc.arsys.rx.application.group.datapage.GroupDataPageQuery';
export class RxGroupDataPageService extends DataPage {
    constructor(injector) {
        super(injector, groupDataPageQuery);
        this.injector = injector;
    }
}
RxGroupDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGroupDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxGroupDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGroupDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGroupDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=group-data-page.service.js.map