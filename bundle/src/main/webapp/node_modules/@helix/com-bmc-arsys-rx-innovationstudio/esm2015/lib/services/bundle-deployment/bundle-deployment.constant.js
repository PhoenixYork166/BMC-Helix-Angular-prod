export const AX_BUNDLE_DEPLOYMENT = {
    deploymentStatuses: {
        succeeded: ['Deployed', 'DeployedWithImportWarning', 'Undeployed', 'PackageCreated', 'UndeployedVersion'],
        failed: ['Error', 'DeployedWithImportError'],
        pending: [
            'PendingDeploy',
            'ReadyDeploy',
            'Deploying',
            'PendingUndeploy',
            'ReadyUndeploy',
            'Undeploying',
            'PendingPackageCreate'
        ]
    },
    deploymentStatusPollInterval: 5000
};
//# sourceMappingURL=bundle-deployment.constant.js.map