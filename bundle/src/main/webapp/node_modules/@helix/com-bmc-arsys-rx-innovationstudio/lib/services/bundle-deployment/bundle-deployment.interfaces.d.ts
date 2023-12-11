import { IBundleDescriptor, IBundleInfo } from '@helix/platform/shared/api';
import { KeyValueObject } from '@bmc-ux/adapt-angular';
export interface IWorkspaceBundle extends IBundleDescriptor {
    type: string;
    isEditable: boolean;
}
export interface IBundleCreateDescriptor extends IBundleInfo {
    name: string;
    developerId: string;
    isApplication: boolean;
}
export interface IDeploymentStatus {
    packageDeployStatus: string;
    packageExportStatus?: string;
    deploymentParsedStatus: IDeploymentParsedStatus;
    isFinished: boolean;
    errorMessage: string;
}
export interface IDeploymentParsedStatus {
    dataOverallImportStatus: string;
    definitionsOverallImportStatus: string;
    definitionsStatusContent: string[];
    errorMessages: string[];
    importingServer: string;
    tenantDataStatusContent: KeyValueObject[];
}
