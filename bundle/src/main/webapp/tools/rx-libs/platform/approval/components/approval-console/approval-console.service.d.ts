import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApprovalCommandType, IApprovalCommand, IApprovalRequest, IApprovalRequestCounts, IRequestAdditionalFields } from './approval-console.types';
import { RxCurrentUserService } from '@helix/platform/shared/api';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { IRxSelectWithPaginationOptionsPage } from '@helix/platform/shared/components';
import { RxApprovalUsersDataPageService } from './approval-request-reassign/approval-users-data-page.service';
import { RxSignatureDetailDataPageService } from './signature-detail-data-page.service';
import * as i0 from "@angular/core";
export declare class RxApprovalConsoleService {
    private httpClient;
    private rxSignatureDetailDataPageService;
    private rxCurrentUserService;
    private rxRecordInstanceUtilsService;
    private rxApprovalUsersDataPageService;
    constructor(httpClient: HttpClient, rxSignatureDetailDataPageService: RxSignatureDetailDataPageService, rxCurrentUserService: RxCurrentUserService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService, rxApprovalUsersDataPageService: RxApprovalUsersDataPageService);
    getApprovalRequestCounts(): Observable<IApprovalRequestCounts>;
    getRequestLabelDetails(registeredDefinitionName: string, approvalFlowName: string): Observable<IRequestAdditionalFields>;
    getCurrentRequestDetails(requestId: string, application: string): Observable<IApprovalRequest>;
    approveRequest(approvalCommands: IApprovalCommand[]): Observable<any>;
    rejectRequest(approvalCommands: IApprovalCommand[]): Observable<any>;
    holdRequest(approvalCommands: IApprovalCommand[]): Observable<any>;
    reassignRequest(approvalCommands: IApprovalCommand[]): Observable<any>;
    getCommandPayload(commandType: ApprovalCommandType, requestSignatureInstanceId: string): IApprovalCommand;
    saveQuestion(formData: FormData, type: string): Observable<any>;
    saveAttachment(formData: FormData, guid: string): Observable<any>;
    getApprovalUsers(startIndex: number, pageSize: number, searchQuery: string): Observable<IRxSelectWithPaginationOptionsPage>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApprovalConsoleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApprovalConsoleService>;
}