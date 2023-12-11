const fieldIds = {
    clientId: 1780,
    clientSecret: 1781,
    apiAuthorizationEndpoint: 1782,
    oAuthProvider: 1783,
    resourceServer: 1784,
    bundleId: 61001
};
const sections = [
    {
        title: 'com.bmc.arsys.rx.client.admin.rsso-auth.bmc-helix-digital-workplace.title',
        isOpen: true,
        isSaveInProgress: false,
        recordInstanceId: '',
        rxId: 'digital-workplace',
        fields: [
            {
                id: fieldIds.apiAuthorizationEndpoint,
                type: 'text',
                name: 'API authorization endpoint',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.api-authorization-endpoint-url.label',
                rxId: 'api-auth-endpoint'
            },
            {
                id: fieldIds.resourceServer,
                type: 'text',
                name: 'Resource server',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.resource-server.label',
                rxId: 'resource-server'
            },
            {
                id: fieldIds.clientId,
                type: 'text',
                name: 'Client ID',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-id.label',
                rxId: 'client-id'
            },
            {
                id: fieldIds.clientSecret,
                type: 'password',
                name: 'Client secret',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-secret.label',
                rxId: 'client-secret'
            }
        ],
        formName: 'digitalWorkplaceForm',
        oAuthProvider: 'RSSO OAuth'
    },
    {
        title: 'com.bmc.arsys.rx.client.admin.rsso-auth.bmc-helix-cloud-cost.title',
        isOpen: true,
        isSaveInProgress: false,
        recordInstanceId: '',
        rxId: 'cloud-cost',
        fields: [
            {
                id: fieldIds.apiAuthorizationEndpoint,
                type: 'text',
                name: 'API authorization endpoint',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.api-authorization-endpoint-url.label',
                rxId: 'api-auth-endpoint'
            },
            {
                id: fieldIds.resourceServer,
                type: 'text',
                name: 'Resource server',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.resource-server.label',
                rxId: 'resource-server'
            },
            {
                id: fieldIds.clientId,
                type: 'text',
                name: 'Client ID',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-id.label',
                rxId: 'client-id'
            },
            {
                id: fieldIds.clientSecret,
                type: 'password',
                name: 'Client secret',
                value: '',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-secret.label',
                rxId: 'client-secret'
            }
        ],
        formName: 'cloudCostForm',
        oAuthProvider: 'Cloud Cost RSSO'
    }
];
export const RX_RSSO_OAUTH = {
    recordDefinitionName: 'OAuth Configuration',
    oAuthConfigurationDescription: 'oauth-configuration',
    fieldIds: {
        bundleId: fieldIds.bundleId,
        oAuthProvider: fieldIds.oAuthProvider
    },
    sections
};
//# sourceMappingURL=rsso-oauth.constant.js.map