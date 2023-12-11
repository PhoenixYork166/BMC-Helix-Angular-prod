import { ApprovalGridType, ApprovalRequestStatus } from './approval-console.types';
export const RX_APPROVAL_CONSOLE = {
    approvalServerCommand: 'com.bmc.arsys.rx.approval.application.command.ApprovalServerCommand',
    approvalCommandForm: 'AP:Signature',
    approvalUserNameField: 101,
    approvalRequestTypes: {
        pending: {
            status: ApprovalRequestStatus.Pending,
            countType: 'pendingCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'warning',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.pending.label'
        },
        onHold: {
            status: ApprovalRequestStatus.Hold,
            countType: 'holdCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'warning',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.hold.label'
        },
        moreInfo: {
            status: ApprovalRequestStatus.RequestMoreInfo,
            countType: 'moreInformationCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'info',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.more-info.label'
        },
        needAttention: {
            status: ApprovalRequestStatus.NeedsAttention,
            countType: 'needAttentionCount',
            gridType: ApprovalGridType.NeedAttentionRequests,
            badgeType: 'warning',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.needs-attention.label'
        },
        approved: {
            status: ApprovalRequestStatus.Approved,
            countType: 'approvedCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'success',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.approved.label'
        },
        rejected: {
            status: ApprovalRequestStatus.Rejected,
            countType: 'rejectedCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'danger',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.rejected.label'
        },
        cancelled: {
            status: ApprovalRequestStatus.Cancelled,
            countType: 'cancelledCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'secondary',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.canceled.label'
        },
        error: {
            status: ApprovalRequestStatus.Error,
            countType: 'errorCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'danger',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.errored.label'
        },
        closed: {
            status: ApprovalRequestStatus.Closed,
            countType: 'closedCount',
            gridType: ApprovalGridType.ApprovalRequests,
            badgeType: 'secondary',
            labelKey: 'com.bmc.arsys.rx.client.approval.console.request.closed.label'
        }
    },
    approvalRequestsGrid: {
        fields: {
            application: 'application',
            summary: 'summary',
            requester: 'requester',
            status: 'status',
            request: 'request',
            createDateSig: 'createDateSig',
            process: 'process',
            signatureInstanceID: 'signatureInstanceID',
            justificationReasonField: 'justification',
            sigTermStateDate: 'sigTermStateDate',
            signatureID: 'signatureID',
            otherDetail1: 'otherDetail1',
            otherDetail2: 'otherDetail2',
            otherDetail3: 'otherDetail3',
            otherDetail4: 'otherDetail4',
            justificationRequired: 'justificationRequired',
            canReassign: 'canReassign',
            processInstanceId: 'processInstanceId',
            ifMultipleApprovers: 'ifMultipleApprovers',
            actingAs: 'actingAs'
        }
    },
    needAttentionRequestsGrid: {
        definition: 'AP:More Information',
        fields: {
            fromUser: '2',
            toUser: '4',
            description: '14506',
            application: '10050',
            requestID: '10051',
            attachment: '14893',
            question: '13300',
            response: '13301',
            state: '11016'
        }
    },
    requestDetailsGrid: {
        definition: 'AP:QCI-Detail-Join',
        approverDefinition: 'AP:PreviewInfo',
        questionDefinition: 'AP:Question-Comment-Info',
        questionTypeValue: 0,
        commentTypeValue: 1,
        fields: {
            from: 2,
            to: 4,
            application: 11001,
            type: 11002,
            signatureID: 11003,
            request: 11004,
            requestNumber: 13334,
            process: 10000,
            response: 11005,
            question: 11006,
            attachment: 11011,
            approver: 14201
        }
    }
};
//# sourceMappingURL=approval-console.constant.js.map