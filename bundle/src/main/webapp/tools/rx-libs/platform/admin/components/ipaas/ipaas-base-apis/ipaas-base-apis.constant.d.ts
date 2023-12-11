import { AuthTypes } from './ipaas-base-apis.types';
export declare const RX_IPAAS_APIS: {
    fieldIds: {
        groupName: number;
        apiName: number;
        organization: number;
        environment: number;
        path: number;
        method: number;
    };
    methods: {
        0: string;
        10: string;
        20: string;
        30: string;
    };
    authTypeOptions: {
        id: AuthTypes;
        key: string;
        labelKey: string;
    }[];
    authTypeFields: {
        0: any[];
        10: ({
            name: string;
            labelKey: string;
            rxId: string;
            isRequired: boolean;
            isPassword?: undefined;
        } | {
            name: string;
            labelKey: string;
            rxId: string;
            isPassword: boolean;
            isRequired: boolean;
        })[];
        20: ({
            name: string;
            labelKey: string;
            rxId: string;
            isRequired: boolean;
            isPassword?: undefined;
        } | {
            name: string;
            labelKey: string;
            rxId: string;
            isPassword: boolean;
            isRequired: boolean;
        })[];
        30: ({
            name: string;
            labelKey: string;
            rxId: string;
            isRequired: boolean;
            isPassword?: undefined;
        } | {
            name: string;
            labelKey: string;
            rxId: string;
            isPassword: boolean;
            isRequired: boolean;
        } | {
            name: string;
            labelKey: string;
            rxId: string;
            isRequired?: undefined;
            isPassword?: undefined;
        })[];
    };
};
