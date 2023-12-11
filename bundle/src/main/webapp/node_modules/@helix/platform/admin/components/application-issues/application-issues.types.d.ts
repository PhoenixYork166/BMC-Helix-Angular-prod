export interface IIssueReportingInfo {
    configured: boolean;
    authorizeURL: string;
    resourceServer: string;
    grant_type: string;
}
export interface IErrorReportingValue {
    supportCentralUrl?: string;
}
export interface IIssuesResource {
    issueReportingInfo: IIssueReportingInfo;
    errorReportingValue: IErrorReportingValue;
}
export interface IIssueSeverity {
    name: string;
    id: number;
}
