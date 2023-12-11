import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptDropdownModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxDefinitionPickerModule } from '../../definition-picker/definition-picker.module';
import { ExpressionFormControlModule } from '../expression-form-control/expression-form-control.module';
import { DefinitionPickerOrExpressionFormControlComponent } from './definition-picker-or-expression-form-control.component';
import * as i0 from "@angular/core";
export class DefinitionPickerOrExpressionFormControlModule {
}
DefinitionPickerOrExpressionFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DefinitionPickerOrExpressionFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, declarations: [DefinitionPickerOrExpressionFormControlComponent], imports: [FormsModule,
        CommonModule,
        AdaptRxLabelModule,
        AdaptDropdownModule,
        ExpressionFormControlModule,
        RxDefinitionPickerModule,
        TranslateModule], exports: [DefinitionPickerOrExpressionFormControlComponent] });
DefinitionPickerOrExpressionFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, imports: [[
            FormsModule,
            CommonModule,
            AdaptRxLabelModule,
            AdaptDropdownModule,
            ExpressionFormControlModule,
            RxDefinitionPickerModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        AdaptRxLabelModule,
                        AdaptDropdownModule,
                        ExpressionFormControlModule,
                        RxDefinitionPickerModule,
                        TranslateModule
                    ],
                    exports: [DefinitionPickerOrExpressionFormControlComponent],
                    declarations: [DefinitionPickerOrExpressionFormControlComponent],
                    entryComponents: [DefinitionPickerOrExpressionFormControlComponent]
                }]
        }] });
//# sourceMappingURL=definition-picker-or-expression-form-control.module.js.map