import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { get, isNil, toNumber } from 'lodash';
import { RX_TONE_ANALYSIS_TESTING } from '../tone-analysis-testing.constant';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import { finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-translate/core";
export class DocumentToneAnalysisComponent {
    constructor(rxCommandFactoryService, rxSystemConfigurationService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.languageOptions = RX_TONE_ANALYSIS_TESTING.languageOptions;
        this.language = [];
        this.defaultToneScoreThreshold = 0.5;
    }
    ngOnInit() {
        this.rxSystemConfigurationService
            .getConfiguration(RX_TONE_ANALYSIS_TESTING.systemSettingKeys.toneScoreThreshold)
            .pipe(finalize(() => this.reset()))
            .subscribe((data) => {
            this.defaultToneScoreThreshold = data.value ? toNumber(data.value) : 0.5;
        });
    }
    clearDocumentText() {
        this.documentText = null;
    }
    optionFormatter(option) {
        return option.name;
    }
    setDefaultThreshold() {
        this.toneScoreThreshold = this.defaultToneScoreThreshold;
    }
    analyzeTone() {
        this.rxCommandFactoryService
            .forResourceType(RX_TONE_ANALYSIS_TESTING.documentEngagementResourceType)
            .execute({
            resourceType: RX_TONE_ANALYSIS_TESTING.documentEngagementResourceType,
            language: get(this.language[0], 'id'),
            text: this.documentText,
            containsHTML: this.containsHtml,
            sentenceLevelAnalysis: this.includeSentenceLevelAnalysis,
            toneScoreThreshold: this.toneScoreThreshold
        })
            .subscribe((response) => {
            this.extractedToneData = response;
        });
    }
    reset() {
        this.language = [RX_TONE_ANALYSIS_TESTING.languageOptions[0]];
        this.documentText = null;
        this.toneScoreThreshold = this.defaultToneScoreThreshold;
        this.containsHtml = false;
        this.includeSentenceLevelAnalysis = false;
        this.extractedToneData = null;
        this.documentToneAnalysisForm.form.markAsPristine();
    }
    isAnalyzeToneButtonDisabled() {
        return this.documentToneAnalysisForm.pristine || this.documentToneAnalysisForm.invalid;
    }
    isResetButtonDisabled() {
        return this.documentToneAnalysisForm.pristine && isNil(this.documentText);
    }
}
DocumentToneAnalysisComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentToneAnalysisComponent, deps: [{ token: i1.RxCommandFactoryService }, { token: i1.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Component });
DocumentToneAnalysisComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentToneAnalysisComponent, selector: "rx-document-tone-analysis", viewQueries: [{ propertyName: "documentToneAnalysisForm", first: true, predicate: ["documentToneAnalysisForm"], descendants: true, read: NgForm, static: true }], ngImport: i0, template: "<form #documentToneAnalysisForm=\"ngForm\">\n  <div class=\"row mb-4\">\n    <div class=\"col-md-3\">\n      <adapt-rx-select\n        rx-id=\"language\"\n        name=\"language\"\n        [(ngModel)]=\"language\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.language.label' | translate }}\"\n        [options]=\"languageOptions\"\n        [optionFormatter]=\"optionFormatter\"\n      ></adapt-rx-select>\n    </div>\n\n    <div class=\"col-md-3 contains-html\">\n      <adapt-rx-checkbox\n        rx-id=\"document-text-contains-html\"\n        name=\"containsHtml\"\n        [(ngModel)]=\"containsHtml\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.tone-analysis-testing.document-text-contains-html.label' | translate\n        }}\"\n      ></adapt-rx-checkbox>\n    </div>\n\n    <div class=\"col-md-6\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.document-tone.label' | translate }}\"\n      ></adapt-rx-control-label>\n      <div class=\"mt-1\">\n        <adapt-badge variant=\"info\" *ngIf=\"!extractedToneData\">\n          {{ 'com.bmc.arsys.rx.client.common.none.label' | translate }}\n        </adapt-badge>\n        <adapt-badge variant=\"info\" class=\"mr-1\" *ngFor=\"let score of extractedToneData?.documentTone?.scores\">\n          <b>{{ score.toneName }}</b> ({{ score.score }})\n        </adapt-badge>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-6 form-group\">\n      <button\n        rx-id=\"clear-button\"\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        class=\"p-0 float-right\"\n        (click)=\"clearDocumentText()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.clear.label' | translate }}\n      </button>\n\n      <adapt-rx-textarea\n        rx-id=\"document-text\"\n        name=\"documentText\"\n        [(ngModel)]=\"documentText\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.document-text.label' | translate }}\"\n        placeholder=\"Type or paste document text here\"\n        [rows]=\"12\"\n        required\n      ></adapt-rx-textarea>\n\n      <div class=\"form-group pt-3\">\n        <button\n          type=\"button\"\n          adapt-button\n          btn-type=\"tertiary\"\n          rx-id=\"set-to-default-button\"\n          class=\"p-0 float-right\"\n          (click)=\"setDefaultThreshold()\"\n        >\n          {{ 'com.bmc.arsys.rx.client.admin.set-to-default.label' | translate }}\n        </button>\n\n        <adapt-rx-counter\n          rx-id=\"tone-score-threshold\"\n          name=\"toneScoreThresholdField\"\n          [(ngModel)]=\"toneScoreThreshold\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.tone-score-threshold.label' | translate }}\"\n          [max]=\"1.0\"\n          [min]=\"0.5\"\n          [step]=\"0.1\"\n          [size]=\"'small'\"\n          adaptRequired\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content: 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.tone-score-threshold.tooltip' | translate,\n            placement: 'right',\n            popoverMode: true\n          }\"\n        >\n        </adapt-rx-counter>\n      </div>\n\n      <div class=\"form-group\">\n        <adapt-rx-switch\n          rx-id=\"include-sentence-level-analysis\"\n          name=\"includeSentenceLevelAnalysis\"\n          [(ngModel)]=\"includeSentenceLevelAnalysis\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.tone-analysis-testing.include-sentence-level-analysis.label' | translate\n          }}\"\n        ></adapt-rx-switch>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-12 form-group\">\n          <button\n            class=\"mr-2 d-icon-left-check_adapt\"\n            adapt-button\n            btn-type=\"primary\"\n            type=\"button\"\n            rx-id=\"analyze-tone-button\"\n            (click)=\"analyzeTone()\"\n            [disabled]=\"isAnalyzeToneButtonDisabled()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.admin.tone-analysis-testing.analyze-tone.label' | translate }}\n          </button>\n\n          <button\n            class=\"mr-2 d-icon-left-undo\"\n            adapt-button\n            btn-type=\"secondary\"\n            type=\"button\"\n            rx-id=\"reset-button\"\n            (click)=\"reset()\"\n            [disabled]=\"isResetButtonDisabled()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.reset.label' | translate }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-6 form-group\">\n      <div rx-id=\"sentences-tone\" name=\"sentenceTone\">\n        <adapt-rx-control-label label=\"Sentences tone\"></adapt-rx-control-label>\n        <div class=\"sentences-tones form-control\">\n          <div class=\"sentences-tone\" *ngFor=\"let sentenceTone of extractedToneData?.sentencesTone\">\n            <div class=\"sentence\">{{ sentenceTone.text }}</div>\n            <div>\n              <adapt-badge class=\"mr-1\" variant=\"info\" *ngFor=\"let score of sentenceTone?.scores\">\n                <b>{{ score.toneName }}</b> ({{ score.score }})</adapt-badge\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-select[rx-id=user-language]{max-width:400px;min-width:auto}.sentences-tones{border:1px solid #d6d7d8;height:430px;overflow-y:auto}.sentences-tones .sentences-tone{padding-bottom:10px}.sentences-tones .sentences-tone .sentence:before{content:open-quote}.sentences-tones .sentences-tone .sentence:after{content:close-quote}.contains-html{display:flex;justify-content:center;align-content:center;flex-direction:column;margin-top:1.9%}\n"], components: [{ type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i2.AdaptBadgeComponent, selector: "adapt-badge", inputs: ["animate", "showAlert", "variant", "alertVariant", "customCls"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i2.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentToneAnalysisComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-document-tone-analysis',
                    templateUrl: './document-tone-analysis.component.html',
                    styleUrls: ['./document-tone-analysis.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }, { type: i1.RxSystemConfigurationService }]; }, propDecorators: { documentToneAnalysisForm: [{
                type: ViewChild,
                args: ['documentToneAnalysisForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=document-tone-analysis.component.js.map