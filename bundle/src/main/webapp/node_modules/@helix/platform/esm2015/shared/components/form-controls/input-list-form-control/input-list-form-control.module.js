import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxLabelModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputListFormControlComponent } from './input-list-form-control.component';
import * as i0 from "@angular/core";
export class InputListFormControlModule {
}
InputListFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputListFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, declarations: [InputListFormControlComponent], imports: [CommonModule,
        AdaptRxLabelModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        TranslateModule,
        AdaptRxTextfieldModule], exports: [InputListFormControlComponent] });
InputListFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, imports: [[
            CommonModule,
            AdaptRxLabelModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            TranslateModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [InputListFormControlComponent],
                    exports: [InputListFormControlComponent],
                    imports: [
                        CommonModule,
                        AdaptRxLabelModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        TranslateModule,
                        AdaptRxTextfieldModule
                    ]
                }]
        }] });
//# sourceMappingURL=input-list-form-control.module.js.map