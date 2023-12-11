export const RX_COGNITIVE_SEARCH = {
    definitionName: 'Cognitive Service Data Set Descriptor',
    resourceType: 'com.bmc.arsys.rx.services.cognitive.domain.SearchDataSource',
    queryExpression: "'1732' = 2 AND '61001' = ",
    defaultLocale: 'en',
    maxCollectionsPerProject: 5,
    datasetTypes: {
        bmcHelixPlatForm: 0,
        external: 10
    },
    searchDatasetTypeOptions: [
        {
            displayName: 'com.bmc.arsys.rx.client.admin.cognitive-search.bmc-helix-platform-data-set.label',
            datasetType: 0
        },
        {
            displayName: 'com.bmc.arsys.rx.client.admin.cognitive-search.external-data-set.label',
            datasetType: 10
        }
    ],
    externalDatasetSourceTypes: {
        rkm: '10',
        other: '20'
    },
    fields: {
        datasetId: 1730,
        datasetName: 1731,
        searchType: 1732,
        datasetError: 1733,
        dateLastSubmitted: 1735,
        bundleId: 61001,
        locale: 1737,
        dataSource: 1738,
        newDatasetId: 1740,
        searchDatasetType: 1815,
        externalDatasetSource: 1817,
        confidenceThreshold: 1821,
        projectId: 1832
    },
    datasetStatus: {
        failed: {
            id: 3,
            label: 'com.bmc.arsys.rx.client.admin.cognitive-search.failed.label',
            variant: 'danger'
        },
        inProgress: {
            id: 5,
            label: 'com.bmc.arsys.rx.client.admin.cognitive-search.in-progress.label',
            variant: 'info'
        },
        created: {
            id: 6,
            label: 'com.bmc.arsys.rx.client.admin.cognitive-search.created.label',
            variant: 'success'
        }
    },
    templateFields: {
        templateType: 1818
    },
    templateTypes: {
        webChannel: '10',
        nonWebChannel: '20'
    },
    templateDefinitionName: 'Cognitive Service Chatbot Knowledge Article Template',
    templateAssociationDefinitionName: 'Cognitive Service Data Set To Cognitive Service Chatbot Knowledge Article Template'
};
//# sourceMappingURL=cognitive-search.constant.js.map