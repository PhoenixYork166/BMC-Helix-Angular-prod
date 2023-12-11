import { Component, ComponentFactoryResolver, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { RecordGridColumnAlignment, RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { DL_DATA_IMPORT } from './data-import.constant';
import { RxJsonParserService } from '@helix/platform/utils';
import { every, filter, get, map as _map, noop, omit, some } from 'lodash';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { DataImportService } from './data-import.service';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { ImportRecordStatusInfoComponent } from './import-record-status-info/import-record-status-info.component';
import { RxWizardService } from '@helix/platform/shared/components';
import { UploadDataFileStepComponent } from './upload-data-file-step/upload-data-file-step.component';
import { switchMap } from 'rxjs/operators';
import { RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/utils";
import * as i8 from "./data-import.service";
import * as i9 from "@helix/platform/view/components";
export class DataImportComponent {
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
                const deleteDataRequests$ = _map(this.grid.api.getSelectedRows(), (row) => this.rxRecordInstanceService.delete(DL_DATA_IMPORT.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id]));
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
        return _map(get(this.rxJsonParserService.tryParseJson(selectedRow[DL_DATA_IMPORT.fields.mappingConfig]), 'dataImportConfigurations.sheets'), 'configurations.definitionMappings.targetDefinition.name')
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
DataImportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxModalService }, { token: i2.RxDefinitionNameService }, { token: i2.RxNotificationService }, { token: i3.RxWizardService }, { token: i4.TranslateService }, { token: i5.RxRecordInstanceService }, { token: i6.AdaptModalService }, { token: i7.RxJsonParserService }, { token: i8.DataImportService }, { token: i5.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
DataImportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataImportComponent, selector: "dl-data-import", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "recordNamesCellTemplate", first: true, predicate: ["recordNamesCellTemplate"], descendants: true, static: true }, { propertyName: "statusInfoCellTemplate", first: true, predicate: ["statusInfoCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-import-button\"\n  (click)=\"newDataImport()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.import.new-import.title' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n\n<ng-template #recordNamesCellTemplate let-dataItem=\"dataItem\">\n  {{ getRecordNames(dataItem) }}\n</ng-template>\n\n<ng-template #statusInfoCellTemplate let-dataItem=\"dataItem\">\n  <a href=\"javascript:void(0)\" (click)=\"showStatusInfo(dataItem)\">{{\n    'com.bmc.arsys.rx.client.common.action-view.label' | translate\n  }}</a>\n</ng-template>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-import',
                    templateUrl: './data-import.component.html',
                    styleUrls: ['./data-import.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxModalService }, { type: i2.RxDefinitionNameService }, { type: i2.RxNotificationService }, { type: i3.RxWizardService }, { type: i4.TranslateService }, { type: i5.RxRecordInstanceService }, { type: i6.AdaptModalService }, { type: i7.RxJsonParserService }, { type: i8.DataImportService }, { type: i5.RxRecordInstanceDataPageService }]; }, propDecorators: { hostClass: [{
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
//# sourceMappingURL=data-import.component.js.map