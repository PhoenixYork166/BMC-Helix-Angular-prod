import { Inject, Injectable, isDevMode } from '@angular/core';
import { RX_BUILD_ENVIRONMENT } from './build-environment.constant';
import * as i0 from "@angular/core";
export class RxRssoDebugService {
    constructor(rxBuildEnvironment) {
        this.rxBuildEnvironment = rxBuildEnvironment;
    }
    isRssoDebugEnabled() {
        return isDevMode() && Boolean(this.rxBuildEnvironment.isRssoDebugEnabled);
    }
}
RxRssoDebugService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoDebugService, deps: [{ token: RX_BUILD_ENVIRONMENT }], target: i0.ɵɵFactoryTarget.Injectable });
RxRssoDebugService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoDebugService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRssoDebugService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [RX_BUILD_ENVIRONMENT]
                }] }]; } });
//# sourceMappingURL=rsso-debug.service.js.map