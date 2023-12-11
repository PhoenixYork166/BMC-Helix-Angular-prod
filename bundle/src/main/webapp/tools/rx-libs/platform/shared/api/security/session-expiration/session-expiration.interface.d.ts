export declare enum SessionExpirationType {
    Absolute = "Absolute",
    Idle = "Idle"
}
export interface SessionExpirationInfo {
    timeout: Date;
    timer: any;
}
