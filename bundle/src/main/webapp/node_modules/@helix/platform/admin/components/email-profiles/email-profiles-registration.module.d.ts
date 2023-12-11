import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./email-profiles.component";
import * as i2 from "./create-email-profile/create-email-profile.component";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export declare class EmailProfilesRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<EmailProfilesRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<EmailProfilesRegistrationModule, [typeof i1.EmailProfilesAdminComponent, typeof i2.CreateEmailProfileComponent], [typeof i3.AdminSettingsModule, typeof i4.CommonModule, typeof i5.RecordGridModule, typeof i6.AdaptRxTextfieldModule, typeof i6.AdaptRxRadiobuttonModule, typeof i6.AdaptRxSelectModule, typeof i7.FormsModule, typeof i7.ReactiveFormsModule, typeof i6.AdaptButtonModule, typeof i8.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<EmailProfilesRegistrationModule>;
}
