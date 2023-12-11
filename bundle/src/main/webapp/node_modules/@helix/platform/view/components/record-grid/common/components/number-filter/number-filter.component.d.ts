import { AdaptFilterControlsComponent, AdvancedFilterOption } from '@bmc-ux/adapt-angular';
import { IRecordGridColumnNamedFilterOption } from '../../types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
export declare class RxNumberFilterComponent {
    filterOption: AdvancedFilterOption;
    filterControlsComponent: AdaptFilterControlsComponent;
    filterValue: RxRecordGridAdvancedFilterValue;
    namedFilterOptions: IRecordGridColumnNamedFilterOption[];
    getNumberDataTypeModel(value: RxRecordGridAdvancedFilterValue, indexOfCounter: number): number;
    onNumberTypeFilterOptionModelChange(filterValue: RxRecordGridAdvancedFilterValue, controlComponent: AdaptFilterControlsComponent, newValue: [number, number]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNumberFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxNumberFilterComponent, "rx-number-filter", never, { "filterOption": "filterOption"; "filterControlsComponent": "filterControlsComponent"; "filterValue": "filterValue"; "namedFilterOptions": "namedFilterOptions"; }, {}, never, never>;
}
