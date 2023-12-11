import { ActionButtonIconAlignment, ActionButtonSize, ActionButtonStyle } from '../action-button.types';
import { IRxAvailableOnDevicesProp } from '@helix/platform/view/api';
export interface IActionButtonDesignProperties extends IRxAvailableOnDevicesProp {
    disabled: string;
    hidden: string;
    iconAlignment: ActionButtonIconAlignment;
    label: string;
    labelKey?: string;
    size: ActionButtonSize;
    style: ActionButtonStyle;
    icon: string;
    styles: string;
    recordDefinitionName: string;
    fieldId: string;
    recordInstance: string;
    action?: string;
}
