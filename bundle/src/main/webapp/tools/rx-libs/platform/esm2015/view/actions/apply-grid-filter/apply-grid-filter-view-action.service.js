import { Injectable } from '@angular/core';
import { RxError } from '@helix/platform/utils';
import { EMPTY, throwError } from 'rxjs';
import { RxApplyGridFilterActionName } from './apply-grid-filter-view-action.types';
import * as i0 from "@angular/core";
export class RxApplyGridFilterViewActionService {
    execute(params) {
        if (params.targetApi) {
            if (params.targetApi.applyFilters) {
                params.targetApi.applyFilters(params.filters, params.mode);
                return EMPTY;
            }
            else {
                throwError(new RxError(`${RxApplyGridFilterActionName}: target component does not support applyFilters API.`));
            }
            return EMPTY;
        }
        else {
            return throwError(new RxError('rxApplyGridFilterAction: component is not specified.'));
        }
    }
}
RxApplyGridFilterViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxApplyGridFilterViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=apply-grid-filter-view-action.service.js.map