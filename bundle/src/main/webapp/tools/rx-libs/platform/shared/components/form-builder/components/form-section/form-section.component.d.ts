import { FormSectionModel } from '../../models/form-section.model';
import { FormControlModel } from '../../models/form-control.model';
import { FormWidgetModel } from '../../models/form-widget.model';
import * as i0 from "@angular/core";
export declare class FormSectionComponent {
    guid: string;
    section: FormSectionModel;
    controlTypes: {
        widget: string;
        formControl: string;
        section: string;
    };
    constructor();
    trackBySectionControls(index: number, item: FormControlModel | FormWidgetModel): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormSectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormSectionComponent, "rx-form-section", never, { "guid": "guid"; "section": "section"; }, {}, never, never>;
}
