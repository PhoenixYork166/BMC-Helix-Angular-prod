import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_DATA_SOURCE_CONNECTIONS } from './data-source-connections.constant';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_CONNECTION_MAPPING } from '../connection-mapping/common/connection-mapping.constant';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxDataPageFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { cloneDeep, map, pick } from 'lodash';
import { RxDataSourceConnectionsService } from './data-source-connections.service';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { DataSourceConnectionGeneralComponent } from './data-source-connection-general.component';
import { DataSourceConnectionPropertiesComponent } from './data-source-connection-properties.component';
import { RxWizardService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./data-source-connections.service";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/view/components";
export class DataSourceConnectionsAdminComponent {
    constructor(rxModalService, rxDataPageService, rxDataSourceConnectionsService, rxNotificationService, adaptModalService, componentFactoryResolver, rxWizardService, translateService) {
        this.rxModalService = rxModalService;
        this.rxDataPageService = rxDataPageService;
        this.rxDataSourceConnectionsService = rxDataSourceConnectionsService;
        this.rxNotificationService = rxNotificationService;
        this.adaptModalService = adaptModalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxWizardService = rxWizardService;
        this.translateService = translateService;
        this.getData = (queryParams) => {
            delete queryParams.searchText;
            delete queryParams.shouldIncludeTotalSize;
            return this.resource.get({ params: queryParams });
        };
        this.resource = this.rxDataPageService.withType(RX_DATA_SOURCE_CONNECTIONS.dataPageQueryType);
    }
    ngOnInit() {
        RX_DATA_SOURCE_CONNECTIONS.resourceTypes = Object.entries(RX_DATA_SOURCE_CONNECTIONS.resourceTypes).reduce((resourceTypesWithTranslatedName, [key, resourceType]) => (Object.assign(Object.assign({}, resourceTypesWithTranslatedName), { [key]: {
                value: resourceType.value,
                name: this.translateService.instant(resourceType.name)
            } })), {});
        RX_DATA_SOURCE_CONNECTIONS.authTypes = RX_DATA_SOURCE_CONNECTIONS.authTypes.map((authType) => (Object.assign(Object.assign({}, authType), { name: this.translateService.instant(authType.name) })));
        RX_DATA_SOURCE_CONNECTIONS.initialWizardContext.resourceType = RX_DATA_SOURCE_CONNECTIONS.resourceTypes.arSystem;
        RX_DATA_SOURCE_CONNECTIONS.initialWizardContext.authType = RX_DATA_SOURCE_CONNECTIONS.authTypes[0].name;
        const gridColumns = [
            {
                index: 0,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false
            },
            {
                index: 1,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.description),
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.editDataSourceConnection(lastActionRow)
                    }
                ]
            },
            {
                index: 2,
                fieldId: String(RX_CONNECTION_MAPPING.dataSource.fields.sourceType),
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connections.source-type.title')
            }
        ];
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.description,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_CONNECTION_MAPPING.dataSource.fields.sourceType,
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
                                message: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connections.delete-confirmation.message')
                            })
                                .then((result) => {
                                if (result) {
                                    const selectedDataSourceConnections = this.dataSourceConnectionsGrid.api.getSelectedRows();
                                    const selectedDataSourceConnectionsIds = map(selectedDataSourceConnections, RX_RECORD_DEFINITION.coreFieldIds.id);
                                    this.rxDataSourceConnectionsService
                                        .deleteDataSourceConnections(selectedDataSourceConnectionsIds)
                                        .subscribe(() => {
                                        this.rxNotificationService.addSuccessMessage('Data source connection(s) deleted successfully.');
                                        this.refreshDataSourceConnectionsGrid();
                                    });
                                }
                            });
                        }
                    }
                ]
            }
        ];
        this.recordGridConfig = of({
            enableFiltering: true,
            columns: gridColumns,
            getRecordDefinition: () => of(recordDefinition),
            enableRowSelection: RowSelectionMode.Multiple,
            recordDefinitionName: RX_DATA_SOURCE_CONNECTIONS.recordDefinitionName,
            actionButtons: actionButtons,
            getData: this.getData,
            styles: 'flex-fill'
        });
    }
    getCellValue(dataItem, column) {
        return dataItem[column.field];
    }
    createDataSourceConnection() {
        this.wizardTitle = this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connections.new-data-source-connection.label');
        this.finishButtonLabel = 'Save';
        this.wizardConfigData = cloneDeep(RX_DATA_SOURCE_CONNECTIONS.initialWizardContext);
        this.openWizard();
    }
    editDataSourceConnection(dataItem) {
        this.wizardTitle = this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connections.edit-data-source-connection.label');
        this.finishButtonLabel = this.translateService.instant('com.bmc.arsys.rx.client.approval.update.button.label');
        this.selectedConnectionId = dataItem[RX_RECORD_DEFINITION.coreFieldIds.id];
        this.rxDataSourceConnectionsService.getDataSourceConnection(this.selectedConnectionId).subscribe((result) => {
            this.wizardConfigData = {
                dataSourceName: result.dataSourceName,
                resourceType: Object.values(RX_DATA_SOURCE_CONNECTIONS.resourceTypes).find((resourceType) => resourceType.value === result.resourceType),
                hostName: result.hostName,
                port: result.port,
                authType: result.authType,
                rasPassword: result.rasPassword,
                enforceAuthorization: result.enforceAuthorization,
                webApiDataSourceGuid: result.webApiDataSourceGuid,
                isEditMode: true,
                isGeneralFormPristine: true,
                providerId: result.providerId
            };
            this.openWizard();
        });
    }
    refreshDataSourceConnectionsGrid() {
        this.dataSourceConnectionsGrid.api.refresh().subscribe();
    }
    openWizard() {
        const dataSourceWizardConfig = {
            title: this.wizardTitle,
            allowFinish: true,
            finishButtonLabel: this.finishButtonLabel,
            steps: [
                {
                    id: 'general',
                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataSourceConnectionGeneralComponent)
                },
                {
                    id: 'connection-properties',
                    name: this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connections.connection-properties.label'),
                    componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataSourceConnectionPropertiesComponent)
                }
            ]
        };
        this.rxWizardService
            .open({
            context: this.wizardConfigData,
            options: dataSourceWizardConfig
        })
            .then((result) => {
            if (result) {
                this.save();
            }
        });
    }
    save() {
        let dataSourceConnection = {
            dataSourceName: this.wizardConfigData.dataSourceName,
            resourceType: this.wizardConfigData.resourceType.value,
            hostName: this.wizardConfigData.hostName,
            port: this.wizardConfigData.port,
            rasPassword: this.wizardConfigData.rasPassword || null,
            authType: this.wizardConfigData.authType,
            enforceAuthorization: this.wizardConfigData.enforceAuthorization,
            providerId: this.wizardConfigData.providerId
        };
        if (this.wizardConfigData.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.webApi.value) {
            dataSourceConnection = pick(dataSourceConnection, ['dataSourceName', 'resourceType']);
            dataSourceConnection.webApiDataSourceGuid = this.wizardConfigData.webApiDataSourceGuid;
        }
        else if (this.wizardConfigData.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.custom.value) {
            dataSourceConnection = pick(dataSourceConnection, ['dataSourceName', 'resourceType', 'providerId']);
        }
        const writeEvent = this.wizardConfigData.isEditMode
            ? this.rxDataSourceConnectionsService.updateDataSourceConnection(this.selectedConnectionId, dataSourceConnection)
            : this.rxDataSourceConnectionsService.createDataSourceConnection(dataSourceConnection);
        writeEvent.subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.data-source-connections.edit-data-source-connection-saved.message'));
            this.refreshDataSourceConnectionsGrid();
        });
    }
}
DataSourceConnectionsAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionsAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxDataPageFactoryService }, { token: i3.RxDataSourceConnectionsService }, { token: i2.RxNotificationService }, { token: i4.AdaptModalService }, { token: i0.ComponentFactoryResolver }, { token: i5.RxWizardService }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
DataSourceConnectionsAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataSourceConnectionsAdminComponent, selector: "rx-admin-data-source-connections", viewQueries: [{ propertyName: "dataSourceConnectionsGrid", first: true, predicate: ["dataSourceConnectionsGrid"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.data-source-connections.header.title' | translate }}\">\n  <ng-container>\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"tertiary\"\n      class=\"d-icon-plus_circle align-self-start\"\n      rx-id=\"new-button\"\n      (click)=\"createDataSourceConnection()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n    </button>\n\n    <rx-record-grid #dataSourceConnectionsGrid [config]=\"recordGridConfig\"></rx-record-grid>\n  </ng-container>\n</rx-admin-settings>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionsAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-data-source-connections',
                    templateUrl: './data-source-connections.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxDataPageFactoryService }, { type: i3.RxDataSourceConnectionsService }, { type: i2.RxNotificationService }, { type: i4.AdaptModalService }, { type: i0.ComponentFactoryResolver }, { type: i5.RxWizardService }, { type: i6.TranslateService }]; }, propDecorators: { dataSourceConnectionsGrid: [{
                type: ViewChild,
                args: ['dataSourceConnectionsGrid', { static: true }]
            }] } });
//# sourceMappingURL=data-source-connections.component.js.map