import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RX_ERROR_HANDLING } from './error-handling.constant';
import { RxServerMessageHandlerService } from './server-messages-handler.service';
import * as i0 from "@angular/core";
import * as i1 from "./server-messages-handler.service";
export class RxHttpResponseMessageInterceptor {
    constructor(rxServerMessageHandler) {
        this.rxServerMessageHandler = rxServerMessageHandler;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((httpEvent) => {
            if (httpEvent instanceof HttpResponse) {
                const message = httpEvent.headers.get(RX_ERROR_HANDLING.arMessagesHeader);
                if (message) {
                    this.rxServerMessageHandler.handleServerResponseMessage(message);
                }
            }
        }));
    }
}
RxHttpResponseMessageInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpResponseMessageInterceptor, deps: [{ token: i1.RxServerMessageHandlerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxHttpResponseMessageInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpResponseMessageInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHttpResponseMessageInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxServerMessageHandlerService }]; } });
//# sourceMappingURL=http-response-message.interceptor.js.map