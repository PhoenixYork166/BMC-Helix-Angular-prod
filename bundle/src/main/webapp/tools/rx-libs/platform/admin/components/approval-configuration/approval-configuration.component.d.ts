import { OnInit, TemplateRef } from '@angular/core';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RxRecordDefinitionRegistrationDataPageService } from './record-definition-registration-data-page.service';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxModalService } from '@helix/platform/ui-kit';
import { RxApprovalConfigurationService } from './approval-configuration.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { DataCellTemplateParams } from '@bmc-ux/adapt-table';
import * as i0 from "@angular/core";
export declare class ApprovalConfigurationAdminComponent implements OnInit {
    private rxModalService;
    private translateService;
    private adaptModalService;
    private rxNotificationService;
    private rxApprovalConfigurationService;
    private rxRecordDefinitionRegistrationDataPageService;
    gridConfig: Observable<IRecordGridConfig>;
    definitionNameCellTemplate: TemplateRef<DataCellTemplateParams>;
    fieldNameCellTemplate: TemplateRef<DataCellTemplateParams>;
    grid: RecordGridComponent;
    constructor(rxModalService: RxModalService, translateService: TranslateService, adaptModalService: AdaptModalService, rxNotificationService: RxNotificationService, rxApprovalConfigurationService: RxApprovalConfigurationService, rxRecordDefinitionRegistrationDataPageService: RxRecordDefinitionRegistrationDataPageService);
    ngOnInit(): void;
    private getData;
    newApprovalConfiguration(): void;
    editApprovalConfiguration(clickedColumnRow: any): void;
    private openApprovalConfiguration;
    private unregisterRecord;
    private getRecordDefinition;
    private getColumns;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalConfigurationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalConfigurationAdminComponent, "rx-admin-approval-configuration", never, {}, {}, never, never>;
}
