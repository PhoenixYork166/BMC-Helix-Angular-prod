import { BooleanLike, RxEvaluatedExpression } from '@helix/platform/shared/api';
import { RecordGridColumnAlignment } from '../../common/types/record-grid-column-alignment.enum';
import { IRxRecordGridAction } from './record-grid-action.types';
import { TemplateRef } from '@angular/core';
import { ColumnConfig, DataCellTemplateParams } from '@bmc-ux/adapt-table';
import { IFieldDefinition } from '@helix/platform/record/api';
import { ICellDisplayProperties } from '../../common/types/cell-display-properties.types';
import { ColumnSortDirection, IRecordGridColumnNamedFilterOption } from '../../common/types/record-grid.types';
export interface IRecordGridColumn {
    actions?: IRxRecordGridAction[];
    alignment?: RecordGridColumnAlignment;
    clickable?: RxEvaluatedExpression<BooleanLike>;
    fieldId: string;
    filterable?: RxEvaluatedExpression<BooleanLike>;
    guid?: string;
    index?: number;
    sortable?: BooleanLike | IColumnSortInfo;
    searchable?: BooleanLike;
    title: string;
    visible?: RxEvaluatedExpression<BooleanLike>;
    cellTemplate?: TemplateRef<DataCellTemplateParams>;
    cellDisplayProperties?: ICellDisplayProperties[];
    predefinedFilterPresets?: IRecordGridColumnNamedFilterOption[];
    additionalQueryCriteria?: string;
}
export interface IColumnSortInfo {
    direction: ColumnSortDirection;
    priority: number;
}
export interface IRecordGridColumnUserPreferences {
    visible: boolean;
    fieldId: string;
    index: number;
    sort?: IColumnSortInfo;
    width?: string;
}
export interface IRecordGridColumnWithMetadata {
    actions?: IRxRecordGridAction[];
    alignment?: RecordGridColumnAlignment;
    clickable?: boolean;
    clickableWithHref?: boolean;
    fieldDefinition?: IFieldDefinition;
    fieldId: string;
    filterable: boolean;
    filterType?: string;
    guid?: string;
    headerTooltip?: string;
    index?: number;
    sortable: IRecordGridSortable;
    searchable: boolean;
    title?: string;
    fallbackTitle?: string;
    visible: boolean;
    cellTemplate?: TemplateRef<DataCellTemplateParams>;
    width?: string;
    wrapText?: boolean;
    cellDisplayProperties?: ICellDisplayProperties[];
    predefinedFilterPresets?: IRecordGridColumnNamedFilterOption[];
    referenced?: boolean;
    typeaheadKeystrokeCount?: number;
    additionalQueryCriteria?: string;
}
export declare type IRecordGridSortable = BooleanLike | IColumnSortInfo | string;
export interface IAdaptTableColumnConfig extends ColumnConfig {
    clickable?: boolean;
    clickableWithHref?: boolean;
    customTemplate?: TemplateRef<DataCellTemplateParams>;
    filterType?: string;
    searchable?: boolean;
    isDownloadableAttachment?: boolean;
    isRowActionsColumn?: boolean;
    wrapText?: boolean;
    cellDisplayProperties?: ICellDisplayProperties[];
    fallbackTitle?: string;
    referenced?: boolean;
    typeaheadKeystrokeCount?: number;
    additionalQueryCriteria?: string;
}
