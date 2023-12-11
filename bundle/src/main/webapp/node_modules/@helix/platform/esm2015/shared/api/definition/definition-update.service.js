import { Injectable } from '@angular/core';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RX_ERROR_HANDLING } from '../error-handling/error-handling.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
export class RxDefinitionUpdateService {
    constructor(rxUtilityModalsService) {
        this.rxUtilityModalsService = rxUtilityModalsService;
    }
    execute(updateFn) {
        return updateFn().pipe(catchError((error) => {
            if (error.status === RX_ERROR_HANDLING.optimisticLockErrorHttpStatus) {
                return from(this.rxUtilityModalsService.confirmExternalChange(error.error[0].messageText)).pipe(switchMap((isConfirmed) => {
                    if (isConfirmed) {
                        return updateFn({
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
        }));
    }
}
RxDefinitionUpdateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionUpdateService, deps: [{ token: i1.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionUpdateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionUpdateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionUpdateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxUtilityModalsService }]; } });
//# sourceMappingURL=definition-update.service.js.map