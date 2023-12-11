import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { RxErrorHandlerService } from './error-handler.service';
import { RxHttpResponseMessageInterceptor } from './http-response-message.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i0 from "@angular/core";
export class RxErrorHandlingModule {
    static forRoot() {
        return {
            ngModule: RxErrorHandlingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxHttpResponseMessageInterceptor,
                    multi: true
                },
                {
                    provide: ErrorHandler,
                    useClass: RxErrorHandlerService
                }
            ]
        };
    }
}
RxErrorHandlingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxErrorHandlingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, imports: [CommonModule] });
RxErrorHandlingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }] });
//# sourceMappingURL=error-handling.module.js.map