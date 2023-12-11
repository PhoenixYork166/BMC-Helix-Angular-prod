import { IRecordGridDesignInspectorColumnConfig } from '../../record-grid-column-editor-control/record-grid-column-editor.types';
import { IRecordGridViewPresetColumnData } from '../record-grid-view-presets-widget.types';
export interface IRecordGridViewPresetColumnsModalOptions {
    gridColumns: IRecordGridDesignInspectorColumnConfig[];
    presetColumns: IRecordGridViewPresetColumnData[];
    presetName: string;
    isReadOnly: boolean;
}
export interface IRecordGridViewPresetColumn extends IRecordGridViewPresetColumnData {
    isOpen: boolean;
    title: string;
    fallbackTitle?: string;
}
export interface IRecordGridViewPresetColumnsModalResult {
    presetColumns: IRecordGridViewPresetColumnData[];
}
