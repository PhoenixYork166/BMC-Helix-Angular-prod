import { KeyValueObject } from '@bmc-ux/adapt-angular';
import { INameValuePair } from '@helix/platform/ui-kit';
export interface IIpaasApiDefinition {
    id?: string;
    organization: string;
    organizationId?: string;
    environment: string;
    environmentId?: string;
    group: string;
    name: string;
    path: string;
    method: string;
    authType: number;
    queryParams: string;
    headers: string;
    description: string;
    authTypeDetails: IAuthTypeDetails;
}
export interface IAuthTypeDetails {
    username?: string;
    password?: string;
    key?: string;
    value?: string;
    authServerEndpoint?: string;
    tokenPath?: string;
    credentials?: string;
    redirectUri?: string;
    scope?: string;
    httpHeaders?: INameValuePair[];
    queryParams?: INameValuePair[];
}
export interface IIpaasApiInfo {
    id?: string;
    apiName?: string;
    groupName: string;
    recordDefinitionName: string;
}
export interface IApiPath {
    [key: string]: KeyValueObject;
}
export interface IOrganizationList {
    [key: string]: string[];
}
export interface IOrganizationData {
    environments?: IEnvironmentData[];
    name: string;
    id?: string;
}
export interface IEnvironmentData {
    name: string;
    id?: string;
}
export interface IAuthType {
    id: number;
    key: string;
    labelKey: string;
}
export interface IAuthTypeFields {
    name: string;
    labelKey: string;
    rxId: string;
    isPassword?: boolean;
    isRequired?: boolean;
}
export interface IIpaasApisConfig {
    titleKey: string;
    recordDefinitionName: string;
    resourceType: string;
}
export interface IApiEditorFormData {
    apiGroupName: string;
    apiName: string;
    apiPath: string[];
    authTypeDetails: KeyValueObject[];
    authorizationType: KeyValueObject[];
    environment: IEnvironmentData[];
    headers: IEnvironmentData[];
    organization: IOrganizationData[];
    queryParameters: IEnvironmentData[];
    requestMethod: string[];
    customAuthTypeHeaders: INameValuePair[];
    customAuthTypeQueryParams: INameValuePair[];
}
export declare enum AuthTypes {
    ANONYMOUS = 0,
    BASIC = 10,
    APIKEY = 20,
    OAUTH2 = 30,
    CUSTOM = 40
}
