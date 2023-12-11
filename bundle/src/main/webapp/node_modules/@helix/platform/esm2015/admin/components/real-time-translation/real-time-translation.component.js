import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { head, castArray, isEmpty } from 'lodash';
import { RX_REAL_TIME_TRANSLATION } from './real-time-translation.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
export class RealTimeTranslationAdminComponent {
    constructor(rxCommandFactoryService, translateService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.translateService = translateService;
        this.sourceLanguage = [];
        this.targetLanguage = [];
        this.supportedLocaleOptions = RX_REAL_TIME_TRANSLATION.supportedLocales.map((locale) => (Object.assign(Object.assign({}, locale), { name: this.translateService.instant(locale.name) })));
    }
    ngOnInit() {
        this.reset();
    }
    optionFormatter(option) {
        return option.name;
    }
    reset() {
        this.sourceText = this.translatedText = null;
        this.sourceLanguage = [
            Object.assign(Object.assign({}, RX_REAL_TIME_TRANSLATION.defaultSourceLocale), { name: this.translateService.instant(RX_REAL_TIME_TRANSLATION.defaultSourceLocale.name) })
        ];
        this.targetLanguage = [
            Object.assign(Object.assign({}, RX_REAL_TIME_TRANSLATION.defaultTargetLocale), { name: this.translateService.instant(RX_REAL_TIME_TRANSLATION.defaultTargetLocale.name) })
        ];
        this.realTimeTranslationForm.form.markAsPristine();
    }
    translate() {
        this.realTimeTranslationForm.form.markAsPristine();
        this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.cognitive.command.TranslateTextCommand')
            .execute({
            texts: castArray(this.sourceText),
            sourceLanguage: head(this.sourceLanguage).id,
            targetLanguage: head(this.targetLanguage).id
        })
            .subscribe((response) => {
            this.translatedText = head(response);
        });
    }
    clearTexts() {
        this.sourceText = null;
        this.translatedText = null;
    }
    isTranslateButtonDisabled() {
        return this.realTimeTranslationForm.pristine || this.realTimeTranslationForm.invalid;
    }
    isClearButtonDisabled() {
        return isEmpty(this.sourceText) && isEmpty(this.translatedText);
    }
    copyTranslatedText() {
        const element = document.querySelector('[rx-id="translation"] textarea');
        element.select();
        document.execCommand('copy');
    }
    isCopyButtonDisabled() {
        return isEmpty(this.translatedText);
    }
}
RealTimeTranslationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RealTimeTranslationAdminComponent, deps: [{ token: i1.RxCommandFactoryService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RealTimeTranslationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RealTimeTranslationAdminComponent, selector: "rx-admin-real-time-translation", viewQueries: [{ propertyName: "realTimeTranslationForm", first: true, predicate: ["realTimeTranslationForm"], descendants: true, read: NgForm, static: true }], ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.real-time-translation.interactive-translation.header.title' | translate }}\"\n>\n  <form #realTimeTranslationForm=\"ngForm\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-select\n          name=\"sourceLanguage\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.real-time-translation.source-language.label' | translate }}\"\n          rx-id=\"source-language\"\n          class=\"form-group d-block\"\n          [(ngModel)]=\"sourceLanguage\"\n          [options]=\"supportedLocaleOptions\"\n          [optionFormatter]=\"optionFormatter\"\n        ></adapt-rx-select>\n      </div>\n      <div class=\"col-md-6\">\n        <adapt-rx-select\n          name=\"targetLanguage\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.real-time-translation.target-language.label' | translate }}\"\n          rx-id=\"target-language\"\n          class=\"form-group d-block\"\n          [(ngModel)]=\"targetLanguage\"\n          [options]=\"supportedLocaleOptions\"\n          [optionFormatter]=\"optionFormatter\"\n        ></adapt-rx-select>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-textarea\n          name=\"sourceText\"\n          required=\"true\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.real-time-translation.source-text.label' | translate }}\"\n          placeholder=\"{{ 'com.bmc.arsys.rx.client.admin.real-time-translation.source-text.placeholder' | translate }}\"\n          rx-id=\"source-text\"\n          rows=\"18\"\n          class=\"form-group d-block\"\n          [(ngModel)]=\"sourceText\"\n        ></adapt-rx-textarea>\n\n        <div class=\"mb-2\">\n          <button\n            adapt-button\n            btn-type=\"primary\"\n            type=\"button\"\n            class=\"d-icon-file_arrow_right mr-2 mb-2\"\n            rx-id=\"translate-button\"\n            (click)=\"translate()\"\n            [disabled]=\"isTranslateButtonDisabled()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.admin.real-time-translation.translate.label' | translate }}\n          </button>\n\n          <button\n            type=\"button\"\n            adapt-button\n            btn-type=\"secondary\"\n            class=\"d-icon-minus_circle mb-2\"\n            rx-id=\"clear-button\"\n            (click)=\"clearTexts()\"\n            [disabled]=\"isClearButtonDisabled()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.clear.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"col-md-6\">\n        <adapt-rx-textarea\n          name=\"translatedText\"\n          class=\"form-group d-block\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.real-time-translation.translation.label' | translate }}\"\n          rx-id=\"translation\"\n          rows=\"18\"\n          [readonly]=\"true\"\n          [disabledStyleForReadonlyState]=\"true\"\n          [ngModel]=\"translatedText\"\n        ></adapt-rx-textarea>\n\n        <div class=\"mb-4\">\n          <button\n            adapt-button\n            btn-type=\"secondary\"\n            type=\"button\"\n            class=\"d-icon-files_copy_o\"\n            rx-id=\"copy-button\"\n            (click)=\"copyTranslatedText()\"\n            [disabled]=\"isCopyButtonDisabled()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </form>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textarea ::ng-deep textarea{resize:none}adapt-rx-select{max-width:400px}\n"], components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RealTimeTranslationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-real-time-translation',
                    templateUrl: './real-time-translation.component.html',
                    styleUrls: ['./real-time-translation.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }, { type: i2.TranslateService }]; }, propDecorators: { realTimeTranslationForm: [{
                type: ViewChild,
                args: ['realTimeTranslationForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=real-time-translation.component.js.map