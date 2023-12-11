import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./data-import.component";
import * as i2 from "./import-record-status-info/import-record-status-info.component";
import * as i3 from "./upload-data-file-step/upload-data-file-step.component";
import * as i4 from "./data-import-mapping-step/data-import-mapping-step.component";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
import * as i9 from "@helix/platform/view/components";
import * as i10 from "@bmc-ux/adapt-table";
import * as i11 from "@helix/platform/ui-kit";
import * as i12 from "@helix/platform/shared/components";
export declare class DataImportRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DataImportRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataImportRegistrationModule, [typeof i1.DataImportComponent, typeof i2.ImportRecordStatusInfoComponent, typeof i3.UploadDataFileStepComponent, typeof i4.DataImportMappingStepComponent], [typeof i5.AdaptButtonModule, typeof i6.CommonModule, typeof i7.FormsModule, typeof i8.TranslateModule, typeof i9.RecordGridModule, typeof i5.AdaptPopoverModule, typeof i10.AdaptTableModule, typeof i11.RxLineLoaderModule, typeof i5.AdaptRxTextfieldModule, typeof i5.AdaptRxUploaderModule, typeof i5.AdaptRxSelectModule, typeof i7.ReactiveFormsModule, typeof i5.AdaptTabsModule, typeof i5.AdaptRxRadiobuttonModule, typeof i12.RxDefinitionPickerModule, typeof i5.AdaptRxLabelModule, typeof i5.AdaptAlertModule, typeof i5.AdaptRxCheckboxModule, typeof i11.RxBusyIndicatorModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataImportRegistrationModule>;
}
