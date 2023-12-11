import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export interface IRadioItem {
    label: string;
    value: any;
}
export interface IRadioFormControlOptions {
    label?: string;
    tooltip?: AdaptRxControlLabelTooltip;
    items: IRadioItem[];
}
