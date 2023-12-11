export var RxButtonBarAlignment;
(function (RxButtonBarAlignment) {
    RxButtonBarAlignment["Left"] = "left";
    RxButtonBarAlignment["Right"] = "right";
    RxButtonBarAlignment["Center"] = "center";
})(RxButtonBarAlignment || (RxButtonBarAlignment = {}));
export const RX_BUTTON_BAR = {
    alignmentOptions: {
        left: {
            id: RxButtonBarAlignment.Left,
            name: 'Left',
            cls: 'align-left'
        },
        center: {
            id: RxButtonBarAlignment.Center,
            name: 'Center',
            cls: 'align-center'
        },
        right: {
            id: RxButtonBarAlignment.Right,
            name: 'Right',
            cls: 'align-right'
        }
    }
};
//# sourceMappingURL=button-bar.types.js.map