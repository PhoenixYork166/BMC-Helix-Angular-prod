import { ISharedViewPresetItem } from '../share-view-preset/share-view-preset.types';
export interface IAddSharedViewPresetsModalData {
    presetSelectorGuid: string;
    newPresets: ISharedViewPresetItem[];
}
export interface ISharedViewPresetDescriptor {
    label: string;
    guid: string;
}
