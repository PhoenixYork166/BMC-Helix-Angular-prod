import { AdaptFilterControlsComponent, AdvancedFilterOption } from '@bmc-ux/adapt-angular';
import { SelectOption } from '@bmc-ux/obsolete';
import { IRecordGridColumnNamedFilterOption } from '../../types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
export declare class RxSelectionFilterComponent {
    filterOption: AdvancedFilterOption;
    filterControlsComponent: AdaptFilterControlsComponent;
    set filterValue(values: RxRecordGridAdvancedFilterValue<string[]>);
    get filterValue(): RxRecordGridAdvancedFilterValue<string[]>;
    namedFilterOptions: IRecordGridColumnNamedFilterOption[];
    selectionTypeModel: any[];
    private _filterValue;
    getSelectionTypeOptions(): SelectOption[];
    onSelectionTypeFilterOptionModelChange(value: SelectOption[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSelectionFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxSelectionFilterComponent, "rx-selection-filter", never, { "filterOption": "filterOption"; "filterControlsComponent": "filterControlsComponent"; "filterValue": "filterValue"; "namedFilterOptions": "namedFilterOptions"; }, {}, never, never>;
}
