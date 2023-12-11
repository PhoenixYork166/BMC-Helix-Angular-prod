import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { OptionsWizardStepComponent } from './options-wizard-step.component';
import * as i0 from "@angular/core";
export class OptionsWizardStepModule {
}
/** @nocollapse */ OptionsWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ OptionsWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, declarations: [OptionsWizardStepComponent], imports: [AdaptRxCheckboxModule,
        AdaptRxLabelModule,
        AdaptRxTextfieldModule,
        AdaptTreeModule,
        AdaptRxSelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReadOnlyFieldModule,
        TranslateModule], exports: [OptionsWizardStepComponent] });
/** @nocollapse */ OptionsWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, imports: [[
            AdaptRxCheckboxModule,
            AdaptRxLabelModule,
            AdaptRxTextfieldModule,
            AdaptTreeModule,
            AdaptRxSelectModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ReadOnlyFieldModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptRxCheckboxModule,
                        AdaptRxLabelModule,
                        AdaptRxTextfieldModule,
                        AdaptTreeModule,
                        AdaptRxSelectModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ReadOnlyFieldModule,
                        TranslateModule
                    ],
                    declarations: [OptionsWizardStepComponent],
                    exports: [OptionsWizardStepComponent]
                }]
        }] });
//# sourceMappingURL=options-wizard-step.module.js.map