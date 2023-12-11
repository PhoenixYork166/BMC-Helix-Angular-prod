import { RxSelectOptionsGroup } from '@bmc-ux/adapt-angular';
export interface IApprovalNotification {
    notificationName: string;
    primaryRecordName: string;
    processList?: string[];
    rxProcessName?: string;
    notifyOn?: string;
    sendTo?: string;
    sendToOthers?: string;
    notificationMethod?: string;
    additionalQualification?: string;
    subject?: string;
    status?: string;
    notificationType?: number;
    message?: string;
    useTemplate?: string;
    emailProfile?: string;
    emailProfileGuid?: string;
    approvalTemplateName?: string;
    approvalTemplateGuid?: string;
    notificationGuid?: string;
}
export interface IApprovalTemplate {
    name?: string;
    guid?: string;
}
export interface IApprovalNotificationData {
    approvalNotification?: IApprovalNotification;
    recordDefinitions?: RxSelectOptionsGroup[];
    templateList?: IApprovalTemplate[];
}
