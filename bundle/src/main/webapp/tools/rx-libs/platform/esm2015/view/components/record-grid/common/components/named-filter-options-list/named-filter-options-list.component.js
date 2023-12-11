import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdaptFilterControlsComponent } from '@bmc-ux/adapt-angular';
import { reduce } from 'lodash';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class RxNamedFilterOptionsListComponent {
    constructor() {
        this.defaultFilterValue = [];
        this.namedFilterOptionsChange = new EventEmitter();
        this.namedFilterOptionsModel = {};
    }
    set filterValue(values) {
        const ids = values === null || values === void 0 ? void 0 : values.namedOptions;
        this._filterValue = values;
        Object.keys(this.namedFilterOptionsModel).forEach((key) => (this.namedFilterOptionsModel[key] = false));
        ids === null || ids === void 0 ? void 0 : ids.forEach((id) => (this.namedFilterOptionsModel[id] = true));
    }
    get filterValue() {
        return this._filterValue;
    }
    trackByOptionGuid(index, option) {
        return option['guid'];
    }
    onNamedFilterOptionChange() {
        var _a, _b;
        const selectedGuids = this.getSelectedNamedOptionsIds();
        this.namedFilterOptionsChange.emit(selectedGuids);
        const value = new RxRecordGridAdvancedFilterValue((_b = (_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.filterValue) !== null && _b !== void 0 ? _b : this.defaultFilterValue, selectedGuids);
        this.filterControlsComponent.onFilterOptionModelChange(value);
    }
    getSelectedNamedOptionsIds() {
        return reduce(this.namedFilterOptionsModel, (result, value, id) => {
            if (value) {
                result.push(id);
            }
            return result;
        }, []);
    }
}
RxNamedFilterOptionsListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedFilterOptionsListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxNamedFilterOptionsListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: { namedFilterOptions: "namedFilterOptions", filterOption: "filterOption", filterValue: "filterValue", filterControlsComponent: "filterControlsComponent", defaultFilterValue: "defaultFilterValue" }, outputs: { namedFilterOptionsChange: "namedFilterOptionsChange" }, ngImport: i0, template: "<div class=\"options-wrapper\" *ngIf=\"namedFilterOptions?.length\">\n  <adapt-rx-checkbox\n    class=\"dropdown-item p-0 text-break\"\n    *ngFor=\"let option of namedFilterOptions; trackBy: trackByOptionGuid\"\n    [label]=\"option.title\"\n    [(ngModel)]=\"namedFilterOptionsModel[option.guid]\"\n    (ngModelChange)=\"onNamedFilterOptionChange()\"\n  ></adapt-rx-checkbox>\n</div>\n", styles: [".options-wrapper{margin-top:-1.5rem;margin-bottom:-2px}adapt-rx-checkbox:not(:last-child){margin-bottom:14px}.dropdown-item{white-space:normal}\n"], components: [{ type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedFilterOptionsListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-filter-options-list',
                    templateUrl: './named-filter-options-list.component.html',
                    styleUrls: ['./named-filter-options-list.component.scss']
                }]
        }], propDecorators: { namedFilterOptions: [{
                type: Input
            }], filterOption: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], filterControlsComponent: [{
                type: Input
            }], defaultFilterValue: [{
                type: Input
            }], namedFilterOptionsChange: [{
                type: Output
            }] } });
//# sourceMappingURL=named-filter-options-list.component.js.map