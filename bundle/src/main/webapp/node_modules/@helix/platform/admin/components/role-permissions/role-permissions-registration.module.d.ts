import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./role-permissions.component";
import * as i2 from "./role-editor/role-editor.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "@ngx-translate/core";
export declare class RolePermissionsRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RolePermissionsRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RolePermissionsRegistrationModule, [typeof i1.RolePermissionsAdminComponent, typeof i2.RoleEditorComponent], [typeof i3.AdaptBusyModule, typeof i3.AdaptButtonModule, typeof i3.AdaptRxCounterModule, typeof i3.AdaptRxFormControlModule, typeof i3.AdaptRxSelectModule, typeof i3.AdaptRxTextfieldModule, typeof i3.AdaptRxTypeaheadModule, typeof i3.AdaptRxValidatorsModule, typeof i4.AdminSettingsModule, typeof i5.CommonModule, typeof i6.FormsModule, typeof i7.RecordGridModule, typeof i8.RxDirectivesModule, typeof i9.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RolePermissionsRegistrationModule>;
}
