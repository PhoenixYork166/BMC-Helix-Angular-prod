import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const recordDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.record.datapage.RecordDefinitionInheritanceDataPageQuery';
export class RxRecordDefinitionInheritanceDataPageService extends DataPage {
    constructor(injector) {
        super(injector, recordDefinitionDataPageQuery);
        this.injector = injector;
    }
}
RxRecordDefinitionInheritanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionInheritanceDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionInheritanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionInheritanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionInheritanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=record-definition-inheritance-data-page.service.js.map