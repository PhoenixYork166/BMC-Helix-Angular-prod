import * as i0 from '@angular/core';
import { Injectable, Component, Input, ViewChild, HostBinding, NgModule } from '@angular/core';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$2 from '@helix/platform/view/api';
import * as i2$1 from '@helix/platform/shared/api';
import { RX_APPLICATION, RxExpressionConfigurator, RxDefinitionNameService, ExpressionOperatorGroup } from '@helix/platform/shared/api';
import * as i6 from '@angular/forms';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@ngx-translate/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReplaySubject, iif, Subject, NEVER, of, timer, from, forkJoin, BehaviorSubject } from 'rxjs';
import * as i9 from '@helix/platform/view/components';
import { RowSelectionMode, RecordGridColumnAlignment, RecordGridModule } from '@helix/platform/view/components';
import * as i5 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION, RecordFieldOption, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import * as i3 from '@helix/platform/utils';
import { get, map as map$1, isUndefined, find, cloneDeep, sortBy, forEach, flatten, flow, filter, includes, compact, intersectionBy, lowerCase, some, camelCase, omit, every, noop } from 'lodash';
import * as i4$1 from '@helix/platform/ui-kit';
import { RX_MODAL, RxLineLoaderModule, RxBusyIndicatorModule, RxModalClass } from '@helix/platform/ui-kit';
import * as i1 from '@angular/common/http';
import * as i4 from '@bmc-ux/adapt-angular';
import { AdaptButtonModule, AdaptPopoverModule, AdaptRxTextfieldModule, AdaptRxUploaderModule, AdaptRxSelectModule, AdaptTabsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule, AdaptAlertModule, AdaptRxCheckboxModule, DismissReasons, AdaptAccordionModule, AdaptBusyModule, AdaptRxTextareaModule } from '@bmc-ux/adapt-angular';
import { map, distinctUntilChanged, takeUntil, tap, finalize, switchMap, withLatestFrom, filter as filter$1, take } from 'rxjs/operators';
import * as i7 from '@bmc-ux/adapt-table';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import * as i7$1 from '@helix/platform/shared/components';
import { RxDefinitionPickerType, RX_DEFINITION_PICKER, RxDefinitionPickerModule, ExpressionFormControlModule } from '@helix/platform/shared/components';
import * as i8 from '@helix/platform/association/api';
import { RxAssociationDefinitionCacheService } from '@helix/platform/association/api';

const DL_DATA_IMPORT = {
    recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Load Files',
    archiveTrueValue: 1,
    uploadFileStepId: 'uploadDataFile',
    temporaryStepConfig: {
        id: 'temporaryStep',
        name: '',
        componentFactory: null
    },
    attachmentTypes: {
        xlsx: {
            value: 1,
            extension: 'xlsx'
        },
        zip: {
            value: 2,
            extension: 'zip'
        }
    },
    fields: {
        importJobName: 536870913,
        uploadedOn: 536870914,
        importJobDescription: 536870915,
        dataFile: 536870916,
        attachmentOut: 536870917,
        message: 536870918,
        attachmentType: 536870919,
        archivedWorksheetFileName: 536870920,
        isArchived: 536870921,
        mappingConfig: 536870923
    },
    dataStatuses: {
        all: -1,
        queued: 6,
        new: 0,
        processing: 1,
        processed: 2,
        stopping: 7,
        stopped: 8,
        errored: 3
    },
    mergeOptions: {
        generateNewIds: 1,
        rejectDuplicates: 2,
        generateNewIdsForDuplicates: 3,
        updateRecords: 4,
        replaceRecords: 5
    }
};

class DataImportService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.url = `/api/${RX_APPLICATION.dataloadBundleId}/rx/application/dataload/`;
    }
    runLoadProcess(id) {
        return this.httpClient.post(`${this.url}${id}`, {});
    }
    stopDataProcessing(id) {
        return this.httpClient.post(`${this.url}stop/${id}`, {});
    }
    getDataRecordWorksheet(recordId) {
        return this.httpClient.get(`${this.url}${recordId}/input_file_conf`);
    }
    getEmptyCurrentSheetDataMapConfig(sheetName) {
        return {
            name: sheetName,
            configurations: {
                definitionMappings: {
                    targetDefinition: {
                        type: null,
                        name: null
                    },
                    fieldMappings: []
                },
                dataHandlingOptions: [],
                timeFormatOptions: null,
                duplicateHandlingOptions: {
                    matchDuplicateBy: [],
                    handleDuplicateBy: null
                }
            }
        };
    }
}
DataImportService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DataImportService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

class ImportRecordStatusInfoComponent {
    constructor(datePipe, rxTranslateService, rxJsonParserService, activeModalRef, rxRecordInstanceDataPageService) {
        this.datePipe = datePipe;
        this.rxTranslateService = rxTranslateService;
        this.rxJsonParserService = rxJsonParserService;
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.statusData$ = this.rxRecordInstanceDataPageService
            .post({
            params: {
                [RX_RECORD_DEFINITION.coreFieldIds.id]: this.activeModalRef.getData().dataRecordId,
                recorddefinition: DL_DATA_IMPORT.recordDefinitionName
            }
        })
            .pipe(map((dataPage) => {
            if (dataPage.data[0][RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.processing) {
                this.processStartInfo = `${this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.process-started.message')} ${this.datePipe.transform(dataPage.data[0][RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium')}`;
            }
            const dataLoadProgressStatus = get(this.rxJsonParserService.tryParseJson(dataPage.data[0][DL_DATA_IMPORT.fields.message], []), 'dataLoadProgressStatus');
            if (dataLoadProgressStatus) {
                return map$1(dataLoadProgressStatus, (statusInfo) => (Object.assign(Object.assign({}, statusInfo), { updateTime: this.datePipe.transform(statusInfo.updateTime, 'medium') })));
            }
            else {
                this.fileUploadedNotProcessedMsg = dataPage.data[0][DL_DATA_IMPORT.fields.message];
                return [];
            }
        }));
        this.columns = [
            {
                field: 'updateTime',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.status-info-grid.column.updated-date.title'),
                sortable: false,
                width: '20%'
            },
            {
                field: 'status',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                width: '20%'
            },
            {
                field: 'message',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.message.label'),
                width: '80%'
            }
        ];
    }
    close() {
        this.activeModalRef.close();
    }
}
ImportRecordStatusInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImportRecordStatusInfoComponent, deps: [{ token: i1$1.DatePipe }, { token: i2.TranslateService }, { token: i3.RxJsonParserService }, { token: i4.ActiveModalRef }, { token: i5.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ImportRecordStatusInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ImportRecordStatusInfoComponent, selector: "dl-import-record-status-info", ngImport: i0, template: "<ng-template #loaderTemplate>\n  <rx-line-loader></rx-line-loader>\n</ng-template>\n\n<div *ngIf=\"statusData$ | async as statusData; else loaderTemplate\">\n  <div class=\"data-status-info\">\n    <div *ngIf=\"fileUploadedNotProcessedMsg\">\n      {{ fileUploadedNotProcessedMsg }}\n    </div>\n\n    <adapt-alert\n      *ngIf=\"processStartInfo\"\n      [config]=\"{\n        content: processStartInfo,\n        type: 'inline',\n        variant: 'warning'\n      }\"\n    ></adapt-alert>\n\n    <adapt-table\n      [hidden]=\"fileUploadedNotProcessedMsg\"\n      rx-id=\"imported-status-info-grid\"\n      [columns]=\"columns\"\n      [bordered]=\"true\"\n      [value]=\"statusData\"\n      [wrapCellText]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button (click)=\"close()\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" type=\"button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [".data-status-info{padding:15px}\n"], components: [{ type: i4$1.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i4.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i1$1.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImportRecordStatusInfoComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-import-record-status-info',
                    templateUrl: './import-record-status-info.component.html',
                    styleUrls: ['./import-data-status-info.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DatePipe }, { type: i2.TranslateService }, { type: i3.RxJsonParserService }, { type: i4.ActiveModalRef }, { type: i5.RxRecordInstanceDataPageService }]; } });

class DataExportService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.url = `/api/${RX_APPLICATION.dataloadBundleId}/rx/application/dataexport/`;
    }
    isRecordDefinitionResponse(definitionResponse) {
        return !isUndefined(definitionResponse.fieldDefinitions);
    }
    startDataExport(instanceId) {
        return this.httpClient.post(`${this.url}${instanceId}`, {});
    }
}
DataExportService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DataExportService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

class DataImportMappingStepComponent {
    constructor(dataImportService, dataExportService, rxRecordDefinitionCacheService, changeDetectorRef, rxModalService, rxWizardModalComponent, definitionNameService, translateService, rxAssociationDefinitionService, rxNotificationService) {
        this.dataImportService = dataImportService;
        this.dataExportService = dataExportService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.changeDetectorRef = changeDetectorRef;
        this.rxModalService = rxModalService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.definitionNameService = definitionNameService;
        this.translateService = translateService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxNotificationService = rxNotificationService;
        this.sourceFieldNameList = [];
        this.targetFieldList = [];
        this.definitionTypes = {
            record: 'record',
            association: 'association'
        };
        this.definitionTypeOptions = [
            {
                value: this.definitionTypes.record,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label')
            },
            {
                value: this.definitionTypes.association,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label')
            }
        ];
        this.recordPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Record,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            }
        };
        this.associationPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Association,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            }
        };
        this.destroyed$ = new ReplaySubject(1);
        this.duplicateHandlingOptions = [
            {
                id: DL_DATA_IMPORT.mergeOptions.generateNewIds,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.generating-new-id-for-all')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.generateNewIdsForDuplicates,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.generating-new-id-for-duplicates')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.rejectDuplicates,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.rejecting-duplicate')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.replaceRecords,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.replacing-existing-records')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.updateRecords,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.updating-old-with-new')
            }
        ];
        this.dataOptions = [
            {
                id: 1,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.remove-leading-spaces-and-tabs'),
                isSelected: false
            },
            {
                id: 2,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.remove-trailing-spaces-and-tabs'),
                isSelected: false
            },
            {
                id: 3,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.truncate-long-strings'),
                isSelected: false
            }
        ];
        this.matchDuplicateByFields = [];
        this.selectedMatchDuplicateByFields = [];
        this.dateTimeFormatOptions = [
            {
                id: 1,
                name: 'dd/MM/yy',
                example: '25/11/21'
            },
            {
                id: 2,
                name: 'dd/MM/yyyy',
                example: '25/11/2021'
            },
            {
                id: 3,
                name: 'MM/dd/yyyy',
                example: '11/25/2021'
            },
            {
                id: 4,
                name: 'yyyy/MM/dd',
                example: '2021/11/25'
            },
            {
                id: 5,
                name: `yyyy-MM-dd'T'HH:mm:ss:SSSZ`,
                example: '2021-11-25T11:12:13:000+0530'
            }
        ];
    }
    ngOnInit() {
        this.excelSheetName = this.options.sheetName;
        this.currentSheetDataImportMapping = this.dataImportService.getEmptyCurrentSheetDataMapConfig(this.excelSheetName);
        this.currentExcelSheetConfiguration = this.context.excelSheetsConfiguration[this.excelSheetName];
        this.sourceFieldNameList = map$1(this.currentExcelSheetConfiguration.fields, 'name');
        this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy = [
            find(this.duplicateHandlingOptions, { id: DL_DATA_IMPORT.mergeOptions.generateNewIds })
        ];
        const isCloningConfig = Boolean(this.context.clonedConfigurationInstanceId);
        if (isCloningConfig && this.context.isClonedConfigMatched) {
            this.currentSheetDataImportMapping = cloneDeep(this.getRefactoredClonedConfiguration(find(this.context.dataImportContext.dataImportConfigurations.sheets, {
                name: this.excelSheetName
            })));
            setTimeout(() => this.updateDataChangesToSheetMapContext());
            if (this.getRecordDefinitionName()) {
                this.loadTargetAndOtherFields(false, false);
            }
            else {
                this.setTypeFromExcelSheet();
            }
        }
        else {
            this.setTypeFromExcelSheet();
        }
    }
    ngAfterViewInit() {
        this.dataImportConfigurationForm.control.valueChanges
            .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((values) => setTimeout(() => this.updateDataChangesToSheetMapContext()));
    }
    removeMapping(index) {
        this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.splice(index, 1);
    }
    addFieldMapping(sourceFieldName = null, targetField = null) {
        this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.push({
            sourceField: { fieldName: sourceFieldName ? [sourceFieldName] : null },
            targetField: targetField ? [targetField] : null
        });
        this.updateWizardButtons();
    }
    setDefinitionTypeNameFromExcelSheet() {
        this.setTypeFromExcelSheet();
        this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name =
            this.currentExcelSheetConfiguration.definition.value;
    }
    setTypeFromExcelSheet() {
        this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type =
            this.getTypeFromExcelSheet();
    }
    autoMapping() {
        this.clearMappingFields();
        this.setDefinitionTypeNameFromExcelSheet();
        this.loadTargetAndOtherFields(true);
    }
    loadTargetAndOtherFields(isAutoMapping = false, autoPopulateRequiredFields = false) {
        this.areFieldsLoading = true;
        this.requiredFieldNames = [];
        iif(() => this.isDefinitionTypeRecord(), this.rxRecordDefinitionCacheService.getRecordDefinition(this.getRecordDefinitionName()), this.rxAssociationDefinitionService.get(this.getRecordDefinitionName()))
            .pipe(map((definitionResponse) => {
            if (this.dataExportService.isRecordDefinitionResponse(definitionResponse)) {
                this.targetFieldList = definitionResponse.fieldDefinitions
                    .sort(function (a, b) {
                    if (a.fieldOption === RecordFieldOption.Required && !a.defaultValue) {
                        return -1;
                    }
                    else {
                        b.name.localeCompare(a.name);
                    }
                })
                    .map((fieldDefinition) => {
                    if (this.isMappingFieldDefinitionRequired(fieldDefinition)) {
                        this.requiredFieldNames.push(fieldDefinition.name);
                        if (autoPopulateRequiredFields) {
                            this.addFieldMapping(null, {
                                name: fieldDefinition.name,
                                _fieldId: fieldDefinition.id
                            });
                        }
                    }
                    return {
                        name: fieldDefinition.name,
                        _fieldId: fieldDefinition.id
                    };
                });
            }
            else {
                this.targetFieldList = [
                    {
                        name: definitionResponse.nodeAName || '',
                        _fieldId: definitionResponse.nodeAKeys[0] || ''
                    },
                    {
                        name: definitionResponse.nodeBName || '',
                        _fieldId: definitionResponse.nodeBKeys[0]
                    }
                ].filter((field) => field.name);
            }
        }), tap(() => {
            if (isAutoMapping) {
                this.generateAutoMappingFields();
            }
        }), finalize(() => {
            this.areFieldsLoading = false;
        }))
            .subscribe(() => {
            this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings = sortBy(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, (fieldMap) => get(fieldMap, 'targetField[0].name'));
        });
    }
    isMappingFieldDefinitionRequired(fieldDefinition) {
        return fieldDefinition.fieldOption === RecordFieldOption.Required && !fieldDefinition.defaultValue;
    }
    generateAutoMappingFields() {
        forEach(this.sourceFieldNameList, (sourceFieldName) => {
            const matchedTargetField = this.targetFieldList.find((targetField) => sourceFieldName === targetField.name || sourceFieldName === String(targetField._fieldId));
            if (matchedTargetField) {
                this.addFieldMapping(sourceFieldName, matchedTargetField);
            }
            else {
                this.addFieldMapping(sourceFieldName, null);
            }
        });
        const targetFieldMappings = flatten(map$1(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, 'targetField'));
        forEach(this.targetFieldList, (targetField) => {
            if (!find(targetFieldMappings, { name: targetField.name }) && this.isRequiredTargetField(targetField)) {
                this.addFieldMapping(null, targetField);
            }
        });
    }
    onDefinitionChange(definitionName) {
        this.clearMappingFields();
        if (definitionName) {
            if (!this.definitionNameService.getBundleId(definitionName)) {
                this.showInvalidDefinitionSelectedMsg();
            }
            else {
                this.loadTargetAndOtherFields(false, true);
            }
        }
    }
    clearMappingFields() {
        this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings = [];
    }
    getRecordDefinitionName(isAutoMapping) {
        return isAutoMapping
            ? this.currentExcelSheetConfiguration.definition.value
            : this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name;
    }
    clearDefinitionSelection() {
        this.changeDetectorRef.detectChanges();
        this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name = null;
    }
    onDefinitionTypeChange() {
        this.clearMappingFields();
        this.clearDefinitionSelection();
    }
    showInvalidDefinitionSelectedMsg() {
        this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.global-record-not-allowed.message'));
        this.clearDefinitionSelection();
    }
    isDefinitionTypeRecord() {
        return (this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===
            this.definitionTypes.record);
    }
    optionFormatter(field) {
        return field.name;
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    isStepActive() {
        var _a;
        return this.rxWizardModalComponent.api.isCurrentStepActive((_a = this.currentExcelSheetConfiguration) === null || _a === void 0 ? void 0 : _a.stepId);
    }
    onTargetFieldSelection($event, index) {
        const isFieldAlreadySelected = flow((fields) => filter(fields, (value, key) => key !== index), (alreadySelectedFields) => find(alreadySelectedFields, (fieldMap) => { var _a, _b; return fieldMap.targetField && ((_a = fieldMap === null || fieldMap === void 0 ? void 0 : fieldMap.targetField[0]) === null || _a === void 0 ? void 0 : _a.name) === ((_b = $event.options[0]) === null || _b === void 0 ? void 0 : _b.name); }), (fieldMap) => fieldMap)(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings);
        if (isFieldAlreadySelected) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.target-field-already-selected.message.title'));
            $event.preventDefault();
        }
        else {
            setTimeout(() => this.updateDataChangesToSheetMapContext());
        }
    }
    isRequiredTargetField(targetField) {
        return includes(this.requiredFieldNames, (targetField === null || targetField === void 0 ? void 0 : targetField.name) || get(targetField, '[0].name'));
    }
    shouldGenerateNewIdForDuplicateRecords() {
        var _a;
        return (this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy &&
            ((_a = this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy[0]) === null || _a === void 0 ? void 0 : _a.id) === 1);
    }
    onTabActivated(event) {
        if (event.index === 1) {
            this.matchDuplicateByFields = flow((fields) => map$1(fields, 'targetField'), compact, flatten)(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings);
            const defaultMatchByField = find(this.matchDuplicateByFields, { _fieldId: RX_RECORD_DEFINITION.coreFieldIds.id });
            if (defaultMatchByField && !this.selectedMatchDuplicateByFields.length) {
                this.selectedMatchDuplicateByFields = [defaultMatchByField];
            }
            this.selectedMatchDuplicateByFields = intersectionBy(this.matchDuplicateByFields, this.selectedMatchDuplicateByFields, 'name');
        }
    }
    getTypeFromExcelSheet() {
        return lowerCase(this.currentExcelSheetConfiguration.definition.name);
    }
    get timeFormatExample() {
        var _a;
        return (this.currentSheetDataImportMapping.configurations.timeFormatOptions &&
            ((_a = this.currentSheetDataImportMapping.configurations.timeFormatOptions[0]) === null || _a === void 0 ? void 0 : _a.example));
    }
    areFieldMappingsInvalid() {
        return some(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, (fieldMap) => !fieldMap.sourceField.fieldName || !fieldMap.targetField);
    }
    updateWizardButtons() {
        this.rxWizardModalComponent.config.options.allowFinish =
            this.rxWizardModalComponent.activeTabIndex === this.rxWizardModalComponent.config.options.steps.length - 1;
        if (this.dataImportConfigurationForm.invalid || this.areFieldMappingsInvalid()) {
            this.rxWizardModalComponent.api.disableNextButton();
            this.rxWizardModalComponent.api.disableFinishButton();
        }
        else {
            this.rxWizardModalComponent.api.enableNextButton();
            this.rxWizardModalComponent.api.enableFinishButton();
        }
    }
    updateDataChangesToSheetMapContext() {
        this.updateWizardButtons();
        this.rxWizardModalComponent.api.markDirty();
        const currentConfigurations = cloneDeep(this.currentSheetDataImportMapping.configurations);
        filter(currentConfigurations.definitionMappings.fieldMappings, (field) => field.targetField).forEach((field) => {
            field.sourceField = { fieldName: get(field.sourceField, 'fieldName[0]') };
            field.targetField = field.targetField[0];
        });
        currentConfigurations.duplicateHandlingOptions.handleDuplicateBy = get(currentConfigurations.duplicateHandlingOptions.handleDuplicateBy, '[0].id');
        if (this.shouldGenerateNewIdForDuplicateRecords()) {
            currentConfigurations.duplicateHandlingOptions.matchDuplicateBy = [];
        }
        else {
            currentConfigurations.duplicateHandlingOptions.matchDuplicateBy = map$1(this.selectedMatchDuplicateByFields, (field) => ({
                _fieldId: field._fieldId,
                name: field.name
            }));
        }
        currentConfigurations.dataHandlingOptions = this.dataOptions
            .filter((option) => option.isSelected)
            .map((option) => option.id);
        currentConfigurations.timeFormatOptions = get(currentConfigurations.timeFormatOptions, '[0].name');
        const sheetImportConfig = find(this.context.dataImportContext.dataImportConfigurations.sheets, {
            name: this.excelSheetName
        });
        sheetImportConfig.configurations = currentConfigurations;
    }
    getRefactoredClonedConfiguration(configuration) {
        forEach(configuration.configurations.definitionMappings.fieldMappings, (fieldMap) => {
            fieldMap.targetField = [fieldMap.targetField];
            fieldMap.sourceField.fieldName = [fieldMap.sourceField.fieldName];
        });
        this.dataOptions.forEach((option) => {
            option.isSelected = includes(configuration.configurations.dataHandlingOptions, option.id);
        });
        configuration.configurations.timeFormatOptions = configuration.configurations.timeFormatOptions
            ? [
                find(this.dateTimeFormatOptions, {
                    name: configuration.configurations.timeFormatOptions
                })
            ]
            : [];
        configuration.configurations.duplicateHandlingOptions.handleDuplicateBy = configuration.configurations
            .duplicateHandlingOptions.handleDuplicateBy
            ? [
                find(this.duplicateHandlingOptions, {
                    id: configuration.configurations.duplicateHandlingOptions.handleDuplicateBy
                })
            ]
            : [find(this.duplicateHandlingOptions, { id: DL_DATA_IMPORT.mergeOptions.generateNewIds })];
        if (configuration.configurations.duplicateHandlingOptions.matchDuplicateBy.length) {
            this.selectedMatchDuplicateByFields = configuration.configurations.duplicateHandlingOptions.matchDuplicateBy;
        }
        return configuration;
    }
}
DataImportMappingStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportMappingStepComponent, deps: [{ token: DataImportService }, { token: DataExportService }, { token: i5.RxRecordDefinitionCacheService }, { token: i0.ChangeDetectorRef }, { token: i4$1.RxModalService }, { token: i7$1.RxWizardModalComponent }, { token: i2$1.RxDefinitionNameService }, { token: i2.TranslateService }, { token: i8.RxAssociationDefinitionService }, { token: i2$1.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
DataImportMappingStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataImportMappingStepComponent, selector: "dl-data-import-mapping-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "dataImportConfigurationForm", first: true, predicate: ["dataImportConfigurationForm"], descendants: true }], ngImport: i0, template: "<form #dataImportConfigurationForm=\"ngForm\">\n  <adapt-tabset type=\"pills\" [tab-active]=\"0\" (tab-active-changed)=\"onTabActivated($event)\">\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.title' | translate }}\"\n    >\n      <div *ngIf=\"isStepActive()\" class=\"mt-2\">\n        <button\n          adapt-button\n          btn-type=\"primary\"\n          type=\"button\"\n          rx-id=\"auto-mapping\"\n          (click)=\"autoMapping()\"\n          size=\"small\"\n          class=\"d-icon-left-arrow_schema form-group\"\n          [disabled]=\"areFieldsLoading\"\n        >\n          {{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.types.auto-mapping.label' | translate }}\n        </button>\n\n        <adapt-rx-radiobutton-group\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type\"\n          (ngModelChange)=\"onDefinitionTypeChange()\"\n          name=\"definitionType\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.definition.label' | translate }}\"\n          rx-id=\"definition-type\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let definitionType of definitionTypeOptions; let index = index\"\n            class=\"radio-inline m-0\"\n            [value]=\"definitionType.value\"\n            [label]=\"definitionType.displayValue\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <rx-definition-picker\n          *ngIf=\"\n            currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===\n            definitionTypes.record\n          \"\n          class=\"d-block form-group\"\n          [options]=\"recordPickerOptions\"\n          rx-id=\"record-definition-picker\"\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\"\n          (ngModelChange)=\"onDefinitionChange($event)\"\n          name=\"recordDefinitionName\"\n        >\n        </rx-definition-picker>\n\n        <rx-definition-picker\n          *ngIf=\"\n            currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===\n            definitionTypes.association\n          \"\n          class=\"d-block form-group\"\n          [options]=\"associationPickerOptions\"\n          rx-id=\"association-definition-picker\"\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\"\n          (ngModelChange)=\"onDefinitionChange($event)\"\n          name=\"associationDefinitionName\"\n        >\n        </rx-definition-picker>\n\n        <div *ngIf=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\">\n          <div class=\"row border-bottom form-group\">\n            <div class=\"col-6\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.mapping-title.title' | translate\n                }}\"\n              >\n              </adapt-rx-control-label>\n            </div>\n\n            <div class=\"col-6\">\n              <button\n                class=\"d-icon-left-plus_circle float-right py-0 px-2\"\n                adapt-button\n                btn-type=\"tertiary\"\n                type=\"button\"\n                rx-id=\"add-mapping\"\n                (click)=\"addFieldMapping()\"\n              >\n                {{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.types.manual-mapping.label'\n                    | translate\n                }}\n              </button>\n            </div>\n          </div>\n\n          <div class=\"row\" *ngIf=\"currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.length\">\n            <div class=\"col-6\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.source-fields.label' | translate\n                }}\"\n              ></adapt-rx-control-label>\n            </div>\n\n            <div class=\"col-6 pl-0\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.target-fields.label' | translate\n                }}\"\n              ></adapt-rx-control-label>\n            </div>\n          </div>\n\n          <div class=\"loader-container\" *ngIf=\"areFieldsLoading\">\n            <div class=\"loader-section\"></div>\n          </div>\n\n          <div\n            class=\"row no-gutters\"\n            *ngFor=\"\n              let fieldMapping of currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings;\n              let $index = index\n            \"\n          >\n            <div class=\"col-5\">\n              <adapt-rx-select\n                class=\"d-block form-group\"\n                [(ngModel)]=\"fieldMapping.sourceField.fieldName\"\n                [options]=\"sourceFieldNameList\"\n                [required]=\"true\"\n                [enableFilter]=\"true\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                (ngModelChange)=\"updateDataChangesToSheetMapContext()\"\n                rx-id=\"source-field-names\"\n              >\n              </adapt-rx-select>\n            </div>\n\n            <div class=\"col-1 d-icon-arrow_right text-tertiary mt-2 text-center\"></div>\n\n            <div class=\"col-5\">\n              <adapt-rx-select\n                class=\"d-block form-group\"\n                [(ngModel)]=\"fieldMapping.targetField\"\n                [options]=\"targetFieldList\"\n                [optionFormatter]=\"optionFormatter\"\n                [required]=\"true\"\n                (onSelectionChange)=\"onTargetFieldSelection($event, $index)\"\n                [enableFilter]=\"true\"\n                [disabled]=\"isRequiredTargetField(fieldMapping.targetField)\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                rx-id=\"target-fields\"\n              >\n              </adapt-rx-select>\n            </div>\n\n            <div class=\"col-1 pl-3\">\n              <button\n                [disabled]=\"isRequiredTargetField(fieldMapping.targetField)\"\n                [ngClass]=\"{ 'text-tertiary': isRequiredTargetField(fieldMapping.targetField) }\"\n                class=\"d-icon-minus_circle text-danger form-group px-0\"\n                adapt-button\n                btn-type=\"tertiary\"\n                type=\"button\"\n                rx-id=\"remove-mapping-button\"\n                (click)=\"removeMapping($index)\"\n              ></button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.title' | translate }}\"\n    >\n      <adapt-rx-select\n        label=\"{{\n          'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.label' | translate\n        }}\"\n        class=\"d-block form-group mt-2\"\n        [(ngModel)]=\"currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy\"\n        [options]=\"duplicateHandlingOptions\"\n        name=\"handleDuplicatesBy\"\n        rx-id=\"handle-duplicates-by\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        label=\"{{\n          'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.match-by.label' | translate\n        }}\"\n        *ngIf=\"!shouldGenerateNewIdForDuplicateRecords()\"\n        class=\"d-block form-group\"\n        [(ngModel)]=\"selectedMatchDuplicateByFields\"\n        [options]=\"matchDuplicateByFields\"\n        [multiple]=\"true\"\n        [enableFilter]=\"true\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [optionFormatter]=\"optionFormatter\"\n        [required]=\"!shouldGenerateNewIdForDuplicateRecords()\"\n        name=\"matchDuplicatesBy\"\n        rx-id=\"match-duplicates-by\"\n      >\n      </adapt-rx-select>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.common.options.label' | translate }}\">\n      <adapt-rx-checkbox\n        *ngFor=\"let dataOption of dataOptions; let index = index\"\n        [(ngModel)]=\"dataOption.isSelected\"\n        label=\"{{ dataOption.name }}\"\n        [ngClass]=\"{ 'd-block form-group': index === 2 }\"\n        name=\"{{ 'data-option' + dataOption.id }}\"\n        [attr.rx-id]=\"'data-option' + dataOption.id\"\n      ></adapt-rx-checkbox>\n\n      <adapt-rx-select\n        label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.date-format.label' | translate }}\"\n        class=\"d-block mb-1\"\n        [(ngModel)]=\"currentSheetDataImportMapping.configurations.timeFormatOptions\"\n        [options]=\"dateTimeFormatOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [optionContentTemplate]=\"optionTemplate\"\n        name=\"dateFormat\"\n        rx-id=\"date-format\"\n      >\n      </adapt-rx-select>\n\n      <div class=\"text-tertiary\" *ngIf=\"timeFormatExample\">\n        {{ 'com.bmc.arsys.rx.client.common.example.label' | translate }}:\n        {{ timeFormatExample }}\n      </div>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</form>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.name }}</strong>\n\n  <div class=\"text-tertiary\">e.g. {{ option.example }}</div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep adapt-rx-radiobutton .radio{margin:8px 0}:host::ng-deep .dropdown-item{white-space:normal;word-break:break-all}adapt-rx-select,rx-definition-picker{max-width:400px}\n"], components: [{ type: i4.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i4.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i7$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i4.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportMappingStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-import-mapping-step',
                    templateUrl: './data-import-mapping-step.component.html',
                    styleUrls: ['./data-import-mapping-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: DataImportService }, { type: DataExportService }, { type: i5.RxRecordDefinitionCacheService }, { type: i0.ChangeDetectorRef }, { type: i4$1.RxModalService }, { type: i7$1.RxWizardModalComponent }, { type: i2$1.RxDefinitionNameService }, { type: i2.TranslateService }, { type: i8.RxAssociationDefinitionService }, { type: i2$1.RxNotificationService }]; }, propDecorators: { context: [{
                type: Input
            }], options: [{
                type: Input
            }], dataImportConfigurationForm: [{
                type: ViewChild,
                args: ['dataImportConfigurationForm']
            }] } });

class UploadDataFileStepComponent {
    constructor(rxRecordInstanceService, rxNotificationService, dataImportService, rxModalService, translateService, formBuilder, rxWizardModalComponent, rxWizardService, componentFactoryResolver) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxNotificationService = rxNotificationService;
        this.dataImportService = dataImportService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.formBuilder = formBuilder;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxWizardService = rxWizardService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.isWorksheetProcessed = false;
        this.destroyed$ = new ReplaySubject(1);
        this.processCustomizedImport$ = new Subject();
        this.saveDataFileConfiguration = this.processCustomizedImport$
            .pipe(takeUntil(this.destroyed$), tap(() => {
            this.busy = NEVER.subscribe();
        }), switchMap(() => {
            if (this.isWorksheetProcessed) {
                return of(null);
            }
            else {
                return iif(() => !!this.context.createdRecordInstanceId, this.rxRecordInstanceService.get(DL_DATA_IMPORT.recordDefinitionName, this.context.createdRecordInstanceId), this.rxRecordInstanceService.getNew(DL_DATA_IMPORT.recordDefinitionName)).pipe(switchMap((recordInstance) => {
                    this.updateRecordInstanceFields(recordInstance);
                    return this.context.createdRecordInstanceId
                        ? this.rxRecordInstanceService.save(recordInstance)
                        : this.rxRecordInstanceService.create(recordInstance);
                }), tap((recordInstanceResponse) => {
                    if (!this.context.createdRecordInstanceId) {
                        this.context.createdRecordInstanceId = recordInstanceResponse === null || recordInstanceResponse === void 0 ? void 0 : recordInstanceResponse.id;
                    }
                }));
            }
        }), switchMap(() => this.isWorksheetProcessed
            ? of(null)
            : this.dataImportService.getDataRecordWorksheet(this.context.createdRecordInstanceId)), withLatestFrom(timer(0).pipe(switchMap(() => {
            var _a;
            return ((_a = this.context) === null || _a === void 0 ? void 0 : _a.clonedConfigurationInstanceId)
                ? this.rxRecordInstanceService.get(DL_DATA_IMPORT.recordDefinitionName, this.context.clonedConfigurationInstanceId)
                : of(null);
        }))), tap(() => {
            this.busy.unsubscribe();
        }), switchMap(([uploadedExcelFile, clonedRecordInstance]) => {
            if (this.isWorksheetProcessed) {
                return of({ gotoNextStep: true });
            }
            else if (uploadedExcelFile === null || uploadedExcelFile === void 0 ? void 0 : uploadedExcelFile.sheets) {
                this.isWorksheetProcessed = true;
                this.uploadedExcelSheets = uploadedExcelFile.sheets;
                this.rxWizardModalComponent.api.removeStep(1);
                forEach(this.uploadedExcelSheets, (sheet) => {
                    const stepId = camelCase(sheet.sheetName);
                    sheet.configurations.stepId = stepId;
                    this.context.excelSheetsConfiguration[sheet.sheetName] = sheet.configurations;
                    this.rxWizardModalComponent.api.addStep({
                        id: stepId,
                        name: sheet.sheetName,
                        options: {
                            sheetName: sheet.sheetName
                        },
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataImportMappingStepComponent)
                    });
                    this.context.dataImportContext.dataImportConfigurations.sheets.push(this.dataImportService.getEmptyCurrentSheetDataMapConfig(sheet.sheetName));
                });
                if (this.context.clonedConfigurationInstanceId) {
                    const clonedConfig = JSON.parse(clonedRecordInstance.fieldInstances[DL_DATA_IMPORT.fields.mappingConfig].value) || { dataImportConfigurations: { sheets: [] } };
                    const nonMatchedSheetNames = clonedConfig.dataImportConfigurations.sheets.filter((clonedSheet) => !uploadedExcelFile.sheets.some((excelSheet) => excelSheet.sheetName === clonedSheet.name));
                    if (clonedConfig.dataImportConfigurations.sheets.length !== uploadedExcelFile.sheets.length ||
                        nonMatchedSheetNames.length) {
                        return from(this.rxModalService.confirm({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.configuration-mismatch.message'),
                            buttons: {
                                confirmButton: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                                dismissButton: this.translateService.instant('com.bmc.arsys.rx.client.common.continue.label')
                            }
                        })).pipe(switchMap((result) => iif(() => result, this.deleteCreatedDataImportInstance(), of({ recordDeleted: false }))), tap((response) => {
                            if (response.recordDeleted) {
                                this.rxWizardModalComponent.api.markPristine();
                                this.rxWizardModalComponent.close();
                            }
                            else {
                                this.goToDataConfigurationStep();
                            }
                        }));
                    }
                    else {
                        this.context.dataImportContext.dataImportConfigurations.sheets =
                            clonedConfig.dataImportConfigurations.sheets;
                        this.context.isClonedConfigMatched = true;
                        return of({ gotoNextStep: true });
                    }
                }
                else {
                    return of({ gotoNextStep: true });
                }
            }
            else {
                this.isWorksheetProcessed = false;
                this.uploadDataFileForm.markAsDirty();
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.invalid-attachment-uploaded-error.message'));
                return this.deleteCreatedDataImportInstance();
            }
        }))
            .subscribe((response) => {
            if (response.gotoNextStep) {
                setTimeout(() => this.goToDataConfigurationStep());
            }
        });
    }
    ngOnInit() {
        this.rxWizardModalComponent.next$
            .pipe(filter$1((stepId) => stepId === DL_DATA_IMPORT.uploadFileStepId), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.saveDataloadFileAndProceedToConfigurations();
        });
        this.rxWizardModalComponent.api.disableNextButton();
        this.uploadDataFileForm = this.formBuilder.group({
            importJobName: [null, [Validators.required, Validators.maxLength(254)]],
            importJobDescription: [null, Validators.maxLength(254)],
            dataFile: null,
            archivedWorksheetFileName: [null, [Validators.required, Validators.maxLength(254)]]
        });
        this.uploadDataFileForm.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe(() => {
            this.updateWizardButtons();
            const context = {
                importJobName: this.uploadDataFileForm.get('importJobName').value,
                importJobDescription: this.uploadDataFileForm.get('importJobDescription').value,
                attachmentType: this.isZipAttachmentUploaded
                    ? DL_DATA_IMPORT.attachmentTypes.zip.value
                    : DL_DATA_IMPORT.attachmentTypes.xlsx.value,
                archivedWorksheetFileName: this.uploadDataFileForm.get('archivedWorksheetFileName').value
            };
            this.rxWizardModalComponent.api.updateContext({
                importJobInfo: context
            });
        });
    }
    updateWizardButtons() {
        if (this.uploadDataFileForm.pristine || this.uploadDataFileForm.invalid) {
            this.rxWizardModalComponent.api.disableNextButton();
        }
        else {
            this.rxWizardModalComponent.api.enableNextButton();
        }
    }
    saveDataloadFile() {
        this.rxWizardModalComponent.api.disableNextButton();
        this.uploadDataFileForm.markAsPristine();
        this.rxWizardModalComponent.api.markPristine();
        this.rxRecordInstanceService
            .getNew(DL_DATA_IMPORT.recordDefinitionName)
            .pipe(switchMap((recordInstance) => {
            this.updateRecordInstanceFields(recordInstance);
            return this.rxRecordInstanceService.create(recordInstance);
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.data-record-saved.message'));
            this.rxWizardModalComponent.close();
        });
    }
    saveDataloadFileAndProceedToConfigurations() {
        this.isCustomizedImportStarted = true;
        this.rxWizardModalComponent.api.disableNextButton();
        this.uploadDataFileForm.markAsPristine();
        this.processCustomizedImport$.next();
    }
    handleWorksheetNameInput() {
        if (this.isZipAttachmentUploaded) {
            this.uploadDataFileForm.get('archivedWorksheetFileName').enable();
        }
        else {
            this.uploadDataFileForm.get('archivedWorksheetFileName').disable();
        }
    }
    onAfterFilesAdded(event) {
        if (event.length) {
            this.isWorksheetProcessed = false;
            this.isZipAttachmentUploaded = this.isZipExtension(event[0].data.name);
            this.handleWorksheetNameInput();
        }
    }
    onRemovedFileFromQueue() {
        this.isZipAttachmentUploaded = false;
        this.handleWorksheetNameInput();
        this.uploadDataFileForm.controls.archivedWorksheetFileName.setValue('');
    }
    getAllowedTypes() {
        return [DL_DATA_IMPORT.attachmentTypes.zip.extension, DL_DATA_IMPORT.attachmentTypes.xlsx.extension];
    }
    isZipExtension(fileName) {
        return fileName.split('.').pop().toLowerCase() === DL_DATA_IMPORT.attachmentTypes.zip.extension;
    }
    deleteCreatedDataImportInstance() {
        return this.rxRecordInstanceService
            .delete(DL_DATA_IMPORT.recordDefinitionName, this.context.createdRecordInstanceId)
            .pipe(tap(() => {
            this.context.createdRecordInstanceId = null;
        }), map(() => ({
            recordDeleted: true
        })));
    }
    goToDataConfigurationStep() {
        this.rxWizardModalComponent.next(true);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    updateRecordInstanceFields(recordInstance) {
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobName, this.uploadDataFileForm.get('importJobName').value);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobDescription, this.uploadDataFileForm.get('importJobDescription').value);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.attachmentType, this.isZipAttachmentUploaded
            ? DL_DATA_IMPORT.attachmentTypes.zip.value
            : DL_DATA_IMPORT.attachmentTypes.xlsx.value);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.dataFile, this.uploadDataFileForm.get('dataFile').value[0].data);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.archivedWorksheetFileName, this.uploadDataFileForm.get('archivedWorksheetFileName').value);
    }
}
UploadDataFileStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploadDataFileStepComponent, deps: [{ token: i5.RxRecordInstanceService }, { token: i2$1.RxNotificationService }, { token: DataImportService }, { token: i4$1.RxModalService }, { token: i2.TranslateService }, { token: i6.FormBuilder }, { token: i7$1.RxWizardModalComponent }, { token: i7$1.RxWizardService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
UploadDataFileStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: UploadDataFileStepComponent, selector: "dl-upload-data-file-step", inputs: { context: "context" }, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<form [formGroup]=\"uploadDataFileForm\" class=\"d-flex flex-column flex-fill h-100\">\n  <adapt-rx-textfield\n    class=\"d-block form-group\"\n    formControlName=\"importJobName\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.import-job-name.label' | translate }}\"\n    rx-id=\"import-job-name\"\n    [autofocus]=\"true\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textfield\n    class=\"d-block form-group\"\n    formControlName=\"importJobDescription\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.import-job-description.label' | translate }}\"\n    rx-id=\"import-job-description\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-uploader\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.data-file.label' | translate }}\"\n    formControlName=\"dataFile\"\n    [required]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    [allowedTypes]=\"getAllowedTypes()\"\n    (afterFilesAdded)=\"onAfterFilesAdded($event)\"\n    (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n    rx-id=\"data-file\"\n  >\n  </adapt-rx-uploader>\n\n  <adapt-rx-textfield\n    *ngIf=\"isZipAttachmentUploaded\"\n    class=\"d-block mb-1\"\n    formControlName=\"archivedWorksheetFileName\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.attachment-type.zip.content-file.label' | translate }}\"\n    rx-id=\"archived-worksheet-file-name\"\n    [autofocus]=\"true\"\n    (onFocus)=\"updateWizardButtons()\"\n  >\n  </adapt-rx-textfield>\n\n  <div class=\"text-tertiary form-group\" *ngIf=\"isZipAttachmentUploaded\">\n    {{ 'com.bmc.arsys.rx.client.common.example.label' | translate }} Worksheet.xlsx\n  </div>\n\n  <button\n    adapt-button\n    class=\"mt-auto align-self-end\"\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"quick-import-button\"\n    (click)=\"saveDataloadFile()\"\n    [disabled]=\"uploadDataFileForm.pristine || uploadDataFileForm.invalid || isCustomizedImportStarted\"\n  >\n    {{ 'com.bmc.arsys.rx.client.dataload.import.wizard.quick-data-import.label' | translate }}\n  </button>\n</form>\n", styles: [":host{position:relative;display:block;height:100%}\n"], components: [{ type: i4$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploadDataFileStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-upload-data-file-step',
                    templateUrl: './upload-data-file-step.component.html',
                    styleUrls: ['./upload-data-file-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i5.RxRecordInstanceService }, { type: i2$1.RxNotificationService }, { type: DataImportService }, { type: i4$1.RxModalService }, { type: i2.TranslateService }, { type: i6.FormBuilder }, { type: i7$1.RxWizardModalComponent }, { type: i7$1.RxWizardService }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { context: [{
                type: Input
            }] } });

class DataImportComponent {
    constructor(componentFactoryResolver, rxModalService, rxDefinitionNameService, rxNotificationService, rxWizardService, translateService, rxRecordInstanceService, adaptModalService, rxJsonParserService, dataImportService, rxRecordInstanceDataPageService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxModalService = rxModalService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxNotificationService = rxNotificationService;
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.adaptModalService = adaptModalService;
        this.rxJsonParserService = rxJsonParserService;
        this.dataImportService = dataImportService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.hostClass = 'd-flex mh-100 flex-column';
    }
    ngOnInit() {
        this.gridConfig$ = of({
            guid: 'dl-import-grid',
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.grid.load-data.label'),
                    style: 'tertiary',
                    iconCls: 'arrow_right_square_input',
                    actions: [
                        {
                            name: () => {
                                this.loadDataFromSelectedRecords();
                            }
                        }
                    ],
                    disabled: () => !some(this.grid.api.getSelectedRows(), this.isNewOrStoppedRecord)
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.clone-configuration.label'),
                    style: 'tertiary',
                    icon: 'files_copy_o',
                    actions: [
                        {
                            name: () => {
                                this.cloneDataImportConfiguration();
                            }
                        }
                    ],
                    disabled: () => this.grid.api.getSelectedRows().length !== 1
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => {
                                this.deleteSelectedDataRecords();
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.archive.label'),
                    style: 'tertiary',
                    iconCls: 'file_o_archive',
                    actions: [
                        {
                            name: () => {
                                this.archiveSelectedDataRecords();
                            }
                        }
                    ],
                    disabled: () => this.areAllSelectedArchived()
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.stop.label'),
                    style: 'tertiary',
                    iconCls: 'pause',
                    actions: [
                        {
                            name: () => this.stopSelectedRecordProcessing()
                        }
                    ],
                    disabled: () => !some(this.grid.api.getSelectedRows(), this.isProcessingOrQueuedRecord)
                }
            ],
            recordDefinitionName: DL_DATA_IMPORT.recordDefinitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: this.getColumns(),
            getData: (queryParams) => this.getData(queryParams),
            styles: 'flex-fill'
        });
    }
    getData(queryParams) {
        return this.rxRecordInstanceDataPageService.post({
            params: Object.assign({}, omit(Object.assign(Object.assign({}, queryParams), { propertySelection: [
                    String(DL_DATA_IMPORT.fields.importJobName),
                    String(DL_DATA_IMPORT.fields.uploadedOn),
                    String(DL_DATA_IMPORT.fields.importJobDescription),
                    String(DL_DATA_IMPORT.fields.dataFile),
                    String(DL_DATA_IMPORT.fields.attachmentOut),
                    String(RX_RECORD_DEFINITION.coreFieldIds.status),
                    String(DL_DATA_IMPORT.fields.isArchived),
                    String(DL_DATA_IMPORT.fields.mappingConfig),
                    String(RX_RECORD_DEFINITION.coreFieldIds.id)
                ] }), ['searchText']))
        });
    }
    isNewOrStoppedRecord(row) {
        return (row[RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.new ||
            row[RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.stopped);
    }
    areAllSelectedArchived() {
        return every(this.grid.api.getSelectedRows(), (row) => row[DL_DATA_IMPORT.fields.isArchived] === 1);
    }
    newDataImport(selectedRecordInstanceId = null) {
        this.dataloadWizardContext = {
            clonedConfigurationInstanceId: selectedRecordInstanceId,
            createdRecordInstanceId: null,
            isClonedConfigMatched: false,
            dataImportContext: {
                dataImportConfigurations: {
                    sheets: []
                }
            },
            excelSheetsConfiguration: {}
        };
        this.rxWizardService
            .open({
            context: this.dataloadWizardContext,
            options: {
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.title'),
                finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
                steps: [
                    {
                        id: DL_DATA_IMPORT.uploadFileStepId,
                        name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.steps.upload-data-file.label'),
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(UploadDataFileStepComponent),
                        handlesNext: true
                    },
                    // This temporary step is needed to display wizard Next button
                    DL_DATA_IMPORT.temporaryStepConfig
                ]
            }
        })
            .then((result) => {
            if (result) {
                this.savePrepareDataImportConfiguration();
            }
            else {
                this.grid.api.refresh().subscribe();
            }
        });
    }
    loadDataFromSelectedRecords() {
        const newOrStoppedRecords = filter(this.grid.api.getSelectedRows(), this.isNewOrStoppedRecord);
        if (newOrStoppedRecords.length < this.grid.api.getSelectedRows().length) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.default,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.already-loaded-data-warning.message')
            })
                .then((result) => {
                if (result) {
                    this.loadDataFromFile();
                }
            });
        }
        else {
            this.loadDataFromFile();
        }
    }
    isProcessingOrQueuedRecord(row) {
        return (row[RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.processing ||
            row[RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_IMPORT.dataStatuses.queued);
    }
    stopSelectedRecordProcessing() {
        const alreadyProcessedRecords = filter(this.grid.api.getSelectedRows(), this.isProcessingOrQueuedRecord);
        if (alreadyProcessedRecords.length !== this.grid.api.getSelectedRows().length) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.default,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.stop-data-processing-warning.message')
            })
                .then((result) => {
                if (result) {
                    this.stopRecordProcessing();
                }
            });
        }
        else {
            this.stopRecordProcessing();
        }
    }
    stopRecordProcessing() {
        const stopProcessingRequests$ = filter(this.grid.api.getSelectedRows(), this.isProcessingOrQueuedRecord).map((row) => this.dataImportService.stopDataProcessing(row[RX_RECORD_DEFINITION.coreFieldIds.id]));
        forkJoin(stopProcessingRequests$).subscribe(() => {
            this.grid.api.refresh().subscribe();
        });
    }
    deleteSelectedDataRecords() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.default,
            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.delete-import-record-confirmation.message')
        })
            .then((result) => {
            if (result) {
                const deleteDataRequests$ = map$1(this.grid.api.getSelectedRows(), (row) => this.rxRecordInstanceService.delete(DL_DATA_IMPORT.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id]));
                forkJoin(deleteDataRequests$).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.delete-import-record-success.message'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    archiveSelectedDataRecords() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.default,
            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.archive-records-warning.message')
        })
            .then((result) => {
            if (result) {
                const archiveDataRequests$ = filter(this.grid.api.getSelectedRows(), {
                    [DL_DATA_IMPORT.fields.isArchived]: 0
                }).map((row) => this.rxRecordInstanceService
                    .get(DL_DATA_IMPORT.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id])
                    .pipe(switchMap((recordInstance) => {
                    recordInstance.id = row[RX_RECORD_DEFINITION.coreFieldIds.id];
                    recordInstance.displayId = row[RX_RECORD_DEFINITION.coreFieldIds.displayId];
                    recordInstance.setFieldValue(DL_DATA_IMPORT.fields.isArchived, DL_DATA_IMPORT.archiveTrueValue);
                    return this.rxRecordInstanceService.save(recordInstance);
                })));
                forkJoin(archiveDataRequests$).subscribe(() => {
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    cloneDataImportConfiguration() {
        this.newDataImport(this.grid.api.getFirstSelectedRow()[RX_RECORD_DEFINITION.coreFieldIds.id]);
    }
    loadDataFromFile() {
        const loadDataRequests$ = filter(this.grid.api.getSelectedRows(), this.isNewOrStoppedRecord).map((row) => this.dataImportService.runLoadProcess(row[RX_RECORD_DEFINITION.coreFieldIds.id]));
        forkJoin(loadDataRequests$).subscribe(() => {
            this.grid.api.refresh().subscribe();
        });
    }
    getRecordNames(selectedRow) {
        return map$1(get(this.rxJsonParserService.tryParseJson(selectedRow[DL_DATA_IMPORT.fields.mappingConfig]), 'dataImportConfigurations.sheets'), 'configurations.definitionMappings.targetDefinition.name')
            .filter(Boolean)
            .map((definitionQualifiedName) => this.rxDefinitionNameService.getDisplayName(definitionQualifiedName))
            .join(', ');
    }
    showStatusInfo(selectedRow) {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
            content: ImportRecordStatusInfoComponent,
            data: {
                dataRecordId: selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id]
            },
            size: 'lg'
        })
            .catch(noop);
    }
    getColumns() {
        return [
            {
                fieldId: String(DL_DATA_IMPORT.fields.importJobName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.uploadedOn),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.steps.uploaded-on.label')
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.importJobDescription),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.mappingConfig),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label'),
                cellTemplate: this.recordNamesCellTemplate,
                sortable: false
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.dataFile),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.grid.data-load-input.title'),
                sortable: false,
                filterable: false,
                clickable: true,
                actions: [
                    {
                        name: (previousAction, row) => {
                            this.rxRecordInstanceService.downloadAttachment(DL_DATA_IMPORT.recordDefinitionName, DL_DATA_IMPORT.fields.dataFile, row[RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_IMPORT.fields.dataFile]);
                        }
                    }
                ]
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.attachmentOut),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.grid.data-load-result.title'),
                sortable: false,
                filterable: false,
                clickable: true,
                actions: [
                    {
                        name: (previousAction, row) => {
                            this.rxRecordInstanceService.downloadAttachment(DL_DATA_IMPORT.recordDefinitionName, DL_DATA_IMPORT.fields.attachmentOut, row[RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_IMPORT.fields.attachmentOut]);
                        }
                    }
                ]
            },
            {
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.status),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label')
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.isArchived),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.archived-record.title')
            },
            {
                fieldId: String(DL_DATA_IMPORT.fields.message),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.status-message.title'),
                cellTemplate: this.statusInfoCellTemplate,
                alignment: RecordGridColumnAlignment.Center,
                filterable: false,
                sortable: false
            },
            {
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                visible: false,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
            }
        ];
    }
    savePrepareDataImportConfiguration() {
        this.rxRecordInstanceService
            .get(DL_DATA_IMPORT.recordDefinitionName, this.dataloadWizardContext.createdRecordInstanceId)
            .pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.mappingConfig, JSON.stringify(this.dataloadWizardContext.dataImportContext));
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobName, this.dataloadWizardContext.importJobInfo.importJobName);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobDescription, this.dataloadWizardContext.importJobInfo.importJobDescription);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.attachmentType, this.dataloadWizardContext.importJobInfo.attachmentType);
            recordInstance.setFieldValue(DL_DATA_IMPORT.fields.archivedWorksheetFileName, this.dataloadWizardContext.importJobInfo.archivedWorksheetFileName);
            return this.rxRecordInstanceService.save(recordInstance);
        }), switchMap(() => this.grid.api.refresh()))
            .subscribe();
    }
}
DataImportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i4$1.RxModalService }, { token: i2$1.RxDefinitionNameService }, { token: i2$1.RxNotificationService }, { token: i7$1.RxWizardService }, { token: i2.TranslateService }, { token: i5.RxRecordInstanceService }, { token: i4.AdaptModalService }, { token: i3.RxJsonParserService }, { token: DataImportService }, { token: i5.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
DataImportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataImportComponent, selector: "dl-data-import", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "recordNamesCellTemplate", first: true, predicate: ["recordNamesCellTemplate"], descendants: true, static: true }, { propertyName: "statusInfoCellTemplate", first: true, predicate: ["statusInfoCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-import-button\"\n  (click)=\"newDataImport()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.import.new-import.title' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n\n<ng-template #recordNamesCellTemplate let-dataItem=\"dataItem\">\n  {{ getRecordNames(dataItem) }}\n</ng-template>\n\n<ng-template #statusInfoCellTemplate let-dataItem=\"dataItem\">\n  <a href=\"javascript:void(0)\" (click)=\"showStatusInfo(dataItem)\">{{\n    'com.bmc.arsys.rx.client.common.action-view.label' | translate\n  }}</a>\n</ng-template>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-import',
                    templateUrl: './data-import.component.html',
                    styleUrls: ['./data-import.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i4$1.RxModalService }, { type: i2$1.RxDefinitionNameService }, { type: i2$1.RxNotificationService }, { type: i7$1.RxWizardService }, { type: i2.TranslateService }, { type: i5.RxRecordInstanceService }, { type: i4.AdaptModalService }, { type: i3.RxJsonParserService }, { type: DataImportService }, { type: i5.RxRecordInstanceDataPageService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }], grid: [{
                type: ViewChild,
                args: ['grid']
            }], recordNamesCellTemplate: [{
                type: ViewChild,
                args: ['recordNamesCellTemplate', { static: true }]
            }], statusInfoCellTemplate: [{
                type: ViewChild,
                args: ['statusInfoCellTemplate', { static: true }]
            }] } });

class DataImportRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'dl-dataload-data-import',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataImportComponent),
            name: 'Data import',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.dataloadBundleId]
        });
    }
}
DataImportRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1$2.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataImportRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, declarations: [DataImportComponent,
        ImportRecordStatusInfoComponent,
        UploadDataFileStepComponent,
        DataImportMappingStepComponent], imports: [AdaptButtonModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RecordGridModule,
        AdaptPopoverModule,
        AdaptTableModule,
        RxLineLoaderModule,
        AdaptRxTextfieldModule,
        AdaptRxUploaderModule,
        AdaptRxSelectModule,
        ReactiveFormsModule,
        AdaptTabsModule,
        AdaptRxRadiobuttonModule,
        RxDefinitionPickerModule,
        AdaptRxLabelModule,
        AdaptAlertModule,
        AdaptRxCheckboxModule,
        RxBusyIndicatorModule] });
DataImportRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, imports: [[
            AdaptButtonModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RecordGridModule,
            AdaptPopoverModule,
            AdaptTableModule,
            RxLineLoaderModule,
            AdaptRxTextfieldModule,
            AdaptRxUploaderModule,
            AdaptRxSelectModule,
            ReactiveFormsModule,
            AdaptTabsModule,
            AdaptRxRadiobuttonModule,
            RxDefinitionPickerModule,
            AdaptRxLabelModule,
            AdaptAlertModule,
            AdaptRxCheckboxModule,
            RxBusyIndicatorModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DataImportComponent,
                        ImportRecordStatusInfoComponent,
                        UploadDataFileStepComponent,
                        DataImportMappingStepComponent
                    ],
                    imports: [
                        AdaptButtonModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RecordGridModule,
                        AdaptPopoverModule,
                        AdaptTableModule,
                        RxLineLoaderModule,
                        AdaptRxTextfieldModule,
                        AdaptRxUploaderModule,
                        AdaptRxSelectModule,
                        ReactiveFormsModule,
                        AdaptTabsModule,
                        AdaptRxRadiobuttonModule,
                        RxDefinitionPickerModule,
                        AdaptRxLabelModule,
                        AdaptAlertModule,
                        AdaptRxCheckboxModule,
                        RxBusyIndicatorModule
                    ],
                    entryComponents: [DataImportComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1$2.RxViewComponentRegistryService }]; } });

const DL_DATA_EXPORT = {
    recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Export Form',
    archiveTrueValue: 1,
    associationDefinitionDataFilterProperty: 'associationDefinitionDataFilter',
    fields: {
        name: 536870913,
        generatedFile: 536870914,
        startTime: 536870915,
        endTime: 536870916,
        progressDetail: 536870917,
        message: 536870918,
        configurations: 536870919,
        isArchive: 536870920,
        fileName: 536870921,
        configDescription: 536870922
    },
    dataStatuses: {
        new: 0,
        processing: 1,
        processed: 2,
        failed: 3
    }
};

class ExportRecordStatusInfoComponent {
    constructor(datePipe, rxTranslateService, rxJsonParserService, activeModalRef, rxRecordInstanceDataPageService) {
        this.datePipe = datePipe;
        this.rxTranslateService = rxTranslateService;
        this.rxJsonParserService = rxJsonParserService;
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.statusData$ = this.rxRecordInstanceDataPageService
            .post({
            params: {
                [RX_RECORD_DEFINITION.coreFieldIds.id]: this.activeModalRef.getData().dataRecordId,
                recorddefinition: DL_DATA_EXPORT.recordDefinitionName
            }
        })
            .pipe(map((dataPage) => {
            if (dataPage.data[0][RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_EXPORT.dataStatuses.processing) {
                this.processStartInfo = `${this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.process-started.message')} ${this.datePipe.transform(dataPage.data[0][RX_RECORD_DEFINITION.coreFieldIds.modifiedDate], 'medium')}`;
            }
            const dataExportProgressStatus = get(this.rxJsonParserService.tryParseJson(dataPage.data[0][DL_DATA_EXPORT.fields.message], []), 'dataExportProgressStatus');
            if (dataExportProgressStatus) {
                return map$1(dataExportProgressStatus, (statusInfo) => (Object.assign(Object.assign({}, statusInfo), { updateTime: this.datePipe.transform(statusInfo.updateTime, 'medium') })));
            }
            else {
                this.exportConfiguredNotProcessedMsg = dataPage.data[0][DL_DATA_EXPORT.fields.message];
                return [];
            }
        }));
        this.columns = [
            {
                field: 'updateTime',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.dataload.status-info-grid.column.updated-date.title'),
                sortable: false,
                width: '20%'
            },
            {
                field: 'status',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.status.label'),
                width: '20%'
            },
            {
                field: 'message',
                header: this.rxTranslateService.instant('com.bmc.arsys.rx.client.common.message.label'),
                width: '80%'
            }
        ];
    }
    close() {
        this.activeModalRef.close();
    }
}
ExportRecordStatusInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExportRecordStatusInfoComponent, deps: [{ token: i1$1.DatePipe }, { token: i2.TranslateService }, { token: i3.RxJsonParserService }, { token: i4.ActiveModalRef }, { token: i5.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ExportRecordStatusInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExportRecordStatusInfoComponent, selector: "dl-export-record-status-info", ngImport: i0, template: "<ng-template #loaderTemplate>\n  <rx-line-loader></rx-line-loader>\n</ng-template>\n\n<div *ngIf=\"statusData$ | async as statusData; else loaderTemplate\">\n  <div class=\"data-status-info\">\n    <div *ngIf=\"exportConfiguredNotProcessedMsg\">\n      {{ exportConfiguredNotProcessedMsg }}\n    </div>\n\n    <adapt-alert\n      *ngIf=\"processStartInfo\"\n      [config]=\"{\n        content: processStartInfo,\n        type: 'inline',\n        variant: 'warning'\n      }\"\n    ></adapt-alert>\n\n    <adapt-table\n      [hidden]=\"exportConfiguredNotProcessedMsg\"\n      rx-id=\"exported-status-info-grid\"\n      [columns]=\"columns\"\n      [bordered]=\"true\"\n      [value]=\"statusData\"\n      [wrapCellText]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button (click)=\"close()\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" type=\"button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [".data-status-info{padding:15px}\n"], components: [{ type: i4$1.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i4.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i1$1.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExportRecordStatusInfoComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-export-record-status-info',
                    templateUrl: './export-record-status-info.component.html',
                    styleUrls: ['./export-record-status-info.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DatePipe }, { type: i2.TranslateService }, { type: i3.RxJsonParserService }, { type: i4.ActiveModalRef }, { type: i5.RxRecordInstanceDataPageService }]; } });

class DataExportFiltersExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxAssociationDefinitionCacheService = this.injector.get(RxAssociationDefinitionCacheService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    }
                ]
            }
        ]);
    }
    geDataDefinitionField(definitionType, recordOrAssociationDefinitionName) {
        if (recordOrAssociationDefinitionName) {
            return iif(() => definitionType === 'record', this.rxRecordDefinitionCacheService.getRecordDefinition(recordOrAssociationDefinitionName), this.rxAssociationDefinitionCacheService.getAssociationDefinition(recordOrAssociationDefinitionName).pipe(map((associationDefinitionResponse) => associationDefinitionResponse.nodeAId), switchMap((fetchedRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(fetchedRecordDefinitionName)))).pipe(withLatestFrom(this.commonDataDictionary$), map(([definitionResponse, commonDataDictionary]) => {
                return [
                    ...commonDataDictionary,
                    {
                        label: this.rxDefinitionNameService.getDisplayName(definitionResponse.name),
                        children: definitionResponse.fieldDefinitions.map((fieldDefinition) => ({
                            label: fieldDefinition.name,
                            icon: 'd-icon-field_text',
                            expression: `'${fieldDefinition.id}'`
                        }))
                    }
                ];
            }));
        }
        else {
            return of([]);
        }
    }
}

class ExportDataPreviewComponent {
    constructor(activeModalRef, rxRecordInstanceDataPageService) {
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.gridContext = this.activeModalRef.getData();
    }
    ngOnInit() {
        this.gridConfig = of({
            recordDefinitionName: this.gridContext.definitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: sortBy(this.gridContext.selectedFields, 'visibleOnPreviewPriority').map((field, index) => ({
                title: field.name,
                fieldId: field.id.toString(),
                visible: index < 9
            })),
            styles: 'flex-fill h-100',
            getData: (queryParams) => this.getData(queryParams)
        });
    }
    getData(queryParams) {
        queryParams.queryExpression = [queryParams.queryExpression, this.gridContext.queryFilter]
            .filter(Boolean)
            .join('AND');
        return this.rxRecordInstanceDataPageService.post({
            params: omit(Object.assign({}, queryParams), ['searchText'])
        });
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
ExportDataPreviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExportDataPreviewComponent, deps: [{ token: i4.ActiveModalRef }, { token: i5.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ExportDataPreviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExportDataPreviewComponent, selector: "dl-export-data-preview", ngImport: i0, template: "<div class=\"p-4 data-preview-modal-body\">\n  <rx-record-grid [config]=\"gridConfig\"></rx-record-grid>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.data-preview-modal-body{overflow:auto;flex-grow:1;height:645px}\n"], components: [{ type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExportDataPreviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-export-data-preview',
                    templateUrl: './export-data-preview.component.html',
                    styleUrls: ['./export-data-preview.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i4.ActiveModalRef }, { type: i5.RxRecordInstanceDataPageService }]; } });

class DataExportConfigurationComponent extends RxModalClass {
    constructor(rxFieldDefinitionService, rxRecordInstanceService, rxRecordDefinitionService, adaptModalService, rxNotificationService, rxExpressionEditorService, translateService, changeDetectorRef, definitionNameService, dockedPanelContext, injector) {
        super(dockedPanelContext, injector);
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.adaptModalService = adaptModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.translateService = translateService;
        this.changeDetectorRef = changeDetectorRef;
        this.definitionNameService = definitionNameService;
        this.dockedPanelContext = dockedPanelContext;
        this.injector = injector;
        this.index$ = new BehaviorSubject(null);
        this.recordDefinitionNames$ = [];
        this.definitionFields$ = [];
        this.destroyed$ = new ReplaySubject(1);
        this.exportConfiguration = {
            exportConfigName: null,
            exportConfigDescription: null,
            definitions: []
        };
        this.recordPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Record,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            },
            required: true
        };
        this.associationPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Association,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            },
            required: true
        };
        this.definitionTypes = {
            record: 'record',
            association: 'association'
        };
        this.definitionTypeOptions = [
            {
                value: this.definitionTypes.record,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label')
            },
            {
                value: this.definitionTypes.association,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label')
            }
        ];
    }
    ngOnInit() {
        super.ngOnInit();
        this.expressionConfigurator = new DataExportFiltersExpressionConfigurator(this.injector);
        this.expressionConfigurator.configureForProperty({
            propertyPath: DL_DATA_EXPORT.associationDefinitionDataFilterProperty,
            dataDictionary$: this.index$.pipe(switchMap((index) => this.recordDefinitionNames$[index].pipe(switchMap((recordDefinitionName) => this.expressionConfigurator.geDataDefinitionField(this.exportConfiguration.definitions[index].type, recordDefinitionName))))),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All)
        });
        this.dataFilterExpressionOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.data-filters.label'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary(DL_DATA_EXPORT.associationDefinitionDataFilterProperty),
            operators: this.expressionConfigurator.getOperators(DL_DATA_EXPORT.associationDefinitionDataFilterProperty)
        };
    }
    addDefinition() {
        this.markAsDirty();
        const nextRowIndex = this.exportConfiguration.definitions.length;
        this.recordDefinitionNames$[nextRowIndex] = new BehaviorSubject(null);
        this.definitionFields$[nextRowIndex] = this.recordDefinitionNames$[nextRowIndex].pipe(takeUntil(this.destroyed$), switchMap((definitionName) => {
            return iif(() => definitionName && this.exportConfiguration.definitions[nextRowIndex].type === this.definitionTypes.record, this.rxRecordDefinitionService.get(definitionName), of({ fieldDefinitions: [] }));
        }), map((response) => {
            return response.fieldDefinitions
                .sort((a, b) => {
                if (this.rxFieldDefinitionService.isCoreField(a)) {
                    return -1;
                }
                if (this.rxFieldDefinitionService.isCoreField(b)) {
                    return 1;
                }
                if (a.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                    return -1;
                }
                if (b.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                    return 1;
                }
                return Number(a.id) - Number(b.id);
            })
                .map((fieldDefinition, index) => ({
                name: fieldDefinition.name,
                id: fieldDefinition.id,
                disabled: fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required &&
                    fieldDefinition.defaultValue === null,
                visibleOnPreviewPriority: index
            }));
        }), tap((criteriaFields) => {
            this.exportConfiguration.definitions[nextRowIndex].criteria.fields = criteriaFields
                .filter((criteriaField) => criteriaField.disabled)
                .map((criteriaField) => (Object.assign({}, criteriaField)));
        }));
        this.exportConfiguration.definitions.push({
            type: 'record',
            name: null,
            criteria: {
                filter: null,
                fields: []
            }
        });
    }
    remove(index) {
        this.exportConfiguration.definitions.splice(index, 1);
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    onDefinitionChange(definitionName, rowIndex) {
        if (definitionName && !this.definitionNameService.getBundleId(definitionName)) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.global-record-not-allowed.message'));
            this.changeDetectorRef.detectChanges();
            this.exportConfiguration.definitions[rowIndex].name = null;
        }
        else {
            this.exportConfiguration.definitions[rowIndex].criteria.filter = null;
            this.index$.next(rowIndex);
            this.recordDefinitionNames$[rowIndex].next(definitionName);
        }
    }
    onExpressionEvent(rowIndex) {
        this.index$.next(rowIndex);
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: DL_DATA_EXPORT.associationDefinitionDataFilterProperty,
                value: this.exportConfiguration.definitions[rowIndex].criteria.filter,
                label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.data-filters.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.legend.activity-result.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            this.exportConfiguration.definitions[rowIndex].criteria.filter = expression.value || null;
        });
    }
    isSaveButtonDisabled() {
        return (this.isSaveInProgress ||
            !this.exportConfiguration.definitions.length ||
            some(this.exportConfiguration.definitions, (definition) => {
                return ((definition.type === this.definitionTypes.record &&
                    (!definition.name || !definition.criteria.fields.length)) ||
                    (definition.type === this.definitionTypes.association && !definition.name));
            }));
    }
    saveExportConfiguration() {
        this.isSaveInProgress = true;
        this.rxRecordInstanceService
            .getNew(DL_DATA_EXPORT.recordDefinitionName)
            .pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(DL_DATA_EXPORT.fields.name, this.exportConfiguration.exportConfigName);
            recordInstance.setFieldValue(DL_DATA_EXPORT.fields.configDescription, this.exportConfiguration.exportConfigDescription);
            recordInstance.setFieldValue(DL_DATA_EXPORT.fields.configurations, JSON.stringify({
                definitions: map$1(cloneDeep(this.exportConfiguration.definitions), (definition) => {
                    definition.criteria.fields = map$1(definition.criteria.fields, (field) => ({
                        id: field.id,
                        name: field.name
                    }));
                    return definition;
                })
            }));
            return this.rxRecordInstanceService.create(recordInstance);
        }), finalize(() => {
            this.isSaveInProgress = false;
        }))
            .subscribe(() => {
            this.dockedPanelContext.close(null);
        });
    }
    clearFieldsSelection(index) {
        this.exportConfiguration.definitions[index].name = null;
        this.exportConfiguration.definitions[index].criteria.filter = null;
        this.exportConfiguration.definitions[index].criteria.fields = [];
    }
    openExportingDataPreview(definition) {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.preview-data.label'),
            content: ExportDataPreviewComponent,
            size: 'lg',
            data: {
                definitionName: definition.name,
                selectedFields: definition.criteria.fields,
                queryFilter: definition.criteria.filter
            }
        })
            .catch(noop);
    }
    isPreviewDisabled(definition) {
        return !definition.name || !definition.criteria.fields.length;
    }
    ngOnDestroy() {
        forEach(this.recordDefinitionNames$, (name$) => name$.complete());
        this.index$.complete();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    optionFormatter(field) {
        return field.name;
    }
}
DataExportConfigurationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportConfigurationComponent, deps: [{ token: i5.RxFieldDefinitionService }, { token: i5.RxRecordInstanceService }, { token: i5.RxRecordDefinitionService }, { token: i4.AdaptModalService }, { token: i2$1.RxNotificationService }, { token: i7$1.RxExpressionEditorService }, { token: i2.TranslateService }, { token: i0.ChangeDetectorRef }, { token: i2$1.RxDefinitionNameService }, { token: i4.DockedPanelContext }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
DataExportConfigurationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataExportConfigurationComponent, selector: "dl-data-export-configuration", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    rx-id=\"export-config-name\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n    name=\"exportConfigName\"\n    [(ngModel)]=\"exportConfiguration.exportConfigName\"\n    [required]=\"true\"\n    maxlength=\"254\"\n    [autofocus]=\"true\"\n    (ngModelChange)=\"markAsDirty()\"\n    #exportConfigName=\"ngModel\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    rx-id=\"export-config-description\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n    name=\"exportConfigDescription\"\n    [(ngModel)]=\"exportConfiguration.exportConfigDescription\"\n    maxlength=\"254\"\n    (ngModelChange)=\"markAsDirty()\"\n    #exportConfigDescription=\"ngModel\"\n  >\n  </adapt-rx-textfield>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle px-0\"\n    rx-id=\"add-definition-button\"\n    (click)=\"addDefinition()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.add-definition-button.label' | translate }}\n  </button>\n\n  <adapt-accordion [multiselect]=\"true\">\n    <div\n      *ngFor=\"let definition of exportConfiguration.definitions; let $index = index\"\n      class=\"position-relative form-group\"\n    >\n      <span class=\"actions\">\n        <button\n          class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n          adapt-button\n          size=\"small\"\n          type=\"button\"\n          (click)=\"remove($index)\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n        </button>\n      </span>\n\n      <adapt-accordion-tab class=\"w-100 d-block\" isOpen=\"true\">\n        <adapt-rx-radiobutton-group\n          [(ngModel)]=\"definition.type\"\n          label=\"{{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.definition.label' | translate }}\"\n          [required]=\"true\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let definitionType of definitionTypeOptions; let index = index\"\n            class=\"radio-inline m-0\"\n            [value]=\"definitionType.value\"\n            [label]=\"definitionType.displayValue\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n            (checkedChange)=\"clearFieldsSelection($index)\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"definition.type === definitionTypes.record\"\n          [options]=\"recordPickerOptions\"\n          rx-id=\"record-definition-picker\"\n          [(ngModel)]=\"definition.name\"\n          (ngModelChange)=\"onDefinitionChange($event, $index)\"\n        >\n        </rx-definition-picker>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"definition.type === definitionTypes.association\"\n          [options]=\"associationPickerOptions\"\n          rx-id=\"association-definition-picker\"\n          [(ngModel)]=\"definition.name\"\n          (ngModelChange)=\"onDefinitionChange($event, $index)\"\n        >\n        </rx-definition-picker>\n\n        <div [hidden]=\"!definition.name\">\n          <div *ngIf=\"definitionFields$[$index] | async as options\">\n            <adapt-rx-select\n              class=\"d-block form-group\"\n              [(ngModel)]=\"definition.criteria.fields\"\n              *ngIf=\"definition.type === definitionTypes.record\"\n              label=\"{{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.fields.label' | translate }}\"\n              [options]=\"options\"\n              [required]=\"true\"\n              [multiple]=\"true\"\n              [enableFilter]=\"true\"\n              [selectAllButton]=\"true\"\n              [deselectAllButton]=\"true\"\n              [optionFormatter]=\"optionFormatter\"\n              [attr.rx-id]=\"'definition-' + $index + '_fields'\"\n            >\n            </adapt-rx-select>\n          </div>\n\n          <rx-expression-form-control\n            class=\"d-block form-group\"\n            rx-id=\"data-filter\"\n            [options]=\"dataFilterExpressionOptions\"\n            [(ngModel)]=\"definition.criteria.filter\"\n            (events)=\"onExpressionEvent($index)\"\n          ></rx-expression-form-control>\n\n          <button\n            type=\"button\"\n            adapt-button\n            btn-type=\"secondary\"\n            rx-id=\"preview-button\"\n            (click)=\"openExportingDataPreview(definition)\"\n            *ngIf=\"definition.type === definitionTypes.record\"\n            [disabled]=\"isPreviewDisabled(definition)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.preview-data.label' | translate }}\n          </button>\n        </div>\n      </adapt-accordion-tab>\n    </div>\n  </adapt-accordion>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [adaptInlineLoader]=\"isSaveInProgress\"\n    [disabled]=\"exportConfigName.invalid || exportConfigDescription.invalid || isSaveButtonDisabled()\"\n    (click)=\"saveExportConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [".actions{position:absolute;top:4px;right:35px;z-index:1}\n"], components: [{ type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i4.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i4.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i7$1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7$1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i6.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i2.TranslatePipe, "async": i1$1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportConfigurationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-export-configuration',
                    templateUrl: './data-export-configuration.component.html',
                    styleUrls: ['./data-export-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i5.RxFieldDefinitionService }, { type: i5.RxRecordInstanceService }, { type: i5.RxRecordDefinitionService }, { type: i4.AdaptModalService }, { type: i2$1.RxNotificationService }, { type: i7$1.RxExpressionEditorService }, { type: i2.TranslateService }, { type: i0.ChangeDetectorRef }, { type: i2$1.RxDefinitionNameService }, { type: i4.DockedPanelContext }, { type: i0.Injector }]; } });

class DataExportComponent {
    constructor(dataExportService, rxModalService, translateService, rxDefinitionNameService, adaptModalService, rxJsonParserService, rxNotificationService, rxRecordInstanceService) {
        this.dataExportService = dataExportService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.adaptModalService = adaptModalService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.hostClass = 'd-flex mh-100 flex-column';
    }
    ngOnInit() {
        this.gridConfig$ = of({
            guid: 'dl-export-grid',
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.export-data.label'),
                    style: 'tertiary',
                    iconCls: 'arrow_right_square_input',
                    actions: [
                        {
                            name: () => this.startDataExportProcess()
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.archive.label'),
                    style: 'tertiary',
                    iconCls: 'file_o_archive',
                    actions: [
                        {
                            name: () => {
                                this.archiveExportRecords();
                            }
                        }
                    ],
                    disabled: () => every(this.grid.api.getSelectedRows(), (row) => row[DL_DATA_EXPORT.fields.isArchive] === DL_DATA_EXPORT.archiveTrueValue)
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => {
                                this.deleteExportRecords();
                            }
                        }
                    ]
                }
            ],
            recordDefinitionName: DL_DATA_EXPORT.recordDefinitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: this.getColumns(),
            styles: 'flex-fill'
        });
    }
    startDataExportProcess() {
        const allUploadedRecordsFromSelectedRecords = this.grid.api.getSelectedRows().filter((row) => {
            return row[RX_RECORD_DEFINITION.coreFieldIds.status] === DL_DATA_EXPORT.dataStatuses.new;
        });
        if (allUploadedRecordsFromSelectedRecords.length !== this.grid.api.getSelectedRows().length) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.data-already-exported-warning.message')
            })
                .then((result) => {
                if (result) {
                    this.startDataExport();
                }
            });
        }
        else {
            this.startDataExport();
        }
    }
    startDataExport() {
        const exportRequests = map$1(this.grid.api.getSelectedRows(), (row) => this.dataExportService.startDataExport(row[RX_RECORD_DEFINITION.coreFieldIds.id]));
        forkJoin(exportRequests).subscribe(() => {
            this.grid.api.refresh().subscribe();
        });
    }
    getRecordNames(selectedRow) {
        return map$1(get(this.rxJsonParserService.tryParseJson(selectedRow[DL_DATA_EXPORT.fields.configurations], []), 'definitions'), 'name')
            .filter(Boolean)
            .map((definitionQualifiedName) => this.rxDefinitionNameService.getDisplayName(definitionQualifiedName))
            .join(', ');
    }
    deleteExportRecords() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.delete-data-warning.message')
        })
            .then((result) => {
            if (result) {
                const deleteDataRequests$ = map$1(this.grid.api.getSelectedRows(), (row) => this.rxRecordInstanceService.delete(DL_DATA_EXPORT.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id]));
                forkJoin(deleteDataRequests$).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.delete-export-record-success.message'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    archiveExportRecords() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.default,
            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.archive-records-warning.message')
        })
            .then((result) => {
            if (result) {
                const archiveDataRequests$ = filter(this.grid.api.getSelectedRows(), {
                    [DL_DATA_EXPORT.fields.isArchive]: 0
                }).map((row) => this.rxRecordInstanceService
                    .get(DL_DATA_EXPORT.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id])
                    .pipe(switchMap((recordInstance) => {
                    recordInstance.id = row[RX_RECORD_DEFINITION.coreFieldIds.id];
                    recordInstance.displayId = row[RX_RECORD_DEFINITION.coreFieldIds.displayId];
                    recordInstance.setFieldValue(DL_DATA_EXPORT.fields.isArchive, DL_DATA_EXPORT.archiveTrueValue);
                    return this.rxRecordInstanceService.save(recordInstance);
                })));
                forkJoin(archiveDataRequests$).subscribe(() => {
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    newExport() {
        this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.label'),
            content: DataExportConfigurationComponent,
            data: {}
        })
            .then(() => {
            this.grid.api.refresh().subscribe();
        })
            .catch(noop);
    }
    showStatusInfo(selectedRow) {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label'),
            content: ExportRecordStatusInfoComponent,
            data: {
                dataRecordId: selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id]
            },
            size: 'lg'
        })
            .catch(noop);
    }
    getColumns() {
        return [
            {
                fieldId: String(DL_DATA_EXPORT.fields.name),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
            },
            {
                fieldId: String(DL_DATA_EXPORT.fields.endTime),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.grid.column.exported-on.title')
            },
            {
                fieldId: String(DL_DATA_EXPORT.fields.configDescription),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
            },
            {
                fieldId: String(DL_DATA_EXPORT.fields.configurations),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.definitions.label'),
                sortable: false,
                cellTemplate: this.recordNamesCellTemplate
            },
            {
                fieldId: String(DL_DATA_EXPORT.fields.generatedFile),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.grid.column.export-output-file.title'),
                sortable: false,
                filterable: false,
                clickable: true,
                actions: [
                    {
                        name: (previousAction, row) => {
                            this.rxRecordInstanceService.downloadAttachment(DL_DATA_EXPORT.recordDefinitionName, DL_DATA_EXPORT.fields.generatedFile, row[RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_EXPORT.fields.generatedFile]);
                        }
                    }
                ]
            },
            {
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.status),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.status.label')
            },
            {
                fieldId: String(DL_DATA_EXPORT.fields.isArchive),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.archived-record.title')
            },
            {
                fieldId: String(DL_DATA_EXPORT.fields.message),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.grid.column.status-message.title'),
                sortable: false,
                filterable: false,
                cellTemplate: this.statusInfoCellTemplate
            },
            {
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false
            }
        ];
    }
}
DataExportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportComponent, deps: [{ token: DataExportService }, { token: i4$1.RxModalService }, { token: i2.TranslateService }, { token: i2$1.RxDefinitionNameService }, { token: i4.AdaptModalService }, { token: i3.RxJsonParserService }, { token: i2$1.RxNotificationService }, { token: i5.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Component });
DataExportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataExportComponent, selector: "dl-data-export", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "recordNamesCellTemplate", first: true, predicate: ["recordNamesCellTemplate"], descendants: true, static: true }, { propertyName: "statusInfoCellTemplate", first: true, predicate: ["statusInfoCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-export-button\"\n  (click)=\"newExport()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.export.new.label' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n\n<ng-template #recordNamesCellTemplate let-dataItem=\"dataItem\">\n  {{ getRecordNames(dataItem) }}\n</ng-template>\n\n<ng-template #statusInfoCellTemplate let-dataItem=\"dataItem\">\n  <a href=\"javascript:void(0)\" (click)=\"showStatusInfo(dataItem)\">{{\n    'com.bmc.arsys.rx.client.common.action-view.label' | translate\n  }}</a>\n</ng-template>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-export',
                    templateUrl: './data-export.component.html',
                    styleUrls: ['./data-export.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: DataExportService }, { type: i4$1.RxModalService }, { type: i2.TranslateService }, { type: i2$1.RxDefinitionNameService }, { type: i4.AdaptModalService }, { type: i3.RxJsonParserService }, { type: i2$1.RxNotificationService }, { type: i5.RxRecordInstanceService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }], grid: [{
                type: ViewChild,
                args: ['grid']
            }], recordNamesCellTemplate: [{
                type: ViewChild,
                args: ['recordNamesCellTemplate', { static: true }]
            }], statusInfoCellTemplate: [{
                type: ViewChild,
                args: ['statusInfoCellTemplate', { static: true }]
            }] } });

class DataExportRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'dl-dataload-data-export',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataExportComponent),
            name: 'Data export',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.dataloadBundleId]
        });
    }
}
DataExportRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1$2.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataExportRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, declarations: [DataExportComponent,
        ExportRecordStatusInfoComponent,
        DataExportConfigurationComponent,
        ExportDataPreviewComponent], imports: [AdaptButtonModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RecordGridModule,
        RxLineLoaderModule,
        AdaptAlertModule,
        AdaptTableModule,
        ReactiveFormsModule,
        AdaptRxTextfieldModule,
        AdaptAccordionModule,
        RxDefinitionPickerModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        ExpressionFormControlModule,
        AdaptBusyModule] });
DataExportRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, imports: [[
            AdaptButtonModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RecordGridModule,
            RxLineLoaderModule,
            AdaptAlertModule,
            AdaptTableModule,
            ReactiveFormsModule,
            AdaptRxTextfieldModule,
            AdaptAccordionModule,
            RxDefinitionPickerModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            ExpressionFormControlModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DataExportComponent,
                        ExportRecordStatusInfoComponent,
                        DataExportConfigurationComponent,
                        ExportDataPreviewComponent
                    ],
                    imports: [
                        AdaptButtonModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RecordGridModule,
                        RxLineLoaderModule,
                        AdaptAlertModule,
                        AdaptTableModule,
                        ReactiveFormsModule,
                        AdaptRxTextfieldModule,
                        AdaptAccordionModule,
                        RxDefinitionPickerModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        ExpressionFormControlModule,
                        AdaptBusyModule
                    ],
                    entryComponents: [DataExportComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1$2.RxViewComponentRegistryService }]; } });

const DL_DATA_TEMPLATES = {
    recordDefinitionName: 'com.bmc.arsys.rx.dataload:Data Load Template',
    fields: {
        templateName: 8,
        dataLoadTemplateVersion: 304412331,
        dataloadTemplateDescription: 304412341,
        template: 304412351,
        isActive: 304412361,
        bundleFriendlyName: 304412371,
        bundleId: 61001
    },
    allowedFileTypes: {
        xlsx: 'xlsx',
        zip: 'zip'
    }
};

class DataTemplateEditorComponent extends RxModalClass {
    constructor(translateService, rxNotificationService, rxGlobalCacheService, rxRecordInstanceService, injector, dockedPanelContext, formBuilder) {
        super(dockedPanelContext, injector);
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.injector = injector;
        this.dockedPanelContext = dockedPanelContext;
        this.formBuilder = formBuilder;
        this.destroyed$ = new ReplaySubject(1);
        this.isEditMode = this.dockedPanelContext.getData().isEditMode;
        this.enableCustomDownload = true;
        this.applicationOptions$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(takeUntil(this.destroyed$), map((bundleDescriptors) => {
            return bundleDescriptors
                .filter((bundleDescriptor) => ![RX_APPLICATION.innovationStudioBundleId, RX_APPLICATION.standardlib].includes(bundleDescriptor.id))
                .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
                .map((bundleDescriptor) => ({
                displayValue: bundleDescriptor.friendlyName,
                value: bundleDescriptor.id
            }));
        }));
        this.downloadAttachment = () => {
            this.rxRecordInstanceService.downloadAttachment(DL_DATA_TEMPLATES.recordDefinitionName, DL_DATA_TEMPLATES.fields.template, this.dockedPanelContext.getData().templateRecordInstanceId, this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.template].value);
        };
    }
    isDirty() {
        return this.dataTemplateForm.dirty;
    }
    ngOnInit() {
        super.ngOnInit();
        this.dataTemplateForm = this.formBuilder.group({
            application: [[], Validators.required],
            templateName: [null, [Validators.required, Validators.maxLength(254)]],
            version: [null, [Validators.required, Validators.maxLength(254)]],
            isActive: null,
            description: [null, Validators.maxLength(500)],
            template: [null, Validators.required]
        });
        this.dataTemplateForm.get('isActive').setValue(0);
        this.busy = iif(() => this.isEditMode, this.rxRecordInstanceService.get(DL_DATA_TEMPLATES.recordDefinitionName, this.dockedPanelContext.getData().templateRecordInstanceId), this.rxRecordInstanceService.getNew(DL_DATA_TEMPLATES.recordDefinitionName))
            .pipe(tap((recordInstance) => {
            this.recordInstance = recordInstance;
            if (this.isEditMode) {
                this.setTemplateFormValues();
            }
        }), switchMap(() => iif(() => this.isEditMode, this.applicationOptions$.pipe(take(1)), of([]))), map((options) => find(options, {
            displayValue: this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.bundleFriendlyName].value
        })), tap((option) => {
            if (this.isEditMode) {
                this.dataTemplateForm.get('application').setValue([option]);
            }
        }))
            .subscribe();
    }
    setTemplateFormValues() {
        this.dataTemplateForm
            .get('templateName')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.templateName].value);
        this.dataTemplateForm
            .get('version')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion].value);
        this.dataTemplateForm
            .get('isActive')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.isActive].value);
        this.dataTemplateForm
            .get('description')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.dataloadTemplateDescription].value);
        this.dataTemplateForm.get('template').setValue([
            {
                data: new File([], this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.template].value),
                inUploading: false,
                inDeleting: false,
                uploaded: 100,
                error: false,
                errorText: '',
                allowDeletion: true
            }
        ]);
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    saveTemplate() {
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.bundleFriendlyName, this.dataTemplateForm.get('application').value[0].displayValue);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.bundleId, this.dataTemplateForm.get('application').value[0].value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.templateName, this.dataTemplateForm.get('templateName').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion, this.dataTemplateForm.get('version').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.isActive, this.dataTemplateForm.get('isActive').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.dataloadTemplateDescription, this.dataTemplateForm.get('description').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.template, this.dataTemplateForm.get('template').value[0].data);
        if (this.isEditMode) {
            this.rxRecordInstanceService.save(this.recordInstance).subscribe(() => this.successCallback());
        }
        else {
            this.rxRecordInstanceService.create(this.recordInstance).subscribe(() => this.successCallback());
        }
    }
    onRemovedFileFromQueue() {
        this.enableCustomDownload = false;
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    successCallback() {
        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-saved.message'));
        this.dockedPanelContext.close(null);
    }
    getAllowedTypes() {
        return [DL_DATA_TEMPLATES.allowedFileTypes.xlsx, DL_DATA_TEMPLATES.allowedFileTypes.zip];
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
DataTemplateEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplateEditorComponent, deps: [{ token: i2.TranslateService }, { token: i2$1.RxNotificationService }, { token: i2$1.RxGlobalCacheService }, { token: i5.RxRecordInstanceService }, { token: i0.Injector }, { token: i4.DockedPanelContext }, { token: i6.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
DataTemplateEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataTemplateEditorComponent, selector: "dl-data-template-editor", usesInheritance: true, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<div class=\"dp-body\">\n  <form [formGroup]=\"dataTemplateForm\">\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\"\n      rx-id=\"application\"\n      formControlName=\"application\"\n      [options]=\"applicationOptions$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      [autofocus]=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"template-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.dataload.templates.template-name.label' | translate }}\"\n      formControlName=\"templateName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"version\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.version.label' | translate }}\"\n      formControlName=\"version\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-radiobutton-group\n      formControlName=\"isActive\"\n      label=\"{{ 'com.bmc.arsys.rx.client.dataload.templates.is-active-template.label' | translate }}\"\n    >\n      <adapt-rx-radiobutton\n        [value]=\"1\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}\"\n      ></adapt-rx-radiobutton>\n\n      <adapt-rx-radiobutton\n        [value]=\"0\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}\"\n      ></adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-textarea\n      class=\"form-group d-block\"\n      rx-id=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n      formControlName=\"description\"\n      rows=\"4\"\n    >\n    </adapt-rx-textarea>\n\n    <adapt-rx-uploader\n      label=\"{{ 'com.bmc.arsys.rx.client.common.template.label' | translate }}\"\n      formControlName=\"template\"\n      [showMaxSizeRestriction]=\"false\"\n      [enableCustomDownload]=\"enableCustomDownload\"\n      [customDownload]=\"downloadAttachment\"\n      (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n      [reusable]=\"true\"\n      [allowedTypes]=\"getAllowedTypes()\"\n    >\n    </adapt-rx-uploader>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [disabled]=\"dataTemplateForm.pristine || dataTemplateForm.invalid\"\n    (click)=\"saveTemplate()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep adapt-rx-uploader .adapt-uploader-file-uploaded{display:none}\n"], components: [{ type: i4$1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i2.TranslatePipe, "async": i1$1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplateEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-template-editor',
                    templateUrl: './data-template-editor.component.html',
                    styleUrls: ['./data-template-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslateService }, { type: i2$1.RxNotificationService }, { type: i2$1.RxGlobalCacheService }, { type: i5.RxRecordInstanceService }, { type: i0.Injector }, { type: i4.DockedPanelContext }, { type: i6.FormBuilder }]; } });

class DataTemplatesComponent {
    constructor(rxNotificationService, rxModalService, translateService, rxRecordInstanceService) {
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.hostClass = 'd-flex mh-100 flex-column';
        this.showDeprecated = false;
    }
    ngOnInit() {
        this.gridConfig$ = of({
            guid: 'dl-templates-grid',
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => {
                                this.deleteSelectedDataTemplate();
                            }
                        }
                    ]
                }
            ],
            recordDefinitionName: DL_DATA_TEMPLATES.recordDefinitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: this.getColumns(),
            getRecordDefinition: () => of(this.getRecordDefinition()),
            styles: 'flex-fill'
        });
    }
    deleteSelectedDataTemplate() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.default,
            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-delete-warning.message')
        })
            .then((result) => {
            if (result) {
                const deleteDataRequests$ = map$1(this.grid.api.getSelectedRows(), (row) => this.rxRecordInstanceService.delete(DL_DATA_TEMPLATES.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id]));
                forkJoin(deleteDataRequests$).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-delete-success.message'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    getColumns() {
        return [
            {
                fieldId: String(DL_DATA_TEMPLATES.fields.templateName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.editDataTemplate(selectedRow);
                        }
                    }
                ]
            },
            {
                fieldId: String(DL_DATA_TEMPLATES.fields.bundleFriendlyName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.application.label')
            },
            {
                fieldId: String(DL_DATA_TEMPLATES.fields.dataloadTemplateDescription),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
            },
            {
                fieldId: String(DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.version.label')
            },
            {
                fieldId: String(DL_DATA_TEMPLATES.fields.template),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.download.label'),
                sortable: false,
                filterable: false,
                clickable: true,
                actions: [
                    {
                        name: (previousAction, row) => {
                            this.rxRecordInstanceService.downloadAttachment(DL_DATA_TEMPLATES.recordDefinitionName, DL_DATA_TEMPLATES.fields.template, row[RX_RECORD_DEFINITION.coreFieldIds.id], row[DL_DATA_TEMPLATES.fields.template]);
                        }
                    }
                ]
            },
            {
                fieldId: String(DL_DATA_TEMPLATES.fields.isActive),
                title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.is-active-template.label'),
                visible: false
            },
            {
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false
            }
        ];
    }
    editDataTemplate(selectedRow) {
        this.openDockedPanel(true, selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id]);
    }
    createDataTemplate() {
        this.openDockedPanel(false);
    }
    openDockedPanel(isEditMode, templateRecordInstanceId) {
        return this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.template.label'),
            content: DataTemplateEditorComponent,
            data: {
                isEditMode,
                templateRecordInstanceId
            }
        })
            .then(() => {
            this.grid.api.refresh().subscribe();
        })
            .catch(noop);
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: DL_DATA_TEMPLATES.fields.templateName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: DL_DATA_TEMPLATES.fields.bundleFriendlyName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: DL_DATA_TEMPLATES.fields.isActive,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        1: this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label'),
                        0: this.translateService.instant('com.bmc.arsys.rx.client.common.no.label')
                    }
                },
                {
                    id: DL_DATA_TEMPLATES.fields.dataloadTemplateDescription,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: DL_DATA_TEMPLATES.fields.template,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
}
DataTemplatesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesComponent, deps: [{ token: i2$1.RxNotificationService }, { token: i4$1.RxModalService }, { token: i2.TranslateService }, { token: i5.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Component });
DataTemplatesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataTemplatesComponent, selector: "dl-data-templates", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }], ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-template-button\"\n  (click)=\"createDataTemplate()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.templates.new-template.label' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-templates',
                    templateUrl: './data-templates.component.html',
                    styleUrls: ['./data-templates.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxNotificationService }, { type: i4$1.RxModalService }, { type: i2.TranslateService }, { type: i5.RxRecordInstanceService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }], grid: [{
                type: ViewChild,
                args: ['grid']
            }] } });

class DataTemplatesRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'dl-dataload-data-templates',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataTemplatesComponent),
            name: 'Data templates',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.dataloadBundleId]
        });
    }
}
DataTemplatesRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1$2.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataTemplatesRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, declarations: [DataTemplatesComponent, DataTemplateEditorComponent], imports: [AdaptButtonModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RecordGridModule,
        AdaptRxSelectModule,
        ReactiveFormsModule,
        AdaptRxTextfieldModule,
        AdaptRxRadiobuttonModule,
        AdaptRxUploaderModule,
        AdaptRxTextareaModule,
        RxBusyIndicatorModule] });
DataTemplatesRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, imports: [[
            AdaptButtonModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RecordGridModule,
            AdaptRxSelectModule,
            ReactiveFormsModule,
            AdaptRxTextfieldModule,
            AdaptRxRadiobuttonModule,
            AdaptRxUploaderModule,
            AdaptRxTextareaModule,
            RxBusyIndicatorModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DataTemplatesComponent, DataTemplateEditorComponent],
                    imports: [
                        AdaptButtonModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RecordGridModule,
                        AdaptRxSelectModule,
                        ReactiveFormsModule,
                        AdaptRxTextfieldModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxUploaderModule,
                        AdaptRxTextareaModule,
                        RxBusyIndicatorModule
                    ],
                    entryComponents: [DataTemplatesComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1$2.RxViewComponentRegistryService }]; } });

class DataloadModule {
}
DataloadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DataloadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, imports: [DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule] });
DataloadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, providers: [], imports: [[DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule],
                    providers: [],
                    declarations: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DataImportComponent, DataImportRegistrationModule, DataloadModule };
//# sourceMappingURL=helix-platform-dataload-components.js.map
