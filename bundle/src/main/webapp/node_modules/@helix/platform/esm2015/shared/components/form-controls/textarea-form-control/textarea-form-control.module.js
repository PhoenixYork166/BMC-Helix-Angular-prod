import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFormControlComponent } from './textarea-form-control.component';
import { AdaptRxTextareaModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class TextareaFormControlModule {
}
TextareaFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextareaFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, declarations: [TextareaFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxTextareaModule], exports: [TextareaFormControlComponent] });
TextareaFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxTextareaModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TextareaFormControlComponent],
                    exports: [TextareaFormControlComponent],
                    entryComponents: [TextareaFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxTextareaModule]
                }]
        }] });
//# sourceMappingURL=textarea-form-control.module.js.map