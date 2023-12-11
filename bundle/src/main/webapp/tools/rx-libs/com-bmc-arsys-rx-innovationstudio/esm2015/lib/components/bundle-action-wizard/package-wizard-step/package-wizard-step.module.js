import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptAlertModule, AdaptButtonModule, AdaptRxTextareaModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PackageWizardStepComponent } from './package-wizard-step.component';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class PackageWizardStepModule {
}
/** @nocollapse */ PackageWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PackageWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, declarations: [PackageWizardStepComponent], imports: [CommonModule, AdaptAlertModule, AdaptButtonModule, TranslateModule, AdaptRxTextareaModule, FormsModule], exports: [PackageWizardStepComponent] });
/** @nocollapse */ PackageWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, imports: [[CommonModule, AdaptAlertModule, AdaptButtonModule, TranslateModule, AdaptRxTextareaModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptAlertModule, AdaptButtonModule, TranslateModule, AdaptRxTextareaModule, FormsModule],
                    declarations: [PackageWizardStepComponent],
                    exports: [PackageWizardStepComponent]
                }]
        }] });
//# sourceMappingURL=package-wizard-step.module.js.map