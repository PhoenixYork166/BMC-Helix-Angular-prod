const fieldIds = {
    hostname: 70030,
    port: 70031,
    protocol: 70032,
    authType: 70033,
    authentication: 70034
};
const authTypes = {
    basicAuth: 0,
    oAuth2: 1,
    rsso: 2,
    custom: 3,
    remedy: 11,
    oAuthTokenExchange: 12
};
const protocolTypes = {
    http: 0,
    https: 1
};
const protocolTypeOptions = [
    {
        id: protocolTypes.http,
        label: 'HTTP'
    },
    {
        id: protocolTypes.https,
        label: 'HTTPS'
    }
];
const grantTypeOptions = [
    {
        id: 0,
        label: 'client_credentials'
    }
];
const authTypeOptions = [
    {
        id: authTypes.basicAuth,
        label: 'Basic'
    },
    {
        id: authTypes.oAuth2,
        label: 'OAuth 2.0'
    },
    {
        id: authTypes.rsso,
        label: 'RSSO'
    },
    {
        id: authTypes.custom,
        label: 'Custom'
    },
    {
        id: authTypes.remedy,
        label: 'Remedy'
    },
    {
        id: authTypes.oAuthTokenExchange,
        label: 'OAuth token exchange'
    }
];
const webApiConnection = {
    authTypeCode: '',
    secure: '',
    name: '',
    hostname: '',
    port: '',
    authTypeDetails: {
        username: '',
        credentials: '',
        httpHeaders: [],
        queryParams: [],
        tokenFetchMechanism: 0,
        additionalFormParams: []
    }
};
const wizardSteps = [
    {
        title: 'General',
        fields: [
            {
                type: 'text',
                name: 'name',
                label: 'com.bmc.arsys.rx.client.common.name.label',
                rxId: 'name',
                required: true
            },
            {
                type: 'text',
                name: 'hostname',
                label: 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.host-name.label',
                rxId: 'host-name',
                required: true
            },
            {
                type: 'number',
                name: 'port',
                label: 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.port.label',
                rxId: 'port',
                minValue: 1,
                maxValue: 65535,
                required: true,
                allowScientific: false,
                allowIntegerOnly: true
            },
            {
                type: 'select',
                name: 'secure',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.protocol.label',
                rxId: 'protocol',
                selectOptions: protocolTypeOptions,
                required: true
            },
            {
                type: 'select',
                name: 'authTypeCode',
                label: 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.authentication.label',
                rxId: 'authentication',
                selectOptions: authTypeOptions,
                required: true
            }
        ],
        id: 'General',
        formName: 'generalConfigurationForm',
        isValid: true,
        isDirty: false
    },
    {
        title: 'Authentication',
        fields: [
            {
                type: 'text',
                name: 'username',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.login.label',
                rxId: 'login',
                required: true
            },
            {
                type: 'password',
                name: 'credentials',
                label: 'com.bmc.arsys.rx.client.common.password.label',
                rxId: 'password',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'HTTP headers',
                rxId: 'http-headers',
                required: true
            }
        ],
        id: 'Authentication',
        formName: 'authenticationConfigurationForm',
        isValid: true,
        isDirty: false
    }
];
const authTypeFields = [
    {
        id: authTypes.basicAuth,
        fields: [
            {
                type: 'text',
                name: 'username',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.login.label',
                rxId: 'login',
                required: true
            },
            {
                type: 'password',
                name: 'credentials',
                label: 'com.bmc.arsys.rx.client.common.password.label',
                rxId: 'password',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-http-headers.label',
                rxId: 'http-headers',
                required: true
            }
        ]
    },
    {
        id: authTypes.oAuth2,
        fields: [
            {
                type: 'select',
                name: 'grantType',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.grant-type.label',
                rxId: 'grant-type',
                selectOptions: grantTypeOptions,
                disabled: false,
                required: true
            },
            {
                type: 'text',
                name: 'tokenPath',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.access-token-url.label',
                rxId: 'access-token-url',
                required: true
            },
            {
                type: 'text',
                name: 'username',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-id.label',
                rxId: 'client-id',
                required: true
            },
            {
                type: 'password',
                name: 'credentials',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-secret.label',
                rxId: 'client-secret',
                required: true
            },
            {
                type: 'radio',
                name: 'tokenFetchMechanism',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.client-credentials-transfer-mechanism.label',
                rxId: 'token-fetch-mechanism',
                selectOptions: [
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.authorization-request-header.label',
                        value: 0
                    },
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.form-parameters.label',
                        value: 1
                    }
                ]
            },
            {
                type: 'text',
                name: 'redirectUri',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.redirect-uri.label',
                rxId: 'redirect-uri',
                required: false
            },
            {
                type: 'text',
                name: 'scope',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.scope.label',
                rxId: 'scope',
                required: false
            },
            {
                type: 'serverEndpointRadio',
                name: 'authServerEndpoint',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.authorization-server-endpoint.label',
                rxId: 'auth-server-endpoint',
                selectOptions: [
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.default-hostname.label',
                        value: 'Default'
                    },
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.custom.label',
                        value: 'Custom'
                    }
                ],
                placeholder: 'com.bmc.arsys.rx.client.admin.web-api-connections.authorization-server-endpoint.placeholder',
                referenceFieldName: 'hostname',
                tooltip: 'com.bmc.arsys.rx.client.admin.web-api-connections.authorization-server-endpoint.tooltip',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-http-headers.label',
                rxId: 'http-headers',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'additionalFormParams',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-form-parameters.label',
                rxId: 'additional-form-params'
            }
        ]
    },
    {
        id: authTypes.rsso,
        fields: [
            {
                type: 'text',
                name: 'loginName',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.login.label',
                rxId: 'login',
                required: true
            },
            {
                type: 'text',
                name: 'tokenPath',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.access-token-url.label',
                rxId: 'access-token-url',
                required: true
            },
            {
                type: 'text',
                name: 'username',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-id.label',
                rxId: 'client-id',
                required: true
            },
            {
                type: 'password',
                name: 'credentials',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-secret.label',
                rxId: 'client-secret',
                required: true
            },
            {
                type: 'serverEndpointRadio',
                name: 'authServerEndpoint',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.rsso-server-endpoint.label',
                rxId: 'auth-server-endpoint',
                referenceFieldName: 'hostname',
                selectOptions: [
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.default-hostname.label',
                        value: 'Default'
                    },
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.custom.label',
                        value: 'Custom'
                    }
                ],
                placeholder: 'com.bmc.arsys.rx.client.admin.web-api-connections.rsso-server-endpoint.placeholder',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-http-headers.label',
                rxId: 'http-headers',
                required: true
            }
        ]
    },
    {
        id: authTypes.custom,
        fields: [
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-http-headers.label',
                rxId: 'http-headers',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'queryParams',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-query-parameters.label',
                rxId: 'query-parameters',
                required: true
            }
        ]
    },
    {
        id: authTypes.remedy,
        fields: [
            {
                type: 'text',
                name: 'username',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.login.label',
                rxId: 'login',
                required: true
            },
            {
                type: 'password',
                name: 'credentials',
                label: 'com.bmc.arsys.rx.client.common.password.label',
                rxId: 'password',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-http-headers.label',
                rxId: 'http-headers',
                required: true
            }
        ]
    },
    {
        id: authTypes.oAuthTokenExchange,
        fields: [
            {
                type: 'text',
                name: 'loginName',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.login.label',
                rxId: 'login'
            },
            {
                type: 'text',
                name: 'tokenPath',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.access-token-url.label',
                rxId: 'access-token-url',
                required: true
            },
            {
                type: 'text',
                name: 'username',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-id.label',
                rxId: 'client-id',
                required: true
            },
            {
                type: 'password',
                name: 'credentials',
                label: 'com.bmc.arsys.rx.client.admin.rsso-auth.client-secret.label',
                rxId: 'client-secret',
                required: true
            },
            {
                type: 'text',
                name: 'resources',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.resources.label',
                rxId: 'resources',
                required: true,
                isUrl: true
            },
            {
                type: 'serverEndpointRadio',
                name: 'authServerEndpoint',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.oauth-token-exchange-server-endpoint.label',
                rxId: 'auth-server-endpoint',
                referenceFieldName: 'hostname',
                selectOptions: [
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.default-hostname.label',
                        value: 'Default'
                    },
                    {
                        label: 'com.bmc.arsys.rx.client.admin.web-api-connections.endpoint-type.custom.label',
                        value: 'Custom'
                    }
                ],
                placeholder: 'com.bmc.arsys.rx.client.admin.web-api-connections.oauth-token-exchange-server-endpoint.placeholder',
                required: true
            },
            {
                type: 'nameValuePairs',
                name: 'httpHeaders',
                label: 'com.bmc.arsys.rx.client.admin.web-api-connections.add-http-headers.label',
                rxId: 'http-headers',
                required: true
            }
        ]
    }
];
const authServerEndpoints = {
    default: 'Default',
    custom: 'Custom'
};
export const RX_WEB_API_CONNECTIONS = {
    recordDefinitionName: 'WebAPI Connection',
    passwordMask: '********',
    fieldIds: fieldIds,
    wizardContext: {
        wizardSteps,
        webApiConnection,
        isEditMode: false
    },
    protocolTypeOptions,
    authTypes,
    authTypeOptions,
    authTypeFields,
    grantTypeOptions,
    authServerEndpoints
};
//# sourceMappingURL=web-api-connections.constant.js.map