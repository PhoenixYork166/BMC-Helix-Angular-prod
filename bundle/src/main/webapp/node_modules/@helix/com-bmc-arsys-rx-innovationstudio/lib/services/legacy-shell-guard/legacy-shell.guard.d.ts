import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RxAngularApplicationService, RxDefinitionNameService, RxLogService } from '@helix/platform/shared/api';
import { RxViewDefinitionService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class AxLegacyShellGuard implements CanActivate {
    private router;
    private rxAngularApplicationService;
    private rxDefinitionNameService;
    private rxViewDefinitionService;
    private rxLogService;
    constructor(router: Router, rxAngularApplicationService: RxAngularApplicationService, rxDefinitionNameService: RxDefinitionNameService, rxViewDefinitionService: RxViewDefinitionService, rxLogService: RxLogService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AxLegacyShellGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AxLegacyShellGuard>;
}
