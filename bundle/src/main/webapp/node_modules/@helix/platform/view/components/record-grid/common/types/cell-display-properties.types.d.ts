import { IColumnEditorColumnData } from '../../design/editors/record-grid-column-editor-control/record-grid-column-editor.types';
export interface ICellDisplayPropertiesEditorConfig {
    cellDisplayProperties: ICellDisplayProperties[];
    isReadOnly: boolean;
    columns: IColumnEditorColumnData[];
}
export interface ICellDisplayProperties {
    fieldValueCondition: string;
    displayAsBadge: boolean;
    badgeColor: string;
    icon: string;
    iconPosition: RxGridCellIconPosition;
    textColor: RxGridCellColor;
    backgroundColor: RxGridCellColor;
    fontSize: RxGridCellFontSize;
    bold: boolean;
    italic: boolean;
    isOpen?: boolean;
}
export declare enum RxGridCellFontSize {
    Small = "small",
    Large = "large"
}
export declare enum RxGridCellColor {
    Primary = "primary",
    Secondary = "secondary",
    Light = "light",
    Active = "active",
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger"
}
export declare enum RxGridCellIconPosition {
    Left = "left",
    Right = "right",
    ReplaceText = "replaceText"
}
export declare const RxGridCellFontColorCssMap: {
    primary: string;
    secondary: string;
    light: string;
    active: string;
    info: string;
    success: string;
    warning: string;
    danger: string;
};
export declare const RxGridCellBgColorCssMap: {
    primary: string;
    secondary: string;
    active: string;
    info: string;
    success: string;
    warning: string;
    danger: string;
};
export declare const RX_CELL_PROPERTIES: {
    colorsList: {
        label: string;
        value: RxGridCellColor;
    }[];
    iconPositions: {
        label: string;
        value: RxGridCellIconPosition;
    }[];
    fontSizes: {
        label: string;
        value: RxGridCellFontSize;
    }[];
};
