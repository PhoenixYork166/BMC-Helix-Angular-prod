import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RxSessionService } from '../security/session.service';
import { RxThemingService } from '../theming';
import * as i0 from "@angular/core";
export declare class RxThemeResolver implements CanActivate {
    private document;
    private rxSessionService;
    private rxThemingService;
    private themeLoaded$;
    constructor(document: any, rxSessionService: RxSessionService, rxThemingService: RxThemingService);
    canActivate(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxThemeResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxThemeResolver>;
}
