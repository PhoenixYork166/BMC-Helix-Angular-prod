import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./rule-reassignment/rule-reassignment.component";
import * as i2 from "./rule-pool-management.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@bmc-ux/adapt-table";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@helix/platform/rule/api";
import * as i9 from "@ngx-translate/core";
export declare class RulePoolManagementRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RulePoolManagementRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RulePoolManagementRegistrationModule, [typeof i1.RuleReassignmentComponent, typeof i2.RulePoolManagementAdminComponent], [typeof i3.AdaptBusyModule, typeof i3.AdaptButtonModule, typeof i3.AdaptEmptyStateModule, typeof i3.AdaptIconModule, typeof i3.AdaptPopoverModule, typeof i3.AdaptRxCheckboxModule, typeof i3.AdaptRxFormControlModule, typeof i3.AdaptRxLabelModule, typeof i3.AdaptRxSelectModule, typeof i4.AdaptTableModule, typeof i3.AdaptTooltipModule, typeof i3.AdaptTreeModule, typeof i5.AdminSettingsModule, typeof i6.CommonModule, typeof i7.ReactiveFormsModule, typeof i8.RxRulePipesModule, typeof i9.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RulePoolManagementRegistrationModule>;
}
