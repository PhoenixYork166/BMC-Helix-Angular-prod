import { FORM_BUILDER } from '../form-builder.constant';
import { AbstractFormControlModel } from './abstract-form-control.model';
export class FormSectionModel extends AbstractFormControlModel {
    constructor(options) {
        super();
        this.type = FORM_BUILDER.controlTypes.section;
        this.open = true;
        this.controls = [];
        this.controls = options.controls;
        this.label = options.label;
        this.open = options.open === undefined ? true : options.open;
        this.hidden = options.hidden === undefined ? false : options.hidden;
    }
    collapse() {
        this.open = false;
    }
    expand() {
        this.open = true;
    }
}
//# sourceMappingURL=form-section.model.js.map