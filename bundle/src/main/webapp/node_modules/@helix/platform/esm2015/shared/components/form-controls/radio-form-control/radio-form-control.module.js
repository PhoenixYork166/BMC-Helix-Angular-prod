import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxLabelModule, AdaptRxRadiobuttonModule } from '@bmc-ux/adapt-angular';
import { RadioFormControlComponent } from './radio-form-control.component';
import * as i0 from "@angular/core";
export class RadioFormControlModule {
}
RadioFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RadioFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, declarations: [RadioFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule], exports: [RadioFormControlComponent] });
RadioFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RadioFormControlComponent],
                    exports: [RadioFormControlComponent],
                    entryComponents: [RadioFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule]
                }]
        }] });
//# sourceMappingURL=radio-form-control.module.js.map