import { RxViewActionRegistryService } from './view-action-registry.service';
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { RxLogService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "./view-action-registry.service";
import * as i2 from "@helix/platform/shared/api";
export class RxViewActionService {
    constructor(rxViewActionRegistryService, rxLogService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLogService = rxLogService;
    }
    execute(actionName, parameters) {
        const viewActionDescriptor = this.rxViewActionRegistryService.get(actionName);
        if (viewActionDescriptor) {
            if (parameters.$condition$ !== false) {
                return viewActionDescriptor.service.execute(parameters);
            }
            else {
                this.rxLogService.debug(`View Action ${actionName} skipped.`);
                return EMPTY;
            }
        }
        else {
            return throwError(`View Action ${actionName} not found.`);
        }
    }
}
RxViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionService, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxLogService }]; } });
//# sourceMappingURL=view-action.service.js.map