export const RX_ISSUES = {
    issuesRecordDefinitionName: 'Reported Errors',
    issuesRecordFieldIds: {
        operationId: 70100,
        applicationName: 70101,
        messageType: 70102,
        errorNumber: 70103,
        errorMessage: 70104,
        caseId: 70106,
        caseStatus: 70107,
        relatedRecordGuid: 70108,
        userDescription: 70109,
        submittedToSupportDate: 70110,
        caseGuid: 70111,
        caseStatusRefreshDate: 70112
    },
    statusOptionValues: {
        new: 0,
        submitted: 1
    },
    linkExpiredError: {
        code: 12206,
        message: 'com.bmc.arsys.rx.client.admin.application-issues.link-expired-error.message'
    },
    notificationMessages: {
        caseStatusRefreshed: 'com.bmc.arsys.rx.client.admin.application-issues.case-status-refreshed.message',
        duplicateIssuesClosed: 'com.bmc.arsys.rx.client.admin.application-issues.duplicate-issues-closed.message',
        caseSubmitted: 'com.bmc.arsys.rx.client.admin.application-issues.case-submitted.message'
    }
};
//# sourceMappingURL=application-issues.constant.js.map