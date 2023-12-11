import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RxAuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
export class RxAuthInterceptor {
    constructor(rxAuthService) {
        this.rxAuthService = rxAuthService;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((err) => {
            if (err.status === 401) {
                this.rxAuthService.redirectToLoginPage();
            }
            return throwError(err);
        }));
    }
}
RxAuthInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthInterceptor, deps: [{ token: i1.RxAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAuthInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxAuthService }]; } });
//# sourceMappingURL=auth.interceptor.js.map