import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptDropdownModule, AdaptIconModule, AdaptRxCheckboxModule, AdaptRxSelectModule, AdaptRxSwitchModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { ExpressionFormControlModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { AddDataWizardStepComponent } from './add-data-wizard-step.component';
import * as i0 from "@angular/core";
export class AddDataWizardStepModule {
}
/** @nocollapse */ AddDataWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ AddDataWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, declarations: [AddDataWizardStepComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        AdaptRxSelectModule,
        AdaptRxSwitchModule,
        CommonModule,
        ExpressionFormControlModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxDefinitionModule,
        RxDefinitionPickerModule,
        TranslateModule], exports: [AddDataWizardStepComponent] });
/** @nocollapse */ AddDataWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            AdaptRxSelectModule,
            AdaptRxSwitchModule,
            CommonModule,
            ExpressionFormControlModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxDefinitionModule,
            RxDefinitionPickerModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSelectModule,
                        AdaptRxSwitchModule,
                        CommonModule,
                        ExpressionFormControlModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxDefinitionModule,
                        RxDefinitionPickerModule,
                        TranslateModule
                    ],
                    declarations: [AddDataWizardStepComponent],
                    exports: [AddDataWizardStepComponent]
                }]
        }] });
//# sourceMappingURL=add-data-wizard-step.module.js.map