import { FORM_BUILDER } from '../form-builder.constant';
import { AbstractFormControlModel } from './abstract-form-control.model';
export class FormControlModel extends AbstractFormControlModel {
    constructor(options, formControl) {
        super();
        this.type = FORM_BUILDER.controlTypes.formControl;
        this.isDisabled = false;
        this.formControl = formControl;
        this.name = options.name;
        this.component = options.component;
        this.hidden = options.hidden;
        this.isDisabled = options.isDisabled;
        this.options = options.options || {};
    }
}
//# sourceMappingURL=form-control.model.js.map