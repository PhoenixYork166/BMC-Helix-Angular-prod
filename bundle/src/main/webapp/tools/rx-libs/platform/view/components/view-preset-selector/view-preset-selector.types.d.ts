export interface IViewPresetProperties {
    label: string;
    index: number;
}
export declare const RX_SHARABLE_VIEW_RESETS_FEATURE_NAME = "23503_SHARABLE_VIEW_PRESET";
export declare const RX_VIEW_PRESET: {
    user: {
        recordDefinitionName: string;
        fields: {
            fullName: number;
            lastName: number;
            firstName: number;
            loginId: number;
            recordId: number;
            email: number;
        };
    };
    sharedViewPreset: {
        recordDefinitionName: string;
        fields: {
            viewPresetName: number;
            viewName: number;
            viewPresetInfo: number;
            viewPresetSelectorGuid: number;
            sharedUsers: number;
            id: number;
            ownerFullName: number;
        };
    };
};
