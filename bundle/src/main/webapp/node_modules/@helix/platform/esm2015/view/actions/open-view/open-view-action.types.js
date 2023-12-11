import { OpenViewActionLaunchBehavior, OpenViewActionModalSize, OpenViewActionType } from '@helix/platform/view/api';
export const RX_OPEN_VIEW_MODAL_SIZE_OPTIONS = [
    {
        id: OpenViewActionModalSize.Xsmall,
        name: 'Extra Small (450 px)'
    },
    {
        id: OpenViewActionModalSize.Small,
        name: 'Small (650 px)'
    },
    {
        id: OpenViewActionModalSize.Medium,
        name: 'Medium (800 px)'
    },
    {
        id: OpenViewActionModalSize.Large,
        name: 'Large (1024 px)'
    },
    {
        id: OpenViewActionModalSize.Xlarge,
        name: 'Extra Large (1200 px)'
    },
    {
        id: OpenViewActionModalSize.Xxlarge,
        name: 'Extra Extra Large (1600 px)'
    },
    {
        id: OpenViewActionModalSize.FullSize,
        name: 'Full Size'
    }
];
export const RX_OPEN_VIEW_TYPE_OPTIONS = [
    {
        id: OpenViewActionType.FullWidth,
        name: 'Full width'
    },
    {
        id: OpenViewActionType.CenteredModal,
        name: 'Centered modal'
    },
    {
        id: OpenViewActionType.DockedLeftModal,
        name: 'Docked left modal'
    },
    {
        id: OpenViewActionType.DockedRightModal,
        name: 'Docked right modal'
    }
];
export const RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS = [
    {
        id: OpenViewActionLaunchBehavior.NewWindow,
        name: 'Open in a new tab'
    },
    {
        id: OpenViewActionLaunchBehavior.SameWindow,
        name: 'Open in the same tab'
    }
];
//# sourceMappingURL=open-view-action.types.js.map