import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./server-logs.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export declare class ServerLogsRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerLogsRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ServerLogsRegistrationModule, [typeof i1.ServerLogsAdminComponent], [typeof i2.AdaptBusyModule, typeof i2.AdaptButtonModule, typeof i2.AdaptRxCheckboxModule, typeof i2.AdaptRxCounterModule, typeof i2.AdaptRxValidatorsModule, typeof i3.AdminSettingsModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i5.ReactiveFormsModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ServerLogsRegistrationModule>;
}
