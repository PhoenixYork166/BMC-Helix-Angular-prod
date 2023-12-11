import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxIssueReportingConfigurationService } from './issue-reporting-configuration.service';
import { forkJoin } from 'rxjs';
import { RX_ISSUE_REPORTING_CONFIGURATION } from './issue-reporting-configuration.constant';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./issue-reporting-configuration.service";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@angular/common";
export class IssueReportingConfigurationAdminComponent extends BaseViewComponent {
    constructor(formBuilder, rxCurrentUserService, rxIssueReportingConfigurationService, rxNotificationService, rxRecordInstanceService, rxRecordInstanceUpdateService, translateService) {
        super();
        this.formBuilder = formBuilder;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxIssueReportingConfigurationService = rxIssueReportingConfigurationService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.translateService = translateService;
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
        this.oauthUrl = '';
    }
    saveConfig() {
        const formValue = this.issueReportingConfigurationForm.getRawValue();
        this.rxIssueReportingConfigurationService.setSupportId(formValue.supportId).subscribe();
        if (this.configId) {
            this.rxRecordInstanceService
                .get(RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.recordDefinitionName, this.configId)
                .subscribe((recordInstance) => {
                recordInstance.setFieldValue(RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.supportEmail, formValue.supportEmail);
                this.rxRecordInstanceUpdateService.execute(recordInstance).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.issue-reporting-configuration.issue-reporting-configuration-updated.message'));
                    this.issueReportingConfigurationForm.markAsPristine();
                });
            });
        }
        else {
            this.rxRecordInstanceService
                .getNew(RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.recordDefinitionName)
                .subscribe((recordInstance) => {
                recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, this.translateService.instant(RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.defaultDescription));
                recordInstance.setFieldValue(RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.supportEmail, formValue.supportEmail);
                recordInstance.setFieldValue(RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.loginName, this.rxCurrentUserService.getName());
                this.rxRecordInstanceService.create(recordInstance).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.issue-reporting-configuration.issue-reporting-configuration-saved.message'));
                    this.issueReportingConfigurationForm.markAsPristine();
                });
            });
        }
    }
    getOauthData() {
        this.busy = this.rxIssueReportingConfigurationService.getOauthConfig().subscribe((data) => {
            this.oauthUrl = data.authorizeURL;
            this.isAccountLinked = data.configured;
        });
    }
    openWindow() {
        const title = 'BMC Cloud Service';
        const openedWindow = window.open(this.oauthUrl, title, 'scrollbars=1,height=600,width=670');
        this.assertWindowClosed(openedWindow);
    }
    assertWindowClosed(openedWindow) {
        const interval = setInterval(() => {
            if (!openedWindow || !openedWindow.closed) {
                return;
            }
            clearInterval(interval);
            this.getOauthData();
        }, 100);
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => { var _a; return (_a = this.issueReportingConfigurationForm) === null || _a === void 0 ? void 0 : _a.dirty; }
        });
        if (this.isAdministrator) {
            this.issueReportingConfigurationForm = this.formBuilder.group({
                supportId: '',
                supportEmail: ''
            });
            this.busy = forkJoin({
                supportId: this.rxIssueReportingConfigurationService.getSupportId(),
                supportConfig: this.rxIssueReportingConfigurationService.getSupportConfig()
            }).subscribe((result) => {
                let supportEmail = '';
                if (result.supportConfig) {
                    this.configId = result.supportConfig[RX_RECORD_DEFINITION.coreFieldIds.id];
                    supportEmail =
                        result.supportConfig[RX_ISSUE_REPORTING_CONFIGURATION.supportUserMapping.fieldIds.supportEmail];
                }
                this.issueReportingConfigurationForm.patchValue({
                    supportId: result.supportId,
                    supportEmail
                });
            });
            this.getOauthData();
        }
    }
}
IssueReportingConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IssueReportingConfigurationAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxCurrentUserService }, { token: i3.RxIssueReportingConfigurationService }, { token: i2.RxNotificationService }, { token: i4.RxRecordInstanceService }, { token: i4.RxRecordInstanceUpdateService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
IssueReportingConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IssueReportingConfigurationAdminComponent, selector: "rx-admin-issue-reporting-configuration", usesInheritance: true, ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.issue-reporting-configuration.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <adapt-accordion multiselect=\"true\" class=\"pb-4\">\n    <form [formGroup]=\"issueReportingConfigurationForm\" *ngIf=\"isAdministrator\">\n      <adapt-accordion-tab\n        title=\"{{\n          'com.bmc.arsys.rx.client.admin.issue-reporting-configuration.bmc-service-cloud-account-configuration.label'\n            | translate\n        }}\"\n        isOpen=\"true\"\n      >\n        <adapt-rx-textfield\n          rx-id=\"support-id\"\n          label=\"Support ID\"\n          formControlName=\"supportId\"\n          required=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"support-email\"\n          label=\"Support email\"\n          formControlName=\"supportEmail\"\n          required=\"true\"\n          email=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n      </adapt-accordion-tab>\n\n      <adapt-accordion-tab title=\"Link BMC Service Cloud account to BMC Helix platform\" isOpen=\"true\" class=\"d-block\">\n        <adapt-alert\n          *ngIf=\"oauthUrl === null\"\n          class=\"py-2\"\n          [config]=\"{\n            content:\n              'com.bmc.arsys.rx.client.admin.issue-reporting-configuration.issue-reporting-configuration-missing.message'\n              | translate,\n            type: 'inline',\n            variant: 'danger'\n          }\"\n        ></adapt-alert>\n        <ng-container *ngIf=\"oauthUrl\">\n          <adapt-alert\n            *ngIf=\"isAccountLinked\"\n            class=\"py-2\"\n            [config]=\"{\n              content:\n                'com.bmc.arsys.rx.client.admin.issue-reporting-configuration.account-is-linked.message' | translate,\n              type: 'inline',\n              variant: 'success'\n            }\"\n          ></adapt-alert>\n          <adapt-alert\n            *ngIf=\"!isAccountLinked\"\n            class=\"py-2\"\n            [config]=\"{\n              content:\n                'com.bmc.arsys.rx.client.admin.issue-reporting-configuration.account-is-not-linked.message' | translate,\n              type: 'inline',\n              variant: 'warning'\n            }\"\n          ></adapt-alert>\n          <button\n            adapt-button\n            type=\"button\"\n            rx-id=\"link-account-button\"\n            btn-type=\"secondary\"\n            [disabled]=\"isAccountLinked\"\n            (click)=\"openWindow()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.admin.issue-reporting-configuration.link-account.label' | translate }}\n          </button>\n        </ng-container>\n      </adapt-accordion-tab>\n\n      <button\n        adapt-button\n        type=\"button\"\n        rx-id=\"save-button\"\n        btn-type=\"primary\"\n        class=\"mt-4\"\n        [disabled]=\"issueReportingConfigurationForm.pristine || issueReportingConfigurationForm.invalid\"\n        (click)=\"saveConfig()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n    </form>\n  </adapt-accordion>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i6.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i7.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i7.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i7.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i7.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.EmailValidator, selector: "[email][formControlName],[email][formControl],[email][ngModel]", inputs: ["email"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IssueReportingConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-issue-reporting-configuration',
                    templateUrl: './issue-reporting-configuration.component.html',
                    styleUrls: ['./issue-reporting-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxCurrentUserService }, { type: i3.RxIssueReportingConfigurationService }, { type: i2.RxNotificationService }, { type: i4.RxRecordInstanceService }, { type: i4.RxRecordInstanceUpdateService }, { type: i5.TranslateService }]; } });
//# sourceMappingURL=issue-reporting-configuration.component.js.map