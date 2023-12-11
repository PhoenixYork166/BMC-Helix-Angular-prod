import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeFormControlComponent } from './date-time-form-control.component';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class DateTimeFormControlModule {
}
DateTimeFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateTimeFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, declarations: [DateTimeFormControlComponent], imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule], exports: [DateTimeFormControlComponent] });
DateTimeFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, imports: [[CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DateTimeFormControlComponent],
                    imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule],
                    exports: [DateTimeFormControlComponent],
                    entryComponents: [DateTimeFormControlComponent]
                }]
        }] });
//# sourceMappingURL=date-time-form-control.module.js.map