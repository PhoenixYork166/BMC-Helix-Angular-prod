import { Injectable } from '@angular/core';
import { RxModalService } from './modal.service';
import { RX_MODAL } from './modal.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./modal.service";
import * as i2 from "@ngx-translate/core";
export class RxUtilityModalsService {
    constructor(rxModalService, translateService) {
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.confirmationResult = null;
    }
    confirmExternalChange(message) {
        return this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: `${message} ${this.translateService.instant('com.bmc.arsys.rx.client.common.continue-confirmation.message')}`
        });
    }
    confirm(message, title = this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'), style = RX_MODAL.modalStyles.warning) {
        return this.rxModalService.confirm({
            title,
            modalStyle: style,
            message
        });
    }
    confirmUnsavedChanges() {
        // allow to open only one confirmation dialog
        if (!this.confirmationResult) {
            this.confirmationResult = this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.common.unsaved-data.message')
            }, false)
                .then((result) => {
                this.confirmationResult = null;
                return result;
            });
        }
        return this.confirmationResult;
    }
}
RxUtilityModalsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUtilityModalsService, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUtilityModalsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUtilityModalsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUtilityModalsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=utility-modals.service.js.map