import { Component, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent } from '@helix/platform/view/components';
import { castArray, noop } from 'lodash';
import { Observable } from 'rxjs';
import { FunctionalRoleEditorComponent } from './functional-role-editor/functional-role-editor.component';
import { RxFuntionalRoleService } from './functional-role.service';
import { RX_FUNCTIONAL_ROLES } from './functional-roles.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./functional-role.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/view/components";
export class FunctionalRolesAdminComponent {
    constructor(rxFuntionalRoleService, rxNotificationService, rxModalService, translateService) {
        this.rxFuntionalRoleService = rxFuntionalRoleService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.gridConfig$ = new Observable((observer) => {
            observer.next({
                recordDefinitionName: RX_FUNCTIONAL_ROLES.recordDefinitionName,
                columns: this.getColumns(),
                actionButtons: this.getActionButtons(),
                styles: 'flex-fill'
            });
            observer.complete();
        });
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
                                title: this.translateService.instant('com.bmc.arsys.rx.client.dialog.warning.label'),
                                modalStyle: RX_MODAL.modalStyles.warning,
                                message: this.translateService.instant('com.bmc.arsys.rx.client.admin.functional-roles.functional-role-delete-confirmation.message')
                            })
                                .then((response) => {
                                if (response) {
                                    const selectedRecords = castArray(this.functionalRolesRecordGrid.api.getSelectedRows());
                                    const rolesToDelete = selectedRecords.map((record) => {
                                        return {
                                            applicationName: record[RX_FUNCTIONAL_ROLES.fieldIds.applicationName],
                                            name: record[RX_FUNCTIONAL_ROLES.fieldIds.name]
                                        };
                                    });
                                    this.rxFuntionalRoleService.delete(rolesToDelete).subscribe(() => {
                                        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.functional-roles.functional-role-deleted.message'));
                                        this.functionalRolesRecordGrid.api.refresh().subscribe();
                                    });
                                }
                            });
                        }
                    }
                ]
            }
        ];
    }
    getColumns() {
        return [
            {
                fieldId: `${RX_FUNCTIONAL_ROLES.fieldIds.name}`,
                index: 0,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.editFunctionalRole(lastActionRow)
                    }
                ]
            },
            {
                fieldId: `${RX_FUNCTIONAL_ROLES.fieldIds.applicationName}`,
                index: 1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.functional-roles.application-library-name.label')
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.description}`,
                index: 2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.description.title')
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.id}`,
                index: 3,
                title: 'ID'
            }
        ];
    }
    openModal(data) {
        this.rxModalService
            .openModal({
            content: FunctionalRoleEditorComponent,
            size: 'default',
            data: {
                functionalRole: data
            }
        })
            .then((result) => {
            if (result) {
                this.functionalRolesRecordGrid.api.refresh().subscribe();
            }
        })
            .catch(noop);
    }
    createFunctionalRole() {
        this.openModal({
            name: '',
            applicationName: '',
            description: '',
            applicationRoles: {}
        });
    }
    editFunctionalRole(functionalRoleRow) {
        this.rxFuntionalRoleService
            .get({
            applicationName: functionalRoleRow[RX_FUNCTIONAL_ROLES.fieldIds.applicationName],
            name: functionalRoleRow[RX_FUNCTIONAL_ROLES.fieldIds.name]
        })
            .subscribe((functionalRole) => {
            this.openModal(functionalRole);
        });
    }
}
FunctionalRolesAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRolesAdminComponent, deps: [{ token: i1.RxFuntionalRoleService }, { token: i2.RxNotificationService }, { token: i3.RxModalService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
FunctionalRolesAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FunctionalRolesAdminComponent, selector: "rx-admin-functional-roles", viewQueries: [{ propertyName: "functionalRolesRecordGrid", first: true, predicate: ["functionalRolesRecordGrid"], descendants: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.functional.roles' | translate }}\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle align-self-start\"\n    rx-id=\"new-button\"\n    (click)=\"createFunctionalRole()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n  <rx-record-grid rx-id=\"functional-roles-grid\" #functionalRolesRecordGrid [config]=\"gridConfig$\"> </rx-record-grid>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRolesAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-functional-roles',
                    templateUrl: './functional-roles.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxFuntionalRoleService }, { type: i2.RxNotificationService }, { type: i3.RxModalService }, { type: i4.TranslateService }]; }, propDecorators: { functionalRolesRecordGrid: [{
                type: ViewChild,
                args: ['functionalRolesRecordGrid', { static: false }]
            }] } });
//# sourceMappingURL=functional-roles.component.js.map