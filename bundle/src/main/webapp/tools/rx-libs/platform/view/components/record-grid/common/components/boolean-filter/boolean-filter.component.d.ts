import { AdaptFilterControlsComponent, AdvancedFilterBooleanDataType, AdvancedFilterOption } from '@bmc-ux/adapt-angular';
import { SelectOption } from '@bmc-ux/obsolete';
import { IRecordGridColumnNamedFilterOption } from '../../types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
export declare class RxBooleanFilterComponent {
    filterOption: AdvancedFilterOption;
    set filterValue(values: RxRecordGridAdvancedFilterValue<AdvancedFilterBooleanDataType[]>);
    get filterValue(): RxRecordGridAdvancedFilterValue<AdvancedFilterBooleanDataType[]>;
    filterControlsComponent: AdaptFilterControlsComponent;
    namedFilterOptions: IRecordGridColumnNamedFilterOption[];
    isRequired: boolean;
    selectedValues: SelectOption[];
    private _filterValue;
    selectOptionFormatter(option: SelectOption): string;
    onValueChange(values: SelectOption[]): void;
    getSelectOptions(): SelectOption[];
    onValueChangeRequired(model: AdvancedFilterBooleanDataType): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBooleanFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxBooleanFilterComponent, "rx-boolean-filter", never, { "filterOption": "filterOption"; "filterValue": "filterValue"; "filterControlsComponent": "filterControlsComponent"; "namedFilterOptions": "namedFilterOptions"; "isRequired": "isRequired"; }, {}, never, never>;
}
