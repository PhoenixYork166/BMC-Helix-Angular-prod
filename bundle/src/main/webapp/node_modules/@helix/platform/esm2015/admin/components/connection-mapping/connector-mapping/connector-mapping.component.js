import { Component } from '@angular/core';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { get, uniqBy, values } from 'lodash';
import { forkJoin } from 'rxjs';
import { RX_CONNECTION_MAPPING } from '../common/connection-mapping.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../common/connection-mapping.component";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class ConnectorMappingAdminComponent {
    constructor(rxRecordInstanceDataPageService, translateService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.translateService = translateService;
        this.mappingSelectOptions = [];
    }
    ngOnInit() {
        this.busy = this.getRecordInstanceDataPage({
            recorddefinition: RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName,
            queryExpression: `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}'!="email"`,
            propertySelection: values(RX_CONNECTION_MAPPING.aliasMapping.fields).join()
        }).subscribe((response) => {
            this.mappingSelectOptions = uniqBy(response.data, RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId);
        });
    }
    optionFormatter(application) {
        return application[RX_CONNECTION_MAPPING.aliasMapping.fields.applicationName];
    }
    getRecordInstanceDataPage(params) {
        return this.rxRecordInstanceDataPageService.post({ params });
    }
    onApplicationChange(selectedApplication) {
        const applicationId = get(selectedApplication, `0.${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}`);
        if (applicationId) {
            forkJoin({
                configurationList: this.getRecordInstanceDataPage({
                    recorddefinition: RX_CONNECTION_MAPPING.connector.recordDefinitionName,
                    propertySelection: values(RX_CONNECTION_MAPPING.connector.fields).join()
                }),
                applicationMappingList: this.getRecordInstanceDataPage({
                    recorddefinition: RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName,
                    propertySelection: values(RX_CONNECTION_MAPPING.aliasMapping.fields).join(),
                    queryExpression: `(('${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}'="${applicationId}" AND ` +
                        `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}'="${RX_CONNECTION_MAPPING.aliasTypes.connector}"))`
                })
            }).subscribe((result) => {
                this.configurationList = result.configurationList.data;
                this.mappingList = result.applicationMappingList.data;
            });
        }
    }
}
ConnectorMappingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorMappingAdminComponent, deps: [{ token: i1.RxRecordInstanceDataPageService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ConnectorMappingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConnectorMappingAdminComponent, selector: "rx-connector-mapping", ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.connection-mapping.connector-mapping.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <div class=\"row\">\n    <adapt-rx-select\n      class=\"col-md-6 form-group\"\n      rx-id=\"application\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.connection-mapping.connector-mapping.application.label' | translate }}\"\n      [ngModel]=\"selectedMapping\"\n      [options]=\"mappingSelectOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      (ngModelChange)=\"onApplicationChange($event)\"\n    ></adapt-rx-select>\n  </div>\n\n  <rx-connection-mapping\n    *ngFor=\"let mapping of mappingList\"\n    [configurations]=\"configurationList\"\n    [aliasMapping]=\"mapping\"\n    aliasType=\"connector\"\n  >\n  </rx-connection-mapping>\n</rx-admin-settings>\n", components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i5.ConnectionMappingComponent, selector: "rx-connection-mapping", inputs: ["configurations", "aliasMapping", "aliasType"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorMappingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-connector-mapping',
                    templateUrl: './connector-mapping.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=connector-mapping.component.js.map