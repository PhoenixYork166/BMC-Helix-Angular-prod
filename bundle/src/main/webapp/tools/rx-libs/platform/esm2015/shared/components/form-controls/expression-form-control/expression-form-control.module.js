import { NgModule } from '@angular/core';
import { ExpressionFormControlComponent } from './expression-form-control.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdaptButtonModule, AdaptIconModule, AdaptRxLabelModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class ExpressionFormControlModule {
}
ExpressionFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExpressionFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, declarations: [ExpressionFormControlComponent], imports: [FormsModule,
        CommonModule,
        AdaptIconModule,
        AdaptTooltipModule,
        AdaptButtonModule,
        AdaptRxLabelModule,
        TranslateModule], exports: [ExpressionFormControlComponent] });
ExpressionFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, imports: [[
            FormsModule,
            CommonModule,
            AdaptIconModule,
            AdaptTooltipModule,
            AdaptButtonModule,
            AdaptRxLabelModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        AdaptIconModule,
                        AdaptTooltipModule,
                        AdaptButtonModule,
                        AdaptRxLabelModule,
                        TranslateModule
                    ],
                    exports: [ExpressionFormControlComponent],
                    declarations: [ExpressionFormControlComponent],
                    entryComponents: [ExpressionFormControlComponent]
                }]
        }] });
//# sourceMappingURL=expression-form-control.module.js.map