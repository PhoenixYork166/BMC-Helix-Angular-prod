import { Component, Input } from '@angular/core';
import { AdaptFilterControlsComponent, getTagText, isEmptyOrWhitespace } from '@bmc-ux/adapt-angular';
import { isEqual } from 'lodash';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
import * as i1 from "../named-filter-options-list/named-filter-options-list.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class RxStringFilterComponent {
    constructor() {
        this.namedFilterOptions = [];
    }
    onStringTypeFilterOptionModelChange(model, tagField) {
        var _a, _b;
        const newModel = model.filter((tag) => !isEmptyOrWhitespace(getTagText(tag)));
        if (newModel.length < model.length && isEqual(newModel, ((_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.filterValue) || [])) {
            tagField.writeValue(newModel);
        }
        else {
            this.filterControlsComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(newModel, (_b = this.filterValue) === null || _b === void 0 ? void 0 : _b.namedOptions));
        }
    }
}
RxStringFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxStringFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxStringFilterComponent, selector: "rx-string-filter", inputs: { filterOption: "filterOption", filterValue: "filterValue", filterControlsComponent: "filterControlsComponent", namedFilterOptions: "namedFilterOptions" }, ngImport: i0, template: "<rx-named-filter-options-list\n  *ngIf=\"namedFilterOptions?.length\"\n  [namedFilterOptions]=\"namedFilterOptions\"\n  [filterOption]=\"filterOption\"\n  [filterValue]=\"filterValue\"\n  [filterControlsComponent]=\"filterControlsComponent\"\n></rx-named-filter-options-list>\n\n<adapt-tag-field\n  #stringDataTypeTagField\n  mainCls=\"advanced-filter__string-tag-field\"\n  [ngModel]=\"filterValue?.filterValue || []\"\n  popupClass=\"advanced-filter__typeahead-window\"\n  [testID]=\"filterControlsComponent.testID\"\n  (ngModelChange)=\"onStringTypeFilterOptionModelChange($event, stringDataTypeTagField)\"\n  [delimiterSymbol]=\"null\"\n  [placeholder]=\"filterControlsComponent.texts.stringTypeTagFieldPlaceholder\"\n  [replaceModelOnWrite]=\"true\"\n  [disabled]=\"filterControlsComponent.isInputDisabled()\"\n  [hideLabel]=\"true\"\n>\n</adapt-tag-field>\n", components: [{ type: i1.RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: ["namedFilterOptions", "filterOption", "filterValue", "filterControlsComponent", "defaultFilterValue"], outputs: ["namedFilterOptionsChange"] }, { type: i2.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-string-filter',
                    templateUrl: './string-filter.component.html'
                }]
        }], propDecorators: { filterOption: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], filterControlsComponent: [{
                type: Input
            }], namedFilterOptions: [{
                type: Input
            }] } });
//# sourceMappingURL=string-filter.component.js.map