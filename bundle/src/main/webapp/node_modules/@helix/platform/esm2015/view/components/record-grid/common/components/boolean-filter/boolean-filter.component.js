import { Component, Input } from '@angular/core';
import { AdaptFilterControlsComponent } from '@bmc-ux/adapt-angular';
import { find } from 'lodash';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
import * as i1 from "../named-filter-options-list/named-filter-options-list.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class RxBooleanFilterComponent {
    constructor() {
        this.namedFilterOptions = [];
        this.isRequired = false;
    }
    set filterValue(values) {
        const selectOptions = this.getSelectOptions();
        this._filterValue = values;
        this.selectedValues = (values === null || values === void 0 ? void 0 : values.filterValue)
            ? values.filterValue.map((value) => find(selectOptions, { id: value }))
            : [];
    }
    get filterValue() {
        return this._filterValue;
    }
    selectOptionFormatter(option) {
        return option.name;
    }
    onValueChange(values) {
        var _a;
        const filterValue = values.map((value) => value.id);
        this.filterControlsComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(filterValue, (_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.namedOptions));
    }
    getSelectOptions() {
        var _a;
        return ((_a = this.filterOption.data) === null || _a === void 0 ? void 0 : _a.selectOptions) || [];
    }
    onValueChangeRequired(model) {
        var _a, _b, _c;
        const oldModelValue = Array.isArray((_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.filterValue)
            ? this.filterValue.filterValue[0]
            : (_b = this.filterValue) === null || _b === void 0 ? void 0 : _b.filterValue;
        this.filterControlsComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(model === oldModelValue ? null : [model], (_c = this.filterValue) === null || _c === void 0 ? void 0 : _c.namedOptions));
    }
}
RxBooleanFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxBooleanFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBooleanFilterComponent, selector: "rx-boolean-filter", inputs: { filterOption: "filterOption", filterValue: "filterValue", filterControlsComponent: "filterControlsComponent", namedFilterOptions: "namedFilterOptions", isRequired: "isRequired" }, ngImport: i0, template: "<rx-named-filter-options-list\n  *ngIf=\"namedFilterOptions?.length\"\n  [namedFilterOptions]=\"namedFilterOptions\"\n  [filterOption]=\"filterOption\"\n  [filterValue]=\"filterValue\"\n  [filterControlsComponent]=\"filterControlsComponent\"\n></rx-named-filter-options-list>\n\n<adapt-rx-select\n  *ngIf=\"!isRequired; else inputsForBooleanTypeTemplate\"\n  class=\"advanced-filter__rx-select advanced-filter__rx-select_simple\"\n  [inline]=\"true\"\n  [multiple]=\"true\"\n  [optionFormatter]=\"selectOptionFormatter\"\n  [options]=\"getSelectOptions()\"\n  [popupMaxHeight]=\"null\"\n  [ngModel]=\"selectedValues\"\n  (ngModelChange)=\"onValueChange($event)\"\n>\n</adapt-rx-select>\n\n<ng-template #inputsForBooleanTypeTemplate>\n  <adapt-rx-radiobutton-group\n    class=\"advanced-filter__radiobutton-group\"\n    [ngModel]=\"filterValue ? filterValue.filterValue[0] : null\"\n    (ngModelChange)=\"onValueChangeRequired($event)\"\n  >\n    <adapt-rx-radiobutton\n      name=\"booleanTypeGroup\"\n      class=\"advanced-filter__radiobutton\"\n      [value]=\"false\"\n      [label]=\"filterControlsComponent.texts.configsTexts.falseLabel\"\n      [testID]=\"filterControlsComponent.testID + '_radio_false'\"\n      [disabled]=\"filterControlsComponent.isInputDisabled(false)\"\n    >\n    </adapt-rx-radiobutton>\n    <adapt-rx-radiobutton\n      name=\"booleanTypeGroup\"\n      class=\"advanced-filter__radiobutton\"\n      [value]=\"true\"\n      [label]=\"filterControlsComponent.texts.configsTexts.trueLabel\"\n      [testID]=\"filterControlsComponent.testID + '_radio_true'\"\n      [disabled]=\"filterControlsComponent.isInputDisabled(true)\"\n    >\n    </adapt-rx-radiobutton>\n    <adapt-rx-radiobutton\n      *ngIf=\"filterControlsComponent.getBooleanTypeOptionParams().hasBlankValue\"\n      name=\"booleanTypeGroup\"\n      class=\"advanced-filter__radiobutton\"\n      [value]=\"filterControlsComponent.getBooleanTypeBlankValue()\"\n      [label]=\"filterControlsComponent.texts.configsTexts.blankLabel\"\n      [testID]=\"filterControlsComponent.testID + '_radio_blank'\"\n      [disabled]=\"filterControlsComponent.isInputDisabled(filterControlsComponent.getBooleanTypeBlankValue())\"\n    >\n    </adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n</ng-template>\n", components: [{ type: i1.RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: ["namedFilterOptions", "filterOption", "filterValue", "filterControlsComponent", "defaultFilterValue"], outputs: ["namedFilterOptionsChange"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i2.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-boolean-filter',
                    templateUrl: './boolean-filter.component.html'
                }]
        }], propDecorators: { filterOption: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], filterControlsComponent: [{
                type: Input
            }], namedFilterOptions: [{
                type: Input
            }], isRequired: [{
                type: Input
            }] } });
//# sourceMappingURL=boolean-filter.component.js.map