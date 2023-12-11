import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxRssoOAuthConfigurationService } from './rsso-oauth-configuration.service';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { IRssoOAuthSection } from './rsso-oauth.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RssoOauthAdminComponent extends BaseViewComponent implements OnInit {
    private rxRssoOAuthService;
    private rxCurrentUserService;
    private rxNotificationService;
    private translateService;
    serviceForm: NgForm;
    sections: IRssoOAuthSection[];
    busy: Subscription;
    constructor(rxRssoOAuthService: RxRssoOAuthConfigurationService, rxCurrentUserService: RxCurrentUserService, rxNotificationService: RxNotificationService, translateService: TranslateService);
    ngOnInit(): void;
    save(section: IRssoOAuthSection, form: NgForm): void;
    isSaveButtonDisabled(form: NgForm): boolean;
    isSaveButtonVisible(): boolean;
    isSaveInProgress(section: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RssoOauthAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RssoOauthAdminComponent, "rx-admin-rsso-oauth", never, {}, {}, never, never>;
}
