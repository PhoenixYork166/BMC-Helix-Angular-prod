import { IBundleDescriptor } from '@helix/platform/shared/api';
export declare enum BundleDefinitionTab {
    Records = "record-definitions",
    Views = "view-definitions",
    Processes = "process-definitions",
    Rules = "rule-definitions",
    Associations = "association-definitions",
    NamedLists = "named-list-definitions",
    Documents = "document-definitions",
    WebAPIs = "web-api-definitions",
    Events = "event-definitions",
    EventStatistics = "event-statistics-definitions",
    Chatbots = "chatbot-definitions",
    Configurations = "config-definitions"
}
export declare enum PackageTypes {
    Content = "CONTENT",
    Install = "INSTALL",
    Update = "UPDATE"
}
export interface IDefinitionActionConfig {
    labelKey?: string;
    rxId?: string;
    id?: string;
    isDisabled?: boolean;
    icon?: string;
    groupTitle?: string;
    subActions?: IDefinitionActionConfig[];
}
export interface IDeploymentPackageDescriptor {
    approvalConfigurationQueryOptions?: any;
    containsJavaScript: boolean;
    dataImportOptionsByRecordDefinitionName: {};
    definitionsToDeployByType: {};
    definitionsToDeleteByType: {};
    dependentBundles?: {
        id: string;
        name: string;
        version: string;
    }[];
    description: string;
    duplicateDataActionTypeForConfigurationData: string;
    developerName: string;
    friendlyName: string;
    hasCustomEntryPoint: boolean;
    id: string;
    isApplication: boolean;
    isConfigurationDataIncluded: boolean;
    name: string;
    overlayGroupId: string;
    packageType: PackageTypes;
    bundleUpdateFromVersion?: string;
    userRequestedDependentBundles: null;
    version: string;
}
export interface IUpdateDeploymentPackageDescriptor extends IDeploymentPackageDescriptor {
    bundleUpdateFromVersion: string;
}
export interface IContentDeploymentPackageDescriptor extends IDeploymentPackageDescriptor {
    customPackageName: string;
}
export interface ICreateInstallPackageContext {
    bundleDetails: IBundleDescriptor;
    cache?: any;
    bundleDescriptors: IBundleDescriptor[];
    deploymentPackageDescriptor: IDeploymentPackageDescriptor;
    isPackageDataModified?: boolean;
    packageGuid?: string;
}
export interface ICreateUpdatePackageContext extends ICreateInstallPackageContext {
    deploymentPackageDescriptor: IUpdateDeploymentPackageDescriptor;
}
export interface ICreateContentPackageContext extends ICreateInstallPackageContext {
    bundleFriendlyNamesById: {
        [id: string]: string;
    };
    deploymentPackageDescriptor: IContentDeploymentPackageDescriptor;
}
