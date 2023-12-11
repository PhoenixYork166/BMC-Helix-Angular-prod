export interface IRecordPreviewCardField {
    label: string;
    value?: string;
    index: string;
    fieldId: string;
}
export interface IRecordPreviewCardConfig {
    fields: IRecordPreviewCardField[];
    id: string;
    maxFieldValueLength?: number;
    state: string;
    onDelete(string: any): void;
}
