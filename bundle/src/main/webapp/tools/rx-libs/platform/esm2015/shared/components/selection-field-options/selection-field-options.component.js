import { Component, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdaptButtonComponent } from '@bmc-ux/adapt-angular';
import { RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { find, forEach, isNil, map, noop, pullAllBy } from 'lodash';
import { ValueAccessor } from '../form-builder';
import { SelectionFieldOptionsEditorComponent } from './selection-field-options-editor.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class SelectionFieldOptionsComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.currentOptions = [];
        this.defaultOption = [];
    }
    onWriteValue(currentOptionProperties) {
        const currentOptionsById = (currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.optionNamesById) || this.options.optionNamesById;
        const currentLabelsById = (currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.optionLabelsById) || this.options.optionLabelsById;
        this.currentOptions = map(currentOptionsById, (name, id) => ({
            name,
            id: Number(id),
            stringKey: currentLabelsById[id]
        }));
        this.defaultOption = !isNil(currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.defaultValue)
            ? [find(this.currentOptions, { id: Number(currentOptionProperties.defaultValue) })]
            : [];
    }
    openOptionsEditor() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.title'),
            content: SelectionFieldOptionsEditorComponent,
            data: {
                existingOptions: this.currentOptions,
                isReadOnly: this.options.isReadOnly
            }
        })
            .then((response) => {
            var _a;
            this.value = {
                defaultValue: (_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue,
                optionNamesById: response.optionNamesById,
                optionLabelsById: response.optionLabelsById
            };
            setTimeout(() => {
                this.validateDefaultValue();
            });
        })
            .catch(noop);
    }
    fetchValue(options) {
        var _a;
        const optionNamesById = {};
        const optionKeysById = {};
        forEach(options, (option) => {
            optionNamesById[option.id] = option.name;
        });
        forEach(options, (option) => {
            optionKeysById[option.id] = option.stringKey;
        });
        return { defaultValue: (_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue, optionNamesById, optionLabelsById: optionKeysById };
    }
    validateDefaultValue() {
        var _a;
        if (!isNil((_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue) && !find(this.currentOptions, { id: this.value.defaultValue })) {
            this.defaultOption = [];
            this.value = Object.assign(Object.assign({}, this.value), { defaultValue: null });
        }
    }
    onSelectionChange(event) {
        var _a, _b;
        this.value = Object.assign(Object.assign({}, this.value), { defaultValue: (_b = (_a = event.options[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null });
    }
    focus() {
        this.adaptButtonComponent.elem.nativeElement.focus();
        this.openOptionsEditor();
    }
    optionFormatter(option) {
        return option.name;
    }
    removeOption(option) {
        pullAllBy(this.currentOptions, [option], 'id');
        this.validateDefaultValue();
        this.value = this.fetchValue(this.currentOptions);
    }
}
SelectionFieldOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SelectionFieldOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldOptionsComponent, selector: "rx-selection-field-options", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectionFieldOptionsComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptButtonComponent", first: true, predicate: AdaptButtonComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex\">\n  <adapt-rx-control-label\n    label=\"{{ 'com.bmc.arsys.rx.client.common.options.label' | translate }}\"\n    [showRequiredLabel]=\"true\"\n  >\n  </adapt-rx-control-label>\n\n  <adapt-button btn-type=\"tertiary\" class=\"d-icon-left-pencil p-0 ml-auto\" (click)=\"openOptionsEditor()\"\n    >{{ 'com.bmc.arsys.rx.client.common.edit.label' | translate }}\n  </adapt-button>\n</div>\n\n<div class=\"form-group tags-wrapper\">\n  <adapt-tag\n    [removable]=\"true\"\n    (remove)=\"removeOption(option)\"\n    *ngFor=\"let option of currentOptions\"\n    [type]=\"'active'\"\n    [disabled]=\"options.isReadOnly\"\n  >\n    {{ option.name }}</adapt-tag\n  >\n\n  <div class=\"fade-line position-absolute w-100 text-center\">\n    <span class=\"d-icon-ellipsis_horizontal\"></span>\n  </div>\n</div>\n\n<adapt-rx-select\n  label=\"{{ 'com.bmc.arsys.rx.client.common.default-value.label' | translate }}\"\n  [options]=\"currentOptions\"\n  (onSelectionChange)=\"onSelectionChange($event)\"\n  [(ngModel)]=\"defaultOption\"\n  [optionFormatter]=\"optionFormatter\"\n  [emptyOption]=\"true\"\n  *ngIf=\"!options.hideDefaultValue\"\n  [disabled]=\"options.isReadOnly\"\n>\n</adapt-rx-select>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.tags-wrapper{max-height:140px;position:relative;overflow:hidden}.tags-wrapper .fade-line{top:115px;left:0;height:2rem;z-index:1;background-image:linear-gradient(0deg,white 50%,rgba(255,255,255,0));transition:opacity .25s var(--ease-transition-in-out)}.tags-wrapper .fade-line .d-icon-ellipsis_horizontal:before{position:absolute;bottom:1px}\n"], components: [{ type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-field-options',
                    templateUrl: './selection-field-options.component.html',
                    styleUrls: ['./selection-field-options.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SelectionFieldOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], adaptButtonComponent: [{
                type: ViewChild,
                args: [AdaptButtonComponent]
            }] } });
//# sourceMappingURL=selection-field-options.component.js.map