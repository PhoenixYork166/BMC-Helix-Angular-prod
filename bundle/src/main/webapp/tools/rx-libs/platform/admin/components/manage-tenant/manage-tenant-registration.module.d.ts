import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./manage-tenant.component";
import * as i2 from "./tenant-editor/tenant-editor.component";
import * as i3 from "@angular/common";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export declare class ManageTenantRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ManageTenantRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ManageTenantRegistrationModule, [typeof i1.ManageTenantAdminComponent, typeof i2.TenantEditorComponent], [typeof i3.CommonModule, typeof i4.AdminSettingsModule, typeof i5.RecordGridModule, typeof i6.AdaptButtonModule, typeof i6.AdaptRxTextfieldModule, typeof i7.ReactiveFormsModule, typeof i8.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ManageTenantRegistrationModule>;
}
