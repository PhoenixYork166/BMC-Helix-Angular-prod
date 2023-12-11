import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { DateFormControlComponent } from './date-form-control.component';
import * as i0 from "@angular/core";
export class DateFormControlModule {
}
DateFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, declarations: [DateFormControlComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxDatetimeModule], exports: [DateFormControlComponent] });
DateFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, AdaptRxDatetimeModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxDatetimeModule],
                    declarations: [DateFormControlComponent],
                    exports: [DateFormControlComponent],
                    entryComponents: [DateFormControlComponent]
                }]
        }] });
//# sourceMappingURL=date-form-control.module.js.map