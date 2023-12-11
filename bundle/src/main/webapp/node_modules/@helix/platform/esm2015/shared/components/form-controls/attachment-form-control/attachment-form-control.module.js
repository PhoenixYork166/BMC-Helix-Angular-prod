import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxUploaderModule } from '@bmc-ux/adapt-angular';
import { AttachmentFormControlComponent } from './attachment-form-control.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class AttachmentFormControlModule {
}
AttachmentFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AttachmentFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, declarations: [AttachmentFormControlComponent], imports: [CommonModule, FormsModule, i1.AdaptRxUploaderModule], exports: [AttachmentFormControlComponent] });
AttachmentFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxUploaderModule.forRoot()]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxUploaderModule.forRoot()],
                    exports: [AttachmentFormControlComponent],
                    declarations: [AttachmentFormControlComponent],
                    entryComponents: [AttachmentFormControlComponent]
                }]
        }] });
//# sourceMappingURL=attachment-form-control.module.js.map