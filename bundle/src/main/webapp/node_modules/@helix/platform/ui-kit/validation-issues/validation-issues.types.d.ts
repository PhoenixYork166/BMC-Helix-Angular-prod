export interface IValidationIssueSection {
    title: string;
    issues: IValidationIssue[];
}
export interface IValidationIssue {
    type: ValidationIssueType;
    description: string;
    data: any;
    disableCorrection?: boolean;
}
export declare enum ValidationIssueType {
    Warning = "warning",
    Error = "error"
}
