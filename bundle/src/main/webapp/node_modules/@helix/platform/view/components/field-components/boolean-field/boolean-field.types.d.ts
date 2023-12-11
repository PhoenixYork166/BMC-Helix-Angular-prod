import { IBaseRecordEditorFieldComponentConfig } from '../base-record-editor-field/runtime';
export interface IBooleanFieldConfig extends IBaseRecordEditorFieldComponentConfig {
    editingMode?: BooleanFieldEditingMode;
}
export declare enum BooleanFieldEditingMode {
    Checkbox = "checkbox",
    Switch = "switch"
}
export declare enum BooleanFieldModelValue {
    True = 1,
    False = 0
}
