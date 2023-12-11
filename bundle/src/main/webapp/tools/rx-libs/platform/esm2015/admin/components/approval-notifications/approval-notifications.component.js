import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_APPROVAL_NOTIFICATIONS } from './approval-notifications.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RX_APPLICATION, RxDefinitionNameService, RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { RxApprovalNotificationsDataPageService } from './approval-notifications-data-page.service';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { filter, find, flow, forEach, groupBy, map as _map, map, noop, values } from 'lodash';
import { RxApprovalNotificationsService } from './approval-notifications.service';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { ApprovalNotificationEditorComponent } from './approval-notification-editor/approval-notification-editor.component';
import { RX_APPROVAL_CONFIGURATION } from '../approval-configuration/approval-configuration.constant';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "./approval-notifications-data-page.service";
import * as i6 from "./approval-notifications.service";
import * as i7 from "@helix/platform/record/api";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@helix/platform/view/components";
export class ApprovalNotificationsComponent extends BaseViewComponent {
    constructor(rxModalService, adaptModalService, translateService, rxGlobalCacheService, rxDefinitionNameService, rxApprovalNotificationsDataPageService, rxApprovalNotificationsService, rxNotificationService, rxRecordInstanceDataPageService) {
        super();
        this.rxModalService = rxModalService;
        this.adaptModalService = adaptModalService;
        this.translateService = translateService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxApprovalNotificationsDataPageService = rxApprovalNotificationsDataPageService;
        this.rxApprovalNotificationsService = rxApprovalNotificationsService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    ngOnInit() {
        this.editMode = false;
        this.gridConfig = of({
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: () => {
                                this.deleteNotification();
                            }
                        }
                    ]
                }
            ],
            getData: (queryParams) => this.getData(queryParams),
            getRecordDefinition: () => of(this.getRecordDefinition()),
            columns: this.getColumns(),
            styles: 'flex-fill',
            enableRowSelection: RowSelectionMode.Multiple
        });
    }
    createApprovalNotification() {
        this.editMode = false;
        this.initializeApprovalNotificationForm({
            notificationName: '',
            primaryRecordName: ''
        });
    }
    initializeApprovalNotificationForm(approvalNotification) {
        forkJoin([
            this.rxRecordInstanceDataPageService.post({
                params: {
                    recorddefinition: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.name,
                    propertySelection: RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName,
                    queryExpression: `('${RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field7}'!=$NULL$ OR '${RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.field7}'!="")`
                }
            }),
            this.rxRecordInstanceDataPageService.post({
                params: {
                    recorddefinition: 'AR System Administration: TextTemplate',
                    propertySelection: values(RX_APPROVAL_NOTIFICATIONS.arSystemAdministrationTextTemplate.fields).join()
                }
            }),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).subscribe(([apFormInstances, emailTemplateInstances, bundleDescriptors]) => {
            const globalLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.global-items.label');
            const recordDefinitions = flow((instanceData) => map(instanceData, (recordInstance) => {
                const bundleDescriptor = find(bundleDescriptors, {
                    id: this.rxDefinitionNameService.getBundleId(recordInstance[RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName])
                });
                return {
                    value: recordInstance[RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName],
                    displayValue: this.rxDefinitionNameService.getDisplayName(recordInstance[RX_APPROVAL_CONFIGURATION.selfApproval.apForm.fields.formName]),
                    applicationName: (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.friendlyName) || (bundleDescriptor === null || bundleDescriptor === void 0 ? void 0 : bundleDescriptor.id) || globalLabel
                };
            }), (definitions) => groupBy(definitions, 'applicationName'), (optionsByApplicationName) => map(optionsByApplicationName, (options, applicationName) => ({
                name: applicationName,
                children: _map(options, (option) => {
                    return {
                        value: option.value,
                        displayValue: option.displayValue
                    };
                })
            })))(apFormInstances.data);
            const templateList = [];
            if (emailTemplateInstances.data.length) {
                const nonApprovalTemplates = filter(emailTemplateInstances.data, function (template) {
                    return (template[RX_APPROVAL_NOTIFICATIONS.arSystemAdministrationTextTemplate.fields.applicationBundleId] !==
                        RX_APPLICATION.approvalBundleId);
                });
                forEach(nonApprovalTemplates, function (template) {
                    templateList.push({
                        name: template[RX_APPROVAL_NOTIFICATIONS.arSystemAdministrationTextTemplate.fields.name],
                        guid: template[RX_RECORD_DEFINITION.coreFieldIds.id]
                    });
                });
            }
            const title = this.editMode
                ? this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.edit-approval-notification.title')
                : this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.new-approval-notification.title');
            this.openModal(title, {
                approvalNotification: this.editMode
                    ? approvalNotification
                    : {
                        notificationName: '',
                        primaryRecordName: ''
                    },
                recordDefinitions,
                templateList: templateList
            });
        });
    }
    openModal(title, data) {
        this.rxModalService
            .openModal({
            title: title,
            content: ApprovalNotificationEditorComponent,
            data: Object.assign({}, data)
        })
            .then((result) => {
            if (result) {
                this.recordGridComponent.api.refresh().subscribe();
                this.editMode = false;
            }
        })
            .catch(noop);
    }
    deleteNotification() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.delete-selected-notification-confirmation.message')
        })
            .then((result) => {
            if (result) {
                const selectedApprovalNotifications = this.recordGridComponent.api.getSelectedRows();
                const selectedApprovalNotificationsIds = map(selectedApprovalNotifications, RX_RECORD_DEFINITION.coreFieldIds.id);
                this.rxApprovalNotificationsService
                    .deleteApprovalNotifications(selectedApprovalNotificationsIds)
                    .subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-deleted.message'));
                    this.recordGridComponent.api.refresh().subscribe();
                });
            }
        });
    }
    getData(queryParams) {
        const propertySelection = Object.values(RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields);
        const additionalQueryExpression = `('${RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.applicationBundleId}' != $NULL$)`;
        const queryExpression = queryParams.queryExpression
            ? '(' +
                additionalQueryExpression.substring(1, additionalQueryExpression.length - 1) +
                ' AND ' +
                queryParams.queryExpression.substring(1, queryParams.queryExpression.length - 1) +
                ')'
            : additionalQueryExpression;
        queryParams = Object.assign(Object.assign({}, queryParams), { propertySelection: propertySelection, queryExpression: queryExpression });
        return this.rxApprovalNotificationsDataPageService.get({ params: queryParams });
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.notificationName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.notifyOn,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        0: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.new-signature.name'),
                        1: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.approve.name'),
                        2: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.reject.name'),
                        9: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.reassign.name'),
                        10: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.error.name'),
                        11: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.cancel.name'),
                        12: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.more-info-provided.name'),
                        16: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.hold.name'),
                        17: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notify-on.options.more-info.name')
                    }
                },
                {
                    id: RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.method,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        2: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-method.types.email.name'),
                        5: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.notification-method.types.process.name')
                    }
                },
                {
                    id: RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.status,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        0: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.status.options.active.value'),
                        1: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.status.options.inactive.value')
                    }
                },
                {
                    id: RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.applicationName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.globalNotification,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.selection,
                    optionNamesById: {
                        0: this.translateService.instant('com.bmc.arsys.rx.client.common.no.label'),
                        1: this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label')
                    }
                }
            ]
        };
    }
    getColumns() {
        return [
            {
                index: 0,
                fieldId: String(RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.notificationName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.notification-name.title'),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, clickedColumnRow) => this.editApprovalNotification(clickedColumnRow)
                    }
                ]
            },
            {
                index: 1,
                fieldId: String(RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.applicationName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.record-definition.title'),
                filterable: false
            },
            {
                index: 2,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.id.title'),
                visible: false
            },
            {
                index: 3,
                fieldId: String(RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.notifyOn),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.notify-on.title')
            },
            {
                index: 4,
                fieldId: String(RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.method),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.notification-method.title')
            },
            {
                index: 5,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.status),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.status.title')
            },
            {
                index: 6,
                fieldId: String(RX_APPROVAL_NOTIFICATIONS.approvalNotificationForm.fields.globalNotification),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.notification-configuration.grid.column.global-notification.title')
            }
        ];
    }
    editApprovalNotification(approvalNotificationRow) {
        this.editMode = true;
        this.rxApprovalNotificationsService
            .getApprovalNotification(approvalNotificationRow[RX_RECORD_DEFINITION.coreFieldIds.id])
            .subscribe((approvalNotification) => {
            this.initializeApprovalNotificationForm(approvalNotification);
        });
    }
}
ApprovalNotificationsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationsComponent, deps: [{ token: i1.RxModalService }, { token: i2.AdaptModalService }, { token: i3.TranslateService }, { token: i4.RxGlobalCacheService }, { token: i4.RxDefinitionNameService }, { token: i5.RxApprovalNotificationsDataPageService }, { token: i6.RxApprovalNotificationsService }, { token: i4.RxNotificationService }, { token: i7.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
ApprovalNotificationsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalNotificationsComponent, selector: "rx-admin-approval-notifications", viewQueries: [{ propertyName: "recordGridComponent", first: true, predicate: ["recordGrid"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.approval.notification-configuration.title' | translate }}\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle align-self-start\"\n    rx-id=\"new-button\"\n    (click)=\"createApprovalNotification()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n\n  <rx-record-grid rx-id=\"approval-notifications-grid\" #recordGrid [config]=\"gridConfig\"></rx-record-grid>\n</rx-admin-settings>\n", components: [{ type: i8.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-approval-notifications',
                    templateUrl: './approval-notifications.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.AdaptModalService }, { type: i3.TranslateService }, { type: i4.RxGlobalCacheService }, { type: i4.RxDefinitionNameService }, { type: i5.RxApprovalNotificationsDataPageService }, { type: i6.RxApprovalNotificationsService }, { type: i4.RxNotificationService }, { type: i7.RxRecordInstanceDataPageService }]; }, propDecorators: { recordGridComponent: [{
                type: ViewChild,
                args: ['recordGrid', { static: true }]
            }] } });
//# sourceMappingURL=approval-notifications.component.js.map