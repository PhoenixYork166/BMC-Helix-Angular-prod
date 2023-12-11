import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptPopoverModule, AdaptIconModule } from '@bmc-ux/adapt-angular';
import { RecordGridModule } from '@helix/platform/view/components';
import { SelectDefinitionsToDeleteWizardStepComponent } from './select-definitions-to-delete-wizard-step.component';
import * as i0 from "@angular/core";
export class SelectDefinitionsToDeleteWizardStepModule {
}
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, declarations: [SelectDefinitionsToDeleteWizardStepComponent], imports: [CommonModule, RecordGridModule, TranslateModule, AdaptPopoverModule, AdaptIconModule, RxDefinitionModule], exports: [SelectDefinitionsToDeleteWizardStepComponent] });
/** @nocollapse */ SelectDefinitionsToDeleteWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, imports: [[CommonModule, RecordGridModule, TranslateModule, AdaptPopoverModule, AdaptIconModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectDefinitionsToDeleteWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RecordGridModule, TranslateModule, AdaptPopoverModule, AdaptIconModule, RxDefinitionModule],
                    declarations: [SelectDefinitionsToDeleteWizardStepComponent],
                    exports: [SelectDefinitionsToDeleteWizardStepComponent]
                }]
        }] });
//# sourceMappingURL=select-definitions-to-delete-wizard-step.module.js.map