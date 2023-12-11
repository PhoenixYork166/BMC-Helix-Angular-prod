import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxListBuilderModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { IframeSecurityAdminComponent } from './iframe-security.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class IframeSecurityRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-iframe-security',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(IframeSecurityAdminComponent),
            name: 'Iframe security',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
IframeSecurityRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeSecurityRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
IframeSecurityRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeSecurityRegistrationModule, declarations: [IframeSecurityAdminComponent], imports: [AdaptButtonModule,
        AdaptRxListBuilderModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        TranslateModule] });
IframeSecurityRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeSecurityRegistrationModule, imports: [[
            AdaptButtonModule,
            AdaptRxListBuilderModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeSecurityRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [IframeSecurityAdminComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptRxListBuilderModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule
                    ],
                    entryComponents: [IframeSecurityAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=iframe-security-registration.module.js.map