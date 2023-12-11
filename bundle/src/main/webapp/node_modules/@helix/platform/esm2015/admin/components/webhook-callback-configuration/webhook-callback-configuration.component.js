import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { map, noop } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { WebhookCallbackConfigurationEditorComponent } from './webhook-callback-configuration-editor/webhook-callback-configuration-editor.component';
import { RX_WEBHOOK_CALLBACK_CONFIGURATION } from './webhook-callback-configuration.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/view/components";
export class WebhookCallbackConfigurationAdminComponent {
    constructor(formBuilder, rxModalService, rxNotificationService, rxRecordInstanceService, translateService) {
        this.formBuilder = formBuilder;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
    }
    ngOnInit() {
        this.gridConfig = of({
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => this.deleteConfigurations()
                        }
                    ]
                }
            ],
            recordDefinitionName: RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.name,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: this.getColumns(),
            styles: 'flex-fill'
        });
    }
    editConfiguration(selectedRecord) {
        this.openDockedPanel(true, selectedRecord[RX_RECORD_DEFINITION.coreFieldIds.id]);
    }
    createConfiguration() {
        this.openDockedPanel(false);
    }
    deleteConfigurations() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.admin.webhook-callback-configuration.delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                const deleteRequests$ = [];
                map(this.grid.api.getSelectedRows(), (record) => {
                    deleteRequests$.push(this.rxRecordInstanceService.delete(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.name, record[RX_RECORD_DEFINITION.coreFieldIds.id]));
                });
                forkJoin(deleteRequests$).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.webhook-callback-configuration.configurations-deleted.message'));
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    getColumns() {
        return [
            {
                index: 0,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                fieldId: String(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.name),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => {
                            this.editConfiguration(selectedRow);
                        }
                    }
                ]
            },
            {
                index: 1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.webhook-callback-configuration.application.label'),
                fieldId: String(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.processor)
            },
            {
                index: 2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.webhook-callback-configuration.created-date.label'),
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.createdDate)
            }
        ];
    }
    openDockedPanel(isEditMode, recordId) {
        return this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.webhook-callback-configuration.header.title'),
            content: WebhookCallbackConfigurationEditorComponent,
            data: {
                isEditMode,
                recordId
            }
        })
            .then(() => {
            this.grid.api.refresh().subscribe();
        })
            .catch(noop);
    }
}
WebhookCallbackConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxModalService }, { token: i3.RxNotificationService }, { token: i4.RxRecordInstanceService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
WebhookCallbackConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebhookCallbackConfigurationAdminComponent, selector: "rx-admin-webhook-callback-configuration", viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.webhook-callback-configuration.header.title' | translate }}\"\n>\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle align-self-start\"\n    rx-id=\"new-configuration-button\"\n    (click)=\"this.createConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n\n  <rx-record-grid #grid [config]=\"gridConfig\"></rx-record-grid>\n</rx-admin-settings>\n", components: [{ type: i6.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-webhook-callback-configuration',
                    templateUrl: './webhook-callback-configuration.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxModalService }, { type: i3.RxNotificationService }, { type: i4.RxRecordInstanceService }, { type: i5.TranslateService }]; }, propDecorators: { grid: [{
                type: ViewChild,
                args: ['grid', { static: true }]
            }] } });
//# sourceMappingURL=webhook-callback-configuration.component.js.map