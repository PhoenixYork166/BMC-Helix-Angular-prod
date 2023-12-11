import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./server-information.component";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export declare class ServerInformationRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerInformationRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerInformationRegistrationModule, [typeof i1.ServerInformationAdminComponent], [typeof i2.AdminSettingsModule, typeof i3.AdaptRxTextfieldModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerInformationRegistrationModule>;
}
