import { Component, Input } from '@angular/core';
import { AdaptFilterControlsComponent } from '@bmc-ux/adapt-angular';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
import * as i1 from "../named-filter-options-list/named-filter-options-list.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class RxSelectionFilterComponent {
    set filterValue(values) {
        this._filterValue = values;
        const options = this.getSelectionTypeOptions();
        this.selectionTypeModel =
            options.length && (values === null || values === void 0 ? void 0 : values.filterValue)
                ? values.filterValue.map((id) => options.find((option) => option.id === id))
                : null;
    }
    get filterValue() {
        return this._filterValue;
    }
    getSelectionTypeOptions() {
        var _a;
        const data = this.filterOption.data;
        return (_a = data === null || data === void 0 ? void 0 : data.selectOptions) !== null && _a !== void 0 ? _a : [];
    }
    onSelectionTypeFilterOptionModelChange(value) {
        var _a;
        this.filterControlsComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(value.map((val) => val.id), (_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.namedOptions));
    }
}
RxSelectionFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxSelectionFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSelectionFilterComponent, selector: "rx-selection-filter", inputs: { filterOption: "filterOption", filterControlsComponent: "filterControlsComponent", filterValue: "filterValue", namedFilterOptions: "namedFilterOptions" }, ngImport: i0, template: "<rx-named-filter-options-list\n  *ngIf=\"namedFilterOptions?.length\"\n  [namedFilterOptions]=\"namedFilterOptions\"\n  [filterOption]=\"filterOption\"\n  [filterValue]=\"filterValue\"\n  [filterControlsComponent]=\"filterControlsComponent\"\n></rx-named-filter-options-list>\n\n<adapt-rx-select\n  class=\"advanced-filter__rx-select\"\n  [class.advanced-filter__rx-select_simple]=\"filterControlsComponent.canShowSimpleInlineSelect()\"\n  [inline]=\"true\"\n  [multiple]=\"true\"\n  [selectAllButton]=\"true\"\n  [deselectAllButton]=\"true\"\n  [enableFilter]=\"!filterControlsComponent.canShowSimpleInlineSelect()\"\n  [optionFormatter]=\"filterControlsComponent.selectOptionFormatter\"\n  [options]=\"filterControlsComponent.getSelectionTypeOptions()\"\n  [texts]=\"filterControlsComponent.getSelectionTypeTexts()\"\n  [popupMaxHeight]=\"null\"\n  [ngModel]=\"selectionTypeModel\"\n  (ngModelChange)=\"onSelectionTypeFilterOptionModelChange($event)\"\n  [disabledOptionResolver]=\"filterControlsComponent.disabledSelectInputResolverBind\"\n>\n</adapt-rx-select>\n", components: [{ type: i1.RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: ["namedFilterOptions", "filterOption", "filterValue", "filterControlsComponent", "defaultFilterValue"], outputs: ["namedFilterOptionsChange"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-filter',
                    templateUrl: './selection-filter.component.html'
                }]
        }], propDecorators: { filterOption: [{
                type: Input
            }], filterControlsComponent: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], namedFilterOptions: [{
                type: Input
            }] } });
//# sourceMappingURL=selection-filter.component.js.map