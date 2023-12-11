import { Component, Input, forwardRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { noop, some } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class RxNameValuePairsEditorComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.nameValuePairs = [];
        this.addButtonLabel = '';
        this.registerOnTouched = noop;
    }
    writeValue(value) {
        if (value !== this.nameValuePairs) {
            this.nameValuePairs = value;
        }
    }
    registerOnChange(callback) {
        this.onChangeCallback = callback;
    }
    validate(control) {
        return some(this.nameValuePairs, { key: '' }) || some(this.nameValuePairs, { value: '' })
            ? {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.required-field.label'),
                text: this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message')
            }
            : null;
    }
    addNameValuePair() {
        this.nameValuePairs.push({
            key: '',
            value: ''
        });
        this.onChangeCallback(this.nameValuePairs);
    }
    deleteNameValuePair(index) {
        this.nameValuePairs.splice(index, 1);
        this.onChangeCallback(this.nameValuePairs);
    }
}
RxNameValuePairsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxNameValuePairsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNameValuePairsEditorComponent, selector: "rx-name-value-pairs-editor", inputs: { addButtonLabel: "addButtonLabel" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle px-0 align-self-start\"\n    rx-id=\"add-button\"\n    (click)=\"addNameValuePair()\"\n  >\n    {{ addButtonLabel }}\n  </button>\n  <div class=\"d-flex\" *ngFor=\"let pair of nameValuePairs; let $index = index\">\n    <adapt-rx-textfield\n      name=\"name\"\n      [(ngModel)]=\"pair.key\"\n      [required]=\"true\"\n      attr.rx-id=\"name\"\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.name-value-pairs-editor.enter-name.placeholder' | translate }}\"\n      class=\"d-block form-group pr-4 flex-fill\"\n      (ngModelChange)=\"onChangeCallback(nameValuePairs)\"\n      [autofocus]=\"true\"\n    ></adapt-rx-textfield>\n    <adapt-rx-textfield\n      name=\"value\"\n      [(ngModel)]=\"pair.value\"\n      [required]=\"true\"\n      attr.rx-id=\"value\"\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.name-value-pairs-editor.enter-value.placeholder' | translate }}\"\n      class=\"d-block form-group pr-4 flex-fill\"\n      (ngModelChange)=\"onChangeCallback(nameValuePairs)\"\n    ></adapt-rx-textfield>\n    <button\n      class=\"d-icon-trash form-group px-0\"\n      adapt-button\n      btn-type=\"tertiary\"\n      type=\"button\"\n      (click)=\"deleteNameValuePair($index)\"\n    ></button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-name-value-pairs-editor',
                    templateUrl: './name-value-pairs-editor.component.html',
                    styleUrls: ['./name-value-pairs-editor.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { addButtonLabel: [{
                type: Input
            }] } });
//# sourceMappingURL=name-value-pairs-editor.component.js.map