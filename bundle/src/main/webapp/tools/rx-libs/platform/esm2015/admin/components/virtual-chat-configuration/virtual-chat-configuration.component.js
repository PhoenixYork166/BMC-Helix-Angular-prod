import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxAdminSettingsService, RxLiveAgentSettingsService, RxNotificationService, RX_APPLICATION } from '@helix/platform/shared/api';
import { ConnectionTestStatus, RxModalService } from '@helix/platform/ui-kit';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { find, get, isEmpty, map, values } from 'lodash';
import { forkJoin, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { RxCognitiveServiceService } from '../cognitive-service/cognitive-service.service';
import { RX_VIRTUAL_CHAT_CONFIGURATION } from './virtual-chat-configuration.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "../cognitive-service/cognitive-service.service";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
export class VirtualChatConfigurationAdminComponent extends BaseViewComponent {
    constructor(formBuilder, rxAdminSettingsService, rxNotificationService, rxModalService, rxCognitiveServiceService, rxLiveAgentSettingsService, translateService) {
        super();
        this.formBuilder = formBuilder;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxLiveAgentSettingsService = rxLiveAgentSettingsService;
        this.translateService = translateService;
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
        this.isNewVirtualChatSetting = false;
        this.isNewVirtualChatAdditionalSetting = false;
        this.virtualChatComponentSettingsValues = [];
        this.additionalSettingsComponentSettingsValues = [];
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.virtualChatConfigurationForm.dirty || this.virtualChatAdditionalSettingsForm.dirty
        });
        this.virtualChatConfigurationForm = this.formBuilder.group({
            virtualChatUrl: '',
            username: '',
            password: '',
            systemServerUrl: ''
        });
        this.virtualChatAdditionalSettingsForm = this.formBuilder.group({
            administratorKey: '',
            company: ''
        });
        this.busy = forkJoin({
            virtualChatComponentSettings: this.getVirtualChatComponentSettings(),
            additionalSettingsComponentSettings: this.getAdditionalSettingsComponentSettings()
        }).subscribe((response) => {
            this.isNewVirtualChatSetting = !get(response.virtualChatComponentSettings, 'values', []).length;
            this.isNewVirtualChatAdditionalSetting = !get(response.additionalSettingsComponentSettings, 'values', []).length;
            if (this.isNewVirtualChatSetting) {
                this.virtualChatComponentSettingsValues = map(values(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames), (settingName) => ({
                    assigneeGroupPermission: null,
                    componentName: RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatConfigName,
                    settingId: null,
                    settingName: settingName,
                    settingValue: null,
                    ownerKeyValue1: null
                }));
            }
            else {
                this.virtualChatComponentSettingsValues = response.virtualChatComponentSettings.values;
            }
            if (this.isNewVirtualChatAdditionalSetting) {
                this.additionalSettingsComponentSettingsValues = map(values(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSetting.settingNames), (settingName) => ({
                    assigneeGroupPermission: null,
                    componentName: RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSettingsName,
                    ownerKeyValue1: null,
                    settingId: null,
                    settingName: settingName,
                    settingValue: null
                }));
            }
            else {
                this.additionalSettingsComponentSettingsValues = response.additionalSettingsComponentSettings.values;
            }
            this.virtualChatConfigurationForm.patchValue({
                virtualChatUrl: this.getValueFromVirtualSetting(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.url),
                username: this.getValueFromVirtualSetting(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.userName),
                password: this.getValueFromVirtualSetting(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.password),
                systemServerUrl: this.getValueFromVirtualSetting(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.arServerUrl)
            });
            this.virtualChatAdditionalSettingsForm.patchValue({
                administratorKey: this.getValueFromAdditionalSetting(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSetting.settingNames.adminKey),
                company: this.getValueFromAdditionalSetting(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSetting.settingNames.company)
            });
        });
        this.virtualChatConfigurationForm.valueChanges.subscribe(() => {
            this.connectionTestStatus =
                this.virtualChatConfigurationForm.pristine || this.virtualChatConfigurationForm.invalid
                    ? ConnectionTestStatus.Invalid
                    : ConnectionTestStatus.Unknown;
        });
    }
    getVirtualChatComponentSettings() {
        return this.rxAdminSettingsService.getComponentSettings(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatConfigName, {
            'default-bundle-scope': RX_APPLICATION.settingsBundleId
        });
    }
    getAdditionalSettingsComponentSettings() {
        return this.rxAdminSettingsService.getComponentSettings(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSettingsName, {
            'default-bundle-scope': RX_APPLICATION.settingsBundleId
        });
    }
    getValueFromAdditionalSetting(settingName) {
        return get(find(this.additionalSettingsComponentSettingsValues, {
            settingName
        }), 'settingValue', null);
    }
    getValueFromVirtualSetting(settingName) {
        return get(find(this.virtualChatComponentSettingsValues, {
            settingName
        }), 'settingValue', null);
    }
    onTestConnection() {
        const formValue = this.virtualChatConfigurationForm.getRawValue();
        this.rxCognitiveServiceService
            .testConnection({
            resourceType: RX_VIRTUAL_CHAT_CONFIGURATION.pingLiveChatServiceCommand,
            remedyMidTierUrl: formValue.virtualChatUrl,
            arAdministratorUser: formValue.username,
            arAdministratorPassword: formValue.password,
            arSystemServerUrl: formValue.systemServerUrl
        })
            .pipe(catchError((error) => {
            this.connectionTestStatus = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe(() => {
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
    isSaveButtonDisabled() {
        return (this.virtualChatConfigurationForm.pristine ||
            this.virtualChatConfigurationForm.invalid ||
            this.connectionTestStatus !== ConnectionTestStatus.Passed);
    }
    setVirtualSettingValue(settingName, value) {
        find(this.virtualChatComponentSettingsValues, {
            settingName
        }).settingValue = value;
    }
    saveVirtualChatConfig() {
        let adminSetting$;
        const formValue = this.virtualChatConfigurationForm.getRawValue();
        this.setVirtualSettingValue(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.url, formValue.virtualChatUrl);
        this.setVirtualSettingValue(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.userName, formValue.username);
        this.setVirtualSettingValue(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.password, formValue.password);
        this.setVirtualSettingValue(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChat.settingNames.arServerUrl, formValue.systemServerUrl);
        if (this.isNewVirtualChatSetting) {
            adminSetting$ = this.rxAdminSettingsService
                .createComponentSettings(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatConfigName, this.virtualChatComponentSettingsValues)
                .pipe(switchMap(() => this.getVirtualChatComponentSettings()), tap((response) => {
                this.isNewVirtualChatSetting = false;
                this.virtualChatComponentSettingsValues = response.values;
            }));
        }
        else {
            adminSetting$ = this.rxAdminSettingsService.updateComponentSettings(`${RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatConfigName}/${this.virtualChatComponentSettingsValues[0].ownerKeyValue1}`, this.virtualChatComponentSettingsValues);
        }
        this.busy = adminSetting$.subscribe(() => {
            this.rxNotificationService.addSuccessMessage(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatConfigurationSaved);
            this.connectionTestStatus = ConnectionTestStatus.Invalid;
            this.virtualChatConfigurationForm.markAsPristine();
            this.rxLiveAgentSettingsService.getAvailableTopics();
        });
    }
    setAdditionalSettingValue(settingName, value) {
        find(this.additionalSettingsComponentSettingsValues, {
            settingName
        }).settingValue = value;
    }
    saveAdditionalSettings() {
        let adminSetting$;
        const formValue = this.virtualChatAdditionalSettingsForm.getRawValue();
        this.setAdditionalSettingValue(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSetting.settingNames.adminKey, formValue.administratorKey);
        this.setAdditionalSettingValue(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSetting.settingNames.company, formValue.company);
        if (this.isNewVirtualChatAdditionalSetting) {
            adminSetting$ = this.rxAdminSettingsService
                .createComponentSettings(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSettingsName, this.additionalSettingsComponentSettingsValues)
                .pipe(switchMap(() => this.getAdditionalSettingsComponentSettings()), tap((response) => {
                this.isNewVirtualChatAdditionalSetting = false;
                this.additionalSettingsComponentSettingsValues = response.values;
            }));
        }
        else {
            adminSetting$ = this.rxAdminSettingsService.updateComponentSettings(`${RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatAdditionalSettingsName}/${this.additionalSettingsComponentSettingsValues[0].ownerKeyValue1}`, this.additionalSettingsComponentSettingsValues);
        }
        this.busy = adminSetting$.subscribe(() => {
            this.virtualChatAdditionalSettingsForm.markAsPristine();
            this.rxNotificationService.addSuccessMessage(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatConfigurationSaved);
            this.rxLiveAgentSettingsService.getAvailableTopics().subscribe((topics) => {
                if (isEmpty(topics)) {
                    this.rxNotificationService.addWarningMessage(RX_VIRTUAL_CHAT_CONFIGURATION.virtualChatVerifyAdministratorKey);
                }
            });
        });
    }
}
VirtualChatConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: VirtualChatConfigurationAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxAdminSettingsService }, { token: i2.RxNotificationService }, { token: i3.RxModalService }, { token: i4.RxCognitiveServiceService }, { token: i2.RxLiveAgentSettingsService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
VirtualChatConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: VirtualChatConfigurationAdminComponent, selector: "rx-admin-virtual-chat-configuration", usesInheritance: true, ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.virtual-chat-configuration.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <adapt-accordion multiselect=\"true\" class=\"pb-4\">\n    <form [formGroup]=\"virtualChatConfigurationForm\">\n      <adapt-accordion-tab title=\"Authentication\" isOpen=\"true\" rx-id=\"authentication\">\n        <adapt-rx-textfield\n          rx-id=\"virtual-chat-url\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.tone-analysis-testing.bmc-remedy-virtual-chat-api-endpoint-url.label'\n              | translate\n          }}\"\n          formControlName=\"virtualChatUrl\"\n          maxlength=\"254\"\n          required=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"administrator-user\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.ar-administrator-user.label' | translate }}\"\n          formControlName=\"username\"\n          maxlength=\"254\"\n          required=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"administrator-password\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.tone-analysis-testing.ar-administrator-password.label' | translate\n          }}\"\n          formControlName=\"password\"\n          maxlength=\"254\"\n          required=\"true\"\n          [isPassword]=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"system-server-url\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.tone-analysis-testing.ar-system-server-api-endpoint-url.label' | translate\n          }}\"\n          formControlName=\"systemServerUrl\"\n          maxlength=\"254\"\n          required=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n\n        <div class=\"d-flex justify-content-start\">\n          <rx-connection-tester\n            buttonType=\"secondary\"\n            [status]=\"connectionTestStatus\"\n            (testConnection)=\"onTestConnection()\"\n            rx-id=\"virtual-chat-configuration-test-button\"\n          ></rx-connection-tester>\n          <button\n            adapt-button\n            class=\"ml-4 mr-2\"\n            btn-type=\"primary\"\n            type=\"button\"\n            rx-id=\"save-button\"\n            [disabled]=\"isSaveButtonDisabled()\"\n            (click)=\"saveVirtualChatConfig()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n          </button>\n        </div>\n      </adapt-accordion-tab>\n    </form>\n\n    <form [formGroup]=\"virtualChatAdditionalSettingsForm\">\n      <adapt-accordion-tab title=\"Additional settings\" rx-id=\"additional-settings\" class=\"d-block\">\n        <adapt-rx-textfield\n          rx-id=\"administrator-key\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.administrator-key.label' | translate }}\"\n          formControlName=\"administratorKey\"\n          class=\"d-block form-group\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content: 'com.bmc.arsys.rx.client.admin.virtual-chat-configuration.administrator-key.tooltip' | translate,\n            placement: 'right',\n            popoverMode: true\n          }\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield rx-id=\"company\" label=\"Company\" formControlName=\"company\" class=\"d-block form-group\">\n        </adapt-rx-textfield>\n\n        <div class=\"d-flex justify-content-start\">\n          <button\n            adapt-button\n            class=\"mr-2\"\n            btn-type=\"primary\"\n            type=\"button\"\n            rx-id=\"additional-settings-save-button\"\n            [disabled]=\"virtualChatAdditionalSettingsForm.pristine || virtualChatAdditionalSettingsForm.invalid\"\n            (click)=\"saveAdditionalSettings()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n          </button>\n        </div>\n      </adapt-accordion-tab>\n    </form>\n  </adapt-accordion>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i6.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i7.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i7.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i7.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: VirtualChatConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-virtual-chat-configuration',
                    templateUrl: './virtual-chat-configuration.component.html',
                    styleUrls: ['./virtual-chat-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxAdminSettingsService }, { type: i2.RxNotificationService }, { type: i3.RxModalService }, { type: i4.RxCognitiveServiceService }, { type: i2.RxLiveAgentSettingsService }, { type: i5.TranslateService }]; } });
//# sourceMappingURL=virtual-chat-configuration.component.js.map