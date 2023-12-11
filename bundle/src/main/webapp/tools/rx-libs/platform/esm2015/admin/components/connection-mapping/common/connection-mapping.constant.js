import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export const RX_CONNECTION_MAPPING = {
    aliasTypes: {
        dataSource: 'DataSource',
        webRequest: 'WebRequest',
        connector: 'connector'
    },
    connector: {
        recordDefinitionName: 'Connector Configurations',
        fields: {
            status: RX_RECORD_DEFINITION.coreFieldIds.status,
            id: RX_RECORD_DEFINITION.coreFieldIds.id,
            target_name: 56110,
            connector_id: 56111,
            connector_name: 56112,
            connector_config_id: 56113,
            connector_config_name: 56114,
            connector_profile_id: 56115,
            connector_profile_Name: 56116
        }
    },
    webRequest: {
        recordDefinitionName: 'WebAPI Connection',
        fields: {
            authentication: 70034,
            hostname: 70030,
            id: RX_RECORD_DEFINITION.coreFieldIds.id,
            name: RX_RECORD_DEFINITION.coreFieldIds.description,
            port: 70031
        }
    },
    dataSource: {
        recordDefinitionName: 'Data Source',
        fields: {
            name: RX_RECORD_DEFINITION.coreFieldIds.description,
            id: RX_RECORD_DEFINITION.coreFieldIds.id,
            sourceType: 70051
        }
    },
    aliasMapping: {
        recordDefinitionName: 'Alias Mapping',
        queryExpression: "'56150' != 'email'",
        fields: {
            status: RX_RECORD_DEFINITION.coreFieldIds.status,
            id: RX_RECORD_DEFINITION.coreFieldIds.id,
            aliasType: 56150,
            aliasName: 56153,
            aliasValue: 56154,
            applicationId: 56151,
            applicationName: 56152
        }
    }
};
//# sourceMappingURL=connection-mapping.constant.js.map