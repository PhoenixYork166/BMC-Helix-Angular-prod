import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxValidViewDefinitionGuard implements CanActivate {
    private rxDefinitionNameService;
    private rxGlobalCacheService;
    private router;
    constructor(rxDefinitionNameService: RxDefinitionNameService, rxGlobalCacheService: RxGlobalCacheService, router: Router);
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxValidViewDefinitionGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxValidViewDefinitionGuard>;
}
