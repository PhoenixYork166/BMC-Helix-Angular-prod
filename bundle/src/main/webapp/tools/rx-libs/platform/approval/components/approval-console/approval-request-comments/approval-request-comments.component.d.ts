import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { RxDataPageFactoryService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { ApprovalGridType, IApprovalRequest, INeedAttentionRequest } from '../approval-console.types';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxApprovalConsoleService } from '../approval-console.service';
import { RxModalService } from '@helix/platform/ui-kit';
import { RxApprovalQCIDataPageService } from '../approval-qci-data-page.service';
import * as i0 from "@angular/core";
export declare class ApprovalRequestCommentsComponent implements OnInit, OnChanges {
    private rxApprovalQCIDataPageService;
    private rxModalService;
    private rxApprovalConsoleService;
    private adaptModalService;
    private rxDataPageService;
    private rxRecordInstanceService;
    private translateService;
    approvalRequest: IApprovalRequest | INeedAttentionRequest;
    gridType: ApprovalGridType;
    requestCommentsGrid: RecordGridComponent;
    gridConfig$: Observable<IRecordGridConfig>;
    private selectedRequest;
    constructor(rxApprovalQCIDataPageService: RxApprovalQCIDataPageService, rxModalService: RxModalService, rxApprovalConsoleService: RxApprovalConsoleService, adaptModalService: AdaptModalService, rxDataPageService: RxDataPageFactoryService, rxRecordInstanceService: RxRecordInstanceService, translateService: TranslateService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    addNewComment(): void;
    private getCommentData;
    private getCommentColumns;
    private getCommentRecordDefinition;
    private showCommentDetails;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestCommentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestCommentsComponent, "rx-approval-request-comments", never, { "approvalRequest": "approvalRequest"; "gridType": "gridType"; }, {}, never, never>;
}