import { AdaptRadarHostingType } from '@bmc-ux/adapt-radar';
export declare const RX_GAINSIGHT: {
    deploymentTypes: {
        id: number;
        name: AdaptRadarHostingType;
    }[];
    environmentTypes: string[];
    gainsightUrl: string;
    bmcGainsightUrl: string;
    administratorRole: string;
    businessAnalystRole: string;
    regularUserRole: string;
    defaultBundle: string;
    gainsightConfigurationsApi: string;
    gainsightUserPreferencesApi: string;
    gainsightSettings: {
        recordInstanceId: string;
        recordDefinitionName: string;
        fieldIds: {
            enableGainsight: number;
            useAdaptRadar: number;
            loadGainsightFromBmcIt: number;
            deploymentType: number;
            environmentType: number;
            id: number;
        };
    };
};
