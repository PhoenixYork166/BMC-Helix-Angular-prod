import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./jitterbit-configuration.component";
import * as i2 from "@angular/common";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "../ipaas-base-configuration/ipaas-base-configuration.module";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export declare class JitterbitConfigurationRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<JitterbitConfigurationRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<JitterbitConfigurationRegistrationModule, [typeof i1.JitterbitConfigurationAdminComponent], [typeof i2.CommonModule, typeof i3.AdaptRxTextfieldModule, typeof i4.IpaasBaseConfigurationModule, typeof i5.ReactiveFormsModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<JitterbitConfigurationRegistrationModule>;
}
