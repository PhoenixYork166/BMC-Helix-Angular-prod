import { Component, Input } from '@angular/core';
import { AdaptFilterControlsComponent } from '@bmc-ux/adapt-angular';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
import * as i1 from "../named-filter-options-list/named-filter-options-list.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class RxNumberFilterComponent {
    getNumberDataTypeModel(value, indexOfCounter) {
        return value && value.filterValue ? value.filterValue[indexOfCounter] : null;
    }
    onNumberTypeFilterOptionModelChange(filterValue, controlComponent, newValue) {
        controlComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(newValue, filterValue === null || filterValue === void 0 ? void 0 : filterValue.namedOptions));
    }
}
RxNumberFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxNumberFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNumberFilterComponent, selector: "rx-number-filter", inputs: { filterOption: "filterOption", filterControlsComponent: "filterControlsComponent", filterValue: "filterValue", namedFilterOptions: "namedFilterOptions" }, ngImport: i0, template: "<rx-named-filter-options-list\n  *ngIf=\"namedFilterOptions?.length\"\n  [namedFilterOptions]=\"namedFilterOptions\"\n  [filterOption]=\"filterOption\"\n  [filterValue]=\"filterValue\"\n  [filterControlsComponent]=\"filterControlsComponent\"\n></rx-named-filter-options-list>\n\n<div class=\"d-flex\" [class.has-danger]=\"filterControlsComponent.hasValidationErrors\">\n  <div class=\"advanced-filter__counter-from-wrap\">\n    <adapt-rx-counter\n      #counterFrom\n      class=\"advanced-filter__counter-from\"\n      [label]=\"filterControlsComponent.texts.counterFromLabel\"\n      [ngModel]=\"getNumberDataTypeModel(filterValue, 0)\"\n      (ngModelChange)=\"\n        onNumberTypeFilterOptionModelChange(filterValue, filterControlsComponent, [\n          $event,\n          counterTo ? getNumberDataTypeModel(filterValue, 1) : null\n        ])\n      \"\n      [min]=\"filterControlsComponent.getNumberDataTypeMinAllowedValue()\"\n      [max]=\"filterControlsComponent.getNumberDataTypeMaxAllowedValue()\"\n      [disabled]=\"filterControlsComponent.isInputDisabled()\"\n      [testID]=\"filterControlsComponent.testID + '_from'\"\n    >\n    </adapt-rx-counter>\n  </div>\n  <div class=\"advanced-filter__counter-to-wrap\">\n    <adapt-rx-counter\n      #counterTo\n      class=\"advanced-filter__counter-to\"\n      [label]=\"filterControlsComponent.texts.counterToLabel\"\n      [ngModel]=\"getNumberDataTypeModel(filterValue, 1)\"\n      (ngModelChange)=\"\n        onNumberTypeFilterOptionModelChange(filterValue, filterControlsComponent, [\n          counterFrom ? getNumberDataTypeModel(filterValue, 0) : null,\n          $event\n        ])\n      \"\n      [min]=\"filterControlsComponent.getNumberDataTypeMinAllowedValue()\"\n      [max]=\"filterControlsComponent.getNumberDataTypeMaxAllowedValue()\"\n      [disabled]=\"filterControlsComponent.isInputDisabled()\"\n      [testID]=\"filterControlsComponent.testID + '_to'\"\n    >\n    </adapt-rx-counter>\n  </div>\n</div>\n", components: [{ type: i1.RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: ["namedFilterOptions", "filterOption", "filterValue", "filterControlsComponent", "defaultFilterValue"], outputs: ["namedFilterOptionsChange"] }, { type: i2.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumberFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-number-filter',
                    templateUrl: './number-filter.component.html'
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
//# sourceMappingURL=number-filter.component.js.map