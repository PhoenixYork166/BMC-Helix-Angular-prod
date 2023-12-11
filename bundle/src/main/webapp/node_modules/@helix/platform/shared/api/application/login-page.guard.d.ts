import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RxLocalizationService } from '../localization';
import * as i0 from "@angular/core";
export declare class RxLoginPageGuard implements CanActivate {
    private rxLocalizationService;
    private router;
    constructor(rxLocalizationService: RxLocalizationService, router: Router);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLoginPageGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLoginPageGuard>;
}
