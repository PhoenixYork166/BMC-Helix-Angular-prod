import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "../boolean-filter/boolean-filter.component";
import * as i2 from "../string-with-type-ahead-filter/string-with-type-ahead-filter.component";
import * as i3 from "../string-filter/string-filter.component";
import * as i4 from "../number-filter/number-filter.component";
import * as i5 from "../date-time-range-filter/date-time-range-filter.component";
import * as i6 from "../selection-filter/selection-filter.component";
export class RxAdvancedFilteringFieldsProviderComponent {
    constructor() {
        this.rxDatetimePickerMode = RxDatetimePickerMode;
        this.namedFilterOptionsGetter = (filterOptionConfig) => [];
    }
}
RxAdvancedFilteringFieldsProviderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdvancedFilteringFieldsProviderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxAdvancedFilteringFieldsProviderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAdvancedFilteringFieldsProviderComponent, selector: "rx-advanced-filtering-fields-provider", inputs: { namedFilterOptionsGetter: "namedFilterOptionsGetter" }, viewQueries: [{ propertyName: "optionalBooleanFilter", first: true, predicate: ["optionalBooleanFilter"], descendants: true, static: true }, { propertyName: "requiredBooleanFilter", first: true, predicate: ["requiredBooleanFilter"], descendants: true, static: true }, { propertyName: "inputsForStringWithTypeAheadTemplate", first: true, predicate: ["inputsForStringWithTypeAheadTemplate"], descendants: true, static: true }, { propertyName: "inputsForStringTypeTemplate", first: true, predicate: ["inputsForStringTypeTemplate"], descendants: true, static: true }, { propertyName: "inputsForNumberTypeTemplate", first: true, predicate: ["inputsForNumberTypeTemplate"], descendants: true, static: true }, { propertyName: "inputsForTimeTypeTemplate", first: true, predicate: ["inputsForTimeTypeTemplate"], descendants: true, static: true }, { propertyName: "inputsForDateTypeTemplate", first: true, predicate: ["inputsForDateTypeTemplate"], descendants: true, static: true }, { propertyName: "inputsForDatetimeTypeTemplate", first: true, predicate: ["inputsForDatetimeTypeTemplate"], descendants: true, static: true }, { propertyName: "inputsForSelectionTypeTemplate", first: true, predicate: ["inputsForSelectionTypeTemplate"], descendants: true, static: true }], ngImport: i0, template: "<ng-template\n  #optionalBooleanFilter\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-boolean-filter\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [isRequired]=\"false\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-boolean-filter>\n</ng-template>\n\n<ng-template\n  #requiredBooleanFilter\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-boolean-filter\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [isRequired]=\"true\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-boolean-filter>\n</ng-template>\n\n<ng-template\n  #inputsForStringWithTypeAheadTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-string-with-type-ahead-filter\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-string-with-type-ahead-filter>\n</ng-template>\n\n<ng-template\n  #inputsForStringTypeTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-string-filter\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-string-filter>\n</ng-template>\n\n<ng-template\n  #inputsForNumberTypeTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-number-filter\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-number-filter>\n</ng-template>\n\n<ng-template\n  #inputsForTimeTypeTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-date-time-range-filter\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [mode]=\"rxDatetimePickerMode.Time\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-date-time-range-filter>\n</ng-template>\n\n<ng-template\n  #inputsForDateTypeTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-date-time-range-filter\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [mode]=\"rxDatetimePickerMode.Date\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-date-time-range-filter>\n</ng-template>\n\n<ng-template\n  #inputsForDatetimeTypeTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-date-time-range-filter\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [mode]=\"rxDatetimePickerMode.DateTime\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-date-time-range-filter>\n</ng-template>\n\n<ng-template\n  #inputsForSelectionTypeTemplate\n  let-filterOption=\"filterOption\"\n  let-filterValue=\"value\"\n  let-filterControlsComponent=\"filterControlsComponent\"\n>\n  <rx-selection-filter\n    [filterOption]=\"filterOption\"\n    [filterValue]=\"filterValue\"\n    [filterControlsComponent]=\"filterControlsComponent\"\n    [namedFilterOptions]=\"namedFilterOptionsGetter(filterOption)\"\n  ></rx-selection-filter>\n</ng-template>\n", components: [{ type: i1.RxBooleanFilterComponent, selector: "rx-boolean-filter", inputs: ["filterOption", "filterValue", "filterControlsComponent", "namedFilterOptions", "isRequired"] }, { type: i2.RxStringWithTypeAheadFilterComponent, selector: "rx-string-with-type-ahead-filter", inputs: ["filterOption", "filterControlsComponent", "filterValue", "namedFilterOptions"] }, { type: i3.RxStringFilterComponent, selector: "rx-string-filter", inputs: ["filterOption", "filterValue", "filterControlsComponent", "namedFilterOptions"] }, { type: i4.RxNumberFilterComponent, selector: "rx-number-filter", inputs: ["filterOption", "filterControlsComponent", "filterValue", "namedFilterOptions"] }, { type: i5.RxDateTimeRangeFilterComponent, selector: "rx-date-time-range-filter", inputs: ["filterOption", "filterControlsComponent", "filterValue", "namedFilterOptions", "mode"] }, { type: i6.RxSelectionFilterComponent, selector: "rx-selection-filter", inputs: ["filterOption", "filterControlsComponent", "filterValue", "namedFilterOptions"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdvancedFilteringFieldsProviderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-advanced-filtering-fields-provider',
                    templateUrl: './advanced-filtering-fields-provider.component.html'
                }]
        }], propDecorators: { optionalBooleanFilter: [{
                type: ViewChild,
                args: ['optionalBooleanFilter', { static: true }]
            }], requiredBooleanFilter: [{
                type: ViewChild,
                args: ['requiredBooleanFilter', { static: true }]
            }], inputsForStringWithTypeAheadTemplate: [{
                type: ViewChild,
                args: ['inputsForStringWithTypeAheadTemplate', { static: true }]
            }], inputsForStringTypeTemplate: [{
                type: ViewChild,
                args: ['inputsForStringTypeTemplate', { static: true }]
            }], inputsForNumberTypeTemplate: [{
                type: ViewChild,
                args: ['inputsForNumberTypeTemplate', { static: true }]
            }], inputsForTimeTypeTemplate: [{
                type: ViewChild,
                args: ['inputsForTimeTypeTemplate', { static: true }]
            }], inputsForDateTypeTemplate: [{
                type: ViewChild,
                args: ['inputsForDateTypeTemplate', { static: true }]
            }], inputsForDatetimeTypeTemplate: [{
                type: ViewChild,
                args: ['inputsForDatetimeTypeTemplate', { static: true }]
            }], inputsForSelectionTypeTemplate: [{
                type: ViewChild,
                args: ['inputsForSelectionTypeTemplate', { static: true }]
            }], namedFilterOptionsGetter: [{
                type: Input
            }] } });
//# sourceMappingURL=advanced-filtering-fields-provider.component.js.map