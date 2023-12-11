import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAlertModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { ExpressionFormControlModule, RxDefinitionPickerModule, RxWizardModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { FieldSelectionStepComponent } from './field-selection-step/field-selection-step.component';
import { JoinCriteriaStepComponent } from './join-criteria-step/join-criteria-step.component';
import { RecordDefinitionsStepComponent } from './record-definitions-step/record-definitions-step.component';
import { JoinRecordWizardService } from './join-record-wizard.service';
import * as i0 from "@angular/core";
export class JoinRecordWizardModule {
}
/** @nocollapse */ JoinRecordWizardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ JoinRecordWizardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, declarations: [RecordDefinitionsStepComponent, JoinCriteriaStepComponent, FieldSelectionStepComponent], imports: [CommonModule,
        RxDefinitionPickerModule,
        TranslateModule,
        AdaptRxSelectModule,
        RxWizardModule,
        AdaptAlertModule,
        FormsModule,
        ReactiveFormsModule,
        ExpressionFormControlModule] });
/** @nocollapse */ JoinRecordWizardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, providers: [JoinRecordWizardService], imports: [[
            CommonModule,
            RxDefinitionPickerModule,
            TranslateModule,
            AdaptRxSelectModule,
            RxWizardModule,
            AdaptAlertModule,
            FormsModule,
            ReactiveFormsModule,
            ExpressionFormControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JoinRecordWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        AdaptRxSelectModule,
                        RxWizardModule,
                        AdaptAlertModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ExpressionFormControlModule
                    ],
                    providers: [JoinRecordWizardService],
                    declarations: [RecordDefinitionsStepComponent, JoinCriteriaStepComponent, FieldSelectionStepComponent]
                }]
        }] });
//# sourceMappingURL=join-record-wizard.module.js.map