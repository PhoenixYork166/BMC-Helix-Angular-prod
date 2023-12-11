export var RxGridCellFontSize;
(function (RxGridCellFontSize) {
    RxGridCellFontSize["Small"] = "small";
    RxGridCellFontSize["Large"] = "large";
})(RxGridCellFontSize || (RxGridCellFontSize = {}));
export var RxGridCellColor;
(function (RxGridCellColor) {
    RxGridCellColor["Primary"] = "primary";
    RxGridCellColor["Secondary"] = "secondary";
    RxGridCellColor["Light"] = "light";
    RxGridCellColor["Active"] = "active";
    RxGridCellColor["Info"] = "info";
    RxGridCellColor["Success"] = "success";
    RxGridCellColor["Warning"] = "warning";
    RxGridCellColor["Danger"] = "danger";
})(RxGridCellColor || (RxGridCellColor = {}));
export var RxGridCellIconPosition;
(function (RxGridCellIconPosition) {
    RxGridCellIconPosition["Left"] = "left";
    RxGridCellIconPosition["Right"] = "right";
    RxGridCellIconPosition["ReplaceText"] = "replaceText";
})(RxGridCellIconPosition || (RxGridCellIconPosition = {}));
export const RxGridCellFontColorCssMap = {
    [RxGridCellColor.Primary]: 'text-primary',
    [RxGridCellColor.Secondary]: 'text-secondary',
    [RxGridCellColor.Light]: 'text-white',
    [RxGridCellColor.Active]: 'text-active',
    [RxGridCellColor.Info]: 'text-info',
    [RxGridCellColor.Success]: 'text-success',
    [RxGridCellColor.Warning]: 'text-warning',
    [RxGridCellColor.Danger]: 'text-danger'
};
export const RxGridCellBgColorCssMap = {
    [RxGridCellColor.Primary]: 'bg-primary',
    [RxGridCellColor.Secondary]: 'bg-secondary',
    [RxGridCellColor.Active]: 'bg-active',
    [RxGridCellColor.Info]: 'bg-info',
    [RxGridCellColor.Success]: 'bg-success',
    [RxGridCellColor.Warning]: 'bg-warning',
    [RxGridCellColor.Danger]: 'bg-danger'
};
export const RX_CELL_PROPERTIES = {
    colorsList: [
        {
            label: 'Default',
            value: null
        },
        {
            label: 'Primary',
            value: RxGridCellColor.Primary
        },
        {
            label: 'Secondary',
            value: RxGridCellColor.Secondary
        },
        {
            label: 'Light',
            value: RxGridCellColor.Light
        },
        {
            label: 'Active',
            value: RxGridCellColor.Active
        },
        {
            label: 'Information',
            value: RxGridCellColor.Info
        },
        {
            label: 'Success',
            value: RxGridCellColor.Success
        },
        {
            label: 'Warning',
            value: RxGridCellColor.Warning
        },
        {
            label: 'Danger',
            value: RxGridCellColor.Danger
        }
    ],
    iconPositions: [
        {
            label: 'Left',
            value: RxGridCellIconPosition.Left
        },
        {
            label: 'Right',
            value: RxGridCellIconPosition.Right
        },
        {
            label: 'Replace text',
            value: RxGridCellIconPosition.ReplaceText
        }
    ],
    fontSizes: [
        {
            label: 'Default',
            value: null
        },
        {
            label: 'Small',
            value: RxGridCellFontSize.Small
        },
        {
            label: 'Large',
            value: RxGridCellFontSize.Large
        }
    ]
};
//# sourceMappingURL=cell-display-properties.types.js.map