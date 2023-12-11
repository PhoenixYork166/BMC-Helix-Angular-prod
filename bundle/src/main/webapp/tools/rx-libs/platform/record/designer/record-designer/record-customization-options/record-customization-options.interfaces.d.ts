import { ICustomizationControlValue, ICustomizationOptions, ICustomizationOptionsEditorData } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
export interface IRecordCustomizationOptions extends ICustomizationOptions {
    recordDefinition?: IRecordDefinitionModel;
}
export interface IRecordCustomizationOptionsEditorData extends ICustomizationOptionsEditorData {
    recordDefinition?: IRecordDefinitionModel;
}
export interface IRecordCustomizationControlValue extends ICustomizationControlValue {
    allowFieldsOverlay: boolean;
    allowIndexesOverlay: boolean;
    allowOtherPropertiesOverlay: boolean;
    allowPermissionsOverlay: boolean;
    fields: IRecordFieldDefinitionModel[];
    scope: string;
}
