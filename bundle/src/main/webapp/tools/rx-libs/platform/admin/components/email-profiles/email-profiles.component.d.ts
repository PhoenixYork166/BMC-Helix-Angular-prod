import { OnInit, TemplateRef } from '@angular/core';
import { DataCellTemplateParams } from '@bmc-ux/adapt-table';
import { RecordInstance, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRowDataItem } from '@helix/platform/view/api';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { IEmailProfile } from './email-profiles.interfaces';
import { RxEmailProfilesService } from './email-profiles.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class EmailProfilesAdminComponent implements OnInit {
    private rxRecordInstanceDataPageService;
    private rxRecordInstanceService;
    private rxNotificationService;
    private rxModalService;
    private rxEmailProfilesService;
    private translateService;
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxRecordInstanceService: RxRecordInstanceService, rxNotificationService: RxNotificationService, rxModalService: RxModalService, rxEmailProfilesService: RxEmailProfilesService, translateService: TranslateService);
    emailProfilesGrid: RecordGridComponent;
    mailboxFunctionCellTemplate: TemplateRef<DataCellTemplateParams>;
    currentRecordInstance: Observable<RecordInstance>;
    emailProfilesGridConfig$: Observable<IRecordGridConfig>;
    ngOnInit(): void;
    private getData;
    createEmailProfile(profile?: IEmailProfile): void;
    private refreshEmailProfilesGrid;
    getMailboxFunctionType(dataItem: IRowDataItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<EmailProfilesAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EmailProfilesAdminComponent, "rx-admin-email-profiles", never, {}, {}, never, never>;
}