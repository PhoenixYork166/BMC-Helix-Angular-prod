import { AbstractControl } from '@angular/forms';
import { IFieldDefinition, ISearchDefinition } from '@helix/platform/record/api';
import { IRecordDefinitionModel } from '../../record-designer.types';
export interface ISearchFieldEditorControlOptions {
    recordDefinitionModel: IRecordDefinitionModel;
    isReadOnly: boolean;
}
export interface IRecordSearchFieldsEditorState {
    searchFields: AbstractControl[];
    isDirty: boolean;
    availableFields: IFieldDefinition[];
    searchDefinition: ISearchDefinition;
    isCategoryVisible: boolean;
    isValid: boolean;
}
