import { ChartGroup, ChartType } from './cognitive-consumption.types';
export declare const RX_COGNITIVE_CONSUMPTION: {
    sections: ({
        id: ChartGroup;
        title: string;
        groups: {
            id: ChartGroup;
            label: string;
            unit: string;
            charts: {
                title: string;
                type: ChartType;
            }[];
        }[];
    } | {
        id: ChartGroup;
        title: string;
        groups: {
            id: ChartGroup;
            label: string;
            unit: string;
            capacityName: string;
            charts: {
                title: string;
                type: ChartType;
            }[];
        }[];
    })[];
    settings: {
        countType: string;
        licenseType: string;
        fields: {
            emailsAddressFieldId: number;
            consumedCapacityField: string;
            thresholdReachedField: string;
            notificationDateField: string;
            recipientsField: string;
        };
    };
};
