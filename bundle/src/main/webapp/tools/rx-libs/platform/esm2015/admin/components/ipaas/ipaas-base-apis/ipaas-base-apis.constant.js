import { AuthTypes } from './ipaas-base-apis.types';
const authTypeOptions = [
    {
        id: AuthTypes.ANONYMOUS,
        key: 'ANONYMOUS',
        labelKey: 'com.bmc.arsys.rx.client.admin.jitterbit-api-editor.anonymous.label'
    },
    {
        id: AuthTypes.BASIC,
        key: 'BASIC',
        labelKey: 'com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.basic.label'
    },
    {
        id: AuthTypes.APIKEY,
        key: 'APIKEY',
        labelKey: 'com.bmc.arsys.rx.client.admin.cognitive-service.api-key.label'
    },
    {
        id: AuthTypes.OAUTH2,
        key: 'OAUTH2',
        labelKey: 'com.bmc.arsys.rx.client.admin.jitterbit-api-editor.oauth.label'
    },
    {
        id: AuthTypes.CUSTOM,
        key: 'CUSTOM',
        labelKey: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.custom.label'
    }
];
export const RX_IPAAS_APIS = {
    fieldIds: {
        groupName: 71003,
        apiName: 71004,
        organization: 71001,
        environment: 71002,
        path: 71005,
        method: 71006
    },
    methods: {
        0: 'GET',
        10: 'POST',
        20: 'PUT',
        30: 'DELETE'
    },
    authTypeOptions,
    authTypeFields: {
        0: [],
        10: [
            {
                name: 'username',
                labelKey: 'com.bmc.arsys.rx.client.common.user-name.label',
                rxId: 'username',
                isRequired: true
            },
            {
                name: 'credentials',
                labelKey: 'com.bmc.arsys.rx.client.common.password.label',
                rxId: 'password',
                isPassword: true,
                isRequired: true
            }
        ],
        20: [
            {
                name: 'key',
                labelKey: 'com.bmc.arsys.rx.client.admin.jitterbit-api-editor.api-key-name.label',
                rxId: 'key',
                isRequired: true
            },
            {
                name: 'value',
                labelKey: 'com.bmc.arsys.rx.client.admin.jitterbit-api-editor.api-key-value.label',
                rxId: 'value',
                isPassword: true,
                isRequired: true
            }
        ],
        30: [
            {
                name: 'authServerEndpoint',
                labelKey: 'com.bmc.arsys.rx.client.admin.jitterbit-api-editor.auth-server-endpoint.label',
                rxId: 'authServerEndpoint',
                isRequired: true
            },
            {
                name: 'tokenPath',
                labelKey: 'com.bmc.arsys.rx.client.admin.jitterbit-api-editor.token-url.label',
                rxId: 'tokenPath',
                isRequired: true
            },
            {
                name: 'username',
                labelKey: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-id.label',
                rxId: 'username',
                isRequired: true
            },
            {
                name: 'credentials',
                labelKey: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-secret.label',
                rxId: 'credentials',
                isPassword: true,
                isRequired: true
            },
            {
                name: 'redirectUri',
                labelKey: 'com.bmc.arsys.rx.client.admin.web-api-connections.redirect-uri.label',
                rxId: 'redirectUri'
            },
            {
                name: 'scope',
                labelKey: 'com.bmc.arsys.rx.client.admin.web-api-connections.scope.label',
                rxId: 'scope'
            }
        ]
    }
};
//# sourceMappingURL=ipaas-base-apis.constant.js.map