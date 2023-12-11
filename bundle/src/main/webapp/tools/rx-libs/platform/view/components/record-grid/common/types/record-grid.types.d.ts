export interface IRecordGridColumnNamedFilterOptionDesign {
    filterExpression: string;
    index: number;
    title: string;
}
export interface IRecordGridColumnNamedFilterOption extends IRecordGridColumnNamedFilterOptionDesign {
    guid: string;
}
export interface IRecordGridNamedFilterOptionsMap {
    [fieldId: string]: IRecordGridColumnNamedFilterOption[];
}
export declare type RxAdvancedFilterDateDataType = [moment.Moment, moment.Moment];
export interface IGridViewPresetProperties {
    viewPresetGuid: string;
    filters: string;
}
export interface IGridViewColumnProperties {
    fieldId: string;
    index: number;
    visible: boolean;
    sortable: IRecordGridSortableObject | null;
    width?: string;
}
export interface IRecordGridSortableObject {
    direction: ColumnSortDirection;
}
export declare enum ColumnSortDirection {
    Asc = "asc",
    Desc = "desc"
}
