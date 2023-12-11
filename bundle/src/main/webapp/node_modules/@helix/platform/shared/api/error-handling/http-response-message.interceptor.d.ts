import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxServerMessageHandlerService } from './server-messages-handler.service';
import * as i0 from "@angular/core";
export declare class RxHttpResponseMessageInterceptor implements HttpInterceptor {
    private rxServerMessageHandler;
    constructor(rxServerMessageHandler: RxServerMessageHandlerService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxHttpResponseMessageInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxHttpResponseMessageInterceptor>;
}
