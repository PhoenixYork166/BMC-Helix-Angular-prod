import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IRecordGridPredefinedFilterPreset } from '../../../runtime/types/record-grid-predefined-filter-preset.interface';
import { IRecordGridFilterSelectControlOptions, IRecordGridFilterModel } from '../record-grid-filter-select-control/record-grid-filter-select-control.types';
import { IRecordGridDesignInspectorColumnConfig } from '../record-grid-column-editor-control/record-grid-column-editor.types';
import { IRecordGridNamedFilterOptionsMap } from '../../../common/types/record-grid.types';
export interface IRecordGridFilterPresetEditorControlOptions {
    label: string;
    tooltip?: AdaptRxControlLabelTooltip;
    primaryRecordDefinition: IRecordDefinition;
    columns: IRecordGridDesignInspectorColumnConfig[];
}
export interface IRecordGridFilterPresetDescriptorModel {
    title: string;
    filters: string;
    filterExpression?: string;
    index?: number;
}
export interface IRecordGridFilterPresetEditorModalParams {
    filterPresets: IRecordGridPredefinedFilterPreset[];
    activeFilterPreset: IRecordGridPredefinedFilterPreset;
    primaryRecordDefinition: IRecordDefinition;
    selectedFieldIds: string[];
    isReadOnly: boolean;
    namedFilterOptions?: IRecordGridNamedFilterOptionsMap;
}
export interface IRecordGridFilterPresetEditorModalResult {
    filterPresets: IRecordGridPredefinedFilterPreset[];
}
export interface IPredefinedFilterPresetEditorPresetData extends IRecordGridPredefinedFilterPreset {
    isOpen: boolean;
    filterSelectOptions: IRecordGridFilterSelectControlOptions;
    filterSelect: IRecordGridFilterModel;
}
