import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordInstanceFormControlComponent } from './record-instance-form-control.component';
import { AdaptRxLabelModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RecordInstanceFormControlModule {
}
RecordInstanceFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordInstanceFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, declarations: [RecordInstanceFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, AdaptRxLabelModule, TranslateModule], exports: [RecordInstanceFormControlComponent] });
RecordInstanceFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxTextfieldModule, AdaptRxLabelModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordInstanceFormControlComponent],
                    exports: [RecordInstanceFormControlComponent],
                    entryComponents: [RecordInstanceFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, AdaptRxLabelModule, TranslateModule]
                }]
        }] });
//# sourceMappingURL=record-instance-form-control.module.js.map