import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxCommandFactoryService, RxCurrentUserService, RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { chain, cloneDeep, compact, head, map, noop, some } from 'lodash';
import { combineLatest, forkJoin, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RxCognitiveTrainingUtilsService } from '../../cognitive-training-utils.service';
import { RX_COGNITIVE_TRAINING } from '../../cognitive-training.constant';
import { CognitiveTrainingDataSourceNames, CognitiveTrainingEvaluationNames } from '../../cognitive-training.types';
import { ChatbotDataSetBladeComponent } from '../chatbot-data-set-blade/chatbot-data-set-blade.component';
import { FileDataSetBladeComponent } from '../file-data-set-blade/file-data-set-blade.component';
import { InteractiveEvaluationBladeComponent } from '../interactive-evaluation-blade/interactive-evaluation-blade.component';
import { RecordDataSetBladeComponent } from '../record-data-set-blade/record-data-set-blade.component';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../../cognitive-training-utils.service";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "@angular/common";
export class CognitiveTrainingRecordGridComponent {
    constructor(rxBundleCacheService, rxCommandFactoryService, rxCognitiveTrainingUtilsService, rxCurrentUserService, rxDefinitionNameService, rxJsonParserService, rxModalService, rxNotificationService, rxRecordInstanceDataPageService, rxRecordInstanceService, translateService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxCognitiveTrainingUtilsService = rxCognitiveTrainingUtilsService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
        this.fileDataSourceType = RX_COGNITIVE_TRAINING.settings.dataSourceTypes[CognitiveTrainingDataSourceNames.FileDataSource];
        this.innovationSuiteDataSourceType = RX_COGNITIVE_TRAINING.settings.dataSourceTypes[CognitiveTrainingDataSourceNames.InnovationSuiteDataSource];
        this.bundleId = this.rxBundleCacheService.bundleId;
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
    }
    ngOnInit() {
        this.trainingType.displayName = this.translateService.instant(this.trainingType.displayName);
        const availableActionButtons = {
            [CognitiveTrainingEvaluationNames.AutoClassificationTrainingAndEvaluation]: {
                dataSets: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.train-and-test.label'),
                        style: 'tertiary',
                        iconCls: 'play_o',
                        disabled: () => this.isDataSetActionButtonDisabled(),
                        actions: [
                            {
                                name: () => {
                                    this.trainDataSet(head(this.cognitiveTrainingRecordGrid.api.getSelectedRows()));
                                }
                            }
                        ]
                    }
                ],
                testResults: []
            },
            [CognitiveTrainingEvaluationNames.ChatbotEvaluation]: {
                dataSets: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.test.label'),
                        style: 'tertiary',
                        iconCls: 'play_o',
                        disabled: () => !this.isAdministrator || this.cognitiveTrainingRecordGrid.api.getSelectedRows().length !== 1,
                        actions: [
                            {
                                name: () => {
                                    this.testDataSet(head(this.cognitiveTrainingRecordGrid.api.getSelectedRows()));
                                }
                            }
                        ]
                    }
                ]
            },
            common: {
                dataSets: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.edit.label'),
                        style: 'tertiary',
                        icon: 'pencil',
                        disabled: () => this.isChatbotDataSetEditButtonDisabled(),
                        actions: [
                            {
                                name: () => {
                                    this.editDataSet(head(this.cognitiveTrainingRecordGrid.api.getSelectedRows()));
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.copy.label'),
                        style: 'tertiary',
                        icon: 'files_copy_o',
                        disabled: () => !this.isAdministrator || this.cognitiveTrainingRecordGrid.api.getSelectedRows().length !== 1,
                        actions: [
                            {
                                name: () => {
                                    this.copyDataSet(head(this.cognitiveTrainingRecordGrid.api.getSelectedRows()));
                                }
                            }
                        ]
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        style: 'tertiary',
                        icon: 'trash',
                        disabled: () => !this.isAdministrator,
                        actions: [
                            {
                                name: () => {
                                    this.delete();
                                }
                            }
                        ]
                    }
                ],
                testResults: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                        style: 'tertiary',
                        icon: 'trash',
                        disabled: () => this.isTestResultsDeletionRestricted(),
                        actions: [
                            {
                                name: () => {
                                    this.delete();
                                }
                            }
                        ]
                    }
                ]
            }
        };
        const availableColumns = {
            [CognitiveTrainingEvaluationNames.AutoClassificationTrainingAndEvaluation]: {
                dataSets: [
                    {
                        index: 2,
                        fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.status),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.status.label')
                    },
                    {
                        index: 3,
                        fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.description),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.description'),
                        visible: false
                    },
                    {
                        index: 4,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.data-source.label'),
                        visible: false,
                        cellTemplate: this.dataSourceHistoryNameCellTemplate
                    },
                    {
                        index: 6,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.training-type.label')
                    },
                    {
                        index: 8,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.locale),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.locale.label'),
                        visible: false
                    },
                    {
                        index: 11,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.train-data-percent.label')
                    },
                    {
                        index: 12,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.test-data-percent.label')
                    },
                    {
                        index: 13,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.classificationServiceProvider),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.classification-service-provider.label'),
                        visible: true
                    }
                ],
                testResults: [
                    {
                        index: 6,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingDataCsv),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.training-data.label'),
                        clickable: true,
                        actions: [
                            {
                                name: (previousActionResult, lastActionRow) => this.downloadTrainingData(lastActionRow)
                            }
                        ]
                    }
                ]
            },
            [CognitiveTrainingEvaluationNames.ChatbotEvaluation]: {
                dataSets: [
                    {
                        index: 2,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.chatbotName),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.name.label'),
                        visible: true,
                        cellTemplate: this.chatbotNameCellTemplate
                    },
                    {
                        index: 3,
                        fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.status),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.status.label'),
                        visible: false
                    },
                    {
                        index: 4,
                        fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.description),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.description.title')
                    },
                    {
                        index: 5,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.data-source.label'),
                        cellTemplate: this.dataSourceHistoryNameCellTemplate
                    },
                    {
                        index: 7,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.training-type.label'),
                        visible: false
                    },
                    {
                        index: 9,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.locale),
                        title: 'Locale'
                    },
                    {
                        index: 12,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetLocale),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.chatbot-data-set-blade.data-set-locale.label'),
                        visible: false
                    }
                ]
            },
            common: {
                dataSets: [
                    {
                        index: 0,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetID),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-id.title'),
                        visible: false
                    },
                    {
                        index: 1,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label')
                    },
                    {
                        index: 5,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.current-data-source.title'),
                        visible: false
                    },
                    {
                        index: 7,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastTrained),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.date-last-trained.label'),
                        visible: false
                    },
                    {
                        index: 10,
                        fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.displayId),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.request-id.title'),
                        visible: false
                    },
                    {
                        index: 10,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.instance-id.title'),
                        visible: false
                    }
                ],
                testResults: [
                    {
                        index: 0,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetID),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-id.title'),
                        visible: false
                    },
                    {
                        index: 1,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.data-set-type.label'),
                        visible: false
                    },
                    {
                        index: 2,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label')
                    },
                    {
                        index: 3,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.evaluationStatus),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.evaluation-status.label')
                    },
                    {
                        index: 4,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastTested),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.data-last-tested.label'),
                        visible: false
                    },
                    {
                        index: 5,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.modifiedDate),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.modified-date.label'),
                        visible: false
                    },
                    {
                        index: 7,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataCsv),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.test-data.label'),
                        clickable: true,
                        actions: [
                            {
                                name: (previousActionResult, lastActionRow) => this.downloadTestData(lastActionRow)
                            }
                        ]
                    },
                    {
                        index: 8,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.accuracy),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.accuracy.label')
                    },
                    {
                        index: 9,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.precision),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.precision.label')
                    },
                    {
                        index: 10,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.recall),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.recall.label')
                    },
                    {
                        index: 11,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.fScore),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.f-score.label')
                    },
                    {
                        index: 12,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.resultCsv),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.results.label'),
                        clickable: true,
                        actions: [
                            {
                                name: (previousActionResult, lastActionRow) => this.downloadResults(lastActionRow)
                            }
                        ]
                    },
                    {
                        index: 13,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.instance-id.title'),
                        visible: false
                    },
                    {
                        index: 14,
                        fieldId: String(RX_COGNITIVE_TRAINING.settings.fieldIds.error),
                        title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.error.name'),
                        visible: false
                    }
                ]
            }
        };
        this.evaluation = RX_COGNITIVE_TRAINING.settings.evaluations[this.evaluationName];
        this.recordGridConfig = of({
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple,
            recordDefinitionName: this.recordDefinitionName,
            actionButtons: chain(availableActionButtons.common[this.tab.name])
                .concat(availableActionButtons[this.evaluation.name][this.tab.name])
                .compact()
                .value(),
            columns: chain(availableColumns.common[this.tab.name])
                .concat(availableColumns[this.evaluation.name][this.tab.name])
                .compact()
                .value(),
            getData: (queryParams) => {
                let queryExpression = this.evaluation.queryExpression + JSON.stringify(this.bundleId);
                if (this.evaluation.name ===
                    RX_COGNITIVE_TRAINING.settings.evaluations.autoClassificationTrainingAndEvaluation.name) {
                    queryExpression += this.evaluation.serviceProviderQueryExpresion + this.trainingType.uniqueValue;
                }
                const params = {
                    recorddefinition: queryParams.recorddefinition,
                    pageSize: queryParams.pageSize,
                    queryExpression: compact([queryParams.queryExpression, queryExpression]).join(' AND ')
                };
                return this.rxRecordInstanceDataPageService.post({ params });
            }
        });
    }
    createDataSet(dataSourceTypeName) {
        this.rxRecordInstanceService
            .getNew(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName)
            .subscribe((recordInstance) => {
            const data = {
                bundleId: this.bundleId,
                dataSourceType: cloneDeep(RX_COGNITIVE_TRAINING.settings.dataSourceTypes[dataSourceTypeName]),
                evaluation: this.evaluation,
                isNewDataSet: true,
                recordInstance,
                trainingType: this.trainingType
            };
            if (this.isAutoClassificationTrainingAndEvaluation()) {
                if (dataSourceTypeName === RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource.name) {
                    this.openDockedPanel({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.new-data-set.title', {
                            dataSetName: this.translateService.instant(RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource.displayName)
                        }),
                        content: RecordDataSetBladeComponent,
                        size: 'lg',
                        data: {
                            data
                        }
                    })
                        .then((result) => {
                        if (result) {
                            this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                        }
                    })
                        .catch(noop);
                }
                else if (dataSourceTypeName === RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource.name) {
                    this.openDockedPanel({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.new-data-set.title', {
                            dataSetName: this.translateService.instant(RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource.displayName)
                        }),
                        content: FileDataSetBladeComponent,
                        size: 'lg',
                        data: {
                            data
                        }
                    })
                        .then((result) => {
                        if (result) {
                            this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                        }
                    })
                        .catch(noop);
                }
            }
            else if (this.isChatbotEvaluation()) {
                this.openDockedPanel({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.new-chatbot-data-set.title'),
                    content: ChatbotDataSetBladeComponent,
                    size: 'lg',
                    data: {
                        data
                    }
                })
                    .then((result) => {
                    if (result) {
                        this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                    }
                })
                    .catch(noop);
            }
        });
    }
    editDataSet(dataSet) {
        const recordInstanceId = dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId];
        this.rxRecordInstanceService
            .get(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName, recordInstanceId)
            .subscribe((recordInstance) => {
            const dataSourceHistory = this.rxJsonParserService.tryParseJson(recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory));
            const dataSourceType = this.rxCognitiveTrainingUtilsService.getDataSourceType(dataSourceHistory);
            const data = {
                dataSourceType,
                editDataSet: true,
                evaluation: this.evaluation,
                recordInstance,
                trainingType: this.trainingType,
                getAttachmentRecordInstanceId: recordInstance.id
            };
            if (this.isAutoClassificationTrainingAndEvaluation()) {
                if (dataSourceType.name === RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource.name) {
                    this.openDockedPanel({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.edit-data-set.title', {
                            dataSetName: this.translateService.instant(RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource.displayName)
                        }),
                        content: RecordDataSetBladeComponent,
                        size: 'lg',
                        data: {
                            data
                        }
                    })
                        .then((result) => {
                        if (result) {
                            this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                        }
                    })
                        .catch(noop);
                }
                else if (dataSourceType.name === RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource.name) {
                    this.openDockedPanel({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.edit-data-set.title', {
                            dataSetName: this.translateService.instant(RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource.displayName)
                        }),
                        content: FileDataSetBladeComponent,
                        size: 'lg',
                        data: {
                            data
                        }
                    })
                        .then((result) => {
                        if (result) {
                            this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                        }
                    })
                        .catch(noop);
                }
            }
            else if (this.isChatbotEvaluation()) {
                this.openDockedPanel({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.edit-chatbot-data-set.title'),
                    content: ChatbotDataSetBladeComponent,
                    size: 'lg',
                    data: {
                        data
                    }
                })
                    .then((result) => {
                    if (result) {
                        this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                    }
                })
                    .catch(noop);
            }
        });
    }
    copyDataSet(dataSet) {
        const recordInstanceId = dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId];
        combineLatest([
            this.rxRecordInstanceService.get(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName, recordInstanceId),
            this.rxRecordInstanceService.getNew(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName)
        ]).subscribe(([recordInstance, newRecordInstance]) => {
            const dataSourceHistory = this.rxJsonParserService.tryParseJson(recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory));
            const dataSourceType = this.rxCognitiveTrainingUtilsService.getDataSourceType(dataSourceHistory);
            newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName, '');
            newRecordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description));
            newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType));
            newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale));
            newRecordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'value', recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource) || null);
            newRecordInstance.fieldInstances[RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory].value =
                JSON.stringify(dataSourceHistory);
            const data = {
                bundleId: this.bundleId,
                dataSourceType,
                copyDataSet: true,
                evaluation: this.evaluation,
                recordInstance: null,
                trainingType: this.trainingType,
                getAttachmentRecordInstanceId: recordInstance.id
            };
            if (this.isAutoClassificationTrainingAndEvaluation()) {
                newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.classificationServiceProvider, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.classificationServiceProvider));
                newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent));
                newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent));
                data.recordInstance = newRecordInstance;
                if (dataSourceType.name === RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource.name) {
                    this.openDockedPanel({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.copy-data-set.title', {
                            dataSetName: this.translateService.instant(RX_COGNITIVE_TRAINING.settings.dataSourceTypes.innovationSuiteDataSource.displayName)
                        }),
                        content: RecordDataSetBladeComponent,
                        size: 'lg',
                        data: {
                            data
                        }
                    })
                        .then((result) => {
                        if (result) {
                            this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                        }
                    })
                        .catch(noop);
                }
                else if (dataSourceType.name === RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource.name) {
                    this.openDockedPanel({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.copy-data-set.title', {
                            dataSetName: this.translateService.instant(RX_COGNITIVE_TRAINING.settings.dataSourceTypes.fileDataSource.displayName)
                        }),
                        content: FileDataSetBladeComponent,
                        size: 'lg',
                        data: {
                            data
                        }
                    })
                        .then((result) => {
                        if (result) {
                            this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                        }
                    })
                        .catch(noop);
                }
            }
            else if (this.isChatbotEvaluation()) {
                newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.chatbotName, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.chatbotName));
                newRecordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetLocale, recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetLocale));
                data.recordInstance = newRecordInstance;
                this.openDockedPanel({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.copy-chatbot-data-set.title'),
                    content: ChatbotDataSetBladeComponent,
                    size: 'lg',
                    data: {
                        data
                    }
                })
                    .then((result) => {
                    if (result) {
                        this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                    }
                })
                    .catch(noop);
            }
        });
    }
    delete() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant(this.tab.deletionConfirmationMessage)
        })
            .then((result) => {
            if (result) {
                forkJoin(map(this.cognitiveTrainingRecordGrid.api.getSelectedRows(), (dataSet) => this.rxRecordInstanceService.delete(this.tab.recordDefinitionName, dataSet[RX_RECORD_DEFINITION.coreFieldIds.id]))).subscribe(() => {
                    this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant(this.tab.deletionSuccessMessage));
                });
            }
        });
    }
    trainDataSet(dataSet) {
        this.rxCommandFactoryService
            .forResourceType(RX_COGNITIVE_TRAINING.settings.commands.train)
            .execute({
            trainingDataSetName: `${this.bundleId}:${dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName]}`
        })
            .pipe(catchError((errorResponse) => throwError(errorResponse)), finalize(() => this.cognitiveTrainingRecordGrid.api.refresh().subscribe()))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.training-process-triggered.message'));
        });
    }
    testDataSet(dataSet) {
        this.rxCommandFactoryService
            .forResourceType(RX_COGNITIVE_TRAINING.settings.commands.test)
            .execute({
            trainingDataSetName: `${this.bundleId}:${dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName]}`
        })
            .pipe(catchError((errorResponse) => throwError(errorResponse)), finalize(() => this.cognitiveTrainingRecordGrid.api.refresh().subscribe()))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.data-set-submitted.message'));
        });
    }
    downloadTrainingData(dataSet) {
        this.rxRecordInstanceService.downloadAttachment(RX_COGNITIVE_TRAINING.settings.testResultsDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.trainingDataCsv, dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId], dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.trainingDataCsv]);
    }
    downloadTestData(dataSet) {
        this.rxRecordInstanceService.downloadAttachment(RX_COGNITIVE_TRAINING.settings.testResultsDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.testDataCsv, dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId], dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.testDataCsv]);
    }
    downloadResults(dataSet) {
        this.rxRecordInstanceService.downloadAttachment(RX_COGNITIVE_TRAINING.settings.testResultsDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.resultCsv, dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.instanceId], dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.resultCsv]);
    }
    openInteractiveEvaluationBlade() {
        this.openDockedPanel({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.auto-classification-interactive.evaluation.title'),
            content: InteractiveEvaluationBladeComponent,
            size: 'lg',
            data: {
                bundleId: this.bundleId,
                evaluation: this.evaluation,
                trainingType: this.trainingType
            }
        })
            .then((result) => {
            if (result) {
                this.cognitiveTrainingRecordGrid.api.refresh().subscribe();
            }
        })
            .catch(noop);
    }
    isDataSetsTab() {
        return this.tab.name === 'dataSets';
    }
    isTestResultsTab() {
        return this.tab.name === 'testResults';
    }
    isAutoClassificationTrainingAndEvaluation() {
        return (this.evaluation.name === RX_COGNITIVE_TRAINING.settings.evaluations.autoClassificationTrainingAndEvaluation.name);
    }
    isChatbotEvaluation() {
        return this.evaluation.name === RX_COGNITIVE_TRAINING.settings.evaluations.chatbotEvaluation.name;
    }
    formatDataSourceHistory(dataItem, column) {
        const dataSourceHistory = JSON.parse(this.getCellValue(dataItem, column));
        return (dataSourceHistory.fileName || this.rxDefinitionNameService.getDisplayName(dataSourceHistory.recordDefinitionName));
    }
    getCellValue(dataItem, column) {
        return dataItem[column.field];
    }
    isDataSetActionButtonDisabled() {
        const dataSets = this.cognitiveTrainingRecordGrid.api.getSelectedRows();
        return (!this.isAdministrator ||
            dataSets.length !== 1 ||
            dataSets[0][RX_RECORD_DEFINITION.coreFieldIds.status] ===
                RX_COGNITIVE_TRAINING.settings.trainingStatuses.training.value ||
            dataSets[0][RX_RECORD_DEFINITION.coreFieldIds.status] ===
                RX_COGNITIVE_TRAINING.settings.trainingStatuses.inProgress.value);
    }
    isChatbotDataSetEditButtonDisabled() {
        const dataSets = this.cognitiveTrainingRecordGrid.api.getSelectedRows();
        return (!this.isAdministrator ||
            dataSets.length !== 1 ||
            dataSets[0][RX_RECORD_DEFINITION.coreFieldIds.status] ===
                RX_COGNITIVE_TRAINING.settings.trainingStatuses.training.value);
    }
    isTestResultsDeletionRestricted() {
        const dataSets = this.cognitiveTrainingRecordGrid.api.getSelectedRows();
        return (!this.isAdministrator ||
            some(dataSets, (dataSet) => dataSet[RX_COGNITIVE_TRAINING.settings.fieldIds.evaluationStatus] ===
                RX_COGNITIVE_TRAINING.settings.evaluationStatuses.queued.value));
    }
    openDockedPanel(config) {
        return this.rxModalService.openDockedPanel(config).catch(noop);
    }
}
CognitiveTrainingRecordGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingRecordGridComponent, deps: [{ token: i1.RxBundleCacheService }, { token: i1.RxCommandFactoryService }, { token: i2.RxCognitiveTrainingUtilsService }, { token: i1.RxCurrentUserService }, { token: i1.RxDefinitionNameService }, { token: i3.RxJsonParserService }, { token: i4.RxModalService }, { token: i1.RxNotificationService }, { token: i5.RxRecordInstanceDataPageService }, { token: i5.RxRecordInstanceService }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveTrainingRecordGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveTrainingRecordGridComponent, selector: "rx-cognitive-training-record-grid", inputs: { tab: "tab", evaluationName: "evaluationName", recordDefinitionName: "recordDefinitionName", trainingType: "trainingType" }, viewQueries: [{ propertyName: "cognitiveTrainingRecordGrid", first: true, predicate: ["cognitiveTrainingRecordGrid"], descendants: true, static: true }, { propertyName: "chatbotNameCellTemplate", first: true, predicate: ["chatbotNameCellTemplate"], descendants: true, static: true }, { propertyName: "dataSourceHistoryNameCellTemplate", first: true, predicate: ["dataSourceHistoryNameCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div *ngIf=\"isDataSetsTab()\">\n  <div class=\"dropdown\" *ngIf=\"isAutoClassificationTrainingAndEvaluation()\" adaptDropdown [autoFocusFirst]=\"false\">\n    <button\n      class=\"d-icon-plus_circle align-self-start\"\n      type=\"button\"\n      rx-id=\"data-set-dropdown\"\n      adapt-button\n      adaptDropdownToggle\n      btn-type=\"tertiary\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n    </button>\n\n    <div class=\"dropdown-menu\" adaptDropdownMenu>\n      <button\n        class=\"dropdown-item\"\n        rx-id=\"create-record-data-set\"\n        [disabled]=\"!isAdministrator\"\n        (click)=\"createDataSet(innovationSuiteDataSourceType.name)\"\n      >\n        {{ innovationSuiteDataSourceType.displayName | translate }}\n      </button>\n\n      <button\n        class=\"dropdown-item\"\n        rx-id=\"create-file-data-set\"\n        [disabled]=\"!isAdministrator\"\n        (click)=\"createDataSet(fileDataSourceType.name)\"\n      >\n        {{ fileDataSourceType.displayName | translate }}\n      </button>\n    </div>\n  </div>\n\n  <button\n    class=\"d-icon-plus_circle align-self-start\"\n    *ngIf=\"isChatbotEvaluation()\"\n    type=\"button\"\n    rx-id=\"create-chatbot-data-set\"\n    adapt-button\n    btn-type=\"tertiary\"\n    [disabled]=\"!isAdministrator\"\n    (click)=\"createDataSet(fileDataSourceType.name)\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n</div>\n\n<button\n  class=\"d-icon-target_cursor align-self-start\"\n  *ngIf=\"isAutoClassificationTrainingAndEvaluation() && isTestResultsTab()\"\n  type=\"button\"\n  rx-id=\"interactive-evaluation\"\n  adapt-button\n  btn-type=\"tertiary\"\n  [disabled]=\"!isAdministrator\"\n  (click)=\"openInteractiveEvaluationBlade()\"\n>\n  {{\n    'com.bmc.arsys.rx.client.admin.cognitive-training.cognitive-training-record-grid.interactive-evaluation.label'\n      | translate\n  }}\n</button>\n\n<rx-record-grid #cognitiveTrainingRecordGrid [config]=\"recordGridConfig\"></rx-record-grid>\n\n<ng-template #dataSourceHistoryNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <ng-container>\n    {{ formatDataSourceHistory(dataItem, column) }}\n  </ng-container>\n</ng-template>\n\n<ng-template #chatbotNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <ng-container>\n    {{ getCellValue(dataItem, column) | rxDefinitionNamePipe }}\n  </ng-container>\n</ng-template>\n", components: [{ type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }], pipes: { "translate": i6.TranslatePipe, "rxDefinitionNamePipe": i1.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingRecordGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-training-record-grid',
                    templateUrl: './cognitive-training-record-grid.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxBundleCacheService }, { type: i1.RxCommandFactoryService }, { type: i2.RxCognitiveTrainingUtilsService }, { type: i1.RxCurrentUserService }, { type: i1.RxDefinitionNameService }, { type: i3.RxJsonParserService }, { type: i4.RxModalService }, { type: i1.RxNotificationService }, { type: i5.RxRecordInstanceDataPageService }, { type: i5.RxRecordInstanceService }, { type: i6.TranslateService }]; }, propDecorators: { cognitiveTrainingRecordGrid: [{
                type: ViewChild,
                args: ['cognitiveTrainingRecordGrid', { static: true }]
            }], chatbotNameCellTemplate: [{
                type: ViewChild,
                args: ['chatbotNameCellTemplate', { static: true }]
            }], dataSourceHistoryNameCellTemplate: [{
                type: ViewChild,
                args: ['dataSourceHistoryNameCellTemplate', { static: true }]
            }], tab: [{
                type: Input
            }], evaluationName: [{
                type: Input
            }], recordDefinitionName: [{
                type: Input
            }], trainingType: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-training-record-grid.component.js.map