import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxSwitchModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldModule } from '@bmc-ux/obsolete';
import { ExpressionFormControlModule } from '../expression-form-control/expression-form-control.module';
import { OptionalExpressionControlComponent } from './optional-expression-control.component';
import * as i0 from "@angular/core";
export class OptionalExpressionControlModule {
}
OptionalExpressionControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OptionalExpressionControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, declarations: [OptionalExpressionControlComponent], imports: [CommonModule,
        FormsModule,
        AdaptRxSwitchModule,
        AdaptTextFieldModule,
        ExpressionFormControlModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule], exports: [OptionalExpressionControlComponent] });
OptionalExpressionControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptRxSwitchModule,
            AdaptTextFieldModule,
            ExpressionFormControlModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [OptionalExpressionControlComponent],
                    exports: [OptionalExpressionControlComponent],
                    entryComponents: [OptionalExpressionControlComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptRxSwitchModule,
                        AdaptTextFieldModule,
                        ExpressionFormControlModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule
                    ]
                }]
        }] });
//# sourceMappingURL=optional-expression-control.module.js.map