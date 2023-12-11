import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { RxRecordInstanceDataPageService } from './record-instance-data-page.service';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./record-instance-data-page.service";
export class RxLocaleService {
    constructor(rxRecordInstanceDataPageService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    getLocales() {
        if (!this.locales) {
            this.locales = this.rxRecordInstanceDataPageService
                .post({
                params: {
                    recorddefinition: RX_RECORD_DEFINITION.supportedSystemLocales.recordDefinitionName,
                    propertySelection: [
                        RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId,
                        RX_RECORD_DEFINITION.supportedSystemLocales.codeFieldId
                    ].join(','),
                    sortBy: RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId
                }
            })
                .pipe(shareReplay(1));
        }
        return this.locales;
    }
}
RxLocaleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocaleService, deps: [{ token: i1.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocaleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocaleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocaleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=locale.service.js.map