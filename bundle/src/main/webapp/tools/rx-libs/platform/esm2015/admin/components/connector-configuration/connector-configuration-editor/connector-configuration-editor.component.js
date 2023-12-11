import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { isUndefined } from 'lodash';
import { map, switchMap } from 'rxjs/operators';
import { RX_CONNECTOR_CONFIGURATION } from '../connector-configuration.constant';
import { RxConnectorConfigurationService } from '../connector-configuration.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "../connector-configuration.service";
import * as i6 from "@ngx-translate/core";
export class ConnectorConfigurationEditorComponent extends RxModalClass {
    constructor(dockedPanelContext, formBuilder, rxRecordInstanceService, rxNotificationService, rxConnectorConfigurationService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.formBuilder = formBuilder;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxNotificationService = rxNotificationService;
        this.rxConnectorConfigurationService = rxConnectorConfigurationService;
        this.injector = injector;
        this.connectorProfiles = [];
        this.connectorList = [];
        this.connectorConfigurations = [];
    }
    ngOnInit() {
        super.ngOnInit();
        this.isNewConfiguration = this.dockedPanelContext.getData().isNewConfiguration;
        this.connectorList = this.dockedPanelContext.getData().connectorList;
        this.connectorConfigurationForm = this.formBuilder.group({
            configurationName: '',
            connector: [
                {
                    id: '',
                    name: ''
                }
            ],
            connectorConfiguration: [
                {
                    id: '',
                    name: ''
                }
            ],
            connectorProfile: [
                {
                    id: '',
                    name: ''
                }
            ]
        });
        if (!this.isNewConfiguration) {
            this.currentRecordInstance = this.rxRecordInstanceService.get(RX_CONNECTOR_CONFIGURATION.recordDefinitionName, this.dockedPanelContext.getData().recordId);
            this.currentRecordInstance.subscribe((recordInstance) => {
                this.connectorConfigurationForm
                    .get('configurationName')
                    .setValue(recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.targetName].value);
                this.connectorConfigurationForm.get('connector').setValue([
                    {
                        id: recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorId].value,
                        name: recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorName].value
                    }
                ]);
                this.connectorConfigurationForm.get('connectorConfiguration').setValue([
                    {
                        id: recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorConfigId].value,
                        name: recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorConfigName].value
                    }
                ]);
                this.connectorConfigurationForm.get('connectorProfile').setValue(recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileId].value
                    ? [
                        {
                            id: recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileId].value,
                            name: recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileName].value
                        }
                    ]
                    : []);
                this.loadConnectorConfigurations(recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorId].value);
                this.loadConnectorProfiles(recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorConfigId].value);
            });
        }
    }
    isDirty() {
        return this.connectorConfigurationForm.dirty;
    }
    loadConnectorConfigurations(event) {
        if (this.isSelectionChangeEvent(event)) {
            this.resetFields();
        }
        this.loadingConfigs = true;
        const selectedConnectorId = this.isSelectionChangeEvent(event) ? event.options[0].id : event;
        this.rxConnectorConfigurationService
            .getConnectorConfigurations(selectedConnectorId)
            .subscribe((configurations) => {
            this.connectorConfigurations = configurations;
            this.loadingConfigs = false;
        });
    }
    loadConnectorProfiles(event) {
        if (this.isSelectionChangeEvent(event)) {
            this.connectorConfigurationForm.get('connectorProfile').setValue([]);
        }
        this.loadingProfiles = true;
        const selectedConfigId = this.isSelectionChangeEvent(event) ? event.options[0].id : event;
        const selectedConnectorId = this.connectorConfigurationForm.get('connector').value[0].id;
        this.rxConnectorConfigurationService
            .getConnectorProfiles(selectedConnectorId, selectedConfigId)
            .subscribe((profiles) => {
            this.connectorProfiles = profiles;
            this.loadingProfiles = false;
        });
    }
    saveConnectorConfiguration() {
        if (this.isNewConfiguration) {
            this.currentRecordInstance = this.rxRecordInstanceService.getNew(RX_CONNECTOR_CONFIGURATION.recordDefinitionName);
        }
        this.currentRecordInstance
            .pipe(map((recordInstance) => {
            recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorId].value =
                this.connectorConfigurationForm.value.connector[0].id;
            recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorName].value =
                this.connectorConfigurationForm.value.connector[0].name;
            recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorConfigId].value =
                this.connectorConfigurationForm.value.connectorConfiguration[0].id;
            recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorConfigName].value =
                this.connectorConfigurationForm.value.connectorConfiguration[0].name;
            if (this.connectorConfigurationForm.value.connectorProfile.length) {
                recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileId].value =
                    this.connectorConfigurationForm.value.connectorProfile[0].id;
                recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileName].value =
                    this.connectorConfigurationForm.value.connectorProfile[0].name;
            }
            else {
                recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileId].value = null;
                recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.connectorProfileName].value = null;
            }
            recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.description].value =
                this.connectorConfigurationForm.value.configurationName;
            recordInstance.fieldInstances[RX_CONNECTOR_CONFIGURATION.fields.targetName].value =
                this.connectorConfigurationForm.value.configurationName;
            return recordInstance;
        }), switchMap((recordInstance) => {
            if (this.isNewConfiguration) {
                return this.rxRecordInstanceService.create(recordInstance);
            }
            else {
                return this.rxRecordInstanceService.save(recordInstance);
            }
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage('Configuration saved successfully.');
            this.dockedPanelContext.close(null);
        });
    }
    optionFormatter(option) {
        return option.name;
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    isSelectionChangeEvent(event) {
        return !isUndefined(event.options);
    }
    resetFields() {
        this.connectorProfiles = [];
        this.connectorConfigurations = [];
        this.connectorConfigurationForm.get('connectorConfiguration').setValue([]);
        this.connectorConfigurationForm.get('connectorProfile').setValue([]);
        this.connectorConfigurationForm.markAsPristine();
    }
}
ConnectorConfigurationEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationEditorComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.FormBuilder }, { token: i3.RxRecordInstanceService }, { token: i4.RxNotificationService }, { token: i5.RxConnectorConfigurationService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ConnectorConfigurationEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConnectorConfigurationEditorComponent, selector: "rx-connector-configuration-editor", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form [formGroup]=\"connectorConfigurationForm\">\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"configuration-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n      formControlName=\"configurationName\"\n      required=\"true\"\n      [readonly]=\"!isNewConfiguration\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.connector-configuration.connector-type.label' | translate }}\"\n      rx-id=\"connector\"\n      formControlName=\"connector\"\n      [options]=\"connectorList\"\n      enableFilter=\"true\"\n      [optionFormatter]=\"optionFormatter\"\n      (onSelectionChange)=\"loadConnectorConfigurations($event)\"\n      [loadingState]=\"loadingConnectors\"\n      required=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.connector-configuration.configuration.label' | translate }}\"\n      rx-id=\"connector-configuration\"\n      formControlName=\"connectorConfiguration\"\n      [options]=\"connectorConfigurations\"\n      [optionFormatter]=\"optionFormatter\"\n      enableFilter=\"true\"\n      (onSelectionChange)=\"loadConnectorProfiles($event)\"\n      [loadingState]=\"loadingConfigs\"\n      required=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.connector-configuration.profile.label' | translate }}\"\n      rx-id=\"connector-profile\"\n      formControlName=\"connectorProfile\"\n      [options]=\"connectorProfiles\"\n      [optionFormatter]=\"optionFormatter\"\n      [loadingState]=\"loadingProfiles\"\n    >\n    </adapt-rx-select>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    size=\"small\"\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [disabled]=\"connectorConfigurationForm.pristine || connectorConfigurationForm.invalid\"\n    (click)=\"saveConnectorConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" size=\"small\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-connector-configuration-editor',
                    templateUrl: './connector-configuration-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.FormBuilder }, { type: i3.RxRecordInstanceService }, { type: i4.RxNotificationService }, { type: i5.RxConnectorConfigurationService }, { type: i0.Injector }]; } });
//# sourceMappingURL=connector-configuration-editor.component.js.map