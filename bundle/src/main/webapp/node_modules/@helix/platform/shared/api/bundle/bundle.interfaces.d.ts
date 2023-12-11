import { RxBundleLoadType } from './bundle-load.types';
export interface IBundleContext {
    bundleId: string;
    isBundleCompiled: boolean;
    isFileLoaded: boolean;
    module?: any;
    message?: Error;
}
export interface IBundleInfo {
    id: string;
    friendlyName: string;
}
export interface IBundleUiOptions {
    viewComponents?: string[];
    viewActions?: string[];
    applicationInitializers?: string[];
    options: {
        loadJs: RxBundleLoadType;
        loadCss: RxBundleLoadType;
    };
}
export interface IBundleDescriptor extends IBundleInfo {
    containsAngular: boolean;
    containsJavaScript: boolean;
    dependentBundles?: IBundleDescriptor[];
    isApplication: boolean;
    isLicensed: boolean;
    otherBundles?: IBundleDescriptor[];
    lastDeployedTime: string;
    version: string;
    description: string;
    displayVersion?: string;
    developerName: string;
    overlayGroupId: string;
    customizationPerspective: string;
    hasCustomEntryPoint: boolean;
    developerId: string;
    platformBundle: boolean;
    groupId?: string;
    isDependedOn?: boolean;
    name?: string;
    type?: string;
    uiOptions?: IBundleUiOptions;
    showInAppLauncher?: boolean;
    localizedDisplayName?: string;
}
