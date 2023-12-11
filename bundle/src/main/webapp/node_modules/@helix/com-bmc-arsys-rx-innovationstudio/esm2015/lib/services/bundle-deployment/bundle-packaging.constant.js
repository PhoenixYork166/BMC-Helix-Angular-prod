import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export const AX_BUNDLE_PACKAGING = {
    packageRegistry: {
        recordDefinitionName: 'BundleDeploy:PackageRegistry',
        fieldIds: {
            deployError: 3292,
            type: 3303,
            bundlePackageDescriptor: 3311,
            name: 3276,
            packageDeployStatus: RX_RECORD_DEFINITION.coreFieldIds.status
        }
    },
    packageTypes: {
        content: 3
    }
};
//# sourceMappingURL=bundle-packaging.constant.js.map