import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class RxCloseViewActionService {
    execute(params) {
        return params.actAsCancel
            ? params.viewApi.cancel()
            : EMPTY.pipe(tap({
                complete() {
                    params.viewApi.close();
                }
            }));
    }
}
RxCloseViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCloseViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCloseViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCloseViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCloseViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=close-view-action.service.js.map