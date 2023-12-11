import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { WebApiConnectionsAdminComponent } from './web-api-connections.component';
import { RecordGridModule } from '@helix/platform/view/components';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AdaptAlertModule, AdaptButtonModule, AdaptRxCounterModule, AdaptRxFormControlModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxDirectivesModule, RxNameValuePairsEditorModule } from '@helix/platform/ui-kit';
import { WebApiConnectionWizardStepFieldsComponent } from './web-api-connection-wizard-step-fields/web-api-connection-wizard-step-fields.component';
import { GeneralWizardStepComponent } from './general-wizard-step/general-wizard-step.component';
import { AuthenticationWizardStepComponent } from './authentication-wizard-step/authentication-wizard-step.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class WebApiConnectionsRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-web-api-connections',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(WebApiConnectionsAdminComponent),
            name: 'Web API connections',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
WebApiConnectionsRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionsRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
WebApiConnectionsRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionsRegistrationModule, declarations: [WebApiConnectionsAdminComponent,
        WebApiConnectionWizardStepFieldsComponent,
        GeneralWizardStepComponent,
        AuthenticationWizardStepComponent], imports: [CommonModule,
        FormsModule,
        AdminSettingsModule,
        RecordGridModule,
        AdaptAlertModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        AdaptButtonModule,
        AdaptRxSelectModule,
        AdaptTabsModule,
        AdaptRxRadiobuttonModule,
        AdaptRxFormControlModule,
        RxNameValuePairsEditorModule,
        AdaptRxCounterModule,
        RxDirectivesModule,
        TranslateModule] });
WebApiConnectionsRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionsRegistrationModule, imports: [[
            CommonModule,
            FormsModule,
            AdminSettingsModule,
            RecordGridModule,
            AdaptAlertModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            AdaptButtonModule,
            AdaptRxSelectModule,
            AdaptTabsModule,
            AdaptRxRadiobuttonModule,
            AdaptRxFormControlModule,
            RxNameValuePairsEditorModule,
            AdaptRxCounterModule,
            RxDirectivesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionsRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        WebApiConnectionsAdminComponent,
                        WebApiConnectionWizardStepFieldsComponent,
                        GeneralWizardStepComponent,
                        AuthenticationWizardStepComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        AdaptAlertModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        AdaptButtonModule,
                        AdaptRxSelectModule,
                        AdaptTabsModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxFormControlModule,
                        RxNameValuePairsEditorModule,
                        AdaptRxCounterModule,
                        RxDirectivesModule,
                        TranslateModule
                    ],
                    entryComponents: [WebApiConnectionsAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=web-api-connections-registration.module.js.map