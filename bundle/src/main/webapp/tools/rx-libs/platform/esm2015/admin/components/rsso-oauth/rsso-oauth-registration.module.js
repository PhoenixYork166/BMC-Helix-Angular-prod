import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RssoOauthAdminComponent } from './rsso-oauth.component';
import { FormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptBusyModule, AdaptButtonModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RssoOauthRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-rsso-oauth',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RssoOauthAdminComponent),
            name: 'RSSO OAuth',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
RssoOauthRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RssoOauthRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RssoOauthRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RssoOauthRegistrationModule, declarations: [RssoOauthAdminComponent], imports: [CommonModule,
        AdminSettingsModule,
        AdaptAccordionModule,
        AdaptRxTextfieldModule,
        AdaptButtonModule,
        AdaptBusyModule,
        FormsModule,
        TranslateModule] });
RssoOauthRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RssoOauthRegistrationModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            AdaptAccordionModule,
            AdaptRxTextfieldModule,
            AdaptButtonModule,
            AdaptBusyModule,
            FormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RssoOauthRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RssoOauthAdminComponent],
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        AdaptAccordionModule,
                        AdaptRxTextfieldModule,
                        AdaptButtonModule,
                        AdaptBusyModule,
                        FormsModule,
                        TranslateModule
                    ],
                    entryComponents: [RssoOauthAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=rsso-oauth-registration.module.js.map