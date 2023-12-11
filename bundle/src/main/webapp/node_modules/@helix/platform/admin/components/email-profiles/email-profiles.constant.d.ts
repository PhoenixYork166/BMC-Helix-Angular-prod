export declare const RX_EMAIL_PROFILES: {
    aliasMapping: {
        recordDefinitionName: string;
        queryExpression: string;
        fieldIds: {
            aliasType: {
                id: number;
                defaultValue: string;
            };
            applicationId: number;
            applicationName: number;
            aliasName: number;
            aliasValue: number;
            description: number;
            assignee: number;
            status: number;
        };
        mailboxType: {
            outgoing: number;
            incoming: number;
        };
        status: {
            new: number;
            assigned: number;
        };
    };
    mailbox: {
        recordDefinitionName: string;
        queryExpression: string;
        fieldIds: {
            mailboxName: {
                id: number;
                label: string;
            };
            mailboxFunction: number;
        };
        mailboxFunctions: {
            incoming: {
                id: number;
                label: string;
                value: string;
            };
            outgoing: {
                id: number;
                label: string;
                value: string;
            };
        };
    };
};
