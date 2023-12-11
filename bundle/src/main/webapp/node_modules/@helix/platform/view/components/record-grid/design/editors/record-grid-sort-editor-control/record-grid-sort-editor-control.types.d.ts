import { IRecordGridDesignInspectorColumnConfig } from '../record-grid-column-editor-control';
import { ColumnSortDirection } from '../../../common/types/record-grid.types';
import { IRecordDefinition } from '@helix/platform/record/api';
export interface IRecordGridSortEditorControlOptions {
    label: string;
    gridColumns: IRecordGridDesignInspectorColumnConfig[];
    recordDefinition: IRecordDefinition;
    required?: boolean;
}
export interface IRecordGridSortEditorModel {
    fieldId: string;
    direction: ColumnSortDirection;
}
