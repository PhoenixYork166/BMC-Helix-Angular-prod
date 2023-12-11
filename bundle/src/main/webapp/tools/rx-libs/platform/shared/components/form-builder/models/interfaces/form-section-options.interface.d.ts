import { FormControlModel } from '../form-control.model';
import { FormWidgetModel } from '../form-widget.model';
export interface IFormSectionOptions {
    controls: Array<FormControlModel | FormWidgetModel>;
    open?: boolean;
    hidden?: boolean;
    label?: string;
}
