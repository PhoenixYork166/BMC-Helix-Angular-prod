import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { of } from 'rxjs';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { RX_APPROVAL_CONFIGURATION } from './approval-configuration.constant';
import { RxRecordDefinitionRegistrationDataPageService } from './record-definition-registration-data-page.service';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxApprovalConfigurationService } from './approval-configuration.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { ApprovalConfigurationEditorComponent } from './approval-configuration-editor/approval-configuration-editor.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "./approval-configuration.service";
import * as i6 from "./record-definition-registration-data-page.service";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "./associated-record-field-name.pipe";
export class ApprovalConfigurationAdminComponent {
    constructor(rxModalService, translateService, adaptModalService, rxNotificationService, rxApprovalConfigurationService, rxRecordDefinitionRegistrationDataPageService) {
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.adaptModalService = adaptModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxApprovalConfigurationService = rxApprovalConfigurationService;
        this.rxRecordDefinitionRegistrationDataPageService = rxRecordDefinitionRegistrationDataPageService;
    }
    ngOnInit() {
        this.gridConfig = of({
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.de-register.button.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => {
                                this.unregisterRecord();
                            }
                        }
                    ]
                }
            ],
            recordDefinitionName: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.name,
            filterExpression: "('61001'!=$NULL$ AND '61001'!=\"\" AND ('14860' != $NULL$ AND '14860' = 1 ))",
            getData: (queryParams) => this.getData(queryParams),
            enableRowSelection: RowSelectionMode.Single,
            getRecordDefinition: () => of(this.getRecordDefinition()),
            columns: this.getColumns(),
            styles: 'flex-fill',
            enableFiltering: false
        });
    }
    getData(queryParams) {
        delete queryParams.searchText;
        queryParams.pageSize = -1;
        return this.rxRecordDefinitionRegistrationDataPageService.get({ params: queryParams });
    }
    newApprovalConfiguration() {
        this.openApprovalConfiguration({
            editMode: false,
            selectedRecordDefinition: ''
        });
    }
    editApprovalConfiguration(clickedColumnRow) {
        this.openApprovalConfiguration({
            editMode: true,
            selectedRecordDefinition: clickedColumnRow[RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName]
        });
    }
    openApprovalConfiguration(data) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.main.title'),
            content: ApprovalConfigurationEditorComponent,
            size: OpenViewActionModalSize.Large,
            data: Object.assign({}, data)
        })
            .then(() => { }, () => {
            this.grid.api.refresh().subscribe();
        })
            .catch(() => { });
    }
    unregisterRecord() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.de-register.warning')
        })
            .then((result) => {
            if (result) {
                this.rxApprovalConfigurationService
                    .unRegisterRecord(this.grid.api.getFirstSelectedRow()[RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName])
                    .subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.record.de-register.success'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formRequestId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.requester,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.summary,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.notesField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field3,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field4,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field5,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field6,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field7,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.securityLabels,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
    getColumns() {
        return [
            {
                index: 0,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.recordDefinition'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                index: 1,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formRequestId),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.requestId'),
                cellTemplate: this.fieldNameCellTemplate,
                visible: false
            },
            {
                index: 2,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.requester),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.requester'),
                cellTemplate: this.fieldNameCellTemplate,
                visible: false
            },
            {
                index: 3,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.summary),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.description'),
                cellTemplate: this.fieldNameCellTemplate
            },
            {
                index: 4,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.formInstanceId'),
                visible: false
            },
            {
                index: 5,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.notesField),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.notes'),
                cellTemplate: this.fieldNameCellTemplate,
                visible: false
            },
            {
                index: 6,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field3),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.field3'),
                cellTemplate: this.fieldNameCellTemplate,
                visible: false
            },
            {
                index: 7,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field4),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.field4'),
                cellTemplate: this.fieldNameCellTemplate,
                visible: false
            },
            {
                index: 8,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field5),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.field5'),
                cellTemplate: this.fieldNameCellTemplate,
                visible: false
            },
            {
                index: 9,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field6),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.field6'),
                visible: false
            },
            {
                index: 10,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field7),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.field7'),
                visible: false
            },
            {
                index: 11,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.securityLabels),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.grid.column.securityLabels'),
                visible: false
            }
        ];
    }
}
ApprovalConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }, { token: i3.AdaptModalService }, { token: i4.RxNotificationService }, { token: i5.RxApprovalConfigurationService }, { token: i6.RxRecordDefinitionRegistrationDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalConfigurationAdminComponent, selector: "rx-admin-approval-configuration", viewQueries: [{ propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }, { propertyName: "fieldNameCellTemplate", first: true, predicate: ["fieldNameCellTemplate"], descendants: true, static: true }, { propertyName: "grid", first: true, predicate: ["grid"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.title' | translate }}\">\n  <ng-container>\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"tertiary\"\n      class=\"d-icon-plus_circle align-self-start\"\n      rx-id=\"new-button\"\n      (click)=\"newApprovalConfiguration()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n    </button>\n\n    <rx-record-grid #grid [config]=\"gridConfig\"></rx-record-grid>\n  </ng-container>\n</rx-admin-settings>\n\n<ng-template #definitionNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <a href=\"javascript:void(0)\" (click)=\"editApprovalConfiguration(dataItem)\">\n    {{ dataItem[column.field] | rxDefinitionNamePipe }}\n  </a>\n</ng-template>\n\n<ng-template #fieldNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxAssociatedRecordFieldNamePipe: dataItem.associationsLabels }}\n</ng-template>\n", components: [{ type: i7.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i2.TranslatePipe, "rxDefinitionNamePipe": i4.RxDefinitionNamePipe, "rxAssociatedRecordFieldNamePipe": i9.RxAssociatedRecordFieldNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-approval-configuration',
                    templateUrl: './approval-configuration.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }, { type: i3.AdaptModalService }, { type: i4.RxNotificationService }, { type: i5.RxApprovalConfigurationService }, { type: i6.RxRecordDefinitionRegistrationDataPageService }]; }, propDecorators: { definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }], fieldNameCellTemplate: [{
                type: ViewChild,
                args: ['fieldNameCellTemplate', { static: true }]
            }], grid: [{
                type: ViewChild,
                args: ['grid', { static: true }]
            }] } });
//# sourceMappingURL=approval-configuration.component.js.map