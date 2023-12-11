import { IAssociationDefinition } from '@helix/platform/association/api';
import { IDesignerModel } from '@helix/platform/shared/api';
import { IAssociationDefinitionModel } from '../../association-designer.types';
export interface IAssociationDesignerModel extends IDesignerModel<IAssociationDefinition, IAssociationDefinitionModel> {
    isForeignKeyMissing: boolean;
    isForeignKeyCreated: boolean;
}
export interface IAssociationDesignerState {
    model: IAssociationDesignerModel;
}
export interface IInitAssociationDesignerActionPayload {
    bundleId: string;
    definitionName: string;
}
