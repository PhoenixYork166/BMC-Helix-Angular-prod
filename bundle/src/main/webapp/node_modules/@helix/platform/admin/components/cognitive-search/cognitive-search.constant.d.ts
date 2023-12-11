export declare const RX_COGNITIVE_SEARCH: {
    definitionName: string;
    resourceType: string;
    queryExpression: string;
    defaultLocale: string;
    maxCollectionsPerProject: number;
    datasetTypes: {
        bmcHelixPlatForm: number;
        external: number;
    };
    searchDatasetTypeOptions: {
        displayName: string;
        datasetType: number;
    }[];
    externalDatasetSourceTypes: {
        rkm: string;
        other: string;
    };
    fields: {
        datasetId: number;
        datasetName: number;
        searchType: number;
        datasetError: number;
        dateLastSubmitted: number;
        bundleId: number;
        locale: number;
        dataSource: number;
        newDatasetId: number;
        searchDatasetType: number;
        externalDatasetSource: number;
        confidenceThreshold: number;
        projectId: number;
    };
    datasetStatus: {
        failed: {
            id: number;
            label: string;
            variant: string;
        };
        inProgress: {
            id: number;
            label: string;
            variant: string;
        };
        created: {
            id: number;
            label: string;
            variant: string;
        };
    };
    templateFields: {
        templateType: number;
    };
    templateTypes: {
        webChannel: string;
        nonWebChannel: string;
    };
    templateDefinitionName: string;
    templateAssociationDefinitionName: string;
};
