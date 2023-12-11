import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RX_OVERLAY, RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { mapValues } from 'lodash';
import { throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RX_COGNITIVE_SERVICE } from '../../cognitive-service.constant';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../../cognitive-service.service";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
export class CognitiveServiceSummarizationComponent {
    constructor(rxCurrentUserService, rxCognitiveServiceService, rxNotificationService, rxSystemConfigurationService, formBuilder, translateService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
    }
    ngOnInit() {
        this.isAdministratorOverlayConfigured =
            this.isAdministrator &&
                this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
                !this.currentOverlayContext.isShared;
        this.testConnection()
            .pipe(catchError((error) => {
            this.isSummarizationServiceConfigured = false;
            return EMPTY;
        }))
            .subscribe(() => {
            this.isSummarizationServiceConfigured = true;
        });
        this.summarizationConfigurationForm = this.formBuilder.group({
            enableSummarization: { value: 0, disabled: this.isEnableSummarizationCheckboxDisabled() },
            summarizationPercentage: ''
        });
        this.loadSystemSettings();
    }
    isFormDirty() {
        return this.summarizationConfigurationForm.dirty;
    }
    loadSystemSettings() {
        this.rxSystemConfigurationService
            .getConfiguration(RX_COGNITIVE_SERVICE.summarization.systemSettingsKey)
            .subscribe((settingsData) => {
            const summarizationData = JSON.parse(settingsData.value);
            this.summarizationConfigurationForm.setValue(summarizationData);
        });
    }
    save() {
        const formValue = this.summarizationConfigurationForm.getRawValue();
        formValue.enableSummarization = formValue.enableSummarization ? 1 : 0;
        const configurations = mapValues(formValue, (value) => value);
        this.rxSystemConfigurationService
            .setConfiguration(RX_COGNITIVE_SERVICE.summarization.systemSettingsKey, JSON.stringify(configurations))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_COGNITIVE_SERVICE.notificationMessages.summarizationConfigurationSaved));
            this.connectionTestStatus = ConnectionTestStatus.Invalid;
            this.summarizationConfigurationForm.markAsPristine();
        });
    }
    isSaveButtonDisabled() {
        return !this.summarizationConfigurationForm.controls.enableSummarization.value &&
            this.summarizationConfigurationForm.dirty
            ? false
            : this.connectionTestStatus !== ConnectionTestStatus.Passed;
    }
    isEnableSummarizationCheckboxDisabled() {
        return !(this.rxCurrentUserService.isAdministrator() &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
    isConnectionTestStatusInvalid() {
        return (!this.isAdministratorOverlayConfigured ||
            this.summarizationConfigurationForm.invalid ||
            this.summarizationConfigurationForm.pristine ||
            !this.summarizationConfigurationForm.controls.enableSummarization.value);
    }
    resetConnectionTest() {
        this.connectionTestStatus = this.isConnectionTestStatusInvalid()
            ? ConnectionTestStatus.Invalid
            : ConnectionTestStatus.Unknown;
        if (this.summarizationConfigurationForm.controls.enableSummarization.value) {
            this.summarizationConfigurationForm.get('summarizationPercentage').enable();
        }
        else {
            this.summarizationConfigurationForm.get('summarizationPercentage').disable();
        }
    }
    testConnection() {
        return this.rxCognitiveServiceService.testConnection({
            resourceType: 'com.bmc.arsys.rx.application.cognitive.command.PingSummarizationServiceCommand'
        });
    }
    onTestConnection() {
        this.testConnection()
            .pipe(catchError((error) => {
            this.connectionTestStatus = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe(() => {
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
}
CognitiveServiceSummarizationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceSummarizationComponent, deps: [{ token: i1.RxCurrentUserService }, { token: i2.RxCognitiveServiceService }, { token: i1.RxNotificationService }, { token: i1.RxSystemConfigurationService }, { token: i3.FormBuilder }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceSummarizationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceSummarizationComponent, selector: "rx-cognitive-service-summarization", inputs: { isAdministrator: "isAdministrator", currentOverlayContext: "currentOverlayContext" }, ngImport: i0, template: "<adapt-alert\n  *ngIf=\"isSummarizationServiceConfigured === false\"\n  [config]=\"{ content: 'Summarization service has not been configured.', type: 'inline', variant: 'warning' }\"\n></adapt-alert>\n\n<form [formGroup]=\"summarizationConfigurationForm\" *ngIf=\"isSummarizationServiceConfigured\">\n  <adapt-accordion rx-id=\"accordion-summarization-configuration\">\n    <adapt-accordion-tab\n      title=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-service.summarization.title' | translate }}\"\n    >\n      <adapt-rx-switch\n        class=\"form-group\"\n        rx-id=\"enable-summarization-service\"\n        formControlName=\"enableSummarization\"\n        label=\"Enable summarization service\"\n        (ngModelChange)=\"resetConnectionTest()\"\n      ></adapt-rx-switch>\n\n      <adapt-rx-counter\n        class=\"d-block form-group\"\n        adaptRange\n        rx-id=\"summarization-percentage\"\n        [min]=\"1\"\n        [max]=\"50\"\n        label=\"Summarization %\"\n        required=\"true\"\n        [formControl]=\"summarizationConfigurationForm.controls.summarizationPercentage\"\n        [step]=\"1\"\n        [tooltip]=\"{\n          iconName: 'question_circle_o',\n          content: 'com.bmc.arsys.rx.client.admin.cognitive-service.summarization.percentage.tooltip' | translate,\n          placement: 'right',\n          popoverMode: true\n        }\"\n        (ngModelChange)=\"resetConnectionTest()\"\n      ></adapt-rx-counter>\n\n      <rx-connection-tester\n        class=\"mt-1\"\n        *ngIf=\"isAdministrator\"\n        [status]=\"connectionTestStatus\"\n        (testConnection)=\"onTestConnection()\"\n      ></rx-connection-tester>\n    </adapt-accordion-tab>\n\n    <button\n      adapt-button\n      rx-id=\"save-button\"\n      btn-type=\"primary\"\n      class=\"mt-4\"\n      [disabled]=\"isSaveButtonDisabled()\"\n      *ngIf=\"isAdministratorOverlayConfigured\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </adapt-accordion>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-counter{max-width:400px}\n"], components: [{ type: i5.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i5.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i6.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.AdaptRangeValidatorDirective, selector: "[adaptRange][ngModel],[adaptRange][formControl]", inputs: ["adaptRange", "adaptRangeMessageFn"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceSummarizationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-service-summarization',
                    templateUrl: './cognitive-service-summarization.component.html',
                    styleUrls: ['./cognitive-service-summarization.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCurrentUserService }, { type: i2.RxCognitiveServiceService }, { type: i1.RxNotificationService }, { type: i1.RxSystemConfigurationService }, { type: i3.FormBuilder }, { type: i4.TranslateService }]; }, propDecorators: { isAdministrator: [{
                type: Input
            }], currentOverlayContext: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-service-summarization.component.js.map