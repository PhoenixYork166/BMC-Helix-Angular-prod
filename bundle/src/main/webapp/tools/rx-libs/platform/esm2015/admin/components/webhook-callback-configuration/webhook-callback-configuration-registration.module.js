import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { WebhookCallbackConfigurationEditorComponent } from './webhook-callback-configuration-editor/webhook-callback-configuration-editor.component';
import { WebhookCallbackConfigurationAdminComponent } from './webhook-callback-configuration.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdaptAlertModule, AdaptButtonModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class WebhookCallbackConfigurationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-webhook-callback-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(WebhookCallbackConfigurationAdminComponent),
            name: 'Webhook callback configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
WebhookCallbackConfigurationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
WebhookCallbackConfigurationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationRegistrationModule, declarations: [WebhookCallbackConfigurationAdminComponent, WebhookCallbackConfigurationEditorComponent], imports: [CommonModule,
        AdminSettingsModule,
        RecordGridModule,
        AdaptButtonModule,
        ReactiveFormsModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptAlertModule,
        TranslateModule] });
WebhookCallbackConfigurationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationRegistrationModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            RecordGridModule,
            AdaptButtonModule,
            ReactiveFormsModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptAlertModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [WebhookCallbackConfigurationAdminComponent, WebhookCallbackConfigurationEditorComponent],
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        AdaptButtonModule,
                        ReactiveFormsModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        AdaptAlertModule,
                        TranslateModule
                    ],
                    entryComponents: [WebhookCallbackConfigurationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=webhook-callback-configuration-registration.module.js.map