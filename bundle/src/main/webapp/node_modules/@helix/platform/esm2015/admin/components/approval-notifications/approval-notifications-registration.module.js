import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ApprovalNotificationsComponent } from './approval-notifications.component';
import { AdminSettingsModule, ExpressionFormControlModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { ApprovalNotificationEditorComponent } from './approval-notification-editor/approval-notification-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxSwitchModule, AdaptRxTextfieldModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ApprovalNotificationsRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-approval-notifications',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ApprovalNotificationsComponent),
            name: 'Approval notifications',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ApprovalNotificationsRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationsRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApprovalNotificationsRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationsRegistrationModule, declarations: [ApprovalNotificationsComponent, ApprovalNotificationEditorComponent], imports: [AdaptEmptyStateModule,
        AdminSettingsModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptRxSwitchModule,
        AdaptRxCheckboxModule,
        AdaptRxRadiobuttonModule,
        AdaptButtonModule,
        AdaptAccordionModule,
        CommonModule,
        ExpressionFormControlModule,
        RecordGridModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        TranslateModule,
        AdaptRxLabelModule,
        AdaptTreeModule] });
ApprovalNotificationsRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationsRegistrationModule, imports: [[
            AdaptEmptyStateModule,
            AdminSettingsModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptRxSwitchModule,
            AdaptRxCheckboxModule,
            AdaptRxRadiobuttonModule,
            AdaptButtonModule,
            AdaptAccordionModule,
            CommonModule,
            ExpressionFormControlModule,
            RecordGridModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            TranslateModule,
            AdaptRxLabelModule,
            AdaptTreeModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalNotificationsRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ApprovalNotificationsComponent, ApprovalNotificationEditorComponent],
                    imports: [
                        AdaptEmptyStateModule,
                        AdminSettingsModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSwitchModule,
                        AdaptRxCheckboxModule,
                        AdaptRxRadiobuttonModule,
                        AdaptButtonModule,
                        AdaptAccordionModule,
                        CommonModule,
                        ExpressionFormControlModule,
                        RecordGridModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        AdaptRxLabelModule,
                        AdaptTreeModule
                    ],
                    entryComponents: [ApprovalNotificationsComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=approval-notifications-registration.module.js.map