import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RxCurrentUserService } from '../user/current-user.service';
import { RxAuthService } from './auth.service';
import { RxSessionService } from './session.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
export declare class RxAuthGuard implements CanActivate {
    private router;
    private rxAuthService;
    private rxSessionService;
    private rxCurrentUserService;
    private rxGlobalCacheService;
    constructor(router: Router, rxAuthService: RxAuthService, rxSessionService: RxSessionService, rxCurrentUserService: RxCurrentUserService, rxGlobalCacheService: RxGlobalCacheService);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAuthGuard>;
}
