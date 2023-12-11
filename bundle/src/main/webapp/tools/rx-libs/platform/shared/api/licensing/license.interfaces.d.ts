export interface ILicenseDataPageResult {
    data: ILicense[];
    totalSize?: number;
}
export interface ILicense {
    appLicenseDescriptors: ILicenseAppLicenseDescriptor[];
    bmcAppCount: number;
    customAppCount: number;
    helixPlatformAssignedLicenses: number;
    helixPlatformLicenses: number;
    name: string;
    partnerAppCount: number;
    serviceLicenseDescriptors: ILicenseServiceLicenseDescriptor[];
    serviceLicensedCount: number;
    tenantId: string;
}
export interface ILicenseServiceLicenseDescriptor {
    description: string;
    licensed: boolean;
    name: string;
    services: string[];
}
export interface ILicenseAppLicenseDescriptor {
    applicationName: string;
    applicationType: string;
    helixPlatformNamedLicenses: number;
}
