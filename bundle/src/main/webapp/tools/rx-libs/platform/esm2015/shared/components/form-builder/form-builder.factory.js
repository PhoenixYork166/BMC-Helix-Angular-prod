import { Injectable } from '@angular/core';
import { FormControlModel } from './models/form-control.model';
import { FormSectionModel } from './models/form-section.model';
import { FormWidgetModel } from './models/form-widget.model';
import * as i0 from "@angular/core";
export class FormBuilderFactory {
    control(options, formControl) {
        return new FormControlModel(options, formControl);
    }
    widget(options) {
        return new FormWidgetModel(options);
    }
    section(options) {
        return new FormSectionModel(options);
    }
}
FormBuilderFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormBuilderFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderFactory, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=form-builder.factory.js.map