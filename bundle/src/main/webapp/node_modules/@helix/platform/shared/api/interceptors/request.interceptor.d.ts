import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxBundleCacheService } from '../caching/bundle-cache.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
export declare class RxRequestInterceptor implements HttpInterceptor {
    private rxBundleCacheService;
    private rxGlobalCacheService;
    constructor(rxBundleCacheService: RxBundleCacheService, rxGlobalCacheService: RxGlobalCacheService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRequestInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRequestInterceptor>;
}
