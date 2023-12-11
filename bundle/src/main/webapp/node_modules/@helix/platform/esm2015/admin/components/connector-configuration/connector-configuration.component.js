import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { get, noop } from 'lodash';
import { of } from 'rxjs';
import { ConnectorConfigurationEditorComponent } from './connector-configuration-editor/connector-configuration-editor.component';
import { RX_CONNECTOR_CONFIGURATION } from './connector-configuration.constant';
import { RxConnectorConfigurationService } from './connector-configuration.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "./connector-configuration.service";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/common";
import * as i8 from "@ngx-translate/core";
export class ConnectorConfigurationAdminComponent {
    constructor(formBuilder, rxModalService, rxConnectorConfigurationService) {
        this.formBuilder = formBuilder;
        this.rxModalService = rxModalService;
        this.rxConnectorConfigurationService = rxConnectorConfigurationService;
        this.connectorList = [];
    }
    ngOnInit() {
        this.busySubscription = this.rxConnectorConfigurationService.getConnectors().subscribe((connectors) => {
            this.connectorList = connectors;
        }, (response) => {
            this.errorText = get(response, 'error[0].appendedText', 'Unknown error.');
        });
        this.gridConfig = of({
            actionButtons: [
                {
                    label: 'Edit',
                    style: 'tertiary',
                    icon: 'pencil',
                    actions: [
                        {
                            name: () => {
                                this.openConnectionConfiguration(this.grid.api.getFirstSelectedRow());
                            }
                        }
                    ]
                }
            ],
            recordDefinitionName: RX_CONNECTOR_CONFIGURATION.recordDefinitionName,
            enableRowSelection: RowSelectionMode.Single,
            getRecordDefinition: () => of(this.getRecordDefinition()),
            columns: this.getColumns(),
            styles: 'flex-fill'
        });
    }
    newConnectionConfiguration() {
        this.openConnectorConfigurationEditor(true);
    }
    openConnectionConfiguration(selectedRecord) {
        this.openConnectorConfigurationEditor(false, selectedRecord[RX_RECORD_DEFINITION.coreFieldIds.id]);
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_CONNECTOR_CONFIGURATION.fields.targetName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_CONNECTOR_CONFIGURATION.fields.connectorName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_CONNECTOR_CONFIGURATION.fields.connectorConfigName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_CONNECTOR_CONFIGURATION.fields.connectorProfileName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
    getColumns() {
        return [
            {
                index: 0,
                title: 'Name',
                fieldId: String(RX_CONNECTOR_CONFIGURATION.fields.targetName),
                clickable: true,
                actions: [
                    {
                        name: (previousAction, selectedRow) => this.openConnectionConfiguration(selectedRow)
                    }
                ]
            },
            {
                index: 1,
                title: 'Connector type',
                fieldId: String(RX_CONNECTOR_CONFIGURATION.fields.connectorName)
            },
            {
                index: 2,
                title: 'Configuration',
                fieldId: String(RX_CONNECTOR_CONFIGURATION.fields.connectorConfigName)
            },
            {
                index: 3,
                title: 'Profile',
                fieldId: String(RX_CONNECTOR_CONFIGURATION.fields.connectorProfileName)
            },
            {
                index: 4,
                title: 'ID',
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                visible: false
            }
        ];
    }
    openConnectorConfigurationEditor(isNewConfiguration, recordId) {
        return this.rxModalService
            .openDockedPanel({
            title: 'Connector configuration',
            content: ConnectorConfigurationEditorComponent,
            data: {
                connectorList: this.connectorList,
                isNewConfiguration,
                recordId
            }
        })
            .then(() => {
            this.grid.api.refresh().subscribe();
        })
            .catch(noop);
    }
}
ConnectorConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxModalService }, { token: i3.RxConnectorConfigurationService }], target: i0.ɵɵFactoryTarget.Component });
ConnectorConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConnectorConfigurationAdminComponent, selector: "rx-admin-connector-configuration", viewQueries: [{ propertyName: "grid", first: true, predicate: ["grid"], descendants: true }, { propertyName: "connectorConfigurationTemplate", first: true, predicate: ["connectorConfigurationTemplate"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.connector-configuration.header.title' | translate }}\"\n  [busy]=\"busySubscription\"\n>\n  <adapt-alert\n    [config]=\"{\n      title:\n        'com.bmc.arsys.rx.client.admin.connection-configuration.invalid-integration-service-configuration.message'\n        | translate,\n      content: errorText,\n      variant: 'danger',\n      dismissible: false\n    }\"\n    *ngIf=\"errorText\"\n  >\n  </adapt-alert>\n\n  <ng-container *ngIf=\"!errorText\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"tertiary\"\n      class=\"d-icon-plus_circle align-self-start\"\n      rx-id=\"new-button\"\n      (click)=\"newConnectionConfiguration()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n    </button>\n\n    <rx-record-grid #grid [config]=\"gridConfig\"></rx-record-grid>\n  </ng-container>\n</rx-admin-settings>\n", components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-connector-configuration',
                    templateUrl: './connector-configuration.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxModalService }, { type: i3.RxConnectorConfigurationService }]; }, propDecorators: { grid: [{
                type: ViewChild,
                args: ['grid']
            }], connectorConfigurationTemplate: [{
                type: ViewChild,
                args: ['connectorConfigurationTemplate', { static: true }]
            }] } });
//# sourceMappingURL=connector-configuration.component.js.map