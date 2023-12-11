import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./approval-notifications.component";
import * as i2 from "./approval-notification-editor/approval-notification-editor.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@angular/common";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export declare class ApprovalNotificationsRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalNotificationsRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ApprovalNotificationsRegistrationModule, [typeof i1.ApprovalNotificationsComponent, typeof i2.ApprovalNotificationEditorComponent], [typeof i3.AdaptEmptyStateModule, typeof i4.AdminSettingsModule, typeof i3.AdaptRxSelectModule, typeof i3.AdaptRxTextfieldModule, typeof i3.AdaptRxSwitchModule, typeof i3.AdaptRxCheckboxModule, typeof i3.AdaptRxRadiobuttonModule, typeof i3.AdaptButtonModule, typeof i3.AdaptAccordionModule, typeof i5.CommonModule, typeof i4.ExpressionFormControlModule, typeof i6.RecordGridModule, typeof i7.ReactiveFormsModule, typeof i4.RxDefinitionPickerModule, typeof i8.TranslateModule, typeof i3.AdaptRxLabelModule, typeof i3.AdaptTreeModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ApprovalNotificationsRegistrationModule>;
}
