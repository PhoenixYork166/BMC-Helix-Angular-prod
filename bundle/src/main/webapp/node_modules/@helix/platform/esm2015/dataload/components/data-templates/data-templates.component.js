import { Component, HostBinding, ViewChild } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { DL_DATA_TEMPLATES } from './data-templates.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { map, noop } from 'lodash';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { DataTemplateEditorComponent } from './data-template-editor/data-template-editor.component';
import { RxNotificationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/view/components";
export class DataTemplatesComponent {
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
                const deleteDataRequests$ = map(this.grid.api.getSelectedRows(), (row) => this.rxRecordInstanceService.delete(DL_DATA_TEMPLATES.recordDefinitionName, row[RX_RECORD_DEFINITION.coreFieldIds.id]));
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
DataTemplatesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesComponent, deps: [{ token: i1.RxNotificationService }, { token: i2.RxModalService }, { token: i3.TranslateService }, { token: i4.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Component });
DataTemplatesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataTemplatesComponent, selector: "dl-data-templates", host: { properties: { "class": "this.hostClass" } }, viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }], ngImport: i0, template: "<button\n  adapt-button\n  type=\"button\"\n  btn-type=\"tertiary\"\n  class=\"d-icon-plus_circle px-0 align-self-start\"\n  rx-id=\"new-template-button\"\n  (click)=\"createDataTemplate()\"\n>\n  {{ 'com.bmc.arsys.rx.client.dataload.templates.new-template.label' | translate }}\n</button>\n\n<rx-record-grid #grid [config]=\"gridConfig$\"></rx-record-grid>\n", styles: [":host{display:block;padding:1rem;height:100%}:host::ng-deep rx-record-grid{height:100%}\n"], components: [{ type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-templates',
                    templateUrl: './data-templates.component.html',
                    styleUrls: ['./data-templates.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.RxModalService }, { type: i3.TranslateService }, { type: i4.RxRecordInstanceService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }], grid: [{
                type: ViewChild,
                args: ['grid']
            }] } });
//# sourceMappingURL=data-templates.component.js.map