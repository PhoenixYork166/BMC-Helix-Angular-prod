import { Component, EventEmitter, Injector, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { AdaptRxSelectComponent, SelectModelFormat } from '@bmc-ux/adapt-angular';
import { once } from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class RxSelectWithPaginationComponent {
    constructor(injector) {
        this.injector = injector;
        this.loadMoreCallbackFunc = this.onFilterValueChange.bind(this);
        this.selectedValue = [];
        this.isOptionLoadingInProgress = false;
        this.isFirstOptionPageLoaded = false;
        this.showLoadMoreButton = true;
        this.adaptSelectSettings = {
            enableSearch: true,
            showUncheckAll: true,
            modelFormat: SelectModelFormat.object,
            placement: 'auto'
        };
        this.onFirstTimeDropdownOpen = once(this.onFilterValueChange);
        this.startIndex = 0;
        this.adaptSelectOptions = [];
        this.filterValue$ = new Subject();
        this.options$ = this.filterValue$.pipe(tap(() => {
            this.isOptionLoadingInProgress = true;
        }), debounceTime(250), switchMap((query) => this.loadOptions(query)), startWith([]));
        this.label = '';
        this.required = false;
        this.isMultiSelectionMode = false;
        this.pageSize = 50;
        this.showDefaultTitle = true;
        this.showUncheckAll = true;
        this.readonly = false;
        this.toggleDropdown = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.viewToModelValueAdapter = (viewValue) => viewValue;
        this.modelToViewValueAdapter = (modelValue) => modelValue;
        this.optionFormatter = (option) => option.displayValue;
    }
    ngOnInit() {
        // cannot inject NgControl instance directly due to the angular circular dependency error.
        // see: https://github.com/angular/components/pull/13860/commits/f6b179e02b33c058a018ce4ccc51932d1416331f
        this.formControl = this.injector.get(NgControl);
        this.adaptSelectSettings = Object.assign(Object.assign({}, this.adaptSelectSettings), { showUncheckAll: this.showUncheckAll, pageSize: this.pageSize });
        if (this.isMultiSelectionMode) {
            this.adaptSelectSettings.checkedStyle = 'checkbox';
            this.adaptSelectSettings.showTooltip = true;
        }
    }
    ngOnChanges(changes) {
        if (changes.showDefaultTitle && this.adaptSelectComponent.texts) {
            if (changes.showDefaultTitle.isFirstChange()) {
                this.adaptSelectDefaultTitle = this.adaptSelectComponent.texts.defaultTitle;
                this.adaptSelectComponent.texts.defaultTitle = null;
            }
            this.adaptSelectComponent.texts = Object.assign(Object.assign({}, this.adaptSelectComponent.texts), { defaultTitle: changes.showDefaultTitle.currentValue ? this.adaptSelectDefaultTitle : null });
        }
    }
    resetLoadedOptions() {
        this.onFirstTimeDropdownOpen = once(this.onFilterValueChange);
        this.lastFilterValue = null;
        this.isFirstOptionPageLoaded = false;
        this.adaptSelectOptions = [];
    }
    onFilterValueChange(filterValue = this.lastFilterValue || '') {
        this.filterValue$.next(filterValue);
    }
    loadOptions(filterValue = this.lastFilterValue || '') {
        if (this.lastFilterValue === filterValue) {
            this.startIndex = this.pageSize > 0 ? this.startIndex + this.pageSize : 0;
        }
        else {
            this.lastFilterValue = filterValue;
            this.startIndex = 0;
        }
        return this.optionLoader(this.startIndex, this.pageSize, this.lastFilterValue).pipe(take(1), tap((optionsPage) => {
            const options = optionsPage.options;
            if (this.startIndex === 0) {
                this.adaptSelectOptions = options;
                this.isFirstOptionPageLoaded = true;
            }
            else {
                this.adaptSelectOptions = this.adaptSelectOptions.concat(options);
            }
            this.showLoadMoreButton = optionsPage.totalSize > this.adaptSelectOptions.length;
        }), map(() => this.adaptSelectOptions), finalize(() => {
            this.isOptionLoadingInProgress = false;
        }));
    }
    writeValue(selectedValue) {
        this.selectedValue = this.modelToViewValueAdapter(selectedValue);
    }
    onSelectedValueChange(selectedValue) {
        this.onViewValueChange(this.viewToModelValueAdapter(selectedValue));
    }
    ngDoCheck() {
        if (this.formControl.untouched && this.ngModel.touched) {
            this.ngModel.control.markAsUntouched();
        }
        else if (this.formControl.touched && this.ngModel.untouched) {
            this.ngModel.control.markAsTouched();
        }
        if (this.formControl.pristine && this.ngModel.control.dirty) {
            this.ngModel.control.markAsPristine();
        }
    }
    registerOnChange(fn) {
        this.onViewValueChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onDropdownToggle(isOpen) {
        if (isOpen) {
            this.onFirstTimeDropdownOpen();
            this.toggleDropdown.next(true);
        }
        else {
            this.onTouched();
            this.toggleDropdown.next(false);
            if (this.lastFilterValue) {
                this.onFilterValueChange('');
            }
        }
    }
    ngOnDestroy() {
        this.filterValue$.complete();
    }
}
RxSelectWithPaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxSelectWithPaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: { label: "label", required: "required", isMultiSelectionMode: "isMultiSelectionMode", optionLoader: "optionLoader", pageSize: "pageSize", showDefaultTitle: "showDefaultTitle", showUncheckAll: "showUncheckAll", readonly: "readonly", template: "template", viewToModelValueAdapter: "viewToModelValueAdapter", modelToViewValueAdapter: "modelToViewValueAdapter", optionFormatter: "optionFormatter" }, outputs: { toggleDropdown: "toggleDropdown", selectionChange: "selectionChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxSelectWithPaginationComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "ngModel", first: true, predicate: AdaptRxSelectComponent, descendants: true, read: NgModel, static: true }, { propertyName: "adaptSelectComponent", first: true, predicate: AdaptRxSelectComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-rx-select\n  class=\"mb-0\"\n  [popupClass]=\"'rx-truncate-option-content'\"\n  [label]=\"label\"\n  [multiple]=\"isMultiSelectionMode\"\n  [selectAllButton]=\"showUncheckAll\"\n  [deselectAllButton]=\"isMultiSelectionMode\"\n  [options]=\"options$ | async\"\n  [ngModel]=\"selectedValue\"\n  (ngModelChange)=\"onSelectedValueChange($event)\"\n  [disabled]=\"formControl.disabled\"\n  [readonly]=\"readonly\"\n  [required]=\"required\"\n  [loadMoreCallback]=\"loadMoreCallbackFunc\"\n  [loadMoreButton]=\"!(pageSize === -1) && showLoadMoreButton\"\n  [loadingState]=\"isOptionLoadingInProgress && !isFirstOptionPageLoaded\"\n  [loadMoreInProgress]=\"isOptionLoadingInProgress && isFirstOptionPageLoaded\"\n  (onFilterValueChange)=\"onFilterValueChange($event)\"\n  (onPopupOpenChange)=\"onDropdownToggle($event)\"\n  [optionFormatter]=\"optionFormatter\"\n  [enableFilter]=\"true\"\n  [emptyOption]=\"!isMultiSelectionMode\"\n  [optionContentTemplate]=\"template\"\n  (onSelectionChange)=\"selectionChange.emit($event)\"\n></adapt-rx-select>\n", components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-with-pagination',
                    templateUrl: './select-with-pagination.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxSelectWithPaginationComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { ngModel: [{
                type: ViewChild,
                args: [AdaptRxSelectComponent, { static: true, read: NgModel }]
            }], adaptSelectComponent: [{
                type: ViewChild,
                args: [AdaptRxSelectComponent, { static: true }]
            }], label: [{
                type: Input
            }], required: [{
                type: Input
            }], isMultiSelectionMode: [{
                type: Input
            }], optionLoader: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], showDefaultTitle: [{
                type: Input
            }], showUncheckAll: [{
                type: Input
            }], readonly: [{
                type: Input
            }], template: [{
                type: Input
            }], toggleDropdown: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], viewToModelValueAdapter: [{
                type: Input
            }], modelToViewValueAdapter: [{
                type: Input
            }], optionFormatter: [{
                type: Input
            }] } });
//# sourceMappingURL=select-with-pagination.component.js.map