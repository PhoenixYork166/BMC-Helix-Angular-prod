import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxCounterModule, AdaptRxValidatorsModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { StepperWithUnitsFormControlComponent } from './stepper-with-units-form-control.component';
import * as i0 from "@angular/core";
export class StepperWithUnitsFormControlModule {
}
StepperWithUnitsFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StepperWithUnitsFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, declarations: [StepperWithUnitsFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxSelectModule, AdaptRxCounterModule, AdaptRxValidatorsModule], exports: [StepperWithUnitsFormControlComponent] });
StepperWithUnitsFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxSelectModule, AdaptRxCounterModule, AdaptRxValidatorsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxSelectModule, AdaptRxCounterModule, AdaptRxValidatorsModule],
                    declarations: [StepperWithUnitsFormControlComponent],
                    exports: [StepperWithUnitsFormControlComponent],
                    entryComponents: [StepperWithUnitsFormControlComponent]
                }]
        }] });
//# sourceMappingURL=stepper-with-units-form-control.module.js.map