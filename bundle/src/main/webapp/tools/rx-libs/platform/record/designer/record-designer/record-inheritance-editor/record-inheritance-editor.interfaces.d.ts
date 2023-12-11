import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
export interface IInheritanceSelectorControlValue {
    inheritanceOptions: IInheritanceOptions;
    inheritanceDescriptor: IInheritanceDescriptor;
    isInheritingCoreFields: boolean;
    inheritedFieldDefinitions: IRecordFieldDefinitionModel[];
}
export interface IInheritanceDescriptor {
    inheritingFrom: string;
    isInheritingRules: boolean;
    isInheritingFieldPermissions: boolean;
    isInheritingAssociations: boolean;
    isInheritingFieldAuditOptions: boolean;
}
export interface IInheritanceOptions {
    isSharedInstanceStorage: boolean;
    isAbstract: boolean;
    isFinal: boolean;
}
export interface IRecordInheritanceSelectorOptions {
    recordDefinition: IRecordDefinitionModel;
    isReadOnly: boolean;
}
