import { ICustomizationOptions } from '@helix/platform/shared/api';
import { INamedListDefinition, INamedListField } from '@helix/platform/named-list/api';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
export interface INamedListDefinitionModel extends Omit<INamedListDefinition, 'allowOverlay' | 'scope' | 'overlayGroupId' | 'overlayDescriptor'> {
    customizationOptions?: ICustomizationOptions;
}
export interface IContextualLabelFieldsEditorConfig {
    activeFieldIndex?: number;
    isReadOnly: boolean;
    contextualLabelFields: INamedListField[];
    options: RxSelectOption[];
}
