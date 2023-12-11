import { head } from 'lodash';
const resourceTypes = {
    arSystem: {
        value: 'com.bmc.arsys.rx.services.datasource.domain.ARSystemDataSource',
        name: 'com.bmc.arsys.rx.client.admin.data-source-connections.ar-system.label'
    },
    custom: {
        value: 'com.bmc.arsys.rx.services.datasource.domain.CustomDataSource',
        name: 'com.bmc.arsys.rx.client.admin.data-source-connections.custom.label'
    },
    webApi: {
        value: 'com.bmc.arsys.rx.services.datasource.domain.WebApiDataSource',
        name: 'com.bmc.arsys.rx.client.admin.data-source-connections.web-api.label'
    }
};
const authTypes = [
    {
        name: 'com.bmc.arsys.rx.client.admin.data-source-connections.rsso.label',
        value: 'rsso'
    },
    {
        name: 'com.bmc.arsys.rx.client.admin.data-source-connections.ras.label',
        value: 'ras'
    }
];
export const RX_DATA_SOURCE_CONNECTIONS = {
    recordDefinitionName: 'Data Source',
    dataPageQueryType: 'com.bmc.arsys.rx.application.datasource.datapage.DataSourceDataPageQuery',
    dataSourceConnectionUrl: '/api/rx/application/datasource/configuration',
    resourceTypes,
    authTypes,
    portMinValue: 0,
    portMaxValue: 65535,
    hostNameMaxLength: 254,
    pingConfigurationCommand: 'com.bmc.arsys.rx.application.datasource.command.ValidateDataSourceCommand',
    initialWizardContext: {
        dataSourceName: '',
        resourceType: resourceTypes.arSystem,
        hostName: '',
        portNumber: null,
        authType: head(authTypes).name,
        rasPassword: '',
        enforceAuthorization: false,
        webApiDataSourceGuid: '',
        isEditMode: false,
        isGeneralFormPristine: true
    }
};
//# sourceMappingURL=data-source-connections.constant.js.map