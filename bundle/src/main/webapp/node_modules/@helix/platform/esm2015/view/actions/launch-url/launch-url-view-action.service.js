import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { RX_LAUNCH_BEHAVIOR } from '@helix/platform/view/api';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class RxLaunchUrlViewActionService {
    execute(params) {
        if (params.url) {
            window.open(params.url, RX_LAUNCH_BEHAVIOR[params.launchBehavior].target);
            return EMPTY;
        }
        else {
            return throwError(new RxError('rxLaunchUrlAction: URL is not specified.'));
        }
    }
}
RxLaunchUrlViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchUrlViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=launch-url-view-action.service.js.map