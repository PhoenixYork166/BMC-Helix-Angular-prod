import { RxAssociationEditingMode } from '../association.types';
import { IAssociatedRecordField } from './association-record-field-selector-field';
import { IRxDisabledProp, IRxStandardProps } from '@helix/platform/view/api';
export interface IAssociationProperties extends IRxStandardProps, IRxDisabledProp {
    associatedRecordNodeSide: string;
    associationDefinitionName: string;
    editingMode: RxAssociationEditingMode;
    fieldId?: string;
    label: string;
    nodeARole?: string;
    nodeBRole?: string;
    recordDefinition: string;
    recordDefinitionName: string;
    viewDefinitionNameForSelect: string;
    viewDefinitionNameForCreate: string;
    recordInstance: string;
    useDefaultRoles?: boolean;
}
export interface IAssociationDesignProperties extends IAssociationProperties {
    displayedFields?: IAssociatedRecordField[];
    filterByAssociation?: string;
    recordId?: string;
}
export interface IAssociationChildComponents {
    displayedFields?: IAssociatedRecordField[];
    filterByAssociation?: string;
    recordId?: string;
    viewDefinitionNameForCreate?: string;
    viewDefinitionNameForSelect?: string;
}
