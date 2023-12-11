import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./functional-roles.component";
import * as i2 from "./functional-role-editor/functional-role-editor.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "@ngx-translate/core";
export declare class FunctionalRolesRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<FunctionalRolesRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FunctionalRolesRegistrationModule, [typeof i1.FunctionalRolesAdminComponent, typeof i2.FunctionalRoleEditorComponent], [typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.AdminSettingsModule, typeof i6.RecordGridModule, typeof i7.AdaptRxTextfieldModule, typeof i7.AdaptButtonModule, typeof i7.AdaptBusyModule, typeof i7.AdaptRxSelectModule, typeof i7.AdaptRxFormControlModule, typeof i7.AdaptTreeModule, typeof i8.RxBusyIndicatorModule, typeof i9.TranslateModule, typeof i8.RxDirectivesModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FunctionalRolesRegistrationModule>;
}
