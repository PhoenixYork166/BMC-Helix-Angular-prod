import { ToolbarConfig } from '@bmc-ux/adapt-table';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { SortMeta } from 'primeng/api';
import { IAdaptTableColumnConfig } from '../runtime/types/record-grid-column.types';
import { IRecordGridPredefinedFilterPreset } from '../runtime/types/record-grid-predefined-filter-preset.interface';
import { IRecordGridDesignInspectorColumnConfig } from './editors/record-grid-column-editor-control';
import { IRecordGridFilterModel, RecordGridFilterMode } from './editors/record-grid-filter-select-control';
import { IRecordGridSortEditorModel } from './editors/record-grid-sort-editor-control';
import { IRxAvailableOnDevicesProp } from '@helix/platform/view/api';
export interface IRecordGridProperties extends IRxAvailableOnDevicesProp {
    bordered?: boolean;
    expandable: boolean;
    name?: string;
    recordDefinitionName: string;
    showDataForAllLocales: boolean;
    associationDefinitionName: string;
    associatedRecordNodeSide: string;
    associatedRecordId: string;
    associatedRoleName: string;
    enableRowSelection: string;
    styles: string;
    cardLayoutWidth: string;
    filterExpression: string;
    enableFiltering: boolean;
    requiredFilters: number;
    getDataForHiddenColumns: boolean;
    enableFilterPresets: boolean;
    filters: string;
    defaultFilterPreset: string;
    striped?: boolean;
    viewPresetSelector?: string;
}
export interface IRecordGridDesignProperties extends IRxAvailableOnDevicesProp {
    name?: string;
    mode: RecordGridDesignDefinitionMode;
    recordDefinitionName: string;
    associationDefinitionName: string;
    showDataForAllLocales: boolean;
    associatedRecordId: string;
    associatedRoleName: string;
    bordered?: boolean;
    enableRowSelection: string;
    expandable: boolean;
    initialSortColumn: IRecordGridSortEditorModel;
    columns: IRecordGridDesignInspectorColumnConfig[];
    styles: string;
    cardLayoutWidth: string;
    enableFiltering: boolean;
    getDataForHiddenColumns: boolean;
    requiredFilters: number;
    enableFilterPresets: boolean;
    filterMode: RecordGridFilterMode;
    filters: IRecordGridFilterModel;
    filterExpression: string;
    filterPresets: IRecordGridPredefinedFilterPreset[];
    defaultFilterPreset: string;
    striped?: boolean;
    associatedRecordNodeSide?: string;
    viewPresetSelector?: string;
}
export declare enum RecordGridDesignDefinitionMode {
    Record = "record",
    Association = "association"
}
export interface IRecordGridDesignAdaptTableConfig {
    columns: IAdaptTableColumnConfig[];
    sortMeta: SortMeta;
    toolbarConfig: ToolbarConfig;
}
export declare type RecordGridDesignValidationIssue = IViewComponentDesignValidationIssue<{
    columnGuid?: string;
    actionIndex?: number;
}>;
export declare type RecordGridRowActionValidationIssue = IViewComponentDesignValidationIssue<{
    rowActionIndex: number;
    actionIndex: number;
}>;
