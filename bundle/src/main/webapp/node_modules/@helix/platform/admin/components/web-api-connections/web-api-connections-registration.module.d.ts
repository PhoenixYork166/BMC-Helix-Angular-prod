import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./web-api-connections.component";
import * as i2 from "./web-api-connection-wizard-step-fields/web-api-connection-wizard-step-fields.component";
import * as i3 from "./general-wizard-step/general-wizard-step.component";
import * as i4 from "./authentication-wizard-step/authentication-wizard-step.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "@bmc-ux/adapt-angular";
import * as i10 from "@helix/platform/ui-kit";
import * as i11 from "@ngx-translate/core";
export declare class WebApiConnectionsRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<WebApiConnectionsRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<WebApiConnectionsRegistrationModule, [typeof i1.WebApiConnectionsAdminComponent, typeof i2.WebApiConnectionWizardStepFieldsComponent, typeof i3.GeneralWizardStepComponent, typeof i4.AuthenticationWizardStepComponent], [typeof i5.CommonModule, typeof i6.FormsModule, typeof i7.AdminSettingsModule, typeof i8.RecordGridModule, typeof i9.AdaptAlertModule, typeof i9.AdaptButtonModule, typeof i9.AdaptRxTextfieldModule, typeof i9.AdaptButtonModule, typeof i9.AdaptRxSelectModule, typeof i9.AdaptTabsModule, typeof i9.AdaptRxRadiobuttonModule, typeof i9.AdaptRxFormControlModule, typeof i10.RxNameValuePairsEditorModule, typeof i9.AdaptRxCounterModule, typeof i10.RxDirectivesModule, typeof i11.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<WebApiConnectionsRegistrationModule>;
}
