import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxAuthService } from './auth.service';
import * as i0 from "@angular/core";
export declare class RxAuthInterceptor implements HttpInterceptor {
    private rxAuthService;
    constructor(rxAuthService: RxAuthService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAuthInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAuthInterceptor>;
}
