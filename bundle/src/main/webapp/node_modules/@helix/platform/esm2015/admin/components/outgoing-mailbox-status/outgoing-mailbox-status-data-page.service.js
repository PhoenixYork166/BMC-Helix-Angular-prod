import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const dataPageQuery = 'com.bmc.arsys.rx.application.email.datapage.OutgoingEmailMessageStatusDataPageQuery';
export class RxOutgoingMailboxStatusDataPageService extends DataPage {
    constructor(injector) {
        super(injector, dataPageQuery);
        this.injector = injector;
    }
}
RxOutgoingMailboxStatusDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOutgoingMailboxStatusDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxOutgoingMailboxStatusDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOutgoingMailboxStatusDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOutgoingMailboxStatusDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=outgoing-mailbox-status-data-page.service.js.map