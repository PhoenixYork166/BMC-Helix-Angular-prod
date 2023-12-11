import { RxSelectOption } from '@bmc-ux/adapt-angular';
export interface IDataSourceConnectionWizardContext extends IDataSourceConnection {
    isEditMode: boolean;
    isGeneralFormPristine: boolean;
}
export interface IDataSourceConnection {
    dataSourceName: string;
    resourceType: RxSelectOption;
    hostName?: string;
    port?: number;
    authType?: string;
    rasPassword?: string;
    enforceAuthorization?: boolean;
    webApiDataSourceGuid?: string;
    providerId?: string;
}
export interface ICustomDataSourceProvider {
    name: string;
}
