import { Injector } from '@angular/core';
import { IBundleDescriptor } from '@helix/platform/shared/api';
export declare class BundleDetails {
    private bundleDescriptor;
    private injector;
    id: string;
    hasCustomEntryPoint: boolean;
    friendlyName: string;
    description: string;
    type: string;
    version: string;
    developerId: string;
    developerName: string;
    isApplication: boolean;
    isActionMenuVisible: boolean;
    isBusinessAnalyst: boolean;
    isBundleFromCurrentOverlayGroup: boolean;
    isFoundationBundle: boolean;
    name: string;
    groupId: string;
    containsJavaScript: boolean;
    dependentBundles: IBundleDescriptor[];
    constructor(bundleDescriptor: IBundleDescriptor, injector: Injector);
}
