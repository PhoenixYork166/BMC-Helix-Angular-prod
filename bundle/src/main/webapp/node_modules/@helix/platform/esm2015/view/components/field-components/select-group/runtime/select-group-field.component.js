import { Component, Injector, ViewChild } from '@angular/core';
import { distinctUntilChanged, startWith, take, takeUntil } from 'rxjs/operators';
import { find, get, isEmpty, isEqual, isNil } from 'lodash';
import { combineLatest, of } from 'rxjs';
import { RxNamedListDefinitionService, RxNamedListService } from '@helix/platform/named-list/api';
import { RxSelectWithPaginationComponent } from '@helix/platform/shared/components';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { SelectGroupComponent } from './select-group.component';
import * as i0 from "@angular/core";
import * as i1 from "./select-group.component";
import * as i2 from "@helix/platform/named-list/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export class SelectGroupFieldComponent extends BaseRecordEditorFieldComponent {
    constructor(injector, selectGroupComponent, rxNamedListDefinitionService, rxNamedListService) {
        super(injector);
        this.selectGroupComponent = selectGroupComponent;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.rxNamedListService = rxNamedListService;
        this.optionLoaderFunc = this.getNamedListOptionPage.bind(this);
        this.viewToModelValueAdapterFunc = this.viewToModelValueAdapter.bind(this);
        this.modelToViewValueAdapterFunc = this.modelToViewValueAdapter.bind(this);
        this.selectedOptions = [];
    }
    onConfigInitialized(config) {
        super.onConfigInitialized(config);
        this.fieldIndex = Number(config.index);
        this.namedListDefinitionName = config.namedListDefinitionName;
        this.selectGroupComponent.registerFieldComponent(this.fieldIndex, this);
        const namedListDefinition$ = this.rxNamedListDefinitionService.get(this.namedListDefinitionName).pipe(take(1));
        const valueChanges$ = this.formControl.valueChanges.pipe(distinctUntilChanged(isEqual), startWith(this.formControl.value), takeUntil(this.destroyed$));
        combineLatest([namedListDefinition$, valueChanges$]).subscribe(([namedListDefinition]) => {
            this.namedListDefinition = namedListDefinition;
            this.fieldIdToFilterBy = config.optionFilterFieldId || namedListDefinition.valueFieldId;
            this.updateSelectedOption();
            // do not reset value for next fields after record instance id change,
            // in this case formControl is pristine and untouched
            if (this.formControl.dirty) {
                this.selectGroupComponent.resetValueForNextFields(this.fieldIndex);
            }
            else {
                this.resetLoadedOptions();
            }
        });
    }
    resetFieldValue() {
        super.setFieldValue(null);
        this.resetLoadedOptions();
    }
    getDisplayValue() {
        return this.readOnlyValue;
    }
    getNamedListOptionPage(startIndex, pageSize, searchQuery) {
        return this.rxNamedListService.getOptionPage(this.namedListDefinition, searchQuery, this.getSelectionQueryCriteria(), startIndex, pageSize);
    }
    // [{displayValue: 'FOO', value: 'foo'}] -> 'foo'
    viewToModelValueAdapter(selectedOptions) {
        return get(selectedOptions, '[0].value', '');
    }
    // 'foo' -> [{displayValue: 'FOO', value: 'foo'}]
    modelToViewValueAdapter(modelValue) {
        return isNil(modelValue) ? [] : this.selectedOptions;
    }
    updateSelectedOption() {
        this.showDefaultTitle = false;
        let namedListOptions$;
        if (isEmpty(this.formControl.value)) {
            namedListOptions$ = of([]);
        }
        else {
            // Select with pagination component is not available in the record editor READ mode.
            const loadedOptions = get(this.selectWithPaginationComponent, 'options', []);
            const namedListOptionCandidate = find(loadedOptions, { value: this.formControl.value });
            namedListOptions$ = namedListOptionCandidate
                ? of([namedListOptionCandidate])
                : this.rxNamedListService.getOptionsForValues(this.namedListDefinition, [this.formControl.value]);
        }
        namedListOptions$.pipe(take(1)).subscribe((options) => {
            this.showDefaultTitle = true;
            this.selectedOptions = options;
            if (isEmpty(options) && this.formControl.value) {
                // Selected option might be removed from the named list,
                // in this case we have to show an empty display value.
                this.selectedOptions = [
                    {
                        displayValue: null,
                        value: this.formControl.value
                    }
                ];
            }
            if (this.formControl.dirty) {
                this.formControl.markAsTouched();
            }
            this.triggerModelToViewValueUpdate();
            this.updateReadOnlyValue();
        });
    }
    resetLoadedOptions() {
        if (this.selectWithPaginationComponent) {
            this.selectWithPaginationComponent.resetLoadedOptions();
        }
    }
    getSelectionQueryCriteria() {
        let queryCriteria = null;
        if (this.fieldIndex > 0) {
            const previousFieldValue = this.selectGroupComponent.getValueForPreviousField(this.fieldIndex);
            if (previousFieldValue) {
                queryCriteria = `('${this.fieldIdToFilterBy}' = "${previousFieldValue}")`;
            }
        }
        return queryCriteria;
    }
    updateReadOnlyValue() {
        this.readOnlyValue = get(this.selectedOptions, '[0].displayValue', null);
    }
    triggerModelToViewValueUpdate() {
        // trigger writeValue function in the control value accessor
        this.formControl.setValue(this.formControl.value, { emitEvent: false });
    }
}
SelectGroupFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupFieldComponent, deps: [{ token: i0.Injector }, { token: i1.SelectGroupComponent }, { token: i2.RxNamedListDefinitionService }, { token: i2.RxNamedListService }], target: i0.ɵɵFactoryTarget.Component });
SelectGroupFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectGroupFieldComponent, selector: "rx-select-group-field", viewQueries: [{ propertyName: "selectWithPaginationComponent", first: true, predicate: RxSelectWithPaginationComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!isHidden\">\n  <rx-read-only-field\n    *ngIf=\"inReadState; else editStateElementRef\"\n    [label]=\"label\"\n    [value]=\"getDisplayValue()\"\n  ></rx-read-only-field>\n</ng-container>\n\n<ng-template #editStateElementRef>\n  <rx-select-with-pagination\n    [label]=\"label\"\n    [formControl]=\"formControl\"\n    [required]=\"isRequired\"\n    [readonly]=\"isDisabled\"\n    [optionLoader]=\"optionLoaderFunc\"\n    [showDefaultTitle]=\"showDefaultTitle\"\n    [viewToModelValueAdapter]=\"viewToModelValueAdapterFunc\"\n    [modelToViewValueAdapter]=\"modelToViewValueAdapterFunc\"\n  ></rx-select-with-pagination>\n</ng-template>\n", components: [{ type: i3.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }, { type: i4.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-group-field',
                    templateUrl: './select-group-field.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.SelectGroupComponent }, { type: i2.RxNamedListDefinitionService }, { type: i2.RxNamedListService }]; }, propDecorators: { selectWithPaginationComponent: [{
                type: ViewChild,
                args: [RxSelectWithPaginationComponent]
            }] } });
//# sourceMappingURL=select-group-field.component.js.map