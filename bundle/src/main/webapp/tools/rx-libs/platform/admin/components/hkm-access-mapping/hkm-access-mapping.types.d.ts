import { IRowDataItem } from '@helix/platform/view/api';
export interface IHkmPortals {
    portals: IHkmPortal[];
}
export interface IItsmCompanies {
    Companies: IItsmCompany[];
}
export interface IItsmCompany {
    permissionId: string;
    name: string;
    type: string;
    category: string;
    supportGroups: IItsmSupportGroup[];
}
export interface IItsmSupportGroup {
    requestId: string;
    supportGroupId: string;
    permissionGroup: string;
    permissionGroupId: string;
    description: string;
    viewAccess: string;
    supportCompany: string;
    supportGroupOrganization: string;
    supportGroupName: string;
    navigationTier1: string;
    navigationTier2: string;
    navigationTier3: string;
    navigationTier4: string;
    lineOfBusiness: string[];
    isCompany: boolean;
    id: string;
    appName: string;
    isMapped: boolean;
    appCompanyName: string;
    hkmportalName: string;
    hkmroleName: string;
    hkmgroupID: string;
    hkmgroupFoldersName: string;
    hkmgroupName: string;
}
export interface ILineOfBusiness {
    id: string;
    name: string;
}
export interface IHkmPortal {
    portalId: number;
    portalName: string;
    status: string;
    type: string;
    nodeId: number;
    userGroups: IHkmPortalUserGroup[];
}
export interface IHkmPortalUserGroup {
    id: number;
    name: string;
    status: string;
    type: string;
    role: string;
    portalId: number;
    portalNames: string[];
}
export interface IHkmFolder {
    nodeId: number;
    name: string;
    portalId: number;
    type: string;
    tag: string;
    isReadonly: boolean;
    haveAccess: boolean;
    hasFolderChildren: boolean;
}
export interface IHkmMappingConfiguration {
    AppName: string;
    IsMapped: boolean;
    AppCompanyName: string;
    AppGroupName: string;
    AppCompanyID: string;
    AppGroupID: string;
    HKMPortalName: string;
    HKMPortalID: string;
    HKMGroupName: string;
    HKMRoleName: string;
    HKMGroupFoldersNames: string[];
    HKMGroupID: string;
}
export declare enum PredefinedLobOptions {
    All = "$ALL$",
    None = "$NONE$"
}
export declare type ISupportGroupRow = IItsmSupportGroup & IRowDataItem;
