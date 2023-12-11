import { Component } from '@angular/core';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { get, uniqBy, values } from 'lodash';
import { forkJoin } from 'rxjs';
import { RX_CONNECTION_MAPPING } from '../common/connection-mapping.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "../common/connection-mapping.component";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
export class DataSourceMappingAdminComponent {
    constructor(rxRecordInstanceDataPageService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.applicationSelectOptions = [];
    }
    ngOnInit() {
        this.busy = this.getRecordInstanceDataPage({
            recorddefinition: RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName,
            queryExpression: `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}'!="email"`,
            propertySelection: values(RX_CONNECTION_MAPPING.aliasMapping.fields).join()
        }).subscribe((response) => {
            this.applicationSelectOptions = uniqBy(response.data, RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId);
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
                    recorddefinition: RX_CONNECTION_MAPPING.dataSource.recordDefinitionName,
                    propertySelection: values(RX_CONNECTION_MAPPING.dataSource.fields).join()
                }),
                applicationMappingList: this.getRecordInstanceDataPage({
                    recorddefinition: RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName,
                    propertySelection: values(RX_CONNECTION_MAPPING.aliasMapping.fields).join(),
                    queryExpression: `(('${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}'="${applicationId}" AND ` +
                        `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}'="${RX_CONNECTION_MAPPING.aliasTypes.dataSource}"))`
                })
            }).subscribe((result) => {
                this.configurationList = result.configurationList.data;
                this.applicationMappingList = result.applicationMappingList.data;
            });
        }
    }
}
DataSourceMappingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceMappingAdminComponent, deps: [{ token: i1.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
DataSourceMappingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataSourceMappingAdminComponent, selector: "rx-admin-data-source-mapping", ngImport: i0, template: "<rx-admin-settings header=\"Data source mapping\" [busy]=\"busy\">\n  <div class=\"row\">\n    <adapt-rx-select\n      class=\"col-md-6 form-group\"\n      rx-id=\"data-source-application\"\n      label=\"Application\"\n      [ngModel]=\"selectedApplication\"\n      [options]=\"applicationSelectOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      (ngModelChange)=\"onApplicationChange($event)\"\n    ></adapt-rx-select>\n  </div>\n\n  <rx-connection-mapping\n    *ngFor=\"let applicationMapping of applicationMappingList\"\n    [configurations]=\"configurationList\"\n    [aliasMapping]=\"applicationMapping\"\n    aliasType=\"dataSource\"\n  >\n  </rx-connection-mapping>\n</rx-admin-settings>\n", components: [{ type: i2.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.ConnectionMappingComponent, selector: "rx-connection-mapping", inputs: ["configurations", "aliasMapping", "aliasType"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceMappingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-data-source-mapping',
                    templateUrl: './data-source-mapping.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=data-source-mapping.component.js.map