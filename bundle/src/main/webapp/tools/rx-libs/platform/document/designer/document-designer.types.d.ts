import { IDocumentDefinition } from '@helix/platform/document/api';
import { ICustomizationControlValue } from '@helix/platform/shared/api';
export interface IDocumentDefinitionModel extends Omit<IDocumentDefinition, 'scope' | 'allowOverlay'> {
    customizationOptions: ICustomizationControlValue;
}
