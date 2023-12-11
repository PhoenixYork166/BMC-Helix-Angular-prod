import { Component } from '@angular/core';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxGlobalCacheService } from '@helix/platform/shared/api';
import { find, get, uniqBy, values } from 'lodash';
import { forkJoin } from 'rxjs';
import { RX_CONNECTION_MAPPING } from '../common/connection-mapping.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../common/connection-mapping.component";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
import * as i8 from "@ngx-translate/core";
export class WebApiMappingAdminComponent {
    constructor(rxGlobalCacheService, rxRecordInstanceDataPageService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.mappingSelectOptions = [];
    }
    ngOnInit() {
        this.busy = forkJoin([
            this.getRecordInstanceDataPage({
                recorddefinition: RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName,
                queryExpression: `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}'!="email"`,
                propertySelection: values(RX_CONNECTION_MAPPING.aliasMapping.fields).join()
            }),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).subscribe(([dataPage, bundleDescriptors]) => {
            this.mappingSelectOptions = uniqBy(dataPage.data, RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId)
                .map((mapping) => (Object.assign(Object.assign({}, mapping), { friendlyName: find(bundleDescriptors, {
                    id: mapping[RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId]
                }).friendlyName })))
                .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
        });
    }
    optionFormatter(application) {
        return application.friendlyName;
    }
    getRecordInstanceDataPage(params) {
        return this.rxRecordInstanceDataPageService.post({ params });
    }
    onApplicationChange(selectedApplication) {
        const applicationId = get(selectedApplication, `0.${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}`);
        if (applicationId) {
            forkJoin({
                configurationList: this.getRecordInstanceDataPage({
                    recorddefinition: RX_CONNECTION_MAPPING.webRequest.recordDefinitionName,
                    propertySelection: values(RX_CONNECTION_MAPPING.webRequest.fields).join()
                }),
                applicationMappingList: this.getRecordInstanceDataPage({
                    recorddefinition: RX_CONNECTION_MAPPING.aliasMapping.recordDefinitionName,
                    propertySelection: values(RX_CONNECTION_MAPPING.aliasMapping.fields).join(),
                    queryExpression: `(('${RX_CONNECTION_MAPPING.aliasMapping.fields.applicationId}'="${applicationId}" AND ` +
                        `'${RX_CONNECTION_MAPPING.aliasMapping.fields.aliasType}'="${RX_CONNECTION_MAPPING.aliasTypes.webRequest}"))`
                })
            }).subscribe((result) => {
                this.configurationList = result.configurationList.data;
                this.mappingList = result.applicationMappingList.data;
            });
        }
    }
}
WebApiMappingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiMappingAdminComponent, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Component });
WebApiMappingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiMappingAdminComponent, selector: "rx-web-api-mapping", ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.web-api-mapping.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <div class=\"row\">\n    <adapt-rx-select\n      class=\"col-md-6 form-group\"\n      rx-id=\"application\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\"\n      [ngModel]=\"selectedMapping\"\n      [options]=\"mappingSelectOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      (ngModelChange)=\"onApplicationChange($event)\"\n    ></adapt-rx-select>\n  </div>\n\n  <rx-connection-mapping\n    *ngFor=\"let mapping of mappingList\"\n    [configurations]=\"configurationList\"\n    [aliasMapping]=\"mapping\"\n    aliasType=\"webRequest\"\n  >\n  </rx-connection-mapping>\n</rx-admin-settings>\n", components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i5.ConnectionMappingComponent, selector: "rx-connection-mapping", inputs: ["configurations", "aliasMapping", "aliasType"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiMappingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-web-api-mapping',
                    templateUrl: './web-api-mapping.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=web-api-mapping.component.js.map