import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFormControlComponent } from './select-form-control.component';
import { FormsModule } from '@angular/forms';
import { AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class SelectFormControlModule {
}
SelectFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SelectFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, declarations: [SelectFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxSelectModule], exports: [SelectFormControlComponent] });
SelectFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectFormControlComponent],
                    exports: [SelectFormControlComponent],
                    entryComponents: [SelectFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxSelectModule]
                }]
        }] });
//# sourceMappingURL=select-form-control.module.js.map