import { INamedListDefinition } from '@helix/platform/named-list/api';
import { IDesignerModel } from '@helix/platform/shared/api';
import { INamedListDefinitionModel } from '../../named-list-designer.types';
export interface INamedListDesignerModel extends IDesignerModel<INamedListDefinition, INamedListDefinitionModel> {
}
export interface INamedListDesignerState {
    model: INamedListDesignerModel;
}
export interface IInitNamedListDesignerActionPayload {
    bundleId: string;
    definitionName: string;
}
