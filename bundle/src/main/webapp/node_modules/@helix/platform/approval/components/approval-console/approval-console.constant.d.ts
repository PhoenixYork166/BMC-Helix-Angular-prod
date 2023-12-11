import { ApprovalGridType, ApprovalRequestStatus } from './approval-console.types';
export declare const RX_APPROVAL_CONSOLE: {
    approvalServerCommand: string;
    approvalCommandForm: string;
    approvalUserNameField: number;
    approvalRequestTypes: {
        pending: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        onHold: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        moreInfo: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        needAttention: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        approved: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        rejected: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        cancelled: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        error: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
        closed: {
            status: ApprovalRequestStatus;
            countType: string;
            gridType: ApprovalGridType;
            badgeType: string;
            labelKey: string;
        };
    };
    approvalRequestsGrid: {
        fields: {
            application: string;
            summary: string;
            requester: string;
            status: string;
            request: string;
            createDateSig: string;
            process: string;
            signatureInstanceID: string;
            justificationReasonField: string;
            sigTermStateDate: string;
            signatureID: string;
            otherDetail1: string;
            otherDetail2: string;
            otherDetail3: string;
            otherDetail4: string;
            justificationRequired: string;
            canReassign: string;
            processInstanceId: string;
            ifMultipleApprovers: string;
            actingAs: string;
        };
    };
    needAttentionRequestsGrid: {
        definition: string;
        fields: {
            fromUser: string;
            toUser: string;
            description: string;
            application: string;
            requestID: string;
            attachment: string;
            question: string;
            response: string;
            state: string;
        };
    };
    requestDetailsGrid: {
        definition: string;
        approverDefinition: string;
        questionDefinition: string;
        questionTypeValue: number;
        commentTypeValue: number;
        fields: {
            from: number;
            to: number;
            application: number;
            type: number;
            signatureID: number;
            request: number;
            requestNumber: number;
            process: number;
            response: number;
            question: number;
            attachment: number;
            approver: number;
        };
    };
};
