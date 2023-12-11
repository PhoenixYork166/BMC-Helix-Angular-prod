import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataExportComponent } from './data-export.component';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdaptAccordionModule, AdaptAlertModule, AdaptBusyModule, AdaptButtonModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ExportRecordStatusInfoComponent } from './export-record-status-info/export-record-status-info.component';
import { RxLineLoaderModule } from '@helix/platform/ui-kit';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { DataExportConfigurationComponent } from './data-export-configuration/data-export-configuration.component';
import { ExpressionFormControlModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { ExportDataPreviewComponent } from './export-data-preview/export-data-preview.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DataExportRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'dl-dataload-data-export',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataExportComponent),
            name: 'Data export',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.dataloadBundleId]
        });
    }
}
DataExportRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataExportRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, declarations: [DataExportComponent,
        ExportRecordStatusInfoComponent,
        DataExportConfigurationComponent,
        ExportDataPreviewComponent], imports: [AdaptButtonModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RecordGridModule,
        RxLineLoaderModule,
        AdaptAlertModule,
        AdaptTableModule,
        ReactiveFormsModule,
        AdaptRxTextfieldModule,
        AdaptAccordionModule,
        RxDefinitionPickerModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        ExpressionFormControlModule,
        AdaptBusyModule] });
DataExportRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, imports: [[
            AdaptButtonModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RecordGridModule,
            RxLineLoaderModule,
            AdaptAlertModule,
            AdaptTableModule,
            ReactiveFormsModule,
            AdaptRxTextfieldModule,
            AdaptAccordionModule,
            RxDefinitionPickerModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            ExpressionFormControlModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DataExportComponent,
                        ExportRecordStatusInfoComponent,
                        DataExportConfigurationComponent,
                        ExportDataPreviewComponent
                    ],
                    imports: [
                        AdaptButtonModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RecordGridModule,
                        RxLineLoaderModule,
                        AdaptAlertModule,
                        AdaptTableModule,
                        ReactiveFormsModule,
                        AdaptRxTextfieldModule,
                        AdaptAccordionModule,
                        RxDefinitionPickerModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        ExpressionFormControlModule,
                        AdaptBusyModule
                    ],
                    entryComponents: [DataExportComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=data-export-registration.module.js.map