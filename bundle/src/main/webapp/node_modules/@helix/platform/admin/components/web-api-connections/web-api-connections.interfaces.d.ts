import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { INameValuePair } from '@helix/platform/ui-kit';
export interface IWebApiConnectionWizardContext {
    wizardSteps: IWebApiConnectionWizardStep[];
    webApiConnection: IWebApiConnection;
    isEditMode: boolean;
}
export interface IWebApiConnection {
    authTypeCode: RxSelectOption;
    secure: RxSelectOption;
    name: string;
    hostname: string;
    port: string;
    authTypeDetails: IAuthTypeDetails;
}
export interface IAuthTypeDetails {
    username?: string;
    credentials?: string;
    authServerEndpoint?: string;
    tokenPath?: string;
    loginName?: string;
    redirectUri?: string;
    scope?: string;
    resources?: string;
    grantType?: RxSelectOption;
    queryParams?: INameValuePair[];
    httpHeaders: INameValuePair[];
    tokenFetchMechanism?: number;
    additionalFormParams?: INameValuePair[];
}
export interface IWebApiConnectionWizardStep {
    id: string;
    title: string;
    fields: IWebApiConnectionField[];
    formName: string;
    isValid: boolean;
    isDirty: boolean;
}
export interface IWebApiConnectionField {
    name: string;
    label: string;
    type: string;
    rxId: string;
    selectOptions?: RxSelectOption[];
    tooltip?: string;
    placeholder?: string;
    disabled?: boolean;
    minValue?: number;
    maxValue?: number;
    referenceFieldName?: string;
    required?: boolean;
    isUrl?: boolean;
    allowScientific?: boolean;
    allowIntegerOnly?: boolean;
}
