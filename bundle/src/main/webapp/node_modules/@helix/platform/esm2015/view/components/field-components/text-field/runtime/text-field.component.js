import { Component, Injector, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { compact, find, first, get, includes, isEqual, isNil } from 'lodash';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { TextFieldMultiSelectionType } from './text-field.types';
import { RxNamedListDefinitionService, RxNamedListService } from '@helix/platform/named-list/api';
import { combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, pluck, shareReplay, startWith, take, takeUntil } from 'rxjs/operators';
import { RxSelectWithPaginationComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/named-list/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export class TextFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, fieldDefinitionService, rxNamedListDefinitionService, rxNamedListService) {
        super(injector);
        this.fieldDefinitionService = fieldDefinitionService;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.rxNamedListService = rxNamedListService;
        this.optionLoaderFunc = this.getNamedListOptionPage.bind(this);
        this.viewToModelValueAdapterFunc = this.viewToModelValueAdapter.bind(this);
        this.modelToViewValueAdapterFunc = this.modelToViewValueAdapter.bind(this);
        this.selectedOptions = [];
        this.multiSelectDelimiter = ';';
        this.isDropdownOpen = false;
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        this.isPasswordField =
            includes(RX_RECORD_DEFINITION.passwordFieldIds, this.fieldId) || this.fieldDefinition.shouldPersistHashed;
        this.namedListDefinitionName = this.fieldDefinition.namedListDefinition;
        this.isNamedListAttached = Boolean(this.namedListDefinitionName);
        this.isMultipleSelectionEnabled = config.enableMultiSelection === TextFieldMultiSelectionType.Enabled;
        if (this.fieldDefinition.maxLength && !this.fieldDefinitionService.isSystemField(this.fieldDefinition)) {
            this.maxLength = this.fieldDefinition.maxLength;
        }
        if (this.isNamedListAttached) {
            const namedListDefinition$ = this.rxNamedListDefinitionService
                .get(this.namedListDefinitionName)
                .pipe(shareReplay(1), take(1));
            const valueChanges$ = this.formControl.valueChanges.pipe(distinctUntilChanged(isEqual), startWith(this.formControl.value), filter(() => !this.isDropdownOpen), takeUntil(this.destroyed$));
            this.config
                .pipe(debounceTime(250), pluck('additionalQueryCriteria'), distinctUntilChanged(), takeUntil(this.destroyed$))
                .subscribe((additionalQueryCriteria) => {
                if (!isNil(this.additionalQueryCriteria)) {
                    this.selectWithPaginationComponent.resetLoadedOptions();
                    this.setFieldValue(null);
                }
                this.additionalQueryCriteria = additionalQueryCriteria;
            });
            combineLatest([namedListDefinition$, valueChanges$]).subscribe(([namedListDefinition]) => {
                this.namedListDefinition = namedListDefinition;
                this.updateSelection();
            });
        }
    }
    getDisplayValue() {
        let displayValue = super.getDisplayValue();
        if (this.isPasswordField) {
            displayValue = '********';
        }
        else if (this.isNamedListAttached) {
            displayValue = this.namedListFormattedValue;
        }
        return displayValue;
    }
    getNamedListOptionPage(startIndex, pageSize, searchQuery) {
        return this.rxNamedListService.getOptionPage(this.namedListDefinition, searchQuery, this.additionalQueryCriteria, startIndex, pageSize);
    }
    // [{displayValue: 'FOO', value: 'foo'}, {displayValue: 'BAR', value: 'bar'}] -> 'foo;bar'
    viewToModelValueAdapter(selectedOptions) {
        this.selectedOptions = selectedOptions;
        this.updateNamedListFormattedValue();
        return selectedOptions.map((option) => option.value).join(this.multiSelectDelimiter);
    }
    // 'foo;bar' -> [{displayValue: 'FOO', value: 'foo'}, {displayValue: 'BAR', value: 'bar'}]
    modelToViewValueAdapter(modelValue) {
        return modelValue ? this.selectedOptions : [];
    }
    onToggleDropdown(isOpen) {
        this.isDropdownOpen = isOpen;
    }
    getOptionValues(modelValue) {
        return modelValue ? compact(modelValue.split(this.multiSelectDelimiter)) : [];
    }
    // Update selection by form control value.
    // Usually, this needs to be done when form control value changes programmatically, e.g:
    // - in initialization text field component phase
    // - by set property action
    // - after record editor record instance id change
    updateSelection() {
        this.showDefaultTitle = false;
        const selectedOptionValues = this.getOptionValues(this.formControl.value);
        if (!this.isMultipleSelectionEnabled && selectedOptionValues.length > 1) {
            // If the field instance contains multiple values but the component doesn't have multiple selection enabled
            // e.g. when field was edited in the data editor, the display value will be blank (null).
            this.selectedOptions = [
                {
                    displayValue: null,
                    value: this.formControl.value
                }
            ];
            this.triggerModelToViewValueUpdate();
            this.updateNamedListFormattedValue();
        }
        else {
            // Select with pagination component is not available in the record editor READ mode.
            const loadedOptions = get(this.selectWithPaginationComponent, 'options', []);
            // Check if all options for selected values are already loaded.
            (selectedOptionValues.every((selectedValue) => loadedOptions.find((option) => option.value === selectedValue))
                ? of(loadedOptions)
                : this.rxNamedListService.getOptionsForValues(this.namedListDefinition, selectedOptionValues)).subscribe((options) => {
                this.showDefaultTitle = true;
                if (!this.isMultipleSelectionEnabled && selectedOptionValues.length > 1) {
                    // If the field instance contains multiple values but the component doesn't have multiple selection
                    // enabled e.g. when field was edited in the data editor, the display value will be blank (null).
                    this.selectedOptions = [
                        {
                            displayValue: null,
                            value: this.formControl.value
                        }
                    ];
                }
                else {
                    // If the record instance with a given value is not found e.g. referenced record
                    // was deleted, the display value for such record instance will be blank (null).
                    this.selectedOptions = selectedOptionValues.map((optionValue) => find(options, { value: optionValue }) || {
                        displayValue: null,
                        value: optionValue
                    });
                }
                if (this.formControl.dirty) {
                    this.formControl.markAsTouched();
                }
                this.triggerModelToViewValueUpdate();
                this.updateNamedListFormattedValue();
            });
        }
    }
    updateNamedListFormattedValue() {
        if (this.isMultipleSelectionEnabled) {
            const visibleOptionsCount = 50;
            this.namedListFormattedValue =
                this.selectedOptions
                    .slice(0, visibleOptionsCount)
                    .map((option) => option.displayValue)
                    .filter(Boolean)
                    .join(', ') || null;
            if (this.selectedOptions.length >= visibleOptionsCount) {
                this.namedListFormattedValue += '...';
            }
        }
        else {
            this.namedListFormattedValue = this.selectedOptions.length ? first(this.selectedOptions).displayValue : null;
        }
    }
    triggerModelToViewValueUpdate() {
        // trigger writeValue function in the control value accessor
        this.formControl.setValue(this.formControl.value, { emitEvent: false });
    }
}
TextFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldComponent, deps: [{ token: i0.Injector }, { token: i1.RxFieldDefinitionService }, { token: i2.RxNamedListDefinitionService }, { token: i2.RxNamedListService }], target: i0.ɵɵFactoryTarget.Component });
TextFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextFieldComponent, selector: "rx-text-field", viewQueries: [{ propertyName: "selectWithPaginationComponent", first: true, predicate: RxSelectWithPaginationComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-textfield\n    *ngIf=\"!isNamedListAttached\"\n    [label]=\"label\"\n    [isPassword]=\"isPasswordField\"\n    [formControl]=\"formControl\"\n    [maxlength]=\"maxLength\"\n    [required]=\"isRequired\"\n    [readonly]=\"isDisabled\"\n    [disabledStyleForReadonlyState]=\"true\"\n    [autocomplete]=\"!isPasswordField\"\n    [requiredLabel]=\"'com.bmc.arsys.rx.client.common.required-field.label' | translate\"\n  ></adapt-rx-textfield>\n\n  <rx-select-with-pagination\n    *ngIf=\"isNamedListAttached\"\n    [showDefaultTitle]=\"showDefaultTitle\"\n    [label]=\"label\"\n    [formControl]=\"formControl\"\n    [readonly]=\"isDisabled\"\n    [viewToModelValueAdapter]=\"viewToModelValueAdapterFunc\"\n    [modelToViewValueAdapter]=\"modelToViewValueAdapterFunc\"\n    [optionLoader]=\"optionLoaderFunc\"\n    [required]=\"isRequired\"\n    [isMultiSelectionMode]=\"isMultipleSelectionEnabled\"\n    (toggleDropdown)=\"onToggleDropdown($event)\"\n    [template]=\"namedListOptionTemplate\"\n  ></rx-select-with-pagination>\n</ng-template>\n\n<ng-template #namedListOptionTemplate let-option>\n  {{ option.displayValue }}\n  <div *ngIf=\"option.contextualFields\" class=\"text-secondary text-truncate\" [title]=\"option.title\">\n    <span class=\"breadcrumb-item active\" *ngFor=\"let contextualFieldValue of option.contextualFields\">\n      <small> {{ contextualFieldValue }} </small>\n    </span>\n  </div>\n</ng-template>\n", components: [{ type: i3.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i7.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-text-field',
                    templateUrl: './text-field.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxFieldDefinitionService }, { type: i2.RxNamedListDefinitionService }, { type: i2.RxNamedListService }]; }, propDecorators: { selectWithPaginationComponent: [{
                type: ViewChild,
                args: [RxSelectWithPaginationComponent]
            }] } });
//# sourceMappingURL=text-field.component.js.map