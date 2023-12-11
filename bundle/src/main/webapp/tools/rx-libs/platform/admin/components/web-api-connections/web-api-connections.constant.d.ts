import { IWebApiConnection, IWebApiConnectionField, IWebApiConnectionWizardStep } from './web-api-connections.interfaces';
export declare const RX_WEB_API_CONNECTIONS: {
    recordDefinitionName: string;
    passwordMask: string;
    fieldIds: {
        hostname: number;
        port: number;
        protocol: number;
        authType: number;
        authentication: number;
    };
    wizardContext: {
        wizardSteps: IWebApiConnectionWizardStep[];
        webApiConnection: IWebApiConnection;
        isEditMode: boolean;
    };
    protocolTypeOptions: {
        id: number;
        label: string;
    }[];
    authTypes: {
        basicAuth: number;
        oAuth2: number;
        rsso: number;
        custom: number;
        remedy: number;
        oAuthTokenExchange: number;
    };
    authTypeOptions: {
        id: number;
        label: string;
    }[];
    authTypeFields: {
        id: number;
        fields: IWebApiConnectionField[];
    }[];
    grantTypeOptions: {
        id: number;
        label: string;
    }[];
    authServerEndpoints: {
        default: string;
        custom: string;
    };
};
