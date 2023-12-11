import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RX_SESSION } from '../session.constant';
import { SessionExpirationType } from './session-expiration.interface';
import { RxSessionExpirationService } from './session-expiration.service';
import * as i0 from "@angular/core";
import * as i1 from "./session-expiration.service";
export class RxSessionExpirationInterceptor {
    constructor(rxSessionExpirationService) {
        this.rxSessionExpirationService = rxSessionExpirationService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                const responseDate = new Date(event.headers.get('date'));
                if (!this.lastResponseDate || responseDate >= this.lastResponseDate) {
                    this.lastResponseDate = responseDate;
                    const idleTimeout = event.headers.get(RX_SESSION.expirationHeaders.idle);
                    const absoluteTimeout = event.headers.get(RX_SESSION.expirationHeaders.absolute);
                    this.rxSessionExpirationService.setTimeout(SessionExpirationType.Idle, idleTimeout);
                    this.rxSessionExpirationService.setTimeout(SessionExpirationType.Absolute, absoluteTimeout);
                }
            }
        }));
    }
}
RxSessionExpirationInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationInterceptor, deps: [{ token: i1.RxSessionExpirationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSessionExpirationInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxSessionExpirationService }]; } });
//# sourceMappingURL=session-expiration.interceptor.js.map