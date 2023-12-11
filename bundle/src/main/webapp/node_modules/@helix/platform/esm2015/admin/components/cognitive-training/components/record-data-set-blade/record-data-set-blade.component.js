import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DismissReasons, DockedPanelContext, UploaderMode } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordInstanceService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RecordGridFilterMode } from '@helix/platform/view/components';
import { assign, find, isEmpty, map as _map, pick } from 'lodash';
import moment from 'moment-es6';
import { BehaviorSubject, of } from 'rxjs';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { RxCognitiveTrainingUtilsService } from '../../cognitive-training-utils.service';
import { RX_COGNITIVE_TRAINING } from '../../cognitive-training.constant';
import { RxRecordDataSetExpressionConfigurator } from '../record-data-set-expression-configurator/record-data-set-expression-configurator.class';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../cognitive-training-utils.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
export class RecordDataSetBladeComponent extends RxModalClass {
    constructor(dockedPanelContext, rxCognitiveTrainingUtilsService, rxDefinitionNameService, rxExpressionEditorService, rxRecordDefinitionCacheService, rxRecordInstanceService, translateService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.rxCognitiveTrainingUtilsService = rxCognitiveTrainingUtilsService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
        this.injector = injector;
        this.csvFileUploadMode = UploaderMode.Auto;
        this.recordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.record-definition-field.label'),
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.filterModeOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.filters.label'),
            items: [
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.basic.label'),
                    value: RecordGridFilterMode.Basic
                },
                {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.expression.label'),
                    value: RecordGridFilterMode.Expression
                }
            ]
        };
        this.recordDefinitionName$ = new BehaviorSubject('');
        this.recordDefinition$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => recordDefinitionName ? this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName) : of(null)), shareReplay(1));
        this.fieldOptions$ = this.recordDefinition$.pipe(map((recordDefinition) => recordDefinition === null || recordDefinition === void 0 ? void 0 : recordDefinition.fieldDefinitions.map((fieldDefinition) => pick(fieldDefinition, ['name', 'id'])).sort((a, b) => a.name.localeCompare(b.name))), shareReplay(1));
        this.optionFormatter = (opt) => opt;
        this.fieldOptionsFormatter = (opt) => opt.name;
        this.contextData = this.dockedPanelContext.getData().data;
    }
    ngOnInit() {
        super.ngOnInit();
        this.expressionConfigurator = new RxRecordDataSetExpressionConfigurator();
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'queryExpression',
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
            dataDictionary$: this.recordDefinition$.pipe(withLatestFrom(this.expressionConfigurator.commonDataDictionary$), map(([recordDefinition, commonDataDictionary]) => [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.filter-by.label'),
                    children: [
                        {
                            label: this.rxDefinitionNameService.getDisplayName(recordDefinition === null || recordDefinition === void 0 ? void 0 : recordDefinition.name),
                            children: recordDefinition === null || recordDefinition === void 0 ? void 0 : recordDefinition.fieldDefinitions.map((field) => ({
                                label: field.name,
                                icon: 'd-icon-field_text',
                                expression: `'${field.id}'`
                            }))
                        }
                    ]
                },
                commonDataDictionary[0]
            ]))
        });
        this.queryExpressionOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.expression.label'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary('queryExpression'),
            operators: this.expressionConfigurator.getOperators()
        };
        this.localeOptions = this.rxCognitiveTrainingUtilsService.getTrainingLocales(this.contextData.trainingType.value);
        const dataSource = this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource);
        this.dataSet = {
            dataSetName: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName),
            description: this.contextData.recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description),
            csvFile: null,
            locale: [
                this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale) ||
                    RX_COGNITIVE_TRAINING.settings.defaultTrainingLocale
            ],
            useSeedTrainingData: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.useSeedTrainingData),
            testDataPercent: this.contextData.isNewDataSet
                ? RX_COGNITIVE_TRAINING.settings.defaultTestDataPercentage
                : this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent),
            trainDataPercent: this.contextData.isNewDataSet
                ? RX_COGNITIVE_TRAINING.settings.defaultTrainDataPercentage
                : this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent),
            status: find(RX_COGNITIVE_TRAINING.settings.trainingStatuses, {
                value: this.contextData.recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status)
            }),
            lastSubmittedDate: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastSubmitted),
            lastTrainedDate: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastTrained),
            machineLearningError: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.machineLearningError)
        };
        let dataSourceHistory = JSON.parse(this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory));
        if (dataSourceHistory) {
            dataSourceHistory.layout = JSON.parse(dataSourceHistory.layout);
            dataSourceHistory.layout.categoryFields = _map(dataSourceHistory.layout.categoryFields, (categoryField) => pick(categoryField, ['name', 'id']));
            dataSourceHistory.layout.textFields = _map(dataSourceHistory.layout.textFields, (textField) => pick(textField, ['name', 'id']));
            dataSourceHistory.layout.queryExpressionBasic = {
                filtersJson: JSON.stringify(dataSourceHistory.layout.queryExpressionBasic.filtersJson),
                basicFilters: dataSourceHistory.layout.queryExpressionBasic.basicFilters
            };
        }
        else {
            dataSourceHistory = this.contextData.dataSourceType.dataSourceHistory;
        }
        this.dataSet.dataSourceHistory = dataSourceHistory;
        this.dataSet.filterMode = dataSourceHistory.queryExpression
            ? RecordGridFilterMode.Expression
            : RecordGridFilterMode.Basic;
        if (dataSource && (this.contextData.editDataSet || this.contextData.copyDataSet)) {
            this.rxRecordInstanceService
                .getAttachment(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, this.contextData.getAttachmentRecordInstanceId)
                .subscribe((blob) => {
                this.dataSet.csvFile = [
                    {
                        data: assign(blob, {
                            name: dataSource
                        }),
                        downloadURL: this.rxRecordInstanceService.getAttachmentDownloadUrl(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, this.contextData.recordInstance.id),
                        isUploading: true
                    }
                ];
            });
        }
        if (this.dataSet.dataSourceHistory.recordDefinitionName) {
            this.recordDefinitionName$.next(this.dataSet.dataSourceHistory.recordDefinitionName);
        }
    }
    isDirty() {
        return this.recordDataSetForm.dirty;
    }
    ngOnDestroy() {
        this.recordDefinitionName$.complete();
    }
    openExpressionEditor() {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'queryExpression',
                value: this.dataSet.dataSourceHistory.queryExpression,
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.filter-expression.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-arrow_right_square_input'
                }
            ]
        })
            .subscribe((expression) => {
            this.dataSet.dataSourceHistory.queryExpression = expression.value;
        });
    }
    isBasicFilterMode() {
        return this.dataSet.filterMode === RecordGridFilterMode.Basic;
    }
    isExpressionFilterMode() {
        return this.dataSet.filterMode === RecordGridFilterMode.Expression;
    }
    onRecordDefinitionNameChange(recordDefinitionName) {
        this.dataSet.filterMode = RecordGridFilterMode.Basic;
        this.dataSet.dataSourceHistory.layout.queryExpressionBasic = {
            filtersJson: null,
            basicFilters: null
        };
        this.dataSet.dataSourceHistory.queryExpression = null;
        this.dataSet.dataSourceHistory.layout.textFields = [];
        this.dataSet.dataSourceHistory.layout.categoryFields = [];
        this.recordDefinitionName$.next(recordDefinitionName);
    }
    onTrainDataPercentCounterChange(trainDataPercent) {
        this.dataSet.testDataPercent = 100 - trainDataPercent;
    }
    onTestDataPercentCounterChange(testDataPercent) {
        this.dataSet.trainDataPercent = 100 - testDataPercent;
    }
    onFilterModeChange() {
        this.dataSet.dataSourceHistory.layout.queryExpressionBasic = {
            filtersJson: null,
            basicFilters: null
        };
        this.dataSet.dataSourceHistory.queryExpression = '';
    }
    onSaveClick() {
        this.contextData.recordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'file', (!isEmpty(this.dataSet.csvFile) && this.dataSet.csvFile[0].data) || null);
        this.contextData.recordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'value', (!isEmpty(this.dataSet.csvFile) && this.dataSet.csvFile[0].data.name) || null);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastSubmitted, moment());
        this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, this.dataSet.description);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale, this.dataSet.locale[0]);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent, this.dataSet.testDataPercent);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent, this.dataSet.trainDataPercent);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory, JSON.stringify({
            layout: JSON.stringify({
                queryExpressionBasic: {
                    filtersJson: JSON.parse(this.dataSet.dataSourceHistory.layout.queryExpressionBasic.filtersJson),
                    basicFilters: this.dataSet.dataSourceHistory.layout.queryExpressionBasic.basicFilters
                },
                textFields: this.dataSet.dataSourceHistory.layout.textFields,
                categoryFields: this.dataSet.dataSourceHistory.layout.categoryFields
            }),
            resourceType: this.contextData.dataSourceType.resourceType,
            recordDefinitionName: this.dataSet.dataSourceHistory.recordDefinitionName,
            queryExpression: this.dataSet.dataSourceHistory.queryExpression,
            trainingDataMapper: {
                resourceType: this.dataSet.dataSourceHistory.trainingDataMapper.resourceType,
                textFields: _map(this.dataSet.dataSourceHistory.layout.textFields, 'id'),
                categoryFields: _map(this.dataSet.dataSourceHistory.layout.categoryFields, 'id')
            },
            timeCriteria: this.dataSet.dataSourceHistory.timeCriteria,
            isScheduleEnabled: this.dataSet.dataSourceHistory.isScheduleEnabled
        }));
        if (this.contextData.isNewDataSet || this.contextData.copyDataSet) {
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.bundleId, this.contextData.bundleId);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName, this.dataSet.dataSetName);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetID, '');
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.classificationServiceProvider, this.contextData.trainingType.uniqueValue);
            this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status, RX_COGNITIVE_TRAINING.settings.trainingStatuses.untrained.value);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType, this.contextData.trainingType.value);
            this.rxRecordInstanceService.create(this.contextData.recordInstance).subscribe(() => {
                this.dockedPanelContext.close('save');
            });
        }
        else if (this.contextData.editDataSet) {
            if (this.dataSet.status.value === RX_COGNITIVE_TRAINING.settings.trainingStatuses.trained.value ||
                this.dataSet.status.value === RX_COGNITIVE_TRAINING.settings.trainingStatuses.failed.value) {
                this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status, RX_COGNITIVE_TRAINING.settings.trainingStatuses.pendingRetraining.value);
            }
            this.rxRecordInstanceService.save(this.contextData.recordInstance).subscribe(() => {
                this.dockedPanelContext.close('save');
            });
        }
    }
    onCloseClick() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
RecordDataSetBladeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataSetBladeComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxCognitiveTrainingUtilsService }, { token: i3.RxDefinitionNameService }, { token: i4.RxExpressionEditorService }, { token: i5.RxRecordDefinitionCacheService }, { token: i5.RxRecordInstanceService }, { token: i6.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordDataSetBladeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDataSetBladeComponent, selector: "rx-record-data-set-blade", viewQueries: [{ propertyName: "recordDataSetForm", first: true, predicate: ["recordDataSetForm"], descendants: true, read: NgForm }], usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form #recordDataSetForm=\"ngForm\">\n    <div *ngIf=\"contextData.editDataSet\">\n      <div class=\"d-flex justify-content-between m-0 mb-3\">\n        <div>\n          <label class=\"form-control-label\">\n            {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.status.label' | translate }}\n          </label>\n\n          <div>{{ dataSet.status.label }}</div>\n        </div>\n\n        <div>\n          <label class=\"form-control-label\">\n            {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.date-last-submitted.label' | translate }}\n          </label>\n\n          <div>{{ dataSet.lastSubmittedDate | date: 'medium' }}</div>\n        </div>\n\n        <div>\n          <label class=\"form-control-label\">\n            {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.date-last-trained.label' | translate }}\n          </label>\n\n          <div>{{ dataSet.lastTrainedDate | date: 'medium' }}</div>\n        </div>\n      </div>\n\n      <adapt-alert\n        *ngIf=\"dataSet.machineLearningError\"\n        [config]=\"{\n          content: dataSet.machineLearningError,\n          type: 'inline',\n          variant: 'danger'\n        }\"\n      ></adapt-alert>\n    </div>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"data-set-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label' | translate }}\"\n      rx-id=\"data-set-name-field\"\n      required\n      [disabled]=\"contextData.editDataSet\"\n      [(ngModel)]=\"dataSet.dataSetName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n      rx-id=\"description-field\"\n      required\n      [(ngModel)]=\"dataSet.description\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"training-type\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.training-type.label' | translate }}\"\n      rx-id=\"training-type-field\"\n      required\n      disabled\n      [(ngModel)]=\"contextData.trainingType.displayName\"\n    >\n    </adapt-rx-textfield>\n\n    <span class=\"form-group d-block\" *ngIf=\"dataSet.useSeedTrainingData\">\n      {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set.seed-data-required.label' | translate }}\n    </span>\n\n    <span class=\"form-group d-block\" *ngIf=\"!dataSet.useSeedTrainingData\">\n      {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set.no-seed-data-required.label' | translate }}\n    </span>\n\n    <adapt-rx-uploader\n      class=\"form-group d-block\"\n      name=\"csv-file\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.csv-file.label' | translate }}\"\n      rx-id=\"csv-file-field\"\n      reusable=\"true\"\n      [uploadMode]=\"csvFileUploadMode\"\n      [allowedTypes]=\"['csv']\"\n      [(ngModel)]=\"dataSet.csvFile\"\n    >\n    </adapt-rx-uploader>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      name=\"locale\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.locale.label' | translate }}\"\n      rx-id=\"locale-field\"\n      required\n      [options]=\"localeOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      [(ngModel)]=\"dataSet.locale\"\n    >\n    </adapt-rx-select>\n\n    <rx-definition-picker\n      class=\"form-group d-block\"\n      name=\"record-definition-name\"\n      rx-id=\"record-definition-name-field\"\n      required\n      [options]=\"recordDefinitionPickerOptions\"\n      [(ngModel)]=\"dataSet.dataSourceHistory.recordDefinitionName\"\n      (ngModelChange)=\"onRecordDefinitionNameChange($event)\"\n    >\n    </rx-definition-picker>\n\n    <div *ngIf=\"recordDefinition$ | async\">\n      <rx-group-button-form-control\n        class=\"form-group d-block\"\n        name=\"filter-mode\"\n        rx-id=\"filter-mode-field\"\n        [options]=\"filterModeOptions\"\n        (ngModelChange)=\"onFilterModeChange()\"\n        [(ngModel)]=\"dataSet.filterMode\"\n      >\n      </rx-group-button-form-control>\n\n      <div *ngIf=\"isBasicFilterMode()\">\n        <rx-record-grid-filter-select-control\n          class=\"form-group d-block\"\n          name=\"filters\"\n          rx-id=\"filters-field\"\n          [options]=\"{ primaryRecordDefinition: recordDefinition$ | async }\"\n          [(ngModel)]=\"dataSet.dataSourceHistory.layout.queryExpressionBasic\"\n        >\n        </rx-record-grid-filter-select-control>\n      </div>\n\n      <div *ngIf=\"isExpressionFilterMode()\">\n        <rx-expression-form-control\n          class=\"form-group d-block\"\n          name=\"query-expression\"\n          rx-id=\"query-expression-field\"\n          [options]=\"queryExpressionOptions\"\n          (events)=\"openExpressionEditor()\"\n          [(ngModel)]=\"dataSet.dataSourceHistory.queryExpression\"\n        >\n        </rx-expression-form-control>\n      </div>\n\n      <adapt-rx-select\n        class=\"form-group d-block\"\n        name=\"text-fields\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.text-fields.label' | translate\n        }}\"\n        rx-id=\"text-fields-field\"\n        required\n        multiple=\"true\"\n        [options]=\"fieldOptions$ | async\"\n        [optionFormatter]=\"fieldOptionsFormatter\"\n        [(ngModel)]=\"dataSet.dataSourceHistory.layout.textFields\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        class=\"form-group d-block\"\n        name=\"category-fields\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-training.record-data-set-blade.category-fields.label' | translate\n        }}\"\n        rx-id=\"category-fields-field\"\n        required\n        multiple=\"true\"\n        [options]=\"fieldOptions$ | async\"\n        [optionFormatter]=\"fieldOptionsFormatter\"\n        [(ngModel)]=\"dataSet.dataSourceHistory.layout.categoryFields\"\n      >\n      </adapt-rx-select>\n    </div>\n\n    <adapt-rx-counter\n      class=\"form-group d-block\"\n      name=\"training-data\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.training-data.label' | translate }}\"\n      rx-id=\"training-data-field\"\n      placeholder=\"0\"\n      adaptMin=\"0\"\n      adaptMax=\"100\"\n      min=\"0\"\n      max=\"100\"\n      required\n      (ngModelChange)=\"onTrainDataPercentCounterChange($event)\"\n      [(ngModel)]=\"dataSet.trainDataPercent\"\n    >\n    </adapt-rx-counter>\n\n    <adapt-rx-counter\n      class=\"form-group d-block\"\n      name=\"test-data\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.test-data.label' | translate }}\"\n      rx-id=\"test-data-field\"\n      placeholder=\"0\"\n      adaptMin=\"0\"\n      adaptMax=\"100\"\n      min=\"0\"\n      max=\"100\"\n      required\n      (ngModelChange)=\"onTestDataPercentCounterChange($event)\"\n      [(ngModel)]=\"dataSet.testDataPercent\"\n    >\n    </adapt-rx-counter>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    class=\"mr-2\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    [disabled]=\"recordDataSetForm.pristine || recordDataSetForm.invalid\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button class=\"mr-2\" type=\"button\" rx-id=\"close-button\" adapt-button btn-type=\"secondary\" (click)=\"onCloseClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i4.GroupButtonFormControlComponent, selector: "rx-group-button-form-control", inputs: ["options"] }, { type: i7.RecordGridFilterSelectControlComponent, selector: "rx-record-grid-filter-select-control", inputs: ["options"] }, { type: i4.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }], pipes: { "translate": i6.TranslatePipe, "date": i9.DatePipe, "async": i9.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataSetBladeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-data-set-blade',
                    templateUrl: './record-data-set-blade.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxCognitiveTrainingUtilsService }, { type: i3.RxDefinitionNameService }, { type: i4.RxExpressionEditorService }, { type: i5.RxRecordDefinitionCacheService }, { type: i5.RxRecordInstanceService }, { type: i6.TranslateService }, { type: i0.Injector }]; }, propDecorators: { recordDataSetForm: [{
                type: ViewChild,
                args: ['recordDataSetForm', { read: NgForm }]
            }] } });
//# sourceMappingURL=record-data-set-blade.component.js.map