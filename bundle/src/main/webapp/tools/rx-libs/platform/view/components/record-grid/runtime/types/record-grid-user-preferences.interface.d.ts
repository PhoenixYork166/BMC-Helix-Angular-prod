import { IRecordGridColumnUserPreferences } from './record-grid-column.types';
import { IRecordGridFilterPreset } from './record-grid-filter-preset.interface';
import { IRecordGridFilterData } from '@helix/platform/view/api';
export interface IRecordGridUserPreferences {
    columns: IRecordGridColumnUserPreferences[];
    filterPresets: IRecordGridFilterPreset[];
    filters: IRecordGridFilterData;
    visibleCardFieldIds: (number | string)[];
    appliedExternalFilterPresetGuid: string;
    viewPresets: {
        [presetGuid: string]: {
            initial: IRecordGridViewPreset;
            edited?: IRecordGridViewPreset;
        };
    };
}
export interface IRecordGridViewPreset {
    viewPresetGuid: string;
    columns: IRecordGridColumnUserPreferences[];
    filters: IRecordGridFilterData;
}
export declare type IRecordGridSharedViewPreset = Pick<IRecordGridViewPreset, 'columns' | 'filters'>;
