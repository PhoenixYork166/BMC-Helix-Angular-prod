import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxLabelModule, AdaptRxSwitchModule } from '@bmc-ux/adapt-angular';
import { SwitchFormControlComponent } from './switch-form-control.component';
import * as i0 from "@angular/core";
export class SwitchFormControlModule {
}
SwitchFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SwitchFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, declarations: [SwitchFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxLabelModule], exports: [SwitchFormControlComponent] });
SwitchFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SwitchFormControlComponent],
                    exports: [SwitchFormControlComponent],
                    entryComponents: [SwitchFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxLabelModule]
                }]
        }] });
//# sourceMappingURL=switch-form-control.module.js.map