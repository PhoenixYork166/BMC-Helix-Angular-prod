import { IFieldDefinition } from '@helix/platform/record/api';
export interface IAssociationRecordFieldSelectorEditorDialogConfig {
    fieldToEdit?: IAssociatedRecordFieldDialog;
    fields: IFieldDefinition[];
    isReadOnly: boolean;
    selectedFields: IAssociatedRecordFieldDialog[];
}
export interface IAssociatedRecordFieldDataDialog {
    fieldId: string;
    label: string;
    index?: string;
}
export interface IAssociatedRecordFieldDialog {
    guid?: string;
    data: IAssociatedRecordFieldDataDialog;
}
export interface IViewAssociationRecordFieldSelectorEditorDialogItem extends IAssociatedRecordFieldDialog {
    isOpen: boolean;
    labelText: string;
    indexOrder: number;
    descriptor: IFieldDefinition;
}
export interface IFieldLabelsMap {
    [key: number]: string;
}
