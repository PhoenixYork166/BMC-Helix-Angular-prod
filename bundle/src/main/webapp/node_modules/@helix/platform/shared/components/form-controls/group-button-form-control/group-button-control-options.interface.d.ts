import { AdaptRxControlLabelTooltip, ButtonConfig, ButtonSize } from '@bmc-ux/adapt-angular';
export interface IGroupButtonFormControlOptions {
    label?: string;
    required?: boolean;
    items: ButtonConfig[];
    tooltip?: AdaptRxControlLabelTooltip;
    size?: ButtonSize;
    beforeValueChange?: (oldValue: string | number, newValue: string | number) => Promise<boolean>;
}
