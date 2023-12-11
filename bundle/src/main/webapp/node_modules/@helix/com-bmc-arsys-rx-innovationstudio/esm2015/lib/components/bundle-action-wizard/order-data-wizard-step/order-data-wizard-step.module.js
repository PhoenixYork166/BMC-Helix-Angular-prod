import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptEmptyStateModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDataWizardStepComponent } from './order-data-wizard-step.component';
import * as i0 from "@angular/core";
export class OrderDataWizardStepModule {
}
/** @nocollapse */ OrderDataWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ OrderDataWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, declarations: [OrderDataWizardStepComponent], imports: [CommonModule, FormsModule, TranslateModule, AdaptButtonModule, RxDefinitionModule, AdaptEmptyStateModule], exports: [OrderDataWizardStepComponent] });
/** @nocollapse */ OrderDataWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, imports: [[CommonModule, FormsModule, TranslateModule, AdaptButtonModule, RxDefinitionModule, AdaptEmptyStateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OrderDataWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, TranslateModule, AdaptButtonModule, RxDefinitionModule, AdaptEmptyStateModule],
                    declarations: [OrderDataWizardStepComponent],
                    exports: [OrderDataWizardStepComponent]
                }]
        }] });
//# sourceMappingURL=order-data-wizard-step.module.js.map