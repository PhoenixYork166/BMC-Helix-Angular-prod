export interface IEditRecordsActionResponseMessage {
    messageType: string;
    messageText: string;
    appendedText: string;
}
export interface IEditRecordsActionResponse {
    recordInstanceIds: string[];
    body: IEditRecordsActionUpdateFailures[];
}
interface IEditRecordsActionUpdateFailures {
    messageType: string;
}
export {};
