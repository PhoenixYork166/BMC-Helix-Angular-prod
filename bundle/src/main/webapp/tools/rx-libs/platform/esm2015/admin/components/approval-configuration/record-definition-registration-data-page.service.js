import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const recordDefinitionRegistrationDataPageQuery = 'com.bmc.arsys.rx.approval.application.datapage.RecordDefinitionRegistrationDataPageQuery';
export class RxRecordDefinitionRegistrationDataPageService extends DataPage {
    constructor(injector) {
        super(injector, recordDefinitionRegistrationDataPageQuery);
        this.injector = injector;
    }
}
RxRecordDefinitionRegistrationDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionRegistrationDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionRegistrationDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionRegistrationDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionRegistrationDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=record-definition-registration-data-page.service.js.map