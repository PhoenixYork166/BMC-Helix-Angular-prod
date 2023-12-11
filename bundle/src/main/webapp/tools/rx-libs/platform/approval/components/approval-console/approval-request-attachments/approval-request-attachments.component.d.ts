import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { RxRecordInstanceService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { ApprovalGridType, IApprovalRequest, INeedAttentionRequest } from '../approval-console.types';
import { RxApprovalConsoleService } from '../approval-console.service';
import * as i0 from "@angular/core";
export declare class ApprovalRequestAttachmentsComponent implements OnInit, OnChanges {
    private rxApprovalConsoleService;
    private translateService;
    private rxRecordInstanceService;
    private rxRecordInstanceDataPageService;
    approvalRequest: IApprovalRequest | INeedAttentionRequest;
    gridType: ApprovalGridType;
    requestAttachmentsGrid: RecordGridComponent;
    gridConfig$: Observable<IRecordGridConfig>;
    constructor(rxApprovalConsoleService: RxApprovalConsoleService, translateService: TranslateService, rxRecordInstanceService: RxRecordInstanceService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getAttachmentData;
    private getAttachmentColumns;
    private getAttachmentRecordDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestAttachmentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestAttachmentsComponent, "rx-approval-request-attachments", never, { "approvalRequest": "approvalRequest"; "gridType": "gridType"; }, {}, never, never>;
}
