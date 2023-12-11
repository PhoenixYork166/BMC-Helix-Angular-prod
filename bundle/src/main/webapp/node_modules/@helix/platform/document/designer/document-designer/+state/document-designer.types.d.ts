import { IDocumentDefinition } from '@helix/platform/document/api';
import { IDesignerModel } from '@helix/platform/shared/api';
import { IDocumentDefinitionModel } from '../../document-designer.types';
export interface IDocumentDesignerModel extends IDesignerModel<IDocumentDefinition, IDocumentDefinitionModel> {
}
export interface IDocumentDesignerState {
    model: IDocumentDesignerModel;
}
export interface IInitDocumentDesignerActionPayload {
    bundleId: string;
    definitionName: string;
}
