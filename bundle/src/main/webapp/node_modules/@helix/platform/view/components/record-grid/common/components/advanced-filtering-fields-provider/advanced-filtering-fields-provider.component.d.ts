import { TemplateRef } from '@angular/core';
import { AdvancedFilterOption, FilterOptionTemplateParams, RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { IRecordGridColumnNamedFilterOption } from '../../types/record-grid.types';
import * as i0 from "@angular/core";
export declare class RxAdvancedFilteringFieldsProviderComponent {
    optionalBooleanFilter: TemplateRef<FilterOptionTemplateParams>;
    requiredBooleanFilter: TemplateRef<FilterOptionTemplateParams>;
    inputsForStringWithTypeAheadTemplate: TemplateRef<FilterOptionTemplateParams>;
    inputsForStringTypeTemplate: TemplateRef<FilterOptionTemplateParams>;
    inputsForNumberTypeTemplate: TemplateRef<FilterOptionTemplateParams>;
    inputsForTimeTypeTemplate: TemplateRef<FilterOptionTemplateParams>;
    inputsForDateTypeTemplate: TemplateRef<FilterOptionTemplateParams>;
    inputsForDatetimeTypeTemplate: TemplateRef<FilterOptionTemplateParams>;
    inputsForSelectionTypeTemplate: TemplateRef<FilterOptionTemplateParams>;
    rxDatetimePickerMode: typeof RxDatetimePickerMode;
    namedFilterOptionsGetter: (filterOptionConfig: AdvancedFilterOption) => IRecordGridColumnNamedFilterOption[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAdvancedFilteringFieldsProviderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxAdvancedFilteringFieldsProviderComponent, "rx-advanced-filtering-fields-provider", never, { "namedFilterOptionsGetter": "namedFilterOptionsGetter"; }, {}, never, never>;
}
