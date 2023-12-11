import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
export const RX_SHARABLE_VIEW_RESETS_FEATURE_NAME = '23503_SHARABLE_VIEW_PRESET';
export const RX_VIEW_PRESET = {
    user: {
        recordDefinitionName: 'CTM:People',
        fields: {
            fullName: 1000000017,
            lastName: 1000000018,
            firstName: 1000000019,
            loginId: RX_RECORD_DEFINITION.coreFieldIds.assignee,
            recordId: RX_RECORD_DEFINITION.coreFieldIds.id,
            email: 1000000048
        }
    },
    sharedViewPreset: {
        recordDefinitionName: 'com.bmc.arsys.rx.settings:SharedViewPreset',
        fields: {
            viewPresetName: 58200,
            viewName: 58201,
            viewPresetInfo: 58202,
            viewPresetSelectorGuid: 58203,
            sharedUsers: 58204,
            id: RX_RECORD_DEFINITION.coreFieldIds.id,
            ownerFullName: 58205
        }
    }
};
//# sourceMappingURL=view-preset-selector.types.js.map