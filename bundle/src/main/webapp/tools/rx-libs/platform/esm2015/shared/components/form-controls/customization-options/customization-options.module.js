import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptTooltipModule, AdaptRxSelectModule, AdaptButtonModule, AdaptPopoverModule, AdaptIconModule, AdaptRxCheckboxModule } from '@bmc-ux/adapt-angular';
import { AdaptCheckbox2Module } from '@bmc-ux/obsolete';
import { TranslateModule } from '@ngx-translate/core';
import { CustomizationOptionsComponent } from './customization-options.component';
import { CoarseGrainedCustomizationOptionsEditorComponent } from '../../coarse-grained-customization-options-editor/coarse-grained-customization-options-editor.component';
import * as i0 from "@angular/core";
export class CustomizationOptionsModule {
}
CustomizationOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomizationOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, declarations: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent], imports: [CommonModule,
        FormsModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptCheckbox2Module,
        AdaptPopoverModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        ReactiveFormsModule,
        TranslateModule], exports: [CustomizationOptionsComponent] });
CustomizationOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, imports: [[
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
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent],
                    exports: [CustomizationOptionsComponent],
                    entryComponents: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent],
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
                        TranslateModule
                    ]
                }]
        }] });
//# sourceMappingURL=customization-options.module.js.map