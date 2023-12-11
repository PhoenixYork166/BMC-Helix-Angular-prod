import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxOverlayService } from './overlay.service';
import * as i0 from "@angular/core";
export declare class RxOverlayRequestsInterceptor implements HttpInterceptor {
    private rxOverlayService;
    constructor(rxOverlayService: RxOverlayService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxOverlayRequestsInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxOverlayRequestsInterceptor>;
}
