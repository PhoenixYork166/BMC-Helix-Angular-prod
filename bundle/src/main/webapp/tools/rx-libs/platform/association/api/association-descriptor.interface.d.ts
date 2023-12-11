import { IAssociationDefinition } from './association-definition.types';
export interface IAssociationDescriptor {
    associationDefinition: IAssociationDefinition;
    recordDefinitionName: string;
    nodeSide: string;
    label: string;
}
