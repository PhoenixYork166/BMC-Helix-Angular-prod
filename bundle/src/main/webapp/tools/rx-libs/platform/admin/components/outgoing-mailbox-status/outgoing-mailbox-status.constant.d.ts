import moment from 'moment-es6';
export declare const RX_OUTGOING_MAILBOX_STATUS: {
    availableTimeFrames: {
        id: string;
        name: string;
        duration: moment.Duration;
    }[];
    fields: {
        mailboxName: string;
        pending: string;
        sent: string;
        error: string;
    };
};
