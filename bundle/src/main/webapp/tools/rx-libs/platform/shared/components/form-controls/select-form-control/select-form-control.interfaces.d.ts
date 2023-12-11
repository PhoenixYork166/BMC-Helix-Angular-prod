import { AdaptRxControlLabelTooltip, RxSelectOption } from '@bmc-ux/adapt-angular';
export interface ISelectFormControlOptions {
    label?: string;
    options: ISelectOption[];
    multiple?: boolean;
    required?: boolean;
    sortAlphabetically?: boolean;
    beforeValueChange?: (oldValue: any, newValue: any) => Promise<boolean>;
    tooltip?: AdaptRxControlLabelTooltip;
    emptyOption?: boolean;
    enableFilter?: boolean;
    hideSelectAllButton?: boolean;
    hideDeselectAllButton?: boolean;
}
export interface ISelectOption extends RxSelectOption {
    name: string;
    id: string;
}
