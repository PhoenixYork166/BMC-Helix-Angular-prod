import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { truncate } from 'lodash';
import { RxLogService } from '../logging/log.service';
import { RxNotificationService } from '../notification/notification.service';
import { RX_ERROR_HANDLING } from './error-handling.constant';
import * as i0 from "@angular/core";
import * as i1 from "../notification/notification.service";
import * as i2 from "../logging/log.service";
import * as i3 from "@ngx-translate/core";
export class RxScriptErrorHandler {
    constructor(rxNotificationService, rxLogService, translateService) {
        this.rxNotificationService = rxNotificationService;
        this.rxLogService = rxLogService;
        this.translateService = translateService;
    }
    handle(error) {
        const rxErrorMessage = truncate(`${this.translateService.instant('com.bmc.arsys.rx.client.error-handling.script-error.message')} ${error.message}`, {
            length: RX_ERROR_HANDLING.maxErrorMessageLength
        });
        this.rxNotificationService.addErrorMessage(rxErrorMessage, this.translateService.instant('com.bmc.arsys.rx.client.error-handling.script-error.title'), {
            suppressLog: true
        });
        this.rxLogService.error(error.stack);
    }
}
RxScriptErrorHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxScriptErrorHandler, deps: [{ token: i1.RxNotificationService }, { token: i2.RxLogService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxScriptErrorHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxScriptErrorHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxScriptErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.RxLogService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=script-error-handler.service.js.map