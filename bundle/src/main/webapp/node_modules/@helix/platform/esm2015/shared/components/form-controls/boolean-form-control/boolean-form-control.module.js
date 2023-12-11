import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxCheckboxModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { RxBooleanModule } from '../../boolean/boolean.module';
import { BooleanFormControlComponent } from './boolean-form-control.component';
import * as i0 from "@angular/core";
export class BooleanFormControlModule {
}
BooleanFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BooleanFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, declarations: [BooleanFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxCheckboxModule, AdaptRxLabelModule, RxBooleanModule], exports: [BooleanFormControlComponent] });
BooleanFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxCheckboxModule, AdaptRxLabelModule, RxBooleanModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [BooleanFormControlComponent],
                    exports: [BooleanFormControlComponent],
                    entryComponents: [BooleanFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxCheckboxModule, AdaptRxLabelModule, RxBooleanModule]
                }]
        }] });
//# sourceMappingURL=boolean-form-control.module.js.map