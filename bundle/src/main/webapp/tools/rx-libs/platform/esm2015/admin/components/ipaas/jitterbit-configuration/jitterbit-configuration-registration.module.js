import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { IpaasBaseConfigurationModule } from '../ipaas-base-configuration/ipaas-base-configuration.module';
import { JitterbitConfigurationAdminComponent } from './jitterbit-configuration.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class JitterbitConfigurationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-jitterbit-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(JitterbitConfigurationAdminComponent),
            name: 'iPaaS Jitterbit configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
JitterbitConfigurationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitConfigurationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
JitterbitConfigurationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitConfigurationRegistrationModule, declarations: [JitterbitConfigurationAdminComponent], imports: [CommonModule, AdaptRxTextfieldModule, IpaasBaseConfigurationModule, ReactiveFormsModule, TranslateModule] });
JitterbitConfigurationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitConfigurationRegistrationModule, imports: [[CommonModule, AdaptRxTextfieldModule, IpaasBaseConfigurationModule, ReactiveFormsModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitConfigurationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptRxTextfieldModule, IpaasBaseConfigurationModule, ReactiveFormsModule, TranslateModule],
                    declarations: [JitterbitConfigurationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=jitterbit-configuration-registration.module.js.map