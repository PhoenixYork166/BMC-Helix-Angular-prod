import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormControlComponent } from './text-form-control.component';
import { AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RxNoWhitespaceValidatorModule } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class TextFormControlModule {
}
TextFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, declarations: [TextFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, RxNoWhitespaceValidatorModule], exports: [TextFormControlComponent] });
TextFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxTextfieldModule, RxNoWhitespaceValidatorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TextFormControlComponent],
                    exports: [TextFormControlComponent],
                    entryComponents: [TextFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, RxNoWhitespaceValidatorModule]
                }]
        }] });
//# sourceMappingURL=text-form-control.module.js.map