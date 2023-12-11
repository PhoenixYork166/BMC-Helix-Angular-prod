import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxCurrentUserService } from '../../user/current-user.service';
import { RxMetadataService } from '../metadata.service';
import { RxBundleCacheService } from '../bundle-cache.service';
import { RxLocalizationService } from '../../localization/localization.service';
import * as i0 from "@angular/core";
export declare class RxMetadataRequestInterceptor implements HttpInterceptor {
    private bundleCacheService;
    private rxMetadataService;
    private rxCurrentUserService;
    private rxLocalizationService;
    constructor(bundleCacheService: RxBundleCacheService, rxMetadataService: RxMetadataService, rxCurrentUserService: RxCurrentUserService, rxLocalizationService: RxLocalizationService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxMetadataRequestInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxMetadataRequestInterceptor>;
}
