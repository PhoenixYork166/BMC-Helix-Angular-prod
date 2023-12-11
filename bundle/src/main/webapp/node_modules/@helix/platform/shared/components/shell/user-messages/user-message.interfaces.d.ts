export interface IRxMessage {
    '6': string;
    '379': string;
    '20001': string;
    dismissInProgress: boolean;
}
export interface IRxActiveMessage {
    count: number;
    list: IRxMessage[];
    type: string;
}
export interface IRxMessages {
    messages: IRxMessage[];
    totalSize: number;
}
