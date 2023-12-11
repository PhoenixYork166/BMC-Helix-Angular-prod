export declare const RX_APPROVAL_NOTIFICATIONS: {
    approvalNotificationForm: {
        name: string;
        fields: {
            status: number;
            notificationName: number;
            sendToOther: number;
            method: number;
            sendTo: number;
            notificationMessage: number;
            subject: number;
            notifyOn: number;
            additionalConditions: number;
            useTemplate: number;
            applicationName: number;
            globalNotification: number;
            applicationBundleId: number;
        };
    };
    apProcessDefinitionForm: {
        name: string;
        fields: {
            processName: number;
            application: number;
        };
    };
    approvalFlowConfiguration: {
        name: string;
        fields: {
            flowGroup: number;
            flowName: number;
            recordDefinition: number;
            arApprovalProcessDefinitionGuid: number;
        };
    };
    arSystemEmailMailboxConfiguration: {
        name: string;
        fields: {
            mailboxFunction: number;
        };
    };
    arSystemAdministrationTextTemplate: {
        name: string;
        fields: {
            id: number;
            name: number;
            applicationBundleId: number;
        };
    };
};
