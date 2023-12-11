export declare const RX_USER_MESSAGE: {
    title: string;
    showAll: string;
    dismissAll: string;
    noActiveMessage: string;
    dismissMessage: string;
    loadMore: string;
    fetchMessageFrequency: number;
    messageTypes: {
        active: string;
        dismissed: string;
    };
    definitions: {
        userMessage: {
            definitionName: string;
            dataPageType: string;
            updateStateOfAllUserMessagesCommand: string;
            updateStateOfUserMessagesCommand: string;
            fields: {
                subject: string;
                body: string;
                recipient: string;
            };
            status: {
                unread: string;
                read: string;
                dismissed: string;
            };
        };
    };
};
