import { IFieldInstance } from '@helix/platform/record/api';
export interface IRssoOAuthConfigurationField {
    id: string;
    value: string;
}
export interface ISectionField {
    id: number;
    name: string;
    value: string;
    type: string;
    label: string;
    rxId: string;
}
export interface IRssoOAuthSection {
    title: string;
    isOpen: boolean;
    isSaveInProgress: boolean;
    fieldInstances?: {
        [fieldId: number]: IFieldInstance;
    };
    recordInstanceId: string;
    fields: Array<ISectionField>;
    formName: string;
    oAuthProvider: string;
    rxId: string;
}
export declare type RssoOAuthConfiguration = IRssoOAuthConfigurationField[];
