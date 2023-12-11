import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataImportComponent } from './data-import.component';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdaptAlertModule, AdaptButtonModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptRxUploaderModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { ImportRecordStatusInfoComponent } from './import-record-status-info/import-record-status-info.component';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxBusyIndicatorModule, RxLineLoaderModule } from '@helix/platform/ui-kit';
import { UploadDataFileStepComponent } from './upload-data-file-step/upload-data-file-step.component';
import { DataImportMappingStepComponent } from './data-import-mapping-step/data-import-mapping-step.component';
import { RxDefinitionPickerModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DataImportRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'dl-dataload-data-import',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataImportComponent),
            name: 'Data import',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.dataloadBundleId]
        });
    }
}
DataImportRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataImportRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, declarations: [DataImportComponent,
        ImportRecordStatusInfoComponent,
        UploadDataFileStepComponent,
        DataImportMappingStepComponent], imports: [AdaptButtonModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RecordGridModule,
        AdaptPopoverModule,
        AdaptTableModule,
        RxLineLoaderModule,
        AdaptRxTextfieldModule,
        AdaptRxUploaderModule,
        AdaptRxSelectModule,
        ReactiveFormsModule,
        AdaptTabsModule,
        AdaptRxRadiobuttonModule,
        RxDefinitionPickerModule,
        AdaptRxLabelModule,
        AdaptAlertModule,
        AdaptRxCheckboxModule,
        RxBusyIndicatorModule] });
DataImportRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, imports: [[
            AdaptButtonModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RecordGridModule,
            AdaptPopoverModule,
            AdaptTableModule,
            RxLineLoaderModule,
            AdaptRxTextfieldModule,
            AdaptRxUploaderModule,
            AdaptRxSelectModule,
            ReactiveFormsModule,
            AdaptTabsModule,
            AdaptRxRadiobuttonModule,
            RxDefinitionPickerModule,
            AdaptRxLabelModule,
            AdaptAlertModule,
            AdaptRxCheckboxModule,
            RxBusyIndicatorModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DataImportComponent,
                        ImportRecordStatusInfoComponent,
                        UploadDataFileStepComponent,
                        DataImportMappingStepComponent
                    ],
                    imports: [
                        AdaptButtonModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RecordGridModule,
                        AdaptPopoverModule,
                        AdaptTableModule,
                        RxLineLoaderModule,
                        AdaptRxTextfieldModule,
                        AdaptRxUploaderModule,
                        AdaptRxSelectModule,
                        ReactiveFormsModule,
                        AdaptTabsModule,
                        AdaptRxRadiobuttonModule,
                        RxDefinitionPickerModule,
                        AdaptRxLabelModule,
                        AdaptAlertModule,
                        AdaptRxCheckboxModule,
                        RxBusyIndicatorModule
                    ],
                    entryComponents: [DataImportComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=data-import-registration.module.js.map