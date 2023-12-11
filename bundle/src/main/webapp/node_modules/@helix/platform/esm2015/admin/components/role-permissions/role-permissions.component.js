import { Component, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxNotificationService, RxRoleDataPageService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { castArray, noop } from 'lodash';
import { of } from 'rxjs';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { RoleFields } from './role-permission.types';
import { RxRolePermissionsService } from './role-permissions.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./role-permissions.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/view/components";
export class RolePermissionsAdminComponent {
    constructor(rxRolePermissionsService, rxNotificationService, rxModalService, rxRoleDataPage, translateService) {
        this.rxRolePermissionsService = rxRolePermissionsService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.rxRoleDataPage = rxRoleDataPage;
        this.translateService = translateService;
        this.isDirty = false;
        this.getData = (queryParams) => {
            delete queryParams.searchText;
            return this.rxRoleDataPage.get({
                params: Object.assign({}, queryParams)
            });
        };
    }
    ngOnInit() {
        const gridColumns = [
            {
                index: 0,
                fieldId: RoleFields.RoleId,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.role-id.label'),
                filterable: false
            },
            {
                index: 1,
                fieldId: RoleFields.RoleName,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.role-name.label'),
                filterable: true,
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.editRole(lastActionRow)
                    }
                ]
            },
            {
                index: 2,
                fieldId: RoleFields.ApplicationName,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.application-name.title'),
                filterable: true
            },
            {
                index: 3,
                fieldId: RoleFields.Datatag,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.datatag.label'),
                filterable: false
            }
        ];
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: RoleFields.RoleId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RoleFields.RoleName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RoleFields.ApplicationName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RoleFields.Datatag,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const actionButtons = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                style: 'tertiary',
                icon: 'trash',
                actions: [
                    {
                        name: () => {
                            this.rxModalService
                                .confirm({
                                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                modalStyle: RX_MODAL.modalStyles.warning,
                                message: this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.delete-confirmation.message')
                            })
                                .then((result) => {
                                if (result) {
                                    const selectedRecords = castArray(this.rolesPermissionsRecordGrid.api.getSelectedRows());
                                    const rolesToDelete = selectedRecords.map((record) => {
                                        return {
                                            applicationName: record[RoleFields.ApplicationName],
                                            name: record[RoleFields.RoleName]
                                        };
                                    });
                                    this.rxRolePermissionsService.delete(rolesToDelete).subscribe(() => {
                                        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.roles-deleted.message'));
                                        this.rolesPermissionsRecordGrid.api.refresh().subscribe();
                                    });
                                }
                            });
                        }
                    }
                ]
            }
        ];
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableFiltering: true,
            recordIdField: RoleFields.RoleId,
            getRecordDefinition: () => of(recordDefinition),
            enableRowSelection: RowSelectionMode.Multiple,
            actionButtons: actionButtons,
            getData: this.getData,
            styles: 'flex-fill'
        });
    }
    openDockedPanel(title, role) {
        this.rxModalService
            .openDockedPanel({
            title: title,
            content: RoleEditorComponent,
            size: 'lg',
            data: {
                role
            }
        })
            .then((result) => {
            if (result) {
                this.rolesPermissionsRecordGrid.api.refresh().subscribe();
            }
        })
            .catch(noop);
    }
    createRole() {
        this.openDockedPanel(this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.create-role.label'), {
            roleID: null,
            roleName: '',
            datatag: '',
            test: '',
            production: '',
            applicationName: ''
        });
    }
    editRole(roleRow) {
        this.rxRolePermissionsService
            .get({
            applicationName: roleRow[RoleFields.ApplicationName],
            name: roleRow[RoleFields.RoleName]
        })
            .subscribe((role) => {
            this.openDockedPanel(this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.edit-role.label'), role);
        });
    }
}
RolePermissionsAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RolePermissionsAdminComponent, deps: [{ token: i1.RxRolePermissionsService }, { token: i2.RxNotificationService }, { token: i3.RxModalService }, { token: i2.RxRoleDataPageService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RolePermissionsAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RolePermissionsAdminComponent, selector: "rx-admin-role-permissions", viewQueries: [{ propertyName: "rolesPermissionsRecordGrid", first: true, predicate: ["rolesPermissionsRecordGrid"], descendants: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.role-permissions.header.title' | translate }}\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle align-self-start btn btn-link\"\n    rx-id=\"new-button\"\n    (click)=\"createRole()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n\n  <rx-record-grid rx-id=\"roles-permissions-grid\" #rolesPermissionsRecordGrid [config]=\"recordGridConfig$\">\n  </rx-record-grid>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RolePermissionsAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-role-permissions',
                    templateUrl: './role-permissions.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRolePermissionsService }, { type: i2.RxNotificationService }, { type: i3.RxModalService }, { type: i2.RxRoleDataPageService }, { type: i4.TranslateService }]; }, propDecorators: { rolesPermissionsRecordGrid: [{
                type: ViewChild,
                args: ['rolesPermissionsRecordGrid', { static: false }]
            }] } });
//# sourceMappingURL=role-permissions.component.js.map