import { OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IErrorPageData } from './error-page.interfaces';
import { RxGlobalCacheService, RxCurrentUserService, RxAngularApplicationService, RxAuthService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxErrorPageComponent implements OnInit, OnDestroy {
    private document;
    private title;
    private route;
    private rxAuthService;
    private rxGlobalCacheService;
    private rxCurrentUserService;
    private rxAngularApplicationService;
    data: IErrorPageData;
    showSignInLink: boolean;
    showApplications: boolean;
    applications$: import("rxjs").Observable<{
        id: string;
        friendlyName: string;
        url: string;
    }[]>;
    private destroyed$;
    constructor(document: any, title: Title, route: ActivatedRoute, rxAuthService: RxAuthService, rxGlobalCacheService: RxGlobalCacheService, rxCurrentUserService: RxCurrentUserService, rxAngularApplicationService: RxAngularApplicationService);
    ngOnInit(): void;
    logout(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxErrorPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxErrorPageComponent, "rx-error-page", never, {}, {}, never, never>;
}
