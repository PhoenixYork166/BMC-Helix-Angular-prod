export declare const RX_CONNECTION_MAPPING: {
    aliasTypes: {
        dataSource: string;
        webRequest: string;
        connector: string;
    };
    connector: {
        recordDefinitionName: string;
        fields: {
            status: number;
            id: number;
            target_name: number;
            connector_id: number;
            connector_name: number;
            connector_config_id: number;
            connector_config_name: number;
            connector_profile_id: number;
            connector_profile_Name: number;
        };
    };
    webRequest: {
        recordDefinitionName: string;
        fields: {
            authentication: number;
            hostname: number;
            id: number;
            name: number;
            port: number;
        };
    };
    dataSource: {
        recordDefinitionName: string;
        fields: {
            name: number;
            id: number;
            sourceType: number;
        };
    };
    aliasMapping: {
        recordDefinitionName: string;
        queryExpression: string;
        fields: {
            status: number;
            id: number;
            aliasType: number;
            aliasName: number;
            aliasValue: number;
            applicationId: number;
            applicationName: number;
        };
    };
};
