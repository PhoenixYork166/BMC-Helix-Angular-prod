import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptColorPickerModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { ColorPickerFormControlComponent } from './color-picker-form-control.component';
import * as i0 from "@angular/core";
export class ColorPickerFormControlModule {
}
ColorPickerFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ColorPickerFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, declarations: [ColorPickerFormControlComponent], imports: [CommonModule, FormsModule, AdaptColorPickerModule, AdaptRxLabelModule], exports: [ColorPickerFormControlComponent] });
ColorPickerFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, imports: [[CommonModule, FormsModule, AdaptColorPickerModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptColorPickerModule, AdaptRxLabelModule],
                    declarations: [ColorPickerFormControlComponent],
                    exports: [ColorPickerFormControlComponent]
                }]
        }] });
//# sourceMappingURL=color-picker-form-control.module.js.map