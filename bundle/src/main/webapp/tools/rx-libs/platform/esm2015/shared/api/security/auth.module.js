import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RxAuthInterceptor } from './auth.interceptor';
import * as i0 from "@angular/core";
export class RxAuthModule {
    static forRoot() {
        return {
            ngModule: RxAuthModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxAuthInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, imports: [CommonModule] });
RxAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }] });
//# sourceMappingURL=auth.module.js.map