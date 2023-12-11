import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./data-source-mapping.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
import * as i6 from "../common/connection-mapping.module";
export declare class DataSourceMappingModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceMappingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataSourceMappingModule, [typeof i1.DataSourceMappingAdminComponent], [typeof i2.CommonModule, typeof i3.AdminSettingsModule, typeof i4.AdaptRxSelectModule, typeof i5.FormsModule, typeof i4.AdaptRxTextfieldModule, typeof i6.RxConnectionMappingModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataSourceMappingModule>;
}
