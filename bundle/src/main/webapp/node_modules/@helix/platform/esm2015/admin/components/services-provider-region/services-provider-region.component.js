import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { find, get } from 'lodash';
import { RX_SERVICES_PROVIDER_REGION } from './services-provider-region.constant';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
export class ServicesProviderRegionAdminComponent {
    constructor(translateService, rxSystemConfigurationService, rxNotificationService) {
        this.translateService = translateService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxNotificationService = rxNotificationService;
        this.isSaveInProgress = false;
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.regionOptions = RX_SERVICES_PROVIDER_REGION.regionOptions.map((region) => (Object.assign(Object.assign({}, region), { name: this.translateService.instant(region.name) })));
        this.optionFormatter = (regionNameOption) => {
            return get(regionNameOption, 'name', this.defaultSelection);
        };
    }
    ngOnInit() {
        this.servicesProviderRegionForm = new FormGroup({
            region: new FormControl('')
        });
        this.rxSystemConfigurationService
            .getConfiguration(RX_SERVICES_PROVIDER_REGION.connections.cognitiveAdminCredential)
            .subscribe((result) => {
            const cognitiveAdminCredential = JSON.parse(result.value);
            this.servicesProviderRegionForm.get('region').setValue([
                find(this.regionOptions, {
                    id: cognitiveAdminCredential[RX_SERVICES_PROVIDER_REGION.providers.watson].cognitiveAdminRegionName
                })
            ]);
        });
    }
    save() {
        this.isSaveInProgress = true;
        const payload = {
            [RX_SERVICES_PROVIDER_REGION.providers.watson]: {
                cognitiveAdminRegionName: this.servicesProviderRegionForm.get('region').value[0].id
            }
        };
        this.rxSystemConfigurationService
            .setConfiguration(RX_SERVICES_PROVIDER_REGION.connections.cognitiveAdminCredential, payload)
            .subscribe((response) => {
            this.isSaveInProgress = false;
            this.servicesProviderRegionForm.markAsPristine();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.services-provider-region.saved.message'));
        }, (error) => {
            this.isSaveInProgress = false;
        });
    }
    canSave() {
        return !this.isSaveInProgress && this.servicesProviderRegionForm.valid && this.servicesProviderRegionForm.dirty;
    }
}
ServicesProviderRegionAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServicesProviderRegionAdminComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxSystemConfigurationService }, { token: i2.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
ServicesProviderRegionAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ServicesProviderRegionAdminComponent, selector: "rx-admin-services-provider-region", ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.services-provider-region.header.title' | translate }}\">\n  <form [formGroup]=\"servicesProviderRegionForm\">\n    <adapt-rx-select\n      [options]=\"regionOptions\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.services-provider-region.region.label' | translate }}\"\n      name=\"region\"\n      [optionFormatter]=\"optionFormatter\"\n      formControlName=\"region\"\n      rx-id=\"region\"\n      class=\"form-group d-block\"\n      required\n    ></adapt-rx-select>\n\n    <button adapt-button btn-type=\"primary\" type=\"button\" rx-id=\"save-button\" (click)=\"save()\" [disabled]=\"!canSave()\">\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </form>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-select{max-width:400px}\n"], components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServicesProviderRegionAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-services-provider-region',
                    templateUrl: './services-provider-region.component.html',
                    styleUrls: ['./services-provider-region.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxSystemConfigurationService }, { type: i2.RxNotificationService }]; } });
//# sourceMappingURL=services-provider-region.component.js.map