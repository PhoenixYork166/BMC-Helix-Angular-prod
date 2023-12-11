import { RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { IViewPreset } from '../view-preset-selector.types';
import { TagModel } from '@bmc-ux/adapt-angular';
export interface IShareViewPresetModalData {
    runtimeViewModelApi: RuntimeViewModelApi;
    currentViewPreset: IViewPreset;
    presetSelectorGuid: string;
}
export interface ISaveSharedViewPresetPayload {
    runtimeViewModelApi: RuntimeViewModelApi;
    currentViewPreset: IViewPreset;
    presetSelectorGuid: string;
    sharedUsers?: IShareViewPresetUserPayload[];
}
export interface ISharedViewPresetItem {
    label: string;
    guid: string;
    ownerFullName: string;
}
export declare type ITagUserAutocompleteValue = TagModel<IShareViewPresetUserPayload>;
export interface IShareViewPresetUserPayload {
    fullName: string;
    emailAddress: string;
    loginId: string;
}
export interface IShareViewPresetPayload {
    viewPresetName: string;
    viewName: string;
    viewPresetGuid: string;
    submitter: string;
    sharedUsers: IShareViewPresetUserPayload[];
    presetInformation: string;
}
