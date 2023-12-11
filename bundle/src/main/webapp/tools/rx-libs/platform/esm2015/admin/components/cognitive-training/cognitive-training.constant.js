import { MachineLearningProviderNames } from '@helix/platform/shared/api';
import { CognitiveTrainingDataSourceNames, CognitiveTrainingTabNames, CognitiveTrainingEvaluationNames } from './cognitive-training.types';
const defaultTrainDataPercentage = 80;
export const RX_COGNITIVE_TRAINING = {
    settings: {
        sections: [
            {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.auto-classification-training.evaluation.title',
                evaluationName: CognitiveTrainingEvaluationNames.AutoClassificationTrainingAndEvaluation,
                isExpanded: true
            },
            {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.chatbot-evaluation-ibm.watson.assistant.title',
                evaluationName: CognitiveTrainingEvaluationNames.ChatbotEvaluation,
                isExpanded: false
            }
        ],
        tabs: {
            [CognitiveTrainingTabNames.DataSets]: {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.data-sets.title',
                name: CognitiveTrainingTabNames.DataSets,
                deletionConfirmationMessage: 'com.bmc.arsys.rx.client.admin.cognitive-training.data-set-delete-confirmation.message',
                deletionSuccessMessage: 'com.bmc.arsys.rx.client.admin.cognitive-training.data-set-deleted.message',
                recordDefinitionName: 'Cognitive Service Data Set Descriptor'
            },
            [CognitiveTrainingTabNames.TestResults]: {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.test-results.title',
                name: CognitiveTrainingTabNames.TestResults,
                deletionConfirmationMessage: 'com.bmc.arsys.rx.client.admin.cognitive-training.test-results-delete-confirmation.message',
                deletionSuccessMessage: 'com.bmc.arsys.rx.client.admin.cognitive-training.test-results-deleted.message',
                recordDefinitionName: 'Cognitive Service Test Results'
            }
        },
        evaluations: {
            [CognitiveTrainingEvaluationNames.AutoClassificationTrainingAndEvaluation]: {
                name: CognitiveTrainingEvaluationNames.AutoClassificationTrainingAndEvaluation,
                queryExpression: "'1732' = 0 AND '61001' = ",
                serviceProviderQueryExpresion: " AND '1820' = "
            },
            [CognitiveTrainingEvaluationNames.ChatbotEvaluation]: {
                name: CognitiveTrainingEvaluationNames.ChatbotEvaluation,
                queryExpression: "'1732' = 1 AND '61001' = "
            }
        },
        trainingTypes: {
            [MachineLearningProviderNames.Watson]: {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.auto-classification-training.evaluation-ibm-watson.title',
                displayName: 'com.bmc.arsys.rx.client.admin.cognitive-training.ibm-watson-conversation.title',
                name: MachineLearningProviderNames.Watson,
                value: 0,
                uniqueValue: 0
            },
            [MachineLearningProviderNames.Native]: {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.auto-classification-training.evaluation-bmc-native-google.title',
                displayName: 'com.bmc.arsys.rx.client.admin.cognitive-service.bmc-native.title',
                name: 'native',
                value: 0,
                uniqueValue: 1
            },
            [MachineLearningProviderNames.Helix]: {
                title: 'com.bmc.arsys.rx.client.admin.cognitive-training.auto-classification-training.evaluation-helix-ade.title',
                displayName: 'com.bmc.arsys.rx.client.admin.cognitive-service.helix-ade.title',
                name: MachineLearningProviderNames.Helix,
                value: 0,
                uniqueValue: 2
            },
            chatbot: {
                value: 1
            }
        },
        dataSourceTypes: {
            [CognitiveTrainingDataSourceNames.InnovationSuiteDataSource]: {
                displayName: 'com.bmc.arsys.rx.client.admin.cognitive-search.bmc-helix-platform-data-set.label',
                name: CognitiveTrainingDataSourceNames.InnovationSuiteDataSource,
                resourceType: 'com.bmc.arsys.rx.services.cognitive.domain.InnovationSuiteDataSource',
                dataSourceHistory: {
                    layout: {
                        queryExpressionBasic: {
                            filtersJson: null,
                            basicFilters: null
                        },
                        textFields: [],
                        categoryFields: []
                    },
                    resourceType: 'com.bmc.arsys.rx.services.cognitive.domain.InnovationSuiteDataSource',
                    recordDefinitionName: '',
                    queryExpression: '',
                    trainingDataMapper: {
                        resourceType: 'com.bmc.arsys.rx.services.cognitive.domain.CategorizationTrainingDataMapper',
                        textFields: [],
                        categoryFields: []
                    },
                    timeCriteria: null,
                    isScheduleEnabled: false
                }
            },
            [CognitiveTrainingDataSourceNames.FileDataSource]: {
                displayName: 'com.bmc.arsys.rx.client.admin.cognitive-training.csv-data-set.label',
                name: CognitiveTrainingDataSourceNames.FileDataSource,
                resourceType: 'com.bmc.arsys.rx.services.cognitive.domain.FileDataSource',
                dataSourceHistory: {
                    resourceType: 'com.bmc.arsys.rx.services.cognitive.domain.FileDataSource',
                    fileName: ''
                }
            }
        },
        commands: {
            classify: 'com.bmc.arsys.rx.application.cognitive.command.AutomaticCategorySuggestionCommand',
            train: 'com.bmc.arsys.rx.application.cognitive.command.TrainCognitiveServiceCommand',
            test: 'com.bmc.arsys.rx.application.cognitive.command.TestChatbotCommand'
        },
        trainingStatuses: {
            untrained: {
                label: 'Untrained',
                value: 0
            },
            training: {
                label: 'Training',
                value: 1
            },
            trained: {
                label: 'Trained',
                value: 2
            },
            failed: {
                label: 'Failed',
                value: 3
            },
            pendingRetraining: {
                label: 'Pending retraining',
                value: 4
            },
            inProgress: {
                label: 'In progress',
                value: 5
            },
            created: {
                label: 'Created',
                value: 6
            }
        },
        evaluationStatuses: {
            queued: {
                label: 'Queued',
                value: 0
            },
            running: {
                label: 'Running',
                value: 10
            },
            completed: {
                label: 'Completed',
                value: 20
            },
            failed: {
                label: 'Failed',
                value: 30
            }
        },
        nativeProviderTrainingLocales: ['de', 'en', 'es', 'fr', 'it', 'pt'],
        watsonProviderTrainingLocales: ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pt', 'zh-cn', 'zh-tw'],
        defaultTrainingLocale: 'en',
        dataSetDefinitionName: 'Cognitive Service Data Set Descriptor',
        testResultsDefinitionName: 'Cognitive Service Test Results',
        fieldIds: {
            modifiedDate: 6,
            evaluationStatus: 7,
            instanceId: 379,
            dataSetID: 1730,
            dataSetName: 1731,
            trainingType: 1732,
            machineLearningError: 1733,
            error: 1733,
            dataSource: 1734,
            dateLastSubmitted: 1735,
            dateLastTrained: 1736,
            locale: 1737,
            dataSourceHistory: 1738,
            developerId: 1739,
            newDataSetId: 1740,
            useSeedTrainingData: 1741,
            resultCsv: 1795,
            serviceInstanceGuid: 1742,
            trainDataPercent: 1796,
            testDataPercent: 1797,
            trainingDataCsv: 1798,
            testDataCsv: 1799,
            accuracy: 1806,
            precision: 1807,
            recall: 1808,
            fScore: 1809,
            dateLastTested: 1811,
            chatbotName: 1816,
            classificationServiceProvider: 1820,
            dataSetLocale: 1829,
            bundleId: 61001
        },
        defaultTrainDataPercentage: defaultTrainDataPercentage,
        defaultTestDataPercentage: 100 - defaultTrainDataPercentage
    }
};
//# sourceMappingURL=cognitive-training.constant.js.map