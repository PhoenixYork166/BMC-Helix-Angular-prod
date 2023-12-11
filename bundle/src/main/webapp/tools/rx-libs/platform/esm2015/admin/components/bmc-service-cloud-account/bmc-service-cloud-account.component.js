import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
export class BmcServiceCloudAccountAdminComponent extends BaseViewComponent {
    constructor(formBuilder, rxCurrentUserService, rxNotificationService, rxSystemConfigurationService, translateService) {
        super();
        this.formBuilder = formBuilder;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
        this.settingName = 'errorReportingServiceSaasConfiguration';
    }
    getConfiguration() {
        this.busy = this.rxSystemConfigurationService.getConfiguration(this.settingName).subscribe((data) => {
            this.bmcServiceCloudAccountConfigForm.patchValue(JSON.parse(data.value));
        });
    }
    saveConfig() {
        const formValue = this.bmcServiceCloudAccountConfigForm.getRawValue();
        this.rxSystemConfigurationService.setConfiguration(this.settingName, formValue).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.save-successful.message'));
            this.bmcServiceCloudAccountConfigForm.markAsPristine();
        });
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => { var _a; return (_a = this.bmcServiceCloudAccountConfigForm) === null || _a === void 0 ? void 0 : _a.dirty; }
        });
        if (this.isAdministrator) {
            this.bmcServiceCloudAccountConfigForm = this.formBuilder.group({
                clientId: '',
                clientSecret: '',
                dataCenterUrl: '',
                authorizationUrl: '',
                serviceCloudInstanceUrl: '',
                supportCentralUrl: ''
            });
            this.getConfiguration();
        }
    }
}
BmcServiceCloudAccountAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BmcServiceCloudAccountAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxCurrentUserService }, { token: i2.RxNotificationService }, { token: i2.RxSystemConfigurationService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
BmcServiceCloudAccountAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BmcServiceCloudAccountAdminComponent, selector: "rx-admin-bmc-service-cloud-account", usesInheritance: true, ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <form [formGroup]=\"bmcServiceCloudAccountConfigForm\">\n    <adapt-rx-textfield\n      rx-id=\"client-id\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.client-id.label' | translate }}\"\n      formControlName=\"clientId\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      rx-id=\"client-secret\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.client-secret.label' | translate }}\"\n      formControlName=\"clientSecret\"\n      required=\"true\"\n      [isPassword]=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      rx-id=\"data-center-url\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.data-center-url.label' | translate }}\"\n      formControlName=\"dataCenterUrl\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      rx-id=\"authorization-url\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.authorization-url.label' | translate }}\"\n      formControlName=\"authorizationUrl\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      rx-id=\"service-cloud-instance-url\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.service-cloud-instance-url.label' | translate\n      }}\"\n      formControlName=\"serviceCloudInstanceUrl\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      rx-id=\"support-central-url\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.support-central-url.label' | translate }}\"\n      formControlName=\"supportCentralUrl\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"save-button\"\n      btn-type=\"primary\"\n      class=\"mt-4\"\n      [disabled]=\"bmcServiceCloudAccountConfigForm.pristine || bmcServiceCloudAccountConfigForm.invalid\"\n      (click)=\"saveConfig()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </form>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BmcServiceCloudAccountAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-bmc-service-cloud-account',
                    templateUrl: 'bmc-service-cloud-account.component.html',
                    styleUrls: ['./bmc-service-cloud-account.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxCurrentUserService }, { type: i2.RxNotificationService }, { type: i2.RxSystemConfigurationService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=bmc-service-cloud-account.component.js.map