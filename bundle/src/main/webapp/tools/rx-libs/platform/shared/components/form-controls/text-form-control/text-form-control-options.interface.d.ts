import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export interface ITextFormControlOptions {
    label?: string;
    required?: boolean;
    tooltip?: AdaptRxControlLabelTooltip;
    isPassword?: boolean;
    minLength?: number;
    maxLength?: number;
    allowWhitespace?: boolean;
}
