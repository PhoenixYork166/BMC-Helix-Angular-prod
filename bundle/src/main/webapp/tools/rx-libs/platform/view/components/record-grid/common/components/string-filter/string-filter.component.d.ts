import { AdaptFilterControlsComponent, AdaptMetatagComponent, AdvancedFilterBooleanDataType, AdvancedFilterOption, TagType } from '@bmc-ux/adapt-angular';
import { IRecordGridColumnNamedFilterOption } from '../../types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
export declare class RxStringFilterComponent {
    filterOption: AdvancedFilterOption;
    filterValue: RxRecordGridAdvancedFilterValue<AdvancedFilterBooleanDataType[]>;
    filterControlsComponent: AdaptFilterControlsComponent;
    namedFilterOptions: IRecordGridColumnNamedFilterOption[];
    onStringTypeFilterOptionModelChange(model: TagType[], tagField: AdaptMetatagComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxStringFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxStringFilterComponent, "rx-string-filter", never, { "filterOption": "filterOption"; "filterValue": "filterValue"; "filterControlsComponent": "filterControlsComponent"; "namedFilterOptions": "namedFilterOptions"; }, {}, never, never>;
}
