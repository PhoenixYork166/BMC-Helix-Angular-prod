import { Router } from '@angular/router';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
export declare class RxPreviousStateService {
    private router;
    private rxGlobalCacheService;
    private previousUrl;
    private currentUrl;
    constructor(router: Router, rxGlobalCacheService: RxGlobalCacheService);
    goToPrevState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxPreviousStateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxPreviousStateService>;
}
