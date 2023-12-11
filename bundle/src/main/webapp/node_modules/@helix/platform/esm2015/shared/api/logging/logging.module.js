import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxHttpLogInterceptor } from './http-log-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RxConsoleLogger } from './console-logger.class';
import { RxLogService } from './log.service';
import { defaults } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "./log.service";
export class RxLoggingModule {
    constructor(rxLogService) {
        defaults(window, { rx: {} });
        window['rx'].logger = new RxConsoleLogger(rxLogService);
    }
    static forRoot() {
        return {
            ngModule: RxLoggingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxHttpLogInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxLoggingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, deps: [{ token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.NgModule });
RxLoggingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, imports: [CommonModule] });
RxLoggingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLoggingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }]; } });
//# sourceMappingURL=logging.module.js.map