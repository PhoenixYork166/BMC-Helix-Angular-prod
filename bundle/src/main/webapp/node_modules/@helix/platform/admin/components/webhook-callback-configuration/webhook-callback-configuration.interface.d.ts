export interface IMetadataField {
    name: string;
    value: string;
    secure: boolean;
}
export interface IMetadataFieldResponse {
    [fieldId: number]: IMetadataField[];
}
