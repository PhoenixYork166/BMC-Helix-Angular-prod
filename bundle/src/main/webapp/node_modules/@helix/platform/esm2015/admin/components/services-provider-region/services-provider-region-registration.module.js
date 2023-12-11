import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesProviderRegionAdminComponent } from './services-provider-region.component';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ServicesProviderRegionRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-services-provider-region',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ServicesProviderRegionAdminComponent),
            name: 'Services provider region',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ServicesProviderRegionRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServicesProviderRegionRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ServicesProviderRegionRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServicesProviderRegionRegistrationModule, declarations: [ServicesProviderRegionAdminComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AdaptRxSelectModule,
        TranslateModule,
        AdminSettingsModule,
        AdaptButtonModule] });
ServicesProviderRegionRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServicesProviderRegionRegistrationModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            AdaptRxSelectModule,
            TranslateModule,
            AdminSettingsModule,
            AdaptButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServicesProviderRegionRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ServicesProviderRegionAdminComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptRxSelectModule,
                        TranslateModule,
                        AdminSettingsModule,
                        AdaptButtonModule
                    ],
                    entryComponents: [ServicesProviderRegionAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=services-provider-region-registration.module.js.map