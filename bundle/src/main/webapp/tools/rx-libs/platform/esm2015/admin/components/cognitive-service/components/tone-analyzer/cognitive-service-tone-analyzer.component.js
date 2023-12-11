import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RX_COGNITIVE_SERVICE } from '../../cognitive-service.constant';
import { RX_OVERLAY, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../cognitive-service.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
export class CognitiveServiceToneAnalyzerComponent {
    constructor(formBuilder, rxCognitiveServiceService, rxNotificationService, rxSystemConfigurationService, translateService) {
        this.formBuilder = formBuilder;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.translateService = translateService;
    }
    ngOnInit() {
        this.toneAnalyzerConfigurationForm = this.formBuilder.group({
            toneScoreThreshold: 0.5
        });
        this.loadSystemSettings();
    }
    isFormDirty() {
        return this.toneAnalyzerConfigurationForm.dirty;
    }
    loadSystemSettings() {
        this.rxSystemConfigurationService
            .getConfiguration(RX_COGNITIVE_SERVICE.toneAnalyzer.systemSettingsKey)
            .subscribe((settingsData) => {
            this.toneAnalyzerConfigurationForm.controls[settingsData.name].setValue(settingsData.value);
        });
    }
    save() {
        this.rxSystemConfigurationService
            .setConfiguration(RX_COGNITIVE_SERVICE.toneAnalyzer.systemSettingsKey, this.toneAnalyzerConfigurationForm.value.toneScoreThreshold)
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_COGNITIVE_SERVICE.notificationMessages.toneAnalyzerConfigurationSaved));
            this.toneAnalyzerConfigurationForm.markAsPristine();
        });
    }
    isSaveButtonDisabled() {
        return this.toneAnalyzerConfigurationForm.pristine || this.toneAnalyzerConfigurationForm.invalid;
    }
    isSaveButtonVisible() {
        return (this.isAdministrator &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
}
CognitiveServiceToneAnalyzerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceToneAnalyzerComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxCognitiveServiceService }, { token: i3.RxNotificationService }, { token: i3.RxSystemConfigurationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceToneAnalyzerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceToneAnalyzerComponent, selector: "rx-cognitive-service-tone-analyzer", inputs: { isAdministrator: "isAdministrator", currentOverlayContext: "currentOverlayContext" }, ngImport: i0, template: "<form [formGroup]=\"toneAnalyzerConfigurationForm\">\n  <adapt-accordion>\n    <adapt-accordion-tab title=\"Tone analyzer configuration\" isOpen=\"true\">\n      <adapt-rx-counter\n        adaptRange\n        label=\"Tone score threshold\"\n        required=\"true\"\n        class=\"d-block form-group\"\n        [max]=\"1\"\n        [min]=\"0.5\"\n        adaptFloatNumber\n        [formControl]=\"toneAnalyzerConfigurationForm.controls.toneScoreThreshold\"\n        [step]=\"0.1\"\n        [tooltip]=\"{\n          iconName: 'question_circle_o',\n          content: popoverContent,\n          placement: 'right',\n          popoverMode: true\n        }\"\n      ></adapt-rx-counter>\n\n      <ng-template #popoverContent>\n        <div\n          style=\"white-space: pre-wrap\"\n          [innerHTML]=\"\n            'com.bmc.arsys.rx.client.admin.cognitive-service.tone-analyzer.tone-score-threshold.tooltip' | translate\n          \"\n        ></div>\n      </ng-template>\n    </adapt-accordion-tab>\n\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"save-button\"\n      btn-type=\"primary\"\n      class=\"mt-4\"\n      [disabled]=\"isSaveButtonDisabled()\"\n      *ngIf=\"isSaveButtonVisible()\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </adapt-accordion>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-counter{max-width:400px}\n"], components: [{ type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.AdaptRangeValidatorDirective, selector: "[adaptRange][ngModel],[adaptRange][formControl]", inputs: ["adaptRange", "adaptRangeMessageFn"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.AdaptFloatNumberValidatorDirective, selector: "[adaptFloatNumber][ngModel], [adaptFloatNumber][formControl]", inputs: ["adaptFloatNumberMessageFn"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceToneAnalyzerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-service-tone-analyzer',
                    templateUrl: './cognitive-service-tone-analyzer.component.html',
                    styleUrls: ['./cognitive-service-tone-analyzer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxCognitiveServiceService }, { type: i3.RxNotificationService }, { type: i3.RxSystemConfigurationService }, { type: i4.TranslateService }]; }, propDecorators: { isAdministrator: [{
                type: Input
            }], currentOverlayContext: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-service-tone-analyzer.component.js.map