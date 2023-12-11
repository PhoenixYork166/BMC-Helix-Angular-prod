import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { RX_COGNITIVE_SERVICE } from '../../cognitive-service.constant';
import { RxCurrentUserService, RX_OVERLAY } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../cognitive-service.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
export class CognitiveServiceAdministrationCredentialsComponent {
    constructor(formBuilder, rxCognitiveServiceService, rxCurrentUserService, rxNotificationService, rxSystemConfigurationService, translateService) {
        this.formBuilder = formBuilder;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
    }
    ngOnInit() {
        this.cognitiveAdministrationCredentialsProvidersForm = this.formBuilder.group({
            cognitiveAdminPlatformApiKey: ''
        });
        this.loadSystemSettings();
    }
    isFormDirty() {
        return this.cognitiveAdministrationCredentialsProvidersForm.dirty;
    }
    loadSystemSettings() {
        this.rxSystemConfigurationService
            .getConfiguration(RX_COGNITIVE_SERVICE.cognitiveAdministrationCredentials.systemSettingsKey)
            .subscribe((settingsData) => {
            this.watsonAdminCredentialsData = JSON.parse(settingsData.value);
            this.loadCognitiveAdminCredentialsValues();
        });
    }
    getWatsonAdminCredentialsData(property) {
        return this.watsonAdminCredentialsData[RX_COGNITIVE_SERVICE.credentialsProvider][property] || '';
    }
    loadCognitiveAdminCredentialsValues() {
        let apiKeyValue = '';
        if (this.watsonAdminCredentialsData[RX_COGNITIVE_SERVICE.credentialsProvider]) {
            apiKeyValue = this.getWatsonAdminCredentialsData(RX_COGNITIVE_SERVICE.cognitiveAdministrationCredentials.cognitiveAdminPlatformApiKey)
                ? RX_COGNITIVE_SERVICE.passwordMask
                : '';
        }
        this.cognitiveAdministrationCredentialsProvidersForm.controls.cognitiveAdminPlatformApiKey.setValue(apiKeyValue);
    }
    save() {
        const newApiKey = this.cognitiveAdministrationCredentialsProvidersForm.value.cognitiveAdminPlatformApiKey;
        const newCredentials = cloneDeep(RX_COGNITIVE_SERVICE.cognitiveAdministrationCredentials.payload);
        newCredentials[RX_COGNITIVE_SERVICE.credentialsProvider][RX_COGNITIVE_SERVICE.cognitiveAdministrationCredentials.cognitiveAdminPlatformApiKey] = this.rxCognitiveServiceService.filterMaskPassword(newApiKey);
        this.rxSystemConfigurationService
            .setConfiguration(RX_COGNITIVE_SERVICE.cognitiveAdministrationCredentials.systemSettingsKey, JSON.stringify(newCredentials))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_COGNITIVE_SERVICE.notificationMessages.cognitiveAdministrationCredentialsSaved));
            this.cognitiveAdministrationCredentialsProvidersForm.markAsPristine();
        });
    }
    isSaveButtonDisabled() {
        return (this.cognitiveAdministrationCredentialsProvidersForm.pristine ||
            this.cognitiveAdministrationCredentialsProvidersForm.invalid);
    }
    isSaveButtonVisible() {
        return (this.isAdministrator &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
}
CognitiveServiceAdministrationCredentialsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceAdministrationCredentialsComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxCognitiveServiceService }, { token: i3.RxCurrentUserService }, { token: i3.RxNotificationService }, { token: i3.RxSystemConfigurationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceAdministrationCredentialsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceAdministrationCredentialsComponent, selector: "rx-cognitive-service-administration-credentials", inputs: { isAdministrator: "isAdministrator", currentOverlayContext: "currentOverlayContext" }, ngImport: i0, template: "<form [formGroup]=\"cognitiveAdministrationCredentialsProvidersForm\">\n  <adapt-accordion>\n    <adapt-accordion-tab\n      title=\"{{\n        'com.bmc.arsys.rx.client.admin.cognitive-service.cognitive-administration-credentials.title' | translate\n      }}\"\n      isOpen=\"true\"\n    >\n      <div class=\"form-group\">\n        <adapt-rx-textfield\n          rx-id=\"platform-api-key\"\n          label=\"Platform API key\"\n          formControlName=\"cognitiveAdminPlatformApiKey\"\n          maxlength=\"254\"\n          required=\"true\"\n          [isPassword]=\"true\"\n          class=\"d-block\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </adapt-accordion-tab>\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"save-button\"\n      btn-type=\"primary\"\n      class=\"mt-4\"\n      [disabled]=\"isSaveButtonDisabled()\"\n      *ngIf=\"isSaveButtonVisible()\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </adapt-accordion>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceAdministrationCredentialsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-service-administration-credentials',
                    templateUrl: './cognitive-service-administration-credentials.component.html',
                    styleUrls: ['./cognitive-service-administration-credentials.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxCognitiveServiceService }, { type: i3.RxCurrentUserService }, { type: i3.RxNotificationService }, { type: i3.RxSystemConfigurationService }, { type: i4.TranslateService }]; }, propDecorators: { isAdministrator: [{
                type: Input
            }], currentOverlayContext: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-service-administration-credentials.component.js.map