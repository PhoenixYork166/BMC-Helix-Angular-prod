import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RxLocalizationService } from './localization.service';
import * as i0 from "@angular/core";
export declare class RxLoginLocalizationResolver implements Resolve<Observable<any>> {
    private rxLocalizationService;
    constructor(rxLocalizationService: RxLocalizationService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLoginLocalizationResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLoginLocalizationResolver>;
}
