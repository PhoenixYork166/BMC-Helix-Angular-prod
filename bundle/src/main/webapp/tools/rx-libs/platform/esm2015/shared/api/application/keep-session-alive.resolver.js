import { Injectable } from '@angular/core';
import { RxSessionExpirationService } from '../security/session-expiration/session-expiration.service';
import * as i0 from "@angular/core";
import * as i1 from "../security/session-expiration/session-expiration.service";
export class RxKeepSessionAliveResolver {
    constructor(rxSessionExpirationService) {
        this.rxSessionExpirationService = rxSessionExpirationService;
    }
    resolve() {
        return this.rxSessionExpirationService.keepSessionAlive();
    }
}
RxKeepSessionAliveResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxKeepSessionAliveResolver, deps: [{ token: i1.RxSessionExpirationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxKeepSessionAliveResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxKeepSessionAliveResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxKeepSessionAliveResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxSessionExpirationService }]; } });
//# sourceMappingURL=keep-session-alive.resolver.js.map