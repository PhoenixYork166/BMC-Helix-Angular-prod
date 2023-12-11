import { IBaseRecordEditorFieldProperties } from '../../base-record-editor-field/design/base-record-editor-field-design.types';
export interface ITextFieldProperties extends IBaseRecordEditorFieldProperties {
    enableMultiSelection: boolean;
    additionalQueryCriteria: string;
    namedListDefinitionName?: string;
}
