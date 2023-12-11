import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RxAdminSettingsService, RxCommandFactoryService, RxNotificationService, RX_APPLICATION } from '@helix/platform/shared/api';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { find } from 'lodash';
import { of, Subscription, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { RxCognitiveServiceService } from '../cognitive-service/cognitive-service.service';
import { RX_COMAROUND_KNOWLEDGE } from './comaround-knowledge.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../cognitive-service/cognitive-service.service";
import * as i5 from "@angular/common/http";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@helix/platform/ui-kit";
import * as i10 from "@angular/common";
export class ComaroundKnowledgeAdminComponent extends BaseViewComponent {
    constructor(formBuilder, rxUrlUtilsService, rxNotificationService, rxAdminSettingsService, rxCommandFactoryService, rxCognitiveServiceService, httpClient, translateService) {
        super();
        this.formBuilder = formBuilder;
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.rxNotificationService = rxNotificationService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.httpClient = httpClient;
        this.translateService = translateService;
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
        this.availablePortals = [];
        this.isNewConfigurationSetting = false;
        this.comaroundComponentSettingsValues = [];
        this.subscription = new Subscription();
    }
    get comaroundConfigFormGroup() {
        return this.knowledgeConfigForm.controls.comaroundForm;
    }
    get portalControl() {
        return this.knowledgeConfigForm.controls.portal;
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.knowledgeConfigForm.dirty
        });
        this.knowledgeConfigForm = this.formBuilder.group({
            comaroundForm: this.formBuilder.group({
                mainUrl: this.formBuilder.control(null, this.validateUrl),
                frameUrl: this.formBuilder.control(null, this.validateUrl),
                subscriptionId: this.formBuilder.control(null, Validators.required),
                userName: this.formBuilder.control(null, Validators.required),
                password: this.formBuilder.control(null, Validators.required),
                serverUrl: this.formBuilder.control(null, [Validators.required, this.validateUrl])
            }),
            portal: this.formBuilder.control({ value: [], disabled: true })
        });
        this.busy = this.getComaroundComponentSettings()
            .pipe(tap((componentSettings) => {
            var _a;
            const settingNames = Object.values(RX_COMAROUND_KNOWLEDGE.settingNames);
            const { values } = componentSettings;
            this.isNewConfigurationSetting = values.length === 0;
            this.comaroundComponentSettingsValues = values;
            // complete the missing configuration settings
            // works for new configuration too
            if (values.length < settingNames.length) {
                const ownerKey = (_a = values[0]) === null || _a === void 0 ? void 0 : _a.ownerKeyValue1;
                settingNames
                    .filter((name) => !values.find((setting) => setting.settingName === name))
                    .forEach((name) => values.push({
                    // these fields satisfy update/create settings
                    componentName: RX_COMAROUND_KNOWLEDGE.configName,
                    ownerKeyValue1: ownerKey,
                    settingName: name,
                    settingValue: null
                }));
            }
            this.comaroundConfigFormGroup.patchValue({
                serverUrl: this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.serverUrl),
                subscriptionId: this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.subscriptionId),
                userName: this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.userName),
                password: this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.password),
                frameUrl: this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.frameUrl),
                mainUrl: this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.mainUrl)
            });
        }), switchMap(() => {
            return this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.portalId) ? this.getAvailablePortals() : of([]);
        }), tap((portals) => {
            this.availablePortals = portals;
            if (portals.length) {
                const configuredPortalId = this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.portalId);
                let selectedPortal = configuredPortalId && portals.find((portal) => portal.id == configuredPortalId);
                selectedPortal !== null && selectedPortal !== void 0 ? selectedPortal : (selectedPortal = portals.find((portal) => portal.isDefault));
                this.portalControl.setValue([selectedPortal]);
            }
        }))
            .subscribe();
        this.subscription = this.comaroundConfigFormGroup.valueChanges.subscribe(() => {
            this.connectionTestStatus =
                this.comaroundConfigFormGroup.pristine || this.comaroundConfigFormGroup.invalid
                    ? ConnectionTestStatus.Invalid
                    : ConnectionTestStatus.Unknown;
            if (this.portalControl.enabled) {
                this.portalControl.disable();
            }
        });
    }
    getComaroundComponentSettings() {
        return this.rxAdminSettingsService.getComponentSettings(RX_COMAROUND_KNOWLEDGE.configName, {
            'default-bundle-scope': RX_APPLICATION.chatbotBundleId
        });
    }
    getAvailablePortals() {
        return this.httpClient
            .get('/api/rx/application/knowledge?ComAroundRequest=v1/user/portals')
            .pipe(catchError(() => of([])));
    }
    portalOptionFormatter(option) {
        return option.name;
    }
    getValue(settingName) {
        const setting = find(this.comaroundComponentSettingsValues, {
            settingName
        });
        return setting === null || setting === void 0 ? void 0 : setting.settingValue;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    isSaveButtonDisabled() {
        return (this.knowledgeConfigForm.pristine ||
            this.knowledgeConfigForm.invalid ||
            this.connectionTestStatus !== ConnectionTestStatus.Passed);
    }
    setValue(settingName, value) {
        const setting = find(this.comaroundComponentSettingsValues, {
            settingName
        });
        if (setting) {
            setting.settingValue = value;
        }
    }
    saveConfiguration() {
        var _a;
        const formValue = Object.assign(Object.assign({}, this.comaroundConfigFormGroup.getRawValue()), { portal: this.portalControl.value });
        let adminSetting$;
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.serverUrl, formValue.serverUrl);
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.subscriptionId, formValue.subscriptionId);
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.userName, formValue.userName);
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.password, formValue.password);
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.frameUrl, formValue.frameUrl);
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.mainUrl, formValue.mainUrl);
        this.setValue(RX_COMAROUND_KNOWLEDGE.settingNames.portalId, (_a = formValue.portal[0]) === null || _a === void 0 ? void 0 : _a.id);
        if (this.isNewConfigurationSetting) {
            adminSetting$ = this.rxAdminSettingsService
                .createComponentSettings(RX_COMAROUND_KNOWLEDGE.configName, this.comaroundComponentSettingsValues)
                .pipe(switchMap(() => this.getComaroundComponentSettings()), tap((response) => {
                this.isNewConfigurationSetting = false;
                this.comaroundComponentSettingsValues = response.values;
            }));
        }
        else {
            adminSetting$ = this.rxAdminSettingsService.updateComponentSettings(`${RX_COMAROUND_KNOWLEDGE.configName}/${this.comaroundComponentSettingsValues[0].ownerKeyValue1}`, this.comaroundComponentSettingsValues);
        }
        this.busy = adminSetting$.subscribe(() => {
            this.knowledgeConfigForm.markAsPristine();
            this.updateComaroundTokenWithLatestValues();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.comaround-knowledge.configuration-saved.message'));
            this.connectionTestStatus = ConnectionTestStatus.Invalid;
            this.portalControl.disable();
        });
    }
    updateComaroundTokenWithLatestValues() {
        this.rxCommandFactoryService
            .forResourceType('com.bmc.dsm.chatbot.command.UpdateComAroundTokenCommand')
            .execute({})
            .subscribe();
    }
    onTestConnection() {
        const formValue = this.comaroundConfigFormGroup.getRawValue();
        this.knowledgeConfigForm.disable();
        this.rxCognitiveServiceService
            .testConnection({
            resourceType: RX_COMAROUND_KNOWLEDGE.pingComAroundCommand,
            serverUrl: formValue.serverUrl,
            subscriptionId: formValue.subscriptionId,
            userName: formValue.userName,
            password: formValue.password,
            frameUrl: formValue.frameUrl,
            mainUrl: formValue.mainUrl
        })
            .pipe(finalize(() => this.comaroundConfigFormGroup.enable({ emitEvent: false })), catchError((error) => {
            this.connectionTestStatus = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe((portals) => {
            this.availablePortals = portals || [];
            if (portals) {
                const configuredPortalId = this.getValue(RX_COMAROUND_KNOWLEDGE.settingNames.portalId);
                let selectedPortal = configuredPortalId && portals.find((portal) => portal.id == configuredPortalId);
                selectedPortal !== null && selectedPortal !== void 0 ? selectedPortal : (selectedPortal = portals.find((portal) => portal.isDefault));
                this.portalControl.setValue([selectedPortal]);
                this.portalControl.enable();
            }
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
    validateUrl() {
        return (control) => {
            return control.value && !this.rxUrlUtilsService.isValidUrl(control.value, true)
                ? { invalidUrl: { message: this.translateService.instant('com.bmc.arsys.rx.client.admin.invalid-url.label') } }
                : null;
        };
    }
}
ComaroundKnowledgeAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComaroundKnowledgeAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxUrlUtilsService }, { token: i3.RxNotificationService }, { token: i3.RxAdminSettingsService }, { token: i3.RxCommandFactoryService }, { token: i4.RxCognitiveServiceService }, { token: i5.HttpClient }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ComaroundKnowledgeAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ComaroundKnowledgeAdminComponent, selector: "rx-admin-comaround-knowledge", usesInheritance: true, ngImport: i0, template: "<rx-admin-settings\n  header=\" {{ 'com.bmc.arsys.rx.client.admin.comaround-knowledge.header.title' | translate }}\"\n  [busy]=\"busy\">\n  <form [formGroup]=\"knowledgeConfigForm\">\n    <fieldset formGroupName=\"comaroundForm\">\n      <adapt-rx-textfield\n        rx-id=\"main-url\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.comaround-knowledge.main-url.label' | translate }}\"\n        class=\"d-block form-group\"\n        formControlName=\"mainUrl\">\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        rx-id=\"frame-url\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.comaround-knowledge.frame-url.label' | translate }}\"\n        class=\"d-block form-group\"\n        formControlName=\"frameUrl\">\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        rx-id=\"server-url\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.comaround-knowledge.api-endpoint-url.label' | translate }}\"\n        class=\"d-block form-group\"\n        formControlName=\"serverUrl\">\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        rx-id=\"subscription-id\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.comaround-knowledge.subscription-id.label' | translate }}\"\n        formControlName=\"subscriptionId\"\n        class=\"d-block form-group\">\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        rx-id=\"user-name\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.user-name.label' | translate }}\"\n        formControlName=\"userName\"\n        class=\"d-block form-group\">\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        rx-id=\"password\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.password.label' | translate }}\"\n        formControlName=\"password\"\n        isPassword=\"true\"\n        class=\"d-block form-group\">\n      </adapt-rx-textfield>\n\n      <rx-connection-tester\n        buttonType=\"secondary\"\n        [status]=\"connectionTestStatus\"\n        (testConnection)=\"onTestConnection()\"\n        rx-id=\"test-button\"\n        class=\"d-block form-group\">\n      </rx-connection-tester>\n\n    </fieldset>\n\n    <hr />\n\n    <adapt-rx-select\n      rx-id=\"portal\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.comaround-knowledge.portal.label' | translate }}\"\n      formControlName=\"portal\"\n      [options]=\"availablePortals\"\n      [optionFormatter]=\"portalOptionFormatter\"\n      class=\"d-block form-group\"></adapt-rx-select>\n\n    <adapt-alert\n      *ngIf=\"portalControl.disabled\"\n      [config]=\"{type: 'inline', variant: 'info', icon: true}\">\n      {{ \"com.bmc.arsys.rx.client.admin.comaround-knowledge.portal-cannot-be-selected.message\" | translate }}\n    </adapt-alert>\n\n    <div class=\"d-flex justify-content-start mt-5\">\n      <button\n        adapt-button\n        class=\"mr-2\"\n        btn-type=\"primary\"\n        type=\"button\"\n        rx-id=\"save-button\"\n        [disabled]=\"isSaveButtonDisabled()\"\n        (click)=\"saveConfiguration()\">\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n    </div>\n  </form>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}form>*{max-width:400px}\n"], components: [{ type: i7.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i8.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i9.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i8.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i8.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i8.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComaroundKnowledgeAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-comaround-knowledge',
                    templateUrl: './comaround-knowledge.component.html',
                    styleUrls: ['./comaround-knowledge.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxUrlUtilsService }, { type: i3.RxNotificationService }, { type: i3.RxAdminSettingsService }, { type: i3.RxCommandFactoryService }, { type: i4.RxCognitiveServiceService }, { type: i5.HttpClient }, { type: i6.TranslateService }]; } });
//# sourceMappingURL=comaround-knowledge.component.js.map