import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { RxCommandFactoryService, RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class SummarizationServiceAdminComponent extends BaseViewComponent implements OnInit {
    private translateService;
    private rxCommandFactoryService;
    private rxSystemConfigurationService;
    private rxNotificationService;
    private rxCurrentUserService;
    summarizationServiceForm: FormGroup;
    connectionTestStatus: ConnectionTestStatus;
    private isSaveInProgress;
    isAdministrator: boolean;
    constructor(translateService: TranslateService, rxCommandFactoryService: RxCommandFactoryService, rxSystemConfigurationService: RxSystemConfigurationService, rxNotificationService: RxNotificationService, rxCurrentUserService: RxCurrentUserService);
    ngOnInit(): void;
    private resetConnectionTest;
    onTestConnection(): void;
    save(): void;
    isSaveButtonDisabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SummarizationServiceAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SummarizationServiceAdminComponent, "rx-admin-summarization-service", never, {}, {}, never, never>;
}
