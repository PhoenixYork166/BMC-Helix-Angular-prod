import { IIpaasBaseConfigPayload } from '../ipaas-base-configuration/ipaas-base-configuration.types';
export interface IAuthenticationOption {
    id: string;
    label: string;
}
export interface IMulesoftSettingParams extends IIpaasBaseConfigPayload {
    authType: string;
    clientId: string;
    clientSecret: string;
}
export declare const AUTH_TYPE: {
    basicAuth: string;
    oAuth2: string;
};
export declare const MULESOFT_AUTH_TYPE_OPTIONS: {
    id: string;
    label: string;
}[];
