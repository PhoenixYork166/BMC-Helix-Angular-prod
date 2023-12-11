export declare const RX_COGNITIVE_SERVICE: {
    passwordMask: string;
    credentialsProvider: string;
    nativeProvider: string;
    chatbot: {
        chatContextVariablesProcessName: string;
        systemSettings: {
            chatSessionIdleTimeout: number;
            chatUserIdleTimeout: number;
            chatbotNotificationsIdleTime: number;
            chatbotNotificationsMaxTime: number;
            chatContextVariablesProcessName: string;
            removePoweredByBmcHelix: number;
        };
    };
    cognitiveAdministrationCredentials: {
        systemSettingsKey: string;
        cognitiveAdminPlatformApiKey: string;
        payload: {
            WATSON: {
                cognitiveAdminPlatformApiKey: string;
            };
        };
    };
    connections: {
        systemSettingKeys: {
            helixPortalUrl: string;
            helixServiceCredential: string;
            cognitiveServiceCredential: string;
            classificationServiceProvider: string;
            translationServiceProvider: string;
            serviceAccountCredential: string;
            google: string;
            microsoft: string;
        };
        cognitiveServiceCredentialKeys: {
            classification: string;
            discovery: string;
            toneAnalyzer: string;
        };
        payload: {
            helixClassifierKey: string;
            helixClassifierSecret: string;
            naturalLanguageClassifierAPIKey: string;
            searchAPIKey: string;
            toneAnalyzerAPIKey: string;
            serviceAccountCredentials: string;
            apiKey: string;
        };
        serviceDefinitions: {
            helixClassifier: {
                id: string;
                title: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                serviceType: string;
                fields: ({
                    label: string;
                    name: string;
                    readonly: boolean;
                    type: string;
                    required: boolean;
                    rxId?: undefined;
                } | {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                    readonly?: undefined;
                })[];
            };
            classification: {
                id: string;
                title: string;
                model: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                serviceType: string;
                fields: {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                }[];
            };
            serviceAccountCredentials: {
                id: string;
                title: string;
                model: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                serviceType: string;
                fields: {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                    jsonValidatorErrorMessage: string;
                }[];
            };
            discovery: {
                id: string;
                title: string;
                model: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                serviceType: string;
                fields: {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                }[];
            };
            toneAnalyzer: {
                id: string;
                title: string;
                model: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                serviceType: string;
                fields: {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                }[];
            };
            microsoft: {
                id: string;
                title: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                fields: ({
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                    pattern?: undefined;
                } | {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    pattern: RegExp;
                    rxId: string;
                })[];
            };
            google: {
                id: string;
                title: string;
                model: string;
                isOpen: boolean;
                isApiKeyTest: boolean;
                fields: {
                    name: string;
                    label: string;
                    type: string;
                    required: boolean;
                    rxId: string;
                    jsonValidatorErrorMessage: string;
                }[];
            };
        };
    };
    cognitiveServiceRegions: {
        systemSettingsKey: string;
        settings: {
            id: string;
            name: string;
        }[];
    };
    toneAnalyzer: {
        systemSettingsKey: string;
    };
    summarization: {
        systemSettingsKey: string;
    };
    onboard: {
        cognitiveProvidersList: {
            id: string;
            name: string;
        }[];
        providers: {
            watson: string;
        };
        providerServices: {
            watson: {
                naturalLanguageClassifier: {
                    id: string;
                    apiKeyPropertyName: string;
                    regionPropertyName: string;
                    switchLabel: string;
                };
                conversation: {
                    id: string;
                    apiKeyPropertyName: string;
                    regionPropertyName: string;
                    switchLabel: string;
                    tooltipText: string;
                };
                toneAnalyzer: {
                    id: string;
                    apiKeyPropertyName: string;
                    regionPropertyName: string;
                    switchLabel: string;
                };
            };
        };
    };
    cognitiveServicesList: {
        id: string;
        name: string;
    }[];
    regionsList: {
        id: string;
        name: string;
    }[];
    notificationMessages: {
        chatProviderSettingsSaved: string;
        cognitiveAdministrationCredentialsSaved: string;
        toneAnalyzerConfigurationSaved: string;
        serviceRegionConfigurationSaved: string;
        serviceConnectionSaved: string;
        summarizationConfigurationSaved: string;
        serviceOnboarded: string;
    };
};
