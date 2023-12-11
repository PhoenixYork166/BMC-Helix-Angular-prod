export interface IUser {
    editableBundles?: string[];
    preferredLocale: string;
    preferredUserLocale: string;
    fullName: string;
    loginName: string;
    password: string;
    userId: string;
    emailAddress: string;
    groups: string[];
    defaultNotifyMechanism: string;
    forcePasswordChangeOnLogin: boolean;
    createdBy: string;
    permittedGroupsBySecurityLabels: {};
    permittedUsersBySecurityLabels: {};
    disablePasswordManagementForUser: boolean;
    lastPasswordChange: Date;
    defaultOverlayGroupId: string;
    userOverlayGroupDescriptors: IUserOverlayGroupDescriptor[];
    personInstanceId: string;
    ssoProviderType: string;
    computedGroups: string[];
    assignmentAvailable?: boolean;
    supportStaff?: boolean;
    licenseType: string;
    isAdministrator: boolean;
    isBusinessAnalyst: boolean;
    functionalRoles: string[];
    modifiedDate: Date;
}
export interface IUserOverlayGroupDescriptorChildren {
    overlayGroupId: string;
    overlayGroupName: string;
    tenantId: string;
    tenantName: string;
    userOverlayGroupDescriptorChildren: any[];
    isWritable: boolean;
    isShared: boolean;
}
export interface IUserOverlayGroupDescriptor {
    overlayGroupId: string;
    overlayGroupName: string;
    tenantId: string;
    tenantName: string;
    userOverlayGroupDescriptorChildren: IUserOverlayGroupDescriptorChildren[];
    isWritable: boolean;
    isShared: boolean;
}
