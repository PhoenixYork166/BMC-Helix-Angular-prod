export const RX_USER_MESSAGE = {
    title: 'com.bmc.arsys.rx.client.common.messages.label',
    showAll: 'com.bmc.arsys.rx.client.shell.notification.action.viewAll',
    dismissAll: 'com.bmc.arsys.rx.client.shell.notification.action.clearAll',
    noActiveMessage: 'com.bmc.arsys.rx.client.shell.notification.active.noNotifications.label',
    dismissMessage: 'com.bmc.arsys.rx.client.shell.notification.dismiss',
    loadMore: 'com.bmc.arsys.rx.client.shell.notification.action.loadMore',
    fetchMessageFrequency: 60000,
    messageTypes: {
        active: 'active',
        dismissed: 'dismissed'
    },
    definitions: {
        userMessage: {
            definitionName: 'UserMessage',
            dataPageType: 'com.bmc.arsys.rx.application.usermessage.datapage.UserMessageDataPageQuery',
            updateStateOfAllUserMessagesCommand: 'com.bmc.arsys.rx.application.usermessage.command.UpdateStateOfAllUserMessagesCommand',
            updateStateOfUserMessagesCommand: 'com.bmc.arsys.rx.application.usermessage.command.UpdateStateOfUserMessagesCommand',
            fields: {
                subject: '20000',
                body: '20001',
                recipient: '20002'
            },
            status: {
                unread: '0',
                read: '1',
                dismissed: '2'
            }
        }
    }
};
//# sourceMappingURL=user-message.constants.js.map