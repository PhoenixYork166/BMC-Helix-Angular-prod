import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxCheckboxModule, AdaptRxFormControlModule, AdaptPopoverModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxBooleanComponent } from './boolean.component';
import * as i0 from "@angular/core";
export class RxBooleanModule {
}
RxBooleanModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBooleanModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, declarations: [RxBooleanComponent], imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AdaptRxFormControlModule,
        AdaptButtonModule,
        AdaptRxCheckboxModule,
        TranslateModule,
        AdaptPopoverModule], exports: [RxBooleanComponent] });
RxBooleanModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, imports: [[
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            AdaptRxFormControlModule,
            AdaptButtonModule,
            AdaptRxCheckboxModule,
            TranslateModule,
            AdaptPopoverModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptRxFormControlModule,
                        AdaptButtonModule,
                        AdaptRxCheckboxModule,
                        TranslateModule,
                        AdaptPopoverModule
                    ],
                    declarations: [RxBooleanComponent],
                    exports: [RxBooleanComponent]
                }]
        }] });
//# sourceMappingURL=boolean.module.js.map