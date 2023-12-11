import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RxFeatureService } from '../services/feature/feature.service';
import * as i0 from "@angular/core";
export declare class RxFeatureGuard implements CanActivate {
    private rxFeatureService;
    constructor(rxFeatureService: RxFeatureService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFeatureGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxFeatureGuard>;
}
