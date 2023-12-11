import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RxGlobalCacheService, RxLogService, RxSessionService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class AxValidBundleGuard implements CanActivate {
    private rxGlobalCacheService;
    private router;
    private rxSessionService;
    private rxLogService;
    private defaultUrlTree;
    constructor(rxGlobalCacheService: RxGlobalCacheService, router: Router, rxSessionService: RxSessionService, rxLogService: RxLogService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean>;
    private checkBundleState;
    static ɵfac: i0.ɵɵFactoryDeclaration<AxValidBundleGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AxValidBundleGuard>;
}
