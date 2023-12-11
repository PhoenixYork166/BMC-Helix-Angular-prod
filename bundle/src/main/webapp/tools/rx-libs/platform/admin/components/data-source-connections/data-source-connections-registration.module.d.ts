import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./data-source-connections.component";
import * as i2 from "./data-source-connection-general.component";
import * as i3 from "./data-source-connection-properties.component";
import * as i4 from "./custom-data-source-provider-picker/custom-data-source-provider-picker.component";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "@helix/platform/view/components";
import * as i10 from "@helix/platform/ui-kit";
import * as i11 from "@helix/platform/shared/api";
import * as i12 from "@ngx-translate/core";
export declare class DataSourceConnectionsRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceConnectionsRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataSourceConnectionsRegistrationModule, [typeof i1.DataSourceConnectionsAdminComponent, typeof i2.DataSourceConnectionGeneralComponent, typeof i3.DataSourceConnectionPropertiesComponent, typeof i4.RxCustomDataSourceProviderPickerComponent], [typeof i5.AdaptButtonModule, typeof i5.AdaptDropdownModule, typeof i5.AdaptRxCheckboxModule, typeof i5.AdaptRxCounterModule, typeof i5.AdaptRxFormControlModule, typeof i5.AdaptRxRadiobuttonModule, typeof i5.AdaptRxSelectModule, typeof i5.AdaptRxTextfieldModule, typeof i5.AdaptRxValidatorsModule, typeof i5.AdaptTreeModule, typeof i6.AdminSettingsModule, typeof i7.CommonModule, typeof i8.FormsModule, typeof i8.ReactiveFormsModule, typeof i9.RecordGridModule, typeof i10.RxConnectionTesterModule, typeof i11.RxDefinitionModule, typeof i6.RxWizardModule, typeof i12.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataSourceConnectionsRegistrationModule>;
}
