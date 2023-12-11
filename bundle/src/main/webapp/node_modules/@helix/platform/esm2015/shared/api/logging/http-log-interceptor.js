import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, forEach, startsWith } from 'lodash';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RxJsonParserService } from '@helix/platform/utils';
import { RX_ERROR_HANDLING } from '../error-handling/error-handling.constant';
import { RxLogService } from './log.service';
import * as i0 from "@angular/core";
import * as i1 from "./log.service";
import * as i2 from "@helix/platform/utils";
export class RxHttpLogInterceptor {
    constructor(rxLogService, rxJsonParserService) {
        this.rxLogService = rxLogService;
        this.rxJsonParserService = rxJsonParserService;
    }
    intercept(request, next) {
        if (this.rxLogService.logCategories.length) {
            const headers = request.headers.set('log-retrieval', this.rxLogService.serverLogCategories);
            this.rxLogService.debug(`${request.method} ${this.getAbsoluteRequestUrl(request.urlWithParams)}`);
            return next.handle(request.clone({ headers })).pipe(tap((httpEvent) => {
                if (httpEvent instanceof HttpResponse) {
                    const serverLog = httpEvent.headers.get(RX_ERROR_HANDLING.arMessagesHeader);
                    if (serverLog) {
                        let serverLogMessages = this.rxJsonParserService.tryParseJson(serverLog, []);
                        serverLogMessages = filter(serverLogMessages, 'messageText');
                        forEach(serverLogMessages, (logData) => this.rxLogService.log(logData.messageText));
                    }
                }
            }), catchError((err) => {
                this.rxLogService.warning(`${request.method} ${this.getAbsoluteRequestUrl(request.urlWithParams)} ${err.status} (${err.statusText})`);
                return throwError(err);
            }));
        }
        else {
            return next.handle(request);
        }
    }
    getAbsoluteRequestUrl(url) {
        if (startsWith(url, '/')) {
            return `${location.origin}${url}`;
        }
        else {
            return url;
        }
    }
}
RxHttpLogInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpLogInterceptor, deps: [{ token: i1.RxLogService }, { token: i2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxHttpLogInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpLogInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpLogInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxLogService }, { type: i2.RxJsonParserService }]; } });
//# sourceMappingURL=http-log-interceptor.js.map