import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { MulesoftConfigurationAdminComponent } from './mulesoft-configuration.component';
import { IpaasBaseConfigurationModule } from '../ipaas-base-configuration/ipaas-base-configuration.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class MulesoftConfigurationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-mulesoft-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(MulesoftConfigurationAdminComponent),
            name: 'iPaaS MuleSoft configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
MulesoftConfigurationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftConfigurationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
MulesoftConfigurationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftConfigurationRegistrationModule, declarations: [MulesoftConfigurationAdminComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        TranslateModule,
        IpaasBaseConfigurationModule] });
MulesoftConfigurationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftConfigurationRegistrationModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            TranslateModule,
            IpaasBaseConfigurationModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftConfigurationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        TranslateModule,
                        IpaasBaseConfigurationModule
                    ],
                    declarations: [MulesoftConfigurationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=mulesoft-configuration-registration.module.js.map