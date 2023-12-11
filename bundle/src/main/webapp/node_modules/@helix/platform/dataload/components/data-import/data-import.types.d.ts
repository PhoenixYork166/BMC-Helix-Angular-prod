import { RxSelectOption } from '@bmc-ux/adapt-angular';
export declare enum IDataStatus {
    new = "New",
    processing = "Processing",
    processed = "Processed",
    errored = "Errored",
    processedWithErrors = "ProcessedWithErrors",
    queued = "Queued",
    stopping = "Stopping",
    stopped = "Stopped",
    rolloverStopped = "RolloverStopped",
    upgradeStopped = "UpgradeStopped"
}
export interface IImportedDataStatusInfo {
    message: string;
    status: string;
    updateTime: string;
}
export interface ISheetField {
    name: string;
}
export interface ISheetDefinition {
    name: string;
    value: string;
}
export interface IDataloadExcelSheetConfiguration {
    stepId: string;
    definition: ISheetDefinition;
    fields: ISheetField[];
}
export interface IDataloadExcelSheet {
    sheetName: string;
    configurations: IDataloadExcelSheetConfiguration;
}
export interface IDataloadWorksheet {
    sheets: IDataloadExcelSheet[];
}
interface ITargetDefinition {
    type: string;
    name: string;
}
interface ISourceField {
    fieldName: string | RxSelectOption[];
}
export interface ITargetField {
    _fieldId: number | string;
    name: string;
}
export interface IFieldMapping {
    sourceField: ISourceField;
    targetField: ITargetField | RxSelectOption[];
}
interface IDefinitionMappings {
    targetDefinition: ITargetDefinition;
    fieldMappings: IFieldMapping[];
}
interface IDuplicateHandlingOptions {
    matchDuplicateBy: ITargetField[];
    handleDuplicateBy: number | RxSelectOption[];
}
export interface ISheetDataConfiguration {
    definitionMappings: IDefinitionMappings;
    dataHandlingOptions: number[];
    timeFormatOptions: string | RxSelectOption[];
    duplicateHandlingOptions: IDuplicateHandlingOptions;
}
export interface IDataImportSheetConfiguration {
    name: string;
    configurations: ISheetDataConfiguration;
}
export interface IDataImportConfiguration {
    sheets: IDataImportSheetConfiguration[];
}
interface IDataloadSheetConfigurationByName {
    [sheetName: string]: IDataloadExcelSheetConfiguration;
}
export interface IDataImportContext {
    dataImportConfigurations: IDataImportConfiguration;
}
export interface IImportJobInfo {
    importJobName: string;
    importJobDescription: string;
    attachmentType: number;
    archivedWorksheetFileName: string;
}
export interface IDataloadWizardContext {
    importJobInfo?: IImportJobInfo;
    isClonedConfigMatched: boolean;
    clonedConfigurationInstanceId: string;
    createdRecordInstanceId: string;
    dataImportContext: IDataImportContext;
    excelSheetsConfiguration: IDataloadSheetConfigurationByName;
}
export {};
