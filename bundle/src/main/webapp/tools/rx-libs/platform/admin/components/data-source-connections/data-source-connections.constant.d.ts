export declare const RX_DATA_SOURCE_CONNECTIONS: {
    recordDefinitionName: string;
    dataPageQueryType: string;
    dataSourceConnectionUrl: string;
    resourceTypes: {
        arSystem: {
            value: string;
            name: string;
        };
        custom: {
            value: string;
            name: string;
        };
        webApi: {
            value: string;
            name: string;
        };
    };
    authTypes: {
        name: string;
        value: string;
    }[];
    portMinValue: number;
    portMaxValue: number;
    hostNameMaxLength: number;
    pingConfigurationCommand: string;
    initialWizardContext: {
        dataSourceName: string;
        resourceType: {
            value: string;
            name: string;
        };
        hostName: string;
        portNumber: any;
        authType: string;
        rasPassword: string;
        enforceAuthorization: boolean;
        webApiDataSourceGuid: string;
        isEditMode: boolean;
        isGeneralFormPristine: boolean;
    };
};
