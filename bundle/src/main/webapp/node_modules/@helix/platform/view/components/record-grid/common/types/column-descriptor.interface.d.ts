import { IFieldDefinition } from '@helix/platform/record/api';
import { IAssociationDescriptor } from '@helix/platform/association/api';
export interface IColumnDescriptor {
    fieldDefinition: IFieldDefinition;
    fieldId: string;
    index: number;
    title: string;
    associationDescriptor?: IAssociationDescriptor;
}
