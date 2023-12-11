import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class BmcServiceCloudAccountAdminComponent extends BaseViewComponent implements OnInit {
    private formBuilder;
    private rxCurrentUserService;
    private rxNotificationService;
    private rxSystemConfigurationService;
    private translateService;
    bmcServiceCloudAccountConfigForm: FormGroup;
    isAdministrator: boolean;
    busy: Subscription;
    private settingName;
    constructor(formBuilder: FormBuilder, rxCurrentUserService: RxCurrentUserService, rxNotificationService: RxNotificationService, rxSystemConfigurationService: RxSystemConfigurationService, translateService: TranslateService);
    private getConfiguration;
    saveConfig(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BmcServiceCloudAccountAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BmcServiceCloudAccountAdminComponent, "rx-admin-bmc-service-cloud-account", never, {}, {}, never, never>;
}
