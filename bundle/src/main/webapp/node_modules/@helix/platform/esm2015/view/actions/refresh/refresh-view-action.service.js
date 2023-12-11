import { Injectable } from '@angular/core';
import { isFunction } from 'lodash';
import { throwError } from 'rxjs';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxRefreshViewActionService {
    execute(params) {
        if (params.component) {
            return isFunction(params.component.refresh)
                ? params.component.refresh()
                : throwError(new RxError('rxRefreshAction: target component does not support refresh API.'));
        }
        else {
            return throwError(new RxError('rxRefreshAction: component is not specified.'));
        }
    }
}
RxRefreshViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRefreshViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxRefreshViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRefreshViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRefreshViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=refresh-view-action.service.js.map