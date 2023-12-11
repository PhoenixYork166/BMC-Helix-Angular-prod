import { RxSelectOption } from '@bmc-ux/adapt-angular';
export interface IStepperWithUnitsFormControlOptions {
    label: string;
    required?: boolean;
    units: RxSelectOption[];
    step?: number;
    defaultUnit?: string;
    stepperOptionByUnits?: IStepperOptionByUnits;
}
export interface IStepperOptions {
    maxValue?: number;
    minValue?: number;
    defaultValue?: number;
}
export interface IStepperOptionByUnits {
    [key: string]: IStepperOptions;
}
