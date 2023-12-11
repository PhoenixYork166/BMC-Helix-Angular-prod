import { Component, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDataPageFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { noop, omit } from 'lodash';
import { of } from 'rxjs';
import { RxTenantService } from './manage-tenant.service';
import { TenantFields } from './manage-tenant.types';
import { TenantEditorComponent } from './tenant-editor/tenant-editor.component';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./manage-tenant.service";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/view/components";
export class ManageTenantAdminComponent {
    constructor(rxDataPageService, rxTenantService, rxModalService, rxNotificationService, translateService) {
        this.rxDataPageService = rxDataPageService;
        this.rxTenantService = rxTenantService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.getData = (queryParams) => this.dataPage.get({ params: omit(queryParams, ['searchText', 'recorddefinition']) });
        this.dataPage = this.rxDataPageService.withType('com.bmc.arsys.rx.application.tenant.datapage.TenantDataPageQuery');
    }
    ngOnInit() {
        this.manageTenantGridConfig = of({
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => this.deleteTenant()
                        }
                    ]
                }
            ],
            recordIdField: 'name',
            enableRowSelection: RowSelectionMode.Single,
            enableFiltering: false,
            getData: (queryParams) => this.getData(queryParams),
            getRecordDefinition: () => of(this.getRecordDefinition()),
            columns: [
                {
                    index: 0,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant.label'),
                    fieldId: TenantFields.Name,
                    clickable: true,
                    sortable: false,
                    actions: [
                        {
                            name: (previousActionResult, lastActionRow) => this.editTenant(lastActionRow)
                        }
                    ]
                },
                {
                    index: 1,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.domain-identifier.label'),
                    fieldId: TenantFields.DomainIdentifier,
                    sortable: false
                },
                {
                    index: 2,
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.virtual-host-name.label'),
                    fieldId: TenantFields.VirtualHostname,
                    sortable: false
                }
            ],
            styles: 'flex-fill'
        });
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: TenantFields.Name,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: TenantFields.DomainIdentifier,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: TenantFields.VirtualHostname,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
    refreshManageTenantGrid() {
        this.manageTenantGrid.api.refresh().subscribe();
    }
    addTenant() {
        const tenantCount = this.manageTenantGrid.adaptTableConfig.data.length;
        if (tenantCount > 0) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant-already-exists.message'));
        }
        else {
            this.openDockedPanel();
        }
    }
    editTenant(selectedTenant) {
        const selectedTenantName = selectedTenant[TenantFields.Name];
        this.rxTenantService.getTenant(selectedTenantName).subscribe((tenant) => {
            this.openDockedPanel(tenant);
        });
    }
    openDockedPanel(tenant) {
        this.rxModalService
            .openDockedPanel({
            title: tenant
                ? this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.edit-tenant.label')
                : this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.new-tenant.label'),
            content: TenantEditorComponent,
            size: 'lg',
            data: {
                tenant
            }
        })
            .then(() => {
            this.refreshManageTenantGrid();
        })
            .catch(noop);
    }
    deleteTenant() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                const selectedTenantDefinition = this.manageTenantGrid.api.getFirstSelectedRow();
                this.rxTenantService.deleteTenant(selectedTenantDefinition.name).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant-deleted.message'));
                    this.refreshManageTenantGrid();
                });
            }
        });
    }
}
ManageTenantAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageTenantAdminComponent, deps: [{ token: i1.RxDataPageFactoryService }, { token: i2.RxTenantService }, { token: i3.RxModalService }, { token: i1.RxNotificationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ManageTenantAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ManageTenantAdminComponent, selector: "rx-admin-manage-tenant", viewQueries: [{ propertyName: "manageTenantGrid", first: true, predicate: ["manageTenantGrid"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.manage-tenant.tenant-activation.header.title' | translate }}\"\n>\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle align-self-start\"\n    rx-id=\"new-button\"\n    (click)=\"addTenant()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n\n  <rx-record-grid rx-id=\"manage-tenant-grid\" #manageTenantGrid [config]=\"manageTenantGridConfig\"></rx-record-grid>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageTenantAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-manage-tenant',
                    templateUrl: './manage-tenant.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDataPageFactoryService }, { type: i2.RxTenantService }, { type: i3.RxModalService }, { type: i1.RxNotificationService }, { type: i4.TranslateService }]; }, propDecorators: { manageTenantGrid: [{
                type: ViewChild,
                args: ['manageTenantGrid', { static: true }]
            }] } });
//# sourceMappingURL=manage-tenant.component.js.map