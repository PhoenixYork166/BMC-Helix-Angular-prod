import { AdvancedFilterOption, AdvancedFilterTagModel, AdvancedFilterTexts, SavedAdvancedFilter, SelectedAdvancedFilter, TagModel } from '@bmc-ux/adapt-angular';
import { IPlainObject } from '@helix/platform/shared/api';
import { IRecordGridFilterConfigs } from './record-grid-filter-config.interfaces';
import { IRecordGridFilterData } from '@helix/platform/view/api';
import { RxRecordGridAdvancedFilterValue } from './record-grid-advanced-filter-value.class';
export interface IRxRecordGridFilter {
    fieldId: string;
    guid: string;
    value: string;
    $DISPLAYVALUE$?: string;
}
export interface IFilterExpression {
    [key: string]: string;
}
export interface IRxRecordGridSavedAdvancedFilter extends SavedAdvancedFilter {
    filterData?: IRecordGridFilterData;
    appliedSharedFilterPresetGuid?: string;
}
export interface IRxRecordGridSharedFilterPreset extends IRxRecordGridSavedAdvancedFilter {
    filterExpression: string;
    isDefault: boolean;
}
export interface ISharedFilterPresetTagModel extends AdvancedFilterTagModel {
    isSharedFilterPreset: true;
}
export interface IRecordGridFiltering {
    filterTexts: AdvancedFilterTexts;
    filterOptions?: AdvancedFilterOption[];
    selectedFilters?: SelectedAdvancedFilter<RxRecordGridAdvancedFilterValue>[];
    activeSavedFilter: IRxRecordGridSavedAdvancedFilter | IRxRecordGridSharedFilterPreset;
    appliedSharedFilterPreset: IRxRecordGridSharedFilterPreset;
    savedFilters: IRxRecordGridSavedAdvancedFilter[];
    recordGridFilterConfigs: IRecordGridFilterConfigs;
    hasLoadedSharedFilterPresets: boolean;
    isLoading: boolean;
    toolbarTags: IRecordGridFilterTag[];
    pendingSelectedFilters?: SelectedAdvancedFilter[];
    selectedCardValues?: IPlainObject;
}
export declare type IRecordGridFilterTag = TagModel<ISharedFilterPresetTagModel | AdvancedFilterTagModel>;
