import { Injectable } from '@angular/core';
import { RxRecordInstanceService } from './record-instance.service';
import { catchError, switchMap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { RX_ERROR_HANDLING } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "./record-instance.service";
import * as i2 from "@helix/platform/ui-kit";
export class RxRecordInstanceUpdateService {
    constructor(rxRecordInstanceService, rxUtilityModalsService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxUtilityModalsService = rxUtilityModalsService;
    }
    execute(recordInstance) {
        return this.rxRecordInstanceService
            .save(recordInstance)
            .pipe(catchError((error) => this.handleModifiedInstanceError(error, recordInstance)));
    }
    handleModifiedInstanceError(error, recordInstance) {
        if (error.status === RX_ERROR_HANDLING.optimisticLockErrorHttpStatus) {
            return from(this.rxUtilityModalsService.confirmExternalChange(error.error[0].messageText)).pipe(switchMap((isConfirmed) => {
                if (isConfirmed) {
                    return this.rxRecordInstanceService.save(recordInstance, {
                        headers: {
                            'Override-Optimistic-Lock': 'true'
                        }
                    });
                }
                else {
                    return throwError(error);
                }
            }));
        }
        else {
            return throwError(error);
        }
    }
}
RxRecordInstanceUpdateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUpdateService, deps: [{ token: i1.RxRecordInstanceService }, { token: i2.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceUpdateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUpdateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUpdateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i2.RxUtilityModalsService }]; } });
//# sourceMappingURL=record-instance-update.service.js.map