import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DefaultUrlSerializer, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { RxLocalizationService } from '../localization/localization.service';
import { RxLogService } from '../logging/log.service';
import { RxSessionService } from './session.service';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { RxRssoDebugService } from '../dev/rsso-debug.service';
import * as i0 from "@angular/core";
export declare class RxAuthService {
    private location;
    private httpClient;
    private router;
    private rxGlobalCacheService;
    private rxLocalizationService;
    private rxSessionService;
    private rxLogService;
    private rxUrlUtilsService;
    private rxRssoDebugService;
    targetUrl: string;
    defaultUrlSerializer: DefaultUrlSerializer;
    constructor(location: Location, httpClient: HttpClient, router: Router, rxGlobalCacheService: RxGlobalCacheService, rxLocalizationService: RxLocalizationService, rxSessionService: RxSessionService, rxLogService: RxLogService, rxUrlUtilsService: RxUrlUtilsService, rxRssoDebugService: RxRssoDebugService);
    login(userName: string, password: string): Observable<any>;
    redirectToLoginPage(): void;
    logout(): Observable<any>;
    private redirectToRssoLogoutPage;
    private redirectToRssoDebugLoginPage;
    private redirectToApplicationLoginPage;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAuthService>;
}
