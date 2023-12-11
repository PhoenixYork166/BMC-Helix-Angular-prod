import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColumnSortDirection, RecordGridComponent } from '@helix/platform/view/components';
import { noop, of } from 'rxjs';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RX_IPAAS_APIS } from './ipaas-base-apis.constant';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxIpaasBaseApisService } from './ipaas-base-apis.service';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize, RxViewActionUtilsService } from '@helix/platform/view/api';
import { castArray, get, map as _map } from 'lodash';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "./ipaas-base-apis.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/view/api";
import * as i6 from "@helix/platform/record/api";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@helix/platform/view/components";
export class IpaasBaseApisComponent {
    constructor(translateService, rxIpaasBaseApisService, rxNotificationService, rxModalService, rxViewActionUtilsService, rxRecordInstanceDataPageService) {
        this.translateService = translateService;
        this.rxIpaasBaseApisService = rxIpaasBaseApisService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.createApi = new EventEmitter();
        this.editApi = new EventEmitter();
        this.deleteApis = new EventEmitter();
        this.recordDefinition = {
            fieldDefinitions: [
                {
                    id: RX_IPAAS_APIS.fieldIds.groupName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_IPAAS_APIS.fieldIds.apiName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_IPAAS_APIS.fieldIds.organization,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_IPAAS_APIS.fieldIds.environment,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_IPAAS_APIS.fieldIds.path,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_IPAAS_APIS.fieldIds.method,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: RX_IPAAS_APIS.methods
                }
            ]
        };
    }
    ngOnInit() {
        this.gridConfig$ = of({
            getData: this.getData.bind(this),
            recordDefinitionName: this.ipaasApisConfig.recordDefinitionName,
            columns: this.getColumns(),
            actionButtons: this.getActionButtons(),
            getRecordDefinition: () => of(this.recordDefinition),
            styles: 'flex-fill'
        });
    }
    getData(queryParams) {
        const params = Object.assign(Object.assign({}, queryParams), { propertySelection: [
                RX_RECORD_DEFINITION.coreFieldIds.id,
                RX_IPAAS_APIS.fieldIds.groupName,
                RX_IPAAS_APIS.fieldIds.apiName,
                RX_IPAAS_APIS.fieldIds.organization,
                RX_IPAAS_APIS.fieldIds.environment,
                RX_IPAAS_APIS.fieldIds.path,
                RX_IPAAS_APIS.fieldIds.method
            ] });
        delete params.searchText;
        return this.rxRecordInstanceDataPageService.post({ params });
    }
    getColumns() {
        return [
            {
                fieldId: String(RX_IPAAS_APIS.fieldIds.groupName),
                index: 0,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.jitterbit-apis.group-name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.renameGroup(lastActionRow)
                    }
                ],
                sortable: { direction: ColumnSortDirection.Asc, priority: 0 }
            },
            {
                fieldId: String(RX_IPAAS_APIS.fieldIds.apiName),
                index: 1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.jitterbit-apis.api-name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.openEditApiDialog(lastActionRow)
                    }
                ],
                sortable: { direction: ColumnSortDirection.Asc, priority: 1 }
            },
            {
                fieldId: String(RX_IPAAS_APIS.fieldIds.organization),
                index: 2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.org')
            },
            {
                fieldId: String(RX_IPAAS_APIS.fieldIds.environment),
                index: 3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.jitterbit-apis.environment.label')
            },
            {
                fieldId: String(RX_IPAAS_APIS.fieldIds.path),
                index: 4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.jitterbit-apis.path.label')
            },
            {
                fieldId: String(RX_IPAAS_APIS.fieldIds.method),
                index: 5,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.jitterbit-apis.method.label')
            }
        ];
    }
    getActionButtons() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                style: 'tertiary',
                iconCls: 'trash',
                actions: [
                    {
                        name: () => {
                            this.rxModalService
                                .confirm({
                                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                modalStyle: RX_MODAL.modalStyles.warning,
                                message: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-apis.delete-api.confirmation.message')
                            })
                                .then((result) => {
                                if (result) {
                                    const records = castArray(this.ipaasApisGrid.api.getSelectedRows());
                                    const recordIds = this.rxViewActionUtilsService.extractRecordIds(records);
                                    this.deleteApis.emit(recordIds);
                                }
                            });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.edit.label'),
                style: 'tertiary',
                icon: 'pencil',
                disabled: () => this.ipaasApisGrid.api.getSelectedRowCount() !== 1,
                actions: [
                    {
                        name: () => this.openEditApiDialog(this.ipaasApisGrid.api.getFirstSelectedRow())
                    }
                ]
            }
        ];
    }
    renameGroup(row) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-apis.rename-api-group.label'),
            content: GroupEditorComponent,
            size: OpenViewActionModalSize.Xsmall,
            data: {
                groupName: row[RX_IPAAS_APIS.fieldIds.groupName],
                groupNames: _map(this.ipaasApisGrid.adaptTableConfig.data, RX_IPAAS_APIS.fieldIds.groupName)
            }
        })
            .then((groupName) => {
            this.rxIpaasBaseApisService
                .renameApiGroup(this.ipaasApisConfig.resourceType, row[RX_IPAAS_APIS.fieldIds.groupName], groupName)
                .subscribe(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.ipaas-apis.rename-group-save.success.message'));
                this.refreshIpaasGrid();
            });
        })
            .catch(noop);
    }
    openAddApiDialog() {
        const selectedGroup = this.ipaasApisGrid.api.getFirstSelectedRow();
        this.createApi.emit({
            groupName: get(selectedGroup, RX_IPAAS_APIS.fieldIds.groupName, ''),
            recordDefinitionName: this.ipaasApisConfig.recordDefinitionName
        });
    }
    openEditApiDialog(row) {
        this.editApi.emit({
            id: row[RX_RECORD_DEFINITION.coreFieldIds.id],
            apiName: row[RX_IPAAS_APIS.fieldIds.apiName],
            groupName: row[RX_IPAAS_APIS.fieldIds.groupName],
            recordDefinitionName: this.ipaasApisConfig.recordDefinitionName
        });
    }
    refreshIpaasGrid() {
        this.ipaasApisGrid.api.refresh().subscribe();
    }
}
IpaasBaseApisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseApisComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxIpaasBaseApisService }, { token: i3.RxNotificationService }, { token: i4.RxModalService }, { token: i5.RxViewActionUtilsService }, { token: i6.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
IpaasBaseApisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IpaasBaseApisComponent, selector: "rx-ipaas-base-apis", inputs: { ipaasApisConfig: "ipaasApisConfig" }, outputs: { createApi: "createApi", editApi: "editApi", deleteApis: "deleteApis" }, viewQueries: [{ propertyName: "ipaasApisGrid", first: true, predicate: ["ipaasApisGrid"], descendants: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ ipaasApisConfig.titleKey | translate }}\">\n  <div class=\"d-flex ml-2\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"tertiary\"\n      class=\"d-icon-plus_circle align-self-start\"\n      rx-id=\"new-button\"\n      (click)=\"openAddApiDialog()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\n    </button>\n  </div>\n\n  <rx-record-grid rx-id=\"ipaas-apis-grid\" #ipaasApisGrid [config]=\"gridConfig$\"></rx-record-grid>\n</rx-admin-settings>\n", components: [{ type: i7.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i8.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseApisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-ipaas-base-apis',
                    templateUrl: './ipaas-base-apis.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxIpaasBaseApisService }, { type: i3.RxNotificationService }, { type: i4.RxModalService }, { type: i5.RxViewActionUtilsService }, { type: i6.RxRecordInstanceDataPageService }]; }, propDecorators: { ipaasApisConfig: [{
                type: Input
            }], createApi: [{
                type: Output
            }], editApi: [{
                type: Output
            }], deleteApis: [{
                type: Output
            }], ipaasApisGrid: [{
                type: ViewChild,
                args: ['ipaasApisGrid']
            }] } });
//# sourceMappingURL=ipaas-base-apis.component.js.map