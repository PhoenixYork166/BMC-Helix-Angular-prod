import { Inject, Injectable, Injector } from '@angular/core';
import { ActiveModalRef, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxUtilityModalsService } from './utility-modals.service';
import * as i0 from "@angular/core";
export class RxModalClass {
    constructor(context, injector) {
        this.context = context;
        this.injector = injector;
        this._isDirty = false;
        this.dialogApi = {
            dismissDialog: this.dismissDialog.bind(this),
            isDirty: this.isDirty.bind(this)
        };
        this.rxUtilityModalsService = injector.get(RxUtilityModalsService);
    }
    get allowDismiss() {
        var _a;
        return (_a = this.context.getData().allowDismiss) !== null && _a !== void 0 ? _a : true;
    }
    set allowDismiss(value) {
        this.context.getData().allowDismiss = value;
    }
    markAsDirty() {
        this._isDirty = true;
    }
    isDirty() {
        return this._isDirty;
    }
    ngOnInit() {
        this.context.getData().onApiReady(this.dialogApi);
    }
    dismissDialog() {
        if (this.allowDismiss === false) {
            return;
        }
        if (this.isDirty()) {
            this.rxUtilityModalsService.confirmUnsavedChanges().then((result) => {
                if (result) {
                    this.context.dismiss(null);
                }
            });
        }
        else {
            this.context.dismiss(null);
        }
    }
}
RxModalClass.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalClass, deps: [{ token: DockedPanelContext || ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxModalClass.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalClass });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalClass, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DockedPanelContext || ActiveModalRef]
                }] }, { type: i0.Injector }]; } });
//# sourceMappingURL=modal.class.js.map