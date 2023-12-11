import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdaptButtonModule, AdaptDropdownModule, AdaptIconModule, AdaptPopoverModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddBundleContentDataWizardStepModule } from '../bundle-action-wizard/add-bundle-content-data-wizard-step/add-bundle-content-data-wizard-step.module';
import { AddDataWizardStepModule } from '../bundle-action-wizard/add-data-wizard-step/add-data-wizard-step.module';
import { DownloadWizardStepModule } from '../bundle-action-wizard/download-wizard-step/download-wizard-step.module';
import { OptionsWizardStepModule } from '../bundle-action-wizard/options-wizard-step/options-wizard-step.module';
import { OrderDataWizardStepModule } from '../bundle-action-wizard/order-data-wizard-step/order-data-wizard-step.module';
import { PackageWizardStepModule } from '../bundle-action-wizard/package-wizard-step/package-wizard-step.module';
import { SelectApprovalConfigurationsWizardStepModule } from '../bundle-action-wizard/select-approval-configurations-wizard-step/select-approval-configurations-wizard-step.module';
import { SelectBundleContentDefinitionsWizardStepModule } from '../bundle-action-wizard/select-bundle-content-definitions-wizard-step/select-bundle-content-definitions-wizard-step.module';
import { SelectDefinitionsToDeleteWizardStepModule } from '../bundle-action-wizard/select-definitions-to-delete-wizard-step/select-definitions-to-delete-wizard-step.module';
import { SelectDefinitionsWizardStepModule } from '../bundle-action-wizard/select-definitions-wizard-step/select-definitions-wizard-step.module';
import { ContentPackageImportLogsModule } from '../content-package-import-logs/content-package-import-logs.module';
import { ManageContentPackagesModule } from '../manage-content-packages/manage-content-packages.module';
import { BundleDetailsComponent } from './bundle-details.component';
import * as i0 from "@angular/core";
export class BundleDetailsModule {
}
/** @nocollapse */ BundleDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ BundleDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, declarations: [BundleDetailsComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptTabsModule,
        RouterModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptDropdownModule,
        TranslateModule,
        AddBundleContentDataWizardStepModule,
        AddDataWizardStepModule,
        ContentPackageImportLogsModule,
        DownloadWizardStepModule,
        ManageContentPackagesModule,
        OptionsWizardStepModule,
        OrderDataWizardStepModule,
        PackageWizardStepModule,
        SelectApprovalConfigurationsWizardStepModule,
        SelectBundleContentDefinitionsWizardStepModule,
        SelectDefinitionsToDeleteWizardStepModule,
        SelectDefinitionsWizardStepModule], exports: [BundleDetailsComponent] });
/** @nocollapse */ BundleDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptTabsModule,
            RouterModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptDropdownModule,
            TranslateModule,
            AddBundleContentDataWizardStepModule,
            AddDataWizardStepModule,
            ContentPackageImportLogsModule,
            DownloadWizardStepModule,
            ManageContentPackagesModule,
            OptionsWizardStepModule,
            OrderDataWizardStepModule,
            PackageWizardStepModule,
            SelectApprovalConfigurationsWizardStepModule,
            SelectBundleContentDefinitionsWizardStepModule,
            SelectDefinitionsToDeleteWizardStepModule,
            SelectDefinitionsWizardStepModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptTabsModule,
                        RouterModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptDropdownModule,
                        TranslateModule,
                        AddBundleContentDataWizardStepModule,
                        AddDataWizardStepModule,
                        ContentPackageImportLogsModule,
                        DownloadWizardStepModule,
                        ManageContentPackagesModule,
                        OptionsWizardStepModule,
                        OrderDataWizardStepModule,
                        PackageWizardStepModule,
                        SelectApprovalConfigurationsWizardStepModule,
                        SelectBundleContentDefinitionsWizardStepModule,
                        SelectDefinitionsToDeleteWizardStepModule,
                        SelectDefinitionsWizardStepModule
                    ],
                    declarations: [BundleDetailsComponent],
                    exports: [BundleDetailsComponent]
                }]
        }] });
//# sourceMappingURL=bundle-details.module.js.map