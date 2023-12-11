const passwordMask = '********';
const urlPattern = /^((http[s]?):\/)\/?([^:\/\s]+)((\/\w+)*\/)?([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
export const RX_COGNITIVE_SERVICE = {
    passwordMask: passwordMask,
    credentialsProvider: 'WATSON',
    nativeProvider: 'NATIVE',
    chatbot: {
        chatContextVariablesProcessName: 'chatContextVariablesProcessName',
        systemSettings: {
            chatSessionIdleTimeout: 900,
            chatUserIdleTimeout: 30,
            chatbotNotificationsIdleTime: 900,
            chatbotNotificationsMaxTime: 3600,
            chatContextVariablesProcessName: '',
            removePoweredByBmcHelix: 0
        }
    },
    cognitiveAdministrationCredentials: {
        systemSettingsKey: 'cognitiveAdminTenantCredential',
        cognitiveAdminPlatformApiKey: 'cognitiveAdminPlatformApiKey',
        payload: {
            WATSON: {
                cognitiveAdminPlatformApiKey: passwordMask
            }
        }
    },
    connections: {
        systemSettingKeys: {
            helixPortalUrl: 'helixPortalUrl',
            helixServiceCredential: 'helixServiceCredential',
            cognitiveServiceCredential: 'cognitiveServiceCredential',
            classificationServiceProvider: 'classificationServiceProvider',
            translationServiceProvider: 'translationServiceProvider',
            serviceAccountCredential: 'gcpServiceCredential',
            google: 'gcpTranslationServiceCredential',
            microsoft: 'microsoftServiceCredential'
        },
        cognitiveServiceCredentialKeys: {
            classification: 'naturalLanguageClassifierAPIKey',
            discovery: 'searchAPIKey',
            toneAnalyzer: 'toneAnalyzerAPIKey'
        },
        payload: {
            helixClassifierKey: '',
            helixClassifierSecret: '',
            naturalLanguageClassifierAPIKey: '',
            searchAPIKey: '',
            toneAnalyzerAPIKey: '',
            serviceAccountCredentials: '',
            apiKey: ''
        },
        serviceDefinitions: {
            helixClassifier: {
                id: 'helixClassifier',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.helix-ade.title',
                isOpen: true,
                isApiKeyTest: true,
                serviceType: 'NATURAL_LANGUAGE_CLASSIFIER',
                fields: [
                    {
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.helix-portal-url.label',
                        name: 'helixPortalUrl',
                        readonly: true,
                        type: 'text',
                        required: false
                    },
                    {
                        name: 'helixClassifierKey',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.access-key.label',
                        type: 'text',
                        required: true,
                        rxId: 'accessKey'
                    },
                    {
                        name: 'helixClassifierSecret',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.secret-key.label',
                        type: 'password',
                        required: true,
                        rxId: 'secretKey'
                    }
                ]
            },
            classification: {
                id: 'classification',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.ibm-watson-assistant.title',
                model: 'naturalLanguageClassifierAPIKey',
                isOpen: true,
                isApiKeyTest: true,
                serviceType: 'NATURAL_LANGUAGE_CLASSIFIER',
                fields: [
                    {
                        name: 'naturalLanguageClassifierAPIKey',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.api-key.label',
                        type: 'password',
                        required: true,
                        rxId: 'api-key'
                    }
                ]
            },
            serviceAccountCredentials: {
                id: 'serviceAccountCredentials',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.bmc-native.title',
                model: 'serviceAccountCredentials',
                isOpen: true,
                isApiKeyTest: true,
                serviceType: 'NATURAL_LANGUAGE_CLASSIFIER',
                fields: [
                    {
                        name: 'serviceAccountCredentials',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.service-account-credentials.api-key.label',
                        type: 'json',
                        required: true,
                        rxId: 'api-key',
                        jsonValidatorErrorMessage: 'Credentials are invalid.'
                    }
                ]
            },
            discovery: {
                id: 'discovery',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.ibm-watson-discovery.title',
                model: 'searchAPIKey',
                isOpen: false,
                isApiKeyTest: true,
                serviceType: 'SEARCH',
                fields: [
                    {
                        name: 'searchAPIKey',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.api-key.label',
                        type: 'password',
                        required: true,
                        rxId: 'api-key'
                    }
                ]
            },
            toneAnalyzer: {
                id: 'toneAnalyzer',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.ibm-watson-tone-analyzer.title',
                model: 'toneAnalyzerAPIKey',
                isOpen: false,
                isApiKeyTest: true,
                serviceType: 'TONE_ANALYZER',
                fields: [
                    {
                        name: 'toneAnalyzerAPIKey',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.api-key.label',
                        type: 'password',
                        required: true,
                        rxId: 'api-key'
                    }
                ]
            },
            microsoft: {
                id: 'microsoft',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.microsoft-translator.title',
                isOpen: false,
                isApiKeyTest: false,
                fields: [
                    {
                        name: 'apiKey',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.service-account-credentials.microsoft-azure-api-key.label',
                        type: 'password',
                        required: true,
                        rxId: 'microsoft-azure-api-key'
                    },
                    {
                        name: 'serviceURL',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.service-account-credentials.service-url.label',
                        type: 'text',
                        required: true,
                        pattern: urlPattern,
                        rxId: 'microsoft-translator-service-url'
                    },
                    {
                        name: 'authURL',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.service-account-credentials.oauth-url.label',
                        type: 'text',
                        required: true,
                        pattern: urlPattern,
                        rxId: 'microsoft-translator-oauth-url'
                    }
                ]
            },
            google: {
                id: 'google',
                title: 'com.bmc.arsys.rx.client.admin.cognitive-service.google-translation.title',
                model: 'apiKey',
                isOpen: false,
                isApiKeyTest: false,
                fields: [
                    {
                        name: 'apiKey',
                        label: 'com.bmc.arsys.rx.client.admin.cognitive-service.google-cloud-service-key.label',
                        type: 'json',
                        required: true,
                        rxId: 'google-cloud-service-key',
                        jsonValidatorErrorMessage: 'Service key is invalid.'
                    }
                ]
            }
        }
    },
    cognitiveServiceRegions: {
        systemSettingsKey: 'cognitiveServiceRegionTenantConfiguration',
        settings: [
            { id: 'naturalLanguageClassifier', name: 'Natural language classification' },
            { id: 'conversation', name: 'Chatbot' },
            { id: 'search', name: 'Cognitive search' },
            { id: 'toneAnalyzer', name: 'Tone analysis' }
        ]
    },
    toneAnalyzer: {
        systemSettingsKey: 'toneScoreThreshold'
    },
    summarization: {
        systemSettingsKey: 'summarizationServiceTenantConfiguration'
    },
    onboard: {
        cognitiveProvidersList: [
            {
                id: 'watson',
                name: 'IBM Watson'
            }
        ],
        providers: {
            watson: 'WATSON'
        },
        providerServices: {
            watson: {
                naturalLanguageClassifier: {
                    id: 'naturalLanguageClassifier',
                    apiKeyPropertyName: 'naturalLanguageClassifierAPIKey',
                    regionPropertyName: 'naturalLanguageClassifierRegion',
                    switchLabel: 'com.bmc.arsys.rx.client.admin.cognitive-service.ibm-watson-assistant.title'
                },
                conversation: {
                    id: 'conversation',
                    apiKeyPropertyName: 'conversationAPIKey',
                    regionPropertyName: 'conversationRegion',
                    switchLabel: 'com.bmc.arsys.rx.client.admin.cognitive-service.ibm-watson-assistant-for-chatbot.message',
                    tooltipText: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.conversation.tooltip'
                },
                toneAnalyzer: {
                    id: 'toneAnalyzer',
                    apiKeyPropertyName: 'toneAnalyzerAPIKey',
                    regionPropertyName: 'toneAnalyzerRegion',
                    switchLabel: 'com.bmc.arsys.rx.client.admin.cognitive-service.ibm-watson-tone-analyzer.title'
                }
            }
        }
    },
    cognitiveServicesList: [
        {
            id: 'chatbot',
            name: 'com.bmc.arsys.rx.client.admin.chatbots.chatbot.title'
        },
        {
            id: 'cognitiveAdministrationCredentials',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.cognitive-administration-credentials.title'
        },
        {
            id: 'connections',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.cognitive-service-connections.title'
        },
        {
            id: 'summarization',
            name: 'com.bmc.arsys.rx.client.admin.summarization-service-configuration.title'
        },
        {
            id: 'cognitiveServiceRegions',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.regions.title'
        },
        {
            id: 'toneAnalyzerConfiguration',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.tone-analyzer.title'
        }
    ],
    regionsList: [
        {
            id: 'EU_DE',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.region.germany.label'
        },
        {
            id: 'AU_SYD',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.region.sydney.label'
        },
        {
            id: 'US_EAST',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.region.us-east.label'
        },
        {
            id: 'US_SOUTH',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.region.us-south.label'
        },
        {
            id: 'EU_GB',
            name: 'com.bmc.arsys.rx.client.admin.cognitive-service.region.uk.label'
        }
    ],
    notificationMessages: {
        chatProviderSettingsSaved: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.chat-provider-settings-saved.message',
        cognitiveAdministrationCredentialsSaved: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.cognitive-administration-credentials-saved.message',
        toneAnalyzerConfigurationSaved: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.tone-analyzer-configuration-saved.message',
        serviceRegionConfigurationSaved: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.service-region-configuration-saved.message',
        serviceConnectionSaved: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.service-connection-saved.message',
        summarizationConfigurationSaved: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.summarization-configuration-saved.message',
        serviceOnboarded: 'com.bmc.arsys.rx.client.admin.cognitive-service.provider.service-onboarded.message'
    }
};
//# sourceMappingURL=cognitive-service.constant.js.map