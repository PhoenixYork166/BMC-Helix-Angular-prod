import { IServerResponseMessage } from '../error-handling/error-handling.types';
export interface INotificationConfig {
    ttl?: number;
    suppressLog?: boolean;
    issue?: IServerResponseMessage;
}
