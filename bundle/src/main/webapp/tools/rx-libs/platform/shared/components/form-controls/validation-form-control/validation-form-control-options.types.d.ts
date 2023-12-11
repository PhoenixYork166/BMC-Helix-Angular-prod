export declare enum MessageType {
    Warning = "Warning",
    Success = "Success",
    Info = "Info",
    Error = "Error"
}
export interface IValidationFormControlOptions {
    text: string;
    propertyName?: string;
    componentGuid?: string;
    messageType?: MessageType;
    customStyle?: any;
}
