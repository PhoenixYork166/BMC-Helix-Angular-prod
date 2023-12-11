import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
import { ISelectFormControlOptions, IStepperWithUnitsFormControlOptions } from '@helix/platform/shared/components';
export interface IColumnEditorProperty {
    name: string;
    defaultValue: boolean | number;
    label: string;
    tooltip?: AdaptRxControlLabelTooltip;
    selectionValues?: any[];
    options?: IStepperWithUnitsFormControlOptions | ISelectFormControlOptions;
}
