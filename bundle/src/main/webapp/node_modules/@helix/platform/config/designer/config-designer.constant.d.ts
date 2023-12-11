import { ShowInLocationOptions } from '@helix/platform/config/api';
export declare const RX_CONFIG_DESIGNER: {
    featureSelector: string;
    settingAccessOptions: {
        application: {
            label: string;
            value: ShowInLocationOptions;
        };
        innovationStudio: {
            label: string;
            value: ShowInLocationOptions;
        };
        both: {
            value: ShowInLocationOptions;
        };
        none: {
            value: ShowInLocationOptions;
        };
    };
    dataTypes: {
        attachment: {
            labelKey: string;
            resourceType: string;
        };
        color: {
            labelKey: string;
            resourceType: string;
        };
        secure: {
            labelKey: string;
            resourceType: string;
        };
    };
};
