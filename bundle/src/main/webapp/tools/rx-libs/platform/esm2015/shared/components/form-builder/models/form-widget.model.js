import { FORM_BUILDER } from '../form-builder.constant';
import { AbstractFormControlModel } from './abstract-form-control.model';
export class FormWidgetModel extends AbstractFormControlModel {
    constructor(options) {
        super();
        this.type = FORM_BUILDER.controlTypes.widget;
        this.hidden = false;
        this.isDisabled = false;
        this.component = options.component;
        this.hidden = options.hidden;
        this.isDisabled = options.isDisabled;
        this.options = options.options || {};
        this.widgetName = options.widgetName;
    }
}
//# sourceMappingURL=form-widget.model.js.map