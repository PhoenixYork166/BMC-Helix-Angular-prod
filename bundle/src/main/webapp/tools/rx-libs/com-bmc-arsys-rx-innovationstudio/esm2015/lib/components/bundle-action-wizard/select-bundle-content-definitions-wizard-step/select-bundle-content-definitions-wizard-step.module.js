import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { SelectBundleContentDefinitionsWizardStepComponent } from './select-bundle-content-definitions-wizard-step.component';
import * as i0 from "@angular/core";
export class SelectBundleContentDefinitionsWizardStepModule {
}
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, declarations: [SelectBundleContentDefinitionsWizardStepComponent], imports: [CommonModule, RecordGridModule, RxDefinitionModule, TranslateModule], exports: [SelectBundleContentDefinitionsWizardStepComponent] });
/** @nocollapse */ SelectBundleContentDefinitionsWizardStepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, imports: [[CommonModule, RecordGridModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectBundleContentDefinitionsWizardStepModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RecordGridModule, RxDefinitionModule, TranslateModule],
                    declarations: [SelectBundleContentDefinitionsWizardStepComponent],
                    exports: [SelectBundleContentDefinitionsWizardStepComponent]
                }]
        }] });
//# sourceMappingURL=select-bundle-content-definitions-wizard-step.module.js.map