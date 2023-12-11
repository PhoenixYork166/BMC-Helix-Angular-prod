import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./services-provider-region.component";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
export declare class ServicesProviderRegionRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ServicesProviderRegionRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServicesProviderRegionRegistrationModule, [typeof i1.ServicesProviderRegionAdminComponent], [typeof i2.CommonModule, typeof i3.ReactiveFormsModule, typeof i4.AdaptRxSelectModule, typeof i5.TranslateModule, typeof i6.AdminSettingsModule, typeof i4.AdaptButtonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServicesProviderRegionRegistrationModule>;
}
