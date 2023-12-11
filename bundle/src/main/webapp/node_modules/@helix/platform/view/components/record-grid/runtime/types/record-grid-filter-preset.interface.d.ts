import { IRecordGridFilterData } from '@helix/platform/view/api';
export interface IRecordGridFilterPreset {
    guid: string;
    title: string;
    filterData: IRecordGridFilterData;
    appliedSharedFilterPresetGuid?: string;
}
