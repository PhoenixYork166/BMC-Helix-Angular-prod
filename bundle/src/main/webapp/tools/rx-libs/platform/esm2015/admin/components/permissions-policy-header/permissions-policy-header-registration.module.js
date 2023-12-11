import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { PermissionsPolicyHeaderAdminComponent } from './permissions-policy-header.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptPopoverModule, AdaptEmptyStateModule, AdaptIconModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class PermissionsPolicyHeaderRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-permissions-policy',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(PermissionsPolicyHeaderAdminComponent),
            name: 'Permissions Policy Header',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
PermissionsPolicyHeaderRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PermissionsPolicyHeaderRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
PermissionsPolicyHeaderRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PermissionsPolicyHeaderRegistrationModule, declarations: [PermissionsPolicyHeaderAdminComponent], imports: [AdminSettingsModule,
        FormsModule,
        CommonModule,
        TranslateModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        AdaptEmptyStateModule,
        AdaptIconModule,
        AdaptPopoverModule] });
PermissionsPolicyHeaderRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PermissionsPolicyHeaderRegistrationModule, imports: [[
            AdminSettingsModule,
            FormsModule,
            CommonModule,
            TranslateModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            AdaptEmptyStateModule,
            AdaptIconModule,
            AdaptPopoverModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PermissionsPolicyHeaderRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PermissionsPolicyHeaderAdminComponent],
                    imports: [
                        AdminSettingsModule,
                        FormsModule,
                        CommonModule,
                        TranslateModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        AdaptEmptyStateModule,
                        AdaptIconModule,
                        AdaptPopoverModule
                    ],
                    entryComponents: [PermissionsPolicyHeaderAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=permissions-policy-header-registration.module.js.map