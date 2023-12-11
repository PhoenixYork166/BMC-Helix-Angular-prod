import { AbstractFormControlModel } from './abstract-form-control.model';
import { IFormWidgetOptions } from './interfaces/form-widget-options.interface';
export declare class FormWidgetModel extends AbstractFormControlModel {
    type: string;
    component: any;
    hidden: boolean;
    isDisabled: boolean;
    options: any;
    widgetName: string;
    constructor(options: IFormWidgetOptions);
}
