import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export interface ITextareaFormControlOptions {
    label?: string;
    required?: boolean;
    rows?: number;
    tooltip?: AdaptRxControlLabelTooltip;
    isPassword?: boolean;
}
