import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxSessionExpirationService } from './session-expiration.service';
import * as i0 from "@angular/core";
export declare class RxSessionExpirationInterceptor implements HttpInterceptor {
    private rxSessionExpirationService;
    private lastResponseDate;
    constructor(rxSessionExpirationService: RxSessionExpirationService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSessionExpirationInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSessionExpirationInterceptor>;
}
