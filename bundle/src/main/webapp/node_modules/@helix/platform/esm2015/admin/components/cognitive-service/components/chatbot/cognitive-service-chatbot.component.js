import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { cloneDeep, forEach, get, isArray, isEqual, keys } from 'lodash';
import { map } from 'rxjs/operators';
import { RX_COGNITIVE_SERVICE } from '../../cognitive-service.constant';
import { RxDefinitionNameService, RX_OVERLAY, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../cognitive-service.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
export class CognitiveServiceChatbotComponent {
    constructor(formBuilder, rxCognitiveServiceService, rxDefinitionNameService, rxNotificationService, rxSystemConfigurationService, translateService) {
        this.formBuilder = formBuilder;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
        this.initialChatbotProviderValues = cloneDeep(RX_COGNITIVE_SERVICE.chatbot.systemSettings);
        this.chatbotProcessDefinitionNameOptions = [];
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.approverSelectionTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-service-component.user-idle.tooltip')
        };
        this.chatbotNotificationsIdleTimeTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-service-component.proactive-chatbot-notifications-idle-time.tooltip')
        };
        this.chatbotNotificationsMaxTimeTooltip = {
            popoverMode: true,
            iconName: 'question_circle_o',
            placement: 'right',
            content: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-service-component.proactive-chatbot-notifications-max-time.tooltip')
        };
        this.optionFormatter = (processDefinitionNameOption) => {
            return get(processDefinitionNameOption, 'name', this.defaultSelection);
        };
    }
    ngOnInit() {
        this.chatbotProvidersForm = this.formBuilder.group({
            chatSessionIdleTimeout: RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatSessionIdleTimeout,
            chatUserIdleTimeout: RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatUserIdleTimeout,
            chatContextVariablesProcessName: [],
            chatbotNotificationsIdleTime: RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatbotNotificationsIdleTime,
            chatbotNotificationsMaxTime: RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatbotNotificationsMaxTime,
            removePoweredByBmcHelix: RX_COGNITIVE_SERVICE.chatbot.systemSettings.removePoweredByBmcHelix
        });
        forkJoin({
            processDefinitionNameOptions: this.getProcessDefinitionNameOptions(),
            settingsData: this.rxCognitiveServiceService.getSystemSettings(keys(RX_COGNITIVE_SERVICE.chatbot.systemSettings))
        }).subscribe((result) => {
            this.chatbotProcessDefinitionNameOptions = result.processDefinitionNameOptions;
            this.loadChatbotSystemSettings(result.settingsData.data);
        });
    }
    isFormDirty() {
        return this.chatbotProvidersForm.dirty;
    }
    getProcessDefinitionNameOptions() {
        return this.rxCognitiveServiceService.getChatbotProcessDefinitionNames().pipe(map((processDefinitionNames) => processDefinitionNames.sort().map((processDefinitionName) => {
            return {
                id: processDefinitionName,
                name: this.rxDefinitionNameService.getDisplayName(processDefinitionName)
            };
        })));
    }
    loadChatbotSystemSettings(settings) {
        forEach(settings, (setting) => {
            let settingValue;
            if (setting.name === RX_COGNITIVE_SERVICE.chatbot.chatContextVariablesProcessName) {
                settingValue = [this.chatbotProcessDefinitionNameOptions.find((process) => process.id === setting.value)];
            }
            else {
                settingValue = setting.value;
            }
            this.setFormFieldValue(setting.name, settingValue);
            this.initialChatbotProviderValues[setting.name] = settingValue;
        });
    }
    setFormFieldValue(name, value) {
        this.chatbotProvidersForm.controls[name].setValue(value);
    }
    setDefaultSessionIdleTimeout() {
        if (RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatSessionIdleTimeout !==
            this.chatbotProvidersForm.controls.chatSessionIdleTimeout.value) {
            this.setFormFieldValue('chatSessionIdleTimeout', RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatSessionIdleTimeout);
            this.chatbotProvidersForm.markAsDirty();
        }
    }
    setDefaultUserIdleTimeout() {
        if (RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatUserIdleTimeout !==
            this.chatbotProvidersForm.controls.chatUserIdleTimeout.value) {
            this.setFormFieldValue('chatUserIdleTimeout', RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatUserIdleTimeout);
            this.chatbotProvidersForm.markAsDirty();
        }
    }
    setDefaultChatbotNotificationsIdleTime() {
        if (RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatbotNotificationsIdleTime !==
            this.chatbotProvidersForm.controls.chatbotNotificationsIdleTime.value) {
            this.setFormFieldValue('chatbotNotificationsIdleTime', RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatbotNotificationsIdleTime);
            this.chatbotProvidersForm.markAsDirty();
        }
    }
    setDefaultChatbotNotificationsMaxTime() {
        if (RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatbotNotificationsMaxTime !==
            this.chatbotProvidersForm.controls.chatbotNotificationsMaxTime.value) {
            this.setFormFieldValue('chatbotNotificationsMaxTime', RX_COGNITIVE_SERVICE.chatbot.systemSettings.chatbotNotificationsMaxTime);
            this.chatbotProvidersForm.markAsDirty();
        }
    }
    save() {
        const formValue = this.chatbotProvidersForm.getRawValue();
        const systemPropertyObservables = Object.keys(RX_COGNITIVE_SERVICE.chatbot.systemSettings).reduce((result, settingName) => {
            var _a, _b;
            let settingValue = formValue[settingName];
            if (isArray(settingValue)) {
                settingValue = (_b = (_a = settingValue[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '';
            }
            if (!isEqual(this.initialChatbotProviderValues[settingName], settingValue)) {
                result.push(this.rxSystemConfigurationService.setConfiguration(settingName, settingValue));
            }
            return result;
        }, []);
        forkJoin(systemPropertyObservables).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_COGNITIVE_SERVICE.notificationMessages.chatProviderSettingsSaved));
            this.initialChatbotProviderValues = formValue;
            this.chatbotProvidersForm.markAsPristine();
        });
    }
    isSaveButtonDisabled() {
        return this.chatbotProvidersForm.pristine || this.chatbotProvidersForm.invalid;
    }
    isSaveButtonVisible() {
        return (this.isAdministrator &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
}
CognitiveServiceChatbotComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceChatbotComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxCognitiveServiceService }, { token: i3.RxDefinitionNameService }, { token: i3.RxNotificationService }, { token: i3.RxSystemConfigurationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceChatbotComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceChatbotComponent, selector: "rx-cognitive-service-chatbot", inputs: { isAdministrator: "isAdministrator", currentOverlayContext: "currentOverlayContext" }, ngImport: i0, template: "<form [formGroup]=\"chatbotProvidersForm\">\n  <adapt-accordion rx-id=\"accordion-chatbot-provider\">\n    <adapt-accordion-tab\n      title=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-service.chatbot.title' | translate }}\"\n      isOpen=\"true\"\n    >\n      <div class=\"chat-session-idle-timeout form-group\">\n        <adapt-rx-counter\n          adaptRange\n          [min]=\"300\"\n          [max]=\"1200\"\n          [adaptRange]=\"[300, 1200]\"\n          rx-id=\"chatbot-provider-chat-session-idle-time\"\n          [label]=\"'com.bmc.arsys.rx.client.admin.cognitive-service.chat-session-idle.label' | translate\"\n          required=\"true\"\n          [formControl]=\"chatbotProvidersForm.controls.chatSessionIdleTimeout\"\n          class=\"adapt-counter-prefix px-0 mr-2\"\n        >\n        </adapt-rx-counter>\n\n        <adapt-button\n          class=\"align-self-baseline\"\n          rx-id=\"chatbot-provider-default-chat-session-idle-time\"\n          btn-type=\"secondary\"\n          (click)=\"setDefaultSessionIdleTimeout()\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.default.label' | translate }}\n        </adapt-button>\n      </div>\n\n      <div class=\"chat-session-idle-timeout form-group\">\n        <adapt-rx-counter\n          adaptRange\n          [min]=\"5\"\n          [max]=\"1200\"\n          [adaptRange]=\"[5, 1200]\"\n          rx-id=\"chatbot-provider-chat-user-idle-time\"\n          [label]=\"'com.bmc.arsys.rx.client.admin.cognitive-service.chat-user-idle.label' | translate\"\n          required=\"true\"\n          [formControl]=\"chatbotProvidersForm.controls.chatUserIdleTimeout\"\n          [tooltip]=\"approverSelectionTooltip\"\n          class=\"adapt-counter-prefix px-0 mr-2\"\n        >\n        </adapt-rx-counter>\n\n        <adapt-button\n          class=\"align-self-baseline\"\n          rx-id=\"chatbot-provider-default-chat-user-idle-time\"\n          btn-type=\"secondary\"\n          (click)=\"setDefaultUserIdleTimeout()\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.default.label' | translate }}\n        </adapt-button>\n      </div>\n\n      <adapt-rx-select\n        rx-id=\"chat-context-variables-process-name\"\n        formControlName=\"chatContextVariablesProcessName\"\n        label=\"Chat context variables process name\"\n        [options]=\"chatbotProcessDefinitionNameOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        class=\"d-block form-group\"\n      ></adapt-rx-select>\n\n      <adapt-rx-control-label\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-service.remove-powered-by-bmc-helix.label'\n            | translate: { poweredByBmcHelix: 'Powered by BMC Helix' }\n        }}\"\n      ></adapt-rx-control-label>\n\n      <adapt-rx-switch\n        [formControl]=\"chatbotProvidersForm.controls.removePoweredByBmcHelix\"\n        rx-id=\"remove-powered-by-bmc-helix\"\n        [isLabelBefore]=\"false\"\n      ></adapt-rx-switch>\n    </adapt-accordion-tab>\n\n    <adapt-accordion rx-id=\"accordion-proactive-chatbot-notifications\">\n      <adapt-accordion-tab\n        title=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-service.proactive-chatbot-notifications.title' | translate\n        }}\"\n        isOpen=\"true\"\n      >\n        <div class=\"proactive-chatbot-notifications-idle-time form-group\">\n          <adapt-rx-counter\n            adaptRange\n            [min]=\"300\"\n            [max]=\"1200\"\n            [adaptRange]=\"[300, 1200]\"\n            rx-id=\"notifications-idle-time\"\n            [label]=\"\n              'com.bmc.arsys.rx.client.admin.cognitive-service.proactive-chatbot-notifications-idle-time.label'\n                | translate\n            \"\n            required=\"true\"\n            [formControl]=\"chatbotProvidersForm.controls.chatbotNotificationsIdleTime\"\n            [tooltip]=\"chatbotNotificationsIdleTimeTooltip\"\n            class=\"adapt-counter-prefix px-0 mr-2\"\n          >\n          </adapt-rx-counter>\n\n          <adapt-button\n            class=\"align-self-baseline\"\n            rx-id=\"notifications-idle-time-default-button\"\n            btn-type=\"secondary\"\n            (click)=\"setDefaultChatbotNotificationsIdleTime()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.default.label' | translate }}\n          </adapt-button>\n        </div>\n\n        <div class=\"proactive-chatbot-notifications-max-time form-group\">\n          <adapt-rx-counter\n            adaptRange\n            [min]=\"120\"\n            [max]=\"3600\"\n            [adaptRange]=\"[120, 3600]\"\n            rx-id=\"notifications-max-time\"\n            [label]=\"\n              'com.bmc.arsys.rx.client.admin.cognitive-service.proactive-chatbot-notifications-max-time.label'\n                | translate\n            \"\n            required=\"true\"\n            [formControl]=\"chatbotProvidersForm.controls.chatbotNotificationsMaxTime\"\n            [tooltip]=\"chatbotNotificationsMaxTimeTooltip\"\n            class=\"adapt-counter-prefix px-0 mr-2\"\n          >\n          </adapt-rx-counter>\n\n          <adapt-button\n            class=\"align-self-baseline\"\n            rx-id=\"notifications-max-time-default-button\"\n            btn-type=\"secondary\"\n            (click)=\"setDefaultChatbotNotificationsMaxTime()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.default.label' | translate }}\n          </adapt-button>\n        </div>\n      </adapt-accordion-tab>\n    </adapt-accordion>\n\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"save-button\"\n      btn-type=\"primary\"\n      class=\"mt-4\"\n      [disabled]=\"isSaveButtonDisabled()\"\n      *ngIf=\"isSaveButtonVisible()\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </adapt-accordion>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.chat-session-idle-timeout,.proactive-chatbot-notifications-idle-time,.proactive-chatbot-notifications-max-time{display:flex}.chat-session-idle-timeout adapt-button,.proactive-chatbot-notifications-idle-time adapt-button,.proactive-chatbot-notifications-max-time adapt-button{margin-top:1.5rem}adapt-rx-counter,adapt-rx-select{max-width:400px}\n"], components: [{ type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i5.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.AdaptRangeValidatorDirective, selector: "[adaptRange][ngModel],[adaptRange][formControl]", inputs: ["adaptRange", "adaptRangeMessageFn"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceChatbotComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-service-chatbot',
                    templateUrl: './cognitive-service-chatbot.component.html',
                    styleUrls: ['./cognitive-service-chatbot.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxCognitiveServiceService }, { type: i3.RxDefinitionNameService }, { type: i3.RxNotificationService }, { type: i3.RxSystemConfigurationService }, { type: i4.TranslateService }]; }, propDecorators: { isAdministrator: [{
                type: Input
            }], currentOverlayContext: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-service-chatbot.component.js.map