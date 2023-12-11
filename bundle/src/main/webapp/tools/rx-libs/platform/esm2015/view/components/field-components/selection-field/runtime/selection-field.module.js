import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptRxRadiobuttonModule, AdaptRxFormControlModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { SelectionFieldComponent } from './selection-field.component';
import { AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class SelectionFieldModule {
}
SelectionFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SelectionFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldModule, declarations: [SelectionFieldComponent], imports: [AdaptRxFormControlModule,
        AdaptRxRadiobuttonModule,
        CommonModule,
        ReadOnlyFieldModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule] });
SelectionFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldModule, imports: [[
            AdaptRxFormControlModule,
            AdaptRxRadiobuttonModule,
            CommonModule,
            ReadOnlyFieldModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptRxFormControlModule,
                        AdaptRxRadiobuttonModule,
                        CommonModule,
                        ReadOnlyFieldModule,
                        FormsModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule
                    ],
                    declarations: [SelectionFieldComponent],
                    entryComponents: [SelectionFieldComponent]
                }]
        }] });
//# sourceMappingURL=selection-field.module.js.map