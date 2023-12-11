import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class ServicesProviderRegionAdminComponent implements OnInit {
    private translateService;
    private rxSystemConfigurationService;
    private rxNotificationService;
    servicesProviderRegionForm: FormGroup;
    private isSaveInProgress;
    private defaultSelection;
    regionOptions: RxSelectOption[];
    constructor(translateService: TranslateService, rxSystemConfigurationService: RxSystemConfigurationService, rxNotificationService: RxNotificationService);
    ngOnInit(): void;
    optionFormatter: (regionNameOption: RxSelectOption) => string;
    save(): void;
    canSave(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServicesProviderRegionAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ServicesProviderRegionAdminComponent, "rx-admin-services-provider-region", never, {}, {}, never, never>;
}
