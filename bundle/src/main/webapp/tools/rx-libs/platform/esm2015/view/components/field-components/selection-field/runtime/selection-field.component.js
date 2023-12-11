import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { compact, get, isNil, map } from 'lodash';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { RX_SELECTION_FIELD } from '../selection-field.constant';
import { SelectionFieldMode } from './selection-field.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class SelectionFieldComponent extends BaseRecordEditorFieldComponent {
    getSelectValue() {
        return isNil(this.formControl.value)
            ? []
            : compact([this.selectOptions.find((option) => option.id === Number(this.formControl.value))]);
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        this.isRadioButtonMode = config.editingMode === SelectionFieldMode.RadioButton;
        this.generateControlOptions(this.fieldDefinition);
        this.selectFormControl = new FormControl(this.getSelectValue());
        this.selectFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            this.setFieldValue(get(value, '[0].id', null));
        });
        this.formControl.valueChanges
            .pipe(startWith(this.formControl.value), distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.selectFormControl.setValue(this.getSelectValue());
        });
        this.formControl.touched$.pipe(takeUntil(this.destroyed$)).subscribe((touched) => {
            touched ? this.selectFormControl.markAsTouched() : this.selectFormControl.markAsUntouched();
        });
    }
    generateControlOptions(fieldDefinition) {
        this.selectOptions = map(fieldDefinition.optionLabelsById, (label, optionId) => ({
            name: label,
            id: Number(optionId)
        }));
        if (!this.isRequired && this.isRadioButtonMode) {
            this.selectOptions.unshift(RX_SELECTION_FIELD.emptyOption);
        }
    }
    getDisplayValue() {
        return this.fieldDefinition.optionLabelsById[this.formControl.value];
    }
    optionFormatter(option) {
        return option.name;
    }
    onPopupStatusChange(isOpen) {
        if (!isOpen) {
            this.formControl.markAsTouched();
        }
    }
}
SelectionFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SelectionFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldComponent, selector: "rx-selection-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <adapt-rx-radiobutton-group\n    *ngIf=\"isRadioButtonMode\"\n    [name]=\"guid\"\n    [formControl]=\"formControl\"\n    [readonly]=\"isDisabled\"\n    [label]=\"label\"\n  >\n    <adapt-rx-radiobutton\n      *ngFor=\"let item of selectOptions; last as isLast\"\n      [value]=\"item.id\"\n      [label]=\"item.name\"\n      class=\"mt-0 {{ isLast ? 'mb-1' : '' }}\"\n    >\n    </adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n\n  <adapt-rx-select\n    *ngIf=\"!isRadioButtonMode\"\n    [options]=\"selectOptions\"\n    [required]=\"isRequired\"\n    [label]=\"label\"\n    [formControl]=\"selectFormControl\"\n    [readonly]=\"isDisabled\"\n    [optionFormatter]=\"optionFormatter\"\n    [enableFilter]=\"true\"\n    [emptyOption]=\"!isRequired\"\n    (onPopupOpenChange)=\"onPopupStatusChange($event)\"\n  >\n  </adapt-rx-select>\n</ng-template>\n", components: [{ type: i1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i2.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i2.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-field',
                    templateUrl: './selection-field.component.html'
                }]
        }] });
//# sourceMappingURL=selection-field.component.js.map