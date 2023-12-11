import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationFormControlComponent } from './validation-form-control.component';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class ValidationFormControlModule {
}
ValidationFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ValidationFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, declarations: [ValidationFormControlComponent], imports: [CommonModule, AdaptButtonModule], exports: [ValidationFormControlComponent] });
ValidationFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, imports: [[CommonModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ValidationFormControlComponent],
                    exports: [ValidationFormControlComponent],
                    entryComponents: [ValidationFormControlComponent],
                    imports: [CommonModule, AdaptButtonModule]
                }]
        }] });
//# sourceMappingURL=validation-form-control.module.js.map