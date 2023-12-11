import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export const RX_APPROVAL_NOTIFICATIONS = {
    approvalNotificationForm: {
        name: 'AP: Approval Notification',
        fields: {
            status: RX_RECORD_DEFINITION.coreFieldIds.status,
            notificationName: RX_RECORD_DEFINITION.coreFieldIds.description,
            sendToOther: 12300,
            method: 12301,
            sendTo: 12302,
            notificationMessage: 12303,
            subject: 12305,
            notifyOn: 12307,
            additionalConditions: 12308,
            useTemplate: 14053,
            applicationName: 14861,
            globalNotification: 14862,
            applicationBundleId: 61001
        }
    },
    apProcessDefinitionForm: {
        name: 'AP:Process Definition',
        fields: {
            processName: 10000,
            application: 10050
        }
    },
    approvalFlowConfiguration: {
        name: 'com.bmc.arsys.rx.approval:ApprovalFlowConfiguration',
        fields: {
            flowGroup: 10007,
            flowName: 10008,
            recordDefinition: 10000,
            arApprovalProcessDefinitionGuid: 57060
        }
    },
    arSystemEmailMailboxConfiguration: {
        name: 'AR System Email Mailbox Configuration',
        fields: {
            mailboxFunction: 18049
        }
    },
    arSystemAdministrationTextTemplate: {
        name: 'AR System Administration: TextTemplate',
        fields: {
            id: RX_RECORD_DEFINITION.coreFieldIds.id,
            name: 41202,
            applicationBundleId: 61001
        }
    }
};
//# sourceMappingURL=approval-notifications.constant.js.map