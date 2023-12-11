import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxHttpParameterCodec } from './http-parameter-codec.class';
import * as i0 from "@angular/core";
export class RxHttpParamsInterceptor {
    intercept(request, next) {
        const params = new HttpParams({
            encoder: new RxHttpParameterCodec(),
            fromString: request.params.toString()
        });
        return next.handle(request.clone({ params }));
    }
}
RxHttpParamsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpParamsInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxHttpParamsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpParamsInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpParamsInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=http-params.interceptor.js.map