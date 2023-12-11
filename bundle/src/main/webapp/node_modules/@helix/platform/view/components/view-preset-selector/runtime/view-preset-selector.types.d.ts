export interface IViewPreset {
    guid: string;
    label: string;
    userSharedViewPresetGuid?: string;
}
export interface IViewPresetSelectorDropdownOption extends IViewPreset {
    isSystem?: boolean;
    isShared?: boolean;
}
export interface IViewPresetSelectorUserPreferences {
    customViewPresets: IViewPreset[];
    sharedViewPresets: IViewPreset[];
    viewPresetGuid: string;
}
export interface IViewPresetSelectorUserPreferencesApplyResult {
    state: IViewPresetSelectorState;
    shouldUpdatePreferences: boolean;
    removedPresetGuid: string;
}
export interface IViewPresetSelectorState {
    appliedViewPresetOption: IViewPresetSelectorDropdownOption;
    customViewPresetOptions: IViewPresetSelectorDropdownOption[];
    systemViewPresetOptions: IViewPresetSelectorDropdownOption[];
    sharedViewPresetOptions: IViewPresetSelectorDropdownOption[];
    isSharingEnabled: boolean;
}
export interface IViewPresetSelectorConfig {
    styles: string;
    viewPresets: IViewPresetSelectorDropdownOption[];
    enableSharing: boolean;
}
