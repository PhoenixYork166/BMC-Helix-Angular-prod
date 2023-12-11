import { ValidatorFn } from '@angular/forms';
export interface IFormControlBuilderConfig {
    component: any;
    name?: string;
    options?: any;
    hidden?: boolean;
    isDisabled?: boolean;
    validators?: ValidatorFn[];
    widgetName?: string;
}
