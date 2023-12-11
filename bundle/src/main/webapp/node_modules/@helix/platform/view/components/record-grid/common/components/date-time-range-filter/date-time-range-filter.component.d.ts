import { AdaptFilterControlsComponent, AdvancedFilterOption, RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { IRecordGridColumnNamedFilterOption, RxAdvancedFilterDateDataType } from '../../types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
export declare class RxDateTimeRangeFilterComponent {
    filterOption: AdvancedFilterOption;
    filterControlsComponent: AdaptFilterControlsComponent;
    filterValue: RxRecordGridAdvancedFilterValue;
    namedFilterOptions: IRecordGridColumnNamedFilterOption[];
    mode: RxDatetimePickerMode;
    rxDatetimePickerMode: typeof RxDatetimePickerMode;
    onTimeTypeFilterOptionModelChange(model: RxAdvancedFilterDateDataType): void;
    onDateTypeFilterOptionModelChange(model: RxAdvancedFilterDateDataType): void;
    onDateTimeTypeFilterOptionModelChange(newValue: RxAdvancedFilterDateDataType): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDateTimeRangeFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxDateTimeRangeFilterComponent, "rx-date-time-range-filter", never, { "filterOption": "filterOption"; "filterControlsComponent": "filterControlsComponent"; "filterValue": "filterValue"; "namedFilterOptions": "namedFilterOptions"; "mode": "mode"; }, {}, never, never>;
}
