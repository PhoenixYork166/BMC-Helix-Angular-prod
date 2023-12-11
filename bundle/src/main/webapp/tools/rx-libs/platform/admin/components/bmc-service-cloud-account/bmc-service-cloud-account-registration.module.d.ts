import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./bmc-service-cloud-account.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export declare class BmcServiceCloudAccountRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<BmcServiceCloudAccountRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BmcServiceCloudAccountRegistrationModule, [typeof i1.BmcServiceCloudAccountAdminComponent], [typeof i2.AdaptAccordionModule, typeof i2.AdaptAlertModule, typeof i2.AdaptButtonModule, typeof i2.AdaptIconModule, typeof i2.AdaptRxTextfieldModule, typeof i3.AdminSettingsModule, typeof i4.CommonModule, typeof i5.ReactiveFormsModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BmcServiceCloudAccountRegistrationModule>;
}
