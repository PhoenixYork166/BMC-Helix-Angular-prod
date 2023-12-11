import { Injectable } from '@angular/core';
import { AdaptDockedPanelService, AdaptModalService, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalComponent } from './modal.component';
import { RX_MODAL } from './modal.constant';
import { constant, some, toArray } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
export class RxModalService {
    constructor(adaptModalService, translateService, adaptDockedPanelService) {
        this.adaptModalService = adaptModalService;
        this.translateService = translateService;
        this.adaptDockedPanelService = adaptDockedPanelService;
    }
    isAnyDockedPanelDirty() {
        return some(this.adaptDockedPanelService.openedPanels, (dockedPanelInstance) => { var _a, _b; return (_b = (_a = dockedPanelInstance.contentInstanceRef) === null || _a === void 0 ? void 0 : _a.isDirty) === null || _b === void 0 ? void 0 : _b.call(_a); });
    }
    isAnyModalDirty() {
        return some(toArray(this.adaptModalService.openedModals.values()), (modalRef) => { var _a, _b; return (_b = (_a = modalRef.instance.contentInstanceRef) === null || _a === void 0 ? void 0 : _a.isDirty) === null || _b === void 0 ? void 0 : _b.call(_a); });
    }
    confirm(modalConfig, allowDismiss = true) {
        this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label'), this.translateService.instant('com.bmc.arsys.rx.client.common.no.label'));
        return this.adaptModalService
            .open({
            content: RxModalComponent,
            data: { modalType: RX_MODAL.modalTypes.confirm, modalConfig },
            type: modalConfig.modalStyle,
            isDialog: true,
            beforeDismiss: () => allowDismiss
        })
            .then((result) => result === true)
            .catch(constant(false));
    }
    alert(modalConfig) {
        this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.ok.label'));
        return this.adaptModalService.open({
            content: RxModalComponent,
            data: { modalType: RX_MODAL.modalTypes.alert, modalConfig },
            type: modalConfig.modalStyle,
            isDialog: true
        });
    }
    prompt(modalConfig) {
        this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.ok.label'), this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'));
        return this.adaptModalService
            .open({
            content: RxModalComponent,
            data: { modalType: RX_MODAL.modalTypes.prompt, modalConfig },
            type: modalConfig.modalStyle
        })
            .then((result) => {
            return (result === null || result === void 0 ? void 0 : result.response) ? result : { response: false };
        })
            .catch(constant({
            response: false
        }));
    }
    setButtons(modalConfig, confirmButton, dismissButton) {
        if (modalConfig.buttons) {
            modalConfig.buttons.confirmButton = modalConfig.buttons.confirmButton || confirmButton;
            modalConfig.buttons.dismissButton = modalConfig.buttons.dismissButton || dismissButton;
        }
        else {
            modalConfig.buttons = {
                confirmButton,
                dismissButton
            };
        }
    }
    open(config, isModal) {
        var _a;
        let api = null;
        const onApiReady = (_a = config.data) === null || _a === void 0 ? void 0 : _a.onApiReady;
        const updatedConfig = Object.assign(Object.assign({}, config), { data: Object.assign(Object.assign({}, config.data), { onApiReady: (dialogApi) => {
                    onApiReady === null || onApiReady === void 0 ? void 0 : onApiReady(dialogApi);
                    api = dialogApi;
                } }), beforeDismiss: (reason) => {
                const canClose = !Object.values(DismissReasons).includes(reason);
                if (!canClose) {
                    api === null || api === void 0 ? void 0 : api.dismissDialog();
                }
                return canClose;
            } });
        const result = isModal
            ? this.adaptModalService.open(updatedConfig)
            : this.adaptDockedPanelService.open(updatedConfig);
        return result.then((data) => {
            api = null;
            return data;
        }, (reason) => {
            api = null;
            return Promise.reject(reason);
        });
    }
    /**
     * @deprecated The method is deprecated, use openModal instead
     */
    openDialog(config) {
        return this.open(config, true);
    }
    openModal(config) {
        return this.open(config, true);
    }
    openDockedPanel(config) {
        return this.open(config, false);
    }
}
RxModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalService, deps: [{ token: i1.AdaptModalService }, { token: i2.TranslateService }, { token: i1.AdaptDockedPanelService }], target: i0.ɵɵFactoryTarget.Injectable });
RxModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.TranslateService }, { type: i1.AdaptDockedPanelService }]; } });
//# sourceMappingURL=modal.service.js.map