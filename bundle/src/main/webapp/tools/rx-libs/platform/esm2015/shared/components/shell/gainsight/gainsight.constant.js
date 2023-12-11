import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { AdaptRadarHostingType } from '@bmc-ux/adapt-radar';
export const RX_GAINSIGHT = {
    deploymentTypes: [
        { id: 0, name: AdaptRadarHostingType.SaaS },
        { id: 10, name: AdaptRadarHostingType.OnPrem }
    ],
    environmentTypes: ['Production', 'QA', 'Staging', 'Integration'],
    gainsightUrl: 'https://web-sdk.aptrinsic.com/api/aptrinsic.js',
    bmcGainsightUrl: 'https://documents.bmc.com/products/docs/gainsight/main/aptrinsic.js',
    administratorRole: 'Administrator',
    businessAnalystRole: 'Business Analyst',
    regularUserRole: 'Regular User',
    defaultBundle: 'Innovation Suite',
    gainsightConfigurationsApi: '/api/rx/application/telemetry/configuration',
    gainsightUserPreferencesApi: '/api/rx/application/telemetry/user/preferences',
    gainsightSettings: {
        recordInstanceId: 'AGGADG1AAT7X5ARM7T3LRM7T3LA5FG',
        recordDefinitionName: 'com.bmc.arsys.rx.settings:Gainsight Configurations',
        fieldIds: {
            enableGainsight: 58102,
            useAdaptRadar: 58103,
            loadGainsightFromBmcIt: 58104,
            deploymentType: 58105,
            environmentType: 58106,
            id: RX_RECORD_DEFINITION.coreFieldIds.id
        }
    }
};
//# sourceMappingURL=gainsight.constant.js.map