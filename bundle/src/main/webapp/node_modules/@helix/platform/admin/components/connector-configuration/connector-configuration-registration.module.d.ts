import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./connector-configuration.component";
import * as i2 from "./connector-configuration-editor/connector-configuration-editor.component";
import * as i3 from "@angular/common";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export declare class ConnectorConfigurationRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorConfigurationRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConnectorConfigurationRegistrationModule, [typeof i1.ConnectorConfigurationAdminComponent, typeof i2.ConnectorConfigurationEditorComponent], [typeof i3.CommonModule, typeof i4.AdaptButtonModule, typeof i5.AdminSettingsModule, typeof i6.RecordGridModule, typeof i4.AdaptRxTextfieldModule, typeof i7.ReactiveFormsModule, typeof i4.AdaptRxSelectModule, typeof i4.AdaptAlertModule, typeof i8.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConnectorConfigurationRegistrationModule>;
}
