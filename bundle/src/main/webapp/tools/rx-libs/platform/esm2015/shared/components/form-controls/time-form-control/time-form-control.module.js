import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormControlComponent } from './time-form-control.component';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class TimeFormControlModule {
}
TimeFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimeFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, declarations: [TimeFormControlComponent], imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule], exports: [TimeFormControlComponent] });
TimeFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, imports: [[CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TimeFormControlComponent],
                    imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule],
                    exports: [TimeFormControlComponent],
                    entryComponents: [TimeFormControlComponent]
                }]
        }] });
//# sourceMappingURL=time-form-control.module.js.map