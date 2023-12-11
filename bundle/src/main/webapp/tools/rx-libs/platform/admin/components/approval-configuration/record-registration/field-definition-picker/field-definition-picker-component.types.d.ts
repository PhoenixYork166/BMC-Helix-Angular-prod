import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IValueWithLabel } from '@helix/platform/utils';
export interface IRecordFields extends IValueWithLabel {
    associationDescriptor?: IAssociationDescriptor;
    isAssociatedRecord: boolean;
    isExpanded: boolean;
    fields: IValueWithLabel[];
}
export declare type FieldsTree = IRecordFields[];
export interface IFieldDefinitionPickerComponentOptions {
    label?: string;
    required: boolean;
    recordDefinitionName: string;
    tooltip?: string;
    fieldsTree: FieldsTree;
}
