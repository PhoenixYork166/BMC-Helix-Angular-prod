import { IBaseRecordEditorFieldProperties } from '../../base-record-editor-field/design/base-record-editor-field-design.types';
import { BooleanFieldEditingMode } from '../boolean-field.types';
export interface IBooleanFieldProperties extends IBaseRecordEditorFieldProperties {
    editingMode: BooleanFieldEditingMode;
}
