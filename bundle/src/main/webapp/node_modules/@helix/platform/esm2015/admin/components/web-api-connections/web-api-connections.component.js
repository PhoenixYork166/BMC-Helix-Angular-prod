import { Component, ComponentFactoryResolver, TemplateRef, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxWizardService } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent } from '@helix/platform/view/components';
import { cloneDeep, find, isObject } from 'lodash';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationWizardStepComponent } from './authentication-wizard-step/authentication-wizard-step.component';
import { GeneralWizardStepComponent } from './general-wizard-step/general-wizard-step.component';
import { RX_WEB_API_CONNECTIONS } from './web-api-connections.constant';
import { RxWebAPIConnectionsService } from './web-api-connections.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./web-api-connections.service";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/view/components";
export class WebApiConnectionsAdminComponent {
    constructor(rxModalService, rxCurrentUserService, rxWebAPIConnectionsService, rxNotificationService, rxRecordInstanceService, componentFactoryResolver, rxWizardService, translateService) {
        this.rxModalService = rxModalService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxWebAPIConnectionsService = rxWebAPIConnectionsService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.recordDefinition = {
            fieldDefinitions: [
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.description,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_WEB_API_CONNECTIONS.fieldIds.hostname,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_WEB_API_CONNECTIONS.fieldIds.port,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.integer
                },
                {
                    id: RX_WEB_API_CONNECTIONS.fieldIds.authentication,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.gridConfig$ = new Observable((observer) => {
            observer.next({
                recordDefinitionName: RX_WEB_API_CONNECTIONS.recordDefinitionName,
                columns: this.getWebApiConnectionColumns(),
                actionButtons: this.getActionButtons(),
                getRecordDefinition: () => of(this.recordDefinition),
                styles: 'flex-fill'
            });
            observer.complete();
        });
    }
    save() {
        const saveConnection$ = this.isNewConfiguration
            ? this.rxWebAPIConnectionsService.create(this.webApiConnectionWizardContext.webApiConnection)
            : this.rxWebAPIConnectionsService.save(this.webApiConnectionWizardContext.webApiConnection, this.currentRecordInstanceId);
        saveConnection$
            .pipe(catchError((error) => {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.web-api-connections.failed-to-save.message'));
            return throwError(error);
        }))
            .subscribe((response) => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.web-api-connections.connection-saved.message'));
            this.webApiConnectionsRecordGrid.api.refresh().subscribe();
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
                            {
                                this.rxModalService
                                    .confirm({
                                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                    modalStyle: RX_MODAL.modalStyles.warning,
                                    message: this.translateService.instant('com.bmc.arsys.rx.client.admin.web-api-connections.delete-confirmation.message')
                                })
                                    .then((result) => {
                                    if (result)
                                        this.rxWebAPIConnectionsService
                                            .deleteRecords(this.webApiConnectionsRecordGrid.api)
                                            .subscribe((response) => {
                                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.web-api-connections.deleted.message'));
                                            this.webApiConnectionsRecordGrid.api.refresh().subscribe();
                                        });
                                });
                            }
                        }
                    }
                ]
            }
        ];
    }
    getWebApiConnectionColumns() {
        return [
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.description}`,
                index: 0,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.editWebApiConnection(lastActionRow)
                    }
                ]
            },
            {
                fieldId: `${RX_WEB_API_CONNECTIONS.fieldIds.hostname}`,
                index: 1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connection-properties.host-name.label')
            },
            {
                fieldId: `${RX_WEB_API_CONNECTIONS.fieldIds.port}`,
                index: 2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connection-properties.port.label'),
                cellTemplate: this.portCellTemplate
            },
            {
                fieldId: `${RX_WEB_API_CONNECTIONS.fieldIds.authentication}`,
                index: 3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connection-properties.authentication.label'),
                visible: false
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.id}`,
                index: 4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false
            }
        ];
    }
    resetFields() {
        this.webApiConnectionWizardContext = cloneDeep(RX_WEB_API_CONNECTIONS.wizardContext);
        this.webApiConnectionWizardContext.webApiConnection.authTypeCode = [RX_WEB_API_CONNECTIONS.authTypeOptions[0]];
        this.webApiConnectionWizardContext.webApiConnection.secure = [RX_WEB_API_CONNECTIONS.protocolTypeOptions[0]];
        this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.grantType = [
            RX_WEB_API_CONNECTIONS.grantTypeOptions[0]
        ];
    }
    openWizard(wizardTitle, isEdit) {
        const wizardOptions = {
            title: wizardTitle,
            allowFinish: true,
            finishButtonLabel: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
            steps: [
                {
                    id: 'general',
                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(GeneralWizardStepComponent)
                },
                {
                    id: 'authentication',
                    name: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connection-properties.authentication.label'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(AuthenticationWizardStepComponent)
                }
            ]
        };
        this.rxWizardService
            .open({
            context: this.webApiConnectionWizardContext,
            options: wizardOptions
        })
            .then((result) => {
            if (isObject(result)) {
                this.save();
            }
        });
    }
    createWebApiConnection() {
        this.resetFields();
        this.isNewConfiguration = true;
        this.openWizard(this.translateService.instant('com.bmc.arsys.rx.client.admin.web-api-connections.new-web-api-connection.label'), false);
    }
    editWebApiConnection(selectedRecord) {
        this.resetFields();
        this.isNewConfiguration = false;
        this.currentRecordInstanceId = selectedRecord[RX_RECORD_DEFINITION.coreFieldIds.id];
        const currentRecordInstance = this.rxRecordInstanceService.get(RX_WEB_API_CONNECTIONS.recordDefinitionName, selectedRecord[RX_RECORD_DEFINITION.coreFieldIds.id]);
        currentRecordInstance.subscribe((recordInstance) => {
            const authTypeId = recordInstance.fieldInstances[RX_WEB_API_CONNECTIONS.fieldIds.authType].value;
            const authTypeOption = find(RX_WEB_API_CONNECTIONS.authTypeOptions, { id: authTypeId });
            const credentials = JSON.parse(recordInstance.fieldInstances[RX_WEB_API_CONNECTIONS.fieldIds.authentication].value);
            const protocolId = recordInstance.fieldInstances[RX_WEB_API_CONNECTIONS.fieldIds.protocol].value;
            const protocolOption = find(RX_WEB_API_CONNECTIONS.protocolTypeOptions, { id: protocolId });
            this.webApiConnectionWizardContext.webApiConnection.name =
                recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.description].value;
            this.webApiConnectionWizardContext.webApiConnection.hostname =
                recordInstance.fieldInstances[RX_WEB_API_CONNECTIONS.fieldIds.hostname].value;
            this.webApiConnectionWizardContext.webApiConnection.port =
                recordInstance.fieldInstances[RX_WEB_API_CONNECTIONS.fieldIds.port].value;
            this.webApiConnectionWizardContext.webApiConnection.secure = [protocolOption];
            this.webApiConnectionWizardContext.webApiConnection.authTypeCode = [authTypeOption];
            this.webApiConnectionWizardContext.wizardSteps[1].fields = find(RX_WEB_API_CONNECTIONS.authTypeFields, {
                id: authTypeId
            }).fields;
            this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.httpHeaders = credentials['httpHeaders'];
            if (authTypeId === RX_WEB_API_CONNECTIONS.authTypes.oAuth2) {
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.authServerEndpoint =
                    credentials['authServerEndpoint'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.redirectUri = credentials['redirectUri'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.scope = credentials['scope'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.tokenPath = credentials['tokenPath'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.tokenFetchMechanism =
                    credentials['tokenFetchMechanism'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.additionalFormParams =
                    credentials['additionalFormParams'];
            }
            if (authTypeId === RX_WEB_API_CONNECTIONS.authTypes.rsso ||
                authTypeId === RX_WEB_API_CONNECTIONS.authTypes.oAuthTokenExchange) {
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.loginName = credentials['loginName'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.tokenPath = credentials['tokenPath'];
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.authServerEndpoint =
                    credentials['authServerEndpoint'];
            }
            if (authTypeId === RX_WEB_API_CONNECTIONS.authTypes.oAuthTokenExchange) {
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.resources = credentials['resources'];
            }
            if (authTypeId === RX_WEB_API_CONNECTIONS.authTypes.custom) {
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.queryParams = credentials['queryParams'];
            }
            else {
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.credentials =
                    RX_WEB_API_CONNECTIONS.passwordMask;
                this.webApiConnectionWizardContext.webApiConnection.authTypeDetails.username = credentials['username'];
            }
            this.webApiConnectionWizardContext.isEditMode = true;
            this.openWizard(this.translateService.instant('com.bmc.arsys.rx.client.admin.web-api-connections.edit-web-api-connection.label'), true);
        });
    }
}
WebApiConnectionsAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionsAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxCurrentUserService }, { token: i3.RxWebAPIConnectionsService }, { token: i2.RxNotificationService }, { token: i4.RxRecordInstanceService }, { token: i0.ComponentFactoryResolver }, { token: i5.RxWizardService }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
WebApiConnectionsAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiConnectionsAdminComponent, selector: "rx-admin-web-api-connections", viewQueries: [{ propertyName: "webApiConnectionsRecordGrid", first: true, predicate: ["webApiConnectionsRecordGrid"], descendants: true }, { propertyName: "portCellTemplate", first: true, predicate: ["portCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.web-api-connections.header.title' | translate }}\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle align-self-start\"\n    rx-id=\"new-button\"\n    (click)=\"createWebApiConnection()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n  </button>\n  <rx-record-grid rx-id=\"web-api-grid\" #webApiConnectionsRecordGrid [config]=\"gridConfig$\"> </rx-record-grid>\n\n  <ng-template #portCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n    {{ dataItem[column.field] }}\n  </ng-template>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionsAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-web-api-connections',
                    templateUrl: './web-api-connections.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxCurrentUserService }, { type: i3.RxWebAPIConnectionsService }, { type: i2.RxNotificationService }, { type: i4.RxRecordInstanceService }, { type: i0.ComponentFactoryResolver }, { type: i5.RxWizardService }, { type: i6.TranslateService }]; }, propDecorators: { webApiConnectionsRecordGrid: [{
                type: ViewChild,
                args: ['webApiConnectionsRecordGrid', { static: false }]
            }], portCellTemplate: [{
                type: ViewChild,
                args: ['portCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=web-api-connections.component.js.map