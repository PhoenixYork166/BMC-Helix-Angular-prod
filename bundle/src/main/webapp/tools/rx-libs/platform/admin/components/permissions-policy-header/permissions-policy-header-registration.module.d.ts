import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./permissions-policy-header.component";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@bmc-ux/adapt-angular";
export declare class PermissionsPolicyHeaderRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionsPolicyHeaderRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PermissionsPolicyHeaderRegistrationModule, [typeof i1.PermissionsPolicyHeaderAdminComponent], [typeof i2.AdminSettingsModule, typeof i3.FormsModule, typeof i4.CommonModule, typeof i5.TranslateModule, typeof i6.AdaptButtonModule, typeof i6.AdaptRxTextfieldModule, typeof i6.AdaptEmptyStateModule, typeof i6.AdaptIconModule, typeof i6.AdaptPopoverModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PermissionsPolicyHeaderRegistrationModule>;
}
