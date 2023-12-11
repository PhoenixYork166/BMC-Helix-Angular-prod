export interface IExportedDataStatusInfo {
    message: string;
    status: string;
    updateTime: string;
}
export interface ICriteriaField {
    name: string;
    id: number | string;
    disabled?: boolean;
    visibleOnPreviewPriority?: number;
}
export interface IDefinitionCriteria {
    filter: string;
    fields: ICriteriaField[];
}
export interface IExportConfigurationDefinition {
    type: 'record' | 'association';
    name: string;
    criteria: IDefinitionCriteria;
}
export interface IExportConfiguration {
    exportConfigName: string;
    exportConfigDescription: string;
    definitions: IExportConfigurationDefinition[];
}
