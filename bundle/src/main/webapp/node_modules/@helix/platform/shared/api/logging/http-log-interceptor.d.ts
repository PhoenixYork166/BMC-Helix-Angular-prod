import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxLogService } from './log.service';
import * as i0 from "@angular/core";
export declare class RxHttpLogInterceptor implements HttpInterceptor {
    private rxLogService;
    private rxJsonParserService;
    constructor(rxLogService: RxLogService, rxJsonParserService: RxJsonParserService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private getAbsoluteRequestUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxHttpLogInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxHttpLogInterceptor>;
}
