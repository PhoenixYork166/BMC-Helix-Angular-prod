import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxCheckboxModule, AdaptRxFormControlModule } from '@bmc-ux/adapt-angular';
import { RxBooleanModule } from '@helix/platform/shared/components';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { BooleanFieldComponent } from './boolean-field.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class BooleanFieldModule {
}
BooleanFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BooleanFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldModule, declarations: [BooleanFieldComponent], imports: [CommonModule,
        AdaptRxFormControlModule,
        ReadOnlyFieldModule,
        AdaptButtonModule,
        AdaptRxCheckboxModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RxBooleanModule] });
BooleanFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldModule, imports: [[
            CommonModule,
            AdaptRxFormControlModule,
            ReadOnlyFieldModule,
            AdaptButtonModule,
            AdaptRxCheckboxModule,
            TranslateModule,
            ReactiveFormsModule,
            FormsModule,
            RxBooleanModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptRxFormControlModule,
                        ReadOnlyFieldModule,
                        AdaptButtonModule,
                        AdaptRxCheckboxModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        FormsModule,
                        RxBooleanModule
                    ],
                    declarations: [BooleanFieldComponent],
                    entryComponents: [BooleanFieldComponent]
                }]
        }] });
//# sourceMappingURL=boolean-field.module.js.map