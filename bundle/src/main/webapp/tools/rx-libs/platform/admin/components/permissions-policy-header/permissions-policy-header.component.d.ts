import { OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class PermissionsPolicyHeaderAdminComponent extends BaseViewComponent implements OnInit {
    private rxNotificationService;
    private translateService;
    private rxSystemConfigurationService;
    permissionPolicyHeaderModel: NgModel;
    private settingName;
    permissionsPolicyHeader: string;
    syntaxUrl: string;
    busy: Subscription;
    constructor(rxNotificationService: RxNotificationService, translateService: TranslateService, rxSystemConfigurationService: RxSystemConfigurationService);
    ngOnInit(): void;
    isDirty(): boolean;
    onSaveClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionsPolicyHeaderAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PermissionsPolicyHeaderAdminComponent, "rx-admin-permissions-policy", never, {}, {}, never, never>;
}
