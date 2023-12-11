import { NgModule } from '@angular/core';
import { SelectGroupDesignComponent } from './select-group-design.component';
import { FieldSetFormControlComponent } from './field-set-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdaptButtonModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptEmptyStateModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { SelectGroupFieldComponent } from './select-group-field.component';
import * as i0 from "@angular/core";
export class SelectGroupDesignModule {
}
SelectGroupDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SelectGroupDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupDesignModule, declarations: [SelectGroupDesignComponent, FieldSetFormControlComponent, SelectGroupFieldComponent], imports: [FormsModule,
        CommonModule,
        AdaptButtonModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptEmptyStateModule], exports: [SelectGroupDesignComponent, FieldSetFormControlComponent, SelectGroupFieldComponent] });
SelectGroupDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupDesignModule, imports: [[
            FormsModule,
            CommonModule,
            AdaptButtonModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectGroupDesignComponent, FieldSetFormControlComponent, SelectGroupFieldComponent],
                    imports: [
                        FormsModule,
                        CommonModule,
                        AdaptButtonModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        AdaptEmptyStateModule
                    ],
                    exports: [SelectGroupDesignComponent, FieldSetFormControlComponent, SelectGroupFieldComponent],
                    entryComponents: [SelectGroupDesignComponent, FieldSetFormControlComponent, SelectGroupFieldComponent]
                }]
        }] });
//# sourceMappingURL=select-group-design.module.js.map