import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptRxSwitchModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { OptionalSelectFormControlComponent } from './optional-select-form-control.component';
import * as i0 from "@angular/core";
export class OptionalSelectFormControlModule {
}
OptionalSelectFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OptionalSelectFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, declarations: [OptionalSelectFormControlComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxSwitchModule, AdaptRxSelectModule], exports: [OptionalSelectFormControlComponent] });
OptionalSelectFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, AdaptRxSwitchModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxSwitchModule, AdaptRxSelectModule],
                    exports: [OptionalSelectFormControlComponent],
                    declarations: [OptionalSelectFormControlComponent],
                    entryComponents: [OptionalSelectFormControlComponent]
                }]
        }] });
//# sourceMappingURL=optional-select-form-control.module.js.map