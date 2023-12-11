import { EventEmitter } from '@angular/core';
import { AdaptFilterControlsComponent, AdvancedFilterOption } from '@bmc-ux/adapt-angular';
import { IRecordGridColumnNamedFilterOption } from '../../types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
export declare class RxNamedFilterOptionsListComponent {
    namedFilterOptions: IRecordGridColumnNamedFilterOption[];
    filterOption: AdvancedFilterOption;
    set filterValue(values: RxRecordGridAdvancedFilterValue);
    get filterValue(): RxRecordGridAdvancedFilterValue;
    filterControlsComponent: AdaptFilterControlsComponent;
    defaultFilterValue: any;
    readonly namedFilterOptionsChange: EventEmitter<string[]>;
    private _filterValue;
    namedFilterOptionsModel: {
        [id: string]: boolean;
    };
    trackByOptionGuid(index: number, option: IRecordGridColumnNamedFilterOption): string;
    onNamedFilterOptionChange(): void;
    private getSelectedNamedOptionsIds;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNamedFilterOptionsListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxNamedFilterOptionsListComponent, "rx-named-filter-options-list", never, { "namedFilterOptions": "namedFilterOptions"; "filterOption": "filterOption"; "filterValue": "filterValue"; "filterControlsComponent": "filterControlsComponent"; "defaultFilterValue": "defaultFilterValue"; }, { "namedFilterOptionsChange": "namedFilterOptionsChange"; }, never, never>;
}
