import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./gainsight-admin-opt-in.component";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
export declare class GainsightAdminOptInRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<GainsightAdminOptInRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GainsightAdminOptInRegistrationModule, [typeof i1.GainsightAdminOptInComponent], [typeof i2.TranslateModule, typeof i3.AdaptAgreementModule, typeof i3.AdaptRxSelectModule, typeof i4.FormsModule, typeof i3.AdaptRxSwitchModule, typeof i5.CommonModule, typeof i3.AdaptButtonModule, typeof i3.AdaptEmptyStateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GainsightAdminOptInRegistrationModule>;
}
