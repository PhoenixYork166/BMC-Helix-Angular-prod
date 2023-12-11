import { Injectable } from '@angular/core';
import { isFunction } from 'lodash';
import { concat, EMPTY, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxSaveViewActionService {
    execute(params) {
        if (isFunction(params.targetApi.save)) {
            const closeAfterSave$ = isFunction(params.viewApi.close)
                ? EMPTY.pipe(tap({
                    complete() {
                        params.viewApi.close();
                    }
                }))
                : throwError(new RxError('rxSaveAction: target view does not support close API.'));
            return concat(params.targetApi.save(params.closeAfterSave), params.closeAfterSave ? closeAfterSave$ : EMPTY);
        }
        else {
            return throwError(new RxError('rxSaveAction: target view/component does not support save API.'));
        }
    }
}
RxSaveViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSaveViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxSaveViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSaveViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSaveViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=save-view-action.service.js.map