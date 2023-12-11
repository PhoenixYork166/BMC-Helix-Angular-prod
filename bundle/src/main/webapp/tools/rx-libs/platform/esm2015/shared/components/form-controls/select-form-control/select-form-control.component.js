import { Component, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { head, isUndefined, map, filter, includes, castArray, isNil } from 'lodash';
import { AdaptRxSelectComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
export class SelectFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.appendToBody = false;
        this.adaptSelectValue = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    writeValue(value) {
        super.writeValue(value);
        this.adaptSelectValue = this.getAdaptSelectValue(value);
    }
    focus() {
        const el = this.renderer.selectRootElement(this.adaptSelectComponent.selectButtonRef.nativeElement, true);
        el.focus();
        el.click();
    }
    sortAlphabetically(items) {
        return items.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));
    }
    ngOnInit() {
        if (this.formControl) {
            const adaptControl = this.adaptSelectComponent.ngControl.control;
            adaptControl.statusChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
                if (adaptControl.hasError('required') && !this.formControl.hasError('required')) {
                    Object.assign(adaptControl.errors, this.formControl.errors);
                    this.formControl.setErrors(adaptControl.errors, { emitEvent: false });
                }
            });
            this.formControl.statusChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
                if (this.formControl.invalid) {
                    adaptControl.setErrors(this.formControl.errors, { emitEvent: false });
                }
            });
        }
        this.isSortAlphabetically = isUndefined(this.options.sortAlphabetically) || this.options.sortAlphabetically;
        this.selectOptions = this.isSortAlphabetically
            ? this.sortAlphabetically(this.options.options)
            : this.options.options;
        this.tooltip = this.options.tooltip
            ? {
                iconName: this.options.tooltip.iconName,
                content: this.popoverContent,
                placement: this.options.tooltip.placement,
                popoverMode: this.options.tooltip.popoverMode
            }
            : null;
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.selectOptions = this.isSortAlphabetically
                ? this.sortAlphabetically(changes.options.currentValue.options)
                : changes.options.currentValue.options;
            // ADAPT select value must be updated if options are changed, this logic can be eliminated if ADAPT #4116 issue will be resolved.
            this.adaptSelectValue = this.getAdaptSelectValue(this.value);
        }
    }
    optionFormatter(option) {
        return option.name;
    }
    onSelectionChange(value) {
        let selectValue = map(value, 'id');
        selectValue = this.options.multiple ? selectValue : head(selectValue);
        if (this.options.beforeValueChange) {
            this.options.beforeValueChange(this.value, selectValue).then((allowValueChange) => {
                if (allowValueChange) {
                    this.value = selectValue;
                    this.adaptSelectValue = this.getAdaptSelectValue(selectValue);
                }
                else {
                    this.adaptSelectComponent.writeValue(this.adaptSelectValue);
                }
            });
        }
        else {
            this.value = selectValue;
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    // We have to convert value for ADAPT select, e.g:
    // - "foo" -> [{id: "foo", name: "Foo"}] or,
    // - ["foo", "bar"] => [{id: "foo", name: "Foo"}, {id: "bar", name: "Bar"}].
    // This logic can be eliminated if #4116 issue will be resolved.
    getAdaptSelectValue(value) {
        var _a;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.options) && !isNil(value)
            ? filter(this.options.options, (option) => includes(castArray(value), option.id))
            : [];
    }
}
SelectFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
SelectFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectFormControlComponent, selector: "rx-select-form-control", inputs: { options: "options", appendToBody: "appendToBody", formControl: "formControl" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptSelectComponent", first: true, predicate: ["adaptSelectComponent"], descendants: true, static: true }, { propertyName: "popoverContent", first: true, predicate: ["popoverContent"], descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-rx-select\n  #adaptSelectComponent\n  [options]=\"selectOptions\"\n  [required]=\"options.required\"\n  [emptyOption]=\"options.emptyOption\"\n  [multiple]=\"options.multiple\"\n  [selectAllButton]=\"options.multiple && !options.hideSelectAllButton\"\n  [deselectAllButton]=\"options.multiple && !options.hideDeselectAllButton\"\n  [enableFilter]=\"options.enableFilter\"\n  [ngModel]=\"adaptSelectValue\"\n  (ngModelChange)=\"onSelectionChange($event)\"\n  [tooltip]=\"tooltip\"\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [optionFormatter]=\"optionFormatter\"\n  [appendToBody]=\"appendToBody\"\n  class=\"d-block m-0\"\n>\n</adapt-rx-select>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-form-control',
                    templateUrl: './select-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SelectFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], formControl: [{
                type: Input
            }], adaptSelectComponent: [{
                type: ViewChild,
                args: ['adaptSelectComponent', { static: true }]
            }], popoverContent: [{
                type: ViewChild,
                args: ['popoverContent', { static: true }]
            }] } });
//# sourceMappingURL=select-form-control.component.js.map