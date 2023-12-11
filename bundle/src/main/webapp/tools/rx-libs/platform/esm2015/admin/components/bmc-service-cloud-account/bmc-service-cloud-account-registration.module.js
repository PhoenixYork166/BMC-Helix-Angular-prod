import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptButtonModule, AdaptIconModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { BmcServiceCloudAccountAdminComponent } from './bmc-service-cloud-account.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class BmcServiceCloudAccountRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-bmc-service-cloud-account',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(BmcServiceCloudAccountAdminComponent),
            name: 'BMC Service Cloud account',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
BmcServiceCloudAccountRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BmcServiceCloudAccountRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
BmcServiceCloudAccountRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BmcServiceCloudAccountRegistrationModule, declarations: [BmcServiceCloudAccountAdminComponent], imports: [AdaptAccordionModule,
        AdaptAlertModule,
        AdaptButtonModule,
        AdaptIconModule,
        AdaptRxTextfieldModule,
        AdminSettingsModule,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule] });
BmcServiceCloudAccountRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BmcServiceCloudAccountRegistrationModule, imports: [[
            AdaptAccordionModule,
            AdaptAlertModule,
            AdaptButtonModule,
            AdaptIconModule,
            AdaptRxTextfieldModule,
            AdminSettingsModule,
            CommonModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BmcServiceCloudAccountRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptAccordionModule,
                        AdaptAlertModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptRxTextfieldModule,
                        AdminSettingsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ],
                    declarations: [BmcServiceCloudAccountAdminComponent],
                    entryComponents: [BmcServiceCloudAccountAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=bmc-service-cloud-account-registration.module.js.map