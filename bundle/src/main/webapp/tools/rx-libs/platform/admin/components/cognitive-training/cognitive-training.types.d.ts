import { FileObj } from '@bmc-ux/adapt-angular';
import { IRecordGridFilterModel } from '@helix/platform/view/components';
import { IFieldDefinition } from '@helix/platform/record/api';
export declare enum CognitiveTrainingTabNames {
    DataSets = "dataSets",
    TestResults = "testResults"
}
export declare enum CognitiveTrainingDataSourceNames {
    InnovationSuiteDataSource = "innovationSuiteDataSource",
    FileDataSource = "fileDataSource"
}
export declare enum CognitiveTrainingEvaluationNames {
    AutoClassificationTrainingAndEvaluation = "autoClassificationTrainingAndEvaluation",
    ChatbotEvaluation = "chatbotEvaluation"
}
export interface ICognitiveTrainingTab {
    title: string;
    name: string;
    deletionConfirmationMessage: string;
    deletionSuccessMessage: string;
    recordDefinitionName: string;
}
export interface ICognitiveTrainingType {
    displayName: string;
    name: string;
    title: string;
    value: number;
    uniqueValue: number;
}
export interface ICognitiveTrainingEvaluation {
    isExpanded: boolean;
    name: string;
    queryExpression: string;
    serviceProviderQueryExpresion?: string;
    title: string;
}
export interface ICognitiveTrainingClassification {
    className: string;
    confidence: number;
}
export interface ICognitiveTrainingDataSourceType {
    displayName: string;
    name: string;
    resourceType: string;
    dataSourceHistory: ICognitiveTrainingDataSourceHistory;
}
export interface ICognitiveTrainingDataSet {
    chatbotDefinitionName?: string;
    chatbotLocale?: string[];
    csvFile: FileObj | FileObj[] | ICognitiveTrainingDataSetCsvFile[];
    dataSetName: string;
    dataSource?: ICognitiveTrainingDataSource;
    dataSourceHistory?: ICognitiveTrainingDataSourceHistory;
    description: string;
    lastSubmittedDate: string;
    lastTrainedDate?: string;
    locale: string[];
    machineLearningError?: string;
    status?: ICognitiveTrainingDataSetStatus;
    testDataPercent?: number;
    trainDataPercent?: number;
    useSeedTrainingData?: string;
    trainingStatuses?: string[];
    filterMode?: string;
}
export interface ICognitiveTrainingDataSetStatus {
    label: string;
    value: number;
}
export interface ICognitiveTrainingDataSetCsvFile {
    data: ICognitiveTrainingDataSetCsvFileData;
    downloadURL: string;
    isUploading: boolean;
}
export interface ICognitiveTrainingDataSetCsvFileData {
    name: string;
}
export interface ICognitiveTrainingDataSource {
    file: FileObj | FileObj[] | ICognitiveTrainingDataSetCsvFile[];
    value: string;
}
export interface ICognitiveTrainingDataSourceHistory {
    fileName?: string;
    isScheduleEnabled?: boolean;
    layout?: ICognitiveTrainingDataSourceHistoryLayout;
    queryExpression?: string;
    resourceType: string;
    recordDefinitionName?: string;
    trainingDataMapper?: ICognitiveTrainingDataSourceHistoryTrainingDataMapper;
    timeCriteria?: ICognitiveTrainingDataSourceHistoryTimeCriteria;
}
export interface ICognitiveTrainingDataSourceHistoryTimeCriteria {
    resourceType: string;
}
export interface ICognitiveTrainingDataSourceHistoryLayout {
    queryExpressionBasic: IRecordGridFilterModel;
    textFields: IFieldDefinition[];
    categoryFields: IFieldDefinition[];
}
export interface ICognitiveTrainingDataSourceHistoryTrainingDataMapper {
    resourceType: string;
    textFields: string[];
    categoryFields: string[];
}
