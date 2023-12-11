import { IFieldInstance } from './field-instance.interface';
import { IAssociationRecords } from '@helix/platform/association/api';
export interface IRecordInstance {
    readonly resourceType: string;
    readonly id: string;
    displayId: string;
    recordDefinitionName: string;
    permittedGroupsBySecurityLabels: any;
    permittedUsersBySecurityLabels: any;
    permittedRolesBySecurityLabels: any;
    fieldInstances: {
        [fieldId: number]: IFieldInstance;
    };
    associationInstances?: IRxRecordInstanceAssociationInstances;
}
export interface IRxRecordInstanceAssociationInstances {
    [associationDefinitionName: string]: {
        [nodeSide: string]: IAssociationRecords;
    };
}
export interface IRxFieldValidationResult {
    [validationKey: string]: string;
}
export interface IRxValidationResult {
    [fieldId: string]: IRxFieldValidationResult;
}
export declare type FieldInstanceValidator = () => boolean;
export interface IFieldValueChanged {
    fieldId: number;
    value: any;
}
export interface ICreatedRecordInstance {
    id?: string;
    url?: string;
}
