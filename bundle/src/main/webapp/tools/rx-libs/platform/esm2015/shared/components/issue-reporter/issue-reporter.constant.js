export const RX_ISSUE_REPORTER = {
    recordDefinitionName: 'Reported Errors',
    recordFields: {
        operationId: {
            id: 70100,
            name: 'operationId'
        },
        applicationName: {
            id: 70101,
            name: 'applicationName'
        },
        messageType: {
            id: 70102,
            name: 'messageType'
        },
        messageNumber: {
            id: 70103,
            name: 'messageNumber'
        },
        messageText: {
            id: 70104,
            name: 'messageText'
        },
        details: {
            id: 70109,
            name: 'details'
        }
    },
    messageTypeOptions: { INFO: 0, WARNING: 1, ERROR: 2 }
};
//# sourceMappingURL=issue-reporter.constant.js.map