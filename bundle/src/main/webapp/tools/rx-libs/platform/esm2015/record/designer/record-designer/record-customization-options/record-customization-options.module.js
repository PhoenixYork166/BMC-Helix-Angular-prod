import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptIconModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxSelectModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { AdaptCheckbox2Module } from '@bmc-ux/obsolete';
import { TranslateModule } from '@ngx-translate/core';
import { RecordCustomizationOptionsEditorComponent } from './record-customization-options-editor.component';
import { RecordCustomizationOptionsComponent } from './record-customization-options.component';
import * as i0 from "@angular/core";
export class RecordCustomizationOptionsModule {
}
RecordCustomizationOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordCustomizationOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, declarations: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent], imports: [CommonModule,
        FormsModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptCheckbox2Module,
        AdaptPopoverModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptTableModule], exports: [RecordCustomizationOptionsComponent] });
RecordCustomizationOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptCheckbox2Module,
            AdaptPopoverModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptTableModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent],
                    exports: [RecordCustomizationOptionsComponent],
                    entryComponents: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptCheckbox2Module,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptTableModule
                    ]
                }]
        }] });
//# sourceMappingURL=record-customization-options.module.js.map