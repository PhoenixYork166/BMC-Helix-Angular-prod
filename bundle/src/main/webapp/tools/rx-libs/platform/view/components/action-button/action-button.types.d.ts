import { IRxDisabledProp, IRxStandardProps } from '@helix/platform/view/api';
export interface IActionButtonProperties extends IRxStandardProps, IRxDisabledProp {
    cls?: string;
    fieldId?: string;
    icon?: string;
    iconAlignment?: ActionButtonIconAlignment;
    iconCls?: string;
    label?: string;
    labelKey?: string;
    recordDefinitionName?: string;
    recordInstance?: string | any;
    size?: ActionButtonSize;
    style?: ActionButtonStyle;
    action?: string;
}
export declare enum ActionButtonStyle {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary"
}
export declare enum DeprecatedActionButtonStyle {
    Link = "link",
    Clear = "clear"
}
export declare enum ActionButtonSize {
    Small = "small",
    Default = "default",
    Large = "large"
}
export declare enum ActionButtonIconAlignment {
    Left = "left",
    Right = "right"
}
