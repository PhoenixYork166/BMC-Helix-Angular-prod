import { IBaseRecordEditorFieldComponentConfig } from '../../base-record-editor-field/runtime';
import { TextFieldMultiSelectionType } from './text-field.types';
export interface IRxTextFieldConfig extends IBaseRecordEditorFieldComponentConfig {
    enableMultiSelection?: TextFieldMultiSelectionType;
    additionalQueryCriteria?: string;
    namedListDefinitionName?: string;
}
