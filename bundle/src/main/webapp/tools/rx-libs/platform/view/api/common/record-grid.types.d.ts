import { IFieldDefinition } from '@helix/platform/record/api';
import { Observable } from 'rxjs';
import { SelectedAdvancedFilter } from '@bmc-ux/adapt-angular';
import { IRecordGridFilterData } from './record-grid-query-filter.types';
import { RowDataItem } from '@bmc-ux/adapt-table';
import { IViewPresetApi } from './view-preset.types';
export declare const RowDataItemIdFieldName = "$ID$";
export interface IRowDataItem extends RowDataItem {
    [RowDataItemIdFieldName]: string;
}
export declare enum ApplyGridFilterMode {
    Append = "Append",
    Remove = "Remove",
    Overwrite = "Overwrite",
    Merge = "Merge",
    Clear = "Clear",
    Begin = "Begin",
    End = "End"
}
export interface IRecordGridColumnPublicProperties {
    field: string;
    header: string;
    hidden: boolean;
    fieldDefinition: IFieldDefinition;
}
export interface IRxRecordGridApi extends IViewPresetApi {
    refresh: () => Observable<never>;
    setFilter: (filters: SelectedAdvancedFilter[]) => void;
    getColumns: () => IRecordGridColumnPublicProperties[];
    getRecordDefinitionName: () => string;
    getSelectedRows: (inSortOrder?: boolean) => IRowDataItem[];
    setSelectedRows: (selectedRows: IRowDataItem[]) => void;
    getFirstSelectedRow: () => IRowDataItem;
    getSelectedRowCount: () => number;
    getVisibleRows: () => IRowDataItem[];
    applyFilters: (filters: IRecordGridFilterData, mode: ApplyGridFilterMode) => void;
}
