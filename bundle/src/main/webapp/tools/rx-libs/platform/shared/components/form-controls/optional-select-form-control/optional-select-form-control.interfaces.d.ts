import { ISelectOption } from '../select-form-control';
export interface IOptionalSelectFormControlOptions {
    label?: string;
    options: ISelectOption[];
    required?: boolean;
}
