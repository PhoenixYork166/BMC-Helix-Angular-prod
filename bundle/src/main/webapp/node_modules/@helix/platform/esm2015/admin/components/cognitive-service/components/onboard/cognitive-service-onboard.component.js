import { Component, Injector, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RX_CHATBOT, RxCommandFactoryService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { forEach, get, some, transform } from 'lodash';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RX_COGNITIVE_SERVICE } from '../../cognitive-service.constant';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../cognitive-service.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/common";
export class CognitiveServiceOnboardComponent extends RxModalClass {
    constructor(dockedPanelContext, rxCognitiveServiceService, rxCommandFactoryService, rxModalService, rxNotificationService, rxRecordInstanceDataPageService, rxSystemConfigurationService, translateService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
        this.injector = injector;
        this.supportedCognitiveProviders = RX_COGNITIVE_SERVICE.onboard.cognitiveProvidersList;
        this.cognitiveProvider = [RX_COGNITIVE_SERVICE.onboard.cognitiveProvidersList[0]];
        this.regions = RX_COGNITIVE_SERVICE.regionsList.map((region) => (Object.assign(Object.assign({}, region), { name: this.translateService.instant(region.name) })));
        this.providerServices = {};
        this.defaultServiceId = RX_COGNITIVE_SERVICE.onboard.cognitiveProvidersList[0].id;
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.optionFormatter = (regionNameOption) => {
            return get(regionNameOption, 'name', this.defaultSelection);
        };
    }
    ngOnInit() {
        super.ngOnInit();
        const params = {
            recorddefinition: RX_CHATBOT.chatbotLocales.recordDefinitionName,
            queryExpression: `'${RX_CHATBOT.chatbotLocales.fieldIds.botConfigurationId}'="${RX_CHATBOT.defaultChatbotId}"`,
            propertySelection: [
                RX_CHATBOT.chatbotLocales.fieldIds.botConfigurationId,
                RX_CHATBOT.chatbotLocales.fieldIds.providerPassword
            ]
        };
        forkJoin({
            cognitiveServiceCredential: this.rxSystemConfigurationService.getConfiguration(RX_COGNITIVE_SERVICE.connections.systemSettingKeys.cognitiveServiceCredential),
            cognitiveServiceRegions: this.rxSystemConfigurationService.getConfiguration(RX_COGNITIVE_SERVICE.cognitiveServiceRegions.systemSettingsKey),
            botLocales: this.rxRecordInstanceDataPageService.post({
                params
            })
        }).subscribe((result) => {
            this.providerServices = RX_COGNITIVE_SERVICE.onboard.providerServices[this.defaultServiceId];
            this.loadCredentialAndRegions(JSON.parse(result.cognitiveServiceCredential.value), JSON.parse(result.cognitiveServiceRegions.value));
            this.setBotLocaleConversation(result.botLocales.data);
            this.loadServiceProviderApiKey();
        });
    }
    isDirty() {
        return this.ownCognitivePoviderConfigurationForm.dirty;
    }
    loadCredentialAndRegions(credentials, serviceRegions) {
        const cognitiveServiceRegions = serviceRegions[RX_COGNITIVE_SERVICE.onboard.providers[this.defaultServiceId]];
        forEach(this.providerServices, (serviceConfig, serviceId) => {
            serviceConfig.apiKey = get(credentials[RX_COGNITIVE_SERVICE.onboard.providers[this.defaultServiceId]], serviceConfig.apiKeyPropertyName, '');
            if (get(cognitiveServiceRegions, serviceId)) {
                const regionValue = this.regions.find((region) => region.id === cognitiveServiceRegions[serviceId]);
                serviceConfig.region = [regionValue];
            }
        });
    }
    setBotLocaleConversation(locales) {
        const localeKey = RX_COGNITIVE_SERVICE.onboard.providerServices[this.defaultServiceId].conversation.id;
        this.providerServices[localeKey].apiKey = get(locales[0], RX_CHATBOT.chatbotLocales.fieldIds.providerPassword, '');
    }
    loadServiceProviderApiKey() {
        forEach(this.providerServices, (serviceConfig) => {
            serviceConfig.isEnabled = serviceConfig.hasApiKey = Boolean(serviceConfig.apiKey);
        });
    }
    isOnboardButtonDisabled() {
        return (this.isOnboardingInProgress ||
            !some(this.providerServices, 'isEnabled') ||
            this.ownCognitivePoviderConfigurationForm.pristine ||
            this.ownCognitivePoviderConfigurationForm.invalid);
    }
    close() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    onboard() {
        this.isOnboardingInProgress = true;
        const onboardSettings = {};
        onboardSettings[RX_COGNITIVE_SERVICE.onboard.providers[this.defaultServiceId]] = transform(this.providerServices, (result, value) => {
            if (!value.hasApiKey && value.isEnabled) {
                result[value.apiKeyPropertyName] = value.apiKey;
                result[value.regionPropertyName] = get(value.region, '0.id', '');
            }
        }, {});
        this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.cognitive.command.ConfigureOwnCognitiveProvidersCommand')
            .execute({ ownCognitiveProvidersConfiguration: JSON.stringify(onboardSettings) })
            .pipe(catchError((err) => {
            this.isOnboardingInProgress = false;
            return throwError(err);
        }))
            .subscribe(() => {
            this.loadServiceProviderApiKey();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_COGNITIVE_SERVICE.notificationMessages.serviceOnboarded));
            this.ownCognitivePoviderConfigurationForm.form.markAsPristine();
            this.isOnboardingInProgress = false;
        });
    }
    keepKeyValueOrder() {
        return 0;
    }
}
CognitiveServiceOnboardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceOnboardComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxCognitiveServiceService }, { token: i3.RxCommandFactoryService }, { token: i4.RxModalService }, { token: i3.RxNotificationService }, { token: i5.RxRecordInstanceDataPageService }, { token: i3.RxSystemConfigurationService }, { token: i6.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceOnboardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceOnboardComponent, selector: "rx-cognitive-service-onboard", inputs: { isAdministrator: "isAdministrator", currentOverlayContext: "currentOverlayContext" }, viewQueries: [{ propertyName: "ownCognitivePoviderConfigurationForm", first: true, predicate: ["ownCognitivePoviderConfigurationForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form #ownCognitivePoviderConfigurationForm=\"ngForm\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <adapt-rx-select\n          name=\"cognitiveProvider\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-service.cognitive-provider.label' | translate }}\"\n          rx-id=\"cognitive-provider\"\n          [options]=\"supportedCognitiveProviders\"\n          [optionFormatter]=\"optionFormatter\"\n          [(ngModel)]=\"cognitiveProvider\"\n        >\n        </adapt-rx-select>\n      </div>\n\n      <div class=\"col-sm-12\">\n        <div class=\"mt-2 mb-2\">\n          {{ 'com.bmc.arsys.rx.client.admin.cognitive-service.onboard-services.instructions.label' | translate }}\n        </div>\n\n        <div class=\"card p-3 mb-3\" *ngFor=\"let service of providerServices | keyvalue: keepKeyValueOrder\">\n          <adapt-rx-switch\n            class=\"form-group\"\n            [name]=\"service.key + 'ProviderEnable'\"\n            [attr.rx-id]=\"'enable-cognitive-service-provider-' + service.key\"\n            [label]=\"service.value.switchLabel | translate\"\n            [(ngModel)]=\"service.value.isEnabled\"\n            [disabled]=\"service.value.hasApiKey\"\n            [tooltip]=\"\n              service.value.tooltipText\n                ? {\n                    iconName: 'question_circle_o',\n                    content: service.value.tooltipText | translate,\n                    placement: 'bottom',\n                    popoverMode: true\n                  }\n                : null\n            \"\n          ></adapt-rx-switch>\n\n          <adapt-rx-select\n            class=\"form-group\"\n            label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-service.region.label' | translate }}\"\n            emptyOption=\"true\"\n            [name]=\"service.key + 'ProviderRegion'\"\n            [attr.rx-id]=\"'cognitive-service-provider-region-' + service.key\"\n            [options]=\"regions\"\n            [optionFormatter]=\"optionFormatter\"\n            [(ngModel)]=\"service.value.region\"\n            [disabled]=\"!service.value.isEnabled || service.value.hasApiKey\"\n          >\n          </adapt-rx-select>\n\n          <adapt-rx-textfield\n            class=\"form-group\"\n            label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-service.api-key.label' | translate }}\"\n            maxlength=\"254\"\n            required=\"true\"\n            [isPassword]=\"true\"\n            [name]=\"service.key + 'ProviderApiKey'\"\n            [attr.rx-id]=\"'cognitive-service-provider-' + service.key + '-api-key'\"\n            [(ngModel)]=\"service.value.apiKey\"\n            [disabled]=\"!service.value.isEnabled || service.value.hasApiKey\"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"dp-footer align-items-end\">\n  <div>\n    <button\n      adapt-button\n      btn-type=\"primary\"\n      type=\"button\"\n      class=\"mr-2\"\n      activeText=\"Onboarding...\"\n      rx-id=\"onboarding-button\"\n      [adaptInlineLoader]=\"isOnboardingInProgress\"\n      [disabled]=\"isOnboardButtonDisabled()\"\n      (click)=\"onboard()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.admin.cognitive-service.onboard-services.button.onboard.label' | translate }}\n    </button>\n    <button\n      adapt-button\n      btn-type=\"secondary\"\n      type=\"button\"\n      rx-id=\"close-button\"\n      (click)=\"close()\"\n      [disabled]=\"isOnboardingInProgress\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</div>\n", components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i6.TranslatePipe, "keyvalue": i8.KeyValuePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceOnboardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-service-onboard',
                    templateUrl: './cognitive-service-onboard.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxCognitiveServiceService }, { type: i3.RxCommandFactoryService }, { type: i4.RxModalService }, { type: i3.RxNotificationService }, { type: i5.RxRecordInstanceDataPageService }, { type: i3.RxSystemConfigurationService }, { type: i6.TranslateService }, { type: i0.Injector }]; }, propDecorators: { isAdministrator: [{
                type: Input
            }], currentOverlayContext: [{
                type: Input
            }], ownCognitivePoviderConfigurationForm: [{
                type: ViewChild,
                args: ['ownCognitivePoviderConfigurationForm', { read: NgForm, static: true }]
            }] } });
//# sourceMappingURL=cognitive-service-onboard.component.js.map