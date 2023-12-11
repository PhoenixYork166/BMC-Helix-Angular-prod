import { RecordFieldOption } from '@helix/platform/record/api';
export interface IRecordEditorFieldsControlOptions {
    hideSystemFields: boolean;
    isDisabled?: boolean;
}
export interface IRecordEditorSelectedFieldComponent {
    fieldId: string;
    label: string;
    componentName: string;
    guid: string;
}
export interface IRecordFieldDefinitionItem {
    id: string;
    name: string;
    resourceType: string;
    fieldOption: RecordFieldOption;
    viewComponentType: string;
}
