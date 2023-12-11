export interface IServerResponseMessage {
    messageType?: string;
    messageNumber?: number;
    messageText?: string;
    appendedText?: string;
    operationId?: string;
    severity?: string;
    enableIssueReporting?: boolean;
}
export interface IErrorMessage {
    title: string;
    message: string;
}
