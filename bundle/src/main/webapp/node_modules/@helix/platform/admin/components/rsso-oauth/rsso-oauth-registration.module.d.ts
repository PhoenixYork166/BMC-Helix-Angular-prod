import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./rsso-oauth.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export declare class RssoOauthRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RssoOauthRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RssoOauthRegistrationModule, [typeof i1.RssoOauthAdminComponent], [typeof i2.CommonModule, typeof i3.AdminSettingsModule, typeof i4.AdaptAccordionModule, typeof i4.AdaptRxTextfieldModule, typeof i4.AdaptButtonModule, typeof i4.AdaptBusyModule, typeof i5.FormsModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RssoOauthRegistrationModule>;
}
