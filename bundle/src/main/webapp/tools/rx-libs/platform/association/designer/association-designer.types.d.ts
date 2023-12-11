import { IAssociationDefinition, ICardinality } from '@helix/platform/association/api';
import { ICustomizationControlValue } from '@helix/platform/shared/api';
export interface IAssociationDefinitionModel extends Omit<IAssociationDefinition, 'cardinality' | 'allowOverlay' | 'scope'> {
    cardinality: ICardinality[];
    customizationOptions: ICustomizationControlValue;
}
