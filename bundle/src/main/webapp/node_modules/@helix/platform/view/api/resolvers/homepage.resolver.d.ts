import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RxComponentCanDeactivateGuard, RxGlobalCacheService, RxLocalizationService, RxSessionService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { RxShellService } from '../shell';
import { RxTreeService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxHomepageResolver implements CanActivate {
    private rxGlobalCacheService;
    private rxShellService;
    private rxTreeService;
    private router;
    private rxSessionService;
    private rxComponentCanDeactivateGuard;
    private rxLocalizationService;
    private unknownApplicationRoute;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxShellService: RxShellService, rxTreeService: RxTreeService, router: Router, rxSessionService: RxSessionService, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard, rxLocalizationService: RxLocalizationService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    private getBundleUrl;
    private generateUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxHomepageResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxHomepageResolver>;
}
