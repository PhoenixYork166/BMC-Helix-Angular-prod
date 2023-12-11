import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule } from '@bmc-ux/adapt-angular';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormOutletComponent } from './components/form-outlet/form-outlet.component';
import { FormSectionComponent } from './components/form-section/form-section.component';
import { FormWidgetComponent } from './components/form-widget/form-widget.component';
import * as i0 from "@angular/core";
export class RxFormBuilderModule {
}
RxFormBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxFormBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, declarations: [FormWidgetComponent, FormOutletComponent, FormBuilderComponent, FormSectionComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptAccordionModule], exports: [FormBuilderComponent] });
RxFormBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, AdaptAccordionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptAccordionModule],
                    declarations: [FormWidgetComponent, FormOutletComponent, FormBuilderComponent, FormSectionComponent],
                    exports: [FormBuilderComponent]
                }]
        }] });
//# sourceMappingURL=form-builder.module.js.map