import { FormControlModel } from './models/form-control.model';
import { FormSectionModel } from './models/form-section.model';
import { FormWidgetModel } from './models/form-widget.model';
import { IFormControlOptions } from './models/interfaces/form-control-options.interface';
import { IFormSectionOptions } from './models/interfaces/form-section-options.interface';
import { IFormWidgetOptions } from './models/interfaces/form-widget-options.interface';
import { AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class FormBuilderFactory {
    control(options: IFormControlOptions, formControl: AbstractControl): FormControlModel;
    widget(options: IFormWidgetOptions): FormWidgetModel;
    section(options: IFormSectionOptions): FormSectionModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormBuilderFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormBuilderFactory>;
}
