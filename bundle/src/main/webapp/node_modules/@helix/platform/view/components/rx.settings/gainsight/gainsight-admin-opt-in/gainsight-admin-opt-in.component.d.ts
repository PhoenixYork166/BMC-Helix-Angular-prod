import { OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
export declare class GainsightAdminOptInComponent extends BaseViewComponent implements OnInit {
    private translateService;
    private rxNotificationService;
    private rxGainsightConfiguratorService;
    deploymentTypeOptions: RxSelectOption[];
    environmentTypeOptions: string[];
    deploymentType: string[];
    environmentType: string[];
    vm$: import("rxjs").Observable<{
        deploymentTypeOptions: any[];
        environmentTypeOptions: string[];
        useAdaptRadar: boolean;
        loadGainsightFromBmcIt: boolean;
        adaptAgreementState: {
            organizationPerformance: boolean;
            accountMarketing: boolean;
            accountPerformance: boolean;
            organizationMarketing: boolean;
        };
    }>;
    constructor(translateService: TranslateService, rxNotificationService: RxNotificationService, rxGainsightConfiguratorService: RxGainsightConfiguratorService);
    optionFormatter(deploymentType: RxSelectOption): string;
    save(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GainsightAdminOptInComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GainsightAdminOptInComponent, "rx-gainsight-admin-opt-in", never, {}, {}, never, never>;
}
