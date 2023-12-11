import { IBaseRecordEditorFieldComponentConfig } from '../../base-record-editor-field/runtime';
export interface ISelectionFieldConfig extends IBaseRecordEditorFieldComponentConfig {
    editingMode?: string;
}
export declare enum SelectionFieldMode {
    RadioButton = "radio-buttons",
    Dropdown = "dropdown"
}
