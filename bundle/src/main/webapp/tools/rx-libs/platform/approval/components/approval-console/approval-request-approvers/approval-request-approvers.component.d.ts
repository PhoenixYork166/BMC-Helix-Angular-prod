import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalGridType, IApprovalRequest, INeedAttentionRequest } from '../approval-console.types';
import { RxApprovalConsoleService } from '../approval-console.service';
import * as i0 from "@angular/core";
export declare class ApprovalRequestApproversComponent implements OnInit, OnChanges {
    private translateService;
    private rxApprovalConsoleService;
    private rxRecordInstanceDataPageService;
    approvalRequest: IApprovalRequest | INeedAttentionRequest;
    gridType: ApprovalGridType;
    requestApproversGrid: RecordGridComponent;
    gridConfig$: Observable<IRecordGridConfig>;
    constructor(translateService: TranslateService, rxApprovalConsoleService: RxApprovalConsoleService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getApproversData;
    private getRecordDefinition;
    private getColumns;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestApproversComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestApproversComponent, "rx-approval-request-approvers", never, { "approvalRequest": "approvalRequest"; "gridType": "gridType"; }, {}, never, never>;
}
