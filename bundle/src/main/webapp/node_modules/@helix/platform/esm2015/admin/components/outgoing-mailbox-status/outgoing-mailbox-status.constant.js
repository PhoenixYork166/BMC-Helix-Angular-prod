import moment from 'moment-es6';
export const RX_OUTGOING_MAILBOX_STATUS = {
    availableTimeFrames: [
        {
            id: '1',
            name: 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.last-hour.label',
            duration: moment.duration(1, 'hour')
        },
        {
            id: '2',
            name: 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.last-three-hours.label',
            duration: moment.duration(3, 'hour')
        },
        {
            id: '3',
            name: 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.last-day.label',
            duration: moment.duration(1, 'day')
        },
        {
            id: '4',
            name: 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.last-week.label',
            duration: moment.duration(1, 'week')
        },
        {
            id: '5',
            name: 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.last-month.label',
            duration: moment.duration(1, 'month')
        }
    ],
    fields: {
        mailboxName: 'MailBoxName',
        pending: 'Pending',
        sent: 'Sent',
        error: 'Error'
    }
};
//# sourceMappingURL=outgoing-mailbox-status.constant.js.map