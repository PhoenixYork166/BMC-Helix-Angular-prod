import { Title } from '@angular/platform-browser';
import { RxAngularApplicationService, RxCurrentUserService, RxGlobalCacheService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxUnknownApplicationComponent {
    private rxGlobalCacheService;
    private rxCurrentUserService;
    private rxAngularApplicationService;
    private title;
    applications$: import("rxjs").Observable<{
        id: string;
        friendlyName: string;
        url: string;
    }[]>;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxCurrentUserService: RxCurrentUserService, rxAngularApplicationService: RxAngularApplicationService, title: Title);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUnknownApplicationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxUnknownApplicationComponent, "rx-unknown-application", never, {}, {}, never, never>;
}
