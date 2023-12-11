import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RxHttpParamsInterceptor } from './http-params.interceptor';
import * as i0 from "@angular/core";
export class RxHttpModule {
    static forRoot() {
        return {
            ngModule: RxHttpModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxHttpParamsInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxHttpModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxHttpModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule });
RxHttpModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=http.module.js.map