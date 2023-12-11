import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxCounterModule, AdaptRxValidatorsModule } from '@bmc-ux/adapt-angular';
import { CounterFormControlComponent } from './counter-form-control.component';
import * as i0 from "@angular/core";
export class CounterFormControlModule {
}
CounterFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CounterFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, declarations: [CounterFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxValidatorsModule, AdaptRxCounterModule], exports: [CounterFormControlComponent] });
CounterFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxValidatorsModule, AdaptRxCounterModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxValidatorsModule, AdaptRxCounterModule],
                    declarations: [CounterFormControlComponent],
                    exports: [CounterFormControlComponent],
                    entryComponents: [CounterFormControlComponent]
                }]
        }] });
//# sourceMappingURL=counter-form-control.module.js.map