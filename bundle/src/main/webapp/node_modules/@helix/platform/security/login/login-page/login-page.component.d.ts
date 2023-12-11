import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RxAuthService, RxBundleService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class LoginPageComponent {
    private activatedRoute;
    private router;
    private title;
    private rxAuthService;
    private rxBundleService;
    private translateService;
    userName: string;
    userPassword: string;
    timeout: any;
    isLoading: boolean;
    bundleFriendlyName: string;
    shouldReloadPage: boolean;
    areStylesLoaded: boolean;
    footerItems: {
        content: {
            copyright: string;
            info: any;
            helixLogo: boolean;
        };
    };
    constructor(activatedRoute: ActivatedRoute, router: Router, title: Title, rxAuthService: RxAuthService, rxBundleService: RxBundleService, translateService: TranslateService);
    login(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoginPageComponent, "rx-login-page", never, {}, {}, never, never>;
}
