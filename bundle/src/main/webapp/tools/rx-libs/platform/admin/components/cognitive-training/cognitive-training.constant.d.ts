import { MachineLearningProviderNames } from '@helix/platform/shared/api';
import { CognitiveTrainingDataSourceNames, CognitiveTrainingTabNames, CognitiveTrainingEvaluationNames } from './cognitive-training.types';
export declare const RX_COGNITIVE_TRAINING: {
    settings: {
        sections: {
            title: string;
            evaluationName: CognitiveTrainingEvaluationNames;
            isExpanded: boolean;
        }[];
        tabs: {
            dataSets: {
                title: string;
                name: CognitiveTrainingTabNames;
                deletionConfirmationMessage: string;
                deletionSuccessMessage: string;
                recordDefinitionName: string;
            };
            testResults: {
                title: string;
                name: CognitiveTrainingTabNames;
                deletionConfirmationMessage: string;
                deletionSuccessMessage: string;
                recordDefinitionName: string;
            };
        };
        evaluations: {
            autoClassificationTrainingAndEvaluation: {
                name: CognitiveTrainingEvaluationNames;
                queryExpression: string;
                serviceProviderQueryExpresion: string;
            };
            chatbotEvaluation: {
                name: CognitiveTrainingEvaluationNames;
                queryExpression: string;
            };
        };
        trainingTypes: {
            WATSON: {
                title: string;
                displayName: string;
                name: MachineLearningProviderNames;
                value: number;
                uniqueValue: number;
            };
            NATIVE: {
                title: string;
                displayName: string;
                name: string;
                value: number;
                uniqueValue: number;
            };
            HELIX: {
                title: string;
                displayName: string;
                name: MachineLearningProviderNames;
                value: number;
                uniqueValue: number;
            };
            chatbot: {
                value: number;
            };
        };
        dataSourceTypes: {
            innovationSuiteDataSource: {
                displayName: string;
                name: CognitiveTrainingDataSourceNames;
                resourceType: string;
                dataSourceHistory: {
                    layout: {
                        queryExpressionBasic: {
                            filtersJson: any;
                            basicFilters: any;
                        };
                        textFields: any[];
                        categoryFields: any[];
                    };
                    resourceType: string;
                    recordDefinitionName: string;
                    queryExpression: string;
                    trainingDataMapper: {
                        resourceType: string;
                        textFields: any[];
                        categoryFields: any[];
                    };
                    timeCriteria: any;
                    isScheduleEnabled: boolean;
                };
            };
            fileDataSource: {
                displayName: string;
                name: CognitiveTrainingDataSourceNames;
                resourceType: string;
                dataSourceHistory: {
                    resourceType: string;
                    fileName: string;
                };
            };
        };
        commands: {
            classify: string;
            train: string;
            test: string;
        };
        trainingStatuses: {
            untrained: {
                label: string;
                value: number;
            };
            training: {
                label: string;
                value: number;
            };
            trained: {
                label: string;
                value: number;
            };
            failed: {
                label: string;
                value: number;
            };
            pendingRetraining: {
                label: string;
                value: number;
            };
            inProgress: {
                label: string;
                value: number;
            };
            created: {
                label: string;
                value: number;
            };
        };
        evaluationStatuses: {
            queued: {
                label: string;
                value: number;
            };
            running: {
                label: string;
                value: number;
            };
            completed: {
                label: string;
                value: number;
            };
            failed: {
                label: string;
                value: number;
            };
        };
        nativeProviderTrainingLocales: string[];
        watsonProviderTrainingLocales: string[];
        defaultTrainingLocale: string;
        dataSetDefinitionName: string;
        testResultsDefinitionName: string;
        fieldIds: {
            modifiedDate: number;
            evaluationStatus: number;
            instanceId: number;
            dataSetID: number;
            dataSetName: number;
            trainingType: number;
            machineLearningError: number;
            error: number;
            dataSource: number;
            dateLastSubmitted: number;
            dateLastTrained: number;
            locale: number;
            dataSourceHistory: number;
            developerId: number;
            newDataSetId: number;
            useSeedTrainingData: number;
            resultCsv: number;
            serviceInstanceGuid: number;
            trainDataPercent: number;
            testDataPercent: number;
            trainingDataCsv: number;
            testDataCsv: number;
            accuracy: number;
            precision: number;
            recall: number;
            fScore: number;
            dateLastTested: number;
            chatbotName: number;
            classificationServiceProvider: number;
            dataSetLocale: number;
            bundleId: number;
        };
        defaultTrainDataPercentage: number;
        defaultTestDataPercentage: number;
    };
};
