import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./jitterbit-apis.component";
import * as i2 from "./jitterbit-api-editor.component";
import * as i3 from "../ipaas-base-apis/ipaas-base-apis.module";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@angular/forms";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@angular/common";
export declare class JitterbitApisRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<JitterbitApisRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<JitterbitApisRegistrationModule, [typeof i1.JitterbitApisAdminComponent, typeof i2.JitterbitApiEditorComponent], [typeof i3.IpaasBaseApisModule, typeof i4.RxBusyIndicatorModule, typeof i5.ReactiveFormsModule, typeof i6.AdaptRxLabelModule, typeof i6.AdaptRxSelectModule, typeof i6.AdaptRxSelectEditableModule, typeof i6.AdaptRxTextfieldModule, typeof i6.AdaptTabsModule, typeof i7.TranslateModule, typeof i6.AdaptButtonModule, typeof i8.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<JitterbitApisRegistrationModule>;
}
