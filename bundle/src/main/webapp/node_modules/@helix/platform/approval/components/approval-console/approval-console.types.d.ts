import { JustificationRequirement, YesOrNo } from '@helix/platform/shared/api';
export interface IApprovalRequestCounts {
    pendingCount: number;
    holdCount: number;
    moreInformationCount: number;
    approvedCount: number;
    rejectedCount: number;
    cancelledCount: number;
    errorCount: number;
    closedCount: number;
    needAttentionCount: number;
}
export declare enum ApprovalRequestStatus {
    Pending = "Pending",
    Hold = "On Hold",
    MoreInfo = "More Information",
    RequestMoreInfo = "Request More Information",
    NeedsAttention = "Needs Attention",
    Approved = "Approved",
    Rejected = "Rejected",
    Cancelled = "Cancelled",
    Error = "Error",
    Closed = "Closed"
}
export declare enum ApprovalGridType {
    ApprovalRequests = "approvalRequests",
    NeedAttentionRequests = "needAttentionRequests"
}
export interface IApprovalRequestType {
    status: ApprovalRequestStatus;
    countType: string;
    gridType: ApprovalGridType;
    label?: string;
    badgeType: string;
}
export declare enum ApprovalCommandType {
    Approved = "Approved",
    Rejected = "Rejected",
    OnHold = "OnHold",
    Reassign = "Reassign"
}
export interface IApprovalRequest {
    canReassign: YesOrNo;
    justificationRequired: JustificationRequirement;
    status: ApprovalRequestStatus;
    application: string;
    approvers: string;
    notes: string;
    request: string;
    requester: string;
    summary: string;
    process: string;
    processType: string;
    createDateSig: string;
    requestDate: string;
    statusDate: string;
    actionDate: string;
    sigTermStateDate: string;
    justification: string;
    otherDetail1: string;
    otherDetail2: string;
    otherDetail3: string;
    otherDetail4: string;
    signatureID: string;
    signatureInstanceID: string;
    actingAs: string;
    resolvedDisplayValues: {
        notes: string;
        otherDetail1: string;
        otherDetail2: string;
        otherDetail3: string;
        otherDetail4: string;
        request: string;
        requester: string;
        summary: string;
        toolTip: string;
    };
}
export interface IApprovalCommand {
    formName: string;
    requestID: string;
    command: ApprovalCommandType;
    assignToApprovers?: string;
    justificationOrReason?: string;
}
export interface INeedAttentionRequest {
    2: string;
    4: string;
    379: string;
    10050: string;
    10051: string;
    13300: string;
    14506: string;
    14893: string;
}
export interface IRequestAdditionalFields {
    14508: string;
    14509: string;
    14510: string;
    14511: string;
}
export interface IRequestConfig {
    requestId: string;
    requestSignatureInstanceId: string;
    reason: string;
    isReasonRequired: boolean;
}
