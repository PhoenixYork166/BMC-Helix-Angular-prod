import { ɵmakeDecorator as makeDecorator } from '@angular/core';
export const RX_VIEW_ACTION = {
    viewActionNames: {
        openView: 'rxOpenViewAction',
        launchUrl: 'rxLaunchUrlAction'
    }
};
export var OpenViewActionLaunchBehavior;
(function (OpenViewActionLaunchBehavior) {
    OpenViewActionLaunchBehavior["SameWindow"] = "sameWindow";
    OpenViewActionLaunchBehavior["NewWindow"] = "newWindow";
})(OpenViewActionLaunchBehavior || (OpenViewActionLaunchBehavior = {}));
export var OpenViewActionModalSize;
(function (OpenViewActionModalSize) {
    OpenViewActionModalSize["Xsmall"] = "rx-xs";
    OpenViewActionModalSize["Small"] = "rx-sm";
    OpenViewActionModalSize["Medium"] = "rx-md";
    OpenViewActionModalSize["Large"] = "rx-lg";
    OpenViewActionModalSize["Xlarge"] = "rx-xl";
    OpenViewActionModalSize["Xxlarge"] = "rx-xxl";
    OpenViewActionModalSize["FullSize"] = "rx-full-size";
})(OpenViewActionModalSize || (OpenViewActionModalSize = {}));
export var OpenViewActionType;
(function (OpenViewActionType) {
    OpenViewActionType["FullWidth"] = "fullWidth";
    OpenViewActionType["CenteredModal"] = "centeredModal";
    OpenViewActionType["DockedLeftModal"] = "dockedLeftModal";
    OpenViewActionType["DockedRightModal"] = "dockedRightModal";
})(OpenViewActionType || (OpenViewActionType = {}));
export const RxViewAction = makeDecorator('RxViewAction');
//# sourceMappingURL=view-action.types.js.map