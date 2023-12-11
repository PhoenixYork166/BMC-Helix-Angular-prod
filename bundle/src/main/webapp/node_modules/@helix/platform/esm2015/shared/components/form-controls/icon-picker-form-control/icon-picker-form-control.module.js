import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptIconModule, AdaptRxTypeaheadModule } from '@bmc-ux/adapt-angular';
import { IconPickerFormControlComponent } from './icon-picker-form-control.component';
import { IconBrowserDialogModule } from './icon-browser-dialog/icon-browser-dialog.module';
import * as i0 from "@angular/core";
export class IconPickerFormControlModule {
}
IconPickerFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IconPickerFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, declarations: [IconPickerFormControlComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptRxTypeaheadModule,
        AdaptButtonModule,
        AdaptIconModule,
        IconBrowserDialogModule], exports: [IconPickerFormControlComponent] });
IconPickerFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptRxTypeaheadModule,
            AdaptButtonModule,
            AdaptIconModule,
            IconBrowserDialogModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptRxTypeaheadModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        IconBrowserDialogModule
                    ],
                    declarations: [IconPickerFormControlComponent],
                    exports: [IconPickerFormControlComponent]
                }]
        }] });
//# sourceMappingURL=icon-picker-form-control.module.js.map