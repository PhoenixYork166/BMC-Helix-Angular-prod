import { Injectable } from '@angular/core';
import { RxWizardModalComponent } from './wizard-modal.component';
import { RxModalService } from '@helix/platform/ui-kit';
import { noop } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
export class RxWizardService {
    constructor(rxModalService) {
        this.rxModalService = rxModalService;
    }
    open(config) {
        return this.rxModalService
            .openModal({
            content: RxWizardModalComponent,
            data: Object.assign({}, config)
        })
            .catch(noop);
    }
}
RxWizardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardService, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Injectable });
RxWizardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; } });
//# sourceMappingURL=wizard.service.js.map