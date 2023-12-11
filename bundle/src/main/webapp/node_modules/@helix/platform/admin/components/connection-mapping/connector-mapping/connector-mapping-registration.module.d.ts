import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./connector-mapping.component";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "../common/connection-mapping.module";
import * as i7 from "@ngx-translate/core";
export declare class ConnectorMappingRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorMappingRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConnectorMappingRegistrationModule, [typeof i1.ConnectorMappingAdminComponent], [typeof i2.AdminSettingsModule, typeof i3.AdaptRxTextfieldModule, typeof i3.AdaptRxSelectModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.RxConnectionMappingModule, typeof i7.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConnectorMappingRegistrationModule>;
}
