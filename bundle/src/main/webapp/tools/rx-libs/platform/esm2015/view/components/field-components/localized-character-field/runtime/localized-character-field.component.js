import { Component, Injector } from '@angular/core';
import { RxLocalizationService } from '@helix/platform/shared/api';
import { cloneDeep, isEqual, noop } from 'lodash';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { LocalizedCharacterFieldValueModalComponent } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export class LocalizedCharacterFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, rxModalService, rxLocalizationService) {
        super(injector);
        this.rxModalService = rxModalService;
        this.rxLocalizationService = rxLocalizationService;
    }
    onConfigUpdated(config) {
        super.onConfigUpdated(config);
        const fieldValue = this.getFieldValue();
        this.hideCurrentLocale = this.getFieldInstanceProp('hideCurrentLocale');
        if (config.value === fieldValue) {
            const valueByLocale = this.getFieldInstanceProp('valueByLocale');
            valueByLocale[this.rxLocalizationService.currentLocale] = fieldValue;
            this.setFieldInstanceProp('valueByLocale', valueByLocale);
        }
    }
    shouldShowValidationError() {
        return this.isRequired && !this.formControl.value && (this.formControl.touched || this.formControl.dirty);
    }
    selectLocalizedValue() {
        const valueByLocale = this.getFieldInstanceProp('valueByLocale');
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.title'),
            data: {
                fieldDefinition: this.fieldDefinition,
                valueByLocale: cloneDeep(valueByLocale),
                hideCurrentLocale: this.hideCurrentLocale
            },
            size: 'sm',
            content: LocalizedCharacterFieldValueModalComponent
        })
            .then((data) => {
            if (data) {
                this.setLocalizedFieldValue(data.valueByLocale, data.currentLocaleValue);
            }
        })
            .catch(noop);
    }
    setLocalizedFieldValue(valueByLocale, currentLocaleValue) {
        const currentLocaleCode = this.rxLocalizationService.currentLocale;
        const defaultLocaleCode = 'en-US';
        const fieldValue = currentLocaleValue || valueByLocale[currentLocaleCode] || valueByLocale[defaultLocaleCode];
        const currentValueByLocale = this.getFieldInstanceProp('valueByLocale');
        if (!isEqual(valueByLocale, currentValueByLocale)) {
            this.setFieldInstanceProp('valueByLocale', valueByLocale);
            this.formControl.markAsDirty();
            this.recordEditorApi.markAsDirty();
        }
        this.setFieldValue(fieldValue);
    }
}
LocalizedCharacterFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldComponent, deps: [{ token: i0.Injector }, { token: i1.RxModalService }, { token: i2.RxLocalizationService }], target: i0.ɵɵFactoryTarget.Component });
LocalizedCharacterFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldComponent, selector: "rx-localized-character-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <span class=\"d-flex justify-content-between\" [class.has-danger]=\"formControl.errors && formControl.touched\">\n    <adapt-rx-control-label [label]=\"label\" [id]=\"guid\" [showRequiredLabel]=\"isRequired\"></adapt-rx-control-label>\n\n    <button\n      type=\"button\"\n      class=\"localize-button btn btn-link focusable d-icon-left-pencil p-0\"\n      [disabled]=\"isDisabled\"\n      [attr.aria-describedby]=\"guid\"\n      (click)=\"selectLocalizedValue()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.button.localize.label' | translate }}\n    </button>\n  </span>\n\n  <adapt-rx-textfield\n    class=\"mb-0\"\n    [readonly]=\"true\"\n    [formControl]=\"formControl\"\n    [disabledStyleForReadonlyState]=\"true\"\n    [required]=\"isRequired\"\n    [attr.aria-describedby]=\"guid\"\n  >\n  </adapt-rx-textfield>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.localize-button:hover{text-decoration:underline}:host ::ng-deep .form-control-feedback{color:#f83200}:host ::ng-deep .has-danger .form-control{border-color:#f83200!important}\n"], components: [{ type: i1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-field',
                    templateUrl: './localized-character-field.component.html',
                    styleUrls: ['./localized-character-field.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxModalService }, { type: i2.RxLocalizationService }]; } });
//# sourceMappingURL=localized-character-field.component.js.map