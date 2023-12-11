import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptIconModule, AdaptRxFormControlModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptTooltipModule, AdaptTreeModule, AdaptPopoverModule } from '@bmc-ux/adapt-angular';
import { RecordDesignerModule } from '@helix/platform/record/designer';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { RxWizardModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { RecordGridModule } from '@helix/platform/view/components';
import { RxRecordDefinitionResourceTypePipeModule } from '@helix/platform/record/api';
import { RxDataSourceDataPageService } from '../../services/external-data/data-source-data-page.service';
import { RxExternalDataService } from '../../services/external-data/external-data.service';
import { ExternalRecordWizardService } from './external-record-wizard.service';
import { DataSourceStepComponent } from './data-source-step/data-source-step.component';
import { DocumentSelectionStepComponent } from './document-selection-step/document-selection-step.component';
import { FieldSelectionStepComponent } from './field-selection-step/field-selection-step.component';
import { FieldTreeSelectionStepComponent } from './field-tree-selection-step/field-tree-selection-step.component';
import { OperationSelectionStepComponent } from './operation-selection-step/operation-selection-step.component';
import { RecordIdFieldsStepComponent } from './record-id-fields-step/record-id-fields-step.component';
import { TableSelectionStepComponent } from './table-selection-step/table-selection-step.component';
import { WebApiSelectionStepComponent } from './web-api-selection-step/web-api-selection-step.component';
import * as i0 from "@angular/core";
export class ExternalRecordWizardModule {
}
/** @nocollapse */ ExternalRecordWizardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ExternalRecordWizardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, declarations: [DataSourceStepComponent,
        DocumentSelectionStepComponent,
        FieldSelectionStepComponent,
        FieldTreeSelectionStepComponent,
        OperationSelectionStepComponent,
        RecordIdFieldsStepComponent,
        TableSelectionStepComponent,
        WebApiSelectionStepComponent], imports: [AdaptButtonModule,
        AdaptIconModule,
        AdaptRxFormControlModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        AdaptTooltipModule,
        AdaptTreeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxDefinitionModule,
        RxRecordDefinitionResourceTypePipeModule,
        RecordDesignerModule,
        RxWizardModule,
        TranslateModule,
        AdaptPopoverModule] });
/** @nocollapse */ ExternalRecordWizardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, providers: [ExternalRecordWizardService, RxDataSourceDataPageService, RxExternalDataService], imports: [[
            AdaptButtonModule,
            AdaptIconModule,
            AdaptRxFormControlModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            AdaptTooltipModule,
            AdaptTreeModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxDefinitionModule,
            RxRecordDefinitionResourceTypePipeModule,
            RecordDesignerModule,
            RxWizardModule,
            TranslateModule,
            AdaptPopoverModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExternalRecordWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptRxFormControlModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        AdaptTooltipModule,
                        AdaptTreeModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxDefinitionModule,
                        RxRecordDefinitionResourceTypePipeModule,
                        RecordDesignerModule,
                        RxWizardModule,
                        TranslateModule,
                        AdaptPopoverModule
                    ],
                    providers: [ExternalRecordWizardService, RxDataSourceDataPageService, RxExternalDataService],
                    declarations: [
                        DataSourceStepComponent,
                        DocumentSelectionStepComponent,
                        FieldSelectionStepComponent,
                        FieldTreeSelectionStepComponent,
                        OperationSelectionStepComponent,
                        RecordIdFieldsStepComponent,
                        TableSelectionStepComponent,
                        WebApiSelectionStepComponent
                    ]
                }]
        }] });
//# sourceMappingURL=external-record-wizard.module.js.map