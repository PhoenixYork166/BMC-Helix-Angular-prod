import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptDropdownModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RxProcessDesignerElementPickerComponent } from './process-designer-element-picker.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class ProcessDesignerElementPickerModule {
}
ProcessDesignerElementPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProcessDesignerElementPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, declarations: [RxProcessDesignerElementPickerComponent], imports: [CommonModule,
        FormsModule,
        AdaptRxCheckboxModule, i1.AdaptDropdownModule, AdaptRxLabelModule,
        AdaptTreeModule], exports: [RxProcessDesignerElementPickerComponent] });
ProcessDesignerElementPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptRxCheckboxModule,
            AdaptDropdownModule.forRoot(),
            AdaptRxLabelModule,
            AdaptTreeModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxProcessDesignerElementPickerComponent],
                    exports: [RxProcessDesignerElementPickerComponent],
                    entryComponents: [RxProcessDesignerElementPickerComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptRxCheckboxModule,
                        AdaptDropdownModule.forRoot(),
                        AdaptRxLabelModule,
                        AdaptTreeModule
                    ]
                }]
        }] });
//# sourceMappingURL=process-designer-element-picker.module.js.map