import { IPresetItem, IRecordGridViewPresetColumnData } from '../record-grid-view-presets-widget.types';
import { IRecordGridDesignInspectorColumnConfig } from '../../record-grid-column-editor-control/record-grid-column-editor.types';
import { IRecordGridSortEditorControlOptions, IRecordGridSortEditorModel } from '../../record-grid-sort-editor-control/record-grid-sort-editor-control.types';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IRecordGridFilterModel, IRecordGridFilterSelectControlOptions } from '../../record-grid-filter-select-control/record-grid-filter-select-control.types';
import { IViewComponentDesignData } from '@helix/platform/view/designer';
import { IGridViewPresetProperties } from '../../../../common/types/record-grid.types';
export interface IRecordGridEditViewPresetsModalOptions {
    viewPresets: IViewComponentDesignData<IGridViewPresetProperties>[];
    presetsList: IPresetItem[];
    gridColumns: IRecordGridDesignInspectorColumnConfig[];
    recordDefinition: IRecordDefinition;
    activePreset?: string;
    isReadOnly: boolean;
}
export interface IRecordGridEditViewPresetsModalResult {
    presets: IRecordGridEditViewPresetsModalData[];
}
export interface IRecordGridEditViewPresetsModalData {
    presetName: string;
    guid: string;
    gridColumns: IRecordGridDesignInspectorColumnConfig[];
    presetColumns: IRecordGridViewPresetColumnData[];
    tags: IRecordGridEditViewPresetsModalTags;
    isOpen: boolean;
    sortModel?: IRecordGridSortEditorModel;
    filters: IRecordGridFilterModel;
    filterSelectControlOptions: IRecordGridFilterSelectControlOptions;
    sortEditorControlOptions: IRecordGridSortEditorControlOptions;
}
export interface IRecordGridEditViewPresetsModalTags {
    items: string[];
    restCount: number;
}
