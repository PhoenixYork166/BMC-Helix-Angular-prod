import { Component, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { every, filter, get, map, noop } from 'lodash';
import { RxJsonParserService } from '@helix/platform/utils';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { ExportRecordStatusInfoComponent } from './export-record-status-info/export-record-status-info.component';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { DataExportConfigurationComponent } from './data-export-configuration/data-export-configuration.component';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { DataExportService } from './data-export.service';
import { RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { DL_DATA_EXPORT } from './data-export.constant';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./data-export.service";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@helix/platform/record/api";
import * as i8 from "@helix/platform/view/components";
export class DataExportComponent {
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
        const exportRequests = map(this.grid.api.getSelectedRows(), (row) => this.dataExportService.startDataExport(row[RX_RECORD_DEFINITION.coreFieldIds.id]));
        forkJoin(exportRequests).subscribe(() => {
            this.grid.api.refresh().subscribe();
        });
    }
    getRecordNames(selectedRow) {
        return map(get(this.rxJsonParserService.tryParseJson(selectedRow[DL_DATA_EXPORT.fields.configurations], []), 'definitions'), 'name')
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
                const deleteDataRequests$ = map(this.grid.api.getSelectedRows(), (row) => this.rxRecordInstanceService.delete(DL_DATA_EXPORT.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id]));
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
DataExportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportComponent, deps: [{ token: i1.DataExportService }, { token: i2.RxModalService }, { token: i3.TranslateService }, { token: i4.RxDefinitionNameService }, { token: i5.AdaptModalService }, { token: i6.RxJsonParserService }, { token: i4.RxNotificationService }, { token: i7.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Component });
DataExportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataExportComponent, selector: "dl-data-export", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "recordNamesCellTemplate", first: true, predicate: ["recordNamesCellTemplate"], descendants: true, static: true }, { propertyName: "statusInfoCellTemplate", first: true, predicate: ["statusInfoCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-export-button\"\n  (click)=\"newExport()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.export.new.label' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n\n<ng-template #recordNamesCellTemplate let-dataItem=\"dataItem\">\n  {{ getRecordNames(dataItem) }}\n</ng-template>\n\n<ng-template #statusInfoCellTemplate let-dataItem=\"dataItem\">\n  <a href=\"javascript:void(0)\" (click)=\"showStatusInfo(dataItem)\">{{\n    'com.bmc.arsys.rx.client.common.action-view.label' | translate\n  }}</a>\n</ng-template>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-export',
                    templateUrl: './data-export.component.html',
                    styleUrls: ['./data-export.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DataExportService }, { type: i2.RxModalService }, { type: i3.TranslateService }, { type: i4.RxDefinitionNameService }, { type: i5.AdaptModalService }, { type: i6.RxJsonParserService }, { type: i4.RxNotificationService }, { type: i7.RxRecordInstanceService }]; }, propDecorators: { hostClass: [{
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
//# sourceMappingURL=data-export.component.js.map