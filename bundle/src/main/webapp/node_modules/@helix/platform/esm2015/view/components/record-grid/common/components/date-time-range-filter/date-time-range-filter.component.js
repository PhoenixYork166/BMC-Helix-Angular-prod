import { Component, Input } from '@angular/core';
import { AdaptFilterControlsComponent, AdaptRxDatetimeAdapter, RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import { RxAdaptDatetimeMomentAdapter } from './rx-adapt-datetime-moment-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "../named-filter-options-list/named-filter-options-list.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class RxDateTimeRangeFilterComponent {
    constructor() {
        this.rxDatetimePickerMode = RxDatetimePickerMode;
    }
    onTimeTypeFilterOptionModelChange(model) {
        this.onDateTimeTypeFilterOptionModelChange(model);
    }
    onDateTypeFilterOptionModelChange(model) {
        if (model[0] && model[0].isValid()) {
            model[0] = model[0].startOf('day');
        }
        if (model[1] && model[1].isValid()) {
            model[1] = model[1].startOf('day');
        }
        this.onDateTimeTypeFilterOptionModelChange(model);
    }
    onDateTimeTypeFilterOptionModelChange(newValue) {
        var _a;
        this.filterControlsComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(newValue, (_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.namedOptions));
    }
}
RxDateTimeRangeFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeRangeFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDateTimeRangeFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDateTimeRangeFilterComponent, selector: "rx-date-time-range-filter", inputs: { filterOption: "filterOption", filterControlsComponent: "filterControlsComponent", filterValue: "filterValue", namedFilterOptions: "namedFilterOptions", mode: "mode" }, providers: [{ provide: AdaptRxDatetimeAdapter, useClass: RxAdaptDatetimeMomentAdapter }], ngImport: i0, template: "<rx-named-filter-options-list\n  *ngIf=\"namedFilterOptions?.length\"\n  [namedFilterOptions]=\"namedFilterOptions\"\n  [filterOption]=\"filterOption\"\n  [filterValue]=\"filterValue\"\n  [filterControlsComponent]=\"filterControlsComponent\"\n></rx-named-filter-options-list>\n\n<ng-container [ngSwitch]=\"mode\">\n  <ng-container *ngSwitchCase=\"rxDatetimePickerMode.Time\" [ngTemplateOutlet]=\"inputsForTimeTypeTemplate\"></ng-container>\n  <ng-container *ngSwitchCase=\"rxDatetimePickerMode.Date\" [ngTemplateOutlet]=\"inputsForDateTypeTemplate\"></ng-container>\n  <ng-container\n    *ngSwitchCase=\"rxDatetimePickerMode.DateTime\"\n    [ngTemplateOutlet]=\"inputsForDatetimeTypeTemplate\"\n  ></ng-container>\n</ng-container>\n\n<ng-template #inputsForTimeTypeTemplate>\n  <adapt-rx-datetime-range\n    class=\"advanced-filter__datetime\"\n    [ngModel]=\"filterValue?.filterValue\"\n    (ngModelChange)=\"onTimeTypeFilterOptionModelChange($event)\"\n    [testID]=\"filterControlsComponent.testID\"\n    [mode]=\"mode\"\n    [hasSeconds]=\"true\"\n    [inline]=\"true\"\n    [inlineLight]=\"true\"\n    [texts]=\"filterControlsComponent.texts.datetimeTexts\"\n    [disabled]=\"filterControlsComponent.isInputDisabled()\"\n  >\n  </adapt-rx-datetime-range>\n</ng-template>\n\n<ng-template #inputsForDateTypeTemplate>\n  <adapt-rx-datetime-range\n    class=\"advanced-filter__datetime\"\n    [ngModel]=\"filterValue?.filterValue\"\n    (ngModelChange)=\"onDateTypeFilterOptionModelChange($event)\"\n    [testID]=\"filterControlsComponent.testID\"\n    [mode]=\"mode\"\n    [inline]=\"true\"\n    [inlineLight]=\"true\"\n    [texts]=\"filterControlsComponent.texts.datetimeTexts\"\n    [disabled]=\"filterControlsComponent.isInputDisabled()\"\n  >\n  </adapt-rx-datetime-range>\n</ng-template>\n\n<ng-template #inputsForDatetimeTypeTemplate>\n  <adapt-rx-datetime-range\n    class=\"advanced-filter__datetime\"\n    [ngModel]=\"filterValue?.filterValue\"\n    (ngModelChange)=\"onDateTimeTypeFilterOptionModelChange($event)\"\n    [testID]=\"filterControlsComponent.testID\"\n    [mode]=\"mode\"\n    [hasSeconds]=\"true\"\n    [inline]=\"true\"\n    [inlineLight]=\"true\"\n    [texts]=\"filterControlsComponent.texts.datetimeTexts\"\n    [disabled]=\"filterControlsComponent.isInputDisabled()\"\n  >\n  </adapt-rx-datetime-range>\n</ng-template>\n", components: [{ type: i1.RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: ["namedFilterOptions", "filterOption", "filterValue", "filterControlsComponent", "defaultFilterValue"], outputs: ["namedFilterOptionsChange"] }, { type: i2.AdaptRxDatetimeRangeComponent, selector: "adapt-rx-datetime-range", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeRangeFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-date-time-range-filter',
                    templateUrl: './date-time-range-filter.component.html',
                    providers: [{ provide: AdaptRxDatetimeAdapter, useClass: RxAdaptDatetimeMomentAdapter }]
                }]
        }], propDecorators: { filterOption: [{
                type: Input
            }], filterControlsComponent: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], namedFilterOptions: [{
                type: Input
            }], mode: [{
                type: Input
            }] } });
//# sourceMappingURL=date-time-range-filter.component.js.map