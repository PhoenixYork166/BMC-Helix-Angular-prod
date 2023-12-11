import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export declare class Tooltip implements AdaptRxControlLabelTooltip {
    content: string;
    iconName: string;
    placement: string;
    popoverMode: boolean;
    maxWidth: number;
    constructor(tooltipText: string);
}
