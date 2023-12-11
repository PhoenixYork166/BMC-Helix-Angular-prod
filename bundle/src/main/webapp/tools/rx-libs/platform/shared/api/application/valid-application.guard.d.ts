import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { RxSessionService } from '../security/session.service';
import * as i0 from "@angular/core";
export declare class RxValidApplicationGuard implements CanActivate {
    private rxGlobalCacheService;
    private router;
    private rxSessionService;
    private unknownApplicationUrlTree;
    constructor(rxGlobalCacheService: RxGlobalCacheService, router: Router, rxSessionService: RxSessionService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean>;
    private checkBundleState;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxValidApplicationGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxValidApplicationGuard>;
}
