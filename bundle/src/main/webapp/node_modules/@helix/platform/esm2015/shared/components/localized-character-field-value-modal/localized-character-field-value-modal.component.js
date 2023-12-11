import { Component, Injector, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION, RxLocaleService } from '@helix/platform/record/api';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { flow, mapValues, reject } from 'lodash';
import { RxLocalizationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { NgForm } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
import * as i7 from "@ngx-translate/core";
export class LocalizedCharacterFieldValueModalComponent extends RxModalClass {
    constructor(activeModalRef, rxLocaleService, rxLocalizationService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxLocaleService = rxLocaleService;
        this.rxLocalizationService = rxLocalizationService;
        this.injector = injector;
        this.isCurrentLocaleSupported = true;
        this.data = this.activeModalRef.getData();
        this.isReadOnly = this.data.isReadOnly;
    }
    isDirty() {
        return this.localeForm.dirty;
    }
    ngOnInit() {
        super.ngOnInit();
        this.init();
    }
    init() {
        this.currentLocaleCode = this.rxLocalizationService.currentLocale;
        this.valueByLocale = this.data.valueByLocale || {};
        this.fieldDefinition = this.data.fieldDefinition || {};
        this.maxLength = this.fieldDefinition.maxLength || null;
        this.getLocalesSubscription = this.rxLocaleService.getLocales().subscribe(({ data }) => {
            const browserLocale = {
                name: 'Browser - Locale',
                code: this.currentLocaleCode,
                value: this.valueByLocale[this.currentLocaleCode]
            };
            this.locales = data.map((locale) => {
                const localeCode = locale[RX_RECORD_DEFINITION.supportedSystemLocales.codeFieldId];
                return {
                    name: locale[RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId],
                    code: localeCode,
                    value: this.valueByLocale[localeCode] || null
                };
            });
            this.defaultLocale = {
                name: 'English - United States',
                code: 'en-US',
                value: this.valueByLocale['en-US']
            };
            this.currentLocale = this.locales.find((locale) => {
                return locale.code.toLowerCase() === this.currentLocaleCode.toLowerCase();
            });
            if (!this.currentLocale || this.currentLocale.code === this.defaultLocale.code) {
                this.currentLocale = browserLocale;
                this.isCurrentLocaleSupported = false;
            }
            this.gridLocales = flow((locales) => reject(locales, { code: this.defaultLocale.code }), (locales) => reject(locales, (locale) => {
                return !this.data.hideCurrentLocale && locale.code === this.currentLocale.code;
            }))(this.locales);
        });
    }
    ok() {
        if (this.isCurrentLocaleSupported) {
            this.valueByLocale[this.currentLocale.code] = this.currentLocale.value;
        }
        this.activeModalRef.close({
            currentLocaleValue: (this.currentLocale.code === this.defaultLocale.code && this.valueByLocale[this.defaultLocale.code]) ||
                this.valueByLocale[this.currentLocale.code] ||
                this.valueByLocale[this.currentLocale.code.split('-')[0]] ||
                this.valueByLocale[this.defaultLocale.code],
            valueByLocale: mapValues(this.valueByLocale, (value) => value || null)
        });
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
LocalizedCharacterFieldValueModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldValueModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxLocaleService }, { token: i3.RxLocalizationService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
LocalizedCharacterFieldValueModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldValueModalComponent, selector: "rx-localized-character-field-value-modal", viewQueries: [{ propertyName: "localeForm", first: true, predicate: ["localeForm"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form name=\"localeForm\" novalidate #localeForm=\"ngForm\">\n    <rx-busy-indicator [options]=\"{ busy: getLocalesSubscription }\"></rx-busy-indicator>\n\n    <div class=\"flex-container row\" *ngIf=\"!data.hideCurrentLocale && currentLocale\">\n      <div class=\"col-4\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.current-locale.label' | translate\n          }}\"\n        >\n        </adapt-rx-control-label>\n        <div class=\"rx-locale-name\" rx-id=\"current-locale-name\">{{ currentLocale?.name }}</div>\n      </div>\n\n      <div class=\"col-2\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate\n          }}\"\n        >\n        </adapt-rx-control-label>\n        <div class=\"rx-locale-name\" rx-id=\"current-locale-code\">{{ currentLocale?.code }}</div>\n      </div>\n\n      <div class=\"col-6\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value.label' | translate\n          }}\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content:\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-current-locale.tooltip'\n              | translate,\n            placement: 'auto',\n            popoverMode: true\n          }\"\n        >\n        </adapt-rx-control-label>\n\n        <adapt-rx-textfield\n          name=\"current-locale\"\n          rx-id=\"current-locale-value\"\n          [disabled]=\"!isCurrentLocaleSupported || isReadOnly\"\n          [maxlength]=\"maxLength\"\n          [(ngModel)]=\"currentLocale.value\"\n          [ariaLabel]=\"\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-current-locale.label'\n              | translate\n          \"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.default-locale.label'\n                | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n          <div class=\"rx-locale-name\" rx-id=\"default-locale-name\">{{ defaultLocale?.name }}</div>\n        </div>\n\n        <div class=\"col-2\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n\n          <div class=\"rx-locale-name\" rx-id=\"default-locale-code\">{{ defaultLocale?.code }}</div>\n        </div>\n\n        <div class=\"col-6\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value.label' | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n\n          <adapt-rx-textfield\n            name=\"default-locale\"\n            rx-id=\"default-locale-value\"\n            [maxlength]=\"maxLength\"\n            [(ngModel)]=\"valueByLocale[defaultLocale?.code]\"\n            [disabled]=\"isReadOnly\"\n            [ariaLabel]=\"\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-default-locale.label'\n                | translate\n            \"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"rx-locale-table container\" *ngIf=\"gridLocales?.length > 0\">\n      <div class=\"rx-locale-table-row row\">\n        <div class=\"rx-locale-table-cell pl-0 col-4\">\n          <h6>\n            {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.locale.label' | translate }}*\n          </h6>\n        </div>\n\n        <div class=\"rx-locale-table-cell pl-2 col-2\">\n          <h6>\n            {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate }}\n          </h6>\n        </div>\n\n        <div class=\"rx-locale-table-cell col-6\">\n          <h6>\n            {{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.localized-value.label'\n                | translate\n            }}\n          </h6>\n        </div>\n      </div>\n\n      <div class=\"rx-locale-table-row row\" *ngFor=\"let locale of gridLocales\">\n        <div class=\"rx-locale-table-cell pl-0 col-4\">{{ locale.name }}</div>\n        <div class=\"rx-locale-table-cell pl-2 col-2\">{{ locale.code }}</div>\n        <div class=\"rx-locale-table-cell pr-0 col-6\">\n          <adapt-rx-textfield\n            name=\"localized-value {{ locale.code }}\"\n            [maxlength]=\"maxLength\"\n            [(ngModel)]=\"valueByLocale[locale.code]\"\n            [disabled]=\"isReadOnly\"\n            [ariaLabel]=\"\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.localized-value-for.label'\n                | translate: { locale: locale.name }\n            \"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"localeForm.pristine || localeForm.invalid\"\n    (click)=\"ok()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"close()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.flex-container{margin-bottom:15px}.flex-container .rx-locale-name{line-height:3}.flex-container .d-textfield__item{color:#959899;display:block;padding-bottom:10px;font-size:14px;line-height:1}.rx-locale-table{border:1px solid #d6d7d8;border-bottom:0;width:100%}.rx-locale-table .rx-locale-table-row{border-bottom:1px solid #d6d7d8;padding:5px;min-height:35px}.rx-locale-table .rx-locale-table-row .rx-locale-table-cell{line-height:3}.rx-locale-table .rx-locale-table-row .rx-locale-table-cell h6{margin:0;line-height:2rem;color:#959899}:host::ng-deep .form-group{margin-bottom:0}\n"], components: [{ type: i4.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldValueModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-field-value-modal',
                    templateUrl: './localized-character-field-value-modal.component.html',
                    styleUrls: ['./localized-character-field-value-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxLocaleService }, { type: i3.RxLocalizationService }, { type: i0.Injector }]; }, propDecorators: { localeForm: [{
                type: ViewChild,
                args: ['localeForm']
            }] } });
//# sourceMappingURL=localized-character-field-value-modal.component.js.map