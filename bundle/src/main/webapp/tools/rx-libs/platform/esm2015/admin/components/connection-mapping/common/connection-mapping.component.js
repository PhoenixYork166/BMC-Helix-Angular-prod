import { Component, Input } from '@angular/core';
import { RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { get } from 'lodash';
import { RX_CONNECTION_MAPPING } from './connection-mapping.constant';
import { AliasType } from './connection-mapping.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
export class ConnectionMappingComponent {
    constructor(rxNotificationService, rxRecordInstanceService, rxRecordInstanceUpdateService, translateService) {
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.translateService = translateService;
        this.aliasNameId = RX_CONNECTION_MAPPING.aliasMapping.fields.aliasName;
        this.optionFormatter = this.optionFormatter.bind(this);
    }
    ngOnInit() {
        if (this.aliasMapping[RX_CONNECTION_MAPPING.aliasMapping.fields.aliasValue]) {
            const connectionConfiguration = this.configurations.find((config) => config[RX_CONNECTION_MAPPING.dataSource.fields.id] ===
                this.aliasMapping[RX_CONNECTION_MAPPING.aliasMapping.fields.aliasValue]);
            this.connectionConfiguration = [connectionConfiguration];
        }
    }
    optionFormatter(configurationOption) {
        const fieldName = this.aliasType === AliasType.Connector
            ? RX_CONNECTION_MAPPING.connector.fields.target_name
            : RX_CONNECTION_MAPPING.dataSource.fields.name;
        return get(configurationOption, fieldName, 'Select configuration');
    }
    onConnectionConfigurationChange(configuration) {
        this.rxRecordInstanceService
            .get(RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName, this.aliasMapping[RX_CONNECTION_MAPPING.aliasMapping.fields.id])
            .subscribe((recordInstance) => {
            recordInstance.setFieldValue(RX_CONNECTION_MAPPING.aliasMapping.fields.aliasValue, configuration[0][RX_CONNECTION_MAPPING.dataSource.fields.id]);
            this.rxRecordInstanceUpdateService.execute(recordInstance).subscribe(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.connection-mapping.mapping-saved.message'));
            });
        });
    }
}
ConnectionMappingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectionMappingComponent, deps: [{ token: i1.RxNotificationService }, { token: i2.RxRecordInstanceService }, { token: i2.RxRecordInstanceUpdateService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ConnectionMappingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConnectionMappingComponent, selector: "rx-connection-mapping", inputs: { configurations: "configurations", aliasMapping: "aliasMapping", aliasType: "aliasType" }, ngImport: i0, template: "<div class=\"row\">\n  <adapt-rx-textfield\n    class=\"col-md-6 form-group\"\n    rx-id=\"connection-target\"\n    label=\"{{ 'com.bmc.arsys.rx.client.admin.connection-mapping.connection-target.label' | translate }}\"\n    disabled=\"true\"\n    [(ngModel)]=\"aliasMapping[this.aliasNameId]\"\n  ></adapt-rx-textfield>\n\n  <adapt-rx-select\n    class=\"d-block col-md-6 form-group\"\n    rx-id=\"connection-configuration\"\n    label=\"{{ 'com.bmc.arsys.rx.client.admin.connection-mapping.connection-configuration.label' | translate }}\"\n    [ngModel]=\"connectionConfiguration\"\n    [options]=\"configurations\"\n    [optionFormatter]=\"optionFormatter\"\n    (ngModelChange)=\"onConnectionConfigurationChange($event)\"\n  ></adapt-rx-select>\n</div>\n", components: [{ type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectionMappingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-connection-mapping',
                    templateUrl: './connection-mapping.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.RxRecordInstanceService }, { type: i2.RxRecordInstanceUpdateService }, { type: i3.TranslateService }]; }, propDecorators: { configurations: [{
                type: Input
            }], aliasMapping: [{
                type: Input
            }], aliasType: [{
                type: Input
            }] } });
//# sourceMappingURL=connection-mapping.component.js.map