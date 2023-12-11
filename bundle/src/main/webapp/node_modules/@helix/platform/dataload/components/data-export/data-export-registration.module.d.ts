import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./data-export.component";
import * as i2 from "./export-record-status-info/export-record-status-info.component";
import * as i3 from "./data-export-configuration/data-export-configuration.component";
import * as i4 from "./export-data-preview/export-data-preview.component";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
import * as i9 from "@helix/platform/view/components";
import * as i10 from "@helix/platform/ui-kit";
import * as i11 from "@bmc-ux/adapt-table";
import * as i12 from "@helix/platform/shared/components";
export declare class DataExportRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DataExportRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataExportRegistrationModule, [typeof i1.DataExportComponent, typeof i2.ExportRecordStatusInfoComponent, typeof i3.DataExportConfigurationComponent, typeof i4.ExportDataPreviewComponent], [typeof i5.AdaptButtonModule, typeof i6.CommonModule, typeof i7.FormsModule, typeof i8.TranslateModule, typeof i9.RecordGridModule, typeof i10.RxLineLoaderModule, typeof i5.AdaptAlertModule, typeof i11.AdaptTableModule, typeof i7.ReactiveFormsModule, typeof i5.AdaptRxTextfieldModule, typeof i5.AdaptAccordionModule, typeof i12.RxDefinitionPickerModule, typeof i5.AdaptRxRadiobuttonModule, typeof i5.AdaptRxSelectModule, typeof i12.ExpressionFormControlModule, typeof i5.AdaptBusyModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataExportRegistrationModule>;
}
