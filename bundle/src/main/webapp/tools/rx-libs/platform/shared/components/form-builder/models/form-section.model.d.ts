import { AbstractFormControlModel } from './abstract-form-control.model';
import { FormControlModel } from './form-control.model';
import { FormWidgetModel } from './form-widget.model';
import { IFormSectionOptions } from './interfaces/form-section-options.interface';
export declare class FormSectionModel extends AbstractFormControlModel {
    type: string;
    label: string;
    open: boolean;
    controls: Array<FormControlModel | FormWidgetModel>;
    constructor(options: IFormSectionOptions);
    collapse(): void;
    expand(): void;
}
