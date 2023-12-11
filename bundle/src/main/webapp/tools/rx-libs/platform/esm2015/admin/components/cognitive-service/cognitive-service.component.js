import { Component, ViewChild } from '@angular/core';
import { RX_OVERLAY, RxCurrentUserService, RxOverlayService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { noop, reject } from 'lodash';
import { RX_COGNITIVE_SERVICE } from './cognitive-service.constant';
import { RxCognitiveServiceService } from './cognitive-service.service';
import { CognitiveServiceOnboardComponent } from './components/onboard/cognitive-service-onboard.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "./cognitive-service.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "./components/chatbot/cognitive-service-chatbot.component";
import * as i8 from "./components/administration-credentials/cognitive-service-administration-credentials.component";
import * as i9 from "./components/connections/cognitive-service-connections.component";
import * as i10 from "./components/summarization/cognitive-service-summarization.component";
import * as i11 from "./components/regions/cognitive-service-regions.component";
import * as i12 from "./components/tone-analyzer/cognitive-service-tone-analyzer.component";
import * as i13 from "@angular/common";
import * as i14 from "@angular/forms";
export class CognitiveServiceAdminComponent extends BaseViewComponent {
    constructor(rxModalService, rxCognitiveServiceService, rxCurrentUserService, rxOverlayService, rxSystemConfigurationService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxOverlayService = rxOverlayService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
        this.cognitiveServices = RX_COGNITIVE_SERVICE.cognitiveServicesList.map((service) => (Object.assign(Object.assign({}, service), { name: this.translateService.instant(service.name) })));
        this.selectedService = [this.cognitiveServices[2]];
        this.supportedCognitiveServices = [];
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
        this.currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.selectedConfiguration.isFormDirty()
        });
        this.rxSystemConfigurationService
            .getConfiguration(RX_COGNITIVE_SERVICE.connections.systemSettingKeys.classificationServiceProvider)
            .subscribe((settingsData) => {
            let cognitiveServices = this.cognitiveServices;
            if (RX_COGNITIVE_SERVICE.nativeProvider === settingsData.value) {
                this.isNativeClassificationProvider = true;
                cognitiveServices = reject(cognitiveServices, {
                    id: RX_COGNITIVE_SERVICE.cognitiveServicesList[1].id
                });
            }
            this.supportedCognitiveServices = cognitiveServices;
        });
    }
    optionFormatter(option) {
        return option.name;
    }
    getSelectedServiceId() {
        return this.selectedService[0].id;
    }
    isOwnCognitiveProviderButtonVisible() {
        return (this.isAdministrator &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
    openOnboardServicesPanel() {
        this.rxModalService
            .openDockedPanel({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-service.onboard-services.label'),
            content: CognitiveServiceOnboardComponent,
            size: 'lg'
        })
            .catch(noop);
    }
}
CognitiveServiceAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceAdminComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxCognitiveServiceService }, { token: i3.RxCurrentUserService }, { token: i3.RxOverlayService }, { token: i3.RxSystemConfigurationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceAdminComponent, selector: "rx-admin-cognitive-service", viewQueries: [{ propertyName: "selectedConfiguration", first: true, predicate: ["selectedConfiguration"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\" {{ 'com.bmc.arsys.rx.client.admin.cognitive-service.header.title' | translate }} \">\n  <div class=\"mb-4 d-flex align-items-baseline\" *ngIf=\"isOwnCognitiveProviderButtonVisible()\">\n    <adapt-button\n      class=\"text-truncate\"\n      rx-id=\"onboard-services-button\"\n      btn-type=\"secondary\"\n      (click)=\"openOnboardServicesPanel()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.admin.cognitive-service-component.button.title' | translate }}\n    </adapt-button>\n\n    <adapt-icon\n      name=\"question_circle_o\"\n      class=\"ml-2\"\n      placement=\"bottom\"\n      maxWidth=\"400\"\n      [adaptPopover]=\"'com.bmc.arsys.rx.client.admin.cognitive-service-component.tooltip' | translate\"\n    >\n    </adapt-icon>\n  </div>\n\n  <div class=\"mb-4 align-items-end\">\n    <adapt-rx-select\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-service.configure.label' | translate }}\"\n      [options]=\"supportedCognitiveServices\"\n      [(ngModel)]=\"selectedService\"\n      [optionFormatter]=\"optionFormatter\"\n    >\n    </adapt-rx-select>\n  </div>\n\n  <div class=\"row pb-4\">\n    <div [ngSwitch]=\"getSelectedServiceId()\" class=\"col-12\">\n      <rx-cognitive-service-chatbot\n        [isAdministrator]=\"isAdministrator\"\n        [currentOverlayContext]=\"currentOverlayContext\"\n        *ngSwitchCase=\"cognitiveServices[0].id\"\n        #selectedConfiguration\n      >\n      </rx-cognitive-service-chatbot>\n\n      <rx-cognitive-service-administration-credentials\n        [isAdministrator]=\"isAdministrator\"\n        [currentOverlayContext]=\"currentOverlayContext\"\n        *ngSwitchCase=\"cognitiveServices[1].id\"\n        #selectedConfiguration\n      ></rx-cognitive-service-administration-credentials>\n\n      <rx-cognitive-service-connections\n        [isAdministrator]=\"isAdministrator\"\n        [currentOverlayContext]=\"currentOverlayContext\"\n        [isNativeClassificationProvider]=\"isNativeClassificationProvider\"\n        *ngSwitchCase=\"cognitiveServices[2].id\"\n        #selectedConfiguration\n      ></rx-cognitive-service-connections>\n\n      <rx-cognitive-service-summarization\n        [isAdministrator]=\"isAdministrator\"\n        [currentOverlayContext]=\"currentOverlayContext\"\n        *ngSwitchCase=\"cognitiveServices[3].id\"\n        #selectedConfiguration\n      ></rx-cognitive-service-summarization>\n\n      <rx-cognitive-service-regions\n        [isAdministrator]=\"isAdministrator\"\n        [currentOverlayContext]=\"currentOverlayContext\"\n        *ngSwitchCase=\"cognitiveServices[4].id\"\n        #selectedConfiguration\n      ></rx-cognitive-service-regions>\n\n      <rx-cognitive-service-tone-analyzer\n        [isAdministrator]=\"isAdministrator\"\n        [currentOverlayContext]=\"currentOverlayContext\"\n        *ngSwitchCase=\"cognitiveServices[5].id\"\n        #selectedConfiguration\n      ></rx-cognitive-service-tone-analyzer>\n    </div>\n  </div>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-select{max-width:400px}\n"], components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i6.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i6.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7.CognitiveServiceChatbotComponent, selector: "rx-cognitive-service-chatbot", inputs: ["isAdministrator", "currentOverlayContext"] }, { type: i8.CognitiveServiceAdministrationCredentialsComponent, selector: "rx-cognitive-service-administration-credentials", inputs: ["isAdministrator", "currentOverlayContext"] }, { type: i9.CognitiveServiceConnectionsComponent, selector: "rx-cognitive-service-connections", inputs: ["isAdministrator", "currentOverlayContext", "isNativeClassificationProvider"] }, { type: i10.CognitiveServiceSummarizationComponent, selector: "rx-cognitive-service-summarization", inputs: ["isAdministrator", "currentOverlayContext"] }, { type: i11.CognitiveServiceRegionsComponent, selector: "rx-cognitive-service-regions", inputs: ["isAdministrator", "currentOverlayContext"] }, { type: i12.CognitiveServiceToneAnalyzerComponent, selector: "rx-cognitive-service-tone-analyzer", inputs: ["isAdministrator", "currentOverlayContext"] }], directives: [{ type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i14.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i14.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i13.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i13.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-cognitive-service',
                    templateUrl: './cognitive-service.component.html',
                    styleUrls: ['./cognitive-service.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxCognitiveServiceService }, { type: i3.RxCurrentUserService }, { type: i3.RxOverlayService }, { type: i3.RxSystemConfigurationService }, { type: i4.TranslateService }]; }, propDecorators: { selectedConfiguration: [{
                type: ViewChild,
                args: ['selectedConfiguration']
            }] } });
//# sourceMappingURL=cognitive-service.component.js.map